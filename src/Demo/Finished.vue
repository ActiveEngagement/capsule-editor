<script lang="ts">
import { defineComponent } from 'vue';
import DemoComponent from './DemoComponent.vue';

export default defineComponent({
    extends: DemoComponent
});
</script>

<template>
    <div>
        <h1 class="text-center font-light">
            Almost Ready!
        </h1>
        <p>
            If you ever need to return to this tutorial, just click the question mark in the top right corner.
        </p>
        <img
            src="../assets/show-help-modal.gif"
            class="screenshot">
        <div class="text-center">
            <btn
                variant="success"
                type="button"
                @click="clear">
                Get Started!
            </btn>
        </div>
    </div>
</template>