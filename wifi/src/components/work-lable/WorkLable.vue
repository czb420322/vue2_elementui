<!--
 * @Author: your name
 * @Date: 2020-11-19 16:46:12
 * @LastEditTime : 2020-12-29 10:07:16
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\components\work-lable\WorkLable.vue
 -->
<template>
  <div
    ref="workLlable"
    style="position:fixed; z-index: 99999999; left: 100px; top: 100px"
    :visible.sync="isVisible"
    v-if="isVisible"
    :style="{width: propWidth, height:propHeight, left: propLeft, top: propTop}"
    id="workLableMain"
    @click="choiceCar($event)"
  >
    <img
      :src="url"
      alt
      id="workLableImg"
      style="height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    >
    <canvas
      id="workLableCanvas"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
    ></canvas>
  </div>
</template>

<script>
import zkySearchImg from "./work-lable-zky.js"; //方法的js
import searchimgjs from "./work-lable.js"; //方法的js

export default {
  name: "WorkLable",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    propWidth: {
      type: String,
      default: ""
    },
    propHeight: {
      type: String,
      default: ""
    },
    propLeft: {
      type: String,
      default: ""
    },
    propTop: {
      type: String,
      default: ""
    },
    splitPicUrl: {
      type: String,
      default: ""
    },
    caseUuid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      myWidth: "0",
      myHeight: "0",
      recodeResult: {},
      url: ""
    };
  },
  mixins: [searchimgjs, zkySearchImg],
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(visible) {
        this.$emit("update:visible", visible);
      }
    }
  },
  created() {},
  mounted() {
    this.url = this.splitPicUrl;
    this.glstSearchImg = sessionStorage.getItem("glstStructureSwitch"); // 格林森瞳结构化
    this.zkySearchImg = sessionStorage.getItem("zkyStructureSwitch"); // 中科院结构化
    if (this.glstSearchImg == "true") {
      // 格林深瞳方法
      this.ImgPicWh();
    } else if (this.zkySearchImg == "true") {
      // 中科院方法
      this.zkyImgPicWh();
    }
  },
  methods: {
    closeHandler() {
      window.imgurl = undefined;
      this.jghObj = {};
      this.splitPicUrl = "";
      this.isVisible = false;
    }
  },
  destroyed(){
      this.recodeCount = 0
  }
};
</script>
