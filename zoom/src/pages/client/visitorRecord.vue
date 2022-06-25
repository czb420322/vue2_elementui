<template>
  <div>
    <div class="page-group">
        <div class="page page-current" id="visitorRecord-page">
            <!-- <header v-if="page.showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" style="color:white;" @click="goback"><span class="icon icon-left"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">访客记录</h1>
            </header> -->
            <v-header v-if="page.showTitle" class="bar bar-nav" :title="{ name: '访客记录' }"></v-header>
			<div class="content content-client-page-rec" :style="{ top: ($iosSystem + 46) + 'px' }">
                <div class="record">
                    <my-empty v-if="visitorRecords==null||visitorRecords.length===0" description="查询无数据" v-show="true"></my-empty>
                    <van-list v-if="visitorRecords!=null&&visitorRecords.length>0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore">
                        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
                        <van-cell class="rec-box" style="padding: 5px 0px;" v-for="(item, index) in visitorRecords" :key="index" @click="gotoDetails(item.activityId)">
                            <div class="left">
                                <img style="width:100%;height:100%;border-radius:5px;" v-if="item.imgUrl" :src="item.imgUrl">
                                <img style="width:100%;height:100%;border-radius:5px;" v-else src="./../../../public/img/client/ic_act_picx2.png">
                            </div>
                            <div class="right">
                                <div class="up">{{ item.activityName }}</div>
                                <div class="dow">
                                    <div class="pser">
                                        <div class="visitor-avatars">
                                            <div class="hred" v-for="(avat, idx) in item.avatarList" :key="idx">
                                                <img style="width:100%;height:100%;border-radius:50%;" v-if="avat" :src="avat">
                                                <img style="width:100%;height:100%;border-radius:50%;" v-else src="./../../../public/img/client/header_a_1x.png">
                                            </div>
                                        </div>
                                        <div class="visitor-txt">{{ item.customerName }}</div>
                                        <div class="red">等{{ item.userCount }}</div>
                                        <div>人来访</div>
                                    </div>
                                    <div class="time">{{ item.createDate | formatDate }}</div>
                                </div>
                            </div>
                        </van-cell>
                    </van-list>
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
        dataType: null,
        currentPage: 0,
        pageSize: 10
      },
      loading: false,
      finished: false,
      visitorRecords: []
    }
  },
  filters:{
    // 日期格式化
    formatDate (time){
      let date = new Date(time)
      return formatDate(date,'MM-dd hh:mm') //月-日 时分
    }
  },
  created() {
    if(Object.keys(this.$route.query).length !== 0) {
        if(this.$route.query.dataType>0){
            this.page.dataType=this.$route.query.dataType;
        }
    }
    // 访客记录
    this.loadMore();
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    // 跳转详情页面
    gotoDetails: function (activeId) {
        this.$router.push({path: '/visitorRecordDetails', query:{activeId: activeId}})
    },
    // 加载更多、分页加载
    loadMore: function() {
        this.page.currentPage = this.page.currentPage + 1;
        this.getVisitorRecord();
    },
    // 访客记录
    async getVisitorRecord() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_PLIST,
        method: 'get',
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          dataType: this.page.dataType
        }
      });
      this.loading = false;
      if (res.code === 0) {
        if (res.content.data) {
          this.visitorRecords = this.visitorRecords.concat(res.content.data);
          if(res.content.page>=res.content.total){
              this.finished=true
          }
        } else {
            this.finished = true;
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/visitorRecord.less';
</style>