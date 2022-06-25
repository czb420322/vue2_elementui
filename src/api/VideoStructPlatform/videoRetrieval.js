import merge from "webpack-merge"; //清空路由参数
const mixins = {
    data() {
        return {
            Pointscreen: "", // 点位筛选
            taskObj: "", //当前任务对象
            tasklist: [], //当前点位下面的所有的数组
            videoList: [], //列表
            loading: null,
            offset: 0, //从哪一个开始
            limit: 1000, //一个请求的条数
            currentPage: 1,
            pageSize: 12,
            totalCount: 0,
            searchList: {},
            filestatus: "",
            videoImg: [],
            progress: "0",
            timeresult: [], //请求C++的视频进度滞后存储的数组
            cTimesResult: [], // C++ 返回的检索结果
            videoIndex: null,
            showvideoPlay: false,
            checkorder: false, //切换当前是否顺序播放
            allNum: 0, //视频总数
            zkyStructureSwitch: "",
            disorder: false,
            eventStopplay: null,
            imgshow: true,
            g_play: {}, //播放器对象
            g_playTime: null, //播放器
            taskName: "",
            nowSuslist: [], // 线索池数据
            devicedList: [],
            mapVisible: false, // 地图弹层
            mapData: [], // 轨迹数组
            colorsearchtype: 0, //当前任务返回的色彩检索类型
            colorarea: "", //色块的图片地址
            aaacolor: [],
            taskprogress: null, //任务进度的检索进度
            videoResult: null, //请求检索结果的定时器
        }
    },
    methods: {
        //播放上一个
        prev(e) {
            let arr = this.videoList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            if (this.videoIndex > 0) {
                this.videoIndex--
                this.playVideos(this.eventStopplay, arr[this.videoIndex].frameTime, this.videoIndex, arr[this.videoIndex], 1)
            } else {
                if (this.currentPage == 1) {
                    this.$notify({
                        type: "warning",
                        message: "已经到了第一个！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.currentPage--
                    this.handleCurrentChange(this.currentPage)
                    this.videoIndex = this.videoList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize).length - 1
                    arr = this.videoList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
                    this.playVideos(this.eventStopplay, arr[this.videoIndex].frameTime, this.videoIndex, arr[this.videoIndex], 1)
                }
            }
        },
        //播放下一个
        next(e) {
            let arr = this.videoList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            // 1、先判断当前索引是否比当前后台返回的总条数大
            // 例如：this.isactive == 1(索引)  arr.length == 10
            //如果小，则直接播放下一个
            //否则就先翻页
            if (this.videoIndex < arr.length - 1) {
                this.videoIndex++
                this.playVideos(this.eventStopplay, arr[this.videoIndex].frameTime, this.videoIndex, arr[this.videoIndex], 1)
            } else {
                //翻页之前先判断是否是最后一页
                // 则是最后一页，给提示，已经到了最后一页，
                if (this.currentPage >= Math.ceil(this.videoList.length / this.pageSize)) {
                    this.$notify({
                        type: "warning",
                        message: "已经到了最后一个！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    //否则分页++执行后台分页请求，接着播放下一个
                    this.currentPage++
                    this.handleCurrentChange(this.currentPage)
                    this.videoIndex = 0
                    arr = this.videoList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
                    this.playVideos(this.eventStopplay, arr[0].frameTime, this.videoIndex, arr[0], 1)
                }
            }
        },
        selectPoint(val) {
            if (this.$route.query.taskUuid) {
                this.$router.push({
                    query: merge({}, {
                        'menuCode': '710'
                    })
                })
            }
            this.Pointscreen = val;
            this.getTasklistTodevice(val) //获取当前点位下的所有任务信息
        },
        // 查询检索设备
        getRetrievalDevice(id) {
            let data = {
                caseUuid: id
            };
            this.$http
                .get("vsas/task/getRetrievalDevice", {
                    params: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        if (res.data.data.length) {
                            this.devicedList = res.data.data;
                            if (this.$route.query.deviceId) {
                                this.Pointscreen = this.$route.query.deviceId; // 默认选中第0项
                            } else {
                                if (this.devicedList.length) {
                                    this.Pointscreen = res.data.data[0].deviceUuid; // 默认选中第0项
                                }
                            }
                            this.loading = this.$loading({
                                lock: true,
                                background: "rgba(255,255,255,0.4)",
                                text: "加载中"
                            });
                            this.getTasklistTodevice(this.Pointscreen) // 检索任务
                        } else {
                            this.devicedList = []
                        }

                    }
                });
        },
        //获取当前点位下的所有任务信息
        getTasklistTodevice(deviceUuid) {
            let data = {
                orderBy: "commitTime",
                orderType: "desc",
                commitUser: this.$storage.getSession("userInfo").userId,
                taskName: "",
                type: 0, //任务类型
                statusl: "", //任务状态
                begin: "",
                end: "",
                caseUuid: this.caseUuid,
                deviceId: deviceUuid,
                pageNum: 1,
                pageSize: 3000,
            };
            this.$http
                .get("vsas/task/new/list", {
                    params: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        if (res.data.data.list.length) {
                            this.tasklist = res.data.data.list;
                            if (this.$route.query.taskUuid) {
                                this.taskObj = this.$route.query.taskUuid;
                                this.changeReterTask(this.$route.query.taskUuid)
                            } else {
                                this.taskObj = this.tasklist[0].taskUuid;
                                this.changeReterTask(this.tasklist[0].taskUuid)
                            }
                        } else {
                            this.tasklist = [];
                            this.taskObj = '';
                        }
                    }
                });
        },
        // 检索数据加入
        addTask(item) {
            let flag = false;
            if (this.nowSuslist.length) {
                this.nowSuslist.forEach(ids => {
                    if (ids.retrievalId.indexOf(item.retrievalId) != -1) {
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
            this.nowSuslist.push(item);
        },
        // 删除线索池数据
        deleteClue(index) {
            this.nowSuslist.splice(index, 1); //删除线索池的某一项
        },
        // 查看轨迹
        lookTrack() {
            if (this.nowSuslist.length < 1) {
                this.$notify({
                    type: "warning",
                    message: "请先将检索结果加入线索池，再查看轨迹！",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            let locusList = [];
            this.nowSuslist.forEach(item => {
                locusList.push(item.retrievalId);
            });
            let data = {
                retrievalUuids: locusList.join(",")
            };
            data = this.$qs.stringify(data);
            this.$http.post("vsas/task/retrieval/getTrajectory", data).then(res => {
                if (res.data.code == 200) {
                    let allcluepoole = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        let obj = {}
                        obj.deviceUuid = res.data.data[i].caseCamera.deviceUuid;
                        obj.cameraName = res.data.data[i].caseCamera.cameraName;
                        obj.latitude = res.data.data[i].caseCamera.latitude;
                        obj.longitude = res.data.data[i].caseCamera.longitude;
                        obj.offset = res.data.data[i].caseCamera.offset;
                        obj.fileStartTime = res.data.data[i].fileInfo.startTime;
                        obj.appearTime = res.data.data[i].videoRetrieval.frameTime;
                        obj.traceImgUrl = res.data.data[i].videoRetrieval.snapshotFile;
                        obj.personUuid = res.data.data[i].videoRetrieval.retrievalId
                        obj.zkytype = 1;
                        allcluepoole.push(obj)
                    }
                    setTimeout(() => {
                        this.mapData = allcluepoole.sort((a, b) =>
                            new Date(b.fileStartTime).getTime() + b.appearTime + b.offset * 1000 <
                            new Date(a.fileStartTime).getTime() + a.appearTime + a.offset * 1000 ?
                            1 :
                            -1
                        );
                        this.mapVisible = true;
                    }, 500)
                }
            });
        },
        // 清空所有
        alldelete() {
            this.nowSuslist = []
        },
        //关闭播放器
        closePlay() {
            this.checkorder = false;
            this.showvideoPlay = false;
            this.setisopenOffVideo(false);
            this.$nextTick(() => {
                OnChageWindowsSize();
                OnHide();
                setTimeout(() => {
                    OnHide();
                }, 500);
            });
            OnCasePause(true);
            clearInterval(this.timeTwo);
            clearInterval(this.thisTime);
            clearInterval(this.timeId);
            this.isfullscreen = true
            this.fullscreen()
        },
        //切换检索任务列表
        changeReterTask(id) {
            this.clearInfoToChange();
            this.getAllTask(id);
        },
        //请求当前任务的所有结果，参数taskUuid
        getAllTask(taskUuid) {
            this.searchCondition(taskUuid); // 检索条件查询接口
            this.gettaskProgress(taskUuid); // 检索进度
            this.searchResult(taskUuid); // 获取检索结果列表
            this.getfiles(taskUuid); //通过ID要获取当前检索的视频数量
            this.taskprogress = setInterval(() => {
                this.gettaskProgress(taskUuid);
            }, 5000);
        },
        //暂停
        Onpass() {
            OnCasePause("true");
            this.imgshow = false;
        },
        //播放
        OnPlays() {
            this.imgshow = true;
            OnShow();
            OnCasePause("false");
        },
        // 检索条件查询接口
        searchCondition(taskUuid) {
            let data = {
                taskUuid: taskUuid
            };
            this.$http
                .get("vsas/task/search/rule", {
                    params: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.taskName = res.data.data.taskName;
                        this.searchList = res.data.data.taskSearch;
                        this.deviceId = res.data.data.taskSearch.deviceId;
                        // console.log(res.data.data.taskSearch,"ddddd");
                        this.videoImg = res.data.data.taskSearch.snapUrl.split("@");
                        this.colorsearchtype = res.data.data.taskSearch.colorSearchType
                        if (res.data.data.taskSearch.enabledColor == 1) {
                            if (this.colorsearchtype == 0) {
                                this.colorarea = res.data.data.taskSearch.colorTraceUrl;
                            } else if (this.colorsearchtype == 2) {
                                this.initTwoColorBlock(res.data.data.taskSearch)
                            }
                        }
                    } else {
                        this.$notify({
                            type: "warning",
                            message: "获取失败",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return;
                    }
                });
        },
        initTwoColorBlock(res) {
            this.aaacolor = res.rgb.split("#")
        },
        //通过ID要获取当前检索的视频数量
        getfiles(taskUuid) {
            let data = {
                taskUuid: taskUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post("/vsas/task/search/multiFile/files", data).then(res => {
                if (res.data.code == 200) {
                    let filelist = res.data.data;
                    this.filevideoList = res.data.data;
                    let statulist = [];
                    for (let i = 0; i < filelist.length; i++) {
                        if (filelist[i].status == 4) {
                            let obj = {
                                duration: filelist[i].duration,
                                fileuuid: filelist[i].fileUuid,
                                attr: 0,
                                status: filelist[i].status
                            };
                            this.timeresult.push(obj);
                        } else {
                            this.disableDwonLoad = true;
                            statulist.push(filelist[i]);
                        }
                    }
                    this.timeresultlength = this.timeresult.length;
                    if (statulist.length) {
                        this.getTransCodin(statulist);
                        this.codinTime = setInterval(() => {
                            this.getTransCodin(statulist);
                        }, 40000);
                    }
                }
            });
        },
        //播放视频
        //获取C++返回的当前时间以及是否转码完成
        getTransCodin(list) {
            let count = 0;
            this.cTimesResult = [];
            let url = sessionStorage.getItem("hdfsAgentAddr");
            for (let i = 0; i < list.length; i++) {
                let lastindex = list[i].fileSourcePath.lastIndexOf("/");
                let playvalue = list[i].fileSourcePath;
                // playvalue = playvalue.slice(lastindex - 81, playvalue.length);
                 // 修改为非大数据架构
                playvalue = playvalue.slice(lastindex - 87, playvalue.length)
                playvalue = playvalue.replace("source", "decode");
                let val = url + playvalue;
                setTimeout(() => {
                    this.$http
                        .post(
                            "/searchHisImg/TouchFile?file=" +
                            val +
                            "&fileuuid=" +
                            list[i].fileUuid +
                            "&deviceId=" +
                            this.deviceId
                        )
                        .then(res => {
                            if (res.data.code == 200) {
                                this.cTimesResult.push(res.data);
                            } else {
                                let data = {
                                    duration: 0,
                                    fileuuid: list[i].fileUuid,
                                    attr: -1,
                                    status: list[i].status
                                };
                                this.cTimesResult.push(data);
                            }
                            for (let i = 0; i < this.cTimesResult.length; i++) {
                                //通过attr判断当前视频是否转码完成，如果转码完成就把count++
                                //如果count等于视频的数量，则停止定时器刷新
                                if (this.cTimesResult[i].attr == 0) {
                                    count++;
                                    if (count == this.cTimesResult.length) {
                                        clearInterval(this.codinTime);
                                    }
                                }
                            }
                        });
                }, 10);
            }
        },
        // 获取检索结果列表
        searchResult(taskUuid) {
            let params = {
                limit: this.limit,
                offset: this.offset,
                taskUuid: taskUuid
            };
            this.$http
                .get("vsas/task/search/multiFile/retrieval", {
                    params: params
                })
                .then(res => {
                    this.loading.close();
                    if (res.data.code == 200) {
                        clearTimeout(this.videoResult);
                        //动态去请求检索结果
                        // if(res.data.data.length){
                        this.videoResult = setTimeout(() => {
                            if (this.filestatus == 0) {
                                this.offset = Number(this.totalCount);
                                this.limit = 2000;
                            } else {
                                this.offset = Number(this.totalCount);
                                this.limit = 1000;
                            }
                            this.searchResult(taskUuid);
                        }, 1000);
                        // }
                        if (res.data.data == null) {
                            this.resultList = [];
                        } else {
                            this.resultList = res.data.data;
                        }
                        //每次获取到的数据添加到新的数据中去
                        this.videoList = this.videoList.concat(this.resultList);
                        //判断数组的长度，关闭loading
                        if (this.videoList.length > 0 && this.loading) {
                            this.loading.close();
                        }
                        //对数组进行去重，如果接口请求特别慢的情况
                        let objList = {};
                        this.videoList = this.videoList.reduce((cur, next) => {
                            objList[next.retrievalId] ?
                                "" :
                                (objList[next.retrievalId] = true && cur.push(next));
                            return cur;
                        }, []);
                        this.totalCount = this.videoList.length;
                    } else {
                        this.$notify({
                            type: "warning",
                            message: "获取失败",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return;
                    }
                })
                .catch(() => {
                    this.loading.close();
                });
        },
        //单机模态框播放视频
        // 三个参数第一个标注当前目标出现的时间，当前目标的索引，以及当前目标的对象
        playVideos(e, val, index, item, type) {
            this.disorder = false;
            this.eventStopplay = e;
            this.paperUuid = item.fileUuid;
            if (e.target.disabled) {
                return;
            }
            if (type == 1) {
                this.setisopenOffVideo(true);
                this.setvideoretriInfo(item);
                clearInterval(this.timeTwo);
                clearInterval(this.timeId);
                clearInterval(this.thisTime);
                for (let i = 0; i < this.timeresult.length; i++) {
                    if (
                        this.timeresult[i].status != 4 &&
                        item.fileUuid == this.timeresult[i].fileuuid &&
                        item.startTime > this.timeresult[i].duration * 1000 + 999
                    ) {
                        this.$notify({
                            type: "warning",
                            message: "正在缓冲中",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return;
                    } else if (
                        this.timeresult[i].status == 4 &&
                        item.fileUuid == this.timeresult[i].fileuuid &&
                        item.startTime > this.timeresult[i].duration * 1000 + 999
                    ) {
                        val = Number(this.timeresult[i].duration) * 1000;
                    }
                }
                this.commonCtoPlay([item], 0, "detailidUrl");

                let rulept = this.getpoints();
                setTimeout(() => {
                    OnCasePlay(this.searchList.deviceId, rulept);
                    this.timeTwo = setInterval(() => {
                        this.alltime = window.g_caseObj.duration;
                        this.playtime = window.g_caseObj.timestamp;
                        this.showplay = window.g_caseObj.pause
                    }, 200);
                    clearInterval(this.timeId);
                    this.videoIndex = index;
                    this.imgshow = true;
                    setTimeout(() => {
                        //目标出现时间
                        let frameTime = val;
                        if (frameTime < 4000) {
                            OnCaseSeek(0);
                        } else {
                            OnCaseSeek(Math.floor(val / 1000) - 3);
                        }
                        frameTime = Math.floor(val / 1000);
                        this.showvideoPlay = true;
                        setTimeout(() => {
                            OnShow();
                        }, 300);
                        this.timeId = setInterval(() => {
                            //通过定时器一直刷新当前播放时间
                            //如果目标出现时间小于3s 则播放前面4S
                            if (frameTime <= 3 && this.playtime > frameTime + 3) {
                                OnCasePause("false");
                                this.imgshow = true;
                                //如果当前播放时间大于等于3秒，则从头开始放
                                OnCaseSeek(0);
                                return;
                            } else if (
                                this.alltime - frameTime <= 3 &&
                                (this.playtime == this.alltime ||
                                    this.playtime == 0 ||
                                    this.playtime == 1) &&
                                this.alltime > 0
                            ) {
                                OnCasePause("false");
                                //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                                OnCaseSeek(frameTime - 3);
                                this.imgshow = true;
                                return;
                            } else {
                                //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
                                // OnCaseSeek(frameTime - 3)
                                //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
                                // if (this.playtime > (frameTime + 3) || this.playtime < (frameTime - 3)) {
                                if (frameTime > 4 && this.playtime >= frameTime + 3) {
                                    OnCasePause("false");
                                    OnCaseSeek(frameTime - 3);
                                    this.imgshow = true;
                                }
                                return;
                            }
                        }, 1000);
                    }, 300);
                }, 100);
            } else if (type == 2) {
                clearInterval(this.thisTime);
                clearInterval(this.timeId);
                OnCaseSeek(this.playtime);
                let frameTime = Math.ceil(val / 1000);
                if (frameTime > this.alltime) {
                    frameTime = this.alltime;
                }
                this.timeId = setInterval(() => {
                    //通过定时器一直刷新当前播放时间
                    //如果目标出现时间小于3s 则播放前面4S
                    if (frameTime <= 3 && this.playtime > frameTime + 3) {
                        this.imgshow = true;
                        //如果当前播放时间大于等于4秒，则从头开始放
                        OnCaseSeek(0);
                    } else if (
                        this.alltime - frameTime <= 4 &&
                        (this.playtime == this.alltime ||
                            this.playtime == 0 ||
                            this.playtime == 1) &&
                        this.alltime > 0
                    ) {
                        //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                        OnCaseSeek(frameTime - 3);
                        this.imgshow = true;
                    } else {
                        if (frameTime > 4 && this.playtime >= frameTime + 3) {
                            OnCaseSeek(frameTime - 3);
                            this.imgshow = true;
                        }
                    }
                }, 800);
            }
        },
        //10月21号新增接口
        //新增是否顺序播放开关，如果打开则视频从当前索引顺序播放，播放到最后一个的时候停止播放视频
        //否则是一直循环播放当前索引的视频
        orderPlay(a) {
            let rulept = this.getpoints();
            OnCaseSeek(this.playtime);
            clearInterval(this.thisTime);
            this.thisTime = setInterval(() => {
                if (this.playtime >= Math.ceil(this.videoList[a].entTime / 1000)) {
                    if (a > this.videoList.length - 1) {
                        a = 0;
                        this.videoIndex = 0;
                        this.currentPage = 1;
                        this.commonCtoPlay([this.videoList[0]], 0, "detailidUrl");
                        let rulept = this.getpoints();
                        OnCasePlay(this.searchList.deviceId, rulept);
                    } else {
                        a++;
                        this.videoIndex++;
                        this.setvideoretriInfo(this.videoList[a]);
                        if (a != 1 && (a + 1) % this.pageSize == 1) {
                            this.currentPage++;
                        }
                        this.videoIndex = this.videoIndex % 12;
                        if (
                            Math.floor(this.videoList[a].startTime / 1000) <
                            Math.ceil(this.videoList[a - 1].entTime / 1000)
                        ) {
                            if (
                                this.videoList[a].fileUuid != this.videoList[a - 1].fileUuid
                            ) {
                                this.commonCtoPlay(this.videoList, a, "detailidUrl");
                                OnCasePlay(this.searchList.deviceId, rulept);
                                OnCaseSeek(Math.floor(this.videoList[a].startTime / 1000));
                            } else {
                                OnCaseSeek(Math.floor(this.videoList[a - 1].entTime / 1000));
                            }
                        } else {
                            OnCaseSeek(Math.floor(this.videoList[a].startTime / 1000));
                        }
                    }
                }
                if (
                    a > this.videoList.length ||
                    (a >= this.videoList.length - 1 &&
                        (this.playtime == 0 || this.playtime == 1))
                ) {
                    a = 0;
                    this.videoIndex = 0;
                    this.currentPage = 1;
                    this.commonCtoPlay([this.videoList[0]], 0, "detailidUrl");
                    let rulept = this.getpoints();
                    OnCasePlay(this.searchList.deviceId, rulept);
                }
            }, 500);
        },
        //划线
        getpoints() {
            let rulept;
            if (this.searchList.type == 1) {
                let firstTwo = this.searchList.points.split(",");
                if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                    rulept =
                        "2-2-" +
                        (firstTwo[2] - 4) +
                        "-2-" +
                        (firstTwo[2] - 4) +
                        "-" +
                        (firstTwo[7] - 4) +
                        "-2-" +
                        (firstTwo[7] - 4) +
                        "-2-2";
                } else {
                    this.searchList.points =
                        this.searchList.points + "," + firstTwo[0] + "," + firstTwo[1];
                    rulept = this.searchList.points.replace(/,/g, "-");
                }
            } else if (this.searchList.type == 2) {
                let firstTwo = this.searchList.points.split(",");
                if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                    rulept =
                        "2-2-" +
                        (firstTwo[2] - 4) +
                        "-2-" +
                        (firstTwo[2] - 4) +
                        "-" +
                        (firstTwo[7] - 4) +
                        "-2-" +
                        (firstTwo[7] - 4) +
                        "-2-2";
                } else {
                    rulept = this.searchList.points.replace(/,/g, "-");
                }
            } else if (this.searchList.type == 3) {
                let firstTwo = this.searchList.points.split(",");
                if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                    rulept =
                        "2-2-" +
                        (firstTwo[2] - 4) +
                        "-2-" +
                        (firstTwo[2] - 4) +
                        "-" +
                        (firstTwo[7] - 4) +
                        "-2-" +
                        (firstTwo[7] - 4) +
                        "-2-2";
                } else {
                    let a = 0;
                    let b = 0;
                    if (Number(firstTwo[0]) > Number(firstTwo[2])) {
                        a =
                            Number(firstTwo[2]) +
                            (Number(firstTwo[0]) - Number(firstTwo[2])) / 2;
                    } else {
                        a =
                            Number(firstTwo[0]) +
                            (Number(firstTwo[2]) - Number(firstTwo[0])) / 2;
                    }

                    if (Number(firstTwo[1]) > Number(firstTwo[3])) {
                        b =
                            Number(firstTwo[3]) +
                            (Number(firstTwo[1]) - Number(firstTwo[3])) / 2;
                    } else {
                        b =
                            Number(firstTwo[1]) +
                            (Number(firstTwo[3]) - Number(firstTwo[1])) / 2;
                    }
                    let postPt = getPos(
                        Math.ceil(Number(a)),
                        Math.ceil(Number(b)),
                        Math.ceil(Number(firstTwo[4])),
                        Math.ceil(Number(firstTwo[5]))
                    );
                    rulept =
                        Math.ceil(firstTwo[0]) +
                        "-" +
                        Math.ceil(firstTwo[1]) +
                        "-" +
                        Math.ceil(firstTwo[2]) +
                        "-" +
                        Math.ceil(firstTwo[3]) +
                        "-" +
                        Math.ceil(a) +
                        "-" +
                        Math.ceil(b) +
                        "-" +
                        Math.ceil(firstTwo[4]) +
                        "-" +
                        Math.ceil(firstTwo[5]) +
                        "-" +
                        Math.ceil(postPt.ex) +
                        "-" +
                        Math.ceil(postPt.ey) +
                        "-" +
                        Math.ceil(firstTwo[4]) +
                        "-" +
                        Math.ceil(firstTwo[5]) +
                        "-" +
                        Math.ceil(postPt.fx) +
                        "-" +
                        Math.ceil(postPt.fy);
                }
            }
            return rulept;
        },
        //获取当前检索任务的进度以及完成状态
        gettaskProgress(id) {
            this.$http.get("vsas/task/search/progress?taskUuid=" + id).then(res => {
                if (res.data.code == 200) {
                    this.progress = res.data.data.progress;
                    this.filestatus = res.data.data.status;
                    if (this.filestatus == 0) {
                        clearInterval(this.taskprogress);
                        this.getAllnum(id);
                    }
                }
            });
        },
        //获取当前检索有多少条总数
        getAllnum(id) {
            let data = {
                taskUuid: id
            };
            data = this.$qs.stringify(data);
            this.$http
                .post("vsas/task/search/multiFile/retrieval/count", data)
                .then(res => {
                    if (res.data.code == 200) {
                        this.allNum = res.data.data;
                    }
                });
        },
        //监听页数的改变
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 切换清空所有数据
        clearInfoToChange() {
            this.eventStopplay = null;
            this.limit = 1000;
            this.totalCount = 0;
            this.pageSize = 12;
            this.offset = 0;
            this.timeresult = [];
            this.cTimesResult = [];
            this.videoList = [];
            this.videoIndex = null;
            this.setisopenOffVideo(false);
            clearInterval(this.thisTime);
            clearInterval(this.timeId);
            clearInterval(this.timeTwo);
            clearInterval(window.g_interval);
            clearTimeout(this.videoResult);
            clearInterval(this.codinTime);
            clearInterval(this.taskprogress);
            this.showvideoPlay = false;
            this.currentPage = 1
        }
    }
}
export default mixins
