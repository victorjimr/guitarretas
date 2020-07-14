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
                                        <input v-model="firstname" type="text" class="form-control" placeholder="Nombre">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input v-model="lastname" type="text" class="form-control" placeholder="Apellidos">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input v-model="email" type="email" class="form-control" placeholder="Email">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input v-model="password" type="password" class="form-control" placeholder="Contraseña">
                                    </div>
                                </div>
                            <div class="form-group">
                                <input @click.prevent="createUser" type="submit" value="Registrarse" class="btn btn-primary py-3 px-5">
                            </div>
                            </div>
                        </form>
                        <small><a href="/login">¿Ya tienes cuenta?</a></small>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

export default {
  name:"Register",
  data(){
    return{
      firstname: "",
      lastname: "",
      email:"",
      password:""
    }
  },
  methods:{
    async createUser(){
      let userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email
      }

      this.$store.dispatch("createUser", userData)

      this.firstname = ""
      this.lastname = ""
      this.email = ""
      this.password = ""
      
      this.$router.push("/")
  }
  }
}
</script>
