<template>
  <div class="uploaderFilePage">
    <van-field name="uploader" :label="params.name">
      <template #input>
        <van-uploader :after-read="afterRead">
          <van-button icon="plus" type="primary">上传文件</van-button>
        </van-uploader>
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
      fileList: ''
    };
  },
  created() {
  },
  methods: {
    afterRead(file) {
      EventBus.$emit('GlobalLoadingTrigger', true);
      let formdata = new FormData();
      formdata.append('fileGroup', this.params.fileGroup);
      formdata.append('file', file.file);
      this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        let data = JSON.parse(res.data.content.content);
        if (data.resultCode == 0) {
          this.$toast.success('上传成功');
        } else {
          this.$toast(data.resultMsg);
        }
      });
    }
  },
};
</script>

<style lang="less">
</style>