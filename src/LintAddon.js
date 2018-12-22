import CodeMirror from 'codemirror';
import LintState from './LintState';
import fontawesome from '@fortawesome/fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { isArray } from 'vue-interface/src/Helpers/Functions';

const UNDERLINE_CLASS = 'CodeMirror-lint-error-underline';

function removeExistingErrors(state, errors) {
    state.lint.cm.clearGutter(state.lint.id);

    (errors || state.lint.errors).forEach(error => {
        error.open && error.open.clear();
        error.close && error.close.clear();
    });
}

/*
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
*/

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
    const range = state.lint.cm.getViewport();

    if(isArray(state.lint.errors)) {
        state.lint.errors.forEach(error => {
            state.lint.cm.setGutterMarker(error.line - 1, state.lint.id, createIcon(error));

            error.match = CodeMirror.findMatchingTag(state.lint.cm, {
                line: error.line - 1,
                ch: error.column
            }, range);

            if(error.match) {
                if(error.match.open) {
                    error.open = state.lint.cm.markText(error.match.open.from, error.match.open.to, {
                        className: 'CodeMirror-lint-error-underline'
                    });
                }

                if(error.match.close) {
                    error.close = state.lint.cm.markText(error.match.close.from, error.match.close.to, {
                        className: UNDERLINE_CLASS
                    });
                }
            }
        });

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
}

function onCursorActivity(cm) {
    if(cm.lintErrorTooltip) {
        cm.lintErrorTooltip.parentNode.removeChild(cm.lintErrorTooltip);
        cm.lintErrorTooltip = null;
    }

    const errors = cm.state.lint.findNearbyErrors(cm.getCursor());

    const ch = errors.reduce((carry, error) => {
        return carry === null || carry > error.column ? error.column : carry;
    }, null) - 1;

    const line = errors.reduce((carry, error) => {
        return carry === null || carry > error.line ? error.line : carry;
    }, null) - 1;

    const message = errors.reduce((carry, error) => {
        carry.push(`${error.line},${error.column} :: ${error.code} ${error.msg} (${error.rule})`);
        return carry;
    }, []).join('<br>');

    if(errors.length) {
        cm.lintErrorTooltip = createTooltip(message, cm);
        cm.addWidget({ ch, line }, cm.lintErrorTooltip, true);

        // const bounds = cm.lintErrorTooltip.getBoundingClientRect();
        // const offset = bounds.left + bounds.width - cm.getScrollInfo().clientWidth;
    }
}

CodeMirror.defineOption('lint', false, function(cm, options, old) {
    if(old && old !== CodeMirror.Init) {
        removeExistingErrors(cm.state);
        cm.off('cursorActivity', onCursorActivity);
        delete cm.state.lint;
    }

    if(options) {
        cm.state.lint = new LintState(cm, options || (options = {}));
        cm.on('cursorActivity', onCursorActivity);
        cm.on('inputRead', (cm, event) => {
            if(event.origin === 'paste') {
                cm.state.lint.errors = [];
                cm.lint();
            }
        });

        if(options.errors && options.errors.length) {
            cm.state.lint.errors = options.errors;
            addErrors(cm.state);
        }
    }
});

CodeMirror.defineExtension('lint', function(data, options) {
    return new Promise((resolve, reject) => {
        const existingErrors = this.state.lint.errors;

        this.state.lint
            .request(data, options)
            .then(response => {
                removeExistingErrors(this.state, existingErrors);
                resolve(this.state.lint);
            }, error => {
                removeExistingErrors(this.state, existingErrors);

                this.state.lint.cm.operation(() => {
                    addErrors(this.state);
                    reject(error);
                });
            });
    });
});
