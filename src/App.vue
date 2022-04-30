<template>
  <div>
    <h1>List Women</h1>
    <hr>
    <div class="create_and_sort">
      <MyDialog v-if="show" v-on:click="close_open_window">
        <FormApp v-on:create="create"/>
      </MyDialog>
      <ButtonStyle v-else v-on:click="close_open_window">
        Create user
      </ButtonStyle>
      <div>
        <InputStyle v-model="search_value" v-on:input="search_list" placeholder="Search"/>
      </div>
      <MySelect v-model="selected_value" v-bind:option_list="option_list"/>
    </div>
    <ul v-if="women.length">
      <transition-group name="list">
        <NameApp v-for="(w, i) in search_elem_array"
               :key="w.id"
               v-bind:w="w"
               v-bind:i="i"
               v-on:deleted="deleted"
               v-on:display="display"
               v-on:update="update"
        />
      </transition-group>
    </ul>
    <div v-else>List person empty.</div>
    <div class="pagination">
<!--      <ul v-for="c in count_list" v-bind:key="c">-->
<!--        <li class="countList">{{ c }}</li>-->
<!--      </ul>-->
      <ButtonStyle v-if="prev" v-on:click="AxiosPrevNext(prev)">
        Prev
      </ButtonStyle>
      <ButtonStyle v-if="next" v-on:click="AxiosPrevNext(next)">
        Next
      </ButtonStyle>
    </div>
  </div>
</template>

<script>
import NameApp from "@/components/NameApp";
import FormApp from "@/components/FormApp";
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return {
      women:[],
      next: '',
      prev: '',
      count: Number,
      count_list: Number,
      show: false,
      selected_value: '',
      option_list: [
        {value: 'name', name: 'Name'},
        {value: 'age', name: 'Age'},
      ],
      search_value: '',
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
        this.women.find((item) => item.id === person.id).name = title;
      }
      person.display = !person.display;
    },
    close_open_window(){
      this.show = !this.show
    },
    async AxiosPrevNext(url){
      try{
        const response = await axios.get(url);
        this.women = response.data.results;
        this.next = response.data.next;
        this.prev = response.data.previous;
      }
      catch (e){
        alert('Error Data');
      }
    },
    async AxiosPerson(){
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/womenlist?limit=4&offset=1');
        this.women = response.data.results;
        this.count = response.data.count;
        this.next = response.data.next;
        // this.prev = response.data.previous;
        this.count_list = Math.ceil(this.count / this.women.length)
      }
      catch (e){
        alert('Error Data');
      }
    },
    search_list(event){
      this.women.filter((item) => item['name'].includes(event.target.value))
    },
  },
  mounted() {
    this.AxiosPerson();
  },
  components: {
    NameApp,
    FormApp
  },
  computed:{
    sort_array(){
      if (this.selected_value === 'name'){
        return [...this.women].sort((str1, str2) => (str1.name).localeCompare(str2.name))
      }
      else if (this.selected_value === 'age') {
        return [...this.women].sort((int1, int2) => int1.age - int2.age)
      }
      else {
        return this.women
      }
    },
    search_elem_array(){
      return this.sort_array.filter((item) => item['name'].toLowerCase().includes(this.search_value.toLowerCase()))
    }
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
  .create_and_sort{
    display: flex;
    justify-content: space-around;
  }
  .list-item {
  display: inline-block;
  margin-right: 10px;
  }
  .list-enter-enter,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
  .list-move{
    transition: transform 0.5s ease;
  }
  .pagination{
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
  .countList{
    border: 1px solid black;
    width: 20px;
    height: 20px;
    text-align: center;
  }
</style>
