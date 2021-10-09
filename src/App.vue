<template>
    <editor ref="editor" demo-mode :content="content" />
</template>

<script>
import Editor from "./Editor";

const content = `<div>
  <p>test
</div>`;

export default {
    components: {
        Editor
    },
    
    data: () => ({
        content
    })
}
</script>