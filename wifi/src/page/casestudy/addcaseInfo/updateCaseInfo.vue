<!--
 * @Author: your name
 * @Date: 2020-04-16 11:43:39
 * @LastEditTime : 2021-06-09 15:43:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\casestudy\addcaseInfo\updateCaseInfo.vue
 -->
<template>
    <div class="taskMange">
        <el-dialog
            title="修改案件信息"
            :visible.sync="dialogVisible"
            @close="closeDia"
            @open="opendia"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="52%"
        >
            <span v-if="dialogVisible" class="taskrelation">
                <div>
                    <p style="color:#fff">
                        <span>|&nbsp;&nbsp;</span>案件基本信息录入
                    </p>
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
                            <div class="mustText mustText1" v-show="caseNumberMust">该案件编号已存在
                                <i></i>
                            </div>
                        </li>
                        <li>
                            <span>
                                <b class="must">*</b> 案件名称：
                            </span>
                            <input
                                type="text"
                                v-model="caseName"
                                maxlength="100"
                                placeholder="请输入案件名称"
                            >
                            <div class="mustText mustText1" v-show="caseNameMust">案件名称为必填项
                                <i></i>
                            </div>
                        </li>
                        <li class="casetime" v-if="dialogVisible">
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
                            <div
                                class="mustText mustText2"
                                v-show="caseDateMust"
                                style="width:2rem"
                            >案发开始时间为必填项
                                <i></i>
                            </div>
                        </li>
                        <li class="casearea">
                            <span>案发区域：</span>
                            <province ref="province"></province>
                        </li>
                        <li>
                            <span>案发详址：</span>
                            <input
                                type="text"
                                maxlength="50"
                                v-model="caseLocation"
                                placeholder="请输入案发地址"
                            >
                            <div class="mustText mustText1" v-show="caseLocationMust">请输入小于50个字
                                <i></i>
                            </div>
                        </li>
                        <li>
                            <span>案发经度：</span>
                            <input
                                type="text"
                                v-model="caselng"
                                placeholder="请输入案发经度"
                                :disabled="isDisable"
                            >
                            <div class="mustText mustText1" v-show="caselngMust">请输入正确的经度
                                <i></i>
                            </div>
                        </li>
                        <li>
                            <span>案发纬度：</span>
                            <input
                                type="text"
                                v-model="caselat"
                                placeholder="请输入案发纬度"
                                :disabled="isDisable"
                            >
                            <div class="mustText mustText1" v-show="caselatMust">请输入正确的纬度
                                <i></i>
                            </div>
                        </li>
                        <li>
                            <span>
                                <b class="must">*</b> 案件类型：
                            </span>
                            <el-select v-model="caseType" placeholder="请选择案件类型">
                                <el-option
                                    v-for="(item,index) in CaseType"
                                    :value="item.value"
                                    :key="index"
                                >{{ item.value }}</el-option>
                            </el-select>
                            <div class="mustText mustText1" v-show="caseTypeMust">案发类型为必填项
                                <i></i>
                            </div>
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
                            <div class="mustText mustText1" v-show="caseStateMust">案发状态为必填项
                                <i></i>
                            </div>
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
                        <!-- <li class="">
                  <span>协同作战：</span>
                  <el-switch  :disabled="synergyCombat == 0 ? false : true"  v-model="synergyCombat"
                  active-color="#13ce66"  inactive-color="#ff4949"  active-text="是"  inactive-text="否">
                  </el-switch>
                        </li>-->
                        <li>
                            <span>简要案情：</span>
                            <textarea
                                style="resize: none"
                                maxlength="500"
                                v-model="caseDescribe"
                                placeholder="请输入简要案情"
                            ></textarea>
                            <div class="mustText mustText1" v-show="caseDescribeLen">请输入少于500个字符
                                <i></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary passBtn" :disabled="clickdisable" @click="updateTrue">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Province from "@/components/province";
import addcase from "../../../api/realvideo/addcase.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import verify from "../../../api/casestudy/verify.js";
export default {
    data() {
        return {
            dialogVisible: false,
            synergyCombat: 0,
            caseNumber: "", //案件编号
            caseName: "", //案发名称
            beginTime: "", //开始时间
            endTime: "", //结束时间
            caseLocation: "", //案发详址
            caselng: "", //案发经度
            caselat: "", //案发纬度
            caseState: 0, //案发状态
            caseType: "无", //案件类型
            caseTool: "", //作案工具
            caseMeans: "", //作案手段
            caseStates: [],
            caseOpportunity: "", //作案时机
            harm: "", //危害程度
            target: "", //侵犯目标
            caseDescribe: "", //简要案情
            pointLng: false,
            pointLat: false,
            caseUuid: "",
            disabledata: false,
            isDisable: false,
            clickdisable: false //确定的时候禁用

            // opendisable:false
        };
    },
    mounted() {},
    watch: {
        isCaseInfos(val) {
            this.dialogVisible = val;
        }
    },
    mixins: [addcase, beginEnd, verify],
    props: {
        isCaseInfos: Boolean,
        dataCaseInfo: Object
    },
    components: {
        Province
    },
    methods: {
        getCaseStates() {
            this.$http.get("sms/static/getCaseState").then(res => {
                if (res.data.code == 200) {
                    this.caseStates = res.data.data;
                }
            });
        },
        //关闭模态框
        closeDia() {
            this.$emit("childbycaseInfo", false);
            this.caseNumber = "";
            this.caseName = "";
            this.beginTime = "";
            this.endTime = "";
            this.caseLocation = "";
            this.caselng = "";
            this.caselat = "";
            this.caseState = 0;
            this.caseType = "";
            this.caseTool = "";
            this.caseMeans = "";
            this.caseOpportunity = "";
            this.harm = "";
            this.target = "";
            this.caseDescribe = "";
        },
        //打开模态框
        opendia() {
            this.getCaseType();
            this.getCaseOpportunity();
            this.getCaseLevel();
            this.getCaseTarget();
            this.getCaseMethod();
            this.getCaseTool();
            this.caseUuid = this.$route.query.caseUuid;
            this.getCaseStates();
            this.caseName = this.dataCaseInfo.caseName; //案发名称
            // this.beginTime = this.dataCaseInfo.timeUpLimit //开始时间
            // this.endTime = this.dataCaseInfo.timeLowLimit; //结束时间
            console.log(this.dataCaseInfo, 333);
            if (this.dataCaseInfo.latitude || this.dataCaseInfo.longitude) {
                this.isDisable = true;
            }
            this.caseType = this.dataCaseInfo.caseCategoryDesc; //案件类型
            this.caseNumber = this.dataCaseInfo.caseLinkMark; //案件编号
            this.caseLocation = this.dataCaseInfo.placeFullAddress; //案发详址
            this.caseMeans = this.dataCaseInfo.caseMethodDesc; //作案手段
            this.caseState = this.dataCaseInfo.state; //案发状态
            this.caseTool = this.dataCaseInfo.caseToolDesc; //作案工具
            this.caseOpportunity = this.dataCaseInfo.caseOpportunityDesc; //作案时机
            this.harm = this.dataCaseInfo.caseLevelDesc; //危害程度
            this.target = this.dataCaseInfo.caseTargetDesc;
            this.caseDescribe = this.dataCaseInfo.caseAbstract;
            this.caselng = this.dataCaseInfo.longitude;
            this.caselat = this.dataCaseInfo.latitude;
            this.synergyCombat = this.dataCaseInfo.isSpecial ? true : false;
            setTimeout(() => {
                this.$refs.province.selected =
                    this.dataCaseInfo.placeCode.substring(0, 2) + "0000";
                this.$refs.province.selectcity =
                    this.dataCaseInfo.placeCode.substring(0, 4) + "00";
                this.$refs.province.selectdist = this.dataCaseInfo.placeCode;
                this.$refs.province.getSelectData();
                this.$nextTick(() => {
                    this.onLoadTime("#timeone", "#timetwo");
                    this.beginTime = this.dataCaseInfo.timeLowLimit; //开始时间
                    this.endTime = this.dataCaseInfo.timeUpLimit; //结束时间
                });
            }, 100);
            console.log(this.caseType);
        },
         //加载时间控件
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
                btns: ['now','confirm'],
                value: new Date(),
                done: (value, date, endDate) => {
                    this.endTime = value;
                    if(new Date(this.endTime).getTime() < new Date(this.beginTime).getTime()){
                        this.beginTime = this.endTime
                    }
                }
            });
        },
        //案件编号是否存在
        getCaseNumber() {
            // this.disabledata = false;
            console.log(333);
            this.caseNumber = this.caseNumber.replace(/^ +| +$/g, "");
            this.caseName = this.caseName.replace(/^ +| +$/g, "");
            console.log(6666);
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
                                    this.caseNumberMust = true;
                                    setTimeout(() => {
                                        this.caseNumberMust = false;
                                    }, 1000);
                                    this.disabledata = true;
                                } else {
                                    this.disabledata = false;
                                }
                            } else {
                                this.disabledata = false;
                                this.caseNumberMust = false;
                            }
                        } else {
                            this.disabledata = true;
                            this.caseNumberMust = true;
                            setTimeout(() => {
                                this.caseNumberMust = false;
                            }, 1000);
                            // this.$myconfirm({
                            //   type: "提示",
                            //   msg: "服务器异常,请稍后重试！",
                            //   icon: 4,
                            //   btn: {
                            //     ok: "yes",
                            //     no: "no"
                            //   }
                            // });
                        }
                    });
            } else {
                this.disabledata = false;
            }
        },
        updateTrue() {
            // let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]*$/;
            // let reg = /^[<>&&./]/
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
            //  console.log(this.caselng,this.caselat,"用户不输入经纬度时的值");

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
            // if (!lngreg.test(this.caselng)) {
            //     this.$notify({
            //         type: 'warning',
            //         message: '请输入正确的经纬度',
            //         position: 'bottom-right',
            //         duration: 2000
            //     })
            //     return
            //   }
            // if (!latreg.test(this.caselat)) {

            //     this.$notify({
            //         type: 'warning',
            //         message: '请输入正确的经纬度',
            //         position: 'bottom-right',
            //         duration: 2000
            //     })
            //     return
            // }
            // this.getSize();
            this.getCaseNumber();
            // if(this.caseType == '其他' && this.caseName == '未知'){
            //   this.$notify({
            //     type: 'warning',
            //     message: '请修改案件属性',
            //     position: 'bottom-right',
            //     duration: 3000
            //   });
            //   return
            // }
            if (
                this.caseNumber == "" &&
                this.caseName == "未知" &&
                this.caseOpportunity == "未知" &&
                this.caseType == "其他" &&
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
            // let lngreg = /^-?((1?[0-7]?[0-9]?)(([.][0-9]{1,6})?)|180(([.][0]{1,6})?))$/
            // let latreg = /^-?(([1-8]?[0-9]?)(([.][0-9]{1,6})?)|90(([.][0]{1,6})?))$/
            // let lngreg = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180(\.0{1,10})?)|180|$/
            // let latreg = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)|$/
            if (this.caseName == "") {
                this.caseNameMust = true;
                setTimeout(() => {
                    this.caseNameMust = false;
                }, 1000);
            } else if (this.beginTime == "") {
                this.caseDateMust = true;
                setTimeout(() => {
                    this.caseDateMust = false;
                }, 1000);
            } else if (this.caseLocation.length > 50) {
                this.caseLocationMust = true;
                setTimeout(() => {
                    this.caseLocationMust = false;
                }, 1000);
            }
            // else if (!lngreg.test(this.caselng)) {
            //   this.caselngMust = true;
            //   setTimeout(() => {
            //     this.caselngMust = false;
            //   }, 1000);
            // }
            // else if (!latreg.test(this.caselat)) {
            //   this.caselatMust = true;
            //   setTimeout(() => {
            //     this.caselatMust = false;
            //   }, 1000);
            // }
            else if (this.disabledata) {
                this.caseNumberMust = true;
                setTimeout(() => {
                    this.caseNumberMust = false;
                }, 1000);
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
                this.clickdisable = true;
                let data = {
                    caseUuid: this.$route.query.caseUuid, //案件ID
                    caseLinkMark: this.caseNumber, //案件编号
                    caseName: this.caseName, //案发名称
                    timeLowLimit: this.beginTime, //案发开始时间
                    timeUpLimit: this.endTime, //案发结束时间
                    placeCode: this.$refs.province.selectdist, //区/县 简码
                    placeFullAddress: this.caseLocation, //案发详址
                    longitude: this.caselng, //案发经度
                    latitude: this.caselat, //案发纬度
                    state: Number(this.caseState), //案件状态
                    caseCategoryDesc: this.caseType, //案件类型
                    caseToolDesc: this.caseTool, //作案工具
                    caseMethodDesc: this.caseMeans, //作案手段
                    caseLevelDesc: this.harm, //危害程度
                    caseTargetDesc: this.target, //侵犯目标
                    caseOpportunityDesc: this.caseOpportunity, //作案时机
                    caseAbstract: this.caseDescribe, //简要案情
                    isSpecial: this.synergyCombat ? 1 : 0 //协同作战状态
                    // isSpecial: 0//协同作战状态
                };
                data = this.$qs.stringify(data);
                this.$http
                    .post("pca/casemng/baseinfo/save", data)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$emit("childbycaseOnright", true);
                            // if(this.$commons.isEmpty(this.caselng)){
                            // }else{

                            // }
                            // this.opendisable = true
                            this.$notify({
                                type: "success",
                                message: "案件属性修改成功！",
                                position: "bottom-right",
                                duration: 3000
                            });
                            this.clickdisable = false;
                            this.dialogVisible = false;
                        } else {
                            this.clickdisable = false;
                        }
                    })
                    .catch(() => {
                        this.clickdisable = false;
                    });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.mainInfo li input {
    @include background_color('background_eleheader');
    border: 0;
}
</style>

<style  scoped>
@import "../../../assets/css/commom.css";
@import "../../../assets/css/verify.css";

.mainInfo {
    /* overflow: hidden; */
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
    width: 3.3rem;
    height: 0.3rem;
    padding-left: 0.1rem;
     /* @include background_color('background_eleheader');
     @include font_color('font_color1'); */
}
.mainInfo .casetime input {
    width: 1.6rem;
}
.casearea > div {
    display: inline-block;
}
.casearea > div >>> .province {
    width: 1.01rem !important;
    border: 0px solid #000;
}
.must {
    color: red;
}
.mainInfo li >>> .el-input__inner {
    width: 3.3rem;
    height: 0.3rem;
}
.mainInfo .casearea >>> .el-input__inner {
    width: 1rem;
}
.mainInfo li textarea {
    width: 3.3rem;
}
.mustText1 {
    right: -0.2rem;
}
.mustText2 {
    right: -0.6rem;
}
/* .el-switch >>> .el-switch__label {
    color: #99c9fa;
} */

</style>


