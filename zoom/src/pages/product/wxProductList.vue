<template>
  <div class="noCarPage afe-area-inset-bottom productList" style="margin-top:0">
    <!-- <div> -->
       <!-- <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <van-nav-bar title="产品列表" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#ffffff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <van-icon :name="img"  size="18" @click="goShareList()"/>
      </template>
    </van-nav-bar>
      <div> -->
        <van-sticky :offset-top="0">
          <div class="tabs-box">
            <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA">
              <van-tab v-for="(item,index) in tab" :key="index" :title="item.channelName"></van-tab>
            </van-tabs>
          </div>
        </van-sticky>
        <ol class="list-box" v-show="tab[tabActive].items.length">
          <li class="item">
            <van-card :title="item.productName" :thumb="item.productImageUrl" v-for="(item,index) in tab[tabActive].items" :key="index" @click="goProductDetail(item)">
              <template #desc>
                <div class="tag" v-if="item.productTag">
                  <van-tag color="#38C1E8" v-for="(tag, i) in item.productTag" :key="i" plain>{{tag}}</van-tag>
                </div>
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content ">
                  <p class="price">￥<span>{{item.productPrice}}</span>元起</p>
                  <!-- <p class="add_bar" v-if="item.saleDesc && userInfo.agentType && userInfo.agentType != '1'" @click.stop="showDrill"><span class="saleDesc" v-html="item.saleDesc"></span>&nbsp;
                    <van-icon name="arrow" /> -->
                  </p>
                </div>
              </template>
            </van-card>
          </li>
        </ol>
        <masonryHint-rules ref="masonryHint"></masonryHint-rules>
        <my-empty description="更多产品，敬请期待" v-show="!tab[tabActive].items.length"></my-empty>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import life from '../../assets/js/module/life';
import img from './../../../public/img/account/fenxiang_bai.png';
import { mapState } from 'vuex'
export default {
  data() {
    return {
      img:img,
      tab: [
        {
          "channelType": "all",
          "channelName": "全部",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "accident",
          "channelName": "意外险",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "health",
          "channelName": "健康险",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "responsibility",
          "channelName": "责任险",
          "items": [],
          isLoad: false
        },
        {
          "channelType": "property",
          "channelName": "家财险",
          "items": [],
          isLoad: false
        },
      ],
      tabActive: 0,
      phone:'',
      transcribePhone:'',
      transcribeName:'',
      businessType:'',
      agreementNo:'',
      agentCode:'',
    };
  },
  computed: {
    ...mapState({
        userInfo: state => state.my.UserInfo, //个人资料数据
    }),
  },
  async created() {
    let tab = util.getSessionStorageObj('productListTab');
    this.tabActive = tab || 0;
    util.removeSessionStorageObj('productListTab');

    //先不判断身份显示可得多少i钻因为要多带个参数userId才可以
    // if(!this.userInfo.length){
    //   this.$store.dispatch('my/getWxInfo', { sysId:userId });
    // } 
    this.agentCode = this.$route.query.agentCode;
    this.phone = this.$route.query.phone;

    this.transcribePhone = this.$route.query.transcribePhone || '';
    this.transcribeName = this.$route.query.transcribeName || '';
    this.businessType = this.$route.query.businessType || '';
    this.agreementNo = this.$route.query.agreementNo || '';

    this.getProductList(util.getSessionStorageObj("PRODUCT_LIST"));
    this.getProductList(await life.getProductList({ productSubType: this.tab[0].channelType,agentCode:this.agentCode}));

  },
  methods: {
    async getProductList(res) {
      if (res && res.code === 0 && res.content.result === '0') {
        this.tab[0].items = res.content.productList;
        this.tab[1].items = res.content.productList.filter(item => { return item.productSubType == 'accident'});
        this.tab[2].items = res.content.productList.filter(item => { return item.productSubType == 'health'});
        this.tab[3].items = res.content.productList.filter(item => { return item.productSubType == 'responsibility'});
        this.tab[4].items = res.content.productList.filter(item => { return item.productSubType == 'property'});
      }
    },
    goProductDetail(item) {
      util.setSessionStorageObj('productListTab', this.tabActive);
      let a =`&phone=${this.transcribePhone}&transcribePhone=${this.transcribePhone}&agentCode=${this.$route.query.agentCode}&agentId=${this.$route.query.agentId}&activityId=${this.$route.query.activityId}&businessType=${this.businessType}&agreementNo=${this.agreementNo}&transcribeName=${this.transcribeName}`
      this.goPage('showProductDetail?saleCode='+item.productCode + a)
    },
    showDrill() {
      this.$refs.masonryHint.parentMsg(true,this.userInfo.agentType);
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/home/noCar.less';
.productList{
  .van-nav-bar__content{
    background: #0252ff;
    .van-nav-bar__title {
      color: #ffffff;
    }
  }
}
</style>
