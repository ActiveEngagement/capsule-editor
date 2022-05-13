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
        
        <img src="../assets/error-detection.gif" class="screenshot">

        <div class="text-center">
            <div class="mb-3">
                <btn type="button" @click="next">
                    Next <font-awesome-icon icon="long-arrow-alt-right" />
                </btn>
            </div>
        </div>
    </div>
</template>

<script>
import DemoComponent from './DemoComponent.vue';

export default {
    extends: DemoComponent
}
</script>