<script lang="ts" setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import type { Hint } from 'capsule-lint';
import { computed } from 'vue';

const props = defineProps<{
    error: Hint
}>();

const url = computed(() => {
    return props.error.rule.link;
});
</script>

<template>
    <code class="flex items-center text-sm">
        <span class="leading-tight text-[.8rem]">{{ error.line }},{{ error.col }} :: ({{ error.rule.id }}) {{ error.message }}</span>
        <a
            :href="url"
            target="_blank"
            class="btn btn-sm btn-link ml-1 mr-3">
            <ArrowTopRightOnSquareIcon class="w-4 h-4" />
        </a>
    </code>    
</template>