<template>
  <div class="incomePage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }" >
    <div>
      <v-header :title="{ name: '收入明细' }"></v-header>
      <van-sticky :offset-top="$iosSystem + 45">
        <div class="tabs-box">
          <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
            <van-tab v-for="(item,index) in tab" :key="index" :title="item.orderTypeName"></van-tab>
          </van-tabs>
        </div>
      </van-sticky>

      <div style="margin-top: 15px;" v-if="tabActive === 0">
        <div :key="index" v-for="(item,index) in tab[tabActive].items">
            <van-cell title="单元格" label="描述信息" v-if="item.incomeAmount != 0 ">
              <template #title>
                <div class="title-bar">
                  <div>
                    <span>{{item.costType}}</span>
                    <span class="withdrawal_sign" v-show="item.withdrawalStatue != '待提现'">{{item.withdrawalStatue}}</span>
                  </div>
                  <span>{{item.incomeAmount}}</span>
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
       
      </div>
      
      <div style="margin-top: 15px;" v-if="tabActive === 1">
        <div  :key="index" v-for="(item,index) in tab[tabActive].items">
            <van-cell title="单元格" label="描述信息" v-if="item.incomeAmount != 0 ">
              <template #title>
                <div class="title-bar">
                  <div>
                    <span>{{item.costType}}</span>
                    <span class="withdrawal_sign" v-show="item.withdrawalStatue">{{item.withdrawalStatue}}</span>
                  </div>
                  <span>{{item.incomeAmount}}</span>
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
           
      </div>

       <div  style="margin-top: 15px;" v-if="tabActive === 2">
        <div class="deposit_box">
          <div class="deposit_wai">
              <div class="deposit_money">
                <p class="deposit_txt">当前可提现金额(元): </p>
                <p  class="deposit_bt">
                  <span  class="money_txt" style="color: red;">￥{{adjSum}}</span>
                    <van-button class="money_bt" plain color="#0252FF"  @click="skip()" type="primary" size="small ">去提现</van-button>
                </p>
                </div>
              <div class="deposit_money refer">
                <p class="deposit_txt"> 本月已提现金额(元): </p>
                <p  class="deposit_bt">
                    <span class="money_txt">￥{{currentMonth}}</span>
                    <van-button class="money_bt" plain color="#0252FF"  @click="reconciliation()" type="primary" size="small">对账单</van-button>
                </p>
              </div>
              <!-- <div class="deposit_money refer">
                <p class="deposit_txt"> 冻结金额(元): </p>
                <p  class="freeze">
                    <span class="money_txt">￥{{frozenMoney}}</span>
                    <img @click="reminder()" width="20" src="./../../../public/img/account/ask.jpg">
                </p>
              </div> -->
              <div class="reminder">
                <p>温馨提醒：根据国家税务局规定，当月提现超过8300元将缴纳个人所得税，详情请自行前往税务系统进行查看。</p>
              </div>
          </div>
         
            <van-cell title="单元格" label="描述信息" :key="index" v-for="(item,index) in tab[tabActive].items" @click="incomeTeamPopup(item)">
                <template #title>
                  <div class="title-bar">
                    <span>{{item.statusZh}}</span>
                    <span style="color:red">{{'￥' + item.afterTaxMoney}}</span>
                  </div>
                </template>
                <template #label>
                  <div class="label-bar">
                    <span>税前金额：{{item.preTaxMoney}}</span>
                    <span>{{timeTransition(item.applyTime)}}</span>
                  </div>
                </template>
            </van-cell>
        </div>
      </div>

      <van-popup v-model="incomeTeamShow" style="width:60%;border-radius: 8px;">
        <van-cell-group :title="reminderTxt">
          <div class="details_txt">
            {{popupTxt}}
          </div>
          <!-- <van-cell title="姓名" :value="popupTxt.agentName" />
          <van-cell title="手机" :value="popupTxt.agentMobile" :url="'tel:'+popupTxt.agentMobile" /> -->
        </van-cell-group>
      </van-popup>
      
      <my-empty description="查询无数据" v-show="tabActive !== 2 && !tab[tabActive].items.length"></my-empty>
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
      incomeTeamShow:false,
      reminderTxt:'失败原因',//提示语
      tab: [
        {
          "orderType": "0",
          "orderTypeName": "收入明细",
          "items": [],
          isLoad: false
        },
        {
          "orderType": "1",
          "orderTypeName": "消费明细",
          "items": [],
          isLoad: false
        },
        
      ],
      adjSum:0,//可提现金额
      currentMonth:0,//本月已提现金额
      frozenMoney:0,//冻结金额
      tabActive: 0,
      isLogin: '',
      orderType: '',
      reviewCode:'',
      popupTxt:'',
      withdrawDeposit:'N',//用户是否有发起中的提现，有的话禁止在提现（默认N没有Y有）
    };
  },
  created() {
    this.reviewCode = this.$route.query.reviewCode

     let tab = util.getSessionStorageObj('incomeTab');
    this.tabActive = tab || 0;
    util.removeSessionStorageObj('incomeTab');
    
    if(this.reviewCode == 4){
      this.tab.push(
           {
          "orderType": "2",
          "orderTypeName": "提现",
          "items": [],
          isLoad: false,
        }
      )
    }
    
    if(this.tabActive == 0){
      this.queryOrderList();
    }else{
        this.getAdj()
        this.depositList()
    }
  },
  methods: {
    reminder(){
      this.$dialog.alert({
        title: '提示',
        message: '车险投保的提现结算已起保日期为准，保单未起保时会先冻结。',
      })
      .then(() => {
        // on confirm
      })
       
    },
     incomeTeamPopup(res){
      if(res.status == '3'){
        this.reminderTxt ='失败原因'
        this.incomeTeamShow = true
        this.popupTxt = res.reason
      }else if(res.status == '5'){
        this.reminderTxt ='拒绝原因'
        this.incomeTeamShow = true
        this.popupTxt = res.reason
      }

    },
    onClick(name, title) {
      if(name == 2){
        this.getAdj()
        this.depositList()
      }else{
        this.queryOrderList();
      }
    },
    async queryOrderList() {
        this.isLogin = true;
        const res = await this.$axios({
          url: this.$API.API_MY_SAIT,
          method: 'post',
          baseURL: 'false',
          data: {
            number: '2',
            'costType':'123',
            'withdrawalStatue':`${this.tabActive}`
          }
        });
        if (res.code === 0 && res.content.date) {
          
          this.tab[this.tabActive].items = res.content.date
        // } else {
        //   this.$toast(res.message);
        }
    },
    //提现查询列表
    async depositList() {
        this.isLogin = true;
        const res = await this.$axios({
          url: this.$API.API_WITHDRAWAL_RECORDS,
          method: 'get',
          params: {
              'searchType': 'M',
              'verifyMoney':'n',
          }
        });
        if (res.code === 0 && res.content) {
          if(res.content.statisticsDTOList){
            this.tab[this.tabActive].items = res.content.statisticsDTOList[0].recordsList
          }
          this.withdrawDeposit = res.content.isWithdrawing
         
        } else {
          // this.$toast(res.message);
        }
    },
      //当前可提现查询金额
    async getAdj() {
        this.isLogin = true;
        const res = await this.$axios({
          url: this.$API.API_WITHDRAWAL_GETPAYABLETAXES,
          method: 'get',
        });
        if (res.code === 0 && res.content) {
          if(res.content.content != ''){
            this.adjSum = res.content.content.preTaxMoney || 0 //可提现金额
            this.currentMonth = res.content.content.monthSumPreTaxMoney || 0 //本月累计已提现金额
            this.frozenMoney = res.content.content.frozenMoney || 0
          }
        } else {
          this.$toast(res.message);
        }
    },
    reconciliation(){
       util.setSessionStorageObj('incomeTab', this.tabActive );
       this.$router.push({path:'/bill'})
    },
    skip(){ 
      if(this.adjSum < 100){
        this.$toast('您的可提现金额小于100不能提现');
      }else if(this.withdrawDeposit == 'Y'){
         this.$toast('您发起的提现正在审核中,请勿重复提交');
      }else{
         util.setSessionStorageObj('incomeTab', this.tabActive );
        this.$router.push({path:'/withdraw'})
      }
    },


    // 查看详情
    gotoDetail(orderNo, productName) {
      console.info('gotoDetail:' + orderNo);
      this.$router.push({ name: 'orderDetail', params: { 'orderNo': orderNo, 'productName': productName } });
      //this.goPage('orderDetail',?orderNo='+orderNo+"&productName="+productName);
    },
    timeTransition(res){
      if(res != undefined){
         var date = new Date(res); 
        return date.toJSON().substr(0, 19).replace('T', ' ');
      }
     
    },

  }
};
</script>q

<style lang="less" >
@import './../../assets/less/app/account/income.less';
.incomePage{
  .reminder{
    padding: 10px;
    font-size: 14px;
    color: #999;
    p{
      margin: 0;
    }
  }
  .details_txt{
      margin: 6px 18px;
  }
}

</style>
