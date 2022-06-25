<template>
  <div class="leagueTablePage">
    <van-icon name="arrow-left" @click="onClickLeft" size="20" color="white" :style="{ 'top': ($iosSystem + 13) + 'px' }" />
    <div class="_content">
      <div class="league_table">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getPointRankByPage">
          <div class="table_title">
            <img src="../../../public/img/page/integral/table_title.png" alt="">
          </div>
          <table>
            <tr class="title_bar">
              <td>排名</td>
              <td>姓名</td>
              <td v-show="rankType =='1' || rankType =='3'">二级机构</td>
              <td>身份</td>
              <td>积分</td>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>
                <img v-if="index == 0" class="icon" :src="$CTXBASE + '/img/page/integral/TOP1@2x.png'" />
                <img v-else-if="index == 1" class="icon" :src="$CTXBASE + '/img/page/integral/TOP2@2x.png'" />
                <img v-else-if="index == 2" class="icon" :src="$CTXBASE + '/img/page/integral/TOP3@2x.png'" />
                <!-- <span v-if="index == 0" style="color: #F66157" class="bold">TOP1</span>
                <span v-else-if="index == 1" style="color: #F6A357" class="bold">TOP2</span>
                <span v-else-if="index == 2" style="color: #F6C557" class="bold">TOP3</span> -->
                <span v-else style="color: #ECC1AD">{{index + 1}}</span>
              </td>
              <td>
                <span class="name" v-if="item.agentName ">{{item.agentName}}</span>
                <span class="name" v-else>{{item.agentMobile | phoneConceal}}</span>
              </td>
              <td  v-show="rankType =='1' || rankType =='3'"><span>{{item.orgName}}</span></td>
              <td><span>{{item.agentTypeName}}</span></td>
              <td><span>{{item.pointNum}}</span></td>
            </tr>
           
          </table>
        </van-list>
      </div>
    </div>
    <div class="examine_bt" @click="getAll()" v-show="rankType !='3'">查看全部用户积分榜 <van-icon name="arrow" color="#fff" size="12px"/></div>
  </div>
</template>

<script>
import compCheck from './../../assets/js/util/comp-check'
import { mapState } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapState({
      manageVersion: state => state.common.manageVersion,
      leagueTable: state => state.integral.leagueTable,
      userInfo: state => state.my.UserInfo,
    })
  },
  data() {
    return {
      title: this.$route.meta.title,
      list: [],
      currentPage: 1,
      loading: false,
      finished: false,
      rankType:1,
    }
  },
  created() {
      if(this.userInfo.agentType == '1'){//专员传1
        this.rankType = 1
      }else{//非专员传2
        this.rankType = 2
      }
  },
  methods: {
    getAll(){
      this.rankType =3
      this.currentPage =1
      this.list = []
      this.getPointRankByPage()
    },
    async getPointRankByPage() {
       // 获取积分排行榜    
      const res = await this.$axios({
        url: this.$API.API_GETPOINTRANKBYPAGE,
        method: 'post',
        loading: 'false',
        data: {
          currentPage: this.currentPage,
          pageSize: 50,
          rankType:this.rankType,
          endDate: compCheck.getDateByDays(0)
        }
      })
      // this.currentPage++
      this.loading = false
      if (res.code == 0 && res.content.result == 0) {
        this.list = this.list.concat(res.content.data.rankInfoPageGrid.data || [])
        // if (res.content.data.rankInfoPageGrid.page >= res.content.data.rankInfoPageGrid.total) {
          this.finished = true  // 数据全部加载完成
        // }
      } else {
        this.$toast(res.content.resultMessage || '请求失败')
      }
    }
  }
};
</script>

<style lang="less">
.leagueTablePage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f65758;
  background-image: url('../../../public/img/page/integral/bg_TOP_Ranking@2x.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
  .van-icon-arrow-left {
    position: absolute;
    top: 13px;
    left: 16px;
  }
  ._content {
    position: absolute;
    top: 60vw;
    left: 5.8vw;
    right: 5.8vw;
    bottom: 8.8vw;
    background: white;
    opacity: 95;
    border-radius:10px;
    overflow-y: scroll;
    background-color: #ffffff; /* 不支持线性的时候显示 */
    background-image: linear-gradient(
      to bottom,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #fff2e7,
      #ebdcc1
    );
    .league_table {
      border-radius: 0.5rem;
      .table_title{
        text-align: center;
        margin: 0;
        padding-top: 16px;
        padding-bottom: 12px;
        background: #fff;
        position: fixed;
        top: 60vw;
        left: 5.8vw;
        right: 5.8vw;
        border-radius: 10px;
        img{
          width: 32%;
          height: auto;
        }
      }
      .title_bar {
        color: #ecceb9;
        background-image: url('../../../public/img/page/integral/bg_title@2x.png');
        background-size: 100% 99.9%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top center;
      }
      table {
        width: 94%;
        margin: 50px 3% 0 3%;
        tr {
          td {
            padding: 7px 0;
            text-align: center;
            font-size: 0.73rem;
            .name {
              font-weight: bold;
            }
            .icon {
              width: 1.9rem;
            }
          }
          .bold {
            font-weight: bold;
            font-style: italic;
          }
        }
      }
    }
  }
  .examine_bt{
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 2vw;
    right: 5vw;
    font-size: 12px;
    color: #fff;
  }
}
</style>