<template>
 <div class="clue">
   <ul class="tops">
     <li @click="tabs1" class="items" :class="tab1 ? 'ONitems' : ''">目标人员</li>
     <li @click="tabs2" class="items" :class="tab2 ? 'ONitems' : ''">目标车辆</li>
     <li @click="tabs3" class="items" :class="tab3 ? 'ONitems' : ''">目标骑车人</li>
     <li @click="tabs4" class="items" :class="tab4 ? 'ONitems' : ''">视频标注</li>
   </ul>
   <div class="cluemain">
     <div class="cluetop">
         <ul class="mainul">
            <li v-for='(item,index) in ajaxDataList' :key="index">
              <span class="play" @click="videoUrl1(item)"></span>
              <a target="_blank" :href="item.imgUrl"><img :src="item.videoCaptureUrl" @click="videoUrl1(item)" alt=""></a>
              <p>
                <!-- <span :title="item.markName">标注名称：{{ item.markName }}</span> -->
                <span>时间：{{ item.createTime }}</span>
                <span>位置：{{ item.device == null?'':item.device.place }}</span>
                  <a @click="relation(item.cluePoolUuid,item.clueType,item)">关联</a>
              </p>
            </li>
            <span class='empty' v-show="ajaxDataList.length == 0">暂无数据</span>
          </ul>
        </div>

      <el-pagination style="float: right;margin-right: 10px;"
          :background="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
 <!--中间视频-->
      <div class="centerSpaceVideo" v-show="centerSpaceVideoFlag">
        <div style="width: 100%;height: 100%; border:1px solid black; background:rgba(0,0,0,0.8)">
          <video loop disablePictureInPicture id="centerVideo" style="width: 100%;height: 100%;" controls autoplay></video>
          <div class="centerVideoCloseIcon" @click=" centerSpaceVideoFlag=false"><span class="el-icon-close"></span>
          </div>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import flvjs from 'flv.js'
 export default {
   data () {
     return {
      totalCount: 0,
      currentPage: 1, // 当前页码
      pageSize: 12, //每页显示的条数
      pageSizes:[12,24,36],//下拉框选择的显示条数
      tab1:false,
      tab2:false,
      tab3:false,
      tab4:false,
      tabType:1,
      ajaxDataList:[],
      centerSpaceVideoFlag:false,
      // dataDevice:''
     }
   },
   created(){
    //  this.ajaxClue()
     this.tabs1()
   },
   methods:{
     //
     tabs1(){
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
      this.tabType = 1
      this.ajaxClue()
     },
     tabs2(){
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
      this.tabType = 2
      this.ajaxClue()
     },
     tabs3(){
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
      this.tab4 = false;
      this.tabType = 3
      this.ajaxClue()
     },
     tabs4(){
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;
      this.tabType = 4
      this.ajaxClue()
     },
     //  视频播放
     videoUrl1(row){
      //  console.log(JSON.stringify(row))
       this.centerSpaceVideoFlag = true;
      let lastindex = row.videoUrl.lastIndexOf(".")
      let playvalue = row.videoUrl
      playvalue = playvalue.slice(lastindex - 48, playvalue.length)
      this.videoUrl = window.origin + '/fastDfs' + playvalue
      //  this.videoUrl = row.videoUrl;
      //  console.log(row,222)
      //  console.log(this.videoUrl,11)
       this.flv_load()
     },
     //flv格式视频
    flv_load() {
      if (flvjs.isSupported()) {
          var videoElement = document.getElementById('centerVideo');
          var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive:false,
            withCredentials:false,
            hasAudio:false,
            hasVideo:true,
            url:this.videoUrl,
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
      }
    },
    //关联线索渲染列表
    ajaxClue(){
        let data = {
          pageNum:this.currentPage,//当前页
          pageSize:this.pageSize,//当前页结果数量
          orderBy:'',
          orderType:'',
          begin:'',
          end:'',
          clueType:this.tabType,
          caseUuid:this.$route.query.caseUuid
        }
        this.$http.get('/pca/casemng/clue/list',{params:data})
        .then((res) => {
          // console.log('+++++++++++++'+JSON.stringify(res))
               this.ajaxDataList = res.data.data.list;
              //  this.dataDevice = res.data.data.list.device;
               this.totalCount = res.data.data.totalCount;//页面总数
               this.currentPage = res.data.data.pageNum;//当前页
               this.pageSize = res.data.data.pageSize;//每页条数
            })
     },
    //关联
    relation(id,type,row,index){
      // let data =  {
      //     cluePoolUuid:id,
      //     caseUuid:this.$route.query.caseUuid,
      //     clueType:type
      //   }
      //   data = this.$qs.stringify(data);
      //   this.$http.post('/pca/casemng/clue/rel',data)
      //   .then( (response) =>{
      //     if(response.data.code == 200){
      //        layer.alert(' 关联成功！',{icon:1,title:"消息提示"});
      //     }else{
      //       layer.alert('服务器异常,请稍后重试！',{icon:2,title:"消息提示"});
      //     }
      //   })
      // console.log('验证'+JSON.stringify(row))
      let arr = row.attrList
      let PersonArr = []
      let cpArr = []
      let carArr = []
      let obj ={}
      obj.caseUuid = row.caseUuid
      obj.deviceId = row.deviceId
      obj.traceImgUrl = row.videoCaptureUrl
      if(row.typeId == 1){
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].itemCode] = arr[i].valueName
        }
        PersonArr.push(obj)
      }
      if(row.typeId == 4){
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].itemCode] = arr[i].valueName
        }
        cpArr.push(obj)
      }
      if(row.typeId == 2){
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].itemCode] = arr[i].valueName
        }
        carArr.push(obj)
      }
      // console.log(PersonArr, 111);
      // console.log(cpArr, 222);
      // console.log(carArr, 333);
      let data = {
        person: JSON.stringify(PersonArr),
        bicycle: JSON.stringify(cpArr),
        vehicle: JSON.stringify(carArr),
      }
      data = JSON.stringify(data)
      let dataList = {
        datas: data,
        flag:2,
        judgeId:row.markId,
        caseUuid:this.$route.query.caseUuid
      }
      dataList = this.$qs.stringify(dataList)
      this.$http.post('pca/casemng/clue/image/save', dataList).then(res => {
        if (res.data.code == 200) {
           this.$notify({
            type: 'success',
            message: '添加成功',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('添加成功!', {icon: 6,title: "消息提示"});
          this.ajaxClue();
        }else{
           this.$notify({
            type: 'error',
            message: '添加失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })

    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.ajaxClue()
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.ajaxClue()
    },
   }
 }
</script>

<style scoped>
.clue{
  height: 6rem;
  /* border: 1px solid #000; */
}
.ONitems{
  background-color: #21466d !important;
  border: 1px solid #5488bd !important;
  color: #2e93fb !important;
}
.clue .tops{
  padding: 0.1rem 0;
  overflow: hidden;
}
/* .clue .tops li:first-child{
  border-left: 1px solid #d5dade;
} */
.clue .tops li{
  cursor: pointer;
  float: left;
  width: 1.2rem;
  line-height: 0.3rem;
  font-size: 0.14rem;
  color: #99c9fa ;
  /* border-top: 1px solid #d5dade;
  border-bottom: 1px solid #d5dade;
  border-right: 1px solid #d5dade; */
  border: 1px solid #193555;
  background-color: rgba(16, 35, 56, 0.5);
  margin-right:1px;
  text-align: center;
}
.cluemain{
  width: 100%;
  height: 93%;
  border: 1px solid #1c4777;
}
.el-pagination{
  margin-top: 0.1rem;
  float: right;
}
.clue .tops .active{
  background-color: #409eff;
  color: #fff;
}
.cluetop{
  height: 90%;
  overflow-y: scroll;
}
.mainul{
  padding: 0 0.2rem;
}
.mainul li{
  position: relative;
  margin-top: 0.2rem;
  float: left;
  width: 23.5%;
  height: 2.2rem;
  margin-right: 2%;
  border: 1px solid #0f2c4f;
  box-shadow: 0px 0px 1px ;
}
.mainul li:nth-child(4n){
  margin-right: 0;
}
.mainul li .play{
  position: absolute;
  width: 0.41rem;
  height: 0.41rem;
  top: 50%;
  left: 50%;
  margin: -0.3rem 0 0 -0.2rem;
  background: url(../../../assets/play_button.png) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.mainul li img{
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
}
.mainul li p{
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.58);
  font-size: 0.12rem;
}
.mainul li p span{
  width: 2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  display: block;
  color: #fff;
  margin-left: 0.1rem;
}
.mainul li p a{
  width: 0.5rem;
  line-height: 0.2rem;
  background-color: #ca8826;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  position: absolute;
  right: 0.1rem;
  top: 0.25rem;
  cursor:pointer;
}
.mainul li p a:hover{
  background-color: #dbae6b ;
}
.empty{
  text-align: center;
  width: 100%;
  height: 10%;
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  margin: auto;
  color: #909399;
}

.centerSpaceVideo {
    width: 40%;
    height: 30%;
    position: absolute;
    top: 37%;
    left: 37%;
    z-index: 99;
    overflow: hidden;
    z-index: 3000;
  }
  .centerVideoCloseIcon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    color: white;
    cursor: pointer;
    background-color:#f56c6c;
    font-size: 16px;
    width: 25px;
    height: 20px;
    text-align: center;
    /* padding-top: 2px; */
  }
.centerVideoCloseIcon:hover{
    background-color:red;
  }
 .el-pagination /deep/ .el-pagination__total,
.el-pagination /deep/ .el-pagination__jump {
  color: #99c9fa;
}
</style>
