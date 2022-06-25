<template>
  <div class="MotorcycleVehicleVesselTax">
    <van-cell-group>
      <!-- 1、纳税类型（下拉选择） -->
      <van-field label="纳税类型" placeholder="请选择" right-icon="arrow" readonly v-model="formData.TaxRelifFlag.value.text" @click="showSelectPicker(formData.TaxRelifFlag, 'TaxRelifFlag')" />
      <!-- 2、减免类型（下拉选择），选择减免时才显示 -->
      <van-field label="减免类型" placeholder="请选择" right-icon="arrow" readonly v-model="formData.BaseTaxation.value.text" @click="showSelectPicker(formData.BaseTaxation, 'BaseTaxation')" v-show="formData.TaxRelifFlag.value.value === '3'" />
      <!-- 3、减免税原因（下拉选择），选择减免时才显示 -->
      <van-field label="减免税原因" placeholder="请选择" right-icon="arrow" readonly v-model="formData.TaxUnitText.value.text" @click="showSelectPicker(formData.TaxUnitText, 'TaxUnitText')" v-show="formData.TaxRelifFlag.value.value === '3'" />
      <!-- 4、减免金额（数字输入，单位元），选择减免金额时才显示 -->
      <van-field label="减免金额(元)" placeholder="请输入" v-model="formData.TaxRelief" @keydown="handleInput" type="number" v-show="formData.TaxRelifFlag.value.value === '3' && formData.BaseTaxation.value.value === '1'" />
      <!-- 5、减免比例（数字输入，单元%），选择减免比例时才显示 -->
      <van-field label="减免比例(%)" placeholder="请输入" v-model="formData.FreeRate" @keydown="handleInput" type="number" v-show="formData.TaxRelifFlag.value.value === '3' && formData.BaseTaxation.value.value === '2'" />
      <!-- 6、免税原因（下拉选择），选择免税时才显示 -->
      <van-field label="免税原因" placeholder="请选择" right-icon="arrow" readonly v-model="formData.RelifReason.value.text" @click="showSelectPicker(formData.RelifReason, 'RelifReason')" v-show="formData.TaxRelifFlag.value.value === '2'" />
      <!-- 7、计算方式（下拉选择） -->
      <!-- <van-field label="计算方式" placeholder="请选择" right-icon="arrow" readonly v-model="formData.CalculateMode.value.text" @click="showSelectPicker(formData.CalculateMode, 'CalculateMode')" /> -->
      <!-- 9、前次缴费年度（数字输入，年日期控件），计算方式不为新车时候显示 -->
      <van-field label="前次缴费年度" placeholder="请选择" right-icon="arrow" readonly v-model="formData.PayLastYear.value.text" @click="showSelectPicker(formData.PayLastYear, 'PayLastYear')" v-show="formData.CalculateMode.value.value === '1'" />
      <!-- 10、完税(减免税)凭证号（文本输入），选择免税和减免税显示 -->
      <van-field label="完税(减免税)凭证号" label-width="9em" placeholder="请输入" v-model="formData.PaidFreeCertificate" v-show="formData.TaxRelifFlag.value.value === '2' || formData.TaxRelifFlag.value.value === '3'" />

    </van-cell-group>
    <!-- 下拉选择 -->
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import selectPicker from '@/templates/selectPicker.vue';
import Moment from 'moment'

export default {
  components: {
    selectPicker
  },
  computed: {
    ...mapState({
      motorcycleVehicleVesselTax: state => state.car.motorcycleVehicleVesselTax
    })
  },
  data() {
    return {
      formData: {
        // 车船税开关
        platformComCodeCST: '',
        // 1、纳税类型（下拉选择）
        TaxRelifFlag: {
          value: {},
          data: [
            { text: "正常缴税", value: "1" },
            { text: "免税", value: "2" },
            { text: "减免税", value: "3" },
            { text: "税务局直接征收", value: "4" },
            { text: "有争议", value: "5" },
            { text: "拒缴", value: "6" },
            { text: "未进行征缴管理", value: "7" },
            { text: "不征", value: "8" },
            { text: "未代收", value: "9" }
          ]
        },
        // 2、减免类型（下拉选择），选择减免时才显示
        BaseTaxation: {
          value: {},
          data: [
            { text: "减免金额", value: "1" },
            { text: "减免比例", value: "2" },
            // { text: "免税", value: "3" }
          ]
        },
        // 3、减免税原因（下拉选择），选择减免时才显示
        TaxUnitText: {
          value: {},
          data: [
            // { text: "城市、农村公交车辆", value: "1" },
            { text: "外交车辆", value: "2" },
            { text: "其他减免车辆", value: "3" },
            { text: "节约能源车辆", value: "4" },
          ]
        },
        // 4、减免金额（数字输入，单位元），选择减免金额时才显示
        TaxRelief: '',
        // 5、减免比例（数字输入，单元%），选择减免比例时才显示
        FreeRate: '',
        // 6、免税原因（下拉选择），选择免税时才显示
        RelifReason: {
          value: {},
          data: [
            // { text: "拖拉机", value: "01" },
            { text: "军队、武警专用车", value: "02" },
            { text: "警车", value: "03" },
            { text: "具备减免税证明", value: "04" },
            { text: "外国使领馆、国际组织及其人员", value: "05" },
            { text: "其他", value: "06" },
            { text: "新能源车辆", value: "07" },
            // { text: "公共交通车辆", value: "08" },
          ]
        },
        // 7、计算方式（下拉选择）
        CalculateMode: {
          value: {},
          data: [
            { text: "使用一年以上车辆", value: "1" },
            { text: "新车", value: "2" },
            // { text: "境外机动车临时入境", value: "3" },
            // { text: "机动车临时上道路行驶", value: "4" },
            // { text: "机动车距规定的报废期限不足一年 ", value: "5" }
          ]
        },
        // 9、前次缴费年度（数字输入，年日期控件），计算方式不为新车时候显示
        PayLastYear: {
          value: {},
          data: []
        },
        // 10、完税(减免税)凭证号（文本输入），选择免税和减免税显示
        PaidFreeCertificate: ''
      }
    }
  },
  watch: {
    formData: {//深度监听，可监听到对象、数组的变化
      handler() {
        // 更新车船税
        const params = Object.assign(JSON.parse(JSON.stringify(this.motorcycleVehicleVesselTax)), JSON.parse(JSON.stringify(this.formData)))
        this.$store.commit('car/updateCarState', [{ name: ['motorcycleVehicleVesselTax'], value: params }])
      },
      deep: true //true 深度监听
    }
  },
  created() {
    // 初始化
    Object.assign(this.formData, JSON.parse(JSON.stringify(this.motorcycleVehicleVesselTax)))

    this.getMotorcyclePlatformSwitch()
    this.setPayLastYear()
    this.setCalculateMode()

  },
  methods: {
    // 摩托车-车船税开关
    async getMotorcyclePlatformSwitch() {
      const res = await this.$HTTP.post(this, 'API_GETMOTORCYCLEPLATFORMSWITCH', { agentCode: localStorage.agentCode, mainCarKindCode: this.vehicleType == '0' ? 'A' : this.vehicleType == '1' ? 'H' : this.vehicleType == '2' ? 'M' : 'A' })
      if (res.result == 0) {
        this.formData.platformComCodeCST = res.data.platformComCodeCST || ''
      }
    },
    // 设置前次缴费年度
    setPayLastYear() {
      let year = new Date().getFullYear()
      let arr = []
      for (let i = 0; i < 50; i++) {
        arr.push({
          text: `${year - i}年`,
          value: year - i
        })
      }
      this.formData.PayLastYear.data = arr.reverse()
    },
    // 设置计算方式
    setCalculateMode() {
      const enrollDate = this.$store.state.car.vehicleDTO.enrollDate.split('-')
      // const enrollDate = ('2021-07-23').split('-')
      let start_date = Moment([Moment().get('year'), Moment().get('month'), Moment().get('date')]);
      let end_date = Moment([parseInt(enrollDate[0]), (parseInt(enrollDate[1]) - 1), parseInt(enrollDate[2])]);
      // 系统自动判断，超过注册日期一年选1，未填写车牌号选2
      if (start_date.diff(end_date, 'days') > 365) {
        this.formData.CalculateMode.value = this.formData.CalculateMode.data[0]
      } else {
        this.formData.CalculateMode.value = this.formData.CalculateMode.data[1]
      }
    },
    // 下拉选择
    showSelectPicker(params, type) {
      this.$refs.selectPicker.parentMsg({ struct: { data: params.data, value: params.value, type } });
    },
    // 下拉选择确认
    updataSelectPicker(params) {
      console.log('params', params);
      this.formData[params.struct.type].value = params.struct.value
    },
    handleInput(e) {
      // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
    }
  }
};
</script>
<style lang="less">
</style>