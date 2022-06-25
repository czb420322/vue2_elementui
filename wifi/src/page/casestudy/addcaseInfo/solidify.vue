<template>
  <div class="taskMange">
     <el-dialog
        title="固化临时点位"
        :visible.sync="dialogVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        @close="closeDia"
        @open="opendia"
        width="42%">
        <span class="taskrelation">
          <ul class="addvideo">
            <li>
              <span><b class="mustwrite">*</b>设备名称：</span>
              <input type="text" v-model.trim='deviceName' maxlength="30" @blur="changename" />
              <p v-show="dnerr" class="mustText mustText0"><i></i>请输入设备名称</p>
            </li>
            <!-- <li>
              <span><b class="mustwrite">*</b>设备端口：</span>
              <input type="text" v-model.trim="devicePort"  maxlength="30" @blur="changeport" />
              <p v-show="dperr">端口格式：0-65535</p>
            </li> -->
            <li>
              <span><b class="mustwrite">*</b>设备经度：</span>
              <input type="text" v-model.trim="pointlng" placeholder="请输入设备经度"  maxlength="30"  @blur="changelng" readonly="readonly">
              <!-- <p v-show="dplngerr">请输入设备经度</p> -->
              <p v-show="dplngerr" class="mustText mustText0"><i></i>请输入设备经度</p>
            </li>
            <li>
              <span><b class="mustwrite">*</b>设备纬度：</span>
              <input type="text" v-model.trim="pointlat" placeholder="请输入设备纬度" @blur="changelat"  maxlength="30" readonly="readonly">
              <!-- <p v-show="dplaterr">请输入设备纬度</p> -->
              <p v-show="dplaterr" class="mustText mustText0"><i></i>请输入设备纬度</p>
            </li>
            <li>
              <span>设备账号：</span>
              <input type="text" v-model.trim="userId"  maxlength="30" placeholder="请输入设备账号"
              />
            </li>
            <li>
              <span>设备密码：</span>
              <input type="password" v-model.trim="password"  maxlength="30" placeholder="请输入设备密码" />
            </li>
            <li>
              <span>I&nbsp;P&nbsp;地&nbsp;址：</span>
              <input type="text" v-model.trim="deviceIP" @blur="changeip"  maxlength="30" placeholder="请输入Ip地址"/>
              <!-- <p v-show="dpIderr">IP格式：XXX.XXX.XXX.XXX</p> -->
              <p v-show="dpIderr" class="mustText mustText0 mustText1"><i></i>IP格式：XXX.XXX.XXX.XXX</p>
            </li>
            <li>
              <span>设备型号：</span>
              <input type="text" v-model.trim="deviceModel" maxlength="100" placeholder="请输入设备型号" />
              <!-- <p v-show="dpmoerr">请输入设备型号</p> -->
            </li>
            <!-- <li>
              <span>Rtsp地址：</span>
              <input type="text" v-model.trim="deviceRtsp" @blur="changertsp"  maxlength="50" />
            </li> -->
            <li>
              <span>设备编号：</span>
              <input type="text" v-model.trim="deviceApe" @blur="changeape"  maxlength="20" placeholder="请输入设备编号"/>
              <!-- <p v-show="carape">请输入设备编号</p> -->
            </li>
            <li class="lastaddvideo">
              <span><b class="mustwrite">*</b>详细位置：</span>
              <province ref='province'></province>
              <p v-show="dchange">请输入详细位置</p>
            </li>
          </ul>



        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary passBtn" v-no-more-click @click="createTemp">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import province from "@/components/province";

export default {
  data(){
    return{
      dialogVisible:false,
      deviceName:'',  //设备名称
      devicePort:'', //设备端口
      pointlng:'',   // 精度
      pointlat:'',   //维度
      userId:'',   // 账号
      password:'',  //密码
      deviceIP:'',  //IP
      deviceModel:'',//设备型号
      deviceRtsp:'', //流
      deviceApe:'', //编号
      dperr:false,
      dnerr:false,
      carape:false,
      dplngerr:false,
      dplaterr:false,
      dpIderr:false,
      dchange:false
    }
  },
  components: {
    province
  },
  mounted(){

  },
  watch:{
    istemporary(val){
      this.dialogVisible = val
    },
  },
  props:{
    istemporary:Boolean,
    pTinfo:Object,
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.$emit('childBytemps',false)
      this.deviceName = ''
      this.devicePort = ''
      this.pointlng = ''
      this.pointlat = ''
      this.userId = ''
      this.password = ''
      this.deviceIP = ''
      this.deviceModel = ''
      this.deviceRtsp = ''
      this.deviceApe = ''

      this.dperr = false
      this.dnerr = false
      this.carape = false
      this.dplngerr = false
      this.dplaterr = false
      this.dpIderr = false
      this.dchange = false

    },
    verify() {
      let device = true;
      // 设备名称
      if (this.deviceName == "") {
        this.dnerr = true;
        device = false;
      }
      // if(this.deviceApe == '' || this.deviceApe == null){
      //   this.carape = true;
      //   device = false;
      // }
      // 端口
      // if (this.devicePort == "" || this.devicePort == null) {
      //   let xxreg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
      //   if (!xxreg.test(this.devicePort)) {
      //     this.dperr = true;
      //     device = false;
      //   }
      // }
      // IP地址
      if (this.deviceIP !== "" && this.deviceIP !== null) {
        // let xxreg = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/;
        let xxreg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
        if (!xxreg.test(this.deviceIP)) {
          this.dpIderr = true;
          device = false;
        }
      }
      // 设备型号
      // if(!this.deviceModel == ''){
      //   this.dpmoerr = true;
      //   device = false;
      // }
      // 详细位置
      if (this.selectdist == "") {
        this.dchange = true;
        device = false;
      } else {
        this.dchange = false;
      }
      return device;
    },
    //固化
    createTemp(){
      if (!this.verify()) {
        return false;
      }
      console.log(111);
      if(this.dperr){
        return false
      }
      console.log(222);
      let data = {
        name: this.deviceName, // 名称
        model: this.deviceModel, // 型号
        ipAddr: this.deviceIP, // IP地址
        port: this.devicePort, // 端口号
        rtspUrl: this.deviceRtsp, //rtsp地址
        apeId: this.deviceApe, //设备编号
        userId: this.userId,
        password: this.password,
        longitude: this.pointlng, // 经度
        latitude: this.pointlat, // 纬度
        placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
        apeType: 0, // 设备类型 0.视频 ,1.人像
        isSociety: 1, // 是否社会类0.否,1是
        cameraUuid:this.pTinfo.list.cameraUuid,
        caseUuid:this.$route.query.caseUuid,
        cameraType:5,
        deviceUuid:this.pTinfo.list.deviceUuid,
        cameraName:this.deviceName,
        longitude:this.pointlng, // 经度
        latitude:this.pointlat,
      }
      console.log(333);
      data = this.$qs.stringify(data);
      this.$http.post('pca/casemng/temp/device/static',data).then(res=>{
        if(res.data.code == 200){
          this.dialogVisible = false
          this.$notify({
            type: 'success',
            message: '固化临时点成功！',
            position: 'bottom-right',
            duration: 3000
          });
        }else if(res.data.code == 100){
          this.$notify({
            type: 'warning',
            message: '有相同名称的点位存在！',
            position: 'bottom-right',
            duration: 3000
          });
        }else{
          this.dialogVisible = false
          this.$notify({
            type: 'error',
            message: '固化临时点失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    //打开模态框
    opendia(){
      this.$nextTick(()=>{
        this.$refs.province.selected =sessionStorage.getItem('defaultRegion').substring(0,2) + '0000'
        this.$refs.province.selectcity =sessionStorage.getItem('defaultRegion').substring(0,4) + '00'
        this.$refs.province.selectdist =sessionStorage.getItem('defaultRegion')
        this.$refs.province.getSelectData();
      })
      this.deviceName = this.pTinfo.list.cameraName
      this.pointlng = this.pTinfo.list.longitude
      this.pointlat = this.pTinfo.list.latitude
    },
    changeport(){
      if (this.devicePort !== "" && this.devicePort !== null) {
        let xxreg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
        if (!xxreg.test(this.devicePort)) {
          this.dperr = true;
        } else {
          this.dperr = false;
        }
      } else {
        this.dperr = false;
      }
    },
    changelng(){
      this.dplngerr = this.point.lng == "" ? true : false;
    },
    changelat(){
      this.dplaterr = this.point.lat == "" ? true : false;
    },
    changeip(){
      if (this.deviceIP !== "" && this.deviceIP !== null) {
        // let xxreg = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/;
        let xxreg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
        if (!xxreg.test(this.deviceIP)) {
          this.dpIderr = true;
        } else {
          this.dpIderr = false;
        }
      } else {
        this.dpIderr = false;
      }
    },
    changertsp(){

    },
    changeape(){
      this.carape = this.deviceApe == "" ? true : false;
    },
    changename(){
      this.dnerr = this.deviceName == "" ? true : false;
    },
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
@import "../../../assets/css/verify.css";
.addvideo{
  height: 2.5rem;
}
.addvideo li{
  width: 50%;
  float: left;
  color: #99c9fa;
  height: 0.5rem;
  /* line-height: 0.4rem; */
  position: relative;
}
.addvideo li span{
  width: 0.9rem;
  font-size: 0.14rem;
  display: inline-block;
  text-align: right;
}
.mustwrite {
  color: red;
  margin-right: 0.1rem;
  text-align: left;
  vertical-align: middle;
}
/* .addvideo li p {
  font-size: 14px;
  width: 2rem;
  color: red;
  margin-left: 3.55rem;
  margin-top: -0.25rem;
} */
.addvideo li input {
  width: 2.5rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-indent: 0.05rem;
  color: #999;
}
.addvideo li:last-child{
  width: 100%;
}
.addvideo .lastaddvideo div {
  display: inline-block;
}
.mustText0{
  left: 2rem;
  top: 0.15rem;
}
.mustText1{
  width: 2rem;
}

</style>
