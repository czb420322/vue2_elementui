/*
 * @Author: 李志远
 * @Date: 2019-12-17 11:55:21
 * @LastEditTime : 2020-12-09 17:00:51
 * @LastEditors  : Please set LastEditors
 * @Description: 描述
 * @FilePath: \vacp-wfes\src\api\realvideo\map.js
 * @写bug苦逼，一直写bug一直苦逼
 */
//地图操作
let videoIco = require('@/assets/images/device/video.png')
let carIco = require('@/assets/images/device/car.png')
let RFIDIco = require('@/assets/images/device/RFID.png')
let cased = require('@/assets/images/device/duang.png')
let linshi = require('@/assets/images/device/temporary.png')
let info = require('@/assets/images/device/info.png')
let light = require('@/assets/images/device/pick.png')
let kakouIco = require('@/assets/images/device/kakou.png')

import {
    mapState,
    mapActions,
    mapMutations
} from 'vuex'
import {
    CLIENT_RENEG_LIMIT
} from 'tls';
const mixins = {
    data: function () {
        return {
            point: {},
            hideMap: null,
            imeiDialogMap: null,
            hideMarkerCluster: null
        }
    },
    computed: {
        ...mapState([
            'map',
        ])
    },
    created() {
        // this.queryFaceData();
    },
    methods: {
        //存储点位信息
        ...mapMutations([
            'setdeviceInfo'
        ]),
        //创建地图api
        InitSmallMainMap: function (id) {
            let map = new BMap.Map(id, {
                enableMapClick: false,
            })
            this.smallMap = map
            // this.$store.dispatch('mapInit', map) //设置地图对象到vuex
            if (this.dataCaseInfo.longitude == null || this.dataCaseInfo.longitude == '') {
                map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
            } else {
                map.centerAndZoom(new BMap.Point(this.dataCaseInfo.longitude, this.dataCaseInfo.latitude), sessionStorage.getItem('bmapLevel'))
            }
            map.enableScrollWheelZoom() //设置滚轮
            map.disableContinuousZoom(); //禁用连续放大、
            map.disableDoubleClickZoom();
            map.disableInertialDragging(); //禁止了惯性拖拽
            map.addControl(new BMap.ScaleControl({ // 地图比例尺控件
                offset: new BMap.Size(10, 50)
            }))
            map.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT
            }))
        },


        InitImeiMap: function (id) {
            let map = new BMap.Map(id, {
                enableMapClick: false
            })
            this.imeiDialogMap = map
            map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
            map.enableScrollWheelZoom() //设置滚轮
            map.disableContinuousZoom(); //禁用连续放大、
            map.disableDoubleClickZoom();
            map.disableInertialDragging(); //禁止了惯性拖拽
            map.addControl(new BMap.ScaleControl({ // 地图比例尺控件
                offset: new BMap.Size(10, 50)
            }))
            ////地图的层级图标
            map.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(10, 50)
            }))

        },

        //创建地图api
        InitMainMap: function (id) {
            let map = new BMap.Map(id, {
                enableMapClick: false,
                // mapType:type
            })
            this.$store.dispatch('mapInit', map) //设置地图对象到vuex
            map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
            map.enableScrollWheelZoom() //设置滚轮
            map.disableContinuousZoom(); //禁用连续放大、
            map.disableDoubleClickZoom();
            map.disableInertialDragging(); //禁止了惯性拖拽
            map.addControl(new BMap.ScaleControl({ // 地图比例尺控件
                offset: new BMap.Size(10, 50)
            }))
            ////地图的层级图标
            map.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(10, 50)
            }))
            //卫星图
            map.addControl(new BMap.MapTypeControl({
                mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]
            }));
            //地图的缩略图
            this.map.addControl(new BMap.OverviewMapControl({
                isOpen: true,
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                size: new BMap.Size(200, 150)
            }))
            // 给当前地点添加经纬度
            map.addEventListener('mousemove', (e) => {
                this.point = e.point
            })
            //如果当前地图是编辑页面
            if (this.$route.path == '/videoCombat/addcasetwo') {
                let datas
                clearInterval(datas)
                let count = 0
                datas = setInterval(() => {
                    if (this.dataCaseInfo.caseUuid && this.isloadTrue) {
                        if (!this.dataCaseInfo.longitude) {
                            this.onRightMapFun(map)
                        } else {
                            this.onRightMapFun1(map)
                        }
                        clearInterval(datas)
                    }
                    // else {
                    //   count++
                    //   if (count == 100) {
                    //     clearInterval(datas)
                    //   }
                    // }
                }, 200);


            }

        },

        //画圆
        ccccc() {
            var styleOptions = {
                strokeColor: "red", //边线颜色。
                fillColor: "rgba(255,0,0,.3)", //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3, //边线的宽度，以像素为单位。
                strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            }
            this.drawingManager = new BMapLib.DrawingManager(this.map, {
                isOpen: false, //是否开启绘制
                enableDrawingTool: false, // 是否显示工具栏
                drawingToolOptions: {
                    // anchor:'BMAP_DRAWING_CIRCLE'
                    anchor: 'BMAP_ANCHOR_TOP_RIGHT',
                    offset: new BMap.Size(5, 5)
                },
                circleOptions: styleOptions
            });
            this.drawingManager.open()
            this.drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);

            this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete)
            this.map.addEventListener('mousemove', () => {
                if (this.drawingManager._mask != null) {
                    this.drawingManager._mask.addEventListener('mousedown', this.showrCicle);
                    this.map.removeEventListener('mousemove', this.showrCicle)
                }
            })
            // this.map.addEventListener('mousedown',()=>{
            //   console.log('是否答应了这个');

            // })
        },
        move() {
            this.drawingManager.close()
        },
        overlaycomplete() {
            this.centerPoint = null
        },
        //圆心
        showrCicle(e) {
            // return
            if (this.centerPoint == null) {
                this.centerPoint = e.point
                this.drawingManager._mask.addEventListener('mousemove', this.showRadius)
                var mark = new BMap.Marker(e.point)
                this.map.addOverlay(mark)
            }
        },
        //半径
        showRadius(e) {
            var radius = this.drawingManager._map.getDistance(this.centerPoint, e.point)
            if (!isNaN(radius)) {
                this.map.removeOverlay(this.label)
                this.map.removeOverlay(this.polyline)
                var opts = {
                    position: e.point,
                    offset: new BMap.Size(5, 5)
                }
                this.label = new BMap.Label('半径' + (radius / 1000).toFixed(2) + '公里', opts)
                this.label.setStyle({
                    colro: '#438eff',
                    fontWeight: 'bold',
                    border: '0px silid #ccc',
                    backgroundColor: ''
                })
                // console.log(this.centerPoint, e.point);
                this.polyline = new BMap.Polyline([
                    this.centerPoint,
                    e.point
                ], {
                    strokeColor: 'red',
                    strokeWeight: 2,
                    strokeOpacity: .5
                })
                this.map.addOverlay(this.polyline)
                this.map.addOverlay(this.label)

            }
        },

        //创建地图api
        InitHideMainMap: function (id) {
            let map = new BMap.Map(id, {
                enableMapClick: false
            })
            this.hideMap = map
            map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
            map.enableScrollWheelZoom() //设置滚轮
            map.disableContinuousZoom(); //禁用连续放大、
            map.disableDoubleClickZoom();
            map.disableInertialDragging(); //禁止了惯性拖拽
            map.addControl(new BMap.ScaleControl({ // 地图比例尺控件
                offset: new BMap.Size(10, 50)
            }))
            ////地图的层级图标
            map.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(10, 50)
            }))
        },
        //创建device页面的点位
        createMarkerAll(data, img) {
            let markers = []
            let datas = []
            this.removeMarker() //先移除坐标
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i]['apes'].length; j++) {
                    // ((x) => {
                    var p0 = data[i]['apes'][j]['longitude']
                    var p1 = data[i]['apes'][j]['latitude']
                    var point = new BMap.Point(p0, p1)
                    var myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
                    var marker = new BMap.Marker(point, {
                        icon: myIcon
                    })
                    marker.id = data[i]['apes'][j]['shebeiId']
                    marker.data = data[i]['apes'][j]
                    markers.push(marker)
                    datas.push(point)
                    this.onRightMarkerFun(marker)
                    this.addallmarker(marker, point)
                    // this.map.addOverlay(marker)
                }
            };
            // 获取所有的点位
            // let allOverlay = this.map.getOverlays()
            //创建点位聚合的对象
            if (this.markerClusterer != null) {
                this.markerClusterer.clearMarkers()
                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers: markers
                }) //所有标注创建完以后建立点聚合
            } else {
                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers: markers
                })
            }
            this.map.setViewport(datas);
            this.onRightsMapFun(this.map) // 注册右击事件
        },
        createmagnanMarker(){
            this.$http.post('/sms/ape/selectByGbsApeTree').then(res=>{
                this.createmagnanMarkers(res.data.data)
            })
        },
        //创建device页面的海量点
        createmagnanMarkers(list) {
            var copydata = this.deepCopy(list)
            var bb = this.jsonToArray(copydata)
            this.map.clearOverlays();
            var points = []; // 添加海量点数据
            for (let i = 0; i < bb.length; i++) {
                if(bb[i].gbsType == 6){
                    var p0 = bb[i]['longitude']
                    var p1 = bb[i]['latitude']
                    let point_ = new BMap.Point(p0, p1)
                    point_.shebeiId = bb[i].shebeiId;
                    point_.name = bb[i].name;
                    points.push(point_);
                }
            }
            var options = {
                shape: BMAP_POINT_SHAPE_WATERDROP
            }
            // BMAP_POINT_SHAPE_STAR  星星
            // BMAP_POINT_SHAPE_SQUARE  方形
            // BMAP_POINT_SHAPE_RHOMBUS   菱形
            // BMAP_POINT_SHAPE_WATERDROP  水滴
            // BMAP_POINT_SHAPE_CIRCLE  圆形 默认
            var pointCollection = new BMap.PointCollection(points, options); // 初始化PointCollection
            pointCollection.addEventListener('click', function (e) {
                // _this.zuobiao2Pixel(e.point);
            });
            this.map.addOverlay(pointCollection); // 添加Overlay
        },
        jsonToArray(nodes) {
            var r=[];
            if (Array.isArray(nodes)) {
            for (var i=0, l=nodes.length; i<l; i++) {
                r.push(nodes[i]); // 取每项数据放入一个新数组
                if (Array.isArray(nodes[i]["children"])&&nodes[i]["children"].length>0)
                // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
                r = r.concat(this.jsonToArray(nodes[i]["children"]));
                    delete nodes[i]["children"]
            }
            }
            return r;
        },

        deepCopy(obj){
            var object;
            // 深度复制数组
            if(Object.prototype.toString.call(obj)=="[object Array]"){
                object=[];
                for(var i=0;i<obj.length;i++){
                object.push(this.deepCopy(obj[i]))
                }
                return object
            }
            // 深度复制对象
            if(Object.prototype.toString.call(obj)=="[object Object]"){
                object={};
                for(var p in obj){
                object[p]=obj[p]
                }
                return object
            }
		},
























        //定位位置
        // zuobiao2Pixel(point){
        //   var point = new BMap.Point(point.lng,point.lat);
        //   var pixel = this.map.pointToPixel(point);
        //   setTimeout(()=>{
        //     // this.showarrPoisArr = true
        //     // this.$nextTick(()=>{
        //     //   document.getElementById('strickPic').style.left = (pixel.x - 15) + 'px';
        //     //   document.getElementById('strickPic').style.top = (pixel.y - 155) + 'px';
        //     // })
        //   },500)

        // },



        //创建device页面的海量点
        createmagnanCase(list) {
            var points = []; // 添加海量点数据
            for (let i = 0; i < list.length; i++) {
                points.push(new BMap.Point(list[i]['longitude'], list[i]['latitude']));
            }
            var options = {
                shape: BMAP_POINT_SHAPE_WATERDROP
            }
            // BMAP_POINT_SHAPE_STAR  星星
            // BMAP_POINT_SHAPE_SQUARE  方形
            // BMAP_POINT_SHAPE_RHOMBUS   菱形
            // BMAP_POINT_SHAPE_WATERDROP  水滴
            // BMAP_POINT_SHAPE_CIRCLE  圆形 默认
            var pointCollection = new BMap.PointCollection(points, options); // 初始化PointCollection
            pointCollection.addEventListener('click', function (e) {


            });
            this.smallMap.addOverlay(pointCollection); // 添加Overlay

            for (var i = 0; i < list.length; i++) {
                var perPoint = points[i];
                var opts = {
                    position: perPoint,
                    offset: new BMap.Size(0, 0),
                }
                var label = new BMap.Label(list[i].cameraName, opts, {
                    offset: new BMap.Size(0, 0)
                });
                label.setStyle({
                    color: "rad",
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    fontSize: "12px",
                    height: "20px",
                    lineHeight: "20px",
                });
                this.smallMap.addOverlay(label);
            }

        },

        //创建信息窗口
        addallmarker(marker, point) {
            let opts = {
                width: 200, // 信息窗口宽度
                height: 100, // 信息窗口高度
                title: '视频设备详情' // 信息窗口标题
            }
            //信息内容
            let content = `设备名称：${marker.data.name}<br>
                  设备经度：${marker.data.longitude}<br>
                  设备纬度：${marker.data.latitude}`
            let info_Window = new BMap.InfoWindow(content, opts)
            //点击左键 弹出信息窗口信息
            marker.addEventListener('click', () => {
                this.map.openInfoWindow(info_Window, point)
            })
            marker.addEventListener('rightclick', () => {
                this.map.closeInfoWindow()
            })
        },
        //创建device页面的车辆的点位
        createMount(data) {
            let markers = []
            this.removeMarker() //先移除坐标
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i]['apeTollgates'].length; j++) {
                    (x => {
                        let p0 = data[i]['apeTollgates'][j]['longitude']
                        let p1 = data[i]['apeTollgates'][j]['latitude']
                        let point = new BMap.Point(p0, p1)
                        let myIcon = new BMap.Icon(carIco, new BMap.Size(33, 36), {});
                        let marker = new BMap.Marker(point, {
                            icon: myIcon
                        })
                        marker.id = data[i]['apeTollgates'][j]['kakouId']
                        marker.data = data[i]['apeTollgates'][j]
                        markers.push(marker)
                        // this.map.addOverlay(marker)
                        this.onRightMountFun(marker)
                        this.addAllMarkerClick(marker, point)
                    })(i)
                }
            }
            //创建点位聚合的对象
            if (this.markerClusterer != null) {
                this.markerClusterer.clearMarkers()
                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers: markers
                }) //所有标注创建完以后建立点聚合
            } else {
                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers: markers
                })
            }
            this.onRightMount(this.map)
        },


        //案件库标注
        foundLabel(list, isRightClick, flag) {
            // this.map.clearOverlays()
            let markers = []
            for (var i = 0; i < list.length; i++) {
                let img
                if (list[i].type == 1) {
                    img = videoIco
                }
                if (list[i].type == 4) {
                    img = RFIDIco
                }
                if (list[i].type == 5) {
                    img = linshi
                }
                if (list[i].type == 6) {
                    img = info
                }
                if (list[i].type == 8) {
                    img = kakouIco
                }
                if (list[i].type == 10) {
                    // light 为以图搜图点位的高亮红色图标
                    img = light
                }
                let p0 = list[i].longitude;
                let p1 = list[i].latitude;
                let point = new BMap.Point(p0, p1);
                let myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
                var label = new BMap.Label(list[i].cameraName, {
                    offset: new BMap.Size(10, 32)
                });
                let marker = new BMap.Marker(point, {
                    offset: new BMap.Size(6, -13),
                    icon: myIcon
                })
                this.map.addOverlay(marker)
                marker.setZIndex(900)
                // marker.setZIndex(-1)
                marker.setLabel(label);
                this.map.addOverlay(marker)
                marker.id = list[i].deviceUuid;
                marker.list = list[i]
                marker.markerIdx = i
                markers.push(marker)
                this.markersAll = markers
                if (isRightClick == 1 && flag !== 'see') {
                    let _this = this
                    marker.addEventListener('rightclick', function (e) {
                        _this.$store.state.mapLeftMenuFlag = false;
                    })
                    marker.addEventListener('click', function (e) {
                        _this.showimgrul = ''
                        if (_this.pTinfo.list != undefined) {
                            _this.pTinfo.disableDragging()
                        }
                        let rightMenu = document.getElementById('MapLeftMenu')
                        // 603  1612
                        rightMenu.style.left = (e.clientX + 10) + 'px'
                        if (marker.list.type == 8) {
                            if (e.clientY < 770) {
                                rightMenu.style.top = (e.clientY - 65) + 'px'
                                rightMenu.style['bottom'] = null
                            } else {
                                rightMenu.style['top'] = null
                                rightMenu.style.bottom = 0 + 'px'
                            }
                        } else {
                            if (e.clientY < 600) {
                                rightMenu.style.top = (e.clientY - 65) + 'px'
                                rightMenu.style['bottom'] = null
                            } else {
                                rightMenu.style['top'] = null
                                rightMenu.style.bottom = 0 + 'px'
                            }
                        }

                        _this.deviceUuid = e.target.id
                        _this.listType = e.target.list.type
                        _this.listName = e.target.list.cameraName
                        _this.listlng = e.target.list.longitude
                        _this.listlat = e.target.list.latitude
                        _this.offset = e.target.list.offset
                        _this.pTinfo = e.target
                        _this.showimgrul = ''
                        _this.setdeviceInfo(e.target.list)

                        // console.log(e.target.list,'点位标注对象');
                        //表示显示以图搜图页面的时候点击点位的时候要更新下方的不同点位下的数据
                        if ((_this.showSearchImg && _this.searchRunAllList.length) || (_this.showSearchCarImg && _this.searchRunAllList.length)) {

                            //通过当前ID找到对应的索引
                            let index = _.findIndex(_this.searchRunAllList, item => {
                                return item.deviceUuid == e.target.id;
                            });
                            //如果大于等于0表示找到了当前对应的索引对象，则赋值给编辑页下方展示的数组
                            // 否则则把数组置空
                            if(index >= 0){
                                _this.checkMarkList = _this.searchRunAllList[index].list
                                _this.skynetFlag = 1;
                                //修改的，开始是null
                                _this.spaceVideoArrowFlag = 2
                                document.getElementById("spacePic").scrollLeft = 0
                            }else{
                                _this.checkMarkList = []
                                _this.skynetFlag = 2;
                            }
                            // console.log(index);
                            // console.log(_this.searchRunAllList);

                            //   for (let i = 0; i < _this.slidePiclist.length; i++) {
                            //     if (e.target.id == _this.slidePiclist[i].deviceUuid) {
                            //       if(!_this.slidePiclist[i].isShow) {
                            //         _this.slidePiclist[i].list[0].flagIdx = false
                            //       }
                            //       let listArr = _this.slidePiclist[i].list
                            //       for (let n = 0; n < listArr.length; n++) {
                            //         // listArr[n].similarity = listArr[n].similarity * 100
                            //         if (listArr[n].similarity <= 1) {
                            //           listArr[n].similarity = listArr[n].similarity * 100
                            //         } else if (1 < listArr[n].similarity < 100) {
                            //           listArr[n].similarity = listArr[n].similarity
                            //         }
                            //       }
                            //       _this.slidePiclist[i].list = listArr
                            //       _this.slidePic = _this.slidePiclist[i]
                            //       _this.skynetFlag = 1;
                            //       //修改的，开始是null
                            //       _this.spaceVideoArrowFlag = 2
                            //       document.getElementById("spacePic").scrollLeft = 0
                            //       return
                            //     } else {
                            //       _this.slidePic = []
                            //       _this.skynetFlag = 2;
                            //     }
                            //   }
                        } else {
                            sessionStorage.setItem('deviceInfo', JSON.stringify(e.target.list))
                            _this.closeSearchImg()
                            _this.showSearchImg = false
                            _this.$store.state.isMarkerLable = true
                            _this.$store.state.mapLeftMenuFlag = true;
                            if (_this.listType == 6) {
                                _this.getImgquery(_this.deviceUuid)
                            } else {
                                _this.getAllImg(_this.deviceUuid)
                            }
                        }

                    })
                    this.map.addEventListener("zoomstart", function (evt) {
                        _this.$store.state.mapLeftMenuFlag = false;
                    })
                    this.map.addEventListener("dragstart", function (evt) {
                        _this.$store.state.mapLeftMenuFlag = false;
                    })
                } else if (isRightClick == 2) {
                    let _this = this
                    marker.addEventListener('rightclick', function (e) {
                        _this.$store.state.mapLeftMenuFlag = false;
                    })
                    marker.addEventListener('click', function (e) {
                        _this.showimgrul = ''
                        _this.$store.state.isMarkerLable = true
                        let rightMenu = document.getElementById('MapLeftMenu')
                        _this.$store.state.mapLeftMenuFlag = true;
                        rightMenu.style.left = (e.clientX + 10) + 'px'
                        if (marker.list.type == 8) {
                            if (e.clientY < 770) {
                                rightMenu.style.top = (e.clientY - 65) + 'px'
                                rightMenu.style['bottom'] = null
                            } else {
                                rightMenu.style['top'] = null
                                rightMenu.style.bottom = 0 + 'px'
                            }
                        } else {
                            if (e.clientY <= 630) {
                                rightMenu.style.top = (e.clientY - 65) + 'px'
                                rightMenu.style['bottom'] = null
                            }
                            if (e.clientY > 630) {
                                rightMenu.style['top'] = null
                                rightMenu.style.bottom = (e.clientY - 630) + 'px'
                            }
                        }

                        _this.deviceUuid = e.target.list.deviceUuid
                        _this.listType = e.target.list.type
                        _this.listName = e.target.list.cameraName
                        _this.listlng = e.target.list.longitude
                        _this.listlat = e.target.list.latitude
                        _this.offset = e.target.list.offset
                        _this.pTinfo = e.target
                        _this.showimgrul = ''
                        if (_this.listType == 6) {
                            _this.getImgquery(_this.deviceUuid)
                        } else {
                            _this.getAllImg(_this.deviceUuid)
                        }

                    })
                    this.map.addEventListener("zoomstart", function (evt) {
                        _this.$store.state.mapLeftMenuFlag = false;
                    })
                    this.map.addEventListener("dragstart", function (evt) {
                        _this.$store.state.mapLeftMenuFlag = false;
                    })
                    //   marker.disableMassClear(); //禁止清除覆盖物
                }
            }

            // 获取所有的点位
            //  let allOverlay = this.map.getOverlays()
            //创建点位聚合的对象
            /**
             * @Date: 2019-12-26 16:40:41
             * @description: 暂时屏蔽聚合
             * @param {type}
             * @return:
             * @name: 陈秀峰
             */
            // if (this.markerClusterer != null) {
            //     this.markerClusterer.clearMarkers()
            //     this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
            //         markers: markers
            //     }) //所有标注创建完以后建立点聚合
            // } else {
            //     this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
            //         markers: markers
            //     })
            // }
        },

        //imsi轨迹标注
        imeiFoundLabel(list) {
            let filtterList = []
            var img = RFIDIco
            for (let i = 0; i < list.length; i++) {
                filtterList.push(list[i])
            }
            // 判断点位是什么点
            for (var i = 0; i < filtterList.length; i++) {
                let p0 = filtterList[i].longitude;
                let p1 = filtterList[i].latitude;
                let point = new BMap.Point(p0, p1);
                let myIcon = new BMap.Icon(img, new BMap.Size(43, 51), {});
                var label = new BMap.Label(list[i].name, {
                    offset: new BMap.Size(10, 30)
                });
                let marker = new BMap.Marker(point, {
                    offset: new BMap.Size(-1, -17),
                    icon: myIcon
                })
                marker.setZIndex(900)
                marker.setLabel(label);
                this.imeiDialogMap.addOverlay(marker);

            }

        },
        /**
         * @description: 增加设备关联点位生成方法
         * @param {type}
         * @return:
         * @Author: 李志远
         * @Date: 2020-01-03 15:53:44
         * @LastEditTime: Do not edit
         */
        imeicaseLabel(p0, p1, ) {
            if (p0 == null || p0 == '') {
                return
            }
            let point = new BMap.Point(p0, p1)
            let myIcon = new BMap.Icon(cased, new BMap.Size(35, 36), {});
            let marker = new BMap.Marker(point, {
                offset: new BMap.Size(1, 2),
                icon: myIcon
            })
            marker.listType = 7
            marker.lng = p0
            marker.lat = p1
            this.imeiDialogMap.addOverlay(marker)
        },
        //案件库标注
        smallFoundLabel(list, isRightClick) {
            let markers = []
            for (var i = 0; i < list.length; i++) {
                let img
                if (list[i].cameraType == 1) {
                    img = videoIco
                }
                if (list[i].cameraType == 4) {
                    img = RFIDIco
                }
                if (list[i].cameraType == 5) {
                    img = linshi
                }
                if (list[i].cameraType == 6) {
                    img = info
                }
                if (list[i].cameraType == 10) {
                    // light 为以图搜图点位的高亮红色图标
                    img = light
                }
                let p0 = list[i].longitude;
                let p1 = list[i].latitude;
                let point = new BMap.Point(p0, p1);
                let myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
                var label = new BMap.Label(list[i].cameraName, {
                    offset: new BMap.Size(10, 32)
                });
                let marker = new BMap.Marker(point, {
                    offset: new BMap.Size(6, -13),
                    icon: myIcon
                })
                this.smallMap.addOverlay(marker)
                marker.setZIndex(900)
                // marker.setZIndex(-1)
                marker.setLabel(label);
                this.smallMap.addOverlay(marker)
                marker.id = list[i].deviceUuid;
                marker.list = list[i]
                marker.markerIdx = i
                markers.push(marker)
                this.markersAll = markers

            }

            // 获取所有的点位
            //  let allOverlay = this.map.getOverlays()
            //创建点位聚合的对象
            /**
             * @Date: 2019-12-26 16:40:41
             * @description: 暂时屏蔽聚合
             * @param {type}
             * @return:
             * @name: 陈秀峰
             */
            // if (this.markerClusterer != null) {
            //     this.markerClusterer.clearMarkers()
            //     this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
            //         markers: markers
            //     }) //所有标注创建完以后建立点聚合
            // } else {
            //     this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
            //         markers: markers
            //     })
            // }
        },


        //隐藏案件库标注
        hideFoundLabel(list) {
            let filtterList = []
            var img
            for (let i = 0; i < list.length; i++) {
                if (list[i].markId) {
                    filtterList.push(list[i])
                }
            }
            // 判断点位是什么点
            for (var i = 0; i < filtterList.length; i++) {
                //1是天网
                if (filtterList[i].type == 1) {
                    img = videoIco
                }
                //4是社会面
                if (filtterList[i].type == 4) {
                    img = RFIDIco
                }
                //5是临时点
                if (filtterList[i].type == 5) {
                    img = linshi
                }
                //6是信息点
                if (filtterList[i].type == 6) {
                    img = info
                }
                if (filtterList[i].type == 10) {
                    // light 为以图搜图点位的高亮红色图标
                    img = light
                }
                //对点位的经纬度进行赋值
                let p0 = filtterList[i].longitude;
                let p1 = filtterList[i].latitude;
                let point = new BMap.Point(p0, p1);
                let myIcon = new BMap.Icon(img, new BMap.Size(43, 51), {});
                // var label = new BMap.Label(list[i].cameraName,{offset:new BMap.Size(30,30)});
                let marker = new BMap.Marker(point, {
                    offset: new BMap.Size(-1, -17),
                    icon: myIcon
                })
                marker.setZIndex(900)
                this.hideMap.addOverlay(marker);

            }

        },

        caseLabel(p0, p1, isRightClick) {
            if (p0 == null || p0 == '') {
                return
            }
            let markers = []
            let point = new BMap.Point(p0, p1)
            let myIcon = new BMap.Icon(cased, new BMap.Size(35, 36), {});
            let marker = new BMap.Marker(point, {
                offset: new BMap.Size(1, 2),
                icon: myIcon
            })
            marker.listType = 7
            marker.lng = p0
            marker.lat = p1
            markers.push(marker)
            this.markerCaseAll = markers
            if (markers.length > 1) {
                return
            }
            // marker.disableMassClear();//禁止清除覆盖物
            this.map.addOverlay(marker)
            let _this = this
            if (isRightClick) {
                marker.addEventListener('rightclick', function (e) {
                    _this.$store.state.mapLeftMenuFlag = false;
                })
                marker.addEventListener('click', function (e) {
                    let rightMenu = document.getElementById('MapLeftMenu')
                    if (e.clientY < 630) {
                        rightMenu.style.top = (e.clientY - 65) + 'px'
                        rightMenu.style['bottom'] = null
                    } else {
                        rightMenu.style['top'] = null
                        rightMenu.style.bottom = 0 + 'px'
                    }
                    rightMenu.style.left = (e.clientX + 10) + 'px'
                    // rightMenu.style.top = (e.clientY - 65) + 'px'
                    _this.listType = e.target.listType
                    _this.listlng = e.target.lng
                    _this.listlat = e.target.lat
                    _this.offset = e.target.offset
                    _this.pTinfo = e.target
                    _this.showimgrul = ''

                    if (_this.showSearchImg && _this.searchRunAllList.length) {
                        _this.slidePic = []
                        _this.skynetFlag = 2;
                    } else {
                        if (_this.$route.path == '/videoCombat/addcasetwo') {
                            _this.closeSearchImg();
                        }
                        _this.$store.state.mapLeftMenuFlag = true;
                        _this.$store.state.isMarkerLable = true
                        _this.showSearchImg = false
                        // console.log('走10');
                        _this.getCaseId(_this.$route.query.caseUuid)
                    }
                })
                this.map.addEventListener("zoomstart", function (evt) {
                    _this.$store.state.mapLeftMenuFlag = false;
                })
                this.map.addEventListener("dragstart", function (evt) {
                    _this.$store.state.mapLeftMenuFlag = false;
                })

                // this.onRightCaseFun(marker)
            }
        },

        /**
         * @description: 新增设备关联案发点加载
         * @param {type}
         * @return:
         * @Author: 李志远
         * @Date: 2020-01-03 15:58:17
         * @LastEditTime: Do not edit
         */

        //案件库新增案发点
        smallCaseLabel(p0, p1, isRightClick) {
            if (p0 == null || p0 == '') {
                return
            }

            let markers = []
            let point = new BMap.Point(p0, p1)
            let myIcon = new BMap.Icon(cased, new BMap.Size(35, 36), {});
            let marker = new BMap.Marker(point, {
                offset: new BMap.Size(1, 2),
                icon: myIcon
            })
            marker.listType = 7
            marker.lng = p0
            marker.lat = p1
            markers.push(marker)
            this.markerCaseAll = markers
            if (markers.length > 1) {
                return
            }
            // marker.disableMassClear();//禁止清除覆盖物
            this.smallMap.addOverlay(marker)
            let _this = this
            if (isRightClick) {
                marker.addEventListener('rightclick', function (e) {
                    _this.$store.state.mapLeftMenuFlag = false;
                })
                marker.addEventListener('click', function (e) {
                    let rightMenu = document.getElementById('MapLeftMenu')
                    if (e.clientY < 630) {
                        rightMenu.style.top = (e.clientY - 65) + 'px'
                        rightMenu.style['bottom'] = null
                    } else {
                        rightMenu.style['top'] = null
                        rightMenu.style.bottom = 0 + 'px'
                    }
                    rightMenu.style.left = (e.clientX + 10) + 'px'
                    // rightMenu.style.top = (e.clientY - 65) + 'px'
                    _this.listType = e.target.listType
                    _this.listlng = e.target.lng
                    _this.listlat = e.target.lat
                    _this.offset = e.target.offset
                    _this.pTinfo = e.target
                    _this.showimgrul = ''

                    if (_this.showSearchImg && _this.searchRunAllList.length) {
                        _this.slidePic = []
                        _this.skynetFlag = 2;
                    } else {
                        if (_this.$route.path == '/videoCombat/addcasetwo') {
                            _this.closeSearchImg();
                        }
                        _this.$store.state.mapLeftMenuFlag = true;
                        _this.$store.state.isMarkerLable = true
                        _this.showSearchImg = false
                        // console.log('走11');
                        _this.getCaseId(_this.$route.query.caseUuid)
                    }
                })
                this.smallMap.addEventListener("zoomstart", function (evt) {
                    _this.$store.state.mapLeftMenuFlag = false;
                })
                this.smallMap.addEventListener("dragstart", function (evt) {
                    _this.$store.state.mapLeftMenuFlag = false;
                })

                // this.onRightCaseFun(marker)
            }
        },
        //详情页临时点位
        createTempMarker(data, img) {
            let markers = []
            for (let i = 0; i < data.length; i++) {
                var p0 = data[i]['longitude']
                var p1 = data[i]['latitude']
                var point = new BMap.Point(p0, p1)
                var myIcon = new BMap.Icon(img, new BMap.Size(21, 31), {});
                var marker = new BMap.Marker(point, {
                    offset: new BMap.Size(0, -10),
                    icon: myIcon
                })
                marker.id = data[i]['shebeiId']
                marker.data = data[i]
                markers.push(marker)
                this.addallmarker(marker, point)
                // this.map.addOverlay(marker)
            };
            // 获取所有的点位
            let allOverlay = this.map.getOverlays()
            //创建点位聚合的对象
            if (this.markerClusterer != null) {
                this.markerClusterer.clearMarkers()
                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers: markers
                }) //所有标注创建完以后建立点聚合
            } else {
                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers: markers
                })
            }
        },
        removeMarker() {
            this.map.clearOverlays()
        },
    }
};
export default mixins
