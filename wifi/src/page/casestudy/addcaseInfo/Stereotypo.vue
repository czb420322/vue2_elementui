<template>
    <div class="stereoTypo">
        <div ref="typoleft" class="typoleft">
            <el-tabs type="border-card" v-model="activeName" @tab-click="tabClickHandler">
                <el-tab-pane name="one">
                    <span slot="label">
                        <i class="el-icon-date"></i> 天网
                    </span>
                    <div class="ss">
                        <div class="titlebox">
                            <el-input v-model="filterText1" placeholder="请输入点位名称" id="key"></el-input>
                            <el-button
                                class="searchBtn"
                                icon="el-icon-search"
                                @click="searchTreeHandler(1)"
                            ></el-button>
                        </div>
                    </div>
                    <ul id="treeDemo" class="ztree"></ul>
                </el-tab-pane>

                <el-tab-pane label="社会面" name="two">
                    <span slot="label">
                        <i class="el-icon-date"></i>社会面
                    </span>
                    <div class="ss">
                        <div class="titlebox">
                            <el-input v-model="filterText4" placeholder="请输入点位名称" id="key4"></el-input>
                            <el-button
                                class="searchBtn"
                                icon="el-icon-search"
                                @click="searchTreeHandler(4)"
                            ></el-button>
                        </div>
                    </div>
                    <ul id="treeDemo4" class="ztree"></ul>
                </el-tab-pane>
            </el-tabs>
            <div class="map" v-show="isShowBtn">
                <div class="itemIcon" @click="drawReact"></div>
                <div class="itemIcon" @click="closeDraw"></div>
                <div class="itemIcon" @click="clearDrawing"></div>
            </div>
        </div>
        <div class="typoright">
            <div id="mapCenter"></div>
            <!--
      <img
        class="imgs"
        @click="showtrre"
        v-show="imgchange"
        src="../../../assets/images/videoCombat/left.png"
        alt
            >-->
            <div class="imgs" @click="showtrre" v-show="imgchange">
                <i class="el-icon-caret-left" style="font-size: 0.2rem; color: #fff"></i>
            </div>
            <div class="imgs" @click="hidetree" v-show="!imgchange">
                <i class="el-icon-caret-right" style="font-size: 0.2rem; color: #fff"></i>
            </div>
            <!--
      <img
        class="imgs"
        @click="hidetree"
        v-show="!imgchange"
        src="../../../assets/images/videoCombat/right.png"
        alt
            >-->
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import maps from "../../../api/realvideo/map.js";
import realvideo from "../../../api/realvideo/realvideo.js";
import { mapState, mapActions } from "vuex";
let videoIcosmall = require("@/assets/images/device/videosmall.png");
let carIcosmall = require("@/assets/images/device/carsmall.png");
let faceIcosmall = require("@/assets/images/device/personsmall.png");
let RFIDIcosmall = require("@/assets/images/device/RFIDsmall.png");
let cased = require("@/assets/images/device/duang.png");
export default {
    data() {
        return {
            imgchange: true,
            videoList: [],
            societyData: [],
            filterText1: "",
            filterText4: "",
            defaultProps: {
                children: "apes",
                label: "name"
            },
            index: "0",
            treeList1: [], //存放点位的数组
            treeList4: [], //存放点位的数组
            treeList5: [],
            treeList6: [], //信息点
            treeList8: [],
            isfalse: false,
            deviceList: [], //天网点
            deviceSList: [], //社会面点
            deviceList1: [],
            deviceSList1: [],
            applyList: [], //天网渲染点
            applySList: [], //社会面渲染点
            drawingManager: "",
            styleOptions: {
                strokeColor: "red", //边线颜色。
                fillColor: "rgba(255,0,0,.3)", //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3, //边线的宽度，以像素为单位。
                strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
                strokeStyle: "solid" //边线的样式，solid或dashed。
            },
            allNodes: [], //树的所有节点集合
            treeObj: null, //树对象
            treeObj4: null, //树对象
            activeName: "one",
            setting: {
                check: {
                    enable: true,
                    nocheckInherit: true,
                    chkStyle: "checkbox",
                    chkboxType: {
                        Y: "ps",
                        N: "ps"
                    },
                    chkDisabledInherit: true
                },
                data: {},
                key: {
                    children: "children",
                    isParent: true,
                    name: "name"
                },
                view: {
                    showLine: false,
                    fontCss: {
                        color: "#409eff"
                    },
                    showTitle: false,
                    showIcon: false,
                    nameIsHTML: true, //允许name支持html
                    selectedMulti: false
                },
                callback: {
                    onCheck: this.zTreeOnCheck
                }
            },
            zNodes: [], //天网节点
            zNodes4: [], //社会面节点
            searchNodes: [],
            deviceListInit: [],
            deviceSListInit: [],
            isShowBtn: true,
            initData1: [],
            initData2: []
        };
    },
    computed: {
        ...mapState(["map"])
    },
    props: {
        dataCaseInfo: Object,
        isCancle: Boolean
    },
    created() {
        this.loading = null;
        this.queryVideoData();
        this.deviceList = [];
        this.deviceSList = [];
        this.deviceSList1 = [];
        this.applyList = [];
        this.applySList = [];
    },
    mounted() {
        // this.smallMap.clearOverlays();
        this.InitSmallMainMap(mapCenter);
    },
    mixins: [maps, realvideo],
    watch: {
        isCancle: {
            handler(val) {
                if (val) {
                    this.ajaxTree();
                }
            }
        },
        deviceList: {
            handler(val) {
                if (val.length) {
                    let arr = [];
                    for (let i = 0; i < val.length; i++) {
                        var obj1 = {
                            shebeiId: val[i].shebeiId || val[i].deviceUuid
                        };
                        arr.push(obj1);
                        arr.concat(this.applyList);
                    }
                    let arr1 = _.uniqWith(
                        arr.concat(this.applyList),
                        _.isEqual
                    );
                    let obj = {};
                    this.setNodesChecked(arr1);
                } else {
                }
            },
            deep: true,
            immediate: true
        },
        deviceSList: {
            handler(val) {
                if (val.length) {
                    let arr = [];
                    for (let i = 0; i < val.length; i++) {
                        1;
                        var obj1 = {
                            shebeiId: val[i].shebeiId || val[i].deviceUuid
                        };
                        arr.push(obj1);
                        arr.concat(this.applySList);
                    }
                    let arr1 = _.uniqWith(
                        arr.concat(this.applySList),
                        _.isEqual
                    );
                    let obj = {};
                    this.setNodesChecked4(arr1);
                } else {
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 切换
        tabClickHandler(tab, event) {
            this.activeName = tab.name;
            if (this.activeName == "one") {
                this.treeObj = $.fn.zTree.getZTreeObj("treeDemo"); //获取树对象
            } else {
                this.treeObj4 = $.fn.zTree.getZTreeObj("treeDemo4"); //获取树对象
            }
        },
        // 天网节点名搜索
        searchTreeHandler() {
            let data = {
                apeName: this.filterText1
            };
            data = this.$qs.stringify(data);
            this.$http.post("/sms/ape/selectByVideo", data).then(res => {
                if (res.data.code == 200) {
                    this.videoList = this.getOnline(res.data.data);
                    this.videoList.forEach(v => {
                        v.children = v.apes;
                    });
                    this.zNodes = this.videoList;
                    $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
                    this.treeObj = $.fn.zTree.getZTreeObj("treeDemo"); //获取树对象
                    this.treeObj.expandAll(true); // 节点全部展开
                    var data1 = [];
                    for (let i = 0; i < this.deviceList1.length; i++) {
                        let obj = {
                            shebeiId: this.deviceList1[i].deviceUuid //设备ID
                        };
                        data1.push(obj);
                    }
                    this.setNodesChecked(data1);
                } else {
                    this.loading.close();
                    this.$notify({
                        type: "error",
                        message: "获取视频列表失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },

        // 点击勾选
        zTreeOnCheck(a, b, c) {
            // this.deviceList1 = []
            // this.deviceSList1 = []
            this.smallMap.clearOverlays();
            let data = [];
            let obj;
            let nodes = this.treeObj.getCheckedNodes(true);
            this.treeList1 = this.filterById(nodes, 1);
            for (var i = 0; i < this.treeList1.length; i++) {
                obj = {
                    cameraType: 1, //设备类型
                    deviceUuid: this.treeList1[i].shebeiId, //设备ID
                    longitude: this.treeList1[i].longitude, //经度
                    latitude: this.treeList1[i].latitude, //纬度
                    cameraName: this.treeList1[i].name,
                    offset: 0
                };
                data.push(obj);
            }
            data = _.uniqWith(
                data.concat(this.deviceList1).concat(this.deviceList),
                _.isEqual
            );
            if (!c.checked && c.regionFlag !== 1) {
                let key = c.shebeiId;
                data = this.deviceList1.filter(
                    i => !key.includes(i.deviceUuid)
                );
            } else if (!c.checked && c.regionFlag == 1) {
                var ids = [];
                ids = getChildren(ids, c);
                //  获取所有字节点设备id
                function getChildren(ids, treeNode) {
                    let objs = {};
                    objs = {
                        cameraType: 1, //设备类型
                        deviceUuid: treeNode.shebeiId, //设备ID
                        longitude: treeNode.longitude, //经度
                        latitude: treeNode.latitude, //纬度
                        cameraName: treeNode.name,
                        offset: 0
                    };
                    ids = _.compact(ids.push(objs));
                    if (treeNode.isParent) {
                        for (var obj in treeNode.children) {
                            getChildren(ids, treeNode.children[obj]);
                        }
                    }
                    return ids;
                }

                data = data.filter(
                    item => !ids.some(ele => ele.deviceUuid === item.deviceUuid)
                );
            }
            this.deviceList1 = data;
            let data4 = [];
            let obj4;
            let nodes4 = this.treeObj4.getCheckedNodes(true);
            this.treeList4 = this.filterById(nodes4, 1);
            for (var i = 0; i < this.treeList4.length; i++) {
                obj4 = {
                    cameraType: 4, //设备类型
                    deviceUuid: this.treeList4[i].shebeiId, //设备ID
                    longitude: this.treeList4[i].longitude, //经度
                    latitude: this.treeList4[i].latitude, //纬度
                    cameraName: this.treeList4[i].name,
                    offset: 0
                };
                data4.push(obj4);
            }
            // this.deviceSList1 = data4
            data4 = _.uniqWith(
                data4.concat(this.deviceSList1).concat(this.deviceSList),
                _.isEqual
            );
            if (!c.checked && c.regionFlag !== 1) {
                let key = c.shebeiId;
                data4 = this.deviceSList1.filter(
                    i => !key.includes(i.deviceUuid)
                );
            } else if (!c.checked && c.regionFlag == 1) {
                var ids = [];
                ids = getChildren(ids, c);
                //  获取所有字节点设备id
                function getChildren(ids, treeNode) {
                    let objs = {};
                    objs = {
                        cameraType: 4, //设备类型
                        deviceUuid: treeNode.shebeiId, //设备ID
                        longitude: treeNode.longitude, //经度
                        latitude: treeNode.latitude, //纬度
                        cameraName: treeNode.name,
                        offset: 0
                    };
                    ids = _.compact(ids.push(objs));
                    if (treeNode.isParent) {
                        for (var obj in treeNode.children) {
                            getChildren(ids, treeNode.children[obj]);
                        }
                    }
                    return ids;
                }
                data4 = data4.filter(
                    item => !ids.some(ele => ele.deviceUuid === item.deviceUuid)
                );
            }
            this.deviceSList1 = data4;
            //执行加载案发点和加载海量点
            this.smallCaseLabel(
                this.dataCaseInfo.longitude,
                this.dataCaseInfo.latitude
            );
            this.createmagnanCase(data);
            let maplist = this.smallMap.getOverlays();
            for (let i = 0; i < maplist.length; i++) {
                if (maplist[i].list != undefined) {
                    if (maplist[i].list.cameraType == 4) {
                        this.smallMap.removeOverlay(maplist[i]);
                    }
                }
            }
            let objdata = {}
            data4 = data4.reduce((cur, next) => {
                objdata[next.deviceUuid]
                    ? ""
                    : (objdata[next.deviceUuid] = true && cur.push(next));
                return cur;
            }, []);
            this.smallFoundLabel(data4, 3);
        },
        // 根据regionFlag属性过滤选中状态的父节点,只保留子节点数组
        filterById(arr, id) {
            return arr.filter(item => item.regionFlag !== 1);
        },
        // 设置选中
        setNodesChecked(arr) {
            var nodes = this.treeObj.getNodes();
            var selectCheck = [];
            var data = [];
            var obj = {};
            for (let i = 0; i < nodes.length; i++) {
                if (!nodes[i].regionFlag !== 1) {
                    for (let j = 0; j < nodes[i].children.length; j++) {
                        for (let m = 0; m < arr.length; m++) {
                            if (
                                nodes[i].children[j].shebeiId == arr[m].shebeiId
                            ) {
                                selectCheck.push(nodes[i].children[j]);
                                nodes[i].children[j].checked = true;
                                this.treeObj.updateNode(
                                    nodes[i].children[j],
                                    true
                                );
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < selectCheck.length; i++) {
                obj = {
                    caseUuid: this.$route.query.caseUuid,
                    cameraType: 1, //设备类型
                    deviceUuid: selectCheck[i].shebeiId, //设备ID
                    longitude: selectCheck[i].longitude, //经度
                    latitude: selectCheck[i].latitude, //纬度
                    cameraName: selectCheck[i].name,
                    offset: 0
                };
                data.push(obj);
            }
            //执行加载案发点和加载海量点
            // this.smallCaseLabel(this.dataCaseInfo.longitude,this.dataCaseInfo.latitude)
            this.createmagnanCase(data);
        },

        setNodesChecked4(arr) {
            var nodes = this.treeObj4.getNodes();
            var selectCheck = [];
            var data = [];
            var obj = {};
            for (let i = 0; i < nodes.length; i++) {
                if (!nodes[i].regionFlag !== 1) {
                    for (let j = 0; j < nodes[i].children.length; j++) {
                        for (let m = 0; m < arr.length; m++) {
                            if (
                                nodes[i].children[j].shebeiId == arr[m].shebeiId
                            ) {
                                selectCheck.push(nodes[i].children[j]);
                                nodes[i].children[j].checked = true;
                                this.treeObj4.updateNode(
                                    nodes[i].children[j],
                                    true
                                );
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < selectCheck.length; i++) {
                obj = {
                    caseUuid: this.$route.query.caseUuid,
                    cameraType: 4, //设备类型
                    deviceUuid: selectCheck[i].shebeiId, //设备ID
                    longitude: selectCheck[i].longitude, //经度
                    latitude: selectCheck[i].latitude, //纬度
                    cameraName: selectCheck[i].name,
                    offset: 0
                };
                data.push(obj);
            }
            //执行加载案发点和加载海量点
            // this.smallCaseLabel(this.dataCaseInfo.longitude,this.dataCaseInfo.latitude)
            // this.createmagnanCase(data)
            let maplist = this.smallMap.getOverlays();
            for (let i = 0; i < maplist.length; i++) {
                if (maplist[i].list != undefined) {
                    if (maplist[i].list.cameraType == 4) {
                        this.smallMap.removeOverlay(maplist[i]);
                    }
                }
            }
            this.smallFoundLabel(data, 3);
        },

        reset() {
            $.fn.zTree.init($("#treeDemo4"), this.setting, this.zNodes4);
            this.treeObj4.expandAll(true); // 节点全部展开
            $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
            this.treeObj.expandAll(true); // 节点全部展开
        },
        setCheckedNodes(data, obj) {
            obj.setCheckedNodes([{ data }]);
        },

        //渲染checkbox
        ajaxTree() {
            let data = {
                caseUuid: this.$route.query.caseUuid
            };
            this.$http
                .get("pca/casemng/device/rel/query", { params: data })
                .then(res => {
                    var arr1 = [];
                    var arr4 = [];
                    var data1 = [];
                    var data2 = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].cameraType == "1") {
                            let obj = {};
                            var obj1 = {
                                caseUuid: this.$route.query.caseUuid,
                                shebeiId: res.data.data[i].deviceUuid,
                                cameraType: res.data.data[i].cameraType, //设备类型
                                longitude: res.data.data[i].longitude, //经度
                                latitude: res.data.data[i].latitude, //纬度
                                cameraName: res.data.data[i].cameraName,
                                offset: 0
                            };
                            obj = {
                                caseUuid: this.$route.query.caseUuid,
                                cameraType: res.data.data[i].cameraType, //设备类型
                                deviceUuid: res.data.data[i].deviceUuid, //设备ID
                                longitude: res.data.data[i].longitude, //经度
                                latitude: res.data.data[i].latitude, //纬度
                                cameraName: res.data.data[i].cameraName,
                                offset: 0
                            };
                            arr1.push(obj1);
                            data1.push(obj);
                            this.applyList = arr1;
                            this.deviceList1 = data1;
                            this.deviceListInit = data1;
                            this.initData1 = arr1;
                            // this.$refs.tree1.setCheckedNodes(arr1);
                        } else if (res.data.data[i].cameraType == "4") {
                            let obj = {};
                            var obj4 = {
                                caseUuid: this.$route.query.caseUuid,
                                shebeiId: res.data.data[i].deviceUuid,
                                cameraType: res.data.data[i].cameraType, //设备类型
                                longitude: res.data.data[i].longitude, //经度
                                latitude: res.data.data[i].latitude, //纬度
                                cameraName: res.data.data[i].cameraName,
                                offset: 0
                            };
                            obj = {
                                caseUuid: this.$route.query.caseUuid,
                                deviceUuid: res.data.data[i].deviceUuid, //设备ID
                                cameraType: res.data.data[i].cameraType, //设备类型
                                longitude: res.data.data[i].longitude, //经度
                                latitude: res.data.data[i].latitude, //纬度
                                cameraName: res.data.data[i].cameraName,
                                offset: 0
                            };
                            data2.push(obj);
                            arr4.push(obj4);
                            this.applySList = arr4;
                            this.deviceSList1 = data2;
                            this.deviceSListInit = data2;
                            this.initData2 = arr1;
                        } else if (res.data.data[i].cameraType == "5") {
                            this.treeList5.push(res.data.data[i]);
                        } else if (res.data.data[i].cameraType == "6") {
                            this.treeList6.push(res.data.data[i]);
                        } else if (res.data.data[i].cameraType == "8") {
                            this.treeList8.push(res.data.data[i]);
                        }
                    }
                    this.smallCaseLabel(
                        this.dataCaseInfo.longitude,
                        this.dataCaseInfo.latitude
                    );
                    this.setNodesChecked(this.applyList);
                    this.setNodesChecked4(this.applySList);
                    this.loading.close();
                    this.$emit(
                        "deviceDence",
                        this.applyList.concat(this.applySList)
                    ); // 所有的原始数据
                });
        },

        //绘制矩形
        drawReact: function() {
            let _this = this;
            this.drawingManager = new BMapLib.DrawingManager(this.smallMap, {});
            this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE); //设置模式
            this.drawingManager.rectangleOptions = this.styleOptions;
            this.drawingManager.open(); //开启绘图
            this.drawingManager.addEventListener("rectanglecomplete", function(
                e,
                overlay
            ) {
                _this.rectanglecomplete(e);
            });
        },
        //矩形绘制完成后的回调
        rectanglecomplete: function(e) {
            // this.drawingManager.close()
            let left_top_point = e.to[0]; //矩形框左上角的点
            let right_bottom_point = e.to[2]; //矩形框右下角的点
            //如果矩形的左上经度小于右下角经度，并且左纬度大于右纬度  左上下
            if (
                left_top_point["lng"] < right_bottom_point["lng"] &&
                left_top_point["lat"] > right_bottom_point["lat"]
            ) {
                for (let i = 0; i < this.videoList.length; i++) {
                    let videoInfo = this.videoList[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 1, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] < point["longitude"] &&
                            left_top_point["lat"] > point["latitude"] &&
                            right_bottom_point["lng"] > point["longitude"] &&
                            right_bottom_point["lat"] < point["latitude"]
                        ) {
                            this.deviceList.push(obj);
                        }
                    }
                }
                for (let i = 0; i < this.societyData.length; i++) {
                    let videoInfo = this.societyData[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 4, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] < point["longitude"] &&
                            left_top_point["lat"] > point["latitude"] &&
                            right_bottom_point["lng"] > point["longitude"] &&
                            right_bottom_point["lat"] < point["latitude"]
                        ) {
                            this.deviceSList.push(obj);
                        }
                    }
                }
            } else if (
                left_top_point["lng"] < right_bottom_point["lng"] &&
                left_top_point["lat"] < right_bottom_point["lat"]
            ) {
                //如果矩形的左上经度小于右下角经度，并且左纬度小于右纬度  左下上
                for (let i = 0; i < this.videoList.length; i++) {
                    let videoInfo = this.videoList[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 1, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] < point["longitude"] &&
                            left_top_point["lat"] < point["latitude"] &&
                            right_bottom_point["lng"] > point["longitude"] &&
                            right_bottom_point["lat"] > point["latitude"]
                        ) {
                            this.deviceList.push(obj);
                        }
                    }
                }
                for (let i = 0; i < this.societyData.length; i++) {
                    let videoInfo = this.societyData[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 4, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] < point["longitude"] &&
                            left_top_point["lat"] > point["latitude"] &&
                            right_bottom_point["lng"] > point["longitude"] &&
                            right_bottom_point["lat"] < point["latitude"]
                        ) {
                            this.deviceSList.push(obj);
                        }
                    }
                }
            } else if (
                left_top_point["lng"] > right_bottom_point["lng"] &&
                left_top_point["lat"] < right_bottom_point["lat"]
            ) {
                //如果矩形的左上经度大于右下角经度，并且左纬度小于右纬度
                for (let i = 0; i < this.videoList.length; i++) {
                    let videoInfo = this.videoList[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 1, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] > point["longitude"] &&
                            left_top_point["lat"] < point["latitude"] &&
                            right_bottom_point["lng"] < point["longitude"] &&
                            right_bottom_point["lat"] > point["latitude"]
                        ) {
                            this.deviceList.push(obj);
                        }
                    }
                }
                for (let i = 0; i < this.societyData.length; i++) {
                    let videoInfo = this.societyData[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 4, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] < point["longitude"] &&
                            left_top_point["lat"] > point["latitude"] &&
                            right_bottom_point["lng"] > point["longitude"] &&
                            right_bottom_point["lat"] < point["latitude"]
                        ) {
                            this.deviceSList.push(obj);
                        }
                    }
                }
            } else if (
                left_top_point["lng"] > right_bottom_point["lng"] &&
                left_top_point["lat"] > right_bottom_point["lat"]
            ) {
                //如果矩形的左上经度大于右下角经度，并且左纬度小于右纬度
                for (let i = 0; i < this.videoList.length; i++) {
                    let videoInfo = this.videoList[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 1, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] > point["longitude"] &&
                            left_top_point["lat"] > point["latitude"] &&
                            right_bottom_point["lng"] < point["longitude"] &&
                            right_bottom_point["lat"] < point["latitude"]
                        ) {
                            this.deviceList.push(obj);
                        }
                    }
                }
                for (let i = 0; i < this.societyData.length; i++) {
                    let videoInfo = this.societyData[i].apes;
                    for (let j = 0; j < videoInfo.length; j++) {
                        let point = videoInfo[j];
                        let obj = {
                            caseUuid: this.$route.query.caseUuid,
                            cameraType: 4, //设备类型
                            deviceUuid: point.shebeiId, //设备ID
                            longitude: point.longitude, //经度
                            latitude: point.latitude, //纬度
                            cameraName: point.name,
                            offset: 0
                        };
                        if (
                            left_top_point["lng"] < point["longitude"] &&
                            left_top_point["lat"] > point["latitude"] &&
                            right_bottom_point["lng"] > point["longitude"] &&
                            right_bottom_point["lat"] < point["latitude"]
                        ) {
                            this.deviceSList.push(obj);
                        }
                    }
                }
            }
            this.deviceList1 = _.uniqWith(
                this.deviceList1.concat(this.deviceList),
                _.isEqual
            );
            // this.deviceList1 = this.deviceList
            // this.deviceSList1 = this.deviceSList1
            this.deviceSList1 = _.uniqWith(
                this.deviceSList1.concat(this.deviceSList),
                _.isEqual
            );
        },
        //移动
        closeDraw() {
            if (this.drawingManager != "") {
                this.drawingManager.close(); //关闭绘制
            }
        },
        //删除
        clearDrawing() {
            if (this.drawingManager != "") {
                this.deviceList = [];
                this.deviceSList = [];
                this.smallMap.clearOverlays();
                this.smallCaseLabel(
                    this.dataCaseInfo.longitude,
                    this.dataCaseInfo.latitude
                );
                this.reset();
                this.setNodesChecked(this.applyList);
                this.setNodesChecked4(this.applySList);
                this.deviceList1 = this.deviceListInit;
                this.deviceSList1 = this.deviceSListInit;
            } else {
                this.filterText1 = "";
                this.filterText4 = "";
                this.searchTreeHandler(); // 调列表接口
                this.deviceList = [];
                this.deviceSList = [];
                this.smallMap.clearOverlays();
                this.smallCaseLabel(
                    this.dataCaseInfo.longitude,
                    this.dataCaseInfo.latitude
                );
                this.reset();
                this.setNodesChecked(this.applyList);
                this.setNodesChecked4(this.applySList);
                this.deviceList1 = this.deviceListInit;
                this.deviceSList1 = this.deviceSListInit;
            }
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        showtrre() {
            this.imgchange = false;
            this.isShowBtn = false;
            this.$refs.typoleft.style.width = 0;
            this.InitSmallMainMap(mapCenter);
            this.smallCaseLabel(
                this.dataCaseInfo.longitude,
                this.dataCaseInfo.latitude
            );
            this.createmagnanCase(this.deviceList1);
            // this.createmagnanCase(data4)
            this.smallFoundLabel(this.deviceSList1, 3);
        },
        hidetree() {
            this.isShowBtn = true;
            this.imgchange = true;
            this.$refs.typoleft.style.width = "30%";
        },
        queryVideoData() {
            this.loading = this.$loading({
                target: ".showhide",
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在加载.."
            });
            this.$http.post("/sms/ape/selectByVideo").then(res => {
                this.loading.close();
                if (res.data.code == 200) {
                    this.videoList = this.getOnline(res.data.data);
                    this.videoList.forEach(v => {
                        v.children = v.apes;
                    });
                    this.zNodes = this.videoList;
                    $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
                    this.treeObj = $.fn.zTree.getZTreeObj("treeDemo"); //获取树对象
                    this.treeObj.expandAll(true); // 节点全部展开
                    // this.fuzzySearch('treeDemo','#key',null,true); //开启模糊搜索
                    this.querySocietyData();
                }
            });
        },
        // 社会面
        querySocietyData() {
            this.$http.post("/sms/ape/selectBySociety").then(res => {
                if (res.data.code == 200) {
                    this.societyData = res.data.data;
                    this.societyData.forEach(item => {
                        item.children = item.apes;
                        item.children.forEach(shebei => {
                            shebei.disabled = false;
                        });
                    });
                    this.zNodes4 = this.societyData;
                    $.fn.zTree.init(
                        $("#treeDemo4"),
                        this.setting,
                        this.zNodes4
                    );
                    this.treeObj4 = $.fn.zTree.getZTreeObj("treeDemo4"); //获取树对象
                    this.treeObj4.expandAll(true); // 节点全部展开
                    this.fuzzySearch("treeDemo4", "#key4", null, true); //开启模糊搜索
                    this.ajaxTree();
                }
            });
        },

        //案件库新增案发点
        smallCaseLabel(p0, p1) {
            if (p0 == null || p0 == "") {
                return;
            }
            let markers = [];
            let point = new BMap.Point(p0, p1);
            let myIcon = new BMap.Icon(cased, new BMap.Size(33, 36), {});
            let marker = new BMap.Marker(point, {
                offset: new BMap.Size(0, -10),
                icon: myIcon
            });
            marker.listType = 7;
            marker.lng = p0;
            marker.lat = p1;
            markers.push(marker);
            this.smallMap.addOverlay(marker);
        },

        // 过滤节点(zTree源码方法)
        fuzzySearch(zTreeId, searchField, isHighLight, isExpand) {
            var zTreeObj = $.fn.zTree.getZTreeObj(zTreeId);
            if (!zTreeObj) {
                // alert("fail to get ztree object");
            }
            var nameKey = zTreeObj.setting.data.key.name;
            isHighLight = isHighLight === false ? false : true;
            isExpand = isExpand ? true : false;
            zTreeObj.setting.view.nameIsHTML = isHighLight;

            var metaChar = "[\\[\\]\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]";
            var rexMeta = new RegExp(metaChar, "gi");

            function ztreeFilter(zTreeObj, _keywords, callBackFunc) {
                if (!_keywords) {
                    _keywords = "";
                }

                function filterFunc(node) {
                    if (node && node.oldname && node.oldname.length > 0) {
                        node[nameKey] = node.oldname;
                    }
                    zTreeObj.updateNode(node);
                    if (_keywords.length == 0) {
                        zTreeObj.showNode(node);
                        zTreeObj.expandNode(node, isExpand);
                        return true;
                    }
                    if (
                        node[nameKey] &&
                        node[nameKey]
                            .toLowerCase()
                            .indexOf(_keywords.toLowerCase()) != -1
                    ) {
                        if (isHighLight) {
                            var newKeywords = _keywords.replace(
                                rexMeta,
                                function(matchStr) {
                                    return "\\" + matchStr;
                                }
                            );
                            node.oldname = node[nameKey];
                            // var rexGlobal = new RegExp(newKeywords, 'gi');
                            // node[nameKey] = node.oldname.replace(rexGlobal, function(originalText){
                            //   var highLightText =
                            // 	  '<span style="color: whitesmoke;background-color: darkred;">'
                            // 	  + originalText
                            // 	  +'</span>';
                            //   return 	highLightText;
                            // });
                            zTreeObj.updateNode(node);
                        }
                        zTreeObj.showNode(node);
                        return true;
                    }

                    zTreeObj.hideNode(node);
                    return false;
                }

                var nodesShow = zTreeObj.getNodesByFilter(filterFunc);
                processShowNodes(nodesShow, _keywords);
            }

            function processShowNodes(nodesShow, _keywords) {
                if (nodesShow && nodesShow.length > 0) {
                    if (_keywords.length > 0) {
                        $.each(nodesShow, function(n, obj) {
                            var pathOfOne = obj.getPath();
                            if (pathOfOne && pathOfOne.length > 0) {
                                for (var i = 0; i < pathOfOne.length - 1; i++) {
                                    zTreeObj.showNode(pathOfOne[i]);
                                    zTreeObj.expandNode(pathOfOne[i], true);
                                }
                            }
                        });
                    } else {
                        var rootNodes = zTreeObj.getNodesByParam("level", "0");
                        $.each(rootNodes, function(n, obj) {
                            zTreeObj.expandNode(obj, true);
                        });
                    }
                }
            }

            $(searchField).bind("input propertychange", function() {
                var _keywords = $(this).val();
                searchNodeLazy(_keywords);
            });

            var timeoutId = null;
            var lastKeyword = "";
            function searchNodeLazy(_keywords) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(function() {
                    if (lastKeyword === _keywords) {
                        return;
                    }
                    ztreeFilter(zTreeObj, _keywords);
                    lastKeyword = _keywords;
                }, 500);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/carJudged_third.css";
@import "../../../assets/css/commom.css";
/* ::-webkit-scrollbar {
  width: 0.1rem;
  height: 0.1rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 0.1rem;
   background-color: rgba(153, 201, 250, 0.38);
} */

.ztree {
    height: 3.5rem !important;
    overflow: auto !important;
}
.stereoTypo {
    height: 5.6rem;
}
.typoleft {
    width: 28%;
    height: 100%;
    float: left;
}

.el-tree /deep/ .el-tree-node__content:hover,
.el-tree /deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: rgba(49, 86, 131, 0.2);
}
.el-tree--highlight-current
    /deep/
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: rgba(49, 86, 131, 0.2);
}
.typoright {
    overflow: hidden;
    position: relative;
    height: 100%;
    border: 1px solid green;
    z-index: 2;
    background-color: #fff;
}
.typoright .imgs {
    position: absolute;
    left: 0;
    top: 50%;
    width: 0.25rem;
    height: 0.5rem;
    background: #144479;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.typoleft .el-tabs {
    height: calc(100% - 0.8rem);
    border: 1px solid #000;
}
.typoleft .el-tabs--border-card {
    /* background-color: rgba(16, 35, 56, 0.5); */
    //   background-color: red;
    //   @include background_color('background_eleheader');
    background: transparent;
}

.typoleft /deep/ .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child {
    padding: 0 0rem;
    font-size: 0.14rem;
}
.typoleft /deep/ .el-tabs__nav {
    width: 100%;
}
.typoleft /deep/ .el-tabs__item {
    width: 50%;
    text-align: center;
    font-size: 0.14rem;
    margin: 0;
    //   background-color: #142942;
    border-right: none;
    border-left: none;
    border-top: none;
    color: #99c9fa;
}
.el-tabs--border-card /deep/ .el-tabs__header {
    border: 0;
}
.el-tabs--border-card /deep/ .el-tabs__header .el-tabs__item.is-active {
    background: transparent;
}
.typoleft
    /deep/
    .el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item.is-active {
    color: #2e93fb;
    //   background-color: #112439;
    border-right: none;
    border-left: none;
    position: relative;
    /* border-top:3px solid #277ace; */
}

.typoleft
    /deep/
    .el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item.is-active::after {
    content: "";
    height: 0.03rem;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #277ace;
}
.el-dialog .el-tree {
    height: 3.5rem;
    overflow-y: scroll;
    width: 100%;
}

.ss {
    font-size: 0.14rem;
    height: 0.5rem;
    /* display: flex; */
}
.ss /deep/ .el-input-group {
    height: 0.3rem;
    margin-top: 0.1rem;
    font-size: 0.14rem;
}
.ss /deep/ .el-input {
    width: 70%;
}
.ss /deep/ .el-input__inner {
    height: 0.3rem;
}
#mapCenter {
    width: 100%;
    height: 100%;
    /* background-color: red; */
}
#mapCenter /deep/ .BMapLabel {
    background-color: #fff !important;
    border: 1px solid red !important;
}
.el-dialog__wrapper /deep/ .el-dialog .el-dialog__body {
    padding: 0 0 !important;
    /* background-color: #113254 !important; */
    border-top: 1px solid #13436e !important;
    border-bottom: 1px solid #13436e !important;
    /* 082A55 */
}
.el-dialog__wrapper .el-button {
    padding: 0rem 0rem;
    margin: 0;
    border-radius: 0px;
}
.searchBtn {
    width: 0.3rem;
    height: 0.3rem;
    /* border:1px solid #33667f */
}
.titlebox {
    display: flex;
    justify-content: center;
}
.map {
    margin-top: 0.1rem;
    height: 0.7rem;
    border: 1px solid rgba(15, 44, 79, 0.5);
    padding: 0.1rem;
    background-color: rgba(16, 35, 56, 0.5);
}
.map div {
    display: inline-block;
}
.map .itemIcon {
    margin-right: 0.6rem;
}
.map .itemIcon:nth-child(3) {
    margin-right: 0;
}

.map .itemIcon:nth-child(1) {
    background: url(../../../assets/images/carJudged/frame-1.png) center
        no-repeat;
    background-size: 100% 100%;
}
.map .itemIcon:nth-child(1):hover {
    background: url(../../../assets/images/carJudged/frame-1-h.png) center
        no-repeat;
    background-size: 100% 100%;
}
.map .itemIcon:nth-child(2) {
    background: url(../../../assets/images/carJudged/move-1.png) center
        no-repeat;
    background-size: 100% 100%;
}
.map .itemIcon:nth-child(2):hover {
    background: url(../../../assets/images/carJudged/move-1-h.png) center
        no-repeat;
    background-size: 100% 100%;
}
.map .itemIcon:nth-child(3) {
    background: url(../../../assets/images/carJudged/delete-1.png) center
        no-repeat;
    background-size: 100% 100%;
}
.map .itemIcon:nth-child(3):hover {
    background: url(../../../assets/images/carJudged/delete-1-h.png) center
        no-repeat;
    background-size: 100% 100%;
}
.spanellipsis {
    color: #99c9fa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.spancolor {
    color: red;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
