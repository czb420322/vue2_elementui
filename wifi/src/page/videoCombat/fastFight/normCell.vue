<template>
  <div>
    <el-dialog title="标准采集" :visible.sync="dialogVisible" :append-to-body="true"
    :close-on-click-modal="false" width="70%" @open="openDialog" @close="closeDia">
      <div class="normMain" style="height:6.48rem">
        <div class="normMain_left">
          <p class="norm_top">标准采集</p>
          <p class="norm_center">
            <input type="text" v-model="filterText" placeholder="请输入设备名称">
            <el-button class="el-icon-search searchBtn"></el-button>
          </p>
          <el-tree :data="societyData"
          :filter-node-method="filterNode"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all ref="tree"></el-tree>
        </div>
        <div class="normMain_right">
          <div class="mapContent" id="allmap"></div>
          <img class="dingwei" src="../../../assets/case/quickPos.png" @click="getinits" />
          <div class="point">
            <span>经度：{{point.lng}}</span><br>
            <span>纬度：{{point.lat}}</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"></el-button>
        <el-button @click="dialogVisible = false"></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import normData from "../../../api/newCaseVideo/normData.js";
import maps from '../../../api/realvideo/map.js'
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  props: {
    openNormCell: Boolean
  },
  mixins:[normData,maps],
  watch:{
    //父组件传过来的数据
    openNormCell(val){
      this.dialogVisible = val
    }
  },
  computed: {
    ...mapState(["map", "videolist", "markerData"])
  },
  methods:{
    closeDia(){
      this.$emit('childbyNorm',false)
    },
    //打开模态框
    openDialog(){
      this.$nextTick(()=>{
         this.InitMainMap('allmap');
         this.querySocietyData();
      })

    },
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.normMain_left{
  width: 25%;
  height: 100%;
  float: left;
  background-color: rgba(16, 35, 56, 0.5);
   border: 1px solid rgba(15, 44, 79, 0.5);
}
.normMain_right{
  width: 75%;
  height: 100%;
  margin-left: 25%;
  padding: 0.1rem;
  background-color: rgba(16, 35, 56, 0.5);
   border: 1px solid rgba(15, 44, 79, 0.5);
   position: relative;
}
.normMain_right img{
  position: absolute;
  top: 215px;
  right: 47px;
}
.normMain_right #allmap{
  width: 100%;
  height: 100%;
  border: 1px solid yellow;
}
.point{
  position: absolute;
  bottom: 0.15rem;
  left: 0.15rem;
  font-size: 0.14rem;
}
.el-dialog__wrapper /deep/ .el-dialog .el-dialog__body {
  padding: 0rem !important;
}
.norm_top{
  line-height: 0.4rem;
  padding: 0 0.2rem;
  background-color: rgba(20,57,96,0.8);
  color: #fff;
}
.norm_center{
  line-height: 0.3rem;
  padding: 0 0.2rem;
  margin:0.15rem 0;
  position: relative;
}
.norm_center input{
  height: 0.3rem;
  width: 100%;
  border-radius: 3px;
  padding-left: 0.1rem;
}
.norm_center .el-button{
  padding: 0 0.15rem;
  position: absolute;
  top:0;
  right: 0.2rem;
  height: 0.3rem;
}
.el-dialog .el-tree{
  width: 93%;
  background-color: rgba(16, 35, 56, 0.5);
  padding:0 0.2rem;
  height: 100%;
}
/* .el-tree >>> .el-tree-node__label{
  font-size: 0.14rem;
  color: #99c9fa;
}
.el-tree >>> .el-tree-node__content:hover{
  background-color: #2e93fb;
  color: #fff !important;
}
.el-tree >>> .el-tree-node:focus>.el-tree-node__content{
  background-color: #2e93fb;
} */


  .el-tree >>> .el-tree-node__label::before{
    display: block;
    content: '';
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
#allmap >>> .BMap_bubble_content #uploads,
#allmap >>> .BMap_bubble_content #upload{
  color: #409EFF;
}

</style>
