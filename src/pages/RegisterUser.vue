<template>
  <div>
    <div class="title">Register</div>
    <div class="form">
      <span>{{ this.exception_error[0] }}</span>
      <InputStyle class="input" v-model="name" placeholder="login"/>
      <span>{{ this.exception_name[0] }}</span>
      <InputStyle class="input" v-model="firstname" placeholder="firstname"/>
      <InputStyle class="input" v-model="lastname" placeholder="lastname"/>
      <InputStyle class="input" v-model="email" placeholder="e-mail"/>
      <span>{{ this.exception_email[0] }}</span>
      <InputStyle type="password" class="input" v-model="password" placeholder="password"/>
      <div v-for="p in exception_password" v-bind:key="p">{{p}}</div>
      <ButtonStyle class="button" v-on:click="AxiosPostRegister({firstname, lastname, email, name, password})">Register</ButtonStyle>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      name: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      exception_name: Array,
      exception_email: Array,
      exception_password: Array,
      exception_error: Array,
    }
  },
  name: "RegisterUser",
  components: {},
  methods:{
    async AxiosPostRegister(data){
      this.exception_name = this.exception_email = this.exception_password = this.exception_error = []
      try{
        await axios.post('http://127.0.0.1:8000/api/v1/register/', {'first_name': data.firstname ,'last_name': data.lastname,'email': data.email, 'username': data.name, 'password': data.password});
        this.name = this.firstname = this.lastname = this.email = this.password = ''
      }
      catch(e){
        console.log(e.response.data)
        for (let key in e.response.data){
          if (key === 'username'){
            this.exception_name = e.response.data['username']
          }
          else if (key === 'email'){
            this.exception_email = e.response.data['email']
          }
          else if (key === 'password'){
            this.exception_password = e.response.data['password']
          }
          else{
            this.exception_error = ['Ошибка отправки формы.']
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .title{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
  }
  .form{

  }
  .input{
    display: block;
    margin-top: 20px;
  }

  .button{
    margin-top: 20px;
  }
</style>