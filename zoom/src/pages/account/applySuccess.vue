<template>
  <div class="page-group">
		<div class="page page-current">
      <v-header class="bar bar-nav" :title="{ name: '提交成功' }"></v-header>
      <div class="content kaoshi-page" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
        <div class="pass">
         <!-- 通过 -->
          <img class="passimg" src="./../../../public/img/account/success.png">
          <div class="pass-txt">
            <div>正在创建执业证……</div>
            <p>您提交的资料我们已收到，正在加急为您申请代理人资质，申请成功后将在首页消息提醒通知您！</p>
          </div>
          <div class="pass-btn" @click="toHome">
            <van-button type="info" block>返回首页</van-button>
          </div>
        </div>
      </div>
		</div>
	</div> 
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 返回上个页面
    goback: function () {
      history.back();
    },
    toHome: function() {
      this.$router.replace({path: '/home'});
    }
  }
};
</script>
<style lang="less" scoped>
.page{
  background: #fff;
}
.pass{
  text-align: center;
  margin: 0.5rem 0;
  .passimg{
    width: 55%;
    display: block;
    margin: 0 auto;
  }
  .pass-txt{
    text-align: center;
    padding: 0 1.5rem;
    div{
      color: #666;
      font-size: 1rem;
    }
    p{
      margin: 0;
      font-size: 0.75rem;
      color: #999;
    }
  }
  .pass-btn{
    padding: 1rem 4rem;
  }
}
</style>