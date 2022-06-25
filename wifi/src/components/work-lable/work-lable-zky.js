/*
 * @Author: your name
 * @Date: 2020-11-26 15:44:29
 * @LastEditTime : 2020-12-29 10:51:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\components\work-lable\work-lable-zky.js
 */
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
const mixins = {
  data() {
    return {
      zkyFeature:'',
      typeId: '',
      recodeCount:0,
    };
  },
  computed:{
    //图片上所有车辆的位置坐标列表
    zkyCarList() {
      let cList = [];
      if(this.zkySearchImg == 'true'){ // 中科院
        if(this.recodeResult.Result){
          //判断结果返回查看是否存在车辆信息，如果存在，就循环车辆信息，获取所有的车辆坐标
          if (this.recodeResult.Result[0].Vehicles) {
            for (let i = 0; i < this.recodeResult.Result[0].Vehicles.length; i++) {
              cList.push({
                leftTopX: this.$commons.isEmpty(this.recodeResult.Result[0].Vehicles[i].RegionLeft) ? 0 : this.recodeResult.Result[0].Vehicles[i].RegionLeft,
                leftTopY: this.$commons.isEmpty(this.recodeResult.Result[0].Vehicles[i].RegionTop) ? 0 : this.recodeResult.Result[0].Vehicles[i].RegionTop,
                rightBtmX: this.recodeResult.Result[0].Vehicles[i].RegionWidth,
                rightBtmY: this.recodeResult.Result[0].Vehicles[i].RegionHeight
              });
            }
          }
        }
      }
      return cList;
    },
    //图片上所有人的位置坐标列表
    //判断结果返回查看是否存在人的信息，如果存在，就循环人的信息，获取所有的人的坐标
    zkyPerList() {
      let cList = [];
      if(this.zkySearchImg == 'true'){
        if(this.recodeResult.Result){
          if (this.recodeResult.Result[0].Pedestrian) {
            for (let i = 0; i < this.recodeResult.Result[0].Pedestrian.length; i++) {
              cList.push({
                leftTopX: this.$commons.isEmpty(this.recodeResult.Result[0].Pedestrian[i].RegionLeft) ? 0 : this.recodeResult.Result[0].Pedestrian[i].RegionLeft,
                leftTopY: this.$commons.isEmpty(this.recodeResult.Result[0].Pedestrian[i].RegionTop) ? 0 : this.recodeResult.Result[0].Pedestrian[i].RegionTop,
                rightBtmX: this.recodeResult.Result[0].Pedestrian[i].RegionWidth,
                rightBtmY: this.recodeResult.Result[0].Pedestrian[i].RegionHeight
              });
            }
          }
        }
      }
      return cList;
    },
    //图片上所有骑车人的位置坐标列表
    //判断结果返回查看是否存在骑车人信息，如果存在，就循环骑车人信息，获取所有的骑车人坐标
    zkyBicList() {
      let cList = [];
      if(this.zkySearchImg == 'true'){
        if(this.recodeResult.Result){
          if (this.recodeResult.Result[0].NonMotorVehicles) {
            for (  let i = 0;  i < this.recodeResult.Result[0].NonMotorVehicles.length;  i++) {
              cList.push({
                leftTopX: this.$commons.isEmpty(this.recodeResult.Result[0].NonMotorVehicles[i].RegionLeft) ? 0 : this.recodeResult.Result[0].NonMotorVehicles[i].RegionLeft,
                leftTopY: this.$commons.isEmpty(this.recodeResult.Result[0].NonMotorVehicles[i].RegionTop) ? 0 : this.recodeResult.Result[0].NonMotorVehicles[i].RegionTop,
                rightBtmX: this.recodeResult.Result[0].NonMotorVehicles[i].RegionWidth,
                rightBtmY: this.recodeResult.Result[0].NonMotorVehicles[i].RegionHeight
              });
            }
          }
        }
      }
      return cList;
    }
  },
  methods: {
    ...mapMutations([
      "setglstfeature" //获取单个的结构化信息，然后添加特征值
    ]),
    mounted () {
    },
    //执行中科院以图搜图的识别方法
    zkyImgPicWh(){
      var img = new Image();
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
        if (reponse.data.code == 200) {
            //如果识别的图片中没有人，车，骑车人的数据则提示图片识别失败
            this.recodeResult = JSON.parse(reponse.data.data).AllResult
            if(this.recodeResult.Result[0].Vehicles.length == 0 && this.recodeResult.Result[0].Pedestrian.length == 0
                && this.recodeResult.Result[0].NonMotorVehicles.length == 0  || this.recodeResult == ''){
                this.$emit('work-lable-emit', '', '')
                this.$notify({
                type: "warning",
                message: "图片未识别到目标",
                position: "bottom-right",
                duration: 3000
                });
                return
            }else{
                this.clickRecodeimg = false
            }
            //执行框选方法，并自动框选第一个目标
            this.zkyinitCanvas();
        }else{
            this.recodeCount++
            if(this.recodeCount > 2){
                this.$notify({
                    type: "warning",
                    message: "图片识别失败",
                    position: "bottom-right",
                    duration: 3000
                  });
            }else{
                this.zkyImgPicWh()
            }
        }
        // else if(reponse.data.code == 100){
        //   this.$notify({
        //     type: "warning",
        //     message: "图片识别失败",
        //     position: "bottom-right",
        //     duration: 3000
        //   });
        // }
      })
    },
     //执行框选的方法框出第一个目标
     zkyinitCanvas() {
      //第一次进入识别信息的时候，判断数据是否存在，如果存在车辆，就默认选中一个车辆信息
      //如果车辆不存在就执行骑车人的第一个信息，如果骑车人信息不存在就执行人的信息，否则返回null
        if (this.recodeResult.Result[0].Vehicles.length) {
            this.currentCar = 0;
        } else if (this.recodeResult.Result[0].Pedestrian.length) {
            this.currentper = 0;
        } else if (this.recodeResult.Result[0].NonMotorVehicles.length) {
            this.currentbic = 0;
        } else {
            this.currentCar = null;
            this.currentper = null;
            this.currentbic = null;
        }
        //如果有人车骑车人的任意一个信息，则传值到第0个索引，并框选目标
        this.drawCarInfo(0);
    },
    //中科院框选出所有识别出来的人，车，骑车人
    zkydrawAlltarget() {
      if (this.recodeResult.Result[0].Vehicles) {
        //表示结果有车辆信息，就画出所有的车的信息
        for (let i = 0; i < this.recodeResult.Result[0].Vehicles.length; i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result[0].Vehicles[i],"yellow");
        }
      }
      if (this.recodeResult.Result[0].Pedestrian) {
        //表示结果有人的信息，就画出所有的人的信息
        for (let i = 0; i < this.recodeResult.Result[0].Pedestrian.length; i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result[0].Pedestrian[i], "yellow");
        }

      }
      if (this.recodeResult.Result[0].NonMotorVehicles) {
        //表示结果有骑车人的信息，就画出所有的骑车人的信息
        for (let i = 0;  i < this.recodeResult.Result[0].NonMotorVehicles.length;  i++) {
          //执行画框的方法
          this.drawRect(this.recodeResult.Result[0].NonMotorVehicles[i],"yellow");
        }
      }
    },
    // 中科院画框
    zkyDraw(pos, color){
      let sCtx = workLableCanvas.getContext("2d");
      let x = (this.$commons.isEmpty(pos.RegionLeft) ? 0 : pos.RegionLeft) / this.unit;  //判断GLST返回的坐标是否是undefined 如果是undefined就写0
      let y = (this.$commons.isEmpty(pos.RegionTop) ? 0 : pos.RegionTop) / this.unit;  //判断GLST返回的坐标是否是undefined 如果是undefined就写0
      let w = pos.RegionWidth / this.unit;
      let h = pos.RegionHeight / this.unit;
      sCtx.strokeStyle = color;
      sCtx.strokeRect(x, y, w, h);
      if(color == 'red') {
        this.$emit('picxAndpicy', `${pos.RegionLeft},${pos.RegionTop},${pos.RegionLeft + pos.RegionWidth},${pos.RegionTop + pos.RegionHeight}`)
        // this.picxAndpicy = `${pos.RegionLeft},${pos.RegionTop},${pos.RegionLeft + pos.RegionWidth},${pos.RegionTop + pos.RegionHeight}`
      }
      // splitPicUrl(this.url, pos.RegionLeft, pos.RegionTop, pos.RegionLeft + pos.RegionWidth, pos.RegionTop + pos.RegionHeight)
    },
    //中科院框选第一个目标
    zkydrawfirst(pIndex, color) {
      if (this.recodeResult.Result[0].Vehicles.length && this.currentCar !== null) {
        //表示结果有车辆信息，就执行车辆的第一个
        this.typeId = 2
        this.$emit('work-lable-emit', this.typeId, this.recodeResult.Result[0].Vehicles[pIndex])
        this.drawRect(this.recodeResult.Result[0].Vehicles[pIndex], color);
        return
      } else if (this.recodeResult.Result[0].Pedestrian.length &&  this.currentper !== null) {
        //表示结果有人的信息，就执行车辆的第一个
        this.typeId = 1
        this.$emit('work-lable-emit', this.typeId, this.recodeResult.Result[0].Pedestrian[pIndex])
        this.drawRect(this.recodeResult.Result[0].Pedestrian[pIndex], color);
        return
      } else if (this.recodeResult.Result[0].NonMotorVehicles.length && this.currentbic !== null) {
        //表示结果有骑车人的信息，就执行车辆的第一个
        this.typeId = 3
        this.$emit('work-lable-emit', this.typeId, this.recodeResult.Result[0].NonMotorVehicles[pIndex])
        this.drawRect(this.recodeResult.Result[0].NonMotorVehicles[pIndex], color);
        return
      }
    },
    // 展示中科院结果到以图搜图
    iszkyImgResult(){
      if(this.currentCar == null && this.currentper == null && this.currentbic == null){
        return
      }else if (this.currentCar != null) {
        this.searchresult = this.recodeResult.Result[0].Vehicles[this.currentCar];
      } else if (this.currentper != null) {
        this.searchresult = this.recodeResult.Result[0].Pedestrian[this.currentper];
      } else if (this.currentbic != null) {
        this.searchresult = this.recodeResult.Result[0].NonMotorVehicles[this.currentbic];
      }
      this.feacthImg = this.recodeResult.Result[0].ImageUri;
      this.zkysvaeImg(this.searchresult);
      this.$emit('childByClick','')
    },
    //2.中科院把当前选中的结果写入到以图搜图的页面中去
    zkysvaeImg(row) {
      this.zkyFeature =  this.searchresult.Feature
      console.log(this.zkyFeature,444444444);
      //获取图片的DOM以及当前以图搜图展示的DOM元素
      let imgs = document.getElementById("imgUrlShow"); //图片大小
      let imgBox = document.getElementById("searchsmallImg"); //div大小
      let leftTopX = this.$commons.isEmpty(row.RegionLeft) ? 0 : row.RegionLeft; //目标相对图片的横坐标
      let leftTopY = this.$commons.isEmpty(row.RegionTop) ? 0 : row.RegionTop; //目标相对图片的纵坐标
      let imgw = row.RegionWidth; //目标相对图片的宽度
      let imgh = row.RegionHeight; //目标相对图片高度
      let retw = imgBox.clientWidth;    //div的实际宽度
      let reth = imgBox.clientHeight;   //div的实际高度
      let unit = 1;                  //图片和div的默认比例
      let posLeft = 0;
      let posTop = 0;
      //通过图片宽高比以及图片的实际比计算出人物的比率
      if (retw / reth < imgw / imgh) {
        unit = imgw / retw;
      } else {
        unit = imgh / reth;
      }
      // 通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
      imgs.style.width = row.SrcImageWidth / unit + "px";
      imgs.style.height = row.SrcImageHeight / unit + "px";
      imgs.style.top = -(leftTopY / unit) + posTop + "px";
      imgs.style.left = -(leftTopX / unit) + posLeft + "px";
    },
  }
}
export default mixins
