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
import ButtonStyle from "@/components/UI/ButtonStyle";
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
  components:{
    ButtonStyle,
  }
}
</script>

<style scoped>
  /*button{*/
  /*  margin-right: 20px;*/
  /*  background-color: white;*/
  /*}*/
  /*button:hover{*/
  /*  box-shadow: 0 0 5px 2px darkgrey inset;*/
  /*}*/
</style>

