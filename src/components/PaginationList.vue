<template>
  <div class="pagination_list">
      <ul v-for="(c,i) in count_list" v-bind:key="c">
        <li class="countList">
          <ButtonStyle
            v-bind:class="{ 'active': true }"
            v-on:click="$emit('AxiosPrevNext','http://127.0.0.1:8000/api/v1/womenlist', i)">
            {{ c }}
          </ButtonStyle>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props:{
    count_list: {
      type: Number,
    }
  },
  name: "PaginationList"
}
</script>

<style scoped>
  .pagination_list{
    display: flex;
    justify-content: space-between;
    width: 30px;
    height: 30px;
  }
  .countList{
    border: 1px solid black;
    width: 20px;
    height: 20px;
    text-align: center;
    list-style-type: none;
  }
  .active{
    color: white;
    background-color: black;
  }
</style>