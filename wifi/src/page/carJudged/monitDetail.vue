<template>
  <div class="detailContainer">
    <div class="contentHeader">| 实时监测</div>
    <div class="carDesc">
      <div class="carImg" id="carImg" :title="tollgateIdP + ' '+currentMonitNew.passTime">
        <img :class="imgWH" :src="currentMonitNew.imgUrl" alt="">
        <span class="carImgInfo" id="carImgInfo" :style="{width:this.currentMonitNew.imageWidth/this.unit+'px'}">{{tollgateIdP}}{{currentMonitNew.passTime}}</span>
        <span class="redLine" id="redLine" v-show="redLineShow"></span>
      </div>
      <div class="carSmallImg" id="carSmallImg">
        <img :src="currentMonitNew.imgUrl" alt="" :style="{width: this.imgSmallWidth,height: this.imgSmallHeight,top: this.imgSmallTop, left: this.imgSmallLeft}">
      </div>
      <div class="carInfo">
        <table style="width: 100%;height: 100%">
          <tr>
            <td width="15%">车牌号码</td>
            <td width="35%" :title="currentMonitNew.plateNo">{{currentMonitNew.plateNo}}</td>
            <td width="15%">卡口位置</td>
            <td width="35%" :title="currentMonitNew.tollgateIdP">{{currentMonitNew.tollgateIdP}}</td>
          </tr>
          <tr>
            <td>号牌种类</td>
            <td :title="currentMonitNew.plateClass">{{currentMonitNew.plateClass}}</td>
            <td>过车时间</td>
            <td :title="currentMonitNew.passTime">{{currentMonitNew.passTime}}</td>
          </tr>
          <tr>
            <td>号牌颜色</td>
            <td :title="currentMonitNew.plateColor">{{currentMonitNew.plateColor}}</td>
            <td>遮挡面部</td>
            <td :title="currentMonitNew.face">{{currentMonitNew.face}}</td>
          </tr>
          <tr>
            <td>车辆类别</td>
            <td :title="currentMonitNew.vehicleKind">{{currentMonitNew.vehicleKind}}</td>
            <td>是否抽烟</td>
            <td :title="currentMonitNew.smoke">{{currentMonitNew.smoke}}</td>
          </tr>
          <tr>
            <td>车辆品牌</td>
            <td :title="currentMonitNew.vehicleBrand">{{currentMonitNew.vehicleBrand}}</td>
            <td>是否打电话</td>
            <td :title="currentMonitNew.calling">{{currentMonitNew.calling}}</td>
          </tr>
          <tr>
            <td>车辆型号</td>
            <td :title="currentMonitNew.vehicleModel">{{currentMonitNew.vehicleModel}}</td>
            <td title="是否开启遮阳板">是否开启遮阳板</td>
            <td :title="currentMonitNew.sunshield">{{currentMonitNew.sunshield}}</td>
          </tr>
          <tr>
            <td>车辆颜色</td>
            <td :title="currentMonitNew.vehicleColor">{{currentMonitNew.vehicleColor}}</td>
            <td title="是否系安全带">是否系安全带</td>
            <td :title="currentMonitNew.belt">{{currentMonitNew.belt}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="carRecord">
      <div v-show="showmotor" class="carRecordTitle">| 机动车过车记录</div>
      <transition-group v-show="showmotor" tag="div" name="list" class="carRecordItem" id="carRecordItem">
        <div v-if="prev"  class="prev carsDetail" :key="prev.key">
          <div id="monitprev" class="carsPicture"><img :style="{'width':prev.width,'height':prev.height,'top':prev.top,'left':prev.left}" :src="prev.imgUrl" alt="loading"></div>
        </div>
        <div v-for="(item,index) in monitData.data" @click="changeMonit(item,index)" :class="[(currentIndex == index)?'cur':'', 'cdItem_'+index,'carsDetail']" :key="item.key">
          <div :id="'one' + index" class="carsPicture"><img :style="{'width':item.width,'height':item.height,'top':item.top,'left':item.left}" :src="item.imgUrl" alt="loading"></div>
        </div>
        <div v-if="next"  class="next carsDetail" :key="next.key">
          <div id="monitnext" class="carsPicture"><img :style="{'width':next.width,'height':next.height,'top':next.top,'left':next.left}" :src="next.imgUrl" alt="loading"></div>
        </div>

      </transition-group>
      <div v-show="showNomotor" class="carRecordTitle">| 非机动车过车记录</div>

       <transition-group v-show="showNomotor" tag="div" name="list" class="carRecordItem" id="carRecordItem1">
        <div v-if="mprev"   class="prev carsDetail" :key="mprev.key">
          <div id="carprev" class="carsPicture"><img :style="{'width':mprev.width,'height':mprev.height,'top':mprev.top,'left':mprev.left}" :src="mprev.imgUrl" alt="loading"></div>
        </div>
        <div v-for="(item,index) in carData.data" @click="changeMonits(item,index)" :class="[(currentIndexs == index)?'curs':'', 'cdItem_'+index,'carsDetail']" :key="item.key">
          <div :id="'two' + index" class="carsPicture"><img :style="{'width':item.width,'height':item.height,'top':item.top,'left':item.left}" :src="item.imgUrl" alt="loading"></div>
        </div>
        <div v-if="mnext"  class="next carsDetail" :key="mnext.key">
          <div id="carnext" class="carsPicture"><img :style="{'width':mnext.width,'height':mnext.height,'top':mnext.top,'left':mnext.left}" :src="mnext.imgUrl" alt="loading"></div>
        </div>
      </transition-group>




    </div>
  </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  export default {
    props: ['tollgateId','tollgateIdP'],
    data(){
      return{
        loading: null,
        currentMonit: {},
        redLineShow: false, //是否显示红框
        prev:null,
        next:null,
        mprev:null,
        mnext:null,
        monitData: {  //机动车
          code: null,
          message: null,
          data: []
        },
        carData: {  //非机动车
          code: null,
          message: null,
          data: []
        },
        oldResData: [],
        oldcarResData: [],  //老数据
        currentIndex: null,
        currentIndexs: null,
        t: null,
        tId: "",
        tIdP: "",
        imgWH: "height",  //默认图片等比缩放为高度100%
        unit: 1,

        imgSmallWidth: 0,
        imgSmallHeight:0,
        imgSmallTop: 0,
        imgSmallLeft: 0,
        style: [],

        diff:[],  //返回值与已有值的相异数据对应下标
        mdiff:[],
        interNum:0,
        minterNum:0,
        interT:null,
        minterT:null,
        showmotor:true, //显示机动车
        showNomotor:false, //显示非机动车
        motorHeight:2.67
      }
    },
    mixins:[vehicle],
    computed:{
      currentMonitNew(){
        if((this.$qs.stringify(this.currentMonit) == "")){
          this.redLineShow = false;
          return {};
        }else{
           this.redLineShow = true;
        }
        let obj = {
          tollgateIdP: this.tollgateIdP,
          imageWidth:this.currentMonit.imageWidth,
          imageHeight: this.currentMonit.imageHeight,
          imgUrl: this.currentMonit.imgUrl,
          leftTopX: this.currentMonit.leftTopX,
          leftTopY: this.currentMonit.leftTopY,
          passTime: this.currentMonit.passTime,
          rightBtmX: this.currentMonit.rightBtmX,
          rightBtmY: this.currentMonit.rightBtmY,
          tollgateId: this.currentMonit.tollgateId
        };
        if(this.currentMonit.plateClass == "@" || this.currentMonit.plateClass == "未识别"){
          obj.plateClass = "未识别";
        }else{
          obj.plateClass =  this.currentMonit.plateClass;
        }
        if(this.currentMonit.plateColor == "@" || this.currentMonit.plateColor == "未识别"){
          obj.plateColor = "未识别";
        }else{
          obj.plateColor =  this.currentMonit.plateColor;
        }
        if(this.currentMonit.plateNo == "@" || this.currentMonit.plateNo == "未识别"){
          obj.plateNo = "未识别";
        }else{
          obj.plateNo =  this.currentMonit.plateNo;
        }
        if(this.currentMonit.vehicleBrand == "@" || this.currentMonit.vehicleBrand == "未识别"){
          obj.vehicleBrand = "未识别";
        }else{
          obj.vehicleBrand =  this.currentMonit.vehicleBrand;
        }
        if(this.currentMonit.vehicleColor == "@" || this.currentMonit.vehicleColor == "未识别"){
          obj.vehicleColor = "未识别";
        }else{
          obj.vehicleColor =  this.currentMonit.vehicleColor;
        }
        if(this.currentMonit.vehicleKind == "@" || this.currentMonit.vehicleKind == "未识别"){
          obj.vehicleKind = "未识别";
        }else{
          obj.vehicleKind =  this.currentMonit.vehicleKind;
        }
        if(this.currentMonit.vehicleModel == "@" || this.currentMonit.vehicleModel == "未识别"){
          obj.vehicleModel = "未识别";
        }else{
          obj.vehicleModel =  this.currentMonit.vehicleModel;
        }
        if(this.currentMonit.belt === null || this.currentMonit.belt ===""){
          obj.belt = this.currentMonit.belt;
        }else if(this.currentMonit.belt === 0){
          obj.belt = "否";
        }else{
          obj.belt = "是";
        }

        if(this.currentMonit.calling === null || this.currentMonit.calling ===""){
          obj.calling = this.currentMonit.calling;
        }else if(this.currentMonit.calling === 0){
          obj.calling = "否";
        }else{
          obj.calling = "是";
        }

        if(this.currentMonit.face === null || this.currentMonit.face ===""){
          obj.face = this.currentMonit.face;
        }else if(this.currentMonit.face === 0){
          obj.face = "否";
        }else{
          obj.face = "是";
        }

        if(this.currentMonit.smoke === null || this.currentMonit.smoke ===""){
          obj.smoke = this.currentMonit.smoke;
        }else if(this.currentMonit.smoke === 0){
          obj.smoke = "否";
        }else{
          obj.smoke = "是";
        }

        if(this.currentMonit.sunshield === null || this.currentMonit.sunshield ===""){
          obj.sunshield = this.currentMonit.sunshield;
        }else if(this.currentMonit.sunshield === 0){
          obj.sunshield = "否";
        }else{
          obj.sunshield = "是";
        }
        return obj;

      }
    },
    watch:{
      tollgateId (newValue, oldValue){
        this.tId = newValue;
        this.currentIndex = 0;
        this.currentIndexs = 0;
        clearTimeout(this.t);
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.monitData.data = [];
        this.carData.data = [];
        this.currentMonit = {};
        this.getMonitData();
      },
      tollgateIdP (newValue, oldValue){
        this.tIdP = newValue;
      },
      currentMonit (newValue, oldValue){
        if((this.$qs.stringify(newValue) == "")){
          this.redLineShow = false;
        }else{
          this.redLineShow = true;
          let imgw = this.currentMonit.imageWidth;
          let imgh = this.currentMonit.imageHeight;
          let retNode = $("#carImg");
          let retw = retNode.width();
          let reth = retNode.height();
          let redUnitLeft = 0;
          let redUnitTop = 0;
          if (retw / reth < imgw / imgh) {
            this.imgWH = "width";
            this.unit = imgw / retw;
            redUnitTop = (reth - imgh/this.unit)/2;
          } else {
            this.imgWH = "height";
            this.unit = imgh / reth;
            redUnitLeft = (retw - imgw/this.unit)/2;
          }

          let leftTopX = this.currentMonit.leftTopX;
          let leftTopY = this.currentMonit.leftTopY;
          let rightBtmX = this.currentMonit.rightBtmX;
          let rightBtmY = this.currentMonit.rightBtmY;

          let redLine = document.getElementById("redLine");
          redLine.style.width = (rightBtmX -leftTopX)/this.unit +"px";
          redLine.style.height = (rightBtmY - leftTopY)/this.unit+"px";
          redLine.style.top = (leftTopY/this.unit + redUnitTop) +"px";
          redLine.style.left = (leftTopX/this.unit + redUnitLeft) +"px";

          let imgwSmall = rightBtmX - leftTopX;
          let imghSmall = rightBtmY - leftTopY;
          let carSmallImg = document.getElementById("carSmallImg");
          let retwSmall = carSmallImg.clientWidth;
          let rethSmall = carSmallImg.clientHeight;
          let unitSmall = 1;
          let unitTop = 0;
          let unitLeft = 0;
          if (retwSmall / rethSmall < imgwSmall / imghSmall) {
            unitSmall = imgwSmall / retwSmall;
            unitTop = (rethSmall - imghSmall / unitSmall)/2;
          } else {
            unitSmall = imghSmall / rethSmall;
            unitLeft = (retwSmall - imgwSmall / unitSmall)/2;
          }

          this.imgSmallWidth = (imgw / unitSmall )+"px";
          this.imgSmallHeight = (imgh / unitSmall)+"px";
          this.imgSmallTop = -(leftTopY / unitSmall) + unitTop +"px";
          this.imgSmallLeft = -(leftTopX / unitSmall) + unitLeft +"px";

          // this.redLineShow = false;
        }
      }
    },
    methods:{
      getMonitData (){
        if(!this.tId){
          return false;
        }
        this.getVD("Detail", {
          tollgateIds: this.tId
        }, (res)=>{
          if(res.data.code == 200){
            //两者都存在
            if(res.data.data[0].length != 0 && res.data.data[1].length != 0){
              this.showNomotor = true
              this.showmotor = true;
              this.motorHeight = 1.3
              document.getElementById('carRecordItem1').style.height = '1.7rem'
              document.getElementById('carRecordItem').style.height = '1.7rem'
            }
            // else
            //非机动车
            if(res.data.data[0].length == 0 && res.data.data[1].length != 0 ){
              document.getElementById('carRecordItem').style.height = '3rem'
              document.getElementById('carRecordItem1').style.height = '3rem'
               this.showmotor = false;
               this.showNomotor = true
               this.motorHeight = 2.67
            }
            // else
            //机动车
            if(res.data.data[1].length ==0 && res.data.data[0].length != 0){
              document.getElementById('carRecordItem1').style.height = '2.8rem'
              document.getElementById('carRecordItem').style.height = '2.8rem'
              this.motorHeight = 2.67
              this.showmotor = true;
              this.showNomotor = false
            }
            //两者都不存在
            if(res.data.data[1].length ==0 && res.data.data[0].length ==0){
              this.showmotor = true;
              this.showNomotor = false
              document.getElementById('carRecordItem').style.height = '2.8rem'
            }
            this.compareRes(res.data.data[0]);//比较返回的数据与原数据
            this.oldResData = res.data.data[0];
            this.compareCarRes(res.data.data[1]);//比较返回的数据与原数据
            this.oldcarResData = res.data.data[1];

            if(this.diff.length) {
              this.diff.forEach((element, i) => {
                this.getItemWH(element);
              });
              this.interNum = 0;
              if(this.interT){
                clearInterval(this.interT);
              }
              this.interT = null;
              let _this = this;
              this.interT = setInterval(function(){
                if(_this.interNum == _this.diff.length ){
                  clearInterval(_this.interT);
                  _this.interT = null;
                  return false;
                }else{
                  let tempArr = [];
                  if(_this.monitData.data.length == 5){
                    _this.prev = _this.monitData.data[0];
                    _this.prev.key =  _this.monitData.data[0].vehicleId;
                    if(_this.interNum + 1 < _this.diff.length ){
                      _this.next = _this.diff[_this.interNum +1];
                      _this.next.key = _this.diff[_this.interNum +1].vehicleId;
                    }else{
                      _this.next = null;
                    }
                    for(let j=0;j<_this.monitData.data.length -1;j++){
                      tempArr[j] = _this.monitData.data[j+1];
                      tempArr[j].key = _this.monitData.data[j+1].vehicleId;
                    }
                    tempArr[4] = _this.diff[_this.interNum];
                    tempArr[4].key = _this.diff[_this.interNum].vehicleId;

                  }else{
                    for(let j=0;j<_this.monitData.data.length;j++){
                      tempArr[j] = _this.monitData.data[j];
                      tempArr[j].key = _this.monitData.data[j].vehicleId;
                    }
                    _this.diff[_this.interNum].key = _this.diff[_this.interNum].vehicleId;
                    tempArr.push(_this.diff[_this.interNum]);

                    if (_this.$qs.stringify(_this.currentMonit) == "") {
                      _this.currentIndex = 0;
                      _this.currentMonit = _this.diff[0];
                    }else{
                      _this.currentIndex = null;
                    }
                  }
                  _this.monitData.data = tempArr;
                  _this.interNum = _this.interNum +1;
                }
              }, 300);

            }

            if(this.mdiff.length) {
              this.mdiff.forEach((element, i) => {
                this.getItemWH(element);
              });
              this.minterNum = 0;
              if(this.minterT){
                clearInterval(this.minterT);
              }
              this.minterT = null;
              let _this = this;
              this.minterT = setInterval(function(){
                if(_this.minterNum == _this.mdiff.length -1 ){
                  clearInterval(_this.minterT);
                  _this.minterT = null;
                  return false;
                }else{
                  let tempArr = [];
                  if(_this.carData.data.length == 5){
                    _this.mprev = _this.carData.data[0];
                    _this.mprev.key =  _this.carData.data[0].vehicleId;
                    if(_this.minterNum + 1 < _this.mdiff.length){
                      _this.mnext = _this.mdiff[_this.minterNum +1];
                      _this.mnext.key = _this.mdiff[_this.minterNum +1].vehicleId;
                    }else{
                      _this.next = null;
                    }
                    for(let j=0;j<_this.carData.data.length -1;j++){
                      tempArr[j] = _this.carData.data[j+1];
                      tempArr[j].key = _this.carData.data[j+1].vehicleId;
                    }
                    tempArr[4] = _this.mdiff[_this.minterNum];
                    tempArr[4].key = _this.mdiff[_this.minterNum].vehicleId;

                  }else{
                    for(let j=0;j<_this.carData.data.length;j++){
                      tempArr[j] = _this.carData.data[j];
                      tempArr[j].key = _this.carData.data[j].vehicleId;
                    }
                    _this.mdiff[_this.minterNum].key = _this.mdiff[_this.minterNum].vehicleId;
                    tempArr.push(_this.mdiff[_this.minterNum]);

                    if (_this.$qs.stringify(_this.currentMonit) == "") {
                      _this.currentIndexs = 0;
                      _this.currentMonit = _this.mdiff[0];
                    }else{
                      _this.currentIndexs = null;
                    }
                  }
                  _this.carData.data = tempArr;
                  _this.minterNum = _this.minterNum +1;
                }
              }, 300);

            }


            let _this = this;
            clearTimeout(_this.t);
            _this.t = null;
            this.t = setTimeout(function(){
              if(_this.$router.currentRoute.path == "/carJudged/monitCar") {
                _this.getMonitData();
              }
            },3000);

          }else{
             this.$notify({
                        type: 'error',
                        message: '服务异常！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('服务异常！',{icon:2,title:"消息提示"});
          }


        });
      },
      changeMonit(item,index){
        this.currentIndexs = null
        this.currentMonit = item;
        this.currentIndex = index;
      },
      changeMonits(item,index){
        this.currentIndex = null
        this.currentMonit = item;
        this.currentIndexs = index;
      },
      getItemWH(monit){
        let leftTopX = monit.leftTopX;
        let leftTopY = monit.leftTopY;
        let rightBtmX = monit.rightBtmX;
        let rightBtmY = monit.rightBtmY;
        let imgw = monit.imageWidth;
        let imgh = monit.imageHeight;
        let imgwSmall = rightBtmX - leftTopX;
        let imghSmall = rightBtmY - leftTopY;
        //let carsPicture = document.querySelector(".carsPicture");
        let retwSmall = $(".carRecordItem").width() * 0.19;//carsPicture.clientWidth;
        let rethSmall = this.motorHeight * parseFloat($('html').css("fontSize").split("p")[0]);//carsPicture.clientHeight;
        let unitSmall = 1;
        let unitTop = 0;
        let unitLeft = 0;

        if (retwSmall / rethSmall < imgwSmall / imghSmall) {
          unitSmall = imgwSmall / retwSmall;
          unitTop = (rethSmall - imghSmall / unitSmall)/2;
        } else {
          unitSmall = imghSmall / rethSmall;
          unitLeft = (retwSmall - imgwSmall / unitSmall)/2;
        }
        // this.style.push({
        //   width: (imgw / unitSmall )+"px",
        //   height: (imgh / unitSmall)+"px",
        //   top: -(leftTopY / unitSmall) + unitTop +"px",
        //   left: -(leftTopX / unitSmall) + unitLeft +"px"
        // });
        monit.width = (imgw / unitSmall )+"px";
        monit.heigt = (imgh / unitSmall)+"px";
        monit.top = -(leftTopY / unitSmall) + unitTop +"px";
        monit.left = -(leftTopX / unitSmall) + unitLeft +"px";

      },

      compareRes(target){
        let source = this.oldResData;
        this.diff = [];
        if(target.length){
          for(let i=0;i<target.length;i++){
            //如果target下当前对象不在源数据里，则是新数据，差值加1
            if(!this.isInArr(target[i],source)){
              this.diff.push(target[i]);
            }
          }
        }
      },
      compareCarRes(target){
        let source = this.oldcarResData;
        this.mdiff = [];
        if(target.length){
          for(let i=0;i<target.length;i++){
            //如果target下当前对象不在源数据里，则是新数据，差值加1
            if(!this.isInArr1(target[i],source)){
              this.mdiff.push(target[i]);
            }
          }
        }
      },

      CompareObj1 (objA, objB){
        let flag = true;
        for(let key in objA) {
          if(objA[key] != objB[key]){
            flag = false;
            break;
          }
        }
        return flag;
      },
      isInArr1(itemObj, arrObj){
        let flag = false;
        if(arrObj.length){
          for(let j=0;j<arrObj.length;j++){
            if(this.CompareObj1(itemObj,arrObj[j])){
              flag = true;
              break;
            }
          }
        }
        return flag;
      },

      CompareObj (objA, objB){
        let flag = true;
        for(let key in objA) {
          if(objA[key] != objB[key]){
            flag = false;
            break;
          }
        }
        return flag;
      },
      isInArr(itemObj, arrObj){
        let flag = false;
        if(arrObj.length){
          for(let j=0;j<arrObj.length;j++){
            if(this.CompareObj(itemObj,arrObj[j])){
              flag = true;
              break;
            }
          }
        }
        return flag;
      }

    },
    destroyed () {
      clearInterval(this.interT)
      clearInterval(this.minterT)
    },
    mounted(){
      this.tId = this.tollgateId;
      if(this.tId){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
      }
      this.getMonitData();
    }
  }
</script>

<style scoped>
  .detailContainer {
    overflow-y:scroll;
    width: 100%;
    height: calc(100% - 0.5rem);
    padding: 0 0.2rem;
  }

  .contentHeader {
    height: 0.45rem;
    padding-left: 0.2rem;
    line-height: 0.45rem;
    font-size: 0.16rem;
    color: white;
    color: #c0c0c0;
    background-color: rgba(19, 41, 66, .9);
  }
  .carDesc{
    display: flex;margin-top:0.2rem;height: 2.57rem;
  }
  .carImg{
    position: relative;
    height: 2.57rem;
    width: 5.7rem;
    border: 1px solid rgba(12, 68, 135, 0.3);
    /* box-shadow: 0 2px 4px #bbb; */
  }
  .carImg img{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
  }
  .carImg .width{
    width: 100%;
  }
  .carImg .height{
    height: 100%;
  }
  .carImg .redLine{
      position: absolute;
      border:1px solid red;
    }
  .carImgInfo{
    position: absolute;
    box-sizing: border-box;
    z-index:9;
    bottom:0;left:0;right:0;top:0;
    margin: auto auto 0;
    padding: 0 0.1rem;
    height: 0.5rem;
    line-height:0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.16rem;
    color:#fff;
    background:rgba(255,255,255,0.1);
  }
  .carSmallImg{
    position: relative;
    height: 2.57rem;width:3rem;margin:0 0.3rem;
    border: 2px solid rgba(12, 68, 135, 0.3);
    overflow: hidden;
  }
  .carSmallImg img{
    position: absolute;
  }
  .carInfo{
    height:100%;width: 38%;
  }
  .carInfo td{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .carRecord {
    flex:1;
    margin-top: 0.1rem;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid rgba(12, 68, 135, 0.3);
    background-color: #061526;
    padding-bottom: 0.05rem;
    /* background-color: #ecf0f6; */
    /* border:1px solid #dcdfe6; */

  }

  .carRecordTitle {
    width: 100%;
    height: 0.4rem;
    display: flex;
    align-items: center;
    color:#409EFE ;
    font-weight: 600;
    padding-left: 0.2rem;
    background: url("../../assets/images/count/lefttitle.png") 0.1rem center no-repeat;
  background-size: 25% 70%;
  }
  .carRecordItem{
    width: 100%;
    height: 2.8rem;
    position: relative;
    overflow: hidden;
  }
  .carsDetail {
    /*float: left;*/
    position: absolute;
    width: 19%;
    margin: 0 1% 1%;
    border: 1px solid #204974;
    cursor: pointer;
  }
  .carsDetail.cur{
    border: 1px solid #409EFF;
  }
  .carsDetail.curs{
    border: 1px solid #409EFF;
  }
  .carRecordItem .next{
    top:0rem;
    left:-20%;
  }
  .carRecordItem .cdItem_4{

    top:0rem;
    left:0;
  }
  .carRecordItem .cdItem_3{

    top:0rem;
    left:20%;
  }
  .carRecordItem .cdItem_2{

    top:0rem;
    left:40%;
  }
  .carRecordItem .cdItem_1{

    top:0rem;
    left:60%;
  }
  .carRecordItem .cdItem_0{

    top:0rem;
    left:80%;
  }
  .carRecordItem .prev{
    top:1.8rem;
    left:100%;
  }
  .carsPicture {
    position: relative;
    width: 100%;
    height:1.67rem;
    overflow: hidden;
    /* display: flex;
    justify-content: center;
    align-content: center; */
  }
  .carsPicture1 {
    position: relative;
    width: 100%;
    height:2.67rem;
    overflow: hidden;
  }
  .carsPicture2{
    position: relative;
    width: 100%;
    height:2.67rem;
    overflow: hidden;
  }
  .carsPicture3 {
    position: relative;
    width: 100%;
    height:2.67rem;
    overflow: hidden;
  }
  .carsPicture4 {
    position: relative;
    width: 100%;
    height:2.67rem;
    overflow: hidden;
  }
  .carsPicture img{
    position: absolute;
    /* width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%; */
  }
  .carsPicture .width{
    width: 100%;
  }
  .carsPicture .height{
    height: 100%;
  }

  table {
    border: 1px solid #C4C8D0;
    width: 100%;
    height: 100%;
    color: #99c9fa;
    table-layout: fixed;
  }

  tr{
   height: 14.28%;
  }
  td{
    white-space: nowrap;
    font-size:0.14rem;
  }
  td:nth-child(even) {
    background-color: #051324;
    width: 25%;
    text-align: center;
    align-items: center;
    border: 1px solid #11263F;
    color: #99c9fa;
    overflow: hidden;
    padding: 0 4px;
  }

  td:nth-child(odd) {
    background-color: #051324;
    width: 25%;
    text-align: center;
    border: 1px solid #11263F;
  }

  .pageNation {
    position: absolute;
    bottom: 0;
    left: 34%;
    background-color: #ECEFF6;
  }

  .detailBot {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }

  .list-enter-active {
    transition: transform .3s;
  }
  .list-leave-active{
    transition: transform .3s;
  }
  .list-enter{
    transform: translateX(-100%);
  }
  .list-enter-to{
    transform: translateX(0);
  }
  .list-leave{
    opacity: .5;
    transform: translateX(0);
  }
  .list-leave-to{
    opacity: 0;
    transform: translateX(100%);
  }
  .list-move {
    transition: all .3s;
  }

  /* .cdItem_4.list_move{
    transition:none;
  }
  .cdItem_5.list_move{
    transition:none;
  } */

</style>
