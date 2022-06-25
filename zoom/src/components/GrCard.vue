<template>
  <div class="grcard">
    <div class="flexbox grcard-title" v-if="hasTitle">
      <img v-if="cardTitlePic" class="grcard-title-pic" :src="cardTitlePic">
      <div class="flexitem grcard-title-txt">
        <div class="flexbox flex-center">
          <div>{{ cardTitle }}</div>
          <slot class="flexitem" name="right-icon"></slot>
        </div>
      </div>
      <div class="grcard-title-right">
        <div class="flexbox grcard-title-right-content">
          <slot name="right-content" class="flexitem"></slot>
          <van-icon v-if="isToggleContent && showContent" name="arrow-up" class="toggleicon" @click="toggleContent" />
          <van-icon v-if="isToggleContent && !showContent" name="arrow-down" class="toggleicon" @click="toggleContent" />
        </div>
      </div>
    </div>
    <div class="grcard-content" v-if="showContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    hasTitle: {
      type: Boolean,
      required: false,
      default: false
    },
    cardTitlePic: {
      type: String,
      required: false,
      default: ''
    },
    cardTitle: {
      type: String,
      required: false,
      default: ''
    },
    isToggleContent: {
      type: Boolean,
      required: false,
      default: false
    },
    isShowContent: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  data() {
    return {
      showContent: this.isShowContent
    }
  },
  methods: {
    toggleContent () {
      this.showContent = !this.showContent
    }
  }
}
</script>
<style lang="less" scoped>
.grcard{
  margin: 12px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  .grcard-title{
    position: relative;
    padding: 10px 15px;
    align-items: center;
    &:after{
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: #efefef;
    }
    .grcard-title-pic{
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    .grcard-title-txt{
      font-size: 14px;
      font-weight: bold;
      color: #3B3B3B;
    }
    .grcard-title-right{
      font-size: 14px;
      .grcard-title-right-content{
        .toggleicon{
          color: #95b6ff;
          padding: 0 5px;
        }
      }
    }
  }
  .grcard-content{
    font-size: 14px;
    padding: 12px;
  }
}
</style>