<script lang="ts" setup>
import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
import { Compartment, EditorSelection, Extension } from '@codemirror/state';
import { EditorView, ViewPlugin, keymap, lineNumbers } from '@codemirror/view';
import type { Hint } from 'capsule-lint';
import { defaultConfig, type CapsuleRuleset } from 'capsule-lint';
import { materialDark } from 'cm6-theme-material-dark';
import { basicSetup, } from 'codemirror';
import { onMounted, ref, watch } from 'vue';
import EditorFooter from './EditorFooter.vue';
import EditorToolbar from './EditorToolbar.vue';
import lint from './plugins/Lint';

const props = withDefaults(defineProps<{
    content?: string;
    disableFilename?: boolean;
    filename?: string;
    footer?: boolean;
    ruleset?: CapsuleRuleset;
    saveButton?: boolean; 
    theme?: Extension;
    title?: string;
    toolbar?: boolean;
}>(), {
    content: undefined,
    disableFilename: false,
    filename: undefined,
    footer: true,
    ruleset: undefined,
    saveButton: true,
    theme: () => materialDark,
    title: undefined,
    toolbar: true
});

const emit = defineEmits<{
    'fixed-errors': [],
    'save': [],
    'focus': [],
    'blur': [],
    'selection': [selection: EditorSelection],
    'update:content': [content: string],
    'update:filename': [content: string],
}>();

const wrapperRef = ref<HTMLDivElement>();
const toolbarRef = ref<HTMLDivElement>();
const footerRef = ref<typeof EditorFooter>();
const themeConfig = new Compartment();
const currentContent = ref(props.content);
const errors = ref<Hint[]>();
const defaultTheme = EditorView.theme({
    '&': {
        width: '100%',
        height: '100%',
    },
    '&.cm-focused': {
        outline: 'none'
    },
    '.cm-editor': {
        'padding-bottom': '4em'
    },
    '.cm-panels.cm-panels-bottom': {
        border: 'none !important'
    },
    '.cm-gutter-error': {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
    },
    '.cm-gutter-error > div': {
        width: '8px',
        height: '8px',
        background: 'red',
        borderRadius: '100%',
    },
    // ':focus .cm-activeLine': {
    //     backgroundColor: 'transparent'
    // }
});

let view: EditorView;

const footerPlugin = ViewPlugin.fromClass(class {
    height = '0px';
    attrs = { style: 'padding-bottom: 0' };

    update() {
        const footer = wrapperRef.value.querySelector<HTMLDivElement>('footer');
        const height = getComputedStyle(footer).height;

        this.height = height;
        
        this.attrs = {
            style: `padding-bottom: ${height}`
        };
    }
});

function focus() {
    view.focus();
}

function setSelection(selection: EditorSelection) {
    view.dispatch({
        selection
    });
}

function extensions() {
    return [
        defaultTheme,
        themeConfig.of([ props.theme ]),
        footerPlugin,
        EditorView.contentAttributes.of(view => view.plugin(footerPlugin)?.attrs || null),
        lineNumbers(),
        search(),
        history(),
        keymap.of(historyKeymap),
        highlightSelectionMatches(),
        keymap.of(searchKeymap),
        keymap.of([ indentWithTab  ]),
        keymap.of([
            {
                key: 'Mod-a',
                run: (view) => {
                    view.dispatch({
                        selection: {
                            anchor: 0,
                            head: view.state.doc.length
                        }
                    });

                    return true;
                },
            },
        ]),
        html(),
        props.footer && lint(footerRef.value, Object.assign({}, defaultConfig, props.ruleset)),
        EditorView.updateListener.of((update) => {
            if(!update.focusChanged) {
                return;
            }

            if(view.hasFocus) {
                emit('focus');
            }
            else {
                emit('blur');
            }
        }),
        EditorView.lineWrapping,
        EditorView.updateListener.of(view => {
            if(view.selectionSet) {
                emit('selection', view.state.selection);
            }
        }),
        EditorView.updateListener.of(view => {
            if(view.docChanged && view.state.doc.toString() !== currentContent.value) {
                currentContent.value = view.state.doc.toString();
                emit('update:content', currentContent.value);                        
            }
        }),
    ].filter(value => !!value);
}

function onGoto({ from, to }: { from: number, to:number }) {
    view.dispatch({ 
        selection: EditorSelection.create([
            EditorSelection.range(from, to),
            EditorSelection.cursor(from)
        ]),
        scrollIntoView: true
    });
    
    view.focus();
}

watch(() => props.content, value => {
    if(value !== currentContent.value) {
        currentContent.value = value;
        
        view.dispatch({
            changes: {
                from: 0, 
                to: view.state.doc.length, 
                insert: value 
            }
        });
    }
});

watch(() => props.theme, value => {
    view.dispatch({
        effects: themeConfig.reconfigure([ value ])
    });
});

watch(errors, (value, oldValue) => {
    if(!value?.length && oldValue?.length) {
        emit('fixed-errors');
    }
});

onMounted(() => {
    view = new EditorView({
        doc: currentContent.value,
        extensions: [
            basicSetup,
            ...extensions(),
        ],
        parent: wrapperRef.value
    });
});

defineExpose({
    props,
    view: () => view,
    focus,
    setSelection
});
</script>

<template>
    <div class="capsule-editor">
        <editor-toolbar
            v-if="toolbar"
            ref="toolbarRef"
            :disable-filename="disableFilename"
            :filename="filename"
            @update:filename="value => $emit('update:filename', value)">
            <template #left>
                <slot
                    name="toolbar-left"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
            <template #right>
                <slot
                    name="toolbar-right"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
        </editor-toolbar>

        <div
            ref="wrapperRef"
            class="cm-wrapper h-full w-full" />

        <editor-footer
            v-if="footer"
            ref="footerRef"
            v-model="errors"
            :save-button="saveButton"
            :view="view"
            @save="emit('save')"
            @goto="onGoto">
            <template #before-save-button>
                <slot
                    name="before-save-button"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
            <template #save-button>
                <slot
                    name="save-button"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
            <template #after-save-button>
                <slot
                    name="after-save-button"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
        </editor-footer>
    </div>
</template>