<template>
    <nav
	class="navbar navbar-expand-lg navbar-dark bg-color-brown color-wg ftco_navbar ftco-navbar-light"
	id="ftco-navbar">

	<div class="container">
	  <router-link class="navbar-brand" to="/index"><span class="">Guitarretas</span>
		</router-link>
        <div v-if="!isAuth" class="collapse navbar-collapse" id="ftco-nav">
		<ul class="navbar-nav ml-auto">
		  <li class="nav-item" v-for="item in menu" :key="item.id">
			<router-link :to="item.path" class="nav-link color-wg">{{item.name}}</router-link>
			</li>
		</ul>
	  	</div>
		<ul v-else class="navbar-nav ml-auto">
			<li> <router-link to="/user" class="nav-link color-wg nav-item">Perfil</router-link></li>
			<li @click="logout" class="nav-link color-wg nav-item">Logout</li>
		</ul>
	
	</div>
  	</nav>  
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  data(){
	  return{
		  id: ""
	  }
  },
  computed:{
	isAuth(){
      return this.$store.state.isAuth
    }
  },
  methods:{
	async logout(){
	  window.localStorage.removeItem("token")
	  this.$store.commit("logout")
      this.$store.dispatch("checkToken")
    }
  },
  props: ["menu"]

}
</script>

