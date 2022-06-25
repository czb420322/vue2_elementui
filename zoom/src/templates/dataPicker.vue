<template>
  <div class="dataPickerPage">
    <van-field readonly clickable name="picker" :input-align="right || 'left'" :value="thisValue" :label="params.name" :placeholder="params.holder" @click="checkShowPicker" :right-icon="params.data.length>1 ? 'arrow': ''" :class="params.isNeed === 'Y' ? 'required' : ''" />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="params.data" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["params", 'right', 'value', 'edit', 'isNeed'],
  data() {
    return {
      showPicker: false,
      thisValue: '',
    };
  },
  created() {
    let selected = this.params.data.filter(item => { return item.value == this.value });
    if (selected.length) {
      this.thisValue = selected[0].text;
    }
  },
  methods: {
    onConfirm(value, index) {
      console.log('value', value);
      console.log('index', index);
      this.thisValue = value.text;
      this.$emit('input', value);
      this.$emit('change', value);
      this.showPicker = false;
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
      var vm = this;
      console.log('watch value:' + curVal);
      if (this.params.data) {
        //处理列表对象
        this.params.data.forEach(param => {
          if (curVal == param.value)
            vm.thisValue = param.text
        });
      }
      let selected = this.params.data.filter(item => { return item.value == this.value });
      if(selected.length == 0){
        this.thisValue = "";
      }
    }
  }
};
</script>