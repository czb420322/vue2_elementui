<template>
  <div class="my-client">
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onLeft">
      <template #right>
        <van-icon v-if="$route.name == 'orderClient' || $route.name == 'importantClient' || $route.name == 'newClient' || $route.name == 'relayClient' || $route.name == 'birthdayClient' || $route.name == 'allClient'" :name="$CTXBASE + '/img/page/faimly/bt_nav_add.png'" size="18px" @click="goPage('infoClientEdit')" />
        <van-icon v-else-if="$route.name == 'infoClient'" :name="$CTXBASE + '/img/page/faimly/bt_nav_edit@2x.png'" size="18px" @click="goPage(`infoClientEdit?id=${$route.params.id}`)" />
      </template>
    </van-nav-bar>
    <van-search v-if="showInput" v-model="value" shape="round" show-action input-align="center" :placeholder="placeholder" @search="goToDetail">
      <template #action>
        <div @click="goToDetail">搜索</div>
      </template>
    </van-search>
  </div>
</template>
<script>
import compCheck from "../../../assets/js/util/comp-check"; //isMobile
export default {
  name: "searchClient",
  props: {
    placeholder: {
      type: String,
      default: "请输入电话号码搜索",
    },
    showInput: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      value: "",
      isCustom: null,
      showEdit: false,
    };
  },
  methods: {
    parentMsg(type) {
      this.showEdit = type
    },
    goToDetail(e) {
      if (this.isCustom) {
        this.$router.push({
          name: "allClient",
        });
        return;
      }
      //电话号码校验
      if (!compCheck.isMobile(this.value)) return;
      this.phoneGetAjax(this.value);
    },
    async phoneGetAjax(phone) {
      const res = await this.$axios({
        url: this.$API.API_MY_TARGET_SEARCH_PHONE,
        method: "post",
        data: {
          phone,
        },
      });
      if (res.code == 0 && res.content.result == 0) {
        const id = res.content.data.id;
        this.$router.push({
          path: `/infoClient/${id}`,
        });
      }
    },
    onLeft() {
      if (this.showEdit) {
        this.showEdit = false;
        this.$emit("showEdit", this.showEdit);
      } else {
        this.onClickLeft();
      }
    }
  }
};
</script>
<style scoped lang="less">
.my-client {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 99;
  background: #ffff;
  .van-hairline--bottom::after {
    border: none;
  }
  /deep/.van-nav-bar ::after {
    background-color: #ffff !important;
  }
  /deep/.van-nav-bar .van-icon {
    color: #000000;
    font-size: 20px;
  }
}
</style>