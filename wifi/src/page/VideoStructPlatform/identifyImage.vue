<!--
 * @Author: your name
 * @Date: 2020-11-10 13:50:04
 * @LastEditTime : 2021-06-25 10:31:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha-1.63\vacp-wfes\src\page\casestudy\identifyImage.vue
 -->

<template>
  <div class="taskMange">
    <el-dialog
      title="图片识别"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="8rem"
    >
      <div class="operationPrint"></div>
      <div class="photoWrap">
        <div id="photoCvss" @click="choiceCar($event)" class="photo">
          <span class="smallT">| 图片源</span>

          <div class="showImg" id="imgBoxsearch">
            <img id="imgItemsearch" :src="bigsearchimg">
            <canvas id="pCanvas" class="showPhoto"></canvas>
            <span id="mask" class="mask"></span>
          </div>

          <el-upload
            class="uploadPhoto"
            action="vehicle/image/upload"
            name="uploadImage"
            ref="upload"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
          >
            <el-button
              size="small"
              class="topBtn"
              icon="el-icon-picture-outline"
              type="primary"
            >上传图片</el-button>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="passBtn" :title="recodetarget ? '正在识别' : ''"
        :disabled="recodetarget" v-no-more-click @click="getcoordTore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        dialogVisible: false,
        currentCar: null, //当前选中的识别坐标
        currentper: null, //当前选中的识别坐标
        currentbic: null, //当前选中的识别坐标
        currentface:null,
        imageWidth: "", // 图片的宽度
        imageHeight: "", // 图片的高度
        unit: 1, // 图片宽度适应比例尺
        loading: null, //加载
        recodetarget: true,
        clickRecodeimg: true,
        imgPicInquire: false, // 默认不显示图片
        recodeResult: {},
        bigsearchimg: "",
        searchresult: {}, //要搜索的结果，就是在以图搜图小窗口展示的信息
        isflag:false,//用这个值来接收父组件传过来的值，判断是否从标注池进来的以图搜图
    };
  },
  mounted() {},
  watch: {
    openSearchCase(val) {
      this.dialogVisible = val;
    }
  },
  props: {
    openSearchCase: Boolean,
    isLabelIn:Boolean,//这个值为true代表从标注池来的
    snapPic: String,
  },
  computed: {
    //图片上所有车辆的位置坐标列表
    zkyCarList() {
      let cList = [];
      if (this.recodeResult.Result) {
        //判断结果返回查看是否存在车辆信息，如果存在，就循环车辆信息，获取所有的车辆坐标
        if (this.recodeResult.Result[0].Vehicles) {
          for (
            let i = 0;
            i < this.recodeResult.Result[0].Vehicles.length;
            i++
          ) {
            cList.push({
              leftTopX: this.$commons.isEmpty(
                this.recodeResult.Result[0].Vehicles[i].RegionLeft
              )
                ? 0
                : this.recodeResult.Result[0].Vehicles[i].RegionLeft,
              leftTopY: this.$commons.isEmpty(
                this.recodeResult.Result[0].Vehicles[i].RegionTop
              )
                ? 0
                : this.recodeResult.Result[0].Vehicles[i].RegionTop,
              rightBtmX: this.recodeResult.Result[0].Vehicles[i].RegionWidth,
              rightBtmY: this.recodeResult.Result[0].Vehicles[i].RegionHeight
            });
          }
        }
      }

      return cList;
    },
    //图片上所有人的位置坐标列表
    //判断结果返回查看是否存在人的信息，如果存在，就循环人的信息，获取所有的人的坐标
    zkyPerList() {
      let cList = [];

      if (this.recodeResult.Result) {
        if (this.recodeResult.Result[0].Pedestrian) {
          for (
            let i = 0;
            i < this.recodeResult.Result[0].Pedestrian.length;
            i++
          ) {
            cList.push({
              leftTopX: this.$commons.isEmpty(
                this.recodeResult.Result[0].Pedestrian[i].RegionLeft
              )
                ? 0
                : this.recodeResult.Result[0].Pedestrian[i].RegionLeft,
              leftTopY: this.$commons.isEmpty(
                this.recodeResult.Result[0].Pedestrian[i].RegionTop
              )
                ? 0
                : this.recodeResult.Result[0].Pedestrian[i].RegionTop,
              rightBtmX: this.recodeResult.Result[0].Pedestrian[i].RegionWidth,
              rightBtmY: this.recodeResult.Result[0].Pedestrian[i].RegionHeight
            });
          }
        }
      }

      return cList;
    },
    // 所有的人脸
    zkyFaceList() {
        let cList = [];
        if(this.recodeResult.Result){
        //判断结果返回查看是否存在车辆信息，如果存在，就循环车辆信息，获取所有的车辆坐标
        if (this.recodeResult.Result[0].Faces) {
            for (let i = 0; i < this.recodeResult.Result[0].Faces.length; i++) {
            cList.push({
                leftTopX: this.$commons.isEmpty(this.recodeResult.Result[0].Faces[i].RegionLeft) ? 0 : this.recodeResult.Result[0].Faces[i].RegionLeft,
                leftTopY: this.$commons.isEmpty(this.recodeResult.Result[0].Faces[i].RegionTop) ? 0 : this.recodeResult.Result[0].Faces[i].RegionTop,
                rightBtmX: this.recodeResult.Result[0].Faces[i].RegionWidth,
                rightBtmY: this.recodeResult.Result[0].Faces[i].RegionHeight
            });
            }
        }
        }
        return cList;
      },
    //图片上所有骑车人的位置坐标列表
    //判断结果返回查看是否存在骑车人信息，如果存在，就循环骑车人信息，获取所有的骑车人坐标
    zkyBicList() {
      let cList = [];
      if (this.recodeResult.Result) {
        if (this.recodeResult.Result[0].NonMotorVehicles) {
          for (
            let i = 0;
            i < this.recodeResult.Result[0].NonMotorVehicles.length;
            i++
          ) {
            cList.push({
              leftTopX: this.$commons.isEmpty(
                this.recodeResult.Result[0].NonMotorVehicles[i].RegionLeft
              )
                ? 0
                : this.recodeResult.Result[0].NonMotorVehicles[i].RegionLeft,
              leftTopY: this.$commons.isEmpty(
                this.recodeResult.Result[0].NonMotorVehicles[i].RegionTop
              )
                ? 0
                : this.recodeResult.Result[0].NonMotorVehicles[i].RegionTop,
              rightBtmX: this.recodeResult.Result[0].NonMotorVehicles[i]
                .RegionWidth,
              rightBtmY: this.recodeResult.Result[0].NonMotorVehicles[i]
                .RegionHeight
            });
          }
        }
      }
      return cList;
    }
  },
  methods: {
    //关闭模态框
    closeDia() {
      this.dialogVisible = false;
      this.$parent.openSearchCase = false
      this.isflag = false;
    },

    //打开模态框
    opendia() {
        this.isflag = this.isLabelIn
        if(this.isflag){
            this.bigsearchimg = this.snapPic;
        setTimeout(()=>{
           //执行中科院的识别方法
            this.zkyImgPicWh();
            this.recodetarget = false;
        },100)
        }
    },

    // 上传图片
    beforeAvatarUpload(file) {
      if (
        file.type != "image/jpg" &&
        file.type != "image/jpeg" &&
        file.type != "image/bmp" &&
        file.type != "image/png"
      ) {
        this.$notify({
          type: "warning",
          message: "上传图片只能是 png,jpg,jpeg,bmp格式！",
          position: "bottom-right",
          duration: 3000
        });
        return false;
      }
      //先清空人 车 骑车人的信息
      this.clearInfoMation();
      this.clickRecodeimg = true;
      this.clearRect();
      let formData = new FormData();
      formData.append("files", file);
      this.$http({
        url: "/sms/uploadFile/upload",
        method: "post",
        data: formData
      }).then(res => {
        if (res.data.code == 200) {
          this.recodetarget = false;
          this.bigsearchimg = res.data.data[0];
          this.zkyImgPicWh();
        } else if (res.data.code == 300) {
          this.clearRect();
          this.$notify({
            type: "error",
            message: "图片保存失败",
            position: "bottom-right",
            duration: 3000
          });
          this.bigsearchimg = "";
        } else {
          this.clearRect();
          this.$notify({
            type: "error",
            message: "图片上传失败",
            position: "bottom-right",
            duration: 3000
          });
          this.bigsearchimg = "";
        }
      });
    },
    //执行中科院以图搜图的识别方法
    zkyImgPicWh() {
      var img = new Image();
      img.onload = () => {
        let imgs = document.getElementById("imgItemsearch");
        let divs = document.getElementById("imgBoxsearch");
        //图片加载完成之后执行图片自适应的方法 传入图片的dom和图片父元素的dom
        this.searchImgWh(imgs, divs);
      };
      img.src = this.bigsearchimg;
      let data = {
        imageUrl: this.bigsearchimg, //图片的url地址
        recFlag: 3, //1:识别人，非机动车，车辆，2：识别人脸
        // recFlag: 1,
        detectMode: 0 //0：大图（默认用这个），1：小图，2：大图小图都识别（性能差）
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/recImage", data).then(reponse => {
        if (reponse.data.code == 200) {

          //如果识别的图片中没有人，车，骑车人的数据则提示图片识别失败
          // this.recodeResult = reponse.data.data.AllResult
          this.recodeResult = JSON.parse(reponse.data.data).AllResult;
          console.log(this.recodeResult, 9696969696);
          if (
            this.recodeResult.Result[0].Vehicles.length == 0 &&
            this.recodeResult.Result[0].Pedestrian.length == 0 &&
            this.recodeResult.Result[0].NonMotorVehicles.length == 0
            && this.recodeResult.Result[0].Faces.length == 0
          ) {
            this.$notify({
              type: "warning",
              message: "图片识别失败",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
          if (
            (this.recodeResult.Result[0].Vehicles == undefined &&
              this.recodeResult[0].Result.Pedestrian == undefined &&
              this.recodeResult.Result[0].NonMotorVehicles == undefined) ||
            this.recodeResult == ""
            && this.recodeResult.Result[0].Faces.length == 0
          ) {
            this.$notify({
              type: "warning",
              message: "图片识别失败",
              position: "bottom-right",
              duration: 3000
            });
            return;
          } else {
            this.clickRecodeimg = false;
          }
          //执行框选方法，并自动框选第一个目标
          this.zkyinitCanvas();
        } else if (reponse.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "图片识别失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //执行框选的方法框出第一个目标
    zkyinitCanvas() {
      //第一次进入识别信息的时候，判断数据是否存在，如果存在车辆，就默认选中一个车辆信息
      //如果车辆不存在就执行骑车人的第一个信息，如果骑车人信息不存在就执行人的信息，否则返回null
      if (this.recodeResult.Result[0].Vehicles.length) {
        this.currentCar = 0;
      } else if (this.recodeResult.Result[0].Pedestrian.length) {
        this.currentper = 0;
      } else if (this.recodeResult.Result[0].NonMotorVehicles.length) {
        this.currentbic = 0;
      }else if (this.recodeResult.Result[0].Faces.length) {
        this.currentface = 0;
      } else {
        this.currentCar = null;
        this.currentper = null;
        this.currentbic = null;
      }
      //如果有人车骑车人的任意一个信息，则传值到第0个索引，并框选目标
      this.drawCarInfo(0);
    },

    //执行图片的自适应
    searchImgWh(imgs, divs) {
      //获取图片的原始宽高以及缩放后的宽厚，图片父元素的宽高
      //通过比率来计算图片是否是宽度自适应还是高度自适应
      var imgw = imgs.naturalWidth; //图片的原始宽度
      var imgh = imgs.naturalHeight; //图片的原始高度
      var retw = divs.clientWidth;
      var reth = divs.clientHeight;
      var canvas = document.getElementById("pCanvas");
      setTimeout(() => {
        canvas.setAttribute("width", imgs.width);
        canvas.setAttribute("height", imgs.height);
      }, 0);
      /// div宽高 除以图片的实际宽高
      //如果小于比率则是图片的宽度100% 高度自适应，反之高度100% 宽度自适应
      if (retw / reth < imgw / imgh) {
        imgs.style.width = "100%";
        imgs.style.height = "auto";
        this.unit = imgw / retw;
      } else {
        imgs.style.height = "100%";
        imgs.style.width = "auto";
        this.unit = imgh / reth;
      }
      this.imgPicInquire = true;
    },

    drawCarInfo(pIndex) {
      this.clearRect(); //清除Canvas
      this.zkydrawAlltarget();
      this.zkydrawfirst(pIndex, "red"); //框选第一个目标
    },
    //中科院框选出所有识别出来的人，车，骑车人
    zkydrawAlltarget() {
      if (this.recodeResult.Result[0].Vehicles.length) {
        //表示结果有车辆信息，就画出所有的车的信息
        for (let i = 0; i < this.recodeResult.Result[0].Vehicles.length; i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result[0].Vehicles[i], "yellow");
        }
      }
      if (this.recodeResult.Result[0].Pedestrian.length) {
        //表示结果有人的信息，就画出所有的人的信息
        for (
          let i = 0;
          i < this.recodeResult.Result[0].Pedestrian.length;
          i++
        ) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result[0].Pedestrian[i], "yellow");
        }
      }
      if (this.recodeResult.Result[0].NonMotorVehicles.length) {
        //表示结果有骑车人的信息，就画出所有的骑车人的信息
        for (
          let i = 0;
          i < this.recodeResult.Result[0].NonMotorVehicles.length;
          i++
        ) {
          //执行画框的方法
          this.drawRect(
            this.recodeResult.Result[0].NonMotorVehicles[i],
            "yellow"
          );
        }
      }
      if (this.recodeResult.Result[0].Faces.length) {
        //表示结果有骑车人的信息，就画出所有的骑车人的信息
        for (let i = 0;  i < this.recodeResult.Result[0].Faces.length;  i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result[0].Faces[i],"yellow");
        }
      }
    },
    //中科院框选第一个目标
    zkydrawfirst(pIndex, color) {
      if (this.recodeResult.Result[0].Vehicles.length && this.currentCar !== null) {
        //表示结果有车辆信息，就执行车辆的第一个
        this.drawRect(this.recodeResult.Result[0].Vehicles[pIndex], color);
        return;
      } else if (this.recodeResult.Result[0].Pedestrian.length && this.currentper !== null) {
        //表示结果有人的信息，就执行车辆的第一个
        this.drawRect(this.recodeResult.Result[0].Pedestrian[pIndex], color);
        return;
      } else if (this.recodeResult.Result[0].NonMotorVehicles.length &&  this.currentbic !== null) {
        //表示结果有骑车人的信息，就执行车辆的第一个
        this.drawRect(this.recodeResult.Result[0].NonMotorVehicles[pIndex],color);
        return;
      }else if (this.recodeResult.Result[0].Faces.length && this.currentface !== null) {
        this.drawRect(this.recodeResult.Result[0].Faces[pIndex], color);
        return
      }
    },

    // 清除画框
    clearRect() {
      let photoCanvas = document.getElementById("pCanvas");
      let pCtx = photoCanvas.getContext("2d");
      pCtx.clearRect(0, 0, photoCanvas.clientWidth, photoCanvas.clientHeight);
    },
    //执行框选的方法
    drawRect(pos, color) {
      var pCanvas = document.getElementById("pCanvas");
      var sCtx = pCanvas.getContext("2d");
      this.zkyDraw(pos, color);
    },
    // 中科院画框
    zkyDraw(pos, color) {
      let sCtx = pCanvas.getContext("2d");
      let x = pos.RegionLeft / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
      let y = pos.RegionTop / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
      let w = pos.RegionWidth / this.unit;
      let h = pos.RegionHeight / this.unit;
      sCtx.strokeStyle = color;
      sCtx.strokeRect(x, y, w, h);
    },
    choiceCar(ev) {
      this.currentCar = null;
      this.currentper = null;
      this.currentbic = null;
      this.currentface = null;
      let offsetX = ev.offsetX; //当前点击的坐标位置
      let offsetY = ev.offsetY; //当前点击的坐标的位置
      //如果有车辆的信息，则判断当前的坐标
     if (this.zkyFaceList.length > 0) {
            for (let i = 0; i < this.zkyFaceList.length; i++) {
              //如果当前点击的坐标位置刚好在格林深瞳返回的坐标之中，给当前索引赋值，并框选目标
              if (
                this.zkyFaceList[i].leftTopX / this.unit < offsetX &&
                (this.zkyFaceList[i].leftTopX + this.zkyFaceList[i].rightBtmX) / this.unit > offsetX &&
                this.zkyFaceList[i].leftTopY / this.unit < offsetY &&
                (this.zkyFaceList[i].leftTopY + this.zkyFaceList[i].rightBtmY) / this.unit > offsetY) {
                this.currentface = i;
                this.drawCarInfo(this.currentface);
              }
            }
          }
        if (this.zkyCarList.length > 0) {
          for (let i = 0; i < this.zkyCarList.length; i++) {
            if(this.currentface == 0 || this.currentface){
                return
              }
            //如果当前点击的坐标位置刚好在格林深瞳返回的坐标之中，给当前索引赋值，并框选目标
            if (
              this.zkyCarList[i].leftTopX / this.unit < offsetX &&
              (this.zkyCarList[i].leftTopX + this.zkyCarList[i].rightBtmX) / this.unit > offsetX &&
              this.zkyCarList[i].leftTopY / this.unit < offsetY &&
              (this.zkyCarList[i].leftTopY + this.zkyCarList[i].rightBtmY) / this.unit > offsetY) {
              this.currentCar = i;
              this.drawCarInfo(this.currentCar);
            }
          }}
        if (this.zkyPerList.length > 0) {
          if(this.currentbic == 0 || this.currentbic || this.currentface == 0 || this.currentface){
            return
          }
          for (let i = 0; i < this.zkyPerList.length; i++) {
            if (
              this.zkyPerList[i].leftTopX / this.unit < offsetX &&
              (this.zkyPerList[i].leftTopX + this.zkyPerList[i].rightBtmX) / this.unit > offsetX &&
              this.zkyPerList[i].leftTopY / this.unit < offsetY &&
              (this.zkyPerList[i].leftTopY + this.zkyPerList[i].rightBtmY) / this.unit > offsetY) {
                  this.currentper = i;
                  this.drawCarInfo(this.currentper);

            }
          }}
        if (this.zkyBicList.length > 0) {
          if(this.currentper == 0 || this.currentper || this.currentface == 0 || this.currentface){
            return
          }
          for (let i = 0; i < this.zkyBicList.length; i++) {
            if (
              this.zkyBicList[i].leftTopX / this.unit < offsetX &&
              (this.zkyBicList[i].leftTopX + this.zkyBicList[i].rightBtmX) / this.unit >
              offsetX &&
              this.zkyBicList[i].leftTopY / this.unit < offsetY &&
              (this.zkyBicList[i].leftTopY + this.zkyBicList[i].rightBtmY) / this.unit >
              offsetY
            ) {
              this.currentbic = i;
              this.drawCarInfo(this.currentbic);
            }
          }
        }
    },
    //把坐标给子组件
    getcoordTore() {
      let typeFlag;
      this.dialogVisible = false;
      if (
        this.currentCar == null &&
        this.currentper == null &&
        this.currentbic == null &&
        this.currentface == null
      ) {
        return;
      } else if (this.currentCar != null) {
        this.searchresult = this.recodeResult.Result[0].Vehicles[this.currentCar];
        typeFlag = 2
      } else if (this.currentper != null) {
        this.searchresult = this.recodeResult.Result[0].Pedestrian[this.currentper];
         typeFlag = 1
      } else if (this.currentbic != null) {
        this.searchresult = this.recodeResult.Result[0].NonMotorVehicles[this.currentbic];
         typeFlag = 3
      }else if (this.currentface != null) {
        this.searchresult = this.recodeResult.Result[0].Faces[this.currentface];
        typeFlag = 4
      }
      this.imgUrlShow = this.recodeResult.Result[0].ImageUri;
      //   this.zkysvaeImg(this.searchresult);
      this.$emit("childsearch", this.searchresult, this.imgUrlShow, false,typeFlag);
    },
    //2.中科院把当前选中的结果写入到以图搜图的页面中去
    zkysvaeImg(row) {
      //获取图片的DOM以及当前以图搜图展示的DOM元素
      this.$nextTick(() => {
        let imgs = document.getElementById("imgUrlShow"); //图片大小
        let imgBox = document.getElementById("searchsmallImg"); //div大小
        let leftTopX = this.$commons.isEmpty(row.RegionLeft)
          ? 0
          : row.RegionLeft; //目标相对图片的横坐标
        let leftTopY = this.$commons.isEmpty(row.RegionTop) ? 0 : row.RegionTop; //目标相对图片的纵坐标
        let imgw = row.RegionWidth; //目标相对图片的宽度
        let imgh = row.RegionHeight; //目标相对图片高度
        let retw = imgBox.clientWidth; //div的实际宽度
        let reth = imgBox.clientHeight; //div的实际高度
        let unit = 1; //图片和div的默认比例
        let posLeft = 0;
        let posTop = 0;
        //通过图片宽高比以及图片的实际比计算出人物的比率
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
        } else {
          unit = imgh / reth;
        }
        // 通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
        imgs.style.width = row.SrcImageWidth / unit + "px";
        imgs.style.height = row.SrcImageHeight / unit + "px";
        imgs.style.top = -(leftTopY / unit) + posTop + "px";
        imgs.style.left = -(leftTopX / unit) + posLeft + "px";
      });
    },
    //快捷清空所有人，车，骑车人的信息
    clearInfoMation() {
      this.strutInfoCar = "";
      this.strutInfoPeople = "";
      this.strutInfoBicycle = "";
      this.glstargetinfo = {};
    }
  }
};
</script>


<style scoped>
@import "../../assets/css/commom.css";
.photoWrap {
  display: flex;
  justify-content: space-between;
  background-color: rgba(16, 35, 56, 0.5);
}
.photoWrap .photo {
  position: relative;
  width: 6.25rem;
  /* margin-left:0.08rem; */
  margin: 0 auto;
  /*overflow: hidden;*/
}
.photoWrap .photo .showImg {
  position: relative;
  /*width: 7.2rem;*/
  height: 4rem;
  border: 1px solid #1f4572;
  border-bottom: none;
  overflow: hidden;
}
.photoWrap .photo .showImg img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.showPhoto {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  opacity: 1;
}
.photoWrap .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.74rem;
}
.photoWrap .info .infoItem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.photoWrap .info .infoItem .vinfolist,
.photoWrap .info .infoItem .carItemInfo {
  padding: 0.1rem 0 0.1rem 0.1rem;
  /* background-color:#F6F7FB; */
}
.photoWrap .info .infoItem .carItemInfo {
  height: 2.35rem;
  margin-bottom: 0.1rem;
  overflow-y: auto;
}
.photoWrap .uploadPhoto {
  /* margin-top:0.1rem; */
  padding: 0.1rem 0;
  text-align: center;
  border: 1px solid #1f4572;
  border-top: none;
  background: rgba(0, 0, 0, 0.2);
}
.uploadpage {
  padding: 0.05rem 0;
  text-align: center;
  border-top: none;
  background: rgba(0, 0, 0, 0.2);
}
.photoWrap .smallT {
  display: block;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  color: #409eff;
  font-size: 0.16rem;
  line-height: 0.24rem;
  font-weight: bold;
  padding-left: 0.1rem;
}
.navBar {
  position: relative;
  width: 6rem;
  border-left: 5px solid #1f4572;
}
.navLeft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 0.075rem;
  margin-bottom: 0.075rem;
  padding-left: 0.1rem;
}
.navCenter {
  width: 5.7rem;
  height: 4.42rem;
  margin: 0 auto;
  border: 1px solid #1f4572;
}
.showface ul {
  height: 4rem;
  overflow: auto;
}
.showface ul li {
  float: left;
  width: 32.33%;
  margin-right: 1%;
  border: 1px solid rgba(38, 85, 134, 0.32);
  background-color: rgba(28, 60, 95, 0.32);
  margin-bottom: 0.05rem;
  height: 1.8rem;
  position: relative;
}
.showface ul li:nth-child(3n) {
  margin-right: 0;
}
.showface li img {
  width: 100%;
  height: 100%;
}
.operationPrint {
  display: block;
}
.operationPrint p {
  color: #409eff;
  margin-bottom: 0.05rem;
}
.el-pagination  .el-pagination__total,
.el-pagination /deep/ .el-pagination__total {
  font-size: 12px;
  height: 22px;
  line-height: 22px;
}
.el-pagination .el-select .el-input .el-input__inner,
.el-pagination /deep/ .el-select .el-input .el-input__inner {
  height: 22px;
}
.el-pagination .el-pagination__sizes .el-input .el-input__inner,
.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
  font-size: 0.12rem;
}
</style>
