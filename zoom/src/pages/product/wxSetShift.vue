<template> 
  <div class="shift" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
     <v-header :title="{ name: '选择业务来源' }"></v-header>
     <div>
      <van-cell-group>
        <van-field :value="agentNameText" label="业务来源" input-align="right" placeholder="请选择业务来源" readonly @click="showSelectPicker('my/updBusinessList', businessList)" is-link />
        <van-field v-show="agentNameText !='直接业务'" :value="agreementNoText" label="代理协议号"  input-align="right" placeholder="请选择代理协议号" readonly @click="updclick()" is-link />
        <van-field v-show="car=='true'" :value="codeName" label="决策单元"  input-align="right" placeholder="请选择决策单元" readonly @click="showSelectPicker('my/updmYdecisionUnit', mYdecisionUnit)" is-link />
      </van-cell-group>
     
     </div>
     <div class="bt_box">
       <van-button class="van_bt" type="info" size="small" @click="confirm()">确认转录</van-button>
     </div>

    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>

  </div>
</template>
<script>
import validator from '../../assets/js/util/validator';
import selectPicker from './../../templates/selectPicker.vue';
import config from './../../config.js';
import configJs from './../../config.js';
import app from '../../assets/js/util/app';
import { mapState } from 'vuex'
export default {
  components: {
    selectPicker
  },
  data() {
    return {
      value:'',
      businessList:[
        {text: "直接业务", value: "0"},
        {text: "个人代理", value: "1"},
        {text: "专业代理", value: "2"},
        {text: "经纪业务—境内经纪", value: "4"},
        {text: "经纪业务—境外经纪", value: "5"},
        {text: "网上业务", value: "8"},
        {text: "兼业代理—银行代理", value: "9"},
        {text: "兼业代理-车行代理", value: "B"},
        {text: "兼业代理-寿代产代理", value: "C"},
        {text: "兼业代理—邮政代理", value: "D"},
        {text: "兼业代理—其他", value: "E"},
        {text: "专业代理-国任销售", value: "F"},
      ],
      agentNameValue:'',//业务来源(后台需要的)
      agentNameText:'',//业务来源（前端要显示到）
      agreementNoValue:'', //代理协议号（后台需要的）
      agreementNoText:'',//代理协议号(前端要显示到)
      agencyName:'',//代理人协议号代理机构名称
      codeName:'',//决策单元
      unitList:{},
      dailiList:'',
      saleCode:'',
      getShareUrl:'',
      shareData:'',
      szMark:'false',
      car:'false',//是否分享转录车险 默认否
    }
  },
  computed: {
    ...mapState({
        userInfo: state => state.my.UserInfo, //个人资料数据
        myShareagreementList: state => state.my.myShareagreementList, //代理人协议号数据
        mYdecisionUnit: state => state.my.myDecisionUnit, //决策单元数据
    }),
  },
  created() {
    this.saleCode = this.$route.query.saleCode || '';
    this.shareData = this.$route.query.shareData || '';
    this.szMark = this.$route.query.szMark || 'false';
    this.car = this.$route.query.car || 'false';
    if(!this.userInfo.length){
      this.$store.dispatch('my/getUserInfo'); 
    } 
    //代理人协议号数据
    if(!this.myShareagreementList.length){
      this.$store.dispatch('my/getShareMyAgreement'); 
    } 
    // 决策单元
    if(!this.mYdecisionUnit.length){
        this.$store.dispatch('my/getMyCarType', { codeType:"PrpdunitMain" });  
    } 
  },
  methods: {
    showSelectPicker(name, list) {
      if(!list || list.length == 0){
        this.$toast('暂无数据！');
        return;
      }
      this.$refs.selectPicker.parentMsg({ name: name, struct: {data: list }});
    },
    updataSelectPicker(params){
      console.log('选中',params)
      if(params.name == 'my/updBusinessList'){
        this.agentNameText= params.struct.value.text
        this.agentNameValue = params.struct.value.value
        this.dailiList =this.myShareagreementList[params.struct.value.value];
        if(this.dailiList){
          for( let item of this.dailiList){
            item.text = item.agreementNo + '-' +item.agentName 
            item.value = item.agentName
          }
        }
        this.agreementNoValue = '' //清空代理协议
        this.agreementNoText = ''//清空代理协议
        this.agencyName = ''//清空代理人协议号代理机构名称
      }
      if(params.name == "my/updmYagreementList"){
        this.agreementNoText = params.struct.value.text
        this.agreementNoValue = params.struct.value.agreementNo
        this.agencyName = params.struct.value.agentName
      }
      if(params.name == 'my/updmYdecisionUnit'){ //选中的决策单元
        this.codeName = params.struct.value.codeName
        this.unitList = params.struct.value
      }
     
    },
    updclick(){
      if(!this.dailiList || !this.dailiList.length){
        this.$toast('代理协议号为空');
        return;
      }
      if(this.agentNameText !=''){
        this.showSelectPicker('my/updmYagreementList', this.dailiList)
      }else{
        this.$toast('请先选择业务来源');
      }
    },
    //分享转录
    confirm() {
      if(this.agentNameText ==''){
        this.$toast('请先选择业务来源');
        return;
      }
      if(this.agreementNoText =='' && this.agentNameText != '直接业务'){
        this.$toast('请选择代理协议号');
        return;
      }
      if(this.car =='true' && !this.codeName){
        this.$toast('请选择决策单元');
        return;
      }
      //判断分享转录的是否车险
      if(this.car == 'true'){
        var address = config.config.http_base + config.config.ctx_base + '/#wxShift'
        let local = `${address}?agentCode=${this.userInfo.userCode}&salesmanCode=${this.userInfo.userCode}&agentNameValue=${this.agentNameValue}&agentNameText=${this.agentNameText}&agreementNoValue=${this.agreementNoValue}&agreementNoText=${this.agreementNoText}&agencyName=${this.agencyName}&productName=${'车险'}&car=${this.car}&codeCode=${this.unitList.codeCode}&codeName=${this.unitList.codeName}&unitmainTenanceTypeOne=${this.unitList.unitmainTenanceType1}&unitmainTenanceTypeOneName=${this.unitList.unitmainTenanceType1Name}&unitmainTenanceTypeTwo=${this.unitList.unitmainTenanceType2}&unitmainTenanceTypeTwoName=${this.unitList.unitmainTenanceType2Name}`;
        let getShareUrl = this.$WxUrlAuthorize(local);//app分享才需要带上授权
        app.goShare({
          shareTitle: "i国任车险(转录)",
          shareText: "点击开始转录",
          shareImgUrl: config.config.http_base + config.config.ctx_base + '/img/page/base/feiXiangioc.png',
          shareUrl: getShareUrl
        });
        //判断分享转录的是产品还是列表
      }else if(this.szMark == 'false'){ //转录产品详情
        var shareData =JSON.parse(this.shareData)
        var address = config.config.http_base + config.config.ctx_base + '/#wxShift?saleCode=' + this.saleCode+'&productName='+shareData.productName+'&salesmanCode='+this.userInfo.salesmanCode
  
        let local = `${address}&phone=${this.userInfo.phone}&agentCode=${this.userInfo.userCode}&agentId=${localStorage.getItem('agentId')}&activityId=${shareData.productId}&agentNameValue=${this.agentNameValue}&agentNameText=${this.agentNameText}&agreementNoValue=${this.agreementNoValue}&agreementNoText=${this.agreementNoText}&agencyName=${this.agencyName}`;
        let getShareUrl = this.$WxUrlAuthorize(local);
        app.goShare({
          shareTitle:shareData.productName+'(转录)',
          shareText: shareData.productTag,
          shareImgUrl: shareData.productImageUrl,
          shareUrl: getShareUrl
        });

      }else{ //转录列表（深圳专版）
        var address = config.config.http_base + config.config.ctx_base + '/#wxShift?saleCode=' + this.saleCode+'&salesmanCode='+this.userInfo.salesmanCode
        let local = `${address}&phone=${this.userInfo.phone}&agentCode=${this.userInfo.userCode}&agentId=${localStorage.getItem('agentId')}&activityId=${''}&agentNameValue=${this.agentNameValue}&agentNameText=${this.agentNameText}&agreementNoValue=${this.agreementNoValue}&agreementNoText=${this.agreementNoText}`;
        let getShareUrl = this.$WxUrlAuthorize(local);
        app.goShare({
          shareTitle: '产品列表(转录)',
          shareText: 'i国任非车产品列表',
          shareImgUrl:config.config.http_base + config.config.ctx_base + '/img/page/base/feiXiangioc.png',
          shareUrl: getShareUrl
        });
      }
     
    }
  }
}
</script>
<style lang="less">
.shift{
  .van-cell-group{
    .van-field{
      .van-field__label{
        width: 8.2em;
      }
    }
  }
  .bt_box{
    // position: absolute;
    // bottom: 10%;
    // left: 25%;
    // width: 50%;
      display: flex;
      justify-content: center;
      margin-top: 46vw;
    .van_bt{
      width: 50%;
      font-size: 14px;
      height: 40px;
    }
  }
}
</style>