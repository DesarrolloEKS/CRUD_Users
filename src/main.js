import Vue from 'vue'
import Login from './Login.vue'
//import axios from 'axios'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Login)
}).$mount('#app')
