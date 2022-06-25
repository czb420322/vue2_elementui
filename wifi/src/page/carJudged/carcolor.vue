<template>
 <div>
    <span>车辆颜色：</span>
    <b @click="colorChange" data-value="白" ref="bcolor"> <i v-show='watchcolor' class="el-icon-close"></i></b>
    <div class="carcolor" v-show="colorchange">
      <ul>
        <li v-for="(item,i) in colors" :key="i" @click="changecolor(item.color,item.typeface)">
          <div :style="{background:item.color}"></div>
          <p>{{item.typeface}}</p>
        </li>
      </ul>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
        watchcolor:true,
        colorchange:false,
        colors:[{color:'#d10000',typeface:'红'},{color:'#d16700',typeface:'黄'},{color:'#1d4fa1',typeface:'蓝'},
        {color:'#000',typeface:'红'},{color:'#1d4fa1',typeface:'红'},{color:'#1d4fa1',typeface:'红'},{color:'#1d4fa1',typeface:'红'},
        {color:'#1d4fa1',typeface:'红'},{color:'#000',typeface:'红'},{color:'#1d4fa1',typeface:'红'},{color:'#1d4fa1',typeface:'红'},
        {color:'#1d4fa1',typeface:'红'},{color:'#000',typeface:'红'},{color:'#1d4fa1',typeface:'红'},{color:'#1d4fa1',typeface:'红'},
        {color:'#1d4fa1',typeface:'红'},{color:'#1d4fa1',typeface:'红'},{color:'#1d4fa1',typeface:'红'},{color:'#1d4fa1',typeface:'红'},
        {color:'#1d4fa1',typeface:'红'},{color:'#ffffff',typeface:'白'}],

     }
   },
   components: {

   },
   methods: {
      //颜色显示隐藏
      colorChange(){
        this.colorchange =!this.colorchange;
      },
      changecolor(color,typeface){
        this.$refs.bcolor.style.background = color;
        console.log(typeface);
        this.$refs.bcolor.setAttribute('data-value',typeface)
        if(color === '#ffffff'){
          this.watchcolor = true
        }else{
          this.watchcolor = false;
        }
      },
   }
 }
</script>

<style lang="scss" scoped>
     span{
              position: absolute;
              top: 3px;
            }
            b{
              display: inline-block;
              width: 28px;
              height: 28px;
              margin-left: 4px;
              margin-left: 78px;
              font-size: 20px;
              text-align: center;
              background-color: #fff;
              border: 1px solid #dcdfe6;
            }
             .carcolor::-webkit-scrollbar {
              width: 10px;
              height: 10px;
            }
            .carcolor::-webkit-scrollbar-corner {
                background: #82AFFF;
            }
            .carcolor::-webkit-scrollbar-thumb {
                background: #c0c4cc;
                border-radius: 5px;
            }
            .carcolor::-webkit-scrollbar-track {
                background: #dfdfdf;
                border-radius: 5px;
            }

            .carcolor{
              position: absolute;
              width: 260px;
              height: 100px;
              background-color: #fff;
              z-index: 2;
              top: 0;
              left: 120px;
              border: 1px solid #000;
              overflow: auto;
              ul{
                padding-left: 13px;

                li{
                  float: left;
                  margin-right: 13px;
                  margin-top: 10px;
                  div{
                    width: 20px;
                    height: 20px;
                    border: 1px solid #000;
                    background-color: red;
                  }
                  p{
                    text-align: center;
                  }
                }
              }
            }

</style>

