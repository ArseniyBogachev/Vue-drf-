<template>
  <li>
    <NameItem v-bind:w="w" v-bind:i="i"/>
    <ButtonStyle
        type="button"
        v-on:click="$router.push(`/person/${w.id}`)">
        Open
    </ButtonStyle>
    <ButtonStyle
        type="button"
        v-on:click="$emit('display',w)">
        &#8595;
    </ButtonStyle>
    <ButtonStyle
        type="button"
        v-on:click="$emit('AxiosDeletePerson',w.id)">
        x
    </ButtonStyle>
<!--    <ButtonStyle v-if="w.like_true.includes(this.$localStorage.get('id'))" v-on:click="$emit('AxiosLikePerson', w.id, w.like_true)" class="like_active">Like {{w.like_true.length}}</ButtonStyle>-->
<!--    <ButtonStyle v-else v-on:click="$emit('AxiosLikePerson', w.id, w.like_true)" class="like_inactive">Like {{w.like_true.length}}</ButtonStyle>-->
    <ButtonStyle v-if="w.like_true.includes(this.$localStorage.get('id'))" v-on:click="$emit('AxiosLikePerson', w.id, w.like_true)" class="like_active">Like {{w.like_true.length}}</ButtonStyle>
    <ButtonStyle v-else v-on:click="$emit('AxiosLikePerson', w.id, w.like_true)" class="like_inactive">Like {{w.like_true.length}}</ButtonStyle>
    <p v-if="error_del">You don't have enough rights to delete the post.</p>
    <NameUpdate v-if="w.display" v-bind:w="w" v-on:update="doSomething"/>
  </li>
</template>

<script>
import NameUpdate from "@/components/NameUpdate";
import NameItem from "@/components/NameItem";
export default {
  data(){
    return{
    }
  },
  props: {
    w:{
      type: Object,
      required: true,
    },
    i: Number,
    error_del: {
      type: Boolean,
    }
  },
  name: "NameApp",
  components:{
    NameUpdate,
    NameItem,
  },
  methods:{
    doSomething(dict, person){
      this.$emit('update', dict, person)
    }
  }
}
</script>

<style scoped>
  li{
    border: 2px solid darkgrey;
    margin-top: 30px;
  }
  .like_active{
    background-color: red;
    color: white;
  }
  .like_inactive{
    background-color: white;
    color: black;
  }
</style>