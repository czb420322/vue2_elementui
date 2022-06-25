// import insuranceTypes from './insuranceTypes.json'

const state = () => ({
  kindCodeValue: {
    kindCode: "",
    value: ""
  },
  sysAgentExpandDTO: {
    agreementNo: '',
    businessType: '',
    codeCode: '',
    codeName: '',
    proxyCode: '',
    proxyName: '',
    unitmainTenanceTypeOne: '',
    unitmainTenanceTypeOneName: '',
    unitmainTenanceTypeTwo: '',
    unitmainTenanceTypeTwoName: ''
  }, // 业务信息
  orderNo: '',  // 订单号
  carBanner: '', // 首页banner
  editInsurance: 'NEW',
  /**
   * 立即投保
   */
  carInsureEntry: {
    cityCode: "",
    cityName: "",
    transferFlag: 0,
    licenseNo: "",
    licenseName: "",
    isLicenseNo: false,
    transferDate: '', // 过户口日期
    address: []
  },
  /**
   * 基本信息
   */
  vehicleDTO: {  // 车辆信息
    engineNo: "",  // 发动机号
    frameNo: "", // 车架号
    brandName: "", // 车型名称
    purchaseDate: "", // 发证日期
    enrollDate: "", // 注册日期
    businessDate: "", // 购车发票日期
    saleCompany: "", // 新车销售公司名称
    sale4SFlag: false // 是否4s销售
  },
  saleAreaCode: {  // 新车销售公司所在地
    value: { text: "", value: "" },
    data: [
      { text: "广州市", value: "440100" },
      { text: "韶关市", value: "440200" },
      { text: "珠海市", value: "440400" },
      { text: "汕头市", value: "440500" },
      { text: "佛山市", value: "440600" },
      { text: "江门市", value: "440700" },
      { text: "湛江市", value: "440800" },
      { text: "茂名市", value: "440900" },
      { text: "肇庆市", value: "441200" },
      { text: "惠州市", value: "441300" },
      { text: "梅州市", value: "441400" },
      { text: "汕尾市", value: "441500" },
      { text: "河源市", value: "441600" },
      { text: "阳江市", value: "441700" },
      { text: "清远市", value: "441800" },
      { text: "东莞市", value: "441900" },
      { text: "中山市", value: "442000" },
      { text: "潮州市", value: "445100" },
      { text: "揭阳市", value: "445200" },
      { text: "云浮市", value: "445300" }
    ]
  },
  carOwnerDTO: { // 车主信息
    carOwner: "", // 车主姓名
    carOwnerNature: {
      value: { text: "个人", value: "0" },
      data: [
        { text: "个人", value: "0" },
        { text: "机关", value: "1" },
        { text: "企业", value: "2" }
      ]
    },  // 车主性质
    carOwnerIdNo: "", // 车主证件号码
    address: ""
  },

  // 车主
  propOrderVehicleDTO: {
    carOwnerIDValidStartDate: "", // 证件起期
    carOwnerIDValidEndDate: "", // 证件止期
    carOwnerIDValidDateLongFlag: "", // 是否永久
  },
  // 投保人
  orderAppntDTO: {
    appntIDValidStartDate: "", // 证件起期
    appntIDValidEndDate: "", // 证件止期
    appntIDValidDateLongFlag: "", // 是否永久
  },
  // 被保人
  policyInsuredDTOList: {
    insuredIDValidStartDate: "", // 证件起期
    insuredIDValidEndDate: "", // 证件止期
    insuredIDValidDateLongFlag: "", // 是否永久
  },

  fuelCategory: {  // 能源种类
    name: "能源种类",
    value: { text: "", value: "" },
    data: [
      { text: "燃油", value: "0" },
      { text: "纯电动", value: "1" },
      { text: "燃料电池", value: "2" },
      { text: "插电式混合动力", value: "3" },
      { text: "其他混合动力", value: "4" },
      { text: "其他", value: "9" }
    ]
  },
  fuelTypeFalg: false,
  isFuelType: "",
  carTypeDTO: {  // 车型信息
    codeCode: "",
    codeName: "",
    clausesContent: "",
    vehiclefgwCode: "",
    seatCount: "", // 载客数
    power: "",
    powerLb: "",
    carBrand: "",
    carKind: "",
    carStyle: "",
    completeKerbMass: "",
    exhaustScale: "",
    exhaustScaleLb: "",
    factory: "",
    newfuelModel: "",
    purchasePrice: "",
    purchasePriceLb: "",
    seatCountLb: "",
    tonCount: "",
    tonCountLb: "",
    newEnergyFlag: "",  // 新能源车标志
    pureElectricBatteryType: "", // 纯电动电池类型
    pureElectricRange: '', // 纯电续航里程
    fuelTypeDescribe: '', // 其他能源（燃料）种类描述
    fuelType: "" // 能源种类
  },

  VehicleInsurance: { // 车险投保页面
    switchChecked: true, //交强险
    switchChecked1: true, //商业险
    active: 0,
    bImmeValidEndDate: "", //即时终保时间  b是商业险
    bImmeValiFlag: false, //即时起保标识
    cImmeValidEndDate: "", //即时终保时间  c是交强险
    cImmeValiFlag: false, //即时起保标识
  },

  carPriceRequest: { // 车价试算报文
    url: '',
    request: ''
  },
  carPriceTime: '', // 车价起保时间 
  carPrice: {
    inputvo: "",
    actualValue: ""
  }, // 车价

  insuranceTypes: [],  // 险种
  commercialInsuranceStartDate: '', // 商业险-起保时间
  compulsoryInsuranceStartDate: '', // 交强险与车船税-起保时间

  trialParams: {
    compulsoryInsurance: {
      prptitemkindList: []
    },
    commercialInsurance: {
      prptitemkindList: []
    }
  }, // 试算报文
  tryCalculation: {
    sumPremiumCI: 0,
    sumPremiumBI: 0,
    sumPayTax: 0
  }, // 试算返回值

  VerificationCode: {
    bicheckCode: '',  // 商业险验证码
    bidemandNo: '',   // 商业险查询码
    bValue: '',
    cicheckCode: '',  // 交强险验证码
    cidemandNo: '',  // 交钱险查询码
    cValue: ''
  }, // 验证码

  policyNo: {
    b: '',  // 商业险保单号
    c: '',  // 交强险保单号
    payOrderNo: '', // 车+意订单号
  },

  // 投保人
  applyInfoDTO: {
    checkedOwner: false, // 同车主信息
    name: '',
    idType: '0',
    idNo: '',
    cls: "3",
    mobile: '',
    province: "", // 省
    city: "", // 市
    county: "", // 区
    address: "", // 地址
    detailed_address: "", // 详细地址
    phoneHolderName: '', // 手机持有人姓名
    phoneHolderIdentifyNumber: '', // 手机持有人身份证号码
    insuredNature: { // 投保人性质 3自然人，4法人
      value: {
        text: "自然人",
        value: "3"
      },
      data: [
        {
          text: "自然人",
          value: "3"
        },
        {
          text: "法人",
          value: "4"
        }
      ]
    },
    appliLinkmanIdnum: '', //投保人联系人证件号码
    appliLinkerName: '' //投保人联系人姓名
  },
  // 被保人
  insureInfoDTO: {
    checkedOwner: false, // 同车主信息
    checkedApplyInfo: false, // 同投保险人
    name: '',
    idType: '0',
    idNo: '',
    cls: "3",
    mobile: '',
    province: "", // 省
    city: "", // 市
    county: "", // 区
    address: "", // 地址
    detailed_address: "", // 详细地址
    phoneHolderName: '', // 手机持有人姓名
    phoneHolderIdentifyNumber: '', // 手机持有人身份证号码
    insuredNature: { // 投保人性质 3自然人，4法人
      value: {
        text: "自然人",
        value: "3"
      },
      data: [
        {
          text: "自然人",
          value: "3"
        },
        {
          text: "法人",
          value: "4"
        }
      ]
    },
    insuredLinkmanIdnum: '', //被保人联系人证件号码
    insuredLinkerName: '' //被保人联系人姓名
  },

  ciPrptenagesDTOList: [],  // 交强险
  biPrptenagesDTOList: [],  // 商业险

  subProposalNo: {}, // 保单号
  decisionUnit: [],  // 决策单元
  businessList: [ // 业务来源
    { text: '直接业务', value: '0' },
    { text: '个人代理', value: '1' }
  ],
  agreementList: [],
  phonotape: { //影像信息
    businessNo: '',
    vehicle: [],//上传车辆图片
    papers: [],//上传证件照片
  },
  verifyTrial: { // 验证试算
    sign: '', // 试算签名
    isTrial: true,
    tryCalculation: false,
  },
  discountData: { // 折扣
    selfAdjustRate: '', // 自主定价系数
    selfAdjustRateTips: '自主定价系数区间：',
    selfAdjustRateFirst: 0, // 自主定价系数（第1次）
    sumLowerRate: '', // 最低折扣
    sumTopRate: '', // 最高折扣 
    billELR: '', // 签单折扣预期赔付率
    billcomeGroup: '',  // 商业险业务分组
    expectDiscount: '',  // 期望折扣
    noclaimRate: '', // 无忧赔款系数
    biClaimTimes: '', // 商业险出险次数
    ciClaimTimes: '', // 交强险出险次数
    sign: ''
  },
  // 车+意
  accidentInsurance: {
    switchChecked: false,
    show: false,
    totalPrice: 0,
    index: 0,
    active: 0,
    list: [],
  },
  resPolicyCaa: {}, // 订单返回的数据
  // 0-投保单录入 1-投保单修改
  editType: 0,
  saveProposal: [],
  licensePlateType: {
    name: "号牌种类",
    struct: {
      data: [
        { text: "小型汽车牌照", value: "02" },
        { text: "小型新能源汽车", value: "52" }
      ],
      shangHaiData: [
        { text: "大型汽车号牌", value: "01" },
        { text: "大型新能源汽车号牌", value: "51" }
      ],
      motorcycle: [
        { text: "两、三轮摩托车号牌", value: "07" },
        { text: "轻便摩托车号牌", value: "08" },
      ],
      value: {}
    }
  },
  paymentMethod: {
    value: '01',
    list: [
      {
        text: "微信",
        value: "01"
      },
      {
        text: "支付宝",
        value: "02"
      }
    ] // 01微信、02支付宝、03银行卡
  },
  renewInsuranceQuery: {
    checked: false,
    tips: '请点击续保查询再下一步'
  },
  // 车船税减免标志
  vehicleVesselTax: {
    taxRelifFlag: { // 车船税
      value: {
        text: "正常缴税",
        value: "N"
      },
      data: [
        {
          text: "已完税",
          value: "W"
        },
        {
          text: "免税",
          value: "M"
        },
        {
          text: "正常缴税",
          value: "N"
        },
        {
          text: "补税并纳税",
          value: "B"
        },
        {
          text: "缓税",
          value: "H"
        }
      ]
    },
    taxComCode: '', // 开具完税凭证地区代码
    taxComName: '', // 增加开具税务机关
    paidFreeCertificate: '', // 完/减免税凭证
    taxDocumentDate: '' // 完税凭证填发日期
  },
  // 摩托车-车船税减免标志
  motorcycleVehicleVesselTax: {},
  // 产品备案号
  productRecord: {
    checked: false,
    list: [
      { name: '机动车交通事故责任强制保险条款', code: '银保监复〔2020〕630号' },
      { name: '特种车损失保险（BX20112101）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 052号' },
      { name: '特种车全车盗抢保险（BX20112104）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 050号' },
      { name: '特种车第三者责任保险（BX20112102）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 049号' },
      { name: '特种车车上人员责任保险（BX20112103）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 053号' },
      { name: '附加医保外医疗费用责任保险（BX20112207）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 030号' },
      { name: '附加修理期间费用补偿保险（BX20112204）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 034号' },
      { name: '附加新增加设备损失保险（BX20112203）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 040号' },
      { name: '附加特种车辆固定设备、仪器损坏扩展条款（BX20112209）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 036号' },
      { name: '附加起重、装卸、挖掘车辆损失扩展条款（BX20112208）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 053号' },
      { name: '附加绝对免赔率特约条款（BX20112201）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 055号' },
      { name: '附加精神损害抚慰金责任保险（BX20112206）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 035号' },
      { name: '附加车上货物责任保险（BX20112205）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 047号' },
      { name: '附加车轮单独损失保险（BX20112202）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 031号' },
      { name: '摩托车、拖拉机损失保险（BX20113101）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 041号' },
      { name: '摩托车、拖拉机全车盗抢保险（BX20113104）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 051号' },
      { name: '摩托车、拖拉机第三者责任保险（BX20113102）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 047号' },
      { name: '摩托车、拖拉机车上人员责任保险（BX20113103）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 055号' },
      { name: '附加医保外医疗费用责任保险（BX20113203）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 033号' },
      { name: '附加绝对免赔率特约条款（BX20113201）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 056号' },
      { name: '附加精神损害抚慰金责任保险（BX20113202）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 050号' },
      { name: '驾乘人员意外伤害保险（BX20115101）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 048号' },
      { name: '附加住院津贴保险（BX20115201）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 052号' },
      { name: '附加医保外医疗费用补偿保险（BX20115202）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 037号' },
      { name: '机动车损失保险（BX20111101）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 054号' },
      { name: '机动车第三者责任保险（BX20111102）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 042号' },
      { name: '机动车车上人员责任保险（BX20111103）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 045号' },
      { name: '附加医保外医疗费用责任保险（BX20111210）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 058号' },
      { name: '附加修理期间费用补偿保险（BX20111205）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 039号' },
      { name: '附加新增加设备损失保险（BX20111203）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 041号' },
      { name: '附加绝对免赔率特约条款（BX20111201）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 049号' },
      { name: '附加精神损害抚慰金责任保险（BX20111208）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 048号' },
      { name: '附加机动车增值服务特约条款（BX20111211）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 038号' },
      { name: '附加法定节假日限额翻倍保险（BX20111209）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 045号' },
      { name: '附加发动机进水损坏除外特约条款（BX20111206）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 046号' },
      { name: '附加车身划痕损失保险（BX20111204）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 051号' },
      { name: '附加车上货物责任保险（BX20111207）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 044号' },
      { name: '附加车轮单独损失保险（BX20111202）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 042号' },
      { name: '机动车损失保险（BX20114101）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 043号' },
      { name: '机动车第三者责任保险（BX20114102）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 046号' },
      { name: '机动车车上人员责任保险（BX20114103）', code: '(国任财险)(备-机动车辆保险)【2020】(主) 044号' },
      { name: '附加医保外医疗费用责任保险（BX20114204）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 043号' },
      { name: '附加绝对免赔率特约条款（BX20114201）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 057号' },
      { name: '附加精神损害抚慰金责任保险（BX20114203）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 054号' },
      { name: '附加车轮单独损失保险（BX20114202）', code: '(国任财险)(备-机动车辆保险)【2020】(附) 032号' },
    ]
  },
  // 货车
  vehicleType: '0', // 0-目前的车险流程  1-货车的流程
  useNatureCode: {  // 使用性质
    value: { text: "", value: "" },
    data: [
      { value: "8A", text: "家庭自用" },
      { value: "8B", text: "非营业企业" },
      { value: "8D", text: "非营业个人" },
      { value: "8E", text: "非营业党政机关" },
      { value: "8F", text: "非营业事业团体" },
      { value: "9E", text: "营业旅游客运" },
      { value: "9F", text: "营业出租" },
      { value: "9G", text: "营业租赁" },
      { value: "9K", text: "预约出租客运" }
    ]
  },

  // 货车 -----开始
  // 货车使用性质 
  trucksUseNatureCode: {
    value: { text: "", value: "" },
    data: [
      { value: "8B", text: "非营业企业" },
      { value: "8D", text: "非营业个人" },
      { value: "8E", text: "非营业党政机关" },
      { value: "8F", text: "非营业事业团体" },
      { value: "9D", text: "营业货运" }
    ]
  },
  carKindCode: {  // 车辆种类
    value: { text: "", value: "" },
    data: [
      { text: "载货机动车", value: "H0" },
      { text: "低速载货汽车", value: "H1" },
      { text: "三轮汽车", value: "H2" },
      { text: "厢式货车", value: "H3" },
      { text: "客货两用车", value: "H4" },
      { text: "半挂牵引车", value: "H5" },
      { text: "自卸车", value: "H6" },
      { text: "电瓶运输车", value: "H7" },
      { text: "起重运输车", value: "H8" },
      { text: "仓栅式货车", value: "H9" }
    ]
  },
  vehicleCategory: {  // 车辆类型
    value: { text: "", value: "" },
    data: [
      { text: "2吨以下", value: "6" },
      { text: "2-5吨", value: "7" },
      { text: "5-10吨", value: "8" },
      { text: "10吨以上", value: "9" }
    ]
  },
  licenseCategory: {  // 车辆类型描述
    value: { text: "", value: "" },
    data: [
      { text: "中型普通货车", value: "H21" },
      { text: "中型厢式货车", value: "H22" },
      { text: "中型封闭货车", value: "H23" },
      { text: "中型罐式货车", value: "H24" },
      { text: "中型平板货车", value: "H25" },
      { text: "中型集装厢车", value: "H26" },
      { text: "中型自卸货车", value: "H27" },
      { text: "中型特殊结构货车", value: "H28" },
      { text: "轻型普通货车", value: "H31" },
      { text: "轻型厢式货车", value: "H32" },
      { text: "轻型封闭货车", value: "H33" },
      { text: "轻型罐式货车", value: "H34" },
      { text: "轻型平板货车", value: "H35" },
      { text: "轻型自卸货车", value: "H37" },
      { text: "轻型特殊结构货车", value: "H38" },
      { text: "微型普通货车", value: "H41" },
      { text: "微型厢式货车", value: "H42" },
      { text: "微型封闭货车", value: "H43" },
      { text: "微型罐式货车", value: "H44" },
      { text: "微型自卸货车", value: "H45" },
      { text: "微型特殊结构货车", value: "H46" },
      { text: "低速普通货车", value: "H51" },
      { text: "低速厢式货车", value: "H52" },
      { text: "低速罐式货车", value: "H53" },
      { text: "低速自卸货车", value: "H54" },
    ]
  },
  special: [
    { text: "中型仓栅式货车", value: "H29" },
    { text: "轻型仓栅式货车", value: "H39" },
    { text: "微型仓栅式货车", value: "H47" },
    { text: "仓栅式低速货车", value: "H55" },
  ],
  licenseColor: {  // 号牌颜色
    value: { text: "", value: "" },
    data: [
      { text: "蓝", value: "01" },
      { text: "黑", value: "02" },
      { text: "白", value: "03" },
      { text: "黄", value: "04" },
      { text: "白蓝", value: "05" },
      { text: "渐变绿", value: "06" },
      { text: "黄绿双拼", value: "07" },
      { text: "其它", value: "09" },
    ]
  },
  // 货车-----结束

  // 摩托车----开始
  // 摩托车使用性质
  motorbikeUseNatureCode: {
    value: { text: "", value: "" },
    data: [
      { value: "8B", text: "非营业企业" },
      { value: "8D", text: "非营业个人" },
      { value: "8E", text: "非营业党政机关" },
      { value: "8F", text: "非营业事业团体" },
    ]
  },
  // 摩托车车辆种类
  motorbikeKindCode: {
    value: { text: "", value: "" },
    data: [
      { text: "两轮摩托车", value: "M1" },
      { text: "正三轮摩托车", value: "M5" },
      { text: "侧三轮摩托车", value: "M6" },
    ]
  },

  // 摩托车车辆类型描述
  motorbikeDescribe: {
    value: { text: "", value: "" },
    data: [
      { value: "M11", text: "普通正三轮摩托车" },
      { value: "M12", text: "轻便正三轮摩托车" },
      { value: "M13", text: "正三轮载客摩托车" },
      { value: "M14", text: "正三轮载货摩托车" },
      { value: "M15", text: "侧三轮摩托车" },
      { value: "M21", text: "普通二轮摩托车" },
      { value: "M22", text: "轻便二轮摩托车" }
    ]
  },
  // 摩托车车牌颜色
  motorbikeLicenseColor: {
    value: { text: "", value: "" },
    data: [
      { text: "蓝", value: "01" },
      { text: "黄", value: "04" },
    ]
  },
  pureElectricBatteryType: {  // 电池类型
    value: { text: "锂电池+超级电容", value: "11" },
    data: [
      { text: "锂电池+超级电容", value: "11" },
      { text: "超级电容", value: "13" },
      { text: "三元锂电池", value: "14" },
      { text: "镍氢电池", value: "15" },
      { text: "锂电池", value: "16 " },
      { text: "锂离子电池", value: "17 " },
      { text: "锂电池/超级电容", value: "18 " },
      { text: "铅酸电池", value: "19" },
      { text: "铅酸电池+超级电容", value: "21" },
      { text: "超级电容/锂电池", value: "41" },
      { text: "其它", value: "99" },
    ]
  },
  // 充电桩损失保险与充电桩责任保险
  chargingPostDataList: [],
})

export default state
