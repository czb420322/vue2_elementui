<template>
  <div class="productDetailTwo">
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <van-nav-bar title="产品详情" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <van-icon :name="img"  size="18" @click="fenx()"/>
      </template>
    </van-nav-bar>
    <div class="banner" :style="{ 'padding-top': ($iosSystem + 45) + 'px' }">
      <img src="../../assets/img/home/reone.jpg"/>
       <div class="productPlan">
         保障计划
       </div>
       <div>
         <div class="productTitle">
           保障项目
         </div>
         <div>
            <van-cell-group>
              <van-cell title="一般医疗保险金" value="300万元" />
              <van-cell title="一般医疗保险金" value="300万元" />
              <van-cell title="承包年龄" value="28天-60周岁" />
              <van-cell title="查看责任详情" title-style="color:blue"/>
            </van-cell-group>
         </div>
         <div class="productPrice">
           <p>保费</p>
           <p style="color:red">￥240</p>
         </div>
       </div>
       <div>
         <div class="productPlan">
           产品特色
         </div>
         <img src="../../assets/img/home/gr_cp02.png" style="width: 100%">
       </div>
       <div>
         <div class="productPlan">
           理赔流程
         </div>
         <img src="../../assets/img/base/health-3.jpg" style="width: 100%;padding:0 10px">
         <div class="flow">
           <span class="flowTitle">1.报案</span>
           <span>
             微信搜索“国任保险”在服务--我要报案里发起报案。
           </span>
         </div>
          <div class="flow">
           <span class="flowTitle">2.资料审核</span>
           <span>
             收到资料后，国任保险将核对进行审核和调查。
           </span>
         </div>
          <div class="flow">
           <span class="flowTitle">3.完成理赔</span>
           <span>
             根据审核结果将理赔款直接支付至被保险人或受益人指定账户
           </span>
         </div>
          <div class="flow">
           <span class="flowTitle">4.理赔查询</span>
           <span>
             微信搜索国任保险，进行进度查询，补充单证，理赔催办等自助服务。<br/>
             如有疑问，可拨打国任保险客服电话956030进行查询。
           </span>
         </div>
       </div>
       <div>
         <div class="productPlan">
           常见问题
         </div>
          <van-cell-group>
            <van-cell title="什么是不可抗力" icon="question-o" color="#1989fa" is-link />
            <van-cell title="保单如何验证" icon="question-o" color="#1989fa" is-link />
          </van-cell-group>
       </div>
       <div>
         <div class="productPlan">
           填写投保信息
         </div>
         <div style="display:flex">
           <span class="shu">|</span>
           <div style="font-weight:700">投保人信息<span style="font-weight:400;color:#c2c2c2;font-size:14px">（投保人）</span></div>
        </div>
        <van-form >
          <van-field
            v-model="username"
            name="姓名"
            label="姓名"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
           />
           <van-field
            v-model="username"
            name="身份证号码"
            label="身份证号码"
            placeholder="请输入身份证号码"
            :rules="[{ required: true, message: '请填写身份证号码' }]"
           />
           <van-field
            v-model="username"
            name="手机号码"
            label="手机号码"
            placeholder="请输入手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
           />
           <van-field
            v-model="username"
            name="电子邮箱"
            label="电子邮箱"
            placeholder="请输入电子邮箱"
            :rules="[{ required: true, message: '便于接收电子保单' }]"
           />
           <div style="display:flex">
           <span class="shu">|</span>
           <div style="font-weight:700">为谁投保<span style="font-weight:400;color:#c2c2c2;font-size:14px">（投保人）</span></div>
          </div>
          <div class="productPlan">
            <van-button round type="info" size="mini" style="padding:13px 15px">本人</van-button>
          </div>
        </van-form>
       </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import common from '../../assets/js/util/common';
import util from '../../assets/js/util/util';
import check from '../../assets/js/util/comp-check';
import productDetail from '../../assets/js/util/productDetail';
import appntInfo from './detail/appntInfo.vue';
import multipleInfo from './detail/multipleInfo.vue';
import singleInfo from './detail/singleInfo.vue';
import beneficiary from './detail/beneficiary.vue';
import carInfo from './detail/carInfo.vue';
import tagsList from './detail/tagsList.vue';
import datetimePicker from '../../templates/datetimePicker.vue';
import EventBus from '../../assets/js/util/EventBus';
import img from './../../../public/img/account/fenxiang.png';
import app from '../../assets/js/util/app';
import config from '../../config.js';
import configJs from '../../config.js';
import glutton from '../../assets/js/util/glutton';
import { mapState } from 'vuex'
import companyTxt from '../../templates/companyTxt.vue';

export default {
  components: {
    appntInfo,
    multipleInfo,
    singleInfo,
    beneficiary,
    carInfo,
    tagsList,
    datetimePicker,
    companyTxt
  },
  computed: {
    ...mapState({
      renewalDetail: state => state.renewedInsurance.noCar.renewalDetail,
      manageVersion: state => state.common.manageVersion,
    })
  },
  data() {
    return {
      showDuty:false,
      img: img,
      showPicker: false,
      saleCode: '',
      pageData: {
        startDate: '',//保险起期时间
        saleCode: '',
        setMealCode: '',
        saleTopPic: '',//销售产品图片
        saleNameDesc: '',//销售产品名称
        saleTipDesc: '',//销售产品提示
        isCoverageMapper: '',// 是否显示保障范围
        salePlanInfo: [],//销售方案信息
        relySpec: '',//关联标识
        riskPlanList: [],//计划列表
        dutyList: [],//责任列表
        coverageList: [],//保障列表
        isExemption: '',//豁免险标识
        tabsList: [],
        notificationList: [],
        planCode: '',//计划编码
        mult: '',//份数
        insureNum: '',//被保人人数
        amt: '',//保额
        sumPrem: '0.00',
        discountPrem: 0,
        flag: 0,
        trialToRisk: false,
        appntInfo: [],
        mainRiskList: [], //主险
        addRiskList: [], //附加险
        riskType: '',
        trialAddRiskList: [], //已经添加的试算集合中的附加险
        //已经计算的list
        readyMainRiskList: [],
        readyAddRiskList: [],
        //******在险种信息页面缓存 end******
        dutyListall: [],
        plan: [],
        trialObj: {},
        agreeButton: '',
        isAgree: '',
        disabledPage: false
      },
      openModal: {},
      active: 0,
      bannerH: 0,
      schemeActive: 0,
      programmeInfoList: [],
      trialLoading: "true",
      userInfo: {},
      productDetailData: '',
      columns: [],
      index: '',
      sign: 2,
      fenShow: false,
      actions: [{ name: '分享产品'}, { name: '分享转录'}],
      szMark:false,//深圳专版分享标示，默认不是
      isAddShop: '0'
    };
  },
  async created() {
    glutton.startRecording(); // 回溯录制

    this.saleCode = this.$route.query.saleCode;
    this.bannerH = document.documentElement.clientWidth * 0.62;
    this.schemeActive = util.getSessionStorageObj("schemeActive") || 0;
    this.pageData.startDate = util.getSessionStorageObj("startDate") || '';
    this.userInfo = (await common.getUserInfo()) || {};
    // 初始化
    let productDetailData = util.getSessionStorageObj("productDetail");
    if (productDetailData && productDetailData.content.saleCode != this.saleCode) {
      productDetail.clearProductStorage();
    }
    this.getInsureInit();

    setTimeout(()=>{
      this.getDetail();//产品详情
    },800)

    this.index = util.getSessionStorageObj("valueListIndex") || '';
    this.sign = util.getSessionStorageObj("valueListSign") || 2;

    this.isAddShop = await this.$store.dispatch('shop/checkProductIsExistInMircoShop', { productCode: this.saleCode })
  },
  methods: {
    //分享转录
    fenx(){
      if(this.saleCode == 'GRMOBILE_MALL_SL031' && this.userInfo.userCode == 'S0900344'){//深圳专版分享
        this.fenShow = true
        this.szMark = true
      }else if((this.userInfo.salesmanChannelType == '01' || this.userInfo.salesmanChannelType == '02' || this.userInfo.salesmanChannelType == '03') && this.userInfo.agentType == '1'){ //专员才有分享转录
        this.fenShow = true
      // }else if(this.userInfo.userCode == 'S0201348' ? (this.saleCode == 'GRMOBILE_MALL_SL030' || this.saleCode == 'GRMOBILE_MALL_SL007'|| this.saleCode == 'GRMOBILE_MALL_SL002' || this.saleCode == 'GRMOBILE_MALL_SL027') : false){
      //   this.fenShow = true
      }else{
        this.goSharePoster()
      }
    },
    onSelect(item) {
      this.fenShow = false;
      if(item.name == '分享产品'){
        this.goSharePoster()
      }
      if(item.name == '分享转录'){
        this.shareHire()
      }
    },
    openPopup(res, index, sign) {
      this.columns = []
      this.index = index
      util.setSessionStorageObj("valueListIndex",index)
      this.sign = sign
      util.setSessionStorageObj("valueListSign",sign)
      this.showPicker = true;

      let dataRes = JSON.parse(res.selAmount);
      for (let i in dataRes) {
        this.columns.push(dataRes[i])
      }
    },
    onConfirm(valueList) {
      if (this.sign == 1) {
        this.pageData.mainRiskList[this.index].amount = valueList.value
        let productDetailData = util.getSessionStorageObj("productDetail");
        let setMealCode = util.getSessionStorageObj("setMealCode");
        if (mainRiskList) {
          productDetailData.content.riskInfo[setMealCode].mainRiskList[this.index].amount = valueList.value
          util.setSessionStorageObj("productDetail",productDetailData);
        }
      }
      if (this.sign == 2) {
        this.pageData.addRiskList[this.index].amount = valueList.value
        let productDetailData = util.getSessionStorageObj("productDetail");
        let setMealCode = util.getSessionStorageObj("setMealCode");
        if (productDetailData) {
          productDetailData.content.riskInfo[setMealCode].addRiskList[this.index].amount = valueList.value
          util.setSessionStorageObj("productDetail",productDetailData);
        }
      }

      this.showPicker = false;
      this.trial()//调用试算
    },
    showDataTimePicker(params) {
      this.$refs.datetimePicker.parentMsg(params)
    },
    updataDatetime(params) {
      this.pageData.startDate = params.datetime
      util.setSessionStorageObj("startDate", this.pageData.startDate);
    },
    //跳转选择决策单元(分享转录功能)
    shareHire(){
      if (this.pageData.saleTipDesc == '') {
        this.$toast('获取分享转录资料失败!');
        return;
      }
       this.goPage('wxSetShift?shareData='+this.pageData.saleTipDesc+'&saleCode='+this.saleCode+'&szMark='+this.szMark)
    },
     // 分享产品
    goSharePoster() {
      if (this.pageData.saleTipDesc == '') {
        this.$toast('获取分享资料失败!');
        return;
      }
      var shareData = JSON.parse(this.pageData.saleTipDesc)
      var address = config.config.http_base + config.config.ctx_base + '/#showProductDetail?saleCode=' + this.saleCode

      let local = `${address}&phone=${this.userInfo.phone}&agentCode=${this.userInfo.userCode}&agentId=${localStorage.getItem('agentId')}&activityId=${shareData.productId}`;
      let getShareUrl = this.$WxUrlAuthorize(local);
      app.goShare({
        shareTitle: shareData.productName,
        shareText: shareData.productTag,
        shareImgUrl: shareData.productImageUrl,
        shareUrl: getShareUrl
      });

    },
    async getDetail() {
      let productDetail = util.getSessionStorageObj("productDetail");
      let res = ''
      if (productDetail) {
        res = productDetail;
      } else if (this.$route.query.saleCode) {
        res = await this.$axios({
          url: this.$API.API_PRODUCT_DETAIL,
          method: 'post',
          data: {
            saleCode: this.$route.query.saleCode,
            type: sessionStorage.getItem('type'),
            system: sessionStorage.getItem('system')
          }
        });
      }
      this.getDetailData(res);
    },
    async getDetailData(res) {
      // 初始化-处理保险起期
      if( !this.pageData.startDate && res.content.salePlanInfo && res.content.salePlanInfo.data && res.content.salePlanInfo.data.startDate){
        this.updataDatetime({datetime: check.transformDatesTimetamp( '', '', parseInt(res.content.salePlanInfo.data.startDate)).split(' ')[0] })
      }
      let data = res.content;
      util.setSessionStorageObj("productDetail", res);
      if (data.result == '1') {
        this.$toast(data.resultMessage);
        return;
      }
      this.pageData.salePlanInfo = data.salePlanInfo;
      var salePlanInfo = util.getSessionStorageObj('salePlanInfo');//销售方案基本信息
      if (salePlanInfo) {
        this.pageData.salePlanInfo = salePlanInfo;
      } else {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var mon = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var day = nowDate.getDate() < 10 ? "0" + (nowDate.getDate()) : nowDate.getDate();
        if (this.pageData.salePlanInfo) {
          this.pageData.salePlanInfo.data['beginDate'] = year + "-" + mon + "-" + day;
          this.pageData.salePlanInfo.data['endDate'] = check.getNewDate(year + "-" + mon + "-" + day,
            this.pageData.salePlanInfo.data['insuYearUnit']);
        }
      }
      // 根据套餐获取 险种信息
      if (this.pageData.salePlanInfo) {
        var setMealCode = this.pageData.salePlanInfo.data['setMealCode'];
        this.pageData.setMealCode = setMealCode;
        this.pageData.mainRiskList = data.riskInfo[setMealCode].mainRiskList;//主险
        this.pageData.addRiskList = data.riskInfo[setMealCode].addRiskList;//附加险
      } else {
        this.pageData.mainRiskList = data.riskInfo.mainRiskList;//主险
        this.pageData.addRiskList = data.riskInfo.addRiskList;//附加险
      }
      var mainRiskList = util.getSessionStorageObj('mainRiskList');//主险
      if (mainRiskList) {
        this.pageData.mainRiskList = mainRiskList;
      }
      if (this.pageData.mainRiskList) {
        this.pageData.mainRiskList.forEach((index, obj) => {
          var riskPlanList = util.getSessionStorageObj('riskPlanList');
          if (riskPlanList) {
            this.pageData.riskPlanList = riskPlanList;
          } else {
            this.pageData.riskPlanList = obj.riskPlanList;
          }
          //   this.pageData.mainRiskList.forEach((_index, _obj)=>{
          $.each(obj.riskPlanList, function (_index, _obj) {
            if (obj.planCode == _obj.planCode) {
              var planCode = util.getSessionStorageObj('planCode');
              if (planCode) {
                this.pageData.planCode = planCode;
              } else {
                this.pageData.planCode = _obj.planCode;
              }
              var dutyList = util.getSessionStorageObj('dutyList');
              if (dutyList) {
                this.pageData.dutyList = dutyList;
              } else {
                this.pageData.dutyList = _obj.mainRiskDutyList;
              }
              var agreeButton = util.getSessionStorageObj('agreeButton');
              if (agreeButton) {
                this.pageData.agreeButton = agreeButton;
              } else {
                this.pageData.agreeButton = _obj.mainRiskAgreeButton;
              }
              var amt = util.getSessionStorageObj('amt');
              if (amt) {
                this.pageData.amt = amt;
              } else {
                //指定保额
                var sumAmt = 0;
                $.each(_obj.mainRiskDutyList, function (dutyIndex, dutyObj) {
                  if (dutyObj.amt) {
                    sumAmt += this.decimal(dutyObj.amt, 2);
                  }
                });
                if (sumAmt !== 0) {
                  this.pageData.amt = sumAmt;
                }
              }
            }
          });
          var mult = util.getSessionStorageObj('mult');
          if (mult) {
            this.pageData.mult = mult;
          } else {
            if (obj.mult) {
              this.pageData.mult = obj.mult;
            }
          }
        });
      }

      var addRiskList = util.getSessionStorageObj('addRiskList');//附加险
      if (addRiskList) {
        this.pageData.addRiskList = addRiskList;
      }
      var sumPrem = util.getSessionStorageObj('sumPrem');//总保费
      if (sumPrem) {
        this.pageData.sumPrem = sumPrem;
      }
      //   this.$.hideMainPageLoader();

      this.pageData.saleTopPic = data.saleTopPic;
      this.pageData.saleNameDesc = data.saleNameDesc;
      this.pageData.saleTipDesc = data.saleTipDesc;
      this.pageData.proposalCode = data.proposalCode;
      this.pageData.coverageList = data.coverageList;
      this.pageData.tabsList = data.tabsList;
      this.pageData.notificationList = data.notificationList;
      if (!this.pageData.agreeButton) {
        this.pageData.agreeButton = data.agreeButton;
      }
      this.pageData.isCoverageMapper = data.isCoverageMapper;
      var insureNum = util.getSessionStorageObj('insureNum');
      if (insureNum) {
        this.pageData.insureNum = insureNum;
      }
      //进行试算
      this.trial();

      var isAgree = util.getSessionStorageObj('isAgree');//是否同意
      if (isAgree) {
        this.pageData.isAgree = isAgree;
      }
      if (this.pageData.isAgree) {//同意勾选
        $("#color-input-red").attr("checked", true);
      }

      this.setInsureNum(data);
      this.renewedInsurance()
    },

    // 设置投保人数
    setInsureNum(data) {
      let insureNumData = data.salePlanInfo.struct.filter(item => item.code == 'insureNum');
      if (insureNumData.length) {
        util.setSessionStorageObj("insureNumData", insureNumData[0].data[insureNumData[0].data.length - 1].value);
      }
    },

    //核心计算方法  价值 10亿 哈哈
    trial(isSubmit) {
      var _this = this;

      _this.pageData.trialToRisk = false;
      //验证是否试算
      var trialFlag = _this.trialVerif();

      if (trialFlag) { //通过验证
        //开始试算
        _this.trialInner(isSubmit);
      }

    },

    //试算校监
    trialVerif() {
      var _this = this;
      _this.trialObj = {};
      _this.trialObj.saleCode = this.$route.query.saleCode; //销售计划code
      _this.trialObj.salePlanInfo = _this.pageData.salePlanInfo;//整个销售方案节点
      _this.trialObj.amt = _this.pageData.amt;//保额
      _this.trialObj.mult = _this.pageData.mult;//份数
      _this.trialObj.planCode = _this.pageData.planCode;//计划编码
      if (_this.pageData.salePlanInfo) {
        _this.trialObj.setMealCode = _this.pageData.salePlanInfo.data['setMealCode']; //销售套餐code
        _this.trialObj.insuYearUnit = _this.pageData.salePlanInfo.data['insuYearUnit']; //保险期限
        util.setSessionStorageObj('setMealCode', _this.pageData.salePlanInfo.data['setMealCode']);//套餐code
        util.setSessionStorageObj('insuYearUnit', _this.pageData.salePlanInfo.data['insuYearUnit']);//保险期间
      }

      util.setSessionStorageObj('saleCode', this.$route.query.saleCode);//销售计划code
      util.setSessionStorageObj('salePlanInfo', _this.pageData.salePlanInfo);//整个销售方案节点

      //首选验证试算的必要参数有没有数据
      var isPass = false;
      //验证被保人

      _this.trialObj.mainRiskList = [];//主险列表

      //验证主险 列表
      var mainRiskList = _this.pageData.mainRiskList;

      $.each(mainRiskList, function (_index, _obj) { //验证主险列表
        console.log('主险[' + _obj.riskCode + ']参数[:' + JSON.stringify(_obj.data) + ']');
        if (isPass) return false;
        $.each(_obj.data, function (__index, __obj) { //循环验证单个主险值是否为空
          if (null == __obj || '' == __obj) {
            console.log('主险[' + _obj.riskCode + '][' + __index + ']是空!!!');
            isPass = true;
            return false;
          }
        });
        //如果验证通过放入计算对象
        _this.trialObj.mainRiskList.push($.extend({riskCode: _obj.riskCode, code: _obj.code, riskType: _obj.riskType, riskShowOrder: _obj.riskShowOrder }, _obj.data));

      });

      // 主险是否有的值为空
      if (isPass) {
        console.log('主险参数为空停止计算.');
        return false;
      }
      _this.trialObj.addRiskList = [];//附加险列表

      //验证附加 列表
      var addRiskList = _this.pageData.addRiskList;
      console.log(addRiskList);

      $.each(addRiskList, function (_index, _obj) { //验证附加险列表

        console.log('附加激活的[' + _obj.riskCode + ']参数[:' + JSON.stringify(_obj.data) + ']');
        if (isPass) return false;
        $.each(_obj.data, function (__index, __obj) { //循环验证单个附加值是否为空
          if (null == __obj || '' == __obj) {
            console.log('附加[' + _obj.riskCode + '][' + __index + ']是空!!!');
            isPass = true;
            return false;
          }
        });

        _this.trialObj.addRiskList.push($.extend({ riskCode: _obj.riskCode, code: _obj.code, mainRiskCode: _obj.mainRiskCode, riskType: _obj.riskType, riskShowOrder: _obj.riskShowOrder }, _obj.data));

      });

      //附加险是否有的值为空
      if (isPass) {
        console.log('附件险参数为空停止计算.');
        return false;
      }

      console.log('9999', _this.trialObj);

      return true;
    },

    //四舍五入 num数 v保留几位小数
    decimal(num, v) {
      var vv = Math.pow(10, v);
      return Math.round(num * vv) / vv;
    },

    async trialInner(isSubmit) {
      if (isSubmit) {
        this.trialLoading = "true"
      }
      let trialObj;
      if (util.getSessionStorageObj('trialObj')) {
        trialObj = util.getSessionStorageObj('trialObj');
      } else {
        trialObj = this.trialObj;
        trialObj.type = sessionStorage.getItem('type');
        trialObj.system = sessionStorage.getItem('system');
        util.setSessionStorageObj('trialObj', this.trialObj);
      }
      let insureInfo = util.getSessionStorageObj('insureInfo');
      //特殊处理疫苗险 RMOBILE_MALL_SL032 试算时需要多传amount参数
      if(this.saleCode =='GRMOBILE_MALL_SL032'){
        if (this.sign == 1 && this.index) {
          let productDetailData = util.getSessionStorageObj("productDetail");
          let setMealCode = util.getSessionStorageObj("setMealCode");
          trialObj.mainRiskList[this.index].amount = productDetailData.content.riskInfo[setMealCode].mainRiskList[this.index].amount || this.pageData.mainRiskList[this.index].amount
        }
        if (this.sign == 2 && this.index) {
          let productDetailData = util.getSessionStorageObj("productDetail");
          let setMealCode = util.getSessionStorageObj("setMealCode");
          trialObj.addRiskList[this.index].amount = productDetailData.content.riskInfo[setMealCode].addRiskList[this.index].amount || this.pageData.addRiskList[this.index].amount
        }
      }

      //是否多被保人
      if(insureInfo){
        trialObj.isMultiple = insureInfo.isMultiple || ''
        if(insureInfo.tagsList.length >= 1){
          trialObj.salePlanInfo.data['cost'] = insureInfo.tagsList[0].data.engineer_cost || ''; //工程造价
        }
      }else{
        trialObj.isMultiple = ''
      }
      const res = await this.$axios({
        url: this.$API.API_MAKE_CALCMOBILE,
        loading: this.trialLoading,
        method: 'post',
        data: trialObj
      });
      this.trialLoading = "false";
      if (res.code === 0 && res.content.result != '1') {
        let data = res.content;
        //总保费
        this.pageData.sumPrem = data.sumPrem;
        // 优惠金额
        this.pageData.discountPrem = data.discountPrem || 0;
        this.pageData.flag = data.flag || 0;
        //计算结果
        this.pageData.readyMainRiskList = data.mainRiskList;
        this.pageData.readyAddRiskList = data.addRiskList;
        this.pageData.mainRiskList = data.mainRiskList;
        this.pageData.addRiskList = data.addRiskList;
        // 保存价格
        if (this.pageData.mainRiskList[0].insurePremMap) {
          util.setSessionStorageObj("insurePremMap", this.pageData.mainRiskList[0].insurePremMap);
          this.$refs.multipleInfo.parentPremMap();
        }

        // 提交立即下单
        if (isSubmit) {
          util.setSessionStorageObj("sumPrem", this.pageData.sumPrem);
          util.setSessionStorageObj("readyMainRiskList", this.pageData.readyMainRiskList);
          util.setSessionStorageObj("readyAddRiskList", this.pageData.readyAddRiskList);
          productDetail.goConfirm("productDetail");
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
      //结束
      //console.log('开始试算....完成');
    },

    //保单生效日期选择后处理方法
    beginDateEvent(type, item, obj) {
      var _this = this;
      console.log(obj)

      if (item.code == 'beginDate') {
        var beginDate = this.pageData.salePlanInfo.data['beginDate'];
        var insuYearUnit = this.pageData.salePlanInfo.data['insuYearUnit']
        _this.pageData.salePlanInfo.data['endDate'] = check.getNewDate(beginDate, insuYearUnit);
      }

    },
    detailShowModal(notification) {
      console.log('notification', notification);
      var _this = this;
      if (notification) {
        this.openModal = {
          title: notification.notifiName,
          text: notification.notifiContent
        }
        this.$refs.openModal.parentMsg();
      }
    },

    mainRiskEvent(e, objData) {
      var _this = this;
      if (_this.pageData.mainRiskList) {
        $.each(_this.pageData.mainRiskList, function (index, obj) {
          if ("mult" == objData) {
            _this.pageData.mult = e.value;
            $.each(obj.data, function (dataIndex, dataObj) {
              dataObj.mult = e.value;
            });
          }
          $.each(obj.riskPlanList, function (_index, _obj) {
            if (e.value == _obj.planCode) {
              $.each(obj.data, function (dataIndex, dataObj) {
                dataObj.mult = e.value;
              });
              _this.pageData.planCode = e.value;
              _this.pageData.dutyList = _obj.mainRiskDutyList;
              _this.pageData.agreeButton = _obj.mainRiskAgreeButton;
              //指定保额
              var sumAmt = 0;
              $.each(_obj.mainRiskDutyList, function (dutyIndex, dutyObj) {
                if (dutyObj.amt) {
                  sumAmt += _this.decimal(dutyObj.amt, 2);
                }
              });
              if (sumAmt !== 0) {
                _this.pageData.amt = sumAmt;
              }
            }
          });
        });
      }

      //移除附加险
      _this.removeTrialAddRiskAll();
      var mainRiskList = _this.pageData.mainRiskList;
    },
    //移除全部时段中的附加险
    removeTrialAddRiskAll() {
      var _this = this;
      var trialList = _this.pageData.trialAddRiskList;
      if (trialList && trialList.length > 0) {
        var _rmobjArrays = _this.pageData.trialAddRiskList.splice(0, trialList.length);
        $.each(_rmobjArrays, function (_index, _obj) {
          var removeStruct = _obj.struct;
          var removeData = _obj.data;
          $.each(removeStruct, function (__index, __obj) {
            removeData[__obj.code] = __obj.val;
          });
          _this.pageData.addRiskList.push(_obj);
        });
      } else {
        console.log('没有要删除的试算数组的险种');
      }
      //赋值完成才进行试算
      _this.trial();
    },
    //点击移除附加险种 到 可选择列表
    removeTrialRiskToCal(index) {
      var _this = this;
      var _obj = _this.pageData.trialAddRiskList.splice(index, 1);
      console.log('remove 获取点击的对象:');
      if (_obj && _obj.length == 1) {
        //往需要试算的数组添加 这个对象
        var removeStruct = _obj[0].struct;
        var removeData = _obj[0].data;
        $.each(removeStruct, function (__index, __obj) {
          removeData[__obj.code] = __obj.val;
        });
        _this.pageData.addRiskList.push(_obj[0]);
        //赋值完成才进行试算
        _this.trial();
      } else {
        console.log('remove 获取点击的对象为空');
      }
    },
    //修改个附加险
    addTrialRiskEvent(item, e) {
      var _this = this;
      console.log('###########################add risk');
      if (item.code == 'age') {
        if (e.value > 50) {
          _this.removeTrialAddRiskAll();
          this.$toast('投保人年龄大于50周岁不能添加附加险');
        }
      }
      //进行试算
      _this.trial();
    },
    salePlanEvent(item, obj) {
      // 记录选择的分数,到投保录入页面时用于显示多少个被保人信息录入
      if (item.code === 'insureNum') {
        this.pageData.insureNum = obj.value;
      }
      if (item.code === 'insuYearUnit') {
        let trialObj = util.getSessionStorageObj('trialObj');
        //特殊处理insuYearUnit字段，因为有2个产品都使用这个字段，一个是输入框一个是选择框取值不一样
        //GRMOBILE_MALL_SL042
        if(this.saleCode == 'GRMOBILE_MALL_SL042'){
            let unit = obj.indexOf('D') // 判断有没有单位D
            if(unit == '-1'){ //等于-1没有
              trialObj.salePlanInfo.data.insuYearUnit = obj ? obj+'D' : '';
            }else{
              trialObj.salePlanInfo.data.insuYearUnit = obj;
            }
          this.pageData.salePlanInfo.data[item.code] = trialObj.salePlanInfo.data.insuYearUnit
        }else{
          //GRMOBILE_MALL_SL031
          trialObj.salePlanInfo.data.insuYearUnit = obj.value;
        }
        util.setSessionStorageObj('trialObj', trialObj);
      }
      if (item.code === 'mult') {
        let trialObj = util.getSessionStorageObj('trialObj');
        trialObj.salePlanInfo.data.mult = obj.value;
        util.setSessionStorageObj('trialObj', trialObj);
      }
      if (item.code === 'cost') {
        let trialObj = util.getSessionStorageObj('trialObj');
        trialObj.salePlanInfo.data.cost = obj;
        util.setSessionStorageObj('trialObj', trialObj);
      }
      this.trial();

    },

    // 方案选择
    programmeInfo(name, title) {
      this.index = '' //清空主险和附加险选中的下标（GRMOBILE_MALL_SL032专用）
      util.setSessionStorageObj("schemeActive", this.schemeActive);
      let trialObj = util.getSessionStorageObj('trialObj');
      //获取产品详情险别列表
      let productDetail = util.getSessionStorageObj("productDetail");
      if (trialObj.salePlanInfo.struct && trialObj.salePlanInfo.struct.length) {
        for (let item of trialObj.salePlanInfo.struct) {
          if (item.code == 'setMealCode') {
            trialObj.salePlanInfo.data.setMealCode = item.data[name].value
            this.pageData.salePlanInfo.data.setMealCode = item.data[name].value
            //更新险别列表
            trialObj.addRiskList = productDetail.content.riskInfo[item.data[name].value].addRiskList
            trialObj.mainRiskList = productDetail.content.riskInfo[item.data[name].value].mainRiskList
          }
        }
      }
      // trialObj.salePlanInfo.data.plan =  (name + 1);
      util.setSessionStorageObj('trialObj', trialObj);
      this.trial();
      this.setSeatCount();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    contentScroll(e) {
      let scrollTop = this.$refs.scrollContent.scrollTop;
      util.setSessionStorageObj("productDetailScrollTop", scrollTop);
    },
    // 录入信息接口
    async getInsureInit() {
      if (!util.getSessionStorageObj('insureInfo')) {
        let isExemption = util.getSessionStorageObj('isExemption');//豁免险标识
        const res = await this.$axios({
          url: this.$API.API_INSURE_INPUT_INIT,
          method: 'post',
          data: {
            saleCode: this.saleCode,
            isExemption: isExemption || '',
            type: sessionStorage.getItem('type'),
            system: sessionStorage.getItem('system'),
            insureNum: 1
          }
        });
        res.content.tagsListBackups = res.content.tagsList
        util.setSessionStorageObj('insureInfo', res.content);
        if (res.content.programmeInfoList) {
          this.programmeInfoList = res.content.programmeInfoList;
        }
      } else {
        let insureInfo = util.getSessionStorageObj('insureInfo');
        if (insureInfo.programmeInfoList) {
          this.programmeInfoList = insureInfo.programmeInfoList;
        }
      }
      this.setSeatCount();
    },

    // 车座设置 saleCode=GRMOBILE_MALL_SL002
    setSeatCount() {
      let insureInfo = util.getSessionStorageObj('insureInfo');
      if (this.saleCode == "GRMOBILE_MALL_SL002" && insureInfo.tagsList && insureInfo.tagsList.length && insureInfo.tagsList[0].struct) {
        for (let item of insureInfo.tagsList[0].struct) {
          if (item.code == 'seatCount') {
            console.log('this.schemeActive', this.schemeActive);
            if (this.schemeActive == '0') {
              item.data = [{ text: "5座", value: "5" }];
              insureInfo.tagsList[0].data.seatCount = "5";
            } else {
              item.data = [{ text: "6座", value: "6" }, { text: "7座", value: "7" }, { text: "8座", value: "8" }, { text: "9座", value: "9" }];
              insureInfo.tagsList[0].data.seatCount = "";
            }
          }
        }
      }
      util.setSessionStorageObj('insureInfo', insureInfo);
      EventBus.$emit('parentMsg');
    },

    // 续保数据
    renewedInsurance(){
      if(this.renewalDetail.use == false && this.renewalDetail.use != undefined){
        let pageData = util.getSessionStorageObj('insureInfo');
        // 保单号
        pageData.renewNo = this.renewalDetail.corePolicyNo
        // 投保人信息
        pageData.appntInfo.data.name = this.renewalDetail.detailInfo.appntName
        pageData.appntInfo.data.idType = this.renewalDetail.detailInfo.appntIdType
        pageData.appntInfo.data.idNo = this.renewalDetail.detailInfo.appntIdNo
        pageData.appntInfo.data.mobile = this.renewalDetail.detailInfo.appntMobile
        // 被保人信息
        pageData.insuredInfo[0].data.relationToAppnt = '00'
        pageData.insuredInfo[0].data.name = this.renewalDetail.detailInfo.insureName
        pageData.insuredInfo[0].data.idType = this.renewalDetail.detailInfo.insureIdType
        pageData.insuredInfo[0].data.idNo = this.renewalDetail.detailInfo.insureIdNo
        pageData.insuredInfo[0].data.mobile = this.renewalDetail.detailInfo.insureMobile
        console.log('pageData', pageData.appntInfo.data);
        util.setSessionStorageObj('insureInfo', pageData);
        this.$store.commit('renewedInsurance/updateState', [
          { name: ['noCar', 'renewalDetail', 'use'], value: true }
        ])
        // 保险起期
        this.updataDatetime({ datetime: check.transformDatesDay(this.renewalDetail.endDate, 1) });
        EventBus.$emit('parentMsg');
        this.trial();
      }
    },
    async setMircoShopProduct(){
      await this.$store.dispatch('shop/setMircoShopProduct', { productCode: this.saleCode, isAddShop: this.isAddShop })
      this.isAddShop = await this.$store.dispatch('shop/checkProductIsExistInMircoShop', { productCode: this.saleCode })
    },
    // 立即支付
    placeOrder(){
      setTimeout(() => {
        this.trial(true)
      }, 300);
    }

  },
  mounted() {
    let productDetailScrollTop = util.getSessionStorageObj("productDetailScrollTop");
    if (productDetailScrollTop) {
      this.$refs.scrollContent.scrollTop = productDetailScrollTop;
    }

    EventBus.$on('parentMsg', () => {
      setTimeout(() => {
        if (this.$refs.appntInfo) {
          this.$refs.appntInfo.parentMsg();
        }
        if (this.$refs.multipleInfo) {
          this.$refs.multipleInfo.parentMsg();
        }
        if (this.$refs.singleInfo) {
          this.$refs.singleInfo.parentMsg();
        }
        if (this.$refs.beneficiary) {
          this.$refs.beneficiary.parentMsg();
        }
        if (this.$refs.carInfo) {
          this.$refs.carInfo.parentMsg();
        }
        if (this.$refs.tagsList) {
          this.$refs.tagsList.parentMsg();
        }
      }, 100);
    });

    // 调起试算
    EventBus.$on('parentTrial', () => {
      this.trial();
    });
  },
  beforeDestroy() {
    EventBus.$off('parentTrial');
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/app/home/productDetail.less';
@import '../../assets/less/app/product/productDetail.less';
#app.iosSystem .productDetailTwo .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .productDetailTwo .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.productDetailTwo{
  background-color: white;
  /deep/.productPlan{
    padding: 15px 0 15px 10px;
    font-size: 16px;
    font-weight: 700;
  }
  /deep/.productTitle{
   background-color: white;
    padding: 0 0 15px 10px;
    font-size: 14px;

  }
  .productPrice{
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    font-size: 14px;
  }
  .flow{
    font-size: 12px;
    display: flex;
    flex-direction: column;
    padding:0 10px;
    margin-bottom: 8px;
    .flowTitle{
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 2px;
    }
  }
  .shu{
    width:10px;
    color:blue;
    margin:0 5px 0 13px;
  }
}
</style>
