import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import GuitarPage from '../views/GuitarPage.vue'
import UserPage from '../views/UserPage.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/index', name: 'Home', component: Home},
  {path: '/login', name: 'login', component: Login},
  {path: '/register', name: 'register', component: Register},
  {path: '/user', name:'user', component: UserPage},
  {path: '/guitar/:id', name:'guitar', component: GuitarPage}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
