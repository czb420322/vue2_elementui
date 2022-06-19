<template>
  <div class="home">
    11111
    {{ newParent }}
    <headers></headers>
    <mains></mains>
    <footers
      ref="footer"
      :parentData="parentData"
      @changeParentData="changeParentData"
    ></footers>
  </div>
</template>

<script>
import headers from "./component/header.vue";
import mains from "./component/main.vue";
import footers from "./component/footer.vue";
export default {
  data() {
    return {
      parentData: "我是爸爸",
      newParent: "",
    };
  },
  provide: {
    foo: "bar",
  },
  mounted() {
    this.newParent = this.$refs.footer.footerChildData;
    console.log(this.newParent, "父组件接受子组件的结果");
  },
  components: {
    headers,
    mains,
    footers,
  },
  methods: {
    handleParent() {
      this.parentData = "我更新了父组件的额数据为最新的数据结果";
    },
    changeParentData(val) {
      console.log(val, ".0000000");
      this.parentData = val;
    },
  },
};
</script>

<style>
.home {
  /* display: flex; */
  height: 500px;
  border: 1px solid red;
}
</style>