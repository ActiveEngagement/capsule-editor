<template>
    <div>
        <editor demo-mode>
<textarea>
<div>
    <a href="http:/"></a>
    <a href="http:/"></a>
    <a href="http:/"></a>
    <a href="http:/"></a>
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
