<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <router-link  class="nav-item nav-item-second" tag="div" :to="{path:'/casestudy/case3DSearch',query:{menuCode:200}}">特征检索</router-link>
      <div class="nav-item nav-item-search">搜索结果</div>
    </div> -->
     <div class="topInfo">
        <img src="../../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <router-link  class="sysname" tag="div" :to="{path:'/casestudy/case3DSearch',query:{menuCode:208}}">&nbsp;特征检索 ></router-link>
        <p class="sysname">&nbsp;搜索结果</p>
            <p  class="showType">
            显示方式：
            <el-radio v-model="radio" label="0" @change="changeSearchResult()">缩略图</el-radio>
            <el-radio v-model="radio" label="1" @change="changeSearchResult()">图文显示</el-radio>
            <!-- <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span> -->
          </p>
    </div>

    <div class="contentBody">
      <div class="contentWrapper">
        <div class="contentWrapperbottom">
          <div style="display: flex;width: 100%;height: calc(100% - 0.54rem)">
            <div class="contentLeft" style="width:100%;height: 100%;">
              <div class="content">
                <!-- <div class="contentTabs">
                  <div class="showType">
                    <span>显示方式:</span>
                    <el-radio v-model="radio" label="0" @change="changeSearchResult()">显示缩略图</el-radio>
                    <el-radio v-model="radio" label="1" @change="changeSearchResult()">图文显示</el-radio>
                  </div>
                </div> -->
                <div class="contentDetialWrapper">
                  <div class="searchType">
                    <div class="searchTypeRight">
                      <span>排序: </span>
                      <span style="margin-left: 15px">上传时间 </span>
                      <div style="display: flex;flex-direction: column">
                        <div @click="changeOrderType($event);asc_order_time()" class="el-icon-caret-top orderType" style="cursor: pointer"></div>
                        <div @click="changeOrderType($event);desc_order_time()" class="el-icon-caret-bottom " style="margin-top: -5px;cursor: pointer"></div>
                      </div>

                      <span style="margin-left: 15px">上传单位 </span>
                      <div style="display: flex;flex-direction: column">
                        <div @click="changeOrderType($event);asc_order_org()" class="el-icon-caret-top orderType" style="cursor: pointer"></div>
                        <div @click="changeOrderType($event);desc_order_org()" class="el-icon-caret-bottom " style="margin-top: -5px;cursor: pointer"></div>
                      </div>

                      <span style="margin-left: 15px">案件类型 </span>
                      <div style="display: flex;flex-direction: column">
                        <div @click="changeOrderType($event);asc_order_category()" class="el-icon-caret-top orderType" style="cursor: pointer"></div>
                        <div @click="changeOrderType($event);desc_order_category()" class="el-icon-caret-bottom " style="margin-top: -5px;cursor: pointer"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 缩略图视图-->
                  <div v-show="searchResultFlag" class="contentDetial">
                    <div class="detailItem" v-for="(item,index ) in caseList" :key="index">
                      <ul>
                        <li class="itemImg" @click="lookCase(item)">
                          <img style="height: 100%" :src=item.caseImgUrl :onerror="$store.state.defaultImg" alt="暂无图片" v-show="item.caseImgUrl">
                          <img style="height: 100%" src="@/assets/error_none.png" v-show="!item.caseImgUrl">
                        </li>
                        <li style="margin-top:0.05rem;"><span>案件名称:&nbsp;&nbsp;</span><span style="color:#99c9fa " v-text="item.caseName"></span>
                        </li>
                        <li><span>上传用户:&nbsp;&nbsp;</span><span style="color:#99c9fa " v-text="item.creatorName"></span></li>
                        <li><span>上传时间:&nbsp;&nbsp;</span><span style="color:#99c9fa " v-text="item.createTime"></span>
                        </li>
                        <li style="display: flex;align-items: center">
                          <div class="addCompare searchBtn"  @click="addcasCase(item.caseUuid)">
                            <img style="margin-top: 2px;width: 20%;height: 50%" src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                            <div class="handleTxt">添加串并</div>
                          </div>
                          <div class="itemJudged searchBtn "  @click="showCaseNatureDialog(item.caseUuid)">
                            <div class="handleTxt"><span class="el-icon-zoom-in" style="color:#409EFF"></span>案件比对</div>
                          </div>
                          <div class="addCollect searchBtn" v-show="!item.collect" @click="addCollect(item.caseUuid)"><img style="margin-top: 2px;margin-right: 1%;width: 20%;height: 50%" src="../../../assets/case/caseRetrievalSearch-uncollect-icon.png" alt="">
                            <div class="handleTxt" >添加收藏</div>
                          </div>
                          <div class="addCollect searchBtn" v-show="item.collect" @click="removeCollect(item.caseUuid)"><img style="margin-top: 2px;margin-right: 1%;width: 20%;height: 50%" src="../../../assets/case/caseRetrievalSearch-collect-icon.png" alt="">
                            <div class="handleTxt" >取消收藏</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="pageNation">
                      <el-pagination style="float: right;margin-right: 10px;"
                         :background=true
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="Number(this.pageNo)"
                         :page-sizes="[10, 20, 30, 40, 50, 100]"
                         :page-size="Number(this.pageSize)"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total=Number(this.totalNum)>
                      </el-pagination>
                    </div>
                  </div>

                  <!--图文显示视图-->
                  <div v-show="!searchResultFlag" class="textPicture">
                    <div class="textPictureItem" v-for="(item,index ) in caseList" :key="index">
                      <div class="textPictureItemImg" @click="lookCase(item)">
                        <img style="height: 100%;cursor: pointer" :src=item.caseImgUrl :onerror="$store.state.defaultImg" v-show="item.caseImgUrl" alt="暂无图片">
                         <img style="height: 100%" src="@/assets/error_none.png" v-show="!item.caseImgUrl">
                      </div>
                      <div class="textPictureItemTxt">
                        <div class="tpItem"><span>案件名称 : &nbsp;</span><span style="color:#99c9fa" v-text="item.caseName"></span>
                        </div>
                        <div class="tpItem"><span>上传用户 : &nbsp;</span><span style="color:#99c9fa" v-text="item.creatorName"> &nbsp; 李斯</span>
                        </div>
                        <div class="tpItem"><span>上传时间 : &nbsp;</span><span style="color:#99c9fa" v-text="item.createTime">&nbsp;</span>
                        </div>
                        <div class="tpItem">
                          <span style="height: 100%;width: 60px">案件描述 :</span>
                          <div v-text="item.caseAbstract" class="descTpItem"></div>
                        </div>
                      </div>
                      <div class="tpItem tpItemBtn" >
                        <div class="textPictureHandle searchBtn"  @click="addcasCase(item.caseUuid)"><img style="margin-top:2px;margin-right: 3px;" src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                          <div class="handleTxt">添加串并</div>
                        </div>
                        <div class="textPictureHandle searchBtn"  @click="showCaseNatureDialog(item.caseUuid)">
                          <div class="handleTxt"><span class="el-icon-zoom-in" style="color:#409EFF;margin-top: 0px;font-size: 16px;"></span>案件比对</div>
                        </div>
                        <div class="textPictureHandle searchBtn" v-show="!item.collect" @click="addCollect(item.caseUuid)"><img style="margin-top:2px;margin-right: 3px;" src="../../../assets/case/caseRetrievalSearch-uncollect-icon.png"  alt="">
                          <div class="handleTxt">添加收藏</div>
                        </div>
                        <div class="textPictureHandle searchBtn" v-show="item.collect" @click="removeCollect(item.caseUuid)"><img style="margin-top:2px;margin-right: 3px;" src="../../../assets/case/caseRetrievalSearch-collect-icon.png"  alt="">
                          <div class="handleTxt">取消收藏</div>
                        </div>
                      </div>
                    </div>
                    <div class="pageNation">
                      <el-pagination
                        :background=true
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="Number(this.pageNo)"
                        :page-sizes="[10, 20, 30, 40, 50, 100]"
                        :page-size="Number(this.pageSize)"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total=Number(this.totalNum)>
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="contentBottom">
            <div class="btnBack cancleBtn" @click="goback">返 回</div>
          </div>
        </div>

      </div>
      <footer_case></footer_case>
    </div>
    <!--<case-nature-dialog  :caseUuid="caseUuid"></case-nature-dialog>-->
    <add-case-from-search :isShow="popCaseListVisible" :caseUuid="caseUuid" @sendToParent="getIsShow"></add-case-from-search>
    <!--<case3-d-nature-dialog></case3-d-nature-dialog>-->
    <!--<case-video-mark-dialog></case-video-mark-dialog>-->
    <!--<case-message-dialog></case-message-dialog>-->
  </div>
</template>

<script>
  import caseNatureDialog from './caseNatureDialog'
  import case3DNatureDialog from './case3DNatureDialog'
  import caseVideoMarkDialog from './caseVideoMarkDialog'
  import caseMessageDialog from './caseMessageDialog'
  import addCaseFromSearch from './addCaseFromSearch'
  import Footer_case from "../../../components/footer_case";
  export default {
    components: {
      caseNatureDialog, case3DNatureDialog, caseVideoMarkDialog, caseMessageDialog,Footer_case,addCaseFromSearch
    },
    data() {
      return {
        loading:null,
        radio: '0',
        conditionFlag: false,
        searchResultFlag: true,
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,
        keywords: [],
        caseList: [],
        orderBy:'createTime',
        orderType: 'desc',
        compareList: [],

        caseUuid:"",
        caseObj:{},
        popCaseListVisible:false
      }
    },

    methods: {
      //改变排序方式
      changeOrderType(event) {
        $(event.srcElement).siblings()[0].classList.remove('orderType');
        event.srcElement.classList.add('orderType');
      },
      //改变图文显示方式

      //选条数
      handleSizeChange(val) {
        this.pageSize=val;
        this.pageNo = 1;
        this.searchCaseResult();
      },
      //翻页
      handleCurrentChange(val) {
        this.pageNo=val;
        this.searchCaseResult();
      },
      //切换搜索结果
      changeSearchResult() {
        if (this.radio == '0') {
          this.searchResultFlag = true;
        } else {
          this.searchResultFlag = false;
        }
      },
      //案件属性比对弹出框显示
      showCaseNatureDialog(caseUuid) {
        this.$store.state.caseUuid = caseUuid;
        this.$store.state.caseNatureDialogFlag = true;
      },
      // //特征属性比对弹出框显示
      // showcase3DNatureDialog() {
      //   this.$store.state.case3DNatureDialogFlag = true;
      // },
      // //视频标注比对弹出框显示
      // showcaseVideoMarkDialog() {
      //   this.$store.state.caseVideoMarkDialogFlag = true;
      // },
      //
      // //右边执行比对弹出框
      // showcaseMessageDialog() {
      //   this.$store.state.caseMessageDialogFlag = true;
      // },

      //返回
      goback() {
        this.$router.push('/casestudy/case3DSearch?menuCode=200')
      },

      //搜索结果列表
      searchCaseResult() {
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url: 'pca/search/advanced/threeSearch',
          method: 'get',
          params: {
            pageNum: this.pageNo,
            pageSize: this.pageSize,
            orderBy: this.orderBy,
            orderType: this.orderType,
            keyword: this.keywords
          }
        }).then(res => {
          this.loading.close();
          if (res.statusText === 'OK' && res.data.code === 200) {
            if(res.data.data == "暂无数据"){
              this.caseList = [];
              this.totalNum = 0;
            }else{
              this.caseList = res.data.data.list;
              this.totalNum = res.data.data.totalCount;
              this.pageSize = res.data.data.pageSize;
              this.pageNo = res.data.data.pageNum;
            }
          }else{
            this.$notify({
                type: 'error',
                message: '获取案件列表失败！',
                position: 'bottom-right',
                duration: 3000
              });
            // layer.alert('获取案件列表失败！',{icon:5,title:"消息提示"});
          }
        })
      },

      //按时间正序
      asc_order_time() {
        this.orderBy = 'createTime';
        this.orderType = "asc";
        this.pageNo = 1;
        this.pageSize = 10;
        this.searchCaseResult();
      },
      //按时间逆序
      desc_order_time() {
        this.orderBy = 'createTime';
        this.orderType = "desc";
        this.pageNo = 1;
        this.pageSize = 10;
        this.searchCaseResult();
      },
      //按上传单位正序
      asc_order_org() {
        this.orderBy = 'creatorOrgId';
        this.orderType = "asc";
        this.pageNo = 1;
        this.pageSize = 10;
        this.searchCaseResult();
      },
      //按上传单位逆序
      desc_order_org() {
        this.orderBy = 'creatorOrgId';
        this.orderType = "desc";
        this.pageNo = 1;
        this.pageSize = 10;
        this.searchCaseResult();
      },

      //按案件类型正序
      asc_order_category(){
        this.orderBy = 'caseCategoryDesc';
        this.orderType = "asc";
        this.pageNo = 1;
        this.pageSize = 10;
        this.searchCaseResult();
      },
      //按案件类型逆序
      desc_order_category(){
        this.orderBy = 'caseCategoryDesc';
        this.orderType = "desc";
        this.pageNo = 1;
        this.pageSize = 10;
        this.searchCaseResult();
      },


      // 添加串并
      addcasCase(caseUuid){
        this.caseUuid = caseUuid;
        this.popCaseListVisible = true;
      },
      getIsShow(){
        this.popCaseListVisible = false;
      },
      //跳转查看案件
      lookCase(obj) {
        let routeData = this.$router.resolve({ path: '/casestudy/casePicture_look', query: { caseUuid: obj.caseUuid ,menuCode: 200}});
        window.open(routeData.href, '_blank');
      },

      addCollect(caseUuid){
        let params = {
          caseUuid:caseUuid
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url: 'pca/case/related/collect/save',
          method: 'post',
          data:data
        }).then(res => {
          if (res.data.code === 200){
            this.$notify({
                 type: 'success',
                 message: '添加收藏成功！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert("添加收藏成功！",{icon:6,title:"消息提示"});
            this.searchCaseResult();
          }else{
            this.$notify({
                 type: 'error',
                 message: '添加收藏失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('添加收藏失败！',{icon:5,title:"消息提示"});
          }
        })
      },

      removeCollect(caseUuid){
        let params = {
          caseUuid:caseUuid
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url: 'pca/case/related/collect/cancel',
          method: 'post',
          data:data
        }).then(res => {
          if (res.data.code === 200){
            this.$notify({
                 type: 'success',
                 message: '取消收藏成功！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert("取消收藏成功！",{icon:6,title:"消息提示"});
            this.searchCaseResult();
          }else{
             this.$notify({
                 type: 'error',
                 message: '取消收藏失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert("取消收藏失败！",{icon:5,title:"消息提示"});
          }
        })
      },

    },
    created() {
      this.keywords = sessionStorage.getItem("3Dkeywords")
    },
    mounted() {
      this.searchCaseResult()
    }



    /*watch:{
      radio:function () {
          if(this.radio='0'){
          }
      }
    }*/
  }
</script>


<style scoped>
  @import '../../../assets/css/commom.css';
  .wrapper {
    margin-top:0.6rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
  }
  .contentBody {
    width: 100%;
    height: calc(100vh - 1.2rem);
    display: flex;
    flex-direction: column;
  }

  .contentBody .contentTitle {
    width: 100%;
    height: 0.6rem;
    background-color: #FAF9F5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .contentTitle input {
    width: 35%;
    background-color: white;
    height: 36px;
  }

  .contentWrapper {
    /*width: calc(100% - 32px);*/
    /*height: calc(100% - 10px - 60px);*/
    flex:1;
    margin:0.1rem 0.2rem 0;
    border: 1px solid RGB(12,68,135);
    display: flex;
    flex-direction: column;
  }

  .contentWrapperTop {
    width: calc(100% - 32px);
    height: 30px;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  .contentWrapperbottom {
    /*width: calc(100% - 32px);*/
    /*margin-left: 15px;*/
    /*margin-right: 15px;*/
    /*height: calc(100% - 50px);*/
    flex:1;
    display: flex;
    flex-direction: column;
  }

  .contentWrapperTop span {
    font-size: 12px;
    color: white;
    background-color: #FE8A01;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px 4px 10px;
    border-radius: 3px;
  }

  .contentWrapperTop .items {
    margin-left: 5px;
    margin-top: 2px;
    cursor: pointer;
  }

  .content {
    width: 100%;
    height: 100%;
    /* border: 1px solid #E9EBEF; */
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .contentTabs {
    width: 100%;
    height: 0.54rem;
    background-color: #F7F8F6;
    border-bottom: 1px solid #E9EBEF;
    display: flex;
    align-items: center;
    position: relative;
  }

  .showType {
    position: absolute;
    right: 20px;
    font-size: 0.14rem;
  }
  .showType span{
    font-size: 0.14rem;
    margin-right: 0.1rem;
  }
  .showType >>> .el-radio__label{
    font-size: 0.14rem;
  }

  .tabsItem {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    height:0.26rem;
    color: #7A7C86;
    padding:0.05rem 0.1rem;
    cursor: pointer;
  }
  .contentTabs .tabDefault{
    background-color: #F9FAF8;
    color: #4EA5FF;
    border-top: 2px solid #4EA5FF;
    border-left: 1px solid #E2E6EC;
    border-right: 1px solid #E2E6EC;
    border-bottom: none;
  }
  .searchCondition {
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 0.54rem;
    font-size: 12px;
    background-color: #F2F4F3;
  }

  .searchCondition div {
    padding-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    display: inline-block;
    align-items: center;
    justify-content: center;
    color: #808285;
    cursor: pointer;
  }
  .conditionName {
    width: auto;
  }

  .conditionName.on, .conditionName:hover {
    color: #63abfe;
  }
  .conditionIcon {
    color: #828282;
    margin-left: 10px;
    margin-bottom: 2px;
  }

  .orderType {
    color: #FF6600;
  }

  .contentDetialWrapper {
    height: calc(100% - 0.54rem);
    width: 100%;
  }

  .contentDetial {
    width: 100%;
    height: calc(100% - 30px);
    padding: 0.1rem 0.2rem;
    overflow-y: auto;
  }

  .textPicture {
    width: 100%;
    height: calc(100% - 30px);
    padding:0.1rem 0.2rem;
    overflow-y: auto;
  }

  .textPictureItem {
    width: 49%;
    height: 1.9rem;
    display: inline-block;
    margin-top: 0.1rem;
    /* display: flex; */
    padding: 0.1rem;
    border: 1px solid rgba(38, 85, 134, 0.32);
    background-color: rgba(28,60,95,0.32);
    /* background-color: #F1F1F1; */
  }
  .textPictureItem::after{
    display: block;
    content: " ";
    clear: both;
  }
  .textPictureItem:nth-child(even){
    margin-left: 1%;
  }

  .detailItem {
    display: inline-block;
    margin: 5px;
    width: calc(20% - 5px - 5px);
    /* background-color: #F1F1F1; */
    /* border: 1px solid #e1e5ea; */
    border: 1px solid rgba(38, 85, 134, 0.32);
    background-color: rgba(28,60,95,0.32);
    vertical-align: top;
    /*user-select: none;*/
    /*height: 242px;*/
  }

  .detailItem ul {
    padding: 0.05rem;
    width: 100%;
    height: 100%;
  }

  .detailItem ul li {
    width: 100%;
    line-height:20px;
    font-size:12px;
    color: #99c9fa;
  }

  .itemImg {
    /*height: 60%;*/
    height:2.02rem;
    text-align: center;
    /* border:1px solid #dcdfe6; */
  }
  .itemImg img{
    width: 100%;
    height: 100%;
  }
  /* border: 1px solid rgba(38, 85, 134, 0.32);
    background-color: rgba(28,60,95,0.32); */

  .searchType {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #99c9fa;
    border-bottom: 1px solid RGB(12,68,135);
    padding-left: 20px;
  }

  .searchTypeRight {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
  }

  .contentBottom {
    width: 100%;
    height: 0.54rem;
    /* background-color: #FAF9F5; */
    /* border: 1px solid #EDEFF2; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid rgba(15, 64, 152, 0.8);
    background-color: rgba(16, 35, 56, 0.5);
  }

  .btnBack {
    width: 1rem;
    height: 0.36rem;
    font-size:0.14rem;
    background-color: #E6A23C;
    margin-right: 3.5%;
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }


  .pageNation {
    width: 100%;
    margin-top: 0.1rem;
    text-align: right;
    /*position: absolute;*/
    /*bottom: 5px;*/
    /*right: 0;*/
  }

  .addCompare {
    /* background-color: #FCFCFC; */
    color: #fff;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.05rem;
    font-size:0.12rem;
    cursor: pointer;
  }

  .itemJudged {
    /* background-color: #FCFCFC; */
    color: #fff;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.05rem;
    font-size:0.12rem;
    cursor: pointer;
  }

  .addCollect {
    /* background-color: #FCFCFC; */
    color: #fff;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.12rem;
  }

  .contentTabs /deep/ .el-radio + .el-radio {
    margin-left: 0;
  }

  .contentRight {
    width: 13%;
    height: 100%;
    border: 1px solid #EDEFF2;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
  }

  .rightItemList {
    width: 100%;
    height: calc(100% - 0.54rem - 1rem);
    border-bottom: 1px solid #EDEFF2;
    display: flex;
    flex-direction: column;
  }

  .rightHandle {
    width: 100%;
    height: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .rightItem {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    height: 20%;
    margin-top: 3px;
    position:relative;
  }
  .rightItem .el-icon-close{
    position:absolute;
    top:0;
    right: 0;
    background-color: black;
    color: white;
    font-size:12px;
    cursor: pointer;
  }


  .doCompare {
    padding: 5px 15% 5px 15%;
    background-color: #F7F7F7;
    border-radius: 3px;
    color: #5b5656;
    cursor: pointer;
    display: flex;
  }

  .clearCompare {
    text-decoration: underline;
    color: #63abfe;
    margin-top: 3%;
    cursor: pointer;
  }

  .textPictureItemImg {
    float: left;
    width: 20%;
    height: 100%;
    text-align: center;
  }
  .textPictureItemImg img{
    width: 100%;
    height: 100%;
  }

  .textPictureItemTxt {
    float: left;
    width: 50%;
    height: 100%;
    /* display: flex; */
    /* flex-direction: column; */
    padding-left: 20px;
    font-size: 12px;
    line-height:20px;
  }

  .textPictureItemTxt .tpItem {
    margin-bottom: 0.2rem;
    color: #99c9fa;
  }
  .textPictureItemTxt .tpItem > span:first-child{
    width:60px;
  }
  .tpItemBtn{
    float: left;
    width: 30%;
    /* margin-top: 0.12rem; */
  }
  .textPictureItemTxt .descTpItem{
    color:#808285;
    word-break: break-all;
    word-wrap:break-word;
    width:calc(100% - 67px);
    max-height:40px;
    overflow: hidden;
  }

  .textPictureHandle {
    display: flex;
    width: 1.2rem;
    margin-top: 0.1rem;
    padding: 2px 0.05rem;
    margin-right: 5px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .textPictureHandle img{
    display: flex;
  }
  .handleTxt{
    font-size: 0.1rem;
  }

  .judgedItem {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-top: 3px;
  }

  .judgedItem:hover {
    color: #63abfe;
  }

  .handleTxt:hover {
    color: #63abfe;
  }

</style>

