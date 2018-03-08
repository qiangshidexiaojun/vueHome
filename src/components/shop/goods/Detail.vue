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
                            <!-- 商品放大镜 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in top.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>

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
                                                <el-input-number size="mini" :min="0" :max="top.goodsinfo.stock_quantity" v-model="num"></el-input-number>
                                                库存
                                                <em id="commodityStockNum">{{top.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button class="add" @click="addCart">加入购物车</button>
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
import "@/lib/imgzoom/css/magnifier.css";
import "@/lib/imgzoom/js/magnifier.js";
import $ from "jquery";

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
      /* 数量 */
      num: 1
    };
  },
  methods: {
    /* 获取商品详情列表 */
    getDetailData() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        }
      });
    },
    addCart(){
        this.num = this.num + (this.$store.state.cart[this.id] || 0)
        this.$store.commit("cartData",{id: this.id,num: this.num});
        this.num = 0;
    }
  },
  /* 监听url地址的值 */
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getDetailData();
    },
    top() {
      // 监听放大镜图片数据的变化, 变化后重新调用插件初始化方法
      var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 370, //承载容器宽
        height: 370, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 5 //缩放比例
      };
      // 调用这个插件的方法, 必须保证放大镜相关的DOM节点都已经正常构建并渲染,
      // 但是我们的节点里面有个v-for动态生成列表, 调用该方法时不能保证列表已经构建完毕, 所以延时一下
      setTimeout(function() {
        var _magnifier = $().imgzoon(magnifierConfig);
      }, 100);
    }
  },
  created() {
    this.getDetailData();
  }
};
</script>

<style scoped>

</style>