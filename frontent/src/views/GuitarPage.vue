<template>
    <div class="container">
        <div class="row mt-4 mx-auto">
            <div class="col-4">
                <img :src="guitar.image" class="image img-fluid"  alt="">
            </div>
            <div class="col-6">
                <h4>{{guitar.name}}</h4>
                <p>{{guitar.description}} Más información en la web.</p>
                <p>La puedes encontrar por {{guitar.price}} € en:</p>
                <a :href="'https://www.guitarristas.info/'+guitar.url">https://www.guitarristas.info/{{guitar.url}}</a>
                <br>
                <button v-if="!isFav" href="#" @click.prevent="addToFavs(guitar)"
                class="btn btn-primary py-1 px-1 m-2">Añadir a favoritos
                </button>
                <button v-else href="#" @click.prevent="removeFromFavs(guitar)"
                class="btn btn-danger py-1 px-1 m-2">Eliminar de favoritos
                </button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
  data(){
    return{
      guitar:{},
      isFav: false,
      id: this.$route.params.id
    }
  },
   created(){
      this.getGuitar()
      this.checkFav()
    },
  methods:{
      async getGuitar(){
        let res = await this.$http.get(`http://localhost:3000/guitars/:${this.id}`)
        this.guitar = res.data.guitar
    },
    checkFav(){
        if(window.localStorage.getItem("token")!= null){
        let favs = this.$store.state.favs
        if(favs.length !== 0){
            favs.forEach(item =>{
            if(item._id===this.id){
                this.isFav = true
            }
        })
        }  
      }
    },
    addToFavs(guitar){
       if(this.isAuth === false){
        this.$router.push("/login")
        return
      }
        this.$store.commit("addToFavs", guitar)
        this.$store.dispatch("updateUser")
        this.isFav = true
    },
    removeFromFavs(guitar){
        this.$store.commit("removeFromFavs", guitar)
        this.$store.dispatch("updateUser")
        this.isFav = false
    }
  }
}
</script>

<style scoped>
    a{
      text-decoration: none;
      color: var(--main-soft-blue)
    }
</style>