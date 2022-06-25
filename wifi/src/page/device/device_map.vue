<template>
    <div class="main">
      <DeviceSubmit v-show="deviceEmit"/>
      <DeviceEdit  v-show="ok"/>
      <div  class="mapContent" id="allmap">
      </div>
    </div>
</template>

<script>
// import '@/common/js/apiv.2.0.js'
import { mapState,mapActions } from 'vuex'
import DeviceSubmit from './device_submit.vue'
import DeviceEdit from './device_edit.vue'
let imgIco = require('@/assets/circle_03.png');
let videoIco = require('@/assets/images/device/video.png')  //视频点位图片
let carIco = require('@/assets/images/device/car.png')   //车辆图片
let faceIco = require('@/assets/images/device/face.png')  //人脸点位图片
let RFIDIco = require('@/assets/images/device/RFID.png')  //RFID ICOn
let util = require("util")
  export default {
    data(){
      return {
        list:[],
        // map:{},//地图实例
        pop:'',//overlay实例
        coords:'',//右击事件时的位置
        master:'',
        master1:'',
        infoShow:false,
        point:{x:'',y:''},//店家鼠标右键，保存point
        overlays:[],
        styleOptions:{
          strokeColor:"red",    //边线颜色。
          fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        },
        blueCar:{},
        arrPois :[
            new BMap.Point(115.995359, 29.729956),
            new BMap.Point(115.995116, 29.731101),
            new BMap.Point(115.993688, 29.731069),
            new BMap.Point(115.993104, 29.731054),
            new BMap.Point(115.992907, 29.731626),
            new BMap.Point(115.993455, 29.73194),
            new BMap.Point(115.994299, 29.732481),
            new BMap.Point(115.995188, 29.733218),
            new BMap.Point(115.996167, 29.733806)
          ],
        opts : {
            width : 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : "BIGEMAP" , // 信息窗口标题
        },
        points:[
          new BMap.Point(115.995359, 29.729956),
          new BMap.Point(115.995116, 29.731101),
          new BMap.Point(115.993688, 29.731069),
          new BMap.Point(115.993104, 29.731054),
          new BMap.Point(115.992907, 29.731626),
          new BMap.Point(115.993455, 29.73194),
          new BMap.Point(115.994299, 29.732481),
          new BMap.Point(115.995188, 29.733218),
          new BMap.Point(115.996167, 29.733806)
        ],
        isCount:0,
        newpoints:[
          {lng:115.995359,lat:29.729956},
          {lng:115.995116,lat:29.731101},
          {lng:115.993688,lat:29.731069},
          {lng:115.993104,lat:29.731054},
          {lng:115.992907,lat:29.731626},
          {lng:115.993455,lat:29.73194},
          // {lng:115.995359,lat:29.729956},
        ]
      }
    },

    created () {

    },
    mounted(){
      this._initMap();
    },
    components:{
      DeviceSubmit,DeviceEdit,
    },
    computed:{
      ...mapState([
        'deviceType',
        'deviceEmit',
        'map',
        'videoList',
        'ok'
      ])
    },
    methods:{
      ...mapActions([
        'mapInit',
      ]),
      open2() {
        this.$confirm('此操作将无法恢复!!, 请确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    //停止轨迹
    stop:function(){
      this.blueCar.stop();
    },
    //运行轨迹
    runcar:function(){
      this.blueCar.start();
    },

    run:function(arrPois){
          //单迎线路轨迹
          let _this = this
          _this.map.addOverlay(new BMap.Polyline(arrPois, { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 }));
          _this.map.setViewport(arrPois);
          let marker = new BMap.Marker(new BMap.Point(115.995359, 29.729956));//起点marker
          let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34));//地点图标
          marker.setIcon(iconc);
          _this.map.addOverlay(marker); //将标记添加到地图中
          marker = new BMap.Marker(new BMap.Point(115.996167, 29.733806));//终点marker
          iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34));//终点icon
          marker.setIcon(iconc);
          _this.map.addOverlay(marker); //将标记添加到地图中

          let blueCar =  _this.blueCar = new BMapLib.LuShu(_this.map, arrPois, {
              defaultContent: "", //"从浔阳路到滨江路"
              autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
              icon: new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), { anchor: new BMap.Size(15, 15) }),//运动的图标
              speed: 50,
              landmarkPois: [],
              enableRotation: true //是否设置marker随着道路的走向进行旋转
          });
          // console.log(_this.blueCar)
          // blueCar.start();
          this.blueCar.start();
      },
      //右键地图菜单方法
      onRightFun:function(map){
        let _this = this;
        let menu = new BMap.ContextMenu();
        // console.log(menu)
        let txtMenuItem=[
            {
              text:'新增视频',
              callback:function(e){
                // map.zoomIn()
                // let that = this;
                console.log(11)
                console.log(e)
                console.log(11)
                _this.infoShow=false;
                // console.log(_this.point)
                let point = new BMap.Point(_this.point["lng"], _this.point["lat"])
                // console.log(_this.map)
                _this.infoShow=false;

                let myIcon = new BMap.Icon(videoIco,new BMap.Size(33, 36),{})
                // let marker = new BMap.Marker(point, {icon: myIcon});
                let marker = new BMap.Marker(point);
                // that.map.centerAndZoom(point, 11);
                // _this.map.addOverlay(marker);
                // that.addInfoWindow(marker,point);

                // that.map.removeEventListener("rightclick",function(){
                //   })
                _this.$store.dispatch('isDeviceEmit')
              }
            },
            {
              text:'新增车辆',
              callback:function(){}
            },
            {
              text:'新增人脸',
              callback:function(){
                let point = new BMap.Point(_this.point["lng"], _this.point["lat"])
                _this.infoShow=false;

                let myIcon = new BMap.Icon(faceIco,new BMap.Size(33, 36),{})
                // let marker = new BMap.Marker(point, {icon: myIcon});
                let marker = new BMap.Marker(point,{icon: myIcon});
                _this.$store.dispatch('isDeviceEmit')
              }
            },
            {
              text:'新增RFID',
              callback:function(){}
            }
          ]

        for(let i=0; i<txtMenuItem.length;i++){
          menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,{width:200,id:"dom_"+i}))
        }
        map.addContextMenu(menu)
      },

	  overlaycomplete:function(e){
        // console.log("12345987")
        that.overlays.push(e.overlay);
    },
    //获取标注(根据点位获取标注)
   getMarker:function(points){
     let _this = this
     for(let i=0;i<points.length;i++){
       let marker = new BMap.Marker(points[i])
       _this.map.addOverlay(marker)
      // _this.$store.state.map.addOverlay(marker)
     }
   },
    // 清除绘制结果
    clearAll:function() {
      for(var i = 0; i < overlays.length; i++){
              map.removeOverlay(overlays[i]);
          }
          that.overlays.length = 0
      },

      //新增设备弹层
      openDeviceEmit:function(){
        let that = this;
        that.infoShow=false;
        let point = new BMap.Point(that.point["lng"], that.point["lat"])
        this.$store.dispatch('isDeviceEmit')
      },
      //添加标注
      addMarker:function(index){
        let that = this;
        let point = new BMap.Point(that.point["lng"], that.point["lat"])
        // console.log(index)
        that.infoShow=false;
        let myIcon;
        if(index==0){
          myIcon = new BMap.Icon(videoIco,new BMap.Size(33, 36),{})
        }else if(index==1){
          myIcon = new BMap.Icon(carIco,new BMap.Size(33, 36),{})
        }else if(index==2){
          myIcon = new BMap.Icon(faceIco,new BMap.Size(33, 36),{})
        }
        let marker = new BMap.Marker(point, {icon: myIcon});
        // that.map.centerAndZoom(point, 11);
        that.map.addOverlay(marker);
        that.addInfoWindow(marker,point);

        that.map.removeEventListener("rightclick",function(){
          })
      },
      //添加窗口信息(鼠标右键)
      addInfoWindow:function(marker,point){
        let that = this;
        var opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : "BIGEMAP" , // 信息窗口标题
        };
        // 创建信息窗口对象
        var infoWindow = new BMap.InfoWindow("地址：成都市高新区美年广场C座1015", opts);
        marker.addEventListener("click", function(){
          that.map.openInfoWindow(infoWindow,point); //开启信息窗口
        });
      },
      //给标注添加点击事件，弹出信息窗口(单个标注)
      createInfoWindow:function(marker1){
        let _this = this;
        // 创建信息窗口对象
          let infoWindow = new BMap.InfoWindow("<a href='wwww.baidu.com'>地址：武汉市高科大厦</a>", _this.opts);
          // let marker1 = new BMap.Marker(new BMap.Point(115.998489, 29.729970));//起点marker
          _this.map.addOverlay(marker1); //将标记添加到地图中
          marker1.addEventListener("click",function(){
            _this.map.openInfoWindow(infoWindow,new BMap.Point(115.998489, 29.729970)); //开启信息窗口
          });
      },

      getBoundMarker:function(map,obj){
        // var circle = new BMap.Circle(point, 1000000, {
        //   fillColor: "blue",
        //   strokeWeight: 1,
        //   fillOpacity: 0.1,
        //   strokeOpacity: 0.6
        // });
        // map.addOverlay(circle);
        let _this = this;
        var bounds = map.getBounds();
        var sw = bounds.getSouthWest();
        var ne = bounds.getNorthEast();
        var lngSpan = Math.abs(sw.lng - ne.lng);
        var latSpan = Math.abs(ne.lat - sw.lat);

        for (var i = 0; i <_this.points.length ; i++) {
            var point_ = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
            // addMarker(point_);
            if (BMapLib.GeoUtils.isPointInCircle(point_, obj)) {
                _this.isCount++;
            }
        }
        // document.getElementById('showCount').innerHTML = "圆内点个数为：" + isCount;

        function addMarker(point) {
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
        }
      },
      //自定义画框方法
      setRact:function(){
        console.log("react")
        let drawingManager = new BMapLib.DrawingManager(this.map,{
          drawingTypes : [
            BMAP_DRAWING_RECTANGLE
         ]
        })
        console.log(drawingManager)

        drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE)
        drawingManager.open();
        drawingManager.addEventListener("rectanglecomplete", function(e, overlay) {
            console.log(e)
            console.log(overlay);
        });
      },
      //初始化地图
      _initMap:function(){
        let _this = this
        //初始化地图对象
        let map = new BMap.Map("allmap", {enableMapClick:false});
        // let map  = new BMap.Map("allmap");
        this.$store.dispatch('mapInit',map)

        map.centerAndZoom(new BMap.Point(116.004303, 29.736834), 16);
        // map.centerAndZoom(new BMap.Point(114.26101136, 30.6195223), 13);
        // 设置地图背景色为白色
        map.getContainer().style.background = '#fff';
        // var point = new BMap.Point(104.074362,36.540276);
        // map.centerAndZoom(point, 5.0);//设置地图比例尺
        map.enableScrollWheelZoom();//设置滚轮
        map.addControl(new BMap.ScaleControl({//地图比例尺控件
            anchor:BMAP_ANCHOR_BOTTOM_LEFT
        }));
        //-------显示卫星地图----
        map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP]}));

        map.addEventListener("rightclick",function(e){
          //  console.log(e)
          //  _this.point = e.point;
          console.log(_this.videoList)

           _this.$store.dispatch('getPoint',e.point)
        })

        var overlays = [];
        //绘制完成后的调用方法,框选方法，根据坐标判断，然后创建框选范围的标注
        let overlaycomplete = function(e){
              console.log(e.overlay)
              drawingManager.close()
              if(e.drawingMode=='rectangle'){
                let left_top_point = e.overlay.ro[0]//矩形框左上角的点
                let right_bottom_point = e.overlay.ro[2]//矩形框右下角的点
                // console.log(left_top_point)
                // console.log(right_bottom_point)
                // console.log(_this.point[0])
                for(let i=0;i<_this.newpoints.length;i++){
                  let point = _this.newpoints[i]
                  console.log(point['lng']+"!!!"+point['lat'])
                  if(left_top_point['lng']<point['lng'] && left_top_point['lat']>point['lat'] && right_bottom_point['lng']>point['lng'] && right_bottom_point['lat']<point['lat']){
                    // console.log("tt")
                    let point_marker = new BMap.Point(point['lng'], point['lat'])
                    let marker = new BMap.Marker(point_marker)
                    _this.map.addOverlay(marker)
                  }
                }
              }
          };



        //实例化鼠标绘制工具
        let drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            enableCalculate: true, //开启测量面积、距离
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_LEFT, //位置
                offset: new BMap.Size(100, 100), //偏离值  工具偏离值
            },
            // circleOptions: _this.styleOptions, //圆的样式
            polylineOptions: _this.styleOptions, //线的样式
            polygonOptions: _this.styleOptions, //多边形的样式
            rectangleOptions: _this.styleOptions //矩形的样式
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        // 清除绘制结果
        function clearAll() {
          for(var i = 0; i < overlays.length; i++){
                map.removeOverlay(overlays[i]);
            }
            overlays.length = 0
        }

        //创建轨迹对象
        let blueCar =  _this.blueCar = new BMapLib.LuShu(map, _this.arrPois, {
              defaultContent: "", //"从浔阳路到滨江路"
              autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
              icon: new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), { anchor: new BMap.Size(15, 15) }),//运动的图标
              speed: 50,
              landmarkPois: [],
              enableRotation: true //是否设置marker随着道路的走向进行旋转
          });


        let marker1 = new BMap.Marker(new BMap.Point(115.998489, 29.729970));//起点marker
        // _this.createInfoWindow(marker1);
        //调用轨迹方法
        // _this.run(_this.arrPois);
        // _this.runcar()
        //右键地图
        _this.onRightFun(map);
        //根据点位获取标注
        // _this.getMarker(_this.points)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
  // display: flex;
  height: 1000px;
  width: 100%;
  position: relative;
  .mapContent{
    // display: flex;
    // height: 850px;
    height: 850px;
    left: 430px;
    width: 100%;
  }
  .cartPort{
    position: absolute;
    height: 120px;
    width: 110px;
    background: red;
    left: 0px;
    top: 0px;
    // z-index: 10000;
    ul{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background: green;
      height: 100%;
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;

      }
      li:hover{
        background: yellow;
      }
    }
  }
}
.draw{
  width: 30px;
  height: 30px;
  background: green;
}
#dom_0:hover{
  background: red;
}
#dom_1:hover{
  background: red;
}
#dom_2:hover{
  background: red;
}
#dom_3:hover{
  background: red;
}
</style>
