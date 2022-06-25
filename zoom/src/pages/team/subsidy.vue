<template>
  <div class="subsidyPage" :style="{ 'margin-top': ($iosSystem + 60) + 'px' }">
    <div>
      <v-header :title="{ name: title }"></v-header>
      <ol class="order_list">
        <li class="list">
          <span class="name"><img class="icon" src="../../assets/img/team/icon_04.png" alt="">增员津贴</span>
          <span class="price">￥{{staffSubsidy}}</span>
        </li>
        <li class="list">
          <span class="name"><img class="icon" src="../../assets/img/team/icon_02.png" alt="">管理津贴</span>
          <span class="price">￥{{managementSubsidy}}</span>
        </li>
        <li class="list">
          <span class="name"><img class="icon" src="../../assets/img/team/icon_01.png" alt="">育成津贴</span>
          <span class="price">￥{{growingSubsidy}}</span>
        </li>
        <li class="list">
          <span class="name"><img class="icon" src="../../assets/img/team/icon_03.png" alt="">规模津贴</span>
          <span class="price">￥{{scaleSubsidy}}</span>
        </li>
      </ol>

      <p class="Tips">预期津贴为您及团队根据产能及增员当期情况计算，具体金额将在次月月初计算后在”我的个人收入内查询提取"</p>
    </div>
    <subsidyRule-rules ref="subsidyRule"></subsidyRule-rules>
  </div>
</template>

<script>

import common from '../../assets/js/util/common';
export default {
  data() {
    return {
      title: this.$route.meta.title,
      growingSubsidy: 0,
      managementSubsidy: 0,
      scaleSubsidy: 0,
      staffSubsidy: 0,
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    subsidyMsg(){
        this.$refs.subsidyRule.subsidyRuleMsg(true);
    },
    async getInit() {
      const res = await this.$axios({
        url: this.$API.API_TEAM_SUBSIDYDETAIL,
        method: 'post',
        data: {
          agentCode: localStorage.getItem('agentCode')
        }
      });
      if(res.code === 0){
        this.growingSubsidy = res.content.growingSubsidy || 0;
        this.managementSubsidy =  res.content.managementSubsidy || 0;
        this.scaleSubsidy = res.content.scaleSubsidy || 0;
        this.staffSubsidy = res.content.staffSubsidy || 0;
      }else{
        this.$toast(res.message);
      }
    }
  }
};
</script>

<style lang="less" >
@import './../../assets/less/app/account/income.less';
.subsidyPage {
  .order_list {
    .list {
      margin: 4%;
      padding: 1.3rem 1rem;
      background: white;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        display: flex;
        align-items: center;
        .icon {
          display: block;
          width: 2.2rem;
          margin-right: 0.5rem;
        }
      }
      .price {
        font-size: 1rem;
        color: #fb7125;
      }
    }
  }
  .Tips{
   font-size: .8rem;
    margin: 40px 5% 0;
    color: #999;
  }
}
</style>
