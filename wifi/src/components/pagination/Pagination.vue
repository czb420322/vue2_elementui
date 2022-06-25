<!--
 * @Author: your name
 * @Date: 2020-05-19 18:50:11
 * @LastEditTime : 2020-12-08 09:43:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\components\pagination\Pagination.vue
 -->
<template>
  <el-pagination
    class="gs-pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
</template>



<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      background: true,
      pageSizes: [10, 20, 30, 40, 50],
      getCurrentPage: this.currentPage,
      getPageSize: this.pageSize
    };
  },
  methods: {
    // 每页条数变更
    handleSizeChange(val) {
      this.getPageSize = val;
      this.$emit("sizeChange", val);
    },
    // 当前页码变更
    handleCurrentChange(val) {
      this.getCurrentPage = val;
      this.$emit("currentChange", val);
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
