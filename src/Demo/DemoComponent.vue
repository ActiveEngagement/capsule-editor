<script lang="ts">
import { AnimateCss } from '@vue-interface/animate-css';
import { Btn } from '@vue-interface/btn';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        AnimateCss,
        Btn,
        // FontAwesomeIcon
    },
    props: {
        clear: {
            type: Function,
            required: true,
        },
        next: {
            type: Function,
            required: true,
        },
        prev: {
            type: Function,
            required: true,
        }
    },

    data: () => ({
        loaded: false
    }),

    mounted() {
        this.loaded = true;
    },
});
</script>