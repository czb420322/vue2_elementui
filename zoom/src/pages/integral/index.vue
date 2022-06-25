<template>
  <div class="integralPage">
    <header class="_header">
      <van-nav-bar :title="title" left-arrow :border="false" :fixed="false">
        <template #left>
          <van-icon name="arrow-left" color='white' size="20" @click="onClickLeft" />
        </template>
        <template #right>
          <span style="color: white" @click="ruleShow = !ruleShow">规则</span>
        </template>
      </van-nav-bar>
      <div class="exchangeBar">
        <div class="l">
          <div class="integral">
            <img class="icon" :src="$CTXBASE + '/img/page/integral/ic_integral@2x.png'" />
            {{pointNum}}
          </div>
          <span class="txt">1:1兑换i钻</span>
        </div>
        <div class="r" @click='goExchange'>
          <img class="icon" :src="$CTXBASE + '/img/page/integral/ic_treasure@2x.png'" />
          <span class="btn">去兑换</span>
        </div>
      </div>
      <div class="tips" v-show="prePointNum">（预计本月还可以获取：{{prePointNum}}）</div>
    </header>
    <i class="bg" :style="{ 'margin-top': $iosSystem + 'px' }"></i>

    <div class="_content" :style="{ 'padding-top': $iosSystem + 'px' }">
      <img class="banner" :src="$CTXBASE + '/img/page/integral/bg_banner_gift@2x.png'"  @click="goPage('publicity')"/>
      <div class="league_table">
        <div class="title_bar" @click="goPage('leagueTable')">
          积分榜
          <span class="r" style="font-size: .7rem">截止时间：{{endDate}}
            <van-icon name="arrow" size="16" />
          </span>
        </div>
        <table>
          <template v-for="(item, index) in leagueTable">
            <tr :key="index">
              <td>
                <img v-if="index == 0" class="icon" :src="$CTXBASE + '/img/page/integral/TOP1@2x.png'" />
                <img v-else-if="index == 1" class="icon" :src="$CTXBASE + '/img/page/integral/TOP2@2x.png'" />
                <img v-else-if="index == 2" class="icon" :src="$CTXBASE + '/img/page/integral/TOP3@2x.png'" />
              </td>
              <td>
                <span class="name" v-if="item.agentName ">{{item.agentName}}</span>
                <span class="name" v-else>{{item.agentMobile | phoneConceal}}</span>
              </td>
              <td v-show="userInfo.agentType =='1'"><span>{{item.orgName}}</span></td>
              <td><span>{{item.agentTypeName}}</span></td>
              <td><span>{{item.pointNum}}</span></td>
            </tr>
          </template>
        </table>
      </div>
      <div class="points_details">
        <div class="title_bar" @click="goPage('pointsDetails')">
          积分明细
          <span class="r" style="font-size: .7rem">
            <van-icon name="arrow" size="16" />
          </span>
        </div>
        <table>
          <template v-for="(item, index) in integralDetailed">
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
      </div>
      <div class="without" v-show="!integralDetailed.length">没有更多了</div>
    </div>
    <br>
    <div>
      <van-popup v-model="ruleShow" round closeable close-icon-position="top-right">
        <div class="pop-up">
          <img src="../../../public/img/page/integral/rule.jpg"  width="100%"/>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import compCheck from './../../assets/js/util/comp-check';
import { mapState } from 'vuex'
import common from '../../assets/js/util/common';
export default {
  components: {
  },
  computed: {
    ...mapState({
      manageVersion: state => state.common.manageVersion,
      pointNum: state => state.integral.pointNum,
      prePointNum: state => state.integral.prePointNum,
      leagueTable: state => state.integral.leagueTable,
      integralDetailed: state => state.integral.integralDetailed,
      userInfo: state => state.my.UserInfo,
    })
  },
  data() {
    return {
      title: this.$route.meta.title,
      endDate: '',
      ruleShow:false,
    }
  },
  created() {

    // 获取积分排行榜
    var rankType=1;
    if(this.userInfo.agentType == '1'){//专员传1
      rankType = 1
    }else{//非专员传2
      rankType = 2
    }
    this.$store.dispatch('integral/getPointRankByPage', { endDate: this.endDate, currentPage: 1, pageSize: 3, rankType: rankType })

  },
  methods: {
    // 兑换
    goExchange() {
      if (this.userInfo.agentType == '1') {
        this.$toast('您的积分通过工资按月发放!')
        return
      }
      if (!this.pointNum) {
        this.$toast('无可兑换积分！')
        return
      }
      this.$dialog.confirm({
        message: '确定后您当前所有积分将兑换为i钻， 是否继续？',
      }).then(() => {
        this.$store.dispatch('integral/exchangeIntegerPointUser')
      }).catch(() => { })
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
.integralPage {
  ._header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
    background-color: #1776ff; /* 不支持线性的时候显示 */
    background-image: linear-gradient(to right, #1776ff, #17aaff);
    padding-bottom: 0.6rem;
    .van-nav-bar__title {
      color: white;
    }
    .van-nav-bar {
      background-color: rgba(255, 255, 255, 0);
    }
    .van-nav-bar ::after {
      display: none;
    }
    .exchangeBar {
      display: flex;
      justify-content: space-between;
      width: 93%;
      margin: 0.7rem auto;
      .l {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
        .integral {
          background-color: #0e63dc;
          border-radius: 3rem;
          position: relative;
          padding: 0 0.9rem 0 2.4rem;
          height: 2rem;
          line-height: 2rem;
          color: white;
          font-size: 1.06rem;
          .icon {
            position: absolute;
            top: -0.1rem;
            left: 0;
            height: 2rem;
          }
        }
        .txt {
          font-size: 0.7rem;
          margin-left: 0.5rem;
          color: white;
          opacity: 0.6;
        }
      }
      .r {
        position: relative;
        .icon {
          height: 2.4rem;
        }
        .btn {
          position: absolute;
          left: 0;
          left: 50%;
          bottom: -0.7em;
          margin-left: -2em;
          width: 4em;
          color: #fffaa8;
          background-color: #1780ff;
          border: 1px solid #c5e8ff;
          border-radius: 3rem;
          text-align: center;
          font-size: 0.7rem;
        }
      }
    }
    .tips {
      font-size: 0.7rem;
      opacity: 0.6;
      color: white;
      margin-left: 3.5%;
    }
  }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    height: 10rem;
    background-color: #1776ff; /* 不支持线性的时候显示 */
    background-image: linear-gradient(to right, #1776ff, #17aaff);
  }
  ._content {
    margin: 8.5rem 3.5% 1rem;
    .banner {
      width: 100%;
      display: block;
    }
    .league_table {
      background-color: #ffffff; /* 不支持线性的时候显示 */
      background-image: linear-gradient(to bottom, #fbeed4, #ffffff);
      border-radius: 0.5rem;
      overflow: hidden;
      margin-top: 10px;
      .title_bar {
        color: white;
        background-color: #1776ff; /* 不支持线性的时候显示 */
        background-image: linear-gradient(to right, #62c5ff, #17a8ff);
        display: flex;
        justify-content: space-between;
        padding: 0.7rem 0.4rem 0.7rem 0.8rem;
        .r {
          display: flex;
          align-items: center;
          opacity: 0.6;
        }
      }
      table {
        width: 94%;
        margin: 0 3%;
        tr {
          border-bottom: 1px solid #f3e4c1;
          td {
            padding: 0.7rem 0;
            text-align: center;
            font-size: 0.76rem;
            .name {
              font-weight: bold;
            }
            .icon {
              width: 1.9rem;
            }
          }
        }
        tr:last-child {
          border-bottom: none;
        }
      }
    }
    .points_details {
      background-color: #ffffff;
      border-radius: 0.5rem;
      overflow: hidden;
      margin-top: 10px;
      .title_bar {
        color: white;
        background-color: #1776ff; /* 不支持线性的时候显示 */
        background-image: linear-gradient(to right, #62c5ff, #17a8ff);
        display: flex;
        justify-content: space-between;
        padding: 0.7rem 0.4rem 0.7rem 0.8rem;
        .r {
          display: flex;
          align-items: center;
          opacity: 0.6;
        }
      }
      table {
        width: 94%;
        margin: 0 3%;
        tr {
          border-bottom: 1px solid #e5e5e5;
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
  .pop-up{
    display: block;
    width: 80vw;
    height: 90vw;
    overflow-x: scroll;
    img{
      height: auto;
    }
  }
}
</style>