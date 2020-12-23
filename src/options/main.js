import Vue from 'vue';
import App from './App';
import router from './router';
import M from '../Messages';
import VueSelectImage from 'vue-select-image';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.mixin({
  computed: {
    M() {
      return M;
    }
  }
});

Vue.use(VueSelectImage)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');