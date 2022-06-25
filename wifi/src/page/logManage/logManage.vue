<template>
  <div class="parent">
    <!-- <div class="topInfo">
        <p class="sysname" @click="gohome">系统管理</p>
        <p class="sysname childname">日志管理</p>
    </div> -->
    <div class="topInfo">
            <img src="../../assets/updataImg/location.png" alt="">
            <span class="sysname childname">当前位置：</span>
            <p class="sysname" @click="gohome">首页 > </p>
            <p class="sysname">&nbsp;日志管理</p>
        </div>
    <div class="dicManageWrappr role">
      <div class="item">
        <el-form :inline="true"  class="form">
          <el-form-item label="用户账号关键字 :">
            <input class="logInput" placeholder="请输入用户账号关键字" v-model.trim="keyword" @keyup.enter="searchData" @blur="searchData">
            <!--<el-input v-model.trim="keyword" placeholder="用户账号关键字"></el-input>-->
          </el-form-item>
          <el-form-item label="时间 :">
            <el-input type="text" class="searchInput searchtime" readonly id="beginTime" ref="beginTime" v-model.trim="beginTime" placeholder="请选择开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <el-input type="text" class="searchInput searchtime" readonly id="endTime" ref="endTime" v-model.trim="endTime" placeholder="请选择结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <!--<el-date-picker-->
              <!--v-model.trim="time"-->
              <!--type="datetimerange"-->
              <!--range-separator="至"-->
              <!--value-format = "yyyy-MM-dd HH:mm:ss"-->
              <!--start-placeholder="开始日期"-->
              <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
          </el-form-item>
          <el-form-item>
            <el-button @click="searchData" class="searchBtn btn" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <div class="table">
          <el-table
            ref="table1"
            :data="tableData"
            @sort-change="getsort"
            height="6.2rem"
            style="width: 100%">
            <div slot="empty">
              <div class="noImg">
                <img src="../../assets/updataImg/NoData.png" />
              </div>
            </div>
            <el-table-column
              type="index"
              align="center"
              width="60"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="logSystem"
              sortable="custom"
              align="center"
              show-overflow-tooltip
              label="操作模块">
            </el-table-column>
            <el-table-column
              prop="userName"
              align="center"
              show-overflow-tooltip
              label="用户账号"
              sortable="custom">
            </el-table-column>
            <el-table-column
              prop="userIp"
              show-overflow-tooltip
              align="center"
              label="用户ip">
            </el-table-column>
            <el-table-column
              prop="logContent"
              align="center"
              show-overflow-tooltip
              label="操作内容">
            </el-table-column>
            <el-table-column
              prop="logType"
              align="center"
              show-overflow-tooltip
              sortable="custom"
              label="操作类型">
            </el-table-column>
            <el-table-column
              prop="logTime"
              align="center"
              show-overflow-tooltip
              sortable="custom"
              label="操作时间">
            </el-table-column>
          </el-table>
          <div class="pageWrapper">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[15, 30, 45]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>
    <footerSecond />
  </div>
</template>

<script>
  import footerSecond from '../../components/footer_second'
export default {
    components: {
      footerSecond
    },
    data () {
        return {
            maskFlag: false,
            time: "",
            orderType: "desc",//排序方式
            orderBy: "logTime", //排序字段
            keyword: "",  //账号查询字段
            // beginTime: "", //查询开始时间
            // endTime: "", //查询结束时间
            beginTime: this.getDateString(new Date().getTime()).split(' ')[0] + " " + "00:00:00",
            endTime: this.getDateString(new Date().getTime()).split(' ')[0]+ " " + "23:59:59",
            currentPage:1, // 当前页码
            pageSize: 15, //每页显示的条数
            totalCount:0, //数据总条数
            tableData: [] // 表格数据
        }
    },
  computed:{
      searchParam (){
        return {
          keyword: this.keyword,
          beginTime: this.beginTime,
          endTime: this.endTime,
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          orderBy: this.orderBy,
          orderType: this.orderType
        };
      }
  },
    watch: {
        // 监听时间的选择
        time () {
            if(this.time){
              this.beginTime  = this.time[0];
              this.endTime = this.time[1];
            }else{
              this.beginTime  = null;
              this.endTime = null;
            }
        }
    },
    methods: {
        // 监听表格排序
        getsort (obj) {
            this.orderBy = obj.prop;
            this.orderType = obj.order == "descending" ? "desc" : "asc";
            this.queryData()
        },
        // 监听每页条数
        handleSizeChange(val) {
          this.pageSize = val;
          this.currentPage = 1;
          this.queryData()
        },
        // 监听当前页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.queryData()
        },
        searchData(){
          this.currentPage = 1;
          this.queryData();
        },
        queryData () {
          let data = this.searchParam;
          console.log(data,"data");
          let _this = this;
          data = this.$qs.stringify(data);//post请求分离data
          this.$http.post('/sms/log/list',data).then(res=>{
              if(res.data.code==200){
                  if(res.data && res.data.data.list.length > 0){
                        _this.tableData = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }else{
                      _this.tableData = [];
                      _this.totalCount = 0;
                  }
              }else{
                this.$notify({
                  type: 'error',
                  message: '获取日志列表失败',
                  position: 'bottom-right',
                  duration: 3000
                });
                // layer.alert('获取日志列表失败', {icon: 5, title: "消息提示"});
              }
          })
        },
        // 去菜单页面
        gohome () {
          this.$router.push({path:'/videoStrucPlat',query:{ menuCode: '700' }})
        },
      getDateString(date){
        //date 为毫秒数
        let d = new Date(date);
        let mm = (d.getMonth()+1) >= 10?(d.getMonth()+1): '0'+(d.getMonth()+1);
        let dd = d.getDate() >= 10?d.getDate():'0'+d.getDate();
        let hh = d.getHours()>= 10?d.getHours():'0'+d.getHours();
        let MM = d.getMinutes()>= 10?d.getMinutes(): '0'+d.getMinutes();
        let ss = d.getSeconds()>= 10? d.getSeconds():'0'+d.getSeconds();
        return d.getFullYear()+'-'+mm+'-'+dd+' 23:59:59';
      }
    },
    mounted () {
      this.queryData();
      let _this = this;
      let timeBegin = laydate.render({
        elem: '#beginTime',
        type: 'datetime',
        //min: -90, //90天前
        max: 1, //0天后
        // btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.beginTime = value;
          timeEnd.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
      let timeEnd = laydate.render({
        elem: '#endTime',
        type: 'datetime',
        //min: -90, //90天前
        min: 0,
        max: 1, //0天后
        // btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.endTime = value;
          timeBegin.config.max={
            year:date.year,
            month:date.month-1,//关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          }
          _this.searchData();
        }
      });

      //表格重绘
      window.addEventListener("resize", function () {
        if(_this.$refs["table1"]){
          _this.$refs["table1"].doLayout();
        }
      });
    }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/manage_third.css";
  @import "../../assets/css/commom.css";
  .btn{
    padding: 0 0.1rem !important;
    height: 0.3rem;
  }
  .searchInput {
    line-height: 0.3rem;
    width: 1.8rem;
    height: 0.3rem;
    border-radius: 3px;
  }

.el-input /deep/ .el-input__icon {
  line-height: 0.3rem;
}
</style>






