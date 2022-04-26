<template>
  <form v-on:submit.prevent="nullTrue">
    <input type="text" v-model="title">
    <ButtonStyle
        type="submit"
        v-on:click="$emit('create', title)">
        Create
    </ButtonStyle>
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
  },
}
</script>

<style scoped>
  input{
    margin-right: 10px;
  }

  input:hover{
    background-color: gainsboro;
  }
</style>

