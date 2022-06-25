<template>
  <div class="wrapper">
    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
       <span class="sysname childname">当前位置：</span>
      <router-link tag="div" to="/carJudged?menuCode=300" class="sysname">车辆研判 ></router-link>
      <div class="sysname">&nbsp;非机动车搜索</div>
    </div>

    <div class="contentBody">

      <div class="contentLeft">
        <div class="contentHide" v-show="contentLeft"></div>
        <div class="clItem cli1">
          <div class="searchTitle">非机动车搜索</div>
          <ul class="searchCondition">
            <li class="conditionInput">
                 <img src="../../assets/images/carJudged/search_item.png" alt="">
              车辆搜索条件</li>
            <!-- <li v-show="false"><span>抓拍方向：</span>
              <select type="text" ref="isCarHead" v-model="isCarHead"  @change="updateCheckedItem(isCarHead)">
                <option v-for="item in carHeadList" :value="item.value">{{item.name}}</option>
              </select></li> -->
            <li v-show="isCarHead!==1"><span>车辆类型：</span>
              <el-select type="text" ref="vehicleKind" v-model.trim="vehicleKind">
                <el-option value="@" label="不限"></el-option>
                <el-option v-for="(item, index) in vehicleKindList" :value="item.field" :label="item.value" :key="index"></el-option>
              </el-select>
            </li>
            <!--<li>-->
              <!--<span>车辆品牌：</span>-->
              <!--<input type="text" readonly value="" @click="getCarBrand" v-model.trim="vehicleBrand"><i class="el-icon-circle-close" @click="clear('vehicleBrand')"></i>-->
            <!--</li>-->
            <!-- <li v-show="isCarHead!==1">
              <span>车辆型号：</span>
              <input id="vModel" :title="vehicleModel" readonly type="text" value="" @click="getCarModule" v-model.trim="vehicleModel"><i class="el-icon-circle-close" @click="clear('vehicleModel')"></i>
            </li> -->
            <!-- <li  class="carColorItem">
              <div class="carColor">
                <div class="text">车辆颜色：</div>
                <div class="choose">
                  <span class="choseResult" @click="toggleColor"><span :style="{background:vehicleColorValue}"></span></span>
                  <span class="choseResultTxt">{{vehicleColorName}}</span>
                  <select-color v-show="colorFlag" @sendColorToParent="getColorFromChild"></select-color>
                </div>
              </div>
            </li> -->
            <li><span><span class="bt">*</span>时段类型：&nbsp;</span>
              <el-radio v-model="timeType" :label="0" @change="changeTime()"> 车辆时段</el-radio>
              <el-radio v-model="timeType" :label="1" @change="changeTime()"> 循环时段</el-radio>
            </li>
            <li>
              <div class="timeWrap" ref="timeType">
                <span v-show="!timeFlag"><span class="bt">*</span>{{"车辆时段"}}：</span>
                <div class="carTime" v-show="!timeFlag">
                  <input type="text" id="timeBegin" readonly v-model.trim="beginDateTime"  placeholder="请选择开始时间"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input type="text" id="timeEnd" readonly v-model.trim="endDateTime" placeholder="请选择结束时间"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
                </div>
                <span v-show="timeFlag"><span class="bt">*</span>{{"过车日期"}}：</span>
                <div class="cirTime" v-show="timeFlag" >
                  <input type="text" id="cirYearBegin" readonly v-model.trim="beginDate" placeholder="请选择开始时间"><i class="el-icon-circle-close" @click="clear('beginDate')"></i>
                  <input type="text" id="cirYearEnd" readonly v-model.trim="endDate" placeholder="请选择结束时间"><i class="el-icon-circle-close" @click="clear('endDate')"></i>
                </div>
                <span v-show="timeFlag"><span class="bt">*</span>{{"过车时间"}}：</span>
                <div class="cirTime" v-show="timeFlag" >
                  <input type="text" id="cirHourBegin" readonly v-model.trim="beginTime" placeholder="请选择开始时间"><i class="el-icon-circle-close" @click="clear('beginTime')"></i>
                  <input type="text" id="cirHourEnd" readonly v-model.trim="endTime" placeholder="请选择结束时间"><i class="el-icon-circle-close" @click="clear('endTime')"></i>
                </div>
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
            <div v-show="searchBtn" class="btnSearch passBtn" @click="getCarData"><i class="el-icon-search "></i> 搜索</div>
            <!-- <el-button type="primary" class="el-icon-search " @click="getCarData">搜索</el-button> -->
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
          <motorcycleSearch v-show="checked" searchType="kindBicycle" :searchParams="oldParams" :searchResultDefault="searchResultDefault"  :searchResultPlateNo="searchResultPlateNo" :searchResultTollgate="searchResultTollgate" :isShowaa="true"></motorcycleSearch>
        </div>

      </div>

    </div>

    <div class='menu' v-show="isBar">
      <el-input class="menuSearch"
        placeholder="请输入关键字进行过滤"
        v-model.trim="filterText">
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

    <div class="err" v-if="Err.vehicleKind.flag" :style="{top: Err.vehicleKind.top}">{{Err.vehicleKind.txt}}</div>
    <div class="err" v-if="Err.timeType.flag" :style="{top: Err.timeType.top}">{{Err.timeType.txt}}</div>

    <div class="calDialog">
      <casDialog :vehicleKind="vehicleKind" :showFirst="showFirst" :showSecond="showSecond" :carBrand="vehicleBrand" :carModel="vehicleModel"  @passToParent="getChildData"></casDialog>
    </div>

  </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  import motorcycleSearch from './motorcycleSearch'
  import selectColor from './selectColor'
  import casDialog from './casDialog'
  import footerThird from '../../components/footer_third'

  export default {
    components: {
      footerThird, motorcycleSearch, selectColor, casDialog
    },

    data() {
      return {
        searchBtn:this.$storage.getSession("302")!=null?true:false,
        //searchPNBtn:this.$storage.getSession("336")!=null?true:false,
        //searchTBtn:this.$storage.getSession("338")!=null?true:false,
        map:null,//地图对象
        drawingManager : null,
        overlays:[],
        treeList:null,
        filterText: '',
        isBar:false,
        defaultProps: {
          children: "apeTollgates",
          label: "name"
        },
        i:0,
        searchCarMaxDays: sessionStorage.getItem("searchCarMaxDays"), //可配置的时间
        timeFlag: false,
        checked: false,
        arrawSwitch: false,  //默认不显示蓝色小箭头
        dataFlag: [false,false,false],  //默认三项搜索结果有数据   dataFlag[0]为true即对应搜索结果无数据
        loading: null,
        colorFlag: false,
        showFirst: false,
        showSecond: false,
        carHeadList: [
          {value: null, name: "不限"},
          {value: 0, name: "车头"},
          {value: 1, name: "车尾"}
        ],
        vehicleKindList:[],
        // 左侧遮罩
        contentLeft:false,
        category: 0,
        isCarHead: 0,       //是否车头
        vehicleKind: '@',     //车辆类型
        vehicleBrand: "不限",  //车辆品牌
        vehicleBrandCode: null,
        vehicleModel: "不限",  //车辆型号
        vehicleModelCode: null,
        vehicleColor: null,      //车辆颜色
        vehicleColorName: "",      //车辆颜色
        vehicleColorValue: "transparent",      //车辆颜色
        timeType: 0,             //时段类别
        beginDateTime: this.getDateString(new Date().getTime() - 1*24*60*60*1000).split(' ')[0] + " " + "00:00:00", //过车时段开始日期时间
        endDateTime: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),      //过车时段结束日期时间
        // beginDate: (this.getWeekDay().split(' ')[0]),       //循环时段开始日期
        beginDate: this.getDayDate(),       //循环时段开始日期
        endDate: (this.getCurrentDate().split(' ')[0]),         //循环时段结束日期
        beginTime: "00:00:00",       //循环时段开始时间
        endTime: "23:59:59",          //循环时段结束时间
        tollgateIds: null,
        pageNo: 1,
        pageSize: 10,
        orderBy: "pass_time",
        orderType: "desc",
        tollgateIdsArr:[],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表

        //搜索结果 默认
        searchResultDefault: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows:[]
          }
        },
        //搜索结果 车牌合并显示
        searchResultPlateNo: {
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows:[]
          }
        },
        //搜索结果 位置合并显示
        searchResultTollgate:{
          code: null,
          message: "",
          data: {
            pageNo: 0,
            pageSize: 0,
            total: 0,
            rows:[]
          }
        },
        oldParams:{}
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
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
          // category: this.category,
          // isCarHead: this.isCarHead,
          // vehicleKind: this.isCarHead !== 1?this.vehicleKind:null,
          vehicleKind: this.vehicleKind,
          timeType: this.timeType,
          // vehicleModel: this.isCarHead !== 1?this.vehicleModelCode:null,
          // vehicleColor: this.vehicleColor,

          beginDateTime: this.beginDateTime,
          endDateTime: this.endDateTime,
          beginDate: this.beginDate,
          endDate: this.endDate,
          beginTime: this.beginTime,
          endTime: this.endTime,

          tollgateIds: this.tollgateIds,
          pageNo: 1,
          pageSize: 10,
          orderBy: "pass_time",
          orderType: "desc"
        };
      }
    },
    mixins:[vehicle, mapFun],
    methods: {
      updateCheckedItem(val){
        if(val === 1){
          this.getCheckedItem([{"name":"vehicleKind","checked":false},"timeType"]);
        }else{
          this.getCheckedItem(["vehicleKind","timeType"]);
        }
      },
      //车辆类型选择
      changeVehicleKind(a,b){
        this.vehicleBrand = "不限";
        this.vehicleBrandCode = null;
        this.vehicleModel = "不限";
        this.vehicleModelCode = null;
      },
      //获取子组件的数据
      getChildData(data1, data2, data3,data4, data5) {
        this.vehicleBrand = data1;
        this.vehicleModel = data2;
        this.vehicleModelCode = data3;
        this.showSecond = data4;
        this.vehicleBrandCode = data5;
      },

      toggleColor(){
        this.colorFlag = !this.colorFlag;
      },
      //获取车辆颜色
      getColorFromChild(color) {
        this.vehicleColor = color.code;
        this.vehicleColorName = color.name;
        this.vehicleColorValue = color.colorValue;
        this.colorFlag = false;
      },
      changeTime() {
        this.timeFlag = !this.timeFlag
      },

      //关闭弹出层
      closeDialog(e) {
        let dialogFirst = document.getElementsByClassName('first')[0];
        if (dialogFirst.style.display !== 'none' && e.target.id !== "vModel") {
          let casWrapper = document.getElementsByClassName('casWrapper')[0];
          if (!casWrapper.contains(e.target)) {
            this.showFirst = false;
            this.showSecond = false;
          }
        }
      },
     //重置
      reset() {
        this.isCarHead = 0;       //是否车头
        this.vehicleKind = '@';
        this.vehicleBrand = "不限";  //车辆品牌
        this.vehicleBrandCode = null;
        this.vehicleModel = "不限";  //车辆型号
        this.vehicleModelCode = null;
        this.vehicleColor =  null;      //车辆颜色
        this.vehicleColorName =  "";
        this.vehicleColorValue =  "transparent";
        this.timeType =  0;             //时段类别
        this.timeFlag = false;
        this.beginDateTime =  this.getDateString(new Date().getTime() - 1*24*60*60*1000).split(' ')[0] + " " + "00:00:00"; //过车时段开始日期时间
        this.endDateTime =  (this.getCurrentDate().split(' ')[0] + " " + "00:00:00");      //过车时段结束日期时间
        // this.beginDate =  (this.getWeekDay().split(' ')[0]);       //循环时段开始日期
        this.beginDate = this.getDayDate
        this.endDate =  (this.getCurrentDate().split(' ')[0]);         //循环时段结束日期
        this.beginTime =  "00:00:00";       //循环时段开始时间
        this.endTime =  "23:59:59";          //循环时段结束时间

        this.updateCheckedItem(this.isCarHead);

        //重置时间选择范围
        this.timeBegin.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };
        this.timeEnd.config.min = {
          year: new Date(new Date().getTime() - 7*24*60*60*1000).getFullYear(),
          month: new Date(new Date().getTime() - 7*24*60*60*1000).getMonth(), //关键
          date: new Date(new Date().getTime() - 7*24*60*60*1000).getDate(),
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        this.timeEnd.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };
        this.cyB.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate()
        };
        this.cyE.config.min = {
          year: new Date(new Date().getTime() - 7*24*60*60*1000).getFullYear(),
          month: new Date(new Date().getTime() - 7*24*60*60*1000).getMonth(),
          date: new Date(new Date().getTime() - 7*24*60*60*1000).getDate()
        };
        this.cyE.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate()
        };
        this.chB.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };
        this.chE.config.max = {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };

        this.$refs.tree.setCheckedNodes([]);
        this.clearDrawing();
      },

      //按搜索条件查询
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
        //搜索
          let params = this.searchParams;
          params.pageSize = 10;
          params.pageNo = 1;
          params.orderType = "desc";
          this.getVD("kindBicycle", params, (res) => {
            // console.log('测试查询'+JSON.stringify(res))
            this.transValue(res.data, this.searchResultDefault);
            this.getChecked();
            this.dataFlag[0] = !this.searchResultDefault.data.total;
            if(this.searchResultDefault.data.rows.length == 0){
               this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
             // layer.alert('抱歉，未查询到符合条件的数据！',{icon:5,title:"消息提示"});
            }
          });
      },
      getChecked (){
        if(this.searchResultDefault.data.total === 0 && this.searchResultPlateNo.data.total === 0 && this.searchResultTollgate.data.total === 0){
          this.checked = false;
          this.arrawSwitch = false;
        }else if(this.searchResultDefault.data.total >0 || this.searchResultPlateNo.data.total >0 || this.searchResultTollgate.data.total >0){
          this.checked = true;
          this.arrawSwitch = true;
          this.oldParams = this.searchParams;
        }
      },
      // 获取当前时间减少一天
      getDayDate(){
        let date = new Date().getTime();
        date = date - 24 * 60 * 60 * 1000;
        date = new Date(date)
        let year = date.getFullYear();
        let month = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return year + '-' + month + '-' + day
      },

    },
    mounted: function () {
      this.getDayDate();
      // this.getWeekDay();
      this.getTreeData();
      this.getCheckedItem(["timeType"]);
      let _this = this;
      _this.getLocalCoordinate();
      _this.loadMap();

      //初始获取车辆类型列表
      this.getVehicleKindBicycle((res) => {
        this.vehicleKindList = res.data.data;
      });
      this.timeBegin = laydate.render({
        elem: "#timeBegin",
        type: "datetime",
        //min: -90, //90天前
        max:  this.endDateTime, //0天后
        btns: ['now','confirm'],
        done: function(value, date, endDate) {
          _this.beginDateTime = value;
          _this.timeEnd.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
          let maxDate = new Date(value).getTime() + 24*60*60*1000;
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
        elem: "#timeEnd",
        type: "datetime",
        min: this.beginDateTime,
        max: this.endDateTime,
        btns: ['now','confirm'],
        done: function(value, date, endDate) {
          _this.endDateTime = value;
          _this.timeBegin.config.max = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
      this.cyB = laydate.render({
        elem: "#cirYearBegin",
        max: this.endDate, //0天后
        btns: ['now','confirm'],
        done: function(value, date) {
          _this.beginDate = value;
          _this.cyE.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date
          };
          // let time = Number(_this.searchCarMaxDays)-1;
          let maxDate = new Date(value).getTime() + 24*60*60*1000;
          if(new Date().getTime() > maxDate){
            _this.endDate = _this.getDateString(maxDate).split(" ")[0];
            _this.cyE.config.max = {
              year: new Date(maxDate).getFullYear(),
              month: new Date(maxDate).getMonth(), //关键
              date: new Date(maxDate).getDate()
            };
          }else{
            _this.endDate = _this.getDateString(new Date().getTime()).split(" ")[0];
            _this.cyE.config.max = {
              year: new Date().getFullYear(),
              month: new Date().getMonth(), //关键
              date: new Date().getDate()
            };
          }
        }
      });
      this.cyE = laydate.render({
        elem: "#cirYearEnd",
        min: this.beginDate,
        max: this.endDate, //0天后
        btns: ['now','confirm'],
        done: function(value, date) {
          _this.endDate = value;
          _this.cyB.config.max = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date
          };
        }
      });
      this.chB = laydate.render({
        elem: "#cirHourBegin",
        type: "time",
        btns: ['now','confirm'],
        done: function(value, date) {
          _this.beginTime = value;
          _this.chE.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
      this.chE = laydate.render({
        elem: "#cirHourEnd",
        type: "time",
        btns: ['now','confirm'],
        done: function(value, date) {
          _this.endTime = value;
          _this.chB.config.max = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
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
    }
  }


</script>


<style scoped>

  @import "../../assets/css/carJudged_third.css";
  @import "../../assets/css/commom.css";

</style>

