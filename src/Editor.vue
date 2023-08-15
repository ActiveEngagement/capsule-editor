<script lang="ts">
import { indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { EditorSelection, EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { materialDark } from 'cm6-theme-material-dark';
import { EditorView, basicSetup } from 'codemirror';
import { defineComponent } from 'vue';
import EditorFooter from './EditorFooter.vue';
import EditorToolbar from './EditorToolbar.vue';
import lint from './plugins/Lint';

export default defineComponent({
    components: {
        EditorFooter,
        EditorToolbar,
    },
    props: {

        content: {
            type: String,
            default: undefined
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
        'fixed-errors',
        'update:content',
        'update:filename',
        'save'
    ],
    data() {
        return {
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
            extensions: [
                basicSetup
            ],
            state: EditorState.create({
                doc: this.content,
                extensions: [
                    materialDark,
                    keymap.of([ indentWithTab ]),
                    html(),
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
            this.$emit('save');
        }
    }
});
</script>

<template>
    <div class="capsule-editor">
        <editor-toolbar
            v-if="toolbar"
            ref="toolbar"
            :disable-filename="disableFilename"
            :filename="filename"
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