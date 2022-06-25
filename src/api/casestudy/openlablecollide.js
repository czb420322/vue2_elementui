/*
 * @Author: your name
 * @Date: 2020-09-14 16:52:11
 * @LastEditTime : 2020-12-24 14:21:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\casestudy\openlablecollide.js
 */
//地图操作
import flvjs from 'flv.js'
const mixins = {
    data: function () {
        return {
            dialogVisible: false, //打开标注碰撞
            labeltype: 1, //标注类型
            backuplabeltype: 1, //备份标注类型
            checklabel: '4', //标注碰撞类型
            backupchecklabel: '4', //备份标注碰撞类型
            deviceone: '', //出现位置1
            devicetwo: '', //出现位置2
            devicethree: '', //两点时间碰撞
            devicefour: '', //空间标注碰撞
            backupdeviceone: '', //第一个和第三个点位的备份
            backupdevicetwo: '', //第二个和第四个点位的备份
            timepype: '10', //时间间隔类型 大于，小于
            backuptimepype: '10', //备份时间间隔类型
            checktime: '1', //  大于，小于
            backupchecktime: '1', // 备份大于，小于
            backyupbengintime: '',
            backyupendtime: '',
            backthreelist: [],
            timelist: [{
                    key: '10',
                    value: '10分钟'
                },
                {
                    key: '20',
                    value: '20分钟'
                },
                {
                    key: '30',
                    value: '30分钟'
                },
                {
                    key: '40',
                    value: '40分钟'
                },
                {
                    key: '50',
                    value: '50分钟'
                },
                {
                    key: '60',
                    value: '60分钟'
                }
            ], //两点时间范围
            twoTime: [{
                key: '1',
                value: '大于'
            }, {
                key: '2',
                value: '等于'
            }, {
                key: '3',
                value: '小于'
            }], //两点时间范围选择
            lableDeviceList: [], //获取当前所有能存放标注的点位
            checkNowlable: false, //显示当前的标注的点位
            backupcheckNowlable: false,
            beginData: '', //单点的开始时间
            endData: '', //单点的结束时间
            benginDataTime: '', //空间的开始时间
            endDataTime: '', //空间的开始时间
            backuplable: [], //备份的数组
            alllablelist: [], //针对除去两点时间碰撞的标注list
            firstlablelist: [], //针对两点时间碰撞第一个点位的list
            twolablelist: [], //针对两点时间碰撞第二个点位的list
            backupfirstlablelist: [], //针对两点时间碰撞第一个点位的list
            backuptwolablelist: [], //针对两点时间碰撞第二个点位的list
            leftindex: 0, //左边的索引
            rightindex: 0, //右边的索引
            leftInfo: '', //左边的信息
            rightInfo: '', //左边的信息
            showleftvideo: false,
            showrightvideo: false,
            addsuslist: [], //下方嫌疑目标的数组
            nowactive: 0, //当前选中的数组对象
            ischangetime: false, //是否改变当前时间
            spacelist: [], //空间碰撞的数组
            remainlist: [],
            remainindex: 0,
            nowtheeIndex: null,
            visible: false, //打开转标注功能
            speedList: [], //嫌疑目标速度数组
            formModel: {
                susName: "",
                speed: "",
                suspicionUuid: ""
            },
            rules: {
                susName: [{
                    required: true,
                    message: "请输入嫌疑目标名称",
                    trigger: "change"
                }],
                speed: [{
                    required: true,
                    message: "请选择嫌疑目标速度",
                    trigger: "change"
                }]
            },

        }
    },
    filters: {
        collidesname(val) {
            if (val == 1) {
                return '两点时间碰撞'
            } else if (val == 2) {
                return '单点时间碰撞'
            } else if (val == 3) {
                return '空间碰撞'
            } else if (val == 4) {
                return '全标注碰撞'
            }
        }
    },
    watch: {
        //监听已保存的数组变化
        addsuslist: {
            handler(val) {
                if (val.length > 1) {
                    for (let i = 0; i < val.length - 1; i++) {
                        let obj = val[i]
                        let obj1 = val[i + 1]
                        let time1 = 0
                        let time2 = 0
                        if (obj.absoluteTime) {
                            time1 = new Date(obj.absoluteTime).getTime() + (obj.offset * 1000)
                        } else {
                            time1 = new Date(obj.videoStartTime).getTime() + Number(obj.relativeTime) + (obj.offset * 1000)
                        }
                        if (obj1.absoluteTime) {
                            time2 = new Date(obj1.absoluteTime).getTime() + (obj1.offset * 1000)
                        } else {
                            time2 = new Date(obj1.videoStartTime).getTime() + Number(obj1.relativeTime) + (obj1.offset * 1000)
                        }
                        let time3 = time1 - time2 //两点之间的时间误差
                        let time4 = 24 * 3600 * 1000 //1小时的时长
                        //区分是否是同相控点，如果是不同监控点，则计算位置
                        if (obj.deviceId == obj1.deviceId) {
                            obj.name = '同监控点'
                        } else {
                            let distance = this.map.getDistance(
                                new BMap.Point(obj.device.longitude, obj.device.latitude),
                                new BMap.Point(obj1.device.longitude, obj1.device.latitude))
                            if (Math.ceil(distance) > 1000) {
                                distance = (distance / 1000).toFixed(2) + '千米'
                            } else {
                                distance = distance.toFixed(2) + '米'
                            }
                            obj.name = distance
                        }
                        //区分箭头
                        if (time3 >= 0) {
                            obj.type == '1' //区分箭头方向 右
                        } else {
                            obj.type == '2' //区分箭头方向 左
                        }
                        //判断时长是多少
                        //如果小于一天则时分秒
                        //如果大于1天则是多少天，如果大于360则是年加天
                        if (Math.abs(time3) >= time4 * 365) { //是否大于超过一年
                            let year = Math.floor((Math.abs(time3) / (time4 * 365))) // 多少年
                            let date = Math.floor((Math.abs(time3) % (time4 * 365)) / time4) //多少天
                            obj.time = year + "年" + date + "天"
                        } else if (Math.abs(time3) > time4) { //是否大于1天
                            let date = Math.floor(Math.abs(time3) / time4) //多少天
                            obj.time = date + "天"
                        } else { //剩下的就是时分秒
                            if (Math.abs(time3) < 60 * 1000) { //少于一分钟 //展示秒数
                                obj.time = Math.ceil(Math.abs(time3) / 1000) + "秒"
                            } else if (Math.abs(time3) < 3600 * 1000) { //少于一个小时 展示分和秒数
                                let minutes = Math.floor((Math.abs(time3) / (60 * 1000)))
                                let seconds = Math.ceil((Math.abs(time3) % (60 * 1000)) / 1000) //多少天
                                obj.time = minutes + "分钟" + seconds + "秒"
                            } else {
                                let hours = Math.floor((Math.abs(time3) / (3600 * 1000)))
                                let minutes = Math.floor((Math.abs(time3) % (3600 * 1000) / (60 * 1000)))
                                let seconds = Math.ceil((Math.abs(time3) % (3600 * 1000)) / 1000 % 60) //多少天
                                obj.time = hours + "小时" + minutes + "分钟" + seconds + "秒"
                            }
                        }
                    }
                }
            },
            deep: true
        },
        //监听时间的变化
        beginData(val) {
            if (this.checklabel == 2 && this.devicethree) {
                if (!this.ischangetime) {
                    if (this.addsuslist.length) {
                        this.$myconfirm({
                            type: '提示',
                            msg: '切换会清空数据，是否切换？',
                            icon: 4,
                            btn: {
                                ok: '确定',
                                no: '取消'
                            }
                        }).then(() => {
                            this.addsuslist = []
                            this.getDeviceLableList(this.devicethree)
                            this.ischangetime = false
                        }).catch(() => {
                            this.beginData = this.backyupbengintime
                            this.ischangetime = true
                            setTimeout(() => {
                                this.ischangetime = false
                            }, 1000)
                        })
                    } else {
                        this.addsuslist = []
                        this.getDeviceLableList(this.devicethree)
                        this.ischangetime = false
                    }

                }
            }
        },
        endData(val) {
            if (this.checklabel == 2 && this.devicethree) {
                if (!this.ischangetime) {
                    if (this.addsuslist.length) {
                        this.$myconfirm({
                            type: '提示',
                            msg: '切换会清空数据，是否切换？',
                            icon: 4,
                            btn: {
                                ok: '确定',
                                no: '取消'
                            }
                        }).then(() => {
                            this.addsuslist = []
                            this.getDeviceLableList(this.devicethree)
                        }).catch(() => {
                            this.beginData = this.backyupbengintime
                            this.ischangetime = true
                            setTimeout(() => {
                                this.ischangetime = false
                            }, 1000)
                        })
                    } else {
                        this.addsuslist = []
                        this.getDeviceLableList(this.devicethree)
                        this.ischangetime = false
                    }


                }


            }

        },
        leftInfo(val) {
            if (val) {
                this.remainlist = []
                if (this.checklabel != 1 && this.alllablelist.length) {
                    for (let i = 0; i < this.alllablelist.length; i++) {
                        if (this.alllablelist[i].markId != val.markId) {
                            this.remainlist.push(this.alllablelist[i])
                        }
                    }
                    if (this.rightInfo && this.remainlist.length) {
                        for (let i = 0; i < this.remainlist.length; i++) {
                            if (this.rightInfo.markId == this.remainlist[i].markId) {
                                this.remainindex = i + 1
                            }
                        }
                    } else {
                        this.remainindex = 0
                        this.remainlist = []
                    }
                } else if (this.checklabel == 1 && this.twolablelist.length) {
                    for (let i = 0; i < this.twolablelist.length; i++) {
                        if (this.twolablelist[i].markId != val.markId) {
                            this.remainlist.push(this.twolablelist[i])
                        }
                    }
                    if (this.rightInfo && this.remainlist.length) {
                        for (let i = 0; i < this.remainlist.length; i++) {
                            if (this.rightInfo.markId == this.remainlist[i].markId) {
                                this.remainindex = i + 1
                            }
                        }
                    } else {
                        this.remainindex = 0
                        this.remainlist = []
                    }
                } else {
                    this.remainindex = 0
                    this.remainlist = []
                }
            }
        },
        rightInfo(val) {
            if (val) {
                if (this.checklabel != 1 && this.remainlist.length) {
                    if (val && this.remainlist.length) {
                        for (let i = 0; i < this.remainlist.length; i++) {
                            if (val.markId == this.remainlist[i].markId) {
                                this.remainindex = i + 1
                            }
                        }
                    } else {
                        this.remainindex = 0
                        this.remainlist = []
                    }
                } else if (this.checklabel == 1 && this.twolablelist.length) {
                    if (val && this.twolablelist.length) {
                        for (let i = 0; i < this.twolablelist.length; i++) {
                            if (val.markId == this.twolablelist[i].markId) {
                                this.remainindex = i + 1
                            }
                        }
                    } else {
                        this.remainindex = 0
                    }
                }
            } else {
                this.remainindex = 0
            }
        },

    },
    computed: {
        //计算两个标注的时间搓差距以及位置
        markdiff() {
            let obj = {}
            if (this.leftInfo != '' && this.rightInfo != '') {
                let time1 = 0
                let time2 = 0
                if (this.leftInfo.absoluteTime) {
                    time1 = new Date(this.leftInfo.absoluteTime).getTime() + (this.leftInfo.offset * 1000)
                } else {
                    time1 = new Date(this.leftInfo.videoStartTime).getTime() + Number(this.leftInfo.relativeTime) + (this.leftInfo.offset * 1000)
                }
                if (this.rightInfo.absoluteTime) {
                    time2 = new Date(this.rightInfo.absoluteTime).getTime() + (this.rightInfo.offset * 1000)
                } else {
                    time2 = new Date(this.rightInfo.videoStartTime).getTime() + Number(this.rightInfo.relativeTime) + (this.rightInfo.offset * 1000)
                }
                let time3 = time1 - time2 //两点之间的时间误差
                let time4 = 24 * 3600 * 1000 //1小时的时长
                //区分是否是同相控点，如果是不同监控点，则计算位置
                if (this.leftInfo.deviceId == this.rightInfo.deviceId) {
                    obj.name = '同监控点'
                } else {
                    let distance = this.map.getDistance(
                        new BMap.Point(this.leftInfo.device.longitude, this.leftInfo.device.latitude),
                        new BMap.Point(this.rightInfo.device.longitude, this.rightInfo.device.latitude))
                    if (Math.ceil(distance) > 1000) {
                        distance = (distance / 1000).toFixed(2) + '千米'
                    } else {
                        distance = distance.toFixed(2) + '米'
                    }
                    obj.name = distance
                }
                //区分箭头
                if (time3 >= 0) {
                    obj.type == '1' //区分箭头方向 右
                } else {
                    obj.type == '2' //区分箭头方向 左
                }
                //判断时长是多少
                //如果小于一天则时分秒
                //如果大于1天则是多少天，如果大于360则是年加天
                if (Math.abs(time3) >= time4 * 365) { //是否大于超过一年
                    let year = Math.floor((Math.abs(time3) / (time4 * 365))) // 多少年
                    let date = Math.floor((Math.abs(time3) % (time4 * 365)) / time4) //多少天
                    obj.time = year + "年" + date + "天"
                } else if (Math.abs(time3) > time4) { //是否大于1天
                    let date = Math.floor(Math.abs(time3) / time4) //多少天
                    obj.time = date + "天"
                } else { //剩下的就是时分秒
                    if (Math.abs(time3) < 60 * 1000) { //少于一分钟 //展示秒数
                        obj.time = Math.ceil(Math.abs(time3) / 1000) + "秒"
                    } else if (Math.abs(time3) < 3600 * 1000) { //少于一个小时 展示分和秒数
                        let minutes = Math.floor((Math.abs(time3) / (60 * 1000)))
                        let seconds = Math.ceil((Math.abs(time3) % (60 * 1000)) / 1000) //多少天
                        obj.time = minutes + "分钟" + seconds + "秒"
                    } else {
                        let hours = Math.floor((Math.abs(time3) / (3600 * 1000)))
                        let minutes = Math.floor((Math.abs(time3) % (3600 * 1000) / (60 * 1000)))
                        let seconds = Math.ceil((Math.abs(time3) % (3600 * 1000)) / 1000 % 60) //多少天
                        obj.time = hours + "小时" + minutes + "分钟" + seconds + "秒"
                    }
                }
            }
            return obj
        }
    },
    methods: {
        //打开创建嫌疑目标
        openDialog() {
            if (this.labeltype == 1) {
                this.speedList = [{
                        speedName: "常速",
                        speedValue: "1.39"
                    },
                    {
                        speedName: "快速",
                        speedValue: "2.22"
                    },
                    {
                        speedName: "慢速",
                        speedValue: "0.83"
                    }
                ];
                this.formModel.speed = "1.39";
            } else if (this.labeltype == 4) {
                this.speedList = [{
                        speedName: "常速",
                        speedValue: "4.16"
                    },
                    {
                        speedName: "快速",
                        speedValue: "5.55"
                    },
                    {
                        speedName: "慢速",
                        speedValue: "2.77"
                    }
                ];
                this.formModel.speed = "4.16";
            } else if (this.labeltype == 2) {
                this.speedList = [{
                        speedName: "常速",
                        speedValue: "8.33"
                    },
                    {
                        speedName: "快速",
                        speedValue: "13.88"
                    },
                    {
                        speedName: "慢速",
                        speedValue: "5.55"
                    }
                ];
                this.formModel.speed = "8.33";
            }
        },
        getnoelable(val) {
            //监听是否显示已有标注
            if (this.addsuslist.length) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空数据，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.addsuslist = []
                    this.backupcheckNowlable = val
                    if (this.checkNowlable) {
                        this.getnowdevice()
                    } else {
                        this.lableDeviceList = this.labelcollidedeviceList
                        if (this.lableDeviceList.length) {
                            this.deviceone = this.lableDeviceList[0].deviceUuid
                            this.devicethree = this.lableDeviceList[0].deviceUuid
                            this.devicefour = this.lableDeviceList[0].deviceUuid
                        }
                        if (this.lableDeviceList.length > 1) {
                            this.devicetwo = this.lableDeviceList[1].deviceUuid
                        } else {
                            this.devicetwo = ''
                        }
                        if (this.checklabel == 1) {
                            this.getDeviceLableList(this.deviceone, 1)
                            this.getDeviceLableList(this.devicetwo, 2)
                        } else if (this.checklabel == 2) {
                            this.getDeviceLableList(this.devicethree)
                            this.getvideoTime();
                            // this.OpenTheTime4("#beginData", "#endData");
                        } else if (this.checklabel == 3) {
                            this.getDeviceLableList(this.devicefour)
                            this.getvideoTime();
                            // this.OpenTheTime5("#benginTime1", "#endTime1");
                        } else if (this.checklabel == 4) {
                            this.getDeviceLableList()
                        }
                    }
                }).catch(() => {
                    this.checkNowlable = this.backupcheckNowlable
                })
            } else {
                this.backupcheckNowlable = val
                if (this.checkNowlable) {
                    this.getnowdevice()
                } else {
                    this.lableDeviceList = this.labelcollidedeviceList
                    if (this.lableDeviceList.length) {
                        this.deviceone = this.lableDeviceList[0].deviceUuid
                        this.devicethree = this.lableDeviceList[0].deviceUuid
                        this.devicefour = this.lableDeviceList[0].deviceUuid
                    }
                    if (this.lableDeviceList.length > 1) {
                        this.devicetwo = this.lableDeviceList[1].deviceUuid
                    } else {
                        this.devicetwo = ''
                    }
                    if (this.checklabel == 1) {
                        this.getDeviceLableList(this.deviceone, 1)
                        this.getDeviceLableList(this.devicetwo, 2)
                    } else if (this.checklabel == 2) {
                        this.getDeviceLableList(this.devicethree)
                        this.OpenTheTime4("#beginData", "#endData");
                    } else if (this.checklabel == 3) {
                        this.getDeviceLableList(this.devicefour)
                        this.OpenTheTime5("#benginTime1", "#endTime1");
                    } else if (this.checklabel == 4) {
                        this.getDeviceLableList()
                    }
                }
            }


        },
        closeDialog() {
            this.formModel = {
                susName: "",
                speed: "",
                suspicionUuid: ""
            }
        },
        //创建嫌疑目标并关联标注
        confimHandler(formName) {
            if (this.$commons.regtest(this.formModel.susName)) {
                this.$notify({
                    type: "warning",
                    message: "禁止输入特殊字符(<,&,&)",
                    position: "bottom-right",
                    duration: 2000
                });
                return;
            }
            let suspicionType = ''
            if (this.labeltype == 1) {
                suspicionType = 1
            } else if (this.labeltype == 4) {
                suspicionType = 2
            } else if (this.labeltype == 2) {
                suspicionType = 3
            }
            let susName = this.formModel.susName;
            let speed = this.formModel.speed;
            this.$refs[formName].validate().then(isValid => {
                if (isValid) {
                    let data = {
                        suspicionName: susName,
                        speed: speed,
                        suspicionType: suspicionType,
                        caseUuid: this.$route.query.caseUuid,
                        targetUuid: this.addsuslist.map(item => {
                            return item.markId
                        }).join(','),
                    };
                    data = this.$qs.stringify(data);
                    this.$http.post("pca/casemng/suspicion/save", data).then(res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                type: "success",
                                message: "创建嫌疑目标成功",
                                position: "bottom-right",
                                duration: 2000
                            })
                            this.visible = false
                            this.addsuslist = []
                            this.changeCheckLabel()
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        establishTagId(id) {
            let data = {
                targetUuids: this.addsuslist.map(item => {
                    return item.markId
                }).join(','), //标注的id   多个用，分割
                suspicionUuid: id //  嫌疑人id
            }
            data = this.$qs.stringify(data)
            this.$http.post('pca/casemng/marksBindSusp', data).then(res => {
                if (res.data.code == 200) {
                    this.visible = false
                    this.addsuslist = []
                    this.changeCheckLabel()
                }
            })
        },
        //创建标注
        createlable() {
            if (this.addsuslist.length) {
                this.visible = true
            }

        },
        //获取当前视频的最小时间和最大时间
        getvideoTime(type) {
            this.$http.get("vsas/structure/getDate", {
                params: {
                    caseUuid: this.$route.query.caseUuid
                }
            }).then(res => {
                if (res.data.code == 200) {
                    this.backyupbengintime = res.data.data.startTime;
                    this.backyupendtime = res.data.data.endTime;
                    this.beginData = res.data.data.startTime;
                    this.endData = res.data.data.endTime;
                    this.benginDataTime = res.data.data.startTime;
                    this.endDataTime = res.data.data.endTime;
                }
            });
        },
        //清空所有的信息
        clearInfo() {
            this.labeltype = 1
            this.backuplabeltype = 1
            this.checklabel = '4'
            this.deviceone = ''
            this.devicetwo = ''
            this.timepype = '10'
            this.backuptimepype = '10'
            this.checktime = '1'
            this.backupchecktime = '1'
            this.devicethree = ''
            this.devicefour = ''
        },
        //查询当前有标注的点位
        getnowdevice() {
            let data = {
                caseUuid: this.$route.query.caseUuid
            }
            this.$http.get('/pca/point/device/hasMark', {
                params: data
            }).then(res => {
                this.lableDeviceList = res.data.data
                if (this.lableDeviceList.length) {
                    this.deviceone = this.lableDeviceList[0].deviceUuid
                    this.devicethree = this.lableDeviceList[0].deviceUuid
                    this.devicefour = this.lableDeviceList[0].deviceUuid
                }
                if (this.lableDeviceList.length > 1) {
                    this.devicetwo = this.lableDeviceList[1].deviceUuid
                } else {
                    this.devicetwo = ''
                }
                if (this.checklabel == 1) {
                    this.getDeviceLableList(this.deviceone, 1)
                    this.getDeviceLableList(this.devicetwo, 2)
                } else if (this.checklabel == 2) {
                    this.getDeviceLableList(this.devicethree)
                    this.getvideoTime();
                } else if (this.checklabel == 3) {
                    this.getDeviceLableList(this.devicefour)
                    this.getvideoTime();
                } else if (this.checklabel == 4) {
                    this.getDeviceLableList()
                }
            })
        },
        //得到当前的下拉点位的标注
        getDeviceLableList(id, num) {
            let data = {
                deviceId: id,
                caseUuid: this.$route.query.caseUuid,
                targetType: this.labeltype, //标注类型  1人 2车 4骑
                deleteFlag: this.checklabledemo, //0未关联 1已关联 2案件的标注
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/point/device/mark/query/all', data).then(res => {
                if (res.data.code == 200) {
                    if (this.checklabel == 1) {
                        //如果是点位1
                        if (num == 1) {
                            this.backupdeviceone = id
                            this.firstlablelist = res.data.data
                            this.backupfirstlablelist = res.data.data
                            if (this.firstlablelist.length) {
                                setTimeout(() => {
                                    this.leftindex = 0
                                    this.leftInfo = this.firstlablelist[0]
                                    //在切换之前先判断右边是否有数据，如果有数据，则继续判断右边的数据是否存在
                                    let list = []
                                    if (this.backuptwolablelist.length) {
                                        let time = this.leftInfo.absoluteTime ? new Date(this.leftInfo.absoluteTime).getTime() + Number(this.leftInfo.offset) * 1000 :
                                            new Date(this.leftInfo.videoStartTime).getTime() + Number(this.leftInfo.offset) * 1000 + Number(this.leftInfo.relativeTime)
                                        let spacingtime = this.timepype * 60 * 1000 //间隔时间
                                        for (let i = 0; i < this.backuptwolablelist.length; i++) {
                                            let times = this.backuptwolablelist[i].absoluteTime ? new Date(this.backuptwolablelist[i].absoluteTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 :
                                                new Date(this.backuptwolablelist[i].videoStartTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 + Number(this.backuptwolablelist[i].relativeTime)
                                            //1 2 3 大于 等于 小于
                                            if (this.checktime == 1) {
                                                if (Math.abs(time - times) > spacingtime) {
                                                    list.push(this.backuptwolablelist[i])
                                                }
                                            } else if (this.checktime == 2) {
                                                if (Math.abs(time - times) == spacingtime) {
                                                    list.push(this.backuptwolablelist[i])
                                                }
                                            } else if (this.checktime == 3) {
                                                if (Math.abs(time - times) < spacingtime) {
                                                    list.push(this.backuptwolablelist[i])
                                                }
                                            }
                                        }
                                        console.log(list, 'list得长度');
                                        this.twolablelist = list
                                        if (this.twolablelist.length) {
                                            this.rightindex = 0
                                            this.rightInfo = this.twolablelist[0]
                                        } else {
                                            this.rightindex = 0
                                            this.rightInfo = ''
                                        }
                                    }
                                }, 300)

                            } else {
                                this.leftindex = 0
                                this.leftInfo = ''
                                this.rightindex = 0
                                this.rightInfo = ''
                            }

                        }
                        if (num == 2) {
                            this.backupdevicetwo = id
                            if (this.devicetwo == this.deviceone) {
                                this.rightindex = 0
                                this.rightInfo = ''
                            } else {
                                this.twolablelist = res.data.data
                                this.backuptwolablelist = res.data.data
                                if (this.twolablelist.length) {
                                    setTimeout(() => {
                                        let list = []
                                        if (this.firstlablelist.length) {
                                            this.rightindex = 0
                                            this.rightInfo = this.twolablelist[0]
                                            let time = this.leftInfo.absoluteTime ? new Date(this.leftInfo.absoluteTime).getTime() + Number(this.leftInfo.offset) * 1000 :
                                                new Date(this.leftInfo.videoStartTime).getTime() + Number(this.leftInfo.offset) * 1000 + Number(this.leftInfo.relativeTime)
                                            let spacingtime = this.timepype * 60 * 1000 //间隔时间
                                            for (let i = 0; i < this.backuptwolablelist.length; i++) {
                                                let times = this.backuptwolablelist[i].absoluteTime ? new Date(this.backuptwolablelist[i].absoluteTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 :
                                                    new Date(this.backuptwolablelist[i].videoStartTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 + Number(this.backuptwolablelist[i].relativeTime)
                                                //1 2 3 大于 等于 小于
                                                if (this.checktime == 1) {
                                                    if (Math.abs(time - times) > spacingtime) {
                                                        list.push(this.backuptwolablelist[i])
                                                    }
                                                } else if (this.checktime == 2) {
                                                    if (Math.abs(time - times) == spacingtime) {
                                                        list.push(this.backuptwolablelist[i])
                                                    }
                                                } else if (this.checktime == 3) {
                                                    if (Math.abs(time - times) < spacingtime) {
                                                        list.push(this.backuptwolablelist[i])
                                                    }
                                                }
                                            }
                                            this.twolablelist = list
                                            if (this.twolablelist.length) {
                                                this.rightindex = 0
                                                this.rightInfo = this.twolablelist[0]
                                            } else {
                                                this.rightindex = 0
                                                this.rightInfo = ''
                                            }
                                        } else {
                                            this.rightindex = 0
                                            this.rightInfo = ''
                                        }
                                    }, 500)



                                } else {
                                    this.rightindex = 0
                                    this.rightInfo = ''
                                }
                            }

                        }
                    } else if (this.checklabel == 2) {
                        this.backupdeviceone = id
                        this.alllablelist = []
                        this.backuplable = res.data.data
                        let begin = new Date(this.beginData).getTime()
                        let end = new Date(this.endData).getTime()

                        for (let i = 0; i < this.backuplable.length; i++) {
                            let timebegin = this.backuplable[i].absoluteTime ? new Date(this.backuplable[i].absoluteTime).getTime() + Number(this.backuplable[i].offset) * 1000 :
                                new Date(this.backuplable[i].videoStartTime).getTime() + Number(this.backuplable[i].offset) * 1000 + Number(this.backuplable[i].relativeTime)
                            if (timebegin >= begin && timebegin <= end) {
                                this.alllablelist.push(this.backuplable[i])
                            }
                        }
                        this.showlableInfo(this.alllablelist)
                    } else if (this.checklabel == 3) {
                        this.backupdevicetwo = id
                        this.backuplable = res.data.data
                    } else if (this.checklabel == 4) {
                        this.alllablelist = res.data.data
                        this.backuplable = res.data.data
                        this.showlableInfo(this.alllablelist)
                    }

                }
            });
        },
        //当等于空间碰撞的时候，添加当前时间到当前的数组判断中去
        //type=1是添加全时段，type=2等于添加不是全时段
        addalllable(type) {
            if (this.devicefour) {
                let data = {}
                let alllist = []
                if (type == 1) {
                    data = {
                        devicename: this.devicefour,
                        begin: this.backyupbengintime,
                        end: this.backyupendtime,
                        list: this.backuplable
                    }
                } else if (type == 2) {
                    let list = []
                    data = {
                        devicename: this.devicefour,
                        begin: this.benginDataTime,
                        end: this.endDataTime,
                        list: []
                    }
                    let begin = new Date(this.benginDataTime).getTime()
                    let end = new Date(this.endDataTime).getTime()
                    for (let i = 0; i < this.backuplable.length; i++) {
                        let timebegin = this.backuplable[i].absoluteTime ? new Date(this.backuplable[i].absoluteTime).getTime() + Number(this.backuplable[i].offset) * 1000 :
                            new Date(this.backuplable[i].videoStartTime).getTime() + Number(this.backuplable[i].offset) * 1000 + Number(this.backuplable[i].relativeTime)
                        if (timebegin >= begin && timebegin <= end) {
                            list.push(this.backuplable[i])
                        }
                    }
                    data.list = list
                }
                let isfind = _.find(this.spacelist, data)
                if (isfind) {
                    this.$notify({
                        type: 'warning',
                        message: '请勿重复添加！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    return
                }
                this.spacelist.push(data)
                for (let i = 0; i < this.spacelist.length; i++) {
                    alllist.push(this.spacelist[i].list)
                }
                //二维数组变成一位数组
                alllist = [].concat.apply([], alllist)
                //将数组去重
                this.alllablelist = _.uniq(alllist)
                this.backthreelist = _.uniq(alllist)
                if (this.leftInfo) {
                    if (this.alllablelist.length) {
                        this.remainlist = []
                        for (let i = 0; i < this.alllablelist.length; i++) {
                            if (this.alllablelist[i].markId != this.leftInfo.markId) {
                                this.remainlist.push(this.alllablelist[i])
                            }
                        }
                        if (this.remainlist.length) {
                            for (let i = 0; i < this.remainlist.length; i++) {
                                if (this.rightInfo.markId == this.remainlist[i].markId) {
                                    this.remainindex = i + 1
                                }
                            }
                        } else {
                            this.remainindex = 0
                            this.remainlist = []
                        }
                    }
                }


                this.showlableInfo(this.alllablelist)
                //添加到数组中去了后，对数组中的list进行拼接
            }
        },
        //删除当前数组的选中项，并做删除
        deletethreelable(index) {
            if (this.addsuslist.length) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空数据，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    let alllist = []
                    //清空标注池
                    this.addsuslist = []
                    this.spacelist.splice(index, 1)
                    if (this.spacelist.length) {
                        for (let i = 0; i < this.spacelist.length; i++) {
                            alllist.push(this.spacelist[i].list)
                        }
                        //二维数组变成一位数组
                        alllist = [].concat.apply([], alllist)
                        //将数组去重
                        this.alllablelist = _.uniq(alllist)
                        if (this.leftInfo) {
                            if (this.alllablelist.length) {
                                this.remainlist = []
                                for (let i = 0; i < this.alllablelist.length; i++) {
                                    if (this.alllablelist[i].markId != this.leftInfo.markId) {
                                        this.remainlist.push(this.alllablelist[i])
                                    }
                                }
                                if (this.remainlist.length) {
                                    for (let i = 0; i < this.remainlist.length; i++) {
                                        if (this.rightInfo.markId == this.remainlist[i].markId) {
                                            this.remainindex = i + 1
                                        }
                                    }
                                } else {
                                    this.remainindex = 0
                                    this.remainlist = []
                                }
                            }
                        }
                        this.showlableInfo(this.alllablelist)
                    } else {
                        this.nowtheeIndex = null
                        this.leftInfo = ''
                        this.rightInfo = ''
                        this.alllablelist = []
                    }
                }).catch(() => {})
            } else {
                let alllist = []
                //清空标注池
                this.addsuslist = []
                this.spacelist.splice(index, 1)
                if (this.spacelist.length) {
                    for (let i = 0; i < this.spacelist.length; i++) {
                        alllist.push(this.spacelist[i].list)
                    }
                    //二维数组变成一位数组
                    alllist = [].concat.apply([], alllist)
                    //将数组去重
                    this.alllablelist = _.uniq(alllist)
                    if (this.leftInfo) {
                        if (this.alllablelist.length) {
                            this.remainlist = []
                            for (let i = 0; i < this.alllablelist.length; i++) {
                                if (this.alllablelist[i].markId != this.leftInfo.markId) {
                                    this.remainlist.push(this.alllablelist[i])
                                }
                            }
                            if (this.remainlist.length) {
                                for (let i = 0; i < this.remainlist.length; i++) {
                                    if (this.rightInfo.markId == this.remainlist[i].markId) {
                                        this.remainindex = i + 1
                                    }
                                }
                            } else {
                                this.remainindex = 0
                                this.remainlist = []
                            }
                        }
                    }
                    this.showlableInfo(this.alllablelist)
                } else {
                    this.nowtheeIndex = null
                    this.leftInfo = ''
                    this.rightInfo = ''
                    this.alllablelist = []
                }
            }




        },

        //通过选择当前点位获取当前点位下的标注数量
        // num 1 表示是单点中的第一个select切换
        // num 2 表示是单点中的第二个select切换
        changeDevice(val, num) {
            if (this.addsuslist.length) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空数据，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.addsuslist = []
                    this.getDeviceLableList(val, num)
                }).catch(() => {
                    if (this.checklabel == 1) {
                        if (num == 1) {
                            this.deviceone = this.backupdeviceone
                        } else if (num == 2) {
                            this.devicetwo = this.backupdevicetwo
                        }
                    } else if (this.checklabel == 2) {
                        this.devicethree = this.backupdeviceone
                    } else if (this.checklabel == 3) {
                        this.devicefour = this.backupdevicetwo
                    } else if (this.checklabel == 4) {}
                })
            } else {
                this.getDeviceLableList(val, num)
            }

        },

        //1、切换单点时间碰撞中切换时间清空数据
        checktimetype(val) {
            if (this.addsuslist.length) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空数据，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.addsuslist = []
                    this.backuptimepype = val
                    if (this.firstlablelist.length) {
                        this.leftindex = 0
                        this.leftInfo = this.firstlablelist[0]
                        //在切换之前先判断右边是否有数据，如果有数据，则继续判断右边的数据是否存在
                        let list = []
                        if (this.backuptwolablelist.length) {
                            let time = this.leftInfo.absoluteTime ? new Date(this.leftInfo.absoluteTime).getTime() + Number(this.leftInfo.offset) * 1000 :
                                new Date(this.leftInfo.videoStartTime).getTime() + Number(this.leftInfo.offset) * 1000 + Number(this.leftInfo.relativeTime)
                            let spacingtime = this.timepype * 60 * 1000 //间隔时间
                            for (let i = 0; i < this.backuptwolablelist.length; i++) {
                                let times = this.backuptwolablelist[i].absoluteTime ? new Date(this.backuptwolablelist[i].absoluteTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 :
                                    new Date(this.backuptwolablelist[i].videoStartTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 + Number(this.backuptwolablelist[i].relativeTime)
                                //1 2 3 大于 等于 小于
                                if (this.checktime == 1) {
                                    if (Math.abs(time - times) > spacingtime) {
                                        list.push(this.backuptwolablelist[i])
                                    }
                                } else if (this.checktime == 2) {
                                    if (Math.abs(time - times) == spacingtime) {
                                        list.push(this.backuptwolablelist[i])
                                    }
                                } else if (this.checktime == 3) {
                                    if (Math.abs(time - times) < spacingtime) {
                                        list.push(this.backuptwolablelist[i])
                                    }
                                }
                            }
                            this.twolablelist = list
                            if (this.twolablelist.length) {
                                this.rightindex = 0
                                this.rightInfo = this.twolablelist[0]
                            } else {
                                this.rightindex = 0
                                this.rightInfo = ''
                            }
                        }
                    } else {
                        this.leftindex = 0
                        this.leftInfo = ''
                        this.rightindex = 0
                        this.rightInfo = ''
                    }

                }).catch(() => {
                    this.timepype = this.backuptimepype
                })
            } else {
                this.backuptimepype = val
                if (this.firstlablelist.length) {
                    this.leftindex = 0
                    this.leftInfo = this.firstlablelist[0]
                    //在切换之前先判断右边是否有数据，如果有数据，则继续判断右边的数据是否存在
                    let list = []
                    if (this.backuptwolablelist.length) {
                        let time = this.leftInfo.absoluteTime ? new Date(this.leftInfo.absoluteTime).getTime() + Number(this.leftInfo.offset) * 1000 :
                            new Date(this.leftInfo.videoStartTime).getTime() + Number(this.leftInfo.offset) * 1000 + Number(this.leftInfo.relativeTime)
                        let spacingtime = this.timepype * 60 * 1000 //间隔时间
                        for (let i = 0; i < this.backuptwolablelist.length; i++) {
                            let times = this.backuptwolablelist[i].absoluteTime ? new Date(this.backuptwolablelist[i].absoluteTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 :
                                new Date(this.backuptwolablelist[i].videoStartTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 + Number(this.backuptwolablelist[i].relativeTime)
                            //1 2 3 大于 等于 小于
                            if (this.checktime == 1) {
                                if (Math.abs(time - times) > spacingtime) {
                                    list.push(this.backuptwolablelist[i])
                                }
                            } else if (this.checktime == 2) {
                                if (Math.abs(time - times) == spacingtime) {
                                    list.push(this.backuptwolablelist[i])
                                }
                            } else if (this.checktime == 3) {
                                if (Math.abs(time - times) < spacingtime) {
                                    list.push(this.backuptwolablelist[i])
                                }
                            }
                        }
                        this.twolablelist = list
                        if (this.twolablelist.length) {
                            this.rightindex = 0
                            this.rightInfo = this.twolablelist[0]
                        } else {
                            this.rightindex = 0
                            this.rightInfo = ''
                        }
                    }
                } else {
                    this.leftindex = 0
                    this.leftInfo = ''
                    this.rightindex = 0
                    this.rightInfo = ''
                }
            }


        },
        //.、切换单点时间碰撞中切换大于小于等于清空数据
        checktimelable(val) {
            if (this.addsuslist.length) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空数据，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.addsuslist = []
                    this.backupchecktime = val
                    if (this.firstlablelist.length) {
                        this.leftindex = 0
                        this.leftInfo = this.firstlablelist[0]
                        //在切换之前先判断右边是否有数据，如果有数据，则继续判断右边的数据是否存在
                        let list = []
                        if (this.backuptwolablelist.length) {
                            let time = this.leftInfo.absoluteTime ? new Date(this.leftInfo.absoluteTime).getTime() + Number(this.leftInfo.offset) * 1000 :
                                new Date(this.leftInfo.videoStartTime).getTime() + Number(this.leftInfo.offset) * 1000 + Number(this.leftInfo.relativeTime)
                            let spacingtime = this.timepype * 60 * 1000 //间隔时间
                            for (let i = 0; i < this.backuptwolablelist.length; i++) {
                                let times = this.backuptwolablelist[i].absoluteTime ? new Date(this.backuptwolablelist[i].absoluteTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 :
                                    new Date(this.backuptwolablelist[i].videoStartTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 + Number(this.backuptwolablelist[i].relativeTime)
                                //1 2 3 大于 等于 小于
                                if (val == 1) {
                                    if (Math.abs(time - times) > spacingtime) {
                                        list.push(this.backuptwolablelist[i])
                                    }
                                } else if (val == 2) {
                                    if (Math.abs(time - times) == spacingtime) {
                                        list.push(this.backuptwolablelist[i])
                                    }
                                } else if (val == 3) {
                                    if (Math.abs(time - times) < spacingtime) {
                                        list.push(this.backuptwolablelist[i])
                                    }
                                }
                            }
                            this.twolablelist = list
                            if (this.twolablelist.length) {
                                this.rightindex = 0
                                this.rightInfo = this.twolablelist[0]
                            } else {
                                this.rightindex = 0
                                this.rightInfo = ''
                            }
                        }
                    } else {
                        this.leftindex = 0
                        this.leftInfo = ''
                        this.rightindex = 0
                        this.rightInfo = ''
                    }
                }).catch(() => {
                    this.checktime = this.backupchecktime
                })
            } else {
                this.backupchecktime = val
                if (this.firstlablelist.length) {
                    this.leftindex = 0
                    this.leftInfo = this.firstlablelist[0]
                    //在切换之前先判断右边是否有数据，如果有数据，则继续判断右边的数据是否存在
                    let list = []
                    if (this.backuptwolablelist.length) {
                        let time = this.leftInfo.absoluteTime ? new Date(this.leftInfo.absoluteTime).getTime() + Number(this.leftInfo.offset) * 1000 :
                            new Date(this.leftInfo.videoStartTime).getTime() + Number(this.leftInfo.offset) * 1000 + Number(this.leftInfo.relativeTime)
                        let spacingtime = this.timepype * 60 * 1000 //间隔时间
                        for (let i = 0; i < this.backuptwolablelist.length; i++) {
                            let times = this.backuptwolablelist[i].absoluteTime ? new Date(this.backuptwolablelist[i].absoluteTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 :
                                new Date(this.backuptwolablelist[i].videoStartTime).getTime() + Number(this.backuptwolablelist[i].offset) * 1000 + Number(this.backuptwolablelist[i].relativeTime)
                            //1 2 3 大于 等于 小于
                            if (val == 1) {
                                if (Math.abs(time - times) > spacingtime) {
                                    list.push(this.backuptwolablelist[i])
                                }
                            } else if (val == 2) {
                                if (Math.abs(time - times) == spacingtime) {
                                    list.push(this.backuptwolablelist[i])
                                }
                            } else if (val == 3) {
                                if (Math.abs(time - times) < spacingtime) {
                                    list.push(this.backuptwolablelist[i])
                                }
                            }
                        }
                        this.twolablelist = list
                        if (this.twolablelist.length) {
                            this.rightindex = 0
                            this.rightInfo = this.twolablelist[0]
                        } else {
                            this.rightindex = 0
                            this.rightInfo = ''
                        }
                    }
                } else {
                    this.leftindex = 0
                    this.leftInfo = ''
                    this.rightindex = 0
                    this.rightInfo = ''
                }
            }
        },
        //切换主要功能的时候清空所有数据和请求新的数据
        changeCheckLabel(val) {
            if (this.addsuslist.length) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空数据，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.addsuslist = []
                    this.backupchecklabel = this.checklabel
                    this.nowactive = 0
                    this.leftindex = 0
                    this.rightindex = 0
                    this.leftInfo = ''
                    this.rightInfo = ''
                    this.spacelist = []
                    this.backuplable = []
                    this.nowtheeIndex = null
                    this.showleftvideo = false
                    this.showrightvideo = false
                    if (this.lableDeviceList.length) {
                        this.deviceone = this.lableDeviceList[0].deviceUuid
                        this.devicethree = this.lableDeviceList[0].deviceUuid
                        this.devicefour = this.lableDeviceList[0].deviceUuid
                    }
                    if (this.lableDeviceList.length > 1) {
                        this.devicetwo = this.lableDeviceList[1].deviceUuid
                    } else {
                        this.devicetwo = ''
                    }
                    if (this.checklabel == 1) {
                        this.backupdeviceone = this.deviceone
                        this.backupdevicetwo = this.devicetwo
                        this.getDeviceLableList(this.deviceone, 1)
                        this.getDeviceLableList(this.devicetwo, 2)
                    } else if (this.checklabel == 2) {
                        this.backupdeviceone = this.devicethree
                        this.getDeviceLableList(this.devicethree)
                        this.getvideoTime();
                        this.OpenTheTime4("#beginData", "#endData");
                    } else if (this.checklabel == 3) {
                        this.backupdevicetwo = this.devicefour //第二个和第四个点位的备份
                        this.getDeviceLableList(this.devicefour)
                        this.getvideoTime();
                        this.OpenTheTime5("#benginTime1", "#endTime1");
                    } else if (this.checklabel == 4) {
                        this.getDeviceLableList()
                    }
                }).catch(() => {
                    this.checklabel = this.backupchecklabel
                })
            } else {
                this.backupchecklabel = this.checklabel
                this.nowactive = 0
                this.leftindex = 0
                this.rightindex = 0
                this.leftInfo = ''
                this.rightInfo = ''
                this.spacelist = []
                this.backuplable = []
                this.nowtheeIndex = null
                this.showleftvideo = false
                this.showrightvideo = false
                if (this.lableDeviceList.length) {
                    this.deviceone = this.lableDeviceList[0].deviceUuid
                    this.devicethree = this.lableDeviceList[0].deviceUuid
                    this.devicefour = this.lableDeviceList[0].deviceUuid
                }
                if (this.lableDeviceList.length > 1) {
                    this.devicetwo = this.lableDeviceList[1].deviceUuid
                } else {
                    this.devicetwo = ''
                }
                if (this.checklabel == 1) {
                    this.getDeviceLableList(this.deviceone, 1)
                    this.getDeviceLableList(this.devicetwo, 2)
                } else if (this.checklabel == 2) {
                    this.getDeviceLableList(this.devicethree)
                    this.getvideoTime();
                    this.$nextTick(() => {
                        this.OpenTheTime4("#beginData", "#endData");
                    })

                } else if (this.checklabel == 3) {
                    this.timeBegin2 = null
                    this.timeEnd2 = null
                    this.getDeviceLableList(this.devicefour)
                    this.getvideoTime();
                    this.$nextTick(() => {
                        this.OpenTheTime5("#benginTime1", "#endTime1");
                    })
                    // setTimeout(()=>{

                    // },1000)

                } else if (this.checklabel == 4) {
                    this.getDeviceLableList()
                }
            }
        },
        //得到标注的数据后，处理显示的标注数据
        showlableInfo(list) {
            if (list.length == 1) {
                this.leftInfo = list[0]
                this.leftindex = 0
                this.rightInfo = ''
                this.rightindex = 0
            } else if (list.length == 2) {
                this.leftInfo = list[0]
                this.leftindex = 0
                this.rightInfo = list[1]
                this.rightindex = 1
            } else if (list.length > 2) {
                this.leftInfo = list[0]
                this.leftindex = 0
                this.rightInfo = list[1]
                this.rightindex = 1
            } else {
                this.leftInfo = ''
                this.rightInfo = ''
            }
        },
        //点击左边的上一个
        leftprev() {
            this.showleftvideo = false
            this.showrightvideo = false
            this.leftindex--
            if (this.checklabel == 1) {
                if (this.leftindex < 0) {
                    this.leftindex = 0
                }
                this.leftInfo = this.firstlablelist[this.leftindex] == undefined ? '' : this.firstlablelist[this.leftindex]
            } else {
                this.rightindex--
                if (this.leftindex < 0) {
                    this.leftindex = 0
                }
                //如果左边的索引是0的话，默认右边的索引是1
                if (this.leftindex == 0) {
                    this.rightindex = 1
                }
                this.leftInfo = this.alllablelist[this.leftindex]
                this.rightInfo = this.alllablelist[this.rightindex] == undefined ? '' : this.alllablelist[this.rightindex]
            }

        },
        //点击左边的下一个
        leftnext() {
            this.showleftvideo = false
            this.showrightvideo = false
            //点击左边下一个索引自动+1
            this.leftindex++
            if (this.checklabel == 1) {
                if (this.leftindex >= this.firstlablelist.length) {
                    this.leftindex = 0
                }
                this.leftInfo = this.firstlablelist[this.leftindex] == undefined ? '' : this.firstlablelist[this.leftindex]
            } else {
                this.rightindex++
                if (this.leftindex >= this.alllablelist.length) {
                    this.leftindex = 0
                    this.rightindex = 1
                }
                //当前索引在每次加1的时候，右边的数据跟着联动
                //如果左边等于1的时候
                if (this.leftindex == 1) {
                    this.rightindex = 0
                }
                if (this.rightindex >= this.alllablelist.length) {
                    this.rightindex = 0
                    if (this.rightindex == this.leftindex) {
                        this.rightindex++
                    }
                }
                this.leftInfo = this.alllablelist[this.leftindex]
                this.rightInfo = this.alllablelist[this.rightindex] == undefined ? '' : this.alllablelist[this.rightindex]
            }
        },
        //点击右边的上一个
        rightprev() {
            // this.showleftvideo = false
            this.showrightvideo = false
            this.rightindex--
            if (this.checklabel == 1) {
                if (this.rightindex < 0) {
                    this.rightindex = 0
                }
                this.rightInfo = this.twolablelist[this.rightindex] == undefined ? '' : this.twolablelist[this.rightindex]
            } else {
                if (this.rightindex == this.leftindex) {
                    this.rightindex--
                }
                //加1后的索引判断值是否比当前标注的数组长度小
                if (this.rightindex < 0) {
                    this.rightindex = this.alllablelist.length - 1
                    if (this.rightindex == this.leftindex) {
                        this.rightindex--
                    }
                }
                //当前索引在每次加1的时候，右边的数据跟着联动
                //如果左边等于1的时候
                this.rightInfo = this.alllablelist[this.rightindex] == undefined ? '' : this.alllablelist[this.rightindex]
            }
        },
        //点击右边的下一个
        rightnext() {
            // this.showleftvideo = false
            this.showrightvideo = false
            this.rightindex++
            if (this.checklabel == 1) {
                if (this.rightindex >= this.twolablelist.length) {
                    this.rightindex = 0
                }
                this.rightInfo = this.twolablelist[this.rightindex] == undefined ? '' : this.twolablelist[this.rightindex]
            } else {
                if (this.rightindex == this.leftindex) {
                    this.rightindex++
                }
                //加1后的索引判断值是否比当前标注的数组长度小
                if (this.rightindex >= this.alllablelist.length) {
                    this.rightindex = 0
                    if (this.rightindex == this.leftindex) {
                        this.rightindex++
                    }
                }
                //当前索引在每次加1的时候，右边的数据跟着联动
                //如果左边等于1的时候
                this.rightInfo = this.alllablelist[this.rightindex] == undefined ? '' : this.alllablelist[this.rightindex]
            }
        },
        //点击像，添加数据到下方的数组中去
        linkness() {
            if ((this.leftInfo == '' && this.rightInfo == '') || this.leftInfo == '') {
                // if ((this.leftInfo == '' && this.rightInfo == '') || this.rightInfo == '') {
                this.$notify({
                    type: 'warning',
                    message: '当前没有标注信息',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            this.showrightvideo = false
            if (this.leftInfo != '') {
                this.addsuslist.push(this.leftInfo)
            }
            if (this.rightInfo != '') {
                this.addsuslist.push(this.rightInfo)
            }
            if (this.checklabel == 1) {
                this.twolablelist = _.pull(this.twolablelist, this.rightInfo)
                this.twolablelist = this.twolablelist.filter((item) => item.markId != this.rightInfo.markId)
                this.rightnext()
            } else {
                this.alllablelist = _.pull(this.alllablelist, this.rightInfo)
                this.remainlist = this.remainlist.filter((item) => item.markId != this.rightInfo.markId)
                this.rightnext()
            }
            //对数组进行去重
            this.addsuslist = _.uniq(this.addsuslist)
            //对数组进行排序
            this.addsuslist = this.addsuslist.sort((a, b) =>
                (new Date(b.absoluteTime).getTime() == '' ?
                    (new Date(b.videoStartTime).getTime() + Number(b.relativeTime) + Number(b.offset) * 1000) :
                    (new Date(b.absoluteTime).getTime() + Number(b.offset) * 1000)) <
                (new Date(a.absoluteTime).getTime() == '' ?
                    (new Date(a.videoStartTime).getTime() + Number(a.relativeTime) + Number(a.offset) * 1000) :
                    (new Date(a.absoluteTime).getTime() + Number(a.offset) * 1000)) ? 1 : -1);


        },
        //点击不像，把数据从数组中删除掉，左边的数据不容许删除
        unlink() {
            this.showrightvideo = false
            if (this.checklabel == 1) {
                if (this.twolablelist.length) {
                    this.twolablelist = _.pull(this.twolablelist, this.rightInfo)
                    this.twolablelist = this.twolablelist.filter((item) => item.markId != this.rightInfo.markId)
                    this.rightindex--
                    this.rightnext()
                }
            } else {
                if (this.alllablelist.length) {
                    this.alllablelist = _.pull(this.alllablelist, this.rightInfo)
                    this.remainlist = this.remainlist.filter((item) => item.markId != this.rightInfo.markId)
                    this.rightindex--
                    this.rightnext()
                }

            }
            //数组的长度大于0


        },
        clicknowlable(item, index) {
            this.nowactive = index
        },
        //删除当前标注
        deletelable() {
            if (!this.addsuslist.length) {
                return
            }
            if (this.addsuslist[this.nowactive].markId == this.leftInfo.markId) {
                this.$notify({
                    type: 'warning',
                    message: '当前标注不允许删除！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            let obj = this.addsuslist[this.nowactive]
            this.addsuslist = _.pull(this.addsuslist, this.addsuslist[this.nowactive])
            if (this.checklabel == 1) {
                this.twolablelist.push(obj)
            } else if (this.checklabel != 1) {
                this.alllablelist.push(obj)
            }
            this.rightInfo = obj
            if (this.leftInfo) {
                this.remainlist = []
                if (this.checklabel != 1 && this.alllablelist.length) {
                    for (let i = 0; i < this.alllablelist.length; i++) {
                        if (this.alllablelist[i].markId != this.leftInfo.markId) {
                            this.remainlist.push(this.alllablelist[i])
                        }
                    }
                    if (this.rightInfo && this.remainlist.length) {
                        for (let i = 0; i < this.remainlist.length; i++) {
                            if (this.rightInfo.markId == this.remainlist[i].markId) {
                                this.remainindex = i + 1
                            }
                        }
                    } else {
                        this.remainindex = 0
                        this.remainlist = []
                    }
                } else if (this.checklabel == 1 && this.twolablelist.length) {
                    for (let i = 0; i < this.twolablelist.length; i++) {
                        if (this.twolablelist[i].markId != this.leftInfo.markId) {
                            this.remainlist.push(this.twolablelist[i])
                        }
                    }
                    if (this.rightInfo && this.remainlist.length) {
                        for (let i = 0; i < this.remainlist.length; i++) {
                            if (this.rightInfo.markId == this.remainlist[i].markId) {
                                this.remainindex = i + 1
                            }
                        }
                    } else {
                        this.remainindex = 0
                        this.remainlist = []
                    }
                }
            } else {
                this.remainindex = 0
                this.remainlist = []
            }

        },
        //清空所有的标注池子
        clearAllList() {
            // if(this.addsuslist.length){
            let newArray = []
            newArray = this.addsuslist.concat(this.alllablelist, this.backthreelist)
            console.log(this.backthreelist, 44444);
            newArray = [...new Set(newArray)]
            this.addsuslist = []
            //等于备份数据
            this.alllablelist = this.backuplable
            if (this.checklabel == 1) {
                this.getDeviceLableList(this.deviceone, 1)
                this.getDeviceLableList(this.devicetwo, 2)
            } else if (this.checklabel == 2) {
                this.getvideoTime();
                this.getDeviceLableList(this.devicethree)
            } else if (this.checklabel == 3) {
                this.getvideoTime();
                this.alllablelist = newArray
                if (this.alllablelist.length) {
                    this.leftInfo = this.alllablelist[0]
                    if (this.alllablelist.length > 1) {
                        this.rightInfo = this.alllablelist[1]
                    }
                    this.remainlist = []
                    for (let i = 0; i < this.alllablelist.length; i++) {
                        if (this.alllablelist[i].markId != this.leftInfo.markId) {
                            this.remainlist.push(this.alllablelist[i])
                        }
                    }
                    if (this.remainlist.length) {
                        for (let i = 0; i < this.remainlist.length; i++) {
                            if (this.rightInfo.markId == this.remainlist[i].markId) {
                                this.remainindex = i + 1
                            }
                        }
                    } else {
                        this.remainindex = 0
                        this.remainlist = []
                    }
                }
                // this.getDeviceLableList(this.devicefour)
            } else if (this.checklabel == 4) {
                this.getDeviceLableList()
            };
            this.openDialog();
            // }
        },
        //切换人车骑，更换数据
        changetypelist(val) {
            if (this.addsuslist.length) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空数据，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.backuplabeltype = this.labeltype
                    this.addsuslist = []
                    this.leftindex = 0
                    this.rightindex = 0
                    this.rightInfo = ''
                    this.leftInfo = ''
                    this.showleftvideo = false
                    this.showrightvideo = false
                    if (this.checklabel == 1) {
                        this.getDeviceLableList(this.deviceone, 1)
                        this.getDeviceLableList(this.devicetwo, 2)
                    } else if (this.checklabel == 2) {
                        this.getDeviceLableList(this.devicethree)
                    } else if (this.checklabel == 3) {
                        this.getDeviceLableList(this.devicefour)
                    } else if (this.checklabel == 4) {
                        this.getDeviceLableList()
                    }
                }).catch(() => {
                    this.labeltype = this.backuplabeltype
                })
            } else {
                this.backuplabeltype = this.labeltype
                this.leftindex = 0
                this.rightindex = 0
                this.rightInfo = ''
                this.leftInfo = ''
                this.showleftvideo = false
                this.showrightvideo = false
                if (this.checklabel == 1) {
                    this.getDeviceLableList(this.deviceone, 1)
                    this.getDeviceLableList(this.devicetwo, 2)
                } else if (this.checklabel == 2) {
                    this.getDeviceLableList(this.devicethree)
                } else if (this.checklabel == 3) {
                    this.getDeviceLableList(this.devicefour)
                } else if (this.checklabel == 4) {
                    this.getDeviceLableList()
                }
            }


        },
        //左边的播放
        playleft() {
            this.showleftvideo = true
            this.$nextTick(() => {
                let url = this.getUrl(this.leftInfo.videoUrl)
                this.flv_load_mds('leftvideo', url)
            })

        },
        //左边的停止
        stopleft() {
            this.showleftvideo = false
        },
        //左边的播放
        playright() {
            this.showrightvideo = true
            this.$nextTick(() => {
                let url = this.getUrl(this.rightInfo.videoUrl)
                this.flv_load_mds('rightvideo', url)
            })

        },
        //左边的停止
        stopright() {
            this.showrightvideo = false
        },





    },

};
export default mixins
