<template>
  <div class="insureInputPage appntInfoPage afe-area-inset-bottom">
    <ol class="list-box">
      <li class="item">
        <h1 class="title_bar van-hairline--bottom">投保人信息</h1>
        <!-- <p class="remind_p" v-show="pageData.saleCode == 'GRMOBILE_MALL_SL026'">温馨提醒：投保人为企业，请线下收取/递交盖章投保单、社会信用代码证等相关纸质投保资料</p> -->
        <p class="remind_p" v-if="(pageData.saleCode=='RBTMOBILE_MALL_RBT0005' || pageData.saleCode=='RBTMOBILE_MALL_RBT0033' || pageData.saleCode=='RBTMOBILE_MALL_RBT0034')&&(this.pageData.appntInfo.data.idType == '10' || this.pageData.appntInfo.data.idType == '0')">
          温馨提示：本产品仅允许白名单内企业投保，本次投保已得到企业法人的授权，代表法人的真实意思表达。如有疑问，请联系当地分公司销售人员。
        </p>
        <div
          v-for="(item, i) in pageData.appntInfo.struct"
          :key="i"
          class="van-hairline--bottom"
        >
          <!-- <div v-if="item.isShow === '0'"> -->
          <template v-if="item.type === 'input'">
            <van-field
              :label="item.name"
              :placeholder="item.holder"
              @change="appntInfoEvent('input', item, $event.target.value)"
              v-model.trim="pageData.appntInfo.data[item.code]"
              :class="item.isNeed === 'Y' ? 'required' : ''"
              v-if="
                ([
                  'RBTMOBILE_MALL_RBT0003',
                  'RBTMOBILE_MALL_RBT0004',
                  'RBTMOBILE_MALL_RBT0007',
                  'RBTMOBILE_MALL_RBT0008',
                  'RBTMOBILE_MALL_RBT0013',
                  'RBTMOBILE_MALL_RBT0012',
                  'RBTMOBILE_MALL_RBT0010',
                  'RBTMOBILE_MALL_RBT0009',
                  'RBTMOBILE_MALL_RBT0015',
                  'RBTMOBILE_MALL_RBT0018',
                  'RBTMOBILE_MALL_RBT0019',
                  'RBTMOBILE_MALL_RBT0020',
                  'RBTMOBILE_MALL_RBT0021',
                  'RBTMOBILE_MALL_RBT0022',
                  'RBTMOBILE_MALL_RBT0023',
                  'RBTMOBILE_MALL_RBT0024',
                  'RBTMOBILE_MALL_RBT0025',
                  'RBTMOBILE_MALL_RBT0027',
                  'RBTMOBILE_MALL_RBT0028',
                  'RBTMOBILE_MALL_RBT0030',
                  'RBTMOBILE_MALL_RBT0031',
                  'RBTMOBILE_MALL_RBT0032',
                  'RBTMOBILE_MALL_RBT0035',
                ].includes(pageData.saleCode) &&
                  !['01', '0'].includes(pageData.appntInfo.data.idType) &&
                  [''].includes(item.code)) ||
                item.isShow === '0'
              "
              :type="['age'].includes(item.code) ? 'number' : ''"
              :disabled="['age'].includes(item.code)"
            >
              <!-- <van-icon
                  @click="goPage('addressBook?status=1')"
                  v-if="item.code == 'name' && pagePath != 'showProductDetail'"
                  name="friends"
                  slot="button"
                  class="friends-icon"
                /> -->
              <idNoScan
                :params="item"
                slot="button"
                v-show="['0', '01'].includes(pageData.appntInfo.data['idType'])"
                @change="idNoInfoEvent($event)"
              ></idNoScan>
            </van-field>
          </template>
          <template v-else-if="item.type === 'number' && item.isShow === '0'">
            <van-field
              :label="item.name"
              :placeholder="item.holder"
              @change="appntInfoEvent('number', item, $event.target.value)"
              v-model.trim="pageData.appntInfo.data[item.code]"
              :class="item.isNeed === 'Y' ? 'required' : ''"
            />
          </template>
          <template v-else-if="item.type === 'select'">
            <eg-data-picker
              :value="pageData.appntInfo.data[item.code]"
              :placeholder="item.holder"
              :isNeed="item.isNeed"
              :params="item"
              :edit="item.edit"
              @input="pageData.appntInfo.data[item.code] = $event.value"
              @change="appntInfoEvent('select', item, $event)"
              v-if="
                ([
                  'RBTMOBILE_MALL_RBT0003',
                  'RBTMOBILE_MALL_RBT0004',
                  'RBTMOBILE_MALL_RBT0007',
                  'RBTMOBILE_MALL_RBT0008',
                  'RBTMOBILE_MALL_RBT0013',
                  'RBTMOBILE_MALL_RBT0012',
                  'RBTMOBILE_MALL_RBT0010',
                  'RBTMOBILE_MALL_RBT0009',
                  'RBTMOBILE_MALL_RBT0015',
                  'RBTMOBILE_MALL_RBT0018',
                  'RBTMOBILE_MALL_RBT0019',
                  'RBTMOBILE_MALL_RBT0020',
                  'RBTMOBILE_MALL_RBT0021',
                  'RBTMOBILE_MALL_RBT0022',
                  'RBTMOBILE_MALL_RBT0023',
                  'RBTMOBILE_MALL_RBT0024',
                  'RBTMOBILE_MALL_RBT0025',
                  'RBTMOBILE_MALL_RBT0027',
                  'RBTMOBILE_MALL_RBT0028',
                  'RBTMOBILE_MALL_RBT0030',
                  'RBTMOBILE_MALL_RBT0031',
                  'RBTMOBILE_MALL_RBT0032',
                  'RBTMOBILE_MALL_RBT0035',
                ].includes(pageData.saleCode) &&
                  !['01', '0'].includes(pageData.appntInfo.data.idType) &&
                  ['sex', 'birthday'].includes(item.code)) ||
                item.isShow === '0'
              "
            >
            </eg-data-picker>
          </template>
          <template v-else-if="item.type === 'radio' && item.isShow === '0'">
            <eg-data-checker
              :check-val="pageData.appntInfo.data[item.code]"
              :data="item.data"
              :isNeed="item.isNeed"
              @input="pageData.appntInfo.data[item.code] = $event.value"
              @change="appntInfoEvent('radio', item, $event)"
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
              :value="pageData.appntInfo.data[item.code]"
              :min-date="item.data.minDate"
              :max-date="
                item.code != 'birthday'
                  ? item.data.maxDate
                  : transformDatesDay()
              "
              :edit="item.edit"
              @input="pageData.appntInfo.data[item.code] = $event"
              @change="appntInfoEvent('date', item, $event)"
              v-if="
                ([
                  'RBTMOBILE_MALL_RBT0003',
                  'RBTMOBILE_MALL_RBT0004',
                  'RBTMOBILE_MALL_RBT0007',
                  'RBTMOBILE_MALL_RBT0008',
                  'RBTMOBILE_MALL_RBT0013',
                  'RBTMOBILE_MALL_RBT0012',
                  'RBTMOBILE_MALL_RBT0010',
                  'RBTMOBILE_MALL_RBT0009',
                  'RBTMOBILE_MALL_RBT0015',
                  'RBTMOBILE_MALL_RBT0018',
                  'RBTMOBILE_MALL_RBT0019',
                  'RBTMOBILE_MALL_RBT0020',
                  'RBTMOBILE_MALL_RBT0021',
                  'RBTMOBILE_MALL_RBT0022',
                  'RBTMOBILE_MALL_RBT0023',
                  'RBTMOBILE_MALL_RBT0024',
                  'RBTMOBILE_MALL_RBT0025',
                  'RBTMOBILE_MALL_RBT0027',
                  'RBTMOBILE_MALL_RBT0028',
                  'RBTMOBILE_MALL_RBT0030',
                  'RBTMOBILE_MALL_RBT0031',
                  'RBTMOBILE_MALL_RBT0032',
                  'RBTMOBILE_MALL_RBT0035',
                ].includes(pageData.saleCode) &&
                  !['01', '0'].includes(pageData.appntInfo.data.idType) &&
                  ['sex', 'birthday'].includes(item.code)) ||
                item.isShow === '0'
              "
            >
            </eg-date-picker>
          </template>
          <template
            v-else-if="
              item.type === 'stack' &&
              pageData.saleCode == 'GRMOBILE_MALL_SL073' &&
              item.isShow === '0'
            "
          >
            <van-field
              class="required"
              v-model="cityName"
              :label="item.name"
              :placeholder="item.holder"
              readonly
              @click="showAreaPicker"
              is-link
            />
          </template>
          <template v-else-if="item.type === 'stack' && item.isShow === '0'">
            <eg-stack-picker
              :value="pageData.appntInfo.data[item.code]"
              :params="item.data"
              :isNeed="item.isNeed"
              :title="item.name"
              :placeholder="item.holder"
              @input="pageData.appntInfo.data[item.code] = $event.value"
              @change="appntInfoEvent('stack', item, $event)"
            >
            </eg-stack-picker>
          </template>
          <!-- </div> -->
        </div>
      </li>
    </ol>
    <areaPicker ref="areaPicker" @click="areaConfirm"></areaPicker>
  </div>
</template>

<script>
import $ from "jquery";
import common from "../../../assets/js/util/common";
import util from "../../../assets/js/util/util";
import compCheck from "../../../assets/js/util/comp-check";
import EventBus from "../../../assets/js/util/EventBus";
import productDetail from "../../../assets/js/util/productDetail";
import idNoScan from "./appntInfoIdNoScan.vue";
import areaPicker from "../../../templates/areaPicker";
export default {
  components: {
    idNoScan,
    areaPicker,
  },
  data() {
    return {
      wx: compCheck.getBrowserWx(),
      pagePath: "",
      pageData: {
        appntInfo: {
          data: {},
          struct: [],
        },
      },
      cityName: "",
      saleCode: "",
      queryList:'',
    };
  },
  created() {
    this.pagePath = this.$route.name;
    this.queryList=this.$route.query
    util.setSessionStorageObj("queryList", this.queryList); 
    this.saleCode = this.$route.query.saleCode;
    this.parentMsg();
  },
  methods: {
    transformDatesDay() {
      return compCheck.transformDatesDay();
    },
    areaConfirm(value) {
      this.cityName = "";
      for (let i in value) {
        this.cityName += value[i].name + "/";
      }
      this.cityName = this.cityName.substr(0, this.cityName.length - 1);
      this.pageData.appntInfo.data.regionPath = this.cityName;
      console.log(this.pageData.appntInfo.data.regionPath, "00000");
      util.setSessionStorageObj("insureInfo", this.pageData);
      EventBus.$emit("parentMsg");
    },
    // 显示投保地区选择
    showAreaPicker() {
      this.$refs.areaPicker.parentMsg(3);
    },
    // 初始化页面数据
    parentMsg() {
      if (util.getSessionStorageObj("insureInfo")) {
        this.pageData = util.getSessionStorageObj("insureInfo");
        //投保人 处理(地址) 宠物险取输入的默认值
        if (this.pageData.saleCode == "GRMOBILE_MALL_SL073") {
          if (this.pageData.appntInfo.data.regionPath) {
            this.cityName = this.pageData.appntInfo.data.regionPath;
            // this.cityName = this.pageData.appntInfo.data.regionPath[0].name + "/" +this.pageData.appntInfo.data.regionPath[1].name +"/"+ this.pageData.appntInfo.data.regionPath[2].name
          }
        }
        // 初始化投保人类型
        if (this.pageData.appntInfo.data.cls) {
          console.log("parentMsg", "IdentityJudgment");
          this.IdentityJudgment(this.pageData.appntInfo);
        }
        productDetail.updateSelf();
        //以前配置的物流险（先保留）
        // if( this.pageData.saleCode == "GRMOBILE_MALL_SL014" ){
        //   this.setCustomerType();
        // }
      }
    },

    // 设置客户类型
    setCustomerType() {
      for (let item of this.pageData.appntInfo.struct) {
        if (this.pageData.appntInfo.data.cls == "0") {
          if (item.code == "enterprise" || item.code == "taxpayerNo") {
            item.isShow = "1";
          }
          if (
            item.code == "name" ||
            item.code == "idNo" ||
            item.code == "email"
          ) {
            item.isShow = "0";
          }
        } else {
          if (item.code == "enterprise" || item.code == "taxpayerNo") {
            item.isShow = "0";
          }
          if (
            item.code == "name" ||
            item.code == "idNo" ||
            item.code == "email"
          ) {
            item.isShow = "1";
          }
        }
      }
    },

    // 投保人选择或输入完成
    appntInfoEvent(type, item, obj, event) {
      let _this = this;

      console.log(
        "appntInfoEvent",
        item,
        obj,
        this.pageData.appntInfo.data.idType
      );

      // 切换证件类型清空数据
      if (item.code == "idType") {
        this.pageData.appntInfo.data.idNo = "";
        this.pageData.appntInfo.data.birthday = "";
        this.pageData.appntInfo.data.sex = "";
        this.pageData.appntInfo.data.age = "";
      }

      if (
        item.code == "idNo" &&
        ["0", "01"].includes(this.pageData.appntInfo.data.idType)
      ) {
        // 默认出生日期和性别可编辑
        var bithdayStruct = _this.findStructByCode(
          _this.pageData.appntInfo,
          "birthday"
        );
        console.log("bithdayStruct", bithdayStruct);
        if (bithdayStruct) {
          bithdayStruct.edit = "0";
        }
        var sexStruct = _this.findStructByCode(_this.pageData.appntInfo, "sex");
        console.log("sexStruct", sexStruct);
        if (sexStruct) {
          sexStruct.edit = "0";
        }
        var idType = _this.pageData.appntInfo.data["idType"];
        if (idType == "0" || idType == "12" || idType == "01") {
          if (obj != "" && compCheck.isIdno(obj, "undefined", idType)) {
            var birthDay = compCheck.idNoChangeBirthday(obj);
            var sex = compCheck.idNoChangeSex(obj);

            _this.pageData.appntInfo.data["birthday"] = birthDay;
            _this.pageData.appntInfo.data["sex"] = sex;
            // if (bithdayStruct) {
            //   bithdayStruct.edit = "1";
            // }
            // if (sexStruct) {
            //   sexStruct.edit = "1";
            // }
          }
        }
      }
      if (item.code == "birthday") {
        _this.pageData.appntInfo.data["birthday"] = obj;
        //_this.pageData.appntInfo.data["age"] = Number(new Date().getFullYear()) - Number(obj.split('-')[0])
        let startDate = util.getSessionStorageObj("startDate") || "";
        let d = new Date(startDate.replace(/-/g, "/"));
        let birthday = new Date(obj.replace(/-/g, "/"));
        let age =
          d.getFullYear() -
          birthday.getFullYear() -
          (d.getMonth() < birthday.getMonth() ||
          (d.getMonth() == birthday.getMonth() &&
            d.getDate() < birthday.getDate())
            ? 1
            : 0);
        _this.pageData.appntInfo.data["age"] = age;
      }
      if (item.code == "sex") {
        _this.pageData.appntInfo.data["sex"] = obj.value;
      }
      // 客户类型
      if (item.code == "cls") {
        // this.setCustomerType(item, obj);
        // if (_this.pageData.appntInfo.data["cls"] === '1') {
        //   _this.pageData.appntInfo.data["idType"] = '0'
        // } else if (_this.pageData.appntInfo.data["cls"] === '2') {
        //   _this.pageData.appntInfo.data["idType"] = '10'
        // }
        this.IdentityJudgment(_this.pageData.appntInfo);
      }
      let pageDataTemp = util.getSessionStorageObj("insureInfo");
      if (pageDataTemp) {
        pageDataTemp.appntInfo = _this.pageData.appntInfo;
        util.setSessionStorageObj("insureInfo", pageDataTemp);
      } else {
        util.setSessionStorageObj("insureInfo", _this.pageData);
      }

      productDetail.updateSelf();
      EventBus.$emit("parentMsg");
      this.verification(item, obj);
      // 物流安全责任保险(专用GRMOBILE_MALL_SL026) 任易驾·驾乘人员意外险GRMOBILE_MALL_SL041 GRMOBILE_MALL_SL044 GRMOBILE_MALL_SL045 GRMOBILE_MALL_SL046 GRMOBILE_MALL_SL077
      if (
        this.pageData.saleCode == "GRMOBILE_MALL_SL026" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL041" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL044" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL045" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL046" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL077"
      ) {
        this.logistics(item, obj);
      }
    },

    // 判断个人关系
    IdentityJudgment(appntInfo) {
      console.log("IdentityJudgment");
      // 个人
      let personal = [
        "1",
        "01",
        "2",
        "16",
        "13",
        "14",
        "15",
        "3",
        "24",
        "18",
        "11",
        "0",
        "4",
      ];
      // 企业
      let enterprise = ["20", "21", "22", "23", "9", "10"];
      let data = [];
      appntInfo.struct.forEach((item) => {
        if (item.code == "cls") {
          if (appntInfo.data.cls == "1") {
            appntInfo.struct.forEach((res) => {
              if (res.code == "idType") {
                (res.oldData ? res.oldData : res.data).forEach((element) => {
                  console.log(element);
                  if (personal.includes(element.value)) {
                    data.push(element);
                  }
                });
              }
            });
          } else {
            appntInfo.struct.forEach((res) => {
              if (res.code == "idType") {
                (res.oldData ? res.oldData : res.data).forEach((element) => {
                  if (enterprise.includes(element.value)) {
                    data.push(element);
                  }
                });
              }
            });
          }
          item = data;
        }
      });
      this.pageData.appntInfo.data.idType = data[0].value;
      !this.pageData.appntInfo.struct[2].oldData &&
        (this.pageData.appntInfo.struct[2].oldData = JSON.parse(
          JSON.stringify(this.pageData.appntInfo.struct[2].data)
        ));
      this.pageData.appntInfo.struct[2].data = data;
      console.log(this.pageData.appntInfo);
    },

    //根据code寻找 struct 的对象
    findStructByCode(obj, code) {
      var _this = this;
      var returnObj = null;

      $.each(obj.struct, function (_index, _obj) {
        //循环验证投保人 值是否为空
        if (_obj.code == code) {
          returnObj = _obj;
          return false;
        }
      });

      return returnObj;
    },

    // 通用验证

    verification(item, obj, idType) {
     
      if (item.code == "name") {
        if(this.queryList.codeCode || this.queryList.transcribePhone){
           console.log('1234')
          return compCheck.isName2(obj);
        }else{
          return compCheck.isName(obj);
        }
      } else if (item.code == "idNo") {
        var idType = idType || this.pageData.appntInfo.data["idType"];
        if (["0", "01", "24", "2", "16", "13", "15"].includes(idType)) {
          return compCheck.isIdno(obj, undefined, idType);
        }
        return true;
      } else if (item.code == "mobile") {
        if(this.queryList.codeCode || this.queryList.transcribePhone){
           return compCheck.isMobile2(obj);
        }else{
           return compCheck.isMobile(obj);
        }
        
      } else if (item.code == "email") {
        return compCheck.isEmail(obj);
      } else if (item.code == "taxpayerNo") {
        return compCheck.checkTaxId(obj);
      } else if (item.code == "sex" && !["0", "01"].includes(idType)) {
        return compCheck.isEmpty(obj, "请选择性别");
      } else if (item.code == "birthday" && !["0", "01"].includes(idType)) {
        return compCheck.isEmpty(obj, "请选择出生日期");
      } else return true;
    },
    
    //物流安全责任保险验证(专用GRMOBILE_MALL_SL026) 任易驾·驾乘人员意外险GRMOBILE_MALL_SL041
    logistics(item, obj) {
      if (item.code == '"enterprise"' && !obj) {
        this.$toast("请输入企业名称！");
      } else if (item.code == '"idNo"' && !obj) {
        this.$toast("请输入证件号码！");
      } else if (item.code == "mobile") {
        compCheck.isMobile(obj);
      } else if (item.code == "email") {
        compCheck.isEmail(obj);
      }
      //说明投保人就是被保人(投保人的值给被保人)
      if (
        this.pageData.isCanChooseIsSame == "Y" &&
        this.pageData.sameOneFlag == "Y"
      ) {
        let insuredInfo = this.pageData.insuredInfo;
        for (let item of insuredInfo) {
          if (this.pageData.appntInfo.data.enterprise) {
            item.data.enterprise = this.pageData.appntInfo.data.enterprise;
          }
          if (this.pageData.appntInfo.data.idType) {
            item.data.idType = this.pageData.appntInfo.data.idType;
          }
          if (this.pageData.appntInfo.data.idNo) {
            item.data.idNo = this.pageData.appntInfo.data.idNo;
          }
          if (this.pageData.appntInfo.data.mobile) {
            item.data.mobile = this.pageData.appntInfo.data.mobile;
          }
          if (this.pageData.appntInfo.data.cls) {
            item.data.cls = this.pageData.appntInfo.data.cls;
          }
        }
        // 保存信息（被保人）
        util.setSessionStorageObj("insureInfo", this.pageData);
      }
    },

    // 身份信息识别
    idNoInfoEvent(obj) {
      console.log("idNoInfoEvent");
      let pageData = util.getSessionStorageObj("insureInfo");
      if (
        obj.name &&
        this.pageData.saleCode != "GRMOBILE_MALL_SL026" &&
        this.pageData.saleCode != "GRMOBILE_MALL_SL041" &&
        this.pageData.saleCode != "GRMOBILE_MALL_SL042" &&
        this.pageData.saleCode != "GRMOBILE_MALL_SL044" &&
        this.pageData.saleCode != "GRMOBILE_MALL_SL045" &&
        this.pageData.saleCode != "GRMOBILE_MALL_SL046" &&
        this.pageData.saleCode != "GRMOBILE_MALL_SL077"
      ) {
        pageData.appntInfo.data["name"] = obj.name;
      }
      if (obj.idNo) {
        pageData.appntInfo.data["idNo"] = obj.idNo;
      }

      // 保存信息
      util.setSessionStorageObj("insureInfo", pageData);
      EventBus.$emit("parentMsg");
    },
  },
};
</script>

<style lang="less">
@import "../../../assets/less/app/home/insuredInfo.less";
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
  .remind_p {
    font-size: 0.6rem;
    padding: 8px 16px;
    color: #fb7125;
    background: #fff;
    margin: 0;
  }
}

.friends-icon {
  font-size: 1.35rem;
  position: absolute;
  top: 0;
  right: 0;
  color: #1989fa;
}
</style>