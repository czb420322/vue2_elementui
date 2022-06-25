<template>
  <div class="upload">
     <el-dialog
        title="选择映射关系"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :before-close="closeDiaLog"
        @open="openDialog"
        width="40%">
        <div class="Maprelation">
          <div class="mapleft">
            <p>{{fileList.length}}-{{checkNum + 1}}</p>
            <p>{{originalName.split('.')[0]}}/{{fileList[checkNum] == undefined ? '' : fileList[checkNum].name}}</p>
            <ul>
              <li>
                <span>索引列:</span>
                <el-select v-model="mapIndex" placeholder="请选择索引列">
                  <el-option v-for="(item,index) in optionsTwo" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </li>
              <li>
                <span>姓名列:</span>
                <el-select v-model="mapName" placeholder="请选择姓名列">
                  <el-option v-for="(item,index) in optionsTwo" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </li>
              <li>
                <span>身份证列:</span>
                <el-select v-model="mapCard" placeholder="请选择身份证列">
                  <el-option v-for="(item,index) in optionsTwo" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </li>
              <li>
                <span>出生年月列:</span>
                <el-select v-model="mapBir" placeholder="请选择出生年月列">
                  <el-option v-for="(item,index) in optionsTwo" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </li>
              <li>
                <span>性别列:</span>
                <el-select v-model="mapSex" placeholder="请选择性别列">
                  <el-option v-for="(item,index) in optionsTwo" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </li>
              <li>
                <span>备注列:</span>
                <el-select v-model="mapRemark" placeholder="请选择备注列">
                  <el-option v-for="(item,index) in optionsTwo" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </li>
            </ul>
             <p>
              <el-button class="searchBtn" @click="prevOne">上一个</el-button>
              <el-button class="searchBtn" @click="nextOne">下一个</el-button>
              <el-button class="searchBtn" @click="addToeceList">确认</el-button>
             </p>
          </div>
          <div class="mapright">
            <div v-for="(item,index) in excelList" :key="index">
              <p class="hide">{{item.fileName}}</p>
              <p>索引列:{{item.mapping.split(',')[0] | mapfilter}}</p>
              <p>姓名列:{{item.mapping.split(',')[1]  | mapfilter}}</p>
              <p>身份证列:{{item.mapping.split(',')[2]  | mapfilter}}</p>
              <p>出生年月列:{{item.mapping.split(',')[3]  | mapfilter}}</p>
              <p>性别列:{{item.mapping.split(',')[4]  | mapfilter}}</p>
              <p>备注列:{{item.mapping.split(',')[5]  | mapfilter}}</p>
            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false"></el-button> -->
            <el-button  @click="selectMap(md5Value)"></el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "vue-upload",
  props: {
      md5s: Number,
      // 上传最大数量 默认为1
      fileNumLimit: {
          type: Number,
          default: 1
      },
      // 大小限制 默认2M
      fileSingleSizeLimit: {
          type: Number,
          default: 1024 * 1024 * 1024 * 1024 * 10
      },
      // 上传时传给后端的参数，一般为token，key等
      formData: {
          type: Object,
          default: null
      },
      // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
      keyGenerator: {
          type: Function,
          default(file) {
              const currentTime = new Date().getTime();
              const key = `${currentTime}.${file.name}`;
              return key;
          }
      },
      multiple: {
          type: Boolean,
          default: false
      },
      // 上传按钮ID
      uploadButton: {
          type: String,
          default: ""
      },
      btnlibInfo: Object
  },
  filters:{
    mapfilter(val){
      if(val == -1){
        return '未选择'
      }else if(val == 0){
        return '姓名'
      }else if(val == 1){
        return '身份证'
      }else if(val == 2){
        return '出生年月'
      }else if(val == 3){
        return '性别'
      }else if(val == 4){
        return '备注'
      }else if(val == 5){
        return '索引'
      }
    }
  },
  data() {
      return {
          uploader: null,
          startTime: null,
          md5Value: "",
          fileInfo: [],
          dialogVisible:false,
          optionsTwo: [  //任务状态
          {value: '5',label: "索引列"},
          {value: "0",label: "姓名列"},
          {value: "1",label: "身份证列"},
          {value: "2",label: "出生年月列"},
          {value: "3",label: "性别列"},
          {value: "4",label: "备注列"}
        ],
        mapIndex:'',
        mapName:'',
        mapCard:'',
        mapBir:'',
        mapSex:'',
        mapRemark:'',
        fileList:[],  //获取的文件的个数
        excelList:[],  //获取映射关系的,
        dataPath:'',   //映射文件路径,
        originalName:'',  //文件名
        fileName:'',
        checkNum:0, //切换的数组
        timeId:null,
        loading:null,
        count:0,
      };
  },
  watch:{
    fileList:{
      handler(newval,val){

      },
      deep:true
    },
  },
  mounted() {
      let _this = this;
      WebUploader.Uploader.register(
          {
              "before-send-file": "$beforeSendFile", //所有分块发送前
              "before-send": "$beforeSend", //每个分块发送前
              "after-send-file": "$afterSendFile" //每个分块发送后
          },
          {
              $beforeSendFile: function(file) {
                  _this.$emit('filedisable',true)
                  var deferred = WebUploader.Base.Deferred();
                  _this.uploader.md5File(file).then(function(val) {
                      _this.md5Value = val;
                      deferred.resolve();
                  });
                  return deferred.promise();
              },
              $beforeSend: function(block) {
                  //校验分块
                  var deferred = WebUploader.Base.Deferred();
                  let data = {
                      fileMd5: _this.md5Value,
                      chunk: block.chunk,
                      chunkSize: block.end - block.start,
                      progressBar: 0
                  };
                  data = _this.$qs.stringify(data);
                  _this.$http.post("sms/file/checkChunk?userId=" +_this.$storage.getSession("userInfo").userId,data).then(res => {
                          if(res.data.code == 200 && res.data.data == false){
                            _this.loading = _this.$loading({
                              lock: true,
                              background: "rgba(0,0,0,0.4)",
                              text: "正在解析中"
                            });
                            var bar = parseInt((block.chunk+1)/block.chunks *100);
                            _this.$emit("progress", bar);

                          }else{
                            deferred.resolve();
                          }
                      });

                  this.owner.options.formData.fileMd5 = _this.md5Value;
                  deferred.resolve();
                  return deferred.promise();
              },
              $afterSendFile: function(file) {
                if(_this.md5s == 0){
                  return
                }
                let data = {
                  fileMd5:_this.md5Value,
                  extName:file.ext,
                  originalName:file.name,
                  dirId:_this.btnlibInfo.id,  //底库ID
                  userId:_this.$storage.getSession("userInfo").userId,
                  md5:_this.md5s
                }
                data = _this.$qs.stringify(data)
                _this.$http.post('sms/file/merge',data).then(res=>{
                  if(res == undefined){
                    // _this.dialogVisible = true
                    // _this.afterMerge('服务器繁忙')

                  }else{
                    if(res.data.code == 200){
                      let data = res.data.data
                      _this.timeId = window.setInterval(()=>{
                        _this.resolveProgressBar();
                      },5000)
                      // if(data.count.excelCount > 0 ){
                      //   _this.dataPath = data.path  //文件路径
                      //   _this.dialogVisible = true
                      //   _this.fileList = data.excelFirstRows  //文件列表
                      //   _this.originalName = file.name
                      //   // 说明有excel文件
                      //   // _this.selectIndex(_this.btnlibInfo.id,file.name,data,_this.md5Value);

                      // }else{
                      //   //执行解析的进度

                      // }
                    }else if(res.data.code == 100){
                      _this.afterMerge(res.data.message)
                      _this.$notify({
                        type: 'warning',
                        message: '请检查压缩文件中excel首行是否全部为字符格式',
                        position: 'bottom-right',
                        duration: 3000
                      });
                    }else if(res.data.code == 500){
                      _this.afterMerge(res.data.message)
                      _this.$notify({
                        type: 'warning',
                        message: '请上传图片压缩包',
                        position: 'bottom-right',
                        duration: 3000
                      });
                    }else{
                      _this.afterMerge(res.data.message)
                      _this.$notify({
                        type: 'warning',
                        message: '服务异常！',
                        position: 'bottom-right',
                        duration: 3000
                      });
                    }
                  }

                })
              }
          }
      );

      this.initWebUpload();
  },
  methods: {
    // 加载webuploader
    initWebUpload() {
        this.uploader = WebUploader.create({
            auto: true,
            // swf文件路径
            swf: "../../../../static/js/Uploader.swf",
            // 文件接收服务端。
            server:
                "sms/file/uploadCompress?userid=" +
                this.$storage.getSession("userInfo").userId + '&md5=' +this.md5s,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: this.uploadButton, // 选择文件的按钮
                multiple: this.multiple, // 是否多文件上传 默认false
                label: ""
            },
            fileNumLimit:1,
            chunked:true,
            threads : 1, // 只运行1个线程传输
            duplicate : false, // 是否重复上传（单次选择同样的文件）
            prepareNextFile : true, // 允许在文件传输时提前把下一个文件准备好
            fileSingleSizeLimit : 1024 * 1024 * 1024 *1024 * 10,
            // 只允许选择图片文件。
            accept: {
                title: "compress",
                extensions: "zip,rar,7z",
                mimeTypes: ".zip,.rar,.7z"
            }
        });

        // 当有文件被添加进队列的时候，添加到页面预览
        this.uploader.on("fileQueued", file => {});

        this.uploader.on("beforeFileQueued", file => {
            // var isReturn = false;
            // status = 1;
            // let data = {
            //     loginId: sessionStorage.loginId,
            //     dirId: this.btnlibInfo.id,
            //     status: 1
            // };
            // data = this.$qs.stringify(data);
            // this.$http.post("sms/file/updateDirStatus", data).then(res => {
            //     console.log(res, 123132);
            // });

            // return isReturn;
        });
        this.uploader.on("uploadBeforeSend", (object, data, headers) => {
            data.md5value = this.md5Value;
        });

        this.uploader.on("uploadStart", file => {
            // 在这里可以准备好formData的数据
            //this.uploader.options.formData.key = this.keyGenerator(file);
        });

        // 文件上传过程中创建进度条实时显示。
        this.uploader.on("uploadProgress", (file, percentage) => {
        });

        this.uploader.on("uploadSuccess", (file, response) => {
        });

        this.uploader.on("uploadError", (file, reason) => {
            this.$emit("uploadError", file, reason);
        });

        this.uploader.on("error", type => {
            this.uploader.reset();
            if(type ==='Q_TYPE_DENIED'){
              this.$notify({
                type: 'warning',
                message: '请选择rar,zip,7z格式压缩文件',
                position: 'bottom-right',
                duration: 3000
              });
            }
            // }else if(type == "F_EXCEED_SIZE"){
            //    this.$notify({
            //     type: 'warning',
            //     message: '请选择rar,zip,7z暂不支持大小超过1GB的文件',
            //     position: 'bottom-right',
            //     duration: 3000
            //   });
            // }
        });
        this.uploader.on("uploadComplete", (file, response) => {
          this.$emit("complete", file, response);
        });
    },
    afterMerge(msg){
      clearInterval(this.startTime);
      this.uploader.reset();
      this.$emit('fileInfo',false)
    },

    upload(file) {
      this.uploader.upload(file);
    },
    // stop(file) {
    //     this.uploader.stop(file);
    // },
    // 取消并中断文件上传
    // cancelFile(file) {
    //     this.uploader.cancelFile(file);
    // },
    // 在队列中移除文件
    // removeFile(file, bool) {
    //     this.uploader.removeFile(file, bool);
    // },
    // 成功后的回调
    resolveProgressBar(){
        let data = {
          userId:this.$storage.getSession("userInfo").userId,
          // key:this.md5Value
          key:this.md5s
        }
        this.$http.get('sms/file/resolveProgressBar',{params:data}).then(res=>{
          if(res.data.code == 200){
            if(res.data.data){
              this.fileInfo = res.data.data;
              this.count++
              if(this.fileInfo.split('|')[0] > 0){
                if(Number(this.fileInfo.split('|')[0]) == (Number(this.fileInfo.split('|')[1]) + Number(this.fileInfo.split('|')[2]))){
                  clearInterval(this.timeId)
                }
                // this.$notify({
                //   type: 'success',
                //   message: '导入成功！',
                //   position: 'bottom-right',
                //   duration: 3000
                // });
                this.$emit('fileInfo',this.fileInfo)

              }
              console.log(this.count);
              if(this.count > 5){
                clearInterval(this.timeId)
                this.removeResolveProgressBar();
                // this.$notify({
                //   type: 'warning',
                //   message: '导入失败！',
                //   position: 'bottom-right',
                //   duration: 3000
                // });
                this.count = 0
                this.$emit('fileInfo','')

              }

            }
          }else{
            this.count++
            if(this.count > 5){
              clearInterval(this.timeId)
              this.removeResolveProgressBar();
              this.count = 0
            }
          }
        })
    },
    // 文件上传完成以后清除进度条
    removeResolveProgressBar(){
      let data = {
        key:this.md5Value
      }
      clearInterval(this.timeId)
      this.$http.post('sms/file/removeResolveProgressBar?userId='+this.$storage.getSession("userInfo").userId,data).then(res=>{
        clearInterval(this.timeId)
        console.log('RRRRRRRRRRRRRRRRRRRRRRRRR');
      })
      },
    // 关闭映射关系表
    closeDiaLog(){
      this.$myconfirm({
           type: '提示',
           msg: '关闭当前层，服务器不会解析你的文件？确认关闭吗？',
           icon: 1,
           btn: {
             ok: '确定',
             no:'取消'
           }
        }).then(res=>{
          this.dialogVisible = false
          this.clearmap()
          this.$notify({
            type: 'warning',
            message: '导入失败！',
            position: 'bottom-right',
            duration: 3000
          });
          this.$emit('fileInfo',false)
          this.afterMerge();
          this.excelList = []
        }).catch(()=>{

        })
    },
    closeloadTime(){
      clearInterval(this.timeId)
      if(this.loading){
        this.loading.close();
      }

    },
    //打开映射关系表
    openDialog(){

    },
    //选择映射关系
    selectMap(md5value){
      let data = {
        fileMd5:md5value,
        path:this.dataPath,  //路径
        dirId:this.btnlibInfo.id,  //库id
        originalName:this.originalName,  //文件名
        excelMappings:this.excelList,  //映射关系
        userId:this.$storage.getSession("userInfo").userId,
        md5:this.md5s
      }
      let datas = {
        dataStr:JSON.stringify(data)
      }
      datas = this.$qs.stringify(datas);
      this.$http({
        url: 'sms/file/submitSelectIndex?userId='+this.$storage.getSession("userInfo").userId,
        method: 'post',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data:datas
      }).then(res=>{
        if(res.data.code == 200){
          // this.loading = this.$loading({
          //   text: "正在查询...",
          //   spinner: "el-icon-loading",
          //   target: "#imgBox"
          // });
          this.timeId = setInterval(()=>{
            this.resolveProgressBar();
          },5000)
          this.dialogVisible = false
          this.clearmap()
        }else{
          this.dialogVisible = false
          this.clearmap()
        }
      })
      // this.$http.post('sms/file/submitSelectIndex?userId='+this.$storage.getSession("userInfo").userId,data).then(res=>{
      //   console.log(res,999);
      // })
    },
    clearmap(){
      this.mapIndex = ''
      this.mapName = ''
      this.mapBir = ''
      this.mapSex = ''
      this.mapRemark = ''
      this.mapCard = ''
      this.excelList = []
    },
    prevOne(){
      // this.mapIndex = ''
      // this.mapName = ''
      // this.mapBir = ''
      // this.mapSex = ''
      // this.mapRemark = ''
      // this.mapCard = ''
      this.checkNum--
      if(this.checkNum < 0){
        this.checkNum = 0
        this.$notify({
          type: 'warning',
          message: '已经到了第一个',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
    },
    nextOne(){
      // this.mapIndex = ''
      // this.mapName = ''
      // this.mapBir = ''
      // this.mapSex = ''
      // this.mapRemark = ''
      // this.mapCard = ''
      this.checkNum++;
      if(this.checkNum + 1 > this.fileList.length){
        this.checkNum = this.fileList.length - 1
        this.$notify({
          type: 'warning',
          message: '已经到最后一个',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
    },
    // 添加到excel表格对应属性
    addToeceList(){
      if(this.excelList.length){
        for (let i = 0; i < this.excelList.length; i++) {
          if(this.fileList[this.checkNum].name == this.excelList[i].fileName){
            this.$notify({
              type: 'warning',
              message: '改映射关系已存在',
              position: 'bottom-right',
              duration: 3000
            });
            return
          }
        }
      }
      if(this.mapIndex == '' && this.mapName == '' && this.mapCard == '' &&
      this.mapBir == '' && this.mapSex == '' && this.mapRemark == '' ){
        this.$notify({
          type: 'warning',
          message: '请关联索引',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      if(this.mapIndex == ''){
        this.mapIndex = '-1'
      }
      if(this.mapName == ''){
        this.mapName = '-1'
      }
      if(this.mapCard == ''){
        this.mapCard = '-1'
      }
      if(this.mapBir == ''){
        this.mapBir = '-1'
      }
      if(this.mapSex == ''){
        this.mapSex = '-1'
      }
      if(this.mapRemark == ''){
        this.mapRemark = '-1'
      }
      let map=this.mapIndex + ',' +this.mapName + ',' + this.mapCard + ',' + this.mapBir + ',' + this.mapSex + ',' + this.mapRemark;
      // let file =this.originalName.split('.')[0] + '/' +this.fileList[this.checkNum].name;
      let file = this.fileList[this.checkNum].name;
      let obj={
        mapping:map,
        fileName:file
      }
      this.excelList.push(obj)
      this.mapIndex = ''
      this.mapName = ''
      this.mapBir = ''
      this.mapSex = ''
      this.mapRemark = ''
      this.mapCard = ''
    }
  }
};
</script>

<style>
@import '../../../assets/css/commom.css';
.webuploader-container {
  position: relative;
}
.webuploader-element-invisible {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
}
.webuploader-pick {
  position: relative;
  display: inline-block;
  cursor: pointer;
  /* background: #00b7ee; */
  padding: 10px 15px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
}

.webuploader-pick-disable {
  opacity: 0.6;
  pointer-events: none;
}
.Maprelation{
  height: 4rem;
}
.Maprelation .mapleft{
  width: 60%;
  height: 100%;
  float: left;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.mapleft ul li {
  height: 0.4rem;
}
.mapleft ul li span{
  display: inline-block;
  width: 1rem;
  text-align: right;
  color: #99c9fa;
}
.mapleft p{
  text-align: center;
  color: #99c9fa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.1rem;
}
.mapleft ul li .el-select{
  height: 0.3rem;
  width: calc(100% - 1.1rem)
}
.mapleft ul li /deep/ .el-input__inner{
  height: 0.3rem;
}
.Maprelation .mapright{
  width: 38%;
  margin-left: 62%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  height: 100%;
  overflow: auto;
}
.mapright div{
  color: #99c9fa;
  padding: 0.2rem;
  border-bottom: 1px solid red;
}
.mapright .hide{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.1rem;
}
</style>
