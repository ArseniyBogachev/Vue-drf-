<template>
  <div>
    <div class="title">Login</div>
<!--    <InputStyle class="input" placeholder="login" v-bind:model-value="login" @update:model-value="setlogin"/>-->
<!--    <InputStyle class="input" type="password" placeholder="password" v-bind:model-value="password" @update:model-value="setpassword"/>-->
    <InputStyle class="input" placeholder="login" v-model="login"/>
    <InputStyle class="input" type="password" placeholder="password" v-model="password"/>
    <ButtonStyle class="button" v-on:click="AxiosPostLogin">Log in</ButtonStyle>
<!--    {{this.$localStorage.get('token')}}-->
  </div>
</template>

<script>

import axios from "axios";
// import {mapActions, mapState, mapMutations} from "vuex";
export default {
  data(){
    return{
      login: '',
      password: '',
    }
  },
  name: "LoginUser",
  components: {},
  methods:{
    // ...mapActions({
    //   AxiosPostLogin: 'post/AxiosPostLogin',
    // }),
    // ...mapMutations({
    //   setlogin: 'post/setlogin',
    //   setpassword: 'post/setpassword'
    // })
    async AxiosPostLogin(){
      try{
        const response = await axios.post('http://127.0.0.1:8000/auth/token/login/', {"password": this.password ,"username": this.login,});
        this.login = this.password = ''
        this.$localStorage.set('token', response.data.auth_token)
      }
      catch(e){
        console.log(e)
      }
    },
  },
  // computed:{
  //   ...mapState({
  //     // token:state => state.post.token,
  //     login:state => state.post.login,
  //     password:state => state.post.password,
  //   }),
  // },
}

</script>

<style scoped>
  div{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
  }

  .input{
    display: block;
    margin-top: 20px;
  }

  .title{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
  }

  .button{
    margin-top: 20px;
  }
</style>