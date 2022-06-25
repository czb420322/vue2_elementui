<template>
  <div class="productUpload" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <v-header :title="{ name: '影像信息' }"></v-header>
      <div class="productBox">
        <p class="box_name">请上传行驶证图片</p>
        <div class="girt">
          <div class="upload-item">
            <input class="uploadInput" v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event,'license')" ref="refIdInput" />
            <img v-if="filePicUrl" @click="isIos ? null : showPicChoose('license')" class="photo" :src="filePicUrl">
            <img v-else @click="isIos ? null : showPicChoose('license')" class="photo"  :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
          </div>
        </div>
      </div>
      <div class="productBox">
        <p class="box_name">请上传车辆外观图片（带车牌）</p>
        <div class="girt">
          <div class="upload-item">
            <input class="uploadInput" v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event,'carFacade')" ref="refIdInput" />
            <img v-if="filePicUrl2" @click="isIos ? null : showPicChoose('carFacade')" class="photo" :src="filePicUrl2">
            <img v-else @click="isIos ? null : showPicChoose('carFacade')" class="photo"  :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
          </div>
        </div>
      </div>
      

    </div>

    <footer class="footer_btn_bar">
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="disabled" @click="onSubmit">下一步</van-button>
    </footer>
     <!-- 选择拍照相册选择 -->
    <van-dialog v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
      <van-cell-group title="请选择图片来源">
        <van-cell @click="goGetPic(cardFaceType)" title="相册" />
        <van-cell @click="goGetCamera(cardFaceType)" title="拍照" />
      </van-cell-group>
    </van-dialog>

  </div>
</template>

<script>
import app from '../../assets/js/util/app';
import util from '../../assets/js/util/util';
import EventBus from '../../assets/js/util/EventBus';
export default {
  data() {
    return {
      agentCode: localStorage.getItem("agentCode"),
      isIos: app.isIos(),
      warrantyNumber: '',//投保单号
      disabled: false,
      filePicUrl:'',
      filePicUrl2:'',
      showDialog:false,
      cardFaceType:'',
      orderNo:'',
      productDetail:'productDetail',//区分下单是是否分享页面还是正常页面（默认正常页面）
    }
  },
  created() {
    window.openAndroidCameraCallback = this.openAndroidCameraCallback;
    this.warrantyNumber = this.$route.query.warrantyNumber || '';  //投保单号
    this.orderNo = this.$route.query.orderNo || '';  //订单号
    this.productDetail = this.$route.query.objPage || 'productDetail'; 
  },
  methods: {
     showPicChoose(type) {
      this.cardFaceType = type;
      this.showDialog = true;
    },
     // 调用安卓系统
    goGetCamera(type) {
      this.cardFaceType = type;
      this.showDialog = false;
      console.log('安卓调用摄像头')
      app.getCamera({ 'callbackMethod': 'openAndroidCameraCallback' })
    },
    goGetPic(type) {
      this.cardFaceType = type;
      this.showDialog = false;
      console.log('安卓调用相册')
      app.getPhoto({ 'callbackMethod': 'openAndroidCameraCallback' })
    },
    // 摄像头回调函数
    openAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        this.afterReadUpload('data:image/jpg;base64,' + result.object.base64Datas, this.cardFaceType)
      }
    },
     // 图片上传
    afterReadUpload(src, type) {
      EventBus.$emit('GlobalLoadingTrigger', true);
      this.cardFaceType = type
      let file
      if (this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
        file = this.btof(src, "upfile")
      }
      let uploadFileInfoStr = {}
      let formdata = new FormData();
      if (this.warrantyNumber != '') {
        uploadFileInfoStr = {
          businessNo: this.warrantyNumber,
        }
      } else{
        EventBus.$emit('GlobalLoadingTrigger', false);
        this.$toast('保单号为空！');
        return;
      }
      formdata.append('uploadFileInfoStr', JSON.stringify(uploadFileInfoStr));
      formdata.append('file', file);
      this.instance.post('/applyAgent/uploadFilesNew', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        // 信息读取
        if (res.data.code === 0) {
          var content = res.data.content;
          if (content.code === 0) {
            var result = content.content.body;
            var resJson = JSON.parse(result);
            if (type === 'license') {
              this.filePicUrl = resJson.data[0].fileUrl;
            }else{
              this.filePicUrl2 = resJson.data[0].fileUrl;
            }
           
          } else {
            this.$toast('图片上传失败');
          }
        } else {
          this.$toast('图片上传失败');
        }
      }).catch((error) =>{
         EventBus.$emit('GlobalLoadingTrigger', false);
        this.$toast('图片上传失败');
      })
    },
      // base64 转file
    btof(data, fileName) {
      const dataArr = data.split(",");
      const byteString = atob(dataArr[1]);

      const options = {
        type: "image/jpeg",
        endings: "native"
      };
      const u8Arr = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
      }
      return new File([u8Arr], fileName + ".jpg", options);
    },
    async onSubmit(){
      if(this.filePicUrl == ''){
         this.$toast('请上传行驶证图片');
        return;
      }
      if(this.filePicUrl2 == ''){
         this.$toast('请上传车辆外观图片');
        return;
      }
      if(this.productDetail == 'showProductDetail'){ //分享流程
        this.$router.push("wxOrderDetail?orderNo="+this.orderNo);
      }else{ //正常跳转流程
        this.$router.push(`confirmInsured?orderNo=${this.orderNo}`);
      }
    },

  }
}
</script>
<style lang="less">
.productUpload {
  .productBox{
    background: #fff;
    margin-bottom: 0.5rem;
    .box_name{
      padding: 0.6rem 1rem;
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
    .girt{
      height: 6.5rem;
      display: flex;
      padding: 0 1rem;
    }
  }
  .upload-item{
    padding: 0 0.2rem;
    position: relative;
    .uploadInput{
      position: absolute;
      top: 0;
      left: 0;
      width: 8rem;
      height: 5.5rem;
      z-index: 999;
      opacity: 0;
    }
    .photo{
      position: absolute;
      top: 0;
      left: 0;
      width: 8rem;
      height: 5.5rem;
      display: block;
      margin: 0 !important;
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