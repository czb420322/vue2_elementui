<template>
  <div class="taskMange">
    <el-dialog
      title="查看人脸"
      :visible.sync="showSeekFace"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="closeDia"
      top="4vh"
      @open="opendia"
      width="80%"
    >
      <span class="seekFace">
        <div class="seek_top">
          <p>
            姓名：
            <input type="text" v-model="keyword" placeholder="请输入姓名查询">
            <!-- <el-button class="el-icon-search searchBtn" @click="searchFace"></el-button> -->
          </p>
          <p :title="dbName">库名：
            <input type="text" v-model="dbName" readonly>
          </p>
        </div>
        <div class="seek_amin">
          <p class="seek_m_title">
            <span>人脸列表</span>
            <span>
              <el-button class="searchBtn" @click="clickComparison">人脸比对</el-button>
              <el-button class="searchBtn" @click="getFaceMsg">批量导入模板下载</el-button>
              <el-button :disabled="active" class="searchBtn" @click="seekFaceMsg">查看导入日志</el-button>
              <el-button v-show="searchDownImg == 2" class="searchBtn" @click="cancleSearch">取消选择</el-button>
              <el-button v-show="searchDownImg == 2" class="searchBtn" @click="trueDown">确定选择</el-button>
              <el-button class="searchBtn" v-show="searchDownImg == 1" @click="selectImg">导出图片</el-button>
              <el-button :disabled="active" class="searchBtn" @click="batchFace">批量导入人脸</el-button>
              <el-button :disabled="active" class="searchBtn" @click="addface">添加人脸</el-button>
            </span>
          </p>

          <div class="showface">
            <ul id="topDom">
              <li v-for="(item,index) in newfaceList[currentPage - 1]" :key="index">
                <div class="showimgPic">
                  <el-image
                    :src="item.faceUrl"
                    @click.stop.self="ClickCheckd(item, index)"
                    fit="contain"
                    lazy
                  ></el-image>
                  <!-- <img :src="item.faceUrl" alt=""  @load="imgscale('.img_block')" class="img_block" @click.stop.self="ClickCheckd(item, index)"> -->
                </div>
                <i
                  v-show="searchDownImg == 2"
                  @click.stop.self="ClickCheckd(item, index)"
                  :class="item.state ? 'ONimg' : 'OFFimg'"
                ></i>
                <!-- <i class="OFFimg"></i> -->
                <p class="hidden" :title="item.name">{{item.name}}</p>
                <p>
                  <el-button class="searchBtn" @click="upDateMulti(item)">上传多张人脸</el-button>
                  <el-button class="topBtn" @click="updateFace(item)">编辑</el-button>
                  <br>
                  <el-button class="tryBtn" @click="lookAllFace(item)">查看</el-button>
                  <el-button class="delBtn" @click="delFaceInfo(item)">删除</el-button>
                </p>
              </li>
            </ul>
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[12, 24, 36]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            ></el-pagination>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="showSeekFace = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 查看人脸信息 -->
    <el-dialog
      title="查看人脸信息"
      :visible.sync="showLookFace"
      @close="closelookDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="lookFaceInfos">
        <ul>
          <li v-for="(item, index) in lookFaceList" :key="index">
            <img @load="imgscale('.imgblock')" class="imgblock" :src="item.faceUrl" alt>
            <i @click="dellookFace(item,index)" class="el-icon-circle-close"></i>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="showLookFace = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 打开上传更多人脸的功能 -->
    <el-dialog title="上传更多人脸" :visible.sync="showmoreface" @close="closeMoreDia" width="45%">
      <div class="faceTomore">
        <el-upload
          class="upload-demo"
          ref="moreupload"
          name="files"
          action="sms/uploadFile/upload"
          :multiple="true"
          :limit="10"
          :on-remove="deleteMoreUpload"
          :on-exceed="handMoreExceed"
          :on-success="MoreSuccess"
          :show-file-list="false"
          :before-upload="beforeMoreUpload"
        >
          <el-button size="small" class="searchBtn" type="primary">点击上传</el-button>
          <!-- <p class="tenMore">最多上传10张</p> -->
        </el-upload>
        <div>
          <ul class="morelist">
            <li v-for="(item,index) in moreImgList" :key="index">
              <img :src="item[1]" alt>
              <i class="el-icon-circle-close" @click="deleteMoreUpload(item[0],moreFileList)"></i>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="showmoreface = false">取 消</el-button>
        <el-button type="primary passBtn" @click="upLoadMoreImg">确 定</el-button>
      </span>
    </el-dialog>

    <form action="sms/face/getTemplate" method="get" id="downAll"></form>

    <!-- 打开添加和修改人脸的页面 -->
    <addUpFace
      :showAddface="showAddface"
      :btnlibInfo="btnlibInfo"
      :faceInfo="faceInfo"
      :title="addUpTitle"
      @childyFace="childyFace"
    ></addUpFace>
    <!-- 批量导入人脸-->
    <batchFaceList
      :showbatchFace="showbatchFace"
      :btnlibInfo="btnlibInfo"
      @childBybatch="childBybatch"
    ></batchFaceList>
    <!-- //打开查看导入日志的页面 -->
    <toLeadMsg :showseekMsg="showseekMsg" :btnlibInfo="btnlibInfo" @childbyToLead="childbyToLead"></toLeadMsg>
    <!-- 导出进度 -->
    <derive :openderive="openderive" :keys="keys" @childbyderive="childbyderive"></derive>
    <!-- 导出日志模态框 -->
    <deriveMsg :openDerimsg="openDerimsg" :btnlibInfo="btnlibInfo" @childbydemsg="childbydemsg"></deriveMsg>
    <!-- 人脸比对页面 -->
    <face-comparison :openface="openface" :btnlibInfo="btnlibInfo" @childbyface="childbyface"></face-comparison>
  </div>
</template>

<script>
import addUpFace from "./addUpface"; //引入编辑，新增人脸的页面
import batchFaceList from "./batchFaceList"; //引入导入人脸的页面
import toLeadMsg from "./toleadMsg"; //引入查看导入日志
import derive from "./derive"; //引入查看导入日志
import deriveMsg from "./deriveMsg"; //导出日志模态框
import faceComparison from "./faceComparison"; //人脸比对
import scale from "../../../api/common/scale.js"; //导出日志模态框
import _ from "lodash";

export default {
  data() {
    return {
      showSeekFace: false, //打开人脸模态框
      currentPage: 1,
      pageSize: 12,
      totalCount: 0,
      showAddface: false, //打开显示人脸的页面
      showbatchFace: false, //打开批量导入的页面
      showseekMsg: false, //打开查看导入日志的页面
      showLookFace: false, //打开查看人脸信息
      showmoreface: false, //打开查看更多人脸
      addUpTitle: "",
      searchDownImg: 1,
      dbName: "", //库名
      faceList: [], //当前库人脸列表
      moreImgList: [], //上传更多人脸照的数组
      moreFileList: [], //上传更多人脸照的file数组
      lookFaceList: [], //点击查看人脸的详细人脸个数
      faceInfo: {},
      keyword: "", //关键字搜索
      faceUuid: "",
      Checkd: [],
      groundIds: [],
      openderive: false, //打开导出日志
      keys: "",
      openDerimsg: false,
      timeId: null,
      active: false,
      newfaceList: [],
      openface: false //r人脸比对
    };
  },
  mounted() {},
  components: {
    addUpFace,
    batchFaceList,
    toLeadMsg,
    derive,
    deriveMsg,
    faceComparison
  },
  mixins: [scale],
  watch: {
    openSeekface(val) {
      this.showSeekFace = val;
    },
    faceLists(val, oldval) {
      if (val != oldval) {
        // this.imgscale('.img_block');
        // this.currentPage = 1
      }
    },
    keyword(val, oldval) {
      if (val) {
        let temp = [];
        this.currentPage = 1;
        this.faceList.forEach(item => {
          if (item.name.indexOf(val) !== -1) {
            temp.push(item);
          }
        });
        this.newfaceList = _.chunk(temp, this.pageSize);
        if (this.newfaceList.length) {
          this.totalCount = this.newfaceList[0].length;
        } else {
          this.totalCount = 0;
        }
        this.currentPage = 1;
      } else {
        this.newfaceList = _.chunk(this.faceList, this.pageSize);
        console.log(this.newfaceList, 11222);
        this.totalCount = this.faceList.length;
        this.currentPage = 1;
      }
    }
  },
  props: {
    openSeekface: Boolean,
    btnlibInfo: Object
  },
  computed: {
    // newfaceList () {
    //   let temp = [];
    //   if (this.keyword == '') {
    //     return _.chunk(this.faceList, this.pageSize)
    //   } else {
    //     this.currentPage = 1; // 重置特殊情况下的索引
    //     this.faceList.map(item => {
    //       if (item.name.indexOf(this.keyword.trim()) !== -1) {
    //         temp.push(item)
    //       }
    //     return item;
    //     })
    //     return _.chunk(temp, this.pageSize);
    //   }
    // },
    // totalCount(){
    //   return this.faceList.length
    // },
  },
  methods: {
    //关闭模态框
    closeDia() {
      this.active = false;
      this.$emit("childByAllface", false);
      clearInterval(this.timeId);
      this.keyword = "";
      this.searchDownImg = 1;
      this.groundIds = [];
      this.faceList = [];
      this.currentPage = 1;
    },
    //关闭查看更多人脸的模态框
    closeMoreDia() {
      this.active = false;
      this.moreImgList = [];
      this.moreFileList = [];
      this.$refs.moreupload.clearFiles();
    },
    clickComparison() {
      this.openface = true;
    },
    childbyface() {
      this.openface = false;
    },

    //打开模态框
    opendia() {
      this.getAllFaceList();
      // this.timeId = setInterval(()=>{
      //   this.getAllFaceList();
      // },5000)

      this.dbName = this.btnlibInfo.dbName;
    },
    // 查看人脸数据
    getAllFaceList() {
      this.filelist = [];
      if (!this.showbatchFace) {
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "正在加载"
        });
      }

      let data = {
        faceDbPrimaryKey: this.btnlibInfo.id
      };
      this.$http.get("sms/face/getXinFaceList", { params: data }).then(res => {
        if (!this.showbatchFace) {
          this.loading.close();
        }
        if (res.data.code == 200) {
          console.log(res, "批量导入传回来胡shuju");
          if (res.data.data == null) {
            this.faceList = [];
            this.totalCount = 0;
          } else {
            this.Checkd = [];
            var obj = {};
            this.faceList = res.data.data;
            this.faceList.sort((a, b) => {
              return a.createTime < b.createTime ? 1 : -1;
            });
            this.newfaceList = _.chunk(this.faceList, this.pageSize);
            this.totalCount = Number(res.data.data.length);
            if (this.faceList.length) {
              for (let i = 0; i < this.faceList.length; i++) {
                this.faceList[i].state = false;
                // obj = {
                //   state: false
                // }
                // this.Checkd.push(obj)
              }
            }
            // this.imgscale('.img_block');
          }
        }
      });
    },
    // 排序
    getsort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {}
      }
      return arr;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.newfaceList = _.chunk(this.faceList, this.pageSize);
      this.currentPage = 1;
      //   this.imgscale('.img_block');
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //   this.imgscale('.img_block')
      document.getElementById("topDom").scrollTop = 0;
    },
    // 查询人脸
    searchFace() {
      console.log(this.faceList);
      this.getAllFaceList();
      setTimeout(() => {
        let arr = [];
        let arrs = [];
        let length = 0;
        if (this.keyword == "") {
          this.getAllFaceList();
          // this.timeId = setInterval(()=>{
          //   this.getAllFaceList();
          // },5000)
        } else {
          // clearInterval(this.timeId)
          this.currentPage = 1;
          let nums = this.faceList;
          nums.filter(item => {
            if (item.name.indexOf(this.keyword.toLowerCase().trim()) !== -1) {
              arr.push(item);
              length = arr.length;
              this.currentPage = 1;
              this.faceList = arr;
              this.totalCount = length;
            } else {
              arrs.push(item);
              if (arrs.length == this.faceList.length) {
                this.faceList = [];
                this.totalCount = 0;
              }
              // this.faceList = []
              // this.totalCount = 0
            }
          });
        }
      }, 100);
    },
    //添加修改人脸
    childyFace(val) {
      this.showAddface = val;
      setTimeout(() => {
        this.getAllFaceList();
      }, 100);
    },
    // 批量导入人脸
    childBybatch(val) {
      this.showbatchFace = val;
      clearInterval(this.timeId);
      setTimeout(() => {
        this.getAllFaceList();
      }, 100);
    },
    // 查看导入日志
    childbyToLead(val) {
      this.showseekMsg = val;
      setTimeout(() => {
        this.getAllFaceList();
      }, 100);
    },
    childbyderive(val) {
      this.openderive = val;
      setTimeout(() => {
        this.openDerimsg = true;
      }, 300);
    },
    childbydemsg(val) {
      this.openDerimsg = val;
    },
    //添加人脸
    addface() {
      this.showAddface = true;
      this.addUpTitle = "新增人员";
    },
    //编辑修改人脸
    updateFace(row) {
      console.log(row, 999);
      this.showAddface = true;
      this.faceInfo = row;
      this.addUpTitle = "修改人员";
    },
    //批量导入人脸
    batchFace() {
      this.timeId = setInterval(() => {
        this.getAllFaceList();
      }, 5000);
      this.showbatchFace = true;
    },
    //查看导入日志
    seekFaceMsg() {
      this.showseekMsg = true;
    },
    getFaceMsg() {
      document.getElementById("downAll").submit();
    },
    //查看人脸信息
    lookAllFace(row) {
      this.faceInfo = row;
      let data = {
        faceDbPrimaryKey: this.btnlibInfo.id,
        faceUuid: row.faceUuid
      };
      this.$http
        .get("sms/face/getMultiFaceList", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res, 5555222);
            this.lookFaceList = res.data.data;
            this.showLookFace = true;
            if (this.lookFaceList.length == 0) {
              this.showSeekFace = false;
              this.getAllFaceList();
            }
          }
          console.log(res, 999);
        });
    },
    closelookDia() {
      // this.getAllFaceList();
    },
    // 打开查看人脸的功能
    upDateMulti(row) {
      this.faceUuid = row.faceUuid;
      this.showmoreface = true;
    },
    // //删除人脸信息
    // delFace(row){
    //     let data = {
    //       faceDbPrimaryKey:this.btnlibInfo.id,
    //       faceUuid:row.faceUuid,
    //       personUuid:row.faceUuid,
    //       flag:1
    //     }
    //     data = this.$qs.stringify(data)
    //     this.$http.post('vsas/face/delFace',data).then(res=>{
    //       if(res.data.code == 200){
    //         this.getAllFaceList();
    //       }else{
    //         this.$notify({
    //           type: 'error',
    //           message: '删除失败',
    //           position: 'bottom-right',
    //           duration: 3000
    //         });
    //       }

    //     })
    // },
    // 删除人脸信息
    delFaceInfo(row) {
      console.log(row, 111222);
      this.$myconfirm({
        type: "提示",
        msg: "是否删除该人脸信息",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(res => {
        let data = {
          faceDbPrimaryKey: this.btnlibInfo.id,
          faceUuid: row.faceUuid,
          personUuid: row.faceUuid,
          flag: 1
        };
        data = this.$qs.stringify(data);
        this.$http.post("sms/face/delFace", data).then(res => {
          console.log(res, 666);
          this.getAllFaceList();
        });
      });
    },

    //打开查看人脸页面的删除功能
    dellookFace(row, index) {
      console.log(index, 666);
      this.$myconfirm({
        type: "提示",
        msg: "是否删除人脸照片",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(res => {
        let data = {
          faceDbPrimaryKey: this.btnlibInfo.id,
          faceUuid: row.faceUuid,
          personUuid: this.faceInfo.faceUuid,
          flag: 0
        };
        data = this.$qs.stringify(data);
        this.$http.post("sms/face/delFace", data).then(res => {
          if (res.data.code == 200) {
            if (this.lookFaceList.length == 1) {
              if (index == 0) {
                this.showLookFace = false;
                this.getAllFaceList();
              }
            } else {
              if (index == 0) {
                this.lookAllFace(this.lookFaceList[1]);
                // this.showLookFace = false;
                this.getAllFaceList();
              } else {
                this.lookAllFace(this.faceInfo);
                this.getAllFaceList();
              }
            }
          }
        });
      });
    },
    //取消选择
    cancleSearch() {
      this.active = false;
      this.searchDownImg = 1;
      this.groundIds = [];
      this.Checkd = [];
      for (let i = 0; i < this.faceList.length; i++) {
        this.faceList[i].state = false;
      }
    },
    // 确定选择
    trueDown() {
      // this.item.state="OFFimg"
      if (this.groundIds.length <= 0) {
        this.$notify({
          type: "warning",
          message: "请勾选人脸",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      console.log(this.groundIds);
      this.openderive = true;
      this.searchDownImg = 1;
      let data = {
        faceDbPrimaryKey: this.btnlibInfo.id,
        groupIds: this.groundIds.join(",")
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/faceExport/exportFaces", data).then(res => {
        this.active = false;
        if (res.data.code == 200) {
          this.keys = res.data.data;
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "选择的人脸已被删除",
            position: "bottom-right",
            duration: 3000
          });
          this.openderive = false;
          this.showseekMsg = false;
          setTimeout(() => {
            this.openDerimsg = false;
          }, 300);
        } else {
          this.$notify({
            type: "warning",
            message: "导出人脸失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },

    //文件超出的时候的回调以及提示
    handMoreExceed() {
      this.$notify({
        type: "error",
        message: "当前限制文件个数10个",
        position: "bottom-right",
        duration: 3000
      });
    },
    // 删除文件上传时候的文件
    deleteMoreUpload(file, filelist) {
      for (let i = 0; i < this.moreFileList.length; i++) {
        if (file.uid == this.moreFileList[i].uid) {
          this.moreFileList.splice(i, 1);
          this.moreImgList.splice(i, 1);
        }
      }
    },
    //文件上传成功时候的回调
    MoreSuccess(res, file, filelist) {
      this.moreImgList = [];
      this.moreFileList = filelist;
      let flag = true;
      for (let i = 0; i < filelist.length; i++) {
        if (filelist[i].response) {
          this.moreImgList.push([filelist[i], filelist[i].response.data[0]]);
        } else {
          flag = false;
        }
      }
    },
    //文件上传时候的文件限制
    beforeMoreUpload(file, filelist) {
      let isLt2M = file.size / 1024 / 1024 < 1;
      if (
        file.type == "image/jpeg" &&
        file.type == "image/png" &&
        file.type == "image/jpg"
      ) {
        this.$notify({
          type: "error",
          message: "上传图片只能是 png,jpg,jpeg 格式!！",
          position: "bottom-right",
          duration: 3000
        });
      }
      if (!isLt2M) {
        this.$notify({
          type: "error",
          message: "请上传单个小于1M的证件照！",
          position: "bottom-right",
          duration: 3000
        });
      }
      return isLt2M;
    },
    //上传更多人脸的接口
    upLoadMoreImg() {
      if (this.moreImgList.length <= 0) {
        this.$notify({
          type: "warning",
          message: "请上传人脸照片",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      console.log(this.moreImgList);
      let imgurl = "";
      for (let i = 0; i < this.moreImgList.length; i++) {
        imgurl += this.moreImgList[i][1] + "@";
      }
      imgurl = imgurl.substr(0, imgurl.length - 1);
      console.log(imgurl);
      let data = {
        faceDbPrimaryKey: this.btnlibInfo.id,
        faceUuid: this.faceUuid,
        faceUrls: imgurl
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/face/appendFace ", data).then(res => {
        console.log(res, 111);
        this.showmoreface = false;
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "上传成功",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "error",
            message: "上传失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //
    selectImg() {
      this.searchDownImg = 2;
      this.active = true;
      //this.groundIds = []
      /* 解决bug人像库管理，查看人脸，导出图片，勾选人脸a，确定选择并导出成功，再次导出图片，人脸a被默认勾选 */
      this.Checkd = [];
      for (let i = 0; i < this.faceList.length; i++) {
        this.faceList[i].state = false;
      }
      //   this.Checkd = [];
      //   var obj = {}
      //   if(this.faceList.length){
      //     for (let i = 0; i < this.faceList.length; i++) {
      //       obj = {
      //         state: false
      //       }
      //       this.Checkd.push(obj)
      //     }
      //   }
    },
    //选择图片
    ClickCheckd(item, index) {
      if (item.state) {
        this.groundIds = _.pull(this.groundIds, item.faceUuid);
      } else {
        this.groundIds.push(item.faceUuid);
      }
      item.state = !item.state;
      //   item.state="ONimg"
      // this.newfaceList = _.chunk(this.faceList, this.pageSize)
      this.$set(this.newfaceList[this.currentPage - 1], index, item);

      //  this.handleCurrentChange(this.currentPage)
      // this.Checkd[(this.currentPage -1) * this.pageSize + index].state = !this.Checkd[(this.currentPage - 1) * this.pageSize + index].state
      // this.Relation();
      // if(this.currentPage == 1){
      // this.Checkd[index].state = !this.Checkd[index].state
      // }else{
      //   this.Checkd[this.currentPage * this.pageSize + index].state = !this.Checkd[this.currentPage * this.pageSize + index].state
      // }

      // this.Relation()
    },
    Relation() {
      this.groundIds = [];
      for (let i = 0; i < this.Checkd.length; i++) {
        if (this.Checkd[i].state) {
          console.log(this.faceLists, 999);
          this.groundIds.push(this.faceLists[i].faceUuid);
        }
      }

      console.log(this.groundIds, 222333);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../assets/css/commom.css";
.seekFace {
  color: #99c9fa;
}
.seek_top {
  line-height: 0.4rem;
  display: flex;
  width: 50%;
}
.seek_top input {
  width: 2rem;
  height: 0.3rem;
}
.seek_top p {
  position: relative;
}
.seek_top p .el-button {
  position: absolute;
  top: 0.05rem;
  height: 0.3rem;
  width: 0.5rem;
  right: -0.5rem;
}
.seek_top p input {
  padding: 0.1rem;
}
.seek_top p:last-child {
  margin-left: 0.7rem;
}
.seek_m_title {
  font-size: 0.16rem;
  line-height: 0.5rem;
}
.seek_m_title span:last-child {
  float: right;
}
.showface ul {
  height: 5.9rem;
  overflow: auto;
}
.showface ul li {
  float: left;
  width: 15.6%;
  margin-right: 1%;
  border: 1px solid rgba(38, 85, 134, 0.32);
  background-color: rgba(28, 60, 95, 0.32);
  margin-bottom: 0.15rem;
  height: 2.8rem;
  position: relative;
}
.showface ul li > div {
  width: 100%;
  height: 65%;
  position: relative;
}
.showimgPic img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
/* .showface li div img{
  width: 100%;
  height: 100%;
} */
.el-pagination {
  text-align: right;
  margin-top: 0.15rem;
}
.showface .hidden {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.12rem;
}

.showface p {
  padding: 0 0.1rem;
}
.showface ul li .el-button {
  padding: 0.02rem 0.03rem;
  font-size: 0.12rem !important;
}

.lookFaceInfos {
  height: 5rem;
  overflow: auto;
}
.lookFaceInfos ul li {
  float: left;
  width: 1.39rem;
  height: 1.3rem;
  margin-right: 0.12rem;
  margin-bottom: 0.1rem;
  position: relative;
  border: 1px solid rgba(38, 85, 134, 0.32);
}
.lookFaceInfos ul li img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.lookFaceInfos ul li i {
  color: #99c9fa;
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.15rem;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.faceTomore {
  height: 4rem;
}
.morelist {
  width: 100%;
}
.morelist li {
  width: 19%;
  float: left;
  margin-right: 1%;
  height: 1.8rem;
  border: 1px solid red;
  position: relative;
  margin-top: 0.1rem;
}
.morelist li img {
  width: 100%;
  height: 100%;
}
.morelist li i {
  color: #99c9fa;
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.15rem;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.tenMore {
  color: #99c9fa;
  display: inline-block;
  margin-left: 0.2rem;
}
.showface li i {
  position: absolute;
  width: 0.13rem;
  height: 0.13rem;
  bottom: 0.03rem;
  right: 0.03rem;
}
.ONimg {
  background: url(../../../assets/ImgCheckdON.png) no-repeat center center;
  background-size: 100% 100%;
}
.OFFimg {
  background: url(../../../assets/ImgCheckdOFF.png) no-repeat center center;
  background-size: 100% 100%;
}
.el-image {
  width: 100%;
  height: 100%;
}
</style>
