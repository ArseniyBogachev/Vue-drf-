<template>
  <div class="nav_bar">
    <h1 v-on:click="$router.push('/')">Practice site</h1>
    <ul class="button">
<!--      <ButtonStyle v-on:click="$router.push('/store')" style="width: 200px; height: 70px; font-size: 20px">Store</ButtonStyle>-->
      <ButtonStyle v-on:click="$router.push('/person')" style="width: 200px; height: 70px; font-size: 20px">Person</ButtonStyle>
      <ButtonStyle v-on:click="$router.push('/about')" style="width: 200px; height: 70px; font-size: 20px">About</ButtonStyle>
    </ul>
    <ul v-if="!this.$localStorage.hasKey('token')" class="button">
      <ButtonStyle v-on:click="$router.push('/login')" style="width: 200px; height: 70px; font-size: 20px">Login</ButtonStyle>
      <ButtonStyle v-on:click="$router.push('/register')" style="width: 200px; height: 70px; font-size: 20px">Register</ButtonStyle>
    </ul>
    <div v-else class="button">
      <ButtonStyle v-on:click="BtnMenu" style="width: 200px; height: 70px; font-size: 20px">{{ this.$localStorage.get('username') }}</ButtonStyle>
      <ul class="btn-menu" v-if="btn_menu" v-on:click="BtnMenu">
        <ButtonStyle v-on:click="$router.push(`/user/${this.$localStorage.get('username').toLowerCase()}/`)" style="width: 200px; border-bottom: none; height: 30px; font-size: 15px">Profile</ButtonStyle>
        <ButtonStyle v-on:click="AxiosPostLogout" style="width: 200px; height: 30px; font-size: 15px">Logout</ButtonStyle>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      btn_menu: false,
    }
  },
  name: "NavBar",
  components: {

  },
  methods:{
    async AxiosPostLogout(){
      try{
        await axios.post('http://127.0.0.1:8000/auth/token/logout/', {}, {headers: {"Authorization" : `Token ${this.$localStorage.get('token')}`} });
        this.$localStorage.remove('token')
        location.reload()
      }
      catch(e){
        console.log(e)
      }
    },
    BtnMenu(){
      this.btn_menu = !this.btn_menu
    }
  },
}
</script>

<style scoped>
  .nav_bar{
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 5px 1px black;
    background-color: crimson;
    color: white;
  }
  .button{
    display: flex;
    position: relative;
  }
  .btn-menu{
    position: absolute;
    top: 52px;
    left: -40px;
  }
</style>
<!--v-if="!this.$localStorage.get('token')"-->