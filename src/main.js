// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'//引入路由

import routerGuard from "./router/guard.js"
router.beforeEach(routerGuard)//启用路由守卫

import "./less/index.less"//引入全局样式
import "./assets/css/style.css"//引入样式

import axios from "axios";//引入axios类库
import api, { domain } from "./js/api.js"//加载变量

import Vuex from "vuex" //引入组件通信管理插件
import Cart from './store/cart.js' // 使用{}引入store实例，因为store是一个const变量，vuex



//引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = api;

Vue.use(ElementUI)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:new Vuex.Store(Cart),
  components: { App },
  template: '<App/>'
})
