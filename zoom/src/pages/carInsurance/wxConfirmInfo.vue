<template>
  <div class="carBaseInfo carConfirmInfo">
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <span style="color: white" @click="goPage('carQuotedPrice')">报价</span>
      </template>
    </van-nav-bar>
    <ol class="content" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <li class="list">
        <div class="info-box">
          <div class="block">
            <van-cell center class="title_cell">
              <template #title>
                <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" />
                <span class="custom-title">车辆信息</span>
              </template>
            </van-cell>
            <van-row>
              <van-col span="7" class="name">车牌号</van-col>
              <van-col span="17" class="txt">{{ carInsureEntry.licenseName + carInsureEntry.licenseNo }}</van-col>
            </van-row>
            <van-row>
              <van-col span="7" class="name">品牌型号</van-col>
              <van-col span="17" class="txt">{{carTypeDTO.codeCode}}</van-col>
            </van-row>
          </div>
          <div class="van-hairline--top"></div>
          <div class="block">
            <van-row>
              <van-col span="7" class="name">车架号</van-col>
              <van-col span="17" class="txt">{{vehicleDTO.frameNo}}</van-col>
            </van-row>
            <van-row>
              <van-col span="7" class="name">发动机号</van-col>
              <van-col span="17" class="txt">{{vehicleDTO.engineNo}}</van-col>
            </van-row>
            <van-row>
              <van-col span="7" class="name">车辆型号</van-col>
              <van-col span="17" class="txt">{{carTypeDTO.codeName}}</van-col>
            </van-row>
            <van-row>
              <van-col span="7" class="name">注册日期</van-col>
              <van-col span="17" class="txt">{{vehicleDTO.enrollDate}}</van-col>
            </van-row>
            <van-row>
              <van-col span="7" class="name">车价</van-col>
              <van-col span="17" class="txt">{{tryCalculation.actualValue}}元</van-col>
            </van-row>
          </div>
        </div>
      </li>

      <li class="list" v-if="trialParams.caaInsuranceInputDTO" >
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" />
              <span class="custom-title">非车险</span>
            </template>
            <template #right-icon>
              <div class="price">
                <p class="presentPrice">￥{{trialParams.caaInsuranceInputDTO.totalPrice}}</p>
              </div>
            </template>
          </van-cell>

          <div class="block" style="padding-bottom: 0">
            <van-row>
              <van-col span="7" class="name">保险生效日期</van-col>
              <van-col span="17" class="txt right">{{trialParams.caaInsuranceInputDTO.accidentStartDate}} 00时</van-col>
            </van-row>
          </div>

          <ul class="table">
            <li class="tr header">
              <span class="project">保障项目</span>
              <span class="cost">保费(元)</span>
            </li>
            <li class="tr">
              <span class="project">{{trialParams.caaInsuranceInputDTO.productName}}</span>
              <span class="cost">{{trialParams.caaInsuranceInputDTO.totalPrice}}</span>
            </li>
          </ul>
        </div>
      </li>

      <li class="list" v-if="trialParams.compulsoryInsurance.prptitemkindList.length" >
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" />
              <span class="custom-title">交强险与车船税</span>
            </template>
            <template #right-icon>
              <div class="price">
                <p class="presentPrice">￥{{tryCalculation.sumPremiumCI + + tryCalculation.sumPayTax}}</p>
              </div>
            </template>
          </van-cell>

          <div class="block" style="padding-bottom: 0">
            <van-row>
              <van-col span="7" class="name">投保单号</van-col>
              <van-col span="17" class="txt right">{{$store.state.car.subProposalNo.c}}</van-col>
            </van-row>
            <van-row>
              <van-col span="7" class="name">保险生效日期</van-col>
              <van-col span="17" class="txt right">{{(VehicleInsurance.cImmeValiFlag ? VehicleInsurance.cImmeValidEndDate : $store.state.car.compulsoryInsuranceStartDate) | datehourFilter}}时</van-col>
            </van-row>
          </div>

          <ul class="table">
            <li class="tr header">
              <span class="project">保障项目</span>
              <span class="cost">保费(元)</span>
            </li>
            <li class="tr" v-for="(item,index) in tryCalculation.itemVOList" :key="index" v-show="item.kindCode == 'BZ'">
              <span class="project">{{item.kindName}}</span>
              <span class="cost">{{item.premium}}</span>
            </li>
            <li class="tr">
              <span class="project">车船税</span>
              <span class="cost">{{tryCalculation.sumPayTax || ''}}</span>
            </li>
          </ul>
        </div>
      </li>

      <li class="list" v-if="trialParams.commercialInsurance.prptitemkindList.length" >
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" />
              <span class="custom-title">商业险</span>
            </template>
            <template #right-icon>
              <div class="price">
                <p class="presentPrice">￥{{tryCalculation.sumPremiumBI}}</p>
              </div>
            </template>
          </van-cell>

          <div class="block" style="padding-bottom: 0">
            <van-row>
              <van-col span="7" class="name">投保单号</van-col>
              <van-col span="17" class="txt right">{{$store.state.car.subProposalNo.b}}</van-col>
            </van-row>
            <van-row>
              <van-col span="7" class="name">保险生效日期</van-col>
              <van-col span="17" class="txt right">{{(VehicleInsurance.bImmeValiFlag ? VehicleInsurance.bImmeValidEndDate : $store.state.car.commercialInsuranceStartDate) | datehourFilter}}时</van-col>
            </van-row>
          </div>

          <ul class="table">
            <li class="tr header">
              <span class="project">保障项目</span>
              <span class="quota">保额(元)</span>
              <span class="cost">保费(元)</span>
            </li>
            <li class="tr" v-for="(item,index) in tryCalculation.itemVOList" :key="index" v-show="item.kindCode != 'BZ'">
              <span class="project">{{item.kindName}}</span>
              <span class="quota" v-if="item.kindCode == '20Z1' || item.kindCode == '20Z2' || item.kindCode == '20Z3' || item.kindCode == '20Z4'">{{item.quantity}}次</span>
              <span class="quota" v-else >{{item.amount}}</span>
              <span class="cost">{{item.premium}}</span>
            </li>
          </ul>
          <!-- <div class="more van-hairline--top">展开更多保障&nbsp;
            <van-icon name="arrow-down" />
          </div> -->
        </div>
      </li>

      <li class="list">
        <div class="info-box">
          <div class="block">
            <van-cell center class="title_cell">
              <template #title>
                <van-icon :name="$CTXBASE + '/img/carInsurance/ic_info_men@2x.png'" size="22px" />
                <span class="custom-title">投保登记</span>
              </template>
            </van-cell>
            <div class="personnel">
              <div class="title_bar">{{carOwnerDTO.carOwner}}&nbsp;&nbsp;<span class="tag">车主</span></div>
              <van-row>
                <van-col span="7" class="name">证件号码</van-col>
                <van-col span="17" class="txt">{{carOwnerDTO.carOwnerIdNo}}</van-col>
              </van-row>
              <div class="van-hairline--top"></div>
              <div class="title_bar">{{applyInfoDTO.name}}&nbsp;&nbsp;<span class="tag">投保人</span></div>
              <van-row>
                <van-col span="7" class="name">证件类型</van-col>
                <van-col span="17" class="txt">身份证</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">证件号码</van-col>
                <van-col span="17" class="txt">{{applyInfoDTO.idNo | idNoConceal}}</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">手机号码</van-col>
                <van-col span="17" class="txt">{{applyInfoDTO.mobile | phoneConceal }}</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">地址</van-col>
                <van-col span="17" class="txt">{{applyInfoDTO.detailed_address}}</van-col>
              </van-row>
              <div class="van-hairline--top"></div>
            </div>
            <div class="personnel">
              <div class="title_bar">{{insureInfoDTO.name}}&nbsp;&nbsp;<span class="tag">被保人</span></div>
              <van-row>
                <van-col span="7" class="name">证件类型</van-col>
                <van-col span="17" class="txt">身份证</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">证件号码</van-col>
                <van-col span="17" class="txt">{{insureInfoDTO.idNo | idNoConceal}}</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">手机号码</van-col>
                <van-col span="17" class="txt">{{insureInfoDTO.mobile | phoneConceal}}</van-col>
              </van-row>
              <van-row>
                <van-col span="7" class="name">地址</van-col>
                <van-col span="17" class="txt">{{insureInfoDTO.detailed_address}}</van-col>
              </van-row>
            </div>
          </div>
        </div>
      </li>

      <div class="detailCheck mt12" @click.stop="check()">
        <van-checkbox v-model="checked">我已阅读并同意签署
          <!-- <router-link to="/carClause">《电子投保单》</router-link> -->
          <span class="detailCheck_span" @click.stop="goPage('carClause?current=b&orderNo='+$store.state.car.orderNo)" v-show="trialParams.commercialInsurance.prptitemkindList">《免责事项说明书》</span>
          <span class="detailCheck_span" @click.stop="goPage('carClause?current=c&orderNo='+$store.state.car.orderNo)">《车险条款》</span>
          <!-- <span class="detailCheck_span" @click.stop="goPage('carClause?current=d&orderNo='+propOrderDTO.orderNo)">《投保人须知》</span> -->
        </van-checkbox>
      </div>


    </ol>

    <footer class="footer_btn_bar">
      <div class="price_bar">
        <p class="price"><span>￥</span>{{((accidentInsurance.totalPrice || 0)*1 + (tryCalculation.sumPremiumCI || 0)*1 + (tryCalculation.sumPremiumBI || 0)*1 + (tryCalculation.sumPayTax || 0)*1).toFixed(2)}}</p>
      </div>
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="disabled" @click="onSubmit">确认投保</van-button>
    </footer>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
import idNoScan from './../../templates/idNoScan.vue';
import { mapState } from 'vuex'
import glutton from '../../assets/js/util/glutton';

export default {
  components: {
    idNoScan
  },
  data() {
    return {
      title: this.$route.meta.title,
      disabled: false,
      checked:false
    };
  },
  computed: {
    ...mapState({
      tryCalculation: state => state.car.tryCalculation,
      carInsureEntry: state => state.car.carInsureEntry,
      VehicleInsurance: state => state.car.VehicleInsurance,
      carTypeDTO: state => state.car.carTypeDTO,
      vehicleDTO: state => state.car.vehicleDTO,
      applyInfoDTO: state => state.car.applyInfoDTO,
      insureInfoDTO: state => state.car.insureInfoDTO,
      trialParams: state => state.car.trialParams,
      carOwnerDTO: state => state.car.carOwnerDTO,
      accidentInsurance: state => state.car.accidentInsurance
    })
  },
  created() {
    glutton.startRecording();  // 回溯录制
    //获取免责事项说明书是否签名（有值代表签名了）
    if (util.getSessionStorageObj("signature")) {
      this.checked = true;
    }

  },
  methods: {
    check() {
      if (util.getSessionStorageObj("signature")) {
        this.checked = true;
      }else if(this.trialParams.commercialInsurance.prptitemkindList){
        this.goPage('carClause?current=b&orderNo=' + this.$store.state.car.orderNo)
      }else{ //没有买商业险没有《免责事项说明书》所以直接跳《车险条款》
        this.goPage('carClause?current=c&orderNo=' + this.$store.state.car.orderNo)
      }
    },
    // 确认
    onSubmit() {
      if(!this.checked){
        this.$toast('请勾选免职说明书或车险条款')
        return;
      }
      this.disabled = true;
      this.$dialog.confirm({
        message: '是否上传影像，提高核保率？',
      })
        .then(() => {
          // on confirm
          this.disabled = false;
          this.goPage('wxDataUpload');
        })
        .catch(() => {
          // on cancel
          this.submitUnderWriting();
        });
    },
    // 核保
    async submitUnderWriting() {
      let res = await this.$store.dispatch("car/submitUnderWriting", { orderNo: this.$store.state.car.orderNo,share:true });
      this.disabled = false;
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
.right {
  text-align: right;
}
.carConfirmInfo{
  .detailCheck{
    margin:12px;
    font-size: .75rem;
    .detailCheck_span{
      color: #0894ec;
    }
  }
}

</style>
