<template>
    <div>
        <editor demo-mode skip-intro :api-key="apiKey">
<textarea>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Basic Example</title>
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.css"></link>
        <style media="screen">
            html, body {
                font-famiy: Serif;
            }

            * {
                font-famiy: Serif;
            }

            .container {
                max-width: 550px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="mt-3">This is a header</h1>
            <h2>Some subtext goes here</h2>
            <img src="https://placeimg.com/640/480/animals" class="img-fluid mb-3" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie urna orci, ac ullamcorper elit fermentum nec. Nam lacus orci, facilisis non dapibus et, commodo eget lectus. Phasellus eu tempor nibh, pellentesque aliquam nunc. Etiam tempus non risus in tempus. Sed nunc lacus, congue ut feugiat sit amet, maximus et tellus. </p>
            <p>Phasellus ultrices elit magna, in vulputate tellus faucibus quis. Aliquam ac tellus eget nibh varius interdum quis vitae urna. Aenean et aliquam odio, fringilla tempus ex. Curabitur lorem augue, placerat at metus non, lobortis congue justo. Donec mattis cursus lacinia. Suspendisse eget urna eros. Phasellus ultricies nisl et mauris sagittis lacinia. Sed lobortis arcu quis tempus rutrum.</p>
            <h3>Links</h3>
            <a href="/some/absolute/path">/some/absolute/path</a><br>
            <a href="some/relative/path">some/relative/path</a><br>
            <a href="../some/relative/path">../some/relative/path</a><br>
            <a href="./some/relative/path">./some/relative/path</a><br>
            <a href="http://google.com/some/absolute/path">http://google.com/some/absolute/path</a><br>
            <a href="file://some/absolute/path">file://some/absolute/path
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

<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";
</style>
