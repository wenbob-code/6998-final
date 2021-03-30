const fs = require("fs")

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: fs.readFileSync("./src/style/skin.scss", "utf-8")
            }
        }
    },
    // 选项...
    // devtool: 'eval-source-map',//开发调试
    devServer: {
        port: 8088,
        open: true, //浏览器自动打开页面
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        https: false,
        hotOnly: false, //热更新（webpack已实现了，这里false即可）
        proxy: {
            '/jic-trade': { //代理api
                target: "http://139.219.139.170:8087", //服务器api地址
                changeOrigin: true, //是否跨域
                pathRewrite: { //重写路径
                    "^/jic-trade/": '/jic-trade/'
                }
            },
            '/jic-product': { //代理api
                target: "http://139.219.139.170:8087", //服务器api地址
                changeOrigin: true, //是否跨域
                // pathRewrite: { //重写路径
                //     "^/jic-product/": '/jic-product/'
                // }
            },
            '/jic-order': { //代理api
                target: "http://139.219.139.170:8087", //服务器api地址
                changeOrigin: true, //是否跨域
                // pathRewrite: { //重写路径
                //     "^/jic-product/": '/jic-product/'
                // }
            },
            '/jic-member': { //代理api
                target: "http://139.219.139.170:8087", //服务器api地址
                changeOrigin: true, //是否跨域
                // pathRewrite: { //重写路径
                //     "^/jic-product/": '/jic-product/'
                // }
            },
        }
    },
}