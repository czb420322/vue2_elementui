<template>
    <div>
      <div class="cover"></div>
      <div class="cont">
        <div class="title">
            <div>编辑设备</div>
          <div class="close" @click="closeDeviceEmit">X</div>
        </div>
        <div class="form_content">
          <div class="item">
            <div class="item_content">
              设备名称：<input type="text" v-model='deviceName' value="1236" placeholder="请输入设备名称"/>
            </div>
            <!-- <div class="item_content">
              设备位置：<input type="text" v-model="devicePosition" />
            </div> -->
            <div class="item_content">
              设备位置：
              <Province />
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              设备厂家：<input type="text" v-model="deviceFactory" placeholder="请输入厂家名称"/>
            </div>
            <div class="item_content">
              用户名称：<input type="text" v-model="userName" placeholder="请输入用户名称"/>
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              设备型号：<input type="text" v-model="deviceModel" placeholder="请输入设备型号"/>
            </div>
            <div class="item_content">
              用户密码：<input type="text" v-model="password" placeholder="请输入用户密码"/>
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              设备IP&nbsp;&nbsp;：<input type="text" v-model="deviceIP" placeholder="请输入设备Ip"/>
            </div>
            <div class="item_content">
              设备端口：<input type="text" v-model="devicePort" placeholder="请输入设备端口"/>
            </div>
          </div>
        </div>


        <div class="submit">
          <div class="sure" @click='editDevice'>确定</div>
          <div class="cancel">取消</div>
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
        'deviceEmit',
        'map',
        'point',
        'deviceType',
        'videoList',
        'ok',
        'markerData'
      ]),

    },
    methods:{
      ...mapActions([
        'updateDeviceVideoData',
        'updateDeviceFaceData',
        'isDeviceEmit'
      ]),
      ...mapMutations([

      ]),
      onRightMapFun:function(marker){
        let _this = this
        let markerMenu=new BMap.ContextMenu();
        let txtMenuItem= [
          {
            text:'编辑视频设备',
            callback:function(e,ee,marker){
              let id = marker.id;
              _this.$store.dispatch('changeOK');
              // _this.$store.dispatch('isDeviceEmit')
              _this.$store.dispatch('setMarkerData',marker['data'])
              console.log(_this.markerData)
              console.log(ee)
              console.log(marker)

              _this.deviceName=_this.markerData['name'];
              // devicePosition:'',
              // deviceFactory:'',
              // userName:'',
              _this.deviceModel=_this.markerData['mode'];
              // password:'',
              _this.deviceIP=_this.markerData['ipAddr'],
              // devicePort:'',
              _this.devicePort=_this.markerData['port'];
              // deviceItem:'',
              // createTime:'',
              // popedom:'',
              // copyrightTime:'',
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
              let id = marker.id;
              console.log(id);
              _this.$confirm('此操作将永久删除视频设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                console.log(99)
                console.log(id)
                _this.deleteMarker(id);
                console.log(11);

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
      closeDeviceEmit:function(){
        this.$store.dispatch('isDeviceEmit');
        console.log(this.isDeviceEmit)
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
        if(this.deviceType==12){
          url = '/sms/ape/selectByVideo';
        }else if(this.deviceType==20){
          url = '/sms/ape/selectByPortrait'
        }
       this.$http.post(url).then(res=>{
          if(res.data!=null && res.data.code==200){
            this.videodata = res.data.data
            this.queryPoint(this.videodata)
          }
        })

      },
      addMarker:function(point){
        let that = this;
        let point1 = new BMap.Point(point["lng"], point["lat"])
        // console.log(index)
        that.infoShow=false;
        let myIcon;
          myIcon = new BMap.Icon(faceIco,new BMap.Size(33, 36),{})
        // }
        let marker = new BMap.Marker(point1, {icon: myIcon});
        // that.map.centerAndZoom(point, 11);
        that.map.addOverlay(marker);
        // that.addInfoWindow(marker,point);
        let allOverlay = this.map.getOverlays();
        // let markerClusterer = new BMapLib.MarkerClusterer(that.map, {markers:allOverlay});
        that.$store.dispatch('isDeviceEmit')
      },
      editDevice:function(){},
      addDevice:function(){
        let _this = this;
        console.log(this.deviceType);
        let type = 0;
        if(this.deviceType==12){
          type = 0
        }else if(this.deviceType==20){
          type=1
        }

        console.log(type)
        let data={
          name:this.deviceName,//名称
          model:this.deviceModel,//型号
          ipAddr:this.deviceIP,//IP地址
          // ipv6Addr:'';//IPv6地址
          port:this.devicePort,//端口号
          longitude:this.point['lng'],//经度
          latitude:this.point['lat'],//纬度
          placeCode:123,//安装地点行政区划代码
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
          _this.$store.dispatch('isDeviceEmit');
          if(res.data.code==200){
            this.isDeviceEmit();
            console.log(this.deviceType)
            this.addMarker(this.point);

            //更新videoList
            if(this.deviceType==12){
              // url = '/sys/ape/selectByVideo';
              this.updateDeviceVideoData().then(res=>{
                // this.videoList = res.data.data;
              });
            }else if(this.deviceType==20){
              // url = '/sys/ape/selectByPortrait'
              this.updateDeviceFaceData().then(res=>{
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
