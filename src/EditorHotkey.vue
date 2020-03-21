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

<style lang="scss">
@import './node_modules/bootstrap/scss/_functions.scss';
@import './node_modules/bootstrap/scss/_variables.scss';

.edit-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;

    .btn {
        position: relative;

        .badge {
            top: 0;
            right: 0;
            z-index: 1;
            transform: translate(50%, -25%);
        }

        &.has-error > svg {
            color: $danger;
        }
    }

    .edit-toolbar-actions {

        .dropdown-item {
            display: flex;
            align-items: center;

            span {
                margin-right: 1.5em;
            }

            code {
                font-size: 8px;
                margin-left: auto;
            }

            kbd {
                background: rgb(60, 60, 60);

                &:not(:last-child) {
                    margin-right: .25em;
                }
            }

            svg {
                width: 9px;
            }
        }
    }

}
</style>
