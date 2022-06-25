/*
 * @Author: 李志远
 * @Date: 2019-12-19 10:04:28
 * @LastEditTime : 2021-05-07 09:08:17
 * @LastEditors  : Please set LastEditors
 * @Description: 描述
 * @FilePath: \vacp-wfes\src\api\casestudy\track.js
 * @写bug苦逼，一直写bug一直苦逼
 */
let face = require('@/assets/images/device/face.png');
let car = require('@/assets/images/device/car.png');
import moment from 'moment'
import _ from 'lodash'
const mixins = {
    data: function () {
        return {
            u_imgrul: '', // 案发点和信息点中的图片
            u_id: '', //案发点或信息点的ID
            showimgrul: '$store.state.defaultImg',
            polylineObj: null,
            deletMarkers: [],
            totalMetres: 0,
            timeDifference: 0,
            allspot: [], //  轨迹编辑后存放的数组
            dragPoints: [], //轨迹编辑后拖拽的数组
            progreesArr: [], //显示嫌疑目标轨迹异常的数据
            showProgreesArr: [], //是否显示嫌疑目标轨迹异常的数据
            showProgreesFlag: false,
            trajectoryArr: [], //获取当前地图的轨迹数据
            landmarksPoints: [],
            warningDataList: [], //获取是否正常获取异常的数组
            warningDataFlag: false, // 是否显示正常或者异常数组
            warningType: [], // 总长度和总时间数组
            lineAllData: [],
        }
    },

    filters: {
        typetopt(val) {
            if (val == 5) {
                return '临时点设备'
            } else if (val == 1) {
                return '天网设备'
            } else if (val == 4) {
                return '社会面设备'
            } else if (val == 6) {
                return '信息点设备'
            } else if (val == 8) {
                return '卡口点设备'
            }
        },
        secondHands(val) {
            if (val == 0 || val == '' || val == undefined) {
                val = 0
                return ('快' + val)
            }
            if (Math.sign(val) == -1) {
                val = -(val)
                return ('快' + val)
            } else if (Math.sign(val) == 1) {
                val = val
                return '慢' + val
            }
        },
    },

    methods: {

        //切换嫌疑目标
        changeSuspicionType(val) {
            if (val == 1) {
                return '（ 人 ）';
            } else if (val == 2) {
                return '（ 骑车人 ）'
            } else if (val == 3) {
                return '（ 车辆 ）'
            }
        },

        //获取案发点的标注信息
        getCaseId(id) {
            let data = {
                caseUuid: id
            }
            data = this.$qs.stringify(data)
            this.$http.post('pca/point/img/hotspotQuery', data).then(res => {
                if (res.data.code == 200) {
                    this.hotspotId = res.data.data.hotspotId
                    this.getImgquery(res.data.data.hotspotId)
                }
            })
        },

        //过滤字段
        isEmpty(text, state) {
            if (String(text) == '0') {
                return '没'
            } else if (String(text) == '1') {
                if (state) {
                    return text
                } else {
                    return '是'
                }
            } else if (String(text) == '' || text == null || text == undefined) {
                return '未知'
            } else {
                return text
            }
        },

        //查询信息点图片的方法
        //查询信息方法
        getImgquery(id) {
            let data = {
                pointId: id,
                caseUuid: this.$route.query.caseUuid
            }
            data = this.$qs.stringify(data)
            this.$http.post('pca/point/img/query', data).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data == null) {
                        this.u_imgrul = ''
                        this.u_id = ''
                        this.showimgrul = ''
                    } else {
                        this.u_imgrul = res.data.data.imgUrl
                        this.u_id = res.data.data.id
                        this.showimgrul = this.u_imgrul.split(',')[0]
                    }
                }
            })
        },

        //切换嫌疑人获取嫌疑人的坐标
        getlats(id, speed, isfirstTrue) {
            console.log('执行1');
            let data = {
                suspicionUuid: id
            }
            this.trajectoryArr = []
            this.progreesArr = []
            this.suslist = []
            let otherList = []
            this.$http.get('pca/casemng/suspicion/mark/trajectory', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data.length > 0) {
                        if (res.data.data.length == 1) {
                            this.polylineObj = null
                            this.warningDataFlag = false
                        }
                        for (let i = 0; i < res.data.data.length; i++) {
                            if (res.data.data[i].markId != undefined) {
                                this.trajectoryArr.push(res.data.data[i])
                            }
                        }
                        this.suslist = res.data.data
                        this.getTrackList() // 绑定的轨迹数据
                        if (res.data.data.length > 0) {
                            var dataArr = res.data.data
                            for (let i = 0; i < dataArr.length; i++) {
                                if (dataArr[i].markId) {
                                    let obj = {}
                                    obj.speed = speed
                                    obj.deviceId = dataArr[i].deviceId
                                    obj.deviceName = dataArr[i].deviceName
                                    obj.latitude = dataArr[i].latitude
                                    obj.longitude = dataArr[i].longitude
                                    obj.videoStartTime = this.getTrajectory(dataArr[i].videoStartTime || dataArr[i].absoluteTime, Number(dataArr[i].relativeTime), Number(dataArr[i].offset))
                                    obj.videoCaptureUrl = dataArr[i].videoCaptureUrl
                                    this.progreesArr.push(obj)
                                }
                            }
                            this.progreesArr = _.uniqWith(this.progreesArr, _.isEqual)
                            this.showTrajectory(dataArr);
                        }
                    } else {
                        this.isTrajectory = false
                        this.warningDataFlag = false
                        // this.showProgreesFlag = false
                        if (isfirstTrue) {
                            this.$notify({
                                type: 'warning',
                                message: '暂无轨迹',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        }
                    }
                } else {
                    this.polylineObj = null
                    // this.showProgreesFlag = true
                }
            })
        },
        // 碰撞手机绑定的轨迹
        getTrackList() {
            let points = []
            for (let i = 0; i < this.trajectoryArr.length; i++) {
                let obj = {}
                obj.latitude = this.trajectoryArr[i].latitude
                obj.longitude = this.trajectoryArr[i].longitude
                obj.time = this.getTrajectory(this.trajectoryArr[i].videoStartTime || this.trajectoryArr[i].absoluteTime, Number(this.trajectoryArr[i].relativeTime), Number(this.trajectoryArr[i].offset))
                points.push(obj)
            }
            setTimeout(() => {
                let data = {
                    caseUuid: this.caseUuid,
                    beginTime: "",
                    endTime: "",
                    range: this.range,
                    points: JSON.stringify(points),
                    suspicionUuids: this.suspicionUuids,
                    page: 1,
                    searchFlag: 1,
                    pageSize: "",
                    imsi: "",
                    pointNum: "",
                }
                data = this.$qs.stringify(data);
                this.$http.post("vsas/baseStation/collision", data).then(res => {
                    if (res.data.code == 200) {
                        let trackList = res.data.data
                        if (res.data.data != '' && res.data.data != undefined) {
                            this.locusData = []
                            for (let i = 0; i < trackList.length; i++) {
                                for (const key in trackList[i]) {
                                    this.locusData = trackList[i][key].list
                                }
                            }
                            this.childByTrack(this.locusData, 0)
                        }
                        this.getsusstatus();
                    } else {
                        this.$notify({
                            type: "error",
                            message: "获取绑定的轨迹失败",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                })
            }, 200)
        },
        //获取当前点位的类型集合
        getfoundLabelList(datalist) {
            let data = []
            let obj;
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].cameraType == 1) {
                    obj = {
                        type: datalist[i].cameraType, // 设备类型
                        deviceUuid: datalist[i].deviceUuid, // 设备ID
                        longitude: datalist[i].longitude, // 经度
                        latitude: datalist[i].latitude, // 纬度
                        cameraName: datalist[i].cameraName, // 设备名称
                        cameraUuid: datalist[i].cameraUuid, //
                        offset: datalist[i].offset // 设备偏移量
                    };
                    data.push(obj);
                    //   this.listData.push(obj);
                }
                if (datalist[i].cameraType == 4) {
                    obj = {
                        type: datalist[i].cameraType, // 设备类型
                        deviceUuid: datalist[i].deviceUuid, // 设备ID
                        longitude: datalist[i].longitude, // 经度
                        latitude: datalist[i].latitude, // 纬度
                        cameraName: datalist[i].cameraName, // 设备名称
                        cameraUuid: datalist[i].cameraUuid, //
                        offset: datalist[i].offset // 设备偏移量
                    };
                    data.push(obj);
                }
                if (datalist[i].cameraType == 5) {
                    obj = {
                        type: datalist[i].cameraType, // 设备类型
                        deviceUuid: datalist[i].deviceUuid, // 设备ID
                        longitude: datalist[i].longitude, // 经度
                        latitude: datalist[i].latitude, // 纬度
                        cameraName: datalist[i].cameraName, // 设备名称
                        cameraUuid: datalist[i].cameraUuid, //
                        offset: datalist[i].offset // 设备偏移量
                    };
                    data.push(obj);
                }
                if (datalist[i].cameraType == 6) {
                    obj = {
                        type: datalist[i].cameraType, // 设备类型
                        deviceUuid: datalist[i].deviceUuid, // 设备ID
                        longitude: datalist[i].longitude, // 经度
                        latitude: datalist[i].latitude, // 纬度
                        cameraName: datalist[i].cameraName, // 设备名称
                        cameraUuid: datalist[i].cameraUuid, //
                        offset: datalist[i].offset // 设备偏移量
                    };
                    data.push(obj);
                }
                if (datalist[i].cameraType == 8) {
                    obj = {
                        type: datalist[i].cameraType, // 设备类型
                        deviceUuid: datalist[i].deviceUuid, // 设备ID
                        longitude: datalist[i].longitude, // 经度
                        latitude: datalist[i].latitude, // 纬度
                        cameraName: datalist[i].cameraName, // 设备名称
                        cameraUuid: datalist[i].cameraUuid, //
                        offset: datalist[i].offset // 设备偏移量
                    };
                    data.push(obj);
                }
            }
            return data
        },

        processData(arr) {
            // 缓存用于记录
            const cache = [];
            for (const t of arr) {
                // 检查缓存中是否已经存在
                if (cache.find(c => c.deviceId === t.deviceId)) {
                    // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
                    continue;
                }
                // 不存在就说明以前没遇到过，把它记录下来
                cache.push(t);
            }

            // 记录结果就是过滤后的结果
            return cache;
        },

        // 转换经纬度
        zuobiao2Pixels(trajectoryLongitude, trajectoryLatitude, index) {
            var point = new BMap.Point(trajectoryLongitude, trajectoryLatitude);
            var pixel = this.map.pointToPixel(point);
            this.isTrajectory = true
            this.$nextTick(() => {
                document.getElementById('trajectoryPic' + index).style.left = (pixel.x - 15) + 'px';
                document.getElementById('trajectoryPic' + index).style.top = (pixel.y - 155) + 'px';
            })
        },
        /**
         * @description: 隐藏地图转换经纬度
         * @param {type}
         * @return:
         * @Author: 李志远
         * @Date: 2020-01-07 13:39:15
         * @LastEditTime: Do not edit
         */
        hideMapZuobiao2Pixels(trajectoryLongitude, trajectoryLatitude, index) {
            var point = new BMap.Point(trajectoryLongitude, trajectoryLatitude);
            var pixel = this.hideMap.pointToPixel(point);
            // this.isTrajectory = true
            this.$nextTick(() => {
                document.getElementById('hidetrajectoryPic' + index).style.left = (pixel.x - '15') + 'px';
                document.getElementById('hidetrajectoryPic' + index).style.top = (pixel.y - '155') + 'px';
            })
        },

        /**
         * @description:  获取异常轨迹方法
         * @param {arr} 嫌疑目标的list数组对象
         * @return:
         */
        warningData(arr) {
            console.log('执行2');
            // 初始状态设置
            this.warningDataFlag = false;
            this.warningDataList = [];
            var that = this;
            var promiseAll = arr.map((v) => {
                let data = {
                    suspicionUuid: v.suspicionUuid
                };
                return that.$http.get('pca/casemng/suspicion/mark/trajectory', {
                    params: data
                });
            });
            var dataList = [];
            var lineDataList = [];
            that.$http.all(promiseAll).then((res) => {
                res.forEach((v, index) => {
                    // 定义过滤后的数组
                    var filterData = [];
                    // 定义未过滤的数组
                    var nofilterData = [];
                    if (v.data.data.length > 0) {
                        for (let i = 0; i < v.data.data.length; i++) {
                            // 根据markId判断是否过滤
                            if (v.data.data[i].markId) {
                                filterData.push(v.data.data[i]);
                            }
                            nofilterData.push(v.data.data[i]);
                        }
                        dataList.push(filterData);
                        lineDataList.push(nofilterData);
                    }
                    // 判断每条轨迹的数组长度是否小于2,小于说明这条轨迹只有一个点位,不需要进行展示,从dataList数组里进行删除
                    for (var i = 0, flag = true, len = dataList.length; i < len; flag ? i++ : i) {
                        if (dataList[i].length < 2) {
                            dataList.splice(i, 1);
                            flag = false;
                            return;
                        } else {
                            flag = true;
                        }
                    }
                    // 循环,给dataList赋值
                    for (let i = 0; i < dataList.length; i++) {
                        for (let m = 0; m < dataList[i].length; m++) {
                            for (let k = 0; k < arr.length; k++) {
                                if (dataList[i][m].suspicionUuid == arr[k].suspicionUuid) {
                                    dataList[i][m].suspicionName = arr[k].suspicionName;
                                    dataList[i][m].suspicionType = arr[k].suspicionType;
                                    dataList[i][m].speed = arr[k].speed;
                                    dataList[i][m].newTime = this.getTrajectory(dataList[i][m].videoStartTime || dataList[i][m].absoluteTime, Number(dataList[i][m].relativeTime), Number(dataList[i][m].offset));
                                    // dataList[i][m].videoStartTime = this.getTrajectory(dataList[i][m].videoStartTime || dataList[i][m].absoluteTime, Number(dataList[i][m].relativeTime), Number(dataList[i][m].offset))
                                }
                            }
                        }
                    }
                    // 如果dataList的长度大于0,说明是有轨迹可以展示的
                    if (dataList.length > 0) {
                        this.warningDataFlag = true;
                        // 获取是否异常或正常的最终
                        this.warningDataList = this.isWarning(dataList);
                    }
                });
            });
        },
        //  判断最终显示的轨迹是否异常
        isWarning(arr) {
            let newArr = arr;
            // 数组转换方法，将一个数组转换成两两组成的二维数组
            let ccc = ((q) => {
                let f = 0,
                    r = [];
                for (; ++f < q.length;)
                    r.push([q[f - 1], q[f]])
                return r
            })
            let gg = []
            for (let i = 0; i < newArr.length; i++) {
                // 循环每条轨迹的数组
                for (let k = 0; k < newArr[i].length; k++) {
                    gg = ccc(newArr[i])
                }
                let warningArr = []
                for (let n = 0; n < gg.length; n++) {
                    let startPoint = new BMap.Point(gg[n][0].longitude, gg[n][0].latitude);
                    let endPoint = new BMap.Point(gg[n][1].longitude, gg[n][1].latitude);
                    let rice = +(this.map.getDistance(startPoint, endPoint));

                    let startTime = moment(gg[n][0].newTime, 'YYYY-MM-DD HH:mm:ss');
                    let endTime = moment(gg[n][1].newTime, 'YYYY-MM-DD HH:mm:ss');
                    let ss = endTime.diff(startTime, 'seconds');
                    if (ss == 0 || rice == 0) {
                        warningArr.push(2)
                    } else {
                        if (rice / gg[n][0].speed >= (ss - ss * 0.2) && rice / gg[n][0].speed <= (ss + ss * 0.2)) {
                            warningArr.push(1)
                        } else {
                            warningArr.push(2)
                        }
                    }
                }
                let pp = warningArr.every(v => {
                    return v == 1
                })
                if (pp) {
                    newArr[i][0].warnType = 1;
                } else {
                    newArr[i][0].warnType = 2;
                }
            }
            return newArr;
        },

        //创建目标轨迹
        showTrajectory(mapData) {
            // 初始化变量
            let newData = []
            let warnData = []
            if (mapData.length < 1) {
                return
            }
            //  轨迹进度关键代码
            if (mapData.length > 1) {
                for (let i = 0; i < this.progreesArr.length; i++) {
                    if ((i + 1) < this.progreesArr.length) {
                        let start = moment(this.progreesArr[i].videoStartTime, 'YYYY-MM-DD HH:mm:ss')
                        let end = moment(this.progreesArr[i + 1].videoStartTime, 'YYYY-MM-DD HH:mm:ss')
                        // 格式化处理的年月日时间差
                        let ss = this.formatTime(end.diff(start, 'seconds'))
                        // 未格式化的时间差
                        let ss2 = end.diff(start, 'seconds')
                        this.progreesArr[i].currentTime = ss2
                        newData.push(ss)
                        // warnData.push(ss2)
                    }
                }
                // 赋值
                this.progreesArr.forEach((v, i) => {
                    v.rightTime = newData[i] || ''
                    v.timeFlag = v.videoStartTime.split(' ')[0]
                    v.rightFlag = v.videoStartTime.split(' ')[1]
                    // v.currentTime = warnData[i] || ''
                })
                // 根据距离/速度与时间做比较判断每段距离是否异常
                for (let i = 0; i < this.progreesArr.length; i++) {
                    if ((i + 1) < this.progreesArr.length) {
                        let a = new BMap.Point(this.progreesArr[i].longitude, this.progreesArr[i].latitude)
                        let b = new BMap.Point(this.progreesArr[i + 1].longitude, this.progreesArr[i + 1].latitude)
                        var rice = +(this.map.getDistance(a, b))
                        if (rice / this.progreesArr[i].speed >= (this.progreesArr[i].currentTime - this.progreesArr[i].currentTime * 0.2) && (this.progreesArr[i].currentTime + this.progreesArr[i].currentTime * 0.2) >= rice / this.progreesArr[i].speed) {
                            this.progreesArr[i].warnFlag = false
                        } else {
                            this.progreesArr[i].warnFlag = true
                        }
                    }
                }
                //数据格式处理
                this.showProgreesArr = this.dataHandle(this.progreesArr)
                // console.log(this.showProgreesArr, '目标轨迹');
                if (this.showProgreesArr.length > 0) {
                    this.showProgreesFlag = true
                }
            }
            let datas = [];
            this.landmarksPoints = []
            let num;
            for (let i = 0; i < mapData.length; i++) {
                num = new BMap.Point(Number(mapData[i].longitude), Number(mapData[i].latitude));
                datas.push(num);
                this.landmarksPoints.push(new this.landmark(mapData[i].longitude, mapData[i].latitude, mapData[i].videoStartTime, 0.1))
            }
            // 如果经纬度一样，则随机把经纬度添加一点
            for (let i = 0; i < datas.length - 1; i++) {
                if (datas[i].lng == datas[i + 1].lng && datas[i].lat == datas[i + 1].lat) {
                    datas[i].lat = datas[i].lat + Math.random() / 10000
                    datas[i].lng = datas[i].lng + Math.random() / 10000
                }
            }
            this.map.centerAndZoom(new BMap.Point(datas[0].lng, datas[0].lat), sessionStorage.getItem('bmapLevel'))
            // this.setZoom(mapData, this.map)

            if (datas.length > 1) {
                let marker = new BMap.Marker(datas[0]); //起点marker
                let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 35), {
                    offset: new BMap.Size(5, 5),
                    imageOffset: new BMap.Size(5, 10),
                }); //地点图标
                marker.setIcon(iconc);
                marker.setTop(true);
                this.map.addOverlay(marker); //将标记添加到地图中
                marker = new BMap.Marker(datas[datas.length - 1]); //终点marker
                iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(35, 30), {
                    offset: new BMap.Size(0, 10),
                    imageOffset: new BMap.Size(-5, 0),
                }); //终点icon
                marker.setIcon(iconc);
                // marker.setTop(true);
                this.map.addOverlay(marker); //将标记添加到地图
                let icons = new BMap.IconSequence(
                    new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                        scale: 0.6, //图标缩放大小
                        strokeWeight: "2", //图标宽度
                        strokeColor: "white" //图标颜色
                    }), '1%', '5%', false
                )
                // 轨迹显示
                this.polylineObj = new BMap.Polyline(datas, {
                    // enableEditing: true, //是否启用线编辑，默认为false
                    enableClicking: true, //是否响应点击事件，默认为true
                    strokeColor: '#48affe',
                    icons: [icons],
                    strokeWeight: 10,
                    strokeOpacity: 0.99,
                });
                this.map.addOverlay(this.polylineObj);
                this.map.setViewport(datas);
                // 路书渲染

                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>手动撸一个路书功能，可以循环一直走开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                // var points = datas; //获取data数据中的经纬度点并格式化点为BMap点
                // var allPoints = [];

                // for (var i = 1; i < points.length; i++) { //将所有的点分割为n个小点,用于移动过度动画
                //   allPoints.push.apply(allPoints, this.getPoins(points[i - 1], points[i], 100));
                // }
                // var icon = new BMap.Icon("/static/images/start.png", new BMap.Size(50, 28), {
                //   anchor: new BMap.Size(25, 23)
                // }); //声明icon
                // let mkricon = new BMap.Marker(allPoints[0], {
                //   icon: icon
                // });
                // 调用移动方法
                // this.move(allPoints, mkricon)

                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>手动撸一个路书功能，可以循环一直走结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


                if (this.suspicionType == 1) {
                    let icon = new BMap.Icon('/static/images/Mario1.png', new BMap.Size(52, 55), {
                        anchor: new BMap.Size(15, 15),
                        // offset: new BMap.Size(50, 50)
                    })
                    this.loadLuShu(icon, datas, this.suspicionType)
                } else if (this.suspicionType == 2) {
                    let icon = new BMap.Icon('/static/images/biycar.png', new BMap.Size(48, 32), {
                        anchor: new BMap.Size(15, 15)
                    })
                    this.loadLuShu(icon, datas, this.suspicionType)
                } else {
                    let icon = new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), {
                        anchor: new BMap.Size(15, 15)
                    })
                    this.loadLuShu(icon, datas, this.suspicionType)
                }

            }
            // this.map.centerAndZoom(new BMap.Point(datas[0].lng, datas[0].lat), sessionStorage.getItem('bmapLevel'))

            let _this = this
            setTimeout(() => {
                _this.isTrajectory = false
                if (this.trajectoryArr.length > 0) {
                    for (let i = 0; i < this.trajectoryArr.length; i++) {
                        let getLongitude = this.trajectoryArr[i].longitude // 获取经度
                        let getLatitude = this.trajectoryArr[i].latitude // 获取纬度
                        this.zuobiao2Pixels(getLongitude, getLatitude, i, _this)
                    }
                }
            }, 1000)

            _this.map.addEventListener("zoomstart", function (evt) {
                _this.iszoom = true
                _this.loadTrajectory(_this.trajectoryArr, _this)
            })
            //缩放地图结束
            setTimeout(() => {
                _this.map.addEventListener("zoomend", function (evt) {
                    _this.loadTrajectory(_this.trajectoryArr, _this)
                })
            }, 200)
            // 拖拽地图开始
            _this.map.addEventListener("dragstart", function (evt) {
                _this.loadTrajectory(_this.trajectoryArr, _this)
            })
            _this.map.addEventListener("dragging", function (evt) {
                _this.loadTrajectory(_this.trajectoryArr, _this)

            })
            //拖拽地图结束
            _this.map.addEventListener("dragend", function (evt) {
                _this.loadTrajectory(_this.trajectoryArr, _this)
            })
        },

        // 导出数据的获取转换
        exportToData(arr) {
            console.log('执行3');
            var that = this;
            var promiseAll = arr.map((v) => {
                let data = {
                    suspicionUuid: v.suspicionUuid
                };
                return that.$http.get('pca/casemng/suspicion/mark/trajectory', {
                    params: data
                });
            });
            var lineDataList = [];
            that.$http.all(promiseAll).then((res) => {
                res.forEach(v => {
                    var nofilterData = [];
                    if (v.data.data.length > 0) {
                        for (let i = 0; i < v.data.data.length; i++) {
                            nofilterData.push(v.data.data[i]);
                        }
                        lineDataList.push(nofilterData);
                    }
                });

                // 隐藏地图数据
                this.lineAllData = lineDataList;
                for (let i = 0; i < this.lineAllData.length; i++) {
                    for (let k = 0; k < this.latData.length; k++) {
                        for (let v = 0; v < this.lineAllData[i].length; v++) {
                            if ((this.lineAllData[i][v].latitude == this.latData[k].latitude) && (this.lineAllData[i][v].longitude == this.latData[k].longitude)) {
                                this.lineAllData[i][v].type = this.latData[k].type;
                                this.lineAllData[i][v].cameraName = this.latData[k].cameraName;
                            }
                        }
                    }
                }
            });

        },


        getPoints(data) {
            var points = [];
            for (var i = 0; i < data.length; i++) {
                var x = data[i].longitude;
                var y = data[i].latitude;
                points[i] = new BMap.Point(x, y);

            }
            return points;
        },

        // 判断是否执行嫌疑目标轨迹快照渲染
        loadTrajectory(trajectoryArr, _this) {
            _this.isTrajectory = false
            if (trajectoryArr.length > 0) {
                for (let i = 0; i < trajectoryArr.length; i++) {
                    let getLongitude = trajectoryArr[i].longitude // 获取经度
                    let getLatitude = trajectoryArr[i].latitude // 获取纬度
                    _this.zuobiao2Pixels(getLongitude, getLatitude, i, _this)
                }
            }
        },

        //创建隐藏目标轨迹
        hideShowTrajectory(mapData, electric) {
            // 1.先去重
            // 2.去重后的数组length 小于2的时候retrun
            // if (mapData.length < 2) {
            //     return
            // }
            let datas1 = []
            let datas = [];
            let num;
            for (let i = 0; i < mapData.length; i++) {
                num = new BMap.Point(Number(mapData[i].longitude), Number(mapData[i].latitude));
                datas.push(num);
            }

            for (let i = 0; i < datas.length - 1; i++) {
                if (datas[i].lng == datas[i + 1].lng && datas[i].lat == datas[i + 1].lat) {
                    datas[i].lng = datas[i].lng + Math.random() / 10000
                }
            }

            // this.hideMap.centerAndZoom(new BMap.Point(datas[0].lng, datas[0].lat), sessionStorage.getItem('bmapLevel'))
            let marker = new BMap.Marker(datas[0]); //起点marker
            let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 35), {
                offset: new BMap.Size(5, 5),
                imageOffset: new BMap.Size(5, 10),
            }); //地点图标
            marker.setIcon(iconc);
            marker.setTop(true);
            this.hideMap.addOverlay(marker); //将标记添加到地图中
            marker = new BMap.Marker(datas[datas.length - 1]); //终点marker
            iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 35), {
                offset: new BMap.Size(5, 5),
                imageOffset: new BMap.Size(5, 10),
            }); //终点icon
            marker.setIcon(iconc);
            marker.setTop(true);
            this.hideMap.addOverlay(marker); //将标记添加到地图中
            let icons = new BMap.IconSequence(
                new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                    scale: 0.6, //图标缩放大小
                    strokeWeight: "2", //图标宽度
                    strokeColor: "white" //图标颜色
                }), '1%', '5%', false
            )
            let hidePolyline = new BMap.Polyline(datas, {
                // enableEditing: true, //是否启用线编辑，默认为false
                enableClicking: true, //是否响应点击事件，默认为true
                strokeColor: '#48affe',
                icons: [icons],
                strokeWeight: 10,
                strokeOpacity: 0.99,
            });
            this.hideMap.addOverlay(hidePolyline);
            if (electric != undefined) {
                if (electric.length > 1) { // 电围轨迹
                    for (let i = 0; i < electric.length; i++) {
                        num = new BMap.Point(Number(electric[i].longitude), Number(electric[i].latitude));
                        datas1.push(num);
                    }
                    for (let i = 0; i < datas1.length - 1; i++) {
                        if (datas1[i].lng == datas1[i + 1].lng && datas1[i].lat == datas1[i + 1].lat) {
                            datas1[i].lng = datas1[i].lng + Math.random() / 10000
                        }
                    }
                    let marker = new BMap.Marker(datas1[0]); //起点marker
                    let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 35), {
                        offset: new BMap.Size(5, 5),
                        imageOffset: new BMap.Size(5, 10),
                    }); //地点图标
                    marker.setIcon(iconc);
                    marker.setTop(true);
                    this.hideMap.addOverlay(marker); //将标记添加到地图中
                    marker = new BMap.Marker(datas1[datas1.length - 1]); //终点marker
                    iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 35), {
                        offset: new BMap.Size(5, 5),
                        imageOffset: new BMap.Size(5, 10),
                    }); //终点icon
                    marker.setIcon(iconc);
                    marker.setTop(true);
                    this.hideMap.addOverlay(marker); //将标记添加到地图中
                    let icons = new BMap.IconSequence(
                        new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                            scale: 0.6, //图标缩放大小
                            strokeWeight: "2", //图标宽度
                            strokeColor: "white" //图标颜色
                        }), '1%', '5%', false
                    )
                    let hidePolyline = new BMap.Polyline(datas1, {
                        // enableEditing: true, //是否启用线编辑，默认为false
                        enableClicking: true, //是否响应点击事件，默认为true
                        strokeColor: 'green',
                        icons: [icons],
                        strokeWeight: 5,
                        strokeOpacity: 0.6,
                    });
                    this.hideMap.addOverlay(hidePolyline);
                    // this.hideMap.setViewport(datas1);
                }
            }

            let viewlist = datas.concat(datas1)
            this.hideMap.setViewport(viewlist);
            // 操作隐藏地图的
            if (mapData[0].typeId == 1) {
                //1是人
                let icon = new BMap.Icon('/static/images/Mario1.png', new BMap.Size(52, 55), {
                    anchor: new BMap.Size(15, 15)
                })
                this.hideLoadLuShu(icon, datas, 1, mapData)
            } else if (mapData[0].typeId == 4) {
                //4是骑车人
                let icon = new BMap.Icon('/static/images/biycar.png', new BMap.Size(48, 32), {
                    anchor: new BMap.Size(15, 15)
                })
                this.hideLoadLuShu(icon, datas, 2, mapData)
            } else if (mapData[0].typeId == 2) {
                //2是车
                let icon = new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), {
                    anchor: new BMap.Size(15, 15)
                })
                this.hideLoadLuShu(icon, datas, 3, mapData)
            }
        },
        // 隐藏路书执行方法
        hideLoadLuShu(icon, arrPois, type, mapData) {
            //type的值 ： 1是人，2是骑车人，3是车， 5是专门针对以车搜车的
            let enableRotation = false
            if (type == 1) {
                enableRotation = false
            } else if (type == 2 || type == 3 || type == 5) {
                enableRotation = true
            }
            let speed = this.computedDistance(arrPois)
            let blueCar = new BMapLib.LuShu(this.hideMap, arrPois, {
                defaultContent: "", //"从浔阳路到滨江路"
                autoView: enableRotation, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon: icon,
                speed: speed,
                landmarkPois: [],
                enableRotation: enableRotation //是否设置marker随着道路的走向进行旋转
            });
            blueCar.start(() => {
                console.log(3333);
                this.handleGenerator(mapData);
            });
        },
        //  补零
        pasZero(str) {
            return new RegExp(/^\d$/g).test(str) ? `0${str}` : str
        },

        // 转换
        formatTime(_seconds) {
            _seconds = parseInt(_seconds)
            let mins, seconds;
            let result = '';
            seconds = parseInt(_seconds % 60)
            mins = parseInt(_seconds / 60)

            result = "时差:" + `${this.pasZero(mins)}分${this.pasZero(seconds)}秒`
            return result
        },

        // 时间数据格式处理
        dataHandle(arr) {
            let result = []
            let temp = {}
            for (let item of arr) {
                if (!temp[item.timeFlag]) {
                    temp[item.timeFlag] = []
                    result.push(temp[item.timeFlag])
                }
                temp[item.timeFlag].push(item)
            }
            return result
        },
        // 轨迹编辑
        editPolylineHandler(text) {
            if (text == '轨迹编辑') {
                this.$nextTick(() => {
                    document.getElementsByClassName('BMap_vectex')[0].parentNode.style.zIndex = 999
                })
                this.polylineObj.enableEditing()
                this.defaultText = '轨迹重置'
                let pointlist = JSON.parse(JSON.stringify(this.trajectoryArr)) // 不改变原始数据
                for (let i = 0; i < pointlist.length; i++) { // 过滤相同点位相邻数据
                    if (i >= pointlist.length - 1) {
                        break
                    } else {
                        if (pointlist[i].deviceId == pointlist[i + 1].deviceId) {
                            pointlist.splice(i, 1)
                            i--
                        }
                    }
                }
                console.log(pointlist);
                this.polylineObj.addEventListener('mouseout', (e) => {
                    this.allspot = this.polylineObj.getPath()
                    //通过移动点位获取所有当前点位的经纬度（包括标注点以及拖动点）
                    //然后通过标注点以及信息点来比较当前拖拽的点位和轨迹点位向比较
                    let indexarr = [] //当前点位存储的信息
                    for (let j = 0; j < this.allspot.length; j++) {
                        for (let i = 0; i < pointlist.length; i++) {
                            if ((pointlist[i].longitude == this.allspot[j].lng) && (pointlist[i].latitude == this.allspot[j].lat)) {
                                indexarr.push(j)
                            }
                        }
                    }
                    indexarr = _.uniq(indexarr)
                    let arrlist = []
                    for (let i = 0; i < indexarr.length; i++) {
                        if (i + 1 <= indexarr.length) {
                            arrlist.push(this.allspot.slice(indexarr[i], indexarr[i + 1]))
                        }
                    }

                    for (let i = 0; i < pointlist.length; i++) {
                        if (arrlist[i].length >= 2) {
                            for (let j = 0; j < arrlist[i].length; j++) {
                                if (pointlist[i].longitude != arrlist[i][j].lng &&
                                    pointlist[i].latitude != arrlist[i][j].lat) {
                                    arrlist[i][j].deviceId = pointlist[i].markId
                                    // arrlist[i][j].deviceId = this.trajectoryArr[i].deviceId
                                    // arrlist[i][j].markId = this.trajectoryArr[i].markId
                                    arrlist[i][j].videoStartTime = '1970-02-02 00:00:00'
                                    arrlist[i][j].offset = 0
                                    arrlist[i][j].relativeTime = 0
                                    arrlist[i][j].longitude = arrlist[i][j].lng
                                    arrlist[i][j].latitude = arrlist[i][j].lat
                                    arrlist[i][j].suspicionUuid = this.suspicionUuids
                                    arrlist[i][j].indexFlag = j
                                }
                            }

                        }
                    }

                    //   for (let i = 0; i < this.trajectoryArr.length; i++) {
                    //     for (let j = 0; j < arrlist.length; j++) {
                    //       if ((this.trajectoryArr[i].longitude == arrlist[j][0].lng) && (this.trajectoryArr[i].latitude == arrlist[j][0].lat)) {
                    //         arrlist[j][0] = Object.assign(arrlist[j][0], this.trajectoryArr[i])
                    //         for (let k = 0; k < arrlist[j].length; k++) {
                    //           arrlist[j][k].deviceId = this.trajectoryArr[i].deviceId
                    //           arrlist[j][k].videoStartTime = '1970-02-02 00:00:00'
                    //           arrlist[j][k].offset = 0
                    //           arrlist[j][k].relativeTime = 0
                    //           arrlist[j][k].longitude = arrlist[j][k].lng
                    //           arrlist[j][k].latitude = arrlist[j][k].lat
                    //           arrlist[j][k].suspicionUuid = this.suspicionUuids
                    //           arrlist[j][k].indexFlag = k
                    //         }
                    //       }
                    //     }
                    //   }
                    // 合并数组
                    let concatList = [].concat.apply([], arrlist)
                    this.dragPoints = []
                    // 获取拖动点位数据
                    for (let i = 0; i < concatList.length; i++) {
                        if (concatList[i].deviceId != undefined) {
                            this.dragPoints.push(concatList[i])
                        }
                    }
                })
            } else {
                this.dragPoints = []
                this.changeSuspicionObj(this.suspicionUuids)
                this.polylineObj.disableEditing()
                this.defaultText = '轨迹编辑'
            }
        },

        //保存轨迹编辑
        savePolylineHandler() {
            console.log('执行4');
            if (this.dragPoints.length == 0) {
                this.$notify({
                    type: "warning",
                    message: "请拖拽出轨迹点后再进行保存！",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            this.defaultText = '轨迹编辑'
            let data = {
                dragPoints: JSON.stringify(this.dragPoints),
            }
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/suspicion/mark/trajectory/save', data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: "success",
                        message: "保存成功！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    // this.exportFlag = 0
                    this.polylineObj.disableEditing()
                    this.changeSuspicionObj(this.suspicionUuids)
                    // this.exportToData(this.suspicionList)
                } else {
                    this.$notify({
                        type: "warning",
                        message: "保存失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    this.polylineObj.disableEditing()
                }
            })
        },
        /**
         * @description:
         * @param {type} 获取当前经纬度之间的距离，计算当前路数需要跑完的速度
         * @return: 5秒跑完，计算速度
         */
        computedDistance(arr) {
            let distance = 0
            for (let i = 0; i < arr.length - 1; i++) {
                distance += (this.map.getDistance(arr[i], arr[i + 1]));
            }
            return Math.ceil(distance / 5)
        },
        //画折线图
        brokenline(arrPois, type) {
            let flag = false
            let bound = this.map.getBounds()
            //判断当前点位是否在可视范围之内
            for (let i = 0; i < arrPois.length; i++) {
                if(bound.containsPoint(arrPois[i])){
                    flag = true
                }
            }
            //箭头图标
            if(!flag){
                this.map.centerAndZoom(new BMap.Point(arrPois[0].lng, arrPois[0].lat), sessionStorage.getItem('bmapLevel'))
            }
            if (arrPois.length < 2) {
                // this.$notify({
                //   type: "warning",
                //   message: "暂无轨迹！",
                //   position: "bottom-right",
                //   duration: 3000
                // });
                return
            }
            let sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                scale: 0.6,
                strokeColor: '#fff',
                strokeWeight: '2',
            });
            let icons = new BMap.IconSequence(sy, '1%', '5%');
            let polyline = new BMap.Polyline(arrPois, {
                // enableEditing: true, //是否启用线编辑，默认为false
                enableClicking: true, //是否响应点击事件，默认为true
                strokeColor: '#48affe',
                strokeWeight: 6,
                strokeOpacity: 0.99,
                icons: [icons] //折线内的图标样式
            });
            this.map.addOverlay(polyline);
            if(!flag){
                this.map.setViewport(arrPois);
            }
            //
            let marker = new BMap.Marker(arrPois[0]); //起点marker
            let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34), {
                offset: new BMap.Size(5, 5),
                imageOffset: new BMap.Size(5, 10),
            }); //地点图标
            marker.setIcon(iconc);
            marker.setTop(true);
            this.map.addOverlay(marker); //将标记添加到地图中
            marker = new BMap.Marker(arrPois[arrPois.length - 1]); //终点marker
            iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34), {
                offset: new BMap.Size(5, 5),
                imageOffset: new BMap.Size(5, 10),
            }); //终点icon
            marker.setIcon(iconc);
            marker.setTop(true);
            this.map.addOverlay(marker); //将标记添加到地图中

            if (type == 1) {
                let icon = new BMap.Icon('/static/images/Mario1.png', new BMap.Size(52, 55), {
                    anchor: new BMap.Size(15, 15)
                })
                this.loadLuShu(icon, arrPois, type)
            } else if (type == 2) {
                let icon = new BMap.Icon('/static/images/biycar.png', new BMap.Size(48, 32), {
                    anchor: new BMap.Size(15, 15)
                })
                this.loadLuShu(icon, arrPois, type)
            } else if (type == 3 || type == 5) {
                let icon = new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), {
                    anchor: new BMap.Size(15, 15)
                })
                this.loadLuShu(icon, arrPois, type)
            }
        },


        // 路书执行方法
        loadLuShu(icon, arrPois, type) {
            //type的值 ： 1是人，2是骑车人，3是车， 5是专门针对以车搜车的   4是为人脸预备的
            let enableRotation = false
            if (type == 1) {
                enableRotation = false
            } else if (type == 2 || type == 3 || type == 5) {
                enableRotation = true
            }
            let speed = this.computedDistance(arrPois)
            let blueCar = new BMapLib.LuShu(this.map, arrPois, {
                defaultContent: "", //"从浔阳路到滨江路"
                autoView: enableRotation, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon: icon,
                speed: speed,
                landmarkPois: [],
                // landmarkPois: [{lng:arrPois[1].lng, lat: arrPois[1].lat, html: '到了哪一站', pauseTime: 1}],
                enableRotation: enableRotation, //是否设置marker随着道路的走向进行旋转
            });
            blueCar.start();
        },

        // 计算地图缩放级别
        getZoom(maxLng, minLng, maxLat, minLat, map) {
            let zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000'] //地图级别18-3
            // 最大最小的坐标点
            let pointA = new BMap.Point(maxLng, maxLat)
            let pointB = new BMap.Point(minLng, minLat)
            // 获取两点间的距离，保留小数点后两位
            let distance = map.getDistance(pointA, pointB).toFixed(1)
            for (let i = 0; i < zoom.length; i++) {
                if (zoom[i] - distance > 0) {
                    //判断用户是不是第一次导出
                    return 18 - i + 3;

                }
            }
        },

        // 根据坐标数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别
        setZoom(points, map) {
            if (points.length > 0) {
                let maxLng = points[0].longitude
                let minLng = points[0].longitude
                let maxLat = points[0].latitude
                let minLat = points[0].latitude
                let res;
                for (let i = points.length - 1; i >= 0; i--) {
                    res = points[i]
                    if (res.longitude > maxLng) maxLng = res.longitude
                    if (res.longitude < minLng) minLng = res.longitude
                    if (res.latitude > maxLat) maxLat = res.latitude
                    if (res.latitude < minLat) minLat = res.latitude

                }
                let cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
                let cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
                let zoom = this.getZoom(maxLng, minLng, maxLat, minLat, map)
                map.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom)
                // this.hideMap.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom)
            }
        },

        // 路书经过点
        landmark(lng, lat, html, time) {
            this.lng = lng
            this.lat = lat
            this.html = html
            this.time = time
        },

        // 根据点位坐标数组，分割成num段
        getPoins(prvePoint, newPoint, num) {
            var lat;
            var lng;
            var points = [];
            if (prvePoint.lng > newPoint.lng && prvePoint.lat > newPoint.lat) {
                lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
                lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
                points[0] = prvePoint;
                for (var i = 1; i < num - 1; i++) {
                    points[i] = new BMap.Point(prvePoint.lng - lng * (i + 1), prvePoint.lat - lat * (i + 1));
                }
            }
            if (prvePoint.lng > newPoint.lng && prvePoint.lat < newPoint.lat) {
                lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
                lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
                points[0] = prvePoint;
                for (var i = 1; i < num - 1; i++) {
                    points[i] = new BMap.Point(prvePoint.lng - lng * (i + 1), prvePoint.lat + lat * (i + 1));
                }
            }
            if (prvePoint.lng < newPoint.lng && prvePoint.lat > newPoint.lat) {
                lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
                lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
                points[0] = prvePoint;
                for (var i = 1; i < num - 1; i++) {
                    points[i] = new BMap.Point(prvePoint.lng + lng * (i + 1), prvePoint.lat - lat * (i + 1));
                }
            }
            if (prvePoint.lng < newPoint.lng && prvePoint.lat < newPoint.lat) {
                lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
                lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
                points[0] = prvePoint;
                for (var i = 1; i < num - 1; i++) {
                    points[i] = new BMap.Point(prvePoint.lng + lng * (i + 1), prvePoint.lat + lat * (i + 1));
                }
            }

            return points;
        },

        // 控制自定义图标移动，达到和路书一样的效果
        move(allPoints, mkrBus) {
            let paths = allPoints.length; //获得有几个点
            let time = 300;
            this.map.addOverlay(mkrBus);

            let i = 0;
            let _this = this

            function resetMkPoint(i) {
                // 设置坐标点
                mkrBus.setPosition(allPoints[i]);
                if (i < paths) {
                    setTimeout(function () {
                        i++;
                        resetMkPoint(i);
                    }, time);
                } else {
                    _this.move(allPoints, mkrBus)
                }
            }
            setTimeout(function () {
                resetMkPoint(0);
            }, time)
        }
    }

};
export default mixins
