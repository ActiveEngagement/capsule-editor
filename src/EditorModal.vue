<template>
    <animate-css v-bind="bgAnimation" @after-enter="showContent = true">
        <div v-if="mounted" class="capsule-editor-modal">
            <animate-css v-bind="contentAnimation">
                <div v-if="showContent" class="capsule-editor-modal-content">
                    <slot :is-showing="isContentShowing" />
                </div>
            </animate-css>
        </div>
    </animate-css>
</template>

<script>
import { AnimateCss } from "@vue-interface/animate-css";

export default {
    components: {
        AnimateCss
    },
    props: {
        bgAnimation: {
            type: Object,
            default: () => ({
                name: 'fade',
                duration: '500ms'
            })
        },
        contentAnimation: {
            type: Object,
            default: () => ({
                name: 'fade',
                duration: '500ms'
            })
        }
    },
    data: () => ({
        mounted: false,
        isContentShowing: false,
        showContent: false,
    }),
    watch: {
        showContent(value) {
            if(value) {
                this.$nextTick(() => {
                    this.isContentShowing = true;
                });
            }
        }
    },
    mounted() {
        this.mounted = true;
    },
};
</script>

<style>
.capsule-editor-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    background: rgba(0, 0, 0, .3);
}

.capsule-editor-modal::after  {
    content: '';
    width: 100%;
    height: 100%;
    background: inherit; 
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background: rgba(41, 91, 150, .8);
    filter: blur(50rem);
}

.capsule-editor-modal h1 {
    font-size: 2rem;
}

.capsule-editor-modal small, .capsule-editor-modal .small {
    font-size: .75rem;
}    

.capsule-editor-modal h1 {
    margin-bottom: 1rem;
}

.capsule-editor-modal h5 {
    font-weight: 300;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
}

.capsule-editor-modal p {
    margin-bottom: 1rem;
}

.capsule-editor-modal .capsule-editor-modal-text {
    margin: 0 3rem 1rem;
}

.capsule-editor-modal a {
    color: #0284c7;
}

.capsule-editor-modal .text-center { 
    text-align: center;
}

.capsule-editor-modal a:hover {
    text-decoration: underline;
}

.capsule-editor-modal .font-light {
    font-weight: 300;
}

.capsule-editor-modal-logo {
    width: 6rem;
    margin: 2rem auto;
    display: flex;
}

.capsule-editor-modal-content {
    width: 50%;
    overflow: auto;
    min-width: 33rem;
    max-width: 40rem;
    max-height: 40rem;
    background: white;
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    position: relative;
    z-index: 10;
    padding: 1rem;
}

.capsule-editor-modal .slide-deck-controls {
    bottom: 1.75rem;
}

.capsule-editor-modal .slide-deck-control-icon {
    font-size: .75rem;
}

.capsule-editor-modal .slide-deck-control-icon:not(.is-active) {
    color: #e0e0e0;
}

.capsule-editor-modal-footer {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
}

.capsule-editor-modal-action {
    text-align: center;
}

.capsule-editor-modal-action .btn {
    margin-bottom: .75rem;
}

.capsule-editor-modal-action small {
    display: block;
}
</style>
