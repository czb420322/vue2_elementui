<template>
  <div class="productDetailPage">
    <i class="top_bar" :style="{ height: $iosSystem + 'px' }"></i>
    <van-nav-bar title="产品详情" :border="false" :fixed="true">
      <template #left>
        <van-icon
          name="arrow-left"
          color="#3B3B3B"
          size="20"
          @click="onClickLeft"
        />
      </template>
      <!-- <template #right>
        <van-icon :name="img" size="18" @click="fenx()" />
      </template> -->
    </van-nav-bar>

    <div class="page-group">
      <div
        ref="scrollContent"
        @scroll="contentScroll"
        class="content product-detail-content afe-area-inset-bottom"
        style="bottom: 2.5rem"
      >
        <div class="product-detail-div">
          <div
            class="product-banner"
            :style="{ 'padding-top': $iosSystem + 45 + 'px' }"
          >
            <video
              v-if="pageData.saleNameDesc"
              style="width: 100%"
              webkit-playsinline="true"
              playsinline="true"
              controls
              :poster="pageData.saleTopPic"
            >
              <source :src="pageData.saleNameDesc" type="video/mp4" />
            </video>

            <div
              class="banner background-img"
              v-else
              :style="{
                height: '57.6vw',
                backgroundImage: 'url(' + pageData.saleTopPic + ')',
              }"
            >
              <div
                class="banner-overlay"
                style="
                  background-color: rgba(0, 0, 0, 0);
                  height: 100%;
                  width: 100%;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                "
              >
                <p class="banner-name" style="padding: 0px; line-height: 1">
                  {{ pageData.saleNameDesc }}
                </p>
                <p
                  class="banner-desc"
                  style="margin: 1rem 0px; padding: 0px 0.9rem 0px 0px"
                >
                  <!-- <span>{{pageData.saleTipDesc}}</span> -->
                </p>
              </div>
            </div>
          </div>

          <div v-if="pageData.isCoverageMapper == 'Y'">
            <div class="product-desc-title">
              <h4 class="index-content-title" style="margin: 0.2rem 0px 0.5rem">
                <span></span>保障范围
              </h4>
            </div>
            <div
              class="list-block"
              style="margin-top: 0px; border-top: 1px solid rgb(231, 231, 231)"
            >
              <ul
                class="no-gap"
                style="
                  padding-bottom: 0px;
                  padding-top: 0px;
                  margin-bottom: 0.7rem;
                "
              >
                <template v-for="(coverage, index) in pageData.coverageList">
                  <div>
                    <div class="lineShow">
                      <li class="item-content h5-item-content showPlan">
                        <div
                          class="item-inner h5-item-inner item-detail all-price"
                          style="
                            border-top: none;
                            border-bottom: 1px solid rgb(231, 231, 231);
                          "
                        >
                          <div style="margin: 4px 0px">
                            {{ coverage.coverageName }}
                          </div>
                          <div class="more-list1">
                            <span>{{ coverage.coverageDesc }}</span>
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                </template>
              </ul>
            </div>
          </div>

          <!-- 方案 -->
          <div class="schemeTab">
            <van-tabs
              :class="'schemeTab' + programmeInfoList.length"
              v-model="schemeActive"
              @click="programmeInfo"
              :swipe-threshold="3"
              animated
            >
              <van-tab
                v-for="(item, index) in programmeInfoList"
                :key="index"
                title="index"
              >
                <template #title>
                  <div class="item">
                    <p class="price" v-if="saleCode != 'GRMOBILE_MALL_SL032'">
                      {{ item.programmePremium }}<span>元</span>
                      <span v-if="item.programmeType">{{item.programmeType}}</span>
                    </p>
                    <p
                      :class="
                        saleCode == 'GRMOBILE_MALL_SL032'
                          ? 'fosize14 name'
                          : 'name'
                      "
                    >
                      {{ item.programmeName }}
                    </p>
                  </div>
                </template>
              </van-tab>
            </van-tabs>
          </div>

          <div
            v-if="pageData.salePlanInfo != null && pageData.salePlanInfo != ''"
          >
            <ol
              class="list-box mainRiskList"
              v-if="saleCode == 'GRMOBILE_MALL_SL032'"
            >
              <li class="item">
                <div
                  v-for="(mainRisk, index) in pageData.mainRiskList"
                  :key="index"
                >
                  <van-field
                    v-if="mainRisk.selAmount"
                    is-link
                    input-align="right"
                    readonly
                    clickable
                    name="picker"
                    :value="`${mainRisk.amount || 0}万`"
                    :label="mainRisk.riskName"
                    placeholder="点击选择"
                    @click="openPopup(mainRisk, index, 1)"
                  />
                  <van-cell
                    v-else
                    :title="mainRisk.riskName"
                    :value="`${mainRisk.amount || 0}万`"
                  />
                </div>

                <div
                  v-for="(addRisk, index) in pageData.addRiskList"
                  :key="index + 100"
                >
                  <van-field
                    v-if="addRisk.selAmount"
                    is-link
                    input-align="right"
                    readonly
                    clickable
                    name="picker"
                    :value="`${addRisk.amount || 0}万`"
                    :label="addRisk.riskName"
                    placeholder="点击选择"
                    @click="openPopup(addRisk, index, 2)"
                  />
                  <van-cell
                    v-else
                    :title="addRisk.riskName"
                    :value="`${addRisk.amount || 0}万`"
                  />
                </div>
              </li>
            </ol>
            <ol
              class="list-box mainRiskList"
              v-else-if="saleCode == 'GRMOBILE_MALL_SL064'"
            >
              <li class="item">
                <h1 class="duty_name">家庭意外</h1>
                <van-cell
                  v-for="(mainRisk, index) in pageData.mainRiskList"
                  :key="index"
                  :title="mainRisk.riskName"
                  :value="`${mainRisk.amount || 0}万`"
                  v-show="mainRisk.riskTAG == '家庭意外'"
                />
                <van-cell
                  v-for="(addRisk, index) in pageData.addRiskList"
                  :key="index"
                  :title="addRisk.riskName"
                  :value="`${addRisk.amount || 0}万`"
                  v-show="addRisk.riskTAG == '家庭意外'"
                />
                <div v-show="showDuty">
                  <h1 class="duty_name">家庭财产</h1>
                  <van-cell
                    v-for="(mainRisk, index) in pageData.mainRiskList"
                    :key="index"
                    :title="mainRisk.riskName"
                    :value="`${mainRisk.amount || 0}万`"
                    v-show="mainRisk.riskTAG == '家庭财产'"
                  />
                  <van-cell
                    v-for="(addRisk, index) in pageData.addRiskList"
                    :key="index"
                    :title="addRisk.riskName"
                    :value="`${addRisk.amount || 0}万`"
                    v-show="addRisk.riskTAG == '家庭财产'"
                  />

                  <h1 class="duty_name" v-show="schemeActive != 0">新冠保障</h1>
                  <van-cell
                    v-for="(mainRisk, index) in pageData.mainRiskList"
                    :key="index"
                    :title="mainRisk.riskName"
                    :value="`${mainRisk.amount || 0}万`"
                    v-show="mainRisk.riskTAG == '新冠保障'"
                  />
                  <van-cell
                    v-for="(addRisk, index) in pageData.addRiskList"
                    :key="index"
                    :title="addRisk.riskName"
                    :value="`${addRisk.amount || 0}万`"
                    v-show="addRisk.riskTAG == '新冠保障'"
                  />

                  <h1 class="duty_name" v-show="schemeActive != 0">家庭车辆</h1>
                  <van-cell
                    v-for="(mainRisk, index) in pageData.mainRiskList"
                    :key="index"
                    :title="mainRisk.riskName"
                    :value="`${mainRisk.amount || 0}万`"
                    v-show="mainRisk.riskTAG == '家庭车辆'"
                  />
                  <van-cell
                    v-for="(addRisk, index) in pageData.addRiskList"
                    :key="index"
                    :title="addRisk.riskName"
                    :value="`${addRisk.amount || 0}万`"
                    v-show="addRisk.riskTAG == '家庭车辆'"
                  />

                  <h1
                    class="duty_name"
                    v-show="schemeActive != 0 && schemeActive != 1"
                  >
                    成人专属
                  </h1>
                  <van-cell
                    v-for="(mainRisk, index) in pageData.mainRiskList"
                    :key="index"
                    :title="mainRisk.riskName"
                    :value="`${mainRisk.amount || 0}万`"
                    v-show="mainRisk.riskTAG == '成人专属'"
                  />
                  <van-cell
                    v-for="(addRisk, index) in pageData.addRiskList"
                    :key="index"
                    :title="addRisk.riskName"
                    :value="`${addRisk.amount || 0}万`"
                    v-show="addRisk.riskTAG == '成人专属'"
                  />

                  <h1
                    class="duty_name"
                    v-show="schemeActive != 0 && schemeActive != 1"
                  >
                    儿童专属
                  </h1>
                  <van-cell
                    v-for="(mainRisk, index) in pageData.mainRiskList"
                    :key="index"
                    :title="mainRisk.riskName"
                    :value="`${mainRisk.amount || 0}万`"
                    v-show="mainRisk.riskTAG == '儿童专属'"
                  />
                  <van-cell
                    v-for="(addRisk, index) in pageData.addRiskList"
                    :key="index"
                    :title="addRisk.riskName"
                    :value="`${addRisk.amount || 0}万`"
                    v-show="addRisk.riskTAG == '儿童专属'"
                  />
                </div>

                <div
                  class="show_div"
                  @click="showDuty = showDuty ? false : true"
                >
                  <div class="show_txt" v-if="!showDuty">
                    <van-icon name="arrow-down" size="20" />
                    <span>展开</span>
                  </div>
                  <div class="show_txt" v-else>
                    <van-icon name="arrow-up" size="20" />
                    <span>收起</span>
                  </div>
                </div>
              </li>
            </ol>
            <ol class="list-box mainRiskList" v-else>
              <li class="item">
                <van-cell
                  v-for="(mainRisk, index) in pageData.mainRiskList"
                  :key="index"
                  :title="mainRisk.riskName"
                  :value="`${mainRisk.amount || 0}万`"
                />
                <van-cell
                  v-for="(addRisk, index) in pageData.addRiskList"
                  :key="index"
                  :title="addRisk.riskName"
                  :value="`${addRisk.amount || 0}万`"
                />
                <van-cell
                  v-if="saleCode == 'GRMOBILE_MALL_SL014'"
                  title="交强险免赔额"
                  value="100万"
                />
              </li>
            </ol>
            <!-- 投保份数 -->
            <div
              id="morecolor"
              style="margin-top: 15px"
              v-if="pageData.salePlanInfo"
            >
              <ul>
                <!-- <li v-for="(item, index) in pageData.salePlanInfo.struct" :key="index" v-show="item.isHidden!='Y' && item.code == 'mult'  || item.code == 'startDate' || item.code == 'cost' || (item.code == 'insuYearUnit' && saleCode == 'GRMOBILE_MALL_SL031') || (item.code == 'insuYearUnit' && saleCode == 'GRMOBILE_MALL_SL042')" :class="{'item-link' :item.type === 'select'}" class="van-hairline--bottom"> -->

                <li
                  v-for="(item, index) in pageData.salePlanInfo.struct"
                  :key="index"
                  v-show="setShow(item)"
                  :class="{ 'item-link': item.type === 'select' }"
                  class="van-hairline--bottom"
                >
                  <template v-if="item.type === 'input'">
                    <div v-if="saleCode == 'RBTMOBILE_MALL_RBT0024' || saleCode == 'RBTMOBILE_MALL_RBT0025' || saleCode == 'RBTMOBILE_MALL_RBT0027'">
                      <template v-if="item.isEdit == '1' || item.isEdit == 'N'">
                        <van-field
                          type="digit"
                          input-align="right"
                          :label="item.name"
                          :placeholder="item.holder"
                          v-model="copies"
                          @change="inputFinish"
                        />
                      </template>
                      <template v-else-if="item.code == 'cost'">
                        <van-field
                          type="number"
                          :label="item.name"
                          :placeholder="item.holder"
                          v-on:blur="salePlanEvent(item, $event.target.value)"
                          v-model.trim="copies"
                          :class="item.isNeed === 'Y' ? 'required' : ''"
                        />
                      </template>
                      <template v-else>
                        <van-field
                          input-align="right"
                          :label="item.name"
                          :placeholder="item.holder"
                          v-model="copies"
                          @blur="salePlanEvent(item, $event.target.value)"
                          :class="item.isNeed === 'Y' ? 'required' : ''"
                        />
                      </template>
                    </div>
                    <div v-else>
                      <template v-if="item.isEdit == '1' || item.isEdit == 'N'">
                        <van-field
                          input-align="right"
                          :label="item.name"
                          readonly
                          :placeholder="item.holder"
                          v-model="pageData.salePlanInfo.data[item.code]"
                        />
                      </template>
                      <template v-else-if="item.code == 'cost'">
                        <van-field
                          type="number"
                          :label="item.name"
                          :placeholder="item.holder"
                          v-on:blur="salePlanEvent(item, $event.target.value)"
                          v-model.trim="pageData.salePlanInfo.data[item.code]"
                          :class="item.isNeed === 'Y' ? 'required' : ''"
                        />
                      </template>
                      <template v-else>
                        <van-field
                          input-align="right"
                          :label="item.name"
                          :placeholder="item.holder"
                          v-model="pageData.salePlanInfo.data[item.code]"
                          @blur="salePlanEvent(item, $event.target.value)"
                          :class="item.isNeed === 'Y' ? 'required' : ''"
                        />
                      </template>
                    </div>
                  </template>
                  <template
                    v-else-if="
                      item.type === 'select' && item.code !== 'insureNum'
                    "
                  >
                    <eg-data-picker
                      right="right"
                      :value="pageData.salePlanInfo.data[item.code]"
                      :placeholder="item.holder"
                      :params="item"
                      :edit="item.isEdit"
                      @input="
                        pageData.salePlanInfo.data[item.code] = $event.value
                      "
                      @change="salePlanEvent(item, $event)"
                    >
                    </eg-data-picker>
                  </template>
                  <template
                    v-else-if="item.type === 'date' && item.code != 'startDate'"
                  >
                    <eg-date-picker
                      right="right"
                      :type="'date'"
                      :placeholder="item.holder"
                      :value="pageData.salePlanInfo.data[item.code]"
                      :min-date="item.data.minDate"
                      :max-date="item.data.maxDate"
                      :edit="item.edit"
                      @input="
                        pageData.salePlanInfo.data[item.code] = $event.value
                      "
                      @change="beginDateEvent('date', item, $event)"
                    >
                    </eg-date-picker>
                  </template>
                  <template
                    v-else-if="item.type === 'date' && item.code == 'startDate'"
                  >
                    <van-field
                      :value="pageData.startDate"
                      readonly
                      @click="
                        showDataTimePicker({
                          minDate: (item.data.minDate || 1) * 1,
                          maxDate: (item.data.maxDate || 90) * 1,
                        })
                      "
                      label="保险起期"
                      placeholder="请选择保险起期"
                    >
                      <template #right-icon>
                        <van-icon
                          name="img/carInsurance/rili@2x.png"
                          size="20px"
                        />
                      </template>
                    </van-field>
                    <van-field
                      v-if="
                        pageData.startDate &&
                        saleCode != 'GRMOBILE_MALL_SL028' &&
                        saleCode != 'GRMOBILE_MALL_SL0623' &&
                        saleCode != 'GRMOBILE_MALL_SL066' &&
                        saleCode != 'GRMOBILE_MALL_SL079'
                      "
                      label="保险止期"
                      :value="
                        pageData.startDate
                          | InsurancePeriod(
                            pageData.salePlanInfo.data.insuYearUnit
                          )
                      "
                      readonly
                    />
                  </template>
                </li>
              </ul>
            </div>
          </div>

          <!-- 信息录入 -->
          <appnt-info ref="appntInfo"></appnt-info>
          <single-info ref="singleInfo"></single-info>
          <multiple-info ref="multipleInfo" @click="trialInner"></multiple-info>
          <multipleNameInfo :setMealCodes="setMealCodes"></multipleNameInfo>
          <beneficiary ref="beneficiary"></beneficiary>
          <tagsList
            v-if="saleCode == 'GRMOBILE_MALL_SL064'"
            ref="tagsList"
          ></tagsList>
          <car-info v-else ref="carInfo"></car-info>
          <datetimePicker
            ref="datetimePicker"
            @click="updataDatetime"
          ></datetimePicker>

          <van-cell class="articleList" :border="false">
            <template #title>
              <div class="custom-title">
                请阅读<span
                  class="sign"
                  @click="
                    goPage(
                      'productDetailClause?title=' +
                        item.notifiName +
                        '&index=' +
                        index
                    )
                  "
                  v-for="(item, index) in pageData.notificationList"
                  :key="index"
                  >《{{ item.notifiName }}》</span>
                  <a></a>
                  <a href="../../../public/pdf/xieyi.pdf" style="color: #0252ff;">《投保人个人信息处理授权协议》</a>

              </div>
            </template>
          </van-cell>

          <div style="margin-top: 15px" class="productDetailcontent">
            <van-tabs
              v-model="active"
              scrollspy
              sticky
              :offset-top="$iosSystem + 45"
            >
              <van-tab
                v-for="(tabs, index) in pageData.tabsList"
                :key="index"
                :title="tabs.tabsName"
              >
                <div v-html="pageData.tabsList[index].tabsContent"></div>
              </van-tab>
            </van-tabs>
          </div>

          <div
            v-if="
              userInfo.agentType == 2 ||
              userInfo.agentType == 3 ||
              userInfo.agentType == 4
            "
            style="margin-top: 0.8rem"
          >
            <companyTxt />
          </div>

          <template
            v-if="
              pageData.agreeButton !== undefined &&
              pageData.agreeButton.length !== ''
            "
          >
            <div
              class="product-desc-title agree"
              v-html="pageData.agreeButton"
            ></div>
          </template>

          <!-- <template v-if="pageData.notificationList !== undefined && pageData.notificationList.length > 0">
            <div class="introduct-detail">
              <van-grid clickable :column-num="pageData.notificationList.length">
                <van-grid-item :icon="index == '0' ? 'orders-o' : index == '1' ? 'newspaper-o' : index == '2' ? 'other-pay' : '' " color="#07c160" v-for="(notification, index) in pageData.notificationList" :key="index" :text="notification.notifiName" v-on:click="detailShowModal(notification)" />
              </van-grid>
            </div>
          </template> -->
        </div>
      </div>

      <div class="confirm_bar">
        <span class="name">总保费</span>
        <p class="price">
          ￥{{ pageData.sumPrem
          }}<span
            class="originalPrice"
            v-if="pageData.flag == '1' && pageData.discountPrem"
            >￥{{ pageData.discountPrem }}</span
          >
        </p>
        <!-- <a v-if="manageVersion == '000000'" class="btn PhoneBtn" style="background-color: #ffd402;" @click="setMircoShopProduct" >
          <div>
            <p style="margin: 0; padding: 0; text-align: center;">{{isAddShop == '0' ? '加入微店' : '移出微店' }}</p>
          </div>
        </a> -->

        <a href="javascript:void(0);" class="btn" @click="placeOrder()"
          >立即投保</a
        >
      </div>

      <common-open-modal
        ref="openModal"
        :params="openModal"
      ></common-open-modal>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-action-sheet
        v-model="fenShow"
        :actions="actions"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import common from "../../assets/js/util/common";
import util from "../../assets/js/util/util";
import check from "../../assets/js/util/comp-check";
import productDetail from "../../assets/js/util/productDetail";
import appntInfo from "./detail/appntInfo.vue";
import multipleInfo from "./detail/multipleInfo.vue";
import multipleNameInfo from "./detail/multipleNameInfo.vue";
import singleInfo from "./detail/singleInfo.vue";
import beneficiary from "./detail/beneficiary.vue";
import carInfo from "./detail/carInfo.vue";
import tagsList from "./detail/tagsList.vue";
import datetimePicker from "./../../templates/datetimePicker.vue";
import EventBus from "../../assets/js/util/EventBus";
import img from "./../../../public/img/account/fenxiang.png";
import app from "../../assets/js/util/app";
import config from "./../../config.js";
import configJs from "./../../config.js";
import glutton from "../../assets/js/util/glutton";
import { mapState } from "vuex";
import companyTxt from "./../../templates/companyTxt.vue";
import { Toast } from "vant";

export default {
  components: {
    appntInfo,
    multipleInfo,
    singleInfo,
    beneficiary,
    carInfo,
    tagsList,
    datetimePicker,
    companyTxt,
    multipleNameInfo,
  },
  computed: {
    ...mapState({
      renewalDetail: (state) => state.renewedInsurance.noCar.renewalDetail,
      manageVersion: (state) => state.common.manageVersion,
    }),
  },
  data() {
    return {
      copies:"",
      setMealCodes: "",
      shareUrl: "",
      showDuty: false,
      img: img,
      showPicker: false,
      saleCode: "",
      pageData: {
        startDate: "", //保险起期时间
        saleCode: "",
        setMealCode: "",
        saleTopPic: "", //销售产品图片
        saleNameDesc: "", //销售产品名称
        saleTipDesc: "", //销售产品提示
        isCoverageMapper: "", // 是否显示保障范围
        salePlanInfo: [], //销售方案信息
        relySpec: "", //关联标识
        riskPlanList: [], //计划列表
        dutyList: [], //责任列表
        coverageList: [], //保障列表
        isExemption: "", //豁免险标识
        tabsList: [],
        notificationList: [],
        planCode: "", //计划编码
        mult: "", //份数
        insureNum: "", //被保人人数
        amt: "", //保额
        sumPrem: "0.00",
        discountPrem: 0,
        flag: 0,
        trialToRisk: false,
        appntInfo: [],
        mainRiskList: [], //主险
        addRiskList: [], //附加险
        riskType: "",
        trialAddRiskList: [], //已经添加的试算集合中的附加险
        //已经计算的list
        readyMainRiskList: [],
        readyAddRiskList: [],
        //******在险种信息页面缓存 end******
        dutyListall: [],
        plan: [],
        trialObj: {},
        agreeButton: "",
        isAgree: "",
        disabledPage: false,
      },
      init: {},
      openModal: {},
      active: 0,
      bannerH: 0,
      schemeActive: 0,
      programmeInfoList: [],
      trialLoading: "true",
      userInfo: {},
      productDetailData: "",
      columns: [],
      index: "",
      sign: 2,
      fenShow: false,
      actions: [{ name: "分享产品" }, { name: "分享转录" }],
      szMark: false, //深圳专版分享标示，默认不是
      isAddShop: "0",
      businessData: {},
      token: "",
      insureInfo:""
    };
  },
  async created() {
    if (window.location.href.indexOf("token") != -1) {
      this.token = this.$route.query.token
      if(!localStorage.getItem('token')){
        localStorage.setItem('token',this.token)
        localStorage.setItem("tokenTime", Date.now());
      }
      if(this.$route.query.time){
        const failureTime = Number(this.$route.query.time)+Number(259200000)
        const currentTime=new Date().getTime()
        if(currentTime>failureTime){
           sessionStorage.setItem("hint", true)
           this.$router.push({path: '/failureCode'})
        }
      }
      
      //归属传参
      // let test2 = decodeURI(document.URL);
      // let arrUrl = this.urlToJson(test2);
      // console.log(arrUrl, this.$route.query);
      // this.saleCode = arrUrl.saleCode || this.$route.query.saleCode;

      // this.userInfo = await common.getUserInfo();
      // this.$store.commit("my/updataUserInfo", this.userInfo);
      // await this.getInsureInit();
      // await this.getDetail();

      // if (arrUrl) {
      //   delete arrUrl.token;
      //   this.$store.state.my.newBusiness = arrUrl;
      // }
    }
    if(this.$route.query.transcribePhone){
      util.setLocalStorageObj("transcribePhone",this.$route.query.transcribePhone)
      if(this.$route.query.transcribeName){
        util.setLocalStorageObj("transcribeName",this.$route.query.transcribeName)
      }
    }
    if(this.$route.query.token){
      let newData ={
        businessType : this.$route.query.businessType,
        agreementNo : this.$route.query.agreementNo,
        proxyName : this.$route.query.proxyName,
        proxyCode : this.$route.query.proxyCode,
        agreementOwner : this.$route.query.agreementOwner,
        codeCode : this.$route.query.codeCode,
        codeName : this.$route.query.codeName,
        unitmainTenanceTypeOne : this.$route.query.unitmainTenanceTypeOne,
        unitmainTenanceTypeOneName : this.$route.query.unitmainTenanceTypeOneName,
        unitmainTenanceTypeTwo : this.$route.query.unitmainTenanceTypeTwo,
        unitmainTenanceTypeTwoName : this.$route.query.unitmainTenanceTypeTwoName
      }
      this.$store.state.my.newBusiness = newData
    }
    glutton.startRecording(); // 回溯录制
    this.saleCode = this.$route.query.saleCode;
    this.bannerH = document.documentElement.clientWidth * 0.62;
    this.schemeActive = util.getSessionStorageObj("schemeActive") || 0;
    this.pageData.startDate = util.getSessionStorageObj("startDate") || "";
    this.userInfo = (await common.getUserInfo()) || {};
    // 初始化
    let productDetailData = util.getSessionStorageObj("productDetail");
    if (
      productDetailData &&
      productDetailData.content.saleCode != this.saleCode
    ) {
      productDetail.clearProductStorage();
    }

    let agentCode = localStorage.agentCode

    if(agentCode == "S0100106" && this.saleCode == "RBTMOBILE_MALL_RBT0019"){
      this.token = localStorage.token
      let meritStudentShareUrl = `${window.location.href}&token=${this.token}&`
      if(this.$store.state.my.newBusiness){
        Object.keys(this.$store.state.my.newBusiness).map((key)=>{
          meritStudentShareUrl += key + "=" + this.$store.state.my.newBusiness[key] + "&"
        })
      }
      meritStudentShareUrl = meritStudentShareUrl.substring(meritStudentShareUrl.length - 1,0)
      let testurl = encodeURI(meritStudentShareUrl)
      let initCont = util.getLocalStorageObj("productName") // 标题
      let home_productTagF = util.getLocalStorageObj("home_productTag"); //分享介绍
      let arrJoinStringF = "";
      if (home_productTagF) {
        arrJoinStringF = home_productTagF.join();
      }
      let home_productImageUrl = util.getLocalStorageObj(
        "home_productImageUrl"
      ); //分享图片
      common.goShare({
        shareTitle: initCont,
        shareText: arrJoinStringF,
        shareImgUrl: home_productImageUrl,
        shareUrl: testurl
      })
    }else{
      if(this.$route.query.transcribePhone && !this.$route.query.agentCode){        
        this.shareUrl = `${configJs.config.http_base + configJs.config.ctx_base}/#/productDetailImg?saleCode=${this.$route.query.saleCode}&token=${localStorage.token}&transcribePhone=${this.$route.query.transcribePhone}&transcribeName=${this.$route.query.transcribeName}&`;
        if(this.$store.state.my.newBusiness){
          Object.keys(this.$store.state.my.newBusiness).map((key) => {
          this.shareUrl += key + "=" + this.$store.state.my.newBusiness[key] + "&";
        });
        }
        this.shareUrl = this.shareUrl.substring(this.shareUrl.length - 1, 0);
        let test2 = encodeURI(this.shareUrl);
        let test3 = test2.split("&codeName=")[0];

        let productName = util.getLocalStorageObj("productName"); //分享标题
        let home_productTag = util.getLocalStorageObj("home_productTag"); //分享介绍
        let arrJoinString = "";
        if (home_productTag) {
          arrJoinString = home_productTag.join();
        }
        let home_productImageUrl = util.getLocalStorageObj(
          "home_productImageUrl"
        ); //分享图片
          common.goShare({
            shareTitle: productName + "(转录)",
            shareText: '',
            shareImgUrl: home_productImageUrl,
            shareUrl: test3,
        });
      }else if(this.$route.query.transcribePhone && (this.$route.query.agentCode=='S0100080' || this.$route.query.agentCode=='S0100106')){
        let shareUrlF = `${configJs.config.http_base + configJs.config.ctx_base}/#/productDetail?saleCode=${this.$route.query.saleCode}`;
        let productName = util.getLocalStorageObj("productName"); //分享标题
        let home_productTag = util.getLocalStorageObj("home_productTag"); //分享介绍
        let arrJoinString = "";
        if (home_productTag) {
          arrJoinString = home_productTag.join();
        }
        let home_productImageUrl = util.getLocalStorageObj(
          "home_productImageUrl"
        ); //分享图片
          common.goShare({
            shareTitle: productName + "(转录)",
            shareText: arrJoinString,
            shareImgUrl: home_productImageUrl,
            shareUrl: shareUrlF,
        });
      } else{
        // 分享链接带归属
        this.shareUrl = `${configJs.config.http_base + configJs.config.ctx_base}/#/productDetailImg?saleCode=${this.$route.query.saleCode}&token=${localStorage.token}&`;
        if(this.$store.state.my.newBusiness){
          Object.keys(this.$store.state.my.newBusiness).map((key) => {
          this.shareUrl += key + "=" + this.$store.state.my.newBusiness[key] + "&";
        });
        }
        this.shareUrl = this.shareUrl.substring(this.shareUrl.length - 1, 0);
        let test0 = encodeURI(this.shareUrl);
        let test1 = test0.split("&codeName=")[0];
        let initCont = util.getLocalStorageObj("productName"); //分享标题
        let home_productTag = util.getLocalStorageObj("home_productTag"); //分享介绍
        let arrJoinString = "";
        if (home_productTag) {
          arrJoinString = home_productTag.join();
        }
        let home_productImageUrl = util.getLocalStorageObj(
          "home_productImageUrl"
        ); //分享图片
        common.goShare({
          shareTitle: initCont,
          shareText: '',
          shareImgUrl: home_productImageUrl,
          shareUrl: test1,
        });
      }
    }
    setTimeout(() => {
      this.getDetail(); //产品详情
      this.getInsureInit()
    }, 800);

    this.index = util.getSessionStorageObj("valueListIndex") || "";
    this.sign = util.getSessionStorageObj("valueListSign") || 2;

    // this.isAddShop = await this.$store.dispatch('shop/checkProductIsExistInMircoShop', { productCode: this.saleCode })
  },
  methods: {
    inputFinish(){
      util.setSessionStorageObj('copies',this.copies)
      this.trial()
    },
    urlToJson(url = window.location.href) {
      // 箭头函数默认传值为当前页面url
      let obj = {},
        index = url.indexOf("?"), // 看url有没有参数
        params = url.substr(index + 1); // 截取url参数部分 name = aaa & age = 20

      if (index != -1) {
        // 有参数时
        let parr = params.split("&"); // 将参数分割成数组 ["name = aaa", "age = 20"]
        for (let i of parr) {
          // 遍历数组
          let arr = i.split("="); // 1） i name = aaa   arr = [name, aaa]  2）i age = 20  arr = [age, 20]
          obj[arr[0]] = arr[1]; // obj[arr[0]] = name, obj.name = aaa   obj[arr[0]] = age, obj.age = 20
        }
      }

      return obj;
    },
    //分享转录
    fenx() {
      if (
        this.saleCode == "GRMOBILE_MALL_SL031" &&
        this.userInfo.userCode == "S0900344"
      ) {
        //深圳专版分享
        this.fenShow = true;
        this.szMark = true;
      } else if (
        (this.userInfo.salesmanChannelType == "01" ||
          this.userInfo.salesmanChannelType == "02" ||
          this.userInfo.salesmanChannelType == "03") &&
        this.userInfo.agentType == "1"
      ) {
        //专员才有分享转录
        this.fenShow = true;
        // }else if(this.userInfo.userCode == 'S0201348' ? (this.saleCode == 'GRMOBILE_MALL_SL030' || this.saleCode == 'GRMOBILE_MALL_SL007'|| this.saleCode == 'GRMOBILE_MALL_SL002' || this.saleCode == 'GRMOBILE_MALL_SL027') : false){
        //   this.fenShow = true
      } else {
        this.goSharePoster();
      }
    },
    onSelect(item) {
      this.fenShow = false;
      if (item.name == "分享产品") {
        this.goSharePoster();
      }
      if (item.name == "分享转录") {
        this.shareHire();
      }
    },
    openPopup(res, index, sign) {
      this.columns = [];
      this.index = index;
      util.setSessionStorageObj("valueListIndex", index);
      this.sign = sign;
      util.setSessionStorageObj("valueListSign", sign);
      this.showPicker = true;

      let dataRes = JSON.parse(res.selAmount);
      for (let i in dataRes) {
        this.columns.push(dataRes[i]);
      }
    },
    onConfirm(valueList) {
      if (this.sign == 1) {
        this.pageData.mainRiskList[this.index].amount = valueList.value;
        let productDetailData = util.getSessionStorageObj("productDetail");
        let setMealCode = util.getSessionStorageObj("setMealCode");
        if (mainRiskList) {
          productDetailData.content.riskInfo[setMealCode].mainRiskList[
            this.index
          ].amount = valueList.value;
          util.setSessionStorageObj("productDetail", productDetailData);
        }
      }
      if (this.sign == 2) {
        this.pageData.addRiskList[this.index].amount = valueList.value;
        let productDetailData = util.getSessionStorageObj("productDetail");
        let setMealCode = util.getSessionStorageObj("setMealCode");
        if (productDetailData) {
          productDetailData.content.riskInfo[setMealCode].addRiskList[
            this.index
          ].amount = valueList.value;
          util.setSessionStorageObj("productDetail", productDetailData);
        }
      }

      this.showPicker = false;
      this.trial(); //调用试算
    },
    showDataTimePicker(params) {
      this.$refs.datetimePicker.parentMsg(params);
    },
    updataDatetime(params) {
      this.pageData.startDate = params.datetime;
      util.setSessionStorageObj("startDate", this.pageData.startDate);
    },
    //跳转选择决策单元(分享转录功能)
    shareHire() {
      if (this.pageData.saleTipDesc == "") {
        this.$toast("获取分享转录资料失败!");
        return;
      }
      this.goPage(
        "wxSetShift?shareData=" +
          this.pageData.saleTipDesc +
          "&saleCode=" +
          this.saleCode +
          "&szMark=" +
          this.szMark
      );
    },
    // 分享产品
    goSharePoster() {
      if (this.pageData.saleTipDesc == "") {
        this.$toast("获取分享资料失败!");
        return;
      }
      var shareData = JSON.parse(this.pageData.saleTipDesc);
      var address =
        config.config.http_base +
        config.config.ctx_base +
        "/#showProductDetail?saleCode=" +
        this.saleCode;

      let local = `${address}&phone=${this.userInfo.phone}&agentCode=${
        this.userInfo.userCode
      }&agentId=${localStorage.getItem("agentId")}&activityId=${
        shareData.productId
      }`;
      let getShareUrl = this.$WxUrlAuthorize(local);
      app.goShare({
        shareTitle: shareData.productName,
        shareText: shareData.productTag,
        shareImgUrl: shareData.productImageUrl,
        shareUrl: getShareUrl,
      });
    },
    async getDetail() {
      let productDetail = util.getSessionStorageObj("productDetail");
      let res = "";
      if (productDetail) {
        res = productDetail;
      } else if (this.$route.query.saleCode) {
        res = await this.$axios({
          url: this.$API.API_PRODUCT_DETAIL,
          method: "post",
          data: {
            saleCode: this.$route.query.saleCode,
            type: sessionStorage.getItem("type"),
            system: sessionStorage.getItem("system"),
          },
        });
      }
      this.getDetailData(res);
    },
    async getDetailData(res) {
      // 初始化-处理保险起期
      if (
        !this.pageData.startDate &&
        res.content.salePlanInfo &&
        res.content.salePlanInfo.data &&
        res.content.salePlanInfo.data.startDate
      ) {
        this.updataDatetime({
          datetime: check
            .transformDatesTimetamp(
              "",
              "",
              parseInt(res.content.salePlanInfo.data.startDate)
            )
            .split(" ")[0],
        });
      }
      let data = res.content;
      util.setSessionStorageObj("productDetail", res);
      if (data.result == "1") {
        this.$toast(data.resultMessage);
        return;
      }

      this.pageData.salePlanInfo = data.salePlanInfo;
      var salePlanInfo = util.getSessionStorageObj("salePlanInfo"); //销售方案基本信息
      if (salePlanInfo && salePlanInfo.length>0) {
        this.pageData.salePlanInfo = salePlanInfo;
      } else {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var mon =
          nowDate.getMonth() + 1 < 10
            ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
        var day =
          nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        if (this.pageData.salePlanInfo) {
          this.pageData.salePlanInfo.data["beginDate"] =
            year + "-" + mon + "-" + day;
          this.pageData.salePlanInfo.data["endDate"] = check.getNewDate(
            year + "-" + mon + "-" + day,
            this.pageData.salePlanInfo.data["insuYearUnit"]
          );
        }
      }
      // 根据套餐获取 险种信息
      if (this.pageData.salePlanInfo) {
        let uu = this.pageData.salePlanInfo.data;
        if (uu) {
          var setMealCode = this.pageData.salePlanInfo.data["setMealCode"];
          this.pageData.setMealCode = setMealCode;
          this.pageData.mainRiskList = data.riskInfo[setMealCode].mainRiskList; //主险
          this.pageData.addRiskList = data.riskInfo[setMealCode].addRiskList; //附加险
        }

     
      } else {
        this.pageData.mainRiskList = data.riskInfo.mainRiskList; //主险
        this.pageData.addRiskList = data.riskInfo.addRiskList; //附加险
      }
      var mainRiskList = util.getSessionStorageObj("mainRiskList"); //主险
      if (mainRiskList) {
        this.pageData.mainRiskList = mainRiskList;
      }
      if (this.pageData.mainRiskList) {
        this.pageData.mainRiskList.forEach((index, obj) => {
          var riskPlanList = util.getSessionStorageObj("riskPlanList");
          if (riskPlanList) {
            this.pageData.riskPlanList = riskPlanList;
          } else {
            this.pageData.riskPlanList = obj.riskPlanList;
          }
          //   this.pageData.mainRiskList.forEach((_index, _obj)=>{
          $.each(obj.riskPlanList, function (_index, _obj) {
            if (obj.planCode == _obj.planCode) {
              var planCode = util.getSessionStorageObj("planCode");
              if (planCode) {
                this.pageData.planCode = planCode;
              } else {
                this.pageData.planCode = _obj.planCode;
              }
              var dutyList = util.getSessionStorageObj("dutyList");
              if (dutyList) {
                this.pageData.dutyList = dutyList;
              } else {
                this.pageData.dutyList = _obj.mainRiskDutyList;
              }
              var agreeButton = util.getSessionStorageObj("agreeButton");
              if (agreeButton) {
                this.pageData.agreeButton = agreeButton;
              } else {
                this.pageData.agreeButton = _obj.mainRiskAgreeButton;
              }
              var amt = util.getSessionStorageObj("amt");
              if (amt) {
                this.pageData.amt = amt;
              } else {
                //指定保额
                var sumAmt = 0;
                $.each(_obj.mainRiskDutyList, function (dutyIndex, dutyObj) {
                  if (dutyObj.amt) {
                    sumAmt += this.decimal(dutyObj.amt, 2);
                  }
                });
                if (sumAmt !== 0) {
                  this.pageData.amt = sumAmt;
                }
              }
            }
          });
          var mult = util.getSessionStorageObj("mult");
          if (mult) {
            this.pageData.mult = mult;
          } else {
            if (obj.mult) {
              this.pageData.mult = obj.mult;
            }
          }
        });
      }

      var addRiskList = util.getSessionStorageObj("addRiskList"); //附加险
      if (addRiskList) {
        this.pageData.addRiskList = addRiskList;
      }
      var sumPrem = util.getSessionStorageObj("sumPrem"); //总保费
      if (sumPrem) {
        this.pageData.sumPrem = sumPrem;
      }
      //   this.$.hideMainPageLoader();

      this.pageData.saleTopPic = data.saleTopPic;
      this.pageData.saleNameDesc = data.saleNameDesc;
      this.pageData.saleTipDesc = data.saleTipDesc;
      this.pageData.proposalCode = data.proposalCode;
      this.pageData.coverageList = data.coverageList;
      this.pageData.tabsList = data.tabsList;
      this.pageData.notificationList = data.notificationList;
      if (!this.pageData.agreeButton) {
        this.pageData.agreeButton = data.agreeButton;
      }
      this.pageData.isCoverageMapper = data.isCoverageMapper;
      var insureNum = util.getSessionStorageObj("insureNum");
      if (insureNum) {
        this.pageData.insureNum = insureNum;
      }
      //进行试算
      this.trial();

      var isAgree = util.getSessionStorageObj("isAgree"); //是否同意
      if (isAgree) {
        this.pageData.isAgree = isAgree;
      }
      if (this.pageData.isAgree) {
        //同意勾选
        $("#color-input-red").attr("checked", true);
      }

      this.setInsureNum(data);
      this.renewedInsurance();
    },

    // 设置投保人数
    setInsureNum(data) {
      let insureNumData = data.salePlanInfo.struct.filter(
        (item) => item.code == "insureNum"
      );
      if (insureNumData.length) {
        util.setSessionStorageObj(
          "insureNumData",
          insureNumData[0].data[insureNumData[0].data.length - 1].value
        );
      }
    },

    //核心计算方法  价值 10亿 哈哈
    trial(isSubmit) {
      var _this = this;

      _this.pageData.trialToRisk = false;
      //验证是否试算
      var trialFlag = _this.trialVerif();

      if (trialFlag) {
        //通过验证
        //开始试算
        _this.trialInner(isSubmit);
      }
    },

    //试算校监
    trialVerif() {
      var _this = this;
      _this.trialObj = {};
      _this.trialObj.saleCode = this.$route.query.saleCode; //销售计划code
      _this.trialObj.salePlanInfo = _this.pageData.salePlanInfo; //整个销售方案节点
      _this.trialObj.amt = _this.pageData.amt; //保额
      _this.trialObj.mult = _this.pageData.mult; //份数
      _this.trialObj.planCode = _this.pageData.planCode; //计划编码
      if (_this.pageData.salePlanInfo) {
        let uu = _this.pageData.salePlanInfo.data;
        if (uu) {
          _this.trialObj.setMealCode =
            _this.pageData.salePlanInfo.data["setMealCode"]; //销售套餐code
          _this.trialObj.insuYearUnit =
            _this.pageData.salePlanInfo.data["insuYearUnit"]; //保险期限
          util.setSessionStorageObj(
            "setMealCode",
            _this.pageData.salePlanInfo.data["setMealCode"]
          ); //套餐code
          util.setSessionStorageObj(
            "insuYearUnit",
            _this.pageData.salePlanInfo.data["insuYearUnit"]
          ); //保险期间
        }
      }

      util.setSessionStorageObj("saleCode", this.$route.query.saleCode); //销售计划code
      util.setSessionStorageObj("salePlanInfo", _this.pageData.salePlanInfo); //整个销售方案节点

      //首选验证试算的必要参数有没有数据
      var isPass = false;
      //验证被保人

      _this.trialObj.mainRiskList = []; //主险列表

      //验证主险 列表
      var mainRiskList = _this.pageData.mainRiskList;

      $.each(mainRiskList, function (_index, _obj) {
        //验证主险列表
        console.log(
          "主险[" + _obj.riskCode + "]参数[:" + JSON.stringify(_obj.data) + "]"
        );
        if (isPass) return false;
        $.each(_obj.data, function (__index, __obj) {
          //循环验证单个主险值是否为空
          if (null == __obj || "" == __obj) {
            console.log("主险[" + _obj.riskCode + "][" + __index + "]是空!!!");
            isPass = true;
            return false;
          }
        });
        //如果验证通过放入计算对象
        _this.trialObj.mainRiskList.push(
          $.extend(
            {
              riskCode: _obj.riskCode,
              code: _obj.code,
              riskType: _obj.riskType,
              riskShowOrder: _obj.riskShowOrder,
            },
            _obj.data
          )
        );
      });

      // 主险是否有的值为空
      if (isPass) {
        return false;
      }
      _this.trialObj.addRiskList = []; //附加险列表

      //验证附加 列表
      var addRiskList = _this.pageData.addRiskList;
      console.log(addRiskList);

      $.each(addRiskList, function (_index, _obj) {
        //验证附加险列表
        if (isPass) return false;
        $.each(_obj.data, function (__index, __obj) {
          //循环验证单个附加值是否为空
          if (null == __obj || "" == __obj) {
            console.log("附加[" + _obj.riskCode + "][" + __index + "]是空!!!");
            isPass = true;
            return false;
          }
        });

        _this.trialObj.addRiskList.push(
          $.extend(
            {
              riskCode: _obj.riskCode,
              code: _obj.code,
              mainRiskCode: _obj.mainRiskCode,
              riskType: _obj.riskType,
              riskShowOrder: _obj.riskShowOrder,
            },
            _obj.data
          )
        );
      });

      //附加险是否有的值为空
      if (isPass) {
        console.log("附件险参数为空停止计算.");
        return false;
      }

      return true;
    },

    //四舍五入 num数 v保留几位小数
    decimal(num, v) {
      var vv = Math.pow(10, v);
      return Math.round(num * vv) / vv;
    },

    async trialInner(isSubmit) {
      if (isSubmit) {
        this.trialLoading = "true";
      }
      let trialObj;
      if (util.getSessionStorageObj("trialObj")) {
        trialObj = util.getSessionStorageObj("trialObj");
      } else {
        trialObj = this.trialObj;
        trialObj.type = sessionStorage.getItem("type");
        trialObj.system = sessionStorage.getItem("system");
        util.setSessionStorageObj("trialObj", this.trialObj);
      }
      let insureInfo = util.getSessionStorageObj("insureInfo");
      //特殊处理疫苗险 RMOBILE_MALL_SL032 试算时需要多传amount参数
      if (this.saleCode == "RBTMOBILE_MALL_RBT0019" ) {
        if (this.sign == 1 && this.index) {
          let productDetailData = util.getSessionStorageObj("productDetail");
          let setMealCode = util.getSessionStorageObj("setMealCode");
          trialObj.mainRiskList[this.index].amount =
            productDetailData.content.riskInfo[setMealCode].mainRiskList[
              this.index
            ].amount || this.pageData.mainRiskList[this.index].amount;
        }
        if (this.sign == 2 && this.index) {
          let productDetailData = util.getSessionStorageObj("productDetail");
          let setMealCode = util.getSessionStorageObj("setMealCode");
          trialObj.addRiskList[this.index].amount =
            productDetailData.content.riskInfo[setMealCode].addRiskList[
              this.index
            ].amount || this.pageData.addRiskList[this.index].amount;
        }
      }
      //注释解决增加被保人未输入任何内容点完成新增了保费问题
      // let idType =
      //   util.getSessionStorageObj("insureInfo").insuredInfo[0].data.idType;
      // if (idType != "0") {
      //   let insureInfo = util.getSessionStorageObj("insureInfo");
      //   trialObj.salePlanInfo.data.insuredInfo.push(
      //     insureInfo.insuredInfo[0].data
      //   );
      // }
      let init = JSON.stringify(insureInfo)
      let init2 = JSON.parse(init)
      console.log(init2,'init2');
      if(init2){
        if(init2.isMultiple == 'Y'){
          let insuredData
          if(util.getSessionStorageObj("insureInfo").insuredData){
            insuredData = util.getSessionStorageObj("insureInfo").insuredData;
          }
          if (insuredData && insuredData.length > 0) {
            for (let i = 0; i < insuredData.length; i++) {
              let orgObj = trialObj.salePlanInfo.data.insuredInfo.find((item) => {
                return item.idNo == insuredData[i].data.idNo;
              });
              if (!orgObj) {
                trialObj.salePlanInfo.data.insuredInfo.push(insuredData[i].data);
              }
            }
          }
        }
      }
      //是否多被保人
      if (insureInfo) {
        trialObj.isMultiple = insureInfo.isMultiple || "";
        if (insureInfo.tagsList.length >= 1) {
          trialObj.salePlanInfo.data["cost"] =
            insureInfo.tagsList[0].data.engineer_cost || ""; //工程造价
        }
      } else {
        trialObj.isMultiple = "";
      }
      if(util.getSessionStorageObj('copies')){
        trialObj.salePlanInfo.data.mult = util.getSessionStorageObj('copies')
      }
      if(util.getSessionStorageObj("setMealCode")){
        trialObj.setMealCode = util.getSessionStorageObj("setMealCode")
      }
      const res = await this.$axios({
        url: this.$API.API_MAKE_CALCMOBILE,
        loading: this.trialLoading,
        method: "post",
        data: trialObj,
      });
      this.trialLoading = "false";
      console.log("试算完成", res);
      if (res.code === 0 && res.content.result != "1") {
        let data = res.content;
        //总保费
        this.pageData.sumPrem = data.sumPrem;
        // 优惠金额
        this.pageData.discountPrem = data.discountPrem || 0;
        this.pageData.flag = data.flag || 0;
        //计算结果
        this.pageData.readyMainRiskList = data.mainRiskList;
        this.pageData.readyAddRiskList = data.addRiskList;
        this.pageData.mainRiskList = data.mainRiskList;
        this.pageData.addRiskList = data.addRiskList;
        // 保存价格
        if(res.content.mainRiskList.length != 0){
          if (this.pageData.mainRiskList[0].insurePremMap) {
            util.setSessionStorageObj(
              "insurePremMap",
              this.pageData.mainRiskList[0].insurePremMap
            );
            this.$refs.multipleInfo.parentPremMap();
          }
        }
        
        // 提交立即下单
        if (isSubmit) {
          util.setSessionStorageObj("sumPrem", this.pageData.sumPrem);
          util.setSessionStorageObj(
            "readyMainRiskList",
            this.pageData.readyMainRiskList
          );
          util.setSessionStorageObj(
            "readyAddRiskList",
            this.pageData.readyAddRiskList
          );
          productDetail.goConfirm("productDetail");
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
      //结束
      //console.log("开始试算....完成");
    },

    //保单生效日期选择后处理方法
    beginDateEvent(type, item, obj) {
      var _this = this;
      console.log(obj);

      if (item.code == "beginDate") {
        var beginDate = this.pageData.salePlanInfo.data["beginDate"];
        var insuYearUnit = this.pageData.salePlanInfo.data["insuYearUnit"];
        _this.pageData.salePlanInfo.data["endDate"] = check.getNewDate(
          beginDate,
          insuYearUnit
        );
      }
    },
    detailShowModal(notification) {
      console.log("notification", notification);
      var _this = this;
      if (notification) {
        this.openModal = {
          title: notification.notifiName,
          text: notification.notifiContent,
        };
        this.$refs.openModal.parentMsg();
      }
    },

    mainRiskEvent(e, objData) {
      var _this = this;
      if (_this.pageData.mainRiskList) {
        $.each(_this.pageData.mainRiskList, function (index, obj) {
          if ("mult" == objData) {
            _this.pageData.mult = e.value;
            $.each(obj.data, function (dataIndex, dataObj) {
              dataObj.mult = e.value;
            });
          }
          $.each(obj.riskPlanList, function (_index, _obj) {
            if (e.value == _obj.planCode) {
              $.each(obj.data, function (dataIndex, dataObj) {
                dataObj.mult = e.value;
              });
              _this.pageData.planCode = e.value;
              _this.pageData.dutyList = _obj.mainRiskDutyList;
              _this.pageData.agreeButton = _obj.mainRiskAgreeButton;
              //指定保额
              var sumAmt = 0;
              $.each(_obj.mainRiskDutyList, function (dutyIndex, dutyObj) {
                if (dutyObj.amt) {
                  sumAmt += _this.decimal(dutyObj.amt, 2);
                }
              });
              if (sumAmt !== 0) {
                _this.pageData.amt = sumAmt;
              }
            }
          });
        });
      }

      //移除附加险
      _this.removeTrialAddRiskAll();
      var mainRiskList = _this.pageData.mainRiskList;
    },
    //移除全部时段中的附加险
    removeTrialAddRiskAll() {
      var _this = this;
      var trialList = _this.pageData.trialAddRiskList;
      if (trialList && trialList.length > 0) {
        var _rmobjArrays = _this.pageData.trialAddRiskList.splice(
          0,
          trialList.length
        );
        $.each(_rmobjArrays, function (_index, _obj) {
          var removeStruct = _obj.struct;
          var removeData = _obj.data;
          $.each(removeStruct, function (__index, __obj) {
            removeData[__obj.code] = __obj.val;
          });
          _this.pageData.addRiskList.push(_obj);
        });
      } else {
      }
      //赋值完成才进行试算
      _this.trial();
    },
    //点击移除附加险种 到 可选择列表
    removeTrialRiskToCal(index) {
      var _this = this;
      var _obj = _this.pageData.trialAddRiskList.splice(index, 1);
      console.log("remove 获取点击的对象:");
      if (_obj && _obj.length == 1) {
        //往需要试算的数组添加 这个对象
        var removeStruct = _obj[0].struct;
        var removeData = _obj[0].data;
        $.each(removeStruct, function (__index, __obj) {
          removeData[__obj.code] = __obj.val;
        });
        _this.pageData.addRiskList.push(_obj[0]);
        //赋值完成才进行试算
        _this.trial();
      } else {
        console.log("remove 获取点击的对象为空");
      }
    },
    //修改个附加险
    addTrialRiskEvent(item, e) {
      var _this = this;
      console.log("###########################add risk");
      if (item.code == "age") {
        if (e.value > 50) {
          _this.removeTrialAddRiskAll();
          this.$toast("投保人年龄大于50周岁不能添加附加险");
        }
      }
      //进行试算
      _this.trial();
    },
    salePlanEvent(item, obj) {
      // 记录选择的分数,到投保录入页面时用于显示多少个被保人信息录入
      if (item.code === "insureNum") {
        this.pageData.insureNum = obj.value;
      }
      if (item.code === "insuYearUnit") {
        let trialObj = util.getSessionStorageObj("trialObj");
        //特殊处理insuYearUnit字段，因为有2个产品都使用这个字段，一个是输入框一个是选择框取值不一样
        //GRMOBILE_MALL_SL042
        if (this.saleCode == "GRMOBILE_MALL_SL042") {
          let unit = obj.indexOf("D"); // 判断有没有单位D
          if (unit == "-1") {
            //等于-1没有
            trialObj.salePlanInfo.data.insuYearUnit = obj ? obj + "D" : "";
          } else {
            trialObj.salePlanInfo.data.insuYearUnit = obj;
          }
          this.pageData.salePlanInfo.data[item.code] =
            trialObj.salePlanInfo.data.insuYearUnit;
        } else {
          //GRMOBILE_MALL_SL031
          trialObj.salePlanInfo.data.insuYearUnit = obj.value;
        }
        util.setSessionStorageObj("trialObj", trialObj);
      }
      if (item.code === "mult") {
        let trialObj = util.getSessionStorageObj("trialObj");
        trialObj.salePlanInfo.data.mult = obj.value;
        util.setSessionStorageObj("trialObj", trialObj);
      }
      if (item.code === "seatCount") {
        let trialObj = util.getSessionStorageObj("trialObj");
        trialObj.salePlanInfo.data.seatCount = obj.value;
        util.setSessionStorageObj("trialObj", trialObj);
      }
      if (item.code === "cost") {
        let trialObj = util.getSessionStorageObj("trialObj");
        trialObj.salePlanInfo.data.cost = obj;
        util.setSessionStorageObj("trialObj", trialObj);
      }
      this.trial();
    },

    // 方案选择
    programmeInfo(name, title) {
      this.setMealCodes = util.getSessionStorageObj("setMealCode");
      this.index = ""; //清空主险和附加险选中的下标（GRMOBILE_MALL_SL032专用）
      util.setSessionStorageObj("schemeActive", this.schemeActive);
      let trialObj = util.getSessionStorageObj("trialObj");
      //获取产品详情险别列表
      let productDetail = util.getSessionStorageObj("productDetail");
      // const newIsSetMealType = {
      //   0: this.pageData.saleCode + "_A",
      //   1: this.pageData.saleCode + "_B",
      //   2: this.pageData.saleCode + "_C",
      // };

      // const oldIsSetMealType = {
      //   0: "A",
      //   1: "B",
      //   2: "C",
      // };
      const isSetMealType = {
        0: "A",
        1: "B",
        2: "C",
      };
      if (trialObj.salePlanInfo.struct && trialObj.salePlanInfo.struct.length) {
        for (let item of trialObj.salePlanInfo.struct) {
          if (item.code == "setMealCode") {
            trialObj.salePlanInfo.data.setMealCode = item.data[name]
              ? item.data[name].value
              : item.data[0].value;
            this.pageData.salePlanInfo.data.setMealCode = item.data[name]
              ? item.data[name].value
              : item.data[0].value;
            //更新险别列表
            trialObj.addRiskList =
              productDetail.content.riskInfo[item.data[name].value].addRiskList;
            trialObj.mainRiskList =
              productDetail.content.riskInfo[
                item.data[name].value
              ].mainRiskList;
          } else if (item.code == "insuYearUnit") {
            // 不同方案 时长不一样
            this.pageData.salePlanInfo.data.insuYearUnit = item.data[name]
              ? item.data[name].value
              : item.data[0].value;
            trialObj.salePlanInfo.data.insuYearUnit = item.data[name]
              ? item.data[name].value
              : item.data[0].value;
          } else if (
            item.code === "seatCount" &&
            item.isSetMeal === isSetMealType[name]
          ) {
            trialObj.salePlanInfo.data.seatCount = item.val;
            this.pageData.salePlanInfo.data.seatCount = item.val;
          }
        }
      }
      // trialObj.salePlanInfo.data.plan =  (name + 1);
      util.setSessionStorageObj("trialObj", trialObj);
      this.trial();
      this.setSeatCount();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    contentScroll(e) {
      let scrollTop = this.$refs.scrollContent.scrollTop;
      util.setSessionStorageObj("productDetailScrollTop", scrollTop);
    },
    // 录入信息接口
    async getInsureInit() {
      if (!util.getSessionStorageObj("insureInfo")) {
        let isExemption = util.getSessionStorageObj("isExemption"); //豁免险标识
        const res = await this.$axios({
          url: this.$API.API_INSURE_INPUT_INIT,
          method: "post",
          data: {
            saleCode: this.saleCode,
            isExemption: isExemption || "",
            type: sessionStorage.getItem("type"),
            system: sessionStorage.getItem("system"),
            insureNum: 1,
          },
        });
        this.init = res.content
        res.content.tagsListBackups = res.content.tagsList;
        res.content.tagsList.length &&
          res.content.tagsList[0].struct.forEach((item) => {
            if (item.code === "frameNo") item.$isMaxLength = 17;
            else if (item.code === "engine_no") item.$isMaxLength = 9;
          });
        util.setSessionStorageObj("insureInfo", res.content);
        if (res.content.programmeInfoList) {
          this.programmeInfoList = res.content.programmeInfoList;
        }
      } else {
        let insureInfo = util.getSessionStorageObj("insureInfo");
        if (insureInfo.programmeInfoList) {
          this.programmeInfoList = insureInfo.programmeInfoList;
        }
      }
      this.setSeatCount();
    },

    // 车座设置 saleCode=GRMOBILE_MALL_SL002
    setSeatCount() {
      let insureInfo = util.getSessionStorageObj("insureInfo");
      if (
        this.saleCode == "GRMOBILE_MALL_SL002" &&
        insureInfo.tagsList &&
        insureInfo.tagsList.length &&
        insureInfo.tagsList[0].struct
      ) {
        for (let item of insureInfo.tagsList[0].struct) {
          if (item.code == "seatCount") {
            console.log("this.schemeActive", this.schemeActive);
            if (this.schemeActive == "0") {
              item.data = [{ text: "5座", value: "5" }];
              insureInfo.tagsList[0].data.seatCount = "5";
            } else {
              item.data = [
                { text: "6座", value: "6" },
                { text: "7座", value: "7" },
                { text: "8座", value: "8" },
                { text: "9座", value: "9" },
              ];
              insureInfo.tagsList[0].data.seatCount = "";
            }
          }
        }
      }
      util.setSessionStorageObj("insureInfo", insureInfo);
      EventBus.$emit("parentMsg");
    },

    // 续保数据
    renewedInsurance() {
      if (
        this.renewalDetail.use == false &&
        this.renewalDetail.use != undefined
      ) {
        let pageData = util.getSessionStorageObj("insureInfo");
        // 保单号
        pageData.renewNo = this.renewalDetail.corePolicyNo;
        // 投保人信息
        pageData.appntInfo.data.name = this.renewalDetail.detailInfo.appntName;
        pageData.appntInfo.data.idType =
          this.renewalDetail.detailInfo.appntIdType;
        pageData.appntInfo.data.idNo = this.renewalDetail.detailInfo.appntIdNo;
        pageData.appntInfo.data.mobile =
          this.renewalDetail.detailInfo.appntMobile;
        // 被保人信息
        pageData.insuredInfo[0].data.relationToAppnt = "00";
        pageData.insuredInfo[0].data.name =
          this.renewalDetail.detailInfo.insureName;
        pageData.insuredInfo[0].data.idType =
          this.renewalDetail.detailInfo.insureIdType;
        pageData.insuredInfo[0].data.idNo =
          this.renewalDetail.detailInfo.insureIdNo;
        pageData.insuredInfo[0].data.mobile =
          this.renewalDetail.detailInfo.insureMobile;
        console.log("pageData", pageData.appntInfo.data);
        util.setSessionStorageObj("insureInfo", pageData);
        this.$store.commit("renewedInsurance/updateState", [
          { name: ["noCar", "renewalDetail", "use"], value: true },
        ]);
        // 保险起期
        this.updataDatetime({
          datetime: check.transformDatesDay(this.renewalDetail.endDate, 1),
        });
        EventBus.$emit("parentMsg");
        this.trial();
      }
    },
    async setMircoShopProduct() {
      await this.$store.dispatch("shop/setMircoShopProduct", {
        productCode: this.saleCode,
        isAddShop: this.isAddShop,
      });
      // this.isAddShop = await this.$store.dispatch('shop/checkProductIsExistInMircoShop', { productCode: this.saleCode })
    },
    // 立即支付
    placeOrder() {
      console.log('立即投保')
      const { appntInfo, tagsList, insuredInfo, insuredData } =
        util.getSessionStorageObj("insureInfo");
      const flag_1 = appntInfo.struct.every((item) =>
        this.$refs.appntInfo.verification(
          item,
          appntInfo.data[item.code],
          appntInfo.data.idType
        )
      );
      if (!flag_1) return;
      let saleCode = util.getSessionStorageObj("saleCode");
      if (saleCode == "RBTMOBILE_MALL_RBT0019" && !insuredData ){
          Toast('请选择或输入被保人信息')
          return;
      }
      if((saleCode == "RBTMOBILE_MALL_RBT0024" || saleCode == "RBTMOBILE_MALL_RBT0025" || saleCode == "RBTMOBILE_MALL_RBT0027") && !this.copies){
          Toast('请输入投保份数')
          return
      }
      // 校验 孕妇险
      if(saleCode == 'RBTMOBILE_MALL_RBT0035' && insuredInfo[0].data.sex == '0'){
        Toast('被保人身份证信息为男，无法投保')
        return
      }
      if(saleCode == 'RBTMOBILE_MALL_RBT0035' && insuredInfo[0].data.relationToAppnt == '01' && appntInfo.data.sex == '1'){
        Toast('投保人性别为女，被保人无法为配偶')
        return
      }
      const flag_2 = insuredInfo[0].struct.every((item) =>
        this.$refs.appntInfo.verification(
          item,
          insuredInfo[0].data[item.code],
          insuredInfo[0].data.idType
        )
      );
      
      
      if (!flag_2) return;
      if (tagsList && tagsList.length) {
        const { struct, data } = tagsList[0];
        const flag_3 = struct.every((item) =>
          this.$refs.carInfo.appntInfoEvent("", item, data[item.code])
        );
        if (!flag_3) return;
      }
      
      let setMealCode = util.getSessionStorageObj("setMealCode");
      if (
        (saleCode == "RBTMOBILE_MALL_RBT0016" && setMealCode == "RBT0016_B") ||
        (saleCode == "RBTMOBILE_MALL_RBT0015" && setMealCode == "RBT0015_C")
      ) {
        if (!util.getSessionStorageObj("insuredDataName")) {
          return Toast("至少添加一位附加被保人");
        }
      }
      setTimeout(() => {
        this.trial(true);
      }, 300);
    },
    // 不同套餐不同显示
    setShow(data) {
      const { salePlanInfo: obj } = util.getSessionStorageObj("trialObj");
      let saleCode = util.getSessionStorageObj("productDetail").content.saleCode
      let setMealCode = util.getSessionStorageObj("setMealCode")
      if(saleCode === "RBTMOBILE_MALL_RBT0002"){
        if (data.isSetMeal === "ALL") {
          return data.code === "startDate" || data.code === "mult";
        } else {
          if (data.code === "mult" || data.code === "seatCount"){
            let setMealCode = obj.data.setMealCode
            if(obj.data.setMealCode.indexOf("_") != -1){
              setMealCode = obj.data.setMealCode.split("_")[1]
              console.log(setMealCode,'23123123123');
            }
            return setMealCode === data.isSetMeal;
          }else{
            return true;
          }
        }
      }else {
        if(data.isSetMeal === "ALL"){
          return data.isHidden === "N"
        } else {
          if(data.isSetMeal.indexOf(setMealCode) !== -1){
              return data.isHidden === "N"
          }
        }
      }
    },
  },
  mounted() {
    let productDetailScrollTop = util.getSessionStorageObj(
      "productDetailScrollTop"
    );
    if (productDetailScrollTop) {
      this.$refs.scrollContent.scrollTop = productDetailScrollTop;
    }

    EventBus.$on("parentMsg", () => {
      setTimeout(() => {
        if (this.$refs.appntInfo) {
          this.$refs.appntInfo.parentMsg();
        }
        if (this.$refs.multipleInfo) {
          this.$refs.multipleInfo.parentMsg();
        }
        if (this.$refs.singleInfo) {
          this.$refs.singleInfo.parentMsg();
        }
        if (this.$refs.beneficiary) {
          this.$refs.beneficiary.parentMsg();
        }
        if (this.$refs.carInfo) {
          this.$refs.carInfo.parentMsg();
        }
        if (this.$refs.tagsList) {
          this.$refs.tagsList.parentMsg();
        }
      }, 100);
    });

    // 调起试算
    EventBus.$on("parentTrial", () => {
      this.trial();
    });
  },
  beforeDestroy() {
    EventBus.$off("parentTrial");
    util.removeSessionStorageObj("transcribePhone");
    util.removeSessionStorageObj("transcribeName");
  },
};
</script>

<style lang="less">
@import "../../assets/less/app/home/productDetail.less";
@import "../../assets/less/app/product/productDetail.less";
#app.iosSystem .productDetailPage .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .productDetailPage .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.productDetailPage {
  .fosize14 {
    font-size: 16px !important;
  }
  .show_div {
    display: flex;
    justify-content: center;
    align-items: center;
    .show_txt {
      font-size: 14px;
      height: 28px;
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .duty_name {
    font-size: 16px;
    padding: 0.4rem 16px;
    margin: 0 0 1px 0;
    background: white;
  }
}
.productDetailcontent {
  p {
    margin: 0;
  }
}
// .van-dialog{
//   height: 29%;
 
// }
// .van-dialog__header{
//   margin-top: -0.17rem;
//   padding-top:0.4rem;
// }
//  .van-dialog--round-button .van-dialog__footer {
//     position: relative;
//     height: auto;
//     padding: 0.14rem 0.24rem 0;
//     top: -1rem!important;
// }
</style>

