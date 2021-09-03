<template>
    <div class="d-flex align-items-center capsule-editor-error">
        <div class="text-truncate" v-html="formattedError" />
        <btn :href="url" variant="light" text-light size="sm" target="_blank" class="ml-3">
            Reference <span class="ml-1" v-html="externalLinkIcon" />
        </btn>
    </div>
</template>

<script>
import Btn from '@vue-interface/btn';
import { camelCase } from '@vue-interface/utils';
import formattedError from './Helpers/formatError';

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
        formattedError() {
            return formattedError(this.error);
        },
        url() {
            return this.error.rule.link;
        }
    }
    
};
</script>

<style lang="scss">
.capsule-editor-error {
    animation-duration: .5s;
}
</style>
