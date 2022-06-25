<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link tag="div" :to="{path:'/carJudged',query:{menuCode:300}}" class="nav-item">车辆研判</router-link>
      <div class="nav-item nav-item-search">布控申请</div>
    </div> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname"  :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判 > </router-link>
      <p class="sysname">&nbsp;布控申请</p>
    </div>

    <div class="contentBody">
      <div class="contentLeft">
        <div class="contentHide" v-show="contentLeft"></div>
        <div class="clItem cli1">
          <div class="searchTitle"> 布控申请</div>
          <ul class="searchCondition">
            <li class="conditionInput">
               <img src="../../assets/images/carJudged/search_item.png" alt="">
              车辆搜索条件
              </li>
            <li class="contraltype">
              <span><span class="bt">*</span>布控类型：</span>
              <el-select type="text" v-model="deployType" @change="changeDeplopItem(deployType)">
                <el-option value="10" label ="按车牌布控"></el-option>
                <el-option value="20" label="按类别布控"></el-option>
                <el-option value="30" label="按车型布控"></el-option>
                <!--<option value=40>套牌车布控</option>-->
              </el-select>
            </li>
            <div class="deployItem" id="deployTypeItem1">
              <li class="plateItem">
                <span><span class="bt">*</span>车牌号码：</span>
                <el-select ref="selectValue" v-model="carplate">
                <el-option v-for="(p,i) in province" :value="p" :label="p" :key="i"></el-option>
              </el-select>
                <input type="text"  ref="plateNo" value="" placeholder="请输入精确车牌号" class="err-plateNum"  @keyup.enter="addPlateNum" @blur="addPlateNum" minlength="6" maxlength="7" /><i class="el-icon-circle-close"></i>
                <div class="platNumList">
                  <span class="wholeCarPlate grayPn">例:京A12345<i class="el-icon-circle-close closeCarPlate"></i></span>
                  <span class="wholeCarPlate" v-for="(item,index) in platNumArr" :key="index">{{item}}
                    <i class="el-icon-circle-close closeCarPlate" @click="removeNum(item,index)"></i>
                  </span>
                </div>
              </li>
              <li class="ftcItem">
                <div class="left_ftci" ><span class="bt">*</span>布控时限：</div>
                <div class="right_ftci">
                  <input style="margin-bottom:0.1rem;" type="text" readonly id="dateBegin1" ref="beginDateTime" v-model.trim="beginDateTime1" placeholder="请选择开始时间" @blur="checkBeginDateTime"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input type="text" id="dateEnd1" ref="endDateTime" readonly v-model.trim="endDateTime1" placeholder="请选择结束时间" @blur="checkEndDateTime"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
                </div>
              </li>
              <li><span><span class="bt">*</span>报警方式：</span>
                <el-radio v-model="radio1" label="0"> 系统预警</el-radio>
                <el-radio v-model="radio1" label="1"> 短信预警</el-radio>
              </li>
              <li>
                <span class="rp"><span class="bt">*</span>接&nbsp;&nbsp;收&nbsp;&nbsp;人：</span>
                <el-select
                  v-model.trim="userNameArr"
                  class="receivePerson err-receivePerson1"
                  multiple
                  filterable
                  placeholder="请选择接收人">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.trueName+'('+item.phone+')'"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><span class="bt">*</span>布控原因：</span>
                <textarea maxlength="200" placeholder="请输入布控原因" class="err-reason1" v-model.trim="reason1" cols="30" rows="3"></textarea>
              </li>
            </div>
            <div class="deployItem" id="deployTypeItem2">
              <li class="veticlType"><span><span class="bt">*</span>车辆类别：</span>
                <el-select name="" ref="carTypeValue" id="selectcarType" v-model="veticlType">
                  <el-option v-for="(carType,index) in carTypeList" :value="carType.field" :label="carType.value" :key="index"></el-option>
                </el-select>
              </li>
              <li class="ftcItem">
                <div class="left_ftci" ><span class="bt">*</span>布控时限：</div>
                <div class="right_ftci">
                  <input style="margin-bottom:0.1rem;" type="text" readonly id="dateBegin2" ref="beginDateTime2" v-model.trim="beginDateTime2" placeholder="请选择开始时间" @blur="checkBeginDateTime"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input type="text" id="dateEnd2" ref="endDateTime2" readonly v-model.trim="endDateTime2" placeholder="请选择结束时间" @blur="checkEndDateTime"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
                </div>
              </li>
              <li><span><span class="bt">*</span>报警方式：</span>
                <el-radio v-model="radio2" label="0"> 系统预警</el-radio>
                <el-radio v-model="radio2" label="1"> 短信预警</el-radio>
              </li>
              <li>
                <span class="rp"><span class="bt">*</span>接&nbsp;&nbsp;收&nbsp;&nbsp;人：</span>
                <el-select
                  v-model.trim="userNameArr"
                  class="receivePerson err-receivePerson2"
                  multiple
                  filterable
                  placeholder="请选择接收人">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.trueName+'('+item.phone+')'"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><span class="bt">*</span>布控原因：</span>
                <textarea maxlength="200" placeholder="请输入布控原因" class="err-reason2" v-model.trim="reason2" cols="30" rows="3"></textarea>
              </li>
            </div>
            <div class="deployItem" id="deployTypeItem3">
              <li>
                <span><span class="bt"></span>车辆品牌：</span>
                <input type="text" id="vBrand" readonly value="" @click="getCarBrand" v-model.trim="vehicleBrand" class="err-vehicleBrand" placeholder="请输入车辆品牌"><i class="el-icon-circle-close" @click="clearBand();refresh()" ></i>
              </li>
              <li>
                <span><span class="bt"></span>车辆型号：</span>
                <input type="text" :title="vehicleModel" id="vModel" readonly value="" ref="vehicleModel" @click="getCarModule" v-model.trim="vehicleModel" class="err-vehicleModel" placeholder="请输入车辆型号"><i class="el-icon-circle-close" @click="clearModel()"></i>
              </li>
              <li class="ftcItem">
                <div class="left_ftci" ><span class="bt">*</span>布控时限：</div>
                <div class="right_ftci">
                  <input style="margin-bottom:0.1rem;" type="text" readonly id="dateBegin3" ref="beginDateTime3" v-model.trim="beginDateTime3" placeholder="请选择开始时间" @blur="checkBeginDateTime"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input type="text" id="dateEnd3" ref="endDateTime3" readonly v-model.trim="endDateTime3" placeholder="请选择结束时间" @blur="checkEndDateTime"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
                </div>
              </li>
              <li><span><span class="bt">*</span>报警方式：</span>
                <el-radio v-model="radio3" label="0"> 系统预警</el-radio>
                <el-radio v-model="radio3" label="1"> 短信预警</el-radio>
              </li>
              <li>
                <span class="rp"><span class="bt">*</span>接&nbsp;&nbsp;收&nbsp;&nbsp;人：</span>
                <el-select
                  v-model.trim="userNameArr"
                  class="receivePerson err-receivePerson3"
                  multiple
                  filterable
                  placeholder="请选择接收人">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.trueName+'('+item.phone+')'"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><span class="bt">*</span>布控原因：</span>
                <textarea maxlength="200" placeholder="请输入布控原因" class="err-reason3" v-model.trim="reason3" cols="30" rows="3"></textarea>
              </li>
            </div>
            <div class="deployItem" id="deployTypeItem4">
              <li class="ftcItem">
                <div class="left_ftci" ><span class="bt">*</span>布控时限：</div>
                <div class="right_ftci">
                  <input style="margin-bottom:0.1rem;" type="text" readonly id="dateBegin4" ref="beginDateTime4" v-model.trim="beginDateTime4" placeholder="请选择开始时间" @blur="checkBeginDateTime"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input type="text" id="dateEnd4" ref="endDateTime4" readonly v-model.trim="endDateTime4" placeholder="请选择结束时间" @blur="checkEndDateTime"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
                </div>
              </li>
              <li><span><span class="bt">*</span>报警方式：</span>
                <el-radio v-model="radio4" label="0"> 系统预警</el-radio>
                <el-radio v-model="radio4" label="1"> 短信预警</el-radio>
              </li>
              <li>
                <span class="rp"><span class="bt">*</span>接&nbsp;&nbsp;收&nbsp;&nbsp;人：</span>
                <el-select
                  v-model.trim="userNameArr"
                  class="receivePerson err-receivePerson4"
                  multiple
                  filterable
                  placeholder="请选择接收人">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.trueName+'('+item.phone+')'"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><span class="bt">*</span>布控原因：</span>
                <textarea maxlength="200" placeholder="请输入布控原因" class="err-reason4" v-model.trim="reason4" cols="30" rows="3"></textarea>
              </li>
            </div>
          </ul>
        </div>
        <div class="clItem cli2">
          <div class="map">
            <div class="mapHandle">
               <img src="../../assets/images/carJudged/map_tool.png" alt="">
              请选择地图工具</div>
            <div class="mapItem ">
              <div class="itemIcon itemIconFirst" @click="drawReact"></div>
              <div class="itemIcon" @click="drawLine"></div>
              <div class="itemIcon" @click="closeDraw"></div>
              <div class="itemIcon" @click="toggleBar" id="menuImg"></div>
              <div class="itemIcon " @click="clearDrawing">
              </div>
            </div>
          </div>
          <div class="btnContainer">
            <div class="btnReset cancleBtn" @click="reset()"><i class="el-icon-refresh"></i> 重置</div>
            <div v-show="deployApplyBtn" class="btnSearch passBtn" @click="chooseDeployApply(deployType);deployApply(deployData)">
              <img style="width: 12px;height: 12px" src="../../assets/images/carJudged/sub-icon.png" alt=""> 提交
            </div>
          </div>
        </div>
      </div>
      <div class="contentRight content">
        <div id="mapContent"></div>
        <img class="dingwei" src="../../assets/case/quickPos.png" @click="loadMap();initPoint();" />
        <div class="point">
          <span>经度：{{point.lng}}</span><br>
          <span>纬度：{{point.lat}}</span>
        </div>
      </div>
      <el-dialog
        title="布控申请"
        :visible.sync="dialogVisible"
        width="20%"
      >
        <span>提交成功</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="width: 60px;height: 30px">取 消</el-button>
          <el-button type="primary" style="width: 60px;height: 30px" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
            check-on-click-node
            ref="tree"
            highlight-current
            @check='getCheckedNodes'
            :filter-node-method="filterNode"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>
      <div class="calDialog">
        <casDialog vehicleKind="noKind" :showFirst="showFirst" :showSecond="showSecond" :carBrand="vehicleBrand" :carModel="vehicleModel" @passToParent="getChildData" :icoclick="icoclick" @changeicoclick='changeicoclick'></casDialog>
      </div>
    </div>
    <div class="err" v-show="tipsFlag"></div>
    <div class="err" v-if="Err.plateNo.flag" :style="{top: Err.plateNo.top}">{{Err.plateNo.txt}}</div>
  </div>

</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  import searchDetail from './searchDetail'
  import casDialog from './casDialog'
  import footerThird from '../../components/footer_third'

  export default {
    components: {
      searchDetail, casDialog, footerThird
    },
    beforeCreate() {
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1,                 //月份
          "d+": this.getDate(),                    //日
          "h+": this.getHours(),                   //小时
          "m+": this.getMinutes(),                 //分
          "s+": this.getSeconds(),                 //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    },
    mounted: function () {
      this.getCheckedItem(["plateNo"]);
      let _this = this
      _this.changeDeplopItem(10);
      _this.getCarType();
      _this.getUserList();
      _this.clearTxt();
      _this.getTreeData(); //初始化得到所有卡口的信息,并在地图展示
      _this.getLocalCoordinate();
      _this.loadMap();

      let plateNo = this.$router.history.current.query.plateNo;
      if(plateNo){
        this.platNumArr.push(plateNo);
      }

      let beginTime1 = laydate.render({
        elem: '#dateBegin1',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.beginDateTime1 = value;
          _this.endDateTime1 = new Date(new Date(value).getTime()+ 7*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
          endTime1.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
      let endTime1 = laydate.render({
        elem: '#dateEnd1',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.endDateTime1 = value;
          beginTime1.config.max={
            year:date.year,
            month:date.month-1,//关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          }
        }
      });

      let beginTime2 = laydate.render({
        elem: '#dateBegin2',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.beginDateTime2 = value;
          _this.endDateTime2 = new Date(new Date(value).getTime()+ 7*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
          endTime2.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
      let endTime2 = laydate.render({
        elem: '#dateEnd2',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.endDateTime2 = value;
          beginTime2.config.max={
            year:date.year,
            month:date.month-1,//关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          }
        }
      });

      let beginTime3 = laydate.render({
        elem: '#dateBegin3',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.beginDateTime3 = value;
          _this.endDateTime3 = new Date(new Date(value).getTime()+ 7*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
          endTime3.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
      let endTime3 = laydate.render({
        elem: '#dateEnd3',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.endDateTime3 = value;
          beginTime3.config.max={
            year:date.year,
            month:date.month-1,//关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          }
        }
      });

      let beginTime4 = laydate.render({
        elem: '#dateBegin4',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.beginDateTime4 = value;
          _this.endDateTime4 = new Date(new Date(value).getTime()+ 7*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
          endTime4.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
      });
      let endTime4 = laydate.render({
        elem: '#dateEnd4',
        type: 'datetime',
        min: 0,
        btns: ['now','confirm'],
        done: function(value, date, endDate){
          _this.endDateTime4 = value;
          beginTime4.config.max={
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
    data() {
      return {
        veticlType:'1',
        carplate:sessionStorage.getItem("provinceShort"),
        deployApplyBtn: this.$storage.getSession("317")!=null?true:false,
        loading: null,
        tipsFlag:false,
        map: null,//地图对象
        drawingManager: null,
        overlays: [],
        treeList: null,
        filterText: '',
        isBar: false,
        tollgateIdsArr: [],  //总体选中的卡口列表
        tollgateIds: null,
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表
        defaultProps: {
          children: "apeTollgates",
          label: "name"
        },
        i: 0,
        // 左侧遮罩
        contentLeft:false,

        radio1: "0",
        radio2: "0",
        radio3: "0",
        radio4: "0",
        reason1: '',
        reason2: '',
        reason3: '',
        reason4: '',
        defaultProvice: sessionStorage.getItem("provinceShort"),
        province: ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
          '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台'],
        platNumArr: [],
        plateNumberVal: '',
        userNameArr: [],
        userList: [],
        personList1: [],
        personList2: [],
        personList3: [],
        personList4: [],
        personId1: [],
        personId2: [],
        personId3: [],
        personId4: [],
        userNameLike: '',
        longitude: 116.404,
        latitude: 39.915,
        imgsrc: '',
        showFirst: false,
        showSecond: false,
        beginDateTime1: (this.getCurrentDate()),
        endDateTime1: (this.nextWeek()),
        beginDateTime2: (this.getCurrentDate()),
        endDateTime2: (this.nextWeek()),
        beginDateTime3: (this.getCurrentDate()),
        endDateTime3: (this.nextWeek()),
        beginDateTime4: (this.getCurrentDate()),
        endDateTime4: (this.nextWeek()),
        vehicleBrand: "不限",  //车辆品牌
        vehicleModel: "不限",  //车辆型号
        vehicleModelCode: null,
        vehicleBrandCode: null,
        deployType: "10",
        dialogVisible: false,
        reData: 0,
        deployData: {},
        carTypeList: [],
        restaurants: [],
        state1: '',
        state2: '',
        state3: '',
        state4: '',
        plate: false,
        icoclick:false
      }
    },
    mixins: [vehicle, mapFun],
    computed: {
      newpoints() {
        let arr = [];
        if (this.treeList !== null && this.treeList.length !== 0) {
          for (let i = 0; i < this.treeList.length; i++) {
            let apeToll = this.treeList[i].apeTollgates;
            if (apeToll.length > 0) {
              for (let j = 0; j < apeToll.length; j++) {
                arr.push({
                  kakouId: apeToll[j].kakouId,
                  longitude: apeToll[j].longitude,
                  latitude: apeToll[j].latitude,
                  place: apeToll[j].place,//点位区域
                  name: apeToll[j].name,//街道名称
                });
              }
            }
          }
        }
        return arr;
      },
      passTollgateIds() {
        if(this.tollgateIds!=null){
          return this.tollgateIds.replace(/,/g,";")
        }else {
          return ''
        }
      }
    },
    methods: {

      //获取提示元素的top值,赋给提示条
        getElTop(elName,tipTxt){
          let targetEl = document.getElementsByClassName(elName)[0];
           let header=document.getElementsByClassName('wrapper')
           let headerTop=$(header).offset().top
           let topValue= ($(targetEl).offset().top)+'px'
           this.tipsFlag=true;
           document.getElementsByClassName('err')[0].innerHTML=tipTxt
           document.getElementsByClassName('err')[0].style.top=topValue
          setTimeout( () =>{
            this.tipsFlag=false;
          },1000)
        },

      //布控申请
      deployApply(data) {
        let _this = this;
        if(this.tollgateIds ==null || this.tollgateIds ==''){
              this.$myconfirm({
              type: '提示',
              msg: '未选择卡口，是否全程布控',
              icon: 4,
              btn: {
                ok: '确定',
                no: '取消'
              }
            }).then(() => {
            _this.deployApplyPost(data);

            })
            .catch(() => {
              console.log('no')
            })
        //   layer.open({
        //   content: '未选择卡口，是否全程布控?'
        //   ,icon: 7
        //   ,btn: ['确定', '取消']
        //   ,yes: function(index, layero){
        //     //按钮【按钮一】的回调
        //       _this.deployApplyPost(data);
        //       layer.close(index);
        //   }
        //   ,btn2: function(index, layero){
        //     //按钮【按钮二】的回调
        //     //return false 开启该代码可禁止点击该按钮关闭
        //   }
        // });
          // this.$confirm('未选择卡口，是否全程布控?', '消息提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   this.deployApplyPost(data);
          // }).catch(() => {
          //   return false;
          // });
        }else{
          this.deployApplyPost(data);
        }
      },
      deployApplyPost(data){
        //提交时根据不同布控类型验证表单
        if (this.deployType == 10) {
          if (this.platNumArr.length === 0) {
            $('.searchCondition').scrollTop(0)
            this.getElTop('err-plateNum','请填写车牌号！');
            return;
          }

          if (this.reason1.trim() == "") {
            let parentOffSet=$(".searchCondition").prop('scrollHeight')- $('.searchCondition').outerHeight()
            $('.searchCondition').scrollTop(parentOffSet)
            this.getElTop(' err-reason1','请填写布控原因！')
            return;
          }

          if (this.userNameArr.length == 0) {
            let parentOffSet=$(".searchCondition").prop('scrollHeight')- $('.searchCondition').outerHeight()
            $('.searchCondition').scrollTop(parentOffSet)
            this.getElTop('err-receivePerson1','请选择接收人！')
            return;
          }
          if (this.userNameArr.length > 30) {
            let parentOffSet=$(".searchCondition").prop('scrollHeight')- $('.searchCondition').outerHeight()
            $('.searchCondition').scrollTop(parentOffSet)
            this.getElTop('err-receivePerson1','人数个数小于30！')
            return;
          }
        }

        if (this.deployType == 20) {

          if (this.reason2.trim() == "") {
            let parentOffSet=$(".searchCondition").prop('scrollHeight')- $('.searchCondition').outerHeight()
            $('.searchCondition').scrollTop(parentOffSet)
            this.getElTop('err-reason2','请填写布控原因！')
            return;
          }
          if (this.userNameArr.length === 0) {
            let parentOffSet=$(".searchCondition").prop('scrollHeight')- $('.searchCondition').outerHeight()
            $('.searchCondition').scrollTop(parentOffSet)
            this.getElTop('err-receivePerson2','请选择接收人！')
            return;
          }
        }

        if (this.deployType == 30) {
          // if (this.vehicleBrandCode == null) {
          //   $('.searchCondition').scrollTop(0)
          //   this.getElTop('err-vehicleBrand','请选择车辆品牌！')
          //   return;
          // }
          // if (this.vehicleModelCode.length == 0) {
          //   $('.searchCondition').scrollTop(0)
          //   this.getElTop('err-vehicleModel','请选择车辆型号！')
          //   return;
          // }
          if (this.vehicleBrandCode == null&&this.vehicleModelCode==null) {
            $('.searchCondition').scrollTop(0)
            this.getElTop('err-vehicleBrand','车辆品牌与型号至少选一项！')
            return;
          }
          if(this.vehicleModel.split(',').length>10){
              $('.searchCondition').scrollTop(0)
            this.getElTop('err-vehicleModel','车辆型号最多选10个！')
            return;
          }
          if (this.reason3.trim() == "") {
            let parentOffSet=$(".searchCondition").prop('scrollHeight')- $('.searchCondition').outerHeight()
            $('.searchCondition').scrollTop(parentOffSet)
            this.getElTop('err-reason3','请填写布控原因！')
            return;
          }
          if (this.userNameArr.length === 0) {
            let parentOffSet=$(".searchCondition").prop('scrollHeight')- $('.searchCondition').outerHeight()
            $('.searchCondition').scrollTop(parentOffSet)
            this.getElTop('err-receivePerson3','请选择接收人！')
            return;
          }
        }

        if (this.deployType == 40) {

          if (this.reason3.trim() == "") {
            return;
          }
        }

        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        let param = this.$qs.stringify(data);
        this.$http({
          url: 'tvas/disposition/applyDisposition',
          // url: 'tvas/disposition/applyDisposition',
          method: 'post',
          data: param
        }).then((res) => {
          this.loading.close();
          if(res.data.code == 200){
            //this.$alert('申请成功','消息提示');
               this.$notify({
                        type: 'success',
                        message: '申请成功！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('申请成功！',{icon:6,title:"消息提示"});
            this.reset();
            this.$router.push({path:"/carJudged/deployManage",query:{menuCode: '318',typeCode: "tab2" }});  //跳转到我的布控
          }else{
            //this.$alert('申请失败','消息提示');
             this.$notify({
                        type: 'error',
                        message: '申请失败！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('申请失败！',{icon:5,title:"消息提示"});
            return ;
          }
        });
      },
      //获取车辆类别
      getCarType() {
        this.$http({
          url: 'sms/static/getVehicleKind',
          method: 'get',
        }).then((res) => {
          this.carTypeList = res.data.data
        })
      },
//不同类型的提交参数
      chooseDeployApply(value) {
        let receiveMobile = ''
        let arr = []
        console.log(this.userNameArr,9999);
        for (let i = 0; i < this.userList.length; i++) {
          for (let j = 0; j < this.userNameArr.length; j++) {
            if(this.userList[i].userId == this.userNameArr[j]){
              arr.push(this.userList[i].phone)
            }
          }
        }
        receiveMobile = arr.join(';')
        let vehicleKineText = ''
        this.carTypeList.map((item,index)=>{
            if(this.veticlType==item.field){
              vehicleKineText=item.value
            }
        })
        let _this = this;

        let plateData = {
            dispositionMode: this.deployType,
            plateNo:_this.platNumArr.join(";"),  //输入框里面的值
            beginTime: _this.beginDateTime1,
            endTime: _this.endDateTime1,
            receiveMode: _this.radio1,
            reason: _this.reason1,
            receivePerson: _this.userNameArr.join(";"),//_this.personId1.join(";"),
            kakouids:this.passTollgateIds,
            receiveMobile:receiveMobile
          },
          categoryData = {
            dispositionMode: this.deployType,
            vehicleKine: vehicleKineText,
            vehicleKineCode: _this.veticlType.value,
            beginTime: _this.beginDateTime2,
            endTime: _this.endDateTime2,
            receiveMode: _this.radio2,
            reason: _this.reason2,
            receivePerson: _this.userNameArr.join(";"),//_this.personId2.join(";"),
            kakouids:this.passTollgateIds,
             receiveMobile:receiveMobile
          },
          typedDta = {
            dispositionMode: this.deployType,
            vehicleBrand: this.vehicleBrand=='不限'?'':this.vehicleBrand,
            vehicleBrandCode: this.vehicleBrandCode==null?'':this.vehicleBrandCode,
            vehicleModel: this.vehicleModel,
            // vehicleModelCode: this.vehicleModelCode,
            // vehicleBrand: this.vehicleBrandCode,
            vehicleModelCode: this.vehicleModelCode,
            beginTime: _this.beginDateTime3,
            endTime: _this.endDateTime3,
            receiveMode: _this.radio3,
            reason: _this.reason3,
            receivePerson: _this.userNameArr.join(";"),//_this.personId3.join(";"),
            kakouids:this.passTollgateIds,
             receiveMobile:receiveMobile
          },
          fakeData = {
            dispositionMode: this.deployType,
            beginTime: _this.beginDateTime4,
            endTime: _this.endDateTime4,
            receiveMode: _this.radio4,
            reason: _this.reason4,
            receivePerson: _this.userNameArr.join(";"),//_this.personId4.join(";"),
            kakouids:this.passTollgateIds,
            receiveMobile:receiveMobile
          }
        switch (Number(value)) {
          case 10 :
            _this.deployData = plateData
            break;
          case 20 :
            _this.deployData = categoryData
            break;
          case 30 :
            _this.deployData = typedDta
            break;
          case 40 :
            _this.deployData = fakeData
            break;
        }
      },

//获取用户列表
      getUserList() {
        this.$http({
          url: 'sms/usercore/getAllUser',
          method: 'post',
        }).then((res) => {
          this.userList = res.data.data
        })
      },
      //过滤接收人
      querySearch(queryString, cb) {
        var restaurants = this.userList.map(a => {
          return {value: a.trueName, phone: +a.phone, userId: a.userId}
        });
        var results = queryString ? restaurants.filter(v => v.value && v.value.indexOf(queryString) === 0) : restaurants
        cb(results);
      },
      //添加用户
      handleSelect(item) {
        switch (Number(this.deployType)) {
          case 10:
            this.personList1.push(item);
            this.personList1 =  this.uniqObjArr(this.personList1,"userId");
            this.personId1.push(item.userId);
            this.personId1 =  this.uniq(this.personId1);
            this.userNameArr = this.personList1;
            break;
          case 20:
            this.personList2.push(item);
            this.personList2 =  this.uniqObjArr(this.personList2,"userId");
            this.personId2.push(item.userId);
            this.personId2 =  this.uniq(this.personId2);
            this.userNameArr = this.personList2;
            break;
          case 30:
            this.personList3.push(item);
            this.personList3 =  this.uniqObjArr(this.personList3,"userId");
            this.personId3.push(item.userId);
            this.personId3 =  this.uniq(this.personId3);
            this.userNameArr = this.personList3;
            break;
          case 40:
            this.personList4.push(item);
            this.personList4 =  this.uniqObjArr(this.personList4,"userId");
            this.personId4.push(item.userId);
            this.personId4 =  this.uniq(this.personId4);
            this.userNameArr = this.personList4;
            break;
        }
      },
      //删除用户
      removeUser(item, index) {
        this.userNameArr.splice(index, 1);
        switch (Number(this.deployType)) {
          case 10:
            this.personId1.splice(index, 1);
            break;
          case 20:
            this.personId2.splice(index, 1);
            break;
          case 30:
            this.personId3.splice(index, 1);
            break;
          case 40:
            this.personId4.splice(index, 1);
            break;
        }
      },

      //最近7天
      nextWeek() {
        let date = new Date().getTime() + 3600 * 1000 * 24 * 7;
        let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
        let reg = new RegExp('"', "g");
        let nextWeekTime = newDate.replace(reg, "")
        return nextWeekTime
      },
      clearModel(){
        this.vehicleModel='不限'
        this.vehicleModelCode=null
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
      getChildData(data1, data2, data3, data4, data5) {
        this.vehicleBrand = data1;
        this.vehicleModel = data2;
        this.vehicleModelCode = data3;
        this.showSecond = data4;
        this.vehicleBrandCode = data5;
      },
      changeTime() {
        this.timeFlag = !this.timeFlag
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
      //添加车牌号
      addPlateNum() {
        let selectValue = this.$refs.selectValue.value;
        let inputValue = this.$refs.plateNo.value.trim();

        if(!inputValue){
          this.checkPlateNo();   //必填
          return false;
        }
        //let xreg = /^[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;   //精确车牌尾号

        //let creg = /^[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;  //精确车牌尾号 (新能源)
        // if (inputValue.length < 6){
        //   this.checkItem("plateNo", "请正确输入精确车牌号码！");
        //   let _this = this;
        //   setTimeout(function(){
        //     _this.clearCheck("plateNo");
        //   }, 1000);
        //   return
        // }


        // let xxreg = /^[A-Z]{1}([A-Z0-9]{5}[挂学警港澳]{0,1}|[A-Z0-9]{6})$/;   //精确车牌
        if(inputValue.length != 6 && inputValue.indexOf('*') == -1 && inputValue.length < 6){
            this.checkItem("plateNo", "请正确输入车牌号码！");
            setTimeout(()=> {
                this.clearCheck("plateNo");
            }, 1000);
            return;
        }
        let xxreg = /^(([A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/

        // A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$
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
        //this.$refs.selectValue.value = this.defaultProvice;
        this.carplate = this.defaultProvice;
        this.$refs.plateNo.value = "";
        this.checkPlateNo();
      },
      //删除车牌号
      removeNum(item, index) {
        this.platNumArr.splice(index, 1);
        this.checkPlateNo();
      },

      //清空输入框
      clearTxt() {
        let leIcon = document.getElementsByClassName('el-icon-circle-close')
        for (let i = 0; i < leIcon.length; i++) {
          leIcon[i].onclick = function () {
            this.previousElementSibling.value = '';
          }
        }
      },

      changeDeplopItem (item) {
        this.personList1 = [];
        this.personList2 = [];
        this.personList3 = [];
        this.personList4 = [];
        this.userNameArr = [];
        this.state1 = '',
          this.state2 = '',
          this.state3 = '',
          this.state4 = ''
         this.tollgateIds=''
        var tabs = ["deployTypeItem1", "deployTypeItem2", "deployTypeItem3", "deployTypeItem4"];
        for (let i = 1; i < 5; i++) {
          if (i * 10 == item) {
            document.getElementById(tabs[i - 1]).style.display = "block";
          } else {
            document.getElementById(tabs[i - 1]).style.display = "none";
          }
        }
      },
//重置
      reset() {
        if (this.deployType == "10") {
          this.carplate = '京';
          //this.plateNumberVal = '';
          this.platNumArr = [];
          this.beginDateTime1 = (this.getCurrentDate())
          this.endDateTime1 = (this.nextWeek())
          this.radio1 = "0"
          this.state1 = ''
          this.personList1 = []
          this.userNameArr = []
          this.reason1 = ''
          this.tollgateIds=''
          return
        }
        else if (this.deployType == "20") {
          this.veticlType = '1'
          this.beginDateTime2 = (this.getCurrentDate())
          this.endDateTime2= (this.nextWeek())
          this.radio2 = "0"
          this.state2 = ''
          this.personList2 = []
          this.userNameArr = []
          this.reason2 = ''
          this.tollgateIds=''
          return
        }
        else if (this.deployType == "30") {
          this.vehicleBrand=''
          this.vehicleModel=''
          this.vehicleModelCode= "",
          this.vehicleBrandCode= null
          this.beginDateTime3= (this.getCurrentDate())
          this.endDateTime3= (this.nextWeek())
          this.radio3 = "0"
          this.state3 = ''
          this.personList3 = []
          this.userNameArr = []
          this.reason3 = ''
          this.tollgateIds=''
          return
        }
        else if (this.deployType == 40) {
          this.beginDateTime4= (this.getCurrentDate())
          this.endDateTime4= (this.nextWeek())
          this.radio4 = "0"
          this.state4 = ''
          this.personList4 = []
          this.userNameArr = []
          this.reason4 = ''
          this.tollgateIds=''
          return
        }
      }
    },


    watch: {
      // plateNumberVal: function () {
      //   this.plateNumberVal = this.plateNumberVal.replace(/[\W]/g, '');
      // },
      //地图操作中菜单选项里关键字进行过滤
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      vehicleBrand(newVal,oldVal){
      if(newVal!='不限'){//保证点击icon清空品牌框引发的从子组件传回的值不会把之前的车型框选的清空
        this.vehicleModel='不限'
        this.vehicleModelCode=null
      }
    },
    vehicleModel(newVal,oldVal){
      if(newVal){
        if(newVal.split(',').length>10){
            $('.searchCondition').scrollTop(0)
            this.getElTop('err-vehicleModel','车辆型号最多选10个！')
        }
      }
    }
    },
    beforeDestroy() {
      document.querySelector('body').removeEventListener('click', this.closeDialog);
      document.querySelector('body').addEventListener('click', this.closeBar);
    }
  }


</script>


<style scoped>
  @import "../../assets/css/carJudged_thirdone.css";
  @import url('../../assets/css/commom.css');
  .userSelect /deep/ .el-input__inner {
    height: 0.32rem;
    line-height:0.32rem;
  }


  .toggle_plate{
    color: red;
    margin-left: 1.4rem;
  }
  .userSelect {
    float: left;
    width: 2.68rem;
  }
  .userSelect .el-autocomplete{
    width: 100%;
  }
  .userNameList{
    clear:both;
    margin-left: 0.98rem;
    margin-top: 0.1rem;
    overflow: hidden;
  }
  .userNameList .closeCarPlate{
    top: 0.08rem;
    right: 0.25rem;
  }
  .searchCondition li span.userPhone{
    display: inline-block;
    box-sizing: border-box;
    width:2.68rem;
    padding: 0 0.15rem;
    height: 0.3rem;
    margin: 0.1rem 0  0.04rem;
    background-color: #E0EEFB;
    color: #606266;
    text-align: left;
    line-height: 0.3rem;
    border-radius: 0.05rem;
  }
  .searchCondition li .receivePerson{
    width:2.5rem;
  }
  .searchCondition li .receivePerson >>> .el-select__tags .el-tag{
    background-color: #163251;
    font-size:0.14rem;
    color: #99c9fa;
    margin: 2px 0 2px 2px;
    max-width: 2.2rem;
    box-sizing: border-box
  }
  .searchCondition li .receivePerson >>> .el-select__tags .el-tag .el-select__tags-text{
    display: inline-block;
     max-width: 1.8rem;
     margin-right:0.2rem;
     box-sizing: border-box;
     overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis
  }
 .searchCondition li .receivePerson >>> .el-input__icon{
   width:16px;
 }
  .searchCondition li .receivePerson >>> .el-select__tags .el-tag--small{
    padding:0 2px 0 2px;
    position:relative
  }
  .searchCondition li .receivePerson >>> .el-select__tags .el-select__input{
    border:none !important
  }
  .searchCondition li .receivePerson >>> .el-tag__close.el-icon-close{
    display: inline-block;
    background-color: #909399;
    right:0;
    top:4px
  }
  .searchCondition li .receivePerson >>> .el-tag__close{
    position:absolute;
    top:0
  }
  .searchCondition li .receivePerson >>> .el-input__inner{
    border-radius:0;
    border:1px solid #E6E8ED;
    padding: 0 0.05rem;
    min-height:0.32rem;
    line-height:0.32rem !important;
  }
  .searchCondition li .receivePerson >>> .el-input__inner::-webkit-input-placeholder{
    color:#606266;
    font-size:0.14rem;
  }
  .searchCondition li span.rp{
    padding-top:0.06rem;
  }
  .err{
    z-index: 10000;
  }
  .contraltype select{
      width: 2.2rem;
    height: 0.32rem;
    border: 1px solid #E6E8ED;
    padding-left: 0.05rem;
    font-size: 0.14rem;
    color:#606266;
  }
  .searchCondition .contraltype>>> .el-select  {
  width: 2.2rem;
  height: 0.32rem;
  font-size: 0.14rem;
  color:#99c9fa ;
}

.searchCondition .contraltype>>>.el-select .el-input__inner{
  height: 0.32rem;
  font-size: 0.14rem;
  padding-left:0.06rem;
  border-radius: 2px;

}
  .searchCondition .contraltype>>> .el-select  {
  width: 2.2rem;
  height: 0.32rem;
  font-size: 0.14rem;
  color:#99c9fa ;
}

.searchCondition .contraltype>>>.el-select .el-input__inner{
  height: 0.32rem;
  font-size: 0.14rem;
  padding-left:0.06rem;
  border-radius: 2px;

}
  .searchCondition .veticlType>>> .el-select  {
  width: 2.2rem;
  height: 0.32rem;
  font-size: 0.14rem;
  color:#99c9fa ;
}

.searchCondition .veticlType>>>.el-select .el-input__inner{
  height: 0.32rem;
  font-size: 0.14rem;
  padding-left:0.06rem;
  border-radius: 2px;

}

</style>

