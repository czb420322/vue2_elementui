<!--
 * @Author: your name
 * @Date: 2020-09-15 13:59:35
 * @LastEditTime : 2020-11-20 09:53:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha\vacp-wfes\src\page\casestudy\addcaseInfo\bayonetPoint.vue
 -->
<template>
  <el-dialog
    :title="'点位名称'+'-'+pointName +' '+ '任务名称'+':'+ taskName"
    :visible.sync="DialogVisiblel"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :appendToBody="true"
    :destroy-on-close="true"
    width="80%"
    top="7vh"
    @open="opendia"
    @close="closedia"
  >
    <div class="container">
      <div class="containerLeft">
        <el-table
          :data="imageData"
          class="firstTable"
          border
          highlight-current-row
          style="width: 100%"
          height="5.6rem"
          @row-click="handleClick"
        >
          <div slot="empty">
            <div class="noImg">
              <img src="../../../assets/updataImg/NoData.png">
            </div>
          </div>
          <el-table-column label="图片名称" show-overflow-tooltip :key="1" width="800">
            <template slot-scope="scope">
              <span>{{scope.row.fileName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片时间" show-overflow-tooltip :key="2">
            <template slot-scope="scope">
              <span>{{ scope.row.appearTime | nowTimes }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialogbtm">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[12, 24, 36]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>

      <div class="containerRight">
        <div class="containerRight_img" id="containerRight_img">
          <img
            class="carimgurl"
            @load="imgscale('.carimgurl')"
            v-show="currentCarInfo.sourceImgUrl != undefined"
            :src="currentCarInfo.sourceImgUrl"
            id="Image"
          >
          <span id="aaa" class="redsign"></span>
          <p
            title="以车搜车"
            class="searchPic"
            v-show="currentCarInfo.sourceImgUrl != undefined"
            @click="fastSearchCar()"
          ></p>
        </div>
        <div class="containerRight_textarea">
          <h3 style="margin-left:20px;color:#fff">车辆信息</h3>
          <div class="inputarea">
            <ul class="inputarea_ul">
              <li>
                <span>图片时间:</span>
                <input
                  type="text"
                  v-model="imageTime"
                  id="imgtime"
                  autocomplete="off"
                  style="width:217px;height:28px;padding-left:15px"
                  @focus="xxx"
                >

              </li>
              <li>
                <span>车辆类型:</span>
                <el-select v-model.trim="vehicleClass" @change="carTypeChange" @visible-change="getvehicleClassList">
                  <el-option :value="null" label="不限"></el-option>
                  <el-option
                    v-for="(item, index) in vehicleClassList"
                    :value="item.value"
                    :label="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <span>车辆品牌:</span>
                <!-- <el-input v-model="carBrand"></el-input> -->
                <el-select
                  v-model.trim="vehicleBrand"
                  @change="carBrandChange"
                  @visible-change="getCaseBaseData()"
                >
                  <el-option
                    v-for="item in carbrandList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <span>车牌颜色:</span>
                <!-- <el-input v-model="carYears"></el-input> -->
                <el-select
                  v-model.trim="carPlateColor"
                  @visible-change="getCarPlateColor(2,'plateClass')"
                >
                  <el-option
                    v-for="item in carPlateColorList"
                    :key="item.valueString"
                    :value="item.valueString"
                    :label="item.value"
                  ></el-option>
                </el-select>
              </li>


              <li>
                <span>车辆颜色:</span>
                <el-select
                  v-model.trim="vehicleColor"
                  @visible-change="getvehicleColor('VehicleKindColorType')"
                  @change="vehicleColorChange"
                >
                  <el-option
                    v-for="(item,index) in vehilceColorList"
                    :key="index"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <span>车牌号码:</span>
                <el-input v-model="plateNumber" maxlength="8" placeholder="请输入车牌号码"></el-input>
              </li>
            </ul>
          </div>
        </div>
        <div class="inputarea_bottom">
          <span>
            <el-button type="primary passBtn" @click="saveInfo">保 存</el-button>
          </span>
        </div>
      </div>
    </div>
    <div class="taskNumber">
      <span>
        图片上传总数量 :
        <span style="color:#d16f66">{{this.allNumber}}</span>
      </span>&nbsp;
      <span>
        图片识别成功数量 :
        <span style="color:#d16f66">{{this.finishNumber}}</span>
      </span>&nbsp;
      <span>
        图片识别失败数量 :
        <span style="color:#d16f66">{{this.failNumber}}</span>
      </span>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary cancleBtn" @click="closedia">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import scale from "../../../api/common/scale.js";
import vehicle from "../../../api/vehicle/vehicle.js";
import _ from "lodash";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex

export default {
  data() {
    return {
      DialogVisiblel: false,
      vehicleUuid: "", //uuid
      datas: "A",
      currentPage: 1, // 当前页码
      pageSize: 12, //每页显示的条数
      totalCount: 0, //数据总条数
      imageData: [],
      imageSrc: "", //切换每行数据时右上角显示当前图片
      imageTime: "", //图片时间
      currentCarInfo: {}, //当前车辆的所有信息
      vehicleClass: "", //车辆类型
      //   crossCarTime: "", //时间
      feature: "", //当前车辆的特征
      vehicleClassList: [], //车辆所有类型
      vehicleBrand: "", //车辆品牌
      carbrandList:[],//车辆品牌下拉信息列表
      selectOptionList: [],
      carPlateColor: "", //车牌颜色
      vehicleColor: "", //车辆颜色
      vehilceColorList:[],//车辆颜色下拉列表的信息
      plateNumber: "", //车牌号码
      features: "", //获取当前目标的特征
      editindex: 0, //每次切换的时候给当前的索引赋值
      carPlateColorList: [], //车牌类型
      showinfo: {}, //测试的
      pointName: "", //点位名称
      taskName: "", //任务名称
      clickrow: "", //当前点击的ID
      allNumber: 0, //总数量
      finishNumber: 0, //完成数量
      failNumber: 0, //失败数量
      ishavesign: false //快捷以车搜车按钮能否被点击
    };
  },
  mixins: [scale],
  filters: {},
  computed: {
    ...mapGetters([
      "targetToSearchImgCar" // 传过来的以车搜车的对象
    ])
  },
  watch: {
    lookbayonet(val) {
      this.DialogVisiblel = val;
    },
    imageTime : {
        handler(val,oldval){
            console.log(val,"val");
            console.log(oldval,"oldval");
        },
        deep :true
    }
  },

  props: {
    lookbayonet: Boolean,
    proptaskUuid: String,
    currentData: Object
  },

  methods: {
      ...mapMutations([
          'settargetToSearchImgCar',//
    ]),
    xxx(){
        console.log(this.imageTime,"xxxxxxxxxxxxxxx")
    },

    opendia() {
      this.getbayonetUploadRes();
      this.OpenTime();
    //   this.getvehicleClassList();//获取车辆类型下拉框的值
    //   this.getCarPlateColor(2,'plateClass')  //获取车牌颜色下拉框的值
    //   this.getCaseBaseData()//获取车辆类型下拉框的值
      this.showinfo = this.currentData;
      this.pointName = this.showinfo.cameraName;
      this.taskName = this.showinfo.taskName;
      this.clearGetUploadNumber();
      this.getUploadNumber();
    },
    //清除获取的数量
    clearGetUploadNumber() {
      this.allNumber = 0;
      this.failNumber = 0;
      this.finishNumber = 0;
    },
    //获取上传的总数量，失败数量和成功数量
    getUploadNumber() {
      let data = {
        taskUuid: this.proptaskUuid
      };
      this.$http
        .get("vsas/vehicle/dxh/getTaskStatus", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.allNumber = res.data.data.all;
            this.failNumber = res.data.data.fail;
            this.finishNumber = res.data.data.finish;
          }
        });
    },
    //没有数据时清空所有
    clearNodata(){
        this.imageTime = "";
        this.vehicleClass = "";
        this.vehicleBrand = "";
        this.carPlateColor = null;
        this.vehicleColor = "";
        this.plateNumber = "";
    },
    //获取车辆类型下拉框信息
    getvehicleClassList() {
      this.$http.get("sms/static/getVehicleKind").then(res => {
        this.vehicleClassList = res.data.data;
      });
    },
    //获取车牌颜色下拉信息
    getCarPlateColor(type, id) {
      let data = {
        attributeType: type,
        attributeId: id
      };
      this.$http
        .get("vsas/structure/getDictionaryZkyList", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.carPlateColorList = res.data.data;
          }
        });
    },
    handleClick(row) {
        // console.log(row,111111);
      let arr = document.getElementsByTagName("tbody")[2].children;
      for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove("current-row");
      }
      setTimeout(() => {
        let index = 0;
        index = _.findIndex(this.imageData, item => {
          return item.vehicleUuid == row.vehicleUuid;
        });
        document
          .getElementsByTagName("tbody")[2]
          .children[index].classList.add("current-row");
      }, 0);
      this.clickrow = row;
      this.vehicleUuid = row.vehicleUuid;
      this.getFirstCarInfo(row);
    },

    //获取车辆品牌下拉信息
    getCaseBaseData() {
        // let vehicleindex = ''
        // let index = _.findIndex(this.vehicleClassList, item => {
        //   return item.value == this.vehicleClass;
        // });
        // if(index == -1){
        //     vehicleindex = ''
        // }else{
        //     vehicleindex = this.vehicleClassList[index].field
        // }
      this.$http({
        url:'sms/static/getVehicleBrand/',
        method: "get",
      }).then(res => {
        if (res.statusText === "OK" && res.data.code === 200) {
          this.carbrandList = res.data.data;
          console.log(this.carbrandList,"@@@@");

        } else {
          this.$notify({
            type: "error",
            message: "获取下拉列表失败！",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('获取下拉列表失败！',{icon:5,title:"消息提示"});
        }
      });
    },
    getvehicleColor(val) {
      this.$http({
        url: "/sms/static/getTypeByCode",
        method: "get",
        params: {
          code: val
        }
      }).then(res => {
        if (res.statusText === "OK" && res.data.code === 200) {
          this.vehilceColorList = res.data.data;
        }
      });
    },

    //任务类型为卡口数据上传时调用
    getbayonetUploadRes(row) {
      let data = {
        taskUuid: this.proptaskUuid,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/vehicle/dxh/queryList", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.list.length) {
            this.imageData = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
            if (row) {
              let index = 0;
              if (this.imageData.length) {
                index = _.findIndex(this.imageData, item => {
                  return item.vehicleUuid == this.vehicleUuid;
                });
              }
              this.getFirstCarInfo(this.imageData[index]);
              setTimeout(() => {
                document
                  .getElementsByTagName("tbody")[2]
                  .children[index].classList.add("current-row");
              }, 0);
            } else {
              if (this.imageData.length) {
                this.getFirstCarInfo(this.imageData[0]);
                let arr = document.getElementsByTagName("tbody")[2].children;
                for (let i = 0; i < arr.length; i++) {
                  arr[i].classList.remove("current-row");
                }
                setTimeout(() => {
                  document
                    .getElementsByTagName("tbody")[2]
                    .children[0].classList.add("current-row");
                }, 10);
              }
            }
          } else {
            this.$notify({
              type: "warning",
              message: "暂无车辆识别信息!",
              position: "bottom-right",
              duration: 3000
            });
            this.clearNodata();
          }
        } else {
          this.$notify({
            type: "warning",
            message: "获取信息失败",
            position: "bottom-right",
            duration: 3000
          });
           this.clearNodata();
        }
      });
    },
    //打开时间
    OpenTime() {
      this.$nextTick(() => {
        laydate.render({
          elem: "#imgtime", //指定元素
          type: "datetime",
          btns: ["now", "confirm"],
          format: "yyyy-MM-dd HH:mm:ss",
          max: 1,
          done(value, date, endDate) {
            this.imageTime = value;
          }
        });
      });
    },
    closedia(res) {
      this.pageSize = 12;
      this.currentPage = 1;
      this.DialogVisiblel = false;
      this.editindex = 0;
      this.showinfo = {};
      this.imageData = [];
      this.totalCount = 0;
      this.currentCarInfo = {};
      this.ishavesign = false;
      //   this.getFirstCarInfo()
      this.clearNodata()
      this.$emit("childBylookbayonet", false, res);
    },
    // 监听每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getbayonetUploadRes();
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getbayonetUploadRes();
    },
    //点击图片时右边的数据同步更新
    handleChange(index, row) {
      this.vehicleUuid = row.vehicleUuid;
      this.getFirstCarInfo(row);
      this.editindex = index;
    },
    filtersCarPlateColors(val) {
      if (val == "单排蓝色") {
        return "0";
      } else if (val == "单排黄色") {
        return "1";
      } else if (val == "单排白色") {
        return "2";
      } else if (val == "单排黑色") {
        return "3";
      } else if (val == "双排黄色") {
        return "4";
      } else if (val == "双排白色") {
        return "5";
      } else if (val == "新能源黄绿色") {
        return "6";
      } else if (val == "新能源白绿色") {
        return "7";
      } else if (val == "未知") {
        return "-1";
      }
    },
    //保存用户更改
    saveInfo() {
      let aaa = document.getElementById("imgtime").value;
      if (aaa == "" || aaa == null) {
        this.$notify({
          type: "warning",
          message: "请选择图片时间！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }

      let data = {
        appearTime: new Date(aaa).getTime(),
        // plateClass: this.vehicleClass, //车辆类型
        vehicleClass: this.vehicleClass, //车辆类型
        plateNo: this.plateNumber, //车牌号码
        vehicleColor: this.vehicleColor, //车辆颜色
        plateColor: this.filtersCarPlateColors(this.carPlateColor), //车牌颜色
        vehicleBrand: this.vehicleBrand, //车辆品牌
        vehicleUuid: this.vehicleUuid //uuid
      };
      console.log(data,"data");
      data = this.$qs.stringify(data);
      this.$http.post("vsas/vehicle/dxh/update", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "修改成功",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "warning",
            message: "修改失败!",
            position: "bottom-right",
            duration: 3000
          });
        }
        this.getbayonetUploadRes(this.clickrow);
      });
    },
    filtersCarPlateColor(val) {
      if (val == "0") {
        return "单排蓝色";
      } else if (val == "1") {
        return "单排黄色";
      } else if (val == "2") {
        return "单排白色";
      } else if (val == "3") {
        return "单排黑色";
      } else if (val == "4") {
        return "双排黄色";
      } else if (val == "5") {
        return "双排白色";
      } else if (val == "6") {
        return "新能源黄绿色";
      } else if (val == "7") {
        return "新能源白绿色";
      } else if (val == null) {
        return "";
      } else if (val == -1) {
        return "未知";
      }
    },

    //默认右边展示第一条数据
    getFirstCarInfo(res) {
        this.$nextTick(()=>{
            if (
                this.currentCarInfo == "" ||
                this.currentCarInfo == null ||
                this.currentCarInfo == undefined
            ) {
                this.ishavesign = true;
            }
            this.initImage(res);
            this.currentCarInfo = res;
            this.imgscale('.carimgurl')
            this.vehicleUuid = res.vehicleUuid;
            this.imageTime = this.getDateStrings(res.appearTime);
            this.vehicleClass = res.vehicleClass;
            this.vehicleBrand = res.vehicleBrand;
            this.carPlateColor = this.filtersCarPlateColor(res.plateColor);
            this.vehicleColor = res.vehicleColor;
            this.plateNumber = res.plateNo;
            this.feature = res.feature;
        })
    },
    getDateStrings(date) {
      //date 为毫秒数
      let d = new Date(date);
      let mm =
        d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      let dd = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
      let hh = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
      let MM = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
      let ss = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds();
      return d.getFullYear() + "-" + mm + "-" + dd + " " + hh + ":" + MM + ":" + ss

    },
    initImage(row) {
      let imgs = document.getElementById("Image");
      let imgBox = document.getElementById("containerRight_img");
      let red = document.getElementById("aaa");
      let leftTopX = row.regionLeft; //目标相对图片的横坐标
      let leftTopY = row.regionTop; //目标相对图片的纵坐标
      let width = row.regionWidth; //目标相对图片的宽度
      let height = row.regionHeight; //目标相对图片高度
      setTimeout(() => {
        imgs.onload = () => {
          let imgw = imgs.naturalWidth; //图片的宽度
          let imgh = imgs.naturalHeight; //图片高度
          let retw = imgBox.clientWidth; //div的实际宽度
          let reth = imgBox.clientHeight; //div的实际高度
          let unit = 1; //图片和div的默认比例
          let posLeft = 0;
          let posTop = 0;
          //   console.log(imgs.width);
          //   console.log(imgw, imgh, "w+h");
          if (imgw != 0 || imgh != 0) {
            if (retw / reth < imgw / imgh) {
              unit = imgw / retw;
              posLeft = 0;
              posTop = (reth - imgh / unit) / 2;
            } else {
              unit = imgh / reth;
              posTop = 0;
              posLeft = (retw - imgw / unit) / 2;
            }
            red.style.width = width / unit + "px";
            red.style.height = height / unit + "px";
            red.style.top = leftTopY / unit + posTop + "px";
            red.style.left = leftTopX / unit + posLeft + "px";
          }
        };
      }, 10);
      imgs.src = row.sourceImgUrl;
    },
    //车辆类型
    carTypeChange(val) {
      this.vehicleClass = val;

    },
    //车辆品牌
    carBrandChange(val) {
      this.vehicleBrand = val;
    },
    //车牌颜色
    carPlateColorChange(val) {
      this.carPlateColor = val;
    },
    // 车辆颜色
    vehicleColorChange(val) {
      this.vehicleColor = val;
    },
    //获取特征
    getFeature(res) {
      let feature = "";
      let data = {
        caseUuid: res.caseUuid,
        uuid: res.vehicleUuid,
        deviceUuid: res.deviceUuid,
        type: 5
      };
      this.$http
        .get("vsas/structure/getFeature", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            this.features = res.data.data;
          } else {
            this.$notify({
              type: "warning",
              message: "获取特征值失败",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
        });
    },
    //快捷以车搜车
    fastSearchCar() {
        let data = {
            taskUuid: this.proptaskUuid,//任务id
            tasktype : 8,//点位类型
            parentPage : this.$parent.currentPage,//任务管理的当前页面
            currentPage: this.currentPage,//卡口数据详情的当前页面
            currentCarInfo:this.currentCarInfo,//当前的车辆信息
        }
        // console.log(data,"data");
      this.settargetToSearchImgCar(data)
      let res = this.currentCarInfo;
      let feature = res.feature;
      this.getFeature(res);
      this.closedia();
      this.$emit("ggg", res);
    },
    ttt(){
        console.log(this.imageTime,"这个时间");
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.container {
  width: 100%;
  height: 6rem;
  display: flex;
}
.containerLeft {
  width: 70%;
  height: auto;
}
.containerRight {
  width: 28%;
  height: auto;
  /* border: 1px solid red; */
}
.containerRight_img {
  position: relative;
  border: 1px solid blue;
  width: 3.42rem;
  height: 2rem;
  margin: 0 auto;
  overflow: hidden;
}
.containerRight_img img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}

.containerRight_textarea {
  height: 3.4rem;
  margin-top: 0.2rem;
}
.inputarea {
  width: 3.4rem;
  height: 3rem;
  margin: 0 auto;
}
.inputarea_ul li {
  color: #fff;
  display: block;
  width: auto;
  height: 30px;
  margin-top: 10px;
}
.inputarea_ul .el-input {
  width: 2.2rem;
}
.inputarea_bottom span {
  float: right;
}
.searchPic {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.2rem;
  height: 0.2rem;
  background: url("../../../assets/images/videoNewImg/searchPic.png") no-repeat;
  cursor: pointer;
}
.redsign {
  position: absolute;
  border: 1px solid red;
}
.el-table /deep/ .el-table__body .current-row {
  background: #344c88 !important;
}
.el-table /deep/ tr.current-row > td {
  background-color: transparent;
}
.taskNumber {
  color: #99c9fa;
  margin-top: 0.15rem;
  margin-left: 0.03rem;
}
.dialogbtm {
  margin-top: 0.1rem;
}
</style>
