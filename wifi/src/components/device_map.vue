<template>
  <div class="mapcl" id="map">
    
  </div>
  
</template>
<script>
import ol from 'openlayers';
import 'openlayers/css/ol.css';
let imgIco = require('../assets/circle_03.png');
  export default {
    data(){
      return {
         list:[],
         map:{},//地图实例
         pop:'',//overlay实例
         coords:'',//右击事件时的位置
         master:'',
         master1:''
      }
    },
    created () {
     
    },
    mounted(){
      this._initMap();  
      
    },
    components:{

    },
    computed:{
      
    },
    methods:{}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.clc{
  position: absolute;
  top: 0px;
  right: 0px;
}
.mapcl{
  display: flex;
  height: 850px;
  width: 100%;
}

</style>
