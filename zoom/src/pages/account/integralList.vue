<template>
   <div class="integralList" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }" >
    <div>
      <v-header :title="{ name: '积分' }"></v-header>
      <div class="integral_name">
        <p class="name">{{userInfo.name || userInfo.mobileStar}}，你好</p>
        <span class="tag"  v-if="userInfo.agentType">{{userInfo.agentType == 1 ? '专员': userInfo.agentType == 2 ? '代理人' : userInfo.agentType == 3 ? '会员' : userInfo.agentType == 4 ? '用户': '' }}</span>
      </div>

       <div class="padding_top back_color">
            <div class="shadow mt_5">
              <div class="tixian" >
                <div  class="data_gather">
                  <div v-for="(item,index) in timeData" :key="index">
                    <img class="data_gather_target img_w" v-if="!item.clockState" src="./../../../public/img/page/icon/weida.png">
                    <img class="data_gather_target img_w" v-else src="./../../../public/img/page/icon/jf_icon01.png">
                  </div>
                </div>
                 
                  <van-divider class="wire" />
                  <div class="data_gather">
                    <div v-for="(item2,index2) in timeData" :key="index2">
                      <p class="data_gather_target">{{item2.dateValue.slice(5)}}</p>
                    </div>
                  </div>  
                  
              </div>
              <div class="jifen flex">
                <div>
                  <img src="./../../../public/img/page/icon/jf_icon01.png">
                  <div></div>
                  <div class="dos"><span>{{integralNum}}</span><span>积分</span></div>
                </div>
                <div class="lint"></div>
                <div>
                  <van-button class="signIn_bt" round type="info" color="#0252ff" size="small" @click="sign()" :disabled="text =='已签到' ? true : false">{{text}}</van-button>
                </div>
              </div>
            </div>
            <!-- 每日任务 -->
            <div>
              <h3 class="fszize_16">每日任务</h3>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/qdao.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">签到</p>
                    <p class="task_centre_integral">+5积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt" @click="sign()" round  color="#0252FF"  size="mini" plain :disabled="text =='已签到' ? true : false">{{text =='已签到' ? '已完成' : '去完成'}}</van-button>
                  </div>
                </div>
               
              </div>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/fxiang.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">分享产品</p>
                    <p class="task_centre_integral">+10积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="goPage('promote')" round  color="#0252FF"  size="mini" plain :disabled="everyday_1 =='已完成' ? true : false">{{everyday_1}}</van-button>
                  </div>
                </div>
              </div>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/yqing.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">邀请好友注册（会员）</p>
                    <p class="task_centre_integral">+20积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="invitationFriend('promote')" round  color="#0252FF"  size="mini" plain :disabled="everyday_2 =='已完成' ? true : false">{{everyday_2}}</van-button>
                  </div>
                </div>
              </div>
               <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/xiadan.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">非车首单</p>
                    <p class="task_centre_integral">+20积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="goPage('productList')" round  color="#0252FF"  size="mini" plain :disabled="everyday_3 =='已完成' ? true : false">{{everyday_3}}</van-button>
                  </div>
                </div>
              </div>

            </div>
            <!-- 常规任务 -->
            <div>
              <h3 class="fszize_16">常规任务</h3>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/shim.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">实名注册（会员）</p>
                    <p class="task_centre_integral">+100积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt" @click="toRealName()" round  color="#0252FF"  size="mini" plain :disabled="ruleTask_1 =='已完成' ? true : false">{{ruleTask_1}}</van-button>
                  </div>
                </div>
               
              </div>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/qyue.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">签约代理人</p>
                    <p class="task_centre_integral">+200积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="toApproval()" round  color="#0252FF"  size="mini" plain :disabled="ruleTask_2 =='已完成' ? true : false">{{ruleTask_2}}</van-button>
                  </div>
                </div>
              </div>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/sou_d.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">首单激励</p>
                    <p class="task_centre_integral">+50积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="goPage('productList')" round  color="#0252FF"  size="mini" plain :disabled="ruleTask_3 =='已完成' ? true : false">{{ruleTask_3}}</van-button>
                  </div>
                </div>
              </div>
               <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/fc_sd.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">非车首单</p>
                    <p class="task_centre_integral">+100积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="goPage('productList')" round  color="#0252FF"  size="mini" plain :disabled="ruleTask_4 =='已完成' ? true : false">{{ruleTask_4}}</van-button>
                  </div>
                </div>
              </div>

            </div>
            <!-- 每月活动 -->
            <div>
              <h3 class="fszize_16">每月活动</h3>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/chechudan.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">车险出单<span class="passed">已完成{{carInsurance}}/10单</span></p>
                    <p class="task_centre_integral">+100积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="goPage('productList')" round  color="#0252FF"  size="mini" plain :disabled="monthTask_1 =='已完成' ? true : false">{{monthTask_1}}</van-button>
                  </div>
                </div>
               
              </div>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/chechudan.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">非车险出单<span class="passed">已完成{{nOcarInsurance}}/15单</span></p>
                    <p class="task_centre_integral">+500积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="goPage('productList')" round  color="#0252FF"  size="mini" plain :disabled="monthTask_2 =='已完成' ? true : false">{{monthTask_2}}</van-button>
                  </div>
                </div>
              </div>
              <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/fxiang.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">每月分享<span class="passed">已完成{{monthShare}}/15次</span></p>
                    <p class="task_centre_integral">+50积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="goPage('promote')" round  color="#0252FF"  size="mini" plain :disabled="monthTask_3 =='已完成' ? true : false">{{monthTask_3}}</van-button>
                  </div>
                </div>
              </div>
               <div class="list_task">
                <img class="task_img" src="./../../../public/img/page/icon/yqing.png" alt="">
                <div class="list_task_centre">
                  <div class="task_centre"> 
                    <p class="task_centre_type">邀请好友注册数量(会员)<br/><span class="passed">已完成{{inviteNumber}}/5人每月</span></p>
                    <p class="task_centre_integral">+500积分</p>
                  </div>
                  <div>
                    <van-button class="finish_bt"  @click="invitationFriend('promote')" round  color="#0252FF"  size="mini" plain :disabled="monthTask_4 =='已完成' ? true : false">{{monthTask_4}}</van-button>
                  </div>
                </div>
              </div>

            </div>

          </div>
     
    </div>
    <van-dialog v-model="showComfirm" :title="null" confirmButtonText="未签署" cancelButtonText="已签署" cancelButtonColor="#1989fa" show-cancel-button class="confirmdialog" @confirm="confirm" @cancel="cancel">
      <div class="confirmdialog-huan"><img src="./../../../public/img/account/confirmbg.png"></div>
          是否在其他保司或代理公司签署<br />代理协议
    </van-dialog>
    <van-dialog v-model="showTips" :title="null" :showConfirmButton="false" class="tipsdialog">
      <a class="tipsbtn" @click="closeTips"></a>
    </van-dialog>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
      showComfirm: false,
      showTips: false,
      agentCode: localStorage.getItem('agentCode'),
      text:'签到',
      integralNum:0,
      timeData:[],
      userInfo:{},
      listData:{},
      reviewCode:'',
      everyday_1:'去完成',
      everyday_2:'去完成',
      everyday_3:'去完成',
      ruleTask_1:'去完成',
      ruleTask_2:'去完成',
      ruleTask_3:'去完成',
      ruleTask_4:'去完成',
      monthTask_1:'去完成',
      carInsurance:'0',
      monthTask_2:'去完成',
      nOcarInsurance:'0',
      monthTask_3:'去完成',
      monthShare:'0',
      monthTask_4:'去完成',
      inviteNumber:'0',
    };
  },

  created() {
    this.getWeekDay()
    this.getUserInfo()
    this.getIntegral();//查询积分
    this.getOwnInfo()
    this.getTaskState();//查询任务
    this.getSign();//查询7天签到

  },
  methods: {
    //签到
    async sign(){
      const res = await this.$axios({
        url: this.$API.API_MY_SIGNIN,
        method: 'post',
        baseURL: 'false',
        data: {
          'agentCode': this.agentCode,
          'signName':this.userInfo.name || '', //签到人姓名（没有就空）
          'signDate':this.presentTime() //签到时间格式 2020-09-17 10:25:14
        }
      });
      if (res.code === 0 && res.content.result == '0') {
        this.text = '已签到'
        this.getSign()
        this.$toast('签到成功')
      }else{
        this.$toast('签到失败')
      }
    },
    //查询签到
    async getSign(){
       const res = await this.$axios({
        url: this.$API.API_MY_QUERYSIGNIN,
        method: 'post',
        baseURL: 'false',
        data: {
          'agentCode': this.agentCode,
        }
      });
        if (res.code === 0 && res.content) {
          //根据返回回来的签到记录进行匹配有没有签到
          var dateJoint = ''
          var presentDate = this.presentDate()
          for(let i in res.content){
            dateJoint =  res.content[i].signDate
            //判断当天是否签到
            if(dateJoint == presentDate){
              this.text = '已签到'
            }
            for(let a in  this.timeData){
               //判断当前一周签到
              if(dateJoint == this.timeData[a].dateValue){
                this.timeData[a].clockState = true;
              }
            }
          }
        }
    },
    //根据当前时间生成当前星期
    getWeekDay() {
        var thas = this
        var dateString = this.presentDate() //生成当前时间
        let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;
    
        if (dateString.match(dateStringReg)) {
            let presentDate = new Date(dateString),
                today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
    
            return Array.from(new Array(7), function(val, index) {
                return thas.formatDate(new Date(presentDate.getTime() - (today - index-1) * 24 * 60 * 60 * 1000));
            });

        } else {
            throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"');
        }
       
    },
    formatDate(date) {
      let M = this.checkTime((date.getMonth() + 1))
      let D = this.checkTime(date.getDate())
      let time = {
        dateValue:date.getFullYear() + '-' + M + '-' + D,
        clockState:false
      }
      this.timeData.push(time)
    },
    //查询任务状态
    async getTaskState(){
        const res = await this.$axios({
          url: this.$API.API_MY_POINTASK,
          method: 'post',
          baseURL: 'false',
          data: {
            'agentCode': this.agentCode,
            'activityType1':"A",
            'activityType2':"B",
            'activityType3':"C",
          }
        });
        if (res.code === 0 && res.content) {
          if(res.content.B){//每日任务
            for(let m in res.content.B){
               if(res.content.B[m].activityCode == '6' && res.content.B[m].activityType == 'B'){
                 //分享产品
                this.everyday_1 = '已完成'
              }
              if(res.content.B[m].activityCode == '7' && res.content.B[m].activityType == 'B'){
                //邀请好友注册会员
                this.everyday_2 = '已完成'
              }
              if(res.content.B[m].activityCode == '4' && res.content.B[m].activityType == 'B'){
                //非车首单
                this.everyday_3 = '已完成'
              }
            }
          }
          if(res.content.A){//常规任务
            for(let i in res.content.A){
              if(res.content.A[i].activityCode == '1' && res.content.A[i].activityType == 'A'){
                this.ruleTask_1 = '已完成'
              }
              if(res.content.A[i].activityCode == '2' && res.content.A[i].activityType == 'A'){
                this.ruleTask_2 = '已完成'
              }
              if(res.content.A[i].activityCode == '3' && res.content.A[i].activityType == 'A'){
                this.ruleTask_3 = '已完成'
              }
              if(res.content.A[i].activityCode == '4' && res.content.A[i].activityType == 'A'){
                this.ruleTask_4 = '已完成'
              }
            }
          } 
          if(res.content.C){
            for(let d in res.content.C){
              if(res.content.C[d].activityCode == '8' && res.content.C[d].activityType == 'C'){
                this.monthTask_1 = '已完成'
                this.carInsurance = '10'
              }
              if(res.content.C[d].activityCode == '9' && res.content.C[d].activityType == 'C'){
                this.monthTask_2 = '已完成'
                this.nOcarInsurance = '15'
              }
              if(res.content.C[d].activityCode == '10' && res.content.C[d].activityType == 'C'){
                this.monthTask_3 = '已完成'
                this.monthShare ='15'
              }
              if(res.content.C[d].activityCode == '11' && res.content.C[d].activityType == 'C'){
                this.monthTask_4 = '已完成'
                this.inviteNumber = '5'
              }
            }
          }
          if(res.content.pointEveryNum){
            for(let a in res.content.pointEveryNum){
              if(res.content.pointEveryNum[a].activityCode == '8' && res.content.pointEveryNum[a].activityType == 'C'){
                this.carInsurance  = res.content.pointEveryNum[a].integralId
              }
              if(res.content.pointEveryNum[a].activityCode == '9' && res.content.pointEveryNum[a].activityType == 'C'){
                this.nOcarInsurance  = res.content.pointEveryNum[a].integralId
              }
              if(res.content.pointEveryNum[a].activityCode == '10' && res.content.pointEveryNum[a].activityType == 'C'){
                this.monthShare  = res.content.pointEveryNum[a].integralId
              }
              if(res.content.pointEveryNum[a].activityCode == '11' && res.content.pointEveryNum[a].activityType == 'C'){
                this.inviteNumber  = res.content.pointEveryNum[a].integralId
              }
            }
          }
         
        }
    },
   
    invitationFriend () {
      util.setSessionStorageObj('promoteTab', 1 );
      this.$router.push({path: '/promote'});
    },
   
    //查询积分接口
    async getIntegral(){
       const res = await this.$axios({
          url: this.$API.API_MY_POINTASK,
          method: 'post',
          baseURL: 'false',
          data: {
            'agentCode': this.agentCode,
          }
        });
         if (res.code === 0 && res.content) {
           this.integralNum = res.content.totalNum || 0

         }
    },
    async getUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_INFO,
        method: 'post',
      });
      if (res.code === 0) {
        this.userInfo = res.content;
      }
    },
    async getOwnInfo(){
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if(res.code === 0 && res.content){
        this.listData =res.content || ''
        this.reviewCode=res.content.reviewCode
      }
    },
    toApproval(){
      if(this.reviewCode === '0'){
        this.$toast('审批中！');
      } else if(this.reviewCode === '1'){
        this.$router.push({path: '/sign'});
      } else if(this.reviewCode === '2'){
        this.$router.push({path: '/exam'});
      } else if(this.reviewCode === '3'){
        this.$router.push({path: '/approval'});
      } else if(this.reviewCode === '6' && this.listData.returnCode != null  && this.listData.returnCode != ''){
          let mistakeData = this.listData.returnCode.split(",")
          if(mistakeData.indexOf('I') != -1 || mistakeData.indexOf('B') != -1 || mistakeData.indexOf('D') != -1 || mistakeData.indexOf('P') != -1){
            //如果有一个就跳转approval页面
            this.$router.push({ name: 'approval', params: { 'mistakeData': mistakeData} });
          }else{
              this.$router.push({ name: 'sign', params: { 'mistakeData': mistakeData} });
          }
      }else{
        this.showComfirm = true

      }
     
    },
    cancel () {
      this.showComfirm = false
      this.showTips = true
    },
    closeTips () {
      this.showTips = false
      this.$router.replace({path: '/home'});
    },
    confirm () {
      this.$router.push({path: '/approval'});
    },
    //生成当前时间
    presentTime(){
      var today=new Date();
      var y=today.getFullYear();
      var m=today.getMonth();
      var d=today.getDate();
      var h=today.getHours();
      var i=today.getMinutes();
      var s=today.getSeconds();// 在小于10的数字钱前加一个‘0’
      m=m+1;
      d= this.checkTime(d);
      m= this.checkTime(m);
      h= this.checkTime(h);
      i= this.checkTime(i);
      s= this.checkTime(s);
      return y +'-'+ m +'-'+ d + ' ' + h + ':' + i + ':' + s
    },
     //生成当前时间(不带时分秒)
    presentDate(){
      var today=new Date();
      var y=today.getFullYear();
      var m=today.getMonth();
      var d=today.getDate();
      m=m+1;
      d= this.checkTime(d);
      m= this.checkTime(m);
      return y +'-'+ m +'-'+ d
    },
    checkTime(i){
        if (i<10){
            i="0" + i;
        }
        return i;
    }

  }
};
</script>
<style lang="less" scoped>
// @import './../../assets/less/app/account/integralList.less';
.integral_name{
    display: flex;
    align-items: center;
    background: #0252FF;
    padding: 0.5rem 1.25rem;
    padding-bottom: 5rem;
    position: relative;
    color: #ffffff;
    .name{
      font-size: 1.1rem;
      margin: 1rem 0.5rem 1rem 0;
    }
    .tag{
      display: block;
      float: left;
      height: 1rem;
      background: #6db1de;
      border-radius: 0.5rem;
      font-size: 0.6rem;
      line-height: 1rem;
      padding: 0 0.5rem;
    }
   
}
.padding_top{
  padding: 0 0.75rem;
  margin-top: -5rem;
}
.mt_5{margin-bottom: 0.5rem;}
.fszize_16{font-size: 16px;}
.wire{
  margin: 6px 0;
}
.data_gather{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .data_gather_target{
        display: block;
        font-size: 12px;
        margin: 0;
      }
      .img_w{
        width: 1rem;
      }
}
.signIn_bt{
  padding: 0 28px;
}
.list_task{
  display: flex;
  align-items: center;
  .task_img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .list_task_centre{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #eee;
    height: 70px;
    font-size: 14px;
    .task_centre{
      p{margin: 0;}
      .task_centre_integral{color: #FDB952;}
    }
  }
  .finish_bt{
    padding: 0 8px;
  }
}
//签署弹窗
.confirmdialog{
  width: 280px;
  overflow:visible;
  .van-dialog__content{
    background: linear-gradient( to left, #53bcf6 , #7ccdf9);
    color: #fff;
    padding: 1rem;
    text-align: center;
    border-radius: 0.8rem 0.8rem 0 0;
  }
  .confirmdialog-huan{
    text-align: center;
    img{
      width: 7rem;
      display: block;
      margin: -3rem auto 0 auto;
    }
  }
  .van-dialog__footer{
    border-radius: 0 0 0.8rem 0.8rem;
  }
}
.passed{
    font-size: 12px;
    margin-left: 4px;
    color: #C1C1C1;
}
</style>
