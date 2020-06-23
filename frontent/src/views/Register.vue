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
                                        <input v-model="firstname" type="text" class="form-control" placeholder="Your Name">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input v-model="lastname" type="text" class="form-control" placeholder="Your Name">
                                    </div>
                                </div>
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
                                <input @click.prevent="createUser" type="submit" value="Send Message" class="btn btn-primary py-3 px-5">
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

import firebase from 'firebase'

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
      try{
      let auth = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      }catch(e){
        alert(e.message)
      }

      let userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email
      }

      try{
        await this.$http.post("http://localhost:3000/register", userData)
      }catch(e){
        console.log("Se ha producido un error")
      }

      firstname = ""
      lastname = ""
      email = ""
      password = ""
  }
  }
}
</script>
