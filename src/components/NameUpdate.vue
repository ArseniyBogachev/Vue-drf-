<template>
  <div>
    <input type="text" v-model="title">
    <button type="button" v-on:click="$emit('update',title, w)">Update</button>
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
  name: "NameUpdate"
}
</script>

<style scoped>
  div{
    margin: auto 0;
  }
</style>