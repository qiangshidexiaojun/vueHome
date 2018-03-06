<template>
    <div class="comment-box">
        <!--取得评论总数-->
        <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="sendComments">
            <div class="avatar-box">
                <i class="iconfont icon-user-full"></i>
            </div>
            <div class="conn-box">
                <div class="editor">
                    <textarea id="txtContent" name="txtContent" v-model="commenttxt.commenttxt" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                    <span class="Validform_checktip"></span>
                </div>
                <div class="subcon">
                    <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                    <span class="Validform_checktip"></span>
                </div>
            </div>
        </form>
        <ul id="commentList" class="list-box">
            <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
            <li v-for="(item,index) in message" :key="index">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="inner-box">
                    <div class="info">
                        <span>{{item.user_name}}</span>
                        <span>{{item.add_time}}</span>
                    </div>
                    <p>{{item.content}}</p>
                </div>
            </li>
        </ul>
        <!--放置页码-->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageIndex" :page-sizes="[2, 4, 6, 8]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalcount">
            </el-pagination>
        </div>
        <!--/放置页码-->
    </div>
</template>

<script>
export default {
  data() {
    return {
      /* 分页 */
      page: {
        pageIndex: 1,
        pageSize: 2
      },
      /* 评论信息列表 */
      message: [],
      /* 评论内容 */
      commenttxt: {
        commenttxt: ""
      }
    };
  },
  /* 根据父亲传过来的值进行接收 */
  props: ["id"],
  methods: {
    /* 获取评论 */
    getCommentList() {
      let url = `${this.$api.commentList}goods/${this.id}?pageIndex=${
        this.page.pageIndex
      }&pageSize=${this.page.pageSize}`;
      this.$http.get(url).then(res => {
        if (res.data.status == 0) {
          this.message = res.data.message;
          this.page.totalcount = res.data.totalcount;
        }
      });
    },
    /* 发布评论 */
    sendComments() {
      let url = `${this.$api.comment}goods/${this.id}`;
      this.$http.post(url, this.commenttxt).then(res => {
        if (res.data.status == 0) {
          this.commenttxt.commenttxt = ""; // 成功后清空评论框
          this.getCommentList();// 成功后刷新评论列表
        }
      });
    },
    /* 总页数改变的时候 */
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getCommentList();
    },
    /* 当前页改变的时候 */
    handleCurrentChange(val) {
      this.page.pageIndex = val;
      this.getCommentList();
    }
  },
  created() {
    this.getCommentList();
  }
};
</script>

<style scoped>

</style>