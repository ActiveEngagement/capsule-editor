<template>
    <kbd>
        <slot>{{ label }}</slot>
        <icon v-if="icon" :icon="icon" />
    </kbd>
</template>

<script>
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome';

export default {

    name: 'EditorHotkey',

    components: {
        Icon
    },

    props: {

        label: [Number, String],

        icon: [Array, String]

    }

};
</script>
