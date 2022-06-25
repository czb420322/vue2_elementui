<template>
  <div class="wrapper">
    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
       <span class="sysname childname">当前位置：</span>
      <router-link tag="div" to="/carJudged?menuCode=300" class="sysname">车辆研判 ></router-link>
      <div class="sysname">&nbsp;多区域碰撞</div>
    </div>

    <div class="contentBody">

      <div class="contentLeft">
        <div class="contentHide" v-show="contentLeft"></div>
        <div class="clItem cli1">
          <div class="searchTitle">多区域碰撞分析</div>
          <ul class="searchCondition">
            <li class="conditionInput">
                 <img src="../../assets/images/carJudged/search_item.png" alt="">
              车辆搜索条件</li>
            <li class="ftcItem">
              <div class="left_ftci" ><span class="bt">*</span>过车时段：</div>
              <div class="right_ftci">
                <input style="margin-bottom:0.1rem;" type="text" readonly id="timeBegin" ref="beginDateCI" v-model.trim="conditionsItem.beginDate" placeholder="选择开始日期时间" @blur="checkBeginDateCI"><i class="el-icon-circle-close" @click="clear('beginDateCI')"></i>
                <input type="text" id="timeEnd" ref="endDateCI" readonly v-model.trim="conditionsItem.endDate" placeholder="选择结束日期时间" @blur="checkEndDateCI"><i class="el-icon-circle-close" @click="clear('endDateCI')"></i>
              </div>
            </li>
            <li>
              <span>车辆品牌：</span>
              <input type="text" id="vBrand" readonly value="" ref="vehicleBrand" @click="getCarBrand" v-model.trim="vehicleBrand"><i class="el-icon-circle-close" @click="clearBand();refresh()"></i>
            </li>
              <li>
                <span>车辆型号：</span>
                <input type="text" :title="vehicleModel" id="vModel" readonly value="" ref="vehicleModel" @click="getCarModule" v-model.trim="vehicleModel"><i class="el-icon-circle-close" @click="clear('vehicleModel')"></i>
              </li>
          </ul>
        </div>
        <div class="clItem cli3">
          <div class="map">
            <div class="mapHandle">
              <img src="../../assets/images/carJudged/map_tool.png" alt="">
              请选择地图工具</div>
            <div class="mapItem crashmapItem">
              <div class="itemIcon" @click="drawReact"></div>
              <div class="itemIcon" @click="drawLine"></div>
              <div class="itemIcon" @click="closeDraw"></div>
              <div class="itemIcon" @click="toggleBar" id="menuImg"></div>
              <div class="itemIcon" @click="clearDrawing"></div>
            </div>
          </div>
          <div  class="btnContainer bc2">
            <el-button class="saveBtn topBtn" type="primary" @click="addCondition" icon="el-icon-document">保存选择</el-button>
          </div>
          <div  class="map">
            <div class="mapHandle arshmapHandle">
              <img src="../../assets/images/carJudged/analysis.png" alt="">
               研判条件&nbsp; &nbsp; <span>( {{conditions.length}}/5 )</span></div>
            <!-- <ul class="searchCondition" style="height:0.74rem;padding-top:0.2rem;">
              <li>
                <span>车辆型号：</span>
                <input type="text" :title="vehicleModel" id="vModel" readonly value="" ref="vehicleModel" @click="getCarModule" v-model.trim="vehicleModel"><i class="el-icon-circle-close" @click="clear('vehicleModel')"></i>
              </li>
            </ul> -->
            <div class="condWrap">
              <div class="condTitle">

                    <span v-for="(item,index) in conditionsNum" :key="index" :class="activeCond === index?'active':''" @click="activeCond = index"><el-checkbox v-model="conditionsNum[index]"></el-checkbox>条件{{index+1}}</span>

                <div class="condTitleafter"></div>
              </div>
              <div :class="[activeCond===index ? 'active' : '', 'condList']"  v-for="(item, index) in conditions" :key="index">
                <!-- <div class="condItem">
                  <el-checkbox v-model="conditionsNum[index]" :class="activeCond == index?'on':''">条件{{index+1}}:</el-checkbox>
                </div> -->
                <div class="condItem"><span>过车时段:</span><span class="conditionText">{{item.beginDate}}至{{item.endDate}}</span></div>
                <div class="condItem kkName"><span>卡口名称:</span><span class="conditionText" :title="item.tollgateIdsName">{{item.tollgateIdsName}}</span></div>
                <!--<div class="condItem"><span>车辆品牌:</span><span class="conditionText">{{item.vehicleBrand}}</span></div>-->
                <!--<div class="condItem"><span>车辆型号:</span><span class="conditionText">{{item.vehicleModel}}</span></div>-->
                <div class="clbtn">
                  <el-button class="delBtn" type="danger" icon="el-icon-delete" @click="deleteCondition(index)">删除</el-button>
                  <el-button class="searchBtn" type="primary" :disabled="editDisabled" icon="el-icon-edit" @click="editCondition(index)">编辑</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="btnContainer bc3">
            <div v-show="searchBtn" class="btnAys passBtn" @click="getCarData"><i class="el-icon-search "></i> 开始分析</div>
          </div>
        </div>
      </div>

      <div class="content">
        <div id="mapContent"></div>
        <img class="dingwei" src="../../assets/case/quickPos.png" @click="loadMap();initPoint();" />
        <!--搜索结果详情-->
        <div class="sDetail" :style="{left: checked?'0.12rem':'100%'}">
          <div class="contentSwitch" v-show="arrawSwitch" :style="{left:checked?'0':'-0.16rem'}">
            <img v-if="!checked" src="../../assets/images/carJudged/arrows-left.png" @click="checked = !checked">
            <img v-else src="../../assets/images/carJudged/arrows-right.png" @click="checked=!checked">
          </div>
          <first-to-city-detail v-show="checked" searchType="moreArea" port="/tvas/synthesizeAnalyze/morearea/query" :searchParams="oldParams" :searchResult="searchResult" ></first-to-city-detail>
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

    <div class="err" v-if="Err.beginDateCI.flag" :style="{top: Err.beginDateCI.top}">{{Err.beginDateCI.txt}}</div>
    <div class="err" v-if="Err.endDateCI.flag" :style="{top: Err.endDateCI.top}">{{Err.endDateCI.txt}}</div>

    <div class="calDialog">
      <casDialog vehicleKind="noKind" :showFirst="showFirst" :showSecond="showSecond" :carBrand="vehicleBrand" :carModel="vehicleModel" @passToParent="getChildData" :icoclick="icoclick" @changeicoclick='changeicoclick'></casDialog>
    </div>

  </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  // import casDialog from './casDialog'
  // import firstToCityDetail from './firstToCityDetail'
  import footerThird from '../../components/footer_third'
  export default {
    components: {
     casDialog: () => import('./casDialog'),
     firstToCityDetail: () => import('./firstToCityDetail'),
     footerThird
    },

    data() {
      return {
        searchBtn:this.$storage.getSession("316")!=null?true:false,
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
        moreareaMaxDays: sessionStorage.getItem("moreareaMaxDays"), //可配置时间
        checked: false,
        arrawSwitch: false,  //默认不显示蓝色小箭头
        loading: null,
        imgsrc: '',
        showFirst: false,
        showSecond: false,
        //时间选择控件
        timeBegin:null,
        timeEnd: null,
        activeCond: 0,
        editDisabled: false,

        vehicleKindList:[],

        category: 0,

        tollgateIds: null,

        currentItem: 99,

        conditionsItem: {
          beginDate:this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00",
          endDate: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),
          tollgateIds: null,
          tollgateIdsName: null
        },
        vehicleBrand: "不限",  //车辆品牌
        vehicleBrandCode: null,
        vehicleModel: "不限",  //车辆型号
        vehicleModelCode: null,
        conditions: [],  //点击保存得到的条件列表
        conditionsNum: [],

        pageNo: 1,
        pageSize:100,
        orderBy: 'pass_time',
        orderType: 'desc',
        tollgateIdsArr:[],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表

        realConditions:[],
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
          conditions:JSON.stringify(this.realConditions),
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
      getChildData(data1, data2, data3,data4,data5) {
        this.vehicleBrand = data1;
        this.vehicleModel = data2;
        this.vehicleModelCode = data3;
        this.showSecond = data4;
        this.vehicleBrandCode = data5;
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
        this.vehicleBrand = "不限";  //车辆品牌
        this.vehicleBrandCode = null;
        this.vehicleModel = "不限";  //车辆型号
        this.vehicleModelCode = null;
        this.conditions = [];
        this.conditionsNum = [];
        this.conditionsItem.beginDate =  this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00"; //过车时段开始日期时间
        this.conditionsItem.endDate =  (this.getCurrentDate().split(' ')[0] + " " + "23:59:59");      //过车时段结束日期时间

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

        this.$refs.tree.setCheckedNodes([]);
        this.clearDrawing();
      },

      //更新条件列表
      getCondNum (){
        this.conditionsNum = [];
        if(this.conditions.length > 0){
          for(let i =0;i<this.conditions.length;i++){
            this.conditionsNum[i] = true;
          }
        }
      },
      realConditionsFn(){
        this.realConditions = [];
        if(this.conditions.length > 0){
          for(let i=0;i<this.conditions.length;i++){
            if(this.conditionsNum[i]){
              let obj = {};
              obj.beginDate = this.conditions[i].beginDate;
              obj.endDate = this.conditions[i].endDate;
              obj.tollgateIds = this.conditions[i].tollgateIds;
              this.realConditions.push(obj);
            }
          }
        }
      },
      //添加碰撞条件
      addCondition(){
        if(this.conditions.length == 5 && this.currentItem == 99){
          //this.$alert("最多添加五条条件","消息提示");
           this.$notify({
                        type: 'warning',
                        message: '最多添加五条条件！',
                        position: 'bottom-right',
                        duration: 3000
                      });
        //  layer.alert('最多添加五条条件！',{icon:5,title:"消息提示"});
          return;
        }
        if(this.currentItem === 99){
          //新增
          this.conditionsItem.tollgateIds = this.tollgateIds;
          this.conditionsItem.tollgateIdsName = this.tollgateIdsArrName.join(",");

          //添加条件时条件必填项验证
          if(!this.conditionsItem.tollgateIds){
            //this.$alert("研判条件卡口位置必选！","消息提示");
            this.$notify({
                        type: 'warning',
                        message: '研判条件卡口位置必选！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('研判条件卡口位置必选！',{icon:5,title:"消息提示"});
            return false;
          }

          if(!this.checkForm()){
            //验证不通过则不向下执行
            return false;
          }

          this.conditions.push(this.conditionsItem);
          this.conditionsNum.push(true);
          //this.realConditionsFn();
          //this.getCondNum();

          //新增成功后重置当前值
          this.conditionsItem = {
            beginDate:this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00",
            endDate: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),
            tollgateIds: null,
            tollgateIdsName: null
          };
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
          this.clearDrawing();
          this.activeCond = this.conditions.length - 1;
        }else{
          //编辑
          //重新得到卡口值,请确认卡口
          //添加条件时条件必填项验证
          this.editDisabled = false;
          if(!this.tollgateIds && this.conditionsItem.tollgateIds == ""){
            //this.$alert("研判条件卡口位置必选！","消息提示");
              this.$notify({
                        type: 'warning',
                        message: '研判条件卡口位置必选！',
                        position: 'bottom-right',
                        duration: 3000
                      });
          //  layer.alert('研判条件卡口位置必选！',{icon:5,title:"消息提示"});
            return false;
          }

          if(this.tollgateIds){
            this.conditionsItem.tollgateIds = this.tollgateIds;
            this.conditionsItem.tollgateIdsName = this.tollgateIdsArrName.join(",");
          }

          if(!this.checkForm()){
            //验证不通过则不向下执行
            return false;
          }
          this.conditions[this.currentItem] = this.conditionsItem;
          this.currentItem = 99;

          //编辑成功后重置当前值
          this.conditionsItem = {
            beginDate:this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00",
            endDate: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),
            tollgateIds: null,
            tollgateIdsName: null
          };
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
          this.clearDrawing();
        }

      },
      deleteCondition(index){
        this.conditions.splice(index, 1);
        this.activeCond = this.conditions.length - 1;
        this.currentItem = 99;
        this.conditionsNum.splice(index, 1);
        this.editDisabled = false;
        //编辑成功后重置当前值
        this.conditionsItem = {
          beginDate:this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00",
          endDate: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),
          tollgateIds: null,
          tollgateIdsName: null
        };
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
        this.clearDrawing();
      },
      editCondition(index){
        this.currentItem = index;
        this.conditionsItem.beginDate = this.conditions[index].beginDate;
        this.conditionsItem.endDate = this.conditions[index].endDate;
        this.conditionsItem.tollgateIds = this.conditions[index].tollgateIds;
        this.conditionsItem.tollgateIdsName = this.conditions[index].tollgateIdsName;
        this.tollTreeArr = this.conditions[index].tollgateIds.split(",");
        this.tollTreeArrName = this.conditions[index].tollgateIdsName.split(",");
        this.$refs['tree'].setCheckedKeys(this.conditions[index].tollgateIds.split(","));

        //重置时间选择范围
        this.timeBegin.config.max = {
          year: new Date(this.conditionsItem.endDate).getFullYear(),
          month: new Date(this.conditionsItem.endDate).getMonth(), //关键
          date: new Date(this.conditionsItem.endDate).getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };
        this.timeEnd.config.min = {
          year: new Date(this.conditionsItem.beginDate).getFullYear(),
          month: new Date(this.conditionsItem.beginDate).getMonth(), //关键
          date: new Date(this.conditionsItem.beginDate).getDate(),
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        this.timeEnd.config.max = {
          year: new Date(this.conditionsItem.endDate).getFullYear(),
          month: new Date(this.conditionsItem.endDate).getMonth(), //关键
          date: new Date(this.conditionsItem.endDate).getDate(),
          hours: 23,
          minutes: 59,
          seconds: 59
        };

        this.editDisabled = true;
      },

      getCarData (){
        this.realConditionsFn();

        if(this.realConditions.length < 2){
          //this.$alert("请确定保存并勾选了至少2个研判条件！","消息提示");
             this.$notify({
                        type: 'warning',
                        message: '请确定保存并勾选了至少2个研判条件！',
                        position: 'bottom-right',
                        duration: 3000
                      });
         // layer.alert('请确定保存并勾选了至少2个研判条件！',{icon:5,title:"消息提示"});
          return false;
        }

        this.editDisabled = false;
        this.currentItem = 99;
        this.conditionsItem = {
          beginDate:this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00",
          endDate: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),
          tollgateIds: null,
          tollgateIdsName: null
        };
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
        this.clearDrawing();

        //初始时关闭搜索结果
        this.checked = false;
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });

        let params = this.searchParams;
        params.pageNo = 1;
        params.pageSize = 100;
        params.orderType = 'desc';
        this.getVD("moreArea", params, (res)=>{
          this.transValue(res.data, this.searchResult);
          this.oldParams = this.searchParams;
          if(this.searchResult.data.total === 0 ){
            //this.$alert("暂无数据","消息提示");
             this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('抱歉，未查询到符合条件的数据！',{icon:5,title:"消息提示"});
            this.checked = false;
            this.arrawSwitch = false;
          }else{
            this.checked = true;
            this.arrawSwitch = true;
          }

        });
      }

    },
    mounted: function () {
      this.getWeekDay();
      this.getTreeData();
      this.getCheckedItem(["beginDateCI","endDateCI"]);
      let _this = this;
      _this.getLocalCoordinate();
      _this.loadMap();

      this.timeBegin = laydate.render({
        elem: '#timeBegin',
        type: 'datetime',
        //min: -90, //90天前
        max:this.conditionsItem.endDate, //0天后
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          //_this.beginDateTime = value;
          _this.conditionsItem.beginDate = value;
          _this.timeEnd.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
          let time = Number(_this.moreareaMaxDays)-1;
          let maxDate = new Date(value).getTime() + time*24*60*60*1000;
          if(new Date().getTime() > maxDate){
            //_this.endDateTime = _this.getDateString(maxDate);
            _this.conditionsItem.endDate = _this.getDateString(maxDate);
            _this.timeEnd.config.max = {
              year: new Date(maxDate).getFullYear(),
              month: new Date(maxDate).getMonth(), //关键
              date: new Date(maxDate).getDate(),
              hours: 23,
              minutes: 59,
              seconds: 59
            };
          }else{
            //_this.endDateTime = _this.getDateString(new Date().getTime());
            _this.conditionsItem.endDate = _this.getDateString(new Date().getTime());
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
        min: this.conditionsItem.beginDate,
        max: this.conditionsItem.endDate, //0天后
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          //_this.endDateTime = value;
          _this.conditionsItem.endDate = value;
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
    }
  }


</script>


<style scoped>

  @import "../../assets/css/carJudged_third.css";
@import "../../assets/css/commom.css";
  .condWrap{
    /* border-top: 1px solid #dcdfe6; */
    max-height: 2rem;
    padding: 0.05rem 0.25rem 0.05rem 0.25rem;
  }
  .condTitle{
    /*margin-top: 0.05rem;*/
    display:flex;
    /* border-bottom:1px solid #dcdfe6; */
  }
  .condTitle .el-checkbox-group{
    display:flex;
  }
  .condTitle span{
    position: relative;
    bottom: 0px;
    border:1px solid #345072;
    padding: 0.02rem 0.05rem;
    /* margin-left: 0.05rem; */
    cursor: pointer;
    color:#99c9fa ;
    font-size: 0.12rem    ;
    width: 20%;
  }
  .condTitle span:first-child{
    margin-left:0;
  }
  .condTitle span.active{
    /* border-bottom-color: #fff; */
     border-bottom: none;
  }
  .condTitle span.active >>> .el-checkbox__label{
    color:#78B5FE;
  }
  .condTitle span>>>.el-checkbox{
    font-size: 0.12rem
  }
  .condTitle span>>>  .el-checkbox__inner{
    width: 0.12rem;
    height: 0.12rem;
  }
  .condTitle span>>>    .el-checkbox__inner::after{
    height:0.07rem;
    left:0.03rem;
    width: 0.03rem;
    top:0.01rem
  }
  .condList{
    height:1.74rem;
    display:none;
     padding: 0 0.1rem 0 0.24rem;
    border: 1px solid #345072;
    border-top:none;
    position: relative;
   /* margin-top:-1px; */
  }
  /* .condList::after{
    content:'';
    height:1px;
    width: 100%;
    background:#345072;
    position:absolute;
    top:-1px;
    left:0;
    z-index: 0;
  } */
  .condList.active{
    display:block;
  }
  .condItem{
    font-size: 0.12rem;
    line-height: 0.2rem;
    color:#99c9fa ;
    margin-bottom: 0.1rem
  }
  .kkName{
    max-height: 0.96rem;
    text-overflow: ellipsis;
    white-space:pre-wrap;
    overflow: hidden;
  }
  .condItem .on{
    color:#78B5FE;
  }
  .condItem:first-child{
    position: relative;
    /* left: -0.25rem; */
    /* margin-top: 0.1rem; */
    padding-top:0.1rem
  }
  .condItem .conditionText{
    /* color:rgb(251, 130, 26); */
    color:#fb6657;
     margin-left: 0.09rem;
   }
  .clbtn{
    margin: 0.05rem 0;
  }
  .clbtn .el-button {
    padding: 0.06rem 0.12rem;
  }
  .condTitleafter{
    border-bottom: 1px solid #345072;
    flex:1;
    /* margin-bottom: -1px */
  }

</style>

