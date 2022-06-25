<template>
    <div class="manage">
      <search-module moduleName="人像研判页面" />
      <div class="manageConten">
          <p class="sysmanage messageNotic">
              <span class="line"></span>
              <span class="text">静态对比</span>
          </p>
          <ul class="syslist">
              <!-- <router-link tag="li" to="/manage/departmentManage" class="item department"></router-link>
              <li class="item user"></li>
              <router-link tag="li" to="/manage/roleManage" class="item role"></router-link>
              <router-link tag="li" to="/manage/logManage" class="item log"></router-link>
              <router-link tag="li" to="/manage/dicManage" class="item dictionary"></router-link>
              <li class="item module"></li>
              <li class="item quitpment"></li>
              <li class="item opration"></li>
              <li class="item store"></li>
              <li class="item timesync"></li>
              <li class="item oprationcopy"></li> -->
              <router-link tag="li" v-for="(it,index) in this.info_manage_list['mlist']" :key="index" to="/manage/dicManage" class="item" >{{it.menuName}}</router-link>
          </ul>
          <p class="sysmanage messageNotic">
              <span class="line"></span>
              <span class="text">动态抓拍</span>
          </p>
          <ul class="syslist">
              <!-- <li class="item msgtake message"></li>
              <li class="item msgnotic message"></li> -->
              <router-link tag="li" v-for="(it,index) in this.fighting_fun_list['mlist']" :key="index" to="/manage/dicManage" class="item" >{{it.menuName}}</router-link>
          </ul>
           <p class="sysmanage messageNotic">
              <span class="line"></span>
              <span class="text">人像布控</span>
          </p>
          <ul class="syslist">
              <!-- <li class="item msgtake message"></li>
              <li class="item msgnotic message"></li> -->
              <router-link tag="li" v-for="(it,index) in this.static_aly_list['mlist']" :key="index" to="/manage/dicManage" class="item" >{{it.menuName}}</router-link>
          </ul>
      </div>
      <footerSecond />
    </div>
</template>
<script>
  import footerSecond from '../../components/footer_second'
  import searchModule from '../../components/search_module'
  export default {
    data(){
      return {
         list:[],
        //  status:""
        info_manage_list:[],
        fighting_fun_list:[],
        static_aly_list:[],
        loading: null
      }
    },

    mounted(){
      this.getModule()
    },
    components:{
      searchModule, footerSecond
    },
    methods:{
      getModule:function(){
        let that = this;
        let menuCode = this.$route.query['menuCode'];
        let userId = this.$storage.getSession('userInfo').userName
        let data = {
          parentId:menuCode,
          currentUser:userId
          };
        data = that.$qs.stringify(data);//post请求分离data
        that.loading = that.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        that.$http.post('/sms/menu/secondChildMenu',data).then(res=>{
          that.loading.close();
          if(res.data.code==200){
            // that.navlist = res.data.data;
            that.info_manage_list = res.data.data[0];
            that.fighting_fun_list = res.data.data[1];
            that.static_aly_list = res.data.data[2];
          }else if(res.data.code == 100){
            this.$router.push("/login");
          }else{
            // layer.alert(res.data.message,{icon:5,title:"消息提示"});
            this.$router.push("/login");
          }
        })
     }
    }
  }
</script>
<style  scoped>
  @import "../../assets/css/nav_page_second.css";
</style>
