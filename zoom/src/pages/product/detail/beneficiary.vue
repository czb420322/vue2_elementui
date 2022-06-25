<template>
  <div class="insureInputPage  beneficiaryPage">
    <ol class="list-box">
      <li class="item">
        <h1 class="title_bar">受益人信息</h1>
        <van-cell-group>
          <van-field label="是否指定受益人" value="法定" input-align="right" readonly />
        </van-cell-group>
      </li>
    </ol>
  </div>
</template>

<script>
import $ from 'jquery';
import common from '../../../assets/js/util/common';
import util from '../../../assets/js/util/util';
import compCheck from '../../../assets/js/util/comp-check';

export default {
  data() {
    return {
      pageData: {
        isSameData: [],
        relationData: []
      }
    };
  },
  created() {
    this.saleCode = this.$route.query.saleCode;
    this.parentMsg();
  },
  methods: {
    // 初始化页面数据
    parentMsg() {
      if (util.getSessionStorageObj('insureInfo')) {
        this.pageData = util.getSessionStorageObj('insureInfo');
        this.pageData.isSameData = [];
        this.pageData.relationData = [];
        this.initAppntToInsured();
      }
    },

    //初始化页面的 头被保人关系
    initAppntToInsured() {
      if (this.pageData.isCanChooseIsSame === 'Y') { // 能切换控件
        this.pageData.isSameData.push({ value: 'Y', text: '是' });
        this.pageData.isSameData.push({ value: 'N', text: '否' });
      } else {
        if (this.pageData.sameOneFlag === 'Y') { //不可以切换  必须是本人
          this.pageData.isSameData.push({ value: 'Y', text: '是' });
        } else {//不可以切换  一定不是本人
          this.pageData.isSameData.push({ value: 'N', text: '否' });
        }
      }
      if (this.pageData.isCanChooseBnfType === 'Y') { // 能切换收益人控件
        this.pageData.relationData.push({ value: '0', text: '法定' });
        this.pageData.relationData.push({ value: '1', text: '指定' });
      } else {
        if (this.pageData.bnfType === '1') { //不可以切换收益人控件  指定受益人
          this.pageData.relationData.push({ value: '1', text: '指定' });
        } else {//不可以切换  一定是法定
          this.pageData.relationData.push({ value: '0', text: '法定' });
        }
      }
    },
    appntInfoEvent(type, item, obj, event) {
      var _this = this;
      // console.log('值', this.pageData.tagsList[0].data)
      // console.log('WJ-appntInfoEvent方法',obj)
      //  console.log('WJ-appntInfoEvent方法22',item)

      if (item.name == '车牌号') {
        this.pageData.tagsList[0].data.licenseNo = this.pageData.tagsList[0].data.licenseNo.toUpperCase()
        if (this.isVehicleNumber(this.pageData.tagsList[0].data.licenseNo) == false) {
          this.$toast('车牌号输入有误');
        }
      }
      if (item.name == '车架号') {
        this.pageData.tagsList[0].data.frameNo = this.pageData.tagsList[0].data.frameNo.toUpperCase()
        if (this.isVehicleFrame(obj) == false) {
          this.$toast('车架号输入有误');
        }
      }




      if (item.code == 'idNo') {
        // 默认出生日期和性别可编辑
        var bithdayStruct = _this.findStructByCode(_this.pageData.appntInfo, 'birthday');
        console.log('bithdayStruct', bithdayStruct);
        bithdayStruct.edit = '0';
        var sexStruct = _this.findStructByCode(_this.pageData.appntInfo, 'sex');
        console.log('sexStruct', sexStruct);
        sexStruct.edit = '0';

        var idType = _this.pageData.appntInfo.data['idType'];
        if (idType == '0' || idType == '12') {
          if (obj != '' && compCheck.isIdno(obj)) {
            var birthDay = _this.idNoChangeBirthday(obj);
            var sex = _this.idNoChangeSex(obj);

            _this.pageData.appntInfo.data['birthday'] = birthDay;
            _this.pageData.appntInfo.data['sex'] = sex;
            bithdayStruct.edit = '1';
            sexStruct.edit = '1';
          }
        }

        this.relationInfoEvent('idNo');
      }
      if (item.code == 'isLongTermValidity') {//如果 是否长期有效

        var idNoValidityTime = _this.findStructByCode(_this.pageData.appntInfo, 'idNoValidityTime');
        if (idNoValidityTime) {
          if (obj.value == 'Y') {
            //设置有效期时间
            idNoValidityTime.isShow = '1';
            idNoValidityTime.isNeed = '0';
            _this.pageData.appntInfo.data['idNoValidityTime'] = '';
          } else {
            idNoValidityTime.isShow = '0';
            idNoValidityTime.isNeed = '1';
          }
        }
      }
    },

    // 车辆信息识别
    carInfoEvent(type, item, obj, i) {
      if (obj.plate_num) {
        this.pageData.tagsList[i].data['licenseNo'] = obj.plate_num;
      }
      if (obj.vin) {
        this.pageData.tagsList[i].data['frameNo'] = obj.vin;
      }
    },

    //根据code寻找 struct 的对象
    findStructByCode(obj, code) {

      var _this = this;
      var returnObj = null;

      $.each(obj.struct, function (_index, _obj) { //循环验证投保人 值是否为空
        if (_obj.code == code) {
          returnObj = _obj;
          return false;
        }
      });

      return returnObj;
    },

    //被保人元素下拉事件
    insuredInfoEvent(insureIdex, item, obj) {
      var _this = this;
      console.info("the funciont insuredInfoEvent console=====>" + JSON.stringify(item) + "-----" + JSON.stringify(obj));
      if (item.code == 'idNo') { // 默认出生日期和性别可编辑
        var bithdayStruct = _this.findStructByCode(_this.pageData.insuredInfo[insureIdex], 'birthday');
        bithdayStruct.edit = '0';
        var sexStruct = _this.findStructByCode(_this.pageData.insuredInfo[insureIdex], 'sex');
        sexStruct.edit = '0';

        var idType = _this.pageData.insuredInfo[insureIdex].data['idType'];
        if (idType == '0' || idType == '12') {
          if (obj != '' && compCheck.isIdno(obj)) {
            var birthDay = _this.idNoChangeBirthday(obj);
            var sex = _this.idNoChangeSex(obj);

            _this.pageData.insuredInfo[insureIdex].data['birthday'] = birthDay;
            _this.pageData.insuredInfo[insureIdex].data['sex'] = sex;
            bithdayStruct.edit = '1';
            sexStruct.edit = '1';
          }
        }
        this.setAgeIdNo();
      }
      if (item.code == 'isLongTermValidity') {//如果 是否长期有效
        var idNoValidityTime = _this.findStructByCode(_this.pageData.insuredInfo[insureIdex], 'idNoValidityTime');
        if (idNoValidityTime) {
          if (obj.value == 'Y') {
            //设置有效期时间
            idNoValidityTime.isShow = '1';
            idNoValidityTime.isNeed = '0';
            _this.pageData.insuredInfo[insureIdex].data['idNoValidityTime'] = '';
          } else {
            idNoValidityTime.isShow = '0';
            idNoValidityTime.isNeed = '1';
          }
        }
      }

      if (item.code == "relationToAppnt") {
        this.setRelationToAppnt();
      }
    },

    // 1、判断被保人是否是配偶，只能选一个； 2、判断被保人是否是父母，只能选一个； 3、本人只能选一个
    setRelationToAppnt() {
      let insuredInfo = JSON.parse(JSON.stringify(this.pageData.insuredInfo));
      let spouse = insuredInfo.some(item => { return item.data.relationToAppnt === '05' }) ? true : false;
      let parent = insuredInfo.some(item => { return item.data.relationToAppnt === '07' }) ? true : false;
      let self = insuredInfo.some(item => { return item.data.relationToAppnt === '00' }) ? true : false;
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
          if (this.pageData.appntInfo.data.name) {
            item.data.name = this.pageData.appntInfo.data.name;
          }
        }
      }
      this.setAgeIdNo();
    },

    biaodi(type, item, dataIndex, obj) {
      // console.info("the funciont pageData.tagsList console=====>"+JSON.stringify(pageData.tagsList))
      var _this = this;
      // console.info("the funciont biaodi console=====>"+JSON.stringify(item)+"-----"+JSON.stringify(obj));
    },

    bnfInfoEvent(type, item, dataIndex, obj) {
      var _this = this;
      if (item.code == 'idNo') {
        // 默认出生日期和性别可编辑
        var bithdayStruct = _this.findStructByCode(_this.pageData.bnfInfo, 'birthday');
        bithdayStruct.edit = '0';
        var sexStruct = _this.findStructByCode(_this.pageData.bnfInfo, 'sex');
        sexStruct.edit = '0';

        var idType = _this.pageData.bnfInfo.dataArray[dataIndex]['idType'];
        if (idType == '1' || idType == '12') {
          if (obj != '' && compCheck.isIdno(obj)) {
            var birthDay = _this.idNoChangeBirthday(obj);
            var sex = _this.idNoChangeSex(obj);

            _this.pageData.bnfInfo.dataArray[dataIndex]['birthday'] = birthDay;
            _this.pageData.bnfInfo.dataArray[dataIndex]['sex'] = sex;

            bithdayStruct.edit = '1';
            sexStruct.edit = '1';
          }
        }
      }
      if (item.code == 'isLongTermValidity') {//如果 是否长期有效

        var idNoValidityTime = _this.findStructByCode(_this.pageData.bnfInfo, 'idNoValidityTime');

        if (idNoValidityTime) {
          if (obj.value == 'Y') {
            //设置有效期时间
            idNoValidityTime.isShow = '1';
            idNoValidityTime.isNeed = '0';
            _this.pageData.bnfInfo.dataArray[dataIndex]['idNoValidityTime'] = '';
          } else {
            idNoValidityTime.isShow = '0';
            idNoValidityTime.isNeed = '1';
          }
        }
      }
      if (item.code == 'bnfOrder') {
        //核算收益人比例 是否位100%
        var isPass = false
        var bnfInfoList = _this.pageData.bnfInfo.dataArray;
        var currentOrderIndex = '';

        var indexOne = 0;
        var indexTwo = 0;
        var indexThree = 0;

        $.each(bnfInfoList, function (_index, _bnfInfo) {

          //特殊计算受益人比例        bnfOrder  bnfLot
          var currentOrder = _bnfInfo['bnfOrderBy'];
          if (currentOrder == '1') {
            indexOne++;
          }
          if (currentOrder == '2') {
            indexTwo++
          }
          if (currentOrder == '3') {
            indexThree++;
          }
          var allLot = 0;
          $.each(bnfInfoList, function (_index, _bnfInfo) { //循环验证受益人 值是否为空
            if (currentOrder == _bnfInfo['bnfOrderBy']) {
              var bnfLot = _bnfInfo['bnfscale'];
              allLot = parseInt(allLot) + parseInt(bnfLot);
            }
          });

          console.log('currentOrder:' + currentOrder + ', allLot:' + allLot);

          if (allLot < 0 || allLot > 100 || allLot != 100) {
            currentOrderIndex = currentOrder;//第几个受益人
            isPass = true;
            return false;
          }

        });
        if (indexOne == 0) {
          $.alertMessage('请先选择第一顺位的受益人');
          return false;
        }
        if (indexOne != 0 && indexTwo == 0 && indexThree != 0) {
          $.alertMessage('请先选择第二顺位的受益人');
          return false;
        }
        if (isPass) { //受益人是否顺序对的 受益人顺序对应的受益比例和不为100%
          $.alertMessage('第' + currentOrderIndex + '顺序受益人对应的受益比例和不为100%！');
          return false;
        }
      }
    },

    //是否和被保人是一个人
    relationInfoEvent(obj) {
      console.log("是否和被保人是一个人");
      if (this.pageData.sameOneFlag == 'Y') {
        let insuredInfo = JSON.parse(JSON.stringify(this.originData.insuredInfo[0]));
        if (this.pageData.appntInfo.data.idNo) {
          insuredInfo.data.idNo = this.pageData.appntInfo.data.idNo;
        }
        if (this.pageData.appntInfo.data.name) {
          insuredInfo.data.name = this.pageData.appntInfo.data.name;
        }
        this.pageData.insuredInfo = [insuredInfo];
      } else {
        if (obj == 'sameOneFlag') {
          this.pageData.insuredInfo = [];
          setTimeout(() => {
            let insuredInfo = JSON.parse(JSON.stringify(this.originData.insuredInfo));
            this.pageData.insuredInfo = insuredInfo;
          }, 1);
        }
      }
      this.setAgeIdNo();
      this.setRelationToAppnt();
    },

    //是否指定受益人
    relationbnfInfoEvent(item) {

      console.log('relationbnfInfoEvent ........');

      var _this = this;
      //打开
      if (_this.pageData.bnfType == '1') {

        _this.addBnfInfo();

      } else {
        //关闭
        _this.pageData.bnfInfo.dataArray = [];
        _this.pageData.bnfInfoIndex = 0;
      }
    },

    //增加受益人
    addBnfInfo() {

      var _this = this;
      //核算收益人比例 是否位100%
      //       		 	var currentOrderIndex = '';
      //       		 	var ispass=false;
      //       		 	var bnfInfoList = _this.pageData.bnfInfo.dataArray;
      //       		 	$.each(bnfInfoList, function(_index, _bnfInfo){
      //       			  
      //       			  //特殊计算受益人比例        bnfOrder  bnfLot
      //       			  var currentOrder = _bnfInfo['bnfOrderBy'];
      //       			  var allLot = 0;
      //       			  
      //       			  $.each(bnfInfoList, function(_index, _bnfInfo){ //循环验证受益人 值是否为空
      //       				  if(currentOrder == _bnfInfo['bnfOrderBy']){
      //	  					      var bnfLot = _bnfInfo['bnfscale'];
      //	  					      allLot = parseInt(allLot) + parseInt(bnfLot);
      //	  					  }
      //				      });
      //       			  
      //       			  console.log('currentOrder:' + currentOrder +', allLot:' + allLot);
      //       			  
      //       			  if(allLot < 0 || allLot > 100 || allLot != 100){
      //       				  currentOrderIndex = currentOrder;//第几个受益人
      //       				  isPass = true;
      //       				  return false; 
      //	  			  }
      //       			  
      //       		 	});
      //       		 
      //       		 	if(isPass){ //受益人是否顺序对的 受益人顺序对应的受益比例和不为100%
      //				     $.alertMessage('第'+currentOrderIndex+'顺序受益人对应的受益比例和不为100%！');
      //	        		 return false;
      //	        	 }
      _this.pageData.bnfInfo.dataArray.push($.extend({}, _this.pageData.bnfInfo.data));
      _this.pageData.bnfInfoIndex++;

    },
    //删除受益人
    removeBnfInfo(index) {

      var _this = this;
      var lengthBnf = _this.pageData.bnfInfo.dataArray.length;
      //存在就操作
      if (lengthBnf > 1) {
        _this.pageData.bnfInfo.dataArray.splice(index, 1);
      } else {
        _this.pageData.bnfType = '0';
        _this.pageData.bnfInfo.dataArray.splice(index, 1);
      }
      _this.pageData.bnfInfoIndex--;

    },

    // 增加被保人
    async addSalePlan() {
      let salePlanInfo = util.getSessionStorageObj('salePlanInfo');
      let insureNumData = util.getSessionStorageObj('insureNumData');
      if (insureNumData > salePlanInfo.data.insureNum) {
        salePlanInfo.data.insureNum++;
        util.setSessionStorageObj('salePlanInfo', salePlanInfo);
        this.setAgeIdNo();
        this.insureInputInit();
      } else {
        this.$toast(`被保人数最多${insureNumData}人`);
      }
    },
    // 增加被保人试算
    async trialInner() {
      let trialObj = util.getSessionStorageObj('trialObj');
      if (this.pageData.sameOneFlag == 'Y') {
        trialObj.salePlanInfo.data.insureNum = '1';
      }
      const res = await this.$axios({
        url: this.$API.API_MAKE_CALCMOBILE,
        method: 'post',
        data: trialObj
      });
      //总保费
      this.pageData.sumPrem = res.content.sumPrem;
      // 优惠金额
      this.pageData.discountPrem = res.content.discountPrem || 0;
      this.pageData.flag = res.content.flag || 0;

      util.setSessionStorageObj('sumPrem', this.pageData.sumPrem);
    },

    // 增加被保人添加数据
    async insureInputInit() {
      let isExemption = util.getSessionStorageObj('isExemption');//豁免险标识
      let insureNum = util.getSessionStorageObj('salePlanInfo').data.insureNum;
      const res = await this.$axios({
        url: this.$API.API_INSURE_INPUT_INIT,
        method: 'post',
        data: {
          saleCode: this.$route.query.saleCode,
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system'),
          isExemption,
          insureNum
        }
      });
      console.log("res.content.insuredInfo", res.content.insuredInfo.length);
      this.pageData.insuredInfo.push(res.content.insuredInfo[res.content.insuredInfo.length - 1]);
      this.setRelationToAppnt();

      this.trialInner();
    },

    // 删除被保人
    delSalePlan(index) {
      let insuredInfo = JSON.parse(JSON.stringify(this.pageData.insuredInfo));
      this.pageData.insuredInfo = [];
      if (insuredInfo.length > 1) {
        insuredInfo.splice(index, 1); //删除下标为i的元素
        setTimeout(() => {
          this.pageData.insuredInfo = insuredInfo;
          this.setRelationToAppnt();
          this.setAgeIdNo();
        }, 1);
        let salePlanInfo = util.getSessionStorageObj('salePlanInfo');
        salePlanInfo.data.insureNum--;
        util.setSessionStorageObj('salePlanInfo', salePlanInfo);

        this.trialInner();
      } else {
        this.$toast(`被保人数不能少于1人`);
      }
    },

    verifyAppntInfo(appntData, element) {
      console.log("verifyAppntInfo------" + element);
      if (appntData && element) {

        if (element == 'name') {//姓名

          return appntData[element] ? true : compCheck.isMobile(appntData[element], '请输入投保人姓名！');

        } else if (element == 'idNo') {//证件号码 身份证  //如果选择是身份证类型
          if (appntData['idType'] == '0' || appntData['idType'] == '12') {
            return compCheck.isIdno(appntData[element], '请输入投保人正确的身份证格式！');
          } else {
            return true;
          }
        } else if (element == 'mobile') {//手机

          return compCheck.isMobile(appntData[element], '请输入投保人正确的手机号！');

        } else if (element == 'email') {//邮箱

          return compCheck.isEmail(appntData[element], '请输入投保人正确的邮箱！');

        } else if (element == 'stature') {//身高

          return compCheck.isPlus(appntData[element], '请输入投保人正确的身高（cm）！');

        } else if (element == 'addressNo') {//地址

          return compCheck.isAddress(appntData[element], '投保人通讯地址长度不能少于5个汉字,或特殊字符！');

        } else if (element == 'companyName') {//单位名称

          return compCheck.isCompanyName(appntData[element], '投保人单位名称长度不能少于8个汉字,或特殊字符！');

        } else if (element == 'avoirdupois') {//体重

          return compCheck.isPlus(appntData[element], '请输入投保人正确的体重（kg）！');

        } else if (element == 'zip') {//邮政编码

          return compCheck.isCheckZip(appntData[element], '请输入投保人正确的邮政编码！');
        }
      }

      return true;

    },


    verifyInsuredInfo(insuredData, element) {
      console.log('verifyInsuredInfo11111111111>>>' + element);

      if (insuredData && element) {
        if (element == 'idNo') {//证件号码 身份证  //如果选择是身份证类型
          if (insuredData['idType'] == '0' || insuredData['idType'] == '12') {
            return compCheck.isIdno(insuredData[element], '请输入被保人正确的身份证格式！');
          } else {
            return true;
          }
        } else if (element == 'mobile') {//手机

          return compCheck.isMobile(insuredData[element], '请输入被保人正确的手机号！');

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

        }
      }
      return true;
    },

    verifyBnfInfo(bnfInfoData, element) {

      console.log('verifyBnfInfo>>>' + element);

      if (bnfInfoData && element) {

        if (element == 'bnfLot') {//受益比例

          return compCheck.isPlus(bnfInfoData[element], '请输入正确的受益比例！');

        } else if (element == 'idNo') {//证件号码 身份证  //如果选择是身份证类型

          if (bnfInfoData['idType'] == '0' || bnfInfoData['idType'] == '12') {
            return compCheck.isIdno(bnfInfoData[element], '请输入受益人正确的身份证格式！');
          } else {
            return true;
          }
        }
      }

      return true;

    },
    verifyAccountInfo(accountData, element) {
      console.log('verifyAccountInfo>>>' + element);
      if (accountData && element) {
        if (element == 'idNo') {//证件号码 身份证  //如果选择是身份证类型
          if (accountData['idType'] == '0' || accountData['idType'] == '12') {
            return compCheck.isIdno(accountData[element], '请输入账户信息正确的身份证格式！');
          } else {
            return true;
          }

        }
      }

      return true;

    },
    //通过身份证更改生日
    idNoChangeBirthday(idNo) {
      var _this = this;
      var birthday = idNo.substring(6, 10) + "-" + idNo.substring(10, 12) + "-" + idNo.substring(12, 14);
      return birthday;
    },
    //通过身份证更改性别
    idNoChangeSex(idNo) {
      var _this = this;
      var sexChange = idNo.substring(16, 17);
      var sex = '';
      if (sexChange % 2 == 0) {//女
        sex = '1';
      } else {
        //男
        sex = '0';
      }
      return sex;
    },
    //四舍五入 num数 v保留几位小数
    decimal(num, v) {
      var vv = Math.pow(10, v);
      return Math.round(num * vv) / vv;
    },
    //根据生日计算年龄
    birthdayToage(bir) {
      var birthday = new Date(bir.replace(/-/g, "\/"));
      var d = new Date();
      var age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() == birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
      return age;
    },
    //下一步提交
    async nextInsureInput() {
      console.log('提交', this.$route.query.saleCode)

      //暂存  数据到session
      var _this = this;
      //验证数据是否可以下一步
      var isPass = false;
      //验证投保人
      var appntInfo = _this.pageData.appntInfo; //投保人
      var appntData = _this.pageData.appntInfo.data; //投保人数据

      var appntInfoDown = '';

      $.each(appntInfo.struct, function (_index, _obj) { //循环验证投保人 值是否为空
        console.log("_index", _index);
        console.log("_obj", _obj);
        if (_obj.isNeed == 'Y ' && _obj.isShow == '0') {//需要 验证是否为空
          console.log('投保人参数[' + _obj.name + ']需要验证');
          var val = appntInfo.data[_obj.code];
          console.log('投保人参数[' + _obj.name + ']需要验证,值为:' + val);
          if (null == val || '' == val) {
            console.log('投保人参数[' + _index + ']是空!!!');
            appntInfoDown = _obj.name;
            isPass = true;
            return false;
          }
        }

        var _rt = _this.verifyAppntInfo(appntInfo.data, _obj.code);

        if (!_rt) {	  //如果没通过
          appntInfoDown = '';
          isPass = true;
          return false;
        }

      });

      if (isPass) {//被保人是否有的值为空
        if (appntInfoDown) {
          this.$toast('请选择或录入投保人' + appntInfoDown + '信息！');
        }
        return false;
      }


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
      //	        	 _this.trial();

      //判断受益人
      //指定收益人
      if (_this.pageData.bnfType == '1') {

        var bnfInfo = _this.pageData.bnfInfo;
        var bnfInfoList = _this.pageData.bnfInfo.dataArray;

        var bnfInfoDown = '';
        var bnfInfoIndex = '';

        $.each(bnfInfoList, function (_index, _bnfInfo) {
          //每个受益人
          var bnfInfoData = _bnfInfo;

          if (isPass) {
            return false;
          }

          $.each(bnfInfo.struct, function (__index, _obj) { //循环验证受益人 值是否为空

            if (_obj.isNeed == '1') {//需要 验证是否为空
              console.log('受益人参数[' + _obj.name + ']需要验证');
              var val = _bnfInfo[_obj.code];
              console.log('受益人参数[' + _obj.name + ']需要验证,值为:' + val);
              if (null == val || '' == val) {
                console.log('受益人参数[' + _index + ']是空!!!');
                bnfInfoIndex = (_index + 1);//第几个受益人
                bnfInfoDown = _obj.name;
                isPass = true;
                return false;
              }
            }

            //存在需要校监的 函数 verifyBnfInfo
            var _rt = _this.verifyBnfInfo(bnfInfoData, _obj.code);

            if (!_rt) {	  //如果没通过
              bnfInfoDown = '';
              isPass = true;
              return false;
            }

          });

        });

        if (isPass) { //受益人是否有的值为空
          if (bnfInfoDown) {
            $.alertMessage('请选择或录入第' + bnfInfoIndex + '位受益人【' + bnfInfoDown + '】信息！');
          }
          return false;
        }
        //核算收益人比例 是否位100%
        var currentOrderIndex = '';

        var indexOne = 0;
        var indexTwo = 0;
        var indexThree = 0;

        $.each(bnfInfoList, function (_index, _bnfInfo) {
          var currentOrder = _bnfInfo['bnfOrderBy'];
          if (currentOrder == '1') {
            indexOne++;
          }
          if (currentOrder == '2') {
            indexTwo++
          }
          if (currentOrder == '3') {
            indexThree++;
          }

        });
        if (indexOne == 0) {
          $.alertMessage('请先选择第一顺位的受益人');
          return false;
        }
        if (indexOne != 0 && indexTwo == 0 && indexThree != 0) {
          $.alertMessage('请先选择第二顺位的受益人');
          return false;
        }

        var allLot = 0;
        $.each(bnfInfoList, function (_index, _bnfInfo) { //循环验证受益人 值是否为空
          var bnfLot = _bnfInfo['bnfscale'];
          allLot = parseInt(allLot) + parseInt(bnfLot);
        });

        console.log('合计受益比例和: ' + allLot);

        if (allLot < 0 || allLot > 100 || allLot != 100) {
          $.alertMessage('受益人对应的受益比例和不为100%！');
          return false;
        }
      }

      if (isPass) {//被保人是否有的值为空
        if (accountInfoDown) {
          $.alertMessage('请选择或录入账户信息' + accountInfoDown + '信息！');
        }
        return false;
      }

      // GRMOBILE_MALL_SL002 i行销-全车驾乘人员意外险
      // GRMOBILE_MALL_SL005 i行销-非机动车责任险
      // GRMOBILE_MALL_SL008  i行销-摩托车意外险
      if (this.$route.query.saleCode == 'GRMOBILE_MALL_SL002' || this.$route.query.saleCode == 'GRMOBILE_MALL_SL005' || this.$route.query.saleCode == 'GRMOBILE_MALL_SL008' || this.$route.query.saleCode == 'GRMOBILE_MALL_SL082') {
        let car = this.pageData.tagsList[0].data;
        if (!car.frameNo && !car.licenseNo) {
          this.$toast('车牌号或车架号必填一项');
          return;
        }
      }


      _this.pageData.disabledPage = true;

      util.setSessionStorageObj('sumPrem', _this.pageData.sumPrem);//总保费

      //存储
      util.setSessionStorageObj('saleName', _this.pageData.saleName);//销售计划名称

      util.setSessionStorageObj('appntInfo', _this.pageData.appntInfo.data);//投保人

      util.setSessionStorageObj('sameOneFlag', _this.pageData.sameOneFlag);//指定的情况下 Y是 N否
      util.setSessionStorageObj('insuredInfo', _this.pageData.insuredInfo);//被保人

      util.setSessionStorageObj('bnfType', _this.pageData.bnfType);//不能切换的情况下  指定1  还是 法定  0 
      util.setSessionStorageObj('bnfInfoList', _this.pageData.bnfInfo.dataArray);//受益人列表

      if (_this.pageData.carInfo) {
        util.setSessionStorageObj('carInfo', _this.pageData.carInfo.data);//车辆信息
      }
      if (_this.pageData.houseInfo) {
        util.setSessionStorageObj('houseInfo', _this.pageData.houseInfo.data);//房屋信息
      }
      if (_this.pageData.accountInfo) {
        util.setSessionStorageObj('accountInfo', _this.pageData.accountInfo.data);//账户
      }
      util.setSessionStorageObj('recntInfo', _this.pageData.recntInfo.data);//推荐人
      if (_this.pageData.tagsList) {
        util.setSessionStorageObj('tagsList', _this.pageData.tagsList);//标的信息
      }

      var saveObj = {};
      saveObj.orderNo = util.getSessionStorageObj('orderNo');//订单号
      saveObj.appntInfo = util.getSessionStorageObj('appntInfo');//投保人
      saveObj.sameOneFlag = util.getSessionStorageObj('sameOneFlag');//是否投保人本人
      saveObj.sumPrem = util.getSessionStorageObj('sumPrem');
      saveObj.insuredInfo = insuredListData;//被保人
      saveObj.carInfo = util.getSessionStorageObj('carInfo');//车辆信息
      saveObj.houseInfo = util.getSessionStorageObj('houseInfo');//房屋信息
      saveObj.accountInfo = util.getSessionStorageObj('accountInfo');//账户
      saveObj.recntInfo = util.getSessionStorageObj('recntInfo');//账户


      saveObj.saleCode = util.getSessionStorageObj('saleCode');//销售计划code
      saveObj.setMealCode = util.getSessionStorageObj('setMealCode');//套餐选项
      saveObj.insuYearUnit = util.getSessionStorageObj('insuYearUnit');//保险期间
      saveObj.salePlanInfo = util.getSessionStorageObj('salePlanInfo');//销售计划大对象

      saveObj.bnfType = util.getSessionStorageObj('bnfType');//受益人类型
      saveObj.bnfInfoList = util.getSessionStorageObj('bnfInfoList');//受益人列表
      saveObj.saleCode = _this.pageData.saleCode;//销售code
      saveObj.saleName = _this.pageData.saleName;//销售计划名称
      saveObj.riskInfo = {};
      saveObj.riskInfo.mainRiskList = util.getSessionStorageObj('readyMainRiskList');
      saveObj.riskInfo.addRiskList = util.getSessionStorageObj('readyAddRiskList');
      saveObj.tagsList = util.getSessionStorageObj('tagsList');
      saveObj.type = sessionStorage.getItem('type');
      saveObj.system = sessionStorage.getItem('system');

      const res = await this.$axios({
        url: this.$API.API_INSURE_INPUT_SAVE,
        method: 'post',
        data: saveObj
      });
      if (res.code === 0 && res.content.result === '0') {
        util.setSessionStorageObj("payInfo", this.pageData);
        util.setSessionStorageObj("payUrl", res.content.payUrl);
        util.setSessionStorageObj("orderNo", res.content.insOrderNo);
        this.goPage(`confirmInsured?orderNo=${res.content.insOrderNo}`);
      } else if (res.code === 0 && res.content.result == '1' && res.content.insOrderNo) {
        this.$toast(res.content.resultMessage);
        setTimeout(() => {
          this.goPage('orderList');
        }, 2500);
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // i国任-个人意外保险【家庭版】 GRMOBILE_MALL_SL006
    // i国任-法定传染病保障计划【家庭版】 GRMOBILE_MALL_SL007
    // i国任-全家保军人家属版 GRMOBILE_MALL_SL012
    // 获取年龄去试算
    setAgeIdNo() {
      if (this.$route.query.saleCode == 'GRMOBILE_MALL_SL006' || this.$route.query.saleCode == 'GRMOBILE_MALL_SL007' || this.$route.query.saleCode == 'GRMOBILE_MALL_SL012') {
        // console.log("this.pageData.insuredInfo",this.pageData.insuredInfo);
        let insuredInfo = [];
        for (let item of this.pageData.insuredInfo) {
          if (item.data.idNo && compCheck.isIdno(item.data.idNo)) {
            let birthDay = this.idNoChangeBirthday(item.data.idNo);
            // console.log("birthDay",birthDay);
            // console.log("birthDay",compCheck.getAge(birthDay));
            insuredInfo.push({
              idNo: item.data.idNo,
              age: compCheck.getAge(birthDay)
            });
          }
        }
        // if( this.pageData.insuredInfo.length == insuredInfo.length ){
        let trialObj = util.getSessionStorageObj('trialObj');
        trialObj.salePlanInfo.data.insuredInfo = insuredInfo;
        util.setSessionStorageObj('trialObj', trialObj);
        this.trialInner();
        // }
      }
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/less/app/home/insuredInfo.less';
.van-nav-bar__text {
  color: white;
}

.insureInputPage {
  .title_bar {
    font-size: 0.95rem;
    padding: 0.8rem 16px;
    margin: 0;
    background: white;
  }
}

.appntInfoPage {
  margin-top: 15px;
}

.friends-icon {
  font-size: 1.35rem;
  position: absolute;
  top: 0;
  right: 0;
  color: #1989fa;
}

.beneficiaryPage {
  margin-top: 15px;
  .van-cell__title {
    width: 7em;
  }
}
</style>