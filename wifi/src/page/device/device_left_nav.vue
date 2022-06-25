<template>
  <div>
    <div class="device_nav">
      <!-- <div class="device_cont"> -->
        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 视频{{deviceType}}</span>
            <div class="ss">
              <span>视频设备：</span>
              <el-input v-model="filterText" placeholder="请输入视频设备">
                <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button>
              </el-input>
            </div>
            <div class="device_tree">
              <el-tree :data="this.videoList" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" default-expand-all ref="tree2"></el-tree>
            </div>
          </el-tab-pane>

          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 车辆{{deviceType}}</span>
            <div class="ss">
              <span>车辆设备：</span>
              <el-input v-model="filterText" placeholder="请输入车辆设备">
                <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button>
              </el-input>
            </div>
            <div class="device_tree">
              <el-tree :data="cardata" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" default-expand-all ref="tree3"></el-tree>
            </div>
          </el-tab-pane>


          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 人像{{deviceType}}</span>
            <div class="ss">
              <span>人像设备：</span>
              <el-input v-model="filterText" placeholder="请输入人像设备">
                <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button>
              </el-input>
            </div>
            <div class="device_tree">
              <el-tree :data="faceList" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" default-expand-all ref="tree3"></el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="RFID">社会面{{deviceType}}</el-tab-pane>
        </el-tabs>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
  export default {
    data(){
     return {
        filterText:'',
        // videodata: [],
        facedata:[],
        cardata:[],
        defaultProps: {
          children: 'apes',
          label: 'name'
        }
      };
    },
    created () {
    //  console.log(this.currentUser)
    },
    mounted(){
      //获取左侧树形结构数据
      this.updateDeviceVideoData().then(res=>{
        this.createMarker(this.videoList)//根据树形结构数据在地图上创建点位
      });
    },
    components:{

    },
    computed:{
      ...mapState([
        'deviceType',
        'map',
        'videoList',
        'faceList',
        'ok',
        'markerData',
        'deviceEmit'
      ])
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods:{
      ...mapActions([
        'updateDeviceVideoData',
        'updateDeviceFaceData'
      ]),
       open6:function() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
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
      //搜索方法
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //点击切换tab,改变设备类型
      handleClick(tab, event) {
        this.$store.dispatch('changeDeviceType',tab['_uid'])
        if(tab['_uid']==12){
          this.getVideoListTree();
        }else if(tab['_uid']==20){
          this.getFaceListTree();
        }
      },
      //点击左侧树形点位，移动地图
      handleNodeClick(data) {
        let lng = data['longitude']
        let lat = data['latitude']
        this.map.centerAndZoom(new BMap.Point(lng, lat), 16);
      },
      //树形结构数据方法
     getVideoListTree(){
      this.updateDeviceVideoData().then(res=>{
        this.createMarker(this.videoList)//根据树形结构数据在地图上创建点位
      });
     },
      //人像设备类型树
      getFaceListTree:function(){
        // this.$http.post('/sms/ape/selectByPortrait').then(res=>{
        //   if(res.data!=null && res.data.code==200){
        //     this.facedata = res.data.data
        //     this.createMarker(this.facedata)//在地图上创建点位
        //   }
        // })
        this.updateDeviceFaceData().then(res=>{
          this.createMarker(this.faceList)//在地图上创建点位
        })

      },

       //车辆
      getCarListTree:function(){
        this.$http.post('/sms/apeTollgate/search').then(res=>{
          if(res.data!=null && res.data.code==200){
            this.cardata = res.data.data
          }
        })
      },

      //根据data创建标注
      createMarker:function(data){
        let markers=[];
        let _this = this;
        this.removeMarker();//先删除地图所有标注
        for(let i=0;i<data.length;i++){
          for(let j=0;j<data[i]['apes'].length;j++){
            let p0= data[i]['apes'][j]['longitude']
            let p1= data[i]['apes'][j]['latitude']
            let point = new BMap.Point(p0, p1)
            let marker = new BMap.Marker(point)
            marker.id = data[i]['apes'][j]['shebeiId']
            marker.data = data[i]['apes'][j];
            this.onRightMapFun(marker)
            markers.push(markers)
            _this.map.addOverlay(marker)
          }
        }
        let allOverlay = this.map.getOverlays();
        // let markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers:markers});//点聚合
      },
      //删除所有标注
      removeMarker:function(){
        let allOverlay = this.map.getOverlays();
        // console.log(allOverlay.length+'bbcc')
        for (let i = 0; i < allOverlay.length; i++){
            // console.log(i)
            this.map.removeOverlay(allOverlay[i]);
        }
      },
      onRightMapFun:function(marker){
        let _this = this
        let markerMenu=new BMap.ContextMenu();
        let txtMenuItem= [
          {
            text:'编辑视频设备',
            callback:function(e,ee,marker){
              let id = marker.id;
              _this.$store.dispatch('changeOK','edit');
              _this.$store.dispatch('isDeviceEmit')
              console.log(_this.deviceEmit+'&&&&&&')
              _this.$store.dispatch('setMarkerData',marker['data'])

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

      pop:function(){
      },
      deleteMarker:function(id){
        console.log(123456)
        // let data={'id':id};
        // data = this.$qs.stringify(data);
        // console.log(data);
        this.$http.post('/sms/ape/delete/'+id).then(res=>{
          this.getVideoListTree();
          if(res.data.code==200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

          }
          console.log("重新获取数据")
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-tree{
//   color: red;
//   font-size: 40px;
// }
.el-input{
  border-radius: 0;
}
.el-input .el-button{
  background: #66b1ff;
  // color: yellow;
  color:white;
  border-radius: 0;
}
.el-tabs--border-card{
  width: 450px;
}
.device_nav{
  display: flex;
  height: 850px;
  width: 430px;
  background: pink;
  position: absolute;
  z-index: 10;

  .ss{
    display: flex;
    span{
      font-size: 14px;
      width: 30%;
      display:flex;
      align-items: center;
    }
  }
  .device_tree{
    margin-top:5px;
    /*font: 10px;*/
  }
}
</style>
