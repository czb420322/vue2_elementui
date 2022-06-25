<!--
 * @Author: your name
 * @Date: 2020-11-09 11:05:02
 * @LastEditTime : 2021-08-04 10:17:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\page\VideoStructPlatform\resourceManCompon\skynet.vue
 -->
<template>
    <div class="showdeviceoId">
        <div class="searchkline" v-show="inittitle == 'people'">
            <span class="commBtn addBtn" @click="addOrganiza">添加设备</span>
            <span @click="gotask()" class="commBtn addBtn">返回任务列表</span>
        </div>
        <el-table :data="deviceList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column prop="newName" v-if="inittitle == 'people'" show-overflow-tooltip label="设备名称"></el-table-column>
            <el-table-column prop="oldname"  v-if="inittitle == 'video'"  show-overflow-tooltip label="设备名称">
                <template slot-scope="scope">
                    {{scope.row.oldname == undefined ? scope.row.name : scope.row.oldname}}
                </template>
            </el-table-column>
            <el-table-column prop="place" v-if="inittitle == 'people'" label="设备区域"></el-table-column>
            <el-table-column prop="longitude" label="设备经度"></el-table-column>
            <el-table-column prop="latitude" label="设备维度"></el-table-column>
            <el-table-column prop="operation" label="操作" v-if="inittitle == 'people'" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" class="searchBtn" size="mini" @click="editdevice(scope.row)"
                        icon="el-icon-edit">&nbsp;&nbsp;编辑</el-button>
                    <el-button type="danger" class="delBtn" size="mini" @click="deletedevice(scope.row)"
                        icon="el-icon-circle-close">&nbsp;&nbsp;删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination ref="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[15, 30]" :page-size="pageSize" background
            layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>

        <!-- 新增设备 -->
        <el-dialog class="dialog2" :title="title" :visible.sync="addVideoData" :close-on-click-modal="false"
            :close-on-press-escape="false" @close="addFacility();reset()" @open="opendia" width="10rem">
            <span>
                <ul class="addvideo" ref="addvideo">
                    <li>
                        <span>
                            <b class="mustwrite">*</b>设备名称：
                        </span>
                        <input type="text" maxlength="50" v-model.trim="deviceName" @blur="changename"
                            placeholder="请输入设备名称">
                        <p v-show="dnerr">请输入设备名称</p>
                    </li>

                    <li>
                        <span>
                            <b class="mustwrite">*</b>设备经度：
                        </span>
                        <input type="text" v-model.trim="lng" @blur="changelng" placeholder="请输入设备经度">
                        <p v-show="dplngerr">请输入设备经度</p>
                    </li>
                    <li>
                        <span>
                            <b class="mustwrite">*</b>设备纬度：
                        </span>
                        <input type="text" v-model.trim="lat" @blur="changelat" placeholder="请输入设备纬度">
                        <p v-show="dplaterr">请输入设备纬度</p>
                    </li>
                    <li class="compareTime">
                        <span>偏移量：</span>
                        比北京时间
                        <el-select v-model="fastType" placeholder="请选择" >
                            <el-option v-for="(item,index) in targetType" :label="item.label" :value="item.value"
                                :key="index"></el-option>
                        </el-select>
                        <input v-model="secondHand" class="searchSecond" maxlength="10" type="text" placeholder="请输入秒数">
                        &nbsp;秒
                        <p v-show="showInteger">请输入正整数</p>
                    </li>
                    <li class="lastaddvideo">
                        <span>
                            <b class="mustwrite">*</b>详细位置：
                        </span>
                        <province ref="province"></province>
                    </li>
                </ul>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary cancleBtn" @click="addFacility()">取 消</el-button>
                <el-button type="primary" class="passBtn" v-no-more-click @click="addupdeice">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import device from "../../../api/deviceId/device.js";
    import province from "@/components/province";
    export default {
        data() {
            return {
                deviceList: [],
                currentPage: 1,
                pageSize: 15,
                totalCount: 0,
                lat: "",
                lng: "",
                fastType: '0',
                targetType: [
                    // 目标类型：
                    {
                        value: "0",
                        label: "快"
                    },
                    {
                        value: "1",
                        label: "慢"
                    }
                ],
                secondHand: 0,
                showInteger: false,
                title: '新增设备信息',
                deviceInfo: '',
                shebeiId: '', //修改的时候传入的设备ID
            };
        },
        // slice((currentPage-1)*pageSize,currentPage*pageSize)
        props: {
            skynetlist: Array,
            inittitle: String,
            regionId: String,
        },
        mixins: [device],
        watch: {
            skynetlist: {
                handler(val) {
                    this.deviceList = val;
                    this.pageSize = 15;
                    this.currentPage = 1;
                    this.totalCount = val.length;
                },
                deep: true
            },
        },
        components: {
            province
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            addOrganiza() {
                this.title = '新增设备信息'
                this.addVideoData = true;
                this.secondHand = 0
                this.$nextTick(() => {
                    if (this.regionId == '') {
                        this.$refs.province.selected =
                            sessionStorage.getItem("defaultRegion").substring(0, 2) +
                            "0000";
                        this.$refs.province.selectcity =
                            sessionStorage.getItem("defaultRegion").substring(0, 4) +
                            "00";
                        this.$refs.province.selectdist = sessionStorage.getItem(
                            "defaultRegion"
                        );
                    } else {
                        this.$refs.province.selected = this.regionId.substring(0, 2) + "0000";
                        this.$refs.province.selectcity = this.regionId.substring(0, 4) + "00";
                        this.$refs.province.selectdist = this.regionId
                    }

                });
            },
            //修改设备
            editdevice(row) {
                this.title = '修改设备信息'
                this.addVideoData = true;
                this.deviceName = row.newName
                this.lng = row.longitude
                this.lat = row.latitude

                this.shebeiId = row.shebeiId
                this.$nextTick(() => {
                    this.$refs.province.selected =
                        row.placeCode.substring(0, 2) + "0000";
                    this.$refs.province.selectcity =
                        row.placeCode.substring(0, 4) + "00";
                    this.$refs.province.selectdist = row.placeCode;
                });
                this.getDeviceInfo(row.shebeiId).then(res => {
                    {
                        this.deviceInfo = res
                        if (res == null) {
                            this.fastType = '0'
                            this.secondHand = 0
                        } else {
                            this.secondHand = Math.abs(Number(res.offset))
                            if (Number(res.offset) <= 0) {
                                this.fastType = '0'
                            } else {
                                this.fastType = '1'
                            }
                        }

                    }
                })
            },
            //删除设备
            deletedevice(row) {
                //先查询点位信息
                this.$myconfirm({
                    type: '提示',
                    msg: '删除该点会导致点位关联数据全部丢失，是否确定删除？',
                    icon: 1,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.getDeviceInfo(row.shebeiId).then(res => {
                        if (res != null) {
                            this.deletecase(res)
                        }
                        this.deletshebei(row)
                    })
                })
            },
            //删除案件中的点位
            deletecase(row) {
                let UuidPort = [];
                // 循环localStorage
                for (const key in localStorage) {
                    // 找出其中有DxPort所有key
                    if (key.indexOf('DxPort') != -1) {
                        let arr = [];
                        // 把所有的key拿到后循环所有key里面的的值
                        // 添加到数组中去
                        for (let i = 0; i < JSON.parse(localStorage[key]).length; i++) {
                            arr.push({
                                port: key,
                                uuid: JSON.parse(localStorage[key])[i]
                            });
                        }
                        // 把数组添加到一个数组中去
                        UuidPort = UuidPort.concat(arr);
                    }
                }
                let id = {
                    pageNum: 1,
                    pageSize: 10000,
                    deviceId: row.deviceUuid,
                    caseUuid: this.$route.query.caseUuid,
                    submiterId: this.$storage.getSession('userInfo').userId,
                    orderBy: 'upload_time',
                    orderType: 'desc',
                    infoKind: 0,
                    status: 1
                };
                // 获取当前点位下的所有视频
                this.$http.get('vsas/collection/offline/list', {
                    params: id
                }).then(res => {
                    let arr = res.data.data.list;
                    let fileUuidStr = []
                    // 执行删除接口
                    let datas = {
                        caseUuid: this.$route.query.caseUuid,
                        deviceUuid: row.deviceUuid
                    };
                    datas = this.$qs.stringify(datas);
                    this.$http.post('vsas/task/temp/stopTask', datas).then(res => {
                        if (res.data.code == 200) {
                            let data = {
                                cameraUuid: row.cameraUuid
                            };
                            data = this.$qs.stringify(data);
                            this.$http.post('pca/casemng/temporary/device/delete', data).then(res => {
                                if (res.data.code == 200) {
                                    if (arr.length) {
                                        //获取所有案件下的文件id，批量删除
                                        arr.forEach(v => {
                                            fileUuidStr.push(v.fileUuid)
                                        })
                                        let str = fileUuidStr.join(';')
                                        deletFileId(str)
                                    }
                                } else {}
                            });
                        }
                    });
                });
                // });
            },
            //删除设备中的点位
            deletshebei(row) {
                this.$http.post("/sms/ape/delete/" + row.shebeiId).then(res => {
                    if (res.data.code == 200) {
                        this.$parent.querySocietyData(0, true);
                        this.$notify({
                            type: "success",
                            message: "删除成功",
                            position: "bottom-right",
                            duration: 3000
                        });
                    } else {
                        this.$notify({
                            type: "error",
                            message: "删除失败",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                });
            },
            //查询点位信息
            async getDeviceInfo(id) {
                let result = null
                let data = {
                    caseUuid: sessionStorage.getItem('exclusiveCaseUuid'),
                    deviceUuid: id
                };
                await this.$http.get("pca/casemng/device/rel/query", {
                    params: data
                }).then(res => {
                    result = res.data.data
                });
                return result
            },
            opendia() {
                if (this.title == '新增设备信息') {
                    var lngnum = Number(
                        (
                            (Math.random() * (Math.random() > 0.5 ? 1 : -1) * 100000 +
                                1) /
                            1000000
                        ).toFixed(6)
                    );
                    var latnum = Number(
                        (
                            (Math.random() * (Math.random() > 0.5 ? 1 : -1) * 100000 +
                                1) /
                            1000000
                        ).toFixed(6)
                    );
                    this.lng = (
                        Number(sessionStorage.getItem("longitude")) + Number(lngnum)
                    ).toFixed(6);
                    this.lat = (
                        Number(sessionStorage.getItem("latitude")) + Number(latnum)
                    ).toFixed(6);
                }

            },
            //添加和修改
            addupdeice() {
                if (!this.verify()) {
                    return false;
                }
                if (this.lng == "") {
                    var lngnum = Number(((Math.random() * (Math.random() > 0.5 ? 1 : -1) * 100000 + 1) / 1000000)
                        .toFixed(6));

                    this.lng = (Number(sessionStorage.getItem("longitude")) + Number(lngnum)).toFixed(6);
                } else {
                    let lngreg =
                        /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
                    if (!lngreg.test(this.lng)) {
                        this.$notify({
                            type: "warning",
                            message: "请输入正确的经度!",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return;
                    }
                }
                if (this.lat == "") {
                    var latnum = Number(((Math.random() * (Math.random() > 0.5 ? 1 : -1) * 100000 + 1) / 1000000)
                        .toFixed(6));
                    this.lat = (Number(sessionStorage.getItem("latitude")) + Number(latnum)).toFixed(6);
                } else {
                    var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
                    if (!latreg.test(this.lat)) {
                        this.$notify({
                            type: "warning",
                            message: "请输入正确的纬度!",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return;
                    }
                }
                if (
                    this.deviceName == "" ||
                    this.point.lng == "" ||
                    this.point.lat == ""
                ) {
                    return;
                }
                var regu = /^[1-9]\d*|$/;
                var decimalPoint = /^\d+$/;
                if (!regu.test(this.secondHand) || !decimalPoint.test(this.secondHand)) {
                    this.showInteger = true;
                    setTimeout(() => {
                        this.showInteger = false;
                    }, 2000);
                    return;
                }
                if (this.fastType == '0') {
                    this.secondHand = -this.secondHand;
                } else {
                    this.secondHand = this.secondHand;
                }
                if (this.secondHand == '' || this.secondHand == 0) {
                    this.secondHand = 0;
                }


                if (this.title == '新增设备信息') {
                    this.adddeice()
                } else {
                    this.updateshebei()
                }
            },
            //修改案件设备
            updatecasedevice(row) {
                let data = {
                    cameraUuid: this.deviceInfo.cameraUuid,
                    caseUuid: sessionStorage.getItem('exclusiveCaseUuid'),
                    longitude: row.longitude,
                    latitude: row.latitude,
                    offset: this.secondHand,
                };
                data = this.$qs.stringify(data);
                this.$http.post('pca/casemng/temp/device/update', data).then(res => {
                    if (res.data.code == 200) {
                        this.addVideoData = false;
                        this.$notify({
                            type: 'success',
                            message: '设备校时成功',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else if (res.data.code == 100) {
                        this.$notify({
                            type: 'warning',
                            message: '该案件下有名称相同的点位！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '设备校时失败',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                });
            },
            //修改设备
            updateshebei() {
                let data = {
                    name: this.deviceName, // 名称
                    model: this.deviceModel, // 型号
                    ipAddr: this.deviceIP, // IP地址
                    port: this.devicePort, // 端口号
                    longitude: this.lng, // 经度
                    latitude: this.lat, // 纬度
                    placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
                    rtspUrl: this.deviceRtsp, //rtsp地址
                    apeId: this.deviceApe, //设备编号
                    userId: this.userId,
                    password: this.password,
                    apeType: 0, // 设备类型 0.视频 ,1.人像
                    isSociety: 1 // 是否社会类0.否,1是
                };
                data = this.$qs.stringify(data);
                let url = "/sms/ape/update/" + this.shebeiId;
                this.$http.post(url, data).then(res => {
                    if (res.data.code == 200) {
                        this.addVideoData = false;
                        if (this.deviceInfo != null) {
                            this.updatecasedevice(res.data.data)
                        }
                        this.$parent.querySocietyData(0, true);
                    } else if (res.data.code == 100) {
                        this.$notify({
                            type: "warning",
                            message: "有相同名称的点位存在!",
                            position: "bottom-right",
                            duration: 3000
                        });
                    } else {
                        this.addVideoData = false;
                        this.$notify({
                            type: "error",
                            message: "修改失败！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                });
            },
            // 7 新增设备
            adddeice() {
                let data = {
                    name: this.deviceName, // 名称
                    model: this.deviceModel, // 型号
                    ipAddr: this.deviceIP, // IP地址
                    port: this.devicePort, // 端口号
                    rtspUrl: this.deviceRtsp, //rtsp地址
                    apeId: this.deviceApe, //设备编号
                    userId: this.userId,
                    password: this.password,
                    longitude: this.lng, // 经度
                    latitude: this.lat, // 纬度
                    placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
                    apeType: 0, // 设备类型 0.视频 ,1.人像
                    isSociety: 1 // 是否社会类0.否,1是
                };
                data = this.$qs.stringify(data);
                this.$http.post("/sms/ape/add", data).then(res => {
                    if (res.data.code == 200) {
                        this.addVideoData = false;
                        this.$notify({
                            type: "success",
                            message: "添加成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.$parent.querySocietyData(0, true);
                        let devices = []
                        devices.push({
                            type: 4,
                            caseCameraList: [{
                                "cameraType": 4,
                                "deviceUuid": res.data.data.shebeiId,
                                "longitude": res.data.data.longitude,
                                "latitude": res.data.data.latitude,
                                "cameraName": res.data.data.name,
                                "offset": this.secondHand,
                                "caseUuid": sessionStorage.getItem('exclusiveCaseUuid')
                            }]
                        })
                        this.addDeviceToCase(devices)
                    } else if (res.data.code == 100) {
                        this.$notify({
                            type: "warning",
                            message: "有相同名称的点位存在！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    } else {
                        this.addVideoData = false;
                        this.$notify({
                            type: "error",
                            message: "添加失败",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                });
            },
            //新增案件设备
            addDeviceToCase(devices) {
                let data = {
                    caseUuid: sessionStorage.getItem('exclusiveCaseUuid'),
                    relDeviceList: devices
                }
                data = this.$qs.stringify(data, {
                    arrayFormat: 'indices',
                    allowDots: true
                })
                this.$http.post('vsas/structure/check/device/rel', data).then(res => {})
            },

            reset() {
                this.deviceName = ""; // 名称
                this.deviceModel = ""; // 型号
                this.deviceIP = ""; // IP地址
                this.devicePort = ""; // 端口号
                this.deviceRtsp = ""; //rtsp地址
                this.deviceApe = ""; //设备编号
                this.userId = "";
                this.password = "";
                this.lng = ""; // 经度
                this.lat = ""; // 纬度
            },
            //返回任务列表
            gotask() {
                this.$router.push({
                    path: "/videoStrucPlat/taskManage",
                    query: {
                        menuCode: 701
                    }
                });
            }
        }
    };
</script>

<style scoped>
    @import "../../../assets/css/commom.css";

    .showdeviceoId {
        padding: 0 0.15rem;
    }

    .searchkline {
        margin-bottom: 0.1rem;
    }

    .searchkline span {
        display: inline-block;
        width: 1.2rem;
        height: 0.3rem;
        line-height: 0.3rem;
        cursor: pointer;
        font-size: 0.12rem;
        margin-right: 0.2rem;
    }

    .addvideo,
    .addcar {
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* border: 1px solid #000; */
    }

    .addvideo span {
        width: 1rem;
        text-align: right;
        display: inline-block;
        color: #99c9fa;
    }

    .addcar li span {
        width: 1.5rem;
        text-align: right;
        display: inline-block;
        color: #99c9fa;
    }

    .addvideo li,
    .addcar li {
        float: left;
        width: 46%;
        height: 0.4rem;
        margin: 0.1rem 0;
    }

    /* .addvideo .lastaddvideo{
  width: 50%;
} */
    .compareTime .el-select {
        width: .7rem;
    }

    .compareTime .el-select .el-input__inner,
    .compareTime .el-select /deep/ .el-input__inner {
        height: .3rem;
    }

    .compareTime .searchSecond {
        width: 1rem;
        margin-left: 0.2rem;
    }

    .addvideo li input {
        width: 2.5rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 3px;
        text-indent: 0.05rem;
    }

    .mustwrite {
        color: red;
        margin-right: 0.1rem;
        text-align: left;
        vertical-align: middle;
    }

    .addcar li input {
        width: 2.5rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 3px;
        text-indent: 0.05rem;
    }

    .addvideo li p {
        font-size: 0.1rem;
        color: red;
        margin-left: 1.55rem;
    }

    .addcar li p {
        font-size: 0.1rem;
        color: red;
        margin-left: 1.55rem;
    }

    .addvideo .lastaddvideo {
        width: 100%;
    }

    .addvideo .lastaddvideo div {
        display: inline-block;
    }

    .addvideo li select {
        width: 2.5rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 3px;
        text-indent: 0.05rem;
    }

    .el-pagination {
        margin-top: 0.1rem;
    }


@media (max-width:1440px){
    .compareTime .el-select {
        width: .9rem;
    }
}
</style>
