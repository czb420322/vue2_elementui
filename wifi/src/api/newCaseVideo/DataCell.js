/*
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:06
 * @LastEditTime : 2021-06-02 15:23:13
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\api\newCaseVideo\DataCell.js
 * @
 */
import moment from 'moment'

const mixins = {
    data: function() {
        return {
            tableData: [], //数据采集的列表
            keyword: '', //关键字
            beginTime: '', //开始时间
            endTime: '', //结束时间
            orderBy: 'upload_time', //排序
            orderType: 'desc', //排序
            currentPage: 1, // 当前页码
            pageSize: 10, //每页显示的条数
            totalCount: 0, //数据总条数
            percentage: 0, //进度
            timeOut: null, //定时器
            openNormCell: false, //打开标准采集
            videolist: [],
            glststrus: '',
            num1: 0,
            num2: 0,
            num3: 0,
            loading: null,
            caseUuid: '',
        }
    },
    watch: {
        totalCount(val) {
            if (Number(val) % 10 == 0) {
                if (this.currentPage > 1) {
                    this.currentPage -= 1
                    this.getAllDataCell();
                } else {
                    this.currentPage = 1
                    this.getAllDataCell();
                }

            }
        },
        keyword(val) {
            if (val) {
                clearInterval(this.timeOut);
                this.currentPage = 1
            } else {
                this.timeOut = setInterval(() => {
                    this.getAllDataCell();
                }, 5000)
            }
        }
    },
    //   mounted() {
    //     this.getAllDataCell();
    //   },
    methods: {
        //循环localStorage,获取当前所有端口，以及端口对应的fileUuid,放到数组中
        getUuidPort() {
            let UuidPort = []
            for (const key in localStorage) {
                if (key.indexOf('DxPort') != -1) {
                    let arr = []
                    for (let i = 0; i < JSON.parse(localStorage[key]).length; i++) {
                        arr.push({
                            port: key,
                            uuid: JSON.parse(localStorage[key])[i]
                        })
                    }
                    UuidPort = UuidPort.concat(arr)
                }
            }
            return UuidPort
        },
        //文件大小
        fileSize(row, column, cellValue) {
            if (!cellValue || cellValue == -1) {
                return ''
            }
            var cell = (cellValue / 1024 / 1024).toFixed(2) + 'M'
            return cell
        },
        //时间过滤
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        videoUnicode(row, column, cellValue) {
            if (row.videoUnicode == 28) {
                return 'H264'
            } else if (row.videoUnicode == 174) {
                return 'H265'
            } else {
                return '其他'
            }
        },
        //状态码判断
        formatStatus(row, column, cellValue) {
            if (row.deviceType == 0 && row.infoKind == 0) {
                return '格式不支持'
            } else {
                if (cellValue === 1) {
                    return '上传中';
                } else if (cellValue == 2) {
                    return '上传完成';
                } else if (cellValue == 3) {
                    return '上传完成'
                } else if (cellValue == 4) {
                    return '上传完成';
                } else if (cellValue == 5) {
                    return '上传完成'
                } else if (cellValue == 6) {
                    return '上传完成'
                } else if (cellValue == 10) {
                    return '上传失败'
                }
            }
        },
        //打开非标准采集的exe不需要结构化,视频文件
        getclick() {
            this.setshowplayvideo(false)
            //判断当前用户是否为空，如果为空则不打开当前采集窗口
            if (this.$commons.isEmpty(sessionStorage.getItem('name')) ||
                this.$commons.isEmpty(sessionStorage.getItem('collectFinishInterface')) ||
                this.$commons.isEmpty(sessionStorage.getItem('collectHdfsPath'))) {
                return
            }
            if (this.$route.path == '/videoCombat/videoplay') {
                sessionStorage.setItem('shebeiId', '')
                sessionStorage.setItem('caseUuid', '');
            } else {
                sessionStorage.setItem('shebeiId', this.deviceUuid)
                sessionStorage.setItem('caseUuid', this.caseUuid);
            }
            // 1.7版本代码
            onOpenWindowsccc('OnUpload', 0)
            // getFilePro()

            // 1.6.1版本代码
            // let url = "http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindows&type=0&req=10000000-0000-0000-0000-000000000000";

            // let g_socket = document.createElement("script");
            // g_socket.src = url;
            // document.body.appendChild(g_socket);
        },
        //,视频文件夹上传
        getclickFolder() {
            //判断当前用户是否为空，如果为空则不打开当前采集窗口
            if (this.$commons.isEmpty(sessionStorage.getItem('name')) ||
                this.$commons.isEmpty(sessionStorage.getItem('collectFinishInterface')) ||
                this.$commons.isEmpty(sessionStorage.getItem('collectHdfsPath'))) {
                return
            }
            if (this.$route.path == '/videoCombat/videoplay') {
                sessionStorage.setItem('shebeiId', '')
                sessionStorage.setItem('caseUuid', '');
            } else {
                sessionStorage.setItem('shebeiId', this.deviceUuid)
                sessionStorage.setItem('caseUuid', this.caseUuid);
            }

            // 1.7版本
            onOpenWindowsccc('OnFolderUpload', 0)

            // 1.6.1版本
            // let url = "http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindows&type=1&req=10000000-0000-0000-0000-000000000000";
            // let g_socket = document.createElement("script");
            // g_socket.src = url;
            // document.body.appendChild(g_socket);
        },

        //打开非标准采集的exe需要结构化
        getclickstrus() {
            this.setshowplayvideo(false)
            if (this.$commons.isEmpty(sessionStorage.getItem('name')) ||
                this.$commons.isEmpty(sessionStorage.getItem('collectFinishInterface')) ||
                this.$commons.isEmpty(sessionStorage.getItem('collectHdfsPath'))) {
                return
            }
            if (this.$route.path == '/videoCombat/videoplay') {
                sessionStorage.setItem('shebeiId', '')
                sessionStorage.setItem('caseUuid', '');
            } else {
                sessionStorage.setItem('shebeiId', this.deviceUuid)
                sessionStorage.setItem('caseUuid', this.caseUuid);
            }
            //打开采集窗口，触发onOpenWindowstrus回调
            onOpenWindowsccc('OnUpload', 1)
            // let url = "http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindowstrus&req=10000000-0000-0000-0000-000000000000";
            // let g_socket = document.createElement("script");
            // g_socket.src = url;
            // document.body.appendChild(g_socket);
        },
        //得到已上传，正在上传，未上传的数量
        getNumtoAll() {
            let data = {}
            if (this.$route.path == '/videoCombat/videoplay') {
                data = {
                    caseUuid: '',
                    deviceId: ''
                }
            } else {
                data = {
                    caseUuid: this.caseUuid,
                    deviceUuid: this.deviceUuid
                }
            }
            this.$http.get('/vsas/getCount', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.num1 = res.data.data.success
                    this.num2 = res.data.data.load
                    this.num3 = res.data.data.noSupport
                }
            })
        },
        //得到所有的数据采集列表
        getAllDataCell() {
            if (this.$storage.getSession('userInfo') == null) {
                clearInterval(this.timeOut)
            }
            let userId = this.$storage.getSession('userInfo').userId;
            let data = {}
            //如果是极速作战
            if (this.$route.path == '/videoCombat/videoplay') {
                data = {
                    fileName: this.keyword,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    submiterId: userId,
                    orderBy: this.orderBy,
                    orderType: this.orderType,
                    begin: this.beginTime,
                    end: this.endTime,
                    infoKind: 0,
                    fastOrSpecial: 'fast'
                };
            }
            //非极速作战
            else {
                data = {
                    fileName: this.keyword,
                    pageNum: this.currentPage, //当前页
                    pageSize: this.pageSize, //当前页结果数量
                    deviceId: this.deviceUuid,
                    caseUuid: this.caseUuid,
                    submiterId: userId,
                    orderBy: this.orderBy,
                    orderType: this.orderType,
                    begin: this.beginTime,
                    end: this.endTime,
                    infoKind: 0,
                };
            }
            this.getSize();
            this.$http.get('vsas/collection/offline/list', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    // // 获取c++返回的上传文件id
                    // getFilePro()
                    if (res.data.data.list) {
                        let arr = []
                        res.data.data.list.forEach(v => {
                            arr.push(v.fileUuid)
                        })
                        localStorage.setItem('uploadFileUuid', arr)
                    }

                    //获取当前所有的文件上传中的端口以及对应的文件fileUuid

                    // let UuidPort = this.getUuidPort()    //1.6的代码

                    let uploadFileUuid = localStorage.getItem('uploadFileUuid').split(',')
                    // console.log(uploadFileUuid, '所有的文件id-------------')
                    this.tableData = res.data.data.list;
                    this.totalCount = res.data.data.totalCount

                    //   let count = 0
                    //   for (let i = 0; i < this.tableData.length; i++) {
                    //     if(this.tableData[i].status == 4){
                    //         count ++
                    //     }
                    //   }
                    //   if(count == this.tableData.length && count > 0){
                    //     clearInterval(this.timeOut);
                    //   }else{
                    //     clearInterval(this.timeOut)
                    //     this.timeOut = setInterval(() => {
                    //         this.getAllDataCell();
                    //     }, 1000)
                    //   }




                    //循环所有视频文件，获取当前所有上传中的文件
                    for (let i = 0; i < this.tableData.length; i++) {
                        // console.log(localStorage.getItem('uploadFileUuid'), '啥逼玩意-------------')
                        // if (this.tableData[i].status == 1 && this.tableData[i].deviceType != 0) {
                        //如果文件是上传中则获取进度，文件不支持进度为0 其他的未100%
                        if (this.tableData[i].status == 1 && this.tableData[i].deviceType != 0) {
                            // 1.7版本代码
                            for (let j = 0; j < uploadFileUuid.length; j++) {
                                if (this.tableData[i].fileUuid == uploadFileUuid[j]) {
                                    this.tableData[i].progress = 0
                                    // 进度获取方法
                                    OnPercent(this.tableData[i].fileUuid)
                                    let progress = localStorage.getItem(this.tableData[i].fileUuid + '1')
                                    this.tableData[i].progress = Number(progress)
                                }
                            }
                        } else if (this.tableData[i].status != 1 && this.tableData[i].deviceType != 0 &&
                            this.tableData[i].status != 10) {
                            this.tableData[i].progress = 100
                        }
                        //表示是格式不支持的，文件转为0
                        else if ((this.tableData[i].deviceType == 0 && this.tableData[i].infoKind == 0) ||
                            this.tableData[i].status == 10) {
                            this.tableData[i].progress = 0
                        }
                        //表示文件里离线的
                        else if (this.tableData[i].deviceType == 0 && this.tableData[i].infoKind == 1) {
                            this.tableData[i].progress = 100
                        }
                    }
                }
            })
        },
        //删除后的请求数据列表
        getAccessCell() {
            let userId = this.$storage.getSession('userInfo').userId;
            let data = {
                fileName: this.keyword,
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                submiterId: userId,
                orderBy: this.orderBy,
                orderType: this.orderType,
                begin: this.beginTime,
                end: this.endTime,
                infoKind: 0,
                statusl: '2,3,4,6'
            };
            this.$http.get('vsas/collection/offline/list', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.videolist = res.data.data.list
                }
            })
        },
        handleSizeChange(val) {
            this.currentPage = 1
            this.pageSize = val;
            this.getAllDataCell()
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllDataCell()
        },

        //停止任务
        stopTovideo(id) {
            let data = {
                fileUuid: id
            }
            data = this.$qs.stringify(data);
            this.$http.post('vsas/collection/stop ', data).then(res => {
                if (res.data.code == 200) {
                    this.getAllDataCell()
                }
            })
        },
        //重试
        retry(id) {
            let data = {
                fileUuid: id
            }
            data = this.$qs.stringify(data);
            this.$http.post('vsas/collection/retry', data).then(res => {
                if (res.data.code == 200) {

                    this.getAllDataCell()
                }
            })
        },
        //删除
        deleteVideo(row) {
            //删除机制
            // let portMsg = localStorage.getItem(id)
            // let url = "http://127.0.0.1:"+portMsg+"/DxHandler.js?cbk=OnDeleteFile&req=0&fileuuidlist="+id;
            // console.log(url,8888);
            // let g_socket = document.createElement("script");
            // g_socket.src = url;
            // document.body.appendChild(g_socket);
            // return
            this.$myconfirm({
                    type: '提示',
                    msg: '视频产生的相关数据全部丢失,是否确认删除！',
                    icon: 1,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {

                    let data = {
                        fileUuid: row.fileUuid
                    }
                    this.loading = this.$loading({
                        lock: true,
                        background: "rgba(255,255,255,0.4)",
                        text: "正在删除"
                    });
                    data = this.$qs.stringify(data);
                    this.$http.post('vsas/collection/del', data).then(res => {
                        this.loading.close();
                        if (row.status == 1) {
                            //获取当前所有的文件上传中的端口以及对应的文件fileUuid
                            //  1.6代码
                            // let UuidPort = this.getUuidPort()
                            // for (let i = 0; i < UuidPort.length; i++) {
                            //   if(row.fileUuid == UuidPort[i].uuid){
                            //     let url = "http://127.0.0.1:"+ UuidPort[i].port.substr(6,UuidPort[i].port.length) +"/DxHandler.js?cbk=OnDeleteFile&req=0&fileuuidlist="+row.fileUuid + '&submiterId=';
                            //     let g_socket = document.createElement("script");
                            //     g_socket.src = url;
                            //     document.body.appendChild(g_socket);
                            //   }
                            // }

                            // 1.7代码
                            let uploadFileUuid = localStorage.getItem('uploadFileUuid').split(',')

                            //如果当前删除的文件ID == localStorage中的文件ID，则取出对应的文件端口，执行OnDeleteFile回调，进行删除文件，并且停止进程
                            for (let i = 0; i < uploadFileUuid.length; i++) {
                                if (row.fileUuid == uploadFileUuid[i]) {
                                    // 调用删除方法
                                    deletFileId(row.fileUuid)
                                }
                            }
                        }
                        if (res.data.code == 200) {
                            this.getAccessCell()
                            this.getAllDataCell()
                            this.getNumtoAll();
                            this.$notify({
                                type: 'success',
                                message: '视频删除成功',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        } else {
                            this.$notify({
                                type: 'error',
                                message: '视频删除失败',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        }
                    })
                })
                .catch(() => {})
        },
        batchDeletVideo(val) {
            if (val.length == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请勾选文件',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            this.$myconfirm({
                type: '提示',
                msg: '是否删除视频文件！',
                icon: 1,
                btn: {
                    ok: '确定',
                    no: '取消'
                }
            }).then(() => {
                let data = {
                    fileUuids: val.join(',') //java的接口交互，中间用逗号分隔
                }
                data = this.$qs.stringify(data)
                this.$http.post('/vsas/collection/batch/del', data).then(res => {
                    if (res.data.code == 200) {
                        this.getAllDataCell()
                        this.getNumtoAll();
                        this.$refs.table.clearSelection();
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: '删除文件失败',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                })
            })
        },
        // 下载
        downVideo(row) {
            if (row.deviceType == 0) {
                this.$notify({
                    type: 'warning',
                    message: '当前格式不支持！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (row.status == 1) {
                this.$notify({
                    type: 'warning',
                    message: '当前视频正在上传！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            window.open('http://' + sessionStorage.getItem('vsasModuleUrl') +
                '/download/video/source?fileSourcePath=' + row.fileSourcePath)
            // this.$myconfirm({
            //   type: '提示',
            //   msg: '下载接口待联调！',
            //   icon:1,
            //   btn: {
            //     ok: '确定',
            //     no: '取消'
            //   }
            // }).then(() => {
            // })
        },
        batchDownVideo(val) {
            this.$myconfirm({
                type: '提示',
                msg: '批量下载接口待联调！',
                icon: 1,
                btn: {
                    ok: '确定',
                    no: '取消'
                }
            }).then(() => {

            })
        },

        //重试
        reset() {
            this.beginTime = ''
            this.endTime = ''
            this.keyword = ''
            this.currentPage = 1
            this.timeOut = setInterval(() => {
                this.getAllDataCell();
            }, 5000)
            this.getAllDataCell();
            this.resetTime();
        },
        //转码后的视频下载
        donwtransVideo(row) {
            if (row.deviceType == 0) {
                this.$notify({
                    type: 'warning',
                    message: '当前格式不支持！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (row.status == 1) {
                this.$notify({
                    type: 'warning',
                    message: '当前视频正在上传！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (row.status != 4 && row.status != 1) {
                this.$notify({
                    type: 'warning',
                    message: '视频正在解析中！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            let data = {
                fileUuid: row.fileUuid
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/download/start/decode/task', data).then(res => {
                // if(res.data.code == 200){
                this.$notify({
                    type: 'success',
                    message: '任务创建成功！',
                    position: 'bottom-right',
                    duration: 3000
                });
                // }
            })
        }
    }
};
export default mixins
