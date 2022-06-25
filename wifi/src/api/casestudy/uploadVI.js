import {
  imgwh,
  windowToCanvas
} from '../../page/videoCombat/canvas.js'
import Vue from "vue";

const mixins = {
  data: function () {
    return {
      allowCoord: false, //标注的点击
      one: 0,
      tow: 0,
      three: '',
      four: '',
      getImgUrl: '', //给后台的图片地址
      setImgUrl: '', //得到的图片地址
      carPlateColor: '', //车牌颜色
      cartarget: '', //目标类型
      carColor: '', //车辆颜色
      carPlateNum: '', //车牌号码
      PlateClass: '', //车牌类型
      VehicleBehavior: '', //可疑行为
      FrontThing: '', //车前部物品类型
      RearThing: '', //车后部物品类型
      AutoFoilColor: '', //车模颜色
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
      persontarget: '', //行人类型
      PersonStatus: '', //人的状态
      pose: '', //姿势
      Behavior: '', //行为
      HabitualAction: '', //习惯动作
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
      cptarget: '', //目标类型
      lableInfo: '', //详细标注信息
      lableIndex: null,
      isDiscernError: true,  //控制识别失败的按钮
      disableVideo:true,
      disableStart:false
    }
  },
  created() {},
  watch: {
    Driver(val) {
      if (val == '1人') {
        this.Driver = 1
      } else if (val == '2人') {
        this.Driver = 2
      } else if (val == '0人') {
        this.Driver = 0
      } else if (val == '更多') {
        this.Driver = 3
      }
    }
  },
  methods: {
    //获取当前日期时间
    getCurrentDate() {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes()
      let seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hours + seperator2 + minutes
        + seperator2 + seconds;
      return currentdate;
    },
    //关闭右键视频附件弹框
    closeFjDailog(){
      this.fjStartTime = '';
      this.videohour = "";
      this.videomin = '';
      this.isvideoOk = true;
      this.videoFiles = [];
      this.DialogVisible10 = false;
      this.$refs.upload.clearFiles();
    },
    // 保存视频
    videoKeep() {
      if (this.fjStartTime == '') {
        this.istimes = true;
        return
      }
      if (this.videoFiles.length == 0) {
        return
      }
      this.DialogVisible10 = false;
      // this.$store.state.showAllModel = false
      let arr = [];
      let videoLen;
      if (this.videohour == '') {
        this.videohour = 0;
        videoLen = this.videohour + '小时' + this.videomin + '分钟'
      }
      if (this.videomin == '') {
        this.videomin = 0;
        videoLen = this.videohour + '小时' + this.videomin + '分钟'
      }
      if (this.videohour == '' && this.videomin == '') {
        videoLen = ''
      }
      for (let i = 0; i < this.videoFiles.length; i++) {
        var index = this.videoFiles[i][1].lastIndexOf("\/");
        let title = this.videoFiles[i][1].substring(index + 1, this.videoFiles[i][1].length);
        let data = {
          originVideoUrl: this.videoFiles[i][1],
          caseUuid: this.$route.query.caseUuid,
          videoLen: videoLen,
          deviceUuid: this.deviceUuid,
          beginTime: this.fjStartTime,
          title: title
        };
        arr.push(data)
      }
      let formData = new FormData();
      formData.append('datas', JSON.stringify(arr));
      this.$http.post('pca/casemng/clue/video/save', formData).then(res => {
        if (res.data.code == 200) {
          // this.videoList();
          this.getSuspicionMessage('clear')
           this.$notify({
             type: 'success',
             message: '添加成功！',
             position: 'bottom-right',
             duration: 3000
           });
          // layer.alert('添加成功！', {icon: 6, title: "消息提示"});
        } else {
            this.$notify({
              type: 'error',
              message: '添加失败！',
              position: 'bottom-right',
              duration: 3000
            });
          // layer.alert('添加失败！', {icon: 5, title: "消息提示"});
        }
      })
    },
    videoCancle() {
      this.DialogVisible10 = false;
    },

    deleteUpload(file, filelist) {
      // for (let i = 0; i < this.videoFiles.length; i++) {
      //   if (file.uid == this.videoFiles[i][0]) {
      //     this.videoFiles.splice(i, 1);
      //     this.isvideoOk = !this.videoFiles.length;
      //   }
      // }
      this.videoFiles = [];
      let flag = true;
      for(let i=0;i<filelist.length;i++){
        if(filelist[i].response){
          this.videoFiles.push([filelist[i].uid, filelist[i].response.data[0]]);
        }else{
          flag = false;
        }
      }
      this.isvideoOk = !flag;
    },
    beforeSuccess(res,file,filelist){
      this.videoFiles = [];
      let flag = true;
      for(let i=0;i<filelist.length;i++){
        if(filelist[i].response){
          this.videoFiles.push([filelist[i].uid, filelist[i].response.data[0]]);
        }else{
          flag = false;
        }
      }
      this.isvideoOk = !flag;
    },
    beforeAvatarUploadVideo(file) {
      let isLt2M = file.size / 1024 / 1024 < 500;
      if(!isLt2M){
        this.$notify({
          type: 'error',
          message: '请上传单个小于500M的视频文件！',
          position: 'bottom-right',
          duration: 3000
        });
        // layer.alert('请上传单个小于500M的视频文件！',{icon:7,title:"消息提示"});
      }
      // if (isLt2M){
      //   layer.alert('上传文件大小不能超过 500M', {
      //     icon: 5,
      //     title: "消息提示"
      //   });
      //   return
      // }
      var arr = ["box", "xlsx", "txt", "ppt", "doc", "docx", "dll", "xml", "xls", "html", "htm", "rar", "7z",
        "zip", "cpp", "h", "hpp", "pdf", "caj", "chm", "rtf", "ini", "bmp", "jpg", "jpeg", "gif", "png", "tif", "tiff", "mp3",
        "crx", "pem", "jar", "aspx", "asp", "lrc", "db", "iso", "apk", "bix", "ico", "icns", "smi", "srt", "idx", "sub", "sup",
        "psb", "ssa", "ass", "usf", "xss", "ssf", "rt", "sql", "bat", "psd"
      ];
      let isType = true;
      for (let i = 0; i < arr.length; i++) {
        var index = file.name.lastIndexOf(".");
        var type = file.name.substring(index + 1, file.name.length);
        if (type == arr[i]) {
          isType = false;
          this.$notify({
            type: 'warning',
            message: '请上传视频格式！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('请上传视频格式！', {
          //   icon: 7,
          //   title: "消息提示"
          // });
          break;
        }
      }
      this.isvideoOk = true;
      return isLt2M && isType;
      // let formData = new FormData();
      // formData.append('files', file);
      // this.isvideoOk = true;
      // this.$http({
      //   url: '/sms/uploadFile/hdfs/upload',
      //   method: 'post',
      //   data: formData
      // }).then(res => {
      //   if (res.data.code == 200) {
      //     this.isvideoOk = false;
      //     let arr = [];
      //     arr.push(file.uid, res.data.data[0]);
      //     this.videoFiles.push(arr);
      //     $(".el-upload-list").find("li").eq(this.videoFiles.length -1).find('label').addClass("on");
      //   }
      // });
    },
    //点击图片标注
    getlable(e, index) {
      this.setImgUrl = this.imglist[index].file;
      this.index = index
      this.bigimg = null
      var putimg = document.getElementById('putImg')
      var imgstwo = document.getElementById('imgstwo')
      var canvas = document.getElementById('canvas')
      let imgw = e.target.naturalWidth;
      let imgh = e.target.naturalHeight;
      let retw = putimg.clientWidth;
      let reth = putimg.clientHeight;
      if (retw / reth < imgw / imgh) {
        imgstwo.style.width = "100%";
        imgstwo.style.height = "auto"
      } else {
        imgstwo.style.height = "100%";
        imgstwo.style.width = "auto"
      }
      this.bigimg = e.target.src
      console.dir(imgstwo, 6666);
      setTimeout(() => {
        this.getCanvasWh();
        // canvas.setAttribute('width', imgstwo.clientWidth)
        // canvas.setAttribute('height', imgstwo.clientHeight)
      }, 100);
      this.isdelete = true;

    },
    getCanvasWh(){
       var canvas = document.getElementById("canvas");
       canvas.setAttribute("width", document.getElementById("imgstwo").clientWidth);
       canvas.setAttribute("height", document.getElementById("imgstwo").clientHeight);
    },


    //开始标注
    Startagg() {
      if (!this.$store.state.recognition){
        this.disabled1 = this.disabled2 = this.disabled3 = false
        this.person = 1
        this.radioIndex = 1
        this.psersonshow = true;
        this.cpshow = this.carshow = false
        this.lableName = '标注名称' + (this.lableList.length + 1)
      }

      this.lableIndex = null
      this.disableVideo = false
      this.getCanvasWh();
      this.one = 0
      this.allowCoord = true;
      let formData = new FormData();
      formData.append('files', this.setImgUrl);
      this.$http({
        url: '/sms/uploadFile/upload',
        method: 'post',
        data: formData
      }).then(res => {
        if (res.data.code == 200) {
          this.getImgUrl = res.data.data[0]
        }else{
          this.$notify({
            type: 'error',
            message: '服务异常',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      context.beginPath();
      context.lineWidth = 2;
      canvas.onmousedown = (e) => {
        if (!this.allowCoord) {
          return false;
        }
        let ele = windowToCanvas(canvas, e.clientX, e.clientY);
        this.one = ele.x;
        this.two = ele.y;
        canvas.onmousemove = (e) => { //鼠标移动的时候
          let ele = windowToCanvas(canvas, e.clientX, e.clientY);
          context.clearRect(0, 0, canvas.width, canvas.height)
          this.three = ele.x;
          this.four = ele.y;
          context.strokeStyle = "red";
          context.strokeRect(
            this.one,
            this.two,
            this.three - this.one,
            this.four - this.two
          );
        }
      };
      document.body.onmouseup = (e) => {
        if (!this.allowCoord) {
          return false;
        }
        canvas.onmousemove = null;
        context.stroke();
      };
    },

    //确认标注
    handlable() {
      if (this.$store.state.recognition) {
         this.disableVideo = true
         this.disableStart = true
        this.carshow = this.cpshow = this.psersonshow = false
        if (this.isDiscernError) {
          this.ismorshow = false;
          this.allowCoord = false;
          if (this.one == 0) {
            this.$notify({
              type: 'warning',
              message: '请框选目标',
              position: 'bottom-right',
              duration: 3000
            });
            return
          }
          var imgs = document.getElementById('imgstwo')
          var divs = document.getElementById('canvas')
          var imgw = imgs.naturalWidth
          var imgh = imgs.naturalHeight
          var divw = divs.clientWidth;
          var divh = divs.clientHeight;
          let x = parseInt(imgw * this.one / divw);
          let y = parseInt(imgh * this.two / divh);
          let w = parseInt(imgw * (this.three - this.one) / divw);
          let h = parseInt(imgh * (this.four - this.two) / divh);
          let formData = new FormData();
          // formData.append('image', this.imglist[this.index].file)
          formData.append('imgUrl', this.getImgUrl)
          formData.append('taskSource', 1)
          formData.append('PosX', x)
          formData.append('PosY', y)
          formData.append('Width', w)
          formData.append('Height', h)
          this.$http({
            url: 'vsas/searchImg/img/recognition',
            method: 'post',
            data: formData
          }).then(res => {
            if (res.data.code == 200) {
              this.disableStart = false
              this.lableName = '标注目标' + (this.lableList.length + 1)
              if (res.data.data[0].type_index === 0) {
                this.pedestrian = res.data.data[0]
                this.person = 1
                this.iscpshow = true
                this.disabled2 = this.disabled3 = this.psersonshow = true;
                this.cpshow = this.carshow = this.disabled1 = false;
                this.persontarget = this.pedestrian.traceTypeName //行人类型
                this.PersonAge = this.pedestrian.age_type //年龄段
                this.EthicCode = this.pedestrian.nation_type // 民族代码
                this.Gender = this.pedestrian.sex_type //  性别
                this.BagStyle = this.pedestrian.bag_type // 包款式
                this.BagColor = this.pedestrian.bagcolor_type // 包颜色
                this.HandArticle = this.pedestrian.carrying_type // 携物(指手上拿的東西)
                this.PantsStyle = this.pedestrian.down_type // 下衣类型
                this.CulotteColor = this.pedestrian.downcolor_type // 下衣颜色
                this.HairStyle = this.pedestrian.head_type // 发型
                this.HairColor = this.pedestrian.headcolor_type // 头发颜色
                this.posture = this.pedestrian.shape_type //体态
                this.ShoesStyle = this.pedestrian.shoe_type //   鞋子款式
                this.ShoesColor = this.pedestrian.shoecolor_type //  鞋子颜色
                this.CoatStyle = this.pedestrian.up_type //  上衣款式
                this.Color = this.pedestrian.upcolor_type // 上衣颜色
                this.CoatTexture = this.pedestrian.uptext_type //  上衣纹理
                this.PersonView = this.pedestrian.view_type //  朝向
                this.pedestrian.markName = this.lableName
                this.pedestrian.createTimeStr = this.lableTime
              }
              if (res.data.data[0].type_index === 1 || res.data.data[0].type_index === 2 || res.data.data[0].type_index === 3) {
                this.pedestrian = res.data.data[0]
                this.iscpshow = false
                this.cpshow = this.disabled1 = this.disabled3 = true
                this.person = 2
                this.carshow = this.psersonshow = this.disabled2 = false
                this.cptarget = this.pedestrian.traceTypeName //目标类型
                this.BikeBag = this.pedestrian.bag_type //包款式
                this.BikeBagColor = this.pedestrian.bagcolor_type //包颜色
                this.BikeColor = this.pedestrian.carcolor_type // 所骑车颜色
                this.BikeCarray = this.pedestrian.carrying_type // 是否携物
                this.BikeCulotteStyle = this.pedestrian.down_type // 下衣类型
                this.BikeCulotteColor = this.pedestrian.downcolor_type // 下衣颜色
                this.EyePart = this.pedestrian.eye_part // 眼部特征
                this.BikeHairStyle = this.pedestrian.head_type // 发型
                this.MouthPart = this.pedestrian.mouth_part // 嘴部特征
                this.ScarfPart = this.pedestrian.scarf //  围脖
                this.BikeBody = this.pedestrian.shape_type //   体态
                this.BikeUmbrella = this.pedestrian.umbrella_flag //   是否打伞
                this.BikeCoatStyle = this.pedestrian.up_type //  上衣款式
                this.BikeCoatStyleColor = this.pedestrian.upcolor_type // 上衣颜色
                this.BikeCoatTexture = this.pedestrian.uptext_type //  上衣纹理
                this.BikeTowards = this.pedestrian.view_type //  朝向
                this.Driver = this.pedestrian.driver_count //  驾驶人数
                this.PersonAge = this.pedestrian.age_type //  年龄段
                this.EthicCode = this.pedestrian.nation_type // 民族代码
                this.Gender = this.pedestrian.sex_type //  性别
                this.pedestrian.markName = this.lableName
                this.pedestrian.createTimeStr = this.lableTime
              }
              if (res.data.data[0].type_index === 4 || res.data.data[0].type_index === 5 || res.data.data[0].type_index === 6 ||
                res.data.data[0].type_index === 7 || res.data.data[0].type_index === 8) {
                this.person = 3
                this.iscpshow = true
                this.disabled2 = this.disabled1 = this.carshow = true;
                this.cpshow = this.psersonshow = this.disabled3 = false;
                this.pedestrian = res.data.data[0]
                this.carPlateColor = this.pedestrian.plate_color //车牌颜色
                this.cartarget = this.pedestrian.traceTypeName //目标类型
                this.carColor = this.pedestrian.vehicle_color_id //车辆颜色
                this.carPlateNum = this.pedestrian.plate_number //车牌号码
                this.PlateClass = this.pedestrian.plate_class //plate_class  //车牌类型
                this.pedestrian.markName = this.lableName
                this.pedestrian.createTimeStr = this.lableTime
              }
              let arr = []
              arr.push(this.pedestrian, this.bigimg, '标注信息', this.one, this.two, (this.three - this.one), (this.four - this.two), this.getImgUrl)
              this.lableList.push(arr)
              this.one = 0;
              if (this.lableList.length > 0) {
                this.showUpload = false
              }
              this.showInfo(arr, this.lableList.length - 1)
            } else {
              console.dir(document.getElementById('imgstwo'));
              console.dir(document.getElementById('canvas'));
              this.lableName = '标注目标' + (this.lableList.length + 1)
              this.disableStart = false;
              this.disableVideo = false;
              this.isDiscernError = false; //控制识别失败的结果
              this.pedestrian = '';
              this.person = 1;
              this.psersonshow = true;
              this.radioIndex = 1;
              this.disabled1 = this.disabled3 = this.disabled2 = false
              this.PersonAge = this.BagStyle = this.BagColor = this.HandArticle = this.PantsStyle = this.CulotteColor = this.HairStyle = ''
              this.HairColor = this.EthicCode = this.Gender = this.posture = this.ShoesStyle = this.ShoesColor = this.CoatStyle = ''
              this.Color = this.CoatTexture = this.PersonView = this.PersonStatus = this.pose = this.Behavior = this.HabitualAction = ''
            }
          })
        } else {
          if (this.one == 0) {
            this.$notify({
              type: 'warning',
              message: '请框选目标',
              position: 'bottom-right',
              duration: 3000
            });
            return
          }
          let arr = []
          let obj = {}
          if (this.radioIndex == 1) {
            obj.type_index = '0'
            obj.markName = this.lableName
            obj.traceTypeName = this.persontarget //行人类型
            obj.age_type = this.PersonAge //年龄段
            obj.nation_type = this.EthicCode // 民族代码
            obj.sex_type = this.Gender //  性别
            obj.bag_type = this.BagStyle // 包款式
            obj.bagcolor_type = this.BagColor // 包颜色
            obj.carrying_type = this.HandArticle // 携物(指手上拿的東西)
            obj.down_type = this.PantsStyle // 下衣类型
            obj.downcolor_type = this.CulotteColor // 下衣颜色
            obj.head_type = this.HairStyle // 发型
            obj.headcolor_type = this.HairColor // 头发颜色
            obj.shape_type = this.posture //体态
            obj.shoe_type = this.ShoesStyle //   鞋子款式
            obj.shoecolor_type = this.ShoesColor //  鞋子颜色
            obj.up_type = this.CoatStyle //  上衣款式
            obj.upcolor_type = this.Color // 上衣颜色
            obj.uptext_type = this.CoatTexture //  上衣纹理
            obj.view_type = this.PersonView //  朝向
            obj.status = this.PersonStatus //人的状态
            obj.gesture = this.pose //姿势
            obj.behavior = this.Behavior //行为
            obj.habitualMovement = this.HabitualAction //习惯动作
            obj.traceImgUrl = this.getImgUrl
            obj.obj_left = this.one * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  左上
            obj.obj_top = this.two * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  左下
            obj.obj_right = this.three * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  右上
            obj.obj_bootom = this.four * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  右下
            this.isDiscernError = true;
          } else if (this.radioIndex == 2) {
            obj.type_index = '1'
            obj.markName = this.lableName
            obj.traceTypeName = this.cptarget //目标类型
            obj.bag_type = this.BikeBag //包款式
            obj.bagcolor_type = this.BikeBagColor //包颜色
            obj.carcolor_type = this.BikeColor // 所骑车颜色
            obj.carrying_type = this.BikeCarray // 是否携物
            obj.down_type = this.BikeCulotteStyle // 下衣类型
            obj.downcolor_type = this.BikeCulotteColor // 下衣颜色
            obj.eye_part = this.EyePart // 眼部特征
            obj.head_type = this.BikeHairStyle // 发型
            obj.mouth_part = this.MouthPart // 嘴部特征
            obj.scarf = this.ScarfPart //  围脖
            obj.shape_type = this.BikeBody //   体态
            obj.umbrella_flag = this.BikeUmbrella //   是否打伞
            obj.up_type = this.BikeCoatStyle //  上衣款式
            obj.upcolor_type = this.BikeCoatStyleColor // 上衣颜色
            obj.uptext_type = this.BikeCoatTexture //  上衣纹理
            obj.view_type = this.BikeTowards //  朝向
            obj.driver_count = this.Driver //  驾驶人数
            obj.age_type = this.PersonAge //  年龄段
            obj.nation_type = this.EthicCode // 民族代码
            obj.traceImgUrl = this.getImgUrl
            obj.sex_type = this.Gender //  性别
            obj.obj_left = this.one * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  左上
            obj.obj_top = this.two * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  左下
            obj.obj_right = this.three * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  右上
            obj.obj_bootom = this.four * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  右下
          } else if (this.radioIndex == 3) {
            obj.type_index = '4'
            obj.vehicle_id = ''
            obj.markName = this.lableName
            obj.plate_color = this.carPlateColor //车牌颜色
            obj.traceTypeName = this.cartarget //目标类型
            obj.vehicle_color_id = this.carColor //车辆颜色
            obj.plate_number = this.carPlateNum //车牌号码
            obj.plate_class = this.PlateClass //plate_class  //车牌类型
            obj.behavior = this.VehicleBehavior //可疑行为
            obj.vehicleFrontItem = this.FrontThing //车前部物品类型
            obj.traceImgUrl = this.getImgUrl
            obj.vehicleRearItem = this.RearThing //车后部物品类型
            obj.filmColor = this.AutoFoilColor //车模颜色
            obj.obj_left = this.one * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  左上
            obj.obj_top = this.two * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  左下
            obj.obj_right = this.three * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  右上
            obj.obj_bootom = this.four * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  右下
          }
          arr.push(obj, this.bigimg, '标注信息', this.one, this.two, (this.three - this.one), (this.four - this.two), this.getImgUrl)
          this.lableList.push(arr)
          this.isDiscernError = true;
          this.one = 0;
          this.clearcoord();
          if (this.lableList.length > 0) {
            this.showUpload = false
          }
          // this.showInfo(arr, this.lableList.length - 1)
          this.disableVideo = true
        }

      }
      else{
        this.disabled1 = this.disabled2 = this.disabled3 = false
        if (this.one == 0) {
          this.$notify({
            type: 'warning',
            message: '请框选目标',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert('请框选目标', {
          //   icon: 5,
          //   title: "消息提示"
          // });
          return
        }
        let arr = []
        let obj = {}
        if (this.radioIndex == 1) {
          obj.type_index = '0'
          obj.markName = this.lableName
          obj.createTimeStr = document.getElementById('test2').value
          obj.traceTypeName = this.persontarget //行人类型
          obj.age_type = this.PersonAge //年龄段
          obj.nation_type = this.EthicCode // 民族代码
          obj.sex_type = this.Gender //  性别
          obj.bag_type = this.BagStyle // 包款式
          obj.bagcolor_type = this.BagColor // 包颜色
          obj.carrying_type = this.HandArticle // 携物(指手上拿的東西)
          obj.down_type = this.PantsStyle // 下衣类型
          obj.downcolor_type = this.CulotteColor // 下衣颜色
          obj.head_type = this.HairStyle // 发型
          obj.headcolor_type = this.HairColor // 头发颜色
          obj.shape_type = this.posture //体态
          obj.shoe_type = this.ShoesStyle //   鞋子款式
          obj.shoecolor_type = this.ShoesColor //  鞋子颜色
          obj.up_type = this.CoatStyle //  上衣款式
          obj.upcolor_type = this.Color // 上衣颜色
          obj.uptext_type = this.CoatTexture //  上衣纹理
          obj.view_type = this.PersonView //  朝向
          obj.status = this.PersonStatus //人的状态
          obj.gesture = this.pose //姿势
          obj.behavior = this.Behavior //行为
          obj.habitualMovement = this.HabitualAction //习惯动作
          obj.traceImgUrl = this.getImgUrl
          obj.obj_left = this.one * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  左上
          obj.obj_top = this.two * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  左下
          obj.obj_right = this.three * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  右上
          obj.obj_bootom = this.four * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  右下
        } else if (this.radioIndex == 2) {
          obj.type_index = '1'
          obj.markName = this.lableName
          obj.createTimeStr = document.getElementById('test3').value
          obj.traceTypeName = this.cptarget //目标类型
          obj.bag_type = this.BikeBag //包款式
          obj.bagcolor_type = this.BikeBagColor //包颜色
          obj.carcolor_type = this.BikeColor // 所骑车颜色
          obj.carrying_type = this.BikeCarray // 是否携物
          obj.down_type = this.BikeCulotteStyle // 下衣类型
          obj.downcolor_type = this.BikeCulotteColor // 下衣颜色
          obj.eye_part = this.EyePart // 眼部特征
          obj.head_type = this.BikeHairStyle // 发型
          obj.mouth_part = this.MouthPart // 嘴部特征
          obj.scarf = this.ScarfPart //  围脖
          obj.shape_type = this.BikeBody //   体态
          obj.umbrella_flag = this.BikeUmbrella //   是否打伞
          obj.up_type = this.BikeCoatStyle //  上衣款式
          obj.upcolor_type = this.BikeCoatStyleColor // 上衣颜色
          obj.uptext_type = this.BikeCoatTexture //  上衣纹理
          obj.view_type = this.BikeTowards //  朝向
          obj.driver_count = this.Driver //  驾驶人数
          obj.age_type = this.PersonAge //  年龄段
          obj.nation_type = this.EthicCode // 民族代码
          obj.traceImgUrl = this.getImgUrl
          obj.sex_type = this.Gender //  性别
          obj.obj_left = this.one * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  左上
          obj.obj_top = this.two * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  左下
          obj.obj_right = this.three * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  右上
          obj.obj_bootom = this.four * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  右下
        } else if (this.radioIndex == 3) {
          obj.type_index = '4'
          obj.vehicle_id = ''
          obj.markName = this.lableName
          obj.createTimeStr = document.getElementById('test1').value
          obj.plate_color = this.carPlateColor //车牌颜色
          obj.traceTypeName = this.cartarget //目标类型
          obj.vehicle_color_id = this.carColor //车辆颜色
          obj.plate_number = this.carPlateNum //车牌号码
          obj.plate_class = this.PlateClass //plate_class  //车牌类型
          obj.behavior = this.VehicleBehavior //可疑行为
          obj.vehicleFrontItem = this.FrontThing //车前部物品类型
          obj.traceImgUrl = this.getImgUrl
          obj.vehicleRearItem = this.RearThing //车后部物品类型
          obj.filmColor = this.AutoFoilColor //车模颜色
          obj.obj_left = this.one * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  左上
          obj.obj_top = this.two * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  左下
          obj.obj_right = this.three * document.getElementById("imgstwo").naturalWidth / document.getElementById("canvas").clientWidth //  右上
          obj.obj_bootom = this.four * document.getElementById("imgstwo").naturalHeight / document.getElementById("canvas").clientHeight //  右下
        }
        arr.push(obj, this.bigimg, '标注信息', this.one, this.two, (this.three - this.one), (this.four - this.two), this.getImgUrl)
        this.lableList.push(arr)
        this.isDiscernError = true;
        this.one = 0;
        this.clearcoord();
        if (this.lableList.length > 0) {
          this.showUpload = false
        }
        this.disableVideo = true
      }


    },
    //上传成功
    UploadImg() {
      if (this.lableList.length == 0 || this.imglist.length == 0) {
        this.$notify({
          type: 'warning',
          message: '请点击"3.确认标注"',
          position: 'bottom-right',
          duration: 3000
        });
        // layer.alert('请点击"3.确认标注"', {
        //   icon: 5,
        //   title: "消息提示"
        // });
        return
      }
      let PersonArr = []
      let cpArr = []
      let carArr = []
      for (let i = 0; i < this.lableList.length; i++) {
        var AllObj = {}
        AllObj.caseUuid = this.$route.query.caseUuid
        AllObj.deviceId = this.deviceUuid
        if (this.lableList[i][0].type_index == 0) {//人
          AllObj.markName = this.lableList[i][0].markName
          AllObj.createTimeStr = this.lableList[i][0].createTimeStr
          AllObj.ageType = this.lableList[i][0].age_type //年龄段
          AllObj.bagStyle = this.lableList[i][0].bag_type // 包款式
          AllObj.bagColor = this.lableList[i][0].bagcolor_type // 包颜色
          AllObj.appendant = this.lableList[i][0].carrying_type // 携物(指手上拿的東西) //附属物
          AllObj.trousersStyle = this.lableList[i][0].down_type // 下衣类型
          AllObj.trousersColor = this.lableList[i][0].downcolor_type // 下衣颜色
          AllObj.hairStyle = this.lableList[i][0].head_type // 发型
          AllObj.hairColor = this.lableList[i][0].headcolor_type // 头发颜色
          AllObj.ethicCode = this.lableList[i][0].nation_type // 民族代码
          AllObj.genderCode = this.lableList[i][0].sex_type //  性别
          AllObj.bodyType = this.lableList[i][0].shape_type //体态
          AllObj.shoesStyle = this.lableList[i][0].shoe_type //   鞋子款式
          AllObj.shoesColor = this.lableList[i][0].shoecolor_type //  鞋子颜色
          AllObj.typeIndex = this.lableList[i][0].type_index
          AllObj.coatStyle = this.lableList[i][0].up_type //  上衣款式
          AllObj.coatColor = this.lableList[i][0].upcolor_type // 上衣颜色
          AllObj.coatTexture = this.lableList[i][0].uptext_type //  上衣纹理
          AllObj.viewType = this.lableList[i][0].view_type //  朝向
          AllObj.leftTopX = this.lableList[i][0].obj_left //  左上
          AllObj.leftTopY = this.lableList[i][0].obj_top //  左下
          AllObj.rightBtmX = this.lableList[i][0].obj_right //  右上
          AllObj.rightBtmY = this.lableList[i][0].obj_bootom //  右下
          AllObj.status = this.lableList[i][0].status == undefined ? '' : this.lableList[i][0].status //人的状态
          AllObj.gesture = this.lableList[i][0].gesture == undefined ? '' : this.lableList[i][0].gesture //姿势
          AllObj.behavior = this.lableList[i][0].behavior == undefined ? '' : this.lableList[i][0].behavior //行为
          AllObj.habitualMovement = this.lableList[i][0].habitualMovement == undefined ? '' : this.lableList[i][0].habitualMovement //习惯动作
          AllObj.traceImgUrl = this.lableList[i][7]
          PersonArr.push(AllObj)
        } else if (this.lableList[i][0].type_index == 1 || this.lableList[i][0].type_index == 2 || this.lableList[i][0].type_index == 3) {
          AllObj.markName = this.lableList[i][0].markName
          AllObj.createTimeStr = this.lableList[i][0].createTimeStr
          AllObj.ageType = this.lableList[i][0].age_type //年龄段
          AllObj.bagStyle = this.lableList[i][0].bag_type //包款式
          AllObj.bagColor = this.lableList[i][0].bagcolor_type //包颜色
          AllObj.plateColor = this.lableList[i][0].carcolor_type // 所骑车颜色
          AllObj.carryingType = this.lableList[i][0].carrying_type == '没' ? 0 : 1 // 是否携物
          AllObj.trousersStyle = this.lableList[i][0].down_type // 下衣类型
          AllObj.trousersColor = this.lableList[i][0].downcolor_type // 下衣颜色
          AllObj.driverCount = this.Driver //  驾驶人数
          AllObj.eyePart = this.lableList[i][0].eye_part // 眼部特征
          AllObj.hairStyle = this.lableList[i][0].head_type // 发型
          AllObj.mouthPart = this.lableList[i][0].mouth_part // 嘴部特征
          AllObj.ethicCode = this.lableList[i][0].nation_type // 民族代码
          AllObj.scarf = this.lableList[i][0].scarf //围脖
          AllObj.genderCode = this.lableList[i][0].sex_type //  性别
          AllObj.bodyType = this.lableList[i][0].shape_type //   体态
          AllObj.typeIndex = this.lableList[i][0].type_index //目标编号
          AllObj.umbrellaFlag = this.lableList[i][0].umbrella_flag == '没' ? 0 : 1 //   是否打伞
          AllObj.coatStyle = this.lableList[i][0].up_type //  上衣款式
          AllObj.coatColor = this.lableList[i][0].upcolor_type // 上衣颜色
          AllObj.coatTexture = this.lableList[i][0].uptext_type //  上衣纹理
          AllObj.viewType = this.lableList[i][0].view_type //  朝向
          AllObj.leftTopX = this.lableList[i][0].obj_left //  左上
          AllObj.leftTopY = this.lableList[i][0].obj_top //  左下
          AllObj.rightBtmX = this.lableList[i][0].obj_right //  右上
          AllObj.rightBtmY = this.lableList[i][0].obj_bootom //  右下
          AllObj.traceImgUrl = this.lableList[i][7] //图片的URL
          cpArr.push(AllObj)
        } else if (this.lableList[i][0].type_index == 4 || this.lableList[i][0].type_index == 5 || this.lableList[i][0].type_index == 6 ||
          this.lableList[i][0].type_index == 7 || this.lableList[i][0].type_index == 8) { //汽车
          AllObj.markName = this.lableList[i][0].markName
          AllObj.createTimeStr = this.lableList[i][0].createTimeStr
          AllObj.plateClass = this.lableList[i][0].plate_class //车牌类型
          AllObj.plateColor = this.lableList[i][0].plate_color; //车牌颜色
          AllObj.plateNo = this.lableList[i][0].plate_number; //车辆号牌
          AllObj.vehicleColor = this.lableList[i][0].vehicle_color_id; //车辆颜色
          AllObj.vehicleUuid = this.lableList[i][0].vehicle_id; //车辆ID
          AllObj.typeIndex = this.lableList[i][0].type_index; //车辆类型
          AllObj.leftTopX = this.lableList[i][0].obj_left //  左上
          AllObj.leftTopY = this.lableList[i][0].obj_top //  左下
          AllObj.rightBtmX = this.lableList[i][0].obj_right //  右上
          AllObj.rightBtmY = this.lableList[i][0].obj_bootom //  右下
          AllObj.traceImgUrl = this.lableList[i][7]
          AllObj.behavior = this.lableList[i][0].behavior == undefined ? '' : this.lableList[i][0].behavior //可疑行为
          AllObj.vehicleFrontItem = this.lableList[i][0].vehicleFrontItem == undefined ? '' : this.lableList[i][0].vehicleFrontItem //车前部物品类型
          AllObj.vehicleRearItem = this.lableList[i][0].vehicleRearItem == undefined ? '' : this.lableList[i][0].vehicleRearItem //车后部物品类型
          AllObj.filmColor = this.lableList[i][0].film_color == undefined ? '' : this.lableList[i][0].film_color //车模颜色
          carArr.push(AllObj)
        }
      }
      let data = {
        person: JSON.stringify(PersonArr),
        bicycle: JSON.stringify(cpArr),
        vehicle: JSON.stringify(carArr),
      }
      data = JSON.stringify(data)
      let data1 = {
        datas: data
      }
      data1 = this.$qs.stringify(data1)
      this.$http.post('pca/casemng/clue/image/save', data1).then(res => {
        if (res.data.code == 200) {
          this.dialogVisible = false
          this.imglist = []
          this.lableList = []
          this.bigimg = null
          this.isdelete = false;
          this.$emit("childByimg", this.dialogVisible,true);
          this.$notify({
            type: 'success',
            message: '添加成功',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    //修改标注信息
    savelable() {
      if (this.lableIndex == null) {
        return
      }
      var item = this.lableList[this.lableIndex].shift()
      if (item.type_index == 0) {
        item.age_type = this.PersonAge //年龄段
        item.bag_type = this.BagStyle // 包款式
        item.bagcolor_type = this.BagColor // 包颜色
        item.carrying_type = this.HandArticle // 携物(指手上拿的東西) //附属物
        item.down_type = this.PantsStyle // 下衣类型
        item.downcolor_type = this.CulotteColor // 下衣颜色
        item.head_type = this.HairStyle // 发型
        item.headcolor_type = this.HairColor // 头发颜色
        item.nation_type = this.EthicCode // 民族代码
        item.sex_type = this.Gender //  性别
        item.shape_type = this.posture //体态
        item.shoe_type = this.ShoesStyle //   鞋子款式
        item.shoecolor_type = this.ShoesColor //  鞋子颜色
        item.type_index = item.type_index //目标标号
        item.up_type = this.CoatStyle //  上衣款式
        item.upcolor_type = this.Color // 上衣颜色
        item.uptext_type = this.CoatTexture //  上衣纹理
        item.view_type = this.PersonView //  朝向
        item.obj_bootom = item.obj_bootom //  左上
        item.obj_left = item.obj_left // 左下
        item.obj_right = item.obj_right //  右上
        item.obj_top = item.obj_top //  右下
        item.status = this.PersonStatus //人的状态
        item.gesture = this.pose //姿势
        item.behavior = this.Behavior //行为
        item.habitualMovement = this.HabitualAction //习惯动作
        item.traceImgUrl = item.traceImgUrl
        item.markName = this.lableName
        this.lableList[this.lableIndex].unshift(item)
      } else if (item.type_index == 1 || item.type_index == 2 || item.type_index == 3) {
        item.age_type = this.PersonAge //年龄段
        item.bag_type = this.BikeBag //包款式
        item.bagcolor_type = this.BikeBagColor //包颜色
        item.carcolor_type = this.BikeColor // 所骑车颜色
        item.carrying_type = this.BikeCarray // 是否携物
        item.down_type = this.BikeCulotteStyle // 下衣类型
        item.downcolor_type = this.BikeCulotteColor // 下衣颜色
        item.driver_count = this.Driver //  驾驶人数
        item.eye_part = this.EyePart // 眼部特征
        item.head_type = this.BikeHairStyle // 发型
        item.mouth_part = this.MouthPart // 嘴部特征
        item.nation_type = this.EthicCode // 民族代码
        item.scarf = this.ScarfPart //围脖
        item.sex_type = this.Gender //  性别
        item.shape_type = this.BikeBody //   体态
        item.type_index = item.type_index //目标编号
        item.umbrella_flag = this.BikeUmbrella //   是否打伞
        item.up_type = this.BikeCoatStyle //  上衣款式
        item.upcolor_type = this.BikeCoatStyleColor // 上衣颜色
        item.uptext_type = this.BikeCoatTexture //  上衣纹理
        item.view_type = this.BikeTowards //  朝向
        item.obj_bootom = item.obj_bootom //  左上
        item.obj_left = item.obj_left //  左下
        item.obj_right = item.obj_right //  右上
        item.obj_top = item.obj_top //  右下
        item.traceImgUrl = item.traceImgUrl
        item.markName = this.lableName
        this.lableList[this.lableIndex].unshift(item)
      } else if (item.type_index == 4 || item.type_index == 5 || item.type_index == 6 ||
        item.type_index == 7 || item.type_index == 8) {
        item.plate_class = this.PlateClass //车牌类型
        item.plate_color = this.carPlateColor //车牌颜色
        item.plate_number = this.carPlateNum //车辆号牌
        item.vehicle_color_id = this.carColor //车辆颜色
        item.vehicle_id = item.vehicle_id //车辆ID
        item.type_index = item.type_index; //车辆类型
        item.obj_left = item.obj_left //  左上
        item.obj_top = item.obj_top //  左下
        item.obj_right = item.obj_right //  右上
        item.obj_bootom = item.obj_bootom //  右下
        item.traceImgUrl = item.traceImgUrl
        item.behavior = this.VehicleBehavior //可疑行为
        item.vehicleFrontItem = this.FrontThing //车前部物品类型
        item.vehicleRearItem = this.RearThing //车后部物品类型
        item.film_color = this.AutoFoilColor //车模颜色
        item.markName = this.lableName
        this.lableList[this.lableIndex].unshift(item)
      }
    },
    //点击页签的详情
    showInfo(item, i) {
      this.$nextTick(function () {
        this.lableList.forEach(function (item) {
          Vue.set(item, 'actives', false);
        });
        Vue.set(item, 'actives', true);
      })

      this.ismorshow = false;
      this.PersonStatus = this.pose = this.Behavior = this.HabitualAction = this.VehicleBehavior = ''
      this.FrontThing = this.RearThing = this.AutoFoilColor = '' // this.pose = this.b
      this.lableInfo = item[0]
      this.lableIndex = i
      if (item[0].type_index == 0) {
        this.person = 1
        this.iscpshow = true
        this.title = '展开更多'
        this.psersonshow = this.disabled2 = this.disabled3 = true;
        this.carshow = this.cpshow = this.disabled1 = false
        this.persontarget = item[0].traceTypeName //行人类型
        this.PersonAge = item[0].age_type //年龄段
        this.EthicCode = item[0].nation_type // 民族代码
        this.Gender = item[0].sex_type //  性别
        this.BagStyle = item[0].bag_type // 包款式
        this.BagColor = item[0].bagcolor_type // 包颜色
        this.HandArticle = item[0].carrying_type // 携物(指手上拿的東西)
        this.PantsStyle = item[0].down_type // 下衣类型
        this.CulotteColor = item[0].downcolor_type // 下衣颜色
        this.HairStyle = item[0].head_type // 发型
        this.HairColor = item[0].headcolor_type // 头发颜色
        this.posture = item[0].shape_type //体态
        this.ShoesStyle = item[0].shoe_type //   鞋子款式
        this.ShoesColor = item[0].shoecolor_type //  鞋子颜色
        this.CoatStyle = item[0].up_type //  上衣款式
        this.Color = item[0].upcolor_type // 上衣颜色
        this.CoatTexture = item[0].uptext_type //  上衣纹理
        this.PersonView = item[0].view_type //  朝向
        this.PersonStatus = item[0].status //人的状态
        this.pose = item[0].gesture //姿势
        this.Behavior = item[0].behavior //行为
        this.HabitualAction = item[0].habitualMovement //习惯动作
        this.lableName = item[0].markName
        // document.getElementById('test2').value = item[0].createTimeStr
        this.lableTime = item[0].createTimeStr
      }
      if (item[0].type_index == 1 || item[0].type_index == 2 || item[0].type_index == 3) {
        this.cpshow = this.disabled1 = this.disabled3 = true
        this.person = 2
        this.iscpshow = false
        this.carshow = this.psersonshow = this.disabled2 = false
        this.cptarget = item[0].traceTypeName //目标类型
        this.BikeBag = item[0].bag_type //包款式
        this.BikeBagColor = item[0].bagcolor_type //包颜色
        this.BikeColor = item[0].carcolor_type // 所骑车颜色
        this.BikeCarray = item[0].carrying_type // 是否携物
        this.BikeCulotteStyle = item[0].down_type // 下衣类型
        this.BikeCulotteColor = item[0].downcolor_type // 下衣颜色
        this.EyePart = item[0].eye_part // 眼部特征
        this.BikeHairStyle = item[0].head_type // 发型
        this.MouthPart = item[0].mouth_part // 嘴部特征
        this.ScarfPart = item[0].scarf //  围脖
        this.BikeBody = item[0].shape_type //   体态
        this.BikeUmbrella = item[0].umbrella_flag //   是否打伞
        this.BikeCoatStyle = item[0].up_type //  上衣款式
        this.BikeCoatStyleColor = item[0].upcolor_type // 上衣颜色
        this.BikeCoatTexture = item[0].uptext_type //  上衣纹理
        this.BikeTowards = item[0].view_type //  朝向
        this.Driver = item[0].driver_count //  驾驶人数
        this.PersonAge = item[0].age_type //  年龄段
        this.EthicCode = item[0].nation_type // 民族代码
        this.Gender = item[0].sex_type //  性别
        this.lableName = item[0].markName
        // document.getElementById('test3').value = item[0].createTimeStr
        this.lableTime = item[0].createTimeStr
      }
      if (item[0].type_index == 4 || item[0].type_index == 5 || item[0].type_index == 6 ||
        item[0].type_index == 7 || item[0].type_index == 8) {
        this.iscpshow = true
        this.title = '展开更多'
        this.carshow = this.disabled1 = this.disabled2 = true;
        this.person = 3
        this.cpshow = this.psersonshow = this.disabled3 = false;
        this.carPlateColor = item[0].plate_color //车牌颜色
        this.cartarget = item[0].traceTypeName //目标类型
        this.carColor = item[0].vehicle_color_id //车辆颜色
        this.carPlateNum = item[0].plate_number //车牌号码
        this.PlateClass = item[0].plate_class //plate_class  //车牌类型
        this.VehicleBehavior = item[0].behavior //可疑行为
        this.FrontThing = item[0].vehicleFrontItem //车前部物品类型
        this.RearThing = item[0].vehicleRearItem //车后部物品类型
        this.AutoFoilColor = item[0].filmColor //车模颜色
        this.lableName = item[0].markName
        // document.getElementById('test1').value = item[0].createTimeStr
        this.lableTime = item[0].createTimeStr
      }
      this.bigimg = item[1];
      this.$nextTick(() => {
        var imgtwo = document.getElementById('imgstwo')
        var divs = document.getElementById('putImg');
        var canvas = document.getElementById('canvas')
        let imgw = imgtwo.naturalWidth;
        let imgh = imgtwo.naturalHeight;
        let retw = divs.clientWidth;
        let reth = divs.clientHeight;
        if (retw / reth < imgw / imgh) {
          imgstwo.style.width = "100%";
          imgstwo.style.height = "auto"
        } else {
          imgstwo.style.height = "100%";
          imgstwo.style.width = "auto"
        }
        canvas.setAttribute('width', imgtwo.clientWidth)
        canvas.setAttribute('height', imgtwo.clientHeight)
        var context = canvas.getContext("2d");
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = "yellow";
        context.strokeRect(
          item[3],
          item[4],
          item[5],
          item[6]
        );
        context.stroke();
      })

    },
  }
};
export default mixins
