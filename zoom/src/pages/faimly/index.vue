<template>
  <div class="faimly">
    <div class="faimly-tabs" :style="{ 'padding-top': $iosSystem + 'px', 'height': 110 + $iosSystem + 'px' }">
      <div class="faimly-tabs-back">
        <van-icon name="arrow-left" size="20" color="#ffff" @click="onClickLeft" />
      </div>
      <van-tabs class="faimly-tabs-item" v-model="tabActive" color="#fff" background="none" title-inactive-color="#709DFF" title-active-color="#ffff" line-width="15" :border="false" @click="clickTab">
        <van-tab v-for="(item, index) in tab" :key="index" :title="item"></van-tab>
      </van-tabs>
    </div>
    <!-- 客户 -->
    <div class="faimly-box" v-show="tabActive === 0">
      <div class="faimly-box-png">
        <div class="faimly-box-png-center"></div>
        <img class="faimly-box-png-img" src="../../../public/img/page/faimly/top_client.png" alt="" />
      </div>
      <itemName v-for="(item, index) in clientItems" :key="index" :avatar="item.avatar" :customerName="item.customerName" :imgSrc="item.imgSrc" :routerAdress="item.routerAdress"></itemName>
    </div>
    <!-- 团队 -->
    <div class="faimly-box" v-show="tabActive === 1">
      <div class="faimly-box-png">
        <div class="faimly-box-png-center"></div>
        <img class="faimly-box-png-img" src="../../../public/img/page/faimly/top_team.png" alt="" />
      </div>
      <itemName v-for="item in teamItems" :key="item.customerName" :avatar="item.avatar" :customerName="item.customerName" :imgSrc="item.imgSrc" :routerAdress="item.routerAdress"></itemName>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vFooter from "@/templates/footer.vue";
import itemName from "./components/itemName.vue";
export default {
  name: "faimly",
  components: {
    vFooter,
    itemName,
  },
  beforeRouteEnter(to, from, next) {
    //从 account home promote 页面进去默认显示客户
    if (from.name == 'account' || from.name == 'home' || from.name == 'promote') {
      localStorage.removeItem('tabActive')
    }
    next(true)
  },
  data() {
    return {
      tab: ["客户", "团队"],
      tabActive: Number(localStorage.getItem("tabActive")) || 0,
      clientItems: [
        {
          customerName: "我的客户",
          avatar: require("../../../public/img/page/faimly/my_custormer.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "custom",
        },
        {
          customerName: "我的访客",
          avatar: require("../../../public/img/page/faimly/my_visitor.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "myGuest",
        },
      ],
      teamItems: [
        {
          customerName: "团队成员",
          avatar: require("../../../public/img/page/faimly/my_custormer.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "teamMember",
          id: 10,
        },
        {
          customerName: "团队业绩",
          avatar: require("../../../public/img/page/faimly/outstanding.png"),
          imgSrc: require("../../../public/img/page/faimly/right_arrow.png"),
          routerAdress: "teamAchievement",
          id: 11,
        },
      ],
    };
  },
  methods: {
    clickTab(name) {
      this.tabActive = name;
      localStorage.setItem("tabActive", this.tabActive);
    },
    goToPage() {
      this.$router.push({
        name: "custom",
      });
    },
  },
};
</script> 
<style lang="less" scoped>
.faimly {
  &-tabs {
    display: flex;
    width: 100vw;
    height: 110px;
    background: linear-gradient(90deg, #1c5de8 0%, #5281f1 99%);
    justify-content: space-around;
    &-back {
      height: 2.75rem;
      flex: 1;
      display: flex;
      justify-content: left;
      align-items: center;
      padding-left: 4%;
    }
    &-item {
      flex: 3;
      margin-right: 20%;
      height: 85px;
      /deep/.van-tab {
        width: 100%;
        height: 100%;
        font-size: 1rem;
      }
    }
  }
  &-box {
    width: 92%;
    margin: 0 4%;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    transform: translateY(-15%);
    /deep/.faimly-box-content:first-child {
      border-top: none;
    }
    :nth-of-type(2) {
      border: none !important;
    }
    &-png {
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-center {
        width: 41%;
        height: 48vw;
        margin: 0 auto;
        background: url(../../../public/img/page/faimly/bg_default_top_client.png)
          no-repeat center;
        background-size: 100%;
      }
      &-img {
        height: 1.3rem;
        align-self: center;
        transform: translateY(-100%);
        object-fit: contain;
      }
    }
    &-content {
      display: flex;
      width: 88%;
      border-top: 1px solid #dcdcdc;
      margin: auto;
      padding: 0.5rem 0;
      justify-content: space-between;
      align-items: center;
      &-left {
        flex: 3;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        margin-top: 3%;
        .myclient {
          margin-left: 5%;
          font-size: 0.95rem;
          text-align: center;
          vertical-align: middle;
          font-weight: 400;
          color: #333333;
        }
      }
      &-right {
        width: 0.63rem;
      }
    }
  }
  /deep/.van-tab--active{
    color: white
  }
}
</style>