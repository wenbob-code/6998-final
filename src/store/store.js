const TOKEN = 'token';
export default {

  // 存储token
  storeToken(value) {
    window.localStorage.setItem(TOKEN,value)
  },

  // 获取token
  getToken() {
    return JSON.parse(JSON.stringify(localStorage.getItem(TOKEN)));
  },

  // 删除token
  removeToken() {
    localStorage.removeItem(TOKEN);
  },

  



}