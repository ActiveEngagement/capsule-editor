<template>
    <editor :footer="footer">
        <textarea>
            
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