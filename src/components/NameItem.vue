<template>
  <span>{{ i + 1 }}</span>
  <span>{{ w.name }}</span>
  <span>{{ w.lastname }}</span>
  <span>{{ w.age }}</span>
</template>

<script>
export default {
  props: {
    w: {
      type: Object,
      required: true,
    },
    i: Number,
  },
  name: "NameItem"
}
</script>

<style scoped>
  span{
    display: inline-block;
    margin-right: 15%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    border: 2px solid darkgrey;
  }
</style>