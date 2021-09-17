<template>
    <footer class="editor-footer d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center w-100">
            <div class="d-flex align-items-center">
                <div class="editor-footer-pager flex-shrink-0">
                    <animate-css name="fade">
                        <div v-if="totalDiagnostics" class="py-2 mx-2">
                            <btn type="button" variant="link" @click="goto(index - 1)">
                                <font-awesome-icon icon="caret-left" />
                            </btn> 
                            <span>{{ index + 1 }} of {{ diagnostics.length }} </span>
                            <btn type="button" variant="link" @click="goto(index + 1)">
                                <font-awesome-icon icon="caret-right" />
                            </btn>
                        </div>
                    </animate-css>
                </div>
                <div class="mr-3">
                    <animate-css name="fade">
                        <btn v-if="currentDiagnostic" type="button" variant="link" class="text-white" @click="goto(index)">
                            <font-awesome-icon v-if="currentDiagnostic.severity === 'error'" icon="bug" size="lg" />
                            <font-awesome-icon v-if="currentDiagnostic.severity === 'warning'" icon="exclamation-triangle" size="lg" />
                        </btn>
                    </animate-css>
                </div>
            </div>
            <div class="editor-footer-diagnostic">
                <animate-css name="fade" :direction="direction" leave-active-class="position-absolute">
                    <editor-error v-if="currentDiagnostic" :key="index" :error="currentDiagnostic" class="py-2 pr-3" />
                </animate-css>
            </div>
        </div>
        <div class="flex-shrink-0 pr-2">
            <slot name="before-save-button" />

            <slot name="action-button">
                <template v-if="currentDiagnostic && currentDiagnostic.rule.actions.length">
                    <template v-if="currentDiagnostic.rule.actions.length === 1">
                        <btn type="button" variant="light" @click="$emit('action', currentDiagnostic, actions[0])">
                            <font-awesome-icon icon="hammer" class="mr-1" /> {{ actions[0].name }}
                        </btn>
                    </template>
                    <template v-else>
                        <btn-dropdown label="Fix Errors" type="button" variant="light" dropup>
                            <template #icon>
                                <font-awesome-icon icon="hammer" class="mr-2" /> 
                            </template>
                            <button v-for="(action, i) in actions" :key="`${currentDiagnostic.rule.id}-${i}`" type="button" variant="light" @click="$emit('action', currentDiagnostic, action)">
                                {{ action.name }}
                            </button>
                        </btn-dropdown>
                    </template>
                </template>
            </slot>

            <slot name="save-button" :has-linted="hasLinted" :fixed-all-diagnostics="fixedAllDiagnostics" :is-empty="isEmpty">
                <btn v-if="!isEmpty() && hasLinted && fixedAllDiagnostics" type="button" variant="light" @click="$emit('save')">
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
import BtnDropdown from '@vue-interface/btn-dropdown';
import EditorError from './EditorError';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBug, faCaretLeft, faCaretRight, faExclamationTriangle, faHammer, faSave, faScrewdriver } from '@fortawesome/free-solid-svg-icons';

library.add(faBug, faCaretLeft, faCaretRight, faExclamationTriangle, faSave, faHammer);

export default {

    components: {
        AnimateCss,
        Btn,
        BtnDropdown,
        EditorError,
        FontAwesomeIcon,
    },

    props: {
        saveButtonLabel: {
            type: String,
            default: 'Save File'
        }
    },

    data() {
        return {
            currentDiagnostic: null,
            direction: 'up',
            diagnostics: [],
            hasLinted: false,
            fixedAllDiagnostics: false,
            view: null
        };
    },

    computed: {

        actions() {
            return this.currentDiagnostic && [].concat(this.currentDiagnostic.rule.actions).reverse();
        },

        index() {
            return Math.max(0, this.diagnostics.indexOf(this.currentDiagnostic));
        },

        totalDiagnostics() {
            return this.diagnostics.length;
        }

    },

    watch: {

        currentDiagnostic(value, oldValue) {
            this.direction = this.index > this.diagnostics.indexOf(oldValue) ? 'down': 'up';
        },

        diagnostics(value, oldValue) {
            if(value.length) {
                this.fixedAllDiagnostics = false;
            }
            else if(!value.length && !!oldValue.length) {
                this.hasLinted = true;
                this.currentDiagnostic = null;
                this.fixedAllDiagnostics = true;
            }
            else if(!value.length) {
                this.fixedAllDiagnostics = true;
            }
        }
    },

    methods: {

        findActiveDiagnostic() {
            return this.diagnostics
                .filter(diagnostic => diagnostic.isActive)
                .pop();
        },

        goto(index) {
            if(index < 0) {
                index = this.diagnostics.length - 1;
            }
            else if(index > this.diagnostics.length - 1) {
                index = 0;
            }

            const lastDiagnostic = this.currentDiagnostic;
            
            this.currentDiagnostic = this.diagnostics[index];   

            this.$emit('goto', this.currentDiagnostic, lastDiagnostic);
        },

        isEmpty() {
            return this.view && this.view.state.doc.toString() === '';
        },

        compare(a, b) {
            return (!!a && !!b)
                && a.from === b.from
                && a.to === b.to
                && a.rule.id === b.rule.id;
        },

        update(diagnostics) {
            this.diagnostics = diagnostics || [];

            if(!this.currentDiagnostic) {
                this.currentDiagnostic = this.diagnostics[this.index];
            }
            
            this.$emit('input', this.diagnostics);
        },
        
        activate(view) {
            const { from, to } = view.state.selection.main;

            const active = this.diagnostics.filter(diagnostic => {
                if(from === to) {
                    return diagnostic.from <= from && diagnostic.to >= to;
                }

                return diagnostic.from >= from && diagnostic.to <= to;
            });

            const match = this.diagnostics.find(diagnostic => {
                return this.compare(diagnostic, this.currentDiagnostic);
            });

            const index = active.indexOf(this.currentDiagnostic);

            if(active.length) {
                this.currentDiagnostic = active[index];
            }
            else {
                this.currentDiagnostic = match || this.diagnostics[this.index];
            }
        }

    }

};
</script>

<style lang="scss">
.editor-footer {
    color: white;
    position: relative;
    align-items: end;
    transition: .2s all ease-in;
    min-height: 3.5rem;

    .footer & {
        height: 4.75rem;
    }

    .editor-footer-diagnostic {
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