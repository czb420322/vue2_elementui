<!--
 * @Author: your name
 * @Date: 2020-11-10 10:23:41
 * @LastEditTime : 2021-07-08 14:10:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha-1.63\vacp-wfes\src\page\casestudy\searchPrint.vue
 -->
<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        class="sysname"
        :to="{path:'/videoStrucPlat',query:{menuCode:700}}"
        style="z-index:999"
      >首页 ></router-link>
      <p class="sysname">&nbsp;以图搜图</p>
      <p class="clicklink">
        <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/resourceManage',query:{menuCode:704}}"
        >涉案视频管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/taskManage',query:{menuCode:701}}">任务管理</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/semanticSearch',query:{menuCode:702}}"
        >特征搜索</router-link>
        <!-- <router-link tag="span" :to="{path:'/videoStrucPlat/searchPrint',query:{menuCode:703}}">以图搜图</router-link> -->
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/videoRetrieval',query:{menuCode:710}}"
        >检索查询</router-link>
         <router-link tag="span" :to="{path:'/videoStrucPlat/caseList',query:{menuCode:711}}">案件管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/MarkPool',query:{menuCode:712}}">标注池</router-link>
      </p>
    </div>
    <div class="mainContent">
      <div class="content">
        <div class="content-top">
          <div class="content-left" @click="openSearchCases" id="searchPerson">
            <i class="el-icon-plus"></i>
            <img :src="imgurl" id="imgPerson" style="object-fit:contain">
          </div>

          <div class="content-right content-right1">
            <ul class="searchCondition_ul">
              <li style="width:3rem">
                <span class="demonstration">选择阈值范围:</span>
                <el-slider
                id="elslider"
                  input-size="mini"
                  v-model="includeThreshold"
                  @change="includeThresholdHandler"
                  :format-tooltip="formatTooltip"
                  :max="99"
                ></el-slider>
              </li>
              <li>
                <span>
                  开始时间：
                  <i></i>
                </span>
                <input type="text" v-model="beginDatas" id="globalbegin" placeholder="请输入开始时间">
              </li>
              <li>
                <span>
                  结束时间：
                  <i></i>
                </span>
                <input type="text" v-model="endDatas" id="globalend" placeholder="请输入结束时间">
              </li>
              <li>
                <div style="float:left">
                  <span>区域：</span>
                </div>
                <el-select
                  v-model="regionArea"
                  filterable
                  multiple
                  class="searcharea"
                  collapse-tags
                  @change="selectRegionArea"
                >
                  <el-option
                    v-for="item in pointList"
                    :key="item.deviceUuid"
                    :label="item.cameraName"
                    :value="item.deviceUuid"
                  >{{item.cameraName}}</el-option>
                </el-select>
              </li>
              <li style="margin-top:-3px">
                <el-button type="primary" class="searchBtn" @click="searchFeatureResult()">查询</el-button>
              </li>
              <li style="margin-top:-3px">
                <el-button type="info" class="tryBtn" @click="clearValue">重置</el-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 检索结果展示区域 -->
      <div class="searchResult">
        <div class="searchResult-left">
          <p class="sortrank">
            <span>排序：</span>
            <el-radio v-model="radio" label="1" @change="changeSearchResult(1)">降序</el-radio>
            <el-radio v-model="radio" label="0" @change="changeSearchResult(0)">升序</el-radio>
            <span class="addPool">点击搜索结果图片加入线索池</span>
          </p>
          <ul class="searchResult-left-ul">
            <li
              v-for="(item,index) in retrieveResult.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :key="index"
            >
              <div class="searchResult-left-ulbox" :class="{'isactive' : isactive == index}">
                <div class="showbox">
                  <!-- <img :src="item.traceImgUrl" alt style="object-fit:contain"> -->
                  <img
                    v-if="!item.faceImgUrl"
                    :src="item.traceImgUrl"
                    style="object-fit:contain"
                    @mouseover.stop="getInfo(item,$event)"
                    @mouseout.stop="leaveProperty"
                    @click.stop="addCluePool(item)"
                  >
                  <img
                    v-if="item.faceImgUrl"
                    :src="item.faceImgUrl"
                    @mouseover.stop="getInfo(item,$event)"
                    @mouseout.stop="leaveProperty"
                    style="object-fit:none"
                    @click.stop="addCluePool(item)"
                  >
                  <p
                    class="play none"
                    title="播放"
                    @click="playvideo(item,index)"
                    v-preventReClick="1500"
                  ></p>
                  <span class="simila">相似度：{{item.similarity | formatasimila}}</span>

                    <span title="下载" @click="downloadPic(item)" class="tagconvert download el-icon-download "></span>
                    <span title="快捷搜索" @click="fastSearchResult(item)" class="tagconvert fastsearch el-icon-search"></span>
                    <span title="查看大图" @click="lookBigImage(item)" class="tagconvert view el-icon-view"></span>

                  <!-- <span class="loadPic" title="下载" @click.stop="downloadPic(item)"></span> -->
                  <!-- <span class="tagconvert" title="快捷搜索" @click="fastSearchResult(item)"></span> -->
                  <!-- <span class="bigImage" title="查看大图" @click.stop="lookBigImage(item)"></span> -->
                </div>
              </div>
            </li>
          </ul>
          <el-pagination
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[24,32]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
        <div class="searchResult-right">
          <p class="sortrank">线索池</p>
          <ul class="searchResult-ll">
            <li v-for="(item,index) in allcluepoole" :key="index">
              <div>
                <span class="overHi" :title="item.cameraName">地点：{{item.cameraName}}</span>
                <span class="deletes el-icon-close" @click="delPoolItem(item)"></span>
                <div class="threadPic">
                  <img :src="item.traceImgUrl" v-if="typeflag != 4" style="object-fit:contain">
                  <img :src="item.faceImgUrl" v-if="typeflag == 4" style="object-fit:none">
                </div>
              </div>
            </li>
          </ul>

          <div class="searchClc" align="center">
            <el-button class="searchBtn" size="small" @click="clearPoolList">清空</el-button>
            <el-button class="searchBtn" size="small" @click="checkTrack">查看轨迹</el-button>
            <el-button class="searchBtn" size="small" @click="downloadAll">线索下载</el-button>
            <el-button class="searchBtn" size="small" @click="saveHandler" :disabled="typeflag == 4">转标注</el-button>
          </div>
        </div>
      </div>
    </div>

    <map-dialog :mapVisible="mapVisible" :mapData="mapData" :targetType="typeflag"></map-dialog>
    <identifyImage
      :openSearchCase="openSearchCase"
      @childsearch="childsearch"
      :isLabelIn="isLabelIn"
      :snapPic="snapPic"
    ></identifyImage>
    <structDxplayer @childybynext="childybynext" @childybyprev="childybyprev" ref="structDxplayer"></structDxplayer>

    <form
      action="vsas/structure/download/structure/downloadZip"
      method="post"
      id="downLoadPid"
      v-show="false"
    >
      <input type="text" :value="ids" name="ids">
      <input type="text" :value="typeflag" name="type">
    </form>
    <form
      action="vsas/structure/download/structure/downloadZip"
      method="post"
      id="downLoadId"
      v-show="false"
    >
      <input type="text" :value="allIds.join(',')" name="ids">
      <input type="text" :value="typeflag" name="type">
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import "../../common/laydate/laydate.js";
import _ from "lodash";
import identifyImage from "./identifyImage.vue";
import mapDialog from "./mapDialog";
import benginend from "../../api/realvideo/BenEedTime.js";
import structDxplayer from "./StructDxPlayer/StructDxplayer";
export default {
  components: {
    mapDialog,
    identifyImage,
    structDxplayer
  },
  props: {},
  data() {
    return {
      beginDatas: "", //开始时间
      endDatas: "", //结束时间
      includeThreshold: 0,
      radio: "1",
      mapVisible: false, // 地图弹层
      currentPage: 1,
      pageSize: 24,
      totalCount: 0,
      retrieveResult: [],
      openSearchCase: false, //是否打开图片上传
      imgurl: "", //上传图片显示地址
      allcluepoole: [], //线索池
      mapData: [], // 轨迹数组
      regionArea: [], //区域
      pointList: [], //区域集合
      caseUuid: "",
      typeflag: 1,
      loading: null,
      ids: "",
      allIds: [],
      isactive: null, //新增当前点击选中项目
      snapPic: "",
      isLabelIn: false,
      tagConvertIds: [],
      tagDataList: []
    };
  },
  filters: {
    formatasimila(val) {
      return (val * 100).toFixed(0) + "%";
    }
  },
  mixins: [benginend],
  created() {
        OnExit();
        CloseVodPlayer();
  },
  destroyed() {},
  watch: {
    radio(val) {
      this.changeSearchResult(val);
    }
  },
  methods: {
    ...mapMutations([
      "setshowzkyinfo", //是否显示zky结构化信息
      "setzkytargetinfo", //zky赋值
      "setshowlookImgPic", //查看大图的控制
      "setDxplayerInfo", //传入播放的值
      "setshowStructDxplayer" //是否打开播放器
    ]),
    /*
        1.22新增以图搜图播放
        */
    playvideo(row, index) {
      this.isactive = index;
      row.playtype = 3;
      this.setDxplayerInfo(row); //给播放器赋值
      this.setshowStructDxplayer(true); //打开播放器
      //给当前时间赋值
    },
    //上一个播放
    childybyprev(val) {
      let arr = this.retrieveResult.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      if (this.isactive > 0) {
        this.isactive--;
        this.$refs.structDxplayer.playvideo(arr[this.isactive]);
      } else {
        if (this.currentPage == 1) {
          this.$notify({
            type: "warning",
            message: "已经到了第一个！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.currentPage--;
          this.handleCurrentChange(this.currentPage);
          this.isactive =
            this.retrieveResult.slice(
              (this.currentPage - 1) * this.pageSize,
              this.currentPage * this.pageSize
            ).length - 1;
          arr = this.retrieveResult.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );
          this.$refs.structDxplayer.playvideo(arr[this.isactive]);
        }
      }
    },
    //下一个播放
    childybynext(val) {
      let arr = this.retrieveResult.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      // 1、先判断当前索引是否比当前后台返回的总条数大
      // 例如：this.isactive == 1(索引)  arr.length == 10
      //如果小，则直接播放下一个
      //否则就先翻页
      if (this.isactive < arr.length - 1) {
        this.isactive++;
        this.$refs.structDxplayer.playvideo(arr[this.isactive]);
      } else {
        //翻页之前先判断是否是最后一页
        // 则是最后一页，给提示，已经到了最后一页，
        if (
          this.currentPage >=
          Math.ceil(this.retrieveResult.length / this.pageSize)
        ) {
          this.$notify({
            type: "warning",
            message: "已经到了最后一个！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          //否则分页++执行后台分页请求，接着播放下一个
          this.currentPage++;
          this.handleCurrentChange(this.currentPage);
          this.isactive = 0;
          arr = this.retrieveResult.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );
          this.$refs.structDxplayer.playvideo(arr[this.isactive]);
        }
      }
      // this.handleCurrentChange(val)
    },

    formatTooltip(val) {
      return "阈值相似度调整：" + val + "%";
    },
    includeThresholdHandler(val) {
      this.includeThreshold = val;
      this.searchFeatureResult()
    },
    //鼠标移动的时候展示格林森瞳结构化的详细信息
    getInfo(item, e) {
      if (this.typeflag == 1) {
        item.zkytype = 1;
        this.setzkytargetinfo(item);
      } else if (this.typeflag == 2) {
        item.zkytype = 2;
        this.setzkytargetinfo(item);
      } else if (this.typeflag == 3) {
        item.zkytype = 3;
        this.setzkytargetinfo(item);
      } else if (this.typeflag == 4) {
        let obj = {};
        obj.faceObj = item;
        obj.zkytype = 4;
        this.setzkytargetinfo(obj);
      }
      this.setshowzkyinfo(true);
      document.getElementById("zkyinfo").style.left = e.clientX + 50 + "px";
      //   document.getElementById("zkyinfo").style.top = e.clientY - 170 + "px";
      document.getElementById("zkyinfo").style.top = e.clientY - 80 + "px";
    },
    leaveProperty() {
      this.setshowzkyinfo(false);
    },
    getRegionArea(caseUuid) {
      let data = {
        caseUuid: caseUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/allDeviceUuidStruct", data).then(res => {
        this.pointList = res.data.data;
      });
    },
    selectRegionArea(val) {
      this.regionArea = val;
    },
    getpropers(type, id, arr) {
      let data = {
        attributeType: type,
        attributeId: id
      };
      this.$http
        .get("vsas/structure/getDictionaryZkyList", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.array = res.data.data;
            arr = this.array;
          }
        });
    },
    openSearchCases() {
      this.openSearchCase = true;
    },
    //轨迹重现
    checkTrack() {
      if (!this.allcluepoole.length) {
        this.$notify({
          type: "warning",
          message: "请将目标加入进线索池后再查看轨迹!",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.mapData = this.allcluepoole.sort((a, b) =>
        new Date(b.fileStartTime).getTime() + b.appearTime + b.offset * 1000 <
        new Date(a.fileStartTime).getTime() + a.appearTime + a.offset * 1000
          ? 1
          : -1
      );
      this.mapVisible = true;
    },
    // 清空线索池
    clearPoolList() {
      this.allcluepoole = [];
    },
    //切换搜索结果
    changeSearchResult(num) {
      if (num == 0) {
        this.retrieveResult = this.retrieveResult
          .slice(0)
          .sort((a, b) => (b.similarity < a.similarity ? 1 : -1));
      } else if (num == 1) {
        this.retrieveResult = this.retrieveResult
          .slice(0)
          .sort((a, b) => (b.similarity > a.similarity ? 1 : -1));
      }
      this.currentPage = 1;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    childsearch(row1, row2, row3, flag) {
      this.openSearchCase = row3;
      this.typeflag = flag;
      this.allcluepoole = [];
      // 对特征进行赋值
      this.zkyFeature = row1.Feature;
      this.$nextTick(() => {
        let imgs = document.getElementById("imgPerson"); //图片大小
        let imgBox = document.getElementById("searchPerson"); //div大小
        let leftTopX = row1.RegionLeft; //目标相对图片的横坐标
        let leftTopY = row1.RegionTop; //目标相对图片的纵坐标
        let imgw = row1.RegionWidth; //目标相对图片的宽度
        let imgh = row1.RegionHeight; //目标相对图片高度
        let retw = imgBox.clientWidth; //div的实际宽度
        let reth = imgBox.clientHeight; //div的实际高度
        let unit = 1; //图片和div的默认比例
        let posLeft = 0;
        let posTop = 0;
        //通过图片宽高比以及图片的实际比计算出人物的比率
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
        } else {
          unit = imgh / reth;
        }
        // 通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
        imgs.style.width = row1.SrcImageWidth / unit + "px";
        imgs.style.height = row1.SrcImageHeight / unit + "px";
        imgs.style.top = -(leftTopY / unit) + posTop + "px";
        imgs.style.left = -(leftTopX / unit) + posLeft + "px";
        this.imgurl = row2;
      });
    },
    // 重置
    clearValue() {
      this.zkyFeature = "";
      this.imgurl = "";
      this.beginDatas = "";
      this.endDatas = "";
      this.retrieveResult = [];
      this.totalCount = 0;
      this.allcluepoole = [];
      this.currentPage = 1;
      this.pageSize = 24;
      this.typeflag = 1;
      this.zkyFeature = "";
      this.regionArea = [];
      this.includeThreshold = 0;
      let imgs = document.getElementById("imgPerson");
      imgs.style.width = 0;
      imgs.style.height = 0;
      this.getTimeTobes();
    },
    searchFeatureResult() {
      if (
        this.imgurl == "" ||
        this.imgurl == undefined ||
        this.imgurl == null
      ) {
        this.$notify({
          type: "warning",
          message: "请先上传图片!",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.beginDatas == "" || this.endDatas == "") {
        this.$notify({
          type: "warning",
          message: "请选择开始时间和结束时间",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
     this.radio = '1'
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正在查询..."
      });
      this.currentPage = 1;
      this.retrieveResult = [];
      let data = {
        feature: this.zkyFeature, // 特征
        featureFlag: this.typeflag, // 特征类型，1：行人，2：车辆，3：骑车人，4：人脸
        caseUuid: this.caseUuid,
        // searchType: this.gosearchtype, // 查询类型：0：正常以图搜图，1：框选区域以图搜图
        searchType: 0,
        includeThreshold: this.includeThreshold / 100, // 比对阈值
        // includeThreshold: 0,
        // deviceUuids: this.deviceList.join(","), // 框选范围传过来的值
        deviceUuids: this.regionArea.join(","), // 框选范围传过来的值
        startTime: this.beginDatas,
        endTime: this.endDatas
      };

      data = this.$qs.stringify(data);
      this.$http
        .post("/vsas/structure/search", data)
        .then(res => {
          if (res.data.code == 200) {
            this.loading.close();
            if (res.data.data.length == 0) {
              this.$notify({
                type: "warning",
                message:
                  "暂无结果，请调整阈值范围、开始时间和结束时间、区域，然后重新查询！",
                position: "bottom-right",
                duration: 3000
              });
              this.retrieveResult = [];
              this.totalCount = 0;
            } else {
              this.isactive = null;
              let arr = res.data.data;
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].list.length; j++) {
                  arr[i].list[j].latitude = arr[i].latitude;
                  arr[i].list[j].longitude = arr[i].longitude;
                  arr[i].list[j].cameraType = arr[i].cameraType;
                  arr[i].list[j].cameraName = arr[i].cameraName;
                }
              }
              let result = [];
              for (let n = 0; n < arr.length; n++) {
                for (let m = 0; m < arr[n].list.length; m++) {
                  result.push(arr[n].list[m]);
                }
              }
              for (let r in result) {
                result[r].zkytype = this.typeflag;
              }
              this.retrieveResult = result;
                /* 解决8209bug  */
              this.retrieveResult = this.retrieveResult
                .slice(0)
                .sort((a, b) => (b.similarity > a.similarity ? 1 : -1));
            // this.changeSearchResult(this.radio);
              this.totalCount = result.length;
            }
          } else {
            this.loading.close();
            this.retrieveResult = [];
            this.totalCount = 0;
            this.$notify({
              type: "warning",
              message: "暂无结果！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(() => {
          this.loading.close();
        });
    },
    // 加入线索池
    addCluePool(data) {
      let index = _.findIndex(this.allcluepoole, data);
      if (index == -1) {
        this.allcluepoole.push(data);
      } else {
        this.$notify({
          type: "warning",
          message: "线索池数据重复",
          position: "bottom-right",
          duration: 3000
        });
      }
    },
    //查看大图
    lookBigImage(item) {
      this.setzkytargetinfo({});
      this.setshowzkyinfo(false);
      if (this.typeflag == 4) {
        let data = {
          uuid: item.uuid
        };
        data = this.$qs.stringify(data);
        this.$http
          .post("vsas/structure/getZkyStructureFaceAndTarget", data)
          .then(res => {
            //如果查看人脸的大图，先获取是否是人车骑的属性，通过faceZky.type确认一下是否是人车骑
            //再赋值人脸的结构化属性，再赋值时间和类型
            let face = res.data.data.relTarget;
            face.facetype = res.data.data.faceZky.type; //'类型；1.人 2.骑车人 3.车辆'
            face.faceObj = res.data.data.faceZky;
            face.faceObj.fileStartTime = res.data.data.relTarget.fileStartTime;
            face.faceObj.startTime = res.data.data.relTarget.fileStartTime;
            face.faceObj.offset = res.data.data.relTarget.offset;
            face.zkytype = 4;
            this.setzkytargetinfo(face);
            this.setshowlookImgPic(true); // 触发大图点击事件
          });
      } else {
        if (this.typeflag == 1) {
          item.zkytype = 1;
        } else if (this.typeflag == 2) {
          item.zkytype = 2;
        } else if (this.typeflag == 3) {
          item.zkytype = 3;
        }
        this.setzkytargetinfo(item);
        this.setshowlookImgPic(true); // 触发大图点击事件
      }
    },
    //快捷以图搜图
    fastSearchResult(row) {
      let uuid;
      if (row.zkytype == 1) {
        uuid = row.personUuid;
      } else if (row.zkytype == 2) {
        uuid = row.vehicleUuid;
      } else if (row.zkytype == 3) {
        uuid = row.bicycleUuid;
      } else if (row.zkytype == 4) {
        uuid = row.uuid;
      }
      let data = {
        caseUuid: this.caseUuid,
        type: row.zkytype, //表示人。车。骑车人
        uuid: uuid,
        deviceUuid: row.deviceUuid
      };
      this.$http
        .get("vsas/structure/getFeature", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            let feautrue = res.data.data;
            row.Features = res.data.data;
            sessionStorage.setItem("searchImgObj", JSON.stringify(row));
            let routeData = this.$router.resolve({
              path: "/videoStrucPlat/searchPrint",
              query: {
                menuCode: 704,
                // result: JSON.stringify(row),
                typeFlag: row.zkytype,
                startTime: this.beginDatas,
                endTime: this.endDatas
              }
            });
            window.open(routeData.href, "_blank");
          } else {
            this.$notify({
              type: "warning",
              message: "获取特征值失败",
              position: "bottom-right",
              duration: 2000
            });
            return;
          }
        });
    },
    // 下载单张图片
    downloadPic(item) {
      if (item.personUuid) {
        this.ids = item.personUuid;
      } else if (item.vehicleUuid) {
        this.ids = item.vehicleUuid;
      } else if (item.bicycleUuid) {
        this.ids = item.bicycleUuid;
      } else if (item.uuid) {
        this.ids = item.uuid;
      }
      setTimeout(() => {
        document.getElementById("downLoadPid").submit();
      }, 200);
    },
    // 下载所有图片
    downloadAll() {
      this.allIds = [];
      for (let i = 0; i < this.allcluepoole.length; i++) {
        if (this.allcluepoole[i].personUuid) {
          this.allIds.push(this.allcluepoole[i].personUuid);
        } else if (this.allcluepoole[i].vehicleUuid) {
          this.allIds.push(this.allcluepoole[i].vehicleUuid);
        } else if (this.allcluepoole[i].bicycleUuid) {
          this.allIds.push(this.allcluepoole[i].bicycleUuid);
        } else if (this.allcluepoole[i].uuid) {
          this.allIds.push(this.allcluepoole[i].uuid);
        }
      }
      if (!this.allcluepoole.length) {
        this.$notify({
          type: "warning",
          message: "线索池无数据",
          position: "bottom-right",
          duration: 3000
        });
        return;
      } else {
        setTimeout(() => {
          document.getElementById("downLoadId").submit();
        }, 200);
      }
    },
     //转标注
    saveHandler() {
      this.tagConvertIds = []; //先清空数据
      this.tagDataList = this.allcluepoole;
      console.log(this.tagDataList);
      if (!this.tagDataList.length) {
        this.$notify({
          type: "warning",
          message: "暂无标注！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      let targetType = "";
      for (let i = 0; i < this.tagDataList.length; i++) {
        if (this.tagDataList[i].vehicleUuid != undefined) {
          //表示车辆
          targetType = 3;
          this.tagConvertIds.push(this.tagDataList[i].vehicleUuid); // 获取车辆uuid
        } else if (this.tagDataList[i].personUuid != undefined) {
          //表示行人
          targetType = 1;
          this.tagConvertIds.push(this.tagDataList[i].personUuid); // 获取行人uuid
        } else if (this.tagDataList[i].bicycleUuid != undefined) {
          //表示骑车人
          targetType = 2;
          this.tagConvertIds.push(this.tagDataList[i].bicycleUuid); // 获取骑车人uuid
        }
      }
      let data = {
        targetIds: this.tagConvertIds.join(","),
        targetType: targetType,
        caseUuid: "",
        suspicionUuid: ""
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/convert/target/to/markImg", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "创建标注成功！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "warning",
            message: "创建标注失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //过滤时间的函数
    NowTimes(val) {
      if (val == "") {
        return "";
      } else if (val == 0) {
        return "1970-01-01 01:01:01";
      } else {
        let date = new Date(Number(val));
        let YY = date.getFullYear();
        let MM =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let mi =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let ss =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
      }
    },
    // 默认时间设置当天零点和现在时间
    getTimeTobes() {
      let time1 = new Date(new Date().toLocaleDateString()).getTime();
      let time2 = new Date().getTime();
      let todayOne = this.NowTimes(time1);
      let todayNow = this.NowTimes(time2);
      this.beginDatas = todayOne;
      this.endDatas = todayNow;
      setTimeout(() => {
        this.OpenTheTime4("#timeBegin", "#timeEnd");
      }, 100);
    },
    // 获取当前案件下的所有文件的最小时间和最大时间，并加载时间插件
    getTimeTobe(id) {
      let data = {
        caseUuid: id
      };
      this.$http
        .get("vsas/structure/getDate", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            this.beginDatas = res.data.data.startTime;
            this.endDatas = res.data.data.endTime;
            setTimeout(() => {
              this.OpenTheTime4("#globalbegin", "#globalend");
            }, 100);
          } else {
            this.beginDatas = "";
            this.endDatas = "";
            setTimeout(() => {
              this.OpenTheTime4("#globalbegin", "#globalend");
            }, 100);
          }
        });
    },
    // 从路由里面获取的数据进行渲染
    setCurrentInfo(item) {
      let row = JSON.parse(item);
      this.zkyFeature = row.Features;
      this.$nextTick(() => {
        let imgs = document.getElementById("imgPerson"); //图片大小
        let imgBox = document.getElementById("searchPerson"); //div大小
        let leftTopX = row.RegionLeft; //目标相对图片的横坐标
        let leftTopY = row.RegionTop; //目标相对图片的纵坐标
        let imgw = row.RegionWidth; //目标相对图片的宽度
        let imgh = row.RegionHeight; //目标相对图片高度
        let retw = imgBox.clientWidth; //div的实际宽度
        let reth = imgBox.clientHeight; //div的实际高度
        let unit = 1; //图片和div的默认比例
        let posLeft = 0;
        let posTop = 0;
        //通过图片宽高比以及图片的实际比计算出人物的比率
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
        } else {
          unit = imgh / reth;
        }
        // 通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
        // imgs.style.width = row.SrcImageWidth / unit + "px";
        // imgs.style.height = row.SrcImageHeight / unit + "px";
        // imgs.style.top = -(leftTopY / unit) + posTop + "px";
        // imgs.style.left = -(leftTopX / unit) + posLeft + "px";
        imgs.style.width = "100%";
        imgs.style.height = "100%";
        if (this.typeflag == 4) {
          this.imgurl = row.faceImgUrl;
        } else {
          this.imgurl = row.traceImgUrl;
        }
      });
    },
    //删除线索池
    delPoolItem(row) {
      let index = _.findIndex(this.allcluepoole, row);
      this.allcluepoole.splice(index, 1);
    },
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
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hours +
        seperator2 +
        minutes +
        seperator2 +
        seconds;
      return currentdate;
    }
  },

  mounted() {
    this.caseUuid = sessionStorage.getItem("exclusiveCaseUuid");
    this.getRegionArea(this.caseUuid);
    this.getTimeTobes();
    this.timeBegin = laydate.render({
      elem: "#globalbegin",
      type: "datetime",
      //min: -90, //90天前
      max: this.getCurrentDate(), //0天后
      btns: ["now", "confirm"],
      done: (value, date, endDate) => {
        this.beginDatas = value;
        this.timeEnd.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    this.timeEnd = laydate.render({
      elem: "#globalend",
      type: "datetime",
      // min: this.searchData.beginDateTime,
      max: 1,
      btns: ["now", "confirm"],
      done: (value, date, endDate) => {
        this.endDatas = value;
        this.timeBegin.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    let result = sessionStorage.getItem("searchImgObj");
    // 如果从路由里面获取了数据，代表是快捷以图搜图来的
    if (
      (this.$route.query.typeFlag != null ||
        this.$route.query.typeFlag != undefined) &&
      this.$route.query.typeFlag == 10
    ) {
      this.openSearchCase = true;
      this.isLabelIn = true;
      this.snapPic = this.$route.query.snapUrl;
      this.beginDatas = this.$route.query.startTime;
      this.endDatas = this.$route.query.endTime;
    //   console.log(this.$route.query.startTime, this.$route.query.endTime, "");
    } else if (
      this.$route.query.typeFlag != null ||
      this.$route.query.typeFlag != undefined
    ) {
      this.typeflag = this.$route.query.typeFlag; //1人，2车，3骑车人//4人脸。
      this.beginDatas = this.$route.query.startTime;
      this.endDatas = this.$route.query.endTime;
      this.setCurrentInfo(result);
      this.$nextTick(() => {
        this.searchFeatureResult();
      });
    } else {
      sessionStorage.setItem("searchImgObj", "");
    }
    setTimeout(() => {
      document.title = document.title + ".";
      OnInit();
    }, 1000);
  },
  destroyed() {
    OnExit();
    CloseVodPlayer();
    clearInterval(window.g_interval);
  }
};
</script>


<style scoped>
@import "../../assets/css/commom.css";

.topInfo {
  position: absolute;
  top: 0.6rem;
}
.mainContent {
  width: 100%;
  position: absolute;
  top: 0.9rem;
  bottom: 0px;
  left: 0px;
}

.content {
  position: relative;
  width: 100%;
  margin: 0.1rem 0.2rem;
  display: flex;
  flex-direction: column;
}
.content-top {
  width: 100%;
  line-height: 0.3rem;
  display: flex;
}
.content-left {
  position: relative;
  overflow: hidden;
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid #1f4572;
}
.content-right {
  width: 15rem;
  margin-left: 2rem;
}
.content-left img {
  position: absolute;
}

.searchCondition_ul {
  margin: 0.2rem auto;
  font-size: 0.14rem;
}
.searchCondition_ul li {
  float: left;
  margin-left: 0.1rem;
}
.searchCondition_ul li input {
  height: 0.3rem;
  padding-left: 0.2rem;
}
.searchCondition_ul .el-slider,
.searchCondition_ul /deep/ .el-slider {
  width: 2rem;
  float: right;
  margin-top: -4px;
}
@media screen and (min-width: 1920px) and (max-width: 2560px) {
  .searchCondition_ul .el-slider,
  .searchCondition_ul /deep/ .el-slider {
    margin-top: 0;
  }
}
@media screen and (min-width: 1680px) and (max-width: 1920px) {
  .searchCondition_ul .el-slider,
  .searchCondition_ul /deep/ .el-slider {
    margin-top: -4px;
  }
}

.searchResult {
  width: 100%;
  padding: 0 0.2rem;
  height: calc(100% - 1rem);
}
.searchResult-left {
  width: 75%;
  height: 100%;
  float: left;
}
.searchResult-right {
  width: 24%;
  height: 100%;
  float: right;
}

.searchResult-ll {
  border: 1px solid #1f4572;
  height: calc(100% - 1.2rem);
  overflow-y: auto;
}
.searchResult-ll li {
  position: relative;
  text-align: center;
  float: left;
  width: 33%;
  height: 33%;
  padding: 0.1rem;
}
.searchResult-ll li > div {
  width: 100%;
  height: 100%;
  border: 1px solid #1f4572;
  box-sizing: border-box;
  position: relative;
}
.searchResult-ll li img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 99%;
}

.searchClc {
  margin: 0.1rem 0;
}
.simila {
  position: absolute;
  font-size: 0.11rem;
  line-height: 0.2rem;
  height: 0.2rem;
  border-radius: 0.02rem;
  background-color: #409eff;
  top: 0.05rem;
  left: 0;
  color: #fff;
  margin-left:0.05rem;
}

.add,
.download,
.delete {
  font-size: 0.18rem;
  color: #99c9fa;
  cursor: pointer;
  /* width: 0.2rem; */
}
.footer {
  position: absolute;
  bottom: -15px;
  width: 100%;
  height: 0.6rem;
  font-size: 0.14rem;
  line-height: 0.6rem;
  color: rgba(153, 201, 250, 0.4);
  text-align: center;
}
.searchPic {
  background: url("../../assets/images/videoNewImg/searchPic.png") no-repeat;
}
.searchResult-left-ul {
  width: 100%;
  height: calc(100% - 1.2rem);
  overflow-y: auto;
  border: 1px solid #2d659e;
}
.searchResult-left-ul li {
  float: left;
  cursor: pointer;
  width: 12.5%;
  height: 33.3%;
  box-sizing: border-box;
  padding: 0.1rem;
}
.searchResult-left-ulbox {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #1f4572;
}
/* .searchResult-left-ul li {
    float: left;
    margin-top: 10px;
    margin-left: 25px;
    width: 1.5rem;
    height: 2.3rem;

} */
.showbox {
  width: 100%;
  height: 100%;
}
.showbox img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.deletes {
  position: absolute;
  right: 2px;
  top: 3px;
  cursor: pointer;
  z-index: 2;
}
.el-icon-plus {
  width: 0.5rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.3rem;
  color: #99c9fa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.searchCondition_ul li .el-button {
  padding: 0 0.15rem;
  height: 0.28rem;
  margin-top: 0.04rem;
}
.add {
  width: 20px;
  height: 20px;
  font-size: 16px;
}
.overHi {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
  z-index: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-select .el-input,
.el-select /deep/ .el-input {
  width: 3.5rem;
  height: 0.3rem;
  max-height: 0.3rem !important;
  overflow: hidden;
}
.el-select .el-tag,
.el-select /deep/ .el-tag {
  /* color: #409eff; */
  color: #99c9fa;
  background-color: rgba(255, 255, 255, 0);
}
.el-select .el-tag .el-icon-close,
.el-select /deep/ .el-tag .el-icon-close {
  color: #99c9fa !important;
  background: black !important;
}
.el-select .el-tag,
.el-select .el-tag--info,
.el-select .el-tag--small,
.el-select .el-tag--light,
.el-select /deep/ .el-tag,
.el-select /deep/ .el-tag--info,
.el-select /deep/ .el-tag--small,
.el-select /deep/ .el-tag--light {
  /* background-color: none !important; */
  border: 0;
}
.el-input--prefix .el-input__inner {
  padding-left: 0.3rem;
}
.el-select .el-select__tags .el-select__input,
.el-select /deep/ .el-select__tags .el-select__input {
  border-left: none !important;
}
.el-select /deep/ .el-select__tags {
    overflow: hidden;
    flex-wrap: inherit !important;
    max-width: 3rem;
}
.bigImage {
  background: url("../../assets/images/videoNewImg/lookPic.png") no-repeat
    center / 100% 100%;
  display: block;
  width: 0.18rem;
  height: 0.18rem;
  position: absolute;
  bottom: 0.06rem;
  right: 0.52rem;
  cursor: pointer;
  z-index: 99;
}

.tagconvert {
  position: absolute;
  bottom: 0.06rem;
  right: 0.3rem;
  cursor: pointer;
  font-size: 0.16rem;
  z-index: 99;
  color: #409eff;
}
.download{
    left: .05rem;
}
.fastsearch{
    left: .25rem
}
.view{
    left: .5rem;
}
.showbox .loadPic {
  background: url("../../assets/images/videoNewImg/downloadZip.png") no-repeat
    center / 100% 100%;
  display: block;
  width: 0.18rem;
  height: 0.18rem;
  position: absolute;
  bottom: 0.06rem;
  right: 0.04rem;
  cursor: pointer;
  z-index: 99;
}
.el-radio .el-radio__label,
.el-radio /deep/ .el-radio__label {
  font-size: 0.12rem;
}
.addPool {
  color: #409eff;
}
.sortrank {
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.12rem;
}
.threadPic {
  position: relative;
  height: 100%;
}
.el-pagination {
  margin-top: 0.1rem;
}

.searcharea .el-select__input,
.searcharea /deep/ .el-select__input {
  height: 0.28rem;
}
.searchResult-left-ul li:hover .none {
  display: block;
}
.searcharea .el-select__tags-text,
.searcharea /deep/ .el-select__tags-text {
  font-size: 0.14rem;
}

.searchResult-left-ul .play {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  display: none;
  transform: translate(-50%, -50%);
  background: url("../../assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}
.isactive {
  border: 2px solid #409eff;
}
/*  PC1440 */
@media (max-width:1440px){
    .content-right{
        margin-left:.5rem;
        width:90%
    }
    #elslider{
        margin-top: -11px;
        width:60%
    }
}
</style>
