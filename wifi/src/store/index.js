/*
 * @Author: your name
 * @Date: 2020-10-16 13:29:39
 * @LastEditTime : 2021-06-08 17:21:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)
const state = {
  ceshi1 : false,
  ceshi2:false,
  ceshi3:false,
  showAllModel:false, // 模态框的显示和隐藏
  showInfo: false, //详细信息的展示
  showInfoMan: '', //展示详细信息
  lableInfo: '', //标注的详细信息
  lableInfoMan: {}, //标注信息
  showvideoflv:false,  //全屏播放器的隐藏和显示
  showFaceCace:false, //人脸和案件的详细信息展示
  showFaceInfo:false,  //展示人脸的信息
  faceInfo:{},  //展示所有人脸的信息
  showlabel:false,  //暂时标注人脸中的标注信息
  facelableInfo:{},//人脸标注信息
  caseComSon:false,  //
  caseTarget: false, // 人员属性跳转到目标属性
  targetProperty:false, // 特征比对跳转到特征属性
  sendInfo: {}, // 定义当前人员属性那一项的item
  diffVideo:false,
  defaultImg: 'this.src="' + require('../assets/error_none.png') + '"', // 图片加载失败显示的默认图片
  defaultcImg: 'this.src="' + require('../assets/rl.png') + '"', // 图片加载失败显示的默认图片
  casecurrent:1,
  casePage:5,
  caseTotal:10,
  personUuid:'', //案件比对中人的ID casecomparison
  vehicleUuid:'',//案件比对中车的ID casecomparison
  bicycleUuid:'',//案件比对中骑车人的ID casecomparison
  suspicionType:'',//案件比对中特征比对的类型的ID casecomparison
  suspicionUuid:'',//案件比对中特征比对的ID casecomparison
  pushMessage:'', //消息推送的信息
  pushbool:false, //消息推送的打开和显示
  messagerank:'',//分类的级别
  showpersondisable:false,  //
  lableBeginTime:'',
  trueName:'', //真实名字
  glstStrus:false, //是否开始格林深瞳开关
  showglstinfo:false, //是否展示格林神通的结构化信息
  showzkyinfo:false, //是否展示中科院的结构化信息
  glstargetinfo:{},  //展示格林神通的结构化信息
  zkytargetinfo:{},  //展示中科院的结构化信息
  deviceInfo:{}, //点击当前点位的信息
  videoretriInfo:{},  //检索片段播放和视频播放时候的信息
  showjudged:false, //是否开启研判
  isupdatejudged:false, // 嫌疑目标关闭研判
  openSDK:false, //是否打开SDK提醒
  sdkInfo:[], //SDK的消息
  isopenOffVideo:false, //是否打开离线播放器
  isopenOnVideo:false, //是否打开在线天网播放器
  timeToVideo:null,  //案件编辑页面中的视频播放页面中的定时器

  messageList:[],   //研判的消息数组
  judgeDetails:{},  //研判详情
  istuInfoShow:false,  //研判消息的显示和隐藏
  voteDiabale:false,
  isprogress:false,
  ismessage:false,
  istuJudge: false,
  approveFlag:false,  //审批消息显示和隐藏
  subapproveFlag:false,  //相似比对消息的显示和隐藏
  caseUuid:null,  //查看相似比对的原点案事件
  messageWarn: {},
  screenWidth: document.documentElement.clientWidth,
  videoHand:false,   //测试单元
  mapLeftMenuFlag:false,  //地图左击后的下拉菜单
  isMarkerLable:false, //是否是标注点
  showMessageVic:false,  //消息提醒的铃铛
  showMessageCase: true, //消息提醒的铃铛
  seekMessage:false,//案事件 顶部消息列表
  resCodeTime: null,  //接口请求返回的状态值存入返回时间
  toIndex: {},  //跳转到首页，存储首页的跳转路径
  currentUser: '',
  currentUserImg: '',
  menurouter: [],
  token: '',
  showohter:false,
  ifAdminInfo: false,
  loading: false,                 // loading图片的切换
  ifReturnMsg: '',               // 是否返回数据
  loadmore: false,               // 是否加载更多新闻
  ifReturnMore: true,            // 是否返回更多新闻
  status: false,                    //是否出现上传图片层
  deviceType: 0,//设备类型
  deviceSubmitDiv: false,
  deviceEmit: false,//设备类型是否可编辑
  deviceDataList: null,
  selectdist: '420104', //区域ID
  map: '',//地图实例
  point: '',//右键地图时的点位
  videoList: '',//视频数据
  faceList: '',//人像数据
  ok: false,
  idx: 0,
  markerData: null,//右键标注编辑时的数据
  history: localStorage.getItem('chan_history')
    ? JSON.parse(localStorage.getItem('chan_history'))
    : {count: 0, items: []},
  localCollection: localStorage.getItem('chan_collection')
    ? JSON.parse(localStorage.getItem('chan_collection'))
    : [],
  newsLength: 0,                  // 刷新返回的新闻数量
  ifReturnRefresh: false,         // 是否刷新成功
  type: '',                       // 记录从主页离开时的新闻类型
  positions: {},
  warnMessage: {},
  //案事件检索,高级搜索弹框标志位
  caseNatureDialogFlag: false,
  case3DNatureDialogFlag: false,
  caseVideoMarkDialogFlag: false,
  caseMessageDialogFlag: false,
  messageFlag: false,

  car3DDialog: false,
  person3DDialog: false,
  suspicionUuid:null,

  carNatureDialog: false,
  carNatureObj: {},

  personFaceDialog: false,
  personFaceObj:{},
  glststrusInfo:{}, //glst结构化一次排查返回的筛选条件信息
  zkystrusInfo:{}, // zky结构化一次排查返回的筛选条件信息
  glstfeature:{}, //通过点击结构化结果的搜索获取特征值,以及对应的车辆信息
  strusResult:{}, //点击快捷以图搜图结构化的所有信息

  personNatureDialog: false,
  personNatureObj: {},

  unCarNatureDialog: false,
  unCarNatureObj:{},
  ishandupdate:false,  //是否是修改手工标注功能
  hanlabel:{}, // 标注信息
  isvideoline:false, //是否是极速作战中的天网
  showPersonCase: false,  // 保存串并默认隐藏
  searchImgBtn: {}, // 存储嫌疑目标图片的对象
  isShowLoading: false,
  iszkyStrucTable:'', // 中科院tab切换
  zkyNum:{}, // 存放中科院点击特征
  showDxplayer:false, //显示C++播放器
  showStructDxplayer:false, //显示结构护平台C++播放器
  DxplayerInfo:{}, //播放器播放的对象
  targetToSearchImg:{}, // 存放快捷以图搜图的时候当前点击的对象以及存放的数组
  targetToOenStrus:'',  //是从哪个地方打开的结构化目标，一个是案件管理中，一个是任务管理中
  showlookImgPic:false, // 是否打开
  showlookBigImg:false, // 是否打开大图
  zkyStusinfo:{},//  一次排查结构化属性
  structureFileUuid:'',  // 结构化播放文件id
  echarColorList:["rgba(178,105,199,1)","rgba(156,112,209,1)","rgba(142,108,228,1)","rgba(102,99,230,1)",
  "rgba(63,93,223,1)","rgba(52,126,227,1)","rgba(27,139,217,1)","rgba(46,121,245,1)","rgba(46,180,250,1)",
  "rgba(107,163,255,1)","rgba(178,105,199,1)","rgba(156,112,209,1)","rgba(142,108,228,1)","rgba(102,99,230,1)",
  "rgba(63,93,223,1)","rgba(52,126,227,1)","rgba(27,139,217,1)","rgba(46,121,245,1)","rgba(46,180,250,1)",
  "rgba(107,163,255,1)"],
  currentDeploymentType:'1',
  targetToSearchImgCar:{},//存放快捷以车搜车的时候当前点击的对象和数组
  routerlink:'',
  nowplayObj:true,
  showplayvideo:false,
  onlineDeviceList:[],  //天网点位数组
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
