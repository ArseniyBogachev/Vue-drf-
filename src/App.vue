<template>
  <div>
    <h1>List Women</h1>
    <hr>
    <MyDialog v-if="show" v-on:click="close_open_window">
      <FormApp v-on:create="create"/>
    </MyDialog>
    <ButtonStyle v-else v-on:click="close_open_window">
      Create user
    </ButtonStyle>
    <ul>
      <NameApp v-for="(w, i) in women"
               :key="w.id" v-bind:w="w"
               v-bind:i="i"
               v-on:deleted="deleted"
               v-on:display="display"
               v-on:update="update"/>
    </ul>
  </div>
</template>

<script>
import NameApp from "@/components/NameApp";
import FormApp from "@/components/FormApp";

export default {
  name: 'App',
  data(){
    return {
      women: [
        {id: 1, name: 'Marina', lastname: 'Yudanova', age: 55, del: false, display: false},
        {id: 2, name: 'Daria', lastname: 'Utesheva', age: 20, del: false, display: false},
        {id: 3, name: 'Ariana', lastname: 'Grande', age: 25, del: false, display: false},
      ],
      show: false,
    }
  },
  methods:{
    deleted(id){
      this.women = this.women.filter(elem => elem.id !== id)
    },
    create(name){
      if (name) {
        this.women.push(new Object({id: Date.now(), name: name, lastname: '', age: 0, del: false, display: false}))
        this.close_open_window()
      }
    },
    display(ob){
      ob.display = !ob.display
    },
    update(title, person){
      if (title){
        this.women.find((item) => item.id === person.id).name = title
      }
      person.display = !person.display
    },
    close_open_window(){
      this.show = !this.show
    },
    // close_window(){
    //   this.show = false
    // },
  },
  components: {
    NameApp,
    FormApp
  },
}
</script>

<style scoped>
  div{
    background-color: linen;
  }

  h1{
    text-align: center;
    font-family: "Roboto", "Lucida Grande", "DejaVu Sans", "Bitstream Vera Sans", Verdana, Arial, sans-serif;
  }

  ul{
    list-style: none;
  }
</style>