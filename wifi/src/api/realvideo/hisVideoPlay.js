/*
 * @Author: your name
 * @Date: 2019-12-13 17:37:51
 * @LastEditTime : 2021-05-06 14:22:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\api\realvideo\hisVideoPlay.js
 */

// import videoplay from "../../api/realvideo/videoplay.js";
const mixins = {
    data: function () {
        return {
            timetable: [], //历史文件列表
            beginData: this.getEarlierDate(), // 开始时间
            endData: this.getCurrentDate(), // 结束时间
            showTree: false, //显示树形结构
            TreeDate: [], //树形结构的集合
            timeNum: 20, //手工分页条件
            tableData: [], //所有视频列表集合
            defaultProps: {
                children: "apes",
                label: "name"
            },
            facilityName: '', //设备名称
            facilityId: '',
            deviceId: '', //点位ID
            videRetalList: [], //历史检索列表
            allList: [],
            taskMarkList: [],
            RetalInfoIndex: '',
            playrtsp: false, //是否点击了播放按钮
            timeresult: [],
            searchList: {},
        }
    },
    mounted() {
        // this.getKakou();
    },
    // mixins:[videoplay],
    watch: {},
    methods: {
        // 截取图片
        screenshot() {
            if (document.getElementById('idUrl').value == '' || document.getElementById('idUrl').value == null) {
                return
            }
            Ongetseeks()
        },

        openHishandwork() {
            this.getSignDataHandler();
            if (document.getElementById('idUrl').value == '' || document.getElementById('idUrl').value == null) {
                this.$notify({
                    type: 'warning',
                    message: '请播放视频再进行手工标注',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            this.workLlable = false;
            this.startSing = true;
            OnHisSnapshot();
            this.$nextTick(() => {
                setTimeout(() => {
                    if (window.window.imgurl != undefined && window.window.imgurl.length > 20) {
                        this.showhandword = true;
                        document.title = document.title.split("....")[0];
                    }
                }, 1000);
            })
        },
        checkVideo() {
            this.checkId = 'idPlayer';
            // setTimeout(()=>{
            document.title = document.title.split(".")[0] + '.';
            OnInit();
            OnhisExits();
            this.BigRetrieval();
            this.ImgtwoShow = false
            // },500)

        },
        showTreeClick() {
            this.showTree = true;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        //加载更多
        tableLoadMore() {
            this.showData(this.timeNum);
        },
        //播放历史视频
        playhisvideo(row) {
            console.log(row, "kkkkkkkkkkk");
            // return
            this.$store.state.lableBeginTime = this.beginData;
            this.playrtsp = true
            this.$store.state.isvideoline = true
            clearInterval(this.timeId);
            this.RetalInfoIndex = null
            this.checkId = 'hisIdPlayer'
            document.title = document.title.split(".")[0] + '....'
            OnhisInit()
            OnExit();
            this.BigRetrieval();
            this.ImgtwoShow = false
            setTimeout(() => {
                let url = sessionStorage.getItem('controlHead');
                document.getElementById("idUrl").value = url + this.facilityId + "?t=" + row.beginTable.replace(' ', '_') + "@" + row.endTable.replace(' ', '_'); // 最终
                OnhisPlays(this.deviceId);
            }, 2500)
        },

        //点击树形结构获取天网ID
        clickTree(data, checked) {
            this.showTree = false
            if (data.shebeiId == undefined) {
                this.facilityName = ''
                this.$notify({
                    type: 'error',
                    message: '请点击正确的天网设备',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            this.facilityName = data.name
            this.facilityId = data.apeId
            this.deviceId = data.shebeiId
            this.searchReatlList(data.shebeiId, '');
        },
        // 点击其他地方关闭树
        closeTree() {
            if (!(event.target).closest('.treeClass, input')) {
                this.showTree = false
            }
        },
        //查询检索列表
        searchReatlList(id, name) {
            let data = {
                orderBy: 'commitTime',
                orderType: 'desc',
                commitUser: this.$storage.getSession("userInfo").userId,
                taskName: name,
                type: 0,
                status: '',
                begin: '',
                end: '',
                caseUuid: '',
                deviceId: id,
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/task/new/list', data).then(res => {
                if (res.data.code == 200) {
                    this.videRetalList = res.data.data;
                }
            })
        },
        // 点击检索任务列表
        showRetalInfo(row, index) {
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
            this.searchCondition(row.taskUuid);
            this.getretfragment(row.taskUuid);
            this.getClickresult(row)
        },

        //执行天网点击方法

        getClickresult(row) {
            clearInterval(this.timeFrag)
            clearInterval(this.timeTwo)
            clearInterval(this.retfragment)
            this.limit = 20
            this.offset = 0;
            this.videoIndex = null

            if (row.taskUuid) {
                this.searchCondition(row.taskUuid);
                // this.getretfragment(row.taskUuid)
                this.retfragment = setInterval(() => {
                    if (row.status == 0) {
                        this.offset = Number(this.totalCount)
                        this.limit = 40;
                    } else {
                        this.offset = Number(this.totalCount)
                        this.limit = 20;
                    }
                    this.getretfragment(row.taskUuid)

                }, 5000)
                setTimeout(() => {
                    if (this.allVideoList.length > 0) {
                        this.$nextTick(() => {
                            document.getElementById('leftRight').style.width = '85%'
                            document.getElementById('result').style.width = '15%'
                            document.getElementById('result').style.right = '0px'
                            this.ImgfirstShow = true
                            this.ImgtwoShow = false
                            OnChageWindowSize()
                        })
                        this.palyfrag(this.allVideoList[0], 0)
                    }

                }, 2000)
            }
            // let count = 0
            // let getTimes = null
            // getTimes = setInterval(()=>{
            //   count ++
            //   if(this.allVideoList.length){
            //     setTimeout(()=>{
            //     clearInterval(getTimes)
            //       this.$nextTick(() => {
            //         document.getElementById('leftRight').style.width = '85%'
            //         document.getElementById('result').style.width = '15%'
            //         document.getElementById('result').style.right = '0px'
            //         this.ImgfirstShow = true
            //         this.ImgtwoShow = false
            //         OnChageWindowSize()
            //       })
            //       this.palyfrag(this.allVideoList[0], 0)
            //     },2000)
            //   }
            //   if(count >= 20){
            //     clearInterval(getTimes)
            //   }
            // },300)

        },
        //执行离线视频点击方法
        getoffClickresult(row, index) {
            OnChangeView(1)
            OnStopAll(-1);
            this.videoIndex = null;
            this.limit = 10;
            this.offset = 0
            clearInterval(this.timeFrag)
            clearInterval(this.timeTwo)
            clearInterval(this.retfragment)
            clearInterval(getTimes)
            this.allVideoList = []
            this.machine = index
            this.isnowvideoret = row
            if (row.taskUuid) {
                //请求当前的检索数量
                this.getretfragment(row.taskUuid)
                //查询检索条件的接口
                this.searchCondition(row.taskUuid);
                this.retfragment = setInterval(() => {
                    if (row.status == 0) {
                        this.offset = Number(this.totalCount)
                        this.limit = 40;
                    } else {
                        this.offset = Number(this.totalCount)
                        this.limit = 20;
                    }
                    this.getretfragment(row.taskUuid)
                }, 5000)
            }

            let count = 0
            let getTimes = null
            getTimes = setInterval(() => {
                count++
                if (this.allVideoList.length) {
                    clearInterval(getTimes)
                    this.$nextTick(() => {
                        document.getElementById('leftRight').style.width = '85%'
                        document.getElementById('result').style.width = '15%'
                        document.getElementById('result').style.right = '0px'
                        this.ImgfirstShow = true
                        this.ImgtwoShow = false
                        console.log('汉字1');
                        OnChageWindowSize()
                    })
                    this.palyfrag(this.allVideoList[0], 0)
                }
                if (count >= 20) {
                    clearInterval(getTimes)
                }
            }, 300)
            setTimeout(() => {
                clearInterval(getTimes)
            }, 4000)
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
                    if (res.data.data.isSpecial == 1) {
                        this.showJudeg = true
                    }
                    this.taskName = res.data.data.taskName
                    this.searchList = res.data.data.taskSearch
                    this.deviceId = res.data.data.taskSearch.deviceId
                    // this.videoImg = res.data.data.taskSearch.snapUrl.split(',')
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

        //5.28修改全部循环播放问题
        //得到当前天网的的检索任务列表
        getretfragment(taskUuid) {
            let params = {
                limit: this.limit,
                offset: this.offset,
                taskUuid: taskUuid
            }
            this.$http.get('vsas/task/search/multiFile/retrieval', {
                params: params
            }).then(res => {
                let result = []
                console.log(res, '检索结果');
                if (res.data.code == 200) {
                    if (res.data.data == null) {
                        result = []
                    } else {
                        result = res.data.data
                    }
                    // this.getTransCodin(result)
                    this.allVideoList = this.allVideoList.concat(result)
                    this.totalCount = this.allVideoList.length
                }
            })
        },
        //获取C++返回的当前时间以及是否转码完成
        getTransCodin(list) {
            if (list.length == 0) {
                return
            }
            let url = sessionStorage.getItem("hdfsAgentAddr");
            for (let i = 0; i < list.length; i++) {
                let lastindex = list[i].fileSourcePath.lastIndexOf("/")
                let playvalue = list[i].fileSourcePath
                // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
                // 修改为非大数据
                playvalue = playvalue.slice(lastindex - 87, playvalue.length)
                playvalue = playvalue.replace('source', 'decode')
                let val = url + playvalue
                setTimeout(() => {
                    this.$http.post('/searchHisImg/TouchFile?file=' + val).then(res => {
                        this.timeresult.push(res.data.duration)
                    })
                }, 100)

            }
        },
        //得到检索视频
        setHisRetalVideo() {
            this.allVideoList = []
            let data = {
                pageNum: 1,
                pageSize: 10,
                taskUuid: row.taskUuid,
                orderBy: '',
                orderType: '',
            }
            this.$http.get('vsas/task/video/retrieval', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data.list.length == 0) {
                        this.BigRetrieval();
                        this.ImgtwoShow = false
                    } else {
                        this.allVideoList = res.data.data.list;
                        this.totalCount = res.data.data.totalCount
                    }
                }
            })
        },
        //查询历史天网列表
        searchHisList() {
            if (this.$commons.isEmpty(this.facilityId)) {
                this.$notify({
                    type: 'warning',
                    message: '请选择天网探头！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            this.timetable = []
            this.$store.state.lableBeginTime = this.beginData
            this.$http.post("/history/GetRecordList?id=" + this.facilityId +
                    "&st=" + this.beginData.replace(' ', '_') +
                    "&et=" + this.endData.replace(' ', '_'))
                .then(res => {
                    if (res.data.status == 'ok') {
                        this.tableData = res.data.rcds;
                        // console.log(this.tableData,"这个数据");
                        this.timeNum = 20
                        if (this.tableData.length) {
                            // this.timetable = [{st:this.beginData,et:this.endData}]
                            // this.tableData = '';
                            //执行对时间段切片的操作
                            this.inquireTime()
                        } else {
                            // this.timetable = []
                            this.$notify({
                                type: 'warning',
                                message: '暂无数据',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        }
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '天网视频查询失败',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }

                }).catch(() => {
                    this.$notify({
                        type: 'error',
                        message: '天网视频查询失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                })
        },
        // 对时间进行切片处理的函数
        inquireTime() {
            // this.$refs.table.clearSelection();
            // this.timetable = [];
            let begin = new Date(this.beginData).getTime();
            let end = new Date(this.endData).getTime();
            // console.log(begin,end,"查看最新的两个时间");
            let beginStart = Math.ceil((end - begin) / (1000 * 60 * 60));
            if (beginStart > 0) {
                let storeTime = [this.gety(begin)];
                let timeArr = [];
                let beginDate = begin;
                // console.log(beginStart,"处理之后的beginStart");
                // console.log(storeTime,"看看这是定义的什么");
                for (let i = 0; i < beginStart; i++) {
                    beginDate = beginDate + 1000 * 60 * 60;
                    storeTime.push(this.gety(beginDate));
                }
                storeTime.splice(storeTime.length - 1, 1, this.endData);
                for (let k = 0; k < storeTime.length - 1; k++) {
                    timeArr.push({
                        id: k,
                        beginTable: storeTime[k],
                        endTable: storeTime[k + 1]
                    });
                }
                this.timetable = timeArr;
                // this.total = this.timetable.length;
            } else {
                let begin = new Date(this.beginData);
                let end = new Date(this.endData);
            }
        },


        // 分页
        showData(num) {
            num += 20
            this.timetable = this.tableData.slice(0, num);
            this.timeNum = num;
        },
        // 创建检索任务
        OpenvideoReatl() {
            if (this.playrtsp) {
                window.imgurl = ''
                OnPlayHide('false');
                OnHisSnapshot();
                this.VideoRetalList = {}
                var timeHis = setInterval(() => {
                    if (window.imgurl != undefined && window.imgurl.length > 10) {
                        clearInterval(timeHis)
                        this.showVideoRetal = true;
                        document.title = document.title.split("....")[0];
                    }
                }, 200)
            } else {
                this.$notify({
                    type: 'warning',
                    message: '请播放天网视频！',
                    position: 'bottom-right',
                    duration: 3000
                });
            }

        },

        searchAll(row) {
            // console.log(row,666);
            let data = {
                taskUuid: row.taskUuid,
                deviceId: this.deviceId,
                caseUuid: ''
            }
            data = this.$qs.stringify(data);
            this.$http.post('vsas/task/list/fileInfo', data).then(res => {
                if (res.data.code == 200) {
                    // console.log(res,999);
                    this.allList = res.data.data
                }

            })
        },
    }
};
export default mixins
