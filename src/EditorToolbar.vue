<template>
    <div class="editor-toolbar">
        <div class="editor-toolbar-left">
            <slot name="left" />
        </div>
        <div class="editor-toolbar-title">
            <input
                v-model="currentValue"
                type="text"
                placeholder="Untitled Document"
                :disabled="disableFilename"
                @input="event => $emit('input', event.target.value)">
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
import { Btn } from '@vue-interface/btn';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBug, faCog } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBug, faCog, faQuestionCircle);

export default {

    components: {
        Btn,
        FontAwesomeIcon
    },

    model: {
        prop: 'currentValue'
    },

    props: {

        demoMode: Boolean,

        disableFilename: Boolean,
        
        filename: String

    },

    data() {
        return {
            currentValue: this.filename
        };
    }

};
</script>

<style>
.editor-toolbar {
    color: white;
    background-color: #292C33 !important;
    display: flex;
    justify-content: space-between;
    padding: .5rem .5rem .25rem;
}

.editor-toolbar.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
}

.editor-toolbar .btn {
    position: relative;
}

.editor-toolbar .badge {
    top: 0;
    right: 0;
    z-index: 1;
    transform: translate(50%, -25%);
}

.editor-toolbar .btn.has-error > svg {
    color: #9f1239;
}

.editor-toolbar-title {
    font-size: 1em;
    width: auto;
    background: transparent;
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-grow: 1;
}

.editor-toolbar-title input {
    border: 0;
    margin: 0;
    color: white;
    outline: none;
    background: transparent;
    text-align: center;
    flex-grow: 1;
}

.editor-help, .editor-help:hover {
    font-size: 1.5em;
    color: #228DFF;
}

.editor-toolbar-actions .dropdown-item {
    display: flex;
    align-items: center;
}

.editor-toolbar-actions .dropdown-item span {
    margin-right: 1.5em;
}

.editor-toolbar-actions .dropdown-item code {
    font-size: 8px;
    margin-left: auto;
}

.editor-toolbar-actions .dropdown-item kbd {
    background: rgb(60, 60, 60);
}

.editor-toolbar-actions .dropdown-item kbd:not(:last-child) {
    margin-right: .25em;
}

.editor-toolbar-actions .dropdown-item svg {
    width: 9px;
}
</style>
