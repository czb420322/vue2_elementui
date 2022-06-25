<template>
  <div class="searchSelectPickerPage">
    <van-popup v-model="show" closeable round position="bottom">
      <br>
      <br>
      <van-search v-model="value" placeholder="请输入搜索关键词" />
      <van-cell-group>
        <van-cell v-for="(item, index) in selectList" :key="index" :title="item.text" @click="onConfirm(item)" />
        <br>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      show: false,
      params: {},
      value: '',
      list: []
    };
  },
  computed: {
    selectList() {
      if (this.value.length && this.value.length > 1) {
        if (this.list.length) {
          return this.list.filter(item => {
            return item.text.indexOf(this.value) != -1
          })
        }
        return []
      }
      return this.list
    }
  },
  methods: {
    parentMsg(params) {
      this.show = true;
      this.params = params
      this.list = params.struct.data
    },
    onCancel() {
      this.show = false;
    },
    onConfirm(value) {
      this.params.struct.value = value
      this.$emit('click', this.params);
      this.show = false;
    }
  }
};
</script>
<style lang='less'>
.searchSelectPickerPage {
  .van-cell-group {
    height: 65vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>