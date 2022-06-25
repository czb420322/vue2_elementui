<template>
<div class="gs-pagination-warpper">
    <el-pagination class='gs-pagination'
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :simple="simple"
  :current-page="currentPage"
  :page-sizes="pageSizes"
  :page-size="pageSize"
  :background='background'
  layout='total, sizes, prev'
  :total="total">
  </el-pagination>
  <el-pagination class='gs-pagination'
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :simple="simple"
  :current-page="currentPage"
  :page-sizes="pageSizes"
  :page-size="pageSize"
  :background='background'
  layout='pager, next, jumper'
  :total="total">
  </el-pagination>
  <el-pagination class='gs-pagination'
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :simple="simple"
  :current-page="currentPage"
  :page-sizes="pageSizes"
  :page-size="pageSize"
  :background='background'
  layout='slot'
  :total="total">
  <span class="gs-pagination-btn" @click="clickjumper">
      确定
  </span>
  </el-pagination>
</div>
</template>


<script>
export default {
  name: 'Paginations',
  props: {
      total: {
          type: [Number,String],
          default: 0
      },
      currentPage: {
          type: [Number,String],
          default: 1
      },
      pageSize: {
          type: [Number,String],
          default: 10
      },
      pageSizes: {
          type: Array,
          default: function() {
              return [2, 20, 50, 100, 200]
          }
      },
      background: {
          type: Boolean,
          default: true
      },
      simple: {
          type: Boolean,
          default: false
      }
  },
  data() {
      return {

      }
  },
  methods: {
    clickjumper() {
        this.$emit('change-current-page', this.currentPage)
    },
    // 每页条数变更
    handleSizeChange(val) {
        this.$emit('size-change', val)
    },
    // 当前页码变更
    handleCurrentChange(val) {
        this.$emit('current-change', val)
    }
  }
}
</script>


<style lang="">
.gs-pagination-warpper {
    text-align: right;
    padding: 10px 0 0 0;
}
/* .gs-pagination {
    display: inline-block;
} */
.gs-pagination-btn {
    background: #134276;
    width: 50px;
    text-align: center;
    border-radius: 4px;
    color:#99c9fa;
    font-size: 13px;
    font-weight: 400;
}
.gs-pagination-btn:hover {
    cursor: pointer;
}
</style>
