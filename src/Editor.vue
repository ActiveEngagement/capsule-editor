<template>
    <div class="cm-container">
        <editor-demo-modal v-if="demoMode && !demoModalCleared" @clear="onModalClear" />

        <animate-css enter="tada" leave="fadeOut">
            <editor-modal v-if="showFinishModal">
                <slot name="success" :close="closeFinishPopup" :view="view" :filename="filename">
                    <animate-css name="zoom" in left>
                        <img v-if="showFinishModalShowing" src="./assets/logo-no-text-1028x1028.png" class="capsule-editor-modal-logo">
                    </animate-css>
                    
                    <slot
                        name="success-content"
                        :content="content"
                        :close="closeFinishPopup"
                        :filename="filename"
                        :view="view">
                        <div class="text-center">
                            <h1 class="font-weight-light">
                                Success!
                            </h1>
                            <h5 class="font-weight-light mb-5">
                                Your document has been fixed.
                            </h5>
                            <btn type="button" variant="primary" size="lg" block @click="closeFinishPopup">
                                Dismiss
                            </btn>
                        </div>
                    </slot>
                </slot>
            </editor-modal>
        </animate-css>

        <editor-toolbar ref="toolbar" v-model="filename" :title="title" @demo-modal="() => demoModalCleared = false">
            <template #left>
                <slot
                    name="toolbar-left"
                    :errors="errors"
                    :filename="filename"
                    :content="content"
                />
            </template>
            <template #right>
                <slot
                    name="toolbar-right"
                    :errors="errors"
                    :filename="filename"
                    :content="content"
                />
            </template>
        </editor-toolbar>

        <div ref="wrapper" class="cm-wrapper"></div>

        <editor-footer v-model="errors" ref="footer">
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

<script>
import AnimateCss from '@vue-interface/animate-css';
import Btn from '@vue-interface/btn';
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands"
import { html } from '@codemirror/lang-html';
import { EditorView, keymap } from '@codemirror/view';
import { oneDark } from "@codemirror/theme-one-dark";
import EditorDemoModal from './EditorDemoModal';
import EditorFooter from './EditorFooter';
import EditorModal from './EditorModal';
import EditorToolbar from './EditorToolbar';
import lint from './Extensions/Lint';
import toolbar from './Extensions/Toolbar';
import Vue from 'vue';

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
        demoMode: {
            type: Boolean,
            default: true
        },

        footer: {
            type: Function,
            default: Vue.extend(EditorFooter),
        },

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

        value: String,
    },
    model: {
        prop: 'content'
    },
    data() {
        return {
            content: this.value,
            demoModalCleared: this.skipIntro,
            errors: [],
            filename: this.title,
            hasDismissedFinishPopup: false,
            showFinishModal: false,
            showFinishModalShowing: false,
            view: null,
        }
    },
    watch: {
        content(content) {
            this.$emit('input', {
                filename: this.filename,
                content
            });
        },
        showFinishModal(value) {
            if(value) {
                this.$nextTick(() => this.showFinishModalShowing = true)
            }

            this.showFinishModalShowing = false;
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
                doc: this.value ||this.getSlotContents(),
                extensions: [
                    oneDark,
                    ...basicSetup,
                    keymap.of([ indentWithTab ]),
                    html(),
                    toolbar(this),
                    lint(this),
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
        }
    }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}

.cm-container,
.cm-editor,
.cm-wrapper { height: 100%; }
.cm-scroller { overflow: auto }

.cm-editor.cm-focused { outline: none }
.cm-panels.cm-panels-top { border: none !important; }
.cm-panels.cm-panels-bottom { border: 1px solid #101114 !important; }
</style>
