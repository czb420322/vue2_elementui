<template>
  <div class="carBaseInfo carConfirmInfo carConfirmInsured">
    <!-- <v-header :title="{ name: title }"></v-header> -->
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <van-icon :name="ioc"  size="24"  @click="goPage('home')"/>
      </template>
    </van-nav-bar>
    <ol class="content" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <li class="list">
        <div class="info-box">
          <div class="block">
            <van-cell center class="title_cell">
              <template #title>
                <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/ic_info_men@2x.png'" size="22px" /> -->
              <van-icon name="manager-o" size="22px"/>
                <span class="custom-title">投保人信息</span>
              </template>
            </van-cell>
            <div class="personnel">
              <van-row>
                <van-col span="7" class="name">姓名</van-col>
                <van-col span="17" class="txt">{{applyInfoDTO.name}}</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">车牌号</van-col>
                <van-col span="17" class="txt">{{propOrderVehicleDTO.licenseNo}}</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">证件号码</van-col>
                <van-col span="17" class="txt">{{applyInfoDTO.idNo}}</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">手机号码</van-col>
                <van-col span="17" class="txt">{{applyInfoDTO.mobile}}</van-col>
              </van-row>
              <van-row v-if="policyCI">
                <van-col span="7" class="name">交强险起期</van-col>
                <van-col span="17" class="txt">{{getLocalTime(policyCI.startDate)}}至{{getLocalTime(policyCI.endDate)}}</van-col>
              </van-row>
              <van-row  v-if="policyBI">
                <van-col span="7" class="name">商业险起期</van-col>
                <van-col span="17" class="txt">{{getLocalTime(policyBI.startDate)}}至{{getLocalTime(policyBI.endDate)}}</van-col>
              </van-row>
            </div>
          </div>
        </div>
      </li>
      <li class="list">
        <div class="info-box">
          <div class="block">
            <van-cell center class="title_cell">
              <template #title>
                <div class="custom-title price">合计保费：￥{{propOrderDTO.orderAmount || 0}}<br>
                  <!-- 初始化时展示空 -->
                  <span v-if="!applyInfoDTO.idType"></span>
                  <span v-else-if="applyInfoDTO.idType =='0' && newManageCode !=='09000000'">您可以分享至{{payName}}进行支付，或截图{{payName}}扫码支付</span>
                  <span v-else-if="applyInfoDTO.cls == '4'">投保单已生成，请联系当地机构转线下支付</span>
                  <span v-else></span>
                </div>
              </template>
            </van-cell>
            <div class="personnel" v-show="applyInfoDTO.idType == '0'">
              <br>
              <div  v-if="newManageCode=='09000000'">
                <p style="padding:0 20px;margin-bottom:20px">请通过深保通短信提示进行付款，付款完成后会收到投保成功短信提示</p>
              </div>
              <div class="qcCode" v-else>
                <vue-qr class="icon" :logoScale="20" :text="shareUrl" :margin="0" :dotScale="1"></vue-qr>
                <a class="btn" @click="goShare">分享付款链接</a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import vueQr from 'vue-qr';
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import configJs from './../../config.js';
import idNoScan from './../../templates/idNoScan.vue';
import ioc from '../../assets/img/menu/home.png';
import glutton from '../../assets/js/util/glutton';

export default {
  components: {
    vueQr,
  },
  data() {
    return {
      newManageCode:"",
      ioc:ioc,
      number:0,
      orderNo:'',
      title: this.$route.meta.title,
      applyInfoDTO:{},//投保人信息
      propOrderVehicleDTO:{},//车辆信息
      propOrderDTO:{},//获取总保费
      policyBI:{},
      policyCI:{},//交强险与车船税
      shareUrl: '',
      payUrl:'',
      payName: ''
    };
  },

  created() {
    this.orderNo = this.$route.query.orderNo || ''
    if(this.orderNo != ''){
      this.getInit();
    }
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
    //查询订单详情
    async getInit() {
      const res = await this.$axios({
        url: this.$API.API_GETORDERDETAILS,
        method: "post",
        data: {
          orderNo: this.orderNo,
        },
      });
      if (res.code === 0 && res.content) {
        this.newManageCode = res.content.manageCode
        this.propOrderVehicleModelDTO = res.content.propOrderVehicleModelDTO
        this.policyBI = res.content.policyBI
        this.policyCI = res.content.policyCI
        this.applyInfoDTO = res.content.orderAppntDTO //投保人信息
        this.propOrderDTO = res.content.propOrderDTO
        this.propOrderVehicleDTO = res.content.propOrderVehicleDTO
        this.payName = res.content.propOrderPayInfoDTO && res.content.propOrderPayInfoDTO.payType == '01' ? '微信': res.content.propOrderPayInfoDTO.payType == '02' ? '支付宝' : ''
 
        // 回溯录制
        window.GluttonContext.traceNo = res.content.traceNo
        glutton.startRecording();
        setTimeout(()=>{
          glutton.stopRecording();
        },10000);
      }
    },
    //查询支付连接
    async getOrderDetail() {
      const res = await this.$axios({
        url: this.$API.API_GENERATEPAYMENTURL,
        method: 'post',
        data: {
          orderNo: this.orderNo,
          isWXPay:true
        }
      });
      if (res.code === 0) {
        this.payUrl = res.content.payUrl;
        this.shareUrl = `${configJs.config.http_base + configJs.config.ctx_base}/#/wxCarOrderDetail?orderNo=${this.orderNo}`;
      } else {
        this.$toast(res.message);
      }
    },
    getLocalTime(oldtime) {
      if(oldtime){
          var datejson = new Date(oldtime).toJSON();
          var date = new Date( + new Date(datejson)
                              + 8*3600*1000).toISOString().
                              replace(/T/g,' ').
                              replace(/\.[\d]{3}Z/,'')
              date = date.slice(0,10)
          return date;
      }else{
          return ''
      }
    },
    // 分享
    goShare() {
      if (this.payUrl) {
        common.goShare({
          shareTitle: "投保确认",
          shareText:'车险',
          shareImgUrl: require('../../assets/img/logo.png'),
          shareUrl: `${configJs.config.http_base + configJs.config.ctx_base}/#/wxCarOrderDetail?orderNo=${this.orderNo}`,
          // shareUrl: `http://localhost:8082/#/wxCarOrderDetail?orderNo=${this.orderNo}`,
        });
        this.$toast('请点击右上角进行分享');
      } else {
        this.$toast('等待确认');
      }
    },
    // 查询订单状态
    async queryOrderDetail() {
      const res = await this.$axios({
        url: this.$API.API_RETORDERINFO,
        method: 'get',
        loading: 'false',
        params: {
          orderNo: this.orderNo
        }
      });
      if (res.code === 0 && (res.content.orderStatus === '04' || res.content.orderStatus === '05' || res.content.orderStatus === '10')) {
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
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
.right {
  text-align: right;
}
</style>
