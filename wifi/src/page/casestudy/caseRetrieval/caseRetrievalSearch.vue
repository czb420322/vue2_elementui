<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <p class="sysname" @click="$router.push('/casestudy/caseRetrieval?menuCode=207')">&nbsp;案事件检索</p>
      <!-- <p class="sysname">&nbsp;案事件检索</p> -->
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
              <!-- <p class="sysname back" @click="$router.push('/casestudy/caseRetrieval?menuCode=207')">返回上一级</p> -->
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
                <div class="contentTabs">
                  <div
                    casekey="CaseLevel"
                    class="tabsItem afttabsItem"
                    @click="changeItem($event)"
                  >危害程度</div>
                  <div
                    casekey="CaseMethod"
                    class="tabsItem afttabsItem"
                    @click="changeItem($event)"
                  >作案手段</div>
                  <div
                    casekey="CaseOpportunity"
                    class="tabsItem afttabsItem"
                    @click="changeItem($event)"
                  >作案时机</div>
                  <div
                    casekey="CaseTarget"
                    class="tabsItem afttabsItem"
                    @click="changeItem($event)"
                  >侵犯目标</div>
                  <div
                    casekey="CaseTool"
                    class="tabsItem afttabsItem"
                    @click="changeItem($event)"
                  >作案工具</div>
                  <div casekey="CaseType" class="tabsItem" @click="changeItem($event,1)">案件类型</div>
                  <div class="searchTypeRight">
                    <span>排序:</span>
                    <span style="margin-left: 15px">上传时间</span>
                    <div style="display: flex;flex-direction: column">
                      <div
                        @click="nowIndex = 0;asc_order_time()"
                        :class="{orderType:0 == nowIndex}"
                        class="el-icon-caret-top"
                        style="cursor: pointer"
                      ></div>
                      <div
                        @click="nowIndex = 1;desc_order_time()"
                        :class="{orderType:1 == nowIndex}"
                        class="el-icon-caret-bottom"
                        style="margin-top: -5px;cursor: pointer"
                      ></div>
                    </div>

                    <!-- <span style="margin-left: 15px">上传单位</span>
                    <div style="display: flex;flex-direction: column">
                      <div
                        @click="nowIndex = 2;asc_order_org()"
                        :class="{orderType:2 == nowIndex}"
                        class="el-icon-caret-top"
                        style="cursor: pointer"
                      ></div>
                      <div
                        @click="nowIndex = 3;desc_order_org()"
                        :class="{orderType:3 == nowIndex}"
                        class="el-icon-caret-bottom"
                        style="margin-top: -5px;cursor: pointer"
                      ></div>
                    </div>

                    <span style="margin-left: 15px">案件类型</span>
                    <div style="display: flex;flex-direction: column">
                      <div
                        @click="nowIndex = 4;asc_order_category()"
                        :class="{orderType:4 == nowIndex}"
                        class="el-icon-caret-top"
                        style="cursor: pointer"
                      ></div>
                      <div
                        @click="nowIndex = 5;desc_order_category()"
                        :class="{orderType:5 == nowIndex}"
                        class="el-icon-caret-bottom"
                        style="margin-top: -5px;cursor: pointer"
                      ></div>
                    </div> -->
                  </div>
                </div>
                <div
                  class="searchCondition"
                  v-show="conditionFlag"
                  @mouseenter="conditionFlag=true"
                  @mouseleave="conditionFlag=false"
                >
                  <div v-for="(item ,index) in searchConditionList" :key="index">
                    <div class="conditionName" @click="detialSearchs(item)">{{item.value}}</div>
                    <div class="conditionIcon">|</div>
                  </div>
                </div>
                <div class="contentDetialWrapper">
                  <!-- 缩略图视图-->
                  <div v-if="searchResultFlag" class="contentDetial">
                    <div class="detailItem" v-for="(item,index ) in caseList" :key="index">
                      <ul>
                        <li class="itemImg" @click="lookCase(item)" style="cursor: pointer">
                          <img class="imgbox wchsa" @load="imgscale('.imgbox')" :src="item.caseImgUrl == null ? $store.state.defaultImg : item.caseImgUrl" :onerror="$store.state.defaultImg">
                        </li>
                        <li class="caseDefid" style="margin-top:0.05rem;" :title="item.caseName">
                          <span>案件名称:</span>
                          <span v-text="item.caseName"></span>
                        </li>
                        <li class="caseDefid" style="margin-top:0.05rem;">
                          <span>上传用户:</span>
                          <span v-text="item.creatorName"></span>
                        </li>
                        <li class="caseDefid" style="margin-bottom:0.05rem;">
                          <span>上传时间:</span>
                          <span :title="item.uploadTime" v-text="item.uploadTime"></span>
                        </li>
                        <li class="caseDefid" style="margin-bottom:0.05rem;">
                          <span>案件类型:</span>
                          <span v-text="item.caseCategoryDesc"></span>
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
                    <div class="textPictureItem" v-for="(item,index ) in caseList" :key="index">
                      <div class="textPictureItemImg" @click="lookCase(item)">
                        <img
                          @load="imgscale('.imgbox')"
                          class="imgbox wchsa width"
                          :src="item.caseImgUrl == null ? $store.state.defaultImg : item.caseImgUrl"
                          alt="暂无图片"
                          :onerror="$store.state.defaultImg"
                        >
                      </div>
                      <div class="textPictureItemTxt">
                        <div class="tpItem">
                          <span>案件名称 :</span>
                          <span :title="item.caseName">{{item.caseName}}</span>
                        </div>
                        <div class="tpItem">
                          <span>上传用户 :</span>
                          <span v-text="item.creatorName"></span>
                        </div>
                        <div class="tpItem">
                          <span>上传时间 :</span>
                          <span :title="item.uploadTime">{{item.uploadTime}}</span>
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
                :page-sizes="[10, 20, 30]"
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
import scale from '../../../api/common/scale.js'
export default {
  components: {
    addCaseFromSearch,
    caseNatureDialog,
    case3DNatureDialog,
    caseVideoMarkDialog,
    caseMessageDialog,
    Footer_case
  },
  data() {
    return {
      loading: null,
      radio: "0",
      conditionFlag: false,
      searchResultFlag: true,
      pageNo: 1,
      pageSize: 10,
      totalNum: 0,
      keywords: [],
      caseList: [],
      orderBy: "uploadTime",
      orderType: "desc",
      compareList: [],
      compareResultList: [],
      caseUuid: "",
      caseObj: {},
      SearchCondition: {},
      selectKey: "",
      searchConditionList: [],
      conditionList: [],

      caseLevelDesc: "", //危害程度
      caseMethodDesc: "", //作案手段
      caseOpportunityDesc: "", //作案时机
      caseTargetDesc: "", //侵犯目标
      caseToolDesc: "", //作案工具
      caseCategory: "", //案件类型
      popCaseListVisible: false,
      searchType: 0,
      nowIndex: null,
      backItem:'',//从哪个查询条件过来的
    };
  },
  mixins:[scale],
  created() {
    this.SearchCondition = JSON.parse(
      sessionStorage.getItem("caseSearchCondition")
    );
    let fromFlag = this.$route.query.from;
    // console.log(fromFlag,"取出的这个flag");

    // caseTargetDesc
    this.caseCategory = this.SearchCondition.caseCategoryDesc;
    this.caseMethodDesc = this.SearchCondition.caseMethodDesc;
    this.caseLevelDesc = this.SearchCondition.caseLevelDesc;
    this.caseTargetDesc = this.SearchCondition.caseTargetDesc;
    this.caseToolDesc = this.SearchCondition.caseToolDesc;
    this.caseOpportunityDesc = this.SearchCondition.caseOpportunityDesc;
    if (this.caseCategory) {
      this.filterSameVlue(
        { key: "CaseType", value: this.caseCategory },
        "CaseType"
      );
    }
    if (this.caseMethodDesc) {
      this.filterSameVlue(
        { key: "CaseMethod", value: this.caseMethodDesc },
        "CaseMethod"
      );
    }
    if (this.caseLevelDesc) {
      this.filterSameVlue(
        { key: "CaseLevel", value: this.caseLevelDesc },
        "CaseLevel"
      );
    }
    if (this.caseTargetDesc) {
      this.filterSameVlue(
        { key: "CaseTarget", value: this.caseTargetDesc },
        "CaseTarget"
      );
    }
    if (this.caseToolDesc) {
      this.filterSameVlue(
        { key: "CaseTool", value: this.caseToolDesc },
        "CaseTool"
      );
    }
    if (this.caseOpportunityDesc) {
      this.filterSameVlue(
        { key: "CaseOpportunity", value: this.caseOpportunityDesc },
        "CaseOpportunity"
      );
    }
    //获取这个参数
   this.backItem = this.$route.query.current;

  },
   mounted() {
    this.getDetialSearchData();
  },
  methods: {
    changeItem(event, type) {
      let Item = document.getElementsByClassName("tabsItem");
      for (let i = 0; i < Item.length; i++) {
        if (i < Item.length - 1) {
          Item[i].className = "tabsItem afttabsItem";
        } else {
          Item[i].className = "tabsItem ";
        }
      }
      if (type == 1) {
        event.target.className = "tabsItem tabDefault";
      } else {
        event.target.className = "tabsItem tabDefault afttabsItem";
      }
      this.conditionFlag = true;
      this.selectKey = event.srcElement.getAttribute("casekey");
      this.pageNo = 1;
      this.getTopSearchData();
    },
    //删除查询条件
    deleteCondition(item, index) {
      let key = item.key;
      switch (key) {
        case "CaseLevel":
          this.conditionList.splice(index, 1);
          this.caseLevelDesc = null;
          this.getDetialSearchData();
          break;
        case "CaseMethod":
          this.conditionList.splice(index, 1);
          this.caseMethodDesc = null;
          this.getDetialSearchData();
          break;
        case "CaseOpportunity":
          this.conditionList.splice(index, 1);
          this.caseOpportunityDesc = null;
          this.getDetialSearchData();
          break;
        case "CaseTarget":
          this.conditionList.splice(index, 1);
          this.caseTargetDesc = null;
          this.getDetialSearchData();
          break;
        case "CaseTool":
          this.conditionList.splice(index, 1);
          this.caseToolDesc = null;
          this.getDetialSearchData();
          break;
        case "CaseType":
          this.conditionList.splice(index, 1);
          this.caseCategory = null;
          this.getDetialSearchData();
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
      this.getDetialSearchData();
    },
    //翻页
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getDetialSearchData();
    },
    //切换搜索结果
    changeSearchResult() {
        // 清空时间状态
      this.nowIndex = null;
      if (this.radio == "0") {
        this.searchResultFlag = true;
        this.getDetialSearchData()
      } else {
        this.searchResultFlag = false;
        this.getDetialSearchData()
      }
    },
    //案件属性比对弹出框显示
    showCaseNatureDialog(caseUuid) {
      this.$store.state.caseUuid = caseUuid;
      this.$store.state.caseNatureDialogFlag = true;
    },
    addCollect(caseUuid) {
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
          this.getDetialSearchData();
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
          this.getDetialSearchData();
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
    GoBack() {
      this.$router.push({
        path:'/casestudy/caseRetrieval',
        query:{
          menuCode:200,
          current:this.backItem,
        }
      })
    },
    getTopSearchData() {
      this.$http({
        url: "sms/static/getCaseBaseData",
        method: "get",
        params: {
          casekey: this.selectKey
        }
      }).then(res => {
        if (res.statusText === "OK" && res.data.code === 200) {
          this.searchConditionList = res.data.data;
        } else {
          this.$notify({
            type: "error",
            message: "获取条件列表失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //顶部详细搜索条件
    detialSearchs(item) {
      let key = item.key;
      switch (key) {
        case "CaseLevel":
          this.filterSameVlue(item, "CaseLevel");
          this.caseLevelDesc = item.value;
          this.getDetialSearchData();
          break;
        case "CaseMethod":
          this.filterSameVlue(item, "CaseMethod");
          this.caseMethodDesc = item.value;
          this.getDetialSearchData();
          break;
        case "CaseOpportunity":
          this.filterSameVlue(item, "CaseOpportunity");
          this.caseOpportunityDesc = item.value;
          this.getDetialSearchData();
          break;
        case "CaseTarget":
          this.filterSameVlue(item, "CaseTarget");
          this.caseTargetDesc = item.value;
          // console.log(this.caseTargetDesc,999999999)
          this.getDetialSearchData();
          break;
        case "CaseTool":
          this.filterSameVlue(item, "CaseTool");
          this.caseToolDesc = item.value;
          this.getDetialSearchData();
          break;
        case "CaseType":
          this.filterSameVlue(item, "CaseType");
          this.caseCategory = item.value;
          this.getDetialSearchData();
          break;
      }
    },

    getDetialSearchData() {
      if (this.conditionList.length) {
        this.searchType = 1;
      } else {
        this.searchType = 0;
      }
      let params = {
        opeType: this.SearchCondition.opeType,
        searchType: this.searchType,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        /*基本信息*/
        keyword: this.SearchCondition.keyword,
        caseLinkMark: this.SearchCondition.caseLinkMark,
        caseName: this.SearchCondition.caseName,
        state: this.SearchCondition.state,
        placeFullAddress: this.SearchCondition.placeFullAddress,
        startTime: this.SearchCondition.startTime,
        endTime: this.SearchCondition.endTime,
        startTime2: this.SearchCondition.startTime2,
        endTime2: this.SearchCondition.endTime2,
        caseCategoryDesc: this.caseCategory,
        caseMethodDesc: this.caseMethodDesc,
        caseLevelDesc: this.caseLevelDesc,
        caseTargetDesc: this.caseTargetDesc, //侵犯目标
        caseToolDesc: this.caseToolDesc,
        caseOpportunityDesc: this.caseOpportunityDesc,

        creatorName: this.SearchCondition.creatorName,
        creatTimeUp: this.creatTimeUp,
        creatTimeDown: this.creatTimeDown,
        /*人员信息*/
        genderCode: this.SearchCondition.genderCode,
        ageType: this.SearchCondition.ageUpLimit,
        heightUpLimit: this.SearchCondition.heightUpLimit,
        behaviorDescription: this.SearchCondition.behaviorDescription,
        bodySpeciallMark: this.SearchCondition.bodySpeciallMark,
        bodyType: this.SearchCondition.bodyType,
        hairColor: this.SearchCondition.hairColor,
        pcoatStyle: this.SearchCondition.pcoatStyle,
        pcoatColor: this.SearchCondition.pcoatColor,
        ptrousersStyle: this.SearchCondition.ptrousersStyle,
        ptrousersColor: this.SearchCondition.ptrousersColor,
        shoesStyle: this.SearchCondition.shoesStyle,
        shoesColor: this.SearchCondition.shoesColor,
        glassStyle: this.SearchCondition.glassStyle,
        tphairStyle: this.SearchCondition.tphairStyle,
        ethicCode: this.SearchCondition.ethicCode,
        tpcoatTexture: this.SearchCondition.tpcoatTexture,
        viewType: this.SearchCondition.viewType,
        /**机动车**/
        behavior: this.SearchCondition.behavior,
        vehicleModel: this.SearchCondition.vehicleModel,
        mvehicleBrand: this.SearchCondition.mvehicleBrand,
        mplateNo: this.SearchCondition.mplateNo,
        mvehicleColor: this.SearchCondition.mvehicleColor,
        mfilmColor: this.SearchCondition.mfilmColor,
        propertySunroof: this.SearchCondition.propertySunroof,
        tmplateClass: this.SearchCondition.tmplateClass,
        vehicleClass: this.SearchCondition.vehicleClass,
        /**非机动车**/
        plateClass: this.SearchCondition.plateClass,
        plateColor: this.SearchCondition.plateColor,
        plateNo: this.SearchCondition.plateNo,
        plateNoAttach: this.SearchCondition.plateNoAttach,
        plateDescribe: this.SearchCondition.plateDescribe,
        vehicleBrand: this.SearchCondition.vehicleBrand,
        vehicleType: this.SearchCondition.vehicleType,
        vehicleLength: this.SearchCondition.vehicleType,
        vehicleColor: this.SearchCondition.vehicleColor,
        vehicleHood: this.SearchCondition.vehicleHood,
        vehicleTrunk: this.SearchCondition.vehicleTrunk,
        vehicleWheel: this.SearchCondition.vehicleWheel,
        wheelPrintedPattern: this.SearchCondition.wheelPrintedPattern,
        vehicleWindow: this.SearchCondition.vehicleWindow,
        vehicleRoof: this.SearchCondition.vehicleRoof,
        vehicleDoor: this.SearchCondition.vehicleDoor,
        sideOfVehicle: this.SearchCondition.sideOfVehicle,
        carOfVehicle: this.SearchCondition.carOfVehicle,
        rearviewMirror: this.SearchCondition.rearviewMirror,
        vehicleChassis: this.SearchCondition.vehicleChassis,
        vehicleShielding: this.SearchCondition.vehicleShielding,
        filmColor: this.SearchCondition.filmColor,
        hairStyle: this.SearchCondition.hairStyle,
        coatStyle: this.SearchCondition.coatStyle,
        coatColor: this.SearchCondition.coatColor,
        coatTexture: this.SearchCondition.coatTexture,
        trousersStyle: this.SearchCondition.trousersStyle,
        trousersColor: this.SearchCondition.trousersColor,
        bagStyle: this.SearchCondition.bagStyle,
        bagColor: this.SearchCondition.bagColor,
        carryingType: this.SearchCondition.carryingType,
        tbageType: this.SearchCondition.tbageType,
        driverCount: this.SearchCondition.driverCount,
        eyePart: this.SearchCondition.eyePart,
        mouthPart: this.SearchCondition.mouthPart,
        scarf: this.SearchCondition.scarf,
        tbethicCode: this.SearchCondition.tbethicCode,
        tbgenderCode: this.SearchCondition.tbgenderCode,
        tbbodyType: this.SearchCondition.tbbodyType,
        umbrellaFlag: this.SearchCondition.umbrellaFlag,
        tbviewType: this.SearchCondition.tbviewType
      };
      let data = this.$qs.stringify(params);
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      this.$http({
        url: "pca/search/advanced/newList",
        method: "post",
        data: data
      }).then(res => {
        this.loading.close();
        if (res.data.code === 200) {
          if (res.data.data == "暂无数据") {
            this.caseList = [];
            this.totalNum = 0;
          } else {
            this.caseList = res.data.data.list;
            this.totalNum = res.data.data.totalCount;
            this.pageSize = res.data.data.pageSize;
            this.pageNo = res.data.data.pageNum;
            this.imgscale('.imgbox')
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取案件列表失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // 过滤同类型搜索条件
    filterSameVlue(item, value) {
      if (this.conditionList.length == 0) {
        this.conditionList.push(item);
      } else {
        let arr = [];
        for (let i = 0; i < this.conditionList.length; i++) {
          if (this.conditionList[i].key == value) {
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
      this.orderBy = "uploadTime";
      this.orderType = "asc";
      this.pageNo = 1;
      this.pageSize = 10;
      setTimeout(()=>{
        this.getDetialSearchData();
      },1)

    },
    //按时间逆序
    desc_order_time() {
      this.orderBy = "uploadTime";
      this.orderType = "desc";
      this.pageNo = 1;
      this.pageSize = 10;
      setTimeout(()=>{
        this.getDetialSearchData();
      },1)
    },
    //按上传单位正序
    asc_order_org() {
      this.orderBy = "creatorOrgId";
      this.orderType = "asc";
      this.pageNo = 1;
      this.pageSize = 10;
       setTimeout(()=>{
        this.getDetialSearchData();
      },1)
    },
    //按上传单位逆序
    desc_order_org() {
      this.orderBy = "creatorOrgId";
      this.orderType = "desc";
      this.pageNo = 1;
      this.pageSize = 10;
       setTimeout(()=>{
        this.getDetialSearchData();
      },1)
    },

    //按案件类型正序
    asc_order_category() {
      this.orderBy = "caseCategoryDesc";
      this.orderType = "asc";
      this.pageNo = 1;
      this.pageSize = 10;
      setTimeout(()=>{
        this.getDetialSearchData();
      },1)
    },
    //按案件类型逆序
    desc_order_category() {
      this.orderBy = "caseCategoryDesc";
      this.orderType = "desc";
      this.pageNo = 1;
      this.pageSize = 10;
      setTimeout(()=>{
        this.getDetialSearchData();
      },1)
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
    }
  },


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
  /* background-color: #FFFFFF; */
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
  height: calc(100vh - .9rem);
  /* margin-top: 0.54rem; */
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
  height: calc(100% - .6rem);
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
  /* border: 1px solid #E9EBEF; */
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
  /* background-color: #F9FAF8; */
  color: #4ea5ff;
  /* border-top: 2px solid #4EA5FF;
    border-left: 1px solid #E2E6EC;
    border-right: 1px solid #E2E6EC; */
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

.contentDetialWrapper {
  height: calc(100% - 0.54rem);
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
  height: calc(100% - 30px);
  padding: 0.1rem 0.2rem;
  overflow-y: auto;
}

.textPictureItem {
  width: 49%;
  height: 1.9rem;
  display: inline-block;
  margin-top: 0.1rem;
  /* display: flex; */
  padding: 0.05rem;
  background-color: rgba(16, 35, 56, 0.5);
}
.textPictureItem::after {
  display: block;
  content: " ";
  clear: both;
}
.textPictureItem:nth-child(even) {
  margin-left: 1%;
}
.wchsa {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.wchsa.height {
  height: 100%;
  width: auto;
}
.wchsa.width {
  width: 100%;
  height: auto;
}
.detailItem {
  display: inline-block;
  margin: 0 0.15rem 0.15rem 0;
  width: calc(20% - 0.12rem);
  /* height:3.3rem; */
  background-color: rgba(16, 35, 56, 0.5);
  border: 1px solid rgba(15, 44, 79, 0.5);
  vertical-align: top;
  /* max-height:calc((100% - 0.2rem - 0.15rem)/2) */
  /*user-select: none;*/
  /*height: 242px;*/
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
}
.detailItem ul .caseDefid {
  width: 49.9%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  float: left;
  /* border: 1px solid rgba(84, 136, 189, 0.9); */
  /* margin: 0 0 -1px -1px; */
}
.caseDefid span {
  padding-left: 0.03rem;
}
.detailItem ul li.itemImg {
  height: 1.85rem;
  text-align: center;
  border: 1px solid #2d659e;
  position: relative;
  overflow: hidden;
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
.searchTypeRight .orderType {
  color: #ff6600;
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
  padding-left: .2rem;
  font-size: 12px;
  line-height: .2rem;
  padding-top: .1rem;
}

.textPictureItemTxt .tpItem {
  display: flex;
  color: #99c9fa;
  line-height: .24rem;
}
.textPictureItemTxt .tpItem > span:first-child {
  width: .6rem;
}
.tpItemBtn {
  float: left;
  width: 30%;
  padding-top: .1rem;
  /* margin-top: 0.12rem; */
}
.tpItem span{
  display: inline-block;
}
.tpItem span:nth-child(2){
  width: 2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
.back {
  margin-left: .1rem;
}
</style>

