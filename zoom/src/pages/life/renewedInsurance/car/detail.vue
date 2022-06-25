<template>
  <div class="renewedInsurancePage renewedInsuranceDetailPage">
    <v-header :title="{ name: title }"></v-header>
    <i class="navBg" :style="{ 'height': ($iosSystem + 78) + 'px' }"></i>
    <ol class="list-box" :style="{ 'margin-top': ($iosSystem + 50) + 'px' }">
      <li class="list">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="基础信息" name="1" :icon="$CTXBASE + '/img/carInsurance/ic_info.png'">
            <div class="info-box">
              <!-- 续保状态 0-可续保 1-应续保', -->
              <p class="item"><span class="label">续保类型</span><span class="txt right">{{renewalDetail.renewType == 0 ? '可续保' : '应续保' }}</span></p>
              <p class="item"><span class="label">出险次数</span><span class="txt right">{{renewalDetail.cxTimes || 0}}次</span></p>
              <p class="item"><span class="label">已报告赔款</span><span class="txt right">{{renewalDetail.yibgpk || 0}}元</span></p>
              <p class="item"><span class="label">距终保日期</span><span class="txt right">{{renewalDetail.endDateDistance}}天</span></p>
              <p class="item"><span class="label">总保费</span><span class="txt right">{{renewalDetail.sumPremium || 0}}元</span></p>
              <p class="item"><span class="label">联系人</span><span class="txt right">{{renewalDetail.contactName || ''}}</span></p>
              <p class="item"><span class="label">联系电话</span>
                <span class="txt right tel" v-if="renewalDetail.contactMobile" @click="goCollectLog('igr001', renewalDetail.contactMobile)">{{renewalDetail.contactMobile | phoneConceal}}&nbsp;
                  <van-icon :name="$CTXBASE + '/img/carInsurance/ic_phone.png'" size="18" />
                </span>
                <span v-else class="txt right">{{renewalDetail.contactMobile | phoneConceal}}</span>
              </p>
              <p class="item"><span class="label">报案电话</span>
                <span class="txt right tel" v-if="renewalDetail.reportPhone" @click="goCollectLog('igr005', renewalDetail.reportPhone)">{{renewalDetail.reportPhone | phoneConceal}}&nbsp;
                  <van-icon :name="$CTXBASE + '/img/carInsurance/ic_phone.png'" size="18" />
                </span>
                <span v-else class="txt right">{{renewalDetail.reportPhone | phoneConceal}}</span>
              </p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </li>
      <li class="list">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="车辆信息" name="2" :icon="$CTXBASE + '/img/carInsurance/info_car@2x.png'">
            <div class="info-box">
              <p class="item"><span class="label">车牌号</span><span class="txt right">{{renewalDetail.licenseNo | licenseNoConceal }}</span></p>
              <p class="item"><span class="label">车架号</span><span class="txt right">{{renewalDetail.frameNo | frameNoConceal }}</span></p>
              <p class="item"><span class="label">发动机号</span><span class="txt right">{{renewalDetail.engineNo | engineNoConceal }}</span></p>
              <p class="item"><span class="label">品牌型号</span><span class="txt right">{{renewalDetail.brandId || ''}}</span></p>
              <p class="item"><span class="label">注册日期</span><span class="txt right">{{renewalDetail.enrollDate | timestampToTime | dateDayFilter}}</span></p>
              <p class="item"><span class="label">核定载客量</span><span class="txt right">{{renewalDetail.seatCountShow || ''}}</span></p>
              <p class="item"><span class="label">车价</span><span class="txt right">{{renewalDetail.carPrice || 0}}元</span></p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </li>
      <li class="list" v-if="renewalDetail.policyCI">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="交强险" name="3" :icon="$CTXBASE + '/img/carInsurance/info_car@2x.png'">
            <div class="info-box">
              <p class="item"><span class="label">保单号</span><span class="txt right">{{renewalDetail.policyCI.corePolicyNo}}</span></p>
              <p class="item"><span class="label">保障日期</span><span class="txt right">{{renewalDetail.policyCI.startDate | timestampToTime | dateDayFilter}}至{{renewalDetail.policyCI.endDate | timestampToTime | dateDayFilter}}</span></p>
              <p class="item"><span class="label">保费（不含车船税）</span><span class="txt right">{{renewalDetail.policyCI.premium || 0}}元</span></p>
              <p class="item" v-for="(item, index) in renewalDetail.policyCI.riskList" :key="index"><span class="label">{{item.riskName}}</span><span class="txt right">{{item.riskPremium || 0}}元</span></p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </li>
      <li class="list" v-if="renewalDetail.policyBI">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="商业险" name="4" :icon="$CTXBASE + '/img/carInsurance/info_car@2x.png'">
            <div class="info-box">
              <p class="item"><span class="label">保单号</span><span class="txt right">{{renewalDetail.policyBI.corePolicyNo}}</span></p>
              <p class="item"><span class="label">保障日期</span><span class="txt right">{{renewalDetail.policyBI.startDate | timestampToTime | dateDayFilter}}至{{renewalDetail.policyBI.endDate | timestampToTime | dateDayFilter}}</span></p>
              <p class="item"><span class="label">保费</span><span class="txt right">{{renewalDetail.policyBI.premium || 0}}元</span></p>
              <p class="item" v-for="(item, index) in renewalDetail.policyBI.riskList" :key="index"><span class="label">{{item.riskName}}</span><span class="txt right">{{item.riskPremium || 0}}元</span></p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </li>
      <li class="list">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="投被保信息" name="5" :icon="$CTXBASE + '/img/carInsurance/ic_info_men@2x.png'">
            <div class="info-box">
              <p class="item item-name"><span class="label-name">{{renewalDetail.carOwnerName}}</span>&nbsp;&nbsp;<van-tag type="primary">车主</van-tag>
              </p>
              <p class="item"><span class="label">证件号码</span><span class="txt right">{{renewalDetail.carOwnerIdNo | idNoConceal}}</span></p>
              <p class="item"><span class="label">手机号</span><span class="txt right">{{renewalDetail.carOwnerMobile | phoneConceal}}</span></p>
              <van-divider />
              <p class="item item-name"><span class="label-name">{{renewalDetail.appntName}}</span>&nbsp;&nbsp;<van-tag type="primary">投保人</van-tag>
              </p>
              <p class="item"><span class="label">证件号码</span><span class="txt right">{{renewalDetail.appntIdNo | idNoConceal}}</span></p>
              <p class="item"><span class="label">手机号</span><span class="txt right">{{renewalDetail.appntMobile | phoneConceal}}</span></p>
              <p class="item"><span class="label">地址</span><span class="txt right">{{renewalDetail.appntAddress}}</span></p>
              <van-divider />
              <p class="item item-name"><span class="label-name">{{renewalDetail.insureName}}</span>&nbsp;&nbsp;<van-tag type="primary">被保人</van-tag>
              </p>
              <p class="item"><span class="label">证件号码</span><span class="txt right">{{renewalDetail.insureIdNo | idNoConceal}}</span></p>
              <p class="item"><span class="label">手机号</span><span class="txt right">{{renewalDetail.insureMobile | phoneConceal}}</span></p>
              <p class="item"><span class="label">地址</span><span class="txt right">{{renewalDetail.insureName}}</span></p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </li>
      <li class="list">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="渠道信息" name="6" :icon="$CTXBASE + '/img/carInsurance/info_car@2x.png'">
            <div class="info-box">
              <p class="item"><span class="label">归属渠道</span><span class="txt right">{{renewalDetail.channelType || ''}}</span></p>
              <p class="item"><span class="label">业务来源</span><span class="txt right">{{renewalDetail.businessSource || ''}}</span></p>
              <p class="item"><span class="label">代理合同协议号</span><span class="txt right">{{renewalDetail.agencyAgreementNo || ''}}</span></p>
              <p class="item"><span class="label">代理/经纪/渠道名称</span><span class="txt right">{{renewalDetail.agencyChannelName || ''}}</span></p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </li>
    </ol>
    <div class="btnBar" v-if="renewalDetail.isOperate == 1">
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" v-if="renewalDetail.allocationStatus == 0 && renewalDetail.claimStatus == 0 && (renewalDetail.renewType == 0 || renewalDetail.renewType == 1) && renewalDetail.renewFlag == 0 ? true : false" @click="renewalClaim">认领</van-button>
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" v-else-if="renewalDetail.claimStatus == 1 || renewalDetail.allocationStatus == 1" @click="showCancelPopup">放弃</van-button>
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="renewalDetail.renewType == 1" @click="onsubmit">一键续保</van-button>
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
      query: state => state.renewedInsurance.car.query,
      renewalDetail: state => state.renewedInsurance.car.renewalDetail,
      renewalList: state => state.renewedInsurance.car.renewalList,
      userInfo: state => state.my.UserInfo,
    })
  },
  data() {
    return {
      title: this.$route.meta.title,
      licenseName: '',
      show: true,
      disabled: false,
      activeNames: ['1'],

    }
  },
  created() {

  },
  methods: {
    close() {
      this.show = false;
    },
    async onsubmit() {
      if (this.userInfo.openCarFunction == '0') {
        this.$store.commit('car/resetState');
        this.$store.commit('car/updateCarState', [
          { name: ['vehicleDTO', 'frameNo'], value: this.renewalDetail.frameNo }
        ])
        await this.$store.dispatch('car/renewInsurance')
        if (this.renewalDetail.carType == 'H') {
          //货车
          this.goPage('carInsurance?vehicleType=02')
        } else if (this.renewalDetail.carType == 'M') {
          //摩托车
          this.goPage('carInsurance?vehicleType=03')
        } else {
          //默认客车
          this.goPage('carInsurance')
        }
      } else {
        this.$toast('功能开发中，敬请期待！');
      }
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
          puid: this.renewalDetail.policyNo,
        },
        eventAttributes: {
          phoneNumber: phone || '',
          callStartTime: compCheck.transformDatesTimetamp() || '',
          frameNo: this.renewalDetail.frameNo
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
        const res = await this.$store.dispatch('renewedInsurance/renewalClaim', {
          claimAll: false,
          tableIds: this.renewalDetail.tableId
        })
        if (res.code == 0 && res.content.result == '0') {
          this.$toast('认领成功');
          this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalDetail', 'claimStatus'], value: '1' }])
          this.renewalList.forEach((item, index) => {
            if (item.baseInfo.tableId == this.renewalDetail.tableId) {
              this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalList', index, 'baseInfo', 'claimStatus'], value: '1' }])
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
      if (this.renewalDetail.endDateDistance && this.renewalDetail.allocationLimtDays && this.renewalDetail.endDateDistance * 1 > this.renewalDetail.allocationLimtDays * 1) {
        this.$refs.cancelPopup.parentMsg('0', this.renewalDetail.tableId);
      } else {
        this.$dialog.alert({
          title: '保单放弃',
          message: `该保单距终保日期不足${this.renewalDetail.allocationLimtDays}天，无法放弃`,
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