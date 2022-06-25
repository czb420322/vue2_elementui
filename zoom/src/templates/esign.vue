<template>
  <div class="esignPage">
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '440px', 'padding-top': '32px' }"
    >
      <h6 class="title_bar">签名</h6>
      <sign-canvas
        class="sign-canvas"
        ref="SignCanvas"
        :options="options"
        v-model="value"
      />
      <div class="sign-btns">
        <van-button type="default" block @click="canvasClear()"
          >清空</van-button
        >
        <van-button type="info" block @click="saveAsImg"
          >保存</van-button
        >
      </div>
    </van-popup>
    <!-- 短信弹窗 -->
    <ssm v-show="isbig" @getVerificationCode="getVerificationCode"></ssm>
  </div>
</template>
<script>
import glutton from "../assets/js/util/glutton";
import ssm from "../pages/life/order/ssm.vue";
export default {
  components: { ssm },
  data() {
    return {
      isbig: false,//控制弹窗的
      show: false,//控制画板
      value: null,
      options: {
        lastWriteSpeed: 1, //书写速度 [Number] 可选
        lastWriteWidth: 2, //下笔的宽度 [Number] 可选
        lineCap: "round", //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
        lineJoin: "round", //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
        canvasWidth: 375, //canvas宽高 [Number] 可选
        canvasHeight: 600, //高度  [Number] 可选
        isShowBorder: false, //是否显示边框 [可选]
        bgColor: "white", //背景色 [String] 可选 注:这背景色仅仅只是canvas背景,保存的图片仍然是透明的
        borderWidth: 1, // 网格线宽度  [Number] 可选
        borderColor: "white", //网格颜色  [String] 可选
        writeWidth: 5, //基础轨迹宽度  [Number] 可选
        maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
        minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
        writeColor: "#101010", // 轨迹颜色  [String] 可选
        isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
        imgType: "png", //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
      },
    };
  },
  created() {
    window.GluttonContext.traceNo = sessionStorage.traceNo || "";
    glutton.startRecording(); // 回溯录制3
    this.options.canvasWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    this.options.canvasHeight = 250;
    // this.options.canvasHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 200;
  },
  async mounted() {
    await glutton.glutton.forceSubmit();
  },
  methods: {
    getVerificationCode() {
      console.log("22222222222");
      this.$parent.setSignImgUrl(this.value);
      this.show = false;
      glutton.stopRecording();
    },
    parentMsg() {
      this.show = true;
      setTimeout(() => {
        this.canvasClear();
      }, 100);
    },
    /**
     * 清除画板
     */
    canvasClear() {
      this.$refs.SignCanvas.canvasClear();
    },

    /**
     * 保存图片
     */
    saveAsImg() { 
      // this.show = false;
      // this.isbig = true;
      // console.log(this.isbig,'22222222');
      // console.log("1111111");
      // this.$parent.setSignImgUrl(this.value);
      this.show = false;
      this.isbig=true;
    },
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.esignPage {
  .van-icon {
    top: 43px;
  }
  .title_bar {
    font-size: 17px;
    height: 2.6rem;
    line-height: 2.6rem;
    text-align: center;
    font-weight: normal;
  }
  .sign-canvas {
    width: 100%;
    // height: 60%;
    display: block;
    margin: 0 auto;
  }

  .sign-btns {
    display: flex;
    margin: 1rem 0 0.5rem;
    .van-button--block {
      display: block;
      width: 100%;
      margin: 0.5rem;
    }
  }
}
</style>