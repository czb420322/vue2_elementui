<template>
  <div class="information">
    <template >
      <div card class="information__card">
        <h3 class="buttons-tab information__title">
          {{common.title}}
        </h3>
      </div>
      <div card class="information__card">
        <div v-html="common.content"></div>
      </div>
    </template>
    <div class="information__empty"  v-show="isEmpty">
      <!-- <van-empty :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" description="暂无内容，敬请期待" image-size="110" /> -->
      <van-empty  description="暂无内容，敬请期待" image-size="110" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEmpty: false,
      common: '',
    }
  },
  created() {
    this.getSaveWxUserInfo();
  },
  methods: {
    // 获取公众号文章
    async getSaveWxUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_GETWEBPAGEBYCODE,
        method: 'post',
        data: {
          code: this.$route.query.code || ''
        }
      });
      if (res.code === 0 && res.content.data) {
        this.common = res.content.data
      } else {
        this.isEmpty = true
        this.$toast(res.content.resultMessage || '请求失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.information {
  min-height: 100vh;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 25px;
  background-color: #fff;
  font-size: 14px;
  .information__title {
    margin-top: 0;
    margin-bottom: 10px;
    padding: 10px 0;
    color: #969799;
    vertical-align: middle; 
    color: #323233;
    text-align: left;
  }
  .information__content {
    .information__content__title {
      margin: 0;
      padding: 6px 0;
    }
    .text {
      text-indent: 25px;
    }
  }
  .information__empty {
    height: 100vh;
    display: flex;
    justify-content: center;
  }
}
</style>