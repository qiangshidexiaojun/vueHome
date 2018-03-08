import axios from 'axios';
import api from '../js/api.js';

// 导出一个全局的路由守卫对象
export default function (to, from, next) {

    /* 页面白名单，这三个页面不需要登录也能查看 */
    let whiteList = ["goodsList", "goodsDetail", "shopCart"];

    var pass = whiteList.some(v => v == to.name);
    if (pass) {
        next();
        return;
    } else {
        checkLogin();
    }

    function checkLogin() {
        axios.get(api.isLogin).then(res => {
            let isLogin = false;

            // 已登陆
            if (res.data.code == 'logined') {
                isLogin = true;
            }

            // 如果访问登陆页面
            // 已登陆 => 为了用户友好体验, 自动跳转到后台管理
            // 未登陆 => 允许访问登陆页面
            if (to.name == 'login') {
                if (isLogin) {
                    next({ name: 'admin' });
                } else {
                    next();
                }
            }

            // 如果访问后台页面
            // 已登陆 => 允许访问后台页面 
            // 未登陆 => 禁止访问, 自动跳转到登陆页面
            if (to.name != 'login') {
                if (isLogin) {
                    next();
                } else {
                    next({ name: 'login', query: { next: to.fullPath } });
                }
            }
        });
    }

};