<template>
  <div class="businessSet" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <v-header :title="{ name: '海报设置' }"></v-header>
    <div class="posterControl_box">
      <van-cell center title="是否显示手机号">
        <template #right-icon>
          <van-switch v-model="shareShowMobile" size="24" />
        </template>
      </van-cell>
      <van-cell center title="是否显示姓名">
        <template #right-icon>
          <van-switch v-model="shareShowName" size="24" />
        </template>
      </van-cell>
    </div>
    <div class="businessSet_bt">
      <van-button class="bt" type="info" size="small" @click="onSubmit()">确定</van-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      shareShowMobile: false,
      shareShowName: false
    }
  },
  computed: {
    ...mapState({
      UserInfoList: state => state.my.UserInfo
    })
  },
  async created() {
    await this.$store.dispatch('my/getUserInfo', true)
    this.shareShowMobile = this.UserInfoList.shareShowMobile != 1 ? true : false
    this.shareShowName = this.UserInfoList.shareShowName != 1 ? true : false
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios({
        url: this.$API.API_ACTIVITY_SWITCH,
        method: 'post',
        data: {
          shareShowMobile: this.shareShowMobile ? '0' : '1',
          shareShowName: this.shareShowName ? '0' : '1'
        }
      });
      if (res.code === 0 && res.content.result != '1') {
        this.$toast('提交成功');
        setTimeout(() => {
          this.onClickLeft();
        }, 1500)
      } else {
        this.$toast(res.content.resultMessage);
      }
    }
  }
}
</script>

<style  lang="less" scoped>
.businessSet {
  .posterControl_box {
    padding-top: 10px;
  }
  .businessSet_bt {
    position: fixed;
    bottom: 4%;
    left: 25%;
    width: 50%;
    .bt {
      width: 100%;
    }
  }
}
</style>
