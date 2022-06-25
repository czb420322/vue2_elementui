export  const  cssobj = {

  // 视频侦查
  101: ['realvideo', "/videoCombat/realvideo"],
  102: ['historyvideo', "/videoCombat/historyvideo"],
  103: ['videomonitor', "/videoCombat/videomonitor"],
  104: ['log', ""],
  105: ['videoplay', "/videoCombat/videoplay"],
  106: ['targetarck', '/videoCombat/targetarck'],
  107: ['opration', ''],//视频转码
  108: ['taskMan', '/videoCombat/taskMan'],
  109: ['datacollection', '/videoCombat/datacollection'],
  110: ['semantic', '/videoCombat/semantic'],
  111: ['searchImg', '/videoCombat/searchImg'],
  112: ['lable', '/videoCombat/commTolable'], //标注池
  113: ['solo', '/videoCombat/soloscout'], //单人作战
  114: ['two', '/videoCombat/videoplay'], //协同作战
  115: ['vtrack', '/videoCombat/videoplay'], //视频转码
  120: ['mycase','/videoCombat/caseInfomanage?ismyupload=true'],  //我的案事件
  121: ['specail','/videoCombat/special'],  //专案侦查
  123: ['myCaseSyn',''],  //我的协同
  124: ['myCasCade','/videoCombat/myCasCade'],  //我的串并案
  122: ['faceManage','/manage/faceManage'],  //人像库管理
  125: ['manFace','/videoCombat/personFace'] ,//人脸1V1
  126: ['faceover',''] ,//人脸超分

  // 案事件研判
  202: ['caseInfomanage', "/casestudy/caseInfomanage"],
  203: ['myupload', "/casestudy/myupload"],
  204: ['mycollect', "/casestudy/mycollect"],
  205: ['mybrowse', "/casestudy/mybrowse"],

  211: ['cascadeApprove', "/casestudy/cascadeApprove"],//串并案审批
  220: ['caseApprove', "/casestudy/caseApprove"],//案件审批
  221: ['caseMark', '/casestudy/caseMark'],//案件评分
  222: ['mysynergy', '/casestudy/mysynergy'],//协同作战

  213: ['caseInfostat', 'casestudy/caseInfostat'],
  214: ['casetimestat', '/casestudy/casetimestat'],
  215: ['caseareastat', '/casestudy/caseareastat'],
  216: ['casesortstat', '/casestudy/casesortstat'],
  217: ['casetypestat', '/casestudy/casetypestat'],
  218: ['casevideostat', '/casestudy/casevideostat'],

  207: ['caseRetrieval', '/casestudy/caseRetrieval'],//案事件检索
  208: ['case3DSearch', '/casestudy/case3DSearch'],//特征检索
  210: ['imgSearchCase',"/casestudy/imgSearchCase"],//以图搜案事件
  201: ['casePictureCombat', '/casestudy/casePictureCombat'],//挂图作战

  209: ['myCasCade', '/casestudy/myCasCade'],//我的串并案
  219: ['cascadeView', '/casestudy/cascadeView'],//串并案查看


  //车辆研判
  301: ['carTypeSearch', "/carJudged/carTypeSearch"],
  302: ['categorySearch', "/carJudged/categorySearch"],
  303: ['plateSearch', "/carJudged/carPlateSearch"],
  304: ['synSearch', "/carJudged/synSearchCar"],
  305: ['imgSearch', "/carJudged/imgSearchCar"],
  306: ['moniteSearch', '/carJudged/monitCar'],
  362: ['motorcycle', '/carJudged/motorcycle'],
  363: ['faceSearch', '/carJudged/faceSearch'],
  307: ['offineSearch', ''],//离线分析暂时不做
  308: ['firstToCity', '/carJudged/firstToCity'],
  309: ['footBold', '/carJudged/foothold'],
  310: ['plateOverMuch', '/carJudged/plateOverMuch'],
  311: ['similarPlate', '/carJudged/similarPlate'],
  312: ['oftenPass', '/carJudged/oftenPass'],
  313: ['trackBack', '/carJudged/trackBack'],
  314: ['drivingTogether', '/carJudged/drivingTogether'],
  315: ['hideByDay', '/carJudged/hideByDay'],
  316: ['areaCrash', '/carJudged/areaCrash'],
  317: ['deployApply', '/carJudged/deployApply'],
  318: ['deployManage', '/carJudged/deployManage'],
  319: ['currentDeploy', '/carJudged/currentDeploy'],
  320: ['trafficStatistics', '/carJudged/trafficStatistics'],
  321: ['carCount', '/carJudged/carCount'],
  322: ['countDeploy', ''],//布控数量统计暂时不做

  701: ['taskManage', "/videoStrucPlat/taskManage"], //任务管理
  702: ['semanticSearch', "/videoStrucPlat/semanticSearch"], //语意搜索
  703: ['searchPrint', "/videoStrucPlat/searchPrint"], //以图搜图
  704: ['resourceManage', "/videoStrucPlat/resourceManage"], //资源管理
  705: ['hashrate', "/videoStrucPlat/hashrate"], //算力分配
  706: ["department", ""], //部门管理
  707: ["user", ""], //用户管理
  708: ["log", ""], //日志管理
  709: ["log", ""],  //点位管理
  710: ["videoRetrieval", "/videoStrucPlat/videoRetrieval"],  //检索结果查看
  711: ["caseList", "/videoStrucPlat/caseList"], //案件管理
  712: ["MarkPool", "/videoStrucPlat/MarkPool"],  //标注池
  712: ["faceManagestruct", ""],  //标注池


  // 系统管理
  601: ['department',"/manage/departmentManage"],
  602: ['user',"/manage/userManage"],
  603: ['role',"/manage/roleManage"],
  604: ['log',"/manage/logManage"],
  605: ['dictionary',"/manage/dicManage"],
  606: ['quitpment','/manage/device'],
  607: ['opration',''],
  608: ['store',''],
  609: ['timesync',''],
  610: ['msgtake',''],
  611: ['msgnotic',''],
  672: ['case3d','/manage/case3DManage'], //特征管理
  673: ['faceManage','/manage/faceManage'],
  675: ["hashrate", "/manage/hashrate"],

  //人像
  401: ["",""], //1:1人像对比
  402: ["",""], //1:N人像对比
  403: ["",""], //N:N人像对比
  404: ["",""], //以图搜人
  405: ["",""], //人员轨迹分析
  406: ["",""], //人员频次分析
  407: ["",""], //布控报警
  408: ["",""], //人脸库管理
  409: ["",""], //路人库管理
  410: ["",""], //人像布控管理
  411: ["",""], //人像实时监测

  //可视化
  501: ["",""],  //结构化
  502: ["",""],  //车辆
  503: ["",""],  //人像
  504: ["",""],  //案事件可视化
  505: ["",""],  //案事件线索可视化
  506: ["",""],  //车辆可视化
  507: ["",""],  //人像可视化
  508: ["",""],  //资源可视化

};
