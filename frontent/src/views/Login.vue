<template>
  <div>
        <section class="fffco-section contact-section">
            <div class="container mt-5">
                <div class="row block-9">
                    <div class="col-md-6">
                        <form action="#" class="contact-form">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input v-model="email" type="email" class="form-control" placeholder="Your Email">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input v-model="password" type="password" class="form-control" placeholder="Your Password">
                                    </div>
                                </div>
                            <div class="form-group">
                                <input @click.prevent="login" type="submit" value="Iniciar sesión" class="btn btn-primary py-3 px-5">
                            </div>
                            </div>
                        </form>
                        <small><a href="/register">¿Crear cuenta?</a></small>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
    return {
      email: "",
      password: "",
    }
  },

    methods:{
    async login(){
      let loginData = {
        email: this.email,
        password: this.password
      }
      try{
        this.$store.dispatch("setUser", loginData)
      }catch(e){
          console.log(e)
      }
        this.$router.push("/")
    }
  }
}
</script>