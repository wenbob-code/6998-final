import axios from 'axios';
import qs from 'qs';
import config from '@/config/config';
import router from '../router'
import Vue from 'vue';
import { Toast, Loading  } from 'vant';
import storage from '@/store/store'

Vue.use(Toast).use(Loading);
/*
  * Request(): 请求后台数据，返回成功后，执行callback
  * url: 请求的半路径
  * params: { data：请求参数，methods：请求方式，callback：回调方法 }
*/
export const Request = (url = '', params = {}) => {
    let token = storage.getToken();
    
    // 获取请求公用参数
    params.data.token = token;
    params.data.clt = 'h5';
    params.data.sign = '70ffb548fc64ac1';

    // 不同的后台接口传不同的请求方式 以及和传参格式  将token设置在请求头中
    let contentType = 'application/x-www-form-urlencoded';
    let requestData = qs.stringify(params.data);
    if(params.type == 'json') {
        contentType = 'text/plain';
        requestData = JSON.stringify(params.data);
    }
    
    if (params.methods == 'GET') {
        return new Promise((resolve) => {
            // 加载提示
            // Toast.loading({
            //     message: '加载中...',
            //     loadingType: 'spinner',
            //     forbidClick: true,
            //     duration: '10000'
            // });
            axios.get(config.domainPath + url, {
                params: Object.assign(params.data, {
                    'clt': 'h5',
                    'sign': '70ffb548fc64ac1'
                })
            }).then((res) => {
                if (res.data.code == "4000") {
                    Toast(res.data.msg || '登录失败');
                    storage.removeToken();
                    this.$store.commit("change", true);
                    this.$store.commit("changeLoginStatus", false);
                }
                // Toast.clear();
                return resolve(res.data);
            }).catch(err => {
                // Toast.clear();
                console.log(err);
                return false;
            });
        });
    } else {
        return new Promise((resolve) => {
            // 加载提示
            // Toast.loading({
            //     message: '加载中...',
            //     loadingType: 'spinner',
            //     forbidClick: true,
            //     duration: '10000'
            // });
            axios({
                url: config.domainPath + url,
                method: 'post',
                data: requestData,
                headers: {
                    'Content-Type': contentType,
                }
            }).then(res => {
                if (res.data.code == "4000") {
                    Toast(res.data.msg || '登录失败');
                    storage.removeToken();
                    this.$store.commit("change", true);
                    this.$store.commit("changeLoginStatus", false);
                }
                if(res.data.code == "0000") {
                    // Toast.clear();
                    return resolve(res.data);
                }else {
                    return Toast(res.data.msg);
                }
            }).catch(err => {
                // Toast.clear();
                console.log(err);
                return false;
            })
        });
    }
};