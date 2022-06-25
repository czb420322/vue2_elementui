<template>
  <div class="chargingPileEditPage">
    <van-nav-bar title="信息" :border="false" :fixed="true">
      <template #left>
        <van-icon
          name="arrow-left"
          color="#3B3B3B"
          size="20"
          @click="onClickLeft"
        />
      </template>
    </van-nav-bar>
    <van-form validate-first @submit="onSubmit">
      <!-- 保额 -->
      <div
        class="insured_content"
        :style="{ 'margin-top': $iosSystem + 56 + 'px' }"
      >
        <van-cell>
          <h3>保额</h3>
        </van-cell>
        <van-field
          :value="amoutList[kindCode].value.text"
          readonly
          @click="showSelectPicker(amoutList[kindCode])"
          label="每个充电桩"
          placeholder="请选择"
          right-icon="arrow"
          input-align="right"
        />
        <van-field
          v-if="amoutList[kindCode].value.text == '其他'"
          v-model="amoutList[kindCode].value.value"
          type="digit"
          label="其他金额"
          placeholder="请输入"
          input-align="right"
        />
      </div>
      <!-- 信息 -->
      <div class="chargingPile_message">
        <van-cell>
          <h3>充电桩信息</h3>
        </van-cell>
        <van-field
          required
          v-model="chargingPostData.chargingposttype"
          label="充电桩型号"
          placeholder="请输入型号"
          input-align="right"
          error-message-align="right"
          name="validator"
          :rules="[{ validator, message: '请输入正确型号' }]"
        />
        <van-field
          required
          v-model="chargingPostData.chargingpostcode"
          label="充电桩编号"
          placeholder="请输入编号"
          input-align="right"
          error-message-align="right"
          name="validator"
          :rules="[{ validator, message: '请输入正确编号' }]"
        />
        <van-field
          required
          v-model="chargingPostData.chargingpostaddress"
          label="充电桩地址"
          placeholder="请输入地址"
          input-align="right"
          error-message-align="right"
          name="validator"
          :rules="[{ validator, message: '请输入正确地址' }]"
        />
        <van-field
          :value="chargingpostaddresstype.value.text"
          @click="showSelectPicker(chargingpostaddresstype)"
          readonly
          required
          label="充电桩安装地点类型"
          placeholder="请选择安装地点类型"
          right-icon="arrow"
          input-align="right"
        />
        <van-field
          :value="chargingpostkind.value.text"
          @click="showSelectPicker(chargingpostkind)"
          readonly
          required
          label="充电桩种类"
          placeholder="请选择充电桩种类"
          right-icon="arrow"
          input-align="right"
        />
        <van-field
          :value="chargingpostyearlimit.value.text"
          @click="showSelectPicker(chargingpostyearlimit)"
          readonly
          required
          label="充电桩使用年限"
          placeholder="请选择使用年限"
          right-icon="arrow"
          input-align="right"
        />
        <selectPicker
          ref="selectPicker"
          @click="updataSelectPicker"
        ></selectPicker>
      </div>
      <div class="btn_box">
        <van-button class="btn save" type="info" native-type="submit"
          >保存</van-button
        >
      </div>
    </van-form>
    <van-button class="btn chargingPile" @click="cancel()">取消</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import selectPicker from "./../../templates/selectPicker.vue";
export default {
  components: {
    selectPicker,
  },
  data() {
    return {
      amout: "",
      kindCode: this.$route.query.kindCode || 0,
      chargingPostData: {
        /* 投保保额 */
        amout: {
          "21C1": "",
          "21C2": "",
        },
        /**投保单号*/
        proposalNo: "",
        /**充电桩型号*/
        chargingposttype: "",
        /**充电桩编码*/
        chargingpostcode: "",
        /**电桩地址*/
        chargingpostaddress: "",
        /**充电桩安装地点类型*/
        chargingpostaddresstype: "",
        /**充电桩种类*/
        chargingpostkind: "",
        /**充电桩使用年限*/
        chargingpostyearlimit: "",
        /**投保险别*/
        coverage: "",
      },
      amoutList: {
        "21C1": {
          value: { text: "", value: "" },
          data: [
            { text: "2000元", value: "2000" },
            { text: "5000元", value: "5000" },
            { text: "10000元", value: "10000" },
            { text: "20000元", value: "20000" },
            { text: "其他", value: "" },
          ],
        },
        "21C2": {
          value: { text: "", value: "" },
          data: [
            { text: "1万元", value: "10000" },
            { text: "2万元", value: "20000" },
            { text: "3万元", value: "30000" },
            { text: "5万元", value: "50000" },
            { text: "10万元", value: "100000" },
            { text: "20万元", value: "200000" },
            { text: "30万元", value: "300000" },
            { text: "50万元", value: "500000" },
            { text: "其他", value: "" },
          ],
        },
      },
      chargingpostaddresstype: {
        value: { text: "", value: "" },
        data: [
          { value: "1", text: "地面停车场" },
          { value: "2", text: "地面停车楼/地下停车场" },
        ],
      },
      chargingpostyearlimit: {
        value: { text: "", value: "" },
        data: [
          { value: "1", text: "2年及以内" },
          { value: "2", text: "2-5(含)年" },
          { value: "3", text: "5年以上" },
        ],
      },
      chargingpostkind: {
        // 充电桩种类
        value: { text: "", value: "" },
        data: [
          { value: "1", text: "地面充电桩" },
          { value: "2", text: "壁挂式充电桩" },
          { value: "9", text: "其他类充电桩" },
        ],
      },
      title: this.$route.meta.title,
    };
  },
  computed: {
    ...mapState({
      chargingPostDataList: (state) => state.car.chargingPostDataList,
    }),
  },
  created() {
    if (this.$route.query.key) {
      this.chargingPostData = {
        ...this.chargingPostDataList[this.$route.query.key],
      };
      this.amoutList[this.kindCode].value = this.chargingPostData.amout[this.kindCode];
      this.chargingpostaddresstype.value =
        this.chargingPostData.chargingpostaddresstype;
      this.chargingpostkind.value = this.chargingPostData.chargingpostkind;
      this.chargingpostyearlimit.value =
        this.chargingPostData.chargingpostyearlimit;
    }
  },
  mounted() {},
  methods: {
    validator(val) {
      return /^((?!\\|\/|:|\*|\?|<|>|\||'|%).){1,999}$/.test(val);
    },
    cancel() {
      this.amoutList[this.kindCode].value.value = "";
      this.amoutList[this.kindCode].value.text = "";
      this.chargingPostData.chargingposttype = "";
      this.chargingPostData.chargingpostaddress = "";
      this.chargingPostData.chargingpostaddress = "";
      this.chargingpostaddresstype.value = "";
      this.chargingpostkind.value = "";
      this.chargingpostyearlimit.value = "";
      this.$router.go(-1);
    },
    showSelectPicker(data) {
      if (data) {
        this.$refs.selectPicker.parentMsg({ struct: data });
      }
    },
    onSubmit() {
      console.log(this.chargingPostData.amout[this.kindCode], "21c1");
      if (!this.amoutList[this.kindCode].value.text) {
        this.$toast("请选择保额");
        return;
      }

      if (
        this.amoutList[this.kindCode].value.text == "其他" &&
        this.amoutList[this.kindCode].value.value < 500000
      ) {
        this.$toast("保额必须大于50万元");
        return;
      }
      if (!this.chargingpostaddresstype.value.text) {
        this.$toast("请选择安装地点类型");
        return;
      }
      if (!this.chargingpostkind.value.text) {
        this.$toast("请选择充电桩种类");
        return;
      }
      if (!this.chargingpostyearlimit.value.text) {
        this.$toast("请选择使用年限");
        return;
      }

      this.chargingPostData.amout[this.kindCode] =
        this.amoutList[this.kindCode].value;

      this.chargingPostData.chargingpostaddresstype =
        this.chargingpostaddresstype.value;
      this.chargingPostData.chargingpostkind = this.chargingpostkind.value;
      this.chargingPostData.chargingpostyearlimit =
        this.chargingpostyearlimit.value;

      this.$store.commit("car/updateChargingPostDataList", {
        chargingPostData: this.chargingPostData,
        key: this.$route.query.key,
      });
      this.$router.go(-1);
    },
    updataSelectPicker(params) {
      console.log(params.struct.value, "params");
    },
  },
};
</script>
<style lang="less">
.chargingPileEditPage {
  position: relative;
  .chargingPile {
    width: 45%;
    position: absolute;
    left: 3%;
  }
  .insured_content {
    background: white;
    margin: 10px;
    .van-cell {
      h3 {
        margin: 0;
      }
    }
  }
  .chargingPile_message {
    background: white;
    margin: 0 10px 10px 10px;
    .van-cell {
      h3 {
        margin: 0;
      }
    }
    .van-field {
      .van-field__label {
        width: 100px;
      }
    }
  }
  .btn_box {
    position: relative;
    // width: 94%;
    // display: flex;
    // justify-content: flex-end;
    // margin-left: 3%;
    // margin-top: 20px;
    .btn {
      width: 45%;
      position: absolute;
      right: 3%;
    }
  }
}
</style>