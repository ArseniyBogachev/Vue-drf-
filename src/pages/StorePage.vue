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
        <InputStyle v-model="search_value" placeholder="Search"/>
      </div>
      <MySelect v-model="selected_value" v-bind:option_list="option_list"/>
    </div>
    <ul v-if="this.women.length">
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
    <div>{{token}}</div>
    <div v-intersection="{func: this.AxiosLoadingLine}" class="observer"></div>
  </div>
</template>

<script>
import NameApp from "@/components/NameApp";
import FormApp from "@/components/FormApp";
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'UserPage',
  data(){
    return {
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
        this.women.find((item) => item.id === person.id).name = title;
      }
      person.display = !person.display;
    },
    close_open_window(){
      this.show = !this.show
    },
    ...mapMutations({
      setPage: 'post/setPage',
      settoken: 'post/settoken',
    }),
    ...mapActions({
      AxiosLoadingLine: 'post/AxiosLoadingLine',
      AxiosPerson: 'post/AxiosPerson',
    }),
  },
  mounted() {
    this.AxiosPerson();
  },
  components: {
    NameApp,
    FormApp,
  },
  computed:{
    ...mapGetters({
      sort_array: 'post/sort_array',
      search_elem_array: 'post/search_elem_array',
    }),
    ...mapState({
      women:state => state.post.women,
      next: state => state.post.next,
      page: state => state.post.page,
      count: state => state.post.count,
      count_list: state => state.post.count_list,
      selected_value: state => state.post.selected_value,
      option_list: state => state.post.option_list,
      search_value: state => state.post.search_value,
      token:state => state.post.token,
    }),
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
  .observer{
    width: 100%;
    height: 50px;
  }
</style>