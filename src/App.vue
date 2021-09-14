<template>
    <editor :footer="footer">
        <textarea>
            <div id="test" id="test"></div>
            <div id="test" id="test"></div>
        </textarea>
    </editor>
</template>

<script>
import Editor from "./Editor";

export default {
    components: {
        Editor
    },

    props: {
        footer: {
            type: Function,
            required: true
        }
    },

    data() {
        return {};
    },

    computed: {
        apiKey() {
            return process.env.VUE_APP_SECRET;
        }
    }
};
</script>