<template>
    <div>
        <editor :demo-mode="false" skip-intro :api-key="apiKey">
<textarea>
<div>
    <div
</div>
</textarea>
        </editor>
    </div>
</template>

<script>
import axios from "axios";
import Editor from "./Editor";

/*
axios.defaults.baseURL = 'http://api.thecapsule.test';
axios.defaults.headers = {
    Accept: 'application/json',
};
*/

export default {
    components: {
        Editor
    },

    computed: {
        apiKey() {
            return process.env.VUE_APP_SECRET;
        }
    },

    data() {
        return {};
    }
};
</script>