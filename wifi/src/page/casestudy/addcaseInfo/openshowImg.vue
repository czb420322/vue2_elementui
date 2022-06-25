<!--
 * @Author: chenxf
 * @Date: 2020-06-11 09:08:41
 * @LastEditTime : 2021-05-06 15:00:49
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\addcaseInfo\openshowImg.vue
 * @
 -->
<template>
  <div class="taskMange">
    <el-dialog
      title="信息展示"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="opendia"
      width="60%"
    >
      <span class="taskrelation" v-if="dialogVisible">
        <div class="videoImg_left" id="videoleft">
          <div class="videImg_top" id="videImgtop">
            <video
              disablePictureInPicture
              loop
              v-show="showvideo"
              id="flvs"
              crossorigin="*"
              controls
            ></video>
            <img v-show="!showvideo" id="imgs" :src="imgurl" alt>
            <i
              v-show="!showvideo && $route.path == '/videoCombat/addcasetwo'"
              class="el-icon-circle-close"
              @click="deleteImg(nowIndex)"
            ></i>
          </div>
          <div class="videImg_btm" id="videImg_btm">
            <div
              v-for="(item,index) in videoList"
              :key="index"
              @click="item.videoCaptureUrl ? playVideo(index,item) : showImg(index,item)"
              :class="{markNoBorder:index == nowIndex}"
            >
                <el-image
                v-if="item.videoCaptureUrl"
                @click="playVideo(index,item)"
                :src="item.videoCaptureUrl"
                fit="contain"
              ></el-image>
              <el-image
                v-else
                :src="item"
                @click="showImg(index,item)"
                id="image"
                fit="contain"
                lazy
              ></el-image>


              <!-- <img
                v-else
                :src="item"
                @load="imgscale('.imgbox')"
                class="imgbox"
                @click="showImg(index,item)"
                alt
                id="image"
                ref="image"
              > -->
            </div>
          </div>
        </div>
        <div id="videoRight" class="videoImg_right">
          <div v-show="showInfoMan == 1">
            <p style="font-weight: 700;color:#BE883A">标注属性</p>
            <p>
              <span>
                标注名称：
                <i></i>
              </span>
              {{this.lableInfo.markName}}
            </p>
            <p>
              <span>
                标注时间：
                <i></i>
              </span>
              {{this.lableInfo | computedTime}}
            </p>
            <p>
              <span>
                年龄段：
                <i></i>
              </span>
              {{this.lableInfoMan.ageType}}
            </p>
            <p>
              <span>
                包款式：
                <i></i>
              </span>
              {{this.lableInfoMan.bagStyle}}
            </p>
            <p>
              <span>
                包颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.bagColor}}
            </p>
            <p>
              <span>
                携物：
                <i></i>
              </span>
              {{this.lableInfoMan.appendant}}
            </p>
            <p>
              <span>
                下衣类型：
                <i></i>
              </span>
              {{this.lableInfoMan.trousersStyle}}
            </p>
            <p>
              <span>
                下衣颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.trousersColor}}
            </p>
            <p>
              <span>
                发型：
                <i></i>
              </span>
              {{this.lableInfoMan.hairStyle}}
            </p>
            <p>
              <span>
                头发颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.hairColor == undefined ? '未知' : this.lableInfoMan.hairColor}}
            </p>
            <p>
              <span>
                民族：
                <i></i>
              </span>
              {{this.lableInfoMan.ethicCode}}
            </p>
            <p>
              <span>
                性别：
                <i></i>
              </span>
              {{this.lableInfoMan.genderCode}}
            </p>
            <p>
              <span>
                体态：
                <i></i>
              </span>
              {{this.lableInfoMan.bodyType}}
            </p>
            <p>
              <span>
                鞋子款式：
                <i></i>
              </span>
              {{this.lableInfoMan.shoesStyle}}
            </p>
            <p>
              <span>
                鞋子颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.shoesColor}}
            </p>
            <p>
              <span>
                上衣款式：
                <i></i>
              </span>
              {{this.lableInfoMan.coatStyle}}
            </p>
            <p>
              <span>
                上衣颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.coatColor}}
            </p>
            <p>
              <span>
                上衣纹理：
                <i></i>
              </span>
              {{this.lableInfoMan.coatTexture}}
            </p>
            <p>
              <span>
                朝向：
                <i></i>
              </span>
              {{this.lableInfoMan.viewType}}
            </p>
            <p :title="this.lableInfo.remark">
              <span>
                备注：
                <i></i>
              </span>
              <b class="remarkStyle personremark">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;
                {{this.lableInfo.remark}}
              </b>
            </p>
          </div>
          <div v-show="showInfoMan == 2">
            <!-- 骑车人 -->
            <p style="font-weight: 700;color:#BE883A">标注属性</p>
            <p>
              <span>
                标注名称：
                <i></i>
              </span>
              {{this.lableInfo.markName}}
            </p>
            <p>
              <span>
                标注时间：
                <i></i>
              </span>
              {{this.lableInfo | computedTime}}
            </p>
            <p>
              <span>
                年龄段：
                <i></i>
              </span>
              {{this.lableInfoMan.ageType}}
            </p>
            <p>
              <span>
                包类型：
                <i></i>
              </span>
              {{this.lableInfoMan.bagStyle}}
            </p>
            <p>
              <span>
                包颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.bagColor}}
            </p>
            <p>
              <span>
                车颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.vehicleColor}}
            </p>
            <!-- <p><span>车颜色：<i></i></span>{{this.lableInfoMan.plateColor}}</p> -->
            <p>
              <span>
                是否携物：
                <i></i>
              </span>
              {{(this.lableInfoMan.carryingType == 0 || '' || null) ? '否' : '是'}}
            </p>
            <p>
              <span>
                下衣类型：
                <i></i>
              </span>
              {{this.lableInfoMan.trousersStyle}}
            </p>
            <p>
              <span>
                下衣颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.trousersColor}}
            </p>
            <p>
              <span>
                驾驶人数：
                <i></i>
              </span>
              {{this.lableInfoMan.driverCount}} 人
            </p>
            <p>
              <span>
                眼部特征：
                <i></i>
              </span>
              {{this.lableInfoMan.eyePart}}
            </p>
            <p>
              <span>
                发型：
                <i></i>
              </span>
              {{this.lableInfoMan.hairStyle}}
            </p>
            <p>
              <span>
                嘴部特征：
                <i></i>
              </span>
              {{this.lableInfoMan.mouthPart}}
            </p>
            <p>
              <span>
                民族：
                <i></i>
              </span>
              {{this.lableInfoMan.ethicCode}}
            </p>
            <p>
              <span>
                围脖：
                <i></i>
              </span>
              {{this.lableInfoMan.scarf}}
            </p>
            <p>
              <span>
                性别：
                <i></i>
              </span>
              {{this.lableInfoMan.genderCode}}
            </p>
            <p>
              <span>
                体态：
                <i></i>
              </span>
              {{this.lableInfoMan.bodyType}}
            </p>
            <p>
              <span>
                是否打伞：
                <i></i>
              </span>
              {{(this.lableInfoMan.umbrellaFlag == 0 || '' || null) ? '否' : '是'}}
            </p>
            <p>
              <span>
                上衣类型：
                <i></i>
              </span>
              {{this.lableInfoMan.coatStyle}}
            </p>
            <p>
              <span>
                上衣颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.coatColor}}
            </p>
            <p>
              <span>
                上衣纹理：
                <i></i>
              </span>
              {{this.lableInfoMan.coatTexture}}
            </p>
            <p>
              <span>
                朝向：
                <i></i>
              </span>
              {{this.lableInfoMan.viewType}}
            </p>
            <p :title="this.lableInfo.remark">
              <span>
                备注：
                <i></i>
              </span>
              <b class="remarkStyle">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;
                {{this.lableInfo.remark}}
              </b>
            </p>
          </div>
          <div v-show="showInfoMan == 3">
            <!-- 车 -->
            <p style="font-weight: 700;color:#BE883A">标注属性</p>
            <p>
              <span>
                标注名称：
                <i></i>
              </span>
              {{this.lableInfo.markName}}
            </p>
            <p>
              <span>
                标注时间：
                <i></i>
              </span>
              {{this.lableInfo | computedTime}}
            </p>
            <p>
              <span>
                车牌类型：
                <i></i>
              </span>
              {{this.lableInfoMan.plateClass}}
            </p>
            <p>
              <span>
                车牌颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.plateColor}}
            </p>
            <p>
              <span>
                车辆号牌：
                <i></i>
              </span>
              {{this.lableInfoMan.plateNo}}
            </p>
            <p>
              <span>
                车辆颜色：
                <i></i>
              </span>
              {{this.lableInfoMan.vehicleColor}}
            </p>
            <p>
              <span>
                车辆类型：
                <i></i>
              </span>
              {{this.lableInfoMan.traceTypeName}}
            </p>
            <p :title="this.lableInfo.remark">
              <span>
                备注：
                <i></i>
              </span>
              <b class="remarkStyle carremark">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{{this.lableInfo.remark}}
              </b>
            </p>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import flvplay from "../../../api/casestudy/flvPlay.js"; //播放器的flv的js
import { windowToCanvas, imgwh } from "../../../page/videoCombat/canvas.js";
import scale from "../../../api/common/scale.js";

export default {
  data() {
    return {
      dialogVisible: false,
      videoUrl: "",
      videoList: [], //视频图片集合
      showvideo: true,
      imgurl: "",
      nowIndex: 0,
      lableInfo: "", //标注信息
      showInfoMan: 1, //标注类型、
      lableInfoMan: {}, //标注属性
      isActive: null,
      deleteList: [] //删除的数组
    };
  },
  mounted() {},
  watch: {
    isopenimg(val) {
      this.dialogVisible = val;
    }
  },
  props: {
    isopenimg: Boolean,
    lableImgList: Array,
    u_imgrul: String,
    isdelete: Boolean
  },
  mixins: [flvplay, scale],
  methods: {
    //关闭模态框
    closeDia() {
    //   let imglist = this.deleteList.join(",");
    //非大数据架构
      let imglist = this.deleteList.join("@");

      //   if(this.videoList.length == 0){
      //       imglist = ''
      //   }else{
      //       imglist = this.deleteList.join(',')
      //   }
      this.$emit("childByshowImg", false, imglist);
      this.showvideo = true;
      this.imgurl = "";
      this.nowIndex = 0;
      this.videoList = [];
      this.isActive = 0; // 清空选中的图片
      //执行删除的方法
    },

    //打开模态框
    opendia() {
      this.deleteList = [];
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });

      if (this.lableImgList.length) {
        this.$nextTick(() => {
          // document.getElementById('videImgtop').scrollLeft = document.getElementById('videImgtop').scrollLeft + 100
          this.videoList = this.lableImgList;
          this.nowIndex = 0;
          this.showvideo = true;
          document.getElementById("videoleft").style.width = "75%";
          document.getElementById("videoRight").style.width = "24%";
          document.getElementById("videoRight").style.display = "block";
          this.imgscale(".imgbox");
          this.$nextTick(() => {
            setTimeout(() => {
              document.getElementById("videImgtop").scrollLeft = 0;
              this.playVideo(this.nowIndex, this.videoList[this.nowIndex]);
            }, 100);
          });
        });
      } else {
        this.$nextTick(() => {
          document.getElementById("videoleft").style.width = "100%";
          document.getElementById("videoRight").style.width = "0";
          document.getElementById("videoRight").style.display = "none";
          this.showvideo = false;
          this.videoList = this.u_imgrul.split(",");
          if (this.videoList.length) {
            var imgs = document.getElementById('image');
            // imgs.onload = () => {
              this.imgscale(".imgbox");
              this.nowIndex = 0;
              document.getElementById("videImg_btm").scrollLeft = 0;
              this.showImg(this.nowIndex, this.videoList[this.nowIndex]);
            // };
          }
        });
      }
      let time = true;
      document.onkeydown = e => {
        var key = window.event.keyCode;
        if (time) {
          if (key == 37) {
            time = false;
            setTimeout(() => {
              time = true;
            }, 500);
            // setTimeout(()=>{
            this.nowIndex--;
            if (this.nowIndex <= 0) {
              this.nowIndex = 0;
            }
            if (this.lableImgList.length) {
              document.getElementById("videImg_btm").scrollLeft =
                document.getElementById("videImg_btm").scrollLeft - 150;
              this.playVideo(this.nowIndex, this.videoList[this.nowIndex]);
            } else {
              this.showImg(this.nowIndex, this.videoList[this.nowIndex]);
              document.getElementById("videImg_btm").scrollLeft =
                document.getElementById("videImg_btm").scrollLeft - 150;
            }
            // },500)
          }
          if (key == 39) {
            time = false;
            setTimeout(() => {
              time = true;
            }, 500);
            // setTimeout(()=>{
            this.nowIndex++;
            if (this.nowIndex >= this.videoList.length) {
              this.nowIndex = this.videoList.length - 1;
            }
            if (this.lableImgList.length) {
              document.getElementById("videImg_btm").scrollLeft =
                document.getElementById("videImg_btm").scrollLeft + 150;
              this.playVideo(this.nowIndex, this.videoList[this.nowIndex]);
            } else {
              document.getElementById("videImg_btm").scrollLeft =
                document.getElementById("videImg_btm").scrollLeft + 150;
              this.showImg(this.nowIndex, this.videoList[this.nowIndex]);
            }
            // },500)
          }
        }
      };
      this.loading.close();
    },
    //播放视频
    playVideo(index, row) {
      this.isActive = index;
      this.lableInfo = row;
      //   console.log(this.lableInfo, 22222222222222222);
      if (row.typeId == 1) {
        this.showInfoMan = 1; //行人
        for (let i = 0; i < this.lableInfo.attrList.length; i++) {
          let key = this.lableInfo.attrList[i].itemCode;
          let val = this.lableInfo.attrList[i].valueName;
          this.lableInfoMan[key] = val;
        }
      } else if (row.typeId == 2) {
        this.showInfoMan = 3; //车
        for (let i = 0; i < this.lableInfo.attrList.length; i++) {
          let key = this.lableInfo.attrList[i].itemCode;
          let val = this.lableInfo.attrList[i].valueName;
          this.lableInfoMan[key] = val;
        }
      } else if (row.typeId == 4) {
        this.showInfoMan = 2; //骑车人
        for (let i = 0; i < this.lableInfo.attrList.length; i++) {
          let key = this.lableInfo.attrList[i].itemCode;
          let val = this.lableInfo.attrList[i].valueName;
          this.lableInfoMan[key] = val;
        }
      }
      //   console.log(this.lableInfoMan, 555);
      this.nowIndex = index;
      // this.showvideo = true
      let url = this.getUrl(row.videoUrl)
      this.flv_load_mds("flvs", url);
    },
    //展示图片
    showImg(index, itme) {
      this.nowIndex = index;
      // this.showvideo = false
      this.imgurl = itme;
      let divs = document.getElementById("videImgtop");
      let imgs = document.getElementById("imgs");
      setTimeout(() => {
        imgwh(imgs, divs);
      }, 10);
    },
    // 删除图片和视频
    deleteImg(index) {
      this.deleteList.push(this.videoList.splice(index, 1));
      if (index >= this.videoList.length) {
        index--;
      }
      if (index < 0) {
        index = 0;
      }
      this.showImg(index, this.videoList[index]);
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.taskrelation {
  width: 100%;
  display: inline-block;
  height: 6.5rem;
}
.videoImg_left {
  width: 75%;
  height: 100%;
  /* border: 1px solid red; */
  float: left;
}
.videoImg_right {
  width: 24%;
  margin-left: 76%;
  height: 100%;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  /* border: 1px solid blue; */
  padding: 0.1rem;
  color: #99c9fa;
}
.videImg_top {
  width: 100%;
  height: 80%;
  /* border: 1px solid yellow; */
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  position: relative;
}
.videImg_top video {
  width: 100%;
  height: 100%;
}
.videImg_top img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.markNoBorder {
  border: 1px solid #409eff !important;
}
.videImg_top i {
  width: 0.2rem;
  height: 0.2rem;
  text-align: center;
  line-height: 0.15rem;
  font-size: 0.2rem;
  position: absolute;
  top: 0;
  right: 0;
}
.videImg_btm {
  width: 100%;
  margin-top: 1%;
  height: 19%;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0.1rem 0;
  position: relative;
  overflow-x: auto;
  white-space: nowrap;
  /* border: 1px solid yellow; */
}
.videImg_btm > div {
  display: inline-block;
  width: 1.4rem;
  height: 92%;
  margin-right: 1%;
  position: relative;
  border: 1px solid #235588;
  box-sizing: border-box;
}
.el-image{
    width: 100%;
    height: 100%;
}
.videImg_btm div img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.el-icon-circle-close-outline {
  color: #99c9fa;
}
.videoImg_right p {
  display: inline-block;
  height: 0.2rem;
  width: 100%;
  position: relative;
}
.videoImg_right p > span {
  width: 1rem;
  height: 0.2rem;
  float: left;
  color: #99c9fa;
  text-align: justify;
}
.videoImg_right p .remarkStyle {
  position: absolute;
  width: 100%;
  line-height: 0.22rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  font-weight: 400;
}
.videoImg_right p .carremark {
  -webkit-line-clamp: 20;
}
.videoImg_right p .personremark {
  -webkit-line-clamp: 8;
}
.videoImg_right p i {
  width: 100%;
  display: inline-block;
}
/* 文字超出两行隐藏显示 */
.videoImg_right .vvv {
  overflow: hidden;
  text-overflow: ellipsis;
  /* display:-webkit-box; */
  white-space: nowrap;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.videoImg_right .vvv span i {
  width: 0.58rem;
  display: inline-block;
}
</style>
