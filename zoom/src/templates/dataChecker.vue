<template>
  <div class="dataCheckerPage van-hairline--bottom">
    <van-field name="radio" :label="title" class="radio_bar" :class="isNeed === 'Y' ? 'required' : ''" >
      <template #input>
        <ol class="radio_box">
          <li v-for="(item,index) in data" :key="index" @click="checkData(item)" class="radio" :class="{'checker-item-selected': item.value == checkVal, 'checker-item-disabled': item.disabled }">{{item.text}}</li>
        </ol>
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    data: { type: Array, default: [] },
    checkVal: { type: String, default: '' },
    edit: { type: String, default: '' },
    isNeed:  { type: String, default: '' },
  },
  data() {
    return {
      showPicker: false,
      checked: '',
      checkedText: ''
    };
  },
  created() {
    this.initData();
  },
  methods: {
    onConfirm(value, index) {
      this.value = value.text;
      this.$emit('input', value);
      this.$emit('change', value);
      this.showPicker = false;
    },
    initData() {
      if (this.data) {
        this.data.forEach(item => {
          if (item.value == this.checkVal) {//如果 和 赋值的数据一直时候
            this.checked = item.value;
            this.checkedText = item.text;
          }
        });
      }
    },
    //点击选择
    checkData(item) {
      setTimeout(()=>{
        if ((this.edit && (this.edit == '1' || this.edit == 'N')) || item.disabled ) { //存在  切等于1 不可以编辑
          return;
        }
        //再设置当前点击项选中
        this.checked = item.value;
        this.checkedText = item.text;
        //往上级组件通信
        this.$emit('input', { value: this.checked, text: this.checkedText });
        this.$emit('change', { value: this.checked, text: this.checkedText });
      },100);
    }
  },
};
</script>

<style lang="less">
.dataCheckerPage {
  .van-cell__title {
    flex: 1;
  }
  .radio_box {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: 100%;
    margin: .5rem 0;
    .radio {
      width: auto;
      padding: 0 0.6rem;
      height: 1.5rem;
      font-size: 0.7rem;
      line-height: 1.5rem;
      text-align: center;
      border-radius: 3px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-right: 0.333rem;
      display: block;

      line-height: 2rem;
      height: 2rem;
      font-size: .75rem;
    }
    .checker-item-selected {
      color: #118eea;
      border-color: #118eea;
      background: url('./../assets/img/product/select_icon.png') no-repeat top right;
      background-size: .77rem;
    }
    .checker-item-disabled{
      opacity: 0.5;
    }
  }
  .radio_bar {
    flex-wrap: wrap;
    .van-cell__value{
      flex: none;
      width: 100%;
      .radio_box .radio{
        flex: 1;
      }
    }
  }
}
  .dataCheckerPage.van-hairline--bottom::after {
    z-index: 1;
  }
</style>