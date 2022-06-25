<template>
  <div class="insuranceTypesPopupPage">
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '75%' }"
    >
      <ul class="content_" :style="{ 'margin-top': $iosSystem + 46 + 'px' }">
        <li
          class="list input_bar"
          v-if="params.kindCode == '20A' || params.kindCode == '21A' || params.kindCode == '20G1'"
        >
        <!-- <li class="list input_bar" v-if="params.kindCode == '20G1'" style="border: none;"> -->
          <!-- <p class="tips">根据车价，请输入178920.00-198800.00的数值</p> -->
          <p class="title_bar">车价</p>
          <input
            type="text"
            v-model="params.amount"
            placeholder="请输入"
            @input="xiaoshu"
          />&nbsp;元
        </li>
        <li class="list input_bar" v-if="params.kindCode == '20T1'">
          <div style="margin: 0.5rem 0">
            <input
              type="text"
              v-model="params.quantity"
              placeholder="请输入"
              oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"
            />&nbsp;天
          </div>
          <div style="margin: 0.5rem 0">
            <input
              type="text"
              v-model="params.unitAmount"
              placeholder="请输入"
              oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"
            />&nbsp;元/天
          </div>
        </li>
        <!-- 选择其它选项可以输入 -->
        <li
          class="list"
          v-if="
            params.kindCode == '20D3' ||
            params.kindCode == '20D4' ||
            params.kindCode == '21D3' ||
            params.kindCode == '21D4' ||
            params.kindCode == '20Y1' ||
            params.kindCode == '20Y2' || 
            params.kindCode == '20B' || 
            params.kindCode == '20Y'
          "
        >
          <van-radio-group v-model="radio">
            <van-cell
              :title="item.text"
              clickable
              v-for="(item, index) in list"
              :key="index"
              @click="
                radio = index;
                onConfirm(item);
              "
            >
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-radio-group>
          <div
            v-if="params.struct.value && params.struct.value.text == '其它'"
            class="select_other_bar"
          >
            <input
              type="text"
              v-model="params.struct.value.value"
              maxlength="3"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入"
            />&nbsp;万/座
          </div>
        </li>
        <li
          class="list"
          v-else-if="params.kindCode != '20A' && params.kindCode != '21A' && params.kindCode != '20G1'"
        >
          <van-radio-group v-model="radio">
            <van-cell
              :title="item.text"
              clickable
              v-for="(item, index) in list"
              :key="index"
              @click="radio = index;onConfirm(item);
              "
            >
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-radio-group>
        </li>
        <li class="list min_select" v-else>
          <p class="title_bar">车损险绝对免赔额</p>
          <van-radio-group v-model="radio">
            <van-cell
              clickable
              v-for="(item, index) in list"
              :key="index"
              @click="
                radio = index;
                onConfirm(item);
              "
            >
              <template #title>
                <span v-if="item.value == 0" style="color: #1989fa"
                  >无绝对免赔额</span
                >
                <span v-else>{{ item.text }}车损险绝对免赔额</span>
              </template>
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-radio-group>
        </li>
        <li
          class="list btn_bar"
          v-if="
            params.kindCode == '20A' ||
            params.kindCode == '20T1' ||
            params.kindCode == '21A' ||
            params.kindCode == '20D3' ||
            params.kindCode == '20D4' ||
            params.kindCode == '21D3' ||
            params.kindCode == '21D4' ||
            params.kindCode == '20Y1' ||
            params.kindCode == '20Y2' ||
            params.kindCode == '20G1' ||
            params.kindCode == '20B' ||
            params.kindCode == '20Y'
          "
        >
          <a class="btn" @click="show = false">取消</a>
          <a class="btn" @click="onConfirmBtn()">确认</a>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      radio: false,
      params: {},
      list: [],
    };
  },
  computed: {
    ...mapState({
      carPrice: (state) => state.car.carPrice,
      kindCodeValue: (state) => state.car.kindCodeValue,
      RiskPlan: state => state.car.insuranceTypes,
    }),
  },
  created(){
  },
  methods: {
    parentMsg(params) {
      console.log("params", params);
      this.show = true;
      this.params = JSON.parse(JSON.stringify(params));
      this.list = this.params.struct.data;
      if (
        this.params.kindCode == "20A" &&
        this.carPrice &&
        this.carPrice.actualValue
      ) {
        this.params.amount = this.params.amount
          ? this.params.amount
          : this.carPrice.actualValue;
      }
      if (
        this.params.kindCode == "20G1" &&
        this.carPrice &&
        this.carPrice.actualValue
      ) {
        this.params.amount = this.params.amount
          ? this.params.amount
          : this.carPrice.actualValue;
      }
      if (
        this.params.kindCode == "21A" &&
        this.carPrice &&
        this.carPrice.actualValue
      ) {
        this.params.amount = this.params.amount
          ? this.params.amount
          : this.carPrice.actualValue;
      }
      this.radio = this.getIndex(this.list, this.params.struct.value);
      console.log("this.radio", this.radio);
    },
    getIndex(arr, item) {
      for (let i in arr) {
        if (arr[i].value == item.value) {
          return parseInt(i);
        }
      }
      return false;
    },
    onCancel() {
      this.show = false;
    },
    // 当主险修改后校验附加险
    checkSubAmount(params,mainAmount){
      let subKindCodeList = params.additional;
      let result = true;
      subKindCodeList.forEach(it=>{
        if(it == "20Y" || it == '20Y1' || it == '20Y2'){
          let subRiskPlanList = this.RiskPlan.filter(item=>{return item.mainKindFlag == 'S' && item.checked && item.kindCode == it});
          if(subRiskPlanList.length>0){
            let subRiskPlan = subRiskPlanList[0];
            // 附加险的保额
            let amount = subRiskPlan.struct.value.value;
            if(parseInt(mainAmount) < parseInt(amount)){
              result = false;
            }
          }
        }
      });
      return result;
    },
    // 校验附加条款保额是否大于主险保额
    checkAmount(kindCode,amount){
        let mainRiskPlan = this.RiskPlan.filter(item=>{
          return item.mainKindFlag == 'M' && item.checked
        });

        let result = true;
        mainRiskPlan.forEach(it => {
          if(it.additional.indexOf(kindCode) != -1){
            // 主险的保额
            let mainAmount = it.struct.value.value
            if(it.struct.value.text == "其它"){
              mainAmount = mainAmount * 10000
            }
            console.log(mainAmount,'222222222');
            if(parseInt(mainAmount) < parseInt(amount)){
              result = false;
            }
          }
        });
        return result;
    },
    onConfirm(value) {
      // 附加险修改时-校验附加条款保额是否大于主险保额
      if(this.params.kindCode == '20Y'){
        if(!this.checkAmount(this.params.kindCode, value.value)){
          this.$toast("附加险保额无法大于主险保额！")
          this.params.checked = false
          return 
        }
      }
      //主险修改时-校验附加条款保额是否大于主险保额
      if(this.params.kindCode == '21B' || this.params.kindCode == '20B'){
        if(!this.checkSubAmount(this.params, value.value)){
          this.$toast("附加险保额无法大于主险保额！")
          this.params.checked = false
          return 
        }
      }
      
      this.params.struct.value = value
      if (this.params.kindCode != '20A' && this.params.kindCode != '21A'  && this.params.kindCode != '20D3' && this.params.kindCode != '20D4' && this.params.kindCode != '21D3' && this.params.kindCode != '21D4' && this.params.kindCode != '20Y1' && this.params.kindCode != '20Y2' && this.params.kindCode != '20G1' && this.params.kindCode != '20B' && this.params.kindCode != '20Y') {
        setTimeout(() => {
          this.params.checked = true;
          this.$emit('click', this.params);
          this.show = false;
        }, 200);
      }
    },
    onConfirmBtn() {
      // 附加险修改时-校验附加条款保额是否大于主险保额
      if(this.params.kindCode == '20Y1' || this.params.kindCode == '20Y2' || this.params.kindCode == '20Y'){
        let value = this.params.struct.value.value
        if(this.params.struct.value.text == '其它'){
          value = value * 10000    
        }
        if(!this.checkAmount(this.params.kindCode, this.params.struct.value.text == '其它' ? value : this.params.struct.value.value)){
          this.$toast("附加险保额无法大于主险保额！")
          this.params.checked = false
          // this.params.struct.value.value = ""
          return 
        }
      }
      //主险修改时-校验附加条款保额是否大于主险保额
      if(this.params.kindCode == '21D3' || this.params.kindCode == '21D4' || this.params.kindCode == '20D3' || this.params.kindCode == '20D4'){
        let val = this.params.struct.value.value
        if(this.params.struct.value.text == '其它'){
          val = val * 10000    
        }
        if(!this.checkSubAmount(this.params, this.params.struct.value.text == '其它' ? val : this.params.struct.value.value)){
          this.$toast("附加险保额无法大于主险保额！")
          this.params.checked = false
          return 
        }
      }
      if((this.params.kindCode == '21D3' || this.params.kindCode == '21D4' || this.params.kindCode == '20D3' || this.params.kindCode == '20D4' || this.params.kindCode == '20Y1' || this.params.kindCode == '20Y2' || this.params.kindCode == '20B' || this.params.kindCode == '20Y') && this.params.struct.value.text == '其它'){
        if(this.params.struct.value.value.indexOf(".") != "-1"){
          let val = this.params.struct.value.value.indexOf(".")
          let aa = this.params.struct.value.value.substring(val,0)
          this.params.struct.value.value = aa
        }
      }
      if(this.params.kindCode == "20T1"){
        if(this.params.quantity > 90 ){
          this.$toast("天数不能大于90") 
          this.params.quantity = ""
          this.params.checked = false
          return
        }
        if(this.params.unitAmount <= 0 ){
          this.$toast("请输入正整数！")
          this.params.checked = false
          return 
        }
      }
      if (
        (this.params.kindCode == "20A" || this.params.kindCode == "21A" || this.params.kindCode == "20G1") &&
        !this.params.amount
      ) {
        this.$toast("请输入车价");
        return;
      }
      if(this.params.struct.value && this.params.struct.value.value && this.params.struct.value.value.substring(0,1) == '0'){
        this.params.struct.value.value = ~~this.params.struct.value.value
      }
      if (this.params.kindCode == "20A" || this.params.kindCode == "21A" || this.params.kindCode == "20G1") {
        if (this.params.struct.value == null || this.params.struct.value == "") {
          this.$toast("请选择车损险绝对免赔额");
          return;
        }
      } else {
        if(this.params.struct.value.value <= 0){
          this.$toast("请输入正确的金额")
          return
        }
      }
      // if (this.params.kindCode == "20T1" && !this.params.amount) {
      //   this.$toast("请输入保额");
      //   return;
      // }
      this.params.checked = true;
      this.$emit("click", this.params);
      this.show = false;
    },
    // 保留两位小数，不能以点开头
    xiaoshu(obj) {
      this.params.amount = this.params.amount.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      this.params.amount = this.params.amount.replace(/^\./g, ""); //必须保证第一个为数字而不是.
      this.params.amount = this.params.amount.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.params.amount = this.params.amount
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //不能重复出现点
      this.params.amount = this.params.amount.replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        "$1$2.$3"
      ); //只能输入两个小数
      if (this.params.amount.indexOf(".") < 0 && this.params.amount != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.params.amount = parseFloat(this.params.amount);
      }
    },

  },
};
</script>
<style lang="less">
.insuranceTypesPopupPage {
  .van-popup {
    background: #e5e5e5;
    .van-cell-group {
      background-color: rgba(0, 0, 0, 0);
    }
    .van-cell {
      background-color: rgba(0, 0, 0, 0);
    }
    .list {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .van-cell::after {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
    .list.input_bar {
      padding: 10px 16px;
      .title_bar {
        color: #ff7633;
        margin: 0.7rem 0;
        font-size: 0.85rem;
        padding-left: 0 !important;
      }
      .tips {
        margin: 0 0 10px 0;
        font-size: 0.65rem;
      }
      input {
        border: none;
        padding: 0.3rem;
      }
    }
    .list.min_select {
      padding-bottom: 10px;
      .van-cell {
        padding: 3px 16px;
      }
      .van-cell::after {
        border-bottom: none;
      }
      .title_bar {
        color: #ff7633;
        margin: 0.7rem 0;
        font-size: 0.85rem;
        padding: 0 16px;
        // padding-left: 0 !important;
      }
    }
    .list.btn_bar {
      display: flex;
      .btn {
        flex: 1;
        padding: 0.5rem 0;
        text-align: center;
      }
      .btn:nth-of-type(1) {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>