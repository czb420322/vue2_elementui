<!-- 验证码组件 -->
<template>
  <div class="auth-code-car">
    <van-popover
      v-model="showPopover"
      trigger="click"
      :actions="actions"
      placement="bottom-end"
      close-on-click-outside
    >
      <template #reference>
        <van-button size="small" type="info">验车码</van-button>
      </template>
    </van-popover>
  </div>
</template>

<script>
import util from "../../../assets/js/util/util";
import { Toast } from "vant";
export default {
  data() {
    return {
      falg: true,
      showPopover: false,
      actions: [{ text: "", disabled: true }],
    };
  },
  methods: {
    async getAuthCodeCar() {
      let res = await this.$axios({
        url: this.$API.API_GETCHECKCARCODE,
        method: "get",
        params: {},
      });
      if (res.code == 0 && res.content.result == 0) {
        this.actions[0].text = res.content.data.checkCarCode;
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
  },
  created() {
    setTimeout(() => {
      this.getAuthCodeCar();
    }, 2000);
  },
  mounted() {},
};
</script>
<style lang="less">
.auth-code-car {
  .van-popover__wrapper {
    position: fixed;
    right: 1rem;
    top: 0.4rem;
    z-index: 999;
  }
}
.van-popover__content {
  .van-popover__action {
    &:hover {
      cursor: auto;
    }
    .van-popover__action-text {
      color: #333;
    }
  }
}
</style>