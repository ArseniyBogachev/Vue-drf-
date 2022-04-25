<template>
  {{ i + 1 }}
  {{ w.name }}
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

</style>