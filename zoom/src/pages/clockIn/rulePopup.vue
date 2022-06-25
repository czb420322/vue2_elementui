<template>
  <div class="rulePopupPage">
    <van-popup v-model="showPicker" closeable>
      <div class="_popup">
        <h3 class="name">考勤规则</h3>
        <van-steps direction="vertical" active-color="#336DEA" :active="5">
          <van-step>
            <h3>{{UserInfo.name || UserInfo.phone}}</h3>
            <p>考勤组：{{attendanceRule.fourOrgName}}</p>
          </van-step>
          <van-step>
            <h3>考勤时间</h3>
            <p>{{attendanceRule.weekRangeStr}}</p>
          </van-step>
          <van-step>
            <h3>考勤范围</h3>
            <p v-for='(item, index) in attendanceRule.address' :key="index">{{item.address}}</p>
          </van-step>
        </van-steps>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      UserInfo: state => state.my.UserInfo,
      attendanceRule: state => state.clockIn.attendanceRule
    })
  },
  data() {
    return {
      showPicker: false,
      params: {},
      list: []
    };
  },
  methods: {
    parentMsg(params) {
      this.showPicker = true;
    },
    onCancel() {
      this.showPicker = false;
    },
    onConfirm(value) {
      this.params.struct.value = value
      this.$emit('click', this.params);
      this.showPicker = false;
    }
  }
};
</script>
<style lang="less">
.rulePopupPage {
  .van-popup {
    width: 80%;
    border-radius: 10px;
  }
  ._popup {
    padding: 0 1rem;
    .name {
      text-align: center;
      margin: 0;
      padding: 1rem 0;
    }
    h3 {
      margin: 0;
    }
    p {
      margin: 0.5rem 0;
    }
  }
}
</style>