<template>
  <header class="gs-search-wrapper">
    <!-- <button type="button" class='gs-search-btn gs-collapse-btn'>收起</button> -->
    <el-form
      v-bind="$attrs"
      inline
      class="gs-search-form"
      ref="gsSearchForm"
      @keyup.native.enter.stop="queryHandler"
    >
      <slot></slot>
      <el-form-item v-if="isShowDefaultOperation" class="gs-search-button-wrapper">
        <el-button class="el-icon-search searchBtn" @click.stop="queryHandler">&nbsp;&nbsp;查询</el-button>
        <el-button class="el-icon-refresh tryBtn" @click.stop="resetHandler">&nbsp;&nbsp;重置</el-button>
      </el-form-item>
      <slot
        name="operation"
        class="gs-el-btn"
        :queryHandler="queryHandler"
        :resetHandler="resetHandler"
      ></slot>
    </el-form>
  </header>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Search",
  inheritAttrs: false,
  props: {
    isShowDefaultOperation: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.model = cloneDeep(this.$attrs.model);
  },
  methods: {
    async getForm() {
      return this.$refs.gsSearchForm;
    },
    queryHandler(e) {
      this.$emit("query-search");
    },
    resetHandler(e) {
      this.$refs.gsSearchForm.resetFields();
      this.$emit("reset-search");
      this.$emit("update:model", cloneDeep(this.model));
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
.gs-search-wrapper {
  margin-bottom: 10px;
  border: 1px solid transparent;
  text-align: right;
}
.gs-search-wrapper .gs-search-form.el-form {
  margin: 0;
  width: auto;
  text-align: left;
}
.gs-search-wrapper .gs-search-button-wrapper {
  text-align: center;
  margin-bottom: 18px;
}
.gs-search-wrapper .gs-search-btn {
  height: 28px;
  line-height: 14px;
  text-align: center;
  padding: 0 12px;
  color: #fff;
  font-size: 14px;
  border: 0;
  cursor: pointer;
}
.gs-search-wrapper .gs-search-btn:not(:last-child) {
  margin-right: 10px;
}
.gs-search-wrapper .gs-query-btn {
  background: url("./images/stopnormal.png") no-repeat scroll 0 0 / 100% 100%;
}

.gs-search-wrapper .gs-reset-btn {
  background: url("./images/trynormal.png") no-repeat scroll 0 0 / 100% 100%;
}

.gs-search-wrapper .gs-search-form .gs-el-btn .el-button {
  padding: 10px;
}
.gs-search-button-wrapper .el-button {
  padding: 0 0.1rem;
  height: 0.28rem;
}
</style>
