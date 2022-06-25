<template>
  <div>
    <van-tabbar v-model="active" :fixed='false' :before-change="beforeChange">
      <van-tabbar-item to="/shop" >
        <span>首页</span>
        <template #icon="props">
          <img :src="$CTXBASE + '/img/page/shop/' + (props.active ?  'ic_menu_home_s@2x.png' : 'ic_menu_home_n@2x.png')" style="height: 25px" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/shop/find">
        <span>发现</span>
        <template #icon="props">
          <img :src="$CTXBASE + '/img/page/shop/' + (props.active ? 'ic_menu_discovery_s@2x.png' : '/ic_menu_discovery_n@2x.png')" style="height: 25px" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/shop/personal" v-if="!preview" >
        <span>订单管理</span>
        <template #icon="props">
          <img :src="$CTXBASE + '/img/page/shop/' + (props.active ? 'ic_menu_user_s@2x.png' : '/ic_menu_user_n@2x.png')" style="height: 25px" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['active'],
  computed: {
    ...mapState({
      preview: state => state.shop.preview
    })
  },
  mounted() {

  },
  methods: {
    beforeChange(index){
      return false
    }
  }
};
</script>

<style lang="less">
</style>
