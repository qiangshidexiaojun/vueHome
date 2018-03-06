<template>
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">

                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{top.goodsinfo.title}}</h1>
                                <p class="subtitle">{{top.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{top.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{top.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{top.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <span class="stock-txt">
                                                <el-input-number size="mini" :min="1" :max="top.goodsinfo.stock_quantity" v-model="num"></el-input-number>
                                                库存
                                                <em id="commodityStockNum">{{top.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <!--选项卡-->
                        <el-tabs type="border-card">
                            <el-tab-pane label="图文信息">
                                <div v-html="top.goodsinfo.content"></div>
                            </el-tab-pane>
                            <el-tab-pane label="商品评论">
                                <comment :id="id"></comment>
                            </el-tab-pane>
                        </el-tabs>

                    </div>

                    <!--页面右边-->
                    <app-aside :list="top.hotgoodslist"></app-aside>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppAside from "./subcom/commonAside.vue";
import Comment from "./subcom/commonComment.vue";
export default {
  components: {
    appAside: AppAside,
    comment: Comment
  },
  data() {
    return {
      id: this.$route.params.id,
      top: {
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      },
      page: {
        pageIndex: 1,
        pageSize: 4
      },
      num: 1
    };
  },
  methods: {
    getDetailData() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        }
      });
    }
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getDetailData();
    }
  },
  created() {
    this.getDetailData();
  }
};
</script>

<style scoped>

</style>