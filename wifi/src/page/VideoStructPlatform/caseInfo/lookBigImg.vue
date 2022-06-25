<template>
  <div>
    <div class="lookmyBigImg" title="点击任何地方关闭" @click="closeImg" v-if="isShowBig">
      <div class="lookmyleft">
        <img class="showimgs" :src="bigImgUrl" alt>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      photoImg: ""
    };
  },
  components: {},
  mixins: [],
  created() {},
  computed: {},
  watch: {},
  props: {
    isShowBig: Boolean,
    bigImgUrl: String
  },
  mounted() {},
  methods: {
    closeImg() {
      this.$emit("childBigClose", false);
    }
  }
};
</script>


<style lang="scss" scoped>
.lookmyBigImg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
.lookmyleft {
  background-color: rgba(8, 28, 49, 0.9);
  width: 100%;
  height: 100%;
  position: relative;
}
.lookmyleft .showimgs {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  object-fit: contain;
}
.lookmyleft span {
  position: absolute;
  border: 0.03rem solid red;
  z-index: 1;
}
</style>
