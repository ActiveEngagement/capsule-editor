<template>
    <div class="message" v-html="message" data-test="1"/>
</template>

<script>
export default {

    name: 'sample-component',

    props: {
        message: {
            type: String,
            required: true
        }
    },

    mounted() {
        console.log('1111');
    }

};
</script>

<style lang="scss">
.sample-component {
    background: rgb(200, 200, 3);

    .a {
        background: red;
    }
}
</style>
