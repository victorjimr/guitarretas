import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'axios-vue'
const config = require('./config')

const firebaseConfig = {
  apiKey: "AIzaSyCXAOhNh2z58cZ1BJ4yLrgen8H5YlCEzFs",
  authDomain: "guitar-comparator.firebaseapp.com",
  databaseURL: "https://guitar-comparator.firebaseio.com",
  projectId: "guitar-comparator",
  storageBucket: "guitar-comparator.appspot.com",
  messagingSenderId: "592252288520",
  appId: "1:592252288520:web:0f86de92861e75caa29bbd",
  measurementId: "G-GC23H0WDJC"
}

firebase.initializeApp(firebaseConfig)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
