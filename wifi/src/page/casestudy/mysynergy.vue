<template>
 <div class="myupload">
    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <p class="sysname">&nbsp;我的协同</p>
          <p class="showType">
          显示方式：
          <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
          <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span>
        </p>
      <!-- <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <div class="sysname childname">我的协同</div> -->
    </div>
    <div class="main">
      <!-- <div class="main_top"> -->
        <!-- <input type="text" placeholder="请输入案件名称" style='text-indent:10px;' v-model="keyword"> -->
        <!-- <el-button type="primary" @click="queryList" icon="el-icon-search" style="margin-left:0;">搜索</el-button> -->
        <!-- <el-button type="success" icon="el-icon-plus" @click="goaddcase">新增</el-button> -->
      <!-- </div> -->
      <div class="main_btn">
        <div class="btn_top">
          <p>相关记录：<span>{{ totalCount }}</span> 条</p>
            <div class="main_top">
              <input type="text" placeholder="请输入案件名称" style='text-indent:10px;' v-model="keyword">
              <el-button type="primary" @click="queryList" icon="el-icon-search" style="margin-left:0;">搜索</el-button>
            </div>
          <!-- <p>
            显示方式：
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span>
          </p> -->
        </div>
        <div id='tab1' class="results">
            <ul class="firstul">
             <li v-for="(item,i) in uploadDataList" :key="i">
                <img  @click="godetails(item.caseUuid)" :src="item.caseImgUrl" :onerror="$store.state.defaultImg" alt="暂无图片" :title="item.caseName" v-show="item.caseImgUrl">
                <img @click="godetails(item.caseUuid)" src="@/assets/error_none.png"  :title="item.caseName" v-show="!item.caseImgUrl">
                <p><span>案件名称：{{item.caseName}}</span></p>
                <p><span>审批状态：{{item.approvalStatus | approvalStatus}}</span></p>
                <p><span>创建人：{{item.creatorName}}</span></p>
                <p><span>创建时间：{{item.createTime}}</span></p>
                <p class="Icon">
                  <span class="el-icon-edit-outline searchBtn" @click="gotoEdit(item,item.caseUuid,true,true,item.approvalStatus)"> 侦办</span>
                  <!-- <span class="el-icon-delete"> 删除</span> -->
                </p>
              </li>
            </ul>
          <el-pagination
              :background="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
          </el-pagination>
        </div>
        <div id='tab2'  class="results">
            <ul class="twoUl">
              <li v-for="(item,i) in uploadDataList" :key="i">
                <img  @click="godetails(item.caseUuid)" :src="item.caseImgUrl" :onerror="$store.state.defaultImg" alt="暂无图片" :title="item.caseName" v-show="item.caseImgUrl">
                <img @click="godetails(item.caseUuid)" src="@/assets/error_none.png"  :title="item.caseName" v-show="!item.caseImgUrl">
                <div>
                  <p><span>案件名称：{{item.caseName}}</span></p>
                  <p><span>审批状态：{{item.approvalStatus | approvalStatus}}</span></p>
                  <p><span>创建人：{{item.creatorName}}</span></p>
                  <p><span>创建时间：{{item.createTime}}</span></p>
                  <p class="text">
                    <span>简要案情：{{item.caseAbstract}}</span>
                    <b></b>
                  </p>
                </div>
                <p class="Icon">
                  <span class="el-icon-edit-outline searchBtn" @click="gotoEdit(item,item.caseUuid,true,true,item.approvalStatus)"> 侦办</span>
                  <!-- <span class="el-icon-delete"> 删除</span> -->
                </p>
              </li>
            </ul>
          <el-pagination
              :background="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <footer>
      <p><img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
    </footer>
 </div>
</template>

<script>
export default {
  data() {
    return {
      uploadDataList:[],//上传列表数据
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      pageSizes:[10,20,30],//下拉框选择的显示条数
      totalCount:0,//总条数
      keyword:'',//案件搜索
      layerOpen:'',
    }
  },
  filters: {
    approvalStatus(code){
      if (code == 0){
          return '新建';
      }else if (code == 1){
          return '审批中';
      }else if (code == 2){
          return '审批通过';
      }else if (code == 3){
          return '审批不通过';
      }
    }
  },
  mounted() {
    this.changeTab('tab1');
    this.queryList();
  },
  created(){
  },
  methods:{
    handleSizeChange(val){
      this.pageSize = val
      this.queryList()
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.queryList();
    },
    //新增协同作战
    goaddcase(){
      this.$router.push({path:'/casestudy/caseInfomanage/addcase?menuCode=200', query:{edit:false,isysn:true,myUploadTo:true}})
    },
     //切换视图
    changeTab(item){
      var tabs = ["tab1", "tab2"];
      var items = document.getElementsByClassName('items');
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i] == item) {
          document.getElementById(tabs[i]).style.display = "block";
          items[i].classList.add('active')
        } else {
          document.getElementById(tabs[i]).style.display = "none";
          items[i].classList.remove('active')
        }
      }
    },
    //查询所有列表
    queryList(){
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let userId = userInfo.value.userId;
      let data = {
        huser:userId,
        keyword:this.keyword,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        orderBy:'create_time',
        orderType:'desc'
      }
      data = this.$qs.stringify(data)
      this.$http.post('pca/synergyhandler/getMyCaseList',data).then(res=>{
        console.log(res,2222);
        if(res.data.code == 200){
          this.uploadDataList = res.data.data.list
          this.totalCount = res.data.data.totalCount
          this.keyword = ''
        }else{
          this.$notify({
            type: 'error',
            message: '查询列表失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    //点击图片跳转
    godetails(id){
      this.$router.push({path:'/casestudy/casePicture_look?menuCode=200', query:{mysynergy:true,caseUuid:id}})
    },

    gotoEdit(row,id,edit,mysynergy,isTrialIng){
       let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        let userId = userInfo.value.userId;
      if(isTrialIng == 1){//如果案件在审批中
          this.$notify({
            type: 'error',
            message: '该案件在审批中，无法进行编辑！',
            position: 'bottom-right',
            duration: 3000
          });
        // layer.alert('该案件在审批中，无法进行编辑！',{icon:7,title:"消息提示"})
      }else{
         if(row.creator == userId){
          this.$router.push({path:'/casestudy/caseInfomanage/addcase?menuCode=200', query:{caseUuid:id,edit:edit,mysynergy:mysynergy}})
        }
        else{
          this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo?menuCode=200', query:{caseUuid:id,edit:true,mysynergy:true,synergyCombat:true}})
        }
      }
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/commom.css";
@import '../../assets/css/myupload.css';


</style>
