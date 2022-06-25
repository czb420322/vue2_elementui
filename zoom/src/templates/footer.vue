<template>
  <div>
    <nav class="bar bar-tab mytabbar afe-area-inset-bottom">
      <a class="tab-item external" :class="page == 'home' ? 'active' : ''" href="javascript:void(0)" @click="goPage('home')">
        <img v-if="page == 'home'" src="../../public/img/login/home_checked.png" />
        <img v-else src="../../public/img/login/home_nochecked.png" />
        <div class="label-fot">首页</div>
      </a>
      <!-- <a class="tab-item external" :class="page == 'faimly' ? 'active' : ''" href="javascript:void(0)" @click="goPage('faimly')">
        <img v-if="page == 'faimly'" src="../assets/img/menu/team_s.png" />
        <img v-else src="../assets/img/menu/team.png" />
        <div class="label-fot">家庭</div>
      </a>
      <a class="tab-item external" :class="page == 'promote' ? 'active' : ''" href="javascript:void(0)" @click="goPage('promote')">
        <img v-if="page == 'promote'" src="../assets/img/menu/promotion_s.png" />
        <img v-else src="../assets/img/menu/promotion.png" />
        <div class="label-fot">推广</div>
      </a> -->
      <a class="tab-item external" :class="page == 'account' ? 'active' : ''" href="javascript:void(0)" @click="goPage('account')">
        <img v-if="page == 'account'" src="../../public/img/login/file_checked.png" />
        <img v-else src="../../public/img/login/file_nochecked.png" />
        <div class="label-fot">保单管理</div>
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      page: "home"
    };
  },
  mounted() {
    this.page = this.$route.name;
    this.goPage(this.$route.name);
  },
  methods: {
    goPage(page) {
      // this.page = page;
      switch (page) {
        case "home":
          if (this.$route.name != "home") {
            this.$router.push({
              name: "home",
            });
          }
          break;
        case "faimly":
          if (this.$route.name != "faimly") {
            this.$router.push({
              name: "faimly",
            });
          }
          break;
        case "team":
          if (this.$route.name != "team") {
            this.$router.push({
              name: "team",
            });
          }
          break;
        case "myCustomer":
          if (this.$route.name != "myCustomer") {
            this.$router.push({
              name: "myCustomer",
            });
          }
          break;
        case "promote":
          if (this.$route.name != "promote") {
            this.$router.push({
              name: "promote",
            });
          }
          break;
        case "account":
          if (this.$route.name != "account") {
            this.$router.push({
              name: "account",
            });
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less">
@import '../assets/css/public.css';
</style>