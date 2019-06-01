import CodeMirror from 'codemirror';
import LintState from './LintState';

let lastChange;
let matchBeforeChange;


function onChange(cm, event) {
    const { removed, origin } = event;
    const { line, ch } = cm.getCursor();
    const match = CodeMirror.findMatchingTag(cm, { line, ch: ch - 1 }, cm.getViewport());

    if((matchBeforeChange && !match) || 
       (!matchBeforeChange && match) ||
       (origin === 'undo' && removed.filter(value => !!value.trim()).length) || 
       (origin === '+delete' && (removed.indexOf('<') !== -1 || removed.indexOf('>') !== -1))) {
        cm.lint();
    }

    lastChange = event;
    lastChange.open = match && match.open;
    lastChange.close = match && match.close;
}

function onChanges(cm, event) {
    let { line, ch } = cm.getCursor();
    
    const match = CodeMirror.findMatchingTag(cm, { line, ch: ch - 1 }, cm.getViewport());

    event.open = match && match.open;
    event.close = match && match.close;

    if(!cm.state.lint.findNearbyErrors(cm.getCursor()).length && (
        cm.state.lint.isOpenedTagClosing(match) || cm.state.lint.isNonClosingTagOpened(match)
    )) {
        cm.lint();
    }

    if(!cm.getValue()) {
        cm.state.lint.removeErrors();
    }
}

function onInputRead(cm, event) {
    if(event.origin === 'paste') {
        if(!cm.state.lint.errors.filter(error => error.isActive).length) {
            cm.lint();
        }
    }
}

function onBeforeChange(cm, { to, from }) {
    matchBeforeChange = (
        CodeMirror.findMatchingTag(cm, to, cm.getViewport()) || 
        CodeMirror.findMatchingTag(cm, from, cm.getViewport())
    );
}

CodeMirror.defineOption('lint', false, function(cm, options, old) {
    if(old && old !== CodeMirror.Init) {
        cm.state.removeErrors();
        cm.off('change', onChange);
        cm.off('changes', onChanges);
        cm.off('inputRead', onInputRead);
        cm.off('beforeChange', onBeforeChange);

        delete cm.state.lint;
    }

    if(options) {
        cm.state.lint = new LintState(cm, options || (options = {}));
        cm.on('change', onChange);
        cm.on('changes', onChanges);
        cm.on('inputRead', onInputRead);
        cm.on('beforeChange', onBeforeChange);

        if(options.errors && options.errors.length) {
            cm.state.lint.errors = options.errors;
        }
    }
});

CodeMirror.defineExtension('lint', function(data, options) {
    return new Promise((resolve, reject) => {    
        if(this.state.lint.cm.getValue()) {
            this.state.lint
                .send(data, options)
                .then(response => {
                    resolve(this.state.lint);
                }, error => {
                    this.state.lint.cm.operation(() => {
                        reject(error);
                    });
                });
        }
        else {
            this.state.lint.removeErrors();
            this.state.lint.callback('onLintSuccess');

            resolve(this.state.lint);
        }
    });
});
