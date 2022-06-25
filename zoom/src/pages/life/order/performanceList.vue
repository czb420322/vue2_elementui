<template>
  <div class="performancePage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <v-header :title="{ name: '业绩查询' }"></v-header>
      <div>
        <van-sticky :offset-top="($iosSystem + 45)">
          <div class="tabs-box">
            <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
              <van-tab v-for="(item,index) in tab" :key="index" :title="item.orderTypeName"></van-tab>
            </van-tabs>
          </div>
          <div class="search_box">
            <van-dropdown-menu active-color="#0252ff">
              <van-dropdown-item v-model="type" :options="option" />
            </van-dropdown-menu>
            <van-search v-model="searchValue" show-action left-icon placeholder="请输入搜索关键词">
              <template #action>
                <div class="name_s" @click="onSearch">搜索</div>
              </template>
            </van-search>
          </div>
        </van-sticky>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- 全部 -->
          <ol class="list-box" v-if="tabActive == 0">
            <li class="list" v-for="(item,index) in list" :key="index">
              <h5 class="name">
                <div><span class="list_baodan">保单号</span>{{item.policyNo}}</div>
                <van-icon class="arrow-icon" name="arrow" @click="gotoDetail(item.orderNo,item.productName,item.orderType)" />
              </h5>
              <div class="info-box">
                <div>
                  <p class="item"><span class="label">产品名称</span><span class="txt">{{item.productName}}</span></p>
                  <p class="item"><span class="label">客户姓名</span><span class="txt">{{item.customerName}}</span></p>
                </div>
                <p class="item"><span class="label">投保日期</span><span class="txt">{{item.payDate}}</span></p>
                <p class="item"><span class="label">总保费</span><span class="txt">{{item.sumPremium}}元</span></p>
                <div v-show="item.orderType == '1'">
                  <p class="item"><span class="label">保费（不含车船税）</span><span class="txt">{{item.sumPremiumNoActualTax}}元</span></p>
                  <p class="item" v-show="item.points > 1"><span class="label">佣金</span><span class="txt">{{item.points || 0}}元</span></p>
                  <p class="item" v-show="item.iDrill > 1"><span class="label">i钻</span><span class="txt">{{item.iDrill || 0}}</span></p>
                </div>
              </div>
            </li>
          </ol>

          <ol class="list-box" v-if="tabActive == 1">
            <li class="list" v-for="(item,index) in list" :key="index">
              <h5 class="name">
                <div><span class="list_baodan">保单号</span>{{item.policyNo}}</div>
                <van-icon class="arrow-icon" name="arrow" @click="gotoDetail(item.orderNo,item.productName,item.orderType)" />
              </h5>
              <div class="info-box">
                <p class="item"><span class="label">产品名称</span><span class="txt">{{item.productName}}</span></p>
                <p class="item"><span class="label">客户姓名</span><span class="txt">{{item.customerName}}</span></p>
                <p class="item"><span class="label">投保日期</span><span class="txt">{{item.payDate}}</span></p>
                <p class="item"><span class="label">总保费</span><span class="txt">{{item.sumPremium}}元</span></p>
              </div>
            </li>
          </ol>
          <ol class="list-box" v-if="tabActive == 2">
            <li class="list" v-for="(item,index) in list" :key="index">
              <h5 class="name">
                <div><span class="list_baodan">保单号</span>{{item.policyNo}}</div>
                <van-icon class="arrow-icon" name="arrow" @click="gotoDetail(item.orderNo,item.productName,item.orderType)" />
              </h5>
              <div class="info-box">
                <p class="item"><span class="label">产品名称</span><span class="txt">{{item.productName}}</span></p>
                <p class="item"><span class="label">客户姓名</span><span class="txt">{{item.customerName}}</span></p>
                <p class="item"><span class="label">投保日期</span><span class="txt">{{item.payDate}}</span></p>
                <p class="item"><span class="label">总保费</span><span class="txt">{{item.sumPremium}}元</span></p>
                <p class="item"><span class="label">保费（不含车船税）</span><span class="txt">{{item.sumPremiumNoActualTax}}元</span></p>
                <p class="item" v-show="item.points > 1"><span class="label">佣金</span><span class="txt">{{item.points || 0}}元</span></p>
                <p class="item" v-show="item.iDrill > 1"><span class="label">i钻</span><span class="txt">{{item.iDrill || 0}}</span></p>
              
              </div>
            </li>
          </ol>
          <ol class="list-box" v-if="tabActive == 3">
            <li class="list" v-for="(item,index) in list" :key="index">
              <div class="info-box">
                <p class="monthType"><span class="label">{{txt}}</span><span class="txt">{{item.payDate}}</span></p>
                <p class="monthType"><span class="label">总保费</span><span class="txt">{{item.sumPremium}}元</span></p>
              </div>
            </li>
          </ol>
        </van-list>
        <my-empty description="查询无数据" v-show="!list.length && !loading"></my-empty>
        <br>
      </div>
    </div>

  </div>
</template>

<script>
import util from '../../../assets/js/util/util';
import common from '../../../assets/js/util/common';

export default {
  data() {
    return {
      tab: [
        {
          "orderType": "0",
          "orderTypeName": "全部",
          "items": [],
          isLoad: false
        },
        {
          "orderType": "2",
          "orderTypeName": "非车险",
          "items": [],
          isLoad: false
        },
        {
          "orderType": "1",
          "orderTypeName": "车险",
          "items": [],
          isLoad: false
        },
        {
          "orderType": "3",
          "orderTypeName": "按月份",
          "items": [],
          isLoad: false
        }
      ],
      carList: [],
      userInfo: {},
      tabActive: 0,
      orderType: '',
      txt: '投保日期',
      loading: false,
      finished: false,
      currentPage: 1,
      list:[],
      searchValue:'',//搜索
      type: 'productName',
      option: [
        { text: '产品名称', value: 'productName' },
        { text: '保单号', value: 'policyNo' },
        { text: '客户姓名', value: 'customerName' },
      ],
    };
  },
  async created() {
    let tab = util.getSessionStorageObj('performanceTab');
    this.tabActive = tab || 0;
    util.removeSessionStorageObj('performanceTab');

    this.userInfo = await common.getUserInfo();
  },
  methods: {
    // 搜索
    onSearch() {
      if (!this.searchValue) {
        this.$toast('请输入搜索条件');
        return;
      }
      this.currentPage = 1
      this.list = []
      this.loading = true;
      this.onLoad();
    },
    onLoad(){
       this.queryOrderList();
    },
    onClick(name, title) {
      console.log('tabActive', this.tabActive)
      this.searchValue = ''
      this.list = []
      this.currentPage = 1
      this.loading = true;
      this.finished = false;
      if (this.tabActive == 3) {
        this.txt = '业绩月份'
      } else {
        this.txt = '投保日期'
      }
     
      this.queryOrderList();
    },
    async queryOrderList() {
      let data = {
          queryType: this.tab[this.tabActive].orderType,
          pageSize:10,
          currentPage:this.currentPage,
        }
         //搜索类型
        if(this.type == 'productName'){ //产品名称
          data.productName = this.searchValue || ''
        }else if(this.type == 'policyNo'){ //保单号
          data.policyNo = this.searchValue || ''
        }else{//客户姓名
          data.customerName = this.searchValue || ''
        }
      const res = await this.$axios({
        url: this.$API.API_MY_SOL,
        method: 'post',
        // loading:'false',
        data
      });
      if (res.code === 0) {
        this.currentPage++
        this.loading = false;
        this.list = this.list.concat(res.content.date || [])
        // 数据全部加载完成
        if (res.content.date == null || res.content.date.length < 10) {
          this.finished = true;
        }
      } else {
        this.finished = true;
        this.$toast(res.message);
      }
    },

    // 查看详情
    gotoDetail(orderNo, productName,orderType) {
        util.setSessionStorageObj('performanceTab', this.tabActive);
      if(orderType == '2'){
        this.goPage('orderDetail?orderNo=' + orderNo + "&productName=" + productName);
      }else{
        this.goPage('carOrderDetail?orderNo=' +orderNo)
      }
      
    }
  }
};
</script>
<style lang="less">
@import './../../../assets/less/app/life/order/performanceList.less';
.performancePage{
  .search_box{
    background: #eeeeee;
    display: flex;
    padding: 10px 12px 0 12px;
    .van-dropdown-menu{
      height: 48px;
      width: 32%;
    }
    .van-dropdown-menu__bar{
      border-radius: 6px 0 0 6px;
      .van-dropdown-menu__title{
        padding-left: 0;
      }
    }
    .van-search{
      width: 100%;
      border-radius: 0 6px 6px 0;
      padding: 7px 4px;
      height: 48px;
      .name_s{
        background: #0252ff;
        padding: 0px 4px;
        border-radius: 6px;
        color: #fff;
        width: 50px;
        text-align: center;
      }
    }
  }
}

</style>