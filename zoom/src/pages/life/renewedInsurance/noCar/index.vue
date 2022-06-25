<template>
  <div>
    <ol class="_content">
      <li class="list queryBar">
        <van-popover v-model="showPopover" trigger="click" theme="dark" placement="bottom-start" :actions="query.actions" @select="onSelect">
          <template #reference>
            {{query.actionsName}}&nbsp;
            <!-- <van-icon size="19" :name="$CTXBASE + '/img/carInsurance/xiala@2x.png'" /> -->
            <van-icon name="description" size="19"/>
            &nbsp;&nbsp;
          </template>
        </van-popover>
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="appntName" maxlength="50" v-if="query.actionsName == query.actions[0].text">
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="riskName" maxlength="50" v-else-if="query.actionsName == query.actions[1].text">
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="agreementNo" maxlength="50" v-else-if="query.actionsName == query.actions[2].text">
        <input type="text" :placeholder="'输入' + query.actionsName" v-model.trim="agencyChannelName" maxlength="50" v-else-if="query.actionsName == query.actions[3].text">
        <van-button class="queryBtn" type="info" size="small" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="loading" @click.stop="onsubmit">查询</van-button>
      </li>
    </ol>
    <div class="historyBar">
      <div class="tag">
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['noCar', 'query','renewalType'], value: '' }])" v-if="query.renewalType == '0' || query.renewalType">{{query.renewalType == '0' ? '可续保': query.renewalType == '1' ? '应续保' : query.renewalType == '2' ? '已续保' : '' }}</van-tag>
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['noCar', 'query','distributeFlag'], value: '' }])" v-if="query.distributeFlag == '0' || query.distributeFlag">{{query.distributeFlag == '0' ? '未认领': query.distributeFlag == '1' ? '已认领' : query.distributeFlag == '2' ? '被分配' : '' }}</van-tag>
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['noCar', 'query','riskMark'], value: '' }])" v-if="query.riskMark">{{query.riskMark == '11' ? '健康险' : '' }}</van-tag>
        <van-tag round closeable color="#029dff" type="primary" @close="close([{ name: ['noCar', 'query','edDistance'], value: '' }, { name: ['noCar', 'query','edDistanceDate'], value: '' }])" v-if="this.query.edDistance || this.query.edDistanceDate">
          终保日期<span v-if='this.query.edDistance '>{{this.query.edDistance }}</span><span v-if="this.query.edDistanceDate">{{this.query.edDistanceDate | getDistanceDate}}</span>天
        </van-tag>
      </div>
    </div>
    <ol class="list-box" :style="{ 'padding-bottom': ($iosSystem + 55) + 'px' }">
      <van-list ref="list" v-model="loading" :finished="renewalPagination.finished" finished-text="没有更多了" @load="onLoad">
        <li class="list" v-for="(item,index) in renewalList" :key="index">
          &nbsp;&nbsp;
          <van-checkbox class="project" icon-size="18px" v-if="item.isOperate == 1 && item.detailInfo.allocationStatus == 0 && item.detailInfo.claimStatus == 0 && item.detailInfo.renewFlag == 0" v-model="item.checked" @change="listChecked(item.checked, index)"></van-checkbox>
          <div class="rightCnt" @click="goDetail(item)">
            <h5 class="name">
              <div :style="{ 'color': item.detailInfo.edDistance <= 10 ? 'red' : '' }" ><span class="list_baodan">保单号：</span>{{item.corePolicyNo}}&nbsp;&nbsp;&nbsp;<span v-if="item.detailInfo.edDistance <= 10" style="color: #0252ff">即将终保</span></div>
            </h5>
            <div class="info-box">
              <p class="item"><span class="label">产品名称</span><span class="txt">{{item.riskName}}险</span></p>
              <p class="item"><span class="label">投保人</span><span class="txt">{{item.appntName}}</span></p>
              <p class="item"><span class="label">保障期限</span><span class="txt">{{item.startDate | dateDayFilter}}至{{item.endDate | dateDayFilter}}</span></p>
            </div>
          </div>
          <van-icon class="label_icon" size="44" v-if="item.detailInfo.allocationStatus == 0 && item.detailInfo.claimStatus == 0" :name="$CTXBASE + '/img/carInsurance/label_icon_1.png'" />
          <van-icon class="label_icon" size="44" v-else-if="item.detailInfo.claimStatus == 1" :name="$CTXBASE + '/img/carInsurance/label_icon_2.png'" />
          <van-icon class="label_icon" size="44" v-else-if="item.detailInfo.allocationStatus == 1" :name="$CTXBASE + '/img/carInsurance/label_icon_3.png'" />
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
      query: state => state.renewedInsurance.noCar.query,
      renewalPagination: state => state.renewedInsurance.noCar.renewalPagination,
    }),
    renewalList: {
      get() {
        return this.$store.state.renewedInsurance.noCar.renewalList
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalList'], value: value }])
      }
    },
    loading: {
      get() {
        return this.$store.state.renewedInsurance.noCar.renewalPagination.loading
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalPagination', 'loading'], value: value }])
      }
    },
    appntName: {
      get() {
        return this.$store.state.renewedInsurance.noCar.query.appntName
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'query', 'appntName'], value: value }])
      }
    },
    riskName: {
      get() {
        return this.$store.state.renewedInsurance.noCar.query.riskName
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'query', 'riskName'], value: value }])
      }
    },
    agreementNo: {
      get() {
        return this.$store.state.renewedInsurance.noCar.query.agreementNo
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'query', 'agreementNo'], value: value }])
      }
    },
    agencyChannelName: {
      get() {
        return this.$store.state.renewedInsurance.noCar.query.agencyChannelName
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'query', 'agencyChannelName'], value: value }])
      }
    },
    renewalAllChecked: {
      get() {
        return this.$store.state.renewedInsurance.noCar.renewalAllChecked
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalAllChecked'], value: value }])
      }
    }
  },
  data() {
    return {
      title: this.$route.meta.title,
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
  methods: {
    close(type) {
      this.$store.commit('renewedInsurance/updateState', type)
    },
    onSelect(action) {
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['noCar', 'query', 'actionsName'], value: action.text }
      ])
      this.appntName = ''
      this.riskName = ''
      this.agreementNo = ''
      this.agencyChannelName = ''
    },
    onsubmit() {
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['noCar', 'renewalPagination', 'finished'], value: false },
        { name: ['noCar', 'renewalPagination', 'currentPage'], value: 1 }
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
      this.$store.dispatch('renewedInsurance/getRenewInfo')
    },
    goDetail(item) {
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['noCar', 'renewalDetail'], value: item }
      ])
      this.goPage('noCarRenewedInsuranceDetail')
    },
    allChecked() {
      this.renewalList.forEach((item, index) => {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalList', index, 'checked'], value: this.renewalAllChecked }])
      });
    },
    listChecked(checked, index) {
      this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalList', index, 'checked'], value: checked }])
      if (!checked) {
        this.renewalAllChecked = false
      }
    },
    // 认领
    renewalClaim() {
      let arr = this.renewalList.filter(item => {
        return item.isOperate == 1 && item.detailInfo.allocationStatus == 0 && item.detailInfo.claimStatus == 0 && item.detailInfo.renewFlag == 0 && item.checked
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
        const res = await this.$store.dispatch('renewedInsurance/noCarRenewalClaim', {
          claimAll: this.renewalAllChecked,
          tableIds: arr.map(item => {
            return item.id
          }).join(',')
        })
        if (res.code == 0 && res.content.result == '0') {
          this.$toast('认领成功');
          this.onsubmit()
          // this.renewalList.forEach((item, index) => {
          //   arr.forEach(element => {
          //     if (item.id == element.id) {
          //       this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalList', index, 'detailInfo', 'claimStatus'], value: '1' }])
          //     }
          //   })
          // })
          // this.$store.commit('renewedInsurance/updateState', [
          //   { name: ['noCar', 'renewalPagination', 'finished'], value: false }
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