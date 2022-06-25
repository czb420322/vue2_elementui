<!--
 * @Author: your name
 * @Date: 2020-05-19 09:59:01
 * @LastEditTime : 2020-12-29 09:21:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\casestudy\addcaseInfo\videoval.vue
 -->
<template>
  <div>
    <el-dialog
      title="视频检索"
      class="dialog1"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @close="cancleOk"
      @open="setName"
      width="12rem"
    >
      <span v-if="dialogVisible">
        <div class="retrieval">
          <div class="retrimain">
            <p class="retritask">视频检索任务</p>
            <p class="taskNames">
              <span>任务名称：</span>
              <input type="text" v-model="tastName" maxlength="50" placeholder="请输入任务名称">
            </p>
            <div class="changetype" v-show="!isonline">
              <span>选择分类：</span>
              <span class="changecolor">
                <i @click="dialogVisible2 = true">选择视频</i>
                <i @click="dialogVisible3 = true">已选视频列表</i>
              </span>
            </div>
            <div class="searchtype" v-if="dialogVisible" v-show="isonline">
              <span>检索时间：</span>
              <input
                type="text"
                id="time1"
                readonly
                :title="beginData"
                v-model="beginData"
                placeholder="请输入开始时间"
              > -
              <input
                type="text"
                id="time2"
                readonly
                :title="endData"
                v-model="endData"
                placeholder="请输入结束时间"
              >
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
                <div>
                  <p>
                    <el-checkbox v-model="colorRetrial" @change="clickOpenColor">颜色检索：</el-checkbox>
                  </p>
                  <el-button
                    type="primary"
                    class="searchBtn colorleft"
                    @click="titleopencolor"
                  >{{colroretrivaltitle}}</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="reterImg">
            <p>
              <span>目标区域标记</span>
              <el-button class="searchBtn" @click="clearcanvas">清空检索方式</el-button>
            </p>
            <div id="reterimgVideoVal">
              <img id="imgsVideoVal" v-show="showimg" :src="videoImg" alt>
              <canvas id="canvasVideoVal" @click="getcanvas" @dblclick="dbgetcoor"></canvas>
              <canvas v-show="showCanvas" @click="getcanvas" id="canvasVideo"></canvas>
            </div>
          </div>
        </div>
        <!-- 视频模态框 -->
        <el-dialog
          title="选择视频"
          :visible.sync="dialogVisible2"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          append-to-body
          width="50%"
          :destroy-on-close="true"
          @open="openCheckVideo"
          class="dialog2"
        >
          <div class="main2" v-if="dialogVisible2">
            <div class="main2_top">
              <p>时间：
                <el-input
                  id="videoStartTime"
                  placeholder="请选择开始时间"
                  autocomplete="off"
                  readonly
                  v-model="beginTime"
                >
                  <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>-
                <el-input
                  id="videoEndTime"
                  placeholder="请选择结束时间"
                  autocomplete="off"
                  readonly
                  v-model="endTime"
                >
                  <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>
                <!-- <input type="text" readonly v-model="beginTime"  placeholder="请选择开始时间" id="videoStartTime"> -
                <input type="text" readonly v-model="endTime"  placeholder="请选择结束时间" id="videoEndTime">-->
              </p>
              <!-- <input type="text" class="inputs" placeholder="请输入关键字查询" v-model="keyword"> -->
              <el-button class="searchBtn searchBar" @click="getAllvideo()" icon="el-icon-search">查询</el-button>
              <el-button
                type="danger"
                class="el-icon-refresh tryBtn ml15"
                @click="resetTimeToList()"
              >重置</el-button>
            </div>
            <div class="main2_btn" v-if="dialogVisible2">
              <el-table
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                border
                @selection-change="handleselection"
                :row-key="handlrowkey"
                @select-all="selectAll"
                ref="checkTable"
                style="width: 100%"
                height="4rem"
              >
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../../assets/updataImg/NoData.png">
                  </div>
                </div>
                <el-table-column :reserve-selection="true" type="selection" width="100"></el-table-column>
                <el-table-column prop="fileName" label="文件名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="uploadTime" label="采集时间"></el-table-column>
              </el-table>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                background
                :total="totalCount"
              ></el-pagination>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="cancleBtn" @click="closeSelect">关 闭</el-button>
            <!-- <el-button @click="dialogVisible2 = false" type="primary cancleBtn">取 消</el-button> -->
            <!-- <el-button @click="checkNowVideo" type="primary passBtn">确 定</el-button> -->
          </span>
        </el-dialog>

        <!-- 已选视频列表 -->
        <el-dialog
          title="已选视频列表"
          :visible.sync="dialogVisible3"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          append-to-body
          width="45%"
          class="dialog3"
          :destroy-on-close="true"
        >
          <div class="main2_btn" v-if="dialogVisible3">
            <el-table :data="multiplist" border style="width: 100%" height="3.3rem">
              <div slot="empty">
                <div class="noImg">
                  <img src="../../../assets/updataImg/NoData.png">
                </div>
              </div>
              <el-table-column label="编号">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fileName" show-overflow-tooltip label="文件名"></el-table-column>
              <el-table-column prop="uploadTime" show-overflow-tooltip label="采集时间"></el-table-column>
              <el-table-column prop="operation" width="150" align="center" label="操作">
                <template slot-scope="scope">
                  <el-button class="delBtn" type="danger" @click="deletevideo(scope.$index)">
                    <img src="../../../assets/images/videoCombat/cancel.png" alt>&nbsp;&nbsp;删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="cancleBtn" @click="dialogVisible3=false">关 闭</el-button>
          </span>
        </el-dialog>

        <!-- 颜色检索 -->
        <el-dialog
          title="颜色检索"
          :visible.sync="opencolorReval"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          append-to-body
          width="50%"
          @open="opencolor"
          @close="closeColor"

        >
          <div class="main3_btn">
            <div class="firstdiv" id="firstdiv">
              <img
                class="imgload"
                id="colorimg"
                @load="imgscale('.imgload')"
                :src="imglist.length > 0 ? imglist[firstImgIndex] : ''"
              >
              <canvas id="colorcanvas"></canvas>
            </div>
            <div class="twodiv centerbtn">
              <span>目标色块</span>
              <el-radio v-model="checkradio" @change="changecolortype" label="0">选择色块</el-radio>
              <b @click="prev">上一张</b> &nbsp;&nbsp;
              <b @click="next">下一张</b> &nbsp;&nbsp;
              <b>标注图片（{{firstImgIndex + 1}}/{{imglist.length}}）</b>
            </div>
            <div class="twodiv">
              <span>语义色彩</span>
              <el-radio v-model="checkradio" @change="changecolortype" label="1">选取色彩</el-radio>
              <el-select
                v-model="firstname"
                :disabled="checkradio != 1"
                class="selectpos"
                placeholder="请选择位置"
              >
                <el-option
                  v-for="(item,index) in colorlist"
                  :label="item.name"
                  :key="index"
                  :value="item.rgb"
                ></el-option>
              </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio v-model="checkradio" @change="changecolortype" label="2">多语义色彩</el-radio>
              <el-select
                v-model="twoname"
                :disabled="checkradio != 2"
                class="selectpos"
                placeholder="请选择位置"
              >
                <el-option
                  v-for="(item,index) in colorlist"
                  :label="item.name"
                  :key="index"
                  :value="item.rgb"
                ></el-option>
              </el-select>
              <el-select
                v-model="threename"
                :disabled="checkradio != 2"
                class="selectpos"
                placeholder="请选择位置"
              >
                <el-option
                  v-for="(item,index) in colorlist"
                  :label="item.name"
                  :key="index"
                  :value="item.rgb"
                ></el-option>
              </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-select
                v-model="colorRange"
                :disabled="checkradio == 0"
                class="selectpos"
                placeholder="请选择位置"
              >
                <el-option label="精准" value="0"></el-option>
                <el-option label="标准" value="1"></el-option>
                <el-option label="宽泛" value="2"></el-option>
              </el-select>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="cancleBtn" @click="cancelColorReval">取 消</el-button>
            <el-button type="primary" class="passBtn" @click="checkColorArea">确 定</el-button>
          </span>
        </el-dialog>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancleBtn" @click="reset">取 消</el-button>
        <el-button type="primary" class="passBtn" v-no-more-click @click="getAllsubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import realvideo from "../../../api/realvideo/realvideo.js";
let moment = require("moment");
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import videoDown from "../../../api/casestudy/videoDown.js";
import videoRetrieval from "../../../api/casestudy/videoRetrieval.js";
import scale from "../../../api/common/scale.js";

export default {
  data() {
    return {
      checkradio: "0",
      firstImgIndex: 0, //当前颜色检索的图片
      lableDeviceList: {},
      colorlist: [
        { name: "红", rgb: "255,0,0" },
        { name: "橙", rgb: "255,127,34" },
        { name: "黄", rgb: "255,242,0" },
        { name: "蓝", rgb: "0,0,255" },
        { name: "绿", rgb: "0,255,0" },
        { name: "青", rgb: "185,122,87" },
        { name: "紫", rgb: "163,73,164" },
        { name: "紫红", rgb: "255,174,201" },
        { name: "白", rgb: "255,255,255" },
        { name: "黑", rgb: "0,0,0" }
      ],
      firstname: "255,0,0",
      twoname: "255,0,0",
      threename: "255,0,0",
      colorRange: "1",
      imglist: [], //存放图片的list
      colroretrivaltitle: "打开颜色检索",
      baseCode:'',  //截图的base64
      baseUrl:'',   //截图的url
      showbaseUrl:false,
      // colorsnapurl:'', //颜色检索的图片
    };
  },
  methods: {
    resetTimeToList() {
      this.beginTime = "";
      this.endTime = "";
      this.getAllvideo(1);
      this.issesionAll = true;
    },
    //切换颜色的时候
    changecolortype(val) {
      if (val == 0) {
        let colorimg = document.getElementById("colorimg");
        let colorcanvas = document.getElementById("colorcanvas");

        colorcanvas.setAttribute("width", colorimg.clientWidth);
        colorcanvas.setAttribute("height", colorimg.clientHeight);
      } else {
        this.colorpoints = "";
        let colorcanvas = document.getElementById("colorcanvas");
        colorcanvas.setAttribute("width", 0);
        colorcanvas.setAttribute("height", 0);
        this.baseCode = ''  //截图的base64
            this.baseUrl = ''   //截图的url
            this.showbaseUrl = false
      }
    },
    //打开颜色检索页面
    opencolor() {
      this.$nextTick(() => {
        if (this.imglist.length) {
          this.imgload();
        }
      });
    },
    closeColor() {
        if(this.checkradio == 0 && !this.baseUrl){
              let files = this.dataURLtoBlob(this.baseCode)
              let formData = new FormData();
              let file = new File([files],new Date().getTime()+'.jpg');
              formData.append('files',file);
              this.$http({url:'/sms/uploadFile/upload',method:'post',data:formData}).then(reponse=>{
                  this.baseUrl = reponse.data.data[0]
                  this.showbaseUrl = true
              });
        }
    },
    prev() {

      if (this.checkradio == 1 || this.checkradio == 2) {
        return;
      }
      this.colorpoints = "";
      let colorcanvas = document.getElementById("colorcanvas");
      colorcanvas.setAttribute("width", 0);
      colorcanvas.setAttribute("height", 0);
      this.firstImgIndex--;
      if (this.firstImgIndex <= 0) {
        this.firstImgIndex = 0;
      }
      this.imgload();
    },
    next() {

      if (this.checkradio == 1 || this.checkradio == 2) {
        return;
      }
      this.colorpoints = "";
      let colorcanvas = document.getElementById("colorcanvas");
      colorcanvas.setAttribute("width", 0);
      colorcanvas.setAttribute("height", 0);
      this.firstImgIndex++;
      if (this.firstImgIndex >= this.imglist.length) {
        this.firstImgIndex = this.imglist.length - 1;
      }
      this.imgload();
    },
    imgload() {
      let colorimg = document.getElementById("colorimg");
      colorimg.onload = () => {
        setTimeout(() => {
          this.changecolortype(0);
          if (this.colorpoints) {
            let canvas = document.getElementById("colorcanvas");
            var context = canvas.getContext("2d");
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.strokeStyle = "red";
            context.strokeRect(
              this.one,
              this.two,
              this.three - this.one,
              this.four - this.two
            );
            context.stroke();
          } else {
            if (this.checkradio == 1 || this.checkradio == 2) {
              return;
            }
            this.getcoord();
          }
        }, 300);
      };
      colorimg.src = this.imglist[this.firstImgIndex];
    },
    titleopencolor() {
      this.colorRetrial = true;
      this.clickOpenColor(true);
    },
    getbaseUrl(){
        // this.baseCode = '';
        let img = new Image
        img.setAttribute('crossOrigin', 'anonymous');
        let cans = document.getElementById("colorcanvas");
        img.onload =  ()=> {
          //获取点位在图片中的实际坐标
          let ceshicanvas = document.createElement('canvas')
          ceshicanvas.setAttribute('id','ceshicanvas')
          let one = Math.ceil(this.one * img.naturalWidth / cans.clientWidth) //  左上
          let two = Math.ceil(this.two * img.naturalHeight / cans.clientHeight) //  左下
          let three = Math.ceil(this.three * img.naturalHeight / cans.clientHeight) //  左下
          let four = Math.ceil(this.four * img.naturalHeight / cans.clientHeight) //  左下
          ceshicanvas.width = three - one
          ceshicanvas.height = four - two
          let ctx = ceshicanvas.getContext('2d')
          ctx.drawImage(img,one,two,three - one,four - two ,0, 0, three - one, four - two)
          this.baseCode = ceshicanvas.toDataURL("image/png")
        //   console.log(this.baseCode);
        }
        img.src = window.origin + '/fastDfs/' + this.imglist[this.firstImgIndex].slice(this.imglist[this.firstImgIndex].indexOf('group'), this.imglist[this.firstImgIndex].length)
    },
  },
  watch: {
    istrue(val) {
      this.dialogVisible = val;
    },
    beginData(val) {
      this.videoImg = "";
    },
    endData(val) {
      this.videoImg = "";
    },
    videoImg(val) {
      if (!val) {
        var canvas = document.getElementById("canvasVideoVal");
        var canvastwo = document.getElementById("canvasVideo");
        canvas.setAttribute("width", 0);
        canvas.setAttribute("height", 0);
        canvastwo.setAttribute("width", 0);
        canvastwo.setAttribute("height", 0);
      } else {
        this.imglist = [];
        this.imglist.push(val);
        for (let i = 0; i < this.lablemarkList.length; i++) {
          this.imglist.push(this.lablemarkList[i].snapshotFile);
        }
      }
    },
    multiplist: {
      handler(val) {
        if (val.length) {
          if (!this.videoImg) {
            for (let i = 0; i < val.length; i++) {
              if (val[i].snapUrl != "" && val[i].snapUrl != null) {
                this.videoImg = val[i].snapUrl;
                document.getElementById("imgsVideoVal").style.display = "none";
                let image = new Image();
                image.onload = () => {
                  this.dialogvideo();
                };
                image.src = this.videoImg;
                return;
              }
            }
          } else {
            for (let i = 0; i < val.length; i++) {
              if (this.videoImg == val[i].snapUrl) {
                return;
              } else {
                if (val[i].snapUrl != "" && val[i].snapUrl != null) {
                  this.videoImg = val[i].snapUrl;
                  document.getElementById("imgsVideoVal").style.display =
                    "none";
                  let image = new Image();
                  image.onload = () => {
                    this.dialogvideo();
                  };
                  image.src = this.videoImg;
                  return;
                } else {
                  this.videoImg = "";
                }
              }
            }
          }
        } else {
          this.videoImg = "";
        }
      },
      deep: true
    },
    // one(val){
    //     if(this.colroretrivaltitle == '编辑颜色检索' && this.checkradio == 0){
    //         this.aaa()
    //     }
    // }
  },
  mixins: [realvideo, beginEnd, videoDown, videoRetrieval, scale],
  props: {
    istrue: Boolean,
    deviceids: String,
    isonline: Boolean,
    lablemarkList: Array
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
  justify-content: flex-start;
  color: #99c9fa;
}
/* .main2_top p {
  padding-left: 0.1rem;
  border-radius: 3px;
  width: 1.5rem;
  height: 0.3rem;
} */
.main2_top p .el-input {
  width: 2rem;
  height: 0.3rem;
  padding-left: 0.1rem;
}
.main2_top p .el-input /deep/ .el-input__prefix {
  left: 0.13rem;
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
.taskNames span,
.changetype span:first-child {
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
.reterImg img,
.reterImg canvas {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  /* top: 50%; */
  /* transform: translateY(-50%); */
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
.changetype {
  padding: 0 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
}

.changetype .changecolor i {
  font-style: normal;
  display: inline-block;
  border: 1px solid rgba(15, 64, 152, 0.8);
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0.05rem 0.15rem;
  cursor: pointer;
  color: #99c9fa;
}
.changecolor {
  margin-left: 0.8rem;
}
.changetype .changecolor .active {
  background-color: #409eff;
  color: #fff;
}
.ml15 {
  margin-left: 0.3rem;
}
.searchBar {
  margin-left: 0.5rem;
}
.el-table--border /deep/ th:first-child .cell {
  padding-left: -1px;
}
.main3_btn {
  height: 6rem;
}
.firstdiv {
  width: 100%;
  height: 4.6rem;
  border: 1px solid rgba(15, 64, 152, 0.8);
  position: relative;
}
.firstdiv img,
.firstdiv canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.centerbtn {
  margin: 0.2rem 0;
}
.twodiv {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  border: 1px solid rgba(15, 64, 152, 0.8);
  position: relative;
  padding-left: 0.1rem;
}
.twodiv span {
  color: #99c9fa;
  position: absolute;
  top: -25px;
  left: 10px;
}
.twodiv .el-radio {
  margin-right: 0.1rem;
}
.centerbtn b {
  cursor: pointer;
  color: #99c9fa;
}
.selectpos {
  width: 1rem;
}
.el-checkbox,
.el-checkbox /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #99c9fa;
}
</style>
