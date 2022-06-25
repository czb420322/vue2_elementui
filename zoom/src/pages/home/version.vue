<template>
  <div>
    <van-search v-model="search" shape="round" input-align="center" placeholder="输入专版名字" />
    <div>
      <van-index-bar highlight-color='#1472FF'>
        <template v-for="(item, name) in cities">
          <template v-if="item.length">
            <van-index-anchor :index="name" :key="name" />
            <van-cell v-for="(el,index) in item" :key="index" :title="el.name" :url="el.linkUrl ? el.linkUrl : ''" />
          </template>
        </template>
      </van-index-bar>
      <br>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState({
      versionList: state => state.common.versionList
    }),
    cities() {
      let arr = {};
      for (let key in this.versionList) {
        arr[key] = []
        this.versionList[key].filter(el => {
          if (el.name.search(this.search) != -1) {
            arr[key].push(el);
          }
        })
      }
      return arr
    }
  },
  created() {
    this.$store.dispatch('common/getVersionList')
  }
}
</script>

<style lang="less" scoped>
.content {
  background: #eee;
}
/deep/ .van-index-anchor {
  background: #eeeeee;
  b {
    padding-left: 10px;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>