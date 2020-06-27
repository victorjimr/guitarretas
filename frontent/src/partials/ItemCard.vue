<template>
    <div class="col-lg-4 d-flex ">
        <div class="services-wrap d-flex card shadow m-2">
            <div class="inner">
                <img class="card-img-top" :src="image" >
            </div>
            <div class="text p-4 card-body">
                <router-link :to="'/guitar/' + id" class="card-title"><h3>{{title}}</h3></router-link>
                <p class="card-text"> {{desc}} Más información en la web. <span>{{price}} €</span></p>
                
                    <button v-if="!isFav" href="#" @click.prevent="addToFavs()"
                class="btn btn-primary py-3 px-3 m-2 center-block">Añadir a favoritos
                    </button>
                    <button v-else href="#" @click.prevent="removeFromFavs()"
                class="btn btn-danger py-3 px-3 m-2 center-block">Eliminar de favoritos
                    </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title','id', 'image', 'price', 'desc'],
    data(){
        return {isFav : false}
    },
    mounted(){
        this.checkFav()
    },
    methods:{
        addToFavs(){
            this.$emit('addToFavs')
            this.isFav = true
        },
        removeFromFavs(){
            this.$emit('removeFromFavs')
            this.isFav = false
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
        }
    },

}
</script>

<style scoped>
    a{
      text-decoration: none;
    }
</style>