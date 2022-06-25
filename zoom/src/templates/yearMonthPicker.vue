<template>
  <div class="areaPickerPage">
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="showPicker = false" />
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
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2030, 11, 1),
      currentDate: new Date(),
    };
  },
  methods: {
    parentMsg() {
      this.showPicker = true;
    },
    onConfirm(value) {// 确定按钮，时间格式化并显示在页面上
      this.$emit('click', compCheck.timestampToTime(value, 'YYYY-MM-DD'))
      this.showPicker = false;
    },
  }
};
</script>