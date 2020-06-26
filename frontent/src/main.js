import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'axios-vue'
//const config = require('./config')

axios.defaults.baseURL = "https://guitarretas.herokuapp.com/"

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
