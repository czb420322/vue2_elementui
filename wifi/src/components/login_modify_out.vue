<template>
<div>
  <div class="log_out">
    <div class="nav_left">
        <img width="26px" height="26px" src="../../../assets/tx.png"/>
        <div class="tain">
          <div class="nav_left_name">熊先生，下午好</div>
          <div class="nav_left_time">2018-18-18</div>
        </div>
    </div>

    <div class="nav_middle">
      <img width="26px" height="26px" src="../../../assets/mm.png"/>
      <div>修改密码</div>
    </div>

     <div class="nav_right">
      <img width="26px" height="26px" src="../../../assets/loginout.png"/>
      <div>退出登陆</div>
    </div>

  </div>
</div>
</template>
<script>
  export default {
    data(){
      return {
         list:[]
      }
    },
    created () {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scope>
  .log_out{
    position: absolute;
    width:380px;
    height: 80px;
    // line-height: 80px;
    right: 0px;
    // background: pink;
    overflow: hidden;
    padding-top: 30px;
      .nav_left{
        position: absolute;
       color: white;
        .tain{
          position: relative;
          margin-left: 5px;
          // background: green;
          float: right;
          .nav_left_name{
            font-size: 13px;
            line-height: 13px;

          }
          .nav_left_time{
            font-size: 9px;
             line-height: 13px;
          }
        }
      }
      .nav_middle{
        position: absolute;
        float: left;
        margin-left: 160px;
        color: white;
        div{
          // background: green;
          font-size: 14px;
          line-height: 26px;
          float:right;
          margin-left: 5px;
        }
      }

       .nav_right{
        position: absolute;
        float: left;
        margin-left: 270px;
        color: white;
       
        div{
          // background: green;
          font-size: 14px;
          line-height: 26px;
          float:right;
          margin-left: 5px;
        }
      }
  }
</style>
