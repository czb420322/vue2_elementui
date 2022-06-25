<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:05
 * @LastEditTime: 2020-11-02 14:47:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\caseRetrieval\casePictureCombat.vue
 -->
<template>
  <div class="wrapper">
    <div class="topInfo">
        <img src="../../../assets/updataImg/location.png" alt="">
         <span class="sysname childname">当前位置：</span>
      <router-link  class="nav-item sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <div class="nav-item nav-item-search sysname">&nbsp;挂图作战</div>
    </div>
    <div class="contentBody">
      <div id="mapContent">

      </div>
      <img class="dingwei" src="../../../assets/case/quickPos.png" @click="loadcasePictureMap();initCasePicPoint();"/>
      <div class="point">
        <span>经度：{{point.lng}}</span><br>
        <span>纬度：{{point.lat}}</span>
      </div>
      <div class="searchConditionWrapper">
        <div class="searchCondition">
          <input class="inputCondition" type="text" v-model="keyword" placeholder="请输入搜索关键字"/>
          <!--<input class="inputCondition" type="text"  v-model="caseNo" placeholder=" 请输入案件编号">-->
          <!--<input class="inputCondition" type="text" v-model="caseName" placeholder=" 请输入案件名称">-->
          <el-button class="searchBtn" icon="el-icon-search" @click="pageNo=1;pageSize=10;searchCase()"></el-button>
          <div class="typeChange">
            <el-radio v-model="radio" label="0" @change="drawReact()">框选区域</el-radio>
            <el-radio v-model="radio" label="1" @change="clearDrawing()">移动地图</el-radio>
          </div>
          <el-button class="resetBtn" icon="el-icon-refresh" @click="reset">重置</el-button>
        </div>
        <div class="classList" v-show="showListFlag">
          <div class="tableBanner">
            <span>案件列表</span>
            <div class="showIcon" @click="showIconFlag=!showIconFlag">
              <div v-show="showIconFlag" class="el-icon-caret-top"></div>
              <div v-show="!showIconFlag" class="el-icon-caret-bottom"></div>
            </div>
          </div>
          <div class="table" v-show="!showIconFlag">
            <el-table
              :data="caseList"
              height="300"
              style="width:100%;"
              border>
              <el-table-column
                type="index"
                width="60"
                align="center"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="caseLinkMark"
                align="center"
                show-overflow-tooltip
                label="案件编号">
              </el-table-column>
              <el-table-column
                prop="caseName"
                align="center"
                show-overflow-tooltip
                label="案件名称">
              </el-table-column>
              <el-table-column
                prop="caseCategoryDesc"
                align="center"
                show-overflow-tooltip
                label="案件类型">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-view"
                    @click="lookCase(scope.row)"
                  >
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="!showIconFlag && !showPageFlag" class="pageNation">
            <el-pagination style="float: right;margin-right: 0.1rem;"
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
    </div>
      <footer>
      <p><img src="../../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
    </footer>
  </div>
</template>

<script>
  import vehicle from '../../../api/vehicle/vehicle.js'
  import casePicture from '../../../api/vehicle/casePicture_Map.js'
  import footerThird from '../../../components/footer_third'

  export default {
    components: {
      footerThird
    },
    data() {
      return {
        totalCount: 0,
        currentPage: 1, // 当前页码
        pageSize: 10, //每页显示的条数
        pageSizes:[10,20,30],//下拉框选择的显示条数

        showIconFlag: false,
        showListFlag: false,
        showPageFlag: false,
        searchFlag:false,
        aaaa:false,
        radio: "1",
        caseList: [],
        caseName: '',
        caseNo:'',
        keyword:"",
        map: null,//地图对象
        drawingManager: null,
        overlays: [],
        newpoints: [],
        filterText: '',
        isBar: false,
        tollgateIdsArr: [],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表
        defaultProps: {
          children: "apeTollgates",
          label: "name"
        },
        i: 0

      }
    },
    mixins: [ casePicture],
    mounted: function () {
      let _this = this;
      _this.loadcasePictureMap()
    },
    methods: {
      //选条数
      handleSizeChange(val) {
        this.pageSize = val;
        if(this.searchFlag){
          this.searchCase();
        }else if(this.aaaa){
           let params = {
            caseUuid: sessionStorage.getItem("caseUuid"),
            caseCategoryDesc: sessionStorage.getItem("caseCategoryDesc"),
            pageNum:this.currentPage,//当前页
            pageSize:this.pageSize,//当前页结果数量
            orderBy: 'createTime',
            orderType: 'desc',
          };
          let data = this.$qs.stringify(params);
          this.sameCase(data)
        } else {
          this.getOverlaycomplete()
        }
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        if(this.searchFlag){
          this.searchCase();
        }else if(this.aaaa){
           let params = {
            caseUuid: sessionStorage.getItem("caseUuid"),
            caseCategoryDesc: sessionStorage.getItem("caseCategoryDesc"),
            pageNum:this.currentPage,//当前页
            pageSize:this.pageSize,//当前页结果数量
            orderBy: 'createTime',
            orderType: 'desc',
          };
          let data = this.$qs.stringify(params);
          this.sameCase(data)
        }
        else{
          this.getOverlaycomplete()
        }

      },

      searchCase() {
        if(this.keyword == ""){
          this.$notify({
            type: 'warning',
            message: '请输入内容！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('必须输入内容！',{icon:5,title:"消息提示"});
          return;
        }
        let params = {
          keyword: this.keyword,
          pageNum:this.currentPage,//当前页
          pageSize:this.pageSize,//当前页结果数量
          orderBy: 'createTime',
          orderType: 'desc',
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url: 'pca/search/advanced/newList',
          method: 'post',
          data:data
        }).then(res => {
          if (res.data.code == 200) {
            this.caseList = res.data.data.list === null ? []:res.data.data.list;
            this.totalCount = res.data.data.totalCount;//页面总数
            this.currentPage = res.data.data.pageNum;//当前页
            this.pageSize = res.data.data.pageSize;//每页条数

            if(res.data.data.list === null){
              this.$notify({
                type: 'warning',
                message: '未搜索到相应的结果！',
                position: 'bottom-right',
                duration: 3000
              });
              // layer.alert('未搜索到相应的结果！',{icon:5,title:"消息提示"});
            }
            this.totalNum = res.data.data.totalCount;
            // this.showListFlag = true;
            this.showIconFlag = false;
            this.showPageFlag = false;
            this.searchFlag = true;
            this.getNewpoints();
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
      //同类案件比对
      sameCase(data) {
        this.$http({
          url: 'pca/search/advanced/caseCategory',
          method: 'post',
          data: data
        }).then(res => {
            if (res.data.code === 200) {
              this.caseList = res.data.data.list === null ? []:res.data.data.list;
              this.totalCount = res.data.data.totalCount;//页面总数
              this.currentPage = res.data.data.pageNum;//当前页
              this.pageSize = res.data.data.pageSize;//每页条数
              // this.searchFlag = false;
            }else{
              this.$notify({
                type: 'error',
                message: '获取同类案件列表失败！',
                position: 'bottom-right',
                duration: 3000
              });
              // layer.alert('获取同类案件列表失败！',{icon:5,title:"消息提示"});
            }
          }
        )
      },

      getNewpoints() {
        let _this = this;
        _this.newpoints = [];
        for (let i = 0; i < _this.caseList.length; i++) {
          _this.newpoints.push({
            longitude: _this.caseList[i].longitude,
            latitude: _this.caseList[i].latitude,
            caseName: _this.caseList[i].caseName,
            placeFullAddress: _this.caseList[i].placeFullAddress,
            imgPath: _this.caseList[i].caseImgUrl,
            creatorName: _this.caseList[i].creatorName,
            createTime: _this.caseList[i].createTime,
            caseUuid: _this.caseList[i].caseUuid,
            caseCategoryDesc: _this.caseList[i].caseCategoryDesc
          });
        }
        _this.initCasePicPoint();
      },
      //跳转查看案件
      lookCase(obj) {
        // this.$router.push({
        //   path: '/casestudy/casePicture_look', query: {
        //     caseUuid: obj.caseUuid,
        //     menuCode:200
        //   }
        // })
        let routeData = this.$router.resolve({ path: '/casestudy/casePicture_look', query: { caseUuid: obj.caseUuid ,menuCode: 200}});
        window.open(routeData.href, '_blank');
      },
      //重置
      reset() {
        this.keyword = '';
        this.caseName = '';
        this.caseNo = '';
        this.showListFlag = false;
        this.newpoints = [];
        this.clearDrawing();
        this.radio="1";
        //this.searchCase();

      }

    }
  }
</script>

<style scoped>

  @import '../../../assets/css/case_common.css';
@import "../../../assets/css/commom.css";
  .contentBody{
    position: relative;
    padding:0.14rem;
    width: 96%;
    height:calc(100% - 1.3rem);
    border: 1px solid #2e6bac;
    margin: auto;
    margin-top:0

  }

  #mapContent {
    width: 100%;
    height: calc(100% - 0.5rem);
    position: relative;
  }

  .searchCondition {
    width: 8rem;
    display: flex;
    margin:auto
  }
.searchCondition .el-button{
    width: 0.4rem;
    height:0.3rem;
    font-size:0.14rem;
    padding:0;
    border-radius: 0%;
    border: 1px solid #347194;
    background:#3771ac;
    margin-right:0.14rem
}
/* .searchCondition .el-button:nth-child(2){
  width: 0.4rem;
    height:0.3rem;
} */
  /* .searchBtn {
    width: 0.6rem;
    height: 0.3rem;
    background-color: #63abfe;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    border-radius: 3px;
    margin-right: 0.1rem;
    cursor: pointer;
  } */
  .inputCondition {
    width:4rem;
    height:0.3rem;
    /* margin-right: 0.1rem; */
    border: 1px solid #CECFD3;
    background:rgba(42, 59, 77, 0.9) !important
  }

  .typeChange {
    width:210px;
    background-color: rgba(34,68,104,0.9);
    display: flex;
    align-items: center;
    padding: 0 0.1rem;
    border-radius: 3px;
    position:relative
  }
.typeChange::after{
  content:'';
  width: 2px;
  height:0.25rem;
  background:#537fa8;
  position:absolute;
  left:50%
}
  .resetBtn {
    width: 0.63rem !important;
    height: 0.3rem;
    background-color: #f1a83b;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    border-radius: 3px;
    margin-left: 0.05rem;
    cursor: pointer;
    border: 1px solid #3c9ccd !important
  }

  .searchConditionWrapper {
    position: absolute;
    top: 0.15rem;
    left: 4.8rem;
    width: 8.6rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
  }

  .classList {
    width: 100%;
    display: flex;
    flex-direction: column;

    /* border: 1px solid #0e3460 */
  }

  .tableBanner {
    width: 100%;
    height: 0.3rem;
    background-color: rgba(30,48,68,.9);
    display: flex;
    align-items: center;
    margin-top: 5px;
    border-left: 1px solid #1e3859;
    border-right: 1px solid #1e3859;
    border-top: 1px solid #1e3859;
    position: relative;
  }

  .tableBanner span {
    color: #60ACFE;
    font-size: 0.14rem;
    margin-left: 0.1rem;
  }

  .lookCase {
    width: 50%;
    height: 40%;
    background-color: #63abfe;
    color: white;
    border-radius: 3px;
    margin: 3px auto;
    cursor: pointer;
  }

  .pageNation {
    width: 100%;
   background-color: rgba(30,48,68,.9);
    border-left: 1px solid #1e3859;
    border-right: 1px solid #1e3859;
    border-bottom: 1px solid #1e3859;
    font-size: 12px;
  }

  .showIcon {
    width: 15px;
    height: 15px;
    background-color: #8E9197;
    border-radius: 10px;
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .showIcon div {
    color: white;
    font-size: 12px;
  }

  /* .table /deep/ .el-table thead th {
    background: #e9eef1;
  } */

  /*.table /deep/ .el-table--border td,*/
  /*.table /deep/ .el-table--border th,*/
  /*.table /deep/ .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {*/
    /*border-right: 1px solid #d8dbdc;*/
  /*}*/

  /*.table /deep/ .el-table--border th,*/
  /*.table /deep/ .el-table__fixed-right-patch {*/
    /*border-bottom: 1px solid #d8dbdc;*/
  /*}*/

  /*.table /deep/ .el-table td,*/
  /*.table /deep/ .el-table th.is-leaf {*/
    /*border-bottom: 1px solid #d8dbdc;*/
  /*}*/

  /*.table /deep/ .el-table th > .cell {*/
    /*color: #545454;*/
    /*font-size: 0.16rem;*/
    /*font-weight: bold;*/
  /*}*/

  /*.table /deep/ .el-table th {*/
    /*padding: 0.12rem 0;*/
    /*text-overflow: ellipsis;*/
    /*vertical-align: middle;*/
    /*position: relative;*/
  /*}*/

  /*.table /deep/ .el-table td {*/
    /*padding: 0.06rem 0;*/
  /*}*/

  /*.table /deep/ .el-table tr:nth-child(2n+1) td {*/
    /*background: #f9fafb;*/
  /*}*/

  /*.table /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {*/
    /*background-color: #e0eefb;*/
  /*}*/

  /*.table /deep/ .el-button--mini {*/
    /*padding: 0.07rem 0.3rem;*/
  /*}*/

  .point {
    position: absolute;
    left: 0.1rem;
    bottom: 0;
    width: 2rem;
    font-size: 0.14rem;
    color:#99c9fa
  }

  .dingwei {
    position: absolute;
    top: 218px;
    right: 52px;
  }

  .mapDialogImg {
    width: 100%;
    height: 50%;
  }
  .topInfo{
        margin-bottom: 0.16rem;
    border-bottom: 1px solid #1c2939;
  }

.el-table{
  background-color: rgba(30,48,68) !important;
}

.el-table>>>tr{
  background:rgba(24,43,63,.9) !important
}

.el-button{
  background:rgba(28,63,93,.9);
  border: 1px solid #327ca5
}
</style>
