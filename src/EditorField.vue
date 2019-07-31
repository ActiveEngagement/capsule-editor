<template>
    <textarea :value="value" v-html="value" />
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
import 'codemirror/addon/edit/closetag';
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
import 'codemirror/keymap/sublime';
import FormControl from 'vue-interface/src/Mixins/FormControl';
import { deepExtend } from 'vue-interface/src/Helpers/Functions';

import './CodeMirror/Lint';
import './CodeMirror/BlockTags';

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
                    theme: 'dracula',
                    mode: 'htmlmixed',
                    keyMap: 'sublime',
                    tabSize: 4,
                    indentUnit: 4,
                    foldGutter: true,
                    blockTags: true,
                    smartIndent: false,
                    lineNumbers: true,
                    lineWrapping: true,
                    indentWithTabs: true,
                    newlineAndIndent: false,
                    autoCloseTags: {
                        indentTags: [],
                        whenClosing: true,
                        whenOpening: true
                    },
                    matchTags: {
                        bothTags: true
                    }
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
        },

        value: String

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
        this.$nextTick(() => {
            this.$emit('initialize', this.cm);
        });
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
        font-size: 1em;
        cursor: pointer;
        background: $danger;
        border-radius: 100%;
        transform: translateY(25%);
        margin: auto;

        svg {
            color: $white;
            font-size: .75em;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .cm-error,
    .CodeMirror-lint-error-underline {
        color: red !important;
        font-weight: bold;
        background-repeat: repeat-x;
        background-position-y: bottom;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==")
    }
}

.CodeMirror-lint-tooltip,
.CodeMirror-lint-error-window {
    background: $danger;
    color: $white;
    z-index: 10;
    padding: .5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}

.CodeMirror-lint-error-window {
    z-index: -1;
    position: fixed;
    opacity: 0;
    transition: .25s all ease-in;
    transform: translate(1em, -100%);
    
    &.show {
        z-index: 10000;
        opacity: 1;
    }
}

.CodeMirror-lint-error-bookmark {
    z-index: 10;
    display: none;
    position: absolute;
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
