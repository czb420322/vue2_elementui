<template>
  <div class="taskMange">
     <el-dialog
        title="文件导出进度"
        :visible.sync="dialogVisible"
        @close="closeDia"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        @open="opendia"
        width="30%">
        <div class="taskrelation">
          <div>
            <p>生成图片进度</p>
            <el-progress :percentage="approveProportion" color="#67C23A"></el-progress>
          </div>
           <div>
            <p>生成zip包进度</p>
            <el-progress :percentage="zipProportion" color="#67C23A"></el-progress>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false"></el-button>
            <el-button  @click="dialogVisible = false"></el-button>
        </span> -->
    </el-dialog>

  </div>
</template>

<script>

export default {
  data(){
    return{
      dialogVisible:false,
      approveProportion:0,
      zipProportion:0,
      timeId:null
    }
  },
  mounted(){

  },
  watch:{
    openderive(val){
      this.dialogVisible = val
    }
  },
  props:{
    openderive:Boolean,
    keys:String
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.$emit('childbyderive',false);
      this.approveProportion = 0
      this.zipProportion = 0
    },
    //打开模态框
    opendia(){
      this.timeId = setInterval(()=>{
        this.getProress();
      },2000)
    },
    getProress(){
      let data = {
        key:this.keys
      }
      this.$http.get('sms/faceExport/getExportDirProgressBar',{params:data}).then(res=>{
        if(res.data.code == 200){
          if(res.data.data.split('|')[0] == 0){
            this.approveProportion = Number(res.data.data.split('|')[1])
          }else if(res.data.data.split('|')[0] == 1){
              this.approveProportion = 100

              this.zipProportion = Number(res.data.data.split('|')[1])
              if(this.zipProportion == 100){
                setTimeout(()=>{
                  clearInterval(this.timeId);
                  this.$emit('childbyderive',false)
                },1000)
              }
          }
          // else if(res.data.data.split('|')[0] == 1){


          // }

          // if(res.data.data.split('|')[0] == 1){
          //   this.approveProportion = Number(res.data.data.split('|')[1])
          //   setTimeout(()=>{
          //     this.zipProportion = Number(res.data.data.split('|')[1])
          //     setTimeout(()=>{
          //       clearInterval(this.timeId);
          //       this.$emit('childbyderive',false)
          //     },1000)
          //   },1000)
          // }
          // if(this.approveProportion == 100){
          //   setTimeout(()=>{
          //     this.zipProportion = 100
          //     setTimeout(()=>{
          //       clearInterval(this.timeId);
          //       this.$emit('childbyderive',false)
          //     },1000)
          //   },1000)
          // }
        }
      })
    }
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
.taskrelation {
  color: #99c9fa;
}
.taskrelation /deep/ .el-progress__text{
    color: #99c9fa;
}
.taskrelation div{
  margin-bottom: 0.2rem;
}
.el-dialog__wrapper /deep/ .el-dialog{
  min-width: 0rem;
}
</style>
