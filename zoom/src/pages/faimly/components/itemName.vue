<template>
  <div class="faimly-box-content" @click="goToPages(id, routerAdress)">
    <div class="faimly-box-content-left">
      <img v-if="avatar" :src="avatar" :style="{ width: width }" />
      <div v-else class="noAvatar"></div>
      <span class="myclient">{{ customerName }}</span>
    </div>
    <img class="faimly-box-content-right" :src="imgSrc" alt="" />
  </div>
</template>
<script>
export default {
  name: "itemName",
  props: {
    id: {
      type: Number || null,
      default: null,
    },
    width: {
      type: String,
      default: "1.25rem",
    },
    avatar: {
      //ico src
      type: String,
      require: true,
    },
    imgSrc: {
      //img src
      type: String,
      default: require("../../../../public/img/page/faimly/right_arrow.png"),
      require: false,
    },
    customerName: {
      //标题
      type: String,
      require: true,
    },
    routerAdress: {
      //跳转路由地址
      type: String,
      require: false,
    },
  },
  methods: {
    goToPages(id, routerAdress) {
      if (typeof id !== "number" && routerAdress) {
        this.$router.push(routerAdress);
      } else {
        if (!id && !routerAdress) return
        this.$router.push({
          path: `${routerAdress}/${id}`,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.faimly-box-content {
  display: flex;
  width: 88%;
  border-top: 1px solid #dcdcdc;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  &-left {
    flex: 3;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    margin: 1.5% 0;
    .noAvatar {
      width: 1.625rem;
      height: 1.625rem;
      background: #d3daed;
      border-radius: 50%;
    }
    .myclient {
      margin-left: 6%;
      font-size: 0.85rem;
      text-align: center;
      vertical-align: middle;
      font-weight: 400;
      opacity: 0.9;
    }
  }
  &-right {
    width: 0.63rem;
    width: 0.4375rem;
    height: 0.75rem;
  }
}
</style>