<template>
  <div class="incomePage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }" >
    <div>
      <v-header :title="{ name: 'i钻' }"></v-header>
      <div style="margin-top: 15px;">
        <van-cell title="单元格" label="描述信息" :key="index" v-for="(item,index) in list" >
          <template #title>
            <div class="title-bar">
              <div class="title_grid">
                <span class="grid_name">i钻</span>
                <img class="grid_img" src="./../../../public/img/account/shilobj.png">
              </div>
               <!-- <div class="string" ></div> -->
              <span>{{item.incomeAmount > 0 ? item.incomeAmount : item.incomeAmount }}<div class="string_money" v-if="agentType == 2" ></div></span>
            </div>
          </template>
          <template #label>
            <div class="label-bar">
              <span>保单号：{{item.policyNo}}</span>
              <span>{{item.createDate}}</span>
            </div>
          </template>
        </van-cell>
      </div>
      <my-empty description="查询无数据" v-show="!list.length"></my-empty>
    </div>
  </div>
</template>

<script>
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
      tabActive: 0,
      isLogin: '',
      orderType: '',
      agentType:'',
      list:{}
    };
  },
  created() {
    this.agentType = this.$route.query.agentType
    if(this.agentType == 2){
       this.$toast('您已成为代理人'+'\n'+'您的i钻已转化为个人收入')
    }
    this.queryOrderList();
  },
  methods: {
    onClick(name, title) {
      this.queryOrderList();
    },
    async queryOrderList() {
        this.isLogin = true;
        const res = await this.$axios({
          url:this.$API.API_MY_SAIT,
          method: 'post',
          baseURL: 'false',
          data: {
            number: '2',
            'costType':'2',
            'withdrawalStatue':'2'
          }
        });
        if (res.code === 0 && res.content.date) {
          this.list = res.content.date
        // } else {
        //   this.$toast(res.message);
        }
    },

    // 查看详情
    gotoDetail(orderNo, productName) {
      console.info('gotoDetail:' + orderNo);
      this.$router.push({ name: 'orderDetail', params: { 'orderNo': orderNo, 'productName': productName } });
      //this.goPage('orderDetail',?orderNo='+orderNo+"&productName="+productName);
    }
  }
};
</script>

<style lang="less" scoped>
@import './../../assets/less/app/account/income.less';
.incomePage{
  .grid_img{
    margin: 0!important;
    display: block!important;
    height: 0.8rem!important;
  }
  .title_grid{
      display: flex;
      align-items: center;
  }
  .title-bar{
    display: flex;
    justify-content: space-between;
  }
  .label-bar{
    display: flex;
    justify-content: space-between;
  }
}

</style>
