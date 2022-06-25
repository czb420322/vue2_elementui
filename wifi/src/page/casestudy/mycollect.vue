<!--
 * @Author: your name
 * @Date: 2019-12-26 15:58:52
 * @LastEditTime : 2020-11-02 14:48:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\casestudy\mycollect.vue
 -->
<template>
 <div class="myupload">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <p class="sysname">&nbsp;我的收藏</p>
         <p class="showType">
            显示方式：
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span>
          </p>
      <!-- <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <div class="sysname childname">我的收藏</div> -->
    </div>
    <div class="main">
      <!-- <div class="main_top">
        <input type="text" placeholder="请输入案件名称" style='text-indent:10px;' v-model="keyWord">
        <el-button type="primary" icon="el-icon-search" @click="ajaxDataList(true)" style="margin-left:0;">搜索</el-button>
      </div> -->
      <div class="main_btn">
        <div class="btn_top">
          <p>历史相关记录：<span>{{ totalCount }}</span> 条</p>
            <div class="main_top">
        <input type="text" placeholder="请输入案件名称" style='text-indent:10px;width:3rem' v-model="keyWord">
        <el-button type="primary" icon="el-icon-search" @click="ajaxDataList(true)" style="margin-left:0;">查询</el-button>
      </div>
          <!-- <p>
            显示方式：
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span>
          </p> -->
        </div>
        <div id='tab1' class="results">
            <ul class="firstul">
             <li v-for="(item,index) in collectDataList" :key="index">
                <div>
                  <img @click="godetails(item.caseUuid)"  class="imgbox"  :src="item.caseImgUrl" alt="暂无图片" :onerror="$store.state.defaultImg" :title="item.caseName" v-show="item.caseImgUrl">
                  <img @click="godetails(item.caseUuid)"  class="imgbox" src="@/assets/error_none.png"  :title="item.caseName" v-show="!item.caseImgUrl">
                </div>
                <p class="caseDefid" :title="item.caseName"><span>案件名称：</span>{{ item.caseName }}</p>
                <p class="caseDefid" :title="item.creatorName"><span>上传用户：</span>{{ item.creatorName }}</p>
                <p class="caseDefid" :title="item.uploadTime"><span>上传时间：</span>{{ item.uploadTime }}</p>
                <p class="caseDefid">
                  <span @click="cancel(item.caseUuid)" class="iconBox"> <i class="el-icon-star-on"></i> 取消收藏</span>
                </p>
                <p class="caseDefid"></p>
              </li>
              <div class="empty" v-show="collectDataList.length == 0">
                <img src="../../assets/updataImg/NoData.png" alt="">
              </div>
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
              <li v-for="(item,index) in collectDataList" :key="index">
                <p class="threeUl">
                  <img @click="godetails(item.caseUuid)"  class="img_block" :src="item.caseImgUrl" alt="暂无图片" :onerror="$store.state.defaultImg" :title="item.caseName" v-show="item.caseImgUrl">
                  <img @click="godetails(item.caseUuid)"   class="img_block" src="@/assets/error_none.png"  :title="item.caseName" v-show="!item.caseImgUrl">
                </p>
                <div class="fourUl">
                  <p><span>案件名称：</span>{{ item.caseName }}</p>
                  <p><span>上传用户：</span>{{ item.creatorName }}</p>
                  <p><span>上传时间：</span>{{ item.uploadTime }}</p>
                  <p class="text">
                    <span>简要案情：</span>
                    <b>{{ item.caseAbstract }}</b>
                  </p>
                  <span @click="cancel(item.caseUuid)" class="cancel iconBox">操作：<span class="browsecollect"><i class="el-icon-star-on"></i> 取消收藏</span></span>
                </div>
              </li>
              <div class="empty" v-show="collectDataList.length == 0">
                <img src="../../assets/updataImg/NoData.png" alt="">
              </div>
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
      collectDataList:[],//收藏列表数据
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      pageSizes:[10,20,30],//下拉框选择的显示条数
      totalCount:0,//总条数
      keyWord:'',
    }
  },
  mounted() {
    this.changeTab('tab1');
  },
  created(){
    this.ajaxDataList()
  },
  methods:{
    //渲染列表
    ajaxDataList(query){
      if(query){
          this.currentPage = 1;
        }
       let data = {
        keyword:this.keyWord,
        pageNum:this.currentPage,//当前页
        pageSize:this.pageSize,//当前页结果数量
      }
      this.$http.get('pca/case/related/myCollect',{params:data})
      .then((res) => {
        // console.log(JSON.stringify(res))
        this.collectDataList = res.data.data.list;
        this.totalCount = res.data.data.totalCount;//页面总数
        this.currentPage = res.data.data.pageNum;//当前页
        this.pageSize = res.data.data.pageSize;//每页条数
      })
    },
    //取消收藏
    cancel(id){
       let data =  {
         caseUuid:id
      }
      data = this.$qs.stringify(data);
      this.$http.post('pca/case/related/collect/cancel',data)
      .then(response => {
        if(response.data.code == 200){
          if(this.collectDataList.length < 2 && this.currentPage > 1){
            this.currentPage = this.currentPage - 1
          }
          this.ajaxDataList()
          this.$notify({
            type: 'success',
            message: '取消成功！',
            position: 'bottom-right',
            duration: 3000
          });
        }else{
          this.$notify({
            type: 'error',
            message: '取消失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },

    //去详情页
    godetails(id){
      this.$router.push({path:'/casestudy/casePicture_look?menuCode=200', query:{caseUuid:id,myCollect:true}})
    },

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
    handleSizeChange(val) {
      this.pageSize = val;
      this.ajaxDataList()

    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.ajaxDataList()
    },
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
@import '../../assets/css/myupload.css';
.browsecollect{
  display: inline-block;
  width: 0.9rem;
  line-height: 0.2rem;
  border:1px solid #2181b5;
  border-radius: 2px;
  background: #23517c;
  color:#fff;
  cursor: pointer;
  font-size: 0.12rem;
  text-align: center;
}
.caseDefid{
  width: 49.9%;
  height: 0.26rem;
  float: left;
  /* border: 1px solid rgba(84, 136, 189, 0.9);
  margin: 0 0 -1px -1px; */
}
.caseDefid span{
  padding-left: 0.03rem;
}
.caseDefid span:last-child{
  cursor: pointer;
}
.el-icon-star-on{
  color: #efb70c;
}
.results .twoUl li .threeUl{
  display: inline-block;
  width: 2rem;
  height: 100%;
}
.results .twoUl li .fourUl{
  display: inline-block;
  position: absolute;
  margin-left:0.2rem;
}
.twoUl li img {
  height: 1.4rem;
  position: absolute;
  width: 2rem;
  cursor: pointer;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.firstul li img {
  width: 3.27rem;
  height: 1.83rem;
  position: absolute;
  cursor: pointer;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.firstul li img{
  margin-bottom: 0.01rem;
}
.main_btn .twoUl li >p{
  margin-top: 0;
  border: 1px solid #235588;
}
.twoUl li .text {
  height: 0.5rem;
}
</style>
