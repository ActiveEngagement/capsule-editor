import axios from 'axios';
import Vue from 'vue';
import App from './App';
import EditorFooter from './EditorFooter';
import { AxiosDefaults } from 'capsule-common';

Vue.use(AxiosDefaults, {
    axios,
    id: 'capsule-editor'
});

Vue.config.productionTip = false;

new Vue({
    render: h => h(App, {
        props: {
            footer: Vue.extend(EditorFooter)
        }
    })
}).$mount('#app');
