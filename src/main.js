import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import store from "./core/services/store/store";
import VueMeta from 'vue-meta'
import VueGtag from 'vue-gtag'
import ApiService from "./core/services/api.service";
import VueCodeHighlight from 'vue-code-highlight';
Vue.use(VueCodeHighlight)
Vue.use(VueGtag, {
  config: { id: 'G-7NCN3ZZBC9' }
})
Vue.use(VueMeta)
const moment = require('moment')
require('moment/locale/tr')
Vue.use(require('vue-moment'), {
  moment
});

Vue.config.productionTip = false
ApiService.init();
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
