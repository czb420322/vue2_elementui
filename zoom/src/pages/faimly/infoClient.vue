<template>
  <div class="info-conent">
    <searchClient ref="searchClient" height="auto" :showInput="false"></searchClient>
    <div style="margin-top: 1.875rem; background: #ffffff; position: relative;">
      <div class="avatorInfo">
        <van-image width="70" height="70" :src="objDataDisabled.avatar ? objDataDisabled.avatar : $CTXBASE + '/img/page/faimly/bt_photo@2x.png'" class="mgr16" />
        <div class="nameInfo">
          <span>{{ objDataDisabled.customerName }}</span>
          <span>
            <van-image width="12" height="12" :src="objDataDisabled.sex ? imgSrc1 : imgSrc0" />
          </span>
          <span>{{ objDataDisabled.age }}岁</span>
        </div>
      </div>
      <div style="padding-top: 60px;">
        <van-cell title="姓名" :value="customerName" />
        <van-cell title="性别" :value="parseSex(objDataDisabled.sex)" />
        <van-cell title="年龄" :value="objDataDisabled.age" />
        <van-cell title="电话" :value="objDataDisabled.phone" />
        <van-cell title="邮箱" :value="objDataDisabled.email || ''" />
        <van-cell title="证件类型" value="身份证" />
        <van-cell title="身份证" :value="objDataDisabled.cardNo || ''" />
        <van-cell title="备注" :value="objDataDisabled.remark || ''" />
      </div>
      <template v-if="objDataDisabled.labelJson && objDataDisabled.labelJson.length">
        <van-cell v-for="(item, index) in objDataDisabled.labelJson" :key="index" :title="item.name" :value="item.value" />
      </template>
    </div>

    <!-- 投保信息 -->
    <div class="captions">
      <p>
        投保信息 <span>(累计单数:{{ insuranceCount }})</span>
      </p>
    </div>
    <van-list class="insuranceInfo" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getPointRankByPage">
      <table>
        <thead>
          <tr class="title_bar">
            <th>
              <div class="tableTH">产品名称</div>
            </th>
            <th>
              <div class="tableTH">签单日期</div>
            </th>
            <th>
              <div class="tableTH">续保日期</div>
            </th>
            <th>
              <div class="tableTH">投保金额</div>
            </th>
            <th>
              <div class="tableTH">被保<br>险人</div>
            </th>
            <th>
              <div class="tableTH">投保<br>关系</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>
              <span style="width: 6em;word-break: break-all;display: block;margin: auto;">{{ item.productName }}</span>
            </td>
            <td>
              <span>{{ item.signDate }}</span>
            </td>
            <td>
              <span>{{ item.endDate }}</span>
            </td>
            <td>
              <span>￥{{ item.premium }}</span>
            </td>
            <td>
              <span>{{ item.insuredName }}</span>
            </td>
            <td>
              <span>{{ item.relationToAppnt == '00' ? '本人' : 
                         item.relationToAppnt == '01' ? '儿子' : 
                         item.relationToAppnt == '02' ? '女儿' : 
                         item.relationToAppnt == '03' ? '妻子' : 
                         item.relationToAppnt == '04' ? '丈夫' : 
                         item.relationToAppnt == '05' ? '配偶' : 
                         item.relationToAppnt == '06' ? '子女' : 
                         item.relationToAppnt == '07' ? '父母' : 
                         item.relationToAppnt == '08' ? '孙子女' : 
                         item.relationToAppnt == '09' ? '外孙子女' : 
                         item.relationToAppnt == '10' ? '祖父母' : 
                         item.relationToAppnt == '11' ? '外袓父母' : 
                         item.relationToAppnt == '12' ? '其它' : 
                         ''}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </van-list>
    <!-- 标的信息 -->
    <div></div>
    <div class="captions">
      <p>
        标的信息 <span>(累计单数:{{ insuranceCount2 }})</span>
      </p>
    </div>
    <van-list class="insuranceInfo" v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="getPointPage">
      <table>
        <thead>
          <tr class="title_bar">
            <th>
              <div class="tableTH">产品</div>
            </th>
            <th>
              <div class="tableTH">类型</div>
            </th>
            <th>
              <div class="tableTH">出厂日期</div>
            </th>
            <th>
              <div class="tableTH">识别码</div>
            </th>
            <th>
              <div class="tableTH">总投保保费</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list2" :key="index">
            <td>
              <span>{{ item.productName }}</span>
            </td>
            <td>
              <span>{{ item.typeName }}</span>
            </td>
            <td>
              <span>{{ item.birthDate }}</span>
            </td>
            <td>
              <span style="width: 6em;word-break: break-all;display: block;margin: auto;">{{ item.codeName }}</span>
            </td>
            <td>
              <span>￥{{ item.premium }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </van-list>

  </div>
</template>
<script>
import searchClient from "./components/searchClient.vue";
import selectPicker from "./../../templates/selectPicker.vue";
import compCheck from "../../assets/js/util/comp-check"; //isMobile
import { Dialog } from "vant";
export default {
  name: "infoClient",
  components: {
    searchClient,
    selectPicker,
  },
  data() {
    return {
      show: false,
      sexObj: {
        value: {
          text: "",
          value: "",
        },
        data: [
          {
            text: "男",
            value: 0,
          },
          {
            text: "女",
            value: 1,
          },
        ],
      },
      ageObj: {
        value: {
          text: "",
          value: "",
        },
      },
      objDataDisabled: {}, //紧展示的objData
      customerName: "",
      phone: "",
      email: "",
      cardNo: "",
      remark: "",
      imgSrc0: require("../../../public/img/page/faimly/man.png"),
      imgSrc1: require("../../../public/img/page/faimly/woman.png"),
      isShowEdit: false,
      //投保信息
      currentPage: 1,
      loading: false,
      finished: false,
      insuranceCount: "", //投保累计单数
      list: [],
      //标的信息
      currentPage2: 1,
      loading2: false,
      finished2: false,
      insuranceCount2: "", //投保累计单数
      list2: [],
    };
  },
  created() {
    console.log('this.$route.params.id', this.$route.params.id);

    this.getClientInfo();
  },
  mounted() {
    let data = [];
    for (let i = 1; i <= 99; i++) {
      data.push({
        text: i,
        value: i,
      });
    }
    this.ageObj.data = data;
  },
  methods: {
    parseSex(data) {
      if (typeof data == "number") return data ? "女" : "男";
      return data;
    },
    // 获取家庭投保信息
    async getPointRankByPage() {
      const res = await this.$axios({
        url: this.$API.API_MY_CUSTOMERID,
        method: "post",
        loading: "false",
        data: {
          currentPage: this.currentPage,
          pageSize: 10,
          customerId: this.$route.params.id,
          // customerId: 30635,
        },
      });
      this.loading = false;
      if (res.code == 0 && res.content.result == 0) {
        this.insuranceCount =
          res.content.date.customerInsureListPageGrid.records;
        this.list = this.list.concat(
          res.content.date.customerInsureListPageGrid.data || []
        );
        if (this.list.length >= this.insuranceCount) {
          this.finished = true; // 数据全部加载完成
        }
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
        this.finished = true; // 数据全部加载完成
      }
      this.currentPage++;
    },
    // 获取家庭标的信息
    async getPointPage() {
      const res = await this.$axios({
        url: this.$API.API_MY_TARGET_CUSTOMERID,
        method: "post",
        loading: "false",
        data: {
          currentPage: this.currentPage2,
          pageSize: 10,
          customerId: this.$route.params.id,
          // customerId: 30635,
        },
      });
      this.loading2 = false;
      if (res.code == 0 && res.content.result == 0) {
        this.insuranceCount2 = res.content.date.orderTargetListPageGrid.records;
        this.list2 = this.list2.concat(
          res.content.date.orderTargetListPageGrid.data || []
        );
        if (this.list2.length >= this.insuranceCount2) {
          this.finished2 = true; // 数据全部加载完成
        }
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
        this.finished2 = true; // 数据全部加载完成
      }
      this.currentPage2++;
    },
    //获取客户信息
    async getClientInfo() {
      const res = await this.$axios({
        url: this.$API.API_MY_CLIENT_INFO,
        method: "post",
        data: {
          id: this.$route.params.id,
        },
      });
      if (res.code === 0 && res.content.result == "0") {
        let copyData = JSON.parse(JSON.stringify(res.content.data));
        if (res.content.data.labelJson) {
          copyData.labelJson = eval('(' + res.content.data.labelJson + ')');
        } else {
          copyData.labelJson = []
        }
        const { customerName, phone, email, cardNo, remark } = copyData;
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
        this.cardNo = cardNo;
        this.remark = remark;
        this.objDataDisabled = copyData
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.info-conent {
  position: relative;
  //表单编辑
  .editForm {
    /deep/.star .van-cell__title.van-field__label span::after {
      content: '*';
      color: red !important;
      display: inline-block;
      margin-left: 0.2rem;
      transform: translateY(20%);
    }
  }
  .avatorInfo {
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    top: -1.25rem;
    width: 92%;
    margin-left: 4%;
    height: 70px;
    background: transparent !important;
    .mgr16 {
      margin-right: 1rem;
    }
    .nameInfo {
      margin-top: 1rem;
      span {
        margin-right: 0.6rem;
      }
    }
  }
  .addLabel {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: -1.25rem;
    width: 92%;
    margin-left: 4%;
    height: 70px;
    background: transparent !important;
    .mgr16 {
      margin-right: 1rem;
    }
    .nameInfo {
      margin-top: 1rem;
      font-size: 0.75rem;
      display: flex;
      justify-content: center;
      color: #4c64fe;
      .addIcon {
        display: inline-block;
        margin-right: 0.5rem;
      }
    }
  }
  .van-button--block {
    width: 48%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  &-onlyShow {
    width: 92%;
    min-height: 44.5px;
    margin-left: 4%;
    text-align: justify;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    span {
      width: 50%;
      height: 100%;
      display: inline-block;
      line-height: 2.47rem;
    }

    .span2 {
      display: inline-block;
      text-align: right;
    }
  }
  // 投保信息
  .captions {
    padding-left: 3%;
    text-align: left;
    p {
      font-size: 0.95rem;
      color: #333333;
      span {
        font-size: 0.7rem;
        color: #999999;
        font-weight: 400;
      }
    }
  }

  /deep/.insuranceInfo.van-list {
    background: #ffff;
    thead {
      width: 100%;
    }
    .title_bar {
      color: #3171bf;
      border-bottom: 1px solid #dcdcdc;
      th {
        padding: 0.5rem 0;
        .tableTH {
          // width: 2.13rem;
          // padding-left: 0.4rem;
          font-size: 0.7rem;
          white-space: wrap;
        }
        .tableThBig {
          width: 2.8rem;
        }
      }
    }
    table {
      width: 96%;
      margin: 0 2%;
      background: #ffff;

      tr {
        td {
          padding: 0.7rem 4px;
          text-align: center;
          font-size: 0.73rem;
          border-bottom: 1px solid #dcdcdc;

          .nameOther {
            word-break: break-all;
            text-align: center;
          }
          .name {
            font-weight: bold;
          }
          .icon {
            width: 1.9rem;
          }
          span {
            text-align: center;
            display: block;
            min-width: 2em;
          }
        }
        .bold {
          font-weight: bold;
          font-style: italic;
        }
      }
    }
  }
  /deep/.bottomPopup.van-popup {
    background: #f0f1f4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .topAddLabel {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2.7rem;

      .addIcon {
        position: absolute;
        right: 0.75rem;
      }
    }
    .addItem-content {
      overflow: scroll;
      flex: 1;
      .addItem {
        width: 92%;
        margin-left: 4%;
        background: #ffff;
        margin-bottom: 1.25rem;
        .deletAddLablel {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          span {
            height: 100%;
            display: inline-block;
            line-height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .footerPopup {
      flex-shrink: 0;
      width: 100%;
      height: 2.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      &-left {
        flex: 2;
        span {
          color: #3989ec;
          font-weight: 600;
          font-size: 1rem;
          padding-left: 1rem;
        }
      }
      &-right {
        flex: 3;
        display: flex;
        justify-content: flex-end;
        button {
          width: 70px;
          height: 32px;
          border-radius: 1rem;
          border: none;
        }
        .cancel {
          background: #f0f1f4;
          color: #999999;
        }
        .confirms {
          background: #3989ec;
          color: #ffffff;
          margin: 0 1.25rem 3%;
        }
      }
    }
  }
  /deep/.van-cell__value {
    color: #323233;
  }
}
</style>