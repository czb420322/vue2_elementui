<template>
  <div class="orderDetailPage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <van-nav-bar :title="title" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
        </template>
        <template #right>
          <van-popover v-model="showPopover" theme="dark" trigger="click" :actions="actions" @select="onSelect" placement="bottom-end">
            <template #reference>
              <van-icon name="wap-nav" color="#fff" size="20" v-if="pageData.policyStatus == '08'" />
            </template>
          </van-popover>
        </template>
      </van-nav-bar>
      <div class="carOrderDetail_box">
        <div class="carOrderDetail_order">
          <div class="carOrderDetail_order_mark">订单号{{pageData.insOrder.orderNo}}</div>
          <div class="carOrderDetail_order_status" v-if="pageData.insOrder.orderStatus == '00'">等待确认</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '01'">待付款</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '02'">支付中</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '03'">支付成功</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '04'">购买失败</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '05'">交易关闭</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '06'">逾期关闭</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '07'">待续保</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '09'">已超时</div>
          <div class="carOrderDetail_order_status" v-else></div>
        </div>
        <div class="carOrderDetail_list" :style="{ 'top': ($iosSystem + 90) + 'px' }">
          <van-collapse v-model="activeNames">
            <van-collapse-item class="carOrderDetail_item" title="订单信息" name="1" :icon="$CTXBASE + '/img/carInsurance/details@2x.png'">
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">投保产品</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.insOrder.productName}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">投保份数</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.insure_qty || ''}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12" v-if="pageData.propPoliy">
                <div class="carOrderDetail_list_grid_name">保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.propPoliy}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.orderStatus !='01' ">
                <div class="carOrderDetail_list_grid_name">投保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.proposalNo}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">订单金额</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.insOrder.orderAmount || 0}}元</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">保险起期</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.startDate | transformTimestamp()}}</div>
              </div>
            </van-collapse-item>

            <van-collapse-item class="carOrderDetail_item mt12" title="投保人信息" name="2" :icon="$CTXBASE + '/img/carInsurance/cast@2x.png'">
              <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'">
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">企业名称</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.enterprise}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.mobile | phoneConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件类型</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.idType == '0'? '身份证' : pageData.applicant.idType == '10'? '统一社会信用代码' : '' }}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="pageData.applicant.idType == '10'">
                  <div class="carOrderDetail_list_grid_name">证件号码</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.idNo | idNoConceal}}</div>
                </div>
              </div>
              <div v-else>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">姓名</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.name}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.mobile | phoneConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件类型</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.idType == '0' ? '身份证' : pageData.applicant.idType == '16' ? '护照' : pageData.applicant.idType == '2' ? '军人证' : pageData.applicant.idType == '24' ? '港澳通行证' : pageData.applicant.idType == '4' ? '出生证' : pageData.applicant.idType == '6' ? '身份证' : pageData.applicant.idType == '7' ? '出生证' : pageData.applicant.idType == '8' ? '其他' : pageData.applicant.idType == '9' ? '其它证件' : pageData.applicant.idType == '10' ? '统一社会信用代码' : pageData.applicant.idType == '20' ? '营业执照' :'' }}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件号码</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.idNo | idNoConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">邮箱</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.email}}</div>
                </div>

              </div>
            </van-collapse-item>

            <van-collapse-item class="carOrderDetail_item mt12" title="被保人信息" name="3" :icon="$CTXBASE + '/img/carInsurance/quilt@2x.png'">
              <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'"> 
                <div v-for="(item,index) in pageData.insured" :key="index">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">企业名称</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.enterprise}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">证件类型</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.idType == '0'? '身份证' : item.idType == '10'? '统一社会信用代码' : item.idType == '16'? '护照': item.idType == '24'? '港澳通行证'  : '' }}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">证件号码</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.idNo | idNoConceal}}</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-for="(item,index) in pageData.insured" :key="index">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">姓名</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.name}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">证件类型</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.idType == '0'? '身份证' : item.idType == '10'? '统一社会信用代码' : item.idType == '16'? '护照': item.idType == '24'? '港澳通行证' : '' }}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">证件号码</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.idNo | idNoConceal}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL072'">
                    <div class="carOrderDetail_list_grid_name">学校地址/类别</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.address}}</div>
                  </div>

                </div>
              </div>
            </van-collapse-item>
            <!-- 标的信息 -->
            <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL002' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL008' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL005' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL013' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL032' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL040'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL082'">
              <van-collapse-item class="carOrderDetail_item mt12" :title="pageData.insOrder.subjectMatter" name="4" :icon="$CTXBASE + '/img/carInsurance/sign@2x.png'">
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">车牌号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.Target.licenseno | licenseNoConceal}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">车架号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.Target.frameno | frameNoConceal}}</div>
                </div>
                <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL002'">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">座位数</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.seatcount}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">是否新车</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup1 == '1'? '是' : '否'}}</div>
                  </div>
                </div>
                <div v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026'">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">是否新车</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup1 == '1'? '是' : '否'}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">核定载重质量</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.cnum}}吨以下</div>
                  </div>
                </div>
                <div v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">座位数</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.seatcount}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">发动机号</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup9 | engineNoConceal}}</div>
                  </div>
                </div>
                <!-- 家财无忧·百万安心险 家财无忧·百万安心险（辽宁） i国任-燃气意外险 标的信息特殊处理 -->
                <div v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL025'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL039'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL028' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL079' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL084'">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">房屋所在地区</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup3+'/'+pageData.Target.backup5+'/'+pageData.Target.backup7}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">房屋详细地址</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.ctgtaddr}}</div>
                  </div>
                </div>

              </van-collapse-item>
            </div>

            <van-collapse-item class="carOrderDetail_item mt12" title="保单信息" name="5" :icon="$CTXBASE + '/img/carInsurance/details@2x.png'">
              <div class="datum_box" v-for="(item,index) in pageData.policyList" :key="index">
                <!-- <div class="detaiUser">
                  <span class="detaiUser_name">保单信息</span>
                  <van-tag type="primary">{{index+1}}</van-tag>
                </div> -->
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">保单号</div>
                  <div class="carOrderDetail_list_grid_txt">{{item.policyNo}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">保费</div>
                  <div class="carOrderDetail_list_grid_txt">{{item.premium}}元</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">起保时间</div>
                  <div class="carOrderDetail_list_grid_txt" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL066'">{{pageData.startDate}}</div>
                  <div class="carOrderDetail_list_grid_txt" v-else>{{item.startDate}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">结束时间</div>
                  <div class="carOrderDetail_list_grid_txt" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL066'">{{pageData.endDate}}</div>
                  <div class="carOrderDetail_list_grid_txt" v-else>{{item.endDate}}</div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
          <br>
        </div>
        <div class="payment_box">
          <div payment_grid>
            <span class="payment_grid_name">应付金额：</span>
            <span class="payment_grid_txt">￥{{pageData.insOrder.orderAmount || 0}}</span>
          </div>
          <van-button class="ubmit_btn" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" v-if="pageData.insOrder.orderStatus=='01' || pageData.insOrder.orderStatus=='02' || pageData.insOrder.orderStatus=='00'" @click="toPayPage()">立即支付</van-button>
        </div>
      </div>
    </div>
    <insurance ref="insurance"></insurance>

  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import compCheck from '../../assets/js/util/comp-check';
import app from '../../assets/js/util/app';
import insurance from '@/templates/insurance.vue';
import configJs from '../../config.js'
import { mapState } from 'vuex'
export default {
  components: {
    insurance
  },
  data() {
    return {
      title: this.$route.meta.title,
      activeNames: ['1'],
      productDetailInfo: {
        "orderNo": '',
        "propPoliy": '',
        "productName": '',
        "orderStatus": '',
        "orderAmount": '',
        "appntName": '',
        "appntSex": '',
        "insuredName": '',
        "insuredSex": '',
        "benefitName": '',
        "benefitSex": ''
      },
      pageData: {
        "applicant": {},   //投保人
        "insured": {},     //被保人
        "bnf": {},         //受益人
        "payment": {},     //支付订单信息
        "insOrder": {}     //订单基础信息
      },
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: '电子保单' }, { text: '电子发票' }],

    }
  },
  computed: {
    ...mapState({
      UserInfo: state => state.my.UserInfo
    })
  },
  created() {
    if (sessionStorage.orderDetailInfo) {
      this.pageData = JSON.parse(sessionStorage.orderDetailInfo);
    }
    this.queryOrderDetail();
  },
  methods: {
    onSelect(action) {
      if (action.text == '电子保单') {//非车电子保单方法
        this.$refs.insurance.parentMsg(2, '', { policyNo: this.pageData.propPoliy, pageData: this.pageData });
      } else if (action.text == '电子发票') {
        this.$refs.insurance.parentMsg(3, this.productDetailInfo.orderNo, { policyNo: this.pageData.propPoliy, pageData: this.pageData });
      }
      console.log('action.text', action.text)
    },
    async queryOrderDetail() {
      //  this.$router.push({name:'ssm'});
      //  return
      this.productDetailInfo.orderNo = this.$route.query.orderNo;
      console.info('orderNo===>' + this.productDetailInfo.orderNo);
      this.isLogin = true;
      const res = await this.$axios({
        url: this.$API.API_ORDER_FINDORDERDETAILS,
        method: 'post',
        data: {
          'insuranceOrderNo': this.productDetailInfo.orderNo
        }
      });
      if (res.code === 0) {
        this.pageData = res.content;
        for (let i in this.pageData.insured) {
          if (this.pageData.insured[i].sex) {
            this.pageData.insured[i].sex = compCheck.idNoChangeSex(this.pageData.insured[i].idNo)
          }
        }
        this.pageData.applicant.sex = compCheck.idNoChangeSex(this.pageData.applicant.idNo)
        sessionStorage.orderDetailInfo = JSON.stringify(this.pageData);
      } else {
        this.$toast(res.message);
      }
    },
    toPayPage() {
  
      //不让支付
      if (this.pageData.allowInsure == '0') {
        this.$toast('当前产品已下架，暂不支持出单!');
        return;
      }
      if (this.pageData.payment && this.pageData.payment.payUrl) {
        util.setSessionStorageObj("appntInfo", this.pageData.applicant);
        util.setSessionStorageObj("payUrl", this.pageData.payment.payUrl);
        util.setSessionStorageObj("sumPrem", this.pageData.insOrder.orderAmount);
        util.setSessionStorageObj("orderNo", this.pageData.insOrder.orderNo);
        if (this.pageData.uploadFilesFlag == '0') {//玻璃险和宠物险专用判断 等于0说明没有上传图片，跳转到图片上传
          if (this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL032') {//玻璃险
            this.goPage('productUpload?warrantyNumber=' + this.pageData.proposalNo);
          } else if (this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL073') {//宠物险上传图片
            this.goPage('moreUpload?warrantyNumber=' + this.pageData.proposalNo);
          }
        } else {
          window.location.href = `${configJs.config.http_base + configJs.config.ctx_base}/#/wxOrderDetail?orderNo=${this.$route.query.orderNo}`
        }
      } else {
        this.$toast('当前订单生成中，请稍后再试!');
      }
    }
  }
}
</script>
<style lang="less">
@import './../../assets/less/app/life/order/orderDetail.less';
.orderDetailPage {
  .van-nav-bar {
    background: #0252ff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar_right_title {
    color: #fff;
  }
  .van-collapse-item--border::after {
    border-top: 0;
  }
  .carOrderDetail_list_grid_txt {
    text-align: right;
  }
//   .van-dialog {
//     height: 33%;
// }
}
</style>