<template>
    <div class="d-flex align-items-center capsule-editor-error">
        <code>
            {{ error.line }},{{ error.col }} :: ({{ error.rule.id }}) {{ error.message }} 
            <btn :href="url" variant="link" class="small text-light" target="_blank">
                Reference <font-awesome-icon icon="external-link-alt" />
            </btn>
        </code>
    </div>
</template>

<script>
import { Btn } from '@vue-interface/btn';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExclamationTriangle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle, faExternalLinkAlt);

export default {

    components: {
        Btn,
        FontAwesomeIcon
    },

    props: {

        error: {
            type: Object,
            required: true
        }

    },

    computed: {
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
