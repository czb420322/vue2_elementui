<template>
  <div>
    我是主体内容123 <br>
    <div>我是来自父元素Home的数据{{ foo }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  inject: ["foo"],
  created() {
    console.log(this.foo, "父元素提供的数据");
  } 
};
</script>

<style lang="scss" scoped>
</style>