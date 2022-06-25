<template>
  <div class="wihdaw">
    <div>
      <v-header :title="{ name: '提现' }"></v-header>
      <div class="withdraw" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
        <div class="withdraw_hai">
        </div>
        <div class="withdraw_pd">
              <div class="withdraw_box">
                  <van-cell class="withdraw_title" title="提现到银行"/>
               <!-- <div>提现到银行</div> -->
                <van-cell>
                   <div class="withdraw_details">
                       <div class="details_flex">
                           <img class="details_img" v-if="htp" :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+htp" alt="">
                           <img class="details_img" v-else src="./../../../public/img/account/yn.png">
                           <p class="details_bank" v-text="list.bankNo ? '（'+list.bankNo+'）' :''"></p>
                       </div>
                        <div class="details_money"><p class="details_money_name">未提现收入：</p><p>￥{{list.preTaxMoney}}</p></div>
                        <div class="details_money"><p class="details_money_name">税后可提金额：</p><p>￥{{list.afterTaxMoney}}</p></div>
                        <div class="details_money"><p class="details_money_name">本次扣税：</p><p>￥{{list.paidTaxes}}</p></div>
                   </div>
                   <div class="details_bt">
                       <van-button type="info" size="small" @click="goDeposit()">提现</van-button>
                   </div>
                   <div class="details_checked"> 
                       <van-checkbox v-model="checked" icon-size="24px"><div class="details_div"> 本人已阅读并同意<span class="details_protocol" @click="goPage('incomeTaxPdf')">《个人所得税扣缴申报管理办法（试行）》</span></div></van-checkbox>
                            
                   </div>
                  
                </van-cell>
            </div>
        </div>
          
          
      </div>
      
    
   

      <!-- <my-empty description="查询无数据" v-show="!tab[tabActive].items.length"></my-empty> -->
    </div>
  </div>
</template>

<script>
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
        checked:false,
        adjSum:0,//可提现金额
        list:{},
        bt:true,
        htp:''
     
     
    };
  },
  created() {
      this.withdrawGet()
  },
  methods: {
       //提现查询
    async withdrawGet() {
   
        const res = await this.$axios({
          url: this.$API.API_WITHDRAWAL_GETPAYABLETAXES,
          method: 'get',
        });
        if (res.code === 0 && res.content) {
            if(res.content.content != ''){
                this.list = res.content.content
                this.list.bankNo =  this.list.bankNo.slice(-4)
                if(this.list.bankType.indexOf('工商') != -1){
                    this.htp ='ICBC'
                }else if(this.list.bankType.indexOf('农业') != -1){
                    this.htp ='ABC'
                }else if(this.list.bankType.indexOf('中国银行') != -1){
                    this.htp ='BOC'
                }else if(this.list.bankType.indexOf('邮政') != -1){
                    this.htp ='PSBC'
                }else if(this.list.bankType.indexOf('建设') != -1){
                    this.htp ='CCB'
                }else if(this.list.bankType.indexOf('光大') != -1){
                    this.htp ='CEB'
                }else if(this.list.bankType.indexOf('招商') != -1){
                    this.htp ='CMB'
                }else if(this.list.bankType.indexOf('民生') != -1){
                    this.htp ='CMBC'
                }else if(this.list.bankType.indexOf('兴业') != -1){
                    this.htp ='CIB'
                }
            }
         
        } else {
          this.$toast(res.message);
        }
    },
    //提现
    async goDeposit() {
         
        if(!this.bt){
            return;
        }

        if(!this.checked){
             this.$toast('请勾选个人所得税扣缴申报管理办法');
             return;
        }
        this.bt =false

        const res = await this.$axios({
          url: this.$API.API_WITHDRAWAL_APPLYWITHDRAWAL,
          method: 'get',
        });
        if (res.code === 0 && res.content) {
            this.bt =true
            if(res.content.code == 1){
               this.$toast(res.content.message);
            }else{
               this.$router.replace({path: '/fetchSuccess'});
            }
         
        } else {
        //   this.$toast(res.message);
        }
    },
  

  
  }
};
</script>

<style lang="less" scoped>
.withdraw_hai{
    background-color: #0252ff;
    height: 44px;
}
    .withdraw_pd{
        padding: 0 0.75rem;
    }
    .withdraw_box{
            margin: auto;
            border-radius: 0.25rem;
            position: relative;
            z-index: 2;
            margin-top: -1.5rem;
            height: calc(100vh - 96px);
            background: #fff;
        .withdraw_title{
            font-weight: 600;
            font-size: 14px;
        }
        .withdraw_details{
            font-size: 14px;
            margin-bottom: 10px;
            .details_flex{
                display: flex;
                .details_img{
                    // width: 4rem;
                    height: 1.8rem;
                    margin: auto 0;
                }
                .details_bank{
                    font-weight: 600;
                    margin: auto 0;
                    color: #C3C3C3;
                }
            }
            .details_money{
                display: flex;
                font-weight: 600;
                p{ margin: 0;}
                .details_money_name{
                    width: 6rem;
                }
            }
        }
        .details_bt{
            text-align: center;
            height: 80px;
            line-height: 80px;
            color: #fff;
            border-top: 1px solid #ebedf0;
            .van-button--small{
                width: 4rem;
            }
        }
        .details_checked{
            font-size: 12px;
            .details_protocol{
                color: #0252ff;
            }
            .details_div{
                margin-left: 12px;
            }
           
        }
        .van-cell{
            //  height: calc(100vh);  
        }
    }
</style>
