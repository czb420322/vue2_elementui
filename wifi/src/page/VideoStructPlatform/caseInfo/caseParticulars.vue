<!--
 * @Author: your name
 * @Date: 2021-06-07 17:12:41
 * @LastEditTime : 2021-08-10 20:10:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev-changshu-noBigData\vacp-wfes\src\page\VideoStructPlatform\caseInfo\caseParticulars.vue
 -->
<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <span @click="routeVideoStrucPlat">首页 ></span>
      <span @click="routeCaseList">案件列表 ></span>
      <p class="sysname">&nbsp;{{caseMonicker}}</p>
      <p class="clicklink">
        <span @click="routeVideoStrucPlat">首页</span>
        <span @click="routeResourceManage">涉案视频管理</span>
        <span @click="goTasklist">任务管理</span>
        <span @click="routeSearchPrint">以图搜图</span>
        <span @click="routeVideoRetrieval">检索查询</span>
        <span @click="routeCaseList">案件管理</span>
        <span @click="routeMarkPool">标注池</span>
      </p>
    </div>
    <div class="mainContent">
      <div class="content">
        <div class="main-left">
          <p class="title">案件基本信息</p>
          <ul class="mainInfo">
            <li>
              <span>案件编号：</span>
              <input
                type="text"
                v-model.trim="caseNumber"
                @blur="getCaseNumber"
                maxlength="30"
                placeholder="请输入案件编号"
              >
            </li>
            <li>
              <span>
                <b class="must">*</b> 案件名称：
              </span>
              <input type="text" v-model="caseName" maxlength="50" placeholder="请输入案件名称">
            </li>
            <li class="casetime">
              <span>
                <b class="must">*</b> 案发时间：
              </span>
              <input
                id="timeone"
                class="caseNameSelect caseNameSelectDate"
                placeholder="请选择开始时间"
                readonly
                v-model="beginTime"
              >
              <b class="to">-</b>
              <input
                id="timetwo"
                class="caseNameSelect caseNameSelectDate"
                placeholder="请选择结束时间"
                readonly
                v-model="endTime"
              >
            </li>
            <li class="casearea">
              <span>案发区域：</span>
              <province ref="province"></province>
            </li>
            <li>
              <span>案发详址：</span>
              <input type="text" maxlength="50" v-model="caseLocation" placeholder="请输入案发地址">
              <div class="mustText mustText1" v-show="caseLocationMust">
                请输入小于50个字
                <i></i>
              </div>
            </li>
            <li>
              <span>案发经度：</span>
              <input type="text" v-model="caselng" placeholder="请输入案发经度" :disabled="isDisable">
              <div class="mustText mustText1" v-show="caselngMust">
                请输入正确的经度
                <i></i>
              </div>
            </li>
            <li>
              <span>案发纬度：</span>
              <input type="text" v-model="caselat" placeholder="请输入案发纬度" :disabled="isDisable">
              <div class="mustText mustText1" v-show="caselatMust">
                请输入正确的纬度
                <i></i>
              </div>
            </li>
            <li>
              <span>
                <b class="must">*</b> 案件类型：
              </span>
              <el-select v-model="caseCategory" placeholder="请选择案件类型">
                <el-option
                  v-for="(item,index) in CaseType"
                  :value="item.value"
                  :key="index"
                >{{ item.value }}</el-option>
              </el-select>
            </li>
            <li>
              <span>作案工具：</span>
              <el-select v-model="caseTool" placeholder="请选择作案工具">
                <el-option value label="未知"></el-option>
                <el-option
                  v-for="(item,index) in CaseTool"
                  :value="item.value"
                  :key="index"
                >{{ item.value }}</el-option>
              </el-select>
            </li>
            <li>
              <span>作案手段：</span>
              <el-select v-model="caseMeans" placeholder="请选择作案手段">
                <el-option value label="未知"></el-option>
                <el-option
                  v-for="(item,index) in CaseMethod"
                  :value="item.value"
                  :key="index"
                >{{ item.value }}</el-option>
              </el-select>
            </li>
            <li>
              <span>
                <b class="must">*</b>案件状态：
              </span>
              <el-select v-model="caseState" placeholder="请选择案件状态">
                <el-option
                  v-for="(item,index) in caseStates"
                  :label="item.value_name"
                  :value="item.value_code"
                  :key="index"
                ></el-option>
              </el-select>
            </li>

            <li>
              <span>作案时机：</span>
              <el-select v-model="caseOpportunity" placeholder="请选择作案时机">
                <el-option value label="未知"></el-option>
                <el-option
                  v-for="(item,index) in CaseOpportunity"
                  :value="item.value"
                  :key="index"
                >{{ item.value }}</el-option>
              </el-select>
            </li>
            <li>
              <span>危害程度：</span>
              <el-select v-model="harm" placeholder="请选择危害程度">
                <el-option value label="未知"></el-option>
                <el-option
                  v-for="(item,index) in CaseLevel"
                  :value="item.value"
                  :key="index"
                >{{ item.value }}</el-option>
              </el-select>
            </li>
            <li>
              <span>侵犯目标：</span>
              <el-select v-model="target" placeholder="请选择侵犯目标">
                <el-option value label="未知"></el-option>
                <el-option
                  v-for="(item,index) in CaseTarget"
                  :value="item.value"
                  :key="index"
                >{{ item.value }}</el-option>
              </el-select>
            </li>
            <li class="casetime">
              <span>简要案情：</span>
              <textarea
                style="resize: none"
                maxlength="500"
                v-model="caseDescribe"
                placeholder="请输入简要案情"
              ></textarea>
              <div class="mustText mustText1" v-show="caseDescribeLen">
                请输入少于500个字符
                <i></i>
              </div>
            </li>
            <li class="casetime">
              <p style="text-align:center">
                <el-button type="primary" class="searchBtn" size="small" @click="updateTrue">保存</el-button>
                <el-button type="primary" class="searchBtn" size="small" @click="exportCase(1)">导出卷宗</el-button>
              </p>
            </li>
          </ul>
        </div>
        <div class="main-center">
          <p class="title">嫌疑目标</p>
          <div>
            <div class="checkSus">
              <el-select v-model.trim="suspicion" @change="changeSus" value-key="suspicionUuid">
                <el-option
                  :value="alltype"
                  :key="alltype.suspicionType"
                  :label="alltype.suspicionName"
                ></el-option>
                <el-option
                  v-for="sus in suspcitionList"
                  :key="sus.suspicionUuid"
                  :label="sus.suspicionName"
                  :value="sus"
                ></el-option>
              </el-select>
              <el-button
                type="primary"
                class="searchBtn"
                :disabled="suspicion.suspicionType != -1"
                @click="addsus"
              >新建</el-button>
              <el-button type="primary" :disabled="isall" class="searchBtn" @click="openUpdte()">编辑</el-button>
              <el-button type="primary" :disabled="isall" class="delBtn" @click="ajaxDel">删除</el-button>
            </div>
            <div class="property pd-10">
              <ul>
                <li>嫌疑目标名称:{{susObjeck.suspicionName}}</li>
                <li>嫌疑目标类型:{{susObjeck.suspicionType | sustype}}</li>
                <li>嫌疑目标速度:{{susObjeck | speedType}}</li>
                <li
                  v-show="suspicion.suspicionType !=3"
                >嫌疑目标性别:{{susObjeck.suspicionSex == undefined ? '' : (susObjeck.suspicionSex == '0' ? '男' : '女')}}</li>
                <li v-show="suspicion.suspicionType !=3">嫌疑目标电话:{{susObjeck.suspicionPhone}}</li>
                <li v-show="suspicion.suspicionType !=3">嫌疑目标身份证:{{susObjeck.suspicionCard}}</li>
                <li
                  :title="susObjeck.suspicionAddress"
                  v-show="suspicion.suspicionType !=3"
                >嫌疑目标住址:{{susObjeck.suspicionAddress}}</li>
                <li
                  :title="susObjeck.description"
                  v-show="suspicion.suspicionType !=3"
                >嫌疑目标描述:{{susObjeck.description}}</li>
              </ul>
            </div>
            <div class="yetSus pd-10">
              <div class="modelPart">
                <div class="titleLine"></div>
                <div class="titleTxt" v-show="!AllSusInfo">已关联标注池</div>
                <div class="titleTxt" v-show="AllSusInfo">嫌疑目标信息</div>
              </div>
              <!-- 这是展示标注 -->
              <div class="vmark" v-show="!AllSusInfo">
                <ul class="mainul mainSmallul">
                  <li v-for="(item,index) in nowSuslist" :key="index">
                    <div :id="'vmarkLi'+index">
                      <img src="@/assets/error_none.png" alt="暂无图片" v-if="!item.videoCaptureUrl">
                      <img
                        class="imgwidth"
                        :id="'vmarker_'+index"
                        :src="item.videoCaptureUrl"
                        alt="暂无图片"
                        v-if="item.videoCaptureUrl"
                      >
                    </div>
                    <p>
                      <span :title="item.markName ">标注名称：{{ item.markName }}</span>
                      <span :title="item | lableTime">时间：{{ item | lableTime }}</span>
                    </p>
                    <el-button type="primary" class="searchBtn bigBook" @click="lookImg(item)">查看大图</el-button>
                    <el-button
                      type="primary"
                      class="searchBtn"
                      v-no-more-click
                      @click="cancleSus(item)"
                    >解除</el-button>
                  </li>
                </ul>
              </div>
              <!-- 这是展示嫌疑目标信息 -->
              <div class="vmark susTarget" v-show="AllSusInfo">
                <ul>
                  <li v-for="(item,index) in suspcitionList" :key="index" @click="changeSus(item)">
                    <span :title="item.suspicionName">嫌疑目标名称 : &nbsp;{{item.suspicionName}}</span>
                    <span>嫌疑目标类型 : &nbsp;{{item.suspicionType | sustype}}</span>
                    <span>嫌疑目标速度 : &nbsp;{{item | speedType}}</span>
                    <span
                      v-show="item.suspicionType !=3"
                    >嫌疑目标性别 : &nbsp;{{item.suspicionSex == undefined ? '' : (item.suspicionSex == '0' ? '男' : '女')}}</span>
                    <span v-show="item.suspicionType !=3">嫌疑目标电话 : &nbsp;{{item.suspicionPhone}}</span>
                    <span
                      :title="item.suspicionAddress"
                      v-show="item.suspicionType !=3"
                    >嫌疑目标住址 : &nbsp;{{item.suspicionAddress}}</span>
                    <span
                      :title="item.description"
                      v-show="item.suspicionType !=3"
                    >嫌疑目标描述 : &nbsp;{{item.description}}</span>
                    <span v-show="item.suspicionType !=3">嫌疑目标身份证 : &nbsp;{{item.suspicionCard}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="main-right">
          <p class="title">标注池</p>
          <ul class="mainul mainSmallul">
            <li v-for="(item,index) in imglist" :key="index">
              <div :id="'vmarkLi'+index">
                <b title="删除标注" @click.stop="dellable(item,index)" class="deleteLable">
                  <img src="../../../assets/images/videoNewImg/commhand/delete.png" alt>
                </b>
                <img src="@/assets/error_none.png" alt="暂无图片" v-if="!item.videoCaptureUrl">
                <img
                  class="imgwidth"
                  :id="'vmarker_'+index"
                  :src="item.videoCaptureUrl"
                  alt="暂无图片"
                  v-if="item.videoCaptureUrl"
                >
              </div>
              <p>
                <span :title="item.markName ">标注名称：{{ item.markName }}</span>
                <span :title="item | lableTime">时间：{{ item | lableTime }}</span>
                <!-- <span :title="item.device.name">位置：{{ item.device.name }}</span> -->
              </p>
              <el-button type="primary" class="searchBtn bigBook" @click="lookImg(item)">查看大图</el-button>
              <el-button type="primary" class="searchBtn" v-no-more-click @click="handSus(item)">关联</el-button>
            </li>
          </ul>
          <el-pagination
            style="float: right;margin-right: 0.1rem;margin-top:0.1rem"
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :title="updateType + '嫌疑目标'"
      :visible.sync="addsusTarget"
      :append-to-body="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="closeDia"
      @open="openDia"
      width="20%"
    >
      <span>
        <div class="addleft">
          <p class="tilte_top">
            <b>|</b>&nbsp;&nbsp;嫌疑目标信息
          </p>
          <p>
            <!-- <b class="must" style="color:red">*</b> -->
            <span>
              <b class="must" style="color:red">*</b>+嫌疑目标名称:
            </span>
            <input
              type="text"
              maxlength="10"
              v-model.trim="susName"
              :disabled="suspicionSee"
              placeholder="请输入嫌疑目标名称"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            >
          </p>
          <p>
            <span>嫌疑目标类型:</span>
            <el-radio-group v-model="person" @change="changeRadio">
              <el-radio label="1" :disabled="personDisabled" ref="person1">人</el-radio>
              <el-radio label="2" :disabled="personDisabled" ref="person2">骑车人</el-radio>
              <el-radio label="3" :disabled="personDisabled" ref="person3">车辆</el-radio>
            </el-radio-group>
          </p>
          <p v-show="isSpeed == 1">
            <span>嫌疑目标速度:</span>
            <el-radio-group v-model.trim="speed" @change="changeSpeed">
              <el-radio label="1.39">常速</el-radio>
              <el-radio label="2.22">快速</el-radio>
              <el-radio label="0.83">慢速</el-radio>
            </el-radio-group>
          </p>
          <p v-show="isSpeed == 2">
            <span>嫌疑目标速度:</span>
            <el-radio-group v-model.trim="speed" @change="changeSpeed">
              <el-radio label="4.16">常速</el-radio>
              <el-radio label="5.55">快速</el-radio>
              <el-radio label="2.77">慢速</el-radio>
            </el-radio-group>
          </p>
          <p v-show="isSpeed == 3">
            <span>嫌疑目标速度:</span>
            <el-radio-group v-model.trim="speed" @change="changeSpeed">
              <el-radio label="8.33">常速</el-radio>
              <el-radio label="13.88">快速</el-radio>
              <el-radio label="5.55">慢速</el-radio>
            </el-radio-group>
          </p>
          <p class="susex" v-show="isShow">
            <span>嫌疑目标性别:</span>
            <el-select v-model.trim="susSex" :disabled="suspicionSee" ref="susSex">
              <el-option
                v-for="(item,index) in sexlist"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
          <p v-show="isShow" class="tlephone">
            <span>嫌疑目标电话:</span>
            <input
              type="text"
              v-model.trim="susNumber"
              maxlength="11"
              :disabled="suspicionSee"
              ref="susNumber"
              placeholder="请输入嫌疑目标电话"
            >
          </p>
          <p v-show="isShow" class="idNumber">
            <span>嫌疑目标身份证:</span>
            <input
              type="text"
              v-model.trim="susStatus"
              maxlength="18"
              :disabled="suspicionSee"
              ref="susStatus"
              placeholder="请输入嫌疑目标身份证"
            >
          </p>
          <p v-show="isShow">
            <span>嫌疑目标住址:</span>
            <input
              type="text"
              v-model.trim="susAddress"
              maxlength="50"
              :disabled="suspicionSee"
              ref="susAddress"
              placeholder="请输入嫌疑目标住址"
            >
          </p>
          <p class="describe">
            <span v-show="isShow">嫌疑目标描述:</span>
            <textarea
              v-show="isShow"
              v-model.trim="susDescribe"
              style="resize: none"
              maxlength="100"
              :disabled="suspicionSee"
              ref="susDescribe"
              placeholder="请输入嫌疑目标描述"
            ></textarea>
          </p>
          <el-dialog
            :title="suspicionSee ? '查看特征信息' : '添加特征信息'"
            :modal="false"
            :visible.sync="DialogVisible"
            width="70%"
          >
            <span v-if="DialogVisible">
              <Suspects3D
                :suspicionUuid="suspicionUuid"
                :suspicionSee="suspicionSee"
                :Suspects3DType="person"
              ></Suspects3D>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary cancleBtn" @click="DialogVisible = false">关 闭</el-button>
            </span>
          </el-dialog>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="addsusTarget = false">取 消</el-button>
        <el-button type="primary passBtn" @click="addUpdate" :disabled="isclick">确 定</el-button>
      </span>
    </el-dialog>
    <lookBigImg :isShowBig="isShowBig" :bigImgUrl="bigImgUrl" @childBigClose="childBigClose"></lookBigImg>
  </div>
</template>

<script>
import Province from "@/components/province";
import lookBigImg from "./lookBigImg.vue";
let moment = require("moment");
import addcase from "../../../api/realvideo/addcase.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import verify from "../../../api/casestudy/verify.js";
export default {
  data() {
    return {
      susObjeck: {}, //获取的嫌疑人对象
      suspicionType: "-1", //嫌疑人类型
      suspcitionList: [], //嫌疑人目标
      suspicion: {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "全部(未关联)"
      }, //嫌疑人对象
      susNumber: "",
      susStatus: "",
      susAddress: "",
      susDescribe: "",
      is3Ddisabled: false,
      updateType: "新增",
      isall: false,
      suspicionUuid: "", //嫌疑人ID
      hhh: false,
      nowSuslist: [], //当前嫌疑人的目标
      addsusTarget: false, //打开第二层模态框
      susName: "",
      suspicionSee: false,
      susNameMust: false,
      person: "1", //类型，
      speed: "1.39",
      isSpeed: "1",
      isShow: true,
      susSex: "0",
      sexlist: [{ value: "0", name: "男" }, { value: "1", name: "女" }],
      personDisabled: false,
      DialogVisible: false,
      isFirst: 0,
      caseNumber: "", //案件编号
      caseName: "未知", //案发名称
      beginTime: moment().format("YYYY-MM-DD HH:mm:ss"), //开始时间
      endTime: moment().format("YYYY-MM-DD HH:mm:ss"), //结束时间
      caseLocation: "", //案发详址
      caselng: "", //案发经度
      caselat: "", //案发纬度
      caseState: 0, //案发状态
      caseCategory: "其他", //案件类型
      caseTool: "未知", //作案工具
      caseMeans: "未知", //作案手段
      caseStates: [],
      caseOpportunity: "未知", //作案时机
      harm: "未知", //危害程度
      target: "未知", //侵犯目标
      caseDescribe: "", //简要案情
      pointLng: false,
      pointLat: false,
      caseUuid: "",
      isDisable: false,
      nowIndex: null,
      nextNowIndex: null,
      isclick: false,
      showViewer: false,
      caseMonicker: "",
      bigImgUrl: "",
      isShowBig: false,
      imglist: [], //嫌疑人目标管理
      pageSizes: [15, 20, 25],
      pageSize: 15,
      totalCount: 0,
      currentPage: 1,
      alltype: {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "全部(未关联)"
      },
      EditOrNew: "", //这个接收路由的参数，来判断是新增还是编辑
      AllSusInfo: true, //这个参数为true，代表进来时展示所有嫌疑目标信息
      updateFlag: "" //从当前获取这个值，是否修改了案件属性，来决定导出卷宗能不能点  0不能导出，   1可以导出
    };
  },
  components: { Province, lookBigImg },
  mixins: [addcase, beginEnd, verify],
  mounted() {
    if (this.$route.query.caseIndex == "1") {
      this.caseMonicker = "新建案件";
      this.caseName = "未知"; //案发名称
      this.newList(); // 新建案件
      this.suspicion = {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "全部(未关联)"
      };
      setTimeout(() => {
        this.susObjeck = {};
      }, 1000);
      //等于1代表用户是新增案件，必须修改案件属性
      this.EditOrNew = 1;
      setTimeout(() => {
        let placeCode = sessionStorage.getItem("defaultRegion");
        this.$refs.province.selected = placeCode.substring(0, 2) + "0000";
        this.$refs.province.selectcity = placeCode.substring(0, 4) + "00";
        this.$refs.province.selectdist = placeCode;
        this.$refs.province.getSelectData();
        // this.OpenTheTime("#timeone", "#timetwo");
        this.onLoadTime("#timeone", "#timetwo");
      }, 100);
    } else if (this.$route.query.caseIndex == "2") {
      this.caseMonicker = "编辑案件";
      //等于2就代表用户是编辑案件，不需要修改案件属性
      this.EditOrNew = 2;
      let caseid = this.$route.query.caseUuid;
      this.caseUuid = caseid;
      //编辑进来获取案件基本信息
      this.getCaseBaseInfo(caseid);
    }
    this.getAllMarker(-1, null); // 标注池
    this.getCaseType(); // 案件类型
    this.getCaseOpportunity(); // 作案时机
    this.getCaseLevel(); // 危害程度
    this.getCaseTarget(); // 侵犯目标
    this.getCaseMethod(); // 作案手段
    this.getCaseTool(); // 作案工具
    this.getCaseStates(); // 案件状态
    this.getSuspcition(this.isFirst);
  },
  filters: {
    sustype(val) {
      if (val == 1) {
        return "嫌疑人";
      } else if (val == 2) {
        return "嫌疑骑车人";
      } else if (val == 3) {
        return "嫌疑车辆";
      }
    },
    speedType(val) {
      if (val.speed == "1.39" || val.speed == "4.16" || val.speed == "8.33") {
        return "常速";
      } else if (val.speed == "2.22" || val.speed == "13.88") {
        return "快速";
      } else if (val.suspicionType == 2 && val.speed == "5.55") {
        return "快速";
      } else if (val.suspicionType == 3 && val.speed == "5.55") {
        return "慢速";
      } else if (val.speed == "0.83" || val.speed == "2.77") {
        return "慢速";
      }
    },
    lableTime(val) {
      let nowplaytime;
      let alltime;
      if (val.absoluteTime) {
        nowplaytime = new Date(val.absoluteTime).getTime();
        alltime = Number(nowplaytime) + Number(val.offset * 1000);
      } else {
        nowplaytime = new Date(val.videoStartTime).getTime();
        alltime = Number(nowplaytime) + Number(val.relativeTime);
      }
      let date = new Date(alltime);
      let YY = date.getFullYear();
      let MM =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
    }
  },
  methods: {
    openDia() {},
    //封装一个时间测试一下
    handle(val) {
      let date = new Date(val);
      let YY = date.getFullYear();
      let MM =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
    },
    // 新建案件
    newList() {
      this.$http.post("pca/video/caseInfo/caseBase/save").then(res => {
        this.caseUuid = res.data.data.caseUuid;
        this.updateFlag = res.data.data.updateFlag;
        this.getSuspcition(this.isFirst);
      });
    },
    // 案件状态
    getCaseStates() {
      this.$http.get("sms/static/getCaseState").then(res => {
        if (res.data.code == 200) {
          this.caseStates = res.data.data;
        }
      });
    },
    //切换类型
    changeRadio(row) {
      if (row == 1) {
        this.isShow = true;
        this.isSpeed = row;
        this.speed = "1.39";
      } else if (row == 2) {
        this.isShow = true;
        this.isSpeed = row;
        this.speed = "4.16";
      } else {
        this.isShow = false;
        this.isSpeed = row;
        this.speed = "8.33";
      }
    },
        onLoadTime(text1,text2){
            var timeBegin
            var timeEnd
            timeBegin = laydate.render({
                elem: text1,
                type: "datetime",
                btns: ['now','confirm'],
                max: Date.parse(new Date()), //0天后
                done: (value, date, endDate) => {
                    this.beginTime = value;
                    timeEnd.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    }
                    if(new Date(this.endTime).getTime() < new Date(this.beginTime).getTime()){
                        this.endTime = this.beginTime
                    }
                }
            })

      timeEnd = laydate.render({
        elem: text2,
        type: "datetime",
        max: 1,
        btns: ["now", "confirm"],
        value: new Date(),
        done: (value, date, endDate) => {
          this.endTime = value;
          if (
            new Date(this.endTime).getTime() <
            new Date(this.beginTime).getTime()
          ) {
            this.beginTime = this.endTime;
          }
        }
      });
    },
    // 切换速度
    changeSpeed(row) {
      this.speed = row;
    },
    // 标注池
    getAllMarker(type, uuid) {
      let data = {
        caseUuid: null,
        suspicionType: type,
        suspicionUuid: uuid,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        createUser: null,
        deviceUuid: null
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/video/markPoll/new/list", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.length == 0) {
            this.imglist = [];
            this.totalCount = 0;
          } else {
            if (res.data.data.list.length == 0 && res.data.data.pageNum > 1) {
              this.currentPage--;
              this.getAllMarker(type, uuid);
            } else {
              this.imglist = res.data.data.list;
              this.totalCount = res.data.data.totalCount;
            }
          }
        }
      });
    },
    // 打开新增嫌疑目标
    addsus() {
      this.isShow = true;
      this.personDisabled = false;
      this.addsusTarget = true;
      this.updateType = "新增";
      //执行清空模态框的所有数据
      this.reset();
    },
    // 保存
    updateTrue() {
      if (
        this.$commons.regtest(this.caseName) ||
        this.$commons.regtest(this.caseNumber) ||
        this.$commons.regtest(this.caseLocation) ||
        this.$commons.regtest(this.caseDescribe)
      ) {
        this.$notify({
          type: "warning",
          message: "禁止输入特殊字符(<,&,&)",
          position: "bottom-right",
          duration: 2000
        });
        return;
      }
      let lngreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
      let latreg = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/;
      this.caselng = this.caselng == "" ? null : this.caselng;
      this.caselat = this.caselat == "" ? null : this.caselat;

      if (!lngreg.test(this.caselng) && this.caselng != null) {
        this.$notify({
          type: "warning",
          message: "请输入正确的经度",
          position: "bottom-right",
          duration: 2000
        });
        return;
      }
      if (!latreg.test(this.caselat) && this.caselat != null) {
        this.$notify({
          type: "warning",
          message: "请输入正确的纬度",
          position: "bottom-right",
          duration: 2000
        });
        return;
      }
      if (this.caselng == 0 || this.caselat == 0) {
        this.$notify({
          type: "warning",
          message: "请输入正确的经纬度",
          position: "bottom-right",
          duration: 2000
        });
        return;
      }
      this.getCaseNumber();
      if (
        this.caseNumber == "" &&
        this.caseName == "未知" &&
        this.caseOpportunity == "未知" &&
        this.caseCategory == "其他" &&
        this.caseLocation == "" &&
        this.harm == "未知" &&
        this.caseMeans == "未知" &&
        this.target == "未知" &&
        this.caseTool == "未知" &&
        this.caseDescribe == ""
      ) {
        this.$notify({
          type: "warning",
          message: "请修改案件属性",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.caselng == null && this.caselat == null) {
        this.caselng = "";
        this.caselat = "";
      }
      if (this.caseName == "") {
        this.$notify({
          type: "warning",
          message: "案件名称为必填项",
          position: "bottom-right",
          duration: 3000
        });
      } else if (this.beginTime == "") {
        this.$notify({
          type: "warning",
          message: "案发开始时间为必填项",
          position: "bottom-right",
          duration: 3000
        });
      } else if (this.caseLocation.length > 50) {
        this.caseLocationMust = true;
        setTimeout(() => {
          this.caseLocationMust = false;
        }, 1000);
      } else if (this.disabledata) {
        this.$notify({
          type: "warning",
          message: "该案件编号已存在",
          position: "bottom-right",
          duration: 3000
        });
      } else if (this.caseDescribe.length > 500) {
        this.caseDescribeLen = true;
        setTimeout(() => {
          this.caseDescribeLen = false;
        }, 1000);
      } else if (this.caselng != "" && this.caselat == "") {
        this.caselatMust = true;
        setTimeout(() => {
          this.caselatMust = false;
        }, 1000);
      } else if (this.caselng == "" && this.caselat != "") {
        this.caselngMust = true;
        setTimeout(() => {
          this.caselngMust = false;
        }, 1000);
      } else {
        if (
          !this.$commons.isEmpty(this.beginTime) &&
          !this.$commons.isEmpty(this.endTime)
        ) {
          let thisTime = this.beginTime.replace(/-/g, "/");
          let thisTime2 = this.endTime.replace(/-/g, "/");
          var time = new Date(thisTime);
          var time2 = new Date(thisTime2);
          time = time.getTime();
          time2 = time2.getTime();
          if (time > time2) {
            this.$notify({
              type: "warning",
              message: "请输入正确的时间段！",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
        }
        let data = {
          caseUuid: this.caseUuid, //案件ID
          caseLinkMark: this.caseNumber, //案件编号
          caseName: this.caseName, //案发名称
          timeLowLimit: this.beginTime, //案发开始时间
          timeUpLimit: this.endTime, //案发结束时间
          placeCode: this.$refs.province.selectdist, //区/县 简码
          placeFullAddress: this.caseLocation, //案发详址
          longitude: this.caselng, //案发经度
          latitude: this.caselat, //案发纬度
          state: this.caseState, //案件状态
          caseCategoryDesc: this.caseCategory, //案件类型
          caseToolDesc: this.caseTool, //作案工具
          caseMethodDesc: this.caseMeans, //作案手段
          caseLevelDesc: this.harm, //危害程度
          caseTargetDesc: this.target, //侵犯目标
          caseOpportunityDesc: this.caseOpportunity, //作案时机
          caseAbstract: this.caseDescribe, //简要案情
          isSpecial: this.synergyCombat ? 1 : 0 //协同作战状态
        };
        // return
        data = this.$qs.stringify(data);
        this.$http
          .post("pca/video/caseInfo/caseBase/save", data)
          .then(res => {
            if (res.data.code == 200) {
              this.$emit("childbycaseOnright", true);
              this.$notify({
                type: "success",
                message: "保存案件成功！",
                position: "bottom-right",
                duration: 3000
              });
              this.$router.push({
                path: "/videoStrucPlat/caseList",
                query: { menuCode: 711 }
              });
            } else {
              this.$notify({
                type: "warning",
                message: "保存案件失败！",
                position: "bottom-right",
                duration: 3000
              });
            }
          })
          .catch(() => {});
      }
    },
    // 导出卷宗
    exportCase() {
      if (this.updateFlag == 0) {
        this.$notify({
          type: "warning",
          message: "请修改案件属性并保存后再执行此操作!",
          position: "bottom-right",
          duration: 3000
        });
        return;
      } else if (this.updateFlag == 1) {
        // 创建下载文档的函数
        // 取出本地sessionStorage存储的地址
        // let pcaModuleUrl = sessionStorage.getItem('pcaModuleUrl');
        // // 创建一个a标签
        // let link = document.createElement('a');
        // // 设置a标签的href属性
        let pcaModuleUrl = sessionStorage.getItem("pcaModuleUrl");
        // 创建一个a标签
        let link = document.createElement("a");
        // let list = this.exportPicList.join('@')

        // 设置a标签的href属性
        link.href = `http://${pcaModuleUrl}/video/caseInfo/caseBase/export?caseUuid=${
          this.caseUuid
        }`;
        //   link.href = `http://192.168.102.106:8002/pca/video/caseInfo/caseBase/export?caseUuid=${
        //     this.caseUuid
        //   }`;
        link.click();
      }
    },
    // 打开修改页面
    openUpdte() {
      if (this.suspicion.suspicionType == -1) {
        return;
      }
      if (JSON.stringify(this.suspicion) == "{}") {
        return;
      }
      this.updateType = "修改";
      this.addsusTarget = true;
      this.getSuspcition(this.isFirst);
      this.personDisabled = true;
      this.susName = this.susObjeck.suspicionName;
      this.person = this.susObjeck.suspicionType.toString();
      if (this.person) {
        this.isSpeed = this.person;
        this.speed = this.susObjeck.speed;
      }
      this.susNumber = this.susObjeck.suspicionPhone;
      this.susStatus = this.susObjeck.suspicionCard;
      this.susAddress = this.susObjeck.suspicionAddress;
      this.susDescribe = this.susObjeck.description;
      this.susSex = this.susObjeck.suspicionSex;
      if (this.person == 2) {
        this.is3Ddisabled = true;
        this.susSex =
          this.susObjeck.suspicionSex == null
            ? "0"
            : this.susObjeck.suspicionSex.toString();
      } else {
        this.is3Ddisabled = false;
      }
      if (this.person == 3) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    // 删除嫌疑目标
    ajaxDel() {
      if (this.suspicion.suspicionType == -1) {
        return;
      }
      if (JSON.stringify(this.suspicion) == "{}") {
        return;
      }
      this.$myconfirm({
        type: "提示",
        msg: "是否删除该嫌疑目标",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          suspicionUuid: this.suspicion.suspicionUuid
        };
        data = this.$qs.stringify(data);
        this.$http
          .post("pca/video/caseSuspicion/suspicion/del", data)
          .then(response => {
            this.getSuspcition();
            this.nowSuslist = [];
            this.$notify({
              type: "success",
              message: "删除成功",
              position: "bottom-right",
              duration: 3000
            });
            this.$nextTick(() => {
              this.susObjeck = {};
                this.suspicion = {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "全部(未关联)"
      };
              console.log(this.suspicion,"this.suspicion");
              this.changeSus(null);
            });
          });
      });
    },
    //案件编号是否存在
    getCaseNumber() {
      this.caseNumber = this.caseNumber.replace(/^ +| +$/g, "");
      this.caseName = this.caseName.replace(/^ +| +$/g, "");
      if (this.caseNumber != "") {
        let data = {
          caseLinkMark: this.caseNumber
        };
        this.$http
          .get("/pca/casemng/baseinfo/check/CaseLinkMark", {
            params: data
          })
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data != null) {
                if (res.data.data.caseUuid != this.caseUuid) {
                  this.$notify({
                    type: "warning",
                    message: "该案件编号已存在",
                    position: "bottom-right",
                    duration: 3000
                  });
                  this.disabledata = true;
                } else {
                  this.disabledata = false;
                }
              } else {
                this.disabledata = false;
              }
            } else {
              this.disabledata = true;
              this.$notify({
                type: "warning",
                message: "该案件编号已存在",
                position: "bottom-right",
                duration: 3000
              });
            }
          });
      } else {
        this.disabledata = false;
      }
    },
    //获取嫌疑人目标个数
    getSuspcition(isFirst) {
      let data = {
        caseUuid: this.caseUuid
      };
      this.$http
        .get("pca/video/caseSuspicion/suspicion/list", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.length == 0) {
              this.suspicion = {
                suspicionUuid: "",
                suspicionType: "-1",
                suspicionName: "全部(未关联)"
              };
              this.isall = true;
              this.nowSuslist = [];
              this.suspcitionList = [];
              this.susObjeck = {};
              this.suspicionType = -1;
              this.getAllMarker("-1", null);
            } else {
              if (isFirst == 0) {
                this.suspcitionList = res.data.data;
              } else {
                this.suspcitionList = res.data.data;
                this.suspicion = res.data.data[0];
                this.isall = false;
                this.suspicionType = this.suspicion.suspicionType;
                this.suspicionUuid = this.suspicion.suspicionUuid;
                this.getAllMarker(this.suspicionType, null);
              }
            }
          }
        });
    },
    //再标注池展示所有嫌疑目标
    // showAllSustarget(){},
    //切换嫌疑人目标的时候请求数据
    changeSus(row) {
      this.currentPage = 1;
      if (row == null || row.suspicionType == "-1") {
        this.isall = true;
        this.nowSuslist = [];
        this.suspicionType = -1;
        this.getAllMarker("-1", null);
        this.susObjeck = {};
        //等于-1代表这个地方默认展示所有嫌疑目标信息
        this.AllSusInfo = true;

      } else {
        this.AllSusInfo = false;
        this.isall = false;
        this.imglist = [];
        this.nowSuslist = [];
        this.suspicionType = row.suspicionType;
        this.suspicionUuid = row.suspicionUuid;
        if (this.suspicionType == 1) {
          this.isSpeed = 1;
          this.speed = row.speed;
        } else if (this.suspicionType == 2) {
          this.isSpeed = 2;
          this.speed = row.speed;
        } else {
          this.isSpeed = 3;
          this.speed = row.speed;
        }
        this.getAllMarker(row.suspicionType, row.suspicionUuid);
        this.getlableMarker(row.suspicionType, row.suspicionUuid);
        this.susObjeck = row;
        this.isSpeed = row.suspicionType;
        this.suspicion = this.susObjeck;
      }
    },
    //得到嫌疑人的关联标注
    //type 表示嫌疑目标类型 uuid表示嫌疑目标ID
    getlableMarker(type, uuid) {
      let data = {
        caseUuid: this.caseUuid,
        suspicionType: type,
        suspicionUuid: uuid
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("/vsas/video/markPoll/suspicion/new/list", data)
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.list.length) {
              this.nowSuslist = res.data.data.list;
            } else {
              this.nowSuslist = [];
            }
          }
        });
    },
    //添加修改
    addUpdate() {
      if (this.$commons.regtest(this.susName)) {
        this.$notify({
          type: "warning",
          message: "禁止输入特殊字符(<,&,&)",
          position: "bottom-right",
          duration: 2000
        });
        return;
      }
      let phone = /^$|^1(3|4|5|6|7|8)\d{9}$/;
      let card = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (!this.isShow) {
        if (this.susName == "") {
          this.$notify({
            type: "warning",
            message: "嫌疑目标名称不能为空",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
      } else {
        if (this.susStatus != "" && this.susStatus != null) {
          if (!card.test(this.susStatus)) {
            this.$notify({
              type: "warning",
              message: "请输入正确的身份证号",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
        }
        if (this.susName.trim() == "") {
          this.$notify({
            type: "warning",
            message: "嫌疑目标名称不能为空",
            position: "bottom-right",
            duration: 3000
          });
          return;
        } else if (this.susName.length > 10) {
          this.$notify({
            type: "warning",
            message: "请输入小于10个字",
            position: "bottom-right",
            duration: 3000
          });
          return;
        } else if (this.susNumber != null) {
          if (!phone.test(this.susNumber)) {
            this.$notify({
              type: "warning",
              message: "请输入正确的电话号码",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
        } else if (this.susAddress != null) {
          if (this.susAddress.length > 50) {
            this.$notify({
              type: "warning",
              message: "请输入少于50字",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
        } else if (this.susDescribe != null) {
          if (this.susDescribe.length > 100) {
            this.$notify({
              type: "warning",
              message: "请输入小于100字",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
        }
      }

      let data = {};
      if (this.updateType == "新增") {
        if (this.isShow) {
          data = {
            caseUuid: this.caseUuid,
            suspicionName: this.susName,
            suspicionType: this.person,
            speed: this.speed,
            suspicionSex: this.susSex,
            suspicionPhone: this.susNumber,
            suspicionCard: this.susStatus,
            suspicionAddress: this.susAddress,
            description: this.susDescribe,
            targetUuid: ""
          };
        } else {
          data = {
            caseUuid: this.caseUuid,
            suspicionName: this.susName,
            suspicionType: 3,
            speed: this.speed,
            targetUuid: ""
            // speed: this.speed,
          };
        }
      } else {
        if (this.isShow) {
          data = {
            caseUuid: this.caseUuid,
            suspicionName: this.susName,
            suspicionType: this.person,
            speed: this.speed,
            suspicionSex: this.susSex,
            suspicionPhone: this.susNumber,
            suspicionCard: this.susStatus,
            suspicionAddress: this.susAddress,
            description: this.susDescribe,
            targetUuid: "",
            suspicionUuid: this.suspicionUuid
          };
        } else {
          data = {
            caseUuid: this.caseUuid,
            suspicionName: this.susName,
            suspicionType: 3,
            speed: this.speed,
            targetUuid: "",
            suspicionUuid: this.suspicionUuid
          };
        }
      }
      this.isclick = true;
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/video/caseSuspicion/suspicion/save", data)
        .then(res => {
          if (res.data.code == 200) {
            this.isFirst++;
            this.getSuspcition(this.isFirst);
            this.reset();
            this.$notify({
              type: "success",
              message: "新增嫌疑目标成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.susObjeck = res.data.data;
            this.isSpeed = res.data.data.suspicionType;
            this.speed = res.data.data.speed;
            this.suspicion = this.susObjeck;
            this.isclick = false;
            this.addsusTarget = false;
            this.changeSus(this.suspicion)
          } else {
            this.addsusTarget = false;
            this.reset();
            this.$notify({
              type: "warning",
              message: "新增嫌疑目标失败！",
              position: "bottom-right",
              duration: 3000
            });
            this.isclick = false;
          }
        });
    },
    //清空数据
    reset() {
      this.susName = "";
      this.person = "1";
      this.susSex = "0";
      this.speed = "1.39";
      this.isSpeed = "1";
      this.susNumber = "";
      this.susStatus = "";
      this.susAddress = "";
      this.susDescribe = "";
    },
    // 关闭查看大图
    childBigClose(val) {
      this.isShowBig = val;
    },
    //查看当前图片的大图
    lookImg(item) {
      this.isShowBig = true;
      this.bigImgUrl = item.videoCaptureUrl;
    },
    // 关联嫌疑目标
    handSus(row) {
      if (this.suspicion.suspicionType == -1) {
        this.$notify({
          type: "warning",
          message: "请选择嫌疑目标",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.suspcitionList.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择嫌疑目标",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      let data = {
        caseUuid: this.caseUuid,
        suspicionType: this.susObjeck.suspicionType,
        suspicionUuid: this.susObjeck.suspicionUuid,
        operateionType: 1,
        targetUuid: row.markId
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/video/markPoll/relevance/mark", data).then(res => {
        if (res.data.code == 200) {
          this.getAllMarker(this.susObjeck.suspicionType, null);
          this.getlableMarker(
            this.susObjeck.suspicionType,
            this.susObjeck.suspicionUuid
          );
        } else {
          this.$notify({
            type: "warning",
            message: "关联失败",
            position: "bottom-right",
            duration: 3000
          });
          this.getAllMarker(this.susObjeck.suspicionType, null);
        }
      });
    },
    // 解除关联
    cancleSus(row) {
      let targetUuid = "";
      targetUuid = row.markId;
      let data = {
        suspicionType: this.susObjeck.suspicionType,
        suspicionUuid: this.susObjeck.suspicionUuid,
        operateionType: 0,
        targetUuid: targetUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/video/markPoll/relevance/mark", data).then(res => {
        if (res.data.code == 200) {
          this.getAllMarker(this.susObjeck.suspicionType, null);
          this.getlableMarker(
            this.susObjeck.suspicionType,
            this.susObjeck.suspicionUuid
          );
        } else {
          this.$notify({
            type: "warning",
            message: "解除失败",
            position: "bottom-right",
            duration: 3000
          });
          this.getAllMarker(this.susObjeck.suspicionType, null);
          this.getlableMarker(
            this.susObjeck.suspicionType,
            this.susObjeck.suspicionUuid
          );
        }
      });
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.suspicion.suspicionType == -1) {
        this.getAllMarker("-1", null);
      } else {
        this.getAllMarker(this.susObjeck.suspicionType, null);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.suspicion.suspicionType == -1) {
        this.getAllMarker("-1", null);
      } else {
        this.getAllMarker(this.susObjeck.suspicionType, null);
      }
    },
    // 删除标注
    dellable(row, index) {
      this.$myconfirm({
        type: "提示",
        msg: "是否删除该标注！",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          markId: row.markId
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/video/markPoll/mark/delete", data).then(res => {
          if (res.data.code == 200) {
            // this.setshowInfo(false);
            if (this.susObjeck.suspicionType == undefined) {
              this.getAllMarker("-1", null);
            } else {
              this.getAllMarker(this.susObjeck.suspicionType, null);
              this.getlableMarker(
                this.susObjeck.suspicionType,
                this.susObjeck.suspicionUuid
              );
            }
            this.$notify({
              type: "success",
              message: "标注删除成功！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "error",
              message: "标注删除失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      });
    },
    closeDia() {},
    deleteCase(id) {
      let data = {
        caseUuid: id
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/video/caseInfo/caseBase/del", data).then(res => {
        if (res.data.code == 200) {
        }
      });
    },
    //判断用户有没有修改案件属性的值
    isEditCase() {
      let flag;
      if (
        this.caseNumber == "" &&
        this.caseName == "未知" &&
        this.caseOpportunity == "未知" &&
        this.caseCategory == "其他" &&
        this.caseLocation == "" &&
        this.harm == "未知" &&
        this.caseMeans == "未知" &&
        this.target == "未知" &&
        this.caseTool == "未知" &&
        this.caseDescribe == ""
      ) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    },
    //去任务列表
    goTasklist() {
      let isedit = this.isEditCase();
      //等于1代表新增进来的，编辑我不管
      if (this.EditOrNew == 1) {
        //isedit = true代表没有修改案件任何属性，this.suspcitionList.length为0代表也没有新增任何嫌疑目标，相当于用户
        //只点了新增按钮进来看看，什么也没改，然后点上方的导航栏出去，这个时候，我就要把这个案件给直接删掉，然后跳转路由
        if (isedit && this.suspcitionList.length == 0) {
          this.deleteCase(this.caseUuid);
          this.$router.push({
            path: "/videoStrucPlat/taskManage",
            query: { menuCode: 701 }
          });
        } else if (!isedit || this.suspcitionList.length > 0) {
          //如果用户修改了案件属性和新增了嫌疑目标任何一个，我直接给他保存这个案件，然后跳转路由
          this.updateTrue();
        }
      } else {
        //else就代表是案件编辑进来的，任意跳转路由，我也不判断是否修改案件属性和新增嫌疑人，也不删除案件
        this.$router.push({
          path: "/videoStrucPlat/taskManage",
          query: { menuCode: 701 }
        });
      }
    },

    //跳转到标注池
    routeMarkPool() {
      let isedit = this.isEditCase();
      if (this.EditOrNew == 1) {
        //isedit = true代表没有修改案件任何属性，this.suspcitionList.length为0代表也没有新增任何嫌疑目标，相当于用户
        //只点了新增按钮进来看看，什么也没改，然后点上方的导航栏出去，这个时候，我就要把这个案件给直接删掉，然后跳转路由
        if (isedit && this.suspcitionList.length == 0) {
          this.deleteCase(this.caseUuid);
          this.$router.push({
            path: "/videoStrucPlat/MarkPool",
            query: { menuCode: 712 }
          });
        } else if (!isedit || this.suspcitionList.length > 0) {
          //如果用户修改了案件属性和新增了嫌疑目标任何一个，我直接给他保存这个案件，然后跳转路由
          this.updateTrue();
        }
      } else {
        this.$router.push({
          path: "/videoStrucPlat/MarkPool",
          query: { menuCode: 712 }
        });
      }
    },
    //跳转到案件列表
    routeCaseList() {
      let isedit = this.isEditCase();
      if (this.EditOrNew == 1) {
        //isedit = true代表没有修改案件任何属性，this.suspcitionList.length为0代表也没有新增任何嫌疑目标，相当于用户
        //只点了新增按钮进来看看，什么也没改，然后点上方的导航栏出去，这个时候，我就要把这个案件给直接删掉，然后跳转路由
        if (isedit && this.suspcitionList.length == 0) {
          this.deleteCase(this.caseUuid);
          this.$router.push({
            path: "/videoStrucPlat/caseList",
            query: { menuCode: 711 }
          });
        } else if (!isedit || this.suspcitionList.length > 0) {
          //如果用户修改了案件属性和新增了嫌疑目标任何一个，我直接给他保存这个案件，然后跳转路由
          this.updateTrue();
        }
      } else {
        this.$router.push({
          path: "/videoStrucPlat/caseList",
          query: { menuCode: 711 }
        });
      }
    },
    //跳转到首页
    routeVideoStrucPlat() {
      let isedit = this.isEditCase();
      if (this.EditOrNew == 1) {
        //isedit = true代表没有修改案件任何属性，this.suspcitionList.length为0代表也没有新增任何嫌疑目标，相当于用户
        //只点了新增按钮进来看看，什么也没改，然后点上方的导航栏出去，这个时候，我就要把这个案件给直接删掉，然后跳转路由
        if (isedit && this.suspcitionList.length == 0) {
          this.deleteCase(this.caseUuid);
          this.$router.push({
            path: "/videoStrucPlat",
            query: { menuCode: 700 }
          });
        } else if (!isedit || this.suspcitionList.length > 0) {
          //如果用户修改了案件属性和新增了嫌疑目标任何一个，我直接给他保存这个案件，然后跳转路由
          this.updateTrue();
        }
      } else {
        this.$router.push({
          path: "/videoStrucPlat",
          query: { menuCode: 700 }
        });
      }
    },
    //跳转涉案视频管理
    routeResourceManage() {
      let isedit = this.isEditCase();
      if (this.EditOrNew == 1) {
        //isedit = true代表没有修改案件任何属性，this.suspcitionList.length为0代表也没有新增任何嫌疑目标，相当于用户
        //只点了新增按钮进来看看，什么也没改，然后点上方的导航栏出去，这个时候，我就要把这个案件给直接删掉，然后跳转路由
        if (isedit && this.suspcitionList.length == 0) {
          this.deleteCase(this.caseUuid);
          this.$router.push({
            path: "/videoStrucPlat/resourceManage",
            query: { menuCode: 704 }
          });
        } else if (!isedit || this.suspcitionList.length > 0) {
          //如果用户修改了案件属性和新增了嫌疑目标任何一个，我直接给他保存这个案件，然后跳转路由
          this.updateTrue();
        }
      } else {
        this.$router.push({
          path: "/videoStrucPlat/resourceManage",
          query: { menuCode: 704 }
        });
      }
    },
    //跳转以图搜图
    routeSearchPrint() {
      let isedit = this.isEditCase();
      if (this.EditOrNew == 1) {
        //isedit = true代表没有修改案件任何属性，this.suspcitionList.length为0代表也没有新增任何嫌疑目标，相当于用户
        //只点了新增按钮进来看看，什么也没改，然后点上方的导航栏出去，这个时候，我就要把这个案件给直接删掉，然后跳转路由
        if (isedit && this.suspcitionList.length == 0) {
          this.deleteCase(this.caseUuid);
          this.$router.push({
            path: "/videoStrucPlat/searchPrint",
            query: { menuCode: 703 }
          });
        } else if (!isedit || this.suspcitionList.length > 0) {
          //如果用户修改了案件属性和新增了嫌疑目标任何一个，我直接给他保存这个案件，然后跳转路由
          this.updateTrue();
        }
      } else {
        this.$router.push({
          path: "/videoStrucPlat/searchPrint",
          query: { menuCode: 703 }
        });
      }
    },
    //跳转检索查询
    routeVideoRetrieval() {
      let isedit = this.isEditCase();
      if (this.EditOrNew == 1) {
        //isedit = true代表没有修改案件任何属性，this.suspcitionList.length为0代表也没有新增任何嫌疑目标，相当于用户
        //只点了新增按钮进来看看，什么也没改，然后点上方的导航栏出去，这个时候，我就要把这个案件给直接删掉，然后跳转路由
        if (isedit && this.suspcitionList.length == 0) {
          this.deleteCase(this.caseUuid);
          this.$router.push({
            path: "/videoStrucPlat/videoRetrieval",
            query: { menuCode: 710 }
          });
        } else if (!isedit || this.suspcitionList.length > 0) {
          //如果用户修改了案件属性和新增了嫌疑目标任何一个，我直接给他保存这个案件，然后跳转路由
          this.updateTrue();
        }
      } else {
        this.$router.push({
          path: "/videoStrucPlat/videoRetrieval",
          query: { menuCode: 710 }
        });
      }
    },
    //获取案件基本信息
    getCaseBaseInfo(id) {
      let data = {
        caseUuid: id
      };
      this.$http
        .get("pca/video/caseInfo/caseBase/query", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            //执行对左边案件基本属性赋值的函数
            this.currentCaseValue(res.data.data);
          }
        });
    },
    //案件基本属性赋值
    currentCaseValue(row) {
      this.caseNumber = row.caseLinkMark; //案件编号
      this.caseName = row.caseName; //案件名称
      this.beginTime = this.handle(row.timeLowLimit); //案发开始时间
      this.endTime = this.handle(row.timeUpLimit); //案发结束时间
      this.caseLocation = row.placeFullAddress; //案发地址
      this.caselng = row.longitude; //经度
      this.caselat = row.latitude; //维度
      this.caseCategory = row.caseCategoryDesc; //案件类型
      this.caseTool = row.caseToolDesc; //作案工具
      this.caseMeans = row.caseMethodDesc; //作案手段
      this.caseState = row.state; //案件状态
      this.caseOpportunity = row.caseOpportunityDesc; //作案时机
      this.harm = row.caseLevelDesc; //危害程度
      this.target = row.caseTargetDesc; //侵犯目标
      this.caseDescribe = row.caseAbstract; //简要案情
      this.updateFlag = row.updateFlag;
      setTimeout(() => {
        let placeCode = row.placeCode;
        this.$refs.province.selected = placeCode.substring(0, 2) + "0000";
        this.$refs.province.selectcity = placeCode.substring(0, 4) + "00";
        this.$refs.province.selectdist = placeCode;
        this.$refs.province.getSelectData();
        // this.OpenTheTime("#timeone", "#timetwo");
        this.onLoadTime("#timeone", "#timetwo");
      }, 100);
    }
  },
  watch: {},
  destroyed() {},
  beforeDestroy() {}
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
@import "../../../assets/css/verify.css";

.topInfo {
  position: absolute;
  top: 0.6rem;
}
.mainContent {
  width: 100%;
  position: absolute;
  top: 0.9rem;
  bottom: 0px;
  left: 0px;
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.2rem;
  float: left;
}
.main-left {
  width: 34%;
  height: 95%;
  float: left;
  border: 1px solid #13436e;
  margin-right: 1%;
}
.main-center {
  width: 34%;
  height: 95%;
  float: left;
  border: 1px solid #13436e;
  margin-right: 1%;
  padding: 0 0.1rem;
}
.main-right {
  width: 30%;
  height: 95%;
  float: left;
  border: 1px solid #13436e;
}
.title {
  font-size: 0.16rem;
  text-align: center;
  padding: 0.1rem;
}
.mainInfo {
  height: 4.2rem;
}
.mainInfo li {
  float: left;
  width: 50%;
  position: relative;
  line-height: 0.5rem;
}
.mainInfo li > span {
  display: inline-block;
  width: 0.9rem;
  text-align: right;
}
.mainInfo li input {
  width: 2.17rem;
  height: 0.3rem;
  padding-left: 0.1rem;
  border-radius: 0.05rem;
}
.mainInfo .casetime {
  width: 100%;
}
.mainInfo .casetime input {
  width: 2.6rem;
}
.mainInfo .casearea {
  width: 100%;
}
.casearea > div {
  display: inline-block;
}
.casearea > div >>> .province {
  border: 0px solid #000;
}
.mainInfo .casearea >>> .el-input__inner {
  width: 1.75rem;
}
.mainInfo li textarea {
  width: 4rem;
  height: 1.5rem;
}
.checkSus {
  margin-top: 0.1rem;
  height: 0.4rem;
}
.checkSus >>> .el-select {
  width: 50%;
}
.checkSus >>> .el-input__inner,
.susex >>> .el-input__inner {
  height: 0.3rem;
  font-size: 0.14rem;
  padding: 0 0.1rem;
  line-height: 0.3rem;
}
.checkSus .el-button {
  padding: 0 0.15rem;
  height: 0.3rem;
  font-size: 0.12rem !important;
  margin-left: 0.1rem;
}
.property {
  color: #99c9fa;
  font-size: 0.14rem;
  height: 1.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #13436e;
}
.property li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yetSus {
  width: 100%;
  height: calc(100% - 3rem);
  margin-top: 0.1rem;
}
.yetSus .vmark {
  width: 100%;
  /* height: calc(100% - 0.4rem); */
  border: 1px solid rgba(15, 44, 79, 0.9);
}
.pd-10 {
  padding-left: 0.1rem;
}

.addleft p {
  padding: 0.1rem 0;
  position: relative;
}
.addleft p span {
  width: 1.06rem;
  font-size: 0.14rem;
  display: inline-block;
  color: #99c9fa;
}
.addleft p b {
  font-weight: 400;
}
.addleft p input,
textarea {
  width: calc(100% - 1.3rem);
  height: 0.3rem;
  border-radius: 1px;
  padding-left: 0.1rem;
  border: 1px solid #31353b;
  background-color: rgba(16, 35, 56, 0.5);
  color: #99c9fa;
}
.tilte_top {
  padding: 0.1rem 0;
  color: #fff;
}
.imgwidth {
  width: 100%;
  height: 95%;
}
.mainul {
  overflow-y: auto;
  padding: 0 0.1rem;
  height: 5rem;
  position: relative;
}
.main-right .mainul {
  overflow-y: auto;
  padding: 0 0.1rem;
  height: 7.1rem;
  position: relative;
}
.mainul li {
  position: relative;
  margin-top: 0.13rem;
  float: left;
  width: 31%;
  height: 2rem;
  margin-right: 2%;
  border: 2px solid #102d50;
}
.mainul li div {
  width: 100%;
  height: calc(100% - 0.8rem);
  position: relative;
}
.mainul li p {
  font-size: 0.14rem;
}
.mainul li div > img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.mainul li p span {
  width: 1.45rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  line-height: 0.2rem;
  color: #99c9fa;
  margin-left: 0.1rem;
}
.mainul li > .el-button {
  position: absolute;
  bottom: 0.02rem;
  right: 0.05rem;
  font-size: 0.14rem;
  padding: 0.02rem 0.05rem;
}
.mainul li > .bigBook {
  right: 0.5rem;
}
.must {
  color: red;
}
.deleteLable {
  display: none;
  z-index: 999;
}
.mainul li:hover div .deleteLable {
  display: block;
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  top: 0;
  right: -0.1rem;
  z-index: 3;
  cursor: pointer;
}
.susTarget {
  height: 4.5rem;
  overflow-y: scroll;
}
.susTarget ul {
  width: 100%;
  height: 100%;
}
.susTarget ul li {
  float: left;
  width: 45%;
  height: 2rem;
  /* height: 22%; */
  padding: 0.05rem;
  margin: 0.1rem;
  border: 1px solid #13436e;
  cursor: pointer;
}
.susTarget ul li span {
  width: 2.6rem;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-select-dropdown__item {
  font-size: 0.12rem !important;
}
@media (max-width: 1440px) {
  .mainInfo li > span {
    width: 1.1rem;
  }
  .mainInfo li > input {
    width: 1.8rem;
  }
  .mainInfo .casetime input {
    width: 2.4rem;
  }
  .el-select {
    width: 1.8rem;
  }
  .casearea > div >>> .province {
    width: 1.55rem !important;
  }
  .mainInfo .casearea >>> .el-input__inner {
    width: 1.55rem;
  }

  .susTarget ul li {
    height: 2.5rem;
  }
  .addleft p span {
    width: 1.2rem;
  }
  .el-button {
    padding: 0.03rem 0.1rem;
    height: 0.3rem;
  }
  .property {
    height: 1.8rem;
  }
}
</style>
