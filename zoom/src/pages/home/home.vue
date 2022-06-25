<template>
  <div>
    <div class="afe-area-inset-bottom home_box" id="index-page">
      <div>
        <div>
          <div class="search_box" :style="{ 'padding-top': ($iosSystem) + 'px' }">
            <!-- @click="goPage('service')" -->
            <!-- <div class="gr_top" @click="developing()">
              <img src="./../../../public/img/page/base/kf.png" class="news" />
              <p class="name">客服</p>
            </div> -->
            <!-- <div class="search_fence" @click="goPage('seekList')"> -->
            <!-- <div class="search_fence" @click="goPage('seekList')">
              <van-search class="search_input" v-model="value" placeholder="请输入产品名称" shape="round" background="#0252FF" disabled />
            </div> -->
            <!-- @click="GoupdRead()" -->
            <img class="logo_img" src="../../assets/img/login/ee2.png" alt="">
            <div class="gr_top" @click="developing()">
              <p class="red_dot" v-if="userInfo.unreadMessageNum> 0 ">{{userInfo.unreadMessageNum > 99 ? 99 : userInfo.unreadMessageNum}}</p>
              <!-- <img src="./../../../public/img/page/base/gr_02.png" class="news xx_w" />
              <p class="name">消息</p> -->
            </div>
          </div>
          <div class="search_banner" style="text-align:center">
            <!-- <img class="swipe_img" src="../../assets/img/home/five.jpg" :style="{ 'height': bannerH + 'px' }" /> -->
            <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators="false" :stop-propagation="false" :style="{ 'min-height': bannerH + 'px' }">
              <van-swipe-item v-for="(item, index) in loopPlayList" :key="index">
                <router-link :to="item.linkUrl">
                  <img class="swipe_img" :src="item.imageUrl" :style="{ 'height': bannerH + 'px' }" />
                </router-link>
              </van-swipe-item>
            </van-swipe> -->
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item, index) in newprdListImg" :key='index'>
                <img :src="item.productLabelImageUrl" alt="" @click="goProductDetail(item.productUrl,item.productTag,item.productImageUrl,item.productName)">
              </van-swipe-item>
            </van-swipe>
            <div class="search_backdrop_cover"></div>
          </div>
        </div>
        <!-- <div class="search_backdrop_box" :style="{ 'height': bannerH/2 + 'px' }">
          <div class="search_backdrop_cover"></div>
        </div> -->

        <div class="padding30 mt_0">
          <van-swipe :loop="false">
            <van-swipe-item style="width: 93vw;">
              <div class="item" @click="goProductList">
                <img src="../../../public/img/login/rbt_noncar_logo.png" height="30px"/>
                <div>非车推荐</div>
              </div>
              <div class="item" @click="goCar">
                <img src="../../../public/img/login/rbt_carlogo.png" height="30px"/>
                <div>车险</div>
              </div>
              <div class="item" @click="goTrucks">
                <img src="../../../public/img/login/rbt_carTrucks.png" height="30px"/>
                <div>货车</div>
              </div>
              <div class="item" @click="goMotorbike">
              <img src="../../../public/img/login/rbt_motorbike.png" height="30px"/>
              <div>摩托车</div>
            </div>
            </van-swipe-item>
            <van-swipe-item style="width: 93vw;">
              <div class="item" @click="claims">
                <img src="../../../public/img/login/serch.png" height="30px"/>
                <div>理赔查询</div>
              </div>
            </van-swipe-item>
          </van-swipe>

          <!-- <div class="advertisement" v-for="(item,index) in highlyRecommendedList" :key="index">
            <img :src="item.imageUrl" alt @click="showState" :style="{ 'height': advertisingH + 'px', 'margin-top': '0' }" />
          </div> -->
          <div class="newprdlist_box">
          <van-tabs v-model="tabActive" class="newprdlist" color='#1577FF' swipeable>
            <van-tab v-for="(item,index) in newprdList" :key="index" :title="item.productSubTypeName" plain class="tabItems">
              <img  class="newprdlist_img" :src=newprdList[tabActive].productLabelImageUrl alt="" @click="goProductDetail(newprdList[tabActive].productUrl,newprdList[tabActive].productTag,newprdList[tabActive].productImageUrl,newprdList[tabActive].productName)">
            </van-tab>
          </van-tabs>      
          </div>
          <div class="hot">
            <div class="gr_title">
              热卖推荐
              <span @click="goPage('productList')" class="details">更多产品></span>
            </div>
            <!-- <div class="product-list">
              <div class="item wj_home_item" v-for="(item,index) in specialProductList" :key="index">
                <img class="bann_img" width="100%" :src="item.productImageUrl" @click="item.productUrl ? goPage(item.productUrl) : '' " />
              </div>
            </div> -->
            <ol class="list-box" v-for="(item,index) in specialProductList" :key="index">
              <li class="item">
                <van-card :thumb="item.productImageUrl" :title="item.productName" @click="goProductDetail(item.productUrl,item.productTag,item.productImageUrl,item.productName)">
              <template #title>
                <div class="van-card__title">
                  {{item.productName}}
                  <!-- <img class="van-card__title_icon" v-if="item.activityImgUrl" :src="$CTXBASE + item.activityImgUrl" alt=""> -->
                </div>
              </template>
              <template #desc>
                <!-- <div class="tag" v-if="item.productTag">
                  <van-tag color="#38C1E8" v-for="(tag, i) in item.productTag" :key="i" plain>{{tag}}</van-tag>
                </div> -->
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content" style="">
                  <div class="price" v-html="item.productPrice">
                  <!-- <span style="font-size:18px">{{item.productPrice}}</span> -->
                  <!-- 元/{{ item.termType === 'Y' ? '年' : item.termType === 'M' ? '月' : '天' }}{{ item.isMultiPlan === 'Y' ? '起' : '' }} -->
                  </div>
                  <div class="add_bar" v-if="item.saleDesc && userInfo.agentType && userInfo.agentType != '1' && userInfo.agentType != '0'" @click.stop="showDrill"><span class="saleDesc" v-html="item.saleDesc"></span>&nbsp;
                    <van-icon name="arrow" />
                  </div>
                </div>
              </template>
            </van-card>
           
              </li>
            </ol>
          </div>
        </div>
        <div class="logo_hui">
          <img src="./../../../public/img/page/base/gr_04.png" />
        </div>
      </div>
    </div>

    <v-footer></v-footer>
    <activity-rules ref="activityRules" :personageData='personageData'></activity-rules>
  </div>
</template>

<script>
import vFooter from "@/templates/footer.vue";
import common from "./../../assets/js/util/common";
import util from "../../assets/js/util/util";
import agent from "../../assets/js/module/agent";

import { mapState } from 'vuex'
import { CollapseItem } from 'vant';

export default {
  components: {
    vFooter: vFooter,
  },
  data() {
    return {
      value: "",
      bannerH: "",
      advertisingH: "",
      personageData: {},
      unreadList: "",
      getSystemWordList: {},
      readNum: 0,
      newprdList:[],
      newprdListImg:[],
      tabActive: 0,
      // homeListData:[
      //   {
      //     titleName:"非车",
      //     className:"../../../public/img/login/rbt_noncar_logo.png",
      //     url:"productList"
      //   },
      //   {
      //     titleName:"车险",
      //     className:"../../../public/img/login/rbt_carlogo.png",
      //     url:"businessSet?vehicleType=01"
      //   },
      //   {
      //     titleName:"货车",
      //     className:"../../../public/img/login/rbt_carlogo.png",
      //     url:"businessSet?vehicleType=02"
      //   },
      //   {
      //     titleName:"理赔服务",
      //     className:"../../../public/img/login/serch.png",
      //     url:"compensate"
      //   }
      // ]
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.my.UserInfo,
      loopPlayList: state => state.home.loopPlayList,
      specialProductList: state => state.home.specialProductList,
      homeCardList: state => state.home.homeCardList,
      highlyRecommendedList: state => state.home.highlyRecommendedList,
      special: state => state.car.special,
      licenseCategory: state => state.car.licenseCategory,
      manageCode: state => state.my.manageCode,
    })
  },
  async created() {
    this.tabActive = 0;
    this.$store.dispatch('my/getUserInfo');
    this.$store.dispatch('home/getHomeInfo');
    this.bannerH = document.documentElement.clientWidth * 0.37;
    this.advertisingH = document.documentElement.clientWidth * 0.27;

    this.getOwnInfo();
    this.getHomeImg();

    this.getSystemWordList = (await common.getSystemWord()) || {};
    for (let i in this.getSystemWordList) {
      if (this.getSystemWordList[i].isRead == "N") {
        this.readNum++;
        this.unreadList += this.getSystemWordList[i].id + ",";
      }
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (this.unreadList && this.unreadList.length > 0) {
      this.unreadList = this.unreadList.substr(0, this.unreadList.length - 1);
      util.setSessionStorageObj("unreadList", this.unreadList);
    }

    util.setSessionStorageObj("readNum", this.readNum);
    this.$store.commit('renewedInsurance/resetState');
    this.$store.commit('study/resetState');
    this.$store.commit('car/resetState');
    this.$store.commit('clockIn/resetState');
     if(util.getLocalStorageObj("transcribePhone")){
       util.removeLocalStorageObj("transcribePhone")
       if(util.getLocalStorageObj("transcribeName")){
          util.removeLocalStorageObj("transcribeName")
        }
     }
     if(util.getLocalStorageObj("businessType")){
       util.removeLocalStorageObj("businessType")
     }
     if(util.getLocalStorageObj("searchList")){
       util.removeLocalStorageObj("searchList")
     }
     if(util.getLocalStorageObj("agreementList")){
       util.removeLocalStorageObj("agreementList")
     }
     if(util.getLocalStorageObj("sysAgentExpandDTO")){
       util.removeLocalStorageObj("sysAgentExpandDTO")
     }
    this.getHomeInfoL();
     if(this.manageCode == '03000000'){
       for (let i = 0; i < this.special.length; i++) {
         this.licenseCategory.data.push(this.special[i])
       }
     }
  },

  methods: {
    goProductDetail(url,productTag,productImageUrl,productName) {
      // util.setSessionStorageObj('productListTab', this.tabActive);
      //this.goPage(url)
      util.setLocalStorageObj("productName",productName)
      util.setLocalStorageObj("home_productTag", productTag);
      util.setLocalStorageObj("home_productImageUrl", productImageUrl);
      this.$router.push({path: '/businessSet',query:{url}})
    },
    //客服和消息暂时关闭
    developing() {
      this.$toast('功能开发中，敬请期待！');
    },
    //非车产品跳转
    goProductList(){
      this.$router.push({path: '/productListTwo'})

    },
    //车险跳转
    goCar(){
      let carType = "2"
        if(!this.authority(carType)){
        this.$toast('功能开发中，敬请期待！');
        }else{
          this.$router.push({path: '/businessSet'})
        }
    
      
    },
    claims(){
        if(this.userInfo.carFlag === "0"){
        this.$toast('功能开发中，敬请期待！');
        }else{
          this.$router.push({path: '/compensate'})
        }
    
      
    },
    // 货车投保
    goTrucks(){
      let carType = "3"
      if(!this.authority(carType)){
        this.$toast('功能开发中，敬请期待！');
      }else{
        this.$router.push({
          name:"businessSet",
          query:{
            vehicleType:'02'
          }
        })
      }
    },
    // 摩托车投保
    goMotorbike(){
      let carType = "4"
      if(!this.authority(carType)){
        this.$toast('功能开发中，敬请期待！');
      }else{
        this.$router.push({
          name:'businessSet',
          query:{
            vehicleType:'03'
          }
        })
      }
    },
    authority(carType){
      let carFlag = []
      this.userInfo.carFlag.map(item=>carFlag.push(item))
      if(carFlag.indexOf(carType) == -1){
        return false
      }else {
        return true
      }
    },
    //修改消息状态
    async GoupdRead() {
      // if (this.readNum > 0) {
      //   await common.updRead(this.unreadList);
      // } else {
      this.$router.push({ name: "informationList" });
      // }
    },
    //获取申请代理人的步骤
    async getOwnInfo() {
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: "get",
        loading: "false",
      });
      if (res.code === 0 && res.content) {
        util.setSessionStorageObj("personageData", res.content);
        this.personageData = res.content;
        this.personageData.agentType =
          this.userInfo && this.userInfo.agentType
            ? this.userInfo.agentType
            : "";
        this.personageData.userId =
          this.userInfo && this.userInfo.userId ? this.userInfo.userId : "";
      }
    },
    // goClass(item) {
    //   switch (item.titleName) {
    //     case '车险投保':
    //       if (this.userInfo.openCarFunction == '0') {
    //         this.goPage('carInsurance');
    //       } else {
    //         this.$toast('功能开发中，敬请期待！');
    //       }
    //       break;
    //     case '货车投保':
    //       if (this.userInfo.openTruckFunction == '0') {
    //         this.goPage(item.url);
    //       } else {
    //         this.$toast('功能开发中，敬请期待！');
    //       }
    //       break;
    //     case '考勤打卡':
    //       if (this.userInfo.openClockIn == '0') {
    //         this.goPage(item.url);
    //       } else {
    //         this.$toast('功能开发中，敬请期待！');
    //       }
    //       break;
    //     default:
    //       this.$router.push({ path: "/" + item.url });
    //   }
    // },
    showState() {
      this.$refs.activityRules.parentMsg(true);
    },
    async getHomeInfoL() {
    const res = await this.$axios({
      url: this.$API.API_HOME_NEWPRD,
      method: 'get',
      params: {
        type: sessionStorage.getItem('type'),
        system: sessionStorage.getItem('system'),
        // manageVersion: store.state.common.manageVersion,
        selectType: 'newPrd'//新品推荐产品
      }
    });
    if (res && res.code === 0 && res.content.result === '0') {
      this.newprdList = res.content.productList
      console.log(this.newprdList,'123')
    }
  },
    async getHomeImg() {
    const res = await this.$axios({
      url: this.$API.API_HOME_NEWPRD,
      method: 'get',
      params: {
        type: sessionStorage.getItem('type'),
        system: sessionStorage.getItem('system'),
        selectType: 'homePrd'//首页轮播产品
      }
    });
    if (res && res.code === 0 && res.content.result === '0') {
      this.newprdListImg = res.content.productList
      console.log(this.newprdListImg,'qqqq')
    }
  }
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/css/index.css';
.logo_img{
  width: 90px;
  margin: 10px 0 8px 19px;
}
.price{
  line-height: 12px;
  color: #FF6330;
}
.gr_title{
  background-color: white;
  padding: 8px;
  margin-bottom: 0;
  margin-top: 0;
  font-size: 16px;
}

/deep/.desc-box{
  display: flex;
  flex-wrap: wrap;
  opacity: 0.5;
  align-items: baseline;
  line-height: 1px;
  font-size: 13px;
  p{
    margin:1em 0 !important;
  }
}
.van-card__title{
  font-weight: 700;
  font-size: 16px;
  padding-top: 5px;
}
.tag{
  margin-top: 8px;
}
.tag_items{
display: flex;
font-size:12px;
margin: 6px 0;
}
.van-tag--default.van-tag--plain{
  margin-right: 8px;
}
.goods_intro{
  margin-left: 5px;
}
.category{
  display:flex;
  background-color: #fff;
  justify-content: space-around;
  margin: 8px 0;
  padding: 10px 0;
  border-radius: 3px;
}
.goods{
  background-color: #fff;
  margin-top: 10px;

  
  .goods_title{
    font-weight:700;
    padding: 4px 0 0 8px;
    margin-bottom: 8px;
  }
  .price{
    color: red;
  }
}
.mt_0 {
  margin-top: 0;
  .van-swipe{
    position: relative;
    margin: 10px 0;
    padding-bottom: 10px;
    background: #fff;
    .van-swipe__track{
      height: 70px;
      .van-swipe-item{
        padding: 8px 0;
        display: flex;
        justify-content: space-around;
        .item{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .van-swipe__indicators{
      position: absolute;
      bottom : 8px !important;
    }
  }
}
.wj_home_item {
  position: relative;
  .wj_home_txt {
    position: absolute;
    bottom: 1vh;
    left: 4.2vw;
    font-size: 1rem;
    transform: scale(0.6);
    transform-origin: 0 0;
    color: #e75015;
    margin: 0;
    z-index: 9;
  }
  .bann_img {
    border-radius: 8px;
  }
}
.red_dot {
  height: 20px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  background: red;
  border-radius: 50%;
  position: absolute;
  right: 0.2rem;
  z-index: 99;
  margin: 0;
  transform: scale(0.8);
}
.search_fence .van-search {
  padding: 0;
  margin: 0;
  .van-search__content {
    // background: rgba(255, 255, 255, 0.9);
    background: #f2f2f2
  }
  .van-cell {
    line-height: 20px;
  }
}
// .van-card__content{
//   // border: 1px solid red;
//   justify-content: space-around;
// }

.newprdlist_box{
  background-color: #fff;
  margin-bottom: 10px;
  position: relative;
  padding: 2px 10px;
  .newprdlist_img{
    width: 100%;
    height: 190px;
    border-radius: 8px;
  }
}
/deep/.van-tabs--line .van-tabs__wrap{
  margin-bottom: 10px;
}
.hot .gr_title span{
  font-size: 14px;
  font-weight: bold;
}
/deep/.van-tab__text--ellipsis{
  font-weight: bold;
}
</style>