<template>
    <div class="cm-container">
        <editor-demo-modal v-if="demoMode && !demoModalCleared" @clear="onModalClear" />
        <div ref="wrapper" class="cm-wrapper"></div>
    </div>
</template>

<script>
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands"
import { html } from '@codemirror/lang-html';
import { EditorView, keymap } from '@codemirror/view';
import { oneDark } from "@codemirror/theme-one-dark";
import EditorDemoModal from './EditorDemoModal';
import lint from './Extensions/Lint';

export default {
    components: {
        EditorDemoModal
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
            view: null,
        }
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
