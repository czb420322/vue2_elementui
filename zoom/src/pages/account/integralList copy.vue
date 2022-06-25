<template>
  <div class="integralList" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }" >
    <div>
      <v-header :title="{ name: '积分' }"></v-header>
      <van-sticky :offset-top="$iosSystem + 45">
        <div class="tabs-box">
          <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
            <van-tab v-for="(item,index) in tab" :key="index" :title="item.orderTypeName"></van-tab>
          </van-tabs>
        </div>
      </van-sticky>
      <div style="margin-top: 15px;">
        <van-cell title="单元格" label="描述信息" :key="index" v-for="(item,index) in tab[tabActive].items" >
          <template #title>
            <div class="title-bar">
              <div>
                <span>{{item.activityName}}</span>
                
              </div>
              <span class="withdrawal_sign">{{item.manyActivity}}</span>
            </div>
          </template>
          <template #label>
            <div class="label-bar">
              <span>有效时间：{{item.startDate}} - {{item.endDate}}</span>
            </div>
          </template>
        </van-cell>
      </div>
      <my-empty description="查询无数据" v-show="!tab[tabActive].items.length"></my-empty>
    </div>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
      agentCode: localStorage.getItem('agentCode'),
      tab: [
        {
          "orderType": "0",
          "orderTypeName": "常规任务",
          "items": [],
          isLoad: false
        },
        {
          "orderType": "1",
          "orderTypeName": "每日任务",
          "items": [],
          isLoad: false
        },
        {
          "orderType": "2",
          "orderTypeName": "每月活动",
          "items": [],
          isLoad: false
        },
        
      ],
      tabActive: 0,
      isLogin: '',
      orderType: '',
      reviewCode:'',
    };
  },
  created() {
    this.reviewCode = this.$route.query.reviewCode
    this.queryOrderList();
  },
  methods: {
    onClick(){
       this.queryOrderList();
    },
    async queryOrderList() {
      var activityType ='A'
        if(this.tabActive == 0){
          activityType = 'A'
        }else if(this.tabActive == 1){
          activityType = 'B'
        }else if(this.tabActive == 2){
          activityType = 'C'
        }
        this.isLogin = true;
        const res = await this.$axios({
          url: this.$API.API_MY_POINTASK,
          method: 'post',
          baseURL: 'false',
          data: {
            'agentCode': this.agentCode,
            'activityType':activityType,
          }
        });
        if (res.code === 0 && res.content.points) {
          this.tab[this.tabActive].items = res.content.points
        }
    },
   
  }
};
</script>

<style lang="less" >
@import './../../assets/less/app/account/integralList.less';
.details_txt{
    margin: 6px 18px;
}
</style>
