<template>
  <div class="carBaseInfo">
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <van-icon name="wap-nav" color="#fff" size="20" @click="onShow()" />
      </template>
    </van-nav-bar>
    <!-- <v-header :title="{ name: title }"></v-header> -->
    <ol class="content" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <li class="list" v-if="carBanner" style="height: 25.848vw; background: white; border-radius: 8px; overflow: hidden;">
        <img class="banner" style="margin: auto" id="vhtml" :src="carBanner" alt="">
      </li>
      <li class="list" v-else>
        <img class="banner" :src="$CTXBASE + '/img/carInsurance/banner@2x.png'" alt="">
      </li>
      <li class="list">
        <div class="info-box">
          <van-cell center class="cell_title">
            <template #title>
              <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" />
              <span class="custom-title">车辆信息</span>
            </template>
            <template #right-icon>
              <span style="opacity: .5;">行驶证上传</span>
              <carInfoScan :params="{ code: 'licenseNo' }" @change="carInfoEvent( $event )"></carInfoScan>
            </template>
          </van-cell>
          <van-field v-if="decisionUnitValue" class="readonly_cell" type="textarea" rows="1" autosize :value="decisionUnitValue" label="决策单元" readonly />
          <van-field label="车牌号码">
            <template #input>
              <div v-if="!isLicenseNo" class="car_area" @click="showCarArea"><span v-if="!licenseName" style="opacity: .5;">简</span>{{licenseName}}&nbsp;
                <van-icon size="19" :name="$CTXBASE + '/img/carInsurance/xiala@2x.png'" />
              </div>
              <van-field v-if="!isLicenseNo" v-model="licenseNoValue" @input="updateLicenseNo" maxlength="7" :border="false" placeholder="请输入" style="padding: 0;" />
            </template>
            <template #button>
              <div style="display: flex; align-items: center;">
                未上牌&nbsp;
                <van-switch :value="isLicenseNo" @input="updateIsLicenseNo" center size="24" inactive-color="#e5e5e5" />
              </div>
            </template>
          </van-field>
          <!-- 货车 -->
          <template v-if="vehicleType == '1'">
            <van-field :value="useNatureCode.value.text" @click="showSelectPicker(useNatureCode)" readonly label="使用性质" placeholder="请选择使用性质" right-icon="arrow" />
            <van-field :value="carKindCode.value.text" @click="showSelectPicker(carKindCode)" readonly label="车辆种类" placeholder="请选择车辆种类" right-icon="arrow" />
          </template>
          <!-- 上海显示号牌种类、深圳显示号牌种类 -->
          <van-field v-if="UserInfo.manageCode == '07000000' || UserInfo.manageCode == '09000000' || this.vehicleType == '1'" :value="licensePlateType.struct.value.text" readonly label="号牌种类" placeholder="请选择" @click="showLicensePlateType">
            <template #right-icon>
              <span style="color: #1989fa" @click.stop="queryVehicle" v-if="UserInfo.manageCode == '07000000' || UserInfo.manageCode == '09000000'">查询车辆</span>
              <van-icon name="arrow" v-else />
            </template>
          </van-field>
          <van-field type="textarea" rows="1" autosize v-model="frameNo" @input="updataFrom($event, 'car/updateFrameNo')" @blur="renewInsuranceSet" maxlength="17" label="车架号" placeholder="请输入车架号">
            <template #right-icon>
              <span style="color: #1989fa" @click="renewInsurance">续保查询</span>
            </template>
          </van-field>
          <van-field v-model="engineNo" @input="updataFrom($event, 'car/updateEngineNo')" label="发动机号" placeholder="请输入发动机号">
            <template #right-icon>
              <span style="color: #1989fa" @click="getCarVIN">进口车查询</span>
            </template>
          </van-field>
          <van-field :value="carTypeDTO.codeName" label="品牌型号" placeholder="请选择品牌型号" right-icon="arrow" readonly @click="goPage('carSelect')" />
          <van-field v-model="clausesContent" label="打印厂牌型号" placeholder="请输入打印厂牌型号" />

          <!-- 货车 -->
          <van-field v-model="carTypeDTO.seatCount" @input="updataFrom($event, 'car/updataSeatCount')" maxlength="2" type="digit" :label="vehicleType == '1' ? '核定载客数' : '座位数'" :placeholder="vehicleType == '1' ? '请输入核定载客数' : '请输入座位数'" />
          <template v-if="vehicleType == '1'">
            <van-field :value="carTypeDTO.tonCount" @input="updateCarState(['carTypeDTO', 'tonCount'], $event)" label="核定载质量" placeholder="请输入核定载质量" />
            <van-field :value="vehicleCategory.value.text" @click="showSelectPicker(vehicleCategory)" readonly label="车辆类型" placeholder="请选择车辆类型" right-icon="arrow" />
            <van-field :value="licenseCategory.value.text" @click="showSelectPicker(licenseCategory)" readonly label="车辆类型描述" placeholder="请选择车辆类型描述" right-icon="arrow" />
            <van-field :value="licenseColor.value.text" @click="showSelectPicker(licenseColor)" readonly label="号牌颜色" placeholder="请选择号牌颜色" right-icon="arrow" />
          </template>

          <van-field :value="vehicleDTO.purchaseDate" readonly @click="showDataTimePicker({ url: 'car/updataDatetime', minDate: 'min', maxDate: 0 })" label="发证日期" placeholder="请选择发证日期">
            <template #right-icon>
              <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
            </template>
          </van-field>
          <van-field :value="vehicleDTO.enrollDate" readonly @click="showDataTimePicker({ url: 'car/updataEnrollDate', minDate: 'min', maxDate: 0 })" label="注册日期" placeholder="请选择注册日期">
            <template #right-icon>
              <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
            </template>
          </van-field>
          <!-- 上海机构是新车该字段必填 否则隐藏-->
          <van-field v-if="UserInfo.manageCode == '07000000' && isLicenseNo" :value="vehicleDTO.businessDate" readonly @click="showDataTimePicker({ url: 'car/updataBusinessDate', minDate: 'min', maxDate: 0 })" label="购车发票日期" placeholder="请选择购车发票日期">
            <template #right-icon>
              <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
            </template>
          </van-field>
          <van-field v-if="isLicenseNo && UserInfo.manageCode == '08000000'" :value="vehicleDTO.saleCompany" @input="updateCarState(['vehicleDTO', 'saleCompany'], $event)" label="新车销售公司名称" placeholder="请输入新车销售公司名称" />
          <van-field v-if="isLicenseNo && UserInfo.manageCode == '08000000'" :value="vehicleDTO.saleAreaCode.value.text" label="新车销售公司所在地" placeholder="请选择" right-icon="arrow" readonly @click="showSelectPicker()" />
          <van-field v-if="isLicenseNo && UserInfo.manageCode == '08000000'" name="switch" label="是否4s销售" input-align="right">
            <template #input>
              <van-switch v-model="sale4SFlag" center size="24" inactive-color="#e5e5e5" />
            </template>
          </van-field>
          <van-field v-if="UserInfo.manageCode == '15000000' || UserInfo.manageCode == '11000000'" label="行驶证地址" placeholder="请选择地址" :value="carInsureEntry.address && carInsureEntry.address.length == 3? carInsureEntry.address[0].name + carInsureEntry.address[1].name + carInsureEntry.address[2].name : ''" @click='showAreaPicker' readonly is-link />
          <van-field name="switch" label="一年内过户车" input-align="right">
            <template #input>
              <van-switch :value="transferFlag" @input="updateTransferFlag" center size="24" inactive-color="#e5e5e5" />
            </template>
          </van-field>
          <van-field v-show="transferFlag" :value="transferDate" label="过户日期" readonly @click="showDatetimePicker({ url: 'car/updataTransferDate', minDate: 'min', maxDate: 0 })" placeholder="请选择过户日期" />
          <br>
        </div>
      </li>

      <li class="list">
        <div class="info-box">
          <van-cell center class="cell_title">
            <template #title>
              <van-icon :name="$CTXBASE + '/img/carInsurance/info_man@2x.png'" size="22px" />
              <span class="custom-title">车主信息</span>
            </template>
            <template #right-icon>
              <span style="opacity: .5;">身份证识别</span>
              <idNoScan :params="{ code: 'idNo' }" @change="idNoInfoEvent( $event )"></idNoScan>
            </template>
          </van-cell>
          <van-field v-if="vehicleType == '1'" :value="carOwnerDTO.carOwnerNature.value.text" @click="showSelectPicker(carOwnerDTO.carOwnerNature)" readonly label="车主性质" placeholder="请选择车主性质" right-icon="arrow" />
          <van-field v-model="carOwner" @input="updataFrom($event, 'car/updateCarOwner')" :label="carOwnerDTO.carOwnerNature.value.value == 1 ? '机关名称' :carOwnerDTO.carOwnerNature.value.value == 2 ? '企业名称' : '姓名'" placeholder="请输入" />
          <van-field v-model="carOwnerIdNo" @input="updataFrom($event, 'car/updateCarOwnerIdNo')" maxlength="18" label="证件号码" placeholder="请输入" />
          <br>
        </div>
      </li>

      <li class="list">
        <div class="info-box">
          <van-cell center class="cell_title">
            <template #title>
              <span class="custom-title">产品备案号</span>
            </template>
            <template #right-icon>
              <van-switch v-model="productRecord.checked" size="26" @input="updateCarState( ['productRecord', 'checked'], productRecord.checked )" />
            </template>
          </van-cell>
          <div style="margin: .8rem 0; line-height: 1.5em;" v-if="productRecord.checked">
            <template v-for="(item, index) in productRecord.list">
              <p style="text-align: center;font-size: 13px;" :key="index">{{item.name}}</p>
              <p style="text-align: center;font-size: 13px;" :key="index + 1000">{{item.code}}</p>
            </template>
          </div>
        </div>
      </li>

      <li class="list">
        <p class="tips" v-if="!renewInsuranceQuery.checked && !transferFlag">{{renewInsuranceQuery.tips}}</p>
        <br v-else>
        <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="disabled || (!renewInsuranceQuery.checked && !transferFlag)" @click="onsubmit">下一步</van-button>
      </li>
      <div style="margin-top: 1rem" v-if="UserInfo.agentType == 2 || UserInfo.agentType == 3 || UserInfo.agentType == 4">
        <companyTxt />
      </div>
    </ol>

    <carArea ref="carArea" @click="carAreaConfirm"></carArea>
    <datetimePicker ref="datetimePicker" @click="updataDatetime"></datetimePicker>
    <!-- 品牌型号 -->
    <van-popup v-model="showBaselnfo" closeable round position="bottom" :style="{ height: '100vw' }">
      <h4 class="showBaselnfo">请选择</h4>
      <div class="showBaselnfo_box">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell v-for="(item,index) in list" :key="index" :title="item.codeName +' 价格¥'+item.purchasePrice + ' 座位数:'+item.seatCount" clickable @click="onSelect(index)">
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- 车型 -->
    <van-popup v-model="motorcycleShow" closeable round position="bottom" :style="{ height: '100vw' }">
      <h4 class="showBaselnfo">请选择</h4>
      <div class="showBaselnfo_box">
        <van-radio-group v-model="motorcycleRadio">
          <van-cell-group>
            <van-cell v-for="(item,index) in list2" :key="index" :title="item.modelName +'  价格¥'+item.actualValue" clickable @click="onMotorcycle(index)">
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- 验车码 -->
    <van-overlay class="Code_checking_car" :show="show" @click="show = false" :style="{ 'top': ($iosSystem + 46) + 'px' }">
      <div class="wrapper" @click.stop="onShow()">
        <p>验车码</p>
        <p>{{checkCarCode}}</p>
      </div>
    </van-overlay>
    <!-- 选择 -->
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
    <!-- 省市区 -->
    <areaPicker ref="areaPicker" @click="areaConfirm"></areaPicker>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
import idNoScan from './../../templates/idNoScan.vue';
import carInfoScan from './../../templates/carInfoScan.vue';
import datetimePicker from './../../templates/datetimePicker.vue';
import CodeInfo from '../../assets/json/CodeInfo'
import compCheck from '../../assets/js/util/comp-check';
import validator from '@/assets/js/util/validator';
import carArea from '../../templates/carArea';
import { mapState } from 'vuex'
import glutton from '../../assets/js/util/glutton';
import selectPicker from './../../templates/selectPicker.vue';
import areaPicker from '../../templates/areaPicker';
import PinchZoom from 'pinch-zoom-js'
import companyTxt from './../../templates/companyTxt.vue';

export default {
  components: {
    idNoScan,
    carInfoScan,
    datetimePicker,
    carArea,
    selectPicker,
    areaPicker,
    companyTxt
  },
  data() {
    return {
      title: this.$route.meta.title,
      disabled: false,
      showBaselnfo: false,
      motorcycleShow: false,
      motorcycleRadio: '',
      list: [],
      list2: [],
      radio: '',
      listData: '',
      frameNo: "", // 车架号
      engineNo: "",  // 发动机号
      carOwner: "", // 车主姓名
      carOwnerIdNo: "", // 车主证件号码
      licenseNoValue: '',
      show: false,
      checkCarCode: '',//验车码
      codeCode: '',
      codeName: '',
      unitmainTenanceTypeOne: '',
      unitmainTenanceTypeOneName: '',
      unitmainTenanceTypeTwo: '',
      unitmainTenanceTypeTwoName: '',
    };
  },
  computed: {
    ...mapState({
      orderNo: state => state.car.orderNo,
      vehicleDTO: state => state.car.vehicleDTO,
      carOwnerDTO: state => state.car.carOwnerDTO,
      carTypeDTO: state => state.car.carTypeDTO,
      commercialInsuranceStartDate: state => state.car.commercialInsuranceStartDate,
      compulsoryInsuranceStartDate: state => state.car.compulsoryInsuranceStartDate,
      VehicleInsurance: state => state.car.VehicleInsurance,
      carInsureEntry: state => state.car.carInsureEntry,
      licenseNo: state => state.car.carInsureEntry.licenseNo,
      isLicenseNo: state => state.car.carInsureEntry.isLicenseNo,
      licenseName: state => state.car.carInsureEntry.licenseName,
      transferFlag: state => state.car.carInsureEntry.transferFlag == 1 ? true : false,
      transferDate: state => state.car.carInsureEntry.transferDate,
      UserInfo: state => state.my.UserInfo,
      saveProposal: state => state.car.saveProposal,
      licensePlateType: state => state.car.licensePlateType,
      RiskPlan: state => state.car.insuranceTypes,
      carPrice: state => state.car.carPrice,
      renewInsuranceQuery: state => state.car.renewInsuranceQuery,
      decisionUnitValue: state => state.my.decisionUnitValue,
      productRecord: state => state.car.productRecord,
      useNatureCode: state => state.car.useNatureCode,
      carKindCode: state => state.car.carKindCode,
      vehicleCategory: state => state.car.vehicleCategory,
      licenseCategory: state => state.car.licenseCategory,
      licenseColor: state => state.car.licenseColor,
      vehicleType: state => state.car.vehicleType,
    }),
    clausesContent: {
      get() {
        return this.$store.state.car.carTypeDTO.clausesContent
      },
      set(value) {
        this.$store.commit('car/updateCarState', [{ name: ['carTypeDTO', 'clausesContent'], value }]);
      }
    },
    // 是否4s销售
    sale4SFlag: {
      get() {
        return this.$store.state.car.vehicleDTO.sale4SFlag
      },
      set(value) {
        this.$store.commit('car/updateCarState', [{ name: ['vehicleDTO', 'sale4SFlag'], value }]);
      }
    },
    // banner图片
    carBanner: {
      get() {
        return this.$store.state.car.carBanner
      },
      set(value) {
        this.$store.commit('car/updateCarState', [{ name: ['carBanner'], value }]);
      }
    }
  },

  created() {
    this.$store.commit('car/updateCarState', [
      { name: ['vehicleType'], value: this.$route.query.vehicleType == '02' ? '1' : '0' }
    ])
    // 处理号牌种类默认值
    if (!this.orderNo && this.vehicleType == '1') {
      this.$store.commit('car/updateCarState', [
        { name: ['licensePlateType', 'struct', 'value'], value: [...this.licensePlateType.struct.data, ...this.licensePlateType.struct.shangHaiData].filter(item => { return item.value == '01' })[0]}
      ])
    }

    glutton.startRecording();  // 回溯录制

    //路径带过来带的决策单元相关(分享车险转录用到)
    this.codeCode = this.$route.query.codeCode || '';
    this.codeName = this.$route.query.codeName || '';
    this.unitmainTenanceTypeOne = this.$route.query.unitmainTenanceTypeOne || '';
    this.unitmainTenanceTypeOneName = this.$route.query.unitmainTenanceTypeOneName || '';
    this.unitmainTenanceTypeTwo = this.$route.query.unitmainTenanceTypeTwo || '';
    this.unitmainTenanceTypeTwoName = this.$route.query.unitmainTenanceTypeTwoName || '';

    let agentCode = this.$route.query.agentCode;
    if (agentCode) {
      localStorage.setItem('agentCode', agentCode);
    }
    console.log('获取到到参数agentCode：', agentCode,)

    //先清空车险缓存
    util.removeSessionStorageObj("signature")
    let wxCar = util.getSessionStorageObj('wxCar');
    if (!wxCar) {
      this.$store.commit('car/resetState');
    } else {
      util.removeSessionStorageObj('wxCar');
    }

    this.frameNo = this.vehicleDTO.frameNo
    this.engineNo = this.vehicleDTO.engineNo
    this.carOwner = this.carOwnerDTO.carOwner
    this.carOwnerIdNo = this.carOwnerDTO.carOwnerIdNo
    this.licenseNoValue = this.licenseNo

    this.getExamineCar()
    this.getInitCarTime();
    this.$store.dispatch('my/getWxInfo', { sysId: agentCode });
    this.$store.commit('car/updataTryCalculation', {});

    // 判断编辑
    if (this.saveProposal.length) {
      this.$store.commit('car/updateCarState', [{ name: ['editType'], value: 1 }])
      for (let item of this.saveProposal) {
        if (item.riskMark == '0801') {  // 交强险
          this.$store.commit('car/updateCarState', [{ name: ['VehicleInsurance', 'switchChecked'], value: true }])
        }
        if (item.riskMark == '0802') {  // 商业险
          this.$store.commit('car/updateCarState', [{ name: ['VehicleInsurance', 'switchChecked1'], value: true }])
        }
      }
    }

    this.$store.dispatch('my/getDecisionUnit')
    // 分享页面不调用查询决策单元的接口直接链接上带过来
    // this.$store.dispatch('my/getDecisionUnit')

    this.$store.commit('my/updateState', [{ name: ['decisionUnitValue'], value: this.codeName }])
  },

  methods: {
    onShow() {
      if (this.show) {
        this.show = false
      } else {
        this.show = true
      }
    },
    //车险验车码接口
    async getExamineCar() {
      const res = await this.$axios({
        url: this.$API.API_GETCHECKCARCODE,
        method: 'get',
        params: {
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        this.checkCarCode = res.content.data.checkCarCode
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    // 续保查询
    async renewInsurance() {
      let licenseNo = ""
      if (!this.isLicenseNo) {
        licenseNo = this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo
      }
      if (!licenseNo && !this.vehicleDTO.frameNo) {
        this.$toast('车牌号、车架号必填一项');
        return;
      }
      if (licenseNo && !compCheck.isVehicleNumber2(licenseNo)) {
        this.$toast('车牌号格式不正确');
        return;
      }
      if (this.vehicleDTO.frameNo && !compCheck.isRackNo(this.vehicleDTO.frameNo)) {
        return;
      }
      let renewInsuranceRes = await this.$store.dispatch('car/renewInsurance')
      if (renewInsuranceRes) {
        this.frameNo = this.vehicleDTO.frameNo
        this.licenseNoValue = this.carInsureEntry.licenseNo
        this.engineNo = this.vehicleDTO.engineNo
        this.carOwner = this.carOwnerDTO.carOwner
        this.carOwnerIdNo = this.carOwnerDTO.carOwnerIdNo
      }
      if (renewInsuranceRes.code == 0) {
        this.$store.commit('car/updateCarState', [
          { name: ['renewInsuranceQuery', 'checked'], value: true }
        ])
      }
      this.getInitCarTime();
    },
    // 查询车辆
    async queryVehicle() {
      if (!compCheck.isVehicleNumber2(this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo)) {
        this.$toast('请输入正确的车牌号码！');
        return;
      }
      if (this.vehicleType == '1' && !this.useNatureCode.value.value) {
        this.$toast('请选择使用性质！');
        return;
      }
      if (this.vehicleType == '1' && !this.carKindCode.value.value) {
        this.$toast('请选择车辆种类！');
        return;
      }
      if (!this.licensePlateType.struct.value.value) {
        this.$toast('请选择号牌种类！');
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_GETCARINFOFORSH,
        method: 'post',
        data: {
          licenseNo: this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo,
          licenseType: this.licensePlateType.struct.value.value,
          agentCode: localStorage.agentCode,
          useNatureCode: this.vehicleType == '1' ? this.useNatureCode.value.value : '8A',
          maincarKindCode: this.vehicleType == '1' ? 'H' : 'A',
          carKindCode: this.vehicleType == '1' ? this.carKindCode.value.value : 'A0'
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        if (res.content.data.length) {
          // 查询车辆
          let list = res.content.data.filter(item => {
            item.text = `${item.carName} 价格¥${item.actualValue}`
            item.codeCode = item.oldModelCode
            item.codeName = item.carName
            return item
          })
          this.$refs.selectPicker.parentMsg({
            name: '查询车辆',
            struct: {
              data: list
            }
          });
        } else {
          this.$toast('暂无查询数据');
        }
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    // 进口车查询
    async getCarVIN() {
      if (!compCheck.isRackNo(this.vehicleDTO.frameNo)) {
        return;
      }
      if (!this.vehicleDTO.engineNo) {
        this.$toast('请输入发动机号！');
        return;
      }
      if (!this.carInsureEntry.licenseName && !this.carInsureEntry.isLicenseNo) {
        this.$toast('请选择车牌号简称！');
        return;
      }
      if (!this.carInsureEntry.licenseNo && !this.carInsureEntry.isLicenseNo) {
        this.$toast('请输入车牌号码！');
        return;
      }
      if (this.carInsureEntry.licenseNo && !this.carInsureEntry.isLicenseNo && !compCheck.isVehicleNumber2(this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo)) {
        this.$toast('请输入正确的车牌号码！');
        return;
      }
      const res = await this.$store.dispatch('car/getCarVIN', {
        frameNo: this.vehicleDTO.frameNo,
        engineNo: this.vehicleDTO.engineNo,
        licenseNo: this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo,
        comCode: this.UserInfo.manageCode
      })
      if (res.code == 0 && res.content.result == 0) {
        if (res.content.data.length) {
          this.list = res.content.data
          this.showBaselnfo = true
          this.radio = ""
        } else {
          this.$toast('暂无查询数据');
        }
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    // 初始化起保日期
    getInitCarTime() {
      this.$store.commit('car/updataCarPriceTime', "");
      if (!this.commercialInsuranceStartDate) {
        this.$store.commit('car/commercialInsuranceStartDate', compCheck.getDateByDays(1) + ' 00:00:00');
      }
      if (!this.compulsoryInsuranceStartDate) {
        this.$store.commit('car/compulsoryInsuranceStartDate', compCheck.getDateByDays(1) + ' 00:00:00');
      }
    },
    onSelect(index) {
      this.showBaselnfo = false
      this.radio = index;
      this.$store.commit('car/updataCarTypeDTO', this.list[index]);
    },
    //调用搜索接口
    async getCarType(value) {
      const res = await this.$store.dispatch('car/getCarType', { codeValue: value });
      if (res.code == 0 && res.content.result == 0) {
        if (res.content.data.length > 0) {
          this.list = res.content.data;
          this.showBaselnfo = true
          this.radio = ""
        } else {
          this.$store.commit('car/updataCarTypeDTO', { name: value });
        }
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    // 身份信息识别
    idNoInfoEvent(obj) {
      this.updataFrom(obj.name, 'car/updateCarOwner');
      this.updataFrom(obj.idNo, 'car/updateCarOwnerIdNo');
      this.updataFrom(obj.address, 'car/updateAddress');
      this.$store.commit('car/updateCarState', [{ name: ['carOwnerDTO', 'carOwnerNature', 'value'], value: this.carOwnerDTO.carOwnerNature.data[0] }]);
    },
    // 车辆信息识别
    carInfoEvent(obj) {
      this.carBanner = obj.imageUrl
      this.updataFrom(obj.vin, 'car/updateFrameNo');
      this.updataFrom(obj.engine_num, 'car/updateEngineNo');
      if (obj.plate_num) {
        this.$store.commit('car/updateCarState', [
          { name: ['carInsureEntry', 'licenseName'], value: obj.plate_num.substring(0, 1) },
          { name: ['carInsureEntry', 'licenseNo'], value: obj.plate_num.substring(1, 8) },
          { name: ['carInsureEntry', 'isLicenseNo'], value: false }
        ])
        this.licenseNoValue = this.carInsureEntry.licenseNo
      }

      //处理品牌型号
      if (obj.model) {
        //去除中文（牌这个字）
        var reg = /[\u724c]/g;
        var str = obj.model
        str = str.replace(/[ ]/g, "");//去空格
        str = str.replace(reg, "");//去除中文 牌字
        this.getCarType(str)
      }
      //处理车辆发证日期
      if (obj.issue_date) {
        let data = obj.issue_date.slice(0, 4) + '-' + obj.issue_date.slice(4, 6) + '-' + obj.issue_date.slice(6, 8)
        if (validator.verifyDataFormat(data)) {
          this.$store.commit('car/updataDatetime', data);
        }

      }
      //处理车辆注册日期
      if (obj.register_date) {
        let data = obj.register_date.slice(0, 4) + '-' + obj.register_date.slice(4, 6) + '-' + obj.register_date.slice(6, 8)
        if (validator.verifyDataFormat(data)) {
          this.$store.commit('car/updataEnrollDate', data);
        }
      }
      // 上海显示号牌种类、深圳显示号牌种类
      if (this.vehicleType == '0' && this.UserInfo.manageCode == '07000000' || this.UserInfo.manageCode == '09000000') {
        this.$store.commit('car/updateCarState', [{ name: ['licensePlateType', 'struct', 'value'], value: this.licensePlateType.struct.data[obj.plate_num.length == 7 ? 0 : 1] }])
      }

      setTimeout(() => {
        new PinchZoom(document.getElementById('vhtml'), {})
      }, 300)
    },
    updataFrom(value, name) {
      if (name == 'car/updateFrameNo') {
        value = value.replace(/[\u4E00-\u9FA5]/g, '').toUpperCase()
        this.frameNo = value
      } else if (name == 'car/updateEngineNo') {
        value = value.toUpperCase()
        this.engineNo = value
      } else if (name == 'car/updateCarOwner') {
        this.carOwner = value
      } else if (name == 'car/updateCarOwnerIdNo') {
        value = value.replace(/[\W]/g, '').toUpperCase()
        this.carOwnerIdNo = value
      }
      this.$store.commit(name, value);
    },
    updataDatetime(params) {
      this.$store.commit(params.url, params.datetime);
    },
    showDataTimePicker(params) {
      this.$refs.datetimePicker.parentMsg(params)
    },

    async onsubmit() {
      this.disabled = true;
      // 新车处理
      if (this.isLicenseNo) {
        this.$store.commit('car/updateLicenseName', "");
        this.$store.commit('car/updateLicenseNo', "新车");
      }
      if (!compCheck.isRackNo(this.vehicleDTO.frameNo)) {
        this.disabled = false;
        return;
      }
      if (!this.vehicleDTO.engineNo) {
        this.$toast('请输入发动机号！'); this.disabled = false;
        return;
      }
      if (!this.carInsureEntry.licenseName && !this.carInsureEntry.isLicenseNo) {
        this.$toast('请选择车牌号简称！'); this.disabled = false;
        return;
      }
      if (!this.carInsureEntry.licenseNo && !this.carInsureEntry.isLicenseNo) {
        this.$toast('请输入车牌号码！'); this.disabled = false;
        return;
      }
      if (this.carInsureEntry.licenseNo && !this.carInsureEntry.isLicenseNo && !compCheck.isVehicleNumber2(this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo)) {
        this.$toast('请输入正确的车牌号码！'); this.disabled = false;
        return;
      }
      if (!this.carTypeDTO.seatCount) {
        this.$toast(this.vehicleType == '1' ? '请输入核定载客数！' : '请输入座位数'); this.disabled = false;
        return;
      }
      if (!this.carTypeDTO.codeName) {
        this.$toast('请选择品牌型号！'); this.disabled = false;
        return;
      }
      if (!this.clausesContent) {
        this.$toast('请输入打印厂牌型号！'); this.disabled = false;
        return;
      }
      if (!this.vehicleDTO.purchaseDate) {
        this.$toast('请选择发证日期！'); this.disabled = false;
        return;
      }
      if (!this.vehicleDTO.enrollDate) {
        this.$toast('请选择注册日期！'); this.disabled = false;
        return;
      }
      if (this.carInsureEntry.transferFlag && !this.carInsureEntry.transferDate) {
        this.$toast('请选择过户日期！'); this.disabled = false;
        return;
      }
      // 货车
      if (this.$store.state.car.vehicleType == '1') {
        if (!this.carOwnerDTO.carOwner) {
          this.$toast('请输入姓名！'); this.disabled = false;
          return;
        }
        if (!this.carOwnerDTO.carOwnerIdNo) {
          this.$toast('请输入证件号码！'); this.disabled = false;
          return;
        }
      } else {
        if (!compCheck.isName(this.carOwnerDTO.carOwner)) {
          this.disabled = false;
          return;
        }
        if (!compCheck.isIdno(this.carOwnerDTO.carOwnerIdNo)) {
          this.disabled = false;
          return;
        }
      }
      // 广东分公司验证 20210316
      if (this.isLicenseNo && this.UserInfo.manageCode == '08000000' && !this.vehicleDTO.saleCompany) {
        this.$toast('请输入新车销售公司名称'); this.disabled = false;
        return;
      }
      if (this.isLicenseNo && this.UserInfo.manageCode == '08000000' && !this.vehicleDTO.saleAreaCode.value.text) {
        this.$toast('请选择新车销售公司所在地'); this.disabled = false;
        return;
      }
      // 上海显示号牌种类、深圳显示号牌种类
      if ((this.UserInfo.manageCode == '07000000' || this.UserInfo.manageCode == '09000000') && !this.licensePlateType.struct.value.text) {
        this.$toast('请选择号牌种类'); this.disabled = false;
        return;
      }
      // 上海机构是新车该字段必填
      if ((this.UserInfo.manageCode == '07000000' && this.isLicenseNo) && !this.vehicleDTO.businessDate) {
        this.$toast('请选择购车发票日期'); this.disabled = false;
        return;
      }
      // 河北（包含河北供销商贸专版）、青岛增加行驶证地址 15000000-河北 11000000-青岛分公司
      if ((this.UserInfo.manageCode == '15000000' || this.UserInfo.manageCode == '11000000') && this.carInsureEntry.address.length != 3) {
        this.$toast('请选择行驶证地址'); this.disabled = false;
        return;
      }

      let renewNo = []
      if (this.$store.state.renewedInsurance.car.renewalDetail.policyBI && this.$store.state.renewedInsurance.car.renewalDetail.policyBI.corePolicyNo) {
        renewNo.push(this.$store.state.renewedInsurance.car.renewalDetail.policyBI.corePolicyNo)
      }
      if (this.$store.state.renewedInsurance.car.renewalDetail.policyCI && this.$store.state.renewedInsurance.car.renewalDetail.policyCI.corePolicyNo) {
        renewNo.push(this.$store.state.renewedInsurance.car.renewalDetail.policyCI.corePolicyNo)
      }
      let data = {
        orderNo: this.$store.state.car.orderNo,
        agentCode: localStorage.agentCode,
        carTypeDTO: this.$store.state.car.carTypeDTO,
        carOwnerDTO: {
          carOwner: this.carOwnerDTO.carOwner,
          carOwnerNature: this.carOwnerDTO.carOwnerNature.value.value,
          carOwnerIdType: this.carOwnerDTO.carOwnerNature.value.value == '0' ? '0' : '12',
          carOwnerIdNo: this.carOwnerDTO.carOwnerIdNo,
          address: this.carOwnerDTO.address
        },
        renewNo: renewNo.join(','),
        traceNo: window.GluttonContext.traceNo,
        vehicleDTO: {
          licenseNo: this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo,
          transferDate: this.carInsureEntry.transferDate,
          transferFlag: this.carInsureEntry.transferFlag,
          engineNo: this.vehicleDTO.engineNo,
          frameNo: this.vehicleDTO.frameNo,
          brandName: this.carTypeDTO.codeName,
          purchaseDate: this.vehicleDTO.purchaseDate,
          enrollDate: this.vehicleDTO.enrollDate,
          ownerImageUrl: this.carBanner,
        },
        renewalFlag: this.renewInsuranceQuery.checked ? 1 : 0,
        editType: this.$store.state.car.editInsurance,
        vehicleType: this.$store.state.car.vehicleType,
      }
      if(util.getSessionStorageObj("transcribePhone")){
        data.transcribePhone = util.getSessionStorageObj("transcribePhone")
        if(util.getSessionStorageObj("transcribeName")){
          data.transcribeName = util.getSessionStorageObj("transcribeName")
        }
      }
      // 广东分公司验证 20210316
      if (this.isLicenseNo && this.UserInfo.manageCode == '08000000') {
        data.carTypeDTO.saleCompany = this.vehicleDTO.saleCompany
        data.carTypeDTO.saleAreacode = this.vehicleDTO.saleAreaCode.value.value
        data.carTypeDTO.saleFlag = this.vehicleDTO.sale4SFlag ? '1' : '0'
      }
      // 上海显示号牌种类、深圳显示号牌种类
      if (this.UserInfo.manageCode == '07000000' || this.UserInfo.manageCode == '09000000' || this.vehicleType == '1') {
        data.vehicleDTO.licenseType = this.licensePlateType.struct.value.value
      }
      // 上海机构是新车该字段必填
      if (this.UserInfo.manageCode == '07000000' && this.isLicenseNo) {
        data.vehicleDTO.businessDate = this.vehicleDTO.businessDate
      }
      //处理车险分享转录需要传决策单元相关参数（正常出单index页面不需要）
      data.codeCode = this.codeCode
      data.codeName = this.codeName
      data.unitmainTenanceType1 = this.unitmainTenanceTypeOne
      data.unitmainTenanceType1Name = this.unitmainTenanceTypeOneName
      data.unitmainTenanceType2 = this.unitmainTenanceTypeTwo
      data.unitmainTenanceType2Name = this.unitmainTenanceTypeTwoName

      // 河北（包含河北供销商贸专版）、青岛增加行驶证地址 15000000-河北 11000000-青岛分公司
      if (this.UserInfo.manageCode == '15000000' || this.UserInfo.manageCode == '11000000') {
        data.vehicleDTO.ownerProvinceName = this.carInsureEntry.address[0].name
        data.vehicleDTO.ownerCityName = this.carInsureEntry.address[1].name
        data.vehicleDTO.ownerAddress = this.carInsureEntry.address[2].name
        data.vehicleDTO.address = JSON.stringify(this.carInsureEntry.address)
      }
      // 货车
      if (this.$store.state.car.vehicleType == '1') {
        data.vehicleDTO.useNatureCode = this.useNatureCode.value.value
        data.vehicleDTO.maincarKindCode = 'H'
        data.vehicleDTO.carKindCode = this.carKindCode.value.value
        data.vehicleDTO.vehicleCategory = this.vehicleCategory.value.value
        data.vehicleDTO.licenseCategory = this.licenseCategory.value.value
        data.vehicleDTO.licenseColor = this.licenseColor.value.value
      } else {
        // 客车 --- 家庭自用
        data.vehicleDTO.useNatureCode = '8A'
      }

      const res = await this.$axios({
        url: this.$API.API_CARBASICINFOENTRY,
        method: 'post',
        data
      });
      if (res.code == 0 && res.content.result == 0) {
        this.$store.commit('car/updataOrderNo', res.content.data.orderNo);
        /**
         * 车价报文
         */
        let data = {
          orderNo: this.orderNo,
          agentCode: localStorage.agentCode
        }
        let CarPrice = await this.$store.dispatch("car/getCarPrice", { data: data, url: this.$API.API_GETCARPRICE, page: "carBaseInfo" })
        this.disabled = false;
        if (CarPrice.code == 0 && CarPrice.content.result == '0') {
          this.listData = JSON.parse(CarPrice.content.data)
          if (this.listData.cars) {//多个车架
            this.listData.cars.forEach(item => {
              item.modelName = item.modelName || item.carName
            })
            this.list2 = this.listData.cars
            this.motorcycleShow = true;
          } else { //正常流程
            this.$store.commit('car/updataCarPrice', this.listData);
            this.operate20A();
            this.goPage('wxCarVehicleInsurance');
          }
        }
      } else {
        this.disabled = false;
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    onMotorcycle(index) {
      this.motorcycleShow = false
      this.motorcycleRadio = index;
      this.multiCarriage()
    },
    //有多个车架时调用
    async multiCarriage() {
      let data = {
        orderNo: this.$store.state.car.orderNo,
        uuid: this.listData.inputvo,
        carPriceQueryRespVo: this.listData.cars[this.motorcycleRadio],
      }
      let res = await this.$store.dispatch("car/getCarPrice", { data: data, url: this.$API.API_GERPRICEMORETYPE, page: "carBaseInfo" });
      if (res.code == 0 && res.content.result == 0) {
        this.$store.commit('car/updataCarPrice', JSON.parse(res.content.data));
        this.operate20A();
        this.goPage('wxCarVehicleInsurance');
      }
    },
    // 机动车损失保险
    operate20A() {
      console.log('this.carPrice', this.carPrice);
      this.RiskPlan.forEach((item, index) => {
        if (item.kindCode == '20A' && item.amount) {
          this.$store.commit('car/updateCarState', [
            { name: ['insuranceTypes', index, 'amount'], value: this.carPrice.actualValue }
          ])
        }
      })
    },
    updateLicenseNo(value) {
      value = value.replace(/[^\w\.\/]/ig, '').toUpperCase()
      this.licenseNoValue = value
      this.$store.commit('car/updateLicenseNo', value);
    },
    updateTransferFlag(value) {
      this.$store.commit('car/updateTransferFlag', value ? 1 : 0);
    },
    updateIsLicenseNo(value) {
      this.$store.commit('car/updateLicenseName', "");
      this.licenseNoValue = ""
      if (value) {
        this.$store.commit('car/updateLicenseNo', "新车");
      } else {
        this.$store.commit('car/updateLicenseNo', "");
      }
      this.$store.commit('car/updateIsLicenseNo', value);
    },
    showDatetimePicker(params) {
      this.$refs.datetimePicker.parentMsg(params);
    },
    updataDatetime(params) {
      this.$store.commit(params.url, params.datetime);
    },
    // 车牌号简称选择
    showCarArea() {
      this.$refs.carArea.parentMsg();
    },
    carAreaConfirm(value) {
      this.$store.commit('car/updateLicenseName', value);
    },
    renewInsuranceSet() {
      this.$store.commit('car/updateCarState', [
        { name: ['renewInsuranceQuery', 'checked'], value: false }
      ])
    },
    updateCarState(params, value) {
      this.$store.commit('car/updateCarState', [{ name: params, value }]);
    },
    showSelectPicker(data) {
      if (data) {
        this.$refs.selectPicker.parentMsg({ struct: data });
      } else {
        this.$refs.selectPicker.parentMsg({ struct: this.vehicleDTO.saleAreaCode });
      }
    },
    showLicensePlateType() {
      let struct = {
        data: this.licensePlateType.struct.data,
        value: this.licensePlateType.struct.value
      }
      if (this.vehicleType == '1') {
        struct = {
          data: [...this.licensePlateType.struct.data, ...this.licensePlateType.struct.shangHaiData],
          value: this.licensePlateType.struct.value
        }
      }
      this.$refs.selectPicker.parentMsg({
        name: this.licensePlateType.name,
        struct
      });
    },
    updataSelectPicker(params) {
      if (params.name == '查询车辆') {
        this.queryCar(params.struct.value)
      } else if (params.name == '号牌种类') {
        this.$store.commit('car/updateCarState', [{ name: ['licensePlateType', 'struct', 'value'], value: params.struct.value }]);
      } else {
        this.$store.commit('car/updateCarState', [{ name: ['vehicleDTO', 'saleAreaCode', 'value'], value: params.struct.value }]);
      }
    },
    // 查询车辆信息处理
    queryCar(params) {
      this.$store.commit('car/updateCarState', [
        { name: ['vehicleDTO', 'engineNo'], value: params.engineNo || '' },
        { name: ['vehicleDTO', 'frameNo'], value: params.frameNo || '' },
        { name: ['vehicleDTO', 'purchaseDate'], value: params.enrollDate || '' },
        { name: ['vehicleDTO', 'enrollDate'], value: params.enrollDate || '' },
        { name: ['carOwnerDTO', 'carOwner'], value: params.carOwner || '' },
        { name: ['carTypeDTO',], value: params }
      ])
      this.clausesContent = compCheck.substrFirstBehind(this.carTypeDTO.codeName)
      this.frameNo = params.frameNo || ''
      this.engineNo = params.engineNo || ''
      this.carOwner = params.carOwner || ''
    },
    // 显示省市区选择
    showAreaPicker() {
      this.$refs.areaPicker.parentMsg(3);
    },
    areaConfirm(value) {
      console.log('value', value);
      this.$store.commit('car/updateCarState', [
        { name: ['carInsureEntry', 'address'], value: value },
      ])
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
  .Code_checking_car.van-overlay {
    right: 0;
    left: auto;
    z-index: 1;
    width: 46%;
    height: auto;
    border-radius: 6px;
    margin-right: 12px;
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
    color: #fff;
    height: 40px;
    line-height: 40px;
    margin: 0 10px;
    font-size: 14px;
  }
  p {
    margin: 0;
  }
  .car_area {
    display: flex;
    align-items: center;
    margin-right: 0.4rem;
    width: 2.2rem;
  }
  p.tips {
    color: #999;
    font-size: 14px;
    text-align: center;
    margin: 1rem 0 0.6rem;
  }
}
</style>
