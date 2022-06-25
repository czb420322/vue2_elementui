<template>
  <div class="accountHint accountHintPage">
    <van-popup v-model="show">
      <div class="content-text">
        <van-cell-group>
          <van-cell title="代理公司名称：永创达保险销售有限公司" />
          <van-cell :title="'代理资格证编号：' + (listData.credentialsNo || '')" />
          <van-cell :title="'合同编号：' + (listData.agentWorkNo || '')" />
          <van-cell title="永创达介绍：永创达销售是国任保险的全资子公司，经营范围主要是在全国区域范围内（港、澳、台除外）代理销售保险产品，代理人是和永创达签订协议的合法出单人员。" />
          <van-cell title="联系电话：0755-86170359" />
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      listData: {}
    };
  },
  methods: {
    parentMsg(state, listData) {
      this.getOwnInfo()
    },
    async getOwnInfo() {
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if (res.code === 0 && res.content) {
        this.listData = res.content || ''
        this.show = true
      } else {
        this.$toast(res.content.resultMessage || '查询失败！');
      }
    }
  }
};
</script>

<style lang="less">
.accountHint {
  .van-overlay {
    z-index: 10000000 !important;
  }
  .van-popup {
    z-index: 10000000 !important;
    width: 100vw;
    background: none;
    overflow: hidden;
  }
  .agent_btn {
    position: absolute;
    left: 45%;
    bottom: 5%;
    display: block;
    width: 10%;
    height: 9%;
  }
  .hint_txt {
    position: absolute;
    width: 70vw;
    left: 15vw;
    top: 24vh;
    font-size: 0.7rem;
    margin: 0 auto;
  }
  .content-text {
    width: 80%;
    margin: auto;
  }
}
</style>