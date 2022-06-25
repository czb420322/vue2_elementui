<template>
  <div class="wrapper">
    <div class="topInfo">
       <img src="../../assets/updataImg/location.png" alt="">
       <span class="sysname childname">当前位置：</span>
      <router-link tag="div" to="/carJudged?menuCode=300" class="sysname">车辆研判 ></router-link>
      <div class="sysname">&nbsp;以图搜车</div>
    </div>

    <div class="contentBody">

      <div class="contentLeft">
        <div class="contentHide" v-show="contentLeft"></div>
        <div class="clItem cli1">
          <div class="searchTitle"> 以图搜车</div>
          <ul class="searchCondition">
            <li class="conditionInput">
               <img src="../../assets/images/carJudged/search_item.png" alt="">
              车辆搜索条件</li>
            <li class="searchImg">
              <div id="searchImg">
                <img id="imgUrlShow" :src="imgUrlShow" alt="">
              </div>
              <p v-show="uploadBtn" @click="openUpload">上传图片</p>
            </li>
            <li v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14"><span>车辆类型：</span>
              <el-select type="text" ref="vehicleKind" v-model.trim="vehicleKind" @change="checkVehicleKind">
                <el-option :value="null" label="不限"></el-option>
                <el-option v-for="(item, index) in vehicleKindList" :value="item.field" :label="item.value" :key="index"></el-option>
              </el-select>
            </li>
            <li v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14">
              <span>车辆品牌：</span>
              <input type="text" ref="vehicleBrand" readonly  @click="getCarBrand" v-model.trim="vehicleBrandName" placeholder="请输入车辆品牌"><i class="el-icon-circle-close" @click="clearBand();refresh()"></i>
            </li>
            <li v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14">
              <span>车辆型号：</span>
              <input type="text" id="vModel" readonly value="" ref="vehicleModel" @click="getCarModule" v-model.trim="vehicleModel" placeholder="请输入车辆型号"><i class="el-icon-circle-close" @click="clear('vehicleModel')"></i>
            </li>
            <li v-show="this.isCarHead != 1 && this.isCarHead != 0">
              <span>车辆类型：</span>
              <el-select v-model="isCarHead" placeholder="请选择车辆类型">
                <el-option :value="14" label="不限"></el-option>
                <el-option :value="2" label="自行车"></el-option>
                <el-option :value="4" label="摩托车"></el-option>
                <el-option :value="8" label="三轮车"></el-option>
              </el-select>
            </li>
            <li v-show="this.isCarHead != 1 && this.isCarHead != 0">
              <div class="timeWrap" >
                <span><span class="bt">*</span>车辆时段：</span>
                <div class="carTime">
                  <input type="text" id="motorBegin" ref="motorBegin"  readonly v-model.trim="motorBeginTime" placeholder="请选择开始时间" >
                  <input type="text" id="motorEnd" ref="motorEnd" readonly v-model.trim="motorEndTime" placeholder="请选择结束时间">
                </div>
              </div>
            </li>
            <li v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14">
              <span>车牌号码：</span>
              <input type="text" ref="plateNumber" v-model.trim="plateNumber" value="不限" minlength="7" maxlength="8" @keyup.enter="checkPlateNumber" @blur="checkPlateNumber" placeholder="请输入车牌号码">
            </li>

            <!--<li class="plateItem">-->
              <!--<span><span class="bt">*</span>车牌号码：</span>-->
              <!--<select ref="selectValue">-->
                <!--<option v-for="(p,i) in province">{{p}}</option>-->
              <!--</select>-->
              <!--<input type="text" ref="plateNo" value="" placeholder="请输入车牌尾号">-->
              <!--<i class="el-icon-circle-close" @click="clear('plateNo')"></i><i class="el-icon-circle-plus"  @click="addPlateNum"></i>-->
              <!--<div class="platNumList">-->
                <!--<span class="wholeCarPlate grayPn">例:京**<i class="el-icon-circle-close closeCarPlate"></i></span>-->
                <!--<span class="wholeCarPlate" v-for="(item,index) in platNumArr">{{item}}-->
                  <!--<i class="el-icon-circle-close closeCarPlate" @click="removeNum(item,index)"></i>-->
                <!--</span>-->
              <!--</div>-->
            <!--</li>-->
            <li v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14">
              <div class="timeWrap" >
                <span><span class="bt">*</span>车辆时段：</span>
                <div class="carTime">
                  <input type="text" id="timeBegin" ref="beginDateTime"  readonly v-model.trim="beginDateTime" placeholder="请选择开始时间" @blur="checkBeginDateTime"><i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input type="text" id="timeEnd" ref="endDateTime" readonly v-model.trim="endDateTime" placeholder="请选择结束时间" @blur="checkEndDateTime"><i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
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
          <search-img-detail v-show="checked" :isCarHead="isCarHead" port="/tvas/image/queryVehicle/ByImage"  searchType="Image"  :searchParams="oldParams" :searchResultDefault="searchResultDefault"></search-img-detail>
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

    <div class="err" v-if="Err.vehicleKind.flag" :style="{top: Err.vehicleKind.top}">{{Err.vehicleKind.txt}}</div>
    <div class="err" v-if="Err.vehicleBrand.flag" :style="{top: Err.vehicleBrand.top}">{{Err.vehicleBrand.txt}}</div>
    <div class="err" v-if="Err.beginDateTime.flag" :style="{top: Err.beginDateTime.top}">{{Err.beginDateTime.txt}}</div>
    <div class="err" v-if="Err.endDateTime.flag" :style="{top: Err.endDateTime.top}">{{Err.endDateTime.txt}}</div>
    <div class="err" v-if="Err.plateNumber.flag" :style="{top: Err.plateNumber.top}">{{Err.plateNumber.txt}}</div>

    <div class="calDialog">
      <casDialog ref="casDialog" :vehicleKind="vehicleKind" :showFirst="showFirst" :showSecond="showSecond" :carBrand="vehicleBrand"
                 :carModel="vehicleModel" @passToParent="getChildData" :icoclick="icoclick" @changeicoclick='changeicoclick'></casDialog>
    </div>

    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="10.68rem"
      class="dialog">
      <div class="photoWrap">
        <div id="photoCvs" class="photo" @click="choiceCar($event)" @dblclick="openMarkCar($event)">
          <span class="smallT">|  图片源</span>
          <div class="showImg" id="imgBox" title="双击展示车辆图片并可手工标注" @mouseover="openMag($event);setMagMaskPos($event)" @mousemove="setMagMaskPos($event)"  @mouseout="closeMag($event)">
            <img id="imgItem" style="width: auto;height: 100%" :src="imgUrl"  />
            <canvas id="photoCanvas" class="showPhoto" width="0" height="0"></canvas>
            <span id="mask" class="mask"></span>
          </div>
          <div class="magnifier" id="Magnifier">
            <img id="magImg" :src="imgUrl">
            <canvas id="magCanvas" width="0" height="0"></canvas>
          </div>
          <el-upload
            class="uploadPhoto"
            action="vehicle/image/upload"
            name="uploadImage"
            ref="upload"
            :before-upload="beforeAvatarUpload">
            <el-button size="small" class="topBtn" icon="el-icon-picture-outline" type="primary">上传图片</el-button>
          </el-upload>
          <div class="desc"></div>
        </div>
        <div class="info">
          <div class="infoItem">
            <span class="smallT">|  车辆标识物</span>
            <div class="carItemInfo" v-show="this.isCarHead != 1">
              <el-checkbox-group v-model="checkList">
                <div class="carItem" v-for="(item,i) of checkedInfo[currentCar]" :key="i" v-if="item.count"><el-checkbox @change="drawCarInfo(currentCar)" :label="item.name"></el-checkbox><span>{{item.countTxt}}</span></div>
              </el-checkbox-group>
            </div>
          </div>
          <div class="infoItem">
            <span class="smallT">|  车辆信息</span>
            <div class="vinfolist">
              <p>识别置信度：<span>{{this.predictValue?(Number(this.predictValue)*100).toFixed(2)+'%':this.predictValue}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆颜色：<span>{{this.vehicleColor == '@'?'未识别':this.vehicleColor}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆类型：<span>{{this.vehicleKindTxt == '@'?'未识别':this.vehicleKindTxt}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆品牌：<span>{{this.vehicleBrandTxt == '@'?'未识别':this.vehicleBrandTxt}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆型号：<span>{{this.vehicleModelTxt == '@'?'未识别':this.vehicleModelTxt}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车牌类别：<span>{{this.plateClass == '@'?'未识别':this.plateClass}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车牌颜色：<span>{{this.plateColor == '@'?'未识别':this.plateColor}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车牌号码：<span>{{this.plateNumberTxt == '@'?'未识别':this.plateNumberTxt}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 0">车辆类型：<span>{{this.vehicleModelTxt == '@'?'未识别':this.vehicleModelTxt}}</span></p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancleBtn" @click="cancel">取 消</el-button>
        <el-button class="passBtn"  @click="caveCanvas">确 定</el-button>
      </span>
    </el-dialog>

    <div class="markCarDialog"  v-show="markCarVisible">
      <span @click="closeMarkCar" class="close el-icon-close"></span>
      <div class="title">车辆展示</div>
      <div class="markCarContent">
        <div id="markCar" class="markCar">
          <img id="markCarImg" :src="imgUrl">
          <canvas id="markCarCanvas" width="0" height="0"></canvas>
        </div>
        <!--<div class="markCarInfo">-->
          <!--<div class="infoItem">-->
            <!--<span class="smallT">|  车辆标识物</span>-->
            <!--<div class="carItemInfo">-->
              <!--<el-checkbox-group v-model="checkList">-->
                <!--<div class="carItem" v-for="item of checkedInfo[currentCar]" v-if="item.count"><el-checkbox @change="drawCarInfo(currentCar)" :label="item.name"></el-checkbox><span>{{item.countTxt}}</span></div>-->
              <!--</el-checkbox-group>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="el_btn">-->

          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="markCarFooter">
        <el-button class="cancleBtn" type="default" @click="closeMarkCar">关闭</el-button>
        <el-button class="tryBtn" icon="el-icon-setting" type="success" @click="getCoord" :disabled="allowCoord">手工标注</el-button>
        <el-button class="delBtn" icon="el-icon-delete" type="warning" @click="clearCoord">清空手工标注</el-button>
        <el-button class="searchBtn" icon="el-icon-tickets" type="primary" @click="saveCoord">确定标注</el-button>
      </div>
    </div>


  </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  import searchImgDetail from './searchImgDetail'
  import footerThird from '../../components/footer_third'
  import casDialog from './casDialog'
  export default {
    components: {
      searchImgDetail,footerThird, casDialog
    },

    data() {
      return {
        uploadBtn: this.$storage.getSession("348")!=null?true:false,
        searchBtn:this.$storage.getSession("305")!=null?true:false,
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
        defaultTollgate: [], //默认的全部卡口ID
        vehicleKindList:[],
        showFirst:false,
        showSecond: false,
        dialogVisible: false,
        markCarVisible:false,
        markCarUnit:1,
        isMouseDownDoing: false,
        doMouseDownTimmer:null,
        allowCoord: false,
        domTop:0,
        domLeft: 0,
        one:0,
        two:0,
        three:0,
        four:0,
        rectList:[],
        unit: 1,  //图片宽度适应比例尺
        imgUrl: "", // "./img/wKhm2Fr4_ceAV6LAAADQACYmXwk256.jpg",
        imgUrlShow: "",
        imgUrlShows: "",
        imgData: {
          code: "",
          message: "",
          data: []
        },
        oldCar: null,
        currentCar: null,
        imageWidth: 0,
        imageHeight: 0,
        uploadloading: null,
        // 左侧遮罩
        contentLeft:false,

        checked: false,
        arrawSwitch: false,  //默认不显示蓝色小箭头
        loading: null,
        carInfoList: ["驾乘人员","检测面部","系安全带","打开遮阳板","车辆年检标","车辆挂饰","纸巾盒数量","传经筒数量","打电话人","抽烟人","车辆天窗","行李架"],
        checkList:[],

        vehicleKind: null,     //车辆类型
        vehicleKindName: "不限",
        vehicleBrand: null,  //车辆品牌
        vehicleBrandCode: null,
        vehicleBrandName: "不限",

        vehicleKindTxt: null,
        vehicleBrandTxt: null,
        predictValue: null,
        vehicleModel: "不限",  //车辆型号
        vehicleModelTxt: null,
        vehicleModelCode: null,
        vehicleColor: null,
        plateClass: null,
        plateNumber: null,
        plateNumberTxt:null,
        plateColor: null,
        isCarHead: 1,
        beginDateTime: this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00", //过车时段开始日期时间
        endDateTime: (this.getCurrentDate().split(' ')[0] + " " + "23:59:59"),      //过车时段结束日期时间
        motorBeginTime:this.getDateString(new Date().getTime() - 24*60*60*1000).split(' ')[0] + " " + "00:00:00",
        motorEndTime:(this.getCurrentDate().split(' ')[0] + " " + "00:00:00"),
        tollgateIds: null,
        pageNo: 1,
        pageSize:10,
        orderBy: "pass_time",
        orderType: "desc",
        tollgateIdsArr:[],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表

        vehicleFeature: null,

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
        oldParams:{},
        icoclick:false,
        uploadcount:0,
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
        vehicleKind(newValue,oldValue){
        if(newValue!=null){
          this.getVehicleKindName()
        }else{
          this.vehicleKindName='不限'
        }

      },
      vehicleBrandName(newVal,oldVal){
     if(newVal!='不限'){//保证点击icon清空品牌框引发的从子组件传回的值不会把之前的车型框选的清空
        // console.log(oldVal)
        this.vehicleModel='不限'
        this.vehicleModelCode=null
      }
    },
    uploadcount(newVal,oldVal){
      if(newVal){
         this.vehicleModel = this.imgData.data[this.currentCar].vehicleModel;
        this.vehicleModelCode = this.imgData.data[this.currentCar].vehicleModelCode;
      }
    }
      // imgUrl(val){
      //   let magImg = document.getElementById("magImg");
      //   magImg.style.left = 0;
      //   magImg.style.top = 0;
      // }
    },
    computed:{
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

      //车辆识别信息
      checkedInfo () {
        let carArr = [];
        if(this.imgData && this.imgData.data && this.imgData.data.length){
          let imgList = this.imgData.data;
          if(imgList.length){
            let infoArr;
            for(let i=0;i<imgList.length;i++){
              infoArr = [
                {
                  "field": "markDriverList",
                  "name": "驾乘人员",
                  "count": imgList[i].markDriverList.length,
                  "countTxt": imgList[i].markDriverList.length?imgList[i].markDriverList.length + "人": "未识别"
                },
                {
                  "field": "markFaceList",
                  "name": "检测面部",
                  "count": imgList[i].markFaceList.length,
                  "countTxt": imgList[i].markFaceList.length?imgList[i].markFaceList.length + "人": "未识别"
                },
                {
                  "field": "markBeltList",
                  "name": "系安全带",
                  "count": imgList[i].markBeltList.length,
                  "countTxt": imgList[i].markBeltList.length?imgList[i].markBeltList.length + "人": "未识别"
                },
                {
                  "field": "markSunshieldList",
                  "name": "打开遮阳板",
                  "count": imgList[i].markSunshieldList.length,
                  "countTxt": imgList[i].markSunshieldList.length? imgList[i].markSunshieldList.length +"个": "未识别"
                },
                {
                  "field": "markTagList",
                  "name": "车辆年检标",
                  "count": imgList[i].markTagList.length,
                  "countTxt": imgList[i].markTagList.length?imgList[i].markTagList.length +"个": "未识别"
                },
                {
                  "field": "markDecoratioList",
                  "name": "车辆挂饰",
                  "count": imgList[i].markDecoratioList.length,
                  "countTxt": imgList[i].markDecoratioList.length?imgList[i].markDecoratioList.length + "个": "未识别"
                },
                {
                  "field": "markNapkinboxList",
                  "name": "纸巾盒数量",
                  "count": imgList[i].markNapkinboxList.length,
                  "countTxt": imgList[i].markNapkinboxList.length?imgList[i].markNapkinboxList.length+ "个":"未识别"
                },
                {
                  "field": "markZhuanjtList",
                  "name": "传经筒数量",
                  "count": imgList[i].markZhuanjtList.length,
                  "countTxt": imgList[i].markZhuanjtList.length?imgList[i].markZhuanjtList.length+ "个":"未识别"
                },
                {
                  "field": "markCallphoneList",
                  "name": "打电话人",
                  "count": imgList[i].markCallphoneList.length,
                  "countTxt": imgList[i].markCallphoneList.length?imgList[i].markCallphoneList.length+ "人":"未识别"
                },
                {
                  "field": "markSmokeList",
                  "name": "抽烟人",
                  "count": imgList[i].markSmokeList.length,
                  "countTxt": imgList[i].markSmokeList.length?imgList[i].markSmokeList.length+ "人":"未识别"
                },
                {
                  "field": "markSunroofList",
                  "name": "车辆天窗",
                  "count": imgList[i].markSunroofList.length,
                  "countTxt": imgList[i].markSunroofList.length?imgList[i].markSunroofList.length+ "个":"未识别"
                },
                {
                  "field": "markHolderList",
                  "name": "行李架",
                  "count": imgList[i].markHolderList.length,
                  "countTxt": imgList[i].markHolderList.length?imgList[i].markHolderList.length+ "个":"未识别"
                }
              ];
              carArr.push(infoArr);
            }
          }
        }
        return carArr;
      },

      //图片上所有车辆的位置坐标列表
      carList (){
        let cList = [];
        if(this.imgData.data.length){
          for(let i=0;i<this.imgData.data.length;i++){
            cList.push({
              leftTopX: this.imgData.data[i].vehiclePos.leftTopX,
              leftTopY: this.imgData.data[i].vehiclePos.leftTopY,
              rightBtmX: this.imgData.data[i].vehiclePos.rightBtmX,
              rightBtmY: this.imgData.data[i].vehiclePos.rightBtmY
            });
          }
        }
        return cList;
      },

      //被选中勾选的识别信息名称,默认选中车辆位置
      checkFieldList (){
        let arr = ["vehiclePos"];
        for(let i =0;i<this.checkList.length;i++){
          switch (this.checkList[i]){
            case "驾乘人员":
              arr.push("markDriverList");
              break;
            case "检测面部":
              arr.push("markFaceList");
              break;
            case "系安全带":
              arr.push("markBeltList");
              break;
            case "打开遮阳板":
              arr.push("markSunshieldList");
                break;
            case "车辆年检标":
              arr.push("markTagList");
              break;
            case "车辆挂饰":
              arr.push("markDecoratioList");
              break;
            case "纸巾盒数量":
              arr.push("markNapkinboxList");
              break;
            case "传经筒数量":
              arr.push("markZhuanjtList");
              break;
            case "打电话人":
              arr.push("markCallphoneList");
              break;
            case "抽烟人":
              arr.push("markSmokeList");
              break;
            case "车辆天窗":
              arr.push("markSunroofList");
              break;
            case "行李架":
              arr.push("markHolderList");
              break;
            case "":
            default:
              break;
          }
        }
        return arr;
      },
      searchParams (){
        return {
          vehicleKind: (this.isCarHead== 1 || this.isCarHead == 0) ?  this.vehicleKindName : '',
          vehicleKindCode:(this.isCarHead== 1 || this.isCarHead == 0) ?  this.$refs.vehicleKind.value : '' ,
          vehicleBrand: this.vehicleBrandName,
          vehicleBrandCode:  this.vehicleBrand,
          vehicleModel:this.vehicleModel,
          vehicleModelCode:this.vehicleModelCode,
          vehicleFeature: this.vehicleFeature,
          isCarHead: this.isCarHead,
          beginDateTime:(this.isCarHead == 0 || this.isCarHead == 1) ? this.beginDateTime : this.motorBeginTime,
          endDateTime:(this.isCarHead == 0 || this.isCarHead == 1) ? this.endDateTime : this.motorEndTime,
          tollgateIds: this.tollgateIds,
          pageNo: 1,
          pageSize: 10,
          orderBy: this.orderBy,
          orderType: this.orderType
        };
      }
    },
    mixins:[vehicle,mapFun],
    methods: {
      updateCheckedItem(){
        if(this.isCarHead === 0){
          this.getCheckedItem([{"name":"vehicleKind","checked":true},{"name":"vehicleBrand","checked":true},"beginDateTime", "endDateTime"]);
        }else{
          this.getCheckedItem([{"name":"vehicleKind","checked":false},{"name":"vehicleBrand","checked":false},"beginDateTime", "endDateTime"]);
        }
      },
        getVehicleKindName(){
      this.vehicleKindList.map((item,idx)=>{
            if(item.field==this.vehicleKind){
              this.vehicleKindName=item.value
            }
        })
      },
      clearBand(){
     this.vehicleBrandName = '不限';
      this.vehicleBrand=null

      },
      refresh(){
        this.icoclick=true
      },                    /* 保证在点击icon清空品牌框之后会重新请求一次车型*/
      changeicoclick(data){
        this.icoclick=data
      },
      //获取子组件的数据
      getChildData(data1, data2, data3,data4, data5) {
        this.vehicleBrandName = data1;
        this.vehicleModel = data2;
        this.vehicleModelCode = data3;
        this.showSecond = data4;
        this.vehicleBrand = data5;
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

      openUpload(){
        this.dialogVisible = true;
      },
      //框选车辆或车辆标识物
      drawCarInfo (pIndex){
        this.clearRect();
        this.drawAllCar();
        this.drawCar(pIndex,"red");
        //this.saveCarImg(this.imgData.data[pIndex]);
      },
      drawAllCar(){
        if(!this.imgData.data.length){
          return false;
        }
        // this.imgData.data[0].vehicleKind='未识别'
        // console.log( this.imgData.data)
        var allImgData = this.imgData.data

        for(let i=0;i<allImgData.length;i++){
        // if(allImgData[i].iscarhead==0||allImgData[i].iscarhead==1){
          // if((allImgData[i].vehicleKind!=='未识别'&&allImgData[i].vehicleKind!=='@'&&allImgData[i].vehicleKind!==null&&allImgData[i].vehicleKind!=="")&&(allImgData[i].vehicleBrand!=='未识别'&&allImgData[i].vehicleBrand!=='@'&&allImgData[i].vehicleBrand!==null&&allImgData[i].vehicleBrand!=="")){
               this.drawRect("root",allImgData[i].vehiclePos, "yellow");
          // }
        //  }else{
          //  if(allImgData[i].vehicleKind!=='未识别'&&allImgData[i].vehicleKind!=='@'&&allImgData[i].vehicleKind!==null&&allImgData[i].vehicleKind!==""){

            //  this.drawRect("root",allImgData[i].vehiclePos, "yellow");
          //  }
        //  }
        // }
      }
      },
      drawCar(pIndex,color){
        if(!this.imgData.data.length){
          return false;
        }
        //   var allImgData = this.imgData.data
        //   console.log(this.imgData.data[pIndex])
        //   if(allImgData[pIndex].iscarhead==0||allImgData[pIndex].iscarhead==1){
        //   if((allImgData[pIndex].vehicleKind=='未识别'||allImgData[pIndex].vehicleKind=='@'||allImgData[pIndex].vehicleKind==null||allImgData[pIndex].vehicleKind!=="")||(allImgData[pIndex].vehicleBrand!=='未识别'||allImgData[pIndex].vehicleBrand!=='@'||allImgData[pIndex].vehicleBrand!==null&&allImgData[pIndex].vehicleBrand!=="")){

        //        if(pIndex!=0&&pIndex!=(this.imgData.data.length-1)){
        //            drawCar(pIndex*1+1,color)
        //        }else{
        //          return false
        //        }
        //   }
        // }
        let parent = this.imgData.data[pIndex].vehiclePos;
        for(let k = 0;k<this.checkFieldList.length;k++){
          if(this.checkFieldList[k] === "vehiclePos"){
            this.drawRect("root",this.imgData.data[pIndex].vehiclePos,color);
          }else{
            let pos = this.imgData.data[pIndex][this.checkFieldList[k]];
            if(pos instanceof Array){
              if(pos.length > 0){
                for(let i=0;i<pos.length;i++){
                  this.drawRect(parent, pos[i],color);
                }
              }
            }else{
              this.drawRect(parent,pos,color);
            }
          }
        }
      },

      clearRect(){
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        pCtx.clearRect(0,0,photoCanvas.clientWidth, photoCanvas.clientWidth);

        if(document.getElementById("magCanvas")){
          let pCtx2 = document.getElementById("magCanvas").getContext("2d");
          pCtx2.clearRect(0,0,this.imageWidth, this.imageHeight);
        }

        if(document.getElementById("markCarCanvas")){
          let markCarCanvas = document.getElementById("markCarCanvas");
          let pCtx3 = markCarCanvas.getContext("2d");
          pCtx3.clearRect(0,0,markCarCanvas.width, markCarCanvas.height);
        }
      },

      //根据坐标和宽高画框
      drawRect (parent, pos,color){
        if(!pos){
          return;
        }
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        let x = pos.leftTopX / this.unit;
        let y = pos.leftTopY  / this.unit;
        let w = (pos.rightBtmX - pos.leftTopX) / this.unit;
        let h = (pos.rightBtmY - pos.leftTopY) / this.unit;
        if(parent !== "root"){
          x = x + parent.leftTopX / this.unit;
          y = y + parent.leftTopY / this.unit;
        }
        pCtx.strokeStyle = color;
        pCtx.strokeRect(x,y,w,h);

        let pCtx2 = document.getElementById("magCanvas").getContext("2d");
        let x2 = pos.leftTopX;
        let y2 = pos.leftTopY;
        let w2 = (pos.rightBtmX - pos.leftTopX);
        let h2 = (pos.rightBtmY - pos.leftTopY);
        if(parent !== "root"){
          x2 = x2 + parent.leftTopX;
          y2 = y2 + parent.leftTopY;
        }
        pCtx2.strokeStyle = color;
        pCtx2.strokeRect(x2,y2,w2,h2);

        let pCtx3 = document.getElementById("markCarCanvas").getContext("2d");

        let x3 = pos.leftTopX/this.markCarUnit;
        let y3 = pos.leftTopY/this.markCarUnit;
        let w3 = (pos.rightBtmX - pos.leftTopX)/this.markCarUnit;
        let h3 = (pos.rightBtmY - pos.leftTopY)/this.markCarUnit;
        if(parent !== "root"){
          x3 = x3 + parent.leftTopX/this.markCarUnit;
          y3 = y3 + parent.leftTopY/this.markCarUnit;
        }
        pCtx3.strokeStyle = color;
        pCtx3.strokeRect(x3,y3,w3,h3);

      },

      //点击图片中车辆选中
      choiceCar (ev){
        let imgItem = document.getElementById("imgItem");
        let offsetX = this.getPageMag(ev).pageX - $(imgItem).offset().left;
        let offsetY = this.getPageMag(ev).pageY - $(imgItem).offset().top;
        if(this.carList.length > 0 ){
          for(let i = 0;i<this.carList.length;i++){
            if( (this.carList[i].leftTopX / this.unit) < offsetX && (this.carList[i].rightBtmX / this.unit) > offsetX && (this.carList[i].leftTopY / this.unit) < offsetY && (this.carList[i].rightBtmY/ this.unit) > offsetY){
              this.currentCar = i;
            }
          }
        }else{
          return null;
        }
        if(this.currentCar !== null && this.currentCar !== this.oldCar){
          //this.vehicleFeature = this.imgData.data[this.currentCar].vehicleFeature;
          this.predictValue = this.imgData.data[this.currentCar].vehiclePos.predictValue;
          //this.vehicleModel = this.imgData.data[this.currentCar].vehicleModel;
          this.vehicleModelTxt = this.imgData.data[this.currentCar].vehicleModel;
          //this.vehicleKind = this.imgData.data[this.currentCar].vehicleKindCode;
          //this.vehicleBrand = this.imgData.data[this.currentCar].vehicleBrandCode;
          //this.vehicleKindName = this.imgData.data[this.currentCar].vehicleKind;
          //this.vehicleBrandName = this.imgData.data[this.currentCar].vehicleBrand;
          this.vehicleKindTxt = this.imgData.data[this.currentCar].vehicleKind;
          this.vehicleBrandTxt = this.imgData.data[this.currentCar].vehicleBrand;
          this.vehicleColor = this.imgData.data[this.currentCar].vehicleColor;
          this.plateClass = this.imgData.data[this.currentCar].plateClass;
          //this.plateNumber = this.imgData.data[this.currentCar].plateNumber;
          this.plateNumberTxt = this.imgData.data[this.currentCar].plateNumber;
          this.plateColor = this.imgData.data[this.currentCar].plateColor;
          this.isCarHead = this.imgData.data[this.currentCar].iscarhead;
          this.updateCheckedItem();
          this.checkList = [];
        }
        this.oldCar = this.currentCar;

        this.drawCarInfo(this.currentCar);

        //this.saveCarImg(this.imgData.data[this.currentCar]);

      },

      //保存车辆信息
      caveCanvas (){
        if(this.imgData.data.length){
          this.uploadcount++
          this.saveCarImg(this.imgData.data[this.currentCar]);
          this.vehicleFeature = this.imgData.data[this.currentCar].vehicleFeature;
          this.vehicleKind = this.imgData.data[this.currentCar].vehicleKindCode;
          this.vehicleBrand = this.imgData.data[this.currentCar].vehicleBrandCode;
          this.vehicleKindName = this.imgData.data[this.currentCar].vehicleKind;
          this.vehicleBrandName = this.imgData.data[this.currentCar].vehicleBrand;
          this.vehicleModel = this.imgData.data[this.currentCar].vehicleModel;
          this.vehicleModelCode = this.imgData.data[this.currentCar].vehicleModelCode;
          this.plateNumber = this.imgData.data[this.currentCar].plateNumber;
          this.isCarHead = this.imgData.data[this.currentCar].iscarhead;
          if(this.plateNumber == "@" || this.plateNumber == "未识别"){
            this.plateNumber = null;
          }
          }
        this.dialogVisible = false;
      },

      saveCarImg(currentCarData){
        this.imgUrlShow = this.imgUrl;
        let imgs = document.getElementById("imgUrlShow");  //图片大小
        let imgBox = document.getElementById("searchImg"); //div大小

        let leftTopX = currentCarData.vehiclePos.leftTopX;
        let leftTopY = currentCarData.vehiclePos.leftTopY;
        let rightBtmX = currentCarData.vehiclePos.rightBtmX;
        let rightBtmY = currentCarData.vehiclePos.rightBtmY;
        let imgw = rightBtmX - leftTopX;
        let imgh = rightBtmY - leftTopY;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        let unit = 1;
        let posLeft = 0;
        let posTop = 0;
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
          posLeft = 0;
          posTop = (reth - imgh/unit)/2;
        } else {
          unit = imgh / reth;
          posTop = 0;
          posLeft = (retw - imgw/unit)/2;
        }
        imgs.style.width = (currentCarData.imageWidth / unit )+"px";
        imgs.style.height = (currentCarData.imageHeight / unit)+"px";
        imgs.style.top =(-(leftTopY / unit) + posTop) +"px";
        imgs.style.left = (-(leftTopX / unit) + posLeft )+"px";

        //canvas大小
        let png = document.getElementById("magCanvas").toDataURL("image/png");
        let simg = document.getElementById("simg");
        if(!simg){
          simg = document.createElement("img");
        }
        simg.src = png;
        simg.id = "simg";
        simg.style.position="absolute";
        simg.style.width = imgs.style.width;
        simg.style.height = imgs.style.height;
        simg.style.top = imgs.style.top;
        simg.style.left = imgs.style.left;
        imgBox.appendChild(simg);
      },

      //取消
      cancel(){
        this.dialogVisible = false;
        // if(document.getElementById("simg")){
        //   document.getElementById("simg").remove();
        // }
        // this.imgUrlShow = null;
        // this.vehicleFeature = null;
        // this.isCarHead = null;
        // this.updateCheckedItem();
        // this.vehicleKind = null;
        // this.vehicleBrand = null;
        // this.vehicleKindName = "";
        // this.vehicleBrandName = "不限";
        // this.plateNumber = "";
        // this.vehicleModel = "不限";
        // this.vehicleModelCode = null;
      },
      //初始化图片上第一个车辆信息
      initCanvas (){
        if(this.imgData.data.length){
          console.log(111);
          //默认选中第一个车辆
          this.currentCar = 0;//显示第一辆车的标识信息
          //this.vehicleFeature = this.imgData.data[0].vehicleFeature;
          this.isCarHead = this.imgData.data[0].iscarhead;
          this.updateCheckedItem();
          this.predictValue = this.imgData.data[0].vehiclePos.predictValue;
          //this.vehicleKind = this.imgData.data[0].vehicleKindCode;
          //this.vehicleBrand = this.imgData.data[0].vehicleBrandCode;
          //this.vehicleKindName = this.imgData.data[0].vehicleKind;
          //this.vehicleBrandName = this.imgData.data[0].vehicleBrand;
          this.vehicleKindTxt = this.imgData.data[0].vehicleKind;
          this.vehicleBrandTxt = this.imgData.data[0].vehicleBrand;
          //this.vehicleModel = this.imgData.data[0].vehicleModel;
          this.vehicleModelTxt = this.imgData.data[0].vehicleModel;
          this.vehicleColor = this.imgData.data[0].vehicleColor;
          this.plateClass = this.imgData.data[0].plateClass;
          //this.plateNumber = this.imgData.data[0].plateNumber;
          this.plateNumberTxt = this.imgData.data[0].plateNumber;
          this.plateColor = this.imgData.data[0].plateColor;

          this.imageWidth = this.imgData.data[0].imageWidth;
          this.imageHeight = this.imgData.data[0].imageHeight;
          console.log(this.imageWidth);
          console.log(this.imageHeight);

          this.imgWH();

          //画出所有车的方框
          this.drawCarInfo(0);
          //this.saveCarImg(this.imgData.data[0]);

        }else{
          this.currentCar = 0;//显示第一辆车的标识信息
          this.vehicleFeature = null;
          this.isCarHead = null;
          this.updateCheckedItem();
          this.predictValue = null;
          this.vehicleKind = null;
          this.vehicleBrand = null;
          this.vehicleKindName = null;
          this.vehicleBrandName = "不限";
          this.vehicleKindTxt = null;
          this.vehicleBrandTxt = null;
          this.vehicleModel = "不限";
          this.vehicleModelTxt = null;
          this.vehicleColor = null;
          this.plateClass = null;
          this.plateNumber = null;
          this.plateNumberTxt = null;
          this.plateColor = null;
          setTimeout(()=>{
            this.imageWidth = document.getElementById('imgItem').naturalWidth;
            this.imageHeight = document.getElementById('imgItem').naturalHeight;
            this.imgWH();
          })


          this.clearRect();
          let simg = document.getElementById("simg");
          if(simg){
            simg.parentNode.removeChild(simg);
          }
        }
      },

      imgWH(){
        let imgBox = document.getElementById("imgBox");
        let imgs = document.getElementById("imgItem");
        let photoCanvas = document.getElementById("photoCanvas");
        let imgw = this.imageWidth;
        let imgh = this.imageHeight;
        console.log(imgw,imgh,3333);
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        console.log(retw,reth);
        if (retw / reth < imgw / imgh) {
          imgs.style.width = "100%";
          imgs.style.height = 'auto';
          this.unit = imgw / retw;
        } else {
          imgs.style.height = "100%";
          imgs.style.width = 'auto';
          this.unit = imgh / reth;
        }
        photoCanvas.width = imgw / this.unit;
        photoCanvas.height = imgh /this.unit;

        //隐藏了一个canvas  大小与图片原图大小一致，用于画框后保存到左侧的图片展示位
        let photoCanvas2 = document.getElementById("magCanvas");
        photoCanvas2.width = imgw;
        photoCanvas2.height = imgh;

        let photoCanvas3 = document.getElementById("markCarCanvas");
        photoCanvas3.width = imgw;
        photoCanvas3.height = imgh;

      },
      //去重
      uniqCope(array) {
        let temp = [];
        let index = [];
        let l = array.length;
        for (let i = 0; i < l; i++) {
          for (let j = i + 1; j < l; j++) {
            if (array[i] === array[j]) {
              i++;
              j = i;
            }
          }
          temp.push(array[i]);
          index.push(i);
        }
        return temp;
      },
      beforeAvatarUpload(file,a,b){
        if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png" && file.type != "image/gif" && file.type != "image/tiff"&& file.type != "image/bmf"){
          //this.$alert("只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！","消息提示");
           this.$notify({
                        type: 'warning',
                        message: '只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！',
                        position: 'bottom-right',
                        duration: 3000
                      });
         // layer.alert('只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！',{icon:5,title:"消息提示"});
          return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append('uploadImage',file);
        let _this = this;
        _this.uploadloading = null;
        _this.uploadloading = _this.$loading({
          text: '正在上传...',
          spinner: 'el-icon-loading',
          target: "#imgBox"
        });
        this.$http({
          url:'/tvas/image/upload',
          method:'post',
          data:formData
        }).then(res=>{
          _this.uploadloading.close();
          _this.uploadloading = null;
          if(res.data.code == 200){
            console.log(res,6666);
            this.imgUrl = reader.result;
            this.imgUrlShow = "";

            let resolution = []; //存储识别度的数组
            //先循环判断所有的数组横坐标和纵坐标相减是否小于100或者小于150 如果小于就获取所有的值
            //然后把值添加到数组中去，调用上面的去重方法得到新的数组resolution 并排序

            for (let i = 0; i < res.data.data.length; i++) {
              for (let j = i+1; j < res.data.data.length; j++) {
                console.log(Math.abs(res.data.data[i].vehiclePos.leftTopX - res.data.data[j].vehiclePos.leftTopX),11133);
                console.log(Math.abs(res.data.data[i].vehiclePos.rightBtmX - res.data.data[j].vehiclePos.rightBtmX),1113344);
                console.log(Math.abs(res.data.data[i].vehiclePos.leftTopY - res.data.data[j].vehiclePos.leftTopY),1113322);
                console.log(Math.abs(res.data.data[i].vehiclePos.rightBtmY - res.data.data[j].vehiclePos.rightBtmY),2244);
                if(
                  (Math.abs(res.data.data[i].vehiclePos.leftTopX - res.data.data[j].vehiclePos.leftTopX) < 100 &&
                Math.abs(res.data.data[i].vehiclePos.rightBtmY - res.data.data[j].vehiclePos.rightBtmY) < 150) ||
                res.data.data[i].vehiclePos.leftTopX <= res.data.data[j].vehiclePos.leftTopX &&
                res.data.data[i].vehiclePos.rightBtmX >= res.data.data[j].vehiclePos.rightBtmX &&
                res.data.data[i].vehiclePos.leftTopY <= res.data.data[j].vehiclePos.leftTopY &&
                res.data.data[i].vehiclePos.rightBtmY >= res.data.data[j].vehiclePos.rightBtmY
                ){
                  resolution.push(res.data.data[i].vehiclePos.predictValue,res.data.data[j].vehiclePos.predictValue)
                  resolution = this.uniqCope(resolution)
                  resolution.sort()
                }
              }
            }
            //得到的新数组和原来的数组一一比较把原数组的最小值给删除掉留下最大值  最大值是识别度最高的
            for (let x = 0; x < resolution.length; x++) {
              for (let y = 0; y < res.data.data.length; y++) {
                if(resolution[resolution.length - 1] == res.data.data[y].vehiclePos.predictValue){
                }else if(resolution[x] == res.data.data[y].vehiclePos.predictValue){
                 res.data.data.splice(y,1)
                }
              }
            }
            this.imgData = res.data
            //初始获取车辆类型列表
            this.getVehicleKind((res) => {
              this.vehicleKindList = res.data.data;
            });
            this.$refs.casDialog.getBrand()
            this.$refs.casDialog.getModel()
            this.initCanvas();
          }else if(res.data.code == 801){
            this.imgUrl = reader.result;
            this.imgUrlShow = "";
            this.imgData = {
              code: "",
              message: "",
              data: []
            };
            this.initCanvas();
            //this.$alert("图片识别失败", "消息提示");
            this.$notify({
                        type: 'error',
                        message: '图片自动识别失败！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('图片自动识别失败！',{icon:5,title:"消息提示"});
          } else if(res.data.code == 802){
             this.$notify({
                        type: 'error',
                        message: '图片上传失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //this.$alert("图片上传失败", "消息提示");
           // layer.alert('图片上传失败！',{icon:5,title:"消息提示"});
          } else if(res.data.code == 803){
            //this.$alert("图片格式不正确", "消息提示");
             this.$notify({
                        type: 'error',
                        message: '图片格式不正确！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('图片格式不正确！',{icon:5,title:"消息提示"});
          }else{
            //this.$alert("服务异常", "消息提示");
              this.$notify({
                        type: 'error',
                        message: '服务异常！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //layer.alert('服务异常！',{icon:2,title:"消息提示"});
          }

        });
        return false;
      },

      //重置
      reset() {
        this.imgUrl = null;
        this.imgUrlShow = null;
        if(document.getElementById("simg")){
          document.getElementById("simg").remove();
        }
        if(document.getElementById("photoCanvas")){
          document.getElementById("photoCanvas").width = 0;
          document.getElementById("photoCanvas").height = 0;
        }
        if(document.getElementById("magCanvas")){
          document.getElementById("magCanvas").width = 0;
          document.getElementById("magCanvas").height = 0;
        }
        if(document.getElementById("markCarCanvas")){
          document.getElementById("markCarCanvas").width = 0;
          document.getElementById("markCarCanvas").height = 0;
        }
        this.vehicleFeature = null;
        this.isCarHead = 1;
        this.updateCheckedItem();
        this.predictValue = null;
        this.vehicleKind = null;
        this.vehicleBrand = null;
        this.vehicleKindName = "";
        this.vehicleBrandName = "不限";
        this.vehicleKindTxt = null;
        this.vehicleBrandTxt = null;
        this.vehicleModel =  "不限";  //车辆型号
        this.vehicleModelCode = null;
        this.vehicleColor = null;
        this.plateClass = null;
        this.plateNumber = null;
        this.plateNumberTxt = null;
        this.plateColor = null;
        this.beginDateTime =  this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0] + " " + "00:00:00"; //过车时段开始日期时间
        this.endDateTime = (this.getCurrentDate().split(' ')[0] + " " + "23:59:59");      //过车时段结束日期时间

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

      //按搜索条件查询
      getCarData (){
        if(!this.vehicleFeature){
          //this.$alert("必须上传图片并识别图片上的车辆信息","消息提示");
              this.$notify({
                        type: 'warning',
                        message: '必须上传图片并识别图片上的车辆信息！',
                        position: 'bottom-right',
                        duration: 3000
                      });
        //  layer.alert('必须上传图片并识别图片上的车辆信息！',{icon:5,title:"消息提示"});
          return false;
        }

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
        let params =  this.searchParams;

        this.getVD("Image", params, (res)=>{
          this.transValue(res.data, this.searchResultDefault);
          this.oldParams = this.searchParams;
          if(this.searchResultDefault.data.total === 0 ){
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

      },

      //放大镜
      getScrollMag() {
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      },
      // 获取鼠标在页面的位置，处理浏览器兼容性
      getPageMag(e) {
        let pageX = e.pageX || e.clientX + this.getScrollMag().scrollLeft;
        let pageY = e.pageY || e.clientY + this.getScrollMag().scrollTop;
        return {
          pageX: pageX,
          pageY: pageY
        }
      },
      setMagMaskPos(e){
        e = e || window.event;
        let box = document.getElementById("imgBox");

        let boxImg = document.getElementById('imgItem');
        let mask = document.getElementById("mask");

        let magImg = document.getElementById("magImg");
        let magCanvas = document.getElementById("magCanvas");
        let bigBox = document.getElementById("Magnifier");

        let maskX = this.getPageMag(e).pageX - $(boxImg).offset().left;
        let maskY = this.getPageMag(e).pageY - $(boxImg).offset().top;

        maskX = maskX - mask.clientWidth / 2;
        maskY = maskY - mask.clientHeight / 2;

        maskX = maskX < 0 ? 0 : maskX;
        maskY = maskY < 0 ? 0 : maskY;

        maskX = maskX > boxImg.clientWidth - mask.clientWidth ? boxImg.clientWidth - mask.clientWidth : maskX;
        maskY = maskY > boxImg.clientHeight - mask.clientHeight ? boxImg.clientHeight - mask.clientHeight : maskY;

        mask.style.left = maskX + boxImg.offsetLeft + 'px';
        mask.style.top = maskY + boxImg.offsetTop + 'px';

        let unit = $(magImg).width() / $(boxImg).width();

        let magImgX = (maskX) * unit;
        let magImgY = (maskY) * unit;

        magImg.style.left = -magImgX + 'px';
        magImg.style.top = -magImgY + 'px';
        magCanvas.style.left = -magImgX + 'px';
        magCanvas.style.top = -magImgY + 'px';
      },
      openMag(e){
        if(!this.imgUrl){
          return;
        }
        let boxImg = document.getElementById('imgItem');
        let mask = document.getElementById("mask");

        let magImg = document.getElementById("magImg");
        let bigBox = document.getElementById("Magnifier");

        let box = document.getElementById("photoCvs");
        bigBox.style.display = 'block';
        bigBox.style.left = $(box).width() +"px";
        bigBox.style.top = "0.34rem";

        let maskW = $(bigBox).width() * $(boxImg).width()/$(magImg).width();
        let maskH = $(bigBox).height() * $(boxImg).height()/$(magImg).height();
        mask.style.width = maskW + 'px';
        mask.style.height = maskH + 'px';

      },
      closeMag(e){
        let bigBox = document.getElementById("Magnifier");
        bigBox.style.display = 'none';
      },

      //手工标注
      openMarkCar(ev){
        let imgItem = document.getElementById("imgItem");
        let offsetX = this.getPageMag(ev).pageX - $(imgItem).offset().left;
        let offsetY = this.getPageMag(ev).pageY - $(imgItem).offset().top;
        if(this.carList.length > 0 ){
          for(let i = 0;i<this.carList.length;i++){
            if( (this.carList[i].leftTopX / this.unit) < offsetX && (this.carList[i].rightBtmX / this.unit) > offsetX && (this.carList[i].leftTopY / this.unit) < offsetY && (this.carList[i].rightBtmY/ this.unit) > offsetY){
              this.currentCar = i;
            }
          }
        }else{
          return null;
        }

        let pos = this.carList[this.currentCar];
        pos.imageWidth = this.imgData.data[this.currentCar].imageWidth;
        pos.imageHeight = this.imgData.data[this.currentCar].imageHeight;
        let markCar = document.getElementById("markCar");
        let markCarImg = document.getElementById("markCarImg");
        let markCarCanvas = document.getElementById("markCarCanvas");
        let dialogWidth = $(markCar).width();
        let dialogHeight = $(markCar).height();
        let targetCarWidth = pos.rightBtmX - pos.leftTopX;
        let targetCarHeight = pos.rightBtmY - pos.leftTopY;
        let imgPosX = 0;
        let imgPosY = 0;
        let leftPos = 0;
        let topPos = 0;
        if(dialogWidth > targetCarWidth && dialogHeight>targetCarHeight){
          this.markCarUnit = 1;
          imgPosX = pos.leftTopX - (dialogWidth - targetCarWidth)/2;
          imgPosY = pos.leftTopY - (dialogHeight - targetCarHeight)/2;
        }else{
          if (dialogWidth / dialogHeight < targetCarWidth / targetCarHeight) {
            this.markCarUnit = targetCarWidth / dialogWidth;
            leftPos = 0;
            topPos = (dialogHeight - targetCarHeight/this.markCarUnit) /2;
          } else {
            this.markCarUnit = targetCarHeight / dialogHeight;
            topPos = 0;
            leftPos = (dialogWidth - targetCarWidth/this.markCarUnit) /2;
          }
          imgPosX = pos.leftTopX/this.markCarUnit - leftPos;
          imgPosY = pos.leftTopY/this.markCarUnit - topPos;
        }

        markCarImg.width = pos.imageWidth / this.markCarUnit;
        markCarImg.height = pos.imageHeight / this.markCarUnit;
        markCarCanvas.width = pos.imageWidth / this.markCarUnit;
        markCarCanvas.height = pos.imageHeight / this.markCarUnit;


        markCarImg.style.top = - imgPosY + "px";
        markCarImg.style.left = - imgPosX + "px";
        markCarCanvas.style.top = - imgPosY + "px";
        markCarCanvas.style.left = - imgPosX + "px";

        this.oldCar = this.currentCar;

        this.drawRectMarkCar("root",this.imgData.data[this.currentCar].vehiclePos, "red");

        this.$nextTick(function(){
          this.markCarVisible = true;
        });

      },
      //根据坐标和宽高画框
      drawRectMarkCar (parent, pos,color){
        if(!pos){
          return;
        }

        let markCarCanvas = document.getElementById("markCarCanvas");
        let pCtx3 = markCarCanvas.getContext("2d");
        pCtx3.clearRect(0,0,markCarCanvas.width, markCarCanvas.height);

        let x3 = pos.leftTopX/this.markCarUnit;
        let y3 = pos.leftTopY/this.markCarUnit;
        let w3 = (pos.rightBtmX - pos.leftTopX)/this.markCarUnit;
        let h3 = (pos.rightBtmY - pos.leftTopY)/this.markCarUnit;
        if(parent !== "root"){
          x3 = x3 + parent.leftTopX/this.markCarUnit;
          y3 = y3 + parent.leftTopY/this.markCarUnit;
        }
        pCtx3.strokeStyle = color;
        pCtx3.strokeRect(x3,y3,w3,h3);

      },
      windowToCanvas(canvas, x, y) {
        let rect = canvas.getBoundingClientRect();
        return {
          x: x - rect.left * (canvas.width / rect.width),
          y: y - rect.top * (canvas.height / rect.height)
        }
      },
      getCoord() {
        this.allowCoord = true;
        let markCar = document.getElementById("markCar");
        let markCarCanvas = document.getElementById("markCarCanvas");
        let context = markCarCanvas.getContext("2d");
        context.beginPath();
        context.lineWidth = 2;
        this.rectList = [];


        markCarCanvas.onmousedown = (e) => {
          if (!this.allowCoord) {
            return false;
          }
          let ele = this.windowToCanvas(markCarCanvas, e.clientX, e.clientY);
          this.one = ele.x;
          this.two = ele.y;

          markCarCanvas.onmousemove = (e)=> { //鼠标移动的时候
            let ele = this.windowToCanvas(markCarCanvas, e.clientX, e.clientY);
            context.clearRect(0, 0, markCarCanvas.width, markCarCanvas.height);
            this.drawRectMarkCar("root",this.imgData.data[this.currentCar].vehiclePos, "red");
            for(let j=0;j<this.rectList.length;j++){
              context.strokeRect(
                this.rectList[j].one,
                this.rectList[j].two,
                this.rectList[j].three - this.rectList[j].one,
                this.rectList[j].four - this.rectList[j].two
              );
            }
            this.three = ele.x;
            this.four = ele.y;
            context.strokeStyle = "red";
            context.strokeRect(
              this.one,
              this.two,
              this.three - this.one,
              this.four - this.two
            );
          }


        };
        markCarCanvas.onmouseup = (e) => {
          if (!this.allowCoord) {
            return false;
          }
          markCarCanvas.onmousemove = null;
          context.stroke();
          this.rectList.push({
            one:this.one,
            two:this.two,
            three:this.three,
            four: this.four
          });
        };
      },
      //清空标注
      clearCoord(){
        this.drawRectMarkCar("root",this.imgData.data[this.currentCar].vehiclePos, "red");
        this.rectList = [];
      },
      saveCoord(){
        this.saveCoordCarImg();
        this.vehicleFeature = this.imgData.data[this.currentCar].vehicleFeature;
        this.isCarHead = this.imgData.data[this.currentCar].iscarhead;
        this.updateCheckedItem();
        this.vehicleKind = this.imgData.data[this.currentCar].vehicleKindCode;
        this.vehicleBrand = this.imgData.data[this.currentCar].vehicleBrandCode;
        this.vehicleKindName = this.imgData.data[this.currentCar].vehicleKind;
        this.vehicleBrandName = this.imgData.data[this.currentCar].vehicleBrand;
        this.vehicleModel = this.imgData.data[this.currentCar].vehicleModel;
        this.plateNumber = this.imgData.data[this.currentCar].plateNumber;
        if(this.plateNumber == "@" || this.plateNumber == "未识别"){
          this.plateNumber = null;
        }

        this.allowCoord = false;
        this.dialogVisible = false;
        this.markCarVisible = false;
      },
      saveCoordCarImg(){
        this.imgUrlShow = this.imgUrl;
        let imgs = document.getElementById("imgUrlShow");
        let imgBox = document.getElementById("searchImg");
        let currentCarData = this.imgData.data[this.currentCar];
        let leftTopX = currentCarData.vehiclePos.leftTopX;
        let leftTopY = currentCarData.vehiclePos.leftTopY;
        let rightBtmX = currentCarData.vehiclePos.rightBtmX;
        let rightBtmY = currentCarData.vehiclePos.rightBtmY;
        let imgw = rightBtmX - leftTopX;
        let imgh = rightBtmY - leftTopY;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        let unit = 1;
        let posLeft = 0;
        let posTop = 0;
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
          posLeft = 0;
          posTop = (reth - imgh/unit)/2;
        } else {
          unit = imgh / reth;
          posTop = 0;
          posLeft = (retw - imgw/unit)/2;
        }
        imgs.style.width = (currentCarData.imageWidth / unit )+"px";
        imgs.style.height = (currentCarData.imageHeight / unit)+"px";
        imgs.style.top =(-(leftTopY / unit) + posTop) +"px";
        imgs.style.left = (-(leftTopX / unit) + posLeft )+"px";

        let png = document.getElementById("markCarCanvas").toDataURL("image/png");
        let simg = document.getElementById("simg");
        if(!simg){
          simg = document.createElement("img");
        }
        simg.src = png;
        simg.id = "simg";
        simg.style.position="absolute";
        simg.style.width = imgs.style.width;
        simg.style.height = imgs.style.height;
        simg.style.top = imgs.style.top;
        simg.style.left = imgs.style.left;
        imgBox.appendChild(simg);
      },
      closeMarkCar(){
        this.allowCoord = false;
        this.markCarVisible = false;
        if(document.getElementById("simg")){
          document.getElementById("simg").remove();
        }
      }

    },
    mounted: function () {
      this.getWeekDay();
      this.getTreeData();
      this.getCheckedItem(["beginDateTime", "endDateTime"]);


      let imgUrl = this.$router.currentRoute.query.imgUrl;
      if(imgUrl){
        this.dialogVisible = true;
        this.imgUrl = imgUrl;
        let params = {
          imgUrl: imgUrl
        };
        let data  = this.$qs.stringify(params);
        this.uploadloading = this.$loading({
          text: '正在上传...',
          spinner: 'el-icon-loading',
          target: "#imgBox"
        });
        this.$http.post('/tvas/image/upload',data).then(res=>{
          this.uploadloading.close();
          if(res.data.code == 200){
            this.imgUrl = imgUrl;
            this.imgUrlShow = "";


            let resolution = []; //存储识别度的数组
            //先循环判断所有的数组横坐标和纵坐标相减是否小于100或者小于150 如果小于就获取所有的值
            //然后把值添加到数组中去，调用上面的去重方法得到新的数组resolution 并排序

            for (let i = 0; i < res.data.data.length; i++) {
              for (let j = i+1; j < res.data.data.length; j++) {
                // if(Math.abs(res.data.data[i].vehiclePos.leftTopX - res.data.data[j].vehiclePos.leftTopX) < 100 &&
                // Math.abs(res.data.data[i].vehiclePos.rightBtmY - res.data.data[j].vehiclePos.rightBtmY) < 150){
                //   resolution.push(res.data.data[i].vehiclePos.predictValue,res.data.data[j].vehiclePos.predictValue)
                //   resolution = this.uniqCope(resolution)
                //   resolution.sort()
                // }
                 if((Math.abs(res.data.data[i].vehiclePos.leftTopX - res.data.data[j].vehiclePos.leftTopX) < 100 &&
                    Math.abs(res.data.data[i].vehiclePos.rightBtmY - res.data.data[j].vehiclePos.rightBtmY) < 150) ||
                    res.data.data[i].vehiclePos.leftTopX <= res.data.data[j].vehiclePos.leftTopX &&
                    res.data.data[i].vehiclePos.rightBtmX >= res.data.data[j].vehiclePos.rightBtmX &&
                    res.data.data[i].vehiclePos.leftTopY <= res.data.data[j].vehiclePos.leftTopY &&
                    res.data.data[i].vehiclePos.rightBtmY >= res.data.data[j].vehiclePos.rightBtmY){
                  resolution.push(res.data.data[i].vehiclePos.predictValue,res.data.data[j].vehiclePos.predictValue)
                  resolution = this.uniqCope(resolution)
                  resolution.sort()
                }

              }
            }
            //得到的新数组和原来的数组一一比较把原数组的最小值给删除掉留下最大值  最大值是识别度最高的
            for (let x = 0; x < resolution.length; x++) {
              for (let y = 0; y < res.data.data.length; y++) {
                if(resolution[resolution.length - 1] == res.data.data[y].vehiclePos.predictValue){
                }else if(resolution[x] == res.data.data[y].vehiclePos.predictValue){
                  res.data.data.splice(y,1)
                }
              }
            }



            this.imgData = res.data;
            this.initCanvas();
          }else if(res.data.code == 801){
            this.imgUrl = imgUrl;
            this.imgUrlShow = "";
            this.imgData = {
              code: "",
              message: "",
              data: []
            };
            this.initCanvas();
            //this.$alert("图片识别失败", "消息提示");
             this.$notify({
                        type: 'error',
                        message: '图片自动识别失败！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('图片自动识别失败！',{icon:5,title:"消息提示"});
          } else if(res.data.code == 802){
             this.$notify({
                        type: 'error',
                        message: '图片上传失败！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //this.$alert("图片上传失败", "消息提示");
           // layer.alert('图片上传失败！',{icon:5,title:"消息提示"});
          } else if(res.data.code == 803){
             this.$notify({
                        type: 'error',
                        message: '图片格式不正确！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //this.$alert("图片格式不正确", "消息提示");
           // layer.alert('图片格式不正确！',{icon:5,title:"消息提示"});
          }else{
             this.$notify({
                        type: 'error',
                        message: '服务异常！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            //this.$alert("服务异常", "消息提示");
           // layer.alert('服务异常！',{icon:2,title:"消息提示"});
          }

        });
      }

      //初始获取车辆类型列表
      this.getVehicleKind((res) => {
        this.vehicleKindList = res.data.data;
      });

      let _this = this;
      _this.getLocalCoordinate();
      _this.loadMap();

      this.motorBegin = laydate.render({
        elem: "#motorBegin",
        type: "datetime",
        //min: -90, //90天前
        max:  this.motorEndTime, //0天后
        btns: ['confirm'],
        done: function(value, date, endDate) {
          _this.motorBeginTime = value;
          _this.motorEnd.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
          let maxDate = new Date(value).getTime() + 24*60*60*1000;
          if(new Date().getTime() > maxDate){
            _this.motorEndTime = _this.getDateStrings(maxDate);
            _this.motorEnd.config.max = {
              year: new Date(maxDate).getFullYear(),
              month: new Date(maxDate).getMonth(), //关键
              date: new Date(maxDate).getDate(),
              hours: new Date(maxDate).getHours(),
              minutes: new Date(maxDate).getMinutes(),
              seconds: new Date(maxDate).getSeconds()
            };
          }else{
            _this.motorEndTime = _this.getDateString(new Date().getTime());
            _this.motorEnd.config.max = {
              year: new Date().getFullYear(),
              month: new Date().getMonth(), //关键
              date: new Date().getDate(),
              hours: new Date().getHours(),
              minutes: new Date().getMinutes(),
              seconds: new Date().getSeconds()
            };
          }
        }
      });
      this.motorEnd = laydate.render({
        elem: "#motorEnd",
        type: "datetime",
        min: this.motorBeginTime,
        max: this.motorEndTime,
        btns: ['confirm'],
        done: function(value, date, endDate) {
          _this.motorEndTime = value;
          _this.motorBegin.config.max = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        }
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
          let time = Number(_this.searchCarMaxDays)-1;
          let maxDate = new Date(value).getTime() + time*24*60*60*1000;
          if(new Date().getTime() > maxDate){
            _this.endDateTime = _this.getDateString(maxDate);
            _this.timeEnd.config.max = {
              year: new Date(maxDate).getFullYear(),
              month: new Date(maxDate).getMonth(), //关键
              date: new Date(maxDate).getDate(),
              hours: new Date(maxDate).getHours(),
              minutes: new Date(maxDate).getMinutes(),
              seconds: new Date(maxDate).getSeconds()
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
  /* .dialog >>> .el-dialog__header{
    background: #f3f6f8;
    border-bottom:1px solid #d5dade;
  } */
  .dialog >>> .el-dialog__body {
    padding: 0.2rem;
    color: #606266;
    line-height: 0.24rem;
    font-size: 0.14rem;
  }
  .dialog >>> .el-dialog__footer{
    border-top:1px solid #d5dade;
    text-align: center;
  }
  .dialog >>> .el-button+.el-button{
    margin-left: 0.5rem;
  }
  .dialog >>> .el-button{
    padding: 0.1rem 0.2rem;
    font-size: 0.16rem;
  }
  .uploadPhoto >>> .el-upload-list{
    display:none;
  }
  .searchImg div{
    width: 3.17rem;
    height: 1.77rem;
    border: 1px solid #1C3F67;
    position: relative;
    overflow: hidden;
  }

  .searchImg img {
    position: absolute;
    /*top:0;*/
    /*left:0;*/
    /*right:0;*/
    /*bottom:0;*/
    /*margin:auto;*/
  }

  .searchImg input {
    width: 100%;
    height: 0.3rem;
    position: absolute;
    bottom: 0;
    z-index: 2;
    opacity: 0;
  }

  .searchImg p {
    width: 3.17rem;
    line-height: 0.3rem;
    color: #fff;
    text-align: center;
    background-color: #163251;
    border: 1px solid #1C3F67;
    border-top: 0px;
    cursor: pointer;
  }

  .photoWrap{
    display: flex;
    justify-content: space-between;
     background-color: rgba(16, 35, 56, 0.5);
  }
  .photoWrap .photo{
    position:relative;
    width: 7.28rem;
    margin-left:0.08rem
    /*overflow: hidden;*/
  }
  .photoWrap .photo .showImg{
    position:relative;
    /*width: 7.2rem;*/
    height:4rem;
    border:1px solid #1f4572;
    border-bottom:none
  }
  .photoWrap .photo .showImg img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .showPhoto{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin: auto;
    opacity: 1;
  }
  .photoWrap .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2.74rem;

  }
  .photoWrap .info .infoItem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .photoWrap .info .infoItem .vinfolist, .photoWrap .info .infoItem .carItemInfo{
    padding:0.1rem 0 0.1rem 0.1rem;
    /* background-color:#F6F7FB; */
  }
  .photoWrap .info .infoItem .carItemInfo{
    height: 2.35rem;
    margin-bottom:0.1rem;
    overflow-y:auto;
  }
  .photoWrap .uploadPhoto{
    /* margin-top:0.1rem; */
    padding: 0.1rem 0;
    text-align: center;
    border: 1px solid #1f4572;
    border-top:none;
    background:rgba(0,0,0,.2)
  }

  .photoWrap .smallT{
    display: block;
    margin-bottom:0.1rem;
    color:#409eff;
    font-size:0.16rem;
    line-height:0.24rem;
    font-weight: bold;
    padding-left: 0.1rem;
  }


  .carItemInfo .carItem{
    padding-left:0;
    margin-top:0.1rem;
    color:#409eff;
    line-height: 0.19rem;
    font-size: 0.14rem;
  }
  .carItemInfo .carItem >>> .el-checkbox__label {
    display: inline-block;
    padding-left: 0.1rem;
    line-height: 0.19rem;
    font-size: 0.14rem;
  }
  .carItemInfo .carItem span{
    color:#409eff;
  }
  .carItemInfo .carItem.unde{
    color:#999;
  }
  .carItemInfo .carItem label{
    margin-right: 0.1rem;
  }
  .carItemInfo .carItem span:last-child{
    float:right;
    width: 1rem;
    text-align: center;
   }
  .vinfolist p{
    color: #99c9fa ;
    font-size: 0.14rem;
    line-height:0.22rem;
  }
  .vinfolist p:first-child span{
    color:#f56c6c
  }
  .magnifier{
    position:absolute;
    display: none;
    width: 3rem;
    height: 3rem;
    z-index:2;
    border: 1px solid #F6F7FB;
    background: #fff;
    box-sizing: border-box;
    overflow:hidden;
  }

  .magnifier img {
    position: absolute;
  }
  .magnifier canvas {
    position:absolute;
  }
  .mask{
     display: none;
     position:absolute;
     top:0;
     left:0;
     /*background:rgba(255,255,255,0.5);*/
     /*cursor: move;*/
   }
  .showImg:hover .mask{
    display: block;
  }
  .markCarDialog{
    position: absolute;
    top:15vh;
    left:0;
    right:0;
    bottom:0;
    width:10.68rem;
    height:6.8rem;
    margin:0 auto;
    background:#fff;
    z-index: 9999;
    border: 2px solid #2e3f51;
    background: url('../../assets/updataImg/home-bg.png') center;
  }
  .markCarDialog .title{
    padding: 20px 20px 10px;
    /* background: #f3f6f8; */
    background-color: #113254 !important;
    font-size: 0.2rem;
     border-bottom: 1px solid #13436E ;
    /* line-height: 24px; */
    /* font-size: 18px; */
    color: #fff;
  }
  .markCarDialog .close{
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 16px;
    color:#909399
  }
  .markCarFooter{
    padding:0.1rem;
    display: flex;
    justify-content: center;
    border-top: 1px solid #12385b;
  }
  .markCarFooter .el-button{
    padding: 0.1rem 0.2rem;
    font-size: 0.16rem;
  }
  .markCarFooter .el-button + .el-button{
    margin-left:0.5rem;
  }
  .markCarContent{
    width: 100%;
    padding: 0.1rem;
    overflow: hidden;
  }
  .markCar{
    /*float: left;*/
    position: relative;
    width:10.06rem;
    cursor: crosshair;
    height:5.2rem;
    margin: 0 auto;
    border: 1px solid #1f4572;
    overflow: hidden;
  }
  .markCar img{
    position: absolute;
  }
  .markCar canvas{
    position: absolute;
  }
  .markCarInfo{
    float:right;
    width: 2.76rem;
    height:5.2rem;
    display: flex;
    flex-direction: column;
  }
  .markCarInfo .infoItem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .markCarInfo .infoItem .carItemInfo{
    padding-left:0.1rem;
    background-color:#F6F7FB;
  }
  .markCarInfo .infoItem .carItemInfo{
    height:4.6rem;
    overflow-y:auto;
  }
  .markCarInfo .smallT{
    display: block;
    margin-bottom:0.1rem;
    color:#409eff;
    font-size:0.16rem;
    line-height:0.24rem;
    font-weight: bold;
    padding-left: 0.1rem;
  }

  .el_btn{
    padding: 0.14rem 0;
    display: flex;
    justify-content: space-around;
  }
  .el_btn .el-button{
    padding: 0.1rem 0.2rem;
    font-size: 0.14rem;
  }
</style>

