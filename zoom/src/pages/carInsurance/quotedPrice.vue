<template>
  <div class="carQuotedPricePage">
    <v-header :title="{ name: title }"></v-header>
    <div class="quotedPriceContent">
      <div class="content_" ref="imageDom">
        <header class="quotation">
          <img class="logo" src="../../../public/img/login/logo.png" alt="">
          <h2>报价单</h2>
          <h2 class="quotation_txt">{{billcomeGroup}}</h2>
        </header>
        <ol>
          <li>车牌号码：{{quotedPrice.licenseNo}}</li>
          <li>厂牌型号：{{quotedPrice.codeCode}}</li>
          <li>车架号：{{quotedPrice.frameNo}}</li>
          <li>发动机号：{{quotedPrice.engineNo}}</li>
          <li>核定座位数（位）：{{quotedPrice.seatCount}}</li>
          <li>协商实际价值（元）：{{quotedPrice.actualValue}}</li>
          <li v-if="VehicleInsurance.switchChecked">上年交强出险次数：{{quotedPrice.trafficClaimNum || 0}}</li>
          <li v-if="VehicleInsurance.switchChecked1">上年商业出险次数：{{quotedPrice.commercialClaimNum || 0}}</li>
          <li v-if="VehicleInsurance.switchChecked">上年交强出险保费：{{quotedPrice.trafficClaimAmount || 0}}</li>
          <li v-if="VehicleInsurance.switchChecked1">上年商业出险保费：{{quotedPrice.commercialClaimAmount || 0}}</li>
          <li>车主姓名：{{quotedPrice.carOwner}}</li>
          <li>车主证件号码：{{quotedPrice.carOwnerIdNo}}</li>
          <li style="width: 100%" v-if="VehicleInsurance.switchChecked">交强险保险期限：{{quotedPrice.ciPeriod}}</li>
          <li style="width: 100%" v-if="VehicleInsurance.switchChecked1">商业险保险期限：{{quotedPrice.biPeriod}}</li>
          <li style="width: 100%">报价时间：{{quotedPrice.quotationTime}}</li>
        </ol>
        <table>
          <tr>
            <th colspan="3">交强险</th>
          </tr>
          <tr>
            <td>险别</td>
            <td>保额/限额（元）</td>
            <td>保费（元）</td>
          </tr>
          <template v-for="(item,index) in quotedPrice.riskList">
            <tr :key="index" v-if="item.riskCode == '0801'">
              <td>{{item.riskName}}</td>
              <td>{{item.riskAmount}}</td>
              <td>{{item.riskPremium}}</td>
            </tr>
          </template>
          <tr>
            <th colspan="3">商业险</th>
          </tr>
          <tr>
            <td>险别</td>
            <td>保额/限额（元）</td>
            <td>保费（元）</td>
          </tr>
          <template v-for="(item,index) in quotedPrice.riskList">
            <tr :key="index" v-if="item.riskCode == '0802'">
              <td>{{item.riskName}}</td>
              <td>{{item.riskAmount}}</td>
              <td>{{item.riskPremium}}</td>
            </tr>
          </template>
          <tr>
            <th colspan="3">意外险</th>
          </tr>
          <tr>
            <td>险别</td>
            <td>保额/限额（元）</td>
            <td>保费（元）</td>
          </tr>
          <template v-for="(item,index) in quotedPrice.riskList">
            <tr :key="index" v-if="item.riskCode != '0801' && item.riskCode != '0802'">
              <td>{{item.riskName}}</td>
              <td>{{item.riskAmount}}</td>
              <td>{{item.riskPremium}}</td>
            </tr>
          </template>
        </table>
        <ol>
          <li>
            <!-- 四川报价单分享不显示交强折扣率和商业折扣率 21000000 -->
            <template v-if="userInfo.manageCode != '21000000'">
              <p v-if="VehicleInsurance.switchChecked && quotedPrice.isShowStrong == '1'">交强折扣率：{{quotedPrice.ciSignDiscount}}</p>
              <p v-if="VehicleInsurance.switchChecked1 && quotedPrice.isShowBusiness == '1'">商业折扣率：{{quotedPrice.biSignDiscount}}</p>
            </template>
          </li>
          <li>
            <p v-if="VehicleInsurance.switchChecked">交强险保费：{{quotedPrice.ciPremium}}</p>
            <p v-if="VehicleInsurance.switchChecked">车船税：{{quotedPrice.taxActual}}</p>
            <p v-if="VehicleInsurance.switchChecked1">商业险保费：{{quotedPrice.biPremium}}</p>
            <p v-if="accidentInsurance.switchChecked">意外险保费：{{quotedPrice.acPremium}}</p>
            <p>保费合计：{{quotedPrice.orderAmount}}</p>
          </li>
        </ol>

        <p style="display: flex">
          备注：<span style="flex: 1">1、以上报价信息是根据您提供的资料而做的估算，仅供参考，最终投保险种及保费以保险单为准；<br>
            2、本次报价仅用于试算，不作为承保确认和索赔依据，且不构成保单的要约或承诺；<br>
            3、我司收到完整投保单前，本次报价不具有任何法律效力；<br>
            4、本次报价的有效期截至：{{quotedPrice.validity}}。
          </span>
        </p>
      </div>
    </div>
    <div class="quotedPrice" :style="{ 'margin-top': ($iosSystem + 56) + 'px' }">
      <img class="photo" :src="imgUrl" alt="">
      <div class="btn-box" v-show="imgUrl">
        <a class="btn share" @click="afterRead('share')">分享报价单</a>
        <a class="btn save" @click="afterRead('save')">保存相册</a>
      </div>
      <!-- <p class="txt">长按图片“分享”或“保存”图片</p> -->
    </div>
  </div>
</template>

<script>
import app from '../../assets/js/util/app'
import util from '../../assets/js/util/util'
import EventBus from '@/assets/js/util/EventBus'
import html2canvas from "html2canvas";
import compCheck from '../../assets/js/util/comp-check';
import { mapState } from 'vuex'
import glutton from '../../assets/js/util/glutton';

export default {
  data() {
    return {
      title: this.$route.meta.title,
      imgUrl: '',
      quotedPrice: {},
      billcomeGroup:''
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.my.UserInfo,
      orderNo: state => state.car.orderNo,
      accidentInsurance: state => state.car.accidentInsurance,
      VehicleInsurance: state => state.car.VehicleInsurance,
    })
  },
  created() {
    glutton.startRecording(); // 回溯录制
    this.getQuotedPrice()
    this.$store.dispatch('my/getUserInfo')
  },
  methods: {
    async getQuotedPrice() {
      const res = await this.$axios({
        url: this.$API.API_GETQUOTATIONINFO,
        method: 'post',
        data: {
          orderNo: this.orderNo
        }
      });
      this.billcomeGroup=res.content.data.billcomeGroup;
      if (res.code == 0 && res.content.result == 0) {
        this.quotedPrice = res.content.data
        // 是否显示商业险折扣率
        if (this.quotedPrice.isShowBusiness == '1') {
          this.dialogConfirm()
        }else{
          this.html2canvas()
        }
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    async dialogConfirm() {
      await this.$dialog.confirm({
        title: '是否显示商业险折扣率',
        confirmButtonText: '是',
        cancelButtonText: '否',
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
        this.quotedPrice.isShowBusiness = '0'
      });
      this.html2canvas()
    },
    html2canvas() {
      EventBus.$emit('GlobalLoadingTrigger', true);
      setTimeout(() => {
        html2canvas(this.$refs.imageDom).then(canvas => {
          // 转成图片，生成图片地址
          this.imgUrl = canvas.toDataURL("image/png"); //可将 canvas 转为 base64 格式
          EventBus.$emit('GlobalLoadingTrigger', false);
        });
      }, 200)
    },
    // 分享报价单
    goSharePoster(url) {
      app.goShare({
        shareImgUrl: url
      });
    },
    // 保存相册
    downloadPhoto(url) {
      app.downloadPhoto({
        PictureUrl: url,
        PictureName: '报价单'
      });
    },
    afterRead(type) {
      this.goCollectLog();
      EventBus.$emit('GlobalLoadingTrigger', true);
      var formdata = new FormData();
      let file = util.btof(this.imgUrl, Math.ceil(Math.random() * 10))
      formdata.append('file', file);
      formdata.append('fileGroup', 'SHARE'); //类型
      formdata.append('businessNo', this.orderNo); //订单号
      this.commonInstance.post(this.$API.API_CARUPLOADQM, formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        if (res.data.code == 0 && res.data.content.code == 0 && res.data.content.content && res.data.content.content[0] && res.data.content.content[0].fileUrl) {
          if (type == 'share') {
            this.goSharePoster(res.data.content.content[0].fileUrl);
            this.$toast('长按图片分享')
          } else if (type == 'save') {
            this.downloadPhoto(res.data.content.content[0].fileUrl);
            this.$toast('长按图片保存')
          }
        }
      }).catch(error => {
        EventBus.$emit('GlobalLoadingTrigger', false);
      });
    },
    // 埋点
    goCollectLog() {
      if (this.$store.state.renewedInsurance.car.renewalDetail.policyNo) {
        this.$store.dispatch('common/goCollectLog', {
          data: {
            eventId: "igr003",
            eventName: '报价单',
            puid: this.$store.state.renewedInsurance.car.renewalDetail.policyNo,
          },
          eventAttributes: {
            callStartTime: compCheck.transformDatesTimetamp() || ''
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
.quotation{
  position: relative;
}
.quotation_txt{
  position: absolute;
  top: -18px;
  right: 0;
}
</style>
