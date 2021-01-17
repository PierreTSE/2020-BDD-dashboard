import Vue from 'vue'
import VuePapaParse from 'vue-papa-parse'

import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(VuePapaParse)

Vue.prototype.$apiurl = "http://localhost:8082/query?query=";
Vue.prototype.$offlineMode = true;  // Si true, les requetes ne seront pas envoyés à l'api
Vue.prototype.$deployMode = false;  // Si false, la page sera pré-peuplée + des boutons de débug seront accessibles

new Vue({
  render: h => h(App),
}).$mount('#app')

