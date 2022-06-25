<template>
  <div class="carAreaPgae">
    <van-action-sheet v-model="show" :round="false">
      <ul>
        <li v-for="(item,index) in area" :key="index" @click="checked(item)" >{{item}}</li>
      </ul>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      area: [
        '京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏',
        '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼',
        '川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新',
        '藏'
      ]
    };
  },
  methods: {
    parentMsg(){
      this.show = true;
    },
    checked(item){
      this.show = false;
      this.$emit('click', item);
    }
  }
};
</script>
<style lang="less">
.carAreaPgae {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #dddddd;
    padding: .65rem;
    li {
      background-color: white;
      width: 8.6%;
      margin: .22rem .1rem;
      text-align: center;
      padding: .64rem 0 .44rem;
      border-radius: 0.26rem;
      font-size: 1.02rem;
      border-bottom: 1px solid #999;
      line-height: 1em;
    }
    li:active{
      background-color: #999;
    }
  }
}
</style>