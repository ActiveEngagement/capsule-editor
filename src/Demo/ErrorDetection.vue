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
            Error Detection
        </h1>
    
        <p>
            Capsule Editor will automatically check for errors as you type. When
            an error is found, it will be underlined in red and be displayed in
            the panel at the bottom of the editor.
        </p>
        
        <img
            src="../assets/error-detection.gif"
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