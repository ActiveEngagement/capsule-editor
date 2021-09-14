<template>
    <div class="editor-toolbar d-flex justify-content-between py-1 px-2">
        <div class="editor-toolbar-left">
            <slot name="left" />
        </div>
        <div class="editor-toolbar-title">
            <input type="text" placeholder="Untitled Document" :value="title" @input="onInput">
        </div>
        <div class="editor-toolbar-right">
            <slot name="right">
                <btn v-if="demoMode" size="sm" variant="link" class="editor-help" @click="$emit('demo-modal')">
                    <font-awesome-icon :icon="['far', 'question-circle']" />
                </btn>
            </slot>
        </div>
    </div>
</template>

<script>
import Badge from '@vue-interface/badge';
import Btn from '@vue-interface/btn';

import { alt, ctrl, shift } from './Icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBug, faCog } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome';

library.add(faBug);
library.add(faCog);
library.add(alt);
library.add(ctrl);
library.add(shift);
library.add(faQuestionCircle);

export default {

    components: {
        Btn,
        Icon,
        Badge
    },

    props: {

        activity: Boolean,

        demoMode: Boolean,
        
        errors: Array,

        pageControls: {
            type: Boolean,
            default: true
        },

        value: String,

        title: String

    },

    methods: {

        isLintingDisabled() {
            return !this.value || this.value === '';
        },

        onInput(event) {
            this.$emit('input', event.target.value);
        },

        onClickLint(event) {
            if(!this.isLintingDisabled()) {
                this.$emit('lint', event);
            }
        }

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
