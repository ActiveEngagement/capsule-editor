<script lang="ts">
import { SlideDeck } from '@vue-interface/slide-deck';
import { defineComponent } from 'vue';
import { steps } from './Demo';
import EditorModal from './EditorModal.vue';

export default defineComponent({

    components: Object.assign({
        EditorModal,
        SlideDeck,
    }, steps),

    emits: [
        'clear'
    ],

    data() {
        return {
            active: 0
        };
    },

    computed: {
        steps() {
            return Object.entries(steps);
        }
    },

    methods: {

        indexOf(name: any) {
            const match = this.steps.find(([key]: [any]) => {
                if(name === key) {
                    return true;
                }
            });
            
            return this.steps.indexOf(match);
        },

        clear() {
            this.$emit('clear');
        },

        goto(index: number) {
            if(this.steps[index]) {
                const [ key ] = this.steps[index];

                this.active = key;
            }
        },

        next() {
            this.$refs.slides.next();
        },

        prev() {
            this.$refs.slides.prev();
        },

        onEnter(current: any) {
            this.active = current.key;
        }  

    }
});
</script>

<template>
    <editor-modal
        class="capsule-editor-demo-modal"
        :class="`step-${active}`">
        <slide-deck
            ref="slides"
            :controls="active !== 0"
            @enter="onEnter">
            <div
                v-for="[key, component] in steps"
                :key="key">
                <component
                    :is="component"
                    :clear="clear"
                    :next="next"
                    :prev="prev" />
            </div>
            <template
                v-if="active > 0 && active < 3"
                #bottom>
                <div class="capsule-editor-modal-footer">
                    <small><a
                        href="#"
                        @click.prevent="clear">Skip Tutorial</a></small>
                </div>
            </template>
        </slide-deck>
    </editor-modal>
</template>

<style>
.capsule-editor-demo-modal:not(.step-welcome):not(.step-finished) .slide-deck-content {
    margin-bottom: 1rem;
}

.capsule-editor-demo-modal.step-finished .slide-deck-controls {
    bottom: 0;
}

.capsule-editor-demo-modal.step-finished .slide-deck-content {
    margin-bottom: 2rem;
}

.capsule-editor-demo-modal .screenshot {
    width: 100%;
    max-width: 100%;
    min-height: 260px;
    margin-bottom: 1rem;
}
</style>
