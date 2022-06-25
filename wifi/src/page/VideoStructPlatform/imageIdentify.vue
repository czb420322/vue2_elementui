<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:20
 * @LastEditTime : 2020-11-18 16:30:16
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\caseinfomanage.vue
 * @
 -->
<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        class="sysname"
        :to="{path:'/videoCombat',query:{menuCode:100}}"
        style="z-index:999"
      >视频侦查></router-link>
      <p class="sysname">&nbsp;以图搜图</p>
    </div>

    <div class="content">
      <div class="changButton"></div>
      <!-- 条件筛选区域 -->
      <div class="searchCondition">
        <ul class="searchCondition_ul">
          <li>
            <span>
              开始时间：
              <i></i>
            </span>
            <input
              type="text"
              autocomplete="off"
              v-model="beginData"
              id="timeBegin"
              placeholder="请输入开始时间"
            >
          </li>
          <li>
            <span>
              结束时间：
              <i></i>
            </span>
            <input
              type="text"
              autocomplete="off"
              v-model="endData"
              id="timeEnd"
              placeholder="请输入结束时间"
            >
          </li>
          <li>
            <span>区域:</span>
            <el-select v-model="regionArea">
              <el-option value label>---请选择区域---</el-option>
            </el-select>
          </li>
        </ul>
      </div>
    </div>

    <div class="uploadImageArea">
      <div id="searchPerson" class="imgarea">
        <img id="imgPerson" :src="imgUrlShow">
      </div>

      <div class="operateArea">
        <el-button type="warning" class="searchBtn" @click="searchFeatureResult">查询</el-button>
        <el-button type="info" class="tryBtn" @click="clearImage">重置</el-button>
      </div>

      <div class="buttonarea">
        <span class="openupload" @click="openSearchCases">+</span>
      </div>
    </div>

    <identifyImage :openSearchCase="openSearchCase" @childsearch="childsearch"></identifyImage>
    <div class="footer"></div>
  </div>
</template>

<script>
import "../../common/laydate/laydate.js";
import identifyImage from "./identifyImage.vue";
import searchPrint from "./searchPrint.vue";
export default {
  components: {
    identifyImage,
    searchPrint
  },
  data() {
    return {
      openSearchCase: false,
      imgFaceData: {},
      beginData: "",
      endData: "",
      regionArea: "",
      imgUrlShow: "",
      sss: false,
      zkyFeature: "", //当前目标的特征
      typeflag: 0 //区别人，车，骑车人
    };
  },
  mixins: [vehicle],
  watch: {},
  created() {},
  destroyed() {},
  watch: {},
  methods: {
    childsearch(row1, row2, row3, flag) {
      this.openSearchCase = row3;
      this.typeflag = flag;
      // 对特征进行赋值
      this.zkyFeature = row1.Feature;
      this.$nextTick(() => {
        let imgs = document.getElementById("imgPerson"); //图片大小
        let imgBox = document.getElementById("searchPerson"); //div大小
        let leftTopX = row1.RegionLeft; //目标相对图片的横坐标
        let leftTopY = row1.RegionTop; //目标相对图片的纵坐标
        let imgw = row1.RegionWidth; //目标相对图片的宽度
        let imgh = row1.RegionHeight; //目标相对图片高度
        let retw = imgBox.clientWidth; //div的实际宽度
        let reth = imgBox.clientHeight; //div的实际高度
        // console.log(imgw, imgh);
        // console.log(retw, reth);
        let unit = 1; //图片和div的默认比例
        let posLeft = 0;
        let posTop = 0;
        //通过图片宽高比以及图片的实际比计算出人物的比率
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
        } else {
          unit = imgh / reth;
        }
        // console.log(unit, "比率");
        // 通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
        imgs.style.width = row1.SrcImageWidth / unit + "px";
        imgs.style.height = row1.SrcImageHeight / unit + "px";
        imgs.style.top = -(leftTopY / unit) + posTop + "px";
        imgs.style.left = -(leftTopX / unit) + posLeft + "px";
        this.imgUrlShow = row2;
      });
    },
    clearImage() {
      this.setImageWH();
      this.imgUrlShow = "";
    },
    setImageWH() {
      let imgs = document.getElementById("imgPerson");
      imgs.style.width = 0;
      imgs.style.height = 0;
    },
    searchFeatureResult() {
      let data = {
        feature: this.zkyFeature, // 特征
        featureFlag: this.typeflag, // 特征类型，1：行人，2：车辆，3：骑车人，4：人脸
        // caseUuid: this.$route.query.caseUuid,
        caseUuid: "1095F9F6225911EB81EC000C2964D8AB",
        // searchType: this.gosearchtype, // 查询类型：0：正常以图搜图，1：框选区域以图搜图
        searchType: 0,
        // includeThreshold: this.includeThreshold / 100, // 比对阈值
        includeThreshold: 0,
        // deviceUuids: this.deviceList.join(","), // 框选范围传过来的值
        deviceUuids: "", // 框选范围传过来的值
        startTime: this.beginData,
        endTime: this.endData
      };

      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/search", data).then(res => {
        console.log(res, "@@@@@@@@@@@@");
        if (res.data.code == 200) {
          if (!res.data.data.length) {
            return;
          } else {
            let list = res.data.data;
            console.log(list,"list");
            // let ccc = [];
            // res.data.data.forEach(item => {
            //   ccc.push(item.list);
            // });
            // console.log(ccc)

            // this.$router.push({
            //   path: "/casestudy/searchPrint",
            //   query: {
            //     caseUuid: this.$route.query.caseUuid,
            //     data:ccc
            //   }
            // });
          }
        }
      });
    },
    openSearchCases() {
      this.openSearchCase = true;
    }
  },
  mounted() {
    this.timeBegin = laydate.render({
      elem: "#timeBegin",
      type: "datetime",
      //min: -90, //90天前
      max: this.getCurrentDate(), //0天后
      btns: ["now", "confirm"],
      trigger: "click",
      done: (value, date, endDate) => {
        this.beginData = value;
        this.timeEnd.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });

    this.timeEnd = laydate.render({
      elem: "#timeEnd",
      type: "datetime",
      max: 1,
      btns: ["now", "confirm"],
      trigger: "click",
      done: (value, date, endDate) => {
        this.endData = value;
        this.timeBegin.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
  }
};
</script>


<style scoped>
/* @import "../../assets/css/global.css"; */
@import "../../assets/css/commom.css";
.topInfo {
  position: absolute;
  top: 0.6rem;
}
.content {
  height: calc(100% - 0.54rem - 1rem);
  position: relative;
  width: calc(100% - 0.3rem);
  top: 0.5rem;
  margin-left: 0.15rem;
  margin-right: 0.15rem;
  display: flex;
  flex-direction: column;
}
.changButton {
  margin-top: 0.6rem;
}
.searchCondition {
  width: 100%;
  height: 0.4rem;
  line-height: 0.3rem;
  margin-top: 15px;
}
.searchCondition_ul {
  display: flex;
}
.searchCondition_ul li {
  margin-left: 10px;
}
.searchCondition_ul li input {
  height: 0.3rem;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.6rem;
  font-size: 0.14rem;
  line-height: 0.6rem;
  color: rgba(153, 201, 250, 0.4);
  text-align: center;
}
.uploadImageArea {
  position: relative;
  top: 1.6rem;
  left: 6rem;
  width: 3rem;
  height: 4rem;
  border: 1px solid #1f4572;
}
.imgarea {
  width: 80%;
  height: 80%;
  border: 1px solid #ccc;
  margin: 0 auto;
  overflow: hidden;
  position: absolute;
  left: 0.3rem;
}
.imgarea img {
  position: absolute;
}
.buttonarea {
  position: absolute;
  top: 2rem;
  right: -55px;
  width: 50px;
  height: 50px;
  /* z-index: 999; */
}
.openupload {
  display: block;
  color: #99c9fa;
  cursor: pointer;
  font-size: 0.5rem;
}
.el-image {
  width: 100%;
  height: 100%;
}
.operateArea {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  position: absolute;
  left: 80px;
  bottom: 5px;
}
</style>


