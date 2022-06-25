import {
    windowToCanvas,
    clearRect,
    imgwh,
    coorValue,
    Line,
    draw
} from "../../videoCombat/canvas";
import {
    mapMutations
} from 'vuex'
import CVideo from '../../../api/realvideo/C_video' //C++播放器的方法
import moment from 'moment'
const mixins = {
    data: function () {
        return {
            dialogVisible: false,
            arearule: '1', //区域规则
            overlinerule: '1', //跨线方向规则
            checkbegintime: false, //选择使用开始时间
            checkendtime: false, //选择结使用束时间
            beginData: '', //选择开始时间
            endData: '', //选择结束时间
            timeone: 1,
            timetwo: 1,
            forbidtime: false, //禁用时间插件
            checkpt: 0, //选择当前点位的结果
            checkpoint: 2,
            checkvideo: [], //当前选中的视频
            disperson: false, //当前禁用行人模块
            discar: false, //当前禁用车 模块
            disbic: false, //当前禁用骑车人模块
            CoatStyle: '',
            showCanvas: false, //是否显示二次排查canvas
            Coatlist: [], //上衣数组
            lableimg: '',
            ptlist: [], //点位信息
            videolist: [], //点位对应的视频信息
            coordinates: [], //装原点坐标
            actualcoord: [], //实际点位坐标
            isbdclick: false, //画线的时候是否双击完成
            theta: '', //划线的角度
            originalCoordinate: [], //原始点的坐标
            onsearchList: [], //一次排查的结果
            showtwoCanvas: false, //显示一次排查的canvas
            imgshow: true,
            fileinfo: {},
            showhandword: false,
            videotime: '', //总时间
            palytime: '', //当前时间
            getVideotime: null, //请求播放视频的定时器
            timeFrag: null, //播放器循环播放的定时器,
            opttype: '1', //当前点位显示的是哪一类点位
            opttypes: [ //是否是1天网，4临时点，以及4社会面点
                {
                    value: "1",
                    label: "天网"
                },
                {
                    value: "4",
                    label: "社会面"
                },
                {
                    value: "5",
                    label: "临时点"
                },
            ],
            begintimes: '',
            endtimes: '',
            showvideoplay: false, //显示播放器
            loading: null, //数据加载
            bicycleNum: 0, //骑车人的数量
            personNum: 0, //人的数量
            vehicleNum: 0, //车的数量
            imgListWH: [],
            adaptImg: false,
            filestatus: '', //当前任务的状态
            statsuTimes: null, //刷新当前任务的状态定时器
            restltTotal: 0,
            iszkyfor: '', //判断是否是中科院人，车，骑车人
            checkAll: true, // 全选反选
            isIndeterminate: true,
            checkDialog: false, // 导出日志
            searchDownImg: 1,
            selectCheckd: '', // 导出图片
            exportDialog: false,
            groundIds: [], //存放选中的id数组
            aaa1: false,
            minDownImg: '',
            maxDownImg: '',
            structuroneList: {}, // glst一次排查存储人，车，骑车人
            ischeckAll: false,
            zkystructuroneList: {}, // zky一次排查存储人，车，骑车人
            nowInfo: {}, //鼠标放置上去的时候当前对象
            nowEvent: '', //鼠标放置上去的时候当前Event
            pagesNum:0, //总页数
        }
    },
    mixins: [CVideo],
    created() {

    },
    methods: {
        ...mapMutations([
            'setvideoretriInfo', //播放时候的单个片段的信息
            'setisopenOffVideo', //设置离线播放器是否存在
            'setshowStructDxplayer', //设置播放的打开控制按钮
            'setDxplayerInfo', //设置播放器的值
            'settargetToSearchImg', // 存放结构化id
            'setstrusResult' //存放当前所有结构化的信息，包括排查，禁用等信息
        ]),
        // 转标注
        confimTag(item, type) {
            // console.log(item, '转标注的item');
            // console.log(this.showVideoStruct,"glst");
            // console.log(this.zkyStructureSwitch,"zky");
            let targetId = ''
            let typeFlag = ''
            if (item.personUuid != undefined) {
                targetId = item.personUuid
                typeFlag = 1
            } else if (item.bicycleUuid != undefined) {
                targetId = item.bicycleUuid
                typeFlag = 2
            } else if (item.vehicleUuid != undefined) {
                targetId = item.vehicleUuid
                typeFlag = 3
            }
            let data = {
                targetIds: targetId, // 选择 (英文逗号分隔)
                targetType: typeFlag, // 人，车，骑车人
                suspicionUuid: ''
            }
            //如果是格林深瞳的，就执行格林深瞳的方法
            if (this.showVideoStruct == 'true') {

            }
            //如果是中科院的，就执行中科院的方法
            else if (this.zkyStructureSwitch == 'true') {

            }

            data = this.$qs.stringify(data);
            this.$http.post('vsas/convert/target/to/mark', data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '创建转标注任务成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '创建转标注任务失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        // 下载
        getProress() {
            if (this.istwoinves == 1) { // 下载所有
                this.allDown()
            } else if (this.issetinves == 2) { // 一次排查下载
                this.oneDown()
            } else if (this.issetinves == 3) { // 二次排查下载
                this.twoDown()
            }
        },
        //打开下载页面的时候获取文件的数量
        openDownData() {
            this.radio1 = 1
            this.checkRadio1 = 1
            this.minDownImg = 1
            this.maxDownImg = this.totalCount
        },
        // 验证数字的最小值
        verifymin() {
            this.minDownImg = Number(this.minDownImg.replace('/^(0+)|[^\D]+/g', ''))
            if (this.minDownImg <= 0 || this.minDownImg >= this.totalCount) {
                this.minDownImg = 1
            }
        },
        //验证数字的最大值
        verifymax() {
            this.maxDownImg = Number(this.maxDownImg.replace('/^(0+)|[^\D]+/g',''))
            if (this.maxDownImg <= 0 || this.maxDownImg >= this.totalCount || this.maxDownImg < this.minDownImg) {
                this.maxDownImg = this.totalCount
            }
        },
        batchDownLoad() {
            this.dialogDownLoad = true
            this.searchDownImg = 1
        },
        // 下载通用参数提取
        commonList() {
            let strusinfo = {
                taskUuid: this.proptaskUuid,
                caseUuid: this.caseUuid,
                curUserId: this.userId,
                type: this.isoptfor,
                thumbnail: this.thumbnail == true ? 1 : 0,
                HD: this.HD == true ? 1 : 0,
            }
            return strusinfo
        },
        // 下载所有
        allDown() {
            let data = {}
            if (this.thumbnail == false && this.HD == false) { // 不勾选缩略图，高清图的判断
                this.$notify({
                    type: 'warning',
                    message: '请勾选导出项！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (this.radio1 == 1) { // 序号
                let navList = this.commonList()
                data = {
                    startNumber: this.minDownImg,
                    endNumber: this.maxDownImg,
                }
                data = Object.assign(navList, data)
            } else if (this.radio1 == 2) { // 时间
                let navList = this.commonList()
                data = {
                    startTime: this.beginData,
                    endTime: this.endData
                }
                data = Object.assign(navList, data)
            } else { // 全部
                let navList = this.commonList()
                data = {
                    startTime: '',
                    endTime: '',
                }
                data = Object.assign(navList, data)
            }
            data = this.$qs.stringify(data);
            this.$http.post('vsas/structure/download/structure/getStructureResult', data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '下载任务创建成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.dialogDownLoad = false
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: 'warning',
                        message: '查询内容为空！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '下载任务创建失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        // 一次下载通用参数提取
        commonOnceList() {
            let strusinfo = {
                caseUuid: this.caseUuid,
                attrFlag: this.isoptfor,
                spaceFlag: this.arearule,
                coordinate: this.actualcoord.join(','),
                originalCoordinate: this.originalCoordinate.join(','),
                thumbnail: this.thumbnail == true ? 1 : 0,
                HD: this.HD == true ? 1 : 0,
                curUserId: this.userId,
            }
            return strusinfo
        },
        // 一次排查下载
        oneDown() {
            let data = {}
            if (this.thumbnail == false && this.HD == false) { // 不勾选缩略图，高清图的判断
                this.$notify({
                    type: 'warning',
                    message: '请勾选导出项！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            let strusinfo
            if (this.showVideoStruct == 'true') { // glst字段
                if (this.radio1 == 1) { // 序号
                    let navList = this.commonOnceList()
                    data = {
                        fileUuids: this.onefileUuids,
                        startNumber: this.minDownImg,
                        endNumber: this.maxDownImg,
                    }
                    data = Object.assign(navList, data)
                } else if (this.radio1 == 2) { // 时间
                    let navList = this.commonOnceList()
                    data = {
                        fileUuids: this.onefileUuids,
                        startTime: this.beginData,
                        endTime: this.endData
                    }
                    data = Object.assign(navList, data)
                } else { // 全部
                    let navList = this.commonOnceList()
                    data = {
                        fileUuids: this.onefileUuids,
                        startTime: '',
                        endTime: ''
                    }
                    data = Object.assign(navList, data)
                }
                if (this.isoptfor == 1) { // 判断人，车，骑车人
                    strusinfo = this.structuroneList.personGlst
                } else if (this.isoptfor == 2) {
                    strusinfo = this.structuroneList.motorVehicleGlst
                } else if (this.isoptfor == 3) {
                    strusinfo = this.structuroneList.bicycleGlst
                }
            } else if (this.zkyStructureSwitch == 'true') { // zky字段
                if (this.radio1 == 1) { // 序号
                    let navList = this.commonOnceList()
                    data = {
                        fileUuids: this.zkystructuroneList.fileUuid,
                        originalCoordinate: this.zkystructuroneList.originalCoordinate,
                        direction: this.zkystructuroneList.direction,
                        startNumber: this.minDownImg,
                        endNumber: this.maxDownImg,
                    }
                    data = Object.assign(navList, data)
                } else if (this.radio1 == 2) { // 时间
                    let navList = this.commonOnceList()
                    data = {
                        fileUuids: this.zkystructuroneList.fileUuid,
                        originalCoordinate: this.zkystructuroneList.originalCoordinate,
                        direction: this.zkystructuroneList.direction,
                        startTime: this.beginData,
                        endTime: this.endData
                    }
                    data = Object.assign(navList, data)
                } else { // 全部
                    let navList = this.commonOnceList()
                    data = {
                        fileUuids: this.zkystructuroneList.fileUuid,
                        originalCoordinate: this.zkystructuroneList.originalCoordinate,
                        direction: this.zkystructuroneList.direction,
                        startTime: '',
                        endTime: ''
                    }
                    data = Object.assign(navList, data)
                }
                if (this.isoptfor == 1) { // 判断人，车，骑车人
                    strusinfo = this.zkystructuroneList.personZky
                    strusinfo.ids = ''
                } else if (this.isoptfor == 2) {
                    strusinfo = this.zkystructuroneList.motorVehicleZky
                    strusinfo.ids = ''
                } else if (this.isoptfor == 3) {
                    strusinfo = this.zkystructuroneList.bicycleZky
                    strusinfo.ids = ''
                }
            }
            let datas = Object.assign(strusinfo, data)
            datas = this.$qs.stringify(datas)
            this.$http.post('vsas/structure/download/structure/oneFilter', datas).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '下载任务创建成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.dialogDownLoad = false
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: 'warning',
                        message: '查询内容为空！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '下载任务创建失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        // 二次排查下载
        twoDown() {
            let data = {}
            if (this.thumbnail == false && this.HD == false) { // 不勾选缩略图，高清图的判断
                this.$notify({
                    type: 'warning',
                    message: '请勾选导出项！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (this.radio1 == 1) { // 切换到范围多少到多少
                let navList = this.commonOnceList()
                data = {
                    originalCoordinate: this.zkystructuroneList.originalCoordinate,
                    direction: this.zkystructuroneList.direction,
                    fileUuids: this.zkystructuroneList.fileUuid,
                    startNumber: this.minDownImg,
                    endNumber: this.maxDownImg,
                }
                data = Object.assign(navList, data)
            } else if (this.radio1 == 2) { // 切换到时间
                let navList = this.commonOnceList()
                data = {
                    fileUuids: this.zkystructuroneList.fileUuid,
                    deviceId: this.deviceId,
                    startTime: this.beginData,
                    endTime: this.endData
                }
                data = Object.assign(navList, data)
            } else { // 切换到全部
                let navList = this.commonOnceList()
                data = {
                    fileUuids: this.zkystructuroneList.fileUuid,
                    deviceId: this.deviceId,
                    startTime: '',
                    endTime: '',
                }
                data = Object.assign(navList, data)
            }
            let strusinfo
            if (this.showVideoStruct == 'true') { // glst字段
                if (this.isoptfor == 1) { // 判断人，车，骑车人
                    strusinfo = this.structuroneList.personGlst
                } else if (this.isoptfor == 2) {
                    strusinfo = this.structuroneList.motorVehicleGlst
                } else if (this.isoptfor == 3) {
                    strusinfo = this.structuroneList.bicycleGlst
                }
            } else if (this.zkyStructureSwitch == 'true') { // zky字段
                if (this.isoptfor == 1) { // 判断人，车，骑车人
                    strusinfo = this.zkystructuroneList.personZky
                    strusinfo.ids = '' // 勾选下载清空ids
                } else if (this.isoptfor == 2) {
                    strusinfo = this.zkystructuroneList.motorVehicleZky
                    strusinfo.ids = '' // 勾选下载清空ids
                } else if (this.isoptfor == 3) {
                    strusinfo = this.zkystructuroneList.bicycleZky
                    strusinfo.ids = '' // 勾选下载清空ids
                }
            }
            // console.log(data,'3333');
            let datas = Object.assign(strusinfo, data)
            datas = this.$qs.stringify(datas);
            // console.log(this.twofileUuids,'444444');
            // console.log(strusinfo,'llll----------');
            // console.log(datas,'haha============-===========');
            this.$http.post('vsas/structure/download/structure/twoFilter', datas).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '下载任务创建成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.dialogDownLoad = false
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: 'warning',
                        message: '查询内容为空！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '下载任务创建失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        // 全选反选
        handleCheckAll(val) {
            this.checkvideo = val ? this.videolist : []
            if (!val) {
                this.lableimg = ''
            } else {
                this.checkvideo = this.videolist
                if (this.videolist.length) {
                    this.lableimg = this.videolist[0].snapUrl
                }
                this.$nextTick(() => {
                    this.getImgWh(); //通过图片的大小，来判断canvas大小
                })

            }
            this.isIndeterminate = false;
            this.clearCanvas();
        },
        //导出
        selectImg() {
            this.searchDownImg = 2 //确定选择，取消选择
            this.groundIds = []
            for (let i = 0; i < this.strusList.length; i++) {
                this.strusList[i].state = false
            }
        },
        // 确定选择
        confirmDown() {
            if (!this.groundIds.length) {
                this.$notify({
                    type: 'warning',
                    message: '请勾选图片！',
                    position: 'bottom-right',
                    duration: 3000
                })
            } else {
                this.exportDialog = true // 关闭当前页面
            }
        },
        // 勾选导出图片
        ClickCheckd(item, index) {
            // 判断勾选项
            item.state = !item.state
            this.$set(this.strusList, index, item)
            if (!item.state) {
                if (this.groundIds.length) {
                    for (let i = 0; i < this.groundIds.length; i++) {
                        if (item.personUuid == this.groundIds[i]) {
                            this.groundIds = _.pull(this.groundIds, item.personUuid) //删除未勾选的某一项
                        } else if (item.vehicleUuid == this.groundIds[i]) {
                            this.groundIds = _.pull(this.groundIds, item.vehicleUuid) //删除未勾选的某一项
                        } else if (item.bicycleUuid == this.groundIds[i]) {
                            this.groundIds = _.pull(this.groundIds, item.bicycleUuid) //删除未勾选的某一项
                        }
                    }
                }
            }
            if (item.state && item.personUuid) {
                this.groundIds.push(item.personUuid)
            } else if (item.state && item.vehicleUuid) {
                this.groundIds.push(item.vehicleUuid)
            } else if (item.state && item.bicycleUuid) {
                this.groundIds.push(item.bicycleUuid)
            }
        },
        // 确定选择
        trueDown() {
            if (this.thumbnail == false && this.HD == false) { //不勾选缩略图，高清图的判断
                this.$notify({
                    type: 'warning',
                    message: '请勾选导出项！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (this.showVideoStruct == 'true') { // 判断glst
                let data = {
                    taskUuid: this.proptaskUuid, // 任务id
                    caseUuid: this.caseUuid,
                    ids: this.groundIds.join(','), // 选择 (英文逗号分隔)
                    thumbnail: this.thumbnail == true ? 1 : 0, // 缩略图
                    HD: this.HD == true ? 1 : 0, // 高清
                    type: this.isoptfor, // 人，车，骑车人
                    curUserId: this.userId, // 用户id
                }
                data = this.$qs.stringify(data);
                this.$http.post('vsas/structure/download/structure/getStructureResult', data).then(res => {
                    if (res.data.code == 200) {
                        this.$notify({
                            type: 'success',
                            message: '下载任务创建成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.exportDialog = false
                    } else if (res.data.code == 100) {
                        this.$notify({
                            type: 'warning',
                            message: '查询内容为空！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.exportDialog = false
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '下载任务创建失败！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.exportDialog = false
                    }
                })
            } else if (this.zkyStructureSwitch == 'true') { // zky
                let strusinfo
                if (this.istwoinves == 1) { // 下载所有
                    let data = {
                        taskUuid: this.proptaskUuid, // 任务id
                        caseUuid: this.caseUuid,
                        ids: this.groundIds.join(','), // 选择 (英文逗号分隔)
                        thumbnail: this.thumbnail == true ? 1 : 0, // 缩略图
                        HD: this.HD == true ? 1 : 0, // 高清
                        type: this.isoptfor, // 人，车，骑车人
                        curUserId: this.userId, // 用户id
                    }
                    data = this.$qs.stringify(data);
                    this.$http.post('vsas/structure/download/structure/getStructureResult', data).then(res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                type: 'success',
                                message: '下载任务创建成功！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        } else if (res.data.code == 100) {
                            this.$notify({
                                type: 'warning',
                                message: '查询内容为空！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        } else {
                            this.$notify({
                                type: 'error',
                                message: '下载任务创建失败！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        }
                    })
                } else if (this.issetinves == 2) { // 一次排查下载
                    let data = {
                        taskUuid: '', // 任务id
                        caseUuid: this.caseUuid,
                        ids: this.groundIds.join(','), // 选择 (英文逗号分隔)
                        thumbnail: this.thumbnail == true ? 1 : 0, // 缩略图
                        HD: this.HD == true ? 1 : 0, // 高清
                        type: this.isoptfor, // 人，车，骑车人
                        curUserId: this.userId, // 用户id
                        fileUuids: this.zkystructuroneList.fileUuid,
                        originalCoordinate: this.zkystructuroneList.originalCoordinate,
                        direction: this.zkystructuroneList.direction,
                        attrFlag: this.isoptfor,
                        spaceFlag: this.arearule,
                    }
                    if (this.isoptfor == 1) { // 判断人，车，骑车人
                        // console.log(this.zkystructuroneList,'enenene1');
                        strusinfo = this.zkystructuroneList.personZky
                    } else if (this.isoptfor == 2) {
                        strusinfo = this.zkystructuroneList.motorVehicleZky
                    } else if (this.isoptfor == 3) {
                        strusinfo = this.zkystructuroneList.bicycleZky
                    }
                    let datas = Object.assign(strusinfo, data)
                    datas = this.$qs.stringify(datas)
                    this.$http.post('vsas/structure/download/structure/oneFilter', datas).then(res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                type: 'success',
                                message: '下载任务创建成功！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        } else if (res.data.code == 100) {
                            this.$notify({
                                type: 'warning',
                                message: '查询内容为空！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        } else {
                            this.$notify({
                                type: 'error',
                                message: '下载任务创建失败！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        }
                    })
                } else if (this.issetinves == 3) { // 二次排查下载
                    let data = {
                        taskUuid: '', // 任务id
                        caseUuid: this.caseUuid,
                        ids: this.groundIds.join(','), // 选择 (英文逗号分隔)
                        thumbnail: this.thumbnail == true ? 1 : 0, // 缩略图
                        HD: this.HD == true ? 1 : 0, // 高清
                        type: this.isoptfor, // 人，车，骑车人
                        curUserId: this.userId, // 用户id
                        fileUuids: this.zkystructuroneList.fileUuid,
                        originalCoordinate: this.zkystructuroneList.originalCoordinate,
                        direction: this.zkystructuroneList.direction,
                        deviceId: this.deviceId,
                        attrFlag: this.isoptfor,
                        spaceFlag: this.arearule,
                        coordinate: this.actualcoord.join(','),
                        // originalCoordinate: this.originalCoordinate.join(','),
                    }
                    let strusinfo
                    if (this.isoptfor == 1) { // 判断人，车，骑车人
                        strusinfo = this.zkystructuroneList.personZky
                    } else if (this.isoptfor == 2) {
                        strusinfo = this.zkystructuroneList.motorVehicleZky
                    } else if (this.isoptfor == 3) {
                        strusinfo = this.zkystructuroneList.bicycleZky
                    }
                    let datas = Object.assign(strusinfo, data)
                    datas = this.$qs.stringify(datas)
                    this.$http.post('vsas/structure/download/structure/twoFilter', datas).then(res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                type: 'success',
                                message: '下载任务创建成功！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        } else if (res.data.code == 100) {
                            this.$notify({
                                type: 'warning',
                                message: '查询内容为空！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        } else {
                            this.$notify({
                                type: 'error',
                                message: '下载任务创建失败！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.exportDialog = false
                        }
                    })
                }
            }
        },
        // 取消选择
        cancleSearch() {
            this.searchDownImg = 1 //置成默认状态
        },
        //打开结果模态框的时候请求当前任务的状态
        //获取当前检索任务的进度以及完成状态
        gettaskStatus(id) {
            this.$http.get("vsas/task/Structure/progress?taskUuid=" + id).then(res => {
                if (res.data.code == 200) {
                    this.filestatus = res.data.data.status
                    if (this.filestatus == 0 || res.data.data.progress == 100) {
                        // console.log('清空了定时器');
                        clearInterval(this.statsuTimes)
                    }
                }
            });
        },
        //获取当前点位下面的视频
        getvideo(pointId) {
            // console.log(pointId,'222');
            let data = {
                caseUuid: this.caseUuid,
                pointId: pointId, //点位ID
            }
            this.$http.get('/vsas/structure/listPointOrVideo', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.videolist = res.data.data
                    //1打开模态框先加载地图点位，默认打开第一个点位下方的视频，然后所有视频的第一个文件的图片
                    //2打开模态框的时候，或者点击点位获取视频的时候，来获取快照，定义图片的宽高，以及更新canvas的宽高
                    if (this.videolist.length) {
                        if (this.istwoinves == 2) {
                            //先获取一次排查的视频ID
                            let fileUuids = this.glststrusInfo.fileUuid.split(',')
                            //如果一次排查传过来的值跟当前结果请求的值数量相等，表示一次排查的时候视频全选
                            //否则就不是全选 通过判断来获取当前选中的值
                            if (fileUuids.length == this.videolist.length) {
                                this.checkvideo = this.videolist
                            } else {
                                this.checkvideo = []
                                for (let i = 0; i < this.videolist.length; i++) {
                                    for (let j = 0; j < fileUuids.length; j++) {
                                        if (this.videolist[i].fileUuid == fileUuids[j]) {
                                            this.checkvideo.push(this.videolist[i])
                                        }
                                    }
                                }
                            }
                            this.lableimg = this.glststrusInfo.image
                            console.log(this.lableimg, '111');
                            this.$nextTick(() => {
                                this.getImgWh(); //通过图片的大小，来判断canvas大小
                            })

                            // 三、获取排查区域的条件
                            this.arearule = this.glststrusInfo.spaceFlag + '';
                            //四、通过排查区域条件来画框
                            if (this.arearule == 1 || this.arearule == 2) {
                                //获取canvas
                                var context = document.getElementById('onecanvas').getContext('2d')
                                //获取一次排查结果的原始点坐标 用数组展示 [1,2,3,4,5,6]
                                let arr = this.glststrusInfo.originalCoordinate.split(',')
                                let arr1 = []
                                let arr2 = []
                                //吧上面的数据切换成下面的数据样式 [[1,2],[3,4],[5,6]]
                                for (let i = 0; i < arr.length; i++) {
                                    let aaa = [arr[i], arr[i + 1]]
                                    arr1.push(aaa)
                                }
                                for (let i = 0; i < arr1.length; i++) {
                                    if (i % 2 == 0) {
                                        arr2.push(arr1[i])
                                    }
                                }
                                setTimeout(() => {
                                    //然后通过循环画框
                                    for (let i = 0; i < arr2.length; i++) {
                                        if (i < arr2.length - 1) {
                                            let coordinates = [arr2[i], arr2[i + 1]]
                                            this.drawRect(coordinates, context)
                                        }
                                    }
                                    //画最后一条框，用最后一个点的坐标加上第一个点的坐标
                                    let coordinatestwo = [arr2[arr2.length - 1], arr2[0]]
                                    this.drawRect(coordinatestwo, context)
                                }, 500)
                            } else if (this.arearule == 3) {
                                setTimeout(() => {
                                    //只有两个点，直接转成需要用到的坐标来画框
                                    var context = document.getElementById('onecanvas').getContext('2d')
                                    let arr = this.glststrusInfo.originalCoordinate.split(',')
                                    let coordinates = [
                                        [Number(arr[0]), Number(arr[1])],
                                        [Number(arr[2]), Number(arr[3])]
                                    ]
                                    this.drawRect(coordinates, context)
                                }, 500)
                            } else if (this.arearule == 4) {
                                setTimeout(() => {
                                    //先画框 ，然后画框后通过坐标来话箭头
                                    var context = document.getElementById('onecanvas').getContext('2d')
                                    let arr = this.glststrusInfo.originalCoordinate.split(',')
                                    let coordinates = [
                                        [Number(arr[0]), Number(arr[1])],
                                        [Number(arr[2]), Number(arr[3])],
                                        [Number(arr[4]), Number(arr[5])]
                                    ]
                                    this.drawRect(coordinates, context)
                                    this.showCanvas = true
                                    this.getarrows(coordinates)
                                }, 500)
                            }
                            this.clearCanvas();
                        } else {
                            this.lableimg = ''
                            this.checkvideo = this.videolist
                            this.lableimg = this.videolist[0].snapUrl
                            console.log(this.lableimg, '2222');
                            this.$nextTick(() => {
                                this.getImgWh();
                            })
                        }
                    } else {
                        this.lableimg = ''
                        this.showCanvas = false
                        this.checkpt = null
                        var canvas = document.getElementById("onecanvas");
                        canvas.setAttribute("width", 0);
                        canvas.setAttribute("height", 0);
                    }
                }
            })
        },
        //通过图片的大小，来判断canvas大小
        getImgWh() {
            let imgcanvas = document.getElementById('imgcanvas')
            let lookimg = document.getElementById('lookimg')
            let img = new Image
            img.src = this.lableimg
            let _this = this
            img.onload = function () {
                //设置两个canvas的大小
                imgwh(lookimg, imgcanvas);
                var canvas = document.getElementById("onecanvas");
                var canvastwo = document.getElementById("twocanvas");
                // var canvasthree = document.getElementById("threecanvas");
                // var canvasfour = document.getElementById("fourcanvas");
                canvas.setAttribute("width", lookimg.clientWidth);
                canvas.setAttribute("height", lookimg.clientHeight);
                canvastwo.setAttribute("width", lookimg.clientWidth);
                canvastwo.setAttribute("height", lookimg.clientHeight);
                // canvasthree.setAttribute("width", lookimg.clientWidth);
                // canvasthree.setAttribute("height", lookimg.clientHeight);
                // canvasfour.setAttribute("width", lookimg.clientWidth);
                // canvasfour.setAttribute("height", lookimg.clientHeight);
                _this.clearCanvas();
            };
        },
        //打开的时候默认请求第一个点位下面的视频
        getptlist(id, index) {
            this.clearCanvas();
            this.checkvideo = [] //切换选中视频的时候清空所有的与选中的视频
            this.actualcoord = []
            this.coordinates = []
            this.originalCoordinate = []
            this.getvideo(id)
            this.checkpt = index
        },
        //得到当前案件下的当前点位的最大时间和最小时间
        getChangeTime(id) {
            let data = {
                caseUuid: id,
            };
            this.$http.get("vsas/structure/getDate", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.beginData = res.data.data.startTime;
                    this.endData = res.data.data.endTime;
                    this.$nextTick(() => {
                        this.OpenTheTime4("#beginDelTime", "#endDelTime");
                    })
                }
            });
        },
        //得到所有选中的视频
        getallVideo(val) {
            // 勾选所有选中视频
            this.checkAll = val.length === this.videolist.length
            this.isIndeterminate = val.length > 0 && val.length < this.videolist.length
            if (this.checkvideo.length) {
                if (this.lableimg != this.checkvideo[0].snapUrl) {
                    this.lableimg = this.checkvideo[0].snapUrl
                    console.log(this.lableimg, '333');
                    this.getImgWh();
                }
            } else {
                this.clearCanvas();
                this.lableimg = ''
                this.showCanvas = false;
                var canvas = document.getElementById("onecanvas")
                var canvastwo = document.getElementById("twocanvas");
                canvas.setAttribute("width", 0);
                canvas.setAttribute("height", 0);
                canvastwo.setAttribute("width", 0);
                canvastwo.setAttribute("height", 0);
            }
        },
        //改变开始时间
        changebegintime(val) {
            this.endData = this.endtimes
            this.beginData = this.begintimes
            if (!val && this.checkendtime) { //只有结束时间
                this.timeone = 3
                this.timetwo = 2
                this.$nextTick(() => {
                    laydate.render({
                        elem: "#checktwo", //指定元素
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: (value, date, endDate) => {
                            this.endData = value
                        }
                    });
                });
            } else if (val && this.checkendtime) { //都有
                this.timeone = 1;
                this.timetwo = 1
                this.$nextTick(() => {
                    this.OpenTheTime4("#checkbegin", "#checkend");
                });
            } else if (!val && !this.checkendtime) { //都没有
                this.timeone = 3
                this.timetwo = 3
            } else if (val && !this.checkendtime) { //只有开始时间
                this.timeone = 2
                this.timetwo = 3
                this.$nextTick(() => {
                    laydate.render({
                        elem: "#checkone", //指定元素
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: (value, date, endDate) => {
                            this.beginData = value
                        }
                    });
                });
            }
        },
        //切换下载
        switchDown(val) {
            if (val == '2') { // 时间段
                this.getChangeTime(this.caseUuid)
            } else {
                this.minDownImg = 1
                this.maxDownImg = this.totalCount
            }
        },
        //改变结束时间
        changeendtime(val) {
            this.endData = this.endtimes
            this.beginData = this.begintimes
            if ((!val && this.checkbegintime)) {
                this.timeone = 2
                this.timetwo = 3
                this.$nextTick(() => {
                    laydate.render({
                        elem: "#checkone", //指定元素
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: (value, date, endDate) => {
                            this.beginData = value
                        }
                    });
                });
            } else if (val && this.checkbegintime) {
                this.timeone = 1;
                this.timetwo = 1
                this.$nextTick(() => {
                    this.OpenTheTime4("#checkbegin", "#checkend");
                });
            } else if (!val && !this.checkbegintime) {
                this.timeone = 3
                this.timetwo = 3
            } else if (val && !this.checkbegintime) {
                this.timeone = 3
                this.timetwo = 2
                this.$nextTick(() => {
                    laydate.render({
                        elem: "#checktwo", //指定元素
                        type: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        max: 1,
                        done: (value, date, endDate) => {
                            this.endData = value
                        }
                    });
                });
            }
        },


        // 3. 执行画框划线以及画箭头的方法
        getcoordnate(e) {
            //获取canvas
            if (this.istwoinves == 2) {
                // var context = document.getElementById('threecanvas').getContext('2d')
            } else {
                var context = document.getElementById('onecanvas').getContext('2d')
            }
            //1或者2表示的是画框的方法 3 表示划线，4 表示画箭头
            if ((this.arearule == 1 || this.arearule == 2) && !this.isbdclick) {
                var x = e.offsetX //当前点击的位置的横坐标
                var y = e.offsetY //当前点击的位置的纵坐标
                this.coordinates.push([x, y])
                //当点击坐标为2个点的时候，画成一条线
                if (this.coordinates.length == 2) {
                    draw(this.coordinates, context)
                } else if (this.coordinates.length > 2) {
                    //当数组大于2个的时候永远使用最后两项来画图
                    draw(this.coordinates.slice(this.coordinates.length - 2, this.coordinates.length), context)
                }
            } else if (this.arearule == 3) {
                var x = e.offsetX //当前点击的位置的横坐标
                var y = e.offsetY //当前点击的位置的纵坐标
                this.coordinates.push([x, y])
                // console.log(this.coordinates,'坐标');
                draw(this.coordinates, context) //画线
            } else if (this.arearule == 4) {
                var x = e.offsetX //当前点击的位置的横坐标
                var y = e.offsetY //当前点击的位置的纵坐标
                this.coordinates.push([x, y])
                draw(this.coordinates, context) // 线
                if (this.coordinates.length > 2) {
                    if (this.istwoinves == 2) {
                        this.showtwoCanvas = true
                        this.getarrowss(this.coordinates)
                    } else {
                        this.showCanvas = true
                        this.getarrows(this.coordinates)
                    }

                }
            }
        },
        //3.画框结束前结束画线，并存储
        dbgetcoor(e) {
            //判断是否双击完成，双击完成不能再次点击
            if (!this.isbdclick) {
                if (this.istwoinves == 2) {
                    // var context = document.getElementById('threecanvas').getContext('2d')
                } else {
                    var context = document.getElementById('onecanvas').getContext('2d')
                }
                var x = e.offsetX //当前点击的位置的横坐标
                var y = e.offsetY //当前点击的位置的纵坐标
                this.coordinates.push([x, y])
                if ((this.arearule == 1 || this.arearule == 2) && this.coordinates.length > 2) {
                    let coord = [this.coordinates[this.coordinates.length - 1], this.coordinates[0]]
                    draw(coord, context)
                    this.isbdclick = true
                }
            }

        },
        //4.画箭头的方法并获取角度
        getarrows(coordinates) {
            var canvas = document.getElementById('twocanvas')
            var context = document.getElementById('twocanvas').getContext('2d')
            context.clearRect(0, 0, canvas.width, canvas.height);
            let a = 0
            let b = 0
            if (coordinates[0][0] > coordinates[1][0]) {
                a = coordinates[1][0] + (coordinates[0][0] - coordinates[1][0]) / 2
            } else {
                a = coordinates[0][0] + (coordinates[1][0] - coordinates[0][0]) / 2
            }

            if (coordinates[0][1] > coordinates[1][1]) {
                b = coordinates[1][1] + (coordinates[0][1] - coordinates[1][1]) / 2;
            } else {
                b = coordinates[0][1] + (coordinates[1][1] - coordinates[0][1]) / 2;
            }
            var line = new Line(a, b, coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1], 'red');
            line.drawWithArrowheads(context);
            //a b 表示的的中心点
            let p1 = {
                x: a,
                y: b
            }
            let p2 = {
                x: coordinates[coordinates.length - 1][0],
                y: coordinates[coordinates.length - 1][1]
            }
            let angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x))
            this.theta = angle * (180 / Math.PI)
        },
        getarrowss(coordinates) {
            var canvas = document.getElementById('fourcanvas')
            var context = document.getElementById('fourcanvas').getContext('2d')
            context.clearRect(0, 0, canvas.width, canvas.height);
            let a = 0
            let b = 0
            if (coordinates[0][0] > coordinates[1][0]) {
                a = coordinates[1][0] + (coordinates[0][0] - coordinates[1][0]) / 2
            } else {
                a = coordinates[0][0] + (coordinates[1][0] - coordinates[0][0]) / 2
            }

            if (coordinates[0][1] > coordinates[1][1]) {
                b = coordinates[1][1] + (coordinates[0][1] - coordinates[1][1]) / 2;
            } else {
                b = coordinates[0][1] + (coordinates[1][1] - coordinates[0][1]) / 2;
            }
            var line = new Line(a, b, coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1], 'red');
            line.drawWithArrowheads(context);
            //a b 表示的的中心点
            let p1 = {
                x: a,
                y: b
            }
            let p2 = {
                x: coordinates[coordinates.length - 1][0],
                y: coordinates[coordinates.length - 1][1]
            }
            let angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x))
            this.theta = angle * (180 / Math.PI)
        },
        //5.切换类型的的时候清空canvas
        clearCanvas() {
            this.isbdclick = false //是否双击变成false
            this.coordinates = []
            this.actualcoord = []
            this.originalCoordinate = []
            this.theta = ''
            if (this.istwoinves == 2) {
                this.showtwoCanvas = false
                let lookimg = document.getElementById('lookimg')
                // var canvasthree = document.getElementById("threecanvas")
                // var canvasfour = document.getElementById("fourcanvas");
                // let context3 = canvasthree.getContext('2d')
                // let context4 = canvasfour.getContext('2d')
                // context3.clearRect(0, 0, lookimg.clientWidth, lookimg.clientHeight)
                // context4.clearRect(0, 0, lookimg.clientWidth, lookimg.clientHeight)
            } else {
                let lookimg = document.getElementById('lookimg')
                this.showCanvas = false
                var canvas = document.getElementById("onecanvas")
                var canvastwo = document.getElementById("twocanvas");
                let context1 = canvas.getContext('2d')
                let context2 = canvastwo.getContext('2d')
                context1.clearRect(0, 0, lookimg.clientWidth, lookimg.clientHeight)
                context2.clearRect(0, 0, lookimg.clientWidth, lookimg.clientHeight)
            }


        },

        //得到人的信息
        getpersonInfo() {
            if (this.disperson || this.discar || this.disbic) {
                this.isoptfor = 1
                return
            }
            this.clearporpe()
            this.isoptfor = 1
        },
        //得到车的信息
        getcarInfo() {
            if (this.disperson || this.discar || this.disbic) {
                this.isoptfor = 2
                return
            }
            this.clearporpe()
            this.isoptfor = 2
        },
        //得到骑车人的信息
        getbicInfo() {
            if (this.disperson || this.discar || this.disbic) {
                this.isoptfor = 3
                return
            }
            this.clearporpe()
            this.isoptfor = 3
        },
        //点击排查进行后台接口请求然后筛选
        bengininves() {
            // console.log('kaishi');
            //istwoinves == 2 表示是二次排查  istwoinves == 1表示是一次排查
            this.dialogVisible = false //关闭排查条件页面，打开排查结果页面
            if (this.istwoinves == 2 || this.istwoinves == 3) {
                //执行二次排查结果
                this.issetinves = 3
                this.twotroubleshoot();
            } else {
                //执行一次排查结果
                this.issetinves = 2
                this.onetroubleshoot()
            }
        },
        // 判断执行glst第一次排查结果
        onetroubleshoot() {
            //如果showVideoStruct == ture表示是格林深瞳，否则就是中科院
            if (this.showVideoStruct == 'true') { // glst
                this.oneinves()
            } else if (this.zkyStructureSwitch == 'true') { //zky
                this.setzkyStusinfo(this.$refs.zkyStruc.getzky())
                this.zkyonecheck()
            }
        },
        // 判断执行glst第二次排查结果
        twotroubleshoot() {
            if (this.showVideoStruct == 'true') { // glst
                this.twoglstinves()
            } else if (this.zkyStructureSwitch == 'true') { // zky
                this.setzkyStusinfo(this.$refs.zkyStruc.getzky())
                this.twozkyinves(0)
            }
        },
        //获取排查的时候当前时间的更新
        getinvesTime() {
            let times = []
            //表示只有开始时间
            if (this.checkbegintime && !this.checkendtime) {
                times[0] = this.beginData
                times[1] = ''
            } else if (!this.checkbegintime && this.checkendtime) { //只有结束时间
                times[0] = ''
                times[1] = this.endData
            } else if (this.checkbegintime && this.checkendtime) { //两个时间都有
                times[0] = this.beginData
                times[1] = this.endData
                // console.log(moment(this.beginData) > moment(this.endData));

            } else if (!this.checkbegintime && !this.checkendtime) { //两个时间都没有
                times[0] = ''
                times[1] = ''
            }
            return times
        },
        //执行glst一次排查结果
        oneinves() {
            let times = this.getinvesTime()
            if (moment(times[0]) > moment(times[1])) {
                this.$notify({
                    type: 'warning',
                    message: '开始时间不能大于结束时间',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            let imgs = document.getElementById('lookimg')
            // console.log(this.coordinates,77777);
            // console.log(this.coordinates.length,999999);
            if (this.arearule == 1 || this.arearule == 2) {
                if (this.coordinates.length == 0) {
                    this.originalCoordinate = [imgs.naturalWidth, imgs.naturalHeight]
                    this.coordinates = []
                    this.actualcoord = []
                    // this.$notify({
                    //   type: 'warning',
                    //   message: '请画规则',
                    //   position: 'bottom-right',
                    //   duration: 3000
                    // });
                    // return
                } else if (this.coordinates.length > 0 && !this.isbdclick) {
                    this.$notify({
                        type: 'warning',
                        message: '请双击闭合区域',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                } else if (this.coordinates.length > 2 && this.isbdclick) {
                    this.originalCoordinate = this.coordinates.slice(0, this.coordinates.length - 2)
                    coorValue(imgs, this.coordinates.slice(0, this.coordinates.length - 2), this.actualcoord)
                }
            } else if (this.arearule == 3) {
                // if(this.coordinates.length == 0){
                //   this.originalCoordinate = []
                //   this.coordinates = []
                // }else
                // console.log(this.coordinates,'1111');
                if (this.coordinates.length >= 0 && this.coordinates.length < 2) {
                    this.$notify({
                        type: 'warning',
                        message: '请设置排查规则',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                } else if (this.coordinates.length >= 2) {
                    this.originalCoordinate = this.coordinates.slice(0, 2)
                    coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord)
                }
            } else if (this.arearule == 4) {
                // if(this.coordinates.length == 0){
                //   this.originalCoordinate = []
                //   this.coordinates = []
                // }else
                // console.log(this.coordinates,'222');
                if (this.coordinates.length >= 0 && this.coordinates.length <= 2) {
                    this.$notify({
                        type: 'warning',
                        message: '请设置排查规则',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                } else if (this.coordinates.length > 2) {
                    let arr = this.coordinates.slice(0, 2)
                    arr.push(this.coordinates.pop())
                    this.originalCoordinate = arr
                    coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord)
                }
                // if(this.coordinates.length <= 2){
                //   this.$notify({
                //     type: 'warning',
                //     message: '请画规则',
                //     position: 'bottom-right',
                //     duration: 3000
                //   });
                //   return
                // }
                //划箭头方法先获取钱两个点的一条线，然后再获取最后一个点
            }
            if (this.checkvideo.length == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请选择视频',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            } else if (this.lableimg == '') {
                this.$notify({
                    type: 'warning',
                    message: '请选择图片',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            let strusinfo = this.getstrusinfo() //得到结构化信息
            //表示在跨线的时候执行方法来获取方位
            let direction
            if (this.arearule == 4) {
                direction = this.getorientation()
            } else {
                direction = ''
            }
            // let fileUuids = []
            this.onefileUuids = []
            for (let i = 0; i < this.checkvideo.length; i++) {
                this.onefileUuids += this.checkvideo[i].fileUuid + ','
            }
            this.onefileUuids = this.onefileUuids.substr(0, this.onefileUuids.length - 1)
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在排查"
            });

            let data = {
                fileUuids: this.onefileUuids,
                startTime: times[0], //开始时间
                endTime: times[1], //结束时间
                deviceUuid: this.deviceId, //点位ID
                attrFlag: this.isoptfor, //1：行人，2：机动车，3：非机动车
                spaceFlag: this.arearule, // 空间标记：1：感兴趣区域，2：排除区域，3：跨线排查，4：方向排查
                coordinate: this.actualcoord.join(','), //坐标（实际坐标）
                // coordinate:'2,1000,1920,1000',
                originalCoordinate: this.originalCoordinate.join(','), //原始点坐标
                direction: direction, //方向
                caseUuid: this.caseUuid
            }
            let datas = Object.assign(data, strusinfo)
            datas = this.$qs.stringify(datas)
            this.$http.post('vsas/structure/oneFilter', datas).then(res => {
                this.loading.close();
                if (res.data.code == 200) {
                    this.strusList = res.data.data.result
                    this.totalCount = res.data.data.totalCount
                    this.pagesNum = res.data.data.pages
                    this.getStrusNum(this.totalCount)
                    let condition = res.data.data.condition
                    condition.type = this.opttype;
                    this.structuroneList = condition
                    this.setglststrusInfo(condition)
                    this.invesdialogVisible = false;
                    this.dialogVisible = true;
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '暂无数据！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            }).catch(() => {
                this.loading.close();
                this.$notify({
                    type: 'warning',
                    message: '一次排查失败！',
                    position: 'bottom-right',
                    duration: 3000
                });
            })
        },
        //执行glst二次排查结果
        twoglstinves() {
            let times = this.getinvesTime()
            let imgs = document.getElementById('lookimg')
            if (this.checkvideo.length == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请选择视频',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            } else if (this.lableimg == '') {
                this.$notify({
                    type: 'warning',
                    message: '请选择图片',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            let strusinfo = this.getstrusinfo() //得到结构化信息
            //表示在跨线的时候执行方法来获取方位
            // let direction
            // if(this.arearule == 4){
            //   direction = this.getorientation()
            // }else{
            //   direction = ''
            // }
            // let fileUuids = []
            this.twofileUuids = []
            for (let i = 0; i < this.checkvideo.length; i++) {
                this.twofileUuids += this.checkvideo[i].fileUuid + ','
            }
            this.twofileUuids = this.twofileUuids.substr(0, this.twofileUuids.length - 1);
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在排查"
            });

            let data = {
                // fileUuids:'0186163B9B934b40A41C65ECE5F4CAD4',  //视频编号 对应的视频ID 用，分隔
                fileUuids: this.twofileUuids,
                // taskUuid:this.proptaskUuid,   //任务编号
                startTime: times[0], //开始时间
                endTime: times[1], //结束时间
                deviceUuid: this.deviceId, //点位ID
                attrFlag: this.isoptfor, //1：行人，2：机动车，3：非机动车
                spaceFlag: this.arearule, // 空间标记：1：感兴趣区域，2：排除区域，3：跨线排查，4：方向排查
                // spaceFlag:'',   // 空间标记：1：感兴趣区域，2：排除区域，3：跨线排查，4：方向排查
                // coordinate:this.actualcoord.join(','),   //坐标（实际坐标）
                coordinate: '', //坐标（实际坐标）
                // originalCoordinate:this.originalCoordinate.join(','),  //原始点坐标
                originalCoordinate: '', //原始点坐标
                direction: '', //方向
                // direction:direction,  //方向
                caseUuid: this.caseUuid
            }

            let datas = Object.assign(data, strusinfo)
            datas = this.$qs.stringify(datas)
            this.$http.post('vsas/structure/twoFilter', datas).then(res => {
                this.loading.close();
                if (res.data.code == 200) {
                    this.strusList = res.data.data.result
                    this.totalCount = this.totalCount
                    this.getStrusNum(this.totalCount)
                    let condition = res.data.data.condition
                    this.zkystructuroneList = condition
                    condition.type = this.opttype;
                    this.setglststrusInfo(condition)
                    this.invesdialogVisible = false;
                    this.dialogVisible = true;

                    // this.strusList = []
                    // this.strusList = res.data.data.result
                    // if (this.strusList == null) {
                    //   this.strusList = []
                    // }
                    // this.istwoinves = 2
                    // this.totalCount = this.totalCount
                    // this.getStrusNum(this.totalCount)
                    // let condition = res.data.data.condition
                    // condition.type = this.opttype;
                    // this.structuroneList = condition
                    // this.setglststrusInfo(condition)
                    // this.invesdialogVisible = false;
                    // this.dialogVisible = true;
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '暂无数据！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            }).catch(() => {
                this.loading.close();
                this.$notify({
                    type: 'warning',
                    message: '二次排查失败！',
                    position: 'bottom-right',
                    duration: 3000
                });
            })
        },
        //返回结构化信息
        getstrusinfo() {
            //this.isoptfor == 1 表示行人 this.isoptfor == 2 表示车 this.isoptfor == 3表示骑车人
            let data = {}
            //定义一个空对象
            if (this.isoptfor == 1) {
                data = {
                    coatLength: this.coatLength, //上衣款式
                    coatPattern: this.coatPattern, //上衣纹理
                    coatColor: this.coatColor, //上衣颜色        //人骑车人共用
                    trousersStyle: this.trousersStyle, //下衣类别
                    trousersColor: this.trousersColor, //下衣颜色
                    shoesStyle: this.shoesStyle, //鞋子款式
                    shoesColor: this.shoesColor, //鞋子颜色
                    sex: this.sex, //性别                  //人骑车人共用
                    // ethnic:this.ethnic,  //民族               //人骑车人共用
                    headLandMark: this.headLandMark, //头部标识物   //人骑车人共用
                    accessoryItem: this.accessoryItem, //附属物品
                    hairStyle: this.hairStyle, //发型
                    age: this.age, //年龄
                    packageStyle: this.packageStyle, //包款式
                }
            } else if (this.isoptfor == 2) {
                data = {
                    vehicleAngle: this.vehicleAngle, //车辆角度     //车和骑车人共用
                    vehicleClass: this.vehicleClass, //车辆型号     //车和骑车人共用
                    vehicleColor: this.vehicleColor, //车辆颜色     //车和骑车人共用
                    landMark: this.landMark, //车辆标识
                    faceMask: this.faceMask, //面部遮挡        0：遮挡，1：为遮挡
                    plateColor: this.plateColor, //车牌颜色
                    plateClass: this.plateClass, //车牌类型
                    specialVehicles: this.specialVehicles, //特殊车辆
                    vehicleBack: this.vehicleBack, // 车后盖
                    bodyBreakage: this.bodyBreakage, // 车身破损
                    roofGoods: this.roofGoods, //车顶物件
                    plateOcclusion: this.plateOcclusion, // 车牌遮挡
                    bodyRed: this.bodyRed // 车辆红绳
                }
            } else if (this.isoptfor == 3) {
                data = {
                    backpackClass: this.backpackClass, //骑车人包类型
                    coatPattern: this.coatPattern, //上衣纹理
                    manned: this.manned, //违法载人
                    vehicleClass: this.vehicleClass, //车型
                    headLandMark: this.headLandMark, //头部标识物
                    vehicleAngle: this.vehicleAngle, //车辆角度
                    sex: this.sex, //骑车人性别
                    // ethnic:this.ethnic,  //骑车人民族
                    coatColor: this.coatColor, //上衣颜色
                    vehicleColor: this.vehicleColor, //车身颜色
                }
            }
            return data
        },
        //得到结构化返回的结构
        getStrusNum(num) {
            if (this.isoptfor == 1) {
                this.personNum = num
            } else if (this.isoptfor == 2) {
                this.vehicleNum = num
            } else if (this.isoptfor == 3) {
                this.bicycleNum = num
            }
        },

        //通过角度来返回跨线排查需要的坐标值
        //统一来偏移25度来计算方位，例如像正右 对应的角度是-25° - 20°
        //通过不同角度来判断方法
        // CUTBOARD_DIRECTION_UNKNOWN, // 0     表示空   '' 空字符串
        // CUTBOARD_DIRECTION_UPWARD,  //1      表示上   -115° -  -70°  北
        // CUTBOARD_DIRECTION_DOWN,    //2      表示下    65°  -  110°  南
        // CUTBOARD_DIRECTION_LEFT,    //3      表示左    155° -  -160° 西
        // CUTBOARD_DIRECTION_RIGHT,   //4      表示右   -25°  -  20°   东
        // CUTBOARD_DIRECTION_LEFT_UPWARD, //5  表示左上 -160° -  -115°  西北
        // CUTBOARD_DIRECTION_LEFT_DOWN,  //6   表示左下  110° -  155°   西南
        // CUTBOARD_DIRECTION_RIGHT_UPWARD,//7  表示右上 -70°  -  -25°   东北
        // CUTBOARD_DIRECTION_RIGHT_DOWN//8     表示右下  20°  -  65°    东南
        getorientation() {
            let num = 0
            if (this.theta > -25 && this.theta <= 20) { //表示的是右 也就是对应的东
                num = 4
            } else if (this.theta > 20 && this.theta <= 65) { //表示的是右下 也就是对应的东南
                num = 8
            } else if (this.theta > 65 && this.theta <= 110) { //表示的是下 也就是对应的南
                num = 2
            } else if (this.theta > 110 && this.theta <= 155) { //表示的是左下 也就是对应的西南
                num = 6
            }
            // else if(this.theta > 155 && this.theta <= -160){ //表示的是左 也就是对应的西
            //   num = 3
            // }
            else if (this.theta > 155 || this.theta <= 180) { //表示的是左 也就是对应的西
                num = 3
            } else if (this.theta >= -180 || this.theta <= -160) {
                num = 3
            } else if (this.theta > -160 && this.theta <= -115) { //表示的是左上 也就是对应的西北
                num = 5
            } else if (this.theta > -115 && this.theta <= -70) { //表示的是上 也就是对应的北
                num = 1
            } else if (this.theta > -70 && this.theta <= -25) { //表示的是右上 也就是对应的东北
                num = 7
            } else if (this.theta == '' || this.theta == null) {
                num = 0
            }
            return num
        },
        //清空所有的信息点击重新排查
        clearAllinfo() {
            this.setglststrusInfo({})
            this.timeone = 3;
            this.timetwo = 3;
            // this.$nextTick(() => {
            //   this.OpenTheTime3('#checkbegin', '#checkend');
            // });
            this.checkbegintime = false, //选择使用开始时间
                this.checkendtime = false, //选择结使用束时间
                this.showCanvas = false
            this.istwoinves = 1
            this.arearule = '1'
            this.lableimg = ''
            this.coatLength = ''; //上衣款式
            this.coatPattern = ''; //上衣纹理      //人骑车人共用
            this.coatColor = ''; //上衣颜色        //人骑车人共用
            this.trousersStyle = ''; //下衣类别
            this.trousersColor = ''; //下衣颜色
            this.shoesStyle = ''; //鞋子款式
            this.shoesColor = ''; //鞋子颜色
            this.sex = ''; //性别                  //人骑车人共用
            // this.ethnic = '';  //民族               //人骑车人共用
            this.headLandMark = ''; //头部标识物   //人骑车人共用
            this.accessoryItem = ''; //附属物品
            this.hairStyle = ''; //发型
            this.age = ''; //年龄
            this.packageStyle = ''; //包款式
            // 车的属性  7种
            this.vehicleAngle = ''; //车辆角度     //车和骑车人共用
            this.vehicleClass = ''; //车辆型号     //车和骑车人共用
            this.vehicleColor = ''; //车辆颜色     //车和骑车人共用
            this.landMark = ''; //车辆标识
            this.faceMask = ''; //面部遮挡        0：遮挡，1：为遮挡
            this.plateColor = ''; //车牌颜色
            this.plateClass = ''; //车牌类型
            this.specialVehicles = '' // 特殊车辆
            this.vehicleBack = '' // 车后盖
            this.bodyBreakage = '' // 车身破损
            this.roofGoods = '' //车顶物件
            this.plateOcclusion = '' // 车牌遮挡
            this.bodyRed = '' // 车辆红绳
            // 骑车人属性  10种
            this.backpackClass = ''; //骑车人包类型
            this.manned = '';
            this.iscoatLength = false; //上衣款式禁用
            this.iscoatPattern = false; //上衣纹理禁用    //人骑车人共用
            this.iscoatColor = false; //上衣颜色禁用     //人骑车人共用
            this.istrousersStyle = false; //下衣类别禁用
            this.istrousersColor = false; //下衣颜色禁用
            this.isshoesStyle = false; //鞋子款式禁用
            this.isshoesColor = false; //鞋子颜色禁用
            this.issex = false; //性别禁用                  //人骑车人共用
            this.isethnic = false; //民族禁用               //人骑车人共用
            this.isheadLandMark = false; //头部标识物禁用   //人骑车人共用
            this.isaccessoryItem = false; //附属物品禁用
            this.ishairStyle = false; //发型禁用
            this.isage = false; //年龄禁用
            this.ispackageStyle = false; //包款式禁用
            // 车的属性  7种
            this.isvehicleAngle = false; //车辆角度禁用     //车和骑车人共用
            this.isvehicleClass = false; //车辆型号禁用     //车和骑车人共用
            this.isvehicleColor = false; //车辆颜色禁用     //车和骑车人共用
            this.islandMark = false; //车辆标识禁用
            this.isfaceMask = false; //面部遮挡禁用        0：遮挡，1：为遮挡
            this.isplateColor = false; //车牌颜色禁用
            this.isplateClass = false; //车牌类型禁用
            this.isbodyBreakage = false, // 车身破损禁用
                this.isvehicleBack = false, // 车后盖盖禁用
                this.isspecialVehicles = false, //特殊车辆禁用
                this.isroofGoods = false
            this.isplateOcclusion = false
            this.isbodyRed = false
            // 骑车人属性  10种
            this.isbackpackClass = false; //骑车人包类型禁用
            this.ismanned = false; //违法载人禁用
            this.checkvideo = []
            this.checkpt = '';
        },
        getpoints(searchList) {
            let rulept
            if (searchList.spaceFlag == 1 || searchList.spaceFlag == 2) {
                if (searchList.coordinate == '' || searchList.coordinate == null) {
                    let firstOne = searchList.originalCoordinate.split(',')
                    rulept = '2-2-' + (firstOne[0] - 4) + '-2-' + (firstOne[0] - 4) + '-' + (firstOne[1] - 4) + '-2-' + (firstOne[1] - 4) + '-2-2'
                } else {
                    let firstTwo = searchList.coordinate.split(',')
                    searchList.coordinate = searchList.coordinate + ',' + firstTwo[0] + ',' + firstTwo[1]
                    rulept = searchList.coordinate.replace(/,/g, '-')
                }
                // let firstTwo = searchList.coordinate.split(',')
                // if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                //   rulept = '2-2-' + (firstTwo[2] - 4) + '-2-'+ (firstTwo[2] - 4) +'-' + (firstTwo[7] - 4) +'-2-'+(firstTwo[7] - 4) +'-2-2'
                // } else {
                //   searchList.coordinate = searchList.coordinate + ',' + firstTwo[0] + ',' + firstTwo[1]
                //   rulept = searchList.coordinate.replace(/,/g, '-')
                // }

            } else if (searchList.spaceFlag == 3) {
                // let firstTwo = searchList.coordinate.split(',')
                rulept = searchList.coordinate.replace(/,/g, '-')
                // if (firstTwo[0] == 0 && firstTwo[1] == 0) {
                //   rulept = '2-2-' + (firstTwo[2] - 4) + '-2-'+ (firstTwo[2] - 4) +'-' + (firstTwo[7] - 4) +'-2-'+(firstTwo[7] - 4) +'-2-2'
                // } else {
                //   rulept = searchList.points.replace(/,/g, '-')
                // }

            } else if (searchList.spaceFlag == 4) {
                let one = searchList.coordinate.split(',')
                let two = searchList.originalCoordinate.split(',')
                let three = searchList.coordinate
                let lastone = Math.ceil(two[4] * one[0] / two[0])
                let lasttwo = Math.ceil(two[5] * one[0] / two[0])
                three = three + ',' + lastone + ',' + lasttwo
                let firstTwo = three.split(',')

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
            return rulept
        },
        // //播放视频
        playvideo(row, index) {
            let pt = this.getpoints(this.glststrusInfo)
            row.pt = pt
            row.playtype = 2
            this.isactive = index;
            this.setDxplayerInfo(row) //给播放器赋值
            this.setshowStructDxplayer(true) //打开播放器
            //给当前时间赋值
            // document.title = document.title + '.'
        },
        pausefalse() {
            OnPause('true');
            this.imgshow = false
        },
        pausetrue() {
            OnPause('false')
            this.imgshow = true
        },
        closeplay() {
            this.showvideo = false;
            this.setisopenOffVideo(false)
            OnvideoHide();
            // setTimeout(()=>{
            //   OnvideoHide();
            // },100)
            // setTimeout(()=>{
            //   OnvideoHide();
            // },300)
        },
        //点击搜开始搜索图片特征并快速链接到以图搜图页面
        searchimg(row, zkyNum) {
            this.$emit('childbySearchImg',row)
        },

        // 判断是glst还是中科院
        isVideoTab(item, $event) {
            this.nowInfo = item //鼠标放置上去的时候当前对象
            this.nowEvent = $event //鼠标放置上去的时候当前Event
            if (this.showVideoStruct == 'true') {
                this.getInfo(item, $event)
            } else if (this.zkyStructureSwitch == 'true') {
                this.getzkyinfo(item, $event)
            }
        },
        //鼠标移动的时候展示格林森瞳结构化的详细信息
        getInfo(item, e) {
            //1表示行人2表示车3表示骑车人
            if (this.isoptfor == 1) {
                item.glsttype = 1
            } else if (this.isoptfor == 2) {
                item.glsttype = 2
            } else if (this.isoptfor == 3) {
                item.glsttype = 3
            }
            this.setshowglstinfo(true);
            document.getElementById('glstinfo').style.left = (e.clientX + 50) + 'px';
            document.getElementById('glstinfo').style.top = (e.clientY - 170) + 'px';
            this.setglstargetinfo(item)
        },
        //鼠标移动的时候展示中科院的结构化详细信息
        getzkyinfo(item, e) {
            if (this.isoptfor == 1) {
                item.glsttype = 1
            } else if (this.isoptfor == 2) {
                item.glsttype = 2
            } else if (this.isoptfor == 3) {
                item.glsttype = 3
            };
            //显示出中科院的结构化属性
            this.setshowzkyinfo(true);
            document.getElementById('glstinfo').style.left = (e.clientX + 50) + 'px';
            document.getElementById('glstinfo').style.top = (e.clientY - 170) + 'px';
            //设置中科院的值
            this.setzkytargetinfo(item)

        },




        //鼠标移开的时候执行的方法,关闭结构化的详细信息
        leaveProperty() {
            if (this.showVideoStruct == 'true') {
                this.setshowglstinfo(false)
            } else if (this.zkyStructureSwitch == 'true') {
                this.setshowzkyinfo(false)
            }
        },
        ////通过点位信息快速定位到当前视频以及点位
        getpointinfo(type) {
            let data = {
                caseUuid: this.caseUuid,
                pointType: type
            }
            this.$http.get('/vsas/structure/listPointOrVideo', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.ptlist = res.data.data
                    //如果有点位结果，直接请求当前点位下方的第一个视频
                    if (this.ptlist.length) {
                        //表示是二次排查
                        if (this.istwoinves == 2) {
                            console.log(this.glststrusInfo, '888');
                            this.deviceId = this.glststrusInfo.deviceId
                            for (let i = 0; i < this.ptlist.length; i++) {
                                console.log(this.deviceId, this.ptlist[i].deviceUuid, '9999999999999999999');
                                if (this.deviceId == this.ptlist[i].deviceUuid) {
                                    this.checkpt = i
                                    this.getvideo(this.deviceId);
                                }
                            }
                        }
                        //表示一次排查
                        else {
                            // this.deviceId = this.deviceInfo.deviceUuid
                            this.deviceId = this.deviceId
                            let type = JSON.parse(sessionStorage.getItem('deviceInfo')).type
                            this.getvideo(this.deviceId);
                            for (let i = 0; i < this.opttypes.length; i++) {
                                if (type == this.opttypes[i].value) {
                                    this.checkpoint = i
                                }
                            }
                            for (let i = 0; i < this.ptlist.length; i++) {
                                if (this.deviceId == this.ptlist[i].deviceUuid) {
                                    this.checkpt = i
                                }
                            }

                        }
                    }
                }
            })
        },
        //获取当前案件下面的所有视频的最小时间以及最大时间
        getTimeTobe(id) {
            let data = {
                caseUuid: id
            };
            this.$http.get("vsas/structure/getDate", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.begintimes = res.data.data.startTime
                    this.endtimes = res.data.data.endTime
                    // let begin = new Date(res.data.data.startTime).getTime();
                    // let end = new Date(res.data.data.endTime).getTime();
                    // let date = Math.floor((end - begin) / 1000 / 60 / 60 / 24);
                    // if (date < 3) {
                    //   date = 3;
                    // }
                    if (this.glststrusInfo.attrFlag == undefined) {
                        this.timeone = 3
                        this.timetwo = 3
                        this.$nextTick(() => {
                            //打开模态框的时候通过caseUuid来请求该案件下面的所有的点位以及点位对应的视频
                            //打开模态框的时候默认请求两个参数以及时间
                            // this.beginData = ''
                            // this.endData = ''
                            this.beginData = res.data.data.startTime; //选择开始时间
                            this.endData = res.data.data.endTime;
                            // if(this.timeone == 1 && this.timetwo == 1){
                            //   setTimeout(() => {
                            //     this.OpenTheTime4("#checkbegin", "#checkend");
                            //   }, 100);
                            // }
                        })
                    } else {
                        //一、判断时间控件的问题
                        if (this.glststrusInfo.startTime == '' && this.glststrusInfo.endTime != '') { //只有结束时间
                            // this.beginData = ''
                            this.endData = this.glststrusInfo.endTime
                            this.timeone = 3
                            this.timetwo = 2
                            this.$nextTick(() => {
                                laydate.render({
                                    elem: "#checktwo", //指定元素
                                    type: "datetime",
                                    format: "yyyy-MM-dd HH:mm:ss",
                                    max: 1,
                                    done: (value, date, endDate) => {
                                        this.endData = value
                                    }
                                });
                            });
                        } else if (this.glststrusInfo.startTime == '' && this.glststrusInfo.endTime == '') { //没有时间
                            // this.beginData = ''
                            // this.endData = ''
                            this.timeone = 3
                            this.timetwo = 3
                        } else if (this.glststrusInfo.startTime != '' && this.glststrusInfo.endTime != '') { //都有时间
                            this.beginData = this.glststrusInfo.startTime
                            this.endData = this.glststrusInfo.endTime
                            this.timeone = 1;
                            this.timetwo = 1
                            this.$nextTick(() => {
                                this.OpenTheTime4("#checkbegin", "#checkend");
                            });
                            this.$nextTick(() => {
                                this.OpenTheTime4("#choicebegin", "#choiceend");
                            });
                        } else if (this.glststrusInfo.startTime != '' && this.glststrusInfo.endTime == '') { //只有开始时间
                            this.beginData = this.glststrusInfo.startTime
                            // this.endData = ''
                            this.timeone = 2
                            this.timetwo = 3
                            this.$nextTick(() => {
                                laydate.render({
                                    elem: "#checkone", //指定元素
                                    type: "datetime",
                                    format: "yyyy-MM-dd HH:mm:ss",
                                    max: 1,
                                    done: (value, date, endDate) => {
                                        this.beginData = value
                                    }
                                });
                            });
                        }
                    }
                }
            });
        },
        //通过任务ID taskUuid来获取当前人车骑车人的总数量
        getResultCount(id) {
            this.$http.get('/vsas/structure/getResultCount?taskUuid=' + id).then(res => {
                if (res.data.code == 200) {
                    this.bicycleNum = res.data.data.bicycle //骑车人的数量
                    this.personNum = res.data.data.person //人的数量
                    this.vehicleNum = res.data.data.vehicle //车的数量
                    this.restltTotal = Number(this.bicycleNum) + Number(this.personNum) + Number(this.vehicleNum)
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '获取总数失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        //查看当前图片的大图
        lookBigImg(item) {
            this.setshowlookImgPic(true) // 触发大图点击事件
            if (this.isoptfor == 1) {
                item.glsttype = 1
            } else if (this.isoptfor == 2) {
                item.glsttype = 2
            } else if (this.isoptfor == 3) {
                item.glsttype = 3
            }
            if (this.showVideoStruct == 'true') {
                this.setshowglstinfo(false)
                this.setglstargetinfo(item)
            } else if (this.zkyStructureSwitch == 'true') {
                this.setshowzkyinfo(false)
                this.setzkytargetinfo(item)
            }
        }
    }
};
export default mixins
