import {
    mapMutations
} from 'vuex'
const mixins = {
    data: function () {
        return {
            dialogVisible: false,
            imgshow: true,
            currentPage: 1,
            pageSize: 12,
            totalCount: 0,
            taskUuid: '', //案件ID
            videoList: [], //列表
            orderBy: '',
            orderType: '',
            showvideoPlay: false,
            isHand: false,
            timeId: null,
            thisTime: null,
            deviceId: '', //设备ID
            disablegande: false,
            caseUuid: '',
            showJudeg: false,
            progress: '0',
            size: '',
            clarity: '',
            type: '',
            fileName: '',
            filestatus: '',
            videoIndex: null,
            timeTwo: null,
            alltime: 0, //总时间
            playtime: 0, //当前播放视频
            videoImg: [],
            offset: 0, //从哪一个开始
            limit: 1000, //一个请求的条数
            searchList: {},
            videoResult: null, //请求检索结果的定时器
            taskprogress: null, //任务进度的检索进度
            resultList: [], //单个检索任务请求的结果
            timeresult: [], //请求C++的视频进度滞后存储的数组
            timeresultlength: 0,
            taskName: '',
            allNum: 0, //视频总数
            codinTime: null,
            videoInfo: {}, //当前播放文件的信息
            loading: null,
            cTimesResult: [], // C++ 返回的检索结果
            taskObj: '', //当前任务对象
            tasklist: [], //当前点位下面的所有的数组
            checkorder: false, //切换当前是否顺序播放
            disorder: false,
            dialogDownLoad: false, //打开下载按钮
            checkRadio1: 1, //下载的选项
            beginData: '',
            endData: '',
            minDownImg: '',
            maxDownImg: '',
            thumbnail: false, //是否合并视频的开关
            Checkd: [], //当前选中的数组
            showchecked: false,
            groundIds: [], //当前选中的数组
            disableDwonLoad: false, //禁用下载
            eventStopplay: null,
            detailUuid: '',
            g_play: {}, //播放器对象
            g_playTime: null, //播放器
            sexVideoDialod: false,
            allfeature: "", // 特征值
            trackList: [],
            childFerture: 1,
            structureList: {},
            jghObj: {},
            opeVideo: 2,
            startSing: true,
            showVideoStruct: '', // 格林森瞳结构化
            zkyStructureSwitch: '', // 中科院结构化
            filevideoList: [],
            paperUuid: '',
            colorsearchtype: 0, //当前任务返回的色彩检索类型
            colorarea: "", //色块的图片地址
            aaacolor: [],
            retrievalTime: {}
        }
    },
    filters: {
        retrievalTime(val) {
            if (val.offset == undefined) {
                val.offset = 0;
            }
            let nowplaytime = new Date(val.videoStartTime).getTime();
            // let alltime = Number(nowplaytime) + Number(val.startTime) + Number(val.offset * 1000)1
            let alltime = Number(nowplaytime) + Number(val.frameTime) + Number(val.offset * 1000)
            let date = new Date(alltime)
            let YY = date.getFullYear();
            let MM = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
        },
        status(val) {
            if (val == 1) {
                return '执行中';
            } else if (val == 2) {
                return '暂停';
            } else if (val == 3) {
                return '排队';
            } else if (val == 4) {
                return '获取视频流';
            } else if (val == 5 || val == 6) {
                return '文件处理中';
            } else if (val == 9) {
                return '停止';
            } else if (val == 0) {
                return '已完成'
            } else if (val == 10) {
                return '失败'
            }
        },
        retrimodel(val) {
            if (val == 1) {
                val = '区域'
            } else if (val == 2) {
                val = '跨线'
            } else if (val == 3) {
                val = '方向'
            }
            return val
        },
        targetsize(val) {
            if (val == 1) {
                val = '大'
            } else if (val == 2) {
                val = '中'

            } else if (val == 3) {
                val = '小'
            }
            return val
        },
        targetqxd(val) {
            if (val == 1) {
                val = '清晰'
            } else if (val == 2) {
                val = '较清晰'
            } else if (val == 3) {
                val = '模糊'
            } else if (val == 4) {
                val = '较模糊'
            }
            return val
        },
        names(val) {
            var index = val.lastIndexOf("\/");
            val = val.substring(index + 1, val.length);
            return val
        }

    },

    methods: {
        ...mapMutations([
            'setsearchImgBtn', // 以图搜图存储嫌疑人目标
            'setvideoretriInfo',
            // 'setshowjudged',  //设置案件是否是协同
            'setisopenOffVideo' //是否打开播放器
        ]),
        //关闭模态框
        closeDia() {
            window.axiosProArr.forEach((e, i) => {
                if (sessionStorage.getItem('isUploadTrue') != 1) {
                    e.cancle();
                    delete window.axiosProArr[i]
                }
            });

            if (this.bigfullScreen) {
                this.$nextTick(() => {
                    this.bigfullScreen = false
                    window.isFullScreen = false
                    this.$refs.dialogReter.$el.querySelector('.el-dialog').style.height = 'auto'
                    this.$refs.dialogReter.$el.querySelector('.el-dialog').style.width = window.nowWidth + 'px'
                    this.$refs.dialogReter.$el.querySelector('.el-dialog').style.marginTop = window.nowMarginTop
                    document.getElementsByClassName('detailRetervals')[1].childNodes[0].childNodes[1].style.height = '7rem';
                })
            }
            this.taskObj = ''
            this.$emit("childByDetail", false);
            OnHide();
            OnCaseExit();
            CloseVodPlayer();
            document.title = document.title.split('.')[0]
            this.clearInfoToChange();
            clearInterval(this.g_playTime)
        },
        //执行打开模态框的方法
        openDia() {
            this.detailUuid = this.proptaskUuid
            this.loading = this.$loading({
                // target:'.el-dialog__body',
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "加载中"
            });
            this.offset = 0
            document.title = document.title + '.'
            this.$store.state.diffVideo = true
            this.$nextTick(() => {
                this.caseUuid = this.$route.query.caseUuid;
                OnCaseInit()
                this.getTasklistTodevice(this.deviceInfo.deviceUuid)
                this.getAllTask(this.detailUuid);
            })
            this.g_playTime = setInterval(() => {
                this.g_play = window.g_caseObj
            }, 400)
        },
        //切换任务的时候清空之前的所有数据
        clearInfoToChange() {
            this.eventStopplay = null;
            this.disableDwonLoad = false;
            this.showchecked = false
            this.thumbnail = false
            this.groundIds = []
            this.Checkd = []
            this.timeresultlength = 0;
            this.cTimesResult = []
            this.timeresult = []
            this.videoList = []
            this.limit = 1000;
            this.totalCount = 0;
            this.pageSize = 12
            this.offset = 0;
            this.lableTime = ''
            this.videoIndex = null
            clearInterval(this.thisTime);
            clearInterval(this.timeId);
            clearInterval(this.timeTwo);
            clearInterval(window.g_interval);
            // clearInterval(this.videoResult);
            clearTimeout(this.videoResult)
            clearInterval(this.codinTime)
            clearInterval(this.taskprogress);
            this.showvideoPlay = false;
            this.setisopenOffVideo(false)
            this.$store.state.diffVideo = false
            this.currentPage = 1
        },
        // 跳转到以图搜图
        collecPictBtn(val) {
            this.setsearchImgBtn(val)
            this.dialogVisible = false // 检索详情关闭
            this.closePlay() // 关闭播放器
            this.$emit('childretrieval', false)
        },

        //请求当前任务的所有结果，参数taskUuid
        getAllTask(taskUuid) {
            this.searchCondition(taskUuid)
            this.gettaskProgress(taskUuid)
            this.searchResult(taskUuid)
            this.getfiles(taskUuid)
            this.taskprogress = setInterval(() => {
                this.gettaskProgress(taskUuid)
            }, 5000)
        },
        //获取当前点位下的所有任务信息
        getTasklistTodevice(id) {
            let data = {
                orderBy: 'commitTime',
                orderType: 'desc',
                commitUser: this.$storage.getSession("userInfo").userId,
                taskName: this.taskname,
                type: 0, //任务类型
                statusl: '', //任务状态
                begin: '',
                end: '',
                caseUuid: this.$route.query.caseUuid,
                deviceId: id,
                pageNum: 1,
                pageSize: 5000,
            };
            this.$http.get("vsas/task/new/list", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.tasklist = res.data.data.list
                    this.taskObj = this.detailUuid
                }
            });
        },
        //切换检索任务列表
        changeReterTask(id) {
            this.clearInfoToChange();
            this.detailUuid = id
            this.getAllTask(id)
        },
        // 获取检索结果列表
        searchResult(taskUuid) {
            let params = {
                limit: this.limit,
                offset: this.offset,
                taskUuid: taskUuid
            }
            this.$http.get('vsas/task/search/multiFile/retrieval', {
                params: params
            }).then(res => {
                this.loading.close()
                if (res.data.code == 200) {
                    clearTimeout(this.videoResult)
                    //动态去请求检索结果
                    this.videoResult = setTimeout(() => {
                        if (this.filestatus == 0) {
                            this.offset = Number(this.totalCount)
                            this.limit = 2000;
                        } else {
                            this.offset = Number(this.totalCount)
                            this.limit = 1000;
                        }
                        this.searchResult(taskUuid)
                    }, 1000)
                    if (res.data.data == null) {
                        this.resultList = []
                    } else {
                        this.resultList = res.data.data;
                        this.resultList.forEach(item => {
                            item.offset = this.deviceInfo.offset
                        });
                    }
                    //每次获取到的数据添加到新的数据中去
                    this.videoList = this.videoList.concat(this.resultList)
                    //判断数组的长度，关闭loading
                    if (this.videoList.length > 0 && this.loading) {
                        this.loading.close()
                    }
                    //对数组进行去重，如果接口请求特别慢的情况
                    let objList = {}
                    this.videoList = this.videoList.reduce((cur, next) => {
                        objList[next.retrievalId] ? '' : objList[next.retrievalId] = true && cur.push(next)
                        return cur
                    }, [])
                    this.totalCount = this.videoList.length
                    //往数组中添加对象，
                    this.Checkd = []
                    var obj = {}
                    if (this.videoList.length) {
                        for (let i = 0; i < this.videoList.length; i++) {
                            obj = {
                                state: false
                            }
                            this.Checkd.push(obj)
                        }
                    }
                    //因为定时器一直在刷新，
                    //通过当前选中的数组和刷新列表之后的数字做比较，如果相等就反选之前选中的值
                    if (this.groundIds.length) {
                        for (let i = 0; i < this.groundIds.length; i++) {
                            for (let j = 0; j < this.videoList.length; j++) {
                                if (this.groundIds[i] == this.videoList[j].retrievalId) {
                                    this.Checkd[j].state = true
                                }
                            }
                        }
                    }
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '获取失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                }
            }).catch(() => {
                this.loading.close()
            })
        },

        //播放视频
        //获取C++返回的当前时间以及是否转码完成
        getTransCodin(list) {
            let count = 0
            this.cTimesResult = []
            let url = sessionStorage.getItem("hdfsAgentAddr");
            for (let i = 0; i < list.length; i++) {
                let lastindex = list[i].fileSourcePath.lastIndexOf("/")
                let playvalue = list[i].fileSourcePath
                // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
                // 修改为非大数据架构
                playvalue = playvalue.slice(lastindex - 87, playvalue.length)
                playvalue = playvalue.replace('source', 'decode')
                let val = url + playvalue
                setTimeout(() => {
                    this.$http.post('/searchHisImg/TouchFile?file=' + val + '&fileuuid=' + list[i].fileUuid + '&deviceId=' + this.deviceId).then(res => {
                        if (res.data.code == 200) {
                            this.cTimesResult.push(res.data)
                        } else {
                            let data = {
                                duration: 0,
                                fileuuid: list[i].fileUuid,
                                attr: -1,
                                status: list[i].status
                            }
                            this.cTimesResult.push(data)
                        }
                        for (let i = 0; i < this.cTimesResult.length; i++) {
                            //通过attr判断当前视频是否转码完成，如果转码完成就把count++
                            //如果count等于视频的数量，则停止定时器刷新
                            if (this.cTimesResult[i].attr == 0) {
                                count++
                                if (count == this.cTimesResult.length) {
                                    clearInterval(this.codinTime)
                                }
                            }
                        }
                    })
                }, 10)
            }

        },
        //通过ID要获取当前检索的视频数量
        getfiles(taskUuid) {
            let data = {
                taskUuid: taskUuid
            }
            data = this.$qs.stringify(data)
            this.$http.post('/vsas/task/search/multiFile/files', data).then(res => {
                if (res.data.code == 200) {
                    let filelist = res.data.data
                    this.filevideoList = res.data.data
                    let statulist = []
                    for (let i = 0; i < filelist.length; i++) {
                        if (filelist[i].status == 4) {
                            let obj = {
                                duration: filelist[i].duration,
                                fileuuid: filelist[i].fileUuid,
                                attr: 0,
                                status: filelist[i].status
                            }
                            this.timeresult.push(obj)
                        } else {
                            this.disableDwonLoad = true
                            statulist.push(filelist[i])
                        }
                    }
                    this.timeresultlength = this.timeresult.length;
                    if (statulist.length) {
                        this.getTransCodin(statulist);
                        this.codinTime = setInterval(() => {
                            this.getTransCodin(statulist);
                        }, 40000)
                    }

                }
            })
        },
        // 检索条件查询接口
        searchCondition(taskUuid) {
            let data = {
                taskUuid: taskUuid
            }
            this.$http.get('vsas/task/search/rule', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    //当前案件是否是协同案件
                    // if(res.data.data.isSpecial == 1){
                    //   this.setshowjudged(true)
                    // }else{
                    //   this.setshowjudged(false)
                    // }
                    this.taskName = res.data.data.taskName
                    this.searchList = res.data.data.taskSearch
                    this.deviceId = res.data.data.taskSearch.deviceId
                    this.videoImg = res.data.data.taskSearch.snapUrl.split(',')
                    this.colorsearchtype = res.data.data.taskSearch.colorSearchType
                    if (res.data.data.taskSearch.enabledColor == 1) {
                        if (this.colorsearchtype == 0) {
                            this.colorarea = res.data.data.taskSearch.colorTraceUrl;
                            // let points = res.data.data.taskSearch.colorBlockPoints
                            // this.initColorImage(points)
                        } else if (this.colorsearchtype == 2) {
                            this.initTwoColorBlock(res.data.data.taskSearch)
                        }
                    }
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '获取失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                }
            })
        },
        initTwoColorBlock(res) {
            this.aaacolor = res.rgb.split("#")
        },
        initColorImage(point) {
            this.$nextTick(() => {
                let imgs = document.getElementById("colorImage");
                point = point.split(",")
                imgs.onload = (() => {
                    let imgBox = document.getElementById("colorArea"); //div大小
                    let leftTopX = point[0] //目标相对图片的横坐标
                    let leftTopY = point[1] //目标相对图片的纵坐标
                    let imgw = point[2]; //目标相对图片的宽度
                    let imgh = point[3]; //目标相对图片高度
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
                    imgs.style.width = imgs.naturalWidth / unit + "px";
                    imgs.style.height = imgs.naturalHeight / unit + "px";
                    imgs.style.top = -(leftTopY / unit) + posTop + "px";
                    imgs.style.left = -(leftTopX / unit) + posLeft + "px";
                })
                imgs.src = this.colorarea
            })
        },
        //获取当前检索任务的进度以及完成状态
        gettaskProgress(id) {
            this.$http.get("vsas/task/search/progress?taskUuid=" + id).then(res => {
                if (res.data.code == 200) {
                    this.progress = res.data.data.progress
                    this.filestatus = res.data.data.status
                    if (this.filestatus == 0) {
                        clearInterval(this.taskprogress)
                        this.getAllnum(id)
                    }
                }
            });
        },
        //获取当前检索有多少条总数
        getAllnum(id) {
            let data = {
                taskUuid: id
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/task/search/multiFile/retrieval/count', data).then(res => {
                if (res.data.code == 200) {
                    this.allNum = res.data.data
                }
            })
        },
        //暂停
        Onpass() {
            OnCasePause('true');
            this.imgshow = false
        },
        //播放
        OnPlays() {
            this.imgshow = true
            this.startSing = true
            OnShow()
            OnCasePause('false');
        },
        //关闭播放器

        closePlay() {
            this.startSing = true // 默认关闭页面显示寻迹追踪按钮
            this.workLlable = false
            this.checkorder = false
            this.showvideoPlay = false;
            this.setisopenOffVideo(false)
            this.$nextTick(() => {
                OnChageWindowsSize()
                OnHide();
                setTimeout(() => {
                    OnHide();
                }, 500)
            })
            OnCasePause(true)
            clearInterval(this.timeTwo);
            clearInterval(this.thisTime)
            clearInterval(this.timeId)
        },
        //单机模态框播放视频
        // 三个参数第一个标注当前目标出现的时间，当前目标的索引，以及当前目标的对象
        playVideos(e, val, index, item, type) {
            this.disorder = false
            this.eventStopplay = e
            this.paperUuid = item.fileUuid
            if (e.target.disabled) {
                return
            }
            if (type == 1) {
                this.setisopenOffVideo(true)
                this.setvideoretriInfo(item);
                clearInterval(this.timeTwo)
                clearInterval(this.timeId)
                clearInterval(this.thisTime)
                for (let i = 0; i < this.timeresult.length; i++) {
                    if (this.timeresult[i].status != 4 && item.fileUuid == this.timeresult[i].fileuuid && item.startTime > (this.timeresult[i].duration * 1000 + 999)) {
                        this.$notify({
                            type: 'warning',
                            message: '正在缓冲中',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        return
                    } else if (this.timeresult[i].status == 4 && item.fileUuid == this.timeresult[i].fileuuid && item.startTime > (this.timeresult[i].duration * 1000 + 999)) {
                        val = Number(this.timeresult[i].duration) * 1000
                    }
                }
                this.commonCtoPlay([item], 0, 'detailidUrl')

                let rulept = this.getpoints();
                setTimeout(() => {
                    OnCasePlay(this.searchList.deviceId, rulept);
                    this.timeTwo = setInterval(() => {
                        this.alltime = window.g_caseObj.duration
                        this.playtime = window.g_caseObj.timestamp
                    }, 200)
                    clearInterval(this.timeId)
                    this.videoIndex = index
                    this.imgshow = true
                    setTimeout(() => {
                        //目标出现时间
                        let frameTime = val
                        if (frameTime < 4000) {
                            OnCaseSeek(0)
                        } else {
                            OnCaseSeek(Math.floor(val / 1000) - 3)
                        }
                        frameTime = Math.floor(val / 1000)
                        this.showvideoPlay = true;
                        setTimeout(() => {
                            OnShow()
                        }, 300)
                        this.timeId = setInterval(() => {
                            //通过定时器一直刷新当前播放时间
                            //如果目标出现时间小于3s 则播放前面4S
                            if (frameTime <= 3 && this.playtime > frameTime + 3) {
                                OnCasePause('false');
                                this.imgshow = true
                                //如果当前播放时间大于等于3秒，则从头开始放
                                OnCaseSeek(0)
                                return
                            } else if ((this.alltime - frameTime <= 3) && ((this.playtime == this.alltime) || this.playtime == 0 || this.playtime == 1) && this.alltime > 0) {
                                OnCasePause('false');
                                //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                                OnCaseSeek(frameTime - 3)
                                this.imgshow = true
                                return
                            } else {
                                //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
                                // OnCaseSeek(frameTime - 3)
                                //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
                                // if (this.playtime > (frameTime + 3) || this.playtime < (frameTime - 3)) {
                                if (frameTime > 4 && this.playtime >= (frameTime + 3)) {
                                    OnCasePause('false');
                                    OnCaseSeek(frameTime - 3)
                                    this.imgshow = true
                                }
                                return
                            }
                        }, 1000)
                    }, 300)
                }, 100)
            } else if (type == 2) {
                clearInterval(this.thisTime)
                clearInterval(this.timeId)
                OnCaseSeek(this.playtime)
                let frameTime = Math.ceil(val / 1000)
                if (frameTime > this.alltime) {
                    frameTime = this.alltime
                }
                this.timeId = setInterval(() => {
                    //通过定时器一直刷新当前播放时间
                    //如果目标出现时间小于3s 则播放前面4S
                    if (frameTime <= 3 && this.playtime > frameTime + 3) {
                        this.imgshow = true
                        //如果当前播放时间大于等于4秒，则从头开始放
                        OnCaseSeek(0)
                    } else if (this.alltime - frameTime <= 4 && ((this.playtime == this.alltime) || this.playtime == 0 || this.playtime == 1) && this.alltime > 0) {
                        //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                        OnCaseSeek(frameTime - 3)
                        this.imgshow = true
                    } else {
                        //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
                        // OnCaseSeek(frameTime - 3)
                        //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
                        // if(this.playtime > (frameTime + 3) || (this.alltime > 0 && (this.playtime == 0 || this.playtime == 1))){
                        //     console.log(3333);
                        //     OnCaseSeek(frameTime - 3)
                        //     this.imgshow = true
                        // }
                        if (frameTime > 4 && this.playtime >= (frameTime + 3)) {
                            // OnCasePause('false');
                            OnCaseSeek(frameTime - 3)
                            this.imgshow = true
                        }
                    }
                }, 800)
            }

        },
        //10月21号新增接口
        //新增是否顺序播放开关，如果打开则视频从当前索引顺序播放，播放到最后一个的时候停止播放视频
        //否则是一直循环播放当前索引的视频
        orderPlay(a) {
            let rulept = this.getpoints();
            OnCaseSeek(this.playtime)
            clearInterval(this.thisTime)
            this.thisTime = setInterval(() => {
                if (this.playtime >= Math.ceil(this.videoList[a].entTime / 1000)) {
                    if (a > this.videoList.length - 1) {
                        console.log('进去1111');
                        a = 0
                        this.videoIndex = 0
                        this.currentPage = 1
                        this.commonCtoPlay([this.videoList[0]], 0, 'detailidUrl')
                        let rulept = this.getpoints();
                        OnCasePlay(this.searchList.deviceId, rulept);
                        // OnCaseSeek(Math.ceil(this.videoList[0].startTime / 1000))
                        // OnCasePause('true');
                        // this.imgshow = false
                        // clearInterval(this.thisTime)
                        // OnCaseStopAll(-1)
                    } else {
                        a++
                        this.videoIndex++
                        this.setvideoretriInfo(this.videoList[a]);
                        console.log('进去22222');
                        if (a != 1 && (a + 1) % this.pageSize == 1) {
                            this.currentPage++
                        }
                        this.videoIndex = this.videoIndex % 12
                        if (Math.floor(this.videoList[a].startTime / 1000) < Math.ceil(this.videoList[a - 1].entTime / 1000)) {
                            if (this.videoList[a].fileUuid != this.videoList[a - 1].fileUuid) {
                                this.commonCtoPlay(this.videoList, a, 'detailidUrl')
                                OnCasePlay(this.searchList.deviceId, rulept);
                                OnCaseSeek(Math.floor(this.videoList[a].startTime / 1000))
                            } else {
                                OnCaseSeek(Math.floor(this.videoList[a - 1].entTime / 1000))
                            }
                        } else {
                            OnCaseSeek(Math.floor(this.videoList[a].startTime / 1000))
                        }
                    }
                }
                if (a > this.videoList.length || (a >= (this.videoList.length - 1) && (this.playtime == 0 || this.playtime == 1))) {
                    a = 0
                    this.videoIndex = 0
                    this.currentPage = 1
                    this.commonCtoPlay([this.videoList[0]], 0, 'detailidUrl')
                    let rulept = this.getpoints();
                    OnCasePlay(this.searchList.deviceId, rulept);

                }
            }, 500)
        },
        //循环播放
        // circula(){
        //   this.setisopenOffVideo(true)
        //   clearInterval(this.timeTwo)
        //   clearInterval(this.timeId)
        //   clearInterval(this.thisTime)
        //   this.currentPage = 1;
        //   let rulept = this.getpoints();
        //   this.commonCtoPlay(this.videoList,0,'detailidUrl')
        //   // let lastindex =this.videoList[0].fileSourcePath.lastIndexOf("/")
        //   // let playvalue = this.videoList[0].fileSourcePath
        //   // let url = sessionStorage.getItem("hdfsAgentAddr");
        //   // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
        //   // playvalue = playvalue.replace('source', 'decode')
        //   // document.getElementById("detailidUrl").value = url + playvalue;
        //   setTimeout(()=>{
        //     OnCasePlay(this.searchList.deviceId, rulept);
        //     this.timeTwo = setInterval(()=>{
        //       this.alltime = window.g_caseObj.duration
        //       this.playtime = window.g_caseObj.timestamp
        //     },500)
        //     this.showvideoPlay = true
        //     clearInterval(this.timeId)
        //     clearInterval(this.thisTime)
        //     setTimeout(() => {
        //       OnShow()
        //       this.roundPlay(0)
        //       this.videoIndex = 0
        //       this.setvideoretriInfo(this.videoList[0]);
        //     }, 300);
        //   },200)

        // },
        //循环播放
        // roundPlay(a){
        //   let rulept = this.getpoints();
        //   OnCaseSeek(Math.floor(this.videoList[a].startTime/1000))
        //   this.thisTime = setInterval(()=>{
        //       if(this.playtime >= Math.floor(this.videoList[a].entTime/1000)){
        //
        //         if(a >= this.videoList.length - 1){
        //           this.currentPage = 1
        //           this.commonCtoPlay(this.videoList,0,'detailidUrl')
        //           OnCasePlay(this.searchList.deviceId, rulept);
        //           clearInterval(this.thisTime)
        //           OnCaseSpeed(0)
        //           this.roundPlay(0)
        //           this.videoIndex = 0
        //         }else{
        //           a++
        //           this.videoIndex ++
        //           this.setvideoretriInfo(this.videoList[a]);
        //           if(a != 1 && (a + 1) % this.pageSize == 1){
        //             this.currentPage++
        //           }
        //           this.videoIndex = this.videoIndex % 12
        //           if(Math.floor(this.videoList[a].startTime/1000) < Math.ceil(this.videoList[a-1].entTime/1000)){
        //             if(this.videoList[a].fileUuid != this.videoList[a-1].fileUuid){
        //               this.commonCtoPlay(this.videoList,a,'detailidUrl')
        //               OnCasePlay(this.searchList.deviceId, rulept);
        //               OnCaseSeek(Math.ceil(this.videoList[a].startTime/1000))
        //             }else{
        //               OnCaseSeek(Math.ceil(this.videoList[a-1].entTime/1000))
        //             }
        //           }
        //           else{
        //             OnCaseSeek(Math.floor(this.videoList[a].startTime/1000))
        //           }
        //         }
        //       }
        //       if(a > this.videoList.length){
        //         clearInterval(this.thisTime)
        //       }
        //   },500)
        // },
        //划线
        getpoints() {
            let rulept
            if (this.searchList.type == 1) {
                let firstTwo = this.searchList.points.split(',')
                if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                    rulept = '2-2-' + (firstTwo[2] - 4) + '-2-' + (firstTwo[2] - 4) + '-' + (firstTwo[7] - 4) + '-2-' + (firstTwo[7] - 4) + '-2-2'
                } else {
                    this.searchList.points = this.searchList.points + ',' + firstTwo[0] + ',' + firstTwo[1]
                    rulept = this.searchList.points.replace(/,/g, '-')
                }
            } else if (this.searchList.type == 2) {
                let firstTwo = this.searchList.points.split(',')
                if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                    rulept = '2-2-' + (firstTwo[2] - 4) + '-2-' + (firstTwo[2] - 4) + '-' + (firstTwo[7] - 4) + '-2-' + (firstTwo[7] - 4) + '-2-2'
                } else {
                    rulept = this.searchList.points.replace(/,/g, '-')
                }

            } else if (this.searchList.type == 3) {
                let firstTwo = this.searchList.points.split(',')
                if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                    rulept = '2-2-' + (firstTwo[2] - 4) + '-2-' + (firstTwo[2] - 4) + '-' + (firstTwo[7] - 4) + '-2-' + (firstTwo[7] - 4) + '-2-2'
                } else {
                    let a = 0
                    let b = 0
                    if (Number(firstTwo[0]) > Number(firstTwo[2])) {
                        a = Number(firstTwo[2]) + (Number(firstTwo[0]) - Number(firstTwo[2])) / 2
                    } else {
                        a = Number(firstTwo[0]) + (Number(firstTwo[2]) - Number(firstTwo[0])) / 2
                    }

                    if (Number(firstTwo[1]) > Number(firstTwo[3])) {
                        b = Number(firstTwo[3]) + (Number(firstTwo[1]) - Number(firstTwo[3])) / 2
                    } else {
                        b = Number(firstTwo[1]) + (Number(firstTwo[3]) - Number(firstTwo[1])) / 2
                    }
                    let postPt = getPos(Math.ceil(Number(a)), Math.ceil(Number(b)), Math.ceil(Number(firstTwo[4])), Math.ceil(Number(firstTwo[5])))
                    rulept = Math.ceil(firstTwo[0]) + '-' + Math.ceil(firstTwo[1]) + '-' + Math.ceil(firstTwo[2]) + '-' + Math.ceil(firstTwo[3]) +
                        '-' + Math.ceil(a) + '-' + Math.ceil(b) + '-' + Math.ceil(firstTwo[4]) + '-' + Math.ceil(firstTwo[5]) + '-' + Math.ceil(postPt.ex) +
                        '-' + Math.ceil(postPt.ey) + '-' + Math.ceil(firstTwo[4]) + '-' + Math.ceil(firstTwo[5]) + '-' + Math.ceil(postPt.fx) + '-' + Math.ceil(postPt.fy)
                }
            }
            return rulept
        },
        //监听页数的改变
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.videoIndex = null
        },
        //打开手工标注功能
        OpenHand() {
            this.getSignDataHandler();
            this.startSing = true
            this.workLlable = false
            OnCasePause('true'); // 暂停
            OnCaseSnapshot(); //请求截图
            sessionStorage.setItem('imgurl', '')
            OnPlayCaseHide('false');
            OnPlayCaseHide('false');
            OnPlayCaseHide('false');
            // this.Onpass() //打开手工标注调播放器暂停方法
            OnCasePause('true');
            this.$nextTick(() => {
                let times = setInterval(() => {
                    if (window.imgurl != undefined && window.imgurl.length > 20 && window.imgurl.indexOf('.jpg') != -1) {
                        OnHide(); //播放器隐藏
                        this.isHand = true
                        document.title = document.title.split(".")[0];
                        clearInterval(times)
                    } else {
                        setTimeout(() => {
                            clearInterval(times)
                        }, 10000)
                    }
                }, 100);
            })
        },
        //手工标注关闭的时候传值功能
        childbyHandwork(val, title) {
            // this.OnPlays() //关闭时调播放方法
            OnShow();
            document.title = title
            OnPlayCaseHide('true')
            if (this.imgshow) {
                this.OnPlays()
            } else {
                this.Onpass()
            }
            OnCaseSetup(1)
            this.isHand = val
        },
        //打开下载页面的时候获取文件的数量
        openDownData() {
            this.showchecked = false
            this.thumbnail = false
            this.checkRadio1 = 1
            this.minDownImg = 1
            this.maxDownImg = this.videoList.length
        },
        closeDownData() {
            this.beginData = ''
            this.endData = ''
        },
        //得到当前案件下的当前点位的最大时间和最小时间
        getTimeTobe(id) {
            let data = {
                caseUuid: id,
                taskUuid: this.detailUuid,
                deviceUuid: this.deviceInfo.deviceUuid
            };
            // this.$http.get("vsas/structure/getDate", {
            this.$http.get("vsas/task/getRetrievalTime", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.beginData = res.data.data.startTime;
                    this.endData = res.data.data.endTime;
                    this.$nextTick(() => {
                        this.OpenTheTime4("#beginDelTime1", "#endDelTime1");
                    })
                }
            });
        },
        //切换下载类型
        checkDownType(row) {
            this.thumbnail = false
            if (row == 2) {
                this.getTimeTobe(this.$route.query.caseUuid)
            } else if (row == 1) {
                this.minDownImg = 1;
                this.maxDownImg = this.videoList.length
            }
        },
        alldownLoad() {
            // 添加转码没有完成不让下载
            let download = false
            for (let i = 0; i < this.filevideoList.length; i++) {
                if (this.filevideoList[i].status != 4) {
                    download = true
                }
            }
            if (download) {
                this.$notify({
                    type: "warning",
                    message: "视频正在处理中，请稍后！",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            this.dialogDownLoad = true
        },
        //批量下载素材
        DownMatter() {
            this.dialogDownLoad = false
            var startNumber, endNumber, startTime, endTime
            let fileUuids = this.filevideoList.map((item) => {
                return item.fileUuid
            }).join(',')
            let data = {}
            if (this.checkRadio1 == 1) {
                startNumber = this.minDownImg
                endNumber = this.maxDownImg
                data = {
                    startNumber: startNumber, //开始数字
                    endNumber: endNumber, //结束数字
                    videoClip: 1, //视频检索片段
                    merge: this.thumbnail ? 1 : 0, //是否合并视频
                    taskUuid: this.detailUuid,
                    offset: 0,
                    limit: this.videoList.length,
                    ids: '',
                    curUserId: this.$storage.getSession('userInfo').userId,
                    fileUuids: fileUuids
                }
            } else if (this.checkRadio1 == 2) {
                startTime = this.beginData
                endTime = this.endData
                data = {
                    startTime: startTime, //开始时间
                    endTime: endTime, //结束时间
                    videoClip: 1, //视频检索片段
                    merge: this.thumbnail ? 1 : 0, //是否合并视频
                    taskUuid: this.detailUuid,
                    offset: 0,
                    limit: this.videoList.length,
                    ids: '',
                    curUserId: this.$storage.getSession('userInfo').userId,
                    fileUuids: fileUuids
                }
            } else if (this.checkRadio1 == 3) {
                data = {
                    videoClip: 1, //视频检索片段
                    merge: this.thumbnail ? 1 : 0, //是否合并视频
                    taskUuid: this.detailUuid,
                    offset: 0,
                    limit: this.videoList.length,
                    ids: '',
                    curUserId: this.$storage.getSession('userInfo').userId,
                    fileUuids: fileUuids
                }
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/retrieval/download/retrieval/getRetrievalResult', data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: "success",
                        message: "下载任务创建成功！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: 'warning',
                        message: '查询内容为空！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: "warning",
                        message: "下载任务创建失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            })


        },
        //打开选择图片
        choiceDown() {
            let download = false
            for (let i = 0; i < this.filevideoList.length; i++) {
                if (this.filevideoList[i].status != 4) {
                    download = true
                }
            }
            if (download) {
                this.$notify({
                    type: "warning",
                    message: "视频正在处理中，请稍后！",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            this.thumbnail = false;
            this.showchecked = true
            this.groundIds = []
            //如果没有选择，则全部清空之前的选择
            for (let i = 0; i < this.Checkd.length; i++) {
                this.Checkd[i].state = false
            }
        },
        //选择图片
        ClickCheckd(index) {
            this.Checkd[(this.currentPage - 1) * this.pageSize + index].state = !this.Checkd[(this.currentPage - 1) * this.pageSize + index].state
            this.Relation();
        },
        //勾选出来的数组
        Relation() {
            this.groundIds = []
            for (let i = 0; i < this.Checkd.length; i++) {
                if (this.Checkd[i].state) {
                    this.groundIds.push(this.videoList[i].retrievalId)
                }
            }
        },
        //下载结果,跟后台交互
        downResult() {
            if (this.groundIds.length == 0) {
                this.thumbnail = false
                this.$notify({
                    type: "warning",
                    message: "请选择要下载的片段",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            this.showchecked = false
            let fileUuids = this.filevideoList.map((item) => {
                return item.fileUuid
            }).join(',')
            let data = {
                videoClip: 1, //视频检索片段
                merge: this.thumbnail ? 1 : 0, //是否合并视频
                taskUuid: this.detailUuid,
                offset: 0,
                limit: this.videoList.length,
                ids: this.groundIds.join(','),
                curUserId: this.$storage.getSession('userInfo').userId,
                fileUuids: fileUuids
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/retrieval/download/retrieval/getRetrievalResult', data).then(res => {
                this.thumbnail = false
                if (res.data.code == 200) {
                    this.$notify({
                        type: "success",
                        message: "下载任务创建成功！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: 'warning',
                        message: '查询内容为空！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: "warning",
                        message: "下载任务创建失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            })

        },
        //验证数字的最小值
        verifymin() {
            this.minDownImg = Number(this.minDownImg.replace('/^(0+)|[^\D]+/g', ''))
            if (this.minDownImg <= 0 || this.minDownImg >= this.totalCount) {
                this.minDownImg = 1
            }
        },
        //验证数字的最大值
        verifymax() {
            this.maxDownImg = Number(this.maxDownImg.replace('/^(0+)|[^\D]+/g', ''))
            if (this.maxDownImg <= 0 || this.maxDownImg >= this.totalCount || this.maxDownImg < this.minDownImg) {
                this.maxDownImg = this.totalCount
            }
        },

        // 开始追踪
        readySignHandler() {
            this.structureList = this.jghObj
            // // this.showvideoPlay = false
            // OnCasePause('true');
            // OnHide()
            this.startSearch()
        },

        startSearch() {
            if (this.zkyStructureSwitch == 'true') {
                this.allfeature = this.jghObj.attrs.Feature
            } else if (this.showVideoStruct == 'true') {
                this.allfeature = this.jghObj.attrs.Features
            }
            let data = {
                feature: this.allfeature, // 特征
                featureFlag: this.jghObj.type, // 特征类型，1：行人，2：车辆，3：骑车人，4：人脸
                searchType: 0, // 查询类型：0：正常以图搜图，1：框选区域以图搜图
                deviceUuids: "", // 框选范围传过来的值
                caseUuid: this.$route.query.caseUuid,
                includeThreshold: 0.6, // 比对阈值
                startTime: this.beginData,
                endTime: this.endData
            };
            let obj = {}
            obj.startTime = this.beginData
            obj.endTime = this.endData
            this.retrievalTime = obj
            this.childFerture = this.jghObj.type
            data = this.$qs.stringify(data);
            this.$http.post("vsas/structure/search", data).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data == null || res.data.data.length == 0) {
                        this.startSing = true
                        this.workLlable = false
                        this.opeVideo = 2
                        OnCasePause('true'); // 暂停
                        this.sexVideoDialod = true;
                        this.trackList = [];
                    } else {
                        this.startSing = true
                        this.workLlable = false
                        this.opeVideo = 2
                        OnCasePause('true'); // 暂停
                        // this.showvideoPlay = false  // 隐藏视频播放
                        this.sexVideoDialod = true;
                        this.trackList = res.data.data;
                    }
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: "warning",
                        message: "在特征库中未搜索到结果",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
            });
        },

        defaultVideo(data) {
            // this.showvideoPlay = true; // 显示视频播放
            // this.$nextTick(()=>{

            // })
            // OnCasePause('false');
            g_case_video = 1;
            OnAttachCaseWindow();
            // OnChangeCaseView(1)
            setTimeout(() => {
                OnCasePause("false");
            }, 300);
        },

        // 结束追踪
        getSignDataHandler() {
            this.startSing = true;
            this.workLlable = false;
            OnShow()
            OnCasePause('false');
        }
    }
};
export default mixins
