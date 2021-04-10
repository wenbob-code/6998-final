import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from './store/index'//引入store
import './style/common.css'
import 'vant/lib/index.css'
import utils from '@/utils/utils'
import '../static/icon/iconfont.css'
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
Vue.use(require("vue-cookies"));
Vue.use(vueSwiper)
Vue.use(ElementUI);
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.prototype.utils = utils
window.Vue = Vue;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")