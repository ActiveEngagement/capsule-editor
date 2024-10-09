<script lang="ts" setup>
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language';
import { lintKeymap } from '@codemirror/lint';
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
import { Compartment, EditorSelection, EditorState, Extension } from '@codemirror/state';
import { EditorView, ViewPlugin, crosshairCursor, drawSelection, dropCursor, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, rectangularSelection } from '@codemirror/view';
import type { Hint } from 'capsule-lint';
import { defaultConfig, type CapsuleRuleset } from 'capsule-lint';
import { basicDark } from 'cm6-theme-basic-dark';
import { onMounted, ref, watch } from 'vue';
import EditorFooter from './EditorFooter.vue';
import EditorToolbar from './EditorToolbar.vue';
import lint from './plugins/Lint';

const props = withDefaults(defineProps<{
    content?: string;
    disableFilename?: boolean;
    extensions?: Extension[];
    filename?: string;
    footer?: boolean;
    indent?: string;
    ruleset?: CapsuleRuleset;
    saveButton?: boolean; 
    theme?: Extension;
    title?: string;
    toolbar?: boolean;
}>(), {
    content: undefined,
    disableFilename: false,
    extensions: () => [],
    filename: undefined,
    footer: true,
    indent: '    ',
    ruleset: undefined,
    saveButton: true,
    theme: () => basicDark,
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

function defineExtensions() {
    return [
        defaultTheme,
        themeConfig.of([ props.theme ]),
        footerPlugin,
        EditorView.contentAttributes.of(view => view.plugin(footerPlugin)?.attrs || null),
        indentUnit.of(props.indent),
        search(),
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
        ...props.extensions
    ].filter(value => !!value);
}

function initialize() {
    return new EditorView({
        doc: currentContent.value,
        extensions: [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            highlightSelectionMatches(),
            history(),
            foldGutter(),
            drawSelection(),
            dropCursor(),
            EditorState.allowMultipleSelections.of(true),
            indentOnInput(),
            syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            rectangularSelection(),
            crosshairCursor(),
            EditorView.baseTheme({
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
                '.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
                    background: 'Highlight'
                },
                '&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
                    background: 'Highlight'
                },
                '&light .cm-diagnostic, &light.cm-focused .cm-tooltip-autocomplete': {
                    color: 'black',
                    background: '#E9E9E9'
                },
                '&dark .cm-diagnostic, &dark.cm-focused .cm-tooltip-autocomplete': {
                    color: 'white',
                    background: '#202020'
                },
                '&.cm-focused .cm-matchingBracket': {
                    background: 'none !important'
                },
            }),
            keymap.of([
                ...closeBracketsKeymap,
                ...defaultKeymap,
                ...searchKeymap,
                ...historyKeymap,
                ...foldKeymap,
                ...completionKeymap,
                ...lintKeymap
            ]),
            ...defineExtensions(),
        ],
        parent: wrapperRef.value
    });
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
    view = initialize();
});

defineExpose({
    props,
    view: () => view,
    initialize,
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