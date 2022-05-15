<template>
  <MyDialog v-if="show" v-on:click="close_open_window"><FormUsername/></MyDialog>
  <div class="container">
    <div class="wrapp">
      <div class="profile">
        <div class="info">
          <ul class="list" v-if="this.input_update">
            <li style="display: flex; align-items: center;"><h1>Profile</h1><img v-on:click="close_open_window" class="img" src="../assets/right.png"></li>
            <li v-if="this.$localStorage.get('first_name')">name: {{ this.$localStorage.get('first_name') }}</li>
            <li v-else>name: <span style="color: darkgray">Empty</span></li>
            <hr>
            <li v-if="this.$localStorage.get('last_name')">lastname: {{ this.$localStorage.get('last_name') }}</li>
            <li v-else>lastname: <span style="color: darkgray">Empty</span></li>
            <hr>
            <li v-if="this.$localStorage.get('email')">E-mail: {{ this.$localStorage.get('email') }}</li>
            <li v-else>E-mail: <span style="color: darkgray">Empty</span></li>
            <li class="update" v-on:click="InputOnOff"><ButtonStyle style="width: 100px; height: 50px; border-bottom: none; border-left: none; border-top: 1px solid darkgray; border-right: 1px solid darkgray">update</ButtonStyle></li>
            <li class="save_off"><p style="width: 100px; height: 33px; border-bottom: none; border-right: none; border-top: 1px solid darkgray; border-left: 1px solid darkgray; background-color: lightgray; text-align: center; font-size: 13px; font-family: Arial; padding-top: 17px;">save</p></li>
          </ul >
          <ul class="list" v-else>
            <li><h1>Profile</h1></li>
            <li>name: <InputStyle v-model="name"/></li>
            <hr>
            <li>lastname: <InputStyle v-model="lastname"/></li>
            <hr>
            <li>E-mail: <InputStyle v-model="email"/></li>
            <li class="update" v-on:click="InputOnOff"><ButtonStyle style="width: 100px; height: 50px; border-bottom: none; border-left: none; border-top: 1px solid darkgray; border-right: 1px solid darkgray">update</ButtonStyle></li>
            <li class="save_on" v-on:click="AxiosUpdateDataUser"><ButtonStyle style="width: 100px; height: 50px; border-bottom: none; border-right: none; border-top: 1px solid darkgray; border-left: 1px solid darkgray">save</ButtonStyle></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FormUsername from "@/components/FormUsername";
export default {
  data(){
    return{
      input_update: true,
      show: false,
      name: this.$localStorage.get('first_name'),
      lastname: this.$localStorage.get('last_name'),
      email: this.$localStorage.get('email'),
      username: this.$localStorage.get('username'),
    }
  },
  name: "MeUser",
  components: {FormUsername},
  methods:{
    InputOnOff(){
      this.input_update = !this.input_update
    },
    async AxiosUpdateDataUser(){
      try{
        const response = await axios.put('http://127.0.0.1:8000/api/v1/auth/users/me/', {"first_name": this.name ,"last_name": this.last_name, "email": this.email}, {headers: {"Authorization" : `Token ${this.$localStorage.get('token')}`}})
        this.$localStorage.set('first_name', response.data.first_name)
        this.$localStorage.set('last_name', response.data.last_name)
        this.$localStorage.set('email', response.data.email)
      }
      catch(e){
        console.log(e)
      }
    },
    close_open_window(){
      this.show = !this.show
    }
  },
}
</script>

<style scoped>
  .container{
    height: 47em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapp{
    width: 400px;
    height: 500px;
    background-color: cornsilk;
    box-shadow: 0 0 15px 5px lightcoral;
    position: relative;
  }
  .profile{
  }
  .info{
  }
  .list{
    list-style: none;
  }
  li{
    font-size: 20px;
    font-family: "Javanese Text";
  }
  .update{
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .save_on{
    position: absolute;
    right: -20px;
    bottom: 0;
  }
  .save_off{
    position: absolute;
    right: 0;
    bottom: -13px;
  }
  .img{
    height: 30px;
    width: 30px;
  }
</style>