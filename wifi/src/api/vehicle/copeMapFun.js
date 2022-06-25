//地图操作
const mixins = {
  data: function () {
    return {
      markerClusterer: null, //点位聚合对象
      styleOptions: {
        strokeColor: "red", //边线颜色。
        fillColor: "rgba(255,0,0,.3)", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
      },
      point: {}, //页面底部经纬度
      tollgateIdsArrName: [], //总体选中的卡口名称列表
      tollArrName: [], //地图选中的卡口名称列表
      tollTreeArrName: [], // 菜单选中的卡口名称列表
      videosUrl: '',
      videoNum:'',
      DialogVisible4:false,
    }
  },
  methods: {
    //创建地图api
    // loadMap: function () {
    //   let map = new BMap.Map("mapContent", {
    //     enableMapClick: false
    //   });
    //   this.map = map;
    //   map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
    //   // 设置地图背景色为白色
    //   map.getContainer().style.background = '#fff';
    //   map.enableScrollWheelZoom(); //设置滚轮
    //   map.disableContinuousZoom(); //禁用连续放大、
    //   map.addControl(new BMap.ScaleControl({ //地图比例尺控件
    //     anchor: BMAP_ANCHOR_BOTTOM_LEFT,
    //     offset: new BMap.Size(10, 50)
    //   }));
    //   map.addControl(new BMap.NavigationControl({
    //     anchor: BMAP_ANCHOR_TOP_RIGHT
    //   }));
    //   this.map.addControl(new BMap.OverviewMapControl({
    //     isOpen: true,
    //     anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    //     size: new BMap.Size(250, 180)
    //   }));

    //   map.addEventListener('mousemove', (e) => {
    //     this.point = e.point
    //   })
    // },
    //加载地图
    InitCopeMap: function (id) {
      let map = new BMap.Map(id, {
        enableMapClick: false
      });
      this.map = map;
      map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
      map.getContainer().style.background = '#fff';
      map.enableScrollWheelZoom(); //设置滚轮
      map.disableContinuousZoom(); //禁用连续放大、
      map.addControl(new BMap.ScaleControl({ //地图比例尺控件
        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
        offset: new BMap.Size(10, 50)
      }));
      map.addControl(new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT
      }));

      this.map.addControl(new BMap.OverviewMapControl({
        isOpen: true,
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        size: new BMap.Size(250, 180)
      }));

      map.addEventListener('mousemove', (e) => {
        this.point = e.point
      })

      //-------显示卫星地图----
      // map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]}));
    },
    //小地图加载
    InitSmallMap: function (id) {
      let map = new BMap.Map(id, {
        enableMapClick: false
      });
      this.map = map;
      map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
      map.getContainer().style.background = '#fff';
      map.enableScrollWheelZoom(); //设置滚轮
      map.disableContinuousZoom(); //禁用连续放大、
      map.addControl(new BMap.ScaleControl({ //地图比例尺控件
        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
        offset: new BMap.Size(10, 50)
      }));
      map.addControl(new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT
      }));
      map.addEventListener('mousemove', (e) => {
        this.point = e.point
      })
    },





    // initPoint() {
    //   let markers = [];
    //   let carIco = require('@/assets/images/device/car.png')
    //   for (let i = 0; i < this.newpoints.length; i++) { //newpoints写死的数据
    //     let point = this.newpoints[i];
    //     let point_marker = new BMap.Point(point['longitude'], point['latitude']);
    //     var myIcon = new BMap.Icon(carIco, new BMap.Size(33, 36), {});
    //     var marker = new BMap.Marker(point_marker, {
    //       offset: new BMap.Size(0, -20),
    //       icon: myIcon
    //     });
    //     //let marker = new BMap.Marker(point_marker);
    //     markers.push(marker);
    //     //弹窗对象
    //     let opts = {
    //       width: 100,
    //       height: 120,
    //       title: "卡口详情",
    //     };
    //     //弹窗内容
    //     let content = `<div class='mapDialog'>
    //           <div class='mapDialogtext'>
    //                 <div>区域:${this.newpoints[i].place}</div>
    //                 <div>街道:${this.newpoints[i].name}</div>
    //                 <div>经度:${this.newpoints[i].longitude}</div>
    //                 <div>维度:${this.newpoints[i].latitude}</div>
    //           </div>
    //      </div>`;
    //     let info_Window = new BMap.InfoWindow(content, opts);
    //     this.map.addOverlay(marker);
    //     marker.disableMassClear();
    //     marker.addEventListener("click", function () {
    //       this.openInfoWindow(info_Window);
    //     });
    //   }

    //   //点位聚合对象
    //   if (this.markerClusterer != null) { //判断markerClusterer对象是否存在
    //     this.markerClusterer.clearMarkers();
    //     this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
    //       markers: markers
    //     }); //所有标注创建完以后建立点聚合
    //   } else {
    //     this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
    //       markers: markers
    //     }); //所有标注创建完以后建立点聚合
    //   }

    // },
    //以图搜图 语义查询
    initCarPoint() {
      let markers = [];
      let carIco = require('@/assets/images/device/car.png')
      for (let i = 0; i < this.newpoints.length; i++) { //newpoints写死的数据
        let point = this.newpoints[i];
        let point_marker = new BMap.Point(point['longitude'], point['latitude']);
        var myIcon = new BMap.Icon(carIco, new BMap.Size(33, 36), {});
        var marker = new BMap.Marker(point_marker, {
          offset: new BMap.Size(0, -20),
          icon: myIcon
        });
        markers.push(marker);
        //弹窗对象
        let opts = {
          width: 100,
          height: 120,
          title: "卡口详情",
        };
        //弹窗内容
        let content = `<div class='mapDialog'>
            <div class='mapDialogtext'>
                  <div>区域:${this.newpoints[i].place}</div>
                  <div>街道:${this.newpoints[i].name}</div>
                  <div>经度:${this.newpoints[i].longitude}</div>
                  <div>维度:${this.newpoints[i].latitude}</div>
            </div>
        </div>`;
        let info_Window = new BMap.InfoWindow(content, opts);
        // this.map.addOverlay(marker);
        marker.disableMassClear();
        marker.addEventListener("click", function () {
          this.openInfoWindow(info_Window);
        });
      }

      //点位聚合对象
      if (this.markerClusterer != null) { //判断markerClusterer对象是否存在
        this.markerClusterer.clearMarkers();
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      } else {
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      }

    },

    // 加载的小地图的列表
    initAllPoint(data, img) {
      let markers = [];
      for (let i = 0; i < data.length; i++) { //newpoints写死的数据
        let point = data[i];
        this.getVideoByDevice(point.shebeiId)
        let point_marker = new BMap.Point(point['longitude'], point['latitude']);
        var myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
        var marker = new BMap.Marker(point_marker, {
          offset: new BMap.Size(0, -20),
          icon: myIcon
        });
        //let marker = new BMap.Marker(point_marker);
        markers.push(marker);
        //弹窗对象
        let opts = {
          width: 100,
          height: 150,
          title: "卡口视频详情",
        };
        //弹窗内容
        let content = `<div class='mapDialog'>
            <div class='mapDialogtext'>
                  <div>区域:${data[i].place}</div>
                  <div>街道:${data[i].name}</div>
                  <div>经度:${data[i].longitude}</div>
                  <div>纬度:${data[i].latitude}</div>
                  <div id="ByDevice" style="color:#409eff">详情</div>
            </div>
        </div>`;
        let info_Window = new BMap.InfoWindow(content, opts);
        this.map.addOverlay(marker);
        marker.disableMassClear();
        var id = data[i].shebeiId
        let _this = this
        marker.addEventListener("click", function (e) {
          this.openInfoWindow(info_Window);
          var ByDevice = document.getElementById('ByDevice')
          ByDevice.onclick = ()=>{
            _this.DialogVisible4 = true;
            _this.getVideoByDevice(point.shebeiId)
          }
        });
      }
      //点位聚合对象
      if (this.markerClusterer != null) { //判断markerClusterer对象是否存在
        this.markerClusterer.clearMarkers();
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      } else {
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      }

    },

    //  得到当前点位下的视频
    getVideoByDevice(id){
      this.$http.get('vsas/collection/offline/list?status=4&deviceId='+id).then(res => {
        if (res.data.code == 200) {
          this.videosUrl = res.data.data.list
        }
      })
    },
    //绘制矩形
    drawCopeReact: function () {
      let _this = this;
      this.drawingManager = new BMapLib.DrawingManager(this.map, {});
      this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE); //设置模式
      this.drawingManager.rectangleOptions = this.styleOptions
      this.drawingManager.open(); //开启绘图
      this.drawingManager.addEventListener("rectanglecomplete", function (e, overlay) {
        _this.overCopelaycomplete(e);
      });
    },

    //绘制线
    drawCopeLine: function () {
      let _this = this;
      this.drawingManager = new BMapLib.DrawingManager(this.map, {});
      this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON); //设置模式
      this.drawingManager.polygonOptions = this.styleOptions;
      this.drawingManager.open(); //开启绘图
      this.drawingManager.addEventListener("polygoncomplete", function (e, overlay) {
        _this.polyCopegoncomplete(e, overlay);
      });
    },
    //多边形绘制完成后的回调
    polyCopegoncomplete: function (e, overlay) {
      let polygon = overlay;
      for (let i = 0; i < this.newpoints.length; i++) { //newpoints写死的数据
        let point = this.newpoints[i];
        let point_marker = new BMap.Point(point['longitude'], point['latitude']);
        if (BMapLib.GeoUtils.isPointInPolygon(point_marker, polygon)) {
          this.tollArr.push(point.shebeiId);
          this.tollArrName.push(point.name);
        }
      }
      this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
      this.tollgateIdsArr = this.uniqCope(this.tollgateIdsArr);
      this.tollgateIds = this.tollgateIdsArr.join(",");
      this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
      this.tollgateIdsArrName = this.uniqCope(this.tollgateIdsArrName);
    },


    closeCopeDraw: function () {
      if (this.drawingManager != null) {
        this.drawingManager.close(); //关闭绘制
      }
    },

    //清除覆盖物
    clearCopeDrawing: function () {
      this.map.clearOverlays();
      this.initPoint2();
      this.tollgateIds = null;
      this.tollArr = [];
      this.tollTreeArr = [];
      this.tollgateIdsArr = [];
      this.tollArrName = [];
      this.tollTreeArrName = [];
      this.tollgateIdsArrName = [];
      this.$refs.tree.setCheckedKeys([]);
    },

    //矩形绘制完成后的回调
    overCopelaycomplete: function (e) {
      console.log(e,99999);
      let left_top_point = e.to[0]; //矩形框左上角的点
      let right_bottom_point = e.to[2]; //矩形框右下角的点
      for (let i = 0; i < this.newpoints.length; i++) { //newpoints写死的数据
        let point = this.newpoints[i];
        if (left_top_point['lng'] < point['longitude'] && left_top_point['lat'] > point['latitude'] && right_bottom_point['lng'] > point['longitude'] && right_bottom_point['lat'] < point['latitude']) {
          this.tollArr.push(point.shebeiId);
          this.tollArrName.push(point.name);
        }
      }
      this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
      this.tollgateIdsArr = this.uniqCope(this.tollgateIdsArr);
      this.tollgateIds = this.tollgateIdsArr.join(",");
      this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
      this.tollgateIdsArrName = this.uniqCope(this.tollgateIdsArrName);
    },

    //获取当前坐标
    // getLocalCoordinate: function () {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       function (position) {
    //         this.longitude = position.coords.longitude;
    //         this.latitude = position.coords.latitude;
    //       }
    //     )
    //   } else {
    //     console.log("浏览器不支持获取位置")
    //   }
    // },
    //根据选中的树形点，在地图上添加覆盖物
    getCheckedCopeNodes(obj1, obj2) {
      //this.map.clearOverlays();//清空所有覆盖物
      let nodes = obj2.checkedNodes; //获取当前选中节点的数据数组
      this.tollTreeArr = [];
      this.tollTreeArrName = [];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].apes && nodes[i].apes.length > 0) { //如出现apes说明某个节点上的子节点全部选中
          continue;
        } else { //否则没有全选
          this.tollTreeArr.push(nodes[i].shebeiId);
          this.tollTreeArrName.push(nodes[i].name);
        }
      }
      this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
      this.tollgateIdsArr = this.uniqCope(this.tollgateIdsArr);
      this.tollgateIds = this.tollgateIdsArr.join(",");
      this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
      this.tollgateIdsArrName = this.uniqCope(this.tollgateIdsArrName);
    },
    //过滤树形结构
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.name.indexOf(value) !== -1;
    // },

    // toggleBar() {
    //   this.isBar = !this.isBar;
    // },
    // closeBar(e) {
    //   let menu = document.getElementsByClassName('menu')[0];
    //   if (this.isBar && !menu.contains(e.target) && e.target.id != "menuImg") {
    //     this.isBar = false;
    //   }
    // },

    //数组去重
    uniqCope(array) {
      let temp = [];
      let index = [];
      let l = array.length;
      for (let i = 0; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
          if (array[i] === array[j]) {
            i++;
            j = i;
          }
        }
        temp.push(array[i]);
        index.push(i);
      }
      return temp;
    },

    //轨迹回放
    // runLine(arrPoisArr, color) {

    //   let arrPois = [];
    //   for (let i = 0; i < arrPoisArr.length; i++) {
    //     arrPois[i] = new BMap.Point(arrPoisArr[i].longitude, arrPoisArr[i].latitude);
    //   }
    //   //单迎线路轨迹
    //   let _this = this;
    //   _this.map.clearOverlays();
    //   _this.map.addOverlay(new BMap.Polyline(arrPois, {
    //     strokeColor: color,
    //     strokeWeight: 6,
    //     strokeOpacity: 0.5
    //   }));
    //   _this.map.setViewport(arrPois);
    //   let marker = new BMap.Marker(arrPois[0]); //起点marker
    //   let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34)); //地点图标
    //   marker.setIcon(iconc);
    //   _this.map.addOverlay(marker); //将标记添加到地图中
    //   marker = new BMap.Marker(arrPois[arrPois.length - 1]); //终点marker
    //   iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34)); //终点icon
    //   marker.setIcon(iconc);
    //   _this.map.addOverlay(marker); //将标记添加到地图中

    //   //回放
    //   let blueCar = _this.blueCar = new BMapLib.LuShu(_this.map, arrPois, {
    //     defaultContent: "", //"从浔阳路到滨江路"
    //     autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
    //     icon: new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), {
    //       anchor: new BMap.Size(15, 15)
    //     }), //运动的图标
    //     speed: 500,
    //     landmarkPois: [],
    //     enableRotation: true //是否设置marker随着道路的走向进行旋转
    //   });
    //   // blueCar.start();
    //   this.blueCar.start();
    // },







  }
};
export default mixins
