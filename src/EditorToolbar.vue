<template>
    <div class="editor-toolbar d-flex justify-content-between pt-2 px-2 pb-1">
        <div class="editor-toolbar-left">
            <slot name="left" />
        </div>
        <div class="editor-toolbar-title">
            <input v-model="currentValue" type="text" placeholder="Untitled Document" @input="event => $emit('input', event.target.value)">
        </div>
        <div class="editor-toolbar-right">
            <slot name="right">
                <btn size="sm" variant="link" class="editor-help" @click="$emit('demo-modal')">
                    <font-awesome-icon :icon="['far', 'question-circle']" />
                </btn>
            </slot>
        </div>
    </div>
</template>

<script>
import Badge from '@vue-interface/badge';
import Btn from '@vue-interface/btn';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBug, faCog } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBug, faCog, faQuestionCircle);

export default {

    components: {
        Btn,
        Badge,
        FontAwesomeIcon
    },

    props: {

        demoMode: Boolean,
        
        title: String

    },

    model: {
        prop: 'currentValue'
    },

    data() {
        return {
            currentValue: this.title
        };
    }

};
</script>

<style lang="scss">
@import './node_modules/bootstrap/scss/_functions.scss';
@import './node_modules/bootstrap/scss/_variables.scss';

.editor-toolbar {
    color: white;
    background-color: #292C33 !important;

    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }

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

    .editor-toolbar-title {
        font-size: 1em;
        width: auto;
        background: transparent;
        text-align: center;
        margin: 0 auto;
        display: flex;
        flex-grow: 1;

        input {
            border: 0;
            margin: 0;
            color: white;
            outline: none;
            background: transparent;
            text-align: center;
            flex-grow: 1;
        }
    }

    .editor-help, .editor-help:hover {
        font-size: 1.5em;
        color: #228DFF;
    }

    .editor-toolbar-actions {

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
