/*
 * @Author: your name
 * @Date: 2020-11-26 17:08:04
 * @LastEditTime : 2020-12-28 10:38:17
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\mixins\work-lable\index.js
 */
// 进入标记模式准备
const mixins = {
    data() {
        return {
            jghObj: {}, //  传给java的结构化信息对象
            splitPicUrl: '', // 截取的目标小图
        }
    },
    methods: {
        // 获取子组件的
        picxAndpicy(picxAndpicy) {
            this.jghObj.point = picxAndpicy
        },

        workLableEmit(type, arr) {
            this.jghObj.attrs = arr
            this.jghObj.type = type
        },
        openSignHandler(id) {
            if (this.videoInfo) { // 判断播放时是否点击播放了
                if (this.videoInfo.fileUuid == undefined && this.retrieveVisible) {
                    this.$notify({
                        type: "warning",
                        message: "请播放视频！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
            }
            if (document.getElementById('idUrl')) { // 天网未点击播放的判断
                if (document.getElementById('idUrl').value == '' || document.getElementById('idUrl').value == null) {
                    this.$notify({
                        type: 'warning',
                        message: '请播放视频再进行寻迹追踪',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                }
            }
            // if (this.showplay != undefined) {
            //     if (this.showplay == 'false') { // 离线
            //         this.$notify({
            //             type: "warning",
            //             message: "请暂停视频再进行寻迹追踪",
            //             position: "bottom-right",
            //             duration: 3000
            //         });
            //         return;
            //     }
            // } else if (this.pause != undefined) {
            //     if (this.pause == 'false') { // 结构化
            //         this.$notify({
            //             type: "warning",
            //             message: "请暂停视频再进行寻迹追踪",
            //             position: "bottom-right",
            //             duration: 3000
            //         });
            //         return;
            //     }
            // } else if (this.g_play.pause != undefined) {
            //     if (this.g_play.pause == 'false') { // 检索
            //         this.$notify({
            //             type: "warning",
            //             message: "请暂停视频再进行寻迹追踪",
            //             position: "bottom-right",
            //             duration: 3000
            //         });
            //         return;
            //     }
            // }
            //   window.imgurl = undefined
            sessionStorage.setItem('imgurl', '');
            this.splitPicUrl = ''
            let box = document.getElementById(id)
            // 获取截图弹层的偏移位置
            this.propLeft = box.getBoundingClientRect().left + 'px'
            this.propTop = box.getBoundingClientRect().top + 'px'
            // 执行截图方法
            if (this.isonline) {
                OnHisSnapshot(); //执行C++截图的方法
                OnPauseHistory('1') // 暂停
                document.title = document.title.split(".")[0] + '.';
            } else {
                if (this.jiansuo) {
                    OnCasePause('true');
                    OnHide()
                    OnTakeVideoSnapshot(); //执行C++截图的方法
                } else {
                    document.title = document.title.split(".")[0] + '.';
                    OnPause('true')
                    OnvideoHide()
                    // OnPlayHide('false');
                    OnTakeVideoSnapshot(); //执行C++截图的方法
                }
            }
            // 获取视频和图片
            this.$nextTick(() => {
                let times = setInterval(() => {
                    if (sessionStorage.getItem('imgurl') != undefined && sessionStorage.getItem('imgurl').length > 20 && sessionStorage.getItem('imgurl').indexOf('.jpg') != -1) {
                        clearInterval(times)
                        this.startSing = false
                        this.jghObj.deviceId = sessionStorage.getItem('imgurl').split('&')[0].split('=')[1].length > 5 ? sessionStorage.getItem('imgurl').split('&')[0].split('=')[1] : null
                        this.jghObj.bigPic = sessionStorage.getItem('imgurl').split('?')[0]
                        // 结构化信息标识  1是人   4是骑车人   2是车
                        this.jghObj.relativeTime = sessionStorage.getItem('imgurl').split('&')[1].split('=')[1] // 相对时间
                        this.jghObj.offset = Number(this.deviceInfo.offset == undefined ? 0 : this.deviceInfo.offset) // 结对时间

                        if (this.isonline) {
                            this.jghObj.startTime = this.$store.state.lableBeginTime
                        } else {
                            if (typeof (this.videoretriInfo.startTime) == 'number') {
                                this.jghObj.startTime = this.videoretriInfo.videoStartTime
                            } else {
                                if (this.videoretriInfo.startTime == null) {
                                    this.jghObj.startTime = this.videoretriInfo.fileStartTime
                                } else {
                                    this.jghObj.startTime = this.videoretriInfo.startTime
                                };
                            }
                        }
                        // 获取截图弹层的img地址
                        this.splitPicUrl = sessionStorage.getItem('imgurl').split('?')[0]
                        console.log(this.splitPicUrl, 'this.splitPicUrl-------------');
                        // 获取截图弹层的宽高
                        this.propWidth = window.workLableSize.w + 'px'
                        this.propHeight = window.workLableSize.h + 'px'
                        this.workLlable = true
                    } else if (sessionStorage.getItem('imgurl') == -1) {
                        if (this.isonline) {
                            this.$notify({
                                type: "warning",
                                message: "截图失败，请重新截图",
                                position: "bottom-right",
                                duration: 3000
                            });
                            document.title = document.title.split(".")[0] + "....";
                            this.workLlable = false;
                            OnPauseHistory("0");
                            clearInterval(times)
                        }
                    }
                }, 200);



                //定义请求获取当前标注10S小视频的服务变量
                let timeVideo
                //每次先清除定时器
                clearInterval(timeVideo)
                //定时向C++发送请求，获取值
                timeVideo = setInterval(() => {
                    if (this.$route.path == '/videoCombat/addcasetwo' || this.$route.path == '/casestudy/caseInfomanage/addcasetwo') {
                        if (this.isonline) {
                            OngetUrls()
                        } else {
                            OngetUrl()
                        }
                    }
                    if (!this.$commons.isEmpty(sessionStorage.getItem('Imgseek'))) {
                        if (sessionStorage.getItem('Imgseek').length < 15 && sessionStorage.getItem('Imgseek').indexOf('.flv') == -1) {
                            this.jghObj.videoUrl = ''
                        } else {
                            this.jghObj.videoUrl = sessionStorage.getItem('Imgseek').slice(4);
                            clearInterval(timeVideo)
                        }
                    }
                }, 300)
            })
        },

    },

}
export default mixins
