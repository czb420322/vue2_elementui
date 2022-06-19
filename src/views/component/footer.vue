<template>
  <div>我是尾部
     <div @click="handleChild">我是父元素的数据{{parentData}}</div> 
     <div @click="changeParentData">我想改变父组件的数据</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        footerChildData:"我是尾部的数据"
    };
  },
  props: {
    parentData: {
      type: String,
      // default:
    },
  },
  methods: {
    handleChild() {
        this.$parent.handleParent()
    },
    changeParentData(){
        this.$emit("changeParentData","我改变了父元素parentData的数据为我是最新的数据")
    }
  },
};
</script>

<style lang="scss" scoped>
</style>