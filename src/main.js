import Vue from 'vue'
import VuePapaParse from 'vue-papa-parse'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VuePapaParse)

new Vue({
  render: h => h(App),
}).$mount('#app')
