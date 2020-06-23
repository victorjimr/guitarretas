import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from "jwt-decode"
import axios from 'axios'
import VueAxios from 'axios-vue'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    user: {},
    guitars:[],
    isAuth: false,
    favs:[],
    token: "",
    userLogged: {
      id: null,
      firstname: null,
      profile: "",
    }
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    loadProducts(state, allGuitars){
      state.guitars = allGuitars
    },
    setToken(state, token) {
      state.token = token;
      state.isAuth = true;

      window.localStorage.setItem("token", token);

      let userInfo = jwtDecode(token);
      state.userLogged.id = userInfo.id;
      state.userLogged.firstname = userInfo.firstname;
      state.userLogged.profile = userInfo.profile || "user";
    },
    logout(state){
      state.isAuth = false;
    },
    addToFavs(state, guitar){
      state.user.favGuitars.push(guitar)
      state.favs.push(guitar)
      
    },
    removeFromFavs(state, guitar){
      let index = state.user.favGuitars.findIndex((item) => item._id === guitar._id);
      state.user.favGuitars.splice(index, 1)
      state.favs.splice(index, 1)
    },
    setFavs(state){
      let userFavs = state.user.favGuitars
      userFavs.forEach(element => {
       state.favs.push(element)
     });
    }
  },
  actions: {
    checkToken(context) {
      let token = window.localStorage.getItem("token");
      if (token) {
        this.commit("setToken", token);
      }
    },
    async setUser(context, loginData){
      let response = await axios.post("http://localhost:3000/login", loginData)

      context.commit('setToken', response.data.token)
      context.commit("setUser", response.data.user)
    },
    async getUser(context, userToken){
      let response = await axios.post("http://localhost:3000/user", userToken)
      context.commit("setUser", response.data.user)
    },
    async updateUser(context){
      let userData = this.state.user
      console.log(userData)
      let res = await axios.put("http://localhost:3000/user", this.state.user)
    }
  },
  modules: {
  }
})
