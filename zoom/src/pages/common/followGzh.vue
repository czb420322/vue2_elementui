<template>
  <div class="followGzhPage">
    <div class="_content">
      <!-- <img :src="$CTXBASE + '/img/common/gzh.jpeg'" alt=""> -->
      <img :src="$CTXBASE + '/img/common/SZ_shengChanGzh.jpeg'" alt="">
      <p :style="{ 'opacity': loading ? '1' : '0' }" >已通过身份认证，长按关注【少儿疫苗常识与保障】微信公众号</p>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import common from '../../assets/js/util/common';
export default {
   data() {
    return {
      loading: false
    }
  },
  created() {
    this.getSaveWxUserInfo();
  },
  methods: {
    //微信关系绑定
    async getSaveWxUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_SAVEWXUSERINFO,
        method: 'post',
        data: {
          code: common.getUrlParam('code') || '',
          bindAgentCode: this.$route.query.agentCode || '',
          businessType: this.$route.query.businessType || '',
          agreementNo: this.$route.query.agreementNo || '',
          transcribeName: this.$route.query.transcribeName || '',
          transcribePhone: this.$route.query.transcribePhone || ''
        }
      });
      if (res.code === 0 && res.content.result === 0) {
        this.loading = true
      }else{
        this.$toast(res.content.resultMessage || '请求失败');
      }
    }
  }
};
</script>

<style lang="less">
.followGzhPage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ._content {
    width: 90%;
    img {
      display: block;
      width: 70%;
      margin: auto;
    }
    p {
      text-align: center;
      opacity: 0.8;
      color: red;
    }
  }
}
</style>