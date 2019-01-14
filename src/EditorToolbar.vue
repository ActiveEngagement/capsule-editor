<template>
    <navbar class="editor-toolbar" variant="dark" bg-dark>
        <btn-activity ref="lint" size="sm" variant="light" class="mr-auto" :disabled="isLintingDisabled()" :activity="activity" @click.prevent="onClickLint">
            <icon icon="bug" />
            <badge v-if="errors && errors.length" :label="errors.length" variant="danger" class="position-absolute" pill />
        </btn-activity>
        <div class="editor-toolbar-title">
            <input type="text" placeholder="Untitled Document" :value="title" @input="onInput"/>
        </div>
        <btn-dropdown v-if="pageControls" size="sm" variant="light" align="right" class="editor-toolbar-actions ml-auto">
            <icon icon="cog" slot="label"/>
            <editor-toolbar-menu-item label="New File" :hotkeys="['ctrl', 'N']" @click.prevent="$emit('new')" />
            <editor-toolbar-menu-item label="Open" :hotkeys="['ctrl', 'O']" @click.prevent="$emit('open')" />
            <editor-toolbar-menu-item label="Save" :hotkeys="['ctrl', 'S']" @click.prevent="$emit('save')" />
            <editor-toolbar-menu-item label="Save As..." :hotkeys="['shift', 'ctrl', 'S']" @click.prevent="$emit('save-as')" />
            <editor-toolbar-menu-item label="Close" :hotkeys="['ctrl', 'Q']" @click.prevent="$emit('close')" />
            <template v-if="errors && errors.length">
                <dropdown-menu-divider/>
                <editor-toolbar-menu-item label="Export Errors" :hotkeys="['ctrl', 'X']" @click.prevent="$emit('export-errors')" />
            </template>
        </btn-dropdown>
    </navbar>
</template>

<script>
import { alt, ctrl, shift } from './Icons';
import Badge from 'vue-interface/src/Components/Badge';
import Navbar from 'vue-interface/src/Components/Navbar';
import EditorToolbarMenuItem from './EditorToolbarMenuItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import BtnActivity from 'vue-interface/src/Components/BtnActivity';
import BtnDropdown from 'vue-interface/src/Components/BtnDropdown';
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome';
import DropdownMenuDivider from 'vue-interface/src/Components/DropdownMenu/DropdownMenuDivider';

library.add(faBug);
library.add(faCog);
library.add(alt);
library.add(ctrl);
library.add(shift);

export default {

    name: 'editor-toolbar',

    components: {
        Icon,
        BtnActivity,
        Badge,
        Navbar,
        BtnDropdown,
        DropdownMenuDivider,
        EditorToolbarMenuItem
    },

    props: {

        activity: Boolean,

        errors: Array,

        pageControls: {
            type: Boolean,
            default: true
        },

        value: String,

        title: {
            type: String,
            default: null
        }

    },

    methods: {

        isLintingDisabled() {
            return !this.value || this.value === '';
        },

        onInput(event) {
            this.$emit('input', event.target.value);
            this.$emit('update:title', event.target.value);
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
    &.bg-dark {
        background-color: #282a36 !important;
    }

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
        color: white;
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
