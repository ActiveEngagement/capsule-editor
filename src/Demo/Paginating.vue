<script lang="ts">
import { ArrowLongRightIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
import DemoComponent from './DemoComponent.vue';

export default defineComponent({
    components: { ArrowLongRightIcon },
    extends: DemoComponent
});
</script>

<template>
    <div>
        <h1 class="text-center font-light">
            Navigation
        </h1>
        <p>
            Navigating through the errors is a breeze. Your cursor will
            automatically highlight the error, or click the next/prev buttons
            to cycle through the errors.
        </p>

        <img
            src="../assets/navigation.gif"
            class="screenshot">

        <div class="capsule-editor-modal-action">
            <btn
                type="button"
                @click="next">
                Next <ArrowLongRightIcon class="w-4 h-4" />
            </btn>
        </div>
    </div>
</template>