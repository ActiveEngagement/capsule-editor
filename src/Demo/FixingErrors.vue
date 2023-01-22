<script lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
import DemoComponent from './DemoComponent.vue';

export default defineComponent({
    components: { ArrowLongLeftIcon },
    extends: DemoComponent
});
</script>

<template>
    <div>
        <h1 class="text-center font-light">
            Fixing Errors
        </h1>

        <p>
            Some errors can be automatically fixed. If there are multiple ways
            to fix an error, select the best option for that particular instance.
        </p>

        <img
            src="../assets/fixing-errors.gif"
            class="screenshot">

        <div class="capsule-editor-modal-action">
            <btn
                type="button"
                @click="next">
                Next <ArrowLongLeftIcon class="w-4 h-4" />
            </btn>
        </div>
    </div>
</template>