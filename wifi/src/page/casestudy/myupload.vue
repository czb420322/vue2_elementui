<template>
  <div class="myupload">
    <!-- <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
    <div class="sysname childname">我的协同</div>-->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        v-show="!isvideoCom"
        class="sysname"
        :to="{path:'/casestudy',query:{menuCode:200}}"
      >案件库 ></router-link>
      <router-link
        v-show="isvideoCom"
        class="sysname"
        :to="{path:'/videoCombat',query:{menuCode:100}}"
      >视频侦查></router-link>
      <p class="sysname">&nbsp;案事件查看</p>
      <p class="showType">
        显示方式：
        <span @click="changeTab('tab1')" class="items">
          <b>
            <i></i>
          </b>缩略图
        </span>
        <span @click="changeTab('tab2')" class="items">
          <b>
            <i></i>
          </b>图文显示
        </span>
      </p>
    </div>
    <div class="main">
      <!-- <div class="main_top">
        <input type="text" placeholder="请输入案件名称" style='text-indent:10px;' v-model="keyWord">
        <el-button type="primary" icon="el-icon-search" @click="ajaxDataList(true)" style="margin-left:0;">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" @click="goaddcase">新增</el-button>
      </div>-->
      <div class="main_btn">
        <div class="btn_top">
          <p>历史相关记录：
            <span>{{ totalCount }}</span> 条
          </p>
          <div class="main_top">
            <input
              type="text"
              placeholder="请输入案件名称"
              style="text-indent:10px;width:3rem;"
              v-model="keyWord"
            >
            <el-button type="primary" icon="el-icon-search" @click="historyNal()">查询</el-button>
            <!-- <el-button type="success" icon="el-icon-plus" @click="goaddcase">新增</el-button> -->
          </div>
          <!-- <p>
            显示方式：
            <span @click="changeTab('tab1')" class="items"><b><i></i></b>缩略图</span>
            <span @click="changeTab('tab2')" class="items"><b><i></i></b>图文显示</span>
          </p>-->
        </div>
        <div id="tab1" class="results">
          <ul class="firstul">
            <li v-for="(item,index) in uploadDataList" :key="index">
              <div>
                <img
                  @click="godetails(item.caseUuid)"
                  class="imgbox"
                  :src="item.caseImgUrl"
                  alt="暂无图片"
                  :onerror="$store.state.defaultImg"
                  :title="item.caseName"
                  v-show="item.caseImgUrl"
                >
                <img
                  @click="godetails(item.caseUuid)"
                  class="imgbox"
                  src="@/assets/error_none.png"
                  :title="item.caseName"
                  v-show="!item.caseImgUrl"
                >
              </div>
              <p class="caseDefid" :title="item.caseName">
                <span>案件名称：</span>
                {{ item.caseName }}
              </p>
              <p class="caseDefid">
                <span>审批状态：</span>
                {{ approvalStatus(item.approvalStatus) }}
              </p>
              <p class="caseDefid" :title="item.creatorName">
                <span>创建人：</span>
                {{ item.creatorName }}
              </p>
              <p class="caseDefid" :title="item.uploadTime">
                <span>上传时间：</span>
                {{ item.uploadTime}}
              </p>
              <!-- <p class="Icon">
                  <span class="el-icon-edit-outline searchBtn" @click="edit(item,item.caseUuid,true,true,item.approvalStatus)"> 编辑</span>
                  <span class="el-icon-delete delBtn" @click="openDelWin(item.caseUuid)"> 删除</span>
              </p>-->
            </li>
            <div class="empty" v-show="uploadDataList.length == 0">
              <img src="../../assets/updataImg/NoData.png" alt>
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
            :total="totalCount"
          ></el-pagination>
        </div>
        <div id="tab2" class="results">
          <ul class="twoUl">
            <li v-for="(item,index) in uploadDataList" :key="index">
              <p class="threeUl">
                <img
                  @click="godetails(item.caseUuid)"
                  class="img_block"
                  :src="item.caseImgUrl"
                  :onerror="$store.state.defaultImg"
                  alt="暂无图片"
                  :title="item.caseName"
                  v-show="item.caseImgUrl"
                >
                <img
                  @click="godetails(item.caseUuid)"
                  class="img_block"
                  src="@/assets/error_none.png"
                  :title="item.caseName"
                  v-show="!item.caseImgUrl"
                >
              </p>
              <div class="fourUl">
                <p>
                  <span>案件名称：</span>
                  {{ item.caseName }}
                </p>
                <p>
                  <span>审批状态：</span>
                  {{ approvalStatus(item.approvalStatus) }}
                </p>
                <p>
                  <span>创
                    <i></i>建
                    <i></i>人：
                  </span>
                  {{ item.creatorName }}
                </p>
                <p>
                  <span>案发时间：</span>
                  {{ item.timeLowLimit }}
                </p>
                <p class="text">
                  <span>简要案情：</span>
                  <b>{{ item.caseAbstract }}</b>
                </p>
              </div>
              <!-- <p class="Icon">
                  <span class="el-icon-edit-outline searchBtn" @click="edit(item,item.caseUuid,true,true,item.approvalStatus)"> 编辑</span>
                  <span class="el-icon-delete delBtn" @click="openDelWin(item.caseUuid)"> 删除</span>
              </p>-->
            </li>
            <div class="empty" v-show="uploadDataList.length == 0">
              <img src="../../assets/updataImg/NoData.png" alt>
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
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <footer>
      <p>
        <img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-2018
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadDataList: [], //上传列表数据
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      pageSizes: [10, 20, 30], //下拉框选择的显示条数
      totalCount: 0, //总条数
      keyWord: "", //案件搜索
      layerOpen: "",
      isvideoCom: false
    };
  },
  filters: {
    approvalStatus(code) {
      if (code == 0) {
        return "新建";
      } else if (code == 1) {
        return "审批中";
      } else if (code == 2) {
        return "审批通过";
      } else if (code == 3) {
        return "审批不通过";
      }
    }
  },
  mounted() {
    this.changeTab("tab1");
  },
  created() {
    this.historyNal();
    this.isvideoCom = this.$route.query.isvideoCom;
  },
  methods: {
    historyNal() {
      this.currentPage = 1;
      this.ajaxDataList();
    },

    //列表渲染
    ajaxDataList() {
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        orderBy: "update_time",
        orderType: "desc",
        begin: "",
        end: "",
        caseName: this.keyWord,
        caseCategory: "",
        approvalStatus: "",
        userId: "",
        orgId: this.$storage.getSession("userInfo").orgId,
        status: 1,
        synergy: -1
      };
      this.$http
        .get("/pca/casemng/basecase/list", { params: data })
        .then(res => {
          this.uploadDataList = res.data.data.list; //所有数据
          this.totalCount = res.data.data.totalCount; //页面总数
          this.currentPage = res.data.data.pageNum; //当前页
          this.pageSize = res.data.data.pageSize; //每页条数
        });
    },
    //编辑
    edit(row, id, edit, myUploadTo, isTrialIng) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let userId = userInfo.value.userId;
      if (isTrialIng == 1) {
        //如果案件在审批中
        this.$notify({
          type: "error",
          message: "该案件在审批中，无法进行编辑！",
          position: "bottom-right",
          duration: 3000
        });
        // layer.alert('该案件在审批中，无法进行编辑！',{icon:7,title:"消息提示"})
      } else {
        // console.log(row,222);
        // if(row.isSpecial == 0){
        //   this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:id,edit:edit,myUploadTo:true,synergyCombat:false}})
        // }
        // else if(row.isSpecial == 1){
        //   this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:id,edit:edit,myUploadTo:true,synergyCombat:true}})
        // }
        if (row.creator == userId) {
          // this.$router.push({path:'/casestudy/caseInfomanage/addcase?menuCode=200', query:{caseUuid:id,edit:edit}})
          this.$router.push({
            path: "/casestudy/caseInfomanage/addcase?menuCode=200",
            query: { caseUuid: id, edit: edit, myUploadTo: myUploadTo }
          });
        } else {
          if (row.isSpecial == 0) {
            this.$router.push({
              path: "/casestudy/caseInfomanage/addcasetwo?menuCode=200",
              query: {
                caseUuid: id,
                edit: true,
                synergyCombat: false,
                hide: false
              }
            });
          } else if (row.isSpecial == 1) {
            this.$router.push({
              path: "/casestudy/caseInfomanage/addcasetwo?menuCode=200",
              query: { caseUuid: id, edit: true, synergyCombat: true }
            });
          }
        }
      }
    },
    //打开删除对话框
    openDelWin(id) {
      this.$myconfirm({
        type: "提示",
        msg: "此操作将删除该案件相关的所有信息, 是否继续?",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          this.del(id);
        })
        .catch(() => {});
      //  this.layerOpen = layer.open({
      //     content: '此操作将删除该案件相关的所有信息, 是否继续?',
      //     icon: 7,
      //     btn: ['确定', '取消'],
      //     yes:()=>{
      //         this.del(id)
      //     },
      // });
    },
    //删除
    del(id) {
      let data = {
        caseUuid: id,
        flag: 0
      };
      data = this.$qs.stringify(data);
      this.$http.post("/pca/casemng/case/del", data).then(response => {
        if (response.data.code == 200) {
          if (response.data.data == 1) {
            this.$myconfirm({
              type: "提示",
              msg: "案件已被串并，是否仍要删除！",
              icon: 4,
              btn: {
                ok: "确定",
                no: "取消"
              }
            })
              .then(() => {
                let data1 = {
                  caseUuid: id,
                  flag: 1
                };
                data1 = this.$qs.stringify(data1);
                this.$http
                  .post("/pca/casemng/case/del", data1)
                  .then(response => {
                    if (response.data.code == 200) {
                      layer.close(this.layerOpen1);
                      this.ajaxDataList(false, true);
                    }
                  });
              })
              .catch(() => {});
            //  layer.close(this.layerOpen)
            //   this.layerOpen1 = layer.open({
            //     content: '案件已被串并，是否仍要删除?',
            //       icon: 2,
            //       btn: ['确定', '取消'],
            //       yes:()=>{
            //         let data1 =  {
            //           caseUuid:id,
            //           flag:1,
            //         }
            //         data1 = this.$qs.stringify(data1);
            //         this.$http.post('/pca/casemng/case/del',data1)
            //         .then((response) => {
            //           if(response.data.code == 200){
            //             layer.close(this.layerOpen1)
            //             this.ajaxDataList(false,true);
            //           }
            //         })
            //       }
            //     });
          } else {
            this.ajaxDataList(false, true);
            this.$notify({
              type: "success",
              message: "删除成功！",
              position: "bottom-right",
              duration: 3000
            });
          }
        } else {
          this.$notify({
            type: "error",
            message: "删除失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //新增案件
    goaddcase() {
      this.$router.push({
        path: "/casestudy/caseInfomanage/addcase?menuCode=200",
        query: { myUploadTo: true, edit: false }
      });
    },
    //切换视图
    changeTab(item) {
      var tabs = ["tab1", "tab2"];
      var items = document.getElementsByClassName("items");
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i] == item) {
          document.getElementById(tabs[i]).style.display = "block";
          items[i].classList.add("active");
        } else {
          document.getElementById(tabs[i]).style.display = "none";
          items[i].classList.remove("active");
        }
      }
    },
    handleSizeChange(val) {
      // this.currentPage = 1
      this.pageSize = val;
      this.ajaxDataList();
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.ajaxDataList();
    },
    //去详情页
    godetails(id) {
      this.$router.push({
        path: "/casestudy/casePicture_look?menuCode=200",
        query: { myUploadTo: true, caseUuid: id }
      });
    },
    //审批状态转中文
    approvalStatus(code) {
      if (code == 0) {
        return "新建";
      } else if (code == 1) {
        return "审批中";
      } else if (code == 2) {
        return "审批通过";
      } else if (code == 3) {
        return "审批不通过";
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
@import "../../assets/css/myupload.css";
.caseDefid {
  display: inline-block;
  width: 49%;
  /* border: 1px solid rgba(84, 136, 189, 0.9);
  margin: 0 0 -1px -1px; */
}
.caseDefid span {
  padding-left: 0.03rem;
}
.results .twoUl li .threeUl {
  display: inline-block;
  width: 2rem;
  height: 100%;
}
.results .twoUl li .fourUl {
  display: inline-block;
  position: absolute;
  margin-left: 0.2rem;
}
.fourUl i {
  width: 0.06rem;
  display: inline-block;
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
.twoUl li b {
  width: 4rem !important;
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
.main_btn .twoUl li > p {
  margin-top: 0;
  border: 1px solid #235588;
}
</style>
