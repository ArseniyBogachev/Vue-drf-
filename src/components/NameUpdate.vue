<template>
  <div>
    <input type="text" v-model="title">
    <ButtonStyle
        type="button"
        v-on:click="$emit('update',title, w)"
        Update
    />
  </div>
</template>

<script>
import ButtonStyle from "@/components/UI/ButtonStyle";
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
  components:{
    ButtonStyle,
  }
}
</script>

<style scoped>
  div{
    margin: auto 0;
  }
  /*button{*/
  /*  margin-right: 20px;*/
  /*  background-color: white;*/
  /*}*/
  /*button:hover{*/
  /*  box-shadow: 0 0 5px 2px darkgrey inset;*/
  /*}*/
</style>