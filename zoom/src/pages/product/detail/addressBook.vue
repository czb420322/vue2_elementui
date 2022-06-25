<template>
  <div class="insureInputPage afe-area-inset-bottom addressBookPage" :style="{ 'margin-top': ($iosSystem + 60) + 'px' }">
    <div class="headerPage">
      <v-header :title="{ name: title }"></v-header>
    </div>
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="book_list" v-for="(item,index) in bookList" :key="index" @click="selectCustomer(item)">
          <van-image round width="3rem" height="3rem" :src="item.avatar" />
          <p class="book_name">{{item.name}}</p>
          <van-icon v-if="item.radio" name="checked" size="24" color="rgb(7, 193, 96)" />
          <van-icon v-else name="circle" size="24" color="#c8c9cc" />
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import common from '../../../assets/js/util/common';
import util from '../../../assets/js/util/util';
import compCheck from '../../../assets/js/util/comp-check';
import productDetail from '../../../assets/js/util/productDetail';

export default {
  data() {
    return {
      title: this.$route.meta.title,
      loading: false,
      finished: false,
      page: {
        bookPage: 0,
        bookPageSize: 1000,
      },
      bookList: {},
      pageData: {},
      status:1,//1是选择投保人2是被保人3是多被保人
    };
  },
  created() {
    this.status = this.$route.query.status;
    this.pageData = util.getSessionStorageObj('insureInfo');
    if(this.status == '3'){//标记多被保人选择时
      util.setSessionStorageObj('signNumber', 1);
    }
  },
  methods: {
    onLoad: function () {
      // 客户列表分页查询
      this.page.bookPage += 1;
      this.getClientList();
    },
    async getClientList() {
      const params = {
        currentPage: this.page.bookPage,
        pageSize: this.page.bookPageSize,
        queryAppntFlag: this.status == 1 ? 1 : 0 // 1查投保人,0或者空查被保人
      }
      const res = await this.$axios({
        url: this.$API.API_QUERYAPPNTORINSUREDLIST,
        method: 'get',
        loading: 'false',
        params: params
      });
      if (res.code === 0 && res.content.data) {
        this.loading = false
        this.finished = true
        for (let item of res.content.data) {
          item.radio = false;
        }
        this.bookList = res.content.data
      } else {
        this.finished = true
      }
    },
    // 选择客户
    selectCustomer(item) {
      for (let item of this.bookList) {
        item.radio = false;
      }
      item.radio = true;
      this.queryCustomerInfo(item);
    },
    async queryCustomerInfo(item) {
        //点击投保人
        if(this.status == 1){
          this.pageData.appntInfo.data.name = item.name || '';
          this.pageData.appntInfo.data.mobile = item.mobile || '';
          this.pageData.appntInfo.data.idNo = item.idNo || '';
          this.appntInfoEvent( item.idNo || '' );
          this.pageData.appntInfo.data.email = item.email || '';
          this.pageData.appntInfo.data.idType = item.idType || '0';
          util.setSessionStorageObj('insureInfo', this.pageData);
          productDetail.updateSelf();
        }else{
          //被保人
          this.pageData.insuredInfo[0].data.name = item.name || '';
          this.pageData.insuredInfo[0].data.mobile = item.mobile || '';
          this.pageData.insuredInfo[0].data.idNo = item.idNo || '';
          this.appntInfoEvent( item.idNo || '' );
          this.pageData.insuredInfo[0].data.email = item.email || '';
          this.pageData.insuredInfo[0].data.idType = item.idType || '0';
          util.setSessionStorageObj('insureInfo', this.pageData);
        }
        this.onClickLeft();
    },

    // 生日识别
    appntInfoEvent(obj) {
      if (obj != '' && compCheck.isIdno(obj)) {
        let birthDay = compCheck.idNoChangeBirthday(obj);
        let sex = compCheck.idNoChangeSex(obj);
        if(this.status == 1){
          this.pageData.appntInfo.data['birthday'] = birthDay;
          this.pageData.appntInfo.data['sex'] = sex;
        }else{
          this.pageData.insuredInfo[0].data['birthday'] = birthDay;
          this.pageData.insuredInfo[0].data['sex'] = sex;
        }
        
      }
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/less/app/home/insuredInfo.less';
.addressBookPage {
  .van-nav-bar__text {
    color: white;
  }
  .book_list {
    .book_name {
      flex: 1;
    }
    .van-cell__value {
      display: flex;
      align-items: center;
      .book_name {
        margin: auto 0;
        padding-left: 10px;
      }
    }
  }
}
</style>