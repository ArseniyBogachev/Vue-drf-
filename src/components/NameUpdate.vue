<template>
  <div>
    <InputStyle v-model="name"/>
    <InputStyle v-model="lastname"/>
    <InputStyle v-model="age"/>
    <ButtonStyle
        type="button"
        v-on:click="$emit('update', {'name':name, 'lastname':lastname, 'age':age}, w)">
        Update
    </ButtonStyle>
  </div>
</template>

<script>

export default {
  data(){
    return {
      name: '',
      lastname: '',
      age: '',
    }
  },
  props: {
    w:{
      type: Object,
      required: true,
    },
  },
  name: "NameUpdate",
}
</script>

<style scoped>
  div{
    margin: auto 0;
  }
</style>