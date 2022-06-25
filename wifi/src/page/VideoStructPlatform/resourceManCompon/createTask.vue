<!--
 * @Author: your name
 * @Date: 2020-11-11 10:27:35
 * @LastEditTime : 2021-08-06 17:18:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha-1.63\vacp-wfes\src\page\VideoStructPlatform\resourceManCompon\createTask.vue
 -->
<template>
  <div>
    <el-dialog
      title="新建任务"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      @open="opendia"
      top="6vh"
      width="80%"
    >
      <div style="height:7rem">
        <div class="checkBox">
          <div
            @click="changeType(1)"
            :class="{'contentactive' : changeRadio == 1}"
            class="contentTitleItem"
          >结构化</div>
          <div
            @click="changeType(2)"
            :class="{'contentactive' : changeRadio == 2}"
            class="contentTitleItem"
          >检索</div>
          <div
            @click="changeType(3)"
            :class="{'contentactive' : changeRadio == 3}"
            class="contentTitleItem"
          >布控</div>
        </div>
        <div v-if="changeRadio == 1" class="left">
          <el-tabs v-model="initTab" type="border-card" @tab-click="handleClick">
            <el-tab-pane name="video">
              <span slot="label">
                <i class="el-icon-date"></i>天网
              </span>
              <p>
                <span>点位名称：</span>
                <input
                  v-if="initTab == 'video'"
                  placeholder="请输入点位名称"
                  type="text"
                  id="keyValue"
                  v-model="keyValue"
                  autocomplete="off"
                >
              </p>
              <ul v-if="initTab == 'video'" id="treeDemo" class="ztree one"></ul>
              <div class="timeinput">
                <el-radio-group @change="changetime" v-model="checkTaskType">
                  <el-radio label="1">实时结构化</el-radio>
                  <el-radio label="2">历史结构化</el-radio>
                </el-radio-group>
                <p v-show="checkTaskType == 1">
                  <span class="fontRed">任务名称：</span>
                  <input type="text" v-model="realTaskName" placeholder="请输入任务名称">
                </p>
                <p v-if="checkTaskType == 2">
                  <span>开始时间：</span>
                  <input
                    type="text"
                    id="createtaskbegin"
                    v-model="beginData"
                    readonly
                    placeholder="请输入开始时间"
                  >
                </p>
                <p v-if="checkTaskType == 2">
                  <span>结束时间：</span>
                  <input
                    type="text"
                    id="createtaskend"
                    v-model="endData"
                    readonly
                    placeholder="请输入结束时间"
                  >
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane name="people">
              <span slot="label">
                <i class="el-icon-date"></i>社会面
              </span>
              <p>
                <span>点位名称：</span>
                <input
                  v-if="initTab == 'people'"
                  type="text"
                  id="keyValue"
                  placeholder="请输入点位名称"
                  v-model="keyValue"
                  autocomplete="off"
                >
              </p>
              <ul v-if="initTab == 'people'" id="treeDemo" class="ztree"></ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- <div v-if="changeRadio == 1" class="right" id="resourceMap"></div> -->
        <div v-if="changeRadio == 2" class="mainretrieval">
          <div class="mainleft">
            <div class="pointType">
              <el-tabs v-model="initTab" type="border-card" @tab-click="handlereterClick">
                <!-- <el-tab-pane name="video">
                                <span slot="label">
                                    <i class="el-icon-date"></i>天网
                                </span>
                                <input v-if="initTab == 'video'" type="text" v-model="keyValue">

                                <ul v-if="initTab == 'video'" id="treeDemo" class="ztree"></ul>
                </el-tab-pane>-->
                <el-tab-pane name="people">
                  <span slot="label">
                    <i class="el-icon-date"></i>社会面
                  </span>
                  <span>点位名称：</span>
                  <input
                    v-if="initTab == 'people'"
                    type="text"
                    id="keyValue"
                    placeholder="请输入点位名称"
                    v-model="keyValue"
                  >
                  <ul v-if="initTab == 'people'" id="treeDemo" class="ztree"></ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <div class="maincenter">
            <p>
              <span>目标区域标记</span>
              <el-button class="searchBtn" @click="clearcanvas">清空检索方式</el-button>
            </p>
            <div id="reterimgVideoVal" class="reterimgVideoVal">
              <img id="imgsVideoVal" :src="videoImg" alt>
              <canvas id="canvasVideoVal" @click="getcanvas" @dblclick="dbgetcoor"></canvas>
              <canvas v-show="showCanvas" @click="getcanvas" id="canvasVideo"></canvas>
            </div>
          </div>
          <div class="mainright">
            <div class="retrimain">
              <p class="retritask">视频检索任务</p>
              <p class="taskNames">
                <span>任务名称：</span>
                <input type="text" v-model="tastName" maxlength="50" placeholder="请输入任务名称">
              </p>
              <div class="changetype" v-if="!isonline">
                <span>选择分类：</span>
                <span class="changecolor">
                  <i @click="dialogVisible2 = true">选择视频</i>
                  <i @click="dialogVisible3 = true">已选视频列表</i>
                </span>
              </div>
              <div class="searchtype" v-if="isonline">
                <span>检索时间：</span>
                <input
                  type="text"
                  id="time1"
                  readonly
                  :title="beginData"
                  v-model="beginData"
                  placeholder="请输入开始时间"
                > -
                <input
                  type="text"
                  id="time2"
                  readonly
                  :title="endData"
                  v-model="endData"
                  placeholder="请输入结束时间"
                >
                <el-button class="searchBtn" @click="searhlineImg">查询</el-button>
              </div>

              <div class="setretrieve">
                <p>检索规则设置：</p>
                <div class="rule">
                  <div>
                    <p>检索方式：</p>
                    <el-radio-group @change="clearcanvas" v-model="retrimodel">
                      <el-radio :label="1">区域</el-radio>
                      <el-radio :label="2">跨线</el-radio>
                      <el-radio :label="3">方向</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <p>目标大小：</p>
                    <el-radio-group v-model="targetsize">
                      <el-radio :label="1">大</el-radio>
                      <el-radio :label="2">中</el-radio>
                      <el-radio :label="3">小</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <p>目标清晰度：</p>
                    <el-radio-group v-model="targetqxd">
                      <el-radio :label="1">清晰</el-radio>
                      <el-radio :label="2">较清晰</el-radio>
                      <el-radio :label="4">较模糊</el-radio>
                      <el-radio :label="3">模糊</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <p>
                      <el-checkbox v-model="colorRetrial" @change="clickOpenColor">颜色检索：</el-checkbox>
                    </p>
                    <el-button
                      type="primary"
                      class="searchBtn colorleft"
                      @click="titleopencolor"
                    >{{colroretrivaltitle}}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 视频模态框 -->
          <el-dialog
            title="选择视频"
            :visible.sync="dialogVisible2"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
            width="50%"
            :destroy-on-close="true"
            @open="openCheckVideo"
            class="dialog2"
          >
            <div class="main2" v-if="dialogVisible2">
              <div class="main2_top">
                <p>时间：
                  <el-input
                    id="videoStartTime"
                    placeholder="请选择开始时间"
                    autocomplete="off"
                    readonly
                    v-model="beginTime"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                  </el-input>-
                  <el-input
                    id="videoEndTime"
                    placeholder="请选择结束时间"
                    autocomplete="off"
                    readonly
                    v-model="endTime"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                  </el-input>
                </p>
                <el-button
                  class="searchBtn searchBar"
                  @click="getAllvideo()"
                  icon="el-icon-search"
                >查询</el-button>
                <el-button
                  type="danger"
                  class="el-icon-refresh tryBtn ml15"
                  @click="resetTimeToList()"
                >重置</el-button>
              </div>
              <div class="main2_btn" v-if="dialogVisible2">
                <el-table
                  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  border
                  @selection-change="handleselection"
                  :row-key="handlrowkey"
                  @select-all="selectAll"
                  ref="checkTable"
                  style="width: 100%"
                  height="4rem"
                >
                  <div slot="empty">
                    <div class="noImg">
                      <img src="../../../assets/updataImg/NoData.png">
                    </div>
                  </div>
                  <el-table-column :reserve-selection="true" type="selection" width="100"></el-table-column>
                  <el-table-column prop="fileName" label="文件名" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="uploadTime" label="采集时间"></el-table-column>
                </el-table>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  background
                  :total="totalCount"
                ></el-pagination>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="cancleBtn" @click="closeSelect">关 闭</el-button>
            </span>
          </el-dialog>

          <!-- 已选视频列表 -->
          <el-dialog
            title="已选视频列表"
            :visible.sync="dialogVisible3"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
            width="45%"
            class="dialog3"
            :destroy-on-close="true"
          >
            <div class="main2_btn" v-if="dialogVisible3">
              <el-table :data="multiplist" border style="width: 100%" height="3.3rem">
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../../assets/updataImg/NoData.png">
                  </div>
                </div>
                <el-table-column label="编号">
                  <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="fileName" show-overflow-tooltip label="文件名"></el-table-column>
                <el-table-column prop="uploadTime" show-overflow-tooltip label="采集时间"></el-table-column>
                <el-table-column prop="operation" width="150" align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button class="delBtn" type="danger" @click="deletevideo(scope.$index)">
                      <img src="../../../assets/images/videoCombat/cancel.png" alt>&nbsp;&nbsp;删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="cancleBtn" @click="dialogVisible3=false">关 闭</el-button>
            </span>
          </el-dialog>

          <!-- 颜色检索 -->
          <el-dialog
            title="颜色检索"
            :visible.sync="opencolorReval"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
            width="50%"
            @open="opencolor"
            @close="closeColor"
          >
            <div class="main3_btn">
              <div class="firstdiv" id="firstdiv">
                <img
                  class="imgload"
                  id="colorimg"
                  @load="imgscale('.imgload')"
                  :src="imglist[firstImgIndex]"
                >
                <canvas id="colorcanvas"></canvas>
              </div>
              <div class="twodiv centerbtn">
                <span>目标色块</span>
                <el-radio v-model="checkradio" @change="changecolortype" label="0">选择色块</el-radio>
                <!-- <b @click="prev">上一张</b> &nbsp;&nbsp;
                                <b @click="next">下一张</b> &nbsp;&nbsp;
                <b>标注图片（{{firstImgIndex + 1}}/{{imglist.length}}）</b>-->
              </div>
              <div class="twodiv">
                <span>语义色彩</span>
                <el-radio v-model="checkradio" @change="changecolortype" label="1">选取色彩</el-radio>
                <el-select
                  v-model="firstname"
                  :disabled="checkradio != 1"
                  class="selectpos"
                  placeholder="请选择位置"
                >
                  <el-option
                    v-for="(item,index) in colorlist"
                    :label="item.name"
                    :key="index"
                    :value="item.rgb"
                  ></el-option>
                </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-radio v-model="checkradio" @change="changecolortype" label="2">多语义色彩</el-radio>
                <el-select
                  v-model="twoname"
                  :disabled="checkradio != 2"
                  class="selectpos"
                  placeholder="请选择位置"
                >
                  <el-option
                    v-for="(item,index) in colorlist"
                    :label="item.name"
                    :key="index"
                    :value="item.rgb"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="threename"
                  :disabled="checkradio != 2"
                  class="selectpos"
                  placeholder="请选择位置"
                >
                  <el-option
                    v-for="(item,index) in colorlist"
                    :label="item.name"
                    :key="index"
                    :value="item.rgb"
                  ></el-option>
                </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select
                  v-model="colorRange"
                  :disabled="checkradio == 0"
                  class="selectpos"
                  placeholder="请选择位置"
                >
                  <el-option label="精准" value="0"></el-option>
                  <el-option label="标准" value="1"></el-option>
                  <el-option label="宽泛" value="2"></el-option>
                </el-select>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="cancleBtn" @click="cancelColorReval">取 消</el-button>
              <el-button type="primary" class="passBtn" @click="checkColorArea">确 定</el-button>
            </span>
          </el-dialog>
        </div>

        <!-- 这是布控 -->
        <div v-if="changeRadio == 3" class="left">
          <el-tabs v-model="ViseinitTab" type="border-card" @tab-click="VisehandleClick">
            <el-tab-pane name="video">
              <span slot="label">
                <i class="el-icon-date"></i>天网
              </span>
              <p>
                <span>点位名称：</span>
                <input
                  v-if="ViseinitTab == 'video'"
                  placeholder="请输入点位名称"
                  type="text"
                  id="keyValue"
                  v-model="keyValue"
                >
              </p>
              <ul v-if="ViseinitTab == 'video'" id="treeDemo" class="ztree ones"></ul>
              <div class="timeinput timeinputs">
                <p>
                  <span style="color:red">*任务名称：</span>
                  <input type="text" v-model="VisetaskName" placeholder="请输入任务名称">
                </p>
                <p>
                  <span style="color:red">*选择底库：</span>
                  <el-select
                    v-model="storeName"
                    placeholder="请选择"
                    multiple
                    collapse-tags
                    filterable
                    class="noBg"
                  >
                    <el-option
                      v-for="item in storeNameList"
                      :key="item.value"
                      :label="item.dbName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </p>

                <p v-show="changeRadio == 3">
                  <span>开始时间：</span>&nbsp;
                  <input
                    type="text"
                    id="timeBegin"
                    v-model="beginData"
                    readonly
                    placeholder="请输入开始时间"
                  >
                </p>
                <p v-show="changeRadio == 3">
                  <span>结束时间：</span>&nbsp;
                  <input
                    type="text"
                    id="timeEnd"
                    v-model="endData"
                    readonly
                    placeholder="请输入结束时间"
                  >
                </p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div v-show="changeRadio == 1 || changeRadio == 3" class="right" id="resourceMap"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="passBtn" v-no-more-click @click="createTasksAll">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import realvideo from "../../../api/realvideo/realvideo.js";
import resourceManage from "../../../api/VideoStructPlatform/resourceManage.js";
import resourceMap from "../../../api/VideoStructPlatform/resourcemap.js";
import videoDown from "../../../api/casestudy/videoDown.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js";
import structRetrieval from "../../../api/VideoStructPlatform/structRetrieval.js";
import scale from "../../../api/common/scale.js";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      checkarr: [[], []],
      opencheck: true,
      beginData: this.getEarlierDate(),
      endData: this.getCurrentDate(),
      caseUuid: "",
      skynetList: [],
      changeRadio: 1, //切换检索和结构化，1表示结构化，2表示检索
      checkradio: "0",
      firstImgIndex: 0, //当前颜色检索的图片
      lableDeviceList: {},
      colorlist: [
        { name: "红", rgb: "255,0,0" },
        { name: "橙", rgb: "255,127,34" },
        { name: "黄", rgb: "255,242,0" },
        { name: "蓝", rgb: "0,0,255" },
        { name: "绿", rgb: "0,255,0" },
        { name: "青", rgb: "185,122,87" },
        { name: "紫", rgb: "163,73,164" },
        { name: "紫红", rgb: "255,174,201" },
        { name: "白", rgb: "255,255,255" },
        { name: "黑", rgb: "0,0,0" }
      ],
      firstname: "255,0,0",
      twoname: "255,0,0",
      threename: "255,0,0",
      colorRange: "1",
      imglist: [], //存放图片的list
      colroretrivaltitle: "打开颜色检索",
      baseCode: "", //截图的base64
      baseUrl: "", //截图的url
      showbaseUrl: false,
      isonline: false, //是否是天网
      checkTaskType: "1",
      timeBegin: "",
      timeEnd: "",
      realTaskName: "" //实时结构化任务名称
    };
  },
  mounted() {},
  watch: {
    opentask(val) {
      this.dialogVisible = val;
    },
    // keyValue(newV) {
    //     this.searchFun(newV, null, true);
    // },
    beginData(val) {
      this.videoImg = "";
    },
    endData(val) {
      this.videoImg = "";
    },
    videoImg(val) {
      if (!val) {
        var canvas = document.getElementById("canvasVideoVal");
        var canvastwo = document.getElementById("canvasVideo");
        canvas.setAttribute("width", 0);
        canvas.setAttribute("height", 0);
        canvastwo.setAttribute("width", 0);
        canvastwo.setAttribute("height", 0);
      } else {
        this.imglist = [];
        this.imglist.push(val);
        for (let i = 0; i < this.lablemarkList.length; i++) {
          this.imglist.push(this.lablemarkList[i].snapshotFile);
        }
      }
    },
    multiplist: {
      handler(val) {
        if (val.length) {
          if (!this.videoImg) {
            for (let i = 0; i < val.length; i++) {
              if (val[i].snapUrl != "" && val[i].snapUrl != null) {
                this.videoImg = val[i].snapUrl;
                document.getElementById("imgsVideoVal").style.display = "none";
                let image = new Image();
                image.onload = () => {
                  this.dialogvideo();
                };
                image.src = this.videoImg;
                return;
              }
            }
          } else {
            for (let i = 0; i < val.length; i++) {
              if (this.videoImg == val[i].snapUrl) {
                return;
              } else {
                if (val[i].snapUrl != "" && val[i].snapUrl != null) {
                  this.videoImg = val[i].snapUrl;
                  document.getElementById("imgsVideoVal").style.display =
                    "none";
                  let image = new Image();
                  image.onload = () => {
                    this.dialogvideo();
                  };
                  image.src = this.videoImg;
                  return;
                } else {
                  this.videoImg = "";
                }
              }
            }
          }
        } else {
          this.videoImg = "";
        }
      },
      deep: true
    }
  },
  props: {
    opentask: Boolean
  },
  mixins: [
    realvideo,
    resourceManage,
    resourceMap,
    videoDown,
    beginEnd,
    structRetrieval,
    scale
  ],
  computed: {
    ...mapGetters(["onlineDeviceList"])
  },
  methods: {
    changetime(val) {
      if (val == 2) {
        this.beginData = this.getEarlierDate();
        this.endData = this.getCurrentDate();
        this.$nextTick(() => {
          setTimeout(() => {
            this.OpenTheTime3("#createtaskbegin", "#createtaskend");
          }, 100);
        });
      }
    },
    //切换类型
    changeType(type) {
      this.changeRadio = type;
      //表示结构化
      if (type == 1) {
        this.checkTaskType = "1";
        this.checkarr = [[], []];
        this.initTab = "people";
        this.beginData = this.getEarlierDate();
        this.endData = this.getCurrentDate();
        this.$nextTick(() => {
          this.InitMap("resourceMap");
          this.setting = {
            data: {
              simpleData: {
                enable: true,
                idKey: "id",
                pidKey: "pId",
                rootPId: ""
              }
            },
            check: {
              enable: true,
              nocheckInherit: true,
              chkStyle: "checkbox",
              chkboxType: {
                Y: "ps",
                N: "ps"
              },
              chkDisabledInherit: true
            },
            view: {
              showLine: false,
              fontCss: {
                color: "#99c9fa"
              },
              showTitle: true,
              showIcon: false,
              nameIsHTML: true, //允许name支持html
              selectedMulti: false
            },
            callback: {
              onCheck: this.zTreeOnCheck
            }
          };
          this.querySocietyData(1);
          setTimeout(() => {
            let dom = document.getElementById("treeDemo_2_span");
            this.$nextTick(() => {
              dom.click();
            });
          }, 300);
        });
      } else if (type == 2) {
        this.initTab = "people";

        this.setting = {
          data: {
            simpleData: {
              enable: true,
              idKey: "id",
              pidKey: "pId",
              rootPId: ""
            }
          },
          view: {
            showLine: false,
            fontCss: {
              color: "#99c9fa"
            },
            showTitle: true,
            showIcon: false,
            nameIsHTML: true, //允许name支持html
            selectedMulti: false
          },
          callback: {
            onClick: this.zTreeOnClick
          }
        };

        this.querySocietyData(2);
      } else if (type == 3) {
        this.checkarr = [[], []];
        this.beginData = this.getCurrentDate();
        //3天之后
        this.endData = this.getXLater(72);
        //等于3代表布控
        //请求天网设备列表
        //加载地图
        this.InitMap("resourceMap");
        //获取底库列表
        this.getStoreNameList();
        //获取用户列表
        this.getUserNameList();
        this.$nextTick(() => {
          this.setTwoTime("#timeBegin", "#timeEnd");
          this.setting = {
            data: {
              simpleData: {
                enable: true,
                idKey: "id",
                pidKey: "pId",
                rootPId: ""
              }
            },
            check: {
              enable: true,
              nocheckInherit: true,
              chkStyle: "checkbox",
              chkboxType: {
                Y: "ps",
                N: "ps"
              },
              chkDisabledInherit: true
            },
            view: {
              showLine: false,
              fontCss: {
                color: "#99c9fa"
              },
              showTitle: true,
              showIcon: false,
              nameIsHTML: true, //允许name支持html
              selectedMulti: false
            },
            callback: {
              onCheck: this.zTreeOnCheck
            }
          };
        });
        this.queryVideoData();
      }
    },

    //获取底库列表
    getStoreNameList() {
      let data = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: "",
        orderType: "",
        dbName: ""
      };
      this.$http
        .get("sms/threeFaceDb/faceDbList", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.storeNameList = res.data.data.data.list;
          }
        });
    },
    //获取用户列表
    getUserNameList() {},
    //切换颜色的时候
    changecolortype(val) {
      if (val == 0) {
        let colorimg = document.getElementById("colorimg");
        let colorcanvas = document.getElementById("colorcanvas");
        colorcanvas.setAttribute("width", colorimg.clientWidth);
        colorcanvas.setAttribute("height", colorimg.clientHeight);
      } else {
        this.colorpoints = "";
        let colorcanvas = document.getElementById("colorcanvas");
        colorcanvas.setAttribute("width", 0);
        colorcanvas.setAttribute("height", 0);
        this.baseCode = ""; //截图的base64
        this.baseUrl = ""; //截图的url
        this.showbaseUrl = false;
      }
    },
    //打开颜色检索页面
    opencolor() {
      this.$nextTick(() => {
        if (this.imglist.length) {
          this.imgload();
        }
      });
    },
    closeColor() {
      // console.log(this.checkradio,1111);
      // console.log(this.baseUrl,2222);
      // console.log(this.baseCode,"this.baseCode");
      if (this.checkradio == 0 && !this.baseUrl) {
        let files = this.dataURLtoBlob(this.baseCode);
        let formData = new FormData();
        let file = new File([files], new Date().getTime() + ".jpg");
        formData.append("files", file);
        this.$http({
          url: "/sms/uploadFile/upload",
          method: "post",
          data: formData
        }).then(reponse => {
          // console.log(reponse,"reponse");
          this.baseUrl = reponse.data.data[0];
          this.showbaseUrl = true;
          // console.log(this.baseUrl,"this.baseUrl");
          // console.log(this.showbaseUrl,"this.showbaseUrl");
        });
      }
    },
    prev() {
      if (this.checkradio == 1 || this.checkradio == 2) {
        return;
      }
      this.colorpoints = "";
      let colorcanvas = document.getElementById("colorcanvas");
      colorcanvas.setAttribute("width", 0);
      colorcanvas.setAttribute("height", 0);
      this.firstImgIndex--;
      if (this.firstImgIndex <= 0) {
        this.firstImgIndex = 0;
      }
      this.imgload();
    },
    next() {
      if (this.checkradio == 1 || this.checkradio == 2) {
        return;
      }
      this.colorpoints = "";
      let colorcanvas = document.getElementById("colorcanvas");
      colorcanvas.setAttribute("width", 0);
      colorcanvas.setAttribute("height", 0);
      this.firstImgIndex++;
      if (this.firstImgIndex >= this.imglist.length) {
        this.firstImgIndex = this.imglist.length - 1;
      }
      this.imgload();
    },
    imgload() {
      let colorimg = document.getElementById("colorimg");
      colorimg.onload = () => {
        setTimeout(() => {
          this.changecolortype(0);
          if (this.colorpoints) {
            let canvas = document.getElementById("colorcanvas");
            var context = canvas.getContext("2d");
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.strokeStyle = "red";
            context.strokeRect(
              this.one,
              this.two,
              this.three - this.one,
              this.four - this.two
            );
            context.stroke();
          } else {
            if (this.checkradio == 1 || this.checkradio == 2) {
              return;
            }
            this.getcoord();
          }
        }, 300);
      };
      colorimg.src = this.imglist[this.firstImgIndex];
    },
    titleopencolor() {
      this.colorRetrial = true;
      this.clickOpenColor(true);
    },
    // 打开颜色检索
    clickOpenColor(val) {
      if (this.imglist.length || (this.isonline && this.videoImg)) {
        if (val) {
          this.colroretrivaltitle = "编辑颜色检索";
          this.opencolorReval = true;
        } else {
          this.colroretrivaltitle = "打开颜色检索";
          this.colorpoints = "";
          this.firstname = "255,0,0";
          this.twoname = "255,0,0";
          this.threename = "255,0,0";
          this.colorRange = "1";
        }
      } else {
        this.colorRetrial = false;
        this.opencolorReval = false;
      }
    },
    // getbaseUrl() {
    //     let img = new Image();
    //     img.setAttribute("crossOrigin", "anonymous");
    //     let cans = document.getElementById("colorcanvas");
    //     img.onload = () => {
    //         //获取点位在图片中的实际坐标
    //         let ceshicanvas = document.createElement("canvas");
    //         ceshicanvas.setAttribute("id", "ceshicanvas");
    //         let one = Math.ceil(
    //             (this.one * img.naturalWidth) / cans.clientWidth
    //         ); //  左上
    //         let two = Math.ceil(
    //             (this.two * img.naturalHeight) / cans.clientHeight
    //         ); //  左下
    //         let three = Math.ceil(
    //             (this.three * img.naturalHeight) / cans.clientHeight
    //         ); //  左下
    //         let four = Math.ceil(
    //             (this.four * img.naturalHeight) / cans.clientHeight
    //         ); //  左下
    //         ceshicanvas.width = three - one;
    //         ceshicanvas.height = four - two;
    //         let ctx = ceshicanvas.getContext("2d");
    //         ctx.drawImage(
    //             img,
    //             one,
    //             two,
    //             three - one,
    //             four - two,
    //             0,
    //             0,
    //             three - one,
    //             four - two
    //         );
    //         this.baseCode = ceshicanvas.toDataURL("image/png");
    //     };
    //     img.src =
    //     window.origin +
    //     "/fastDfs/" +
    //     this.imglist[this.firstImgIndex].slice(
    //     this.imglist[this.firstImgIndex].lastIndexOf("/"),
    //     this.imglist[this.firstImgIndex].length
    //     );
    // },

    //关闭模态框
    closeDia() {
      this.changeRadio = "1";
      this.checkTaskType = "1";
      this.$parent.opentask = false;
      this.checkarr = [[], []];
      this.nowclick = 1;
      this.initTab = "people";
      this.beginData = this.getEarlierDate();
      this.endData = this.getCurrentDate();
      this.treeObj = "";
      this.realTaskName = ""; //实时结构化任务名称
      this.VisetaskName = ""; //布控任务名称
      this.storeName = ""; //清空选择的人脸底库
      this.keyValue = "";
    },
    //打开模态框
    opendia() {
      this.caseUuid = sessionStorage.getItem("exclusiveCaseUuid");
      this.$nextTick(() => {
        this.InitMap("resourceMap");

        this.setting = {
          data: {
            simpleData: {
              enable: true,
              idKey: "id",
              pidKey: "pId",
              rootPId: ""
            }
          },
          check: {
            enable: true,
            nocheckInherit: true,
            chkStyle: "checkbox",
            chkboxType: {
              Y: "ps",
              N: "ps"
            },
            chkDisabledInherit: true
          },
          view: {
            showLine: false,
            fontCss: {
              color: "#99c9fa"
            },
            showTitle: true,
            showIcon: false,
            nameIsHTML: true, //允许name支持html
            selectedMulti: false
          },
          callback: {
            onCheck: this.zTreeOnCheck
          }
        };
        this.querySocietyData(1);
        this.checkarr = [[], []];
      });
    },
    resetTimeToList() {
      this.beginTime = "";
      this.endTime = "";
      this.getAllvideo();
    },
    //对时间进行分割
    inquireTime() {
      this.skynetList = [];
      let begin = new Date(this.beginData).getTime();
      let end = new Date(this.endData).getTime();
      let beginStart = Math.ceil((end - begin) / (1000 * 60 * 60));
      if (beginStart >= 0) {
        let storeTime = [this.gety(begin)];
        let timeArr = [];
        let beginDate = begin;
        // let aaa = beginDate;
        for (let i = 0; i < beginStart; i++) {
          beginDate = beginDate + 1000 * 60 * 60;
          storeTime.push(this.gety(beginDate));
        }
        storeTime.splice(storeTime.length - 1, 1, this.endData);
        for (let k = 0; k < storeTime.length - 1; k++) {
          timeArr.push({
            id: k,
            beginTable: storeTime[k],
            endTable: storeTime[k + 1]
          });
        }
        this.skynetList = timeArr;
      } else {
        let begin = new Date(this.beginData);
        let end = new Date(this.endData);
      }
    },

    //创建所有任务
    createTasksAll() {
      if (this.changeRadio == 1) {
        this.createdStruct();
        return;
      }
      //如果是检索任务
      if (this.changeRadio == 2) {
        this.getAllsubmit();
        setTimeout(() => {
          this.$emit("childByClose", "0");
        }, 500);
        return;
      }
      if (this.changeRadio == 3) {
        this.createdVise();
        return;
      }
    },
    //创建人脸布控任务
    createdVise() {
      let arr = _.filter(this.checkarr[0], item => {
        return !item.apes;
      });
      let allDevices = [];
      //取出天网的deviceid
      for (let i in arr) {
        allDevices.push(arr[i].shebeiId);
      }
      //取出人脸库的id
      let manfaceIds = [];
      //   for (let i in this.storeNameList) {
      //     manfaceIds.push(this.storeNameList[i].id);
      //   }
      manfaceIds.push(this.storeName);
      if (this.VisetaskName == "" || this.VisetaskName == undefined) {
        this.$notify({
          type: "warning",
          message: "请输入任务名称！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (manfaceIds.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择底库！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (allDevices.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择天网设备！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }

      let data = {
        TaskDeploy: {
          TaskDeployName: this.VisetaskName, //布控任务名称
          deviceNumber: arr.length, // 设备数量
          faceDbNumber: this.storeName.length, //人脸库数量
          beginTime: this.beginData, //任务开始时间
          expectEndTime: this.endData, //预计结束时间
          commitUser: this.$storage.getSession("userInfo").userName, //任务提交人
          commitTime: "", //任务提交时间
          caseUuid: this.caseUuid //案件id
        },
        TaskDeploySky: {
          submiterId: this.$storage.getSession("userInfo").userId, //用户id
          submiterName: this.$storage.getSession("userInfo").userName, //用户名称
          taskName: this.VisetaskName, //任务名称
          storeFileType: sessionStorage.getItem("storeFileType"), //文件存储介质类型
          ftp: sessionStorage.getItem("ftp"), //
          ftpRedirectUrl: sessionStorage.getItem("ftpRedirectUrl") //ftpHttp地址
        },
        deviceIds: allDevices.join(","), //所有天网点位id集合，用,隔开
        faceDbIds: manfaceIds.join(",") //人脸库id，用,隔
      };
      data = JSON.stringify(data);
      let datas = {
        datas: data
      };
      datas = this.$qs.stringify(datas);
      this.$http.post("vsas/task/deploy/create", datas).then(res => {
        if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$notify({
            type: "success",
            message: "任务创建成功！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "error",
            message: "任务创建失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
        setTimeout(() => {
          this.$emit("childByClose", "10");
        }, 500);
      });
    },
    // 创建结构化任务
    createdStruct() {
      //创建结构化任务
      //对时间段进行分割
      this.inquireTime();
      let arr1 = [];
      //分割后的数组拼接成后端需要的数据
      this.skynetList.forEach(item => {
        return arr1.push(
          item.beginTable.replace(" ", "_") +
            "|" +
            item.endTable.replace(" ", "_")
        );
      });
      //如果是没有选择时间段，贼提示
      if (!arr1.length) {
        this.$notify({
          type: "warning",
          message: "请选择时间段",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      // 过滤天网的父节点
      let arr = _.filter(this.checkarr[0], item => {
        return !item.apes;
      });
      // 过滤社会面的父节点
      let arr2 = _.filter(this.checkarr[1], item => {
        return !item.apes;
      });
      console.log(this.checkarr, 9999);
      if (!arr2.length && !arr.length) {
        this.$notify({
          type: "warning",
          message: "请选择设备",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }

      let list = []; //给后台的数据
      // 给案件添加点位
      let onlinelist = []; // 天网
      let linelist = []; //离线
      if (arr.length) {
        //1表示创建实时流任务，2表示创建历史流任务
        if (this.checkTaskType == 1) {
          if (
            this.realTaskName == "" ||
            this.realTaskName == undefined ||
            this.realTaskName == null
          ) {
            this.$notify({
              type: "warning",
              message: "请输入实时结构化任务名称!",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
          this.addonline(arr1, 2);
          setTimeout(() => {
            this.$emit("childByClose", "2");
          }, 500);
        } else if (this.checkTaskType == 2) {
          this.addonline(arr1, 1);
          setTimeout(() => {
            this.$emit("childByClose", "1");
          }, 500);
        }
        //创建天网历史流结构化任务
        //获取天网结构化点位数据，绑定后端点位接口
        for (let i = 0; i < arr.length; i++) {
          onlinelist.push({
            cameraType: 1,
            deviceUuid: arr[i].shebeiId,
            longitude: arr[i].longitude,
            latitude: arr[i].latitude,
            cameraName:
              arr[i].oldname == undefined ? arr[i].name : arr[i].oldname,
            offset: 0,
            caseUuid: this.caseUuid
          });
        }
      }
      let flag = false;
      //判断离线中的当前点位是否有视频需要做结构化
      if (arr2.length) {
        let arrlist = [];
        for (let i = 0; i < arr2.length; i++) {
          if (arr2[i].allowVideoCount) {
            arrlist.push({
              fileUuids: arr2[i].fileUuids.join(","),
              deviceId: arr2[i].shebeiId
            });
          } else {
            flag = true;
            break;
          }
        }
        if (arrlist.length) {
          if (flag) {
            this.$notify({
              type: "warning",
              message:
                "该设备已经全部结构化分析完毕，或者没有可以结构化的视频，请先上传",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.addline();
          }
        } else {
          this.$notify({
            type: "warning",
            message:
              "该设备已经全部结构化分析完毕，或者没有可以结构化的视频，请先上传",
            position: "bottom-right",
            duration: 3000
          });
          // this.dialogVisible = false;
        }
        //获取离线绑定点位
        for (let i = 0; i < arr2.length; i++) {
          linelist.push({
            cameraType: 4,
            deviceUuid: arr2[i].shebeiId,
            longitude: arr2[i].longitude,
            latitude: arr2[i].latitude,
            cameraName: arr2[i].newName,
            offset: 0,
            caseUuid: this.caseUuid
          });
        }
      }
      //判断是否有离线和天网的添加数组的长度，如果有需要添加至后台
      if (onlinelist.length) {
        list.push({
          type: 1,
          caseCameraList: onlinelist
        });
      }
      if (linelist.length) {
        list.push({
          type: 4,
          caseCameraList: linelist
        });
      }
      //把点位绑定到案件中
      this.addDeviceToCase(this.caseUuid, list);
    },
    // 天网创建任务，时间需要用下划线_替换空格来代替
    addonline(arr1, tasktype) {
      //天网
      let arr = _.filter(this.checkarr[0], item => {
        return !item.children;
      });
      // console.log(arr1, 7774441);

      let list = [];
      for (let i = 0; i < arr.length; i++) {
        list.push({
          submiterId: this.$storage.getSession("userInfo").userId,
          submiterName: this.$storage.getSession("userInfo").userName,
          infoKind: 1,
          taskName: "",
          gbDeviceId: arr[i].shebeiId,
          taskName: this.realTaskName, //实时结构化任务名称
          snapUrl: "",
          taskStructuralFlag: 1,
          needAutoStruct: 1,
          taskType: tasktype,
          category: 2,
          searchType: "",
          size: "",
          clarity: "",
          points: "",
          gbServer: sessionStorage
            .getItem("controlHead")
            .substring(
              8,
              sessionStorage.getItem("controlHead").lastIndexOf(":")
            ),
          gbPort: 5000,
          deviceId: arr[i].shebeiId,
          startTime: "",
          endTime: "",
          fileAdd: sessionStorage.getItem("collectAddInterface"),
          fileFini: sessionStorage.getItem("collectFinishInterface"),
          parseAdd:
            "http://" +
            sessionStorage.getItem("vsasModuleUrl") +
            "/video/search/task/add",
          caseUuid: this.caseUuid,
          hdfs: sessionStorage.getItem("collectHdfsPath"),
          sessionId: this.$md5(
            new Date().getTime() +
              (Math.floor(Math.random() * (1000 - 1)) + 1).toString() +
              (Math.floor(Math.random() * (1000000 - 1)) + 1).toString()
          ),
          // dateTimes:this.beginData.replace(" ", "_") + '|' + this.endData.replace(" ", "_")
          dateTimes: arr1.join(","),
          storeFileType: sessionStorage.getItem("storeFileType"),
          ftp: sessionStorage.getItem("ftp"),
          ftpRedirectUrl: sessionStorage.getItem("ftpRedirectUrl")
        });
      }
      let data = {
        datas: JSON.stringify(list)
      };

      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/sky/batch/create", data).then(res => {
        if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$notify({
            type: "success",
            message: "任务创建成功",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "warning",
            message: "任务创建失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //离线
    addline() {
      let arr = _.filter(this.checkarr[1], item => {
        return !item.apes;
      });
      let list = [];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].allowVideoCount) {
          list.push({
            fileUuids: arr[i].fileUuids.join(","),
            deviceId: arr[i].shebeiId
          });
        }
      }
      let data = {
        caseUuid: this.caseUuid,
        deviceTasks: list
      };
      data = this.$qs.stringify(data, {
        arrayFormat: "indices",
        allowDots: true
      });
      this.$http
        .post("/vsas/task/structure/glst/device/batch/create", data)
        .then(res => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.checkarr = [[], []];
            this.$notify({
              type: "success",
              message: "任务创建成功！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "warning",
              message: "任务创建失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      setTimeout(() => {
        this.$emit("childByClose", "1");
      }, 500);
      //
    },
    // 处理一下参数
    handleArrData(arr) {
      let str1 = [];
      let str2 = [];
      for (let i = 0; i < arr[0].length; i++) {
        if (!arr[0][i].apes) {
          str1.push(arr[0][i]);
        }
      }
      for (let j = 0; j < arr[1].length; j++) {
        if (!arr[1][j].apes) {
          str2.push(arr[1][j]);
        }
      }
      str1 = str1.concat(str2);
      return str1;
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.checkBox {
  height: 0.4rem;
  line-height: 0.4rem;
}
.left {
  width: 25%;
  height: calc(100% - 0.4rem);
  float: left;
}
.right {
  width: 75%;
  height: calc(100% - 0.4rem);
  margin-left: 25%;
}
.left > div,
.right > div {
  height: 100%;
}

.el-tabs .el-tabs__content,
.el-tabs /deep/ .el-tabs__content {
  height: calc(100% - 0.4rem);
}
.el-tabs .el-tab-pane,
.el-tabs /deep/ .el-tab-pane {
  height: 100%;
}
.el-tabs .el-tabs__content input,
.el-tabs /deep/ .el-tabs__content input {
  line-height: 0.25rem;
  height: 0.25rem;
  padding-left: 0.1rem;
}
.timeinput {
  margin-top: 0.1rem;
}
.timeinput input {
  width: 65%;
}
.timeinput input:nth-child(2) {
  margin-top: 0.1rem;
}
.timeinputs p {
  margin-top: 0.01rem;
}
.timeinputs input {
  width: 2.5rem;
}

.el-tabs .el-tabs__content .el-tab-pane > ul,
.el-tabs /deep/ .el-tabs__content .el-tab-pane > ul {
  margin-top: 0.1rem;
  height: calc(100% - 0.4rem);
  /* border: 1px solid blue; */
  /* box-sizing: border-box; */
  overflow: auto;
}
.el-tabs .el-tabs__content .el-tab-pane > .one,
.el-tabs /deep/ .el-tabs__content .el-tab-pane > .one {
  height: calc(100% - 1.5rem);
}

.el-tabs .el-tabs__content .el-tab-pane > .ones,
.el-tabs /deep/ .el-tabs__content .el-tab-pane > .ones {
  height: calc(100% - 1.7rem);
}

.el-tabs .ztree li a.curSelectedNode,
.el-tabs /deep/ .ztree li a.curSelectedNode {
  background-color: transparent;
  border: none;
  color: #409eff !important;
  opacity: 1;
}
.el-tabs .level1,
.el-tabs /deep/ .level1 {
  width: calc(100% - 0.2rem);
}
.el-tabs .node_name,
.el-tabs /deep/ .node_name {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left .el-tabs__item,
.left /deep/ .el-tabs__item {
  padding: 0 0.16rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.left .el-tabs__item:nth-child(2),
.left /deep/ .el-tabs__item:nth-child(2) {
  padding-left: 0.16rem;
  margin: 0 0.05rem;
}
.left .el-tabs__item:last-child,
.left /deep/ .el-tabs__item:last-child {
  padding-right: 0.16rem;
  margin-left: 0.05rem;
}
.left .el-tabs__item span,
.left /deep/ .el-tabs__item span {
  font-size: 0.14rem;
}
.left .el-tabs__nav-prev,
.left .el-tabs__nav-next,
.left /deep/ .el-tabs__nav-prev,
.left /deep/ .el-tabs__nav-next {
  line-height: 0.44rem;
}
.el-tabs--border-card {
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}

.mainretrieval {
  width: 100%;
  height: calc(100% - 0.4rem);
}
.main {
  width: 100%;
  height: 100%;
}
.mainleft {
  width: 20%;
  height: 100%;
  background-color: rgba(16, 35, 56, 0.5);
  float: left;
}
.mainleft > div,
.mainleft .el-tabs {
  height: 100%;
}
.el-tabs .el-tabs__content,
.el-tabs /deep/ .el-tabs__content {
  height: calc(100% - 0.4rem);
}
.el-tabs .el-tab-pane,
.el-tabs /deep/ .el-tab-pane {
  height: 100%;
}
.el-tabs .el-tabs__content input,
.el-tabs /deep/ .el-tabs__content input {
  line-height: 0.25rem;
  height: 0.25rem;
  padding-left: 0.1rem;
}
.el-tabs .el-tabs__content .el-tab-pane > ul,
.el-tabs /deep/ .el-tabs__content .el-tab-pane > ul {
  margin-top: 0.1rem;
  height: calc(100% - 0.4rem);
  overflow: auto;
}
.el-tabs .ztree li a.curSelectedNode,
.el-tabs /deep/ .ztree li a.curSelectedNode {
  background-color: transparent;
  border: none;
  color: #409eff !important;
  opacity: 1;
}
.el-tabs .level1,
.el-tabs /deep/ .level1 {
  width: calc(100% - 0.2rem);
}
.el-tabs .node_name,
.el-tabs /deep/ .node_name {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mainleft .el-tabs__item,
.mainleft /deep/ .el-tabs__item {
  padding: 0 0.16rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.mainleft .el-tabs__item:nth-child(2),
.mainleft /deep/ .el-tabs__item:nth-child(2) {
  padding-left: 0.16rem;
  margin: 0 0.05rem;
}
.mainleft .el-tabs__item:last-child,
.mainleft /deep/ .el-tabs__item:last-child {
  padding-right: 0.16rem;
  margin-left: 0.05rem;
}
.mainleft .el-tabs__item span,
.mainleft /deep/ .el-tabs__item span {
  font-size: 0.14rem;
}
.mainleft .el-tabs__nav-prev,
.mainleft .el-tabs__nav-next,
.mainleft /deep/ .el-tabs__nav-prev,
.mainleft /deep/ .el-tabs__nav-next {
  line-height: 0.44rem;
}

.maincenter {
  overflow: hidden;
  width: 45%;
  height: 100%;
  position: relative;
  background-color: rgba(16, 35, 56, 0.5);
  float: left;
  margin-left: 1.5%;
  user-select: none;
  -webkit-user-select: none;
}
.maincenter p {
  font-weight: 700;
  color: #fff;
  line-height: 0.4rem;
  padding-left: 0.1rem;
  display: flex;
  justify-content: space-between;
}
.maincenter > div {
  position: relative;
  width: 100%;
  height: calc(100% - 0.5rem);
  margin-top: 0.1rem;
}
.maincenter img,
.maincenter canvas {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.el-tabs--border-card,
.el-tabs--border-card /deep/ .el-tabs__header,
.el-tabs--border-card /deep/ .el-tabs__header .el-tabs__item.is-active {
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: #113254;
}

.el-tabs--border-card /deep/ .el-tabs__header .el-tabs__item {
  color: #409eff;
  border-top: 3px solid rgba(16, 35, 56, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.el-tabs--border-card /deep/ .el-tabs__header .el-tabs__item.is-active {
  color: #99c9fa;
  border-top: 3px solid #409eff;
}

.el-select {
  width: 2.5rem;
}
.el-select .el-input__inner,
.el-select /deep/ .el-input__inner {
  height: 0.3rem;
  font-size: 0.14rem;
}
.span-ellipsis {
  color: #99c9fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.markNoBorder {
  background-color: rgba(49, 86, 131, 0.2);
}
.maincenter_img {
  width: 80%;
  height: 80%;
  margin: 0 auto;
}
.reterimgVideoVal {
  margin: auto;
  border: 1px solid #134276;
}
.mainright {
  width: 32%;
  height: 100%;
  float: right;
  position: relative;
}
.retrimain {
  width: 100%;
  height: 100%;
  font-size: 0.14rem;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.retrimain div {
  margin-top: 5px;
}
.retritask {
  line-height: 0.4rem;
  font-size: 0.14rem;
  color: #fff;
  font-weight: 700;
  padding-left: 0.1rem;
}
.taskNames {
  padding: 0rem 0.3rem;
  padding-bottom: 0.1rem;
  line-height: 0.3rem;
}
.searchtype {
  padding: 0;
  padding-bottom: 0.1rem;
  padding-left: 0.3rem;
}
.searchtype input {
  width: 31%;
  height: 0.24rem;
  line-height: 0.3rem;
}
.searchtype .el-button {
  padding: 0 0.1rem;
  height: 0.3rem;
}
.taskNames input {
  width: 68%;
  height: 0.24rem;
  padding-left: 0.1rem;
  margin-left: 0.75rem;
  border: 1px solid #dcdfe6;
  background-color: #fcfcfd;
}
.taskNames span,
.changetype span:first-child {
  display: inline-block;
  position: absolute;
  width: 0.9rem;
}
.changetype {
  margin-left: 0.3rem;
}
.changetype .changecolor i {
  font-style: normal;
  display: inline-block;
  border: 1px solid rgba(15, 64, 152, 0.8);
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0.05rem 0.15rem;
  cursor: pointer;
  color: #99c9fa;
}
.changecolor {
  margin-left: 0.8rem;
}
.changetype .changecolor .active {
  background-color: #409eff;
  color: #fff;
}
.setretrieve {
  padding: 0rem 0.3rem;
  position: relative;
  height: calc(100% - 2.2rem);
}
.setretrieve > p {
  line-height: 0.3rem;
}
.setretrieve .rule {
  border: 1px solid rgba(15, 64, 152, 0.8);
  height: calc(100% - 0.5rem);
  padding: 0.1rem 0.2rem;
}
.rule p {
  font-size: 0.14rem;
  padding-bottom: 0.1rem;
}
.rule .el-checkbox__label,
.rule /deep/ .el-checkbox__label {
  font-size: 0.14rem;
  color: #99c9fa;
}
.el-radio .el-radio__label,
.el-radio /deep/ .el-radio__label {
  font-size: 0.14rem;
}
.rule div {
  margin-top: 20px;
}
.criminalSuspectDetial {
  height: 5rem;
  padding-bottom: 0.1rem;
  opacity: 0.9;
}
.filter-tree {
  width: 100%;
  height: 5rem;
}
.dialog1 .main1,
.dialog2 .main2 {
  height: 5rem;
  position: relative;
  border: 1px solid #dcdfe6;
}
.dialog2 .main2 {
  height: 4.7rem;
  border: 0;
}
.main2_top {
  display: flex;
  font-size: 0.14rem;
  justify-content: flex-start;
  color: #99c9fa;
}
.main2_top p .el-input {
  width: 2rem;
  height: 0.3rem;
  padding-left: 0.1rem;
}
.main2_top p .el-input .el-input__prefix,
.main2_top p .el-input /deep/ .el-input__prefix {
  left: 0.13rem;
}
.main3_btn {
  height: 6rem;
  user-select: none;
  -webkit-user-select: none;
}
.firstdiv {
  width: 100%;
  height: 4.6rem;
  border: 1px solid rgba(15, 64, 152, 0.8);
  position: relative;
}
.firstdiv img,
.firstdiv canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.twodiv {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  border: 1px solid rgba(15, 64, 152, 0.8);
  position: relative;
  padding-left: 0.1rem;
}
.twodiv span {
  color: #99c9fa;
  position: absolute;
  top: 0.25rem;
  left: 0.1rem;
}
.twodiv .el-radio {
  margin-right: 0.1rem;
}
.centerbtn {
  margin: 0.2rem 0;
}
.centerbtn b {
  cursor: pointer;
  color: #99c9fa;
}
.selectpos {
  width: 1rem;
}
.contentTitleItem {
  width: 1rem;
  height: 0.3rem;
  display: inline-block;
  text-align: center;
  line-height: 0.32rem;
  border-radius: 3px;
  cursor: pointer;
  color: #99c9fa;
  font-size: 0.12rem;
  background: url("../../../assets/images/videoNewImg/btnhover.png") no-repeat
    center center / 100% 100%;
}
.contentactive {
  color: #409eff;
  background: url("../../../assets/images/videoNewImg/btnnormal.png") no-repeat
    center center / 100% 100%;
}
.el-select .el-tag,
.el-select /deep/ .el-tag {
  color: #99c9fa;
  background-color: rgba(255, 255, 255, 0);
}
.fontRed {
  color: red;
}
@media (max-width: 1440px) {
  .setretrieve {
    padding: 0rem 0.3rem;
    position: relative;
    height: calc(100% - 1.2rem);
  }
}
</style>
