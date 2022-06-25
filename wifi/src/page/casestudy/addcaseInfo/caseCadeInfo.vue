<template>
  <div class="taskMange">
     <el-dialog
        title="串案申请详细信息"
        :visible.sync="dialogVisible"
        @close="closeDia"
        @open="opendia"
        width="70%">
        <span class="taskrelation">
55555555

        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false"></el-button>
            <el-button  @click="dialogVisible = false"></el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data(){
    return{
      dialogVisible:false
    }
  },
  mounted(){

  },
  watch:{

  },
  props:{

  },
  methods:{
    //关闭模态框
    closeDia(){

    },
    //打开模态框
    opendia(){

    },
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';

</style>
