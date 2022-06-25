<template>
  <div class="activityRulesPage">
    <van-popup v-model="show">
      <i class="close_btn" @click="show=false" ></i>
      <i class="agent_btn" @click="goAgency()" ></i>
      <div class="content-text">
        <p>成为i国任代理人，便捷好处多</p>
        <p>优势一：展业更方便</p>
        <p>平台将为代理人陆续提供各类优质保险保障产品的同时，为代理人提供线上裂变发展虚拟团队的机会。并不断提供线上化代理人客户管理、智能保险推荐、线上销售培训等科技工具，让代理人展业更加便捷。</p>
        <p>优势二：客户资源</p>
        <p>平台将根据不同客户保险保障需求，为客户提供不同销售能力的代理人专属顾问服务，为代理人提升产能提供帮助。</p>
        <p>优势三：提现便捷</p>
        <p>代理人佣金部分平台支持T+2结算，即代理人发起提现申请后，2个工作日内完成结算。让代理人资金效率更高效。</p>
        <p>优势四：享有专属产品、特殊佣金、各类津贴及福利。</p>
        <p>（1）专属产品、专属佣金</p>
        <p>平台将陆续推出符合代理人需求的、具备市场竞争力的专属化保险保障产品，并提供丰厚专属佣金。</p>
        <p>（2）虚拟团队：推荐好友加入I国任，好友出单可获得专项奖励及团队津贴。（注：推荐奖励以当地政策为准）</p>
        <p>（3）津贴体系：</p>
        <p>规模津贴：根据代理人当月达成保费规模，可享受不同金额津贴奖励；</p>
        <p>增员津贴：根据当期增员目标，裂变发展下级出单，代理人将会获得相应的津贴奖励；</p>
        <p>管理津贴：裂变发展下级，根据下级出单情况，代理人可获得对应比例津贴奖励。</p>
        <p>育成津贴：裂变发展下级代理人，如下级代理人裂变人数及产能达到一定规模形成虚拟团队，其上级代理人可以拿到下级代理人所管理虚拟团队每月保费产能相应比例的津贴奖励。</p>
        <p>优势五：税收优惠</p>
        <p>代理人可享受最大税优政策，代理人月均收入8300以下免除个税。</p>
        <p>（依照税法规定，对其取得的佣金收入，按照累计预扣法计算预缴税款。具体计算时，以该纳税人截至当期在单位从业月份的累计收入减除累计减除费用、累计其他扣除后的余额，比照工资、薪金所得预扣率表计算当期应预扣预缴税额。专项扣除和专项附加扣除，在预扣预缴环节暂不扣除，待年度终了后汇算清缴申报时办理。）</p>
        <p>优势六：专属权益</p>
        <p>代理人根据不同层级可享受平台提供专属权益，为其客户提供更优质增值服务。</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props:['personageData'],
  methods: {
    parentMsg(state) {
      this.show = state;
    },
      //成为代理人流程
    goAgency(){
      this.show=false
      if(this.personageData.agentType == '0'){
        this.$toast('您已经是管理人员,不能成为代理人');
        return;
      }
        //未实名先去实名
      if(this.personageData.idAuth != '1' && this.personageData.agentType != '1'){
         this.$router.push({path: '/realName', query:{userId: this.personageData.userId}});
         return;
      }
      if(this.personageData.agentType == '1'){
        this.$toast('您已经是专员,不能成为代理人');
        return;
      }else if(this.personageData.agentType == '2'){
        this.$toast('您已经是代理人,无需重复申请');
        return;
      }else if(this.personageData.agentType == '3' || this.personageData.agentType == '4'){
           if(this.personageData.reviewCode === '0'){
              this.$toast('审批中！');
              return;
            } else if(this.personageData.reviewCode === '1'){
              this.$router.push({path: '/sign'});
            } else if(this.personageData.reviewCode === '2'){
              this.$router.push({path: '/exam'});
            } else if(this.personageData.reviewCode === '3'){
                this.$router.push({path: '/approval'});
            }else if(this.personageData.reviewCode === '6' && this.personageData.returnCode != null  && this.personageData.returnCode != ''){
                let mistakeData = this.personageData.returnCode.split(",")
                if(mistakeData.indexOf('I') != -1 || mistakeData.indexOf('B') != -1 || mistakeData.indexOf('D') != -1 || mistakeData.indexOf('P') != -1){
                  //如果有一个就跳转approval页面
                   this.goPage('approval?mistakeData='+mistakeData);
                }else{
                   this.goPage('sign?mistakeData='+mistakeData);
                }
            }
      }

     
    },
  },
};
</script>

<style lang="less">
.activityRulesPage {
  .van-overlay {
    z-index: 10000000 !important;
  }
  .van-popup {
    z-index: 10000000 !important;
    width: 85vw;
    height: 138.6vw;
    border-radius: 0.15rem;
    background-image: url('./../../public/img/common/become_agent_bg.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 0);
    overflow: hidden;
  }
  .content-text{
    width: 90%;
    margin: 29.5% auto;
    height: 71.5%;
    overflow-y: scroll;
    p{
      font-size: .75rem;
      margin: .8rem 0;
    }
  }
  .close_btn{
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 2.6rem;
    height: 2.6rem;
  }
  .agent_btn{
    position: absolute;
    left: 25%;
    bottom: 0;
    display: block;
    width: 50%;
    height: 2.4rem;
  }
}
</style>