<template>
  <div class="insureInputPage appntInfoPage afe-area-inset-bottom">
    <ol class="list-box">
      <li class="item" v-for="(tagInfo, i) in pageData.tagsList" :key="i">
        <h1 class="title_bar van-hairline--bottom">{{ tagInfo.riskName }}</h1>
        <div
          v-for="(item, index) in tagInfo.struct"
          :key="index"
          class="van-hairline--bottom"
        >
          <template v-if="item.type === 'input'">
            <van-field
              class="convert"
              :label="item.name"
              :placeholder="item.holder"
              :maxlength="item.name == '车牌号' ? 8 : item.$isMaxLength || isMaxlength"
              v-on:blur="appntInfoEvent('input', item, $event.target.value)"
              @input="numberVerification('input', item, $event)"
              v-model.trim="tagInfo.data[item.code]"
              :class="item.isNeed === 'Y' ? 'required' : ''"
              :type="item.name == '核定载重质量' ? 'number' : ''"
            >
              <carInfoScan
                :params="item"
                slot="button"
                @input="pageData.appntInfo.data[item.code] = $event.value"
                @change="carInfoEvent('input', item, $event, i)"
              ></carInfoScan>
            </van-field>
          </template>
          <template v-else-if="item.type === 'number'">
            <van-field
              :label="item.name"
              :placeholder="item.holder"
              v-on:blur="appntInfoEvent('number', item, $event.target.value)"
              v-model.trim="tagInfo.data[item.code]"
              :class="item.isNeed === 'Y' ? 'required' : ''"
            />
          </template>
          <template v-else-if="item.type === 'select'">
            <eg-data-picker
              :value="tagInfo.data[item.code]"
              :placeholder="item.holder"
              :params="item"
              :isNeed="item.isNeed"
              :edit="item.edit"
              @input="tagInfo.data[item.code] = $event.value"
              @change="appntInfoEvent('select', item, $event)"
            >
            </eg-data-picker>
          </template>
          <template v-else-if="item.type === 'date'">
            <eg-date-picker
              :type="'date'"
              :placeholder="item.holder"
              class="birthdayDate"
              :params="item"
              :isNeed="item.isNeed"
              :value="tagInfo.data[item.code]"
              :min-date="item.data.minDate"
              :max-date="item.data.maxDate"
              :edit="item.edit"
              @input="tagInfo.data[item.code] = $event"
              @change="appntInfoEvent('date', item, $event)"
            >
            </eg-date-picker>
          </template>
          <template v-else-if="item.type === 'stack'">
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
import carInfoScan from "./../../../templates/carInfoScan.vue";
import EventBus from "../../../assets/js/util/EventBus";
import areaPicker from "../../../templates/areaPicker";

export default {
  components: {
    carInfoScan,
    areaPicker,
  },
  data() {
    return {
      cityName: "",
      pageData: {
        tagsList: [],
      },
      isMaxlength: 25,
    };
  },
  created() {
    this.saleCode = this.$route.query.saleCode;
    this.parentMsg();
  },
  methods: {
    areaConfirm(value) {
      this.cityName = "";
      for (let i in value) {
        this.cityName += value[i].name + "/";
      }
      this.cityName = this.cityName.substr(0, this.cityName.length - 1);
      this.pageData.tagsList[0].data.regionPath = value;
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
        //处理(地址)家财无忧·百万安心险 家财无忧·百万安心险（辽宁） i国任-燃气意外险 I国任-全车玻璃损失保险计划 安装工程险 取输入的默认值
        if (
          this.pageData.saleCode == "GRMOBILE_MALL_SL025" ||
          this.pageData.saleCode == "GRMOBILE_MALL_SL039" ||
          this.pageData.saleCode == "GRMOBILE_MALL_SL028" ||
          this.pageData.saleCode == "GRMOBILE_MALL_SL032" ||
          this.pageData.saleCode == "GRMOBILE_MALL_SL042" ||
          this.pageData.saleCode == "GRMOBILE_MALL_SL079" ||
          this.pageData.saleCode == "GRMOBILE_MALL_SL084" ||
          this.pageData.saleCode == "RBTMOBILE_MALL_SL001" || 
          this.pageData.saleCode == "RBTMOBILE_MALL_RBT0001"
        ) {
          if (this.pageData.tagsList[0].data.regionPath) {
            this.cityName =
              this.pageData.tagsList[0].data.regionPath[0].name +
              "/" +
              this.pageData.tagsList[0].data.regionPath[1].name +
              "/" +
              this.pageData.tagsList[0].data.regionPath[2].name;
          }
        }
      }
    },
    numberVerification (type, item, obj) {
      console.log('aaa', item, obj );
      if (item.code == "deadweight") {
        if (obj > 50) {
          this.pageData.tagsList[0].data.deadweight = 50
        } else if (obj < 0) {
          this.pageData.tagsList[0].data.deadweight = 0
        } else {
          var tmpVal = obj.replace(/[^\d\.]/g, '');
          var reg = /^(0|([1-9]\d*))(\.\d{1,2})?$/; //正则验证保留 最多允许后输入两位小数
          if (!reg.test(tmpVal)) {
            tmpVal = tmpVal + "";
            tmpVal = tmpVal.substring(0, tmpVal.indexOf(".") + 3);
            this.pageData.tagsList[0].data.deadweight = tmpVal;
          }
        }
      }
    },
    appntInfoEvent(type, item, obj, event) {
      var _this = this;
      if (item.name == "车牌号") {
        this.pageData.tagsList[0].data.licenseNo =
          this.pageData.tagsList[0].data.licenseNo.toUpperCase();
        if (
          compCheck.isVehicleNumber(this.pageData.tagsList[0].data.licenseNo) ==
          false && this.pageData.tagsList[0].data.isNewCar != 'Y'
        ) {
          this.$toast("请输入车牌号");
          return;
        }
          if (this.pageData.tagsList[0].data.licenseNo && !compCheck.isVehicleNumber2(this.pageData.tagsList[0].data.licenseNo)) {
          this.$toast("车牌号格式不正确");
          return;
        }
      }
      if (item.name == "房屋所在地区") {
        if (this.pageData.tagsList[0].data.regionPath=='') {
          this.$toast("请选择房屋所在地区");
          return;
        }
      }
      if (item.name == "房屋详细地址") {
        if (this.pageData.tagsList[0].data.addressNo=='') {
          this.$toast("请输入房屋详细地址");
          return;
        }
      }
    
      if (item.name == "车架号") {
        console.log('车架号', compCheck.isVehicleFrame(obj));
        this.pageData.tagsList[0].data.frameNo =
          this.pageData.tagsList[0].data.frameNo.toUpperCase();
        if (obj == '') {
          this.$toast("请输入车架号");
          return;
        }
        //判断非机动车责任险产品车架号验证问题和摩托车（电动车和机动车车架号验证不一致）
        if (
          this.saleCode == "GRMOBILE_MALL_SL005" ||
          this.saleCode == "GRMOBILE_MALL_SL082" ||
          this.saleCode == "GRMOBILE_MALL_SL087" ||
          this.saleCode == "RBTMOBILE_MALL_SL002"
        ) {
          //电动车车架号验证
          if (!compCheck.isElectricVehicleFrame(obj)) {
            this.$toast("车架号输入有误！");
            return;
          }
        } else {
          //机动车车架号验证
          if (!compCheck.isVehicleFrame(obj)) {
            this.$toast("车架号输入有误!");
            return;
          }
        }
        if (
          this.pageData.tagsList[0].data.frameNo &&
          !compCheck.isRackNo(this.pageData.tagsList[0].data.frameNo)
        ) {
          return;
        }
      }
      if (item.name == "发动机号") {
        if (obj.length > 10 && obj.length < 4) {
          this.$toast("发动机号输入有误");
          return;
        }
        this.pageData.tagsList[0].data.engine_no =
          this.pageData.tagsList[0].data.engine_no
            .replace(/[^\w\-]/gi, "")
            .toUpperCase();
      }
      //GRMOBILE_MALL_SL073宠物险专用
      if (item.name == "宠物出生日期") {
        this.pageData.tagsList[0].data.carevaluation_date = obj;
      }
      // 公路项判断
      if (item.name == "车辆类型" && obj == '') {
        this.$toast("请选择车辆类型");
        return;
      }
      if (item.name == "核定载重质量") {
        if ( !obj ) {
          this.$toast("请选择核定载重质量");
          return;
        } else if (obj <= 0) {
          this.$toast("核定载重质量不能为零");
          return;
        }
      }
      if (item.name == "是否新车" && obj == '') {
        this.$toast("请选择是否新车");
        return;
      }
      util.setSessionStorageObj("insureInfo", this.pageData);
      EventBus.$emit("parentMsg");
      //工程险需要输完这个标的去调用试算价格
      if (
        this.saleCode == "GRMOBILE_MALL_SL042" &&
        item.name == "工程造价(单位/元)"
      ) {
        EventBus.$emit("parentTrial");
      }
      return true;
    },

    // 车辆信息识别
    carInfoEvent(type, item, obj, i) {
      if (obj.plate_num) {
        this.pageData.tagsList[i].data["licenseNo"] = obj.plate_num;
      }
      if (obj.vin) {
        this.pageData.tagsList[i].data["frameNo"] = obj.vin;
      }
      if (
        obj.engine_num ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL041" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL044" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL045" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL046" ||
        this.pageData.saleCode == "GRMOBILE_MALL_SL077"
      ) {
        this.pageData.tagsList[i].data["engine_no"] = obj.engine_num;
      }

      // 保存信息
      util.setSessionStorageObj("insureInfo", this.pageData);
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
}

.friends-icon {
  font-size: 1.35rem;
  position: absolute;
  top: 0;
  right: 0;
  color: #1989fa;
}
</style>