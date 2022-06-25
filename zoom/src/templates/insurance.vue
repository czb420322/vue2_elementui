<template>
  <div class="insurance">
    <!-- 车险电子保单 -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '20%' }" closeable>
        <h4 style="text-align: center;margin: 16px;">分享查看保单</h4>
         <div class="carbox">
            <div class="carbox_git" @click="popupShareDownload(4)" v-if="policyCaaShare.shareUrl">
              <img src="./../../public/img/page/base/jiaqiangWD.png" alt="">
              <p>非车险</p>
            </div>
           <div class="carbox_git" @click="popupShareDownload(1)" v-show="carInsurance.ciPolicyUrl">
              <img src="./../../public/img/page/base/jiaqiangWD.png" alt="">
              <p>交强险</p>
           </div>
            <div class="carbox_git" @click="popupShareDownload(3)" v-show="carInsurance.ciPolicyFlagUrl">
               <img src="./../../public/img/page/base/biaozhi.png" alt="">
              <p>交强险保单标志</p>
           </div>
           <div class="carbox_git" @click="popupShareDownload(2)" v-show="carInsurance.biPolicyUrl">
               <img src="./../../public/img/page/base/wb.png" alt="">
              <p>商业险</p>
           </div>
         </div>
    </van-popup>
  </div>
</template>

<script>
import app from './../assets/js/util/app';
import configJs from './../config.js';
import common from './../assets/js/util/common';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      show: false,
      carInsurance:{//车险保单相关
        orderNo:'',
        licenseNo:'',//车牌号
        ciPolicyUrl:'',//交强险
        biPolicyUrl:'',//商业险
        ciPolicyFlagUrl:'',//交强险电子保单标志
      },
      policyCaaShare: {}, // 车加易电子保存单链接
      policyCaa:{},//请求接口用到的字段
      whetherState:1,//区分触发1车险和2非车险 3非车电子发票（默认车险1）
    };
  },
  computed:{
    ...mapState({
      manageVersion: state => state.common.manageVersion,
    })
  },
  methods: {
    parentMsg(status,orderNo,data,licenseNo) {
      this.whetherState = status
      this.policyCaa = data
      this.orderNo = orderNo || ''
      this.licenseNo = licenseNo || ''
      if(this.whetherState == 1){ //车险电子保单
        this.getCarGuaranteeSlip()
      }else if(this.whetherState == 2){ //非车电子保单
        this.noCar()
      }else if(this.whetherState == 3){//非车电子发票
        this.getElectronicInvoice()
      }
    },
    //获取非车电子发票
    async getElectronicInvoice(){
      const res = await this.$axios({
        url: this.$API.API_INVOICEQUERY,
        method: 'post',
        data: {
          'orderNo': this.orderNo,
          'plcyNo':this.policyCaa.policyNo
        }
      });
      if(res.code === 0 && res.content.resultCode == '1'){
        if(res.content.downloadUrl){
          app.goShare({
              shareTitle: '点击查看电子发票',
              shareText:this.policyCaa.pageData.insOrder.productName,
              shareImgUrl: this.policyCaa.pageData.productImageUrl,
              shareUrl: res.content.downloadUrl,
          });
        }
         
      }else{
        this.$toast(res.content.resultMessage || '电子发票请求失败');
      }
    },
    //获取下载电子保单路径(车险)
    async getCarGuaranteeSlip(){
      this.policyCaaShare = {} 
      let res = await this.$axios({
        url: this.$API.API_ELECPOLICY,
        method: 'get',
        params: {
          'orderNo': this.orderNo,
        }
      });
      // res = {"code":0,"message":"成功","content":{"result":"0","resultMessage":"获取电子保单链接成功!","getReportInfoDTO":null,"data":{"ciPolicyUrl":"https://rbt.guorenpcic.com/api/grsavecarcore/savecarcore/getElePolicyForGrecar?certiNo=MzT8tAIgG1zkHllyPj7Ityh0P4x4Px6w","ciPolicyFlagUrl":"https://rbt.guorenpcic.com/api/grsavecarcore/savecarcore/getElePolicyFlagForGrecar?certiNo=MzT8tAIgG1zkHllyPj7Ityh0P4x4Px6w","biPolicyUrl":"https://rbt.guorenpcic.com/api/grsavecarcore/savecarcore/getElePolicyForGrecar?certiNo=MzT8tAIgG1zKecOK%2B6qESjwgUTWedKJY"}}}

      //获取下载电子保单路径(非车险)
      if(this.policyCaa && this.policyCaa.policyNo){
        const res_policyCaa = await this.$axios({
          url: this.$API.API_RETLECPOLICYDOWNLOADURL,
          method: 'post',
          data: {
            policyNo: this.policyCaa.policyNo,
            orderNo: this.carInsurance.orderNo
          }
        });
        if (res_policyCaa.code === 0 && res_policyCaa.content.resultCode == '1') {
          // 车加意
          this.policyCaaShare = {
            shareUrl: res_policyCaa.content.downloadUrl || '',
          }
        }
      }
      //车险电子保单
      if (res.code === 0 && res.content.result == '0') {
        this.carInsurance.ciPolicyUrl = res.content.data.ciPolicyUrl || ''
        this.carInsurance.biPolicyUrl = res.content.data.biPolicyUrl || ''
        this.carInsurance.ciPolicyFlagUrl = res.content.data.ciPolicyFlagUrl || ''

        this.show = true
      }else{
          this.$toast(res.content.resultMessage);
      }
    },
    popupShareDownload(res) {
      this.show = false
      if(res == 1){
        common.goShare({
          shareTitle: '点击查看电子保单(交强险)',
          shareText:this.licenseNo,
          shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
          shareUrl: this.carInsurance.ciPolicyUrl,
        });
      }else if(res == 3){
        common.goShare({
          shareTitle: '点击查看交强险电子保单标志',
          shareText:this.licenseNo,
          shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
          shareUrl: this.carInsurance.ciPolicyFlagUrl,
        });
      }else if(res == 2){
        common.goShare({
          shareTitle: '点击查看电子保单(商业险)',
          shareText:this.licenseNo,
          shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
          shareUrl: this.carInsurance.biPolicyUrl,
        });
      }else if(res == 4){
        common.goShare({
          shareTitle: '点击查看电子保单',
          shareText: this.policyCaa.riskName || '',
          shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
          shareUrl: this.policyCaaShare.shareUrl || '',
        });
      }
      this.$toast.success('请点击右上角进行分享');
    },
    //非车险不需要弹窗直接调用此方法即可
     //获取电子保单（非车险）
    async noCar(){
      //获取下载电子保单路径(非车险)
      if(this.policyCaa.policyNo){
        const res = await this.$axios({
          url: this.$API.API_RETLECPOLICYDOWNLOADURL,
          method: 'post',
          data: {
            policyNo: this.policyCaa.policyNo,
            orderNo: this.carInsurance.orderNo,
          }
        });

        if (res.code === 0 && res.content.resultCode == '1') {
          if(res.content.downloadUrl){
            app.goShare({
              shareTitle: '点击查看电子保单',
              shareText:this.policyCaa.pageData.insOrder.productName,
              shareImgUrl: this.policyCaa.pageData.productImageUrl,
              shareUrl: res.content.downloadUrl,
            });
          }else{
            this.$toast('电子保单路径获取失败');
          }
        }else{
          this.$toast(res.content.resultMessage);
        }
      }
    },
  }
};
</script>
<style lang="less">
.insurance {
  .carbox {
    display: flex;
    justify-content: space-around;
    .carbox_git {
      text-align: center;
      font-size: 14px;
      flex: 1;
      img {
        width: 30px;
      }
    }
  }
}
</style>