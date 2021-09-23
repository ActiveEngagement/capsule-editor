<template>
    <editor-modal class="capsule-editor-demo-modal" :class="`step-${active}`">
        <slide-deck ref="slides" :active="active" :controls="active !== 'welcome'" @enter="onEnter">
            <div v-for="[key, component] in steps" :key="key">
                <component :is="component" :clear="clear" :next="next" :prev="prev" />
            </div>
            <!--
            <div :key="0">
                <div>
                    <animate-css name="zoom" in left>
                        <img v-if="loaded" src="./assets/logo-no-text-1028x1028.png" class="capsule-editor-modal-logo">
                    </animate-css>
                    <h1 class="text-center font-weight-light">
                        Capsule Editor
                    </h1>
                    <p class="mx-5 px-3 py-2">
                        Capsule Editor will step you through each error to help you quickly find the correct solution.
                        Would like to learn more about Capsule Editor?
                    </p>
                    <div class="text-center">
                        <div class="mb-3">
                            <btn type="button" @click="active = 1">
                                <font-awesome-icon icon="info-circle" /> Learn More
                            </btn>
                        </div>
                        <small><a href="#" @click.prevent="$emit('clear')">No, I just want to fix the errors.</a></small>
                    </div>
                </div>
            </div>
            <div :key="1">
                <div>
                    <h1 class="text-center font-weight-light">
                        Fixing Errors
                    </h1>
                
                    <p>
                        Capsule Editor will check for errors automatically as you type.
                        The errors will appear highlighted in red next to a bug icon and 
                        will have a brief description of what is most likely causing the error.
                    </p>
                    
                    <img src="./assets/fixing-errors.gif" class="screenshot img-fluid mb-3">

                    <div class="text-center">
                        <div class="mb-3">
                            <btn type="button" @click="active = 2">
                                Next <font-awesome-icon icon="long-arrow-alt-right" />
                            </btn>
                        </div>
                    </div>
                </div>
            </div>
            <div :key="2">
                <h1 class="text-center font-weight-light">
                    Paginating
                </h1>
                <p>
                    Finding errors can take a little time in a large document or if the HTML isn't properly indented.
                    Capsule Editor provides an interface to paginate through the errors to quickly find them in
                    the document.
                </p>

                <img src="./assets/error-paginating.gif" class="screenshot img-fluid mb-3">

                <div class="text-center">
                    <div class="mb-3">
                        <btn type="button" @click="active = 3">
                            Next <font-awesome-icon icon="long-arrow-alt-right" />
                        </btn>
                    </div>
                </div>
            </div>
            <div :key="3">
                <h1 class="text-center font-weight-light">
                    Almost Ready!
                </h1>
                <p>
                    If you ever need to return to this tutorial, just click the question mark in the top right corner.
                </p>
                <img src="./assets/show-help-modal.gif" class="screenshot img-fluid mb-3">
                <div class="text-center">
                    <btn variant="success" type="button" @click="$emit('clear')">
                        Get Started!
                    </btn>
                </div>
            </div>
            -->
            
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
