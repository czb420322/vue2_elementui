<template>
  <div class="detail">
    <van-nav-bar :title="title" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <div :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <div class="time_box">
        <p v-if="ruleType == '1'"><span class="time">{{time[1]}}月</span> {{time[0]}}</p>
        <p v-else-if="ruleType == '4'"><span class="time">{{time[1]}}月</span> {{time[0]}}</p>
        <p v-else><span class="time">{{time[1] +'/'+ (time[2])}}</span> {{time[0]}}</p>
      </div>
      <div class="points_details">
        <van-cell-group  v-for="(item, index) in detailData">
          <van-cell v-if="ruleType == '1' && item.agentName" :title="item.agentName" :value="item.signDate" :label="'累计保费：'+item.premium"  :key="index" />
          <van-cell v-else-if="ruleType == '1'" :title="item.agentMobile | phoneConceal" :value="item.signDate" :label="'累计保费：'+item.premium"  :key="index" />
          <van-cell v-else :title="item.productName" :value="item.signDate" :label="item.extParamCode"  :key="index" />
        </van-cell-group>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      title:'出单明细',
      pointDataId:'',
      settleDate:'',
      ruleType:'',
      detailData:{},
      time:'',
    };
  },
  computed: {
    ...mapState({
      integralDetailed: state => state.integral.integralDetailed,
    })
  },
  created() {
    this.pointDataId = this.$route.query.pointDataId || '';
    this.settleDate = this.$route.query.settleDate || '';
    this.ruleType = this.$route.query.ruleType || '';
    if(this.ruleType == '1'){
      this.title ='增员明细'
    }else{
      this.title ='出单明细'
    }
    if(this.settleDate){
      var dateTime=new Date(this.settleDate);
      if(this.ruleType == '1' || this.ruleType == '4'){ //减去一个月
        dateTime=dateTime.setMonth(dateTime.getMonth()-1);
      }else{//减去一天
        dateTime=dateTime.setDate(dateTime.getDate()-1);
      }
      dateTime=new Date(dateTime);
      this.time = dateTime.toLocaleDateString().split('/')
    }
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const res = await this.$axios({
        url: this.$API.API_GETPOINTDATABYID,
        method: 'post',
        loading: 'true',
        data:{
          id:this.pointDataId
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        this.detailData = res.content.data.pointDataDetailInfoList || {}
      } else {
         this.$toast(res.content.resultMessage);
      }
    },
  }
};
</script>

<style lang="less">
.detail {
  .van-nav-bar ::after {
    background-color: white !important;
  }
  .van-tabs__line {
    bottom: 20px;
  }
  .van-tabs {
    position: fixed;
    left: 0;
    right: 0;
  }
  .time_box{
    padding-left: 18px;
    height: 40px;
    line-height: 40px;
    p{
      color: #AFAEB8;
      margin: 0;
    }
    .time{
      color: #1BAAFF;
      font-size: 18px;
      margin-right: 6px;
    }
  }
  .points_details {
    background-color: #ffffff;
   
  }
}
</style>
