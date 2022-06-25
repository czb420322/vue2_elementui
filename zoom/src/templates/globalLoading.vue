<template>
  <div class="LoadBox" :class="loaddingNum > 0 ? 'show' : ''">
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>

<script>
import EventBus from "../assets/js/util/EventBus";

export default {
  data() {
    return {
      loaddingNum: 0,
    };
  },
  created: function () {
    let token = this.getUrlKey("token", window.location.href);
    if (token != null && token != "") {
      localStorage.setItem("token", token);
    }
    const self = this;
    EventBus.$on("GlobalLoadingTrigger", (flag) => {
      self.loaddingNum = flag
        ? self.loaddingNum + 1
        : self.loaddingNum <= 0
        ? 0
        : self.loaddingNum - 1;
      // console.log('flag', flag, self.loaddingNum);
    });
  },
  beforeDestroy() {
    EventBus.$off("GlobalLoadingTrigger");
  },
  methods: {
   getUrlKey: function (name, url) {
　　 return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) ||['',''])[1].replace(/\+/g, '%20')) || null
 }
  },
};
</script>
<style lang="less" scoped>
.LoadBox {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1000000000;
  background: rgba(255, 255, 255, 0.2);
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  img {
    width: 60px;
    display: block;
  }
}
.LoadBox.show {
  z-index: 1000000000;
  opacity: 1;
  display: flex;
}
</style>