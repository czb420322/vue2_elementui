<template>
  <div>
    全局的数据为{{ num }}
    <button @click="add">+</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["num"]),
  },
  methods: {
    ...mapMutations(["add"]),
  },
  inject: ["foo"],
  created() {
    console.log(this.foo, "about页面的数据");
  },
};
</script>

<style>
</style>