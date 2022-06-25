<template>
  <div class="noCarPage afe-area-inset-bottom productList" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <div class="search_fence">
          <van-search class="search_input" v-model="searchValue" placeholder="请输入产品名称" shape="round"  />
          <span class="serch" @click="getProductListByName()">搜索</span>
        </div>
        <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <van-nav-bar title="产品列表" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left"  size="20" @click="onClickLeft" />
      </template>
      <!-- <template #right>
        <van-icon :name="img"  size="18" @click="goShareList()"/>
      </template> -->
    </van-nav-bar> 
      <div>
        <!-- <van-sticky :offset-top="($iosSystem + 45)"> -->
          <div class="tabs-box">
            <van-tabs v-model="tabActive" type="card"  title-inactive-color="#666"  class="white" @click="strike()">
              <van-tab v-for="(item,index) in tab" :key="index" :title="item.channelName" plain class="tabItems"></van-tab>
            </van-tabs>
          </div>
           <!-- <div class="search_box" v-show="tabActive == 0">
            <van-search v-model="searchValue" show-action left-icon placeholder="请输入产品名称">
              <template #action>
                <div class="name_s" @click="onSearch">搜索</div>
              </template>
            </van-search>
          </div> -->
        <!-- </van-sticky>        -->
        <ol class="list-box" v-show="tab[tabActive].items.length">
          <li class="item">
            <van-card v-show="seekState" :title="item.productName" :thumb="item.productImageUrl" v-for="(item,index) in tab[0].items2" :key="index" @click="goProductDetail(item.productUrl,item.productTag,item.productImageUrl,item.productName)">
              <template #title>
                <div class="van-card__title">
                  {{item.productName}}
                  <img class="van-card__title_icon" v-if="item.activityImgUrl" :src="$CTXBASE + item.activityImgUrl" alt="">
                </div>
              </template>
              <template #desc>
                <div class="tag" v-if="item.productTag">
                  <van-tag color="#38C1E8" v-for="(tag, i) in item.productTag" :key="i" plain>{{tag}}</van-tag>
                </div>
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content ">
                  <p class="price">￥<span>{{item.productPrice}}</span>元起</p>
                  <p class="add_bar" v-if="item.saleDesc && userInfo.agentType && userInfo.agentType != '1' && userInfo.agentType != '0'" @click.stop="showDrill"><span class="saleDesc" v-html="item.saleDesc"></span>&nbsp;
                    <van-icon name="arrow" />
                  </p>
                </div>
              </template>
            </van-card>
            <van-card v-show="!seekState" :title="item.productName" :thumb="item.productLabelImageUrl" v-for="(item,index) in tab[tabActive].items" :key="index" @click="goProductDetail(item.productUrl,item.productTag,item.productImageUrl,item.productName)">
              <template #title>
                <div class="van-card__title">
                  {{item.productName}}
                  <img class="van-card__title_icon" v-if="item.activityImgUrl" :src="$CTXBASE + item.activityImgUrl" alt="">
                </div>
              </template>
              <template #desc>
                <!-- <div class="tag" v-if="item.productTag">
                  <van-tag color="#38C1E8" v-for="(tag, i) in item.productTag" :key="i" plain>{{tag}}</van-tag>
                </div> -->
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content ">
                  <p class="price" v-html="item.productPrice"></p>
                  <p class="add_bar" v-if="item.saleDesc && userInfo.agentType && userInfo.agentType != '1' && userInfo.agentType != '0'" @click.stop="showDrill"><span class="saleDesc" v-html="item.saleDesc"></span>&nbsp;
                    <van-icon name="arrow" />
                  </p>
                </div>
              </template>
              <template #footer>
                <van-button size="mini" type="info" @click="goProductDetail(item.productUrl)">立即投保</van-button> 
              </template>
            </van-card>
          </li>
        </ol>
        <masonryHint-rules ref="masonryHint"></masonryHint-rules>
        <my-empty description="更多产品，敬请期待" v-show="seekState ? !tab[0].items2.length : !tab[tabActive].items.length"></my-empty>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import life from '../../assets/js/module/life';
import img from './../../../public/img/account/fenxiang_bai.png';
export default {
  data() {
    return {
      img:img,
      tab: [
        {
          "channelType": "all",
          "channelName": "全部",
          "items": [],
          "items2": [],
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
        // {
        //   "channelType": "all",
        //   "channelName": "全部",
        //   "items": [],
        //   "items2": [],
        //   isLoad: false
        // },
        //  {
        //   "channelType": "accident",
        //   "channelName": "意外险",
        //   "items": [],
        //   isLoad: false
        // },
        // {
        //   "channelType": "serious",
        //   "channelName": "重疾险",
        //   "items": [],
        //   isLoad: false
        // },
        //  {
        //   "channelType": "property",
        //   "channelName": "家财险",
        //   "items": [],
        //   isLoad: false
        // },
      ],
      tabActive: 0,
      userInfo: {},
      searchValue:'',
      seekState:false,
    };
  },
  async created() {
    this.userInfo = await common.getUserInfo() || {};

    let tab = util.getSessionStorageObj('productListTab');
    this.tabActive = tab || 0;
    util.removeSessionStorageObj('productListTab');

    this.getProductList(util.getSessionStorageObj("PRODUCT_LIST"));
    this.getProductList(await life.getProductList({ productSubType: this.tab[0].channelType,agentCode:localStorage.getItem('agentCode')}));

  },
  methods: {
    strike(){
     this.seekState = false
     this.searchValue = ''
    },
     // 搜索
    async onSearch() {
      if (!this.searchValue) {
        this.$toast('请输入搜索条件');
        return;
      }
      this.seekState = true;
      const res = await this.$axios({
        url: this.$API.API_PRODUCT_LIST,
        method: 'post',
        loading:false,
        data: {
          productSubType:'all',
          agentCode:localStorage.getItem('agentCode'),
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system'),
          productSearchValue:this.searchValue
			  }
      });
      if(res.code === 0 && res.content.result === '0') {
       this.tab[0].items2 = res.content.productList
      }else{
			this.$toast(res.content.resultMessage);
		}
     
    },
    async getProductListByName() {
      if (!this.searchValue) {
        this.$toast('请输入搜索条件');
        return;
      }
      this.isLogin = true;
      const res = await this.$axios({
        url: this.$API.API_HOME_LIKELIST,
        method: 'get',
        params: {
          productSubType:"all",
          type:"page",
          system:"jk",
          agentCode:localStorage.getItem('agentCode') || '',
          key:this.searchValue
        }
      });
      if (res.code === 0) {
        this.tabActive = 0;
        this.tab[0].items = res.content.productList || []
      } else {
        this.$toast(res.message);
      }
    },
      // 分享列表转录
    goShareList() {
      this.goPage('wxSetShift')
    },
    async getProductList(res) {
      if (res && res.code === 0 && res.content.result === '0') {
        this.tab[0].items = res.content.productList;
        this.tab[1].items = res.content.productList.filter(item => { return item.productSubType == 'child'});
        this.tab[2].items = res.content.productList.filter(item => { return item.productSubType == 'accident'});
        this.tab[3].items = res.content.productList.filter(item => { return item.productSubType == 'health'});
        this.tab[4].items = res.content.productList.filter(item => { return item.productSubType == 'responsibility'});
        this.tab[5].items = res.content.productList.filter(item => { return item.productSubType == 'family'});
        //  this.tab[1].items = res.content.productList.filter(item => { return item.productSubType == 'accident'});
        // this.tab[2].items = res.content.productList.filter(item => { return item.productSubType == 'serious'});
        // this.tab[3].items = res.content.productList.filter(item => { return item.productSubType == 'property'});
      }
    },
    goProductDetail(url,productTag,productImageUrl,productName) {
      util.setSessionStorageObj('productListTab', this.tabActive);
      // this.goPage(url)
      util.setLocalStorageObj('productName',productName)
      util.setLocalStorageObj("home_productTag", productTag);
      util.setLocalStorageObj("home_productImageUrl", productImageUrl);
      this.$router.push({path: '/businessSet',query:{url}})
    },
    showDrill() {
      this.$refs.masonryHint.parentMsg(true,this.userInfo.agentType);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/app/home/noCars.less';
#app.iosSystem .productList .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .productList .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.productList{
  .van-tab{
        border: 1px solid #5785f4;
        margin: 1px 8px 8px 12px;
        // padding: 3px 0px;
      }
  .van-tabs--line .van-tabs__wrap {
    height: 35px;
  }
}
/deep/.desc-box{
  align-items: baseline;
  line-height: 1px;
  p{ 
    margin:1em 0 !important;
  }
}
.van-card__header{
  display: block;
}
.van-card__footer{
   position: absolute;
   bottom: 13px;
   right: 13px;
}
.van-button--mini{
  width: 80px;
  height: 35px; 
  font-size: 14px;
}
.van-card{
  margin: 10px 0;
  padding: 0;
}
.van-card__content{
  margin-left:16px;
}
/deep/.van-tabs__nav--card{
  border: none;
  background: #eeeeee;
}
/deep/.van-tabs__nav--card .van-tab{
  border-right:none;
  border-radius: 15px;
  margin: 0 10px;
}
/deep/.van-tabs__nav--card .van-tab.van-tab--active{
 background-color: #4C7AE5;
}
/deep/.van-tabs__nav--card .van-tab{
 background-color: #fff;
}
.search_fence{
  width: 270px;
  position: fixed;
  top: -3px;
  z-index: 11111;
  left: 50px;
}
/deep/.van-search{
  background-color: rgba(0, 0, 0, 0);
  padding: 9px 0;
}
.serch{
  position: absolute;
  top: 16px;
  right: -37px;
}
</style>
