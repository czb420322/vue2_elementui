<template>
  <ol class="multipleInfoPage">
    <li class="list" v-if="insureInfo.saleCode == 'GRMOBILE_MALL_SL006' || insureInfo.saleCode == 'GRMOBILE_MALL_SL007' || insureInfo.saleCode == 'GRMOBILE_MALL_SL012' || insureInfo.saleCode == 'GRMOBILE_MALL_SL023' || insureInfo.saleCode == 'GRMOBILE_MALL_SL028' || insureInfo.saleCode == 'GRMOBILE_MALL_SL042'|| insureInfo.saleCode == 'GRMOBILE_MALL_SL060' || insureInfo.saleCode == 'GRMOBILE_MALL_SL061' || insureInfo.saleCode == 'RBTMOBILE_MALL_RBT0019'">
      <h1 class="title_bar">被保人信息<span v-if="insureNnumberPeople">（支持1-{{insureNnumberPeople}}人）</span></h1>
      <ol class="content_info">
        <li class="item" v-for="(item,index) in insureInfo.insuredData" :key="index" >
          <div class="name_bar">
            <img class="del_btn" @click="delSalePlan(index)" src="./../../../assets/img/base/del_icon.png" alt="">
            <span class="name">{{item.data.name || item.data.enterprise}}</span>
            <span class="tag">{{item.data.relationToAppnt == '00' ? '本人' : item.data.relationToAppnt == '05' ? '配偶' : item.data.relationToAppnt == '06' ? '子女' : item.data.relationToAppnt == '07' ? '父母' : item.data.relationToAppnt == '11' ? '其他' : item.data.relationToAppnt == '99' ? '监护人': '' }}</span>
          </div>
          <div class="price_bar" v-if="insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length && insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length == 2">
            <span class="origin_price" v-if="insurePremMap[item.data.idNo][0] != insurePremMap[item.data.idNo][1]">￥{{insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length ? insurePremMap[item.data.idNo][0] || 0 : 0}}元</span>
            <span class="price">￥{{insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length ? insurePremMap[item.data.idNo][1] || 0 : 0}}元</span>
          </div>
          <div class="price_bar" v-else>
            <span class="price">￥{{insurePremMap}}元</span>
          </div>
        </li>
        <li class="item add_bar" v-if="!insureInfo.insuredData || insureInfo.insuredData.length < insureNnumberPeople" >
          <a class="add_btn" @click="goPage('productDetailPersonalInfo?type=被保人信息')" >新增被保人</a>
        </li>
      </ol>
    </li>
     <li class="list" v-if="insureInfo.saleCode == 'GRMOBILE_MALL_SL027' || insureInfo.saleCode == 'GRMOBILE_MALL_SL064' || insureInfo.saleCode == 'GRMOBILE_MALL_SL065'">
      <h1 class="title_bar">被保人信息<span v-if="insureNnumberPeople">（支持2-{{insureNnumberPeople}}人）</span></h1>
      <ol class="content_info">
        <li class="item" v-for="(item,index) in insureInfo.insuredData" :key="index" >
          <div class="name_bar">
            <img class="del_btn" @click="delSalePlan(index)" src="./../../../assets/img/base/del_icon.png" alt="">
            <span class="name">{{item.data.name}}</span>
            <span class="tag">{{item.data.relationToAppnt == '00' ? '本人' : item.data.relationToAppnt == '05' ? '配偶' : item.data.relationToAppnt == '06' ? '子女' : item.data.relationToAppnt == '07' ? '父母' : '' }}</span>
          </div>
          <div class="price_bar" v-if="insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length && insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length == 2">
            <span class="origin_price" v-if="insurePremMap[item.data.idNo][0] != insurePremMap[item.data.idNo][1]">￥{{insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length ? insurePremMap[item.data.idNo][0] || 0 : 0}}元</span>
            <span class="price">￥{{insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length ? insurePremMap[item.data.idNo][1] || 0 : 0}}元</span>
          </div>
          <div class="price_bar" v-else>
            <span class="price">￥{{insurePremMap[item.data.idNo] && insurePremMap[item.data.idNo].length ? insurePremMap[item.data.idNo][0] || 0 : 0}}元</span>
          </div>
        </li>
        <li class="item add_bar" v-if="!insureInfo.insuredData || insureInfo.insuredData.length < insureNnumberPeople" >
          <a class="add_btn" @click="goPage('productDetailPersonalInfo?type=被保人信息')" >新增被保人</a>
        </li>
      </ol>
    </li>
  </ol>
</template>

<script>
import $ from 'jquery';
import common from '../../../assets/js/util/common';
import util from '../../../assets/js/util/util';
import compCheck from '../../../assets/js/util/comp-check';
export default {
  data() {
    return {
      saleCode: '',
      insureInfo: {
        // 投保人信息
        appntInfo: {
          struct: [],
          data: {
            name: 0
          }
        },
        insuredData: []
      },
      insureNnumberPeople: 0,
      insurePremMap: {}
    };
  },
  created(){
    this.parentPremMap();
    this.saleCode = this.$route.query.saleCode;
    setTimeout(()=>{
      this.parentMsg();
    }, 2000);
  },
  methods: {
    // 初始化页面数据
    parentMsg() {
      if (util.getSessionStorageObj('insureInfo')) {
        this.insureInfo = util.getSessionStorageObj('insureInfo');
        this.insureNnumberPeople = this.getInsureNnumberPeople();
      }
    },

    // 查询被保人数
    getInsureNnumberPeople(){
      let productDetail = util.getSessionStorageObj('productDetail');
      if( productDetail && productDetail.content){
        let temp = productDetail.content.salePlanInfo.struct.filter((item, index) => {
          return item.code == "insureNum"
        });
        if(temp.length){
          return temp[0].data[temp[0].data.length-1].value
        }else{
          return 1
        }
      }
    },
      
    // 删除被保人
    delSalePlan(index){
      let insuredData = JSON.parse(JSON.stringify(this.insureInfo.insuredData));
       insuredData.splice(index, 1); 
       this.insureInfo.insuredData = insuredData;
       util.setSessionStorageObj('insureInfo', this.insureInfo);
      
      this.setAgeIdNo();
    },

    // i国任-个人意外保险【家庭版】 GRMOBILE_MALL_SL006
    // i国任-法定传染病保障计划【家庭版】 GRMOBILE_MALL_SL007
    // i国任-全家保军人家属版 GRMOBILE_MALL_SL012
    // 获取年龄去试算
    setAgeIdNo() {
      let insuredInfo = [];
      for (let item of this.insureInfo.insuredData) {
        if(item.data.idType == '0'){
          if (item.data.idNo && compCheck.isIdno(item.data.idNo)) {
            let birthDay = compCheck.idNoChangeBirthday(item.data.idNo);
            insuredInfo.push({
              ...item.data,
              age: compCheck.getAgeByDate(birthDay)
            });
          }
        }else{
          insuredInfo.push({
            ...item.data,
            age: '30',//默认值因为不是身份证算不出年龄
          });
        }
          
      }
      let trialObj = util.getSessionStorageObj('trialObj');
      trialObj.salePlanInfo.data.insuredInfo = insuredInfo;
      util.setSessionStorageObj('trialObj', trialObj);
      this.$emit('click');
    },

    parentPremMap(){
      let insurePrice = util.getSessionStorageObj("insurePremMap");
      let insuredData = this.insureInfo.insuredData;
       util.setSessionStorageObj("insuredData", insuredData);
      if(insuredData && insuredData.length>0){
        let insurePremMap = {};
        for(let i=0;i<insuredData.length;i++){
          insurePremMap = insurePrice[insuredData[i].data.idNo]
        }
        this.insurePremMap = insurePremMap;
      }
      //if(insurePremMap){
        // for( let i in util.getSessionStorageObj("insurePremMap") ){
        //   if(insurePremMap[i]){
        //      insurePremMap[i] =  (insurePremMap[i]).toString().replace(",");
        //   }
        // }
        //this.insurePremMap = insurePremMap;
      //}
    }
  }
};
</script>

<style lang="less">
.multipleInfoPage {
  margin-top: 10px;
  .list {
    background-color: white;
    padding: 10px 16px;
    .title_bar {
      font-size: .92rem;
      margin: 0;
      padding: 0.2rem 0;
    }
    .content_info {
      margin: .5rem 0;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
      border-radius: .1rem;
      .item {
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        .name_bar {
          display: flex;
          align-items: center;
          .del_btn {
            display: block;
            width: .95rem;
            padding: 0.2rem 0.5rem 0.2rem 0;
            box-sizing: content-box;
          }
          .name {
            font-size: 0.9rem;
          }
          .tag {
            background-color: rgba(0, 0, 0, 0.1);
            font-size: 0.6rem;
            padding: 0 0.2rem;
            color: #888;
            line-height: 1.3em;
            margin-left: 0.2rem;
          }
        }
        .price_bar {
          display: flex;
          align-items: center;
          .origin_price {
            text-decoration: line-through;
            opacity: 0.5;
            margin-right: 0.4em;
          }
          .price {
            color: #fb7125;
          }
        }
      }
      .add_bar {
        justify-content: flex-end;
        .add_btn {
          color: #0894ec;
          padding: 0.2rem 0.5rem;
          border: 1px solid #0894ec;
          font-size: 0.8rem; 
          border-radius: .1rem;
        }
      }
    }
  }
}
</style>
