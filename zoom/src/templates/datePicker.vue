<template>
  <div class="datePickerPgae">
    <van-field readonly clickable name="picker" :value="thisValue" :label="params.name" :placeholder="params.holder" @click="checkShowPicker" right-icon="arrow" :class="isNeed === 'Y' ? 'required' : ''" />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="thisMinDate" :max-date="thisMaxDate" :formatter="formatter" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
import common from '../assets/js/util/common';
export default {
  name: "tab",
  props: ['params', 'edit', 'placeholder', 'minDate', 'maxDate', 'type', 'value', 'isNeed'],
  data() {
    return {
      showPicker: false,
      thisValue: '',
      thisMinDate: '',
      thisMaxDate: '',
      currentDate: new Date(),
    };
  },
  created() {
    this.setInit();
  },
  methods: {
    setInit() {
      let minDate,maxDate;
      //GRMOBILE_MALL_SL073宠物险控制8岁以内投保
      if(this.params.name == '宠物出生日期'){
         maxDate = common.CurentDate().split('-');
         let data = common.CurentDate().split('-');
         data[0] = data[0]-8
         minDate = data
      }else{
        minDate = this.minDate.split('-');
        maxDate = this.maxDate.split('-');
      }
     
      this.thisMinDate = new Date(parseInt(minDate[0]), parseInt(minDate[1] - 1), parseInt(minDate[2]));
      this.thisMaxDate = new Date(parseInt(maxDate[0]), parseInt(maxDate[1] - 1), parseInt(maxDate[2]));
      // if (this.value) {
        console.log('this.value',this.value);
        this.thisValue = this.value || '';
        let currentDate = this.value.split('-');
        this.currentDate = new Date(parseInt(currentDate[0]), parseInt(currentDate[1] - 1), parseInt(currentDate[2]));
      // }
    },
    onCancel() {
      console.log('取消');
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    onConfirm(value) {// 确定按钮，时间格式化并显示在页面上
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d
      this.thisValue = timer;
      this.showPicker = false;
      this.$emit('change', timer);
    },
    checkShowPicker() {
      if (this.edit && (this.edit == '1' || this.edit == 'N')) { //存在  切等于1 或  N  不可以编辑
        this.showPicker = false;
      } else {
        this.showPicker = true;
      }
    }
  },
  watch: {
    value: function (curVal, oldVal) {
      this.setInit();
    }
  },
};
</script>