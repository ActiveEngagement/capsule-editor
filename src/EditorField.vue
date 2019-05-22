<template>
    <textarea :value="value" />
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/theme/yeti.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/merge/merge.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/merge/merge';
import FormControl from 'vue-interface/src/Mixins/FormControl';
import { deepExtend } from 'vue-interface/src/Helpers/Functions';

export default {

    inheritAttrs: false,

    name: 'editor-field',

    mixins: [
        FormControl
    ],

    props: {

        defaultOptions: {
            type: Object,
            default() {
                return {
                    indentUnit: 4,
                    indentAuto: true,
                    theme: 'dracula',
                    mode: 'htmlmixed',
                    lineNumbers: true,
                    lineWrapping: true,
                    newlineAndIndent: true
                };
            }
        },

        height: {
            type: String,
            default: '100%'
        },

        width: {
            type: String,
            default: '100%'
        }

    },

    computed: {

        options() {
            return deepExtend({}, this.defaultOptions, this.$attrs);
        }

    },

    mounted() {
        this.cm = CodeMirror.fromTextArea(this.$el, this.options);
        this.cm.on('change', () => this.$emit('input', this.cm.getValue()));
        this.cm.on('cursorActivity', (...args) => this.$emit('cursor-activity', ...args));
        this.cm.setSize(this.width, this.height);
        this.$emit('init')
    },

    data() {
        return {
            cm: null
        };
    }

};
</script>

<style lang="scss">
@import './node_modules/bootstrap/scss/_functions.scss';
@import './node_modules/bootstrap/scss/_variables.scss';

.CodeMirror {
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;

    .CodeMirror-lint-errors {
        width: 1.2em;
    }

    .CodeMirror-lint-error-icon {
        width: 1em;
        height: 1em;
        padding: .2em;
        background: $danger;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        transform: translateY(25%);
        margin: auto;

        svg {
            color: $white;
            font-size: .7em;
        }
    }

    .CodeMirror-lint-error-underline {
        color: red !important;
        font-weight: bold;
        background-repeat: repeat-x;
        background-position-y: bottom;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==")
    }
}

.CodeMirror-lint-tooltip {
    background: $danger;
    color: $white;
    z-index: 10;
    padding: .5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}

.CodeMirror-lint-error-bookmark {
    z-index: 10;
    display: none;
    position: fixed;
    white-space: nowrap;
    text-overflow: ellipsis;

    .show > & {
        display: inline-block;
    }

    /*
    svg {
        color: red;
        font-size: .5em;
        transform: translateX(-150%);
    }
    */

    .CodeMirror-lint-error-bookmark-text {
        top: 0;
        left: 0;
        color: $white;
        padding: .5em;
        position: absolute;
        background: $danger;
        transform: translateY(-100%);
    }
}
</style>
