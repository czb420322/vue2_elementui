<template>
  <el-dialog
    :visible.sync="isShow"
    width="11.5rem"
    min-width="906px"
    top="5%"
    @open="openDailog"
    :before-close="closePop"
    title="串并案列表"
  >
    <div class="popCaseList">
      <div class="content">
        <div class="contentTitle">
          <div class="searchCondition">
            <div class="scItem">串并案名称:&nbsp;&nbsp;</div>
            <input class="caseNameSelect" type="text" v-model="caseName" placeholder="请输入串并案名称">
            <div class="scItem">串并案状态:&nbsp;&nbsp;</div>
            <el-select class="caseNameSelect select1" id="select1" v-model="comboState" placeholder="请选择串并案状态">
              <el-option v-for="(item,index) in comboStatelist" :key='index' :label="item.name" :value="item.value"></el-option>
               <!-- <option value="">不限</option>
              <option value="0">并案</option>
              <option value="1">串案</option>  -->
            </el-select>
            <div class="scItem">创建用户:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect"  v-model="createUser" placeholder="请输入用户名称">
          </div>
          <div  class="searchCondition">
            <div class="scItem">创建时间:&nbsp;&nbsp;</div>
            <input id="beginTime" class="caseNameSelect timeSelect" placeholder="请选择开始时间" v-model="beginDateTime">
            <p class="scItemP">到</p>
            <input id="endTime" class="caseNameSelect timeSelect" placeholder="请选择结束时间" v-model="endDateTime">
            <div class="scItemBtn">
              <el-button  class="searchBtn" icon="el-icon-search" @click="queryData()">查询</el-button>
              <el-button class="tryBtn" icon="el-icon-refresh" @click="reset">重置</el-button>
            </div>
          </div>
        </div>
        <div class="needApproveContainer">
          <div class="contentTable">
            <div class="table">
              <el-table
                :data="tableData"
                height="400"
                style="width:100%;"
                border
              >
                <div slot="empty">
                    <div class="noImg">
                        <img src="../../../assets/updataImg/NoData.png" />
                    </div>
                </div>
                <el-table-column
                  type="index"
                  width="60"
                  align="center"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="caseName"
                  align="center"
                  show-overflow-tooltip
                  label="串并案名称">
                </el-table-column>
                <el-table-column
                  prop="comboState"
                  align="center"
                  show-overflow-tooltip
                  label="串并案状态">
                </el-table-column>
                <el-table-column
                  prop="caseState"
                  align="center"
                  show-overflow-tooltip
                  label="审批状态"
                  :formatter="formatStatus">
                </el-table-column>
                <el-table-column
                  prop="createUser"
                  align="center"
                  show-overflow-tooltip
                  label="创建用户">
                </el-table-column>
                <el-table-column
                  prop="creatorOrg"
                  align="center"
                  show-overflow-tooltip
                  label="创建部门">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="创建时间">
                </el-table-column>

                <el-table-column
                  prop="description"
                  align="center"
                  show-overflow-tooltip
                  label="串并案描述">
                </el-table-column>

                <el-table-column label="操作" align="center" min-width="150">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        :disabled="scope.row.caseState == 1"
                        size="mini"
                        type="success"
                        icon="el-icon-plus"
                        class="topBtn"
                        @click="addToCase(scope.row,scope.$index)">添加串并</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pageNation">
              <el-pagination style="float: right;margin-right: 10px;"
                 :background=true
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="Number(this.pageNo)"
                 :page-sizes="[10, 20, 30, 40, 50, 100]"
                 :page-size="Number(this.pageSize)"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total=Number(this.totalNum)>
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  // import '../../../common/laydate/laydate.js'
  export default {
    name: "addCaseFromSearch",
    props:{
      isShow:{
        type: Boolean,
        default(){
          return false;
        }
      },
      caseUuid:{
        type: String,
        default(){
          return "";
        }
      }
    },
    data(){
      return {
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,
        beginDateTime: "",
        endDateTime: "",
        tableData: [],
        caseName: '',
        comboState: '',
        createUser: '',
        comboStatelist:[
          {value:'',name:'不限'},
           {value:0,name:'并案'},
            // {value:1,name:'串案'}
        ],
        //时间控件具体对象
        beginTime:null,
        endTime:null
      }
    },
    watch:{
      isShow (newValue,oldValue){
        return newValue;
      },
      caseUuid:{
        handler(newValue,oldValue){
         return newValue;
        }
      }
    },
    methods: {
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
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + hours + seperator2 + minutes
          + seperator2 + seconds;
        return currentdate;
      },
      // 监听每页条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNo = 1;
        this.queryData();
      },
      // 监听当前页码
      handleCurrentChange(val) {
        this.pageNo = val;
        this.queryData();
      },
      //获取列表
      queryData() {
        let params = {
          startTime: this.beginDateTime,
          endTime: this.endDateTime,
          caseName: this.caseName,
          createUser:this.createUser,
          comboState: this.comboState,
          pageSize: this.pageSize,
          pageNum: this.pageNo
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url: 'pca/combo/myCombo/caseComboList',
          method: 'get',
          params:params
        }).then((res) => {
          if (res.statusText == 'OK' && res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.totalNum = res.data.data.totalCount;
          }else{
            this.$notify({
              type: 'error',
              message: '获取我的串并案列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
            //      this.$myconfirm({
            //   type: '提示',
            //   msg: '获取我的串并案列表失败！',
            //   icon: 1,
            //   btn: {
            //     ok: '确定',
            //     //  no: '关闭'
            //   }
            // })
            // layer.alert('获取我的串并案列表失败！',{icon:5,title:"消息提示"});
          }
        }).catch(res => {
          console.log(res)
        })
      },
      //状态码判断
      formatStatus(row, column,cellValue) {
        if(cellValue == 0){
          return '新建';
        }else if (cellValue == 1){
          return '审批中';
        }else if (cellValue == 2){
          return '审批通过';
        }else if (cellValue ==3){
          return '审批不通过';
        }
      },
      reset(){
        this.beginDateTime = "";
        this.endDateTime = "";
        this.caseName = "";
        this.createUser = "";
        this.comboState = "";
        this.pageSize = 10;
        this.pageNo = 1;
        let maxDate =  {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: new Date().getSeconds()
        };
        this.beginTime.config.max = maxDate;
        this.endTime.config.min = '1900-01-01 00:00:00';
        this.queryData();
      },
      closePop(){
        this.$emit('sendToParent');
      },
      addToCase(row,index){
        let params = {
          caseCombId: row.caseCombinationId,
          caseUuid: this.caseUuid
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url: 'pca/combo/myCombo/addCaseToCombo',
          method: 'post',
          data: data
        }).then(res => {
          if (res.data.code === 200) {
            this.$notify({
              type: 'success',
              message: '添加到串并案成功',
              position: 'bottom-right',
              duration: 3000
            });
            this.closePop();
          } else {
            this.$notify({
              type: 'warning',
              message: '案件已添加到此串并案中，不能重复添加！',
              position: 'bottom-right',
              duration: 3000
            });
            this.closePop();
          }
        })
      },

      openDailog(){
        this.$nextTick(()=>{
          let _this = this;
          this.beginTime = laydate.render({
            elem: '#beginTime',
            type: 'datetime',
            btns: ['now','confirm'],
            max: this.getCurrentDate(),
            done: function (value, date) {
              _this.beginDateTime = value;
              _this.endTime.config.min = {
                year: date.year,
                month: date.month - 1, //关键
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
              };
            },
          });
          this.endTime = laydate.render({
            elem: '#endTime',
            type: 'datetime',
            btns: ['now','confirm'],
            max: 1,
            done: function (value, date) {
              _this.endDateTime = value;
              _this.beginTime.config.max = {
                year: date.year,
                month: date.month - 1, //关键
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
              };
            },
          });
        });
      }
    },
    mounted(){
      this.queryData();
    }
  }
</script>

<style scoped>
@import '../../../assets/css/commom.css';
  @import '../../../assets/css/case_common.css';
  .searchCondition {
    height:0.56rem;
    width: 100%;
    display: flex;
    font-size: 0.14rem;
    padding-left: 0.2rem;
    align-items: center;
    color: #606266;
    line-height:0.56rem;
  }
  .scItem{
    min-width: 68px;
    color:#99c9fa
  }
  .scItemP{
    margin:0 0.1rem;
    color: #99c9fa;
  }
  .scItemBtn{
    margin-left: 0.1rem;
  }
  .scItemBtn .el-button{
    width: 0.8rem;
    height:0.3rem;
    font-size:0.14rem;
    padding:0;
  }
  .scItemBtn .el-button+.el-button{
    margin-left: 0.1rem;
  }

  .searchCondition .caseNameSelect {
    width: 1.7rem;
    font-size: 0.14rem;
    color: #99c9fa;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-right: 0.15rem;
  }
 .searchCondition /deep/ .el-select{
    height:0.35rem;
    font-size: 0.14rem;

  }
  .searchCondition /deep/  .el-input__inner {
       height:0.38rem;
    font-size: 0.14rem;
    border-radius: 0
  }

  .searchCondition .timeSelect{
    margin-right:0;
  }
  .content {
    flex:1;
    position: relative;
    width:100%;
    margin: 0.1rem 0 0;
    display: flex;
    flex-direction: column;
    border: 1px solid #142b47;
    /* box-shadow: 0 1px 1px #cdcdcd; */
  }

  .contentTitle {
    /*height: 0.56rem;*/
    width: 100%;
    /* background-color: #ECF0F3; */
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .needApproveContainer {
    flex:1;
    /*width: 100%;*/
    /*height: calc(100% - 0.56rem);*/
    /* background-color: #FCFDFD; */
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .searchCondition /deep/ .el-button + .el-button {
    margin-left: 0;
  }

  .approveBtn {
    width: 80px;
    height: 30px;
    background-color: #67C23A;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playBtn {
    width: 80px;
    height: 30px;
    background-color: #409EFF;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    margin-left: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .editBtn {
    width: 80px;
    height: 30px;
    background-color: #E6A23C;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    margin-left: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .delBtn {
    width: 80px;
    height: 30px;
    background-color: #F56C6C;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    margin-left: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pageNation {
    margin-top: 5px;
    width: 100%;
    height: 30px;
  }
  .contentTable {
    margin-top: 0.2rem;
    padding-left: 15px;
    padding-right: 15px;
  }
</style>
