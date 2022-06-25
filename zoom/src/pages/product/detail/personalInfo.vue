<template>
  <div class="insureInputPage afe-area-inset-bottom" :style="{ 'margin-top': ($iosSystem + 60) + 'px' }">
    <div class="headerPage">
      <van-nav-bar :title="type" left-arrow :border="false" right-text="完成" @click-right="onComplete" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
    </div>
     <ol class="list-box">
          <li class="item">
            <div class="van-hairline--top">
              <ul
                v-for="(insured, insureListIdex) in pageData.insuredInfo"
                :key="insureListIdex"
              >
                <li
                  v-for="(item, index) in insured.struct"
                  :key="index"
                  class="van-hairline--bottom"
                >
                  <div class="van-hairline--bottom">
                    <template v-if="item.type === 'input'">
                      <van-field
                        v-if="
                          ([
                            'RBTMOBILE_MALL_RBT0019'
                          ].includes(pageData.saleCode) &&
                            !['01', '0'].includes(insured.data.idType) &&
                            [''].includes(item.code)) ||
                          item.isShow === '0'
                        "
                        :label="item.name"
                        :placeholder="item.holder"
                        v-on:blur="
                          insuredInfoEvent(
                            insureListIdex,
                            item,
                            $event.target.value
                          )
                        "
                        v-model.trim="insured.data[item.code]"
                        :class="item.isNeed === 'Y' ? 'required' : ''"
                        :type="
                          ['age', 'mobile'].includes(item.code) ? 'number' : ''
                        "
                        :disabled="['age'].includes(item.code)"
                      >
                      
                      </van-field>
                    </template>
                    <template
                      v-else-if="item.type === 'number' && item.isShow === '0'"
                    >
                      <van-field
                        :label="item.name"
                        :placeholder="item.holder"
                        v-on:blur="
                          insuredInfoEvent(
                            insureListIdex,
                            item,
                            $event.target.value
                          )
                        "
                        v-model.trim="insured.data[item.code]"
                        :class="item.isNeed === 'Y' ? 'required' : ''"
                      />
                    </template>
                    <template v-else-if="item.type === 'select'">
                      <eg-data-picker
                        :value="insured.data[item.code]"
                        :placeholder="item.holder"
                        :isNeed="item.isNeed"
                        :params="item"
                        :edit="item.edit"
                        @input="insured.data[item.code] = $event.value"
                        @change="insuredInfoEvent(insureListIdex, item, $event)"
                        v-if="
                          ([
                            'RBTMOBILE_MALL_RBT0019'
                          ].includes(pageData.saleCode) &&
                            !['01', '0'].includes(insured.data.idType) &&
                            !['sex','birthday'].includes(
                              insured.struct.code
                            )) ||
                          item.isShow === '0'
                        "
                      >
                      </eg-data-picker>
                    </template>
                    <template
                      v-else-if="item.type === 'radio' && item.isShow === '0'"
                    >
                      <eg-data-checker
                        :check-val="insured.data[item.code]"
                        title=""
                        :data="item.data"
                        :isNeed="item.isNeed"
                        @input="insured.data[item.code] = $event.value"
                        @change="insuredInfoEvent(insureListIdex, item, $event)"
                      >
                      </eg-data-checker>
                    </template>
                    <template v-else-if="item.type === 'date'">
                      <eg-date-picker
                        :type="'date'"
                        :placeholder="item.holder"
                        class="birthdayDate"
                        :params="item"
                        :isNeed="item.isNeed"
                        :value="insured.data[item.code]"
                        :min-date="item.data.minDate"
                        :max-date="
                          item.data.maxDate
                        "
                        :edit="item.edit"
                        @input="insured.data[item.code] = $event.value"
                        @change="insuredInfoEvent(insureListIdex, item, $event)"
                        v-if="
                          ([
                            'RBTMOBILE_MALL_RBT0019'
                          ].includes(pageData.saleCode) &&
                            !['01', '0'].includes(insured.data.idType) &&
                            !['sex', 'birthday'].includes(
                              insured.struct.code
                            )) ||
                          item.isShow === '0'
                        "
                      >
                      </eg-date-picker>
                    </template>
                    <template
                      v-else-if="item.type === 'stack' && item.isShow === '0'"
                    >
                      <eg-stack-picker
                        :value="insured.data[item.code]"
                        :item="item"
                        :params="item.data"
                        :isNeed="item.isNeed"
                        :title="item.name"
                        :placeholder="item.holder"
                        @input="
                          pageData.insuredInfo[insureListIdex].data[item.code] =
                            $event.value
                        "
                        @change="insuredInfoEvent(insureListIdex, item, $event)"
                      >
                      </eg-stack-picker>
                    </template>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ol>

  </div>
</template>

<script>
import $ from 'jquery';
import common from '../../../assets/js/util/common';
import util from '../../../assets/js/util/util';
import compCheck from '../../../assets/js/util/comp-check';
import EventBus from '../../../assets/js/util/EventBus';
import productDetail from '../../../assets/js/util/productDetail';
import idNoScan from './../../../templates/idNoScan.vue';

export default {
  components: {
    idNoScan
  },
  data() {
    return {
      sign:'',
      type: '',
      pageData: {
         insuredInfo: [],
      }
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.saleCode = this.$route.query.saleCode;
    this.sign = util.getSessionStorageObj('signNumber') || '';
    this.getInsureInit();
  },
  methods: {
      transformDatesDay() {
      return compCheck.transformDatesDay();
    },
    // 初始化页面数据
    parentMsg() {
      if (util.getSessionStorageObj("insureInfo")) {
        this.pageData = util.getSessionStorageObj("insureInfo");
        this.setAgeIdNo();
        if (this.pageData.insuredInfo[0].data.cls) {
          this.IdentityJudgment(this.pageData.insuredInfo[0]);
        }
      }
    },
    // 初始化页面数据
    async getInsureInit() {
      console.log("util.getSessionStorageObj('insureInfo')",util.getSessionStorageObj('insureInfo'));
      if (util.getSessionStorageObj('insureInfo')) {
        this.pageData = util.getSessionStorageObj('insureInfo');
        if (this.type == '被保人信息' && this.sign != 1) {
          this.pageData.insuredInfo[0].data.idNo = "";
          this.pageData.insuredInfo[0].data.idType = "0";
          this.pageData.insuredInfo[0].data.name = "";
          this.pageData.insuredInfo[0].data.occupationPath = "";
          this.pageData.insuredInfo[0].data.relationToAppnt = "";
          this.setSelf();
        }
      } else {
        this.$toast("数据出错！");
        setTimeout(() => {
          this.onClickLeft();
        }, 1000);
      }
    },
    // 初始化选择本人
    setSelf() {
      if (!this.pageData.insuredData) {
        //42 处理安装工程险选择默认值为99
        // if(this.pageData.saleCode == "GRMOBILE_MALL_SL042"){
        //   this.pageData.insuredInfo[0].data.relationToAppnt = "99";
        // }else{
          this.pageData.insuredInfo[0].data.relationToAppnt = "99";
        // }
      }
      this.setRelationToAppnt();
    },

    // // 被保人选择或输入完成 
    // insuredInfoEvent(insureIdex, item, obj) {
    //   this.verification(item, obj);
    //     var _this = this;
    //   if (item.code == "relationToAppnt") {
    //     this.pageData.insuredInfo[0].data.relationToAppnt = obj.value;
    //     util.setSessionStorageObj('insureInfo', this.pageData);
    //     this.setRelationToAppnt();
    //   }
    //    // 切换证件类型清空数据
    //   if (item.code == "idType") {
    //     this.pageData.insuredInfo[0].data.idType = obj.value;
    //     util.setSessionStorageObj('insureInfo', this.pageData);
    //     console.info("dff333333",this.pageData)
    //      console.log(
    //       "insuredInfoEvent",
    //       _this.pageData.insuredInfo[insureIdex].data.idType,
    //       _this.pageData.appntInfo.data.idType
    //     );
    //      _this.pageData.insuredInfo[insureIdex].data.idNo = "";
    //     _this.pageData.insuredInfo[insureIdex].data.birthday = "";
    //     _this.pageData.insuredInfo[insureIdex].data.sex = "";
    //     _this.pageData.insuredInfo[insureIdex].data.age = "";
    //   }
    // },
    
    //被保人元素下拉事件
    insuredInfoEvent(insureIdex, item, obj) {
      var _this = this;
      console.info(
        "the funciont insuredInfoEvent console=====>" +
          JSON.stringify(item) +
          "-----" +
          JSON.stringify(obj)
      );

      // 切换证件类型清空数据
      if (item.code == "idType") {
        console.log(
          "insuredInfoEvent",
          _this.pageData.insuredInfo[insureIdex].data.idType,
          _this.pageData.appntInfo.data.idType
        );
        _this.pageData.insuredInfo[insureIdex].data.idNo = "";
        _this.pageData.insuredInfo[insureIdex].data.birthday = "";
        _this.pageData.insuredInfo[insureIdex].data.sex = "";
        _this.pageData.insuredInfo[insureIdex].data.age = "";
      }

      if (item.code == "idNo") {
        // 默认出生日期和性别可编辑

        var idType = _this.pageData.insuredInfo[insureIdex].data["idType"];

        if (idType == "0" || idType == "12") {
          if (obj != "" && compCheck.isIdno(obj)) {
            var birthDay = compCheck.idNoChangeBirthday(obj);
            var sex = compCheck.idNoChangeSex(obj);
            _this.pageData.insuredInfo[insureIdex].data["birthday"] = birthDay;
            _this.pageData.insuredInfo[insureIdex].data["sex"] = sex;
          }
        }
        // 判断是否使用重复身份证
        let appntInfo = this.pageData.appntInfo;
        let insuredInfo = this.pageData.insuredInfo;
        
        if (
          insuredInfo[0].data.idNo != "" &&
          insuredInfo[0].data.idNo == appntInfo.data.idNo &&
          insuredInfo[0].data.relationToAppnt != "00"
        ) {
          this.$toast("身份证号已使用，不能重复！");
          return;
        }
      }
      if (item.code == "isLongTermValidity") {
        //如果 是否长期有效
        var idNoValidityTime = _this.findStructByCode(
          _this.pageData.insuredInfo[insureIdex],
          "idNoValidityTime"
        );
        if (idNoValidityTime) {
          if (obj.value == "Y") {
            //设置有效期时间
            idNoValidityTime.isShow = "1";
            idNoValidityTime.isNeed = "0";
            _this.pageData.insuredInfo[insureIdex].data["idNoValidityTime"] =
              "";
          } else {
            idNoValidityTime.isShow = "0";
            idNoValidityTime.isNeed = "1";
          }
        }
      }

      if (item.code == "relationToAppnt") {
        this.setRelationToAppnt();
      }
      if (item.code == "hasSocialSecurity") {
        this.setAgeIdNo(item.code);
      }
      //处理疫苗保障计划选择出生日期GRMOBILE_MALL_SL031
      if (
        item.code == "birthday" &&
        this.pageData.saleCode == "GRMOBILE_MALL_SL031"
      ) {
        _this.pageData.insuredInfo[insureIdex].data["birthday"] = obj;
      }

      if (item.code == "birthday") {
        _this.pageData.insuredInfo[insureIdex].data["birthday"] = obj;
        //_this.pageData.insuredInfo[insureIdex].data["age"] = Number(new Date().getFullYear()) - Number(obj.split('-')[0])
        let startDate = util.getSessionStorageObj("startDate") || "";
        let d = new Date(startDate.replace(/-/g, "/"));
        let birthday = new Date(obj.replace(/-/g, "/"));
        let age =d.getFullYear() - birthday.getFullYear() - (d.getMonth() < birthday.getMonth() || (d.getMonth() == birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
        _this.pageData.insuredInfo[insureIdex].data["age"] = age;
      }
      if (item.code == "sex") {
        _this.pageData.insuredInfo[insureIdex].data["sex"] = obj.value;
      }

      // 客户类型
      if (item.code == "cls") {
        // this.setCustomerType(item, obj);
        // if (_this.pageData.appntInfo.data["cls"] === '1') {
        //   _this.pageData.appntInfo.data["idType"] = '0'
        // } else if (_this.pageData.appntInfo.data["cls"] === '2') {
        //   _this.pageData.appntInfo.data["idType"] = '10'
        // }
        this.IdentityJudgment(_this.pageData.insuredInfo[insureIdex]);
      }
      // 保存信息
      //util.setSessionStorageObj("insureInfo", this.pageData);
      productDetail.isSex();
      EventBus.$emit("parentMsg");
    },

    // 通用验证
    verification(item, obj) {
      if (item.code == 'idNo') {
        var idType = this.pageData.insuredInfo[0].data['idType'];
        if (idType == '0' || idType == '12') {
          compCheck.isIdno(obj);
        }
      } else if (item.code == 'mobile') {
        compCheck.isMobile(obj);
      } else if (item.code == 'email') {
        compCheck.isEmail(obj);
      }
    },

    // 1、判断被保人是否是配偶，只能选一个； 2、判断被保人是否是父母，只能选一个； 3、本人只能选一个
    setRelationToAppnt() {
      let insuredInfo = JSON.parse(JSON.stringify(this.pageData.insuredInfo));
      let spouse = false;
      let parent = false;
      let self = false;
      if (this.pageData.insuredData) {
        let insuredData = JSON.parse(JSON.stringify(this.pageData.insuredData));
        spouse = insuredData.some(item => { return item.data.relationToAppnt === '05' }) ? true : false;
        parent = insuredData.some(item => { return item.data.relationToAppnt === '07' }) ? true : false;
        self = insuredData.some(item => { return item.data.relationToAppnt === '00' }) ? true : false;
      }
      insuredInfo[0].data.idNo = "";
      //处理工程险公司名称问题
      if(this.pageData.saleCode == 'GRMOBILE_MALL_SL042'){
        insuredInfo[0].data.enterprise = "";
      }else{
        insuredInfo[0].data.name = "";
      }
      console.log("this.pageData.insuredInfo[0].data.idNo", this.pageData.insuredInfo[0].data.idNo);
      for (let item of insuredInfo) {
        for (let struct of item.struct) {
          if (struct.code === "relationToAppnt") {
            for (let relationToAppnt of struct.data) {
              if (relationToAppnt.value === '05') {
                relationToAppnt.disabled = spouse;
              }
              // if (relationToAppnt.value === "07") {
              //   relationToAppnt.disabled = parent;
              // }
              if (relationToAppnt.value === "00") {
                relationToAppnt.disabled = self;
              }
            }
            self = true;
          }
        }
      }
      this.pageData.insuredInfo = insuredInfo;
      if (self) {
        this.selectSelf();
      }
    },
    // 被保人选择自己
    selectSelf() {
      let insuredInfo = this.pageData.insuredInfo;
      for (let item of insuredInfo) {
        if (item.data.relationToAppnt === "00") {         
          if (this.pageData.appntInfo.data.idNo) {
            item.data.idNo = this.pageData.appntInfo.data.idNo;
          }
          //处理安装工程险公司名称问题
          if(this.pageData.saleCode == "GRMOBILE_MALL_SL042"){
            if (this.pageData.appntInfo.data.enterprise) {
              item.data.enterprise = this.pageData.appntInfo.data.enterprise;
            }
          }else{
            if (this.pageData.appntInfo.data.name) {
              item.data.name = this.pageData.appntInfo.data.name;
            }
          }        
          if (this.pageData.appntInfo.data.idType) {
            item.data.idType = this.pageData.appntInfo.data.idType;
          }         
        }
      }
    },

    // 完成按钮
    onComplete() {
      if(!productDetail.isSex(this.pageData)){
        return false;
      }
      let isPass = false;
      let appntInfoDown = '';
      let appntInfo = this.pageData.appntInfo; //投保人
      // 投保人信息
      let _this = this;
      if (this.type == '被保人信息') {
        //判断被保人
        //非本人情况
        console.log("_this.pageData.sameOneFlag", _this.pageData.sameOneFlag);
        let insuredListData = [];
        if (_this.pageData.sameOneFlag == 'N') {
          var insuredInfoList = _this.pageData.insuredInfo; //被保人结构数据
          var insuredInfoDown = '';
          //遍历被保人结构数据并封装成集合
          $.each(insuredInfoList, function (insureLoopIndex, insuredInfo) {

            $.each(insuredInfo.struct, function (_index, _obj) { //循环验证投保人 值是否为空
              console.log("_index", _index);
              console.log("_obj", _obj);
              if (_obj.isNeed == 'Y' && _obj.isShow == '0') {//需要 验证是否为空
                console.log('被保人参数[' + _obj.name + ']需要验证');
                var val = insuredInfo.data[_obj.code];
                console.log('被保人参数[' + _obj.name + ']需要验证,值为:' + val);
                if (null == val || '' == val) {
                  console.log('被保人参数[' + _index + ']是空!!!');
                  insuredInfoDown = _obj.name;
                  isPass = true;
                  return false;
                }
              }

              //存在需要校监的 函数 verifyInsuredInfo
              var _rt = _this.verifyInsuredInfo(insuredInfo.data, _obj.code);

              if (!_rt) {	  //如果没通过
                insuredInfoDown = '';
                isPass = true;
                return false;
              }
              //将页面录入字段赋值
              insuredListData[insureLoopIndex] = insuredInfo.data;
            });
          });
          if (isPass) { //被保人是否有的值为空
            if (insuredInfoDown) {
              this.$toast('请选择或录入被保人' + insuredInfoDown + '信息！');
            }
            return false;
          }
        } else {
          //本人情况  赋值数据到 被保人        
          var appntInfoData = _this.pageData.appntInfo.data;
          insuredListData[0] = appntInfoData;          
        }
        console.log('被保人信息=======[:' + JSON.stringify(insuredListData) + ']');

        // 身份证号不能相同判断
        let appntInfo = this.pageData.appntInfo;
        let insuredInfo = this.pageData.insuredInfo;
        let insuredData = this.pageData.insuredData;
        if(insuredData && insuredData.length){
          for( let item of insuredData ){
            if(item.data.idNo == insuredInfo[0].data.idNo ){
              this.$toast('身份证号已使用，不能重复！');
              return;
            }
            if(item.data.idNo == appntInfo.data.idNo && item.data.relationToAppnt != "00" ){
              this.$toast('身份证号已使用，不能重复！');
              return;
            }
          }
        }else{
          if( insuredInfo[0].data.idNo == appntInfo.data.idNo && insuredInfo[0].data.relationToAppnt != "00" ){
            this.$toast('身份证号已使用，不能重复！');
            return;
          }
        }
        // 存储被保人信息
        if (this.pageData.insuredData) {
          this.pageData.insuredData.push(this.pageData.insuredInfo[0]);
        } else {
          this.pageData.insuredData = JSON.parse(JSON.stringify(this.pageData.insuredInfo));  // 设置被保人数据
        }
      }

      this.setAgeIdNo();
      // 保存信息
      util.setSessionStorageObj('insureInfo', this.pageData);
      productDetail.isSex(); 
      EventBus.$emit('parentMsg');
      util.removeSessionStorageObj('signNumber');
      this.onClickLeft();
    },

    verifyInsuredInfo(insuredData, element) {
      if (insuredData && element) {
        let queryList = util.getSessionStorageObj('queryList');
        if (element == 'name') { //姓名
        if(queryList.codeCode || queryList.transcribePhone){
          return compCheck.isName2(insuredData[element], '请输入被保人正确的姓名格式！');
        }else{
          return compCheck.isName(insuredData[element], '请输入被保人正确的姓名格式！');
        }
           
        } else if (element == 'idNo') {//证件号码 身份证  //如果选择是身份证类型
         return compCheck.isIdno(insuredData[element], '请输入被保人正确的格式！',insuredData.idType);
        } else if (element == 'mobile') {//手机
        if(queryList.codeCode || queryList.transcribePhone){
          return compCheck.isMobile2(insuredData[element], '请输入被保人正确的手机号！');
        }else{
          return compCheck.isMobile(insuredData[element], '请输入被保人正确的手机号！');
        }
          
        } else if (element == 'email') {//邮箱
          return compCheck.isEmail(insuredData[element], '请输入被保人正确的邮箱！');
        } else if (element == 'stature') {//身高
          return compCheck.isPlus(insuredData[element], '请输入被保人正确的身高（cm）！');
        } else if (element == 'addressNo') {//地址
          return compCheck.isAddress(insuredData[element], '被保人通讯地址长度不能少于5个汉字,或特殊字符！');
        } else if (element == 'companyName') {//单位名称
          return compCheck.isCompanyName(insuredData[element], '被保人单位名称长度不能少于8个汉字,或特殊字符！');
        } else if (element == 'avoirdupois') {//体重
          return compCheck.isPlus(insuredData[element], '请输入被保人正确的体重（kg）！');
        } else if (element == 'zip') {//邮政编码
          return compCheck.isCheckZip(insuredData[element], '请输入被保人正确的邮政编码！');
        }else if (element == 'birthday'&& !['0', '01'].includes(insuredData['idType'])) {
          
          if(!insuredData[element] || insuredData[element]==""){
            this.$toast('请选择出生日期！');return false
          }
          let age = compCheck.getAgeByDate(insuredData[element]);
          if(age<0){
            this.$toast('出生日期格式错误');return false
          }
        }
      }
      return true;
    },
    

    // i国任-个人意外保险【家庭版】 GRMOBILE_MALL_SL006
    // i国任-法定传染病保障计划【家庭版】 GRMOBILE_MALL_SL007
    // i国任-全家保军人家属版 GRMOBILE_MALL_SL012
    // GRMOBILE_MALL_SL042
    // 获取年龄去试算
    // setAgeIdNo() {
    //   let insuredInfo = [];
    //   for (let item of this.pageData.insuredData) {
    //     if(item.data.idType == '0'){
    //       if (item.data.idNo && compCheck.isIdno(item.data.idNo)) {
    //         let birthDay = compCheck.idNoChangeBirthday(item.data.idNo);
    //         insuredInfo.push({
    //           idNo: item.data.idNo,
    //           age: compCheck.getAgeByDate(birthDay),
    //           sex: compCheck.idNoChangeSex(item.data.idNo)
    //         });
    //       }
    //     }else if(item.data.idType == '10'){
    //       insuredInfo.push({
    //           idNo: item.data.idNo,
    //           age: 29,
    //           sex: ''
    //         });
    //     }
       
    //   }
    //   let trialObj = util.getSessionStorageObj('trialObj');
    //   trialObj.salePlanInfo.data.insuredInfo = insuredInfo;
    //   util.setSessionStorageObj('trialObj', trialObj);
    // },
     // 获取年龄去试算
    setAgeIdNo(code) {
      let insureInfo = util.getSessionStorageObj("insureInfo");
      let temparr = [];
      if (this.pageData.insuredData) {
        temparr = this.pageData.insuredData;
      } else {
        temparr = this.pageData.insuredInfo;
      }
      let insuredInfo = [];
      let trialAge;
      for (let item of temparr) {
        if (item.data.idType == "0") {
          //判断被保人的证件类型是身份证
          if (item.data.idNo && compCheck.isIdno(item.data.idNo)) {
            let birthDay = compCheck.idNoChangeBirthday(item.data.idNo);
            let age = compCheck.getAgeByDate(birthDay);
            insuredInfo.push({
              ...item.data,
              age: age,
              sex: compCheck.idNoChangeSex(item.data.idNo),
            });
            trialAge = age
          }
        } else if (item.data.idType == "10") {
          insuredInfo.push({
            ...item.data,
            age: 28,
            sex: "",
          });
        } else if (
          item.data.idType == "16" ||
          item.data.idType == "2" ||
          item.data.idType == "24" ||
          item.data.idType == "23"||
          item.data.idType == "15"
        ) {
          trialAge = "0";
          console.log('trialAge为000')
          if (item.data.age) {
            trialAge = item.data.age;
          }
        }
      }
      let trialObj = util.getSessionStorageObj("trialObj");
      let idNo = "";

      if (
        trialObj &&
        trialObj.salePlanInfo &&
        trialObj.salePlanInfo.data.insuredInfo &&
        trialObj.salePlanInfo.data.insuredInfo.length
      ) {
        idNo =
          trialObj.salePlanInfo.data.insuredInfo &&
          trialObj.salePlanInfo.data.insuredInfo.length &&
          trialObj.salePlanInfo.data.insuredInfo[0].idNo
            ? trialObj.salePlanInfo.data.insuredInfo[0].idNo
            : "";
      }
      const newIdNo = temparr[0].data.idNo;
      if (trialObj) {
        trialObj.salePlanInfo.data.insuredInfo = insuredInfo;
      }

      if (
        trialAge &&
        trialObj &&
        trialObj.salePlanInfo &&
        trialObj.salePlanInfo.data
      ) {
        trialObj.salePlanInfo.data.age = trialAge + "";
      }
      util.setSessionStorageObj("trialObj", trialObj);
      if (idNo != newIdNo || code || trialAge) {
        EventBus.$emit("parentTrial");
      }
    },

    // 身份信息识别
    idNoInfoEvent(type, item, obj, i) {
       //处理安装工程险公司名称问题
      if(this.pageData.saleCode == "GRMOBILE_MALL_SL042"){
        if(obj.name){
          this.pageData.insuredInfo[i].data['enterprise'] =  obj.name;
        }
      }else{
        if(obj.name){
          this.pageData.insuredInfo[i].data['name'] =  obj.name;
        }
      }
      
      if(obj.idNo){
        this.pageData.insuredInfo[i].data['idNo'] =  obj.idNo;
      }
      // 保存信息
      util.setSessionStorageObj('insureInfo', this.pageData);
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/less/app/home/insuredInfo.less';
.van-nav-bar__text {
  color: white;
}
</style>