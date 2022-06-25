<template>
 <div>
   <div class="cardetails">
    <div class="top">
      <span>新增角色</span>
      <i class="el-icon-close" @click="getshow"></i>
    </div>
    <div class="center">
      <div class="left">
        <p><span>|</span> 图片源</p>
        <img src="../carJudged/img/333.png" alt="">
      </div>
      <div class="right">
          <p class="carInfo"><span>|</span> 车辆标识信息</p>
          <div class="Infos">
            <el-checkbox>
              <span>驾驶人</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>检测面部</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>系安全带</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>打开遮阳板</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>车辆挂饰</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>纸巾盒</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>转经筒</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>打电话</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos">
            <el-checkbox>
              <span>抽烟</span>
              <b>2人</b>
            </el-checkbox>
          </div>
          <div class="Infos radioInfo">
            <el-checkbox>
              <span>天窗</span>
              <b>有</b>
            </el-checkbox>
          </div>
          <div class="Infos radioInfo">
            <el-checkbox>
              <span>行李架</span>
              <b>有</b>
            </el-checkbox>
          </div>
          <div class="button">
            <el-button type="warning">手动标注</el-button>
            <el-button type="primary">保存标注</el-button>
            <el-button type="danger">情况标注</el-button>
          </div>
      </div>
    </div>
    <div class="btn">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
    </div>
    </div>
 </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      getshow(){
        var cardetails = document.getElementsByClassName('cardetails')[0];
        console.log(cardetails);
        cardetails.style.display = 'none';
      }
    },
    components: {

    }
  }
</script>

<style lang="scss" scoped>

.cardetails{
  z-index: 1111;
  background-color: #fff;
  position: absolute;
  top: 20px;
  left: 430px;
  width: 1044px;
  height: 731px;
    .top{
    padding:0 23px;
    display: flex;
    line-height: 60px;
    justify-content: space-between;
    background: #f3f6f8;
    i{
      line-height: 60px;
      font-size: 20px;
    }
  }
  .center{
    margin-top: 20px;
    border-bottom: 1px solid #c0c4cc;
    position: relative;
    .left{
      p{
        padding-left: 23px;
        color: #409eff;
        span{
          display: inline-block;
          width: 2px;
          margin-right: 10px;
        }
      }
      img{
        display: block;
        margin-bottom: 10px;
        margin-left: 23px;
        margin-top: 10px;
      }
    }
    .right{
      position: absolute;
      right: 0;
      top: -15px;
      width: 270px;
      height: 100%;
      .carInfo{
        color: #409eff;
        font-size: 14px;
        margin: 20px 0;
        span{
          margin-right: 10px;
          width: 2px;
        }
      }
      .button{
        position: absolute;
        bottom: 0;
        .el-button{
          width: 75px;
          height: 28px;
          position: relative;
        }
        .el-button /deep/ span{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }

      .Infos{
        margin-bottom: 15px;
        margin-left: 16px;
        position: relative;
        .el-checkbox {
          width: 100%;
          color: #c0c4cc;
        }

        b{
          position: absolute;
          right: 50px;
          font-weight: normal;
        }
      }


    }

  }

  .btn{
    width: 100%;
    text-align: center;
    .el-button{
      margin-top: 25px;
      width: 140px;
      height: 40px;
    }
    .el-button:first-child{
      margin-right: 48px;
    }
  }
}

</style>

