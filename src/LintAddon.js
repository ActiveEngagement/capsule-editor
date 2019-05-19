import CodeMirror from 'codemirror';
import LintState from './LintState';

function onChange(cm, event) {
    if(event.origin === 'undo') {
        cm.lint();
    }
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

CodeMirror.defineOption('lint', false, function(cm, options, old) {
    if(old && old !== CodeMirror.Init) {
        cm.state.removeErrors();
        cm.off('change', onChange);
        cm.off('changes', onChanges);
        cm.off('inputRead', onInputRead);

        delete cm.state.lint;
    }

    if(options) {
        cm.state.lint = new LintState(cm, options || (options = {}));
        cm.on('change', onChange);
        cm.on('changes', onChanges);
        cm.on('inputRead', onInputRead);

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
