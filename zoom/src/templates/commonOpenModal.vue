<template>
  <div class="commonOpenModalPgae">
    <van-action-sheet v-model="showPicker" :title="params.title" >
      <div class="content_cnt" v-html="params.text"></div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: ['params'],
  data() {
    return {
      showPicker: false,
    };
  },
  created() {

  },
  methods: {
    parentMsg(page) {
      this.showPicker = true;
    }
  },
  watch: {

  },
};
</script>
<style lang="less" scoped>
.content_cnt {
    width: 94%;
    margin: auto;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    padding-bottom: 20px;
}
</style>