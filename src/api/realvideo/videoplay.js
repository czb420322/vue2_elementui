import {
    mapMutations,
} from 'vuex'
import CVideo from './C_video.js' //C++播放器的方法
const mixins = {
    data: function () {
        return {
            showplay: true,
            showDataCell: false, //显示数据采集的模态框
            showTaskMan: false, //显示任务管理的模态框
            showVideoRetal: false, //显示新增采集任务的窗口
            showcommlable: false,
            showhandword: false, //显示手工标注
            VideoRetalList: {}, //传给子组件的对象
            taskList: [], //当前视频的任务列表
            time: [],
            videotime: 0, //当前视频总时长
            palytime: 0, //当前时间
            flag: true,
            proressshow: true, //进度条的控制,
            videolist: [],
            beginTime: "",
            endTime: "",
            keyword: "",
            listNum: [-3, -2, -1, 0, 1, 2, 3],
            nowIndex: 3,
            actives: false,
            ImgfirstShow: false, //结构化，检索结果的展示图片的显示和隐藏
            ImgtwoShow: false, //结构化，检索结果的展示图片的显示和隐藏\
            currentPage: 1, //检索任务列表
            pageSize: 10,
            totalCount: 0,
            allVideoList: [],
            indexToval: '',
            videoPage: 1, //视频列表
            videoSize: 10,
            videototle: null,
            taskUuid: '', //任务检索列表的ID
            progress: '', //检索任务列表的进度
            fileUuid: '',
            timeFrag: '', //片段播放定时器
            timetoTaskList: null, //检索任务的列表定时器
            videocutImg: '', //截图图片
            souse: false,
            videoIndex: null, //播放视频的索引
            showpart: '', //显示片段播放的显示和隐藏
            showcheck: true, //显示和隐藏
            nowCheck: 11, //显示隐藏的索引
            t: null, //刷新视频列表的定时器
            list: [], //检索列表
            AllTime: '', //总时间
            timefragment: null, //片段的定时器
            showcir: null,
            thisTime: null,
            timeTosearch: null, //列表刷新定时器
            showbuffer: false, //显示缓冲
            timeToMore: null, //检索片段加载更多
            deviceId: null,
            rulePoint: '', //检索规则坐标
            ruleType: '', //检索规则类型
            taskStatus: '',
            checkOnline: '1', //在线和离线的切换
            deviceUuid: '',
            caseUuid: '',
            checkId: 'hisIdPlayer',
            isnew: true,
            machine: '',
            ischeckOnline: false, //区分是否是天网中的离线或者在线
            isnowvideoret: {}, //是否是当前播放的检索任务
            videoInfo: {}, //当前播放视频的所有信息
            limit: 20,
            offset: 0,
            allresresult: [], //得到所有的检索结果
            speed: '',
            ispause: false, //判断当前视频是否是处于播放状态  9.27增加
        }
    },
    created() {
        this.showplay == 'true'
        this.getDownLoad();
    },
    mixins: [CVideo],
    watch: {
        speed(val) {
            if (val == 0) {
                this.nowIndex = 3
            }
        },
        // 监听总数的变化
        videototle(val, oldVal) { //普通的watch监听
            if (val != oldVal) {
                this.videoPage = 1
                this.nowCheck = val - oldVal
            }
            if (oldVal == null) {
                return
            } else {
                this.nowCheck = this.nowCheck + val - oldVal
            }
        },
        //当前播放时间以及进度条的长度
        palytime(val) {
            if (val != 0) {
                if (Number(val) <= Number(this.videotime)) {
                    var percent = val / this.videotime * 100 + "%";
                    this.$refs.playpro.style.width = percent;
                } else {
                    val = this.videotime;
                    this.$refs.playpro.style.width = 0;
                }
            }
        }
    },
    filters: {
        datatime(value) {
            if (value == 0 || value == undefined) {
                return '00:00:00'
            } else {
                var hour = Math.floor(value / 3600);
                /*补0操作*/
                hour = hour < 10 ? "0" + hour : hour;
                var minute = Math.floor((value % 3600) / 60);
                minute = minute < 10 ? "0" + minute : minute;
                var second = Math.floor(value % 60);
                second = second < 10 ? "0" + second : second;
                /*返回结果*/
                // }
                /*返回结果*/
                return hour + ":" + minute + ":" + second;
            }

        }
    },
    methods: {
        ...mapMutations([
            'setvideoretriInfo', //设置视频播放时候的信息
            'setdeviceInfo', //设置点位信息
        ]),
        switchover(row, i) {
            this.machine = i
            this.isnowvideoret = row
        },
        //通过点位查任务ID,通过任务查点位信息
        async getInfoToDeviceATask(taskUuid, deviceUuid, type) {
            let result = ''
            let data = {
                caseUuid: this.$route.query.caseUuid,
                taskUuid: taskUuid,
                deviceUuid: deviceUuid,
                type: type
            }
            await this.$http.get('vsas/structure/getTaskInfoOrDeviceInfo', {
                params: data
            }).then(res => {
                result = res.data
            })
            return result
        },
        // 切换离线
        checkLis() {
            if (this.checkOnline == 1) {
                return
            }
            this.clearInfo()
            this.ispause = false
            this.nowCheck = null
            this.$store.state.isvideoline = false
            this.OpenTheTime('#text11', '#text12');
            this.checkOnline = 1
            document.title = document.title.split(".")[0] + '.';
            this.showTree = false;
            this.facilityName = '';
            OnhisExits();
            OnInit();
        },
        //切换历史流播放
        checkHis() {
            this.clearInfo()
            if (this.checkOnline == 2) {
                return
            }
            this.beginData = this.getEarlierDate()
            this.endData = this.getCurrentDate()
            this.OpenTheTime3('#hisTime1', '#hisTime2');
            this.timetable = []
            this.facilityId = ''
            this.checkId = 'hisIdPlayer'
            this.checkOnline = 2
            this.$store.state.isvideoline = true
            document.title = document.title.split(".")[0] + '....'
            OnhisInit()
            OnExit();
        },
        //切换在线和离线的时候清空数据
        clearInfo() {
            window.axiosProArr.forEach((e, i) => {
                if (sessionStorage.getItem('isUploadTrue') != 1) {
                    e.cancle();
                    delete window.axiosProArr[i]
                }
            });
            this.limit = 20;
            this.offset = 0;
            this.playrtsp = false
            this.BigRetrieval();
            this.ImgtwoShow = false
            this.allVideoList = []
            this.videRetalList = []
            this.currentPage = 1
            clearInterval(this.timeTwo)
            clearInterval(this.retfragment)
            clearInterval(this.thisTime)
            clearInterval(this.timeFrag)
            clearInterval(this.timetoTaskList)
        },

        //隐藏检索列表和检索任务
        handleTask() {
            if (this.ImgfirstShow == true) {
                clearInterval(this.timeFrag) //片段播放的定时器
                clearInterval(this.timetoTaskList) //检索任务的列表定时器
                clearInterval(this.thisTime) //循环播放的定时器
                clearInterval(this.timeTosearch)
                clearInterval(this.timeToMore)
                this.nowCheck = null;
                this.BigRetrieval();
                this.ImgfirstShow == false
                this.ImgtwoShow = false;
                OnPlay(this.deviceId, '')
            } else {

            }

        },
        //得到所有的视频列表
        getAllVideo(pageNum) {
            this.getSize();
            let userId = this.$storage.getSession('userInfo').userId;
            let data = {
                fileName: this.keyword,
                pageNum: pageNum,
                pageSize: this.videoSize,
                submiterId: userId,
                begin: this.beginTime,
                end: this.endTime,
                infoKind: 0,
                statusl: '2,3,4,6',
                fastOrSpecial: 'fast'
            };
            this.$http.get('vsas/collection/offline/list', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.videolist = res.data.data.list;
                    this.videototle = res.data.data.totalCount
                }
            })
        },
        //打开数据采集的模态框事件
        openDataCell() {
            OnPause('true')
            this.showDataCell = true
            document.title = document.title.split(".")[0];
            this.hideVideo();
        },
        //隐藏播放器
        hideVideo() {
            if (this.checkOnline == 1) {
                OnvideoHide();
            }
        },
        //显示播放器
        showVideo() {
            if (this.checkOnline == 1) {
                OnvideoShow();
            }
        },
        //子组件传值
        childByDataCell(val, title) {
            OnPause('false')
            this.showDataCell = val
            this.nowCheck = null
            document.title = title
            this.getAllVideo(this.videoPage)
            this.showVideo();
            // this.nowCheck = 11; //关闭任务采集顺便关闭检索任务列表
        },
        //打开任务管理页面
        openTaskMan() {
            if (document.title.split('.').length == 5) {
                this.ischeckOnline = true
            } else {
                this.ischeckOnline = false
            }
            OnPause('true')
            this.showTaskMan = true
            document.title = document.title.split(".")[0];
            this.hideVideo();
        },
        //任务子组件传值
        //val 表示关闭模态框
        //title是更改播放的title,用户隐藏显示播放器
        //list表示点击的时候传过来的值
        //deltakslist表示是删除的任务
        //taskInfo表示是当前任务对象
        childByTaskMan(val, title, list, deltakslist, taskInfo, taskIndex) {
            this.showVideo();
            //如果有删除的任务则传过来，并且删除对应的任务列表
            if (deltakslist.length) {
                this.getAllVideo(1)
                for (let i = 0; i < deltakslist.length; i++) {
                    if (this.isnowvideoret.taskUuid = deltakslist[i].taskUuid) {
                        this.BigRetrieval();
                        this.ImgtwoShow = false
                        OnStopAll(-1);
                        this.machine = null
                    }
                }
                if (this.checkOnline == 1) {
                    this.showTaskList1(this.videolist[this.nowCheck].fileUuid, this.nowCheck)
                } else if (this.checkOnline == 2) {
                    this.searchReatlList(this.deviceId);
                }
            }
            if (this.ischeckOnline) {
                document.title = document.title + '....'
            } else {
                OnPause('false')
                document.title = title;
            }
            this.showTaskMan = val;
            if (list.length > 0) {
                if (!list[0].deviceId) {
                    clearInterval(this.timeTosearch)
                    clearInterval(this.t)
                    this.videolist = list
                    clearInterval(this.timetoTaskList)
                    this.showTaskList(this.videolist[0].fileUuid, 0)
                    this.checkLis()
                    this.checkOnline = 1
                    setTimeout(() => {
                        this.getoffClickresult(taskInfo, taskIndex)
                    }, 500)

                } else {
                    for (let i = 0; i < this.listTreeData.length; i++) {
                        if (this.listTreeData[i].apes) {
                            for (let j = 0; j < this.listTreeData[i].apes.length; j++) {
                                if (list[0].deviceId == this.listTreeData[i].apes[j].shebeiId) {
                                    this.facilityName = this.listTreeData[i].apes[j].name
                                    this.facilityId = this.listTreeData[i].apes[j].apeId
                                    this.deviceId = this.listTreeData[i].apes[j].shebeiId
                                }
                            }
                        }
                    }
                    // this.checkHis()
                    this.clearInfo();
                    this.checkOnline = 2
                    this.RetalInfoIndex = null
                    this.searchReatlList(list[0].deviceId, taskInfo.taskName)
                    setTimeout(() => {
                        this.showRetalInfo(taskInfo, taskIndex)
                    }, 500)

                }
            } else {
                // this.nowCheck = null
                this.getAllVideo(this.videoPage)
            }
        },


        //任务子组件传值
        //val 表示关闭模态框
        //title是更改播放的title,用户隐藏显示播放器
        //list表示点击的时候闯过来的值
        //deltakslist表示是删除的任务
        // childByTaskMan(val, title, list,deltakslist) {
        //   console.log(val,title,list,deltakslist);
        //   console.log(this.nowCheck,222222);
        //   // this.checkOnline = 1
        //   //  this.checkHis()

        //   //如果有删除项目
        //   if(deltakslist.length){
        //     for (let i = 0; i < deltakslist.length; i++) {
        //       if(this.isnowvideoret.taskUuid = deltakslist[i].taskUuid){
        //         this.BigRetrieval();
        //         this.ImgtwoShow = false
        //         OnStopAll();
        //         this.machine = null
        //       }
        //     }
        //     if(this.checkOnline == 1){
        //       this.showTaskList1(this.videolist[this.nowCheck].fileUuid, this.nowCheck)
        //     }else if(this.checkOnline == 2){
        //       console.log(this.facilityName,this.facilityId,this.deviceId,333);
        //       this.searchReatlList(this.deviceId);
        //     }
        //   }
        //   //如果是在线加载在线播放器，离线则加载离线播放器
        //   if(this.ischeckOnline){
        //     document.title = document.title + '....'
        //   }else{
        //     OnPause('false')
        //     document.title = title;
        //   }
        //   this.showTaskMan = val;
        //   //如果定位的是天网任务则跳转到天网，否则跳转到离线
        //   if (list.length > 0) {
        //     if(list[0].deviceId == null){
        //       clearInterval(this.timeTosearch)
        //       clearInterval(this.t)
        //       this.videolist = list
        //       clearInterval(this.timetoTaskList)
        //       this.showTaskList(this.videolist[0].fileUuid, 0)
        //       this.checkOnline = 2
        //       this.checkLis()
        //     }else{
        //       for (let i = 0; i < this.listTreeData.length; i++) {
        //         if(this.listTreeData[i].apes){
        //           for (let j = 0; j < this.listTreeData[i].apes.length; j++) {
        //             if(list[0].deviceId == this.listTreeData[i].apes[j].shebeiId){
        //               this.facilityName = this.listTreeData[i].apes[j].name
        //               this.facilityId = this.listTreeData[i].apes[j].apeId
        //               this.deviceId = this.listTreeData[i].apes[j].shebeiId
        //             }
        //           }
        //         }
        //       }
        //       this.checkHis()
        //       this.RetalInfoIndex = null
        //       this.searchReatlList(list[0].deviceId)
        //     }
        //   } else {
        //     console.log('查询22');
        //     this.getAllVideo(this.videoPage)
        //   }


        // },
        //打开新增视频检索
        addvideoReatl(row, index) {
            OnPause('true')
            this.indexToval = index
            this.VideoRetalList = row
            this.caseUuid = ''
            this.showVideoRetal = true;
            document.title = document.title.split(".")[0];
        },
        // 关闭检索任务
        childbyVideoReat(val, title) {
            OnPause('false')
            this.showVideoRetal = false;
            document.title = title;
            //1 表示离线播放页面
            if (this.checkOnline == 1) {
                this.nowCheck = this.indexToval
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.showTaskList(this.videolist[this.indexToval].fileUuid, this.indexToval)
                    }, 100);
                })
            } else if (this.checkOnline == 2) {
                setTimeout(() => {
                    this.searchReatlList(this.deviceId);
                }, 1000)

            }

        },
        //打开标注池
        openCommlable() {
            if (document.title.split('.').length == 5) {
                this.ischeckOnline = true
            } else {
                this.ischeckOnline = false
            }
            OnPause('true')
            this.showcommlable = true;
            document.title = document.title.split(".")[0];
            this.hideVideo()
        },
        //打开标注池
        childbyCommLable(val, title) {
            if (this.ischeckOnline) {
                this.showcommlable = val
                document.title = document.title + '....'
            } else {
                OnPause('false')
                this.showcommlable = val
                document.title = title
            }
            this.showVideo();

        },
        //打开手工标注
        openhandwork() {
            this.endHandler()
            this.showtimeimg = false;
            this.workLlable = false
            let times
            clearInterval(times)
            OnPause('true')
            // OnPlayHide('false');
            OnTakeVideoSnapshot(); //执行C++截图的方法
            this.$nextTick(() => {
                times = setInterval(() => {

                    if (window.imgurl != undefined && window.imgurl.length > 20 && window.imgurl.indexOf('.jpg') != -1) {
                        OnvideoHide(); //隐藏播放器
                        this.showhandword = true;
                        if (this.$router.path == '/videoCombat/videoplay') {
                            let datainfo = {
                                offset: 0
                            }
                            this.setdeviceInfo(datainfo)
                        }

                        document.title = document.title.split(".")[0];
                        clearInterval(times)
                    } else if (window.imgurl != undefined && window.imgurl.length > 20 && window.imgurl.indexOf('id=') != -1) {
                        clearInterval(times)
                    }
                }, 100);
            })
            // setTimeout(()=>{
            //     if(window.g_playObj.duration > 0){
            //         this.hideVideo();
            //         let times
            //         clearInterval(times)
            //         if(this.videotime == 0){
            //             return
            //         }
            //         OnPause('true')
            //         OnPlayHide('false');
            //         OnTakeVideoSnapshot(); //执行C++截图的方法
            //         this.$nextTick(() => {
            //             times = setInterval(() => {
            //                 console.log(window.imgurl,788899);
            //             if (window.imgurl != undefined && window.imgurl.length > 20 && window.imgurl.indexOf('.jpg') != -1) {
            //                 OnvideoHide();  //隐藏播放器
            //                 this.showhandword = true;
            //                 if(this.$router.path == '/videoCombat/videoplay'){
            //                 let datainfo = {
            //                     offset:0
            //                 }
            //                 this.setdeviceInfo(datainfo)
            //                 }

            //                 document.title = document.title.split(".")[0];
            //                 clearInterval(times)
            //             }else if(window.imgurl != undefined && window.imgurl.length > 20 && window.imgurl.indexOf('id=') != -1){
            //                 clearInterval(times)
            //             }
            //             }, 100);
            //         })
            //     }else{
            //         this.$notify({
            //             type: 'warning',
            //             message: '请播放视频！',
            //             position: 'bottom-right',
            //             duration: 3000
            //         });
            //     }

            // },800)
            return

        },
        //天网手工标注
        openthehand() {
            if (document.title.split('.').length == 5) {
                this.ischeckOnline = true
                this.openHishandwork();
            } else {
                this.ischeckOnline = false
                this.openhandwork()
            }
        },
        //关闭手工标注
        childbyHandwork(val, title) {
            this.showVideo();
            this.showhandword = val

            if (this.checkOnline == 1) {
                OnvideoShow()
                // OnSetup(1)
                document.title = document.title + '.'
                setTimeout(() => {
                    if (this.ispause) { //表示视频处于暂定状态
                        OnPause('true') //暂停
                    } else { //表示视频处于播放状态
                        OnPause('false') //播放
                    }
                }, 100)
            } else {
                if (this.playrtsp) {
                    document.title = document.title.split('.')[0] + '....'
                } else {
                    OnvideoShow()
                    OnPause('false')
                    document.title = document.title + '.'
                }

            }
        },
        showTaskList1(fileUuid, index) {
            let userId = this.$storage.getSession('userInfo').userId;
            let data = {
                fileUuid: fileUuid,
                commitUser: userId
            }
            this.$http.get('vsas/task/getTaskByVideo', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.taskList = res.data.data
                }
            })
        },
        //隐藏
        hideList(fileUuid, index) {
            this.nowCheck = 11;
            clearInterval(this.timetoTaskList)
        },
        //获取当前文件的检索任务列表 并显示
        showTaskList(fileUuid, index) {
            clearInterval(this.timetoTaskList)
            this.nowCheck = index
            let userId = this.$storage.getSession('userInfo').userId;
            let data = {
                fileUuid: fileUuid,
                commitUser: userId
            }
            this.$http.get('vsas/task/getTaskByVideo', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.taskList = res.data.data
                    this.machine = null
                    if (this.taskList.length == 0) {
                        this.nowCheck = 11;
                        clearInterval(this.timetoTaskList)
                    }
                    this.timetoTaskList = setInterval(() => {
                        setTimeout(() => {
                            this.showTaskList1(fileUuid, index)
                        }, 0)
                    }, 3000)

                }
            })

            // /task/getTaskByVideo
        },
        //删除检索任务
        deleteTask(row, fileUuid, index) {
            if (this.isnowvideoret.taskUuid == row.taskUuid) {
                this.BigRetrieval();
                this.ImgtwoShow = false
                OnStopAll(-1);
            }
            let data = {
                id: row.taskUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post("vsas/task/delete", data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '删除检索任务成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    setTimeout(() => {
                        this.showTaskList(fileUuid, index)
                    }, 10);
                } else {
                    this.$notify({
                        type: 'error',
                        message: '删除检索任务失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        //清除检索列表的显示
        clearVideomore() {
            this.currentPage = 1
            this.allVideoList = []
            this.totalCount = 0
        },
        //暂停
        pausefrag(index) {
            OnPause('true')
            this.showpart = null
        },
        showcircul(index) {
            this.showcir = index
        },
        //隐藏播放按钮
        hidecir() {
            this.showcir = null
        },
        // 单次播放
        circulplay(i) {
            this.palyfrag(this.allVideoList[i], i)
        },
        //天网循环播放
        aaaa(row) {
            this.currentPage = 1
            this.allVideoList = []
            this.playrtsp = false
            this.$store.state.isvideoline = false
            this.BigRetrieval();
            this.ImgtwoShow = false
            this.checkId = 'idPlayer';
            document.title = document.title.split(".")[0] + '.';
            OnInit();
            OnhisExits();
            setTimeout(() => {
                this.allplay(row)
            }, 1500)
        },
        //全部循环播放之前先请求到数据列表以及检索的数据参数 //然后播放视频  得到时间
        allplay(task, i) {
            OnChangeView(1)
            this.limit = 20;
            this.offset = 0;
            this.videoIndex = 0
            this.BigRetrieval();
            this.allVideoList = []
            this.currentPage = 1
            this.showpart = 0
            this.machine = i
            clearInterval(this.retfragment)
            clearInterval(this.timeTwo);
            clearInterval(this.timeFrag) //清除单次循环
            clearInterval(this.thisTime) //清除循环播放
            this.getretfragment(task.taskUuid) //通过任务ID来获取检索任务列表
            this.searchCondition(task.taskUuid); //查询检索任务信息
            this.retfragment = setInterval(() => {
                if (task.status == 0) {
                    this.offset = Number(this.totalCount)
                    this.limit = 40;
                } else {
                    this.offset = Number(this.totalCount)
                    this.limit = 20;
                }
                this.getretfragment(task.taskUuid)
            }, 5000)
            this.isnowvideoret = task
            let allvideoTime = null

            allvideoTime = setInterval(() => {
                if (this.allVideoList.length) {
                    clearInterval(allvideoTime)
                    this.$nextTick(() => {
                        document.getElementById('leftRight').style.width = '85%'
                        document.getElementById('result').style.width = '15%'
                        document.getElementById('result').style.right = '0px'
                        this.ImgfirstShow = true
                        this.ImgtwoShow = false
                        OnChageWindowSize()
                        if (this.ImgfirstShow) {
                            let rulept = this.getpoints();
                            this.commonCtoPlay(this.allVideoList, 0, 'idUrl')
                            // let lastindex =this.allVideoList[0].fileSourcePath.lastIndexOf("/")
                            // let playvalue = this.allVideoList[0].fileSourcePath
                            // let url = sessionStorage.getItem("hdfsAgentAddr");
                            // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
                            // playvalue = playvalue.replace('source', 'decode')
                            // document.getElementById("idUrl").value = url + playvalue;
                            OnPlay(this.searchList.deviceId, rulept);
                            this.timeTwo = setInterval(() => {
                                this.showplay = window.g_playObj.pause
                                this.videotime = window.g_playObj.duration
                                this.palytime = window.g_playObj.timestamp
                                this.speed = window.g_playObj.speed
                            }, 500)
                            setTimeout(() => {
                                this.videoIndex = 0;
                                this.showpart = 0
                                this.Allcircul(0)
                            }, 200);
                        }
                    })
                }
            }, 300)
            setTimeout(() => {
                clearInterval(allvideoTime)
            }, 3000)

            // setTimeout(()=>{

            // },800)
        },
        //循环播放
        Allcircul(a) {
            OnSeek(Math.floor(this.allVideoList[a].startTime / 1000))
            this.thisTime = setInterval(() => {
                if (this.palytime >= Math.floor(this.allVideoList[a].entTime / 1000)) {
                    a++
                    this.videoIndex++
                    this.showpart++
                    if (a >= this.allVideoList.length - 1) {
                        this.$refs.scroll.scrollTop = 0
                        this.currentPage = 1
                        let rulept = this.getpoints()
                        this.commonCtoPlay(this.allVideoList, 0, 'idUrl')
                        // let lastindex =this.allVideoList[0].fileSourcePath.lastIndexOf("/")
                        // let playvalue = this.allVideoList[0].fileSourcePath
                        // let url = sessionStorage.getItem("hdfsAgentAddr");
                        // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
                        // playvalue = playvalue.replace('source', 'decode')
                        // document.getElementById("idUrl").value = url + playvalue;
                        OnPlay(this.searchList.deviceId, rulept);
                        this.videoIndex = 0
                        this.showpart = 0
                        clearInterval(this.thisTime)
                        this.Allcircul(0)
                        OnSpeed(0)
                    } else if (a < this.allVideoList.length) {
                        if (a != 1 && (a + 1) % this.pageSize == 1) {
                            this.currentPage++
                        }
                        this.$refs.scroll.scrollTop = (this.$refs.scroll.scrollHeight - this.$refs.scroll.clientHeight) / 9 * a
                        this.videoIndex = this.videoIndex % 10
                        if (Math.floor(this.allVideoList[a].startTime) < Math.ceil(this.allVideoList[a - 1].entTime)) {
                            if (this.checkOnline == 2) {
                                if (this.videoList[a].fileUuid != this.videoList[a - 1].fileUuid) {
                                    let rulept = this.getpoints()
                                    this.commonCtoPlay(this.allVideoList, a, 'idUrl')
                                    // let lastindex =this.allVideoList[a].fileSourcePath.lastIndexOf("/")
                                    // let playvalue = this.allVideoList[a].fileSourcePath
                                    // let url = sessionStorage.getItem("hdfsAgentAddr");
                                    // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
                                    // playvalue = playvalue.replace('source', 'decode')
                                    // document.getElementById("idUrl").value = url + playvalue;
                                    OnPlay(this.searchList.deviceId, rulept);
                                    OnSeek(Math.ceil(this.allVideoList[a].startTime / 1000))
                                } else {
                                    OnCaseSeek(Math.ceil(this.allVideoList[a - 1].entTime / 1000))
                                }
                            } else {
                                OnSeek(Math.ceil(this.allVideoList[a - 1].entTime / 1000))
                            }
                        } else {
                            OnSeek(Math.floor(this.allVideoList[a].startTime / 1000))
                        }
                    }
                }
                if (a > this.allVideoList.length) {
                    clearInterval(this.thisTime)
                }
            }, 800)
        },
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

        //播放单个片段
        palyfrag(row, index) {
            clearInterval(this.timeFrag)
            clearInterval(this.timeTwo)
            // let startTime = Math.floor(row.startTime / 1000);
            // let endTime = Math.ceil(row.entTime / 1000);
            // let isfirstTime = new Date().getTime();
            let frameTime = Math.ceil(row.frameTime / 1000)
            if (this.videoIndex == index) {
                OnPause('false')
                this.showpart = index
            } else {
                this.commonCtoPlay([row], 0, 'idUrl')
                // let lastindex =row.fileSourcePath.lastIndexOf("/")
                // let playvalue = row.fileSourcePath
                // let url = sessionStorage.getItem("hdfsAgentAddr");
                // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
                // playvalue = playvalue.replace('source', 'decode')
                // document.getElementById("idUrl").value = url + playvalue;
                let rulept = this.getpoints();
                this.timeTwo = setInterval(() => {
                    this.showplay = window.g_playObj.pause
                    this.videotime = window.g_playObj.duration
                    this.palytime = window.g_playObj.timestamp
                    this.speed = window.g_playObj.speed
                }, 500)
                OnPlay(this.searchList.deviceId, rulept); //播放
                OnPause('false') //
                OnSpeed(0) //速率到0
                this.videoIndex = index
                this.showpart = index
                if (frameTime <= 3) { //如果目标出现时间小于第3秒，从第0秒开始放
                    OnSeek(0)
                } else { //如果目标出现在最后4秒或者目标出现在中间
                    OnSeek(frameTime - 3)
                }
            }
            this.timeFrag = setInterval(() => {
                //通过定时器一直刷新当前播放时间
                //如果目标出现时间小于3s 则播放前面4S
                if (frameTime <= 3 && this.palytime >= 4) {
                    //如果当前播放时间大于等于4秒，则从头开始放
                    OnPause('false');
                    OnSeek(0)
                } else if (this.videotime - frameTime < 4 && this.palytime == this.videotime && this.videotime > 0) { //
                    //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
                    OnPause('false');
                    OnSeek(frameTime - 3)
                    this.nowIndex = 3
                } else {
                    //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
                    // OnCaseSeek(frameTime - 3)
                    //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
                    if (this.palytime > (frameTime + 3) || this.palytime < (frameTime - 3)) {
                        OnPause('false');
                        OnSeek(frameTime - 3)
                        this.nowIndex = 3
                    }
                }
            }, 1000)

            // this.timeFrag = setInterval(() => {
            //   if (this.palytime >= endTime) {
            //     let time = new Date().getTime();
            //     if((time- isfirstTime) < 2000 && (endTime - startTime) > 2000){
            //       return
            //     }
            //     isfirstTime = time
            //     OnSeek(startTime)
            //     this.nowIndex = 3
            //   }
            //   if (this.palytime == this.videotime) {
            //     OnSeek(startTime)
            //     this.nowIndex = 3
            //   }
            // }, 500)
        },
        //改变播放进度
        playstep(item, i) {
            this.nowIndex = i
            OnSpeed(item);
        },
        //快进
        gofast() {
            this.endHandler()
            this.nowIndex++
            if (this.nowIndex <= 5) {
                OnSpeed(this.nowIndex - 3);
            } else if (this.nowIndex == 6) {
                OnSpeed(this.nowIndex - 3);
            } else if (this.nowIndex > 6) {
                this.nowIndex = 6
                OnSpeed(3);
            }
        },
        //快退
        goretreat() {
            this.endHandler()
            this.nowIndex--
            console.log(this.nowIndex);
            if (this.nowIndex > 0) {
                OnSpeed(this.nowIndex - 3);
            } else if (this.nowIndex == 0) {
                OnSpeed(this.nowIndex - 3);
            } else if (this.nowIndex < 0) {
                this.nowIndex = 0
                OnSpeed(-3);
            }
        },
        //清除列表定时器
        resetInter() {
            clearInterval(this.timetoTaskList)
            this.nowCheck = 11;
        },
        //视频列表的上一页，下一页
        prevList() {
            this.resetInter();
            this.videoPage -= 1
            if (this.videoPage > 1) {
                this.getAllVideo(this.videoPage)
            } else if (this.videoPage <= 1) {
                this.videoPage = 1
                this.getAllVideo(1)
            }
        },
        nextList() {
            this.resetInter();
            this.videoPage += 1
            let num = Math.ceil(this.videototle / this.videoSize)
            if (num > this.videoPage) {
                this.getAllVideo(this.videoPage)
            } else if (num <= this.videoPage) {
                this.videoPage = num
                this.getAllVideo(num)
            }

        },
        //检索上一页和下一页
        goprev() {
            this.$refs.scroll.scrollTop = 0
            this.showpart = null;
            this.videoIndex = null
            this.currentPage -= 1
            if (this.currentPage <= 1) {
                this.videoIndex = 0
                this.currentPage = 1
                this.showpart = 0
                return
            }
        },
        gonext() {
            this.$refs.scroll.scrollTop = 0
            this.showpart = null;
            this.videoIndex = null
            let num = Math.ceil(this.totalCount / this.pageSize)
            this.currentPage += 1
            if (this.currentPage >= num) {
                this.currentPage = num
            }
        },
        //播放视频
        getplay(index, row) {
            this.setvideoretriInfo(row)
            this.videostartime = 0
            this.$refs.playpro.style.width = 0;
            if (row.status == 4 || row.status == 3) {
                this.isnowvideoret = {}
                this.machine = null
                clearInterval(this.timetoTaskList)
                clearInterval(this.timeToMore)
                clearInterval(this.thisTime)
                clearInterval(this.timeFrag)
                this.$refs.playpro.style.width = 0;
                this.BigRetrieval();
                this.ImgtwoShow = false
                this.nowIndex = 3;
                this.commonCtoPlay(this.videolist, index, 'idUrl')
                // let lastindex = this.videolist[index].fileSourcePath.lastIndexOf("/")
                // let playvalue = this.videolist[index].fileSourcePath
                // let url = sessionStorage.getItem("hdfsAgentAddr");
                // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
                // playvalue = playvalue.replace('source', 'decode')
                // document.getElementById("idUrl").value = url + playvalue;
                OnPlay(row.deviceId, '');
                this.timeTwo = setInterval(() => {
                    this.showplay = window.g_playObj.pause
                    this.videotime = window.g_playObj.duration
                    this.palytime = window.g_playObj.timestamp
                    this.speed = window.g_playObj.speed
                }, 300)

            } else if (row.deviceType == 0) {
                OnStopAll(-1)
                this.$notify({
                    type: 'warning',
                    message: '格式不支持！',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else if (row.status == 5) {
                OnStopAll(-1)
                this.$notify({
                    type: 'warning',
                    message: '解析失败！',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else {
                OnStopAll(-1)
                this.$notify({
                    type: 'warning',
                    message: '正在解析中！',
                    position: 'bottom-right',
                    duration: 3000
                });
            }
        },
        //关闭进度条
        closeproress() {
            this.$refs.playpro.style.width = 0;
            this.palytime = 0;
            this.videotime = 0;
            this.flag = true;
            this.proressshow = false;
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
        //打开检索任务
        createRetrieval() {
            document.getElementById('leftRight').style.width = '85%'
            document.getElementById('result').style.width = '15%'
            document.getElementById('result').style.right = '0px'
            this.ImgfirstShow = true
            this.ImgtwoShow = false
            OnChageWindowSize()
        },
        //检索列表的收起
        BigRetrieval() {
            document.getElementById('leftRight').style.width = '100%'
            document.getElementById('result').style.width = '10px'
            document.getElementById('result').style.right = '-10px'
            this.ImgfirstShow = false
            this.ImgtwoShow = true
            OnChageWindowSize()
        },
        //清空选择
        reset() {
            this.nowCheck = null
            this.videoPage = 1
            this.beginTime = ''
            this.endTime = ''
            this.keyword = ''
            this.resetTime();
            this.getAllVideo(1);
        },
        skynetReset() {
            this.facilityName = ''
            this.showTree = false
            this.beginData = this.getEarlierDate()
            this.endData = this.getCurrentDate()
        },
        onvidoeplay() {
            this.showpart = this.videoIndex
            OnPause('false')
            OnSpeed(this.nowIndex - 3);
        },
        //快进一帧，修改快进一帧的时候清空掉播放速率
        nextframe() {
            OnSetup(1)
            this.nowIndex = 3
        },
        prevframe() {
            OnSetup(-1)
            this.nowIndex = 3
        },
    },

};
export default mixins
