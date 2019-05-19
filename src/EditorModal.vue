<template>
    <div class="capsule-editor-modal">
        <div class="capsule-editor-modal-content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss">
@import './node_modules/bootstrap/scss/_functions.scss';
@import './node_modules/bootstrap/scss/_variables.scss';

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
    
    &:after  {
        content: '';
        width: 100%;
        height: 100%;
        background: inherit; 
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        background: rgba(#295B96, .8);
        filter: blur(50rem);
    }

    .capsule-editor-modal-logo {
        width: 6rem;
        margin: 2rem auto;
        display: flex;
    }

    .capsule-editor-modal-content {
        width: 50%;
        max-width: 40rem;
        background: white;
        box-shadow: 0 0 30px rgba(0, 0, 0, .5);
        position: relative;
        z-index: 10;
        padding: 1rem;
    }

    .slide-deck-controls {
        .slide-deck-control-icon {
            color: $gray-400;
            font-size: .75rem;
        }        
    }
}
</style>
