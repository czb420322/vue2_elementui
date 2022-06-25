const mixins = {
    data: function () {
        return {
            targeType: 0,
            currentPage: 1,
            pageSize: 12,
            totalCount: 0,
            commLabeList: [], //标注数组
            Checkd: [],
            keyword: '',
            nowIndex: 0, //页面的切换
            radio: 2,
            beginData: '', //获取列表时间
            endData: '', //获取标注列表时间
            caseUuid: '',
            caseNumber: '', //案件Id
            caseName: '', //案件名称
            beginTime: '',
            endTime: '',
            caseLocation: '', //案件详情
            caseType: '', //案件类型
            caseTool: '', //作案工具
            caseMeans: '', //作案手段
            caseOpportunity: '', //作案时机
            harm: '', //危害程度
            target: '', //侵犯目标
            caseDescribe: '', //案件详情
            videoMarkIds: '', //存入标注对象的ID
            caseNumberMust: false,
            caseNameMust: false,
            caseTypeMust: false,
            caseDateMust: false,
            caseList: [], //案件列表
            casetarget: '', //嫌疑目标
            showCaseName: '未知案件', //显示案件名称
            markList: [], //已标注池
            optionsPerson: [],
            markerCheckd: [], //嫌疑目标的关联标注
            delMarkList: [], //取消的数组
            suspicionObj: {}, //嫌疑对象
            ceseword: '', //搜索案件列表
            typeId: '', //传入的空
            showVideo: [], //显示隐藏播放器
            showSmallVideo: [], //显示隐藏已标注的播放器
            videoUrl: '', //视频播放的URL
            flag: true,
            imgUrl: '', //快速生成案件的首张图片URL
            identifying: 0, //关联的标识
            showfalse: false,
            disabledata: false,
            showhandword: false, //打开手工标注的页面
            tablerow: {},
            caseDescribeLen: false,
            videoDialogVisible: false,
            shownowIndex: null
        }
    },
    watch: {
        totalCount(val) {
            if (Number(val) % 12 == 0) {
                if (this.currentPage > 1) {
                    this.currentPage -= 1
                    if (this.nowIndex == 0) {
                        this.getAllMarker()
                    } else {
                        this.getAllMarker(this.typeId)
                    }
                } else {
                    this.currentPage = 1
                    if (this.nowIndex == 0) {
                        this.getAllMarker()
                    } else {
                        this.getAllMarker(this.typeId)
                    }
                }

            }
        },
    },

    methods: {


        //打开修改手工标注页面
        updateLable(row) {
            this.getLableInfo(row.markId)
            this.setisupdatejudged(true)
            // this.updatehanlabel(row);
            // this.showhandword = true
            // this.toggleHandLable();
        },
        //点击手工标注修改页面请求接口数据
        getLableInfo(id) {
            let data = {
                markId: id
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/video/mark/query/mark/by/id', data).then(res => {
                console.log(res, 'hahahahhshshssssss');
                if (res.data.code == 200) {
                    this.updatehanlabel(res.data.data);
                    this.showhandword = true
                    this.toggleHandLable();
                }
            })
        },
        childbyHandwork() {
            this.showhandword = false
            this.toggleHandfalse();
            this.getAllMarker('')
        },
        handleSizeChange(val) {
            this.currentPage = 1
            this.pageSize = val
            if (this.nowIndex == 0) {
                this.getAllMarker(this.typeId)
            } else if (this.nowIndex == 1) {
                this.getAllMarker(this.suspicionObj.suspicionType)
            }

        },
        handleCurrentChange(val) {
            this.currentPage = val
            if (this.nowIndex == 0) {
                this.getAllMarker(this.typeId)
            } else if (this.nowIndex == 1) {
                this.getAllMarker(this.suspicionObj.suspicionType)
            }
        },
        //打开模态框
        openDialog() {
            this.currentPage = 1
            // this.getAllMarker(this.typeId);
            this.toggleTab(0)
            this.$nextTick(() => {
                // setTimeout(()=>{
                this.$refs.province.selected = sessionStorage.getItem('defaultRegion').substring(0, 2) + '0000'
                this.$refs.province.selectcity = sessionStorage.getItem('defaultRegion').substring(0, 4) + '00'
                this.$refs.province.selectdist = sessionStorage.getItem('defaultRegion')
                this.$refs.province.getSelectData();
                // },1000)
                this.OpenTheTime('#text1', '#text2');
                this.OpenTheTime2('#text3', '#text4');
            })

        },
        //tab切换
        toggleTab(index) {
            this.identifying = 0;
            this.currentPage = 1
            this.nowIndex = index
            if (this.nowIndex == 0) {
                this.typeId = ''
                this.getAllMarker()
            }
            if (this.nowIndex == 1) {
                this.getHisList();
                this.markList = []
                this.casetarget = ''
            }
        },

        //获取历史列表
        getHisList() {
            let data = {
                caseName: this.ceseword
            };
            data = this.$qs.stringify(data);
            this.$http.post('vsas/speed/getCaseList', data).then(res => {
                if (res.data.code == 200) {
                    this.caseList = res.data.data
                    this.checkTable(this.caseList[0])
                }
            })
        },
        //点击列表获取数据
        checkTable(row) {
            this.currentPage = 1
            this.markList = []
            this.commLabeList = []
            this.identifying = 1
            this.showCaseName = row.caseName
            this.casetarget = ''
            this.optionsPerson = []
            this.tablerow = row
            this.getSuspicion(row.caseUuid)
        },

        //获取嫌疑人目标
        getSuspicion(caseUuid) {
            let data = {
                caseUuid: caseUuid
            };
            data = this.$qs.stringify(data)
            this.$http.post('vsas/speed/getSuspicion', data).then(res => {
                if (res.data.code == 200) {
                    console.log(res, 777777777777);
                    if (res.data.data.length > 0) {
                        this.typeId = res.data.data[0].suspicionType
                        this.optionsPerson = res.data.data
                        this.casetarget = this.optionsPerson[0].suspicionName
                        this.getMarkList(this.optionsPerson[0])
                    } else {
                        this.typeId = ''
                        this.getAllMarker(this.typeId)
                        this.markList = []
                        this.suspicionObj = {}
                    }
                }
            })
        },
        //获取已经标注的列表  切换下拉采集
        getMarkList(row) {
            // 默认清空分页当前页面
            this.currentPage = 1;
            this.typeId = row.suspicionType
            this.getAllMarker(row.suspicionType)
            this.suspicionObj = row
            this.casetarget = row.suspicionName
            let data = {
                suspicionUuid: row.suspicionUuid,
                caseUuid: row.caseUuid,
                suspicionType: row.suspicionType
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/speed/getSuspicionTargetRel', data).then(res => {
                if (res.data.code == 200) {
                    this.markList = res.data.data
                    this.markerCheckd = [];
                    this.showSmallVideo = []
                    if (this.markList != null) {
                        var obj = {}
                        for (let i = 0; i < this.markList.length; i++) {
                            obj = {
                                state: false
                            }
                            this.markerCheckd.push(obj)
                            this.showSmallVideo.push(obj)
                        }
                    }
                }
            })
        },
        //获取标注列表
        getAllMarker(typeId) {
            // if(this.beginData != '' || this.endData != '' || this.keyword != ''){
            //   this.currentPage = 1
            // }
            this.getSize();
            let data = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                typeId: typeId,
                beginData: this.beginData,
                endData: this.endData,
                keyword: this.keyword
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/speed/getMakeInfo', data).then(res => {
                if (res.data.code == 200) {
                    this.commLabeList = res.data.data.list
                    if (this.commLabeList.length == 0) {
                        this.setshowInfo(false)
                    }
                    this.pageSize = res.data.data.pageSize
                    this.currentPage = res.data.data.pageNum
                    this.totalCount = res.data.data.totalCount
                    this.Checkd = [];
                    this.showVideo = []; //显示隐藏播放器
                    if (this.commLabeList != null) {
                        var obj = {}
                        for (let i = 0; i < this.commLabeList.length; i++) {
                            obj = {
                                state: false
                            }
                            this.Checkd.push(obj)
                            this.showVideo.push(obj)
                        }
                    }
                    // this.keyword = '';
                    // this.beginData = '';
                    // this.endData = '';
                }
            })
        },
        //选择图片
        ClickCheckd(index) {
            this.Checkd[index].state = !this.Checkd[index].state
            this.Relation()
        },
        Relation() {
            this.videoMarkIds = ''
            let arr = []
            for (let i = 0; i < this.Checkd.length; i++) {
                if (this.Checkd[i].state) {
                    this.videoMarkIds += this.commLabeList[i].markId + ',';
                    arr.push(i)
                    this.imgUrl = this.commLabeList[arr[0]].videoCaptureUrl
                } else {
                    this.imgUrl = ''
                }
            }
            this.videoMarkIds = this.videoMarkIds.substr(0, this.videoMarkIds.length - 1)
        },

        //关联
        relevance() {
            if (this.optionsPerson.length <= 0) {
                this.$notify({
                    type: 'error',
                    message: '当前案件没有建立对应的嫌疑目标',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            } else if (this.videoMarkIds == '') {
                this.$notify({
                    type: 'warning',
                    message: '请关联标注！',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else {
                if (this.tablerow.hasApproveingComb == 1) {
                    this.$myconfirm({
                        type: '提示',
                        msg: '当前案件对应的串并案已在审批中,需等该串并案审批通过后才能修改,如强制修改,将导致串并案中案件信息不一致！',
                        icon: 2,
                        btn: {
                            ok: '强制修改',
                            no: '取消'
                        }
                    }).then(() => {
                        this.caseMark();
                    }).catch(() => {

                    })
                } else {
                    this.caseMark();
                }
            }
        },
        caseMark() {
            let data = {
                videoMarkIds: this.videoMarkIds,
                suspicionUuid: this.suspicionObj.suspicionUuid,
                caseUuid: this.suspicionObj.caseUuid,
                videoMarkImg: this.imgUrl
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/speed/addSuspicionTargetRel', data).then(res => {
                if (res.data.code == 200) {
                    this.getAllMarker(this.suspicionObj.suspicionType);
                    this.getMarkList(this.suspicionObj)
                    this.videoMarkIds = ''
                    this.$notify({
                        type: 'success',
                        message: '关联成功',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'error',
                        message: '关联失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }


            })
        },
        //关联单张
        relevanceOne(row) {
            this.setshowInfo(false)
            if (this.identifying == 1) {
                this.videoMarkIds = row.markId
                this.imgUrl = row.videoCaptureUrl;
                this.relevance()
            }
        },
        //取消关联的数组
        delMarker(index) {
            this.markerCheckd[index].state = !this.markerCheckd[index].state
            this.delRelation()
        },
        delRelation() {
            this.delMarkList = []
            for (let i = 0; i < this.markerCheckd.length; i++) {
                if (this.markerCheckd[i].state) {
                    if (this.markList[i].videoMark == null && this.markList[i].personUuid == null) {
                        this.delMarkList += this.markList[i].videoSliceInfo.videoUuid + ','
                    } else if (this.markList[i].videoSliceInfo == null && this.markList[i].personUuid == null) {
                        this.delMarkList += this.markList[i].videoMark.markId + ','
                    } else if (this.markList[i].videoMark == null && this.markList[i].videoSliceInfo == null) {
                        this.delMarkList += this.markList[i].personUuid + ','
                    }
                }
            }
            this.delMarkList = this.delMarkList.substr(0, this.delMarkList.length - 1)
        },
        //取消关联
        cancelMark() {
            if (this.casetarget == '' || this.casetarget == null) {
                this.$notify({
                    type: 'warning',
                    message: '请选择嫌疑目标标注！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            } else if (this.casetarget != '' && (this.delMarkList == '' || this.delMarkList == null)) {
                this.$notify({
                    type: 'warning',
                    message: '请选择嫌疑目标标注！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            } else {
                if (this.tablerow.hasApproveingComb == 1) {
                    this.$myconfirm({
                        type: '提示',
                        msg: '当前案件对应的串并案已在审批中,需等该串并案审批通过后才能修改,如强制修改,将导致串并案中案件信息不一致！',
                        icon: 2,
                        btn: {
                            ok: '强制修改',
                            no: '取消'
                        }
                    }).then(() => {
                        this.removeMark();
                    }).catch(() => {

                    })
                } else {
                    this.removeMark();
                }
            }
        },
        removeMark() {
            let data = {
                videoMarkIds: this.delMarkList,
                suspicionUuid: this.suspicionObj.suspicionUuid
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/speed/delSuspicionTargetRel', data).then(res => {
                if (res.data.code == 200) {
                    this.delMarkList = ''
                    this.$notify({
                        type: 'success',
                        message: '解除成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.getAllMarker(this.suspicionObj.suspicionType);
                    this.getMarkList(this.suspicionObj)
                } else {
                    this.$notify({
                        type: 'error',
                        message: '解除失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }

            })
        },
        //取消一个关联
        cancelMarkOne(row) {
            if (row.vehicleUuid == undefined && row.bicycleUuid == undefined) {
                if (row.videoMark == null && row.personUuid == null) {
                    this.delMarkList = row.videoSliceInfo.videoUuid
                } else if (row.videoSliceInfo == null && row.personUuid == null) {
                    this.delMarkList = row.videoMark.markId
                } else if (row.videoMark == null && row.videoSliceInfo == null) {
                    this.delMarkList = row.personUuid
                }
            } else if (row.vehicleUuid == undefined && row.personUuid == undefined) {
                if (row.videoMark == null && row.bicycleUuid == null) {
                    this.delMarkList = row.videoSliceInfo.videoUuid
                } else if (row.videoSliceInfo == null && row.bicycleUuid == null) {
                    this.delMarkList = row.videoMark.markId
                } else if (row.videoMark == null && row.videoSliceInfo == null) {
                    this.delMarkList = row.bicycleUuid
                }
            } else if (row.personUuid == undefined && row.bicycleUuid == undefined) {
                if (row.videoMark == null && row.vehicleUuid == null) {
                    this.delMarkList = row.videoSliceInfo.videoUuid
                } else if (row.videoSliceInfo == null && row.vehicleUuid == null) {
                    this.delMarkList = row.videoMark.markId
                } else if (row.videoMark == null && row.videoSliceInfo == null) {
                    this.delMarkList = row.vehicleUuid
                }
            }

            this.cancelMark()
        },
        getCaseNumber() {
            this.caseNumber = this.caseNumber.replace(/^ +| +$/g, '')
            this.caseName = this.caseName.replace(/^ +| +$/g, '')
            if (this.caseNumber != '') {
                let data = {
                    caseLinkMark: this.caseNumber,
                }
                this.$http.get('/pca/casemng/baseinfo/check/CaseLinkMark', {
                        params: data
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            if (res.data.data != null) {
                                if (res.data.data.caseUuid != this.caseUuid) {
                                    this.caseNumberMust = true;
                                    this.disabledata = true
                                    setTimeout(() => {
                                        this.caseNumberMust = false;
                                    }, 1000);
                                }
                            } else {
                                this.disabledata = false
                                this.caseNumberMust = false;
                            }
                        } else {
                            this.disabledata = true
                            this.caseNumberMust = true;
                            setTimeout(() => {
                                this.caseNumberMust = false;
                            }, 1000);
                            // this.$notify({
                            //   type: 'warning',
                            //   message: '服务器异常,请稍后重试！',
                            //   position: 'bottom-right',
                            //   duration: 3000
                            // });
                        }
                    })
            } else {
                this.disabledata = false
            }
        },
        //快速生成案件
        gonext() {
            this.addFastCase()
            // this.caseNumber = this.caseNumber.replace(/^ +| +$/g, '')
            // this.caseName = this.caseName.replace(/^ +| +$/g, '')
            // if (this.caseNumber != '') {
            //   let data = {
            //     caseLinkMark: this.caseNumber,
            //   }
            //   this.$http.get('/pca/casemng/baseinfo/check/CaseLinkMark', {
            //       params: data
            //     })
            //     .then((res) => {
            //       if (res.data.code == 200) {
            //         if (res.data.data != null) {
            //           if (res.data.data.caseUuid != this.caseUuid) {
            //             this.caseNumberMust = true;
            //             setTimeout(() => {
            //               this.caseNumberMust = false;
            //             }, 1000);
            //           } else {
            //             this.addFastCase()
            //           }
            //         } else {
            //           this.addFastCase()
            //         }
            //       } else {
            //         this.$notify({
            //           type: 'error',
            //           message: '服务器异常,请稍后重试',
            //           position: 'bottom-right',
            //           duration: 3000
            //         });
            //       }
            //     })
            // } else {
            //   this.addFastCase()
            // }
        },

        //快速生成案件
        addFastCase() {
            this.getSize();
            if (this.caseName == '') {
                this.caseNameMust = true;
                setTimeout(() => {
                    this.caseNameMust = false;
                }, 5000);
            } else if (this.beginTime == '') {
                this.caseDateMust = true;
                setTimeout(() => {
                    this.caseDateMust = false;
                }, 5000);
            } else if (this.caseType == '') {
                this.caseTypeMust = true;
                setTimeout(() => {
                    this.caseTypeMust = false;
                }, 5000);
            } else if (this.disabledata) {
                this.caseNumberMust = true;
                setTimeout(() => {
                    this.caseNumberMust = false;
                }, 1000);
            } else if (this.caseDescribe.length > 500) {
                this.caseDescribeLen = true;
                setTimeout(() => {
                    this.caseDescribeLen = false;
                }, 1000);
                console.log(55555);
            } else {
                this.$myconfirm({
                        type: '提示',
                        msg: '是否关联所选标注,并快速生成案件!',
                        icon: 2,
                        btn: {
                            ok: '确定',
                            no: '取消'
                        }
                    }).then(() => {
                        this.dialogVisible = false
                        let data = {
                            caseUuid: this.caseUuid, //案件ID
                            caseLinkMark: this.caseNumber, //案件编号
                            caseName: this.caseName, //案发名称
                            timeLowLimit: this.beginTime, //案发开始时间
                            timeUpLimit: this.endTime, //案发结束时间
                            placeCode: this.$refs.province.selectdist, //区/县 简码
                            placeFullAddress: this.caseLocation, //案发详址
                            longitude: null, //案发经度
                            latitude: null, //案发纬度
                            state: '', //案件状态
                            caseCategoryDesc: this.caseType, //案件类型
                            caseToolDesc: this.caseTool, //作案工具
                            caseMethodDesc: this.caseMeans, //作案手段
                            caseLevelDesc: this.harm, //危害程度
                            caseTargetDesc: this.target, //侵犯目标
                            caseOpportunityDesc: this.caseOpportunity, //作案时机
                            caseAbstract: this.caseDescribe, //简要案情
                            isSpecial: 0, //协同作战状态
                            videoMarkIds: this.videoMarkIds, //案件标注信息集合
                            imgUrl: this.imgUrl
                        }
                        data = this.$qs.stringify(data)
                        this.$http.post('vsas/speed/createCaseInfo', data).then(res => {
                            if (res.data.code == 200) {
                                this.$notify({
                                    type: 'success',
                                    message: '案件创建成功！',
                                    position: 'bottom-right',
                                    duration: 3000
                                });
                                this.reset();
                            } else {
                                this.reset();
                                this.$notify({
                                    type: 'error',
                                    message: '案件创建失败！',
                                    position: 'bottom-right',
                                    duration: 3000
                                });
                            }
                        })
                    })
                    .catch(() => {})
            }
        },
        //删除
        dellable(row, index) {
            this.$myconfirm({
                type: '提示',
                msg: '是否删除标注！',
                icon: 2,
                btn: {
                    ok: '确定',
                    no: '取消'
                }
            }).then(() => {
                this.setshowInfo(false)
                // if (this.showVideo[index].state) {
                //   this.showVideo[index].state = false
                // }
                //  else {
                let data = {
                    markId: row.markId
                }
                data = this.$qs.stringify(data)
                this.$http.post('vsas/speed/delMakeInfo', data).then(res => {
                    if (res.data.code == 200) {
                        if (this.nowIndex == 0) {
                            this.getAllMarker(this.typeId)
                        } else if (this.nowIndex == 1) {
                            this.getAllMarker(this.suspicionObj.suspicionType)
                        }
                        this.$notify({
                            type: 'success',
                            message: '标注删除成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                })
                // }
            })

        },
        closeVideo(index) {
            this.showSmallVideo[index].state = false
        },
        //播放视频
        playFlvVideo(item, index) {
            this.shownowIndex = index
            console.log(this.shownowIndex, '5555');
            this.videoDialogVisible = true
            this.$store.state.showvideoflv = true
            this.$store.state.showohter = false
            let url = this.getUrl(item.videoUrl)
            this.flv_load_mds('Video_flv', url)
        },
        playsFlvVideo(item) {
            if (item.videoMark == null && item.videoSliceInfo != null) {
                if (item.videoSliceInfo.storagePath == null) {
                    this.$store.state.showohter = true
                    this.$store.state.showvideoflv = true
                    return
                }
                this.$store.state.showvideoflv = true
                this.$store.state.showohter = false
                let url = this.getUrl(item.videoSliceInfo.storagePath)
                this.flv_load_mds('Video_flv', url)
            } else if (item.videoMark != null && item.videoSliceInfo == null) {
                this.$store.state.showvideoflv = true
                this.$store.state.showohter = false
                let url = this.getUrl(item.videoMark.videoUrl)
                this.flv_load_mds('Video_flv', url)
            } else if (item.videoMark == null && item.videoSliceInfo == null) {
                this.$store.state.showvideoflv = false
                this.$store.state.showohter = false
            }
        },
        //快速生成案件名
        fastToName() {
            this.caseName = this.beginTime.replace(/-/g, '').replace(' ', '').replace(/:/g, '') + this.harm + this.caseType
        },
        //重置信息
        reset() {
            this.caseNumber = ''; //案件Id
            this.caseName = ''; //案件名称
            this.beginTime = '';
            this.endTime = '';
            this.caseLocation = ''; //案件详情
            this.caseType = ''; //案件类型
            this.caseTool = ''; //作案工具
            this.caseMeans = ''; //作案手段
            this.caseOpportunity = ''; //作案时机
            this.harm = ''; //危害程度
            this.target = ''; //侵犯目标
            this.caseDescribe = ''; //案件详情
            this.videoMarkIds = ''; //存入标注对象的ID
            this.$refs.province.selected = sessionStorage.getItem("defaultRegion").substring(0, 2) + '0000', //'420000',
                this.$refs.province.selectcity = sessionStorage.getItem("defaultRegion").substring(0, 4) + '00', //'420100',
                this.$refs.province.selectdist = sessionStorage.getItem("defaultRegion")
        },

        //得到标注的详细信息
        getInfo(row, e) {
            this.setshowInfo(true)
            document.getElementById('showInfo').style.left = (e.clientX + 50) + 'px'
            document.getElementById('showInfo').style.top = (e.clientY - 100) + 'px'
            this.setlableInfo(row)
            if (row.typeId == 1) {
                this.setshowInfoMan(1)
                for (let i = 0; i < this.lableInfo.attrList.length; i++) {
                    let key = this.lableInfo.attrList[i].itemCode
                    let val = this.lableInfo.attrList[i].valueName
                    this.$store.state.lableInfoMan[key] = val
                }
            } else if (row.typeId == 2) {
                this.setshowInfoMan(3)
                for (let i = 0; i < this.lableInfo.attrList.length; i++) {
                    let key = this.lableInfo.attrList[i].itemCode
                    let val = this.lableInfo.attrList[i].valueName
                    this.$store.state.lableInfoMan[key] = val
                }
            } else if (row.typeId == 4) {
                this.setshowInfoMan(2)
                for (let i = 0; i < this.lableInfo.attrList.length; i++) {
                    let key = this.lableInfo.attrList[i].itemCode
                    let val = this.lableInfo.attrList[i].valueName
                    this.$store.state.lableInfoMan[key] = val
                }

            }

        },
        //隐藏标注的详细信息
        goout() {
            this.setlableInfo({})
            this.setlableInfoMan({})
            this.setshowInfo(false)
        },
        //放大视频
        big(index) {
            if (this.flag) {
                document.getElementById('centerVideo_flv' + index).webkitRequestFullScreen(); //进入全屏
                this.flag = false
            } else {
                // document.getElementById('centerVideo_flv' + index).webkitCancelFullScreen(); //退出全屏
                this.flag = true
            }
        },
        bigs(index) {
            document.getElementById('centerVideo' + index).webkitRequestFullScreen(); //进入全屏
        },
        resetMarker() {
            this.beginData = '';
            this.endData = '';
            this.resetTimetwo();
            this.keyword = ''
            this.currentPage = 1;
            if (this.nowIndex == 0) {
                this.getAllMarker();
            } else {
                this.getAllMarker(this.typeId);
            }
            // this.getAllMarker(this.typeId);
        }
    }
};
export default mixins
