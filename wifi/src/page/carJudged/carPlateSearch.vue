<template>
  <div class="wrapper">
    <div class="topInfo">
       <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link tag="div" to="/carJudged?menuCode=300" class="sysname">车辆研判 ></router-link>
      <div class="sysname">&nbsp;按车牌搜车</div>
    </div>
    <div class="contentBody">

      <div class="contentLeft">
        <div class="contentHide" v-show="contentLeft"></div>
        <div class="clItem cli1">
          <div class="searchTitle">按车牌搜车</div>
          <ul class="searchCondition">
            <li class="conditionInput">
               <img src="../../assets/images/carJudged/search_item.png" alt="">
              车辆搜索条件</li>
            <li class="photoTo">
              <span>抓拍方向：</span>
              <el-select type="text" ref="isCarHead" v-model="isCarHead">
                <el-option v-for="(item,index) in carHeadList" :value="item.value" :label="item.name" :key="index"></el-option>
              </el-select>
            </li>
            <li class="plateItem">
              <span><span class="bt">*</span>车牌号码：</span>
              <el-select ref="selectValue" v-model="carplate">
                <el-option v-for="(p,i) in province" :value="p.name" :label="p.name" :key="i"></el-option>
              </el-select>
              <input type="text" ref="plateNo" value="" placeholder="请输入车牌尾号" @keyup.enter="addPlateNum" @blur="addPlateNum" minlength="6" maxlength="7" />
              <i class="el-icon-circle-close" @click="clear('plateNo')"></i>
              <div class="platNumList">
                <span class="wholeCarPlate grayPn">例:京A*<i class="el-icon-circle-close closeCarPlate"></i></span>
                <span class="wholeCarPlate" v-for="(item,index) in platNumArr" :key="index">{{item}}
                  <i class="el-icon-circle-close closeCarPlate" @click="removeNum(item,index)"></i>
                </span>
              </div>
            </li>
            <li><span><span class="bt">*</span>时段类型：</span>
              <el-radio v-model="timeType" :label="0" @change="changeTime()"> 车辆时段</el-radio>
              <el-radio v-model="timeType" :label="1" @change="changeTime()"> 循环时段</el-radio>
            </li>
            <li>
              <div class="timeWrap" ref="timeType">
                <span v-show="!timeFlag"><span class="bt">*</span>{{"车辆时段"}}：</span>
                <div class="carTime" v-show="!timeFlag">
                  <input type="text" id="timeBegin" readonly v-model.trim="beginDateTime" placeholder="选择开始日期时间"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input type="text" id="timeEnd" readonly v-model.trim="endDateTime" placeholder="选择结束日期时间"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
                </div>
                <span v-show="timeFlag"><span class="bt">*</span>{{"过车日期"}}：</span>
                <div class="cirTime" v-show="timeFlag" >
                  <input type="text" id="cirYearBegin" readonly v-model.trim="beginDate" placeholder="选择开始日期"><i class="el-icon-circle-close" @click="clear('beginDate')"></i>
                  <input type="text" id="cirYearEnd" readonly v-model.trim="endDate" placeholder="选择结束日期"><i class="el-icon-circle-close" @click="clear('endDate')"></i>
                </div>
                <span v-show="timeFlag"><span class="bt">*</span>{{"过车时间"}}：</span>
                <div class="cirTime" v-show="timeFlag">
                  <input type="text" id="cirHourBegin" readonly v-model.trim="beginTime" placeholder="选择开始时间"><i class="el-icon-circle-close" @click="clear('beginTime')"></i>
                  <input type="text" id="cirHourEnd" readonly v-model.trim="endTime" placeholder="选择结束时间"><i class="el-icon-circle-close" @click="clear('endTime')"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="clItem cli2">
          <div class="map">
            <div class="mapHandle">
               <img src="../../assets/images/carJudged/map_tool.png" alt="">
              请选择地图工具
              </div>
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
          <search-detail v-show="checked" searchType="plateNo" port="/tvas/plateno/query" searchTypePN="synPN" searchTypeT="plateNoT" :searchParams="oldParams" :searchResultDefault="searchResultDefault" :searchResultPlateNo="searchResultPlateNo" :searchResultTollgate="searchResultTollgate"></search-detail>
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

    <div class="err" v-if="Err.plateNo.flag" :style="{top: Err.plateNo.top}">{{Err.plateNo.txt}}</div>
    <div class="err" v-if="Err.timeType.flag" :style="{top: Err.timeType.top}">{{Err.timeType.txt}}</div>

  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  import searchDetail from './searchDetail'
  import footerThird from '../../components/footer_third'
  export default {
    components: {
      searchDetail, footerThird
    },
    data() {
      return {
        carplate:sessionStorage.getItem("provinceShort"),
        searchBtn:this.$storage.getSession("303")!=null?true:false,
        //searchPNBtn:this.$storage.getSession("344")!=null?true:false,
        //searchTBtn:this.$storage.getSession("341")!=null?true:false,
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
        // 左侧遮罩
        contentLeft:false,
        platNumArr:[],
        carHeadList: [
          {value: null, name: "不限"},
          {value: 0, name: "车头"},
          {value: 1, name: "车尾"}
        ],

        timeFlag: false,
        checked: false,
        arrawSwitch: false,  //默认不显示蓝色小箭头
        dataFlag: [false,false,false],  //默认三项搜索结果有数据   dataFlag[0]为true即对应搜索结果无数据
        loading: null,
        searchCarMaxDays: sessionStorage.getItem("searchCarMaxDays"), //可配置的时间
        defaultProvice: sessionStorage.getItem("provinceShort"),
        // province: ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
        //   '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台'],
          province: [{value:1,name:'京'}, {value:2,name:'津'},{value:3,name:'冀'},{value:4,name:'晋'} , {value:5,name:'蒙'},  {value:6,name:'辽'},
         {value:7,name:'吉'}, {value:8,name:'黑'} , {value:9,name:'沪'},{value:10,name:'苏'} ,{value:11,name:'浙'} ,{value:12,name:'皖'} , {value:13,name:'闽'},
          {value:14,name:'赣'} ,  {value:15,name:'鲁'}, {value:16,name:'豫'} ,{value:17,name:'鄂'} ,{value:18,name:'湘'} , {value:19,name:'粤'} , {value:20,name:'桂'},
          {value:21,name:'琼'},  {value:22,name:'渝'},  {value:23,name:'川'}, {value:24,name:'贵'},{value:25,name:'云'} , {value:26,name:'藏'},  {value:27,name:'陕'},
          {value:28,name:'甘'}  ,  {value:29,name:'青'} , {value:30,name:'宁'} ,{value:31,name:'新'} ,{value:32,name:'港'} , {value:33,name:'澳'}, {value:34,name:'台'}],
        category: 0,
        isCarHead: 0,
        timeType: 0,
        beginDateTime: this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00",//(this.getWeekDay().split(' ')[0] + " " + "00:00:00"), //过车时段开始日期时间
        endDateTime: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),      //过车时段结束日期时间
        beginDate: (this.getWeekDay().split(' ')[0]),       //循环时段开始日期
        endDate: (this.getCurrentDate().split(' ')[0]),         //循环时段结束日期
        beginTime: "00:00:00",       //循环时段开始时间
        endTime: "23:59:59",          //循环时段结束时间
        tollgateIds: null,
        pageNo: 1,
        pageSize: 10,
        orderBy:'pass_time',
        orderType: 'desc',
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
      searchParams (){
        return {
          category: this.category,
          isCarHead: this.isCarHead,
          plateNo: this.platNumArr.join(','),
          timeType: this.timeType,
          beginDateTime: this.beginDateTime,
          endDateTime: this.endDateTime,
          beginDate: this.beginDate,
          endDate: this.endDate,
          beginTime: this.beginTime,
          endTime: this.endTime,
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

      //切换时段选择
      changeTime() {
        this.timeFlag = !this.timeFlag
      },

      //添加车牌号
      addPlateNum() {
        let selectValue = this.$refs.selectValue.value;
        let inputValue = this.$refs.plateNo.value.trim();
        if(!inputValue){
          this.checkPlateNo();   //必填
          return false;
        }

        //  let xxreg = /^[A-Z*]{1}[A-Z*0-9]{1,5}[A-Z*0-9挂学警港澳]{0,1}$/;   //模糊车牌
        if(inputValue.length != 6 && inputValue.indexOf('*') == -1 && inputValue.length < 6){
            this.checkItem("plateNo", "请正确输入车牌号码！");
            let _this = this;
            setTimeout(function() {
                _this.clearCheck("plateNo");
            }, 1000);
            return;
        }
        let xxreg = /^([A-Z*]{1}(([0-9*]{0,5}[DF])|([DF]([A-HJ-NP-Z*0-9])[0-9*]{0,4})))|([A-Z*]{1}[A-HJ-NP-Z*0-9]{0,4}[A-HJ-NP-Z*0-9挂学警港澳]{1})$/
        //let xxreg = /^[A-Z]{1}([A-Z*0-9]{1,5}[A-Z*0-9挂学警港澳]{0,1}|[A-Z*0-9]{1,6})$/;
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
        //this.$refs.selectValue.value = this.defaultProvice;//this.province[0];
        this.carplate= this.defaultProvice
        this.$refs.plateNo.value = "";
        this.checkPlateNo();
      },

      //删除车牌号
      removeNum(item,index){
        this.platNumArr.splice(index,1);
        this.checkPlateNo();
      },

      //重置
      reset() {
        this.isCarHead = 0;       //是否车头
        this.plateNo = null;
        this.platNumArr = [];
        this.timeType =  0;             //时段类别
        this.timeFlag = false;
        this.beginDateTime =  this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00"; //过车时段开始日期时间
        this.endDateTime =  (this.getCurrentDate().split(' ')[0] + " " + "23:59:59");      //过车时段结束日期时间
        this.beginDate =  (this.getWeekDay().split(' ')[0]);       //循环时段开始日期
        this.endDate =  (this.getCurrentDate().split(' ')[0]);         //循环时段结束日期
        this.beginTime =  "00:00:00";       //循环时段开始时间
        this.endTime =  "23:59:59";          //循环时段结束时间

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
        //this.$refs.selectValue.value = this.defaultProvice;//this.province[0];
        this.carplate=  this.defaultProvice
        this.$refs.plateNo.value = "";
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
        //if(this.searchBtn) {
          let params = this.searchParams;
          params.pageSize = 10;
          params.pageNo = 1;
          params.orderType = "desc";
          this.getVD("plateNo", params, (res) => {
            this.transValue(res.data, this.searchResultDefault);
            this.getChecked();
            this.dataFlag[0] = !this.searchResultDefault.data.total;

            //搜索 车牌合并显示
            //if(this.searchPNBtn) {
              let paramsPN = this.searchParams;
              paramsPN.pageSize = 210;
              paramsPN.pageNo = 1;
              paramsPN.orderType = "desc";
              this.getVD("synPN", paramsPN, (res) => {
                this.transValue(res.data, this.searchResultPlateNo);
                this.getChecked();
                this.dataFlag[1] = !this.searchResultPlateNo.data.total;

                //搜索 位置合并显示
                //if(this.searchTBtn) {
                  let paramsT = this.searchParams;
                  paramsT.pageSize = 42;
                  paramsT.pageNo = 1;
                  paramsT.orderType = "desc";
                  this.getVD("plateNoT", paramsT, (res) => {
                    this.transValue(res.data, this.searchResultTollgate);
                    this.getChecked();
                    this.dataFlag[2] = !this.searchResultTollgate.data.total;

                    if(this.dataFlag[0] && this.dataFlag[1] && this.dataFlag[2] ){
                      //this.$alert("暂无数据","消息提示");
                       this.$notify({
                        type: 'info',
                        message: '抱歉，未查询到符合条件的数据！',
                        position: 'bottom-right',
                        duration: 3000
                      });
                      //layer.alert('抱歉，未查询到符合条件的数据！',{icon:5,title:"消息提示"});
                    }
                  });
                //}

              });
            //}

          });
        //}
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
      }
    },
    mounted: function () {
      this.getWeekDay();
      this.getTreeData();
      this.getCheckedItem(["plateNo","timeType"]);

      let plateNo = this.$router.history.current.query.plateNo;
      if(plateNo){
        this.platNumArr.push(plateNo);
      }

      let _this = this;
      _this.getLocalCoordinate();
      _this.loadMap();

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
          let time = Number(_this.searchCarMaxDays)-1;
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
          let time = Number(_this.searchCarMaxDays)-1;
          let maxDate = new Date(value).getTime() + time*24*60*60*1000;
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
        document.querySelector('body').addEventListener('click', this.closeBar);
      })
    },
    beforeDestroy() {
      document.querySelector('body').addEventListener('click', this.closeBar);
    }
  }

</script>


<style scoped>

  @import "../../assets/css/carJudged_third.css";
@import "../../assets/css/commom.css";
</style>

