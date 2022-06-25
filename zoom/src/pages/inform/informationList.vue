<template>
  <div class="informationList">
    <div>
    <van-nav-bar title="消息动态" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <span class="action" @click="eliminate()" style="font-size:12px;color: #fff">
            <img width="10px" height="10px" src="../../../public/img/home/flow.png">
            清除未读
        </span>
        <!-- <img width="20px" height="20px" style="padding: 0" src="./../../../public/img/account/set.png" @click="goPage('informationSet')"> -->
      </template>
    </van-nav-bar>
      <nav class="nav_label" :style="{ 'top': ($iosSystem + 46) + 'px' }">
        <van-tabs v-model="twoActive" :ellipsis="false" background='#0252ff' title-active-color="white" title-inactive-color="#B2C9FA" @click="clickTabs" @disabled="onClickDisabled">
          <van-tab title="保单动态" :badge="navigationList[0].unreadMessage"></van-tab>
          <van-tab title="公告" :badge="navigationList[1].unreadMessage" ></van-tab>
          <van-tab title="活动" :badge="navigationList[2].unreadMessage" ></van-tab>
          <!-- <van-tab title="资讯" :badge="navigationList[3].unreadMessage" ></van-tab> -->
        </van-tabs>
      </nav>
      <!-- <div class="box" style="margin-top:10px" v-show="false">
        <div class="xx_box">
          <div class="xx_top" v-for="(item,index) in systemWordList" :key="index" @click="sendBack(item)">
            <div class="xx_xgezi">
              <h4 class="xx_biaoti">{{item.messageTitle}}</h4>
              <p class="xx_time">{{item.createdDate}}</p>
            </div>
            <p class="xx_biaoyu" v-html="item.messageContent"></p>
          </div>
        </div>
      </div> -->
       <div class="box" :style="{ 'margin-top': ($iosSystem + 100) + 'px' }">
        <div class="xx_box">
          <div class="xx_top" v-for="(item,index) in txtList" :key="index" @click="sendBack(item)" :class="item.status == 1 ? 'co_FA' : ''">
            <div class="xx_xgezi">
              <h4 class="xx_biaoti">{{item.templateTitle || item.defineTitle}}</h4>
              <p class="xx_time">{{item.templateSendTime}}</p>
            </div>
            <p class="xx_biaoyu" v-if="twoActive == 0" v-html="item.templateContent || item.defineContent"></p>
            <p class="xx_biaoyu" v-else v-html="item.templateAnnotation"></p>
          </div>
        </div>
      </div>

      <my-empty description="查询无数据" v-show="!txtList.length"></my-empty>

      <informationPopup-rules ref="informationPopup"></informationPopup-rules>
    </div>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import { mapState } from 'vuex'
export default {
  data() {
    return {
      agentCode: localStorage.getItem('agentCode'),
      systemWordList: [],
      personageData: {},
      twoActive: 0,
      navigationList:[
        {unreadMessage:''},
        {unreadMessage:''},
        {unreadMessage:''},
        {unreadMessage:''},
      ],
      txtList:[]
    };
  },
  computed:{
    ...mapState({
      userInfo: state => state.my.UserInfo,
    })
  },
  created() {
    this.$store.dispatch('my/getUserInfo');
    this.systemWordList = util.getSessionStorageObj("informationData") || [];
    this.personageData = util.getSessionStorageObj("personageData") || {};

    this.getColumn()
    this.getList()
  },
  methods: {
    eliminate(){
      if(this.userInfo.unreadMessageNum < 1){
         this.$toast("您暂无未读消息");
        return;
      }
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定清除全部未读消息？',
      })
      .then(() => {
        // on confirm
        this.getEliminate()
      })
      .catch(() => {
        // on cancel
      });
    },
    onClickDisabled(name, title) {
      this.$toast(title +"消息已被您取消接收");
    },
    clickTabs(name, title){
      // if(name != 0){
        this.getList()
      // }
    },
    // 栏目菜单接口
    async getColumn() {
      const res = await this.$axios({
        url: this.$API.API_NEWS_GETMESSAGETLIST,
        method: "get",
      });
      if (res.code === 0 && res.content) {
        this.navigationList = res.content || []
        
      } else {
        this.$toast("请求失败");
      }
    },
    // 列表接口
    async getList() {
      const res = await this.$axios({
        url: this.$API.API_NEWS_GETNESSAGELISTBYMESSAGETYPE,
        method: "get",
        params:{
          messageType:this.twoActive
        }
      });
      if (res.code === 0 && res.content.result == 0) {
        this.txtList = res.content.data || []
      } else{
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    // 清除全部未读消息
    async getEliminate(id) {
      const res = await this.$axios({
        url: this.$API.API_NEWS_UPDATEMESSAGEUNREAD,
        method: "post",
        params:{
          id:id || ''
        }
      });
      if (res.code === 0 && res.content.result == 0) {
        // if(!id){
        //   this.$toast(res.content.resultMessage);
        // }
        this.getList()
        this.getColumn()
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    sendBack(item) {
      this.getEliminate(item.id)
      if(this.twoActive != 0){
        this.goPage('informationDetails?id='+item.id)
      }else if (item.linkUrl) {//代理人审核退回跳转
        var mistakeData = []
        mistakeData = item.linkUrl.split(",")
        if (mistakeData.indexOf('I') != -1 || mistakeData.indexOf('B') != -1 || mistakeData.indexOf('D') != -1 || mistakeData.indexOf('P') != -1) {
          //如果有一个就跳转approval页面
          this.$router.push({ name: 'approval', params: { 'mistakeData': mistakeData } });
        } else {
          this.$router.push({ name: 'sign', params: { 'mistakeData': mistakeData } });
        }
        this.getEliminate(item.id)
      }
    },
    showState() {
      this.$refs.informationPopup.parentMsg(true);
    }
  }
};
</script> 

<style lang="less">
@import './../../assets/less/app/informationList/informationList.less';
.informationList{
  .van-nav-bar {
    background: #0252ff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .nav_label{
    position: fixed;
    top: 78px;
    width: 100%;
    .van-tabs__line{
      bottom: 20px;
      background-color:#fff;
      width:20px;
    }
  }

  .box {
    padding-bottom: 10px;
  }
  .xx_box {
   
    margin: 0 14px;
    display: block;
  }
  .xx_top:nth-of-type(1){
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .xx_top:last-child{
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .co_FA{
    color: #8C8E90!important ;
  }
  .xx_xgezi {
    display: flex;
    justify-content: space-between;
    padding: 14px 14px 3px 14px;
  }
  .xx_biaoti {
    margin: 0;
    font-size: 16px;
  }
  .xx_time {
    font-size: 12px;
  }
  .xx_below_h4 {
    margin: 0 14px 3px 14px;
    border-top: solid 2px #f4f4f4;
    padding-top: 14px;
  }
  .xx_below_gezi {
    display: flex;
    justify-content: space-between;
    padding: 3px 14px 14px 14px;
  }
  .xx_biaoyu2 {
    font-size: 14px;
  }
  .xx_biaoyu {
    font-size: 14px;
    padding: 3px 14px 14px 14px;
  }
  .xx_bt {
    border: solid 1px #eeeeee;
    border-radius: 16px;
    padding: 4px 10px;
    font-size: 12px;
  }
  .xx_bt_git {
    display: flex;
    justify-content: flex-end;
    height: 40px;
    padding-right: 10px;
  }
  .xx_bt_ck {
    border: solid 1px #eeeeee;
    border-radius: 16px;
    font-size: 12px;
    width: 78px;
    text-align: center;
    height: 28px;
    line-height: 28px;
  }
  .xx_top {
    border-bottom: solid 1px #f2f2f2;
    background: #fff;
  }
}

</style>