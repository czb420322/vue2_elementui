<template>
  <div class="carBaseInfo">
    <authCodeCar></authCodeCar>
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <!-- <v-header :title="{ name: title }"></v-header> -->
        <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon v-if="leftFalg" name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <ol class="content" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <li class="list">
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/ic_info_men@2x.png'" size="22px" /> -->
              <van-icon name="records" size="22px"/>

              <span class="custom-title">投保人信息</span>
            </template>
            <template #right-icon>
              <div class="price">
                <p class="placeholder">同车主信息</p>
              </div>
              <van-checkbox size="26" :value="applyInfoDTO.checkedOwner" @input="updataFrom($event, 'car/updataApplyInfoDTO', 'checkedOwner' )"></van-checkbox>
            </template>
          </van-cell>
          <van-field v-if="this.vehicleType == '1' || this.vehicleType == '2'" label="客户性质" placeholder="请选择客户性质" :value="applyInfoDTO.insuredNature.value.text" @click="applyInfoDTO.checkedOwner ? '' : showInsuredNature(['applyInfoDTO', 'insuredNature', 'value'], applyInfoDTO.insuredNature)" :class="applyInfoDTO.checkedOwner ? 'readonly_cell': ''" :readonly="true" right-icon="arrow" />
          <template v-if="applyInfoDTO.insuredNature.value.value == 3">
            <van-field :value="applyInfoDTO.name" @change="asyncFrom(insureInfoDTO.checkedApplyInfo)" @input="updataFrom($event, 'car/updataApplyInfoDTO', 'name' )" :class="applyInfoDTO.checkedOwner ? 'readonly_cell': ''" :readonly="applyInfoDTO.checkedOwner" label="姓名" placeholder="请输入姓名">
              <template #right-icon>
                <idNoScan v-if="!applyInfoDTO.checkedOwner && applyInfoDTO.insuredNature.value.value == 3" slot="button" :params="{ code: 'idNo' }" @change="idNoInfoEvent( $event, 'car/updataApplyInfoDTO' )"></idNoScan>
              </template>
            </van-field>
            <van-field
              :value="applyInfoDTO.idNo"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'idNo' )"
              :class="applyInfoDTO.checkedOwner ? 'readonly_cell': ''"
              :readonly="applyInfoDTO.checkedOwner"
              maxlength="18"
              label="身份证号码"
              placeholder="请输入身份证号码"
            />
            <ValidityIDcard
              commitUrl="car/updataIdNoDate"
              :startUrl="['applyInfoDTO','idNoStartDate']"
              :endUrl="['applyInfoDTO','idNoEndDate']"
              :startDate="applyInfoDTO.idNoStartDate"
              :readonly="applyInfoDTO.checkedOwner"
              :endDate="applyInfoDTO.idNoEndDate"
            ></ValidityIDcard>
            <van-field
              :value="applyInfoDTO.mobile"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'mobile' )"
              maxlength="11"
              oninput="value=value.replace(/[^\d]/g,'')"
              label="手机号码"
              placeholder="请输入手机号码"
            />
            <van-field
              :value="applyInfoDTO.detailed_address"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'detailed_address' )"
              label="地址"
              placeholder="请输入地址"
            />
          </template>
          <template v-else>
            <van-field
              :value="applyInfoDTO.name"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'name' )"
              :class="applyInfoDTO.checkedOwner ? 'readonly_cell': ''"
              :readonly="applyInfoDTO.checkedOwner"
              label="投保人"
              placeholder="请输入投保人"
            />
            <van-field
              :value="applyInfoDTO.idNo"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'idNo' )"
              :class="applyInfoDTO.checkedOwner ? 'readonly_cell': ''"
              :readonly="applyInfoDTO.checkedOwner"
              maxlength="18"
              label="证件号码"
              placeholder="请输入证件号码"
            />
            <van-field
              :value="applyInfoDTO.detailed_address"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'detailed_address' )"
              label="联系地址"
              placeholder="请输入联系地址"
            />
            <van-field
              :value="applyInfoDTO.appliLinkerName"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'appliLinkerName' )"
              label="联系人姓名"
              placeholder="请输入联系人姓名"
            />
            <van-field
              :value="applyInfoDTO.mobile"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'mobile' )"
              maxlength="11"
              oninput="value=value.replace(/[^\d]/g,'')"
              label="联系人手机"
              placeholder="请输入联系人手机"
            />
            <van-field
              v-if="UserInfo.manageCode == '07000000'"
              :value="applyInfoDTO.appliLinkmanIdnum"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataApplyInfoDTO', 'appliLinkmanIdnum' )"
              maxlength="18"
              label="联系人身份证号码"
              placeholder="请输入联系人身份证号码"
            />
          </template>
          
          <van-field v-if="UserInfo.manageCode == '07000000'" class="phoneHolderItem" :value="applyInfoDTO.phoneHolderName" @change="asyncFrom(insureInfoDTO.checkedApplyInfo)" @input="updataFrom($event, 'car/updataApplyInfoDTO', 'phoneHolderName' )" label="手机持有人姓名" placeholder="请输入姓名">
            <template #right-icon>
              <idNoScan slot="button" :params="{ code: 'idNo' }" @change="phoneHolderIdNoInfoEvent($event, 'applyInfoDTO')"></idNoScan>
            </template>
          </van-field>
          <van-field v-if="UserInfo.manageCode == '07000000'" class="phoneHolderItem" :value="applyInfoDTO.phoneHolderIdentifyNumber" @change="asyncFrom(insureInfoDTO.checkedApplyInfo)" @input="updataFrom($event, 'car/updataApplyInfoDTO', 'phoneHolderIdentifyNumber' )" maxlength="18" label="手机持有人身份证" placeholder="请输入身份证号码" />
          <br>
        </div>
      </li>

      <li class="list">
        <div class="info-box">
          <van-cell center class="title_cell many_checkbox">
            <template #title>
              <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/ic_info_men@2x.png'" size="22px" /> -->
              <van-icon name="records" size="22px"/>

              <span class="custom-title">被保人信息</span>
            </template>
            <template #right-icon>
              <ul class="many_checkbox_box">
                <li class="row">
                  <div class="price">
                    <p class="placeholder">同车主信息</p>
                  </div>
                  <van-checkbox size="26" :value="insureInfoDTO.checkedOwner" @input="updataFrom($event, 'car/updataInsureInfoDTO', 'checkedOwner' )"></van-checkbox>
                </li>
                <li class="row">
                  <div class="price">
                    <p class="placeholder">同投保险人</p>
                  </div>
                  <van-checkbox size="26" :value="insureInfoDTO.checkedApplyInfo" @input="updataFrom($event, 'car/updataInsureInfoDTO', 'checkedApplyInfo' )"></van-checkbox>
                </li>
              </ul>
            </template>
          </van-cell>
          <van-field v-if="this.vehicleType == '1' || this.vehicleType == '2'" label="客户性质" placeholder="请选择客户性质" :value="insureInfoDTO.insuredNature.value.text" @click="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo ? '' : showInsuredNature(['insureInfoDTO', 'insuredNature', 'value'], insureInfoDTO.insuredNature)" :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo ? 'readonly_cell': ''" :readonly="true" right-icon="arrow" />
          <template v-if="insureInfoDTO.insuredNature.value.value == 3">
            <van-field :value="insureInfoDTO.name" @input="updataFrom($event, 'car/updataInsureInfoDTO', 'name' )" :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo ? 'readonly_cell': ''" :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo" label="姓名" placeholder="请输入姓名">
              <template #right-icon>
                <carIdNoScan slot="button" v-if=" !insureInfoDTO.checkedOwner && !insureInfoDTO.checkedApplyInfo && insureInfoDTO.insuredNature.value.value == 3" :params="{ code: 'idNo' }" @change="idNoInfoEvent( $event,'car/updataInsureInfoDTO' )"></carIdNoScan>
              </template>
            </van-field>
            <van-field :value="insureInfoDTO.idNo" @input="updataFrom($event, 'car/updataInsureInfoDTO', 'idNo' )" :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''" :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo" label="身份证号码" maxlength="18" placeholder="请输入身份证号码" />
            
            <ValidityIDcard commitUrl="car/updataIdNoDate" :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo" :startUrl="['insureInfoDTO','idNoStartDate']" :endUrl="['insureInfoDTO','idNoEndDate']" :startDate='insureInfoDTO.idNoStartDate' :endDate='insureInfoDTO.idNoEndDate'></ValidityIDcard>
            <van-field :value="insureInfoDTO.mobile" @input="updataFrom($event, 'car/updataInsureInfoDTO', 'mobile' )" :class="insureInfoDTO.checkedApplyInfo ? 'readonly_cell': ''" :readonly="insureInfoDTO.checkedApplyInfo" label="手机号码" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入手机号码" />
            <van-field :value="insureInfoDTO.detailed_address" @input="updataFrom($event, 'car/updataInsureInfoDTO', 'detailed_address' )" :class="insureInfoDTO.checkedApplyInfo ? 'readonly_cell': ''" :readonly="insureInfoDTO.checkedApplyInfo" label="地址" placeholder="请输入地址" />
          </template>
          <template v-else>
            <van-field
              :value="insureInfoDTO.name"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataInsureInfoDTO', 'name' )"
              :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''"
              :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo"
              label="被保人"
              placeholder="请输入被保人"
            />
            <van-field
              :value="insureInfoDTO.idNo"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataInsureInfoDTO', 'idNo' )"
              :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''"
              :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo"
              maxlength="18"
              label="证件号码"
              placeholder="请输入证件号码"
            />
            <van-field
              :value="insureInfoDTO.detailed_address"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataInsureInfoDTO', 'detailed_address' )"
              :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''"
              :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo"
              label="联系地址"
              placeholder="请输入联系地址"
            />
            <van-field
              :value="insureInfoDTO.insuredLinkerName"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataInsureInfoDTO', 'insuredLinkerName' )"
              :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''"
              :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo"
              label="联系人姓名"
              placeholder="请输入联系人姓名"
            />
            <van-field
              :value="insureInfoDTO.mobile"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataInsureInfoDTO', 'mobile' )"
              :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''"
              :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo"
              maxlength="11"
              oninput="value=value.replace(/[^\d]/g,'')"
              label="联系人手机"
              placeholder="请输入联系人手机"
            />
            <van-field
              v-if="UserInfo.manageCode == '07000000'"
              :value="insureInfoDTO.insuredLinkmanIdnum"
              @change="asyncFrom(insureInfoDTO.checkedApplyInfo)"
              @input="updataFrom($event, 'car/updataInsureInfoDTO', 'insuredLinkmanIdnum' )"
              :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''"
              :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo"
              maxlength="18"
              label="联系人身份证号码"
              placeholder="请输入联系人身份证号码"
            />
          </template>
          <van-field
            v-if="UserInfo.manageCode == '07000000'"
            class="phoneHolderItem"
            :value="insureInfoDTO.phoneHolderName"
            @input="updataFrom($event, 'car/updataInsureInfoDTO', 'phoneHolderName' )"
            :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''"
            :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo"
            label="手机持有人姓名"
            placeholder="请输入姓名"
          >
            <template #right-icon>
              <idNoScan slot="button" :params="{ code: 'idNo' }" @change="phoneHolderIdNoInfoEvent($event, 'insureInfoDTO')"></idNoScan>
            </template>
          </van-field>
          <van-field v-if="UserInfo.manageCode == '07000000'" class="phoneHolderItem" :value="insureInfoDTO.phoneHolderIdentifyNumber" @input="updataFrom($event, 'car/updataInsureInfoDTO', 'phoneHolderIdentifyNumber' )" maxlength="18" :class="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo? 'readonly_cell': ''" :readonly="insureInfoDTO.checkedOwner || insureInfoDTO.checkedApplyInfo" label="手机持有人身份证" placeholder="请输入身份证号码" />
          <br>
        </div>
      </li>

      <li class="list" v-show="VehicleInsurance.switchChecked">
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/ic_info_other@2x.png'" size="22px" /> -->
              <van-icon name="records" size="22px"/>
              <span class="custom-title">交强险特约</span>
            </template>
            <template #right-icon>
              <van-icon name="add-o" color="#1989fa" size="24" @click="addInsurance('c')" />
            </template>
          </van-cell>
          <van-cell v-for="(item, index) in tryCalculation.ciPrptenages" :title="item.clauses" :key="index" @click="dialogConfirm(item)" />
          <van-cell v-for="(item, index) in ciPrptenagesDTOList" :key="index" v-show="item.clauseCode == 'T0076' ? (item.checkbox && VehicleInsurance.cImmeValiFlag) : item.checkbox " @click="goChecked(index, 'c')">
            <template #icon>
              <van-checkbox v-model="item.checked" style="padding-right: .6rem;" />
              <span @click.stop="toggle(item)">{{item.clauses}}</span>
            </template>
          </van-cell>
          <br>
        </div>
      </li>

      <li class="list" v-show="VehicleInsurance.switchChecked1">
        <div class="info-box">
          <van-cell center class="title_cell">
            <template #title>
              <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/ic_info_other@2x.png'" size="22px" /> -->
              <van-icon name="records" size="22px"/>
              <span class="custom-title">商业险特约</span>
            </template>
            <template #right-icon>
              <van-icon name="add-o" color="#1989fa" size="24" @click="addInsurance('b')" />
            </template>
          </van-cell>
          <van-cell v-for="(item, index) in tryCalculation.biPrptenages" :title="item.clauses" :key="index" @click="dialogConfirm(item)" />
          <van-cell v-for="(item, index) in biPrptenagesDTOList" :key="index" v-show="item.clauseCode == 'T0076' ? (item.checkbox && VehicleInsurance.bImmeValiFlag) : item.checkbox " @click="goChecked(index, 'b')">
            <template #icon>
              <van-checkbox v-model="item.checked" style="padding-right: .6rem;" />
              <span @click.stop="toggle(item)">{{item.clauses}}</span>
            </template>
          </van-cell>
          <br>
        </div>
      </li>

      <li class="list">
        <div class="info-box" style="padding: 5px 0;">
          <van-cell center class="title_cell">
            <template #title>
              <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/payment_method_icon.png'" size="22px" /> -->
              <van-icon name="balance-o" size="22px"/>
              <span class="custom-title">支付方式</span>
            </template>
          </van-cell>
          <van-cell v-for="item in paymentMethodList" :key="item.value" @click="paymentMethodValue = item.value">
            <template #icon>
              <van-checkbox :value="paymentMethodValue == item.value ? true : false" style="padding-right: .6rem;" />
              <span>{{item.text}}</span>
            </template>
          </van-cell>
        </div>
      </li>
    </ol>

    <footer class="footer_btn_bar">
      <div class="price_bar">
        <p class="price"><span>￥</span>{{((accidentInsurance.totalPrice || 0)*1 + (tryCalculation.sumPremiumCI || 0)*1 + (tryCalculation.sumPremiumBI || 0)*1 + (tryCalculation.sumPayTax || 0)*1).toFixed(2)}}</p>
      </div>
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="disabled" @click="onSubmit">下一步</van-button>
    </footer>
    <areaPicker ref="areaPicker" @click="areaConfirm"></areaPicker>

    <van-popup class="special_popup" v-model="show" :style="{ height: '70%' }">
      <h4 class="name">银行贷款车辆特约</h4>
      <div class="special_box">
        <van-field v-model="message" rows="14" label="" type="textarea" placeholder="请输入" />
      </div>
      <van-button class="special_bt" round type="info" size="small" @click="confirm()">确定</van-button>
    </van-popup>

    <!-- 选择 -->
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
import idNoScan from '../../templates/idNoScan.vue';
import carIdNoScan from './temp/carIdNoScan.vue';
import areaPicker from '../../templates/areaPicker';
import compCheck from '../../assets/js/util/comp-check';
import { mapState } from 'vuex'
import glutton from '../../assets/js/util/glutton';
import selectPicker from './../../templates/selectPicker.vue';
import authCodeCar from "./temp/authCodeCar.vue"
import ValidityIDcard from './temp/ValidityIDcard.vue';
export default {
  components: {
    idNoScan,
    carIdNoScan,
    areaPicker,
    selectPicker,
    authCodeCar,
    ValidityIDcard
  },
  data() {
    return {
      title: this.$route.meta.title,
      areaConfirmObj: '',
      disabled: false,
      show: false,
      message: '',
      item: '',
      leftFalg: true
    };
  },
  computed: {
    ...mapState({
      ciPrptenagesDTOList: state => state.car.ciPrptenagesDTOList,
      biPrptenagesDTOList: state => state.car.biPrptenagesDTOList,
      applyInfoDTO: state => state.car.applyInfoDTO,
      insureInfoDTO: state => state.car.insureInfoDTO,
      tryCalculation: state => state.car.tryCalculation,
      trialParams: state => state.car.trialParams,
      active: state => state.car.VehicleInsurance.active,
      carOwnerDTO: state => state.car.carOwnerDTO,
      VehicleInsurance: state => state.car.VehicleInsurance,
      accidentInsurance: state => state.car.accidentInsurance,
      paymentMethodList: state => state.car.paymentMethod.list,
      vehicleType: state => state.car.vehicleType,
      UserInfo: state => state.my.UserInfo
    }),
    paymentMethodValue: {
      get() {
        return this.$store.state.car.paymentMethod.value
      },
      set(value) {
        this.$store.commit('car/updateCarState', [{ name: ['paymentMethod', 'value'], value: value }])
      }
    }
  },
  created() {
    glutton.startRecording(); // 回溯录制
    if (this.ciPrptenagesDTOList.length || this.biPrptenagesDTOList.length) {
      this.$store.commit('car/updataPrptenagesDTOList', {
        ciPrptenagesDTOList: this.ciPrptenagesDTOList,
        biPrptenagesDTOList: this.biPrptenagesDTOList
      });
    }
  },
  methods: {
    addInsurance(type) {
      this.goPage(`specialSelection?type=${type}`);
    },
    dialogConfirm(item) {
      glutton.stopRecording(); // 回溯录制
      this.item = item
      // console.log(item)
      //处理交强险特约
      if (item.clauseCode == "T00692") {//"银行贷款车辆特约"
        this.message = item.clausesContext
        this.show = true
        return
      }
      var that_value;
      //交强险
      //特殊处理车主特约(提交时需要带上保险人名称和行驶证名称)
      if (item.clauseCode == "T0028" && item.riskCode == "0801") {
        for (let index = 0; index < this.ciPrptenagesDTOList.length; index++) {
          if (item.clauseCode == this.ciPrptenagesDTOList[index].clauseCode) {
            let data = item.clausesContext.split('_')
            this.ciPrptenagesDTOList[index].inputField = data[0] + this.insureInfoDTO.name + data[1] + this.carOwnerDTO.carOwner + data[2]
            that_value = this.ciPrptenagesDTOList[index].inputField
          }

        }
      } else if (item.clauseCode == "T0028" && item.riskCode == "0802") { //商业险特约
        for (let index = 0; index < this.biPrptenagesDTOList.length; index++) {
          if (item.clauseCode == this.biPrptenagesDTOList[index].clauseCode) {
            let data = item.clausesContext.split('_')
            this.biPrptenagesDTOList[index].inputField = data[0] + this.insureInfoDTO.name + data[1] + this.carOwnerDTO.carOwner + data[2]
            that_value = this.biPrptenagesDTOList[index].inputField
          }

        }
      } else if (item.clauseCode == "T0076" && item.riskCode == "0801") {  //特殊处理及时生效特约(提交时需要带上投保时间和结束时间)
        for (let index = 0; index < this.ciPrptenagesDTOList.length; index++) {
          if (item.clauseCode == this.ciPrptenagesDTOList[index].clauseCode) {
            let data = item.clausesContext.split('_')
            this.ciPrptenagesDTOList[index].inputField = data[0] + this.VehicleInsurance.cImmeValidEndDate + data[1] + compCheck.transformDatesTimetamp(this.VehicleInsurance.cImmeValidEndDate, 1)
            that_value = this.ciPrptenagesDTOList[index].inputField
          }

        }
      } else if (item.clauseCode == "T0076" && item.riskCode == "0802") {  //特殊处理及时生效特约(提交时需要带上投保时间和结束时间)
        for (let index = 0; index < this.biPrptenagesDTOList.length; index++) {
          if (item.clauseCode == this.biPrptenagesDTOList[index].clauseCode) {
            let data = item.clausesContext.split('_')
            this.biPrptenagesDTOList[index].inputField = data[0] + this.VehicleInsurance.cImmeValidEndDate + data[1] + compCheck.transformDatesTimetamp(this.VehicleInsurance.cImmeValidEndDate, 1)
            that_value = this.biPrptenagesDTOList[index].inputField
          }

        }
      } else {
        that_value = item.clausesContext
      }
      if (item.inputDataValue != '' && item.inputDataValue != undefined) {
        setTimeout(function () {
          let inputDataValue = item.inputDataValue.split('_')
          for (let i = 0; i < inputDataValue.length; i++) {
            if (inputDataValue[i] == '&&**&&') {//值为空的标记
              document.getElementsByName("carBaseInfoInput")[i].value = ''
            } else {
              document.getElementsByName("carBaseInfoInput")[i].value = inputDataValue[i]
            }
          }
        }, 500);
      } else {
        //处理input框初始值记忆问题，清空初始记忆值
        setTimeout(function () {
          if (document.getElementsByName("carBaseInfoInput").length > 0) {
            let inputData = document.getElementsByName("carBaseInfoInput")
            for (let a = 0; a < inputData.length; a++) {
              document.getElementsByName("carBaseInfoInput")[a].value = ''
            }
          }
        }, 500);
      }
      this.$dialog.alert({
        title: item.clauses,
        message: that_value,
        theme: 'round-button',
        cancelButtonColor: 'linear-gradient(to right, rgb(36, 92, 246)',
        confirmButtonColor: '#0252ff',
        messageAlign: 'left',
        className: 'carBaseInfo_alert'
      }).then(() => {
        glutton.startRecording(); // 回溯录制
        this.handleSpecial()
      });
    },

    //银行贷款车辆特约T00692专用
    confirm() {
      this.show = false
      this.handleSpecial()
    },
    //处理特约方法
    handleSpecial() {
      var item = this.item
      var dataSplit = item.clausesContext.split("<input class='carBaseInfo_input' name='carBaseInfoInput'  placeholder='请输入' type='text'>")

      var a = ''
      var context = ''
      let inputTxt = document.getElementsByName("carBaseInfoInput")
      for (let i = 0; i < inputTxt.length; i++) {
        if (dataSplit.length > 1) {
          a += dataSplit[i] + inputTxt[i].value + dataSplit[dataSplit.length - 1]
          context += dataSplit[i] + `<input class='carBaseInfo_input' name='carBaseInfoInput'  placeholder='请输入' type='text' ` + `value='${inputTxt[i].value}'>`
        } else {
          context += dataSplit[i]
        }

      }
      //交强险特约
      if (item.riskCode == '0801') {
        for (let index = 0; index < this.ciPrptenagesDTOList.length; index++) {
          if (item.clauseCode == this.ciPrptenagesDTOList[index].clauseCode) {
            if (item.clauseCode == "T00692") {
              //"银行贷款车辆特约"
              this.ciPrptenagesDTOList[c].inputField = this.message
              this.ciPrptenagesDTOList[c].context = context
            } else if (item.clauseCode == "T9999" && !a) { //特殊处理 其他特约（只做清空处理）
              this.ciPrptenagesDTOList[index].context = ''
              this.ciPrptenagesDTOList[index].inputField = ''
              this.ciPrptenagesDTOList[index].inputDataValue = ''
            } else if (a != '') {
              this.ciPrptenagesDTOList[index].inputField = a
              this.ciPrptenagesDTOList[index].context = context
              let jie = ''
              if (inputTxt.length > 0) {
                for (let i = 0; i < inputTxt.length; i++) {
                  if (inputTxt[i].value == '') {//如果值为空做个标记
                    jie += '&&**&&'
                  }
                  jie += inputTxt[i].value + '_'
                }
                jie = jie.substr(0, jie.length - 1);
                this.ciPrptenagesDTOList[index].inputDataValue = jie
              }

            }

          }
        }
        this.$store.commit('car/updataPrptenagesDTOList', {
          ciPrptenagesDTOList: this.ciPrptenagesDTOList,
          biPrptenagesDTOList: this.biPrptenagesDTOList
        });
      }
      //商业险特约
      if (item.riskCode == '0802') {
        for (let c in this.biPrptenagesDTOList) {
          if (item.clauseCode == this.biPrptenagesDTOList[c].clauseCode) {
            if (item.clauseCode == "T00692") {//"银行贷款车辆特约"
              this.biPrptenagesDTOList[c].inputField = this.message
              this.biPrptenagesDTOList[c].context = context
            } else if (item.clauseCode == "T9999" && !a) { //特殊处理 其他特约（只做清空处理）
              this.biPrptenagesDTOList[c].context = ''
              this.biPrptenagesDTOList[c].inputField = ''
              this.biPrptenagesDTOList[c].inputDataValue = ''
            } else if (a != '') {
              this.biPrptenagesDTOList[c].inputField = a
              this.biPrptenagesDTOList[c].context = context
              let jie = ''
              if (inputTxt.length > 0) {
                for (let i = 0; i < inputTxt.length; i++) {
                  if (inputTxt[i].value == '') {//如果值为空做个标记
                    jie += '&&**&&'
                  }
                  jie += inputTxt[i].value + '_'
                }
                jie = jie.substr(0, jie.length - 1);
                this.biPrptenagesDTOList[c].inputDataValue = jie
              }
            }

          }
        }
        this.$store.commit('car/updataPrptenagesDTOList', {
          ciPrptenagesDTOList: this.ciPrptenagesDTOList,
          biPrptenagesDTOList: this.biPrptenagesDTOList
        });
      }
    },
    toggle(item) {
      this.dialogConfirm(item)
    },
    goChecked(index, type) {
      this.$store.commit('car/togglePrptenagesDTOList', { index: index, type: type, name: 'checked' });
    },
    // 更新页面填入的数据
    updataFrom(value, name, type) {
      if (value && name == 'car/updataApplyInfoDTO' && type == 'checkedOwner') {
        this.updataSelectPicker({
          name: ['applyInfoDTO', 'insuredNature', 'value'],
          struct: {
            value: this.applyInfoDTO.insuredNature.data[0],
            data: this.applyInfoDTO.insuredNature.data
          }
        })
      } else if (value && name == 'car/updataInsureInfoDTO' && type == 'checkedOwner') {      
        this.updataSelectPicker({
          name: ['insureInfoDTO', 'insuredNature', 'value'],
          struct: {
            value: this.insureInfoDTO.insuredNature.data[0],
            data: this.insureInfoDTO.insuredNature.data
          }
        })
      }
      if(value && name == 'car/updataInsureInfoDTO' && type =='checkedApplyInfo'){
        this.$store.commit("car/updataIdNoDate", [
        { name: ['insureInfoDTO','idNoStartDate'], value: this.applyInfoDTO.idNoStartDate }
      ])
       this.$store.commit("car/updataIdNoDate", [
        { name: ['insureInfoDTO','idNoEndDate'], value: this.applyInfoDTO.idNoEndDate }
      ])
        this.insureInfoDTO.idNoStartDate=this.applyInfoDTO.idNoStartDate
        this.insureInfoDTO.idNoEndDate=this.applyInfoDTO.idNoEndDate
      }
      if(value && name == 'car/updataApplyInfoDTO'  && type =='checkedOwner'){
         this.$store.commit("car/updateCarState", [
         { name: ['applyInfoDTO','idNoStartDate'], value: this.carOwnerDTO.idNoStartDate }
       ])
        this.$store.commit("car/updateCarState", [
         { name: ['applyInfoDTO','idNoEndDate'], value: this.carOwnerDTO.idNoEndDate }
       ])
        this.applyInfoDTO.idNoStartDate=this.carOwnerDTO.carOwnerIDStartDate
        this.applyInfoDTO.idNoEndDate=this.carOwnerDTO.carOwnerIDEndDate
      }
      if(value && name=='car/updataInsureInfoDTO' && type =='checkedOwner'){
         this.$store.commit("car/updateCarState", [
         { name: ['insureInfoDTO','idNoStartDate'], value: this.carOwnerDTO.idNoStartDate }
       ])
        this.$store.commit("car/updateCarState", [
         { name: ['insureInfoDTO','idNoEndDate'], value: this.carOwnerDTO.idNoEndDate }
       ])
        this.insureInfoDTO.idNoStartDate=this.carOwnerDTO.carOwnerIDStartDate
        this.insureInfoDTO.idNoEndDate=this.carOwnerDTO.carOwnerIDEndDate
      }
      this.$store.commit(name, { "value": value, "type": type });
    },
    // 身份信息识别
    idNoInfoEvent(obj, name) {
      this.updataFrom(obj.idNo, name, 'idNo');
      this.updataFrom(obj.name, name, 'name');
      this.updataFrom(obj.address, name, 'detailed_address');
    },
    // 身份信息识别
    phoneHolderIdNoInfoEvent(obj, type) {
      if (type == 'applyInfoDTO') {
        this.$store.commit('car/updateCarState', [
          { name: ['applyInfoDTO', 'phoneHolderName'], value: obj.name },
          { name: ['applyInfoDTO', 'phoneHolderIdentifyNumber'], value: obj.idNo }
        ])
      } else {
        this.$store.commit('car/updateCarState', [
          { name: ['insureInfoDTO', 'phoneHolderName'], value: obj.name },
          { name: ['insureInfoDTO', 'phoneHolderIdentifyNumber'], value: obj.idNo }
        ])
      }
      this.asyncFrom(this.insureInfoDTO.checkedApplyInfo)
    },
    // 显示投保地区选择
    showAreaPicker(name, county) {
      this.areaConfirmObj = name;
      this.$refs.areaPicker.parentMsg(3, county);
    },
    areaConfirm(value) {
      this.updataFrom(value[0].code, this.areaConfirmObj, 'province');
      this.updataFrom(value[1].code, this.areaConfirmObj, 'city');
      this.updataFrom(value[2].code, this.areaConfirmObj, 'county');
      this.updataFrom(value[0].name + value[1].name + value[2].name, this.areaConfirmObj, 'address');
      this.asyncFrom(this.insureInfoDTO.checkedApplyInfo);
    },

    // 下一步
    async onSubmit() {
      this.disabled = true;
      // 投保人——自然人
      if (this.applyInfoDTO.insuredNature.value.value == 3) {
        if (!compCheck.isName(this.applyInfoDTO.name, '投保人姓名格式不正确')) {
          this.disabled = false;
          return;
        }
        if (!compCheck.isIdno(this.applyInfoDTO.idNo, '投保人身份证号码格式不正确')) {
          this.disabled = false;
          return;
        }
        if (!this.applyInfoDTO.idNoStartDate) {
          this.$toast('请选择投保人证件有效起期'); 
          this.disabled = false;
          return;
        }
         if (!this.applyInfoDTO.idNoEndDate) {
          this.$toast('请选择投保人证件有效止期'); 
          this.disabled = false;
          return;
        }
        if (!compCheck.isMobile(this.applyInfoDTO.mobile, '投保人手机号码格式不正确')) {
          this.disabled = false;
          return;
        }
        if (!this.applyInfoDTO.detailed_address) {
          this.$toast('请输入投保人地址');
          this.disabled = false;
          return;
        }

      } else {
        // 投保人——法人
        if (!this.applyInfoDTO.name) {
          this.$toast("请输入投保人");
          this.disabled = false;
          return;
        }
        if (!this.applyInfoDTO.idNo) {
          this.$toast("请输入投保人证件号码");
          this.disabled = false;
          return;
        }
        if(this.applyInfoDTO.idNo.length === 9){
          if(!compCheck.organization(this.applyInfoDTO.idNo)){
            this.disabled = false;
            return;
          }
        }
        if(this.applyInfoDTO.idNo.length === 18){
          if(!compCheck.creditCode(this.applyInfoDTO.idNo)){
            this.disabled = false;
            return;
          }
        }
        if (!this.applyInfoDTO.detailed_address) {
          this.$toast("请输入投保人联系地址");
          this.disabled = false;
          return;
        }
        if (
          !compCheck.isName(
            this.applyInfoDTO.appliLinkerName,
            "投保人联系人姓名格式不正确"
          )
        ) {
          this.disabled = false;
          return;
        }
        if (
          !compCheck.isMobile(
            this.applyInfoDTO.mobile,
            "投保人联系人手机号码格式不正确"
          )
        ) {
          this.disabled = false;
          return;
        }
        if (this.UserInfo.manageCode == "07000000") {
          if (
            !compCheck.isIdno(
              this.applyInfoDTO.appliLinkmanIdnum,
              "投保人联系人身份证号码格式不正确"
            )
          ) {
            this.disabled = false;
            return;
          }
        }
      }
      if (
        this.applyInfoDTO.phoneHolderName &&
        !compCheck.isName(
          this.applyInfoDTO.phoneHolderName,
          "投保人手机持有人姓名格式不正确"
        )
      ) {
        this.disabled = false;
        return;
      }
      if (this.applyInfoDTO.phoneHolderIdentifyNumber && !compCheck.isIdno(this.applyInfoDTO.phoneHolderIdentifyNumber, '投保人手机持有人身份证号码格式不正确')) {
        this.disabled = false;
        return;
      }
      // 被保人——自然人
      if (this.insureInfoDTO.insuredNature.value.value == 3) {
        if (!compCheck.isName(this.insureInfoDTO.name, '被保人姓名格式不正确')) {
          this.disabled = false;
          return;
        }
        if (!compCheck.isIdno(this.insureInfoDTO.idNo, '被保人身份证号码格式不正确')) {
          this.disabled = false;
          return;
        }
        if (!this.insureInfoDTO.idNoStartDate) {
          this.$toast('请选择被保人证件有效起期'); 
          this.disabled = false;
          return;
        }
         if (!this.insureInfoDTO.idNoEndDate) {
          this.$toast('请选择被保人证件有效止期'); 
          this.disabled = false;
          return;
        }
        if (!compCheck.isMobile(this.insureInfoDTO.mobile, '被保人手机号码格式不正确')) {
          this.disabled = false;
          return;
        }
        if (!this.insureInfoDTO.detailed_address) {
          this.$toast('请输入被保人地址');
          this.disabled = false;
          return;
        }

      } else {
        // 被保人——法人
        if (!this.insureInfoDTO.name) {
          this.$toast("请输入保人");
          this.disabled = false;
          return;
        }
        if (!this.insureInfoDTO.idNo) {
          this.$toast("请输入被保人证件号码");
          this.disabled = false;
          return;
        }
        if(this.insureInfoDTO.idNo.length === 9){
          if(!compCheck.organization(this.insureInfoDTO.idNo)){
            this.disabled = false;
            return;
          }
        }
        if(this.insureInfoDTO.idNo.length === 18){
          if(!compCheck.creditCode(this.insureInfoDTO.idNo)){
            this.disabled = false;
            return;
          }
        }
        if (!this.insureInfoDTO.detailed_address) {
          this.$toast("请输入被保人联系地址");
          this.disabled = false;
          return;
        }
        if (
          !compCheck.isName(
            this.insureInfoDTO.insuredLinkerName,
            "被保人联系人姓名格式不正确"
          )
        ) {
          this.disabled = false;
          return;
        }
        if (
          !compCheck.isMobile(
            this.insureInfoDTO.mobile,
            "被保人联系人手机号码格式不正确"
          )
        ) {
          this.disabled = false;
          return;
        }
        if (this.UserInfo.manageCode == "07000000") {
          if (
            !compCheck.isIdno(
              this.insureInfoDTO.insuredLinkmanIdnum,
              "被保人联系人身份证号码格式不正确"
            )
          ) {
            this.disabled = false;
            return;
          }
        }
      }
      if (
        this.insureInfoDTO.phoneHolderName &&
        !compCheck.isName(
          this.insureInfoDTO.phoneHolderName,
          "被保人手机持有人姓名格式不正确"
        )
      ) {
        this.disabled = false;
        return;
      }
      if (this.insureInfoDTO.phoneHolderIdentifyNumber && !compCheck.isIdno(this.insureInfoDTO.phoneHolderIdentifyNumber, '被保人手机持有人身份证号码格式不正确')) {
        this.disabled = false;
        return;
      }

      let params = {
        uuid: this.tryCalculation.uuid,
        orderNo: this.$store.state.car.orderNo,
        agentCode: localStorage.agentCode,
        actualValue: this.tryCalculation.actualValue,
        taxActual: this.tryCalculation.sumPayTax,
        payType: this.paymentMethodValue,
        // A("A","推荐套餐"), B("B","保障周全方案"), C("C","自定义方案");
        productCode: this.active == 0 ? 'A' : this.active == 1 ? 'B' : this.active == 2 ? 'C' : '',
        applyInfoDTO: {
          name: this.applyInfoDTO.name,
          idType: this.applyInfoDTO.idType,
          idNo: this.applyInfoDTO.idNo,
          cls: this.applyInfoDTO.cls,
          // province: this.applyInfoDTO.province, // 省
          // city: this.applyInfoDTO.city, // 市
          // county: this.applyInfoDTO.county, // 区
          address: this.applyInfoDTO.detailed_address, // 地址
          mobile: this.applyInfoDTO.mobile,
          iDValidStartDate:this.applyInfoDTO.idNoStartDate,
          iDValidEndDate:this.applyInfoDTO.idNoEndDate,
          iDValidDateLongFlag:this.applyInfoDTO.idNoEndDate=='2999-12-31' ? '1' : '0',
        },
        insureInfoDTO: {
          name: this.insureInfoDTO.name,
          idType: this.insureInfoDTO.idType,
          idNo: this.insureInfoDTO.idNo,
          cls: this.insureInfoDTO.cls,
          // province: this.insureInfoDTO.province, // 省
          // city: this.insureInfoDTO.city, // 市
          // county: this.insureInfoDTO.county, // 区
          address: this.insureInfoDTO.detailed_address, // 地址
          mobile: this.insureInfoDTO.mobile,
          iDValidStartDate:this.insureInfoDTO.idNoStartDate,
          iDValidEndDate:this.insureInfoDTO.idNoEndDate,
          iDValidDateLongFlag:this.insureInfoDTO.idNoEndDate =='2999-12-31' ? '1' : '0',
        },
        biPrptenagesDTOList: this.biPrptenagesDTOList.filter(item => { return (item.checkbox && item.checked) }).map(item => {
          if (item.clauseCode == 'T0028') {//特殊处理车主约定
            let data = item.clausesContext.split('_')
            item.inputField = data[0] + this.insureInfoDTO.name + data[1] + this.carOwnerDTO.carOwner + data[2]
          }
          if (item.clauseCode != 'T0076' || this.VehicleInsurance.bImmeValiFlag) {
            if (item.clauseCode == 'T9999') { //处理 其他特约 不输入直接点确定问题
              return {
                riskCode: item.riskCode,
                inputDataValue: item.inputDataValue,
                inputField: item.inputField,
                serialNo: item.serialNo,
                clauseCode: item.clauseCode,
                clauses: item.clauses,
                clausesContext: item.clausesContext,
                flag: item.flag,
                select: item.select,
                context: item.inputField ? item.inputField : '',
              }
            } else {
              return {
                riskCode: item.riskCode,
                inputDataValue: item.inputDataValue,
                inputField: item.inputField,
                serialNo: item.serialNo,
                clauseCode: item.clauseCode,
                clauses: item.clauses,
                clausesContext: item.clausesContext,
                flag: item.flag,
                select: item.select,
                context: item.inputField ? item.inputField : item.clausesContext,
              }
            }

          }
        }),
        ciPrptenagesDTOList: this.ciPrptenagesDTOList.filter(item => { return (item.checkbox && item.checked) }).map(item => {
          if (item.clauseCode == 'T0028') {//特殊处理车主约定
            let data = item.clausesContext.split('_')
            item.inputField = data[0] + this.insureInfoDTO.name + data[1] + this.carOwnerDTO.carOwner + data[2]
          }
          if (item.clauseCode != 'T0076' || this.VehicleInsurance.cImmeValiFlag) {
            if (item.clauseCode == 'T9999') { //处理 其他特约 不输入直接点确定问题
              return {
                riskCode: item.riskCode,
                inputDataValue: item.inputDataValue,
                inputField: item.inputField,
                serialNo: item.serialNo,
                clauseCode: item.clauseCode,
                clauses: item.clauses,
                clausesContext: item.clausesContext,
                flag: item.flag,
                select: item.select,
                context: item.inputField ? item.inputField : '',
              }
            } else {
              return {
                riskCode: item.riskCode,
                inputDataValue: item.inputDataValue,
                inputField: item.inputField,
                serialNo: item.serialNo,
                clauseCode: item.clauseCode,
                clauses: item.clauses,
                clausesContext: item.clausesContext,
                flag: item.flag,
                select: item.select,
                context: item.inputField ? item.inputField : item.clausesContext,
              }
            }

          }

        }),
        // commercialInsurance: {
        //   prpTmain: this.trialParams.commercialInsurance.prpTmain,
        //   prptitemkindList: this.trialParams.commercialInsurance.prptitemkindList,
        // },
        // compulsoryInsurance: {
        //   prpTmain: this.trialParams.compulsoryInsurance.prpTmain,
        //   prptitemkindList: this.trialParams.compulsoryInsurance.prptitemkindList,
        // }
      }
      // 添加试算返回特约
      if (this.tryCalculation.biPrptenages) {
        for (let item of this.tryCalculation.biPrptenages) {
          params.biPrptenagesDTOList.push({
            serialNo: item.serialNo,
            clauseCode: item.clauseCode,
            clauses: item.clauses,
            clausesContext: item.clausesContext,
            context: item.clausesContext,
            flag: item.flag,
            type: 'trial',
            select: item.select || true
          })
        }
      }
      if (this.tryCalculation.ciPrptenages) {
        for (let item of this.tryCalculation.ciPrptenages) {
          params.ciPrptenagesDTOList.push({
            serialNo: item.serialNo,
            clauseCode: item.clauseCode,
            clauses: item.clauses,
            clausesContext: item.clausesContext,
            context: item.clausesContext,
            flag: item.flag,
            type: 'trial',
            select: item.select || true
          })
        }
      }
      // 上海机构添加手机持有人信息
      if (this.UserInfo.manageCode == '07000000') {
        params.applyInfoDTO.phoneHolderName = this.applyInfoDTO.phoneHolderName || ''
        params.applyInfoDTO.phoneHolderIdentifyNumber = this.applyInfoDTO.phoneHolderIdentifyNumber || ''
        params.insureInfoDTO.phoneHolderName = this.insureInfoDTO.phoneHolderName || ''
        params.insureInfoDTO.phoneHolderIdentifyNumber = this.insureInfoDTO.phoneHolderIdentifyNumber || ''
      }
      // 货车
      if (this.vehicleType == "1" || this.vehicleType == "2") {
        params.applyInfoDTO.cls = this.applyInfoDTO.insuredNature.value.value;
        params.applyInfoDTO.appliLinkerName = this.applyInfoDTO.appliLinkerName;
        params.applyInfoDTO.appliLinkmanIdnum = this.applyInfoDTO.appliLinkmanIdnum;
        params.insureInfoDTO.cls = this.insureInfoDTO.insuredNature.value.value;
        params.insureInfoDTO.insuredLinkerName = this.insureInfoDTO.insuredLinkerName;
        params.insureInfoDTO.insuredLinkmanIdnum = this.insureInfoDTO.insuredLinkmanIdnum;
        if (this.applyInfoDTO.insuredNature.value.value == "4") {
          params.applyInfoDTO.idType = this.applyInfoDTO.idNo.length == 9 ? "12" : "74";
        }
        if (this.insureInfoDTO.insuredNature.value.value == "4") {
          params.insureInfoDTO.idType = this.insureInfoDTO.idNo.length == 9 ? "12" : "74";
        }
      }

      // 回溯传参
      window.GluttonContext.policyHolderName = this.applyInfoDTO.name || '' // 投保人姓名
      window.GluttonContext.policyHolderIdNo = this.applyInfoDTO.idNo || '' // 投保人证件号码
      window.GluttonContext.policyHolderMobile = this.applyInfoDTO.mobile || '' // 投保人手机号
      window.GluttonContext.orderNo = this.$store.state.car.orderNo || '' // 订单号
      const res = await this.$axios({
        url: this.$API.API_SAVEPROPOSAL,
        method: 'post',
        data: params
      });

      this.disabled = false;
      if (res.code == 0 && res.content.result == 0) {
        // 保单号保存
        let subProposalNo = {}
        for (let item of res.content.policyDTOList) {
          if (item.riskMark == '0802') {
            subProposalNo.b = item.proposalNo
          } else if (item.riskMark == '0801') {
            subProposalNo.c = item.proposalNo
          }
        }
        this.$store.commit("car/updateCarState",[
          { name: ['applyInfoDTO','idType'], value: res.content.applyInfoDTO.idType}
        ])
        this.$store.commit("car/updateCarState",[
          { name: ['insureInfoDTO','idType'], value: res.content.insureInfoDTO.idType}
        ])
        this.$store.commit("car/updataSubProposalNo", subProposalNo);
        this.$store.commit("car/updateCarState", [
          { name: ["saveProposal"], value: res.content.policyDTOList },
          { name: ["policyNo", "payOrderNo"], value: res.content.payOrderNo }
        ]);
        if (this.$route.query.agentCode) {
          this.$router.replace({
            path: "/carConfirmInfo?agentCode=" + this.$route.query.agentCode
          });
        } else {
          this.goPage('carConfirmInfo');
        }
      } else {
        glutton.stopRecording(); // 回溯录制
        this.$dialog.alert({
          message: res.content.resultMessage || '请求失败',
          theme: 'round-button',
          cancelButtonColor: 'linear-gradient(to right, rgb(36, 92, 246)',
          confirmButtonColor: '#0252ff'
        }).then(() => {
          glutton.startRecording(); // 回溯录制
          if(this.$route.query.agentCode == 'S0900103'){
            this.$toast("流程结束请退出")
            this.leftFalg = false
            localStorage.clear();
            sessionStorage.clear();
          }
        });
      }
    },
    asyncFrom(value) {
      console.log(value,'123qqq')
      this.updataFrom(value, 'car/updataInsureInfoDTO', 'checkedApplyInfo');
    },
    showInsuredNature(name, data) {
      this.$refs.selectPicker.parentMsg({ struct: data, name });
    },
    updataSelectPicker(params) {
      this.$store.commit('car/updateCarState', [{ name: params.name, value: params.struct.value }]);
      if (params.name.length == 3 && (params.name[0] == 'applyInfoDTO' || params.name[0] == 'insureInfoDTO')) {
        this.$store.commit('car/updateCarState', [
          { name: [params.name[0], 'name'], value: '' },
          { name: [params.name[0], 'idNo'], value: '' },
          { name: [params.name[0], 'mobile'], value: '' },
          { name: [params.name[0], 'address'], value: '' },
          { name: [params.name[0], 'detailed_address'], value: '' },
          { name: [params.name[0], 'phoneHolderName'], value: '' },
          { name: [params.name[0], 'phoneHolderIdentifyNumber'], value: '' },
          { name: [params.name[0], 'appliLinkmanIdnum'], value: '' },
          { name: [params.name[0], 'appliLinkerName'], value: '' },
          { name: [params.name[0], 'phoneHolderIdentifyNumber'], value: '' },
          { name: [params.name[0], 'insuredLinkmanIdnum'], value: '' },
          { name: [params.name[0], 'insuredLinkerName'], value: '' },
        ])
      }
    }
  }
};
</script>

<style lang="less" >
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
#app.iosSystem .carBaseInfo .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .carBaseInfo .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;

}
.carBaseInfo {
  .van-nav-bar {
  background: white;

  }

}
.carBaseInfo_alert {
  .van-dialog__header {
    margin: 0 10px;
  }
  .van-dialog__message {
    max-height: 46vh;
  }
}
.carBaseInfo_input {
  padding: 0.45rem 0;
  border: none;
  border-bottom: 1px solid #999999;
}
.phoneHolderItem {
  .van-cell__title {
    width: 8em;
  }
}
</style>
