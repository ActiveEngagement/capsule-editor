<template>
    <div>
        <animate-css name="zoom" in left>
            <img v-if="loaded" src="../assets/logo-no-text-1028x1028.png" class="capsule-editor-modal-logo">
        </animate-css>
        <h1 class="text-center font-light">
            Capsule Editor
        </h1>
        <p class="mx-5 px-3 py-2">
            Capsule Editor will step you through each error to help you quickly find the correct solution.
            Would like to learn more about Capsule Editor?
        </p>
        <div class="text-center">            <div class="mb-3">
                <btn type="button" @click="next">
                    <font-awesome-icon icon="info-circle" /> Learn More
                </btn>
            </div>
            <small><a href="#" @click.prevent="clear">No, I just want to fix the errors.</a></small>
        </div>
    </div>
</template>

<script>
import DemoComponent from './DemoComponent.vue';

export default {
    extends: DemoComponent
}
</script>