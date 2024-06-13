<script lang="ts">
import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
import { Compartment, EditorSelection, EditorState, Extension } from '@codemirror/state';
import { ViewPlugin, keymap, lineNumbers } from '@codemirror/view';
import { defaultConfig, type CapsuleRuleset } from 'capsule-lint';
import { materialDark } from 'cm6-theme-material-dark';
import { EditorView, basicSetup, } from 'codemirror';
import { PropType, defineComponent, ref } from 'vue';
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

        footer: {
            type: Boolean,
            default: true
        },

        filename: {
            type: String,
            default: null
        },

        ruleset: {
            type: Object as PropType<CapsuleRuleset>,
            default: undefined
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

        theme: {
            type: Object as PropType<Extension>,
            default: () => materialDark
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
        const themeConfig = new Compartment();
        const currentContent = ref(this.content);
        
        return {
            currentContent,
            themeConfig,
            errors: [],
            hasDismissedFinishPopup: false,
            showFinishModal: false,
            view: undefined,
        };
    },
    watch: {
        content(value, oldValue) {
            if(value !== this.currentContent) {
                this.currentContent = value;
                
                this.view.dispatch({
                    changes: {
                        from: 0, 
                        to: this.view.state.doc.length, 
                        insert: value 
                    }
                });
            }
        },
        theme() {
            this.view.dispatch({
                effects: this.themeConfig.reconfigure([this.theme])
            });
        },
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
                doc: this.currentContent,
                extensions: this.extensions(),
            }),
            parent: this.$refs.wrapper
        });
    },
    methods: {

        extensions() {
            const t = this;

            const plugin = ViewPlugin.fromClass(class {
                height = '0px';
                attrs = { style: 'padding-bottom: 0' };

                update() {
                    const footer = t.$el.querySelector('footer');

                    if(!footer) {
                        return;
                    }

                    const height = footer.getComputedStyle().height;

                    this.height = height;
                    
                    this.attrs = {
                        style: `padding-bottom: ${height}`
                    };
                }
            });

            return [
                this.themeConfig.of([ this.theme ]),
                plugin,
                EditorView.contentAttributes.of(view => view.plugin(plugin)?.attrs || null),
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
                this.footer && lint(this, Object.assign({}, defaultConfig, this.ruleset)),
                // EditorView.updateListener.of(() => {
                //     console.log('update')
                // }),
                EditorView.lineWrapping,
                EditorView.updateListener.of(view => {
                    if(view.docChanged && view.state.doc.toString() !== this.currentContent) {
                        this.currentContent = view.state.doc.toString();
                        this.$emit('update:content', this.currentContent);                        
                    }
                }),
                EditorView.theme({
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
                    }
                }),
            ].filter(value => !!value);
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
            ref="wrapper"
            class="cm-wrapper h-full w-full" />

        <editor-footer
            v-if="footer"
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