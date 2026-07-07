<script setup lang="ts">
import { ref } from 'vue';
import Editor from '../src/Editor.vue';

// @ts-ignore
import input from './no-start-tag.html?raw';

const content = ref<string>(input);
</script>

<template>
    <Editor :content="content" class="h-screen" />
</template>
