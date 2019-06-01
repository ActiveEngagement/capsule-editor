<template>
    <footer class="editor-footer">
        <div class="editor-footer-pager">
            <animate-css name="fade">
                <div v-if="totalErrors">
                    <btn variant="link" @click.prevent="goto(index - 1)"><icon icon="caret-left" /></btn> 
                    <span>{{ index + 1 }} of {{ errors.length }} </span>
                    <btn variant="link" @click.prevent="goto(index + 1)"><icon icon="caret-right" /></btn>
                </div>
            </animate-css>
        </div>
        <div class="editor-footer-error">
            <animate-css name="fade" :direction="direction" leave-active-class="position-absolute">
                <editor-error v-if="error" :error="error" :key="index" />
            </animate-css>
        </div>
        <animate-css name="fade">
            <btn v-if="showFinishButton" type="button" size="lg" :disabled="!!error" @click="$emit('finish')">Finish</btn>
        </animate-css>
    </footer>
</template>

<script>
import EditorError from './EditorError';
import Btn from 'vue-interface/src/Components/Btn';
import { library } from '@fortawesome/fontawesome-svg-core';
import AnimateCss from 'vue-interface/src/Components/AnimateCss';
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';

library.add(faCaretLeft);
library.add(faCaretRight);

export default {

    name: 'editor-footer',

    components: {
        Btn,
        Icon,
        AnimateCss,
        EditorError
    },

    props: {

        cm: {
            type: Object,
            required: true
        },

        demoMode: Boolean,

        errors: {
            type: Array,
            default: () => []
        }

    },

    watch: {

        /*
        ['cm.state.lint.errors'](value, oldValue) {
            if(!this.error && this.errors.length) {
                this.error = this.errors[0];
            }
            else if(!this.errors.length) {
                this.error = null;
            }
 
            if(!value.length && this.totalErrors) {  
                this.cm.state.lint.send().then(response => {
                    if(this.demoMode && this.cm.getValue()) {
                        this.$emit('finish-popup');
                    }
                }, e => {
                    this.state.lint.errors = e.response.data.errors;
                });
            }

            this.totalErrors = value.length;
        },
        */

        errors(value) {
            const error = this.findActiveError() || this.errors[0];

            if(this.errors !== error) {
                this.error = error;
            }
        },

        error(value, oldValue) {
            this.direction = this.index > this.errors.indexOf(oldValue) ? 'down': 'up';
        }

    },

    computed: {

        index() {
            return Math.max(0, this.errors.indexOf(this.error));
        },

        totalErrors() {
            return this.errors.length;
        }

    },

    methods: {

        findActiveError() {
            return this.errors
                .filter(error => error.isActive)
                .pop();
        },
        
        goto(index) {
            if(index < 0) {
                index = this.errors.length - 1;
            }
            else if(index > this.errors.length - 1) {
                index = 0;
            }
            
            const { line, ch } = this.errors[index] || {
                ch: this.ch,
                line: this.line
            };

            this.cm.setCursor(line, ch);
            this.cm.focus();
        },

        onCursorActivity(cm) {
            const { line, ch } = cm.getCursor();
            const error = this.findActiveError();

            this.ch = ch;
            this.line = line;

            if(error) {
                this.error = error;
            }
        }

    },

    mounted() {
        if(this.$parent.$refs.field) {
            this.$parent.$refs.field.$on('cursor-activity', this.onCursorActivity);
        }
    },

    beforeDestroy() {
        if(this.$parent.$refs.field) {
            this.$parent.$refs.field.$off('cursor-activity', this.onCursorActivity);
        }
    },

    data() {
        const { line, ch } = this.cm.getCursor();

        return {
            ch: ch,
            line: line,
            direction: 'up',
            showFinishButton: false,
            error: this.errors.length && this.errors[0]
        }
    }

};
</script>

<style lang="scss">
@import './node_modules/bootstrap/scss/_functions.scss';
@import './node_modules/bootstrap/scss/_variables.scss';

.editor-footer{
    height: 0;
    color: $white;
    display: grid;
    padding-right: 1rem;
    grid-template-columns: auto minmax(auto, 100%) minmax(auto, 5rem);
    position: relative;
    align-items: center;
    transition: .2s all ease-in;

    .footer & {
        height: 4rem;
    }

    .editor-footer-error {
        font-weight: 300;
        font-size: 1.2em;
        padding-left: .75rem;

        svg {
            margin-right: .75rem;
        }

    }

    .editor-footer-pager {
        width: 9.5rem;
        padding-left: .5rem;

        & > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .btn {
            padding: 0;
            color: $white;
            width: 2.5rem;
            height: 2.5rem;
            font-size: 2rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: .6666rem;
        }

        .btn:active {
            background: rgba(0, 0, 0, .3);
        }

        span {
            padding: 0 .5rem;
        }
    }
}
</style>
