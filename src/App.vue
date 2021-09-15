<template>
    <editor ref="editor" @input="onInput">
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