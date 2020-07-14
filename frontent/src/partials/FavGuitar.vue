<template>
    <table class="table">
        <thead class="text-center">
            <tr>
                <th><router-link :to="'/guitar/' + id"><img class="col-sm-6 mb-2" :src="image" alt=""></router-link></th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-center">
                <router-link :to="'/guitar/' + id"><a class="titulo-tarjeta col-sm-6">{{name}}</a></router-link>
            </tr>
            <tr>
                <p class="text-center">{{price}}€</p>
            <tr class="text-center">
                <button href="#" @click.prevent="removeFromFavs()"
                class="btn btn-secondary btn-marron py-2 px- m-3">Eliminar
                </button>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props:['name', 'id', 'price', 'image'],
    methods:{
        removeFromFavs(){
            this.$emit('removeFromFavs')
        }
    }
}
</script>

<style scoped>
    a{
      text-decoration: inherit;
        color: inherit;
        cursor: auto;
    }
</style>