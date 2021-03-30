export default {
    //判断对象是否为空
    isEmptyObject: function (obj) {
        for (var key in obj) {
            return false; //返回false，不为空对象
        }
        return true; //返回true，为空对象
    },
      // 动态改变数组对象中的key
    
    changeKey:function (arr, key) {
        let newArr = [];
        arr.forEach((item, index) => {
            let newObj = {};
            for (var i = 0; i < key.length; i++) {
                newObj[key[i]] = item[Object.keys(item)[i]]
            }
            newArr.push(newObj);
        })
        return newArr;
    },
};
import Vue from 'vue'
/*处理金额,保留两位小数*/
Vue.filter('formatMoney', function (value) {
    value = value == null ? 0 : value;
    return Number(Math.abs(value)).toFixed(2);
})
/*处理手机*/
Vue.filter('formatMobile', function (value) {
    if (!value) {
        return "请填写预留手机号";
    }

    if (value && value.length == 11) {
        return value.substr(0, 3) + " **** " + value.substr(7, 11);
    }
})
// 时间格式为2018.05.16 20:20
Vue.filter('formatTime', function (value) {
    console.log(value)
    var date = new Date(parseInt(value) * 1000)
    var tt = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + '  ' + [date.getHours(), date.getMinutes()].join(':');
    return tt;
})

