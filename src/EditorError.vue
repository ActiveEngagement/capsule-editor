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
    <code class="flex items-center text-sm">
        <span>{{ error.line }},{{ error.col }} :: ({{ error.rule.id }}) {{ error.message }}</span>
        <a
            :href="url"
            target="_blank"
            class="btn btn-sm btn-link ml-2 mr-2">
            <ArrowTopRightOnSquareIcon class="w-6 h-6 mb-1" />
        </a>
    </code>    
</template>