<template>
  <div class="wxExclusive" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <v-header :title="{ name: '专属二维码' }"></v-header>
    <div class="img_box">
      <img :src="imgUrl" alt="" width="180">
    </div>
    <p class="box_txt"><span v-if="valueName">{{valueName}}(</span>{{transcribePhone}}<span v-if="valueName">)</span><span v-if="productName">{{productName}}</span> 的专属二维码</p>
    <p class="hit">长按图片可保存到手机进行分享和发送给朋友</p>
  </div>
</template>
<script>
import config from './../../config.js';
export default {
  data() {
    return {
      imgUrl:'',
      phone:'',
      productName:'',
      saleCode:'',
      agentCode:'',
      agentId:'',
      activityId:'',
      agentNameValue:'',
      agreementNoValue:'',
      valueName:'',
      transcribePhone:'',
      agencyName:'',
      //路径带过来带的决策单元相关(分享车险转录用到)
      car:'false',//是否分享转录车险 默认否
      codeCode:'',
      codeName:'',
      unitmainTenanceTypeOne:'',
      unitmainTenanceTypeOneName:'',
      unitmainTenanceTypeTwo:'',
      unitmainTenanceTypeTwoName:'',

    }
  },
  created() {
    this.phone = this.$route.query.phone || '';
    this.productName = this.$route.query.productName || '';
    this.saleCode = this.$route.query.saleCode || '';
    this.agentCode = this.$route.query.agentCode || '';
    this.agentId = this.$route.query.agentId || '';
    this.activityId = this.$route.query.activityId || '';
    this.agentNameValue = this.$route.query.agentNameValue || '';
    this.agreementNoValue = this.$route.query.agreementNoValue || '';
    this.valueName = this.$route.query.valueName || '';
    this.transcribePhone = this.$route.query.transcribePhone || '';
    this.agencyName = this.$route.query.agencyName || '';

    //路径带过来带的决策单元相关(分享车险转录用到)
    this.car = this.$route.query.car || 'false';
    this.codeCode = this.$route.query.codeCode || '';
    this.codeName = this.$route.query.codeName || '';
    this.unitmainTenanceTypeOne = this.$route.query.unitmainTenanceTypeOne || '';
    this.unitmainTenanceTypeOneName = this.$route.query.unitmainTenanceTypeOneName || '';
    this.unitmainTenanceTypeTwo = this.$route.query.unitmainTenanceTypeTwo || '';
    this.unitmainTenanceTypeTwoName = this.$route.query.unitmainTenanceTypeTwoName || '';

    this.getQRcode()
  },
  methods: {
    async getQRcode() {
      var appid = ''
      //判断分享转录的是否车险
      if(this.car == 'true'){
        var address = config.config.http_base + config.config.ctx_base + '/#wxCarInsurance?codeCode=' + this.codeCode+'&codeName='+this.codeName+'&unitmainTenanceTypeOne='+this.unitmainTenanceTypeOne+'&unitmainTenanceTypeOneName='+this.unitmainTenanceTypeOneName+'&unitmainTenanceTypeTwo='+this.unitmainTenanceTypeTwo+'&unitmainTenanceTypeTwoName='+this.unitmainTenanceTypeTwoName
      }else if(this.productName){ //如果有产品名称说明分享转录的是产品
        var address = config.config.http_base + config.config.ctx_base + '/#showProductDetail?saleCode=' + this.saleCode
      }else{
         appid = config.shenzhenzhuanban.sz_appid
        //否则分享转录的是深圳专版专用
        var address = config.config.http_base + config.config.ctx_base + '/#followGzh?saleCode=' + ''
      }
      var local = `${address}&phone=${this.transcribePhone}&transcribePhone=${this.transcribePhone}&agentCode=${this.agentCode}&agentId=${this.agentId}&activityId=${this.activityId}&businessType=${this.agentNameValue}&agreementNo=${this.agreementNoValue}&transcribeName=${this.valueName}&agencyName=${this.agencyName}`;
      
      const res = await this.$axios({
        url: this.$API.API_GENERATEQRCODEIMG,
        method: "post",
        data: {
          srcImgUrl: local,
          appId:appid
        },
      });
      if (res.code === 0 && res.content.result == '0') {
        this.imgUrl = res.content.data || '';
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    }


  }
}
</script>
<style lang="less">
.wxExclusive{
  .img_box{
    text-align: center;
    padding-top: 15%;
  }
  .box_txt{
    text-align: center;
    font-size: 16px;
  }
  .hit{
    font-size: 14px;
    text-align: center;
    color: #cc0000;
  }
}
</style>