import Vue from 'vue';
import App from './App';
import router from './router';
import M from '../Messages';
import VueSelectImage from 'vue-select-image';
import Carousel3d from 'vue-carousel-3d';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.mixin({
  computed: {
    M() {
      return M;
    }
  }
});

Vue.use(VueSelectImage);
Vue.use(Carousel3d);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');