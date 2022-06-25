<!--
 * @Author: 李志远
 * @Date: 2020-03-11 15:53:06
 * @LastEditTime : 2021-01-04 15:37:57
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vue-cli3-project\src\views\layout\DataDialog.vue
 * @写bug苦逼，一直写bug一直苦逼
 -->
<template>
  <gs-dialog
    class="excel-dialog-warpper"
    title="基站数据导入"
    :visible.sync="isVisible"
    :show-close="true"
    width="10rem"
    @corner-close="closeHandler"
    @open="openHandler"
    @close="closeHandler"
  >
    <el-main
      style="width: 100%; height: 100%"
      v-loading="loading"
      element-loading-text="正在上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <gs-panel>
        <div slot="gsHeader">
          <gs-search :isShowDefaultOperation="false">
            <el-form-item label="IMEI码">
              <el-select
                :disabled="isdisable"
                v-model="value"
                @change="checkValue"
                placeholder="请选择，此项为必填项"
              >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :disabled="item.disabled"
                  :label="'第'+ (item.type + 1) +'列'"
                  :value="index"
                ></el-option>
              </el-select>
              <div ref="value" class="err"></div>
            </el-form-item>
            <el-form-item label="IMSI码">
              <el-select
                :disabled="isdisable"
                v-model="value1"
                @change="checkValue1"
                placeholder="请选择，此项为必填项"
              >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :disabled="item.disabled"
                  :label="'第'+ (item.type + 1) +'列'"
                  :value="index"
                ></el-option>
              </el-select>
              <div ref="value1" class="err"></div>
            </el-form-item>
            <el-form-item label="经度">
              <el-select
                :disabled="isdisable"
                v-model="value2"
                @change="checkValue2"
                placeholder="请选择，此项为必填项"
              >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :disabled="item.disabled"
                  :label="'第'+ (item.type + 1) +'列'"
                  :value="index"
                ></el-option>
              </el-select>
              <div ref="value2" class="err"></div>
            </el-form-item>
            <el-form-item label="纬度">
              <el-select
                :disabled="isdisable"
                v-model="value3"
                @change="checkValue3"
                placeholder="请选择，此项为必填项"
              >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :disabled="item.disabled"
                  :label="'第'+ (item.type + 1) +'列'"
                  :value="index"
                ></el-option>
              </el-select>
              <div ref="value3" class="err"></div>
            </el-form-item>
            <el-form-item label="感知时间">
              <el-select
                :disabled="isdisable"
                v-model="value4"
                @change="checkValue4"
                placeholder="请选择，此项为必填项"
              >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :disabled="item.disabled"
                  :label="'第'+ (item.type + 1) +'列'"
                  :value="index"
                ></el-option>
              </el-select>
              <div ref="value4" class="err"></div>
            </el-form-item>
            <el-form-item label="电围名称">
              <el-select :disabled="isdisable" v-model="value5">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :disabled="item.disabled"
                  :label="'第'+ (item.type + 1) +'列'"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item slot="operation">
              <button
                type="button"
                class="gs-search-btn gs-query-btn searchBtn"
                @click.stop="searchList"
              >预览</button>
              <button type="button" class="gs-search-btn gs-reset-btn tryBtn" @click.stop="reset">重置</button>
              <el-popover placement="right" width="250" trigger="click" class="filp">
                <div>
                  <table border="solid" width="200px" height="200px" class="table">
                    <thead>
                      <tr>
                        <th>字段名称</th>
                        <th>导入支持数据类型</th>
                      </tr>
                    </thead>
                    <tbody class="table-tbody">
                      <tr>
                        <td>IMEI码</td>
                        <td>15-17位数字</td>
                      </tr>
                      <tr>
                        <td>IMSI码</td>
                        <td>15位数字</td>
                      </tr>
                      <tr>
                        <td rowspan="11">感知时间</td>
                        <td>*2012/3/14</td>
                      </tr>
                      <tr>
                        <td>*2012年3月14日</td>
                      </tr>
                      <tr>
                        <td>二。一二年三月十四日</td>
                      </tr>
                      <tr>
                        <td>2012年3月14日</td>
                      </tr>
                      <tr>
                        <td>2012/3/14</td>
                      </tr>
                      <tr>
                        <td>2012/3/14 1:30 PM</td>
                      </tr>
                      <tr>
                        <td>2012/3/14 1:30</td>
                      </tr>
                      <tr>
                        <td>12/3/14</td>
                      </tr>
                      <tr>
                        <td>3/14/12</td>
                      </tr>
                      <tr>
                        <td>03/14/12</td>
                      </tr>
                      <tr>
                        <td>14-Mar-12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="questionMark" slot="reference" title="导入说明"></div>
              </el-popover>
            </el-form-item>
          </gs-search>
        </div>
        <gs-table stripe :data="tableData" highlight-current-row ref="refTable" slot="gsMain">
          <!--数据源-->
          <el-table-column
            v-for="(col, index) in columns"
            :prop="col.prop"
            :label="col.label"
            :show-overflow-tooltip="true"
            :key="index"
          ></el-table-column>
        </gs-table>
      </gs-panel>
    </el-main>
    <div slot="footer">
      <el-progress
        v-show="isProgress"
        class="exportprogress"
        :stroke-width="6"
        :percentage="Number(percentage)"
        color="#8e71c7"
      ></el-progress>
      <el-button type="primary cancleBtn" @click.stop="isVisible = false">关闭</el-button>
      <el-button type="primary passBtn" @click.stop="importFileDemo">打开文件</el-button>
      <el-button type="primary passBtn" :disabled="btnDisable" @click="exportExcel">导入</el-button>
      <!-- <button
        type="button"
        class="gs-search-btn gs-reset-btn tryBtn"
        @click.stop="isVisible = false"
      >关闭</button>
      <button
        type="button"
        class="gs-search-btn gs-reset-btn searchBtn"
        @click.stop="importFileDemo"
      >打开文件</button>
      <button type="button" class="gs-search-btn gs-reset-btn searchBtn" @click="exportExcel">导入</button>-->
    </div>
  </gs-dialog>
</template>

<script>
/*eslint-disable */
import _ from "lodash";
export default {
  name: "ExcelImeiData",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    caseUuid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tableData: [], // table列表数据
      columns: [],
      xlsColumns: [], //存储原始的列
      options: [], // select下拉框数据
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      isdisable: false,
      relationship: [], //对应关系
      xlsList: [], // 接收c++传来的excel正文数据
      loading: false,
      // UploadUri: '',
      btnDisable: true,
      percentage: 0,
      isProgress: false,
      timer: "",
      load: null
    };
  },
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    // 计算下拉框选项改变
    linstne() {
      const { value, value1, value2, value3, value4, value5 } = this;
      return {
        value,
        value1,
        value2,
        value3,
        value4,
        value5
      };
    }
  },
  watch: {
    // 计算下拉框选项改变
    linstne: {
      handler(val) {
        //每次监听列数改变之前先清空下拉框的禁用样式
        this.options.forEach(function(item) {
          item.disabled = false;
        });
        if (val.value || val.value === 0) {
          this.options[val.value].disabled = true;
        }
        if (val.value1 || val.value1 === 0) {
          this.options[val.value1].disabled = true;
        }
        if (val.value2 || val.value2 === 0) {
          this.options[val.value2].disabled = true;
        }
        if (val.value3 || val.value3 === 0) {
          this.options[val.value3].disabled = true;
        }
        if (val.value4 || val.value4 === 0) {
          this.options[val.value4].disabled = true;
        }
        if (val.value5 || val.value5 === 0) {
          this.options[val.value5].disabled = true;
        }
      },
      deep: true
    },
    // 监听字段的改变
    xlsColumns: {
      handler: function(newVal, oldVal) {
        if (newVal.errorCode == 0) {
          this.processData(newVal.headData, newVal.bodyData);
        }
      },
      deep: true
    },
    loading: {
      handler: function(newVal, oldVal) {
        if (!newVal) {
          this.loading = false;
        }
      },
      deep: true
    },
    btnDisable: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.btnDisable = true;
        }
        if (!newVal) {
          this.btnDisable = false;
        }
      }
    }
  },
  created() {
    window.excelDxHandler = this.excelDxHandler;
  },
  mounted() {},
  methods: {
    // 验证必填项
    checkValue(val) {
      if (val || val == "0") {
        this.$refs.value.style.display = "none";
      }
    },
    checkValue1(val) {
      if (val || val == "0") {
        this.$refs.value1.style.display = "none";
      }
    },
    checkValue2(val) {
      if (val || val == "0") {
        this.$refs.value2.style.display = "none";
      }
    },
    checkValue3(val) {
      if (val || val == "0") {
        this.$refs.value3.style.display = "none";
      }
    },
    checkValue4(val) {
      if (val || val == "0") {
        this.$refs.value4.style.display = "none";
      }
    },

    //打开采集窗口，触发c++onOpenWindowstrus回调
    importFileDemo() {
      this.isProgress = false;
      this.load = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "上传中"
      });

      let url =
        "http://127.0.0.1:60000/DxHandler.js?cbk=excelDxHandler&req=20000000-0000-0000-0000-000000000000";
      let g_socket = document.createElement("script");
      g_socket.src = url;
      document.body.appendChild(g_socket);
      //设置上传文件的唯一id
      let excelUuid = Date.parse(new Date());
      sessionStorage.setItem("excelUuid", excelUuid);
      sessionStorage.setItem("isexcelloading", false);
      setTimeout(() => {
        this.load.close();
      }, 1500);
    },
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>excel文件导入模块开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //  获取导入的excel数据
    excelDxHandler(req, status, msg) {
      console.log(msg, 777444);
      let ReportUpload;
      var fileUuid = sessionStorage.getItem("excelUuid");
      localStorage.setItem("uploadportMsg", msg);
      clearInterval(ReportUpload);
      // 定时刷新定时器，获取c++返回结果
      ReportUpload = setInterval(() => {
        $.ajax({
          url: "http://127.0.0.1:" + msg + "?req=1&fileUuid=" + fileUuid,
          type: "GET",
          success: data => {
            if (JSON.parse(data).errorCode == 0) {
              this.xlsColumns = JSON.parse(data);
              clearInterval(ReportUpload);
            }
          },
          error: data => {
            this.xlsColumns = [];
            this.columns = [];
            this.value = "";
            this.value1 = "";
            this.value2 = "";
            this.value3 = "";
            this.value4 = "";
            this.value5 = "";
            console.log("是否触发");
            clearInterval(ReportUpload);
          }
        });
      }, 500);
    },
    // 处理数据
    processData(headData, bodyData) {
      console.log(headData, bodyData, 66999);
      // excel正文数据截取前100条数据
      let body = bodyData.slice(0, 100);
      // 重置数据
      this.value = "";
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.value4 = "";
      this.value5 = "";
      this.xlsColumns = [];
      this.tableData = [];
      this.xlsList = [];
      this.columns = [];
      this.relationship = [];
      this.options = [];
      this.isdisable = false;
      // 获取excel头部属性
      headData.forEach(v => {
        this.xlsColumns.push(v.value);
      });
      let arr = [];
      let arrlinecount = "";
      for (let i = 0; i < body.length; i++) {
        for (let k = 0; k < body[i].length; k++) {
          arr.push(body[i][k].value);
        }
        arrlinecount = body[i].length;
      }
      console.log(arrlinecount);
      let result = [];
      result = _.chunk(arr, arrlinecount);
      for (let i = 0; i < result.length; i++) {
        let obj = {};
        for (let x in result[i]) {
          obj[this.xlsColumns[x]] = result[i][x];
        }
        this.xlsList.push(obj);
      }
      this.tableData = this.xlsList;

      //渲染table列表中的字段列
      this.xlsColumns.forEach(item => {
        this.columns.push({
          prop: item,
          label: item
        });
      });
      // this.columns = this.xlsColumns
      //循环当前列数，给下拉框赋值当前列数的条数以及加上属性
      let obj = {
        type: 99,
        disabled: false
      };
      this.columns.forEach((item, index) => {
        this.options.push({
          type: index,
          disabled: false
        });
      });
      this.btnDisable = false;
    },

    //重新获取数据库列表
    searchList() {
      let arr1 = [];
      let arr = ["IMEI码", "IMSI码", "经度", "纬度", "时间", "基站名"];
      //循环选中对象，取出里面的数字，有数字是空
      for (const key in this.linstne) {
        arr1.push(this.linstne[key]);
      }
      this.columns = [];
      this.relationship = [];
      for (let i = 0; i < arr1.length; i++) {
        this.relationship.push({
          prop: this.xlsColumns[arr1[i]],
          label: arr[i]
        });
      }
      this.isdisable = true;
      let equalList = [];
      for (let i = 0; i < this.relationship.length; i++) {
        equalList.push(this.relationship[i].prop);
        if (this.relationship[i].prop !== undefined) {
          this.columns.push(this.relationship[i]);
        }
      }
      if (this.isAllEqual(equalList)) {
        // 如果没勾选列，给出提示，重置列表
        this.$notify({
          type: "warning",
          message: "请选择对应列数",
          position: "bottom-right",
          duration: 3000
        });
        this.isdisable = false;
        this.xlsColumns.forEach(item => {
          this.columns.push({
            prop: item,
            label: item
          });
        });
      }
    },
    // 判断数组里面的值是否全都相等
    isAllEqual(array) {
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value !== undefined;
        });
      } else {
        return true;
      }
    },
    // 源数据回溯
    reset() {
      //   this.value = "";
      //   this.value1 = "";
      //   this.value2 = "";
      //   this.value3 = "";
      //   this.value4 = "";
      //   this.value5 = "";
      this.$refs.value.style.display = "none";
      this.$refs.value1.style.display = "none";
      this.$refs.value2.style.display = "none";
      this.$refs.value3.style.display = "none";
      this.$refs.value4.style.display = "none";

      //   this.xlsColumns.forEach(item => {
      //     this.columns.push({
      //       prop: item,
      //       label: item
      //     });
      //   });
      //渲染table列表中的字段列
      this.columns = [];
      this.xlsColumns.forEach(item => {
        this.columns.push({
          prop: item,
          label: item
        });
      });
      // this.columns = this.xlsColumns
      //循环当前列数，给下拉框赋值当前列数的条数以及加上属性
      let obj = {
        type: 99,
        disabled: false
      };
      this.columns.forEach((item, index) => {
        this.options.push({
          type: index,
          disabled: false
        });
      });
      this.isdisable = false;
      this.isProgress = false;
      this.btnDisable = false;
    },
    // 导入方法执行
    exportExcel() {
      this.percentage = 0;
      if (
        (this.value1 || this.value1 == "0") &&
        (this.value2 || this.value2 == "0") &&
        (this.value3 || this.value3 == "0") &&
        (this.value4 || this.value4 == "0")
      ) {
        this.btnDisable = true;
        let columnsData = "";
        if (this.value === "" && this.value5 === "") {
          columnsData = `99-${this.value1}-${this.value2}-${this.value3}-${
            this.value4
          }-99`;
        } else if (this.value === "" && (this.value5 || this.value5 === "0")) {
          columnsData = `99-${this.value1}-${this.value2}-${this.value3}-${
            this.value4
          }-${this.value5}`;
        } else if (this.value5 === "" && (this.value || this.value === "0")) {
          columnsData = `${this.value}-${this.value1}-${this.value2}-${
            this.value3
          }-${this.value4}-99`;
        } else {
          columnsData = `${this.value}-${this.value1}-${this.value2}-${
            this.value3
          }-${this.value4}-${this.value5}`;
        }
        this.sendData(columnsData, this.caseUuid);
        if (sessionStorage.getItem("excelUuid")) {
          // 进度条
          this.isProgress = true;
          this.timer = setInterval(() => {
            let excelUuid =
              this.caseUuid + "_" + sessionStorage.getItem("excelUuid");
            let data = {
              caseUuidTimestamp: excelUuid
            };
            this.$http
              .get("vsas/baseStation/getExcelLimit", {
                params: data
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.percentage = res.data.data;
                  if (res.data.data == 100) {
                    clearInterval(this.timer); // 清空定时器
                  }
                } else {
                  this.$notify({
                    type: "error",
                    message: "没有进度",
                    position: "bottom-right",
                    duration: 3000
                  });
                  this.isProgress = false;
                  clearInterval(this.timer); // 清空定时器
                }
              });
          }, 1000);
        }
      } else {
        // 验证显示
        this.btnDisable = false;
        if (this.value === "") {
          this.$refs.value.innerHTML = "请选择IMEI码";
          this.$refs.value.style.display = "block";
        }
        if (this.value1 === "") {
          this.$refs.value1.innerHTML = "请选择IMSI码";
          this.$refs.value1.style.display = "block";
        }
        if (this.value2 === "") {
          this.$refs.value2.innerHTML = "请选择经度";
          this.$refs.value2.style.display = "block";
        }
        if (this.value3 === "") {
          this.$refs.value3.innerHTML = "请选择纬度";
          this.$refs.value3.style.display = "block";
        }
        if (this.value4 === "") {
          this.$refs.value4.innerHTML = "请选择感知时间";
          this.$refs.value4.style.display = "block";
        }
      }
    },
    // 向c++发送导入excel对应字段的参数
    sendData(columnsData, caseUuid) {
      var msg = localStorage.getItem("uploadportMsg");
      var UploadUri = localStorage.getItem("UploadUri");
      var fileUuid = sessionStorage.getItem("excelUuid");
      $.ajax({
        url:
          "http://127.0.0.1:" +
          msg +
          "?req=3&fileUuid=" +
          caseUuid +
          "_" +
          fileUuid +
          "&webUrl=" +
          UploadUri +
          "&newHeadNo=" +
          columnsData,
        type: "GET",
        success: data => {
          if (JSON.parse(data).errorCode == 0) {
            setTimeout(() => {
              this.$notify({
                type: "success",
                message: "上传成功",
                position: "bottom-right",
                duration: 3000
              });
            }, 1000);
            this.isProgress = true;
          } else {
            this.$notify({
              type: "warning",
              message: "上传失败",
              position: "bottom-right",
              duration: 3000
            });
            this.btnDisable = false;
            this.isProgress = false;
            clearInterval(this.timer); // 清空定时器
          }
          // 退出excel文件导入程序
          // this.clearExe()
        }
      });
    },
    // 清除excel导入程序
    clearExe() {
      var msg = localStorage.getItem("uploadportMsg");
      var fileUuid = sessionStorage.getItem("excelUuid");
      $.ajax({
        url: "http://127.0.0.1:" + msg + "?req=2&fileUuid=" + fileUuid,
        type: "GET",
        success: function(data) {
          if (JSON.parse(data).errorCode == 0) {
            console.log("清除程序成功-------------------------------------");
          }
        }
      });
    },

    // 打开页面执行
    openHandler() {
      // 初始化变量和数据
      this.btnDisable = true;
      window.thisLoading = this;
      this.loading = false;
      this.value = "";
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.value4 = "";
      this.value5 = "";
      this.xlsColumns = [];
      this.tableData = [];
      this.columns = [];
      this.relationship = [];
      this.options = [];
      this.isdisable = false;
      sessionStorage.removeItem("excelUuid");
      this.$http.get("vsas/baseStation/getUploadUri").then(res => {
        localStorage.setItem("UploadUri", res.data.data);
      });
    },
    closeHandler() {
      // 初始化变量和数据
      this.clearExe();
      this.value = "";
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.value4 = "";
      this.value5 = "";
      this.xlsColumns = [];
      this.tableData = [];
      this.columns = [];
      this.relationship = [];
      this.options = [];
      this.isProgress = false;
      // 隐藏验证
      this.$refs.value1.style.display = "none";
      this.$refs.value2.style.display = "none";
      this.$refs.value3.style.display = "none";
      this.$refs.value4.style.display = "none";
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.err {
  font-size: 14px;
  line-height: 0.24rem;
  color: red;
  padding-left: 0.15rem;
}

.excel-dialog-warpper .el-dialog__wrapper /deep/ .el-dialog__headerbtn {
  display: none;
}
.excel-dialog-warpper /deep/ .el-form .el-form-item__label {
  color: #99c9fa;
  width: 70px;
}
.gs-search-btn {
  height: 28px;
  line-height: 14px;
  text-align: center;
  padding: 0 12px;
  color: #fff;
  font-size: 14px;
  border: 0;
  cursor: pointer;
  margin-left: 15px;
}

.excel-imei-data-footer {
  text-align: right;
  margin-top: 2px;
}

.excel-dialog-warpper button:disabled {
  cursor: not-allowed;
  background-color: rgba(0, 0, 0, 0.25) !important;
}

.exportprogress {
  display: inline-block;
  width: 200px;
  margin-right: 20px;
}
.exportprogress /deep/ .el-progress__text {
  color: #fff;
}
.questionMark {
  background: url("../../../assets/images/videoNewImg/questionMark.png")
    no-repeat;
  width: 20px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  left: 160px;
}
.el-popover /deep/ .popper__arrow {
  border-right-color: #99c9fa !important;
}
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  text-align: center;
  color: #99c9fa;
}
.table-tbody {
  border: 1px solid #134276;
}
table tr th {
  color: #4b9de8;
  text-align: center;
  padding: 0.05rem;
  border: 1px solid #134276;
}
table tr td {
  line-height: 30px;
}
</style>
