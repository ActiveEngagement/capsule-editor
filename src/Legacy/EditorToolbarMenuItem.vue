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
