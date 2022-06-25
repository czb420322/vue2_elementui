<template>
  <div class="carOrderDetail">
    <div>
      <div class="carOrderDetail_box">
        <div class="carOrderDetail_order">
          <div class="carOrderDetail_order_mark">订单号{{propOrderDTO.orderNo}}</div>
          <div class="carOrderDetail_order_status" v-if="propOrderDTO.orderStatus == '02'">待付款</div>
          <div class="carOrderDetail_order_status" v-else-if="propOrderDTO.orderStatus == '01'">待核保</div>
          <div class="carOrderDetail_order_status" v-if="propOrderDTO.orderStatus == '04'">已承保</div>
          <div class="carOrderDetail_order_status" v-if="propOrderDTO.orderStatus == '07'">已终止</div>
        </div>
        <div class="carOrderDetail_list">
          <van-collapse v-model="activeNames">
            <van-collapse-item class="carOrderDetail_item" title="车辆信息" name="1" icon="logistics" >
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">车牌号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.licenseNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">品牌型号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleModelDTO.codeName}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">使用性质</div>
                <div class="carOrderDetail_list_grid_txt">{{useNatureCode.value.text}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">车架号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.frameNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">发动机号</div>
                <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.engineNo}}</div>
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
                <div class="carOrderDetail_list_grid_name" v-if="propOrderVehicleDTO.maincarKindCode != 'H'">座位数</div>
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

            <van-collapse-item class="carOrderDetail_item mt12" title="非车险" :value="'￥'+policyCaa.premium" name="4" icon="orders-o" v-if="policyCaa">
              <!-- <img class="fail_icon" v-if="!policyCaa.proposalNo && propOrderDTO.orderStatus != '01'" :src="$CTXBASE + '/img/account/fail_icon.png'" alt=""> -->
              <div class="carOrderDetail_list_grid mb12" v-if="policyCaa.policyNo">
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

            <van-collapse-item class="carOrderDetail_item mt12" title="交强险与车船税" :value="'￥'+policyCI.premium" name="2" icon="orders-o" v-if="policyCI">
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

            <van-collapse-item class="carOrderDetail_item mt12" title="商业险" :value="'￥'+policyBI.premium" name="3" icon="orders-o" v-if="policyBI">
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
                  <div class="carOrderDetail_list_grid_txt">{{propOrderVehicleDTO.carOwnerIdNo}}</div>
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
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.idNo}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.mobile}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">地址</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.address}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="orderAppntDTO.phoneHolderName">
                  <div class="carOrderDetail_list_grid_name">手机持有人姓名</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.phoneHolderName}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="orderAppntDTO.phoneHolderIdentifyNumber">
                  <div class="carOrderDetail_list_grid_name">手机持有人身份证</div>
                  <div class="carOrderDetail_list_grid_txt">{{orderAppntDTO.phoneHolderIdentifyNumber}}</div>
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
                  <div class="carOrderDetail_list_grid_txt">{{item3.idNo}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.mobile}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">地址</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.address}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="item3.phoneHolderName">
                  <div class="carOrderDetail_list_grid_name">手机持有人姓名</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.phoneHolderName}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="item3.phoneHolderName">
                  <div class="carOrderDetail_list_grid_name">手机持有人身份证</div>
                  <div class="carOrderDetail_list_grid_txt">{{item3.phoneHolderIdentifyNumber}}</div>
                </div>
              </div>
            </van-collapse-item>
            <van-collapse-item class="carOrderDetail_item mt12" title="审批结果" v-if="propOrderDTO.orderStatus == '01'" name="5" icon="shop-o">
              <div class="datum_box">
                <!-- <div class="yans">拒绝原因</div> -->
                <div class="red" v-if="policyBI && policyBI.underWriteMsg">{{policyBI.underWriteMsg}}</div>
                <div class="red" v-else>{{policyCI.underWriteMsg}}</div>
              </div>
            </van-collapse-item>

          </van-collapse>

          <div class="detailCheck mt12" v-if="propOrderDTO.orderStatus == '02'" @click.stop="check()">
            <van-checkbox v-model="checked">我已阅读并同意签署
              <!-- <router-link to="/carClause">《电子投保单》</router-link> -->
              <span class="detailCheck_span" @click.stop="goPage('carClause?current=b&orderNo='+propOrderDTO.orderNo+'&manageCode='+manageCode)" v-show="policyBI">《免责事项说明书》</span>
              <span class="detailCheck_span" @click.stop="goPage('carClause?current=c&orderNo='+propOrderDTO.orderNo+'&manageCode='+manageCode)">《车险条款》</span>
              <span class="detailCheck_span" @click.stop="goPage('carClause?current=c&orderNo='+propOrderDTO.orderNo+'&manageCode='+manageCode)">《保险条款》</span>
              <span class="detailCheck_span" @click.stop="goPage('carClause?current=c&orderNo='+propOrderDTO.orderNo+'&manageCode='+manageCode)">《投保须知》</span>
              <!-- 山西出单车险时展示 -->
              <template v-if="manageCode!==null">
                <span class="detailCheck_span" @click.stop="goPage('carClause?current=d&orderNo='+propOrderDTO.orderNo+'&manageCode='+manageCode)" v-if="manageCode.substring(0,2) =='30'">《客户授权声明书》</span>
              </template>
              <template v-else>
								<span>&nbsp;</span>
							</template>


              <!-- 车+意 -->
              <span class="detailCheck_span" v-if="policyCaa && policyCaa.proposalNo && pdf.insuranceUrl" @click.stop="goPage('read?title='+'投保须知'+'&productCode='+policyCaa.suiteCode+'&book=false'+'&look='+1)">《投保须知》</span>
              <span class="detailCheck_span" v-if="policyCaa && policyCaa.proposalNo && pdf.occupationUrl" @click.stop="goPage('read?title='+'职业列表'+'&productCode='+policyCaa.suiteCode+'&book=false')">《职业列表》</span>
              <span class="detailCheck_span" v-if="policyCaa && policyCaa.proposalNo && pdf.clauseUrl" @click.stop="goPage('read?title='+'保险条款'+'&productCode='+policyCaa.suiteCode+'&book=false'+'&look='+1)">《保险条款》</span>
              <span class="detailCheck_span" v-if="policyCaa && policyCaa.proposalNo && pdf.liabilityUrl" @click.stop="goPage('read?title='+'人身保险伤残评定标准'+'&productCode='+policyCaa.suiteCode+'&book=false')">《人身保险伤残评定标准》</span>
            </van-checkbox>
          </div>
          <br>

        </div>
        <div class="payment_box">
          <div payment_grid>
            <span class="payment_grid_name">应付金额：</span>
            <span class="payment_grid_txt">￥{{propOrderDTO.orderAmount || 0}}</span>
          </div>
          <van-button class="ubmit_btn" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" v-if="propOrderDTO.orderStatus == '02'" @click="showVerificationCode()">立即支付</van-button>
        </div>
      </div>
    </div>
    <!-- 短信验证码 -->
    <VerificationCode ref="VerificationCode" @click="toPayPage"></VerificationCode>

  </div>
</template>

<script>
import util from "../../../assets/js/util/util";
import glutton from '../../../assets/js/util/glutton';
import VerificationCode from './VerificationCode.vue';
import { mapState } from 'vuex'

export default {
  components: {
    VerificationCode
  },
  data() {
    return {
      newpropOrderVehicleDTO:{},
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
      pdf: {
        insuranceUrl: '',
        occupationUrl: '',
        clauseUrl: '',
        liabilityUrl: '',
        manageCode: ''
      },
      manageCode: ''
    }
  },
  computed: {
    ...mapState({
      vehicleDTO: state => state.car.vehicleDTO,
      useNatureCode: state => state.car.useNatureCode,
      saleAreaCode: state => state.car.saleAreaCode,

    }),
  },
  created() {
    this.orderNo = this.$route.query.orderNo || ''
    if (this.orderNo) {
      this.getAutoDetails()
    }
    //获取免责事项说明书是否签名（有值代表签名了）
    if (util.getSessionStorageObj("signature")) {
      this.checked = true;
    }
  },
  methods: {
    check() {
      if (util.getSessionStorageObj("signature")) {
        this.checked = true;
      } else if (this.policyBI) {
        this.goPage('carClause?current=b&orderNo=' + this.propOrderDTO.orderNo)
      } else { //没有买商业险没有《免责事项说明书》所以直接跳《车险条款》
        this.goPage('carClause?current=c&orderNo=' + this.propOrderDTO.orderNo)
      }
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
        glutton.startRecording(res.content.traceNo); // 回溯录制
        this.propOrderVehicleModelDTO = res.content.propOrderVehicleModelDTO
        this.newpropOrderVehicleDTO = res.content.propOrderVehicleDTO.useNatureCode
         var newSaleAreacode = this.propOrderVehicleModelDTO.saleAreacode
        this.saleAreaCode.data.forEach(item=>{
          if(newSaleAreacode === item.value){
            this.saleAreaCode.value= item
          }
        })
        this.useNatureCode.data.forEach(item=>{
          if(this.newpropOrderVehicleDTO === item.value){
            this.useNatureCode.value = item
          }
        })
        this.policyCI = res.content.policyCI
        this.policyBI = res.content.policyBI
        this.orderAppntDTO = res.content.orderAppntDTO
        this.propOrderDTO = res.content.propOrderDTO || { orderAmount: 0 }
        this.policyInsuredDTOList = res.content.policyInsuredDTOList
        this.propOrderVehicleDTO = res.content.propOrderVehicleDTO
        this.policyCaa = res.content.policyCaa
        this.manageCode = res.content.manageCode
        if (res.content.policyCaa && res.content.policyCaa.suiteCode) {
          this.getpdf(res.content.policyCaa.suiteCode);
        }
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
    async showVerificationCode() {
      if (!this.checked) {
        this.$toast('请勾选相关协议!');
        return;
      }
      // maincarKindCode A汽车，H货车 03000000-江苏   07000000-上海   01000000-北京   09000000-深圳
      if (this.propOrderVehicleDTO.maincarKindCode == 'A' &&
          this.manageCode != '03000000' &&
          this.manageCode != '01000000' &&
          this.manageCode != '06000000' &&
          this.manageCode != '07000000' &&
          this.manageCode != '09000000' &&
          this.manageCode != '30000000' && 
          this.manageCode != '22000000' &&
          this.manageCode != '29000000' &&
          this.manageCode != '06000000-1' &&
          process.env.VUE_APP_MODE == "prd"
      ) {
        this.$refs.VerificationCode.parentMsg(this.orderNo)
      } else {
        const res = await this.$axios({
        url: this.$API.API_INSURECHECKQM,
        method: 'get',
        params: {
          businessNo:this.orderNo
        }       
      });
     if (res.code === 0  && res.content && res.content.result === '1') {//支付前再次判断签名接口
        this.goPage('read?title='+'投保须知'+'&productCode='+this.policyCaa.suiteCode+'&book=false'+'&look='+1)
      } else {
        this.toPayPage()
      }
      }
    },

    //获取支付链接
    async toPayPage() {
      const res = await this.$axios({
        url: this.$API.API_GENERATEPAYMENTURL,
        method: 'post',
        data: {
          orderNo: this.orderNo,
          isWXPay: true,
        }
      });
      if (res.code === 0 && res.content.result === '0' && res.content.payUrl) {
        glutton.stopRecording(); // 回溯录制
        window.location.href = res.content.payUrl;
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    // 请求PDF协议
    async getpdf(productCode) {
      const res = await this.$axios({
        url: this.$API.API_INSURE_INSURANCE_CLAUSEOCCUPATION,
        method: 'get',
        params: {
          productCode
        }
      });
      console.log(res ,'请求协议');
      if (res.code === 0) {
        if (res.content) {
          this.pdf = {
            insuranceUrl: res.content.insuranceUrl || '',
            occupationUrl: res.content.occupationUrl || '',
            clauseUrl: res.content.clauseUrl || '',
            liabilityUrl: res.content.liabilityUrl || ''
          }
        }
      }
    },
  }
}
</script>
<style lang="less">
@import '../../../assets/less/app/carOrderDetail/carOrderDetail.less';
.carOrderDetail {
  .van-collapse-item--border::after {
    border-top: 0;
  }
  .carOrderDetail_list_grid_txt {
    text-align: right;
  }
}
</style>
