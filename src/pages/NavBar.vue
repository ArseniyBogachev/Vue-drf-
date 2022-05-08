<template>
  <div class="nav_bar">
    <h1 v-on:click="$router.push('/')">Practice site</h1>
    <ul class="button">
      <ButtonStyle v-on:click="$router.push('/person')" style="width: 200px; height: 70px; font-size: 20px">Person</ButtonStyle>
      <ButtonStyle v-on:click="$router.push('/about')" style="width: 200px; height: 70px; font-size: 20px">About</ButtonStyle>
    </ul>
    <ul class="button">
      <ButtonStyle v-on:click="$router.push('/login')" style="width: 200px; height: 70px; font-size: 20px">Login</ButtonStyle>
      <ButtonStyle v-on:click="$router.push('/register')" style="width: 200px; height: 70px; font-size: 20px">Register</ButtonStyle>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {

  }
}
</script>

<style scoped>
  .nav_bar{
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 5px 1px black;
    background-color: crimson;
    color: white;
  }
  .button{
    display: flex;
  }
</style>