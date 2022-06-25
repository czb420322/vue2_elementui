<template>
  <div class="shopInfoPage">
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="close_bar">
        <van-icon name="close" color="white" size="30" @click="show = false" />
      </div>
      <div class="_content">
        <h3 class="title_bar">{{shopInfo.msName}}</h3>
        <p class="row" v-if="shopInfo.showServiceCustomer == '1'"><span class="name">服务客户</span><span>{{shopInfo.serviceCustomer}}</span></p>
        <p class="row" v-if="shopInfo.showWorkingYears == '1'"><span class="name">服务年限</span><span>{{shopInfo.workingYears}}</span></p>
        <p class="row"><span class="name">联系电话</span><span>{{shopInfo.ownerMobile | phoneConceal}}</span></p>
        <p class="row" v-if="shopInfo.showCompany == '1'"><span class="name">所属公司</span><span>{{shopInfo.company}}</span></p>
        <h3 class="title_name" v-if="shopInfo.showSelfIntroduction == '1'">个人介绍</h3>
        <p class="textarea" v-if="shopInfo.showSelfIntroduction == '1'">{{shopInfo.selfIntroduction}}</p>
        <br>
        <a class="btn" :href="'tel:' + shopInfo.ownerMobile">
          <van-icon :name="$CTXBASE + '/img/page/shop/ic_call_w@2x.png'" size="26" />&nbsp;
          拔打电话
        </a>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState({
      shopInfo: state => state.shop.shopInfo
    })
  },
  methods: {
    parentMsg() {
      this.show = true
    }
  }
};
</script>

<style lang="less">
.shopInfoPage {
  .van-popup {
    width: 88%;
    background: rgba(0, 0, 0, 0);
    .close_bar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 18px;
    }
    ._content {
      background-color: white;
      overflow: hidden;
      border-radius: 0.75rem;
      .title_bar {
        text-align: center;
        font-size: 1.1rem;
      }
      .row {
        font-size: 0.82rem;
        display: flex;
        justify-content: space-between;
        margin: 10px 5%;
        .name {
          opacity: 0.6;
        }
      }
      .btn {
        background-color: #fcb564; /* 不支持线性的时候显示 */
        background-image: linear-gradient(to right, #fcb564, #ffce3a);
        height: 2.6rem;
        line-height: 2.6rem;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title_name {
        margin: 1.5rem 5% 0.8rem;
        border-left: 4px solid #1776ff;
        line-height: 1em;
        padding-left: 0.6rem;
      }
      .textarea {
        font-size: 0.82rem;
        margin: 10px 5%;
      }
    }
  }
}
</style>
