<template>
  <div>
    <el-dialog title="视频检索" :visible.sync="dialogVisible" :close-on-press-escape="false"
     width="60%" :close-on-click-modal="false" @close="closeDia" @open='openDialog'>
      <div style="height:5rem">
        <div class="addtask_left">
          <p>
            <span>目标区域标记</span>
            <el-button class="searchBtn" @click="clearcanvas()">清空检索方式</el-button>
          </p>
          <div class="reterimg" id="reterimgVideoReterval"  @dblclick="dbgetcoor" @click="getcanvas">
            <img v-show="showImg" id="imgs" :src="videoImg" alt="">
            <canvas id="canvasVideoReterval"></canvas>
            <canvas v-show="showCanvas" id="canvasVideo" style="z-index:1"></canvas>
          </div>
        </div>
        <div class="addtask_right">
          <p>任务名称 :</p>
          <input type="text" v-model="taskName" maxlength="50" placeholder="请输入任务名称">
          <div class="setretrieve">
            <p>规则设置：</p>
            <div class="rule">
              <div>
                <p>检索方式：</p>
                <el-radio-group @change="clearcanvas" v-model="retrimodel">
                  <el-radio :label="1">区域</el-radio>
                  <el-radio :label="2">跨线</el-radio>
                  <el-radio :label="3">方向</el-radio>
                </el-radio-group>
              </div>
              <div>
                <p>目标大小：</p>
                <el-radio-group v-model="targetsize">
                  <el-radio :label="1">大</el-radio>
                  <el-radio :label="2">中</el-radio>
                  <el-radio :label="3">小</el-radio>
                </el-radio-group>
              </div>
              <div>
                <p>目标清晰度：</p>
                <el-radio-group v-model="targetqxd">
                  <el-radio :label="1">清晰</el-radio>
                  <el-radio :label="2">较清晰</el-radio>
                  <el-radio :label="4">较模糊</el-radio>
                  <el-radio class="last"  :label="3">模糊</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"></el-button>
        <el-button @click="getsubmit()"></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import videoRetal from "../../../api/newCaseVideo/videoRetal.js";
import {draw, circle, drawPolygon, coorValue, imgwh} from '../canvas.js'
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  props: {
    showVideoRetal: Boolean,
    VideoRetalList:Object,
    beginData:String,
    endData:String,
    gbDeviceId:String,
    caseUuid:String,
  },
  watch: {
    showVideoRetal(val) {
      this.dialogVisible = val;
    },
    VideoRetalList(row){
      console.log(row);
      if(row.snapUrl == null || row.snapUrl == undefined || row.snapUrl == ''){
        this.videoImg = ''
      }else{
        this.videoImg = row.snapUrl;
      }
      this.fileUuid = row.fileUuid
      this.videoUrl = row.fileDecodePath
      this.deviceId = row.deviceId
    }
  },
  mixins: [videoRetal],
  methods: {
    //关闭模态框
    closeDia() {
      sessionStorage.setItem('imgurl','')
      window.imgurl = ''
      let title
      if(JSON.stringify(this.VideoRetalList) == '{}'){
        title = document.title + "....";
      }else{
        title = document.title + ".";
      }

      this.$emit("childbyVideoReat", false, title);
      this.showImg = false
      this.clearcanvas();
      this.actualcoord = [];
      this.actuacircle = [];
      this.circle = [];
      this.points = []
      this.coordinates = [];
      this.retrimodel= 1;    // 检索方式
      this.targetsize=1;    // 目标大小
      this.targetqxd=1;   // 目标清晰度
    },
    openDialog(){
      this.setName();
      if(JSON.stringify(this.VideoRetalList) == '{}'){
        console.log(window.imgurl,88999);
        //在线
        // var timehis = setInterval(()=>{
          // if(sessionStorage.getItem('imgurl').length > 10){
            this.$nextTick(()=>{
              this.videoImg = window.imgurl
              var imgs = document.getElementById('imgs')
              var reterimg = document.getElementById('reterimgVideoReterval')
              setTimeout(() => {
              imgwh(imgs, reterimg)
              var canvas = document.getElementById('canvasVideoReterval')
              var canvastwo = document.getElementById('canvasVideo')
              this.showImg = true
              setTimeout(()=>{
                canvas.setAttribute('width',imgs.clientWidth)
                canvas.setAttribute('height',imgs.clientHeight)
                canvastwo.setAttribute('width',imgs.clientWidth)
                canvastwo.setAttribute('height',imgs.clientHeight)
              },200)

            },100);
          })
          // }

        // },100)
      }else{
        // 离线
        this.queryData();//获取所有任务列表 离线
        setTimeout(() => {
          this.$nextTick(()=>{
            this.showImg = true
            var imgs = document.getElementById('imgs')
            var reterimg = document.getElementById('reterimgVideoReterval')
            imgwh(imgs, reterimg)
            var canvas = document.getElementById('canvasVideoReterval')
            var canvastwo = document.getElementById('canvasVideo')
            // canvasVideo
            setTimeout(() => {
              canvas.setAttribute('width',imgs.clientWidth)
              canvas.setAttribute('height',imgs.clientHeight)
              canvastwo.setAttribute('width',imgs.clientWidth)
              canvastwo.setAttribute('height',imgs.clientHeight)
            }, 100);
          })
        }, 500);
      }


    }

  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";

.addtask_left{
  width: 65%;
  float: left;
  height: 100%;
  background-color: rgba(16, 35, 56, 0.5);
  color: #99c9fa;
}
.addtask_left p{
  line-height: 0.3rem;
  display: flex;
  justify-content: space-between;
}
.addtask_left p .el-button{
  padding: 0 0.1rem;
  font-size: 0.12rem !important;
}
.addtask_left .reterimg{
  position: relative;
  width: 100%;
  height: calc(100% - 0.3rem);
  border: 2px solid rgba(15, 44, 79, 0.5)
}
.reterimg canvas,
.reterimg img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.addtask_right{
  color: #99c9fa;
  width: 34%;
  margin-left: 66%;
  height: 100%;
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0 0.2rem;
}
.addtask_right >p{
  line-height: 0.3rem;
  color: #fff;
  padding-left: 0.1rem;
}
.addtask_right >input{
  line-height: 0.3rem;
  border-radius: 3px;
  width: 80%;
  padding-left: 0.1rem;
  margin-left: 0.2rem;
}
.setretrieve{
  margin-top: 0.2rem;
  height: calc(100% - 0.8rem);
}
.setretrieve >p{
  display: block;
  line-height: 0.3rem;
  padding-left: 0.1rem;
  white-space: normal;
  text-overflow:ellipsis;
  overflow: hidden;
  color: #fff;
}
.setretrieve .rule{
  height: calc(100% - 0.3rem);
  padding: 0 0.1rem;
}
.rule div{
  padding: 0.1rem;
}
.el-radio+.el-radio{
  margin-left: 0rem;
  margin-top: 0.1rem;
}
.el-radio{
  margin-right: 0.2rem;
}
</style>
