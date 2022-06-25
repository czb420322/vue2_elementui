<template>
  <div class="claimDetail afe-area-inset-bottom">
     <van-nav-bar class="claimDetail_nav" title="理赔进度查询" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#ffffff" size="20" @click="onClickLeft" /> 
        </template>
        <template #right>
          <van-icon :name="img"  size="18" @click="share()"/>
        </template>
      </van-nav-bar>
    <div :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
      <van-cell-group>
        <van-cell title="保单号" :value="list.policyNo"/>
        <van-cell title="产品名称" :value="list.productName" />
        <!-- <van-cell title="保障日期" :value="list.insOrder.orderAmount" /> -->
        <van-cell title="车牌号" :value="list.licenseNo" v-if="list.licenseNo" />
        <!-- <van-cell title="车架号" :value="list.startDate | transformTimestamp() " /> -->
        <!-- <van-cell title="发动机号" :value="list.insOrder.productName" /> -->
        <van-cell title="被保险人" :value="list.insuredName" />
        <van-cell title="报案时间" :value="list.reportTime" />
      </van-cell-group>
      <div v-for="(item,index) in pageData" :key="index">
        <van-cell-group>
          <van-cell title="节点名称" :value="item.nodeName"/>
          <van-cell title="节点状态" :value="item.state == '1' ? '已处理' : '待处理'" />
          <van-cell title="是否有效" :value="item.valid == '1' ? '是' : '否' " />
          <van-cell title="处理人员" :value="item.handlerName" />
          <van-cell title="流入时间" :value="item.inDate" />
          <van-cell title="流出时间" :value="item.outDate" />
        </van-cell-group>
      </div>
      <my-empty description="查询无数据" v-show="!pageData.length"></my-empty>
    
    </div>
  </div>
</template>

<script>
import config from './../../config.js';
import app from '../../assets/js/util/app';
import img from '../../../public/img/account/fenxiang_bai.png';
export default {
  data() {
    return {
      img:img,
      pageData:[],
      reportNo:'',
      list:''
    };
  },

  created() {
    this.reportNo = this.$route.query.reportNo || ''
    if(this.reportNo){
      this.queryOrderDetail();
    }

  },

  methods: {
    //分享
    share(){
      if(!this.reportNo){
         this.$toast('获取分享资料失败');
        return;
      }
      var address = config.config.http_base + config.config.ctx_base + '/#wxClaimDetail?reportNo=' +this.reportNo
      let local = `${address}`;
      let getShareUrl = this.$WxUrlAuthorize(local);
      app.goShare({
        shareTitle: '点击查看理赔进度',
        shareText: '',
        shareImgUrl:config.config.http_base + config.config.ctx_base + '/img/page/base/feiXiangioc.png',
        shareUrl: getShareUrl
      });
     
    },
    async queryOrderDetail() {
      const res = await this.$axios({
        url: this.$API.API_GETCASESTATUS,
        method: 'post',
        data: {
          'reportNo': this.reportNo
        }
      });
      if (res.code === 0 && res.content.result == "0") {
        this.list = res.content.getReportInfoDTO || ''
        this.pageData = res.content.data || [];
        
      } else {
        this.$toast(res.content.resultMessage || res.message);
      }
    },
   
  }
};
</script>

<style lang="less">
@import './../../assets/less/app/compensate/claimDetail.less';
.claimDetail{
  .claimDetail_nav{
        background: #0252ff;
        .van-nav-bar__title{
          color: #ffffff;
        }
  }

}

</style>