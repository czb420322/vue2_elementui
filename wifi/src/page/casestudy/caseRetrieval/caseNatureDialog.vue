<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:20
 * @LastEditTime : 2020-11-09 09:20:52
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\caseRetrieval\caseNatureDialog.vue
 * @
 -->
<template>
    <div class="dialogWrapper">
        <el-dialog
            :visible.sync="dialogVisible"
            width="11.5rem"
            min-width="906px"
            top="5%"
            title="案件属性比对"
            @close="closeDia"
        >
            <div class="dialogContainer">
                <!--案件详细属性列表-->
                <div class="dialogDetail">
                    <div class="detailItemLeft">
                        <div class="natureName">案件属性</div>
                        <!-- <div class="natureName naturePicture">案件截图</div> -->
                        <div class="natureName">案件编号</div>
                        <div class="natureName">案件名称</div>
                        <div class="natureName">案发时间</div>
                        <div class="natureName">案发区域</div>
                        <div class="natureName">案件类型</div>
                        <div class="natureName">作案时机</div>
                        <div class="natureName">危害程度</div>
                        <div class="natureName">作案手段</div>
                        <div class="natureName">侵犯目标</div>
                        <div class="natureName">作案工具</div>
                        <div class="natureName">案件状态</div>
                        <div class="natureName operation">操作</div>
                    </div>
                    <div class="detailItemRight">
                        <div class="ownNature">
                            <div class="natureName natureNamefirst">原点案件</div>
                            <!-- <div class="natureItem naturePicture">
                  <img style="width: 100%;height: 100%" :src="caseItem.caseImgUrl" alt="暂无图片">
                            </div>-->
                            <div class="natureItem" :title="caseItem.caseLinkMark">{{ caseItem.caseLinkMark }}</div>
                            <div
                                class="natureItem"
                                :title="caseItem.caseName"
                            >{{ caseItem.caseName }}</div>
                            <div class="natureItem">{{ caseItem.timeLowLimit }}</div>
                            <div class="natureItem">{{ caseItem.regionFullName }}</div>
                            <div class="natureItem">{{ caseItem.caseCategoryDesc }}</div>
                            <div class="natureItem">{{ caseItem.caseOpportunityDesc }}</div>
                            <div class="natureItem">{{ caseItem.caseLevelDesc }}</div>
                            <div class="natureItem">{{ caseItem.caseMethodDesc }}</div>
                            <div class="natureItem">{{ caseItem.caseTargetDesc }}</div>
                            <div class="natureItem">{{ caseItem.caseToolDesc }}</div>
                            <div class="natureItem">{{ caseItem.stateDesc }}</div>
                            <div class="natureItem operation"></div>
                        </div>

                        <div class="othersNature" v-for="(item, index) in compareList" :key="index">
                            <div class="natureName natureNamefirst">候选案件</div>
                            <!-- <div class="natureItem naturePicture">
                  <img style="width: 100%;height: 100%" :src="item.caseImgUrl" alt="暂无图片">
                            </div>-->
                            <div class="natureItem" :title="item.caseLinkMark">{{ item.caseLinkMark }}</div>
                            <div class="natureItem" :title="item.caseName">{{ item.caseName }}</div>
                            <div class="natureItem">{{ item.timeLowLimit }}</div>
                            <div class="natureItem">{{ item.regionFullName }}</div>
                            <div class="natureItem">{{ item.caseCategoryDesc }}</div>
                            <div class="natureItem">{{ item.caseOpportunityDesc }}</div>
                            <div class="natureItem">{{ item.caseLevelDesc }}</div>
                            <div class="natureItem">{{ item.caseMethodDesc }}</div>
                            <div class="natureItem">{{ item.caseTargetDesc }}</div>
                            <div class="natureItem">{{ item.caseToolDesc }}</div>
                            <div class="natureItem">{{ item.stateDesc }}</div>
                            <div class="natureItem operation">
                                <div class="addNature searchBtn" @click="addCase(item)">
                                    <img
                                        style="margin-top: 0.02rem;margin-right: 0.05rem"
                                        src="../../../assets/case/caseRetrievalSearch-add-icon.png"
                                        alt
                                    >添加
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pageNation">
                    <el-pagination
                        style="float: right;margin-right: 10px;"
                        :background="true"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="Number(this.pageNo)"
                        :page-sizes="[10, 20, 30, 40, 50, 100]"
                        :page-size="Number(this.pageSize)"
                        layout="total, prev, pager, next, jumper"
                        :total="Number(this.totalNum)"
                    ></el-pagination>
                </div>

                <!--案件普通列表-->
                <div class="caseListTitle">案件列表</div>
                <div class="caseListItem caseListItemdel">
                    <div class="caseListItemImg" @click="lookCase(caseItem)">
                        <img
                            style="width: 2.6rem;height: 1.7rem"
                            :src="caseItem.caseImgUrl"
                            v-show="caseItem.caseImgUrl != null"
                            alt="暂无图片"
                        >
                        <img
                            style="width: 2.6rem;height: 1.7rem"
                            src="../../../assets/error_none.png"
                            v-show="caseItem.caseImgUrl == null"
                            alt="暂无图片"
                        >
                        <!-- <img style="width: 2.6rem;height: 1.7rem" src="@/assets/error_none.png"   v-show="!caseItem.caseImgUrl"> -->
                    </div>
                    <div class="caseListItemTxt">
                        <div class="caseListItemTxtTitle" :title="caseItem.caseName">
                            <span class="leftWrods">案件名称:</span>
                            <span>{{ caseItem.caseName }}</span>
                        </div>
                        <div class="caseListItemTxtItem">
                            <div class="caseListItemTxtItemLeft">
                                <div>
                                    <span class="leftWrods">案件编号:</span>
                                    <span>{{ caseItem.caseLinkMark }}</span>
                                </div>
                                <div>
                                    <span class="leftWrods">案发时间:</span>
                                    <span>{{ caseItem.timeLowLimit }}</span>
                                </div>
                                <div>
                                    <span class="leftWrods">案件类型:</span>
                                    <span>{{ caseItem.caseCategoryDesc }}</span>
                                </div>
                            </div>
                            <div class="caseListItemTxtItemRight">
                                <div>
                                    <span class="leftWrods">案发区域:</span>
                                    <span>{{ caseItem.regionFullName }}</span>
                                </div>
                                <div>
                                    <span class="leftWrods">案件状态:</span>
                                    <span>{{ caseItem.stateDesc }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="caseListItemTxtDetial" :title="caseItem.caseAbstract">
                            <div style="width: 0.6rem" class="leftWrods detailItemTxtDetial">案件描述:</div>
                            <span>{{caseItem.caseAbstract}}</span>
                        </div>
                    </div>
                </div>

                <div
                    class="caseListItem nobg caseListItemdel"
                    v-for="(item ,index) in caseList"
                    :key="index"
                >
                    <div class="caseListItemImg" @click="lookCase(item)">
                        <img
                            style="width: 2.6rem;height: 1.7rem"
                            :src="item.caseImgUrl"
                            v-show="item.caseImgUrl != null"
                            :onerror="$store.state.defaultImg"
                            alt="暂无图片"
                        >
                        <img
                            style="width: 2.6rem;height: 1.7rem"
                            src="../../../assets/error_none.png"
                            v-show="item.caseImgUrl == null"
                            alt="暂无图片"
                        >
                    </div>
                    <div class="caseListItemTxt">
                        <div class="caseListItemTxtTitle" :title="item.caseName">
                            <span class="leftWrods">案件名称:</span>
                            <span>{{item.caseName}}</span>
                        </div>
                        <div class="caseListItemTxtItem">
                            <div class="caseListItemTxtItemLeft">
                                <div>
                                    <span class="leftWrods">案件编号:</span>
                                    <span>{{ item.caseLinkMark }}</span>
                                </div>
                                <div>
                                    <span class="leftWrods">案发时间:</span>
                                    <span>{{ item.timeLowLimit }}</span>
                                </div>
                                <div>
                                    <span class="leftWrods">案件类型:</span>
                                    <span>{{ item.caseCategoryDesc }}</span>
                                </div>
                            </div>
                            <div class="caseListItemTxtItemRight">
                                <div>
                                    <span class="leftWrods">案发区域:</span>
                                    <span>{{ item.regionFullName }}</span>
                                </div>
                                <div>
                                    <span class="leftWrods">案件状态:</span>
                                    <span>{{ item.stateDesc }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="caseListItemTxtDetial" :title="item.caseAbstract">
                            <div style="width: 0.6rem" class="leftWrods detailItemTxtDetial">案件描述:</div>
                            <span>{{ item.caseAbstract }}</span>
                        </div>
                    </div>
                    <div class="caseListItemHandle">
                        <div class="deleteBtn delBtn" @click="delCase(index)">
                            <div
                                class="el-icon-delete"
                                style="font-size: 0.2rem;margin-top: 0.02rem;margin-right: 0.02rem;"
                            ></div>
                            <div>删除</div>
                        </div>
                    </div>
                </div>

                <!--<div class="dialogHandle"></div>-->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary cancleBtn" @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary passBtn" @click="checkcaseList()">保存串并</el-button>
            </span>
            <el-dialog width="30%" title="串并案保存" :visible.sync="innerVisible" append-to-body>
                <div class="totalbox">
                    <el-form
                        :model="caseForm"
                        :rules="rules"
                        ref="caseForm"
                        label-width="100px"
                        class="demo-caseForm caseForm"
                    >
                        <el-form-item label="串并案名称" prop="addCaseName">
                            <el-input v-model="caseForm.addCaseName" placeholder="请输入串并案名称"></el-input>
                        </el-form-item>
                        <el-form-item label="串并案描述" prop="addDescription">
                            <el-input
                                type="textarea"
                                v-model="caseForm.addDescription"
                                :rows="2"
                                placeholder="请输入串并案描述"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary cancleBtn" @click="Resets">取消</el-button>
                    <el-button type="primary passBtn" @click="saveCasCase()">确定</el-button>
                </span>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        caseUuid: {
            type: String,
            default() {
                return "";
            }
        }
    },
    data() {
        return {
            pageNo: 1,
            pageSize: 4,
            totalNum: 0,
            caseItem: {}, //通过传入的参数获取当前案件的基本信息
            innerVisible: false,
            caseList: [], // 保存添加的案件列表
            compareList: [], //获取比对的列表
            showtext: false,
            caseForm: {
                addCaseName: "",
                addDescription: ""
            },
            //表单验证
            rules: {
                addCaseName: [
                    {
                        required: true,
                        message: "请输入串并案名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 50,
                        message: "长度在3-50个字符以内",
                        trigger: "blur"
                    }
                ],
                addDescription: [
                    {
                        required: true,
                        message: "请输入串并案描述",
                        trigger: "blur"
                    },
                    {
                        min: 0,
                        max: 255,
                        message: "长度在255 个字符以内",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {},

    methods: {
        closeDia() {
            if (this.$route.path == "/videoCombat/videoplay") {
                document.title = document.title + ".";
            } else if (this.$route.path == "/videoCombat/realvideo") {
                document.title = document.title + "..";
            } else if (this.$route.path == "/videoCombat/historyvideo") {
                document.title = document.title + "....";
            }
        },
        getBaseInfo() {
            this.$http({
                url: "pca/casemng/baseinfo/query",
                method: "get",
                params: {
                    caseUuid: this.caseUuid
                }
            })
                .then(res => {
                    if (res.data.code === 200) {
                        this.caseItem = res.data.data;
                    } else {
                        this.$notify({
                            type: "warning",
                            message: "获取案件信息失败！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                })
                .catch(err => {});
        },
        //添加案件
        addCase(obj) {
            if (this.caseList.length === 0) {
                this.caseList.push(obj);
            } else {
                for (let i = 0; i < this.caseList.length; i++) {
                    if (this.caseList[i] === obj) {
                        this.$notify({
                            type: "warning",
                            message: "请勿重复添加！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return;
                    }
                }
                this.caseList.push(obj);
            }
        },
        //删除案件
        delCase(index) {
            this.caseList.splice(index, 1);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getCompareList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getCompareList();
        },

        //获取比对列表
        getCompareList() {
            let params = {
                caseId: this.caseUuid,
                pageNum: this.pageNo,
                pageSize: this.pageSize,
                orderType: "desc",
                orderBy: "similarity"
            };
            let data = this.$qs.stringify(params);
            this.$http({
                url: "pca/search/advanced/caseStudy",
                method: "post",
                data: data
            }).then(res => {
                if (res.data.code === 200) {
                    this.compareList = res.data.data.list;
                    this.totalNum = res.data.data.totalCount;
                } else {
                    this.$notify({
                        type: "warning",
                        message: "获取比对列表失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },

        //打开保存串并窗口
        checkcaseList() {
            if (this.caseList.length < 1) {
                this.$notify({
                    type: "warning",
                    message: "必须添加至少一个案件",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            } else {
                this.innerVisible = true;
            }
        },

        //确认保存串并
        saveCasCase() {
            this.$refs["caseForm"].validate(valid => {
                if (valid) {
                    let idArr = [];
                    idArr.push(this.caseItem.caseUuid);
                    this.caseList.forEach(item => {
                        idArr.push(item.caseUuid);
                    });
                    let data = {
                        ids: idArr.join(","),
                        caseName: this.caseForm.addCaseName, //当前页
                        description: this.caseForm.addDescription //当前页结果数量
                    };
                    data = this.$qs.stringify(data);
                    this.$http
                        .post("pca/combo/myCombo/addCaseComboInfo", data)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$notify({
                                    type: "success",
                                    message: "保存串并案成功！",
                                    position: "bottom-right",
                                    duration: 3000
                                });
                                this.Resets();
                                this.dialogVisible = false;
                            } else if (res.data.code == 100) {
                                this.$notify({
                                    type: "warning",
                                    message: res.data.message,
                                    position: "bottom-right",
                                    duration: 3000
                                });
                            } else {
                                this.$notify({
                                    type: "error",
                                    message: "请求失败，服务器异常！",
                                    position: "bottom-right",
                                    duration: 3000
                                });
                            }
                        });
                }
            });
        },
        // 重置内层弹窗输入框
        Resets() {
            this.$refs["caseForm"].resetFields();
            this.innerVisible = false;
        },
        //打开新窗口进入详情页
        lookCase(item) {
            let { href } = this.$router.resolve({
                path: "/casestudy/casePicture_look?menuCode=200",
                query: { caseUuid: item.caseUuid }
            });
            window.open(href, "_blank");
        }
    },

    computed: {
        dialogVisible: {
            get: function() {
                return this.$store.state.caseNatureDialogFlag;
            },
            set: function(newVal) {
                this.$store.state.caseNatureDialogFlag = newVal;
            }
        }
    },
    watch: {
        dialogVisible: function() {
            if (this.dialogVisible == true) {
                this.getBaseInfo();
                this.pageNo = 1;
                this.pageSize = 4;
                this.getCompareList();
                this.caseList = [];
            }
        }
        // caseObj:{
        //   handler(newValue,oldValue){
        //     this.caseUuid = newValue.caseUuid;
        //     this.getBaseInfo();
        //     this.pageNo = 1;
        //     this.pageSize = 4;
        //     this.getCompareList();
        //   },
        //   deep:true
        // }
    }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";

.dialogContainer {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 6.3rem;
}

.dialogDetail {
    /* border: 0.01rem solid #DFE0E0; */
    border-bottom: 0;
    display: flex;
}

.detailItemLeft {
    display: flex;
    flex-direction: column;
    width: 10%;
}

.detailItemRight {
    display: flex;
}

.caseAbstract {
    height: 1rem !important;
    align-items: baseline !important;
    white-space: inherit !important;
    word-break: break-all;
}

.operation {
    height: 0.5rem !important;
}
.natureName,
.natureItem {
    border-bottom: 0.01rem solid #112845;
    border-right: 0.01rem solid #112845;
    width: 100%;
    text-align: center;
    font-size: 0.14rem;
    height: 0.3rem;
    max-height: 30px;
}
.natureItem {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.natureName {
    background-color: #102338;
    /* border-color:white; */
    color: #99c9fa;
}

.natureNamefirst,
.natureItem {
    background-color: rgba(16, 35, 56, 0.5);
    color: #99c9fa;
}
.detailItemLeft .natureName:first-child {
    border-top: 0.01rem solid #112845;
}

.naturePicture {
    height: 1rem !important;
}
.detailItemRight .natureName:first-child {
    border-top: 0.01rem solid #112845;
}

.detailItemRight {
    width: 90%;
    height: 100%;
}

.ownNature {
    width: 20%;
}

.othersNature {
    width: 20%;
    /* border-right: 0.01rem solid #CDCFCF; */
}

.addNature {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 0.8rem;
    margin-top: 3px;
    border-radius: 0.03rem;
    cursor: pointer;
    margin-left: 0.6rem;
}

.pageNation {
    margin-top: 0.1rem;
    width: 100%;
}

.caseList {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.caseListTitle {
    width: 100%;
    font-size: 0.15rem;
    margin-bottom: 0.1rem;
    margin-top: 0.25rem;
    font-weight: bold;
    color: #fff;
}

/*列表数据 */
.caseListItem {
    width: 100%;
    display: flex;
    border: 0.01rem solid #e5e4e8;
    background-color: #fbf9fa;
    font-size: 0.14rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
}
.caseListItemdel {
    margin-bottom: 0.04rem;
    background-color: rgba(16, 35, 56, 0.5);
    border: 1px solid rgba(15, 44, 79, 0.5);
    color: #99c9fa;
}
.caseListItemImg {
    width: 25%;
}

.caseListItemTxt {
    height: 100%;
    width: 65%;
    display: flex;
    flex-direction: column;
    padding-left: 0.2rem;
}

.caseListItemTxtTitle {
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    font-size: 0.14rem;
    font-weight: 600;
}
.caseListItemTxtTitle span:last-child {
    width: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.caseListItemTxtItem {
    width: 100%;
    height: 40%;
    display: flex;
    font-size: 0.14rem;
}

.caseListItemTxtItemLeft {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.must {
    color: red;
}
.caseListItemTxtItemRight {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.caseListItemTxtDetial {
    width: 100%;
    height: 30%;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 0.14rem;
    display: flex;
}
.caseListItemTxtDetial span {
    width: 2.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
}

.leftWrods {
    color: #99c9fa;
}

.dialogWrapper /deep/ .el-dialog__footer {
    padding: 0.1rem 0.2rem 0.2rem;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}

.el-dialog__wrapper /deep/ .el-dialog__footer {
    padding: 0.1rem 0.2rem 0.2rem;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}

.caseListItemHandle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding-right: 0.2rem;
}

.deleteBtn {
    /* background-color: #F56C6C; */
    padding: 0.02rem 0.08rem;
    border-radius: 0.03rem;
    display: flex;
}

.dialogWrapper /deep/ .el-dialog__body {
    color: #606266;
    line-height: 0.24rem;
    font-size: 0.14rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.2rem;
    padding-right: 0.05rem;
}
.el-dialog__wrapper
    /deep/
    .el-dialog
    .dialog-footer
    .el-button--default:last-child {
    width: 1rem;
}
.totalbox {
    color: #99c9fa;
}
</style>
