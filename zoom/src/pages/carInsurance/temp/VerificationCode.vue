<template>
  <div class="VerificationCodePage">
    <van-popup v-model="show" round :close-on-click-overlay="false" style="width: 90%">
      <h3>转保单投保</h3>
      <div v-if="VerificationCode.cicheckCode">
        <h4>交强险</h4>
        <van-field readonly v-model="VerificationCode.cidemandNo" label="查询码" placeholder="请输入用户名" />
        <van-field v-model="cValue" label="交强险" center clearable placeholder="请输入">
          <template #button>
            <img :src="'data:image/jpeg;base64,' + VerificationCode.cicheckCode" alt="">
          </template>
        </van-field>
        <br>
      </div>
      <div v-if="VerificationCode.bicheckCode">
        <h4>商业险</h4>
        <van-field readonly v-model="VerificationCode.bidemandNo" label="查询码" placeholder="请输入用户名" />
        <van-field v-model="bValue" label="验证码" center clearable placeholder="请输入">
          <template #button>
            <img :src="'data:image/jpeg;base64,' + VerificationCode.bicheckCode" alt="">
          </template>
        </van-field>
        <br>
      </div>
      <van-button type="info" block @click="onSubmit">完成</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      VerificationCode: state => state.car.VerificationCode,
    }),
    bValue: {
      get() {
        return this.$store.state.car.VerificationCode.bValue
      },
      set(value) {
        this.$store.commit('car/updataVerificationCode', [{ name: 'bValue', value }])
      }
    },
    cValue: {
      get() {
        return this.$store.state.car.VerificationCode.cValue
      },
      set(value) {
        this.$store.commit('car/updataVerificationCode', [{ name: 'cValue', value }])
      }
    }
  },
  data() {
    return {
      show: false,
      sms: ''
    };
  },
  created() {
  },
  methods: {
    parentMsg(params) {
      this.show = true;
    },
    onSubmit() {
      if (this.VerificationCode.bicheckCode && !this.VerificationCode.bValue) {
        this.$toast("请输入商业险验证码！"); return
      }
      if (this.VerificationCode.cicheckCode && !this.VerificationCode.cValue) {
        this.$toast("请输入交强险验证码！"); return
      }
      this.show = false;
    }
  }
};
</script>
<style lang="less">
.VerificationCodePage {
  h4,
  h3 {
    padding: 0 16px;
    margin: 0.4rem 0 0.4rem;
  }
  h3 {
    text-align: center;
    margin: 1rem 0;
  }
  .van-button {
    border-radius: 0;
  }
  .van-field__label {
    width: 4.2em !important;
  }
}
</style>