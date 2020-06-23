<template>
    <div>
        <h1>{{user.firstname}} {{user.lastname}}</h1>
        <p>{{user.email}}</p>
        <div>
            <h4>Favoritas:</h4>
            <FavGuitar v-for="guitar in user.favGuitars" :key="guitar.id"
            :name="guitar.name"
            :id="guitar._id"
            @removeFromFavs="removeFromFavs(guitar)"/>
            
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