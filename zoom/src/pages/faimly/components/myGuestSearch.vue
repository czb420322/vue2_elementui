<template>
  <div class="my-client">
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <van-search v-if="showInput" v-model="activityName" shape="round" show-action input-align="center" :placeholder="placeholder" @search="goToDetail" :readonly="readonly">
      <template #action>
        <div @click="goToDetail" v-if="!readonly">搜索</div>
      </template>
    </van-search>
  </div>
</template>
<script>
import imgimgSrc from "../../../../public/img/page/faimly/bt_nav_add.png";
import compCheck from "../../../assets/js/util/comp-check"; //isMobile
export default {
  name: "myGuestSearch",
  props: {
    placeholder: {
      type: String,
      default: "请输入电话号码搜索",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    showInput: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      activityName: "",
      imgSrc: imgimgSrc,
      activityId: null,
      showEdit: false,
    };
  },

  methods: {
    goToDetail() {
      this.$emit("searchValue", this.activityName);
    },
  },
};
</script>
<style lang="less">
.my-client {
  width: 100%;
  position: sticky;
  z-index: 99;
  top: 0;
  background: #ffff;
  .van-hairline--bottom::after {
    border: none;
  }
  .van-nav-bar ::after {
    background-color: #ffff !important;
  }
  /deep/.van-nav-bar .van-icon {
    color: #000000;
    font-size: 20px;
  }
  /deep/.van-search__action {
    margin-right: 0.75rem;
  }
}
</style>