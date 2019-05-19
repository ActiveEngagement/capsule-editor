<template>
    <div class="editor" :class="{footer: showFooter}">
        <alert v-if="globalErrors" variant="danger" class="mt-3 mx-3">
            <div class="d-flex">
                <icon icon="exclamation-triangle" size="2x" class="mt-1 mr-4"/>
                <div>
                    <h3>Ooops!</h3>
                    <p class="mb-2">The following errors occurred when your tried to save the document:</p>
                    <ul class="pl-0">
                        <template v-for="error in globalErrors">
                            <li v-for="line in error" :key="line">{{ line }}</li>
                        </template>
                    </ul>
                </div>
            </div>
        </alert>

        <editor-toolbar
            ref="toolbar"
            :value="value"
            :demo-mode="demoMode"
            :activity="isLinting"
            :errors="currentErrors"
            :title.sync="currentFilename"
            :page-controls="!demoMode && pageControls"
            @input="onToolbarInput"
            @lint="onClickLint"
            @new="onClickNew"
            @save="onClickSave"
            @open="onClickOpen"
            @close="onClickClose"
            @save-as="onClickSaveAs"
            @convert="onClickConvert"
            @export-errors="onExportErrors"
            @demo-modal="demoModalCleared = false"
        />

        <div class="editor-field-container">
            <editor-field
                ref="editor"
                v-model="value"
                v-bind="mergedOptions"
                @input="onEditorInput"
            />

            <input ref="file" type="file" class="d-none" @input="onFileSelected">
        </div>

        <editor-footer
            v-if="$refs.editor && (!demoMode || demoModalCleared)"
            ref="footer"
            :cm="$refs.editor.cm"
            :demo-mode="demoMode"
            @finish="$emit('finish')"
            @finish-popup="showFinishPopup = true"
        />

        <animate-css name="fade" @leave="onLeave">
            <editor-demo-modal v-if="demoMode && !demoModalCleared" @clear="onClear" />
        </animate-css>

        <animate-css name="tada" special>
            <editor-modal v-if="showFinishPopup">
                <slot name="modal"/>
            </editor-modal>
        </animate-css>
    </div>
</template>

<script>
import './LintAddon';
import LintState from './LintState';
import AnimateCss from './AnimateCss';
import EditorModal from './EditorModal';
import EditorField from './EditorField';
import EditorFooter from './EditorFooter';
import EditorToolbar from './EditorToolbar';
import EditorDemoModal from './EditorDemoModal';
import Alert from 'vue-interface/src/Components/Alert';
import { deepExtend } from 'vue-interface/src/Helpers/Functions';
import InputField from 'vue-interface/src/Components/InputField';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

library.add(faExclamationTriangle);

// var beautify_js = require('js-beautify'); // also available under "js" export
// var beautify_css = require('js-beautify').css;
// var beautify_html = require('js-beautify').html;

export default {
    name: 'editor',

    components: {
        Alert,
        AnimateCss,
        EditorModal,
        EditorField,
        EditorFooter,
        EditorToolbar,
        EditorDemoModal
    },

    props: {
        globalErrors: Object,

        contents: String,

        demoMode: Boolean,

        extraKeys: Object,

        filename: String,

        gutters: Array,

        lint: Object,

        matchTags: Object,

        options: Object,

        errors: {
            type: Array,
            default: () => []
        },

        pageControls: {
            type: Boolean,
            default: true
        }
    },

    watch: {
        currentErrors(value) {
            if (!this.showFooter && value.length) {
                this.showFooter = true;
            }
        }
    },

    computed: {
        mergedOptions() {
            return deepExtend({
                tabSize: 4,
                indentUnit: 4,
                foldGutter: true,
                smartIndent: true,
                lineNumbers: true,
                lineWrapping: true,
                indentWithTabs: true,
                clearOnEnter: true,
                matchTags: Object.assign(
                    {
                        bothTags: true
                    },
                    this.matchTags
                ),
                gutters: this.gutters || [
                    'CodeMirror-linenumbers',
                    LintState.id,
                    'CodeMirror-foldgutter'
                ],
                extraKeys: Object.assign({
                    'Ctrl-N': this.onClickNew,
                    'Ctrl-O': this.onClickOpen,
                    'Ctrl-S': this.onClickSave,
                    'Ctrl-Q': this.onClickClose,
                    'Ctrl-C': this.onClickConvert,
                    'Shift-Ctrl-S': this.onClickSaveAs,
                    'Ctrl-J': 'toMatchingTag',
                    'Ctrl-Space': 'autocomplete',
                    'Ctrl-V': () => {
                        this.$refs.toolbar.$refs.lint.$el.click();
                    }
                }, this.extraKeys),
                lint: Object.assign({
                    nextTick: this.$nextTick,
                    url: `http://api.thecapsule.${process.env.NODE_ENV === 'production' ? 'email' : 'test'}/v1/lint`,
                    errors: this.currentErrors,
                    data: cm => {
                        return {
                            html: cm.getValue()
                        };
                    },
                    onLintStart: () => {
                        this.isLinting = true;
                    },
                    onLintComplete: () => {
                        this.isLinting = false;
                    },
                    onLintSuccess: () => {
                        this.currentErrors = [];
                        this.$emit('lint-success');
                    },
                    onRemoveError: (cm, error) => {

                        console.log(error);
        
                        this.$nextTick(() => {
                            this.currentErrors = cm.state.lint.errors.splice(cm.state.lint.getErrorIndex(error), 1);
                        });

                        this.$emit('remove-error', error, this.currentErrors);
                    },
                    onLintError: (cm, error) => {
                        if (error.response.status === 406) {
                            this.currentErrors = error.response.data.errors;
                            this.$emit('lint-error', error, this.currentErrors);
                        }
                    }
                }, this.lint)
            }, this.options);
        }
    },

    methods: {
        getSlotContents() {
            return this.$slots.default
                ? this.$slots.default
                      .filter(vnode => {
                          return vnode.tag.toLowerCase() === 'textarea';
                      })
                      .reduce((carry, vnode) => {
                          return (
                              carry +
                              vnode.children
                                  .map(child => {
                                      return child.text;
                                  })
                                  .join('')
                          );
                      }, '')
                : null;
        },

        onLeave() {
            if(this.$refs.editor.cm.state.lint.errors.length) {
                this.$refs.editor.cm.setCursor(this.$refs.editor.cm.state.lint.errors[0]);
            }
        },

        onClear() {
            this.demoModalCleared = true;
        },

        onClickConvert() {
            this.$emit('convert', this.value, this.currentFilename);
        },

        onToolbarInput() {
            this.onEditorInput();
        },

        onEditorInput() {
            this.$nextTick(() => {
                this.$emit('input', {
                    contents: this.value,
                    filename: this.currentFilename
                });
            });
        },

        onExportErrors() {
            this.$emit('export', this.value, this.currentFilename);
        },

        onFileSelected(event) {
            const reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = e => {
                this.$refs.editor.cm.setValue(e.target.result);
                this.$refs.editor.cm.lint();
            };

            reader.readAsText(event.target.files[0]);

            this.currentFilename = event.target.files[0].name;
        },

        onClickNew() {
            this.currentFilename = null;
            this.$refs.editor.cm.setValue((this.value = ''));
            this.$refs.editor.cm.focus();
            this.$emit('new');
        },

        onClickSave() {
            if (this.currentFilename) {
                this.$emit('download', this.value, this.currentFilename);
                this.$emit('save', this.value, this.currentFilename);
            } else {
                this.onClickSaveAs();
            }
        },

        onClickSaveAs() {
            let currentFilename = this.currentFilename;

            this.$prompt('Save File As', InputField, {
                content: {
                    on: {
                        keypress: e => {
                            if (e.keyCode === 13) {
                                e.target
                                    .closest('.modal-dialog')
                                    .querySelector('.btn-primary')
                                    .click();
                                e.preventDefault();
                            } else {
                                currentFilename = e.target.value;
                            }
                        }
                    },
                    propsData: {
                        label: 'Enter the name of the file',
                        value: this.currentFilename
                    }
                }
            }).then(modal => {
                this.currentFilename = currentFilename;

                this.$emit('download', this.value, currentFilename);
                this.$emit('save-as', this.value, currentFilename);
                this.$emit('save', this.value, currentFilename);
            });
        },

        onClickOpen(event) {
            this.$refs.file.click();
        },

        onClickClose() {
            this.$emit('close');
        },

        onClickLint(event) {
            this.$refs.editor.cm.lint();
        }
    },

    data() {
        return {
            isLinting: false,
            showFooter: false,
            showFinishPopup: false,
            demoModalCleared: false,
            currentErrors: this.errors,
            currentFilename: this.filename,
            value: this.contents || this.getSlotContents()
            /*
            value: beautify_html((this.contents || this.getSlotContents()), {
                indent_size: 1,
                indent_char: '\t'
            })
            */
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.$refs.editor.cm.focus();
            //this.$refs.editor.cm.setSize('100%', `calc(100% - ${this.$el.querySelector('.editor-toolbar').clientHeight}px)`);

            if (this.$refs.editor.cm.getValue() && !this.currentErrors.length) {
                this.$refs.editor.cm.lint();
            }
        });
    }
};
</script>

<style lang="scss">
@import "./node_modules/bootstrap/scss/_functions.scss";
@import "./node_modules/bootstrap/scss/_variables.scss";

.editor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    background-color: #282a36 !important;
    grid-template-rows: minmax(3rem, auto) minmax(auto, 100%) auto;
}

.edit-toolbar {
    .btn {
        position: relative;

        .badge {
            top: 0;
            right: 0;
            z-index: 1;
            transform: translate(50%, -25%);
        }

        &.has-error > svg {
            color: $danger;
        }
    }

    .edit-toolbar-actions {
        .dropdown-item {
            display: flex;
            align-items: center;

            span {
                margin-right: 1.5em;
            }

            code {
                font-size: 8px;
                margin-left: auto;
            }

            kbd {
                background: rgb(60, 60, 60);

                &:not(:last-child) {
                    margin-right: 0.25em;
                }
            }

            svg {
                width: 9px;
            }
        }
    }
}

.editor-field-container {
    flex: 1;
    position: relative;
    // overflow: hidden;
}

</style>
