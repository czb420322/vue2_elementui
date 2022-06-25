<!--
 * @Author: your name
 * @Date: 2020-05-18 11:05:48
 * @LastEditTime : 2020-11-30 08:54:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\videoCombat\fastFight\dataCell.vue
 -->
<template>
    <div>
        <el-dialog
            :title="'视频管理-'+ cameraName"
            height="6rem"
            :visible.sync="dialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="70%"
            @close="closeDia"
            @open="openDialog"
            top="10vh"
        >
            <div>
                <el-row>
                    <el-col :span="7">
                        <div class="searchkline">
                            <span @click="getclick();getDownLoad();" class="commBtn addBtn">文件上传</span>
                            <span
                                @click="getclickFolder();getDownLoad();"
                                class="commBtn addBtn"
                            >文件夹上传</span>
                            <span
                                v-show="(glststrus == 'true' || zkyStructureSwitch == 'true') &&  $route.path == '/videoCombat/addcasetwo'"
                                @click="getclickstrus();getDownLoad();"
                                class="commBtn addBtn"
                            >上传自动结构化</span>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div>
                            <span>文件名称 :&nbsp;</span>
                            <input
                                type="text"
                                style="padding-left:10px;"
                                v-model="keyword"
                                placeholder="请输入文件名称"
                            >
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div v-if="openDialog">
                            <span>时间 :&nbsp;</span>
                            <el-input
                                type="text"
                                class="caseNameSelect caseNameSelectDate"
                                id="text7"
                                readonly
                                v-model="beginTime"
                                placeholder="请选择开始时间"
                            >
                                <i slot="prefix" class="el-input__icon el-icon-time"></i>
                            </el-input>-
                            <el-input
                                type="text"
                                class="caseNameSelect caseNameSelectDate"
                                id="text8"
                                readonly
                                v-model="endTime"
                                placeholder="请选择结束时间"
                            >
                                <i slot="prefix" class="el-input__icon el-icon-time"></i>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <el-button
                                class="el-icon-search searchBtn"
                                @click="getAllDataCell"
                            >&nbsp;&nbsp;查询</el-button>
                            <el-button
                                type="danger"
                                class="el-icon-refresh tryBtn"
                                @click="reset"
                            >&nbsp;重置</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    class="tables"
                    height="4.95rem"
                    @selection-change="handleselection"
                    :row-key="handlrowkey"
                    @select-all="selectAll"
                    ref="table"
                >
                    <div slot="empty">
                        <div class="noImg">
                            <img src="../../../assets/updataImg/NoData.png">
                        </div>
                    </div>
                    <!-- <el-table-column  type="selection" width="55" :reserve-selection="true">
                    </el-table-column>-->
                    <el-table-column
                        show-overflow-tooltip
                        align="center"
                        type="index"
                        label="序号"
                        width="80"
                    ></el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        align="center"
                        prop="fileName"
                        label="文件名称"
                    ></el-table-column>
                    <el-table-column
                        prop="fileSize"
                        align="center"
                        label="文件大小(M)"
                        :formatter="fileSize"
                    ></el-table-column>
                      <!-- 新增的宽高 -->
                     <el-table-column
                        prop="width"
                        align="center"
                        label="宽"
                        width="60"
                    ></el-table-column>
                     <el-table-column
                        prop="height"
                        align="center"
                        label="高"
                        width="60"
                    ></el-table-column>
                    <el-table-column
                        prop="uploadTime"
                        align="center"
                        label="上传时间"
                        :formatter="dateFormat"
                        width="160"
                    ></el-table-column>
                    <el-table-column
                        prop="videoUnicode"
                        align="center"
                        label="编码格式"
                        :formatter="videoUnicode"
                    ></el-table-column>
                    <el-table-column
                        prop="status"
                        align="center"
                        label="状态"
                        :formatter="formatStatus"
                    ></el-table-column>
                    <el-table-column label="进度"  width="160" align="center">
                        <template slot-scope="scope">
                            <el-progress :percentage="scope.row.progress" color="#8e71c7"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        label="操作"
                        :width="$route.path == '/videoCombat/videoplay' ? 200 : 350"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <!-- <span  @click="stopTovideo(scope.row.fileUuid)" v-show="scope.row.status == 3" class="btn btn2"></span>
              <span v-show="scope.row.status != 3" class="btn btn2-1"></span>
              <span v-show="scope.row.status == 5"  @click="retry(scope.row.fileUuid)" class="btn btn3"></span>
              <span v-show="scope.row.status != 5" class="btn btn3-1"></span>
                            <span @click="deleteVideo(scope.row.fileUuid)" class="btn btn4"></span>-->
                            <!-- <el-button type="primary" class="searchBtn"  @click="stopTovideo(scope.row.fileUuid)" :disabled="scope.row.status != 3"><img src="../../../assets/images/videoCombat/begin.png" alt="">&nbsp;&nbsp;停止</el-button> -->
                            <el-button
                                type="warning"
                                class="tryBtn"
                                v-show="$route.path != '/videoCombat/videoplay'"
                                v-no-more-click
                                @click="downVideo(scope.row)"
                                icon="el-icon-download"
                            >&nbsp;&nbsp;原视频下载</el-button>
                            <el-button
                                type="warning"
                                class="tryBtn"
                                v-show="$route.path != '/videoCombat/videoplay'"
                                v-no-more-click
                                @click="donwtransVideo(scope.row)"
                                icon="el-icon-upload2"
                            >&nbsp;&nbsp;转码视频导出</el-button>
                            <el-button
                                type="danger"
                                class="delBtn"
                                @click="deleteVideo(scope.row)"
                                icon="el-icon-circle-close"
                            >&nbsp;&nbsp;删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="video_page">
                    <el-pagination
                        background
                        v-if="dialogVisible"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount"
                    ></el-pagination>
                    <p>已上传：{{num1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在上传：{{num2}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格式不支持：{{num3}}</p>
                </div>
                <normCell :openNormCell="openNormCell" @childbyNorm="childbyNorm"></normCell>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
                <!-- <el-button type="primary cancleBtn" @click.stop="batchDeletVideo(selectIndex)">批量删除</el-button> -->
                <!-- <el-button type="primary cancleBtn" @click.stop="batchDownVideo(selectIndex)"><img src="../../../assets/images/videoCombat/suspend.png" alt="">&nbsp;&nbsp;批量下载</el-button> -->
                <!-- <el-button @click="dialogVisible = false"></el-button>
                <el-button @click="dialogVisible = false"></el-button>-->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataCell from "../../../api/newCaseVideo/DataCell.js";
import videoDown from "../../../api/casestudy/videoDown.js"; //判断是否要下载
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import normCell from "./normCell"; //打开标准采集

export default {
    data() {
        return {
            dialogVisible: false,
            zkyStructureSwitch: false,
            selectIndex: [],
            cameraName: ''
        };
    },
    props: {
        showDataCell: Boolean,
        deviceUuid: String
    },
    components: {
        normCell
    },
    watch: {
        showDataCell(val) {
            this.dialogVisible = val;
        }
    },
    computed: {
        ...mapGetters(["deviceInfo"])
    },
    mixins: [DataCell, videoDown, beginEnd],
    methods: {
        handleselection(val) {
            clearInterval(this.timeOut);
            console.log(val, 456456);
            this.selectIndex = val.map(item => {
                return item.fileUuid;
            });
            console.log(this.selectIndex, 5522);
        },
        handlrowkey(row) {
            return row.fileUuid;
        },
        selectAll(selection, row) {
            console.log(selection);
            // this.multipleSelection[this.currentPage] = []
            // selection.forEach((item, index) => {
            //   this.multipleSelection[this.currentPage].push(item)
            // })
            this.selectIndex = selection.map(item => {
                return item.fileUuid;
            });
        },
        //关闭模态框传值给父组件
        closeDia() {
            let title;
            if (this.$route.path == "/videoCombat/videoplay") {
                title = document.title + ".";
            } else {
                title = document.title;
            }
            this.$emit("childByDataCell", false, title);
            clearInterval(this.timeOut);
            this.keyword = "";
            this.beginTime = "";
            this.endTime = "";
            this.$refs.table.clearSelection();
            this.selectIndex = [];
        },
        //打开模态框的回调
        openDialog() {
            this.caseUuid = this.$route.query.caseUuid
            let deviceList = sessionStorage.getItem('deviceInfo')
            this.cameraName = JSON.parse(deviceList).cameraName
            console.log(this.cameraName);
            this.glststrus = sessionStorage.getItem("glstStructureSwitch");
            this.zkyStructureSwitch = sessionStorage.getItem(
                "zkyStructureSwitch"
            );
            this.currentPage = 1;
            this.pageSize = 10;
            this.getAllDataCell();
            this.$nextTick(() => {
                this.OpenTheTime("#text7", "#text8");
                document.getElementById("text8").value = "";
            });

            this.timeOut = setInterval(() => {
                this.getAllDataCell();
                //获取视频的种类数量
                this.getNumtoAll();
            }, 1000);
        },
        childbyNorm(val) {
            this.openNormCell = false;
        }
    }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.dataCellTitle {
    display: flex;
    flex-direction: row;
}
.dataCellTitle div {
    flex: 1;
    border: 1px solid red;
}
.dataCellTitle div:first-child {
    width: 15%;
}
.el-row {
    margin-bottom: 0.2rem;
    line-height: 0.3rem;
}
.el-col-7 {
    text-align: center;
}
.caseNameSelect {
    width: 1.5rem;
    color: #c5c5c5;
}
.caseNameSelectDate {
    width: 1.8rem;
    font-size: 0.14rem;
}
.el-col-5 input,
.el-col-8 input {
    width: 1.2rem;
    line-height: 0.28rem;
    border-radius: 3px;
}
.el-col-4 {
    text-align: center;
}
.el-col-4 .el-button {
    padding: 0 0.1rem;
    height: 0.3rem;
}
/* .el-pagination{
  text-align: right;
  margin-top: 0.2rem;
} */

.btn {
    display: inline-block;
    width: 0.65rem;
    height: 0.25rem;
    vertical-align: middle;
    background-size: 100% 100%;
    margin-right: 0.1rem;
    cursor: pointer;
}

.searchkline span {
    display: inline-block;
    height: 0.3rem;
    line-height: 0.3rem;
    cursor: pointer;
    font-size: 0.12rem;
    margin-right: 0.2rem;
}
.el-progress /deep/ .el-progress__text {
    width: 0.5rem;
    color: #99c9fa;
    margin-left: 0.03rem;
    font-size: 0.12rem !important;
}
.video_page {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
}
.video_page p {
    float: right;
    color: #99c9fa;
    margin-right: 0.2rem;
    margin-top: 0.1rem;
}
/* .el-pagination{
  position: absolute;
  height: 0.5rem;
  bottom: 0.1rem;
  right: 0.5rem;
} */
.video_page .el-pagination {
    float: right;
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.15rem;
}
</style>
