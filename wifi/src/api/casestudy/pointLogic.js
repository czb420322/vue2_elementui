let linshi = require('@/assets/images/device/temporary.png');
let info = require('@/assets/images/device/info.png');
let kakou = require('@/assets/images/device/kakou.png');
// 点位逻辑
const mixins = {
    data() {
        return {

        }
    },
    computed: {
        pointForm() {
            let aa;
            if (this.listType == 5) {
                aa = '临时';
            } else if (this.listType == 6) {
                aa = '信息';
            } else if (this.listType == 8) {
                aa = '卡口'
            }
            return aa;
        },
    },
    watch: {

    },
    methods: {
        // 新增临时点位 或详情点或卡口点
        adddianwei() {
            if (this.extra.replace(/(^\s*)|(\s*$)/g, '') == '') {
                this.emptyMust = true;
                setTimeout(() => {
                    this.emptyMust = false;
                }, 1000);
                return;
            }
            if (this.listType == 5 || this.listType == 8) {
                var regu = /^[1-9]\d*|$/;
                var decimalPoint = /^\d+$/;
                if (!regu.test(this.secondHand) || !decimalPoint.test(this.secondHand)) {
                    this.showInteger = true;
                    setTimeout(() => {
                        this.showInteger = false;
                    }, 2000);
                    return;
                }
            }
            if (this.extra.length > 26) {
                this.tenLength = true;
                setTimeout(() => {
                    this.tenLength = false;
                }, 1000);
                return;
            }
            // let lngreg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,6})?)|180(([.][0]{1,6})?))$/
            // let latreg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,6})?)|90(([.][0]{1,6})?))$/
            // let lngreg = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180(\.0{1,10})?)|180$/;
            // let latreg = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/;

            var lngreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
            var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
            if (this.firstPoint == 0 || this.twoPonit == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请输入正确的经纬度',
                    position: 'bottom-right',
                    duration: 2000
                });
                return;
            }
            if (!lngreg.test(this.firstPoint)) {
                this.showlng = true;
                setTimeout(() => {
                    this.showlng = false;
                }, 2000);
                return;
            }

            if (!latreg.test(this.twoPonit)) {
                this.showlat = true;
                setTimeout(() => {
                    this.showlat = false;
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
            if (this.firstPoint == '' || this.twoPonit == '') {
                this.$notify({
                    type: 'warning',
                    message: '请输入经纬度',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            this.isclick = true;
            let cameraType; // 点位类别 1 天网 2 车辆 3 人像 4 社会面 5 临时点 6 信息点
            // 添加临时点位的方法
            // 添加临时点位的方法

            if (this.addtype == '临时') {
                cameraType = 5;
            } else if (this.addtype == '信息') {
                cameraType = 6;
            } else if (this.addtype == '卡口') {
                cameraType = 8;
            }
            let data = {
                caseUuid: this.$route.query.caseUuid,
                cameraType: cameraType,
                deviceUuid: '',
                cameraName: this.extra,
                longitude: this.firstPoint,
                latitude: this.twoPonit,
                offset: this.secondHand
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/temp/device/add', data).then(res => {
                setTimeout(() => {
                    this.isclick = false;
                }, 1000);
                if (res.data.code == 200) {
                    this.DialogVisible13 = false;
                    this.DialogVisible12 = false;
                    if (this.addtype == '临时') {
                        this.createMar1(this.firstPoint, this.twoPonit, res.data.data.deviceUuid, linshi);
                        this.$notify({
                            type: 'success',
                            message: '添加临时点成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else if (this.addtype == '信息') {
                        this.createMar1(this.firstPoint, this.twoPonit, res.data.data.deviceUuid, info);
                        this.$notify({
                            type: 'success',
                            message: '添加信息点成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else if (this.addtype == '卡口') {

                        this.createMar1(this.firstPoint, this.twoPonit, res.data.data.deviceUuid, kakou);
                        this.$notify({
                            type: 'success',
                            message: '添加卡口点成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                    this.$nextTick(() => {
                        // this.ajaxTree();
                        this.ajaxCaseInfo(); // 刷新地图清空案发点
                        this.showtemp = false;
                    })
                } else if (res.data.code == 666) {
                    this.$notify({
                        type: 'warning',
                        message: '点位名称重复，请重新输入！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.DialogVisible13 = false;
                    this.DialogVisible12 = false;
                    this.$notify({
                        type: 'error',
                        message: '添加点位失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }

            });
        },
        // 地图添加右击事件
        onRightMapFun(map) {
            this.menu = new BMap.ContextMenu();
            let txtMenuItem = [{
                    text: '新增案发点',
                    callback: (e) => {
                        this.closeSearchImg();
                        this.closeSearchCarImg();
                        this.pointCrime = '新增案发点';
                        this.isUpdate = 1;
                        this.DialogVisible12 = true;
                        this.isDisableClick = false
                        this.isclick = false;
                        this.caselng = this.point.lng;
                        this.caselat = this.point.lat;
                        this.point = e;
                        // let point = new BMap.Point(e['lng'], e['lat']);
                        // let marker = new BMap.Marker(point);
                    }
                },
                {
                    text: '新增临时点',
                    callback: (e) => {
                        this.closeSearchImg();
                        this.closeSearchCarImg();
                        this.DialogVisible13 = true;
                        this.isclick = false;
                        this.firstPoint = this.point.lng;
                        this.twoPonit = this.point.lat;
                        this.addtype = '临时';
                        this.equipmentTime = true;
                        this.listType = 5;
                    }
                },
                {
                    text: '新增信息点',
                    callback: (e) => {
                        this.closeSearchImg();
                        this.closeSearchCarImg();
                        this.DialogVisible13 = true;
                        this.isclick = false;
                        this.firstPoint = this.point.lng;
                        this.twoPonit = this.point.lat;
                        this.addtype = '信息';
                        this.equipmentTime = false;
                        this.listType = 6;
                    }
                },

            ];
            if (this.isopenAddkakouPoint == true) {
                txtMenuItem.push({
                    text: '新增卡口点',
                    callback: (e) => {
                        this.closeSearchImg();
                        this.closeSearchCarImg();
                        this.DialogVisible13 = true;
                        this.isclick = false;
                        this.firstPoint = this.point.lng;
                        this.twoPonit = this.point.lat;
                        this.addtype = '卡口';
                        this.equipmentTime = false;
                        this.listType = 8;
                    }
                }, )
            }
            for (let i = 0; i < txtMenuItem.length; i++) {
                this.menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {
                    width: 200,
                    id: 'dom_' + i
                }));
            }
            map.addContextMenu(this.menu);
        },

        // 地图添加右击事件
        onRightMapFun1(map) {
            this.menu = new BMap.ContextMenu();
            let txtMenuItem = [{
                    text: '新增临时点',
                    callback: (e) => {
                        this.closeSearchImg();
                        this.closeSearchCarImg();
                        this.DialogVisible13 = true;
                        this.isclick = false;
                        this.firstPoint = this.point.lng;
                        this.twoPonit = this.point.lat;
                        this.addtype = '临时';
                        this.equipmentTime = true;
                        this.listType = 5;
                    }
                },
                {
                    text: '新增信息点',
                    callback: (e) => {
                        this.closeSearchImg();
                        this.closeSearchCarImg();
                        this.DialogVisible13 = true;
                        this.isclick = false;
                        this.firstPoint = this.point.lng;
                        this.twoPonit = this.point.lat;
                        this.addtype = '信息';
                        this.equipmentTime = false;
                        this.listType = 6;
                    }
                }

            ];
            if (this.isopenAddkakouPoint) {
                txtMenuItem.push({
                    text: '新增卡口点',
                    callback: (e) => {
                        this.closeSearchImg();
                        this.closeSearchCarImg();
                        this.DialogVisible13 = true;
                        this.isclick = false;
                        this.firstPoint = this.point.lng;
                        this.twoPonit = this.point.lat;
                        this.addtype = '卡口';
                        this.equipmentTime = false;
                        this.listType = 8;
                    }
                }, )
            }
            for (let i = 0; i < txtMenuItem.length; i++) {
                this.menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {
                    width: 200,
                    id: 'dom_' + i
                }));
            }
            map.addContextMenu(this.menu);
        },

        // 修改/删除案发点的操作
        onRightCaseFun(marker) {
            let markerMenu = new BMap.ContextMenu();
            let txtMenuItem = [{
                    text: '修改案发点',
                    callback: (e, ee, marker) => {
                        this.isUpdate = 1;
                        this.pointCrime = '修改案发点';
                        this.DialogVisible12 = true;
                        // 写接口调用方法
                    }
                },
                {
                    text: '移动案发点',
                    callback: (e, ee, marker) => {
                        marker.enableDragging();
                        marker.addEventListener('dragend', (e) => {
                            this.isUpdate = 2;
                            this.createcase(marker);
                        });
                    }
                },
                {
                    text: '删除案发点',
                    callback: (e, ee, marker) => {
                        this.isUpdate = 3;
                        this.createcase();
                    }
                }
            ];
            for (let i = 0; i < txtMenuItem.length; i++) {
                markerMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback));
            }
            marker.addContextMenu(markerMenu);
        },
        // 确定创建点位
        createMar1(d1, d2, deviceUuid, img) {
            if (this.firstPoint == null) {
                return;
            }
            var point = new BMap.Point(d1, d2);
            var myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
            var marker = new BMap.Marker(point, {
                offset: new BMap.Size(0, -20),
                icon: myIcon
            });
            marker.id = deviceUuid;
            this.markers.push(marker);
            let _this = this;
            if (this.isRightClick) {
                marker.addEventListener('rightclick', function (e) {
                    _this.$store.state.mapLeftMenuFlag = false;
                });
                marker.addEventListener('click', function (e) {
                    _this.$store.state.isMarkerLable = true;
                    let rightMenu = document.getElementById('MapLeftMenu');
                    _this.$store.state.mapLeftMenuFlag = true;
                    rightMenu.style.left = (e.clientX + 10) + 'px';
                    rightMenu.style.top = (e.clientY - 65) + 'px';
                    _this.deviceUuid = e.target.id;
                    _this.listType = e.target.list.type;
                    _this.listName = e.target.list.cameraName;
                    _this.listlng = e.target.list.longitude;
                    _this.listlat = e.target.list.latitude;
                    _this.pTinfo = e.target;
                    _this.showimgrul = '';
                    if (_this.listType == 6) {
                        _this.getImgquery(_this.deviceUuid);
                    } else if (_this.listType == 5) {
                        _this.getAllImg(_this.deviceUuid);
                    }
                });
                this.map.addEventListener('zoomstart', function (evt) {
                    _this.$store.state.mapLeftMenuFlag = false;
                });
                this.map.addEventListener('dragstart', function (evt) {
                    _this.$store.state.mapLeftMenuFlag = false;
                });
            }
            this.map.addOverlay(marker);
        },
        // 打开修改临时或者信息点
        openupdate(type) {
            this.DialogVisible14 = true;
            this.ptType = type;
            if (this.listType == 6 || this.listType == 8) {
                this.equipmentTime = false;
            } else {
                this.equipmentTime = true;
            }
            if (this.pTinfo.list.offset <= 0 && this.fastType == '0') {
                this.fastType = '0';
                this.secondHand = -(this.pTinfo.list.offset);
            } else {
                this.fastType = '1';
                this.secondHand = this.pTinfo.list.offset == undefined ? 0 : this.pTinfo.list.offset;
            }
            this.extra = this.pTinfo.list.cameraName;
            this.ptlng = this.pTinfo.list.longitude;
            this.palat = this.pTinfo.list.latitude;
            if (this.ptlng == 0 || this.palat == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请输入正确的经纬度',
                    position: 'bottom-right',
                    duration: 2000
                });
            }
        },
        // 修改临时或者信息点
        updateInfo() {
            if (this.palat == 0 || this.ptlng == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请输入正确的经纬度！',
                    position: 'bottom-right',
                    duration: 3000
                });
                // this.isDoubleClick = false;
                return;
            }
            if (this.ptlng == '' || this.palat == '') {
                this.$notify({
                    type: 'warning',
                    message: '请输入经纬度',
                    position: 'bottom-right',
                    duration: 3000
                });
                // this.isDoubleClick = false;
                return;
            }
            var regu = /^[1-9]\d*|$/;
            var decimalPoint = /^\d+$/;
            if (!regu.test(this.secondHand) || !decimalPoint.test(this.secondHand)) {
                this.showInteger = true;
                setTimeout(() => {
                    this.showInteger = false;
                }, 2000);
                // this.isDoubleClick = false;
                return;
            }
            if (this.extra.replace(/(^\s*)|(\s*$)/g, '') == '') {
                this.emptyMust = true;
                setTimeout(() => {
                    this.emptyMust = false;
                }, 1000);
                // this.isDoubleClick = false;
                return;
            }
            if (this.extra == '') {
                this.emptyMust = true;
                setTimeout(() => {
                    this.emptyMust = false;
                }, 1000);
                // this.isDoubleClick = false;
                return;
            }
            if (this.extra.length > 26) {
                this.tenLength = true;
                setTimeout(() => {
                    this.tenLength = false;
                }, 1000);
                // this.isDoubleClick = false;
                return;
            }

            let lngreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
            let latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
            if (!lngreg.test(this.ptlng)) {
                this.showlng = true;
                setTimeout(() => {
                    this.showlng = false;
                }, 2000);
                return;
            }
            if (!latreg.test(this.palat)) {
                this.showlat = true;
                setTimeout(() => {
                    this.showlat = false;
                }, 2000);
                return;
            }
            if (this.fastType == '0') {
                this.secondHand = -(this.secondHand);
            } else {
                this.secondHand = this.secondHand;
            }
            if (this.secondHand == '' || this.secondHand == 0) {
                this.secondHand = 0;
            }
            this.isDoubleClick = true;
            let data = {
                cameraUuid: this.pTinfo.list.cameraUuid,
                caseUuid: this.$route.query.caseUuid,
                cameraType: this.pTinfo.list.type,
                deviceUuid: this.pTinfo.list.deviceUuid,
                cameraName: this.extra,
                longitude: this.ptlng,
                latitude: this.palat,
                offset: this.secondHand
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/temp/device/update', data).then(res => {
                this.changeSuspicionObj(this.suspicionUuids);
                this.isDoubleClick = false;
                if (res.data.code == 200) {
                    this.DialogVisible14 = false;
                    this.$notify({
                        type: 'success',
                        message: '修改' + this.pointForm + '点成功！',
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
                        message: '修改' + this.pointForm + '点失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },
        movePoint(e) {
            let data = {
                cameraUuid: this.pTinfo.list.cameraUuid,
                caseUuid: this.$route.query.caseUuid,
                cameraType: this.pTinfo.list.type,
                deviceUuid: this.pTinfo.list.deviceUuid,
                cameraName: this.pTinfo.list.cameraName,
                longitude: e.point.lng,
                latitude: e.point.lat
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/temp/device/update', data).then(res => {
                if (res.data.code == 200) {
                    this.pTinfo.disableDragging();
                    if (this.suspicionUuids) {
                        this.changeSuspicionObj(this.suspicionUuids)
                    } else {
                        this.changeSuspicionObj(false)
                    }
                    this.DialogVisible14 = false;
                    this.$notify({
                        type: 'success',
                        message: '移动' + this.pointForm + '点成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.spaceVideoArrowFlag = 1;
                    // 移动点位成功后,重绘


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
                        message: '移动' + this.pointForm + '点失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },

        // 移动点位
        movePt() {
            this.caselng = null;
            this.caselat = null;
            this.pTinfo.enableDragging();
            // this.mouseFlag = true
            this.spaceVideoArrowFlag = 2;
            // this.friendArrowFlag = 2
            this.pTinfo.removeEventListener('dragend', this.movePoint);
            this.pTinfo.addEventListener('dragend', this.movePoint);
        },
        // 删除信息点
        deleteInfo(row) {
            // 删除临时点标注
            if (this.listType == 5) {
                this.$myconfirm({
                    type: '提示',
                    msg: '删除该点会导致点位关联数据全部丢失，是否确定删除？',
                    icon: 1,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
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
                        deviceId: row.list.deviceUuid,
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
                            deviceUuid: row.list.deviceUuid
                        };
                        datas = this.$qs.stringify(datas);
                        this.$http.post('vsas/task/temp/stopTask', datas).then(res => {
                            if (res.data.code == 200) {
                                let data = {
                                    cameraUuid: row.list.cameraUuid
                                };
                                data = this.$qs.stringify(data);
                                this.$http.post('pca/casemng/temporary/device/delete', data).then(res => {
                                    this.getLableList();
                                    if (res.data.code == 200) {
                                        // this.ajaxTree();
                                        this.changeSuspicionObj(this.suspicionUuids);
                                        if (arr.length) {
                                            // >>>>>>>>>>>>>>>>>>>>>>>>1.7代码开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                            //获取所有案件下的文件id，批量删除
                                            arr.forEach(v => {
                                                fileUuidStr.push(v.fileUuid)
                                            })
                                            let str = fileUuidStr.join(';')
                                            deletFileId(str)
                                            // >>>>>>>>>>>>>>>>>>>>>>>>1.7代码结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

                                            // >>>>>>>>>>>>>>>>>>>>>>>1.6代码<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                            // let arrport = [];
                                            // // 拿到所有的未上传的视频以及localStorage中的数据比较，得到端口
                                            // for (let i = 0; i < arr.length; i++) {
                                            //   for (let j = 0; j < UuidPort.length; j++) {
                                            //     if (arr[i].fileUuid == UuidPort[j].uuid) {
                                            //       arrport.push(UuidPort[j].port);
                                            //     }
                                            //   }
                                            // }
                                            // // 对端口进行去重
                                            // arrport = [...new Set(arrport)];
                                            // // 然后执行删除进程方法
                                            // // 拿到所有的端口，对数
                                            // let name = JSON.parse(sessionStorage.getItem('name')).value;
                                            // for (const key in localStorage) {
                                            //   // 找出其中有DxPort所有key
                                            //   for (let i = 0; i < arrport.length; i++) {
                                            //     // 如果所有的key等于端口，删除当前key中的所有的值，因为删除点位是批量删除
                                            //     if (key == arrport[i]) {
                                            //       let url = 'http://127.0.0.1:' + key.substr(6, key.length) + '/DxHandler.js?cbk=OnDeleteFile&req=0&fileuuidlist=' + JSON.parse(localStorage[key]).join(';') + "&submiterId=" + name;;
                                            //       let gSocket = document.createElement('script');
                                            //       gSocket.src = url;
                                            //       document.body.appendChild(gSocket);
                                            //     }
                                            //   }
                                            // }
                                        }
                                        this.$notify({
                                            type: 'success',
                                            message: '删除临时点成功！',
                                            position: 'bottom-right',
                                            duration: 3000
                                        });
                                    } else {
                                        this.$notify({
                                            type: 'success',
                                            message: '删除临时点失败！',
                                            position: 'bottom-right',
                                            duration: 3000
                                        });
                                    }
                                });
                            } else {
                                this.$notify({
                                    type: 'success',
                                    message: '删除临时点失败！',
                                    position: 'bottom-right',
                                    duration: 3000
                                });
                            }
                        });
                    });
                });
            } else if (this.listType == 6) {
                this.$myconfirm({
                    type: '提示',
                    msg: '删除该点会导致点位关联数据全部丢失，是否确定删除？', // 删除信息点
                    icon: 1,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    let data = {
                        cameraUuid: row.list.cameraUuid,
                        cameraType: 6
                    };
                    data = this.$qs.stringify(data);
                    this.$http.post('pca/casemng/temp/device/delete', data).then(res => {
                        if (res.data.code == 200) {
                            this.changeSuspicionObj(this.suspicionUuids);
                            this.$notify({
                                type: 'success',
                                message: '删除信息点成功！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        } else {
                            this.$notify({
                                type: 'success',
                                message: '删除信息点失败！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        }
                    });
                });
            } else if (this.listType == 8) {
                //删除卡口点时，首先删除当前卡口点下的所有图片上传的进程，不管这个进程是否已停掉，全部删除
                this.confirmDevice(row)
                this.$myconfirm({
                    type: '提示',
                    msg: '删除该点会导致点位关联数据全部丢失，是否确定删除？', // 删除信息点
                    icon: 1,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    let data = {
                        cameraUuid: row.list.cameraUuid,
                        cameraType: 8
                    };
                    data = this.$qs.stringify(data);
                    this.$http.post('pca/casemng/temporary/device/delete', data).then(res => {
                        if (res.data.code == 200) {
                            this.ajaxTree();
                            this.$notify({
                                type: 'success',
                                message: '删除卡口点成功！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        } else {
                            this.$notify({
                                type: 'warning',
                                message: '删除卡口点失败！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        }
                    });
                })
            }
        },
        // 打开修改案发点
        updateCase() {
            this.isUpdate = 1;
            this.pointCrime = '修改案发点';
            this.DialogVisible12 = true;
            this.caselng = this.dataCaseInfo.longitude;
            this.caselat = this.dataCaseInfo.latitude;
        },
        /**
         * @description://移动案发点的回调
         * @param {type}
         * @return:
         * @name: 陈秀峰
         */
        moveCasePoint() {
            this.isUpdate = 2;
            this.createcase(this.pTinfo);
            if (this.isUpdate == 2) {
                this.beginmove = false;
                this.$notify({
                    type: 'success',
                    message: '移动案发点成功！',
                    position: 'bottom-right',
                    duration: 3000
                });
                this.spaceVideoArrowFlag = 1;
            } else {
                this.$notify({
                    type: 'warning',
                    message: '移动案发点失败！',
                    position: 'bottom-right',
                    duration: 3000
                });
                this.spaceVideoArrowFlag = 1;
            }
        },
        // 移动案发点
        moveCase(marker) {
            this.beginmove = true;
            this.spaceVideoArrowFlag = 2;
            marker.enableDragging();
            // 先清除监听，然后添加监听事件
            marker.removeEventListener('dragend', this.moveCasePoint);
            marker.addEventListener('dragend', this.moveCasePoint);
        },

        deleteCase() {
            this.caselng = this.dataCaseInfo.longitude;
            this.caselat = this.dataCaseInfo.latitude;
            this.$myconfirm({
                type: '提示',
                msg: '删除该点会导致点位关联数据全部丢失，是否确定删除？',
                icon: 1,
                btn: {
                    ok: '确定',
                    no: '取消'
                }
            }).then(() => {
                let data = {
                    hotspotId: this.hotspotId,
                    caseUuid: this.$route.query.caseUuid
                };
                data = this.$qs.stringify(data);
                this.$http.post('pca/casemng/casesite/del', data).then(res => {
                    if (res.data.code == 200) {
                        this.map.removeContextMenu(this.menu);
                        this.onRightMapFun(this.map);
                        this.ajaxCaseInfo();
                        this.$notify({
                            type: 'success',
                            message: '删除案发点成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.pointDataList[2].children = [];
                    }
                });
                this.isUpdate = 3;
                // this.createcase();
            });
        },
        // 新增案发点  //修改案发点
        createcase(marker) {
            // this.isDisableClick = true
            if (this.caselng == '' || this.caselat == '') {
                this.$notify({
                    type: 'warning',
                    message: '请输入经纬度',
                    position: 'bottom-right',
                    duration: 3000
                });
                // this.isDisableClick = false
                return;
            }
            if (this.caselng == 0 || this.caselat == 0) {
                this.$notify({
                    type: 'warning',
                    message: '请输入正确的经纬度',
                    position: 'bottom-right',
                    duration: 2000
                });
                // this.isDisableClick = false
                return;
            }
            if (this.isUpdate == 1) {
                // let lngreg = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180(\.0{1,10})?)|180$/;
                let lngreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
                // let latreg = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/;
                let latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
                if (!lngreg.test(this.caselng)) {
                    this.showlng = true;
                    setTimeout(() => {
                        this.showlng = false;
                    }, 2000);
                    return
                }
                if (!latreg.test(this.caselat)) {
                    this.showlat = true;
                    setTimeout(() => {
                        this.showlat = false;
                    }, 2000);
                    return
                }
            } else if (this.isUpdate == 2) {
                marker.disableDragging();
                this.caselng = marker.point.lng;
                this.caselat = marker.point.lat;
            } else if (this.isUpdate == 3) {
                this.caselng = '200';
                this.caselat = '200';
                let data = {
                    id: this.u_id,
                    pointId: this.hotspotId, // 设备ID
                    imgUrl: '',
                    pointType: 7, // 类型  6信息点 7案发点
                    operationType: 2, // 表示新增还是删除
                    caseUuid: this.$route.query.caseUuid
                };
                data = this.$qs.stringify(data);
                this.$http.post('pca/point/img/relevance', data).then(res => {
                    if (res.data.code == 200) {

                    }
                });
            }
            this.isclick = true;
            this.DialogVisible12 = false;
            // 把经纬度传给后台
            let data = {
                caseUuid: this.caseUuid, // 案件ID
                caseLinkMark: this.dataCaseInfo.caseLinkMark, // 案件编号
                caseName: this.dataCaseInfo.caseName, // 案发名称
                timeUpLimit: this.dataCaseInfo.timeUpLimit, // 案发结束时间
                timeLowLimit: this.dataCaseInfo.timeLowLimit, // 案发开始时间
                placeCode: this.dataCaseInfo.placeCode, // 区/县 简码
                regionFullName: this.dataCaseInfo.regionFullName, // 区县 名称
                placeFullAddress: this.dataCaseInfo.placeFullAddress, // 案发详址
                longitude: this.caselng, // 案发经度
                latitude: this.caselat, // 案发纬度
                state: this.dataCaseInfo.state, // 案件状态
                caseCategoryDesc: this.dataCaseInfo.caseCategoryDesc, // 案件类型
                caseToolDesc: this.dataCaseInfo.caseToolDesc, // 作案工具
                caseMethodDesc: this.dataCaseInfo.caseMethodDesc, // 作案手段
                caseLevelDesc: this.dataCaseInfo.caseLevelDesc, // 危害程度
                caseTargetDesc: this.dataCaseInfo.caseTargetDesc, // 侵犯目标
                caseOpportunityDesc: this.dataCaseInfo.caseOpportunityDesc, // 作案时机
                caseAbstract: this.dataCaseInfo.caseAbstract, // 简要案情
                isSpecial: this.dataCaseInfo.isSpecial ? 1 : 0 // 协同作战状态
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/baseinfo/save', data)
                .then(response => {
                    setTimeout(() => {
                        this.isclick = false;
                    }, 1000);
                    if (response.data.code == 200) {
                        this.ajaxCaseInfo();
                        // this.caseLabel(this.caselng, this.caselat, true);
                        this.hotspotId = response.data.data.hotspotId;
                        if (this.isUpdate == 1 && this.pointCrime == '新增案发点') {
                            this.map.removeContextMenu(this.menu);
                            this.onRightMapFun1(this.map);
                            this.$notify({
                                type: 'success',
                                message: '添加案发点成功！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.isDisableClick = false
                            this.spaceVideoArrowFlag = 1;
                        }
                        if (this.isUpdate == 1 && this.pointCrime == '修改案发点') {
                            this.$notify({
                                type: 'success',
                                message: '修改案发点成功！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.isDisableClick = false
                            this.spaceVideoArrowFlag = 1;
                        }
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '添加案发点失败！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.isDisableClick = false
                    }
                });
        },
        // 验证经度
        verifylng(val) {
            let lngreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
            // let lngreg = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180(\.0{1,10})?)|180$/
            if (!lngreg.test(val)) {
                this.showlng = true;
                setTimeout(() => {
                    this.showlng = false;
                }, 2000);
            } else {
                return true
            }
        },

        // 验证维度
        verifylat(val) {
            // let latreg = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/
            var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
            if (!latreg.test(val)) {
                this.showlat = true;
                setTimeout(() => {
                    this.showlat = false;
                }, 2000);
            } else {
                return true
            }
        },
    }
}
export default mixins
