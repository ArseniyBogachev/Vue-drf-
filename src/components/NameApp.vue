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
    <NameUpdate v-if="w.display" v-bind:w="w" v-on:update="doSomething"/>
  </li>
</template>

<script>
import NameUpdate from "@/components/NameUpdate";
import NameItem from "@/components/NameItem";
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
  },
  methods:{
    doSomething(title, person){
      this.$emit('update', title, person)
    }
  }
}
</script>

<style scoped>
  li{
    border: 2px solid darkgrey;
    margin-top: 30px;
  }
</style>