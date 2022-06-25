<template>
  <div class="wrapper">
    <div class="topInfo">
         <img src="../../assets/updataImg/location.png" alt="">
       <span class="sysname childname">当前位置：</span>
      <router-link tag="div" to="/carJudged?menuCode=300" class="sysname">车辆研判 ></router-link>
      <div class="sysname">&nbsp;落脚点分析</div>
    </div>

    <div class="contentBody">

      <div class="contentLeft">
        <div class="contentHide" v-show="contentLeft"></div>
        <div class="clItem cli1">
          <div class="searchTitle">落脚点分析</div>
          <ul class="searchCondition">
            <li class="conditionInput">
                <img src="../../assets/images/carJudged/search_item.png" alt="">
              车辆搜索条件</li>
            <li class="ftcItem">
              <div class="left_ftci" ><span class="bt">*</span>分析时段：</div>
              <div class="right_ftci">
                <input style="margin-bottom:0.1rem;" type="text" readonly id="timeBegin" ref="beginDateTime" v-model.trim="beginDateTime" placeholder="请选择开始时间" @blur="checkBeginDateTime"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                <input type="text" id="timeEnd" ref="endDateTime" readonly v-model.trim="endDateTime" placeholder="请选择结束时间" @blur="checkEndDateTime"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
              </div>
            </li>
            <li class="backItem">
              <span><span class="bt">*</span>落脚时长超过：</span>
              <input type="text" ref="footholdTime" v-model.trim="footholdTime" placeholder="请输入落脚时长" @blur="checkFootholdTime"><i class="el-icon-circle-close" @click="clear('footholdTime')"></i><span class="unit">小时</span>
            </li>
            <li>
              <span>车辆品牌：</span>
              <input type="text" readonly value="" @click="getCarBrand" v-model.trim="vehicleBrand" placeholder="请输入车辆品牌"><i class="el-icon-circle-close" @click="clearBand();refresh()"></i>
            </li>
            <li>
              <span>车辆型号：</span>
              <input id="vModel" :title="vehicleModel" readonly type="text" value="" @click="getCarModule" v-model.trim="vehicleModel" placeholder="请输入车辆型号"><i class="el-icon-circle-close" @click="clear('vehicleModel')"></i>
            </li>
            <li class="plateItem">
              <span>车牌号码：</span>
              <el-select ref="selectValue" v-model="carplate">
                <el-option v-for="(p,i) in province" :value="p" :label="p" :key="i"></el-option>
              </el-select>
              <input type="text" ref="plateNo" value="" placeholder="请输入精确车牌尾号" @keyup.enter="addPlateNum" @blur="addPlateNum" minlength="6" maxlength="7" /><i class="el-icon-circle-close" @click="clear('plateNo')"></i>
              <div class="platNumList">
                <span class="wholeCarPlate grayPn">例:京A12345<i class="el-icon-circle-close closeCarPlate"></i></span>
                <span class="wholeCarPlate" v-for="(item,index) in platNumArr" :key="index">{{item}}
                  <i class="el-icon-circle-close closeCarPlate" @click="removeNum(item,index)"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="clItem cli2">
          <div class="map">
            <div class="mapHandle">
           <img src="../../assets/images/carJudged/map_tool.png" alt="">
              请选择地图工具</div>
            <div class="mapItem">
              <div class="itemIcon" @click="drawReact"></div>
              <div class="itemIcon" @click="drawLine"></div>
              <div class="itemIcon" @click="closeDraw"></div>
              <div class="itemIcon" @click="toggleBar" id="menuImg"></div>
              <div class="itemIcon" @click="clearDrawing"></div>
            </div>
          </div>
          <div class="btnContainer">
            <div class="btnReset cancleBtn" @click="reset"><i class="el-icon-refresh"></i> 重置</div>
            <div v-show="searchBtn" class="btnSearch passBtn" @click="getCarData"><i class="el-icon-search"></i> 搜索</div>
          </div>
        </div>
      </div>

      <div class="content">
        <div v-show="!checked" id="mapContent"></div>
        <img v-show="!checked" class="dingwei" src="../../assets/case/quickPos.png" @click="loadMap();initPoint();" />
        <div v-show="!checked" class="point">
          <span>经度：{{point.lng}}</span><br>
          <span>纬度：{{point.lat}}</span>
        </div>
        <!--搜索结果详情-->
        <div class="sDetail" :style="{left: checked?'0.12rem':'100%'}">
          <div class="contentSwitch" v-show="arrawSwitch" :style="{left:checked?'0':'-0.16rem'}">
            <img v-if="!checked" src="../../assets/images/carJudged/arrows-left.png" @click="checked = !checked">
            <img v-else src="../../assets/images/carJudged/arrows-right.png" @click="checked=!checked">
          </div>
          <!--落脚点分析-->
          <div class="searchDetailFH">
            <div class="resultTitle">| 落脚点搜索</div>
            <div class="resultList">
              <el-table
              ref="table1"
              :data="searchResult.data.rows"
              style="width: 86%; margin: 0.2rem auto;">
              <el-table-column
                type="index"
                label="编号"
                align="center"
                width="50"
              >
              </el-table-column>

              <el-table-column
                prop="plateNo"
                align="center"
                show-overflow-tooltip
                label="车牌号码"

              >
              </el-table-column>

                <el-table-column
                prop="tollgatePlace"
                align="center"
                show-overflow-tooltip
                label="落脚地点"
                 width="300"
              >
              </el-table-column>

              <el-table-column
                prop="footholdCount"
                align="center"
                show-overflow-tooltip
                label="落脚次数"

              >
                  <template slot-scope="scope">
                    <a href="javascript:;" style="color:#3893f2">{{scope.row.footholdCount}}</a>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                show-overflow-tooltip
                label="操作"

              >
                  <template slot-scope="scope">
                  <span @click="getDetail(scope.row.tollgateId, scope.row.plateNo)"><span class="searchBtn">查看详情</span> </span>
                </template>
              </el-table-column>

            </el-table>
            <!--  <table class="resultTable">
                <tr>
                  <th style="width:10%;">编号</th>
                  <th style="width:20%;">车牌号码</th>
                  <th style="width:30%;">落脚地点</th>
                  <th style="width:20%;">落脚次数</th>
                  <th style="width:20%;">操作</th>
                </tr>
                <tr v-for="(item, index) in searchResult.data.rows" v-if="item.plateNo != '@'">
                  <td>{{(pageNo-1)*pageSize+index + 1}}</td>
                  <td>{{item.plateNo}}</td>
                  <td>{{item.tollgatePlace}}</td>
                  <td><a href="javascript:;">{{item.footholdCount}}</a></td>
                  <td @click="getDetail(item.tollgateId, item.plateNo)"><span class="desc">查看详情</span></td>
                </tr>
                <tr v-if="!searchResult.data.rows.length">
                  <td colspan="5">暂无数据</td>
                </tr>
              </table> -->
              <div class="pageNation">
                <el-pagination
                  :background=true
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="Number(searchResult.data.pageNo)"
                  :page-sizes="[10, 20, 30, 40, 50, 100]"
                  :page-size="Number(searchResult.data.pageSize)"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="Number(searchResult.data.total)">
                </el-pagination>
              </div>
            </div>
          </div>
          <!--落脚点列表下某项详细-->
          <car-detail :isShow="showCarDetail" type="footHoldD" :carParams="currentParams" :carResult="searchResultDetail" @closeCarDetail="closeCarDetail"></car-detail>
        </div>
      </div>

    </div>

    <div class='menu' v-show="isBar">
      <el-input class="menuSearch"
        placeholder="请输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <div class="menuTree">
        <el-tree
          :data="treeList"
          show-checkbox
          default-expand-all
          node-key="kakouId"
          ref="tree"
          @check='getCheckedNodes'
          :filter-node-method="filterNode"
          :props="defaultProps">
        </el-tree>
      </div>
    </div>

    <div class="err" v-if="Err.beginDateTime.flag" :style="{top: Err.beginDateTime.top}">{{Err.beginDateTime.txt}}</div>
    <div class="err" v-if="Err.endDateTime.flag" :style="{top: Err.endDateTime.top}">{{Err.endDateTime.txt}}</div>
    <div class="err" v-if="Err.plateNo.flag" :style="{top: Err.plateNo.top}">{{Err.plateNo.txt}}</div>
    <div class="err" v-if="Err.footholdTime.flag" :style="{top: Err.footholdTime.top}">{{Err.footholdTime.txt}}</div>

    <div class="calDialog">
      <casDialog vehicleKind="noKind" :showFirst="showFirst" :showSecond="showSecond" :carBrand="vehicleBrand" :carModel="vehicleModel"  @passToParent="getChildData" :icoclick="icoclick" @changeicoclick='changeicoclick'></casDialog>
    </div>
  </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  import casDialog from './casDialog'
  import carDetail from './carDetail'
  import footerThird from '../../components/footer_third'

  export default {
    components: {
      casDialog, carDetail, footerThird
    },
    data() {
      return {
        carplate:sessionStorage.getItem("provinceShort"),
        searchBtn:this.$storage.getSession("309")!=null?true:false,
        //searchDetailBtn:this.$storage.getSession("351")!=null?true:false,
        map:null,//地图对象
        drawingManager : null,
        overlays:[],
        treeList:null,
        filterText: '',
        isBar:false,
        defaultTime: '2014-01',
        defaultProps: {
          children: "apeTollgates",
          label: "name"
        },
        i:0,
        // 左侧遮罩
        contentLeft:false,

        checked: false,
        arrawSwitch: false,  //默认不显示蓝色小箭头
        loading: null,
        footTimeMax: sessionStorage.getItem("footTimeMax"),
        defaultProvice: sessionStorage.getItem("provinceShort"),
        province: ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
          '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台'],
        platNumArr: [],
        isExactPlateNo: true,
        imgsrc: '',
        showFirst: false,
        showSecond: false,

        showCarDetail: false,
        currentParams: null,

        //时间选择控件
        timeBegin:null,
        timeEnd: null,

        category: 0,
        vehicleBrand: "不限",  //车辆品牌
        vehicleBrandCode: null,
        vehicleModel: "不限",  //车辆型号
        vehicleModelCode: null,
        footholdTime: 3,
        beginDateTime: this.getDateString(new Date().getTime() - 2*24*60*60*1000).split(' ')[0] + " " + "00:00:00",
        endDateTime: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),      //过车时段结束日期时间
        tollgateIds: null,
        pageNo: 1,
        pageSize:10,
        orderBy: 'pass_time',
        orderType: 'desc',
        tollgateIdsArr:[],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表

        //搜索结果 默认
        searchResult: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows: []
          }
        },

        //详细搜索结果
        searchResultDetail: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows:[]
          }
        },
        oldParams:{},
        icoclick:false
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      vehicleBrand(newVal,oldVal){
    if(newVal!='不限'){//保证点击icon清空品牌框引发的从子组件传回的值不会把之前的车型框选的清空
        this.vehicleModel='不限'
        this.vehicleModelCode=null
      }

    },
    },
    computed: {
      newpoints (){
        let arr = [];
        if(this.treeList !== null && this.treeList.length !==0){
          for(let i=0;i<this.treeList.length;i++){
            let apeToll = this.treeList[i].apeTollgates;
            let temp = arr.concat(apeToll);
            arr = temp;
          }
        }
        return arr;
      },
      searchParams(){
        return {
          category: this.category,
          vehicleBrand: this.vehicleBrand=="不限"?'':this.vehicleBrand,
          vehicleBrandCode: this.vehicleBrandCode,
          vehicleModel: this.vehicleModel=='不限'?'': this.vehicleModel,
          vehicleModelCode: this.vehicleModelCode,
          plateNo: this.platNumArr.join(','),
          footholdTime: this.footholdTime,
          beginDateTime: this.beginDateTime,
          endDateTime: this.endDateTime,
          tollgateIds: this.tollgateIds,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderBy: this.orderBy,
          orderType: this.orderType
        };
      }
    },
    mixins:[vehicle, mapFun],
    methods: {
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
      getChildData(data1, data2, data3,data4, data5) {
        this.vehicleBrand = data1;
        this.vehicleModel = data2;
        this.vehicleModelCode = data3;
        this.showSecond = data4;
        this.vehicleBrandCode = data5;
      },

      //添加车牌号
      addPlateNum() {
        let selectValue = this.$refs.selectValue.value;
        let inputValue = this.$refs.plateNo.value.trim();

        if(!inputValue){
          return false;
        }

        // let xxreg = /^[A-Z]{1}([A-Z0-9]{5}|[A-Z0-9]{4}[挂学警港澳]{1}|[A-Z0-9]{6})$/;   //精确车牌
        let xxreg = /^(([A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
        if (!xxreg.test(inputValue)){
          this.checkItem("plateNo", "请正确输入车牌号码！");
          let _this = this;
          setTimeout(function(){
            _this.clearCheck("plateNo");
          },1000);
          return;
        }

        let platNum = selectValue + inputValue;
        this.platNumArr.push(platNum);
        this.platNumArr = this.uniq(this.platNumArr);
       // this.$refs.selectValue.value = this.defaultProvice;
       this.carplate = this.defaultProvice;
        this.$refs.plateNo.value = "";
      },

      //删除车牌号
      removeNum(item, index) {
        this.platNumArr.splice(index, 1);
      },
      //关闭弹出层
  closeDialog(e) {
      console.log(e.target)
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

      //重置
      reset() {
        this.plateNo = null;
        this.vehicleBrand = "不限";  //车辆品牌
        this.vehicleBrandCode = null;
        this.vehicleModel = "不限";  //车辆型号
        this.vehicleModelCode = null;
        this.platNumArr = [];
        this.footholdTime = 3;

        let minDates = new Date().getTime() - (Number(this.footTimeMax)-1)*24*60*60*1000;
        this.beginDateTime = this.getDateString(minDates).split(' ')[0] + " " + "00:00:00"; //过车时段开始日期时间
        this.endDateTime =  (this.getCurrentDate().split(' ')[0] + " " + "23:59:59");      //过车时段结束日期时间
        this.timeBegin.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };
        this.timeEnd.config.min = {
          year: new Date(minDates).getFullYear(),
          month: new Date(minDates).getMonth(),
          date: new Date(minDates).getDate(),
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        this.timeEnd.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };

        this.$refs.tree.setCheckedNodes([]);
        //this.$refs.selectValue.value = this.defaultProvice;
        this.carplate = this.defaultProvice;
        this.$refs.plateNo.value = "";
        this.clearDrawing();
      },

      getCarData (){
        if(!this.checkForm()){
          //验证不通过则不向下执行
          return false;
        }

        //初始时关闭搜索结果
        this.checked = false;
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });

        let params = this.searchParams;
        params.pageNo = 1;
        params.pageSize = 10;
        params.orderType = 'desc';
        this.getVD("footHold", params, (res)=>{
          this.transValue(res.data, this.searchResult);
          this.oldParams = this.searchParams;
          if(this.searchResult.data.rows.length === 0 ){
            //this.$alert("暂无数据","消息提示");
              this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
          //  layer.alert('抱歉，未查询到符合条件的数据！',{icon:5,title:"消息提示"});
            this.checked = false;
            this.arrawSwitch = false;
          }else{
            this.checked = true;
            this.arrawSwitch = true;
          }

        });
      },

      getDetail (tId,plateNo) {
        this.showCarDetail = true;
        this.currentParams = {
          category: this.oldParams.category,
          vehicleBrand:  this.oldParams.vehicleBrand,
          vehicleBrandCode:  this.oldParams.vehicleBrandCode,
          vehicleModel: this.oldParams.vehicleModel,
          vehicleModelCode: this.oldParams.vehicleModelCode,
          plateNo: plateNo,
          footholdTime: this.oldParams.footholdTime,
          beginDateTime: this.oldParams.beginDateTime,
          endDateTime: this.oldParams.endDateTime,
          tollgateIds: tId,
          pageNo: 1,
          pageSize: 10,
          orderBy: "pass_time",
          orderType: "desc"
        };

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD("footHoldD", this.currentParams, (res)=>{
          this.transValue(res.data, this.searchResultDetail);
        });
      },
      closeCarDetail (isClose){
        this.showCarDetail = false;
      },

      //每页val条
      handleSizeChange(val) {
        this.searchResult.data.pageSize = val;
        this.searchResult.data.pageNo =1;
        this.pageSize = val;

        this.oldParams.pageNo =  1;
        this.oldParams.pageSize =  this.pageSize;

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD("footHold", this.oldParams,(res)=>{
          this.transValue(res.data, this.searchResult);
        });
      },
      //当前页
      handleCurrentChange(val) {
        this.searchResult.data.pageNo = val;
        this.pageNo = val;

        this.oldParams.pageNo =  this.pageNo;

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.getVD("footHold", this.oldParams,(res)=>{
          this.transValue(res.data, this.searchResult);
        });
      },

    },
    mounted: function () {
      this.getWeekDay();
      this.getTreeData();
      this.getCheckedItem(["beginDateTime", "endDateTime", "footholdTime"]);

      let plateNo = this.$router.history.current.query.plateNo;
      if(plateNo){
        this.platNumArr.push(plateNo);
      }

      let _this = this;
      _this.getLocalCoordinate();
      _this.loadMap();

      this.beginDateTime = this.getDateString(new Date().getTime() - (Number(this.footTimeMax)-1)*24*60*60*1000).split(' ')[0] + " " + "00:00:00";
      this.timeBegin = laydate.render({
        elem: '#timeBegin',
        type: 'datetime',
        //min: -90, //90天前
        max: this.endDateTime,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.beginDateTime = value;
          _this.timeEnd.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
          let time = Number(_this.footTimeMax)-1;
          let maxDate = new Date(value).getTime() + time*24*60*60*1000;
          if(new Date().getTime() > maxDate){
            _this.endDateTime = _this.getDateString(maxDate);
            _this.timeEnd.config.max = {
              year: new Date(maxDate).getFullYear(),
              month: new Date(maxDate).getMonth(), //关键
              date: new Date(maxDate).getDate(),
              hours: 23,
              minutes: 59,
              seconds: 59
            };
          }else{
            _this.endDateTime = _this.getDateString(new Date().getTime());
            _this.timeEnd.config.max = {
              year: new Date().getFullYear(),
              month: new Date().getMonth(), //关键
              date: new Date().getDate(),
              hours: 23,
              minutes: 59,
              seconds: 59
            };
          }
        }
      });
      this.timeEnd = laydate.render({
        elem: '#timeEnd',
        type: 'datetime',
        min: this.beginDateTime,
        max: this.endDateTime,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.endDateTime = value;
          console.log(_this.endDateTime);
          console.log(_this.beginDateTime);
          _this.timeBegin.config.max={
            year:date.year,
            month:date.month-1,//关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          }
        }
      });

      this.$nextTick(() => {
        document.querySelector('body').addEventListener('click', this.closeDialog);
        document.querySelector('body').addEventListener('click', this.closeBar);
      })
    },
    beforeDestroy() {
      document.querySelector('body').removeEventListener('click', this.closeDialog);
      document.querySelector('body').addEventListener('click', this.closeBar);
    },
  }


</script>


<style scoped>
  @import "../../assets/css/carJudged_third.css";
  @import "../../assets/css/commom.css";
   .searchBtn{
  padding: 0.02rem 0.1rem;
  color:#fff ;
  font-size: 0.14rem;
  line-height:0.22rem;
  cursor: pointer;
   }
   .el-table  /deep/ td,
.el-table /deep/ th.is-leaf {
  border: 1px solid rgba(12, 68, 135, 0.3) !important;
}
.el-table {
  border: 2px solid rgba(12, 68, 135, 0.3) !important;
}

</style>

