<template>
  <div class="taskMange">
     <el-dialog
        title="SDK列表"
        :visible.sync="dialogVisible"
        @close="closeDia"
	      :close-on-press-escape="false"
        :close-on-click-modal="false"
        @open="opendia"
        width="40%">
        <span class="taskrelation">
        <el-table ref="table" :data="sdkInfo" border style="width: 100%" class="tables" max-height="4.4rem">
          <div slot="empty">
            <div class="noImg">
              <img src="../assets/updataImg/NoData.png" />
            </div>
          </div>
          <el-table-column prop="name" show-overflow-tooltip label="SDK名称">
          </el-table-column>
          <el-table-column prop="expirationTime" show-overflow-tooltip label="到期时间">
          </el-table-column>
          <el-table-column prop="remainDay" show-overflow-tooltip label="剩余天数">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="affectedFeatures" label="影响功能">
          </el-table-column>
          <el-table-column prop="msg" show-overflow-tooltip label="提醒">
          </el-table-column>
          <el-table-column prop="status" show-overflow-tooltip label="状态">
            <template slot-scope="scope" class="fff200">
              <span class="styles" :class="'color'+scope.row.status">
                {{scope.row.status | Sdkstatus}}
              </span>

            </template>
          </el-table-column>
        </el-table>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary passBtn" @click="dialogVisible = false">确 定</el-button>
            <!-- <el-button  @click="dialogVisible = false"></el-button> -->
        </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapMutations, mapState,mapGetters } from 'vuex'  //引入vuex

export default {
  data(){
    return{
      dialogVisible:false
    }
  },
  mounted(){

  },
  watch:{
    opensdkInfo(val){
      this.dialogVisible = val
    }
  },
  computed:{
    ...mapGetters([
      'sdkInfo'
    ]),
  },
  props:{
    opensdkInfo:Boolean
  },
  filters:{
    Sdkstatus(cellValue){
      if(cellValue == 200){
        return '正常'
      }else if(cellValue == 300){
        return '快过期'
      }else if(cellValue == 400){
        return '已过期'
      }
    }
  },
  methods:{
    ...mapMutations([
      'setopenSDK'
    ]),
    //关闭模态框
    closeDia(){
      this.setopenSDK(false)
    },
    //打开模态框
    opendia(){

    },

  }

}
</script>


<style scoped>
@import '../assets/css/commom.css';
  .color200{
    color: #99c9fa;
  }
  .color300{
    color: yellow;
  }
  .color400{
    color: red;
  }

</style>
