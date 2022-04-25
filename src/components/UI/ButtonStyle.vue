<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonStyle"
}
</script>

<style scoped>
  button{
    margin-right: 20px;
    background-color: white;
  }
  button:hover{
    box-shadow: 0 0 5px 2px darkgrey inset;
  }
</style>