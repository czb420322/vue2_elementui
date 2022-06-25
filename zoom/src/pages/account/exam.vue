<template>
  <div class="page-group">
		<div class="page page-current" id="exam-page">
            <!-- <header class="bar bar-nav">
	            <a class="button button-link button-nav pull-left back"><span class="icon icon-left"></span> &nbsp; </a>
	            <h1 class="title">考试</h1>
			      </header> -->
            <v-header class="bar bar-nav" :title="{ name: '考试' }"></v-header>
            <div class="content kaoshi-page" :style="{ 'margin-top': ($iosSystem + 48) + 'px', top: 0 }">
              <!-- <van-steps :active="active" class="mystep" active-color="#1989fa">
                <van-step>收集资料</van-step>
                <van-step>在线考试</van-step>
                <van-step>签署合同</van-step>
              </van-steps> -->
              <img width="100%" :src="$CTXBASE + '/img/account/approval_nav.png'" alt="">
              <div v-if="!isPass" class="list-block question">
                  <div class="question-info">
                    <div class="question-info-left">单选题</div>
                    <div class="question-info-right">已完成 <span>{{ hasAnswerNum }}</span>/{{ questionsNum }}</div>
                  </div>
                  <ul v-if="examQuestions.length>0" class="dn">
                      <li class="item-content question-title">
                          <div class="item-inner">
                              <div class="item-title">{{idx+1}}:{{ examQuestions[idx].examSubjectName }}</div>
                          </div>
                      </li>
                      <li v-if="examQuestions[idx].examSubjectType===1">
                          <label class="label-checkbox item-content">
                              <input v-model="examQuestions[idx].ansValue" @change="examSubjectAnswer(examQuestions[idx].id, 'A')" class="answerOne" value="A" type="radio" name="my-radio">
                              <div class="item-media"><i class="icon icon-form-checkbox "></i></div>
                              <div class="item-inner">
                                  <div class="item-title-row">{{ examQuestions[idx].examSubjectOne }}</div>
                              </div>
                          </label>
                      </li>
                      <li v-if="examQuestions[idx].examSubjectType===1">
                          <label class="label-checkbox item-content">
                              <input v-model="examQuestions[idx].ansValue" @change="examSubjectAnswer(examQuestions[idx].id, 'B')" class="answerTwo" value="B" type="radio" name="my-radio">
                              <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                              <div class="item-inner">
                                  <div class="item-title-row">{{ examQuestions[idx].examSubjectTwo }}</div>
                              </div>
                          </label>
                      </li>
                      <li v-if="examQuestions[idx].examSubjectType===1">
                          <label class="label-checkbox item-content">
                              <input v-model="examQuestions[idx].ansValue" @change="examSubjectAnswer(examQuestions[idx].id, 'C')" class="answerThree" value="C" type="radio" name="my-radio">
                              <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                              <div class="item-inner">
                                  <div class="item-title-row">{{ examQuestions[idx].examSubjectThree }}</div>
                              </div>
                          </label>
                      </li>
                      <li v-if="examQuestions[idx].examSubjectType===1">
                          <label class="label-checkbox item-content">
                              <input v-model="examQuestions[idx].ansValue" @change="examSubjectAnswer(examQuestions[idx].id, 'D')" class="answerFour" value="D" type="radio" name="my-radio">
                              <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                              <div class="item-inner">
                                  <div class="item-title-row">{{ examQuestions[idx].examSubjectFour }}</div>
                              </div>
                          </label>
                      </li>
                      <li v-if="examQuestions[idx].examSubjectType===2">
                          <label class="label-checkbox item-content">
                              <input v-model="examQuestions[idx].ansValue" @change="examSubjectAnswer(examQuestions[idx].id, 'true')" class="answerThree" value="true" type="radio" name="my-radio">
                              <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                              <div class="item-inner">
                                  <div class="item-title-row">是</div>
                              </div>
                          </label>
                      </li>
                      <li v-if="examQuestions[idx].examSubjectType===2">
                          <label class="label-checkbox item-content">
                              <input v-model="examQuestions[idx].ansValue" @change="examSubjectAnswer(examQuestions[idx].id, 'false')" class="answerFour" value="false" type="radio" name="my-radio">
                              <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                              <div class="item-inner">
                                  <div class="item-title-row">否</div>
                              </div>
                          </label>
                      </li>
                  </ul>
              </div>
              <div v-else class="list-block pass">
                <ul>
                  <li>
                    <!-- 通过 -->
                    <img v-if="totalScore>=examPassLine" class="passimg" src="./../../../public/img/account/passed.png">
                    <!-- 未通过 -->
                    <img v-if="totalScore<examPassLine" class="passimg" src="./../../../public/img/account/nopass.png">
                    <div v-if="totalScore>=examPassLine" class="pass-txt">
                      <p>签署合同即可加入</p>
                      <p>永创达保险销售有限公司个人保险代理</p>
                    </div>
                    <div v-if="totalScore<examPassLine" class="pass-txt">
                      <div>错题集:</div>
                      <div v-for="(que, idx) in examQuestions" :key="idx">
                        <p style="line-height: 24px;" v-if="que.ansValue!==que.examSubjectAns">第{{ idx+1 }}题,正确答案:{{ que.examSubjectAns }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="content-block mybtnbox" style="clear:both;padding-top:10px;">
                  <div v-if="!isPass&&idx>0" class="row">
                    <a @click="switchSubject(-1)" class="button">上一题</a>
                  </div>
                  <div v-if="!isPass&&idx<(questionsNum-1)" class="row">
                    <a @click="switchSubject(1)" class="button">下一题</a>
                  </div>
                  <div v-if="!isPass&&idx===9" class="row">
                    <a @click="findTotalScore" class="button button-fill">交卷</a>
                  </div>
                  <div v-if="isPass&& totalScore>=examPassLine" class="row">
                    <a @click="backStep" class="button">上一步</a>
                  </div>
                  <div v-if="isPass&& totalScore<examPassLine" class="row">
                    <a @click="backStep" class="button">放弃考试</a>
                  </div>
                  <div v-if="isPass && totalScore>=examPassLine" class="row">
                    <a @click="toSign" class="button button-fill">签署合同</a>
                  </div>
                  <div v-if="isPass && totalScore<examPassLine" class="row">
                    <a @click="reExam" class="button button-fill">再试一次</a>
                  </div>
              </div>
            </div>
		</div>
	</div> 
</template>

<script>
export default {
  data() {
    return {
      idx: 0,
      agentCode: localStorage.getItem('agentCode'),
      examId: null,
      examQuestions: [],
      questionsNum: 0,
      hasAnswerNum: 0,
      noAnswerIdx: '1，2，3，4，5，6，7，8，9，10，',
      totalScore: 0,
      examPassLine: null,
      data: {
        agentName: ''
      },
      // 是否通过考试
      isPass: false,
      active: 1,
    };
  },
  created() {
    this.fidnExamCenter();
    // setTimeout(() => {
    //   this.isPass=true;
    // }, 1500);
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    backStep: function(){
      // this.isPass=false;
      this.goback();
    },
    toSign:function(){
      this.$router.push({path: '/sign'});
    },
    switchSubject: function(add){
      var nextIdx=this.idx+add;
      if(nextIdx>=0&&nextIdx<=(this.questionsNum-1)){
        this.idx+=add;
      }
    },
    // 考试题库查询
    async fidnExamCenter() {
      const res = await this.$axios({
        url: this.$API.API_MY_FEC,
        method: 'post',
        params: {
          agentCode: this.agentCode
        }
      });
      // console.info('res:' + JSON.stringify(res));
      if(res.code === 0 && res.content){
        this.examPassLine=res.content.examPassLine;
        this.examId=res.content.id;
        this.findExamSubject();
      }
    },
    // async findExamList() {
    //   const res = await this.$axios({
    //     url: '/exam/findExamList',
    //     method: 'post',
    //     params: {
    //         id:1,
    //         agentCode: this.agentCode,
    //         examGrade: null,
    //         examTypeCode: 1,
    //         examName:"保险从业人员资格考试真题一",
    //         pageSize: 10,
    //         currentPage: 1,
    //         currentPageExam: 1
    //     }
    //   });
    //   console.info('res:' + JSON.stringify(res));
    //   if(res.code === 0 && res.content){
        
    //   }
    // },
    // 考试题目查询
    async findExamSubject() {
      const res = await this.$axios({
        url: this.$API.API_MY_FES,
        method: 'post',
        params: {
            examId:this.examId,
            agentCode: this.agentCode
        }
      });
      // console.info('res:' + JSON.stringify(res));
      if(res.code === 0 && res.content){
        this.examQuestions=res.content.list || [];
        //如果没有点击交卷把上次保存的答案清空，让用户重新做题（先这么处理）
        for(let i in  this.examQuestions){
           this.examQuestions[i].ansValue = ''
        }
        this.questionsNum=res.content.list.length;
      }
    },
    // 考试题目答案提交
    async examSubjectAnswer(subjectId, aswer) {
      const res = await this.$axios({
        url: this.$API.API_MY_EESA,
        method: 'post',
        params: {
            examId:this.examId,
            subjectId: subjectId,
            answer: aswer
        }
      });
      console.info('res:' + JSON.stringify(res));
      if(res.code === 0 && res.content && res.content.code === 0){
        console.info("答案提交成功");
        this.examQuestions[this.idx].ansValue=aswer;
        var examQuestions=this.examQuestions;
        var num=0;
        var noAnswerIdx="";
        for (var i = 0; i < examQuestions.length; i++) {
          const examQue = examQuestions[i];
          if(examQue.ansValue!==null && examQue.ansValue!==''){
            num+=1;
          } else {
            noAnswerIdx=noAnswerIdx+(i+1)+",";
          }
        }
        this.noAnswerIdx=noAnswerIdx;
        this.hasAnswerNum=num;
      } else {
        this.$toast("答案提交失败");
      }
    },
    // 考试分数查询
    async findTotalScore() {
      if(this.hasAnswerNum<this.questionsNum){
        var noAnswerIdx=this.noAnswerIdx.substring(0, this.noAnswerIdx.length-1);
        this.$toast("第"+noAnswerIdx+"题，尚未答题！");
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_MY_EFTS,
        method: 'post',
        params: {
            examId:this.examId
        }
      });
      // console.info('findTotalScore res:' + JSON.stringify(res));
      if(res.code === 0 && res.content && res.content.code === 0){
        this.totalScore=res.content.content.totalScore;
        if(this.totalScore >= this.examPassLine){
          this.isPass = true
          this.$toast("考试通过");
          this.updateExamGradeById();
        } else {
          this.isPass = true
          this.$toast("考试未通过");
        }
      } else {
        this.isPass = true
        this.$toast("考试未通过");
      }
    },
    reExam(){
      this.isPass=false;
      this.totalScore=0;
      this.hasAnswerNum=0;
      this.idx=0;
      this.noAnswerIdx='1，2，3，4，5，6，7，8，9，10，';
      this.fidnExamCenter();
    },
    // 考试通过，修改用户考试等级
    async updateExamGradeById() {
      const res = await this.$axios({
        url: this.$API.API_MY_EUEGB,
        method: 'post'
        // params: {
        //     examId:this.examId
        // }
      });
      // console.info('updateExamGradeById res:' + JSON.stringify(res));
      // if(res.code === 0 && res.content && res.content.code === 0){
      // } else {
      // }
    }
  }
};
</script>
<style lang="less" scoped>
.question{
  margin: 0.5rem 0;
}
.kaoshi-page {
    background: #f7f7f7;
	.question {
		.item-title{
			white-space: normal;
    }
    .question-title{
      .item-inner{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
      }
    }
	}
	label {
	  &.label-checkbox {
	    input[type="radio"]:checked {
	      & + .item-media {
	        i {
	          &.icon-form-checkbox {
              background: #0252ff;
	          }
	        }
	      }
	    }
	  }
	}
	.btnlink {
	  text-align: center;
	  display: block;
	  width: 50%;
	  padding: 0.5rem 0;
	}
	.mybtnbox {
     margin: 1rem;
     display: flex;
     .row{
       flex: 1;
       &:first-child{
         padding-right: 1rem;
       }
       &:last-child{
         padding-left: 1rem;
       }
     }
	  .button {
      height: 2.2rem;
      border-radius: 1.2rem;
      height: 2.2rem;
      line-height: 2.2rem;
      font-size: 0.9rem;
	    &.button-fill {
        background: #0252ff;
	    }
	  }
	}
}
.question-info{
  display: flex;
  padding: 1rem 0.7rem 0.2rem 0.7rem;
  div{
    flex: 1;
    &.question-info-right{
      text-align: right;
      span{
        color: #0252ff;
      }
    }
  }
}
.pass{
  text-align: center;
  margin: 0.5rem 0;
  .passimg{
    width: 60%;
    display: block;
    margin: 0 auto;
  }
  .pass-txt{
    text-align: center;
    padding-bottom: 1.5rem;
    p{
      margin: 0;
    }
  }
}
.mystep{
  padding:1rem 2rem 0.6rem 2rem;
  .van-step__icon{
    font-size: 1.2rem;
  }
  .van-step__circle-container{
    padding: 0;
  }
}

label > * {
    pointer-events: none;
}
</style>