<template>
    <editor ref="editor" title="test" :save="onSave">
        <template #toolbar-left>
            left
        </template>
        <template #toolbar-right>
            right
        </template>
        <template #before-save-button>
            before save button
        </template>
        <template #after-save-button>
            after save button
        </template>
        <template #success-content="{ close, filename }">
            {{ filename }} <a href="#" @click.prevent="close">Close</a>
        </template>

        <textarea>
            
        </textarea>
    </editor>
</template>

<script>
import Editor from "./Editor";

export default {
    components: {
        Editor
    },

    data() {
        return {};
    },

    computed: {
        apiKey() {
            return process.env.VUE_APP_SECRET;
        }
    },

    methods: {
        onSave({ filename }) {
            this.$refs.editor.showFinishModal = true;
        }
    }
};
</script>