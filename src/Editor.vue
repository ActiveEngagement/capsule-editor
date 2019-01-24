<template>
    <div class="editor">
        <editor-toolbar
            ref="toolbar"
            :value="value"
            :title.sync="currentFilename"
            :activity="isLinting"
            :page-controls="pageControls"
            @input="onToolbarInput"
            @lint="onClickLint"
            @new="onClickNew"
            @open="onClickOpen"
            @close="onClickClose"
            @save="onClickSave"
            @save-as="onClickSaveAs"
            @convert="onConvert"
            @export-errors="onExportErrors" />

        <div class="editor-field-container">
            <editor-field ref="editor" v-model="value" v-bind="mergedOptions" @input="onEditorInput" />
            <input ref="file" type="file" class="d-none" @input="onFileSelected"/>
        </div>
    </div>
</template>

<script>
import './LintAddon';
import LintState from './LintState';
import EditorField from './EditorField';
import EditorToolbar from './EditorToolbar';
import InputField from 'vue-interface/src/Components/InputField';
import { deepExtend } from 'vue-interface/src/Helpers/Functions';

export default {

    name: 'editor',

    components: {
        EditorField,
        EditorToolbar
    },

    props: {

        errors: {
            type: Array,
            default() {
                return [];
            }
        },

        contents: String,

        extraKeys: Object,

        filename: String,

        gutters: Array,

        lint: Object,

        matchTags: Object,

        options: Object,

        pageControls: {
            type: Boolean,
            default: true
        }

    },

    computed: {

        mergedOptions() {
            return deepExtend({
                foldGutter: true,
                matchTags: Object.assign({
                    bothTags: true
                }, this.matchTags),
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
                    'Shift-Ctrl-S': this.onClickSaveAs,
                    'Ctrl-J': 'toMatchingTag',
                    'Ctrl-Space': 'autocomplete',
                    'Ctrl-V': () => {
                        this.$refs.toolbar.$refs.lint.$el.click();
                    }
                    /*,
                    'Ctrl-Q': cm => {
                        cm.foldCode(cm.getCursor());
                    }
                    */
                }, this.extraKeys),
                lint: Object.assign({
                    url: 'lint',
                    errors: this.errors,
                    data: cm => {
                        return {
                            html: cm.getValue()
                        };
                    },
                    onStart: () => {
                        this.isLinting = true;
                    },
                    onComplete: () => {
                        this.isLinting = false;
                    },
                    onSuccess: () => {
                        this.currentErrors = [];
                        this.$emit('lint-success');
                    },
                    onError: error => {
                        if(error.response.status === 406) {
                            this.$emit('lint-error', error, this.currentErrors = error.response.data.errors);
                        }
                    }
                }, this.lint)
            }, this.options);
        }

    },

    methods: {

        onConvert() {
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
            console.log('export errors');
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
            this.$refs.editor.cm.setValue(this.value = '');
            this.$refs.editor.cm.focus();
            this.$emit('new');
        },

        onClickSave() {
            if(this.currentFilename) {
                this.$emit('download', this.value, this.currentFilename);
                this.$emit('save', this.value, this.currentFilename);
            }
            else {
                this.onClickSaveAs();
            }
        },

        onClickSaveAs() {
            this.$prompt('Save File As', InputField, {
                content: {
                    on: {
                        keypress: (e) => {
                            // "return" key code
                            if(e.keyCode === 13) {
                                e.target.closest('.modal-dialog').querySelector('.btn-primary').click();
                                e.preventDefault();
                            }
                        }
                    },
                    propsData: {
                        label: 'Enter the name of the file',
                        value: this.currentFilename
                    }
                }
            }).then(modal => {
                this.$emit('download', this.value, this.currentFilename);
                this.$emit('save-as', this.value, this.currentFilename);
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
            value: this.contents,
            isLinting: false,
            currentErrors: [],
            currentFilename: this.filename
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.$refs.editor.cm.focus();
            this.$refs.editor.cm.setSize('100%', `calc(100% - ${this.$el.querySelector('.editor-toolbar').clientHeight}px)`);

            if(this.$refs.editor.cm.getValue() && !this.errors.length) {
                this.$refs.editor.cm.lint();
            }
        });
    }

};
</script>

<style lang="scss">
@import './node_modules/bootstrap/scss/_functions.scss';
@import './node_modules/bootstrap/scss/_variables.scss';

.editor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #282a36 !important;
}

.edit-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;

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
                    margin-right: .25em;
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
}
</style>
