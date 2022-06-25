<template>
  <div class="wrapper">
     <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname"  :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判 > </router-link>
      <router-link :to="{path:'/carJudged/currentDeploy',query:{menuCode:300}}" class="sysname">&nbsp;布控实时展示 ></router-link>
      <p class="sysname">&nbsp;历史预警</p>
    </div>

    <div class="historyWarn">
      <div class="content">
        <!--搜索条件-->
        <ul class="searchCondition">
          <li>
            <span>车牌号码：</span>
            <input placeholder="请输入车牌号码" type="text" ref="inputValue" value="不限" style="width: 71%" v-model.trim="plateNum">
          </li>
          <li>
            <span>布控方式：</span>
            <el-select  class="caseNameSelect" v-model="chooseDispositionMode">
              <el-option value="" label='不限'></el-option>
              <el-option value="10" label='按车牌布控'></el-option>
              <el-option value="20" label='按类别布控'></el-option>
              <el-option value="30" label='按车型布控'></el-option>
            </el-select>
          </li>
           <li style="margin-left: 30px;position:relative;" ><span>车辆品牌：</span>
            <input  placeholder="请输入车辆品牌" readonly
                    type="text" value="" @click="getCarBrand" v-model="this.vehicleBrand"
                    ref="vehicleBrandVal"
            ><i class="el-icon-circle-close" @click="clearBand();refresh()"></i>
          </li>
          <li style="margin-left: 30px;position:relative;" ><span>车辆型号：</span>
            <input  placeholder="请输入车辆型号" readonly
                    type="text" value="" @click="getCarModule" v-model="this.vehicleModel"
                    ref="vehicleModelVal"
            ><i class="el-icon-circle-close" @click="clearInputVal"></i>
          </li>
          <li style="margin-left: 30px">
            <el-button style="width: 100px;height: 0.4rem" class="searchBtn" type="primary" icon="el-icon-search" @click="searchHistoryList">查询</el-button>
          </li>
        </ul>
        <div class="contentTable">
          <div class="table">
            <el-table
              ref="table1"
              :data="historyList"
              max-height="560"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="dispositionMode"
                label="布控方式"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.dispositionMode=== 10">按车牌布控</span>
                  <span v-else-if="scope.row.dispositionMode=== 20">按类别布控</span>
                  <span v-else-if="scope.row.dispositionMode===30">按车型布控</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="plateNoInfo"
                align="center"
                show-overflow-tooltip
                label="预警车牌"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.plateNoInfo === "@"?"未识别":scope.row.plateNoInfo}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="triggerTime"
                align="center"
                show-overflow-tooltip
                label="触发时间"
              >
              </el-table-column>
              <el-table-column
                prop="vehicleKineInfo"
                align="center"
                show-overflow-tooltip
                label="预警车类型"
              >
              </el-table-column>
              <el-table-column
                prop="vehicleBrandInfo"
                align="center"
                show-overflow-tooltip
                label="预警车品牌"
              >
              </el-table-column>
              <el-table-column
                prop="vehicleModelInfo"
                align="center"
                show-overflow-tooltip
                label="预警车型号"
              >
              </el-table-column>
              <el-table-column
                prop="vehicleColor"
                align="center"
                show-overflow-tooltip
                label="预警车颜色"
              >
              </el-table-column>
              <!-- <el-table-column
                prop=""
                align="center"
                show-overflow-tooltip
                label="预警车方向">
              </el-table-column> -->
              <el-table-column
                align="center"
                label="操作"
                width="160">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-tickets"
                    v-if="btnSeeDeploy"
                    class="handleBtn searchBtn"
                    @click="passLookData(scope.row,scope.$index)">查看目标</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div  v-if="pageShowFlag" class="pageNation">
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
        <div v-if="!pageShowFlag" class="pageNation">
          <el-pagination  style="float: right;margin-right: 10px;"
                          :background=true
                          @size-change="handleSizeChange2"
                          @current-change="handleCurrentChange2"
                          :current-page="Number(this.pageNo2)"
                          :page-sizes="[10, 20, 30, 40, 50, 100]"
                          :page-size="Number(this.pageSize2)"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total=Number(this.totalNum2)>
          </el-pagination>
        </div>
        <div class="calDialog" v-show="calFlag" >
          <historyDialog vehicleKind="noKind" :showFirst="showFirst" :showSecond="showSecond" :carBrand="vehicleBrand" :carModel="vehicleModel" @singlePassToParent="getChildData"
          :icoclick="icoclick" @changeicoclick='changeicoclick'></historyDialog>
        </div>
      </div>
      <footerSecond />
    </div>
  </div>
</template>

<script>
  //日期选择
  import vehicle from '../../api/vehicle/vehicle.js'
  import '../../common/laydate/laydate.js'
  import footerSecond from '../../components/footer_second'
  import historyDialog from './historyDialog'
  export default {
    components: {
      historyDialog,footerSecond
    },
    data() {
      return {
        btnSeeDeploy:this.$storage.getSession("329")!=null?true:false,
        pageShowFlag:true,
        timeFlag: false,
        calFlag: true,
        showFirst: false,
        showSecond: false,
        carPlateNum:'不限',
        warnTimeBegin:'',
        warnTimeEnd:'',
        deployType:'',
        vehicleBrand: '不限',
        vehicleBrandCode:null,
        vehicleModel: '不限',//车辆型号
        vehicleModelCode:'',
        // province: ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
        //   '鄂', '湘', '粤', '桂', '琼', '渝', '川', '黔', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台'],
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,
        pageNo2: 1,
        pageSize2: 10,
        totalNum2: 0,
        historyList: [],
/*        plateProvince:0,
        plateNumber:'',*/
        plateNum:'',
        chooseDispositionMode:'',
        loading:null,
        icoclick:false
      }
    },
    mixins: [vehicle],
    watch:{
      vehicleBrand(newVal,oldVal){
     if(newVal!='不限'){//保证点击icon清空品牌框引发的从子组件传回的值不会把之前的车型框选的清空
        // console.log(oldVal)
        this.vehicleModel='不限'
        this.vehicleModelCode=null
      }
    },
    },
    methods: {
      getHistoryList() {
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url: 'tvas/notification/list',
          method: 'post',
          params: {
            pageNum: this.pageNo,
            pageSize: this.pageSize,
            orderType:'desc',
            orderBy:'triggerTime'
          }
        }).then(res => {
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.historyList = res.data.data.list;
            this.totalNum=res.data.data.totalCount
          }else{
             this.$notify({
                        type: 'error',
                        message: '获取历史预警列表失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('获取历史预警列表失败', {icon:5, title: "消息提示"});
          }
        }).catch(res=>{
          console.log(res);
        });
      },
      //查询历史预警
      searchHistoryList(){
        this.pageShowFlag=false;
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url: 'tvas/notification/list',
          method: 'post',
          params: {
            pageNum: this.pageNo2,
            pageSize: this.pageSize2,
            plateNo:this.plateNum,
            orderType:'desc',
            orderBy:'triggerTime',
            dispositionMode:this.chooseDispositionMode,
            vehicleModel:this.vehicleModel=="不限"?'':this.vehicleModel,
            vehicleModelCode: this.vehicleModelCode,
            vehicleBrand:this.vehicleBrand=="不限"?'':this.vehicleBrand,
            vehicleBrandCode:this.vehicleBrandCode
          }
        }).then(res => {
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.historyList = res.data.data.list;
            this.totalNum2=res.data.data.totalCount
          }else{
              this.$notify({
                        type: 'error',
                        message: '获取历史预警列表失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('获取历史预警列表失败', {icon:5, title: "消息提示"});
          }
        })
      },
      //清空输入框
      clearInputVal() {
        //if( this.$refs.vehicleModelVal.value==''){
          // this.vehicleBrand= '';
          this.vehicleModel= '';//车辆型号
          this.vehicleModelCode='';
        //}
      },



      //跳转查看布控改成跳转到实时预警
      passLookData(data,index){
        sessionStorage.removeItem("deployData");
        let deployData = JSON.stringify(data);
        sessionStorage.setItem("deployData",deployData);
        this.$router.push({path:'/carJudged/currentDeploy',query:{menuCode:319}});
      },

      handleSizeChange(val) {
          this.pageSize=val;
        this.pageNo=1;
        this.getHistoryList();
      },

      handleCurrentChange(val) {
        this.pageNo=val
        this.getHistoryList();
      },

      handleSizeChange2(val) {
        this.pageSize2=val;
        this.pageNo2=1;
        this.searchHistoryList();
      },

      handleCurrentChange2(val) {
        this.pageNo2=val;
        this.searchHistoryList();
      },
    clearBand(){
     this.vehicleBrand = '不限';
    this.vehicleBrandCode=null
    },
    refresh(){
      this.icoclick=true
    },                    /* 保证在点击icon清空品牌框之后会重新请求一次车型*/
    changeicoclick(data){
      this.icoclick=data
    },
      //获取子组件的数据
      getChildData(data1, data2, data3,data4,data5) {
        // this.vehicleBrand = data1
        // this.vehicleModel = data2
        // this.vehicleModelCode = data3;
        // this.showSecond = data4
      this.vehicleBrand = data1;
      this.vehicleModel = data2;
      this.vehicleModelCode = data3;
      this.showSecond = data4;
      this.vehicleBrandCode = data5;
      },
//关闭弹出层
  closeDialog(e) {
      // console.log(e.target)
      let dialogFirst = document.getElementsByClassName("first")[0];
      if (dialogFirst.style.display !== "none" ) {
        let casWrapper = document.getElementsByClassName("casWrapper")[0];
        if (!casWrapper.contains(e.target)) {
          this.showFirst = false;
        }
      }
       let dialogSecond = document.getElementsByClassName("second")[0];
      if (dialogSecond.style.display !== "none" ) {
        let casWrapper = document.getElementsByClassName("casWrapper")[0];
        if (!casWrapper.contains(e.target)) {
          this.showSecond = false;
        }
      }
    },

    },
    mounted: function () {
      let _this = this;
      _this.getHistoryList();
      laydate.render({
        elem: '#timeBegin',
        type: 'datetime'
      });
      laydate.render({
        elem: '#timeEnd',
        type: 'datetime'
      });
      this.$nextTick(() => {
        document.querySelector('body').addEventListener('click', this.closeDialog);
      });
      //表格重绘
      window.addEventListener("resize", function () {
        if(_this.$refs["table1"]){
          _this.$refs["table1"].doLayout();
        }
      });
    },
    beforeDestroy() {
      document.querySelector('body').removeEventListener('click', this.closeDialog);
    }
  }
</script>


<style scoped>
@import url('../../assets/css/commom.css');

  /* select {
    width: 69%;
    height: 28px;
    border:1px solid #dcdfe6;
    padding-left: 5px;
  } */

  /* .item-right{
    margin-left: -17px;
  } */

  input {
    width: 70%;
    height: 28px;
    border:1px solid #dcdfe6;
    padding-left: 5px;
  }

  input:focus , select:focus{
    border: 1px solid #409EFF;
  }

  .wrapper {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    top:0.6rem;
    height:calc(100% - 0.6rem);
    box-sizing: border-box;
    /*user-select: none;*/
    overflow:auto;
  }

  /* .topNav {
    height: 0.54rem;
    background-color: #FFFFFF;
    width: 100%;
    border-bottom: 2px solid #E2E3E3;
  }

  .nav-item {
    display: inline-block;
    height: 0.54rem;
    width: 2.05rem;
    line-height: 0.54rem;
    text-align: center;
    font-size: 0.18rem;
    cursor: pointer;
  } */

  .historyWarn{
    display: flex;
    height:calc(100% - 0.6rem);
    flex-direction: column;
  }
  .content {
    flex:1;
    position: relative;
    padding:0rem 0.6rem 0;
  }
  .searchCondition {
    color: #606266;
  }

  .searchCondition li {
    font-size: 12px;
    margin-top: 15px;
    float: left;
    width: 3.3rem;
    color: #99c9fa;
  }

  .searchCondition li span{
    font-size: 0.14rem;
    line-height: 0.4rem;
  }

  .searchCondition li input{
    height: 0.4rem;
    font-size: 0.14rem;
    color: #606266;
  }
  .searchCondition li select{
    height: 0.4rem;
    font-size: 0.14rem;
    color: #606266;
  }
  .searchCondition li .el-select{
    width: 71%;
  }
   .searchCondition li .el-select >>> .el-input__inner{
     height: 0.4rem;
   }

  .nav-item-front {
    height: 100%;
    width: 2.05rem;
    background: url(../../assets/images/sysmanage/bg-02.png);
    text-align: center;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .itemIcon img {
    width: 100%;
    height: 100%;
  }

  .calDialog {
    position: absolute;
    z-index: 999;
    left: 8.9rem;
    top:0.81rem;
  }
  .nav-item-search {
    height: 100%;
    width: 2.05rem;
    background: url(../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
  }
  .pageNation {
    margin:0.1rem auto;
    /*width: 95%;*/
    height: 30px;
  }

  .contentTable{
    margin-top: 0.8rem;
  }
  .contentTable .table{
    flex:1;
  }

  .table >>> .el-table{
    border: 1px solid rgba(12, 68, 135, 0.3);
  }
  /* .table >>> .el-table thead th{
    background:#e9eef1;
  } */
  .table >>> .el-table--border td,
  .table >>> .el-table--border th,
  .table >>> .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid rgba(12, 68, 135, 0.3);
  }
  .table >>> .el-table--border th,
  .table >>> .el-table__fixed-right-patch{
    border-bottom: 1px solid rgba(12, 68, 135, 0.3);
  }
  .table >>> .el-table td,
  .table >>> .el-table th.is-leaf {
    border-bottom: 1px solid rgba(12, 68, 135, 0.3);
    border-right: 1px solid rgba(12, 68, 135, 0.3);
  }
  .table >>> .el-table th>.cell{
    color:#545454;
    font-size: 0.16rem;
    font-weight: bold;
  }

  .table >>> .el-table th {
    padding: 0.12rem 0;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }
  .table >>> .el-table td{
    padding: 0.06rem 0;
    font-size: 0.14rem;
  }
  /* .table >>> .el-table tr:nth-child(2n+1) td{
    background:#f9fafb;
  }

  .table >>> .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #e0eefb;
  } */

  .table .el-button{
    font-size: 0.14rem;
  }
  .searchCondition .el-button{
    font-size: 0.14rem;
  }
  .table >>> .el-button--mini{
    padding: 0.07rem 0.15rem;
    font-size: 0.14rem;
  }

  .el-icon-circle-close{
    font-size:0.14rem;
    margin-left:-0.23rem;
    cursor: pointer;
  }
</style>

