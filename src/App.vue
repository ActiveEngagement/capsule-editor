<template>
    <editor ref="editor" title="Some Title Here" />
</template>

<script>
import Editor from "./Editor";

export default {
    components: {
        Editor
    },

    computed: {
        apiKey() {
            return process.env.VUE_APP_SECRET;
        }
    }
}
</script>