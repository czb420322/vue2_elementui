<template>
  <div class="pointsDetailsPage">
    <van-nav-bar :title="title" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
      </template>
       <template #right>
        <a href="javascript:void(0)" class="btn" @click="showLntegralPopup">
          <van-icon name="filter-o" color="#000" size="18" />筛选
        </a>
      </template>
    </van-nav-bar>
    <div class="top_board" :style="{ 'top': ($iosSystem + 47) + 'px' }">
      <div class="top_month">{{Month}}月</div>
      <div class="top_earnings">
        <p>
          <span>支出：</span>
          <span>{{expend}}</span>
        </p>
        <p>
          <span>收入：</span>
          <span> {{income}}</span>
        </p>
      </div>
    </div>
    <div :style="{ 'margin-top': ($iosSystem + 120) + 'px' }">
      
      <div class="points_details">
        <van-list v-model="loading" :finished="finished" @load="getPointIncomeByPage()">
          <table>
            <template v-for="(item, index) in list">
              <tr :key="index" @click="skipDetails(item)">
                <td>
                  <p class="name" v-if="item.incomeType == '1' && item.ruleType == '1'">激活代理人</p>
                  <p class="name" v-else-if="item.incomeType == '1' && item.ruleType == '2'">出单</p>
                  <p class="name" v-else-if="item.incomeType == '1' && item.ruleType == '3'">搭售</p>
                  <p class="name" v-else-if="item.incomeType == '1' && item.ruleType == '4'">续保</p>
                  <p class="name" v-else-if="item.incomeType == '1' && item.ruleType == '5'">短促</p>
                  <p class="name" v-else>{{item.sourceName}}</p>
                  <p class="time">{{item.settleDate}}</p>
                </td>
                <td class="num">
                  <span style="color: #FF8B2B" v-if="item.incomeType == '1'"> +{{item.pointNum}}</span>
                  <span style="color: #1CAAFF" v-else>-{{item.pointNum}}</span>
                </td>
                <td  class="arrow" v-show="item.incomeType != 2">
                  <van-icon name="arrow" color="#C6C6C6" size="14px"/>
                </td>
              </tr>
            </template>
          
          </table>
        </van-list>
      </div>
      <integralPopup ref="integralPopup" @click="npdLntegralPopup"></integralPopup>
      <div class="without" v-show="!list.length">没有更多了</div>
      <my-empty description="查询无数据" v-show="!list.length"></my-empty>
    </div>
  </div>
</template>

<script>
import integralPopup from '@/templates/integralPopup.vue';
import common from '../../assets/js/util/common';
export default {
  components: {
    integralPopup
  },
  data() {
    return {
      title: this.$route.meta.title,
      list:[],
      currentPage: 1,
      loading: false,
      finished: false,
      ruleType:'1,2,3,4,5',
      incomeType:'1,2',
      settleDate:common.getNowFormatDate(),
      Month:'',
      income:0,//月总收入
      expend:0,//月支出收入
    };
  },
  created() {
  },
  methods: {
    async getPointIncomeByPage() {
      // 获取积分明细
      const res = await this.$axios({
        url: this.$API.API_GETPOINTINCOMEBYPAGE,
        method: 'post',
        loading: 'false',
        data: {
          currentPage: this.currentPage,
          pageSize: 10,
          incomeType: this.incomeType,
          ruleType:this.ruleType,
          settleDate:this.settleDate
        }
      })
      this.currentPage++
      this.loading = false
      if (res.code == 0 && res.content.result == 0) {
        this.list = this.list.concat(res.content.data.incomeInfoPageGrid.data || [])
        if(this.list[0]){
          let dateTime=new Date(this.list[0].settleDate);
          this.Month = dateTime.getMonth()+1
          this.income =this.list[0].income || 0
          this.expend =this.list[0].expend || 0
        }else{
          this.Month = 0
          this.income =0
          this.expend =0
        }
        
        if (res.content.data.incomeInfoPageGrid.page >= res.content.data.incomeInfoPageGrid.total) {
          this.finished = true  // 数据全部加载完成
        }
        if(!res.content.data.incomeInfoPageGrid.data){
           this.finished = true
        }
      } else {
        this.finished = true
        this.$toast(res.content.resultMessage || '请求失败')
      }
    },
    showLntegralPopup() {
      this.$refs.integralPopup.parentMsg();
    },
    npdLntegralPopup(ruleType,incomeType,settleDate){
      this.ruleType = ruleType
      this.incomeType = incomeType
      if(settleDate){
        this.settleDate = settleDate
      }else{
        this.settleDate = common.getNowFormatDate() //月份重新如果没有选就默认当月
      }
      this.finished = false
      this.loading = true;
      this.list = []
      this.currentPage =1
      this.getPointIncomeByPage()
    },
    skipDetails(item){
      if(item.incomeType != 2){
        if(item.ruleType == '1'){
          this.goPage('detail?settleDate='+item.settleDate+'&pointDataId='+item.pointDataId+'&ruleType='+item.ruleType)
        }else{
          this.goPage('issueDetail?settleDate='+item.settleDate+'&pointDataId='+item.pointDataId+'&ruleType='+item.ruleType)
        }
      }
    }
  }
};
</script>

<style lang="less">
.pointsDetailsPage {
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
    z-index: 2;
  }
  .btn{
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    color: #000;
  }
  .top_board{
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    padding: 10px 18px;
    z-index: 1;
    .top_month{
      font-size: 16px;
      font-weight: 700;
    }
    .top_earnings{
      display: flex;
      justify-content: space-between;
      p{
        margin: 0;
      }
    }
  }
  .points_details {
    background-color: #ffffff;
    table {
      width: 94%;
      margin: 0 3%;
      tr {
        border-bottom: 1px solid #f2f2f2;
        td {
          padding: 0.7rem 0.5rem;
          p {
            margin: 0;
          }
          .name {
            font-size: 0.78rem;
            font-weight: bold;
          }
          .time {
            opacity: 0.4;
            font-size: 0.7rem;
          }
        }
        td.num {
          text-align: right;
          font-size: 0.95rem;
        }
        td.arrow {
          text-align: center;
          font-size: 0.95rem;
          padding: 0.7rem 0;
        }
      }
      tr:last-child {
        border-bottom: none;
      }
    }
  }
  .without{
    color: #969799;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
