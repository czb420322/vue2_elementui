<template>
  <div class="taskMange">
    <el-dialog
      title="嫌疑目标管理"
      :visible.sync="dialogVisible"
      @close="closeDia"
      @open="opendia"
      top="10vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="70%"
    >
      <span class="taskrelation" v-if="dialogVisible">
        <div class="sus_left">
          <div class="modelPartTitle">
            <div class="titleLine"></div>
            <div class="titleTxt">标注池</div>
          </div>
          <div class="sus_l_main">
            <div class="seachlist">
              <span>点位名称：</span>
              <el-select v-model="checkdeviceId" @change="changePoint">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="(item, index) in checkpointlist"
                  :key="index"
                  :label="item.cameraName"
                  :value="item.deviceUuid"
                ></el-option>
              </el-select>
              <span v-show="dataCaseInfo.isSpecial == 1">标注创建人：</span>
              <el-select
                v-show="dataCaseInfo.isSpecial == 1"
                v-model="checkcurrent"
                @change="changeCreat"
              >
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="(item, index) in currentList"
                  :key="index"
                  :label="item.user.trueName"
                  :value="item.user.userId"
                ></el-option>
              </el-select>
              <el-button
                class="searchBtn"
                v-no-more-click
                @click="getAlllMarker(susObjeck.suspicionType == undefined ? -1 : susObjeck.suspicionType,null);"
              >查询</el-button>
            </div>
            <ul class="mainul">
              <li
                v-for="(item,index) in imglist"
                :key="index"
                @mouseover="getInfo(item,$event)"
                @mouseout="goout"
              >
                <div :id="'markLi'+index">
                  <b title="删除标注" @click.stop="dellable(item,index)" class="deleteLable">
                    <img src="../../../assets/images/videoNewImg/commhand/delete.png" alt>
                  </b>
                  <!-- <el-button  class="searchBtn searchBottom none" @click="collecPictBtn(item)">搜</el-button> -->
                  <p
                    class="searchPic none"
                    v-show="showVideoStruct == 'true' || zkyStructureSwitch == 'true'"
                    @click.stop="downLoadPictBtn(item)"
                  >下载</p>
                  <p
                    class="search none"
                    title="快捷以图搜图"
                    v-show="showVideoStruct == 'true' || zkyStructureSwitch == 'true'"
                    @click.stop="collecPictBtn(item)"
                  >搜</p>

                  <b
                    @click.stop.self="playsFlvVideo(item,index)"
                    :class="{markNoBorder:index == nowIndex}"
                    class="play none"
                  ></b>
                  <img
                    class="width"
                    src="@/assets/error_none.png"
                    alt="暂无图片"
                    v-if="!item.videoCaptureUrl"
                  >
                  <img
                    class="imgwidth"
                    :id="'marker_'+index"
                    :src="item.videoCaptureUrl"
                    alt="暂无图片"
                    @click.stop.self="playsFlvVideo(item,index)"
                    :class="{markNoBorder:index == nowIndex}"
                  >
                  <!-- <span :id="'img_'+index" class="boderShow"></span> -->
                </div>
                <p>
                  <span :title="item.markName">标注名称：{{ item.markName }}</span>
                  <span :title="item | lableTime">时间：{{ item | lableTime}}</span>
                  <span :title="item.device.name">位置：{{item.device.name}}</span>
                </p>
                <i type="primary" class="el-icon-edit" @click="updateLable(item)" title="修改标注"></i>
                <el-button class="searchBtn" v-no-more-click @click="handSus(item)">关联</el-button>
              </li>
            </ul>
            <el-pagination
              style="float: right;margin-right: 0.1rem;"
              :background="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            ></el-pagination>
          </div>
        </div>

        <div class="sus_right">
          <div class="modelPart">
            <div class="titleLine"></div>
            <div class="titleTxt">目标池</div>
          </div>
          <el-button type="primary" class="searchBtn" @click="addsus">新建嫌疑目标</el-button>
          <div class="checkSus">
            <el-select v-model.trim="suspicion" @change="changeSus" value-key="suspicionUuid">
              <el-option
                :value="alltype"
                :key="alltype.suspicionType"
                :label="alltype.suspicionName"
              ></el-option>
              <el-option
                v-for="sus in suspcitionList"
                :key="sus.suspicionUuid"
                :label="sus.suspicionName"
                :value="sus"
              ></el-option>
            </el-select>
            <el-button type="primary" :disabled="isall" class="searchBtn" @click="openUpdte()">编辑</el-button>
            <el-button
              type="primary"
              :disabled="isall"
              class="delBtn"
              @click="ajaxDel();delTrack(susObjeck)"
            >删除</el-button>
          </div>
          <div class="property">
            <ul>
              <li>嫌疑目标名称:{{susObjeck.suspicionName}}</li>
              <li>嫌疑目标类型:{{susObjeck.suspicionType | sustype}}</li>
              <li>嫌疑目标速度:{{susObjeck | speedType}}</li>
              <li
                v-show="suspicion.suspicionType !=3"
              >嫌疑目标性别:{{susObjeck.suspicionSex == undefined ? '' : (susObjeck.suspicionSex == '0' ? '男' : '女')}}</li>
              <li v-show="suspicion.suspicionType !=3">嫌疑目标电话:{{susObjeck.suspicionPhone}}</li>
              <li v-show="suspicion.suspicionType !=3">嫌疑目标身份证:{{susObjeck.suspicionCard}}</li>
              <li
                :title="susObjeck.suspicionAddress"
                v-show="suspicion.suspicionType !=3"
              >嫌疑目标住址:{{susObjeck.suspicionAddress}}</li>
              <li
                :title="susObjeck.description"
                v-show="suspicion.suspicionType !=3"
              >嫌疑目标描述:{{susObjeck.description}}</li>
            </ul>
          </div>
          <div class="yetSus">
            <div class="modelPart">
              <div class="titleLine"></div>
              <div class="titleTxt">已关联标注池</div>
            </div>
            <div class="vmark">
              <ul class="mainul mainSmallul">
                <li
                  v-for="(item,index) in nowSuslist"
                  :key="index"
                  @mouseover="getInfo(item,$event)"
                  @mouseout="goout"
                >
                  <div :id="'vmarkLi'+index">
                    <b
                      @click.stop.self="playsFlvVideo(item,index)"
                      :class="{markNoBorder:index == nextNowIndex}"
                      class="play none"
                    ></b>
                    <!-- <img :src="item.traceImgUrl" alt="暂无图片" v-if="!item.videoSliceInfo && !item.videoMark"> -->
                    <!-- <p v-show="item.videoSliceInfo" style="text-indent: 0.1rem;">视频</p> -->
                    <!-- <p v-show="item.videoMark" style="text-indent: 0.1rem;">视频标注</p> -->
                    <!-- <el-button  class="searchBtn searchBottom none" @click="collecPictBtn(item)">搜</el-button> -->
                    <p class="searchPic none" @click.stop="downLoadPictBtn(item)">下载</p>
                    <p
                      class="search none"
                      title="快捷以图搜图"
                      v-show="showVideoStruct == 'true' || zkyStructureSwitch == 'true'"
                      @click.stop="collecPictBtn(item)"
                    >搜</p>
                    <img src="@/assets/error_none.png" alt="暂无图片" v-if="!item.videoCaptureUrl">
                    <img
                      @click.stop.self="playsFlvVideo(item,index)"
                      :class="{markNoBorder:index == nextNowIndex}"
                      class="imgwidth"
                      :id="'vmarker_'+index"
                      :src="item.videoCaptureUrl"
                      alt="暂无图片"
                      v-if="item.videoCaptureUrl"
                    >
                    <!-- <span :id="'vimg_'+index" class="boderShow"></span> -->
                  </div>
                  <p>
                    <span :title="item.markName ">标注名称：{{ item.markName }}</span>
                    <span :title="item | lableTime">时间：{{ item | lableTime }}</span>
                    <span :title="item.device.name">位置：{{ item.device.name }}</span>
                  </p>
                  <el-button
                    type="primary"
                    class="searchBtn"
                    v-no-more-click
                    @click="cancleSus(item);delTrack(item)"
                  >解除</el-button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <handword :showhandword="showhandword" :isonline="false" @childbyHandwork="childbyHandwork"></handword>

        <el-dialog
          :title="updateType + '嫌疑目标'"
          :visible.sync="addsusTarget"
          :append-to-body="true"
          :close-on-press-escape="false"
          :close-on-click-modal="false"
          @close="closesus"
          @open="open1"
          width="20%"
        >
          <span>
            <div class="addleft">
              <p class="tilte_top">
                <b>|</b>&nbsp;&nbsp;嫌疑目标信息
              </p>
              <p style="width:3.5rem;">
                <b class="must" style="color:red">*</b>
                <span>嫌疑目标名称:</span>
                <input
                  type="text"
                  maxlength="10"
                  v-model.trim="susName"
                  :disabled="suspicionSee"
                  placeholder="请输入嫌疑目标名称"
                  onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                >
                <b class="mustText mustText1" v-show="tenLength">
                  请输入小于10个字
                  <i></i>
                </b>
                <b class="mustText mustText1" v-show="emptyMust">
                  嫌疑目标名称不能为空
                  <i></i>
                </b>
              </p>
              <p>
                <span>嫌疑目标类型:</span>
                <el-radio-group v-model="person" @change="changeRadio">
                  <el-radio label="1" :disabled="personDisabled" ref="person1">人</el-radio>
                  <el-radio label="2" :disabled="personDisabled" ref="person2">骑车人</el-radio>
                  <el-radio label="3" :disabled="personDisabled" ref="person3">车辆</el-radio>
                </el-radio-group>
              </p>
              <p v-show="isSpeed == 1">
                <span>嫌疑目标速度:</span>
                <el-radio-group v-model.trim="speed" @change="changeSpeed">
                  <el-radio label="1.39">常速</el-radio>
                  <el-radio label="2.22">快速</el-radio>
                  <el-radio label="0.83">慢速</el-radio>
                </el-radio-group>
              </p>
              <p v-show="isSpeed == 2">
                <span>嫌疑目标速度:</span>
                <el-radio-group v-model.trim="speed" @change="changeSpeed">
                  <el-radio label="4.16">常速</el-radio>
                  <el-radio label="5.55">快速</el-radio>
                  <el-radio label="2.77">慢速</el-radio>
                </el-radio-group>
              </p>
              <p v-show="isSpeed == 3">
                <span>嫌疑目标速度:</span>
                <el-radio-group v-model.trim="speed" @change="changeSpeed">
                  <el-radio label="8.33">常速</el-radio>
                  <el-radio label="13.88">快速</el-radio>
                  <el-radio label="5.55">慢速</el-radio>
                </el-radio-group>
              </p>
              <p class="susex" v-show="isShow">
                <span>嫌疑目标性别:</span>
                <el-select v-model.trim="susSex" :disabled="suspicionSee" ref="susSex">
                  <el-option
                    v-for="(item,index) in sexlist"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                  <!-- <el-option value='0' label='男'></el-option>
                  <el-option value='1' label='女'></el-option>-->
                </el-select>
              </p>
              <p v-show="isShow" class="tlephone">
                <span>嫌疑目标电话:</span>
                <input
                  type="text"
                  v-model.trim="susNumber"
                  maxlength="11"
                  :disabled="suspicionSee"
                  ref="susNumber"
                  placeholder="请输入嫌疑目标电话"
                >
                <b class="mustText mustText1" v-show="phoneNum">
                  请输入正确的电话号码
                  <i></i>
                </b>
              </p>
              <p v-show="isShow" class="idNumber">
                <span>嫌疑目标身份证:</span>
                <input
                  type="text"
                  v-model.trim="susStatus"
                  maxlength="18"
                  :disabled="suspicionSee"
                  ref="susStatus"
                  placeholder="请输入嫌疑目标身份证"
                >
                <b class="mustText mustText1" v-show="idCard">
                  请输入正确的身份证号
                  <i></i>
                </b>
              </p>
              <p v-show="isShow">
                <span>嫌疑目标住址:</span>
                <input
                  type="text"
                  v-model.trim="susAddress"
                  maxlength="50"
                  :disabled="suspicionSee"
                  ref="susAddress"
                  placeholder="请输入嫌疑目标住址"
                >
                <b class="mustText mustText1" v-show="textLength">
                  请输入少于50字
                  <i></i>
                </b>
              </p>
              <p class="describe">
                <span v-show="isShow">嫌疑目标描述:</span>
                <b class="mustText mustText0" v-show="oneHundlength">
                  请输入小于100字
                  <i></i>
                </b>
                <textarea
                  v-show="isShow"
                  v-model.trim="susDescribe"
                  style="resize: none"
                  maxlength="100"
                  :disabled="suspicionSee"
                  ref="susDescribe"
                  placeholder="请输入嫌疑目标描述"
                ></textarea>
                <el-button
                  type="primary"
                  class="leftto searchBtn"
                  @click="DialogVisible1=true"
                  v-show="updateType == '修改' && is3Ddisabled == false"
                >{{ suspicionSee ? '查看特征':'关联特征'}}</el-button>
              </p>
              <el-dialog
                :title="suspicionSee ? '查看特征信息' : '添加特征信息'"
                :modal="false"
                :visible.sync="DialogVisible1"
                width="70%"
              >
                <span v-if="DialogVisible1">
                  <Suspects3D
                    :suspicionUuid="suspicionUuid"
                    :suspicionSee="suspicionSee"
                    :Suspects3DType="person"
                  ></Suspects3D>
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary cancleBtn" @click="DialogVisible1 = false">关 闭</el-button>
                </span>
              </el-dialog>

              <!-- <el-button type="primary" v-show="updateType == '编辑'" class="searchBtn">关联特征</el-button> -->
            </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary cancleBtn" @click="addsusTarget = false">取 消</el-button>
            <el-button type="primary passBtn" @click="addUpdate" :disabled="isclick">确 定</el-button>
          </span>
        </el-dialog>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancleBtn" @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button @click="dialogVisible = false"></el-button>
        <el-button  @click="dialogVisible = false"></el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Suspects3D from "./addSuspects3D"; //嫌疑人特征
import flvplay from "../../../api/casestudy/flvPlay.js";
import verify from "../../../api/casestudy/verify.js";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import handword from "../../videoCombat/fastFight/handworkLable";
import reviseTime from "../../../api/realvideo/reviseTime.js";

export default {
  data() {
    return {
      dialogVisible: false,
      DialogVisible1: false,
      pageSizes: [12, 24, 36],
      pageSize: 12,
      totalCount: 0,
      currentPage: 1,
      imglist: [], //嫌疑人目标管理
      suspicionType: "-1", //嫌疑人类型
      suspcitionList: [], //嫌疑人目标
      suspicion: {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "全部(未关联)"
      }, //嫌疑人对象
      suspicionUuid: "", //嫌疑人ID
      susObjeck: {}, //获取的嫌疑人对象
      nowSuslist: [], //当前嫌疑人的目标
      addsusTarget: false, //打开第二层模态框
      susName: "",
      suspicionSee: false,
      susNameMust: false,
      person: "1", //类型，
      speed: "1.39",
      isSpeed: "1",
      isShow: true,
      susSex: "0",
      sexlist: [{ value: "0", name: "男" }, { value: "1", name: "女" }],
      alltype: {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "全部(未关联)"
      },
      susNumber: "",
      susStatus: "",
      susAddress: "",
      susDescribe: "",
      is3Ddisabled: false,
      personDisabled: false,
      updateType: "新增",
      isall: true,
      imgListWH: [], //图片自适应的宽高比
      imgnowWH: [],
      showhandword: false, //打开手工标注的页面
      searchimg: false,
      isFirst: 0,
      nowIndex: null,
      nextNowIndex: null,
      trajectoryArr: [],
      isclick: false, //重复点击
      checkdeviceId: "",
      checkcurrent: "",
      currentList: [],
      checkpointlist: []
    };
  },
  components: {
    Suspects3D,
    handword
  },
  mounted() {},
  computed: {
    ...mapGetters(["ishandupdate", "gethanlabel", "targetToSearchImg"])
  },
  mixins: [flvplay, verify, reviseTime],
  watch: {
    totalCount(val) {
      if (val == 0) {
        return;
      } else {
        if (Number(val) % 12 == 0) {
          if (this.currentPage > 1) {
            this.currentPage -= 1;
            if (this.susObjeck.suspicionType == undefined) {
              this.getAlllMarker(-1, null);
              this.goout();
            } else {
              this.getAlllMarker(this.susObjeck.suspicionType, null);
              this.goout();
            }
          } else {
            this.currentPage = 1;
            if (this.susObjeck.suspicionType == undefined) {
              this.getAlllMarker(-1, null);
              this.goout();
            } else {
              this.getAlllMarker(this.susObjeck.suspicionType, null);
              this.goout();
            }
          }
        }
      }
    },
    imglist: {
      handler(newValue, oldValue) {
        if (newValue.length) {
          for (let i = 0; i < newValue.length; i++) {
            var img = new Image();
            img.onload = () => {
              let imgw = document.getElementById("marker_" + i).naturalWidth;
              let imgh = document.getElementById("marker_" + i).naturalHeight;
              let rate = this.$store.state.screenWidth / 1920;
              let retw =
                document.getElementById("markLi" + i).clientWidth * rate;
              let reth =
                document.getElementById("markLi" + i).clientHeight * rate;
              let unit = 1;
              let unitTop = 0;
              let unitLeft = 0;
              if (retw / reth < imgw / imgh) {
                this.imgListWH.push("width");
                unit = imgw / retw;
                unitTop = (reth - imgh / unit) / 2;
                this.showfalse = true;
              } else {
                this.imgListWH.push("height");
                unit = imgh / reth;
                unitLeft = (retw - imgw / unit) / 2;
                this.showfalse = true;
              }
            };
            img.src = newValue[i].videoCaptureUrl;
            img.onerror = () => {
              this.imgListWH.push("width");
            };
          }
        }
      },
      deep: true
    },
    nowSuslist: {
      handler(newValue, oldValue) {
        if (newValue.length) {
          for (let i = 0; i < newValue.length; i++) {
            var img = new Image();
            img.onload = () => {
              let imgw = document.getElementById("vmarker_" + i).naturalWidth;
              let imgh = document.getElementById("vmarker_" + i).naturalHeight;
              let rate = this.$store.state.screenWidth / 1920;
              let retw =
                document.getElementById("vmarkLi" + i).clientWidth * rate;
              let reth =
                document.getElementById("vmarkLi" + i).clientHeight * rate;
              let unit = 1;
              let unitTop = 0;
              let unitLeft = 0;
              if (retw / reth < imgw / imgh) {
                this.imgnowWH.push("width");
                unit = imgw / retw;
                unitTop = (reth - imgh / unit) / 2;
                this.showfalse = true;
              } else {
                this.imgnowWH.push("height");
                unit = imgh / reth;
                unitLeft = (retw - imgw / unit) / 2;
                this.showfalse = true;
              }
            };
            img.src = newValue[i].videoCaptureUrl;
            img.onerror = () => {
              this.imgnowWH.push("width");
            };
          }
        }
      },
      deep: true
    },
    istargetsus(val) {
      this.dialogVisible = val;
      this.isall = true;
    },
    addsusTarget(val) {
      if (this.updateType == "新增") {
        if (val) {
          this.speed = "1.39";
          this.isSpeed = 1;
          this.person = "1";
        }
      }
    }
  },
  filters: {
    sustype(val) {
      if (val == 1) {
        return "嫌疑人";
      } else if (val == 2) {
        return "嫌疑骑车人";
      } else if (val == 3) {
        return "嫌疑车辆";
      }
    },
    speedType(val) {
      if (val.speed == "1.39" || val.speed == "4.16" || val.speed == "8.33") {
        return "常速";
      } else if (val.speed == "2.22" || val.speed == "13.88") {
        return "快速";
      } else if (val.suspicionType == 2 && val.speed == "5.55") {
        return "快速";
      } else if (val.suspicionType == 3 && val.speed == "5.55") {
        return "慢速";
      } else if (val.speed == "0.83" || val.speed == "2.77") {
        return "慢速";
      }
    },
    lableTime(val) {
      let nowplaytime;
      let alltime;
      if (val.absoluteTime) {
        nowplaytime = new Date(val.absoluteTime).getTime();
        alltime = Number(nowplaytime) + Number(val.offset * 1000);
      } else {
        nowplaytime = new Date(val.videoStartTime).getTime();
        alltime =
          Number(nowplaytime) +
          Number(val.relativeTime) +
          Number(val.offset * 1000); // 开始时间+相对时间+设备时间
      }
      let date = new Date(alltime);
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
  props: {
    istargetsus: Boolean,
    pointlist: Array,
    dataCaseInfo: Object
  },
  methods: {
    ...mapActions(["toggleHandLable", "toggleHandfalse"]),
    ...mapMutations([
      "updatehanlabel",
      "setshowInfo", //设置结构化信息显示和隐藏
      "setshowInfoMan", ////结构化信息的类型  人车骑车人
      "setlableInfo",
      "setlableInfoMan",
      "setsearchImgBtn", // 以图搜图存储嫌疑人目标
      "setisupdatejudged",
      "settargetToSearchImg" // 存储嫌疑目标id
    ]),
    changePoint() {
      this.currentPage = 1;
      setTimeout(() => {
        if (this.susObjeck.suspicionType != undefined) {
          this.getAlllMarker(
            this.susObjeck.suspicionType,
            this.susObjeck.suspicionUuid
          );
        } else {
          this.getAlllMarker(-1, null);
        }
      }, 10);
    },
    changeCreat() {
      this.currentPage = 1;
      setTimeout(() => {
        if (this.susObjeck.suspicionType != undefined) {
          this.getAlllMarker(
            this.susObjeck.suspicionType,
            this.susObjeck.suspicionUuid
          );
        } else {
          this.getAlllMarker(-1, null);
        }
      }, 10);
    },
    //打开修改手工标注页面
    updateLable(row) {
      this.getLableInfo(row.markId);
      this.setisupdatejudged(true);
    },
    //获取标注信息
    getLableInfo(id) {
      let data = {
        markId: id
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/video/mark/query/mark/by/id", data).then(res => {
        if (res.data.code == 200) {
          this.updatehanlabel(res.data.data);
          this.showhandword = true;
          this.toggleHandLable();
        }
      });
    },
    childbyHandwork() {
      this.showhandword = false;
      this.toggleHandfalse();
      if (this.suspicion.suspicionType == -1) {
        this.getAlllMarker("-1", null);
      } else {
        this.getAlllMarker(this.susObjeck.suspicionType, null);
        this.getlableMarker(
          this.susObjeck.suspicionType,
          this.susObjeck.suspicionUuid
        );
      }
    },
    //得到所有的标注视频
    //type 表示嫌疑目标类型 uuid表示嫌疑目标ID
    getAlllMarker(type, uuid) {
      let data = {
        caseUuid: this.$route.query.caseUuid,
        suspicionType: type,
        suspicionUuid: uuid,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        createUser: this.checkcurrent,
        deviceUuid: this.checkdeviceId
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("/pca/casemng/suspicion/mark/not/selectable/new/list", data)
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.length == 0) {
              this.imglist = [];
              this.totalCount = 0;
              this.goout();
            } else {
              this.imglist = res.data.data.list;
              this.totalCount = res.data.data.totalCount;
            }
          }
        });
    },
    //得到嫌疑人的关联标注
    //type 表示嫌疑目标类型 uuid表示嫌疑目标ID
    getlableMarker(type, uuid) {
      let data = {
        caseUuid: this.$route.query.caseUuid,
        suspicionType: type,
        suspicionUuid: uuid,
        pageNum: 1,
        pageSize: 2000
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("/pca/casemng/suspicion/mark/selectable/new/list", data)
        .then(res => {
          if (res.data.code == 200) {
            if (
              res.data.data != null ||
              res.data.data != "" ||
              res.data.data.length
            ) {
              this.nowSuslist = res.data.data.list;
            } else {
              this.nowSuslist = [];
              this.goout();
            }
          }
        });
    },

    //关闭模态框
    closeDia() {
      this.setshowInfo(false);
      this.$emit("childyTargetSus", false, this.searchimg);
      // if(this.suspicion.suspicionUuid) {
      //   this.$emit('trajectoryUuid',this.suspicion.suspicionUuid)
      // }
      this.suspicion = {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "全部(未关联)"
      };
      this.pageSize = 12;
      this.susObjeck = {};
      this.suspicionType = "-1";
      this.currentPage = 1;
      this.imglist = [];
      this.nowSuslist = [];
      this.checkdeviceId = "";
      this.checkcurrent = "";
      this.checkpointlist = [];
    },
    //打开模态框
    opendia() {
      this.showVideoStruct = sessionStorage.getItem("glstStructureSwitch");
      this.zkyStructureSwitch = sessionStorage.getItem("zkyStructureSwitch");
      this.imglist = [];
      this.nowSuslist = [];
      this.getcurrentlist();
      for (let i = 0; i < this.pointlist.length; i++) {
        if (
          this.pointlist[i].cameraType == 1 ||
          this.pointlist[i].cameraType == 4 ||
          this.pointlist[i].cameraType == 5
        ) {
          this.checkpointlist.push(this.pointlist[i]);
        }
      }
      if (this.targetToSearchImg.type == 0) {
        (this.suspicion = {
          suspicionUuid: "",
          suspicionType: "-1",
          suspicionName: "全部(未关联)"
        }),
          this.getAlllMarker("-1", null);
        this.getSuspcition(this.isFirst);
        this.susObjeck = {};
      } else if (this.targetToSearchImg.type == 1) {
        if (this.targetToSearchImg.suspicionType == -1) {
          this.getAlllMarker("-1", null);
          this.getSuspcition(this.isFirst);
          this.susObjeck = {};
        } else {
          this.changeSus(this.targetToSearchImg);
        }
      }
    },
    getcurrentlist() {
      let data = {
        caseUuid: this.$route.query.caseUuid,
        pageNum: 1,
        pageSize: 10000,
        orderBy: "create_time",
        orderType: "desc"
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/synergyhandler/selectHandlerList", data)
        .then(res => {
          if (res.data.code == 200) {
            this.currentList = res.data.data.list;
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.suspicion.suspicionType == -1) {
        this.getAlllMarker("-1", null);
      } else {
        this.getAlllMarker(this.susObjeck.suspicionType, null);
      }
    },
    // 跳转到以图搜图
    collecPictBtn(val) {
      this.setsearchImgBtn(val);
      this.dialogVisible = false; // 嫌疑目标页面关闭
      this.goout(); // 隐藏标注的详细信息
      this.$emit("childsearchImgBtn", true);
      //跳转快捷以图搜图结果，并且传入type = 1 ,表示是从嫌疑目标管理跳转过来的
      this.suspicion.type = 1;
      this.settargetToSearchImg(this.suspicion); // 存储嫌疑目标数据
    },
    // 嫌疑目标下载压缩包
    downLoadPictBtn(item) {
      let downLoadVsas = sessionStorage.getItem("vsasModuleUrl");
      window.open(
        "http://" +
          downLoadVsas +
          "/download/mark?markIds=" +
          item.markId +
          "&caseUuid=" +
          this.$route.query.caseUuid
      );
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.suspicion.suspicionType == -1) {
        this.getAlllMarker("-1", null);
      } else {
        this.getAlllMarker(this.susObjeck.suspicionType, null);
      }
    },
    //获取嫌疑人目标个数
    getSuspcition(isFirst) {
      let data = {
        caseUuid: this.$route.query.caseUuid
      };
      this.$http
        .get("/pca/casemng/suspicion/list", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.length == 0) {
              this.suspicion = {
                suspicionUuid: "",
                suspicionType: "-1",
                suspicionName: "全部(未关联)"
              };
              this.isall = true;
              this.nowSuslist = [];
              this.suspcitionList = [];
              this.susObjeck = {};
              this.suspicionType = -1;
              this.getAlllMarker("-1", null);
            } else {
              if (isFirst == 0) {
                this.suspcitionList = res.data.data;
              } else {
                this.suspcitionList = res.data.data;
                this.suspicion = res.data.data[0];
                this.isall = false;
                this.suspicionType = this.suspicion.suspicionType;
                this.suspicionUuid = this.suspicion.suspicionUuid;
                this.getAlllMarker(this.suspicionType, null);
                this.getlableMarker(this.suspicionType, this.suspicionUuid);
                this.getSuspcDetail();
              }
              // setTimeout(()=>{
              //   this.changeSus(this.suspcitionList[0])
              // },100)
            }
          }
        });
    },
    //获取嫌疑人的详细信息
    getSuspcDetail() {
      let data = {
        suspicionUuid: this.suspicionUuid
      };
      this.$http
        .get("/pca/casemng/suspicion/details", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data == null) {
              this.susObjeck = {};
            } else {
              this.susObjeck = res.data.data;
              this.isSpeed = res.data.data.suspicionType;
              this.speed = res.data.data.speed;
              this.suspicion = this.susObjeck;
            }
          }
        });
    },
    //切换嫌疑人目标的时候请求数据
    changeSus(row) {
      this.currentPage = 1;
      if (row.suspicionType == -1) {
        this.isall = true;
        this.nowSuslist = [];
        this.suspicionType = -1;
        this.getAlllMarker("-1", null);
        this.susObjeck = {};
      } else {
        this.isall = false;
        this.imglist = [];
        this.nowSuslist = [];
        this.suspicionType = row.suspicionType;
        this.suspicionUuid = row.suspicionUuid;
        if (this.suspicionType == 1) {
          this.isSpeed = 1;
          this.speed = row.speed;
        } else if (this.suspicionType == 2) {
          this.isSpeed = 2;
          this.speed = row.speed;
        } else {
          this.isSpeed = 3;
          this.speed = row.speed;
        }

        // this.getAlllMarker(row.suspicionType,null);
        this.getAlllMarker(row.suspicionType, row.suspicionUuid);
        this.getlableMarker(row.suspicionType, row.suspicionUuid);
        this.getSuspcDetail();
      }
    },

    //解除关联
    // cancleSus(row){
    //   this.$store.state.showInfo = false
    //   let targetUuid = ''
    //   targetUuid = row.videoMark.markId
    //   let data = {
    //     suspicionUuid: this.suspicionUuid,
    //     targetUuid: targetUuid
    //   }
    //   data = this.$qs.stringify(data)

    //   this.$http.post('pca/casemng/suspicion/mark/rel/cancel',data).then(res=>{
    //     if(res.data.code == 200){
    //       // this.getImgList();
    //       // this.getNowSus();
    //     }
    //   })
    // },

    cancleSus(row) {
      this.setshowInfo(false);
      let targetUuid = "";
      targetUuid = row.markId;
      let data = {
        suspicionType: this.susObjeck.suspicionType,
        suspicionUuid: this.susObjeck.suspicionUuid,
        operateionType: 0,
        targetUuid: targetUuid
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/casemng/suspicion/update/relevance/mark", data)
        .then(res => {
          if (res.data.code == 200) {
            this.getAlllMarker(this.susObjeck.suspicionType, null);
            this.getlableMarker(
              this.susObjeck.suspicionType,
              this.susObjeck.suspicionUuid
            );
          } else {
            this.$notify({
              type: "warning",
              message: "解除失败",
              position: "bottom-right",
              duration: 3000
            });
            this.getAlllMarker(this.susObjeck.suspicionType, null);
            this.getlableMarker(
              this.susObjeck.suspicionType,
              this.susObjeck.suspicionUuid
            );
          }
        });
    },
    //解除嫌疑目标的时候删除当前目标对应的轨迹
    delTrack(item) {
      let deviceId = "";
      for (let i = 0; i < this.nowSuslist.length; i++) {
        this.nowSuslist[i].selfTime = this.lableTime(this.nowSuslist[i]);
      }
      this.nowSuslist = this.sortDateTime(this.nowSuslist, "selfTime");

      if (this.nowSuslist.length > 1) {
        if (item.markId == this.nowSuslist[this.nowSuslist.length - 1].markId) {
          deviceId = this.nowSuslist[this.nowSuslist.length - 2].markId;
        } else {
          deviceId = item.markId;
        }
      }

      let data = {
        suspicionUuid: item.suspicionUuid,
        deviceId: deviceId
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/casemng/delete/suspicion/trajectory", data)
        .then(res => {
          this.setshowInfo(false);
        });
    },

    lableTime(val) {
      let nowplaytime;
      let alltime;
      if (val.absoluteTime) {
        nowplaytime = new Date(val.absoluteTime).getTime();
        alltime = Number(nowplaytime) + Number(val.offset * 1000);
      } else {
        nowplaytime = new Date(val.videoStartTime).getTime();
        alltime =
          Number(nowplaytime) +
          Number(val.relativeTime) +
          Number(val.offset * 1000); // 开始时间+相对时间+设备时间
      }
      let date = new Date(alltime);
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
    },

    sortDateTime(data, key) {
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Date.parse(data[j][key]) > Date.parse(data[j + 1][key])) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return data;
    },

    handSus(row) {
      if (this.suspicion.suspicionType == -1) {
        this.$notify({
          type: "warning",
          message: "请选择嫌疑目标",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.suspcitionList.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择嫌疑目标",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.setshowInfo(false);
      let data = {
        suspicionType: this.susObjeck.suspicionType,
        suspicionUuid: this.susObjeck.suspicionUuid,
        operateionType: 1,
        targetUuid: row.markId
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/casemng/suspicion/update/relevance/mark", data)
        .then(res => {
          if (res.data.code == 200) {
            this.getAlllMarker(this.susObjeck.suspicionType, null);
            this.getlableMarker(
              this.susObjeck.suspicionType,
              this.susObjeck.suspicionUuid
            );
          } else {
            this.$notify({
              type: "warning",
              message: "关联失败",
              position: "bottom-right",
              duration: 3000
            });
            this.getAlllMarker(this.susObjeck.suspicionType, null);
            this.getlableMarker(
              this.susObjeck.suspicionType,
              this.susObjeck.suspicionUuid
            );
          }
        });
    },
    // 打开修改页面
    openUpdte() {
      if (this.suspicion.suspicionType == -1) {
        return;
      }
      if (JSON.stringify(this.suspicion) == "{}") {
        return;
      }
      this.updateType = "修改";
      this.addsusTarget = true;
      this.getSuspcDetail();
      this.getSuspcition(this.isFirst);
      this.personDisabled = true;
      this.susName = this.susObjeck.suspicionName;
      this.person = this.susObjeck.suspicionType.toString();
      if (this.person) {
        this.isSpeed = this.person;
        this.speed = this.susObjeck.speed;
      }
      // this.speed = this.susObjeck.speed
      this.susNumber = this.susObjeck.suspicionPhone;
      this.susStatus = this.susObjeck.suspicionCard;
      this.susAddress = this.susObjeck.suspicionAddress;
      this.susDescribe = this.susObjeck.description;
      this.susSex = this.susObjeck.suspicionSex;
      if (this.person == 2) {
        this.is3Ddisabled = true;
        this.susSex =
          this.susObjeck.suspicionSex == null
            ? "0"
            : this.susObjeck.suspicionSex.toString();
      } else {
        this.is3Ddisabled = false;
      }
      if (this.person == 3) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    //添加修改
    addUpdate() {
      // let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]*$/
      // let reg = /^[<>&&./]/
      if (this.$commons.regtest(this.susName)) {
        this.$notify({
          type: "warning",
          message: "禁止输入特殊字符(<,&,&)",
          position: "bottom-right",
          duration: 2000
        });
        return;
      }

      let phone = /^$|^1(3|4|5|6|7|8)\d{9}$/;
      let card = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (!this.isShow) {
        if (this.susName == "") {
          this.emptyMust = true;
          setTimeout(() => {
            this.emptyMust = false;
          }, 1000);
          return;
        }
      } else {
        if (this.susStatus != "" && this.susStatus != null) {
          if (!card.test(this.susStatus)) {
            this.idCard = true;
            setTimeout(() => {
              this.idCard = false;
            }, 1000);
            return;
          }
        }
        if (this.susName.trim() == "") {
          this.emptyMust = true;
          setTimeout(() => {
            this.emptyMust = false;
          }, 1000);
          return;
        } else if (this.susName.length > 10) {
          this.tenLength = true;
          setTimeout(() => {
            this.tenLength = false;
          }, 1000);
          return;
        } else if (this.susNumber != null) {
          if (!phone.test(this.susNumber)) {
            this.phoneNum = true;
            setTimeout(() => {
              this.phoneNum = false;
            }, 1000);
            return;
          }
        } else if (this.susAddress != null) {
          if (this.susAddress.length > 50) {
            this.textLength = true;
            setTimeout(() => {
              this.textLength = false;
            }, 1000);
            return;
          }
        } else if (this.susDescribe != null) {
          if (this.susDescribe.length > 100) {
            this.oneHundlength = true;
            setTimeout(() => {
              this.oneHundlength = false;
            }, 1000);
            return;
          }
        }
      }

      let data = {};
      if (this.updateType == "新增") {
        if (this.isShow) {
          data = {
            caseUuid: this.$route.query.caseUuid,
            suspicionName: this.susName,
            suspicionType: this.person,
            speed: this.speed,
            suspicionSex: this.susSex,
            suspicionPhone: this.susNumber,
            suspicionCard: this.susStatus,
            suspicionAddress: this.susAddress,
            description: this.susDescribe,
            targetUuid: ""
          };
        } else {
          data = {
            caseUuid: this.$route.query.caseUuid,
            suspicionName: this.susName,
            suspicionType: 3,
            speed: this.speed,
            targetUuid: ""
            // speed: this.speed,
          };
        }
      } else {
        if (this.isShow) {
          data = {
            caseUuid: this.$route.query.caseUuid,
            suspicionName: this.susName,
            suspicionType: this.person,
            speed: this.speed,
            suspicionSex: this.susSex,
            suspicionPhone: this.susNumber,
            suspicionCard: this.susStatus,
            suspicionAddress: this.susAddress,
            description: this.susDescribe,
            targetUuid: "",
            suspicionUuid: this.suspicionUuid
          };
        } else {
          data = {
            caseUuid: this.$route.query.caseUuid,
            suspicionName: this.susName,
            suspicionType: 3,
            speed: this.speed,
            targetUuid: "",
            suspicionUuid: this.suspicionUuid
          };
        }
      }
      this.isclick = true;
      data = this.$qs.stringify(data);
      this.$http.post("pca/casemng/suspicion/save", data).then(res => {
        if (res.data.code == 200) {
          this.getSuspcDetail();
          if (this.updateType == "新增") {
            this.isFirst++;
            this.getSuspcition(this.isFirst);
            this.reset();
            this.$notify({
              type: "success",
              message: "新增嫌疑目标成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.isclick = false;
          }
          this.speed = res.data.data.speed;
          if (this.updateType == "修改") {
            this.isFirst++;
            this.getSuspcition(this.isFirst);
            this.reset();
            this.$notify({
              type: "success",
              message: "修改嫌疑目标成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.isclick = false;
          }
          this.getSuspcition(this.isFirst);
          this.addsusTarget = false;
        } else {
          this.addsusTarget = false;
          this.reset();
          if (this.updateType == "新增") {
            this.$notify({
              type: "warning",
              message: "新增嫌疑目标失败！",
              position: "bottom-right",
              duration: 3000
            });
            this.isclick = false;
          }
          if (this.updateType == "修改") {
            this.$notify({
              type: "warning",
              message: "修改嫌疑目标失败！",
              position: "bottom-right",
              duration: 3000
            });
            this.isclick = false;
          }
        }
      });
    },
    //删除嫌疑目标
    ajaxDel() {
      if (this.suspicion.suspicionType == -1) {
        return;
      }
      if (JSON.stringify(this.suspicion) == "{}") {
        return;
      }
      this.$myconfirm({
        type: "提示",
        msg: "是否删除该嫌疑目标",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          suspicionUuid: this.suspicion.suspicionUuid
        };
        data = this.$qs.stringify(data);
        this.$http.post("/pca/casemng/suspicion/del", data).then(response => {
          this.getSuspcition();
          this.nowSuslist = [];

          // setTimeout(()=>{
          //   if(this.suspcitionList.length){
          //     this.suspicionType = this.suspcitionList[1].suspicionType
          //     this.suspicionUuid = this.suspcitionList[1].suspicionUuid
          //   }else{
          //     this.suspicionType = ''
          //     this.suspicionUuid = ''
          //   }
          //   // this.getAlllMarker(this.suspicionType,null);
          //   // this.getlableMarker(this.suspicionType,this.suspicionUuid);
          //   this.susObjeck.suspicionName = ''
          //   this.susObjeck.suspicionType = ''
          //   this.susObjeck.suspicionSex = undefined
          //   this.susObjeck.suspicionPhone = ''
          //   this.susObjeck.suspicionCard = ''
          //   this.susObjeck.suspicionAddress = ''
          //   this.susObjeck.description = ''
          //   this.isall = true
          // },500)
          this.$notify({
            type: "success",
            message: "删除成功",
            position: "bottom-right",
            duration: 3000
          });
        });
      });
    },
    // 删除标注
    dellable(row, index) {
      this.$myconfirm({
        type: "提示",
        msg: "是否删除该标注！",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          markId: row.markId
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/video/mark/delete", data).then(res => {
          if (res.data.code == 200) {
            this.setshowInfo(false);
            if (this.susObjeck.suspicionType == undefined) {
              this.getAlllMarker("-1", null);
            } else {
              this.getAlllMarker(this.susObjeck.suspicionType, null);
              this.getlableMarker(
                this.susObjeck.suspicionType,
                this.susObjeck.suspicionUuid
              );
            }
            this.$notify({
              type: "success",
              message: "标注删除成功！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "error",
              message: "标注删除失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      });
    },
    //关闭模态框
    closesus() {
      this.susName = "";
      this.person = "1";
      this.speed = "1.39";
      this.isSpeed = "1";
      this.susSex = "0";
      this.susNumber = "";
      this.susStatus = "";
      this.susAddress = "";
      this.susDescribe = "";
      this.setshowInfo(false);
      this.isFirst = 0;
      this.isclick = false;
    },
    // 打开新增嫌疑目标
    addsus() {
      this.isShow = true;
      this.personDisabled = false;
      this.addsusTarget = true;
      this.updateType = "新增";
    },
    //清空数据
    reset() {
      this.susName = "";
      this.person = "1";
      this.susSex = "0";
      this.speed = "1.39";
      this.isSpeed = "1";
      this.susNumber = "";
      this.susStatus = "";
      this.susAddress = "";
      this.susDescribe = "";
    },
    //切换类型
    changeRadio(row) {
      if (row == 1) {
        this.isShow = true;
        this.isSpeed = row;
        this.speed = "1.39";
      } else if (row == 2) {
        this.isShow = true;
        this.isSpeed = row;
        this.speed = "4.16";
      } else {
        this.isShow = false;
        this.isSpeed = row;
        this.speed = "8.33";
      }
    },
    // 切换速度
    changeSpeed(row) {
      this.speed = row;
      //  if(row == 1 || row == 2){
      //   this.isShow = true;
      // }else {
      //   this.isShow = false
      // }
    },

    // 显示属性
    getInfo(row, e) {
      this.setshowInfo(true);
      this.setlableInfo(row);
      this.setlableInfoMan(row.markTarget);
      if (row.typeId == 1) {
        document.getElementById("showInfo").style.left = e.clientX + 50 + "px";
        document.getElementById("showInfo").style.top = e.clientY - 200 + "px";
        this.setshowInfoMan(1);
      } else if (row.typeId == 2) {
        document.getElementById("showInfo").style.left = e.clientX + 50 + "px";
        document.getElementById("showInfo").style.top = e.clientY - 100 + "px";
        this.setshowInfoMan(3);
        // this.$store.state.showInfoMan = 3 //车
        // }
      } else if (row.typeId == 4) {
        this.setshowInfoMan(2);
        document.getElementById("showInfo").style.left = e.clientX + 50 + "px";
        document.getElementById("showInfo").style.top = e.clientY - 200 + "px";
      }
    },
    //隐藏标注的详细信息
    goout() {
      this.setlableInfo({});
      this.setlableInfoMan({});
      this.setshowInfo(false);
    },

    // 播放视频
    playsFlvVideo(item, index) {
        if (item.suspicionUuid == "") {
            this.nextNowIndex = null;
            this.nowIndex = index;
        } else {
            this.nowIndex = null;
            this.nextNowIndex = index;
        }

        if (this.$commons.isEmpty(item.videoUrl)) {
            this.$notify({
                type: "warning",
                message: "视频正在下载！",
                position: "bottom-right",
                duration: 3000
            });
            return;
        }
        this.$store.state.showvideoflv = true;
        this.$store.state.showohter = false;
        let url = this.getUrl(item.videoUrl);
        this.flv_load_mds("Video_flv", url);
    },

    //监听新增或修改嫌疑目标弹框
    open1() {
      this.isclick = false;
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
@import "../../../assets/css/verify.css";
.taskrelation {
  width: 100%;
  display: inline-block;
  height: 6.5rem;
}
.sus_left {
  width: 70%;
  float: left;
  height: 100%;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.sus_right {
  width: 29%;
  height: 100%;
  margin-left: 71%;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0 0.1rem;
}
.title {
  line-height: 0.4rem;
  color: #99c9fa;
  font-weight: 700;
  padding-left: 0.1rem;
}
.sus_l_main {
  width: 100%;
  height: calc(100% - 0.4rem);
}

.mainul {
  overflow-y: auto;
  padding: 0 0.1rem;
  height: calc(100% - 0.5rem);
  position: relative;
}
.mainul li {
  position: relative;
  margin-top: 0.13rem;
  float: left;
  width: 23.5%;
  height: 1.7rem;
  margin-right: 2%;
  border: 2px solid #102d50;
}
.mainul li .el-icon-edit {
  position: absolute;
  cursor: pointer;
  color: #409eff;
  bottom: 0.05rem;
  width: 0.15rem;
  height: 0.15rem;
  text-align: center;
  line-height: 0.15rem;
  right: 0.5rem;
}
.mainul li .play {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  display: none;
  transform: translate(-50%, -50%);
  background: url("../../../assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}
.mainul li:hover .none {
  display: block;
}
.el-button--primary:active {
  background: #144578;
  border-color: #144578;
  color: #fff;
}
.el-button:active {
  background: #144578;
  border-color: #144578;
  color: #fff;
}
.el-button:focus {
  background: #144578;
  border-color: #144578;
  color: #fff;
}
.mainSmallul li {
  width: 49%;
  height: 1.3rem;
  margin-right: 2%;
}
.mainSmallul li:nth-child(2n) {
  margin-right: 0;
}
.mainul li:nth-child(4n) {
  margin-right: 0;
}
.mainul li div {
  width: 100%;
  height: calc(100% - 0.6rem);
  position: relative;
  z-index: 999;
}

.mainul li div > img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.deleteLable {
  display: none;
}
.mainul li:hover div .deleteLable {
  display: block;
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  top: 0;
  right: -0.1rem;
  z-index: 3;
}

.imgwidth {
  width: 100%;
  height: 95%;
}
/* .comm_top .height{
  height: 100%;
} */

.mainul li p {
  width: 1.5rem;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  left: 0;
  bottom: 0px;
  /* background-color: rgba(0, 0, 0, 0.6); */
  font-size: 0.12rem;
}
.mainul li p span {
  width: 1.45rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  line-height: 0.2rem;
  color: #99c9fa;
  margin-left: 0.1rem;
}
.mainul li p span:nth-child(3) {
  width: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  line-height: 0.2rem;
  color: #99c9fa;
  margin-left: 0.1rem;
}
.mainSmallul li p span {
  width: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  line-height: 0.2rem;
  color: #99c9fa;
  margin-left: 0.1rem;
}
.mainSmallul li p span:nth-child(3) {
  width: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  line-height: 0.2rem;
  color: #99c9fa;
  margin-left: 0.1rem;
}
.mainul li p a {
  width: 0.5rem;
  line-height: 0.2rem;
  background-color: #e6a23c;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  position: absolute;
  right: 0.1rem;
  top: 0.15rem;
}
.mainul li > .el-button {
  position: absolute;
  bottom: 0.02rem;
  right: 0.05rem;
  font-size: 0.12rem;
  padding: 0.02rem 0.05rem;
}
.property {
  color: #99c9fa;
  font-size: 0.14rem;
  height: 1.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* border: 1px solid red; */
}
.property li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.checkSus {
  margin-top: 0.1rem;
  height: 0.4rem;
}
.checkSus >>> .el-select {
  width: 50%;
}
.checkSus >>> .el-input__inner,
.susex >>> .el-input__inner {
  height: 0.3rem;
  font-size: 0.12rem;
  padding: 0 0.1rem;
  line-height: 0.3rem;
}
.checkSus .el-button {
  padding: 0 0.15rem;
  height: 0.3rem;
  font-size: 0.12rem !important;
  margin-left: 0.1rem;
  /* float: right; */
}
.yetSus {
  width: 100%;
  height: calc(100% - 3rem);
  /* border: 1px solid yellow; */
  margin-top: 0.1rem;
}
.yetSus .vmark {
  width: 100%;
  height: calc(100% - 0.4rem);
  border: 1px solid rgba(15, 44, 79, 0.9);
}
.tilte_top {
  padding: 0.1rem 0;
  color: #fff;
}
.addleft p {
  padding: 0.1rem 0;
  position: relative;
}
.addleft p span {
  width: 1.06rem;
  font-size: 0.14rem;
  display: inline-block;
  color: #99c9fa;
}
.addleft p b {
  font-weight: 400;
}
.addleft p input,
textarea {
  width: calc(100% - 1.3rem);
  height: 0.3rem;
  border-radius: 1px;
  padding-left: 0.1rem;
  border: 1px solid #31353b;
  background-color: rgba(16, 35, 56, 0.5);
  color: #99c9fa;
}
textarea {
  height: 0.5rem;
}
.titleTxt {
  color: #fff;
  font-size: 0.14rem;
}
.modelPartTitle {
  width: 100%;
  height: 0.2rem;
  display: flex;
}
.modelPart {
  width: 100%;
  height: 0.3rem;
  display: flex;
}
.titleLine {
  width: 2px;
  height: 0.12rem;
  background-color: #fff;
  margin-right: 0.05rem;
  margin-top: 6px;
}
.mustText0 {
  right: -1.3rem;
}
.boderShow {
  position: absolute;
  z-index: 2;
}
.deleteLable {
  z-index: 999;
}
.mainul li .searchBottom {
  position: absolute;
  top: 0.02rem;
  left: 0.05rem;
  z-index: 999;
  font-size: 0.12rem;
  padding: 0.02rem 0.05rem;
  display: none;
}
.mainul li .search {
  width: 0.3rem;
  height: 0.2rem;
  position: absolute;
  left: calc(100% - 0.32rem);
  bottom: 0.04rem;
  z-index: 2;
  color: #fff;
  cursor: pointer;
  display: none;
  line-height: 0.2rem;
  text-align: center;
  font-size: 0.12rem;
  border: 1px solid rgb(64, 158, 255);
  background-color: rgb(64, 158, 255, 0.8);
}
.mainul li .searchPic {
  width: 0.3rem;
  height: 0.2rem;
  position: absolute;
  left: calc(100% - 0.7rem);
  bottom: 0.04rem;
  z-index: 2;
  color: #fff;
  cursor: pointer;
  display: none;
  line-height: 0.2rem;
  text-align: center;
  font-size: 0.12rem;
  border: 1px solid rgb(64, 158, 255);
  background-color: rgb(64, 158, 255, 0.8);
}
.markNoBorder {
  border: 1px solid #409eff !important;
}
.el-radio-group >>> .el-radio__inner::after {
  background-color: #58a9ff !important;
}

.seachlist {
  line-height: 0.3rem;
  color: #99c9fa;
}
.seachlist .el-button {
  padding: 0.09rem 0.1rem;
}
</style>
