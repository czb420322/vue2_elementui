<template>
  <div class="integralPopup">
    <van-popup v-model="show" position="bottom">
      <div class="popupContent">
        <p class="name">请选择筛选条件</p>
        <h4>收入</h4>
        <ol class="select">
          <li :class="all ? 'active' : ''" @click="screen('全部',all)">全部</li>
          <li :class="activate ? 'active' : ''" @click="screen('激活代理人',activate)">激活代理人</li>
          <li :class="issue ? 'active' : ''" @click="screen('出单',issue)">出单</li>
          <li :class="tying ? 'active' : ''" @click="screen('搭售',tying)">搭售</li>
          <li :class="renewal ? 'active' : ''" @click="screen('续保',renewal)">续保</li>
          <li :class="promotion ? 'active' : ''" @click="screen('短促',promotion)">短促</li>
        </ol>
        <h4>支出</h4>
        <ol class="select">
          <li :class="conversion ? 'active' : ''" @click="screen('兑换i钻',conversion)">兑换i钻</li>
        </ol>
        <h4>日期</h4>
        <ol class="select">
          <li style="width:100%" class="flex" :class="endDate ? 'active' : ''" @click="showDatetimePicker('endDate')">
            <van-icon name="img/carInsurance/rili@2x.png" size="18" />&nbsp;&nbsp;<span v-if="endDate">{{endDate}}</span><span v-else>选择日期</span>
          </li>
        </ol>
      </div>
      <van-row class="btnBar">
        <van-col span="12" @click="onReset">重置</van-col>
        <van-col span="12" @click="onConfirm">确认</van-col>
      </van-row>
    </van-popup>
    <integralDatetimePicker ref="integralDatetimePicker" @click="updataDatetime"></integralDatetimePicker>
  </div>
</template>

<script>
import integralDatetimePicker from '@/templates/integralDatetimePicker.vue';
import { mapState } from 'vuex'

export default {
  components: {
    integralDatetimePicker
  },
  data() {
    return {
      show: false,
      all: false, // 全部
      activate:false,//激活代理人
      issue:false,//出单
      tying:false,//搭售
      renewal:false,//续保
      promotion:false,//短促
      conversion:false,//兑换i钻
      endDate: '', // 日期
    };
  },
  computed: {
    ...mapState({
      query: state => state.renewedInsurance.car.query
    })
  },
  methods: {
    screen(name,parameter){
      if(name == '全部'){
        this.all = !parameter
        this.activate = false
        this.issue = false
        this.tying = false
        this.renewal = false
        this.promotion = false
      }else if(name == '激活代理人'){
        this.activate = !parameter
        this.all = false
      }else if(name == '出单'){
        this.issue = !parameter
        this.all = false
      }else if(name == '搭售'){
        this.tying = !parameter
        this.all = false
      }else if(name == '续保'){
        this.renewal = !parameter
        this.all = false
      }else if(name == '短促'){
        this.promotion = !parameter
        this.all = false
      }else if(name == '兑换i钻'){
        this.conversion = !parameter
      }
    },
    parentMsg() {
      this.show = true;
      this.endDate = this.query.endDate
      this.underwriteEndDate = this.query.underwriteEndDate
    },
    onReset() {
      this.all = false
      this.activate = false
      this.issue = false
      this.tying = false
      this.renewal = false
      this.conversion = false
      this.promotion = false
      this.endDate = ''
    },
    onConfirm() {
      let ruleType ='';
      let incomeType ='';
      let settleDate = '';
      if(this.all){
        ruleType='1,2,3,4,5';
      }else if(this.activate && this.issue && this.tying && this.renewal && this.promotion){
        ruleType='1,2,3,4,5';
      }
      if(ruleType == ''){
        if(this.activate){
          ruleType = '1'
        }
        if(this.issue){
          ruleType = ruleType+',2'
        }
        if(this.tying){
          ruleType = ruleType+',3'
        }
        if(this.renewal){
          ruleType = ruleType+',4'
        }
        if(this.promotion){
          ruleType = ruleType+',5'
        }
      }
      if(this.conversion){
        incomeType = '2'
      }
      if(ruleType != '' && incomeType != ''){
        incomeType = incomeType+',1'
      }
      if(ruleType != '' && incomeType == ''){
         incomeType ='1'
      }
      if(this.endDate){
        settleDate = this.endDate
      }
      
      this.$emit('click',ruleType,incomeType,settleDate);
      this.show = false;
    },
    showDatetimePicker(res) {
      this.$refs.integralDatetimePicker.parentMsg({ minDate: 0, maxDate: 0,mark:res });
    },
    updataDatetime(params) {
      if(params.mark == "endDate"){
        this.endDate = params.datetime
      }
      
    },
    // resetEdDistanceDate() {
    //   this.endDate = ''
    // }
  }
};
</script>
<style lang="less">
.integralPopup {
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