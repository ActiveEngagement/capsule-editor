<template>
    <editor ref="editor" title="test" @input="onInput">
        
    </editor>
</template>

<script>
import Editor from "./Editor";

export default {
    components: {
        Editor
    },
    
    data: () => ({
        updates: 0
    }),

    methods: {
        onInput(value) {
            this.updates++;
        }
    }
}
</script>