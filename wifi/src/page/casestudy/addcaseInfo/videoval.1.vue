<template>
  <div>
    <el-dialog
      title="视频检索"
      class="dialog1"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancleOk"
      @open="setName"
      width="12rem"
    >
      <span>
        <div class="retrieval">
          <div class="retrimain">
            <p class="retritask">视频检索任务</p>
            <p class="taskNames">
              <span>任务名称：</span>
              <input type="text" v-model="tastName" maxlength="50" placeholder="请输入任务名称">
            </p>
            <div class="searchtype" v-show="isonline">
              <span>检索时间：</span>
              <input type="text" id="time1" :title="beginData" v-model="beginData" placeholder="请输入开始时间"> -
              <input type="text" id="time2" :title="endData" v-model="endData" placeholder="请输入结束时间">
              <el-button class="searchBtn" @click="searhlineImg">查询</el-button>
            </div>
            <div class="setretrieve">
              <p>检索规则设置：</p>
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
                    <el-radio :label="3">模糊</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>
          <div class="reterImg">
            <p>
              <span>目标区域标记</span>

              <el-button class="searchBtn" @click="clearcanvas">清空检索方式</el-button>
            </p>
            <div id="reterimgVideoVal" @dblclick="getyuan" @click="getcanvas">
              <img id="imgsVideoVal" v-show="showimg" :src="videoImg" alt>
              <canvas id="canvasVideoVal"></canvas>
              <canvas v-show="showCanvas" id="canvasVideo"></canvas>
            </div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset"></el-button>
        <el-button v-no-more-click  @click="getAllsubmit"></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  draw,
  circle,
  drawPolygon,
  coorValue,
  imgwh,
  Line
} from "../../videoCombat/canvas.js";
import realvideo from "../../../api/realvideo/realvideo.js";
let videoIco = require("@/assets/images/device/video.png");
let RFIDIco = require("@/assets/images/device/RFID.png");
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import videoDown from "../../../api/casestudy/videoDown.js";

export default {
  data() {
    return {
      dialogVisible: false,
      tastName: "", //任务名称
      filterText: "", // 搜索节点
      filterText1: "", // 搜索节点
      retrimodel: 1, // 检索方式
      targetsize: 1, // 目标大小
      targetqxd: 1, // 目标清晰度
      tableData:[],
      coordinates: [], // 装点击坐标的数组
      circle: [], // 装圆点的坐标
      actualcoord: [], // 实际图片的坐标
      actuacircle: [], // 实际圆点的坐标
      videoUrl: "",
      videoImg: "", //视频的图片
      showimg:false,
      showCanvas: false,
      points: [],
      beginData: this.getEarlierDate(), // 开始时间
      endData: this.getCurrentDate(), // 结束时间
      treeline: [],
      gbDeviceId: "", //设备ID
      loading: null,
      fileNum: 0
    };
  },
  watch: {
    istrue(val) {
      this.dialogVisible = val;
    }
  },
  mixins: [realvideo, beginEnd, videoDown],

  methods: {
    //打开检索的时候自动设置名称
    setName() {
      this.$nextTick(() => {
        //isonline 表示的是点击的天网点位
        //打开天网点位的时候请求天网树的列表，获取当前点位的设备ID，通过点位的deviceId来判断
        if (this.isonline) {
          this.OpenTheTime3("#time1", "#time2");
          this.getlineTree();
        } else {
          this.getAllvideo();
        }
        this.clearcanvas();
      });
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let Name = userInfo.value.userName;
      let date = new Date();
      let year = date.getFullYear(); //获取系统的年；
      let mouth =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); // 获取系统日，
      let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取系统时，
      let min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
      let seon =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
      this.tastName =
        Name + year + mouth + day + hour + min + seon + "视频检索";
    },
    //打开检索第二步得到所有的视频，获取图片，然后画框
    //得到视频
    getAllvideo() {
      let data = {
        fileName: this.keyword,
        pageNum: 1,
        pageSize: 2000,
        begin: "",
        end: "",
        // statusl: "2,3,4,6",
        deviceId: this.deviceids,
        caseUuid: this.$route.query.caseUuid,
        orderBy: "start_time",
        orderType: "asc"
      };
      this.$http
        .get("vsas/collection/offline/list", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            let tablelist = res.data.data.list;
            if (tablelist.length) {
              for (let i = 0; i < tablelist.length; i++) {
                if(tablelist[i].deviceType != 0 && (res.data.data.list[i].status == 2 || res.data.data.list[i].status == 3 || res.data.data.list[i].status == 4 || res.data.data.list[i].status == 6)){
                  this.tableData.push(tablelist[i])
                }
              }
              if(this.tableData.length){
                for (let i = 0; i < this.tableData.length; i++) {
                  if(this.tableData[i].snapUrl != null){
                    this.videoImg = this.tableData[i].snapUrl;
                    console.log(this.videoImg,11111);
                    document.getElementById("imgsVideoVal").style.display = "none";
                    let image = new Image()
                    image.onload =()=>{
                      this.dialogvideo();
                    }
                    image.src = this.videoImg
                    return
                  }else{
                    this.videoImg = ''
                  }
                }
              }else{
                this.videoImg = ''
              }
            }
          }
        });
    },
    //通过获取快照来 判断图片的宽度和高度
    dialogvideo() {
      this.clearcanvas();
      this.$nextTick(() => {
        setTimeout(() => {
          var imgs = document.getElementById("imgsVideoVal");
          var reterimg = document.getElementById("reterimgVideoVal");
          document.getElementById("imgsVideoVal").style.display = "block";
          imgwh(imgs, reterimg);
          this.showimg = true
          setTimeout(() => {
            var canvas = document.getElementById("canvasVideoVal");
            var canvastwo = document.getElementById("canvasVideo");
            canvas.setAttribute("width", imgs.clientWidth);
            canvas.setAttribute("height", imgs.clientHeight);
            canvastwo.setAttribute("width", imgs.clientWidth);
            canvastwo.setAttribute("height", imgs.clientHeight);
          }, 200);
        }, 200);
      });
    },
    //请求天网设备
    getlineTree() {
      this.$http.post("sms/ape/selectByVideo").then(res => {
        this.treeline = res.data.data;
        let treeline = res.data.data;
        //通过树列表来获取设备ID
        for (let i = 0; i < treeline.length; i++) {
          if (treeline[i].apes) {
            for (let j = 0; j < treeline[i].apes.length; j++) {
              if (this.deviceids == treeline[i].apes[j].shebeiId) {
                this.gbDeviceId = treeline[i].apes[j].apeId;
              }
            }
          }
        }
      });
    },
    //通过时间段来查询天网快照,与C++进行http交互
    searhlineImg() {
      this.videoImg = ''
      // let aaa = '/searchHisImg/TakeGBSnapshot?file='+ sessionStorage.getItem('controlHead') + this.gbDeviceId + '?t=' + this.beginData.replace(' ','_') +"@" +this.endData.replace(' ','_');
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      this.$http.post("/searchHisImg/TakeGBSnapshot?file=" +  sessionStorage.getItem("controlHead") +
       this.gbDeviceId +  "?t=" +  this.beginData.replace(" ", "_") +  "@" +  this.endData.replace(" ", "_")  )
        .then(res => {
          console.log(res,res.data,res.data.code,'天网请求的rul');
          if (res.data.code == 200) {
            this.loading.close();
            this.videoImg = res.data.path;
            let image = new Image()
            image.onload =()=>{
              this.dialogvideo();
            }
            image.src = res.data.path
          } else {
             this.$notify({
              type: "warning",
              message: "获取场景图失败，请重试！",
              position: "bottom-right",
              duration: 3000
            });
            this.loading.close();
          }
        }).catch(()=>{
          this.$notify({
            type: "warning",
            message: "获取场景图失败，请重试！",
            position: "bottom-right",
            duration: 3000
          });
          this.loading.close();
        })
        ;

    },
    cancleOk() {
      this.showimg = false
      this.coordinates = []
      this.actuacircle = [];
      this.tableData = []
      this.points = [];
      this.circle=  [], // 装圆点的坐标
      this.actualcoord = [], // 实际图片的坐标
      this.videoImg = ''
      this.$emit("childByValue", false);
      this.clearcanvas();
      this.retrimodel =1;
      this.targetsize =1;
      this.targetqxd = 1;
      this.reset();
    },
    // 画线
    getcanvas(e) {
      var context = document.getElementById("canvasVideoVal").getContext("2d");
      var x = e.offsetX;
      var y = e.offsetY;
      this.coordinates.push([e.offsetX, e.offsetY]);
      if (this.retrimodel === 1) {
        context.clearRect(0, 0, e.target.clientWidth, e.target.clientHeight);
        drawPolygon(context, this.coordinates);
      }
      if (this.retrimodel === 2) {
        draw(this.coordinates, context);
      }
      if (this.retrimodel === 3) {
        draw(this.coordinates, context); // 线
        if (this.coordinates.length > 2) {
          this.showCanvas = true;
          this.getyuan();
        }
      }
    },
    getyuan(e) {
      var canvas = document.getElementById("canvasVideo");
      var context = document.getElementById("canvasVideo").getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      let a = 0;
      let b = 0;
      if (this.coordinates[0][0] > this.coordinates[1][0]) {
        a =
          this.coordinates[1][0] +
          (this.coordinates[0][0] - this.coordinates[1][0]) / 2;
      } else {
        a =
          this.coordinates[0][0] +
          (this.coordinates[1][0] - this.coordinates[0][0]) / 2;
      }

      if (this.coordinates[0][1] > this.coordinates[1][1]) {
        b =
          this.coordinates[1][1] +
          (this.coordinates[0][1] - this.coordinates[1][1]) / 2;
      } else {
        b =
          this.coordinates[0][1] +
          (this.coordinates[1][1] - this.coordinates[0][1]) / 2;
      }
      var line = new Line(
        a,
        b,
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1],
        'red'
      );
      line.drawWithArrowheads(context);
    },
    // 切换画布  清空画布
    clearcanvas() {
      this.points = [];
      this.actuacircle = [];
      this.showCanvas = false;
      this.count = 0;
      var context = document.getElementById("canvasVideoVal").getContext("2d");
      var context1 = document.getElementById("canvasVideo").getContext("2d");
      var reterimg = document.getElementById("reterimgVideoVal");
      this.coordinates = [];
      context.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight);
      context1.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight);
    },

    //提交任务
    getAllsubmit() {
      if (this.isonline) {
        if (this.videoImg == "" || this.videoImg == null) {
          this.$notify({
            type: "warning",
            message: "请先获取快照！",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
      } else {
        if(this.tableData.length == 0){
          this.$notify({
            type: "warning",
            message: "请先选择视频再创建检索",
            position: "bottom-right",
            duration: 3000
          });
          return
        }
        if (this.videoImg == "" || this.videoImg == null) {
          this.$notify({
            type: "warning",
            message: "视频正在解析！",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
      }
      if (this.tastName == "") {
        this.$notify({
          type: "warning",
          message: "请输入任务名称",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.tastName.length > 50) {
        this.$notify({
          type: "warning",
          message: "任务名称小于50字",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      // 放到一个数组中去
      var imgs = document.getElementById("imgsVideoVal");
      if (this.retrimodel === 1) {
        if (this.coordinates.length) {
          this.coordinates.push(this.coordinates[this.coordinates.length - 1]);
        }
        coorValue(imgs, this.coordinates, this.actualcoord);
      } else if (this.retrimodel === 2) {
        if (this.coordinates.length < 2) {
          this.$notify({
            type: "warning",
            message: "请创建检索规则",
            position: "bottom-right",
            duration: 3000
          });
          return;
        } else {
          coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord);
        }
      } else if (this.retrimodel === 3) {
        if (this.coordinates.length < 3) {
          this.$notify({
            type: "warning",
            message: "请创建检索规则",
            position: "bottom-right",
            duration: 3000
          });
          return;
        } else {
          coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord);
          var imgw = imgs.naturalWidth;
          var imgh = imgs.naturalHeight;
          var retw = imgs.clientWidth;
          var reth = imgs.clientHeight;
          this.actuacircle[0] = parseInt(
            (imgw * this.coordinates[this.coordinates.length - 1][0]) / retw
          );
          this.actuacircle[1] = parseInt(
            (imgh * this.coordinates[this.coordinates.length - 1][1]) / reth
          );
        }
      }
      if (this.actuacircle.length == 0) {
        this.points = this.actualcoord.join(",");
      } else {
        this.points =
          this.actualcoord.join(",") + "," + this.actuacircle.join(",");
      }
      if (this.points.length == 0) {
        this.points =
          "0,0," +
          imgs.naturalWidth +
          ",0," +
          imgs.naturalWidth +
          "," +
          imgs.naturalHeight +
          ",0," +
          imgs.naturalHeight;
      }
      console.log(this.points,111);
      // return
      let img = new Image();
      // let ctx = cans.getContext('2d')
      img.setAttribute("crossOrigin", "anonymous");
      img.src =
        window.origin +
        "/fastDfs/" +
        this.videoImg.slice(
          this.videoImg.indexOf("group"),
          this.videoImg.length
        );
      let canvas = document.getElementById("canvasVideoVal");
      let canvas1 = document.getElementById("canvasVideo");
      let context = canvas.getContext("2d");
      let context1 = canvas.getContext("2d");
      let _this = this;
      img.onload = function() {
        context.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
        context1.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
      };
      setTimeout(() => {
        let canvasimg = canvas.toDataURL();
        let canvasimg1 = canvas1.toDataURL();
        // return
        //this.retrimodel == 1 || this.retrimodel == 2 表示区域或者框线生成图片
        //其他表示方向，要生成两张图片一个是先，一个是箭头
        if (this.retrimodel == 1 || this.retrimodel == 2) {
          let data = {
            imgBase64Str: canvasimg.split(",")[1]
          };
          data = this.$qs.stringify(data);
          this.$http.post("sms/uploadFile/upload/base64", data).then(res => {
            if (res.data.code == 200) {
              if (this.isonline && this.videoImg) {
                let url = this.videoImg + "," + res.data.data;
                this.getlinesub(url);
              } else {
                let url = this.videoImg + "," + res.data.data;
                this.getsubmit(url);
              }
            }
          });
        } else {
          let imgone;
          let data = {
            imgBase64Str: canvasimg.split(",")[1]
          };
          data = this.$qs.stringify(data);
          this.$http.post("sms/uploadFile/upload/base64", data).then(res => {
            if (res.data.code == 200) {
              imgone = res.data.data;
              let datas = {
                imgBase64Str: canvasimg1.split(",")[1]
              };
              datas = this.$qs.stringify(datas);
              this.$http
                .post("sms/uploadFile/upload/base64", datas)
                .then(res => {
                  if (res.data.code == 200) {
                    if (this.isonline && this.videoImg) {
                      let url =
                        this.videoImg + "," + res.data.data + "," + imgone;
                      this.getlinesub(url);
                    } else {
                      let url =
                        this.videoImg + "," + res.data.data + "," + imgone;
                      this.getsubmit(url);
                    }
                  }
                });
            }
          });
        }
      }, 200);
    },
    //天网检索任务提交
    getlinesub(snapsurl) {
      let url = `${sessionStorage.getItem("skyNetVideoSearchPath")}?submiterId=${this.$storage.getSession("userInfo").userId}&
        submiterName=${this.$storage.getSession("userInfo").userName}&infoKind=1&taskName=${this.tastName}&gbDeviceId=${this.gbDeviceId}&
        taskType=0&category=2&searchType=${this.retrimodel}&size=${this.targetsize}&clarity=${this.targetqxd}&points=${this.points}&
        gbServer=${sessionStorage.getItem("controlHead").substring(8,sessionStorage.getItem("controlHead").lastIndexOf(":"))}&
        gbPort=5000&deviceId=${this.deviceids}&snapUrl=${snapsurl}&
        startTime=${this.beginData.replace(" ","_")}&endTime=${this.endData.replace(" ", "_")}&
        fileAdd=${sessionStorage.getItem("collectAddInterface")}&caseUuid=${this.$route.query.caseUuid}&
        fileFini=${sessionStorage.getItem("collectFinishInterface")}&
        parseAdd=${window.origin + "/vsas/video/search/task/add"}&
        hdfs=${sessionStorage.getItem("collectHdfsPath")}`;
        console.log(url,8888);

      let onescript = document.createElement("script");
      onescript.src = url;
      document.body.appendChild(onescript);
      this.dialogVisible = false;
      this.$notify({
        type: "success",
        message: "任务创建成功",
        position: "bottom-right",
        duration: 3000
      });
    },
    // 临时点，社会面点的检索
    getsubmit(snapUrl) {
      var videoUrl, deviceId, fileUuid;
      this.fileNum = this.tableData.length;
      fileUuid = this.tableData.map(item => item.fileUuid).join();
      let data = {
        task: {
          taskName: this.tastName,
          type: 0,
          deviceId: this.deviceids,
          caseUUid: this.$route.query.caseUuid
        },
        taskSearch: {
          category: 2,
          type: this.retrimodel,
          size: this.targetsize,
          clarity: this.targetqxd,
          points: this.points,
          videoUrl: "",
          fileUuid: fileUuid,
          snapUrl: snapUrl,
          deviceId: this.deviceids,
          fileNum: this.fileNum
        }
      };
      data = JSON.stringify(data);
      let data2 = {
        datas: data
      };
      data2 = this.$qs.stringify(data2);
      this.$http.post("vsas/task/add", data2).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "任务创建成功",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
      this.dialogVisible = false;
      this.actualcoord = [];
      this.tastName = "";
      this.radio = "";
      this.clearcanvas();
      this.reset();
    },
    //重置
    reset() {
      this.retrimodel = this.targetsize = this.targetqxd = 1;
      this.dialogVisible = false;
      this.clearcanvas();
      this.tastName = ''
      this.videoImg = "";
      this.tableData = [];
    }
  },
  props: {
    istrue: Boolean,
    deviceids: String,
    isonline: Boolean
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.inputs {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding-left: 0.1rem;
}
.dialog1 .main1,
.dialog2 .main2 {
  height: 5rem;
  position: relative;
  border: 1px solid #dcdfe6;
}
.dialog2 .main2 {
  height: 4.7rem;
  border: 0;
}

.el-tree {
  margin-top: 0.2rem;
  width: 100%;
  overflow: auto;
  height: 3.75rem;
}
.el-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
}

.filter-tree >>> .el-tree-node__content:hover,
.filter-tree >>> .el-tree-node:focus > .el-tree-node__content {
  color: #409eff !important;
}

.main2_top {
  display: flex;
  font-size: 0.14rem;
  justify-content: space-between;
  color: #99c9fa;
}
.main2_top p .tis {
  padding-left: 0.1rem;
  border-radius: 3px;
  width: 2rem;
  height: 0.3rem;
}
.main2_top span {
  width: 0.7rem;
  line-height: 0.3rem;
  text-align: center;
  /* background-color: #409eff; */
  color: #fff;
  border-radius: 0.04rem;
  cursor: pointer;
}
.main2_btn {
  margin-top: 0.1rem;
}
.main2_btn >>> .el-table td,
.main2_btn >>> .el-table th {
  text-align: center;
  padding: 0.05rem 0;
}
.main2_btn >>> .el-table th {
  background-color: #f3f6f8;
}
.main2_btn >>> .el-table .cell {
  font-size: 0.14rem;
}
.el-radio >>> .el-radio__label {
  font-size: 0.14rem;
}

.retrieval {
  font-size: 0.14rem;
  color: #99c9fa;
  position: relative;
  height: 5rem;
}
.retritask {
  line-height: 0.4rem;
  font-size: 0.14rem;
  color: #fff;
  font-weight: 700;
  padding-left: 0.1rem;
}

.retrimain {
  position: absolute;
  width: 4.5rem;
  height: 100%;
  font-size: 0.14rem;
  right: 0;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}

.taskNames,
.searchtype {
  padding: 0rem 0.3rem;
  padding-bottom: 0.1rem;
  line-height: 0.3rem;
}
.searchtype input {
  width: 1.2rem;
  line-height: 0.3rem;
}
.searchtype .el-button {
  padding: 0 0.1rem;
  height: 0.3rem;
}
.taskNames input {
  width: 2.75rem;
  height: 0.3rem;
  padding-left: 0.1rem;
  margin-left: 0.8rem;
  border: 1px solid #dcdfe6;
  background-color: #fcfcfd;
}
.taskNames span {
  display: inline-block;
  position: absolute;
  width: 0.9rem;
}

.setretrieve {
  padding: 0rem 0.3rem;
  position: relative;
  height: calc(100% - 1.2rem);
}
.setretrieve > p {
  line-height: 0.3rem;
}
.setretrieve .rule {
  border: 1px solid rgba(15, 64, 152, 0.8);
  height: calc(100% - 0.5rem);
  padding: 0.1rem 0.2rem;
}
.rule p {
  font-size: 0.14rem;
  padding-bottom: 0.1rem;
}
.reterImg {
  width: 6.8rem;
  height: 100%;
  border: 1px solid #ccc;
  position: absolute;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  top: 0;
  left: 0;
}
.reterImg p {
  font-weight: 700;
  color: #fff;
  line-height: 0.4rem;
  padding-left: 0.1rem;
  display: flex;
  justify-content: space-between;
}

.reterImg > div {
  position: relative;
  width: 100%;
  height: calc(100% - 0.4rem);
}
.reterImg img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.reterImg canvas {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.el-radio-group {
  padding-left: 0.2rem;
}
.el-radio-group >>> .el-radio.el-radio {
  margin-right: 0.3rem;
  margin-left: 0;
  margin-top: 0.1rem;
}
.rule div {
  padding-bottom: 0.1rem;
}
.button {
  padding-left: 0.45rem;
  margin: 0.2rem 0;
}

.btns.el-button {
  width: 1.4rem;
  margin-right: 0.2rem;
  padding: 0.1rem 0.2rem;
}
/* .TreeMain{
    border: 1px solid #000;
  } */
.TreeMain >>> .el-input {
  width: 2rem;
}
.TreeMain >>> .el-input__inner {
  height: 0.3rem;
}
.el-pagination {
  margin-top: 0.1rem;
  text-align: right;
}
.reterImg p .el-button {
  width: 0.8rem;
  height: 0.25rem;
  line-height: 0.25rem;
  margin-top: 0.07rem;
  padding: 0 0.05rem;
  font-size: 0.12rem !important;
}
</style>
