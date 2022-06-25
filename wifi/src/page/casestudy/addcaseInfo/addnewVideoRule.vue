<template>
 <div>
    <!-- <el-dialog title="新增视频线索" :visible.sync="showAllModel" width="30%" @open="OpenTime" @close="closeFjDailog"> -->
    <el-dialog title="新增视频线索" :visible.sync="showModel" width="30%" @open="OpenTime" @close="closeAllModel()">
      <span class="addvideoclue">
        <p><span> <b style="color:red">*</b> 视频拍摄时间:</span> <input type="text" v-model="fjStartTime" readonly id="test1" placeholder="请输入时间" @blur="changeTime"></p>
        <p class="hideShow" v-show="istimes">请输入视频时间</p>
        <p><span>视频长度:</span><input class="input" type="text" placeholder="请输入小时" @blur="changeOne" v-model="videohour">
        &nbsp;小时&nbsp;<input class="input" type="text" placeholder="请输入分钟" @blur="changeTwo" v-model="videomin">&nbsp;分钟</p>
          <p class="hideShow" v-show="istimesTwo">请输入正确的时间格式</p>
        <div class="fileviode">
          <el-upload
            class="upload-demo"
            ref="upload"
            name = 'files'
            action="sms/uploadFile/hdfs/upload/sync"
            :multiple = "true"
            :on-remove="deleteUpload"
            :on-success="beforeSuccess"
            :before-upload="beforeAvatarUploadVideo">
            <el-button size="small" class="searchBtn" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancleBtn"  @click="closeAllModel">取 消</el-button>
        <el-button class="passBtn" :disabled="isvideoOk" @click="videoKeep();closeAllModel()">保 存</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
  import { mapState, mapActions,mapGetters,mapMutations } from 'vuex'
  import videoDown from '../../../api/casestudy/videoDown.js'
  import uploadVi from '../../../api/casestudy/uploadVI.js'
  export default {
    data () {
      return {
        fjStartTime:'',  //视频时间
        videohour:'',   //视频小时
        videomin:'',    //视频分钟
        istimes:false,
        istimesTwo:false, //是否是正确的时间格式
        isvideoOk:true,  //是否禁用保存按钮
        deviceUuid:'',
        showModel:false
      }
    },
    computed: {...mapState(['showAllModel'])},
    mixins:[videoDown,uploadVi],
    props: {
      deviceid:String
    },
    watch:{
      deviceid(val){
        this.deviceUuid = val
      },
      showAllModel(val){
        this.showModel = val
      }
    },
    methods: {
      ...mapActions([
        'closeAllModel'
      ]),
      OpenTime() {
        this.fjStartTime = this.getCurrentDate();
        this.$nextTick(() => {
          laydate.render({
            elem: '#test1', //指定元素
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm:ss',
            max: this.getCurrentDate(),
            done(value, date, endDate) {
              this.fjStartTime = value;
              this.istimes = false
            },
          });
        })
      },
      //获取时间格式的样式
      changeTime() {
        this.istimes = false
      },
      //获取时间
      changeOne() {
        let xxreg = /^$|^((\d)|(1\d)|(2[0-4]))$/;
        if (!xxreg.test(this.videohour)) {
          this.istimesTwo = true
        } else {
          this.istimesTwo = false
        }
      },
      changeTwo() {
        let xxreg1 = /^$|^[0-5][0-9]?$/;
        if (!xxreg1.test(this.videomin)) {
          this.istimesTwo = true
        } else {
          this.istimesTwo = false
        }
      }
    }
  }
</script>

<style scoped>
@import url('../../../assets/css/commom.css');
.addvideoclue{
  display: inline-block;
}
.addvideoclue p span{
  margin: 0.1rem 0;
  width: 1.2rem;
  display: inline-block;
  text-align: right;
  margin-right: 0.1rem;
  color:#99c9fa
}
.addvideoclue p{
 color:#99c9fa
}
.addvideoclue p input{
  width: calc(100% - 1.5rem);
  height: 0.3rem;
  border: 1px solid #dcdfe6;
  padding-left: 0.1rem;
}
.addvideoclue p i{
  color: red;
  font-style: normal;
}
.addvideoclue p .input{
  width: calc(100% - 4rem);
}

</style>
