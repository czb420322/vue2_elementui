<template>
  <div>
    <div class="page-group">
        <div class="page page-current" id="visitorList-page">
            <!-- <header v-if="page.showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">访客记录</h1>
            </header> -->
            <v-header v-if="page.showTitle" class="bar bar-nav" :title="{ name: '访客记录' }"></v-header>
            <div class="content content-client-page-rec-details" :style="{ top: ($iosSystem + 46) + 'px' }">
                <div class="record">
                    <div class="rec-box" v-for="(item, index) in 3" :key="index">
                        <div class="left">
                          <img style="width:3rem;" v-if="item.avatar" :src="item.avatar">
                          <img style="width:3rem;" v-else src="./../../../public/img/client/header_a_1x.png">
                        </div>
                        <div class="right-box">
                            <div class="right">
                                <div class="up">{{ item.customerName }}</div>
                                <div class="dow">
                                    <div class="time">{{ item.createDate | formatDate }}</div>
                                </div>
                            </div>
                            <div>></div>
                        </div>
                    </div>
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
      currentPage: 1,
      pageSize: 10,
      dataType: null,
      visitors: []
    }
  },
  created() {
    if(Object.keys(this.$route.query).length !== 0) {
        if(this.$route.query.dataType>0){
            this.dataType=this.$route.query.dataType;
        }
    }
    this.getVisitors();
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    gotoDetails: function () {
        
    },
    // 查询访客记录
    async getVisitors() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_PLIST,
        method: 'get',
        params: {
          dataType: this.dataType,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
      });
      if (res.code === 0) {
        if (res.content) {
          this.visitors = this.visitors.concat(res.content.data)
          if(res.content.page>=res.content.total){
              this.finished=true
          }
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    loadMore: function(){
      this.customerCurrentPage += 1;
      this.getVisitors();
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/visitorList.less';
</style>