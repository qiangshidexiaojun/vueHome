import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/account/login/Login.vue"//引入登录组件

import Shop from "../components/shop/Shop.vue"//引入商城组件
import GoodsDetail from "../components/shop/goods/Detail.vue"//引入商品详情组件
import GoodsList from "../components/shop/goods/List.vue"//引入商品列表组件
import OrderComplete from "../components/shop/order/Complete.vue"//引入订单完成组件
import OrderPay from "../components/shop/order/Pay.vue"//引入订单支付组件
import OrderSite from "../components/shop/order/Site.vue"//引入订单地址组件
import ShopCart from "../components/shop/shopcart/Shopcart.vue"//引入购物车组件

Vue.use(Router)

let goods = [
  { name: "goodsDetail", path: 'goods/detail/:id', component: GoodsDetail },
  { name: "goodsList", path: 'goods/list', component: GoodsList }
];

let shopcart = [{
  name: "shopCart", path: 'shopcart', component: ShopCart
}];

let order = [
  { name: "orderPay", path: 'order/pay', component: OrderPay },
  { name: "orderSite", path: 'order/site', component: OrderSite },
  { name: "orderComplete", path: 'order/complete', component: OrderComplete }
];

export default new Router({
  routes: [
    { name: "login", path: "/login", component: Login },
    { name: "shop", path: "/shop", component: Shop, children: [...shopcart, ...goods, ...order] }
  ]
})
