<template>
  <div id="app">
    <MainNav :menu="menu"/>
    <router-view></router-view>
  </div>
</template>

<script>

import MainNav from '@/components/MainNav'

export default {
  name:"App",
  data(){
    return{
      user: {},
      isAuth: false,
      menu: [
        {id: 1, path: "/login", name: "Iniciar Sesión"},
        {id: 2, path: "/register", name: "Registrarse"},
      ]
    }
  },
  async mounted() {
    this.checkAuth();
    this.$store.dispatch("checkToken")
    await this.checkUser()
    this.setFavs()
  },
  methods:{
    checkAuth(){
      this.isAuth = window.localStorage.getItem("token")!= null
    },
    async checkUser(){
      if(window.localStorage.getItem("token")!= null){
        let token = window.localStorage.getItem("token")
        let userToken = {
          "token": token
        }
        await this.$store.dispatch("getUser", userToken)
      }
    },
    setFavs(){
      this.$store.commit("setFavs")
    }
  },
  components:{
    MainNav
  }
}
</script>


<style lang="scss">

</style>
