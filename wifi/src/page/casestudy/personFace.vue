<!--
 * @Author: your name
 * @Date: 2020-09-15 09:40:31
 * @LastEditTime : 2020-11-23 14:43:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha\vacp-wfes\src\page\casestudy\personFace.vue
 -->
<template>
<div class="wrapper">
   <div class="pos">
       <img src="../../assets/updataImg/location.png" alt="">
       <span class="sysname childname">当前位置：</span>
       <router-link  class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
       <!-- <span class="sysname">视频侦查></span> -->
       <span class="sysname">人脸1V1比对</span>
    </div>

    <div class="upload_img">
        <div class="upload_img_left">
            <div  class="facePos" id="Faceshow">
              <img v-if="isflag" id="imgItemsearch-show"  :src="imgUrlFace">
            </div>
            <div class="tuceng">
              <img src="../../assets/images/faceContrast/huabian.png" alt="">
            </div>
              <!-- 相似度 -->
             <div class="similar">
              <el-progress type="circle"  :percentage = "percentage"  font-size = "0.2rem" :width="150"></el-progress>
            </div>

             <div class="tuceng">
              <img src="../../assets/images/faceContrast/huabian.png" alt="">
            </div>

            <div class="second-facepos" id="Faceshow2">
              <img v-if="isflag2" id="imgItemsearch-show2" :src="imgUrlFace2">
            </div>
        </div>

        <div class="upload_img_right">
            <div class="div1">
               <!-- <el-delete > -->
                        <button size="small"  class="deleteImg" icon="" type="danger" @click="clearPhoto()"></button>
                <!-- </el-delete> -->
              <div @click="choiceCar($event)">
                  <div class="show" id="imgBoxsearch">
                      <img id="imgItemsearch"  :src="imgUrl">
                      <canvas  id="PCanvas" class="showPhoto"></canvas>
                  </div>
              </div>
            </div>

             <!-- 比对按钮 -->
            <div class="comParison">
              <img src="../../assets/images/faceContrast/vs.png" alt=""><br>
              <div type="" class="comP"  @click="faceAligement()"></div>
            </div>

            <div class="div2">
              <button size="small"  class="deleteImg" icon="" type="danger" @click="clearPhoto2()"></button>
              <div @click="choiceCar2($event)">
                <div class="show2" id="imgBoxsearch2">
                  <img id="imgItemsearch2" :src="imgUrl2">
                  <canvas id="PCanvas2" class="showPhoto2"></canvas>
                </div>
              </div>
            </div>

        </div>

          <div class="threeBtn">
             <div class="">
                   <el-upload
                      class=""
                      action="vehicle/image/upload"
                      name="uploadImage"
                      ref="upload"
                      :before-upload="img1AvatarUpload">
                      <el-button size="small" class="topBtn mr15" icon="el-icon-picture-outline" type="primary">上传图片</el-button>
                  </el-upload>
            </div>
            <div class="">
                <el-upload
                  class=""
                  action="vehicle/image/upload"
                  name="uploadImage"
                  ref="upload"
                  :before-upload="img2AvatarUpload">
                  <el-button size="small" class="topBtn" icon="el-icon-picture-outline" type="primary">上传图片</el-button>
                </el-upload>
            </div>
        </div>


    </div>
</div>
</template>


<script>
import personFace from '../../api/casestudy/personFace.js'
export default {
  data(){
    return{
    }
  },
  watch:{

  },
  mixins:[personFace],




}



</script>


<style scoped>


.wrapper {
  margin-top:.7rem;
  height: 7rem;
}
.pos {
  font-size:.14rem;
  color:white;
  height:.3rem;
  border-bottom:.01rem solid #1c5da7;
  margin-left: 0.2rem;
}

.upload_img {
  width:16rem;
  height:3.5rem;
  margin:.3rem auto;
  /* display:flex; */
  /* justify-content:space-around; */
}
.upload_img_left {
  margin-top:.2rem;
  width:16rem;
  height:2rem;
  display: flex;

}
.upload_img_right {
  margin-top:.2rem;
  width:16rem;
  height:5rem;
  display: flex;
  justify-content: space-between;
}
.show {
  position:relative;
  width:5.6rem;
  height:4.5rem;
  /* border:.01rem solid #1c3f67; */
  top: .18rem;
  left: .2rem;
  /* top: 50%;
  left: 50%;
  margin-left: -3rem;
  margin-top: .17rem; */
}

.facePos {
  position:relative;
  top: -.2rem;
  width:1.77rem;
  height:1.77rem;
  margin:0 auto;
  border:.01rem solid #1c3f67;
  overflow:hidden;
  background: url(../../assets/images/faceContrast/l_photo.png) no-repeat;
  background-size:100% 100%;
}
.facePos img{
  position:absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
}
.showPhoto {
  position:absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin:  auto;
}
#imgItemsearch {
  position:absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
}

.second-facepos {
  position:relative;
  top: -.2rem;
  width:1.77rem;
  height:1.77rem;
  margin:0 auto;
  border:.01rem solid #1c3f67;
  overflow:hidden;
  background: url(../../assets/images/faceContrast/l_photo.png) no-repeat;
  background-size:100% 100%;
}
.second-facepos img {
  position: absolute;
}

.show2 {
  position:relative;
  width:5.6rem;
  height:4.5rem;
  /* border:.01rem solid #1c3f67; */
  /* top: 50%;
  left: 50%;
  margin-left: -3rem;
  margin-top: .17rem; */
  top: .18rem;
  left: .2rem;

}
.showPhoto2 {
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
#imgItemsearch2 {
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.comParison {
  position: relative;
  flex:4;
  margin: auto;
  width: 4rem;
  height: 3rem;
  text-align:center;
  vertical-align: middle;
}
.comParison img {
  vertical-align: middle;
}
.comP {
  width: 1.88rem;
  height: .6rem;
  background:url(../../assets/images/faceContrast/start.png) no-repeat no-repeat;
  background-size: cover;
  border: 0;
  margin-top: .1rem;
  margin: 0 auto;
}
.comP:hover{
  cursor: pointer;
}
/* #imgBoxsearch,#imgBoxsearch2 {
  background: url(../../assets/images/faceContrast/照片框.png) no-repeat;
  background-size:100% 100%
} */
#imgBoxsearch img{
  margin: auto;
}
#imgItemsearch-show2{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}
.clearBtn {
  position: absolute;
  bottom: 1rem;
  left: 5.8rem;
}
.clearBtn2{
  position: absolute;
  bottom: 1rem;
  right: 3.97rem
}
.deleteImg {
  width:0.2rem;
  height: 0.2rem;
  background:url(../../assets/images/faceContrast/delete.png) no-repeat;
  /* position: absolute; */
  float:right;
  background-size: 100% 100%;
  border: 0;
  z-index: 9999;
}
.deleteImg:hover{
  cursor: pointer;
}
.div1,.div2 {
  flex:6;
  width: 640px;
  height: 490px;
  background: url(../../assets/images/faceContrast/photo.png) no-repeat;
  background-size:100% 100%;

}


.tuceng img {
  vertical-align: middle;
  margin-top: .4rem;
}
.threeBtn {
  width: 9.4rem;
  height: .5rem;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.pos a:hover {
  color:#99c9fa;
}
.similar {
  font-size: .2rem;
}
.el-progress /deep/ .el-progress__text {
  color: #99c9fa;
  font-size: .36rem !important;
}
.topBtn {
  position: absolute;
  z-index: 1;
}
.mr15 {
  margin-left: -1rem;
}



</style>
