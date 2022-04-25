<template>
  <li>
    <NameItem v-bind:w="w" v-bind:i="i"/>
    <ButtonStyle
        type="button"
        v-on:click="$emit('display',w)">
        &#8595;
    </ButtonStyle>
    <ButtonStyle
        type="button"
        v-on:click="$emit('deleted',w.id)">
        x
    </ButtonStyle>
    <NameUpdate v-if="w.display" v-bind:w="w" v-on:update="update"/>
  </li>
</template>

<script>
import NameUpdate from "@/components/NameUpdate";
import NameItem from "@/components/NameItem";
import ButtonStyle from "@/components/UI/ButtonStyle";
export default {
  props: {
    w:{
      type: Object,
      required: true,
    },
    i: Number,
  },
  name: "NameApp",
  components:{
    NameUpdate,
    NameItem,
    ButtonStyle,
  },
  methods:{
    update(title, event){
      if (title){
        event.name = title
      }
      event.display = !event.display
    }
  }
}
</script>

<style scoped>
  li{
    border: 2px solid darkgrey;
    margin-top: 30px;
  }
  /*button{*/
  /*  margin-right: 20px;*/
  /*  background-color: white;*/
  /*}*/
  /*button:hover{*/
  /*  box-shadow: 0 0 5px 2px darkgrey inset;*/
  /*}*/
</style>