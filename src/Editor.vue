<template>
    <div class="capsule-editor">
        <editor-demo-modal v-if="demoMode && !demoModalCleared" @clear="onModalClear" />

        <editor-modal v-if="showFinishModal" :content-animation="{name: 'tada'}">
            <template #default="{ isShowing }">
                <slot name="success" :close="closeFinishPopup" :filename="currentFilename" :view="view" :is-showing="isShowing">
                    <animate-css name="zoom" left>
                        <img v-if="isShowing" src="./assets/logo-no-text-1028x1028.png" class="capsule-editor-modal-logo">
                    </animate-css>
                    
                    <slot
                        name="success-content"
                        :content="currentContent"
                        :close="closeFinishPopup"
                        :filename="currentFilename"
                        :view="view">
                        <div class="text-center">
                            <h1 class="font-light">
                                Success!
                            </h1>
                            <h5 class="font-light mb-5">
                                Your document has been fixed.
                            </h5>
                            <btn type="button" variant="primary" size="lg" block @click="closeFinishPopup">
                                Dismiss
                            </btn>
                        </div>
                    </slot>
                </slot>
            </template>
        </editor-modal>

        <editor-toolbar
            ref="toolbar"
            v-model="currentFilename"
            :demoMode="demoMode"
            :disable-filename="disableFilename"
            :filename="currentFilename"
            @demo-modal="() => demoModalCleared = false">
            <template #left>
                <slot
                    name="toolbar-left"
                    :errors="errors"
                    :filename="currentFilename"
                    :content="currentContent"
                />
            </template>
            <template #right>
                <slot
                    name="toolbar-right"
                    :errors="errors"
                    :filename="currentFilename"
                    :content="currentContent"
                />
            </template>
        </editor-toolbar>

        <div ref="wrapper" class="cm-wrapper" />

        <editor-footer
            ref="footer"
            :view="view"
            v-model="errors"
            @goto="onGoto"
            @save="onSave">
            <template #before-save-button>
                <slot
                    name="before-save-button"
                    :errors="errors"
                    :filename="currentFilename"
                    :content="currentContent" />
            </template>
            <template #save-button>
                <slot
                    name="save-button"
                    :errors="errors"
                    :filename="currentFilename"
                    :content="currentContent" />
            </template>
            <template #after-save-button>
                <slot
                    name="after-save-button"
                    :errors="errors"
                    :filename="currentFilename"
                    :content="currentContent" />
            </template>
        </editor-footer>
    </div>
</template>

<script>
import { AnimateCss } from '@vue-interface/animate-css';
import { Btn } from '@vue-interface/btn';
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands"
import { html } from '@codemirror/lang-html';
import { EditorView, keymap } from '@codemirror/view';
import { oneDark } from "@codemirror/theme-one-dark";
import EditorDemoModal from './EditorDemoModal.vue';
import EditorFooter from './EditorFooter.vue';
import EditorModal from './EditorModal.vue';
import EditorToolbar from './EditorToolbar.vue';
import lint from './Extensions/Lint.js';
import toolbar from './Extensions/Toolbar.js';

export default {
    components: {
        AnimateCss,
        Btn,
        EditorDemoModal,
        EditorFooter,
        EditorModal,
        EditorToolbar,
    },
    props: {
        disableFilename: Boolean,
        
        demoMode: {
            type: Boolean,
            default: false
        },

        filename: String,

        save: {
            type: Function,
            default() {
                return this.showFinishModal = true;
            }
        },

        skipIntro: {
            type: Boolean,
            default: false
        },

        title: String,

        content: String,
    },
    model: {
        prop: 'currentContent'
    },
    data() {
        return {
            currentContent: this.content,
            currentFilename: this.filename || this.title,
            demoModalCleared: this.skipIntro,
            errors: [],
            hasDismissedFinishPopup: false,
            showFinishModal: false,
            view: null,
        }
    },
    watch: {
        currentContent(content) {
            this.$emit('input', {
                content,
                filename: this.currentFilename,
            });
        },
        errors(value, oldErrors) {
            if(!value.length && oldErrors.length) {
                this.$emit('fixed-errors');
            }
        },
        showFinishModal(value) {
            if(value) {
                // setTimeout(() => this.isSuccessModalShowing = true, 1000)
            }
        }
    },
    created() {
        this.$on('finish', value => {
            if(this.demoMode) {
                this.showFinishModal = value;
            }
        });
    },
    mounted() {
        this.view = new EditorView({
            state: EditorState.create({
                doc: this.currentContent ||this.getSlotContents(),
                extensions: [
                    oneDark,
                    ...basicSetup,
                    keymap.of([ indentWithTab ]),
                    html(),
                    toolbar(this),
                    lint(this),
                    EditorView.lineWrapping,
                ]
            }),
            parent: this.$refs.wrapper
        });
    },
    methods: {
        closeFinishPopup() {
            this.showFinishModal = false;
            this.hasDismissedFinishPopup = true;
        },

        getSlotContents() {
            return this.$slots.default ? this.$slots.default.filter(vnode => {
                return vnode.tag && vnode.tag.toLowerCase() === 'textarea' && !!vnode.children;
            }).reduce((carry, vnode) => {
                return (
                    carry + vnode.children.map(child => {
                        return child.text;
                    }).join('')
                );
            }, '').trim() : null;
        },

        onModalClear() {
            this.demoModalCleared = true;
            this.$emit('demo-complete');
            this.view.focus();
        },
        
        onGoto({ from, to }) {
            const tr = this.view.state.update({
                selection: {
                    anchor: from,
                    head: to
                },
                scrollIntoView: true
            });

            this.view.dispatch(tr);
            this.view.focus();
        },

        onSave() {
            this.save(this);
        }
    }
}
</script>

<style lang="scss">
/* html, body {
  height: 100%;
  padding: 0;
  margin: 0;
} */

.capsule-editor {
    font-size: 1rem;

    h1 {
        font-size: 2rem;
    }

    p {
        margin-bottom: 1rem;
    }

    a {
        color: #0284c7;
    }

    a:not(.btn):not(.slide-deck-control-icon):hover {
        text-decoration: underline;
    }

    .small {
        font-size: .75rem;
    }
    
    .font-light {
        font-weight: 300;
    }

    .text-white {
        color: white;
    }

    .text-light {
        color: #e0e0e0;
    }
    
    .text-center { 
        text-align: center;
    }
    
    .h-100 {
        height: 100%;
    }
    
    .w-100 {
        width: 100%;
    }

    .mx-2 {
        margin-left: .5rem;
        margin-right: .5rem;
    }

    .mr-1 {
        margin-right: .25rem;
    }

    .mr-2 {
        margin-right: .5rem;
    }

    .mr-3 {
        margin-right: .75rem;
    }

    .mb-3 {
        margin-bottom: .75rem;
    }

    .mb-5 {
        margin-bottom: 1.25rem;
    }

    .mx-5 {
        margin-left: 1.25rem;
        margin-right: 1.25rem;
    }
    
    .pt-2 {
        padding-top: .5rem;
    }

    .pb-1 {
        padding-bottom: .25rem;
    }
    
    .py-2 {
        padding-left: .5rem;
        padding-right: .5rem;
    }

    .px-2 {
        padding-left: .5rem;
        padding-right: .5rem;
    }

    .px-3 {
        padding-left: .75rem;
        padding-right: .75rem;
    }

    .pr-2 {
        padding-right: .5rem;
    }

    .pr-3 {
        padding-right: .75rem;
    }

    .d-flex {
        display: flex;
    }

    .align-items-center {
        align-items: center;
    }

    .justify-content-center {
        justify-content: center;
    }

    .justify-content-between {
        justify-content: space-between;
    }

    .flex-shrink-0 {
        flex-shrink: 0;
    }

    .overflow-hidden {
        overflow: hidden;
    }

    .position-absolute {
        position: absolute;
    }

    .position-relative {
        position: relative;
    }
}

.capsule-editor,
.cm-container,
.cm-editor,
.cm-wrapper { height: 100%; }
.cm-scroller { overflow: auto }

.cm-editor.cm-focused { outline: none }
.cm-panels.cm-panels-top { border: none !important; }
.cm-panels.cm-panels-bottom { border: 1px solid #101114 !important; }
</style>
