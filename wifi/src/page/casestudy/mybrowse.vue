<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:07
 * @LastEditTime : 2020-11-24 16:54:26
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\mybrowse.vue
 -->
<template>
 <div class="myupload">
    <div class="topInfo">
       <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <p class="sysname">&nbsp;最近浏览</p>
           <p class="showType">
            显示方式：
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span>
          </p>
      <!-- <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <div class="sysname childname">最近浏览</div> -->
    </div>
    <div class="main">
      <!-- <div class="main_top">
        <input type="text" placeholder="请输入案件名称" style='text-indent:10px;' v-model="keyWord">
        <el-button type="primary" icon="el-icon-search" @click="ajaxDataList(true)" style="margin-left:0;">搜索</el-button>
      </div> -->
      <div class="main_btn">
        <div class="btn_top">
          <p>历史相关记录：共&nbsp;<span>{{ totalCount }}</span> 条</p>
           <div class="main_top">
            <input type="text" placeholder="请输入案件名称" style='text-indent:10px;width:3rem' v-model="keyWord">
            <el-button type="primary" icon="el-icon-search" @click="ajaxDataList(true)" style="margin-left:0;">查询</el-button>
          </div>
          <!-- <p>
            显示方式：
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span>
          </p>  -->
        </div>
        <div id='tab1' class="results">
            <ul class="firstul">
              <li v-for="(item,index) in browseDataList" :key="index">
                <div>
                  <img @click="godetails(item.caseUuid)" class="imgbox"  :src="item.caseImgUrl" alt="暂无图片" :onerror="$store.state.defaultImg" :title="item.caseName" v-show="item.caseImgUrl">
                  <img @click="godetails(item.caseUuid)" class="imgbox" src="@/assets/error_none.png"  :title="item.caseName" v-show="!item.caseImgUrl">
                </div>
                <p class="caseDefid" :title="item.caseName"><span>案件名称：</span>{{ item.caseName }}</p>
                <p class="caseDefid" :title="item.creatorName"><span>上传用户：</span>{{ item.creatorName }}</p>
                <p class="uploadtime caseDefid" :title="item.uploadTime"><span>上传时间：</span>{{ item.uploadTime }}</p>
                <p class="caseDefid">
                  <span  v-show="item.alarmLinkMark == null && item.approvalStatus == 2"  @click="item.collect ? cancelCollect(item.caseUuid) : addCollect(item.caseUuid)" class="collect iconBox">
                  <i class="el-icon-star-on" :class="item.collect ? 'on' : 'off'"></i> {{ item.collect ? '取消收藏' : '添加收藏'}}</span>
                  <span  title="审批中的案件不允许进行收藏\取消收藏操作" v-show="item.alarmLinkMark == null && item.approvalStatus != 2">
                    <span>
                      <!-- <img  class="collectImg" src="../../assets/case/caseRetrievalSearch-uncollect-icon.png" alt=""> -->
                      <i class="el-icon-star-on" :class="item.collect ? 'on' : 'off'" >&nbsp;</i>{{item.collect ? '取消收藏' : '添加收藏'}}
                    </span>
                  </span>
                  <span title="审批中的案件不允许进行收藏\取消收藏操作" v-show="item.alarmLinkMark != null && item.approvalStatus != 2"  class="collect iconBox">
                    <i class="el-icon-star-on" :class="item.collect ? 'on' : 'off'" >&nbsp;</i>{{item.collect ? '取消收藏' : '添加收藏'}}</span>
                </p>
              </li>
              <div class="empty" v-show="browseDataList.length == 0">
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
               <li v-for="(item,index) in browseDataList" :key="index">
                 <p class="threeUl">
                  <img @click="godetails(item.caseUuid)"   class="img_block" :src="item.caseImgUrl" alt="暂无图片" :onerror="$store.state.defaultImg" :title="item.caseName" v-show="item.caseImgUrl">
                  <img @click="godetails(item.caseUuid)"  class="img_block" src="@/assets/error_none.png"  :title="item.caseName" v-show="!item.caseImgUrl">
                 </p>
                <div class="fourUl">
                  <p><span>案件名称：</span>{{ item.caseName }}</p>
                  <p><span>上传用户：</span>{{ item.creatorName }}</p>
                  <p><span>上传时间：</span>{{ item.uploadTime }}</p>
                  <p class="text">
                    <span>简要案情：</span>
                    <b>{{ item.caseAbstract }}</b>
                  </p >
                  <p class="collectItem">
                    <span v-show="item.alarmLinkMark == null && item.approvalStatus == 2"  @click="item.collect ? cancelCollect(item.caseUuid) : addCollect(item.caseUuid)" class=" collect iconBox"><span class="browsecollect">
                      <i class="el-icon-star-on" :class="item.collect ? 'on' : 'off'"></i> {{ item.collect ? '取消收藏' : '添加收藏'}}</span></span>
                    <span title="审批中的案件不允许进行收藏\取消收藏操作" v-show="item.alarmLinkMark == null && item.approvalStatus != 2" class=" collect iconBox">
                      <span class="browsecollect">
                        <!-- <img style="margin-top: 4px;width: 15%;"  src="../../assets/case/caseRetrievalSearch-uncollect-icon.png" alt=""> -->
                      <i class="el-icon-star-on" :class="item.collect ? 'on' : 'off'" >&nbsp;</i>{{item.collect ? '取消收藏' : '添加收藏'}}</span>
                    </span>
                    <span title="审批中的案件不允许进行收藏\取消收藏操作" v-show="item.alarmLinkMark != null && item.approvalStatus != 2" class=" collect iconBox">
                      <span class="browsecollect">
                      <i class="el-icon-star-on" :class="item.collect ? 'on' : 'off'" >&nbsp;</i>{{item.collect ? '取消收藏' : '添加收藏'}}</span>
                    </span>
                  </p>
                </div>
              </li>
              <div class="empty" v-show="browseDataList.length == 0">
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
      currentPage: 1, // 当前页码
      pageSizes:[10,20,30],
      pageSize: 10, //每页显示的条数
      totalCount: 0, //数据总条数
      browseDataList:[],//所有浏览数据
      keyWord:''
    }
  },
  mounted() {
    this.changeTab('tab1');
  },
  created(){
    this.ajaxDataList()
  },
  methods:{
    //列表渲染
    ajaxDataList(query){
      if(query){
        this.currentPage = 1;
      }
       let data = {
        keyword:this.keyWord,
        pageNum:this.currentPage,//当前页
        pageSize:this.pageSize,//当前页结果数量
      }
      this.$http.get('pca/case/related/recentlyViewed',{params:data})
      .then((res) => {
        if(res.data.code == 200){
          this.browseDataList = res.data.data.list
          this.totalCount = res.data.data.totalCount;//页面总数
          this.currentPage = res.data.data.pageNum;//当前页
          this.pageSize = res.data.data.pageSize;//每页条数
        }
      })

    },
    //切换tab
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

    //取消收藏
    cancelCollect(id){
      let data = {
        caseUuid:id
      }
      data = this.$qs.stringify(data);
      this.$http.post('pca/case/related/collect/cancel',data)
      .then(res =>{
        if(res.data.code = 200){
          this.ajaxDataList()
           this.$notify({
            type: 'success',
            message: '取消成功！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('取消成功!',{icon:1,title:"消息提示"})
        }else{
          this.$notify({
            type: 'error',
            message: '服务器异常，请稍后重试！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('服务器异常，请稍后重试!',{icon:2,title:"消息提示"})
        }
      })
    },
    //添加收藏
    addCollect(id){
      let data = {
        caseUuid:id
      }
      data = this.$qs.stringify(data);
      this.$http.post('pca/case/related/collect/save',data)
      .then(res =>{
        if(res.data.code = 200){
          this.ajaxDataList()
          this.$notify({
            type: 'success',
            message: '添加成功！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('添加成功!',{icon:1,title:"消息提示"})
        }else{
          this.$notify({
            type: 'error',
            message: '服务器异常，请稍后重试！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('服务器异常，请稍后重试!',{icon:2,title:"消息提示"})
        }
      })
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
    //去详情页
    godetails(id){
      this.$router.push({path:'/casestudy/casePicture_look?menuCode=200', query:{caseUuid:id,myBrowse:true}})
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
}
.cllarr span{
  float: left;
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
.caseDefid span{
  cursor: pointer;
}
.collectItem{
  cursor: pointer;
}
.twoUl li p span {
  width: 70px;
  float: left;
}
.firstul li p .collectImg{
  display: inline-block;
  line-height: 0.14rem;
  width: 0.12rem;
  height: 0.12rem;
}
.firstul li img{
  width: 3.27rem;
  height: 1.83rem;
  position: absolute;
  cursor: pointer;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 0.01rem;
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
.main_btn .twoUl li >p{
  margin-top: 0;
  border: 1px solid #235588;
}
.twoUl li .text {
  height: 0.5rem;
}
</style>
