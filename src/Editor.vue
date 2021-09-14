<template>
    <div class="cm-container">
        <editor-demo-modal v-if="demoMode && !demoModalCleared" @clear="onModalClear" />

        <animate-css enter="tada" leave="fadeOut">
            <editor-modal v-if="showFinishPopup">
                <slot name="success" :close="closeFinishPopup">
                    <img src="./assets/logo-no-text-1028x1028.png" class="capsule-editor-modal-logo">
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
            </editor-modal>
        </animate-css>
        
        <div ref="wrapper" class="cm-wrapper"></div>
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
import EditorModal from './EditorModal';
import lint from './Extensions/Lint';

export default {
    components: {
        AnimateCss,
        Btn,
        EditorDemoModal,
        EditorModal
    },
    props: {
        demoMode: {
            type: Boolean,
            default: true
        },

        footer: {
            type: Function,
            required: true
        },

        skipIntro: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            demoModalCleared: this.skipIntro,
            hasDismissedFinishPopup: false,
            showFinishPopup: false,
            view: null,
        }
    },
    created() {
        this.$on('finish', value => {
            if(this.demoMode) {
                this.showFinishPopup = value;
            }
        });
    },
    mounted() {
        this.view = new EditorView({
            state: EditorState.create({
                doc: this.getSlotContents(),
                extensions: [
                    oneDark,
                    ...basicSetup,
                    keymap.of([ indentWithTab ]),
                    html(),
                    lint(this),
                ]
            }),
            parent: this.$refs.wrapper
        });
    },
    methods: {
        closeFinishPopup() {
            this.showFinishPopup = false;
            this.hasDismissedFinishPopup = true;
        },

        getSlotContents() {
            return this.$slots.default ? this.$slots.default.filter(vnode => {
                return vnode.tag.toLowerCase() === 'textarea' && !!vnode.children;
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
</style>
