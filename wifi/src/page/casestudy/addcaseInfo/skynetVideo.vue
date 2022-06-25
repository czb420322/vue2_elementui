<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:07
 * @LastEditTime : 2020-05-27 11:15:43
 * @LastEditors  : chenxf
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\addcaseInfo\skynetVideo.vue
 * @
 -->
<template>
    <!-- 天网视频结构化 -->
    <div class="taskMange">
        <el-dialog
            title="视频结构化"
            :visible.sync="dialogVisible"
            @close="closeDia"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @open="opendia"
            width="60%" >
            <div class="taskrelation" v-if="dialogVisible">
                <div class="navBar">
                    <div class="nav-left">
                        <p class="bartile">|&nbsp;设备名称:{{fileName}}</p>
                        <div>
                            <img
                                :src="pathImg"
                                id="imgbox"
                                class="imgbox"
                                @load="imgscale('.imgbox')"
                            >
                        </div>
                    </div>
                    <div class="nav-right">
                        <div class="bartile">
                            <span>时间 :&nbsp;</span>
                            <input
                                type="text"
                                id="searchStartTime"
                                readonly
                                class="caseNameSelect caseNameSelectDate"
                                v-model="beginData"
                                placeholder="请输入开始时间"
                            > -
                            <input
                                type="text"
                                id="searchendData"
                                readonly
                                class="caseNameSelect caseNameSelectDate"
                                v-model="endData"
                                placeholder="请输入结束时间"
                            > &nbsp;
                            <el-button
                                class="el-icon-search searchBtn"
                                @click="searhlineImg()"
                            >&nbsp;&nbsp;查询</el-button>
                            <!-- <el-button
                class="el-icon-search searchBtn"
                @click="inquireTime()"
                            >&nbsp;&nbsp;查询</el-button>-->
                        </div>
                        <el-table
                            :data="skynetList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                            height="4.62rem"
                            @selection-change="handleselection"
                            :row-key="handlrowkey"
                            @select-all="selectAll"
                            ref="table"
                            border
                        >
                            <div slot="empty">
                                <div class="noImg">
                                <img src="../../../assets/updataImg/NoData.png" />
                                </div>
                            </div>
                            <el-table-column :reserve-selection="true" type="selection" width="100"></el-table-column>
                            <el-table-column label="开始时间" width="220" prop="beginTable"></el-table-column>
                            <el-table-column show-overflow-tooltip label="结束时间" prop="endTable"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <!-- 分页开始 -->
            <div class="pageList">
                <!-- :pager-count="5" -->
                <el-pagination
                    background
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
            <!-- 分页结束 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false"></el-button>
                <el-button v-no-more-click @click="skynetSubmit"></el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import beginEnd from "../../../api/realvideo/BenEedTime.js";
import videoDown from "../../../api/casestudy/videoDown.js";
import scale from "../../../api/common/scale.js";
import md5 from 'js-md5'
export default {
    data() {
        return {
            dialogVisible: false, // 取消按钮
            skynetList: [], // 存储数据
            pathImg: "", // 默认图片
            total: 0, // 默认总数
            currentPage: 1, // 当前页
            pageSize: 10, //默认页数
            beginData: this.getEarlierDate(), // 默认开始时间
            endData: this.getCurrentDate(), // 默认结束时间
            loading: null,
            fileName: "", // 设备名称
            gbDeviceId: "", //设备编号
            multipleSelection: [], // 勾选数据
            issesionAll: false
        };
    },
    mounted() {},
    watch: {
        // 是否打开天网结构化
        skynetNum(val) {
            this.dialogVisible = val;
        }
    },
    props: {
        skynetNum: Boolean,
        pTinfo: Object
    },
    mixins: [beginEnd, videoDown, scale],
    methods: {
        //关闭模态框
        closeDia() {
            this.$emit("childskynet", false);
            this.issesionAll = false;
            this.skynetList = [];
            this.currentPage = 1;
            this.total = 0;
            this.pathImg = "";
            this.$refs.table.clearSelection();
        },
        //打开模态框
        opendia() {
            this.$nextTick(() => {
                (this.beginData = this.getEarlierDate()), // 开始时间
                    (this.endData = this.getCurrentDate()), // 结束时间
                    this.OpenTheTime3("#searchStartTime", "#searchendData");
                this.fileName = this.pTinfo.list.cameraName; // 获取设备名称
                this.getlineTree(); // 获取天网设备
                document.getElementById("imgbox").width = "0";
                document.getElementById("imgbox").height = "0";
            });
        },
        handleselection(val) {
            this.multipleSelection = val;
        },
        // 勾选所有数据
        selectAll(selection) {
            if (!this.issesionAll) {
                this.$refs.table.clearSelection();
                this.skynetList.forEach(row => {
                    this.$refs.table.toggleRowSelection(row, true);
                });
                this.issesionAll = true;
            } else {
                this.$refs.table.clearSelection();
                this.issesionAll = false;
            }
            // if (
            //   !this.multipleSelection.length &&
            //   !(this.skynetList.length == selection.length)
            // ) {
            //   this.$refs.table.clearSelection();
            //   return;
            // }
            // this.$refs.table.clearSelection();
            // if ((this.skynetList.length - selection.length == this.pageSize &&
            //     (this.currentPage != Math.ceil(this.skynetList.length / this.pageSize)))  ||
            // ((this.skynetList.length - selection.length == this.skynetList.length - (this.currentPage - 1) * this.pageSize) &&
            // this.currentPage == Math.ceil(this.skynetList.length / this.pageSize))) {
            //   this.$refs.table.clearSelection();
            // } else {
            //   this.$refs.table.clearSelection();
            //   this.skynetList.forEach(row => {
            //     this.$refs.table.toggleRowSelection(row, true);
            //   });
            // }
        },
        //请求天网设备
        getlineTree() {
            this.$http.post("sms/ape/selectByVideo").then(res => {
                this.treeline = res.data.data;
                let treeline = res.data.data;
                //通过树列表来获取设备ID
                for (let i = 0; i < treeline.length; i++) {
                    if (treeline[i].apes) {
                        for (let j = 0; j < treeline[i].apes.length; j++) {
                            if (
                                this.pTinfo.list.deviceUuid ==
                                treeline[i].apes[j].shebeiId
                            ) {
                                this.gbDeviceId = treeline[i].apes[j].apeId;
                            }
                        }
                    }
                }
            });
        },
        //通过时间段来查询天网快照,与C++进行http交互
        searhlineImg() {
            // this.inquireTime();
            // return
            this.pathImg = null;
            document.getElementById("imgbox").width = "0";
            document.getElementById("imgbox").height = "0";
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "加载中"
            });
            this.skynetList = [];
            this.$http
                .post(
                    "/searchHisImg/TakeGBSnapshot?file=" +
                        sessionStorage.getItem("controlHead") +
                        this.gbDeviceId +
                        "&t=" +
                        this.beginData.replace(" ", "_") +
                        "@" +
                        this.endData.replace(" ", "_") +
                        "&deviceId=" +
                        this.pTinfo.list.deviceUuid
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.pathImg = res.data.path;
                        console.log(this.pathImg,'天网快照图片');
                        this.loading.close();
                        this.inquireTime();
                        let img = new Image();
                        img.onload = () => {
                            setTimeout(()=>{
                                this.$nextTick(() => {
                                    this.imgscale(".imgbox");
                                });
                            },200)
                        };
                        img.src = this.pathImg;
                    } else {
                        this.loading.close();
                        this.$notify({
                            type: "warning",
                            message: "获取场景图失败，请重试！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                })
                .catch(() => {
                    this.loading.close();
                    this.$notify({
                        type: "warning",
                        message: "获取场景图失败，请重试！",
                        position: "bottom-right",
                        duration: 3000
                    });
                });
        },
        // 时间逻辑判断
        inquireTime() {
            // this.pathImg = 'http://172.24.1.222/group3/M00/BE/45/rBgB310Zvw6AQSTzAAEo0NjXFcc909.jpg';
            this.$refs.table.clearSelection();
            this.skynetList = [];
            let begin = new Date(this.beginData).getTime();
            let end = new Date(this.endData).getTime();
            console.log(begin, end, "查看两个时间");

            let beginStart = Math.ceil((end - begin) / (1000 * 60 * 60));
            if (beginStart > 0) {
                let storeTime = [this.gety(begin)];
                let timeArr = [];
                let beginDate = begin;
                // let aaa = beginDate;
                for (let i = 0; i < beginStart; i++) {
                    beginDate = beginDate + 1000 * 60 * 60;
                    storeTime.push(this.gety(beginDate));
                }
                storeTime.splice(storeTime.length - 1, 1, this.endData);
                for (let k = 0; k < storeTime.length - 1; k++) {
                    timeArr.push({
                        id: k,
                        beginTable: storeTime[k],
                        endTable: storeTime[k + 1]
                    });
                }
                this.skynetList = timeArr;
                this.total = this.skynetList.length;
            } else {
                let begin = new Date(this.beginData);
                let end = new Date(this.endData);
            }
        },
        // 勾选索引id
        handlrowkey(row) {
            return row.id;
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 提交天网结构化
        skynetSubmit() {
            // let count = 0
            //如果没有勾选文件，则返回
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    type: "warning",
                    message: "请选择文件！",
                    position: "bottom-right",
                    duration: 3000
                });
                return;

            }
            let arr = []
            this.multipleSelection.forEach((item)=>{
                return arr.push(item.beginTable.replace(" ", "_")+'|'+item.endTable.replace(" ", "_"))
            })
            let data = {
                submiterId:this.$storage.getSession("userInfo").userId,
                submiterName:this.$storage.getSession("userInfo").userName,
                infoKind:1,
                taskName:'',
                gbDeviceId:this.gbDeviceId,
                snapUrl:'',
                taskStructuralFlag: 1,
                needAutoStruct: 1,
                taskType:1,
                category:2,
                searchType:'',
                size:'',
                clarity:'',
                points:'',
                gbServer:sessionStorage.getItem("controlHead").substring(8, sessionStorage.getItem("controlHead").lastIndexOf(":")),
                gbPort:5000,
                deviceId:this.pTinfo.list.deviceUuid,
                startTime:'',
                endTime:'',
                fileAdd:sessionStorage.getItem("collectAddInterface"),
                fileFini:sessionStorage.getItem("collectFinishInterface"),
                parseAdd:'http://' + sessionStorage.getItem("vsasModuleUrl") +  "/video/search/task/add",
                caseUuid:this.$route.query.caseUuid,
                hdfs:sessionStorage.getItem("collectHdfsPath"),
                sessionId:md5(new Date().getTime() + (Math.floor(Math.random() * (1000 - 1 )) + 1).toString()),
                dateTimes:arr.join(',')
            }
            console.log(data,777);
            data = this.$qs.stringify(data)
            this.$http.post('/vsas/task/sky/create',data).then(res=>{
                this.dialogVisible = false;
                if(res.data.code == 200){
                    this.$notify({
                        type: "success",
                        message: "任务创建成功",
                        position: "bottom-right",
                        duration: 3000
                    });
                }else{
                    this.$notify({
                        type: "error",
                        message: "任务创建失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            })






            return


            for (let i = 0; i < this.multipleSelection.length; i++) {
                setTimeout(() => {
                    this.$http
                        .get(

                        )
                        .then(res => {
                            this.dialogVisible = false;
                            if (res.data.code == 200) {
                                // count++
                                this.$notify({
                                    type: "success",
                                    message: "任务创建成功",
                                    position: "bottom-right",
                                    duration: 3000
                                });
                            } else {
                                console.log("任务创建失败");
                                this.$notify({
                                    type: "error",
                                    message: "任务创建失败",
                                    position: "bottom-right",
                                    duration: 3000
                                });
                            }
                        })
                        .catch(() => {
                            console.log("任务创建失败");
                            this.dialogVisible = false;
                            this.$notify({
                                type: "error",
                                message: "任务创建失败",
                                position: "bottom-right",
                                duration: 3000
                            });
                        });
                }, 30);
                // this.$notify({
                //   type: "error",
                //   message: '成功'+count+'个,失败'+(this.multipleSelection.length - count),
                //   position: "bottom-right",
                //   duration: 3000
                // });

                // let url = `${sessionStorage.getItem("skyNetVideoSearchPath")}?
                //   submiterId=${this.$storage.getSession("userInfo").userId}&
                //   submiterName=${this.$storage.getSession("userInfo").userName}&
                //   infoKind=1&taskName=&gbDeviceId=${this.gbDeviceId}&snapUrl=&taskStructuralFlag=1&
                //   needAutoStruct=1&taskType=1&category=2&searchType=&size=&clarity=&points=&
                //   gbServer=${sessionStorage.getItem("controlHead").substring(8,sessionStorage.getItem("controlHead").lastIndexOf(":"))}&
                //   gbPort=5000&deviceId=${this.pTinfo.list.deviceUuid}&
                //   startTime=${this.multipleSelection[i].beginTable.replace(  " ",  "_")}
                //   &endTime=${this.multipleSelection[i].endTable.replace(" ", "_")}&
                //   fileAdd=${sessionStorage.getItem("collectAddInterface")}&caseUuid=${this.$route.query.caseUuid}&
                //   fileFini=${sessionStorage.getItem("collectFinishInterface")}&
                //   parseAdd=${window.origin + "/vsas/video/search/task/add"}&
                //   hdfs=${sessionStorage.getItem("collectHdfsPath")}`;
                // let onescript = document.createElement("script");
                // onescript.src = url;
                // document.body.appendChild(onescript);
                // this.dialogVisible = false;
            }
            // this.$notify({
            //   type: "success",
            //   message: "任务创建成功",
            //   position: "bottom-right",
            //   duration: 3000
            // });
        }
    }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.taskrelation {
    width: 100%;
    height: 5.3rem;
}
.navBar {
    width: 100%;
    height: 100%;
}
.nav-left {
    float: left;
    width: 5.5rem;
    height: 100%;
}
.bartile {
    line-height: 0.4rem;
    height: 0.4rem;
    color: #fff;
}
.nav-left div {
    position: relative;
    float: left;
    width: 100%;
    height: 4.6rem;
    border: 1px solid #409eff;
}
.nav-left img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.nav-right {
    float: right;
    width: 5.5rem;
}
.nav-right .el-table >>> th {
    padding: 0.1rem 0;
}
.nav-right .el-table >>> td {
    padding: 0.08rem 0;
}
.nav-top {
    height: 0.3rem;
}

.caseNameSelect {
    width: 1.5rem;
    color: #c5c5c5;
}
.caseNameSelectDate {
    width: 2rem;
    font-size: 0.14rem;
    height: 0.24rem;
    border-radius: 0.03rem;
    padding-left: 0.08rem;
}
.pageList .el-pagination {
    white-space: nowrap;
    position: absolute;
    right: 13px;
    bottom: 58px;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
}
</style>
