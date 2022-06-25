<template>
  <div class="areaPickerPage">
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="list" @confirm="onConfirm" @cancel="onCancel" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      showPicker: false,
      params: {},
      list: [],
      str:''
    };
  },
  methods: {
    parentMsg(params,str) {
      this.showPicker = true;
      this.params = params
      this.list = params.struct.data
      this.str=str
    },
    onCancel() {
      this.showPicker = false;
    },
    onConfirm(value) {
      this.params.struct.value = value
      this.$emit('click', this.params,this.str);
      this.showPicker = false;
    }
  }
};
</script>