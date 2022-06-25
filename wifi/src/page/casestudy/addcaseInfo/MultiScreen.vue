<!--
 * @Author: your name
 * @Date: 2020-05-19 18:50:12
 * @LastEditTime : 2021-01-15 15:56:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \v1.7\vacp-wfes\src\page\casestudy\addcaseInfo\MultiScreen.vue
 -->
<template>
    <gs-dialog title="多屏比对" @close="closeHandler" :visible.sync="isVisible" :width="width" :height="height"
        class="moreMain" :append-to-body="true" @corner-close="cancelHandler" @open="openHandler">
        <div class="navbar">
            <div class="headers">
                <span>相似度：</span>
                <el-slider class="similarity" v-model="includeThreshold" @change="includeThresholdHandler"
                    :format-tooltip="formatTooltip" :max="99"></el-slider>
                <span class="analogously">{{includeThreshold}}%</span>
                <span style="margin-left:0.3rem">时间范围：</span>
                <el-input v-if="isVisible" id="textStart1" readonly class="searchInput searchtime" v-model="beginData"
                    @focus="focalTime" placeholder="请选择开始时间">
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>-
                <el-input v-if="isVisible" id="textEnd1" readonly class="searchInput searchtime" v-model="endData"
                    @focus="focalTime" placeholder="请选择结束时间">
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>
                <el-button class="el-icon-search searchBtn" v-no-more-click :disabled="isForbidden" @click="searchTime">
                    &nbsp;&nbsp;查询</el-button>
                <el-button class="el-icon-refresh tryBtn" @click="resetSearch">&nbsp;&nbsp;重置</el-button>
            </div>
            <div class="principal">
                <div class="main-left">
                    <div class="videoPic" id="idPlayerSex">
                        <div>
                            <input v-if="isVisible" id="idUrlSex" type="hidden" style="width:399px" value>
                        </div>
                    </div>
                    <div class="videoCompar" align="center">
                        <!-- <el-button class="searchBtn" size="small" onclick="OnPause('false')">播放</el-button> -->
                        <el-button class="searchBtn" size="small" @click="playVideo()">播放</el-button>
                        <el-button class="searchBtn" size="small" @click="pauseVideo()">暂停</el-button>
                        <el-button class="searchBtn" size="small" onclick="OnSetup(-1)" @click="retreatframe">快退一帧
                        </el-button>
                        <el-button class="searchBtn" size="small" onclick="OnSetup(1)" @click="fastframe">快进一帧
                        </el-button>
                        <el-button class="searchBtn" size="small" @click="cluePond">加入线索池</el-button>
                    </div>
                    <div class="main-footer">
                        <div class="spaceSkynet">
                            <div class="spaceVideBut leftBut el-icon-arrow-left" @click="scrollRight('left')"></div>
                            <div class="spaceVideBut rightBut el-icon-arrow-right" @click="scrollRight('right')"></div>
                            <div class="spacePic" v-if="isVisible" id="slideAround"
                                v-on:scroll.passive="spaceVideoScroll()">
                                <div class="videoItem" v-for="(item,index) in PicList" :key="index">
                                    <div class="play none" @click="playCVideo(item,index)"></div>
                                    <div class="frameVideo" @click="playCVideo(item,index)"
                                        :class="isactive == index ? 'markNone' : '' ">
                                        <img class="imgbox" :onerror="$store.state.defaultImg" :src="item.traceImgUrl">
                                        <span class="similary">相似度：{{(item.similarity * 100).toFixed(2)+'%'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-right">
                    <div>
                        <div class="conditionList">
                            <table border="solid" width="500px" height="200px" v-loading="loading"
                                element-loading-text="查询中" element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.8)">
                                <thead>
                                    <tr>
                                        <th colspan="2">以图搜图结果（{{trackInfo.length}}）</th>
                                    </tr>
                                    <tr>
                                        <th>设备名称</th>
                                        <th>目标数量</th>
                                    </tr>
                                </thead>
                                <tbody class="table-tbody">
                                    <tr v-for="(item,index) in trackInfo" :key="index">
                                        <td @click="getMonitor(item)">{{item.cameraName}}</td>
                                        <td>{{item.list.length}}</td>
                                    </tr>
                                    <tr v-if="!trackInfo.length">
                                        <td colspan="2" style="text-decoration:none">暂无数据</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="cluePool">
                            <p align="center">线索池（{{nowSuslist.length}}）</p>
                            <div class="clue">
                                <ul class="mainul mainSmallul">
                                    <p class="firstMain">
                                        <img class="imgwidth" :src="recodeResult.bigPic" alt="暂无图片">
                                    </p>
                                    <li v-for="(item,index) in nowSuslist" :key="index">
                                        <div :id="'vmarkLi'+index">
                                            <b title="删除标注" @click.stop="dellable(item,index)" class="deleteLable">
                                                <img src="../../../assets/images/videoNewImg/commhand/delete.png" alt>
                                            </b>
                                            <img src="@/assets/error_none.png" style="width:100%;height:100%;"
                                                alt="暂无图片" v-if="!item.traceImgUrl">
                                            <img class="imgbox" :id="'vmarker_'+index" :src="item.traceImgUrl"
                                                alt="暂无图片" v-if="item.traceImgUrl">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="searchClc" align="center">
                                <el-button class="searchBtn" size="small" @click="saveHandler">转标注</el-button>
                                <el-button class="searchBtn" size="small" @click="checkTrack">轨迹重现</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-dialog :tagDialog.sync="tagDialog" :tagDataList="tagDataList" :fromPage="fromPage" :height="selfheight">
        </v-dialog>

        <track-map-dialog @closeMap="closeMap" :mapVisible="mapVisible" :locusList="locusList" :caseUuid="caseUuid">
        </track-map-dialog>
    </gs-dialog>
</template>

<script>
    let moment = require("moment");
    import scale from "../../../api/common/scale.js";
    import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
    import videoplay from "../../../api/realvideo/videoplay.js";
    import videoDown from "../../../api/casestudy/videoDown.js";
    import videoMarker from "../../../api/realvideo/videoMarker.js";
    import reviseTime from "../../../api/realvideo/reviseTime.js";
    import flvplay from "../../../api/casestudy/flvPlay.js";
    import {
        mapActions,
        mapMutations,
        mapState,
        mapGetters
    } from "vuex"; //引入vuex
    export default {
        name: "searchPicture",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            width: {
                type: [String, Number],
                default: "15rem"
            },
            height: {
                type: [String, Number],
                default: "9rem"
            },
            allfeature: String, // 特征值
            trackList: Array,
            childFerture: Number,
            structureList: Object,
            opeVideo: Number,
            paperUuid: String,
            retrievalTime: Object
        },
        data() {
            return {
                beginData: "", // 开始时间
                endData: "", // 结束时间
                featureFlag: "", //识别的类型  1是人，2是车，3是骑车人
                targetid: "", //目标ID
                includeThreshold: 60, // 比对阈值
                tagDialog: false, // 默认关闭转标注弹层
                mapVisible: false, // 地图弹层
                tagDataList: [], // 转标注数据
                fromPage: "5", // 传到转标注的值
                selfheight: "300px",
                recodeResult: {}, // 以图搜图的第一个对象
                trait: "", // 特征
                PicList: [], // 滑动列表数据
                caseMarkTotal: 100,
                tagConvertIds: [],
                caseUuid: "",
                trackInfo: [],
                trackArr: [],
                nowSuslist: [], // 线索池数组
                clueList: [],
                locusList: [],
                nowIndex: null,
                imgnowWH: [], //图片自适应的宽高比
                trackData: [],
                isactive: null,
                isForbidden: false,
                loading: false,
                pickerOptions: {
                    disabledDate: date => {
                        return date.getTime() > Date.now() - 8.64e6;
                    }
                }
            };
        },
        components: {
            TrackMapDialog: () =>
                import("../../casestudy/imeidialog/TrackMapDialog.vue")
        },
        mixins: [
            scale,
            beginEnd,
            videoplay,
            videoDown,
            videoMarker,
            reviseTime,
            flvplay
        ],
        created() {},
        watch: {
            tagDialog(val) {
                // 监听转标注页面是否打开关闭触发播放器显示
                if (!val) {
                    if (this.opeVideo == 2) {
                        OnShow();
                    } else {
                        OnvideoShow();
                    }
                }
            },
            mapVisible(val) {
                // 监听轨迹重现页面是否打开关闭触发播放器显示
                if (!val) {
                    if (this.opeVideo == 2) {
                        OnShow();
                    } else {
                        OnvideoShow();
                    }
                }
            },
            trackList(val) {
                //开始追踪后传过来的数据
                this.trackInfo = val;
                this.trackArr = val;
            },
            structureList(val) {
                // 以图搜图的第一个对象
                this.recodeResult = val;
            }
        },
        mounted() {},

        computed: {
            isVisible: {
                //打开关闭
                get() {
                    return this.visible;
                },
                set(visible) {
                    if (!visible) {
                        setTimeout(() => {
                            // 2.5秒在关闭弹层
                            this.$emit("update:visible", visible);
                        }, 2500);
                    } else {
                        this.$emit("update:visible", visible);
                    }
                }
            }
        },
        methods: {
            ...mapMutations(["setisopenOffVideo"]),
            // 触发时间控件显示或隐藏
            chooseTime(event) {
                if (event.target.id != "textStart1" && event.target.id != "textEnd1") {
                    if (document.getElementsByClassName("layui-laydate").length) {
                        this.lostTime();
                    }
                }
            },
            // 打开模态框
            openHandler() {
                document.addEventListener("click", this.chooseTime);
                this.getlabel();
                if (this.opeVideo == 2) {
                    // 检索的
                    addPage2(); // 增加页签
                    g_case_video = 2; // 执行6分屏
                    this.beginData = this.retrievalTime.startTime;
                    this.endData = this.retrievalTime.endTime;
                    setTimeout(() => {
                        OnAttachCaseWindow();
                    }, 1000);
                    setTimeout(() => {
                        this.commonCtoPlayPic("idUrlSex", this.recodeResult.bigPic); //执行C++播放器的播放方法中赋值字段
                    }, 500);
                    setTimeout(() => {
                        OnChangeCaseView(6); // 6分屏
                        OnPlayPic2(this.recodeResult.bigPic); // 播放
                    }, 1500);
                } else if (this.opeVideo == 1) {
                    // 播放和结构化的
                    addPage(); // 增加页签
                    g_change_page = 2; // 执行6分屏
                    setTimeout(() => {
                        this.getTimeTobe(this.$route.query.caseUuid); // 获取当前案件时间
                    }, 100);
                    setTimeout(() => {
                        OnAttachWindow();
                    }, 200);
                    setTimeout(() => {
                        this.commonCtoPlayPic("idUrlSex", this.recodeResult.bigPic); //执行C++播放器的播放方法中赋值字段
                    }, 500);
                    setTimeout(() => {
                        OnPlayPic(this.recodeResult.bigPic); // 播放
                    }, 1500);
                } else if (this.opeVideo == 3) {
                    // 天网播放的
                    g_change_page = 2; // 执行6分屏
                    setTimeout(() => {
                        this.getTimeTobe(this.$route.query.caseUuid); // 获取当前案件时间
                    }, 100);
                    OnInit(); // 初始化播放器
                    setTimeout(() => {
                        OnAttachWindow();
                    }, 1000);
                    setTimeout(() => {
                        this.commonCtoPlayPic("idUrlSex", this.recodeResult.bigPic); //执行C++播放器的播放方法中赋值字段
                        OnPlayPic(this.recodeResult.bigPic); // 播放
                    }, 1000);
                }
            },
            closeMap(val) {
                this.mapVisible = val;
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
                            if (this.opeVideo == 2) {
                                // 检索
                                this.beginData = this.retrievalTime.startTime;
                                this.endData = this.retrievalTime.endTime;
                            } else {
                                // 结构化时间
                                this.beginData = res.data.data.startTime;
                                this.endData = res.data.data.endTime;
                            }
                            setTimeout(() => {
                                this.OpenRangeTime("#textStart1", "#textEnd1");
                            }, 100);
                        }
                    });
            },
            // 转标注的第一个参数
            getlabel() {
                let data = {
                    caseUuid: this.$route.query.caseUuid,
                    fileUuid: this.paperUuid,
                    data: JSON.stringify(this.recodeResult)
                };
                data = this.$qs.stringify(data);
                this.$http.post("vsas/video/mark/attr2mark", data).then(res => {
                    if (res.data.code == 200) {
                        this.markId = res.data.data;
                    }
                });
            },
            // 失去焦点
            lostTime() {
                // 失去焦点触发
                if (this.opeVideo == 2) {
                    // 检索的失去焦点显示播放器
                    OnShow();
                } else {
                    OnvideoShow(); // 播放，结构化，天网失去焦点显示播放器
                }
            },
            // 获取焦点
            focalTime() {
                OnvideoHide(); // 时间控件获取焦点隐藏播放器
            },
            // 查询
            searchTime() {
                this.isForbidden = true;
                if (this.beginData == "" || this.beginData == null) {
                    this.$notify({
                        type: "warning",
                        message: "请选择开始时间",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
                if (this.endData == "" || this.endData == null) {
                    this.$notify({
                        type: "warning",
                        message: "请选择结束时间",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
                this.trackInfo = []; // 先清空列表
                this.PicList = []; // 滑动列表清空
                this.loading = true;
                let data = {
                    feature: this.allfeature, // 特征
                    featureFlag: this.childFerture, // 特征类型，1：行人，2：车辆，3：骑车人，4：人脸
                    caseUuid: this.$route.query.caseUuid,
                    searchType: 0, // 查询类型：0：正常以图搜图，1：框选区域以图搜图
                    includeThreshold: this.includeThreshold / 100, // 比对阈值
                    deviceUuids: "", // 框选范围传过来的值
                    startTime: this.beginData, // 开始时间
                    endTime: this.endData // 结束时间
                };
                data = this.$qs.stringify(data);
                this.$http.post("vsas/structure/search", data).then(res => {
                    this.loading = false;
                    if (res.data.code == 200) {
                        this.isForbidden = false;
                        if (res.data.data == null || res.data.data.length == 0) {
                            this.$notify({
                                type: "warning",
                                message: "暂无数据！",
                                position: "bottom-right",
                                duration: 3000
                            });
                            return;
                        } else {
                            this.$notify({
                                type: "success",
                                message: "查询数据成功",
                                position: "bottom-right",
                                duration: 3000
                            });
                            for (let i = 0; i < res.data.data.length; i++) {
                                this.trackInfo.push(res.data.data[i]); // 有数据后给列表赋值
                            }
                        }
                    }
                });
            },
            // 点击多屏比对图片播放视频
            playCVideo(item, index) {
                this.isactive = index;
                this.commonCtoPlay(this.PicList, index, "idUrlSex");
                if (item.vehicleUuid != undefined) {
                    OnPlaySexId(item.vehicleUuid, ""); // 点播放传过去的那一项值
                } else if (item.personUuid != undefined) {
                    OnPlaySexId(item.personUuid, ""); // 点播放传过去的那一项值
                } else if (item.bicycleUuid != undefined) {
                    OnPlaySexId(item.bicycleUuid, ""); // 点播放传过去的那一项值
                }
                let startTime = Math.floor(item.appearTime / 1000); //出现时间
                let endTime = Math.ceil(item.disappearTime / 1000); // 消失时间
                let timeIndex = 0;
                let timer = setInterval(() => {
                    timeIndex++;
                    if (startTime <= 3) {
                        //如果目标出现时间小于第3秒，从第0秒开始放
                        setTimeout(() => {
                            OnPlaySeek(0, endTime); // 循环播放时长
                        }, 1000);
                    } else {
                        //如果目标出现在最后4秒或者目标出现在中间
                        setTimeout(() => {
                            OnPlaySeek(startTime - 3, endTime);
                        }, 1000);
                    }
                    if (g_seek_flag !== "2") {
                        // 循环正确退出
                        clearInterval(timer);
                    } else {
                        if (timeIndex == 3) {
                            // 循环不正确执行3次后退出
                            clearInterval(timer);
                        }
                    }
                }, 1000);
            },
            //播放
            playVideo() {
                let clueUuid = sessionStorage.getItem("firstSex"); // 获取存放的点击播放是的人，车，骑车人id
                if (clueUuid == "" || clueUuid == undefined) {
                    // 判断点击播放器时是否有人，车，骑车人id
                    this.$notify({
                        type: "warning",
                        message: "请先播放视频",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    OnPause("false");
                }
            },
            // 暂停
            pauseVideo() {
                let clueUuid = sessionStorage.getItem("firstSex"); // 获取存放的点击播放是的人，车，骑车人id
                if (clueUuid == "" || clueUuid == undefined) {
                    // 判断点击播放器时是否有人，车，骑车人id
                    this.$notify({
                        type: "warning",
                        message: "请先播放视频",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    OnPause("true");
                }
            },
            // 加入线索池
            cluePond() {
                let flag = false;
                let clueUuid = sessionStorage.getItem("firstSex"); // 获取存放的点击播放是的人，车，骑车人id
                if (clueUuid == "" || clueUuid == undefined) {
                    // 判断点击播放器时是否有人，车，骑车人id
                    this.$notify({
                        type: "warning",
                        message: "请先播放视频",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
                if (this.clueList.length) {
                    this.clueList.forEach(id => {
                        if (id.indexOf(clueUuid) != -1) {
                            flag = true;
                        }
                    });
                }
                if (flag) {
                    this.$notify({
                        type: "warning",
                        message: "线索池数据重复",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
                for (let i = 0; i < this.trackInfo.length; i++) {
                    for (let k = 0; k < this.trackInfo[i].list.length; k++) {
                        if (this.trackInfo[i].list[k].vehicleUuid == clueUuid) {
                            // 判断人，车，骑车人id是否和点击播放器时绑定的id相等
                            this.trackInfo[i].list[k].latitude = this.trackInfo[i].latitude;
                            this.trackInfo[i].list[k].longitude = this.trackInfo[i].longitude;
                            this.nowSuslist.push(this.trackInfo[i].list[k]);
                            this.clueList.push(this.trackInfo[i].list[k].vehicleUuid);
                        } else if (this.trackInfo[i].list[k].personUuid == clueUuid) {
                            this.trackInfo[i].list[k].latitude = this.trackInfo[i].latitude;
                            this.trackInfo[i].list[k].longitude = this.trackInfo[i].longitude;
                            this.nowSuslist.push(this.trackInfo[i].list[k]);
                            this.clueList.push(this.trackInfo[i].list[k].personUuid);
                        } else if (this.trackInfo[i].list[k].bicycleUuid == clueUuid) {
                            this.trackInfo[i].list[k].latitude = this.trackInfo[i].latitude;
                            this.trackInfo[i].list[k].longitude = this.trackInfo[i].longitude;
                            this.nowSuslist.push(this.trackInfo[i].list[k]);
                            this.clueList.push(this.trackInfo[i].list[k].bicycleUuid);
                        }
                    }
                }
            },
            // 删除线索池
            dellable(item, index) {
                this.nowSuslist.splice(index, 1); //删除线索池的某一项
                this.clueList.splice(index, 1); //删除线索池的某一项
            },
            // 重置
            resetSearch() {
                // 播放，结构化时间重置
                this.getTimeTobe(this.$route.query.caseUuid); //时间重置
                this.trackInfo = this.trackArr; // 以图搜图结果清空
                this.includeThreshold = 60;
                this.PicList = []; // 滑动列表清空
                this.clueList = [];
                this.nowSuslist = []; // 线索池数据清空
            },
            // 点击监控点
            getMonitor(item) {
                this.PicList = []; // 点击监控点先清空数据
                this.isactive = null; // 清空选中的状态
                document.getElementById("slideAround").scrollLeft = 0; //列表到最左边
                this.PicList = item.list; // 监控点赋值
                this.caseMarkTotal = item.list.length;
            },
            // 相似度
            includeThresholdHandler(val) {
                this.includeThreshold = val;
            },
            formatTooltip(val) {
                this.includeThreshold = val;
                return this.includeThreshold + "%";
            },
            //转标注
            saveHandler() {
                this.tagConvertIds = []; //先清空数据
                this.tagDataList = this.trackInfo;
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
                if (this.childFerture == 1) {
                    //判断是人车还是骑车人
                    targetType = 1;
                } else if (this.childFerture == 2) {
                    targetType = 3;
                } else if (this.childFerture == 3) {
                    targetType = 2;
                }
                this.tagDataList.forEach(v => {
                    v.typeFlag = targetType;
                });
                this.tagDataList[0].typeFlag = targetType;
                let featureFlag = 1;
                for (let i = 0; i < this.nowSuslist.length; i++) {
                    if (this.nowSuslist[i].vehicleUuid != undefined) {
                        //表示车辆
                        featureFlag = 2;
                        this.tagConvertIds.push(this.nowSuslist[i].vehicleUuid); // 获取车辆uuid
                    } else if (this.nowSuslist[i].personUuid != undefined) {
                        //表示行人
                        featureFlag = 1;
                        this.tagConvertIds.push(this.nowSuslist[i].personUuid); // 获取行人uuid
                    } else if (this.nowSuslist[i].bicycleUuid != undefined) {
                        //表示骑车人
                        featureFlag = 3;
                        this.tagConvertIds.push(this.nowSuslist[i].bicycleUuid); // 获取骑车人uuid
                    }
                }
                if (!this.tagConvertIds.length) {
                    this.$notify({
                        type: "warning",
                        message: "暂无标注！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    OnvideoHide();
                    this.tagDialog = true; // 打开模态框
                    this.tagConvertIds.push(this.markId);
                    this.tagDataList.targetIds = this.tagConvertIds.join(",");
                }
            },
            // 点击线索框横向滚动
            scrollRight(type) {
                let count = 0;
                let scrollLeft = document.getElementById("slideAround").scrollLeft; // 251
                let scrollWidth = document.getElementById("slideAround").scrollWidth; // 0-18
                let clientWidth = document.getElementById("slideAround").clientWidth; // 233
                if (type == "left") {
                    document.getElementById("slideAround").scrollLeft =
                        document.getElementById("slideAround").scrollLeft - 200;
                    if (document.getElementById("slideAround").scrollLeft == 0) {
                        this.$notify({
                            type: "warning",
                            message: "已经到第一页了",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return;
                    }
                }
                if (type == "right") {
                    document.getElementById("slideAround").scrollLeft += 200;
                    if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth) {
                        count = 1;
                        count++;
                        if (count == 2) {
                            this.$notify({
                                type: "warning",
                                message: "已经到最后一页了",
                                position: "bottom-right",
                                duration: 3000
                            });
                            return;
                            // document.getElementById("spaceVideo").scrollLeft = 10  //删除右侧按钮无限点击
                        }
                    }
                }
            },
            //轨迹重现
            checkTrack() {
                this.trackData = [];
                let trajectory = [];
                let deviceInfo = sessionStorage.getItem("deviceInfo");
                deviceInfo = JSON.parse(deviceInfo);
                let obj = {};
                obj.longitude = deviceInfo.longitude;
                obj.latitude = deviceInfo.latitude;
                obj.fileStartTime = this.recodeResult.startTime;
                obj.appearTime = this.recodeResult.relativeTime;
                obj.offset = this.recodeResult.offset;
                let pathList = this.nowSuslist.slice();
                pathList.push(obj);
                // 对数组进行排序，按照时间大小+目标出现时间+点位偏移量进行排序
                trajectory = pathList
                    .slice(0)
                    .sort((a, b) =>
                        new Date(b.fileStartTime).getTime() + b.appearTime + b.offset * 1000 <
                        new Date(a.fileStartTime).getTime() + a.appearTime + a.offset * 1000 ?
                        1 :
                        -1
                    );
                for (let i = 0; i < trajectory.length; i++) {
                    // 循环线索池数据，不包括第一项，获取经纬度
                    let obj = {};
                    obj.latitude = trajectory[i].latitude;
                    obj.longitude = trajectory[i].longitude;
                    this.trackData.push(obj);
                }
                if (this.trackData.length < 2) {
                    // 如果没有两条数据不显示
                    this.$notify({
                        type: "warning",
                        message: "暂无轨迹",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
                OnvideoHide(); // 隐藏播放器
                for (var i = 0; i < this.trackData.length - 1; i++) { // 重复的经纬度进行去重
                    for (var j = i + 1; j < this.trackData.length; j++) {
                        if (
                            this.trackData[i].latitude === this.trackData[j].latitude &&
                            this.trackData[i].longitude === this.trackData[j].longitude
                        ) {
                            this.trackData.splice(j, 1);
                        }
                    }
                }
                this.locusList = this.trackData;
                this.mapVisible = true;
            },
            retreatframe() {
                let clueUuid = sessionStorage.getItem("firstSex"); // 获取存放的点击播放是的人，车，骑车人id
                if (clueUuid == "" || clueUuid == undefined) {
                    // 判断点击播放器时是否有人，车，骑车人id
                    this.$notify({
                        type: "warning",
                        message: "请先播放视频",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    OnSetup(-1);
                }
            },
            fastframe() {
                let clueUuid = sessionStorage.getItem("firstSex"); // 获取存放的点击播放是的人，车，骑车人id
                if (clueUuid == "" || clueUuid == undefined) {
                    // 判断点击播放器时是否有人，车，骑车人id
                    this.$notify({
                        type: "warning",
                        message: "请先播放视频",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    OnSetup(-1);
                }
            },
            // 关闭弹层
            closeHandler() {
                this.beginData = ""; // 清空开始时间
                this.endData = ""; // 清空结束时间
                this.timeBegin1 = "";
                this.nowSuslist = []; // 清空数据
                this.includeThreshold = 60; //相似度清60
                this.clueList = [];
                this.PicList = []; // 清空滑动列表数据
                g_case_video = 1; // 关闭置成1分屏
                this.tagConvertIds = [];
                this.markId = "";
                if (this.opeVideo == 1) {
                    closePage(); // 关闭页签
                } else if (this.opeVideo == 2) {
                    closePage2(); // 关闭页签
                } else if (this.opeVideo == 3) {}
                if (document.getElementsByClassName("layui-laydate").length) {
                    //关闭时间控件弹层
                    document.getElementsByClassName("layui-laydate")[0].style.display =
                        "none";
                }
                clearInterval(window.g_interval);
                document.removeEventListener("click", this.chooseTime); // 移除监听的时间控件方法
                this.$emit("defaultVideo", 1, true);
            },
            // 取消关闭弹层
            cancelHandler() {
                this.isVisible = false;
            },
            // 底部线索框滚动条懒加载
            spaceVideoScroll() {}
        }
    };
</script>

<style scoped>
    @import "../../../assets/css/commom.css";

    .navbar {
        width: 100%;
        height: 8.1rem;
        border: 1px solid #13436e;
    }

    .headers {
        border: 1px solid #13436e;
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
    }

    .headers span {
        color: #99c9fa;
    }

    .el-button {
        padding: 0 0.1rem;
        height: 0.28rem;
    }

    .principal {
        width: 100%;
        height: 750px;
    }

    .main-left {
        width: 76%;
        height: 100%;
        position: relative;
        float: left;
    }

    .videoPic {
        width: 100%;
        height: 550px;
    }

    .main-footer {
        width: 98%;
        height: 150px;
        margin: 10px;
        border: 1px solid #13436e;
        position: relative;
    }

    .main-footer .item {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
    }

    .main-footer .item li {
        width: 200px;
        height: 100%;
        list-style: none;
        border: 1px solid #13436e;
    }

    .main-footer .item li img {
        width: 200px;
        height: 100%;
    }

    .main-right {
        width: 23%;
        height: 98%;
        float: right;
        border: 1px solid #13436e;
    }

    .conditionList {
        width: 2.7rem;
        height: 2.5rem;
        margin: 5px auto;
        overflow-y: auto;
    }

    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        text-align: center;
        color: #99c9fa;
    }

    .table-tbody {
        border: 1px solid #134276;
    }

    table tr th {
        text-align: center;
        padding: 0.05rem;
        border: 1px solid #134276;
    }

    table tr td {
        line-height: 30px;
    }

    table tr td:nth-child(1) {
        color: #4b9de8;
        text-decoration: underline;
        cursor: pointer;
    }

    thead {
        border-bottom: 1px solid #333;
    }

    .cluePool {
        height: 4.65rem;
        margin: 5px;
        border: 1px solid #13436e;
    }

    .cluePool p {
        color: #99c9fa;
    }

    .goPageOne {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .goPageTwo {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .el-carousel__item.el-carousel__item--card.is-in-stage {
        text-align: center;
    }

    /*修改高度*/
    .el-carousel__container {
        height: 100px;
    }

    .van-collapse-item__content {
        padding: 14px 0;
    }

    /*左右箭头的样式*/
    button.el-carousel__arrow.el-carousel__arrow--left,
    button.el-carousel__arrow.el-carousel__arrow--right {
        font-size: 12px;
        height: 20px;
        width: 20px;
        background: #a099f0;
    }

    .imgurl {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
    }

    .similarity {
        position: absolute;
        width: 2rem;
        top: 0.58rem;
        left: 1rem;
    }

    .searchClc {
        margin: 10px 0;
    }

    .el-carousel_item:nth-child(2n) {
        background: #99a9bf;
    }

    .el-carousel_item:nth-child(2n + 1) {
        background: #99a9bf;
    }

    .frameVideo {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .frameVideo img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .spaceSkynet {
        width: 100%;
        height: 1.5rem;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 99;
        transition: 0.2s;
        z-index: 100;
    }

    .spaceVideBut {
        width: 0.4rem;
        height: 1rem;
        position: absolute;
        top: 0.5rem;
        cursor: pointer;
        background: rgba(32, 49, 67, 0.9);
        box-sizing: border-box;
        line-height: 1rem;
        font-size: 0.3rem;
        text-align: center;
        color: white;
    }

    .spaceVideBut:hover {
        background: rgba(32, 49, 67, 0.9);
    }

    .leftBut {
        left: 13px;
        top: 25px;
        z-index: 10;
        border-radius: 0.05rem 0 0 0.05rem;
    }

    .rightBut {
        top: 0.25rem;
        right: 0.13rem;
        z-index: 10;
        border-radius: 0 0.05rem 0.05rem 0;
    }

    .spacePic {
        width: 100%;
        height: 100%;
        padding: 0.1rem 0;
        white-space: nowrap;
        overflow-x: auto;
        background: rgba(32, 49, 67, 0.9);
        padding-right: 0;
        z-index: 99;
    }

    .videoItem {
        height: 95%;
        width: 24%;
        margin: 0 5px;
        margin-top: 3px;
        position: relative;
        display: inline-block;
        cursor: pointer;
        align-items: center;
        border: 1px solid #235588;
    }

    .videoCompar {
        margin: 0.05rem 0;
    }

    .clue {
        width: 97%;
        margin: 0.05rem;
        height: 3.9rem;
        border: 1px solid rgba(15, 44, 79, 0.9);
    }

    .mainul {
        overflow-y: auto;
        padding: 0 0.1rem;
        height: calc(100% - 0.2rem);
        position: relative;
    }

    .firstMain {
        margin-top: 0.13rem;
        float: left;
        width: 49%;
        height: 1.3rem;
        margin-right: 2%;
        border: 2px solid #102d50;
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

    .play {
        position: absolute;
        width: 0.25rem;
        height: 0.25rem;
        top: 50%;
        left: 50%;
        display: none;
        transform: translate(-50%, -50%);
        background: url("../../../assets/images/videoNewImg/commhand/play_button.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        z-index: 3;
    }

    .mainul li:hover .none {
        display: block;
    }

    .spacePic .videoItem:hover .none {
        display: block;
    }

    .mainul li:nth-child(4n) {
        margin-right: 0;
    }

    .mainul li div {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 999;
    }

    .mainul li div>img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

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

    .mainul li>.el-button {
        position: absolute;
        bottom: 0.02rem;
        right: 0.05rem;
        font-size: 0.12rem;
        padding: 0.02rem 0.05rem;
    }

    .mainSmallul li {
        width: 49%;
        height: 1.3rem;
        margin-right: 2%;
    }

    .mainSmallul li:nth-child(2n) {
        margin-right: 0;
    }

    .imgwidth {
        width: 100%;
        height: 95%;
    }

    .deleteLable {
        display: none;
        z-index: 999;
    }

    .mainul li:hover div .deleteLable {
        display: block;
        position: absolute;
        cursor: pointer;
        width: 0.3rem;
        height: 0.3rem;
        top: 0;
        right: -0.1rem;
        z-index: 3;
    }

    .markNone {
        border: 1px solid #409eff;
    }

    .analogously {
        display: inline-block;
        width: 0.4rem;
        margin-left: 2.3rem;
    }

    .gs-search-btn {
        height: 28px;
        line-height: 14px;
        text-align: center;
        padding: 0 12px;
        color: #fff;
        font-size: 14px;
        border: 0;
        cursor: pointer;
        margin-left: 15px;
    }

    .similary {
        position: absolute;
        padding: 0 0.1rem;
        font-size: 0.12rem;
        line-height: 0.2rem;
        height: 0.2rem;
        border-radius: 0.02rem;
        background-color: #409eff;
        right: 0.5rem;
        bottom: 0;
        color: #fff;
    }

    .imgbox {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .searchInput {
        line-height: 0.26rem;
        width: 1.2rem;
        border-radius: 3px;
    }

    .searchtime {
        width: 1.8rem;
    }

    .conditionList /deep/ .el-loading-mask {
        top: 0.6rem !important;
        bottom: 0.01rem !important;
    }
</style>
