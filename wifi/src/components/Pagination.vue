<!--
 * @Author: 李志远
 * @Date: 2020-04-01 16:18:25
 * @LastEditTime: 2020-04-02 11:12:37
 * @LastEditors: 李志远
 * @Description: 
 * @FilePath: \vue-cli3-project\src\views\layout\Pagination.vue
 * @写bug苦逼，一直写bug一直苦逼
 -->
<template>
  <section class="pagination">
    <div class="c-pagination fr">
      <span class="fl total-count">共 {{ pageOption.total }} 条</span>
      <el-select @change="handlerSelect" v-model="selectData" class="fl pagination-select">
        <el-option
          :value="item"
          :label="item + '条/页'"
          v-for="(item, index) in pageOption.pageSizes"
          :key="index"
        ></el-option>
      </el-select>
      <el-button
        type="button"
        class="btn-type-2 fl btn-prev"
        :disabled="pageNo - 1 === 0"
        @click="jumpTo(pageNo - 1 === 0 ? 1 : pageNo - 1)"
      >
        <i class="el-icon el-icon-arrow-left"></i>
      </el-button>
      <ul class="ul-fl" v-if="pageNo">
        <template v-if="totalPage <= 6">
          <li class="fl" v-for="i in totalPage" :key="i+'a'">
            <a
              class="c-inl"
              :class="{current: i === pageNo }"
              @click="jumpTo(i)"
              href="javascript:;"
            >{{ i }}</a>
          </li>
        </template>
        <template v-else>
          <template v-if="totalPage - pageNo < 6">
            <li class="fl el-icon more btn-quicknext el-icon-more fl-more"></li>
            <li class="fl" v-for="i in 6" :key="i+'v'">
              <a
                class="c-inl"
                :class="{current: totalPage - 6 + i === pageNo }"
                @click="jumpTo(totalPage - 6 + i)"
                href="javascript:;"
              >{{ totalPage - 6 + i }}</a>
            </li>
          </template>
          <template v-else>
            <template v-if="pageNo === 1 || pageNo === 2">
              <li class="fl" v-for="i in 3" :key="i+'b'">
                <a
                  class="c-inl"
                  :class="{current: i === pageNo }"
                  @click="jumpTo(i)"
                  href="javascript:;"
                >{{ i }}</a>
              </li>
            </template>
            <template v-else>
              <li class="fl el-icon more btn-quicknext el-icon-more fl-more"></li>
              <li class="fl" v-for="i in 3" :key="i+'c'">
                <a
                  class="c-inl"
                  :class="{current: pageNo - 2 + i === pageNo }"
                  @click="jumpTo(pageNo - 2 + i)"
                  href="javascript:;"
                >{{ pageNo - 2 + i }}</a>
              </li>
            </template>
            <li class="fl el-icon more btn-quicknext el-icon-more fl-more"></li>
            <li class="fl" v-for="i in 3" :key="i+'d'">
              <a
                class="c-inl"
                :class="{current: totalPage - 3 + i === pageNo }"
                @click="jumpTo(totalPage - 3 + i)"
                href="javascript:;"
              >{{ totalPage - 3 + i }}</a>
            </li>
          </template>
        </template>
      </ul>
      <el-button
        type="button"
        class="btn-type-2 fl btn-prev"
        :disabled="pageNo + 1 > (totalPage || 0)"
        @click="jumpTo(pageNo + 1 > (totalPage || 0) ? pageNo : pageNo + 1)"
      >
        <i class="el-icon el-icon-arrow-right"></i>
      </el-button>
      <form class="fl" @submit.prevent="jumpTo(goPageNo)" v-if="totalPage > 1">
        <div class=" fl">
          <el-input class="tc jump-ipt" type="text" v-model="goPageNo" @blur="blurHandler"></el-input>
        </div>
        <button class="fl tc btn-type-2" type="submit">跳转</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "CPage",
  props: ["pageOption", "jumpTo"],
  data() {
    return {
      goPageNo: this.pageOption.pageNo || 1,
      selectData: this.pageOption.pageSizes[0]
    };
  },
  computed: {
    pageNo() {
      return this.pageOption.pageNo || 1;
    },
    totalPage() {
      return this.pageOption.totalPage || 1;
    }
  },
  watch: {
    // totalPage() {
    //   return this.pageOption.totalPage = Math.ceil(this.pageOption.total / this.pageOption.pageSize);
    // }
  },
  mounted() {
    this.handlerSelect(10)
  },
  methods: {
    blurHandler() {
      if (!this.goPageNo || this.goPageNo < 1) {
        this.goPageNo = 1;
      }
      if (!/(^[1-9]\d*$)/.test(this.goPageNo)) {
        this.goPageNo = 1;
      }
      if (this.goPageNo > this.totalPage) {
        this.goPageNo = this.totalPage;
      }
    },
    handlerSelect(val) {
      this.pageOption.totalPage = Math.ceil(this.pageOption.total / val);
      this.$emit('handlerSelect', val)
    }
  }
};
</script>

<style lang="scss">
.btn-type-2 {
  padding: 0 !important
}
.pagination-select .el-input__inner {
  height: 28px;
  min-width: 98px;
}
.jump-ipt.el-input .el-input__inner {
  height: 28px;
  box-sizing: border-box;
  width: 46px;
}
.el-icon-arrow-left:before {
  content: "\e6de";
}
.fr {
  float: right;
}
.fl-more {
  width: 32px;
  height: 32px;
}

.more::before {
  text-align: center;
  display: inline-block;
  width: 100%;
  line-height: 28px;
}
.c-pagination .el-select .el-input {
  width: 100px;
}
.pagination-select {
  // width: 100px;
  height: 30px;
  .el-input {
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 13px;
    font-weight: normal;
    .el-input__icon {
      line-height: 30px;
    }
    // }
  }
}
.total-count {
  display: inline-block;
  font-size: 13px;
  min-width: 57px;
  height: 30px;
  line-height: 30px;
  vertical-align: top;
  box-sizing: border-box;
  margin-right: 10px !important;
  font-weight: normal;
  color: #606266;
  white-space: nowrap;
}
.c-pagination {
  // line-height: 32px;
  margin: 10px;
  display: inline-block;
  * {
    padding: 0;
    margin: 0;
    border: 0;
    color: #99c9fa;
  }
  .ul-fl {
    float: left;
  }
  .fl {
    float: left;
    // border-radius: 3px;
    // background-color: rgba(0, 0, 0, 0.25);
  }
  a {
    text-decoration: none;
  }
  button {
    width: 35px;
    margin-left: 6px;
    margin-right: 6px;
  }
  input {
    width: 75px;
    border: none;
    outline: none;
    text-align: center;
  }
  li {
    margin: 0 3px;
    list-style: none;
    a {
      line-height: 30px;
      width: 30px;
      text-align: center;
      display: inline-block;
      border-radius: 3px;
      &:hover {
        color: #409eff;
        // background-color: #ff7362;
        // color: #fff;
        // border-radius: 50%;
      }
    }
  }
  .btn-type-2,
  .input-icon {
    line-height: 26px;
    border: 1px solid #134276;
    font-size: inherit;
    border-radius: 3px;
    background: radial-gradient(#0a4c9a, transparent);
  }
  .ctrl-l,
  .ctrl-r {
    width: 28px;
    background-size: 13px 13px;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .ctrl-l {
    margin-left: 16px;
  }
  .ctrl-l {
    transform: rotate(180deg);
  }
  .input-icon {
    margin-left: 6px;
  }
  .current {
    border-radius: 2px;
    background: rgba(0, 0, 0, 1);
    color: #409eff;
  }
}
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
  background: radial-gradient(#0a4c9a, transparent);
  border: 1px solid #134276;
}
</style>