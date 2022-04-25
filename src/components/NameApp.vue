<template>
  <li>
    {{ i + 1 }}
    {{ w.name }}
    <button type="button" v-on:click="$emit('display',w)">o</button>
    <button type="button" v-on:click="$emit('deleted',w.id)">x</button>
    <NameUpdate v-if="w.display" v-bind:w="w" v-on:update="update"/>
  </li>
</template>

<script>
import NameUpdate from "@/components/NameUpdate";
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
    NameUpdate
  },
  methods:{
    update(title, event){
      event.name = title
      event.display = !event.display
    }
  }
}
</script>

<style scoped>

</style>