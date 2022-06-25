import config from './../config.js';
const http_base_agent = config.config.http_base_agent;
const http_base_verify = config.config.http_base_verify;
const http_base_customer = config.config.http_base_customer;
const http_base_esp = config.config.http_base_esp;
const http_base_life = config.config.http_base_life;
const http_base_calculation = config.config.http_base_calculation;
const http_base_car = config.config.http_base_car;
const http_base_study = config.config.http_base_study;
const http_base_shop = config.config.http_base_shop;

export default {
  API_COMMON_CHECK: http_base_agent + "/common/check", // 检查登录
  API_REFRESHTOKEN: http_base_agent + "/common/refreshToken", // 获取新token
  API_ACCOUNT_LOGIN: http_base_agent + "/account/login", // 登录
  API_ACCOUNT_LOGOUT: http_base_agent + "/account/logout", // 注销
  API_ACCOUNT_LOGINFORSMS: http_base_agent + "/account/loginForSms", // 短信登录
  API_ACCOUNT_TOKEN: http_base_agent + "/exclusive/token", // 全齿健免登录Token

  
  // API_VERIFY_SMSCODE: http_base_agent + "/verify/smsCode", // 获取验证码
  API_MY_SSM: http_base_agent + "/sendsms",
  API_MY_JXM: http_base_agent + "/checkCaptcha",
  API_VERIFY_SMSCODE: http_base_agent + "/account/updatePassword/sendsms", // 获取验证码
  API_VERIFY_YZSMS: http_base_agent + "/account/updatePassword/checkAuthCode", // 验证手机验证码
  API_AMEND_PASSWORD: http_base_agent + "/account/updatePassword", // 修改密码接口

  API_ACCOUNT_REGISTER: http_base_agent + "/account/register", // APP注册
  API_ACCOUNT_VERIFICATION: http_base_customer + "/account/verification", // 兑吧——验证手机号码是否登录
  API_VERIFY_SMS: http_base_customer + "/verify/sms", // 兑吧——获取验证码
  API_ACCOUNT_FORGETPASSWORD: http_base_agent + "/account/forgetPassword", // 忘记密码
  API_ACTIVITY_SAVEAGENTVISITORLOG: http_base_esp + "/activity/saveAgentVisitorLog", // 把code传给后台,得到openid
  API_ACCOUNT_CHECKOPENID: http_base_customer + "/account/checkOpenId", // 登录openid
  API_COMMON_MD5: http_base_agent + "/common/md5", // MD5
  API_HOME_INFO: http_base_agent + "/home/info", // 首页配置
  API_HOME_NEWPRD: http_base_agent + "/home/new/prd", // 首页
  API_HOME_REPORTINGLIST: http_base_agent + "/CustomerService/reportingList", // 客服问答列表
  API_HOME_REPORTINGDELETE: http_base_agent + "/CustomerService/reportingDelete", // 删除客服问答列表
  API_HOME_LIKELIST: http_base_life + "/product/likeList", // 搜索列表
  API_HOME_REPORTINGSAVE: http_base_agent + "/CustomerService/reportingSave", // 客服提问
  // 消息接口-----------开始
  API_NEWS_GETMESSAGETLIST: http_base_agent + "/messageCenter/getMessageSetList", // 栏目菜单接口
  API_NEWS_GETNESSAGELISTBYMESSAGETYPE: http_base_agent + "/messageCenter/getMessageListByMessageType", // 列表
  API_NEWS_UPDATEMESSAGEUNREAD: http_base_agent + "/messageCenter/updateMessageUnread", // 清除全部未读消息
  API_NEWS_QUERYMESSAGEBYID: http_base_agent + "/messageCenter/queryMessageById", // 消息详情
  API_NEWS_UPDATEMESSAGESET: http_base_agent + "/messageCenter/updateMessageSet", // 消息设置
  // 消息接口------------结束

  // 客户页接口------------开始
  API_CLIENT_VTF: http_base_agent + "/customer/visitor/visitorTotalInfo", //客户-- 访客分类统计
  API_CLIENT_TI: http_base_agent + "/customer/info/totalInfo", //客户-- 客户统计信息
  API_CLIENT_GWM: http_base_agent + "/customer/visitor/getWeekMost", //客户-- 访客--七天访问最多
  API_CLIENT_PLIST: http_base_agent + "/customer/visitor/pagelist", //客户-- 访客--访客列表
  API_CLIENT_VD: http_base_agent + "/customer/visitor/visitorDetail", //客户-- 访客--访客海报
  API_CLIENT_PLST: http_base_agent + "/customer/info/pageList", //客户-- 客户--客户列表分页查询
  API_CLIENT_LS: http_base_agent + "/customer/home/list", //客户-- 客户--家庭列表分页查询
  API_CLIENT_CDETAIL: http_base_agent + "/customer/info/customerDetail", //客户-- 客户详情
  API_CLIENT_SAVE: http_base_agent + "/customer/info/save", //客户-- 客户详情 --标记和取消重点客户
  API_CLIENT_LISTNOHOME: http_base_agent + "/customer/info/listNoHome", //客户-- 查询未创建家庭客户
  API_CLIENT_DETAIL: http_base_agent + "/customer/home/detail", //客户-- 查询家庭信息
  API_CLIENT_HOMESAVE: http_base_agent + "/customer/home/save", //客户-- 保存家庭信息(和新增客户)
  // 客户页接口------------结束

  // 我的页接口------------开始
  API_MY_MENU: http_base_agent + "/agent/menu", //我的
  API_MY_INFO: http_base_agent + "/account/info", //我的 --个人信息相关
  API_MY_SST: http_base_life + "/order/selectorderStatusTotal", //我的
  API_MY_SA: http_base_life + "/order/sameMonthAchievement", //我的--(个人业绩,团队业绩)
  API_MY_SAIT: http_base_agent + "/customer/home/sysAgentIncomeTotal", //我的--(收入,收入明细相关列表,i钻)
  API_MY_APPLY: http_base_agent + "/applyAgent/apply", //我的 --（申请代理人相关）
  API_MY_FEC: http_base_esp + "/exam/findExamCenter", //我的 --考试题库查询
  API_MY_FES: http_base_esp + "/exam/findExamSubject", //我的 --考试题目查询
  API_MY_EESA: http_base_esp + "/exam/examSubjectAnswer", //我的 --考试题目答案提交
  API_MY_EFTS: http_base_esp + "/exam/findTotalScore", //我的 --考试分数查询
  API_MY_EUEGB: http_base_esp + "/exam/updateExamGradeById", //我的 --考试通过，修改用户考试等级
  API_MY_SOL: http_base_life + "/order/selectAllOrderList", //我的 --业绩查询列表
  API_FEICHE_GETORDERLIST: http_base_life + "/order/getOrderList", //非车订单查询列表
  API_MY_POINTASK: http_base_agent + "/query/pointTask", //我的 --（查询积分接口）
  API_MY_SIGNIN: http_base_agent + "/save/signIn", //我的 --（积分 打卡接口）
  API_MY_QUERYSIGNIN: http_base_agent + "/query/signIn", //我的 --（积分 查询7天打卡记录接口）
  API_MY_SEARCH: http_base_agent + "/expandInfo/search", //我的 --（业务信息 查询接口）
  API_MY_SAVE: http_base_agent + "/expandInfo/save", //我的 --（业务信息 提交接口）
  API_MY_SERVICEVOUCHERLIST: http_base_agent + "/serviceVoucher/list", //我的 --增值福利劵（列表）
  API_MY_MODIFY: http_base_agent + "/agent/modify ", //我的 --修改车商4S店名
  // 我的页接口------------结束

  API_APPLYAGENT_OWNINFO: http_base_agent + "/applyAgent/ownInfo", // 获取申请代理人的步骤
  API_ACCOUNT_INFO: http_base_agent + "/account/info", // 获取用户信息
  API_COMMONMESSAGE_LIST: http_base_agent + "/commonMessage/list", // 消息列表
  API_PRODUCT_LIST: http_base_life + "/product/list", // 非车产品列表
  API_PRODUCT_LIST_UNIQUE: http_base_life + "/exclusive/product/list", // 单独的非车产品列表
  API_PRODUCT_DETAIL: http_base_life + "/product/detail", // 产品详情
  API_CAA_PRODUCT_DETAIL: http_base_life + "/caaProduct/detail", // 产品详情
  API_INSURE_INPUT_INIT: http_base_life + "/insure/input/init", // 产品详情
  API_MAKE_CALCMOBILE: http_base_calculation + "/make/newCalcmobile", // 试算
  API_GETREPORTINFO: http_base_life + "/claims/prod/list", // 车险和非车接口理赔列表
  API_PROD_DETAILS: http_base_life + "/claims/prod/details", // 车险和非车接口理赔列表的查看详情
  API_TRYCAJLCOMMISSION: http_base_life + "/insure/tryCalCommission", // 计算佣金
  API_INSURE_INPUT_SAVE: http_base_life + "/insure/input/save", // 录入信息保存
  API_INSURE_INPUT_NEWSAVE: http_base_life + "/insure/input/newSave", // 分享录入信息保存
  API_CUSTOMER_INFO_PAGELIST: http_base_agent + "/customer/info/pageList", // 客户列表
  API_CUSTOMER_INFO_CUSTOMERDETAIL: http_base_agent + "/customer/info/customerDetail", // 客户详情
  API_TEAM_ACHIEVEMENT: http_base_agent + "/team/achievement", // 团队业绩
  API_TEAM_DETAIL: http_base_agent + "/team/detail", // 团队业绩明细
  API_TEAM_MEMBER: http_base_agent + "/team/member", // 团队成员
  API_ACTIVITY_FINDACTIVITYLIST: http_base_esp + "/activity/findActivityList", // 海报列表
  API_ACTIVITY_GENERATECARD: http_base_esp + "/activity/generateCard", // 海报添加个人、二维码信息
  API_INSURE_INPUT_GETPAYURL: http_base_life + "/insure/input/getPayUrl", // 重新发起支付
  API_TEAM_SUBSIDYDETAIL: http_base_agent + "/team/subsidyDetail",
  API_WITHDRAWAL_RECORDS: http_base_agent + "/withdrawal/records",  // 提现查询列表
  API_WITHDRAWAL_GETPAYABLETAXES: http_base_agent + "/withdrawal/getPayableTaxes",  // 当前可提现查询金额
  API_WITHDRAWAL_APPLYWITHDRAWAL: http_base_agent + "/withdrawal/applyWithdrawal",  // 提现
  API_CUSTOMER_INFO_SAVE: http_base_agent + "/customer/info/save",
  API_ORDER_FINDORDERDETAILS: http_base_life + "/order/findOrderDetails", // 订单详情
  API_ORDER_SELECTORDERDETAILS: http_base_life + "/order/selectOrderDetails", // 查询订单状态
  API_INSURE_INSURANCE_CLAUSEOCCUPATION: http_base_life + "/insure/insurance/clauseOccupation", // 请求PDF协议
  API_COMMONMESSAGE_READ: http_base_agent + "/commonMessage/read", // 修改消息状态
  API_QUERY_SHARERECORD: http_base_agent + "/query/shareRecord", // 分享记录
  API_ORDER_DELETEORDER: http_base_life + "/order/deleteOrder", // 订单删除接口
  API_RETLECPOLICYDOWNLOADURL: http_base_life + "/order/getElecPolicyDownloadURL", // 订单列表页获取下载电子保单路径（非车险）
  API_INVOICEQUERY: http_base_agent + "/invoice/query", // 获取电子发票（非车险）
  API_GENERATEQRCODEIMG: http_base_esp + "/activity/generateQrCodeImg", // 非车产品转录生产二维码接口
  API_COMMOMAREA: http_base_esp + "/common/area", // 深圳专版查询省市区医院
  API_SAVEWXUSERINFO: http_base_esp + "/activity/saveWxUserInfo", // 深圳专版查询个人信息
  API_UPLOADFILESFORNFS: http_base_agent + "/applyAgent/uploadFilesForNFS", // 宠物险上传图片返回的图片地址继续传给后台

  // 车险
  API_GETPROPCARPRODUCT: http_base_car + "/getRiskList", // 车险险种
  API_CARTYPE: http_base_car + "/insure/getCarType", // 车辆类型
  API_CARINSUREENTRY: http_base_car + "/insure/carInsureEntry", // 报价
  API_CLAUSES: http_base_car + "/insure/clauses", // 特别约定
  API_CARBASICINFOENTRY: http_base_car + "/insure/carBasicInfoEntry", // 车险基本信息保存
  API_CHECKCARPROINSURNUM: http_base_life + "/insure/input/checkCarProInsurNum", // 非车搭售校验
  API_TRYCALCULATION: http_base_car + "/order/tryCalculation", // 试算
  API_SAVEPROPOSAL: http_base_car + "/insure/saveProposal", // 补充信息
  API_SUBMITUNDERWRITING: http_base_car + "/insure/submitUnderWriting", // 核保
  API_GETCARPRICE: http_base_car + "/insure/getCarPrice", // 车价查询
  API_GETORDERLIST: http_base_car + "/order/getOrderList", // 车险订单列表查询
  API_GETORDERDETAILS: http_base_car + "/order/getOrderDetails", // 车险订单详情查询
  API_RETORDERINFO: http_base_car + "/insure/getOrderInfo", // 车险订单状态查询
  API_GENERATEPAYMENTURL: http_base_car + "/insure/generatePaymentUrl", // 车险查询支付链接
  API_TRYCALCOMMISSION: http_base_car + "/order/tryCalCommission", // 佣金、福利券
  API_AGREEMENT: http_base_agent + "/agreement/getAgreement", // 代理协议号
  API_GETIMAGE: http_base_car + "/insure/getImage", // 查询上传的影像图片
  API_GETCARUNIT: http_base_car + "/insure/getCarUnit", // 决策单元
  API_QUERYBANKLIST: http_base_agent + "/withdrawal/queryBankList", // 搜索开户行
  API_GETWECHATACCOUNTJSSDKINFO: http_base_agent + "/withdrawal/getWeChatAccountJSSDKInfo", // 公众号JS-SDK配置
  API_GERPRICEMORETYPE: http_base_car + "/insure/getPriceMoreType", // 多个车架调用
  API_GETLASTINSURECITY: http_base_car + "/insure/getLastInsureCity", // 查询上一次投保地区
  API_SELECTORDERLIST: http_base_car + "/order/selectOrderList", // 查询上一次投保地区
  API_GETCHECKCARCODE: http_base_car + "/insure/getCheckCarCode", // 查询验车码
  API_ELECPOLICY: http_base_car + "/order/elecPolicy", // 订单列表页获取下载电子保单路径（车险）
  API_GETRECENTLYCARTYPE: http_base_car + "/insure/getRecentlyCarType", // 车险接口搜索记录
  API_RENEWALINFO: http_base_car + "/order/renewalInfo", // 车险接口搜索记录
  API_ORDER_LOGOUT: http_base_car + "/order/logout", // 已核投保单注销
  API_DELPROPOSALUNINSURED: http_base_car + "/insure/delProposalUninsured", // 未核投保单删除
  API_GETNOCARPRODUCTLIST: http_base_car + "/carAndAccident/getNocarProductList", // 车+意列表
  API_GETCARVIN: http_base_car + "/insure/getCarVIN", // 进口车查询
  //API_GETREPORTINFO: http_base_car + "/claim/getReportInfo", // 车险接口理赔列表
  API_GETCASESTATUS: http_base_car + "/claim/getCaseStatus", // 车险接口理赔进度查询
  API_SAVEREPORT: http_base_car + "/claim/saveReport", // 车险接口理赔进度查询资料
  API_WXINFO: http_base_agent + "/wx/account/info", // 车险微信查询个人资料接口
  API_ACTIVITY_SWITCH: http_base_esp + "/activity/switch", // 海报设置
  API_GETCOREORDERDETAIL: http_base_car + "/order/getCoreOrderDetail", // 订单刷新
  API_RENEWALLIST: http_base_car + "/order/renewalList", // 续保列表
  API_RENEWALCLAIM: http_base_car + "/order/renewalClaim", // 续保认领
  API_GETRENEWINFO: http_base_life + "/order/getRenewInfo", // 非车险-续保列表
  API_NOCARRENEWALCLAIM: http_base_life + "/order/renewalClaim", // 非车险-续保认领
  API_COLLECTLOG: http_base_car + "/track/dealTrackInfo", // 埋点
  API_SENDMOBILEVERIFICATIONCODE: http_base_car + "/order/sendMobileVerificationCode", // 重新发送短信
  API_QUERYAPPNTORINSUREDLIST: http_base_agent + "/customer/info/queryAppntOrInsuredList", // 选择客户
  API_GETQUOTATIONINFO: http_base_car + "/order/getQuotationInfo", // 报价单
  API_GETCARINFOFORSH: http_base_car + "/insure/getCarInfoForSH", // 查询车辆
  API_CANCELCLAIM: http_base_car + "/order/cancelClaim", // 放弃认领
  API_ERRORLOG: http_base_agent + "/errorlog/add", // 报错信息提交
  API_WX_ACCOUNT_DETAILS: http_base_agent + "/wx/account/details", // 用户信息
  API_CARUPLOAD: http_base_car + "/insure/upload", // 车险照片上传
  API_CARUPLOADQM: http_base_car + "/insure/uploadQM", // 车险签名上传
  API_INSURECHECKQM: http_base_car + "/insure/checkQM", // 车险支付前再次判断签名
  API_SAVEMSG: http_base_car + "/order/saveMsg", // 车险订单验证码保存
  API_SAVEAGENTCARUNIT: http_base_car + "/insure/saveAgentCarUnit", // 车险选择决策单元保存
  
  // 知识培训
  API_GETSTUDYBANNERLIST: http_base_study + "/study/getStudyBannerList", // 轮播图
  API_GETSTUDYCOLUMNLIST: http_base_study + "/study/getStudyColumnList", // 栏目
  API_GETSTUDYARTICLELIST: http_base_study + "/study/getStudyArticleList", // 获取文章
  API_GETSTUDYARTICLEBYID: http_base_study + "/study/getStudyArticleById", // 获取文章或视频详情
  API_GETSTUDYREVIEWLIST: http_base_study + "/study/getStudyReviewList", // 获取文章或视频评论
  API_SAVESTUDYREVIEW: http_base_study + "/study/saveStudyReview", // 保存文章或视频评论
  API_SAVESTUDYOPERATECLIENT: http_base_study + "/study/saveStudyOperateClient", // 点赞收藏阅读转发文章或视频
  API_SGETSTUDYOPERATEUSER: http_base_study + "/study/getStudyOperateUser", // 查询是否点赞收藏文章或视频
  API_GETSTUDYOPERATEARTICLELISTUSER: http_base_study + "/study/getStudyOperateArticleListUser", // 最近学习、收藏

  // 积分体系
  API_GETPOINTINCOMEBYPAGE: http_base_agent + "/integral/getPointIncomeByPage", // 获取积分明细
  API_GETPOINTRANKBYPAGE: http_base_agent + "/integral/getPointRankByPage", // 获取积分排行榜
  API_GETINTEGERPOINTUSER: http_base_agent + "/integral/getIntegerPointUser", // 获取用户积分（结算积分、预积分）
  API_EXCHANGEINTEGERPOINTUSER: http_base_agent + "/integral/exchangeIntegerPointUser", // 用户兑换积分
  API_GETPOINTDATABYID: http_base_agent + "/integral/getPointDataById", // 详情

  // 微店
  API_SELAGENTMIRCOSHOP: http_base_shop + "/mircoshop/selAgentMircoShop", // 查询微店信息
  API_SELAGENTMIRCOSHOPBYMSID: http_base_shop + "/mircoshop/selAgentMircoShopByMsId", // 根据msId获取微店信息
  API_ADDORUPDATEMIRCOSHOP: http_base_shop + "/mircoshop/addOrUpdateMircoShop", // 添加或修改微店信息
  API_QUERYMIRCOSHOPPRODUCTLIBRARY: http_base_shop + "/mircoshop/queryMircoShopProductLibrary", // 查询微店产品库信息
  API_MODIFYMIRCOSHOPPRODUCTLIST: http_base_shop + "/mircoshop/modifyMircoShopProductList", // 批量调整产品列表
  API_MODIFYMIRCOSHOPPRODUCTTYPELIST: http_base_shop + "/mircoshop/modifyMircoShopProductTypeList", // 批量调整产品类型列表
  API_SELSTUDYARTICLELIST: http_base_shop + "/mircoshop/selStudyArticleList", // 获取所有保险资讯列表
  API_MODIFYMIRCOSHOPNEWSLIST: http_base_shop + "/mircoshop/modifyMircoShopNewsList", // 批量调整微店资讯列表
  API_CHECKPRODUCTISEXISTINMIRCOSHOP: http_base_shop + "/mircoshop/checkProductIsExistInMircoShop", // 校验产品是否已加入微店
  API_ADDMIRCOSHOPPRODUCT: http_base_shop + "/mircoshop/addMircoShopProduct", // 微店添加单个产品
  API_DELMIRCOSHOPPRODUCT: http_base_shop + "/mircoshop/delMircoShopProduct", // 微店删除单个产品
  API_GETORDERLISTBYOPENID: http_base_life + "/order/getOrderListByOpenId", // 店铺订单列表
  API_SELECTORDERSTATUSTOTALFORMIRCOSHOP: http_base_life + "/order/selectorderStatusTotalForMircoShop", // 店铺订单列表
  API_REFRESHORDERBYORDERNO: http_base_life + "/order/refreshOrderByOrderNo", // 非车险订单刷新

  // 考勤打卡
  API_ATTENDANCERULE: http_base_study + "/study/Attendance/getRule", // 查询考勤规则
  API_GETSOMEDAYRECORD: http_base_study + "/study/Attendance/getSomedayRecord", // 某天考勤记录
  API_GETSOMEMONTHRECORD: http_base_study + "/study/Attendance/getSomeMonthRecord", // 查询某月考勤记录接口
  API_ATTENDANCESAVERECORD: http_base_study + "/study/Attendance/saveRecord", // 打卡
  API_ATTENDANCESAVEREMARK: http_base_study + "/study/Attendance/saveRemark", // 打卡备注
  API_COMMONUPLOADFILE: http_base_study + "/study/common/upLoadFile", // 上传照片

  API_FACTORYCONFIG: http_base_esp + "/factory/config", // 专版列表

  //家庭重构接口
  API_MY_FAIMLY_ALL: http_base_agent + "/customer/info/newPageList",//家庭分页查询客户列表接口
  API_MY_CLIENT_INFO: http_base_agent + '/customer/info/newCustomerDetail',//家庭模块 单个客户信息展示接口
  API_MY_CUSTOMERID: http_base_life + '/order/getCustomerInsureListByCustomerId',//家庭重构 个人投保信息
  API_MY_TARGET_CUSTOMERID: http_base_life + '/order/getCustomerOrderTargetByCustomerId',//家庭重构 标的信息
  API_MY_TARGET_NEW_SAVE: http_base_agent + '/customer/info/newSave',//提交编辑后的客户信息
  API_MY_TARGET_SEARCH_PHONE: http_base_agent + '/customer/info/getDetailByPhone', //查询客户根据手机号码接口
  API_MY_TARGET_SEARCH_VISITOR: http_base_agent + '/customer/visitor/newPagelist', //查询访客记录接口
  API_MY_TARGET_SEARCH_VISITOR_HISTROY: http_base_agent + '/customer/visitor/visitorDetail',//查询访客明细明细接口
  API_MY_TEAM_MEMBER: http_base_agent + '/team/newMember',//查询团队成员接口
  API_MY_TEAM_ACHIEVEMENT: http_base_agent + '/team//newAchievement',//查询团队业绩接口
  API_MY_TEAM_DETAIL: http_base_agent + '/team//newDetail',//团队用户明细
  API_PEOPLECOUNTING: http_base_agent + '/team//peopleCounting',//团队用户人数

  // 通用数据
  API_GETWEBPAGEBYCODE: http_base_agent + '/getWebPageByCode', // 富文本
}
