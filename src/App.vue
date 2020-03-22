<template>
    <div>
        <editor :demo-mode="true" skip-intro :api-key="apiKey" :team="{id: 1}">
            <textarea>
                <html>
                    <head></head>
                    <body>
                        <div>
                            <p>test</p>
                            <p>test
                        </div>
                    </body>
                </html>
            </textarea>
        </editor>
    </div>
</template>

<script>
import axios from "axios";
import Editor from "./Editor";

export default {
    components: {
        Editor
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