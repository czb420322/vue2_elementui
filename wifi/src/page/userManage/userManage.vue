<!--
 * @Author: your name
 * @Date: 2021-01-04 09:19:56
 * @LastEditTime : 2021-08-10 14:58:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\page\userManage\userManage.vue
 -->
<template>
  <div class="parent">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <p class="sysname" @click="gohome">首页 ></p>
      <p class="sysname">&nbsp;用户管理</p>
    </div>
    <!-- <div class="topInfo">
            <p class="sysname" @click="gohome">系统管理</p>
            <p class="sysname childname">用户管理</p>
    </div>-->
    <!-- <div class="menus"> -->
      <!-- <el-button :type="userFlag" @click="gotoList">用户列表</el-button> -->
      <!-- <el-button :type="netFlag" @click="getSynce">天网配置</el-button> -->
    <!-- </div> -->
    <div class="menus">
      <el-button v-if="showFlag" :type="listFlag" @click="alreadyList">已审批</el-button>
      <el-button v-if="showFlag" :type="approveFlag" @click="gotoApprove">待审批</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listFlag: "primary",
      approveFlag: "default",
      userFlag: "primary",
      netFlag: "default",
      showFlag: true,
    };
  },
  watch: {},
  created() {
    if (this.$router.currentRoute.fullPath.indexOf("userList") !== -1) {
      this.listFlag = "primary";
      this.approveFlag = "default";
    } else if (
      this.$router.currentRoute.fullPath.indexOf("userApprove") !== -1
    ) {
      this.listFlag = "default";
      this.approveFlag = "primary";
    }
  },
  mounted() {
    if (this.$route.path == "/manage/userManage/deviceDeploy") {
      this.showFlag = false;
      this.userFlag = "default";
      this.netFlag = "primary";
    }
  },
  methods: {
    // 天网配置
    getSynce() {
      this.showFlag = false;
      this.$router.push({
        path: "/manage/userManage/deviceDeploy",
        query: { menuCode: "602" }
      });
      this.userFlag = "default";
      this.netFlag = "primary";
      this.listFlag = "default";
      this.approveFlag = "primary";
    },
    gotoList() {
      this.showFlag = true;
      this.$router.push({
        path: "/manage/userManage/userList",
        query: { menuCode: "602" }
      });
      this.listFlag = "primary";
      this.approveFlag = "default";
      this.userFlag = "primary";
      this.netFlag = "default";
    },
    alreadyList() {
      this.$router.push({
        path: "/manage/userManage/userList",
        query: { menuCode: "602" }
      });
      this.userFlag = "primary";
      this.netFlag = "default";
      this.listFlag = "primary";
      this.approveFlag = "default";
    },
    gotoApprove() {
      this.$router.push({
        path: "/manage/userManage/userApprove",
        query: { menuCode: "602" }
      });
      this.userFlag = "primary";
      this.netFlag = "default";
      this.listFlag = "default";
      this.approveFlag = "primary";
    },
    // 去管理菜单页
    gohome() {
      this.$router.push({
        path: "/videoStrucPlat",
        query: { menuCode: "700" }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/manage_third.css";
@import "../../assets/css/commom.css";
.menus {
    height: .5rem;
}
.menus .el-button--default {
  color: #99c9fa;
}
.menus .el-button--primary {
  color: #2e93fb;
}
</style>


