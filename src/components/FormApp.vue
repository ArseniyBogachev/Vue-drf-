<template>
  <form v-on:submit.prevent="nullTrue">
    <input type="text" v-model="title">
    <button type="submit" v-on:click="$emit('create', title)">Create</button>
  </form>
</template>

<script>
export default {
  data(){
    return {
      title: '',
    }
  },
  name: "FormApp",
  methods:{
    nullTrue(){
      this.title = ''
    },
    // textTitle(event){
    //   this.title = event.target.value
    // }
  }
}
</script>

<style scoped>
  button{
    margin-right: 20px;
    background-color: white;
  }
  button:hover{
    box-shadow: 0 0 5px 2px darkgrey inset;
  }
</style>

