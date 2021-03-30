# h5

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<!--h5项目开发注意点-->

<!--  所有页面请求接口统一放在api/api.js里面进行注册 -->

<!--  页面中请求接口统一使用async   await 方式（暂时参考 my.vue页面写法 ）  --> 

<!--  页面中的方法，变量，以及重要逻辑必须要有详细的备注，包括组件的编写也要写详细的备注信息（比如，在哪个个页面使用，注意点，以及各种状态值的意义） -->

<!--  页面代码进行格式化，要美观，看起来舒服 -->

## Reference
* If `npm install` run into error like `No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.` on OS X, try [this](https://stackoverflow.com/questions/60573595/npm-install-fails-on-node-gyp-rebuild-with-gyp-no-xcode-or-clt-version-detec).
