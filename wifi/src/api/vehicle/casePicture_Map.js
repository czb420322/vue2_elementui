//地图操作
const mixins = {
  data: function () {
    return {
      lonLeft:'',
      latTop:'',
      lonRight:'',
      latBottom:'',
      markerClusterer: null,  //点位聚合对象
      styleOptions: {
        strokeColor: "red", //边线颜色。
        fillColor: "rgba(255,0,0,.3)", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
      },
      point: {},    //页面底部经纬度
      tollgateIdsArrName:[],  //总体选中的卡口名称列表
      tollArrName: [],  //地图选中的卡口名称列表
      tollTreeArrName: [], // 菜单选中的卡口名称列表

    }
  },

  methods: {
    //创建地图api
    loadcasePictureMap: function () {
      let map = new BMap.Map("mapContent", {enableMapClick: false});
      this.map = map;
      map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
      map.getContainer().style.background = '#fff';
      map.enableScrollWheelZoom();//设置滚轮
      map.disableContinuousZoom(); //禁用连续放大、
      map.addControl(new BMap.ScaleControl({//地图比例尺控件
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
    },
    initCasePicPoint() {
      let _this=this;
      let markers = [];
      let carIco = require('@/assets/images/device/duang.png');
      for (let i = 0; i < this.newpoints.length; i++) {//newpoints写死的数据
        let point = this.newpoints[i];
        let point_marker = new BMap.Point(point['longitude'], point['latitude']);
        var myIcon = new BMap.Icon(carIco, new BMap.Size(33, 36), {});
        var marker = new BMap.Marker(point_marker,{offset:new BMap.Size(0,-20),icon: myIcon});
        //let marker = new BMap.Marker(point_marker);
        markers.push(marker);
        //弹窗对象
        let opts = {
          // title: "<span style='display:inline-block;font-size:0.16rem;color:#606266;font-weight:bold;'>案件详情</span>",
          title:"",
          width:220,
          height:250
        };
        //弹窗内容
        let content = `<div class='mapDialog'>
          <div style="width: 100%;height: 125px;margin-top: 15px;margin-bottom: 5px;"><img style="width: 100%;height: 100%" src="${this.newpoints[i].imgPath}" alt="暂无图片"></div>

          <div class='mapDialogtext'style="font-size:0.14rem;color:#606266;overflow: hidden;white-space:nowrap;text-overflow: ellipsis;">
            <div title="${this.newpoints[i].caseName}"><span>案件名称:</span><span>${this.newpoints[i].caseName}</span></div>
            <div title="${this.newpoints[i].placeFullAddress}"><span>案发详址:</span><span>${this.newpoints[i].placeFullAddress}</span></div>
            <div title="${this.newpoints[i].creatorName}"><span>上传用户:</span><span>${this.newpoints[i].creatorName}</span></div>
            <div title="${this.newpoints[i].createTime}"><span>上传时间:</span><span>${this.newpoints[i].createTime}</span></div>
            <div style="display: flex;text-align: center;width: 100%;justify-content: center;margin-top: 5px;">
                <div id="lookCase_btn" style="width:80px;display: flex;align-items: center;justify-content: center;border-radius: 3px; cursor: pointer; padding:2px 3px; background-color: #67C23A;color:white;margin-right: 20px"><span class="el-icon-view"></span>查看案件</div>
                <div id="sameCase_btn" style="width:80px;display: flex;align-items: center;justify-content: center;border-radius: 3px; cursor: pointer;padding:2px 3px; background-color: #1E9FFF;color:white;margin-left: 20px"><span class="el-icon-search">同类案件</div>
            </div>
          </div>
         </div>`;
        let info_Window = new BMap.InfoWindow(content, opts);
        // this.map.addOverlay(marker);
        marker.disableMassClear();
        marker.addEventListener("click", function () {
          this.openInfoWindow(info_Window);

          document.getElementById("lookCase_btn").addEventListener('click',()=>{
            let caseUuid = _this.newpoints[i].caseUuid;
            // _this.$router.push({
            //   path: '/casestudy/casePicture_look', query: {
            //     caseUuid: caseUuid,
            //     menuCode:200
            //   }
            // });
            let routeData = _this.$router.resolve({ path: '/casestudy/casePicture_look', query: { caseUuid: caseUuid,menuCode: 200}});
            window.open(routeData.href, '_blank');
          });

          document.getElementById("sameCase_btn").addEventListener('click',()=>{
            let params={
              caseUuid: _this.newpoints[i].caseUuid,
              caseCategoryDesc: _this.newpoints[i].caseCategoryDesc,
              pageNum:_this.currentPage,//当前页
              pageSize:_this.pageSize,//当前页结果数量
              orderBy: 'createTime',
              orderType: 'desc'
            };
            sessionStorage.setItem("caseCategoryDesc",_this.newpoints[i].caseCategoryDesc);
            sessionStorage.setItem("caseUuid", _this.newpoints[i].caseUuid);
            let data = _this.$qs.stringify(params);
            _this.sameCase(data);
            _this.showListFlag = true;
            _this.aaaa = true;
            _this.showIconFlag = false;
            _this.showPageFlag = false;
            _this.searchFlag = false;
          })

        });
      }

      //点位聚合对象
      if (this.markerClusterer != null) {//判断markerClusterer对象是否存在
        this.markerClusterer.clearMarkers();
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers});//所有标注创建完以后建立点聚合
      } else {
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers});//所有标注创建完以后建立点聚合
      }
    },

    //绘制矩形
    drawReact: function () {
      let _this = this;
      this.drawingManager = new BMapLib.DrawingManager(this.map, {});
      this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);//设置模式
      this.drawingManager.rectangleOptions = this.styleOptions;
      this.drawingManager.open();//开启绘图
      this.drawingManager.addEventListener("rectanglecomplete", function (e, overlay) {
        _this.overlaycomplete(e);
      });
    },

    //绘制线
    // drawLine: function () {
    //   let _this = this;
    //   this.drawingManager = new BMapLib.DrawingManager(this.map, {});
    //   this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);//设置模式
    //   this.drawingManager.polygonOptions = this.styleOptions;
    //   this.drawingManager.open();//开启绘图
    //   this.drawingManager.addEventListener("polygoncomplete", function (e, overlay) {
    //     _this.polygoncomplete(e,overlay);
    //   });
    // },
    //多边形绘制完成后的回调
    // polygoncomplete: function (e,overlay) {
    //   let polygon = overlay;
    //   for (let i = 0; i < this.newpoints.length; i++) {//newpoints写死的数据
    //     let point = this.newpoints[i];
    //     let point_marker = new BMap.Point(point['longitude'], point['latitude']);
    //     if (BMapLib.GeoUtils.isPointInPolygon(point_marker,polygon)) {
    //       this.tollArr.push(point.kakouId);
    //       this.tollArrName.push(point.name);
    //     }
    //   }
    //   this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
    //   this.tollgateIdsArr = this.uniq(this.tollgateIdsArr);
    //   if(this.defaultTollgate && !this.tollgateIdsArr.length){
    //     this.tollgateIdsArr = this.defaultTollgate;
    //   }
    //   this.tollgateIds =  this.tollgateIdsArr.join(",");
    //   this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
    //   this.tollgateIdsArrName = this.uniq(this.tollgateIdsArrName);
    // },


    // closeDraw: function () {
    //   if (this.drawingManager != null) {
    //     this.drawingManager.close();//关闭绘制
    //   }
    // },

    //清除覆盖物
    clearDrawing: function () {
      this.map.clearOverlays();
      this.initCasePicPoint();
    },
    //矩形绘制完成后的回调
    overlaycomplete: function (e) {
      let left_top_point = e.to[0];//矩形框左上角的点
      let right_bottom_point = e.to[2];//矩形框右下角的点
      this.lonLeft = left_top_point.lng;
      this.latTop = left_top_point.lat;
      this.lonRight = right_bottom_point.lng;
      this.latBottom = right_bottom_point.lat;
      this.getOverlaycomplete()
    },
    getOverlaycomplete(){
      let params = {
        pageNum:this.currentPage,//当前页
        pageSize:this.pageSize,//当前页结果数量
        orderBy: 'createTime',
        orderType: 'desc',
        lonLeft:this.lonLeft,
        latTop:this.latTop,
        lonRight:this.lonRight,
        latBottom:this.latBottom
      };
      let data = this.$qs.stringify(params);
      this.$http({
        url:"pca/search/advanced/mapwar",
        method:"post",
        data:data
      }).then( res=>{
        this.clearDrawing();
        this.radio = "1";
        if(res.statusText==='OK'&& res.data.code==200){
           this.caseList = res.data.data.list;
           this.totalCount = res.data.data.totalCount;//页面总数
           this.currentPage = res.data.data.pageNum;//当前页
           this.pageSize = res.data.data.pageSize;//每页条数
          // this.showListFlag = true;
          // this.showIconFlag = false;
          this.searchFlag = false;
          this.aaaa = false;
          this.getNewpoints();
        }else{
          this.$notify({
            type: 'error',
            message: '获取案件列表失败！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('获取案件列表失败！',{icon:5,title:"消息提示"});
        }

      })
    }
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

    //获取树形结构数据,并显示出来
    // getTreeData: function () {
    //   this.getTollgateList((res) => {
    //     this.treeList = res.data.data;
    //     if(this.defaultTollgate){
    //       this.newpoints.forEach(element => {
    //         this.defaultTollgate.push(element.kakouId);
    //       });
    //       this.tollgateIds =  this.defaultTollgate.join(",");
    //     }
    //     this.initPoint();
    //   });
    // },
    //根据选中的树形点，在地图上添加覆盖物
    // getCheckedNodes(obj1, obj2) {
    //   //this.map.clearOverlays();//清空所有覆盖物
    //   let nodes = obj2.checkedNodes;//获取当前选中节点的数据数组
    //   this.tollTreeArr = [];
    //   this.tollTreeArrName = [];
    //   for (let i = 0; i < nodes.length; i++) {
    //     if (nodes[i].apeTollgates && nodes[i].apeTollgates.length > 0) {//如出现apes说明某个节点上的子节点全部选中
    //       continue;
    //     } else {//否则没有全选
    //       this.tollTreeArr.push(nodes[i].kakouId);
    //       this.tollTreeArrName.push(nodes[i].name);
    //       //let lng = nodes[i]['longitude'];
    //       //let lat = nodes[i]['latitude'];
    //       //let point = new BMap.Point(lng,lat);
    //       //let marker = new BMap.Marker(point);
    //       //this.map.addOverlay(marker);
    //     }
    //   }
    //   this.tollgateIdsArr = this.tollArr.concat(this.tollTreeArr);
    //   this.tollgateIdsArr = this.uniq(this.tollgateIdsArr);
    //   if(this.defaultTollgate && !this.tollgateIdsArr.length){
    //     this.tollgateIdsArr = this.defaultTollgate;
    //   }
    //   this.tollgateIds = this.tollgateIdsArr.join(",");
    //   this.tollgateIdsArrName = this.tollArrName.concat(this.tollTreeArrName);
    //   this.tollgateIdsArrName = this.uniq(this.tollgateIdsArrName);
    // },
    //过滤树形结构
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.name.indexOf(value) !== -1;
    // },

    // toggleBar() {
    //   this.isBar = !this.isBar;
    // },
    // closeBar(e){
    //   let menu = document.getElementsByClassName('menu')[0];
    //   if (this.isBar && !menu.contains(e.target) && e.target.id != "menuImg"){
    //     this.isBar = false;
    //   }
    // },

    //数组去重
    // uniq(array) {
    //   let temp = [];
    //   let index = [];
    //   let l = array.length;
    //   for (let i = 0; i < l; i++) {
    //     for (let j = i + 1; j < l; j++) {
    //       if (array[i] === array[j]) {
    //         i++;
    //         j = i;
    //       }
    //     }
    //     temp.push(array[i]);
    //     index.push(i);
    //   }
    //   return temp;
    // },

    // runLine(arrPoisArr, color) {
    //   let arrPois = [];
    //   for (let i = 0; i < arrPoisArr.length; i++) {
    //     arrPois[i] = new BMap.Point(arrPoisArr[i].longitude, arrPoisArr[i].latitude);
    //   }
    //   //单迎线路轨迹
    //   let _this = this;
    //   _this.map.clearOverlays();
    //   _this.map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: color, strokeWeight: 6, strokeOpacity: 0.5}));
    //   _this.map.setViewport(arrPois);
    //   let marker = new BMap.Marker(arrPois[0]);//起点marker
    //   let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34));//地点图标
    //   marker.setIcon(iconc);
    //   _this.map.addOverlay(marker); //将标记添加到地图中
    //   marker = new BMap.Marker(arrPois[arrPois.length - 1]);//终点marker
    //   iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34));//终点icon
    //   marker.setIcon(iconc);
    //   _this.map.addOverlay(marker); //将标记添加到地图中

    //   //回放
    //   let blueCar = _this.blueCar = new BMapLib.LuShu(_this.map, arrPois, {
    //     defaultContent: "", //"从浔阳路到滨江路"
    //     autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
    //     icon: new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), {anchor: new BMap.Size(15, 15)}),//运动的图标
    //     speed: 500,
    //     landmarkPois: [],
    //     enableRotation: true //是否设置marker随着道路的走向进行旋转
    //   });
    //   // blueCar.start();
    //   this.blueCar.start();
    // }

  }
};
export default mixins
