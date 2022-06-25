<template>
  <div class="page-group">
		<div class="page page-current">
      <v-header class="bar bar-nav" :title="{ name: '提交成功' }"></v-header>
      <div class="content kaoshi-page" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
        <div class="fetch_pass">
         <!-- 通过 -->
         <div class="fetch_div">
            <img class="passimg" src="./../../../public/img/account/tixiancg.png">
         </div>
          <div class="pass-txt">
            <div>您的提现已受理</div>
            <p>平台将在T+2个 工作日内完成兑现，届时请注意查收</p>
          </div>
          <div class="pass-btn" @click="toHome">
            <van-button type="info" block>返回</van-button>
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
       this.$router.go(-1);
      // this.$router.replace({path: '/home'});
    }
  }
};
</script>
<style lang="less" scoped>
.page{
  background: #fff;
}
.fetch_pass{
  text-align: center;
  margin: 0.5rem 0;
  .fetch_div{
      margin: 1rem 0;
  }
  .passimg{
    width: 20%;
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