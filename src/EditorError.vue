<template>
    <div class="capsule-editor-error">
        <code>
            {{ error.line }},{{ error.col }} :: ({{ error.rule.id }}) {{ error.message }} 
            <a :href="url" target="_blank">
                Reference <font-awesome-icon icon="external-link-alt" />
            </a>
        </code>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExclamationTriangle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle, faExternalLinkAlt);

export default {

    components: {
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

<style>
.capsule-editor-error {
    display: flex;
    align-items: center;
    animation-duration: .5s;
    padding: .5rem .75rem;
}

.capsule-editor-error code a {
    font-size: .85rem;
    color: #e0e0e0;
    padding-left: .5rem;
}
</style>
