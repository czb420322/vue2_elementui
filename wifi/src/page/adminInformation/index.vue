<template>
  <div>
    <Registerheader/>
    <div class="content ">
      <div class="content_C">
        <div class="conentDS">
          <div class="conentDS_title">管理员资料</div>
          <div class="conentDS_In">大数据解析中心及视图库作战平台</div>
        </div>

        <div class="contentInformation">
          <div class="contentInformation_left">
            <div class="ad"><span class="ad_1">管理员:</span><span class="ad_2">刘某某</span></div>
            <div class="ad"><span class="ad_1">电话:</span><span class="ad_2">13145209999</span></div>
            <div class="ad"><span class="ad_1">所属单位:</span ><span class="ad_2">武汉市公安局</span></div>
          </div>

          <div class="contentInformation_right">
            <img style="width:110px;height:170px" src="../../assets/rl.png"/>
            <div class="admin_cont">管理员照片</div>
          </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
//引用头部和底部
// import Registerheader from './subpage/registerheader'
  export default {
    data(){
      return {
         list:[],
         layerTop: '416px'

      }
    },
    mounted(){
      this.layerTop = `${document.documentElement.clientWidth / 1920 * 416}px`;
      // window.onresize = ()=> {
      //     this.layerTop = `${document.documentElement.clientWidth / 1920 * 416}px`;
      // };
    },
    created () {

    },
     components:{
      Registerheader: () => import('./subpage/registerheader'),
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .content{
    position: absolute;
    margin-top:55px;
    height: auto;
    width: 850px;
    margin-left: -425px;
    left: 50%;
    transition: top .3s ease;
    box-shadow: 0 0 15px #888;
    padding-top:70px;
    .content_C{
        width: 530px;
        height: 440px;
        margin: 0 auto;
        .conentDS{
          .conentDS_title{
            font-size: 60px;
            color: #0186FF;
          }
          .conentDS_In{
            font-size: 30px;
            color: #0186FF;
          }
        }
    .contentInformation{
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        .contentInformation_left{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .ad{
            display: flex;
            .ad_1{
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 24px;
              width:130px;
            }
            .ad_2{
              font-size: 20px;
            }
          }
        }
        .contentInformation_right{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 80px;
          .admin_cont{
            display: flex;
            justify-content: center;
            font-size: 22px;
          }
        }
      }
    }
}
</style>
