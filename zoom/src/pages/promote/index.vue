<template>
  <div>
    <div class="promotePage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
      <div class="headerPage">
        <van-nav-bar :title="title" :border="false" :fixed="true">
          <template #left>
            <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
          </template>
          <template #right>
            <van-icon name="wap-nav" color="#fff" size="20" @click="goPage('posterControl')" />
          </template>
        </van-nav-bar>
      </div>
      <div>
        <div class="tabs-box" :style="{ top: ($iosSystem + 45) + 'px' }">
          <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
            <van-tab v-for="(item,index) in tab" :key="index" :title="item.channelName"></van-tab>
          </van-tabs>
        </div>
        <ol class="list-box" :style="{ top: ($iosSystem + 95) + 'px' }">
          <template>
            <van-tabs v-model="productTabTabActive" style="width: 100%;" line-width="0" line-height="0" title-active-color="#0252ff" v-show="tab[tabActive].channelName == '产品' &&tabActive == 0">
              <van-tab v-for="(item2,index2) in productTab" :key="index2" :title="item2.channelName" >
                <div class="list-box" :style="{ top: ($iosSystem + 132) + 'px' }">
                   <li class="item" v-for="(item,index) in productTab[productTabTabActive].items" :key="index" @click="goPoster(`poster?index=${index}`, productTab[productTabTabActive].items)" v-show="item.isPublish != 0">
                    <div class="list">
                      <van-image fit="cover" class="poster" :src="item.imagePath || item.imgUrl || './../../../public/img/promote/no-poster.png'" />
                      <div class="van-ellipsis">{{item.activityName}}</div>
                    </div>
                  </li>
                </div>
              </van-tab>
            </van-tabs>
            <li class="item" v-for="(item,index) in tab[tabActive].items" :key="index" @click="goPoster(`poster?index=${index}`, tab[tabActive].items)" v-show="item.isPublish != 0">
              <div class="list">
                <van-image fit="cover" class="poster" :src="item.imagePath || item.imgUrl || './../../../public/img/promote/no-poster.png'" />
                <div class="van-ellipsis">{{item.activityName}}</div>
              </div>
            </li>
          </template>
          <my-empty style="z-index: 9;" description="更多海报，敬请期待" v-show="tab[tabActive].channelName == '产品' ? !productTab[productTabTabActive].items.length : !tab[tabActive].items.length"></my-empty>
        </ol>
      </div>
      <click-login v-if="isLogin !== '' && isLogin == false"></click-login>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import vFooter from "@/templates/footer.vue";
import img from './../../../public/img/account/dian.png';
export default {
  components: {
    vFooter: vFooter
  },
  data() {
    return {
      title: this.$route.meta.title,
      img: img,
      tab: [
        {
          "channelType": "1",
          "channelName": "产品",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "2",
          "channelName": "增员",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "4",
          "channelName": "活动",
          "items": [],
          isLoad: false
        }
      ],
      tabActive: 0,
      productTab: [
        {
          "channelType": "all",
          "channelName": "全部",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "child",
          "channelName": "儿童保障",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "accident",
          "channelName": "意外保障",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "health",
          "channelName": "健康保障",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "responsibility",
          "channelName": "责任保障",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "family",
          "channelName": "家庭保障",
          "items": [],
          isLoad: false
        },
      ],
      productTabTabActive:0

    };
  },
  created() {
    let tab = util.getSessionStorageObj('promoteTab');
    this.tabActive = tab || 0;
    util.removeSessionStorageObj('promoteTab');

    this.getUserInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClick(name, title) {
      this.getList();
    },
    async getList() {
      if (!this.tab[this.tabActive].isLoad) {
        this.tab[this.tabActive].isLoad = true;
        this.isLogin = true;
        let userCode = JSON.parse(sessionStorage.userInfo).userCode;
        const res = await this.$axios({
          url: this.$API.API_ACTIVITY_FINDACTIVITYLIST,
          method: 'post',
          data: {
            activityCategory: this.tab[this.tabActive].channelType,
            userCode
          }
        });
        if (res.code === 0 && res.content && res.content.length) {
          let arr = res.content.filter(item => { return item.isPublish != 0 });
          if(this.tabActive == 0){
            this.getProductList(res.content)
          }else{
            this.tab[this.tabActive].items = arr;
          }
        }
      }
    },
    async getUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_INFO,
        method: 'post',
      });
      if (res.code === 0) {
        localStorage.agentId = res.content.userId;
        sessionStorage.userInfo = JSON.stringify(res.content);
        //控制显示增员increaseFunction 0 - 允许 1-不允许
        this.tab[1].isLoad = res.content.increaseFunction == 1 ? true : false;
        this.getList();
      }
    },
    goPoster(url, list) {
      sessionStorage.activityCategory = this.tab[this.tabActive].channelType;
      sessionStorage.promote = JSON.stringify(list);
      util.setSessionStorageObj('promoteTab', this.tabActive);
      this.goPage(url)
    },
    async getProductList(res) {
      if (res && res.length > 0) {
        this.productTab[0].items = res;
        this.productTab[1].items = res.filter(item => { return item.itemType == 'child'});
        this.productTab[2].items = res.filter(item => { return item.itemType == 'accident'});
        this.productTab[3].items = res.filter(item => { return item.itemType == 'health'});
        this.productTab[4].items = res.filter(item => { return item.itemType == 'responsibility'});
        this.productTab[5].items = res.filter(item => { return item.itemType == 'family'});
      }
    },
  }
};
</script>

<style lang="less">
@import './../../assets/less/app/promote/promote.less';
</style>
