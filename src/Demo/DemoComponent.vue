<script>
import AnimateCss from '@vue-interface/animate-css';
import Btn from '@vue-interface/btn';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLongArrowAltRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faInfoCircle);
library.add(faLongArrowAltRight);

export default {
    components: {
        AnimateCss,
        Btn,
        FontAwesomeIcon
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
}
</script>