<template>
  <div>
    <v-header :title="{ name: '访客' }"></v-header>
    <div class="page-group" :style="{ top: ($iosSystem + 46) + 'px' }">
      
		<div class="page page-current" id="visitor-page">
            <!-- <header v-if="page.showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">访客</h1>
            </header> -->
 
            <div class="content content-client-page-vis">
                <div class="title-box">
                    <div class="moer-title">7天内访问最多</div>
                    <router-link v-if="weekMost!=null&&weekMost.length>0" :to="{path: '/weekVisitorRecord'}">更多 ></router-link>
                </div>
                <div class="person">
                    <div v-for="(item, index) in weekMost" :key="index">
                        <div>
                          <img style="width:100%;height:100%;border-radius:50%;" v-if="item.avatar" :src="item.avatar">
                          <img style="width:100%;height:100%;border-radius:50%;" v-else src="./../../../public/img/client/header_a_3x.png">
                        </div>
                        <div style="width:3rem;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">{{ item.customerName }}</div>
                    </div>
                </div>
                <my-empty v-if="weekMost==null||weekMost.length===0" description="查询无数据" v-show="true"></my-empty>
                <div class="title-box bor">
                    <div class="moer-title weig">访客记录</div>
                    <router-link v-if="visitorRecord!=null&&visitorRecord.length>0" :to="{path: '/visitorRecord'}">查看全部  ></router-link>
                    <!-- <div><a href="./visitorRecord.html">查看全部  ></a></div> -->
                </div>
                <div class="record">
                    <div class="rec-box" v-for="(item, index) in visitorRecord" :key="index" @click="gotoDetail(item.imgUrl, item.activityName, item.activityId)">
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
                    </div>
                    <my-empty v-if="visitorRecord==null||visitorRecord.length===0" description="查询无数据" v-show="true"></my-empty>
                </div>

                <!-- <div class="advertisement"><img src="/rbt-h5/img/page/base/gr_ad.png"></div>

                <div class="title-box">
                    <div class="moer-title weig">其它</div>
                </div>

                <div class="other">
                    <div class="other-box">
                        <div>
                            <div class="icon">
                                <img class="ic" src="/rbt-h5/img/client/ic_other_order.png">
                            </div>
                            <div class="fot">我的订单</div>
                        </div>
                        <div>
                            <div class="icon">
                                <img class="ic" src="/rbt-h5/img/client/ic_other_aticle.png">
                            </div>
                            <div class="fot">展业软文</div>
                        </div>
                    </div>
                    <div class="other-box">
                        <div>
                            <div class="icon">
                                <img class="ic" src="/rbt-h5/img/client/ic_other_post.png">
                            </div>
                            <div class="fot">海报</div>
                        </div>
                        <div>
                            <div class="icon">
                                <img class="ic" src="/rbt-h5/img/client/ic_other_policy.png">
                            </div>
                            <div class="fot">保单管理</div>
                        </div>
                    </div>
                </div> -->
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
      weekMost: [],
      visitorRecord: []
    }
  },
  filters:{
    // 日期格式
    formatDate (time){
      let date = new Date(time)
      return formatDate(date,'MM-dd hh:mm') //月-日 时分
    }
  },
  created() {
    // 七天访问最多
    this.getWeekMost();
    // 访客列表
    this.getVisitorRecord();
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    // 跳转详情页面
    gotoDetail: function (imgUrl, activityName, activeId) {
      //跳转新增页面
      this.$router.push({path: '/visitorRecordDetails', query:{imgUrl: imgUrl, activityName: activityName, activeId: activeId}})
    },
    // 七天访问最多
    async getWeekMost() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_GWM,
        method: 'get',
        params: {
          length: 5
        }
      });
      if (res.code === 0) {
        if (res.content) {
          this.weekMost = res.content
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // 访客列表
    async getVisitorRecord() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_PLIST,
        method: 'get',
        params: {
          currentPage: 1,
          pageSize: 5
        }
      });
      if (res.code === 0) {
        if (res.content) {
          this.visitorRecord = res.content.data
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/visitor.less';
</style>