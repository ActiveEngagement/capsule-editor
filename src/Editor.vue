<template>
    <div class="editor">
        <editor-toolbar
            ref="toolbar"
            :value="value"
            :title.sync="filename"
            :activity="isLinting"
            @lint="onClickLint"
            @new="onClickNew"
            @open="onClickOpen"
            @close="onClickClose"
            @save="onClickSave"
            @save-as="onClickSaveAs"
            @export-errors="onExportErrors" />

        <div class="editor-field-container">
            <editor-field ref="editor" v-model="value" v-bind="options" @input="$emit('intput', value)" />
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

export default {

    name: 'editor',

    components: {
        EditorField,
        EditorToolbar
    },

    props: {

        errors: Array,

        contents: String

    },

    computed: {

        options() {
            return {
                foldGutter: true,
                matchTags: {
                    bothTags: true
                },
                gutters: [
                    'CodeMirror-linenumbers',
                    LintState.id,
                    'CodeMirror-foldgutter'
                ],
                extraKeys: {
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
                },
                lint: {
                    errors: this.errors,
                    url: 'lint',
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
                    },
                    onError: error => {
                        if(error.response.status === 406) {
                            this.currentErrors = error.response.data.errors;
                        }
                    }
                }
            };
        }

    },

    methods: {

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

            this.filename = event.target.files[0].name;
        },

        onClickNew() {
            this.filename = null;
            this.$refs.editor.cm.setValue(this.value = '');
            this.$refs.editor.cm.focus();
        },

        onClickSave() {
            if(this.filename) {
                this.$emit('download', this.value, this.download);
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
                        value: this.filename
                    }
                }
            }).then(modal => {
                this.$emit('download', this.value, this.filename = modal.$el.querySelector('input').value);
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
            filename: null
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
