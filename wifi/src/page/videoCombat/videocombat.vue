<template>
    <div class="manage">
        <!-- <Header /> -->
        <div class="wrapper">

        <div class="searchbox">
            <div class="searchleft">
                <span class="icon">当前位置：</span>
                <span class="location">视频侦查判页面</span>
            </div>
            <el-input  placeholder="请输入您要查找的模块的名称"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="manageConten">
            <p class="sysmanage">
                <span class="line"></span>
                <span class="text">视频查阅</span>
            </p>
            <ul class="syslist">
                <router-link v-for="(item,index) in this.video_search_list['mlist']" :key="index" tag="li" to="/manage/roleManage" class="item role">{{item.menuName}}</router-link>
            </ul>
            <p class="sysmanage messageNotic">
                <span class="line"></span>
                <span class="text">视频功能</span>
            </p>
            <ul class="syslist">
                <!-- <li class="item msgtake message"></li>
                <li class="item msgnotic message"></li> -->
                <router-link v-for="(item,index) in this.video_fun_list['mlist']" :key="index" tag="li" to="/manage/roleManage" class="item msgtake message">{{item.menuName}}</router-link>
            </ul>

             <p class="sysmanage messageNotic">
                <span class="line"></span>
                <span class="text">任务中心</span>
            </p>
            <ul class="syslist">
                <!-- <li class="item msgtake message"></li>
                <li class="item msgnotic message"></li> -->
                <router-link v-for="(item,index) in this.task_list['mlist']" :key="index" tag="li" to="/manage/roleManage" class="item msgtake message">{{item.menuName}}</router-link>
            </ul>
        </div>
    </div>
    <router-view></router-view>
    </div>
</template>
<script>
import Header from '../../components/header'
import {getModuleList} from '../../api/manages/userManage'

  export default {
    data(){
      return {
         list:[],
         video_search_list:[],//视频查阅
         video_fun_list:[],//视频功能
         task_list:[]//任务中心
        //  status:""
      }
    },
    computed: {

    },
    created () {
    },
    mounted(){
      this.queryModule()
    },
    components:{
      Header
    },
    methods:{
        queryModule:function(){
            let that = this;
            let menuCode = this.$route.query['menuCode'];
            getModuleList('sys/menu/secondChildMenu',menuCode,(res)=>{
                that.video_search_list=res.data[0]
                that.video_fun_list=res.data[1]
                that.task_list=res.data[2]
            })
        }
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
