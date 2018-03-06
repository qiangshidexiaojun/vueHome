<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <router-link to="">{{item.title}}</router-link>
                                            </dt>
                                            <dd>
                                                <router-link to="" v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}</router-link>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--轮播图-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel style="height:100%;">
                                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/轮播图-->

                    <!--公共右侧以抽成公共组件-->
                    <!-- 传送数组给子组件 -->
                    <app-aside :list="toplist"></app-aside>
                </div>
            </div>
        </div>
        <list-main></list-main>
    </div>
</template>

<script>
import appAside from "./subcom/commonAside.vue"
import listMain from "./main/ListMain.vue"
export default {
  data() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: []
    };
  },
  components: {
      appAside,
      listMain
  },
  methods: {
    getGoodsList() {
      this.$http.get(this.$api.goodsTop).then(res => {
        this.catelist = res.data.message.catelist;
        this.sliderlist = res.data.message.sliderlist;
        this.toplist = res.data.message.toplist;
      });
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style scoped lang="less">
.el-carousel__container {
  height: 343px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  /* 只需要将line-height修改成50px，文字就自动定位到下面了 */
  line-height: 50px;
  margin: 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.section .left-705{
    img{
        height: 100%;
    }
} 
</style>