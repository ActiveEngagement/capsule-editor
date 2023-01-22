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
    <div class="capsule-editor-error">
        <code>
            <span>{{ error.line }},{{ error.col }} :: ({{ error.rule.id }}) {{ error.message }}</span>
            <a
                :href="url"
                target="_blank">
                Reference <ArrowTopRightOnSquareIcon />
            </a>
        </code>            
    </div>
</template>

<style>
.capsule-editor-error {
    display: flex;
    align-items: center;
    animation-duration: .5s;
    padding: .5rem .75rem;
    gap: .5rem;
}

.capsule-editor-error code {
    padding: 0 1rem;
}

.capsule-editor-error a {
    font-size: .85rem;
    color: #e0e0e0;
    padding-left: .5rem;
    display: inline-flex;
    align-items: center;
    gap: .5rem;
}
.capsule-editor-error a svg {
    width: 1rem;
    height: 1rem;
}
</style>
