import Vue from 'vue';
import App from './App.vue';
import AxiosDefaults from 'capsule-common/src/Plugins/AxiosDefaults';

Vue.use(AxiosDefaults, {
    id: 'capsule-editor'
});

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
