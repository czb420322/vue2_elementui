<template>
  <div class="shift" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
     <v-header :title="{ name: '分享转录' }"></v-header>
     <div>
      <van-cell-group>
        <van-cell v-if="productName" title="产品名称" :value="productName" />
        <van-cell title="业务员信息" :value="salesmanCode" />
         <van-field v-model="agentNameText" label="业务来源" placeholder="" input-align="right" disabled />
          <van-field v-show="agentNameText !='直接业务' " v-model="agreementNoText" label="直接业务" placeholder="" input-align="right" disabled />

         <!-- <van-field :value="agentNameText" label="业务来源" input-align="right" placeholder="请选择业务来源" readonly @click="showSelectPicker('my/updBusinessList', businessList)" is-link />
         <van-field v-show="agentNameText !='直接业务' " :value="agreementNoText" label="代理协议号"  input-align="right" placeholder="请选择代理协议号" readonly @click="updclick()" is-link /> -->
        <van-cell title="决策单元" :value="codeName" v-show="codeName" />
      </van-cell-group>
      <div style="margin-top: 10px;">
        <van-cell-group>
          <van-field required v-model="transcribePhone" label="业绩归属人手机号/工号" placeholder="请输入手机号或工号" input-align="right" maxlength="11" />
          <van-field v-model="valueName" label="业绩归属人姓名" placeholder="请输入姓名（非必填）" input-align="right"/>
        </van-cell-group>
      </div>
     
     </div>
     <div class="bt_box">
       <van-button class="van_bt" type="info" size="small" @click="getpogo()">生成二维码</van-button>
     </div>

    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>

  </div>
</template>
<script>
import validator from '../../assets/js/util/validator';
import selectPicker from './../../templates/selectPicker.vue';
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
      listData:[],
      transcribePhone:'',
      valueName:'',
      agentNameValue:'',//业务来源(后台需要的)
      agentNameText:'',//业务来源（前端要显示到）
      businessType:'',
      agreementNoValue:'', //代理协议号（后台需要的）
      agreementNoText:'',//代理协议号(前端要显示到)
      agencyName:'',//代理人协议号代理机构名称
      dailiList:'',
      productName:'',//产品名称
      salesmanCode:'',//业务员信息
      saleCode:'',
      agentCode:'',
      agentId:'',
      activityId:'',
      phone:'',
      //路径带过来带的决策单元相关(分享车险转录用到)
      car:'false',//是否分享转录车险 默认否
      codeCode:'',
      codeName:'',
      unitmainTenanceTypeOne:'',
      unitmainTenanceTypeOneName:'',
      unitmainTenanceTypeTwo:'',
      unitmainTenanceTypeTwoName:'',
    }
  },
  computed: {
    ...mapState({
        UserInfoList: state => state.my.UserInfo, //个人资料数据
        myShareagreementList: state => state.my.myShareagreementList, //代理人协议号数据
    }),
  },
  created() {
    this.agentNameValue = this.$route.query.agentNameValue || '';
    this.agentNameText = this.$route.query.agentNameText || '';

    this.productName = this.$route.query.productName || '';
    this.salesmanCode = this.$route.query.salesmanCode || '';
    this.saleCode = this.$route.query.saleCode || '';
    this.agentCode = this.$route.query.agentCode || '';
    this.agentId = this.$route.query.agentId || '';
    this.activityId = this.$route.query.activityId || '';
    this.phone = this.$route.query.phone || '';
    
    //代理人协议号数据
    // if(!this.myShareagreementList.length){
    //   this.$store.dispatch('my/getShareMyAgreement'); 
    // } 

    this.agreementNoValue = this.$route.query.agreementNoValue || '';
    this.agreementNoText = this.$route.query.agreementNoText || '';
    this.agencyName = this.$route.query.agencyName || '';

    //路径带过来带的决策单元相关(分享车险转录用到)
    this.car = this.$route.query.car || 'false';
    this.codeCode = this.$route.query.codeCode || '';
    this.codeName = this.$route.query.codeName || '';
    this.unitmainTenanceTypeOne = this.$route.query.unitmainTenanceTypeOne || '';
    this.unitmainTenanceTypeOneName = this.$route.query.unitmainTenanceTypeOneName || '';
    this.unitmainTenanceTypeTwo = this.$route.query.unitmainTenanceTypeTwo || '';
    this.unitmainTenanceTypeTwoName = this.$route.query.unitmainTenanceTypeTwoName || '';
  },
  methods: {
    showSelectPicker(name, list) {
      this.$refs.selectPicker.parentMsg({ name: name, struct: {data: list }});
    },
    //已废弃（不让选择了决策单元和代理协议了）
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
     
    },
    //已废弃（不让选择了决策单元和代理协议了）
    updclick(){
      if(!this.dailiList.length){
        this.$toast('代理协议号为空');
        return;
      }
      if(this.agentNameText !=''){
        this.showSelectPicker('my/updmYagreementList', this.dailiList)
      }else{
        this.$toast('请先选择业务来源');
      }
    },
    async getpogo() {
      // if(this.agentNameText ==''){
      //   this.$toast('请先选择业务来源');
      //   return;
      // }
      // if(this.agreementNoText =='' && this.agentNameText != '直接业务'){
      //   this.$toast('请选择代理协议号');
      //   return;
      // }
      if(this.transcribePhone ==''){
        this.$toast('请填写业绩归属人手机号');
        return;
      }
      // if(!validator.isMobile(this.transcribePhone, "手机号码格式有误")) {
      //   return;
      // }
      let link = 'wxExclusive?&phone='+this.phone + '&productName='+this.productName+'&saleCode='+this.saleCode+'&agentCode='+this.agentCode+'&agentId='+this.agentId+'&activityId='+this.activityId+'&agentNameValue='+this.agentNameValue+'&agreementNoValue='+this.agreementNoValue+'&valueName='+this.valueName+'&transcribePhone='+this.transcribePhone+'&agencyName='+this.agencyName+'&car='+this.car+'&codeCode='+this.codeCode+'&codeName='+this.codeName+'&unitmainTenanceTypeOne='+this.unitmainTenanceTypeOne+'&unitmainTenanceTypeOneName='+this.unitmainTenanceTypeOneName+'&unitmainTenanceTypeTwo='+this.unitmainTenanceTypeTwo+'&unitmainTenanceTypeTwoName='+this.unitmainTenanceTypeTwoName
      this.goPage(link);
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