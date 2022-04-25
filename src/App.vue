<template>
  <div>
    <h1>List Women</h1>
    <hr>
    <FormApp v-on:create="create"/>
    <ul>
      <NameApp v-for="(w, i) in women"
               :key="w.id" v-bind:w="w"
               v-bind:i="i"
               v-on:deleted="deleted"
               v-on:display="display"/>
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
      ]
    }
  },
  methods:{
    deleted(id){
      this.women = this.women.filter(elem => elem.id !== id)
    },
    create(name){
      this.women.push(new Object({id:Date.now(), name:name, lastname:'', age:0, del:false, display: false}))
    },
    display(ob){
      ob.display = !ob.display
      // this.women = this.women.map(function(item, index, array){
      //   if (index === item.id){
      //     item.name = value
      //   }
      // })
    },
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
  }

  ul{
    list-style: none;
    text-align: center;
  }
</style>