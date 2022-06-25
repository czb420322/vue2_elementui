<template>
  <div class="carBaseInfo">
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <van-icon name="wap-nav" color="#fff" size="20" @click="onShow()"  />
      </template>
    </van-nav-bar>
    <!-- <v-header :title="{ name: title }"></v-header> -->
    <ol class="content" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <li class="list">
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
          <van-field v-model="frameNo" @input="updataFrom($event, 'car/updateFrameNo')" maxlength="17" label="车架号" placeholder="请输入车架号">
            <template #right-icon>
              <!-- <span style="color: #1989fa" @click="renewInsurance" >续保查询</span> -->
            </template>
          </van-field>
          <van-field v-model="engineNo" @input="updataFrom($event, 'car/updateEngineNo')" label="发动机号" placeholder="请输入发动机号" />
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
          <van-field :value="carTypeDTO.codeName" label="品牌型号" placeholder="请选择品牌型号" right-icon="arrow" readonly @click="goPage('carSelect')" />
          <van-field v-model="carTypeDTO.seatCountLb" @input="updataFrom($event, 'car/updataSeatCountLb')" maxlength="2" type="digit" label="座位数" placeholder="请输入座位数" />
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
          <van-field v-model="carOwner" @input="updataFrom($event, 'car/updateCarOwner')" label="姓名" placeholder="请输入姓名" />
          <van-field v-model="carOwnerIdNo" @input="updataFrom($event, 'car/updateCarOwnerIdNo')" maxlength="18" label="身份证号码" placeholder="请输入身份证号码" />
          <br>
        </div>
      </li>
      <br>
      <li class="list">
        <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="disabled" @click="onsubmit">下一步</van-button>
      </li>
    </ol>

    <datetimePicker ref="datetimePicker" @click="updataDatetime"></datetimePicker>
    <!-- 品牌型号 -->
    <van-popup v-model="showBaselnfo" closeable round position="bottom" :style="{ height: '100vw' }">
      <h4 class="showBaselnfo">请选择</h4>
      <div class="showBaselnfo_box">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell v-for="(item,index) in list" :key="index" :title="item.codeName +' 价格¥'+item.purchasePrice + ' 座位数:'+item.seatCountLb" clickable @click="onSelect(index)">
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

  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
import idNoScan from './../../templates/idNoScan.vue';
import carInfoScan from './../../templates/carInfoScan.vue';
import datetimePicker from './../../templates/datetimePicker.vue';
import compCheck from '../../assets/js/util/comp-check';
import validator from '@/assets/js/util/validator';
import { mapState } from 'vuex'

export default {
  components: {
    idNoScan,
    carInfoScan,
    datetimePicker
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
      show:false,
      checkCarCode:'',//验车码
      transcribePhone:'',
      transcribeName:''
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
      isLicenseNo: state => state.car.carInsureEntry.isLicenseNo,
      licenseName: state => state.car.carInsureEntry.licenseName,
      transferFlag: state => state.car.carInsureEntry.transferFlag == 1 ? true : false,
      transferDate: state => state.car.carInsureEntry.transferDate,
    })
  },

  created() {
    this.frameNo = this.vehicleDTO.frameNo
    this.engineNo = this.vehicleDTO.engineNo
    this.carOwner = this.carOwnerDTO.carOwner
    this.carOwnerIdNo = this.carOwnerDTO.carOwnerIdNo

    this.getInitCarTime();

    this.licenseNoValue = this.licenseNo
    this.getExamineCar()
    this.$store.dispatch('my/getUserInfo');
  },
  methods: {
    onShow(){
      if(this.show){
        this.show=false
      }else{
        this.show=true
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
    async renewInsurance() {
      if (!compCheck.isRackNo(this.vehicleDTO.frameNo)) {
        return;
      }
      let renewInsuranceRes = await this.$store.dispatch('car/renewInsurance')
      if (renewInsuranceRes) {
        this.frameNo = this.vehicleDTO.frameNo
        this.engineNo = this.vehicleDTO.engineNo
        this.carOwner = this.carOwnerDTO.carOwner
        this.carOwnerIdNo = this.carOwnerDTO.carOwnerIdNo
      }
    },
    // 初始化起保日期
    getInitCarTime() {
      this.$store.commit('car/updataCarPriceTime', "");
      if (!this.commercialInsuranceStartDate) {
        this.$store.commit('car/commercialInsuranceStartDate', compCheck.getDateByDays(1) + ' 00:00:00');
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
    },
    // 车辆信息识别
    carInfoEvent(obj) {
      this.updataFrom(obj.vin, 'car/updateFrameNo');
      this.updataFrom(obj.engine_num, 'car/updateEngineNo');
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
    },
    updataFrom(value, name) {
      if (name == 'car/updateFrameNo') {
        value = value.replace(/[^\w\.\/]/ig, '').toUpperCase()
        this.frameNo = value
      } else if (name == 'car/updateEngineNo') {
        value = value.replace(/[^\w\.\/]/ig, '').toUpperCase()
        this.engineNo = value
      } else if (name == 'car/updateCarOwner') {
        this.carOwner = value
      } else if (name == 'car/updateCarOwnerIdNo') {
        value = value.replace(/[^\w\.\/]/ig, '').toUpperCase()
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
      if (!this.carTypeDTO.seatCountLb) {
        this.$toast('请输入座位数！'); this.disabled = false;
        return;
      }
      if (!this.carTypeDTO.codeName) {
        this.$toast('请选择品牌型号！'); this.disabled = false;
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
      if (!compCheck.isName(this.carOwnerDTO.carOwner)) {
        this.disabled = false;
        return;
      }
      if (!compCheck.isIdno(this.carOwnerDTO.carOwnerIdNo)) {
        this.disabled = false;
        return;
      }
      if(util.getSessionStorageObj("transcribePhone")){
        this.transcribePhone = util.getSessionStorageObj("transcribePhone")||''
        if(util.getSessionStorageObj("transcribeName")){
          this.transcribeName = util.getSessionStorageObj("transcribeName")||''
        }
      }
      const res = await this.$axios({
        url: this.$API.API_CARBASICINFOENTRY,
        method: 'post',
        data: {
          orderNo: this.$store.state.car.orderNo,
          carTypeDTO: this.$store.state.car.carTypeDTO,
          carOwnerDTO: this.$store.state.car.carOwnerDTO,
          vehicleDTO: {
            licenseNo: this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo,
            transferDate: this.carInsureEntry.transferDate,
            transferFlag: this.carInsureEntry.transferFlag,
            engineNo: this.vehicleDTO.engineNo,
            frameNo: this.vehicleDTO.frameNo,
            brandName: this.carTypeDTO.codeName,
            purchaseDate: this.vehicleDTO.purchaseDate,
            enrollDate: this.vehicleDTO.enrollDate,
          },
            transcribePhone:this.transcribePhone,
            transcribeName:this.transcribeName
        }
      });
      if (res.code == 0 && res.content.result == 0) {
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
            this.list2 = this.listData.cars
            this.motorcycleShow = true;
          } else { //正常流程
            this.$store.commit('car/updataCarPrice', this.listData);
            this.goPage('carVehicleInsurance');
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
        this.goPage('carVehicleInsurance');
      }
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
      if(value){
        this.$store.commit('car/updateLicenseNo', "新车");
      }else{
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
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
.carBaseInfo{
  .van-nav-bar{
    background:#0252ff
  }
  .van-nav-bar__title{
    color: #fff;
  }
  .Code_checking_car.van-overlay{
    right: 0;
    left:auto;
    z-index: 1;
    width: 36%;
    height: auto;
  }
  .wrapper{
    display: flex;
    justify-content: space-between;
    color: #fff;
    height: 40px;
    line-height: 40px;
    margin: 0 4px;
    font-size: 12px;
  }
  p{
    margin:0;
  }
  .car_area{
					display: flex;
					align-items: center;
					margin-right: .4rem;
					width: 2.2rem;
				}
}
</style>
