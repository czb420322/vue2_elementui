<template>
  <div class="insureInputPage afe-area-inset-bottom" style="margin: 15px 0 0 0">
    <ol
      class="insuredInfoPage"
      v-show="
        pageData.saleCode != 'GRMOBILE_MALL_SL006' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL007' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL012' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL023' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL027' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL028' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL042' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL060' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL061' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL064' &&
        pageData.saleCode != 'GRMOBILE_MALL_SL065' &&
        pageData.saleCode != 'RBTMOBILE_MALL_RBT0019'
      "
    >
      <li class="list" style="padding: 0">
        <h1 class="title_bar" style="padding: 10px 16px">被保人信息</h1>
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
                          ['age'].includes(item.code) ? 'number' : ''
                        "
                        :disabled="['age'].includes(item.code)"
                      >
                        <!-- <van-icon
                          @click="goPage('addressBook?status=2')"
                          v-if="
                            item.code == 'name' &&
                            pagePath != 'showProductDetail' &&
                            insured.data['relationToAppnt'] != '00'
                          "
                          name="friends"
                          slot="button"
                          class="friends-icon"
                        /> -->
                        <idNoScan
                          v-show="insured.data['idType'] == 0"
                          :params="item"
                          slot="button"
                          @change="
                            idNoInfoEvent('input', item, $event, insureListIdex)
                          "
                        ></idNoScan>
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
                            !['01', '0'].includes(insured.data.idType) &&
                            !['sex', 'birthday'].includes(
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
                          item.code != 'birthday'
                            ? item.data.maxDate
                            : transformDatesDay()
                        "
                        :edit="item.edit"
                        @input="insured.data[item.code] = $event.value"
                        @change="insuredInfoEvent(insureListIdex, item, $event)"
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
      </li>
    </ol>
  </div>
</template>

<script>
import $ from "jquery";
import common from "../../../assets/js/util/common";
import util from "../../../assets/js/util/util";
import compCheck from "../../../assets/js/util/comp-check";
import EventBus from "../../../assets/js/util/EventBus";
import productDetail from "../../../assets/js/util/productDetail";
import idNoScan from "./../../../templates/idNoScan.vue";

export default {
  components: {
    idNoScan,
  },
  data() {
    return {
      showPage: false,
      pagePath: "",
      pageData: {
        insuredInfo: [],
      },
    };
  },
  created() {
    this.pagePath = this.$route.name;
    this.saleCode = this.$route.query.saleCode;
    this.parentMsg();
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
        var bithdayStruct = _this.findStructByCode(
          _this.pageData.insuredInfo[insureIdex],
          "birthday"
        );
        var sexStruct = _this.findStructByCode(
          _this.pageData.insuredInfo[insureIdex],
          "sex"
        );

        var idType = _this.pageData.insuredInfo[insureIdex].data["idType"];
        console.log("idType", idType);

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
        let age =
          d.getFullYear() -
          birthday.getFullYear() -
          (d.getMonth() < birthday.getMonth() ||
          (d.getMonth() == birthday.getMonth() &&
            d.getDate() < birthday.getDate())
            ? 1
            : 0);
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
      util.setSessionStorageObj("insureInfo", this.pageData);
      productDetail.isSex();
      EventBus.$emit("parentMsg");
    },

    // 判断个人关系
    IdentityJudgment(insuredInfo) {
      console.log("IdentityJudgment",insuredInfo.struct[0]);
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
      insuredInfo.struct.forEach((item) => {
        if (item.code == "cls") {
          if (insuredInfo.data.cls == "1") {
            insuredInfo.struct.forEach((res) => {
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
            insuredInfo.struct.forEach((res) => {
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
      console.log(data,'3123123124213123');
      if(data != ""){
        insuredInfo.data.idType = data[0].value;
      }
      insuredInfo.struct.forEach((res) => {
        if (res.code == "idType") {
          !res.oldData && (res.oldData = JSON.parse(JSON.stringify(res.data)));
          res.data = data;
        }
      });
      console.log(insuredInfo);
    },

    // 1、判断被保人是否是配偶，只能选一个； 2、判断被保人是否是父母，只能选一个； 3、本人只能选一个
    setRelationToAppnt() {
      let insuredInfo = JSON.parse(JSON.stringify(this.pageData.insuredInfo));
      let spouse = insuredInfo.some((item) => {
        return item.data.relationToAppnt === "05";
      })
        ? true
        : false;
      let parent = insuredInfo.some((item) => {
        return item.data.relationToAppnt === "07";
      })
        ? true
        : false;
      let self = insuredInfo.some((item) => {
        return item.data.relationToAppnt === "00";
      })
        ? true
        : false;

      insuredInfo[0].data.idNo = "";
      insuredInfo[0].data.name = "";
      insuredInfo[0].data.mobile = "";
      insuredInfo[0].data.sex = "";
      insuredInfo[0].data.birthday = "";
      insuredInfo[0].data.age = "";
      // 任易驾·驾乘人员意外险GRMOBILE_MALL_SL041 GRMOBILE_MALL_SL044 GRMOBILE_MALL_SL045 GRMOBILE_MALL_SL046 GRMOBILE_MALL_SL077
      //处理物流险企业名称GRMOBILE_MALL_SL026
      if (
        this.pageData.saleCode == "GRMOBILE_MALL_SL026" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL041" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL044" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL045" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL077"
      ) {
        insuredInfo[0].data.enterprise = "";
      }
      for (let item of insuredInfo) {
        for (let struct of item.struct) {
          if (struct.code === "relationToAppnt") {
            for (let relationToAppnt of struct.data) {
              if (relationToAppnt.value === "05") {
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
      console.log("自己", this.pageData.appntInfo.data, insuredInfo[0].data);
      for (let item of insuredInfo) {
        if (item.data.relationToAppnt === "00") {
          if (this.pageData.appntInfo.data.idNo) {
            item.data.idNo = this.pageData.appntInfo.data.idNo;
          }
          // 任易驾·驾乘人员意外险GRMOBILE_MALL_SL041 GRMOBILE_MALL_SL044 GRMOBILE_MALL_SL045 GRMOBILE_MALL_SL046 GRMOBILE_MALL_SL077
          //处理物流险企业名称GRMOBILE_MALL_SL026
          if (
            this.pageData.saleCode == "GRMOBILE_MALL_SL026" ||
            this.pageData.saleCode == "GRMOBILE_MALL_SL041" ||
            this.pageData.saleCode == "GRMOBILE_MALL_SL044" ||
            this.pageData.saleCode == "GRMOBILE_MALL_SL045" ||
            this.pageData.saleCode == "GRMOBILE_MALL_SL077"
          ) {
            //企业名称
            if (this.pageData.appntInfo.data.enterprise) {
              item.data.enterprise = this.pageData.appntInfo.data.enterprise;
            }
          } else {
            if (this.pageData.appntInfo.data.name) {
              item.data.name = this.pageData.appntInfo.data.name;
            }
          }
          if (this.pageData.appntInfo.data.idType) {
            item.data.idType = this.pageData.appntInfo.data.idType;
          }
          if (this.pageData.appntInfo.data.mobile) {
            item.data.mobile = this.pageData.appntInfo.data.mobile;
          }
          if (this.pageData.appntInfo.data.birthday) {
            item.data.birthday = this.pageData.appntInfo.data.birthday;
          }
          if (this.pageData.appntInfo.data.sex) {
            item.data.sex = this.pageData.appntInfo.data.sex;
          }
          if (this.pageData.appntInfo.data.age) {
            item.data.age = this.pageData.appntInfo.data.age;
          }
          if (this.pageData.appntInfo.data.cls) {
            item.data.cls = this.pageData.appntInfo.data.cls;
          }
        }
      }
      // 保存信息
      util.setSessionStorageObj("insureInfo", this.pageData);
      productDetail.isSex();
      EventBus.$emit("parentMsg");
    },

    // 身份信息识别
    idNoInfoEvent(type, item, obj, i) {
      let pageData = util.getSessionStorageObj("insureInfo");
      if (obj.name) {
        pageData.insuredInfo[i].data["name"] = obj.name;
      }
      if (obj.idNo) {
        pageData.insuredInfo[i].data["idNo"] = obj.idNo;
      }
      //处理疫苗保障计划选择出生日期GRMOBILE_MALL_SL031
      if (obj.idNo && this.pageData.saleCode == "GRMOBILE_MALL_SL031") {
        let birthDay = compCheck.idNoChangeBirthday(obj.idNo);
        pageData.insuredInfo[i].data["birthday"] = birthDay;
        pageData.insuredInfo[i].data["sex"] = obj.sex == "男" ? "0" : "1";
      }
      // 保存信息
      util.setSessionStorageObj("insureInfo", pageData);
      EventBus.$emit("parentMsg");
    },

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
            trialAge = age;
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
          item.data.idType == "24"
        ) {
          trialAge = "0";
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
  },
};
</script>

<style lang="less">
@import "../../../assets/less/app/home/insuredInfo.less";
.van-nav-bar__text {
  color: white;
}
</style>
<style lang="less" scoped>
.title_bar {
  padding: 16px;
  margin: 0;
  font-size: 0.92rem;
  background: white;
  margin-top: 15px;
}
</style>