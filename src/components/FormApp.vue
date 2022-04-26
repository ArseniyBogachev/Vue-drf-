<template>
  <form v-on:submit.prevent="nullTrue">
    <InputStyle v-model="title"/>
    <ButtonStyle
        type="submit"
        v-on:click="$emit('create', title)">
        Create
    </ButtonStyle>
  </form>
</template>

<script>

export default {
  data(){
    return {
      title: '',
    }
  },
  name: "FormApp",
  methods:{
    nullTrue(){
      this.title = ''
    },
  },
}
</script>

<style scoped>

</style>

