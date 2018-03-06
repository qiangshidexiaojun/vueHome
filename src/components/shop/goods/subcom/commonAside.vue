<template>
    <div class="left-220">
        <ul class="side-img-list">
            <li v-for="(item,index) in list" :key="item.id">
                <div class="img-box">
                    <label>{{index + 1}}</label>
                    <img :src="item.img_url">
                </div>
                <div class="txt-box">
                    <router-link :to="{name: 'goodsDetail',params: {id : item.id}}">{{item.title}}</router-link>
                    <span>{{item.add_time | filterTime('-')}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    /* 接收父组件传来的数据，可以直接当成属性使用了 */
  props: ['list'],
  filters: {
      filterTime(date,symbol){
          let newDate = new Date(date);
          return newDate.getFullYear() + symbol + newDate.getMonth() +symbol + newDate.getDate();
      }
  }
};
</script>

<style scoped>

</style>