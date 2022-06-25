<template>
  <div class="masonryHint">
    <van-popup v-model="show">
      <!-- <i class="close_btn" @click="show=false" ></i> -->
      <i class="agent_btn" @click="goSkip()" ></i>
      <!-- <van-icon  class="agent_btn" name="cross" /> -->
      <div class="content-text">
         <div class="">
           <p class="hint_txt" v-if="agentType == 1"> 
              您好，通过i国任出单，您可获得页面显示对应的i钻：1i钻=1元;
              在您完成投保后，i钻将实时同步至您的收入，您可查看在I国任的累计收入情况。<br>
              提示：累计收入仅供参考，不可做提现使用。详情请咨询您所在的分公司
           </p>
            <p class="hint_txt" v-else-if="agentType == 2"> 
              您好，亲爱的代理人：<br>
              通过I国任出单，您可获得页面显示对应的i钻：1i钻=1元；
              在您完成投保后，i钻将实时同步至您的收入，您可提现至银行卡。<br>
              详情请点击明细查阅
           </p>
           <p class="hint_txt" v-else>
              您好！您目前身份暂不支持i钻提现哦，请注册为代理人后再做提现申请。<br>
              提示：通过I国任出单，您可获得页面显示对应的i钻，1i钻=1元，在您成为代理人后，i钻将实时同步至您的收入，可提现至银行卡。
           </p>
           <img src="../../public/img/account/iMasonry.png" width="100%">
          </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      agentType:''
    };
  },
  created() {
  },
  methods: {
    goSkip(){
      this.show=false
      //  this.$parent.goAgency();
      // this.$router.push({path: '/sign'});
    },
    parentMsg(state,agentType) {
      this.agentType = agentType
      this.show = state;
    }
  },
};
</script>

<style lang="less">
.masonryHint {
  .van-overlay {
    z-index: 10000000 !important;
  }
  .van-popup {
    z-index: 10000000 !important;
    width: 100vw;
    // height: 100vw;
    background: none;
    // border-radius: 0.15rem;
    // background-image: url('./../../public/img/common/become_agent_bg.png');
    // background-size: contain;
    // background-position: center;
    // background-repeat: no-repeat;
    // background-color: rgba(255, 255, 255, 0);
    overflow: hidden;
  }
  .agent_btn{
    position: absolute;
    left: 45%;
    bottom: 5%;
    display: block;
    width: 10%;
    height: 9%;
  }
  .hint_txt{
    position: absolute;
    width: 70vw;
    left: 15vw;
    top: 24vh;
    font-size: 0.7rem;
    margin: 0 auto;
  }
}
</style>