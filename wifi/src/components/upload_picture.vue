<template>
  <div class="contain">
   <div class="cont_p">
     <div class="cont_contain">
        <div class="drag_img"><span>拖拽图片到这里</span><img src="../assets/add.png" /></div>
        <div class="dec"><img src="../assets/upload.png" />上传图片</div>
     </div>
     <span class="close" @click="toggleSearch"></span>
   </div>

  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    data(){
      return {
        list:[],
        //  status:true
      }
    },
    created () {

    },
    computed:{
      ...mapState([
        'status'
      ])
    },
    methods:{
      // pop_search:function(){
      //   this.$emit('pop_search',{status:this.status})
      // },

      // ...mapMutations([
      //   'TOGGLE_PIC_DIV'
      // ]),
      ...mapActions([
        'toggleSearch'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .contain{
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    .cont_p{
      display: flex;
      width:35%;
      height: 2.3375rem;
      justify-content: center;
      background: #fdfefe;
      position: absolute;
      top:-0.14rem;
      border: 1px solid #008dff;
      border-top:none;
    .cont_contain{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 70%;
      height: 100%;
      .drag_img{
        width: 100%;
        height: 1.1685rem;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.14rem;
        color:#c0c4cc;
        background: #f7f8fa;
        span{
          margin-bottom: 0.1rem;
        }
      }
      .dec{
        color: white;
        width: 36%;
        height: 0.41rem;
        border: 1px solid #cbced5;
        text-align: center;
        margin-top:0.2rem;
        font-size: 0.16rem;
        line-height:0.41rem;
        border-radius:0.04rem;
        color:#333;
        vertical-align: middle;
        cursor: pointer;

        img{
          margin-right: 0.1rem;
        }
      }
    }
    .close{
      position: absolute;
      right:0.2rem;
      bottom: 0.14rem;
      width: 0.14rem;
      height:0.14rem;
      background:url("../assets/close_imgsearch.png") no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
      cursor: pointer;
    }
  }
  }


</style>
