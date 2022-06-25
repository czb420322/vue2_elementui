<template>
    <div class="manage">
        <Header />
        <div class="wrapper">
        <div class="searchbox">
            <div class="searchleft">
                <span class="icon">当前位置：</span>
                <span class="location">分析中心页面</span>
            </div>
            <el-input  placeholder="请输入您要查找的模块的名称"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="manageConten">
            <p class="sysmanage">
                <span class="line"></span>
                <span class="text">分析中心</span>
            </p>
            <ul class="syslist">
                <router-link tag="li" to="/manage/departmentManage" class="item department"></router-link>
                <li class="item user"></li>
                <router-link tag="li" to="/manage/roleManage" class="item role"></router-link>
                <router-link tag="li" to="/manage/logManage" class="item log"></router-link>
                <router-link tag="li" to="/manage/dicManage" class="item dictionary"></router-link>
                <li class="item module"></li>
                <li class="item quitpment"></li>
                <li class="item opration"></li>
                <li class="item store"></li>
                <li class="item timesync"></li>
                <li class="item oprationcopy"></li>
            </ul>
            <p class="sysmanage messageNotic">
                <span class="line"></span>
                <span class="text">消息中心</span>
            </p>
            <ul class="syslist">
                <li class="item msgtake message"></li>
                <li class="item msgnotic message"></li>
            </ul>
        </div>
    </div>
    <router-view></router-view>
    </div>
</template>
<script>
import Header from '../../components/header'
  export default {
    data(){ 
      return {
         list:[],
        //  status:""
      }
    },
    computed: {
     
    },
    created () {
     
    },
    mounted(){
      
    },
    components:{
      Header
    },
    methods:{
     
    }
  }
</script>
<style  scoped>
    /* .manage{
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
    } */
    .wrapper{
        width: 100%;
        height: 100%;
        overflow-y: scroll
    }
    .wrapper::-webkit-scrollbar{
        display: none;
    }
    .searchbox{
        display: flex;
        height: 62px;
        background: #edf0f5;
        align-items: center
    }
    .searchleft{
        font-size: 16px;
        margin-left: 30px;
    }
    .searchleft .icon{
        display: inline-block;
        color: #757575;
        background: url("../../assets/images/sysmanage/home.png") no-repeat;
        text-indent: 24px;
    }
    .searchleft .location{
        color: #3685cb;
    }
    .searchbox .el-input{
        height: 36px;
        width: 770px;
        margin: 0 20px 0 310px;

    }
    .searchbox .el-button{
       height: 36px;
    }
    .manageConten{
        margin: 36px 36px 0 36px;
    }
    .messageNotic{
        margin-top: 36px;
    }
    .sysmanage{
        width: 100%;
        display: flex;
        padding-bottom: 10px;
        border-bottom: 2px solid #189aea
    }
    .line{
        margin-left: 4px;
        width: 4px;
        height: 24px;
        border-radius: 2px;
        background: #409eff;
    }
    .text{
        color: #409eff;
        margin-left: 10px;
        font-size: 18px;
    }
    .syslist{
        overflow: hidden;;
    }
    .item{
        float: left;
        width: 296px;
        height: 156px;
        margin: 16px 3px 0 3px;
        cursor: pointer;
    }
    .department{
        background: url("../../assets/images/sysmanage/department.png")
    }
    .user{
       background: url("../../assets/images/sysmanage/user.png")
    }
    .role{
       background: url("../../assets/images/sysmanage/role.png")
    }
    .log{
       background: url("../../assets/images/sysmanage/log.png")
    }
    .dictionary{
       background: url("../../assets/images/sysmanage/dictionary.png")
    }
    .module{
       background: url("../../assets/images/sysmanage/module.png")
    }
    .quitpment{
       background: url("../../assets/images/sysmanage/quitpment.png")
    }
    .opration{
       background: url("../../assets/images/sysmanage/opration.png")
    }
    .store{
       background: url("../../assets/images/sysmanage/store.png")
    }
    .timesync{
       background: url("../../assets/images/sysmanage/timesync.png")
    }
    .oprationcopy{
       background: url("../../assets/images/sysmanage/oprationcopy.png")
    }
    .msgtake{
       background: url("../../assets/images/sysmanage/msgtake.png")
    }
    .msgnotic{
       background: url("../../assets/images/sysmanage/msgnotic.png")
    }
</style>
