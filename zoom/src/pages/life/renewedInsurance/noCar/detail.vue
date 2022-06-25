<template>
  <div class="renewedInsurancePage renewedInsuranceDetailPage">
    <v-header :title="{ name: title }"></v-header>
    <i class="navBg" :style="{ 'height': ($iosSystem + 78) + 'px' }"></i>
    <ol class="list-box" :style="{ 'margin-top': ($iosSystem + 50) + 'px' }">
      <li class="list">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="订单信息" name="1" :icon="$CTXBASE + '/img/carInsurance/ic_info_men@2x.png'">
            <div class="info-box">
              <p class="item"><span class="label">投保产品</span><span class="txt right">{{renewalDetail.riskName || ''}}</span></p>
              <!-- <p class="item"><span class="label">投保份数</span><span class="txt right">{{renewalDetail.detailInfo.quantity || 0}}次</span></p> -->
              <p class="item"><span class="label">保单金额</span><span class="txt right">{{renewalDetail.detailInfo.premium || 0}}元</span></p>
              <p class="item"><span class="label">保障期限</span><span class="txt right">{{renewalDetail.startDate | dateDayFilter}}至{{renewalDetail.endDate | dateDayFilter}}</span></p>
              <p class="item"><span class="label">距终保时间</span><span class="txt right">{{renewalDetail.detailInfo.edDistance || 0}}天</span></p>
              <p class="item"><span class="label">联系人</span><span class="txt right">{{renewalDetail.appntName || ''}}</span></p>
              <p class="item"><span class="label">联系人电话</span>
                <span class="txt right tel" v-if="renewalDetail.detailInfo.appntMobile" @click="goCollectLog('igr001', renewalDetail.detailInfo.appntMobile)">{{renewalDetail.detailInfo.appntMobile | phoneConceal}}&nbsp;
                  <van-icon :name="$CTXBASE + '/img/carInsurance/ic_phone.png'" size="18" />
                </span>
                <span v-else class="txt right">{{renewalDetail.detailInfo.appntMobile | phoneConceal}}</span>
              </p>
              <p class="item"><span class="label">报案电话</span>
                <span class="txt right tel" v-if="renewalDetail.detailInfo.reportPhone" @click="goCollectLog('igr005', renewalDetail.detailInfo.reportPhone)">{{renewalDetail.detailInfo.reportPhone | phoneConceal}}&nbsp;
                  <van-icon :name="$CTXBASE + '/img/carInsurance/ic_phone.png'" size="18" />
                </span>
                <span v-else class="txt right">{{renewalDetail.detailInfo.reportPhone | phoneConceal}}</span>
              </p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </li>
    </ol>

    <div class="btnBar" v-if="renewalDetail.isOperate == 1">
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" v-if="renewalDetail.detailInfo.allocationStatus == 0 && renewalDetail.detailInfo.claimStatus == 0 && renewalDetail.detailInfo.renewFlag == 0 ? true : false" @click="renewalClaim">认领</van-button>
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" v-else-if="renewalDetail.detailInfo.claimStatus == 1 || renewalDetail.detailInfo.allocationStatus == 1" @click="showCancelPopup">放弃</van-button>
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="renewalDetail.renewType == 1 || !renewalDetail.detailInfo.renewProductCode" @click="onsubmit">一键续保</van-button>
    </div>
    <p v-else style="text-align: center; opacity: .5;">未到当地监管机构允许续保时间</p>

    <conditionPopup ref="conditionPopup"></conditionPopup>
    <cancelPopup ref="cancelPopup"></cancelPopup>
  </div>
</template>

<script>
import conditionPopup from './conditionPopup.vue'
import cancelPopup from './../cancelPopup.vue'
import compCheck from '../../../../assets/js/util/comp-check'
import { mapState } from 'vuex'

export default {
  components: {
    conditionPopup, cancelPopup
  },
  computed: {
    ...mapState({
      query: state => state.renewedInsurance.noCar.query,
      renewalDetail: state => state.renewedInsurance.noCar.renewalDetail,
      renewalList: state => state.renewedInsurance.noCar.renewalList,
      userInfo: state => state.my.UserInfo,
    })
  },
  data() {
    return {
      title: this.$route.meta.title,
      licenseName: '',
      show: true,
      disabled: false,
      activeNames: ['1']
    }
  },
  created() {

  },
  methods: {
    close() {
      this.show = false;
    },
    async onsubmit() {
      // if (this.userInfo.openCarFunction == '0') {
      //   this.$store.commit('car/resetState');
      //   this.$store.commit('car/updateCarState', [
      //     { name: ['vehicleDTO', 'frameNo'], value: this.renewalDetail.frameNo }
      //   ])
      //   await this.$store.dispatch('car/renewInsurance')
      //   this.goPage('carInsurance')
      // } else {
      //   this.$toast('功能开发中，敬请期待！');
      // }
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['noCar', 'renewalDetail', 'use'], value: false }
      ])
      this.goPage('productDetail?saleCode=GRMOBILE_MALL_SL015')
    },
    showConditionPopup() {
      this.$refs.conditionPopup.parentMsg();
    },
    // 拔打电话埋点
    goCollectLog(eventId, phone) {
      this.$store.dispatch('common/goCollectLog', {
        data: {
          eventId,
          eventName: '续保电话外呼',
          puid: this.renewalDetail.corePolicyNo,
        },
        eventAttributes: {
          phoneNumber: phone || '',
          callStartTime: compCheck.transformDatesTimetamp() || '',
        }
      });
      window.location.href = 'tel://' + phone;
    },
    // 认领
    async renewalClaim() {
      this.$dialog.confirm({
        title: '认领',
        message: '是否认领选择的数据，认领后该数据将无法被分配给其他业务员',
      }).then(async () => {
        const res = await this.$store.dispatch('renewedInsurance/noCarRenewalClaim', {
          claimAll: false,
          tableIds: this.renewalDetail.id
        })
        if (res.code == 0 && res.content.result == '0') {
          this.$toast('认领成功');
          this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalDetail', 'claimStatus'], value: '1' }])
          this.renewalList.forEach((item, index) => {
            if (item.id == this.renewalDetail.id) {
              this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalList', index, 'detailInfo', 'claimStatus'], value: '1' }])
            }
          })
        } else {
          this.$toast(res.content.resultMessage || res.message || '请求失败');
        }
      }).catch(() => {
        // on cancel
      });
    },
    // 放弃
    showCancelPopup() {
      if (this.renewalDetail.detailInfo.edDistance && this.renewalDetail.detailInfo.allocationLimtDays && this.renewalDetail.detailInfo.edDistance * 1 > this.renewalDetail.detailInfo.allocationLimtDays * 1) {
        this.$refs.cancelPopup.parentMsg('1', this.renewalDetail.id);
      } else {
        this.$dialog.alert({
          title: '保单放弃',
          message: `该保单距终保日期不足${this.renewalDetail.detailInfo.allocationLimtDays}天，无法放弃`,
        }).then(async () => {
        })
      }
    }
  }
}
</script>
<style lang="less">
@import '../../../../assets/less/app/life/renewedInsurance/index.less';
.renewedInsuranceDetailPage .list-box .list .info-box {
  padding-left: 0.55rem !important;
}
</style>
