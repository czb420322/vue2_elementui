<template>
  <div class="uploaderImgPage">
    <van-field name="uploader" :label="params.name">
      <template #input>
        <van-uploader v-model="uploader" :after-read="afterRead" />
      </template>
    </van-field>
  </div>
</template>

<script>
import EventBus from './../assets/js/util/EventBus';
export default {
  props: ["params", 'right', 'value', 'edit'],
  data() {
    return {
      uploader: [],
    };
  },
  created() {
    console.log('params', this.params);
  },
  methods: {
    afterRead(file) {
      EventBus.$emit('GlobalLoadingTrigger', true);
      let formdata = new FormData();
      formdata.append('uploadFileInfoStr', JSON.stringify({
"fileGroup":"idCard",
}));
      formdata.append('file', file.file);
      this.instance.post('/applyAgent/uploadFiles', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        let data = JSON.parse(res.data.content.content);
        if (data.resultCode == 0) {
          this.$toast.success('上传成功');
        } else {
          this.$toast(data.resultMsg);
        }
      });
    },

  },
};
</script>

<style lang="less">
.uploaderImgPage {
  .van-uploader {
    width: 100%;
    .van-uploader__preview-image {
      display: block;
      width: 100%;
      height: 8rem;
      overflow: hidden;
      border-radius: 8px;
    }
    .van-uploader__upload {
      width: 100%;
      height: 8rem;
      border-radius: 8px;
    }
    .van-uploader__upload-icon {
      color: #dcdee0;
      font-size: 24px;
      background-color: rgba(0, 0, 0, 0.2);
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    .van-uploader__preview-delete-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      font-size: 16px;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      font-size: 2.5rem;
      margin: -1.25rem 0 0 -1.25rem;
    }
    .van-icon-photograph::before {
      color: white;
    }
    .van-uploader__preview-delete {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 3rem;
      height: 3rem;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      margin: -1.5rem;
      display: none;
    }
  }
}
</style>