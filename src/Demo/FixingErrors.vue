<template>
    <div>
        <h1 class="text-center font-light">
            Fixing Errors
        </h1>

        <p>
            Some errors can be automatically fixed. If there are multiple ways
            to fix an error, select the best option for that particular instance.
        </p>

        <img src="../assets/fixing-errors.gif" class="screenshot">

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