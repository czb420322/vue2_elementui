
export default {
    points:[],//点数组
    allOverlay:[],//创建的marker集合
    //初始化地图
    initMap:function(){
        //初始化地图
        let map  = new BMap.Map("allmap",{enableMapClick:false});//最好是将map设置到vuex中保存起来
        // this.$store.dispatch('mapInit',map);//将map对象放到vuex
        //设置地图中心点和显示级别，坐标可以设置为每个城市点位
        map.centerAndZoom(new BMap.Point(114.26101136, 30.6195223), 13);
        // 设置地图背景色为白色
        map.getContainer().style.background = '#fff';
        //设置滚轮
        map.enableScrollWheelZoom();
        map.addControl(new BMap.ScaleControl({//地图比例尺控件
            anchor:BMAP_ANCHOR_BOTTOM_LEFT
        }));
        //-------显示卫星地图----
        map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP]}));
    },

    //右键地图菜单方法
    onMapRightFun:function(map){
        let menu = new BMap.ContextMenu();//创建一个右键菜单实例
        let txtMenuItem=[
            {
                text:'新增视频',
                callback:function(e){//e返回的是经纬度
                }
            },
            {
                text:'新增车辆',
                callback:function(){}
            },
            {
                text:'新增人脸',
                callback:function(){

                }
            },
            {
                text:'新增RFID',
                callback:function(){}
            }
            ]

        for(let i=0; i<txtMenuItem.length;i++){
            //可以给new BMap.MenuItem()设置第三个参数，可以设置每一个选项的宽度，id等等
            menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,{width:200,id:"dom_"+i}))
        }
        map.addContextMenu(menu);//将右键菜单对象添加到地图中
    },
    onMarkerRightFun:function(){
        var markerMenu=new BMap.ContextMenu();
        markerMenu.addItem(new BMap.MenuItem('删除',removeMarker.bind(marker)));

        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        marker.addContextMenu(markerMenu);
    },


    //根据点位添加标注
    addMarker:function(map){
        let point = new BMap.Point(115.995359, 29.729956);//创建标注所在的点位
        let marker = new BMap.Marker(point);//起点marker
        // let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34));//可以给标注添加自定义图标 new BMap.Size()表示标注尺寸
        map.addOverlay(marker);//将标注添加到地图对象中
    },

    //根据数据显示地图上点位(例如我们后端返回数据)
    addAllMarker:function(map,data){
        let markers=[];
        /**
         * 因为根绝我实际项目中有tab需要切换,所以在每次切换的时候我先删除掉所有marker
         * data:实际项目数据
         */
        this.removeMarker();
        for(let i=0;i<data.length;i++){
          for(let j=0;j<data[i]['apes'].length;j++){
            let p0= data[i]['apes'][j]['longitude']
            let p1= data[i]['apes'][j]['latitude']
            let point = new BMap.Point(p0, p1)
            let marker = new BMap.Marker(point)
            markers.push(marker)
            map.addOverlay(marker)
          }
        }
        this.allOverlay = this.map.getOverlays();
        //创建完maker标注后，可以根据marker创建一个点聚合对象，在地图上显示点聚合
        //let markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers:markers});//点聚合
    },
    //删除所有标注
    removeAllMarker:function(){
        for (let i = 0; i < this.allOverlay.length; i++){
            this.map.removeOverlay(allOverlay[i]);
        }
    },

    //删除指定标注
    removeMarker:function(map,marker){
        map.removeOverlay(marker);
    },

    //自定义画框方法 矩形
    drawRact:function(){
        let drawingManager = new BMapLib.DrawingManager(this.map,{

        })
        /**drawingManager.setDrawingMode()可以接受的参数
         *
         * BMAP_DRAWING_MARKER 画点
           BMAP_DRAWING_CIRCLE 画圆
           BMAP_DRAWING_POLYLINE 画线
           BMAP_DRAWING_POLYGON 画多边形
           BMAP_DRAWING_RECTANGLE 画矩形
         */
        drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE)//设置绘图模式
        drawingManager.open();//开启绘图

        //绘图完成后调用的方法
        drawingManager.addEventListener("rectanglecomplete", function(e, overlay) {
            // console.log(overlay);
            //drawingManager.close()//关闭款选
            //设置框选范围内的点位
            this.getBoundMarker(overlay,this.map);
        });
    },

    drawcircle:function(){
        let drawingManager = new BMapLib.DrawingManager(this.map,{

        })
        // console.log(drawingManager)
        /**drawingManager.setDrawingMode()可以接受的参数
         *
         * BMAP_DRAWING_MARKER 画点
           BMAP_DRAWING_CIRCLE 画圆
           BMAP_DRAWING_POLYLINE 画线
           BMAP_DRAWING_POLYGON 画多边形
           BMAP_DRAWING_RECTANGLE 画矩形
         */
        drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE)//设置绘图模式
        drawingManager.open();//开启绘图

        //绘图完成后调用的方法
        drawingManager.addEventListener("rectanglecomplete", function(e, overlay) {
            // console.log(overlay);
            //drawingManager.close()//关闭款选
            //设置框选范围内的点位
            this.getBoundMarker(overlay,this.map);
        });
    },

    //根据框选出的范围显示框选方位内的标注
    getBoundMarker:function(overlay,map){
        let left_top_point = overlay.ro[0]//矩形框左上角的点
        let right_bottom_point = overlay.ro[2]//矩形框右下角的点
        for(let i=0;i<this.points.length;i++){
            let point = this.points[i]
            // console.log(point['lng']+"!!!"+point['lat'])
            if(left_top_point['lng']<point['lng'] && left_top_point['lat']>point['lat'] && right_bottom_point['lng']>point['lng'] && right_bottom_point['lat']<point['lat']){
                // console.log("tt")
                let point_marker = new BMap.Point(point['lng'], point['lat'])
                let marker = new BMap.Marker(point_marker)
                map.addOverlay(marker)
            }
        }
    },

    //单迎线路轨迹
    runTrack:function(arrPois,map){
        map.addOverlay(new BMap.Polyline(arrPois, { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 }));//轨迹路线
        map.setViewport(arrPois);

        let marker = new BMap.Marker(new BMap.Point(115.995359, 29.729956));//起点marker
        let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34));//地点图标
        marker.setIcon(iconc);
        map.addOverlay(marker); //将标记添加到地图中

        marker = new BMap.Marker(new BMap.Point(115.996167, 29.733806));//终点marker
        iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34));//终点icon
        marker.setIcon(iconc);
        map.addOverlay(marker); //将标记添加到地图中

        //轨迹对象
        let blueCar  = new BMapLib.LuShu(map, arrPois, {
            defaultContent: "", //"从浔阳路到滨江路"
            autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
            icon: new BMap.Icon('/static/images/bcar.png', new BMap.Size(48, 32), { anchor: new BMap.Size(15, 15) }),//运动的图标
            speed: 50,
            landmarkPois: [],
            enableRotation: true //是否设置marker随着道路的走向进行旋转
        });

        blueCar.start();//运行轨迹
        //blueCar.stop();//停止轨迹
    },

    /**
     * 给单个标注添加点击事件
     * 同理给多个标注添加点击事件循环地图中的标注
     */
    addMarkerEvent:function(marker,map){
        // 创建信息窗口对象=>可以自定义里面内容
        let infoWindow = new BMap.InfoWindow("<a href='wwww.baidu.com'>地址：武汉市高科大厦</a>", _this.opts);
        map.addOverlay(marker); //将标记添加到地图中
        marker.addEventListener("click",function(){
            map.openInfoWindow(infoWindow,new BMap.Point(115.998489, 29.729970)); //开启信息窗口,点是标注point
        });
    },


}
