<template>
    <editor ref="editor" title="test" :value="value" :save="onSave">
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
    </editor>
</template>

<script>
import Editor from "./Editor";

export default {
    components: {
        Editor
    },

    data() {
const value = `
<div></div>
<div></div>
`;
        return {
            value
        };
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