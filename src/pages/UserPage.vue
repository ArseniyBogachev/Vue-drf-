<template>
  <div>
    <p v-if="error_authorize" class="error_authorize">You are not authorized.</p>
    <h1>List Women</h1>
    <hr>
    <div class="create_and_sort">
      <MyDialog v-if="show" v-on:click="close_open_window">
        <p>Create person</p>
        <FormApp v-on:create="create"/>
      </MyDialog>
      <ButtonStyle v-else v-on:click="close_open_window">
        Create person
      </ButtonStyle>
      <div>
        <InputStyle v-model="search_value" placeholder="Search"/>
      </div>
      <MySelect v-model="selected_value" v-bind:option_list="option_list"/>
    </div>
    <ul v-if="women.length">
      <transition-group name="list">
        <NameApp v-for="(w, i) in search_elem_array"
               :key="w.id"
               v-bind:w="w"
               v-bind:i="i"
               v-on:display="display"
               v-on:update="update"
               v-on:AxiosLikePerson="AxiosLikePerson"
               v-bind:error_del="error_del"
               v-on:AxiosDeletePerson="AxiosDeletePerson"
        />
      </transition-group>
    </ul>
    <div v-else>List person empty.</div>
<!--    <div>{{token}}</div>-->
<!--    <PrevNext v-bind:next="next" v-bind:prev="prev" v-on:AxiosPrevNext="AxiosPrevNext"/>-->
<!--    <PaginationList v-bind:count_list="count_list" v-bind:page="page" v-on:AxiosPrevNext="AxiosPrevNext"/>-->
    <div v-intersection="{func: this.AxiosLoadingLine}" class="observer"></div>
  </div>
</template>

<script>
import NameApp from "@/components/NameApp";
import FormApp from "@/components/FormApp";
import axios from 'axios';
// import PrevNext from "@/components/PrevNext";
// import PaginationList from "@/components/PaginationList";

export default {
  name: 'UserPage',
  data(){
    return {
      women:[],
      next: '',
      prev: '',
      page: 1,
      count: Number,
      count_list: Number,
      show: false,
      selected_value: '',
      error_authorize: false,
      error_del: false,
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
    create(name, lastname, age){
      if (name && lastname && age) {
        let newPost = new Object({name: name, lastname: lastname, age: age, del: false, display: false})
        this.AxiosPostPerson(newPost)
        this.close_open_window()
      }
      else{
        alert('Error Text')
      }
    },
    display(ob){
      ob.display = !ob.display
    },
    update(dict, person){
      for (let i in dict){
        if (dict[i] === ''){
          delete dict[i]
        }
        else{
          person[i] = dict[i]
        }
      }
      this.AxiosUpdatePerson(dict, person)
      person.display = !person.display;
    },
    close_open_window(){
      this.show = !this.show
    },
    async AxiosDeletePerson(person){
      try{
        await axios.delete(`http://127.0.0.1:8000/api/v1/womendelete/${person}/`, {headers: {"Authorization" : `Bearer ${this.$localStorage.get('access')}`}})
        this.deleted(person)
      }
      catch (e){
        if (e.response.status === 403){
          this.error_del = true
        }
        if (e.response.status === 401){
          this.error_authorize = true
        }
      }
    },
    async AxiosUpdatePerson(data, person){
      try{
        await axios.put(`http://127.0.0.1:8000/api/v1/womenupdate/${person.id}/`,data, {headers: {"Authorization" : `Bearer ${this.$localStorage.get('access')}`}})
      }
      catch (e){
        if (e.response.status === 401){
          this.error_authorize = true
        }
      }
    },
    async AxiosPrevNext(url, index){
      if (index === undefined){
        try{
          const response = await axios.get(url);
          this.women = response.data.results;
          this.next = response.data.next;
          this.prev = response.data.previous;
        }
        catch (e){
          console.log('Error Data');
        }
      }
      else{
        try{
          const response = await axios.get(url + `?offset=${index * this.women.length}`);
          this.women = response.data.results;
          this.page = index;
        }
        catch (e){
          console.log('Error Data');
        }
      }
    },
    async AxiosLoadingLine(url=this.next){
      try{
        const response = await axios.get(url)
        this.women = [...this.women, ...response.data.results]
        this.next = response.data.next
        this.page += 1
        }
      catch (e){
        console.log('Error Data');
      }
    },
    async AxiosPerson(){
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/womenlist');
        this.women = response.data.results;
        this.count = response.data.count;
        this.next = response.data.next;
        this.count_list = Math.ceil(this.count / this.women.length)
      }
      catch (e){
        console.log('Error Data');
      }
    },
    async AxiosPostPerson(data){
      try{
        await axios.post('http://127.0.0.1:8000/api/v1/womenlist', data, {headers: {"Authorization" : `Bearer ${this.$localStorage.get('access')}`}});
        await this.AxiosPerson()
      }
      catch (e){
        if (e.response.status === 401){
          this.error_authorize = true
        }
      }
    },
    async AxiosLikePerson(id, like){
      try{
        if (like.includes(this.$localStorage.get('id'))){
          await axios.patch(`http://127.0.0.1:8000/api/v1/womenrelationupdate/${id}/`,{'like': false} ,{headers: {"Authorization" : `Bearer ${this.$localStorage.get('access')}`}});
          let index = like.indexOf(this.$localStorage.get('id'))
          like.splice(index,1)
        }
        else{
          await axios.patch(`http://127.0.0.1:8000/api/v1/womenrelationupdate/${id}/`,{'like': true} ,{headers: {"Authorization" : `Bearer ${this.$localStorage.get('access')}`}});
          like.push(this.$localStorage.get('id'))
        }
      }
      catch (e){
        if (e.response.status === 401){
          try{
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {'refresh': this.$localStorage.get('refresh')})
            this.$localStorage.set('access', response.data.access)
            this.AxiosLikePerson(id, like)
          }
          catch (e){
            this.$localStorage.remove('access')
            this.$localStorage.remove('refresh')
            this.$localStorage.remove('username')
            this.$localStorage.remove('first_name')
            this.$localStorage.remove('last_name')
            this.$localStorage.remove('email')
            this.$localStorage.remove('id')
            this.$localStorage.set('verify', true)
            location.reload()
          }
        }
      }
    },
    async AxiosVerifyAccess(){
      try{
        await axios.post('http://127.0.0.1:8000/api/token/verify/', {'token': this.$localStorage.get('access')});
      }
      catch (e){
        if (e.response.status === 401){
          try{
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {'refresh': this.$localStorage.get('refresh')})
            this.$localStorage.set('access', response.data.access)
          }
          catch (e){
            if (e.response.status === 401){
              this.$localStorage.remove('access')
              this.$localStorage.remove('refresh')
              this.$localStorage.remove('username')
              this.$localStorage.remove('first_name')
              this.$localStorage.remove('last_name')
              this.$localStorage.remove('email')
              this.$localStorage.remove('id')
              this.$localStorage.set('verify', true)
              location.reload()
            }
          }
          // finally {
          //   location.reload()
          // }
        }
      }
    }
    // search_list(event){
    //   this.women.filter((item) => item['name'].includes(event.target.value))
    // },
  },
  mounted() {
    this.AxiosPerson();
    this.AxiosVerifyAccess();
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    // }
    // const callback = (entries) => {
    //     if (entries[0].isIntersecting && this.count_list !== this.page){
    //       this.AxiosLoadingLine(this.next)
    //     }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)
  },
  // beforeUpdate() {
  //   if (this.$localStorage.get('verify')){
  //     this.error_authorize = true
  //   }
  // },
  updated() {
    if (this.$localStorage.get('verify')){
      this.$router.push('/login')
      // this.error_authorize = true
      this.$localStorage.set('verify', false)
    }
  },
  components: {
    NameApp,
    FormApp,
    // PrevNext,
    // PaginationList,
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
  .observer{
    width: 100%;
    height: 50px;
  }
  .error_authorize{
    position: fixed;
    top: 160px;
    left: 0;
    color: red;
    background-color: rgba(255,255,255,0.7);
    font-size: 20px;
  }
</style>