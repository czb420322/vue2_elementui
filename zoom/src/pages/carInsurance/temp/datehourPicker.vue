<template>
  <div :class="params.url == 'cImmeValidEndDate' || params.url == 'bImmeValidEndDate' ? 'datehourPage date' : 'datehourPage hour'">
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-if="showPicker" v-model="currentDate" type="datehour" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="showPicker = false" :formatter="formatter" />
    </van-popup>
  </div>
</template>

<script>
import compCheck from './../../../assets/js/util/comp-check';
import common from './../../../assets/js/util/common';
export default {
  name: "tab",
  data() {
    return {
      showPicker: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      thisDate: 0,
      params: {
        url: ''
      }
    };
  },
  created() {
  },
  methods: {
    parentMsg(params) {
      this.params = params;
      console.log('params', params);
      
      this.showPicker = true;
      this.setMinMaxDate();
    },
    setMinMaxDate() {
      var myDate = new Date();
      let year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      let month = myDate.getMonth();       //获取当前月份(0-11,0代表1月)
      let day = myDate.getDate();        //获取当前日(1-31)

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

      // 时间加1小时
      let date = compCheck.transformDatesTimestamp(myDate).substring(11,13)*1 + 1
      // if( date == 24 && (this.params.url == 'cImmeValidEndDate' || this.params.url == 'bImmeValidEndDate' )){
      //   this.$toast('即时起保不能超过23时！')
      //   this.showPicker = false;
      // }
      if( this.params.minDate == 0 ){
        this.minDate = new Date(minDate[0], minDate[1] - 1, minDate[2], date);
      }else{
        this.minDate = new Date(minDate[0], minDate[1] - 1, minDate[2]);
      }
      this.maxDate = new Date(maxDate[0], maxDate[1] - 1, maxDate[2]);

      this.currentDate = myDate
    },
    onConfirm(value) {// 确定按钮，时间格式化并显示在页面上
      this.params.datetime = compCheck.transformDatesTimestamp(value)
      
      this.$emit('click', this.params);
      this.showPicker = false;
    },
    formatter(type, val) {
      if (type === 'hour') {
        return val + '时';
      }
      return val;
    }
  }
};
</script>
<style lang="less">
.datehourPage.hour{
  .van-picker-column:nth-of-type(4){
    display: none;
  }
}
// .datehourPage.date{
//   .van-picker-column:nth-of-type(1),.van-picker-column:nth-of-type(2),.van-picker-column:nth-of-type(3){
//     display: none;
//   }
// }
</style>