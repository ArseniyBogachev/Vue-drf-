import axios from "axios";

export const postModule = {
    state: () => ({
        women:[],
        next: '',
        // prev: '',
        page: 1,
        count: Number,
        count_list: Number,
        selected_value: '',
        option_list: [
            {value: 'name', name: 'Name'},
            {value: 'age', name: 'Age'},
        ],
        search_value: '',
    }),
    getters: {
        sort_array(state){
          if (state.selected_value === 'name'){
            return [...state.women].sort((str1, str2) => (str1.name).localeCompare(str2.name))
          }
          else if (state.selected_value === 'age') {
            return [...state.women].sort((int1, int2) => int1.age - int2.age)
          }
          else {
            return state.women
          }
        },
        search_elem_array(state, getters){
          return getters.sort_array.filter((item) => item['name'].toLowerCase().includes(state.search_value.toLowerCase()))
        }
    },
    mutations: {
        setWomen(state, women) {
            state.women = women;
        },
        setNext(state, next) {
            state.next = next;
        },
        setPage(state, page) {
            state.page = page;
        },
        setCount(state, count) {
            state.count = count;
        },
        setList(state, count_list) {
            state.count_list = count_list;
        },
        setSelected(state, selected_value) {
            state.selected_value = selected_value;
        },
        setSearch(state, search_value) {
            state.search_value = search_value;
        },
    },
    actions: {
        async AxiosLoadingLine({state}){
          try{
            const response = await axios.get(state.next);
            state.women = [...state.women, ...response.data.results];
            state.next = response.data.next;
            state.page += 1;
            }
            catch (e){
              console.log('Error Data');
            }
        },
        async AxiosPerson({state}){
          try{
            const response = await axios.get('http://127.0.0.1:8000/api/v1/womenlist');
            state.women = response.data.results;
            state.count = response.data.count;
            state.next = response.data.next;
            state.count_list = Math.ceil(state.count / state.women.length)
          }
          catch (e){
            alert('Error Data');
          }
        },
    },
    namespaced: true,
}