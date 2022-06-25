/*
 * @Author: your name
 * @Date: 2020-01-06 15:06:49
 * @LastEditTime : 2021-07-08 16:12:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\api\newCaseVideo\NewTaskMan.js
 */
import _ from 'lodash'
const mixins = {
    data: function () {
        return {
            optionsOneStrus: [ //任务类型
                {
                    value: "0",
                    label: "视频检索"
                },
                {
                    value: "1",
                    label: "视频结构化"
                },
                {
                    value: "6",
                    label: "结构化转标注"
                },
                {
                    value: "4",
                    label: "结构化结果导出"
                },
                {
                    value: "5",
                    label: "检索结果导出"
                },
                {
                    value: "7",
                    label: "转码视频导出"
                },


            ],
            optionsPoint: [],
            glstStrus: false,
            optionsTwo: [ //任务状态
                {
                    value: '',
                    label: "全部"
                },
                {
                    value: "0",
                    label: "已完成"
                },
                {
                    value: "1",
                    label: "执行中"
                },
                {
                    value: "3",
                    label: "排队"
                },
                {
                    value: "9",
                    label: "停止"
                },
                {
                    value: "10",
                    label: "失败"
                },
                {
                    value: "4",
                    label: "获取视频流"
                },
                {
                    value: "5",
                    label: "文件处理中"
                }
            ],
            beginTime: '', //开始时间
            endTime: '', //结束时间
            tasktype: '0', //任务类型
            Pointscreen: '', // 点位筛选
            taskstatus: '', //任务状态
            tableData: [], //任务数组
            currentPage: 1, // 当前页码
            pageSize: 10, //每页显示的条数
            totalCount: 0, //数据总条数
            orderBy: "updateTime",
            orderType: "desc",
            taskname: "", //任务名称
            isdisableBegin: [], //开始
            isdisableTop: [], //置顶
            isdisableSuspend: [], //取消
            timeId: null, //刷新定时器 检索，结构化，实时结构化的
            timeId2: null, //人脸布控的
            videolist: [],
            dialogVisible1: false, //详情提示框
            size: '',
            clarity: '',
            type: '',
            videoProse: [],
            DetailList2: {},
            proptaskUuid: '',
            isOpenDetail: false,
            num: 0,
            deltakslist: [], //删除的任务数组
            visualist: [], // 检索结果列表
            showStatus: false,
            isopenStrus: false, //是否打开视频结构化
            taskInfo: {},
            taskIndex: 0,
            istaskName: null,
            isdownload: false, //显示是否被下载的按钮
            downloadList: [], //每当有一次结构化任务被下载后，就对这个数组进行push
            flag: false, //对结构化结果的每一项数据加一个标识符
            btnStatusList: [],
            btndisList: [],
            isopenAddkakouPoint: false, //是否展示卡口数据上传任务
            lookbayonet: false, //卡口数据上传结果弹层
            currentData: {}, //保存数据用的
            arrs: [],
            isSuperVise: false, //是否展示布控任务列表，默认为false
            superviseTableData: [],//布控任务列表
        }
    },

    watch: {
        //监听类型的改变改变状态值
        tasktype(val) {
            if (val == 0 || val == 1) {
                this.optionsTwo = [ //任务状态
                    {
                        value: '',
                        label: "全部"
                    },
                    {
                        value: "0",
                        label: "已完成"
                    },
                    {
                        value: "1",
                        label: "执行中"
                    },
                    {
                        value: "3",
                        label: "排队"
                    },
                    {
                        value: "9",
                        label: "停止"
                    },
                    {
                        value: "10",
                        label: "失败"
                    },
                    {
                        value: "4",
                        label: "获取视频流"
                    },
                    {
                        value: "5",
                        label: "文件处理中"
                    }
                ]
            }else if(val == 10){
                this.optionsTwo = [
                    {
                        value: "0",
                        label: "已完成"
                    },
                    {
                        value: "1",
                        label: "执行中"
                    },
                    {
                        value: "2",
                        label: "停止"
                    },
                ]
            }else {
                this.optionsTwo = [ //任务状态
                    {
                        value: '',
                        label: "全部"
                    },
                    {
                        value: "0",
                        label: "已完成"
                    },
                    {
                        value: "1",
                        label: "执行中"
                    },
                    {
                        value: "3",
                        label: "排队"
                    },
                    {
                        value: "10",
                        label: "失败"
                    }
                ]
            }
        },
        //监听置顶对象的变量，用于判断是否禁用当前按钮
        btnStatusList: {
            handler(val) {
                let arr = this.tableData
                this.btndisList = []
                if (val.length) {
                    for (let i = 0; i < arr.length; i++) {
                        this.btndisList.push(false)
                        for (let j = 0; j < val.length; j++) {
                            if (arr[i].taskUuid == val[j].taskUuid) {
                                this.btndisList[i] = true
                            }
                        }
                    }
                }
            },
            deep: true
        }
    },
    filters: {
        status(val) {
            if (val == 1) {
                return '执行中';
            } else if (val == 2) {
                return '暂停';
            } else if (val == 3) {
                return '排队';
            } else if (val == 9) {
                return '取消';
            } else if (val == 0) {
                return '已完成'
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

    },
    created() {
        this.isopenAddkakouPoint = sessionStorage.getItem('isopenAddkakouPoint');
        if (this.isopenAddkakouPoint == 'true') {
            this.optionsOneStrus.push({
                value: "8",
                label: "卡口数据上传"
            }, )
        }

    },
    methods: {

        childByDetail(val) {
            if (this.$route.path != '/videoCombat/videoplay') {
                OnExit();
                CloseVodPlayer();
            }

            this.tasktype = '0';
            this.isOpenDetail = val
        },
        childByStrus(val) {
            if (this.$route.path != '/videoCombat/videoplay') {
                OnExit();
                CloseVodPlayer();
            }
            this.isopenStrus = val
            this.tasktype = '1';
        },
        names(row, column, val) {
            var index = val.lastIndexOf("\/");
            val = val.substring(index + 1, val.length);
            return val
        },
        changestate(val) {
            this.currentPage = 1
        },
        //切换的任务类型时候清空数据
        clearData() {
            this.tableData = []
            this.totalCount = 0;
            this.num = 0
            this.taskstatus = ''
            this.Pointscreen = '';
            this.currentPage = 1;
            //切换任务是结构化结果时取出session，有就有，没有我就给他加上
            this.downloaded()
            if (this.tasktype == 3 || this.tasktype == 4 || this.tasktype == 5 || this.tasktype == 6 || this.tasktype == 7 || this.tasktype == 10) {
                this.istaskName = 1
            } else {
                this.istaskName = null
            }
            //等于10，代表是布控,查询布控的数据
            if (this.tasktype == 10) {
                this.isSuperVise = true
                //先清除掉结构化，检索，实时的定时器
                clearTimeout(this.timeId)
                this.timeId = null
                // this.timeId2 = null
                this.getManFaceVise()
            } else {
                //查询结构化，检索和实时的数据
                this.isSuperVise = false
                clearInterval(this.timeId2)
                this.timeId2 = null
                // this.getNewTaskData()
            }
        },
        //监听切换到人脸布控任务时调的接口
        //查询人脸布控的数据
        getManFaceVise() {
            // clearTimeout(this.timeId2)
            let data = {
                taskName: this.taskname,
                type: this.tasktype, //任务类型
                statusl: this.taskstatus, //任务状态
                begin: this.beginTime,
                end: this.endTime,
                orderBy: 'commitTime',
                orderType: 'desc',
            }
            data = this.$qs.stringify(data)
            this.$http.post("vsas/task/deploy/queryList", data).then(res => {
                if(res.data.code == 200){
                clearInterval(this.timeId2)
                this.timeId2 = null
                this.timeId2 = setInterval(() => {
                    this.setCount++
                    this.getManFaceVise();
                }, 5000 * Math.ceil(this.setCount / 200))
                this.superviseTableData = res.data.data.list;
                this.totalCount = res.data.data.totalCount;
                }
            })
        },
        //查询数据
        getNewTaskData() {
            clearTimeout(this.timeId)
            this.getSize();
            let userId = this.$storage.getSession("userInfo").userId
            let taskstatus
            if (this.taskstatus == 5) {
                taskstatus = '5,6'
            } else {
                taskstatus = this.taskstatus
            }
            let data = {
                orderBy: this.orderBy,
                orderType: this.orderType,
                commitUser: userId,
                taskName: this.taskname,
                type: this.tasktype, //任务类型
                statusl: taskstatus, //任务状态
                begin: this.beginTime,
                end: this.endTime,
                caseUuid: this.caseUuid,
                deviceId: this.Pointscreen,
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            };
            //  this.$http.get("vsas/task/list", {
            this.$http.get("vsas/task/new/list", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    clearTimeout(this.timeId)
                    this.timeId = null
                    this.timeId = setTimeout(() => {
                        this.setCount++
                        this.lineUpTime();
                        this.getNewTaskData();
                    }, 5000 * Math.ceil(this.setCount / 200))
                    this.tableData = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.$set(this.tableData[i], 'showlist', false)
                    };
                    if (this.tableData.length == 0 && this.currentPage > 1) {
                        this.currentPage--
                        this.getNewTaskData();
                    }
                    //取出session里面保存的所有用户已经下载过的任务taskUuid，
                    let array = JSON.parse(window.sessionStorage.getItem("downloadList"));
                    //调用比对函数
                    this.screenSession(array, this.tableData)
                }
            });
        },

        //状态码判断
        formatStatus(row, column, cellValue) {
            if (cellValue == 1) {
                return '执行中';
            } else if (cellValue == 9) {
                return '停止';
            } else if (cellValue == 3) {
                return '排队';
            } else if (cellValue == 2) {
                return '暂停';
            } else if (cellValue == 4) {
                return '获取视频流';
            } else if (cellValue == 5 || cellValue == 6) {
                return '文件处理中';
            } else if (cellValue == 10) {
                this.showStatus = true
                return '失败';
            } else if (cellValue == 0) {
                return '已完成';
            }
        },
        //布控列表任务状态码
        formatStatusVise(row, column, cellValue) {
            if (cellValue == 0) {
                return '已完成';
            } else if (cellValue == 1) {
                return '执行中';
            } else if (cellValue == 2) {
                return '停止';
            }
        },
        formatdeviceStatus(row, column, cellValue) {
            if (cellValue == -1) {
                return '获取中';
            } else if (cellValue == 4) {
                return '在线';
            } else {
                return '异常';
            }
        },
        formataskTime(row, column, cellValue) {
            return row.commitTime
        },

        formatasktype(row, column, cellVlaue) {
            if (row.type == 0) {
                return '视频检索';
            } else if (row.type == 1) {
                return '视频结构化';
            } else if (row.type == 2) {
                return '实时结构化';
            } else if (row.type == 4) {
                return '结构化结果导出';
            } else if (row.type == 5) {
                return '检索结果导出';
            } else if (row.type == 6) {
                return '结构化转标注';
            } else if (row.type == 7) {
                return '转码视频导出'
            } else if (row.type == 8) {
                return '卡口数据上传'
            }

        },
        //开始
        beginTask(row, index) {
            // if(row.status != 9){
            //   return
            // }
            clearTimeout(this.timeId)
            row.showlist = true
            let data = {
                id: row.taskUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post("vsas/task/start", data).then(res => {
                if (res.data.code == 200) {
                    this.getNewTaskData();
                    this.$notify({
                        type: 'success',
                        message: '开始成功',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        //停止
        suspend(row, e) {
            clearTimeout(this.timeId)
            row.showlist = true
            if (e.target.disabled) {
                return
            }
            let data = {
                id: row.taskUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post("vsas/task/cancel", data).then(res => {
                if (res.data.code == 200) {
                    this.getNewTaskData();
                    this.$notify({
                        type: 'success',
                        message: '停止成功',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        //置顶
        getstick(row) {
            // if (row.status != 3) {
            //   return
            // }
            this.btnStatusList.push({
                taskUuid: row.taskUuid,
                top: true
            })
            clearTimeout(this.timeId)
            let data = {
                id: row.taskUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post("vsas/task/top", data).then(res => {
                if (res.data.code == 200) {
                    this.getNewTaskData();
                    for (let i = 0; i < this.btnStatusList.length; i++) {
                        if (row.taskUuid == this.btnStatusList[i].taskUuid) {
                            this.btnStatusList.splice(i, 1)
                        }
                    }
                    this.$notify({
                        type: 'success',
                        message: '置顶成功',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else if (res.data.code == 300300) {
                    this.getNewTaskData();
                }
            }).catch(() => {
                this.$notify({
                    type: 'warning',
                    message: '置顶失败',
                    position: 'bottom-right',
                    duration: 3000
                });
            })
        },
        //重试
        retry(row) {
            clearTimeout(this.timeId)
            row.showlist = true
            let data = {
                id: row.taskUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post("vsas/task/retry", data).then(res => {
                if (res.data.code == 200) {
                    this.getNewTaskData();
                }
            });
        },
        //删除任务
        deleteTask(row) {
            let cameraType = 0
            for (let i = 0; i < this.optionsPoint.length; i++) {
                if (row.deviceId == this.optionsPoint[i].deviceUuid) {
                    cameraType = this.optionsPoint[i].cameraType
                }
            }
            this.$myconfirm({
                    type: '提示',
                    msg: '删除该任务会导致相关分析结果丢失，是否删除',
                    icon: 1,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    let data = {
                        id: row.taskUuid
                    };
                    this.loading = this.$loading({
                        lock: true,
                        background: "rgba(255,255,255,0.2)",
                        text: "正在删除！"
                    });
                    let searchUuid = row.searchUuid
                    data = this.$qs.stringify(data);
                    this.$http.post("vsas/task/delete", data).then(res => {
                        this.loading.close();
                        if (res.data.code == 200) {
                            //通过searchUuid 来停止拉流
                            if (cameraType == 1) {
                                let url = sessionStorage.getItem('skyNetVideoSearchPath') + '/delete/?searchUuid=' + searchUuid
                                let onescript = document.createElement("script");
                                onescript.src = url;
                                document.body.appendChild(onescript)
                            }
                            this.deltakslist.push(row)
                            this.lineUpTime();
                            this.getNewTaskData();
                            this.$notify({
                                type: 'success',
                                message: '任务删除成功',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        } else {
                            this.$notify({
                                type: 'error',
                                message: '任务删除失败',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        }
                    });
                })
                .catch(() => {})
        },
        // 下载
        downloadTask(row, index) {
            this.tableData[index].isDown = true
            let str = row.taskName.split('_'); // 截取目标类型
            let strType = str[str.length - 1]
            if (this.tasktype == 7) {
                if (row.status != 0) {
                    this.$notify({
                        type: 'warning',
                        message: '只能下载完成的任务！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                }
                window.open('http://' + sessionStorage.getItem('vsasModuleUrl') + '/download/decode/full/video/down?taskUuid=' + row.taskUuid)
            } else {
                let data = {
                    taskUuid: row.taskUuid,
                };
                data = this.$qs.stringify(data);
                this.$http.post("vsas/task/structure/result/batch/export", data).then(res => {
                    if (res.data.code == 200) {
                        let url = res.data.data.path
                        let times = {}
                        let downloadVideo = []
                        if (url.indexOf('[') !== -1) {
                            times = JSON.parse(url)
                            downloadVideo = times.map((obj, next) => {
                                return obj.url
                            })
                        } else {
                            url = res.data.data.path;
                            downloadVideo = url.split(',');
                        }
                        // 检索片段下载需带上对应的片段抠图
                        for (let i = 0; i < downloadVideo.length; i++) {
                            if (downloadVideo[i].indexOf('结构化') !== -1) {
                                let str = downloadVideo[i]
                                let index = str.lastIndexOf("\/")
                                let index1 = str.lastIndexOf("\.")
                                let prevStr = str.substring(index + 1, str.length).split('.')[0]
                                let lastStr = str.substring(index1 + 1, str.length)

                                if (lastStr !== 'zip' && lastStr !== 'flv') {
                                    downloadSelfName(downloadVideo[i], `${this.dataCaseInfo.caseName}_${prevStr}.${lastStr}`)
                                } else if (lastStr !== 'zip' && str == 'flv') {
                                    downloadSelfName(downloadVideo[i], `${this.dataCaseInfo.caseName}_${prevStr}.${lastStr}`)
                                } else if (lastStr == 'zip') {
                                    downloadSelfName(downloadVideo[i], `${this.dataCaseInfo.caseName}_${prevStr}`)
                                }
                            } else {
                                let str = downloadVideo[i]
                                let index = str.lastIndexOf("\.")
                                str = str.substring(index + 1, str.length)
                                if (str !== 'zip' && str !== 'flv' && downloadVideo[i].indexOf('.z') === -1) {
                                    downloadSelfName(downloadVideo[i], `${this.dataCaseInfo.caseName}_${row.cameraName}_${row.commitTime}.${str}`)
                                } else if (str !== 'zip' && str == 'flv') {
                                    let aaa = downloadVideo[i].split('group')[0]
                                    let url = downloadVideo[i].replace(aaa, window.origin + '/fastDfs/')
                                    downloadSelfName(url, `${this.dataCaseInfo.caseName}_${row.cameraName}_${times.startTime}_${times.endTime}.${str}`)
                                } else if (str == 'zip' || downloadVideo[i].indexOf('.z') !== -1) {
                                    downloadSelfName(downloadVideo[i], `${this.dataCaseInfo.caseName}_${row.commitTime}_${strType}.${str}`)
                                }
                            }
                        };
                        // if(this.tasktype == 4){
                        //改变当前这条数据的flag，标识这条数据已经被下载过了
                        row.flag = true;
                        //从session里面取出这个值，用一个数组来接收
                        let arr = this.downloaded()
                        //对这个数组进行push
                        arr.push(row.taskUuid);
                        //push完毕后重新写入session
                        window.sessionStorage.setItem("downloadList", JSON.stringify(arr))

                        // }
                    } else if (res.data.code == 100) {
                        this.$notify({
                            type: 'warning',
                            message: '只能下载完成的任务！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                }).catch(() => {})
            }
        },

        downloadSelfName(url, filename, arrs, index) {
            this.getBlob(url, (blob) => {
                this.saveAs(blob, filename)
            }, arrs, index)
        },
        // 转成文件流
        getBlob(url, cb, arrs, index) {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.onload = () => {
                if (xhr.status == 200) {
                    index++
                    if (index > this.arrs.length - 1) {
                        return
                    } else {
                        cb(xhr.response)
                        this.downloadSelfName(this.arrs[index], 2, this.arrs, index)
                    }

                }
            }
            xhr.send()
        },

        // 自定义文件流名称，下载
        saveAs(blob, filename) {
            var link = document.createElement('a')
            var body = document.querySelector('body')
            link.href = window.URL.createObjectURL(blob)
            link.download = filename
            link.style.display = 'none'
            body.appendChild(link)
            link.click()
            body.removeChild(link)
            window.URL.revokeObjectURL(link.href)
        },
        //对取出的session和所有结果进行比对，一旦匹配上了，就把那条数据的flag变为true
        screenSession(data, row) {
            for (let i in data) {
                for (let j in row) {
                    if (data[i] == row[j].taskUuid) {
                        row[j].flag = true;
                    }
                }
            }
        },
        //切换任务时验证是否有session
        downloaded() {
            //验证session里面是否有这个，如果没有，说明用户是第一次进入，还没有下载过任何结构化结果的视频,我们就给他创建一下
            let sessionDown = JSON.parse(sessionStorage.getItem("downloadList"))
            if (sessionDown == null) {
                let arr = []
                window.sessionStorage.setItem("downloadList", JSON.stringify(arr))
                //设置进去后取出来看看长度
                arr = JSON.parse(sessionStorage.getItem("downloadList"))
                return arr
            } else if (sessionDown) {
                return sessionDown
            }
        },
        // 重命名下载文件
        // downloadSelfName(url, filename) {

        // },
        // 监听每页条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
            if(this.tasktype == 10){
                this.getManFaceVise()
            }else {
                this.lineUpTime();
                this.getNewTaskData();
            }
        },
        // 监听当前页码
        handleCurrentChange(val) {
            this.currentPage = val;
            if(this.tasktype == 10){
                this.getManFaceVise()
            }else {
                this.lineUpTime();
                this.getNewTaskData();
            }
        },
        //获取排队
        lineUpTime() {
            let data = {
                type: this.tasktype
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/task/wait/listCount', data).then(response => {
                if (response.data.code == 200) {
                    this.num = response.data.data;
                } else {
                    this.$notify({
                        type: "error",
                        message: "获取排队数量失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            })
        },

        //重置
        // reset() {
        //     this.tableData = []
        //     this.totalCount = 0;
        //     this.num = 0
        //     this.currentPage = 1
        //     this.taskname = ''
        //     this.endTime = ''
        //     this.beginTime = ''
        //     this.tasktype = "0" //任务类型
        //     this.taskstatus = "" //任务状态
        //     this.Pointscreen = '' //点位
        //     this.lineUpTime();
        //     this.resetTime();
        //     this.getNewTaskData();
        // },
        opdioag(index, row) {
            if (this.tasktype == 3 || this.tasktype == 4 || this.tasktype == 5 || this.tasktype == 6 || this.tasktype == 7) {
                return
            } else if (this.tasktype == 8) {
                this.proptaskUuid = row.taskUuid
                this.currentData = row;
                this.lookbayonet = true;
                return
            }
            this.$parent.getInfoToDeviceATask(row.taskUuid, '', this.tasktype).then(res => {
                if (res.code == 200) {
                    let list = {}
                    if (res.data == null) {
                        list = {
                            cameraName: '',
                            cameraUuid: '',
                            deviceUuid: '',
                            offset: 0,
                        }
                    } else {
                        list = {
                            cameraName: res.data.cameraName,
                            cameraUuid: res.data.cameraUuid,
                            deviceUuid: res.data.deviceUuid,
                            latitude: res.data.latitude,
                            longitude: res.data.longitude,
                            offset: res.data.offset,
                            type: res.data.cameraType
                        }
                    }
                    this.setdeviceInfo(list)
                    sessionStorage.setItem('deviceInfo', JSON.stringify(list))
                    this.taskInfo = row
                    this.taskIndex = index
                    if (this.$route.path != '/videoCombat/videoplay') {
                        CloseVodPlayer();
                    }
                    this.videolist = []
                    this.loading = this.$loading({
                        lock: true,
                        background: "rgba(255,255,255,0.2)",
                        text: "加载中"
                    });
                    // clearInterval(this.timeId)
                    //表示的是结构化0表示检索，1表示结构化
                    if (row.type == 0) {
                        this.loading.close();
                        //表示极速作战部分
                        if (this.caseUuid == '') {
                            if (row.deviceId) {
                                this.videolist.push(row)
                                this.dialogVisible = false
                            } else {
                                let data = {
                                    taskUuid: row.taskUuid
                                }
                                this.$http.get('vsas/collection/offline/getFileInfoByTask', {
                                    params: data
                                }).then(res => {
                                    if (res.data.code == 200) {
                                        this.dialogVisible = false
                                        this.videolist = res.data.data
                                    } else {
                                        this.$notify({
                                            type: 'warning',
                                            message: '请输入经纬度',
                                            position: 'bottom-right',
                                            duration: 3000
                                        });
                                        return
                                    }
                                })
                            }

                        } else {
                            this.proptaskUuid = row.taskUuid
                            this.isOpenDetail = true;
                        }
                    } else if (row.type == 1) {
                        this.setstrusResult({})
                        this.settargetToSearchImg({})
                        this.loading.close();
                        this.settargetToOenStrus(1)
                        // if(row.status == 0){
                        this.isopenStrus = true
                        this.setglststrusInfo({})
                        this.proptaskUuid = row.taskUuid
                        // }
                    }
                } else {
                    this.$notify({
                        type: "warning",
                        message: "当前点位没有任务",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
            return
        },
        clickTerval(row) {
            this.isOpenDetail = true
            this.detailist = row
        },
        strusclose(val) {
            this.isopenStrus = val;
            this.dialogVisible = false;
            this.$emit('taskmanstrus', false)
        },
        // 跳转到以图搜图
        childretrieval(val) {
            this.dialogVisible = false
            this.$emit('taskretrieval', true)
        },
        //关闭卡口数据上传详情
        childBylookbayonet(val) {
            this.lookbayonet = val;
            // this.closeDia()
        },
        openFastSearchCar(res) {
            this.closeDia()
            this.$parent.opensearchCarImg(res)
            // this.$parent.openSeekCarImg(res)
        },
        deleteAll() {
            let userId = this.$storage.getSession("userInfo").userId
            let taskstatus
            if (this.taskstatus == 5) {
                taskstatus = '5,6'
            } else {
                taskstatus = this.taskstatus
            }
            let data = {
                orderBy: this.orderBy,
                orderType: this.orderType,
                commitUser: userId,
                taskName: this.taskname,
                type: this.tasktype, //任务类型
                statusl: taskstatus, //任务状态
                begin: this.beginTime,
                end: this.endTime,
                caseUuid: this.caseUuid,
                deviceId: this.Pointscreen
            };
            //  this.$http.get("vsas/task/list", {
            this.$http.get("vsas/task/new/list", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    let list = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        list.push(new Promise((resove, rej) => {
                            let ccc = {
                                id: res.data.data[i].taskUuid
                            };
                            ccc = this.$qs.stringify(ccc);
                            this.$http.post("vsas/task/delete", ccc).then(res => {
                                resove(res.data.data)
                            });
                        }))
                    }

                    Promise.all(list).then((res) => {
                        this.getNewTaskData()
                    })
                }

            });
        },
        //停止布控任务
        stopViseTask(row) {
            let data = {
                taskDeployId: row.taskDeployId
            }
            data = this.$qs.stringify(data)
            this.$http.post("vsas/task/deploy/stopDeployTask", data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: "success",
                        message: "任务停止成功！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: "warning",
                        message: "任务停止失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
                this.getManFaceVise()
            })
        },
        //删除布控任务
        deleteViseTask(row) {
            this.$myconfirm({
                type: '提示',
                msg: '删除该任务会导致相关结果丢失，是否删除?',
                icon: 1,
                btn: {
                    ok: '确定',
                    no: '取消'
                }
            }).then(() => {
                let data = {
                    taskDeployId: row.taskDeployId
                }
                data = this.$qs.stringify(data)
                this.$http.post("vsas/task/deploy/deleteDeployTask", data).then(res => {
                    if (res.data.code == 200) {
                        this.$notify({
                            type: "success",
                            message: "任务删除成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    } else {
                        this.$notify({
                            type: "warning",
                            message: "任务删除失败！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                    this.getManFaceVise()
                })
            })
        },
        //查看布控任务
        lookViseTaskInfo(row) {
            let obj = {};
            obj = Object.assign(this.linstne, {
              currentPage: this.currentPage,
              pageSize: this.pageSize
            });
            this.$storage.setSession("searchInfo", obj);
            this.$router.push({
                path: "/videoStrucPlat/viseResult",
                query: {
                    taskuuid: row.taskDeployId,
                    deviceNumber:row.deviceNumber,
                    beginTime:row.beginTime,
                    menuCode: 704,
                }
            })
            // window.open(routeData.href, "_blank");
        },

    }
};
export default mixins
