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
                e.cancle();
                delete window.axiosProArr[i]
            })
            this.taskObj = ''
            this.$emit("childByDetail", false);
            OnHide();
            OnCaseExit();
            CloseVodPlayer();
            document.title = document.title.split('.')[0]
            this.clearInfoToChange();
        },
        //切换任务的时候清空之前的所有数据
        clearInfoToChange() {
            this.timeresultlength = 0;
            this.cTimesResult = []
            this.timeresult = []
            this.videoList = []
            this.limit = 1000;
            this.offset = 0;
            this.lableTime = ''
            this.videoIndex = null
            clearInterval(this.thisTime);
            clearInterval(this.timeId);
            clearInterval(this.timeTwo);
            clearInterval(window.g_interval);
            clearInterval(this.videoResult);
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
        //执行打开模态框的方法
        openDia() {
            console.log(this.deviceInfo, 55454);
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
                this.getAllTask(this.proptaskUuid);
            })
        },
        //请求当前任务的所有结果，参数taskUuid
        getAllTask(taskUuid) {
            this.searchCondition(taskUuid)
            this.gettaskProgress(taskUuid)
            this.searchResult(taskUuid)
            this.getfiles(taskUuid)
            //动态去请求检索结果
            this.videoResult = setInterval(() => {
                if (this.filestatus == 0) {
                    this.offset = Number(this.totalCount)
                    this.limit = 2000;
                } else {
                    this.offset = Number(this.totalCount)
                    this.limit = 1000;
                }
                this.searchResult(taskUuid)
            }, 8000)
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
                    console.log(res, 66333);
                    this.tasklist = res.data.data.list
                    this.taskObj = this.proptaskUuid
                }
            });
        },
        //切换检索任务列表
        changeReterTask(id) {
            this.clearInfoToChange();
            this.getAllTask(id)
        },
        // 获取检索结果列表
        searchResult(taskUuid) {
            // console.log(this.offset,this.limit,3333);
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
                    if (res.data.data == null) {
                        this.resultList = []
                    } else {
                        this.resultList = res.data.data;
                        this.resultList.forEach(item => {
                            item.offset = this.deviceInfo.offset
                        });
                    }
                    this.videoList = this.videoList.concat(this.resultList)
                    if (this.videoList.length > 0 && this.loading) {
                        this.loading.close()
                    }
                    this.totalCount = this.videoList.length
                    //通过检索结果来请求C++的接口来判断当前视频是否转码完成
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
                    this.$http.post('/searchHisImg/TouchFile?file=' + val + '&fileuuid=' + list[i].fileUuid).then(res => {
                        if (res.data.code == 200) {
                            this.cTimesResult.push(res.data)
                        } else {
                            let data = {
                                duration: 0,
                                fileuuid: list[i].fileUuid,
                                attr: -1
                            }
                            this.cTimesResult.push(res.data)
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
                    let statulist = []
                    for (let i = 0; i < filelist.length; i++) {
                        if (filelist[i].status == 4) {
                            let obj = {
                                duration: filelist[i].duration,
                                fileuuid: filelist[i].fileUuid,
                                attr: 0
                            }
                            this.timeresult.push(obj)
                        } else {
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
            OnCasePause('false');
            this.imgshow = true
        },
        //关闭播放器
        closePlay() {
            this.showvideoPlay = false;
            this.setisopenOffVideo(false)
            OnHide();
            setTimeout(() => {
                OnHide();
            }, 100)
            setTimeout(() => {
                OnHide();
            }, 300)
            OnCasePause(true)
            clearInterval(this.timeTwo);
            clearInterval(this.thisTime)
            clearInterval(this.timeId)
        },
        //单机模态框播放视频
        // 三个参数第一个标注当前目标出现的时间，当前目标的索引，以及当前目标的对象
        playVideos(val, index, item, type) {
            if (type == 1) {
                console.log(type, 'leixing------------------------')
                this.setisopenOffVideo(true)
                this.setvideoretriInfo(item);
                clearInterval(this.timeTwo)
                clearInterval(this.timeId)
                clearInterval(this.thisTime)
                for (let i = 0; i < this.timeresult.length; i++) {
                    if (item.fileUuid == this.timeresult[i].fileuuid && val > this.timeresult[i].duration * 1000) {
                        this.$notify({
                            type: 'warning',
                            message: '正在缓冲中',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        return
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
                        let frameTime = Math.ceil(val / 1000)
                        if (frameTime <= 3) { //如果目标出现时间小于第3秒，从第0秒开始放
                            OnCaseSeek(0)
                        } else { //如果目标出现在最后4秒或者目标出现在中间
                            OnCaseSeek(frameTime - 3)
                        }
                        this.showvideoPlay = true;
                        setTimeout(() => {
                            OnShow()
                        }, 300)
                        // OnCasePause('false');
                        this.timeId = setInterval(() => {
                            //通过定时器一直刷新当前播放时间
                            //如果目标出现时间小于3s 则播放前面4S
                            if (frameTime <= 3 && this.playtime >= 4) {
                                this.imgshow = true
                                //如果当前播放时间大于等于4秒，则从头开始放
                                OnCaseSeek(0)
                            } else if (this.alltime - frameTime < 4 && this.playtime == this.alltime && this.alltime > 0) { //
                                //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                                OnCaseSeek(frameTime - 3)
                                this.imgshow = true
                            } else {
                                //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
                                // OnCaseSeek(frameTime - 3)
                                //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
                                if (this.playtime > (frameTime + 3) || this.playtime < (frameTime - 3)) {
                                    // OnCasePause('false');
                                    OnCaseSeek(frameTime - 3)
                                    this.imgshow = true
                                }
                            }
                        }, 800)
                    }, 300)
                }, 100)
            } else if (type == 2) {
                console.log(type, 'leiixng----------------')
                OnCaseSeek(this.playtime)
                let frameTime = Math.ceil(val / 1000)
                this.timeId = setInterval(() => {
                    //通过定时器一直刷新当前播放时间
                    //如果目标出现时间小于3s 则播放前面4S
                    if (frameTime <= 3 && this.playtime >= 4) {
                        this.imgshow = true
                        //如果当前播放时间大于等于4秒，则从头开始放
                        OnCaseSeek(0)
                    } else if (this.alltime - frameTime < 4 && this.playtime == this.alltime && this.alltime > 0) { //
                        //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                        OnCaseSeek(frameTime - 3)
                        this.imgshow = true
                    } else {
                        //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
                        // OnCaseSeek(frameTime - 3)
                        //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
                        if (this.playtime > (frameTime + 3) || this.playtime < (frameTime - 3)) {
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
            // OnCaseSeek(Math.floor(this.videoList[a].startTime/1000))
            OnCaseSeek(this.playtime)
            this.thisTime = setInterval(() => {
                if (this.playtime >= Math.floor(this.videoList[a].entTime / 1000)) {
                    a++
                    this.videoIndex++
                    this.setvideoretriInfo(this.videoList[a]);
                    if (a >= this.videoList.length - 1) {
                        clearInterval(this.thisTime)
                        OnCaseStopAll(-1)
                        // this.currentPage = 1
                        // this.commonCtoPlay(this.videoList,0,'detailidUrl')
                        // OnCasePlay(this.searchList.deviceId, rulept);
                        // clearInterval(this.thisTime)
                        // OnCaseSpeed(0)
                        // this.roundPlay(0)
                        // this.videoIndex = 0
                    } else {
                        if (a != 1 && (a + 1) % this.pageSize == 1) {
                            this.currentPage++
                        }
                        this.videoIndex = this.videoIndex % 12
                        if (Math.floor(this.videoList[a].startTime / 1000) < Math.ceil(this.videoList[a - 1].entTime / 1000)) {
                            if (this.videoList[a].fileUuid != this.videoList[a - 1].fileUuid) {
                                this.commonCtoPlay(this.videoList, a, 'detailidUrl')
                                OnCasePlay(this.searchList.deviceId, rulept);
                                OnCaseSeek(Math.ceil(this.videoList[a].startTime / 1000))
                            } else {
                                OnCaseSeek(Math.ceil(this.videoList[a - 1].entTime / 1000))
                            }
                        } else {
                            OnCaseSeek(Math.floor(this.videoList[a].startTime / 1000))
                        }
                    }
                }
                if (a > this.videoList.length) {
                    console.log('步骤6');
                    clearInterval(this.thisTime)
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
        //   console.log(a,555);
        //   let rulept = this.getpoints();
        //   OnCaseSeek(Math.floor(this.videoList[a].startTime/1000))
        //   this.thisTime = setInterval(()=>{
        //     console.log(this.playtime,666555);
        //     console.log(Math.floor(this.videoList[a].entTime/1000));
        //       if(this.playtime >= Math.floor(this.videoList[a].entTime/1000)){
        //         a++
        //         this.videoIndex ++
        //         this.setvideoretriInfo(this.videoList[a]);
        //         if(a >= this.videoList.length - 1){
        //           console.log('步骤1');
        //           this.currentPage = 1
        //           this.commonCtoPlay(this.videoList,0,'detailidUrl')
        //           OnCasePlay(this.searchList.deviceId, rulept);
        //           clearInterval(this.thisTime)
        //           OnCaseSpeed(0)
        //           this.roundPlay(0)
        //           this.videoIndex = 0
        //         }else{
        //           if(a != 1 && (a + 1) % this.pageSize == 1){
        //             this.currentPage++
        //           }
        //           console.log('步骤2');
        //           this.videoIndex = this.videoIndex % 12
        //           if(Math.floor(this.videoList[a].startTime/1000) < Math.ceil(this.videoList[a-1].entTime/1000)){
        //             if(this.videoList[a].fileUuid != this.videoList[a-1].fileUuid){
        //               console.log('步骤3');
        //               this.commonCtoPlay(this.videoList,a,'detailidUrl')
        //               OnCasePlay(this.searchList.deviceId, rulept);
        //               OnCaseSeek(Math.ceil(this.videoList[a].startTime/1000))
        //             }else{
        //               console.log('步骤4');
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
        //获取检索视频列表
        getallVideo() {
            let data = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                taskUuid: this.taskUuid,
                orderBy: this.orderBy,
                orderType: this.orderType,
            }
            this.$http.get('vsas/task/video/retrieval', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.videoList = res.data.data.list
                    this.totalCount = res.data.data.totalCount
                }
            })
        },
        //打开手工标注功能
        OpenHand() {
            OnCaseSnapshot(); //请求截图
            sessionStorage.setItem('imgurl', '')
            OnPlayCaseHide('false');
            OnPlayCaseHide('false');
            OnPlayCaseHide('false');
            this.$nextTick(() => {
                let times = setInterval(() => {
                    if (window.imgurl != undefined && window.imgurl.length > 20 && window.imgurl.indexOf('.jpg') != -1) {
                        OnHide(); //播放器隐藏
                        this.isHand = true
                        document.title = document.title.split(".")[0];
                        clearInterval(times)
                    }
                }, 100);
            })
        },
        //手工标注关闭的时候传值功能
        childbyHandwork(val, title) {
            OnShow();
            document.title = title
            OnPlayCaseHide('true')
            this.isHand = val
        }




    }




};
export default mixins
