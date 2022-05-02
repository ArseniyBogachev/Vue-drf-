<template>
  <div class="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/pages/NavBar";
export default {
  components: {NavBar}
}
</script>

<style scoped>

</style>
