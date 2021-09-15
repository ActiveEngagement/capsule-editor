<template>
    <editor ref="editor" title="test" @input="onInput">
        <template #toolbar-left>
            {{ updates }}
        </template>
        <textarea>
            <div>
        </textarea>
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