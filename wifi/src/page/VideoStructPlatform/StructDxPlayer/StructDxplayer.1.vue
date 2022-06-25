<!--
 * @Author: chenxf
 * @Date: 2020-06-08 16:50:54
 * @LastEditTime : 2021-01-28 11:43:47
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\components\Dxplayer.vue
 * @ 由于时间改动问题巨大所以特保存上一版本逻辑，取名Dxplayer.1.vue
 -->
<template>
    <div>
        <div
            class="allpalyr"
            tabindex="0"
            id="dxplayerId"
            v-if="showStructDxplayer"
            v-show="showDomToplay"
        >
            <div class="playmian">
                <p class="palyTitle">
                    <span>视频播放</span>
                    <i class="el-icon-close" @click="closeplay"></i>
                </p>
                <div class="palyer">
                    <div id="idPlayer"></div>
                </div>
                <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
                <input id="idUrl" type="hidden" style="width:399px" value>
                <div class="palyImg">
                    <p
                        class="btnplayer el-icon-caret-left"
                        v-preventReClick="1000"
                        @click="prev($event)"
                        title="播放上一个"
                    ></p>
                    <p
                        class="btnplayer el-icon-caret-right"
                        v-preventReClick="1000"
                        @click="next($event)"
                        title="播放下一个"
                    ></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import CVideo from "../../../api/realvideo/C_video.js"; //C++播放器的方法

export default {
    data() {
        return {
            videotime: "",
            playtime: "",
            getVideotime: null,
            timeFrag: null,
            showhandword: false,
            timstoplay: null,
            showDomToplay: false, //展示播放器,
            showVideoStruct: "", // 格林森瞳结构化
            zkyStructureSwitch: "", // 中科院结构化
            jghObj: {},
            splitPicUrl: "",
            workLlable: false,
            propWidth: "",
            propHeight: "",
            propLeft: "",
            propTop: "",
            sexVideoDialod: false,
            allfeature: "", // 特征值
            trackList: [],
            childFerture: 1,
            structureList: {},
            beginData: "",
            endData: "",
            opeVideo: 1,
            startSing: true,
            pause: "false",
            paperUuid: "",
            ispause: "" //保存播放暂停的状态
        };
    },
    mixins: [CVideo],
    computed: {
        ...mapGetters([
            "showStructDxplayer",
            "DxplayerInfo" //播放器的当前对象
        ])
    },
    watch: {
        showStructDxplayer(val) {
            let times;
            OnExit();
            if (val) {
                document.title = document.title + '.'
                setTimeout(() => {
                    this.getTimeTobe(this.$route.query.caseUuid);
                }, 100);
                this.showDomToplay = true;
                this.$nextTick(() => {
                    g_change_page = 1;
                    OnInit();
                    this.timstoplay = setInterval(() => {
                        if (window.g_openplay) {
                            OnvideoHide();
                            clearInterval(this.timstoplay);
                            this.playvideo(this.DxplayerInfo);
                        }
                    }, 200);
                    setTimeout(() => {
                        clearInterval(this.timstoplay);
                    }, 3000);
                    this.ondown();
                });
            } else {
                this.setshowStructDxplayer(false);
                clearInterval(this.timstoplay);
                document.title = document.title.split(".")[0];
                OnChageWindowSize();
                OnvideoHide();
                OnExit();
                CloseVodPlayer();
            }
        }
    },
    components: {
        // handword: () => import("../page/videoCombat/fastFight/handworkLable"),
        // WorkLable: () => import("../components/work-lable/WorkLable.vue"),
        // searchPicture: () => import("../page/casestudy/addcaseInfo/MultiScreen.vue")
    },
    methods: {
        ...mapMutations([
            "setshowStructDxplayer", //设置是否打开播放器的页面
            "setisopenOffVideo" //设置播放器是否打开
        ]),
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
                        this.beginData = res.data.data.startTime;
                        this.endData = res.data.data.endTime;
                    }
                });
        },
        ondown() {
            let _this = this;
            document.onkeydown = function(e) {
                var key = window.event.keyCode;
                if (key == 39 && _this.showStructDxplayer) {
                    _this.$emit("childybynext", _this.DxplayerInfo.playtype);
                }
                if (key == 37 && _this.showStructDxplayer) {
                    _this.$emit("childybyprev", _this.DxplayerInfo.playtype);
                }
            };
        },
        //播放上一个视频，
        prev(e) {
            if (!e.target.disabled) {
                this.$emit("childybyprev", this.DxplayerInfo.playtype);
            }
        },
        //播放下一个视频
        next(e) {
            if (!e.target.disabled) {
                this.$emit("childybynext", this.DxplayerInfo.playtype);
            }
        },
        cccccc() {
            alert(432234234);
        },

        // 播放
        pausetrue() {
            this.startSing = true;
            this.workLlable = false;
            OnvideoShow();
            OnPause("false"); //播放
        },
        //暂停
        pausefalse() {
            OnPause("true");
        },
        closeplay() {
            this.startSing = true; // 默认关闭页面显示寻迹追踪按钮
            this.workLlable = false;
            clearInterval(this.timstoplay);
            this.setshowStructDxplayer(false);
            OnChageWindowSize();
            OnvideoHide();
            OnExit();
            CloseVodPlayer();
            this.showDomToplay = false;
            window.g_openplay = false;
            clearInterval(window.g_interval);
            clearInterval(this.getVideotime);
            clearInterval(this.timeFrag);
        },
        playvideo(row) {
            this.setisopenOffVideo(true);
            clearInterval(this.timeFrag);
            clearInterval(this.getVideotime);
            this.commonCtoPlay([row], 0, "idUrl");
            setTimeout(() => {
                OnPlay(row.deviceUuid, row.pt);
                OnPause("false");
            }, 600);
            this.getVideotime = setInterval(() => {
                this.videotime = window.g_playObj.duration; //总时长
                this.playtime = window.g_playObj.timestamp; //当前时间
                this.pause = window.g_playObj.pause;
            }, 200);
            setTimeout(() => {
                OnPause("false");
                clearInterval(this.timeFrag);
                //文件开始时长
                let startTime = Math.floor(row.appearTime / 1000);
                let endTime = Math.ceil(row.disappearTime / 1000);
                let newStartTime = startTime - 5;
                let newEndTime = endTime + 5;
                let flag = false;
                if (endTime - startTime <= 10 || endTime == startTime) {
                    //文件加减5之后的时长
                    if (startTime <= 5) {
                        //如果目标出现时间小于第3秒，从第0秒开始放
                        OnSeek(startTime);
                        newEndTime += 5;
                    } else {
                        //如果目标出现在最后4秒或者目标出现在中间
                        if (newEndTime >= this.videotime) {
                            OnSeek(startTime - 10);
                        } else {
                            OnSeek(startTime - 5);
                        }
                    }
                    flag = true;
                } else {
                    OnSeek(startTime);
                    flag = false;
                }
                setTimeout(() => {
                    OnvideoShow();
                }, 100);
                this.showDomToplay = true;

                this.timeFrag = setInterval(() => {
                    //通过定时器一直刷新当前播放时间
                    //flag== true 表示是开始结束时长误差小于10或者相等
                    if (flag) {
                        if (startTime <= 5 && this.playtime >= newEndTime) {
                            //如果当前播放时间大于等于4秒，则从头开始放
                            OnPause("false");
                            OnSeek(startTime);
                        } else if (
                            newEndTime > this.videotime &&
                            (this.playtime == this.videotime ||
                                this.playtime == 0 ||
                                this.playtime == 1) &&
                            this.videotime > 0
                        ) {
                            //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                            OnPause("false");
                            OnSeek(startTime - 10);
                        } else {
                            //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
                            //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
                            if (this.playtime >= newEndTime) {
                                OnPause("false");
                                OnSeek(startTime - 5);
                            }
                        }
                    } else {
                        if (this.playtime >= endTime) {
                            OnSeek(startTime);
                        }
                    }
                }, 1000);
            }, 700);
        }
    }
};
</script>

<style scoped>
.allpalyr {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 3333;
}
.playmian {
    position: absolute;
    width: 9rem;
    height: 5.1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: #113254;
}
.palyTitle {
    display: flex;
    justify-content: space-between;
    background: rgba(20, 57, 96, 0.33);
    border: 1px solid rgba(15, 44, 79, 0.8);
    line-height: 0.3rem;
    color: #99c9fa;
    font-size: 0.14rem;
    padding: 0 0.2rem;
}
.palyTitle i {
    cursor: pointer;
    margin-top: 0.09rem;
}
.palyImg {
    height: 0.5rem;
}
.palyImg .btnplayer {
    width: 0.5rem;
    height: 100%;
    position: relative;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.25rem;
    cursor: pointer;
}

.palyer {
    width: 100%;
    height: 4.3rem;
    padding: 0.05rem 0.2rem;
}
.palyer div {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(38, 85, 134, 0.32);
}
.find-sing {
    width: 1rem;
    float: left;
}
.find-sing span {
    display: block;
    font-size: 12px;
    color: #7eabd9;
}
.find-sing1 span {
    color: #b1b1b4;
}
.find-sing img {
    width: 0.25rem;
    height: 0.25rem;
    margin: 0 0.1rem;
    margin-top: 0.02rem;
    background-size: 80% 80%;
    cursor: pointer;
}
.handlable {
    display: block;
    width: 0.32rem;
    height: 0.28rem;
    margin: 0 auto;
    margin-top: 0.03rem;
    background: url("../../../assets/images/videoNewImg/hanldle.png") no-repeat;
    background-size: 80% 80%;
}
</style>
