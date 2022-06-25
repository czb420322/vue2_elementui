<template>
  <div>


  </div>
</template>

<script>
import videoDown from '../../api/casestudy/videoDown.js'

export default {
  data(){
    return{
    }
  },
  mixins:[videoDown],
  created(){
    let data = {
      // caseUuid: '', //案件ID
      caseLinkMark: '', //案件编号
      caseName: '未知', //案发名称
      timeLowLimit: this.getCurrentDate(), //案发开始时间
      timeUpLimit: this.getCurrentDate(), //案发结束时间
      placeCode: sessionStorage.getItem("defaultRegion"), //区/县 简码
      placeFullAddress: '', //案发详址
      longitude: '', //案发经度
      latitude: '', //案发纬度
      state: 0, //案件状态
      caseCategoryDesc: '其他', //案件类型
      caseToolDesc: '未知', //作案工具
      caseMethodDesc: '未知', //作案手段
      caseLevelDesc: '未知', //危害程度
      caseTargetDesc: '未知', //侵犯目标
      caseOpportunityDesc: '未知', //作案时机
      caseAbstract: '', //简要案情
      isSpecial: 0 //协同作战状态
    };
     data = this.$qs.stringify(data);
        console.log(this.caselng,1111);
        this.$http.post("pca/casemng/baseinfo/save", data).then(res => {
          let caseUuid = res.data.data.caseUuid
          this.$router.push({path:"/videoCombat/addcasetwo",query:{menuCode: '200',specialCase:true,caseUuid:caseUuid}});
        })
    // this.$router.push({path:"/casestudy/caseInfomanage/addcasetwo",query:{menuCode: '200',specialCase:true,caseUuid:''}});  //跳转到车牌搜车
    // this.$router.path()
          // 121:['specail','/casestudy/caseInfomanage/addcasetwo?showcase=true'],  //专案侦查
//
  },
  mounted(){

  },
  watch:{

  },
  props:{

  },
  methods:{

  }

}
</script>


<style scoped>
</style>
