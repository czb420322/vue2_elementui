<!--
 * @Author: your name
 * @Date: 2020-07-17 09:35:57
 * @LastEditTime : 2020-10-30 14:01:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\components\admin_information.vue
 -->
<template>
    <div class="taskMange">
      <el-dialog
      title="售后人员"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      @open="opendia"
      width="20%"
    >
    <div class="taskrelation">
      <div class="content_right">
        <div class="cont_title">| 售后人员资料</div>
        <div class="account_info oneaccount">
          <div class="username">
            <div class="labe">
              <div class="sydw">
                <span>售&nbsp;&nbsp;后&nbsp;&nbsp;人&nbsp;&nbsp;员&nbsp;：&nbsp;&nbsp;</span>
                <span class="ad_2">{{info.trueName}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="account_info">
          <div class="username">
            <div class="labe">
              <div class="sydw">
                <span>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话&nbsp;：&nbsp;&nbsp;</span>
                <span class="ad_2">{{info.phone}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="account_info">
          <div class="username">
            <div class="labe">
              <div class="sydw">
                <span>所&nbsp;&nbsp;属&nbsp;&nbsp;单&nbsp;&nbsp;位&nbsp;：&nbsp;&nbsp;</span>
                <span class="ad_2">{{info.orgName}}</span>
              </div>
            </div>
            <div ref="pwdTip" class="ts"></div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="zz"></div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        list:[],
        info:[],
        dialogVisible: false,
      }
    },
    created () {
      this.getInfo();
    },
    watch: {
      opentoggleAdminInfo(val) {
        this.dialogVisible = val;
      }
    },
     props: {
      opentoggleAdminInfo: Boolean
    },
    methods:{
      //关闭模态框
      closeDia() {
        this.$emit("childadminInformation", false);
      },
      opendia(){

      },
      getInfo(){
        this.$http.get('/sms/static/getMangeInfo').then(res=>{
          this.info = res.data.data;
          console.log(this.info,2222222);
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .el-dialog__wrapper {
  margin-top: 1.5rem;
}
.el-dialog__wrapper /deep/ .el-dialog{
  min-width: 7rem;
}
.content_right {
  display: flex;
  width: 6.4rem;
  background: url('../assets/images/login/accountinfo.png');
  background-size: 100% 100%;
  margin-left: 0.1rem;
  flex-direction: column;
}
.cont_title{
  display: flex;
  height: 0.5rem;
  width: 100%;
  padding-left:0.15rem;
  align-items: center;
  font-size: 0.16rem;
  font-weight: bold;
  line-height:0.5rem;
  color: #409eff;
};

.account_info {
  position: relative;
}
.username {
  width: 100%;
  height: 0.5rem;
  flex-direction: column;
}
.labe {
  display: flex;
  justify-content: center;
}

.sydw {
  width: 6.5rem;
  padding-left:0.2rem;
  font-size: 0.16rem;
  line-height: 0.38rem;
  color: #99c9fa;
}
</style>
