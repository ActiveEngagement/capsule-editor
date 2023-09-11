<script lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';

export default defineComponent({

    components: {
        ArrowTopRightOnSquareIcon
    },

    props: {

        error: {
            type: Object,
            required: true
        }

    },

    computed: {
        url() {
            return this.error.rule.link;
        }
    }
    
});
</script>

<template>
    <code class="flex items-center">
        <span class="mr-3">{{ error.line }},{{ error.col }} :: ({{ error.rule.id }}) {{ error.message }}</span>
        <a
            :href="url"
            target="_blank"
            class="btn btn-sm btn-link">
            Reference <ArrowTopRightOnSquareIcon class="w-6 h-6 mb-1" />
        </a>
    </code>    
</template>