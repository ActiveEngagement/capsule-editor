import axios from 'axios';
import { isArray } from 'vue-interface/src/Helpers/Functions';

const GUTTER_ID = 'CodeMirror-lint-errors';

export default class LintState {
    constructor(cm, options) {
        if(typeof options !== 'object') {
            throw new Error('The options must be a JSON object.');
        }

        this.cm = cm;
        this.errors = [];
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
            return fn(...args);
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
        this.callback('onStart');

        return new Promise((resolve, reject) => {
            axios.post(
                this.value('url'),
                (data || this.value('data')),
                (options || this.value('options') || this.options)
            ).then(response => {
                this.errors = [];
                this.response = response = this.option('transformResponse')
                    ? this.callback('transformResponse', response) : response.data;

                resolve(response);

                this.callback('onSuccess', response);
                this.callback('onComplete', true, response);
            }, error => {
                this.response = null;
                const errors = this.option('transformResponseError')
                    ? this.callback('transformResponseError', error)
                    : (error.response.data.errors || error.response.data);

                if(isArray(errors)) {
                    this.errors = errors;
                }

                reject(error);

                this.callback('onError', error);
                this.callback('onComplete', false, error);
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
        this.$errors = value;
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
