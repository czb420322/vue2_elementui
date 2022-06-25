<!--
 * @Author: your name
 * @Date: 2020-09-14 16:46:30
 * @LastEditTime : 2020-12-23 13:43:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\page\casestudy\addcaseInfo\lablecollides.vue
 -->
<template>
  <div>
    <el-dialog
      title="标注碰撞"
      :visible.sync="dialogVisible"
      @close="closeDia"
      top="6vh"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="70%"
    >
      <div class="lablecollide" v-if="dialogVisible">
        <div class="labeleft">
          <p class="lefttitle">标注碰撞</p>
          <div class="maincontent">
            <p>
              <el-checkbox v-model="checkNowlable" @change="getnoelable">仅显示有标注的监控点</el-checkbox>
            </p>
            <div class="checkradio">
              <el-radio-group v-model="labeltype" @change="changetypelist">
                <el-radio :label="1">人</el-radio>
                <el-radio :label="4">骑车人</el-radio>
                <el-radio :label="2">车</el-radio>
              </el-radio-group>
            </div>
            <div class="firstlabel">
              <el-radio v-model="checklabel" @change="changeCheckLabel" label="1">两点时间碰撞</el-radio>
              <p>
                <span>出现位置1：</span>
                <el-select
                  v-model="deviceone"
                  class="selectpos"
                  :disabled="checklabel != 1"
                  @change="changeDevice($event,1)"
                  placeholder="请选择位置"
                >
                  <el-option
                    v-for="item in lableDeviceList"
                    :key="item.deviceUuid"
                    :label="item.cameraName"
                    :value="item.deviceUuid"
                  ></el-option>
                </el-select>
              </p>
              <p>
                <span>出现位置2：</span>
                <el-select
                  v-model="devicetwo"
                  class="selectpos"
                  :disabled="checklabel != 1"
                  @change="changeDevice($event,2)"
                  placeholder="请选择位置"
                >
                  <el-option
                    v-for="item in lableDeviceList"
                    :key="item.deviceUuid"
                    :label="item.cameraName"
                    :value="item.deviceUuid"
                  ></el-option>
                </el-select>
              </p>
              <p>
                <span>间隔时间：</span>
                <el-select
                  v-model="checktime"
                  :disabled="checklabel != 1"
                  @change="checktimelable"
                  class="firstinter intervaltime"
                  placeholder="请选择点位"
                >
                  <el-option
                    v-for="item in twoTime"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="timepype"
                  :disabled="checklabel != 1"
                  @change="checktimetype"
                  class="intervaltime"
                  placeholder="请选择点位"
                >
                  <el-option
                    v-for="item in timelist"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </p>
            </div>
            <div class="twolabel">
              <el-radio v-model="checklabel" @change="changeCheckLabel" label="2">单点时间碰撞</el-radio>
              <p>
                <span>出现位置：</span>
                <el-select
                  v-model="devicethree"
                  class="selectpos"
                  :disabled="checklabel != 2"
                  @change="changeDevice"
                  placeholder="请选择点位"
                >
                  <el-option
                    v-for="item in lableDeviceList"
                    :key="item.deviceUuid"
                    :label="item.cameraName"
                    :value="item.deviceUuid"
                  ></el-option>
                </el-select>
              </p>
              <p>
                <span>时间范围：</span>
                <span class="scopetime">
                  <b>从</b>
                  <input
                    id="beginData"
                    :disabled="checklabel != 2"
                    v-if="dialogVisible && checklabel == 2"
                    readonly
                    v-model="beginData"
                    type="text"
                  >
                  <input
                    :disabled="checklabel != 2"
                    v-if="dialogVisible && checklabel != 2"
                    readonly
                    v-model="beginData"
                    type="text"
                  >
                </span>
              </p>
              <p>
                <span class="scopetime scopetwotime">
                  <b>到</b>
                  <input
                    :disabled="checklabel != 2"
                    readonly
                    v-if="dialogVisible && checklabel == 2"
                    id="endData"
                    v-model="endData"
                    type="text"
                  >
                  <input
                    :disabled="checklabel != 2"
                    readonly
                    v-if="dialogVisible && checklabel != 2"
                    v-model="endData"
                    type="text"
                  >
                </span>
              </p>
            </div>
            <div class="threelabel">
              <el-radio v-model="checklabel" @change="changeCheckLabel" label="3">空间碰撞</el-radio>
              <p>
                <span>出现位置：</span>
                <el-select
                  v-model="devicefour"
                  class="selectpos"
                  :disabled="checklabel != 3"
                  @change="changeDevice"
                  placeholder="请选择点位"
                >
                  <el-option
                    v-for="item in lableDeviceList"
                    :key="item.deviceUuid"
                    :label="item.cameraName"
                    :value="item.deviceUuid"
                  ></el-option>
                </el-select>
              </p>
              <p>
                <span>时间范围：</span>
                <span class="scopetime">
                  <b>从</b>
                  <input
                    readonly
                    :disabled="checklabel != 3"
                    v-if="dialogVisible && checklabel == 3"
                    id="benginTime1"
                    v-model="benginDataTime"
                    type="text"
                  >

                  <input
                    readonly
                    :disabled="checklabel != 3"
                    v-if="dialogVisible && checklabel != 3"
                    v-model="benginDataTime"
                    type="text"
                  >
                </span>
              </p>
              <p>
                <span class="scopetime scopetwotime">
                  <b>到</b>
                  <input
                    :disabled="checklabel != 3"
                    v-if="dialogVisible && checklabel == 3"
                    id="endTime1"
                    readonly
                    v-model="endDataTime"
                    type="text"
                  >
                  <input
                    :disabled="checklabel != 3"
                    v-if="dialogVisible && checklabel != 3"
                    readonly
                    v-model="endDataTime"
                    type="text"
                  >
                </span>
              </p>
              <div class="threeContent">
                <div>
                  <p
                    v-for="(item,index) in spacelist"
                    @click="nowtheeIndex = index"
                    :class="{coloractive:index == nowtheeIndex}"
                    :key="index"
                  >
                    <span>{{item.begin}}</span>——
                    <span>{{item.end}}</span>
                  </p>
                </div>
              </div>
              <div class="threeBtn">
                <div>
                  <el-button
                    type="primary"
                    class="searchBtn"
                    @click="addalllable(1)"
                    :disabled="checklabel != 3"
                  >添加全时段</el-button>
                  <el-button
                    type="primary"
                    class="searchBtn"
                    @click="addalllable(2)"
                    :disabled="checklabel != 3"
                  >添加</el-button>
                </div>
                <div>
                  <el-button
                    type="primary"
                    class="searchBtn"
                    @click="deletethreelable(nowtheeIndex)"
                    :disabled="checklabel != 3"
                  >删除</el-button>
                </div>
              </div>
            </div>
            <div class="fourlabel">
              <el-radio v-model="checklabel" @change="changeCheckLabel" label="4">全标注碰撞</el-radio>
            </div>
          </div>
        </div>
        <div class="labelright">
          <div class="collidetop">
            <div class="collideleft collidecontent">
              <p class="collidetitle">
                <span>{{checklabel | collidesname}}</span>
                <span
                  class="markname"
                  :title="leftInfo.device == undefined ? '' : leftInfo.device.name"
                >监控点：{{leftInfo.device == undefined ? '' : leftInfo.device.name}}</span>
              </p>
              <p class="collidetime">标注时间： {{leftInfo | computedTime}}</p>
              <div class="collidevideo">
                <div v-if="leftInfo">
                  <img v-show="!showleftvideo" :src="leftInfo.videoCaptureUrl" alt="leftInfo">
                  <video
                    v-if="showleftvideo"
                    disablePictureInPicture
                    loop
                    id="leftvideo"
                    crossorigin="*"
                    controls
                  ></video>
                </div>
              </div>
              <div class="collidetitle">
                <div>
                  <el-button
                    type="primary"
                    @click="leftprev"
                    class="searchBtn"
                    :disabled="leftindex == 0 || addsuslist.length > 1"
                  >上一个</el-button>
                  <el-button
                    type="primary"
                    @click="leftnext"
                    class="searchBtn"
                    :disabled="leftindex == alllablelist -1 || addsuslist.length > 1"
                  >下一个</el-button>
                </div>
                <div>
                  <el-button type="primary" class="searchBtn" @click="playleft">播放</el-button>
                  <el-button type="primary" class="searchBtn" @click="stopleft">停止</el-button>
                </div>
              </div>
              <div class="collidelable">
                <p
                  v-if="labeltype == 1 && leftInfo != ''"
                  v-for="(item,index) in this.$constant.PERSON_STRUS"
                  :key="index"
                >
                  <span>{{item.value}}</span>
                  <span>{{$commons.isEmpty(leftInfo.markTarget[item.key]) ? '未知' : leftInfo.markTarget[item.key] }}</span>
                </p>
                <p
                  v-if="labeltype == 4 && leftInfo != ''"
                  v-for="(item,index) in this.$constant.BICYCLE_STRUS"
                  :key="index"
                >
                  <span>{{item.value}}</span>
                  <span>{{$commons.isEmpty(leftInfo.markTarget[item.key]) ? '未知' : leftInfo.markTarget[item.key] | filterType }}</span>
                </p>
                <p
                  v-if="labeltype == 2 && leftInfo != ''"
                  v-for="(item,index) in this.$constant.CAR_STRUS"
                  :key="index"
                >
                  <span>{{item.value}}</span>
                  <span>{{$commons.isEmpty(leftInfo.markTarget[item.key]) ? '未知' : leftInfo.markTarget[item.key]}}</span>
                </p>
                <!-- <p><span>属性</span> <span>值</span></p>
                                <p><span>性别</span> <span>男</span></p>
                                <p><span>年龄</span> <span>中年</span></p>
                <p><span>身高</span> <span>矮子</span></p>-->
              </div>
            </div>
            <div class="collidecenter">
              <p class="firstp" v-show="rightInfo != '' && leftInfo != ''">{{markdiff.time}}</p>
              <!-- <p class="firstp" v-show="rightInfo != '' && leftInfo != ''">23小时59分56秒</p> -->
              <p class="twop" v-show="rightInfo != '' && leftInfo != ''">{{markdiff.name}}</p>
              <p class="threep" @click="linkness">
                <!-- <el-button type="primary passBtn" @click="linkness">像</el-button> -->
              </p>
              <p class="fourp" @click="unlink">
                <!-- <el-button type="primary passBtn" @click="unlink">不像</el-button> -->
              </p>
            </div>
            <div class="collideright collidecontent">
              <p class="collidetitle">
                <span
                  class="markname"
                  :title="rightInfo.device == undefined ? '' : rightInfo.device.name"
                >监控点：{{rightInfo.device == undefined ? '' : rightInfo.device.name}}</span>
                <span v-show="checklabel != 1">当前进度 {{remainindex + "/" + (remainlist.length)}}</span>
                <span v-show="checklabel == 1">当前进度 {{remainindex + "/" + (twolablelist.length)}}</span>
              </p>
              <p class="collidetime">标注时间：{{rightInfo | computedTime}}</p>
              <div class="collidevideo">
                <div v-show="rightInfo">
                  <img v-show="!showrightvideo" :src="rightInfo.videoCaptureUrl" alt="leftInfo">
                  <video
                    v-if="showrightvideo"
                    disablePictureInPicture
                    loop
                    id="rightvideo"
                    crossorigin="*"
                    controls
                  ></video>
                </div>
              </div>
              <div class="collidetitle">
                <div>
                  <el-button
                    type="primary"
                    class="searchBtn"
                    @click="rightprev"
                    :disabled="rightindex == 0"
                  >上一个</el-button>
                  <el-button
                    type="primary"
                    class="searchBtn"
                    @click="rightnext"
                    :disabled="rightindex == alllablelist.length -1"
                  >下一个</el-button>
                </div>
                <div>
                  <el-button type="primary" class="searchBtn" @click="playright">播放</el-button>
                  <el-button type="primary" class="searchBtn" @click="stopright">停止</el-button>
                </div>
              </div>
              <div class="collidelable">
                <p
                  v-if="labeltype == 1 && rightInfo != ''"
                  v-for="(item,index) in this.$constant.PERSON_STRUS"
                  :key="index"
                >
                  <span>{{item.value}}</span>
                  <span>{{ $commons.isEmpty(rightInfo.markTarget[item.key]) ? '未知' : rightInfo.markTarget[item.key]}}</span>
                </p>
                <p
                  v-if="labeltype == 4 && rightInfo != ''"
                  v-for="(item,index) in this.$constant.BICYCLE_STRUS"
                  :key="index"
                >
                  <span>{{item.value}}</span>
                  <span>{{$commons.isEmpty(rightInfo.markTarget[item.key]) ? '未知' : rightInfo.markTarget[item.key] | filterType}}</span>
                </p>
                <p
                  v-if="labeltype == 2 && rightInfo != ''"
                  v-for="(item,index) in this.$constant.CAR_STRUS"
                  :key="index"
                >
                  <span>{{item.value}}</span>
                  <span>{{$commons.isEmpty(rightInfo.markTarget[item.key]) ? '未知' : rightInfo.markTarget[item.key]}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="collidebtn">
            <p>标注数量：{{addsuslist.length}}</p>
            <div class="lablereveal">
              <div v-for="(item,index) in addsuslist" :key="index" class="onelableinfo">
                <div
                  class="firstlableinfo"
                  :class="{active:index == nowactive}"
                  @click="clicknowlable(item,index)"
                >
                  <img :src="item.videoCaptureUrl" alt>
                  <span>{{item | computedTime}}</span>
                </div>
                <div class="twolableinfo">
                  <p v-show="item.time" class="btnonep" :title="item.time">{{item.time}}</p>
                  <p v-show="item.name" class="btntwop">{{item.name}}</p>
                </div>
              </div>
            </div>
            <p>
              <span>
                <el-button type="primary" class="searchBtn" @click="clearAllList">清空</el-button>
                <el-button type="primary" class="searchBtn" @click="deletelable">移除</el-button>
              </span>
              <span>
                <el-button type="primary" class="searchBtn" @click="createlable">创建嫌疑目标</el-button>
              </span>
            </p>
          </div>
        </div>

        <el-dialog
          title="创建嫌疑目标"
          :visible.sync="visible"
          width="700px"
          @close="closeDialog"
          :append-to-body="true"
          :close-on-press-escape="false"
          :close-on-click-modal="false"
          :destroy-on-close="true"
          @open="openDialog"
        >
          <div class="tab-main">
            <!--  新建嫌疑目标 -->
            <el-form
              class="row"
              ref="form1"
              :model="formModel"
              :rules="rules"
              status-icon
              label-width="120px"
              auto-complete="off"
              inline-message
            >
              <el-form-item label="嫌疑目标名称：" prop="susName">
                <el-input
                  v-model.trim="formModel.susName"
                  maxlength="10"
                  placeholder="请输入嫌疑目标名称"
                  style="width:217px"
                ></el-input>
              </el-form-item>

              <el-form-item label="嫌疑目标速度：" prop="speed">
                <el-select v-model="formModel.speed">
                  <el-option
                    v-for="(item, index) in speedList"
                    :key="index"
                    :label="item.speedName"
                    :value="item.speedValue"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item style="padding-top: 40px; margin-bottom: 0px;">
                <el-button type="primary cancleBtn" @click="visible = false">取 消</el-button>
                <el-button
                  type="primary"
                  class="passBtn"
                  v-no-more-click
                  @click.stop="confimHandler('form1')"
                  style="padding: 0.1rem 0.2rem"
                >确 定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import openlablecollides from "../../../api/casestudy/openlablecollide.js"; //js功能存放
import beginendtime from "../../../api/realvideo/BenEedTime.js"; //时间插件
import map from "../../../api/realvideo/map.js"; //时间插件
import _ from "lodash";
import flvjs from "../../../api/casestudy/flvPlay.js";

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {},
  watch: {
    openlablecollide(val) {
      this.dialogVisible = val;
    }
  },
  filters: {
    filterType(val) {
      if (val == "0") {
        return "否";
      } else if (val != "0" && val == "1") {
        return "是";
      } else if (val != "0") {
        return val;
      }
    }
  },
  props: {
    openlablecollide: Boolean, //打开模态框
    labelcollidedeviceList: Array, //点位数组
    checklabledemo: String //标注类型，是否是所有标注
  },
  mixins: [openlablecollides, beginendtime, map, flvjs],
  methods: {
    //关闭模态框
    closeDia() {
      this.clearInfo();
      this.lableDeviceList = []; //获取当前所有能存放标注的点位
      this.checkNowlable = false; //显示当前的标注的点位
      this.beginData = ""; //单点的开始时间
      this.endData = ""; //单点的结束时间
      this.benginDataTime = ""; //空间的开始时间
      this.endDataTime = ""; //空间的开始时间
      this.backuplable = []; //备份的数组
      this.alllablelist = []; //针对除去两点时间碰撞的标注list
      this.firstlablelist = []; //针对两点时间碰撞第一个点位的list
      this.remainlist = []
      this.twolablelist = []; //针对两点时间碰撞第二个点位的list
      this.leftindex = 0; //左边的索引
      this.rightindex = 0; //右边的索引
      this.leftInfo = ""; //左边的信息
      this.rightInfo = ""; //左边的信息
      this.addsuslist = []; //下方嫌疑目标的数组
      this.checkNowlable = false;
      this.backupcheckNowlable = false;
      this.showleftvideo = false;
      this.showrightvideo = false;
      this.spacelist = [];
      this.$emit("childbylablecolli", false);
    },
    //打开模态框
    opendia() {
      //   console.log(this.checklabledemo, 45465456);
      //   console.log(this.$parent.checklable, 333666);
      //给当前点位赋值
      this.lableDeviceList = this.labelcollidedeviceList;
      //打开的时候默认请求全标注
      // this.changeCheckLabel(this.checklabel)
      this.getDeviceLableList();
      if (this.lableDeviceList.length) {
        this.deviceone = this.lableDeviceList[0].deviceUuid;
        this.devicethree = this.lableDeviceList[0].deviceUuid;
        this.devicefour = this.lableDeviceList[0].deviceUuid;
      }
      if (this.lableDeviceList.length > 1) {
        this.devicetwo = this.lableDeviceList[1].deviceUuid;
      } else {
        this.devicetwo = "";
      }

      //获取当前时间
      this.getvideoTime();
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.lablecollide {
  height: 7.3rem;
}
.labeleft {
  width: 29.6%;
  height: 100%;
  border: 1px solid #235588;
  float: left;
  color: #99c9fa;
}
.lefttitle {
  line-height: 0.4rem;
  color: #fff;
  text-align: center;
  font-weight: 700;
}
.el-checkbox {
  color: #99c9fa;
}
.maincontent {
  padding: 0 0.1rem;
}
.checkradio {
  line-height: 0.5rem;
}
.firstlabel,
.twolabel,
.threelabel,
.fourlabel {
  margin-bottom: 0.1rem;
}

.firstlabel > p,
.twolabel > p,
.threelabel > p,
.fourlabel > p {
  height: 0.38rem;
  line-height: 0.38rem;
  padding-left: 0.25rem;
}

.firstlabel > p > span,
.twolabel > p > span,
.threelabel > p > span,
.fourlabel > p > span {
  float: left;
  width: 0.8rem;
}
.selectpos {
  margin-left: 0.3rem;
  width: calc(100% - 1.3rem);
}
.firstinter {
  margin-left: 0.3rem;
}
.intervaltime {
  width: 1.05rem;
}
.twolabel .scopetime,
.threelabel .scopetime {
  width: calc(100% - 0.8rem);
}
.twolabel .scopetime input,
.threelabel .scopetime input {
  width: calc(100% - 0.5rem);
  height: 0.28rem;
  border-radius: 4px;
  padding-left: 0.15rem;
}
.scopetwotime {
  margin-left: 0.8rem;
}
.scopetime b {
  display: inline-block;
  width: 0.3rem;
  height: 100%;
  text-align: center;
  font-weight: 400;
}
.threeContent {
  width: 100%;
  height: 0.8rem;
  padding: 0 0.2rem;
  margin-top: 0.05rem;
}
.threeContent > div {
  height: 100%;
  border: 1px solid #134276;
  border-radius: 4px;
  overflow: auto;
}
.threeContent > div p {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-around;
  line-height: 0.25rem;
  border-bottom: 1px solid #134276;
}
.threeBtn {
  height: 0.3rem;
  margin-top: 0.1rem;
  padding: 0 0.2rem;
}
.threeBtn div:first-child {
  float: left;
}
.threeBtn div:last-child {
  float: right;
}

.labelright {
  width: 70%;
  height: 100%;
  border: 1px solid #235588;
  float: right;
}
.collidetop {
  width: 100%;
  height: 70%;
  /* border: 1px solid red; */
}
.collidebtn {
  width: 100%;
  height: 30%;
  border: 1px solid #235588;
  padding: 0 0.1rem;
}
.collidebtn > p {
  line-height: 0.3rem;
  color: #99c9fa;
}
.collidebtn > div {
  width: 100%;
  height: calc(100% - 0.63rem);
  /* border: 1px solid #000; */
  overflow: auto;
  white-space: nowrap;
}
.lablereveal > div {
  min-width: 2rem;
  max-width: 3.5rem;
  height: 98%;
  display: inline-block;
  position: relative;
}

.onelableinfo div {
  float: left;
  color: #99c9fa;
  height: 100%;
  /* border: 1px solid #000; */
}
.firstlableinfo {
  width: 2rem;
  position: relative;
  border: 1px solid #235588;
}
.firstlableinfo span {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.firstlableinfo img {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.twolableinfo {
  width: 2.2rem;
  min-width: 0rem;
  max-width: 1.2rem;
  position: relative;
}

.collideleft {
  /* border: 1px solid pink; */
  float: left;
}
.collidecenter {
  width: 20%;
  height: 100%;
  /* border: 1px solid tan; */
  float: left;
  color: #99c9fa;
  position: relative;
}
.collidecenter p,
.twolableinfo p {
  text-align: center;
}
.firstp,
.twop,
.threep,
.fourp,
.btnonep,
.btntwop {
  width: 1.3rem;
  height: 0.35rem;
  line-height: 0.35rem;
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
.firstp,
.btnonep {
  background: url("../../../assets/case/left.png") no-repeat center center /
    100% 100%;
}
.twop,
.btntwop {
  background: url("../../../assets/case/right.png") no-repeat center center /
    100% 100%;
}
.threep {
  background: url("../../../assets/case/like.png") no-repeat center center /
    100% 100%;
}
.fourp {
  background: url("../../../assets/case/unlike.png") no-repeat center center /
    100% 100%;
}

.collidecenter .firstp {
  top: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.08rem;
}
.collidecenter .twop {
  top: 1.9rem;
}
.collidecenter .threep {
  bottom: 1.4rem;
}
.collidecenter .fourp {
  bottom: 0.8rem;
}
.twolableinfo .btnonep {
  width: 0.9rem;
  top: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.08rem;
}
.twolableinfo .btntwop {
  width: 0.9rem;
  top: 0.8rem;
}

.collideright {
  margin-left: 60%;
  /* border: 1px solid goldenrod; */
}
.collidecontent {
  width: 40%;
  height: 100%;
  padding: 0.1rem;
  color: #99c9fa;
}
.collidetitle {
  display: flex;
  justify-content: space-between;
  line-height: 0.4rem;
}
.markname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 2rem;
}
.collidetime {
  line-height: 0.3rem;
  border: 1px solid #134276;
  margin-bottom: 0.1rem;
}
.collidevideo {
  height: 50%;
  border: 1px solid #134276;
  position: relative;
}
.collidevideo div {
  width: 100%;
  height: 100%;
  position: relative;
}
.collidevideo img {
  /* width: 100%;
  height: 100%; */
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.collidevideo div video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.collidelable {
  height: 1.31rem;
  overflow: auto;
  border-top: 1px solid #235588;
}
.collidelable p {
  line-height: 0.25rem;
  padding: 0 0.1rem;
  border: 1px solid #235588;
  border-top: 0px;
}
.collidelable p span {
  display: inline-block;
  width: 49%;
}
.collidelable p span:first-child {
  border-right: 1px solid #235588;
}
.active {
  border: 1px solid #409eff;
  /* box-sizing: content-box; */
}
.coloractive {
  color: #409eff;
}
</style>
