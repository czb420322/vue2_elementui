let RFIDIco = require("@/assets/images/device/RFID.png");
const mixins = {
  data: function () {
    return {
      defaultProps: {
        children: "apes",
        label: "name"
      },
      societyData: [],
      mapzoom: sessionStorage.getItem('longitude'), //地图层级
      maplng: sessionStorage.getItem('latitude'), //经纬度
      maplat: sessionStorage.getItem('bmapLevel'),
      filterText:''
    }
  },
   watch: {
    filterText(val) {
       this.$refs.tree.filter(val);
     }
   },
  methods: {
    //树的查询
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //加载地图
     _initMap() {
       let map = new BMap.Map('allmap', {
         enableMapClick: false
       })
       map.centerAndZoom(new BMap.Point(this.maplng, this.maplat), this.mapzoom);
       map.enableScrollWheelZoom() //设置滚轮
       map.disableContinuousZoom(); //禁止连续缩放
       map.addControl(new BMap.ScaleControl({ // 地图比例尺控件
         offset: new BMap.Size(10, 50)
       }))
       map.addControl(new BMap.NavigationControl({
         anchor: BMAP_ANCHOR_TOP_RIGHT
       }))
       //地图的缩略图
       this.map.addControl(new BMap.OverviewMapControl({
         isOpen: true,
         anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
         size: new BMap.Size(250, 180)
       }))
       // 给当前地点添加经纬度
       map.addEventListener('mousemove', (e) => {
         this.point = e.point
       })
     },
    // 社会面
    querySocietyData() {
      this.$http.post("/sms/ape/selectBySociety").then(res => {
        if (res.data.code === 200) {
          this.societyData = res.data.data;
          this.createNormMarker(this.societyData, RFIDIco)
        }
      });
    },
    //创建点位
    createNormMarker(data, img) {
      this.removeMarker()
      let markers = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i]["apes"].length; j++) {
          // ((x) => {
          var p0 = data[i]["apes"][j]["longitude"];
          var p1 = data[i]["apes"][j]["latitude"];
          var point = new BMap.Point(p0, p1);
          var myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
          var marker = new BMap.Marker(point, {
            // offset: new BMap.Size(0, -20),
            icon: myIcon
          });
          marker.id = data[i]["apes"][j]["shebeiId"];
          marker.data = data[i]["apes"][j];
          markers.push(marker);
          this.addNormmarker(marker, point);
          // this.map.addOverlay(marker);
        }
      }
      // 获取所有的点位
      let allOverlay = this.map.getOverlays();
      //创建点位聚合的对象
      if (this.markerClusterer != null) {
        this.markerClusterer.clearMarkers();
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      } else {
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        });
      }
    },
    addNormmarker(marker, point) {
      let opts = {
        width: 200, // 信息窗口宽度
        height: 130, // 信息窗口高度
        title: '视频设备详情' // 信息窗口标题
      }
      let content = `<div>
                      <p>设备名称：${marker.data.name}</p>
                      <p>设备经度：${marker.data.longitude}</p>
                      <p>设备纬度：${marker.data.latitude}</p>
                      <p id="upload">上传视频</p>
                      </div>`
      let infoWindow = new BMap.InfoWindow(content, opts)
      marker.addEventListener('click', () => {
        this.map.openInfoWindow(infoWindow, point) //开启信息窗口
        var upload = document.getElementById('upload')
        upload.onclick = () => {
          sessionStorage.setItem('shebeiId', marker.data.shebeiId)
          sessionStorage.setItem('caseUuid', '')
          let url = "http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindows&req=10000000-0000-0000-0000-000000000000";
          let g_socket = document.createElement("script");
          g_socket.src = url;
          document.body.appendChild(g_socket);
        }
      });
    },
    //点击树形结构
    handleNodeClick(data) {
      if (data.longitude == undefined && data.latitude == undefined) {
        return
      } else {
        this.mapzoom = 16
        this.maplng = data.longitude
        this.maplat = data.latitude
        this.getinits();
        let allOverlay = this.map.getOverlays() // 获取当前标注的个数

        var point = new BMap.Point(data.longitude, data.latitude)
        let opts = {
          width: 200, // 信息窗口宽度
          height: 130, // 信息窗口高度
          title: '社会面设备名称' // 信息窗口标题
        }
        //信息内容
        let content = `<div>
                      <p>设备名称6666：${data.name}</p>
                      <p>设备经度：${data.longitude}</p>
                      <p>设备纬度：${data.latitude}</p>
                      <p id="uploads">上传视频</p>
                      </div>`
        let info_Window = new BMap.InfoWindow(content, opts)
        this.map.openInfoWindow(info_Window, point)

        // marker.addEventListener('click', () => {
          var upload = document.getElementById('uploads')
          upload.onclick = () => {
            sessionStorage.setItem('shebeiId', data.shebeiId)
            console.log(data.shebeiId,9999);
            sessionStorage.setItem('caseUuid', '')
            let url = "http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindows&req=10000000-0000-0000-0000-000000000000";
            let g_socket = document.createElement("script");
            g_socket.src = url;
            document.body.appendChild(g_socket);
          }


        for (let i = 0; i < allOverlay.length; i++) {
          if (data.shebeiId === allOverlay[i].id) {
            allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE)
            setTimeout(function () {
              allOverlay[i].setAnimation(null)
            }, 1000)
          }
        }
      }
    },
    getinits(){
      this.InitMainMap('allmap');
      this.createNormMarker(this.societyData, RFIDIco)
    }


  }
};
export default mixins
