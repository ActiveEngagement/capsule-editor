<template>
    <div class="d-flex align-items-center capsule-editor-error">
        <code>
            {{ error.line }},{{ error.from + 1 }} :: ({{ error.rule.id }}) {{ error.message }} 
            <a :href="url" variant="link" text-light class="small" target="_blank">
                Reference <font-awesome-icon icon="external-link-alt" />
            </a>
        </code>
    </div>
</template>

<script>
import Btn from '@vue-interface/btn';

import { library } from '@fortawesome/fontawesome';
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
