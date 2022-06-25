<template>
  <div class="abnormalPopupPage">
    <van-popup v-model="showPicker">
      <div class="_popup">
        <h3 class="name">打卡异常</h3>
        <p class="photoName">拍照上传<span v-if="isFieldwork == 1" style="color: red">*</span></p>
        <div class="photo_box">
          <input v-if="isIos" class="file" type="file" accept="image/*" @change="afterRead($event)" ref="refIdInput" />
          <van-image @click="isIos ? null : showPicChoose()" fit="contain" class="photo" :src="photoUrl || $CTXBASE + '/img/page/clockIn/piazhao@2x.png'" />
        </div>
        <br>
        <div class="van-hairline--top"></div>
        <textarea v-model="textarea" placeholder="备注打卡异常原因" maxlength="50"></textarea>
        <div style="margin: 1rem 25% 1.2rem" @click="saveRemark">
          <van-button v-if="isFieldwork == 1" type="info" round color="#524FC9" block>外勤打卡</van-button>
          <van-button v-else-if="clockInStatus == 1" type="info" round color="#DF3131" block>迟到打卡</van-button>
          <van-button v-else-if="clockInStatus == 2" type="info" round color="#FF8921" block>早退打卡</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import app from '../../assets/js/util/app';
import util from '../../assets/js/util/util';
import EventBus from '../../assets/js/util/EventBus';
export default {
  name: "tab",
  data() {
    return {
      showPicker: false,
      id: '',
      clockInStatus: '',
      isFieldwork: '',
      photoUrl: '',
      textarea: '',
      isIos: app.isIos(),
    };
  },
  mounted() {
    window.appntInfoOpenAndroidCameraCallback = this.appntInfoOpenAndroidCameraCallback;
    var isWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
    if (isWeixin) {
      this.isIos = true;
    }
  },
  methods: {
    parentMsg(id, clockInStatus, isFieldwork) {
      this.id = id
      this.clockInStatus = clockInStatus
      this.isFieldwork = isFieldwork
      this.photoUrl = ''
      this.textarea = ''
      if (this.isFieldwork == 1 || this.clockInStatus == 1 || this.clockInStatus == 2) {
        this.showPicker = true
      }
    },
    // 打卡
    async saveRemark() {
      if (this.isFieldwork == 1 && !this.photoUrl) {
        this.$toast('请先拍照上传');
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_ATTENDANCESAVEREMARK,
        method: 'post',
        data: {
          id: this.id,  // 考勤记录的ID
          photoUrl: this.photoUrl || '',  // 照片地址
          remark: this.textarea || '' // 备注
        }
      });
      this.$toast(res.content.resultMessage || '提交出错');
      if (res.code == 0 && res.content.result == 0) {
        this.showPicker = false;
      }
    },
    showPicChoose() {
      app.getCamera({ 'callbackMethod': 'appntInfoOpenAndroidCameraCallback' })
    },
    // 摄像头回调函数
    appntInfoOpenAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
      }
    },
    // 上传照片
    async afterRead(src) {
      let file
      if (this.isIos) {
        file = src.target.files[0]
      } else {
        file = util.btof(src, "upfile")
      }
      EventBus.$emit('GlobalLoadingTrigger', true);
      var formdata = new FormData();
      formdata.append('file', file);
      this.commonInstance.post(this.$API.API_COMMONUPLOADFILE, formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        if (res.data.code == 0 && res.data.content.resultCode == '1') {
          this.photoUrl = res.data.content.fileUrl
          this.$toast('上传成功');
        } else {
          this.$toast(res.data.content.resultMessage || '上传失败！');
        }
      }).catch(error => {
        this.$toast('上传失败！');
        EventBus.$emit('GlobalLoadingTrigger', false);
      });
    }
  }
};
</script>
<style lang="less">
.abnormalPopupPage {
  .van-popup {
    width: 80%;
    border-radius: 10px;
  }
  ._popup {
    padding: 0 1rem;
    .name {
      text-align: center;
      margin: 0;
      padding: 1rem 0;
    }
    .photoName {
      margin: 0 0 10px 0;
      font-size: 0.8rem;
    }
    .photo_box {
      position: relative;
      .file {
        width: 4rem;
        height: 4rem;
        position: absolute;
        z-index: 1;
        opacity: 0;
      }
      .photo {
        width: 4rem;
        height: 4rem;
        display: block;
      }
    }
    textarea {
      border: none;
      width: 100%;
      font-size: 0.8rem;
      margin-top: 1px;
      padding: 10px 0;
      font-size: 0.8rem;
    }
  }
}
</style>