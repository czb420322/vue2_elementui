<template>
    <div v-show="true">
      <div class="cover"></div>
      <div class="cont">
        <div class="title">
          <div>新增设备</div>
          <div class="close">X</div>
        </div>
        <div class="form_content">
          <div class="item">
            <div class="item_content">
              设备名称：<input type="text" />
            </div>
            <div class="item_content">
              设备位置：<input type="text" />
            </div>
            
          </div>

          <div class="item">
            <div class="item_content">
              设备厂家：<input type="text" />
            </div>
            <div class="item_content">
              用户名称：<input type="text" />
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              设备型号：<input type="text" />
            </div>
            <div class="item_content">
              用户密码：<input type="text" />
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              设备IP&nbsp;&nbsp;：<input type="text" />
            </div>
            <div class="item_content">
              设备端口：<input type="text" />
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              所属项目：<input type="text" />
            </div>
            <div class="item_content">
              建设时间：<input type="text" />
            </div>
          </div>

          <div class="item">
            <div class="item_content">
              所属辖区：<input type="text" />
            </div>
            <div class="item_content">
              版权到期时间：<input type="text" />
            </div>
          </div>
        </div>
        <div class="submit">
          <div class="sure">确定</div>
          <div class="cancel">取消</div>
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
     
    },
    
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.cover{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#000;
    opacity:0.5;
    z-index: 10;
  }
  
.cont{
  width: 800px;
  height: 500px;
  background:white;
  left: 50%;
  margin-left: -400px;
  top:50%;
  margin-top: -250px;
  position: absolute;
  z-index: 110;
  display: flex;
  flex-direction: column;
  .title{
    display: flex;
    justify-content: space-between;
    height: 55px;
    background: #f3f6f8;
    align-items: center;
    padding: 10px;
    .close{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .form_content{
    display: flex;
    flex-direction: column;
    height: 360px;
    border-bottom: 1px solid gray;
    justify-content: space-around;
    .item{
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      input{
        width: 240px;
        height: 30px;
      }
    }
  }
  .submit{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    // background: green;
    .sure{
      width: 140px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #409eff;
      font-size: white;
      border: 1px solid #d5dade;
      border-radius: 5px;
    }
    .cancel{
      width: 140px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid gray;
      border-radius: 5px;
      margin-left: 48px;
    }
  }
}
</style>
