<template>
    <div>
      <div class="cover"></div>
      <div class="cont">
        <div class="title">
            <div>新增设备</div>
          <div class="close" @click="closeDeviceSubmit">X</div>
        </div>
        <div class="form_content">
          <div class="item">
            <div class="item_content">
              设备名称：<input type="text" v-model='deviceName' value="1236" placeholder="请输入设备名称"/>
            </div>
            <div class="item_content">
              设备端口：<input type="text" v-model="devicePort" placeholder="请输入设备端口"/>
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              用户账号：<input type="text" v-model="userId" placeholder="请输入用户账号"/>
            </div>
             <div class="item_content">
              用户密码：<input type="text" v-model="password" placeholder="请输入用户密码"/>
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              设备型号：<input type="text" v-model="deviceModel" placeholder="请输入设备型号"/>
            </div>
            <div class="item_content">
              设备IP&nbsp;&nbsp;：<input type="text" v-model="deviceIP" placeholder="请输入设备Ip"/>
            </div>
          </div>

          <div class="item_content_1">
            <span>
            设备位置：
            </span>
            <Province />
          </div>
        </div>

        <div class="submit">
          <div class="sure" @click='addDevice'>确定</div>
          <div class="cancel" @click="reset">取消</div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState,mapActions, mapMutations} from 'vuex'
import Province from '@/components/province'
let faceIco = require('../../assets/images/device/face.png')
  export default {
    data(){
      return {
         list:[],
         deviceName:'',
         devicePosition:'',
         deviceFactory:'',
         userName:'',
         deviceModel:'',
         password:'',
         deviceIP:'',
         devicePort:'',
         deviceItem:'',
         createTime:'',
         popedom:'',
         copyrightTime:'',
         userId:''

      }
    },
    created () {

    },
    mounted(){
      // this.queryData();
    },
    components:{
      Province
    },
    computed:{
      ...mapState([
        'deviceSubmit',
        'map',
        'point',
        'deviceType',
        'videoList',
        'faceList',
        'ok',
        'markerData',
        'deviceData',
        'deviceEmit'
      ]),
    },
     watch: {
        deviceEmit () {
          console.log(666666666666666666)
            if(this.deviceEmit){//如果是可编辑。
                console.log('可编辑')
                this.deviceName = this.deviceData['name'];
                this.deviceIP = this.deviceData['ipAddr']
                this.devicePort = this.deviceData['port']
                this.password = this.deviceData['password']
                this.deviceModel = this.deviceData['model']
                this.userId = this.deviceData['userId']
            }else{
                // this.deviceName = this.deviceData['name'];
                // this.deviceIP = this.deviceData['ipAddr']
                // this.devicePort = this.deviceData['port']
                // this.password = this.deviceData['password']
                // this.deviceType = this.deviceData['model']
                // this.userId = this.deviceData['userId']
            };
        }
    },
    methods:{
      ...mapActions([
        'updateDeviceVideoData',
        'updateDeviceFaceData',
        'isDeviceEmit',
        'deviceDataList'
      ]),
      ...mapMutations([

      ]),

      closeDeviceSubmit:function(){
        // console.log(546)
        this.reset();
        this.$store.dispatch('isDeviceSubmit');
        // console.log(987)
      },
      reset:function(){
        this.deviceName = '';
        this.deviceIP = ''
        this.devicePort = ''
        this.password = ''
        this.deviceModel = ''
        this.userId = ''
      },
      queryPoint:function(data){
        let _this = this;
        for(let i=0;i<data.length;i++){
          for(let j=0;j<data[i]['apes'].length;j++){
            let p0= data[i]['apes'][j]['longitude']
            let p1= data[i]['apes'][j]['latitude']
            let point = new BMap.Point(p0, p1)
            let marker = new BMap.Marker(point)
            _this.map.addOverlay(marker)
          }
        }
      },
      //获取数据
      queryData:function(){
        let url = ''
        if(this.deviceType==0){
          url = '/sms/ape/selectByVideo';
        }else if(this.deviceType==2){
          url = '/sms/ape/selectByPortrait'
        }
       this.$http.post(url).then(res=>{
          if(res.data!=null && res.data.code==200){
            this.videodata = res.data.data
            this.queryPoint(this.videodata)
          }
        })

      },
      //右键标注事件
      onRightMarkerFun:function(marker){
          let _this = this
          let markerMenu=new BMap.ContextMenu();
          let txtMenuItem= [
              {
                  text:'编辑视频设备',
                  callback:function(e,ee,marker){
                      let id = marker.id;
                      console.log(marker.data);

                      _this.$store.dispatch('isDeviceEmit',true)
                      _this.$store.dispatch('setMarkerData',marker)
                      console.log(111111)
                      console.log(_this.deviceEmit)
                      console.log(_this.deviceDataList)
                      console.log(111111)
                      if(_this.deviceEmit){//如果是可编辑
                            _this.deviceName = _this.deviceDataList['name'];
                            _this.deviceIP = _this.deviceDataList['ipAddr']
                            _this.devicePort = _this.deviceDataList['port']
                            _this.password = _this.deviceDataList['password']
                            _this.deviceType = _this.deviceDataList['model']
                            _this.userId = _this.deviceDataList['userId']
                      }else{
                        // this.deviceName = this.deviceData['name'];
                        // this.deviceIP = this.deviceData['ipAddr']
                        // this.devicePort = this.deviceData['port']
                        // this.password = this.deviceData['password']
                        // this.deviceType = this.deviceData['model']
                        // this.userId = this.deviceData['userId']
                      };

                      // _this.$store.dispatch('setMarkerData',marker['data'])
                  }
              },
              {
                  text:'移动视频设备',
                  callback:function(e,ee,marker){
                  marker.enableDragging();
                  }
              },
              {
                  text:'删除视频设备',
                  callback:function(e,ee,marker){
                    console.log('ttt')
                    console.log(marker)
                   console.log(marker.id)
                  let id = marker.id;
                  _this.$confirm('此操作将永久删除视频设备, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center: true
                  }).then(() => {

                      _this.deleteMarker(id);
                  }).catch(() => {
                      _this.$message({
                      type: 'info',
                      message: '已取消删除'
                      });
                  });
                  }
              },
          ]
          for(let i=0; i<txtMenuItem.length;i++){
          markerMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback))
          }
          marker.addContextMenu(markerMenu);
      },
      addMarker:function(point){
        let that = this;
        let point1 = new BMap.Point(point["lng"], point["lat"])
        // console.log(index)
        that.infoShow=false;
        let myIcon;
        // if(index==0){
        //   myIcon = new BMap.Icon(videoIco,new BMap.Size(33, 36),{})
        // }else if(index==1){
        //   myIcon = new BMap.Icon(carIco,new BMap.Size(33, 36),{})
        // }else if(index==2){
          myIcon = new BMap.Icon(faceIco,new BMap.Size(33, 36),{})
        // }
        // let marker = new BMap.Marker(point1, {icon: myIcon});
        let marker = new BMap.Marker(point1);
        // that.map.centerAndZoom(point, 11);
        that.map.addOverlay(marker);
        this.onRightMarkerFun(marker)
        // that.addInfoWindow(marker,point);
        let allOverlay = this.map.getOverlays();
        // let markerClusterer = new BMapLib.MarkerClusterer(that.map, {markers:allOverlay});
        that.$store.dispatch('isDeviceEmit')
      },

      //移除标注,并且右侧树形点位同时移除
        deleteMarker:function(id){
            this.$http.post('/sms/ape/delete/'+id).then(res=>{
                if(this.deviceType==0){
                    this.queryVideoData();
                }else if(this.deviceType==2){
                    this.queryFaceData();
                }
                if(res.data.code==200){
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                }
            })
        },

        //查询视频数据
        queryVideoData:function(){
            this.updateDeviceVideoData().then(res=>{

                this.createMarker(this.videoList)//根据树形结构数据在地图上创建点位
                console.log(this.videoList)
            });
        },

        //人像设备类型树
        qureyFaceListTree:function(){
            this.updateDeviceFaceData().then(res=>{
                this.createMarker(this.faceList)//在地图上创建点位
            })
        },
        //删除所有标注
        removeMarker:function(){
            let allOverlay = this.map.getOverlays();
            for (let i = 0; i < allOverlay.length; i++){
                this.map.removeOverlay(allOverlay[i]);
            }
        },
        //根据data创建标注
        createMarker:function(data){
          console.log('gg')
          console.log(data)
            let markers=[];
            let _this = this;
            _this.removeMarker();//先删除地图所有标注
            for(let i=0;i<data.length;i++){
                for(let j=0;j<data[i]['apes'].length;j++){
                    let p0= data[i]['apes'][j]['longitude']
                    let p1= data[i]['apes'][j]['latitude']
                    let point = new BMap.Point(p0, p1)
                    let marker = new BMap.Marker(point)
                    marker.id = data[i]['apes'][j]['shebeiId']
                    marker.data = data[i]['apes'][j];
                    markers.push(marker)

                    this.onRightMarkerFun(marker);//标注右键事件
                    this.addAllMarkerClick(marker,point);
                    _this.map.addOverlay(marker);//添加标注到地图上
                }
            }
            let allOverlay = this.map.getOverlays();
            let markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers:markers});//所有标注创建完以后建立点聚合
        },
      addAllMarkerClick:function(marker,point){
            let that = this;
            var opts = {
            width : 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : "BIGEMAP" , // 信息窗口标题
            };
            // 创建信息窗口对象
            var infoWindow = new BMap.InfoWindow("地址：武汉大千信息", opts);
            marker.addEventListener("click", function(){
                that.map.openInfoWindow(infoWindow,point); //开启信息窗口
            });
        },
      addDevice:function(){

        let _this = this;
        console.log(this.deviceType);
        let type = 0;
        if(this.deviceType==0){
          type = 0
        }else if(this.deviceType==2){
          type=1
        }

        let data={
          name:this.deviceName,//名称
          model:this.deviceModel,//型号
          ipAddr:this.deviceIP,//IP地址
          // ipv6Addr:'';//IPv6地址
          port:this.devicePort,//端口号
          longitude:this.point['lng'],//经度
          latitude:this.point['lat'],//纬度
          placeCode:420112,//安装地点行政区划代码
          place:'aaa',//位置名
          // orgCode;管辖单位代码
          // capDirection;车辆抓拍方向;0.拍车头;1.拍车尾
          // monitorDirection;车道方向;字典数据HDirectionType
          // monitorAreaDesc:'',监视区域说明
          // isOnline;//是否在线;1.在线;2.离线;9.其他
          // ownerApsId:'';所属采集系统
          // userId;
          // password:this.password,
          apeType:type,//设备类型 0.视频 ,1.人像
          isSociety:0//是否社会类0.否,1是
        }
        // this.$store.dispatch('isDeviceEmit');
        // console.log(this.deviceEmit)
        // return;
        data = this.$qs.stringify(data);
        this.$http.post('/sms/ape/add',data).then(res=>{
          _this.$store.dispatch('isDeviceSubmit');
          if(res.data.code==200){
            this.isDeviceEmit();
            // console.log(this.deviceType)
            this.addMarker(this.point);

            //更新videoList
            if(this.deviceType==0){
              // url = '/sys/ape/selectByVideo';
              this.updateDeviceVideoData().then(res=>{
                // console.log(this.deviceType+"ggggggggggggggggggg")
                // console.log()
                this.createMarker(this.videoList)
                // this.videoList = res.data.data;
                // location.reload()
              });
            }else if(this.deviceType==2){
              // url = '/sys/ape/selectByPortrait'

              this.updateDeviceFaceData().then(res=>{
                this.createMarker(this.faceList)
                console.log("更新人脸")
                // this.videoList = res.data.data;
              });
            }
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.cover{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#000;
    opacity:0.5;
    z-index: 9999;
  }

.cont{
  width: 800px;
  height: 500px;
  background:white;
  left: 50%;
  margin-left: -400px;
  top:12.5%;
  // margin-top: 250px;
  position: absolute;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  .title{
    display: flex;
    justify-content: space-between;
    height: 55px;
    background: #f3f6f8;
    align-items: center;
    padding: 10px;
    .close{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .form_content{
    display: flex;
    flex-direction: column;
    height: 360px;
    border-bottom: 1px solid gray;
    justify-content: space-around;
    .item{
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      input{
        width: 240px;
        height: 30px;
      }
    }
    .item_content_1{

        display: flex;
        position: relative;
        margin-left: 48px;
        span{
          font-size: 14px;
        }
      }
  }
  .submit{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    // background: green;
    .sure{
      width: 140px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #409eff;
      /*font-size: white;*/
      border: 1px solid #d5dade;
      border-radius: 5px;
    }
    .cancel{
      width: 140px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid gray;
      border-radius: 5px;
      margin-left: 48px;
    }
  }
}
</style>
