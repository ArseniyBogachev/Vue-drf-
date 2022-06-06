<template>
  <div>
    <div class="title">Login</div>
<!--    <InputStyle class="input" placeholder="login" v-bind:model-value="login" @update:model-value="setlogin"/>-->
<!--    <InputStyle class="input" type="password" placeholder="password" v-bind:model-value="password" @update:model-value="setpassword"/>-->
    <InputStyle class="input" placeholder="login" v-model="login"/>
    <InputStyle class="input" type="password" placeholder="password" v-model="password"/>
<!--    <ButtonStyle class="button" v-on:click="AxiosPostLoginToken">Log in</ButtonStyle>-->
    <ButtonStyle class="button" v-on:click="AxiosPostLoginJWT">Log in</ButtonStyle>
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


    // -----------------Авторизация по обычным токенам-------------------
    // async AxiosPostLoginToken(){
    //   try{
    //     const response = await axios.post('http://127.0.0.1:8000/auth/token/login/', {"password": this.password ,"username": this.login,});
    //     this.login = this.password = ''
    //     this.$localStorage.set('token', response.data.auth_token)
    //     console.log('response:', response.data)
    //     const user = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {headers: {"Authorization" : `Token ${this.$localStorage.get('token')}`}})
    //     this.$localStorage.set('username', user.data.username)
    //     this.$localStorage.set('first_name', user.data.first_name)
    //     this.$localStorage.set('last_name', user.data.last_name)
    //     this.$localStorage.set('email', user.data.email)
    //     this.$localStorage.set('id', user.data.id)
    //     console.log('user:', user.data)
    //     location.reload()
    //   }
    //   catch(e){
    //     console.log(e)
    //   }
    // },


    //-----------------Авторизация по JWT-токенам-------------------
    async AxiosPostLoginJWT(){
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {"password": this.password ,"username": this.login,});
        this.login = this.password = ''
        this.$localStorage.set('access', response.data.access)
        this.$localStorage.set('refresh', response.data.refresh)
        console.log('response:', response.data)
        const user = await axios.get('http://127.0.0.1:8000/auth/users/me/', {headers: {"Authorization" : `Bearer ${this.$localStorage.get('access')}`}})
        this.$localStorage.set('username', user.data.username)
        this.$localStorage.set('first_name', user.data.first_name)
        this.$localStorage.set('last_name', user.data.last_name)
        this.$localStorage.set('email', user.data.email)
        this.$localStorage.set('id', user.data.id)
        console.log('user:', user.data)
        location.reload()
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