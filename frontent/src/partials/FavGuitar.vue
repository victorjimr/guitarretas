<template>
    <div class="card container">
        <div class="card-title text-center">
            <router-link :to="'/guitar/' + id" class="card-title"><h3>{{name}}</h3></router-link>
        </div>
        <div class="card-body text-center">
            <p>{{price}} €</p>
            <button href="#" @click.prevent="removeFromFavs()"
                class="btn btn-sm btn-danger py-3 px-3 m-2">Eliminar de favoritos
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props:['name', 'id', 'price'],
    methods:{
        removeFromFavs(){
            this.$emit('removeFromFavs')
        }
    }
}
</script>

<style scoped>
    a{
      text-decoration: none;
    }
</style>