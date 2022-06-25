<template>
  <div class="accountPage">
    <div class="page-group">
      <div class="page page-current my-account" id="my-page" data-title="个人中心">
        <div class="content">
          <div class="my_top">
            <div class="msg">
              <div class="news-set">
                <!-- @click="GoupdRead()" -->
                <div @click="developing()">
                  <img src="./../../../public/img/account/message.png">
                  <div>消息</div>
                </div>
                <div @click="goPage('setUp')" >
                  <p class="unread_number" v-if="pageData.userInfo.unreadMessageNum> 0 ">{{pageData.userInfo.unreadMessageNum > 99 ? 99 : pageData.userInfo.unreadMessageNum}}</p>
                  <img class="signOutImg" style="padding: 0" src="./../../../public/img/account/set.png">
                  <div>设置</div>
                </div>
              </div>
            </div>
            <template v-if="pageData.isShow">
              <div style="min-height: 60px;">
                <div class="head" @click="goPage('setUp')">
                  <img v-if="pageData.userInfo.agentProfile" :src="pageData.userInfo.agentProfile">
                  <img v-else src="./../../../public/img/page/gr_head.png">
                </div>
                <div class="login y_login">
                  <div class="mobileStar">{{ pageData.userInfo.name || pageData.userInfo.phone}}</div>
                  <!-- <span class="tag" v-if="pageData.userInfo.agentType">{{pageData.userInfo.agentType == 1 ? '专员': pageData.userInfo.agentType == 2 ? '代理人' : pageData.userInfo.agentType == 3 ? '会员' : pageData.userInfo.agentType == 4 ? '用户' : pageData.userInfo.agentType == 0 ? '管理人员': '' }}</span> -->
                  <div v-if="pageData.userInfo.salesmanChannelType == '03'" @click="show=true" style="display: flex;align-items: center;align-content: center;">
                    <span class="tag">车商4S店名</span>
                    <img width="20" height="20" style="margin-left: 4px;" src="./../../../public/img/account/whao.png">
                  </div>
                </div>
                <div class="login y_login" v-if="pageData.userInfo.agentType != 1 && pageData.userInfo.agentType != 0">
                  <div v-if="pageData.userInfo.isCertification" class="authentication">已实名</div>
                  <div v-if="!pageData.userInfo.isCertification" class="authentication" @click="toRealName">去实名</div>
                  <div v-if="pageData.userInfo.agentType==='3' && reviewCode!='4' && reviewCode!='5'" class="authentication" @click="toApproval">成为代理人</div>
                  <div v-if="reviewCode==='4'" class="authentication" @click="reminderShow()">已成为代理人</div>
                </div>
                <!-- <div class="login y_login" v-if="pageData.userInfo.agentType == '1' || pageData.userInfo.agentType == '0'">
                  <div class="authentication" @click="goPage('businessSet')">业务来源设置</div>
                </div> -->
              </div>
              <!-- <div class="left-box">></div> -->
            </template>
            <template v-else>
              <div class="head"><img src="./../../../public/img/page/gr_head.png"></div>
              <router-link class="login mtf4" to="login">
                <h2>未登录</h2>
              </router-link>
              <div class="yuanhu"><img src="./../../../public/img/page/gr_yuanhu.png"></div>
            </template>
          </div>

          <div class="padding30 back_color" style="margin-top: 20px;">
            <!-- <div class="shadow">
              <div class="tixian flex">
                <div class="flexitem" @click="goPage('performanceList')">
                  <strong>{{my_achievement}}</strong><span>当月个人业绩（元）</span>
                </div>
                <div class="flexitem" @click="goPage('teamAchievement')">
                  <strong>{{team_achievement}}</strong><span>当月团队业绩（元）</span>
                </div>
                <div class="flexitem" v-if="pageData.userInfo.agentType !='0' && (pageData.userInfo.OrgCode.substring(0,2) == '15' || pageData.userInfo.OrgCode.substring(0,2) == '12' ? pageData.userInfo.agentType !='1' : true )">
                  <div class="flexitem" @click="goPage('income?reviewCode='+reviewCode)">
                    <strong>{{sysAgentIncomeTotal}}</strong><span>个人收入（元）</span>
                  </div>
                </div>

              </div>
              <div class="jifen flex" v-if="pageData.userInfo.agentType == '0'">
                 <div class="gret" @click="developing()">
                  <img src="./../../../public/img/page/icon/jf_icon01.png">
                  <div class="dos"><span>0</span><span>积分</span></div>
                </div>
              </div>
              <div class="jifen flex" v-else>
                 <div class="gret" @click="goPage('integral')">
                  <img src="./../../../public/img/page/icon/jf_icon01.png">
                  <div class="dos"><span>{{pointNum}}</span><span>积分</span></div>
                </div>
                <p class="lint"></p>
                <div class="gret">
                  <img src="./../../../public/img/account/shilobj.png">
                  <div class="dos" @click="goPage('brick?agentType='+pageData.userInfo.agentType)">
                    <span>{{iDrill}}</span>
                    <span @click.stop="showState()">
                      i钻
                      <img class="ask" src="./../../../public/img/account/ask.jpg">
                    </span>
                  </div>
                </div>
                <p class="lint" v-if="pageData.userInfo.OrgCode && pageData.userInfo.OrgCode.substring(0,2) !='12' ? (pageData.userInfo.agentType != 1) : false"></p>
                <div class="gret" v-if="pageData.userInfo.OrgCode && pageData.userInfo.OrgCode.substring(0,2) !='12' ? (pageData.userInfo.agentType != 1) : false">
                  <div class="dos" @click="goPage('serviceReel')"><span>{{coupon}}</span><span>增值服务券</span></div>
                </div>
              </div>
            </div> -->
            <h3>我的订单</h3>
            <div class="flex shadow four orderStatus">
              <a class="orderGrid pb20" @click="gotoOrderPage('0')">
                <img src="./../../../public/img/account/5@2x.png">
                <div>草稿箱</div>
                <van-tag round color="#FCDE54" text-color="#0252FF" v-if="pageData.orderInfo.draft">{{pageData.orderInfo.draft}}</van-tag>
              </a>
              <a class="orderGrid pb20" @click="gotoOrderPage(1)">
                <img src="./../../../public/img/account/payment.png">
                <div>待核保</div>
                <van-tag round color="#FCDE54" text-color="#0252FF" v-if="pageData.orderInfo.toBeUw">{{pageData.orderInfo.toBeUw}}</van-tag>
              </a>
              <a class="orderGrid pb20" @click="gotoOrderPage(2)">
                <img src="./../../../public/img/account/payment.png">
                <div>待付款</div>
                <van-tag round color="#FCDE54" text-color="#0252FF" v-if="pageData.orderInfo.waitPayNum">{{pageData.orderInfo.waitPayNum}}</van-tag>
              </a>
              <a class="orderGrid pb20" @click="gotoOrderPage(3)">
                <img src="./../../../public/img/account/paid.png">
                <div>已付款</div>
                <van-tag round color="#FCDE54" text-color="#0252FF" v-if="pageData.orderInfo.payDoneNum">{{pageData.orderInfo.payDoneNum}}</van-tag>
              </a>
              <a class="orderGrid" @click="gotoOrderPage(4)">
                <img src="./../../../public/img/account/covered.png">
                <div>已承保</div>
                <van-tag round color="#FCDE54" text-color="#0252FF" v-if="pageData.orderInfo.acceptInsureNum">{{pageData.orderInfo.acceptInsureNum}}</van-tag>
              </a>
              <a class="orderGrid" @click="gotoOrderPage(5)">
                <img src="./../../../public/img/account/6@2x.png">
                <div>已关闭</div>
                <van-tag round color="#FCDE54" text-color="#0252FF" v-if="pageData.orderInfo.expiryClose">{{pageData.orderInfo.expiryClose}}</van-tag>
              </a>
              <a class="orderGrid" @click="goRenewedInsurance">
                <img src="./../../../public/img/account/renewed.png">
                <div>续保管理</div>
                <van-tag round color="#FCDE54" text-color="#0252FF" v-if="pageData.orderInfo.waitRenewalNum">{{pageData.orderInfo.waitRenewalNum}}</van-tag>
              </a>
            </div>
            
            <!-- <h3>我的特权</h3>
            <div class="shadow four flex">
              <a @click="developing" class="flexitem">
                <img src="./../../../public/img/account/value.png">
                <div>增值服务</div>
              </a>
              <a v-if="manageVersion == '000000'" @click="goShop" class="flexitem">
                <img src="./../../../public/img/page/shop/ic_store@2x.png">
                <div>微店</div>
              </a>
              <a v-else class="flexitem"></a>
              <a class="flexitem"></a>
              <a class="flexitem"></a>
            </div>
            <h3>我的任务</h3>
            <div class="shadow four flex" style="margin-bottom: 6.5rem;">
              <div class="task">
                <div @click="developing">
                  <div>已完成的任务</div>
                  <div>0</div>
                </div>
                <div @click="developing">
                  <div>进行中的任务</div>
                  <div>0</div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <van-dialog v-model="showComfirm" :title="null" confirmButtonText="未签署" cancelButtonText="已签署" cancelButtonColor="#1989fa" show-cancel-button class="confirmdialog" @confirm="confirm" @cancel="cancel">
          <div class="confirmdialog-huan"><img src="./../../../public/img/account/confirmbg.png"></div>
          是否在其他保司或代理公司签署<br />代理协议
        </van-dialog>
        <van-dialog v-model="showTips" :title="null" :showConfirmButton="false" class="tipsdialog">
          <a class="tipsbtn" @click="closeTips"></a>
        </van-dialog>
      </div>

    </div>
    <v-footer></v-footer>
    <accountHint-rules ref="accountHint"></accountHint-rules>
    <masonryHint-rules ref="masonryHint"></masonryHint-rules>
    <van-popup v-model="show" round :style="{ height: '140px'}" style="width: 90%;">
      <div class="pop_tc">
        <van-field v-model="pageData.userInfo.shopName" label="车商4S店名" placeholder="请输入车商4S店名" />
        <van-button class="pop_tc_bt" type="primary" size="normal" @click="upd()">修改</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from './../../assets/js/util/common';
import configJs from '../../config.js';
import vFooter from "@/templates/footer.vue";
import { mapState } from 'vuex'

export default {
  components: {
    vFooter: vFooter
  },
  computed: {
    ...mapState({
      manageVersion: state => state.common.manageVersion,
      pointNum: state => state.integral.pointNum,
    })
  },
  data() {
    return {
      show: false,
      agentCode: localStorage.getItem('agentCode'),
      page: {
        autoloader: true
      },
      pageData: {//页面数据
        myListInfo: {},
        thirdInfo: {},   //第三方信息 
        userInfo: {
          name: '',
          isCertification: false,//是否实名 true 已经实名
          agentType: '',
          OrgCode: '',
          shopName: '',
          unreadMessageNum:'',
        },
        isShow: true,
        orderInfo: {
          draft:'',
          toBeUw:'',
          waitPayNum: '',
          payDoneNum: '',
          waitRenewalNum: '',
          expiryClose:'',
          acceptInsureNum: '',
        }
      },
      my_achievement: 0,
      team_achievement: 0,
      sysAgentIncomeTotal: 0,
      iDrill: 0,
      reviewCode: null,
      showComfirm: false,
      showTips: false,
      listData: {},
      readNum: 0,
      systemWordList: {},
      unreadList: '',
      coupon: 0,
      officialAccount: '',
    };
  },

  created() {
    this.readNum = util.getSessionStorageObj("readNum") || 0
    this.systemWordList = util.getSessionStorageObj("informationData") || {};

    this.getMyListInfo();
    this.getUserInfo();
    this.queryOrderInfo();
    this.getSameMonthAchievement();
    this.getOwnInfo();
     // 获取用户积分（结算积分、预积分）
    //this.$store.dispatch('integral/getIntegerPointUser')
    //先清空vue缓存的代理协议号
    this.$store.commit('my/mYupdataAgreementList', []);
    //先清空vue缓存的决策单元
    this.$store.commit('my/mYupdataDecisionUnit', []);
    //不调头像更新不了
    this.$store.dispatch('my/getUserInfo');
    // 清除积分体系
    // this.$store.commit('integral/resetState');
    // 清除微店数据
    this.$store.commit('shop/resetState');
  },
  methods: {
    //修改4s店车商名
    async upd() {
      this.show = false
      const res = await this.$axios({
        url: this.$API.API_MY_MODIFY,
        method: 'post',
        data: {
          shopName: this.pageData.userInfo.shopName
        }
      });
      if (res.code == 0 && res.content.result == '0') {
        this.getUserInfo();
        this.$toast("修改成功");
      } else {
        this.$toast("修改失败");
      }
    },
      //修改消息状态
    async GoupdRead(){
        // if(this.readNum > 0){
        //    this.unreadList = util.getSessionStorageObj("unreadList") || {};
        //     await common.updRead(this.unreadList)
        // }else{
           this.$router.push({name: "informationList"});
        // }
       
    },
    reminderShow() {
      this.$refs.accountHint.parentMsg(true, this.listData);
    },
    showState() {
      this.$refs.masonryHint.parentMsg(true, this.pageData.userInfo.agentType);
    },
    async getMyListInfo() {
      const res = await this.$axios({
        url: this.$API.API_MY_MENU,
        method: 'post',
      });
      if (res.code === 0) {
        this.pageData.myListInfo = res.content.myMenuList;
      }
    },
    async getUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_INFO,
        method: 'post',
      });
      if (res.code === 0) {
        this.pageData.isShow = true;
        this.pageData.userInfo = res.content;
        if (res.content.idAuth === '1') {
          this.pageData.userInfo.isCertification = true;
        } else {
          this.pageData.userInfo.isCertification = false;
        }

      }
    },
    async queryOrderInfo() {
      const res = await this.$axios({
        url: this.$API.API_MY_SST,
        method: 'post',
      });
      if (res.code === 0) {
        this.pageData.orderInfo.draft = res.content.draft;
        this.pageData.orderInfo.toBeUw = res.content.toBeUw;
        this.pageData.orderInfo.waitPayNum = res.content.waitPay;
        this.pageData.orderInfo.payDoneNum = res.content.payDone;
        this.pageData.orderInfo.waitRenewalNum = res.content.waitRenewal;
        this.pageData.orderInfo.expiryClose = res.content.overdue;
        this.pageData.orderInfo.acceptInsureNum = res.content.acceptInsure;

      }
    },
    async getSameMonthAchievement() {
      // 个人业绩
      const my_achievement = await this.$axios({
        url: this.$API.API_MY_SA,
        method: 'post',
        data: {
          number: '1'
        }
      });
      if (my_achievement.code === 0) {
        this.my_achievement = my_achievement.content.moneyTotal || 0;
      }
      // 团队业绩
      // const team_achievement = await this.$axios({
      //   url: this.$API.API_MY_TEAM_ACHIEVEMENT,
      //   method: 'post',
      //   data: {
      //     statisticsDate: 2,
      //   }
      // });
      // if (team_achievement.code == 0 ) {
      //   this.team_achievement = team_achievement.content.premium || 0;
      // }
      // 收入
      const sysAgentIncomeTotal = await this.$axios({
        url: this.$API.API_MY_SAIT,
        method: 'post',
        baseURL: 'false',
        data: {
          number: '1'
        }
      });
      if (sysAgentIncomeTotal.code === 0 && sysAgentIncomeTotal.content.result == 0) {
        this.sysAgentIncomeTotal = sysAgentIncomeTotal.content.date.incomeAmount || 0;
        this.iDrill = sysAgentIncomeTotal.content.date.iDrill || 0;
        this.coupon = sysAgentIncomeTotal.content.date.coupon || 0; //福利券
        this.officialAccount = sysAgentIncomeTotal.content.officialAccount || '';//提示语
        this.$store.commit('my/updateState', [{ name: ['iDrill'], value: this.iDrill }]) //储存i钻
      }
    },
    async getOwnInfo() {
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if (res.code === 0 && res.content) {
        this.listData = res.content || ''
        this.reviewCode = res.content.reviewCode
      }
    },
    gotoOrderPage(orderType) {
      this.$router.push({ name: 'orderList', params: { 'orderType': orderType } });
    },
    developing() {
      this.$toast('功能开发中，敬请期待！');
    },
    toRealName() {
      this.$router.push({ path: '/realName', query: { userId: this.pageData.userInfo.userId } });
    },
    toApproval() {
      if (this.reviewCode === '0') {
        this.$toast('审批中！');
      } else if (this.reviewCode === '1') {
        this.$router.push({ path: '/sign' });
      } else if (this.reviewCode === '2') {
        this.$router.push({ path: '/exam' });
      } else if (this.reviewCode === '3') {
        this.$router.push({ path: '/approval' });
      } else if (this.reviewCode === '6' && this.listData.returnCode != null && this.listData.returnCode != '') {
        let mistakeData = this.listData.returnCode.split(",")
        if (mistakeData.indexOf('I') != -1 || mistakeData.indexOf('B') != -1 || mistakeData.indexOf('D') != -1 || mistakeData.indexOf('P') != -1) {
          //如果有一个就跳转approval页面
          this.goPage('approval?mistakeData=' + mistakeData);
        } else {
          this.goPage('sign?mistakeData=' + mistakeData);
        }
      } else {
        this.showComfirm = true

      }

    },
    confirm() {
      this.$router.push({ path: '/approval' });
    },
    cancel() {
      this.showComfirm = false
      this.showTips = true
    },
    closeTips() {
      this.showTips = false
      this.$router.replace({ path: '/home' });
    },
    goRenewedInsurance() {
      if (this.pageData.userInfo.openCarRenew == '0') {
        this.$store.commit('renewedInsurance/resetState');
        this.goPage('renewedInsurance');
      } else {
        this.$toast('功能开发中，敬请期待！');
      }
    },
    goShop() {
      if (this.pageData.userInfo.agentType != 4) {
        this.goPage('myShop')
      } else {
        this.$dialog.confirm({
          title: '未实名',
          message: '实名认证以后才能开启微店，是否去实名',
        }).then(() => {
          this.toRealName()
        }).catch(() => {
          // on cancel
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.accountPage {
  .orderStatus{
    flex-wrap: wrap;
    .orderGrid{
      position: relative;
      width: 25%;
      .van-tag {
        background-color: rgb(252, 222, 84);
        color: rgb(2, 82, 255);
        position: absolute;
        top: 0;
        left: 50%;
        margin: -5px 5px;
      }
    }
    .pb20{
      padding-bottom: 20px;
    }
  }
  .flexitem {
    position: relative;
    .van-tag {
      background-color: rgb(252, 222, 84);
      color: rgb(2, 82, 255);
      position: absolute;
      top: 0;
      left: 50%;
      margin: -5px 5px;
    }
  }
  .signOutImg {
    padding: 0.18rem;
  }
  .jifen .ask {
    width: 0.8rem;
    margin-left: 0.5rem;
  }
  .jifen {
    .box_jf {
      display: flex;
      flex: 1;
    }
    .gret {
      flex: 1;
      flex-direction: column;
    }
  }
  .jifen {
    .dos {
      display: flex;
      flex-direction: column;
      text-align: center;
      span {
        margin-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .pop_tc {
    padding-top: 10%;
    .pop_tc_bt {
      position: fixed;
      bottom: 10%;
      width: 60%;
      left: 20%;
      height: 40px;
      border-radius: 10px;
      font-size: 16px;
    }
  }
}
.unread_number {
  transform: scale(0.8);
  text-align: center;
  margin: 0 auto;
  position: absolute;
  left: 0.7rem;
  background: red;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  top: -2vw;
}
</style>
<style lang="less">
.confirmdialog {
  width: 280px;
  overflow: visible;
  .van-dialog__content {
    background: linear-gradient(to left, #53bcf6, #7ccdf9);
    color: #fff;
    padding: 1rem;
    text-align: center;
    border-radius: 0.8rem 0.8rem 0 0;
  }
  .confirmdialog-huan {
    text-align: center;
    img {
      width: 7rem;
      display: block;
      margin: -3rem auto 0 auto;
    }
  }
  .van-dialog__footer {
    border-radius: 0 0 0.8rem 0.8rem;
  }
}
.tipsdialog {
  width: 300px;
  overflow: visible;
  background-color: transparent;
  .van-dialog__content {
    width: 300px;
    height: 360px;
    background-image: url(../../../public/img/account/tips.png);
    background-position: center top;
    background-size: 100%;
    position: relative;
    .tipsbtn {
      position: absolute;
      bottom: 80px;
      width: 100%;
      height: 30px;
      display: block;
    }
  }
}
</style>