const mixins = {
  data: function () {
    return {
      NameMust:false,//文本
      textLength:false,//长度,   //50字
      caseNumberMust: false, //案件编号
      caseNameMust: false,  //案件名称
      caseDateMust: false, //开始时间
      caselngMust: false,  //正确的经度
      caselatMust: false,  //正确的维度
      caseTypeMust: false,  //案件类型
      caseStateMust: false,  //案件状态
      caseLocationMust:false,  //案发详细地址长度
      caseDescribeLen:false,  //描述长度
      emptyMust:false,  //表示空
      tenLength:false,  //10个字符
      oneHundlength:false,  // 100个字符
      phoneNum:false,  //电话
      idCard:false,  //身份证
    }
  },
  methods: {
    // 长度50的验证
    getverify(){
      if(this.btnlibText.length > 50){
        this.textLength = true;
        setTimeout(()=>{
          this.textLength = false;
        },1000)
        return
      }
    },
  }
};
export default mixins
