<template>
  <input type="text" v-bind:value="modelValue" v-on:input="readText">
</template>

<script>
export default {
  props:{
    modelValue:{
      type: [String, Number]
    }
  },
  name: "InputStyle",
  methods:{
    readText(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
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