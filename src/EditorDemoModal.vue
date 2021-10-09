<template>
    <editor-modal class="capsule-editor-demo-modal" :class="`step-${active}`">
        <slide-deck ref="slides" :active="active" :controls="active !== 'welcome'" @enter="onEnter">
            <div v-for="[key, component] in steps" :key="key">
                <component :is="component" :clear="clear" :next="next" :prev="prev" />
            </div>
            <template v-if="active > 0 && active < 3" #bottom>
                <div class="capsule-editor-modal-footer">
                    <small><a href="#" @click.prevent="clear">Skip Tutorial</a></small>
                </div>
            </template>
        </slide-deck>
    </editor-modal>
</template>

<script>
import { SlideDeck } from '@vue-interface/slide-deck';
import EditorModal from './EditorModal';
import { steps } from './Demo';

export default {

    components: Object.assign({
        EditorModal,
        SlideDeck,
    }, steps),

    data() {
        return {
            active: 'welcome'
        };
    },

    computed: {
        steps() {
            return Object.entries(steps);
        }
    },

    methods: {

        indexOf(name) {
            const match = this.steps.find(([key, component], i) => {
                if(name === key) {
                    return true;
                }
            });
            
            return this.steps.indexOf(match);
        },

        clear() {
            this.$emit('clear');
        },

        goto(index) {
            if(this.steps[index]) {
                const [ key ] = this.steps[index];

                this.active = key;
            }
        },

        next() {
            this.goto(Math.max(0, this.indexOf(this.active)) + 1);
        },

        prev() {
            this.goto(Math.max(0, this.indexOf(this.active)) - 1);
        },

        onEnter(current) {
            this.active = current.key;
        }  

    }
};
</script>

<style lang="scss">
.capsule-editor-demo-modal {
    &:not(.step-welcome):not(.step-finished) .slide-deck-content {
        min-height: 28rem;
        margin-bottom: 3rem;
    }

    &.step-finished {        
        .slide-deck-controls {
            bottom: 0;
        }

        .slide-deck-content {
            margin-bottom: 2rem;
        }
    }

    .slide-deck-content {
        min-height: 25rem;
        margin-bottom: 1rem;

        .screenshot {
            min-height: 260.5px;
        }
    }
}
</style>
