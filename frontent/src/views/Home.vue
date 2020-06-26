<template>
  <div class="home">
    <div class="container-fluid">
      <div class="container p-4">
        <form action="#" class="row contact-form">
          <label class="label color-wg" for="#">Encuentra tu guitarra:</label>
          <input type="text" v-model="filtro">
        </form>
        <div class="row no-gutters d-flex">
          <ItemCard v-for="guitar in displayedGuitars" :key="guitar._id"
            :title="guitar.name"
            :image="guitar.image"
            :desc="guitar.description"
            :id="guitar._id"
            :isFav="false"
            @addToFavs="addToFavs(guitar)"
            @removeFromFavs="removeFromFavs(guitar)"
            />
        </div>
        <div class="btn-group col-md-2 offset-md-5">
          <button v-if="page != 1" 
          type="button" class="btn btn-sm btn-otline-secondary"
          @click="page--">Anterior</button>

          <button v-for="pageNumber in pages.slice(page-1, page+5)" 
          :key="pageNumber" type="button"
          class="btn btn-sm btn-otline-secondary"
          @click="page = pageNumber">{{pageNumber}}</button>

          <button v-if="page<pages.length"
          type="button" class="btn btn-sm btn-otline-secondary"
          @click="page++">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ItemCard from '@/partials/ItemCard'

export default {
  name: 'Home',
  data(){
    return{
      guitars:[],
      page: 1,
      perPage: 10,
      pages: [],
      searchText: '',
      guitarsSearched:[],
    }
  },
   async created(){
     await this.getGuitars(),
     this.guitarsSearched = this.guitars
  },
  methods:{
    async getGuitars(){
        let res = await this.$http.get("https://guitarretas.herokuapp.com/guitars")
        this.guitars = res.data.guitars
        this.$store.commit('loadProducts', res.data.guitars)
    },
    async addToFavs(guitar){
       if(this.isAuth === false){
        this.$router.push("/login")
        return
      }
        await this.$store.commit("addToFavs", guitar)
        this.$store.dispatch("updateUser")
    },
    removeFromFavs(guitar){
        this.$store.commit("removeFromFavs", guitar)
        this.$store.dispatch("updateUser")
    },
    paginate(guitars){
      let page = this.page
      let perPage = this.perPage
      let from = (page * perPage) - perPage;
      let to = (page*perPage)
      return guitars.slice(from, to)
    },
    setGuitars(){
      let numberOfPages = Math.ceil(this.guitars.length / this.perPage)
      for (let i = 1; i<= numberOfPages; i++){
        this.pages.push(i)
      }
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    isAuth(){
      return this.$store.state.isAuth
    },
    displayedGuitars(){
      return this.paginate(this.guitarsSearched)
    },
    filtro:{
      get(){
        return this.searchText
      },
      set(value){
        this.searchText = value

        value = value.toLowerCase();

        this.guitarsSearched = this.guitars.filter(guitar => 
        guitar.name.toLowerCase().indexOf(value) !== -1)
      }
    }
  },
  watch:{
    guitars(){
      this.setGuitars()
    }
  },
  components:{
    ItemCard
  }
}
</script>
