import { debounce } from 'lodash';
import CodeMirror from 'codemirror';
import LintState from './LintState';
import fontawesome from '@fortawesome/fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { isArray } from 'vue-interface/src/Helpers/Functions';
import { match } from 'minimatch';

// let changeHistory = [];

const debounced = debounce(fn => fn(), 250);

/*
const UNDERLINE_CLASS = 'CodeMirror-lint-error-underline';

function removeExistingErrors(state, errors) {
    state.lint.cm.clearGutter(state.lint.id);

    (errors || state.lint.errors).forEach(error => {
        error.open && error.open.clear();
        error.close && error.close.clear();
    });
}

function offset(cm) {
    let container = document.querySelector('.CodeMirror-lint-tooltip-container');

    if(container) {
        return container;
    }

    container = document.createElement('div');
    container.className = 'CodeMirror-lint-tooltip-container CodeMirror-sizer';
    container.style.marginLeft = document.querySelector('.CodeMirror-sizer').style.marginLeft;
    container.style.borderRightWidth = document.querySelector('.CodeMirror-sizer').style.borderRightWidth;

    cm.getWrapperElement().parentNode.insertBefore(container, cm.getWrapperElement().nextSibling);

    return container;
}

function createTooltip(html, cm) {
    const div = document.createElement('div');

    div.className = 'CodeMirror-lint-tooltip';
    div.innerHTML = html;

    return div;
}

function createIcon(error) {
    const icon = document.createElement('div');

    icon.className = 'CodeMirror-lint-error-icon';
    icon.innerHTML = fontawesome.icon(faBug).html;
    icon.title = `${error.line},${error.column} :: ${error.code} ${error.msg} (${error.rule})`;
    icon.error = error;

    return icon;
}

function addErrors(state) {
    if(isArray(state.lint.errors)) {
        state.lint.errors.forEach(error => {
            state.lint.cm.setGutterMarker(error.line - 1, state.lint.id, createIcon(error));

            error.match = CodeMirror.findMatchingTag(state.lint.cm, {
                line: error.line - 1,
                ch: error.column
            }, state.lint.cm.getViewport());

            if(error.match) {
                if(error.match.open) {
                    error.open = state.lint.cm.markText(error.match.open.from, error.match.open.to, {
                        className: UNDERLINE_CLASS
                    });
                }

                if(error.match.close) {
                    error.close = state.lint.cm.markText(error.match.close.from, error.match.close.to, {
                        className: UNDERLINE_CLASS
                    });
                }
            }
        });
    }
}

function setCursorOnError(state) {
    if(state.lint.errors.length && state.lint.errors[0].match) {
        state.lint.cm.scrollIntoView(
            state.lint.errors[0].match.open ||
            state.lint.errors[0].match.close,
            state.lint.cm.getScrollInfo().clientHeight / 2
        );

        setTimeout(() => {
            state.lint.cm.setCursor(
                state.lint.errors[0].line - 1,
                state.lint.errors[0].column
            );
        });
    }
}

function onCursorActivity(cm) {
    cm.state.lint.errors.forEach(error => {
        if(error.bookmark.widgetNode) {
            error.bookmark.widgetNode.classList[error.isActive() ? 'add' : 'remove']('show');
        }
    });
}
*/

CodeMirror.defineOption('lint', false, function(cm, options, old) {
    if(old && old !== CodeMirror.Init) {
        cm.state.removeErrors();
        // cm.off('cursorActivity', onCursorActivity);
        delete cm.state.lint;
    }

    if(options) {
        cm.state.lint = new LintState(cm, options || (options = {}));
        // cm.on('cursorActivity', onCursorActivity);

        cm.on('changes', (cm, event) => {
            let { line, ch } = cm.getCursor();
            
            const match = CodeMirror.findMatchingTag(cm, { line, ch: ch - 1 }, cm.getViewport());

            event.open = match && match.open;
            event.close = match && match.close;
            
            // changeHistory.splice(0, 0, event);
            // changeHistory.splice(5);

            if(!cm.state.lint.findNearbyErrors(cm.getCursor()).length && (
                cm.state.lint.isOpenedTagClosing(match) || cm.state.lint.isNonClosingTagOpened(match)
            )) {
                cm.lint();
            }

            if(!cm.getValue()) {
                cm.state.lint.removeErrors();
            }
        });

        cm.on('change', (cm, event) => {
            if(event.origin === 'undo') {
                cm.lint();
            }
        });
        
        cm.on('inputRead', (cm, event) => {
            if(event.origin === 'paste') {
                cm.lint();
            }
        });

        if(options.errors && options.errors.length) {
            cm.state.lint.errors = options.errors;
            // addErrors(cm.state);
            // setCursorOnError(cm.state);
        }
    }
});

CodeMirror.defineExtension('lint', function(data, options) {
    return new Promise((resolve, reject) => {
        if(this.state.lint.cm.getValue()) {
            this.state.lint
                .request(data, options)
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
