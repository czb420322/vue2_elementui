<template>
  <div class="clickLoginPage">
    <div @click="goPage('login')">
      <van-empty class="custom-image" image="/img/account/default_avatar.png" description="请点击登录" />
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: ["title"],
  data() {
    return {
      page: 'home'
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="less">
.clickLoginPage {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  .van-empty__image {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px #fff solid;
    box-shadow: 0px 0px 10px #333;
    display: block;
  }
  .van-empty__description {
    font-size: 16px;
    color: #666;
  }
}
</style>
