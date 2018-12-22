import CodeMirror from 'codemirror';
import LintState from './LintState';
import fontawesome from '@fortawesome/fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const UNDERLINE_CLASS = 'CodeMirror-lint-error-underline';

function removeExistingErrors(state, errors) {
    state.lint.cm.clearGutter(state.lint.id);

    (errors || state.lint.errors).forEach(error => {
        error.open && error.open.clear();
        error.close && error.close.clear();
    });
}

function createTooltipContainer() {
    let container = document.querySelector('.CodeMirror-lint-tooltip-container');

    if(container) {
        return container;
    }

    container = document.createElement('div');
    container.className = 'CodeMirror-lint-tooltip-container CodeMirror-sizer';
    container.style.marginLeft = document.querySelector('.CodeMirror-sizer').style.marginLeft;
    container.style.borderRightWidth = document.querySelector('.CodeMirror-sizer').style.borderRightWidth;

    document.documentElement.appendChild(container);

    return container;
}

function createTooltip(html) {
    const div = document.createElement('div');

    div.className = 'CodeMirror-lint-tooltip';
    div.innerHTML = html;

    createTooltipContainer().appendChild(div);

    div.style.transform = `translateY(calc(-${div.clientHeight}px + 1.5em))`;

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
        cm.lintErrorTooltip = createTooltip(message);
        cm.addWidget({ ch, line }, cm.lintErrorTooltip, true);

        document.documentElement.querySelector('.CodeMirror-lint-tooltip-container').appendChild(cm.lintErrorTooltip);

        const bounds = cm.lintErrorTooltip.getBoundingClientRect();
        const offset = bounds.left + bounds.width - cm.getScrollInfo().clientWidth;

        if(offset > 0) {
            cm.lintErrorTooltip.style.transform = `translate(${-offset}px, calc(-${cm.lintErrorTooltip.clientHeight}px + 1.5em))`;
        }
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
        cm.on('inputRead', event => {
            cm.lint();
        });
    }
});

CodeMirror.defineExtension('lint', function(data, options) {
    return new Promise((resolve, reject) => {
        console.log(this.state.lint.errors);

        const existingErrors = this.state.lint.errors;

        this.state.lint
            .request(data, options)
            .then(response => {
                removeExistingErrors(this.state, existingErrors);
                resolve(this.state.lint);
            }, error => {
                removeExistingErrors(this.state, existingErrors);

                this.state.lint.cm.operation(() => {
                    const range = this.state.lint.cm.getViewport();

                    if(typeof this.state.lint.errors !== 'array') {
                        return;
                    }

                    this.state.lint.errors.forEach(error => {
                        this.state.lint.cm.setGutterMarker(error.line - 1, this.state.lint.id, createIcon(error));

                        error.match = CodeMirror.findMatchingTag(this.state.lint.cm, {
                            line: parseInt(error.line) - 1,
                            ch: parseInt(error.column)
                        }, range);

                        if(error.match) {
                            if(error.match.open) {
                                error.open = this.state.lint.cm.markText(error.match.open.from, error.match.open.to, {
                                    className: 'CodeMirror-lint-error-underline'
                                });
                            }

                            if(error.match.close) {
                                error.close = this.state.lint.cm.markText(error.match.close.from, error.match.close.to, {
                                    className: UNDERLINE_CLASS
                                });
                            }
                        }
                    });

                    if(this.state.lint.errors.length && this.state.lint.errors[0].match) {
                        this.state.lint.cm.scrollIntoView(
                            this.state.lint.errors[0].match.open ||
                            this.state.lint.errors[0].match.close,
                            this.state.lint.cm.getScrollInfo().clientHeight / 2
                        );

                        setTimeout(() => {
                            this.state.lint.cm.setCursor(
                                parseInt(this.state.lint.errors[0].line) - 1,
                                parseInt(this.state.lint.errors[0].column)
                            );
                        });
                    }

                    reject(error);
                });
            });
    });
});
