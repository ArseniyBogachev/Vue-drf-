<template>
  <div>
    <InputStyle v-model="username"/>
    <InputStyle type="password" v-model="password"/>
    <ButtonStyle v-on:click="AxiosUpdateUsername">update</ButtonStyle>
  </div>
</template>

<script>


import axios from "axios";

export default {
  data(){
    return{
      username: this.$localStorage.get('username'),
      password: '',
    }
  },
  name: "FormUsername",
  components: {},
  methods:{
    async AxiosUpdateUsername(){
      try{
        await axios.post('http://127.0.0.1:8000/api/v1/auth/users/set_username/', {"new_username": this.username ,"current_password": this.password}, {headers: {"Authorization" : `Token ${this.$localStorage.get('token')}`}})
        this.$localStorage.set('username', this.username)
        location.reload()
      }
      catch(e){
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>

</style>