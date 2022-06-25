<template>
  <div>
    <div class="carInfoScan" v-if="params.code == 'licenseNo'">
      <input v-if="isIos" class="file" type="file" accept="image/*" @change="afterRead($event)" ref="refIdInput" />
      <img @click="isIos ? null : showPicChoose()" class="icon" src="./../../public/img/client/ic_scanid.png">
    </div>
    <!-- 选择拍照相册选择 -->
    <van-dialog class="selectPhoto" v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
      <van-cell-group title="请选择图片来源">
        <van-cell @click="goGetPic()" title="相册" />
        <van-cell @click="goGetCamera()" title="拍照" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import app from '../assets/js/util/app';
import util from '../assets/js/util/util';
export default {
  props: ["params"],
  data() {
    return {
      showPicker: false,
      showDialog: false,
      isIos: false,
    };
  },
  created() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
      this.isIos = true;
    }else{
      this.isIos = app.isIos()
    }
    
  },
  mounted () {
    window.carInfoScanOpenAndroidCameraCallback = this.carInfoScanOpenAndroidCameraCallback;
  },
  methods: {
    // 上传行驶证
    async afterRead(src) {
      let file
      if (this.isIos) {
        file = src.target.files[0]
      } else {
        file = util.btof(src, "upfile")
      }
      this.$toast.loading({ duration: 0, message: '图片识别中' });
      let userInfo = util.getSessionStorageObj('getUserInfoF');
      var formdata = new FormData();
      formdata.append('file', file);
      console.log(userInfo.OrgCode,"22222")
      formdata.append('comCode', userInfo.OrgCode);
      formdata.append('operateCode', userInfo.handlerCode);
      this.instance.post('file/upload/driveLicense', formdata).then((res) => {
        if(this.$refs.refIdInput){
          this.$refs.refIdInput.value = "";
        }
        if (res.data.code === 0) {
          let resData = JSON.parse(res.data.content.content)
          if (resData.resultCode == 0) {
            this.$toast('识别成功');
            console.log("resData11",resData); 
            let carInfo = {
              plate_num: resData.plate_num,
              vin: resData.vin,
              engine_num: resData.engine_num,
              model:resData.model, //品牌型号
              register_date:resData.register_date, //注册日期
              issue_date:resData.issue_date, //发证日期
              imageUrl:resData.imageUrl
            };
            this.$emit('input', carInfo);
            this.$emit('change', carInfo);
          } else {
            this.$toast(resData.resultMsg);
          }
          // this.$toast.loading({duration: 1});
        } else {
          this.$toast('识别失败');
          // this.$toast.loading({duration: 1});
        }
      });
    },

    showPicChoose() {
      this.showDialog = true;
    },
    // 调用安卓系统
    goGetCamera() {
      console.log('安卓调用摄像头')
      this.showDialog = false;
      app.getCamera({ 'callbackMethod': 'carInfoScanOpenAndroidCameraCallback' })
    },
    goGetPic() {
      console.log('安卓调用相册')
      this.showDialog = false;
      app.getPhoto({ 'callbackMethod': 'carInfoScanOpenAndroidCameraCallback' })
    },
    // 摄像头回调函数
    carInfoScanOpenAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
      }
    },
  },
};
</script>
<style lang="less" scoped>
.carInfoScan {
  position: relative;
  width: 2rem;
  height: 1.2rem;
  display: flex;
  justify-content: flex-end;
  .file{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .icon {
    display: block;
    height: 1.2rem;
    padding-left: 0.4rem;
  }
}

.selectPhoto {
  .van-cell-group__title {
    text-align: left;
  }
  .van-cell::after {
    display: block;
  }
  .van-cell__title span::before {
    display: none;
  }
  .van-cell__title{
    text-align: left;
  }
}
</style>

