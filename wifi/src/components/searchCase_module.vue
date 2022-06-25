<template>
  <div class="searchbox">
    <div class="searchleft">
      <span class="icon">当前位置：</span>
      <span class="location">{{moduleName}}</span>
    </div>
    <div class="searchright">
<!--      <el-input v-if="this.getToIndex.path == '/vehicle'" v-model.trim="car"  placeholder="在此处输入要搜索的车牌号码" @blur='searchCar'  @keyup.enter="searchCar"></el-input>
      <el-input v-else v-model.trim="car"  placeholder="请输入您要查找的模块的名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchCar">搜索</el-button>
      <div v-show="searchErr" id="searchErr" class="searchErr">车牌号格式输入不正确！</div>-->
      <el-input placeholder="请输入案件名称搜索案件" v-model.trim="keyword"></el-input>
      <el-button type="primary"  icon="el-icon-search" @click="getSearchCondition()">搜索</el-button>
    </div>
  </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    export default {
        name: "search_module",
        props: ["moduleName"],
        data(){
          return{
            car:"",
            searchErr: false,
            keyword:''
          }
        },
        computed:{
          ...mapState([
            'toIndex',
          ]),
          ...mapGetters([
            'getToIndex'
          ]),
        },
        methods:{

          getSearchCondition() {
            if(this.keyword===''||this.keyword===null){
              //this.$alert("请输入搜索关键字")
              return;
            }
            sessionStorage.removeItem("caseSearchCondition");
            let SearchCondition = {
              /*基本信息*/
              keyword: this.keyword
            };
            sessionStorage.setItem('caseSearchCondition', JSON.stringify(SearchCondition));
            this.goToCaseRetrievalSearch()
          },

          goToCaseRetrievalSearch() {
            this.$router.push({path:'/casestudy/caseInfomanage',query:{menuCode:202}});
            // this.$router.push('/casestudy/caseRetrievalSearch?menuCode=200')
          },
        }
    }
</script>

<style scoped>
  .searchbox{
    min-width: 1200px;
    position: fixed;
    top: 0.6rem;
    left: 0;
    width: 100%;
    display: flex;
    height: 0.54rem;
    /* background: #edf0f5; */
    align-items: center;
    justify-content: space-between;
   border-bottom: 1px solid #333232;
    box-shadow: 0 1px 1px #333232;
  }
  .searchleft{
    width:6.3rem;
    font-size: 0.16rem;
    margin-left: 0.3rem;
  }
  .searchleft .icon{
    display: inline-block;
    color: #757575;
    background: url("../assets/images/sysmanage/home.png") no-repeat;
    text-indent: 0.24rem;
  }
  .searchleft .location{
    color: #3685cb;
    font-size: 0.18rem;
  }
  .searchright{
    flex: 2;
    display: flex;
    align-items: center;
    position: relative;
  }
  .searchbox .el-input{
    width: 6.5rem;
    margin-right: 0.2rem;
  }
  .searchErr{
    position: absolute;
    background: red;
    color:#fff;
    left:4.4rem;
    width:2rem;
    font-size:0.14rem;
    line-height: 0.24rem;
    padding: 0.04rem;
    padding-left: 0.08rem;
  }
  .searchErr::after{
    content: " ";
    position: absolute;
    top: 0.1rem;
    left: -1px;
    height: 0.09rem;
    width: 0.09rem;
    margin-left: -0.03rem;
    transform: rotate(-45deg);
    background: red;
  }
  .searchbox .el-button{
    height:0.41rem;
    padding: 0 0.2rem;
    font-size:0.14rem;
    line-height:0.41rem;
  }
  .searchright >>> .el-input__inner{
    font-size:0.14rem;
    height:0.41rem;
    padding: 0 0.2rem;
    padding-right:2.2rem;
    line-height:0.41rem;
  }
</style>
