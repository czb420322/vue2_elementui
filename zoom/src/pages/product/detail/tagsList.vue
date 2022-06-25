<template>
  <div class="insureInputPage appntInfoPage afe-area-inset-bottom">
    <ol class="list-box">
      <h1 class="title_bar van-hairline--bottom" style="display: flex; justify-content: space-between; align-items: center;">房屋信息
        <van-icon name="add-o" size="26" color="#0894ec" v-show="houseList.length < 3" @click="addHouseList" />
      </h1>
      <li class="item" v-for="(tagInfo, i) in houseList" :key="i + 10">
        <van-cell :title="tagInfo.riskName + (i+1)">
          <template #right-icon>
            <van-icon name="close" size="22" color="red" v-if="i != 0" @click="del(tagInfo.index)" />
          </template>
        </van-cell>
        <div v-for="(item, index) in tagInfo.struct" :key="index + 20" class="van-hairline--bottom">
          <template v-if="item.type === 'input'">
            <van-field class="convert" :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('input', item, $event.target.value, tagInfo.index)" v-model.trim='tagInfo.data[item.code]' :class="item.isNeed === 'Y' ? 'required' : ''">
              <carInfoScan :params="item" slot="button" @input="pageData.appntInfo.data[item.code] = $event.value" @change="carInfoEvent('input', item, $event, tagInfo.index)"></carInfoScan>
            </van-field>
          </template>
          <template v-else-if="item.type === 'number'">
            <van-field :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('number', item, $event.target.value, tagInfo.index)" v-model.trim='tagInfo.data[item.code]' :class="item.isNeed === 'Y' ? 'required' : ''" />
          </template>
          <template v-else-if="item.type === 'select'">
            <eg-data-picker :value="tagInfo.data[item.code]" :placeholder="item.holder" :params="item" :isNeed="item.isNeed" :edit="item.edit" @input="tagInfo.data[item.code] = $event.value" @change="appntInfoEvent('select', item, $event)">
            </eg-data-picker>
          </template>
          <template v-else-if="item.type === 'date'">
            <eg-date-picker :type="'date'" :placeholder="item.holder" class="birthdayDate" :params="item" :isNeed="item.isNeed" :value="tagInfo.data[item.code]" :min-date="item.data.minDate" :max-date="item.data.maxDate" :edit="item.edit" @input="tagInfo.data[item.code] = $event.value" @change="appntInfoEvent('date', item, $event, tagInfo.index)">
            </eg-date-picker>
          </template>
          <template v-else-if="item.type === 'stack'">
            <van-field class="required" v-model.trim='tagInfo.data.cityName' :label="item.name" :placeholder="item.holder" readonly @click="showAreaPicker(tagInfo.index)" is-link />
          </template>
        </div>
      </li>
      <h1 class="title_bar van-hairline--bottom" style="display: flex; justify-content: space-between; align-items: center; margin-top:15px;">车辆信息
        <van-icon name="add-o" size="26" color="#0894ec" v-if="carList.length < 2" @click="addCarList" />
      </h1>
      <li class="item" v-for="(tagInfo, i) in carList" :key="i + 30">
        <van-cell :title="tagInfo.riskName + (i+1)">
          <template #right-icon>
            <van-icon name="close" size="22" color="red" v-if="i != 0" @click="del(tagInfo.index)" />
          </template>
        </van-cell>
        <div v-for="(item, index) in tagInfo.struct" :key="index + 40" class="van-hairline--bottom">
          <template v-if="item.type === 'input'">
            <van-field class="convert" :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('input', item, $event.target.value, tagInfo.index)" v-model.trim='tagInfo.data[item.code]' :class="item.isNeed === 'Y' ? 'required' : ''">
              <carInfoScan :params="item" slot="button" @input="pageData.appntInfo.data[item.code] = $event.value" @change="carInfoEvent('input', item, $event, tagInfo.index)"></carInfoScan>
            </van-field>
          </template>
          <template v-else-if="item.type === 'number'">
            <van-field :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('number', item, $event.target.value, tagInfo.index)" v-model.trim='tagInfo.data[item.code]' :class="item.isNeed === 'Y' ? 'required' : ''" />
          </template>
          <template v-else-if="item.type === 'select'">
            <eg-data-picker :value="tagInfo.data[item.code]" :placeholder="item.holder" :params="item" :isNeed="item.isNeed" :edit="item.edit" @input="tagInfo.data[item.code] = $event.value" @change="appntInfoEvent('select', item, $event, tagInfo.index)">
            </eg-data-picker>
          </template>
          <template v-else-if="item.type === 'date'">
            <eg-date-picker :type="'date'" :placeholder="item.holder" class="birthdayDate" :params="item" :isNeed="item.isNeed" :value="tagInfo.data[item.code]" :min-date="item.data.minDate" :max-date="item.data.maxDate" :edit="item.edit" @input="tagInfo.data[item.code] = $event.value" @change="appntInfoEvent('date', item, $event, tagInfo.index)">
            </eg-date-picker>
          </template>
          <template v-else-if="item.type === 'stack'">
            <van-field class="required" v-model="cityName" :label="item.cityName" :placeholder="item.holder" readonly @click="showAreaPicker(tagInfo.index)" is-link />
          </template>
        </div>
      </li>
    </ol>
    <areaPicker ref="areaPicker" @click="areaConfirm"></areaPicker>
  </div>
</template>

<script>
import $ from 'jquery';
import common from '../../../assets/js/util/common';
import util from '../../../assets/js/util/util';
import compCheck from '../../../assets/js/util/comp-check';
import carInfoScan from './../../../templates/carInfoScan.vue';
import EventBus from '../../../assets/js/util/EventBus';
import areaPicker from '../../../templates/areaPicker'

export default {
  components: {
    carInfoScan, areaPicker
  },
  data() {
    return {
      index: 0,
      cityName: '',
      pageData: {
        tagsList: []
      },
      houseList: [],
      carList: []
    };
  },
  created() {
    this.saleCode = this.$route.query.saleCode;
    this.parentMsg();
  },
  methods: {
    areaConfirm(value) {
      this.pageData.tagsList[this.index].data.cityName = value.map((item) => {
        return item.name
      }).join('/');
      this.pageData.tagsList[this.index].data.regionPath = value
      util.setSessionStorageObj('insureInfo', this.pageData);
      EventBus.$emit('parentMsg');
    },
    // 显示投保地区选择
    showAreaPicker(index) {
      console.log('index', index);
      this.index = index
      this.$refs.areaPicker.parentMsg(3);
    },
    // 初始化页面数据
    parentMsg() {
      if (util.getSessionStorageObj('insureInfo')) {
        this.houseList = []
        this.carList = []
        this.pageData = util.getSessionStorageObj('insureInfo');
        this.pageData.tagsList.forEach((item, index) => {
          item.index = index
          if (item.risk == '0303') {
            this.houseList.push(item)
          } else if (item.risk == '2746') {
            this.carList.push(item)
          }
        });
      }
    },

    appntInfoEvent(type, item, obj, index, event) {
      console.log('type', type);
      console.log('item', item);
      console.log('obj', obj);
      console.log('index', index);
      var _this = this;
      if (item.name == '车牌号') {
        this.pageData.tagsList[index].data.licenseNo = this.pageData.tagsList[index].data.licenseNo.toUpperCase()
        if (compCheck.isVehicleNumber(this.pageData.tagsList[index].data.licenseNo) == false) {
          this.$toast('车牌号输入有误');
        }
      }
      if (item.name == '车架号') {
        this.pageData.tagsList[index].data.frameNo = this.pageData.tagsList[index].data.frameNo.toUpperCase()
        //判断非机动车责任险产品车架号验证问题（电动车和机动车车架号验证不一致）
        if (this.saleCode == 'GRMOBILE_MALL_SL005' || this.saleCode == 'GRMOBILE_MALL_SL082') {//电动车车架号验证
          if (compCheck.isElectricVehicleFrame(obj) == false) {
            this.$toast('车架号输入有误！');
          }
        } else {//机动车车架号验证
          if (compCheck.isVehicleFrame(obj) == false) {
            this.$toast('车架号输入有误');
          }
        }

      }
      if (item.name == '发动机号') {
        this.pageData.tagsList[index].data.engine_no = this.pageData.tagsList[index].data.engine_no.replace(/[^\w\-]/ig, '').toUpperCase()
      }
      util.setSessionStorageObj('insureInfo', this.pageData);
      EventBus.$emit('parentMsg');
    },

    // 车辆信息识别
    carInfoEvent(type, item, obj, i) {
      if (obj.plate_num) {
        this.pageData.tagsList[i].data['licenseNo'] = obj.plate_num;
      }
      if (obj.vin) {
        this.pageData.tagsList[i].data['frameNo'] = obj.vin;
      }
      if (obj.engine_num || this.pageData.saleCode == "GRMOBILE_MALL_SL041" || this.pageData.saleCode == "GRMOBILE_MALL_SL044" || this.pageData.saleCode == "GRMOBILE_MALL_SL045" || this.pageData.saleCode == "GRMOBILE_MALL_SL046" || this.pageData.saleCode == "GRMOBILE_MALL_SL077") {
        this.pageData.tagsList[i].data['engine_no'] = obj.engine_num;
      }

      // 保存信息
      util.setSessionStorageObj('insureInfo', this.pageData);
      EventBus.$emit('parentMsg');
    },

    addHouseList() {
      this.pageData.tagsList.push(this.pageData.tagsListBackups[0])
      util.setSessionStorageObj('insureInfo', this.pageData);
      this.parentMsg()
    },
    addCarList() {
      this.pageData.tagsList.push(this.pageData.tagsListBackups[1])
      util.setSessionStorageObj('insureInfo', this.pageData);
      this.parentMsg()
    },
    del(index) {
      this.pageData.tagsList.splice(index, 1);
      util.setSessionStorageObj('insureInfo', this.pageData);
      this.parentMsg()
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
</style>