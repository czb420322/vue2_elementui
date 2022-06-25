<template>
  <div class="subsidyRule">
    <van-popup v-model="show">
      <i class="agent_btn" @click="goSkip()" ></i>
      <div class="content-text">
         <div class="">
           <!-- updBank 修改银行卡页面用到 -->
           <p class="hint_txt" v-if="mark == 1" style="padding: 30px;">已提交审核、支付中的订单不会进行修改银行卡，如有问题请联系运营人员。</p>
           <p class="hint_txt" v-else-if="judge">规模津贴：根据您当月达成的保费规模情况（非车产品），可享受对应梯级的规模津贴奖励。<br>
              增员津贴：根据您平台档期增员目标，裂变发展下级并出单（非车产品），代理人将会获得相应的津贴奖励。<br>
              管理津贴：裂变发展下级，根据您下级出单情况（非车产品），代理人可获得对应比例津贴奖励。<br>
              育成津贴：裂变发展下级，如下级裂变人数及产能（非车产品）达到一定规模形成虚拟团队，其上级代理人可以拿到下级代理人所管理虚拟团队每月保费产能相应比例的津贴奖励。</p>
          <p class="hint_txt" v-else>
            规模津贴：根据您当月达成的保费规模情况（含车险+非车产品），可享受对应梯级的规模津贴奖励。<br>
            增员津贴：根据您平台档期增员目标，裂变发展下级并出单（含车险+非车产品），代理人将会获得相应的津贴奖励。<br>
            管理津贴：裂变发展下级，根据您下级出单情况（含车险+非车产品），代理人可获得对应比例津贴奖励。<br>
            育成津贴：裂变发展下级，如下级裂变人数及产能（含车险+非车产品）达到一定规模形成虚拟团队，其上级代理人可以拿到下级代理人所管理虚拟团队每月保费产能相应比例的津贴奖励。
          </p>
          <div class="img_box">
            <img src="./../../public/img/page/base/gb_b.png" width="10%">
          </div>
          </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      show: false,
      judge:true,
      mark:0,
    };
  },
  computed:{
    ...mapState({
      UserInfo: state => state.my.UserInfo
    })
  },
  created() {
     //处理四川
    if(this.UserInfo.OrgCode.substring(0,2) == '21'){
      this.judge = false;
    }
  },
  methods: {
    goSkip(){
      this.show=false
      //  this.$parent.goAgency();
      // this.$router.push({path: '/sign'});
    },
    subsidyRuleMsg(state,mark) {
      this.mark = mark || 0
      this.show = state;
    }
  },
};
</script>

<style lang="less">
.subsidyRule {
  .van-overlay {
    z-index: 10000000 !important;
  }
  .van-popup {
    z-index: 10000000 !important;
    width: 100vw;
    // height: 100vw;
    background: none;
  
    overflow: hidden;
  }
  .agent_btn{
    position: absolute;
    left: 45%;
    bottom: 3%;
    display: block;
    width: 10%;
    height: 9%;
  }
  .hint_txt{
    width: 80%;
    font-size: 12px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 6px;
  }
  .img_box{
    text-align: center;
    margin-top: 10px;
  }
}
</style>