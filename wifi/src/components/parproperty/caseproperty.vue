<template>
    <div class="detail">
        <div class="ownNature oneNature">
            <p class="natureName">案件属性</p>
            <p class="natureName">案件编号</p>
            <p class="natureName">案件名称</p>
            <p class="natureName">案发时间</p>
            <p class="natureName">案发区域</p>
            <p class="natureName">案件类型</p>
            <p class="natureName">作案时机</p>
            <p class="natureName">危害程度</p>
            <p class="natureName">作案手段</p>
            <p class="natureName">侵犯目标</p>
            <p class="natureName">作案工具</p>
            <p class="natureName">案件状态</p>
            <p class="natureName operation">操作</p>
        </div>
        <div class="ownNature twoNature">
            <p class="natureName natureNamefirst">原点案件</p>
            <p class="natureItem" :title="dataCaseInfo.caseLinkMark">{{ dataCaseInfo.caseLinkMark }}</p>
            <p class="natureItem" :title="dataCaseInfo.caseName">{{ dataCaseInfo.caseName }}</p>
            <p class="natureItem" :title="dataCaseInfo.timeLowLimit">{{ dataCaseInfo.timeLowLimit }}</p>
            <p class="natureItem" :title="dataCaseInfo.regionFullName">{{ dataCaseInfo.regionFullName }}</p>
            <p class="natureItem" :title="dataCaseInfo.caseCategoryDesc">{{ dataCaseInfo.caseCategoryDesc }}</p>
            <p class="natureItem" :title="dataCaseInfo.caseOpportunityDesc">{{ dataCaseInfo.caseOpportunityDesc }}</p>
            <p class="natureItem" :title="dataCaseInfo.caseLevelDesc">{{ dataCaseInfo.caseLevelDesc }}</p>
            <p class="natureItem" :title="dataCaseInfo.caseMethodDesc">{{ dataCaseInfo.caseMethodDesc }}</p>
            <p class="natureItem" :title="dataCaseInfo.caseTargetDesc">{{ dataCaseInfo.caseTargetDesc }}</p>
            <p class="natureItem" :title="dataCaseInfo.caseToolDesc">{{ dataCaseInfo.caseToolDesc }}</p>
            <p class="natureItem" :title="dataCaseInfo.stateDesc">{{ dataCaseInfo.stateDesc }}</p>
            <p class="natureItem operation"></p>
        </div>
        <div  v-for="(item,index) in candidate" :key="index" :class="{active:isActive = ((index+1)/5 == 0)}" class="ownNature threeNature">
            <p class="natureName natureNamefirst">候选案件</p>
            <p class="natureItem" :title="item.caseLinkMark">{{ item.caseLinkMark }}</p>
            <p class="natureItem" :title="item.caseName">{{ item.caseName }}</p>
            <p class="natureItem" :title="item.timeLowLimit">{{ item.timeLowLimit }}</p>
            <p class="natureItem" :title="item.regionFullName">{{ item.regionFullName }}</p>
            <p class="natureItem" :title="item.caseCategoryDesc">{{ item.caseCategoryDesc }}</p>
            <p class="natureItem" :title="item.caseOpportunityDesc">{{ item.caseOpportunityDesc }}</p>
            <p class="natureItem" :title="item.caseLevelDesc">{{ item.caseLevelDesc }}</p>
            <p class="natureItem" :title="item.caseMethodDesc">{{ item.caseMethodDesc }}</p>
            <p class="natureItem" :title="item.caseTargetDesc">{{ item.caseTargetDesc }}</p>
            <p class="natureItem" :title="item.caseToolDesc">{{ item.caseToolDesc }}</p>
            <p class="natureItem" :title="item.stateDesc">{{ item.stateDesc }}</p>
            <p class="natureItem operation naBtn">
                <el-button :title="item.iscase ? '已添加串并' : ''" type="primary" class="searchBtn" :disabled="item.iscase" @click="addCaseToList(item)">添加</el-button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          isActive: false
        };
    },
    props:{
      dataCaseInfo:Object,
      candidate:Array
    },
    mounted() {
        console.log(this.dataCaseInfo, 'dataCaseInfodataCaseInfodataCaseInfo---------');
    },
    components: {},
    methods: {
      //添加案件到案件池子
      addCaseToList(row){
        this.$emit('appendCase',row)
      },
    }
};
</script>

<style scoped>
@import '../../assets/css/commom.css';
.detail {
    margin-top: 0.1rem;
    overflow: hidden;
    /* font-size: 0.12rem; */
}
.ownNature {
    float: left;
}
.oneNature {
    width: 1.2rem;
}
.ownNature p {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    border-top: 1px solid #112845;
    border-left: 1px solid #112845;
}
.twoNature,
.threeNature {
    width: 1.81rem;
    line-height: 0.3rem;
}
.twoNature p {
    border-right: 1px solid #112845;
}
.twoNature p:last-child,
.operation {
    border-bottom: 1px solid #112845;
}
.threeNature p {
    border-top: 1px solid #112845;
    border-left: 0;
    border-right: 1px solid #112845;
}
.naBtn .el-button {
  padding: 0 0.2rem;
  height: 0.2rem;
  font-size: 0.12rem !important;
}
.natureItem{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
