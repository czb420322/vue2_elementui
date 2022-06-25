<template>
    <div class="taskMange">
        <!-- <div class="allpalyr"  v-show="showvideo">
       <div class="playmian"  v-if="dialogVisible">
          <p class="palyTitle">
            <span>视频播放</span>
            <i class="el-icon-close" @click="closeplay"></i>
          </p>
          <div class="palyer" >
            <div id="idPlayer"></div>
          </div>
            <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
            <input id="idUrl" type="hidden" style="width:399px" value>
          <div class="palyImg">
              <p class="btnplayer"><img onclick="OnSetup(-1)"  @click="imgshow = false" src="../../../assets/images/videoCombat/videoplay/play4.png" title="快退一帧"></p>
              <p class="btnplayer">
                <img @click="pausefalse" v-show="imgshow" src="../../../assets/images/videoCombat/videoplay/pause.png" title="暂停">
                <img @click="pausetrue" v-show="!imgshow" src="../../../assets/images/videoCombat/videoplay/play3.png" title="播放">
              </p>
              <p class="btnplayer"><img onclick="OnSetup(1)" @click="imgshow = false" src="../../../assets/images/videoCombat/videoplay/play3.png" title="快进一帧"></p>
              <p @click="openhandwork"><img style="width:80%" src="../../../assets/images/videoCombat/history/handable.png" title="手工标注"></p>
            </div>

        </div>
        </div>-->
        <el-dialog
            title="视频结构化列表"
            :visible.sync="dialogVisible"
            @close="closeDia"
            v-loading="true"
            v-dialogFull
            top="8vh"
            ref="dialogStrus"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            class="bodyvideoStrus"
            @open="opendia"
            width="65%"
        >
            <div class="videostrus" v-if="dialogVisible">
                <div class="searchkNav">
                    <el-button
                        v-if="isperson"
                        :disabled="isperDed"
                        :class="{avtive: isoptfor == 1}"
                        @click="changelist(proptaskUuid,1);isoptfor = 1"
                        class="commBtn addBtn"
                    >
                        行人
                        <b>（{{personNum}}）</b>
                    </el-button>
                    <el-button
                        v-if="iscar"
                        :disabled="iscarDed"
                        :class="{avtive: isoptfor == 2}"
                        @click="changelist(proptaskUuid,2);isoptfor =2"
                        class="commBtn addBtn"
                    >
                        车辆
                        <b>（{{vehicleNum}}）</b>
                    </el-button>
                    <el-button
                        v-if="isbic"
                        :disabled="isbicDed"
                        :class="{avtive: isoptfor == 3}"
                        @click="changelist(proptaskUuid,3);isoptfor =3"
                        class="commBtn addBtn"
                    >
                        骑车人
                        <b>（{{bicycleNum}}）</b>
                    </el-button>
                </div>
                <div class="strusbox" v-show="restltTotal > 0">
                    <ul>
                        <li
                            v-for="(item,index) in strusList"
                            :key="index"
                            @mouseover="isVideoTab(item,$event)"
                            @click.stop="ClickCheckd(item,index)"
                            @mouseout="leaveProperty"
                            :id="'parent' + index"
                            :class="isactive == index ? 'markNone' : '' "
                        >
                            <p
                                class="tagconvert bigimg"
                                title="查看大图"
                                @click.stop="lookBigImg(item, isoptfor)"
                            ></p>

                            <p
                                class="search searchPic"
                                title="快捷以图搜图"
                                @click.stop="searchimg(item,2)"
                            ></p>
                            <p class="play" title="播放" @click="playvideo(item, index)"></p>
                            <img
                                :id="'sunimg'+index"
                                class="imgbox"
                                @load="imgscale('.imgbox')"
                                :src="item.traceImgUrl"
                                :onerror="$store.state.defaultImg"
                                alt
                            >
                            <i
                                v-if="searchDownImg == 2"
                                :class="strusList[index].state ? 'ONimg' : 'OFFimg'"
                            ></i>
                        </li>
                    </ul>
                </div>
                <div class="information" v-show="restltTotal == 0">
                    <img src="../../../assets/updataImg/NoData.png">
                </div>
                <el-pagination
                    v-if="totalCount != 0"
                    ref="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[21, 42]"
                    :page-size.sync="pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount"
                ></el-pagination>
                <el-pagination
                    v-if="totalCount == 0"
                    ref="pagination"
                    :current-page.sync="currentPage"
                    :page-sizes="[21, 42]"
                    :page-size.sync="pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount"
                ></el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <i
                    :title="bigfullScreen ? '还原' : '最大化' "
                    class="iconfont fullScreen"
                    :class="bigfullScreen ? 'icon-zuidahua' : 'icon-huanyuan'"
                ></i>
                <!-- <el-button
                    v-show="searchDownImg == 2"
                    type="primary"
                    class="cancleBtn"
                    @click="cancleSearch"
                >取消选择</el-button>
                <el-button
                    type="primary"
                    v-show="searchDownImg == 2"
                    class="cancleBtn"
                    @click="confirmDown"
                >确定选择</el-button> -->
                <!-- <el-button
                    type="primary"
                    class="cancleBtn"
                    v-show="searchDownImg == 1"
                    v-no-more-click
                    @click="selectImg"
                >选择下载</el-button>
                <el-button
                    type="primary"
                    class="primary cancleBtn"
                    v-no-more-click
                    @click="batchDownLoad"
                >批量下载</el-button> -->
                <el-button
                    type="primary"
                    class="cancleBtn"
                    @click="dialogVisible = false;clearAllinfo()"
                >取 消</el-button>
                <el-button
                    v-no-more-click
                    :disabled="filestatus != 0"
                    v-show="istwoinves == 1"
                    type="primary"
                    class="passBtn"
                    @click="investigate(1);clearAllinfo()"
                    :title="filestatus != 0 ? '执行中的任务,排查功能禁用' : ''"
                >排 查</el-button>
                <el-button
                    v-no-more-click
                    v-show="istwoinves == 2 || istwoinves == 3"
                    type="primary"
                    class="passBtn"
                    @click="investigate(2);clearAllinfo()"
                >重 新 排 查</el-button>
                <el-button
                    v-no-more-click
                    v-show="istwoinves == 2"
                    type="primary"
                    class="passBtn"
                    @click="twoinvestigate"
                >二 次 排 查</el-button>
            </span>
        </el-dialog>

        <!-- <handword :showhandword="showhandword"  :isonline="false"  @childbyHandwork="childbyHandwork"></handword> -->
        <el-dialog
            title="排查条件设置"
            :visible.sync="invesdialogVisible"
            @close="closeinDia"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @open="openindia"
            top="8vh"
            width="60%"
        >
            <div class="taskrelation" v-if="invesdialogVisible">
                <!-- 坐标排查区域 -->
                <div class="lookleft">
                    <p class="toptitle">
                        <span>|</span>&nbsp;排查点位
                    </p>
                    <div class="loollcenter">
                        <div class="treecenter">
                            <el-checkbox
                                :indeterminate="isIndeterminate"
                                :disabled="ischeckAll"
                                v-model="checkAll"
                                @change="handleCheckAll"
                            >全选</el-checkbox>
                            <el-checkbox-group
                                v-for="(item,indexs) in ptlist"
                                :key="indexs"
                                v-if="checkpt == indexs"
                                :disabled="istwoinves == 2"
                                @change="getallVideo"
                                v-model="checkvideo"
                            >
                                <el-checkbox
                                    v-for="(video,keyindex) in videolist"
                                    :label="video"
                                    :key="keyindex"
                                >{{video.fileName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="timecenter">
                            <p class="toptitle">
                                <span>|</span>&nbsp;时间过滤
                            </p>
                            <p class="timeclass">
                                <el-checkbox
                                    v-model="checkbegintime"
                                    @change="changebegintime"
                                    :disable="forbidtime"
                                ></el-checkbox>
                                <span>开始时间：</span>
                                <input
                                    type="text"
                                    v-show="timeone == 1"
                                    v-model="beginData"
                                    id="checkbegin"
                                    readonly
                                    placeholder="请输入开始时间"
                                >
                                <input
                                    type="text"
                                    v-show="timeone == 2"
                                    v-model="beginData"
                                    id="checkone"
                                    readonly
                                    placeholder="请输入开始时间"
                                >
                                <input
                                    type="text"
                                    v-show="timeone == 3"
                                    v-model="beginData"
                                    id="noneone"
                                    readonly
                                    placeholder="请输入开始时间"
                                >
                            </p>
                            <p class="timeclass">
                                <el-checkbox
                                    v-model="checkendtime"
                                    @change="changeendtime"
                                    :disable="forbidtime"
                                ></el-checkbox>
                                <span>结束时间：</span>
                                <input
                                    type="text"
                                    v-show="timetwo == 1"
                                    v-model="endData"
                                    id="checkend"
                                    readonly
                                    placeholder="请输入结束时间"
                                >
                                <input
                                    type="text"
                                    v-show="timetwo == 2"
                                    v-model="endData"
                                    id="checktwo"
                                    readonly
                                    placeholder="请输入结束时间"
                                >
                                <input
                                    type="text"
                                    v-show="timetwo == 3"
                                    v-model="endData"
                                    id="nonetwo"
                                    readonly
                                    placeholder="请输入结束时间"
                                >
                            </p>
                        </div>
                        <div class="controlcenter">
                            <p class="toptitle">
                                <span>|</span>&nbsp;空间过滤
                            </p>
                            <p class="controlclass">
                                <span class="controlone">区域过滤：</span>
                                <span class="controltwo">
                                    <el-radio
                                        v-model="arearule"
                                        :disabled="istwoinves == 2"
                                        @change="clearCanvas"
                                        label="1"
                                    >感兴趣区域</el-radio>
                                    <el-radio
                                        v-model="arearule"
                                        :disabled="istwoinves == 2"
                                        @change="clearCanvas"
                                        label="2"
                                    >排除区域</el-radio>
                                </span>
                            </p>
                            <p class="controlclass">
                                <span class="controlone">跨线/方向过滤：</span>
                                <span class="controltwo">
                                    <el-radio
                                        v-model="arearule"
                                        :disabled="istwoinves == 2"
                                        @change="clearCanvas"
                                        label="3"
                                    >跨线排查</el-radio>
                                    <el-radio
                                        v-model="arearule"
                                        :disabled="istwoinves == 2"
                                        @change="clearCanvas"
                                        label="4"
                                    >方向排查</el-radio>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 右边排查区域 -->
                <div class="lookright">
                    <p class="toptitle">
                        <span>|</span>&nbsp;场景快照
                    </p>
                    <div class="imgcanvas" id="imgcanvas">
                        <el-button
                            class="searchBtn"
                            :disabled="istwoinves == 2"
                            @click.stop="clearCanvas"
                        >清除绘制</el-button>
                        <img id="lookimg" :src="lableimg" alt>
                        <canvas id="onecanvas" @click="getcoordnate" @dblclick="dbgetcoor"></canvas>
                        <canvas
                            id="twocanvas"
                            v-show="showCanvas"
                            @click="getcoordnate"
                            style="z-index:1"
                        ></canvas>
                        <!--  画箭头的canvas -->
                    </div>
                    <zkyStructure @zkytab="zkytab" ref="zkyStruc"></zkyStructure>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    class="cancleBtn"
                    @click="invesdialogVisible = false;clearAllinfo()"
                >取 消</el-button>
                <el-button
                    v-no-more-click
                    v-show="istwoinves == 1"
                    type="primary"
                    class="passBtn"
                    @click="bengininves"
                >开 始 排 查</el-button>
                <el-button
                    v-no-more-click
                    v-show="istwoinves == 2"
                    type="primary"
                    class="passBtn"
                    @click="bengininves"
                >二 次 排 查</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="下载"
            :visible.sync="dialogDownLoad"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @open="openDownData"
            width="42%"
        >
            <div class="multipleChoice">
                <el-radio-group v-model="radio1" @change="switchDown">
                    <el-radio :label="1">序号</el-radio>
                    <el-radio :label="2">时间段</el-radio>
                    <el-radio :label="3">全部</el-radio>
                </el-radio-group>
            </div>
            <div class="downImg" v-if="radio1 == '1'">
                <span>序号 :&nbsp;</span>
                <input
                    class="placeDown"
                    type="number"
                    :min="1"
                    :max="this.totalCount"
                    v-model="minDownImg"
                    @blur="verifymin"
                >
                ------
                <input
                    class="placeDown"
                    type="number"
                    :min="1"
                    :max="this.totalCount"
                    v-model="maxDownImg"
                    @blur="verifymax"
                >
            </div>
            <div class="downImg" v-if="radio1 == '2'">
                <span>时间 :&nbsp;</span>
                <el-input
                    type="text"
                    class="caseNameSelect caseNameSelectDate"
                    id="beginDelTime"
                    readonly
                    v-model="beginData"
                    placeholder="请选择开始时间"
                >
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>-
                <el-input
                    type="text"
                    class="caseNameSelect caseNameSelectDate"
                    id="endDelTime"
                    readonly
                    v-model="endData"
                    placeholder="请选择结束时间"
                >
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>
            </div>
            <div class="downImg">
                <el-checkbox v-model="thumbnail">缩略图</el-checkbox>
                <el-checkbox v-model="HD">高清</el-checkbox>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="cancleBtn" @click="dialogDownLoad = false">取 消</el-button>
                <el-button type="primary" class="passBtn" @click="getProress" v-no-more-click>确 定</el-button>
                <!-- <el-button type="primary" v-show="istwoinves == 1"  class="passBtn" @click="settleDown(2)" v-no-more-click>确 定</el-button> -->
            </span>
        </el-dialog>
        <el-dialog
            title="导出"
            :visible.sync="exportDialog"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="25%"
        >
            <div class="downImg">
                <p>操作提示：（略缩图或高清，至少选择一种导出）</p>
                <el-checkbox v-model="thumbnail">缩略图</el-checkbox>
                <el-checkbox v-model="HD">高清</el-checkbox>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="cancleBtn" @click="exportDialog = false">取 消</el-button>
                <el-button type="primary" class="passBtn" @click="trueDown" v-no-more-click>确 定</el-button>
                <!-- <el-button type="primary" v-show="istwoinves == 1"  class="passBtn" @click="settleDown(2)" v-no-more-click>确 定</el-button> -->
            </span>
        </el-dialog>

        <!--<v-dialog :tagDialog.sync='tagDialog'></v-dialog>-->
    </div>
</template>

<script>
import {
    windowToCanvas,
    clearRect,
    imgwh,
    coorValue,
    Line,
    draw
} from "../../videoCombat/canvas.js";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import lookinfo from "./lookinfo.js"; //引入js
import getzkyinfo from "./getzkyinfo.js"; //引入zky js
import videoDown from "../../../api/casestudy/videoDown.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import glstlist from "../../../api/realvideo/glstproperty.js"; //glst 结构化信息的js
// import handword from "../fastFight/handworkLable";
import scale from "../../../api/common/scale.js"; //图片自适应
import zkyStructure from "./zkystructure"; // 中科院属性过滤字段
import glstinfo from "../../../components/glstinfo";

export default {
    data() {
        return {
            // dialogVisible:false,//控制页面的开关
            strusList: [], //存放结构化数据的数组
            currentPage: 1, //当前页码
            pageSize: 21, //当前一页个数
            totalCount: 0, //总个数
            isperson: true, //是否打开行人数据
            iscar: true, //是否打开车辆数据
            isbic: true, //是否打开骑车人数据
            isoptfor: 1, //默认当前选中的是1表示的是行人 2表示的是车  3表示骑车人
            openinves: false, //打开排查页面
            istwoinves: 1,
            invesdialogVisible: false,
            showvideo: false,
            showStrusList: false,
            isactive: null,
            showVideoStruct: "", // 格林森瞳结构化
            zkyStructureSwitch: "", // 中科院结构化
            dialogDownLoad: false, // 下载框默认关闭
            radio1: 1, // 默认序号
            HD: true, // 高清
            thumbnail: true, // 缩略图
            userId: "", // 用户id
            onefileUuids: [], // glst一次排查id
            twofileUuids: [], //glst二次排查id
            zkytwoUuids: [], //zky二次排查id
            deriveDownLoad: false,
            approveProportion: 0,
            zipProportion: 0,
            timeId: null, // 定时器
            Checkd: [], //勾选
            beginTime: "", //开始时间
            endTime: "", //结束时间
            bigfullScreen: false,
            tagDialog: true,
            issetinves: 0,
            isperDed: false,
            iscarDed: false,
            isbicDed: false,
            changeFlag: 0 // 是否变更了条件，0：是，1：否
        };
    },
    components: {
        // handword,
        zkyStructure,
        glstinfo
    },
    mixins: [lookinfo, getzkyinfo, videoDown, beginEnd, glstlist, scale],
    created() {},
    computed: {
        ...mapGetters([
            "glststrusInfo", //结构化一次排查返回的筛选条件信息
            "deviceInfo", //当前的点位信息
            "iszkyStrucTable", //中科院tab
            "targetToOenStrus", //当前打开结构化窗口的表示
            // 'zkystrusInfo', // 中科院一次排查返回的筛选条件信息
            "strusResult", //查看结构化所有的结果以及排查条件
            "targetToSearchImg", // 传过来的以图搜图的对象
            "zkyStusinfo"
        ])
    },
    watch: {
        isopenStrus(val) {
            if (val) {
                this.dialogVisible = val;
                console.log(this.structType, 99965655);
                this.isoptfor = this.structType;
                this.investigate(this.structType);
                this.clearAllinfo();
            }
        }
    },
    props: {
        isopenStrus: Boolean,
        proptaskUuid: String,
        caseUuid: String,
        deviceId: String,
        structType: Number
    },
    mounted() {
        this.userId = this.$storage.getSession("userInfo").userId; // 获取用户id
        this.$nextTick(() => {
            let _this = this;
            document.onkeydown = function(e) {
                var key = window.event.keyCode;
                if (key == "13") {
                    let value = parseInt(
                        $(".is-in-pagination .el-input__inner").val()
                    );
                    _this.handleCurrentChange(value);
                }
            };
        });
    },
    methods: {
        ...mapMutations([
            "setglststrusInfo", //通过glst一次排查的返回来更改返回值
            // 'setzkystrusInfo',  //通过zky一次排查的返回来更改返回值
            "setglstfeature", //获取单个的结构化信息，然后添加特征值
            "setshowglstinfo", //是否显示glst信息
            "setshowzkyinfo", //  //是否显示zky信息
            "setglstargetinfo", //给结构化信息赋值
            "setzkytargetinfo", //给中科院结构化信息赋值
            "setisopenOffVideo", //是否显示在线离线播放器
            "setiszkyStrucTable", // 中科院结构化tab
            "setzkyNum", // 点击中科院结构化,
            "settargetToOenStrus", //当前打开结构化窗口的表示
            "setshowlookImgPic", // 点击查看大图
            "setzkyStusinfo",
            "setstructureFileUuid" // 结构化当前点击播放文件id
        ]),

        //关闭模态框，清除数据
        closeDia() {
            if (this.bigfullScreen) {
                this.$nextTick(() => {
                    this.bigfullScreen = false;
                    window.isFullScreen = false;
                    this.$refs.dialogStrus.$el.querySelector(
                        ".el-dialog"
                    ).style.height = "8.35rem";
                    this.$refs.dialogStrus.$el.querySelector(
                        ".el-dialog"
                    ).style.width = window.nowWidth + "px";
                    this.$refs.dialogStrus.$el.querySelector(
                        ".el-dialog"
                    ).style.marginTop = window.nowMarginTop;
                    this.$refs.dialogStrus.$el.querySelector(
                        ".el-dialog"
                    ).childNodes[1].style.height = "7.5rem";
                });
            }
            this.dialogVisible = false;
            this.searchDownImg = 1;
            this.pageSize = 21;
            this.changeFlag = 0;
            this.setisopenOffVideo(false);
            this.setshowglstinfo(false);
            this.setshowlookImgPic(false);
            this.setshowzkyinfo(false);
            this.settargetToOenStrus(0);
            this.$emit("childByStrus", false);
            this.totalCount = 0;
            this.strusList = [];
            // document.title = document.title.split(".")[0];
            clearInterval(window.g_interval);
            this.showvideo = false;
            clearInterval(this.getVideotime);
            clearInterval(this.timeFrag);
            clearInterval(this.statsuTimes);
            this.filestatus = "";
            this.personNum = 0;
            this.bicycleNum = 0;
            this.vehicleNum = 0;
            this.isperDed = false;
            this.iscarDed = false;
            this.isbicDed = false;
        },
        //打开模态框，获取数据，加载播放器
        opendia() {
            this.showVideoStruct = sessionStorage.getItem(
                "glstStructureSwitch"
            ); // 格林森瞳结构化
            this.zkyStructureSwitch = sessionStorage.getItem(
                "zkyStructureSwitch"
            ); // 中科院结构化
            //如果打开的时候执行结果是undefined表示是从一级页面点进来的，否则就是从一级排查页面或者二级排查页面进来的
            if (this.strusResult.istwoinves == undefined) {
                console.log("fffffff");
                if (this.showVideoStruct == "true") {
                    this.glstmean();
                } else if (this.zkyStructureSwitch == "true") {
                    this.zkymean();
                }
            } else {
                console.log("ddddddddd");
                this.strusList = this.strusResult.list;
                this.totalCount = this.strusResult.totalCount;
                this.istwoinves = this.strusResult.istwoinves;
                this.isoptfor = this.strusResult.isoptfor;
                this.isperson = this.strusResult.isperson;
                this.iscar = this.strusResult.iscar;
                this.isbic = this.strusResult.isbic;
                if (this.isperson && this.iscar && this.isbic) {
                    this.personNum = this.strusResult.personNum;
                    this.vehicleNum = this.strusResult.vehicleNum;
                    this.bicycleNum = this.strusResult.bicycleNum;
                } else {
                    this.personNum = this.strusResult.totalCount;
                    this.vehicleNum = this.strusResult.totalCount;
                    this.bicycleNum = this.strusResult.totalCount;
                    this.totalCount = this.strusResult.totalCount;
                }
                if (this.isperson & !this.iscar && !this.isbic) {
                    this.isperDed = true;
                } else if (!this.isperson & this.iscar && !this.isbic) {
                    this.iscarDed = true;
                } else if (!this.isperson & !this.iscar && this.isbic) {
                    this.isbicDed = true;
                }
                this.strusResult.structuroneList.attrFlag = this.isoptfor;
                this.setglststrusInfo(this.strusResult.structuroneList);
            }
        },
        // glst方法
        glstmean() {
            setTimeout(() => {
                this.showvideoplay = true;
            }, 2000);
            this.currentPage = 1;
            //通过vue值来判断是否传过来值
            //如果等于undefined 表示的是进入第一次
            if (this.glststrusInfo.attrFlag == undefined) {
                //第一次进入结构化结果页面的时候获取当前任务是否已经完成
                //如果已经完成则清除定时器，并且可以排查，否则一直刷新数据，并且不可以排查
                if (
                    this.targetToSearchImg.type == undefined ||
                    this.targetToSearchImg.type == 0
                ) {
                    this.isoptfor = 1; //默认显示行人页面
                } else {
                    this.isoptfor = this.targetToSearchImg.isoptfor;
                }
                this.gettaskStatus(this.proptaskUuid);
                this.getResultCount(this.proptaskUuid);
                this.getList(this.proptaskUuid, this.isoptfor);
                this.istwoinves = 1; //表示一次排查
                this.isperson = true; //显示人  车 骑车人的数据
                this.iscar = true;
                this.isbic = true;
            } else if (this.glststrusInfo.attrFlag == 10) {
                //
            } else {
                //表示二次排查
                this.istwoinves = 2;
                //1：行人，2：机动车，3：非机动车
                if (this.glststrusInfo.attrFlag == 1) {
                    this.isperson = true;
                    this.isperDed = true;
                    this.iscar = false;
                    this.isbic = false;
                } else if (this.glststrusInfo.attrFlag == 2) {
                    this.isperson = false;
                    this.iscar = true;
                    this.iscarDed = true;
                    this.isbic = false;
                } else if (this.glststrusInfo.attrFlag == 3) {
                    this.isperson = false;
                    this.iscar = false;
                    this.isbic = true;
                    this.isbicDed = true;
                }
            }
        },
        // zky方法
        zkymean() {
            setTimeout(() => {
                this.showvideoplay = true;
            }, 2000);
            this.currentPage = 1;
            // document.title = document.title + '.'
            // this.$nextTick(()=>{
            //   setTimeout(()=>{
            //     OnInit();
            //   },1000)
            // })
            //通过vue值来判断是否传过来值
            //如果等于undefined 表示的是进入第一次
            if (this.glststrusInfo.attrFlag == undefined) {
                //第一次进入结构化结果页面的时候获取当前任务是否已经完成
                //如果已经完成则清除定时器，并且可以排查，否则一直刷新数据，并且不可以排查
                this.isoptfor = this.structType; //默认显示行人页面
                this.gettaskStatus(this.proptaskUuid);
                this.getResultCount(this.proptaskUuid);
                this.getList(this.proptaskUuid, this.isoptfor);
                this.istwoinves = 1; //表示一次排查
                this.isperson = true; //显示人  车 骑车人的数据
                this.iscar = true;
                this.isbic = true;
            } else if (this.glststrusInfo.attrFlag == 10) {
                //
            } else {
                //表示二次排查
                this.istwoinves = 2;
                //1：行人，2：机动车，3：非机动车
                if (this.glststrusInfo.attrFlag == 1) {
                    this.isperson = true;
                    this.iscar = false;
                    this.isbic = false;
                } else if (this.glststrusInfo.attrFlag == 2) {
                    this.isperson = false;
                    this.iscar = true;
                    this.isbic = false;
                } else if (this.glststrusInfo.attrFlag == 3) {
                    this.isperson = false;
                    this.iscar = false;
                    this.isbic = true;
                }
            }
        },
        //关闭模态框
        closeinDia() {
            this.setshowglstinfo(false);
            this.setshowlookImgPic(false);
            this.setshowzkyinfo(false);
            this.$emit("childbylook", false);
            this.$emit("childByStrus", false);
            this.showCanvas = false;
            this.lableimg = "";
            this.timeone = 1; //清空时间控件的控制
            this.timetwo = 1; //清空时间控件的控制
            this.checkvideo = []; //清空选中的数组ID
            this.checkpt = 0; //重置当前点位索引
            this.clearporpe(); //清空所有的字段属性
            this.actualcoord = []; // 坐标（实际坐标）
            this.coordinates = [];
            this.originalCoordinate = []; // 清空一次排查结果的原始点坐标
            this.theta = ""; // 划线的角度
            this.isIndeterminate = false; // 全选反选
            this.checkAll = true;
            this.ischeckAll = false; // 是否禁用
        },
        //打开模态框排查条件的模态框
        openindia() {
            this.showVideoStruct = sessionStorage.getItem(
                "glstStructureSwitch"
            ); // 格林森瞳结构化
            this.zkyStructureSwitch = sessionStorage.getItem(
                "zkyStructureSwitch"
            ); // 中科院结构化
            if (this.istwoinves == 1) {
                setTimeout(() => {
                    this.handleCheckAll(true);
                    this.isIndeterminate = false;
                }, 300);
            }
            //   this.opttype = JSON.parse(sessionStorage.getItem("deviceInfo")).type + "";
            //通过点位信息快速定位到当前视频以及点位
            this.lableimg = "";
            console.log(JSON.parse(sessionStorage.getItem("deviceInfo")) ,99999999);
            this.getpointinfo(JSON.parse(sessionStorage.getItem("deviceInfo")).type);
            //   this.getvideo(this.deviceId);
            this.getTimeTobe(this.caseUuid);
            //this.glststrusInfo 通过对象来判断是否是二次排查 有值表示是二次排查
            //this.glststrusInfo.attrFlag == undefined 表示一次排查
            if (this.glststrusInfo.attrFlag == undefined) {
                this.$nextTick(()=>{
                    if(this.isoptfor == 1){
                        this.$refs.zkyStruc.zkyperson = false
                        this.$refs.zkyStruc.zkycar = true
                        this.$refs.zkyStruc.zkybic = true
                    } else if(this.isoptfor == 2){
                        this.$refs.zkyStruc.zkyperson = true
                        this.$refs.zkyStruc.zkycar = false
                        this.$refs.zkyStruc.zkybic = true
                    } else if(this.isoptfor == 3){
                        this.$refs.zkyStruc.zkyperson = true
                        this.$refs.zkyStruc.zkycar = true
                        this.$refs.zkyStruc.zkybic = false
                    }
                })

            } else {
                //1：行人，2：机动车，3：非机动车
                this.$nextTick(() => {
                    this.$refs.zkyStruc.zkyField();
                    //二、 判断属性禁用的问题以及赋值
                });
            }
        },
        //划线的方法
        drawRect(coordinates, context) {
            context.beginPath();
            context.strokeStyle = "red"; //yellow
            context.moveTo(coordinates[0][0], coordinates[0][1]);
            context.lineTo(coordinates[1][0], coordinates[1][1]);
            context.closePath();
            context.stroke();
        },
        //得到行人,车辆，以及骑车人的的结构化数据
        getList(taskUuid, type) {
            // 删除之前所有未完成的进程
            window.axiosProArr.forEach((e, i) => {
                if (sessionStorage.getItem("isUploadTrue") != 1) {
                    e.cancle();
                    delete window.axiosProArr[i];
                }
            });
            if (this.filestatus == 1) {
                this.loading.close();
            } else {
                this.loading = this.$loading({
                    lock: true,
                    background: "rgba(255,255,255,0.4)",
                    text: "加载中"
                });
            }
            // this.loading = this.$loading({
            //   lock: true,
            //   background: "rgba(255,255,255,0.4)",
            //   text: "加载中"
            // });
            let data = {
                taskUuid: taskUuid,
                type: type,
                caseUuid: this.$route.query.caseUuid,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            this.$http
                .get("vsas/structure/getStructureResult", { params: data })
                .then(res => {
                    this.loading.close();
                    if (res.data.code == 200) {
                        if (this.showStrusList.length == 0) {
                            this.showStrusList = true;
                        }
                        if (
                            this.filestatus != 0 &&
                            res.data.data.progress != 100
                        ) {
                            clearTimeout(this.statsuTimes);
                            this.statsuTimes = null;
                            this.statsuTimes = setTimeout(() => {
                                // this.isVideoTab(this.nowInfo, this.nowEvent);
                                this.gettaskStatus(this.proptaskUuid);
                                this.getResultCount(this.proptaskUuid);
                                this.getList(this.proptaskUuid, this.isoptfor);
                            }, 10000);
                        }
                        this.Checkd = [];
                        var obj = {};
                        this.setshowglstinfo(false);
                        this.setshowzkyinfo(false);
                        this.strusList = res.data.data.list;
                        this.totalCount = res.data.data.totalCount;
                        // this.imgscale('.imgbox')
                        if (this.strusList.length) {
                            for (let i = 0; i < this.strusList.length; i++) {
                                this.strusList[i].state = false;
                            }
                            if (this.groundIds.length) {
                                for (
                                    let i = 0;
                                    i < this.strusList.length;
                                    i++
                                ) {
                                    for (
                                        let k = 0;
                                        k < this.groundIds.length;
                                        k++
                                    ) {
                                        if (
                                            this.groundIds[k] ==
                                            this.strusList[i].personUuid
                                        ) {
                                            this.strusList[i].state = true;
                                        } else if (
                                            this.groundIds[k] ==
                                            this.strusList[i].vehicleUuid
                                        ) {
                                            this.strusList[i].state = true;
                                        } else if (
                                            this.groundIds[k] ==
                                            this.strusList[i].bicycleUuid
                                        ) {
                                            this.strusList[i].state = true;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        this.setshowglstinfo(false);
                        this.setshowzkyinfo(false);
                    }
                });
        },
        //切换人车骑车人的结果tab，taskUuid表示当前任务ID type表示 1人 2 车 3 骑车人
        changelist(taskUuid, type) {
            //切换人车骑车人的时候先让图片不显示
            window.axiosProArr.forEach((e, i) => {
                if (sessionStorage.getItem("isUploadTrue") != 1) {
                    e.cancle();
                    delete window.axiosProArr[i];
                }
            });
            //没有排查的时候才可以切换
            this.strusList = [];
            this.searchDownImg = 1;
            setTimeout(() => {
                if (this.isperson && this.iscar && this.isbic) {
                    this.setshowglstinfo(false);
                    this.setshowzkyinfo(false);
                    this.strusList = [];
                    this.totalCount = 0;
                    this.pageSize = 21;
                    this.currentPage = 1;
                    this.getList(taskUuid, type);
                }
            }, 300);
        },

        //切换分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            if (this.changeFlag == 0) {
                this.getList(this.proptaskUuid, this.isoptfor);
            } else if (this.changeFlag == 2) {
                this.getTwozkySize(1);
            } else {
                this.getSearchZkySize(1);
            }
        },
        //切换分页
        handleCurrentChange(val) {
            this.currentPage = val;
            if (this.changeFlag == 0) {
                this.getList(this.proptaskUuid, this.isoptfor);
            } else if (this.changeFlag == 2) {
                this.getTwozkySize(1);
            } else {
                this.getSearchZkySize(1);
            }
        },
        //点击排查打开排查页面，进行帅选
        //type 参数 1表示开始排查 2表示重新排查
        investigate(type) {
            console.log(type, 6633333);
            setTimeout(() => {
                // this.handleCheckAll(true)
                this.settargetToOenStrus(this.targetToOenStrus);
            }, 300);
            this.setiszkyStrucTable(this.isoptfor);
            this.setstrusResult({});
            this.disperson = false;
            this.discar = false;
            this.disbic = false;
            // OnExit();
            // CloseVodPlayer();
            this.dialogVisible = false;
            //打开排查页面
            this.invesdialogVisible = true;
            this.istwoinves = 1; //是否是二次排查  否
            if(type == 2){
                this.searchType = 0
            }
        },

        //二次排查进行筛选
        twoinvestigate() {
            console.log(11111111111111);
            this.setstrusResult({});
            this.ischeckAll = true;
            if (this.strusList.length == 0) {
                this.$notify({
                    type: "warning",
                    message: "当前没有排查结果，请重新排查",
                    position: "bottom-right",
                    duration: 3000
                });
                this.ischeckAll = false;
                return;
            }
            this.issetinves = 3;
            this.dialogVisible = false;
            this.invesdialogVisible = true;
            this.istwoinves = 2; //是否是二次排查  是
            //   if (this.zkyStructureSwitch == "true") {
            //       setTimeout(()=>{
            //           this.twiceCheck(); //执行zky二次排查
            //       },2000)

            //   }
        }
    }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.el-dialog__wrapper .el-dialog,
.el-dialog__wrapper /deep/ .el-dialog {
    min-width: 0rem;
    margin: 0 auto;
}
.videostrus {
    width: 100%;
    height: 100%;
}
.videostrus .searchkline span {
    display: inline-block;
    width: 1.2rem;
    height: 0.3rem;
    line-height: 0.3rem;
    cursor: pointer;
    font-size: 0.12rem;
    margin-right: 0.2rem;
}
.strusbox {
    width: 100%;
    height: calc(100% - 0.5rem);
    position: relative;
}
.information {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.strusbox ul {
    width: 100%;
    height: 100%;
    overflow: auto;
}
.strusbox li {
    width: 12.9%;
    height: 30%;
    margin-right: 1.3%;
    margin-top: 0.2rem;
    border: 1px solid #235588;
    float: left;
    position: relative;
    /* padding: 0.02rem; */
    overflow: hidden;
}
.strusbox .markNone {
    border: 1px solid #409eff;
}
/* .strusbox li img{
  width: 100%;
  height: 100%;
} */

.strusbox li img {
    position: absolute;
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.width {
    width: 100%;
    height: auto;
}
.height {
    width: auto;
    height: 100%;
}
.widthheight {
    width: 100%;
    height: 100%;
}

/* .strusbox li .img{
  width: 100%;
  height: 100%;
} */
.strusbox li p {
    color: #fff;
    cursor: pointer;
    display: none;
    line-height: 0.2rem;
    text-align: center;
    position: absolute;
    padding: 0 0.1rem;
    right: 0.03rem;
    font-size: 0.12rem;
}
.search,
.tagconvert {
    bottom: 0.03rem;
    z-index: 2;
}
.strusbox li .tagconvert {
    right: 0.3rem;
}
.strusbox li .bigimg {
    width: 0.12rem;
    height: 0.15rem;
    background: url("../../../assets/images/videoNewImg/lookPic.png") no-repeat center / 100% 100%;
    right: 0.3rem;
    bottom: 0.03rem;
}
.transmitPic {
    bottom: 0.04rem;
    background: url("../../../assets/images/videoNewImg/transmitPic.png")
        no-repeat center / 100% 100%;
}
.searchPic {
    width: 0.12rem;
    height: 0.15rem;
    background: url("../../../assets/images/videoNewImg/searchPic.png")
        no-repeat center / 100% 100%;
}
/* .play{
  top: 0.25rem;
} */
.strusbox li:hover p {
    display: block;
}
.el-pagination {
    text-align: right;
    position: absolute;
    right: 30px;
}

.taskrelation {
    width: 100%;
    height: 6.5rem;
    background-color: rgba(16, 35, 56, 0.5);
}
.lookleft {
    width: 30%;
    height: 100%;
    float: left;
    /* border: 1px solid red; */
    padding: 0 0.1rem;
}
.lookright {
    width: 68%;
    height: 100%;
    margin-left: 32%;
    /* border: 1px solid blue; */
}
.toptitle {
    line-height: 0.4rem;
    color: #99c9fa;
    color: #fff;
    font-size: 0.16rem;
    padding-left: 0.1rem;
}
.toptitle span {
    font-weight: 700;
}
.loollcenter {
    width: 100%;
    height: calc(100% - 0.4rem);
    border: 1px solid #162e4a;
}
.treecenter {
    width: 100%;
    height: 40%;
    /* border: 1px solid yellow; */
    overflow: auto;
    color: #99c9fa;
    padding: 0 0.1rem;
}
.ptlocl {
    cursor: pointer;
}
.ptlocl > span {
    margin-left: 0.1rem;
}
.ptlocl div {
    margin-left: 0.3rem;
}

.timecenter {
    width: 100%;
    height: 23%;
    /* border: 1px solid tan; */
    margin: 2% 0;
    color: #99c9fa;
}
.timecenter .timeclass {
    padding: 0 0.1rem;
    height: 0.4rem;
}
.timeclass input {
    width: 1.8rem;
    height: 0.3rem;
    padding-left: 0.1rem;
}
.controlcenter {
    width: 100%;
    height: 35%;
    /* border: 1px solid tan; */
}
.controlclass {
    padding-left: 0.3rem;
    color: #99c9fa;
}
.controlclass .controlone {
    float: left;
    height: 0.6rem;
    line-height: 0.5rem;
    width: 1.1rem;
    text-align: right;
    margin-right: 0.1rem;
}
.controlclass .controltwo {
    float: left;
    width: 1rem;
    height: 0.6rem;
}
.el-radio + .el-radio {
    margin: 0;
    margin-top: 0.1rem;
}
.el-checkbox-group {
    margin-left: 0.1rem;
}
.el-checkbox-group .el-checkbox {
    width: 100%;
    display: block;
    margin: 0.05rem 0;
}
.el-checkbox-group .el-checkbox + .el-checkbox {
    margin: 0.05rem 0;
}
.imgcanvas {
    width: 100%;
    height: 3.5rem;
    border: 1px solid #162e4a;
    position: relative;
}
.imgcanvas .el-button {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
}
.imgcanvas img,
.imgcanvas canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.imgcanvas img {
    width: auto;
    height: 100%;
}
.labelinfo {
    width: 100%;
    height: 2.5rem;
    border: 1px solid #162e4a;
    margin-top: 0.1rem;
    /* padding: 0 0.1rem; */
    /* border: 1px solid tan; */
}
.labelinfo .searchkline {
    padding: 0 0.1rem;
}

.avtive {
    border-radius: 5px 0 5px 5px;
    background: #3d82a6 url("../../../assets/images/videoNewImg/btnnormal.png")
        no-repeat center center / 100% 100%;
}

/* .avtives{
  background: url('../../../assets/images/videoNewImg/btnnormal.png') no-repeat center center / 100% 100%;
} */
.commBtn {
    display: inline-block;
    width: 0.6rem;
    height: 0.25rem;
    line-height: 0.25rem;
    cursor: pointer;
    font-size: 0.12rem;
    margin-right: 0.1rem;
}
.searchkline .el-button {
    padding: 0 0.1rem;
    border: 1px solid #133045;
}
.searchkNav .el-button {
    width: 1.2rem;
    height: 0.3rem;
    padding: 0 0.1rem;
    border: 1px solid #133045;
}
.showinfo {
    margin-top: 0.1rem;
    padding: 0 0.1rem;
}
.showinfo p {
    display: inline-block;
    height: 0.35rem;
    width: 32%;
}
.showinfo p > span {
    width: 1rem;
    line-height: 0.25rem;
    height: 0.25rem;
    float: left;
    color: #99c9fa;
    text-align: justify;
}
.showinfo p i {
    width: 100%;
    display: inline-block;
}
.el-select {
    height: 0.25rem;
    width: 1.3rem;
}
.el-select  .el-input,
.el-select /deep/ .el-input {
    font-size: 0.12rem;
}
.el-select  .el-input__inner,
.el-select /deep/ .el-input__inner {
    height: 0.25rem !important;
    line-height: 0.25rem;
}
.el-dialog__wrapper  .el-dialog,
.el-dialog__wrapper /deep/ .el-dialog {
    min-width: 0rem;
}
.el-radio {
    display: block;
}
.multipleChoice  .el-radio,
.multipleChoice /deep/ .el-radio {
    display: inline-block;
    margin-bottom: 0.1rem;
    margin-right: 0.4rem;
}
.strusbox .play {
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
.el-radio-group {
    display: block;
}
.tworadio {
    padding-left: 0.2rem;
    margin-top: 0.1rem;
}
.position-pagination {
    position: absolute;
    bottom: 0.4rem;
    right: 0.4rem;
}
.placeDown {
    width: 1.7rem;
    height: 0.28rem;
    padding-left: 0.1rem;
}
.downImg {
    margin-bottom: 0.1rem;
}
.downImg span {
    color: #99c9fa;
}
.downImg p {
    color: #409eff;
    margin-bottom: 0.05rem;
}
.downImg .el-checkbox__inner,
.downImg /deep/ .el-checkbox__inner {
    border: 1px solid #134276;
}
.downImg .el-checkbox__label,
.downImg /deep/ .el-checkbox__label {
    color: #99c9fa;
    margin-right: 0.1rem;
}
.taskImg {
    color: #99c9fa;
}
.taskImg div {
    margin-bottom: 0.2rem;
}
.strusbox li i {
    position: absolute;
    width: 0.13rem;
    height: 0.13rem;
    top: 0.03rem;
    right: 0.03rem;
    cursor: pointer;
}
.ONimg {
    background: url(../../../assets/ImgCheckdON.png) no-repeat center center;
    background-size: 100% 100%;
}
.OFFimg {
    background: url(../../../assets/ImgCheckdOFF.png) no-repeat center center;
    background-size: 100% 100%;
}
.caseNameSelect {
    width: 1.5rem;
    color: #c5c5c5;
}
.caseNameSelectDate {
    width: 1.8rem;
    font-size: 0.14rem;
}
.fullScreen {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 50px;
    top: 10px;
    cursor: pointer;
    color: #909399;
    font-size: 0.14rem;
}
.fullScreen :hover {
    color: #409eff;
}
.lookmyBigImg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9999;
}
.lookmyleft {
    width: 80%;
    height: 100%;
    float: left;
}
.lookmyleft img {
    width: 100%;
    height: 100%;
    float: left;
    border: 1px solid blue;
    float: left;
}
.lookmyright {
    border: 1px solid red;
    margin-left: 80%;
    width: 20%;
    height: 100%;
}
.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
    cursor: not-allowed;
    background: transparent;
    background: url("../../../assets/images/videoNewImg/bg/stopnormal.png")
        no-repeat center center / 100% 100%;
}
.el-image {
    width: 100%;
    height: 100%;
}
.el-select .el-input .el-select__caret,
.el-select /deep/ .el-input .el-select__caret{
    line-height: 0.25rem !important;
}

</style>

<style>
.bodyvideoStrus .el-dialog__body,
.bodyvideoStrus /deep/ .el-dialog__body {
    height: 7.5rem;
    z-index: 888;
}
</style>
