
<template>
  <div class="taskMange">
    <el-dialog
      title="人脸查询"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="13rem"
    >
      <div class="operationPrint">
        <p>
          操作提示：（人脸查询实现方式，1.选择人脸库中的图片，
          2.上传自定义人脸图片）
        </p>
      </div>
      <div class="photoWrap">
        <div id="photoCvss" @click="choiceCar($event)" class="photo">
          <span class="smallT">| 图片源</span>
          <div class="showImg" id="imgBoxsearch">
            <img id="imgItemsearch" style="width: auto;height: 100%" :src="imgUrl">
            <canvas v-if="spreadPic" id="pCanvas" class="showPhoto"></canvas>
            <span id="mask" class="mask"></span>
          </div>
          <el-upload
            class="uploadPhoto"
            action="vehicle/image/upload"
            name="uploadImage"
            ref="upload"
            :before-upload="beforeAvatarUpload"
          >
            <el-button
              size="small"
              class="topBtn"
              icon="el-icon-picture-outline"
              type="primary"
            >上传图片</el-button>
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
        </div>-->
        <div class="navBar">
          <div class="navLeft">
            <el-select
              size="small"
              v-model="pullDownFace"
              placeholder="请选择库"
              @change="changeSus"
              value-key="dbName"
            >
              <el-option
                v-for="(item,index) in faceData"
                :key="index"
                :label="item.dbName"
                :value="item"
              ></el-option>
            </el-select>
            <!-- <el-input size="small" v-model="keyword" style="width:1.8rem;"></el-input>
            <el-button size="small" type="primary" class="searchBtn" @click="searchFace">查询</el-button>-->
          </div>
          <div class="navCenter">
            <div class="showface">
              <ul>
                <li
                  v-for="(item,index) in faceList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :key="index"
                  @click="uploadFace(item)"
                >
                  <img :src="item.faceUrl" alt>
                </li>
              </ul>
            </div>
            <div class="uploadpage">
              <el-pagination
                background
                :small="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalCount"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canclePicture"></el-button>
        <el-button
          v-no-more-click
          :title="recodetarget ? '正在识别' : ''"
          :disabled="recodetarget"
          @click="getcoordTore"
        ></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      imgUrl: "",
      imgData: {
        code: "",
        message: "",
        data: {}
      }, // 识别出来的信息
      currentCar: 0, // 显示车辆的索引
      imageWidth: "", // 图片的宽度
      imageHeight: "", // 图片的高度
      unit: 1, // 图片宽度适应比例尺
      spreadPic: false, // 默认隐藏
      keyword: "", // 模糊搜索低库列表
      faceData: [], // 存储数据
      pullDownFace: {},
      faceList: [], //当前库人脸列表
      currentPage: 1,
      pageSize: 12,
      totalCount: 0,
      loading: null, //加载
      recodetarget: true,
      isdbclick: false //是否连续点击
    };
  },
  mounted() {},
  watch: {
    openSearchCase(val) {
      this.dialogVisible = val;
    }
  },
  props: {
    openSearchCase: Boolean
  },
  computed: {
    //图片上所有车辆的位置坐标列表
    carList() {
      let cList = [];
      if (this.imgData.data.faceOutputInfoList != undefined) {
        if (this.imgData.data.faceOutputInfoList.length) {
          for (
            let i = 0;
            i < this.imgData.data.faceOutputInfoList.length;
            i++
          ) {
            cList.push({
              leftTopX: this.imgData.data.faceOutputInfoList[i].facePos
                .leftTopX,
              leftTopY: this.imgData.data.faceOutputInfoList[i].facePos
                .leftTopY,
              rightBtmX: this.imgData.data.faceOutputInfoList[i].facePos
                .rightBtmX,
              rightBtmY: this.imgData.data.faceOutputInfoList[i].facePos
                .rightBtmY
            });
          }
        }
      }
      return cList;
    }
  },
  methods: {
    changeSus(row) {
      this.currentPage = 1;
      this.getAllFaceList(row.id);
    },
    //得到人脸底库列表
    getAllFaceMan() {
      let data = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: "",
        orderType: "",
        dbName: this.keyword
      };
      this.$http
        .get("sms/threeFaceDb/faceDbList", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.faceData = res.data.data.data.list;
          } else {
            this.$notify({
              type: "warning",
              message: res.data.message,
              position: "bottom-right",
              duration: 3000
            });
          }
        });
    },
    // // 点击查询
    // searchFace(){
    //   this.getAllFaceMan()
    // },
    // 查看人脸数据
    getAllFaceList(id) {
      this.filelist = [];
      let data = {
        faceDbPrimaryKey: id
      };
      this.$http.get("sms/face/getXinFaceList", { params: data }).then(res => {
        if (res.data.code == 200) {
          if (res.data.data == null) {
            this.faceList = [];
            this.totalCount = 0;
          } else {
            this.faceList = res.data.data;
            this.totalCount = Number(res.data.data.length);
            console.log(this.totalCount,'rrrr');
          }
        }
      });
    },
    // 点击上传人脸
    uploadFace(item) {
      if (!this.isdbclick) {
        this.isdbclick = true;
        this.spreadPic = true;
        let formData = new FormData();
        formData.append("imgUrl", item.faceUrl);
        this.uploadloading = this.$loading({
          text: "正在上传...",
          spinner: "el-icon-loading",
          target: "#imgBoxsearch"
        });
        // alert(item)
        this.$http({
          url: "/pca/targetRecognition/recognitionFace",
          method: "post",
          data: formData
        }).then(res => {
          this.uploadloading.close();
          this.imgUrl = item.faceUrl;
          setTimeout(() => {
            this.isdbclick = false;
          }, 500);
          if (res.data.code == 200) {
            if (res.data.data.faceOutputInfoList.length == 0) {
              document.getElementById("imgItemsearch").style.width = "100%";
              // console.log(res.data.data.faceOutputInfoList);
              this.$notify({
                type: "warning",
                message: "未能识别出人脸信息，请重新上传！",
                position: "bottom-right",
                duration: 3000
              });
              this.clearRect();
              this.recodetarget = true;
              this.imgData = {
                code: "",
                message: "",
                data: {}
              }; // 识别出来的信息
            } else {
              this.recodetarget = false;
              this.imgUrlShow = "";
              this.imgData = res.data;
              this.initCanvas();
            }
          } else if (res.data.code == 801) {
            this.badImgWh();
            this.clearRect();
            this.$notify({
              type: "warning",
              message: "图片识别失败",
              position: "bottom-right",
              duration: 3000
            });
          } else if (res.data.code == 802) {
            this.badImgWh();
            this.clearRect();
            this.$notify({
              type: "warning",
              message: "图片上传失败",
              position: "bottom-right",
              duration: 3000
            });
          } else if (res.data.code == 803) {
            this.badImgWh();
            this.clearRect();
            this.$notify({
              type: "warning",
              message: "图片格式不正确！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.badImgWh();
            this.clearRect();
            this.$notify({
              type: "warning",
              message: "图片识别失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      }
    },
    //关闭模态框
    closeDia() {
      this.recodetarget = true;
      this.imgUrl = "";
      this.faceData = [];
      this.totalCount = 0;
      this.currentPage = 1;
      this.pullDownFace = "";
      // this.keyword = ''
      this.faceList = [];
      this.$emit("childsearch", false, "", "");
      this.clearRect();
      this.spreadPic = false;
    },

    //打开模态框
    opendia() {
      // this.getAllFaceList();
      this.getAllFaceMan();
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
      };
    },
    //放大镜
    getScrollMag() {
      let scrollLeft =
        document.body.scrollLeft || document.documentElement.scrollLeft;
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    },
    // 上传图片
    beforeAvatarUpload(file, a, b) {
      // this.spreadPic = true;
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
      if (file.size / 1024 / 1024 >= 8) {
        this.$notify({
          type: "warning",
          message: "上传图片不能大于10M",
          position: "bottom-right",
          duration: 3000
        });
        return false;
      }
      this.spreadPic = true;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let formData = new FormData();
      formData.append("uploadImage", file);
      let _this = this;
      _this.uploadloading = null;
      _this.uploadloading = _this.$loading({
        text: "正在上传...",
        spinner: "el-icon-loading",
        target: "#imgBoxsearch"
      });
      this.$http({
        url: "/pca/targetRecognition/recognitionFace",
        method: "post",
        data: formData
      }).then(res => {
        _this.uploadloading.close();
        _this.uploadloading = null;
        // this.imgUrl = reader.result;
        if (res.data.code == 200) {
          if (res.data.data.faceOutputInfoList.length == 0) {
            this.badImgWh();
            this.$notify({
              type: "warning",
              message: "未能识别出人脸信息，请重新上传！",
              position: "bottom-right",
              duration: 3000
            });
            this.clearRect();
            this.imgUrl = reader.result;
            this.badImgWh();
            // this.recodetarget = true;
          } else {
            this.imgUrl = '';
            this.recodetarget = false;
            this.imgUrl = reader.result;
            this.imgUrlShow = "";
            this.imgData = res.data;
            this.initCanvas();
            // this.recodetarget = true;
          }
        } else if (res.data.code == 801) {
          this.badImgWh();
          this.clearRect();
          this.$notify({
            type: "error",
            message: "图片识别失败！",
            position: "bottom-right",
            duration: 3000
          });
        } else if (res.data.code == 802) {
          this.badImgWh();
          this.clearRect();
          this.$notify({
            type: "error",
            message: "图片上传失败！",
            position: "bottom-right",
            duration: 3000
          });
        } else if (res.data.code == 803) {
          this.badImgWh();
          this.clearRect();
          this.$notify({
            type: "error",
            message: "图片格式不正确！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.badImgWh();
          this.clearRect();
          this.$notify({
            type: "error",
            message: "图片识别失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
      return false;
    },
    //识别失败后执行图片自适应
    badImgWh() {
      let img = new Image();
      img.onload = () => {
        this.imageWidth = img.naturalWidth;
        this.imageHeight = img.naturalHeight;
        this.imgWH();
        let photoCanvas = document.getElementById("pCanvas");
        photoCanvas.width = 0;
        photoCanvas.height = 0;
      };
      img.src = this.imgUrl;
      this.imgData = {
        code: "",
        message: "",
        data: {}
      }; // 识别出来的信息
    },
    //识别成功后框选出第一个人脸，并识别
    initCanvas() {
      if (this.imgData.data.faceOutputInfoList.length) {
        //默认选中第一个人
        this.currentCar = 0; //显示第一辆车的标识信息
        this.imageWidth = this.imgData.data.faceOutputInfoList[0].width;
        this.imageHeight = this.imgData.data.faceOutputInfoList[0].height;
        this.imgWH();
        //画出所有车的方框
        this.drawCarInfo(0);
      }
    },
    imgWH() {
      let imgBox = document.getElementById("imgBoxsearch");
      let imgs = document.getElementById("imgItemsearch");
      let photoCanvas = document.getElementById("pCanvas");
      let imgw = this.imageWidth;
      let imgh = this.imageHeight;
      let retw = imgBox.clientWidth;
      let reth = imgBox.clientHeight;
      if (retw / reth < imgw / imgh) {
        imgs.style.width = "100%";
        imgs.style.height = "auto";
        this.unit = imgw / retw;
      } else {
        imgs.style.height = "100%";
        imgs.style.width = "auto";
        this.unit = imgh / reth;
      }
      photoCanvas.width = imgw / this.unit;
      photoCanvas.height = imgh / this.unit;
    },

    drawCarInfo(pIndex) {
      this.clearRect();
      this.drawAllCar();
      this.drawCar(pIndex, "red");
    },
    // 画出所有的框
    drawAllCar() {
      if (!this.imgData.data.faceOutputInfoList.length) {
        return false;
      }
      var allImgData = this.imgData.data.faceOutputInfoList;

      for (let i = 0; i < allImgData.length; i++) {
        this.drawRect("root", allImgData[i], "yellow");
      }
    },
    //画框
    drawCar(pIndex, color) {
      if (!this.imgData.data.faceOutputInfoList.length) {
        return false;
      }
      let parent = this.imgData.data.faceOutputInfoList[pIndex];
      this.drawRect(
        "root",
        this.imgData.data.faceOutputInfoList[pIndex],
        color
      );
    },
    // 清除画框
    clearRect() {
      let photoCanvas = document.getElementById("pCanvas");
      let pCtx = photoCanvas.getContext("2d");
      pCtx.clearRect(0, 0, photoCanvas.clientWidth, photoCanvas.clientHeight);
    },
    //根据坐标和宽高画框
    drawRect(parent, pos, color) {
      if (!pos) {
        return;
      }
      let photoCanvas = document.getElementById("pCanvas");
      let pCtx = photoCanvas.getContext("2d");
      let x = pos.facePos.leftTopX / this.unit;
      let y = pos.facePos.leftTopY / this.unit;
      let w = (pos.facePos.rightBtmX - pos.facePos.leftTopX) / this.unit;
      let h = (pos.facePos.rightBtmY - pos.facePos.leftTopY) / this.unit;
      if (parent !== "root") {
        x = x + parent.leftTopX / this.unit;
        y = y + parent.leftTopY / this.unit;
      }
      pCtx.strokeStyle = color;
      pCtx.strokeRect(x, y, w, h);
    },
    //点击图片中车辆选中
    choiceCar(ev) {
      let imgItem = document.getElementById("imgItemsearch");
      let offsetX = this.getPageMag(ev).pageX - $(imgItemsearch).offset().left;
      let offsetY = this.getPageMag(ev).pageY - $(imgItemsearch).offset().top;
      if (this.carList.length > 0) {
        for (let i = 0; i < this.carList.length; i++) {
          if (
            this.carList[i].leftTopX / this.unit < offsetX &&
            this.carList[i].rightBtmX / this.unit > offsetX &&
            this.carList[i].leftTopY / this.unit < offsetY &&
            this.carList[i].rightBtmY / this.unit > offsetY
          ) {
            this.currentCar = i;
          }
        }
      } else {
        return null;
      }
      this.drawCarInfo(this.currentCar);
    },

    //把坐标给子组件
    getcoordTore() {
      this.totalCount = 0;
      this.currentPage = 1;
      this.dialogVisible = false;
      this.pullDownFace = "";
      if (
        this.imgData.data.faceOutputInfoList == undefined ||
        this.imgData.data.faceOutputInfoList.length == 0
      ) {
        this.$emit("childsearch", false, "", "");
      } else {
        this.$emit(
          "childsearch",
          false,
          this.imgData.data.faceOutputInfoList[this.currentCar],
          this.imgUrl
        );
      }
    },

    // 点击取消
    canclePicture() {
      this.totalCount = 0;
      this.currentPage = 1;
      this.pullDownFace = "";
      this.$emit("childsearch", false, "", "");
      this.imgUrl = "";
      this.clearRect();
      this.spreadPic = false;
      this.recodetarget = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
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
.el-pagination /deep/ .el-pagination__total {
  font-size: 12px;
  height: 22px;
  line-height: 22px;
}
.el-pagination /deep/ .el-select .el-input .el-input__inner {
  height: 22px;
}
.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
  font-size: 0.12rem;
}
</style>
