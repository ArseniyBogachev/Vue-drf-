import MainRouter from "@/pages/MainRouter";
import {createRouter, createWebHistory} from "vue-router"
import UserPage from "@/pages/UserPage";
import AboutRouter from "@/pages/AboutRouter";
import OpenPage from "@/pages/OpenPage";
import StorePage from "@/pages/StorePage";
import RegisterUser from "@/pages/RegisterUser";
import LoginUser from "@/pages/LoginUser";
import MeUser from "@/pages/MeUser";

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
    },
    {
        path: '/register',
        component: RegisterUser,
    },
    {
        path: '/login',
        component: LoginUser,
    },
    {
        path: '/user/:slug',
        component: MeUser,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router