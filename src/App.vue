<template>
    <editor ref="editor" demo-mode :content="content" />
</template>

<script>
import Editor from "./Editor";

const content = `<div>
  <a href="#">Click Me!</a>
  <div id="test" id="test">
    <p>This is a paragraph without a closing tag.
  </div>
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