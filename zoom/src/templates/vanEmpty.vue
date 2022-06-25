<template>
  <div class="emptyPage">
    <img src="./../../public/img/common/empty_icon.jpg" alt="">
  </div>
</template>

<script>

export default {
  name: "tab",
  props: ["title"],
  data() {
    return {
      page: 'home',
      path: ''
    };
  },
  mounted() {
    this.path = this.$route.path;
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
.emptyPage{
  width: 100%;
  padding-top: 20px;
  img{
    width: 9rem;
    display: block;
    margin: auto;
  }
}
</style>
