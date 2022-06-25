<!--
 * @Author: your name
 * @Date: 2020-05-15 14:47:26
 * @LastEditTime : 2021-01-14 16:08:01
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\videoindex.vue
 -->
<template>
    <div class="manage">
        <keep-alive>
            <div class="manageConten">
                <div class="showbox" v-for="(item,index) in titleList" :key="index">
                    <p class="sysmanage hovernone">
                        <img v-if="item.name == '智能应用'" src="../../assets/images/VideoStructPlatform/images/cacpticy.png" alt="">
                        <img v-if="item.name == '系统管理'" src="../../assets/images/VideoStructPlatform/images/manage.png" alt="">
                    </p>
                    <ul class="syslist none">
                        <li
                            @click.stop="downexe(child)"
                            v-for="(child,i) in item.mlist"
                            :key="i "
                            class="item"
                            :to="{path:cssobj[child.menuCode][1],query:{menuCode:child.menuCode}}"
                            :class="cssobj[child.menuCode][0]"
                        ></li>
                    </ul>
                </div>
            </div>
        </keep-alive>
        <div class="rightInfo">
            <div class="rightcontent">
                <div class="current_user">
                 <span> 当&nbsp;前&nbsp;用&nbsp;户</span>
                </div>
                <div class="my_info">
                    <div class="my_info_title">我的信息</div>
                    <div class="my_info_cont">
                        <div class="my_info_cont_l">
                            <div class="user_info">
                                <span
                                    class="user_des"
                                >用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                                <span class="user_name">{{userinfo.userName}}</span>
                            </div>
                            <div class="user_info">
                                <span
                                    class="user_des"
                                >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                                <span class="user_name" :title="userinfo.trueName">{{userinfo.trueName}}</span>
                            </div>
                            <div class="user_info">
                                <span
                                    class="user_des"
                                >所&nbsp;&nbsp;属&nbsp;&nbsp;部&nbsp;&nbsp;门&nbsp;:</span>
                                <span
                                    class="user_name"
                                    :title="userinfo.orgName"
                                >{{userinfo.orgName}}</span>
                            </div>
                            <div class="user_info">
                                <span
                                    class="user_des"
                                >登&nbsp;&nbsp;录&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;:</span>
                                <span
                                    class="user_name"
                                    :title="userinfo.lastLoginTime"
                                >{{userinfo.lastLoginTime}}</span>
                            </div>
                        </div>
                        <div class="my_info_cont_r">
                            <img
                                v-if="imgUrl"
                                :src="this.userinfo.photoUrl == null ? $store.state.defaultcImg : this.userinfo.photoUrl"
                                :onerror="$store.state.defaultcImg"
                            >
                            <img v-else src="../../assets/rl.png" onerror="../../assets/rl.png" alt>
                        </div>
                    </div>
                </div>
                <div class="glaj">
                    <div class="task_title">
                        <span class="task_des">我的任务</span>
                        <!-- <span class="more" @click="gotoMyTask">
                            <em>更多</em>
                            <em>>></em>
                        </span> -->
                    </div>
                    <div class="aj_info">
                        <p v-show="tasklist.length == 0">暂无任务</p>
                        <div class="aj_title" v-show="tasklist.length > 0">
                            <span>任务名称</span>
                            <span>状态</span>
                        </div>
                        <div class="taskcontent">
                             <div
                                class="aj_cont"
                                v-for="(item,index) in tasklist"
                                :key="index"
                                @click="lookTaskInfo(item)"
                            >
                                <span :title="item.taskName">{{item.taskName}}</span>
                                <span :title="item.status | status">{{item.status | status}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import footerSecond from "../../components/footer_second";
// import searchModule from "../../components/search_module";

export default {
    data() {
        return {
            titleList: [],
            searchList: [],
            analyzeList: [],
            deployList: [],
            coutList: [],
            userinfo: {},
            imgUrl: "",
            control: false,
            tasklist: [], //任务数组
            cssobj: {
                701: ["taskManage", "/videoStrucPlat/taskManage"], //任务管理
                702: ["semanticSearch", "/videoStrucPlat/semanticSearch"], //语意搜索
                703: ["searchPrint", "/videoStrucPlat/searchPrint"], //以图搜图
                704: ["resourceManage", "/videoStrucPlat/resourceManage"], //涉案视频管理
                705: ["hashrate", "/videoStrucPlat/hashrate"], //算力分配
                706: ["department", ""], //部门管理
                707: ["user", ""], //用户管理
                708: ["log", ""], //日志管理
                709: ["device", ""] //日志管理
            },
            loading: null
        };
    },
    filters: {
        status(val) {
            if (val == 1) {
                return "执行中";
            }else if (val == 9) {
                return "停止";
            } else if (val == 3) {
                return "排队";
            }else if (val == 4) {
                return "获取视频流";
            }else if (val == 5 || val == 6) {
                return "文件处理中";
            }else if (val == 10) {
                return "失败";
            }else if (val == 0) {
                return "已完成";
            }
        }
    },

    mounted() {
        this.getUserinfo();
        this.getMenuList();
        this.getMyTaskList();
    },
    components: {
        // searchModule
        // footerSecond
    },
    methods: {
        //获取用户信息
        getUserinfo() {
            this.userinfo = this.$storage.getSession("userInfo");
            if (this.userinfo.photoUrl == "") {
                this.imgUrl = false;
            }
        },
        //获取任务列表
        getMyTaskList() {
            let userId = this.$storage.getSession("userInfo").userId;
            this.caseUuid = sessionStorage.getItem("exclusiveCaseUuid");
            let data = {
                orderBy: "updateTime",
                orderType: "desc",
                commitUser: userId,
                taskName: "",
                type: 1, //任务类型
                statusl: "", //任务状态
                begin: "",
                end: "",
                caseUuid: this.caseUuid,
                deviceId: "",
                pageNum: 1,
                pageSize: 10
            };
            this.$http
                .get("vsas/task/new/list", {
                    params: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        if(res.data.data.length > 10){
                            this.tasklist = res.data.data.splice(0,10)
                        }else{
                            this.tasklist = res.data.data;
                        }

                        // for (let i in taskarr) {
                        // if (taskarr[i].status == 0) {
                        //     this.tasklist.push(taskarr[i]);
                        // }
                        // }
                    }
                });
        },
        //跳转到任务列表
        lookTaskInfo(row) {
            console.log(row, 5555);
            if (row.status != 0) {
                this.$notify({
                    type: "warning",
                    message: "当前任务未完成！",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            this.$router.push({
                path: "/videoStrucPlat/semanticSearch?menuCode=702",
                query: {
                    taskinfo: row
                }
            });
        },
        gotoMyTask() {
            this.$router.push("/videoStrucPlat/taskManage?menuCode=701");
        },
        getMenuList() {
            let menuCode = this.$route.query["menuCode"];
            let userId = this.$storage.getSession("userInfo").userName;
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "加载中"
            });
            this.$http({
                url: "sms/menu/secondChildMenu",
                method: "post",
                params: {
                    parentId: menuCode,
                    currentUser: userId
                }
            }).then(res => {
                this.loading.close();
                if (res.statusText == "OK" && res.data.code == 200) {
                    this.titleList = res.data.data;
                    console.log(this.titleList, 146456);
                } else if (res.data.code == 100) {
                    this.$router.push("/login");
                } else {
                    // layer.alert(res.data.message,{icon:5,title:"消息提示"});
                    this.$router.push("/login");
                }
            });
        },
        downexe(val) {
            console.log(val);
            //部门管理 706 601
            //用户管理 707 602
            //日志管理 708 604
            if (val.menuCode == 706) {
                this.$router.push({
                    path: "/manage/departmentManage",
                    query: { menuCode: 601 }
                });
            } else if (val.menuCode == 707) {
                this.$router.push({
                    path: "/manage/userManage/userList",
                    query: { menuCode: 602 }
                });
            } else if (val.menuCode == 708) {
                this.$router.push({
                    path: "/manage/logManage",
                    query: { menuCode: 604 }
                });
            } else if (val.menuCode == 709) {
                this.$router.push({
                    path: "/manage/device",
                    query: { menuCode: 606 }
                });
            } else {
                this.$router.push({
                    path: this.cssobj[val.menuCode][1],
                    query: { menuCode: val.menuCode }
                });
            }
        }
    }
};
</script>


<style lang="scss" scoped>
/* @import "../../assets/css/nav_page_second.css"; */
.manage {
    margin-top: 15vh;
    // height: calc(100vh - 0.6rem);
    height: 70vh;
    padding: 0 1%;
}
.manageConten {
    width: 76%;
    height: 100%;
    float: left;
    box-sizing: border-box;
    background: url("../../assets/images/VideoStructPlatform/images/leftContent.png")
        no-repeat center / 100% 100%;

}
.manageConten .showbox:first-child{
    background: url("../../assets/images/VideoStructPlatform/images/leftcacpticy.png")
        no-repeat center / 100% 100%;
}
.manageConten .showbox:first-child:hover{
    background: url("../../assets/images/VideoStructPlatform/images/leftcacpticyhover.png")
        no-repeat center / 100% 100%;
}

.manageConten .showbox:last-child{
    background: url("../../assets/images/VideoStructPlatform/images/leftmenge.png")
        no-repeat center / 100% 100%;
}
.manageConten .showbox:last-child:hover{
    background: url("../../assets/images/VideoStructPlatform/images/leftmengehover.png")
        no-repeat center / 100% 100%;
}
.showbox {
    width: 43%;
    height: 80%;
    margin-top: 4.5%;
    margin-left: 4.5%;
    float: left;
    cursor: pointer;
    position: relative;
}
.hovernone {
    display: block;
}
.none {
    // display: block;
    display: none;
}
.showbox:hover .none {
    display: block;
}
.showbox:hover .hovernone {
    // display: block;
    display: none;
}
.sysmanage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.text {
    color: #fff;
    margin-left: 0.1rem;
    font-size: 0.22rem;
    line-height: 0.24rem;
}
.syslist {
    width: 100%;
    overflow: hidden;
}
.item {
    width: 1.72rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
}

.rightInfo {
    width: 23%;
    height: 70vh;
    float: right;
}
.rightcontent{
    height: 100%;
    background: url("../../assets/images/VideoStructPlatform/images/rightcontent.png")
        no-repeat center / 100% 100%;
    position: relative;
}
.current_user {
    height: 0.3rem;
    // color: white;
    @include font_color_white("font_color_white1");
    margin: 0.1rem 0.1rem 0 0.1rem;
    line-height: 0.3rem;
    position: relative;
    span{
        width: 1.2rem;
        position: absolute;
        font-size: 0.2rem;
        font-weight: 900;
        font-family: 'Microsoft YaHei';
        left: 5px;
        top: -13px;
        text-align: justify
    }
    span::after{
        display: inline-block;
        width: 100%;
        content:'';
    }
}
.my_info {
    display: flex;
    flex-direction: column;
    @include border-bottom("boder_bottom1");
    .my_info_title {
        display: flex;
        align-items: center;
        height: 0.4rem;
        padding: 0 0.2rem;
        font-size: 0.15rem;
        line-height: 0.4rem;
        font-weight: 700;
        color: #99c9fa;
        // @include font_color_gray("font_color_gray1");
    }
    .my_info_cont {
        display: flex;
        padding-left: 0.2rem;
        align-items: center;
        justify-content: space-around;
        // height: 1.5rem;
        .my_info_cont_l {
            width: 2.6rem;
            font-size: 0.14rem;
            .user_info {
                line-height: 0.3rem;
                width: 2.5rem;
                overflow: hidden;
                color: #f4f5f6;
                .user_des {
                    width: 1.1rem;
                    font-weight: 600;
                    float: left;
                }
                .user_name {
                    width: 1.4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    float: left;
                }
            }
        }
        .my_info_cont_r {
            flex: 1;
            // margin: 0.1rem;
            img {
                width: 65%;
                height: 85%;
            }
        }
    }
}

.glaj {
    display: flex;
    flex-direction: column;
    // border-bottom: 1px solid rgba(15, 44, 79, 0.5);
    @include border-bottom("boder_bottom1");
    .task_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.4rem;
        padding: 0 0.2rem;
        font-size: 0.15rem;
        line-height: 0.4rem;
        color: #99c9fa;
        font-weight: 700;
        .more {
            font-size: 0.14rem;
            cursor: pointer;
        }
    }
    .taskcontent{
        border: 1px solid #4f6894;
        max-height: 3.52rem;
        overflow: auto;
    }
    // .taskcontent .aj_cont:nth-child(odd){
    // }
    .taskcontent .aj_cont:nth-child(even){
        background:rgba(2,89,164,.2);
    }
    .taskcontent .aj_cont:hover{
        background: url("../../assets/images/VideoStructPlatform/images/taskhover.png") no-repeat center / 100% 100%;
    }
    .aj_info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        font-size: 0.14rem;
        line-height: 0.3rem;
        margin-bottom: 0.1rem;
        padding: 0 0.2rem;
        p {
            margin-left: 3%;
            text-align: center;
        }
        .aj_title {
            display: flex;
            justify-content: space-between;
            background:#0259a4;
            font-weight: 600;
            color: #fff;
            line-height: .4rem;
            border: 1px solid #0259a4;
            span {
                text-align: center;
            }
            span:first-child {
                width: calc(100% - 1.5rem);
            }
            span:last-child {
                width: 1.5rem;
            }
        }
        .aj_cont {
            display: flex;
            justify-content: space-between;
            color: #fff;
            cursor: pointer;
            span {
                text-align: center;
                display: inline-block;
                height: 0.35rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span:first-child {
                width: calc(100% - 1.5rem);
                padding:0 0.1rem;
            }
            // span:nth-child(2) {
            //     width: 1.2rem;
            //     overflow: hidden;
            //     text-overflow: ellipsis;
            //     white-space: nowrap;
            // }
            span:last-child {
                width: 1.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color:#03fef5;
            }
        }
    }
}
.glaj:last-child {
    border-bottom: none;
}

//任务管理
.taskManage {
    top: .6rem;
    right: .6rem;
    background: url("../../assets/images/VideoStructPlatform/images/taskManage.png")
        no-repeat center / 100% 100%;
}
.taskManage:hover {
    background: url("../../assets/images/VideoStructPlatform/images/taskManagehover.png")
        no-repeat center / 100% 100%;
}

//特诊搜索
.semanticSearch {
    bottom: .6rem;
    left: .6rem;
    background: url("../../assets/images/VideoStructPlatform/images/semanticSearch.png")
        no-repeat center / 100% 100%;
}
.semanticSearch:hover {
    background: url("../../assets/images/VideoStructPlatform/images/semanticSearchhover.png")
        no-repeat center / 100% 100%;
}

//以图搜图
.searchPrint {
    bottom: .6rem;
    right: 1.45rem;
    background: url("../../assets/images/VideoStructPlatform/images/searchPrint.png")
        no-repeat center / 100% 100%;
}
.searchPrint:hover {
    background: url("../../assets/images/VideoStructPlatform/images/searchPrinthover.png")
        no-repeat center / 100% 100%;
}
//涉案视频管理
.resourceManage {
    top: .6rem;
    left: 1.45rem;
    background: url("../../assets/images/VideoStructPlatform/images/resourceManage.png")
        no-repeat center / 100% 100%;
}
.resourceManage:hover {
    background: url("../../assets/images/VideoStructPlatform/images/resourceManagehover.png")
        no-repeat center / 100% 100%;
}

.hashrate {
    background: url("../../assets/images/VideoStructPlatform/hashrate.png")
        no-repeat center / 100% 100%;
}
.hashrate:hover {
    background: url("../../assets/images/VideoStructPlatform/hashratehover.png")
        no-repeat center / 100% 100%;
}
//部门管理
.department {
    top: .6rem;
    left: 1.45rem;
    background: url("../../assets/images/VideoStructPlatform/images/departmentnormal.png")
        no-repeat center / 100% 100%;
}
.department:hover {
    background: url("../../assets/images/VideoStructPlatform/images/departmenthover.png")
        no-repeat center / 100% 100%;
}
//用户管理
.user {
    top: .6rem;
    right: .6rem;
    background: url("../../assets/images/VideoStructPlatform/images/usernormal.png")
        no-repeat center / 100% 100%;
}
.user:hover {
    background: url("../../assets/images/VideoStructPlatform/images/userhover.png")
        no-repeat center / 100% 100%;
}
//日志管理
.log {
    bottom: .6rem;
    left: .6rem;
    background: url("../../assets/images/VideoStructPlatform/images/lognormal.png")
        no-repeat center / 100% 100%;
}
.log:hover {
    background: url("../../assets/images/VideoStructPlatform/images/loghover.png")
        no-repeat center / 100% 100%;
}
//点位管理
.device {
    bottom: .6rem;
    right: 1.45rem;
    background: url("../../assets/images/VideoStructPlatform/images/quitpmentnormal.png")
        no-repeat center / 100% 100%;
}
.device:hover {
    background: url("../../assets/images/VideoStructPlatform/images/quitpmenthover.png")
        no-repeat center / 100% 100%;
}
</style>
