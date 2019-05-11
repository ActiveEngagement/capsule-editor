import axios from 'axios';
import CodeMirror from 'codemirror';
import fontawesome from '@fortawesome/fontawesome';
import { isArray } from 'vue-interface/src/Helpers/Functions';
import { faBug, faExclamation } from '@fortawesome/free-solid-svg-icons';

const GUTTER_ID = 'CodeMirror-lint-errors';
const UNDERLINE_CLASS = 'CodeMirror-lint-error-underline';


export default class LintState {
    constructor(cm, options) {
        if(typeof options !== 'object') {
            throw new Error('The options must be a JSON object.');
        }

        const errors = options.errors || [];

        delete options.errors;

        this.cm = cm;
        this.errors = errors;
        this.options = options;
    }

    value(key, ...args) {
        const subject = this.option(key);

        return typeof subject === 'function' ? subject(this.cm, ...args) : subject;
    }

    option(key, defaultValue) {
        return this.getOption(key, defaultValue);
    }

    callback(key, ...args) {
        const fn = this.option(key);

        if(typeof fn === 'function') {
            return fn(this.cm, ...args);
        }
    }

    setOption(key, value) {
        this.options[key] = value;
    }

    getOption(key, defaultValue) {
        const value = this.options[key];

        return value === undefined ? defaultValue : value;
    }

    request(data, options) {
        this.callback('onLintStart');

        return new Promise((resolve, reject) => {
            axios.post(
                this.value('url'),
                (data || this.value('data')),
                (options || this.value('options') || this.options)
            ).then(response => {
                this.errors = [];
                this.response = response = (
                    this.option('transformResponse') ? this.callback('transformResponse', response) : response.data
                );

                resolve(response);

                this.callback('onLintSuccess', response);
                this.callback('onLintComplete', true, response);
            }, error => {
                this.response = null;
                const errors = this.option('transformResponseError')
                    ? this.callback('transformResponseError', error)
                    : (error.response.data.errors || error.response.data);

                if(isArray(errors)) {
                    this.errors = errors;
                }

                reject(error);

                this.callback('onLintError', error);
                this.callback('onLintComplete', false, error);
            });
        });
    }

    findNearbyErrors(position) {
        function check(value) {
            return value && (
                value.from.line <= position.line &&
                value.to.line >= position.line
            ) && (
                value.from.ch <= position.ch &&
                value.to.ch >= position.ch
            );
        }

        return this.errors.filter(error => {
            return error.match && (check(error.match.open) || check(error.match.close));
        });
    }

    isTagInRange(tag, from, to) {
        return (tag.to && this.isPositionInRange(tag.to, from, to)) || (tag.from && this.isPositionInRange(tag.from, from, to));
    }

    isPositionInRange({line, ch}, from, to) {
        //console.log(line, ch, JSON.parse(JSON.stringify(from)), JSON.parse(JSON.stringify(to)), from.line > line || to.line < line, from.line === line && from.ch > ch, to.line === line && to.ch < ch);

        if(from.line > line || to.line < line) {
            return false;
        }
        else if(from.line === line && from.ch > ch) {
            return false;
        }
        else if(to.line === line && to.ch < ch) {
            return false;
        }

        return true;
    }

    findErrorsInRange(from, to) {
        return this.errors.filter(error => {
            console.log(error.match.open, error.match.close);
            
            return (
                this.isTagInRange(error.match.open, from, to) ||
                this.isTagInRange(error.match.close, from, to)
            );
        });
    }

    createIcon(error) {
        const icon = document.createElement('div');
    
        icon.className = 'CodeMirror-lint-error-icon';
        icon.innerHTML = fontawesome.icon(faBug).html;
        icon.title = `${error.line},${error.column} :: ${error.code} ${error.msg} (${error.rule})`;
        icon.error = error;
    
        return icon;
    }

    setCursorOnError(error) {
        if(!error && this.errors.length) {
            error = this.errors[0];
        }
        
        if(error) {
            const tag = error.match.open || error.match.close;

            this.cm.scrollIntoView(tag, this.cm.getScrollInfo().clientHeight / 2);

            setTimeout(() => {
                this.cm.setCursor(error.line - 1, error.column);
            });
        }
    }

    getErrorIndex(error) {
        return this.errors.findIndex(value => error === value);
    }    

    createTooltip(html) {
        const div = document.createElement('div');

        div.className = 'CodeMirror-lint-tooltip';
        div.innerHTML = html;

        return div;
    }

    createErrorBookmark(error) {
        const div = document.createElement('div');

        div.error = error;
        div.className = 'CodeMirror-lint-error-bookmark';
        div.innerHTML = `
            <div class="CodeMirror-lint-error-bookmark-text">
                ${fontawesome.icon(faExclamation).html} ${error.line},${error.column} :: ${error.code} ${error.msg} (${error.rule})
            </div>
        `;

        document.documentElement.appendChild(div);

        return div;
    }

    removeError(error) {
        const removed = this.errors.splice(this.getErrorIndex(error), 1).pop();

        error.open && error.open.clear();
        error.close && error.close.clear();

        if(!this.errors.length) {
            this.cm.clearGutter(this.id);
        }
        else {
            const lineErrors = this.errors.filter(e => {
                return removed.line === e.line;
            });
            
            if(!lineErrors.length) {
                this.cm.setGutterMarker(removed.line - 1, this.id, null);
            }
        }

        this.callback('onRemoveError', removed, this.errors);
    }

    removeErrors(errors) {
        (errors || this.errors).forEach(error => {
            this.removeError(error);
        });
    }

    get id() {
        return this.constructor.id;
    }

    get cm() {
        return this.$cm;
    }

    set cm(value) {
        this.$cm = value;
    }

    get options() {
        return this.$options;
    }

    set options(value) {
        this.$options = value;
    }

    get response() {
        return this.$response;
    }

    set response(value) {
        this.$response = value;
    }

    get errors() {
        return this.$errors;
    }

    set errors(value) {
        this.$errors = !isArray(value) ? null : value.map(error => {
            this.cm.setGutterMarker(error.line - 1, this.id, this.createIcon(error));

            error.match = CodeMirror.findMatchingTag(this.cm, {
                line: error.line - 1,
                ch: error.column
            }, this.cm.getViewport());

            if(error.match) {
                if(error.match.open) {
                    error.open = this.cm.markText(
                        error.match.open.from,
                        error.match.open.to, {
                            title: error.message,
                            className: UNDERLINE_CLASS
                        }
                    );
                }

                if(error.match.close) {
                    error.close = this.cm.markText(
                        error.match.close.from,
                        error.match.close.to, {
                            className: UNDERLINE_CLASS
                        }
                    );
                }

                const pos = error.match.open.from;
                
                error.bookmark = this.cm.setBookmark(new pos.constructor(pos.line, pos.ch, pos.sticky), {
                    insertLeft: true,
                    widget: this.createErrorBookmark(error)
                });
                
            }

            return error;
        });
    }

    get hasGutter() {
        const gutters = this.cm.getOption('gutters');

        for(var i = 0; i < gutters.length; ++i) {
            if(gutters[i] === GUTTER_ID) {
                return true;
            }
        }

        return false;
    }

    static get id() {
        return GUTTER_ID;
    }
}
