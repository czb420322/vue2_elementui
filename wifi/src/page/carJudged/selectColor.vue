<template>
  <div class="colorList">
    <div class="colorItem" v-for="(item,index) in colors" @click="selectColor(item)" :key="index">
      <span :style="{ background: item.colorValue }"></span>
      <em>{{item.name}}</em>
    </div>
  </div>
</template>
<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  export default {
    data() {
      return {
        currentColor: { code: 99, name: '其他',colorValue: 'transparent'},
        // currentColor: { code: 13, name: '透明',colorValue: 'transparent'},
        colorDataList:[],
        colors: []
      }
    },
    mixins:[vehicle],
    methods: {
      selectColor(item) {
        this.currentColor = item;
        this.$emit('sendColorToParent', this.currentColor);
      },
      //根据返回的颜色value，确定对应的颜色值
      getColorValue (value){
        let colorValue = "";
        switch(value){
          case "黑":
            colorValue =  "black";
            break;
          case "白":
            colorValue =  "white";
            break;
          case "灰":
            colorValue =  "gray";
            break;
          case "红":
            colorValue =  "red";
            break;
          case "蓝":
            colorValue =  "blue";
            break;
          case "黄":
            colorValue =  "yellow";
            break;
          case "橙":
            colorValue =  "orange";
            break;
          case "棕":
            colorValue =  "brown";
            break;
          case "绿":
            colorValue =  "green";
            break;
          case "紫":
            colorValue =  "purple";
            break;
          case "青":
            colorValue =  "#44bbc1";
            break;
          case "粉":
            colorValue =  "pink";
            break;
          case "银":
            colorValue =  "silver";
            break;
          case "金":
            colorValue =  "gold";
          break;
          case "其他":
            colorValue =  "transparent";
            break;
          case "不限":
            colorValue =  "transparent";
            break;
          default:
            break;
        }
        return colorValue;
      }
    },
    mounted (){
      this.getColorType((res)=>{
        res.data.data.push({key: "ColorType", field: "", value: "不限"})
        this.colorDataList = res.data.data;
        if(this.colorDataList.length > 0){
          for(let i=0;i<this.colorDataList.length;i++){
            let colorValue = this.getColorValue(this.colorDataList[i].value);
            this.colors.push({
              code: this.colorDataList[i].field,
              name: this.colorDataList[i].value,
              colorValue : colorValue
            });
          }
        }
      });


    }
  }
</script>
<style scoped>


  .choose {
    flex: 1;
    /*position: relative;*/
  }



  .colorList {
    position: absolute;
    width: 2.22rem;
    border: 1px solid #235588;
    left: 1.48rem;
    top: 40%;
    z-index: 99;
    /* background-color: #FFFFFF; */
    background-color: rgb(19, 47, 76)
  }
  .colorItem{
    display: inline-block;
    width: 0.32rem;
    margin: 0.1rem 0 0 0.1rem;
    background:url(../../assets/images/carJudged/undefined.png) no-repeat;
  }

  .colorList span {
    display:block;
    height: 0.3rem;
    border:1px solid #235588;
    cursor: pointer;
  }
  .colorList em{
    display:block;
    height:0.25rem;
    min-height: 22px;
    background:#235588;
    text-align: center;
    font-size:0.12rem;
  }
</style>
