import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components/UI';
import router from "@/router/router";
import list_directives from "@/directives/list_directives";
import store from "@/store";
import StoragePlugin from 'vue-web-storage';

const app = createApp(App)

components.forEach(component => app.component(component.name, component))
list_directives.forEach(directives => app.directive(directives.name, directives))

app
    .use(router)
    .use(StoragePlugin)
    .use(store)
    .mount('#app');
