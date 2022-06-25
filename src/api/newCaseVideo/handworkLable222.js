import { windowToCanvas, imgwh } from "../../page/videoCombat/canvas";
const mixins = {
  data: function () {
    return {
      checkShow:1, //人 骑车人 汽车的选项
      carshow:false,
      personshow:true,
      cpshow:false,
      PersonAge: '', //年龄段
      EthicCode: '', // 民族代码
      Gender: '', //  性别
      BagStyle: '', // 包款式
      BagColor: '', // 包颜色
      HandArticle: '', // 携物(指手上拿的東西)
      PantsStyle: '', // 下衣类型
      CulotteColor: '', // 下衣颜色
      HairStyle: '', // 发型
      HairColor: '', // 头发颜色
      posture: '', //体态
      ShoesStyle: '', //   鞋子款式
      ShoesColor: '', //  鞋子颜色
      CoatStyle: '', //  上衣款式
      Color: '', // 上衣颜色
      CoatTexture: '', //  上衣纹理
      PersonView: '', //  朝向

      BikeBag: '', //包款式
      BikeBagColor: '', //包颜色
      BikeColor: '', // 所骑车颜色
      BikeCarray: '', // 是否携物
      BikeCulotteStyle: '', // 下衣类型
      BikeCulotteColor: '', // 下衣颜色
      EyePart: '', // 眼部特征
      BikeHairStyle: '', // 发型
      MouthPart: '', // 嘴部特征
      ScarfPart: '', //  围脖
      BikeBody: '', //   体态
      BikeUmbrella: '', //   是否打伞
      BikeCoatStyle: '', //  上衣款式
      BikeCoatStyleColor: '', // 上衣颜色
      BikeCoatTexture: '', //  上衣纹理
      BikeTowards: '', //  朝向
      Driver: '', //  驾驶人数
      carPlateColor: '', //车牌颜色
      cartarget: '', //目标类型
      carColor: '', //车辆颜色
      carPlateNum: '', //车牌号码
      PlateClass: '', //车牌类型
      options: [ //目标类型：
        {value: '4',label: "大型车"},
        {value: "5",label: "小型车"},
        {value: "6",label: "卡车"},
        {value: "7",label: "拖拉机"},
        {value: "8",label: "中巴"}
      ],
      radioIndex:'', //切换的索引
      videoimg: '', //展示截图后的img的url
      deviceId:null, //截图文件的点位ID
      videoUrl:'', //视频播放的url
      disableTrue:true, //禁用确定按钮\
      one:'',
      two:'',
      three:'',
      four:'',  //四个坐标
      pedestrian:{},//识别的对象
      lableName:'标注名称',
      lableTime:'', //标注时间
      remark:'',  //备注
      checkRadio:0


    }
  },
  methods: {
    //切换样式
    radioChange(lable) {
      if(this.checkRadio == 1){
        this.$myconfirm({
          type: '提示',
          msg: '切换会清空信息，是否切换？',
          icon:4,
          btn: {
            ok: '确定',
            no: '取消'
          }
        }).then(()=>{
          this.checkRadio = 0
          this.radioIndex = lable
          this.lableTime = this.getCurrentDate();
          this.clearLable();
          if (lable == 1) {
            this.lableName = '嫌疑目标人'
            this.iscpshow = true
            this.personshow = true;
            this.carshow = this.cpshow = this.ismorshow = false;
            this.pedestrian.type_index = 0
          } else if (lable == 2) {
            this.lableName = '嫌疑骑车人'
            this.iscpshow = false
            this.cpshow = true;
            this.carshow = this.personshow = this.ismorshow = false;
            this.pedestrian.type_index = 1
          } else if (lable == 3) {
            this.lableName = '嫌疑目标车'
            this.iscpshow = true
            this.carshow = true;
            this.personshow = this.cpshow = this.ismorshow = false;
            this.pedestrian.type_index =4
          }
        }).catch(()=>{
          if(this.pedestrian.type_index == 0){
            this.checkShow = 1
          }else if(this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index == 3){
            this.checkShow = 2
          }else {
            this.checkShow = 3
          }
        })
      }else {
        this.radioIndex = lable
          this.lableTime = this.getCurrentDate();
          this.clearLable();
          if (lable == 1) {
            this.lableName = '嫌疑目标人'
            this.iscpshow = true
            this.personshow = true;
            this.carshow = this.cpshow = this.ismorshow = false;
            this.pedestrian.type_index = 0
          } else if (lable == 2) {
            this.lableName = '嫌疑骑车人'
            this.iscpshow = false
            this.cpshow = true;
            this.carshow = this.personshow = this.ismorshow = false;
            this.pedestrian.type_index = 1
          } else if (lable == 3) {
            this.lableName = '嫌疑目标车'
            this.iscpshow = true
            this.carshow = true;
            this.personshow = this.cpshow = this.ismorshow = false;
            this.pedestrian.type_index =4
          }
      }

    },
    //打开时间
    OpenTime() {
      this.lableTime = this.getCurrentDate();
      // let date = new Date();
      this.$nextTick(() => {
        laydate.render({
          elem: "#test1", //指定元素
          type: "datetime",
          format: "yyyy-MM-dd HH:mm:ss",
          max: 1,
          done(value, date, endDate) {}
        });
      });
    },
    //打开弹框后的回调
    openDialog(){
      this.OpenTime();//时间
      this.lableName = '嫌疑目标人'
      this.$nextTick(()=>{
        let timeID = setInterval(() => {
            let allUrl = window.window.imgurl
            if (allUrl == -1 || allUrl.length > 8) {
              this.deviceId = allUrl.split('?')[1].split('=')[1].length > 5 ? allUrl.split('?')[1].split('=')[1] : null;
              // this.videoimg = sessionStorage.getItem('imgurl')
              this.videoimg = window.window.imgurl
              let imgs = document.getElementById("VidoePlayImgUrl");
              let divs = document.getElementById("VideoPlayImgLeft");
              let _this = this;
              imgs.onload = function () {
                imgwh(imgs, divs);
                var canvas = document.getElementById("VideoPlayCanvas");
                canvas.setAttribute("width", this.clientWidth);
                canvas.setAttribute("height", this.clientHeight);
              };
              clearInterval(timeID)
              this.getcoord()
            }
        }, 300);
        let timeVideo = setInterval(()=>{

          if (this.$route.path == '/videoCombat/videoplay'){
            OngetUrl()
          } else if (this.$route.path == '/videoCombat/historyvideo'){
            OngetUrls()
          // }else if(this.$route.path == '/casestudy/caseInfomanage/addcasetwo'){
          }else if(this.$route.path == '/videoCombat/addcasetwo'){
            OngetUrl()
          }
          console.log(sessionStorage.getItem('Imgseek'),10000);
          if (sessionStorage.getItem('Imgseek').length > 20) {
            this.videoUrl = sessionStorage.getItem('Imgseek').slice(4);
            clearInterval(timeVideo)
          }
        },500)
      })

    },
    //开始标注
    getcoord() {
      var canvas = document.getElementById("VideoPlayCanvas");
      canvas.setAttribute("width", document.getElementById("VidoePlayImgUrl").clientWidth);
      canvas.setAttribute("height", document.getElementById("VidoePlayImgUrl").clientHeight);
      var context = canvas.getContext("2d");
      context.beginPath();
      context.lineWidth = 2;
      canvas.onmousedown = e => {
        this.disableTrue = true;
        let ele = windowToCanvas(canvas, e.clientX, e.clientY);
        context.clearRect(0, 0, canvas.width, canvas.height);
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
      canvas.onmouseup = e => {
        canvas.onmousemove = null;
        if(this.three - this.one < 10){
          return
        }
        context.stroke();
        this.handlable();
      };
    },

     //鼠标画框弹起后的事件 开始做手工标注并识别
    handlable() {
      if (this.one == "") {
        return;
      }
      if (this.$store.state.recognition) {
        var imgs = document.getElementById("VidoePlayImgUrl");
        var divs = document.getElementById("VideoPlayCanvas");
        var imgw = imgs.naturalWidth;
        var imgh = imgs.naturalHeight;
        var divw = divs.clientWidth;
        var divh = divs.clientHeight;
        let x = parseInt(imgw * this.one / divw);
        let y = parseInt(imgh * this.two / divh);
        let w = parseInt(imgw * (this.three - this.one) / divw);
        let h = parseInt(imgh * (this.four - this.two) / divh);
        let data = {
          imgUrl: this.videoimg,
          PosX: x,
          PosY: y,
          Width: w,
          Height: h,
          taskSource: 1
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/searchImg/img/recognition", data).then(res => {
          if (res.data.code == 200 && this.videoUrl.length > 5) {
            this.disableTrue = false
            this.checkRadio = 1
            if (res.data.data[0].type_index == 0) {
              this.lableName = '嫌疑目标人'
              this.checkShow = 1;
              this.pedestrian = res.data.data[0];
              this.personshow = true;
              this.carshow = this.cpshow = false;
              this.PersonAge = this.pedestrian.age_type; //年龄段
              this.EthicCode = this.pedestrian.nation_type; // 民族代码
              this.Gender = this.pedestrian.sex_type; //  性别
              this.BagStyle = this.pedestrian.bag_type; // 包款式
              this.BagColor = this.pedestrian.bagcolor_type; // 包颜色
              this.HandArticle = this.pedestrian.carrying_type; // 携物(指手上拿的東西)
              this.PantsStyle = this.pedestrian.down_type; // 下衣类型
              this.CulotteColor = this.pedestrian.downcolor_type; // 下衣颜色
              this.HairStyle = this.pedestrian.head_type; // 发型
              this.HairColor = this.pedestrian.headcolor_type; // 头发颜色
              this.posture = this.pedestrian.shape_type; //体态
              this.ShoesStyle = this.pedestrian.shoe_type; //   鞋子款式
              this.ShoesColor = this.pedestrian.shoecolor_type; //  鞋子颜色
              this.CoatStyle = this.pedestrian.up_type; //  上衣款式
              this.Color = this.pedestrian.upcolor_type; // 上衣颜色
              this.CoatTexture = this.pedestrian.uptext_type; //  上衣纹理
              this.PersonView = this.pedestrian.view_type; //  朝向
            }
            if (
              res.data.data[0].type_index == 1 ||
              res.data.data[0].type_index == 2 ||
              res.data.data[0].type_index == 3
            ) {
              this.checkShow = 2;
              this.lableName = '嫌疑骑车人'
              this.pedestrian = res.data.data[0];
              this.cpshow = true;
              this.carshow = this.personshow = false;
              this.cptarget = this.pedestrian.traceTypeName; //目标类型
              this.BikeBag = this.pedestrian.bag_type; //包款式
              this.BikeBagColor = this.pedestrian.bagcolor_type; //包颜色
              this.BikeColor = this.pedestrian.carcolor_type; // 所骑车颜色
              this.BikeCarray = this.pedestrian.carrying_type; // 是否携物
              this.BikeCulotteStyle = this.pedestrian.down_type; // 下衣类型
              this.BikeCulotteColor = this.pedestrian.downcolor_type; // 下衣颜色
              this.EyePart = this.pedestrian.eye_part; // 眼部特征
              this.BikeHairStyle = this.pedestrian.head_type; // 发型
              this.MouthPart = this.pedestrian.mouth_part; // 嘴部特征
              this.ScarfPart = this.pedestrian.scarf; //  围脖
              this.BikeBody = this.pedestrian.shape_type; //   体态
              this.BikeUmbrella = this.pedestrian.umbrella_flag; //   是否打伞
              this.BikeCoatStyle = this.pedestrian.up_type; //  上衣款式
              this.BikeCoatStyleColor = this.pedestrian.upcolor_type; // 上衣颜色
              this.BikeCoatTexture = this.pedestrian.uptext_type; //  上衣纹理
              this.BikeTowards = this.pedestrian.view_type; //  朝向
              this.Driver = this.pedestrian.driver_count; //  驾驶人数
              this.PersonAge = this.pedestrian.age_type; //  年龄段
              this.EthicCode = this.pedestrian.nation_type; // 民族代码
              this.Gender = this.pedestrian.sex_type; //  性别
            }
            if (
              res.data.data[0].type_index == 4 ||
              res.data.data[0].type_index == 5 ||
              res.data.data[0].type_index == 6 ||
              res.data.data[0].type_index == 7 ||
              res.data.data[0].type_index == 8
            ) {
              this.checkShow = 3;
              this.carshow = true;
              this.lableName = '嫌疑目标车'
              this.cpshow = this.personshow = false;
              this.pedestrian = res.data.data[0];
              this.carPlateColor = this.pedestrian.plate_color; //车牌颜色
              this.cartarget = this.pedestrian.traceTypeName; //目标类型
              this.carColor = this.pedestrian.vehicle_color_id; //车辆颜色
              this.carPlateNum = this.pedestrian.plate_number; //车牌号码
              this.PlateClass = this.pedestrian.plate_class;
            }
          }
          else{
            let video =  setInterval(() => {
              console.log(this.videoUrl,444);
              if (this.videoUrl.length > 5) {
                this.$notify({
                  type: 'warning',
                  message: '不满足智能标注要求,请重新框选或手工填写！',
                  position: 'bottom-right',
                  duration: 3000
                });
                this.lableName = '嫌疑目标人'
                this.disableTrue = false
                this.checkShow = 1;
                this.personshow = true;
                this.carshow = this.cpshow = false;
                this.pedestrian.type_index = 0
                console.dir(document.getElementById("VideoPlayCanvas"));
                console.dir(document.getElementById("VidoePlayImgUrl"));
                this.pedestrian.obj_left = this.one * document.getElementById("VidoePlayImgUrl").naturalWidth / document.getElementById("VideoPlayCanvas").clientWidth //  左上
                this.pedestrian.obj_top = this.two * document.getElementById("VidoePlayImgUrl").naturalHeight / document.getElementById("VideoPlayCanvas").clientHeight //  左下
                this.pedestrian.obj_right = this.three * document.getElementById("VidoePlayImgUrl").naturalWidth / document.getElementById("VideoPlayCanvas").clientWidth //  右上
                this.pedestrian.obj_bootom = this.four * document.getElementById("VidoePlayImgUrl").naturalHeight / document.getElementById("VideoPlayCanvas").clientHeight
                this.clearLable();
                clearInterval(video)
              }
            }, 200);
          }
        });
      } else {
        // if (this.videoUrl.length > 5){
        //   this.disableTrue = false
        // }
        let video = setInterval(() => {
          if (this.videoUrl.length > 5) {
            this.disableTrue = false
            this.pedestrian.type_index = 0;
            this.videoUrl = sessionStorage.getItem("Imgseek").slice(4);
            this.Canvasclick = false;
            this.checkShow = 1;
            this.personshow = true;
            this.carshow = this.cpshow = false;
            this.pedestrian.obj_left = this.one * document.getElementById("VidoePlayImgUrl").naturalWidth / document.getElementById("VideoPlayCanvas").clientWidth //  左上
            this.pedestrian.obj_top = this.two * document.getElementById("VidoePlayImgUrl").naturalHeight / document.getElementById("VideoPlayCanvas").clientHeight //  左下
            this.pedestrian.obj_right = this.three * document.getElementById("VidoePlayImgUrl").naturalWidth / document.getElementById("VideoPlayCanvas").clientWidth //  右上
            this.pedestrian.obj_bootom = this.four * document.getElementById("VidoePlayImgUrl").naturalHeight / document.getElementById("VideoPlayCanvas").clientHeight
            clearInterval(video)
          }
        }, 200);

      }
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
      let caseUuid = ''
      if(this.$route.path == '/videoCombat/addcasetwo'){
        caseUuid =  this.$route.query.caseUuid
      }else{
        caseUuid = ''
      }
      let data1 = {
        mark: {
          typeId: this.pedestrian.type_index,
          videoUrl: this.videoUrl,
          videoCaptureUrl: this.videoimg,
          deviceId: this.deviceId,
          caseUuid: caseUuid,
          createTime: document.getElementById("test1").value,
          markName: this.lableName,
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
          this.$notify({
            type: 'success',
            message: '标注成功！',
            position: 'bottom-right',
            duration: 3000
          });
          console.log(this.videoUrl,55558);
          // this.$message({
          //   message: '标注成功！',
          //   type: 'success'
          // });
          this.DialogVisible1 = false;
        }else{
           this.$notify({
             type: 'error',
             message: '标注失败！',
             position: 'bottom-right',
             duration: 3000
           });
        }
      })
      this.carshow = this.personshow = this.cpshow = false;
    },

    recogbad(){
      sessionStorage.setItem('imgurl', '')
      sessionStorage.setItem('Imgseek', '')
      this.videoimg = ''
      this.disableTrue = true;
      this.checkShow = 1 //让回到第一个
      this.personshow = true;
    },

    //清空标注
    clearLable(){
      this.remark = ''
      this.cpshow = this.carshow = false;
      this.PersonAge = this.BagStyle = this.BagColor = this.HandArticle = this.PantsStyle = this.CulotteColor = this.HairStyle = ''
      this.HairColor = this.EthicCode = this.Gender = this.posture = this.ShoesStyle = this.ShoesColor = this.CoatStyle = ''
      this.Color = this.CoatTexture = this.PersonView = this.PersonStatus = this.pose = this.Behavior = this.HabitualAction = ''
      this.PersonAge = this.BikeBag = this.BikeBagColor = this.BikeColor = this.BikeCarray = this.BikeCulotteStyle = this.BikeCulotteColor = ''
      this.Driver = this.EyePart = this.BikeHairStyle = this.MouthPart = this.EthicCode = this.ScarfPart = this.Gender = ''
      this.BikeBody = this.cptIndex = this.BikeUmbrella = this.BikeCoatStyle = this.BikeCoatStyleColor = this.BikeCoatTexture = this.BikeTowards = ''
      this.PlateClass = this.carPlateColor = this.carPlateNum = this.carColor = this.carryingType  = ''
      this.VehicleBehavior = this.FrontThing = this.RearThing = this.AutoFoilColor = this.cartarget = this.umbrellaFlag  = ''
    }

  }
};
export default mixins
