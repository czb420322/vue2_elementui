<template>
  <div class="areaPickerPage">
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="year-month" title="选择日期" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
import compCheck from '../assets/js/util/comp-check';
export default {
  name: "tab",
  data() {
    return {
      showPicker: false,
      minDate: new Date(2010, 0),
      maxDate: new Date(2028, 11),
      currentDate: new Date(),
      params: {}
    };
  },
  created() {
  },
  methods: {
    parentMsg(params) {
      this.params = params;
      this.showPicker = true;
      // this.setMinMaxDate();
    },
    setMinMaxDate() {
      var myDate = new Date();
      let year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      let month = myDate.getMonth();       //获取当前月份(0-11,0代表1月)
      // let day = myDate.getDate();        //获取当前日(1-31)

      let minDate, maxDate
      if (this.params.minDate == 'min') {
        minDate = compCheck.transformDatestamp('', -50).split('-');
      } else {
        minDate = compCheck.getDateByDays(this.params.minDate).split('-');
      }
      if (this.params.maxDate == 'max') {
        maxDate = compCheck.transformDatestamp('', 5).split('-');
      } else {
        maxDate = compCheck.getDateByDays(this.params.maxDate).split('-');
      }

    },
    onConfirm(value) {// 确定按钮，时间格式化并显示在页面上
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      // if (d >= 0 && d <= 9) {
      //   d = "0" + d;
      // }
      var timer = date.getFullYear() + "-" + m 
      this.params.datetime = timer
      this.$emit('click', this.params);
      this.showPicker = false;
    },
  }
};
</script>