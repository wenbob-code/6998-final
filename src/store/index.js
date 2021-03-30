
import Vue from 'vue';
import Vuex from 'vuex';
import Store from '@/store/store';
Vue.use(Vuex);


let flag = false;
if(Store.getToken() && Store.getToken().length > 0) {
  flag = true;
}
const store = new Vuex.Store({
  
  state: {
    showLogin:false,        // 是否显示登录弹窗
    isLogin: flag,          // 用户是否登录(判断缓存是否存在)
    number:0,               //购物车数量
  },

  mutations: {

    // 显示登录弹窗
    showLoginModal (state,value) {
      state.showLogin = value
    },

    // 更新用户登录状态
    changeLoginStatus(state,value) {
      state.isLogin = value
    },
    
    setCartNum(state,num){
      state.number=num;
    }
  }

});



 
export default store;
