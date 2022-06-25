<template>
<div>
 <div class="ValidityIDcardPgae">
    <van-field label="证件起期" readonly>
      <template #input>
        <van-field :value="thisStartValue" :border="false" placeholder="请选择" readonly @click="showDataTimePicker({ url: startUrl, minDate: -100*365, maxDate: 100*365 })" style="padding: 0;" />
      </template>
      <template #right-icon>
        <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
      </template>
    </van-field>
    <i v-if='readonly' class="readonly"></i>
    <!-- 日期选择 -->
    <datetimePicker ref="datetimePicker" @click="updataDatetime"></datetimePicker>
  </div>
  <div class="ValidityIDcardPgae">
    <van-field label="证件止期" readonly>
      <template #input>
        <van-field v-if="!checked" :value="thisEndValue" :border="false" placeholder="请选择" readonly @click="showDataTimePickerEnd({ url: endUrl, minDate: -100*365, maxDate: 100*365 })" style="padding: 0;" />
      </template>
      <template #right-icon>
        <van-icon v-if="!checked" name="img/carInsurance/rili@2x.png" size="20px" />
      </template>
      <template #button>
        <div style="display: flex; align-items: center;">
          &nbsp;永久&nbsp;
          <van-switch :value="checked" @input="updataSwitch" center size="24" inactive-color="#e5e5e5" />
        </div>
      </template>
    </van-field>
    <i v-if='readonly' class="readonly"></i>
    <!-- 日期选择 -->
    <datetimePicker ref="datetimePickerEnd" @click="updataDatetimeEnd"></datetimePicker>
  </div>
</div>
</template>

<script>
import datetimePicker from './../../../templates/datetimePicker.vue';
import { mapState } from 'vuex'
export default {
  components: {
    datetimePicker
  },
  props: {
    startDate: String,
    endDate: String,
    startUrl: Array,
    endUrl: Array,
    commitUrl: String,
    readonly: Boolean,
  },
  data() {
    return {
      thisStartValue: '',
      thisEndValue: '',
      checked: false,
    };
  },
  watch: {
    startDate(val, oldVal) {
      this.init()
    },
    endDate(val, oldVal) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState({
      insureInfoDTO: state => state.car.insureInfoDTO,
      propOrderVehicleDTO: (state) => state.car.propOrderVehicleDTO, // 车主证件起止期
    }),
  },
  methods: {
    init() {
      this.thisStartValue = this.startDate
      this.thisEndValue = this.endDate
      this.checked = this.endDate == '2999-12-31' ? true : false
    },
    showDataTimePicker(params) {
      console.log(params,'param1111');
      this.$refs.datetimePicker.parentMsg(params)
    },
     showDataTimePickerEnd(params) {
      this.$refs.datetimePickerEnd.parentMsg(params)
    },
    showDataTimeCertificate(params) {
      this.$refs.datetimePicker.parentMsg(params)
    },
    updataDatetime(params) {
      this.thisStartValue = params.datetime
      this.$store.commit(this.commitUrl, [
        { name: params.url, value: params.datetime }
      ])
      // this.$parent.asyncFrom(this.insureInfoDTO.checkedApplyInfo);
    },
    updataDatetimeEnd(params) {
      this.thisEndValue = params.datetime
      this.$store.commit(this.commitUrl, [
        { name: params.url, value: params.datetime }
      ])
      // this.$parent.asyncFrom(this.insureInfoDTO.checkedApplyInfo);
    },
    updataSwitch() {
      this.checked = !this.checked
      if (this.checked) {
        this.updataDatetimeEnd({ url: this.endUrl, datetime: '2999-12-31' })
      } else {
        this.updataDatetimeEnd({ url: this.endUrl, datetime: '' })
      }
    },
  }
};
</script>
<style lang="less">
.ValidityIDcardPgae {
  position: relative;
  .readonly {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>