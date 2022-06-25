<template>
  <div>
    <div>
      <v-header :title="{ name: '对账单' }"></v-header>
      <div class="withdraw" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
        <div class="withdraw_hai" :style="{'background':!withdrawalList.length ?'none' :'#0252ff'}">
        </div>
        <div class="withdraw_box">
          <div class="withdraw_basket" v-if="withdrawalList.length != undefined">
            <van-collapse v-model="activeNames">
              <van-collapse-item :key="index" v-for="(item,index) in withdrawalList" :title="item.applyDate" :value="'￥'+item.monthAfterTaxMoney" :name="index">
                <div :key="indexInside" v-for="(itemInside,indexInside) in item.recordsList">
                  <div>
                    <van-cell-group class="vc_group" :border="false">
                      <van-cell title="提取时间：" :value="timeTransition(itemInside.applyTime)" :border="false" style="padding: 2px 0px;" />
                      <van-cell title="税前金额：" :value="'￥'+itemInside.preTaxMoney" :border="false" style="padding: 2px 0px;" />
                      <van-cell title="缴税金额：" :value="'￥'+itemInside.paidTaxes" :border="false" style="padding: 2px 0px;" />
                      <van-cell title="税后金额：" :value="'￥'+itemInside.afterTaxMoney" :border="false" style="padding: 2px 0px;" />
                      <van-cell title="状态：" :value="'￥'+itemInside.statusZh" style="padding: 2px 0px;" />
                    </van-cell-group>
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </div>

      <my-empty description="查询无数据" v-show="!withdrawalList.length"></my-empty>
    </div>
  </div>
</template>

<script>
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
      condition: false,
      checked: false,
      withdrawalList: {},
      activeNames: []
    };
  },
  created() {
    this.depositList()
  },
  methods: {
    //提现查询列表
    async depositList() {
      this.isLogin = true;
      const res = await this.$axios({
        url: this.$API.API_WITHDRAWAL_RECORDS,
        method: 'get',
        params: {
          'searchType': 'Y'
        }
      });
      if (res.code === 0 && res.content) {
        if (res.content != '') {
          for (let i in res.content.statisticsDTOList) {
            i = i * 1
            this.activeNames.push(i)
          }
          this.withdrawalList = res.content.statisticsDTOList
        }
      }
    },
    alter(res) {
      this.condition = !res
    },
    timeTransition(res) {
      var date = new Date(res);
      return date.toJSON().substr(0, 19).replace('T', ' ');
    }
  }
};
</script>

<style lang="less" scoped>
.withdraw_hai {
  background-color: #0252ff;
  height: 44px;
}
.withdraw_box {
  margin: auto;
  border-radius: 0.25rem;
  position: relative;
  z-index: 2;
  margin-bottom: 1.5rem;
  padding: 0 0.75rem;
  margin-top: -1.5rem;
  .withdraw_basket {
    border-bottom: 1px solid #ebedf0;
    .vc_group {
      border-bottom: 1px solid #ebedf0;
    }
  }
  .withdraw_title {
    font-weight: 700;
    font-size: 14px;
  }
  .withdraw_details {
    font-size: 14px;
    .details_flex {
      display: flex;
      .details_img {
        width: 2rem;
        height: 2rem;
        margin: auto 0;
      }
      .details_bank {
        font-weight: 700;
        margin: 0 0 0 6px;
      }
    }
    .details_money {
      display: flex;
      color: #000;
      font-weight: 700;
      p {
        margin: 0;
      }
      .details_money_name {
        width: 6rem;
      }
    }
  }
  .details_bt {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
    .van-button--small {
      width: 4rem;
    }
  }
  .details_checked {
    font-size: 12px;
    .details_protocol {
      color: #0252ff;
    }
  }
}
</style>
