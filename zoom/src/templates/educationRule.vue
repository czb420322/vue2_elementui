<template>
  <div class="educationRule">
    <van-popup v-model="show">
      <i class="agent_btn" @click="goSkip()" ></i>
      <div class="content-text">
         <div class="hint_txt">
           <p class="txt_p" style="color:red;">若学历证书有丢失，需手写（打印后填写）下表，完成后拍照上传至学历证明处</p>
           <h3 class="title_txt">毕业证遗失说明</h3>
           <div class="box_txt">
              <p>本人____毕业于_______学历为（中专/高中/大专/本科/硕士/博士）。因毕业证书丢失，特向公司说明情况。</p>
              <p class="txt_p">本人签章：________</p>
              <p class="txt_p">日期：________</p>
           </div>
          </div>
           <div class="img_box">
            <img src="./../../public/img/page/base/gb_b.png" width="10%">
          </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      show: false,
    };
  },
  computed:{
    ...mapState({
      UserInfo: state => state.my.UserInfo
    })
  },
  created() {
     //处理河北
    // if(this.UserInfo.OrgCode.substring(0,2) == '15' || this.UserInfo.OrgCode.substring(0,2) == '21'){
    //   this.judge = false;
    // }
  },
  methods: {
    goSkip(){
      this.show=false
    },
    educationRuleMsg(state) {
      this.show = state;
    }
  },
};
</script>

<style lang="less">
.educationRule{
  .van-overlay {
    z-index: 10000000 !important;
  }
  .van-popup {
    z-index: 10000000 !important;
    width: 100vw;
    // height: 100vw;
    background: none;
  
    overflow: hidden;
  }
  .agent_btn{
    position: absolute;
    left: 45%;
    bottom: 3%;
    display: block;
    width: 10%;
    height: 18%;
  }
  .hint_txt{
    width: 86vw;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 6px;
    .title_txt{
      text-align: center;
    }
    .box_txt{
      font-size: 14px;
      .txt_p{
        text-align: right;
      }
    }
  }
  .img_box{
    text-align: center;
    margin-top: 10px;
  }
}
</style>