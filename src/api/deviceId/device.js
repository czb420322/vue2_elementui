/*
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:19
 * @LastEditTime : 2021-03-05 15:31:01
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\api\common\scale.js
 * @
 */

let videoIco = require("@/assets/images/device/video.png");
let carIco = require("@/assets/images/device/car.png");
let faceIco = require("@/assets/images/device/face.png");
let RFIDIco = require("@/assets/images/device/RFID.png");
const mixins = {
    data: function () {
        return {
            textInfo: '',
            //验证
            dnerr: false,
            dperr: false,
            dplngerr: false,
            dplaterr: false,
            dpusererr: false,
            dppaserr: false,
            dpIderr: false,
            dpmoerr: false,
            dchange: false,
            mtname: false,
            mtnum: false,
            carnerr: false,
            carmoerr: false,
            carape: false,
            carwayerr: false,
            carlneerr: false,
            carmaxerr: false,
            showfacility: '收起设备',

            addshebei: this.$storage.getSession("642") != null, // 新增设备的按钮权限
            updateshebeibtn: this.$storage.getSession("643") != null, // 修改设备的按钮权限
            addkakou: this.$storage.getSession("645") != null, // 新增设备的按钮权限
            updatekakoubtn: this.$storage.getSession("647") != null, // 新增设备的按钮权限
            searchkakou: this.$storage.getSession("646") != null, // 新增设备的按钮权限

            outerVisible: false,
            addVisible: false,
            updateVisible: false,
            cartableData: [], // 车辆信息
            updatevideo: false, // 修改视频的模态框
            MountDetails: {}, // 设备的详细信息
            initTab: "video", // 左侧菜单切换的name值 与 index值对应
            index: 1, // 左侧菜单切换的索引
            flag: true, // 设备的收起和显示
            videoList: [], // 视频
            mountList: [], // 车辆
            faceList: [], // 人像
            societyData: [], // 社会面
            defaultProps: {
                children: "apes",
                label: "name"
            },
            defaultProps_1: {
                children: "apeTollgates",
                label: "name"
            },
            filterDeviceText: "", // 输入关键字
            styleOptions: {
                // 画框的颜色
                strokeColor: "red", // 边线颜色。
                fillColor: "red", // 填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3, // 边线的宽度，以像素为单位。
                strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
                fillOpacity: 0.6, // 填充的透明度，取值范围0 - 1。
                strokeStyle: "solid" // 边线的样式，solid或dashed。
            },
            markerId: "", // 编辑标注时所需要的id
            markerPoint: null, // 右键编辑标注时的标注位置
            markerClusterer: null, // 点位聚合的对象
            point: {},
            righttext: "新增设备",
            rightkakou: "新增卡口",
            addVideoData: false,
            deviceName: "",
            deviceModel: "",
            password: "",
            deviceIP: "",
            devicePort: "",
            deviceRtsp: "",
            deviceApe: "",
            userId: "",
            addMountData: false,
            mountName: "",
            mountNum: "",
            mountstatus: "1",
            updateMountData: false,
            kakouId: "",
            // selectdist: sessionStorage.getItem('defaultRegion'), //  区域ID

            carkakouID: "",
            carName: "",
            carmodel: "",
            carlng: "",
            carlat: "",
            carDirection: "1",
            monitorDirection: "1",
            laneName: "",
            isOnline: "1",
            laneDesc: "",
            maxSpeed: "",
            cityPass: "1",
            monitors: [],
            chedaoId: "",
            shebeiId: "",
            maplng: 0, //地图的经度
            maplat: 0, //地图的纬度
            mapzoom: 0, //地图的级别
            pageIndex: "", //是否是车综  案件库
            showlist: [],
            nowIndex: null
        }
    },
    methods: {
        filterNode(value, data) {
            // console.log(1111);
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        //重置地图
        getinit() {
            this.maplng = sessionStorage.getItem("longitude");
            this.maplat = sessionStorage.getItem("latitude");
            this.mapzoom = sessionStorage.getItem("bmapLevel");
            this._initMap();
            if (this.pageIndex == 1 || this.pageIndex == 3) {
                if (this.index == 0) {
                    this.createmagnanMarker(this.videoList)
                    // this.createMarkerAll(this.videoList, videoIco);
                } else if (this.index == 3) {
                    this.createMount(this.mountList);
                } else if (this.index == 1) {
                    this.createMarkerAll(this.societyData, RFIDIco);
                } else if (this.index == 2) {
                    this.createMarkerAll(this.faceList, faceIco);
                }
            } else {
                this.index == 0
                this.createMount(this.mountList);
            }

        },
        getinits() {
            this._initMap();
            if (this.pageIndex == 1 || this.pageIndex == 3) {
                if (this.index == 0) {
                    this.createmagnanMarker(this.videoList)
                    // this.createMarkerAll(this.videoList, videoIco);
                } else if (this.index == 3) {
                    this.createMount(this.mountList);
                } else if (this.index == 1) {
                    this.createMarkerAll(this.societyData, RFIDIco);
                } else if (this.index == 2) {
                    this.createMarkerAll(this.faceList, faceIco);
                }
            } else {
                this.index == 0
                this.createMount(this.mountList);
            }

        },
        // change(msg) {
        //   this.selectdist = msg;
        //   if (!this.selectdist == "") {
        //     this.dchange = false;
        //   }
        // },
        changename() {
            this.dnerr = this.deviceName == "" ? true : false;
        },
        changeport() {
            if (this.devicePort !== "" && this.devicePort !== null) {
                let dessg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
                if (!dessg.test(this.devicePort)) {
                    this.dperr = true;
                } else {
                    this.dperr = false;
                }
            } else {
                this.dperr = false;
            }
        },
        changelng() {
            // this.dplngerr = this.point.lng == "" ? true : false;
            let lngreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
            if (!lngreg.test(this.lng)) {
                this.dplngerr = true;
                setTimeout(()=>{
                    this.dplngerr = false;
                },2000)
              }

        },
        changelat() {
            // this.dplaterr = this.point.lat == "" ? true : false;
            var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
            if(!latreg.test(this.lat)){
                this.dplaterr = true
                setTimeout(()=>{
                    this.dplaterr = false;
                },2000)
            }
        },
        changeip() {
            if (this.deviceIP !== "" && this.deviceIP !== null) {
                // let devixxr = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/;
                let devixxr = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
                if (!devixxr.test(this.deviceIP)) {
                    this.dpIderr = true;
                } else {
                    this.dpIderr = false;
                }
            } else {
                this.dpIderr = false;
            }
        },
        changemodel() {
            this.dpmoerr = this.deviceModel == '' ? true : false
        },
        changertsp() {},

        changekname() {
            this.mtname = this.mountName == "" ? true : false;
        },
        changeknum() {
            this.mtnum = this.mountNum == "" ? true : false;
        },

        changecarname() {
            this.carnerr = this.carName == "" ? true : false;
        },
        changecarmodel() {
            this.carmoerr = this.carmodel == "" ? true : false;
        },
        // changeape() {
        //   this.carape = this.deviceApe == "" ? true : false;
        // },

        changecarway() {
            this.carwayerr = this.laneName == "" ? true : false;
        },
        changecarline() {
            this.carlneerr = this.laneDesc == "" ? true : false;
        },
        changecarmax() {
            this.carmaxerr = this.maxSpeed == "" ? true : false;
        },
        addFacility() {
            this.updatevideo = false;
            this.addVideoData = false;
            this.dnerr = false;
            this.dperr = false;
            this.dplngerr = false;
            this.dplaterr = false;
            this.dpIderr = false;
            this.dpmoerr = false;
            this.dchange = false;
            this.deviceApe = ''
            // this.$refs.province.getSelectData();
        },
        // 1 . 创建地图对象 加载地图
        _initMap() {
            let map = new BMap.Map("allmap", {
                enableMapClick: false
            });
            this.$store.dispatch("mapInit", map); //设置地图对象到vuex
            map.centerAndZoom(new BMap.Point(this.maplng, this.maplat), this.mapzoom);
            map.enableScrollWheelZoom(); //设置滚轮
            map.disableContinuousZoom(); //禁止连续缩放
            map.addControl(
                new BMap.ScaleControl({
                    // 地图比例尺控件
                    offset: new BMap.Size(10, 50)
                })
            );
            // map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP]}));y
            map.addControl(
                new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_RIGHT,
                    offset: new BMap.Size(10, 50)
                })
            );
            //地图的缩略图
            // this.map.addControl(
            //   new BMap.OverviewMapControl({
            //     isOpen: true,
            //     anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            //     size: new BMap.Size(250, 180)
            //   })
            // );
            // 给当前地点添加经纬度
            map.addEventListener("mousemove", e => {
                this.point = e.point;
            });
        },



        // 3。 创建坐标之前先清空地图上的所有坐标
        removeMarker() {
            this.map.clearOverlays();
        },
        // 4. 点击左侧菜单触发的时间 让坐标动起来
        handleNodeClick(data, index) {
            this.nowIndex = index
            if (data.longitude == undefined && data.latitude == undefined) {
                this.getinit();
            } else {
                this.mapzoom = 16;
                this.maplng = data.longitude;
                this.maplat = data.latitude;
                this.getinits();
                let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
                var point = new BMap.Point(data.longitude, data.latitude);
                let opts = {
                    width: 200, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                    title: "视频设备详情" // 信息窗口标题
                };
                //信息内容
                let content = `<span title="${data.name}">设备名称：${data.name}</span><br>
                    设备经度：${data.longitude}<br>
                    设备纬度：${data.latitude}`;
                let info_Window = new BMap.InfoWindow(content, opts);
                this.map.openInfoWindow(info_Window, point);

                for (let i = 0; i < allOverlay.length; i++) {
                    if (data.shebeiId == allOverlay[i].id) {
                        allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
                        setTimeout(function () {
                            allOverlay[i].setAnimation(null);
                        }, 1000);
                    }
                }
            }
        },
        // 5 右击地图添加设备信息  新增设备
        onRightsMapFun(map) {
            let menu = new BMap.ContextMenu();
            let txtMenuItem = [{
                text: '新增设备',
                callback: e => {
                    this.addVideoData = true;
                    this.point = e;
                    this.deviceName = this.deviceModel = this.deviceIP = this.userId = "";
                    this.devicePort = this.password = "";
                    this.deviceRtsp = ''
                    this.$nextTick(() => {
                        this.$refs.province.selected = sessionStorage.getItem('defaultRegion').substring(0, 2) + '0000'
                        this.$refs.province.selectcity = sessionStorage.getItem('defaultRegion').substring(0, 4) + '00'
                        this.$refs.province.selectdist = sessionStorage.getItem('defaultRegion')
                        this.$refs.province.getSelectData();
                    })
                    let point = new BMap.Point(e["lng"], e["lat"]);
                    let marker = new BMap.Marker(point);
                }
            }];
            for (let i = 0; i < txtMenuItem.length; i++) {
                menu.addItem(
                    new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {
                        width: 100,
                        id: "dom_" + i
                    })
                );
            }
            if (this.addshebei == true) {
                map.addContextMenu(menu);

            }
        },
        // 6 给标注点添加右击事件
        onRightMarkerFun(marker) {
            let markerMenu = new BMap.ContextMenu();
            let txtMenuItem = [{
                    text: "编辑视频设备",
                    callback: (e, ee, marker) => {
                        // console.log(marker);
                        this.updatevideo = true;
                        let id = (this.markerId = marker.id); //获取标注id
                        this.markerPoint = e;
                        this.deviceApe = marker.data.apeId
                        this.deviceName = marker.data.name; // 名称
                        this.deviceModel = marker.data.model; // 型号
                        this.deviceIP = marker.data.ipAddr; // IP地址
                        this.devicePort = marker.data.port; // 端口号
                        this.userId = marker.data.userId;
                        this.password = marker.data.password;
                        this.point.lng = marker.data.longitude; // 经度
                        this.point.lat = marker.data.latitude; // 纬度
                        this.deviceRtsp = marker.data.rtspUrl // reps
                        // this.selectdist = marker.data.placeCode;
                        // console.log(marker.data.placeCode,10000);
                        this.$nextTick(() => {
                            this.$refs.province.selected = marker.data.placeCode.substring(0, 2) + '0000'
                            this.$refs.province.selectcity = marker.data.placeCode.substring(0, 4) + '00'
                            this.$refs.province.selectdist = marker.data.placeCode

                        })
                    }
                },
                {
                    text: "移动视频设备",
                    callback: (e, ee, marker) => {
                        marker.enableDragging();
                        marker.addEventListener("dragend", e => {
                            // console.log(marker.data.port,"端口");
                            // console.log(marker.data.rtspUrl,"拖动的时候的RTSP");
                            this.deviceName = marker.data.name; // 名称
                            this.deviceModel = marker.data.model; // 型号
                            this.deviceIP = marker.data.ipAddr; // IP地址
                            this.deviceApe = marker.data.apeId
                            this.devicePort = marker.data.port; // 端口号
                            this.userId = marker.data.userId;
                            this.password = marker.data.password;
                            this.point.lng = marker.data.longitude; // 经度
                            this.point.lat = marker.data.latitude; // 纬度
                            // this.selectdist = marker.data.placeCode;
                            this.deviceRtsp = marker.data.rtspUrl; //rtsp地址
                            this.updates(marker, e);
                            // console.log("拖到的地点的经纬度：" + x + "，" + y);
                        });
                    }
                },
                {
                    text: "删除视频设备",
                    callback: (e, ee, marker) => {
                        let id = marker.id;
                        this.$myconfirm({
                            type: "提示",
                            msg: "此操作将永久删除视频设备, 是否继续?",
                            icon: 2,
                            btn: {
                                ok: "确定",
                                no: "取消"
                            }
                        }).then(() => {
                            this.filterDeviceText = ''
                            this.deleteMarker(id);
                        });
                    }
                }
            ];
            for (let i = 0; i < txtMenuItem.length; i++) {
                markerMenu.addItem(
                    new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback)
                );
            }
            if (this.updateshebeibtn == true) {
                marker.addContextMenu(markerMenu);
            }
        },
        // 验证信息
        verify() {
            let device = true;
            // 设备名称
            if (this.deviceName == "") {
                this.dnerr = true;
                device = false;
            }
            // console.log(555);
            // if(this.deviceApe == '' || this.deviceApe == null){
            //   this.carape = true;
            //   device = false;
            // }
            // console.log(666);
            // 端口
            if (this.devicePort !== "" && this.devicePort !== null) {
                let devreg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
                if (!devreg.test(this.devicePort)) {
                    this.dperr = true;
                    device = false;
                }
            }
            // console.log(777);
            // // 经度
            // if(this.point.lng == ''){
            //   this.dplngerr = true;
            //   device = false;
            // }
            // // 纬度
            // if(this.point.lat == ''){
            //   this.dplaterr = true;
            //   device = false;
            // }
            // IP地址
            if (this.deviceIP !== "" && this.deviceIP !== null) {
                // let xxreg = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/;
                let xxreg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
                if (!xxreg.test(this.deviceIP)) {
                    this.dpIderr = true;
                    device = false;
                }
            }
            // console.log(888);
            // 设备型号
            // if(!this.deviceModel == ''){
            //   this.dpmoerr = true;
            //   device = false;
            // }
            // 详细位置
            // if (this.selectdist == "") {
            //   this.dchange = true;
            //   device = false;
            // } else {
            //   this.dchange = false;
            // }
            // console.log(999);
            return device;
        },
        // 7 新增设备
        addEquiment() {
            if (!this.verify()) {
                return false;
            }
            if (
                this.deviceName == "" ||
                this.point.lng == "" ||
                this.point.lat == ""
            ) {
                return;
            }

            let isSociety = 0;
            let type = 0;
            if (this.index == 0) {
                type = 0;
            } else if (this.index == 3) {} else if (this.index == 1) {
                isSociety = 1;
            } else if (this.index == 2) {
                type = 1;
            }
            // console.log(444);
            let data = {
                name: this.deviceName, // 名称
                model: this.deviceModel, // 型号
                ipAddr: this.deviceIP, // IP地址
                port: this.devicePort, // 端口号
                rtspUrl: this.deviceRtsp, //rtsp地址
                apeId: this.deviceApe, //设备编号
                userId: this.userId,
                password: this.password,
                longitude: this.point.lng, // 经度
                latitude: this.point.lat, // 纬度
                placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
                apeType: type, // 设备类型 0.视频 ,1.人像
                isSociety: isSociety // 是否社会类0.否,1是
            };
            data = this.$qs.stringify(data);
            this.$http.post("/sms/ape/add", data).then(res => {
                if (res.data.code == 200) {
                    this.addVideoData = false;
                    // 更新videoList
                    if (this.index == 0) {
                        // 视频类型
                        this.$notify({
                            type: "success",
                            message: "添加成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.queryVideoData();
                    } else if (this.index == 1) {
                        this.$notify({
                            type: "success",
                            message: "添加成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.querySocietyData();

                    } else if (this.index == 2) {
                        this.$notify({
                            type: "success",
                            message: "添加成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.queryFaceData();
                    }
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: "warning",
                        message: "有相同名称的点位存在！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.addVideoData = false;
                    this.$notify({
                        type: "error",
                        message: "添加失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        // 8 删除设备
        deleteMarker(id) {
            this.$http.post("/sms/ape/delete/" + id).then(res => {
                if (this.index == 0) {
                    // 视频
                    this.queryVideoData();
                } else if (this.index == 1) {
                    // 人脸
                    this.querySocietyData();
                } else if (this.index == 2) {
                    //社会面
                    this.queryFaceData();
                }
                if (res.data.code == 200) {
                    this.$notify({
                        type: "success",
                        message: "删除成功",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: "error",
                        message: "删除失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        // 9 修改设备
        updateshebei() {
            if (!this.verify()) {
                return false;
            }
            if (
                this.deviceName == "" ||
                this.point.lng == "" ||
                this.point.lat == ""
            ) {
                return;
            }
            let isSociety = 0;
            let type = 0;
            if (this.index == 0) {
                type = 0;
            } else if (this.index == 3) {} else if (this.index == 1) {
                isSociety = 1;
            } else if (this.index == 2) {
                type = 1;
            }
            this.updatevideo = false;
            let data = {
                name: this.deviceName, // 名称
                model: this.deviceModel, // 型号
                ipAddr: this.deviceIP, // IP地址
                port: this.devicePort, // 端口号
                longitude: this.point.lng, // 经度
                latitude: this.point.lat, // 纬度
                placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
                rtspUrl: this.deviceRtsp, //rtsp地址
                apeId: this.deviceApe, //设备编号
                userId: this.userId,
                password: this.password,
                apeType: type, // 设备类型 0.视频 ,1.人像
                isSociety: isSociety // 是否社会类0.否,1是
            };
            data = this.$qs.stringify(data);
            let url = "/sms/ape/update/" + this.markerId;
            this.$http.post(url, data).then(res => {
                if (res.data.code == 200) {
                    this.filterDeviceText = ''
                    // 更新videoList
                    if (this.index == 0) {
                        // 视频类型
                        this.$notify({
                            type: "success",
                            message: "修改成功！",
                            position: "bottom-right",
                            duration: 3000
                        });

                        this.queryVideoData();
                    } else if (this.index == 1) {
                        this.$notify({
                            type: "success",
                            message: "修改成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.querySocietyData();
                    } else if (this.index == 2) {
                        this.$notify({
                            type: "success",
                            message: "修改成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.queryFaceData();
                    }
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: "warning",
                        message: "有相同名称的点位存在!",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.updatevideo = false;
                    this.$notify({
                        type: "error",
                        message: "修改失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        // 移动的时候修改地图
        updates(marker, e) {
            // console.log(marker,10000);
            marker.disableDragging();
            let x = e.point.lng;
            let y = e.point.lat;
            let isSociety = 0;
            let type = 0;
            if (this.index == 0) {
                type = 0;
            } else if (this.index == 3) {} else if (this.index == 1) {
                type = 1;
                isSociety = 1;
            } else if (this.index == 2) {
                type = 1;
            }
            // this.$refs.province.selectdist,
            let data = {
                name: this.deviceName, // 名称
                model: this.deviceModel, // 型号
                ipAddr: this.deviceIP, // IP地址
                port: this.devicePort, // 端口号
                longitude: x, // 经度
                latitude: y, // 纬度
                apeId: this.deviceApe,
                placeCode: marker.data.placeCode, // 安装地点行政区划代码
                userId: this.userId,
                rtspUrl: this.deviceRtsp, //rtsp
                password: this.password,
                apeType: type, // 设备类型 0.视频 ,1.人像
                isSociety: isSociety // 是否社会类0.否,1是
            };
            // console.log(data,"kkkkkkkkkkkkkkkkkkkkk");
            data = this.$qs.stringify(data);
            let url = "/sms/ape/update/" + marker.id;
            this.$http.post(url, data).then(res => {
                if (res.data.code == 200) {
                    // console.log(data,22222);
                    // 更新videoList
                    if (this.index == 0) {
                        // 视频类型
                        this.$notify({
                            type: "success",
                            message: "移动成功",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.filterDeviceText = ''
                        this.queryVideoData();
                    } else if (this.index == 1) {
                        this.$notify({
                            type: "success",
                            message: "移动成功",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.filterDeviceText = ''
                        this.querySocietyData();
                    } else if (this.index == 2) {
                        this.$notify({
                            type: "success",
                            message: "移动成功",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.filterDeviceText = ''
                        this.queryFaceData();
                    }
                } else {
                    this.$notify({
                        type: "error",
                        message: "移动失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        // 2 创建坐标点

        addAllMarkerClick(marker, point) {
            let opts = {
                width: 200, // 信息窗口宽度
                height: 100, // 信息窗口高度
                title: "卡口信息" // 信息窗口标题
            };
            let _this = this;
            marker.addEventListener("click", function () {
                _this.queryMountDetails(marker.data.kakouId);
                _this.querycarMout(marker.data.kakouId);
            });

            marker.addEventListener("click", function () {
                let content = `<div>
                                <p>卡口名称：${marker.data.name}</p>
                                <p>卡口地区：${marker.data.place}</p>
                                <p id='details'>详情</p>
                                </div>`;
                let infoWindow = new BMap.InfoWindow(content, opts);
                _this.map.openInfoWindow(infoWindow, point); //开启信息窗口
                var details = document.getElementById("details");
                if (_this.searchkakou == false) {
                    details.style.display = "none";
                }
                _this.$nextTick(() => {
                    details.onclick = function () {
                        _this.outerVisible = true;
                        _this.$nextTick(function () {
                            if (_this.$refs["outerTable"]) {
                                _this.$refs["outerTable"].doLayout();
                            }
                        });
                    };
                });
            });
        },
        // 3右击注册新增设备信息
        onRightMount(map) {
            let menu = new BMap.ContextMenu();
            let txtMenuItem = [{
                text: this.rightkakou,
                callback: e => {
                    this.addMountData = true;
                    this.point = e;
                    this.mountName = this.mountNum = "";
                    let point = new BMap.Point(e["lng"], e["lat"]);
                    let myIcon = new BMap.Icon(videoIco, new BMap.Size(33, 36), {});
                    let marker = new BMap.Marker(point);
                }
            }];
            for (let i = 0; i < txtMenuItem.length; i++) {
                menu.addItem(
                    new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {
                        width: 200,
                        id: "dom_" + i
                    })
                );
            }
            if (this.addkakou == true) {
                map.addContextMenu(menu);
            }
        },
        // 4右击标注点注册增删改查
        onRightMountFun(marker) {
            let markerMenu = new BMap.ContextMenu();
            let txtMenuItem = [{
                    text: "编辑设备信息",
                    callback: (e, ee, marker) => {
                        let id = (this.kakouId = marker.id); //获取标注id
                        this.markerPoint = e;
                        this.updateMountData = true;
                        this.mountName = marker.data.name; // 名称
                        this.mountNum = marker.data.laneNum; // 型号
                        this.mountstatus = marker.data.status; // IP地址
                        this.point.lng = marker.data.longitude; // 经度
                        this.point.lat = marker.data.latitude; // 纬度
                        this.$nextTick(() => {
                            this.$refs.province.selected = marker.data.placeCode.substring(0, 2) + '0000'
                            this.$refs.province.selectcity = marker.data.placeCode.substring(0, 4) + '00'
                            this.$refs.province.selectdist = marker.data.placeCode
                        })
                        // this.selectdist = marker.data.placeCode; //地点
                    }
                },
                {
                    text: "移动设备信息",
                    callback: (e, ee, marker) => {
                        marker.enableDragging();
                        marker.addEventListener("dragend", e => {
                            this.mountName = marker.data.name; // 名称
                            this.mountNum = marker.data.laneNum; // 型号
                            this.mountstatus = marker.data.status; // IP地址
                            this.point.lng = marker.data.longitude; // 经度
                            this.point.lat = marker.data.latitude; // 纬度
                            // this.selectdist = marker.data.placeCode;
                            this.updatekakou(marker, e);
                        });
                    }
                },
                {
                    text: "删除设备设备",
                    callback: (e, ee, marker) => {
                        if (this.cartableData.length > 0) {
                            this.$notify({
                                type: 'warning',
                                message: '删除失败，有车辆信息',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        } else {
                            this.deletemount(marker.data.kakouId);
                        }
                    }
                }
            ];
            for (let i = 0; i < txtMenuItem.length; i++) {
                markerMenu.addItem(
                    new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback)
                );
            }
            if (this.updatekakoubtn == true) {
                marker.addContextMenu(markerMenu);
            }
        },
        // 5点击设备ID进行跳跃
        handleNodesClick(data) {
            if (data.longitude == undefined && data.latitude == undefined) {
                this.getinit();
            } else {
                this.maplng = data.longitude;
                this.maplat = data.latitude;
                this.mapzoom = 18;
                this.getinits();
                let _this = this;
                let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
                for (let i = 0; i < allOverlay.length; i++) {
                    if (data.kakouId == allOverlay[i].data.kakouId) {
                        // 给点击的当前点设置一个跳跃的点
                        allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
                        //1s后停止跳跃
                        setTimeout(function () {
                            allOverlay[i].setAnimation(null);
                        }, 1000);
                    }
                }
                this.queryMountDetails(data.kakouId);
                this.querycarMout(data.kakouId);
                var point = new BMap.Point(data.longitude, data.latitude);
                let opts = {
                    width: 200, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                    title: "卡口信息" // 信息窗口标题
                };
                let content = `<div>
                                <p>卡口名称：${data.name}</p>
                                <p>卡口地区：${data.place}</p>
                                <p id='details'>详情</p>
                                </div>`;
                let info_Window = new BMap.InfoWindow(content, opts);
                this.map.openInfoWindow(info_Window, point);

                setTimeout(() => {
                    var details = document.getElementById("details");
                    if (_this.searchkakou == false) {
                        details.style.display = "none";
                    }
                    details.onclick = function () {
                        _this.outerVisible = true;

                        _this.$nextTick(function () {
                            if (_this.$refs["outerTable"]) {
                                _this.$refs["outerTable"].doLayout();
                            }
                        });
                    };
                }, 200);
            }
        },
        // 6添加设备
        addmount() {
            if (this.mountName == "") {
                this.mtname = true;
                return;
            }
            // if (this.selectdist == "") {
            //   this.dchange = true;
            //   return;
            // } else {
            //   this.dchange = false;
            // }
            if (
                this.mountName == "" ||
                this.point.lng == "" ||
                this.point.lat == ""
            ) {
                return;
            }
            this.addMountData = false;
            // console.log(this.selectdist)
            let data = {
                name: this.mountName, // 设备名称
                longitude: this.point.lng, // 经度
                latitude: this.point.lat, // 纬度
                placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
                status: this.mountstatus, // 设备状态;1.正常;2.停用;9.其他
                laneNum: this.mountNum // 车道数
            };
            data = this.$qs.stringify(data);
            this.$http.post("/sms/apeTollgate/insert", data).then(res => {
                if (res.data.code == 200) {
                    // layer.alert('添加成功！',{icon:6,title:"消息提示"});
                    this.$notify({
                        type: 'success',
                        message: '添加成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    // this.$myconfirm({
                    //   type: "提示",
                    //   msg: "添加成功！",
                    //   icon: 3,
                    //   btn: {
                    //     ok: "yes",
                    //     no: "no"
                    //   }
                    // });
                    this.queryMoutDevice();
                } else {
                    this.$notify({
                        type: 'error',
                        message: '添加失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 7修改设备信息
        updatemount() {
            if (this.mountName == "") {
                this.mtname = true;
                return;
            }
            // if (this.selectdist == "") {
            //   this.dchange = true;
            //   return;
            // } else {
            //   this.dchange = false;
            // }
            if (
                this.mountName == "" ||
                this.point.lng == "" ||
                this.point.lat == ""
            ) {
                return;
            }
            this.updateMountData = false;
            let data = {
                name: this.mountName, // 设备名称
                name: this.mountName, // 设备名称
                longitude: this.point.lng, // 经度
                latitude: this.point.lat, // 纬度
                placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
                status: this.mountstatus, // 设备状态;1.正常;2.停用;9.其他
                laneNum: this.mountNum // 车道数
            };
            data = this.$qs.stringify(data);
            let url = "/sms/apeTollgate/update/" + this.kakouId;
            this.$http.post(url, data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '修改成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.queryMoutDevice();
                } else {
                    this.$notify({
                        type: 'error',
                        message: '修改失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        updatekakou(marker, e) {
            marker.disableDragging();
            let x = e.point.lng;
            let y = e.point.lat;
            let data = {
                name: this.mountName, // 设备名称
                longitude: x, // 经度
                latitude: y, // 纬度
                placeCode: marker.data.placeCode, // 安装地点行政区划代码
                status: this.mountstatus, // 设备状态;1.正常;2.停用;9.其他
                laneNum: this.mountNum // 车道数
            };
            data = this.$qs.stringify(data);
            let url = "/sms/apeTollgate/update/" + marker.id;
            this.$http.post(url, data).then(res => {
                if (res.data.code == 200) {
                    this.queryMoutDevice();
                }
            });
        },
        //删除卡扣
        deletemount(id) {
            this.$http.post("sms/apeTollgate/delete/" + id).then(res => {
                if (res.data.code == 200) {
                    this.queryMoutDevice();
                    this.$notify({
                        type: 'success',
                        message: '删除成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'error',
                        message: '删除失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },

        // 8设备的收起和显示

        changemleft(e) {
            this.flag = !this.flag;

            this._initMap();
            this.filterDeviceText = ''
            this.textInfo = ''
            // this.querySocietyData();
            // this._initMap(); //重新加载地图
            if (this.flag == true) {
                // this.mapzoom = sessionStorage.getItem("bmapLevel");
                e.target.textContent = "收起设备";
                if (this.pageIndex == 1 || this.pageIndex == 3) {
                    if (this.index == 0) {
                        setTimeout(() => {
                            this.queryVideoData();
                        }, 100)
                    } else if (this.index == 3) {
                        this.queryMoutDevice();
                    } else if (this.index == 1) {
                        setTimeout(() => {
                            this.querySocietyData();
                        }, 100)
                        // this.createMarkerAll(this.societyData, RFIDIco);

                    } else if (this.index == 2) {
                        setTimeout(() => {
                            this.queryFaceData();;
                        }, 100)
                        this._initMap();
                        // this.createMarkerAll(this.faceList, faceIco);
                    }
                } else {
                    this.queryMoutDevice();
                }
            } else {
                if (this.pageIndex == 1 || this.pageIndex == 3) {
                    if (this.index == 0) {
                        setTimeout(() => {
                            this.queryVideoData();
                        }, 100)
                    } else if (this.index == 3) {
                        this.queryMoutDevice();
                    } else if (this.index == 1) {
                        setTimeout(() => {
                            this.querySocietyData();
                        }, 100)
                        // this.createMarkerAll(this.societyData, RFIDIco);
                    } else if (this.index == 2) {
                        setTimeout(() => {
                            this.queryFaceData();;
                        }, 100)
                        // this.createMarkerAll(this.faceList, faceIco);
                    }
                } else {
                    this._initMap();
                    this.queryMoutDevice();
                }
                e.target.textContent = "显示设备";
            }

            //  this.createMount(this.mountList);
        },
        selectVideoData() {
            let data = {
                apeName: this.textInfo
            }
            data = this.$qs.stringify(data)

            this.$http.post("/sms/ape/selectByVideo", data).then(res => {
                if (res.data.code == 200) {
                    this.loading.close()
                    this.videoList = this.getOffline(res.data.data)
                    this.showlist = [];
                    let obj = {}
                    for (let i = 0; i < this.videoList.length; i++) {
                        obj = {
                            state: true
                        }
                        this.showlist.push(obj)
                    }
                    // console.log(this.showlist.length,"返回的数据长度")
                } else {
                    this.loading.close()
                    this.$notify({
                        type: 'error',
                        message: '获取视频列表失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 获取视频的信息
        queryVideoData() {
            this.loading = this.$loading({
                target: '.filter-tree',
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在加载.."
            });
            this.$http.post("/sms/ape/selectByVideo").then(res => {
                if (res.data.code == 200) {
                    this.loading.close()
                    this.videoList = this.getOffline(res.data.data)
                    this.showlist = [];
                    let obj = {}
                    for (let i = 0; i < this.videoList.length; i++) {
                        obj = {
                            state: true
                        }
                        this.showlist.push(obj)
                    }
                    this.createmagnanMarker(this.videoList)
                } else {
                    this.loading.close()
                    this.$notify({
                        type: 'error',
                        message: '获取视频列表失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 设备信息
        queryMoutDevice() {
            this.$http.post("/sms/apeTollgate/search").then(res => {
                if (res.data.code == 200) {
                    // console.log(888888);
                    this.mountList = res.data.data;
                    this.createMount(this.mountList); //加载标注
                } else {
                    this.$notify({
                        type: 'error',
                        message: '获取设备列表失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 设备的详细信息
        queryMountDetails(id) {
            this.$http.get("/sms/apeTollgate/findById/" + id).then(res => {
                if (res.data.code == 200) {
                    this.MountDetails = res.data.data;
                } else {
                    this.$notify({
                        type: 'error',
                        message: '获取设备详情失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 设备下面的车辆信息
        querycarMout(id) {
            this.$http.get("/sms/apeTollgate/selectApeByKakouId/" + id).then(res => {
                if (res.data.code == 200) {
                    this.cartableData = res.data.data;
                } else {
                    this.$notify({
                        type: 'error',
                        message: '获取车辆信息失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        getHDirectionType() {
            this.$http.get("/sms/static/getHDirectionType").then(res => {
                if (res.data.code == 200) {
                    this.monitors = res.data.data;
                }
            });
        },
        // 添加车辆
        getaddcar() {
            this.addVisible = true;
            this.getHDirectionType();
            this.carkakouID = this.MountDetails.kakouId;
            this.carlng = this.MountDetails.longitude;
            this.carlat = this.MountDetails.latitude;
        },
        addcar() {
            // if(this.carName =='' || this.carmodel=='' || this.laneName =='' || this.laneDesc == '' || this.maxSpeed ==''){
            //   return
            // }
            this.addVisible = false;
            let data = {
                kakouId: this.carkakouID,
                name: this.carName,
                model: this.carmodel,
                apeId: this.deviceApe,
                longitude: this.carlng,
                latitude: this.carlat,
                capDirection: this.carDirection,
                monitorDirection: this.monitorDirection,
                laneName: this.laneName,
                isOnline: this.isOnline,
                apeType: 2,
                laneDesc: this.laneDesc,
                maxSpeed: this.maxSpeed,
                cityPass: this.cityPass
            };
            data = this.$qs.stringify(data);
            this.$http
                .post("/sms/apeTollgate/insetApeLoneBykaKou", data)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$notify({
                            type: 'success',
                            message: '添加成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        // layer.alert("添加成功！", { icon: 6, title: "消息提示" });
                        this.querycarMout(this.carkakouID);
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '添加失败！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                });
            this.carName = this.carmodel = this.carlng = this.carlat = this.laneName = this.laneDesc = this.maxSpeed =
                "";
        },
        // 修改设备
        getupdatacar(index, row) {
            this.updateVisible = true;
            this.getHDirectionType();
            this.carkakouID = row.kakouId;
            this.carName = row.name;
            this.carmodel = row.model;
            (this.deviceApe = row.deviceApe), (this.carlng = row.longitude);
            this.carlat = row.latitude;
            this.carDirection = row.capDirection;
            this.monitorDirection = row.monitorDirection;
            this.laneName = row.laneName;
            this.isOnline = row.isOnline;
            this.laneDesc = row.laneDesc;
            this.maxSpeed = row.maxSpeed;
            this.cityPass = row.cityPass;
            this.shebeiId = row.shebeiId;
            this.chedaoId = row.chedaoId;
        },
        updateclear() {
            this.updateVisible = false;
            this.carName = this.carmodel = this.carlng = this.carlat = this.laneName = this.laneDesc = this.maxSpeed =
                "";
        },
        updatecar() {
            // if(this.carName =='' || this.carmodel=='' || this.laneName =='' || this.laneDesc == '' || this.maxSpeed ==''){
            //   return
            // }
            this.updateVisible = false;
            let data = {
                shebeiId: this.shebeiId,
                chedaoId: this.chedaoId,
                apeId: this.deviceApe,
                name: this.carName,
                model: this.carmodel,
                longitude: this.carlng,
                latitude: this.carlat,
                capDirection: this.carDirection,
                monitorDirection: this.monitorDirection,
                laneName: this.laneName,
                isOnline: this.isOnline,
                apeType: 2,
                laneDesc: this.laneDesc,
                maxSpeed: this.maxSpeed,
                cityPass: this.cityPass
            };
            data = this.$qs.stringify(data);
            this.$http.post("/sms/apeTollgate/updateApeLane", data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '修改成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    // this.querycarMout(this.carkakouID);
                } else {
                    this.$notify({
                        type: 'error',
                        message: '修改失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
            this.carName = this.carmodel = this.carlng = this.carlat = this.laneName = this.laneDesc = this.maxSpeed =
                "";
        },
        // 删除设备
        getdeletecar(index, row) {
            this.carkakouID = row.kakouId;
            this.$myconfirm({
                type: "提示",
                msg: "此操作将永久删除该文件, 是否继续?",
                icon: 2,
                btn: {
                    ok: "确定",
                    no: "取消"
                }
            }).then(() => {
                this.deletecar(row.chedaoId);

            });
        },
        deletecar(id) {
            this.$http.post("/sms/apeTollgate/deleteApeLane/" + id).then(res => {
                if (res.data.code == 200) {
                    this.querycarMout(this.carkakouID);
                    this.$notify({
                        type: 'success',
                        message: '删除成功',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'error',
                        message: '删除失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 人像
        queryFaceData() {
            this.$http.post("/sms/ape/selectByPortrait").then(res => {
                if (res.data.code == 200) {
                    this.faceList = res.data.data;
                    // 页面加载的时候加载坐标点
                    this.createMarkerAll(this.faceList, faceIco);
                } else {
                    this.$notify({
                        type: 'error',
                        message: '获取人像失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 社会面
        querySocietyData() {
            this.$http.post("/sms/ape/selectBySociety").then(res => {
                if (res.data.code == 200) {
                    this.societyData = res.data.data;
                    // 页面加载的时候加载坐标点
                    this.createMarkerAll(this.societyData, RFIDIco);
                } else {
                    this.$notify({
                        type: 'error',
                        message: '获取社会面失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        // 切换tab栏重新加载地图
        handleClick(tab, event) {
            this.maplng = sessionStorage.getItem("longitude");
            this.maplat = sessionStorage.getItem("latitude");
            this.mapzoom = sessionStorage.getItem("bmapLevel");
            this.filterDeviceText = "";
            if (this.pageIndex == 1 || this.pageIndex == 3) {
                this.index = tab.index;
                this.$store.dispatch("changeDeviceType", tab["index"]); //设置地图对象到vueX 中
                if (tab.index == 0) {
                    this.queryVideoData();
                    this._initMap(); //重新加载地图
                } else if (tab.index == 3) {
                    this.queryMoutDevice();
                    this._initMap();
                } else if (tab.index == 1) {
                    this.querySocietyData();
                    this._initMap(); //重新加载地图
                } else if (tab.index == 2) {
                    this.queryFaceData();
                    this._initMap(); //重新加载地图
                }
            } else {
                this.index = tab.index;
                // console.log(this.index,555);
                this.queryMoutDevice();
                this._initMap();
            }
        }

    }
};
export default mixins
