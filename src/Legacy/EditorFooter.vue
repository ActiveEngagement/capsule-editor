<template>
    <footer class="editor-footer">
        <div class="editor-footer-pager">
            <animate-css name="fade">
                <div v-if="totalErrors">
                    <btn variant="link" @click.prevent="goto(index - 1)">
                        <icon icon="caret-left" />
                    </btn> 
                    <span>{{ index + 1 }} of {{ errors.length }} </span>
                    <btn variant="link" @click.prevent="goto(index + 1)">
                        <icon icon="caret-right" />
                    </btn>
                </div>
            </animate-css>
        </div>
        <div class="editor-footer-error">
            <animate-css name="fade" :direction="direction" leave-active-class="position-absolute">
                <editor-error v-if="error" :key="index" :error="error" />
            </animate-css>
        </div>
        <animate-css name="fade">
            <btn v-if="finish" type="button" variant="light" size="lg" :disabled="!!error" @click="$emit('finish')">
                Finish <icon icon="long-arrow-alt-right" />
            </btn>
        </animate-css>
    </footer>
</template>

<script>
import AnimateCss from '@vue-interface/animate-css';
import Btn from '@vue-interface/btn';
import EditorError from './EditorError';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome';
import { faCaretLeft, faCaretRight, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretLeft, faCaretRight, faLongArrowAltRight);

export default {

    components: {
        AnimateCss,
        Btn,
        EditorError,
        Icon,
    },

    props: {

        cm: {
            type: Object,
            required: true
        },

        finish: {
            type: Boolean,
            default: false
        },

        demoMode: Boolean,

        errors: {
            type: Array,
            default: () => []
        }

    },

    data() {
        const { line, ch } = this.cm.getCursor();

        return {
            ch: ch,
            line: line,
            direction: 'up',
            error: this.errors.length && this.errors[0]
        };
    },

    computed: {

        index() {
            return Math.max(0, this.errors.indexOf(this.error));
        },

        totalErrors() {
            return this.errors.length;
        }

    },

    watch: {

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

    }

};
</script>

<style lang="scss">
@import './node_modules/bootstrap/scss/_functions.scss';
@import './node_modules/bootstrap/scss/_variables.scss';

.editor-footer {
    height: 0;
    color: $white;
    display: grid;
    padding-right: 1rem;
    grid-template-columns: auto minmax(0, 100%) minmax(0, auto);
    position: relative;
    align-items: center;
    transition: .2s all ease-in;

    .footer & {
        height: 4.75rem;
    }

    .editor-footer-error {
        font-weight: 300;
        font-size: 1.2em;
        padding-left: .75rem;
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
