<template>
  <div class="my">
    <div class="my-client">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft"></van-nav-bar>
      <van-search v-model="value" shape="round" input-align="center" placeholder="请输入搜索关键词" @focus="goToDetail" />
    </div>
    <div class="my-items">
      <itemName v-for="item in myClientList" :key="item.customerName" :id="item.id" :avatar="item.avatar" :customerName="item.customerName" :imgSrc="item.imgSrc" :routerAdress="item.routerAdress" width="1.25rem"></itemName>
    </div>
  </div>
</template>
<script>
import itemName from "./components/itemName.vue";
export default {
  name: "custom",
  components: {
    itemName,
  },
  data() {
    return {
      value: "",
      myClientList: [
        {
          customerName: "签单客户",
          avatar: require("../../../public/img/page/faimly/ic_client_01_h.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "/orderClient",
          id: 2,
        },
        {
          customerName: "重点客户",
          avatar: require("../../../public/img/page/faimly/ic_client_02_h.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "/importantClient",
          id: 1,
        },
        {
          customerName: "新客户",
          avatar: require("../../../public/img/page/faimly/ic_client_03_h.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "/newClient",
          id: 0,
        },
        {
          customerName: "待续保客户",
          avatar: require("../../../public/img/page/faimly/ic_client_04_h.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "/relayClient",
          id: 3,
        },
        {
          customerName: "近期生日客户",
          avatar: require("../../../public/img/page/faimly/ic_client_05_h.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "/birthdayClient",
          id: 4,
        },
        {
          customerName: "全部客户",
          avatar: require("../../../public/img/page/faimly/ic_client_06_h.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "/allClient",
          id: 5,
        },
      ],
    };
  },
  mounted() {
    this.isCustom = this.$route.path == "/custom";
  },
  methods: {
    goToDetail() {
      if (this.isCustom) {
        this.$router.push({
          path: `/allClient/${1}`,
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
.my {
  display: flex;
  flex-direction: column;
  &-client {
    width: 100%;
    // height: 15.74vh;
    background: #ffff;
    /deep/.van-nav-bar ::after {
      background-color: #ffff !important;
    }
    /deep/.van-hairline--bottom::after {
      border: none;
    }
    /deep/.van-search .van-cell {
      position: relative;
    }
    /deep/.van-field__left-icon {
      position: absolute;
      left: 27%;
    }
    /deep/.van-nav-bar .van-icon {
      color: #000000;
      font-size: 20px;
    }
  }
  &-items {
    background: #ffff;
    width: 92%;
    margin-left: 4%;
    border-radius: 10px;
    margin-top: 0.625rem;
    /deep/.faimly-box-content:first-child {
      border-top: none;
    }
  }
}
</style>