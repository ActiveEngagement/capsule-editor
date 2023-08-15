<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    model: {
        prop: 'currentValue'
    },

    props: {

        disableFilename: Boolean,
        
        filename: {
            type: String,
            default: undefined
        }

    },

    emits: [
        'update:filename',
    ],

    data() {
        return {
            currentValue: this.filename
        };
    }

});
</script>

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
                @input="$emit('update:filename', currentValue)">
        </div>
        <div class="editor-toolbar-right">
            <slot name="right" />
        </div>
    </div>
</template>

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
