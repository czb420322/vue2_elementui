<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link tag="div" to="/carJudged?menuCode=300" class="sysname">车辆研判 ></router-link>
      <div class="sysname">&nbsp;人脸搜车</div>
    </div>
    <div class="contentBody">
      <div class="contentLeft">
        <div class="contentHide" v-show="contentLeft"></div>
        <div class="clItem cli1">
          <div class="searchTitle">人脸搜车</div>
          <ul class="searchCondition">
            <li class="conditionInput">
              <img src="../../assets/images/carJudged/search_item.png" alt>
              车辆搜索条件
            </li>
            <li class="searchImg">
              <div id="searchPicture" class="searchPic">
                <div class="childPicture" id="childPic" v-show="childShow">
                  <img class="imgprint" id="childUrlReveal" :src="imgUrlShow" alt>
                </div>

                <img class="imgPicture" v-show="parentShow" id="imgUrlReveal" :src="imgUrlShow" alt>
              </div>
              <p v-show="uploadBtn" @click="openUpload">上传图片</p>
            </li>
            <li
              v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14"
            >
              <span>车辆类型：</span>
              <el-select type="text"  ref="vehicleKind" v-model.trim="vehicleKind"
                @change="vehicleType" placeholder="请选择车辆类型"
              >
                <el-option :value="null" label="不限"></el-option>
                <el-option v-for="(item, index) in vehicleKindList"
                  :value="item.field"
                  :label="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </li>
            <li
              v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14"
            >
              <span>车辆品牌：</span>
              <input
                type="text"
                ref="vehicleBrand"
                readonly
                @click="getCarBrand"
                v-model.trim="vehicleBrandName"
                placeholder="请选择车辆品牌"
              >
              <i class="el-icon-circle-close" @click="clearBand();refresh()"></i>
            </li>
            <li
              v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14"
            >
              <span>车辆型号：</span>
              <input type="text" id="vModel" readonly value ref="vehicleModel" @click="getCarModule"
                v-model.trim="vehicleModel" placeholder="请选择车辆型号"
              >
              <i class="el-icon-circle-close" @click="clear('vehicleModel')"></i>
            </li>
            <li v-show="this.isCarHead != 1 && this.isCarHead != 0">
              <span>车辆类型：</span>
              <el-select v-model="isCarHead">
                <el-option :value="14" label="不限"></el-option>
                <el-option :value="2" label="自行车"></el-option>
                <el-option :value="4" label="摩托车"></el-option>
                <el-option :value="8" label="三轮车"></el-option>
              </el-select>
            </li>
            <li v-show="this.isCarHead != 1 && this.isCarHead != 0">
              <div class="timeWrap">
                <span>
                  <span class="bt">*</span>车辆时段：
                </span>
                <div class="carTime">
                  <input
                    type="text"
                    id="motorBegin"
                    ref="motorBegin"
                    readonly
                    v-model.trim="motorBeginTime"
                    placeholder="请选择开始时间"
                  >
                  <input
                    type="text"
                    id="motorEnd"
                    ref="motorEnd"
                    readonly
                    v-model.trim="motorEndTime"
                    placeholder="请选择结束时间"
                  >
                </div>
              </div>
            </li>
            <li
              v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14"
            >
              <span>车牌号码：</span>
              <input
                type="text"
                ref="plateNumber"
                v-model.trim="plateNumber"
                value="不限"
                minlength="7"
                maxlength="8"
                @keyup.enter="checkPlateNumber"
                @blur="checkPlateNumber"
                placeholder="请输入车牌号码"
              >
            </li>
            <li
              v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4 && this.isCarHead != 14"
            >
              <div class="timeWrap">
                <span>
                  <span class="bt">*</span>车辆时段：
                </span>
                <div class="carTime">
                  <input
                    type="text"
                    id="timeBegin"
                    ref="beginDateTime"
                    readonly
                    v-model.trim="beginDateTime"
                    placeholder="请选择开始时间"
                    @blur="checkBeginDateTime"
                  >
                  <i class="el-icon-circle-close" @click="clear('beginDateTime')"></i>
                  <input
                    type="text"
                    id="timeEnd"
                    ref="endDateTime"
                    readonly
                    v-model.trim="endDateTime"
                    placeholder="请选择结束时间"
                    @blur="checkEndDateTime"
                  >
                  <i class="el-icon-circle-close" @click="clear('endDateTime')"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="clItem cli2">
          <div class="map">
            <div class="mapHandle">
              <img src="../../assets/images/carJudged/map_tool.png" alt>
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
            <div class="btnReset cancleBtn" @click="reset">
              <i class="el-icon-refresh"></i> 重置
            </div>
            <div v-show="searchBtn" class="btnSearch passBtn" @click="getCarData">
              <i class="el-icon-search"></i> 搜索
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div v-show="!checked" id="mapContent"></div>
        <img
          v-show="!checked"
          class="dingwei"
          src="../../assets/case/quickPos.png"
          @click="loadMap();initPoint();"
        >
        <div v-show="!checked" class="point">
          <span>经度：{{point.lng}}</span>
          <br>
          <span>纬度：{{point.lat}}</span>
        </div>
        <!--搜索结果详情-->
        <div class="sDetail" :style="{left: checked?'0.12rem':'100%'}">
          <div class="contentSwitch" v-show="arrawSwitch" :style="{left:checked?'0':'-0.16rem'}">
            <img
              v-if="!checked"
              src="../../assets/images/carJudged/arrows-left.png"
              @click="checked = !checked"
            >
            <img
              v-else
              src="../../assets/images/carJudged/arrows-right.png"
              @click="checked=!checked"
            >
          </div>
          <search-face-detail
            v-show="checked"
            port="/tvas/image/searchVehicleByFace"
            :totalNum = "totalNum"
            @childbyface = 'childbyface'
            @searchMap = 'searchMap'
            :searchResultDefault="searchResultDefault"
          ></search-face-detail>
        </div>
      </div>
    </div>
    <div class="menu" v-show="isBar">
      <el-input class="menuSearch" placeholder="请输入关键字进行过滤" v-model="filterText"></el-input>
      <div class="menuTree">
        <el-tree
          :data="treeList"
          show-checkbox
          default-expand-all
          node-key="kakouId"
          ref="tree"
          @check="getCheckedNodes"
          :filter-node-method="filterNode"
          :props="defaultProps"
        ></el-tree>
      </div>
    </div>
    <div
      class="err"
      v-if="Err.vehicleKind.flag"
      :style="{top: Err.vehicleKind.top}"
    >{{Err.vehicleKind.txt}}</div>
    <div
      class="err"
      v-if="Err.vehicleBrand.flag"
      :style="{top: Err.vehicleBrand.top}"
    >{{Err.vehicleBrand.txt}}</div>
    <div
      class="err"
      v-if="Err.beginDateTime.flag"
      :style="{top: Err.beginDateTime.top}"
    >{{Err.beginDateTime.txt}}</div>
    <div
      class="err"
      v-if="Err.endDateTime.flag"
      :style="{top: Err.endDateTime.top}"
    >{{Err.endDateTime.txt}}</div>
    <div
      class="err"
      v-if="Err.plateNumber.flag"
      :style="{top: Err.plateNumber.top}"
    >{{Err.plateNumber.txt}}</div>
    <div class="calDialog">
      <casDialog
        ref="casDialog"
        :vehicleKind="vehicleKind"
        :showFirst="showFirst"
        :showSecond="showSecond"
        :carBrand="vehicleBrand"
        :carModel="vehicleModel"
        @passToParent="getChildData"
        :icoclick="icoclick"
        @changeicoclick="changeicoclick"
      ></casDialog>
    </div>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="13rem"
      class="dialog"
    >
      <div class="photoWrap">
        <div id="photoCvs" class="photo" @click="choiceCar($event)">
          <span class="smallT">| 图片源&nbsp;&nbsp;
            <el-button type="primary" size="small" @click="clearAll">清空</el-button>
          </span>
          <div class="showImg" id="imgBox" title="双击展示车辆图片并可手工标注">
            <img id="imgItem" style="width: auto;height: 100%" :src="imgUrl">
            <canvas id="photoCanvas" class="showPhoto" width="0" height="0"></canvas>
            <canvas v-show="cawqq" id="faceCanvas" class="facePhoto" width="0" height="0"></canvas>
            <span id="mask" class="mask"></span>
          </div>
          <!-- <div class="magnifier" id="Magnifier">
            <img id="magImg" :src="imgUrl">
            <canvas id="magCanvas" width="0" height="0"></canvas>
          </div>-->
          <el-upload
            class="uploadPhoto"
            action="/sms/uploadFile/upload"
            name="uploadImage"
            ref="upload"
            :before-upload="beforeAvatarUpload">
            <el-button
              size="small"
              class="topBtn"
              icon="el-icon-picture-outline"
              type="primary"
            >上传图片</el-button>
          </el-upload>
          <div class="desc"></div>
        </div>
       <div class="navBar">
          <div class="navLeft">
            <el-select size="small" v-model="pullDownFace" placeholder="请选择库" @change="changeSus" value-key="dbName">
              <el-option v-for="(item,index) in faceData" :key="index" :label="item.dbName" :value="item"></el-option>
            </el-select>
            <!-- <el-input size="small" v-model="keyword" style="width:1.8rem;"></el-input>
            <el-button size="small" type="primary" class="searchBtn" @click="searchFace">查询</el-button> -->
          </div>
          <div class="navCenter">
            <div class="showface">
              <ul>
                <li v-for="(item,index) in faceArr.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" @click="uploadFace(item)">
                  <img :src="item.faceUrl" alt="">
                </li>
              </ul>
            </div>
            <div class="uploadpage">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="cancleBtn" @click="cancel">取 消</el-button>
          <el-button class="passBtn" @click="caveCanvas">确 定</el-button>
        </span>
    </el-dialog>
    <div class="markCarDialog" v-show="markCarVisible">
      <span @click="closeMarkCar" class="close el-icon-close"></span>
      <div class="title">车辆展示</div>
      <div class="markCarContent">
        <div id="markCar" class="markCar">
          <img id="markCarImg" :src="imgUrl">
          <canvas id="markCarCanvas" width="0" height="0"></canvas>
        </div>
      </div>
      <div class="markCarFooter">
        <el-button class="cancleBtn" type="default" @click="closeMarkCar">关闭</el-button>
        <el-button
          class="tryBtn"
          icon="el-icon-setting"
          type="success"
          @click="getCoord"
          :disabled="allowCoord"
        >手工标注</el-button>
        <el-button class="delBtn" icon="el-icon-delete" type="warning" @click="clearCoord">清空手工标注</el-button>
        <el-button class="searchBtn" icon="el-icon-tickets" type="primary" @click="saveCoord">确定标注</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import vehicle from "../../api/vehicle/vehicle.js";
import mapFun from "../../api/vehicle/mapFun.js";
import searchFaceDetail from "./searchfaceDetail";
import footerThird from "../../components/footer_third";
import casDialog from "./casDialog";
import { windowToCanvas, imgwh } from "../videoCombat/canvas.js";
export default {
  components: {
    searchFaceDetail,
    footerThird,
    casDialog
  },

  data() {
    return {
      uploadBtn: this.$storage.getSession("348") != null ? true : false,
      searchBtn: this.$storage.getSession("305") != null ? true : false,
      map: null, //地图对象
      drawingManager: null,
      overlays: [],
      treeList: null,
      filterText: "",
      isBar: false,
      defaultProps: {
        children: "apeTollgates",
        label: "name"
      },
      i: 0,
      searchCarMaxDays: sessionStorage.getItem("searchCarMaxDays"), //可配置的时间
      defaultTollgate: [], //默认的全部卡口ID
      vehicleKindList: [],
      showFirst: false,
      showSecond: false,
      dialogVisible: false,
      markCarVisible: false,
      markCarUnit: 1,
      isMouseDownDoing: false,
      doMouseDownTimmer: null,
      allowCoord: false,
      domTop: 0,
      domLeft: 0,
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      rectList: [],
      unit: 1, //图片宽度适应比例尺
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
      contentLeft: false,

      checked: false,
      arrawSwitch: false, //默认不显示蓝色小箭头
      loading: null,
      carInfoList: [
        "驾乘人员",
        "检测面部",
        "系安全带",
        "打开遮阳板",
        "车辆年检标",
        "车辆挂饰",
        "纸巾盒数量",
        "传经筒数量",
        "打电话人",
        "抽烟人",
        "车辆天窗",
        "行李架"
      ],
      checkList: [],

      vehicleKind: null, //车辆类型
      vehicleKindName: "不限",
      vehicleBrand: null, //车辆品牌
      vehicleBrandCode: null,
      vehicleBrandName: "不限",

      vehicleKindTxt: null,
      vehicleBrandTxt: null,
      predictValue: null,
      vehicleModel: "不限", //车辆型号
      vehicleModelTxt: null,
      vehicleModelCode: null,
      vehicleColor: null,
      plateClass: null,
      plateNumber: null,
      plateNumberTxt: null,
      plateColor: null,
      isCarHead: 1,
      beginDateTime:
        this.getDateString(
          new Date().getTime() - 6 * 24 * 60 * 60 * 1000
        ).split(" ")[0] +
        " " +
        "00:00:00", //过车时段开始日期时间
      endDateTime: this.getCurrentDate().split(" ")[0] + " " + "23:59:59", //过车时段结束日期时间
      motorBeginTime:
        this.getDateString(new Date().getTime() - 24 * 60 * 60 * 1000).split(
          " "
        )[0] +
        " " +
        "00:00:00",
      motorEndTime: this.getCurrentDate().split(" ")[0] + " " + "00:00:00",
      tollgateIds: null,
      orderBy: "pass_time",
      orderType: "desc",
      tollgateIdsArr: [], //总体选中的卡口列表
      tollArr: [], //地图选中的卡口列表
      tollTreeArr: [], // 菜单选中的卡口列表
      faceWidth: 0, // 图片宽高
      faceHeight: 0,

      feature: null, // 特征
      cawqq: false, // 默认隐藏

      //搜索结果 默认
      searchResultDefault: [],
      oldParams: {},
      icoclick: false,
      uploadcount: 0,
      arrList: [], // 存储图片数据
      imgList:{}, // 人脸数据
      totalNum:0,
      numIndex: '',
      childShow: false, // 默认隐藏
      parentShow: false,
      imageUrl:'',
      faceData: [], // 存储数据
      pullDownFace: {},
      faceArr:[], //当前库人脸列表
      currentPage:1,
      pageSize:12,
      totalCount:0,
      loading:null,  //加载
      vehicleKindEntry: '',  //给后台的车辆类型值
      getVehicleBrandEntry: '', //给后台的车辆品牌值
      color: ["red","blue","orange","pink","black","green","yellow","gray","purple"]

    };
  },
  watch: {
    faceList: {
      handler(val, oldVal) {
        if (val.length) {
          for (let i = 0; i < val.length; i++) {
            let imgBox = document.getElementById("imgBox"); // div大小
            let imgs = document.getElementById("imgItem"); // 图片大小
            let leftTopX = val[i].facePos.leftTopX;
            let leftTopY = val[i].facePos.leftTopY;
            let rightBtmX = val[i].facePos.rightBtmX;
            let rightBtmY = val[i].facePos.rightBtmY;
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
              posTop = (reth - imgh / unit) / 2;
            } else {
              unit = imgh / reth;
              posTop = 0;
              posLeft = (retw - imgw / unit) / 2;
            }
            imgs.style.width = val.width / unit + "px";
            imgs.style.height = val.height / unit + "px";
            imgs.style.top = -(leftTopY / unit) + posTop + "px";
            imgs.style.left = -(leftTopX / unit) + posLeft + "px";
          }
        }
      },
      deep: true
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    vehicleKind(newValue, oldValue) {
      if (newValue != null) {
        this.getVehicleKindName();
      } else {
        this.vehicleKindName = "不限";
      }
    },
    vehicleBrandName(newVal, oldVal) {
      if (newVal != "不限") {
        //保证点击icon清空品牌框引发的从子组件传回的值不会把之前的车型框选的清空
        this.vehicleModel = "不限";
        this.vehicleModelCode = null;
      }
    },
    uploadcount(newVal, oldVal) {
      if (newVal) {
        this.vehicleModel = this.imgData.data[this.currentCar].vehicleModel;
        this.vehicleModelCode = this.imgData.data[
          this.currentCar
        ].vehicleModelCode;
      }
    },
    // 人脸详情
    imgList:{
      handler(val, oldValue) {
        if(val.width != undefined){
          this.parentShow = true
          this.childShow = false
          let imgs = document.getElementById("imgUrlReveal");  // 图片大小
          let imgBox = document.getElementById("searchPicture"); // div大小
          let leftTopX = val.facePos.leftTopX;
          let leftTopY = val.facePos.leftTopY;
          let rightBtmX = val.facePos.rightBtmX;
          let rightBtmY = val.facePos.rightBtmY;
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
          imgs.style.width = (val.width / unit )+"px";
          imgs.style.height = (val.height / unit)+"px";
          imgs.style.top =(-(leftTopY / unit) + posTop) +"px";
          imgs.style.left = (-(leftTopX / unit) + posLeft )+"px";
        }else if(val.imageHeight != undefined){
          this.childShow = true
          this.parentShow = false
          let imgs = document.getElementById("childUrlReveal");  // 图片大小
          let imgBox = document.getElementById("childPic"); // div大小
          let face = val.face[this.numIndex];
          setTimeout(()=>{
            if(face.length){
              if( Number(face[2]) < Number(face[0])){
                let temp = face[0];
                face[0]= face[2];
                face[2] = temp;
              }
              if(Number(face[3]) < Number(face[1])){
                let temp = face[1];
                face[1]= face[3];
                face[3] = temp;
              }
              let faceLeft = Number(face[0]) + Number(val.leftTopX);
              let faceTop = Number(face[1]) + Number(val.leftTopY);
              let faceWidth = Number(face[2]) - Number(face[0]);
              let faceHeight = Number(face[3]) - Number(face[1]);
              let unit = 1;
              let faceLeftPos = 0;
              let faceTopPos = 0;
              if (faceWidth < 177 && faceHeight < 177) {
                faceTopPos = (177 - faceHeight) / 2;
                faceLeftPos = (177 - faceWidth) / 2;
              } else {
                if (1 < faceWidth / faceHeight) {
                  unit = faceWidth / 177;
                  faceLeftPos = 0;
                  faceTopPos = (177 - faceHeight / unit) / 2;
                } else {
                  unit = faceHeight / 177;
                  faceTopPos = 0;
                  faceLeftPos = (177 - faceWidth / unit) / 2;
                }
              }
              imgs.style.width = (val.imageWidth / unit )+"px";
              imgs.style.height = (val.imageHeight / unit)+"px";
              imgs.style.top =(-(faceTop / unit) + faceTopPos) +"px";
              imgs.style.left = (-(faceLeft / unit) + faceLeftPos )+"px";
            }
          },100)
        }
      },
      deep: true
    }
  },
  created () {

  },
  computed: {
    newpoints() {
      let arr = [];
      if (this.treeList !== null && this.treeList.length !== 0) {
        for (let i = 0; i < this.treeList.length; i++) {
          let apeToll = this.treeList[i].apeTollgates;
          let temp = arr.concat(apeToll);
          arr = temp;
        }
      }
      return arr;
    },
    //图片上所有人的位置坐标列表
    carList() {
      let cList = [];
      if (this.arrList.length) {
        for (let i = 0; i < this.arrList.length; i++) {
          cList.push({
            leftTopX: this.arrList[i].facePos.leftTopX,
            leftTopY: this.arrList[i].facePos.leftTopY,
            rightBtmX: this.arrList[i].facePos.rightBtmX,
            rightBtmY: this.arrList[i].facePos.rightBtmY
          });
        }
      }
      return cList;
    },

    //被选中勾选的识别信息名称,默认选中车辆位置
    checkFieldList() {
      let arr = ["vehiclePos"];
      for (let i = 0; i < this.checkList.length; i++) {
        switch (this.checkList[i]) {
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
    searchParams() {
      // console.log(this.vehicleKind,'车辆品牌的值');
      this.vehicleKindEntry
      this.getVehicleBrandEntry
      if(this.vehicleKind == null) {
        let vehicleKindArr = ''
        for(let i = 0; i < this.vehicleKindList.length; i++){
          vehicleKindArr +=  this.vehicleKindList[i].field + ','
          this.vehicleKindEntry = vehicleKindArr.slice(0,vehicleKindArr.length - 1)
        }
      }else{
        this.vehicleKindEntry = this.vehicleKind
      }

      if(this.vehicleBrandName == '不限'){
        let VehicleBrandKindArr = ''
        for (let i = 0; i < this.getVehicleBrandList.length; i++) {
           VehicleBrandKindArr +=  this.getVehicleBrandList[i].field + ','
          this.getVehicleBrandEntry = VehicleBrandKindArr.slice(0,VehicleBrandKindArr.length - 1)
        }
      }else{
        this.getVehicleBrandEntry = this.vehicleBrand
      }
      return {
        faceFeature: this.feature,
        tollgateIds: this.tollgateIds,
        vehicleKindCode: this.vehicleKindEntry,
        vehicleBrandCode: this.getVehicleBrandEntry,
        beginDateTime:this.beginDateTime,
        endDateTime:this.endDateTime
        // feature: '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',
        // tollgateIds: '0278479d174a4ceeb8766e7344abea23,0278479d174a4ceeb8766e7344abea24,0278479d174a4ceeb8766e7344abea25,0278479d174a4ceeb8766e7344abeafe,03d7292867a04359be8eb5b436bf69d8,041f829f4fc34955b20da7b1ac90b697,048dba5fb2b3428ba064d48a81670fa8,08b3bf52-af12-40b7-83a5-0dfdee40,1035ffbf4b7348f4849c8a6c7ef9393d,121E2963E9124D0F81165912B2175A5C,1317d849-3b65-42d1-a003-7e086f55,1902168a1027414f98272d2dfa8cf517,1a611300e8594a62b77d9bc8c5a58ab2,1b589ce3db4c42939a777513c34f6b8e,1C4BFB3DC1AC4FAF989CDAE74F9EF93A,1e2a44a6-bcb8-4aaf-bc13-78404948,28453DFB3B57428A8608FC68593344A6,307ba85203894fd78e00966596645ffd,35ad1dbfe2204e31971f1936d12ebb6c,35f3edf8cdef4b3e99c9604109c3647d,3849c76ef1cf435e9f302a12a1b9cf38,3eba8107-a5e1-4c69-9e6a-60639fcd,3fa0b232-d02e-480a-b2af-dc0e6193,4402d0bc-f8e4-4e3c-9a14-ffbc6ce8,4DB56ADC718143519BD06870AEF10DD3,50991756ca7045389d1c8a2f28e5030a,541B47CD1D9440C2B563738E2D131172,541e0467-81b9-4d52-8f82-0f1b8153,5504866379324322a40d774e13556369,5cc09c6f-8cb9-4464-8ace-a88f8fe1,68ff9b94-4790-47d4-b07a-233ef544,6915bb321a1b4aefa7dbc8aadbe999d1,730066F8DE19471CAE1C3FCE845935AE,738f4e54-11b7-45da-a124-967e0667,76f3b746686e4871a322653584260792,76FF271F594B4B4EB64064351084414D,7e3233f7858841c99b60074dbe659ff8,80DA25AB2ABC428B8676EA0F14ECDB8A,836abf1cb2c1437cbc257615fe5bd162,94737c90-9c72-42be-a1e3-c8e13fc1,964ac8c6-452a-42e7-aa79-47cf135c,9b1bb6bd-f379-4555-8307-9563d269,9d10a28117664c66a3c12f1b28f5fafe,9d50e94b429b4a1c831545116f51ba52,9e94c1fa-2320-4d7d-beb3-be0e9ead,a0494027-7ad4-4514-8956-43a08b6f,a7db812185bc4a6ba92ca7aea891ae0f,aacbd3f892fe40d797321350a4a39787,ad2bda4a-5bb0-4bb6-9eca-e77388ae,AE29C8E301FB402D9A8BC063ED66F079,b05a941edff543f581abdcb49114b6a6,b098cbe1eb684d4cbaaa428fa1f7b7fc,b63c364a-3d39-4462-a24f-0475ad3c,ba23414a-37f6-4140-96b0-8eb4d7f3,bb3c9f719ca04ed1bd4c0bf0a6d08852,BB6FD49ACC9C43319A6BAED8CA8BAF8E,c579fdf634c1449e94807fc716df4a77,c69d3fd512d943cb999e4dba21b42b71,c82c7a7695a747ca8db3b27d2449b290,d0aeaafa07744a2fa5488291e4a0f82c,d10e57fcb65b49d485e812f01be78886,d2b2238efc534381820b0b3791a6b069,d4826a3fd9b349f6bc5bfdee42a8f86b,d4f680c3-7b48-43d7-8a9e-a42f69e8,d5438f768e4f4a1db478f8b1fa580fdf,de537d20008645549e7545292c7fe80d,de8fdbb384ef46e7bc56bd68e09fbdba,e3100db7e1874dbcb9d8e858cb6114f1,e3efddb405f946b2b95807484f8f8749,e544c4e25c494e759e2b3c44c509124d,e95e3395afc64b758554a0f656089b2a,eb10affb39964cdc878eb0e580b1bbdd,eb822bdf8bf444e7976e64747007357a,ebac2438be0d4b78aab8334183230ab8,EBF17AD6047C42FFBF0B782C685B95F3,f955dda4671f477ba5ff3bb68e4ae040',
        // vehicleKindCode: 4,
        // vehicleBrandCode: 14,
        // beginDateTime:'2019-03-07 00:00:00',
        // endDateTime:'2019-03-13 00:00:00'
      };
    }
  },
  mixins: [vehicle, mapFun],
  methods: {
    changeSus(row){
      this.getAllFaceList(row.id)
    },
    searchMap(val1,val2){
      console.log(val2,11111111111);
      this.checked = false
      this.runLine(val2,this.color[0]);
      this.map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
      let trajectoryLongitude = ''
      let trajectoryLatitude = ''
      for(let i = 0; i < val2.length; i++){
        trajectoryLongitude = val2[i].longitude // 经度
        trajectoryLatitude = val2[i].latitude // 纬度
        trajectoryImg = val2[i].imageUrl
        console.log(trajectoryLongitude,trajectoryLatitude,666666666666);
        this.zuobiao2Pixel(trajectoryLongitude,trajectoryLatitude,trajectoryImg)
      }
    },
    //将坐标转换成坐标，返回包含像素的数组
    zuobiao2Pixel(trajectoryLongitude,trajectoryLatitude,trajectoryImg){
      let pixelArray = ''
      var point = new BMap.Point(trajectoryLongitude,trajectoryLatitude);
      var pixel = this.map.pointToPixel(point);
      console.log(pixel,333333333333);
    },


    vehicleType(row){
      this.getVehicleBrandEntry = ''
      if(row != null || row != '不限') {
        this.clearBand()
        this.showFirst = false
      }
      if(row == null || row == '不限'){
        this.getVehicleBrand( (res)=>{
          this.getVehicleBrandList = res.data.data;
        });
      }else{
        this.getVehicleBrandByKind(this.vehicleKind, (res)=>{
           this.getVehicleBrandList = res.data.data;
        });
      }
    },
    //得到人脸底库列表
    getAllFaceMan(){
      let data = {
        pageNum:1,
        pageSize:10000,
        orderBy:'',
        orderType:'',
        dbName:this.keyword
      }
      this.$http.get('sms/threeFaceDb/faceDbList',{params:data}).then(res=>{
        if(res.data.code == 200){
          this.faceData = res.data.data.data.list;
        }else{
          this.$notify({
            type: 'warning',
            message: res.data.message,
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    // // 点击查询
    // searchFace(){
    //   this.getAllFaceMan()
    // },
    // 查看人脸数据
    getAllFaceList(id){
      this.filelist = [];
      let data = {
        faceDbPrimaryKey:id
      }
      this.$http.get('sms/face/getXinFaceList',{params:data}).then(res=>{
        if(res.data.code == 200){
          if(res.data.data == null){
            this.faceArr = []
            this.totalCount = 0
          }else{
            this.faceArr = res.data.data;
            this.totalCount = Number(res.data.data.length);
          }
        }
      })
    },
    handleSizeChange(val){
      this.pageSize = val;
      this.currentPage = 1
    },
    handleCurrentChange(val){
      this.currentPage = val;
    },
    // 点击上传人脸
    uploadFace(item){
      this.clearAll()
      this.imgUrl = item.faceUrl
      setTimeout(()=>{
        this.imgWH()
      })
    },
    updateCheckedItem() {
      if (this.isCarHead === 0) {
        this.getCheckedItem([
          { name: "vehicleKind", checked: true },
          { name: "vehicleBrand", checked: true },
          "beginDateTime",
          "endDateTime"
        ]);
      } else {
        this.getCheckedItem([
          { name: "vehicleKind", checked: false },
          { name: "vehicleBrand", checked: false },
          "beginDateTime",
          "endDateTime"
        ]);
      }
    },
    getVehicleKindName() {
      this.vehicleKindList.map((item, idx) => {
        if (item.field == this.vehicleKind) {
          this.vehicleKindName = item.value;
        }
      });
    },
    clearBand() {
      this.vehicleBrandName = "不限";
      this.vehicleBrand = null;
    },
    refresh() {
      this.icoclick = true;
    } /* 保证在点击icon清空品牌框之后会重新请求一次车型*/,
    changeicoclick(data) {
      this.icoclick = data;
    },
    //获取子组件的数据
    getChildData(data1, data2, data3, data4, data5) {
      this.vehicleBrandName = data1;
      this.vehicleModel = data2;
      this.vehicleModelCode = data3;
      this.showSecond = data4;
      this.vehicleBrand = data5;
    },

    //关闭弹出层
    closeDialog(e) {
      let dialogFirst = document.getElementsByClassName("first")[0];
      if (dialogFirst.style.display !== "none") {
        let casWrapper = document.getElementsByClassName("casWrapper")[0];
        if (!casWrapper.contains(e.target)) {
          this.showFirst = false;
        }
      }
      let dialogSecond = document.getElementsByClassName("second")[0];
      if (dialogSecond.style.display !== "none") {
        let casWrapper = document.getElementsByClassName("casWrapper")[0];
        if (!casWrapper.contains(e.target)) {
          this.showSecond = false;
        }
      }
    },

    openUpload() {
      this.dialogVisible = true;
      this.arrList = []
    },

    clearAll() {
      this.cawqq = false;
      this.clearRect();
      this.clearFace();
    },
    // 清除canvas
    clearRect() {
      let photoCanvas = document.getElementById("photoCanvas");
      let photoContent = photoCanvas.getContext("2d");
      // photoContent.height = 0
      photoContent.clearRect( 0, 0, photoCanvas.clientWidth, photoCanvas.clientHeight);
    },
    clearFace() {
      let faceCanvas = document.getElementById("faceCanvas");
      let faceContent = faceCanvas.getContext("2d");
        // faceContent.height = 0
      faceContent.clearRect( 0, 0, faceCanvas.clientWidth, faceCanvas.clientHeight);
    },



    //保存人脸信息
    caveCanvas() {
      this.imgList = {}
      this.imgList= this.arrList[this.currentCar];
      this.dialogVisible = false
      this.imgUrlShow = this.imgUrl
      this.feature = this.imgList.feature;
    },
    //取消
    cancel() {
      this.dialogVisible = false;
      this.imgUrl = ''
      this.cawqq = false
      this.arrList = []
      this.clearRect()
    },

    imgWH() {
      let imgBox = document.getElementById("imgBox");
      let imgs = document.getElementById("imgItem");
      let photoCanvas = document.getElementById("photoCanvas");
      let faceCanvas = document.getElementById("faceCanvas");
      let imgw = imgs.naturalWidth;
      let imgh = imgs.naturalHeight;
      let retw = imgBox.clientWidth;
      let reth = imgBox.clientHeight;
      if (retw / reth < imgw / imgh) {
        imgs.style.width = "100%";
        imgs.style.height = "auto";
        this.unit = imgw / retw;
      } else {
        imgs.style.height = "100%";
        imgs.style.width = "auto";
        this.unit = imgh / reth;
      }
      photoCanvas.width = imgw / this.unit;
      photoCanvas.height = imgh / this.unit;
      faceCanvas.width = imgw / this.unit;
      faceCanvas.height = imgh / this.unit;
      this.getHands(photoCanvas);
    },
    // 传过来的人脸数据
    childbyface(row,index){
      this.dialogVisible = true;
      this.imgUrl = row.imageUrl
    },

    //画框开始
    getHands(canvas) {
      let faceCanvas = document.getElementById("faceCanvas");
      let faceContent = faceCanvas.getContext("2d");
      faceContent.clearRect( 0, 0, faceCanvas.clientWidth, faceCanvas.clientHeigth);
      var context = canvas.getContext("2d");
      context.beginPath();
      context.lineWidth = 2;
      var hasmove = false;
      canvas.onmousedown = e => {
        hasmove = false;
        setTimeout(() => {
          let ele = windowToCanvas(canvas, e.clientX, e.clientY);
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.one = ele.x;
          this.two = ele.y;
          canvas.onmousemove = e => {
            hasmove = true;
            if (hasmove) {
              let ele = windowToCanvas(canvas, e.clientX, e.clientY);
              context.clearRect(0, 0, canvas.width, canvas.height);
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
            //鼠标移动的时候
          };
        }, 50);
      };
      canvas.onmouseup = e => {
        if (hasmove) {
          canvas.onmousemove = null;
          if (
            Math.abs(this.three - this.one) < 10 &&
            Math.abs(this.four - this.two) < 10
          ) {
            this.$notify({
              type: "warning",
              message: "不满足智能标注要求,请重新框选或手工填写！",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
          context.stroke();
          this.handlable();
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height);
          canvas.onmousemove = null;
          // this.clearLable();
        }
        hasmove = false;
      };
      canvas.onmouseout = e => {
        if (e.screenX == 0) {
          canvas.onmousemove = null;
        } else {
          canvas.onmousemove = null;
        }
      };
    },
    handlable() {
      let canBox = document.getElementById("photoCanvas");
      let imgs = document.getElementById("imgItem");
      var imgw = imgs.naturalWidth;
      var imgh = imgs.naturalHeight;
      var canw = canBox.clientWidth;
      var canh = canBox.clientHeight;
      let x = parseInt((imgw * this.one) / canw);
      let y = parseInt((imgh * this.two) / canh);
      let w = parseInt((imgw * (this.three - this.one)) / canw);
      let h = parseInt((imgh * (this.four - this.two)) / canh);
      let data = {
        imgUrl: this.imgUrl,
        posX: x,
        posY: y,
        width: w,
        height: h
      };
      data = this.$qs.stringify(data);
      this.$http.post("/tvas/image/faceUpload", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.faceOutputInfoList.length == 0) {
            this.cawqq = false;
            this.clearFace();
          } else {
            this.cawqq = true;
            this.arrList = res.data.data.faceOutputInfoList;
            this.initListCanvas(this.arrList);
          }
        } else {
        }
      });
    },
    initListCanvas(faceArr) {
      if (faceArr.length) {
        //默认选中第一个人
        this.currentCar = 0; //显示第个人的信息
        this.faceWidth = faceArr[0].width;
        console.log(this.faceWidth,444444);
        this.faceHeight = faceArr[0].height;
        console.log(this.faceHeight,555555);
        //画出所有人的方框
        this.drawCarInfo(0);
      }
    },
    //框选人标识物
    drawCarInfo(pIndex) {
      this.clearFace();
      this.drawAllCar();
      this.drawCar(pIndex, "red");
    },
    drawAllCar() {
      if (!this.arrList.length) {
        return false;
      }
      var allImgData = this.arrList;
      for (let i = 0; i < allImgData.length; i++) {
        this.drawRect("root", allImgData[i], "yellow");
      }
    },
    drawCar(pIndex, color) {
      if (!this.arrList.length) {
        return false;
      }
      let parent = this.arrList[pIndex];
      this.drawRect("root", this.arrList[pIndex], color);
    },
     //根据坐标和宽高画框
    drawRect(parent, facePos, color) {
      if (!facePos) {
        return;
      }
      let faceCanvas = document.getElementById("faceCanvas");
      let faceContent = faceCanvas.getContext("2d");
      let x = facePos.facePos.leftTopX / this.unit;
      let y = facePos.facePos.leftTopY / this.unit;
      let w =
        (facePos.facePos.rightBtmX - facePos.facePos.leftTopX) / this.unit;
      let h =
        (facePos.facePos.rightBtmY - facePos.facePos.leftTopY) / this.unit;
      if (parent !== "root") {
        x = x + parent.leftTopX / this.unit;
        y = y + parent.leftTopY / this.unit;
      }
      faceContent.strokeStyle = color;
      faceContent.strokeRect(x, y, w, h);
    },

    //点击图片中人选中
    choiceCar(ev) {
      let imgItem = document.getElementById("imgItem");
      let offsetX = this.getPageMag(ev).pageX - $(imgItem).offset().left;
      let offsetY = this.getPageMag(ev).pageY - $(imgItem).offset().top;
      if (this.carList.length > 0) {
        for (let i = 0; i < this.carList.length; i++) {
          if (
            this.carList[i].leftTopX / this.unit < offsetX &&
            this.carList[i].rightBtmX / this.unit > offsetX &&
            this.carList[i].leftTopY / this.unit < offsetY &&
            this.carList[i].rightBtmY / this.unit > offsetY
          ) {
            this.currentCar = i;
          }
        }
      } else {
        return null;
      }
      this.oldCar = this.currentCar;
      this.drawCarInfo(this.currentCar);
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
    beforeAvatarUpload(file, a, b) {
      this.clearAll()
      if (
        file.type != "image/jpg" &&
        file.type != "image/jpeg" &&
        file.type != "image/bmp" &&
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/bmf"
      ) {
        this.$notify({
          type: "warning",
          message: "只能上传bmp/jpg/jpeg/png/gif/bmf格式图片！",
          position: "bottom-right",
          duration: 3000
        });
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let formData = new FormData();
      formData.append("files", file);
      this.$http({
        url: "/sms/uploadFile/upload",
        method: "post",
        data: formData
      }).then(res => {
        if (res.data.code == 200) {
          this.imgUrl = res.data.data[0];
          setTimeout(() => {
            this.imgWH();
          }, 100);
        } else {
          this.$notify({
            type: "error",
            message: res.data.message,
            position: "bottom-right",
            duration: 3000
          });
        }
      });
      return false;
    },

    //重置
    reset() {
      this.imgUrl = null;
      this.imgUrlShow = null;
      if (document.getElementById("simg")) {
        document.getElementById("simg").remove();
      }
      if (document.getElementById("photoCanvas")) {
        document.getElementById("photoCanvas").width = 0;
        document.getElementById("photoCanvas").height = 0;
      }
      if (document.getElementById("magCanvas")) {
        document.getElementById("magCanvas").width = 0;
        document.getElementById("magCanvas").height = 0;
      }
      if (document.getElementById("markCarCanvas")) {
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
      this.vehicleModel = "不限"; //车辆型号
      this.vehicleModelCode = null;
      this.vehicleColor = null;
      this.plateClass = null;
      this.plateNumber = null;
      this.plateNumberTxt = null;
      this.plateColor = null;
      this.beginDateTime =
        this.getDateString(
          new Date().getTime() - 6 * 24 * 60 * 60 * 1000
        ).split(" ")[0] +
        " " +
        "00:00:00"; //过车时段开始日期时间
      this.endDateTime = this.getCurrentDate().split(" ")[0] + " " + "23:59:59"; //过车时段结束日期时间

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
        year: new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
        ).getFullYear(),
        month: new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
        ).getMonth(), //关键
        date: new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
        ).getDate(),
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
    getCarData() {
      this.vehicleKindEntry = ''
      if(this.imgList == undefined || this.feature == undefined || !this.feature || this.feature == ''){
         this.$notify({
          type: "warning",
          message: "必须上传图片并识别图片上的人脸信息！",
          position: "bottom-right",
          duration: 3000
        });
        this.checked = false;
        this.arrawSwitch = false;
        return
      }
      //初始时关闭搜索结果
      this.checked = false;
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });

      //
      let params = this.searchParams;
      this.getVD("facePic", params, res => {
        this.searchResultDefault = res.data.data
        this.totalNum = this.searchResultDefault.length
        this.oldParams = this.searchParams;
        if (this.searchResultDefault.length == 0) {
          this.$notify({
            type: "info",
            message: "抱歉，未查询到符合条件的数据！",
            position: "bottom-right",
            duration: 3000
          });
          this.checked = false;
          this.arrawSwitch = false;
        } else {
          this.checked = true;
          this.arrawSwitch = true;
        }
      });
    },

    //放大镜
    getScrollMag() {
      let scrollLeft =
        document.body.scrollLeft || document.documentElement.scrollLeft;
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    },
    // 获取鼠标在页面的位置，处理浏览器兼容性
    getPageMag(e) {
      let pageX = e.pageX || e.clientX + this.getScrollMag().scrollLeft;
      let pageY = e.pageY || e.clientY + this.getScrollMag().scrollTop;
      return {
        pageX: pageX,
        pageY: pageY
      };
    },
    setMagMaskPos(e) {
      e = e || window.event;
      let box = document.getElementById("imgBox");

      let boxImg = document.getElementById("imgItem");
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

      maskX =
        maskX > boxImg.clientWidth - mask.clientWidth
          ? boxImg.clientWidth - mask.clientWidth
          : maskX;
      maskY =
        maskY > boxImg.clientHeight - mask.clientHeight
          ? boxImg.clientHeight - mask.clientHeight
          : maskY;

      mask.style.left = maskX + boxImg.offsetLeft + "px";
      mask.style.top = maskY + boxImg.offsetTop + "px";

      let unit = $(magImg).width() / $(boxImg).width();

      let magImgX = maskX * unit;
      let magImgY = maskY * unit;

      magImg.style.left = -magImgX + "px";
      magImg.style.top = -magImgY + "px";
      magCanvas.style.left = -magImgX + "px";
      magCanvas.style.top = -magImgY + "px";
    },
    openMag(e) {
      if (!this.imgUrl) {
        return;
      }
      let boxImg = document.getElementById("imgItem");
      let mask = document.getElementById("mask");

      let magImg = document.getElementById("magImg");
      let bigBox = document.getElementById("Magnifier");

      let box = document.getElementById("photoCvs");
      bigBox.style.display = "block";
      bigBox.style.left = $(box).width() + "px";
      bigBox.style.top = "0.34rem";

      let maskW = ($(bigBox).width() * $(boxImg).width()) / $(magImg).width();
      let maskH =
        ($(bigBox).height() * $(boxImg).height()) / $(magImg).height();
      mask.style.width = maskW + "px";
      mask.style.height = maskH + "px";
    },
    closeMag(e) {
      let bigBox = document.getElementById("Magnifier");
      bigBox.style.display = "none";
    },
    //根据坐标和宽高画框
    drawRectMarkCar(parent, facePos, color) {
      if (!facePos) {
        return;
      }
      let markCarCanvas = document.getElementById("markCarCanvas");
      let pCtx3 = markCarCanvas.getContext("2d");
      pCtx3.clearRect(0, 0, markCarCanvas.width, markCarCanvas.height);

      let x3 = facePos.leftTopX / this.markCarUnit;
      let y3 = facePos.leftTopY / this.markCarUnit;
      let w3 = (facePos.rightBtmX - facePos.leftTopX) / this.markCarUnit;
      let h3 = (facePos.rightBtmY - facePos.leftTopY) / this.markCarUnit;
      if (parent !== "root") {
        x3 = x3 + parent.leftTopX / this.markCarUnit;
        y3 = y3 + parent.leftTopY / this.markCarUnit;
      }
      pCtx3.strokeStyle = color;
      pCtx3.strokeRect(x3, y3, w3, h3);
    },
    windowToCanvas(canvas, x, y) {
      let rect = canvas.getBoundingClientRect();
      return {
        x: x - rect.left * (canvas.width / rect.width),
        y: y - rect.top * (canvas.height / rect.height)
      };
    },
    getCoord() {
      this.allowCoord = true;
      let markCar = document.getElementById("markCar");
      let markCarCanvas = document.getElementById("markCarCanvas");
      let context = markCarCanvas.getContext("2d");
      context.beginPath();
      context.lineWidth = 2;
      this.rectList = [];

      markCarCanvas.onmousedown = e => {
        if (!this.allowCoord) {
          return false;
        }
        let ele = this.windowToCanvas(markCarCanvas, e.clientX, e.clientY);
        this.one = ele.x;
        this.two = ele.y;

        markCarCanvas.onmousemove = e => {
          //鼠标移动的时候
          let ele = this.windowToCanvas(markCarCanvas, e.clientX, e.clientY);
          context.clearRect(0, 0, markCarCanvas.width, markCarCanvas.height);
          this.drawRectMarkCar(
            "root",
            this.imgData.data[this.currentCar].vehiclePos,
            "red"
          );
          for (let j = 0; j < this.rectList.length; j++) {
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
        };
      };
      markCarCanvas.onmouseup = e => {
        if (!this.allowCoord) {
          return false;
        }
        markCarCanvas.onmousemove = null;
        context.stroke();
        this.rectList.push({
          one: this.one,
          two: this.two,
          three: this.three,
          four: this.four
        });
      };
    },
    //清空标注
    clearCoord() {
      this.drawRectMarkCar(
        "root",
        this.imgData.data[this.currentCar].vehiclePos,
        "red"
      );
      this.rectList = [];
    },
    saveCoord() {
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
      if (this.plateNumber == "@" || this.plateNumber == "未识别") {
        this.plateNumber = null;
      }

      this.allowCoord = false;
      this.dialogVisible = false;
      this.markCarVisible = false;
    },
    saveCoordCarImg() {
      this.imgUrlShow = this.imgUrl;
      let imgs = document.getElementById("imgUrlShow");
      let imgBox = document.getElementById("childPic");
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
        posTop = (reth - imgh / unit) / 2;
      } else {
        unit = imgh / reth;
        posTop = 0;
        posLeft = (retw - imgw / unit) / 2;
      }
      imgs.style.width = currentCarData.imageWidth / unit + "px";
      imgs.style.height = currentCarData.imageHeight / unit + "px";
      imgs.style.top = -(leftTopY / unit) + posTop + "px";
      imgs.style.left = -(leftTopX / unit) + posLeft + "px";

      let png = document.getElementById("markCarCanvas").toDataURL("image/png");
      let simg = document.getElementById("simg");
      if (!simg) {
        simg = document.createElement("img");
      }
      simg.src = png;
      simg.id = "simg";
      simg.style.position = "absolute";
      simg.style.width = imgs.style.width;
      simg.style.height = imgs.style.height;
      simg.style.top = imgs.style.top;
      simg.style.left = imgs.style.left;
      imgBox.appendChild(simg);
    },
    closeMarkCar() {
      this.allowCoord = false;
      this.markCarVisible = false;
      if (document.getElementById("simg")) {
        document.getElementById("simg").remove();
      }
    }
  },
  mounted: function() {
    this.getTreeData();
    this.getAllFaceMan()
    this.faceSearchList = this.$route.query.faceSearchList; // 综合搜车人脸跳转到人脸搜车
    if(this.faceSearchList){
      this.dialogVisible = true;
      this.imgUrl = this.faceSearchList.imageUrl
      // this.imgList = {}
      // this.imgList = this.faceSearchList
      // this.numIndex = this.$route.query.index // 索引
      // this.imgUrlShow = this.imgList.imageUrl
      setTimeout(() => {
        this.imgWH();
      }, 100);
    }


    this.getWeekDay();
    this.getCheckedItem(["beginDateTime", "endDateTime"]);

    let imgUrl = this.$router.currentRoute.query.imgUrl;
    if (imgUrl) {
      this.dialogVisible = true;
      this.imgUrl = imgUrl;
      let params = {
        imgUrl: imgUrl
      };
      let data = this.$qs.stringify(params);
      this.uploadloading = this.$loading({
        text: "正在上传...",
        spinner: "el-icon-loading",
        target: "#imgBox"
      });
      this.$http.post("/tvas/image/upload", data).then(res => {
        this.uploadloading.close();
        if (res.data.code == 200) {
          this.imgUrl = imgUrl;
          this.imgUrlShow = "";
          this.imgData = res.data;
          // this.initCanvas();
        } else if (res.data.code == 801) {
          this.imgUrl = imgUrl;
          this.imgUrlShow = "";
          this.imgData = {
            code: "",
            message: "",
            data: []
          };
          // this.initCanvas();
          //this.$alert("图片识别失败", "消息提示");
          this.$notify({
            type: "error",
            message: "图片自动识别失败！",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('图片自动识别失败！',{icon:5,title:"消息提示"});
        } else if (res.data.code == 802) {
          this.$notify({
            type: "error",
            message: "图片上传失败！",
            position: "bottom-right",
            duration: 3000
          });
        } else if (res.data.code == 803) {
          this.$notify({
            type: "error",
            message: "图片格式不正确！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "error",
            message: res.data.message,
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    }

    //初始获取车辆类型列表
    this.getVehicleKind(res => {
      this.vehicleKindList = res.data.data;
    });
    //初始获取车辆品牌列表
     this.getVehicleBrand(res => {
      this.getVehicleBrandList = res.data.data;
    });
    //获取车辆品牌id
     this.getVehicleModelByBrand(res => {
      this.getVehicleModelByBrandList = res.data.data;
    });
    let _this = this;
    _this.getLocalCoordinate();
    _this.loadMap();

    this.motorBegin = laydate.render({
      elem: "#motorBegin",
      type: "datetime",
      //min: -90, //90天前
      max: this.motorEndTime, //0天后
      btns: ["confirm"],
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
        let maxDate = new Date(value).getTime() + 24 * 60 * 60 * 1000;
        if (new Date().getTime() > maxDate) {
          _this.motorEndTime = _this.getDateStrings(maxDate);
          _this.motorEnd.config.max = {
            year: new Date(maxDate).getFullYear(),
            month: new Date(maxDate).getMonth(), //关键
            date: new Date(maxDate).getDate(),
            hours: new Date(maxDate).getHours(),
            minutes: new Date(maxDate).getMinutes(),
            seconds: new Date(maxDate).getSeconds()
          };
        } else {
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
      btns: ["confirm"],
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
      max: this.endDateTime, //0天后
      btns: ["now", "confirm"],
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
        let time = Number(_this.searchCarMaxDays) - 1;
        let maxDate = new Date(value).getTime() + time * 24 * 60 * 60 * 1000;
        if (new Date().getTime() > maxDate) {
          _this.endDateTime = _this.getDateString(maxDate);
          _this.timeEnd.config.max = {
            year: new Date(maxDate).getFullYear(),
            month: new Date(maxDate).getMonth(), //关键
            date: new Date(maxDate).getDate(),
            hours: new Date(maxDate).getHours(),
            minutes: new Date(maxDate).getMinutes(),
            seconds: new Date(maxDate).getSeconds()
          };
        } else {
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
      btns: ["now", "confirm"],
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
      document
        .querySelector("body")
        .addEventListener("click", this.closeDialog);
      document.querySelector("body").addEventListener("click", this.closeBar);
    });
  },
  beforeDestroy() {
    document
      .querySelector("body")
      .removeEventListener("click", this.closeDialog);
    document.querySelector("body").addEventListener("click", this.closeBar);
  }
};
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
.dialog >>> .el-dialog__footer {
  border-top: 1px solid #d5dade;
  text-align: center;
}
.dialog >>> .el-button + .el-button {
  margin-left: 0.5rem;
}
.dialog >>> .el-button {
  padding: 0.1rem 0.2rem;
  font-size: 0.16rem;
}
.uploadPhoto >>> .el-upload-list {
  display: none;
}
.searchImg div {
  width: 3.17rem;
  height: 1.77rem;
  border: 1px solid #1c3f67;
  position: relative;
  overflow: hidden;
}
.searchPic div{
  position: relative;
  margin: 0 auto;
  width: 1.77rem;
  height: 1.77rem;
}

.imgPicture {
  position: absolute;
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
  border: 1px solid #1c3f67;
  border-top: 0px;
  cursor: pointer;
}

.photoWrap {
  display: flex;
  justify-content: space-between;
  background-color: rgba(16, 35, 56, 0.5);
}
.photoWrap .photo {
  position: relative;
  width: 6rem;
  margin-left: 0.2rem;
  /*overflow: hidden;*/
}
.photoWrap .photo .showImg {
  position: relative;
  /*width: 7.2rem;*/
  height: 4rem;
  border: 1px solid #1f4572;
  border-bottom: none;
}
.photoWrap .photo .showImg img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.showPhoto {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  /* opacity: 1; */
}
.facePhoto {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  /* opacity: 1; */
  z-index: 2;
}
.photoWrap .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.74rem;
}
.photoWrap .info .infoItem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.photoWrap .info .infoItem .vinfolist,
.photoWrap .info .infoItem .carItemInfo {
  padding: 0.1rem 0 0.1rem 0.1rem;
  /* background-color:#F6F7FB; */
}
.photoWrap .info .infoItem .carItemInfo {
  height: 2.35rem;
  margin-bottom: 0.1rem;
  overflow-y: auto;
}
.photoWrap .uploadPhoto {
  /* margin-top:0.1rem; */
  padding: 0.1rem 0;
  text-align: center;
  border: 1px solid #1f4572;
  border-top: none;
  background: rgba(0, 0, 0, 0.2);
}

.photoWrap .smallT {
  display: block;
  margin-bottom: 0.1rem;
  color: #409eff;
  font-size: 0.16rem;
  line-height: 0.24rem;
  font-weight: bold;
  padding-left: 0.1rem;
}

.carItemInfo .carItem {
  padding-left: 0;
  margin-top: 0.1rem;
  color: #409eff;
  line-height: 0.19rem;
  font-size: 0.14rem;
}
.carItemInfo .carItem >>> .el-checkbox__label {
  display: inline-block;
  padding-left: 0.1rem;
  line-height: 0.19rem;
  font-size: 0.14rem;
}
.carItemInfo .carItem span {
  color: #409eff;
}
.carItemInfo .carItem.unde {
  color: #999;
}
.carItemInfo .carItem label {
  margin-right: 0.1rem;
}
.carItemInfo .carItem span:last-child {
  float: right;
  width: 1rem;
  text-align: center;
}
.vinfolist p {
  color: #99c9fa;
  font-size: 0.14rem;
  line-height: 0.22rem;
}
.vinfolist p:first-child span {
  color: #f56c6c;
}
.magnifier {
  position: absolute;
  display: none;
  width: 3rem;
  height: 3rem;
  z-index: 2;
  border: 1px solid #f6f7fb;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
}

.magnifier img {
  position: absolute;
}
.magnifier canvas {
  position: absolute;
}
.mask {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  /*background:rgba(255,255,255,0.5);*/
  /*cursor: move;*/
}
.showImg:hover .mask {
  display: block;
}
.markCarDialog {
  position: absolute;
  top: 15vh;
  left: 0;
  right: 0;
  bottom: 0;
  width: 10.68rem;
  height: 6.8rem;
  margin: 0 auto;
  background: #fff;
  z-index: 9999;
  border: 2px solid #2e3f51;
  background: url("../../assets/updataImg/home-bg.png") center;
}
.markCarDialog .title {
  padding: 20px 20px 10px;
  /* background: #f3f6f8; */
  background-color: #113254 !important;
  font-size: 0.2rem;
  border-bottom: 1px solid #13436e;
  /* line-height: 24px; */
  /* font-size: 18px; */
  color: #fff;
}
.markCarDialog .close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #909399;
}
.markCarFooter {
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid #12385b;
}
.markCarFooter .el-button {
  padding: 0.1rem 0.2rem;
  font-size: 0.16rem;
}
.markCarFooter .el-button + .el-button {
  margin-left: 0.5rem;
}
.markCarContent {
  width: 100%;
  padding: 0.1rem;
  overflow: hidden;
}
.markCar {
  /*float: left;*/
  position: relative;
  width: 10.06rem;
  cursor: crosshair;
  height: 5.2rem;
  margin: 0 auto;
  border: 1px solid #1f4572;
  overflow: hidden;
}
.markCar img {
  position: absolute;
}
.markCar canvas {
  position: absolute;
}
.markCarInfo {
  float: right;
  width: 2.76rem;
  height: 5.2rem;
  display: flex;
  flex-direction: column;
}
.markCarInfo .infoItem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.markCarInfo .infoItem .carItemInfo {
  padding-left: 0.1rem;
  background-color: #f6f7fb;
}
.markCarInfo .infoItem .carItemInfo {
  height: 4.6rem;
  overflow-y: auto;
}
.markCarInfo .smallT {
  display: block;
  margin-bottom: 0.1rem;
  color: #409eff;
  font-size: 0.16rem;
  line-height: 0.24rem;
  font-weight: bold;
  padding-left: 0.1rem;
}

.el_btn {
  padding: 0.14rem 0;
  display: flex;
  justify-content: space-around;
}
.el_btn .el-button {
  padding: 0.1rem 0.2rem;
  font-size: 0.14rem;
}
.searchPic{
  position: relative;
}
.imgprint{
  position: absolute;
}
.navBar{
  position: relative;
  width: 6.15rem;
  border-left: 5px solid #1f4572;
}
.navLeft{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 0.075rem;
  margin-bottom: 0.075rem;
  padding-left: 0.2rem;
}
.navCenter{
  width: 5.7rem;
  height: 4.54rem;
  margin: 0 auto;
  border: 1px solid #1f4572;
}
.showface ul{
  height: 4rem;
  overflow: auto;
}
.showface ul li{
  float: left;
  width: 32.33%;
  margin-right: 1%;
  border: 1px solid rgba(38, 85, 134, 0.32);
  background-color: rgba(28,60,95,0.32);
  margin-bottom: 0.05rem;
  height: 1.8rem;
  position: relative;
}
.showface ul li:nth-child(3n){
  margin-right: 0;
}
.showface li img{
  width: 100%;
  height: 100%;
}
.uploadpage{
  padding: 0.1rem 0;
  text-align: center;
  border-top:none;
  background:rgba(0,0,0,.2)
}

</style>
