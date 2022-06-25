<template>
  <div class="carOrderDetail" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <van-nav-bar :title="title" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="black" size="20" @click="onClickLeft" />
        </template>
        <template #right>
          <p style="color: black;font-size: 12px;" @click="carShowState()" v-if="propOrderDTO.orderStatus == '10'">电子保单</p>
          <!-- 07000000 上海分公司、01000000 北京分公司、09000000 深圳分公司、03000000 江苏分公司隐藏 -->
          <span class="van-nav-bar_right_title" v-if="propOrderDTO.orderStatus == '02' &&
                UserInfo.manageCode != '07000000' && 
                UserInfo.manageCode != '01000000' && 
                UserInfo.manageCode != '09000000' && 
                UserInfo.manageCode != '03000000'" @click="sendMobileVerificationCode">重发短信</span>
        </template>
      </van-nav-bar>
      <div class="carOrderDetail_box">
        <div class="carOrderDetail_order">
          <div class="carOrderDetail_order_mark">订单号{{propOrderDTO.orderNo}}</div>
          <div class="carOrderDetail_order_status" v-if="propOrderDTO.orderStatus == '02'">待付款</div>
          <div class="carOrderDetail_order_status" v-else-if="propOrderDTO.orderStatus == '01'">待核保</div>
          <div class="carOrderDetail_order_status" v-if="propOrderDTO.orderStatus == '04'">已承保</div>
          <div class="carOrderDetail_order_status" v-if="propOrderDTO.orderStatus == '07'">已终止</div>
        </div>
        <div class="carOrderDetail_list" :style="{ 'top': ($iosSystem + 90) + 'px' }">
          <van-collapse v-model="activeNames">
            <van-collapse-item class="carOrderDetail_item" title="车辆信息" name="1" icon="orders-o">
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">车牌号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.licenseNo | licenseNoConceal}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">品牌型号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleModelDTO.codeName}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">使用性质</div>
                <div class="carOrderDetail_list_grid_txt" v-if="propOrderVehicleDTO.maincarKindCode == 'H'">{{trucksUseNatureCode.value.text}}</div>
                <div class="carOrderDetail_list_grid_txt" v-if="propOrderVehicleDTO.maincarKindCode == 'M'">{{motorbikeUseNatureCode.value.text}}</div>
                <div class="carOrderDetail_list_grid_txt" v-else>{{useNatureCode.value.text}}</div>
              </div>  
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">车架号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.frameNo | frameNoConceal}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">发动机号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.engineNo | engineNoConceal}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">车辆型号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleModelDTO.codeCode}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">注册日期</div>
                <div class="carOrderDetail_list_grid_txt">{{getLocalTime(propOrderVehicleDTO.enrollDate)}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name" v-if="propOrderVehicleDTO.maincarKindCode == 'H'">核定载客数</div>
                <div class="carOrderDetail_list_grid_name" v-else>座位数</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleModelDTO.seatCount}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">车价</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.actualValue || 0}}元</div>
              </div>
              <div v-if="propOrderVehicleModelDTO.saleCompany">
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">新车销售公司名称</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleModelDTO.saleCompany }}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name" style="width:41%">新车销售公司所在地</div>
                <div class="carOrderDetail_list_grid_txt">{{ saleAreaCode.value.text }}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">是否4S销售</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.saleFlag === "1"?"是":"否"}}</div>
              </div>
              </div>
               <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">一年内过户车</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleModelDTO.transferFlag === "1"?"是":"否"}}</div>
              </div>
            </van-collapse-item>

            <!-- :icon="$CTXBASE + '/img/carInsurance/info_car@2x.png'" -->
            <van-collapse-item class="carOrderDetail_item mt12" title="非车险" :value="'￥'+policyCaa.premium" name="2" icon="orders-o" v-if="policyCaa">
              <img class="fail_icon" v-if="!policyCaa.proposalNo && propOrderDTO.orderStatus != '01' && propOrderDTO.orderStatus != '00'" :src="$CTXBASE + '/img/account/fail_icon.png'" alt="">
              <img class="fail_icon" v-if="propOrderDTO.unpaidPremium && (!policyCaa.policyNo || policyCaa.policyNo == 'fail')" :src="$CTXBASE + '/img/account/fail_icon.png'" alt="">
              <div class="carOrderDetail_list_grid mb12"  v-if="policyCaa.policyNo">
                <div class="carOrderDetail_list_grid_name">保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{policyCaa.policyNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">投保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{policyCaa.proposalNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">保障日期</div>
                <div class="carOrderDetail_list_grid_txt">{{getLocalTime(policyCaa.startDate)}}至{{getLocalTime(policyCaa.endDate)}}</div>
              </div>
              <div>
                <div class="carOrderDetail_list_grid">
                  <div class="carOrderDetail_list_grid_name flex2">保障项目</div>
                  <div class="carOrderDetail_list_grid_name flex1 textAlign">保费(元）</div>
                </div>
                <div class="carOrderDetail_list_grid">
                  <div class="carOrderDetail_list_grid_txt_value flex2">{{policyCaa.riskName}}</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign">{{policyCaa.premium}}</div>
                </div>
              </div>
            </van-collapse-item>

            <van-collapse-item class="carOrderDetail_item mt12" title="交强险与车船税" :value="'￥'+policyCI.premium" name="3" icon="orders-o" v-if="policyCI">
              <img class="fail_icon" v-if="propOrderDTO.unpaidPremium && (!policyCI.policyNo || policyCI.policyNo == 'fail')" :src="$CTXBASE + '/img/account/fail_icon.png'" alt="">
              <div class="carOrderDetail_list_grid mb12" v-if="policyCI.policyNo">
                <div class="carOrderDetail_list_grid_name">保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{policyCI.policyNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">投保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{policyCI.proposalNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">保障日期</div>
                <div class="carOrderDetail_list_grid_txt">
                  <p style="margin: 0;">{{policyCI.startDate | timestampToTime}}至</p>
                  <p style="margin: 0;">{{policyCI.endDate | timestampToTime}}</p>
                </div>
              </div>
              <div>
                <div class="carOrderDetail_list_grid">
                  <div class="carOrderDetail_list_grid_name flex1">保障项目</div>
                  <div class="carOrderDetail_list_grid_name flex1 textAlign">是否含车船税</div>
                  <div class="carOrderDetail_list_grid_name flex1 textAlign">保费(元）</div>
                </div>
                <div class="carOrderDetail_list_grid" v-if="policyCI.taxActual">
                  <div class="carOrderDetail_list_grid_txt_value flex1">车船税</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign">否</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign">{{policyCI.taxActual}}</div>
                </div>
                <div class="carOrderDetail_list_grid" v-for="(item,index) in policyCI.policyRiskDTOList" :key="index">
                  <div class="carOrderDetail_list_grid_txt_value flex1">{{item.riskCoreName}}</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign">不含车船税</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign">{{item.premium}}</div>
                </div>
              </div>
            </van-collapse-item>

            <van-collapse-item class="carOrderDetail_item mt12" title="商业险" :value="'￥'+policyBI.premium" name="4" icon="orders-o" v-if="policyBI">
              <img class="fail_icon" v-if="propOrderDTO.unpaidPremium && (!policyBI.policyNo || policyBI.policyNo == 'fail')" :src="$CTXBASE + '/img/account/fail_icon.png'" alt="">
              <div class="carOrderDetail_list_grid mb12" v-if="policyBI.policyNo">
                <div class="carOrderDetail_list_grid_name">保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{policyBI.policyNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">投保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{policyBI.proposalNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">保障日期</div>
                <div class="carOrderDetail_list_grid_txt">
                  <p style="margin: 0;">{{policyBI.startDate | timestampToTime}}至</p>
                  <p style="margin: 0;">{{policyBI.endDate | timestampToTime}}</p>
                </div>
              </div>
              <div>
                <div class="carOrderDetail_list_grid">
                  <div class="carOrderDetail_list_grid_name flex1">保障项目</div>
                  <div class="carOrderDetail_list_grid_name flex1 textAlign">保额(元）</div>
                  <div class="carOrderDetail_list_grid_name flex1 textAlign">保费(元）</div>
                </div>
                <div class="carOrderDetail_list_grid" v-for="(item2,index2) in policyBI.policyRiskDTOList" :key="index2">
                  <div class="carOrderDetail_list_grid_txt_value flex1">{{item2.riskCoreName}}</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign" v-if="item2.riskCoreCode == '20Z1' || item2.riskCoreCode == '20Z2' || item2.riskCoreCode == '20Z3' || item2.riskCoreCode == '20Z4'">{{item2.quantity}}次</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign" v-if="['20E1','20E3','20E4','20E5','20K1'].includes(item2.riskCoreCode)">{{item2.deductible}}</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign" v-else>{{item2.amount}}</div>
                  <div class="carOrderDetail_list_grid_txt_value flex1 textAlign">{{item2.premium}}</div>
                </div>
              </div>

            </van-collapse-item>

            <van-collapse-item class="carOrderDetail_item mt12" title="投保登记" name="5" icon="orders-o" v-if="orderAppntDTO">
              <div class="datum_box">
                <div class="detaiUser">
                  <span class="detaiUser_name">{{propOrderVehicleDTO.carOwner}}</span>
                  <van-tag type="primary">车主</van-tag>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件号码</div>
                  <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.carOwnerIdNo | idNoConceal}}</div>
                </div>
                <van-divider />
                <div class="detaiUser">
                  <span class="detaiUser_name">{{orderAppntDTO.name}}</span>
                  <van-tag type="primary">投保人</van-tag>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件类型</div>
                  <div class="carOrderDetail_list_grid_txt" v-if="orderAppntDTO.idType == '0' ">身份证</div>
                  <div class="carOrderDetail_list_grid_txt" v-else>其他</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件号码</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.idNo | idNoConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.mobile | phoneConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">地址</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.address}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="orderAppntDTO.phoneHolderName" >
                  <div class="carOrderDetail_list_grid_name">手机持有人姓名</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.phoneHolderName}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="orderAppntDTO.phoneHolderIdentifyNumber">
                  <div class="carOrderDetail_list_grid_name">手机持有人身份证</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.phoneHolderIdentifyNumber | idNoConceal}}</div>
                </div>
              </div>
              <van-divider />
              <div class="datum_box" v-for="(item3,index3) in policyInsuredDTOList" :key="index3">
                <div class="detaiUser">
                  <span class="detaiUser_name">{{item3.name}}</span>
                  <van-tag type="primary">被保人</van-tag>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件类型</div>
                  <div class="carOrderDetail_list_grid_txt" v-if="item3.idType == '0' ">身份证</div>
                  <div class="carOrderDetail_list_grid_txt" v-else>其他</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件号码</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.idNo | idNoConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.mobile | phoneConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">地址</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.address}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="item3.phoneHolderName" >
                  <div class="carOrderDetail_list_grid_name">手机持有人姓名</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.phoneHolderName}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="item3.phoneHolderName">
                  <div class="carOrderDetail_list_grid_name">手机持有人身份证</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.phoneHolderIdentifyNumber | idNoConceal}}</div>
                </div>
              </div>
            </van-collapse-item>
            <!-- <van-collapse-item class="carOrderDetail_item mt12" title="审批结果" v-if="propOrderDTO.orderStatus == '01' || propOrderDTO.orderStatus == '13'" name="6" icon="shop-o">
              <div class="datum_box">
                <div class="red" v-if="policyBI && policyBI.underWriteMsg">{{policyBI.underWriteMsg}}</div>
                <div class="red" v-else>{{policyCI.underWriteMsg}}</div>
              </div>
            </van-collapse-item> -->
            <van-collapse-item class="carOrderDetail_item mt12" title="签名" v-if="signPhoto" name="7" icon="orders-o">
              <img :src="signPhoto" width="100%" alt="">
            </van-collapse-item>
          </van-collapse>
          <br>
        </div>
        <div class="payment_box">
          <div payment_grid>
            <span class="payment_grid_name">应付金额：</span>
            <span class="payment_grid_txt" v-if="propOrderDTO.unpaidPremium != null ">￥{{propOrderDTO.unpaidPremium || 0}}</span>
            <span class="payment_grid_txt" v-else>￥{{propOrderDTO.orderAmount || 0}}</span>
          </div>
          <van-button class="ubmit_btn" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" v-if="propOrderDTO.orderStatus == '02'" @click="toPayPage()">立即支付</van-button>
        </div>
      </div>
    </div>
    <insurance ref="insurance"></insurance>
  </div>
</template>

<script>

import insurance from '@/templates/insurance.vue';
import { mapState } from 'vuex'
export default {
  components: {
    insurance
  },
  data() {
    return {
      newpropOrderVehicleDTO:{},
      show: false,
      title: this.$route.meta.title,
      checked: false,
      activeNames: ['1'],
      orderNo: '',
      propOrderVehicleModelDTO: {},//车辆信息
      orderAppntDTO: {},//投保登陆信息
      policyInsuredDTOList: {},//被保人信息
      policyCaa: {
        premium: 0,
      },// 非车险
      policyBI: {
        premium: 0,
      },//商业险
      policyCI: {
        premium: 0,
      },//交强险与车船税
      propOrderDTO: {
        orderAmount: 0, //应付金额
      },
      propOrderVehicleDTO: {},//车辆信息
      signPhoto: ''
    }
  },
  computed: {
    ...mapState({
      UserInfo: state => state.my.UserInfo,
      vehicleDTO: state => state.car.vehicleDTO,
      useNatureCode: state => state.car.useNatureCode,
      trucksUseNatureCode : state => state.car.trucksUseNatureCode,
      motorbikeUseNatureCode : state => state.car.motorbikeUseNatureCode,
      saleAreaCode : state => state.car.saleAreaCode
    }),
  },
  created() {
    this.orderNo = this.$route.query.orderNo || ''
    if (this.orderNo) {
      this.getAutoDetails()
      this.getPhotograph()
    }
  },
  // filters:{
  //   saleAreacodeFilters:function (value) {

  // },
  methods: {
    //车险电子保单方法
    carShowState(){
        this.$refs.insurance.parentMsg(1,this.propOrderDTO.orderNo,this.policyCaa,this.propOrderVehicleDTO.licenseNo);
    },
    async getAutoDetails() {
      const res = await this.$axios({
        url: this.$API.API_GETORDERDETAILS,
        method: "post",
        data: {
          orderNo: this.orderNo,
        },
      });

      if (res.code === 0 && res.content.result == '0') {
        this.propOrderVehicleModelDTO = res.content.propOrderVehicleModelDTO
        this.propOrderVehicleDTO = res.content.propOrderVehicleDTO
        this.newpropOrderVehicleDTO = res.content.propOrderVehicleDTO.useNatureCode
        var newSaleAreacode = this.propOrderVehicleModelDTO.saleAreacode
        this.saleAreaCode.data.forEach(item=>{
          if(newSaleAreacode === item.value){
            this.saleAreaCode.value= item
          }
        })

        if (this.propOrderVehicleDTO.maincarKindCode == 'H') {
          this.trucksUseNatureCode.data.forEach(item=>{
            if(this.newpropOrderVehicleDTO === item.value){
              this.trucksUseNatureCode.value = item
            }
          })
        } else if (this.propOrderVehicleDTO.maincarKindCode == 'M') {
          this.motorbikeUseNatureCode.data.forEach(item=>{
            if(this.newpropOrderVehicleDTO === item.value){
              this.motorbikeUseNatureCode.value = item
            }
          })
        } else {
          this.useNatureCode.data.forEach(item=>{
            if(this.newpropOrderVehicleDTO === item.value){
              this.useNatureCode.value = item
            }
          })
        }
        this.policyCI = res.content.policyCI
        this.policyBI = res.content.policyBI
        this.orderAppntDTO = res.content.orderAppntDTO
        this.propOrderDTO = res.content.propOrderDTO || { orderAmount: 0 }
        this.policyInsuredDTOList = res.content.policyInsuredDTOList

        this.policyCaa = res.content.policyCaa
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
      
    },
    getLocalTime(oldtime) {
      if (oldtime) {
        var datejson = new Date(oldtime).toJSON();
        var date = new Date(+ new Date(datejson)
          + 8 * 3600 * 1000).toISOString().
          replace(/T/g, ' ').
          replace(/\.[\d]{3}Z/, '')
        date = date.slice(0, 10)
        return date;
      } else {
        return ''
      }

    },
    //立即支付跳转（这里不调支付接口）
    toPayPage() {
      this.goPage('carConfirmInsured?orderNo=' + this.orderNo);
    },
    // 重新发送短信
    sendMobileVerificationCode() {
      this.$store.dispatch('order/sendMobileVerificationCode', { orderNo: this.orderNo })
    },
    //查询已经上传的图片
    async getPhotograph() {
      const res = await this.$axios({
        url: this.$API.API_GETIMAGE,
        method: "get",
        params: {
          businessNo: this.orderNo,//传订单号查询
          fileGroup: 'QM'
        },
      });
      if (res.code === 0 && res.content.data) {
        this.signPhoto = res.content.data[0].fileUrl || ''
      }
    },

  }
}

</script>
<style lang="less">
@import '../../../assets/less/app/carOrderDetail/carOrderDetail.less';
.carOrderDetail {
  .van-nav-bar {
   // background: #0252ff;
  }
  .van-nav-bar__title {
   // color: #fff;
  }
  .van-nav-bar_right_title {
   // color: #fff;
  }
  .van-collapse-item--border::after {
    border-top: 0;
  }
  .carOrderDetail_list_grid_txt {
    text-align: right;
  }
}
</style>
