<template>
  <div class="contentwraper">
    <div class="plateColor">
      <div class="text">车牌颜色:&nbsp;&nbsp;</div>
      <div class="choose">
        <span class="choseResult" @click="handlePlateColor"><span :style="{background:currentColor.colorValue}"></span></span>
        <span class="choseResultTxt">{{currentColor.name}}</span>
        <div class="plateColorList" v-show="plateColorFlag" >
          <div class="colorItem" v-for="(item,i) in colors" :key="i" @click="selectPlateColor(item)">
            <span :style="{
          background: item.colorValue,
          border: `1px  solid  ${(item.code == 2 || item.code == 13 || item.code == 99) ? '#d4d4d4' : item.colorValue}`
        }"></span>
            <em>{{item.name}}</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentColor: { code: 99, name: '其他',colorValue: 'transparent'},
        colors: [
          { code: '1', name: '黑',colorValue: 'black'},
          { code: '2', name: '白',colorValue: 'white'},
          { code: '3', name: '灰',colorValue: 'gray'},
          { code: '4', name: '红',colorValue: 'red'},
          { code: '5', name: '蓝',colorValue: 'blue'},
          { code: '6', name: '黄',colorValue: 'yellow'},
          { code: '7', name: '橙',colorValue: 'orange'},
          { code: '8', name: '棕',colorValue: 'brown'},
          { code: '9', name: '绿',colorValue: 'green'},
          { code: '10', name: '紫',colorValue: 'purple'},
          { code: '11', name: '青',colorValue: '#44bbc1'},
          { code: '12', name: '粉',colorValue: 'pink'},
          { code: '99', name: '其他',colorValue: 'transparent'}
        ],
        plateColorFlag:false
      }
    },
    methods: {
      selectPlateColor(item) {
        this.currentColor = item;
        this.$emit('sendColorToParent', this.currentColor);
        this.plateColorFlag=false;
      },
      handlePlateColor() {
        this.plateColorFlag=!this.plateColorFlag
      },
    },
  }
</script>
<style scoped>
  .plateColor {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .choose {
    flex: 1;
    position: relative;
  }

  .choseResult  {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #d4d4d4;
    vertical-align: middle;
    background:url(../../assets/images/carJudged/undefined.png) no-repeat;
  }
  .choseResult span{
    display:block;
    width: 30px;
    height: 30px;
  }
  .choseResultTxt{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height:30px;
    vertical-align: middle;
  }

  .plateColorList {
    height: 200px;
    position: absolute;
    width: 222px;
    border: 1px solid #d4d4d4;
    left: 42px;
    top: 0;
    overflow: auto;
    z-index: 99;
    background-color: #FFFFFF;
  }
  .colorItem{
    display: inline-block;
    width: 32px;
    margin: 10px 0 0 10px;
    background:url(../../assets/images/carJudged/undefined.png) no-repeat;
  }

  .plateColorList span {
    display:block;
    height: 30px;
  }
  .plateColorList em{
    display:block;
    height:22px;
    background:#fff;
    text-align: center;
    font-size:14px;
  }
</style>
