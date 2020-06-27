<template>
    <div>
        <h1 class = "text-center">{{user.firstname}} {{user.lastname}}</h1>
        <p class = "text-center">{{user.email}}</p>
        <div class="container mb-4">
            <h4 class = "text-center">Favoritas:</h4>
            <div class="container-fluid mb-4">
                <div class="row justify-content-center">
                    
                    <FavGuitar class="col-md-7 mb-2" v-for="guitar in user.favGuitars" :key="guitar.id"
                    :price="guitar.price"
                    :name="guitar.name"
                    :id="guitar._id"
                    @removeFromFavs="removeFromFavs(guitar)"/>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import FavGuitar from '@/partials/FavGuitar.vue'

export default {
    
    computed:{
        user(){
            return this.$store.state.user
        }
    },
    methods:{
      removeFromFavs(guitar){
        this.$store.commit("removeFromFavs", guitar)
        this.$store.dispatch("updateUser", this.user)
    }
    },
    components:{
        FavGuitar
    }
}

</script>