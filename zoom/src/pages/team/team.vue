<template>
  <div class="teamPage afe-area-inset-bottom">
    <i class="bg"></i>
    <v-header :title="{ name: '我的团队' }"></v-header>

    <header class="header-bar">
      <div class="top-bar">
        <img class="my-photo" v-if="userInfo.agentProfile" :src="userInfo.agentProfile" alt="">
         <img class="my-photo" v-else src="./../../../public/img/page/gr_head.png" alt="">
        <div class="content-box">
          <div class="name-bar">
            <p class="name" style="margin-right: 10px;">{{userInfo.name || userInfo.mobileStar}}</p>
            <span class="tag" v-if="userInfo.agentType">{{userInfo.agentType == 1 ? '专员': userInfo.agentType == 2 ? '代理人' : userInfo.agentType == 3 ? '会员' : userInfo.agentType == 4 ? '用户' : userInfo.agentType == 0 ? '管理人员' : '' }}</span>
          </div>
          <!-- <p class="txt">不同类型不同描述</p> -->
        </div>
      </div>
      <div class="botton-bar">
        <!-- agenttype 用户类别    1-专员    2-代理人（兼员） 3-会员 4-用户 -->
        <span class="card-txt" @click="showState" v-if="userInfo.agentType=='2'">发展团队越多奖励越多</span>
        <span class="card-txt" @click="showState" v-else-if="userInfo.agentType=='3'" >注册代理人更享受多重礼遇。</span>
        <span class="card-txt" @click="showState" v-else-if="userInfo.agentType=='4'">完善信息可获更多优质产品分享推荐。</span>
        <img class="card-box" src="./../../../public/img/team/bg_top_team@2x.png" alt="">
      </div>
    </header>

    <div class="tabs-bar">
      <van-tabs v-model="tabActive" class="#195BF4" title-active-color="#195BF4" title-inactive-color="#333333" :border="false">
        <van-tab v-for="(item,index) in tab" :key="index" :title="item"></van-tab>
      </van-tabs>
    </div>

    <!-- 团队业绩 -->
    <div class="list-box cheng_box" v-show="tabActive === 0 " :style="{ 'top': ($iosSystem + 230) + 'px' }">
      <ol class="header van-hairline--bottom">
        <li class="item">
          <p class="number">{{achievement.premium || 0}}万<span>/10万</span></p>
          <span class="name">当月保费(元)</span>
        </li>
        <li class="item">
          <p class="number">{{achievement.human || 0}}<span>/5人</span></p>
          <span class="name">有效人力数</span>
        </li>
        <li class="item" @click="goPage('subsidy')"  v-if="userInfo.agentType=='2'">
          <p class="number">{{achievement.allowance || 0}}</p>
          <span class="name">预期津贴（元）</span>
        </li>
      </ol>
      <ol class="content_table">
        <h6 class="name">业绩明细 <span>{{'(共'+detail.length+ '人)'}}</span></h6>
        <my-empty description="查询无数据" v-show="!detail.length"></my-empty>
        <li class="row" v-for="(item,index) in detail" :key="index">
          <!-- <a :href="'tel:'+item.agentMobile"> -->
            <p class="name">{{item.agentName || item.agentMobile}}<span class="vip">{{item.agentType == 1 ? '专员': item.agentType == 2 ? '代理人': item.agentType == 3 ? '会员': item.agentType == 4 ? '用户': ''}}</span></p>
          <!-- </a> -->
          <p class="type">{{item.productType == 0 ? '车险,': item.productType == 1 ? '意外险,': item.productType == 2 ? '财产险': item.productType == 3 ? '健康险': item.productType == 4 ? '旅游险': item.productType == 4 ? '货运险': ''}}</p>
          <p class="price">{{item.premium || 0}}元<van-icon name="description" color="#FB7125" /></p>
        </li>
       
      </ol>
    </div>

    <!-- 团队成员 -->
    <div class="list-box cheng_box" v-show="tabActive === 1 " :style="{ 'top': ($iosSystem + 230) + 'px' }">
      <ol class="content_table member">
        <li class="row header wj_head">
          <p class="wj_name">名称</p>
          <p class="wj_type">状态</p>
          <p class="wj_time">入团时间</p>
          <p class="wj_price">月度保费</p>
        </li>
        <my-empty description="查询无数据" v-show="!member.length"></my-empty>
        <li class="row" v-for="(item,index) in member" :key="index">
          <!-- <a :href="'tel:'+item.agentMobile" v-if="item.agentMobile"> -->
            <p class="wj_name" @click="teamPopup(item)" v-if="item.agentMobile" >{{item.agentName}}<span class="wj_vip" style="margin-left: 0.4rem;font-size: 0.65rem;">{{item.agentType == 1 ? '专员': item.agentType == 2 ? '代理人': item.agentType == 3 ? '会员': item.agentType == 4 ? '用户': ''}}</span>
              <!-- <span class="group">团</span> -->
            </p>
          <!-- </a> -->
            <p v-else  class="wj_name">{{item.agentName}}<span class="vip">{{item.agentType == 1 ? '专员': item.agentType == 2 ? '代理人': item.agentType == 3 ? '会员': item.agentType == 4 ? '用户': ''}}</span>
              <!-- <span class="group">团</span> -->
            </p>
          <p class="wj_type">{{item.status == 0 ? '潜水': item.status == 1 ? '活跃': ''}}</p>
          <p class="wj_time">{{item.entryTime || 0}}个月</p>
          <p class="wj_price">{{item.premium || 0}}元</p> 
        </li>
      </ol>
    </div>

    <v-footer></v-footer>
    <activity-rules ref="activityRules" :personageData='personageData'></activity-rules>
  
      <van-popup v-model="teamShow" style="width:60%;border-radius: 8px;">
        <van-cell-group title="详情">
          <van-cell title="姓名" :value="popupTxt.agentName" />
          <van-cell title="手机">
            <a v-if="popupTxt.agentMobile" class="dial_bt" :href="'tel:'+popupTxt.agentMobile">{{popupTxt.agentMobile}}</a>
            <a v-else class="dial_bt">{{popupTxt.agentMobile || ''}}</a>
          </van-cell>
        </van-cell-group>
      </van-popup>
  </div>
</template>

<script>
import vFooter from "@/templates/footer.vue";
export default {
  components: {
    vFooter: vFooter
  },
  data() {
    return {
      teamShow:false,
      tab: ['团队业绩', '团队成员'],
      tabActive: 0,
      userInfo: {},
      achievement: {},
      detail: [],
      member: [],
      reviewCode:'',
      personageData:{},
      popupTxt:{}
    };
  },
  created() {
    this.getUserInfo();
    this.getOwnInfo()
  },
  methods: {
    teamPopup(res){
      if(res.agentMobile){
        this.popupTxt = res
        this.teamShow = true
      }else{
        return;
      }

    },
    // 个人信息
    async getUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_INFO,
        method: 'post',
      });
      if (res.code === 0) {
        this.userInfo = res.content;
        this.getInit();
      }
    },
    async getInit() {
      // 团队业绩
      const achievement = await this.$axios({
        url: this.$API.API_TEAM_ACHIEVEMENT,
        method: 'post',
        data: {
          sysId: this.userInfo.userId
        }
      });
      if (achievement.code === 0 && achievement.content) {
        this.achievement = achievement.content;
      }
      // 团队业绩明细
      const detail = await this.$axios({
        url: this.$API.API_TEAM_DETAIL,
        method: 'post',
        data: {
          sysId: this.userInfo.userId
        }
      });
      if (detail.code === 0 && detail.content) {
        this.detail = detail.content;
      }
      // 团队成员
      const member = await this.$axios({
        url: this.$API.API_TEAM_MEMBER,
        method: 'post',
        data: {
          sysId: this.userInfo.userId
        }
      });
      if (member.code === 0 && member.content) {
        this.member = member.content;
      }
    },
    showState(){
      this.$refs.activityRules.parentMsg(true);
    },
     //获取申请代理人的步骤
    async getOwnInfo(){
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if(res.code === 0 && res.content){
        this.personageData=res.content
        this.personageData.agentType =  this.userInfo.agentType
        this.personageData.userId =  this.userInfo.userId
      }
    },
  
  }
};
</script>
<style lang="less">
@import '../../assets/less/app/team/team.less';
.wj_head p {
    margin: 0;
}
.wj_name{
  text-align: left;
  width: 7.5rem;
  color: #3d4145;
}
.wj_vip{
    margin-left: 0.4rem;
    font-size: 0.65rem;
    color: #007BC7;
}
.wj_type{
    text-align: center;
    width: 2rem;
}
.wj_time{
  text-align: center;
     width: 4rem;
}
.wj_price{
  text-align: center;
 width: 5rem;
}
.dial_bt{
  color: #969799;
}
</style>