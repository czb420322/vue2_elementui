<template>
  <div>
    <ol class="_content">
      <li class="list queryBar">
        <van-popover v-model="showPopover" trigger="click" theme="dark" placement="bottom-start" :actions="query.actions" @select="onSelect">
          <template #reference>
            {{query.actionsName}}&nbsp;
            <!-- <van-icon size="19" :name="$CTXBASE + '/img/carInsurance/xiala@2x.png'" /> -->
            <van-icon name="logistics" size="19"/>
            &nbsp;&nbsp;
          </template>
        </van-popover>
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="licenseNo" maxlength="8" v-if="query.actionsName == query.actions[0].text" @input="updateLicenseNo">
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="appntName" maxlength="50" v-else-if="query.actionsName == query.actions[1].text">
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="agreementNo" maxlength="50" v-else-if="query.actionsName == query.actions[2].text">
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="agencyChannelName" maxlength="50" v-else-if="query.actionsName == query.actions[3].text">
        <van-button class="queryBtn" type="info" size="small" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="loading" @click.stop="onsubmit">查询</van-button>
      </li>
    </ol>
    <div class="historyBar">
      <div class="tag">
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['car', 'query','renewalType'], value: '' }])" v-if="query.renewalType == '0' || query.renewalType">{{query.renewalType == '0' ? '可续保': query.renewalType == '1' ? '应续保' : query.renewalType == '2' ? '已续保' : '' }}</van-tag>
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['car', 'query','distributeFlag'], value: '' }])" v-if="query.distributeFlag == '0' || query.distributeFlag">{{query.distributeFlag == '0' ? '未认领': query.distributeFlag == '1' ? '已认领' : query.distributeFlag == '2' ? '被分配' : '' }}</van-tag>
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['car', 'query','riskMark'], value: '' }])" v-if="query.riskMark">{{query.riskMark == '0801' ? '交强险': query.riskMark == '0802' ? '商业险' : '' }}</van-tag>
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['car', 'query','edDistance'], value: '' }, { name: ['car', 'query','edDistanceDate'], value: '' }])" v-if="this.query.edDistance || this.query.edDistanceDate">
          终保日期<span v-if='this.query.edDistance '>{{this.query.edDistance }}</span><span v-if="this.query.edDistanceDate">{{this.query.edDistanceDate | getDistanceDate}}</span>天
        </van-tag>
      </div>
    </div>
    <ol class="list-box" :style="{ 'padding-bottom': ($iosSystem + 55) + 'px' }">
      <van-list ref="list" v-model="loading" :finished="renewalPagination.finished" finished-text="没有更多了" @load="onLoad">
        <li class="list" v-for="(item,index) in renewalList" :key="index">
          &nbsp;&nbsp;
          <van-checkbox class="project" icon-size="18px" v-if="item.baseInfo.isOperate == 1 && item.baseInfo.allocationStatus == 0 && item.baseInfo.claimStatus == 0 && (item.baseInfo.renewType == 0 || item.baseInfo.renewType == 1) && item.baseInfo.renewFlag == 0" v-model="item.checked" @change="listChecked(item.checked, index)"></van-checkbox>
          <div class="rightCnt" @click="goDetail(item)">
            <h5 class="name">
              <div :style="{ 'color': item.detailInfo.endDateDistance <= 10 ? 'red' : '' }" ><span class="list_baodan">保单号：</span>{{item.baseInfo.policyNo}}&nbsp;&nbsp;&nbsp;<span v-if="item.detailInfo.endDateDistance <= 10" style="color: #0252ff" >即将终保</span></div>
            </h5>
            <div class="info-box">
              <p class="item"><span class="label">产品名称</span><span class="txt">{{item.baseInfo.riskName}}险</span></p>
              <p class="item"><span class="label">投保人</span><span class="txt">{{item.baseInfo.appntName}}</span></p>
              <p class="item"><span class="label">车牌号</span><span class="txt">{{item.baseInfo.licenseNo}}</span></p>
              <p class="item"><span class="label">终保日期</span><span class="txt">{{item.baseInfo.endDate}}</span></p>
            </div>
          </div>
          <van-icon class="label_icon" size="44" v-if="item.baseInfo.allocationStatus == 0 && item.baseInfo.claimStatus == 0" :name="$CTXBASE + '/img/carInsurance/label_icon_1.png'" />
          <van-icon class="label_icon" size="44" v-else-if="item.baseInfo.claimStatus == 1" :name="$CTXBASE + '/img/carInsurance/label_icon_2.png'" />
          <van-icon class="label_icon" size="44" v-else-if="item.baseInfo.allocationStatus == 1" :name="$CTXBASE + '/img/carInsurance/label_icon_3.png'" />
        </li>
      </van-list>
    </ol>
    <footer class="footer_btn_bar">
      <van-checkbox class="project" icon-size="18px" v-model="renewalAllChecked" @click="allChecked">全选</van-checkbox>
      <van-button type="info" color="linear-gradient(to right, #245cf6, #459cf8)" @click="renewalClaim">&nbsp;认领&nbsp;</van-button>
    </footer>
    <conditionPopup ref="conditionPopup"></conditionPopup>
  </div>
</template>

<script>
import conditionPopup from './conditionPopup.vue'
import compCheck from '../../../../assets/js/util/comp-check';
import { mapState } from 'vuex'

export default {
  components: {
    conditionPopup
  },
  computed: {
    ...mapState({
      query: state => state.renewedInsurance.car.query,
      renewalPagination: state => state.renewedInsurance.car.renewalPagination,
    }),
    renewalList: {
      get() {
        return this.$store.state.renewedInsurance.car.renewalList
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalList'], value: value }])
      }
    },
    loading: {
      get() {
        return this.$store.state.renewedInsurance.car.renewalPagination.loading
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalPagination', 'loading'], value: value }])
      }
    },
    appntName: {
      get() {
        return this.$store.state.renewedInsurance.car.query.appntName
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'query', 'appntName'], value: value }])
      }
    },
    agreementNo: {
      get() {
        return this.$store.state.renewedInsurance.car.query.agreementNo
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'query', 'agreementNo'], value: value }])
      }
    },
    agencyChannelName: {
      get() {
        return this.$store.state.renewedInsurance.car.query.agencyChannelName
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'query', 'agencyChannelName'], value: value }])
      }
    },
    renewalAllChecked: {
      get() {
        return this.$store.state.renewedInsurance.car.renewalAllChecked
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalAllChecked'], value: value }])
      }
    }
  },
  data() {
    return {
      title: this.$route.meta.title,
      licenseNo: '',
      showPopover: false,
      active: 1
    }
  },
  filters: {
    getDistanceDate: function (value) {
      if (value) { return compCheck.getDistanceDate(value) }
      return '';
    }
  },
  created() {
    this.licenseNo = this.query.licenseNo
  },
  methods: {
    close(type) {
      this.$store.commit('renewedInsurance/updateState', type)
    },
    onSelect(action) {
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['car', 'query', 'actionsName'], value: action.text },
        { name: ['car', 'query', 'licenseNo'], value: '' }
      ])
      this.licenseNo = ''
      this.appntName = ''
      this.agreementNo = ''
      this.agencyChannelName = ''
    },
    onsubmit() {
      if (this.query.actionsName == '车牌号' && this.licenseNo && !compCheck.isVehicleNumber2(this.licenseNo)) {
        this.$toast('请输入正确的车牌号码！');
        return;
      }
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['car', 'renewalPagination', 'finished'], value: false },
        { name: ['car', 'renewalPagination', 'currentPage'], value: 1 }
      ])
      this.loading = false
      this.renewalList = []
      setTimeout(() => {
        this.$refs.list.check();
      }, 100);
    },
    showConditionPopup() {
      this.$refs.conditionPopup.parentMsg();
    },
    onLoad() {
      this.$store.dispatch('renewedInsurance/getRenewalList')
    },
    // 车牌号
    updateLicenseNo(e) {
      let value = e.target.value
      value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '').toUpperCase()
      value = value.toUpperCase()
      this.licenseNo = value
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['car', 'query', 'licenseNo'], value: value },
      ])
    },
    goDetail(item) {
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['car', 'renewalDetail'], value: { ...item.detailInfo, policyNo: item.baseInfo.policyNo } },
      ])
      this.goPage('renewedInsuranceDetail')
    },
    allChecked() {
      this.renewalList.forEach((item, index) => {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalList', index, 'checked'], value: this.renewalAllChecked }])
      });
    },
    listChecked(checked, index) {
      this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalList', index, 'checked'], value: checked }])
      if (!checked) {
        this.renewalAllChecked = false
      }
    },
    // 认领
    renewalClaim() {
      let arr = this.renewalList.filter(item => {
        return item.baseInfo.isOperate == 1 && item.baseInfo.allocationStatus == 0 && item.baseInfo.claimStatus == 0 && (item.baseInfo.renewType == 0 || item.baseInfo.renewType == 1) && item.baseInfo.renewFlag == 0 && item.checked
      })
      if (!arr.length) {
        this.$toast('暂无要认领的保单');
        return;
      }
      this.$dialog.confirm({
        title: '认领',
        message: '是否认领选择的数据，认领后该数据将无法被分配给其他业务员',
      }).then(async () => {
        // on confirm 
        const res = await this.$store.dispatch('renewedInsurance/renewalClaim', {
          claimAll: this.renewalAllChecked,
          tableIds: arr.map(item => {
            return item.baseInfo.tableId
          }).join(',')
        })
        if (res.code == 0 && res.content.result == '0') {
          this.$toast('认领成功');
          this.onsubmit()
          // this.renewalList.forEach((item, index) => {
          //   arr.forEach(element => {
          //     if (item.baseInfo.tableId == element.baseInfo.tableId) {
          //       this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalList', index, 'baseInfo', 'claimStatus'], value: '1' }])
          //     }
          //   })
          // })
          // this.$store.commit('renewedInsurance/updateState', [
          //   { name: ['car', 'renewalPagination', 'finished'], value: false }
          // ])
        } else {
          this.$toast(res.content.resultMessage || res.message || '请求失败');
        }
      }).catch(() => {
        // on cancel
      });
    }
  }
}
</script>
<style lang="less">
@import '../../../../assets/less/app/life/renewedInsurance/index.less';
</style>
<style lang="less" scoped>
.renewedInsurancePage .list-box .list {
  display: flex;
  margin: 12px 12px 0 12px;
  .name {
    margin: 0 0.4rem;
  }
  .info-box {
    padding: 0 0.55rem 0.55rem 0;
  }
}
</style>