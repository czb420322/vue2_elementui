<template>
  <div class="dataUpload">
    <div>
      <v-header :title="{ name: '影像信息' }"></v-header>
      <div :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
        <van-tabs class="dataUpload_tabs" v-model="active">
          <van-tab title="车辆照片">
              <!-- 安卓上传图片 -->
            <div class="gr-pdbox hideUploader"  @click="goGetPic"  v-if="!isIos">
              <van-uploader v-model="carList">
                <img class="upload-img" :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
              </van-uploader>
            </div>
            <!-- ios上传图片 -->
            <div class="gr-pdbox" v-else>
              <van-uploader :after-read="afterRead" v-model="carList">
                <img class="upload-img" :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
              </van-uploader>
            </div>
          </van-tab>
          <van-tab title="证件照片">
              <!-- 安卓上传图片 -->
            <div class="gr-pdbox hideUploader" @click="goGetPic"  v-if="!isIos">
              <van-uploader  v-model="papersList">
                <img class="upload-img" :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
              </van-uploader>
            </div>
            <!-- ios上传图片 -->
            <div class="gr-pdbox" v-else>
              <van-uploader :after-read="afterRead" v-model="papersList">
                <img class="upload-img" :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
              </van-uploader>
            </div>
          </van-tab>
          <!-- 暂时没有先隐藏 2020-10-22 -->
          <!-- <van-tab title="财务凭证">
                <div class="gr-pdbox">
                    <van-uploader :after-read="afterRead">
                    <img class="upload-img" :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
                    </van-uploader>
                </div>
                </van-tab> -->
        </van-tabs>
      </div>

    </div>

    <footer class="footer_btn_bar">
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="disabled" @click="onSubmit(carList.length > 0 ? 0 : -1,carList.length > 0 ? -1 : papersList.length > 0 ? 0 : -1)">下一步</van-button>
    </footer>
  </div>
</template>

<script>
import app from '../../assets/js/util/app';
import util from '../../assets/js/util/util';
import EventBus from '../../assets/js/util/EventBus';
import { mapState } from 'vuex'
import glutton from '../../assets/js/util/glutton';
import { errorlog } from '../../assets/js/util/errorlog'

export default {
  data() {
    return {
      agentCode: localStorage.getItem("agentCode"),
      isIos: app.isIos(),
      businessNo: '',//交强险投保单号
      orderNo:'',//订单号
      active: 0,
      disabled: false,
      carList: [],//车辆照片
      papersList: [],//证件照片
      num:0,//计数
      num2:0,
    }
  },
  computed: {
    ...mapState({
      phonotape: state => state.car.phonotape,
    })
  },
  
  created() {
    glutton.startRecording();  // 回溯录制
    
    window.carInfoScanOpenAndroidCameraCallback = this.carInfoScanOpenAndroidCameraCallback;
    this.businessNo = this.$store.state.car.subProposalNo.c || this.$store.state.car.subProposalNo.b ||  ''  //交强险投保单号
    this.orderNo = this.$store.state.car.orderNo || ''
    //处理vuex保存的车辆照片
    if(this.phonotape.vehicle.length > 0 && this.phonotape.businessNo == this.businessNo){
      for(let i in this.phonotape.vehicle){
        this.carList.push(this.phonotape.vehicle[i])
      }
    }
    //处理vuex保存的证件照片
    if(this.phonotape.papers.length > 0  && this.phonotape.businessNo == this.businessNo){
      for(let i in this.phonotape.papers){
        this.papersList.push(this.phonotape.papers[i])
      }
    }
  },
  methods: {
    goGetPic() {
      console.log('安卓调用相册')
      app.getPhoto({ 'callbackMethod': 'carInfoScanOpenAndroidCameraCallback' })
    },
    // 摄像头回调函数
    carInfoScanOpenAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
      }
    },
   async afterRead(src) {
      var fileFlow = ''
      if(!this.isIos){//安卓
        let file = util.base64to(src, Math.ceil(Math.random()*10))
        fileFlow = file
      }else{//是ios
       fileFlow = src.file
      }
      fileFlow = await util.compressImg(fileFlow) //压缩
      if (this.active == 0) {
         if(!this.isIos){//安卓
          this.carList.push({
            'file':fileFlow,
            'content':src
          })
         }

      } else if (this.active == 1) {
        if(!this.isIos){//安卓
          this.papersList.push({
            'file':fileFlow,
            'content':src
          })
        }
      }
    },
     //调用上传接口
    async goUploading(fileGroup,file){
      if(fileGroup == 'YC'){
        this.num ++;
      }
      if(fileGroup == 'DZ'){
        this.num2 ++;
      }
      EventBus.$emit('GlobalLoadingTrigger', true);
      var formdata = new FormData();
      var fileGroup = fileGroup;
      formdata.append('file',file);
      formdata.append('fileGroup', fileGroup); //类型
      formdata.append('orderNo', this.orderNo); //订单号
      formdata.append('businessNo', this.businessNo); //交强险投保单号
      formdata.append('operatorCode', this.agentCode);
      this.commonInstance.post( this.$API.API_CARUPLOAD, formdata).then((res) => {
        errorlog('response', res)
        EventBus.$emit('GlobalLoadingTrigger', false);
        if(this.num < this.carList.length){
          this.onSubmit(this.num,-1)
        }else if(this.num2 < this.papersList.length){
          this.onSubmit(-1,this.num2)
        }else{
          this.disabled = false;
          this.update()
        }

      }).catch(error=>{
          errorlog('error', error)
          EventBus.$emit('GlobalLoadingTrigger', false);
          if(this.num < this.carList.length){
            this.onSubmit(this.num,-1)
          }else if(this.num2 < this.papersList.length){
            console.log('num2',this.num2)
            this.num2 ++
            this.onSubmit(-1,this.num2)
          }else{
            this.disabled = false;
            this.update()
          }
        // this.$toast('上传失败');
      });


    },
   async onSubmit(carListIndex,papersListIndex){
      this.disabled = true;
      if(this.carList.length > 0 || this.papersList.length > 0){
        if(this.carList.length > 0 ){
            if(carListIndex >= 0){
              this.goUploading('YC',await util.compressImg(this.carList[carListIndex].file))
            }
        }
        if(this.papersList.length > 0 ){
            if(papersListIndex >= 0){
              this.goUploading('DZ',await util.compressImg(this.papersList[papersListIndex].file))
            }
        }

      }else{
         this.update()
      }
    },
    async update(){
      this.disabled = true;
      let res = await this.$store.dispatch("car/submitUnderWriting", { orderNo: this.$store.state.car.orderNo });
      this.disabled = false;
    },

  }
}
</script>
<style lang="less">
.dataUpload {
  .dataUpload_tabs {
    .van-tabs__wrap {
      .van-tabs__line {
        background-color: white;
        bottom: 18px;
      }
      .van-tabs__nav {
        background-color: #0252ff;
        .van-tab {
          color: #b2c9fa;
        }
        .van-tab--active {
          color: white;
        }
      }
    }
    .gr-pdbox {
      padding: 10px;
      .upload-img {
        width: 80px;
        height: 80px;
      }
    }
    .hideUploader{
      input{
        display: none;
      }
    }
  }
  .footer_btn_bar{
    position: fixed;
    width: 90%;
    bottom: 2%;
    left: 5%;
  }
}
</style>
