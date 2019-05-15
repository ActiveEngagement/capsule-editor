import axios from 'axios';
import CodeMirror from 'codemirror';
import LintError from './LintError';
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
        return this.errors.filter(error => {
            return error.isActive();
        });
    }

    findErrorsInRange(from, to) {
        return this.errors.filter(error => {
            const match = CodeMirror.findMatchingTag(this.cm, {
                line: error.line - 1,
                ch: error.column
            }, this.cm.getViewport());

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
        return this.$errors || [];
    }

    set errors(value) {
        // Check if the value isn't an array
        if(!isArray(value)) {
            return this.$errors = [];
        }
        
        let showError;

        // Loop through the existing errors and check to see if any are visible.
        // If an error is visible, set the variable. After the check, clear the
        // error.
        this.errors.forEach(error => {
            if(error.isVisible()) {
                showError = error;
            }

            error.clear();
        });
        
        // Map the array of standard objects to an array of LintError instances.
        this.$errors = value.map(error => {
            // Convert error to a LintError
            error = new LintError(this.cm, error);

            // Compare the error to the showError variable and if they are
            // the same, show the error by default. Keeps the state from
            // shuffling after a lint request returns.
            if(showError && LintError.compare(error, showError)) {
                error.show();
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
