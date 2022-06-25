<template>
 <div class="playBody" v-show="$store.state.showvideoflv">
   <!-- @click.self="$store.state.showvideoflv = false" -->
   <div class="block" v-show="$store.state.showohter">
     <img @click="$store.state.showvideoflv = false" src="../assets/images/videoNewImg/commhand/delete.png" alt="">
     <span>已上传, 缓冲中...</span>
   </div>
   <div>
     <img @click="exit" src="../assets/images/videoNewImg/commhand/delete.png" alt="">
     <video loop disablePictureInPicture id="Video_flv" controls crossorigin="*"></video>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
  methods: {
    exit() {
      this.$store.state.showvideoflv = false
      // document.exitPictureInPicture();  //退出画中画模式
    }
  }
 }
</script>

<style scoped>
  .playBody{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }
  .playBody div{
    position: absolute;
    top: 50%;
    left: 50%;
    /* transform: translate(-50%,-50%); */
    margin-top: -1.7rem;
    margin-left: -3rem;
    width: 6rem;
    height: 3.4rem;
    border: 1px solid rgba(16, 45, 78, 0.8);
    background-color: rgba(4, 18, 36, 0.8)
  }
  .playBody .block{
    z-index: 2;
    background-color: rgba(4, 18, 36,1);
    color: #fff;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .playBody .block span{
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 0.3rem;
    transform: translate(-50%,-50%);
  }
  .playBody div img{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    cursor: pointer;
  }
  .playBody div video{
    width: 100%;
    height: 100%;
  }

</style>
