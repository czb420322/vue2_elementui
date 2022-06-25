<!--
 * @Author: your name
 * @Date: 2020-11-18 15:00:24
 * @LastEditTime : 2021-06-21 14:52:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev-1.7.3\vacp-wfes\src\page\VideoStructPlatform\resourceManage.vue
 -->
<template>
    <div class="onlinecoll">
        <div class="topInfo">
            <img src="../../assets/updataImg/location.png" alt>
            <span class="sysname childname">当前位置：</span>
            <!-- <router-link class="sysname" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页 ></router-link> -->
            <span class="sysname" @click="gotoplat">首页 ></span>
            <p class="sysname">&nbsp;涉案视频管理</p>
            <p class="clicklink">
                <!-- <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link> -->
                <span @click="gotoplat">首页</span>
                <span @click="gototasl">任务管理</span>
                <span @click="gotofeat">特征搜索</span>
                <span @click="gotosimg">以图搜图</span>
                <span @click="gotosreat">检索查询</span>
                <span @click="gotocase">案件管理</span>
                <span @click="gotolable">标注池</span>
            </p>
        </div>
        <div class="main">
            <div class="mainleft">
                <el-tabs v-model="initTab" type="border-card" @tab-click="handleClick">
                    <el-tab-pane name="video">
                        <span slot="label">
                            <i class="el-icon-date"></i>天网
                        </span>
                        <input v-if="initTab == 'video'" type="text" id="keyValue" v-model="keyValue">

                        <ul v-if="initTab == 'video'" id="treeDemo" class="ztree"></ul>
                    </el-tab-pane>
                    <el-tab-pane name="people">
                        <span slot="label">
                            <i class="el-icon-date"></i>社会面
                        </span>
                        <input v-if="initTab == 'people'" type="text" id="keyValue" v-model="keyValue">
                        <p class="aaa" title="点击区域名称显示设备列表，并可新增设备">点击区域名称显示设备列表</p>
                        <ul v-if="initTab == 'people'" id="treeDemo" class="ztree"></ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="mainright">
                <skynet v-if="showskylist" :inittitle="initTab" :skynetlist="skynetlist"
                    :regionId="regionId"></skynet>
                <linevideo-list v-if="initTab == 'people' && !showskylist" :nodesFatherId="nodesFatherId"
                    :getcaseUuid="caseUuid" :deviceUuid="deviceUuid"></linevideo-list>

                <linevideoplay v-show="showplayvideo" :deviceUuid="deviceUuid" :caseUuid="caseUuid" class="lines">
                </linevideoplay>
            </div>
        </div>
    </div>
</template>

<script>
    import province from "@/components/province";
    import realvideo from "../../api/realvideo/realvideo.js";
    import skynet from "./resourceManCompon/skynet"; //天网展示
    import linevideoList from "./resourceManCompon/linevideoList"; //天网展示
    import resourceManage from "../../api/VideoStructPlatform/resourceManage.js";
    import {
        mapActions,
        mapMutations,
        mapState,
        mapGetters
    } from "vuex";

    export default {
        data() {
            return {};
        },
        watch: {
            // keyValue(newV) {
            //     this.searchFun(newV, null, true);
            // }
        },
        components: {
            province,
            skynet,
            linevideoList,
            linevideoplay: () => import("./resourceManCompon/linevideoplay.vue")
        },
        computed: {
            ...mapGetters([
                "showplayvideo", //展示播放界面
                'onlineDeviceList'
            ])
        },
        mounted() {
            this.querySocietyData(0,1);

            // setTimeout(() => {
            //     let dom = document.getElementById("treeDemo_2_span");
            //     if (dom) {
            //         this.$nextTick(() => {
            //             dom.click();
            //         });
            //     }
            // }, 1000);
        },
        mixins: [realvideo, resourceManage],
        methods: {
            gotoplat() {
                this.setshowplayvideo(false);
                setTimeout(() => {
                    this.$router.push({
                        path: "/videoStrucPlat?menuCode=700"
                    });
                }, 10);
            },
            gototasl() {
                this.setshowplayvideo(false);
                setTimeout(() => {
                    this.$router.push({
                        path: "/videoStrucPlat/taskManage?menuCode=701"
                    });
                }, 10);
            },
            gotofeat() {
                this.setshowplayvideo(false);
                setTimeout(() => {
                    this.$router.push({
                        path: "/videoStrucPlat/semanticSearch?menuCode=702"
                    });
                }, 10);
            },
            gotosimg() {
                this.setshowplayvideo(false);
                setTimeout(() => {
                    this.$router.push({
                        path: "/videoStrucPlat/searchPrint?menuCode=703"
                    });
                }, 10);
            },
            gotosreat() {
                this.setshowplayvideo(false);
                setTimeout(() => {
                    this.$router.push({
                        path: "/videoStrucPlat/videoRetrieval?menuCode=710"
                    });
                }, 10);
            },
            gotocase() {
                this.setshowplayvideo(false);
                setTimeout(() => {
                    this.$router.push({
                        path: "/videoStrucPlat/caseList?menuCode=711"
                    });
                }, 10);
            },
            gotolable() {
                this.setshowplayvideo(false);
                setTimeout(() => {
                    this.$router.push({
                        path: "/videoStrucPlat/MarkPool?menuCode=712"
                    });
                }, 10);
            }
        }
    };
</script>

<style scoped>
    @import "../../assets/css/commom.css";

    .onlinecoll {
        width: 100%;
        min-width: 1200px;
        position: absolute;
        top: 0.6rem;
        bottom: 0px;
        left: 0px;
    }

    .main {
        padding: 0;
        width: 100%;
        position: absolute;
        top: 0.4rem;
        bottom: 0;
        left: 0;
        overflow: auto;
    }

    .mainleft {
        width: 22%;
        height: 100%;
        float: left;
    }

    .mainleft>div {
        height: 100%;
    }

    .el-tabs .el-tabs__content,
    .el-tabs /deep/ .el-tabs__content {
        height: calc(100% - 0.4rem);
    }

    .el-tabs .el-tab-pane,
    .el-tabs /deep/ .el-tab-pane {
        height: 100%;
    }

    .el-tabs .el-tabs__content input,
    .el-tabs /deep/ .el-tabs__content input {
        line-height: 0.25rem;
        height: 0.25rem;
        padding-left: 0.1rem;
    }

    .el-tabs .el-tabs__content .el-tab-pane>ul,
    .el-tabs /deep/ .el-tabs__content .el-tab-pane>ul {
        margin-top: 0.1rem;
        height: calc(100% - 0.4rem);
        /* border: 1px solid blue; */
        /* box-sizing: border-box; */
        overflow: auto;
    }

    .el-tabs .ztree li a.curSelectedNode,
    .el-tabs /deep/ .ztree li a.curSelectedNode {
        background-color: transparent;
        border: none;
        color: #409eff !important;
        /* color: #fff !important; */
        opacity: 1;
    }

    .el-tabs .level1,
    .el-tabs /deep/ .level1 {
        width: calc(100% - 0.2rem);
    }

    .el-tabs .node_name,
    .el-tabs /deep/ .node_name {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .mainleft .el-tabs__item,
    .mainleft /deep/ .el-tabs__item {
        padding: 0 0.16rem;
        height: 0.4rem;
        line-height: 0.4rem;
    }

    .mainleft .el-tabs__item:nth-child(2),
    .mainleft /deep/ .el-tabs__item:nth-child(2) {
        padding-left: 0.16rem;
        margin: 0 0.05rem;
    }

    .mainleft .el-tabs__item:last-child,
    .mainleft /deep/ .el-tabs__item:last-child {
        padding-right: 0.16rem;
        margin-left: 0.05rem;
    }

    .mainleft .el-tabs__item span,
    .mainleft /deep/ .el-tabs__item span {
        font-size: 0.14rem;
    }

    .mainleft .el-tabs__nav-prev,
    .mainleft .el-tabs__nav-next,
    .mainleft /deep/ .el-tabs__nav-prev,
    .mainleft /deep/ .el-tabs__nav-next {
        line-height: 0.44rem;
    }

    .mainright {
        /* overflow: hidden; */
        width: 78%;
        height: 100%;
        float: right;
        position: relative;
    }

    .el-tabs--border-card {
        border: 1px solid rgba(15, 44, 79, 0.5);
        background-color: rgba(16, 35, 56, 0.5);
    }

    .el-tabs--border-card .el-tabs__header,
    .el-tabs--border-card /deep/ .el-tabs__header {
        border: 1px solid rgba(15, 44, 79, 0.5);
        background-color: rgba(16, 35, 56, 0.5);
    }

    .el-tabs--border-card .el-tabs__header .el-tabs__item,
    .el-tabs--border-card /deep/ .el-tabs__header .el-tabs__item {
        color: #99c9fa;
        border-top: 3px solid rgba(20, 57, 96, 0.8);
        background-color: rgba(20, 57, 96, 0.8);
    }

    .el-tabs--border-card .el-tabs__header .el-tabs__item.is-active,
    .el-tabs--border-card /deep/ .el-tabs__header .el-tabs__item.is-active {
        color: #409eff;
        border: 0px solid rgba(15, 44, 79, 0.5);
        background-color: rgba(16, 35, 56, 0.5);
        border-top: 3px solid #409eff;
    }

    .el-select {
        width: 2.5rem;
    }

    .el-select .el-input__inner,
    .el-select /deep/ .el-input__inner {
        height: 0.3rem;
        font-size: 0.14rem;
    }

    .span-ellipsis {
        color: #99c9fa;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .markNoBorder {
        background-color: rgba(49, 86, 131, 0.2);
    }

    .aaa {
        display: inline-block;
        line-height: 0.25rem;
        font-size: 0.14rem;
    }

    .lines {
        width: calc(100% - 0.3rem);
        height: 6.25rem;
        position: absolute;
        border: 1px solid #275280;
        top: 0.4rem;
        left: 0.15rem;
        background: url('../../assets/updataImg/home-bg.png');
        /* background-color: rgba(32, 49, 67); */
        z-index: 99;
    }
</style>
