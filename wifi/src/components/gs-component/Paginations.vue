<template>
  <div>
    <el-pagination
      class="gs-pagination"
      v-on="$listeners"
      v-bind="$attrs"
      :background="background"
      layout="total, sizes, prev, pager, next"
    ></el-pagination>
    <el-input v-model="pages"></el-input>
    <span @click="clickEnter">确定</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  inheritAttrs: false,
  props: {
    background: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pages: 1
    };
  },
  computed: {},
  methods: {
    clickEnter() {
      this.$emit("current-change", this.pages);
    }
  }
};
</script>


<style lang="">
.gs-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
