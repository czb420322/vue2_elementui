/*
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:19
 * @LastEditTime : 2021-05-07 09:47:37
 * @LastEditors  : Please set LastEditors
 * @Description:东西湖项目专属的轨迹
 * @FilePath: \vacp-wfes\src\api\casestudy\zkySearchImg.js
 * @
 */
const mixins = {
    data() {
        return {
            suschangeradio: 1,
            suslist: [], // 嫌疑目标的轨迹list
            blueCar: '',
            showtrack: false,
            openPolyNavigation: false, //是否开启轨迹导航
            tracklistarr: [],
            trackarr: [],
            opentrackpoly: false, //是否打开轨迹导航

        };
    },
    methods: {
        // <el-radio :label="1">轨迹分析</el-radio>
        // <el-radio :label="2">空间分析</el-radio>
        // <el-radio :label="3">频次分析</el-radio>
        // <el-radio :label="4">时间分析</el-radio>
        //切换按钮的时候
        changeTrack(item) {
            this.opentrackpoly = false
            this.clearOverlay()
            this.showtrack = false
            this.openPolyNavigation = false
            this.trajectoryArr = []
            for (let i = 0; i < this.suslist.length; i++) {
                if (this.suslist[i].markId != undefined) {
                    this.trajectoryArr.push(this.suslist[i])
                }
            }
            if (item == 1) {
                this.getTrackList() // 碰撞手机轨迹绑定的数据
                this.showTrajectory(this.suslist);
            } else {
                this.defaultText = '轨迹编辑'
                for (let i = 0; i < this.trajectoryArr.length; i++) {
                    let getLongitude = this.trajectoryArr[i].longitude; // 获取经度
                    let getLatitude = this.trajectoryArr[i].latitude; // 获取纬度
                    this.zuobiao2Pixels(getLongitude, getLatitude, i);
                }
            }
        },
        //切换功能的时候更换坐标清空之前的轨迹
        clearOverlay() {
            let list = this.map.getOverlays()
            for (let i = 0; i < list.length; i++) {
                if (list[i].list == undefined && list[i].listType == undefined) {
                    this.map.removeOverlay(list[i])
                }
            }
        },
        //在切换嫌疑目标之前获取所有的其他按钮的值的状态
        getsusstatus() {
            let timelist = []
            timelist = this.SuspicionObjLists.sort((a, b) =>
                (new Date(b.absoluteTime).getTime() == '' ?
                    (new Date(b.videoStartTime).getTime() + Number(b.relativeTime) + Number(b.offset) * 1000) :
                    (new Date(b.absoluteTime).getTime() + Number(b.offset) * 1000)) <
                (new Date(a.absoluteTime).getTime() == '' ?
                    (new Date(a.videoStartTime).getTime() + Number(a.relativeTime) + Number(a.offset) * 1000) :
                    (new Date(a.absoluteTime).getTime() + Number(a.offset) * 1000)) ? 1 : -1);
            //给轨迹列表添加变量值
            for (let i = 0; i < this.trajectoryArr.length; i++) {
                this.trajectoryArr[i].num = ''
                this.trajectoryArr[i].count = 0
                this.trajectoryArr[i].time = ''
                this.trajectoryArr[i].mintime = ''
                this.trajectoryArr[i].maxtime = ''
            }
            //动态添加数据到轨迹数组中去
            for (let i = 0; i < this.SuspicionObjLists.length; i++) {
                for (let j = 0; j < this.trajectoryArr.length; j++) {
                    if (this.SuspicionObjLists[i].deviceId == this.trajectoryArr[j].deviceId) {
                        this.trajectoryArr[j].num += (i + 1) + '、'
                        this.trajectoryArr[j].count += 1
                    }
                }
            }
            //把当前时间搓加入到轨迹的list中去
            for (let i = 0; i < timelist.length; i++) {
                for (let j = 0; j < this.trajectoryArr.length; j++) {
                    if (timelist[i].deviceId == this.trajectoryArr[j].deviceId) {
                        if (timelist[i].absoluteTime) {
                            this.trajectoryArr[j].time += new Date(timelist[i].absoluteTime).getTime() + Number(timelist[i].offset * 1000) + ','
                        } else {
                            this.trajectoryArr[j].time += new Date(timelist[i].videoStartTime).getTime() + Number(timelist[i].relativeTime) + Number(timelist[i].offset * 1000) + ','
                        }
                    }
                }
            }
            //把数据添加到最大值和最小值中去
            for (let i = 0; i < this.trajectoryArr.length; i++) {
                let maxminList = this.trajectoryArr[i].time.split(',')
                if (maxminList.length == 2) {
                    this.trajectoryArr[i].mintime = maxminList[0]
                    this.trajectoryArr[i].maxtime = ''
                } else {
                    this.trajectoryArr[i].mintime = maxminList[0]
                    this.trajectoryArr[i].maxtime = maxminList[maxminList.length - 2]
                }
            }
        },
        //开始轨迹导航
        trackpolyNavigation() {
            //得到后台的数据后，处理成前端所需要的数据
            //先得到非拖拽点的数据
            //然后两两组合成新的轨迹数组
            if (this.showtrack) {
                return
            }
            this.tracklistarr = []
            this.trackarr = []
            this.trajectoryArr = []
            for (let i = 0; i < this.suslist.length; i++) {
                if (this.suslist[i].markId != undefined) {
                    this.trajectoryArr.push(this.suslist[i])
                }
            }
            this.tracklistarr = this.trajectoryArr
            for (let i = 0; i < this.trajectoryArr.length - 1; i++) {
                this.trackarr.push([this.trajectoryArr[i], this.trajectoryArr[i + 1]])
            }
            for (let i = 0; i < this.suslist.length; i++) {
                for (let j = 0; j < this.trackarr.length; j++) {
                    if (this.suslist[i].deviceId == this.trackarr[j][0].markId) {
                        this.trackarr[j].splice(this.trackarr[j].length - 1, 0, this.suslist[i])
                    }
                }
            }
            console.log(this.tracklistarr, 4545444);
            console.log(this.trackarr, 1115555);
            if (this.tracklistarr.length) {
                if (this.tracklistarr[0].videoUrl != null) {
                    this.openPolyNavigation = true;
                    this.trajectoryArr = [];
                    this.clearOverlay();
                    this.PolyNavigation(0)
                    this.opentrackpoly = true
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '转标注视频正在下载，无法进行视频导航！',
                        duration: '3000',
                        position: 'bottom-right',
                    })
                    return
                }
            } else {
                this.$notify({
                    type: 'warning',
                    message: '未关联标注，无法视频导航！',
                    duration: '3000',
                    position: 'bottom-right',
                })
                return
            }
        },
        //轨迹导航
        PolyNavigation(i) {
            this.showtrack = true
            this.$nextTick(() => {
                let url = this.getUrl(this.tracklistarr[i].videoUrl)
                this.flv_load_mds('tarckVideo', url)
                this.map.panTo(new BMap.Point(this.tracklistarr[i].longitude, this.tracklistarr[i].latitude))
                setTimeout(() => {
                    for (let i = 0; i < this.trajectoryArr.length; i++) {
                        let getLongitude = this.trajectoryArr[i].longitude; // 获取经度
                        let getLatitude = this.trajectoryArr[i].latitude; // 获取纬度
                        this.zuobiao2Pixels(getLongitude, getLatitude, i);
                    }
                }, 500)


                document.getElementById('tarckVideo').addEventListener('ended', () => {
                    // 播放完成之后完毕播放器
                    console.log('是否触发');
                    if (i >= this.trackarr.length) {
                        this.showtrack = false
                        this.opentrackpoly = false
                        // 保留最后一个路书marker
                        let list = this.map.getOverlays()
                        let marker = ''
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].lushuMain) {
                                marker = list[i].lushuMain._marker
                            }
                        }
                        this.clearOverlay()
                        this.map.addOverlay(marker)
                        this.showcccc(this.suslist)
                        return
                    }
                    let list = this.map.getOverlays()
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].lushuMain) {
                            //清除路书的标注marker
                            this.map.removeOverlay(list[i].lushuMain._marker)
                        }
                    }
                    this.gettrack(i, true)
                }, false)
            })
        },
        gettrack(i, flag) {
            if (flag) {
                this.showtrack = false
                this.showPolyNavigation(this.trackarr[i], i)
            }
        },
        showcccc(mapData) {
            let datas = [];
            let num;
            for (let i = 0; i < mapData.length; i++) {
                num = new BMap.Point(Number(mapData[i].longitude), Number(mapData[i].latitude));
                datas.push(num);
                this.landmarksPoints.push(new this.landmark(mapData[i].longitude, mapData[i].latitude, mapData[i].videoStartTime, 0.1))
            }
            for (let i = 0; i < datas.length - 1; i++) {
                if (datas[i].lng == datas[i + 1].lng && datas[i].lat == datas[i + 1].lat) {
                    datas[i].lng = datas[i].lng + Math.random() / 10000
                    datas[i].lat = datas[i].lat + Math.random() / 10000
                }
            }
            this.map.centerAndZoom(new BMap.Point(datas[0].lng, datas[0].lat), sessionStorage.getItem('bmapLevel'))
            let icons = new BMap.IconSequence(
                new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                    scale: 0.6, //图标缩放大小
                    strokeWeight: "2", //图标宽度
                    strokeColor: "white" //图标颜色
                }), '1%', '5%', false
            )
            // 轨迹显示
            this.polylineObj = new BMap.Polyline(datas, {
                enableClicking: true, //是否响应点击事件，默认为true
                strokeColor: '#48affe',
                icons: [icons],
                strokeWeight: 10,
                strokeOpacity: 0.99,
            });
            this.map.addOverlay(this.polylineObj);
            this.map.setViewport(datas);
        },


        //展示轨迹列表
        //创建目标轨迹
        showPolyNavigation(mapData, index) {
            let arr = []
            this.trajectoryArr = this.trajectoryArr.concat(mapData)
            for (let i = 0; i < this.trajectoryArr.length; i++) {
                if (this.trajectoryArr[i].markId != undefined) {
                    arr.push(this.trajectoryArr[i])
                }
            }
            this.trajectoryArr = arr
            let datas = [];
            let num;
            for (let i = 0; i < mapData.length; i++) {
                num = new BMap.Point(Number(mapData[i].longitude), Number(mapData[i].latitude));
                datas.push(num);
                this.landmarksPoints.push(new this.landmark(mapData[i].longitude, mapData[i].latitude, mapData[i].videoStartTime, 0.1))
            }
            for (let i = 0; i < datas.length - 1; i++) {
                if (datas[i].lng == datas[i + 1].lng && datas[i].lat == datas[i + 1].lat) {
                    datas[i].lng = datas[i].lng + Math.random() / 10000
                    datas[i].lat = datas[i].lat + Math.random() / 10000
                }
            }
            // if(datas[0].lng == datas[1].lng && datas[0].lat == datas[1].lat){
            //     if(this.openPolyNavigation){
            //         this.PolyNavigation(index + 1);
            //         return
            //     }
            // }
            this.map.centerAndZoom(new BMap.Point(datas[0].lng, datas[0].lat), sessionStorage.getItem('bmapLevel'))
            // let marker = new BMap.Marker(datas[0]); //起点marker
            // let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 35), {
            //     offset: new BMap.Size(5, 5),
            //     imageOffset: new BMap.Size(5, 10),
            // }); //地点图标
            // marker.setIcon(iconc);
            // marker.setTop(true);
            // this.map.addOverlay(marker); //将标记添加到地图中
            // marker = new BMap.Marker(datas[datas.length - 1]); //终点marker
            // iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(35, 30), {
            //     offset: new BMap.Size(0, 10),
            //     imageOffset: new BMap.Size(-5, 0),
            // }); //终点icon
            // marker.setIcon(iconc);
            // marker.setTop(true);
            // this.map.addOverlay(marker); //将标记添加到地图
            let icons = new BMap.IconSequence(
                new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                    scale: 0.6, //图标缩放大小
                    strokeWeight: "2", //图标宽度
                    strokeColor: "white" //图标颜色
                }), '1%', '5%', false
            )
            // 轨迹显示
            this.polylineObj = new BMap.Polyline(datas, {
                enableClicking: true, //是否响应点击事件，默认为true
                strokeColor: '#48affe',
                icons: [icons],
                strokeWeight: 10,
                strokeOpacity: 0.99,
            });
            this.map.addOverlay(this.polylineObj);
            this.map.setViewport(datas);
            // 路书渲染
            if (this.suspicionType == 1) {
                let icon = new BMap.Icon('/static/images/Mario1.png', new BMap.Size(52, 55), {
                    anchor: new BMap.Size(15, 30)
                })
                this.trackloadLuShu(icon, datas, this.suspicionType, index)
            } else if (this.suspicionType == 2) {
                let icon = new BMap.Icon('/static/images/biycar.png', new BMap.Size(48, 32), {
                    anchor: new BMap.Size(15, 15)
                })
                this.trackloadLuShu(icon, datas, this.suspicionType, index)
            } else {
                let icon = new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), {
                    anchor: new BMap.Size(15, 15)
                })
                this.trackloadLuShu(icon, datas, this.suspicionType, index)
            }

            let _this = this
            setTimeout(() => {
                if (this.trajectoryArr.length > 0) {
                    for (let i = 0; i < this.trajectoryArr.length; i++) {
                        let getLongitude = this.trajectoryArr[i].longitude // 获取经度
                        let getLatitude = this.trajectoryArr[i].latitude // 获取纬度
                        this.zuobiao2Pixels(getLongitude, getLatitude, i, this)
                    }
                }
            }, 500)
            // let _this = this
            this.map.addEventListener("zoomstart", function (evt) {
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
            this.map.addEventListener("dragging", function (evt) {
                _this.loadTrajectory(_this.trajectoryArr, _this)

            })
            //拖拽地图结束
            this.map.addEventListener("dragend", function (evt) {
                _this.loadTrajectory(_this.trajectoryArr, _this)
            })
        },
        //路数方法
        // 路书执行方法
        trackloadLuShu(icon, arrPois, type, index) {
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
                enableRotation: enableRotation, //是否设置marker随着道路的走向进行旋转
            });
            blueCar.start(() => {
                if (this.openPolyNavigation) {
                    this.PolyNavigation(index + 1);
                }
            });
        },

    }
}
export default mixins
