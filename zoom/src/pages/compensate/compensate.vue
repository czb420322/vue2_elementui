<template>
  <div class="compensate" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <v-header :title="{ name: '理赔案件查询' }"></v-header>
      <div>
        <van-sticky :offset-top="($iosSystem + 45)">
          <div class="tabs-box">
            <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
              <van-tab v-for="(item,index) in tab" :key="index" :title="item.orderTypeName"></van-tab>
            </van-tabs>
             <van-tabs v-model="tabActive2" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick2">
              <van-tab v-for="(item,index) in tab2" :key="index" :title="item.orderTypeName"></van-tab>
            </van-tabs>
          </div>
          <div class="search_box">
            <van-dropdown-menu active-color="#0252ff">
              <van-dropdown-item @change="searchange()" v-model="type" :options="option1" />
            </van-dropdown-menu>
            <van-search :minlength="minLength"  :maxlength="maxLength" v-model="searchValue" show-action left-icon placeholder="请输入搜索关键词">
              <template #action>
                <div class="name_s" @click="onSearch">搜索</div>
              </template>
            </van-search>
          </div>
        </van-sticky>
        <!-- 理赔列表 -->
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
          <div class="result" v-if="isdetail">查询结果</div>
          <ol class="list-box" v-if="isdetail">
            <li class="list" v-for="(item2,index2) in carList" :key="index2">
              <div class="name">
                <img src="../../assets/img/base/left-2.png" alt="" class="left_img">
                <div :class="item2.claimsAmount?'list_baodan':'baodan_txt'">{{item2.riskName}}</div>                
              </div>
              <div class="info-box" >
                <p class="item"><span class="label">被保险人:</span><span class="txt">{{item2.insurNname}}</span></p>
                <p class="item"><span class="label">保障期限:</span><span class="txt">{{timestampToTime(item2.startDate) +'至'+ timestampToTime(item2.endDate)}}</span></p>
                <p class="item"><span class="label">报案编号:</span><span class="txt">{{item2.registNo}}</span></p>
                <p class="item"><span class="label">出险日期:</span><span class="txt">{{timestampToTime(item2.damStartDate)}}</span></p>
                <p class="item"><span class="label time">报案日期:</span><span class="txt time">{{timestampToTime(item2.reportDate)}}</span></p>
                <p class="money" v-if="item2.claimsAmount"><span>理赔金额:</span><span class="txt_money1">{{Number(item2.claimsAmount).toFixed(2)}}元</span></p>
                <div class="btn_detail" @click="details(index2)">查看详情</div>
              </div>
            </li>          
          </ol>
          <p v-if="currentPage==dataNum && isdetail &&carList!=''" class="noMore">没有更多案件~</p>
          <div v-if="carListNull" class="carListNull">
            抱歉，没有查到相关结果~
            </div>
        <!-- </van-list> -->
        <!-- 分页 -->
       <van-pagination v-if="carList!='' && isdetail" v-model="currentPage"  :page-count="dataNum" :items-per-page=1  mode="simple" @change="pagination" />
        <!-- 节点详情列表 -->
      <div class="box" v-if="isdetails">
        <div class="state">案件状态</div>
          <ul class="detail_box">
            <span :class="detailsList.nodeCode=='regist'?'activeline':'line'"></span> <li :class="detailsList.nodeCode=='regist'?'active':'item'"><span class="text">报案</span><span class="name" v-if="detailsList.nodeCode=='regist' && detailsList.operatorName  && !/^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName)">姓名: {{detailsList.operatorName}}</span> <span class="number" v-if="detailsList.nodeCode=='regist' && detailsList.phoneNo">电话号码:{{detailsList.phoneNo}}</span><span v-if="detailsList.nodeCode=='regist' && /^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName) && detailsList.phoneNo==''">案件处于当前节点,暂无联系人及联系方式</span></li>  
            <span :class="detailsList.nodeCode=='claim'?'activeline':'line'"></span> <li :class="detailsList.nodeCode=='claim'?'active':'item'"><span class="text">立案</span><span class="name" v-if="detailsList.nodeCode=='claim' && detailsList.operatorName && !/^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName)">姓名: {{detailsList.operatorName}}</span> <span class="number" v-if="detailsList.nodeCode=='claim' && detailsList.phoneNo">电话号码:{{detailsList.phoneNo}}</span><span v-if="detailsList.nodeCode=='claim' && /^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName) && detailsList.phoneNo==''">案件处于当前节点,暂无联系人及联系方式</span></li>
            <span :class="detailsList.nodeCode=='compensate'?'activeline':'line'"></span> <li :class="detailsList.nodeCode=='compensate'?'active':'item'"><span class="text">理算</span><span class="name" v-if="detailsList.nodeCode=='compensate' && detailsList.operatorName  && !/^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName)">姓名: {{detailsList.operatorName}}</span> <span class="number" v-if="detailsList.nodeCode=='compensate' && detailsList.phoneNo">电话号码:{{detailsList.phoneNo}}</span><span v-if="detailsList.nodeCode=='compensate'&& /^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName) && detailsList.phoneNo==''">案件处于当前节点，暂无联系人及联系方式</span></li>
            <span :class="detailsList.nodeCode=='verify'?'activeline':'line'"></span> <li :class="detailsList.nodeCode=='verify'?'active':'item'"><span class="text">核赔</span><span class="name" v-if="detailsList.nodeCode=='verify'&& detailsList.operatorName  && !/^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName)">姓名: {{detailsList.operatorName}}</span> <span class="number" v-if="detailsList.nodeCode=='verify'&& detailsList.phoneNo">电话号码:{{detailsList.phoneNo}}</span><span v-if="detailsList.nodeCode=='verify'&& /^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName) && detailsList.phoneNo==''">案件处于当前节点,暂无联系人及联系方式</span></li>
            <span :class="detailsList.nodeCode=='endCase'?'activeline':'line'"></span> <li :class="detailsList.nodeCode=='endCase'?'active':'item'"><span class="text">结案</span><span class="name" v-if="detailsList.nodeCode=='endCase'&& detailsList.operatorName  && !/^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName)">姓名: {{detailsList.operatorName}}</span> <span class="number" v-if="detailsList.nodeCode=='endCase'&& detailsList.phoneNo">电话号码:{{detailsList.phoneNo}}</span><span v-if="detailsList.nodeCode=='endCase'&& /^[A-Za-z0-9]{0,}$/.test(detailsList.operatorName) && detailsList.phoneNo==''">案件处于当前节点,暂无联系人及联系方式</span></li>
          </ul>
        </div>
        <a v-if="isdetails" class="icon_return"  @click="backOff()"><van-icon class="van-icon-arrow-left" name="arrow" />返回</a>   
        <img v-if="isdetails && tabActive2=='2'" class="case" src="../../assets/img/base/jiean.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: [
        {
          "orderType": "03",
          "orderTypeName": "非车险",
        },   
        {
          "orderType": "03",
          "orderTypeName": "车险",
        },      
      ],
      tab2: [
        {
          "orderType": "04",
          "orderTypeName": "新案件",
        },
        {
          "orderType": "05",
          "orderTypeName": "进行中",
        },
        {
          "orderType": "06",
          "orderTypeName": "已结案",
        },
      ],
      type: 0,
      searchValue: '',
      searchValue2: '',
      option1: [//一进来默认
        { text: '被保人', value: 0 },
        { text: '报案号', value: 1 },
      ],
      carList: [],
      detailsList:[],
      isdetail:true,
      isdetails:false,
      minLength:0,
      maxLength:20,
      LregistNo:'',
      tabActive: 0,
      tabActive2:0,
      currentPage:1,
      loading: false,
      finished: false,
      page: 1,
      dataNum:1,
      carListNull:'',
    };
  },
  created() {
    this.getCarList();
  },
  methods: {
    searchange(){
      if(this.type=='1'){
         this.minLength=6
         this.maxLength=22
      }else if(this.type=='2'){
         this.minLength=4
         this.maxLength=8
      }else{
        this.minLength=0
        this.maxLength=22
      }
    },
    timestampToTime(timestamp, type) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear();
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if( type==="YYYY-MM-DD"){
            return `${Y}-${M}-${D}`
        }
  return `${Y}-${M}-${D} ${hour}:${minute}:${second}`
    },
    onSearch() {
    
      //车险理赔搜索
      if (!this.searchValue) {
        this.$toast('请输入搜索条件');
        return;
      }
       if(this.searchValue.length<this.minLength){
         this.$toast('长度不能不能小于'+this.minLength);
         return;
       }
      this.page = 1
      this.carList = []
      this.carListNull=''
      this.loading = true;
      this.getCarList();     
    },
    onClick() {
      this.searchValue = ''
      this.carList = []
      this.carListNull=''
      this.loading = true;
      this.finished = false;
      if (this.tabActive == 0) {
        this.option1 = [
          { text: '被保人', value: 0 },
          { text: '报案号', value: 1 },
        ]
        this.type = 0
        this.page = 1
      } else if (this.tabActive == 1) {
        this.option1 = [
          { text: '车牌号', value: 2 },
          { text: '报案号', value: 1 },
        ]
        this.type = 2
        this.page = 1
      }
      this.searchange();
      this.getCarList()
      this.isdetail=true
      this.isdetails=false
    },
    onClick2(){
      console.log(this.tabActive2,'this.tabActive2')
      this.carList=[];
      this.carListNull='';
      this.getCarList()
      
    },
    async getCarList() {
      if(this.type=='1'){//1报案号
        this.LregistNo=this.searchValue
      }else{
        this.LregistNo=''
      }
       if(this.type=='0' || this.type=='2'){//0被保人 2车牌号
        this.searchValue2=this.searchValue
      }else{
        this.searchValue2=''
      }
      const res = await this.$axios({
        url: this.$API.API_GETREPORTINFO,
        method: 'post',
        data: {
          "agentCode": localStorage.getItem('agentCode'),
          "firstMenu":this.tabActive+1,//一级菜单 1非车 2 车
          "secondaryMenu":this.tabActive2+1,//二级菜单， 1新案件，2进行中 3结案
          "insurName": this.searchValue2, //被保人/车牌号
          "registNo": this.LregistNo,//报案号
          "pageNumber":this.currentPage,//页码
          "pageSize":'5'//数量
        }       
      });
      if (res.code === 0 && res.content.result == "0") {      
        this.carList = this.carList.concat(res.content.claimsCaseList)
        this.dataNum = res.content.dataNum
      } else {
        this.carListNull = this.carList.concat(res.content.claimsCaseList)
      }
      this.finished = true;
      this.isdetail=true
      this.isdetails=false
    },
    async details(index2){
       let registNo =this.carList[index2].registNo
       let riskCode=this.carList[index2].riskCode
       const res = await this.$axios({
        url: this.$API.API_PROD_DETAILS,
        method: 'post',
        data: {
        "registNo":registNo, //报案号
         "riskCode":riskCode,  //险种代码
        }
      });
      
      this.detailsList=res.content
      // this.detailsList.operatorName='12qq'
      // this.detailsList.phoneNo='137'
      this.isdetail=false
      this.isdetails=true
    },
   backOff(){
    this.isdetail=true
    this.isdetails=false
   },
   pagination(val){
      this.currentPage = val;
      this.carList =[];
      this.getCarList();
   }
  }
};
</script>
<style lang="less">
@import './../../assets/less/app/compensate/compensate.less';
.box{
  margin: 12px;
  .state{
    color: #000;
    margin: 15px 0;
    font-weight: bold;
  }
  .detail_box{
    margin: 0 12px 20px;
    position: relative;
    .active{
    border-left: 1px solid gainsboro;
    display: -webkit-box;
    display: -webkit-flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding-left: 15px;
    .text{
      font-weight: bold;
      color: #000;
    }
    .name{
        color: #3D4145;
        font-size: 14px;
      }
      .number{
        color: #3D4145;
        font-size: 14px;
      }
    }
    .line{
      width: 12px;
      height: 12px;
      background-color: gainsboro;
      display: block;
      border-radius: 50%;
      margin-left: -6px;
    }
    .activeline{
       width: 13px;
      height: 13px;
      background-color: #0252ff;
      display: block;
      border-radius: 50%;
      margin-left: -6px;
    }
    .item{
    color: #000;
    border-left: 1px solid  gainsboro;
    display: -webkit-box;
    display: -webkit-flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding-left: 15px;
      .span{
        display: block;
      }
      .text{
        font-weight: bold;
      }
      
    }
  }
}
.carListNull{
  
  text-align: center;
  font-weight: bold;
  margin-top: 5rem;
}
.noMore{
  text-align: center;
  color: #3D4145;
  font-size: 14px;
}
.result{
  padding: 10px 12px 0 12px;
  font-weight: bold;
}
.icon_return{
  margin-left: 12px;
  padding: 5px;
  font-size: 16px;
}
.case{
  
  position: absolute;
  top: 200px;
  right: 15px;
}
</style>