<template>
  <div class="orderListPage afe-area-inset-bottom" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <div class="navigation_abs" :style="{ 'padding-top': $iosSystem  + 'px','height': ($iosSystem + 46) + 'px'}">
        <van-icon name="arrow-left" color="#fff" size="16"  @click="onClickLeft"/>
        <div class="abs_div">
          <div class="abs_grid">
            <a :class="headIndex ==0 ? 'pitch' : ''"  @click="loading == false ? updataSelectPicker(0,'车险') : '' ">车险</a>
            <a :class="headIndex ==1 ? 'pitch' : ''" @click="loading == false ? updataSelectPicker(1,'非车险') : '' ">非车险</a>
          </div>
        </div>
        
      </div>
      <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- 非车险 -->
          <div v-if="value == '非车险'">
            <van-sticky :offset-top="($iosSystem + 45)">
              <div class="tabs-box">
                <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
                  <van-tab v-for="(item,index) in tab" :key="index" :title="item.orderTypeName"></van-tab>
                </van-tabs>
              </div>
              <div class="search_box">
                <van-dropdown-menu active-color="#0252ff">
                  <van-dropdown-item v-model="type" :options="option" />
                </van-dropdown-menu>
                <van-search v-model="searchValue" show-action left-icon placeholder="请输入搜索关键词" @input='inputGo(searchValue)'>
                  <template #action>
                    <div class="name_s" @click="onSearch">搜索</div>
                  </template>
                </van-search>
              </div>
            </van-sticky>
            <ol class="list-box">
              <li class="list" v-for="(item,index) in list" :key="index" @click="goOrderDetail(item)">
                <van-panel :title="item.productName" :status="tabActive == 0 ? (item.orderStatus == '09' ? '已超时' : '待付款') : tabActive == 1 ? '已支付' : tabActive == 2 ? (item.editType ? item.orderStatusLabel :'已承保'): tabActive == 3 ? '已关闭' : ''">
                 <div class="wx_box" v-show="item.profilePhoto && item.nickName">
                   <div class="wx_box_left">
                    <img class="wx_head" :src="item.profilePhoto" alt="" width="40">
                    <p>{{item.nickName}}</p>
                   </div>
                   <p>微信录单人信息</p>
                 </div>
                  <van-card :desc="item.productDesc" :title="'投保人：'+item.appntName" :thumb="item.productImageUrl">
                    <template #desc>
                      <div v-html="item.productDesc"></div>
                      <div>保障起期：{{item.startDate}}</div>
                      <div>保障止期：{{item.endDate}}</div>
                      <van-button size="small" icon="replay" round color="rgb(2, 158, 255)" @click.stop="onNoCarRefresh(item.orderNo)" v-if="tabActive == 0 || tabActive == 3" style="position: absolute; top: 0; right: 0;" ></van-button>
                    </template>
                  </van-card>
                  <template #footer>
                    <div class="footer_bar">
                      <p class="price_bar">应付金额：<span class="price">￥{{item.orderAmount}}</span>&nbsp;元</p>
                      <div class="btn">
                        <van-button size="small" round @click.stop="operation(item.orderNo,index)" v-if="tabActive == 0">删 除</van-button>
                        <van-button size="small" round color="#0252ff" v-if="tabActive == '0' && item.orderStatus != '09' " @click.stop="toPayPage(item)">立即支付</van-button>
                        <!-- <van-button size="small" round color="#0252ff" v-if="tabActive == '3' " @click.stop="getGuaranteeSlip(item)">分享查看保单</van-button> -->
                      </div>
                    </div>
                  </template>
                </van-panel>
                <div v-if="userInfo.agentType != '0'">
                  <div class="order_commission" v-if="item.availableCommission> 0 && (userInfo.OrgCode.substring(0,2) == '15' ? userInfo.agentType != '1' : true)" >完成此笔订单可获得<span class="order_commission_money">{{item.availableCommission}}</span>i钻(不含税)，实际以到账金额为准。</div>
                </div>  
              </li>
            </ol>
          </div>

          <!-- 车险 -->
          <div v-else>
            <van-sticky :offset-top="($iosSystem + 45)">
              <div class="tabs-box">
                <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick" :swipe-threshold="3" animated>
                  <van-tab v-for="(item,index) in tabAuto" :key="index" :title="item.orderTypeName"></van-tab>
                </van-tabs>
              </div>
              <div class="search_box">
                <van-dropdown-menu active-color="#0252ff">
                  <van-dropdown-item v-model="carType" :options="option1" />
                </van-dropdown-menu>
                <van-search v-model="searchValue" show-action left-icon placeholder="请输入搜索关键词" @input='inputGo(searchValue)'>
                  <template #action>
                    <div class="name_s" @click="onSearch">搜索</div>
                  </template>
                </van-search>
              </div>
            </van-sticky>
           
              <div class="auto_box" v-for="(item,index) in list" :key="index" @click="goOrderDetail(item)">
                <van-cell is-link class="cell-np cell-nb">
                  <div slot="title">
                    <div class="van-ellipsis fwb" style="display: flex;align-items: center;">{{item.appntName}}&nbsp;
                      <van-icon name="replay" size="22" color="rgb(2, 158, 255)" @click.stop="onRefresh(item.orderNo)" v-if="tabActive != 4" /></div>
                    <p class="fwb">{{item.licenseNo}}</p>
                  </div>
                  <!-- <div slot="default" class="gr-blue fwb blue" v-if="tabActive == 1 && item.orderStatus != '08'">待付款</div>
                  <div slot="default" class="gr-blue fwb blue" v-else-if="tabActive == 1 && item.orderStatus == '08' ">待付款(逾期关闭)</div>
                  <div slot="default" class="gr-blue fwb" v-else-if="tabActive == 2 && item.orderStatus == '00' ">待核保</div>
                  <div slot="default" class="gr-blue fwb" v-else-if="tabActive == 2 && item.orderStatus == '01'">待人工核保</div>
                  <div slot="default" class="gr-blue fwb" v-else-if="tabActive == 2 && item.orderStatus == '13'">{{item.orderStatusZh}}</div>
                  <div slot="default" class="gr-blue fwb" v-else-if="tabActive == 3 ">已支付</div>
                  <div slot="default" class="gr-blue fwb" v-else-if="tabActive == 4 ">已承保</div>
                  <div slot="default" class="gr-blue fwb red" v-else-if="tabActive == 5 ">已终止</div> -->
                   <div slot="default" class="gr-blue fwb red" v-show="item.orderStatusZh">{{item.orderStatusZh}}</div>
                </van-cell>
                <div class="flexbox grey" v-if="item.caaProductName">
                  <div class="gr-list-lable-defalt">{{item.caaProductName}}</div>
                  <div class="">{{item.caaStartDate | dateDayFilter}}至{{item.caaEndDate | dateDayFilter}}</div>
                </div>
                <div class="flexbox grey" v-if="item.endDateBI">
                  <div class="gr-list-lable-defalt">商业险</div>
                  <div class="">{{item.startDateBI}}至{{item.endDateBI}}</div>
                </div>
                <div class="flexbox grey" v-if="item.startDateCI">
                  <div class="gr-list-lable-defalt">交强险与车船税</div>
                  <div class="">{{item.startDateCI}}至{{item.endDateCI}}</div>
                </div>
                <div class="flexbox flexbox_bt">
                  <div class="" v-if="item.unpaidPremium">应付金额：<span class="gr-orange fwb"><span class="money_symbol">¥</span>{{item.unpaidPremium || 0}}</span></div>
                  <div class="" v-else>应付金额：<span class="gr-orange fwb"><span class="money_symbol">¥</span>{{item.premium || 0}}</span></div>
                  <div style="display:flex">
                    <!-- 上海 07000000 -->
                    <van-button style="border-radius: 8px;width:40%" size="small" @click.stop="operation(item.orderNo, index, '1')" v-if="tabActive == 0 && (item.orderStatus == '00' || item.orderStatus == '12' || item.orderStatus == '13' )">删除</van-button>&nbsp;
                    <van-button style="border-radius: 8px;" size="small" @click.stop="operation(item.orderNo, index, '0')" v-if="!item.unpaidPremium && (tabActive == 2 && userInfo.manageCode != '07000000')">撤消</van-button>&nbsp;
                    <!-- <van-button style="border-radius: 8px;" size="small" @click.stop="cancelOrder(item.orderNo, '0')" v-if="userInfo.manageCode != '07000000' && tabActive == 1 && item.orderStatus == '01'">撤单</van-button> -->
                    <van-button class="flexbox_bt_name" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" @click.stop="payment(item)" v-show="!item.unpaidPremium && (tabActive == 2 && item.orderStatus == '02')">立即支付</van-button>
                    <van-button class="flexbox_bt_name" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" @click.stop="goCarBaseInfo(item)" v-show="tabActive == 0 && (item.orderStatus == '00' || item.orderStatus == '12' || item.orderStatus == '13' ) || tabActive == 1 && item.orderStatus == '13'">编辑</van-button>
                    <!-- <van-button style="border-radius: 8px;" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" v-if="tabActive == '3' " @click.stop="getCarGuaranteeSlip(item)">分享查看保单</van-button> -->
                    <!-- 已关闭订单 -->
                    <template v-if="tabActive == 5">
                      <!-- <van-button style="border-radius: 8px;width:40%" size="small" @click.stop="operation(item.orderNo, index, '1')">4删除</van-button>&nbsp; -->
                      <van-button class="flexbox_bt_name" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" @click.stop="goCarBaseInfo(item, true, index, '1')">编辑</van-button>
                    </template>
                  </div>
                </div>
                <van-divider />
                <div v-if="userInfo.agentType != '0'">
                  <div class="order-tips" v-if="item.commission && (userInfo.OrgCode.substring(0,2) == '15' || userInfo.OrgCode.substring(0,2) == '12' ? userInfo.agentType != '1' : true)">完成此笔订单可获得<span class="gr-orange" v-if="item.commission">{{item.commission}}</span><span v-if="item.commission">i钻</span> <span  v-if="item.points">和</span> <span class="gr-orange" v-if="item.points">{{item.points}}</span><span v-if="item.points">服务券</span>，实际以到账金额为准。</div>
                </div>
              </div>
          </div>
        </van-list>

      </div>

      <van-popup v-model="show" round position="bottom" :style="{ height: '20%' }" closeable>
        <h4 style="text-align: center;margin: 16px;">分享查看保单</h4>
         <div class="carbox">
           <div class="carbox_git" @click="popupShareDownload(4)" v-if="policyCaaShare.shareUrl">
              <img src="./../../../../public/img/page/base/jiaqiangWD.png" alt="">
              <p>非车险</p>
           </div>
           <div class="carbox_git" @click="popupShareDownload(1)" v-show="ciPolicyUrl">
              <img src="./../../../../public/img/page/base/jiaqiangWD.png" alt="">
              <p>交强险</p>
           </div>
           <div class="carbox_git" @click="popupShareDownload(3)" v-show="ciPolicyFlagUrl">
               <img src="./../../../../public/img/page/base/biaozhi.png" alt="">
              <p>交强险保单标志</p>
           </div>
           <div class="carbox_git" @click="popupShareDownload(2)" v-show="biPolicyUrl">
               <img src="./../../../../public/img/page/base/wb.png" alt="">
              <p>商业险</p>
           </div>
         </div>
       </van-popup>

      <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
      <my-empty description="查询无数据" v-show="!list.length"></my-empty>

    </div>
  </div>
</template>

<script>
import util from "../../../assets/js/util/util";
import common from "../../../assets/js/util/common";
import selectPicker from "./../../../templates/selectPicker.vue";
import app from '../../../assets/js/util/app';
import configJs from '../../../config.js';
import { mapState } from 'vuex'
export default {
  components: {
    selectPicker
  },
  data() {
    return {
      show: false,
      agentCode: localStorage.getItem("agentCode"),
      value: "车险",
      headIndex:0,
      typesList: {
        struct: {
          type: "select",
          holder: "请选择",
          value: "",
          data: [
            {
              text: "非车险",
              value: "0",
            },
            {
              text: "车险",
              value: "1",
            },
          ],
        },
      },

      tab: [
        //非车险使用
        {
          orderType: "01",
          orderTypeName: "待付款",
        },
        {
          orderType: "03",
          orderTypeName: "已付款",
        },
        {
          orderType: "03",
          orderTypeName: "已承保",
        },
        {
          orderType: "05",
          orderTypeName: "已关闭",
        },
      ],
      tabAuto: [
        //车险使用
        {
          orderType: "00",
          orderTypeName: "草稿箱",
        },
        {
          orderType: "01",
          orderTypeName: "待核保",
        },
        {
          orderType: "02",
          orderTypeName: "待付款",
        },
        {
          orderType: "10",
          orderTypeName: "已付款",
        },
        {
          orderType: "10",
          orderTypeName: "已承保",
        },
        {
          orderType: "07",
          orderTypeName: "已关闭",
        },
      ],
      tabActive: 0,
      itemList:'',
      policyCaaShare: {}, // 非车险电子保存单
      ciPolicyUrl:'',// 交强险电子保单
      biPolicyUrl:'',// 商业险电子保单
      ciPolicyFlagUrl:'',//交强险电子保单标志
      loading: false,
      finished: false,
      currentPage: 1,
      list:[],
      searchValue:'',//搜索
      carType: 'licenseNo',
      option1: [
        { text: '车牌号', value: 'licenseNo' },
        { text: '车主姓名', value: 'carOwner' },
      ],
      type: 'productName',
      option: [
        { text: '产品名称', value: 'productName' },
        { text: '投保人', value: 'appntName' },
      ],
    };
  },
  computed:{
    ...mapState({
      userInfo: state => state.my.UserInfo,
    })
  },
  created() {
    if (this.$route.params && this.$route.params.orderType) {
      this.tabActive = this.$route.params.orderType;
      console.log("cccc",this.tabActive);
    } else {
      let autoCondition = util.getSessionStorageObj("autoCondition");
      let tab = util.getSessionStorageObj("orderListTab");
      this.tabActive = tab || 0;
      this.value = autoCondition || '车险';
      this.headIndex = this.value == '车险' ? 0 : 1;
      // util.removeLocalStorageObj("orderListTab")
    }
   
  },
  methods: {
    //处理车险订单搜索车牌号小写转大写
    inputGo(value){
      if(this.carType == 'licenseNo'){
        this.searchValue = value.toUpperCase()
      }
    },
    // 车险搜索
    onSearch() {
      if (!this.searchValue) {
        this.$toast('请输入搜索条件');
        return;
      }
      this.currentPage = 1
      this.list = []
      this.loading = true;
      this.onLoad();
    },
     onLoad() {
      if (this.value == '非车险') {
        this.queryOrderList();
      } else {
        this.autoList()
      }
    },
    // 确定险种选择框
    updataSelectPicker(name, title) {
      this.list = []
      this.currentPage = 1
      this.loading = true;
      this.finished = false;
      this.headIndex = name
      this.value = title;
      this.tabActive = 0;//初始化
      if (this.value == '非车险') {
        this.queryOrderList();
      } else {
        this.autoList()
      }
    },
    // 显示险种选择框
    showSelect() {
      this.$refs.selectPicker.parentMsg(this.typesList);
    },
    operation(orderNo, index, type) {
      this.$dialog
        .confirm({
          title: "提示",
          message: type == 0 ? '是否确定撤消？' : '是否确定删除？',
        })
        .then(() => {
          // on confirm
          if (this.value == '非车险') {
            this.deleteOrder(orderNo, index, type);
          }else {
            this.delCarOrder(orderNo,index, type);
          }
        }).catch(() => {
          // on cancel
        });
    },
    async deleteOrder(orderNo, index) {
      const res = await this.$axios({
         url: this.$API.API_ORDER_DELETEORDER,
        method: "get",
        params: {
          orderNo: orderNo,
          loginAgentCode: this.agentCode,
        },
      });
      if (res.code === 0 && res.content.result == "0") {
        this.list.splice(index, 1);
        this.$toast(res.content.resultMessage);
      } else {
        this.$toast("删除失败");
      }
    },
    onClick() {
      this.searchValue = ''
      this.list = []
      this.currentPage = 1
      this.loading = true;
      this.finished = false;
      if (this.value == '非车险') {
        this.queryOrderList();
      } else {//车险
        this.autoList()
      }
    },
    //查询车险列表
    async autoList() {
      let data ={
          agentCode: this.agentCode,
          orderStatus: this.tabAuto[this.tabActive].orderType,
          pageSize:10,
          currentPage:this.currentPage,
        }
        //搜索类型（车牌号或者车主姓名）
        if(this.carType == 'licenseNo'){
          data.licenseNo = this.searchValue || ''
        }else{
          data.carOwner = this.searchValue || ''
        }
      const res = await this.$axios({
        url: this.$API.API_GETORDERLIST,
        method: "post",
        // loading: 'false',
        data
      });
      if (res.code === 0 && res.content.result == "0") {
        this.currentPage++
        this.loading = false;
        this.list = this.list.concat(res.content.data.list || [])
        // 数据全部加载完成
        if (res.content.data.list == null || res.content.data.list.length < 10 || res.content.data.pages < this.currentPage) {
          this.finished = true;
        }
      }else{
        this.loading = false
        this.finished = true;
        this.$toast(res.content.resultMessage || '获取失败！');
      }
    },

    async queryOrderList() {
        let data = {
          status: this.tab[this.tabActive].orderType,
          pageSize:10,
          currentPage:this.currentPage,
        }
         //搜索类型
        if(this.type == 'productName'){//产品名称
          data.productName = this.searchValue || ''
        }else{//投保人
          data.appntName = this.searchValue || ''
        }
        const res = await this.$axios({
          url: this.$API.API_FEICHE_GETORDERLIST,
          method: "post",
          // loading: 'false',
          data
        });
        if (res.code === 0 && res.content.result == "0") {
          this.currentPage++
          this.loading = false;
          this.list = this.list.concat(res.content.date.orderListPageGrid.data || [])
          // 数据全部加载完成
          if (res.content.date.orderListPageGrid.data == null || res.content.date.orderListPageGrid.data.length < 10) {
            this.finished = true;
          }
        }else{
           this.loading = false
           this.finished = true;
           this.$toast(res.content.resultMessage || '获取失败！');
        }
    },
    async toPayPage(item) {
      const res = await this.$axios({
        url: this.$API.API_ORDER_FINDORDERDETAILS,
        method: "post",
        data: {
          insuranceOrderNo: item.orderNo,
        },
      });
      if (res.resultCode === 0) {
        if (res.data[0].payment && res.data[0].payment.payUrl) {
          util.setSessionStorageObj("appntInfo", res.data[0].applicant);
          util.setSessionStorageObj("payUrl", res.data[0].payment.payUrl);
          util.setSessionStorageObj(
            "sumPrem",
            res.data[0].insOrder.orderAmount
          );
          util.setSessionStorageObj("orderNo", res.data[0].insOrder.orderNo);
          if(res.data[0].uploadFilesFlag == '0'){//玻璃险和宠物险专用判断 等于0说明没有上传图片，跳转到图片上传
            if(item.productCode == 'GRMOBILE_MALL_SL032'){//玻璃险上传图片
              this.goPage("productUpload?warrantyNumber="+res.data[0].proposalNo);
            }else if(item.productCode == 'GRMOBILE_MALL_SL073'){//宠物险上传图片
              this.goPage("moreUpload?warrantyNumber="+res.data[0].proposalNo);
            }
          }else{
            this.goPage(`confirmInsured?orderNo=${item.orderNo}`);
          }
        } else {
          common.toPayPage(
            res.data[0].applicant,
            res.data[0].insOrder.orderAmount,
            res.data[0].insOrder.orderNo
          );
        }
      } else {
        this.$toast(res.resultMsg);
      }
    },
    goOrderDetail(item) {
      util.setSessionStorageObj("orderListTab", this.tabActive);
      util.setSessionStorageObj("autoCondition", this.value);
      if (this.value == '非车险') {
        this.goPage("orderDetail?orderNo=" + item.orderNo);
      } else {//车险
        this.goPage("carOrderDetail?orderNo=" + item.orderNo);
      }
    },
    //支付
    payment(item) {
      this.goPage("carConfirmInsured?orderNo=" + item.orderNo);
    },
    goCarBaseInfo(item, isDel, index, type) {
      if(!isDel){
        window.GluttonContext.traceNo = item.traceNo // 回溯录制
      }
      this.$store.dispatch('car/goCarlocus', { orderNo: item.orderNo, isDel, type });
      
      // console.log('item', item);
      // this.$store.commit('car/resetState');  // 清除车险记录
      // this.$store.commit('car/updataOrderNo', item.orderNo);  // 订单号
      // this.$store.commit('car/updateLicenseNo', item.licenseNo);  // 车牌号
      // this.$store.commit('car/updateFrameNo', item.frameNo);  // 车架号
      // this.$store.commit('car/updateEngineNo', item.engineNo);  // 发动机号
      // this.$store.commit('car/updataEnrollDate', item.purchaseDate); // 发证日期
      // this.$store.commit('car/updataDatetime', item.enrollDate); // 注册日期
      // this.$store.commit('car/updateCarOwner', item.carOwner); // 车主姓名
      // this.$store.commit('car/updateCarOwnerIdNo', item.carOwnerIdNo) // 车主身份证
      // this.goPage('carBaseInfo');
    },
    //获取下载电子保单路径(非车险)
    async getGuaranteeSlip(item) {
      const res = await this.$axios({
        url: this.$API.API_RETLECPOLICYDOWNLOADURL,
        method: 'post',
        data: {
          'policyNo': item.policyNo,
          'orderNo': item.orderNo,
        }
      });
      if (res.code === 0 && res.content.resultCode == '1') {
        if (res.content.downloadUrl) {
          app.goShare({
            shareTitle: '点击查看电子保单',
            shareText: item.productName,
            shareImgUrl: item.productImageUrl,
            shareUrl: res.content.downloadUrl,
          });
        } else {
          this.$toast('电子保单路径获取失败');
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    //获取下载电子保单路径(车险)
    async getCarGuaranteeSlip(item) {
      this.policyCaaShare = {}
      this.itemList = item
      console.log('item', item)
      const res = await this.$axios({
        url: this.$API.API_ELECPOLICY,
        method: 'get',
        params: {
          'orderNo': item.orderNo,
        }
      });
      //获取下载电子保单路径(非车险)
      if(item.caaPolicyNo){
        const res_policyCaa = await this.$axios({
          url: this.$API.API_RETLECPOLICYDOWNLOADURL,
          method: 'post',
          data: {
            policyNo: item.caaPolicyNo,
            orderNo: item.orderNo
          }
        });
        if (res_policyCaa.code === 0 && res_policyCaa.content.resultCode == '1') {
          this.policyCaaShare = {
            shareTitle: '点击查看电子保单',
            shareText: item.caaProductName || '',
            shareImgUrl: configJs.config.http_base + configJs.config.ctx_base + '/img/page/base/feiXiangioc.png',
            shareUrl: res_policyCaa.content.downloadUrl || '',
          }
        }
      }
      if (res.code === 0 && res.content.result == '0') {
        this.ciPolicyUrl = res.content.data.ciPolicyUrl || ''
        this.biPolicyUrl = res.content.data.biPolicyUrl || ''
        this.ciPolicyFlagUrl = res.content.data.ciPolicyFlagUrl || ''
        this.show = true
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    popupShareDownload(res) {
      this.show = false
      if(res == 1){
        app.goShare({
            shareTitle: '点击查看电子保单(交强险)',
            shareText:this.itemList.licenseNo,
            shareImgUrl:configJs.config.http_base + configJs.config.ctx_base + '/img/page/base/feiXiangioc.png',
            shareUrl: this.ciPolicyUrl,
        });
      }else if(res == 3){
        app.goShare({
            shareTitle: '点击查看交强险保单标志',
            shareText:this.itemList.licenseNo,
            shareImgUrl:configJs.config.http_base + configJs.config.ctx_base + '/img/page/base/feiXiangioc.png',
            shareUrl: this.ciPolicyFlagUrl,
        });
      }else if(res == 2){
        app.goShare({
            shareTitle: '点击查看电子保单(商业险)',
            shareText:this.itemList.licenseNo,
            shareImgUrl:configJs.config.http_base + configJs.config.ctx_base + '/img/page/base/feiXiangioc.png',
            shareUrl: this.biPolicyUrl,
        });
      }else if(res == 4){
        app.goShare(this.policyCaaShare);
      }
    },
    // 删除订单
    async delCarOrder(orderNo,index, type) {
      let res
      if (this.tabActive == 2) {
        res = await this.$store.dispatch('my/orderLogout', { orderNo, cancelFlag: type });
      } else {
        res = await this.$store.dispatch('my/delProposalUninsured', { orderNo, cancelFlag: type });
      }
      if (res.code == 0 && res.content.result == '0') {
        this.list.splice(index, 1);
      } else {
        this.$toast(res.content.resultMessage || '请求出错');
      }
    },
    // 刷新
    async onRefresh(orderNo) {
      const res = await this.$axios({
        url: this.$API.API_GETCOREORDERDETAIL,
        method: 'post',
        data: {
          orderNoList: [orderNo]
        }
      });
      this.$toast(res.content.resultMessage || '请求出错');
    },
    // 非车险刷新
    async onNoCarRefresh(orderNo) {
      const res = await this.$axios({
        url: this.$API.API_REFRESHORDERBYORDERNO,
        method: 'post',
        data: {
          orderNo,
          status: '01'
        }
      });
      if (res.code == 0 && res.content.result == '0') {
        this.onClick()
      } else
        this.$toast(res.content.resultMessage || '请求出错');
    },
    async cancelOrder(orderNo, type) {
      await this.$dialog
        .confirm({
          title: "提示",
          message: '是否确定撤单？',
        })
        .then(async () => {
          // on confirm
          let res = await this.$store.dispatch('my/orderLogout', { orderNo, cancelFlag: type });
          if (res.code == 0 && res.content.result == '0') {
            this.onClick()
          } else {
            this.$toast(res.content.resultMessage || '请求出错');
          }
        }).catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import './../../../assets/less/app/life/order/orderList.less';
.orderListPage {
  .carbox {
    display: flex;
    justify-content: space-around;
    .carbox_git {
      text-align: center;
      font-size: 14px;
      flex: 1;
      img {
        width: 30px;
      }
    }
  }
  .search_box{
    background: #eeeeee;
    display: flex;
    padding: 10px 12px 0 12px;
    .van-dropdown-menu{
      height: 48px;
      width: 32%;
    }
    .van-dropdown-menu__bar{
      border-radius: 6px 0 0 6px;
      .van-dropdown-menu__title{
        padding-left: 0;
      }
    }
    .van-search{
      width: 100%;
      border-radius: 0 6px 6px 0;
      padding: 7px 4px;
      height: 48px;
      .name_s{
        background: #0252ff;
        padding: 0px 4px;
        border-radius: 6px;
        color: #fff;
        width: 50px;
        text-align: center;
      }
    }
  }
  .wx_box{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: center;
    padding: 2px 16px;
    .wx_box_left{
      display: flex;
      align-items: center;
      .wx_head{
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
.orderList_van_nav_bar {
  background-color: #0252ff;
  .van-nav-bar__left {
    .van-icon {
      color: #fff;
    }
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__right {
    .right_Select_box {
      .right_Select_box_name {
        margin-right: 6px;
        color: #fff;
      }
    }
  }
}
.fwb {
  font-weight: bolder;
}
.blue {
  color: #0252ff;
}
.red {
  color: red;
}
.grey {
  color: #a5a5a5;
}
.auto_box {
  margin: 12px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  .flexbox {
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    .flexbox_bt_name {
      width: 80px;
      border-radius: 8px;
    }
    .money_symbol {
      font-size: 12px;
    }
  }
  .van-divider {
    margin: 10px 0;
  }
  .order-tips {
    font-size: 12px;
    color: #aabee7;
    padding: 0 10px 16px 10px;
  }
  .van-button--small {
    font-size: 14px;
  }
  .gr-orange {
    color: #ff7938;
  }
  .flexbox_bt {
    margin-top: 12px;
  }
  .grcard-content {
    font-size: 14px;
    padding: 12px;
  }
}
.orderListPage {
  .van-tab {
    padding: 0;
    min-width: 23%;
  }
  .navigation_abs{
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    right: 0;
    justify-content: space-between;
    background-color: #0252ff;
    height: 46px;
    align-items: center;
    z-index: 1;
    padding: 0 16px;
    .abs_div{
      flex: 1;
      font-size: 16px;
      margin: 0 50px;
      border-radius: 15px;
      background: #fff;
      height: 30px;
      .abs_grid{
        display: flex;
        text-align: center;
        margin: 2px;
        height: 26px;
        color: #fff;
        a{
          flex: 1;
          border-radius: 15px;
        }
        .pitch{
          background: #0252ff;
          color: #fff;
        }
      }
    }
  }
  .van-dialog{
    height: 20%;
  }
}
</style>
