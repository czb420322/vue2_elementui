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
      firstCityBackDate: sessionStorage.getItem("firstCityBackDate"), //回溯时长
      footTimeHours: sessionStorage.getItem("footTimeHours"), //落脚时长
      frequentlyPassNum: sessionStorage.getItem("frequentlyPassNum"), //过车次数
      followTimes: sessionStorage.getItem("followTime"), //跟车时间
      followNum: sessionStorage.getItem("followNum"), //跟车次数

      // 正则
      reg: /^\+?[1-9][0-9]*$/, //正整数

      //车辆研判表单验证错误消息
      Err: {
        isCarHead: {
          check: false, //不需要验证
          flag: false,
          top: 0,
          txt: ""
        },
        vehicleModel: {
          flag: false,
          top: 0,
          txt: ""
        },
        vehicleBrand: {
          flag: false,
          top: 0,
          txt: ""
        },
        ModelOrBrand: {
          flag: false,
          top: 0,
          txt: ""
        },
        vehicleKind: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        plateNo: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        excludePlateNo: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        plateNumber: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        beginDateTime: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        endDateTime: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        backdate: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        footholdTime: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        passCount: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        followTime: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        followNumber: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        timeType: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        beginDateCI: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        },
        endDateCI: {
          check: false,
          flag: false,
          top: 0,
          txt: ""
        }
      },
    }
  },

  methods: {
    //创建地图api
    loadMap: function () {
      /***
       var map = new BMap.Map('mapContent');
       var point = new BMap.Point(this.longitude, this.latitude);
       map.centerAndZoom(point, 14);
       map.addControl(new BMap.MapTypeControl());
       map.enableScrollWheelZoom(true);
       map.enableDoubleClickZoom(true);
       var marker = new BMap.Marker(point);
       map.addOverlay(marker);
       */

      let map = new BMap.Map("mapContent", {
        enableMapClick: false
      });
      this.map = map;
      // this.$store.dispatch('mapInit',map)
      map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
      //map.centerAndZoom(new BMap.Point(116.004303, 29.736834), 16);
      // 设置地图背景色为白色
      map.getContainer().style.background = '#fff';
      // let point = new BMap.Point(104.074362,36.540276);
      // map.centerAndZoom(point, 5.0);//设置地图比例尺
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
    InitMap: function (id) {
      let map = new BMap.Map(id, {
        enableMapClick: false
      });
      this.map = map;
      // this.$store.dispatch('mapInit',map)
      map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
      //map.centerAndZoom(new BMap.Point(116.004303, 29.736834), 16);
      // 设置地图背景色为白色
      map.getContainer().style.background = '#fff';
      // let point = new BMap.Point(104.074362,36.540276);
      // map.centerAndZoom(point, 5.0);//设置地图比例尺
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

    initPoint() {
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
        marker.setTitle('卡口名称：' + this.newpoints[i].name);
        markers.push(marker);
        //弹窗对象
        let opts = {
          title: "<span style='display:inline-block;font-size:0.16rem;color:#606266;font-weight:bold;'>卡口详情</span>",
        };
        //弹窗内容
        // let content = `<div class='mapDialog'>
        //   <div class='mapDialogtext'style="font-size:0.14rem;color:#606266;">
        //     <div style="position: relative;padding-left:0.9rem;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:0.9rem;">卡口名称：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis;">${this.newpoints[i].name}</span></div>
        //     <div style="position: relative;padding-left:0.9rem;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:0.9rem;">区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis;">${this.newpoints[i].place}</span></div>
        //     <div style="position: relative;padding-left:0.9rem;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:0.9rem;">经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis">${this.newpoints[i].longitude}</span></div>
        //     <div style="position: relative;padding-left:0.9rem;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:0.9rem;">纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis">${this.newpoints[i].latitude}</span></div>
        //   </div>
        //  </div>`;
        let content = `<div class='mapDialog'>
          <div class='mapDialogtext'style="font-size:0.14rem;color:#606266;">
            <div style="position: relative;padding-left:70px;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:70px;">卡口名称：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis;">${this.newpoints[i].name}</span></div>
            <div style="position: relative;padding-left:70px;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:70px;">区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis;">${this.newpoints[i].place}</span></div>
            <div style="position: relative;padding-left:70px;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:70px;">经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis">${this.newpoints[i].longitude}</span></div>
            <div style="position: relative;padding-left:70px;"><span style="position: absolute;left:0;top:0;font-weight:bold;display:inline-block;width:70px;">纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span><span style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis">${this.newpoints[i].latitude}</span></div>
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

    //绘制矩形
    drawReact: function () {
      /**drawingManager.setDrawingMode()可以接受的参数
       *
       * BMAP_DRAWING_MARKER 画点
       BMAP_DRAWING_CIRCLE 画圆
       BMAP_DRAWING_POLYLINE 画线
       BMAP_DRAWING_POLYGON 画多边形
       BMAP_DRAWING_RECTANGLE 画矩形
       */
      let _this = this;
      this.drawingManager = new BMapLib.DrawingManager(this.map, {});
      this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE); //设置模式
      this.drawingManager.rectangleOptions = this.styleOptions
      this.drawingManager.open(); //开启绘图
      this.drawingManager.addEventListener("rectanglecomplete", function (e, overlay) {
        _this.overlaycomplete(e);
      });
    },

    //绘制线
    drawLine: function () {
      let _this = this;
      this.drawingManager = new BMapLib.DrawingManager(this.map, {});
      this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON); //设置模式
      this.drawingManager.polygonOptions = this.styleOptions;
      this.drawingManager.open(); //开启绘图
      this.drawingManager.addEventListener("polygoncomplete", function (e, overlay) {
        _this.polygoncomplete(e, overlay);
      });
      _this.contentLeft = true;
    },
    //多边形绘制完成后的回调
    polygoncomplete: function (e, overlay) {
      let polygon = overlay;
      this.contentLeft = false;
      for (let i = 0; i < this.newpoints.length; i++) { //newpoints写死的数据
        let point = this.newpoints[i];
        let point_marker = new BMap.Point(point['longitude'], point['latitude']);
        if (BMapLib.GeoUtils.isPointInPolygon(point_marker, polygon)) {
          this.tollArr.push(point.kakouId);
          this.tollArrName.push(point.name);
        }
      }
      this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
      this.tollgateIdsArr = this.uniq(this.tollgateIdsArr);
      if (this.defaultTollgate && !this.tollgateIdsArr.length) {
        this.tollgateIdsArr = this.defaultTollgate;
      }
      this.tollgateIds = this.tollgateIdsArr.join(",");
      this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
      this.tollgateIdsArrName = this.uniq(this.tollgateIdsArrName);
    },


    closeDraw: function () {
      if (this.drawingManager != null) {
        this.drawingManager.close(); //关闭绘制
      }
    },

    //清除覆盖物
    clearDrawing: function () {
      // let overlayer = this.map.getOverlays();
      // this.overlays=null;
      this.map.clearOverlays();
      this.initPoint();
      this.tollgateIds = null;
      if (this.defaultTollgate) {
        this.tollgateIds = this.defaultTollgate.join(",");
      }
      this.tollArr = [];
      this.tollTreeArr = [];
      this.tollgateIdsArr = [];
      this.tollArrName = [];
      this.tollTreeArrName = [];
      this.tollgateIdsArrName = [];
      this.$refs.tree.setCheckedKeys([]);
    },

    //矩形绘制完成后的回调
    overlaycomplete: function (e) {
      // this.drawingManager.close()
      let left_top_point = e.to[0]; //矩形框左上角的点
      let right_bottom_point = e.to[2]; //矩形框右下角的点
      // let left_top_point = e.getBounds().getNorthEast(); //矩形框左上角的点
      // let right_bottom_point = e.getBounds().getSouthWest(); //矩形框右下角的点
      for (let i = 0; i < this.newpoints.length; i++) { //newpoints写死的数据
        let point = this.newpoints[i];
        if (left_top_point['lng'] < point['longitude'] && left_top_point['lat'] > point['latitude'] && right_bottom_point['lng'] > point['longitude'] && right_bottom_point['lat'] < point['latitude']) {

          this.tollArr.push(point.kakouId);
          this.tollArrName.push(point.name);
        }
      }
      this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
      this.tollgateIdsArr = this.uniq(this.tollgateIdsArr);
      if (this.defaultTollgate && !this.tollgateIdsArr.length) {
        this.tollgateIdsArr = this.defaultTollgate;
      }
      this.tollgateIds = this.tollgateIdsArr.join(",");
      this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
      this.tollgateIdsArrName = this.uniq(this.tollgateIdsArrName);
    },

    //获取当前坐标
    getLocalCoordinate: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            this.longitude = position.coords.longitude;
            this.latitude = position.coords.latitude;
          }
        )
      } else {
        console.log("浏览器不支持获取位置")
      }
    },

    //获取树形结构数据,并显示出来
    getTreeData: function () {
      this.getTollgateList((res) => {
        this.treeList = res.data.data;
        if (this.defaultTollgate) {
          this.newpoints.forEach(element => {
            this.defaultTollgate.push(element.kakouId);
          });
          this.tollgateIds = this.defaultTollgate.join(",");
        }
        this.initPoint();
      });
    },
    //根据选中的树形点，在地图上添加覆盖物
    getCheckedNodes(obj1, obj2) {
      //this.map.clearOverlays();//清空所有覆盖物
      let nodes = obj2.checkedNodes; //获取当前选中节点的数据数组
      this.tollTreeArr = [];
      this.tollTreeArrName = [];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].apeTollgates && nodes[i].apeTollgates.length > 0) { //如出现apes说明某个节点上的子节点全部选中
          continue;
        } else { //否则没有全选
          this.tollTreeArr.push(nodes[i].kakouId);
          this.tollTreeArrName.push(nodes[i].name);
          //let lng = nodes[i]['longitude'];
          //let lat = nodes[i]['latitude'];
          //let point = new BMap.Point(lng,lat);
          //let marker = new BMap.Marker(point);
          //this.map.addOverlay(marker);
        }
      }
      this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
      this.tollgateIdsArr = this.uniq(this.tollgateIdsArr);
      if (this.defaultTollgate && !this.tollgateIdsArr.length) {
        this.tollgateIdsArr = this.defaultTollgate;
      }
      this.tollgateIds = this.tollgateIdsArr.join(",");
      this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
      this.tollgateIdsArrName = this.uniq(this.tollgateIdsArrName);
    },
    //过滤树形结构
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },

    toggleBar() {
      this.isBar = !this.isBar;
    },
    closeBar(e) {
      let menu = document.getElementsByClassName('menu')[0];
      if (this.isBar && !menu.contains(e.target) && e.target.id != "menuImg") {
        this.isBar = false;
      }
    },

    //数组去重
    uniq(array) {
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

    runLine(arrPoisArr, color) {
      let arrPois = [];
      for (let i = 0; i < arrPoisArr.length; i++) {
        arrPois[i] = new BMap.Point(arrPoisArr[i].longitude, arrPoisArr[i].latitude);
        console.log(arrPois[i],44444444444444);
      }
      //单迎线路轨迹
      let _this = this;
      _this.map.clearOverlays();
      _this.map.addOverlay(new BMap.Polyline(arrPois, {
        strokeColor: color,
        strokeWeight: 6,
        strokeOpacity: 0.5
      }));
      _this.map.setViewport(arrPois);
      let marker = new BMap.Marker(arrPois[0]); //起点marker
      let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34)); //地点图标
      marker.setIcon(iconc);
      _this.map.addOverlay(marker); //将标记添加到地图中
      marker = new BMap.Marker(arrPois[arrPois.length - 1]); //终点marker
      iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34)); //终点icon
      marker.setIcon(iconc);
      _this.map.addOverlay(marker); //将标记添加到地图中

      //回放
      let blueCar = _this.blueCar = new BMapLib.LuShu(_this.map, arrPois, {
        defaultContent: "", //"从浔阳路到滨江路"
        autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), {
          anchor: new BMap.Size(15, 15)
        }), //运动的图标
        speed: 500,
        landmarkPois: [],
        enableRotation: true //是否设置marker随着道路的走向进行旋转
      });
      // blueCar.start();
      this.blueCar.start();
    },



    //车辆研判左侧表单验证
    getCheckedItem(items) { //获取需要验证表单项,items为数组,可选项为 "isCarHead","vehicleKind",""vehicleModel","plateNo"等
      //items = [{name:'isCarHead',checked:true},{name:'isCarHead',checked:true},'isCarHead'];
      for (let i = 0; i < items.length; i++) {
        if (typeof items[i] === 'string') {
          let item = items[i];
          this.Err[item].check = true;
        } else if (typeof items[i] === 'object') {
          let item = items[i].name;
          this.Err[item].check = items[i].checked;
        }
      }
    },
    checkCarHead() {
      if (this.isCarHead === null) {
        this.checkItem("isCarHead", "抓拍方向为必选项！");
        setTimeout(function () {
          this.clearCheck("isCarHead");
        }, 1000);
      } else {
        this.clearCheck("isCarHead");
      }
    },
    checkVehicleModel() {
      if (this.vehicleModel === "不限" || this.vehicleModel === null || this.vehicleModel == "") {
        this.checkItem("vehicleModel", "车辆型号为必选项！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("vehicleModel");
        }, 1000);
      } else {
        this.clearCheck("vehicleModel");
      }
    },
    checkVehicleBrand() {
      if (this.vehicleBrand === "不限" || this.vehicleBrand === null || this.vehicleBrand == "") {
        this.checkItem("vehicleBrand", "车辆品牌为必选项！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("vehicleBrand");
        }, 1000);
      } else {
        this.clearCheck("vehicleBrand");
      }
    },
    // checkModelOrBrand(){
    //   if( (this.vehicleBrand === "不限" || this.vehicleBrand === null || this.vehicleBrand == "")&&(this.vehicleModel === "不限" || this.vehicleModel === null || this.vehicleModel == "")){
    //     this.checkItem("ModelOrBrand", "车辆品牌与车辆型号至少选一项！");
    //     let _this = this;
    //     setTimeout(function(){
    //       _this.clearCheck("ModelOrBrand");
    //     },1000);
    //   }else{
    //     this.clearCheck("ModelOrBrand");
    //   }
    // },
    checkVehicleKind() {
      if (this.vehicleKind === "不限" || this.vehicleKind === null || this.vehicleKind === "") {
        this.checkOne("vehicleKind", "车辆类型为必选项！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("vehicleKind");
        }, 1000);
      } else {
        this.clearCheck("vehicleKind");
      }
    },
    checkPlateNo() {
      if (this.platNumArr.length === 0) {
        this.checkItem("plateNo", "车牌号不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("plateNo");
        }, 1000);
      } else {
        this.clearCheck("plateNo");
      }
    },
    checkExcludePlateNo() {
      if (this.excludePlate.length === 0) {
        this.checkItem("excludePlateNo", "车牌号不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("excludePlateNo");
        }, 1000);
      } else {
        this.clearCheck("excludePlateNo");
      }
    },
    checkPlateNumber() {
      // if(this.$refs.plateNumber){
      //   let inputValue = this.$refs.plateNumber.value.trim();
      //   if(inputValue != ""){
      //     let  xxreg = /^[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新港澳台]{1}[A-Z]{1}([A-Z0-9]{5}[挂学警港澳]{0,1}|[A-Z0-9]{6})$/;   //精确车牌
      //     if (!xxreg.test(inputValue)){
      //       this.checkItem("plateNumber", "请正确输入车牌号码！");
      //       let _this = this;
      //       setTimeout(function(){
      //         _this.clearCheck("plateNumber");
      //       },1000);
      //     }
      //   }
      // }
    },
    checkBeginDateTime() {
      if (this.beginDateTime == "" || this.beginDateTime == null) {
        this.checkItem("beginDateTime", "开始时间不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("beginDateTime");
        }, 1000);
      } else {
        this.clearCheck("beginDateTime");
      }
    },
    checkEndDateTime() {
      if (this.endDateTime == "" || this.endDateTime == null) {
        this.checkItem("endDateTime", "结束时间不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("endDateTime");
        }, 1000);
      } else {
        this.clearCheck("endDateTime");
      }
    },
    checkBackdate() {
      // console.log(this.firstCityBackDate.split(",")[1],1)
      if (this.backdate == "" || this.backdate == null) {
        this.checkItem("backdate", "回溯时长不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("backdate");
        }, 1000);
      } else if (!this.reg.test(this.backdate)) {
        this.checkItem("backdate", "回溯时长为正整数！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("backdate");
        }, 1000);
      } else if (this.backdate > Number(this.firstCityBackDate.split(",")[1])) {
        this.checkItem("backdate", "回溯时长最长" + this.firstCityBackDate.split(",")[1] + "天！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("backdate");
        }, 1000);
      } else {
        this.clearCheck("backdate");
      }
    },
    checkFootholdTime() {
      if (this.footholdTime == "" || this.footholdTime == null) {
        this.checkItem("footholdTime", "落脚时长不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("footholdTime");
        }, 1000);
      } else if (!this.reg.test(this.footholdTime)) {
        this.checkItem("footholdTime", "落脚时长为正整数！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("footholdTime");
        }, 1000);
      } else if (this.footholdTime > Number(this.footTimeHours.split(",")[1])) {
        this.checkItem("footholdTime", "落脚时长最多" + this.footTimeHours.split(",")[1] + "小时！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("footholdTime");
        }, 1000);
      } else {
        this.clearCheck("footholdTime");
      }
    },
    checkPassCount() {
      // let pass = this.frequentlyPassNum.split(",")[0]
      if (this.passCount == "" || this.passCount == null) {
        this.checkItem("passCount", "过车次数不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("passCount");
        }, 1000);
      } else if (!this.reg.test(this.passCount)) {
        this.checkItem("passCount", "过车次数为正整数！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("passCount");
        }, 1000);
      } else if (this.passCount < Number(this.frequentlyPassNum.split(",")[0])) {
        this.checkItem("passCount", "过车次数最少" + this.frequentlyPassNum.split(",")[0] + "次！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("passCount");
        }, 1000);
      } else if (this.passCount > Number(this.frequentlyPassNum.split(",")[1])) {
        this.checkItem("passCount", "过车次数最多" + this.frequentlyPassNum.split(",")[1] + "次！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("passCount");
        }, 1000);
      } else {
        this.clearCheck("passCount");
      }
    },
    checkFollowTime() {
      if (this.followTime === "" || this.followTime === null) {
        this.checkItem("followTime", "跟车时间不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("followTime");
        }, 1000);
      } else if (!this.reg.test(this.followTime)) {
        this.checkItem("followTime", "跟车时间为正整数！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("followTime");
        }, 1000);
      } else if (this.followTime > Number(this.followTimes.split(",")[1])) {
        this.checkItem("followTime", "跟车时间最多" + this.followTimes.split(",")[1] + "分钟！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("followTime");
        }, 1000);
      } else {
        this.clearCheck("followTime");
      }
    },
    checkFollowNumber() {
      //let reg  = /^\+?[1-9][0-9]*$/;    //正整数
      //let reg=/^([1-9]\d*|[0]{1,1})$/; //含0正整数
      let reg = /^\d+$/; //含0正整数
      if (this.followNumber === "" || this.followNumber === null) {
        this.checkItem("followNumber", "跟车次数不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("followNumber");
        }, 1000);
      } else if (!reg.test(this.followNumber)) {
        this.checkItem("followNumber", "跟车次数为正整数或0！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("followNumber");
        }, 1000);
      } else if (this.followNumber < Number(this.followNum.split(",")[0])) {
        this.checkItem("followNumber", "跟车次数最少" + this.followNum.split(",")[0] + "次！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("followNumber");
        }, 1000);
      } else if (this.followNumber > Number(this.followNum.split(",")[1])) {
        this.checkItem("followNumber", "跟车次数最多" + this.followNum.split(",")[1] + "次！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("followNumber");
        }, 1000);
      } else {
        this.clearCheck("followNumber");
      }
    },

    checkBeginDateCI() {
      if (this.conditionsItem.beginDate == "" || this.conditionsItem.beginDate == null) {
        this.checkItem("beginDateCI", "开始时间不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("beginDateCI");
        }, 1000);
      } else {
        this.clearCheck("beginDateCI");
      }
    },
    checkEndDateCI() {
      if (this.conditionsItem.endDate == "" || this.conditionsItem.endDate == null) {
        this.checkItem("endDateCI", "结束时间不能为空！");
        let _this = this;
        setTimeout(function () {
          _this.clearCheck("endDateCI");
        }, 1000);
      } else {
        this.clearCheck("endDateCI");
      }
    },

    checkItem(Node, txt) {
      let el = $(this.$refs[Node]);
      let top = (el.offset().top) + "px";
      this.Err[Node].flag = true;
      this.Err[Node].top = top;
      this.Err[Node].txt = txt;
    },
    checkOne(Node, txt){
      let el = $(this.$refs[Node]);
      //let top = (el[0].$el + "px";
      let top1 = el[0].$el.offsetParent.offsetTop;
      let top2 = el[0].$el.offsetParent.offsetParent.offsetTop;
      let top3 = el[0].$el.offsetParent.offsetParent.offsetParent.offsetTop;
      let totalTop = top1 + top2 + top3 + "px";
      // console.log(el[0])
      this.Err[Node].flag = true;
      this.Err[Node].top = totalTop;
      this.Err[Node].txt = txt;
    },
    checkTwo(type, Node, txt) {
      let el = $(this.$refs[Node]);
      let top = (el.offset().top) + "px";
      this.Err[type].flag = true;
      this.Err[type].top = top;
      this.Err[type].txt = txt;
    },
    clearCheck(Node) {
      this.Err[Node].flag = false;
    },
    checkForm() {
      let flag = true;
      if (this.Err.isCarHead.check && this.isCarHead === null) {
        this.checkItem("isCarHead", "抓拍方向为必选项！");
        flag = false;
      } else {
        this.clearCheck("isCarHead");
      }
      if (this.Err.vehicleModel.check) {
        if (this.vehicleModel === "不限" || this.vehicleModel === null || this.vehicleModel === "") {
          this.checkItem("vehicleModel", "车辆型号为必选项！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("vehicleModel");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("vehicleModel");
        }
      }

      if (this.Err.vehicleBrand.check) {
        if (this.vehicleBrand === "不限" || this.vehicleBrand === null || this.vehicleBrand == "") {
          this.checkItem("vehicleBrand", "车辆品牌为必选项！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("vehicleBrand");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("vehicleBrand");
        }
      }


      if (this.Err.vehicleKind.check) {
        if (this.vehicleKind === "不限" || this.vehicleKind === null || this.vehicleKind === "") {
          this.checkOne("vehicleKind", "车辆类型为必选项！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("vehicleKind");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("vehicleKind");
        }
      }
      if (this.Err.ModelOrBrand.check) {
        if ((this.vehicleBrand === "不限" || this.vehicleBrand === null || this.vehicleBrand == "") && (this.vehicleModel === "不限" || this.vehicleModel === null || this.vehicleModel == "")) {
          this.checkTwo('ModelOrBrand', "vehicleModel", "车辆品牌与型号至少选一项！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("ModelOrBrand");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("ModelOrBrand");
        }
      }
      if (this.Err.plateNo.check) {
        if (this.platNumArr.length == 0) {
          this.checkItem("plateNo", "车牌号不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("plateNo");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("plateNo");
        }
      }
      // 车牌为空或者为正确车牌
      if (this.$refs.plateNo) {
        let inputValue = this.$refs.plateNo.value.trim();
        if (inputValue != "") {

          let xxreg = /^[A-Z]{1}[A-Z*0-9]{1,5}[A-Z*0-9挂学警港澳]{0,1}$/; //模糊车牌
          if (this.isExactPlateNo) {
            xxreg = /^[A-Z]{1}([A-Z0-9]{5}|[A-Z0-9]{4}[挂学警港澳]{1}|[A-Z0-9]{6})$/; //精确车牌
          }
          if (!xxreg.test(inputValue)) {
            this.checkItem("plateNo", "请正确输入车牌号码！");
            flag = false;
            let _this = this;
            setTimeout(function () {
              _this.clearCheck("plateNo");
            }, 1000);
          }
        }
      }

      // 初次入城排除车牌为空或者为正确车牌
      if (this.$refs.excludePlateNo) {
        let inputValue = this.$refs.excludePlateNo.value.trim();
        if (inputValue != "") {
          let xxreg = /^[A-Z]{1}[A-Z*0-9]{1,5}[A-Z*0-9挂学警港澳]{0,1}$/; //模糊车牌
          if (this.isExactPlateNo) {
            xxreg = /^[A-Z]{1}([A-Z0-9]{5}|[A-Z0-9]{4}[挂学警港澳]{1}|[A-Z0-9]{6})$/; //精确车牌
          }
          if (!xxreg.test(inputValue)) {
            this.checkItem("excludePlateNo", "请正确输入车牌号码！");
            flag = false;
            let _this = this;
            setTimeout(function () {
              _this.clearCheck("excludePlateNo");
            }, 1000);
          }
        }
      }

      //以图搜车车牌号
      if (this.$refs.plateNumber) {
        // let inputValue = this.$refs.plateNumber.value.trim();
        // if(inputValue != ""){
        //   let  xxreg = /^[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新港澳台]{1}[A-Z]{1}([A-Z0-9]{5}[挂学警港澳]{0,1}|[A-Z0-9]{6})$/;   //精确车牌
        //   if (!xxreg.test(inputValue)){
        //     this.checkItem("plateNumber", "请正确输入车牌号码！");
        //     flag = false;
        //     let _this = this;
        //     setTimeout(function(){
        //       _this.clearCheck("plateNumber");
        //     },1000);
        //   }
        // }
      }

      if (this.Err.backdate.check) {
        //let reg  = /^\+?[1-9][0-9]*$/;    //正整数
        if (this.backdate == "" || this.backdate == null) {
          this.checkItem("backdate", "回溯时长不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("backdate");
          }, 1000);
          flag = false;
        } else if (!this.reg.test(this.backdate)) {
          this.checkItem("backdate", "回溯时长为正整数！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("backdate");
          }, 1000);
          flag = false;
        } else if (this.backdate > Number(this.firstCityBackDate.split(",")[1])) {
          this.checkItem("backdate", "回溯时长最长" + this.firstCityBackDate.split(",")[1] + "天！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("backdate");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("backdate");
        }
      }

      if (this.Err.footholdTime.check) {
        //let reg  = /^\+?[1-9][0-9]*$/;    //正整数
        if (this.footholdTime == "" || this.footholdTime == null) {
          this.checkItem("footholdTime", "落脚时长不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("footholdTime");
          }, 1000);
          flag = false;
        } else if (!this.reg.test(this.footholdTime)) {
          this.checkItem("footholdTime", "落脚时长为正整数！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("footholdTime");
          }, 1000);
          flag = false;
        } else if (this.footholdTime > Number(this.footTimeHours.split(",")[1])) {
          this.checkItem("footholdTime", "落脚时长最多" + this.footTimeHours.split(",")[1] + "小时！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("footholdTime");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("footholdTime");
        }
      }

      if (this.Err.passCount.check) {
        //let reg  = /^\+?[1-9][0-9]*$/;    //正整数
        if (this.passCount == "" || this.passCount == null) {
          this.checkItem("passCount", "过车次数不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("passCount");
          }, 1000);
          flag = false;
        } else if (!this.reg.test(this.passCount)) {
          this.checkItem("passCount", "过车次数为正整数！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("passCount");
          }, 1000);
          flag = false;
        } else if (this.passCount < Number(this.frequentlyPassNum.split(",")[0])) {
          this.checkItem("passCount", "过车次数最少" + this.frequentlyPassNum.split(",")[0] + "次！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("passCount");
          }, 1000);
          flag = false;
        } else if (this.passCount > Number(this.frequentlyPassNum.split(",")[1])) {
          this.checkItem("passCount", "过车次数最多" + this.frequentlyPassNum.split(",")[1] + "次！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("passCount");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("passCount");
        }
      }

      if (this.Err.followTime.check) {
        //let reg  = /^\+?[1-9][0-9]*$/;    //正整数
        //let reg=/^[1-9]\d*$/; //不含0正整数
        if (this.followTime === "" || this.followTime === null) {
          this.checkItem("followTime", "跟车时间不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("followTime");
          }, 1000);
          flag = false;
        } else if (!this.reg.test(this.followTime)) {
          this.checkItem("followTime", "跟车时间为正整数！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("followTime");
          }, 1000);
          flag = false;
        } else if (this.followTime > Number(this.followTimes.split(",")[1])) {
          this.checkItem("followTime", "跟车时间最多" + this.followTimes.split(",")[1] + "分钟！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("followTime");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("followTime");
        }
      }

      if (this.Err.followNumber.check) {
        let reg = /^\d+$/;
        if (this.followNumber === "" || this.followNumber === null) {
          this.checkItem("followNumber", "跟车次数不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("followNumber");
          }, 1000);
          flag = false;
        } else if (!reg.test(this.followNumber)) {
          this.checkItem("followNumber", "跟车次数为正整数或0！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("followNumber");
          }, 1000);
          flag = false;
        } else if (this.followNumber < Number(this.followNum.split(",")[0])) {
          this.checkItem("followNumber", "跟车次数最少" + this.followNum.split(",")[0] + "次！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("followNumber");
          }, 1000);
          flag = false;
        } else if (this.followNumber > Number(this.followNum.split(",")[1])) {
          this.checkItem("followNumber", "跟车次数最多" + this.followNum.split(",")[1] + "次！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("followNumber");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("followNumber");
        }
      }

      if (this.Err.beginDateTime.check) {
        if (this.beginDateTime == "" || this.beginDateTime == null) {
          this.checkItem("beginDateTime", "开始时间不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("beginDateTime");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("beginDateTime");
        }
      }

      if (this.Err.endDateTime.check) {
        if (this.endDateTime == "" || this.endDateTime == null) {
          this.checkItem("endDateTime", "结束时间不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("endDateTime");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("endDateTime");
        }
      }

      if (this.Err.timeType.check) {
        if (this.timeType) { //timeType  0车辆时段 1循环时段
          if (this.beginDate == null || this.endDate == null || this.beginTime == null || this.endTime == null) {
            this.checkItem("timeType", "请正确输入循环时段！");
            let _this = this;
            setTimeout(function () {
              _this.clearCheck("timeType");
            }, 1000);
            flag = false;
          } else {
            this.clearCheck("timeType");
          }
        } else {
          if (this.beginDateTime == null || this.endDateTime == null) {
            this.checkItem("timeType", "请正确输入车辆时段！");
            let _this = this;
            setTimeout(function () {
              _this.clearCheck("timeType");
            }, 1000);
            flag = false;
          } else {
            this.clearCheck("timeType");
          }
        }
      }

      if (this.Err.beginDateCI.check) {
        if (this.conditionsItem.beginDate == "" || this.conditionsItem.beginDate == null) {
          this.checkItem("beginDateCI", "开始时间不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("beginDateCI");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("beginDateCI");
        }
      }
      if (this.Err.endDateCI.check) {
        if (this.conditionsItem.endDate == "" || this.conditionsItem.endDate == null) {
          this.checkItem("endDateCI", "结束时间不能为空！");
          let _this = this;
          setTimeout(function () {
            _this.clearCheck("endDateCI");
          }, 1000);
          flag = false;
        } else {
          this.clearCheck("endDateCI");
        }
      }


      return flag;
    },
    //清空输入框
    clear(node) {
      switch (node) {
        case "vehicleBrand":
          this.vehicleBrand = null;
          this.vehicleBrandCode = null;
          if (this.vehicleBrandName) {
            this.vehicleBrandName = "不限";
          }
          break;
        case "vehicleModel":
          this.vehicleModel = null;
          this.vehicleModelCode = null;
          break;
        case "plateNo":
          this.$refs.plateNo.value = "";
          break;
        case "excludePlateNo":
          this.$refs.excludePlateNo.value = "";
          break;
        case "beginDateTime":
          this.beginDateTime = null;
          break;
        case "endDateTime":
          this.endDateTime = null;
          break;
        case "beginDate":
          this.beginDate = null;
          break;
        case "endDate":
          this.endDate = null;
          break;
        case "beginTime":
          this.beginTime = null;
          break;
        case "endTime":
          this.endTime = null;
          break;
        case "backdate":
          this.backdate = null;
          break;
        case "footholdTime":
          this.footholdTime = null;
          break;
        case "passCount":
          this.passCount = null;
          break;
        case "followTime":
          this.followTime = null;
          break;
        case "followNumber":
          this.followNumber = null;
          break;
        case "beginDateCI":
          this.conditionsItem.beginDate = null;
          break;
        case "endDateCI":
          this.conditionsItem.endDate = null;
          break;
        default:
          break;
      }
    }

  }
};
export default mixins
