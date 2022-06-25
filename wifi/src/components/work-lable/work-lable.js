import { mapGetters } from "vuex";
const mixins = {
  data() {
    return {
      unit: 1, //识别图片做自适应的时候的比例
      currentCar: null, //当前选中的识别坐标
      currentper: null, //当前选中的识别坐标
      currentbic: null, //当前选中的识别坐标
      color: [
        "red",
        "blue",
        "orange",
        "pink",
        "black",
        "green",
        "yellow",
        "gray",
        "purple"
      ],
      glstSearchImg: '', // glst开关
      zkySearchImg: '', // zky开关
      userId: '',
      picxAndpicy: '',
      typeId: ''
    };
  },
  watch: {
    //监听模态框是否打开

  },
  mounted() {
    this.userId = this.$storage.getSession('userInfo').userId
  },
  computed: {
    ...mapGetters([
      "deviceInfo",
  ]),
    //图片上所有车辆的位置坐标列表
    carList() {
      let cList = [];
      if (this.recodeResult.Result) {
        //判断结果返回查看是否存在车辆信息，如果存在，就循环车辆信息，获取所有的车辆坐标
        if (this.recodeResult.Result.Vehicles) {
          for (let i = 0; i < this.recodeResult.Result.Vehicles.length; i++) {
            cList.push({
              leftTopX: this.$commons.isEmpty(this.recodeResult.Result.Vehicles[i].Img.Cutboard.X) ? 0 : this.recodeResult.Result.Vehicles[i].Img.Cutboard.X,
              leftTopY: this.$commons.isEmpty(this.recodeResult.Result.Vehicles[i].Img.Cutboard.Y) ? 0 : this.recodeResult.Result.Vehicles[i].Img.Cutboard.Y,
              rightBtmX: this.recodeResult.Result.Vehicles[i].Img.Cutboard.Width,
              rightBtmY: this.recodeResult.Result.Vehicles[i].Img.Cutboard.Height
            });
          }
        }
      }
      return cList;
    },
    //图片上所有人的位置坐标列表
    //判断结果返回查看是否存在人的信息，如果存在，就循环人的信息，获取所有的人的坐标
    perList() {
      let cList = [];
      if (this.recodeResult.Result) {
        if (this.recodeResult.Result.Pedestrian) {
          for (let i = 0; i < this.recodeResult.Result.Pedestrian.length; i++) {
            cList.push({
              leftTopX: this.$commons.isEmpty(this.recodeResult.Result.Pedestrian[i].Img.Cutboard.X) ? 0 : this.recodeResult.Result.Pedestrian[i].Img.Cutboard.X,
              leftTopY: this.$commons.isEmpty(this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Y) ? 0 : this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Y,
              rightBtmX: this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Width,
              rightBtmY: this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Height
            });
          }
        }
      }
      return cList;
    },
    //

    //判断结果返回查看是否存在骑车人信息，如果存在，就循环骑车人信息，获取所有的骑车人坐标
    bicList() {
      let cList = [];
      if (this.recodeResult.Result) {

        if (this.recodeResult.Result.NonMotorVehicles) {
          for (let i = 0; i < this.recodeResult.Result.NonMotorVehicles.length; i++) {
            cList.push({
              leftTopX: this.$commons.isEmpty(this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.X) ? 0 : this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.X,
              leftTopY: this.$commons.isEmpty(this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Y) ? 0 : this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Y,
              rightBtmX: this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Width,
              rightBtmY: this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Height
            });
          }
        }
      }
      return cList;
    }
  },
  methods: {
    //打开模态框
    opendia() {
      this.$nextTick(() => {
        //打开模态框的时候判断当前是否有选中目标，如果没有就清空canvas
        if (this.currentCar == null && this.currentper == null && this.currentbic == null) {
          let workLableCanvas = document.getElementById("workLableCanvas");
          workLableCanvas.setAttribute("width", 0);
          workLableCanvas.setAttribute("height", 0);
        }
        this.glstSearchImg = sessionStorage.getItem('glstStructureSwitch') // 格林森瞳结构化
        this.zkySearchImg = sessionStorage.getItem('zkyStructureSwitch') // 中科院结构化
      });
    },
    //执行格林深瞳以图搜图的识别方法
    ImgPicWh() {
      var img = new Image();
      // let imgs = document.getElementById("searchBigimg");
      // let divs = document.getElementById("searchmain");
      img.onload = () => {
        let imgs = document.getElementById("workLableImg");
        let divs = document.getElementById("workLableMain");
        //图片加载完成之后执行图片自适应的方法 传入图片的dom和图片父元素的dom
        this.searchImgWh(imgs, divs);
      };
      img.src = this.url;
      let data = {
        imageUrl: this.url, //图片的url地址
        recFlag: 1, //1:识别人，非机动车，车辆，2：识别人脸
        detectMode: 0 //0：大图（默认用这个），1：小图，2：大图小图都识别（性能差）
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/recImage", data).then(reponse => {
        // console.log(resizeBy, 'ggggggggggggg--------------------------')
        if (reponse.data.code == 200) {
          //如果识别的图片中没有人，车，骑车人的数据则提示图片识别失败
          this.recodeResult = JSON.parse(reponse.data.data);
          console.log(this.recodeResult, 'this.recodeResult-------------')
          if (this.recodeResult.Result[0].Vehicles.length  == 0 && this.recodeResult.Result[0].Pedestrian.length == 0  &&
            this.recodeResult.Result[0].NonMotorVehicles == 0) {
            this.$notify({
              type: "warning",
              message: "图片未识别到目标",
              position: "bottom-right",
              duration: 3000
            });
            return
          }
          //执行框选方法，并自动框选第一个目标
          this.initCanvas();
        } else if (reponse.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "图片未识别到目标",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },

    //2. 图片上传完了以后执行图片自适应的方法
    //执行图片的自适应
    searchImgWh(imgs, divs) {
      //获取图片的原始宽高以及缩放后的宽厚，图片父元素的宽高
      //通过比率来计算图片是否是宽度自适应还是高度自适应
      var imgw = imgs.naturalWidth; //图片的原始宽度
      var imgh = imgs.naturalHeight; //图片的原始高度
      var retw = divs.clientWidth;
      var reth = divs.clientHeight;
      var canvas = document.getElementById("workLableCanvas");
      setTimeout(() => {
        canvas.setAttribute("width", imgs.width);
        canvas.setAttribute("height", imgs.height);
      }, 0);
      /// div宽高 除以图片的实际宽高
      //如果小于比率则是图片的宽度100% 高度自适应，反之高度100% 宽度自适应
      if (retw / reth < imgw / imgh) {
        imgs.style.width = "100%";
        imgs.style.height = "auto";
        this.unit = imgw / retw;
      } else {
        imgs.style.height = "100%";
        imgs.style.width = "auto";
        this.unit = imgh / reth;
      }
      this.imgPicInquire = true
    },
    //执行框选的方法框出第一个目标
    initCanvas() {
      //第一次进入识别信息的时候，判断数据是否存在，如果存在车辆，就默认选中一个车辆信息
      //如果车辆不存在就执行骑车人的第一个信息，如果骑车人信息不存在就执行人的信息，否则返回null
      if (this.recodeResult.Result.Vehicles) {
        this.currentCar = 0;
      } else if (this.recodeResult.Result.Pedestrian) {
        this.currentper = 0;
      } else if (this.recodeResult.Result.NonMotorVehicles) {
        this.currentbic = 0;
      } else {
        this.currentCar = null;
        this.currentper = null;
        this.currentbic = null;
      }
      //如果有人车骑车人的任意一个信息，则传值到第0个索引，并框选目标
      this.drawCarInfo(0);
    },
    //执行完识别后先清空canvas幕布，然后框选出第一个目标，以及其他所有的目标
    drawCarInfo(pIndex) {
      this.clearRect(); //清除Canvas
      // 格林森瞳
      if (this.glstSearchImg == 'true') {
        this.drawAlltarget(); //框选所有的目标
        this.drawfirst(pIndex, "red"); //框选第一个目标
      } else if (this.zkySearchImg == 'true') { // 中科院
        this.zkydrawAlltarget()
        this.zkydrawfirst(pIndex, "red"); //框选第一个目标
      }
    },
    //框选出所有识别出来的人，车，骑车人
    drawAlltarget() {
      if (this.recodeResult.Result.Vehicles) {
        //表示结果有车辆信息，就画出所有的车的信息
        for (let i = 0; i < this.recodeResult.Result.Vehicles.length; i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result.Vehicles[i].Img.Cutboard, "yellow");
        }
      }
      if (this.recodeResult.Result.Pedestrian) {
        //表示结果有人的信息，就画出所有的人的信息
        for (let i = 0; i < this.recodeResult.Result.Pedestrian.length; i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result.Pedestrian[i].Img.Cutboard, "yellow");
        }

      }
      if (this.recodeResult.Result.NonMotorVehicles) {
        //表示结果有骑车人的信息，就画出所有的骑车人的信息
        for (let i = 0; i < this.recodeResult.Result.NonMotorVehicles.length; i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard, "yellow");
        }
      }
    },
    //框选第一个目标
    drawfirst(pIndex, color) {
      if (this.recodeResult.Result.Vehicles && this.currentCar != null) {
        //表示结果有车辆信息，就执行车辆的第一个
        this.typeId = 2
        this.$emit('work-lable-emit', this.typeId, this.recodeResult.Result.Vehicles[pIndex])
        this.drawRect(this.recodeResult.Result.Vehicles[pIndex].Img.Cutboard, color);
        return
      } else if (this.recodeResult.Result.Pedestrian && this.currentper != null) {
        //表示结果有人的信息，就执行人的第一个
        this.typeId = 1
        this.$emit('work-lable-emit', this.typeId, this.recodeResult.Result.Pedestrian[pIndex])
        this.drawRect(this.recodeResult.Result.Pedestrian[pIndex].Img.Cutboard, color);
        return
      } else if (this.recodeResult.Result.NonMotorVehicles && this.currentbic != null) {
        //表示结果有骑车人的信息，就执行骑车人的第一个
        this.typeId = 4
        this.$emit('work-lable-emit', this.typeId, this.recodeResult.Result.NonMotorVehicles[pIndex])
        this.drawRect(this.recodeResult.Result.NonMotorVehicles[pIndex].Img.Cutboard, color);
        return
      }
    },
    //清空所有目标和canvas
    clearRect() {
      let workLableCanvas = document.getElementById("workLableCanvas");
      let sCtx = workLableCanvas.getContext("2d");
      sCtx.clearRect(0, 0, workLableCanvas.clientWidth, workLableCanvas.clientWidth);
    },
    //执行框选的方法
    drawRect(pos, color) {

      let workLableCanvas = document.getElementById("workLableCanvas");
      let sCtx = workLableCanvas.getContext("2d");
      if (this.glstSearchImg == 'true') {
        let x = (this.$commons.isEmpty(pos.X) ? 0 : pos.X) / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
        let y = (this.$commons.isEmpty(pos.Y) ? 0 : pos.Y) / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
        let w = pos.Width / this.unit;
        let h = pos.Height / this.unit;
        sCtx.strokeStyle = color;
        sCtx.strokeRect(x, y, w, h);
        if(color == 'red') {
          this.$emit('picxAndpicy', `${pos.RegionLeft},${pos.RegionTop},${pos.RegionLeft + pos.RegionWidth},${pos.RegionTop + pos.RegionHeight}`)
        }
        console.log(x, y, w, h, '*******************************************---------------------')

      } else if (this.zkySearchImg == 'true') {
        this.zkyDraw(pos, color)
      }
    },
    //点击div 获取当前点击的位置来计算当前点击的是哪一个区域，并自动切换框选目标
    choiceCar(ev) {
      this.currentCar = null;
      this.currentper = null;
      this.currentbic = null;
      let offsetX = ev.offsetX; //当前点击的坐标位置
      let offsetY = ev.offsetY; //当前点击的坐标的位置
      //如果有车辆的信息，则判断当前的坐标
      // 格林深瞳方法
      if (this.glstSearchImg == 'true') {
        if (this.carList.length > 0) {
          for (let i = 0; i < this.carList.length; i++) {
            //如果当前点击的坐标位置刚好在格林深瞳返回的坐标之中，给当前索引赋值，并框选目标
            if (
              this.carList[i].leftTopX / this.unit < offsetX &&
              (this.carList[i].leftTopX + this.carList[i].rightBtmX) / this.unit > offsetX &&
              this.carList[i].leftTopY / this.unit < offsetY &&
              (this.carList[i].leftTopY + this.carList[i].rightBtmY) / this.unit > offsetY) {
              this.currentCar = i;
              this.drawCarInfo(this.currentCar);
              return
            }
          }
        }
        if (this.perList.length > 0) {
          for (let i = 0; i < this.perList.length; i++) {
            if (
              this.perList[i].leftTopX / this.unit < offsetX &&
              (this.perList[i].leftTopX + this.perList[i].rightBtmX) / this.unit > offsetX &&
              this.perList[i].leftTopY / this.unit < offsetY &&
              (this.perList[i].leftTopY + this.perList[i].rightBtmY) / this.unit > offsetY) {
              this.currentper = i;
          //  this.picxAndpicy = `${this.perList[i].leftTopX},${this.perList[i].leftTopY},${Number(this.perList[i].rightBtmX) + Number(this.perList[i].leftTopX)},${Number(this.perList[i].rightBtmY) + Number(this.perList[i].leftTopY)}`
              // splitPicUrl(this.url, this.perList[i].leftTopX, this.perList[i].leftTopY, Number(this.perList[i].rightBtmX) + Number(this.perList[i].leftTopX), Number(this.perList[i].rightBtmY) + Number(this.perList[i].leftTopY))
              this.drawCarInfo(this.currentper);
              return
            }
          }
        }
        if (this.bicList.length > 0) {
          for (let i = 0; i < this.bicList.length; i++) {
            if (
              this.bicList[i].leftTopX / this.unit < offsetX &&
              (this.bicList[i].leftTopX + this.bicList[i].rightBtmX) / this.unit >
              offsetX &&
              this.bicList[i].leftTopY / this.unit < offsetY &&
              (this.bicList[i].leftTopY + this.bicList[i].rightBtmY) / this.unit >
              offsetY
            ) {
              this.currentbic = i;
              // this.picxAndpicy = `${this.bicList[i].leftTopX},${this.bicList[i].leftTopY},${Number(this.bicList[i].rightBtmX) + Number(this.bicList[i].leftTopX)},${Number(this.bicList[i].rightBtmY) + Number(this.bicList[i].leftTopY)}`
              // splitPicUrl(this.url, this.bicList[i].leftTopX, this.bicList[i].leftTopY, Number(this.bicList[i].rightBtmX) + Number(this.bicList[i].leftTopX), Number(this.bicList[i].rightBtmY) + Number(this.bicList[i].leftTopY))
              this.drawCarInfo(this.currentbic);
              return
            }
          }
        }
      } else if (this.zkySearchImg == 'true') {
        if (this.zkyCarList.length > 0) {
          for (let i = 0; i < this.zkyCarList.length; i++) {
            //如果当前点击的坐标位置刚好在格林深瞳返回的坐标之中，给当前索引赋值，并框选目标
            if (
              this.zkyCarList[i].leftTopX / this.unit < offsetX &&
              (this.zkyCarList[i].leftTopX + this.zkyCarList[i].rightBtmX) / this.unit > offsetX &&
              this.zkyCarList[i].leftTopY / this.unit < offsetY &&
              (this.zkyCarList[i].leftTopY + this.zkyCarList[i].rightBtmY) / this.unit > offsetY) {
              this.currentCar = i;
              // this.picxAndpicy = `${this.zkyPerList[i].leftTopX},${this.zkyPerList[i].leftTopY},${Number(this.zkyPerList[i].rightBtmX) + Number(this.zkyPerList[i].leftTopX)},${Number(this.zkyPerList[i].rightBtmY) + Number(this.zkyPerList[i].leftTopY)}`
              // splitPicUrl(this.url, this.zkyCarList[i].leftTopX, this.zkyCarList[i].leftTopY, Number(this.zkyCarList[i].rightBtmX) + Number(this.zkyCarList[i].leftTopX), Number(this.zkyCarList[i].rightBtmY) + Number(this.zkyCarList[i].leftTopY))
              // console.log(this.zkyCarList[i], '车车-------------------')
              this.drawCarInfo(this.currentCar);
              return
            }
          }
        }
        if (this.zkyPerList.length > 0) {
          for (let i = 0; i < this.zkyPerList.length; i++) {
            if (
              this.zkyPerList[i].leftTopX / this.unit < offsetX &&
              (this.zkyPerList[i].leftTopX + this.zkyPerList[i].rightBtmX) / this.unit > offsetX &&
              this.zkyPerList[i].leftTopY / this.unit < offsetY &&
              (this.zkyPerList[i].leftTopY + this.zkyPerList[i].rightBtmY) / this.unit > offsetY) {
              this.currentper = i;
              // this.picxAndpicy = `${this.zkyPerList[i].leftTopX},${this.zkyPerList[i].leftTopY},${Number(this.zkyPerList[i].rightBtmX) + Number(this.zkyPerList[i].leftTopX)},${Number(this.zkyPerList[i].rightBtmY) + Number(this.zkyPerList[i].leftTopY)}`
              // splitPicUrl(this.url, this.zkyPerList[i].leftTopX, this.zkyPerList[i].leftTopY, Number(this.zkyPerList[i].rightBtmX) + Number(this.zkyPerList[i].leftTopX), Number(this.zkyPerList[i].rightBtmY) + Number(this.zkyPerList[i].leftTopY))
              this.drawCarInfo(this.currentper);
              return
            }
          }
        }
        if (this.zkyBicList.length > 0) {
          for (let i = 0; i < this.zkyBicList.length; i++) {
            if (
              this.zkyBicList[i].leftTopX / this.unit < offsetX &&
              (this.zkyBicList[i].leftTopX + this.zkyBicList[i].rightBtmX) / this.unit >
              offsetX &&
              this.zkyBicList[i].leftTopY / this.unit < offsetY &&
              (this.zkyBicList[i].leftTopY + this.zkyBicList[i].rightBtmY) / this.unit >
              offsetY
            ) {
              this.currentbic = i;
              // this.picxAndpicy = `${this.zkyBicList[i].leftTopX},${this.zkyBicList[i].leftTopY},${Number(this.zkyBicList[i].rightBtmX) + Number(this.zkyBicList[i].leftTopX)},${Number(this.zkyBicList[i].rightBtmY) + Number(this.zkyBicList[i].leftTopY)}`
              // splitPicUrl(this.url, this.zkyBicList[i].leftTopX, this.zkyBicList[i].leftTopY, Number(this.zkyBicList[i].rightBtmX) + Number(this.zkyBicList[i].leftTopX), Number(this.zkyBicList[i].rightBtmY) + Number(this.zkyBicList[i].leftTopY))
              this.drawCarInfo(this.currentbic);
              return
            }
          }
        }
      }
    },
  }
}
export default mixins
