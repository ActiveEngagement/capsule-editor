<script lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
import DemoComponent from './DemoComponent.vue';

export default defineComponent({
    components: { InformationCircleIcon },
    extends: DemoComponent
});
</script>

<template>
    <div>
        <animate-css
            name="zoom"
            in
            left>
            <img
                v-if="loaded"
                src="../assets/logo-no-text-1028x1028.png"
                class="capsule-editor-modal-logo">
        </animate-css>
        <h1 class="text-center font-light">
            Capsule Editor
        </h1>
        <div class="capsule-editor-modal-text">
            Capsule Editor will step you through each error to help you quickly find the correct solution.
            Would like to learn more about Capsule Editor?
        </div>
        <div class="capsule-editor-modal-action">
            <btn
                type="button"
                @click="next">
                <InformationCircleIcon class="w-6 h-6" /> Learn More
            </btn>
            <small><a
                href="#"
                @click.prevent="clear">No, I just want to fix the errors.</a></small>
        </div>
    </div>
</template>