<!--
 * @Author: your name
 * @Date: 2020-07-09 13:32:04
 * @LastEditTime : 2020-12-23 11:24:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\components\batchEduce.vue
 -->
<template>
  <div class="taskMange">
    <el-dialog
      title="批量导入"
      :visible.sync="dialogVisible"
      @close="closeDia"
      @open="opendia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="40%"
      :destroy-on-close="true"
    >
        <span class="taskrelation">
          <div>
            <el-upload
              class="uploadCase"
              action="/pca/generate/uploadCaseZip"
              name="file"
              ref="upload"
              accept=".zip"
              :auto-upload="false"
              :on-change="changeUpload"
              :before-upload="batchExportUpload"
              multiple
            >
              <el-button type="success" class="searchBtn" :disabled="isclose">导入压缩文件</el-button>
            </el-upload>
            <p class="supportFormat">*支持压缩格式: zip</p>
          </div>
          <div class="progress procenter">
            <p>导入案件进度：</p>
            <p>
              <el-progress :percentage="approveProportion" color="#67C23A"></el-progress>
            </p>
          </div>
          <div class="progress">
            <p>
              <span>
                文件总数：{{allNum}}
                成功数量：{{trueNum}}
                失败数量：{{falseNum}}
              </span>
            </p>
            <!-- <p>
            <el-progress :percentage="Proportion" color="#67C23A"></el-progress>
            </p>-->
            <ul class="faildFile">
              <li v-for="(item,index) in errList" :key="index">{{ item }}</li>
            </ul>
          </div>
        </span>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button class="cancleBtn" :disabled="isclose" @click="closeDia">关 闭</el-button> -->
          <el-button type="primary passBtn" :disabled="isclose" class="cancleBtn" @click="uploadOk">确 定</el-button>
        </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      allNum: 0,
      trueNum: 0,
      falseNum: 0,
      approveProportion: 0,
      Proportion: 0,
      uploadList: [], //选择上传的文件
      errList: [], //上传失败的文件,
      timeId: null,
      timeId1:null,
      isclose: false,//禁用关闭按钮
      loading:null,
    };
  },
  mounted() {},
  computed: {},
  watch: {
    isEduce(val) {
      this.dialogVisible = val;
    }
  },
  components: {},
  props: {
    isEduce: Boolean
  },
  methods: {
    //关闭模态框
    closeDia() {
      // console.log(1324564956);
      this.approveProportion = 0
      this.allNum = 0
      this.trueNum = 0
      this.falseNum = 0
      this.errList = []
      this.dialogVisible = false;
      this.timeId = null;
      this.timeId1 = null;
      this.isclose = false;
      this.$emit("childEduce", false);
      this.$emit("childData", true);
    },
    //打开模态框
    opendia() {
      this.isclose = false;
      this.approveProportion = 0
      this.allNum = 0
      this.trueNum = 0
      this.falseNum = 0
      this.errList = []
    },
    // 批量导入
    batchExportUpload(file) {
      let longitude = sessionStorage.getItem("longitude");
      let latitude = sessionStorage.getItem("latitude");
      if (file.type != "application/x-zip-compressed") {
        this.$notify({
          type: "warning",
          message: "请导入文件类型为zip",
          position: "bottom-right",
          duration: 3000
        });
        return false;
      }
      return this.uploadList;
    },
    // onProgress(percentage) {
    //   this.approveProportion = Number(percentage);
    //   if (this.approveProportion == 0) {
    //     this.loading = true;
    //   } else {
    //     this.loading = false;
    //   }
    // },
    changeUpload(file, filelist) {
      this.uploadList = filelist;
    },
    //请求上传的进度
    requestUploadProgress() {
      this.$http.get("/pca/generate/saveRate").then(res => {
        this.approveProportion = res.data.data.rate;
        this.allNum = res.data.data.count;
        this.trueNum = res.data.data.successCount;
        this.falseNum = res.data.data.fatCount;
        this.errList = res.data.data.defList;
        if (res.data.data.rate == 100) {
              this.loading.close();
              this.loading = null;
              this.$emit("childData", true);
              clearInterval(this.timeId);
              clearInterval(this.timeId1);
        }
      });
    },
    //确定上传
    uploadOk() {
      this.isclose = true;
      let longitude = sessionStorage.getItem("longitude");
      let latitude = sessionStorage.getItem("latitude");
      if (!this.uploadList.length) {
        this.$notify({
          type: "warning",
          message: "请选择文件！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "上传中..."
       });
      let formData = new FormData();
      for (let i = 0; i < this.uploadList.length; i++) {
        formData.append("files", this.uploadList[i].raw);
      }
      formData.append("longitude", longitude); // 追加经纬度
      formData.append("latitude", latitude);
      this.timeId = setInterval(() => {
        this.requestUploadProgress();
      }, 3000);
      this.$http({
        url: "/pca/generate/uploadCaseZip",
        method: "post",
        data: formData
      }).then(res => {
        this.timeId1 = setInterval(() => {
          this.$emit("childData", true);
      }, 3000);
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "导入成功",
            position: "bottom-right",
            duration: 3000
          });
            // this.loading.close();
            // this.loading = null
        } else {
          this.$notify({
            type: "error",
            message: "导入失败",
            position: "bottom-right",
            duration: 3000
          });
        }
         this.$emit("childData", true);
      }).catch(()=>{

         this.$emit("childData", true);
      });
      return false;
    }
  }
};
</script>


<style scoped>
@import "../assets/css/commom.css";
@import "../assets/css/webuploader.css";
.taskrelation {
  color: #99c9fa;
}
.procenter {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.supportFormat {
  padding-top: 0.1rem;
}
.progress .el-progress {
  width: 80%;
  display: inline-block;
}

.uploadCase {
  overflow: auto;
  max-height: 150px;
}
.faildFile {
  overflow: auto;
  /* height: 90px; */
  max-height: 90px;
}
.faildFile li {
  font-size: 14px;
  padding: 2px 0;
}
</style>
