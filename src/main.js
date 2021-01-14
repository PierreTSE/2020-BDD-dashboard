import Vue from 'vue'
import VuePapaParse from 'vue-papa-parse'

import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(VuePapaParse)

new Vue({
  render: h => h(App),
}).$mount('#app')
