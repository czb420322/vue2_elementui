<template>
  <div>
    <v-header v-if="page.showTitle && page.type==1" :title="{ name: '客户' }"></v-header>
    <v-header v-if="page.showTitle && page.type==2"  :title="{ name: '家庭' }"></v-header>
    <div class="page-group">
        <div class="page page-current" id="customerInfo-page">
            <!-- <header v-if="page.showTitle" class="bar bar-nav bar-nav-nob" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 v-if="page.type==1" class="title" style="color:white;">客户</h1>
                <h1 v-else class="title" style="color:white;">家庭</h1>
            </header> -->

            <!-- 客户模式 -->
            <div v-if="page.type==1" :style="{ top: ($iosSystem + 46) + 'px' }"  class="content content-client-page-customer-customer">
                <div class="screen"  >
                    <div class="screen-item">
                        <van-dropdown-menu class="cdropdown-menu">
                            <van-dropdown-item v-model="page.customerType" :options="option1" @change="changeCustomerType" />
                        </van-dropdown-menu>
                        <!-- <div>
                            <select v-model="page.customerType" @change="changeCustomerType" class="typeselect">
                                <option value="-1">全部</option>
                                <option value="0">新客户</option>
                                <option value="1">重点客户</option>
                                <option value="2">签单客户</option>
                                <option value="3">待续保客户</option>
                                <option value="4">近期生日客户</option>
                            </select>
                        </div>
                        <div class="triangle"></div> -->
                    </div>
                    <!-- <div>
                        <div>按出单顺序排序</div>
                        <div class="triangle"></div>
                    </div> -->
                    <div class="screen-item">
                         <div class="fic" @click="changeType(2)">
                            <img class="ic" src="/rbt-h5/img/client/ic_family.png">
                            <div>切换到家庭模式</div>
                        </div>
                    </div>
                </div>
                <div class="search">
                    <div class="search-bxp">
                        <div class="icon">
                            <img class="ic" src="./../../../public/img/client/ic_clients_01.png">
                        </div>
                        <span class="number">{{ dxbCustomerCount }}</span>
                        <span class="font">位待续保</span>
                    </div>
                    <div class="lint"></div>
                    <div class="search-bxp">
                            <div class="icon">
                            <img class="ic" src="./../../../public/img/client/ic_clients_02.png">
                            </div>
                            <span class="number">{{ birthdayCount }}</span>
                            <span class="font">位近期生日</span>
                    </div>
                </div>
                <div class="date">
                    <!-- <div class="time">{{ month | formatDate }}</div> -->
                    <div class="time"></div>
                    <div v-if="page.customerRecords>0" class="count">共{{ page.customerRecords }}个</div>
                </div>
                <!-- <div class="mm">
                    <div class="item-box" @click="goto" v-for="(item, index) in 2" :key="index">
                        <div class="head">
                            <div class="mm-icon"></div>
                            <div>某某某</div>
                        </div>
                        <div class="newCur">
                            <div>新客户</div>
                            <div>未建立家庭</div>
                        </div>
                    </div>
                </div> -->
                <van-list v-if="customerList!=null&&customerList.length>0" class="mm" v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore">
                    <van-cell class="item-box" style="padding: 5px 0px;" v-for="(item, index) in customerList" :key="index" @click="gotoCustDetails(item.id)" is-link>
                        <div class="head">
                            <div class="mm-icon">
                                <img style="width:2rem;border-radius:50%;" v-if="item.avatar" :src="item.avatar">
                                <img style="width:2rem;border-radius:50%;" v-else-if="item.sex===0" src="./../../../public/img/client/header_a_2x.png">
                                <img style="width:2rem;border-radius:50%;" v-else-if="item.sex===1" src="./../../../public/img/client/header_b_2x.png">
                                <img style="width:2rem;border-radius:50%;" v-else src="./../../../public/img/client/header_a_2x.png">
                            </div>
                            <div>{{ item.customerName }}</div>
                        </div>
                        <div class="newCur">
                            <div v-if="item.customerType == 0">新客户</div>
                            <div v-else-if="item.customerType == 1">重点客户</div>
                            <div v-else-if="item.customerType == 2">签单客户</div>
                            <div v-else-if="item.customerType == 3">待续保客户</div>
                            <div v-else-if="item.customerType == 4">近期生日客户</div>
                            <div v-else>新客户</div>
                            <div v-if="item.homeStatus == 1">已建立家庭</div>
                            <div v-else>未建立家庭</div>
                        </div>
                    </van-cell>
                </van-list>
                <my-empty v-if="customerList==null||customerList.length===0" description="查询无数据" v-show="true"></my-empty>
                <div class="add">
                    <router-link :to="{path:'customerAdd'}">+ 添加客户</router-link>
                </div>
            </div>
            <!-- 家庭模式 -->
            <div v-if="page.type==2" :style="{ top: ($iosSystem + 46) + 'px' }" class="content content-client-page-customer-customer">
                <div>
                    <div class="screen">
                        <div class="screen-item">
                            <div class="fic" style="justify-content:center;">
                                <div>全部</div>
                                <div class="triangle"></div>
                            </div>
                        </div>
                        <!-- <div>
                            <div>按出单顺序排序</div>
                            <div class="triangle"></div>
                        </div> -->
                        <div class="screen-item">
                            <div class="fic" @click="changeType(1)">
                                <img class="ic" src="/rbt-h5/img/client/ic_family.png">
                                <div>切换到客户模式</div>
                            </div>
                        </div>
                    </div>
                    <div class="search">
                        <div class="search-bxp">
                            <div class="icon">
                                <img class="ic" src="./../../../public/img/client/ic_me_family.png">
                            </div>
                            <span class="number">{{ page.homeRecords }}</span>
                            <span class="font">个家庭</span>
                        </div>
                        <div class="lint"></div>
                        <div class="search-bxp">
                                <div class="icon">
                                <img class="ic" src="./../../../public/img/client/ic_clients_02.png">
                                </div>
                                <span class="number">{{ birthdayCount }}</span>
                                <span class="font">位近期生日</span>
                        </div>
                    </div>
                    <van-list :style="{ top: ($iosSystem + 46 + 122) + 'px' }" v-if="familyList!=null&&familyList.length>0" class="fialy-info" v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore">
                        <van-cell class="info fly" style="padding: 5px 0px;" v-for="(item, index) in familyList" :key="index" @click="gotoDetails(item.id)" is-link :center="true">
                            <div style="float:left;">
                                <div class="icon">
                                    <img style="width:3rem;border-radius: 50%;" v-if="item.avatar" :src="item.avatar">
                                    <img style="width:3rem;border-radius: 50%;" v-else-if="item.sex===0" src="./../../../public/img/client/header_a_3x.png">
                                    <img style="width:3rem;border-radius: 50%;" v-else-if="item.sex===1" src="./../../../public/img/client/header_b_3x.png">
                                    <img style="width:3rem;border-radius: 50%;" v-else src="./../../../public/img/client/header_a_3x.png">
                                </div>
                            </div>
                            <div class="finay" style="float:right;">
                                <div class="use">
                                    <div>主客户：{{ item.customerName }}</div>
                                        <div>家庭名称：{{ item.homeName }}</div>
                                        <div>家庭地址： <span class="mb">{{ item.homeAddressDetail }}</span></div>
                                </div>
                            </div>
                        </van-cell>
                    </van-list>
                    <my-empty v-if="familyList==null||familyList.length===0" description="查询无数据" v-show="true"></my-empty>
                    


                </div>
                <div class="add" @click="gotoAddFamily">
                        <a>+ 添加家庭</a>
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
        type: 1,
        customerType: -1,
        customerCurrentPage: 0,
        customerPageSize: 10,
        customerRecords: 0,
        homeCurrentPage: 0,
        homePageSize: 10,
        homeRecords: 0
      },
      loading: false,
      finished: false,
      month: new Date(),
      customerList: [],
      dxbCustomerCount: 0,
      birthdayCount: 0,
      familyList: [],
      value1: -1,
      option1: [
        { text: '全部', value: -1 },
        { text: '新客户', value: 0 },
        { text: '重点客户', value: 1 },
        { text: '签单客户', value: 2 },
        { text: '待续保客户', value: 3 },
        { text: '近期生日客户', value: 4 }
      ]
    }
  },
  filters:{
    // 日期格式
    formatDate (time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM') //月-日 时分
    }
  },
  created() {
      if(Object.keys(this.$route.query).length !== 0) {
          this.page.type=this.$route.query.type;
          if(this.$route.query.dxbCustomerCount>0){
              this.dxbCustomerCount=this.$route.query.dxbCustomerCount;
          }
          if(this.$route.query.birthdayCount>0){
              this.birthdayCount=this.$route.query.birthdayCount;
          }
          if(this.$route.query.customerType>=0){
              this.page.customerType=this.$route.query.customerType*1;
          }
      }
    // 客户列表分页查询
    // if(this.page.type==1){
    //     this.getCustomerList();
    // }
    // // 家庭列表分页查询
    // if(this.page.type==2){
    //     this.getHomeList();
    // }
    this.loadMore();
  },
  methods: {
    changeType: function(type) {
        this.page.type = type;
        this.finished = false;
        this.loadMore();
    },
    // 修改查询的客户类型
    changeCustomerType(value){
        this.page.customerCurrentPage = 0;
        this.page.customerRecords = 0;
        this.customerList=[];
        this.finished=false;
        this.loadMore();
    },
    // 返回上个页面
    goback: function () {
        history.back();
    },
    //跳转家庭页面
    gotoAddFamily: function () {
      this.$router.push({path: '/familyInfo', query:{type: 'add'}})
    },
    // 跳转客户详情页面
    gotoCustDetails: function (custId) {
        this.$router.push({path: '/customerDetail', query:{custId: custId}})
    },
    //跳转家庭详情页面
    gotoDetails: function (homeId) {
        this.$router.push({path: '/familyInfo', query:{homeId: homeId, type: 'edit'}})
    },
    // 客户列表分页查询
    async getCustomerList() {
      var params={}
      if(this.page.customerType!=-1){
        params={
          currentPage: this.page.customerCurrentPage,
          pageSize: this.page.customerPageSize,
          customerType: this.page.customerType
        }
      } else {
        params={
          currentPage: this.page.customerCurrentPage,
          pageSize: this.page.customerPageSize
        }
      }
      const res = await this.$axios({
        url: this.$API.API_CLIENT_PLST,
        method: 'get',
        params: params
      });
      if (res.code === 0) {
        this.loading = false;
        if(!res.content || !res.content.data){
            this.finished=true
        } else {
            this.customerList=this.customerList.concat(res.content.data);
            this.page.customerRecords = res.content.records;
            if(res.content.page>=res.content.total){
                this.finished=true
            }
        }
      } else {
        this.$toast(res.content.resultMessage);
        this.finished=true
      }
    },
    // 家庭列表分页查询
    async getHomeList() {
      const params={
          currentPage: this.page.homeCurrentPage,
        //   pageSize: this.page.homePageSize
         pageSize: 500
      }
      const res = await this.$axios({
        url: this.$API.API_CLIENT_LS,
        method: 'get',
        params: params
      });
      if (res.code === 0) {
        this.loading = false;
        if(!res.content || !res.content.data){
            this.finished=true
        } else {
            this.familyList = res.content.data;
            this.page.homeRecords = res.content.records;
            if(res.content.page>=res.content.total){
                this.finished=true
            }
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    loadMore: function(){
        // 客户列表分页查询
        if(this.page.type==1){
            this.page.customerCurrentPage += 1;
            this.getCustomerList();
        }
        // 家庭列表分页查询
        if(this.page.type==2){
            this.page.homeCurrentPage += 1;
            this.getHomeList();
        }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/customerInfo.less';
</style>