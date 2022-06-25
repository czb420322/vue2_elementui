<template>
  <div class="issueDetail" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <van-nav-bar :title="title" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
      <div class="Detail_box">
        <div class="time_box">
          <p v-if="ruleType == '1'"><span class="time">{{time[1]}}月</span> {{time[0]}}</p>
          <p v-else-if="ruleType == '4'"><span class="time">{{time[1]}}月</span> {{time[0]}}</p>
          <p v-else><span class="time">{{time[1] +'/'+ (time[2])}}</span> {{time[0]}}</p>
        </div>
        <div class="Detail_list" :style="{ 'top': ($iosSystem + 86) + 'px' }">
          <template v-for="(element, i) in detailData">
            <van-collapse v-model="activeNames">
              <van-collapse-item class="Detail_item" :title="'订单号:'+element.orderNo" :name="i" :value="element.signDate">
                <div v-for="(item, index) in element.pointDataDetailInfoList">
                  <div class="Detail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">产品名称</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.productName}}</div>
                  </div>
                  <div class="Detail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">保单号</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.extParamCode}}</div>
                  </div>
                  <div class="Detail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">保费</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.premium || 0}}元</div>
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: '出单明细',
      pointDataId: '',
      settleDate: '',
      ruleType: '',
      detailData:[],
      time: '',
      activeNames: ['0'],
    }
  },
  computed: {
    ...mapState({
      UserInfo: state => state.my.UserInfo
    })
  },
  created() {
    this.pointDataId = this.$route.query.pointDataId || '';
    this.settleDate = this.$route.query.settleDate || '';
    this.ruleType = this.$route.query.ruleType || '';
    if (this.ruleType == '1') {
      this.title = '增员明细'
    } else {
      this.title = '出单明细'
    }
    if (this.settleDate) {
      var dateTime = new Date(this.settleDate);
      if (this.ruleType == '1' || this.ruleType == '4') { //减去一个月
        dateTime = dateTime.setMonth(dateTime.getMonth() - 1);
      } else {//减去一天
        dateTime = dateTime.setDate(dateTime.getDate() - 1);
      }
      dateTime = new Date(dateTime);
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
        data: {
          id: this.pointDataId
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        this.detailData = res.content.data.orderNoDatailInfoList || []
      } else {
        this.$toast(res.content.resultMessage);
      }
    },

  }
}
</script>
<style lang="less">
.issueDetail {
  .van-nav-bar ::after {
    background-color: white !important;
  }
  .van-nav-bar_right_title {
    color: #fff;
  }
  .van-collapse-item--border::after {
    border-top: 0;
  }
  .carOrderDetail_list_grid_txt {
    text-align: right;
  }
  .time_box {
    padding-left: 18px;
    height: 40px;
    line-height: 40px;
    p {
      color: #afaeb8;
      margin: 0;
    }
    .time {
      color: #1baaff;
      font-size: 18px;
      margin-right: 6px;
    }
  }
  .mb12 {
    margin-bottom: 12px !important;
  }

  .mt12 {
    margin-top: 12px !important;
  }

  .Detail_list {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .Detail_item {
      border: solid 4px #fff;
      // margin: 0 12px;
      background: #fff;
      margin-bottom: 1px;
      .van-cell__title {
        flex: 4;
      }
    }

    .Detail_item .van-cell {
      font-weight: bold;
    }

    .Detail_list_grid {
      display: flex;
      justify-content: space-between;

      .carOrderDetail_list_grid_name {
        color: #a7bacc;
        width: 120px;
      }

      .carOrderDetail_list_grid_txt {
        color: #323233;
      }
      .carOrderDetail_list_grid_txt_value {
        color: #323233;
      }
    }

    .datum_box {
      .detaiUser {
        padding-bottom: 10px;

        .detaiUser_name {
          margin-right: 6px;
        }
      }
    }

    .detailCheck {
      margin: 0 12px;
      font-size: 0.75rem;

      .detailCheck_span {
        color: #0894ec;
      }
    }
  }
}
</style>
