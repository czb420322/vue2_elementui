<template>
  <div class="homeSearch afe-area-inset-bottom" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <v-header :title="{ name: '搜索' }"></v-header>
      <div >
        <van-sticky :offset-top="($iosSystem + 45)">
          <div class="tabs-box">
            <!-- <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
              <van-tab v-for="(item,index) in tab" :key="index" :title="item.channelName"></van-tab>
            </van-tabs> -->
             <div>
                <!-- <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="#0252ff" /> -->
                <van-search
                    class="search_seekList"
                    v-model="value"
                    show-action
                    background="#0252ff"
                    placeholder="请输入产品名称"
                    >
                    <template #action>
                        <div @click="getProductList()">搜索</div>
                    </template>
                </van-search>

            </div>
          </div>
        </van-sticky>
        <ol class="list-box" v-show="list.length">
          <li class="item" v-if="isLogin">
            <!-- <h5 class="name"><img class="icon" src="./../../../../public/img/home/noCar/icon_01.png" alt="">获客神器</h5> -->
            <van-card :title="item.productName" :thumb="item.productLabelImageUrl" v-for="(item,index) in list" :key="index" @click="goProductDetail(item.productUrl)">
              <template #desc>
                <!-- <div class="tag" v-if="item.productTag">
                  <van-tag color="#38C1E8" v-for="(tag, i) in item.productTag" :key="i" plain>{{tag}}</van-tag>
                </div> -->
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content ">
                    <p class="price" v-html="item.productPrice">￥<span>{{item.productPrice}}</span>元起</p>
                    <p class="add_bar" v-if="item.saleDesc" @click.stop="showDrill" ><span class="saleDesc" v-if="userInfo.agentType != '1'" v-html="item.saleDesc"></span></p>
                </div>
              </template>
               <template #footer>
                <van-button  class="btn_immediately" size="mini" type="info" @click="goProductDetail(item.productUrl)">立即投保</van-button> 
              </template>
            </van-card>
          </li>
        </ol>
          <masonryHint-rules ref="masonryHint"></masonryHint-rules>
        <my-empty description="更多产品，敬请期待" v-show="!list.length"></my-empty>
      </div>
      <click-login v-if="isLogin !== '' && isLogin == false"></click-login>
      
    </div>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
      value:'',
      list:[],
      tabActive: 0,
      isLogin: '',
      userInfo:{},
    };
  },
  async created() {
    this.userInfo = await common.getUserInfo()
   
  },
  methods: {
    async getProductList() {
        this.isLogin = true;
        const res = await this.$axios({
          url: this.$API.API_HOME_LIKELIST,
          method: 'get',
          params: {
            productSubType:"all",
            type:"page",
            system:"jk",
            agentCode:localStorage.getItem('agentCode') || '',
            key:this.value
          }
        });
        if (res.code === 0) {
          this.list = res.content.productList || []
        } else {
          this.$toast(res.message);
        }
    },
    goProductDetail(url){
      util.setSessionStorageObj('productListTab', this.tabActive );
      this.goPage(url)
      this.$router.push({path: '/businessSet',query:{url}})
    },
    showDrill(){
       this.$refs.masonryHint.parentMsg(true);
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/homeSearch/homeSearch.less';
.search_seekList .van-search__action{
    background: #fff;
}
.search_seekList{
    padding-right:12px;
}
.van-card__header{
  display: block;
}
.van-card__header{
  background-color: #fff;
}
.homeSearch .list-box .item .van-card{
  background-color: rgba(0, 0, 0, 0);
}
.van-card__content {
  margin-left: 16px;
}
.btn_immediately{
  width: 80px;
  height: 35px;
  border-radius: 3px;
  position: absolute;
  bottom: 14px;
  right: 31px;
}
.item{
  margin-top: 10px;
}
.van-button__content{
  font-size: 14px;
}
.list-box{
  margin-bottom: 58px;
}
</style>
