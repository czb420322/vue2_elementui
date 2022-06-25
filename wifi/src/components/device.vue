<template>
  <div class="device">
    <!-- <Deviceleftnav v-show="isOpen" /> -->
    
    <Devicemap />
    <!-- <div class="zk on" @click="open_search">展开搜索</div> -->
  </div>
</template>
<script>
import Deviceleftnav from './device_left_nav'
import Devicemap from './device_map'
  export default {
    data(){
      return {
         list:[],
         isOpen:true
      }
    },
    created () {
    //  _initMap
    },
    components:{
      Deviceleftnav,Devicemap
    },
    computed:{
      
    },
    methods:{
     open_search:function(){
       this.isOpen = !this.isOpen
     }
     
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.device{
  display: flex;
  position: relative;
  .zk{
    position: absolute;
    height: 45px;
    width: 100px;
    background: #66b1ff;
    margin-left: 430px;
    top: 0;
    z-index: 11;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    &.on{
      position: absolute;
      left: 0px;
    }
  }
  
}
</style>
