<template>
  <div class="accountSafety" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <div>
      <van-nav-bar title="账户与安全" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
      <div class="accountSafety-box">
        <van-cell title="修改密码" is-link to="changePassword" />
        <!-- <van-cell :border="false" title="账号注销" is-link @click="logOffDialog" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      iDrill: state => state.my.iDrill,
    })
  },
  created() {
  },
  methods: {
    developing() {
      this.$toast('功能开发中，敬请期待！');
    },
    // 账号注销
    logOffDialog() {
      //如果该账户有i钻就不让用户注销
      if(this.iDrill > 0){
        this.$toast('尚有未提取i钻，无法注销账户！');
        return;
      }
      this.$dialog.confirm({
        title: '注销',
        message: '您确定要注销当前用户吗？',
      }).then(() => {
        // on confirm
        this.logOff();
      }).catch(() => {
        // on cancel
      });
    },
    // 账号注销
    async logOff() {
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_LOGOUT,
        method: 'get'
      });
      this.$toast(res.content.resultMessage || '请求失败');
      if (res.code == 0 && res.content.result == 0) {
        localStorage.clear();
        sessionStorage.clear();
        setTimeout(() => {
          this.goPage('login');
        }, 1200)
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app.iosSystem .accountSafety .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .accountSafety .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 1;
}
.accountSafety{
  .accountSafety-box{
    padding-top: 10px;
  } 
}
</style>
