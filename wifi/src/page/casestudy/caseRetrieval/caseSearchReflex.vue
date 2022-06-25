<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <p class="sysname" @click="$router.push('/casestudy/caseRetrieval?menuCode=207')">&nbsp;案事件检索</p>
    </div>
    <div class="contentBody">
      <div class="contentWrapper">
        <div class="contentWrapperTop">
          <div class="conditionbox">
            <span v-for="(item,index) in conditionList" :key="index">
              {{item.value}}
              <i class="items el-icon-close" @click="deleteCondition(item,index)"></i>
            </span>
          </div>
          <div>
            <p class="sysname back" @click="GoBack()">返回上一级</p>
          </div>
          <div class="showType1">
            <span>显示方式:</span>
            <el-radio v-model="radio" label="0" @change="changeSearchResult()">缩略图</el-radio>
            <el-radio v-model="radio" label="1" @change="changeSearchResult()">图文显示</el-radio>
          </div>
        </div>
        <div class="contentWrapperbottom">
          <div style="display: flex;width: 100%;height: calc(100% - 0.54rem)">
            <div class="contentLeft" style="width: 100%;height: 100%;">
              <div class="content">
                <div class="centerImg" v-show="!caseList.length">
                  <img src="../../../assets/updataImg/NoData.png">
                </div>
                <!-- <div class="contentTabs">
                  <div casekey="CaseLevel" class="tabsItem afttabsItem" @click="changeItem($event)">危害程度</div>
                  <div casekey="CaseMethod" class="tabsItem afttabsItem" @click="changeItem($event)">作案手段</div>
                  <div casekey="CaseOpportunity" class="tabsItem afttabsItem" @click="changeItem($event)">作案时机</div>
                  <div casekey="CaseTarget" class="tabsItem afttabsItem" @click="changeItem($event)">侵犯目标</div>
                  <div casekey="CaseTool" class="tabsItem afttabsItem" @click="changeItem($event)">作案工具</div>
                  <div casekey="CaseType" class="tabsItem" @click="changeItem($event,1)">案件类型</div>
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
                <div class="searchCondition" v-show="conditionFlag" @mouseenter="conditionFlag=true" @mouseleave="conditionFlag=false">
                  <div v-for="(item ,index) in searchConditionList" :key="index">
                    <div class="conditionName" @click="detialSearch(item)">{{item.value}}</div>
                    <div class="conditionIcon">|</div>
                  </div>
                </div>-->
                <div class="contentDetialWrapper">
                  <!-- 缩略图视图-->
                  <div v-if="searchResultFlag" class="contentDetial">
                    <div
                      class="detailItem"
                      v-for="(item,index ) in caseList.slice((pageNo-1)*pageSize,pageNo*pageSize)"
                      :key="index"
                    >
                      <ul>
                        <li class="itemImg" @click="lookCase(item)" style="cursor: pointer">
                          <img
                            class="wchsa imgbox"
                            @load="imgscale('.imgbox')"
                            :id="'vmarker_'+index"
                            :src="item.traceImgUrl == '' ? $store.state.defaultImg : item.traceImgUrl"
                            alt="暂无图片"
                          >
                          <img
                            style="height: 100%"
                            src="@/assets/error_none.png"
                            v-show="!item.traceImgUrl"
                          >
                          <span class="picst" v-show="faceShow">
                            <img
                              class="imgPicture"
                              :id="'candidateCase_'+index"
                              :src="item.snapshotFile"
                            >
                            <!-- <img class="imgPicture" :id="'candidateCase_'+index" :src="item.traceImgUrl" /> -->
                          </span>
                          <span :id="'vimg_'+index" class="boderShow"></span>
                        </li>
                        <li class="similarity" style="margin-top:0.05rem;" :title="item.caseName">
                          <span>案件名称:{{item.caseName}}</span>
                        </li>
                        <li class="similarity" style="margin-top:0.05rem;">
                          <span>相似度:{{item.score | score}}</span>
                        </li>
                        <li class="similarity" :title="item.creatorName">
                          <span>上传用户:{{item.creatorName}}</span>
                        </li>
                        <li class="similarity" :title="item.createTime">
                          <span>上传时间:{{item.createTime}}</span>
                        </li>
                        <li style="display: flex;">
                          <div class="addCompare" @click="addcasCase(item.caseUuid)">
                            <img
                              style="margin-top: 2px;width: 20%;"
                              src="../../../assets/case/caseRetrievalSearch-add-icon.png"
                              alt
                            >
                            <div class="handleTxt">添加串并</div>
                          </div>
                          <div class="itemJudged" @click="showCaseNatureDialog(item.caseUuid)">
                            <div class="handleTxt">
                              <span class="el-icon-zoom-in" style="color:#409EFF"></span>案件比对
                            </div>
                          </div>
                          <div
                            class="addCollect"
                            v-show="!item.collect"
                            @click="addCollect(item.caseUuid)"
                          >
                            <img
                              style="margin-top: 2px;width: 20%;"
                              src="../../../assets/case/caseRetrievalSearch-uncollect-icon.png"
                              alt
                            >
                            <div class="handleTxt">添加收藏</div>
                          </div>
                          <div
                            class="addCollect"
                            v-show="item.collect"
                            @click="removeCollect(item.caseUuid)"
                          >
                            <img
                              style="margin-top: 2px;width: 20%;"
                              src="../../../assets/case/caseRetrievalSearch-collect-icon.png"
                              alt
                            >
                            <div class="handleTxt">取消收藏</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!--图文显示视图-->
                  <div v-if="!searchResultFlag" class="textPicture">
                    <div
                      class="textPictureItem"
                      v-for="(item,index ) in caseList.slice((pageNo-1)*pageSize,pageNo*pageSize)"
                      :key="index"
                    >
                      <div class="textPictureItemImg" @click="lookCase(item)">
                        <img
                          class="imgbox"
                          :id="'vmarker_'+index"
                          :src="item.traceImgUrl == '' ? $store.state.defaultImg : item.traceImgUrl"
                          alt="暂无图片"
                        >
                        <img
                          style="height: 100%"
                          src="@/assets/error_none.png"
                          v-show="!item.traceImgUrl"
                        >
                        <span class="graphicDisplay" v-show="faceShow">
                          <img
                            class="imgPicture"
                            :id="'candidateCase_'+index"
                            :src="item.snapshotFile"
                          >
                          <!-- <img class="imgPicture" :id="'candidateCase_'+index" :src="item.traceImgUrl" /> -->
                        </span>
                        <span :id="'vimg_'+index" class="boderShow"></span>
                      </div>
                      <div class="textPictureItemTxt">
                        <div class="tpItem" :title="item.caseName">
                          <span>案件名称 :</span>
                          <span v-text="item.caseName"></span>
                        </div>
                        <div class="tpItem">
                          <span>相似度 :</span>
                          <span>{{item.score | score}}</span>
                        </div>
                        <div class="tpItem" :title="item.creatorName">
                          <span>上传用户 :</span>
                          <span v-text="item.creatorName">&nbsp; 李斯</span>
                        </div>
                        <div class="tpItem" :title="item.createTime">
                          <span>上传时间 :</span>
                          <span v-text="item.createTime">&nbsp;</span>
                        </div>
                        <div class="tpItem" style="width:100%;display: flex">
                          <span style="height: 100%;width: 60px">案件描述 :</span>
                          <div v-text="item.caseAbstract" class="descTpItem"></div>
                        </div>
                      </div>
                      <div class="tpItem tpItemBtn">
                        <div class="textPictureHandle" @click="addcasCase(item.caseUuid)">
                          <img
                            style="margin-top:2px;margin-right: 3px;"
                            src="../../../assets/case/caseRetrievalSearch-add-icon.png"
                            alt
                          >
                          <div class="handleTxt">添加串并</div>
                        </div>
                        <div class="textPictureHandle" @click="showCaseNatureDialog(item.caseUuid)">
                          <div class="handleTxt">
                            <span
                              class="el-icon-zoom-in"
                              style="color:#409EFF;margin-top: 0px;font-size: 16px;"
                            ></span>案件比对
                          </div>
                        </div>
                        <div
                          class="textPictureHandle"
                          v-show="!item.collect"
                          @click="addCollect(item.caseUuid)"
                        >
                          <img
                            style="margin-top:2px;margin-right: 3px;"
                            src="../../../assets/case/caseRetrievalSearch-uncollect-icon.png"
                            alt
                          >
                          <div class="handleTxt">添加收藏</div>
                        </div>
                        <div
                          class="textPictureHandle"
                          v-show="item.collect"
                          @click="removeCollect(item.caseUuid)"
                        >
                          <img
                            style="margin-top:2px;margin-right: 3px;"
                            src="../../../assets/case/caseRetrievalSearch-collect-icon.png"
                            alt
                          >
                          <div class="handleTxt">取消收藏</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 切换分页 -->
          <div class="recodepaginbox">
            <div class="searchType">
              <div>
                <span>搜索到相关记录 : 共</span>
                <span style="color: #F68888">{{totalNum}}</span>
                <span>条</span>
              </div>
            </div>
            <div class="pageNation">
              <el-pagination
                :background="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="Number(this.pageNo)"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :page-size="Number(this.pageSize)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Number(this.totalNum)"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <footer_case></footer_case>
    </div>
    <add-case-from-search
      :isShow="popCaseListVisible"
      :caseUuid="caseUuid"
      @sendToParent="getIsShow"
    ></add-case-from-search>
  </div>
</template>

<script>
import caseNatureDialog from "./caseNatureDialog";
import case3DNatureDialog from "./case3DNatureDialog";
import caseVideoMarkDialog from "./caseVideoMarkDialog";
import caseMessageDialog from "./caseMessageDialog";
import addCaseFromSearch from "./addCaseFromSearch";
import Footer_case from "../../../components/footer_case";
import scale from "../../../api/common/scale.js";
export default {
  components: {
    addCaseFromSearch,
    caseNatureDialog,
    case3DNatureDialog,
    caseVideoMarkDialog,
    caseMessageDialog,
    Footer_case
  },
  mixins: [scale],
  data() {
    return {
      loading: null,
      radio: "0", // 默认显示缩略图
      conditionFlag: false,
      searchResultFlag: true,
      pageNo: 1, // 当前页
      pageSize: 10, // 每页显示10条
      totalNum: 0, // 总页
      keywords: [],
      caseList: [],
      orderBy: "createTime", // 按时间排序
      orderType: "desc", // 默认逆序
      compareList: [],
      compareResultList: [],
      caseUuid: "",
      caseObj: {},
      SearchCondition: {},
      selectKey: "",
      searchConditionList: [],
      conditionList: [],

      caseLevelDesc: "", //危害程度
      caseMethodDesc: "", // 作案手段
      caseOpportunityDesc: "", // 作案时机
      caseTargetDesc: "", // 侵犯目标
      caseToolDesc: "", // 作案工具
      caseCategory: "", // 案件类型
      popCaseListVisible: false,
      refaceList: [],
      imgListWH: [],
      faceShow: false,
      loading: null,
      backItem: "" //从哪个过来的
    };
  },
  watch: {
    // 渲染图片
    caseList: {
      handler(val) {
        val = val.slice(
          (this.pageNo - 1) * this.pageSize,
          this.pageNo * this.pageSize
        );
        if (val.length) {
          this.$nextTick(() => {
            for (let i = 0; i < val.length; i++) {
              var img = new Image();
              img.src = val[i].traceImgUrl;
              img.onload = () => {
                let imgw = document.getElementById("vmarker_" + i).naturalWidth;
                let imgh = document.getElementById("vmarker_" + i)
                  .naturalHeight;
                // let rate = this.$store.state.screenWidth / 1920;
                // let retw =
                //   document.getElementById("vmarkLi" + i).clientWidth * rate;
                // let reth =
                //   document.getElementById("vmarkLi" + i).clientHeight * rate;
                // let unit = 1;
                // let unitTop = 0;
                // let unitLeft = 0;
                // if (retw / reth < imgw / imgh) {
                //   this.imgListWH.push("width");
                //   unit = imgw / retw;
                //   unitTop = (reth - imgh / unit) / 2;
                // } else {
                //   this.imgListWH.push("height");
                //   unit = imgh / reth;
                //   unitLeft = (retw - imgw / unit) / 2;
                // }
                // let leftTopX = val[i].leftTopX;
                // let leftTopY = val[i].leftTopY;
                // let rightBtmX = val[i].rightBtmX;
                // let rightBtmY = val[i].rightBtmY;
                // let top = unitTop + leftTopY / unit;
                // let left = unitLeft + leftTopX / unit;
                // let width = (rightBtmX - leftTopX) / unit;
                // let height = (rightBtmY - leftTopY) / unit;

                setTimeout(() => {
                  let imgs = document.getElementById("candidateCase_" + i);
                  if (
                    this.caseStore.type == 1 &&
                    (val[i].facePos != "" || val[i].facePos != null)
                  ) {
                    this.faceShow = true;
                    let imgWidth = imgs.naturalWidth;
                    let imgHeight = imgs.naturalHeight;
                    let postx = val[i].facePos.split(",");
                    let faceLeft = Number(postx[0]);
                    let faceTop = Number(postx[1]);
                    let faceWidth = Number(postx[2]);
                    let faceHeight = Number(postx[3]);
                    let unit1 = 1;
                    let faceLeftPos = 0;
                    let faceTopPos = 0;
                    if (faceWidth < 60 && faceHeight < 60) {
                      faceTopPos = (60 - faceHeight) / 2;
                      faceLeftPos = (60 - faceWidth) / 2;
                    } else {
                      if (1 < faceWidth / faceHeight) {
                        unit1 = faceWidth / 60;
                        faceLeftPos = 0;
                        faceTopPos = (60 - faceHeight / unit1) / 2;
                      } else {
                        unit1 = faceHeight / 60;
                        faceTopPos = 0;
                        faceLeftPos = (60 - faceWidth / unit1) / 2;
                      }
                    }
                    imgs.style.top = -(faceTop / unit1 - faceTopPos) + "px";
                    imgs.style.left = -(faceLeft / unit1 - faceLeftPos) + "px";
                    imgs.style.width = imgw / unit1 + "px";
                    imgs.style.height = imgh / unit1 + "px";
                  }
                }, 0);
              };
            }
          });
        }
      },
      deep: true
    }
  },
  // 过滤相似度
  filters: {
    score(val) {
      if (val != undefined) {
        return Number(val * 100).toFixed(2) + "%";
      }
    }
  },

  methods: {
    //删除查询条件
    deleteCondition(item, index) {
      let key = item.key;
      switch (key) {
        case "CaseLevel":
          this.conditionList.splice(index, 1);
          this.caseLevelDesc = null;
          this.getPersonalInformate();
          break;
        case "CaseMethod":
          this.conditionList.splice(index, 1);
          this.caseMethodDesc = null;
          this.getPersonalInformate();
          break;
        case "CaseOpportunity":
          this.conditionList.splice(index, 1);
          this.caseOpportunityDesc = null;
          this.getPersonalInformate();
          break;
        case "CaseTarget":
          this.conditionList.splice(index, 1);
          this.caseTargetDesc = null;
          this.getPersonalInformate();
          break;
        case "CaseTool":
          this.conditionList.splice(index, 1);
          this.caseToolDesc = null;
          this.getPersonalInformate();
          break;
        case "CaseType":
          this.conditionList.splice(index, 1);
          this.caseCategory = null;
          this.getPersonalInformate();
          break;
      }
    },
    //改变排序方式
    changeOrderType(event) {
      $(event.srcElement)
        .siblings()[0]
        .classList.remove("orderType");
      event.srcElement.classList.add("orderType");
    },
    //选条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNo = 1;
      this.getPersonalInformate();
    },
    //翻页
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getPersonalInformate();
    },
    //切换搜索结果
    changeSearchResult() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.getPersonalInformate(this.caseStore.type);
      if (this.radio == "0") {
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
    // 添加收藏
    addCollect(caseUuid) {
      console.log(caseUuid, 333333333333);
      let params = {
        caseUuid: caseUuid
      };
      let data = this.$qs.stringify(params);
      this.$http({
        url: "pca/case/related/collect/save",
        method: "post",
        data: data
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            type: "success",
            message: "添加成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.getPersonalInformate(this.caseStore.type);
        } else {
          this.$notify({
            type: "error",
            message: "添加收藏失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // 取消收藏
    removeCollect(caseUuid) {
      let params = {
        caseUuid: caseUuid
      };
      let data = this.$qs.stringify(params);
      this.$http({
        url: "pca/case/related/collect/cancel",
        method: "post",
        data: data
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            type: "success",
            message: "取消成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.getPersonalInformate(this.caseStore.type);
        } else {
          this.$notify({
            type: "error",
            message: "取消失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //返回

    //顶部详细搜索条件

    // 过滤同类型搜索条件
    filterSameVlue(item, value) {
      if (this.conditionList.length === 0) {
        this.conditionList.push(item);
      } else {
        let arr = [];
        for (let i = 0; i < this.conditionList.length; i++) {
          if (this.conditionList[i].key === value) {
            arr.push(this.conditionList[i].key);
            this.conditionList[i].value = item.value;
          }
        }
        if (arr.length === 0) {
          this.conditionList.push(item);
        }
      }
    },
    //按时间正序
    asc_order_time() {
      this.orderBy = "createTime";
      this.orderType = "asc";
      this.pageNo = 1;
      this.pageSize = 10;
      this.getPersonalInformate();
    },
    //按时间逆序
    desc_order_time() {
      this.orderBy = "createTime";
      this.orderType = "desc";
      this.pageNo = 1;
      this.pageSize = 10;
      this.getPersonalInformate();
    },
    //按上传单位正序
    asc_order_org() {
      this.orderBy = "creatorOrgId";
      this.orderType = "asc";
      this.pageNo = 1;
      this.pageSize = 10;
      this.getPersonalInformate();
    },
    //按上传单位逆序
    desc_order_org() {
      this.orderBy = "creatorOrgId";
      this.orderType = "desc";
      this.pageNo = 1;
      this.pageSize = 10;
      this.getPersonalInformate();
    },

    //按案件类型正序
    asc_order_category() {
      this.orderBy = "caseCategoryDesc";
      this.orderType = "asc";
      this.pageNo = 1;
      this.pageSize = 10;
      this.getPersonalInformate();
    },
    //按案件类型逆序
    desc_order_category() {
      this.orderBy = "caseCategoryDesc";
      this.orderType = "desc";
      this.pageNo = 1;
      this.pageSize = 10;
      this.getPersonalInformate();
    },
    // 获取人员车辆信息数据
    getPersonalInformate(type) {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      let data = {
        feature: this.caseStore.feature,
        uuid: "",
        type: this.caseStore.type,
        targetJson: this.caseStore.targetJson
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/feature/case/by/feature", data).then(res => {
        // console.log(res.data.data,"人脸数据");
        this.loading.close();
        if (res.data.code === 200) {
          if (res.data.data == null) {
            this.$notify({
              type: "warning",
              message: "暂无数据！",
              position: "bottom-right",
              duration: 3000
            });
            this.caseList = [];
            this.totalNum = 0;
          } else {
            this.caseList = res.data.data;
            this.totalNum = res.data.data.length;
            this.imgscale(".imgbox");
          }
        } else {
          this.$notify({
            type: "warning",
            message: "暂无数据！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },

    // 添加串并
    addcasCase(caseUuid) {
      this.caseUuid = caseUuid;
      this.popCaseListVisible = true;
    },
    getIsShow() {
      this.popCaseListVisible = false;
    },

    //跳转查看案件
    lookCase(obj) {
      let routeData = this.$router.resolve({
        path: "/casestudy/casePicture_look",
        query: { caseUuid: obj.caseUuid, menuCode: 200 }
      });
      window.open(routeData.href, "_blank");
    },

    //返回上一级
    GoBack() {
      this.$router.push({
        path: "/casestudy/caseRetrieval",
        query: {
          menuCode: 200,
          current: this.backItem
        }
      });
    }
  },
  mounted() {
    this.getPersonalInformate();
  },
  created() {
    this.caseStore = JSON.parse(sessionStorage.getItem("caseSearchReflex"));
    // 获取这个参数
    this.backItem = this.$route.query.current;
    console.log(this.backItem, "kkkkkkkkkkkkkkk");
  }
};
</script>


<style scoped>
@import url("../../../assets/css/commom.css");
.wrapper {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /*user-select: none;*/
  overflow: hidden;
}
.topNav {
  position: fixed;
  top: 0.6rem;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 0.54rem;
  background: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0 1px 1px #cdcdcd;
}
.nav-item {
  min-width: 2.05rem;
  line-height: 0.54rem;
  text-align: center;
  cursor: pointer;
  font-size: 0.18rem;
}
.nav-item-second {
  background: url(../../../assets/images/sysmanage/bg-02.png);
  height: 100%;
  margin-right: -0.13rem;
  background-size: 100% 100%;
}
.nav-item-search {
  height: 100%;
  background: url(../../../assets/images/sysmanage/bg.png);
  color: #63abfe;
  text-align: center;
  background-size: 100% 100%;
}

.contentBody {
  width: 100%;
  height: calc(100vh - 0.9rem);
  display: flex;
  flex-direction: column;
  border-top: 2px solid #1b2837;
}

.contentBody .contentTitle {
  width: 100%;
  height: 0.6rem;
  background-color: #faf9f5;
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
  width: 100%;
  height: calc(100% - 0.6rem);
  /* flex: 1;
  display: flex;
  flex-direction: column; */
}

.contentWrapperTop {
  width: calc(100% - 32px);
  height: 0.47rem;
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  padding-top: 0.16rem;
  padding-bottom: 0.07rem;
  box-sizing: border-box;
  position: relative;
}

.contentWrapperbottom {
  width: calc(100% - 32px);
  margin-left: 15px;
  margin-right: 15px;
  height: calc(100% - 0.5rem);
  display: flex;
  flex-direction: column;
  border: 1px solid #2d659e;
}
.contentWrapperTop .conditionbox {
  display: flex;
}
.contentWrapperTop .conditionbox span {
  font-size: 12px;
  color: white;
  background-color: #2e6fb3;
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
  display: flex;
  flex-direction: column;
  position: relative;
}

.contentTabs {
  width: 100%;
  height: 0.45rem;
  line-height: 0.45rem;
  background-color: rgba(16, 35, 56, 0.5);
  border-bottom: 1px solid rgba(15, 44, 79, 0.5);
  display: flex;
  align-items: center;
  position: relative;
}

.showType1 {
  position: absolute;
  right: 0px;
  top: 0.14rem;
  width: 4rem;
  color: #99c9fa;
  text-align: right;
}
.showType1 span {
  font-size: 0.14rem;
  margin-right: 0.1rem;
}
.showType1 >>> .el-radio__label {
  font-size: 0.14rem;
}

.tabsItem {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.14rem;
  height: 0.45rem;
  color: #99c9fa;
  padding: 0.05rem 0.1rem;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.afttabsItem::after {
  content: "";
  width: 1px;
  height: 0.12rem;
  position: absolute;
  right: 0;
  background-color: #409eff;
}
.contentTabs .tabDefault {
  color: #4ea5ff;
  border-bottom: 2px solid #4ea5ff;
}
.searchCondition {
  position: absolute;
  z-index: 2;
  width: 100%;
  top: 0.54rem;
  font-size: 12px;
  background-color: rgba(20, 57, 96, 0.8);
}

.searchCondition div {
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  color: #99c9fa;
  cursor: pointer;
}
.conditionName {
  width: auto;
}

.conditionName.on,
.conditionName:hover {
  color: #63abfe;
}
.conditionIcon {
  color: #828282;
  margin-left: 10px;
  margin-bottom: 2px;
}

.orderType {
  color: #ff6600;
}

.contentDetialWrapper {
  height: 100%;
  width: 100%;
}

.contentDetial {
  width: 100%;
  height: 100%;
  padding: 0.15rem 0.2rem 0 0.2rem;
  overflow-y: auto;
}

.textPicture {
  width: 100%;
  height: calc(100% - 0.1rem);
  padding: 0.1rem 0.2rem;
  overflow-y: auto;
}

.textPictureItem {
  width: 49%;
  height: 1.9rem;
  display: inline-block;
  margin-top: 0.1rem;
  padding: 0.05rem;
  background-color: rgba(16, 35, 56, 0.5);
  vertical-align: top;
}
.textPictureItem::after {
  display: block;
  content: " ";
  clear: both;
}
.textPictureItem:nth-child(even) {
  margin-left: 1%;
}

.detailItem {
  display: inline-block;
  margin: 0 0.15rem 0.15rem 0;
  width: calc(20% - 0.12rem);
  background-color: rgba(16, 35, 56, 0.5);
  border: 1px solid rgba(15, 44, 79, 0.5);
  vertical-align: top;
}

.contentDetial .detailItem:nth-child(5n) {
  margin-right: 0px;
}
.contentDetial .detailItem:nth-child(1n + 6) {
  margin-bottom: 0;
}

.detailItem ul {
  padding: 0.05rem;
  width: 100%;
  height: 100%;
}

.detailItem ul li {
  width: 100%;
  line-height: 0.2rem;
  font-size: 0.12rem;
  height: 0.2rem;
  word-break: break-all;
  overflow: hidden;
  color: #99c9fa;
  position: relative;
}
.wchsa {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
/* .wchsa.height {
  height: 100%;
  width: auto;
}
.wchsa.width {
  width: 100%;
  height: auto;
} */
.detailItem ul li.itemImg {
  height: 1.85rem;
  text-align: center;
  border: 1px solid #2d659e;
}
.picst {
  width: 0.6rem;
  height: 0.6rem;
  border: 1px solid blue;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  float: right;
  color: #fff;
}
.graphicDisplay {
  width: 0.6rem;
  height: 0.6rem;
  border: 1px solid blue;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  float: right;
  color: #fff;
  margin-top: 0.34rem;
}
.searchType {
  position: relative;
  width: 100%;
  height: 0.3rem;
  display: flex;
  align-items: center;
  font-size: 12px;
  /* border-bottom: 1px solid #EDEFF2; */
  padding-left: 20px;
  color: #99c9fa;
}

.searchTypeRight {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  color: #b5d3f2;
}
.searchTypeRight .el-icon-caret-top {
  color: #b5d3f2;
}
.contentBottom {
  width: 100%;
  height: 0.54rem;
  background-color: #faf9f5;
  border: 1px solid #edeff2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btnBack {
  width: 1rem;
  height: 0.36rem;
  font-size: 0.14rem;
  background-color: #e6a23c;
  margin-right: 3.5%;
  border-radius: 3px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.recodepaginbox {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.pageNation {
  width: 100%;
  /* margin-top: 0.1rem; */
  margin-right: 0.2rem;
  text-align: right;
  /*position: absolute;*/
  /*bottom: 5px;*/
  /*right: 0;*/
}

.addCompare {
  background-color: #21517d;
  border: 1px solid #2285ba;
  color: #d1e9f0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  font-size: 12px;
  cursor: pointer;
}
.similarity {
  /* padding: 0.1rem 0.05rem; */
  border: 1px solid rgba(84, 136, 189, 0.9);
  width: 49.9% !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  float: left;
  margin: 0 0 -1px -1px;
}
.similarity span {
  padding-left: 0.03rem;
}
.itemJudged {
  background-color: #21517d;
  border: 1px solid #2285ba;
  color: #d1e9f0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  font-size: 12px;
  cursor: pointer;
}

.addCollect {
  background-color: #21517d;
  border: 1px solid #2285ba;
  color: #d1e9f0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}

.contentTabs /deep/ .el-radio + .el-radio {
  margin-left: 0;
}

.contentRight {
  width: 13%;
  height: 100%;
  border: 1px solid #edeff2;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
}

.rightItemList {
  width: 100%;
  height: calc(100% - 0.54rem - 1rem);
  border-bottom: 1px solid #edeff2;
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
  position: relative;
}
.rightItem .el-icon-close {
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.doCompare {
  padding: 5px 15% 5px 15%;
  background-color: #f7f7f7;
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
  position: relative;
  border: 1px solid #2d659e;
}

.textPictureItemTxt {
  float: left;
  width: 50%;
  height: 100%;
  /* display: flex; */
  /* flex-direction: column; */
  padding-left: 0.2rem;
  font-size: 12px;
  line-height: 20px;
  padding-top: 0.1rem;
}

.textPictureItemTxt .tpItem {
  display: flex;
  color: #99c9fa;
  line-height: 0.2rem;
}
.textPictureItemTxt .tpItem > span:first-child {
  width: 0.6rem;
}
.tpItemBtn {
  float: left;
  width: 30%;
  /* margin-top: 0.12rem; */
}
.textPictureItemTxt .descTpItem {
  color: #99c9fa;
  word-break: break-all;
  word-wrap: break-word;
  width: calc(100% - 67px);
  max-height: 40px;
  overflow: hidden;
}

.textPictureHandle {
  display: flex;
  width: 1.2rem;
  margin-bottom: 0.1rem;
  background-color: #21517d;
  border: 1px solid #2285ba;
  color: #d1e9f0;
  padding: 2px 0.05rem;
  margin-right: 5px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* -webkit-box-shadow: 1px 1px 5px 2px #ccc;
    box-shadow: 1px 1px 5px 2px #ccc; */
}
.textPictureHandle img {
  display: flex;
}
.handleTxt {
  font-size: 0.12rem;
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
.boderShow {
  position: absolute;
  z-index: 2;
}
.imgPicture {
  position: absolute;
  right: auto;
  bottom: auto;
  margin: 0;
}
.centerImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.imgbox {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
