<template>
  <div class="productDetailClause" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
    <v-header :title="{ name: title }"></v-header>
    <div class="content_txt" v-for="(item,index) in notificationList" v-if="item.notifiName == title" :key="index" v-html="item.notifiContent"></div>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      notificationList: state => state.car.accidentInsurance.list.length ? state.car.accidentInsurance.list[state.car.accidentInsurance.index].notificationList : [],
    })
  },
  data() {
    return {
      title: this.$route.query.title || '',
    };
  }
};
</script>

<style lang="less">
.productDetailClause{
  .content_txt{
    padding: .7rem;
  }
}
</style>
