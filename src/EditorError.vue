<template>
    <div class="capsule-editor-error">
        <icon icon="exclamation-triangle" /> {{ error.line + 1 }},{{ error.ch + 1 }} :: {{ error.rule }} {{ error.msg }} ({{ error.code }})
    </div>
</template>

<script>
import { camelCase } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle);

export default {

    components: {
        Icon
    },

    props: {

        error: {
            type: Object,
            required: true
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
