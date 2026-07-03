<script lang="ts" setup>
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language';
import { lintKeymap, type Action, type Diagnostic } from '@codemirror/lint';
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
import { Compartment, EditorSelection, EditorState, Extension } from '@codemirror/state';
import { EditorView, crosshairCursor, drawSelection, dropCursor, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, rectangularSelection } from '@codemirror/view';
import type { Hint, Rule } from 'capsule-lint';
import { defaultConfig, type CapsuleRuleset } from 'capsule-lint';
import { basicDark } from 'cm6-theme-basic-dark';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import EditorFooter from './EditorFooter.vue';
import EditorToolbar from './EditorToolbar.vue';
import freemarker from './plugins/Freemarker';
import lint from './plugins/Lint';

const props = withDefaults(defineProps<{
    content?: string;
    disableFilename?: boolean;
    extensions?: Extension[];
    filename?: string;
    footer?: boolean;
    indent?: string;
    plainText?: boolean;
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
    plainText: false,
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

type EditorSlotProps = {
    errors: Hint[] | undefined;
    filename: string | undefined;
    content: string | undefined;
};

type RuleDiagnostic = Diagnostic & { rule: Rule };

// Every child slot is re-exposed at the top level, merging the editor context
// (errors/filename/content) with the props the child slot provides, so a
// consumer of <Editor> can override any of them without reaching into children.
defineSlots<{
    'toolbar-left'(props: EditorSlotProps): unknown;
    'toolbar-right'(props: EditorSlotProps): unknown;
    'before-save-button'(props: EditorSlotProps): unknown;
    'action-button'(props: EditorSlotProps & {
        currentDiagnostic: RuleDiagnostic | undefined;
        onClickAction: (diagnostic: Diagnostic, action: Action) => void;
    }): unknown;
    'save-button'(props: EditorSlotProps & { diagnostics: Diagnostic[]; saveButtonLabel: string }): unknown;
    'after-save-button'(props: EditorSlotProps & { diagnostics: Diagnostic[] }): unknown;
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

// Reserve space for the docked footer by padding the content past it. The
// height is tracked by a ResizeObserver on the footer element, which fires
// only when the footer actually changes size (diagnostics appearing or
// clearing) — the previous ViewPlugin called getComputedStyle on every editor
// update, forcing a synchronous reflow in the middle of each update cycle.
let footerAttrs = { style: 'padding-bottom: 0px' };
let footerResizeObserver: ResizeObserver | undefined;

function observeFooterHeight() {
    const el = footerRef.value?.$el as HTMLElement | undefined;

    if(!el || typeof ResizeObserver === 'undefined') {
        return;
    }

    footerResizeObserver = new ResizeObserver(entries => {
        const entry = entries[entries.length - 1];
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        const style = `padding-bottom: ${height}px`;

        if(style !== footerAttrs.style) {
            footerAttrs = { style };
            // An empty transaction makes the view re-read contentAttributes.
            view.dispatch({});
        }
    });

    footerResizeObserver.observe(el);
}

function focus() {
    view.focus();
}

function setSelection(selection: EditorSelection) {
    view.dispatch({
        selection
    });
}

function initialize() {
    return new EditorView({
        doc: currentContent.value,
        extensions: [
            defaultTheme,
            themeConfig.of([ props.theme ]),
            // Consumer-supplied extensions take precedence over the editor's
            // defaults, so they can reconfigure built-ins (e.g. search panel
            // placement) rather than only append to them.
            ...props.extensions,
            props.footer && lint(footerRef.value, Object.assign({}, defaultConfig, props.ruleset), { htmlLinting: !props.plainText }),
            indentUnit.of(props.indent),
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            highlightSelectionMatches(),
            history(),
            !props.plainText && html({
                autoCloseTags: true,
                matchClosingTags: false
            }),
            // FreeMarker constructs are embedded in the HTML, so highlight them
            // on top of the HTML grammar whenever we're not in plain-text mode.
            !props.plainText && freemarker(),
            // autoCloseTags,
            foldGutter(),
            drawSelection(),
            dropCursor(),
            indentOnInput(),
            syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            rectangularSelection(),
            crosshairCursor(),
            search(),
            EditorState.allowMultipleSelections.of(true),
            EditorView.contentAttributes.of(() => footerAttrs),
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
                indentWithTab,
                ...closeBracketsKeymap,
                ...defaultKeymap,
                ...searchKeymap,
                ...historyKeymap,
                ...foldKeymap,
                ...completionKeymap,
                ...lintKeymap,
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
        ].filter(value => !!value),
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
    observeFooterHeight();
});

// Tear the EditorView down when the component unmounts. Without this, every
// EditorView leaks the window `scroll`/`resize` listeners, ResizeObserver,
// IntersectionObserver and DOM MutationObserver it registers on creation — they
// are only removed in view.destroy(). Left alive, each orphaned view keeps
// running its scroll/measure handlers on every page scroll (O(views ever
// created)), so scrolling, repaints and tab switches get progressively slower,
// and an orphaned view can crash in the lint gutter while measuring stale DOM.
onBeforeUnmount(() => {
    footerResizeObserver?.disconnect();
    view?.destroy();
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
        <EditorToolbar
            v-if="toolbar"
            ref="toolbarRef"
            :disable-filename="disableFilename"
            :filename="filename"
            @update:filename="value => $emit('update:filename', value)">
            <template
                v-if="$slots['toolbar-left']"
                #left>
                <slot
                    name="toolbar-left"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
            <template
                v-if="$slots['toolbar-right']"
                #right>
                <slot
                    name="toolbar-right"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
        </EditorToolbar>

        <div
            ref="wrapperRef"
            class="cm-wrapper h-full w-full" />

        <EditorFooter
            v-if="footer"
            ref="footerRef"
            v-model="errors"
            :save-button="saveButton"
            :view="() => view"
            @save="emit('save')"
            @goto="onGoto">
            <template
                v-if="$slots['before-save-button']"
                #before-save-button>
                <slot
                    name="before-save-button"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
            <template
                v-if="$slots['action-button']"
                #action-button="actionProps">
                <slot
                    name="action-button"
                    v-bind="actionProps"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
            <template
                v-if="$slots['save-button']"
                #save-button="saveProps">
                <slot
                    name="save-button"
                    v-bind="saveProps"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
            <template
                v-if="$slots['after-save-button']"
                #after-save-button="afterProps">
                <slot
                    name="after-save-button"
                    v-bind="afterProps"
                    :errors="errors"
                    :filename="filename"
                    :content="currentContent" />
            </template>
        </EditorFooter>
    </div>
</template>