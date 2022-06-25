<template>
  <div>
    <div class="page-group">
		<div class="page page-current" id="visitorRecordDetails-page">
            <!-- <header v-if="page.showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">访客海报</h1>
            </header> -->
            <v-header v-if="page.showTitle" class="bar bar-nav" :title="{ name: '访客海报' }"></v-header>
            <div class="content content-client-page-rec-details" :style="{ top: ($iosSystem + 46) + 'px' }">
                <div class="r-box">
                    <div class="r-item">
                        <div class="left">
                            <img v-if="page.imgUrl" :src="page.imgUrl">
                            <img v-else src="./../../../public/img/client/ic_act_picx2.png">
                          </div>
                          <div class="right">
                              <div>{{ page.activityName }}</div>
                              <div>累计{{ page.totalRecords }}人访问过</div>
                          </div>
                    </div>
                </div>
                <div class="record">
                  <van-list v-if="visitorRecordDetails!=null&&visitorRecordDetails.length>0" class="fialy-info" v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore">
                    <van-cell value-class="rec-box" v-for="(item, index) in visitorRecordDetails" :key="index">
                      <div class="rec-left">
                        <img v-if="item.avatar" :src="item.avatar">
                        <img v-else src="./../../../public/img/client/header_a_2x.png">
                      </div>
                      <div class="rec-right">
                        <div class="up">{{ item.customerName }}</div>
                        <div class="time">{{ item.createDate | formatDate }}</div>
                      </div>
                    </van-cell>
                  </van-list>
                  <my-empty v-if="visitorRecordDetails==null||visitorRecordDetails.length===0" description="查询无数据" v-show="true"></my-empty>
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
        showTitle: true,
        activeId: '',
        imgUrl: '',
        activityName: '',
        totalRecords: 0
      },
      currentPage: 0,
      pageSize: 10,
      loading: false,
      finished: false,
      visitorRecordDetails: []
    }
  },
  filters:{
    formatDate (time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  },
  created() {
    if(Object.keys(this.$route.query).length !== 0) {
      this.page.activeId=this.$route.query.activeId;
      this.page.imgUrl=this.$route.query.imgUrl;
      this.page.activityName=this.$route.query.activityName;
    }
      // 活动访客详情
      // this.getVisitorRecordDetails()
      this.loadMore();
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    // 活动访客详情
    async getVisitorRecordDetails() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_VD,
        method: 'get',
        params: {
          activityId: this.page.activeId,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      });
      if (res.code === 0) {
        if (res.content.data) {
          this.visitorRecordDetails = this.visitorRecordDetails.concat(res.content.data)
          this.page.totalRecords = res.content.records;
           if(res.content.page>=res.content.total){
                this.finished=true
            }
        } else {
          this.finished=true
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    loadMore: function(){
      this.currentPage += 1;
      this.getVisitorRecordDetails();
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/visitorRecordDetails.less';
</style>