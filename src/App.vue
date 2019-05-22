<template>
    <div>
        <editor demo-mode :errors='[{"match":"<!-- #29,13|href-style|E009|\"use only absolute links\"# -->","line":29,"column":13,"rule":"href-style","code":"E009","msg":"\"use only absolute links\""},{"match":"<!-- #30,13|href-style|E009|\"use only absolute links\"# -->","line":30,"column":13,"rule":"href-style","code":"E009","msg":"\"use only absolute links\""},{"match":"<!-- #31,13|href-style|E009|\"use only absolute links\"# -->","line":31,"column":13,"rule":"href-style","code":"E009","msg":"\"use only absolute links\""},{"match":"<!-- #32,13|href-style|E009|\"use only absolute links\"# -->","line":32,"column":13,"rule":"href-style","code":"E009","msg":"\"use only absolute links\""},{"match":"<!-- #34,13|tag-close|E042|\"tag is not closed\"# -->","line":34,"column":13,"rule":"tag-close","code":"E042","msg":"\"tag is not closed\""}]'>
            <template slot="modal">
                <img src="./assets/logo-no-text-1028x1028.png" class="capsule-editor-modal-logo" />
                <div class="text-center">
                    <h1 class="font-weight-light">Success!</h1>
                    <h5 class="font-weight-light mb-5">Your document has been fixed.</h5>
                </div>
            </template>

<textarea>
<div>
    <a href=""></a>
    <img src="" />
    http://google.com
</div>
</textarea>

        </editor>
    </div>
</template>

<script>
import axios from "axios";
import Editor from "./Editor";

axios.defaults.headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_SECRET}`
};

export default {
    components: {
        Editor
    },

    data() {
        return {};
    }
};
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";
</style>
