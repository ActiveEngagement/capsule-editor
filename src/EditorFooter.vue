<template>
    <footer class="editor-footer d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center w-100">
            <div class="d-flex align-items-center">
                <div class="ml-2 mr-2">
                    <animate-css name="fade">
                        <btn type="button" variant="link" v-if="totalErrors" class="text-white" @click="goto(index)">
                            <font-awesome-icon icon="exclamation-triangle" size="lg" />
                        </btn>
                    </animate-css>
                </div>
                <div class="editor-footer-pager flex-shrink-0">
                    <animate-css name="fade">
                        <div v-if="totalErrors" class="py-2 mr-3">
                            <btn type="button" variant="link" @click="goto(index - 1)">
                                <font-awesome-icon icon="caret-left" />
                            </btn> 
                            <span>{{ index + 1 }} of {{ errors.length }} </span>
                            <btn type="button" variant="link" @click="goto(index + 1)">
                                <font-awesome-icon icon="caret-right" />
                            </btn>
                        </div>
                    </animate-css>
                </div>
            </div>
            <div class="editor-footer-error">
                <animate-css name="fade" :direction="direction" leave-active-class="position-absolute">
                    <editor-error v-if="currentError" :key="index" :error="currentError" class="py-2" />
                </animate-css>
            </div>
        </div>
        <div v-if="!isEmpty() && (saveButton || fixedAllErrors)" class="flex-shrink-0 p-2">
            <slot name="before-save-button" />
            <slot name="save-button">
                <btn type="button" variant="light" @click="$emit('save'); $emit('finish')">
                    <font-awesome-icon icon="save" class="mr-1" /> {{ saveButtonLabel }}
                </btn>
            </slot>
            <slot name="after-save-button" />
        </div>
    </footer>
</template>

<script>
import AnimateCss from '@vue-interface/animate-css';
import Btn from '@vue-interface/btn';
import EditorError from './EditorError';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretLeft, faCaretRight, faSave } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretLeft, faCaretRight, faSave);

export default {

    components: {
        AnimateCss,
        Btn,
        EditorError,
        FontAwesomeIcon,
    },

    props: {
        saveButton: {
            type: Boolean,
            default: false
        },
        saveButtonLabel: {
            type: String,
            default: 'Save File'
        }
    },

    data() {
        return {
            currentError: null,
            direction: 'up',
            errors: [],
            fixedAllErrors: false,
            view: null
        };
    },

    computed: {

        index() {
            return Math.max(0, this.errors.indexOf(this.currentError));
        },

        totalErrors() {
            return this.errors.length;
        }

    },

    watch: {
        errors(value, oldValue) {
            if(value.length) {
                this.fixedAllErrors = false;
            }
            else if(!value.length && !!oldValue.length) {
                this.currentError = null;
                this.fixedAllErrors = true;
            }
            else if(!value.length) {
                this.fixedAllErrors = true;
            }
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

            this.currentError = this.errors[index];
            this.$emit('goto', this.currentError);
        },

        isEmpty() {
            return this.view && this.view.state.doc.toString() === '';
        },

        update(view, { errors }) {
            this.errors = errors || [];

            const { from, to } = view.state.selection.main;

            const active = errors.filter(error => {
                if(from === to) {
                    return error.from <= from && error.to >= to;
                }

                return error.from >= from && error.to <= to;
            });

            if(active.length) {
                this.currentError = active[0];
            }
            else {
                this.currentError = this.errors[0];
            }

            this.$emit('input', this.errors);
        },

    }

};
</script>

<style lang="scss">
.editor-footer {
    color: white;
    position: relative;
    align-items: end;
    transition: .2s all ease-in;

    .footer & {
        height: 4.75rem;
    }

    .editor-footer-error {
        font-weight: 300;
        font-size: 1.2em;
    }

    .editor-footer-pager {
        min-width: 10.5rem;

        & > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .btn {
            padding: 0;
            color: white;
            width: 2.5rem;
            height: 2.5rem;
            font-size: 2rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: .6666rem;
            background: transparent;
            border: 0;
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