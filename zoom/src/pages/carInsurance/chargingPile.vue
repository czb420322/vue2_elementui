<template>
  <div class="chargingPilePage">
    <van-nav-bar title="信息" left-arrow @click-left="onClickLeft" />
    <div class="_content">
      <ol class="list_box">
        <li class="list" v-for="(item, key) in chargingPostDataList" :key="key">
          <div class="btn_box">
            <div class="title_box">
              <h3>充电桩信息</h3>
            </div>
            <div class="operate_box">
              <span
                class="btn"
                @click="
                  goPage(`chargingPileEdit?kindCode=${kindCode}&key=${key}`)
                "
              >
                <van-icon name="edit" size="18" color="#1989fa" />&nbsp;编辑
              </span>
              <span class="btn" name="delete-o" @click="onDelete(key)">
                <van-icon name="delete-o" size="18" color="#ee0a24" />&nbsp;删除
              </span>
            </div>
          </div>
          <van-divider />
          <div class="details_box">
            <p class="row">
              <span>保额（每个充电桩）</span>{{ item.amout[kindCode].value }}元
            </p>
            <van-divider />
            <p class="row">
              <span>充电桩型号</span>{{ item.chargingposttype }}
            </p>
            <van-divider />
            <p class="row">
              <span>充电桩编码</span>{{ item.chargingpostcode }}
            </p>
            <van-divider />
            <p class="row">
              <span>充电桩地址</span>{{ item.chargingpostaddress }}
            </p>
            <van-divider />
            <p class="row">
              <span>充电桩安装地点类型</span
              >{{ item.chargingpostaddresstype.text }}
            </p>
            <van-divider />
            <p class="row">
              <span>充电桩种类</span>{{ item.chargingpostkind.text }}
            </p>
            <van-divider />
            <p class="row">
              <span>充电桩使用年限</span>{{ item.chargingpostyearlimit.text }}
            </p>
          </div>
        </li>
      </ol>
      <p
        class="addBtn"
        @click="goPage(`chargingPileEdit?kindCode=${kindCode}`)"
      >
        <van-button icon="plus" type="info" plain block>
          添加充电桩信息</van-button
        >
      </p>
      <my-empty
        description="查询无数据"
        v-if="!chargingPostDataList.length"
      ></my-empty>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      kindCode: this.$route.query.kindCode || 0,
      title: this.$route.meta.title,
      imgUrl: "",
      quotedPrice: {},
    };
  },
  computed: {
    ...mapState({
      chargingPostDataList: (state) => state.car.chargingPostDataList,
    }),
  },
  created() {
    console.log(this.chargingPostDataList,'12312312');
  },
  methods: {
    onDelete(key) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确定删除？",
        })
        .then(() => {
          this.$store.commit("car/updateChargingPostDataList", {
            chargingPostData: this.chargingPostData,
            key: key,
            onDelete: true,
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less">
@import "../../assets/less/app/carInsurance/carBaseInfo.less";
.addBtn {
  width: 80%;
  margin-left: 10%;
  margin-top: 4rem;
}
.list_box {
  .list {
    margin: 3%;
    width: 94%;
    background: white;
    border-radius: 5px;
    padding-bottom: 1px;
    .btn_box {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px 0;
      .title_box {
        h3 {
          margin: 0;
        }
      }
      .operate_box {
        line-height: 26px;
      }
    }
    .details_box {
      .row {
        display: flex;
        justify-content: space-between;
        margin: 0.6rem;
        font-size: 0.78rem;
      }
    }
  }
}
</style>