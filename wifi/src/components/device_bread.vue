<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>
<script>

  export default {
    data(){
      return {
         list:[]
      }
    },
    created () {
     console.log(this.currentUser)
    },
    components:{

    },
    computed:{
      
    },
    methods:{
     
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
