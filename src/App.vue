<template>
    <editor ref="editor" />
</template>

<script>
import Editor from "./Editor";

const content = `<div>`;

export default {
    components: {
        Editor
    },
    
    data: () => ({
        content
    })
}
</script>