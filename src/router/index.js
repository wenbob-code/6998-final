import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index' // 首页
import user from '@/pages/user/user' // 个人中心入口页面
import login from '@/pages/login/login' // 登录页面
import signUp from '@/pages/signUp/signUp' // 登录页面
import homePage from '@/pages/homePage/homePage' // 个人中心页面


// 引入项目依赖组件
import { Icon, Button, Toast, Tab, Tabs, Swipe, SwipeItem, Checkbox, CheckboxGroup, Uploader, Stepper, Dialog, CountDown } from "vant";
Vue.use(Icon).use(Button).use(Toast).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Checkbox).use(CheckboxGroup).use(Uploader).use(Stepper).use(Dialog).use(CountDown)

Vue.use(Router);

Toast.setDefaultOptions({
    duration: 1000,
});

// 解决路由重复打印问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        // 路由重定向
        {
            path: "/",
            component: login,
            redirect: {
                name: "login"
            }
        },
        {
            path: "/index",
            name: "index",
            component: index,
            meta: {
                title: "Index",
                requireAuth: true
            }
        },
        {
            path: '/user/user',
            name: "user",
            component: user,
            meta: {
                title: "User",
                requireAuth: true
            }
        },
        {
            path: '/login',
            name: "login",
            component: login,
            meta: {
                title: "Login",
            }
        },
        {
            path: '/signUp',
            name: "signUp",
            component: signUp,
            meta: {
                title: "SignUp",
            }
        },
        {
            path: '/homePage',
            name: "homePage",
            component: homePage,
            meta: {
                title: "User Profile",
                requireAuth: true
            }
        },
    ]
});