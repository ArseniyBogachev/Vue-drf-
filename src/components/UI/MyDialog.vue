<template>
  <div class="wrapper">
    <div class="box" v-on:click.stop="">
      <div class="input">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyDialog"
}
</script>

<style scoped>
  .wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .box{
    width: 300px;
    height: 200px;
    background-color: white;
    padding: 2%;
    position: relative;
  }
  .input{

  }
  p{
    text-align: center;
  }
</style>