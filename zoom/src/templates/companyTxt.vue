<template>
  <div>
    <p style="font-size: 13px; opacity: .6;text-align: center;">本页面保险产品销售由
      <span style="color: #0252FF;" @click="showAccountHint">永创达保险销售有限公司</span>提供
    </p>
    <accountHint ref="accountHint"></accountHint>
  </div>
</template>

<script>
import accountHint from './accountHint'
export default {
  components: {
    accountHint
  },
  methods: {
    showAccountHint() {
      this.$refs.accountHint.parentMsg()
    }
  }
};
</script>