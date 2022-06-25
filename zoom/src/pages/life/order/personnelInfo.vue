<template>
  <div class="orderDetailPage afe-area-inset-bottom">
    <v-header :title="{ name: type == 'applicant' ? '投保人详情' : '被保人详情' }"></v-header>

    <div :style="{ 'margin-top': ($iosSystem + 60) + 'px' }">
      <van-cell-group v-if="type == 'applicant'">
        <div v-if="orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL026' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL041' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL044' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL045' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL046' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL077'">
            <van-cell title="企业名称" :value="orderDetailInfo.applicant.enterprise" />
            <van-cell title="证件类型" :value="orderDetailInfo.applicant.idType == '0' ? '身份证' : orderDetailInfo.applicant.idType == '10' ? '统一社会信用代码' :'' " />
            <van-cell title="证件号码" :value="orderDetailInfo.applicant.idNo" />
            <van-cell title="手机号" :value="orderDetailInfo.applicant.mobile | phoneConceal"/>
        </div>
         <div v-else>
            <van-cell title="名字" :value="orderDetailInfo.applicant.name" />
            <van-cell title="证件类型" :value="orderDetailInfo.applicant.idType == '0' ? '身份证' : orderDetailInfo.applicant.idType == '1' ? '护照' : orderDetailInfo.applicant.idType == '2' ? '军人证' : orderDetailInfo.applicant.idType == '3' ? '异常身份证' : orderDetailInfo.applicant.idType == '4' ? '出生证' : orderDetailInfo.applicant.idType == '6' ? '身份证' : orderDetailInfo.applicant.idType == '7' ? '出生证' : orderDetailInfo.applicant.idType == '8' ? '其他' : orderDetailInfo.applicant.idType == '9' ? '其它证件' : orderDetailInfo.applicant.idType == '10' ? '统一社会信用代码' : orderDetailInfo.applicant.idType == '20' ? '营业执照' :'' " />
            <van-cell title="证件号码" :value="orderDetailInfo.applicant.idNo | idNoConceal" />
            <van-cell title="性别" :value="orderDetailInfo.applicant.sex == '0' ? '男' : orderDetailInfo.applicant.sex == '1' ? '女' : ''" />
            <van-cell title="出生日期" :value="orderDetailInfo.birthday" v-show="orderDetailInfo.birthday"/>
            <van-cell title="手机号" :value="orderDetailInfo.applicant.mobile | phoneConceal" />
        </div>
       
      </van-cell-group>
      <van-cell-group v-if="type == 'insured'" style="background-color: rgba(0,0,0,0)">
        <div  v-if="orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL026' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL041' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL044' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL045' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL046' || orderDetailInfo.insOrder.productCode == 'GRMOBILE_MALL_SL077'">
            <div v-for="(item,index) in orderDetailInfo.insured" :key="index" style="margin-bottom: 14px;" >
              <van-cell v-if="orderDetailInfo.insured.length>1" class="title_bar" :title="`第${index+1}位被保人`" />
              <van-cell v-else class="title_bar" :title="`被保人`" />
              <van-cell title="企业名称" :value="item.enterprise" />
              <van-cell title="证件类型" :value="item.idType == '0' ? '身份证' : item.idType == '10' ? '统一社会信用代码' :'' " />
              <van-cell title="证件号码" :value="item.idNo | idNoConceal" />
            </div>
        </div>
         <div v-else>
            <div v-for="(item,index) in orderDetailInfo.insured" :key="index" style="margin-bottom: 14px;" >
              <van-cell v-if="orderDetailInfo.insured.length>1" class="title_bar" :title="`第${index+1}位被保人`" />
              <van-cell v-else class="title_bar" :title="`被保人`" />
              <van-cell title="是投保人的" :value="item.relationToAppnt" />
              <van-cell title="名字" :value="item.name" />
              <van-cell title="证件类型" :value="item.idType == '0' ? '身份证' : item.idType == '1' ? '护照' : item.idType == '2' ? '军人证' : item.idType == '3' ? '异常身份证' : item.idType == '4' ? '出生证' : item.idType == '6' ? '身份证' : item.idType == '7' ? '出生证' : item.idType == '8' ? '其他' : item.idType == '9' ? '港澳通行证' : item.idType == '10' ? '统一社会信用代码': item.idType == '20' ? '营业执照' :'' " />
              <van-cell title="证件号码" :value="item.idNo | idNoConceal" />
              <van-cell title="性别" :value="item.sex == '0'? '男' : item.sex == '1'? '女' : '' " />
            </div>
        </div>
       
      </van-cell-group>
    </div>
  </div>
  </div>
</template>

<script>
import common from '../../../assets/js/util/common';
export default {
  data() {
    return {
      type: '',
      orderDetailInfo: {}
    };
  },

  created() {
    this.type = this.$route.query.type;
    this.orderDetailInfo = sessionStorage.orderDetailInfo ? JSON.parse(sessionStorage.orderDetailInfo) : {}
  }
};
</script>

<style lang="less">
@import './../../../assets/less/app/life/order/orderDetail.less';
.orderDetailPage {
  .van-cell-group {
    margin-bottom: 14px;
    .title_bar {
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}
</style>