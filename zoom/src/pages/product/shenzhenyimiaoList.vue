<template>
  <div class="noCarPage afe-area-inset-bottom productList shenzhenyimiaoList" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
       <!-- <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i> -->
    <van-nav-bar title="产品列表" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#ffffff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <!-- <van-icon :name="img"  size="18" @click="goShareList()"/> -->
        <div  @click="showDetail = (showDetail ? false: true)">
          <van-icon name="arrow-down" size="20" v-if="!showDetail" />
          <van-icon name="arrow-up"  size="20" v-else/>
        </div>
      </template>
    </van-nav-bar>
      <div>
       <div class="sz_site" @click="onClickLeft()"><van-icon :name="imgDW"  size="20" /><span>{{orderArea}}</span><span>{{medicalOrgName}}</span></div>
        <ol class="list-box">
          <li class="item" v-for="(item,index) in productList" :key="index" v-if="index == 0 || showDetail ">
            <van-card :title="item.productName" :thumb="item.productImageUrl"  @click="goProductDetail(item.productCode,index)">
              <template #title>
                <div class="van-card__title">
                  {{item.productName}}
                  <img class="van-card__title_icon" v-if="item.activityImgUrl" :src="$CTXBASE + item.activityImgUrl" alt="">
                </div>
              </template>
              <template #desc>
                <div class="tag" v-if="item.productTag">
                  <van-tag color="#38C1E8" v-for="(tag, i) in item.productTag" :kye="i" plain>{{tag}}</van-tag>
                </div>
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content ">
                  <p class="price">￥<span>{{item.productPrice}}</span>元起</p>
                  <p class="toubao">立即投保</p>
                </div>
              </template>
            </van-card>
            <div>
                 <!-- 方案 -->
                <div class="schemeTab">
                  <van-tabs :class="'schemeTab' +  1" v-model="schemeNum" :swipe-threshold="3" animated>
                    <van-tab title="index">
                      <template #title>
                        <div class="item">
                          <p class="price">{{item.salePlanInfoDTO.programmePremium}}<span>元起</span></p>
                          <p class="fosize14 name2">{{item.salePlanInfoDTO.programmeName}}</p>
                        </div>
                      </template>
                    </van-tab>
                  </van-tabs>
                </div>
              <ol class="list-box mainRiskList">
                <li class="item sz_item">
                  <van-cell v-for="(mainRisk, index) in item.salePlanInfoDTO.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" />
                  <van-cell v-for="(addRisk, index) in item.salePlanInfoDTO.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" />
                  <!-- <van-cell v-if=" saleCode == 'GRMOBILE_MALL_SL014'" title="交强险免赔额" value="100万" /> -->
                </li>
              </ol>

            </div>
            
          </li>
        </ol>
        
        <!-- <my-empty description="更多产品，敬请期待" v-show="!tab[tabActive].items.length"></my-empty> -->
      </div>
    </div>
  </div>
</template>

<script>
import imgDW from './../../../public/img/account/dw.png';
import util from '../../assets/js/util/util';
export default {
  data() {
    return {
      showDetail: false,
      imgDW:imgDW,
      schemeNum: 0,
      tab: [
        {
          "channelType": "all",
          "channelName": "全部",
          "items": [],
          isLoad: false
        },
       
      ],
      tabActive: 0,
      productList:'',
      orderArea:'',//出单区域
      medicalOrgName:'',//医疗机构名称
      agentCode:'',
      phone:'',
      transcribePhone:'',
      transcribeName:'',
      businessType:'',
      agreementNo:'',
      activityId:'',
      appId:'',
      openId:'',
      agentId:'',
    };
  },
  async created() {
    this.orderArea = this.$route.query.orderArea || ''
    this.medicalOrgName = this.$route.query.medicalOrgName || ''

    this.agentCode = this.$route.query.agentCode;
    this.phone = this.$route.query.phone;
    this.transcribePhone = this.$route.query.transcribePhone || '';
    this.transcribeName = this.$route.query.transcribeName || '';
    this.businessType = this.$route.query.businessType || '';
    this.agreementNo = this.$route.query.agreementNo || '';
    this.activityId = this.$route.query.activityId || '';
    this.agentId = this.$route.query.agentId || '';
    this.appId = this.$route.query.appId || '';
    this.openId = this.$route.query.openId || '';

    this.getProductList()

  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
     async getProductList() {
      const res = await this.$axios({
        url: this.$API.API_PRODUCT_LIST,
        method: 'post',
        loading: 'false',
        data: {
          agentCode:'00000',//高高说先随便传几个0
          manageVersion:'090001',
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system'),
          productSubType:'all'
        }
      });
      if (res.code === 0 && res.content.result === '0') {
        this.productList = res.content.productList;
      }
	},
    goProductDetail(productCode,index) {
      //处理跳转后默认选中投保方案
      let a = 0
      let b = 'A'
      if(index == 0){
        a = 3
        b = 'D'
      }else if(index == 1){
        a = 2
        b = 'C'
      }else if(index == 2){
        a = 1
        b = 'B'
      }else if(index == 3){
        a = 0
        b = 'A'
      }
      util.setSessionStorageObj("schemeActive", a);
      util.setSessionStorageObj("setMealCode",b);
      // util.setSessionStorageObj('productListTab', this.tabActive);
      let link =`&phone=${this.transcribePhone}&transcribePhone=${this.transcribePhone}&agentCode=${this.$route.query.agentCode}&agentId=${this.$route.query.agentId}&activityId=${this.$route.query.activityId}&businessType=${this.businessType}&agreementNo=${this.agreementNo}&transcribeName=${this.transcribeName}&appId=${this.appId}&openId=${this.openId}&orderArea=${this.orderArea}&medicalOrgName=${this.medicalOrgName}`
      this.goPage('showProductDetail?saleCode=' +productCode+link)
    },
   
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/home/noCar.less';
.productList{
  .van-nav-bar{
    background: #0252ff;
    .van-nav-bar__title {
      color: #ffffff;
    }
  }
}
.shenzhenyimiaoList{
  .sz_item{
    .van-cell__value{
      flex: none;
      margin: auto;
    }
  }
  .toubao{
    font-weight: bold;
    font-size: 14px;
    background: #1989fa;
    border-radius: 10px;
    padding: 4px 10px;
    color: #fff;
  }
  .sz_site{
    display: flex;
    background: #fff;
    margin-bottom: 4px;
    padding: 10px 6px;
    font-size: 14px;
  }
  .list-box{
    .item{
      margin-bottom: 10px;
    }
  }
  .schemeTab1{
    width: 50%;
  }
  .schemeTab{
    margin-bottom: .25rem;
    background-color: #fff;
    .van-tabs__wrap{
      height: 4.6rem;
    }
     .item{
      height: 4.6rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      align-content: center;
      .name2{
        font-size: .68rem;
        margin: 0;
        width: 100%;
        text-align: center;
      }
      .price{
        margin: 0;
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        span{
          font-size: .8rem;
        }
      }
      
    }
  }
 
}
</style>
