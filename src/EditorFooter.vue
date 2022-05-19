<template>
    <footer class="editor-footer" :style="{minHeight: !showFooter ? 0 : undefined}">
        <animate-css name="fade" duration="200ms">
            <div v-if="showFooterContent" class="editor-footer-content">
                <div class="editor-footer-error">
                    <div class="editor-footer-pager">
                        <div v-if="totalDiagnostics">
                            <btn type="button" variant="link" @click="goto(index - 1)">
                                <font-awesome-icon icon="caret-left" />
                            </btn> 
                            <span>{{ index + 1 }} of {{ diagnostics.length }}</span>
                            <btn type="button" variant="link" @click="goto(index + 1)">
                                <font-awesome-icon icon="caret-right" />
                            </btn>
                        </div>
                    </div>
                    <div class="editor-footer-icon">
                        <button v-if="currentDiagnostic" type="button" @click="goto(index)">
                            <font-awesome-icon v-if="currentDiagnostic.severity === 'error'" icon="bug" size="lg" />
                            <font-awesome-icon v-if="currentDiagnostic.severity === 'warning'" icon="exclamation-triangle" size="lg" />
                        </button>
                    </div>
                    <div class="editor-footer-diagnostic">
                        <animate-css name="fade" duration="200ms" :direction="direction" leave-active-class="position-absolute">
                            <editor-error v-if="currentDiagnostic" :key="index" :error="currentDiagnostic" />
                        </animate-css>
                    </div>
                </div>
                <div class="editor-footer-action">
                    <slot name="before-save-button" />

                    <slot name="action-button">
                        <template v-if="actions.length">
                            <template v-if="actions.length === 1">
                                <btn type="button" variant="light" @click="() => onClickAction(currentDiagnostic, action)">
                                    <font-awesome-icon icon="hammer" class="editor-footer-action-icon" /> {{ actions[0].name }}
                                </btn>
                            </template>
                            <template v-else>
                                <btn-dropdown label="Fix Errors" type="button" variant="light" dropup>
                                    <template #icon>
                                        <font-awesome-icon icon="hammer" class="editor-footer-action-icon" /> 
                                    </template>
                                    <button
                                        v-for="(action, i) in actions"
                                        :key="`${currentDiagnostic.rule.id}-${i}`"
                                        type="button"
                                        variant="light"
                                        @click="() => onClickAction(currentDiagnostic, action)">
                                        {{ action.name }}
                                    </button>
                                </btn-dropdown>
                            </template>
                        </template>
                    </slot>

                    <slot name="save-button">
                        <btn v-if="!diagnostics.length" type="button" variant="light" @click="$emit('save')">
                            <font-awesome-icon icon="save" class="editor-footer-action-icon" /> {{ saveButtonLabel }}
                        </btn>
                    </slot>

                    <slot name="after-save-button" />
                </div>
            </div>
        </animate-css>
    </footer>
</template>

<script>
import { forceLinting } from "@codemirror/lint";
import { AnimateCss } from '@vue-interface/animate-css';
import { Btn } from '@vue-interface/btn';
import { BtnDropdown } from '@vue-interface/btn-dropdown';
import EditorError from './EditorError.vue';

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
        },
        
        view: Object
    },

    data() {
        return {
            currentDiagnostic: null,
            direction: 'up',
            diagnostics: [],
            fixedAllDiagnostics: false,
            hasLinted: false,
            showFooter: false,
            showFooterContent: false,
        };
    },

    computed: {

        actions() {
            return this.currentDiagnostic ? []
                .concat(this.currentDiagnostic.rule.actions)
                .reverse()
                .filter(({ validate }) => {
                    return !validate || validate(this.view, this.currentDiagnostic);
                }) : [];
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
                this.hasLinted = true;
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

    updated() {
        if(!this.isEmpty() && this.hasLinted) {
            this.showFooter = true;
            setTimeout(() => this.showFooterContent = true, 200);
        }
        else {
            this.showFooterContent = false;
            setTimeout(() => this.showFooter = false, 200);
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
            return this.view ? this.view.state.doc.toString() === '' : false;
        },

        compare(a, b) {
            return (!!a && !!b)
                && a.from === b.from
                && a.to === b.to
                && a.rule.id === b.rule.id;
        },

        update(diagnostics) {
            this.diagnostics = diagnostics || [];
            this.hasLinted = true;

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

            const index = Math.max(0, active.indexOf(this.currentDiagnostic));
            
            if(active.length) {
                this.currentDiagnostic = active[index];
            }
            else {
                this.currentDiagnostic = match || this.diagnostics[this.index];
            }
        },

        onClickAction(diagnostic, { apply }) {
            apply(this.view, diagnostic.from, diagnostic.to);

            forceLinting(this.view);
        }

    }

};
</script>

<style>
.editor-footer {
    display: flex;
    align-items: center;
    color: white;
    position: relative;
    transition: .2s all ease-in;
    min-height: 3.5rem;
}

.editor-footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
}

.editor-footer-error {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    position: relative;
}

.editor-footer-icon {
    margin-right: .5rem;
}

.editor-footer-icon button {
    color: white;
    padding: 0 1rem;
}

.editor-footer-icon button:active {
    color: #e0e0e0;
}

.editor-footer-action {
    flex-shrink: 0;
    padding-right: 1rem;
}

.editor-footer-action-icon {
    margin-right: .25rem;
}

.editor-footer-diagnostic {
    font-weight: 300;
    font-size: .9em;
    overflow: hidden;
}
    
.editor-footer-pager {
    flex-shrink: 0;
    min-width: 10.5rem;
}

.editor-footer-pager  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .5rem;
}

.editor-footer-pager .btn {
    padding: 0;
    color: white;
    width: 2rem;
    height: 1.75rem;
    font-size: 1.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: .6666rem;
    background: transparent;
    border: 0;
}

.editor-footer-pager .btn:active {
    background: rgba(0, 0, 0, .3);
}
</style>