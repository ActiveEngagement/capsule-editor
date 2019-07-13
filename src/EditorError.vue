<template>
    <div class="capsule-editor-error">
        <div class="text-truncate" v-html="formattedError" />
    </div>
</template>

<script>
import { camelCase } from 'lodash';
import formattedError from './Helpers/formatError';

export default {

    props: {

        error: {
            type: Object,
            required: true
        }

    },

    computed: {
        formattedError() {
            return formattedError(this.error);
        }
    }
    
}
</script>

<style lang="scss">
.capsule-editor-error {
    padding: .25em 0;
    animation-duration: .5s;
}
</style>
