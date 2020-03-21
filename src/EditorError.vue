<template>
    <div class="d-flex align-items-center capsule-editor-error">
        <div class="text-truncate" v-html="formattedError" />
        <btn :href="url" variant="light" text-light size="sm" target="_blank" class="ml-3">
            Reference <span class="ml-1" v-html="externalLinkIcon" />
        </btn>
    </div>
</template>

<script>
import { camelCase } from 'lodash';
import formattedError from './Helpers/formatError';
import Btn from 'vue-interface/src/Components/Btn';

import fontawesome from '@fortawesome/fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export default {

    components: {
        Btn,
        
    },

    props: {

        error: {
            type: Object,
            required: true
        }

    },

    computed: {
        externalLinkIcon() {
            return fontawesome.icon(faExternalLinkAlt).html.join('');
        },
        url() {
            return `http://thecapsule.email/docs/codes/${this.error.code}.html`;
        },
        formattedError() {
            return formattedError(this.error);
        }
    }
    
};
</script>

<style lang="scss">
.capsule-editor-error {
    animation-duration: .5s;
}
</style>
