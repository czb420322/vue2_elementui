<template>
  <div class="productDetailPage shenzhenyimiao">
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <van-nav-bar title="位置信息" :border="false" :fixed="true">
      <template #left>
        <!-- <van-icon name="location-o" />
        <p>北京</p> -->
      </template>
      <template #right>
        <!-- <p>关闭</p> -->
      </template>
    </van-nav-bar>

    <div class="page-group">
      <div ref="scrollContent" @scroll="contentScroll" class="content product-detail-content afe-area-inset-bottom">
        <div class="product-detail-div">
          <div class="product-banner" :style="{ 'padding-top': ($iosSystem + 45) + 'px' }">
            <div class="banner background-img" v-if="productList.length" :style="{'height': '57.6vw', backgroundImage:'url(' + JSON.parse(productList[0].homePageInfo)[0].imageURL + ')'}">
              <div class="banner-overlay" style="background-color: rgba(0, 0, 0, 0); height: 100%; width: 100%; position: absolute; top: 0px; left: 0px;">
                <p class="banner-name" style="padding: 0px; line-height: 1;">{{pageData.saleNameDesc}}</p>
                <p class="banner-desc" style="margin: 1rem 0px; padding: 0px 0.9rem 0px 0px;">
                  <!-- <span>{{pageData.saleTipDesc}}</span> -->
                </p>
              </div>
            </div>
          </div>

        </div>
        <div class="SZ_frame">
          <!-- <van-field :value="city" readonly @click="showAreaPicker()" label="地址" placeholder="请输入地址" is-link /> -->
         <h5 class="SZ_hint">请选择</h5>
         <div class="SZ_select">
          <p @click="disposeData(0)">{{economize}}</p>
          <p @click="disposeData(1)">{{city}}</p>
          <p @click="disposeData(2)">{{distinguish}}</p>
          <p @click="disposeData(3)">{{hospital}}</p>
         </div>
          <div class="SZ_province">
            <div class="SZ_grt" v-for="(item, index) in listCity" :key="index" @click="getCity(item.areaID,item)">
              <van-icon :name="imgDW"  size="24" />
              <p>{{item.areaName}}</p>
            </div>

          </div>
        </div>
      </div>

    </div>
      <areaPicker ref="areaPicker" @click="areaConfirm"></areaPicker>
  </div>
</template>

<script>
import imgDW from './../../../public/img/account/dw.png';
import common from '../../assets/js/util/common';
import util from '../../assets/js/util/util';
import glutton from '../../assets/js/util/glutton';
import areaPicker from '../../templates/areaPicker';
import { mapState } from 'vuex'
export default {
   components: {
    areaPicker
  },
  data() {
    return {
      imgDW:imgDW,
      city:'',
      pageData: {
        saleTopPic: '',//销售产品图片
        saleNameDesc: '',//销售产品名称
      },
      listCity: [],
      listCity0: [],
      listCity1: [],
      listCity2: [],
      listCity3: [],
      economize:'',//省
      city:'',//市
      distinguish:'',//区
      hospital:'',//医院
      areaType:'0',
      productList:[],
      code:'',
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
  computed: {
    ...mapState({
      manageVersion: state => state.common.manageVersion,
    })
  },
  async created() {
    this.$store.commit('common/updateState', [{ name: ['manageVersion'], value: '090001'}])
    glutton.startRecording(); // 回溯录制
    this.code = common.getUrlParam('code') || ''
    this.getCity();//查询城市
    this.getProductList()
    if(this.code != '' && !util.getSessionStorageObj("SZList")){
      this.getSaveWxUserInfo()
    }else if(util.getSessionStorageObj("SZList")){
      let SZList = util.getSessionStorageObj("SZList")
        this.agentCode = SZList.agentCode || ''
        this.appId = SZList.appId ||''
        this.openId = SZList.openId || ''

        this.businessType = SZList.businessType || ''
        this.agreementNo = SZList.agreementNo || ''
        this.transcribeName = SZList.transcribeName || ''
        this.transcribePhone = SZList.transcribePhone || ''
        this.phone = SZList.transcribePhone || ''
    }
  },
  methods: {
    // 城市选择
    showAreaPicker() {
      this.$refs.areaPicker.parentMsg(3);
    },
     areaConfirm(value) {
      // this.city = value[0].name + value[1].name + value[2].name
    },
    disposeData(num){
      this.listCity = []
      if(num == 0){
        this.listCity = this.listCity0
        this.economize = ''
        this.city = ''
        this.distinguish = ''
        this.hospital = ''
        this.areaType = 1
      }else if(num == 1){
        this.listCity = this.listCity1
        this.city = ''
        this.distinguish = ''
        this.hospital = ''
        this.areaType = 2
      }else if(num == 2){
        this.listCity = this.listCity2
        this.distinguish = ''
        this.hospital = ''
        this.areaType = 3
      }else if(num == 3){
        this.listCity = this.listCity3
        this.hospital = ''
      }
    },
    async getCity(areaID,item) {
      var areaName = ''
      if(item){
        areaName = item.areaName
      }
      const res = await this.$axios({
        url: this.$API.API_COMMOMAREA,
        method: 'post',
        data: {
          "areaType":this.areaType,
          "supperID":areaID
        }
      });

      if(res.code == 0 && res.content.result == '0'){
        this.listCity = []
        this.listCity =  res.content.data || []
        if(this.areaType == '0'){
          this.listCity0 = []
          this.listCity0 = res.content.data || []
          this.areaType = 1
        }else if(this.areaType == 1){
           this.listCity1 = []
          this.economize = areaName
          this.listCity1 = res.content.data || []
           this.areaType = 2
        }else if(this.areaType == 2){
           this.listCity2 = []
          this.city = areaName
          this.listCity2 = res.content.data || []
           this.areaType = 3
        }else if(this.areaType == 3){
           this.listCity3 = []
          this.distinguish = areaName
          this.listCity3 = res.content.data || []
          this.areaType = 4
        }else{
          this.hospital = areaName
          let link =`&phone=${this.transcribePhone}&transcribePhone=${this.transcribePhone}&agentCode=${this.agentCode}&agentId=${this.agentId}&activityId=${this.activityId}&businessType=${this.businessType}&agreementNo=${this.agreementNo}&transcribeName=${this.transcribeName}&appId=${this.appId}&openId=${this.openId}`
          this.goPage('shenzhenyimiaoList?orderArea='+this.economize+this.city+this.distinguish + '&medicalOrgName='+this.hospital+link)
        }

      }
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
        this.productList = res.content.productList || []
      }
	},
  //查询微信
  async getSaveWxUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_SAVEWXUSERINFO,
        method: 'post',
        loading: 'false',
        data: {
          code:this.code,
        }
      });
      if (res.code === 0 && res.content.result === 0) {
        this.agentCode = res.content.data.bindAgentCode || ''
        this.appId = res.content.data.appId ||''
        this.openId = res.content.data.openId || ''

        this.businessType = res.content.data.businessType || ''
        this.agreementNo = res.content.data.agreementNo || ''
        this.transcribeName = res.content.data.transcribeName || ''
        this.transcribePhone = res.content.data.transcribePhone || ''
        this.phone = res.content.data.transcribePhone || ''
        let SZList = {
          'agentCode':res.content.data.bindAgentCode || '',
          'appId':res.content.data.appId || '',
          'openId':res.content.data.openId || '',
          'businessType':res.content.data.businessType || '',
          'agreementNo':res.content.data.agreementNo || '',
          'transcribeName':res.content.data.transcribeName || '',
          'transcribePhone':res.content.data.transcribePhone || '',
          'phone':res.content.data.transcribePhone || '',
        }
        util.setSessionStorageObj("SZList", SZList);
      }

	},
  contentScroll(e) {
    let scrollTop = this.$refs.scrollContent.scrollTop;
    util.setSessionStorageObj("productDetailScrollTop", scrollTop);
  },


  },
  mounted() {

  },

};
</script>

<style lang="less">
@import '../../assets/less/app/home/productDetail.less';
@import '../../assets/less/app/product/productDetail.less';
#app.iosSystem .productDetailPage .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .productDetailPage .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.productDetailPage{
  .fosize14{
    font-size: 16px!important;
  }
}
.productDetailcontent {
  p {
    margin: 0;
  }
}
.shenzhenyimiao{
  .SZ_frame{
    background: #fff;
    .SZ_select{
      display: flex;
      padding: 0 6px 6px 6px;
      p{
        margin: 0 6px;
      }
    }
  }
  .SZ_hint{
    text-align: center;
    font-size: 14px;
    margin: 0;
    padding: 10px 0;
  }
  .SZ_province{
    display: flex;
    flex-wrap: wrap;
    .SZ_grt{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 16%;
      margin: 6px 2%;
      font-size: 14px;
      p{
        margin:0;
      }
    }

  }
}
</style>
