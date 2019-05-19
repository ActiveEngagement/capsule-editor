<template>
    <div>
        <editor demo-mode>
            <template slot="modal">
                <img src="./assets/img/logo-no-text-1028x1028.png" class="capsule-editor-modal-logo" />
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
