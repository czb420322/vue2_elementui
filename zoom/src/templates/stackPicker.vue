<template>
  <div class="stackPickerPage van-hairline--bottom">
    <van-field readonly name="picker" :value="displayValue" :label="title" :placeholder="placeholder" @click="showPicker = true" right-icon="arrow" :class="isNeed === 'Y' ? 'required' : ''" />
   

   
    <van-popup v-model="showPicker" position="bottom" round closeable>
      <h4 class="title_h4">{{title}}</h4>
      <div class="vanPopup">

        <van-steps class="steps van-hairline--bottom" direction="vertical" :active="active" active-color="#0252ff" :border="false" v-if="industry.name">
          <van-step><div @click="optValue(1)">{{industry.name}}</div></van-step>
          <van-step v-show="active != 0"><div @click="optValue(2)">{{occupation.name}}</div></van-step>
          <van-step v-show="active != 0 && active != 1"><div>{{position.name}}</div></van-step>
        </van-steps>
        <div class="radioGroup">
          <van-radio-group v-model="radio">
              <van-cell-group :border="false"> 
                <van-cell :title="item.name" clickable @click="pitch(item,index,1)" :border="false" v-for="(item,index) in columns" :key="index" v-show="!industry.name">
                  <template #right-icon>
                    <van-radio :name="index" />
                  </template>
                </van-cell>

                <van-cell :title="item.name" clickable @click="pitch(item,index,2)" :border="false" v-for="(item,index) in industry.children" :key="index"  v-show="industry.name && !occupation.name">
                  <template #right-icon>
                    <van-radio :name="index" />
                  </template>
                </van-cell>

                <van-cell :title="item.name" clickable @click="pitch(item,index,3)" :border="false" v-for="(item,index) in occupation.children" :key="index"  v-show="industry.name && occupation.name">
                  <template #right-icon>
                    <van-radio :name="index" />
                  </template>
                </van-cell>
              
              </van-cell-group>
          </van-radio-group>
        </div>
      

      <!-- <div class="box_bt">
        <van-button plain type="default" size="small">取消</van-button>
        <van-button plain type="primary" size="small">确定</van-button>
      </div> -->
      <!-- <van-picker show-toolbar :columns="columns" value-key="name" @confirm="onConfirm" @cancel="showPicker = false" /> -->
     </div>
    </van-popup>
  </div>
</template>

<script>
import util from './../assets/js/util/util';
export default {
  name: "tab",
  props: {
    value: "", //选中数据
    title: "", //标题
    edit: "", //是否可以编辑
    params: Array, //标题
    placeholder: "", //输入提示
    item: '',
    isNeed: ''
  },
  data() {
    return {
      radio:'',
      showPicker: false,
      displayValue: '',
      columns: [],
      industry:{ //行业第1层
        name:'',
        code:'',
        children:[]
      },
      occupation:{ //第2层
        name:'',
        code:'',
        children:[]
      },
      position:{ //第3层
        name:'',
        code:'',
        children:[]
      },
      active:0,

    };
  },
  created() {
    this.columns = this.parseJson(this.params, 'children');
    this.displayValue = this.setDisplayValue(this.params, this.value.split(' '));
  },
  methods: {
    optValue(mark){
      this.radio = ''
      if(mark == 1){
        this.industry = {}
        this.occupation = {}
        this.position = {}
      }
      if(mark == 2){
        this.active = 0
        this.occupation = {}
        this.position = {}
      }
     
    },
    pitch(item,index,identifying){
      if(identifying == 1){
        this.industry = item
        this.active = 0
      }else if(identifying == 2){
        this.occupation = item
        this.active = 1
      }else{ //选到第3层就选完了
        this.position = item
        if(this.item.elementVerify){
          let saleCode = util.getSessionStorageObj('saleCode') || ''
          if(saleCode == 'GRMOBILE_MALL_SL050' || saleCode == 'GRMOBILE_MALL_SL051' || saleCode == 'GRMOBILE_MALL_SL052' || saleCode == 'GRMOBILE_MALL_SL053'){
            if(this.position.code == '0101002|3' || this.position.code == '0101004|3'){
              //果农 农夫
              //如果是这两个3类职业就让他选不限制，其他的正常规则
            }else{
              if(this.item.elementVerify < this.position.type){
                this.$toast('该职业不能投保此产品！请重新选择');
                return;
              }
            }
          }else{
            if(this.item.elementVerify < this.position.type){
              this.$toast('该职业不能投保此产品！请重新选择');
              return;
            }
          }
          
        }
       
        this.showPicker = false;
        this.active = 3
        this.radio = index
        var a = this.industry.name +' '+this.occupation.name +' '+ this.position.name
        this.displayValue = a;
        this.$emit('input', { value: this.industry.code + ' ' + this.occupation.code + ' ' + this.position.code, text: a });
        this.$emit('change', { value: this.industry.code + ' ' + this.occupation.code + ' ' + this.position.code, text: a });
      }
     
    },
    // 初始化
    setDisplayValue(arr, key) {
      let displayValue = '', i = 0;
      arr = arr.slice()
      function toArr(arr) {
        if (arr) {
          arr.forEach(function (item) {
            if (item.code == key[i]) {
              i++;
              displayValue = displayValue + item.name + ' ';
              console.log('displayValue', displayValue);
              toArr(item.children);
            }
          })
        }
      }
      toArr(arr);
      return displayValue;
    },
    // 设置picker组件
    parseJson(arr, key) {
      arr = arr.slice()
      function toParse(arr) {
        arr.forEach(function (item) {
          if (item.subs && Array.isArray(item.subs)) {
            item[key] = item.subs
            toParse(item[key])
          }
          delete item.subs
        })
        return arr
      }
      return toParse(arr)
    },
    //已废弃（20201106，更改被保人选择职业样式）
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      console.log(this.columns[index[0]].code);
      console.log(this.columns[index[0]].children[index[1]].code);
      console.log(this.columns[index[0]].children[index[1]].children[index[2]].code);

      this.displayValue = value.join(" ");
      this.$emit('input', { value: this.columns[index[0]].code + ' ' + this.columns[index[0]].children[index[1]].code + ' ' + this.columns[index[0]].children[index[1]].children[index[2]].code, text: value.join(" ") });
      this.$emit('change', { value: this.columns[index[0]].code + ' ' + this.columns[index[0]].children[index[1]].code + ' ' + this.columns[index[0]].children[index[1]].children[index[2]].code, text: value.join(" ") });
      this.showPicker = false;
    },
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      console.log('取消');
    },
  },
};
</script>
<style lang="less" scoped>
.stackPickerPage{
  .vanPopup{
      height: 90vw;
      overflow:hidden !important;
      position:relative;
      display:-moz-box;
      display:-webkit-box;
      display:box;
      -moz-box-orient:vertical;
      -webkit-box-orient:vertical;
      box-sizing: border-box;
      min-height: 90vw;
      padding-bottom: 50px;
    .van-step--vertical:not(:last-child)::after{
      border-bottom-width:0
    }
  }
  .title_h4{
    text-align: center;
    margin: 16px 0;
  }
  .steps{
    padding-bottom: 12px;
  }
  .radioGroup{
      box-sizing:border-box;
      position:relative;
      overflow:auto;
      -webkit-overflow-scrolling:touch;
      -moz-box-flex:1;
      -webkit-box-flex:1;
  }
  .box_bt{
    display: flex;
    justify-content: space-around;
    margin-bottom: 12px;
    .van-button{
        width: 80px;
    }
  }
}
</style>
