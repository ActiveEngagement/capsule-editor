<script lang="ts">
import { forceLinting } from '@codemirror/lint';
import { BugAntIcon, ChevronLeftIcon, ChevronRightIcon, ExclamationTriangleIcon, WrenchScrewdriverIcon } from '@heroicons/vue/24/outline';
import { AnimateCss } from '@vue-interface/animate-css';
import { Btn } from '@vue-interface/btn';
import { BtnDropdown } from '@vue-interface/btn-dropdown';
import { defineComponent } from 'vue';
import EditorError from './EditorError.vue';

export default defineComponent({
    
    components: {
        AnimateCss,
        Btn,
        BtnDropdown,
        ChevronLeftIcon,
        ChevronRightIcon,
        EditorError,
        BugAntIcon,
        ExclamationTriangleIcon,
        WrenchScrewdriverIcon
    },

    props: {
        saveButton: {
            type: Boolean,
            default: true
        },

        saveButtonLabel: {
            type: String,
            default: 'Save File'
        },
        
        view: {
            type: Object,
            default: undefined
        }
    },

    emits: [
        'goto',
        'update:modelValue',
        'save'
    ],

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
                .filter(({ validate }: { validate: Function }) => {
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
        if(!this.isEmpty() && this.hasLinted && (this.saveButton || !this.saveButton && this.diagnostics.length)) {
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
                .filter((diagnostic: any) => diagnostic.isActive)
                .pop();
        },

        goto(index: number) {
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

        compare(a: any, b: any) {
            return (!!a && !!b)
                && a.from === b.from
                && a.to === b.to
                && a.rule.id === b.rule.id;
        },

        update(diagnostics: any) {
            this.diagnostics = diagnostics || [];
            this.hasLinted = true;

            if(!this.currentDiagnostic) {
                this.currentDiagnostic = this.diagnostics[this.index];
            }
            
            this.$emit('update:modelValue', this.diagnostics);
        },
        
        activate(view: any) {
            const { from, to } = view.state.selection.main;

            const active = this.diagnostics.filter((diagnostic: any) => {
                if(from === to) {
                    return diagnostic.from <= from && diagnostic.to >= to;
                }

                return diagnostic.from >= from && diagnostic.to <= to;
            });

            const match = this.diagnostics.find((diagnostic: any) => {
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

        onClickAction(diagnostic: any, action: any) {
            action.apply(this.view, diagnostic.from, diagnostic.to);

            forceLinting(this.view);
        }

    }

});
</script>

<template>
    <footer
        class="editor-footer"
        :style="{minHeight: !showFooter ? 0 : undefined}">
        <animate-css
            name="fade"
            :duration="200">
            <div
                v-if="showFooterContent"
                class="flex justify-between items-center w-full py-4">
                <div class="flex items-center w-full overflow-hidden relative gap-2">
                    <div class="editor-footer-pager">
                        <div v-if="totalDiagnostics">
                            <btn
                                type="button"
                                variant="link"
                                @click="goto(index - 1)">
                                <ChevronLeftIcon class="w-4 h-4" />
                            </btn> 
                            <span>{{ index + 1 }} of {{ diagnostics.length }}</span>
                            <btn
                                type="button"
                                variant="link"
                                @click="goto(index + 1)">
                                <ChevronRightIcon class="w-4 h-4" />
                            </btn>
                        </div>
                    </div>
                    <button
                        v-if="currentDiagnostic"
                        type="button"
                        @click="goto(index)">
                        <BugAntIcon
                            v-if="currentDiagnostic.severity === 'error'"
                            class="w-6 h-6" />
                                
                        <ExclamationTriangleIcon
                            v-if="currentDiagnostic.severity === 'warning'"
                            class="w-6 h-6" />
                    </button>
                    <div class="editor-footer-diagnostic">
                        <animate-css
                            name="fade"
                            :duration="200"
                            :direction="direction"
                            leave-active-class="position-absolute">
                            <editor-error
                                v-if="currentDiagnostic"
                                :key="index"
                                :error="currentDiagnostic" />
                        </animate-css>
                    </div>
                </div>
                <div class="editor-footer-action">
                    <slot name="before-save-button" />

                    <slot name="action-button">
                        <template v-if="actions.length">
                            <template v-if="actions.length === 1">
                                <btn
                                    type="button"
                                    variant="light"
                                    class="flex items-center gap-2"
                                    @click="() => onClickAction(currentDiagnostic, actions[0])">
                                    <WrenchScrewdriverIcon class="w-6 h-6" /> {{ actions[0].name }}
                                </btn>
                            </template>
                            <template v-else>
                                <btn-dropdown
                                    label="Fix Errors"
                                    type="button"
                                    variant="light"
                                    dropup>
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

                    <slot
                        name="save-button"
                        :diagnostics="diagnostics"
                        :save-button-label="diagnostics">
                        <btn
                            v-if="saveButton && !diagnostics.length"
                            type="button"
                            variant="light"
                            @click="$emit('save')">
                            {{ saveButtonLabel }}
                        </btn>
                    </slot>

                    <slot
                        name="after-save-button"
                        :diagnostics="diagnostics" />
                </div>
            </div>
        </animate-css>
    </footer>
</template>

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