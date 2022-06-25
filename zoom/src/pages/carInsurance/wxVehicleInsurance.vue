<template>
  <div class="carBaseInfo">
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <span style="color: white; opacity: .5" v-if="disabled || verifyTrial.isTrial || !verifyTrial.tryCalculation ||
        (!tryCalculation.sumPremiumCI && !tryCalculation.sumPremiumBI && !tryCalculation.sumPayTax)" >报价</span>
        <span style="color: white" v-else @click="goPage('carQuotedPrice')" >报价</span>
      </template>
    </van-nav-bar>
    <ol :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <li class="list">
        <div class="carInfo">
          <!-- <img src="./../../../public/img/carInsurance/u2967.png" alt=""> -->
          <div class="name">
            <h3>{{carInsureEntry.licenseName + carInsureEntry.licenseNo}}</h3>
            <p>{{carOwnerDTO.carOwner}}</p>
          </div>
          <!-- <van-icon name="arrow" color="#999" /> -->
        </div>
      </li>
      <!-- 车+意   09000000深圳隐藏-->
      <!-- 15000000 河北 -->
      <!-- 河北供销商贸专版关闭车+意功能 -->
      <accidentInsurance v-if="UserInfo.manageCode != '09000000' || UserInfo.manageCode != '15000000'" ></accidentInsurance>

       <li class="list" >
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" />
              <span class="custom-title">交强险与车船税</span>
            </template>
            <template #right-icon>
              <div class="price">
                <p class="presentPrice">￥{{(tryCalculation.sumPremiumCI + tryCalculation.sumPayTax) ? (tryCalculation.sumPremiumCI + tryCalculation.sumPayTax).toFixed(2) : 0}}</p>
              </div>
             <van-switch v-model="VehicleInsurance.switchChecked" size="26" @input="onSwitch( 'switchChecked', VehicleInsurance.switchChecked )" />
            </template>
          </van-cell>
          <div v-show="VehicleInsurance.switchChecked">
            <div class="cell">
              <span>保险生效日期</span>
              <span class="effective_date" v-if="!VehicleInsurance.cImmeValiFlag" @click="showDataTimePicker({ url: 'car/compulsoryInsuranceStartDate', minDate: 1, maxDate: 'max' })">
                <span v-if="compulsoryInsuranceStartDate">{{compulsoryInsuranceStartDate | datehourFilter }}时</span>
                <span v-else style="color: #999;">请选择日期</span>
                &nbsp;&nbsp;
                <van-icon name="img/carInsurance/rili@2x.png" size="20" />
              </span>
              <span class="effective_date" v-else @click="showDataTimePicker({ url: 'cImmeValidEndDate', minDate: 0, maxDate: 'max' })">
                <span v-if="VehicleInsurance.cImmeValidEndDate">{{VehicleInsurance.cImmeValidEndDate | datehourFilter}}时</span>
                <span v-else style="color: #999;">请选择日期</span>
                &nbsp;&nbsp;
                <van-icon name="img/carInsurance/rili@2x.png" size="20" />
              </span>
            </div>
            <div class="cell">
              <span></span>
              <span class="effective_date">
                <span style="color: #999;">即时起保</span>&nbsp;&nbsp;
                <van-checkbox @input="onCheckbox('cImmeValiFlag', VehicleInsurance.cImmeValiFlag, 'cImmeValidEndDate' )" v-model="VehicleInsurance.cImmeValiFlag"></van-checkbox>
              </span>
            </div>

             <div class="cell" @click="showDiscount" v-show="!VehicleInsurance.switchChecked1 && ((tryCalculation.sumPremiumCI + tryCalculation.sumPayTax) || 0) && discountData.billELR" >
              <span>费率系数折扣调整</span>
              <span class="effective_date">
                <van-icon name="arrow" color="#666" />
              </span>
            </div>

            <ul class="table">
              <li class="tr header">
                <span class="project">保障项目</span>
                <span class="cost">保费(元)</span>
              </li>
              <li class="tr" v-for="(item,index) in RiskPlan" :key="index" v-show="item.kindCode == 'BZ'">
                <span class="project">{{item.kindName}}</span>
                <span class="cost">{{item.premium ||item.premium == 0 ? item.premium : '' }}</span>
              </li>
              <li class="tr">
                <span class="project">车船税</span>
                <span class="cost">{{tryCalculation.sumPayTax || ''}}</span>
              </li>
            </ul>
            <!-- 07000000 上海车险保费试算时，交强险增加车船税标志字段 -->
            <van-cell-group v-if="UserInfo.manageCode == '07000000'">
              <van-field v-model="vehicleVesselTax.taxRelifFlag.value.text"  label="车船税标志"  placeholder="请选择" right-icon="arrow" readonly @click="showSelectPicker(vehicleVesselTax.taxRelifFlag)"  />
              <van-field v-if="vehicleVesselTax.taxRelifFlag.value.value == 'W'" v-model="vehicleVesselTax.taxComName" label="增加开具税务机关" placeholder="请输入" @change="$store.commit('car/updateCarState', [{ name: ['vehicleVesselTax', 'taxComName'], value: vehicleVesselTax.taxComName }])" label-width="10em" />
              <van-field v-if="vehicleVesselTax.taxRelifFlag.value.value == 'W'" v-model="vehicleVesselTax.paidFreeCertificate" label="完/减免税凭证" placeholder="请输入" @change="$store.commit('car/updateCarState', [{ name: ['vehicleVesselTax', 'paidFreeCertificate'], value: vehicleVesselTax.paidFreeCertificate }])" label-width="10em" />
              <van-field v-if="vehicleVesselTax.taxRelifFlag.value.value == 'W'" v-model="vehicleVesselTax.taxDocumentDate" label="完税凭证填发日期" placeholder="请选择" readonly @click="showDataTimePicker({ url: ['vehicleVesselTax', 'taxDocumentDate'], minDate: 'min', maxDate: 0 })" label-width="10em" >
                <template #right-icon>
                  <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
                </template>
              </van-field>
              <van-field v-if="vehicleVesselTax.taxRelifFlag.value.value == 'W'" v-model="vehicleVesselTax.taxComCode" label="开具完税凭证地区代码" placeholder="请输入" @change="$store.commit('car/updateCarState', [{ name: ['vehicleVesselTax', 'taxComCode'], value: vehicleVesselTax.taxComCode }])" label-width="10em" />
            </van-cell-group>
          </div>
        </div>
      </li>

      <li class="list">
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" />
              <span class="custom-title">商业险</span>
            </template>
            <template #right-icon>
              <div class="price">
                <p class="presentPrice">￥{{tryCalculation.sumPremiumBI || 0}}</p>
                <!-- <p class="originalPrice">￥{{updataOrderNo.sumPremiumCI}}</p> -->
              </div>
              <van-switch v-model="VehicleInsurance.switchChecked1" @input="onSwitch( 'switchChecked1', VehicleInsurance.switchChecked1 )" size="26" />
            </template>
          </van-cell>
          <div v-show="VehicleInsurance.switchChecked1">
            <div class="cell">
              <span>保险生效日期</span>
              <span class="effective_date" v-if="!VehicleInsurance.bImmeValiFlag" @click="showDataTimePicker({ url: 'car/commercialInsuranceStartDate', minDate: 1, maxDate: 'max' })">
                <span v-if="commercialInsuranceStartDate">{{commercialInsuranceStartDate | datehourFilter }}时</span>
                <span v-else style="color: #999;">请选择日期</span>
                &nbsp;&nbsp;
                <van-icon name="img/carInsurance/rili@2x.png" size="20" />
              </span>
              <span class="effective_date" v-else @click="showDataTimePicker({ url: 'bImmeValidEndDate', minDate: 0, maxDate: 'max' })">
                <span v-if="VehicleInsurance.bImmeValidEndDate">{{VehicleInsurance.bImmeValidEndDate | datehourFilter}}时</span>
                <span v-else style="color: #999;">请选择日期</span>
                &nbsp;&nbsp;
                <van-icon name="img/carInsurance/rili@2x.png" size="20" />
              </span>
            </div>
            <div class="cell">
              <span></span>
              <span class="effective_date">
                <span style="color: #999;">即时起保</span>&nbsp;&nbsp;
                <van-checkbox @input="onCheckbox('bImmeValiFlag', VehicleInsurance.bImmeValiFlag, 'bImmeValidEndDate' )" v-model="VehicleInsurance.bImmeValiFlag"></van-checkbox>
              </span>
            </div>
            <!-- 02000000 山东分公司不允许调整 -->
            <div class="cell" @click="showDiscount" v-show="tryCalculation.sumPremiumBI && discountData.billELR" >
              <span>费率系数折扣调整</span>
              <span class="effective_date">
                <van-icon name="arrow" color="#666" />
              </span>
            </div>

            <ul class="SchemeSelection">
              <li :class="active==0 ? 'active' : ''" @click="SchemeSelection('active', 0)">推荐方案</li>
              <li :class="active==1 ? 'active' : ''" @click="SchemeSelection('active', 1)">保障周全方案</li>
              <li :class="active==2 ? 'active' : ''" @click="SchemeSelection('active', 2)">自定义方案</li>
            </ul>

            <ul class="table">
              <li class="tr header">
                <span class="project">保障项目</span>
                <span class="quota">保额(元)</span>
                <span class="cost">保费(元)</span>
              </li>

              <van-tabs v-model="active" animated>
                <van-tab v-for="index in 2" :key="index">
                  <div>
                    <li class="tr" v-for="(item,index) in RiskPlan" :key="index" v-show="(active == 0 && (item.plan == 'A' || item.plan == 'A|B')) || (active == 1 && (item.plan == 'B' || item.plan == 'A|B'))">
                      <!-- {{item}} -->
                      <span class="project">{{item.kindName}}</span>
                      <!-- input text -->
                      <span class="quota" v-if="item.struct && item.struct.type == 'input' || item.struct && item.struct.type == 'text'">
                        <span>{{item.struct.value}}</span>{{item.struct.unit}}
                      </span>
                      <!-- select -->
                      <span class="quota" v-if="item.struct && item.struct.type == 'select'">
                        <span v-if="item.struct.value">{{item.struct.value.text}}</span>
                        <span v-else style="color: #999">{{item.struct.holder}}</span>
                      </span>
                      <!-- inputSelect-->
                      <span class="quota" v-else-if="!item.disabled && item.struct && item.struct.type == 'inputSelect'">
                        <span v-if="item.amount || item.amount == 0">{{item.amount + item.struct.unit}}</span>
                        <span v-else style="color: #999">{{item.struct.holder}}</span>
                      </span>
                      <!-- 保费 -->
                      <span class="cost">{{item.premium ||item.premium == 0 ? item.premium : '' }}</span>
                    </li>
                  </div>
                </van-tab>
                <van-tab>
                  <div>
                    <li class="tr" v-for="(item,index) in RiskPlan" :key="index" v-show="item.kindCode != 'BZ' && !item.disabled">
                      <van-checkbox class="project" icon-size="14px" v-model="item.checked" @click="selectInsurance(item,index)">{{item.kindName}}</van-checkbox>
                      <!-- input -->
                      <span class="quota" v-if="!item.disabled && item.struct && item.struct.type == 'input'">
                        <input class="quota" type="text" :value="item.struct.value" @blur="blurQuota" @input="updataFrom($event,item,index)" oninput="this.value=this.value.replace(/\D/g,'')" :placeholder="item.struct.holder">
                        {{item.struct.unit}}
                      </span>
                      <!-- select -->
                      <span class="quota" v-else-if="!item.disabled && item.struct && item.struct.type == 'select'" @click="showInsuranceTypesPopup(item,index)">
                        <span v-if="item.struct.value">{{item.struct.value.text}}</span>
                        <span v-else style="color: #999">{{item.struct.holder}}</span>
                        <van-icon name="arrow" />
                      </span>
                      <!-- selectDisabled -->
                      <span class="quota" v-else-if="!item.disabled && item.struct && item.struct.type == 'selectDisabled'">
                        <span v-if="item.struct.value">{{item.struct.value.text}}</span>
                        <span v-else style="color: #999">{{item.struct.holder}}</span>
                      </span>
                      <!-- inputSelect-->
                      <span class="quota" v-else-if="!item.disabled && item.struct && item.struct.type == 'inputSelect'" @click="showInsuranceTypesPopup(item,index)">
                        <span v-if="item.amount || item.amount == 0">{{item.amount + item.struct.unit}}</span>
                        <span v-else style="color: #999">{{item.struct.holder}}</span>
                        <van-icon name="arrow" />
                      </span>
                      <!-- text -->
                      <span class="quota" v-else-if="item.struct && item.struct.type == 'text'">
                        <span>{{item.struct.value}}</span>
                        {{item.struct.unit}}
                      </span>
                      <span class="quota" v-else></span>
                      <!-- 保费 -->
                      <span class="cost">{{item.premium ||item.premium == 0 ? item.premium : '' }}</span>
                    </li>
                  </div>
                </van-tab>
              </van-tabs>
            </ul>
            <!-- <div class="more van-hairline--top">展开更多保障&nbsp;
              <van-icon name="arrow-down" />
            </div> -->
          </div>
        </div>
      </li>
    </ol>

    <footer class="footer_btn_bar">
      <div class="price_bar">
        <p class="price"><span>￥</span>{{((accidentInsurance.totalPrice || 0)*1 + (tryCalculation.sumPremiumCI || 0)*1 + (tryCalculation.sumPremiumBI || 0)*1 + (tryCalculation.sumPayTax || 0)*1).toFixed(2)}}</p>
        <!-- <p class="originalPrice">￥5999.23</p> -->
      </div>
      <van-button type="info" block :disabled="disabled" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="goTrial('')">试算</van-button>
      <van-button type="info" block :disabled="disabled || verifyTrial.isTrial || !verifyTrial.tryCalculation ||
      (!tryCalculation.sumPremiumCI && !tryCalculation.sumPremiumBI && !tryCalculation.sumPayTax)"
      color="linear-gradient(to right, #245cf6, #459cf8)" @click="nextStep('wxCarReplenishInfo')">下一步</van-button>
    </footer>

    <datehourPicker ref="datehourPicker" @click="updataDatetime"></datehourPicker>
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
    <insuranceTypesPopup ref="insuranceTypesPopup" @click="updataInsuranceTypesPopup"></insuranceTypesPopup>
    <VerificationCode ref="VerificationCode"></VerificationCode>
    <discount ref="discount" @click="goTrial"></discount>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import compCheck from '../../assets/js/util/comp-check';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
import datehourPicker from './temp/datehourPicker.vue';
import selectPicker from './../../templates/selectPicker.vue';
import insuranceTypesPopup from './temp/insuranceTypesPopup.vue';
import VerificationCode from './temp/VerificationCode.vue';
import accidentInsurance from './temp/accidentInsurance.vue';
import discount from './temp/discount.vue';
import MD5 from 'js-md5';
import { mapState } from 'vuex'
import glutton from '../../assets/js/util/glutton';

export default {
  components: {
    datehourPicker,
    selectPicker,
    insuranceTypesPopup,
    VerificationCode,
    discount,
    accidentInsurance
  },
  data() {
    return {
      title: this.$route.meta.title,
      disabled: false
    };
  },
  computed: {
    ...mapState({
      carInsureEntry: state => state.car.carInsureEntry,
      carOwnerDTO: state => state.car.carOwnerDTO,
      VehicleInsurance: state => state.car.VehicleInsurance,
      RiskPlan: state => state.car.insuranceTypes,
      commercialInsuranceStartDate: state => state.car.commercialInsuranceStartDate,
      compulsoryInsuranceStartDate: state => state.car.compulsoryInsuranceStartDate,
      tryCalculation: state => state.car.tryCalculation,
      carTypeDTO: state => state.car.carTypeDTO,
      carPrice: state => state.car.carPrice,
      trialParams: state => state.car.trialParams,
      VerificationCode: state => state.car.VerificationCode,
      verifyTrial: state => state.car.verifyTrial,
      carPriceRequest: state => state.car.carPriceRequest,
      carPriceTime: state => state.car.carPriceTime,
      discountData: state => state.car.discountData,
      accidentInsurance: state => state.car.accidentInsurance,
      UserInfo: state => state.my.UserInfo,
      renewNo: state => state.car.renewNo,
      vehicleVesselTax: state => state.car.vehicleVesselTax,
      vehicleType: state => state.car.vehicleType,
    }),
    active: {
      get() {
        return this.$store.state.car.VehicleInsurance.active
      },
      set(value) {
      }
    }
  },
  created() {
    glutton.startRecording(); // 回溯录制
    if (this.active != 2 && !(this.tryCalculation.sumPremiumCI + this.tryCalculation.sumPremiumBI + this.tryCalculation.sumPayTax)) {
      this.SchemeSelection();
    }

    this.$store.dispatch('car/goVerifyTrial');
  },
  methods: {
    showDataTimePicker(params) {
      this.$refs.datehourPicker.parentMsg(params);
    },
    updataDatetime(params) {
      if(Array.isArray(params.url)){
        this.$store.commit('car/updateCarState', [
          { name: params.url, value: params.datetime.substring(0,10) }
        ])
      }else{
        if (params.url == "cImmeValidEndDate") {
          this.$store.commit('car/updataVehicleInsurance', { name: "cImmeValidEndDate", value: params.datetime });
        } else if (params.url == "bImmeValidEndDate") {
          this.$store.commit('car/updataVehicleInsurance', { name: "bImmeValidEndDate", value: params.datetime });
        } else {
          this.$store.commit(params.url, params.datetime);
        }
        this.$store.dispatch('car/goVerifyTrial');
        this.setCarPrice();
      }
    },
    // 试算车价
    async setCarPrice() {
      let CarPrice = await this.$store.dispatch("car/getCarPrice", { data: this.carPriceRequest.request, url: this.carPriceRequest.url, page: "carVehicleInsurance" });
      if (CarPrice.code == 0 && CarPrice.content.result == '0') {
        this.listData = JSON.parse(CarPrice.content.data)
        this.$store.commit('car/updataCarPrice', this.listData);
        //正常流程
        this.RiskPlan.forEach((item, index) => {
          if (item.kindCode == '20A') {
            // if ((this.active == 0 || this.active == 1)) {
              item.amount = this.listData.actualValue || 1
            // } else {
            //   item.checked = false
            //   item.amount = ""
            //   if (item.struct && item.struct.value) {
            //     item.struct.value = ""
            //   }
            //   if (item.mainKindFlag != 'M') {
            //     item.disabled = true
            //   }
            // }
          }
        })
      }
      // 清除费率系数折扣调整
      this.$store.commit('car/cleanDiscountData');
    },
    selectInsurance(dataItem, index) {
      let increment = false;  // 增值服务是否可以选择
      let arr = this.RiskPlan.map((item, index) => {
        if (dataItem.additional && dataItem.additional.some(it => { return it == item.kindCode })) {
          item.disabled = dataItem.checked ? false : true;
          // item.checked = dataItem.checked;
        };
        if (item.mainKindFlag == 'M' && item.checked) {
          increment = true;
        }
        return item
      });

      for (let item of arr) {
        if (item.kindCode == "20Z1" || item.kindCode == "20Z2" || item.kindCode == "20Z3" || item.kindCode == "20Z4") {
          item.disabled = !increment;
        }
      }

      this.$store.commit('car/updataRiskPlan', arr);
      this.$store.dispatch('car/goVerifyTrial');
    },
    // 显示险种选择框
    showSelect(item, index) {
      item.index = index;
      this.$refs.selectPicker.parentMsg(item);
    },
    // 险种确定
    updataSelectPicker(params) {
      if(params.struct && params.struct.type && params.struct.type == 'selectVehicleVesselTax' ){
        this.$store.commit('car/updateCarState', [
          { name: ['vehicleVesselTax', 'taxRelifFlag', 'value'], value: params.struct.value }
        ])
      }else{
        this.RiskPlan[params.index] = params;
        // 附加法定节假日限额翻倍险 保额：同机动车第三者责任保险保额保持一致
        if (params.kindCode == "20B") {
          this.RiskPlan.forEach((item, index) => {
            if(item.kindCode == '20J'){
              this.RiskPlan[index].struct.value = this.RiskPlan[params.index].struct.value;
            }
          })
        }
        this.$store.commit('car/updataRiskPlan', this.RiskPlan);
      }
    },

    showInsuranceTypesPopup(item, index) {
      item.index = index;
      this.$refs.insuranceTypesPopup.parentMsg(item);
    },

    updataInsuranceTypesPopup(params) {
      this.RiskPlan[params.index] = params;
      // 附加法定节假日限额翻倍险 保额：同机动车第三者责任保险保额保持一致
      if (params.kindCode == "20B") {
        this.RiskPlan.forEach((item, index) => {
          if(item.kindCode == '20J'){
            this.RiskPlan[index].struct.value = this.RiskPlan[params.index].struct.value;
          }
        })
      }
      this.$store.commit('car/updataRiskPlan', this.RiskPlan);
      this.selectInsurance(params, params.index);
      this.$store.dispatch('car/goVerifyTrial');
    },
    // 更新输入框里的值
    updataFrom(e, item, index) {
      item.struct.value = e.target.value;
      item.index = index;
      this.updataSelectPicker(item);
    },

    SchemeSelection(active, value) {
      // 设置套餐
      this.$store.commit('car/updataVehicleInsurance', { active: active, value: value });

      let arr = this.RiskPlan.map((item, index) => {
        // 推荐套餐
        if (this.active == 0) {
          item.disabled = false;
          if (item.plan == 'A' || item.plan == 'A|B') {
            item.checked = true
            if (item.kindCode == '20A') {
              item.amount = this.carPrice.actualValue || 1
            }
            if (item.kindCode == '20B') {
              item.struct.value = item.struct.data[0]
            }
          } else {
            item.checked = false
          }
        } else if (this.active == 1) {
          // 保障周全方案
          item.disabled = false;
          if (item.plan == 'B' || item.plan == 'A|B') {
            item.checked = true
            if (item.kindCode == '20A') {
              item.amount = this.carPrice.actualValue || 1
            }
            if (item.kindCode == '20B' || item.kindCode == '20D3' || item.kindCode == '20D4') {
              item.struct.value = item.struct.data[5]
            }
          } else {
            item.checked = false
          }
        } else {
          item.checked = false
          item.amount = ""
          if (item.struct && item.struct.value) {
            item.struct.value = ""
          }
          if (item.mainKindFlag != 'M') {
            item.disabled = true
          }
        }
        if (item.kindCode == "20F") {
          item.struct.value = 0
        }
        item.premium = "";
        return item
      });
      this.$store.commit('car/updataRiskPlan', this.RiskPlan);
      this.$store.commit('car/updataTryCalculation', {});
      this.$store.dispatch('car/goVerifyTrial');

      if (this.active != 2) {
        // 初始化生效日期
        if( !this.commercialInsuranceStartDate ){
          this.updataDatetime({ url: 'car/commercialInsuranceStartDate', datetime: compCheck.getDateByDays(1) + ' 00:00:00' });
        }
        if( !this.compulsoryInsuranceStartDate ){
          this.updataDatetime({ url: 'car/compulsoryInsuranceStartDate', datetime: compCheck.getDateByDays(1) + ' 00:00:00' });
        }
      }

      this.$store.commit('car/updateCarState', [
        { name: ['discountData', 'expectDiscount'], value: '' }
      ])
    },

    // 试算
    async goTrial(url) {
      this.disabled = true;
      let carParams = this.$store.state.car;

      if ( this.VehicleInsurance.switchChecked && (!this.VehicleInsurance.cImmeValiFlag && !this.compulsoryInsuranceStartDate) || (this.VehicleInsurance.cImmeValiFlag && !this.VehicleInsurance.cImmeValidEndDate)) {
        this.$toast('请选择交强险与车船税保险生效日期！'); this.disabled = false;
        return;
      }
      if ( this.VehicleInsurance.switchChecked1 && (!this.VehicleInsurance.bImmeValiFlag && !this.commercialInsuranceStartDate) || (this.VehicleInsurance.bImmeValiFlag && !this.VehicleInsurance.bImmeValidEndDate)) {
        this.$toast('请选择商品险保险生效日期！'); this.disabled = false;
        return;
      }
      if (!this.VehicleInsurance.switchChecked && !this.VehicleInsurance.switchChecked1) {
        this.$toast('交强险与车船税、商业险必选一个'); this.disabled = false;
        return;
      }
      if ( this.VehicleInsurance.switchChecked1 && !this.RiskPlan.some(item => {  return item.checked == true && item.kindCode != "BZ" })) {
        this.$toast("请选择险种"); this.disabled = false;
        return;
      }

      // 车船税减免标志
      if(this.UserInfo.manageCode == '07000000'){
        if (!this.vehicleVesselTax.taxRelifFlag.value.value) {
          this.$toast('请选择车船税标志'); this.disabled = false;
          return;
        }
        if (this.vehicleVesselTax.taxRelifFlag.value.value == 'W' && !this.vehicleVesselTax.taxComName ) {
          this.$toast('请输入增加开具税务机关'); this.disabled = false;
          return;
        }
        if (this.vehicleVesselTax.taxRelifFlag.value.value == 'W' && !this.vehicleVesselTax.paidFreeCertificate ) {
          this.$toast('请输入完/减免税凭证'); this.disabled = false;
          return;
        }
        if (this.vehicleVesselTax.taxRelifFlag.value.value == 'W' && !this.vehicleVesselTax.taxDocumentDate ) {
          this.$toast('请选择完税凭证填发日期'); this.disabled = false;
          return;
        }
        if (this.vehicleVesselTax.taxRelifFlag.value.value == 'W' && !this.vehicleVesselTax.taxComCode ) {
          this.$toast('请输入开具完税凭证地区代码'); this.disabled = false;
          return;
        }
      }

      if (!this.VehicleInsurance.switchChecked && !this.VehicleInsurance.switchChecked1) {
        this.$toast('交强险与车船税、商业险必选一个'); this.disabled = false;
        return;
      }

      for (let item of this.RiskPlan) {
        item.premium = ""
        if (!item.disabled && item.checked && item.struct && !item.struct.value && item.struct.value != '0') {
          if( item.kindCode != 'BZ' && this.VehicleInsurance.switchChecked1 ){
            if (item.kindCode != "20T1" && item.kindCode != "20A") {
              this.$toast(item.struct.holder + item.kindName); this.disabled = false;
              return;
            }
            if ((item.kindCode == "20T1" && !item.amount) || (item.kindCode == "20A" && !item.amount)) {
              this.$toast(item.struct.holder + item.kindName); this.disabled = false;
              return;
            }
          }
        }
      }

      let VerifyTrialTemp = await this.$store.dispatch('car/goVerifyTrial')
      let params = VerifyTrialTemp.params
      let RiskPlan = VerifyTrialTemp.RiskPlan

      let sign = MD5(JSON.stringify(params) + 'grqazwsx').toString();
      this.$store.commit('car/updataVerifyTrial', { name: 'sign', value: sign });
      this.$store.dispatch('car/goVerifyTrial');

      // 机动车损失保险绝对免赔额字段判断
      for (let item of params.commercialInsurance.prptitemkindList) {
        if (item.kindCode == "20A" && !item.deductible && item.deductible != '0') {
          this.$toast('请选择机动车损失保险绝对免赔额'); this.disabled = false;
          return;
        }
      }

      const res = await this.$axios({
        url: `${this.$API.API_TRYCALCULATION}?sign=${sign}`,
        method: 'post',
        data: params
      });
      // 清除转保单
      this.$store.commit('car/updataVerificationCode', [
        { name: 'bicheckCode', value: "" },
        { name: 'bidemandNo', value: "" },
        { name: 'bValue', value: "" },
        { name: 'cicheckCode', value: "" },
        { name: 'cidemandNo', value: "" },
        { name: 'cValue', value: "" }
      ]);
      let signTemp = MD5(JSON.stringify((await this.$store.dispatch('car/goVerifyTrial')).params) + 'grqazwsx').toString();
      this.$store.commit('car/updataVerifyTrial', { name: 'sign', value: signTemp });
      this.$store.dispatch('car/goVerifyTrial');

      this.disabled = false;
      this.$store.commit('car/updataVerifyTrial', { name: 'tryCalculation', value: res.code == 0 && res.content.result == 0 ? true : false });
      if (res.code == 0 && res.content.result == 0) {
        let data = eval('(' + res.content.data + ')');
        // 上海地区
        // if( this.UserInfo.manageCode == '07000000' ){
        if(data.ciPrptenages){
          data.ciPrptenages = data.ciPrptenages.filter(item => {
              return item.clauses
            })
          }
        if(data.biPrptenages){
          data.biPrptenages = data.biPrptenages.filter(item => {
            return item.clauses
          })
        }
        // }else{
        //   // 非上海地区
        //   let dataList = '';
        //   //过滤返回的交强险固定特约
        //   if(data.ciPrptenages){
        //     for(let i in data.ciPrptenages){
        //       if(data.ciPrptenages[i].clauseCode == "T0080"){
        //         dataList = data.ciPrptenages[i]
        //       }
        //     }
        //     if(dataList){
        //       data.ciPrptenages = [dataList]
        //     }
        //   }
        //   //过滤返回的商业险固定特约(商业险固定特约为空)
        //   if(data.biPrptenages){
        //     data.biPrptenages = []
        //   }
        // }
        if (data.bireCoverMsg) {
          glutton.stopRecording(); // 回溯录制
          this.$dialog.alert({
            message: data.bireCoverMsg,
            theme: 'round-button',
            cancelButtonColor: 'linear-gradient(to right, rgb(36, 92, 246)',
            confirmButtonColor: '#0252ff'
          }).then(() => {
            glutton.startRecording(); // 回溯录制
            this.goTrialSuccess(data, RiskPlan, params, url)
          });
        } else {
          this.goTrialSuccess(data, RiskPlan, params, url)
        }
        this.goCollectLog();
      } else {
        let data = '';
        if(res.content.data){
          data = JSON.parse(res.content.data)
        }
        if (data && data.bicheckCode || data && data.cicheckCode) {
          // 转保单
          this.$store.commit('car/updataVerificationCode', [
            { name: 'bicheckCode', value: data.bicheckCode },
            { name: 'bidemandNo', value: data.bidemandNo },
            { name: 'cicheckCode', value: data.cicheckCode },
            { name: 'cidemandNo', value: data.cidemandNo }
          ]);
          this.$refs.VerificationCode.parentMsg();
        } else {
          glutton.stopRecording(); // 回溯录制
          this.$dialog.alert({
            message: res.content.resultMessage || '请求失败',
            theme: 'round-button',
            cancelButtonColor: 'linear-gradient(to right, rgb(36, 92, 246)',
            confirmButtonColor: '#0252ff'
          }).then(() => {
            glutton.startRecording(); // 回溯录制
            if (res.content.resultMessage && (res.content.resultMessage.indexOf("录入的校验码有误") != -1 || res.content.resultMessage.indexOf("投保查询校验信息") != -1 || res.content.resultMessage.indexOf("投保询价信息不存在") != -1)) {
              this.goTrial();
            }
          })
        }
      }
    },
    goTrialSuccess(data, RiskPlan, params, url) {
      this.$store.commit('car/updataTryCalculation', data);

      for (let item of data.itemVOList) {
        // 添加价格
        RiskPlan.forEach((element, index) => {
          if (item.kindCode == element.kindCode) {
            element.index = index;
            element.premium = item.premium;
            this.updataSelectPicker(element);
          }
        })
        // 保存试算请求数据
        params.commercialInsurance.prpTmain.premium = data.sumPremiumBI;
        params.commercialInsurance.prptitemkindList.forEach((element, index) => {
          if (item.kindCode == element.kindCode) {
            element.premium = item.premium;
            element.benchMarkPremium = item.benchMarkPremium;
            element.basePremium = item.basePremium;
            element.noTaxPremium = item.noTaxPremium;
          }
        })
        params.compulsoryInsurance.prpTmain.premium = data.sumPremiumCI + data.sumPayTax;
        params.compulsoryInsurance.prptitemkindList.forEach((element, index) => {
          if (item.kindCode == element.kindCode) {
            element.premium = item.premium;
            element.benchMarkPremium = item.benchMarkPremium;
            element.basePremium = item.basePremium;
            element.noTaxPremium = item.noTaxPremium;
          }
        })
      }
      this.$store.commit('car/updataTrialParams', params);

      if(this.VehicleInsurance.switchChecked1){
        this.$store.commit('car/updateCarState', [
          { name: ['discountData', 'selfAdjustRate'], value: data.selfAdjustRate || '' }, // 自主定价系数
          { name: ['discountData', 'selfAdjustRateFirst'], value: this.discountData.selfAdjustRateFirst ? this.discountData.selfAdjustRateFirst : data.selfAdjustRate }, // 自主定价系数（第1次）
          { name: ['discountData', 'sumLowerRate'], value: data.sumLowerRate || '' }, // 最低折扣
          { name: ['discountData', 'sumTopRate'], value: data.sumTopRate || '' }, // 最低折扣
          { name: ['discountData', 'billELR'], value: data.autoPriceOutputXOMRespVo.billELR || '' }, // 签单折扣预期赔付率
          { name: ['discountData', 'billcomeGroup'], value: data.birate && data.birate.billcomeGroup ? data.birate.billcomeGroup : '' }, // 业务分组 商业险业务分组
          { name: ['discountData', 'noclaimRate'], value: data.noclaimRate || 0 }, // 无忧赔款系数
          { name: ['discountData', 'biClaimTimes'], value: data.biClaimTimes || 0 }, // 商业险出险次数
        ])
      }else{
        this.$store.commit('car/updateCarState', [
          { name: ['discountData', 'billELR'], value: data.autoPriceOutputXOMRespVo.billELR || '' }, // 签单折扣预期赔付率
          { name: ['discountData', 'billcomeGroup'], value: data.cirate && data.cirate.billcomeGroup ? data.cirate.billcomeGroup : '' }, // 业务分组 商业险业务分组
          { name: ['discountData', 'ciClaimTimes'], value: data.ciClaimTimes || 0 }, // 交强险出险次数
        ])
      }

      // 佣金、福利券
      this.$store.dispatch('car/tryCalCommission', {
        data:{
          agentCode: localStorage.agentCode,
          orderNo: this.$store.state.car.orderNo,
          premiumInfoList: [
            { premium: this.tryCalculation.sumPremiumCI + this.tryCalculation.sumPayTax, riskMark: "0801", taxActual: this.tryCalculation.sumPayTax },
            { premium: this.tryCalculation.sumPremiumBI, riskMark: "0802" }
          ]
        },
        userInfoData:{
          OrgCode:this.UserInfo.OrgCode || '',
          agentType:this.UserInfo.agentType,
          sign:true,//用来区分是否分享车险出单
        }

      });
      if (url) {
        this.goPage(url);
      }
    },
    // 试算埋点
    goCollectLog() {
      if(this.$store.state.renewedInsurance.car.renewalDetail.policyNo){
        this.$store.dispatch('common/goCollectLog', {
          data: {
            eventId: "igr002",
            eventName: '保费试算',
            puid: this.$store.state.renewedInsurance.car.renewalDetail.policyNo,
          },
          eventAttributes: {
            sumPremium: ((this.accidentInsurance.totalPrice || 0)*1 + (this.tryCalculation.sumPremiumCI || 0)*1 + (this.tryCalculation.sumPremiumBI || 0)*1 + (this.tryCalculation.sumPayTax || 0)*1).toFixed(2) || 0,
            callStartTime: compCheck.transformDatesTimetamp() || '',
            frameNo: this.$store.state.car.vehicleDTO.frameNo
          }
        });
      }
    },
    onSwitch(name, value) {
      this.$store.commit('car/updataVehicleInsurance', { name, value });
      this.$store.dispatch('car/goVerifyTrial');
      this.setCarPrice();
    },
    onCheckbox(name, value, type) {
      this.$store.commit('car/updataVehicleInsurance', { name, value });

      if (value && type == 'cImmeValidEndDate' && !this.VehicleInsurance.cImmeValidEndDate) {
        this.showDataTimePicker({ url: 'cImmeValidEndDate', minDate: 0, maxDate: 'max' })
      }
      if (value && type == 'bImmeValidEndDate' && !this.VehicleInsurance.bImmeValidEndDate) {
        this.showDataTimePicker({ url: 'bImmeValidEndDate', minDate: 0, maxDate: 'max' })
      }
      this.$store.dispatch('car/goVerifyTrial');
      this.setCarPrice();
    },
    blurQuota() {
      this.$store.dispatch('car/goVerifyTrial');
    },
    async nextStep(url) {
      await this.$store.dispatch('car/goVerifyTrial')
      if (this.verifyTrial.isTrial) {
        this.$toast('页面有修改，请先选择试算');
      } else {
        this.goPage(url);
      }
    },
    showDiscount() {
      this.$refs.discount.parentMsg();
    },
    showSelectPicker(params) {
      this.$refs.selectPicker.parentMsg({ struct: { ...params, type: 'selectVehicleVesselTax' } });
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
.carBaseInfo {
  .van-nav-bar {
    background: #0252ff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
</style>
