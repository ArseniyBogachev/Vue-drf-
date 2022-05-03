import MainRouter from "@/pages/MainRouter";
import {createRouter, createWebHistory} from "vue-router"
import UserPage from "@/pages/UserPage";
import AboutRouter from "@/pages/AboutRouter";
import OpenPage from "@/pages/OpenPage";
import StorePage from "@/pages/StorePage";

const routes = [
    {
        path: '/',
        component: MainRouter,
    },
    {
        path: '/person',
        component: UserPage,
    },
    {
        path: '/about',
        component: AboutRouter,
    },
    {
        path: '/person/:id',
        component: OpenPage,
    },
    {
        path: '/store',
        component: StorePage,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router