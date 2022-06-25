<template>
  <div class="conditionPopupPgae">
    <van-popup v-model="show" position="bottom">
      <div class="popupContent">
        <p class="name">请选择筛选条件</p>
        <h4>续保类型</h4>
        <ol class="select">
          <li :class="renewalType == '0' ? 'active' : ''" @click="renewalType = '0'">可续保</li>
          <li :class="renewalType == '1' ? 'active' : ''" @click="renewalType = '1'">应续保</li>
          <li :class="renewalType == '2' ? 'active' : ''" @click="renewalType = '2'">已续保</li>
        </ol>
        <h4>分配标识</h4>
        <ol class="select">
          <li :class="distributeFlag == '1' ? 'active' : ''" @click="distributeFlag = '1'">已认领</li>
          <li :class="distributeFlag == '0' ? 'active' : ''" @click="distributeFlag = '0'">未认领</li>
          <li :class="distributeFlag == '2' ? 'active' : ''" @click="distributeFlag = '2'">被分配</li>
        </ol>
        <h4>险种名称</h4>
        <ol class="select">
          <li :class="riskMark == '11' ? 'active' : ''" @click="riskMark = '11'">健康险</li>
        </ol>
        <h4>终保日期</h4>
        <ol class="select">
          <!-- <li :class="edDistance == '7' ? 'active' : ''" @click="edDistance = '7'; resetEdDistanceDate()">近一周</li>
          <li :class="edDistance == '15' ? 'active' : ''" @click="edDistance = '15'; resetEdDistanceDate()">近半月</li>
          <li :class="edDistance == '30' ? 'active' : ''" @click="edDistance = '30'; resetEdDistanceDate()">近一月</li> -->
          <li style="width:100%" class="flex" :class="endDate ? 'active' : ''" @click="showDatetimePicker('endDate')">
            <van-icon name="img/carInsurance/rili@2x.png" size="18" />&nbsp;&nbsp;<span v-if="endDate">{{endDate}}</span><span v-else>选择终保日期</span>
          </li>
        </ol>
        <h4>核保日期</h4>
        <ol class="select">
          <li style="width:100%" class="flex" :class="underwriteEndDate ? 'active' : ''" @click="showDatetimePicker('underwriteEndDate')">
            <van-icon name="img/carInsurance/rili@2x.png" size="18" />&nbsp;&nbsp;<span v-if="underwriteEndDate">{{underwriteEndDate}}</span><span v-else>选择核保日期</span>
          </li>
        </ol>
      </div>
      <van-row class="btnBar">
        <van-col span="12" @click="onReset">重置</van-col>
        <van-col span="12" @click="onConfirm">确认</van-col>
      </van-row>
    </van-popup>
    <xuBaoDatetimePicker ref="xuBaoDatetimePicker" @click="updataDatetime"></xuBaoDatetimePicker>
  </div>
</template>

<script>
import xuBaoDatetimePicker from './../../../../templates/xuBaoDatetimePicker.vue';
import { mapState } from 'vuex'

export default {
  components: {
    xuBaoDatetimePicker
  },
  data() {
    return {
      show: false,
      renewalType: '', // 续保类型
      distributeFlag: '', // 分配标识
      riskMark: '', // 险种类型
      endDate: '', // 终保日期
      underwriteEndDate:'',//核保日期
      edDistance: '', // 距终保日期天数(已废弃)
    };
  },
  computed: {
    ...mapState({
      query: state => state.renewedInsurance.noCar.query
    })
  },
  methods: {
    parentMsg() {
      this.show = true;
      this.renewalType = this.query.renewalType
      this.distributeFlag = this.query.distributeFlag
      this.riskMark = this.query.riskMark
      this.endDate = this.query.endDate
      this.underwriteEndDate = this.query.underwriteEndDate
      this.edDistance = this.query.edDistance
    },
    onReset() {
      this.renewalType = ''
      this.distributeFlag = ''
      this.riskMark = ''
      this.endDate = ''
      this.edDistance = ''
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['noCar', 'query', 'renewalType'], value: '' },
        { name: ['noCar', 'query', 'distributeFlag'], value: '' },
        { name: ['noCar', 'query', 'riskMark'], value: '' },
        { name: ['noCar', 'query', 'endDate'], value: '' },
        { name: ['noCar', 'query', 'underwriteEndDate'], value: '' },
        { name: ['noCar', 'query', 'edDistance'], value: '' }
      ])
    },
    onConfirm() {
      this.$store.commit('renewedInsurance/updateState', [
        { name: ['noCar', 'query', 'renewalType'], value: this.renewalType },
        { name: ['noCar', 'query', 'distributeFlag'], value: this.distributeFlag },
        { name: ['noCar', 'query', 'riskMark'], value: this.riskMark },
        { name: ['noCar', 'query', 'endDate'], value: this.endDate },
        { name: ['noCar', 'query', 'underwriteEndDate'], value: this.underwriteEndDate },
        { name: ['noCar', 'query', 'edDistance'], value: this.edDistance }
      ])
      this.show = false;
    },
    showDatetimePicker(res) {
      this.$refs.xuBaoDatetimePicker.parentMsg({ minDate: 0, maxDate: 0,mark:res });
    },
    updataDatetime(params) {
       if(params.mark == "endDate"){
        this.endDate = params.datetime
        this.edDistance = ''
      }else if(params.mark == "underwriteEndDate"){
         this.underwriteEndDate = params.datetime
      }
    },
    resetEdDistanceDate() {
      this.edDistanceDate = ''
    }
  }
};
</script>
<style lang="less">
.conditionPopupPgae {
  .popupContent {
    min-height: 100vw;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 0 1rem;
    .select {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.8rem;
      li {
        color: #999999;
        border: 1px solid #d3d3d3;
        padding: 0.5em 0.9em;
        font-size: 0.73rem;
        border-radius: 0.3rem;
        margin: 0 0.7rem 0.7rem 0;
      }
      li.active {
        color: #029dff;
        border: 1px solid #029dff;
        background-color: #e5f5ff;
      }
    }
    .name {
      font-size: 0.8rem;
      opacity: 0.5;
    }
    h4 {
      margin: 0;
      padding: 0;
      font-size: 0.85rem;
    }
  }
  .van-row.btnBar {
    width: 100%;
    box-shadow: 0 -3px 8px #deeef8;
    .van-col {
      color: #459cf8;
      background: white;
      padding: 0.7rem 0;
      text-align: center;
    }
    .van-col:nth-of-type(2) {
      color: white;
      background: linear-gradient(to right, #245cf6, #459cf8);
    }
  }
  p {
    margin: 1em 0;
  }
}
</style>