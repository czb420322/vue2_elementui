<!--  -->
<template>
  <div class="multipleNameInfoPage">
    <div
      class="container"
      v-if="
        (insureInfo.saleCode == 'RBTMOBILE_MALL_RBT0016' &&
          setMealCode == 'RBT0016_B') ||
        (insureInfo.saleCode == 'RBTMOBILE_MALL_RBT0015' &&
          setMealCode == 'RBT0015_C') ||
        insureInfo.saleCode == 'RBTMOBILE_MALL_RBT0013'
      "
    >
      <h1 class="title_bar">
        被保人信息<span v-if="insureNnumberPeople"
          >(支持1-{{ insureNnumberPeople }}人)</span
        >
      </h1>
      <div class="content_info">
        <ol>
          <li class="item" v-for="(item, index) in pageData" :key="index">
            <div class="name_bar">
              <img
                class="del_btn"
                @click="delSalePlan(index)"
                src="./../../../assets/img/base/del_icon.png"
                alt=""
              />
              <span class="name">{{ item.name }}</span>
            </div>
          </li>
        </ol>
        <div class="add_content">
          <van-button
            @click="addRecognizee"
            v-if="addFlog"
            plain
            type="info"
            class="add_btn"
            size="small"
            >新增被保人</van-button
          >
          <div v-else class="add_ok">
            <van-field v-model="insureText" label="被保人姓名" />
            <van-button
              plain
              type="info"
              size="mini"
              class="confirm_btn"
              @click="confirmAdd"
              >确定</van-button
            >
            <van-button
              class="cancel"
              plain
              type="warning"
              size="mini"
              @click="cancelAdd"
              >取消</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../../assets/js/util/util";
import check from "../../../assets/js/util/comp-check";
import { Toast } from "vant";

export default {
  props: {
    setMealCodes: {
      type: String,
      default: "",
    },
  },
  data() {
    //这里存放数据
    return {
      addFlog: true,
      insureText: "",
      saleCode: "",
      insureNnumberPeople: 0,
      pageData: [],
      insureInfoData: {
        insuredDataName: [],
      },
      insureInfo: {},
      setMealCode: "",
    };
  },
  watch: {
    setMealCodes() {
      this.setMealCode = util.getSessionStorageObj("setMealCode");
      // console.log(this.setMealCode,"111112222222222223333333333");
    },
  },
  //方法集合
  methods: {
    // 初始化页面数据
    parentMsg() {
      if (util.getSessionStorageObj("insureInfo")) {
        this.insureInfo = util.getSessionStorageObj("insureInfo");
        this.insureNnumberPeople = this.getInsureNnumberPeople();
      }
      if (util.getSessionStorageObj("insuredDataName")) {
        this.pageData = util.getSessionStorageObj("insuredDataName");
      }
      // if (util.getSessionStorageObj("setMealCode")) {
      //   this.setMealCode = util.getSessionStorageObj("setMealCode");
      // }
    },
    // 添加被保人
    addRecognizee() {
      let pageData = this.pageData;
      if (pageData.length >= this.insureNnumberPeople) {
        return this.$toast("最多投保" + this.insureNnumberPeople + "人");
      }
      this.addFlog = !this.addFlog;
    },
    // 确定按钮
    confirmAdd() {
      // let insuredDataName =
      if (!this.insureText) {
        Toast("请输入姓名");
        return false;
      } else if (
        !/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,20}$/.test(this.insureText)
      ) {
        Toast("名字格式不正确");
        return false;
      } else {
        let insuredDataName = {
          name: this.insureText,
        };
        for (var i = 0; i < this.pageData.length; i++) {
          if (this.pageData == "") {
            this.pageData.push(insuredDataName);
          } else if (this.insureText == this.pageData[i].name) {
            return Toast("名字已存在");
          }
        }
        this.pageData.push(insuredDataName);
        util.setSessionStorageObj("insuredDataName", this.pageData);

        this.addFlog = !this.addFlog;
        this.insureText = "";
      }
    },

    // 取消按钮
    cancelAdd() {
      this.insureText = "";
      this.addFlog = !this.addFlog;
    },
    // 删除被保人
    delSalePlan(index) {
      let insuredData = JSON.parse(JSON.stringify(this.pageData));
      insuredData.splice(index, 1);
      this.pageData = insuredData;
      util.setSessionStorageObj("insuredDataName", this.pageData);
    },
    // 查询被保人数
    getInsureNnumberPeople() {
      let productDetail = util.getSessionStorageObj("productDetail");
      if (productDetail && productDetail.content) {
        let temp = productDetail.content.salePlanInfo.struct.filter(
          (item, index) => {
            return item.code == "insureNum";
          }
        );
        if (temp.length) {
          return temp[0].data[temp[0].data.length - 1].value;
        } else {
          return 1;
        }
      }
    },
    verification(item, obj) {
      check.isName(item, obj);
    },
  },
  created() {
    setTimeout(() => {
      this.parentMsg();
    }, 2000);
  },
  mounted() {},
};
</script>
<style lang="less">
.multipleNameInfoPage {
  margin-top: 14px;
  .container {
    background-color: #fff;
    padding: 10px 16px;
    .title_bar {
      margin: 0;
      font-size: 0.92rem;
      padding: 0.2rem 0;
    }
    .content_info {
      margin: 0.5rem 0;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
      border-radius: 0.1rem;
      ol {
        .item {
          display: flex;
          padding: 10px 16px;
          .name_bar {
            display: flex;
            align-items: center;
            .del_btn {
              display: block;
              width: 1.6rem;
              padding: 0.2rem 0.5rem 0.2rem 0;
            }
            .name {
              font-size: 0.9rem;
            }
          }
        }
      }
      .add_content {
        padding: 10px;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        position: relative;
        .add_btn {
          position: absolute;
          right: 16px;
          top: 50%;
          margin-top: -15px;
        }
        .add_ok {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .van-cell {
            width: 70%;
            padding-left: 0;
            .van-cell__title.van-field__label {
              width: 4.5rem;
            }
          }
        }
      }
    }
  }
}
</style>