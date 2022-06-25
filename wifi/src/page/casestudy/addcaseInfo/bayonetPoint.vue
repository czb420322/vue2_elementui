<!--
 * @Author: your name
 * @Date: 2020-09-15 13:59:35
 * @LastEditTime : 2020-12-22 11:11:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha\vacp-wfes\src\page\casestudy\addcaseInfo\bayonetPoint.vue
 -->
<template>
  <el-dialog
    title="上传卡口图片"
    :visible.sync="DialogVisiblel"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    width="40%"
    height="600px"
    @open="opendia"
    @close="closedia"
  >
    <div class="faceTomore">
      <div class="notifyinfo">
        <p class="supportFormat">*支持压缩格式: zip,7z,rar</p>
        <p class="supportFormat">*压缩文件最大支持1G</p>
      </div>
      <el-button
        size="small"
        class="searchBtn"
        type="primary"
        v-no-more-click
        @click="uploadBayonetFile(0)"
        :disabled="isDisabled"
      >上传文件</el-button>
      <el-button
        size="small"
        class="searchBtn"
        type="primary"
        v-no-more-click
        @click="uploadBayonetFile(1)"
         :disabled="isDisabled"
      >上传文件夹</el-button>
      <el-button
        size="small"
        class="searchBtn"
        type="primary"
        v-no-more-click
        @click="uploadBayonetFile(2)"
        :disabled="isDisabled"
      >上传压缩文件</el-button>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary cancleBtn" @click="closedia" class="cancleBtn">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      DialogVisiblel: false,
      timeId: "", //定时
      loading: null,
      allUport:[],//存放所有被点开的端口
      isDisabled:false,//
      count:false,
    };
  },
  watch: {
    openbayonet(val) {
      this.DialogVisiblel = val;
    },
  },
  props: {
    openbayonet: Boolean,
    caseUuid: String, //案件id
    deviceUuid: String //点位id
  },
  methods: {
    opendia() {
      clearInterval(this.timeId);
    //   this.calcUpload();
      this.aaa();
      window.onOpenBayonetFile = this.onOpenBayonetFile;
    },
    aaa() {
      //在session里面存一个数组，用来存放上传过图片，文件夹，压缩文件的点位deviceUuid,每一个uuid后期还会再push进去回调函数的端口
      if (sessionStorage.getItem("uploadDeviceList") == null) {
        let uploadDeviceList = [];
        sessionStorage.setItem(
          "uploadDeviceList",
          JSON.stringify(uploadDeviceList)
        );
      }
    },
    calcUpload() {
      clearInterval(this.timeId);
      this.timeId = setInterval(() => {
        setTimeout(() => {
          this.loading.close();
        }, 60000);
      }, 1000);
    },

    closedia() {
      clearInterval(this.timeId);
      this.$emit("childBybayonet", false);
    },
    //上传文件
    uploadBayonetFile(data) {
    //   this.isDisabled = true;
    //   setTimeout(()=>{
    //       this.isDisabled = false;
    //   },6000)
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "打开中..."
      });
    //   this.calcUpload();
      this.$nextTick(() => {
        sessionStorage.setItem("uploadCaseUuid", this.$route.query.caseUuid);
        if (
          this.$route.query.caseUuid == "" ||
          this.$route.query.caseUuid == undefined ||
          this.$route.query.caseUuid == null
        ) {
          return;
        }
        let uuid = this.deviceUuid;
        let url =
          "http://127.0.0.1:60000/DxHandler.js?cbk=onOpenBayonetFile&req=30000000-0000-0000-0000-000000000000&type=" +
          data;
        let g_socket = document.createElement("script");
        g_socket.src = url;
        document.body.appendChild(g_socket);
        // 将当前vue对象挂载到window窗口，方便c++方法所在页面与vue进行通信
        window.thisComponent = this;
        //设置上传文件的唯一id
        let uploadimguuid = Date.parse(new Date());

        let currentUploadDevice = this.deviceUuid;
        sessionStorage.setItem("currentUploadDevice", currentUploadDevice);
      });
    },
    onOpenBayonetFile(req, status, msg) {
      if (status != 200 || msg == "") {
        this.closecaruplod(msg);
        this.$notify({
              type: "warning",
              message: "文件上传失败!",
              position: "bottom-right",
              duration: 3000
            });

        return
      } else {

        this.allUport.push(msg)
        this.setDeviceUuidAndPort(msg);
        let uploadCaseUuid = sessionStorage.getItem("uploadCaseUuid");
        // console.log(uploadCaseUuid,"uploadCaseUuid");
        let deviceInfo = sessionStorage.getItem("deviceInfo");
        let timefile = null;
        clearInterval(timefile);
        //设置上传文件的唯一id
        let uploadimguuid = new Date().getTime();
        //设置id
        sessionStorage.setItem("uploadimguuid", uploadimguuid);
        let vsas = sessionStorage.getItem("vsasModuleUrl");

        let webUrl = "http://" + vsas + "/vehicle/dxh/upload";
        let webOfflineUrl = "http://" + vsas + "/vehicle/dxh/offline";
        deviceInfo = JSON.parse(deviceInfo);
        let deviceUuid = deviceInfo.deviceUuid;
        let commitUser = JSON.parse(sessionStorage.getItem("userInfo")).value
          .userId;
          console.log(deviceUuid,"卡口上传的点位id");

        if (uploadCaseUuid == "" || deviceUuid == "" || commitUser == "") {
          return;
        } else {
            var time = null

          $.ajax({
            url:
              "http://127.0.0.1:" +
              msg +
              "?req=1&caseUuid=" +
              uploadCaseUuid +
              "&deviceUuid=" +
              deviceUuid +
              "&sessionId=" +
              uploadimguuid +
              "&webUrl=" +
              webUrl +
              "&webOfflineUrl=" +
              webOfflineUrl +
              "&commitUser=" +
              commitUser,
            type: "GET",
            success: data => {
              if (JSON.parse(data).errorCode == 200) {
              this.count = true
               time = setInterval(() => {
                  this.loading.close()
                  $.ajax({
                    url: "http://127.0.0.1:" + msg + "?req=2&mode=0",
                    type: "GET",
                    success: data => {
                      if (JSON.parse(data).files.length) {
                        if (JSON.parse(data).files[0].largeFile) {
                          clearInterval(time);
                          this.loading.close();
                          clearInterval(this.timeId);
                          this.$notify({
                            type: "warning",
                            message: "压缩包文件大于1G，请重新上传！",
                            position: "bottom-right",
                            duration: 3000
                          });
                        }
                        if (
                            JSON.parse(data).state == 1
                          ) {
                            this.loading.close();
                              if(this.count){
                                  this.$notify({
                                    type: "success",
                                    message: "创建卡口数据上传任务成功!",
                                    position: "bottom-right",
                                    duration: 3000
                                });
                                this.count = false
                              }
                          }
                          else if(JSON.parse(data).state == 2){
                            clearInterval(time);
                            this.loading.close();
                            // this.closecaruplod(msg);
                            this.count= false
                          }
                      }
                    },
                    error: data => {
                    //   this.closecaruplod(msg);
                      this.loading.close()
                      clearInterval(time);
                      this.count= false
                    },
                  });
                }, 1000);
              } else {
                // this.closecaruplod(msg);
                this.loading.close()
                clearInterval(time);
                this.$notify({
                  type: "warning",
                  message: "启动采集客户端失败，请重试",
                  position: "bottom-right",
                  duration: 3000
                });

              }
            },
            error: data => {
            //   this.closecaruplod(msg);
              clearInterval(time);
              this.loading.close()
              this.$notify({
                  type: "warning",
                  message: "启动采集客户端失败，请重试",
                  position: "bottom-right",
                  duration: 3000
            });

            }
          });
        }
      }
    },
    closecaruplod(id) {
      $.ajax({
        url: "http://127.0.0.1:" + id + "?req=3",
        type: "GET",
        success: function(data) {},
        error: function(data) {}
      });
    },
    setDeviceUuidAndPort(port) {
      let currentDevice =
        sessionStorage.getItem("currentUploadDevice") + "&" + port;
      let uploadDeviceList = JSON.parse(
        sessionStorage.getItem("uploadDeviceList")
      );
      let arr = {};
      arr.DP = currentDevice;
      uploadDeviceList.push(arr);
      sessionStorage.setItem(
        "uploadDeviceList",
        JSON.stringify(uploadDeviceList)
      );
      localStorage.setItem("finalDevice", JSON.stringify(uploadDeviceList));
    }
  }
};
</script>
<style scoped>
@import "../../../assets/css/commom.css";
.notifyinfo {
  margin-bottom: 10px;
  color: #99c9fa;
}
</style>


