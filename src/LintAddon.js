import { debounce } from 'lodash';
import CodeMirror from 'codemirror';
import LintState from './LintState';
import fontawesome from '@fortawesome/fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { isArray } from 'vue-interface/src/Helpers/Functions';

const debounced = debounce(fn => fn(), 500);

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
*/

function onCursorActivity(cm) {
    let errors = [];

    const match = CodeMirror.findMatchingTag(cm, cm.getCursor(), cm.getViewport());

    if(match) {
        const from = (match.open || match.close).from;
        const to = (match.close || match.open).to;
        
        // errors = cm.state.lint.findErrorsInRange(from, to);
    }
    else {
        errors = cm.state.lint.findNearbyErrors(cm.getCursor());
    }

    cm.state.lint.errors
        .filter(error => error !== errors[0])
        .forEach(({ bookmark }) => {
            bookmark.widgetNode.classList.remove('show');
        });

    if(errors[0]) {
        errors[0].bookmark.widgetNode.classList.add('show');
    }

    /*
    if(cm.lintErrorTooltip) {
        cm.lintErrorTooltip.parentNode.removeChild(cm.lintErrorTooltip);
        cm.lintErrorTooltip = null;
    }

    if(errors.length) {
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

        // cm.lintErrorTooltip = cm.state.lint.createTooltip(message, cm);
        // cm.addWidget({ ch, line }, cm.lintErrorTooltip, true);
    }
    */

    // const errors = cm.state.lint.findNearbyErrors(cm.getCursor());
    
    /*
    if(errors.length) {
        // console.log(errors);
    }

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
    */
}

CodeMirror.defineOption('lint', false, function(cm, options, old) {
    if(old && old !== CodeMirror.Init) {
        cm.state.removeErrors();
        cm.off('cursorActivity', onCursorActivity);
        delete cm.state.lint;
    }

    if(options) {
        cm.state.lint = new LintState(cm, options || (options = {}));
        cm.on('cursorActivity', onCursorActivity);

        /*
        cm.on('electricInput', (cm, event) => {
            console.log('electricInput', event);
        });
        */
        
        cm.on('change', (cm, event) => {
            if(event.origin === 'undo') {
                cm.lint();
            }
            else { 
                /*             
                const match = CodeMirror.findMatchingTag(cm, {
                    line: event.from.line,
                    ch: event.from.ch
                }, cm.getViewport());

                if(match && match.close) {
                    debounced(() => {
                        !!cm.getValue() && cm.lint();
                    });
                }
                */
            }
        });

        cm.on('change', (cm, event) => {
            if(!!(event.from.line - event.to.line) || !!(event.from.ch - event.to.ch)) {
                console.log(cm.state.lint.findErrorsInRange(event.from, event.to));

                //cm.state.lint.removeErrors(cm.state.lint.findErrorsInRange(event.from, event.to));
            }
            
            /*
            let lineOffset = 0, charOffset = 0;

            console.log(errors);

            if(event.origin === '+input') {

                lineOffset = event.text.length - 1;
                charOffset = event.text.filter(ch => !!ch).length;
            }
            else if(event.origin === '+delete') {
                lineOffset = -event.removed.length + 1;
                charOffset = event.from.ch - event.to.ch;
            }


            if(event.origin === '+input') {
                event.text.forEach(text => {
                    console.log(!!text && text.charCodeAt(0));
                });
            }
            */

            /*
            const lineOffset = event.from.line - event.to.line;
            const charOffset = event.from.ch - event.to.ch;
            */


            /*
            const errors = cm.state.lint.findErrorsInRange(event.from, event.to);

            errors.forEach(error => {
                cm.state.lint.removeError(error);
            });
            */
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
        this.state.lint
            .request(data, options)
            .then(response => {
                resolve(this.state.lint);
            }, error => {
                this.state.lint.cm.operation(() => {
                    reject(error);
                });
            });
    });
});
