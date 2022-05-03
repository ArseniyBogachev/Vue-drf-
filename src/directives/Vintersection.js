export default {
    mounted(el, data){
        const options = {
          rootMargin: '0px',
          threshold: 1.0,
        }
        const callback = (entries) => {
            if (entries[0].isIntersecting){
              data.value.func()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    },
    name: 'intersection'
}

// data.value.count_list !== data.value.page