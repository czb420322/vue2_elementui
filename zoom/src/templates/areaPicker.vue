<template>
  <div class="areaPickerPage">
    <van-popup v-model="showPicker" position="bottom">
      <van-area :area-list="areaList" :columns-num="columnsNum" :value="cityCode" @confirm="onConfirm" @cancel="onCancel" />
    </van-popup>
  </div>
</template>

<script>
import area from '../assets/json/area.js'
export default {
  name: "tab",
  data() {
    return {
      showPicker: false,
      areaList: area,
      columnsNum: 3,
      cityCode: ''
    };
  },
  created() {
  },
  methods: {
    parentMsg(num, cityCode) {
      this.showPicker = true;
      this.columnsNum = num;
      if(cityCode){
        this.cityCode = cityCode;
      }
    },
    onCancel() {
      this.showPicker = false;
    },
    onConfirm(value) {// 确定按钮，时间格式化并显示在页面上
      // let area = value.map(item => {
      //   return item.name
      // });
      this.$emit('click', value);
      this.showPicker = false;
    }
  }
};
</script>