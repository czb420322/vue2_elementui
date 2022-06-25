<template>
  <div class="confirmInsured">
    <v-header :title="{ name: '确认投保' }"></v-header>
    <div class="banner" :style="{ 'padding-top': ($iosSystem + 46) + 'px' }">
      <img class="img" src="./../../../../public/img/home/noCar/icon_03.png" alt="">
    </div>
    <ol class="content">
      <!-- 物流安全责任险——企业  任易驾·驾乘人员意外险GRMOBILE_MALL_SL041 GRMOBILE_MALL_SL044 GRMOBILE_MALL_SL045 GRMOBILE_MALL_SL046 GRMOBILE_MALL_SL077-->
      <li class="list" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'" >
        <h5 class="name van-hairline--bottom"><img class="icon" src="./../../../../public/img/home/confirmInsured/order_icon.png" alt="">投保人信息</h5>
        <div class="info-box"  >
          <p class="item"><span class="label">企业名称</span><span class="txt">{{pageData.applicant.enterprise || ''}}</span></p>
          <p class="item"><span class="label">证件类型</span><span class="txt">{{pageData.applicant.idType == '10' ? '统一社会信用代码' : ['0', '01'].includes(pageData.applicant.idType) ? '身份证' : '其他'}}</span></p>
          <p class="item"><span class="label">证件号码</span><span class="txt">{{pageData.applicant.idNo || ''}}</span></p>
          <p class="item"><span class="label">手机号码</span><span class="txt">{{appntInfo.mobile}}</span></p>
          <p class="item"><span class="label">保险生效日期</span><span class="txt">{{pageData.policyList[0].startDate || '' | transformDatesTimestamp() }}</span></p>
          <p class="item" v-if="pageData.insOrder.productName"><span class="label">产品名称</span><span class="txt">{{pageData.insOrder.productName}}</span></p>
        </div>
      </li>
      <li class="list" v-else >
        <h5 class="name van-hairline--bottom"><img class="icon" src="./../../../../public/img/home/confirmInsured/order_icon.png" alt="">投保人信息</h5>
        <div class="info-box"  >
          <p class="item"><span class="label">姓名</span><span class="txt">{{appntInfo.name || ''}}</span></p>
          <p class="item"><span class="label">证件类型</span><span class="txt">{{['0', '01'].includes(pageData.applicant.idType) ? '身份证' : appntInfo.idType == '16' ? '护照' : appntInfo.idType == '13' ? '军人证' : appntInfo.idType == '3' ? '异常身份证' : appntInfo.idType == '4' ? '出生证' : appntInfo.idType == '6' ? '身份证' : appntInfo.idType == '2' ? '户口本' : appntInfo.idType == '8' ? '其他' : appntInfo.idType == '9' ? '其它证件' : appntInfo.idType == '10' ? '统一社会信用代码' : appntInfo.idType == '20' ? '营业执照' :appntInfo.idType == '24' ? '身份证(港澳)' :appntInfo.idType == '15' ? '返乡证' :'' }}</span></p>
          <p class="item"><span class="label">证件号码</span><span class="txt">{{appntInfo.idNo}}</span></p>
          <p class="item"><span class="label">手机号码</span><span class="txt">{{appntInfo.mobile}}</span></p>
          <p class="item"><span class="label">保险生效日期</span><span class="txt">{{pageData.policyList[0].startDate || '' | transformDatesTimestamp() }}</span></p>
          <p class="item" v-if="pageData.insOrder.productName"><span class="label">产品名称</span><span class="txt">{{pageData.insOrder.productName}}</span></p>
        </div>
      </li>

      <li class="list van-hairline--top ">
        <div class="price_bar"><span class="name">合计保费</span><span class="price">￥{{sumPrem}}</span></div>
        <p v-if="pageData.insOrder.productName == '国任“三好生”学平险'" class="payTip">您可以长按识别二维码，或截图微信扫描进行支付</p>
        <p v-else class="payTip">您可以分享至微信完成支付，或截图微信扫描支付。</p>
        <div class="qcCode">
          <vue-qr class="icon" :logoScale="20" :text="shareUrl" :margin="0" :dotScale="1"></vue-qr>
          <a class="btn"  v-if="payUrl != ''&& pageData.insOrder.productName != '国任“三好生”学平险'" @click="goShare">分享付款链接</a>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import vueQr from 'vue-qr';
import util from '../../../assets/js/util/util';
import common from '../../../assets/js/util/common';
import configJs from './../../../config.js';
import compCheck from '../../../assets/js/util/comp-check';
import glutton from '../../../assets/js/util/glutton';

export default {
  components: {
    vueQr
  },
  data() {
    return {
      pageData: {
        insOrder: {
          productCode: ''
        },
        applicant: {
          idType: '',
          enterprise: '',
          taxpayerNo: ''
        },
      },
      payInfo: {},
      appntInfo: {},
      insuredInfoData: {},
      sumPrem: 0,
      payUrl: '',
      shareUrl: '',
      number: 0,
      orderNo: ''
    };
  },
  created() {
    this.orderNo = this.$route.query.orderNo || util.getSessionStorageObj('orderNo')
    this.getInit();
    this.getOrderDetail();

    // 查询订单状态
    window.getOrderType = window.setInterval(() => {
      this.number ++ ;
      if( this.number <= 9 ){
        this.queryOrderDetail();
      }
    }, 20000);
  },
  methods: {
    async getOrderDetail() {
      const res = await this.$axios({
        url: this.$API.API_ORDER_FINDORDERDETAILS,
        method: 'post',
        data: {
          insuranceOrderNo: this.orderNo
        }
      });
      if (res.resultCode === 0) {
        this.pageData = res.data[0] || {};
        this.appntInfo = res.data[0].applicant || {};
        this.sumPrem = res.data[0].insOrder.orderAmount || 0;
        // this.payUrl = res.data[0].payment && res.data[0].payment.payUrl;
        this.shareUrl = `${configJs.config.http_base + configJs.config.ctx_base}/#/wxOrderDetail?orderNo=${this.orderNo}`;

        // 回溯录制
        window.GluttonContext.traceNo = res.data[0].traceNo
        util.setSessionStorageObj('traceNo',res.data[0].traceNo)
        glutton.startRecording();
        setTimeout(()=>{
          glutton.stopRecording();
        },10000);
      } else {
        this.$toast(res.resultMsg);
      }
    },
    getInit() {
      if(util.getSessionStorageObj('appntInfo')){
        this.appntInfo = util.getSessionStorageObj('appntInfo');//投保人
      }
      this.sumPrem = util.getSessionStorageObj('sumPrem');
      this.payUrl = util.getSessionStorageObj('payUrl');
    },
    // 分享
    goShare() {
      if (this.payUrl) {
        common.goShare({
          shareTitle: "投保确认",
          shareText: this.pageData.insOrder.productName,
          shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
          shareUrl: `${configJs.config.http_base + configJs.config.ctx_base}/#/wxOrderDetail?orderNo=${this.orderNo}`,
        });
        this.$toast.success('请点击右上角进行分享');
      } else {
        this.$toast.success('等待确认');
      }
    },
    selectText (textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) { // ie
        const range = textbox.createTextRange()
        range.collapse(true)
        range.moveStart('character', startIndex)// 起始光标
        range.moveEnd('character', stopIndex - startIndex)// 结束光标
        range.select() // 不兼容苹果
      } else { // firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex)
        textbox.focus()
      }
    },
    // 查询订单状态
    async queryOrderDetail() {
      const res = await this.$axios({
        url: this.$API.API_ORDER_SELECTORDERDETAILS,
        method: 'post',
        loading: 'false',
        data: {
          orderNo: this.orderNo
        }
      });
      if (res.code === 0 && res.content.orderStatus === '已支付') {
        clearInterval(window.getOrderType);
        this.$toast.success('支付成功');
        setTimeout(() => {
          this.goPage('account');
        }, 1500);
      }else{
        if( this.number == 9){
          this.$toast('该笔订单支付目前还未完成，后续可到订单管理处进行查看。');
        }
      }
    }
  },
  // 销毁监听
  destroyed() {
    clearInterval(window.getOrderType);
  }
};
</script>

<style lang="less">
@import '../../../assets/less/app/home/confirmInsured.less';
</style>
