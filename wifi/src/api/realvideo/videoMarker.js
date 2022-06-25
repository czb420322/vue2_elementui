import {
  windowToCanvas,
  clearRect,
  imgwh
} from "../../page/videoCombat/canvas";
const mixins = {
  data: function () {
    return {
      checkShow: 1,
      one: "", //图片提交的坐标
      two: "",
      three: "",
      four: "",
      Canvasclick: false,
      time2: '', //标注的事件
      videoimg: "",
      pedestrian: {}, //标注行人
      carshow: false,
      psersonshow: true,
      cpshow: false,
      imgnewUlr: '', // 图片地址
      radioIndex: '',
      //目标索引
      carIndex: '',
      carpltecolor: false, //车辆
      iscartarget: false,
      iscarColor: false,
      isPlateClass: false,
      carPlateColor: '', //车牌颜色
      cartarget: '', //目标类型
      carColor: '', //车辆颜色
      carPlateNum: '',
      PlateClass: '', //车辆类别
      isPersonAgeType: false, //年龄  //行人信息
      isBagStyleType: false,
      isBagColorType: false,
      isHandArticleType: false,
      isPantsStyleType: false,
      isCulotteColorType: false,
      isHairStyleType: false,
      isHairColorStyle: false,
      isEthicCodeType: false,
      isGenderType: false,
      isBodyType: false,
      isShoesStyleType: false,
      isShoesColorType: false,
      isCoatStyleType: false,
      isColorType: false,
      isCoatTextureType: false,
      isPersonViewType: false,
      PersonAge: '',
      EthicCode: '',
      Gender: '',
      BagStyle: '',
      BagColor: '',
      HandArticle: '',
      PantsStyle: '',
      CulotteColor: '',
      HairStyle: '',
      HairColor: '',
      posture: '', //体态
      ShoesStyle: '',
      ShoesColor: '',
      CoatStyle: '',
      Color: '',
      CoatTexture: '',
      PersonView: '',
      persontarget: '行人',
      lableTime: '',
      lableName: '标注名称',


      //骑车人
      cptIndex: '',
      isBikeBagType: false, //年龄  //行人信息
      isBikeBagColorType: false,
      isBikeColorType: false,
      isBikeCarraying: false,
      isBikeCulotteStyleType: false,
      isBikeCulotteColorType: false,
      isEyePartType: false,
      isBikeHairStyleType: false,
      isMouthPartType: false,
      isScarfPartType: false,
      isBikeBodyType: false,
      isBikeUmbrellaFlag: false,
      isBikeCoatStyleType: false,
      isBikeCoatStyleColorType: false,
      isBikeCoatTextureType: false,
      isBikeTowardsType: false,
      isDriverCount: false,
      BikeBag: '',
      BikeBagColor: '',
      BikeColor: '',
      BikeCarray: '',
      BikeCulotteStyle: '',
      BikeCulotteColor: '',
      EyePart: '',
      BikeHairStyle: '',
      MouthPart: '',
      ScarfPart: '',
      BikeBody: '', //体态
      BikeUmbrella: '',
      BikeCoatStyle: '',
      BikeCoatStyleColor: '',
      BikeCoatTexture: '',
      BikeTowards: '',
      Driver: '',
      cptarget: '',
      iscptarget: false,
      videoseek: '', //视频地址
      disabled1: false,
      disabled2: false,
      disabled3: false,


    }
  },
  created() {

  },
  methods: {
     getcarcolor(e) {
         this.carPlateColor = e.target.innerText;
         this.carpltecolor = false
       },
       getiscartarget(e) {
         this.carIndex = e.target.getAttribute("index");
         this.cartarget = e.target.innerText;
         this.iscartarget = false
       },
       getiscptarget(e) {
         this.cptIndex = e.target.getAttribute("index");
         this.cptarget = e.target.innerText;
         this.iscptarget = false
       },
       getisPlateClass(e) {
         this.isPlateClass = false
         this.PlateClass = e.target.innerText; //车辆类别
       },
       getiscarColor(e) {
         this.carColor = e.target.innerText;
         this.iscarColor = false
       },
       //行人
       getisPersonAgeType(e) {
         this.PersonAge = e.target.innerText;
         this.isPersonAgeType = false
       },
       getisBagStyle(e) {
         this.BagStyle = e.target.innerText;
         this.isBagStyleType = false
       },
       getisBagColor(e) {
         this.BagColor = e.target.innerText;
         this.isBagColorType = false
       },
       getisHandArticle(e) {
         this.HandArticle = e.target.innerText;
         this.isHandArticleType = false
       },
       getisPantsStyleType(e) {
         this.PantsStyle = e.target.innerText;
         this.isPantsStyleType = false
       },
       getisCulotteColorType(e) {
         this.CulotteColor = e.target.innerText;
         this.isCulotteColorType = false
       },
       getisHairColorStyle(e) {
         this.HairColor = e.target.innerText;
         this.isHairColorStyle = false
       },
       getisHairStyleType(e) {
         this.HairStyle = e.target.innerText;
         this.isHairStyleType = false
       },
       getisEthicCodeType(e) {
         this.EthicCode = e.target.innerText;
         this.isEthicCodeType = false
       },
       getisGenderType(e) {
         this.Gender = e.target.innerText;
         this.isGenderType = false
       },
       getisBodyType(e) {
         this.posture = e.target.innerText;
         this.isBodyType = false
       },
       getisShoesStyleType(e) {
         this.ShoesStyle = e.target.innerText;
         this.isShoesStyleType = false
       },
       getisShoesColorType(e) {
         this.ShoesColor = e.target.innerText;
         this.isShoesColorType = false
       },
       getisCoatStyleType(e) {
         this.CoatStyle = e.target.innerText;
         this.isCoatStyleType = false
       },
       getisColorType(e) {
         this.Color = e.target.innerText;
         this.isColorType = false
       },
       getisCoatTextureType(e) {
         this.CoatTexture = e.target.innerText;
         this.isCoatTextureType = false
       },
       getisPersonViewType(e) {
         this.PersonView = e.target.innerText;
         this.isPersonViewType = false
       },
       //骑车人
       getisBikeBagType(e) {
         this.BikeBag = e.target.innerText;
         this.isBikeBagType = false
       },
       getisBikeBagColorType(e) {
         this.BikeBagColor = e.target.innerText;
         this.isBikeBagColorType = false
       },
       getisBikeColorType(e) {
         this.BikeColor = e.target.innerText;
         this.isBikeColorType = false
       },
       getisBikeCarraying(e) {
         this.BikeCarray = e.target.innerText;
         this.isBikeCarraying = false
       },
       getisBikeCulotteStyleType(e) {
         this.BikeCulotteStyle = e.target.innerText;
         this.isBikeCulotteStyleType = false
       },
       getisBikeCulotteColorType(e) {
         this.BikeCulotteColor = e.target.innerText;
         this.isBikeCulotteColorType = false
       },
       getisDriverCount(e) {
         this.Driver = e.target.innerText;
         this.isDriverCount = false
       },
       getisEyePartType(e) {
         this.EyePart = e.target.innerText;
         this.isEyePartType = false
       },
       getisBikeHairStyleType(e) {
         this.BikeHairStyle = e.target.innerText;
         this.isBikeHairStyleType = false
       },
       getisMouthPartType(e) {
         this.MouthPart = e.target.innerText;
         this.isMouthPartType = false
       },
       getisScarfPartType(e) {
         this.ScarfPart = e.target.innerText;
         this.isScarfPartType = false
       },
       getisBikeBodyType(e) {
         this.BikeBody = e.target.innerText;
         this.isBikeBodyType = false
       },
       getisBikeCoatStyleType(e) {
         this.BikeCoatStyle = e.target.innerText;
         this.isBikeCoatStyleType = false
       },
       getisBikeCoatStyleColorType(e) {
         this.BikeCoatStyleColor = e.target.innerText;
         this.isBikeCoatStyleColorType = false
       },
       getisBikeCoatTextureType(e) {
         this.BikeCoatTexture = e.target.innerText;
         this.isBikeCoatTextureType = false
       },
       getisBikeTowardsType(e) {
         this.BikeTowards = e.target.innerText;
         this.isBikeTowardsType = false
       },
       getisBikeUmbrellaFlag(e) {
         this.BikeUmbrella = e.target.innerText;
         this.isBikeUmbrellaFlag = false
       },
      clearAllfield() {
        this.PersonAge = this.BagStyle = this.BagColor = this.HandArticle = this.PantsStyle = this.CulotteColor = this.HairStyle = ''
        this.HairColor = this.EthicCode = this.Gender = this.posture = this.ShoesStyle = this.ShoesColor = this.CoatStyle = ''
        this.Color = this.CoatTexture = this.PersonView = this.PersonStatus = this.pose = this.Behavior = this.HabitualAction = ''
        this.PersonAge = this.BikeBag = this.BikeBagColor = this.BikeColor = this.BikeCarray = this.BikeCulotteStyle = this.BikeCulotteColor = ''
        this.Driver = this.EyePart = this.BikeHairStyle = this.MouthPart = this.EthicCode = this.ScarfPart = this.Gender = ''
        this.BikeBody = this.cptIndex = this.BikeUmbrella = this.BikeCoatStyle = this.BikeCoatStyleColor = this.BikeCoatTexture = this.BikeTowards = ''
        this.PlateClass = this.carPlateColor = this.carPlateNum = this.carColor = ''
        this.VehicleBehavior = this.FrontThing = this.RearThing = this.AutoFoilColor = ''
      },
      //识别失败
      OpenTime() {
        this.lableTime = this.getCurrentDate();
        let date = new Date();
        this.$nextTick(() => {
          laydate.render({
            elem: "#test1", //指定元素
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            max: 'date',
            done(value, date, endDate) {}
          });
        });
      },
      //确定标注
       videoOk() {
         var AllObj = {}
         if (this.pedestrian.type_index == 0) { //行人
           AllObj.ageType = this.PersonAge //年龄段
           AllObj.bagStyle = this.BagStyle // 包款式
           AllObj.bagColor = this.BagColor // 包颜色
           AllObj.appendant = this.HandArticle // 携物(指手上拿的東西)
           AllObj.trousersStyle = this.PantsStyle // 下衣类型
           AllObj.trousersColor = this.CulotteColor // 下衣颜色
           AllObj.hairStyle = this.HairStyle // 发型
           AllObj.hairColor = this.HairColor // 头发颜色
           AllObj.ethicCode = this.EthicCode // 民族代码
           AllObj.genderCode = this.Gender //  性别
           AllObj.bodyType = this.posture //体态
           AllObj.shoesStyle = this.ShoesStyle //   鞋子款式
           AllObj.shoesColor = this.ShoesColor //  鞋子颜色
           AllObj.traceTypeName = this.persontarget //行人目标
           AllObj.typeIndex = this.pedestrian.type_index
           AllObj.coatStyle = this.CoatStyle //  上衣款式
           AllObj.coatColor = this.Color // 上衣颜色
           AllObj.coatTexture = this.CoatTexture //  上衣纹理
           AllObj.viewType = this.PersonView //  朝向
           AllObj.leftTopX = this.pedestrian.obj_left //  左上
           AllObj.leftTopY = this.pedestrian.obj_top //  左下
           AllObj.rightBtmX = this.pedestrian.obj_right //  右上
           AllObj.rightBtmY = this.pedestrian.obj_bootom //  右下
         }
         if (this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index == 3) {
           //骑车人
           AllObj.ageType = this.PersonAge //年龄段
           AllObj.bagStyle = this.BikeBag //包款式
           AllObj.bagColor = this.BikeBagColor //包颜色
           AllObj.plateColor = this.BikeColor // 所骑车颜色
           AllObj.carryingType = this.BikeCarray == '没' ? 0 : 1 // 是否携物
           AllObj.trousersStyle = this.BikeCulotteStyle // 下衣类型
           AllObj.trousersColor = this.BikeCulotteColor // 下衣颜色
           AllObj.driverCount = parseInt(this.Driver) //  驾驶人数
           AllObj.eyePart = this.EyePart // 眼部特征
           AllObj.hairStyle = this.BikeHairStyle // 发型
           AllObj.mouthPart = this.MouthPart // 嘴部特征
           AllObj.ethicCode = this.EthicCode // 民族代码
           AllObj.scarf = this.ScarfPart //围脖
           AllObj.genderCode = this.Gender //  性别
           AllObj.bodyType = this.BikeBody //   体态
           AllObj.typeIndex = this.pedestrian.type_index //目标编号
           AllObj.umbrellaFlag = this.BikeUmbrella == '没' ? 0 : 1 //   是否打伞
           AllObj.coatStyle = this.BikeCoatStyle //  上衣款式
           AllObj.coatColor = this.BikeCoatStyleColor // 上衣颜色
           AllObj.coatTexture = this.BikeCoatTexture //  上衣纹理
           AllObj.viewType = this.BikeTowards //  朝向
           AllObj.traceTypeName = this.cptarget //目标类型
           AllObj.leftTopX = this.pedestrian.obj_left //  左上
           AllObj.leftTopY = this.pedestrian.obj_top //  左下
           AllObj.rightBtmX = this.pedestrian.obj_right //  右上
           AllObj.rightBtmY = this.pedestrian.obj_bootom //  右下
         }
         if (this.pedestrian.type_index == 4 || this.pedestrian.type_index == 5 || this.pedestrian.type_index == 6 ||
           this.pedestrian.type_index == 7 || this.pedestrian.type_index == 8) { //汽车
           AllObj.plateClass = this.pedestrian.plate_class
           AllObj.plateColor = this.carPlateColor; //车牌颜色
           AllObj.plateNo = this.carPlateNum; //车辆号牌
           AllObj.vehicleColor = this.carColor; //车辆颜色
           AllObj.vehicleUuid = this.pedestrian.vehicle_id; //车辆ID
           AllObj.typeIndex = this.pedestrian.type_index; //车辆类型
           AllObj.traceTypeName = this.cartarget; //目标类型
           AllObj.leftTopX = this.pedestrian.obj_left //  左上
           AllObj.leftTopY = this.pedestrian.obj_top //  左下
           AllObj.rightBtmX = this.pedestrian.obj_right //  右上
           AllObj.rightBtmY = this.pedestrian.obj_bootom //  右下
         }
         var arr2 = [];
         for (var key in AllObj) {
           var obj1 = {}
           obj1["itemCode"] = key,
             obj1["valueName"] = AllObj[key]
           arr2.push(obj1)
         }
         // console.log(this.pedestrian.type_index,8888);
         let data1 = {
           mark: {
             typeId: this.pedestrian.type_index,
             videoUrl: this.imgnewUlr,
             videoCaptureUrl: this.videoimg,
             deviceId: '',
             caseUuid: '',
             createTimeStr: document.getElementById("test1").value,
             markName: this.lableName
           },
           attrs: arr2,
         }
         data1 = JSON.stringify(data1)
         let data2 = {
           data: data1
         };
         data2 = this.$qs.stringify(data2)
         this.$http.post('/vsas/video/mark/mark', data2).then(res => {
           if (res.data.code == 200) {
             this.DialogVisible1 = false;
           }
         })
         this.carshow = this.psersonshow = this.cpshow = false;
       },
       //开始标注
       getcoord() {
         this.handShow = false;
         this.Canvasclick = true;
         var canvas = document.getElementById("VideoPlayCanvas");
         canvas.setAttribute("width", document.getElementById("VidoePlayImgUrl").clientWidth);
         canvas.setAttribute("height", document.getElementById("VidoePlayImgUrl").clientHeight);
         var context = canvas.getContext("2d");
         context.beginPath();
         context.lineWidth = 2;
         canvas.onmousedown = e => {
           if (!this.Canvasclick) {
             return false;
           }
           let ele = windowToCanvas(canvas, e.clientX, e.clientY);
           this.one = ele.x;
           this.two = ele.y;
           canvas.onmousemove = e => {
             //鼠标移动的时候
             let ele = windowToCanvas(canvas, e.clientX, e.clientY);
             context.clearRect(0, 0, canvas.width, canvas.height);
             this.three = ele.x;
             this.four = ele.y;
             context.strokeStyle = "red";
             context.strokeRect(
               this.one,
               this.two,
               this.three - this.one,
               this.four - this.two
             );
           };
         };
         document.body.onmouseup = e => {
           if (!this.Canvasclick) {
             return false;
           }
           canvas.onmousemove = null;
           context.stroke();
         };
         // }
       },

  }
};
export default mixins
