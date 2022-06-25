<template>
    <div class="palyMain animate__animated fadeInRightBig animated">
        <div class="leftlist">
            <div class="hideplay" title="收起" @click="setshowplayvideo(false)">
                <span class="el-icon-arrow-right"></span>
            </div>
            <p class="center">播放列表</p>
            <p class="fileinfo">
                <span>文件名称</span>
                <span class="fileTime">文件开始时间</span>
            </p>
            <ul class="listul">
                <li v-for="(item,index) in videoList" @click="playCVideo(index,item)"
                    :class="{palyactive:index == playIndex ? 'palyactive' : '',red:item.deviceType == 0,blue:item.status == 5}"
                    :key="index">
                    <span class="fileLeft" :title="item.fileName">{{item.fileName}}</span>
                    <span :title="item.startTime">{{item.startTime}}</span>
                </li>
            </ul>
            <el-pagination background :small="true" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                layout="total, prev, pager, next" :total="totalCount"></el-pagination>
        </div>
        <div class="rightplay" id="rightplay">
            <div class="righttop">
                <div class="palyer" id="idPlayer">
                    <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
                    <input id="idUrl" type="hidden" style="width:399px" value>
                </div>

                <div class="progress" ref="progress">
                    <p @click.prevent="jumpon($event)" ref="jumpon"></p>
                    <!-- 跳播 -->
                    <b ref="playpro"></b>
                    <!-- 加载进度  -->
                    <span class="timespan" v-show="showplayTime">
                        {{(palytime * 1000 + videostartime) | totaltime}}&nbsp;&nbsp;/&nbsp;&nbsp;{{(videotime * 1000 + videostartime)
                        | totaltime}}
                    </span>
                    <span class="timespan" v-show="!showplayTime">00:00:00&nbsp;&nbsp;/&nbsp;&nbsp;00:00:00</span>
                </div>
            </div>
            <div class="rightbom">
                <ul class="funcBtn">
                    <li>
                        <img onclick="OnPause('false')" v-show="showplay == 'true' ? true : false"
                            src="@/assets/images/videoCombat/rtvideo/souse.png" title="播放（键盘空格）">
                        <img onclick="OnPause('true')" v-show="showplay == 'true' ? false : true"
                            src="@/assets/images/videoCombat/history/plays.png" title="暂停（键盘空格）">
                    </li>
                    <li>
                        <img @click="playprev()" src="@/assets/images/videoCombat/videoplay/prev.png" title="上一个（键盘上健）">
                        <img @click="goretreat()" src="@/assets/images/videoCombat/videoplay/ico1.png" title="快退">
                        <img @click="retreatframe" src="@/assets/images/videoCombat/videoplay/play2.png" title="快退一帧（键盘左健）">
                        <img @click="fastframe" src="@/assets/images/videoCombat/videoplay/play.png" title="快进一帧（键盘右健）">
                        <img @click="gofast()" src="@/assets/images/videoCombat/videoplay/ico.png" title="快进">
                        <img @click="playnext()" src="@/assets/images/videoCombat/videoplay/next.png" title="下一个（键盘下健）">
                    </li>
                    <li class="imgoperate">
                        <img src="@/assets/images/videoCombat/videoplay/playspeed.png" alt>
                        <div>
                            <span @click="playstep(-3,0)" :class="{ONactives:0 == nowIndex}">
                                <b :class="{Coloractives:0 == nowIndex}">-8X</b>
                            </span>
                            <span @click="playstep(-2,1)" :class="{ONactives:1 == nowIndex}">
                                <b :class="{Coloractives:1 == nowIndex}">-4X</b>
                            </span>
                            <span @click="playstep(-1,2)" :class="{ONactives:2 == nowIndex}">
                                <b :class="{Coloractives:2 == nowIndex}">-2X</b>
                            </span>
                            <span @click="playstep(0,3)" :class="{ONactives:3 == nowIndex}">
                                <b :class="{Coloractives:3 == nowIndex}">0X</b>
                            </span>
                            <span @click="playstep(1,4)" :class="{ONactives:4 == nowIndex}">
                                <b :class="{Coloractives:4 == nowIndex}">2X</b>
                            </span>
                            <span @click="playstep(2,5)" :class="{ONactives:5 == nowIndex}">
                                <b :class="{Coloractives:5 == nowIndex}">4X</b>
                            </span>
                            <span @click="playstep(3,6)" :class="{ONactives:6 == nowIndex}">
                                <b :class="{Coloractives:6 == nowIndex}">8X</b>
                            </span>
                        </div>
                    </li>
                    <li @click="fullscreen">
                        <p class="el-icon-full-screen"></p>
                        <span>{{fulltitle}}</span>
                    </li>
                    <li @click="cutimgtocup">
                        <p class="el-icon-picture"></p>
                        <span>导出图片</span>
                    </li>
                    <li @click="cutcutvideotocup">
                        <p class="el-icon-service"></p>
                        <span>导出视频</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getvideolist
    } from "@/api/discernserve/discernSearch.js";
    import cvideo from "@/api/realvideo/C_video.js";
    import {
        mapMutations,
        mapGetters
    } from "vuex";
    import moment from "moment";
    import _ from "lodash";
    export default {
        data() {
            return {
                videoList: [], //点位列表
                currentPage: 1,
                pageSize: 15,
                totalCount: 0,
                playIndex: null,
                playrowObj: {},
                nowIndex: 3, //默认速率
                showplayTime: false,
                palytime: 0, //当前播放时间
                videotime: 0, //总时长
                videostartime: 0, //文件开始时间 2021:05:05 12:12:12
                timeToplay: null,
                showplay: false,
                pages: 0, //总页数
                isfullscreen:false, //是否全屏
                fulltitle:'全屏播放', //是否全屏
            };
        },
        mixins: [cvideo],
        props: {
            deviceUuid: String,
            caseUuid: String
        },
        computed: {
            ...mapGetters(["showplayvideo", "nowplayObj"])
        },

        filters: {
            totaltime(value) {
                if (value == 0 || value == undefined || isNaN(value)) {
                    return "00:00:00";
                } else {
                    // 1. 将时间搓转化为时间对象
                    let date = new Date(value);
                    return moment(date).format("YYYY-MM-DD HH:mm:ss");
                }
            }
        },
        watch: {
            //监听点位
            deviceUuid(val) {
                this.currentPage = 1;
                this.pageSize = 15;
                this.playIndex = null;
                this.playrowObj = {};
                this.getlist();
            },
            //监听页面是否打开
            showplayvideo(val) {
                if (val) {
                    this.currentPage = this.nowplayObj.currentPage;
                    this.pageSize = this.nowplayObj.pageSize;
                    this.playrowObj = this.nowplayObj.obj;
                    this.getlist();
                    setTimeout(() => {
                        document.title = document.title + ".";
                        OnInit();
                        setTimeout(() => {
                            this.playCVideo(this.playIndex, this.playrowObj);
                        }, 2000);
                        this.timeToplay = setInterval(() => {
                            this.showplay = window.g_playObj.pause;
                            this.videotime = window.g_playObj.duration; //当前视频总时长
                            this.palytime = window.g_playObj.timestamp;
                            this.nowIndex = Number(window.g_playObj.speed) + 3;
                        }, 1000);
                        document.addEventListener("keydown", this.keycodevent, true);
                    }, 1000);
                } else {
                    document.removeEventListener("keydown", this.keycodevent, true);
                    clearInterval(this.timeToplay);
                    OnExit();
                    CloseVodPlayer();
                    document.title = document.title.split(".")[0];
                    this.showplayTime = false;
                    this.palytime = 0; //当前播放时间
                    this.videotime = 0; //总时长
                    this.videostartime = 0; //
                    this.isfullscreen = false
                    this.fulltitle = '全屏播放'
                }
            },
            //当前播放时间以及进度条的长度
            palytime(val) {
                if (val != 0) {
                    if (Number(val) <= Number(this.videotime)) {
                        var percent = (val / this.videotime) * 100 + "%";
                        this.$refs.playpro.style.width = percent;
                    } else {
                        val = this.videotime;
                        this.$refs.playpro.style.width = 0;
                    }
                } else {
                    this.$refs.playpro.style.width = 0;
                }
            }
        },
        methods: {
            ...mapMutations(["setshowplayvideo"]),
            keycodevent() {
                var key = window.event.keyCode;
                //左右
                if (key == 39) {
                    this.fastframe();
                }
                if (key == 37) {
                    this.retreatframe();
                }
                //上下
                if (key == 38) {
                    this.playprev();
                }
                if (key == 40) {
                    this.playnext();
                }
                //空格
                if (key == 32) {
                    if (this.showplay == "true") {
                        OnPause("false");
                    } else {
                        OnPause("true");
                    }
                }
            },
            //获取视频列表
            //参数是是否自动播放
            getlist(play) {
                this.playIndex = -1
                let userId = this.$storage.getSession("userInfo").userId;
                let data = {
                    fileName: "",
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    deviceId: this.deviceUuid,
                    caseUuid: this.caseUuid,
                    submiterId: userId,
                    orderBy: "upload_time",
                    orderType: "desc",
                    infoKind: 0
                };
                getvideolist(data).then(res => {
                    this.videoList = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                    this.pages = res.data.data.pages;
                    if (play == "next") {
                        this.playCVideo(0, this.videoList[0]);
                    } else if (play == "prev") {
                        let index = this.videoList.length - 1;
                        this.playCVideo(index, this.videoList[index]);
                    }
                    let index = _.findIndex(this.videoList, item => {
                        return item.fileUuid == this.playrowObj.fileUuid;
                    });
                    if (index != -1) {
                        this.playIndex = index;
                    }
                });
            },
            handleSizeChange(val) {
                this.playIndex = null;
                this.currentPage = 1;
                this.pageSize = val;
                this.getlist();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.playIndex = null;
                this.getlist();
            },
            //播放视频
            playCVideo(index, row) {
                this.$refs.playpro.style.width = 0;
                this.showplayTime = true;
                this.videostartime = new Date(row.startTime).getTime();
                this.playIndex = index;
                this.playrowObj = row;
                if (row.status == 3 || row.status == 4) {
                    this.commonCtoPlay(this.videoList, index, "idUrl");
                    OnPlay(row.deviceId, "");
                } else if (row.deviceType == 0) {
                    OnStopAll(-1);
                    this.$notify({
                        type: "warning",
                        message: "格式不支持！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else if (row.status == 5) {
                    OnStopAll(-1);
                    this.$notify({
                        type: "warning",
                        message: "解析失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    OnStopAll(-1);
                    this.$notify({
                        type: "warning",
                        message: "正在解析中！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
            },
            //跳播
            jumpon(e) {
                /*1.获取当前鼠标相对于父元素的left值--偏移值*/
                var offset = e.offsetX;
                // /*2.计算偏移值相对总父元素总宽度的比例*/
                var percent = offset / this.$refs.jumpon.clientWidth;
                /*3.计算这个位置对应的视频进度值*/
                this.palytime = parseInt(percent * this.videotime);
                OnSeek(this.palytime);
            },
            //快进一帧
            fastframe() {
                if (this.nowIndex == 3) {
                    OnSetup(1);
                } else {
                    OnSpeed(0);
                    setTimeout(() => {
                        OnSetup(1);
                    }, 100);
                }
            },
            //快退一帧
            retreatframe() {
                if (this.nowIndex == 3) {
                    OnSetup(-1);
                } else {
                    OnSpeed(0);
                    setTimeout(() => {
                        OnSetup(-1);
                    }, 100);
                }
            },
            //改变播放进度
            playstep(item, i) {
                this.nowIndex = i;
                OnSpeed(item);
            },
            //快进
            gofast() {
                this.nowIndex++;
                if (this.nowIndex <= 5) {
                    OnSpeed(this.nowIndex - 3);
                } else if (this.nowIndex == 6) {
                    OnSpeed(this.nowIndex - 3);
                } else if (this.nowIndex > 6) {
                    this.nowIndex = 6;
                    OnSpeed(3);
                }
            },
            //快退
            goretreat() {
                this.nowIndex--;
                if (this.nowIndex > 0) {
                    OnSpeed(this.nowIndex - 3);
                } else if (this.nowIndex == 0) {
                    OnSpeed(this.nowIndex - 3);
                } else if (this.nowIndex < 0) {
                    this.nowIndex = 0;
                    OnSpeed(-3);
                }
            },
            //全屏
            fullscreen(){
                this.isfullscreen = !this.isfullscreen
                let dvis = document.getElementById('rightplay')
                if(this.isfullscreen){
                    this.fulltitle = '退出全屏'
                    rightplay.style.width = '129%';
                    rightplay.style.height = '134%';
                    rightplay.style.top = '-.42rem';
                    rightplay.style.right = '-1px';
                }else{
                    this.fulltitle = '全屏播放'
                    rightplay.style.width = '70%';
                    rightplay.style.height = "100%";
                    rightplay.style.top = '0';
                    rightplay.style.right = '-1px';
                }
                setTimeout(()=>{
                    OnChageWindowSize()
                },10)
            },
            //导出图片
            cutimgtocup() {
                if (this.playrowObj.status == 3 || this.playrowObj.status == 4) {
                    cutImg();
                } else {
                    this.$notify({
                        type: "warning",
                        message: "暂无画面！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            },
            //导出视频
            cutcutvideotocup() {
                if (this.playrowObj.status == 3 || this.playrowObj.status == 4) {
                    cutvideo();
                } else {
                    this.$notify({
                        type: "warning",
                        message: "暂无画面！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            },
            //播放下一个
            playnext() {
                //如果当前索引小于总条数则直接++
                //否则则进入分页判断
                let index = this.playIndex + 1;
                if (index <= this.videoList.length - 1) {
                    this.playCVideo(index, this.videoList[index]);
                } else {
                    if (this.currentPage < this.pages) {
                        this.currentPage++;
                        this.getlist("next");
                    }
                }
            },
            //播放上一个
            playprev() {
                let index = this.playIndex - 1;
                if (index >= 0) {
                    this.playCVideo(index, this.videoList[index]);
                }else if(index <= -2){
                    this.playCVideo(0, this.videoList[0]);
                } else {
                    if (this.currentPage > 1) {
                        this.currentPage--;
                        this.getlist("prev");
                    }
                }
            }
        },
        destroyed() {}
    };
</script>

<style scoped>
    @import url("../../../assets/css/animate.css");

    .palyMain {
        font-size: 0.12rem;
        transition: all 1s;
    }

    .center {
        font-size: 0.14rem;
        font-weight: 700;
        color: #4099e4;
        line-height: 0.3rem;
        text-align: center;
    }

    .leftlist {
        width: 30%;
        height: 100%;
        float: left;
        padding: 0 0.1rem;
        padding-left: 0.2rem;
        border-right: 1px solid #275280;
        background-color: rgba(16, 35, 56, 0.5);
        position: relative;
        overflow: hidden;
    }

    .hideplay {
        position: absolute;
        top: 50%;
        transform: translateY(-100%);
        left: -0.2rem;
        width: 0.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        border: 1px solid #275280;
        border-radius: 0.15rem;
        cursor: pointer;
        text-align: right;
        padding-right: 0.05rem;
    }

    .hideplay span {
        text-align: center;
    }

    .rightplay {
        position: absolute;
        top: 0;
        right: 0;
        width: 70%;
        height: 100%;
        background-color: rgba(16, 35, 56, 0.5);
    }

    .palyactive {
        color: #4099e4;
    }

    .red,
    .blue {
        color: red;
    }

    .fileinfo {
        display: flex;
        justify-content: space-around;
        line-height: 0.3rem;
    }

    .listul {
        height: calc(100% - 1.3rem);
        overflow: auto;
    }

    .listul li {
        cursor: pointer;
        height: 0.3rem;
        line-height: 0.3rem;
        border-bottom: 2px solid rgba(62, 62, 62, 0.32);
    }

    .listul li span {
        float: left;
        width: 49%;
        line-height: 0.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }

    .el-pagination {
        margin-top: 0.1rem;
    }

    .animated {
        animation-direction: 2s;
        animation-delay: 0.5s;
    }

    .righttop {
        width: 100%;
        height: calc(100% - 0.5rem);
        /* background-color: rgba(16, 35, 56, 0.5); */
        border: 1px solid rgba(15, 44, 79, 0.5);
        position: relative;
    }

    .rightbom {
        width: 100%;
        height: 0.5rem;
    }

    .palyer {
        width: 100%;
        height: 96.5%;
    }

    .progress {
        width: calc(100% - 2.7rem);
        height: 0.05rem;
        background-color: #fff;
        position: absolute;
        left: 0.1rem;
        bottom: 0.13rem;
        border-radius: 5px;
    }

    .progress .timespan {
        position: absolute;
        top: -4px;
        font-size: 0.12rem;
        right: -2.5rem;
    }

    .progress p {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        opacity: 0;
        border-radius: 4px;
    }

    .progress b {
        position: absolute;
        height: 0.05rem;
        background-color: #99c9fa;
        border-radius: 5px;
        z-index: 2;
    }

    .progress i {
        position: absolute;
        width: 400px;
        height: 0.1rem;
        /* background-color: green; */
        border-radius: 5px;
    }

    /* 按钮排版 */
    .funcBtn {
        height: 100%;
    }

    .funcBtn li {
        float: left;
        height: 100%;
        cursor: pointer;
    }

    .funcBtn li:nth-child(1) {
        width: 0.5rem;
    }

    .funcBtn li:nth-child(1) img {
        width: 100%;
        height: 100%;
    }

    .funcBtn li:nth-child(2) {
        width: 30%;
        margin: 0 0.1rem;
        text-align: center;
        font-size: 0.14rem;
        line-height: 0.5rem;
    }

    .funcBtn li:nth-child(2) img {
        margin-right: 0.1rem;
        vertical-align: middle;
        padding: 0 0.1rem;
    }

    .funcBtn li:nth-child(3) {
        width: 32%;
        height: 100%;
        padding: 0 0.1rem;
        border-left: 1px solid #464646;
        user-select: none;
    }

    .imgoperate img {
        float: left;
        width: .45rem;
        height: 75%;
        margin-top: 0.05rem;
        margin-right: 0.1rem;
    }

    .imgoperate div {
        display: inline-block;
        margin-left: 4%;
        width: 76%;
        border: 2px solid #4e4e4e;
        position: relative;
        margin-top: 0.35rem;
    }

    .imgoperate div span {
        position: absolute;
        width: 0.15rem;
        height: 0.15rem;
        border-radius: 50%;
        top: -0.07rem;
        cursor: pointer;
        background-color: #fff;
    }

    .imgoperate span b {
        position: absolute;
        top: -0.25rem;
        width: 0.25rem;
        left: 0rem;
    }

    .imgoperate div span:nth-child(1) {
        left: -0.07rem;
    }

    .imgoperate div span:nth-child(2) {
        left: 16.66%;
    }

    .imgoperate div span:nth-child(3) {
        left: 33.32%;
    }

    .imgoperate div span:nth-child(4) {
        left: 49.98%;
    }

    .imgoperate div span:nth-child(5) {
        left: 66.64%;
    }

    .imgoperate div span:nth-child(6) {
        left: 83.3%;
    }

    .imgoperate div span:nth-child(7) {
        left: 99.96%;
    }

    .funcBtn li:nth-child(4),
    .funcBtn li:nth-child(5),
    .funcBtn li:nth-child(6) {
        margin-left: 0.3rem;
        padding-top: 0.05rem;
    }

    .funcBtn li:nth-child(4) p,
    .funcBtn li:nth-child(5) p,
    .funcBtn li:nth-child(6) p {
        font-size: 0.25rem;
        display: block;
        text-align: center;
    }

    .Coloractives {
        color: #4099e4 !important;
    }

    .ONactives {
        background-color: #4099e4 !important;
    }

    @media (max-width:1440px){
        .progress {
            width: calc(100% - 4rem);
        }
         .progress .timespan {
            right: -3.5rem;
        }
        .funcBtn li:nth-child(2) img {
            margin-right: 0;
        }
    }
</style>
