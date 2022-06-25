<template>
  <div>
    <v-header :title="{ name: '我的客户' }"></v-header>
    <div class="page-group afe-area-inset-bottom" :style="{ top: ($iosSystem + 46) + 'px' }">
         
      <div class="page page-current">
        <!-- <header class="bar bar-nav" style="background: #0252ff;">
          <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
          <h1 class="title" style="color:white;">我的客户</h1>
        </header> -->

        <div class="content content-client-page">
          <div class="item_icon">
            <!-- <a href="./visitor.html"></a> -->
            <router-link :to="{path:'visitor'}">
              <img class="ic" src="./../../../public/img/client/ic_me_vistors.png">
              <div>访客</div>
            </router-link>
            <!-- <a href="./customerInfo.html?type=1"></a> -->
            <router-link :to="{path:'customerInfo',query: {type: 1, dxbCustomerCount:customerInfo.dxbCustomerCount, birthdayCount: customerInfo.birthdayCount}}">
              <img class="ic" src="./../../../public/img/client/ic_me_clients.png">
              <div>客户</div>
            </router-link>
            <!-- <a href="./customerInfo.html?type=2"></a> -->
            <router-link :to="{path:'customerInfo',query: {type: 2, birthdayCount: customerInfo.birthdayCount}}">
              <img class="ic" src="./../../../public/img/client/ic_me_family.png">
              <div>家庭</div>
            </router-link>
          </div>
          <!-- <div class="banen"></div> -->
          <div class="advertisement" @click="goPeng()"><img src="./../../../public/img/home/gr_ad_03.png"></div>

          <div class="cu_title">我的访客</div>
          <div class="item-box">
            <div @click="toVisitorRecord(1)">
              <div class="fb7">{{ visitorInfo.weekCount }}</div>
              <div>7天访问访客</div>
            </div>
            <div @click="toVisitorRecord(2)">
              <div class="fbC">{{ visitorInfo.monthCount }}</div>
              <div>本月访问访客</div>
            </div>
            <div @click="toVisitorRecord(0)">
              <div class="ac">{{ visitorInfo.userCount }}</div>
              <div>所有访客</div>
            </div>
          </div>
          <div class="cu_title">我的客户</div>
          <div class="item" style="margin-bottom: 80px;">
            <div>
              <div @click="toCustomerList(0)">
                <div class="e5">{{ customerInfo.newCustomerCount }}</div>
                <div>新客户</div>
              </div>
              <div @click="toCustomerList(1)">
                <div class="e7">{{ customerInfo.zdCustomerCount }}</div>
                <div>重点客户</div>
              </div>
              <div @click="toCustomerList(2)">
                <div class="cd">{{ customerInfo.qdCustomerCount }}</div>
                <div>签单客户</div>
              </div>
            </div>
            <div>
              <div @click="toCustomerList(3)">
                <div class="fa">{{ customerInfo.dxbCustomerCount }}</div>
                <div>待续保客户</div>
              </div>
              <div @click="toCustomerList(4)">
                <div class="d7">{{ customerInfo.birthdayCount }}</div>
                <div>近期生日客户</div>
              </div>
              <div @click="toCustomerList(-1)">
                <div class="acf">{{ customerInfo.userCount }}</div>
                <div>全部客户</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

	<v-footer></v-footer>
  </div>
</template>

<script>
import vFooter from "@/templates/footer.vue";
// import util from '@/assets/js/util/util';
export default {
  components: {
    vFooter: vFooter
  },
  data() {
    return {
      page: {
        autoloader: true
      },
      visitorInfo: {
        userCount: 0,
        weekCount: 0,
        monthCount: 0
      },
      customerInfo: {
        userCount: 0,
        newCustomerCount: 0,
        zdCustomerCount: 0,
        qdCustomerCount: 0,
        dxbCustomerCount: 0,
        birthdayCount: 0
      }
    }
  },
  created() {
    // 访客分类统计
    this.visitorTotalInfo();
    // 客户统计信息
    this.customerTotalInfo();
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    toVisitorRecord:function(dataType){
      this.$router.push({path: '/visitorRecord', query:{dataType: dataType}})
    },
    toCustomerList:function(customerType){
      this.$router.push({path: '/customerInfo', query:{type: 1, customerType: customerType, dxbCustomerCount:this.customerInfo.dxbCustomerCount, birthdayCount: this.customerInfo.birthdayCount}})
    },
    // 访客分类统计
    async visitorTotalInfo() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_VTF,
        method: 'get',
        params: { }
      });
      if (res.code === 0) {
        if(res.content.userCount) {
           this.visitorInfo.userCount = res.content.userCount
        }
        if(res.content.weekCount) {
           this.visitorInfo.weekCount = res.content.weekCount
        }
        if(res.content.monthCount) {
           this.visitorInfo.monthCount = res.content.monthCount
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // 客户统计信息
    async customerTotalInfo() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_TI,
        method: 'get',
        params: {
          dataType: this.page.dataType
        }
      });
      if (res.code === 0) {
        if(res.content.userCount) {
           this.customerInfo.userCount = res.content.userCount
        }
        if(res.content.newCustomerCount) {
           this.customerInfo.newCustomerCount = res.content.newCustomerCount
        }
        if(res.content.zdCustomerCount) {
           this.customerInfo.zdCustomerCount = res.content.zdCustomerCount
        }
        if(res.content.qdCustomerCount) {
           this.customerInfo.qdCustomerCount = res.content.qdCustomerCount
        }
        if(res.content.dxbCustomerCount) {
           this.customerInfo.dxbCustomerCount = res.content.dxbCustomerCount
        }
        if(res.content.birthdayCount) {
           this.customerInfo.birthdayCount = res.content.birthdayCount
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    goPeng(){
       this.$router.push({path: '/productDetail', query:{saleCode: 'GRMOBILE_MALL_SL007'}})
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/myCustomer.less';
</style>