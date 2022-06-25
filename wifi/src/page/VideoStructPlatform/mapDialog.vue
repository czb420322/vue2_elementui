<!--
 * @Author: your name
 * @Date: 2020-11-30 11:24:55
 * @LastEditTime : 2021-07-08 18:32:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\page\VideoStructPlatform\mapDialog.vue
 -->
<template>
    <el-dialog
        :visible.sync="dialogVisible"
        @close="closeDia"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        @open="opendia"
        class="mapmain"
        top="0vh"
        width="100%"
    >
        <div class="mapcontent">
            <div id="imeiMapContent"></div>
            <div
                v-for="(item,index) in mapInfoList"
                class="stytic"
                :key="index"
                :id="'strickPic'+index"
            >
                <div class="styticImgBox">
                    <i title="下一张" @click="addimg(item)" class="el-icon-arrow-right"></i>
                    <i title="上一张" @click="removeimg(item)" class="el-icon-arrow-left"></i>
                    <img
                        style="object-fit:contain"
                        class="oneimg oneimg1 aaa"
                        v-if="item.zkytype != 4"
                        :src="item.traceImgUrl == undefined ? item.sourceImgUrl : item.traceImgUrl"
                        alt
                    >
                    <img
                        style="object-fit:contain"
                        class="oneimg oneimg1 aaa"
                        v-if="item.zkytype == 4"
                        :src="item.faceImgUrl"
                        alt
                    >
                </div>
                <img class="twoimg" src="../../assets/images/caseStydy/arrows.png" alt>
                <span>{{item | getDatetime}}</span>
            </div>
            <i class="el-icon-close map-dialog-close" @click="closeDia"></i>
            <img
                class="dingwei"
                src="../../assets/case/quickPos.png"
                title="刷新"
                @click="mapRefresh"
            >
        </div>
    </el-dialog>
</template>

<script>
import maps from "../../api/realvideo/map.js";
let pick = require("@/assets/images/device/pick.png");
let RFIDIco = require("@/assets/images/device/RFID.png");
import _ from "lodash";
export default {
    data() {
        return {
            dialogVisible: false,
            mapInfoList: [],
            mapTopList: [],
            unit:''
        };
    },
    mixins: [maps],
    filters: {
        getDatetime(val) {
            // if(val.offset != undefined){
            // 当前改成把标准时间改成时间搓+目标出现时间毫秒+offset秒数*1000
            if (
                val.offset == "" ||
                val.offset == null ||
                val.offset == undefined
            ) {
                val.offset = 0;
            }
            let nowplaytime;
            if (val.searchFlag != undefined && val.searchFlag == 2) {
                nowplaytime = 0;
            } else {
                nowplaytime = new Date(val.fileStartTime).getTime();
            }
            let alltime =
                Number(nowplaytime) +
                Number(val.appearTime) +
                Number(val.offset * 1000);
            let date = new Date(alltime);
            let YY = date.getFullYear();
            let MM =
                date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1;
            let DD =
                date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            let hh =
                date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let mi =
                date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes();
            let ss =
                date.getSeconds() < 10
                    ? "0" + date.getSeconds()
                    : date.getSeconds();
            return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
        }
    },
    props: {
        mapVisible: Boolean,
        mapData: Array,
        targetType: [String,Number]
    },
    watch: {
        mapVisible(val) {
            this.dialogVisible = val;
        }
    },
    methods: {
        //关闭模态框
        closeDia() {
            this.imeiDialogMap.clearOverlays();
            this.dialogVisible = false;
            this.$parent.mapVisible = false;
        },
        //打开模态框
        opendia() {
            this.unit = document.documentElement.clientWidth / 1920
            console.log(this.unit,77);
            this.$nextTick(() => {
                // 初始化地图
                this.InitImeiMap("imeiMapContent");
                this.darwLine(); // 轨迹画线
            });
        },
        // 重置地图
        mapRefresh() {
            // 初始化地图
            this.InitImeiMap("imeiMapContent");
            this.darwLine();
        },
        // 打开弹层
        openHandler() {
            this.isShowBtn = true;
        },
        closeHandler() {},
        // 轨迹画线
        darwLine() {
            console.log(this.mapData,"this.mapData");
            this.runSearchList = this.mapData;
            let obj = {};
            //根据点位去重
            let aaa = this.runSearchList.reduce((cur, next) => {
                obj[next.deviceUuid]
                    ? ""
                    : (obj[next.deviceUuid] = true && cur.push(next));
                return cur;
            }, []);
            let myIcon = new BMap.Icon(pick, new BMap.Size(33, 36), {});
            let arr = [];
            let num = "";
            for (let i = 0; i < aaa.length; i++) {
                num = new BMap.Point(
                    Number(aaa[i].longitude),
                    Number(aaa[i].latitude)
                );
                arr.push(num);
                var label = new BMap.Label(aaa[i].cameraName, {
                    offset: new BMap.Size(10, 32)
                });
                let marker = new BMap.Marker(num, {
                    offset: new BMap.Size(6, -13),
                    icon: myIcon
                });
                marker.setLabel(label);
                this.imeiDialogMap.addOverlay(marker);
            }
            let marker = new BMap.Marker(arr[0]); //起点marker
            let iconc = new BMap.Icon(
                "/static/images/start.png",
                new BMap.Size(60, 60),
                {
                    offset: new BMap.Size(5, 5),
                    imageOffset: new BMap.Size(5, 10)
                }
            ); //地点图标
            marker.setIcon(iconc);
            marker.setTop(true);
            this.imeiDialogMap.addOverlay(marker); //将标记添加到地图中
            marker = new BMap.Marker(arr[arr.length - 1]); //终点marker
            iconc = new BMap.Icon(
                "/static/images/dest.png",
                new BMap.Size(60, 60),
                {
                    offset: new BMap.Size(5, 5),
                    imageOffset: new BMap.Size(5, 10)
                }
            ); //终点icon
            marker.setIcon(iconc);
            marker.setTop(true);
            this.imeiDialogMap.addOverlay(marker);

            if (arr.length > 1) {
                let sy = new BMap.Symbol(
                    BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW,
                    {
                        scale: 0.6,
                        strokeColor: "#fff",
                        strokeWeight: "2"
                    }
                );
                let icons = new BMap.IconSequence(sy, "1%", "5%");
                let polyline = new BMap.Polyline(arr, {
                    // enableEditing: true, //是否启用线编辑，默认为false
                    enableClicking: true, //是否响应点击事件，默认为true
                    strokeColor: "#48affe",
                    strokeWeight: 6,
                    strokeOpacity: 0.99,
                    icons: [icons] //折线内的图标样式
                });
                this.imeiDialogMap.addOverlay(polyline);
            }
            let viewPort = this.imeiDialogMap.getViewport(arr);
            this.imeiDialogMap.centerAndZoom(viewPort.center, viewPort.zoom - 1);
            // this.imeiDialogMap.setViewport(arr);
            this.handleMarklist();
            let type;
            if(this.targetType != undefined){
                type = this.targetType;
            } else {
                type = "1"
            }
            if (type == "1") {
                let icon = new BMap.Icon(
                    "/static/images/Mario1.png",
                    new BMap.Size(52, 55),
                    {
                        anchor: new BMap.Size(15, 15)
                    }
                );
                console.log(arr);
                this.loadLuShu(icon, arr, type);
            } else if (type == "2") {
                let icon = new BMap.Icon(
                    "/static/images/bcar.png",
                    new BMap.Size(48, 32),
                    {
                        anchor: new BMap.Size(15, 15)
                    }
                );
                this.loadLuShu(icon, arr, type);
            } else if (type == "3") {
                let icon = new BMap.Icon(
                    "/static/images/biycar.png",
                    new BMap.Size(48, 32),
                    {
                        anchor: new BMap.Size(15, 15)
                    }
                );
                this.loadLuShu(icon, arr, type);
            } else if (type == "4") {
                let icon = new BMap.Icon(
                    "/static/images/Mario1.png",
                    new BMap.Size(52, 55),
                    {
                        anchor: new BMap.Size(15, 15)
                    }
                );
                this.loadLuShu(icon, arr, type);
            }
        },
        /**
         * @description:
         * @param {type} 获取当前经纬度之间的距离，计算当前路数需要跑完的速度
         * @return: 5秒跑完，计算速度
         */
        computedDistance(arr) {
            let distance = 0;
            for (let i = 0; i < arr.length - 1; i++) {
                distance += this.imeiDialogMap.getDistance(arr[i], arr[i + 1]);
            }
            return Math.ceil(distance / 5);
        },
        // 路书执行方法
        loadLuShu(icon, arrPois, type) {
            //type的值 ： 1是人，2是骑车人，3是车， 5是专门针对以车搜车的   4是为人脸预备的
            let enableRotation = false;
            if (type == 1 || type == 4) {
                enableRotation = false;
            } else if (type == 2 || type == 3 || type == 5) {
                enableRotation = true;
            }
            let speed = this.computedDistance(arrPois);
            let blueCar = new BMapLib.LuShu(this.imeiDialogMap, arrPois, {
                defaultContent: "", //"从浔阳路到滨江路"
                autoView: enableRotation, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon: icon,
                speed: speed,
                landmarkPois: [],
                // landmarkPois: [{lng:arrPois[1].lng, lat: arrPois[1].lat, html: '到了哪一站', pauseTime: 1}],
                enableRotation: enableRotation //是否设置marker随着道路的走向进行旋转
            });
            blueCar.start();
        },

        //处理轨迹展示的原始数据
        handleMarklist(type) {
            // 轨迹的数组
            this.mapInfoList = [];
            // 对当前选中的数据按照点位ID进行分类，组成二维数组
            this.mapTopList = Object.values(
                this.runSearchList.reduce((res, item) => {
                    res[item.deviceUuid]
                        ? res[item.deviceUuid].push(item)
                        : (res[item.deviceUuid] = [item]);
                    return res;
                }, {})
            );
            let obj = {};
            // 将数组去重，取出其中的deviceUuid的当前项目
            this.mapInfoList = this.runSearchList.reduce((cur, next) => {
                obj[next.deviceUuid]
                    ? ""
                    : (obj[next.deviceUuid] = true && cur.push(next));
                return cur;
            }, []);
            console.log(this.mapInfoList,"this.mapInfoList");
            // 目前先针对以图搜图排序
            this.runSearchList = this.runSearchList.sort((a, b) =>
                new Date(b.fileStartTime).getTime() +
                    b.appearTime +
                    b.offset * 1000 <
                new Date(a.fileStartTime).getTime() +
                    a.appearTime +
                    a.offset * 1000
                    ? 1
                    : -1
            );
            if (this.mapInfoList.length) {
                //处理数据的经纬度
                let datas = [];
                let num = "";
                for (let i = 0; i < this.runSearchList.length; i++) {
                    num = new BMap.Point(
                        Number(this.runSearchList[i].longitude),
                        Number(this.runSearchList[i].latitude)
                    );
                    datas.push(num);
                }
                // 如果经纬度一样，则随机把经纬度添加一点
                for (let i = 0; i < datas.length - 1; i++) {
                    if (
                        datas[i].lng == datas[i + 1].lng &&
                        datas[i].lat == datas[i + 1].lat
                    ) {
                        datas[i].lat = datas[i].lat + Math.random() / 10000;
                        datas[i].lng = datas[i].lng + Math.random() / 10000;
                    }
                }
                // this.brokenline(datas, this.runSearchList[0].typeFlag);
                // darwLine
            }

            console.log(this.mapInfoList,"this.mapInfoList");

            if (this.runSearchList.length) {
                setTimeout(() => {
                    this.loadArrPoisArr(this.mapInfoList);
                }, 1000);
                // 缩放地图开始
                this.imeiDialogMap.addEventListener("zoomstart", evt => {
                    this.iszoom = true;
                    this.loadArrPoisArr(this.mapInfoList);
                });
                // 缩放地图结束
                setTimeout(() => {
                    this.imeiDialogMap.addEventListener("zoomend", evt => {
                        this.loadArrPoisArr(this.mapInfoList);
                    });
                }, 200);
                this.imeiDialogMap.addEventListener("dragging", evt => {
                    this.loadArrPoisArr(this.mapInfoList);
                });
                // 拖拽地图结束
                this.imeiDialogMap.addEventListener("dragend", evt => {
                    this.loadArrPoisArr(this.mapInfoList);
                });
            }
        },
        // 判断是否执行嫌疑目标轨迹快照渲染
        loadArrPoisArr(arrPoisArr) {
            this.isTrajectory = false;
            if (arrPoisArr.length > 0) {
                for (let i = 0; i < arrPoisArr.length; i++) {
                    let getLongitude = arrPoisArr[i].longitude; // 获取经度
                    let getLatitude = arrPoisArr[i].latitude; // 获取纬度
                    this.pointPixel("strickPic" + i, getLongitude, getLatitude);
                }
            }
        },
        //定位坐标
        pointPixel(classname, lng, lat) {
            var point = new BMap.Point(lng, lat);
            var pixel = this.imeiDialogMap.pointToPixel(point);
            this.$nextTick(() => {
                setTimeout(() => {
                    document.getElementById(classname).style.left =
                        pixel.x - (15*this.unit) + "px";
                    document.getElementById(classname).style.top =
                        pixel.y - (155*this.unit) + "px";
                }, 100);
            });
        },
        //地图点位上方的图片++
        addimg(row, index) {
            console.log(row,'row-----------');
            // 先通过点位找到当前点击的点位，处于二维数组中的第几项
            let clickindex = _.findIndex(this.mapTopList, item => {
                return item[0].deviceUuid == row.deviceUuid;
            });
            if (this.mapTopList[clickindex].length > 1) {
                //判断数组长度之后，再判断当前的信息ID，通过personUuid，
                let uuindex;
                if (row.personUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.personUuid == row.personUuid;
                    });
                } else if (row.vehicleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                } else if (row.bicycleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                }else if (row.uuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                }
                uuindex++;
                if (uuindex >= this.mapTopList[clickindex].length) {
                    uuindex--;
                }
                let nowindex = _.findIndex(this.mapInfoList, item => {
                    return item.deviceUuid == row.deviceUuid;
                });
                this.mapInfoList.splice(
                    nowindex,
                    1,
                    this.mapTopList[clickindex][uuindex]
                );
            }
        },
        // 图片减
        removeimg(row, index) {
            // 先通过点位找到当前点击的点位，处于二维数组中的第几项
            let clickindex = _.findIndex(this.mapTopList, item => {
                return item[0].deviceUuid == row.deviceUuid;
            });
            if (this.mapTopList[clickindex].length > 1) {
                //判断数组长度之后，再判断当前的信息ID，通过personUuid，
                let uuindex;
                if (row.personUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.personUuid == row.personUuid;
                    });
                } else if (row.vehicleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                } else if (row.bicycleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                }else if (row.uuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                }
                uuindex--;
                if (uuindex < 0) {
                    uuindex = 0;
                }
                let nowindex = _.findIndex(this.mapInfoList, item => {
                    return item.deviceUuid == row.deviceUuid;
                });
                this.mapInfoList.splice(
                    nowindex,
                    1,
                    this.mapTopList[clickindex][uuindex]
                );
            }
        }
    }
};
</script>

<style scoped>
.el-dialog__wrapper .el-dialog .el-dialog__header,
.el-dialog__wrapper /deep/ .el-dialog .el-dialog__header {
    padding: 0;
    display: none;
}
.el-dialog__wrapper  .el-dialog,
.el-dialog__wrapper /deep/ .el-dialog {
    height: 100%;
    margin: 0;
    border: 0;
}
.mapmain.el-dialog__wrapper .el-dialog .el-dialog__body,
.mapmain.el-dialog__wrapper /deep/ .el-dialog .el-dialog__body {
    padding: 0 !important;
    height: 100%;
    border: 0 !important;
    padding: 0 !important;
}
.mapcontent {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

#imeiMapContent {
    width: 100%;
    height: 100%;
}
.map-dialog-close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: .2rem;
    z-index: 99;
    background: #074668;
    color: #fff;
    width: 0.25rem;
    height: 0.25rem;
    cursor: pointer;
    text-align: center;
}

.map-dialog-close:before {
    line-height: 0.25rem;
    margin-left: 3px;
}
.dingwei {
    position: absolute;
    top: 252px;
    right: 38px;
    cursor: pointer;
}

.stytic {
    position: absolute;
    width: .8rem;
    height: 1.23rem;
    z-index: 10;
    border: 1px solid #155eb5;
    padding: 0.05rem;
    background-color: rgba(82, 160, 229, 0.9);
}

.stytic .styticImgBox {
    width: 100%;
    height: .8rem;
    border: 1px solid #155eb5;
    position: relative;
    overflow: hidden;
}
.styticImgBox i {
    width: .1rem;
    height: .1rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    cursor: pointer;
}
.styticImgBox .el-icon-arrow-right {
    color:#fff;
    font-weight: 900;
    right: .05rem;
}
.styticImgBox .el-icon-arrow-left {
    color:#fff;
    font-weight: 900;
    left: .05rem;
}

.stytic:hover .strick-playvideo {
    display: block;
}
.oneimg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
}

.stytic .twoimg {
    position: absolute;
    bottom: -21px;
    left: 50%;
    transform: translateX(-50%);
}

.stytic span {
    font-size: 0.1rem;
    text-align: center;
    color: #fff;
}

@media (max-width:1440px){
    .stytic {
        position: absolute;
        width: .9rem;
    }
}
</style>
