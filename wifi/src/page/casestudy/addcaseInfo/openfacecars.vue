<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:06
 * @LastEditTime : 2020-11-26 16:09:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit"
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\addcaseInfo\openfacecars.vue
 -->
<template>
  <div class="taskMange">
     <el-dialog
      title="车辆查询"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="8.68rem">
      <div class="operationPrint">
        <p>操作提示：（车辆查询实现方式，1.上传自定义车辆图片，点击确定按钮进行查询）</p>
      </div>
        <div class="photoWrap">
          <div id="photoCvs" @click="choiceCar($event)" class="photo">
            <span class="smallT">|  图片源</span>
            <div class="showImg" id="imgBox">
              <img id="imgItem" style="width: auto;height: 100%" :src="imgUrl"  />
              <canvas id="photoCanvas" class="showPhoto" width="0" height="0"></canvas>
              <span id="mask" class="mask"></span>
            </div>
            <el-upload
              class="uploadPhoto"
              action="vehicle/image/upload"
              name="uploadImage"
              ref="upload"
              :before-upload="beforeAvatarUpload">
              <el-button size="small" class="topBtn" icon="el-icon-picture-outline" type="primary">上传图片</el-button>
            </el-upload>

            <div class="desc"></div>
          </div>
        <!-- <div class="info">
          <div class="infoItem">
            <span class="smallT">|  车辆标识物</span>
            <div class="carItemInfo" v-show="this.isCarHead != 1">
              <el-checkbox-group v-model="checkList">
                <div class="carItem" v-for="(item,i) of checkedInfo[currentCar]" :key="i" v-if="item.count"><el-checkbox @change="drawCarInfo(currentCar)" :label="item.name"></el-checkbox><span>{{item.countTxt}}</span></div>
              </el-checkbox-group>
            </div>
          </div>
          <div class="infoItem">
            <span class="smallT">|  车辆信息</span>
            <div class="vinfolist">
              <p>识别置信度：<span>{{this.predictValue?(Number(this.predictValue)*100).toFixed(2)+'%':this.predictValue}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆颜色：<span>{{this.vehicleColor == '@'?'未识别':this.vehicleColor}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆类型：<span>{{this.vehicleKindTxt == '@'?'未识别':this.vehicleKindTxt}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆品牌：<span>{{this.vehicleBrandTxt == '@'?'未识别':this.vehicleBrandTxt}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车辆型号：<span>{{this.vehicleModelTxt == '@'?'未识别':this.vehicleModelTxt}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车牌类别：<span>{{this.plateClass == '@'?'未识别':this.plateClass}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车牌颜色：<span>{{this.plateColor == '@'?'未识别':this.plateColor}}</span></p>
              <p v-show="this.isCarHead != 8 && this.isCarHead != 2 && this.isCarHead != 4">车牌号码：<span>{{this.plateNumberTxt == '@'?'未识别':this.plateNumberTxt}}</span></p>
              <p v-show="this.isCarHead != 1 && this.isCarHead != 0">车辆类型：<span>{{this.vehicleModelTxt == '@'?'未识别':this.vehicleModelTxt}}</span></p>
            </div>
          </div>
        </div> -->

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="canclePicture"></el-button>
            <el-button v-no-more-click :title="recodetarget ? '正在识别' : ''" :disabled="recodetarget" @click="getcoordTore"></el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data(){
    return{
      dialogVisible:false,
      imgUrl:'',
      imgData: {
          code: "",
          message: "",
          data: []
      },//识别出来的信息
      currentCar:0, //显示车辆的索引
      imageWidth:'', //图片的宽度
      imageHeight:'', //图片的高度
      unit: 1,  //图片宽度适应比例尺
      recodetarget:true
    }
  },
  mounted(){

  },
  watch:{
    openaccess(val){
      this.dialogVisible = val
    },
  },
  props:{
    openaccess:Boolean
  },
  computed:{
      //图片上所有车辆的位置坐标列表
      carList (){
        let cList = [];
        if(this.imgData.data.length){
          for(let i=0;i<this.imgData.data.length;i++){
            cList.push({
              leftTopX: this.imgData.data[i].obj_left,
              leftTopY: this.imgData.data[i].obj_top,
              rightBtmX: this.imgData.data[i].obj_right,
              rightBtmY: this.imgData.data[i].obj_bootom
            });
          }
        }
        return cList;
      },
  },
  methods:{
    //关闭模态框
    closeDia(){

      if(!this.imgData.data.length){
        this.$emit('childByaccess',false,'','')
      }else{
        this.$emit('childByaccess',false,this.imgData.data[this.currentCar],this.imgUrl)
      }
      this.clearRect();
    },
    clearRect(){
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        pCtx.clearRect(0,0,photoCanvas.clientWidth, photoCanvas.clientWidth);

        // if(document.getElementById("magCanvas")){
        //   let pCtx2 = document.getElementById("magCanvas").getContext("2d");
        //   pCtx2.clearRect(0,0,this.imageWidth, this.imageHeight);
        // }

        // if(document.getElementById("markCarCanvas")){
        //   let markCarCanvas = document.getElementById("markCarCanvas");
        //   let pCtx3 = markCarCanvas.getContext("2d");
        //   pCtx3.clearRect(0,0,markCarCanvas.width, markCarCanvas.height);
        // }
      },

    //打开模态框
    opendia(){
      this.imgUrl = ''
      this.imgData = {
        code: "",
        message: "",
        data: []
      }
      this.currentCar = 0
    },
          //去重
    uniqCope(array) {
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
      // 获取鼠标在页面的位置，处理浏览器兼容性
      getPageMag(e) {
        let pageX = e.pageX || e.clientX + this.getScrollMag().scrollLeft;
        let pageY = e.pageY || e.clientY + this.getScrollMag().scrollTop;
        return {
          pageX: pageX,
          pageY: pageY
        }
      },
      //放大镜
      getScrollMag() {
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      },
    beforeAvatarUpload(file,a,b){
        if(file.size/1024/1024 >= 10){
          console.log(file.size/1024/1024)
          this.$notify({
            type:"warning",
            message:"上传图片不要超过10M！",
            position:"bottom-right",
            duration:3000
          })
          return false
        }

        if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png"){
          this.$notify({
              type: 'warning',
              message: '上传图片只能是 png,jpg,jpeg,bmp格式！',
              position: 'bottom-right',
              duration: 3000
          });
          return false;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append('image',file);
        formData.append('taskSource',2);
        let _this = this;
        _this.uploadloading = null;
        _this.uploadloading = _this.$loading({
          text: '正在上传...',
          spinner: 'el-icon-loading',
          target: "#imgBox"
        });
        this.$http({
          url:'/pca/targetRecognition/recognitionVehicle',
          method:'post',
          data:formData
        }).then(res=>{
          _this.uploadloading.close();
          _this.uploadloading = null;
          this.imgUrl = reader.result;
          if(res.data.code == 200){
            this.recodetarget = false
            this.imgUrl = reader.result;
            this.imgUrlShow = "";
            this.imgData = res.data
            this.initCanvas();
          }else if(res.data.code == 801){
            this.badImgWh()
            this.$notify({
              type: 'warning',
              message: '服务异常！',
              position: 'bottom-right',
              duration: 3000
            });
          } else if(res.data.code == 802){
            this.badImgWh()
             this.$notify({
              type: 'warning',
              message: '图片上传失败！',
              position: 'bottom-right',
              duration: 3000
            });
          } else if(res.data.code == 803){
            this.badImgWh()
             this.$notify({
              type: 'warning',
              message: '图片格式不正确！',
              position: 'bottom-right',
              duration: 3000
            });
          } else if(res.data.code == 999){
            this.badImgWh()
             this.$notify({
              type: 'warning',
              message: '未识别到车辆信息，请重新上传！',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.badImgWh()
              this.$notify({
              type: 'warning',
              message: '图片上传失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }

        });
        return false;
      },
      badImgWh(){
        this.imgData = {
          code: "",
          message: "",
          data: {}
        } // 识别出来的信息
        this.clearRect();
        let img = new Image();
        img.onload = ()=>{
          this.imageWidth = img.naturalWidth
          this.imageHeight = img.naturalHeight
          this.imgWH();
          let photoCanvas = document.getElementById("photoCanvas");
          photoCanvas.width = 0
          photoCanvas.height = 0
        }
        img.src = this.imgUrl
      },
      //
      initCanvas(){
        if(this.imgData.data.length){
          //默认选中第一个车辆
          this.currentCar = 0;//显示第一辆车的标识信息
          this.imageWidth = this.imgData.data[0].photo_width;
          this.imageHeight = this.imgData.data[0].photo_height;
          this.imgWH();
          //画出所有车的方框
          this.drawCarInfo(0);

        }
      },
      imgWH(){
        let imgBox = document.getElementById("imgBox");
        let imgs = document.getElementById("imgItem");
        let photoCanvas = document.getElementById("photoCanvas");
        let imgw = this.imageWidth;
        let imgh = this.imageHeight;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        if (retw / reth < imgw / imgh) {
          imgs.style.width = "100%";
          imgs.style.height = 'auto';
          this.unit = imgw / retw;
        } else {
          imgs.style.height = "100%";
          imgs.style.width = 'auto';
          this.unit = imgh / reth;
        }
        photoCanvas.width = imgw / this.unit;
        photoCanvas.height = imgh /this.unit;
      },
      drawCarInfo (pIndex){
        this.clearRect();
        this.drawAllCar();
        this.drawCar(pIndex,"red");
      },
       drawAllCar(){
        if(!this.imgData.data.length){
          return false;
        }
        var allImgData = this.imgData.data

        for(let i=0;i<allImgData.length;i++){
          this.drawRect("root",allImgData[i], "yellow");
        }
      },
      drawCar(pIndex,color){
        if(!this.imgData.data.length){
          return false;
        }
        let parent = this.imgData.data[pIndex];
        this.drawRect("root",this.imgData.data[pIndex],color);
      },

      clearRect(){
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        pCtx.clearRect(0,0,photoCanvas.clientWidth, photoCanvas.clientWidth);
      },
      //根据坐标和宽高画框
      drawRect (parent, pos,color){
        if(!pos){
          return;
        }
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        let x = pos.obj_left / this.unit;
        let y = pos.obj_top  / this.unit;
        let w = (pos.obj_right - pos.obj_left) / this.unit;
        let h = (pos.obj_bootom - pos.obj_top) / this.unit;
        if(parent !== "root"){
          x = x + parent.obj_left / this.unit;
          y = y + parent.obj_top / this.unit;
        }
        pCtx.strokeStyle = color;
        pCtx.strokeRect(x,y,w,h);
      },
       //点击图片中车辆选中
      choiceCar (ev){
        let imgItem = document.getElementById("imgItem");
        let offsetX = this.getPageMag(ev).pageX - $(imgItem).offset().left;
        let offsetY = this.getPageMag(ev).pageY - $(imgItem).offset().top;
        if(this.carList.length > 0 ){
          for(let i = 0;i<this.carList.length;i++){
            if( (this.carList[i].leftTopX / this.unit) < offsetX && (this.carList[i].rightBtmX / this.unit) > offsetX && (this.carList[i].leftTopY / this.unit) < offsetY && (this.carList[i].rightBtmY/ this.unit) > offsetY){
              this.currentCar = i;
            }
          }
        }else{
          return null;
        }
        this.drawCarInfo(this.currentCar);

      },
      //把坐标给子组件
      getcoordTore(){
        this.dialogVisible = false;
      },
      // 点击取消
      canclePicture() {
        this.dialogVisible = false;
        this.imgUrl = '';
        this.clearRect()
      }
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
.photoWrap{
    display: flex;
    justify-content: space-between;
     background-color: rgba(16, 35, 56, 0.5);
  }
  .photoWrap .photo{
    position:relative;
    width: 7.28rem;
    /* margin-left:0.08rem */
    margin: 0 auto;
    /*overflow: hidden;*/
  }
  .photoWrap .photo .showImg{
    position:relative;
    /*width: 7.2rem;*/
    height:4rem;
    border:1px solid #1f4572;
    border-bottom:none
  }
  .photoWrap .photo .showImg img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .showPhoto{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin: auto;
    opacity: 1;
  }
  .photoWrap .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2.74rem;

  }
  .photoWrap .info .infoItem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .photoWrap .info .infoItem .vinfolist, .photoWrap .info .infoItem .carItemInfo{
    padding:0.1rem 0 0.1rem 0.1rem;
    /* background-color:#F6F7FB; */
  }
  .photoWrap .info .infoItem .carItemInfo{
    height: 2.35rem;
    margin-bottom:0.1rem;
    overflow-y:auto;
  }
  .photoWrap .uploadPhoto{
    /* margin-top:0.1rem; */
    padding: 0.1rem 0;
    text-align: center;
    border: 1px solid #1f4572;
    border-top:none;
    background:rgba(0,0,0,.2)
  }

  .photoWrap .smallT{
    display: block;
    margin-bottom:0.1rem;
    color:#409eff;
    font-size:0.16rem;
    line-height:0.24rem;
    font-weight: bold;
    padding-left: 0.1rem;
  }
  .operationPrint p{
    color:#409eff;
    margin-bottom: 0.05rem;
  }
</style>
