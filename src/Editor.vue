<script lang="ts">
import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { EditorSelection } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap } from '@codemirror/view';
import { Btn } from '@vue-interface/btn';
import { defineComponent } from 'vue';
import EditorFooter from './EditorFooter.vue';
import EditorModal from './EditorModal.vue';
import EditorToolbar from './EditorToolbar.vue';
import lint from './Extensions/Lint.js';
import toolbar from './Extensions/Toolbar.js';

export default defineComponent({
    components: {
        Btn,
        EditorFooter,
        EditorModal,
        EditorToolbar,
    },
    // model: {
    //     prop: 'content'
    // },
    props: {

        content: {
            type: String,
            default: undefined
        },
        
        demoMode: {
            type: Boolean,
            default: false
        },

        disableFilename: Boolean,

        filename: {
            type: String,
            default: null
        },

        save: {
            type: Function,
            default() {
                return this.showFinishModal = true;
            }
        },

        saveButton: {
            type: Boolean,
            default: true
        },

        skipIntro: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: undefined
        },

        toolbar: {
            type: Boolean,
            default: true
        },
    },
    emits: [
        'demo-complete',
        'fixed-errors',
        'update:content',
        'update:filename'
    ],
    data() {
        return {
            demoModalCleared: this.skipIntro,
            errors: [],
            hasDismissedFinishPopup: false,
            showFinishModal: false,
            view: undefined,
        };
    },
    watch: {
        errors(value, oldErrors) {
            if(!value.length && oldErrors.length) {
                this.$emit('fixed-errors');
            }
        },
    },
    mounted() {
        this.view = new EditorView({
            state: EditorState.create({
                doc: this.content,// || this.getSlotContents(),
                extensions: [
                    oneDark,
                    ...basicSetup,
                    keymap.of([ indentWithTab ]),
                    html(),
                    this.toolbar && toolbar(this),
                    lint(this),
                    EditorView.lineWrapping,
                    EditorView.updateListener.of(view => {
                        if(view.docChanged) {
                            this.$emit('update:content', view.state.doc.toString());
                        }
                    })
                ].filter(value => !!value)
            }),
            parent: this.$refs.wrapper
        });
    },
    methods: {
        closeFinishPopup() {
            this.showFinishModal = false;
            this.hasDismissedFinishPopup = true;
        },

        onModalClear() {
            this.demoModalCleared = true;
            this.$emit('demo-complete');
            this.view.focus();
        },
        
        onGoto({ from, to }: { from: number, to:number }) {
            this.view.dispatch({ 
                selection: EditorSelection.create([
                    EditorSelection.range(from, to),
                    EditorSelection.cursor(from)
                ]),
                scrollIntoView: true
            });
            
            this.view.focus();
        },
    
        onSave() {
            this.save(this);
        }
    }
});
</script>

<template>
    <div class="capsule-editor">
        <!-- <editor-demo-modal
            v-if="demoMode && !demoModalCleared"
            @clear="onModalClear" /> -->

        <editor-modal
            v-if="showFinishModal"
            :content-animation="{name: 'tada'}">
            <template #default="{ isShowing }">
                <slot
                    name="success"
                    :close="closeFinishPopup"
                    :filename="filename"
                    :view="view"
                    :is-showing="isShowing">
                    <slot
                        name="success-content"
                        :content="content"
                        :close="closeFinishPopup"
                        :filename="filename"
                        :view="view">
                        <div class="text-center">
                            <h1>
                                Success!
                            </h1>
                            <h5>
                                Your document has been fixed.
                            </h5>
                            <btn
                                type="button"
                                variant="primary"
                                size="lg"
                                block
                                @click="closeFinishPopup">
                                Dismiss
                            </btn>
                        </div>
                    </slot>
                </slot>
            </template>
        </editor-modal>

        <editor-toolbar
            v-if="toolbar"
            ref="toolbar"
            :demo-mode="demoMode"
            :disable-filename="disableFilename"
            :filename="filename"
            @demo-modal="() => demoModalCleared = false"
            @update:filename="value => $emit('update:filename', value)">
            <template #left>
                <slot
                    name="toolbar-left"
                    :errors="errors"
                    :filename="filename"
                    :content="content" />
            </template>
            <template #right>
                <slot
                    name="toolbar-right"
                    :errors="errors"
                    :filename="filename"
                    :content="content" />
            </template>
        </editor-toolbar>

        <div
            ref="wrapper"
            class="cm-wrapper" />

        <editor-footer
            ref="footer"
            v-model="errors"
            :save-button="saveButton"
            :view="view"
            @save="onSave"
            @goto="onGoto">
            <template #before-save-button>
                <slot
                    name="before-save-button"
                    :errors="errors"
                    :filename="filename"
                    :content="content" />
            </template>
            <template #save-button>
                <slot
                    name="save-button"
                    :errors="errors"
                    :filename="filename"
                    :content="content" />
            </template>
            <template #after-save-button>
                <slot
                    name="after-save-button"
                    :errors="errors"
                    :filename="filename"
                    :content="content" />
            </template>
        </editor-footer>
    </div>
</template>

<style>
.capsule-editor {
    font-size: 1rem;
}

.capsule-editor .position-absolute {
    position: absolute;
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
