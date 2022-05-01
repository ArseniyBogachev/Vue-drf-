<template>
  <div class="pagination">
      <ButtonStyle v-if="prev" v-on:click="$emit('AxiosPrevNext', prev)">
        Prev
      </ButtonStyle>
      <ButtonStyle v-if="next" v-on:click="$emit('AxiosPrevNext', next)">
        Next
      </ButtonStyle>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: String,
    },
    next: {
      type: String,
    }
  },
  name: "PrevNext"
}
</script>

<style scoped>
  .pagination{
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
</style>