<template>
    <div>
        <h1 class="text-center font-weight-light">
            Navigation
        </h1>
        <p>
            Navigating through the errors is a breeze. Your cursor will
            automatically highlight the error, or click the next/prev buttons
            to cycle through the errors.
        </p>

        <img src="../assets/navigation.gif" class="screenshot img-fluid mb-3">

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
import DemoComponent from './DemoComponent';

export default {
    extends: DemoComponent
}
</script>