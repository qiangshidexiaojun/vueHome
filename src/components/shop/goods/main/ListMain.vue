<template>
    <div>
        <div class="section" v-for="item in list" :key="item.level1cateid">
            <!--子类-->
            <div class="main-tit">
                <h2>手机数码</h2>
                <p>
                    <a href="/goods/43.html">{{item.catetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="content in item.datas" :key="content.artID">
                            <router-link :to="{name: 'goodsDetail' ,params: {id: content.artID}}">
                                <div class="img-box">
                                    <img :src="content.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{content.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{content.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{content.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{content.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    getListMain() {
      this.$http.get(this.$api.goodsContent).then(res => {
        this.list = res.data.message;
      });
    }
  },
  created() {
    this.getListMain();
  }
};
</script>

<style scoped>

</style>