<template>
  <form v-on:submit.prevent="nullTrue">
    <InputStyle v-model="name"/>
    <InputStyle v-model="lastname"/>
    <InputStyle v-model="age"/>
    <ButtonStyle
        type="submit"
        v-on:click="$emit('create', this.name, this.lastname, this.age)">
        Create
    </ButtonStyle>
  </form>
</template>

<script>

export default {
  components: {},
  data(){
    return {
      name: '',
      lastname: '',
      age: '',
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

