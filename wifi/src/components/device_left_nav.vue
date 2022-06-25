<template>
  <div>
    <div class="device_nav">
      <!-- <div class="device_cont"> -->
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
            <div class="ss">
              <span>视频设备：</span>
              <el-input placeholder="请输入内容" v-model="input4">
                <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button>
              </el-input>
            </div>
            <div class="device_tree">
              <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="消息中心">消息中心</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>

  export default {
    data(){
     return {
        data: [{
          label: '贵阳市公安局视频监控点位',
          children: [{
            label: '监控平台点位',
            children: [{
              label: '乌当区',
              children: [{
                label: '点位1'
              },{
                label: '点位2'
              },{
                label: '点位3'
              }]
            },{
              label: '松山湖区',
              children: [{
                label: '点位1'
              },{
                label: '点位2'
              },{
                label: '点位3'
              }]
            },{
              label: '乌当区2',
              children: [{
                label: '点位1'
              },{
                label: '点位2'
              },{
                label: '点位3'
              }]
            }]
          },{
            label: '离线平台点位',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    created () {
     console.log(this.currentUser)
    },
    components:{

    },
    computed:{

    },
    methods:{
      handleNodeClick(data) {
        console.log(data);
      },
      pop:function(){
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-tree{
//   color: red;
//   font-size: 40px;
// }
.el-input{
  border-radius: 0;
}
.el-input .el-button{
  background: #66b1ff;
  // color: yellow;
  color:white;
  border-radius: 0;
}
.el-tabs--border-card{
  width: 450px;
}
.device_nav{
  display: flex;
  height: 850px;
  width: 430px;
  background: pink;
  position: absolute;
  z-index: 10;

  .ss{
    display: flex;
    span{
      font-size: 14px;
      width: 30%;
      display:flex;
      align-items: center;
    }
  }
  .device_tree{
    margin-top:5px;
    font: 10px;
  }
}
</style>
