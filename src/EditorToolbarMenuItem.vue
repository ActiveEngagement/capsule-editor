<template>
    <a href="#" @click.prevent="$emit('click', $event)">
        <span>
            <slot>{{ label }}</slot>
        </span>
        <code v-if="hotkeys">
            <editor-hotkey v-for="(key, i) in hotkeys" :key="i" :icon="key.length > 1 ? key : null" :label="key.length === 1 ? key : null" />
        </code>
    </a>
</template>

<script>
import EditorHotkey from './EditorHotkey';

export default {

    components: {
        EditorHotkey,
    },

    props: {

        label: String,

        hotkeys: Array

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
