<template>
  <div>
    <input type="text" v-model="title">
    <ButtonStyle
        type="button"
        v-on:click="$emit('update', title, w)">
        Update
    </ButtonStyle>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: '',
    }
  },
  props: {
    w:{
      type: Object,
      required: true,
    },
  },
  name: "NameUpdate",
}
</script>

<style scoped>
  div{
    margin: auto 0;
  }

  input{
    margin-right: 10px;
  }
  input:hover{
    background-color: gainsboro;
  }
</style>