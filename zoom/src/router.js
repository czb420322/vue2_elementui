import Vue from 'vue';
import Router from 'vue-router';
import pageFilter from '@/assets/js/util/page-filter';
import common from '@/assets/js/util/common';
import util from '@/assets/js/util/util';
import productDetail from '@/assets/js/util/productDetail';
import EventBus from '@/assets/js/util/EventBus';
import store from './store';
import glutton from '@/assets/js/util/glutton';
import { Toast } from 'vant';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./pages/home/home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'esign',
    component: () => import('../../new_agent/src/templates/esign.vue'),
    meta: {
      title: '签名'
    }
  },
  {
    name: 'ssm',
    component: () => import('../src/pages/life/order/ssm.vue'),
    meta: {
      title: '2222'
    }
  },
  {
    name: 'faimly',
    path: '/faimly',
    component: () => import('./pages/faimly/index.vue'),
    meta: {
      title: '家庭'
    },
  },
  {
    name: 'custom',
    path: '/custom',
    meta: {
      title: '我的客户'
    },
    component: () => import('./pages/faimly/custom.vue'),
  },
  {
    name: 'myGuest',
    path: '/myGuest',
    meta: {
      title: '我的访客'
    },
    component: () => import('./pages/faimly/myGuest.vue'),
  },
  {
    name: 'myGuestDetail',
    path: '/myGuestDetail/:activityId',
    meta: {
      title: '我的访客'
    },
    component: () => import('./pages/faimly/myGuestDetail.vue'),
  },
  {
    name: 'allClient',
    path: '/allClient/:customerType',
    meta: {
      title: '全部客户'
    },
    component: () => import('./pages/faimly/allClient.vue'),
  },
  {
    name: 'infoClient',
    path: '/infoClient/:id',
    component: () => import('./pages/faimly/infoClient.vue'),
    meta: {
      title: '客户信息'
    }
  },
  {
    name: 'infoClientEdit',
    component: () => import('./pages/faimly/infoClientEdit.vue'),
    meta: {
      title: '客户信息'
    }
  },
  {
    name: 'orderClient',
    path: '/orderClient/:id',
    component: () => import('./pages/faimly/orderClient.vue'),
    meta: {
      title: '签单客户'
    }
  },
  {
    name: 'importantClient',
    path: '/importantClient/:id',
    component: () => import('./pages/faimly/importantClient.vue'),
    meta: {
      title: '重点客户'
    }
  },
  {
    name: 'newClient',
    path: '/newClient/:id',
    component: () => import('./pages/faimly/newClient.vue'),
    meta: {
      title: '新客户'
    }
  },
  {
    name: 'relayClient',
    path: '/relayClient/:id',
    component: () => import('./pages/faimly/relayClient.vue'),
    meta: {
      title: '待续保客户'
    }
  },
  {
    name: 'birthdayClient',
    path: '/birthdayClient/:id',
    component: () => import('./pages/faimly/birthdayClient.vue'),
    meta: {
      title: '近期生日客户'
    }
  },
  {
    name: 'teamMember',
    path: '/teamMember',
    component: () => import('./pages/faimly/teamMember.vue'),
    meta: {
      title: '团队成员'
    }
  },
  {
    name: 'teamAchievement',
    path: '/teamAchievement',
    component: () => import('./pages/faimly/teamAchievement.vue'),
    meta: {
      title: '团队业绩'
    }
  },
  {
    name: 'team',
    component: () => import('./pages/team/team.vue'),
    meta: {
      title: '我的团队'
    }
  },
  {
    name: 'subsidy',
    component: () => import('./pages/team/subsidy.vue'),
    meta: {
      title: '预期津贴明细'
    }
  },
  {
    name: 'myCustomer',
    component: () => import('./pages/client/myCustomer.vue'),
    meta: {
      title: '我的客户'
    }
  },
  {
    name: 'account',
    component: () => import('./pages/account/account.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    name: 'bank',
    component: () => import('./pages/account/bank.vue'),
    meta: {
      title: '银行卡'
    }
  },
  {
    name: 'updBank',
    component: () => import('./pages/account/updBank.vue'),
    meta: {
      title: '修改银行卡'
    }
  },
  {
    name: 'businessSet',
    component: () => import('./pages/account/businessSet.vue'),
    meta: {
      title: '业务信息'
    }
  },
  {
    name: 'businessSetTwo',
    component: () => import('./pages/account/businessSetTwo.vue'),
    meta: {
      title: '转录产品业务信息'
    }
  },
  {
    name: 'incomeTaxPdf',
    component: () => import('./pages/account/incomeTaxPdf.vue'),
    meta: {
      title: '个人所得税扣缴申报管理办法'
    }
  },
  {
    name: 'setUp',
    component: () => import('./pages/account/setUp.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    name: 'accountSafety',
    component: () => import('./pages/account/accountSafety.vue'),
    meta: {
      title: '账户与安全'
    }
  },
  {
    name: 'informationSet',
    component: () => import('./pages/account/informationSet.vue'),
    meta: {
      title: '消息设置'
    }
  },
  {
    name: 'realName',
    component: () => import('./pages/account/realName.vue'),
    meta: {
      title: '实名认证'
    }
  },
  {
    name: 'approval',
    component: () => import('./pages/account/approval.vue'),
    meta: {
      title: '成为代理人'
    }
  },
  {
    name: 'exam',
    component: () => import('./pages/account/exam.vue'),
    meta: {
      title: '考试'
    }
  },
  {
    name: 'sign',
    component: () => import('./pages/account/sign.vue'),
    meta: {
      title: '协议签署'
    }
  },
  {
    name: 'income',
    component: () => import('./pages/account/income.vue'),
    meta: {
      title: '个人收入'
    }
  },
  {
    name: 'withdraw',
    component: () => import('./pages/account/withdraw.vue'),
    meta: {
      title: '提现'
    }
  },
  {
    name: 'bill',
    component: () => import('./pages/account/bill.vue'),
    meta: {
      title: '对账单'
    }
  },
  {
    name: 'brick',
    component: () => import('./pages/account/brick.vue'),
    meta: {
      title: 'i钻'
    }
  },
  {
    name: 'serviceReel',
    component: () => import('./pages/account/serviceReel.vue'),
    meta: {
      title: '增值服务劵'
    }
  },
  {
    name: 'integralList',
    component: () => import('./pages/account/integralList.vue'),
    meta: {
      title: '积分'
    }
  },
  {
    name: 'login',
    component: () => import('./pages/login/login.vue'),
    meta: {
      title: '用户登录'
    }
  },
  {
    name: 'register',
    component: () => import('./pages/login/register.vue'),
    meta: {
      title: '用户注册'
    }
  },
  {
    name: 'forgetPassword',
    component: () => import('./pages/login/forgetPassword.vue'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    name: 'changePassword',
    component: () => import('./pages/login/changePassword.vue'),
    meta: {
      title: '修改密码'
    }
  },
  // 增员注册
  {
    name: 'addStaffRegister',
    component: () => import('./pages/login/addStaffRegister.vue'),
    meta: {
      title: '注册'
    }
  },

  // 活动注册
  {
    name: 'activityRegister',
    component: () => import('./pages/login/activityRegister.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    name: 'homeNoCar',
    component: () => import('./pages/home/noCar/noCar.vue'),
    meta: {
      title: '非车推荐'
    }
  },
  {
    name: 'productList',
    component: () => import('./pages/product/productListTwo.vue'),
    meta: {
      title: '产品列表'
    }
  },
  {
    name: 'productListTwo',
    component: () => import('./pages/product/productListTwo.vue'),
    meta: {
      title: '产品列表'
    }
  },
  {
    name: 'wxProductList',
    component: () => import('./pages/product/wxProductList.vue'),
    meta: {
      title: '产品列表'
    }
  },
  {
    name: 'productDetail',
    component: () => import('./pages/product/productDetail.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    name: 'productDetailImg',
    component: () => import('./pages/product/productDetailImg.vue'),
    meta: {
      title: '分享海报图'
    }
  },
  {
    name: 'failureCode',
    component: () => import('./pages/product/failureCode.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    name: 'productDetailTwo',
    component: () => import('./pages/product/productDetailTwo.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    name: 'shenzhenyimiao',
    component: () => import('./pages/product/shenzhenyimiao.vue'),
    meta: {
      title: '位置'
    }
  },
  {
    name: 'shenzhenyimiaoList',
    component: () => import('./pages/product/shenzhenyimiaoList.vue'),
    meta: {
      title: '产品列表'
    }
  },
  {
    name: 'productUpload',
    component: () => import('./pages/product/productUpload.vue'),
    meta: {
      title: '影像信息'
    }
  },
  {
    name: 'moreUpload',
    component: () => import('./pages/product/moreUpload.vue'),
    meta: {
      title: '影像信息'
    }
  },
  {
    name: 'wxShift',
    component: () => import('./pages/product/wxShift.vue'),
    meta: {
      title: '分享转录'
    }
  },
  {
    name: 'wxExclusive',
    component: () => import('./pages/product/wxExclusive.vue'),
    meta: {
      title: '专属二维码'
    }
  },
  {
    name: 'wxSetShift',
    component: () => import('./pages/product/wxSetShift.vue'),
    meta: {
      title: '选择业务来源'
    }
  },
  {
    name: 'carInsurance',
    component: () => import('./pages/carInsurance/index.vue'),
    meta: {
      title: '国任车险'
    }
  },
  {
    name: 'carBaseInfo',
    component: () => import('./pages/carInsurance/baseInfo.vue'),
    meta: {
      title: '基本信息'
    }
  },
  {
    name: 'carVehicleInsurance',
    component: () => import('./pages/carInsurance/vehicleInsurance.vue'),
    meta: {
      title: '车险投保'
    }
  },
  {
    name: 'wxCarVehicleInsurance',
    component: () => import('./pages/carInsurance/wxVehicleInsurance.vue'),
    meta: {
      title: '车险投保'
    }
  },
  {
    name: 'carReplenishInfo',
    component: () => import('./pages/carInsurance/replenishInfo.vue'),
    meta: {
      title: '补充信息'
    }
  },
  {
    name: 'wxCarReplenishInfo',
    component: () => import('./pages/carInsurance/wxReplenishInfo.vue'),
    meta: {
      title: '补充信息'
    }
  },
  {
    name: 'carConfirmInfo',
    component: () => import('./pages/carInsurance/confirmInfo.vue'),
    meta: {
      title: '确认信息'
    }
  },
  {
    name: 'wxConfirmInfo',
    component: () => import('./pages/carInsurance/wxConfirmInfo.vue'),
    meta: {
      title: '确认信息'
    }
  },
  {
    name: 'carSelect',
    component: () => import('./pages/carInsurance/carSelect.vue'),
    meta: {
      title: '车辆品牌型号'
    }
  },
  {
    name: 'productDetailClause',
    component: () => import('./pages/product/detail/clause.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    name: 'addressBook',
    component: () => import('./pages/product/detail/addressBook.vue'),
    meta: {
      title: '选择客户'
    }
  },
  {
    name: 'productDetailPersonalInfo',
    component: () => import('./pages/product/detail/personalInfo.vue'),
    meta: {
      title: '添加投保人'
    }
  },
  {
    name: 'showProductDetail',
    component: () => import('./pages/product/showProductDetail.vue'),
    meta: {
      title: '产品详情'
    }
  },
  {
    name: 'insureInput',
    component: () => import('./pages/life/insure/insureInput.vue'),
    meta: {
      title: '保单录入'
    }
  },
  {
    name: 'confirmInsured',
    component: () => import('./pages/home/noCar/confirmInsured.vue'),
    meta: {
      title: '确认投保'
    }
  },
  {
    name: 'wxCarInsurance',
    component: () => import('./pages/carInsurance/wxIndex.vue'),
    meta: {
      title: '国任车险'
    }
  },
  {
    name: 'specialSelection',
    component: () => import('./pages/carInsurance/specialSelection.vue'),
    meta: {
      title: '特约选择'
    }
  },
  {
    name: 'carConfirmInsured',
    component: () => import('./pages/carInsurance/confirmInsured.vue'),
    meta: {
      title: '确认投保'
    }
  },
  {
    name: 'dataUpload',
    component: () => import('./pages/carInsurance/dataUpload.vue'),
    meta: {
      title: '影像信息'
    }
  },
  {
    name: 'carVehicleInsuranceClause',
    component: () => import('./pages/carInsurance/clause.vue'),
    meta: {
      title: '服务协议'
    }
  },
  {
    name: 'wxDataUpload',
    component: () => import('./pages/carInsurance/wxDataUpload.vue'),
    meta: {
      title: '影像信息'
    }
  },
  {
    name: 'informationList',
    component: () => import('./pages/inform/informationList.vue'),
    meta: {
      title: '消息动态'
    }
  },
  {
    name: 'informationDetails',
    component: () => import('./pages/inform/informationDetails.vue'),
    meta: {
      title: '消息详情'
    }
  },
  {
    name: 'exhibition',
    component: () => import('./pages/home/noCar/exhibition.vue'),
    meta: {
      title: 'i国任'
    }
  },
  {
    name: 'seekList',
    component: () => import('./pages/homeSearch/seekList.vue'),
    meta: {
      title: '搜索'
    }
  },
  {
    name: 'service',
    component: () => import('./pages/service/service.vue'),
    meta: {
      title: '问答'
    }
  },
  {
    name: 'issue',
    component: () => import('./pages/service/issue.vue'),
    meta: {
      title: '提问'
    }
  },
  {
    name: 'visitor',
    component: () => import('./pages/client/visitor.vue'),
    meta: {
      title: '访客'
    }
  },
  {
    name: 'visitorList',
    component: () => import('./pages/client/visitorList.vue'),
    meta: {
      title: '访客列表'
    }
  },
  {
    name: 'customerInfo',
    component: () => import('./pages/client/customerInfo.vue'),
    meta: {
      title: '客户'
    }
  },
  {
    name: 'clientDetail',
    component: () => import('./pages/client/clientDetail.vue'),
    meta: {
      title: '客户详情'
    }
  },
  {
    name: 'customerAdd',
    component: () => import('./pages/client/customerAdd.vue'),
    meta: {
      title: '新增客户'
    }
  },
  {
    name: 'customerDetail',
    component: () => import('./pages/client/customerDetail.vue'),
    meta: {
      title: '新增客户'
    }
  },
  {
    name: 'familyInfo',
    component: () => import('./pages/client/familyInfo.vue'),
    meta: {
      title: '家庭'
    }
  },
  {
    name: 'visitorRecord',
    component: () => import('./pages/client/visitorRecord.vue'),
    meta: {
      title: '访客记录'
    }
  },
  {
    name: 'weekVisitorRecord',
    component: () => import('./pages/client/weekVisitorRecord.vue'),
    meta: {
      title: '访客记录'
    }
  },
  {
    name: 'visitorRecordDetails',
    component: () => import('./pages/client/visitorRecordDetails.vue'),
    meta: {
      title: '访客记录详情'
    }
  },
  {
    name: 'promote',
    component: () => import('./pages/promote/index.vue'),
    meta: {
      title: '推广海报'
    }
  },
  {
    name: 'poster',
    component: () => import('./pages/promote/poster.vue'),
    meta: {
      title: '推广海报'
    }
  },
  {
    name: 'posterControl',
    component: () => import('./pages/promote/posterControl.vue'),
    meta: {
      title: '海报设置'
    }
  },
  {
    name: 'orderList',
    component: () => import('./pages/life/order/orderList.vue'),
    meta: {
      title: '我的订单'
    }
  },
  {
    name: 'orderDetail',
    component: () => import('./pages/life/order/orderDetail.vue'),
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'wxOrderDetail',
    component: () => import('./pages/life/order/wxOrderDetail.vue'),
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'carOrderDetail',
    component: () => import('./pages/life/carOrderDetail/carOrderDetail.vue'),
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'wxCarOrderDetail',
    component: () => import('./pages/life/carOrderDetail/wxCarOrderDetail.vue'),
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'carClause',
    component: () => import('./pages/life/carOrderDetail/carClause.vue'),
    meta: {
      title: '签约条款'
    }
  },
  {
    name: 'clause',
    component: () => import('./pages/life/order/clause.vue'),
    meta: {
      title: '条款'
    }
  },
  {
    name: 'read',
    component: () => import('./pages/life/order/read.vue'),
    meta: {
      title: '须知/条款'
    }
  },
  {
    name: 'productClause',
    component: () => import('./pages/life/order/productClause.vue'),
    meta: {
      title: '保险条款'
    }
  },
  {
    name: 'personnelInfo',
    component: () => import('./pages/life/order/personnelInfo.vue'),
    meta: {
      title: '投保人信息'
    }
  },
  {
    name: 'familyAdd',
    component: () => import('./pages/client/familyAdd.vue'),
    meta: {
      title: '添加家庭成员'
    }
  },
  {
    path: '/download',
    component: () => import('./pages/download/index.vue'),
    meta: {
      title: 'App下载'
    }
  },
  {
    name: 'performanceList',
    component: () => import('./pages/life/order/performanceList.vue'),
    meta: {
      title: '业绩查询'
    }
  },
  {
    name: 'compensate',
    component: () => import('./pages/compensate/compensate.vue'),
    meta: {
      title: '理赔案件查询'
    }
  },
  {
    name: 'claimDetail',
    component: () => import('./pages/compensate/claimDetail.vue'),
    meta: {
      title: '理赔进度查询'
    }
  },
  {
    name: 'wxClaimDetail',
    component: () => import('./pages/compensate/wxClaimDetail.vue'),
    meta: {
      title: '理赔进度查询'
    }
  },
  {
    name: 'applySuccess',
    component: () => import('./pages/account/applySuccess.vue'),
    meta: {
      title: '提交成功'
    }
  },
  {
    name: 'fetchSuccess',
    component: () => import('./pages/account/fetchSuccess.vue'),
    meta: {
      title: '提交成功'
    }
  },
  {
    name: 'activity',
    component: () => import('./pages/activity/index.vue'),
    meta: {
      title: '五一狂欢，限时加投'
    }
  },
  {
    name: 'million',
    component: () => import('./pages/million/million.vue'),
    meta: {
      title: '百万医疗险'
    }
  },
  {
    name: 'renewedInsurance',
    component: () => import('./pages/life/renewedInsurance/index.vue'),
    meta: {
      title: '续保管理'
    }
  },
  {
    name: 'renewedInsuranceDetail',
    component: () => import('./pages/life/renewedInsurance/car/detail.vue'),
    meta: {
      title: '续保详情'
    }
  },
  {
    name: 'noCarRenewedInsuranceDetail',
    component: () => import('./pages/life/renewedInsurance/noCar/detail.vue'),
    meta: {
      title: '续保详情'
    }
  },
  {
    name: 'carQuotedPrice',
    component: () => import('./pages/carInsurance/quotedPrice.vue'),
    meta: {
      title: '报价单'
    }
  },
  {
    name: 'followGzh',
    component: () => import('./pages/common/followGzh.vue'),
    meta: {
      title: '详情'
    }
  },
  {
    name: 'information',
    component: () => import('./pages/common/information.vue'),
    meta: {
      title: '信息披露'
    }
  },
  {
    name: 'study',
    component: () => import('./pages/study/index.vue'),
    meta: {
      title: '知识培训'
    }
  },
  {
    name: 'knowledgeDetails',
    component: () => import('./pages/study/knowledgeDetails.vue'),
    meta: {
      title: '详情'
    }
  },
  {
    name: 'wxKnowledgeDetails',
    component: () => import('./pages/study/wxKnowledgeDetails.vue'),
    meta: {
      title: '详情'
    }
  },
  {
    name: 'studyPersonal',
    component: () => import('./pages/study/personal.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    name: 'myShop',
    component: () => import('./pages/shop/myShop.vue'),
    meta: {
      title: '我的微店'
    }
  },
  {
    name: 'shop',
    component: () => import('./pages/shop/index.vue'),
    meta: {
      title: '微店'
    }
  },
  {
    name: 'shop/find',
    component: () => import('./pages/shop/find.vue'),
    meta: {
      title: '发现'
    }
  },
  {
    name: 'shop/personal',
    component: () => import('./pages/shop/personal.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    name: 'shop/setUp',
    component: () => import('./pages/shop/setUp.vue'),
    meta: {
      title: '微店设置'
    }
  },
  {
    name: 'shop/edit',
    component: () => import('./pages/shop/edit.vue'),
    meta: {
      title: '微店详情'
    }
  },
  {
    name: 'shop/order',
    component: () => import('./pages/shop/order.vue'),
    meta: {
      title: '我的订单'
    }
  },
  {
    name: 'shop/orderDetail',
    component: () => import('./pages/shop/orderDetail.vue'),
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'integral',
    component: () => import('./pages/integral/index.vue'),
    meta: {
      title: '我的积分'
    }
  },
  {
    name: 'leagueTable',
    component: () => import('./pages/integral/leagueTable.vue'),
    meta: {
      title: '积分榜'
    }
  },
  {
    name: 'pointsDetails',
    component: () => import('./pages/integral/pointsDetails.vue'),
    meta: {
      title: '积分明细'
    }
  },
  {
    name: 'detail',
    component: () => import('./pages/integral/detail.vue'),
    meta: {
      title: '积分详情'
    }
  },
  {
    name: 'issueDetail',
    component: () => import('./pages/integral/issueDetail.vue'),
    meta: {
      title: '积分详情'
    }
  },
  {
    name: 'publicity',
    component: () => import('./pages/integral/publicity.vue'),
    meta: {
      title: '积分活动'
    }
  },
  {
    name: 'clockIn',
    component: () => import('./pages/clockIn/index.vue'),
    meta: {
      title: '考勤'
    }
  },
  {
    name: 'clockIn/attendanceRecord',
    component: () => import('./pages/clockIn/attendanceRecord.vue'),
    meta: {
      title: '考勤记录'
    }
  },
  {
    name: 'version',
    component: () => import('./pages/home/version.vue'),
    meta: {
      title: '专版入口'
    }
  },
  {
    name: 'notify',
    component: () => import('./pages/life/order/notify.vue'),
    meta: {
      title: '健康告知'
    }
  },
  {
    name: 'QRcode',
    component: () => import('./pages/account/QRcode.vue'),
    meta: {
      title: '专属二维码'
    }
  },
  {
    name: 'share',
    component: () => import('./pages/account/share.vue'),
    meta: {
      title: '分享转录'
    }
  },
  {
    name: 'exclusiveQRCode',
    component: () => import('./templates/exclusiveQRCode.vue'),
    meta: {
      title: "特殊二维码"
    }
  },
  {
    name: 'QRcodeList',
    component: () => import("./pages/account/QRcodeList.vue"),
    meta: {
      title: "产品列表二维码"
    }
  },
  {
    name: 'productListThree',
    component: () => import("./pages/product/productListThree.vue"),
    meta: {
      title: '专属转录产品列表'
    }
  },
  {
    name: 'carInsuranceTwo',
    component: () => import("./pages/carInsurance/carInsuranceTwo.vue"),
    meta: {
      title: '国任车险'
    }
  },
  {
    name: 'subAudit',
    component: () => import('./pages/carInsurance/subAudit.vue'),
    meta: {
      title: '提审成功'
    }
  },
  {
    name: 'chargingPile',
    component: () => import('./pages/carInsurance/chargingPile.vue'),
    meta: {
      title: '充电桩'
    }
  },
  {
    name: 'chargingPileEdit',
    component: () => import("./pages/carInsurance/chargingPileEdit.vue"),
    meta: {
      title: '充电桩'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});


const router = new Router({
  routes,
  // 指定该钩子函数，返回坐标值即可
  // scrollBehavior(to, from, savedPosition) {
  //   if( to.path != '/renewedInsurance' && to.path != '/renewedInsuranceDetail' ){
  //     return { x: 0, y: 0 }
  //   }
  // }
})

router.beforeEach((to, from, next) => {
  sessionStorage.setItem('type', 'page');
  sessionStorage.setItem('system', 'jk');
  goPage(to, from, next);
  glutton.pageStopRecording(to.path);
  clearProductStorage(to);
  util.setSessionStorageObj("formName", from.name);
  Toast.clear();
  EventBus.$emit('GlobalLoadingTrigger', false);
});

async function goPage(to, from, next) {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  if (
    to.path == '/login' ||
    to.path == '/register' ||
    to.path == '/carConfirmInsured' ||
    to.path == '/wxCarInsurance' ||
    to.path == '/carSelect' ||
    to.path == '/carVehicleInsuranceClause' ||
    to.path == '/wxCarVehicleInsurance' ||
    to.path == '/wxCarReplenishInfo' ||
    to.path == '/wxConfirmInfo' ||
    to.path == '/wxDataUpload' ||
    to.path == '/specialSelection' ||
    to.path == '/showProductDetail' ||
    to.path == '/productUpload' ||
    to.path == '/moreUpload' ||
    to.path == '/addressBook' ||
    to.path == '/productDetailPersonalInfo' ||
    to.path == '/addStaffRegister' ||
    to.path == '/activityRegister' ||
    to.path == '/download' ||
    to.path == '/forgetPassword' ||
    to.path == '/orderDetail' ||
    to.path == '/personnelInfo' ||
    to.path == '/wxOrderDetail' ||
    to.path == '/clause' ||
    to.path == '/read' ||
    to.path == '/productDetailClause' ||
    to.path == '/activity' ||
    to.path == '/productClause' ||
    to.path == '/wxCarOrderDetail' ||
    to.path == '/wxClaimDetail' ||
    to.path == '/carClause' ||
    to.path == '/wxShift' ||
    to.path == '/wxSetShift' ||
    to.path == '/wxProductList' ||
    to.path == '/carQuotedPrice' ||
    to.path == '/wxExclusive' ||
    to.path == '/shenzhenyimiao' ||
    to.path == '/followGzh' ||
    to.path == '/information' ||
    to.path == '/wxKnowledgeDetails' ||
    to.path == '/shenzhenyimiaoList' ||
    to.path == '/shop' ||
    to.path == '/shop/find' ||
    to.path == '/shop/personal' ||
    to.path == '/shop/order' ||
    to.path == '/shop/orderDetail' ||
    to.path == '/version' ||
    to.path == '/changePassword' ||
    to.path == '/notify' ||
    to.path == '/QRcode' ||
    to.path == '/share' ||
    to.path == '/exclusiveQRCode' ||
    to.path == '/productListThree' ||
    to.path == '/businessSetTwo' ||
    to.path == '/QRcodeList' ||
    to.path == '/carInsuranceTwo' ||
    to.path == '/carReplenishInfo' ||
    to.path == '/carConfirmInfo' ||
    to.path == '/dataUpload' ||
    to.path == '/subAudit' ||
    to.path == '/productDetailImg' ||
    to.path == 'failureCode'
  ) {
    next();
  } else {
    if (document.URL.indexOf('token') != -1) {
      if (to.query.token == undefined) {
        localStorage.token = util.getUrlKey("token", window.location.href);
      } else {
        localStorage.token = to.query.token
      }

      common.accountCheck()
      next();
      return
    }
    if (localStorage.token) {
      common.accountCheck()
      next();
    } else {
      router.push({ path: '/login' })
    }
  }
  // 清除车险缓存
  if (to.path == '/carInsurance' && from.path == '/' && to.query.token) {
    store.commit('car/resetState');
  }
  // if (['/confirmInsured', '/carOrderDetail', '/productDetail'].includes(to.path)) {
  //   common.shareConfig()
  // }
}


// 为了解决 loading chunk failed 错误
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  try {
    if (isChunkLoadFailed) {
      let LoadingChunk = window.sessionStorage.getItem('LoadingChunk');
      if (LoadingChunk) {
        window.sessionStorage.setItem('LoadingChunk', LoadingChunk - 0 + 1);
      } else {
        window.sessionStorage.setItem('LoadingChunk', 1);
      }
      if (LoadingChunk - 0 > 1) {
        // 防止 死循环
        return false;
      }
      window.location.reload(targetPath);
      window.sessionStorage.setItem('LoadingChunkPath', targetPath);
      const sa = window.sa;
      if (sa && sa.track) {
        sa.track('element_click', {
          page_title: 'LoadingChunk',
          element_type: 'view',
          page_source: targetPath, // 当前路由
          element_name: `刷新页面${LoadingChunk - 0}次` // 尝试 打开次数
        });
      }

    }
  } catch (e) {
    console.log(e);
  }
});
router.onReady(vm => {

  try {
    let LoadingChunkPath = window.sessionStorage.getItem('LoadingChunkPath');

    const path = vm.path;
    if (LoadingChunkPath) {
      if (path !== LoadingChunkPath && path !== '/') {
        window.sessionStorage.setItem('LoadingChunkPath', vm.path);
        window.location.reload(vm.path);
      } else {
        window.location.reload(LoadingChunkPath);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

// 清除产品缓存
function clearProductStorage(to) {
  if (to.path !== '/productDetail' && to.path !== '/showProductDetail' && to.path !== '/productDetailClause' && to.path !== '/insureInput' && to.path !== '/confirmInsured' && to.path !== '/productDetailPersonalInfo' && to.path !== '/addressBook' && to.path !== '/productUpload' && to.path !== '/moreUpload') {
    productDetail.clearProductStorage();
  }
}

export {
  router
};
