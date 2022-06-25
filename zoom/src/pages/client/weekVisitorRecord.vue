<template>
  <div>
    <div class="page-group">
		<div class="page page-current" id="weekVisitorRecord-page">
            <!-- <header v-if="page.showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">7天内主要访客列表</h1>
            </header> -->
            <v-header v-if="page.showTitle" class="bar bar-nav" :title="{ name: '7天内主要访客列表' }"></v-header>
            <div class="content content-client-page-rec-details" :style="{ top: ($iosSystem + 46) + 'px' }">
                <!-- <div class="r-box">
                    <div class="r-item">
                        <div>
                            <div class="left"></div>
                            <div class="right">
                                <div>安联关心保意外健康保险</div>
                                <div>累计3人访问过</div>
                            </div>
                        </div>
                        <div>></div>
                    </div>
                </div> -->
                <div class="record">
                    <div class="rec-box" v-for="(item, index) in weekMost" :key="index">
                        <div class="left">
                          <img style="width:3rem;border-radius:50%;" v-if="item.avatar" :src="item.avatar">
                          <img style="width:3rem;border-radius:50%;" v-else src="./../../../public/img/client/header_a_3x.png">
                        </div>
                        <div class="right-box">
                            <div class="right">
                                <div class="up" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">{{ item.customerName }}</div>
                                <div class="dow">
                                    <div class="time">{{ item.createDate | formatDate }}</div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <my-empty v-if="weekMost==null||weekMost.length===0" description="查询无数据" v-show="true"></my-empty>
                </div>
            </div>
		</div>
    </div>
	<!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
// import vFooter from "@/templates/footer.vue";
// import util from '@/assets/js/util/util';
import { formatDate } from '@/assets/js/util/dateFmt';
export default {
  components: {
    // vFooter: vFooter
  },
  data() {
    return {
      page: {
        autoloader: true,
        showTitle: true
      },
      weekMost: []
    }
  },
  filters:{
    formatDate (time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm:ss') //月-日 时分
    }
  },
  created() {
      // 七天访问最多
      this.getWeekMost();
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    // 七天访问最多
    async getWeekMost() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_GWM,
        method: 'get',
        params: {
          length: 10
        }
      });
      if (res.code === 0) {
        if (res.content!=null) {
          this.weekMost = res.content
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/weekVisitorRecord.less';
</style>