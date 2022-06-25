<!--
 * @Author: your name
 * @Date: 2021-06-07 16:14:32
 * @LastEditTime : 2021-06-24 17:10:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev-changshu-noBigData\vacp-wfes\src\page\VideoStructPlatform\caseInfo\caseList.vue
 -->
<template>
  <div class="onlinecoll">
    <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页 ></router-link>
      <p class="sysname">&nbsp;案件列表</p>
      <p class="clicklink">
        <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/resourceManage',query:{menuCode:704}}"
        >涉案视频管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/taskManage',query:{menuCode:701}}">任务管理</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/semanticSearch',query:{menuCode:702}}"
        >特征搜索</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/searchPrint',query:{menuCode:703}}">以图搜图</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/videoRetrieval',query:{menuCode:710}}"
        >检索查询</router-link>
        <!-- <router-link tag="span" :to="{path:'/videoStrucPlat/caseList',query:{menuCode:711}}">案件管理</router-link> -->
        <router-link tag="span" :to="{path:'/videoStrucPlat/MarkPool',query:{menuCode:712}}">标注池</router-link>
      </p>
    </div>
    <div class="caseList">
      <div class="searchCondition">
        <div style="" class="titleColor">案件名称:&nbsp;&nbsp;</div>
        <input
          autocomplete="off"
          type="text"
          v-model="kayword"
          style="padding-left:5px"
          placeholder="请输入案件名称"
        >
        <div
          class="titleColor"
        >创建人:&nbsp;&nbsp;</div>
        <el-select
          v-model="createdPerson"
          class="caseNameSelect"
          placeholder="请选择创建人"
          @change="createChange"
        >
          <el-option value label="全部"></el-option>
          <el-option
            v-for="(item,index) in createdPersonList"
            :value="item.creator"
            :label="item.userName"
            :key="index"
          ></el-option>
        </el-select>

        <div
          class="titleColor"
        >案件类型:&nbsp;&nbsp;</div>
        <el-select
          v-model="caseType"
          class="caseNameSelect"
          placeholder="请选择案件类型"
          @change="caseTypeChange"
        >
          <el-option value label="全部"></el-option>
          <el-option
            v-for="(item,index) in caseTypeList"
            :value="item.value"
            :lable="item.value"
            :key="index"
          ></el-option>
        </el-select>

        <div
          class="titleColor"
        >案发时间:&nbsp;</div>
        <el-input
          id="timeBegin"
          class="caseNameSelect caseNameSelectDate"
          placeholder="请选择开始时间"
          autocomplete="off"
          readonly
          v-model="beginTime"
        >
          <i slot="prefix" class="el-input__icon el-icon-time"></i>
        </el-input>
        <span class="to">&nbsp;-&nbsp;</span>
        <el-input
          id="timeEnd"
          class="caseNameSelect caseNameSelectDate"
          placeholder="请选择结束时间"
          autocomplete="off"
          readonly
          v-model="endTime"
        >
          <i slot="prefix" class="el-input__icon el-icon-time"></i>
        </el-input>
        <div class="buttonns">
          <el-button
            style="margin-left:0.2rem"
            type="primary"
            class="searchBtn"
            icon="el-icon-search"
            size="small"
            @click="currentPage = 1;searchCase()"
          >查询</el-button>
          <el-button
            type="warning"
            icon="el-icon-refresh"
            class="tryBtn"
            size="small"
            @click="reset"
          >重置</el-button>
          <el-button
            type="success"
            class="searchBtn"
            icon="el-icon-plus"
            size="small"
            @click="addCase"
          >新增</el-button>
        </div>
      </div>

      <div class="contentTable">
        <el-table :data="tableData" border class="tables" height="5.2rem">
          <div slot="empty">
            <div class="noImg">
              <img src="../../../assets/updataImg/NoData.png">
            </div>
          </div>
          <el-table-column prop="caseIndex" show-overflow-tooltip width="80" label="序号">
            <template slot-scope="scope">
              <span>{{(scope.$index + 1) + (currentPage-1)*pageSize}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="caseLinkMark" width="80" label="案件编号"></el-table-column>
          <el-table-column prop="caseName" show-overflow-tooltip width="150" label="案件名称"></el-table-column>
          <el-table-column prop="caseCategoryDesc" show-overflow-tooltip width="80" label="案件类型"></el-table-column>
          <el-table-column prop="regionFullName" show-overflow-tooltip label="案件区域"></el-table-column>
          <el-table-column prop="timeLowLimit" show-overflow-tooltip label="案发时间" width="160">
            <!-- <template slot-scope="scope">
              <span>{{timeLowLimit | filterTime}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="creatorName" show-overflow-tooltip label="创建人"></el-table-column>
          <el-table-column prop="timeUpLimit" show-overflow-tooltip label="最后修改时间"></el-table-column>
          <el-table-column width="300" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                class="searchBtn"
                icon="el-icon-edit"
                size="small"
                @click="editCase(scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                class="delBtn"
                size="small"
                icon="el-icon-circle-close"
                @click="deleteCase(scope.row.caseUuid)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pageNation">
        <pagination
          :total="totalCount"
          :current-page="currentPage"
          :page-size="pageSize"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kayword: "", //关键字
      createdPerson: "", //创建人
      createdPersonList: [], //创建人列表
      caseType: "", //案件类型
      caseTypeList: [], //案件类型列表
      beginTime: "", //案发开始时间
      endTime: "", //案发结束时间
      timeBegin: "",
      timeEnd: "",
      tableData: [], //案件列表
      totalCount: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      pageSizes: [10, 20, 30] //下拉框选择的显示条数
    };
  },
  filters: {
    filterTime(val) {
      console.log(val, "val");
      let date = new Date(val);
      let YY = date.getFullYear();
      let MM =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
    }
  },
  methods: {
    //查询
    searchCase() {
      this.ajaxCaseList();
    },
    ajaxCaseList() {
      let userId = this.$storage.getSession("userInfo").userId;
      let data = this.getData();
      this.$http
        .get("pca/video/caseInfo/caseBase/list", { params: data })
        .then(res => {
          this.tableData = res.data.data.list; //所有数据
          this.totalCount = res.data.data.totalCount; //页面总数
          this.currentPage = res.data.data.pageNum; //当前页
          this.pageSize = res.data.data.pageSize; //每页条数
        });
    },
    getData() {
      let data = {
        pageNum: this.currentPage, //当前页
        pageSize: this.pageSize, //当前页结果数量
        orderBy: "update_time", //排序字段
        orderType: "desc", //排序方式
        begin: this.beginTime, //开始时间
        end: this.endTime, //结束时间
        caseName: this.kayword, //关键字
        caseCategory: this.caseType, //案件类型
        userId: this.createdPerson, //创建人
        status: 1,
        synergy: -1
      };
      return data;
    },
    sizeChange(val) {
      this.pageSize = val;
      this.ajaxCaseList();
    },
    currentChange(val) {
      this.currentPage = val;
      this.ajaxCaseList();
    },
    //获取案件类型列表
    getCaseTypeList() {
      this.caseTypeList = [
        {
          key: "CaseType",
          field: "40100",
          value: "散布恐怖信息"
        },
        {
          key: "CaseType",
          field: "40201",
          value: "入室盗窃"
        },
        {
          key: "CaseType",
          field: "40202",
          value: "扒窃"
        },
        {
          key: "CaseType",
          field: "40203",
          value: "拎包盗窃"
        },
        {
          key: "CaseType",
          field: "40204",
          value: "盗窃机动车"
        },
        {
          key: "CaseType",
          field: "40205",
          value: "盗窃其他"
        },
        {
          key: "CaseType",
          field: "40300",
          value: "伤害"
        },
        {
          key: "CaseType",
          field: "40301",
          value: "家庭暴力"
        },
        {
          key: "CaseType",
          field: "40401",
          value: "入室抢劫"
        },
        {
          key: "CaseType",
          field: "40402",
          value: "拦路抢劫"
        },
        {
          key: "CaseType",
          field: "40403",
          value: "抢劫出租车"
        },
        {
          key: "CaseType",
          field: "40404",
          value: "抢劫其他"
        },
        {
          key: "CaseType",
          field: "40501",
          value: "飞车抢夺"
        },
        {
          key: "CaseType",
          field: "40502",
          value: "抢夺其他"
        },
        {
          key: "CaseType",
          field: "40600",
          value: "凶杀"
        },
        {
          key: "CaseType",
          field: "40701",
          value: "轮奸"
        },
        {
          key: "CaseType",
          field: "40702",
          value: "奸幼"
        },
        {
          key: "CaseType",
          field: "40703",
          value: "强奸其他"
        },
        {
          key: "CaseType",
          field: "40800",
          value: "诈骗"
        },
        {
          key: "CaseType",
          field: "40900",
          value: "敲诈"
        },
        {
          key: "CaseType",
          field: "41000",
          value: "爆炸"
        },
        {
          key: "CaseType",
          field: "41100",
          value: "投毒"
        },
        {
          key: "CaseType",
          field: "41200",
          value: "绑架"
        },
        {
          key: "CaseType",
          field: "41300",
          value: "拐卖人口"
        },
        {
          key: "CaseType",
          field: "41400",
          value: "决水"
        },
        {
          key: "CaseType",
          field: "41500",
          value: "纵火"
        },
        {
          key: "CaseType",
          field: "41600",
          value: "非法拘禁"
        },
        {
          key: "CaseType",
          field: "41700",
          value: "引诱胁迫卖淫"
        },
        {
          key: "CaseType",
          field: "41800",
          value: "走私"
        },
        {
          key: "CaseType",
          field: "41900",
          value: "制贩运输毒品"
        },
        {
          key: "CaseType",
          field: "42000",
          value: "其他"
        }
      ];
    },
    //重置
    reset() {
      this.beginTime = ""
      this.endTime = ""
      this.kayword = "";
      this.createdPerson = "";
      this.caseType = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.reloadTime()
      this.searchCase();
    },
    //新增案件
    addCase() {
      this.$router.push({
        path: "/videoStrucPlat/caseParticulars?caseIndex=1"
      });
    },
    //编辑案件
    editCase(row) {
      this.$router.push({
        path: "/videoStrucPlat/caseParticulars?caseIndex=2",
        query: { caseUuid: row.caseUuid }
      });
    },
    //删除案件
    deleteCase(id) {
      this.$myconfirm({
        type: "提示",
        msg: "此操作将删除该案件相关的所有信息, 是否继续?",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          caseUuid: id
        };
        data = this.$qs.stringify(data);
        this.$http.post("pca/video/caseInfo/caseBase/del", data).then(res => {
          if (res.data.code == 200) {
            this.$notify({
              type: "success",
              message: "案件删除成功！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "warning",
              message: "案件删除失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
          this.reset();
        });
      });
    },
    //获取当前日期时间
    getCurrentDate() {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hours +
        seperator2 +
        minutes +
        seperator2 +
        seconds;
      return currentdate;
    },
    //获取创建人
    getCreatedList() {
      this.$http.post("pca/video/caseInfo/caseBase/queryName").then(res => {
        if (res.data.code == 200) {
          this.createdPersonList = res.data.data;
        }
      });
    },
    //创建人切换
    createChange(val) {
      this.createdPerson = val;
      this.searchCase();
    },
    caseTypeChange(val) {
      this.caseType = val;
      this.searchCase();
    },
    // 加载时间
    reloadTime() {
      this.timeBegin = laydate.render({
        elem: "#timeBegin",
        type: "datetime",
        max: this.getCurrentDate(), //0天后
        btns: ["now", "confirm"],
        done: (value, date, endDate) => {
          // this.searchData.beginDateTime = value;
          this.beginTime = value;
          this.timeEnd.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });

      this.timeEnd = laydate.render({
        elem: "#timeEnd",
        type: "datetime",
        max: 1,
        btns: ["now", "confirm"],
        done: (value, date, endDate) => {
          // this.searchData.endDateTime = value;
          this.endTime = value;
          this.timeBegin.config.max = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
    }
  },
  mounted() {
    // this.timeBegin = laydate.render({
    //   elem: "#timeBegin",
    //   type: "datetime",
    //   max: this.getCurrentDate(), //0天后
    //   btns: ["now", "confirm"],
    //   done: (value, date, endDate) => {
    //     // this.searchData.beginDateTime = value;
    //     this.beginTime = value;
    //     this.timeEnd.config.min = {
    //       year: date.year,
    //       month: date.month - 1, //关键
    //       date: date.date,
    //       hours: date.hours,
    //       minutes: date.minutes,
    //       seconds: date.seconds
    //     };
    //   }
    // });

    // this.timeEnd = laydate.render({
    //   elem: "#timeEnd",
    //   type: "datetime",
    //   max: 1,
    //   btns: ["now", "confirm"],
    //   done: (value, date, endDate) => {
    //     // this.searchData.endDateTime = value;
    //     this.endTime = value;
    //     this.timeBegin.config.max = {
    //       year: date.year,
    //       month: date.month - 1, //关键
    //       date: date.date,
    //       hours: date.hours,
    //       minutes: date.minutes,
    //       seconds: date.seconds
    //     };
    //   }
    // });
    this.reloadTime()
    this.searchCase();
    //获取案件类型
    this.getCaseTypeList();
    //获取创建人
    this.getCreatedList();
  }
};
</script>


<style  scoped>
@import "../../../assets/css/commom.css";
.onlinecoll {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.caseList {
  width: 100%;
  height: calc(100% - 0.6rem);
  /* border: 1px solid red; */
}
.searchCondition {
  padding-bottom: 0.2rem;
  width: 100%;
  display: flex;
  font-size: 0.14rem;
  padding-left: 0.2rem;
  /* margin: 0 auto; */
  margin-top: 0.2rem;
}
.searchCondition /deep/ .el-date-editor,
.searchCondition /deep/ input {
  height: 0.28rem;
}
input:focus {
  border: 0.01rem solid #409eff;
}

.titleColor {
  color: #99c9fa;
  margin-top: 0.05rem;
  min-width: 0.68rem;
  margin-left: 0.2rem;
  text-align: right;
}
.caseNameSelect {
  width: 1.5rem;
  color: #c5c5c5;
}
.caseNameSelectDate {
  width: 2rem;
  font-size: 0.14rem;
}
.contentTable /deep/ .el-table {
  width: calc(100% - 0.4rem);
  text-align: center;
  border-collapse: collapse;
  font-size: 0.14rem;
  color: red;
  -webkit-border-horizontal-spacing: 0px;
  -webkit-border-vertical-spacing: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-color: grey;
  margin-bottom: 0.1rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.contentTable /deep/ .el-table th {
  background-color: #f3f6f8;
  text-align: center;
}
.to {
  margin-top: 0.05rem;
}
.el-input__suffix /deep/ .el-input__icon {
    line-height: .34rem;
}
.buttonns{
    margin-left: .1rem
}


@media (max-width:1440px){
    .titleColor{
        width: .9rem;
    }
    .caseNameSelectDate  .el-input__icon,
    .caseNameSelectDate /deep/  .el-input__icon {
        height: 21px;
    }
    .buttonns .el-button{
        padding: 0.06rem 0.1rem;
    }
}
</style>
