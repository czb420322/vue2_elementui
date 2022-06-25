<template>
  <div class="discountPage">
    <van-popup v-model="showPicker" position="bottom">
      <div class="content_">
        <h3 class="title_bar" v-if="VehicleInsurance.switchChecked1">费率系数折扣调整</h3>
        <h3 class="title_bar" v-else>费率分组查看</h3>
        <van-cell v-show="VehicleInsurance.switchChecked1" :title="`自主定价系数：${discountData.selfAdjustRate}`" />
        <!-- 除了北京分公司 01000000 外 其他分公司做 +1 处理 -->
        <van-cell v-show="VehicleInsurance.switchChecked1" :title="`无赔优系数：${ UserInfo.manageCode != '01000000' ? discountData.noclaimRate*1 + 1 : discountData.noclaimRate}`" />
        <van-field v-show="VehicleInsurance.switchChecked1" center clearable label="期望折扣" v-model="value" placeholder="请输入" @input="xiaoshu" >
          <template #button>
            <span style="color: red">{{`区间：${discountData.sumLowerRate}-${discountData.sumTopRate}`}}</span>
          </template>
        </van-field>
        <van-cell :title="`签单折扣预期赔付率：${discountData.billELR}`" />
        <van-cell :title="`业务分组：${discountData.billcomeGroup}`" />
        <van-cell :title="`出险次数：${VehicleInsurance.switchChecked1 ? discountData.biClaimTimes : discountData.ciClaimTimes}`" />
        <p class="selfAdjustRateTips" v-if="value && (value < discountData.sumLowerRate*1 || value > discountData.sumTopRate*1)" >*{{`${discountData.selfAdjustRateTips}${discountData.sumLowerRate}-${discountData.sumTopRate}`}}</p>
        <van-row type="flex" justify="space-around" gutter="10" class="footer_bar">
          <van-col span="16" v-show="VehicleInsurance.switchChecked1">
            <van-button type="info" block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="goTrial" >试算</van-button>
          </van-col>
          <van-col span="8">
            <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" @click="showPicker=false">关闭</van-button>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showPicker: false,
      value: ''
    };
  },
  computed: {
    ...mapState({
      discountData: state => state.car.discountData,
      UserInfo: state => state.my.UserInfo,
      VehicleInsurance: state => state.car.VehicleInsurance
    })
  },
  created() {
  },
  methods: {
    parentMsg() {
      this.showPicker = true;
      this.value = this.discountData.expectDiscount
    },
    goTrial(){
      if( this.value != "" ){
        if( this.value*1 < this.discountData.sumLowerRate*1 || this.value*1 > this.discountData.sumTopRate*1 ){
          this.$toast("期望折扣区间不正确，请重新输入"); 
          return 
        }
      }
      this.$store.commit('car/updateCarState', [
        { name: ['discountData', 'expectDiscount'], value: this.value || '' }
      ]) 
      this.$emit('click');
    },
    // 保留两位小数，不能以点开头 
    xiaoshu() {
      this.value = this.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
      this.value = this.value.replace(/^\./g, "");  //必须保证第一个为数字而不是.
      this.value = this.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //不能重复出现点
      this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数
      if (this.value.indexOf(".") < 0 && this.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.value = parseFloat(this.value);
      }
    }
  }
};
</script>
<style lang="less">
.discountPage {
  .content_ {
    .title_bar {
      text-align: center;
    }
    .van-field__label {
      color: #323233;
    }
    .footer_bar {
      margin: 1.2rem 3.5% 3.5%;
    }
  }
}
</style>