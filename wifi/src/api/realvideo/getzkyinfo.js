/*
 * @Author: your name
 * @Date: 2020-05-14 10:45:00
 * @LastEditTime : 2021-01-21 17:33:27
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\api\realvideo\getzkyinfo.js
 */
import {
    windowToCanvas,
    clearRect,
    imgwh,
    coorValue,
    Line,
    draw
} from "../../page/videoCombat/canvas";
import {
    mapMutations
} from 'vuex'
const mixins = {
    data: function () {
        return {
            towSearchLine: '',
            towSearchKuang: '',
            fileUuids: '',
            searchImage: ''
        }
    },
    created() {

    },
    computed: {},
    mounted() {

    },
    methods: {
        ...mapMutations([
            'setvideoretriInfo', //播放时候的单个片段的信息
            'setisopenOffVideo' //设置离线播放器是否存在
        ]),
        // 中科院一次排查
        zkyonecheck() {
            let imgs = document.getElementById('lookimg')
            if (this.arearule == 1 || this.arearule == 2) {
                if (this.coordinates.length == 0) {
                    this.originalCoordinate = [imgs.naturalWidth, imgs.naturalHeight]
                    this.coordinates = []
                    this.actualcoord = []
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
                //划箭头方法先获取前两个点的一条线，然后再获取最后一个点
            }
            this.towSearchLine = this.originalCoordinate; //定义一个数组存起来
            this.towSearchKuang = this.actualcoord
            // console.log(this.originalCoordinate,"一次排查的原始数据");
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

            //表示在跨线的时候执行方法来获取方位
            this.zkytwoUuids = []
            for (let i = 0; i < this.checkvideo.length; i++) {
                this.zkytwoUuids += this.checkvideo[i].fileUuid + ','
            }
            this.zkytwoUuids = this.zkytwoUuids.substr(0, this.zkytwoUuids.length - 1)
            this.isoptfor = this.iszkyfor
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在排查"
            });
            this.searchImage = this.lableimg
            this.currentPage = 1;
            this.getSearchZkySize(0) // 是否变更了条件，0：是，1：否
        },
        // 一次排查 查询
        getSearchZkySize(changeFlag) {
            this.changeFlag = 1
            let times = this.getinvesTime()
            let direction
            if (this.arearule == 4) {
                direction = this.getorientation()
            } else {
                direction = ''
            }
            // console.log(this.zkyStusinfo);
            let data = {
                fileUuids: this.zkytwoUuids,
                startTime: times[0], //开始时间
                endTime: times[1], //结束时间
                deviceUuid: this.deviceId, //点位ID
                attrFlag: this.isoptfor, //1：行人，2：机动车，3：非机动车
                spaceFlag: this.arearule, // 空间标记：1：感兴趣区域，2：排除区域，3：跨线排查，4：方向排查
                coordinate: this.actualcoord.join(','), //坐标（实际坐标）
                // coordinate:'2,1000,1920,1000',
                originalCoordinate: this.originalCoordinate.join(','), //原始点坐标
                direction: direction, //方向
                caseUuid: this.$route.query.caseUuid,
                changeFlag: changeFlag, // 是否变更了条件，0：是，1：否
                pageSize: this.pageSize,
                pageNum: this.currentPage,
            }
            // console.log(data.originalCoordinate,"一次排查的时候的坐标");
            let datas = Object.assign(data, this.zkyStusinfo)
            datas = this.$qs.stringify(datas)
            this.$http.post('vsas/structure/oneFilterZky', datas).then(res => {
                    this.loading.close();
                    if (res.data.code == 200) { // 获取数据
                        console.log(res.data.data);
                        console.log(res.data.data.data);
                        this.strusList = res.data.data.data.result
                        console.log(this.strusList);
                        this.totalCount = res.data.data.totalCount
                        this.restltTotal = this.totalCount
                        this.getStrusNum(this.totalCount)
                        let condition = res.data.data.data.condition
                        condition.image = this.searchImage
                        // console.log(this.searchImage);
                        this.zkystructuroneList = condition
                        condition.type = this.opttype;
                        this.setglststrusInfo(condition)
                        this.invesdialogVisible = false;
                        this.dialogVisible = true;
                        if (this.strusList.length) {
                            for (let i = 0; i < this.strusList.length; i++) {
                                this.strusList[i].state = false
                            }
                            if (this.groundIds.length) {
                                for (let i = 0; i < this.strusList.length; i++) {
                                    for (let k = 0; k < this.groundIds.length; k++) {
                                        if (this.groundIds[k] == this.strusList[i].personUuid) {
                                            this.strusList[i].state = true
                                        } else if (this.groundIds[k] == this.strusList[i].vehicleUuid) {
                                            this.strusList[i].state = true
                                        } else if (this.groundIds[k] == this.strusList[i].bicycleUuid) {
                                            this.strusList[i].state = true
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: '暂无数据！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                })
                .catch(() => {
                    this.loading.close();
                    this.$notify({
                        type: 'warning',
                        message: '一次排查失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                })
        },
        zkytab(val) {
            this.iszkyfor = val
        },
        // 中科院二次排查是否禁用tab
        twiceCheck() {
            this.$nextTick(() => {
                this.$refs.zkyStruc.zkyField()
            })
        },
        //执行zky二次排查结果
        twozkyinves() {
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
            this.fileUuids = []
            for (let i = 0; i < this.checkvideo.length; i++) {
                this.fileUuids += this.checkvideo[i].fileUuid + ','
            }
            this.fileUuids = this.fileUuids.substr(0, this.fileUuids.length - 1)
            this.currentPage = 1
            this.getTwozkySize(0)
        },
        // 二次排查 查询
        getTwozkySize(changeFlag) {
            this.changeFlag = 2
            let times = this.getinvesTime()
            let direction
            if (this.arearule == 4) {
                direction = this.getorientation()
            } else {
                direction = ''
            }
            // let strusinfo = this.getzkystrusinfo() //得到zky结构化信息
            this.isoptfor = this.iszkyfor

            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在排查"
            });
            let data = {
                fileUuids: this.fileUuids, // 视频编号 对应的视频ID 用，分隔
                // taskUuid:this.proptaskUuid,   //任务编号
                startTime: times[0], //开始时间
                endTime: times[1], //结束时间
                deviceUuid: this.deviceId, //点位ID
                attrFlag: this.isoptfor, //1：行人，2：机动车，3：非机动车
                spaceFlag: this.arearule, // 空间标记：1：感兴趣区域，2：排除区域，3：跨线排查，4：方向排查
                coordinate: this.towSearchKuang.join(','), //坐标（实际坐标）
                originalCoordinate: this.towSearchLine.join(','), //原始点坐标
                direction: direction, //方向
                caseUuid: this.$route.query.caseUuid,
                changeFlag: changeFlag, // 是否变更了条件，0：是，1：否
                pageSize: this.pageSize,
                pageNum: this.currentPage,
            }
            // console.log(data.originalCoordinate,"二次排查的时候的坐标");
            let datas = Object.assign(data, this.zkyStusinfo)
            datas = this.$qs.stringify(datas)
            this.$http.post('vsas/structure/twoFilterZky', datas).then(res => {
                this.loading.close();
                if (res.data.code == 200) {
                    this.strusList = res.data.data.data.result
                    this.totalCount = res.data.data.totalCount
                    this.restltTotal = this.totalCount
                    this.getStrusNum(this.totalCount)
                    let condition = res.data.data.data.condition
                    condition.image = this.lableimg
                    // console.log(this.lableimg, 'this.lableimg--------------');
                    this.zkystructuroneList = condition
                    condition.type = this.opttype;
                    this.setglststrusInfo(condition)
                    this.invesdialogVisible = false;
                    this.dialogVisible = true;
                    if (this.strusList.length) {
                        for (let i = 0; i < this.strusList.length; i++) {
                            this.strusList[i].state = false
                        }
                        if (this.groundIds.length) {
                            for (let i = 0; i < this.strusList.length; i++) {
                                for (let k = 0; k < this.groundIds.length; k++) {
                                    if (this.groundIds[k] == this.strusList[i].personUuid) {
                                        this.strusList[i].state = true
                                    } else if (this.groundIds[k] == this.strusList[i].vehicleUuid) {
                                        this.strusList[i].state = true
                                    } else if (this.groundIds[k] == this.strusList[i].bicycleUuid) {
                                        this.strusList[i].state = true
                                    }
                                }
                            }
                        }
                    }
                    // this.strusList = []
                    // this.strusList = res.data.data
                    // if (this.strusList == null) {
                    //   this.strusList = []
                    // }
                    // this.istwoinves = 2
                    // this.totalCount = this.strusList.length
                    // this.getStrusNum(this.totalCount)
                    // this.setglststrusInfo({attrFlag : 10})
                    // //加的
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
        // 返回中科院结构化信息
        getzkystrusinfo() {
            this.$nextTick(() => {
                this.$refs.zkyStruc.getzky()
            })
        },
        //鼠标移动的时候展示中科院结构化的详细信息
        getzkyinfo(item, e) {
            //1表示行人2表示车3表示骑车人
            if (this.isoptfor == 1) {
                item.zkytype = 1
            } else if (this.isoptfor == 2) {
                item.zkytype = 2
            } else if (this.isoptfor == 3) {
                item.zkytype = 3
            }
            this.setshowzkyinfo(true)
            document.getElementById('zkyinfo').style.left = (e.clientX + 50) + 'px';
            document.getElementById('zkyinfo').style.top = (e.clientY - 100) + 'px';
            this.setzkytargetinfo(item)
        }
    }
};
export default mixins
