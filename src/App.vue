<template>
    <editor ref="editor" title="Some Title Here" :save="onSave" v-model="value">
        <template #toolbar-left>
            left: {{ value }}
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
        return {
            value: null
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
    },

    watch: {
        value(value) {
            console.log('change', value)
        }
    }
};
</script>