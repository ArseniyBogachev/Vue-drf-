<template>
  <select v-bind:value="modelValue" v-on:change="Sort_list">
    <option disabled value="">Select sorting</option>
    <option v-for="option in option_list" v-bind:key="option.value" v-bind:value="option.value">{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  props:{
    modelValue: {
      type: String,
    },
    option_list:{
      type: Array,
      default: () => [],
    },
  },
  name: "MySelect",
  methods:{
    Sort_list(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>