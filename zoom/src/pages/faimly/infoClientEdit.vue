<template>
  <div class="info-conent">
    <searchClient ref="searchClient" height="auto" :showInput="false" @showEdit="showEdit"></searchClient>

    <div class="editForm">
      <div class="addLabel">
        <van-image width="70" height="70" :src="objData.avatar" class="mgr16" />
        <div class="nameInfo" @click="addLabel">
          <van-icon name="plus" class="addIcon" size="18px" color="#4C64FE" />添加自定义标签
        </div>
      </div>
      <van-form @submit="onSubmit" :show-error-message="false">
        <van-field class="star" v-model="customerName" @input="inputChange($event, 'customerName')" name="customerName" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写用户名' }]" input-align="right" />
        <van-field :value="parseSex(objData.sex)" @click="showSelectPicker(sexObj, 'sex')" name="sex" readonly label="性别" placeholder="请选择性别" input-align="right" right-icon="arrow" />
        <van-field :value="objData.age" @click="showSelectPicker(ageObj, 'age')" readonly name="age" label="年龄" placeholder="请选择年龄" input-align="right" right-icon="arrow" />
        <van-field class="star" v-model="phone" @blur="phoneGetAjax" maxlength='11' name="phone" label="电话" placeholder="电话" :rules="[{ required: true, message: '请填写电话' }]" input-align="right" />
        <van-field v-model="email" name="email" label="邮箱" placeholder="邮箱" input-align="right" />
        <van-field value="身份证" name="cardNo" label="证件类型" placeholder="身份证" input-align="right" readonly />
        <van-field v-model="cardNo" name="cardNo" label="身份证" maxlength='18' placeholder="请输入身份证号码" :rules="[{ required: true, message: '请输入身份证号码' }]" input-align="right" />
        <van-field v-model="remark" name="remark" label="备注" placeholder="备注" input-align="right" />
        <template v-if="objData.labelJson && objData.labelJson.length">
          <van-field v-for="(item, index) in objData.labelJson" :key="item.id" v-model="objData.labelJson[index].value" :name="'labelJson-' + objData.labelJson[index]['name']" :label="objData.labelJson[index]['name']" placeholder="自定义内容" input-align="right" />
        </template>
        <div style="padding: 22px;background: #eeeeee">
          <van-button round block type="info" native-type="submit">保存</van-button>
        </div>
      </van-form>
    </div>

    <!-- 选择 -->
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
    <van-popup v-model="show" class="bottomPopup" position="bottom" :style="{ height: '70%' }">
      <div class="topAddLabel">
        添加自定义标签
        <van-icon name="plus" class="addIcon" size="18px" color="#4C64FE" @click="addDataList" />
      </div>
      <div class="addItem-content">
        <div class="addItem" v-for="(item, index) in labelJson" :key="item.id">
          <van-field v-model="item.name" :label="'标签名' + (index + 1)" input-align="right" maxlength="10" placeholder="输入标签名称，例家庭住址" />
          <van-field v-model="item.value" label="信息" input-align="right" maxlength="30" placeholder="输入信息内容，例详细家住址" />
          <div class="deletAddLablel">
            <span @click="delDataList(item.id)">
              <van-icon name="cross" size="16" color="red" />删除
            </span>
          </div>
        </div>
      </div>

      <div class="footerPopup">
        <div class="footerPopup-left">
          <span>{{ labelJson.length }}&nbsp;&nbsp;</span>个标签
        </div>
        <div class="footerPopup-right">
          <button class="cancel" @click="addLabel">取消</button>
          <button class="confirms" @click="confirms">确认</button>
        </div>
      </div>
    </van-popup>
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
      objData: {},
      customerName: "",
      phone: "",
      email: "",
      cardNo: "",
      remark: "",
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
      //添加一条自定义标签
      labelJson: [
        {
          name: "",
          value: "",
          id: Date.parse(new Date()),
        },
      ],
    };
  },
  created() {
    if (this.$route.query.id) {
      this.getClientInfo(this.$route.query.id);
    }
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
    inputChange(e, name) {
      this.$set(this.objData, name, e);
    },
    //展示||隐藏--添加自定义标签弹框
    addLabel() {
      this.show = !this.show;
      if (!this.labelJson.length) {
        this.labelJson.push({
          name: "",
          value: "",
          id: Date.parse(new Date()),
        });
      }
    },
    //增加一条自定义标签
    addDataList() {
      if (this.labelJson.length >= 8) {
        return this.$toast("最多额外添加8个标签");
      }
      this.labelJson.push({
        name: "",
        value: "",
        id: Date.parse(new Date()),
      });
    },
    // 删除一条自定义标签
    delDataList(id) {
      this.labelJson = this.labelJson.filter((item) => item.id !== id);
      if (!this.labelJson.length) {
        this.addLabel();
      }
    },
    //提交所有自定义标签
    confirms() {
      this.addLabel();
      const params = this.labelJson
        .filter((item) => item.name || item.value)
        .map((item) => ({ name: item.name, value: item.value }));
      const coloneObjData = [...this.objData.labelJson, ...params].filter(
        (item) => item !== ""
      );
      this.$set(this.objData, "labelJson", coloneObjData);
      this.$set(this, "labelJson", [
        {
          name: "",
          value: "",
          id: Date.parse(new Date()),
        },
      ]);
    },
    parseSex(data) {
      if (typeof data == "number") return data ? "女" : "男";
      return data;
    },
    showSelectPicker(data, str) {
      if (data) {
        this.$refs.selectPicker.parentMsg({ struct: data }, str);
      }
    },
    updataSelectPicker(msg, str) {
      let objData = JSON.parse(JSON.stringify(this.objData));
      objData[str] = msg.struct.value.value;
      this.objData = objData;
    },
    onSubmit(msg) {
      let params = msg;
      // 校验
      if (!compCheck.isName(params.customerName)) return;
      if (!compCheck.isMobile(params.phone)) return;
      if (params.email) {
        if (!compCheck.isEmail(params.email)) return;
      }
      params.sex = params.sex === "男" ? 0 : 1;
      this.objData = Object.assign({}, this.objData, params);
      let postParams = JSON.parse(JSON.stringify(this.objData));
      postParams.labelJson = JSON.stringify(postParams.labelJson);
      let _this = this;
      Dialog.confirm({
        title: "是否保存更改",
      })
        .then(() => {
          _this.editClientInfo(postParams);
        })
        .catch(() => {
          return;
        });
    },
    //显示隐藏Edit 编辑框
    showEdit(isBol) {
      this.isShowEdit = isBol;
    },
    //获取客户信息
    async getClientInfo(id) {
      const res = await this.$axios({
        url: this.$API.API_MY_CLIENT_INFO,
        method: "post",
        data: {
          id
        },
      });
      if (res.code === 0 && res.content.result == "0") {
        let copyData = JSON.parse(JSON.stringify(res.content.data));
        if (res.content.data.labelJson) {
          copyData.labelJson = eval('(' + res.content.data.labelJson + ')');
        } else {
          copyData.labelJson = []
        }
        this.objData = Object.assign(this.objData, copyData);
        const { customerName, phone, email, cardNo, remark } = this.objData;
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
        this.cardNo = cardNo;
        this.remark = remark;
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    //修改客户信息接口
    async editClientInfo(data) {
      if (!compCheck.isMobile(data.phone)) {
        this.disabled = false;
        return;
      }
      if (!compCheck.isIdno(data.cardNo)) {
        this.disabled = false;
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_MY_TARGET_NEW_SAVE,
        method: "post",
        data,
      });
      if (res.code == 0 && res.content.result == 0) {
        this.$toast("保存成功！");
        setTimeout(() => {
          this.onClickLeft()
        }, 1200)
      } else {
        this.$toast(res.content.resultMessage || "请求失败");
      }
    },
    async phoneGetAjax() {
      const res = await this.$axios({
        url: this.$API.API_MY_TARGET_SEARCH_PHONE,
        method: "post",
        data: {
          phone: this.phone
        },
      });
      if (res.code == 0 && res.content.result == 0) {
        if(res.content.data && res.content.data.id){
          this.getClientInfo(res.content.data.id)
        }
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
    margin-top: 1.875rem;
    background: #ffffff;
    position: relative;
    /deep/.star .van-cell__title.van-field__label span::after {
      content: '*';
      color: red !important;
      display: inline-block;
      margin-left: 0.2rem;
      transform: translateY(20%);
    }
  }
  .avatorInfo {
    position: relative;
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
    position: absolute;
    z-index: 1;
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
  .van-form {
    padding-top: 60px;
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