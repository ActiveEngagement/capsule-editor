<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    model: {
        prop: 'currentValue'
    },

    props: {

        disableFilename: Boolean,
        
        filename: {
            type: String,
            default: undefined
        }

    },

    emits: [
        'update:filename',
    ],

    data() {
        return {
            currentValue: this.filename
        };
    }

});
</script>

<template>
    <div class="flex justify-between px-2 py-1 text-stone-800 bg-stone-200 dark:text-stone-200 dark:bg-stone-800">
        <div>
            <slot name="left" />
        </div>
        <div class="flex-1">
            <input
                v-model="currentValue"
                type="text"
                placeholder="Untitled Document"
                :disabled="disableFilename"
                class="text-center w-full outline-none bg-transparent text-stone-800 dark:text-stone-100"
                @input="$emit('update:filename', currentValue)">
        </div>
        <div>
            <slot name="right" />
        </div>
    </div>
</template>
