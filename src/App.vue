<template>
    <editor ref="editor" :value="value" @input="onInput" />
</template>

<script>
import Editor from "./Editor";

const value = `
    <div id="test" id="test">
        <div id="test" id="test">
`;

export default {
    components: {
        Editor
    },
    
    data: () => ({
        value,
        updates: 0
    }),

    methods: {
        onInput(value) {
            this.updates++;
        }
    }
}
</script>