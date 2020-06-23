<template>
    <div class="card">
        <div class="card-body">
            <router-link :to="'/guitar/' + id" class="card-title"><h3>{{name}}</h3></router-link>
            <button href="#" @click.prevent="removeFromFavs()"
                class="btn btn-danger py-3 px-3 m-2">Eliminar de favoritos
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props:['name', 'id'],
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