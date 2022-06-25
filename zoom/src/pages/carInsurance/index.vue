<template>
  <div class="carBaseInfo">
    <authCodeCar></authCodeCar>
    <i class="top_bar" :style="{ height: $iosSystem + 'px' }"></i>
    <van-nav-bar title="国任车险" :border="false" :fixed="true">
      <template #left>
        <van-icon
          name="arrow-left"
          color="#3B3B3B"
          size="20"
          @click="onClickLeft"
        />
      </template>
    </van-nav-bar>
    <!-- <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <van-icon name="wap-nav" color="#fff" size="20" @click="show = !show" />
      </template>
    </van-nav-bar> -->
    <!-- <v-header :title="{ name: title }"></v-header> -->
    <ol class="content" :style="{ 'padding-top': $iosSystem + 45 + 'px' }">
      <!-- <li class="list" v-if="carBanner" style="height: 25.848vw; background: white; border-radius: 8px; overflow: hidden;">
        <img class="banner" style="margin: auto" id="vhtml" :src="carBanner" alt="">
      </li>
      <li class="list" v-else>
        <img class="banner" :src="$CTXBASE + '/img/carInsurance/banner@2x.png'" alt="">
      </li> -->
      <li class="list">
        <div class="info-box">
          <van-cell center class="cell_title">
            <template #title>
              <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" /> -->
              <van-icon name="records" size="22px" />
              <span class="custom-title">车辆信息</span>
            </template>
            <template #right-icon>
              <span style="opacity: 0.5">行驶证上传</span>
              <carInfoScan
                :params="{ code: 'licenseNo' }"
                @change="carInfoEvent($event)"
              ></carInfoScan>
            </template>
          </van-cell>
          <!-- v-if="
              UserInfo.manageCode == '08000000' && UserInfo.agentType == '1'
            " -->
          <!-- <van-field
            :value="decisionUnitValue"
            label="决策单元"
            input-align="right"
            placeholder="请选择决策单元"
            readonly
            @click="showSelectDecision('my/updmYdecisionUnit', mYdecisionUnit)"
            is-link
          /> -->
          <!-- <van-field
            v-else-if="decisionUnitValue"
            class="readonly_cell"
            type="textarea"
            rows="1"
            autosize
            :value="decisionUnitValue"
            label="决策单元"
            readonly
          /> -->
          <van-field label="车牌号码">
            <template #input>
              <!-- <span v-if="!licenseName" style="opacity: .5;">粤</span>{{licenseName}}&nbsp -->
              <div v-if="!isLicenseNo" class="car_area" @click="showCarArea">
                <span v-if="!licenseName" style="opacity: 0.5">简</span
                >{{ licenseName }}&nbsp;
                <!-- <van-icon size="19" :name="$CTXBASE + '/img/carInsurance/xiala@2x.png'" /> -->
                <van-icon name="arrow-down" />
              </div>
              <van-field
                v-if="!isLicenseNo"
                v-model="licenseNoValue"
                @input="updateLicenseNo"
                maxlength="7"
                :border="false"
                placeholder="请输入"
                style="padding: 0"
                size="medium"
              />
            </template>
            <template #button>
              <div style="display: flex; align-items: center">
                未上牌&nbsp;
                <van-switch
                  :value="isLicenseNo"
                  @input="updateIsLicenseNo"
                  center
                  size="24"
                  inactive-color="#e5e5e5"
                />
              </div>
            </template>
          </van-field>
          <!-- 货车 -->
          <template v-if="vehicleType == '1'">
            <van-field
              :value="trucksUseNatureCode.value.text"
              @click="showSelectPicker(trucksUseNatureCode)"
              readonly
              label="使用性质"
              placeholder="请选择使用性质"
              right-icon="arrow"
            />
            <van-field
              :value="carKindCode.value.text"
              @click="showSelectPicker(carKindCode)"
              readonly
              label="车辆种类"
              placeholder="请选择车辆种类"
              right-icon="arrow"
            />
          </template>
          <!-- 上海显示号牌种类、深圳显示号牌种类 -->
          <van-field
            v-if="
              UserInfo.manageCode == '07000000' ||
              UserInfo.manageCode == '09000000' ||
              this.vehicleType == '1'
            "
            :value="licensePlateType.struct.value.text"
            readonly
            label="号牌种类"
            placeholder="请选择"
            @click="showLicensePlateType"
          >
            <template #right-icon>
              <span
                style="color: #1989fa"
                @click.stop="queryVehicle"
                v-if="
                  UserInfo.manageCode == '07000000' ||
                  UserInfo.manageCode == '09000000'
                "
                >查询车辆</span
              >
              <van-icon name="arrow" v-else />
            </template>
          </van-field>

          <!-- 摩托车 -->
          <template v-if="vehicleType == '2'">
            <van-field
              :value="motorbikeUseNatureCode.value.text"
              @click="showSelectPicker(motorbikeUseNatureCode)"
              readonly
              label="使用性质"
              placeholder="请选择使用性质"
              right-icon="arrow"
            />
            <van-field
              :value="motorbikeKindCode.value.text"
              @click="showSelectPicker(motorbikeKindCode)"
              readonly
              label="车辆种类"
              placeholder="请选择车辆种类"
              right-icon="arrow"
            />
          </template>
          <van-field
            v-if="
              UserInfo.manageCode == '07000000' ||
              UserInfo.manageCode == '09000000' ||
              this.vehicleType == '2'
            "
            :value="licensePlateType.struct.value.text"
            readonly
            label="号牌种类"
            placeholder="请选择"
            @click="showLicensePlateType"
          >
            <template #right-icon>
              <span
                style="color: #1989fa"
                @click.stop="queryVehicle"
                v-if="
                  UserInfo.manageCode == '07000000' ||
                  UserInfo.manageCode == '09000000'
                "
                >查询车辆</span
              >
              <van-icon name="arrow" v-else />
            </template>
          </van-field>

          <!-- 车架号 -->
          <van-field
            type="textarea"
            rows="1"
            autosize
            v-model="frameNo"
            @input="updataFrom($event, 'car/updateFrameNo')"
            @blur="renewInsuranceSet"
            maxlength="17"
            label="车架号"
            placeholder="请输入车架号"
          >
            <template #right-icon>
              <span style="color: #1989fa" @click="renewInsurance"
                >续保查询</span
              >
            </template>
          </van-field>
          <van-field
            v-model="engineNo"
            @input="updataFrom($event, 'car/updateEngineNo')"
            label="发动机号"
            placeholder="请输入发动机号"
          >
            <template #right-icon>
              <span style="color: #1989fa" @click="getCarVIN">进口车查询</span>
            </template>
          </van-field>
          <van-field
            :value="carTypeDTO.codeName"
            label="品牌型号"
            placeholder="请选择品牌型号"
            right-icon="arrow"
            readonly
            @click="goPage('carSelect')"
          />
          <!-- 客车使用性质 -->
          <template v-if="vehicleType == '0'">
            <van-field
              :value="useNatureCode.value.text"
              @click="showSelectPicker(useNatureCode, '使用性质')"
              readonly
              label="使用性质"
              placeholder="请选择使用性质"
              right-icon="arrow"
            />
          </template>
          <van-field
            v-model="clausesContent"
            label="打印厂牌型号"
            placeholder="请输入打印厂牌型号"
          />
          <!-- 整备质量 -->
          <div class='unladenMass' v-if="vehicleType == '1'">
            <van-field
            v-model="completeKerbMass"
            label='整备质量'          
            placeholder='请输入整备质量'
            type="number"
           />
           <span>千克</span>
          </div>

          <!-- 货车 -->
          <van-field
            v-model="carTypeDTO.seatCount"
            @input="updataFrom($event, 'car/updataSeatCount')"
            maxlength="2"
            type="digit"
            :label="vehicleType == '1' ? '核定载客数' : '座位数'"
            :placeholder="
              vehicleType == '1' ? '请输入核定载客数' : '请输入座位数'
            "
          />
          <template v-if="vehicleType == '1'">
            <div class='tonCount-box'>
              <van-field
              :value="carTypeDTO.tonCount"
              @input="updateCarState(['carTypeDTO', 'tonCount'], $event)"
              label="核定载质量"
              placeholder="请输入核定载质量"
              type="number"
              />
              <span>吨</span>
            </div>
            <van-field
              :value="vehicleCategory.value.text"
              @click="showSelectPicker(vehicleCategory)"
              readonly
              label="车辆类型"
              placeholder="请选择车辆类型"
              right-icon="arrow"
            />
            <van-field
              :value="licenseCategory.value.text"
              @click="showSelectPicker(licenseCategory)"
              readonly
              label="车辆类型描述"
              placeholder="请选择车辆类型描述"
              right-icon="arrow"
            />
            <van-field
              :value="licenseColor.value.text"
              @click="showSelectPicker(licenseColor,'号牌颜色')"
              readonly
              label="号牌颜色"
              placeholder="请选择号牌颜色"
              right-icon="arrow"
            />
          </template>

          <!-- 摩托车 -->
          <template v-if="vehicleType == '2'">
            <van-field
              :value="motorbikeDescribe.value.text"
              @click="showSelectPicker(motorbikeDescribe)"
              readonly
              label="车辆类型描述"
              placeholder="请选择车辆类型描述"
              right-icon="arrow"
            />
            <van-field
              :value="motorbikeLicenseColor.value.text"
              @click="showSelectPicker(motorbikeLicenseColor,'号牌颜色')"
              readonly
              label="号牌颜色"
              placeholder="请选择号牌颜色"
              right-icon="arrow"
            />
          </template>
          
          <!-- 能源种类描述 -->
          <template>
            <van-field
              :value="fuelCategory.value.text"
              readonly
              label="能源种类"
              placeholder="请选择能源种类"
            >
            </van-field>
          </template>
          <template v-if="fuelCategory.value.value =='9'">
            <van-field
              v-model="fuelTypeDescribe"
              label="其他能源种类"
              placeholder="请输入能源种类"
            ></van-field>
          </template>


          <van-field
            :value="vehicleDTO.purchaseDate"
            readonly
            @click="
              showDataTimePicker({
                url: 'car/updataDatetime',
                minDate: 'min',
                maxDate: 0,
              })
            "
            label="发证日期"
            placeholder="请选择发证日期"
          >
            <template #right-icon>
              <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
            </template>
          </van-field>
          <van-field
            :value="vehicleDTO.enrollDate"
            readonly
            @click="
              showDataTimePicker({
                url: 'car/updataEnrollDate',
                minDate: 'min',
                maxDate: 0,
              })
            "
            label="注册日期"
            placeholder="请选择注册日期"
          >
            <template #right-icon>
              <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
            </template>
          </van-field>
          <!-- 上海机构是新车该字段必填 否则隐藏-->
          <van-field
            v-if="UserInfo.manageCode == '07000000' && isLicenseNo"
            :value="vehicleDTO.businessDate"
            readonly
            @click="
              showDataTimePicker({
                url: 'car/updataBusinessDate',
                minDate: 'min',
                maxDate: 0,
              })
            "
            label="购车发票日期"
            placeholder="请选择购车发票日期"
          >
            <template #right-icon>
              <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
            </template>
          </van-field>
          <van-field
            v-if="UserInfo.manageCode == '08000000' && isNewCar"
            :value="vehicleDTO.saleCompany"
            @input="updateCarState(['vehicleDTO', 'saleCompany'], $event)"
            label="新车销售公司名称"
            placeholder="请输入新车销售公司名称"
          />
          <!--  -->
          <van-field
            v-if="UserInfo.manageCode == '08000000' && isNewCar"
            :value="saleAreaCode.value.text"
            label="新车销售公司所在地"
            placeholder="请选择"
            right-icon="arrow"
            readonly
            @click="showSelectPicker(saleAreaCode,'新车销售公司所在地')"
          />
          <!--  -->
          <van-field
            v-if="UserInfo.manageCode == '08000000' && isNewCar"
            name="switch"
            label="是否4s销售"
            input-align="right"
          >
            <template #input>
              <van-switch
                v-model="sale4SFlag"
                center
                size="24"
                inactive-color="#e5e5e5"
              />
            </template>
          </van-field>
          <van-field
            v-if="
              UserInfo.manageCode == '15000000' ||
              UserInfo.manageCode == '11000000'
            "
            label="行驶证地址"
            placeholder="请选择地址"
            :value="
              carInsureEntry.address && carInsureEntry.address.length == 3
                ? carInsureEntry.address[0].name +
                  carInsureEntry.address[1].name +
                  carInsureEntry.address[2].name
                : ''
            "
            @click="showAreaPicker"
            readonly
            is-link
          />
          <van-field name="switch" label="一年内过户车" input-align="right">
            <template #input>
              <van-switch
                :value="transferFlag"
                @input="updateTransferFlag"
                center
                size="24"
                inactive-color="#e5e5e5"
              />
            </template>
          </van-field>
          <van-field
            v-show="transferFlag"
            :value="transferDate"
            label="过户日期"
            readonly
            @click="
              showDatetimePicker({
                url: 'car/updataTransferDate',
                minDate: 'min',
                maxDate: 0,
              })
            "
            placeholder="请选择过户日期"
          />
          <br />
        </div>
      </li>

      <li class="list">
        <div class="info-box">
          <van-cell center class="cell_title">
            <template #title>
              <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/info_man@2x.png'" size="22px" /> -->
              <van-icon name="contact" size="22px" />
              <span class="custom-title">车主信息</span>
            </template>
            <template #right-icon>
              <span style="opacity: 0.5">身份证识别</span>
              <idNoScan
                :params="{ code: 'idNo' }"
                @change="idNoInfoEvent($event)"
              ></idNoScan>
            </template>
          </van-cell>
          <van-field
            v-if="vehicleType == '1' || vehicleType == '2'"
            :value="carOwnerDTO.carOwnerNature.value.text"
            @click="showSelectPicker(carOwnerDTO.carOwnerNature)"
            readonly
            label="车主性质"
            placeholder="请选择车主性质"
            right-icon="arrow"
          />
          <van-field
            v-model="carOwner"
            @input="updataFrom($event, 'car/updateCarOwner')"
            :label="
              carOwnerDTO.carOwnerNature.value.value == 1
                ? '机关名称'
                : carOwnerDTO.carOwnerNature.value.value == 2
                ? '企业名称'
                : '姓名'
            "
            :placeholder="carOwnerDTO.carOwnerNature.value.value == 1 ? '请输入机关名称' : carOwnerDTO.carOwnerNature.value.value == 2 ? '请输入企业名称' : '请输入'"
          />
          <!-- :label="
              carOwnerDTO.carOwnerNature.value.value == 1
                ? '机关名称'
                : carOwnerDTO.carOwnerNature.value.value == 2
                ? '企业名称'
                : '姓名'
            " -->
          <van-field
            v-model="carOwnerIdNo"
            @input="updataFrom($event, 'car/updateCarOwnerIdNo')"
            maxlength="18"
            :label="'证件号码'"
            placeholder="请输入证件号码"
          />
          <ValidityIDcard v-if="vehicleType == '0' || (vehicleType == '1' && carOwnerDTO.carOwnerNature.value.value == '0') || (vehicleType == '2' && carOwnerDTO.carOwnerNature.value.value == '0')"  commitUrl="car/updateCarState" :startUrl="['carOwnerDTO', 'carOwnerIDStartDate']" :endUrl="['carOwnerDTO', 'carOwnerIDEndDate']" :startDate='propOrderVehicleDTO.carOwnerIDValidStartDate ? propOrderVehicleDTO.carOwnerIDValidStartDate : carOwnerDTO.carOwnerIDStartDate' :endDate='propOrderVehicleDTO.carOwnerIDValidEndDate ? propOrderVehicleDTO.carOwnerIDValidEndDate : carOwnerDTO.carOwnerIDEndDate'></ValidityIDcard>
          <br />
        </div>
      </li>

      <li class="list">
        <div class="info-box">
          <van-cell center class="cell_title">
            <template #title>
              <span class="custom-title">产品备案号</span>
            </template>
            <template #right-icon>
              <van-switch
                v-model="productRecord.checked"
                size="26"
                @input="
                  updateCarState(
                    ['productRecord', 'checked'],
                    productRecord.checked
                  )
                "
              />
            </template>
          </van-cell>
          <div
            style="margin: 0.8rem 0; line-height: 1.5em"
            v-if="productRecord.checked"
          >
            <template v-for="(item, index) in productRecord.list">
              <p style="text-align: center; font-size: 13px" :key="index">
                {{ item.name }}
              </p>
              <p
                style="text-align: center; font-size: 13px"
                :key="index + 1000"
              >
                {{ item.code }}
              </p>
            </template>
          </div>
        </div>
      </li>

      <li class="list">
        <p class="tips" v-if="!renewInsuranceQuery.checked && !transferFlag">
          {{ renewInsuranceQuery.tips }}
        </p>
        <br v-else />
        <van-button
          type="info"
          block
          color="linear-gradient(to right, #245cf6, #459cf8)"
          :disabled="
            disabled || (!renewInsuranceQuery.checked && !transferFlag)
          "
          @click="onsubmit"
          >下一步</van-button
        >
      </li>
      <div
        style="margin-top: 1rem"
        v-if="
          UserInfo.agentType == 2 ||
          UserInfo.agentType == 3 ||
          UserInfo.agentType == 4
        "
      >
        <companyTxt />
      </div>
    </ol>

    <carArea ref="carArea" @click="carAreaConfirm"></carArea>
    <datetimePicker
      ref="datetimePicker"
      @click="updataDatetime"
    ></datetimePicker>
    <!-- 品牌型号 -->
    <van-popup
      v-model="showBaselnfo"
      closeable
      round
      position="bottom"
      :style="{ height: '100vw' }"
    >
      <h4 class="showBaselnfo">请选择</h4>
      <div class="showBaselnfo_box">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              :key="index"
              :title="
                item.codeName +
                ' 价格¥' +
                item.purchasePrice +
                ' 座位数:' +
                item.seatCount
              "
              clickable
              @click="onSelect(index)"
            >
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- 车型 -->
    <van-popup
      v-model="motorcycleShow"
      closeable
      round
      position="bottom"
      :style="{ height: '100vw' }"
    >
      <h4 class="showBaselnfo">请选择</h4>
      <div class="showBaselnfo_box">
        <van-radio-group v-model="motorcycleRadio">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list2"
              :key="index"
              :title="item.modelName + '  价格¥' + item.actualValue"
              clickable
              @click="onMotorcycle(index)"
            >
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- 验车码 -->
    <van-overlay
      class="Code_checking_car"
      :show="show"
      @click="show = false"
      :style="{ top: $iosSystem + 46 + 'px' }"
    >
      <div @click.stop="show = !show">
        <!-- <div class="wrapper_div">
          <p class="fenxiang" @click="goSharePoster()">分 享</p>
        </div> -->
        <div class="wrapper" v-if="vehicleType != '1'" @click="fenx()">
          <van-icon class="name" :name="img" size="16" />
          <p>分享</p>
        </div>
        <van-divider style="margin: 0" />
        <div class="wrapper">
          <p class="name">验车码</p>
          <p>{{ checkCarCode }}</p>
        </div>
      </div>
    </van-overlay>
    <!-- 选择 -->
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
    <!-- 省市区 -->
    <areaPicker ref="areaPicker" @click="areaConfirm"></areaPicker>
    <!-- 车险分享弹窗选择 -->
    <van-action-sheet
      v-model="fenShow"
      :actions="actions"
      @select="onSelectFei"
    />
  </div>
</template>

<script>
import img from "./../../../public/img/account/fenx_bai.png";
import util from "../../assets/js/util/util";
import common from "../../assets/js/util/common";
import configJs from "./../../config.js";
import idNoScan from "./../../templates/idNoScan.vue";
import carInfoScan from "./../../templates/carInfoScan.vue";
import datetimePicker from "./../../templates/datetimePicker.vue";
import CodeInfo from "../../assets/json/CodeInfo";
import compCheck from "../../assets/js/util/comp-check";
import validator from "@/assets/js/util/validator";
import carArea from "../../templates/carArea";
import { mapState } from "vuex";
import glutton from "../../assets/js/util/glutton";
import selectPicker from "./../../templates/selectPicker.vue";
import areaPicker from "../../templates/areaPicker";
import PinchZoom from "pinch-zoom-js";
import companyTxt from "./../../templates/companyTxt.vue";
import dayjs from "dayjs";
import authCodeCar from "./temp/authCodeCar.vue"
import ValidityIDcard from './temp/ValidityIDcard.vue';
import state from '../../store/modules/car/state';

export default {
  components: {
    idNoScan,
    carInfoScan,
    datetimePicker,
    carArea,
    selectPicker,
    areaPicker,
    companyTxt,
    authCodeCar,
    ValidityIDcard,
  },
  data() {
    return {
      shareUrl: "",
      newCar: false,
      img: img,
      title: this.$route.meta.title,
      disabled: false,
      showBaselnfo: false,
      motorcycleShow: false,
      motorcycleRadio: "",
      list: [],
      list2: [],
      radio: "",
      listData: "",
      fuelTypeDescribe: "", // 其他能源（燃料）种类描述
      frameNo: "", // 车架号
      engineNo: "", // 发动机号
      carOwner: "", // 车主姓名
      carOwnerIdNo: "", // 车主证件号码
      licenseNoValue: "", // 车牌号
      show: false,
      checkCarCode: "", //验车码
      fenShow: false,
      actions: [{ name: "分享产品" }, { name: "分享转录" }],
      businessSetUrl: {},
      sysAgentExpandDTO: {},
      agreement: "",
    };
  },
  computed: {
    ...mapState({
      applyInfoDTO: state => state.car.applyInfoDTO,
      insureInfoDTO: state => state.car.insureInfoDTO,
      propOrderVehicleDTO: (state) => state.car.propOrderVehicleDTO, // 车主证件起止期
      orderAppntDTO: (state) => state.car.orderAppntDTO,
      policyInsuredDTOList: (state) => state.car.policyInsuredDTOList,
      orderNo: (state) => state.car.orderNo,
      vehicleDTO: (state) => state.car.vehicleDTO,
      carOwnerDTO: (state) => state.car.carOwnerDTO,
      fuelCategory: (state) => state.car.fuelCategory, // 能源种类
      pureElectricBatteryType: state => state.car.pureElectricBatteryType, // 纯电动电池类型
      carTypeDTO: (state) => state.car.carTypeDTO,
      commercialInsuranceStartDate: (state) =>
        state.car.commercialInsuranceStartDate,
      compulsoryInsuranceStartDate: (state) =>
        state.car.compulsoryInsuranceStartDate,
      VehicleInsurance: (state) => state.car.VehicleInsurance,
      carInsureEntry: (state) => state.car.carInsureEntry,
      licenseNo: (state) => state.car.carInsureEntry.licenseNo,
      isLicenseNo: (state) => state.car.carInsureEntry.isLicenseNo,
      licenseName: (state) => state.car.carInsureEntry.licenseName,
      transferFlag: (state) =>
        state.car.carInsureEntry.transferFlag == 1 ? true : false,
      transferDate: (state) => state.car.carInsureEntry.transferDate,
      UserInfo: (state) => state.my.UserInfo,
      saveProposal: (state) => state.car.saveProposal,
      licensePlateType: (state) => state.car.licensePlateType,
      RiskPlan: (state) => state.car.insuranceTypes,
      carPrice: (state) => state.car.carPrice,
      renewInsuranceQuery: (state) => state.car.renewInsuranceQuery,
      decisionUnitValue: (state) => state.my.decisionUnitValue,
      productRecord: (state) => state.car.productRecord,
      useNatureCode: (state) => state.car.useNatureCode,
      trucksUseNatureCode: (state) => state.car.trucksUseNatureCode, // 货车使用性质
      carKindCode: (state) => state.car.carKindCode,
      vehicleCategory: (state) => state.car.vehicleCategory,
      licenseCategory: (state) => state.car.licenseCategory,
      licenseColor: (state) => state.car.licenseColor,
      vehicleType: (state) => state.car.vehicleType,
      mYdecisionUnit: (state) => state.my.myDecisionUnit, //决策单元数据
      getAgreement: (state) => state.car.sysAgentExpandDTO,
      fuelTypeFalg: (state) => state.car.fuelTypeFalg,
      isFuelType: (state) => state.car.isFuelType,
      motorbikeUseNatureCode: (state) => state.car.motorbikeUseNatureCode, // 摩托车使用性质
      motorbikeKindCode: (state) => state.car.motorbikeKindCode, // 摩托车类型
      motorbikeDescribe: (state) => state.car.motorbikeDescribe, // 摩托车描述
      motorbikeLicenseColor: (state) => state.car.motorbikeLicenseColor, // 摩托车号牌颜色
      saleAreaCode: (state) => state.car.saleAreaCode,
    }),
    clausesContent: {
      get() {
        return this.$store.state.car.carTypeDTO.clausesContent;
      },
      set(value) {
        this.$store.commit("car/updateCarState", [
          { name: ["carTypeDTO", "clausesContent"], value },
        ]);
      },
    },
    // 是否4s销售
    sale4SFlag: {
      get() {
        return this.$store.state.car.vehicleDTO.sale4SFlag;
      },
      set(value) {
        this.$store.commit("car/updateCarState", [
          { name: ["vehicleDTO", "sale4SFlag"], value },
        ]);
      },
    },
    // banner图片
    carBanner: {
      get() {
        return this.$store.state.car.carBanner;
      },
      set(value) {
        this.$store.commit("car/updateCarState", [
          { name: ["carBanner"], value },
        ]);
      },
    },
    // 整备质量
    completeKerbMass: {
      get() {
        return this.$store.state.car.carTypeDTO.completeKerbMass
      },
      set(value) {  
        this.$store.commit('car/updateCarState', [{ name: ['carTypeDTO', 'completeKerbMass'], value }]);
      }
    },

    //新车判断:注册时间再加9个月,大于等于当前时间
    isNewCar() {
      if (this.$store.state.car.vehicleDTO.enrollDate) {
        return (
          dayjs(this.$store.state.car.vehicleDTO.enrollDate)
            .add(9, "month")
            .diff(new Date()) > 0
        );
      } else {
        return false;
      }
    },
  },
  created() {
      if(localStorage.getItem('agreement')){
        this.$store.state.my.newBusiness = JSON.parse(localStorage.getItem('agreement'))
      }
      if(this.$store.state.car.carTypeDTO.fuelType){
        this.getPropCarProduct()
      }
     //测试URL数据
      //  let testUrl = "https://devyun.guorenpcic.com/rbt-h5/#/carInsurance?token=ba648b97944c466586271543e252fdb3&businessType=1&agreementNo=P087300002001-02&proxyName=%E4%BD%95%E4%BC%9A%E6%B2%BE&proxyCode=P087300002001&agreementOwner=&codeCode=0800G012107163277&codeName=1126%E6%A0%87%E5%87%86%E4%BB%B6%E4%B8%AA%E5%AE%A2&unitmainTenanceTypeOne=G&unitmainTenanceTypeOneName=%E4%B8%AA%E5%8D%95&unitmainTenanceTypeTwo=01&unitmainTenanceTypeTwoName=%E8%87%AA%E6%9C%89%E4%B8%9A%E5%8A%A1%E5%91%98%E4%B8%9A%E5%8A%A1%EF%BC%88%E6%A0%87%E5%87%86%E4%BB%B6%EF%BC%89"
      //   let t1 = decodeURI(testUrl)
      //  console.log("xxx",t1);

    //链接上有归属信息就从链接传参
    if (window.location.href.indexOf("token") != -1) {
      let test2 = decodeURIComponent(document.URL);
      let arrUrl = this.urlToJson(test2);
      if (arrUrl) {
        delete arrUrl.token;
        this.$store.state.my.newBusiness = arrUrl;
      }
    }

    //分享链接带归属
    this.shareUrl = `${
      configJs.config.http_base + configJs.config.ctx_base
    }/#/carInsurance?token=${localStorage.token}&`;
    Object.keys(this.$store.state.my.newBusiness).map((key) => {
      this.shareUrl += key + "=" + this.$store.state.my.newBusiness[key] + "&";
    });

    this.shareUrl = this.shareUrl.substring(this.shareUrl.length - 1, 0);
    let test0 = encodeURI(this.shareUrl);

    if (util.getLocalStorageObj("transcribePhone")) {
      common.goShare({
        shareTitle: "车险产品下单(转录)",
        shareText: "车险",
        shareUrl: test0,
        shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
      });
    } else {
      common.goShare({
        shareTitle: "车险产品下单",
        shareText: "车险",
        shareUrl: test0,
        shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
      });
    }

    this.$store.commit("car/updateCarState", [
      {
        name: ["vehicleType"],
        value: this.$route.query.vehicleType == "02" ? "1" : this.$route.query.vehicleType == '03' ? '2' : '0',
      },
    ]);

    // 处理号牌种类默认值
    // if (!this.orderNo && this.vehicleType == "1") {
    //   this.$store.commit("car/updateCarState", [
    //     {
    //       name: ["licensePlateType", "struct", "value"],
    //       value: [
    //         ...this.licensePlateType.struct.data,
    //         ...this.licensePlateType.struct.shangHaiData,
    //       ].filter((item) => {
    //         return item.value == "01";
    //       })[0],
    //     },
    //   ]);
    // }

    glutton.startRecording(); // 回溯录制

    this.frameNo = this.vehicleDTO.frameNo;
    this.fuelTypeDescribe = this.carTypeDTO.fuelTypeDescribe
    this.engineNo = this.vehicleDTO.engineNo;
    this.carOwner = this.carOwnerDTO.carOwner;
    this.carOwnerIdNo = this.carOwnerDTO.carOwnerIdNo;
    this.licenseNoValue = this.licenseNo;

    this.getExamineCar();
    this.getInitCarTime();
    this.$store.dispatch("my/getUserInfo");
    this.$store.commit("car/updataTryCalculation", {});

    util.setSessionStorageObj("getUserInfoF", this.UserInfo);
    // 决策单元
    // if (!this.mYdecisionUnit.length) {
    //   this.$store.dispatch("my/getMyCarType", { codeType: "PrpdunitMain" });
    // }

    // 判断编辑
    if (this.saveProposal.length) {
      this.$store.commit("car/updateCarState", [
        { name: ["editType"], value: 1 },
      ]);
      for (let item of this.saveProposal) {
        if (item.riskMark == "0801") {
          // 交强险
          this.$store.commit("car/updateCarState", [
            { name: ["VehicleInsurance", "switchChecked"], value: true },
          ]);
        }
        if (item.riskMark == "0802") {
          // 商业险
          this.$store.commit("car/updateCarState", [
            { name: ["VehicleInsurance", "switchChecked1"], value: true },
          ]);
        }
      }
    }
    // this.$store.dispatch("my/getDecisionUnit"); //获取当前选中的决策单元
  },

  methods: {
    async getPropCarProduct(){
      let fuelType = this.$store.state.car.carTypeDTO.fuelType
      let maincarKindCode = this.$route.query.vehicleType == "02" ? "H" : this.$route.query.vehicleType == "03" ? "M" : "A"
      const res = await this.$axios({
        url:this.$API.API_GETPROPCARPRODUCT,
        method:"get",
        params:{
          fuelType,
          maincarKindCode
        }
      })
      let falg = this.$store.state.car.fuelTypeFalg
      if((res.code == 0 && res.content) && !falg){
        let insuranceType = JSON.parse(res.content)
        this.$store.state.car.insuranceTypes = JSON.parse(insuranceType)
        this.$store.state.car.fuelTypeFalg = true
        this.$store.state.car.isFuelType = fuelType
      }
      if(this.isFuelType != fuelType){
        this.$store.state.car.VehicleInsurance.active = 0
        let insuranceType = JSON.parse(res.content)
        this.$store.state.car.insuranceTypes = JSON.parse(insuranceType)
        this.$store.state.car.isFuelType = fuelType
      }
    },
    urlToJson(url = window.location.href) {
      // 箭头函数默认传值为当前页面url
      let obj = {},
        index = url.indexOf("?"), // 看url有没有参数
        params = url.substr(index + 1); // 截取url参数部分 name = aaa & age = 20

      if (index != -1) {
        // 有参数时
        let parr = params.split("&"); // 将参数分割成数组 ["name = aaa", "age = 20"]
        for (let i of parr) {
          // 遍历数组
          let arr = i.split("="); // 1） i name = aaa   arr = [name, aaa]  2）i age = 20  arr = [age, 20]
          obj[arr[0]] = arr[1]; // obj[arr[0]] = name, obj.name = aaa   obj[arr[0]] = age, obj.age = 20
        }
      }

      return obj;
    },

    fenx() {
      if (this.UserInfo.agentType == "1") {
        //专员才有分享转录
        this.fenShow = true;
      } else {
        this.goSharePoster();
      }
    },
    onSelectFei(item) {
      this.fenShow = false;
      if (item.name == "分享产品") {
        this.goSharePoster();
      }
      if (item.name == "分享转录") {
        this.goPage("wxSetShift?szMark=false&car=true");
        // this.shareHire()
      }
    },
    // 分享车险下单
    goSharePoster() {
      var address =
        configJs.config.http_base +
        configJs.config.ctx_base +
        "/#wxCarInsurance";
      let local = `${address}?agentCode=${localStorage.agentCode}&userCode=${this.UserInfo.userCode}`;
      let getShareUrl = this.$WxUrlAuthorize(local); //app分享才需要带上授权
      app.goShare({
        shareTitle: "i国任车险",
        shareText: "点击开始投保",
        shareImgUrl:
          configJs.config.http_base +
          configJs.config.ctx_base +
          "/img/page/base/feiXiangioc.png",
        shareUrl: getShareUrl,
      });
    },
    //车险验车码接口
    async getExamineCar() {
      const res = await this.$axios({
        url: this.$API.API_GETCHECKCARCODE,
        method: "get",
        params: {},
      });
      if (res.code == 0 && res.content.result == 0) {
        this.checkCarCode = res.content.data.checkCarCode;
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    // 续保查询
    async renewInsurance() {
      let licenseNo = "";
      if (!this.isLicenseNo) {
        licenseNo =
          this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo;
      }
      if (!licenseNo && !this.vehicleDTO.frameNo) {
        this.$toast("车牌号、车架号必填一项");
        return;
      }
      if (licenseNo && !compCheck.isVehicleNumber2(licenseNo)) {
        this.$toast("车牌号格式不正确");
        return;
      }
      if (
        this.vehicleDTO.frameNo &&
        !compCheck.isRackNo(this.vehicleDTO.frameNo)
      ) {
        return;
      }
      let renewInsuranceRes = await this.$store.dispatch("car/renewInsurance");
      if (renewInsuranceRes) {
        if(renewInsuranceRes.content.result == 0){
          let fuelTypeF = renewInsuranceRes.content.propOrderVehicleModelDTO.fuelType
          this.$store.state.car.fuelCategory.value = this.$store.state.car.fuelCategory.data[fuelTypeF]
        }
        if(this.propOrderVehicleDTO && this.propOrderVehicleDTO.carOwnerIDValidStartDate){
          this.carOwnerDTO.carOwnerIDStartDate = this.propOrderVehicleDTO.carOwnerIDValidStartDate
          this.carOwnerDTO.carOwnerIDEndDate = this.propOrderVehicleDTO.carOwnerIDValidEndDate
          this.applyInfoDTO.idNoStartDate = this.orderAppntDTO.appntIDValidStartDate
          this.applyInfoDTO.idNoEndDate = this.orderAppntDTO.appntIDValidEndDate
          this.insureInfoDTO.idNoStartDate = this.policyInsuredDTOList.insuredIDValidStartDate
          this.insureInfoDTO.idNoEndDate = this.policyInsuredDTOList.insuredIDValidEndDate
        }
        this.frameNo = this.vehicleDTO.frameNo;
        this.licenseNoValue = this.carInsureEntry.licenseNo;
        this.engineNo = this.vehicleDTO.engineNo;
        this.carOwner = this.carOwnerDTO.carOwner;
        this.carOwnerIdNo = this.carOwnerDTO.carOwnerIdNo;
      }
      if (renewInsuranceRes.code == 0) {
        this.$store.commit("car/updateCarState", [
          { name: ["renewInsuranceQuery", "checked"], value: true },
        ]);
      }
      this.getInitCarTime();
      this.getPropCarProduct()
    },
    // 查询车辆
    async queryVehicle() {
      if (
        !compCheck.isVehicleNumber2(
          this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo
        )
      ) {
        this.$toast("请输入正确的车牌号码！");
        return;
      }
      // this.vehicleType == "1" && !this.useNatureCode.value.value
      if (!this.useNatureCode.value.value) {
        this.$toast("请选择使用性质！");
        return;
      }
      if (this.vehicleType == "1" && !this.carKindCode.value.value) {
        this.$toast("请选择车辆种类！");
        return;
      }
      if (!this.licensePlateType.struct.value.value) {
        this.$toast("请选择号牌种类！");
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_GETCARINFOFORSH,
        method: "post",
        data: {
          licenseNo:
            this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo,
          licenseType: this.licensePlateType.struct.value.value,
          agentCode: localStorage.agentCode,
          useNatureCode:
            this.vehicleType == "1" ? this.useNatureCode.value.value : "8A",
          maincarKindCode: this.vehicleType == "1" ? "H" : "A",
          carKindCode:
            this.vehicleType == "1" ? this.carKindCode.value.value : "A0",
        },
      });
      if (res.code == 0 && res.content.result == 0) {
        if (res.content.data.length) {
          // 查询车辆
          let list = res.content.data.filter((item) => {
            item.text = `${item.carName} 价格¥${item.actualValue}`;
            item.codeCode = item.oldModelCode;
            item.codeName = item.carName;
            return item;
          });
          this.$refs.selectPicker.parentMsg({
            name: "查询车辆",
            struct: {
              data: list,
            },
          });
        } else {
          this.$toast("暂无查询数据");
        }
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    // 进口车查询
    async getCarVIN() {
      if (!compCheck.isRackNo(this.vehicleDTO.frameNo)) {
        return;
      }
      if (!this.vehicleDTO.engineNo) {
        this.$toast("请输入发动机号！");
        return;
      }
      if (
        !this.carInsureEntry.licenseName &&
        !this.carInsureEntry.isLicenseNo
      ) {
        this.$toast("请选择车牌号简称！");
        return;
      }
      if (!this.carInsureEntry.licenseNo && !this.carInsureEntry.isLicenseNo) {
        this.$toast("请输入车牌号码！");
        return;
      }
      if (
        this.carInsureEntry.licenseNo &&
        !this.carInsureEntry.isLicenseNo &&
        !compCheck.isVehicleNumber2(
          this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo
        )
      ) {
        this.$toast("请输入正确的车牌号码！");
        return;
      }
      const res = await this.$store.dispatch("car/getCarVIN", {
        frameNo: this.vehicleDTO.frameNo,
        engineNo: this.vehicleDTO.engineNo,
        licenseNo:
          this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo,
        comCode: localStorage.handlerAgentOrgCode,
      });
      if (res.code == 0 && res.content.result == 0) {
        if (res.content.data.length) {
          this.list = res.content.data;
          this.showBaselnfo = true;
          this.radio = "";
        } else {
          this.$toast("暂无查询数据");
        }
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    // 初始化起保日期
    getInitCarTime() {
      this.$store.commit("car/updataCarPriceTime", "");
      if (!this.commercialInsuranceStartDate) {
        this.$store.commit(
          "car/commercialInsuranceStartDate",
          compCheck.getDateByDays(1) + " 00:00:00"
        );
      }
      if (!this.compulsoryInsuranceStartDate) {
        this.$store.commit(
          "car/compulsoryInsuranceStartDate",
          compCheck.getDateByDays(1) + " 00:00:00"
        );
      }
    },
    onSelect(index) {
      this.showBaselnfo = false;
      this.radio = index;
      this.$store.commit("car/updataCarTypeDTO", this.list[index]);
      this.getPropCarProduct()
    },
    //调用搜索接口
    async getCarType(value) {
      const res = await this.$store.dispatch("car/getCarType", {
        codeValue: value,
      });
      if (res.code == 0 && res.content.result == 0) {
        if (res.content.data.length > 0) {
          this.list = res.content.data;
          this.showBaselnfo = true;
          this.radio = "";
        } else {
          this.$store.commit("car/updataCarTypeDTO", { name: value });
        }
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    // 身份信息识别
    idNoInfoEvent(obj) {
      this.updataFrom(obj.name, "car/updateCarOwner");
      this.updataFrom(obj.idNo, "car/updateCarOwnerIdNo");
      this.updataFrom(obj.address, "car/updateAddress");
      this.$store.commit("car/updateCarState", [
        {
          name: ["carOwnerDTO", "carOwnerNature", "value"],
          value: this.carOwnerDTO.carOwnerNature.data[0],
        },
      ]);
    },
    // 车辆信息识别
    carInfoEvent(obj) {
      this.carBanner = obj.imageUrl;
      this.updataFrom(obj.vin, "car/updateFrameNo");
      this.updataFrom(obj.engine_num, "car/updateEngineNo");
      if (obj.plate_num) {
        this.$store.commit("car/updateCarState", [
          {
            name: ["carInsureEntry", "licenseName"],
            value: obj.plate_num.substring(0, 1),
          },
          {
            name: ["carInsureEntry", "licenseNo"],
            value: obj.plate_num.substring(1, 8),
          },
          { name: ["carInsureEntry", "isLicenseNo"], value: false },
        ]);
        this.licenseNoValue = this.carInsureEntry.licenseNo;
      }

      //处理品牌型号
      if (obj.model) {
        //去除中文（牌这个字）
        var reg = /[\u724c]/g;
        var str = obj.model;
        str = str.replace(/[ ]/g, ""); //去空格
        str = str.replace(reg, ""); //去除中文 牌字
        this.getCarType(str);
      }
      //处理车辆发证日期
      if (obj.issue_date) {
        let data =
          obj.issue_date.slice(0, 4) +
          "-" +
          obj.issue_date.slice(4, 6) +
          "-" +
          obj.issue_date.slice(6, 8);
        if (validator.verifyDataFormat(data)) {
          this.$store.commit("car/updataDatetime", data);
        }
      }
      //处理车辆注册日期
      if (obj.register_date) {
        let data =
          obj.register_date.slice(0, 4) +
          "-" +
          obj.register_date.slice(4, 6) +
          "-" +
          obj.register_date.slice(6, 8);
        if (validator.verifyDataFormat(data)) {
          this.$store.commit("car/updataEnrollDate", data);
        }
      }
      // 上海显示号牌种类、深圳显示号牌种类
      if (
        (this.vehicleType == "0" && this.UserInfo.manageCode == "07000000") ||
        this.UserInfo.manageCode == "09000000"
      ) {
        this.$store.commit("car/updateCarState", [
          {
            name: ["licensePlateType", "struct", "value"],
            value:
              this.licensePlateType.struct.data[
                obj.plate_num.length == 7 ? 0 : 1
              ],
          },
        ]);
      }

      setTimeout(() => {
        new PinchZoom(document.getElementById("vhtml"), {});
      }, 300);
    },
    updataFrom(value, name) {
      if (name == "car/updateFrameNo") {
        value = value.replace(/[\u4E00-\u9FA5]/g, "").toUpperCase();
        this.frameNo = value;
      } else if (name == "car/updateEngineNo") {
        value = value.toUpperCase();
        this.engineNo = value;
      } else if (name == "car/updateCarOwner") {
        this.carOwner = value;
      } else if (name == "car/updateCarOwnerIdNo") {
        value = value.replace(/[\W]/g, "").toUpperCase();
        this.carOwnerIdNo = value;
      }
      this.$store.commit(name, value);
    },
    updataDatetime(params) {
      this.$store.commit(params.url, params.datetime);
    },
    showDataTimePicker(params) {
      this.$refs.datetimePicker.parentMsg(params);
    },

    async onsubmit() {
      this.disabled = true;
      //浙江决策单元如果是空就要必选才能进行下一步
      if (
        this.UserInfo.manageCode == "19000000" &&
        this.decisionUnitValue == ""
      ) {
        this.$toast("请选择决策单元！");
        this.disabled = false;
        return;
      }
      // 新车处理
      if (this.isLicenseNo) {
        this.$store.commit("car/updateLicenseName", "");
        this.$store.commit("car/updateLicenseNo", "新车");
      }
      if (!compCheck.isRackNo(this.vehicleDTO.frameNo)) {
        this.disabled = false;
        return;
      }
      if (!this.vehicleDTO.engineNo) {
        this.$toast("请输入发动机号！");
        this.disabled = false;
        return;
      }
      if (
        !this.carInsureEntry.licenseName &&
        !this.carInsureEntry.isLicenseNo
      ) {
        this.$toast("请选择车牌号简称！");
        this.disabled = false;
        return;
      }
      if (!this.carInsureEntry.licenseNo && !this.carInsureEntry.isLicenseNo) {
        this.$toast("请输入车牌号码！");
        this.disabled = false;
        return;
      }
      if (
        this.carInsureEntry.licenseNo &&
        !this.carInsureEntry.isLicenseNo &&
        !compCheck.isVehicleNumber2(
          this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo
        )
      ) {
        this.$toast("请输入正确的车牌号码！");
        this.disabled = false;
        return;
      }
      if (!this.carTypeDTO.seatCount) {
        this.$toast(
          this.vehicleType == "1" ? "请输入核定载客数！" : "请输入座位数"
        );
        this.disabled = false;
        return;
      }
      if (!this.carTypeDTO.codeName) {
        this.$toast("请选择品牌型号！");
        this.disabled = false;
        return;
      }
      if (!this.clausesContent) {
        this.$toast("请输入打印厂牌型号！");
        this.disabled = false;
        return;
      }


      /* 
       0 燃油
       1 纯电动
       2 燃料电池
       3 插电式混合动力
       4 其他混合动力
       9 其他
      */
      if (!this.carTypeDTO.fuelType) {
        this.$toast('请选择能源种类！'); this.disabled = false;
        return;
      }

      if (this.carTypeDTO.fuelType == '9' && !this.fuelTypeDescribe) {
        this.$toast('请输入能源（燃料）种类描述！'); this.disabled = false;
        return;
      }
      if (!this.vehicleDTO.purchaseDate) {
        this.$toast("请选择发证日期！");
        this.disabled = false;
        return;
      }
      if (!this.vehicleDTO.enrollDate) {
        this.$toast("请选择注册日期！");
        this.disabled = false;
        return;
      }
      if (
        this.carInsureEntry.transferFlag &&
        !this.carInsureEntry.transferDate
      ) {
        this.$toast("请选择过户日期！");
        this.disabled = false;
        return;
      }
      // 货车
      if (this.$store.state.car.vehicleType == "1") {
        if(this.carTypeDTO.seatCount <= 0){
          this.$toast(
          this.vehicleType == "1" ? "请输入正确的核定载客数！" : "请输入正确的座位数"
        );
        return
        }
        if(!this.completeKerbMass){
          this.$toast("请输入整备质量！")
          this.disabled = false;
          return;
        }
        if(this.completeKerbMass <= 0){
          this.$toast("请输入正确的整备质量！")
          this.disabled = false;
          return
        }
        if(!this.carTypeDTO.tonCount){
          this.$toast("请输入核定载质量！")
          this.disabled = false;
          return;
        }
        if(this.carTypeDTO.tonCount <= 0){
          this.$toast("请输入正确的核定载质量！")
          this.disabled = false;
          return
        }
        if(!this.carKindCode.value.value){
          this.$toast("请选择车辆种类！")
          this.disabled = false;
          return;
        }
        if(!this.vehicleCategory.value.value){
          this.$toast("请选择车辆类型！")
          this.disabled = false;
          return;
        }
        if(!this.licenseCategory.value.value){
          this.$toast("请选择车辆类型描述！")
          this.disabled = false;
          return;
        }
        if(!this.licenseColor.value.value){
          this.$toast("请选择号牌颜色！")
          this.disabled = false;
          return;
        }
        if (!this.carOwnerDTO.carOwner) {
          if(this.carOwnerDTO.carOwnerNature.value.value == 1){
            this.$toast("请输入机关名称")
          }else if(this.carOwnerDTO.carOwnerNature.value.value == 2 ){
            this.$toast("请输入企业名称")
          }else{
            this.$toast("请输入姓名！");
          }
          this.disabled = false;
          return;
        }
        if (!this.carOwnerDTO.carOwnerIdNo) {
          this.$toast("请输入证件号码！");
          this.disabled = false;
          return;
        } else {
          if(this.carOwnerDTO.carOwnerNature.value.value == 1 || this.carOwnerDTO.carOwnerNature.value.value == 2){
            if(this.carOwnerDTO.carOwnerIdNo.length === 18){
              if(!compCheck.creditCode(this.carOwnerDTO.carOwnerIdNo)){
                this.disabled = false;
                return;
              }
            }else if(this.carOwnerDTO.carOwnerIdNo.length === 9){
              if(!compCheck.organization(this.carOwnerDTO.carOwnerIdNo)){
                this.disabled = false;
                return;
              }
            }else {
              this.$toast("请输入正确的证件号码");
              this.disabled = false;
              return;
            }
          }else {
            if (!compCheck.isName(this.carOwnerDTO.carOwner)) {
              this.disabled = false;
              return;
            }
            if (!compCheck.isIdno(this.carOwnerDTO.carOwnerIdNo)) {
              this.disabled = false;
              return;
            }
          }
        }
      } else if (this.$store.state.car.vehicleType == "2") {
        if(this.carTypeDTO.seatCount <= 0){
          this.$toast("请输入正确的座位数");
          return
        }
        if(!this.motorbikeKindCode.value.value){ // 1
          this.$toast("请选择车辆种类！")
          this.disabled = false;
          return;
        }
        if(!this.motorbikeDescribe.value.value){ //1
          this.$toast("请选择车辆类型描述！")
          this.disabled = false;
          return;
        }
        if(!this.motorbikeLicenseColor.value.value){ //1
          this.$toast("请选择号牌颜色！")
          this.disabled = false;
          return;
        }
        if (!this.carOwnerDTO.carOwner) {
          if(this.carOwnerDTO.carOwnerNature.value.value == 1){
            this.$toast("请输入机关名称")
          }else if(this.carOwnerDTO.carOwnerNature.value.value == 2 ){
            this.$toast("请输入企业名称")
          }else{
            this.$toast("请输入姓名！");
          }
          this.disabled = false;
          return;
        }
        if (!this.carOwnerDTO.carOwnerIdNo) {
          this.$toast("请输入证件号码！");
          this.disabled = false;
          return;
        } else {
          if(this.carOwnerDTO.carOwnerNature.value.value == 1 || this.carOwnerDTO.carOwnerNature.value.value == 2){
            if(this.carOwnerDTO.carOwnerIdNo.length === 18){
              if(!compCheck.creditCode(this.carOwnerDTO.carOwnerIdNo)){
                this.disabled = false;
                return;
              }
            }else if(this.carOwnerDTO.carOwnerIdNo.length === 9){
              if(!compCheck.organization(this.carOwnerDTO.carOwnerIdNo)){
                this.disabled = false;
                return;
              }
            }else {
              this.$toast("请输入正确的证件号码");
              this.disabled = false;
              return;
            }
          }else {
            if (!compCheck.isName(this.carOwnerDTO.carOwner)) {
              this.disabled = false;
              return;
            }
            if (!compCheck.isIdno(this.carOwnerDTO.carOwnerIdNo)) {
              this.disabled = false;
              return;
            }
          }
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
      if ((this.vehicleType == '0' || this.carOwnerDTO.carOwnerNature.value.value == '0') && !this.carOwnerDTO.carOwnerIDStartDate) {
        this.$toast('请选择证件有效起期'); 
        this.disabled = false;
        return;
      }
       // 客车 || 货车车主是个人
      if ((this.vehicleType == '0' || this.carOwnerDTO.carOwnerNature.value.value == '0') && !this.carOwnerDTO.carOwnerIDEndDate) {
        this.$toast('请选择证件有效止期'); 
        this.disabled = false;
        return;
      }
      // 广东分公司验证 20210316
      if (
        this.isNewCar &&
        this.UserInfo.manageCode == "08000000" &&
        !this.vehicleDTO.saleCompany
      ) {
        this.$toast("请输入新车销售公司名称");
        this.disabled = false;
        return;
      }
      if (
        this.isNewCar &&
        this.UserInfo.manageCode == "08000000" &&
        !this.saleAreaCode.value.text
      ) {
        this.$toast("请选择新车销售公司所在地");
        this.disabled = false;
        return;
      }
      // 上海显示号牌种类、深圳显示号牌种类
      if (
        (this.UserInfo.manageCode == "07000000" ||
          this.UserInfo.manageCode == "09000000") &&
        !this.licensePlateType.struct.value.text
      ) {
        this.$toast("请选择号牌种类");
        this.disabled = false;
        return;
      }
      // 上海机构是新车该字段必填
      if (
        this.UserInfo.manageCode == "07000000" &&
        this.isLicenseNo &&
        !this.vehicleDTO.businessDate
      ) {
        this.$toast("请选择购车发票日期");
        this.disabled = false;
        return;
      }
      // 河北（包含河北供销商贸专版）、青岛增加行驶证地址 15000000-河北 11000000-青岛分公司
      if (
        (this.UserInfo.manageCode == "15000000" ||
          this.UserInfo.manageCode == "11000000") &&
        this.carInsureEntry.address.length != 3
      ) {
        this.$toast("请选择行驶证地址");
        this.disabled = false;
        return;
      }

      let renewNo = [];
      if (
        this.$store.state.renewedInsurance.car.renewalDetail.policyBI &&
        this.$store.state.renewedInsurance.car.renewalDetail.policyBI
          .corePolicyNo
      ) {
        renewNo.push(
          this.$store.state.renewedInsurance.car.renewalDetail.policyBI
            .corePolicyNo
        );
      }
      if (
        this.$store.state.renewedInsurance.car.renewalDetail.policyCI &&
        this.$store.state.renewedInsurance.car.renewalDetail.policyCI
          .corePolicyNo
      ) {
        renewNo.push(
          this.$store.state.renewedInsurance.car.renewalDetail.policyCI
            .corePolicyNo
        );
      }
      let data = {
        orderNo: this.$store.state.car.orderNo,
        agentCode: localStorage.agentCode,
        carTypeDTO: this.$store.state.car.carTypeDTO,        
        carOwnerDTO: {
          iDValidStartDate:this.carOwnerDTO.carOwnerIDStartDate,
          iDValidEndDate:this.carOwnerDTO.carOwnerIDEndDate,
          iDValidDateLongFlag:this.carOwnerDTO.carOwnerIDEndDate=='2999-12-31' ? '1' : '0',
          carOwner: this.carOwnerDTO.carOwner,
          carOwnerNature: this.carOwnerDTO.carOwnerNature.value.value,
          carOwnerIdType:
            this.carOwnerDTO.carOwnerNature.value.value == "0" ? "0" : this.carOwnerDTO.carOwnerIdNo.length == '18' ? '74' : '12',
          carOwnerIdNo: this.carOwnerDTO.carOwnerIdNo,
          address: this.carOwnerDTO.address,
        },
        renewNo: renewNo.join(","),
        traceNo: window.GluttonContext.traceNo,
        vehicleDTO: {
          licenseNo:
            this.carInsureEntry.licenseName + this.carInsureEntry.licenseNo,
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
        sysAgentExpandDTO: this.$store.state.my.newBusiness, // 业务信息
        // transcribePhone:
      };
      if (util.getSessionStorageObj("transcribePhone")) {
        data.transcribePhone = util.getSessionStorageObj("transcribePhone");
        if (util.getSessionStorageObj("transcribeName")) {
          data.transcribeName = util.getSessionStorageObj("transcribeName");
        }
      }
      // 广东分公司验证 20210316
      if (this.UserInfo.manageCode == "08000000" && this.isNewCar) {
        data.carTypeDTO.saleCompany = this.vehicleDTO.saleCompany;
        data.carTypeDTO.saleAreacode = this.saleAreaCode.value.value;
        data.carTypeDTO.saleFlag = this.vehicleDTO.sale4SFlag ? "1" : "0";
      }
      // 上海显示号牌种类、深圳显示号牌种类
      if (
        this.UserInfo.manageCode == "07000000" ||
        this.UserInfo.manageCode == "09000000" ||
        this.vehicleType == "1"
      ) {
        data.vehicleDTO.licenseType = this.licensePlateType.struct.value.value;
      }
      // 上海机构是新车该字段必填
      if (this.UserInfo.manageCode == "07000000" && this.isLicenseNo) {
        data.vehicleDTO.businessDate = this.vehicleDTO.businessDate;
      }
      // 河北（包含河北供销商贸专版）、青岛增加行驶证地址 15000000-河北 11000000-青岛分公司
      if (
        this.UserInfo.manageCode == "15000000" ||
        this.UserInfo.manageCode == "11000000"
      ) {
        data.vehicleDTO.ownerProvinceName = this.carInsureEntry.address[0].name;
        data.vehicleDTO.ownerCityName = this.carInsureEntry.address[1].name;
        data.vehicleDTO.ownerAddress = this.carInsureEntry.address[2].name;
        data.vehicleDTO.address = JSON.stringify(this.carInsureEntry.address);
      }
      // 货车
      if (this.$store.state.car.vehicleType == "1") {
        data.vehicleDTO.useNatureCode = this.trucksUseNatureCode.value.value;
        data.vehicleDTO.maincarKindCode = "H";
        data.vehicleDTO.carKindCode = this.carKindCode.value.value;
        data.vehicleDTO.vehicleCategory = this.vehicleCategory.value.value;
        data.vehicleDTO.licenseCategory = this.licenseCategory.value.value;
        data.vehicleDTO.licenseColor = this.licenseColor.value.value;
      } else if(this.$store.state.car.vehicleType == "2"){
        // 摩托车
        data.vehicleDTO.useNatureCode = this.motorbikeUseNatureCode.value.value; // 使用性质
        data.vehicleDTO.maincarKindCode = "M";
        data.vehicleDTO.carKindCode = this.motorbikeKindCode.value.value; // 车辆种类
        data.vehicleDTO.vehicleCategory = this.vehicleCategory.value.value;; // 车辆类型
        data.vehicleDTO.licenseCategory = this.motorbikeDescribe.value.value; // 车辆类型描述
        data.vehicleDTO.licenseColor = this.motorbikeLicenseColor.value.value; // 号牌颜色
        data.vehicleDTO.licenseType = this.licensePlateType.struct.value.value // 号牌种类
      } else {
        // 客车 --- 使用性质
        data.vehicleDTO.useNatureCode = this.useNatureCode.value.value;
      }
      if(this.$store.state.car.fuelCategory.value.value == '9'){
        data.vehicleDTO.fuelTypeDescribe = this.fuelTypeDescribe
      }
      const res = await this.$axios({
        url: this.$API.API_CARBASICINFOENTRY,
        method: "post",
        data,
      });
      if (res.code == 0 && res.content.result == 0) {
        this.$store.commit("car/updataOrderNo", res.content.data.orderNo);
        /**
         * 车价报文
         */
        let data = {
          orderNo: this.orderNo,
          agentCode: localStorage.agentCode,
        };
        let CarPrice = await this.$store.dispatch("car/getCarPrice", {
          data: data,
          url: this.$API.API_GETCARPRICE,
          page: "carBaseInfo",
        });
        this.disabled = false;
        if (CarPrice.code == 0 && CarPrice.content.result == "0") {
          this.listData = JSON.parse(CarPrice.content.data);
          if (this.listData.cars) {
            //多个车架
            this.listData.cars.forEach((item) => {
              item.modelName = item.modelName || item.carName;
            });
            this.list2 = this.listData.cars;
            this.motorcycleShow = true;
          } else {
            //正常流程
            this.$store.commit("car/updataCarPrice", this.listData);
            this.operate20A();
            this.goPage("carVehicleInsurance");
          }
        }
      } else {
        this.disabled = false;
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    onMotorcycle(index) {
      this.motorcycleShow = false;
      this.motorcycleRadio = index;
      this.multiCarriage();
    },
    //有多个车架时调用
    async multiCarriage() {
      let data = {
        orderNo: this.$store.state.car.orderNo,
        uuid: this.listData.inputvo,
        carPriceQueryRespVo: this.listData.cars[this.motorcycleRadio],
      };
      let res = await this.$store.dispatch("car/getCarPrice", {
        data: data,
        url: this.$API.API_GERPRICEMORETYPE,
        page: "carBaseInfo",
      });
      if (res.code == 0 && res.content.result == 0) {
        this.$store.commit("car/updataCarPrice", JSON.parse(res.content.data));
        this.operate20A();
        this.goPage("carVehicleInsurance");
      }
    },
    // 机动车损失保险
    operate20A() {
      console.log("this.carPrice", this.carPrice);
      this.RiskPlan.forEach((item, index) => {
        if (item.kindCode == "20A" || item.kindCode == '21A' && item.amount) {
          this.$store.commit("car/updateCarState", [
            {
              name: ["insuranceTypes", index, "amount"],
              value: this.carPrice.actualValue,
            },
          ]);
        }
      });
    },
    updateLicenseNo(value) {
      value = value.replace(/[^\w\.\/]/gi, "").toUpperCase();
      this.licenseNoValue = value;
      this.$store.commit("car/updateLicenseNo", value);
    },
    updateTransferFlag(value) {
      this.$store.commit("car/updateTransferFlag", value ? 1 : 0);
    },
    updateIsLicenseNo(value) {
      this.$store.commit("car/updateLicenseName", "");
      this.licenseNoValue = "";
      if (value) {
        this.$store.commit("car/updateLicenseNo", "新车");
      } else {
        this.$store.commit("car/updateLicenseNo", "");
      }
      this.$store.commit("car/updateIsLicenseNo", value);
    },
    showDatetimePicker(params) {
      this.$refs.datetimePicker.parentMsg(params);
    },
    // 车牌号简称选择
    showCarArea() {
      this.$refs.carArea.parentMsg();
    },
    carAreaConfirm(value) {
      this.$store.commit("car/updateLicenseName", value);
    },
    renewInsuranceSet() {
      this.$store.commit("car/updateCarState", [
        { name: ["renewInsuranceQuery", "checked"], value: false },
      ]);
    },
    updateCarState(params, value) {
      this.$store.commit("car/updateCarState", [{ name: params, value }]);
    },
    showSelectPicker(data, str) {
      if (data) {
        this.$refs.selectPicker.parentMsg({ struct: data }, str);
      } else {
        this.$refs.selectPicker.parentMsg({
          struct: this.saleAreaCode,
        });
          console.log(this.saleAreaCode,'111111111111');
      }
    },
    showSelectDecision(name, list) {
      if (!list || list.length == 0) {
        this.$toast("暂无数据！");
        return;
      }
      this.$refs.selectPicker.parentMsg({ name: name, struct: { data: list } });
    },
    showLicensePlateType() {
      let struct = {
        data: this.licensePlateType.struct.data,
        value: this.licensePlateType.struct.value,
      };
      if (this.vehicleType == "1") {
        struct = {
          data: [
            ...this.licensePlateType.struct.data,
            ...this.licensePlateType.struct.shangHaiData,
          ],
          value: this.licensePlateType.struct.value,
        };
      } else if (this.vehicleType == '2'){
        struct = {
          data: this.licensePlateType.struct.motorcycle,
          value: this.licensePlateType.struct.value
        }
      }
      this.$refs.selectPicker.parentMsg({
        name: this.licensePlateType.name,
        struct,
      });
    },
    updataSelectPicker(params, str) {
      console.log(params, str);
      if (params.name == "my/updmYdecisionUnit") {
        //选中的决策单元
        // this.codeName = params.struct.value.codeName
        // this.unitList = params.struct.value
        this.saveDecision(params.struct.value);
      } else if (params.name == "查询车辆") {
        this.queryCar(params.struct.value);
      } else if (params.name == "号牌种类") {
        this.$store.commit("car/updateCarState", [
          {
            name: ["licensePlateType", "struct", "value"],
            value: params.struct.value,
          },
        ]);
      } else if (str == "使用性质") {
        this.$store.commit("car/updateCarState", [
          {
            name: ["useNatureCode", "value"],
            value: params.struct.value,
          },
        ]);
      } else if (str == "号牌颜色"){
        this.$store.commit("car/updateCarState", [
          {
            name: ["motorbikeLicenseColor", "value"],
            value: params.struct.value,
          },
        ]);
      } else if (str == '新车销售公司所在地'){
        this.$store.commit("car/updateCarState", [
          {
            name: ["saleAreaCode", "value"],
            value: params.struct.value,
          },
        ]);
      }
    },
    // 查询车辆信息处理
    queryCar(params) {
      this.$store.commit("car/updateCarState", [
        { name: ["vehicleDTO", "engineNo"], value: params.engineNo || "" },
        { name: ["vehicleDTO", "frameNo"], value: params.frameNo || "" },
        {
          name: ["vehicleDTO", "purchaseDate"],
          value: params.enrollDate || "",
        },
        { name: ["vehicleDTO", "enrollDate"], value: params.enrollDate || "" },
        { name: ["carOwnerDTO", "carOwner"], value: params.carOwner || "" },
        { name: ["carTypeDTO"], value: params },
      ]);
      this.clausesContent = compCheck.substrFirstBehind(
        this.carTypeDTO.codeName
      );
      this.frameNo = params.frameNo || "";
      this.engineNo = params.engineNo || "";
      this.carOwner = params.carOwner || "";
    },
    // 显示省市区选择
    showAreaPicker() {
      this.$refs.areaPicker.parentMsg(3);
    },
    areaConfirm(value) {
      console.log("value", value);
      this.$store.commit("car/updateCarState", [
        { name: ["carInsureEntry", "address"], value: value },
      ]);
    },
    //保存车险选择的决策单元
    async saveDecision(data) {
      // const res = await this.$axios({
      //   url: this.$API.API_SAVEAGENTCARUNIT,
      //   method: "post",
      //   data: {
      //     ...data,
      //     agentCode: localStorage.agentCode,
      //   },
      // });
      const res = await this.$axios({
        url: this.$API.API_MY_SAVE,
        method: "post",
        data: {
          ...data,
          agentCode: localStorage.agentCode,
          unitmainTenanceTypeOne: data.unitmainTenanceType1,
          unitmainTenanceTypeOneName: data.unitmainTenanceType1Name,
          unitmainTenanceTypeTwo: data.unitmainTenanceType2,
          unitmainTenanceTypeTwoName: data.unitmainTenanceType2Name,
        },
      });
      if (res.code === 0 && res.content.result != "1") {
        console.log("修改成功");
      } else {
        this.$toast(res.content.resultMessage);
      }
      if (res.code == 0 && res.content.result == 0) {
        this.$store.dispatch("my/getDecisionUnit"); //获取当前选中的决策单元
      }
    },
  },
  beforeDestroy() {
    localStorage.removeItem("agreement");
  },
};
</script>

<style lang="less">
@import "../../assets/less/app/carInsurance/carBaseInfo.less";

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
  background-color: #fff;
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
    color: #fff;
    height: 34px;
    line-height: 34px;
    margin: 0 10px;
    font-size: 14px;
    align-items: center;
    .name {
      flex: 1;
      text-align: right;
      margin-right: 6px;
    }
    p {
      flex: 1;
    }
  }
  .wrapper_div {
    .fenxiang {
      border: solid 1px #fff;
      border-radius: 10px;
      text-align: center;
      color: #fff;
      margin: 6px 20px 0 20px;
      font-size: 12px;
      padding: 2px;
      background: #999;
    }
  }
  p {
    margin: 0;
  }
  .car_area {
    display: flex;
    align-items: center;
    margin-right: 0.4rem;
    width: 2.2rem;
    margin-left: -25px;
  }
  p.tips {
    color: #999;
    font-size: 14px;
    text-align: center;
    margin: 1rem 0 0.6rem;
  }
}
</style>
