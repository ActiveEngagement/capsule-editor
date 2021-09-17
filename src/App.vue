<template>
    <editor ref="editor" :value="value" @input="onInput" />
</template>

<script>
import Editor from "./Editor";

const value = `<a href="javascript:alert(1)" id="test" id="test">asd</a>`;

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