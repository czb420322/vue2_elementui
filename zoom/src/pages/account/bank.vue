<template>
  <div class="bank">
    <v-header :title="{ name: '银行卡' }"></v-header>
    <div :style="{ 'margin-top': ($iosSystem + 60) + 'px' }">
      <article>
        <div class="content-box"> 
         <div class="content_grid">
            <p class="grid_name">{{list.bankName}}</p>
         </div>
          <div class="txt">
            <p class="dot">···· ···· ···· </p>
            <p class="txt_name">{{ list.bankNo | bank}}</p>
            </div>
        </div>
        <van-cell-group>
          <van-cell title="卡号" :value="list.bankNo | bankHide" />
          <van-cell title="银行名" :value="list.bankName" />
          <van-cell title="开户行行名" :value="list.openingBank" />
          <van-cell title="开户行行号" :value="list.mbankNo" />
        </van-cell-group>
        <div class="upd_bt" @click="goPage('updBank')">修改银行卡</div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:{},
    };
  },
  created() {
    this.getInit()
  },
  mounted () {
  },
  methods: {
    skip(){

    },
    async getInit() {
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if (res.code === 0 && res.content) {
        this.list = res.content || {}
      }
    },
  }
};
</script>
<style lang="less" scoped>
.bank {
  margin-top: 45px;
  header {
    display: flex;
    justify-content: space-evenly;
    padding: 1.3rem;
    font-size: 0.9rem;
    font-weight: 500;
  }
  article {
    .content-box {
      background: rgba(2,82,255,0.6);
      margin: 18px;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      height: 110px;
      .content_grid{
        display: flex;
        padding: 10px 0 0 10px;
        .grid_name{
          margin: 0;
          padding-left: 4px;
        }
      }
    }
    .txt {
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .dot{
        font-size: 30px;
        padding: 0 10px 0 0;
        margin: 0;
      }
      .txt_name{
        padding: 0;
        margin: 0;
      }
    }
  }
  .upd_bt{
    text-align: center;
    background: #0252ff;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    margin: 20%;
    color: #fff;
  }
}
</style>