<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link tag="div" to="/carJudged?menuCode=300" class="nav-item">车辆研判</router-link>
      <div class="nav-item nav-item-search">车辆实时监测</div>
    </div> -->
     <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:300}}">车辆研判 > </router-link>
      <p class="sysname">&nbsp;车辆实时监测</p>
    </div>

    <div class="contentBody">
      <div class="contentLeft">
        <div class="jkTitle">| 监控区域</div>
        <div class="jkList">
          <div class="jkTxt"><input type="text" placeholder="请输入卡口名称" v-model="filterText"><i class="el-icon-search"></i></div>
          <div class="jkTree">
            <el-tree
              class="filter-tree"
              highlight-current
              :data="list"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree2">
            </el-tree>
          </div>
        </div>
      </div>

      <!--监控区域-->
      <div class="content">
        <monit-detail :tollgateId="curTollgateId" :tollgateIdP="curTollgateIdP"></monit-detail>
        <footer-third></footer-third>
      </div>

    </div>

  </div>
</template>

<script>

  import  vehicle from '../../api/vehicle/vehicle.js'
  import monitDetail from './monitDetail'
  import footerThird from '../../components/footer_third'
  export default {
    components: {
      monitDetail, footerThird
    },

    data() {
      return {
        filterText:'',//搜索点位
        list: [],
        defaultProps: {
          children: "apeTollgates",
          label: "name"
        },
        curTollgateId: null, //"3eba8107-a5e1-4c69-9e6a-60639fcdee0f",
        curTollgateIdP: null
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mixins:[vehicle],
    methods: {

      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        if(!data.apeTollgates){
          this.curTollgateId = data.kakouId;  //卡口ID
          this.curTollgateIdP = data.name;    //卡口名字
        }
      },
      //获取卡口列表
      getTollgates (){
        this.getTollgateList((res)=>{
          this.list = res.data.data;
        });
      },

    },

    mounted() {
      this.getTollgates();
    }
  }


</script>


<style scoped>
@import "../../assets/css/commom.css";
  .wrapper {
    margin-top: 0.6rem;
    padding-top: 1px;
  }

  /* .topNav {
    position:fixed;
    top: 0.6rem;
    left:0;
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    height: 0.54rem;
    background: #F5F7FA;
    border-bottom: 1px solid #dcdfe6;
    box-shadow: 0 1px 1px #cdcdcd;
  } */

  /* .nav-item {
    min-width: 2.05rem;
    line-height: 0.54rem;
    text-align: center;
    font-size: 0.2rem;
    cursor:pointer;
  }
  .nav-item-search {
    height: 100%;
    background: url(../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
  } */

  .contentBody{
    display: flex;
    height: calc(100vh - .9rem - 2px);
    padding: 0.1rem;
    padding-bottom: 0rem;
  }
  .contentLeft{
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width: 4rem;
    background-color: rgba(16, 35, 56, 0.5);
    border: 3px solid #1a3659;
    border-right:none;
  }
  .jkTitle {
    height:0.45rem;
    padding-left: 0.2rem;
    line-height: 0.45rem;
    font-size: 0.16rem;
    /* color: white;
    background-color: #409EFF; */
    color: #c0c0c0;
    background-color: rgba(19, 41, 66, .9);
  }
  .jkList {
    flex: 1;
    display:flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: space-between;
  }
  .jkTxt{
    position:relative;
  }
  .jkTxt input{
    display:block;
    margin: 0.1rem auto;
    width:2.9rem;
    height: 0.38rem;
    padding: 0.05rem 0.22rem 0.05rem 0.05rem;
    border-radius: 0.05rem;
    border:1px solid #dcdfe6;
    font-size:0.14rem;
  }
  .jkTxt .el-icon-search{
    position:absolute;
    top:0.2rem;
    left: 3rem;
    z-index: 8;
    font-size: 0.16rem;
    color: #99c9fa;
    cursor: pointer;
  }
  .jkTree{
    flex:1;
    overflow-y:scroll;
    padding: 0 0.1rem;
    height: 730px;
  }

  .jkTree .el-tree >>> .el-tree-node__label{
    font-size:0.14rem;
  }
  .content {
    position: relative;
    flex:1;
    display: flex;
    flex-direction: column;
    background-color: rgba(16, 35, 56, 0.5);
    border: 3px solid #1a3659;
  }
  .el-tree >>> .el-tree-node__children>.el-tree-node>.el-tree-node__content>.el-tree-node__label::before{
  display: inline-block;
  margin-right: 7px;
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAA+UlEQVQokbWPPU4CURSFv/czkAyBiQ0ORGNiZ4wLcA0WFgY6p7SksHMLLIDQQiXTmNhauQO3YCExYyCDZIA4LzwbxkJfMY0nucU9OV/uuaIzSl+AY/7qA7gCgjgKngtTdEapnb4nF7/T7bA5Ac631j5KISZxFNwBaOAT4CvPV0W45vv7wAxIBOzlxpx0x4sh0JOOKli7NYAXR0EihOh7WqfAEXCoXcB6vZkDre54cQs87aYCnDkBC3Y2T68b9dqlUupmZxsp5akTAFhm2dsyywbFrrWqHrTCB+cPLkkhFWBKAz/gvwMaaABUPM8vka9r4LUdNu9LHph+A9q2Q0DSk+vlAAAAAElFTkSuQmCC);
}
.el-tree >>> .el-tree-node__content>.expanded::before{
  display: inline-block;
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADKSURBVDhPY/z//z8DCPw9lecGpIKA+CMQ/wOJ4QB8QHwPWWPXmXv/RUBsRjDCDn79ZfhrqcooyATlw8HrTww/Xn1i+I4Lf/3B8AekDkMjsYAqGkEBgtNv6ABZI9u//3hDEwWANQJD1PPZewaZt58ZfoJFiQBMQE19QE2JD9/8/wQVIwqAbJS68ez/uw9fGX5BhIgDMD8SHSgwgBw4JAHGPydzlx+//f8rOwsDM1QML/j1h+GvBTDJgTQGA/mOQPwBLEMY8DMwMNwEAO+nV0EjCPpFAAAAAElFTkSuQmCC);
}


</style>

