// let face = require('@/assets/images/device/face.png')
import html2canvas from 'html2canvas';
import canvg from 'canvg';
import {
    encryptData_ECB,
    decryptData_ECB
} from '../../api/SM4Util'; //加密，解密

import {
    mapMutations,
    mapGetters
} from 'vuex';
import _ from 'lodash';
import moment from 'moment';
let face = require('@/assets/images/device/face.png');
let car = require('@/assets/images/device/car.png');

// 地图操作
const mixins = {
    data: function () {
        return {
            disableTocase: false, // 禁用提交审批按钮
            isTaskManage: false, // 是否任务管理
            dataCaseInfo: {}, // 按事件信息
            caselng: '', // 案发经度
            caselat: '', // 案发纬度
            isshowTargetImg: false, // 是否打开以图搜图
            pointList: [], // 当前显示的所有点位信息
            styleOptions: {
                strokeColor: 'red', // 边线颜色。
                fillColor: 'rgba(255,0,0,.3)', // 填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3, // 边线的宽度，以像素为单位。
                strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
                fillOpacity: 0.6, // 填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' // 边线的样式，solid或dashed。
            },
            DialogVisible1: false, // 关联设备
            DialogVisible8: false, // 附件
            DialogVisible12: false, // 新增案发点
            DialogVisible13: false, // 新增点位
            DialogVisible14: false,
            videoNum: false,
            skynetNum: false,
            openaccess: false, // 打开附件上传
            isdelete: false, // 是否删除
            markers: [], // 存放案发地点的坐标
            caseUuid: '',
            righttext: '新增案发点',
            hotspotId: '', // 案发点ID
            index: null, // 图片的索引
            deviceUuid: '',
            tree1: [],
            tree4: [],
            tree5: [],
            tree6: [],
            tree8: [],
            edit: false,
            lableList: [],
            isvideoval: false,
            isImgclue: false,
            isretriev: false, // 是否任务详情
            isgather: false,
            isPersonMan: false, // 侦查人员
            iscommandMen: false, // 是否是指挥人员
            suspicionUuids: '',
            suspicionList: [], // 嫌疑人目标列表
            SuspicionObjList: [],
            caseMessageObj: [],
            isVideo: false, // 是否为视频
            spaceVideoArrowFlag: 1, // 视频列表的显示状态
            spacePointArrowFlag: 1, // 点位切换
            treeData: [], // 存放设备点位信息数据
            firstPoint: '',
            twoPonit: '',
            isRightClick: true, // 点位是否可右击
            teamData: [],
            showJudege: false, // 显示研判目标
            pointCrime: '新增案发点',
            videoFiles: [], // 右键新增视频线索
            showSubmit: false, // 案件提交的显示隐藏
            is3DEmpty: true, // 特征是否为空
            suspicionType: '',
            Dialog3D: false,
            isUpdate: 1,
            showcase: true,
            showTwocase: true,
            caseInfom: false,
            mysynergy: false,
            myUploadTo: false,
            timer: '',
            imgWrapLeft: 0, // 点位菜单图片的left值
            showtemp: false, // 显示临时点位的信息
            listData: [], // 所有点位的信息
            listType: '', // 点位类型
            listlng: '',
            listlat: '',
            listName: '',
            addtype: '临时', // 详情还是临时的类型
            showlng: false,
            showlat: false,
            isofflineVideo: false, // 打开临时点的视频播放窗口
            istemporary: false, // 是否打开固化
            ptlng: '', // 修改点位的经度
            palat: '', // 修改点位的维度
            pTinfo: {}, // 点位信息
            ptType: '', // 修改类型
            isfileupload: false,
            isopenimg: false, // 是否打开图片
            lableImgList: [], // 查询点位下面的标注图片集合
            isskyNet: false,
            istargetsus: false, // 是否打开嫌疑目标
            specialCase: false,
            isCaseInfos: false, // 是否打开案件信息
            issyncase: false,
            disableUpload: false,
            mycase: false,
            editmycase: false,
            addmycase: false,
            showsyn: false,
            markId: '',
            showDataCell: false,
            openmegerCase: false,
            caseMarkNum: 1, // 列表分页的查询
            caseMarkTotal: 100,
            showclomn: 1, // 1表示实战平台 2 一级案件库 3 二级案件库
            showLibraryFlag: 0, // 0表示没有涉案视频 1 一级案件库 2 二级案件库
            showVideoStruct: true, // 结构化打开
            zkyStructureSwitch: false, // 中科院结构化
            loading: null,
            showmap: false,
            isTrajectory: false,
            menu: null, // 地图右键菜单
            showmarkImg: false,
            isclick: false, // 是否连续点击
            isvideostruc: false, // 是否打开视频结构化
            fastType: '0',
            targetType: [ // 目标类型：
                {
                    value: '0',
                    label: '快'
                },
                {
                    value: '1',
                    label: '慢'
                }
            ],
            secondHand: 0,
            equipmentTime: false,
            compareTime: true,
            DialogVisible15: false, // 设备校时
            offset: 0, // 设备校时
            showInteger: false,
            fastSlow: '',
            isonline: false, // 是否是天网
            showSearchImg: false, // 是否打开以图搜图
            slidePic: [],
            showSearchTrack: false, // 是否打开轨迹列表
            skynetFlag: null, // 显示下方的以图搜图的页面
            spaceSkyArrow: false,
            stickList: [],
            deviceList: [], // 传deviceUuid过去
            showarrPoisArr: false, // 轨迹图片的隐藏和显示
            showtask: false, // 是否打开任务管理
            gosearchtype: 0,
            iszoom: false,
            showdeleteLine: false, // 是否显示删除以图搜图的轨迹点击功能
            isactive: null,
            beginmove: false, // 开始移动案发点以及信息点
            defaultText: '轨迹编辑',
            isvideoStick: '', // 置顶索引
            extra: '', // 新增临时点和详情点位的提示
            SuspicionObjSizeList: [],
            sizeIndex: 0,
            mouseFlag: false,
            ReleaseTaskContent: '', // 即将发布的内容
            trueName: '', // 真实姓名
            // 图片格式检查范围
            imgCheck: {
                accept: 'image/gif, image/jpeg, image/png, image/jpg, image/bmp'
            },

            // 视频格式检查范围
            videoCheck: {
                accept: 'video/mp4, video/rmvb, video/avi, video/ts, video/mov, video/mkv, video/f4v, video/mpg, video/flv, video/wmv, video/x-ms-wmv'
            },
            friendPhotoUrl: null,
            taskUuid: '', // 当前检索或者结构化任务的ID
            isopenStrus: false, // 是否打开结构化结果
            isOpenDetail: false, // 打开当前的检索页面
            flagIdx: 0,
            initPicSelect: [],
            deviceSelectId: [],
            initSelectList: [],
            showvideoPlay: false, // 视频播放的页面
            imgshow: false, // 播放器控制按钮的优化
            getVideotime: null,
            timeFrag: null,
            showhandword: false, // 打开标注页面的功能
            exportPicList: [], //导出时拿到的数据
            showAllTarget: false,
            showAllTargetZky: false, // zky
            warnFlag: false,
            exportloading: null,
            markersAll: [],
            markerCaseAll: [],
            tabsParams: [
                '临时点', '信息点', '案发点', '天网点', '社会面点'
            ],
            nowIndex: 0,
            pointDataList: [{
                    cameraName: '临时点',
                    children: []
                }, {
                    cameraName: '信息点',
                    children: []
                }, {
                    cameraName: '案发点',
                    children: []
                }, {
                    cameraName: '天网点',
                    children: []
                }, {
                    cameraName: '社会面点',
                    children: []
                },
                {
                    cameraName: '卡口点',
                    children: []
                },

            ],
            defaultProps: {
                children: 'children',
                label: 'cameraName'
            },
            pointInfoList: [],
            seeConvertList: [],
            warnType: true,
            uniqArr: [],
            timerFridend: '', // 清空朋友圈定时器
            pointName: '',
            exportSusNum: 0, //导出卷宗的时候嫌疑目标的长度
            exportImgList: [], //导出卷宗的时候嫌疑目标的长度
            trackSee: '', //判断折叠的时候是否调用closeSearchImg里的方法
            isDisableClick: false,
            imeiVisibleDialog: false,
            excelVisibleDialog: false,
            showPhoneTrack: false, // 是否显示碰撞轨迹
            range: 300, // 电围距离
            isCancle: false, //设备关联取消选中的取消按钮
            ranges: 300,
            markerOrigin: '',
            lineDdd: [],
            markCcc: [],
            isTask: false,
            locusData: [], // 碰撞手机轨迹数据
            allTrackData: [], // 所有轨迹数据
            markerSign: '',
            isDoubleClick: false, //是否多次点击
            isloadTrue: false, //代表案件列表接口是否加载完成
            rangeList: [], //以图搜图时最终框选的所有点位
            isopenAddkakouPoint: true, //是否放开卡口点位，从后端获取的
            openbayonet: false, //打开新增卡口点
            alldeviceList: [],
            openlable: false,
            checklable: '0',
            openlablecollide: false, // 打开轨迹碰撞
            labelcollidedeviceList: [], //标注碰撞的点位list
            SuspicionObjLists: [],
            showSearchCarImg: false, //以车搜车
            deskPoint: {},
            fast: {}, //test
            drawingManager: null,
            electricData: {}, // 嫌疑目标下拉碰撞手机轨迹数据
            picTrackDate: {}, // 以图搜图碰撞手机轨迹数据

            showGlobalCase:false,//是否打开全局案件
            showGlobalRetrieve:false,//是否打开全局检索
        };
    },
    filters: {
        getDatetime(val) {
            // if(val.offset != undefined){
            // 当前改成把标准时间改成时间搓+目标出现时间毫秒+offset秒数*1000
            if (val.offset == '' || val.offset == null || val.offset == undefined) {
                val.offset = 0;
            }
            let nowplaytime
            if (val.searchFlag != undefined && val.searchFlag == 2) {
                nowplaytime = 0;
            } else {
                nowplaytime = new Date(val.fileStartTime).getTime();
            }
            let alltime = Number(nowplaytime) + Number(val.appearTime) + Number(val.offset * 1000);
            let date = new Date(alltime);
            let YY = date.getFullYear();
            let MM = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
            // }
        },
        pointName(val) {
            if (val == 5) {
                return "临时点"
            } else if (val == 6) {
                return "信息点"
            } else if (val == 8) {
                return "卡口点"
            }
        },
        substr(val) {
            return val.substr(0, val.length - 1)
        }

    },
    created() {
        this.trueName = this.$storage.getSession('userInfo').trueName;
        this.MsgUserName = this.$storage.getSession('userInfo').userName;
        this.showVideoStruct = sessionStorage.getItem('glstStructureSwitch'); //是否是glst的
        this.zkyStructureSwitch = sessionStorage.getItem('zkyStructureSwitch'); //是否是zky的
        this.showclomn = sessionStorage.getItem('currentDeploymentType');
        this.showLibraryFlag = sessionStorage.getItem('caseVideoLibraryFlag');
        this.showtask = this.$route.query.showtask;
        this.isTaskManage = this.$route.query.synergyCombat;
        this.caseUuid = this.$route.query.caseUuid;
        this.edit = this.$route.query.edit;
        this.synergyCombat = this.$route.query.synergyCombat;
        this.myUploadTo = this.$route.query.myUploadTo;
        this.caseInfom = this.$route.query.caseInfom;
        // if(this.synergyCombat) this.istuJudge = true;
        this.mysynergy = this.$route.query.mysynergy;
        this.showcase = this.$route.query.showcase;
        this.showTwocase = this.$route.query.showTwocase;
        this.specialCase = this.$route.query.specialCase;
        this.mycase = this.$route.query.mycase;
        this.editmycase = this.$route.query.editmycase;
        this.addmycase = this.$route.query.addmycase;
        //调用后端接口，来确认卡口数据上传是否启用
        this.isopenAddkakouPointUpload()
        // 进入页面查询嫌疑人目标列表
        this.getSuspicionMessage('clear');
    },
    mounted() {
        this.showmap = true;
        this.$nextTick(() => {
            // 初始化可见地图
            this.InitMainMap('mapContent');
            // 初始化不可见地图（）
            this.InitHideMainMap('hideMapContent');
        });
        this.ajaxCaseInfo();
        this.setglstfeature({});
        this.trajectoryList()
    },
    destroyed() {
        this.settargetToSearchImg({});
        this.setshowjudged(false);
        clearInterval(this.timer);
        clearInterval(this.timerFridend);
        clearInterval(this.getVideotime);
        clearInterval(this.timeFrag);
    },

    directives: {
        focus(el) {
            el.focus();
        }
    },
    watch: {
        DialogVisible13(val) {
            if (val) {
                this.extra = '';
                this.fastType = '0';
                this.secondHand = 0;
            }
        },
        pointList: {
            handler(val, oldval) {
                this.pointDataList = [{
                        cameraName: '临时点',
                        children: []
                    }, {
                        cameraName: '信息点',
                        children: []
                    }, {
                        cameraName: '案发点',
                        children: []
                    }, {
                        cameraName: '天网点',
                        children: []
                    }, {
                        cameraName: '社会面点',
                        children: []
                    },
                    {
                        cameraName: '卡口点',
                        children: []
                    }
                ];
                if (this.dataCaseInfo.latitude != undefined || this.dataCaseInfo.longitude != undefined) {
                    let aaa = this.dataCaseInfo;
                    aaa.cameraName = '案发点';
                    this.pointDataList[2].children.push(aaa);
                }
                if (val.length) {
                    for (let i = 0; i < val.length; i++) {
                        if (val[i].cameraType == 5) {
                            this.pointDataList[0].children.push(val[i]);
                        }
                        if (val[i].cameraType == 6) {
                            this.pointDataList[1].children.push(val[i]);
                        }
                        if (val[i].cameraType == 4) {
                            this.pointDataList[4].children.push(val[i]);
                        }
                        if (val[i].cameraType == 1) {
                            this.pointDataList[3].children.push(val[i]);
                        }
                        if (val[i].cameraType == 8) {
                            this.pointDataList[5].children.push(val[i])
                        }
                    }
                } else {}
            },
            deep: true
        },
        pointName(val) {
            this.$refs.tree.filter(val);
        },
        mapInfoList: {
            handler(val) {
                if (val.length) {
                    if (val[0].regionHeight) {
                        for (let i = 0; i < val.length; i++) {
                            let imgs = new Image();
                            imgs.onload = function () {
                                let imgage = document.getElementById('carsImg' + i)
                                let imgBox = document.getElementById("searchsmallImg"); //div大小
                                let leftTopX = val[i].regionLeft; //目标相对图片的横坐标
                                let leftTopY = val[i].regionTop; //目标相对图片的纵坐标
                                let imgw = val[i].regionWidth; //目标相对图片的宽度
                                let imgh = val[i].regionHeight; //目标相对图片高度
                                let retw = 68; //div的实际宽度
                                let reth = 80; //div的实际高度
                                let unit = 1; //图片和div的默认比例
                                let posLeft = 0;
                                let posTop = 0;
                                //通过图片宽高比以及图片的实际比计算出人物的比率
                                if (retw / reth < imgw / imgh) {
                                    unit = imgw / retw;
                                    // posLeft = 0;
                                    // posTop = (reth - imgh/unit)/2;
                                } else {
                                    unit = imgh / reth;
                                    // posTop = 0;
                                    // posLeft = (retw - imgw/unit)/2;
                                }
                                //通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
                                imgage.style.width = imgs.naturalWidth / unit + "px";
                                imgage.style.height = imgs.naturalHeight / unit + "px";
                                imgage.style.top = -(leftTopY / unit) + posTop + "px";
                                imgage.style.left = -(leftTopX / unit) + posLeft + "px";
                            }
                            imgs.src = val[i].sourceImgUrl
                        }
                    }

                }
            },
            deep: true
        },
        checkMarkList: {
            handler(val) {
                setTimeout(() => {
                    if (val.length) {
                        if (val[0].regionHeight) {
                            for (let i = 0; i < val.length; i++) {
                                let imgs = new Image();
                                imgs.onload = function () {
                                    let imgage = document.getElementById('searchcarBlock' + i)
                                    let imgBox = document.getElementById("frameVideo"); //div大小
                                    // let imgBox = document.getElementById("markVideo"); //div大小
                                    let leftTopX = val[i].regionLeft; //目标相对图片的横坐标
                                    let leftTopY = val[i].regionTop; //目标相对图片的纵坐标
                                    let imgw = val[i].regionWidth; //目标相对图片的宽度
                                    let imgh = val[i].regionHeight; //目标相对图片高度
                                    let retw = imgBox.clientWidth; //div的实际宽度
                                    let reth = imgBox.clientHeight; //div的实际高度
                                    let unit = 1; //图片和div的默认比例
                                    let posLeft = 0;
                                    let posTop = 0;
                                    //通过图片宽高比以及图片的实际比计算出人物的比率
                                    if (retw / reth < imgw / imgh) {
                                        unit = imgw / retw;
                                    } else {
                                        unit = imgh / reth;
                                    }
                                    //通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
                                    imgage.style.width = imgs.width / unit + "px";
                                    imgage.style.height = imgs.height / unit + "px";
                                    imgage.style.top = -(leftTopY / unit) + posTop + "px";
                                    imgage.style.left = -(leftTopX / unit) + posLeft + "px";
                                }
                                imgs.src = val[i].sourceImgUrl
                            }
                        }

                    }
                }, 500)
            },
            deep: true
        },
    },
    computed: {
        ...mapGetters([
            'targetToSearchImg', // 传过来的以图搜图的对象
            'targetToSearchImgCar', //以车搜车的对象
            'targetToOenStrus', // 打开当前结构化的ID
        ]),
    },
    methods: {
        //刷新地图方法
        initAll() {
            this.InitMainMap('mapContent');
            if (this.searchImg) {
                this.closeSearchImg();
            } else if (this.showSearchCarImg) {
                this.closeSearchCarImg();
            } else {
                this.ajaxCaseInfo();
            }
            this.clearSuspic()
        },
        ...mapMutations([
            "settargetToSearchImgCar"
        ]),
        isopenAddkakouPointUpload() {
            // this.$http.get("url").then(()=>{
            //     if(res.data.code == 200){
            //         this.isopenAddkakouPoint = res.data.data;
            //         sessionStorage.setItem("isopenAddkakouPoint",this.isopenAddkakouPoint)
            sessionStorage.setItem('isopenAddkakouPoint', true)
            //     }
            // })
        },

        // 子父组件传值,判断嫌疑目标轨迹图片是否显示
        isShowTrajectoryArr(val) {
            this.isTrajectory = val;
        },
        // 导出轨迹截取方法
        cutTrack() {
            this.loading = this.$loading({
                lock: true,
                background: 'rgba(255,255,255,0.4)',
                text: '导出中...'
            });
            //获取隐藏地图
            var containner = document.getElementById('mainmap');
            //获取隐藏地图
            var treeElem = document.getElementById('mapContent');
            //克隆一份隐藏地图，然后在克隆的地图上进行操作
            var tempElem = treeElem.cloneNode(true);
            tempElem.id = 'temp-tree';
            tempElem.className = 'fff';
            tempElem.style.width = treeElem.clientWidth + 'px';
            tempElem.style.height = treeElem.clientHeight + 'px';
            containner.appendChild(tempElem);
            // svg元素需特殊处理
            var svgElem = tempElem.querySelectorAll('svg');
            svgElem.forEach((node) => {
                // 移除百度初始化svg元素的自定义属性x和y坐标，这一点很重要，不然元素不会显示
                node.removeAttribute('x');
                node.removeAttribute('y');

                var parentNode = node.parentNode;
                var svg = node.outerHTML.trim();
                var canvas = document.createElement('canvas');
                canvg(canvas, svg);
                canvas.style.zIndex = 250;
                if (node.style.position) {
                    canvas.style.position += node.style.position;
                    canvas.style.left += node.style.left;
                    canvas.style.top += node.style.top;
                }
                parentNode.removeChild(node);
                parentNode.appendChild(canvas);
            });
            // html2canvas插件方法，元素转canvas
            setTimeout(() => {
                html2canvas(tempElem, {
                    useCORS: true,
                    async: true
                }).then(canvas => {
                    var base64Codes = canvas.toDataURL("image/png")
                    let files = this.dataURLtoBlob(base64Codes);
                    let formData = new FormData();
                    let file = new File([files], new Date().getTime() + '.jpg');
                    formData.append('files', file);
                    this.$http({
                        url: '/sms/uploadFile/upload',
                        method: 'post',
                        data: formData
                    }).then(res => {
                        this.dounLoadUrl(res.data.data[0]) // 调用下载跨域方法
                    })
                }).catch(() => {
                    this.loading.close()
                })
            }, 500)
        },

        dounLoadUrl(url) { //下载跨域图片
            //canvans下载
            let src = url;
            var canvas = document.createElement('canvas');
            var img = document.createElement('img');
            img.onload = (e) => {
                canvas.width = img.width;
                canvas.height = img.height;
                var context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, img.width, img.height);
                canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
                canvas.toBlob((blob) => {
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = 'pic';
                    link.click(); // 触发点击事件下载image/jpeg
                    this.loading.close()
                }, "image/jpeg");
            }
            img.setAttribute("crossOrigin", 'Anonymous');
            img.src = src;
        },

        // 进入页面获取点位信息
        ajaxTree() {
            // 重置地图
            this.map.clearOverlays(); // 移除点位信息，然后重新加载
            let data = {
                caseUuid: this.caseUuid
            };
            this.$http.get('pca/casemng/device/rel/query', {
                    params: data
                })
                .then((res) => {
                    let data = [];
                    this.listData = [];
                    this.pointList = res.data.data;
                    this.pointInfoList = this.pointList;
                    this.newpoints = res.data.data;
                    data = this.getfoundLabelList(res.data.data)
                    this.listData = data
                    // this.exportToData(this.suspicionList);
                    // 在  foundLabel  函数里添加一个参数‘轨迹’，用来判断轨迹列表查询轨迹展示的点位是否还可以点击显示菜单操作
                    this.foundLabel(data, 1, '轨迹');
                    this.deskPoint = this.dataCaseInfo;
                    this.caseLabel(this.dataCaseInfo.longitude, this.dataCaseInfo.latitude, true);
                });
        },
        //清空以车搜车轨迹，嫌疑人轨迹，还有设置在vuex里面的以车搜车的数据，
        clearSuspic() {
            this.spaceVideoArrowFlag = 1
            this.skynetFlag = null
            this.suspicionUuids = "";
            this.checkMarkList = []
            this.showPhoneTrack = false
            this.settargetToSearchImgCar({});
        },
        // change嫌疑人目标下拉框
        changeSuspicionObj(val, isfistTrue, isCloseFlag) {
            this.showtrack = false
            this.openPolyNavigation = false
            this.suschangeradio = 1
            this.pointName = '';
            this.showarrPoisArr = false;
            if (isCloseFlag) {
                this.showPhoneTrack = true;
            }
            this.runSearchList = [];
            this.caseMarkNum = 1;
            this.mapInfoList = []
            this.opentrackpoly = false
            if (this.suspicionUuids == '') {
                this.warningData(this.suspicionList);
            }
            this.currentSuspicionUuid = val;
            this.defaultText = '轨迹编辑';
            this.isVideo = false;
            this.trajectoryArr = [];
            if (!val) {
                this.isTrajectory = false;
                this.is3DEmpty = true;
            } else {
                this.isTrajectory = true;
                this.is3DEmpty = false;
            }
            this.showProgreesFlag = false;
            this.showProgreesArr = [];
            this.progreesArr = [];
            this.closeSearchImg();
            this.closeSearchCarImg();
            this.$http({
                url: 'pca/casemng/suspicion/details',
                method: 'get',
                params: {
                    suspicionUuid: this.suspicionUuids
                }
            }).then(res => {
                if (res.data.code == 200) {
                    clearInterval(this.timer);
                    // 表示有嫌疑目标
                    if (res.data.data != null) {
                        this.map.clearOverlays();
                        this.suspicionType = res.data.data.suspicionType;
                        this.currentSpeed = res.data.data.speed;
                        this.ajaxTree(res.data.data.suspicionUuid);
                        this.polylineObj = null
                        this.getlats(res.data.data.suspicionUuid, res.data.data.speed, isfistTrue);
                    } else {
                        this.map.clearOverlays();
                        this.ajaxTree();
                    }
                    this.getLableList();
                    this.getallLableList()
                    if (this.suspicionUuids) {
                        this.suspicionUuid3D();
                    }
                }
            });
        },
        // 绘制矩形
        drawReact: function (data) {
            /** drawingManager.setDrawingMode()可以接受的参数
             *
             * BMAP_DRAWING_MARKER 画点
             BMAP_DRAWING_CIRCLE 画圆
             BMAP_DRAWING_POLYLINE 画线
             BMAP_DRAWING_POLYGON 画多边形
             BMAP_DRAWING_RECTANGLE 画矩形
             */
            this.rangeList = [];
            this.deviceList = [];
            this.iszoom = false;
            let _this = this;
            this.drawingManager = new BMapLib.DrawingManager(this.map, {});
            this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE); // 设置模式
            this.drawingManager.rectangleOptions = this.styleOptions;
            this.drawingManager.open(); // 开启绘图
            this.drawingManager.addEventListener('rectanglecomplete', function (e, overlay) {
                _this.rectanglecomplete(e, data);
            });
        },
        // 矩形绘制完成后的回调
        rectanglecomplete: function (e, data) {
            // this.rangeList = [];
            // this.deviceList = [];
            // this.drawingManager.close()
            let leftTopPoint = e.to[0]; // 矩形框左上角的点
            let rightBottomPoint = e.to[2]; // 矩形框右下角的点
            this.gosearchtype = 1;
            // let leftTopPoint = e.getBounds().getNorthEast(); //矩形框左上角的点
            // let rightBottomPoint = e.getBounds().getSouthWest(); //矩形框右下角的点
            this.newpoints = data

            // 通过矩形的左上角的点一级右下角的点来判断不同的方法
            // 如果矩形的左上经度小于右下角经度，并且左纬度大于右纬度  左上下
            if (leftTopPoint['lng'] < rightBottomPoint['lng'] && leftTopPoint['lat'] > rightBottomPoint['lat']) {
                for (let i = 0; i < this.newpoints.length; i++) {
                    let point = this.newpoints[i];
                    if (leftTopPoint['lng'] < point['longitude'] && leftTopPoint['lat'] > point['latitude'] &&
                        rightBottomPoint['lng'] > point['longitude'] && rightBottomPoint['lat'] < point['latitude']) {
                        this.deviceList.push(point.deviceUuid);
                    }
                }
            } else if (leftTopPoint['lng'] < rightBottomPoint['lng'] && leftTopPoint['lat'] < rightBottomPoint['lat']) {
                // 如果矩形的左上经度小于右下角经度，并且左纬度小于右纬度  左下上
                for (let i = 0; i < this.newpoints.length; i++) {
                    let point = this.newpoints[i];
                    if (leftTopPoint['lng'] < point['longitude'] && leftTopPoint['lat'] < point['latitude'] &&
                        rightBottomPoint['lng'] > point['longitude'] && rightBottomPoint['lat'] > point['latitude']) {
                        this.deviceList.push(point.deviceUuid);
                    }
                }
            } else if (leftTopPoint['lng'] > rightBottomPoint['lng'] && leftTopPoint['lat'] < rightBottomPoint['lat']) {
                // 如果矩形的左上经度大于右下角经度，并且左纬度小于右纬度
                for (let i = 0; i < this.newpoints.length; i++) {
                    let point = this.newpoints[i];
                    if (leftTopPoint['lng'] > point['longitude'] && leftTopPoint['lat'] < point['latitude'] &&
                        rightBottomPoint['lng'] < point['longitude'] && rightBottomPoint['lat'] > point['latitude']) {
                        this.deviceList.push(point.deviceUuid);
                    }
                }
            } else if (leftTopPoint['lng'] > rightBottomPoint['lng'] && leftTopPoint['lat'] > rightBottomPoint['lat']) {
                // 如果矩形的左上经度大于右下角经度，并且左纬度小于右纬度
                for (let i = 0; i < this.newpoints.length; i++) {
                    let point = this.newpoints[i];
                    if (leftTopPoint['lng'] > point['longitude'] && leftTopPoint['lat'] > point['latitude'] &&
                        rightBottomPoint['lng'] < point['longitude'] && rightBottomPoint['lat'] < point['latitude']) {
                        this.deviceList.push(point.deviceUuid);
                    }
                }
            }
            if (this.deviceList.length) {
                let scopeList = this.rangeList.concat(this.deviceList)
                this.rangeList = _.uniq(scopeList)
            }
        },
        clearDrawing(type) {
            this.map.clearOverlays();
            this.deviceList = [];
            this.mapInfoList = []
            this.rangeList = [];
            this.gosearchtype = 0;
            if (!type) {
                setTimeout(() => {
                    this.ajaxTree();
                }, 100);
            }
            this.searchRunAllList = [];
            this.showarrPoisArr = false
            this.skynetFlag = null;
            this.spaceSkyArrow = false
            this.spaceVideoArrowFlag = 1;
            this.drawingManager = null
        },
        // 打开任务管理
        openretriev() {
            let data = {
                type: 0
            };
            this.settargetToSearchImg(data);
            this.setstrusResult({});
            this.isretriev = true;
        },
        //打开卡口上传
        openUploadbayonet() {
            this.openbayonet = true;
        },
        childBybayonet(val) {
            this.openbayonet = val;
        },
        // 打开imei数据汇总
        openImeiHandler() {
            this.imeiVisibleDialog = true
        },
        exportImeiData() {
            this.excelVisibleDialog = true
        },
        childByValue(childValue) {
            this.isvideoval = childValue;
        },
        childByimg(childValue, state) {
            this.isImgclue = childValue;
            if (state) {
                this.getSuspicionMessage('clear');
            }
        },
        // 并案
        openmeger() {
            this.openmegerCase = true;
        },
        childbymeger(val) {
            this.openmegerCase = val;
        },
        // 结构化结果监听
        childByStrus(val) {
            if (this.suspicionUuids) {
                this.changeSuspicionObj(this.suspicionUuids)
            }
            this.isopenStrus = val;
            setTimeout(() => {
                if (this.targetToOenStrus == 2) {
                    this.showSearchImg = true;
                    this.drag();
                }
            }, 300);
            this.getLableList();
        },

        // 关闭离线视频采集
        childByDataCell(val, title) {
            this.showDataCell = val;
            this.getLableList();
            this.changeSuspicionObj(this.suspicionUuids)
        },
        // 关闭附件上传
        childByaccess(val) {
            this.openaccess = val;
        },
        childBytask(childValue) {
            this.isTask = childValue;
        },
        childByTaskMan(val) {
            this.isretriev = val;
            this.getLableList();
        },
        taskmanstrus(val) {
            this.isretriev = val;
            this.showSearchImg = true;
            this.drag();
        },
        // 检索结果跳转到以图搜图并传图片
        taskretrieval(val) {
            this.isretriev = false;
            this.showSearchImg = false;
            this.isshowTargetImg = false;
            this.childsearchImgBtn(); // 调用以图搜图方法
        },
        childBygather(val) {
            this.isgather = val;
        },
        childByOpen(val) {
            this.isPersonMan = val;
            this.showtask = false;
        },
        childbyJud(val) {
            this.showJudege = val;
            this.getLableList();
        },
        childvideo(val) {
            this.videoNum = val;
        },
        // 视频结构化传值
        childskynet(val) {
            this.skynetNum = val;
        },
        // 轨迹列表
        saveTrack(val) {
            this.showSearchTrack = val;
            this.getSuspicionMessage()
        },
        // 关闭碰撞轨迹页面
        isPhoneTrack(val, data) {
            this.showPhoneTrack = val; // 是否打开开关
            this.picTrackDate = data
        },
        // 判断碰撞轨迹页面是否打开
        emitPhoneTrack(val) {
            this.showPhoneTrack = val
        },
        // 绑定imsi码判断是否显示轨迹
        isOpenTrack() {
            if (!this.locusData.length) {
                if (this.lineDdd.length) { // 点击时看画线是否有长度，如有长度清空数据
                    for (let i = 0; i < this.lineDdd.length; i++) {
                        this.map.removeOverlay(this.lineDdd[i]);
                    }
                    this.lineDdd = []
                }
                if (this.markCcc.length) { // 点击时清空之前数据
                    for (let i = 0; i < this.markCcc.length; i++) {
                        this.map.removeOverlay(this.markCcc[i]);
                    }
                    this.markCcc = []
                }
                this.map.removeOverlay(this.markerSign); //清除mark
                this.map.removeOverlay(this.markerOrigin); //清除起点和终点
            }
        },
        resetTrack(val) {
            this.showBound = val
        },
        // 给重置按钮的方法
        resetCount(val) {
            if (!val) {
                this.$refs.childCountList.emptyData()
            }
        },
        //  轨迹碰手机传值
        childByTrack(val, num) {
            if (this.lineDdd.length) { // 点击时清空之前数据
                for (let i = 0; i < this.lineDdd.length; i++) {
                    this.map.removeOverlay(this.lineDdd[i]);
                }
                this.lineDdd = []
            }
            if (this.markCcc.length) { // 点击时清空之前数据
                for (let i = 0; i < this.markCcc.length; i++) {
                    this.map.removeOverlay(this.markCcc[i]);
                }
                this.markCcc = []
            }
            this.map.removeOverlay(this.markerOrigin); // 清除起点和终点
            // 监听鼠标拖动后离开线
            let allspot = []
            if (num == 1) { //点击碰轨迹传的标识符
                allspot = val.latAndlng
            } else {
                allspot = val // 嫌疑目标下拉
            }
            var pt = []
            var myIcon = new BMap.Icon(face, new BMap.Size(33, 36), {});
            var choseIcon = new BMap.Icon(car, new BMap.Size(33, 36), {});
            // 添加marker
            for (let i = 0; i < allspot.length; i++) {
                var label = new BMap.Label(allspot[i].name, {
                    offset: new BMap.Size(10, 32)
                });
                pt = new BMap.Point(allspot[i].longitude, allspot[i].latitude)
                if (allspot[i].flag) { // 根据标识符判断是否重合显示画线标志
                    this.markerSign = new BMap.Marker(pt, {
                        offset: new BMap.Size(0, -20),
                        icon: myIcon
                    });
                } else {
                    this.markerSign = new BMap.Marker(pt, {
                        offset: new BMap.Size(0, -20),
                        icon: choseIcon
                    });
                }
                this.markerSign.setLabel(label);
                this.markCcc.push(this.markerSign) // 存储mark数据
                this.map.addOverlay(this.markerSign); //添加mark
            };
            // 数据转换
            let ccc = ((q) => {
                let f = 0,
                    r = [];
                for (; ++f < q.length;)
                    r.push([q[f - 1], q[f]])
                return r
            })
            let newArr2 = ccc(allspot)
            let lineColor = ""
            for (let i = 0; i < newArr2.length; i++) { // 循环获取经纬度连线
                let arrPois = []
                if (newArr2[i][0].longitude == newArr2[i][1].longitude && newArr2[i][0].latitude == newArr2[i][1].latitude) {
                    newArr2[i][0].longitude = newArr2[i][0].longitude + Math.random() / 10000
                }
                arrPois.push(new BMap.Point(newArr2[i][0].longitude, newArr2[i][0].latitude));
                arrPois.push(new BMap.Point(newArr2[i][1].longitude, newArr2[i][1].latitude));
                if (newArr2[i][0].flag && newArr2[i][1].flag) { //根据标识符判断线段色调
                    lineColor = "red";
                } else {
                    lineColor = "green";
                }
                let icons = new BMap.IconSequence(
                    new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, { // 设置线段宽度图标颜色
                        scale: 0.6, //图标缩放大小
                        strokeWeight: "2", //图标宽度
                        strokeColor: "white" //图标颜色
                    }), '1%', '50%', false
                )
                let polylineLy = new BMap.Polyline(
                    arrPois, //所有的GPS坐标点
                    {
                        strokeColor: lineColor, // 线段颜色
                        icons: [icons],
                        strokeWeight: 6, //线路大小
                        strokeOpacity: 0.5
                    });
                this.lineDdd.push(polylineLy)
                this.map.addOverlay(polylineLy);
            }
            // 原数据过滤取经纬度
            let lonList = []
            if (num == 1) {
                // 碰撞轨迹打开的页面
                for (let i = 0; i < val.latAndlng.length; i++) { // 获取经纬度
                    lonList.push(new BMap.Point(val.latAndlng[i].longitude, val.latAndlng[i].latitude));
                }
            } else { //切换嫌疑目标打开的页面
                for (let i = 0; i < val.length; i++) { // 获取经纬度
                    lonList.push(new BMap.Point(val[i].longitude, val[i].latitude));
                }
            }
            let markerOriginStart = new BMap.Marker(lonList[0]); //起点marker
            let iconc = new BMap.Icon("/static/images/start.png", new BMap.Size(40, 34), {
                offset: new BMap.Size(5, 5),
                imageOffset: new BMap.Size(5, 10),
            }); //地点图标
            markerOriginStart.setIcon(iconc); //设置起点图标
            markerOriginStart.setTop(true);
            this.markCcc.push(markerOriginStart) // 添加起点数据
            this.map.addOverlay(markerOriginStart); //将标记添加到地图中
            this.markerOrigin = new BMap.Marker(lonList[lonList.length - 1]); //终点marker
            iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34), {
                offset: new BMap.Size(5, 5),
                imageOffset: new BMap.Size(5, 10),
            }); //终点icon
            setTimeout(() => {
                if (this.trajectoryArr.length > 0) {
                    for (let i = 0; i < this.trajectoryArr.length; i++) {
                        let getLongitude = this.trajectoryArr[i].longitude // 获取经度
                        let getLatitude = this.trajectoryArr[i].latitude // 获取纬度
                        this.zuobiao2Pixels(getLongitude, getLatitude, i)
                    }
                }
            }, 500)
            let cc = this.trajectoryArr.concat(allspot) // 下拉的数据和点击当前那行的碰撞手机轨迹数据
            this.markerOrigin.setIcon(iconc); //设置终点图标
            this.markerOrigin.setTop(true);
            this.markCcc.push(this.markerOrigin) // 添加终点数据
            this.map.addOverlay(this.markerOrigin); //将标记添加到地图中
            this.setZoom(cc, this.map) // 设置当前地图层级
        },
        // 点击识别出来的图片之后的操作
        childByClick() {
            this.spaceVideoArrowFlag = 2;
            this.spacePointArrowFlag = 2;
        },
        // 关闭以图搜图的方法，并打开模态框
        childbycolse(val) {
            document.getElementById('spacePic').scrollLeft = 0;
            this.showSearchImg = val;
            this.searchRunAllList = [];
            this.slidePic = [];
            this.spaceSkyArrow = false
            this.spaceVideoArrowFlag = 1
            this.getSuspicionMessage()
            // 判断是否是嫌疑目标还是结构化跳转
            // type = 1 1是从嫌疑目标管理进去  2是案件库结构化中快速跳转， 3是任务管理中进去 4是从全局搜索进去的
            if (this.targetToSearchImg.type == '1') {
                this.istargetsus = true;
            } else if (this.targetToSearchImg.type == '2') {
                this.isopenStrus = true;
            } else if (this.targetToSearchImg.type == '3') {
                this.isretriev = true;
            } else if (this.targetToSearchImg.type == '4') {
                if (this.showVideoStruct == 'true') {
                    this.showAllTarget = true;
                } else if (this.zkyStructureSwitch == 'true') {
                    this.showAllTargetZky = true
                }
            }
            // this.showPhoneTrack =  false // 关闭碰撞手机
            this.spacePointArrowFlag = 1;
        },
        // 点击全局搜索的时候调用打开以图搜图的页面
        childbyopenSearchImg(val) {
            this.showSearchImg = true;
            this.drag();
        },
        // 点击以图搜图显示的marker点显示隐藏的轨迹
        showRunLine() {
            this.$refs.searchImg.markShowRunLine();
        },
        // 初次打开嫌疑目标赋值
        centerTag() {
            if (!this.isloadTrue) {
                this.$notify({
                    type: 'warning',
                    message: '正在加载！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            setTimeout(() => {
                let data = {
                    type: 0
                };
                this.settargetToSearchImg(data);
                this.istargetsus = true
                this.checkSearchLable()
            }, 200);
        },
        // 转换经纬度
        zuobiao2Pixel(trajectoryLongitude, trajectoryLatitude, index) {
            var point = new BMap.Point(trajectoryLongitude, trajectoryLatitude);
            var pixel = this.map.pointToPixel(point);
            this.$nextTick(() => {
                setTimeout(() => {
                    document.getElementById('strickPic' + index).style.left = (pixel.x - 15) + 'px';
                    document.getElementById('strickPic' + index).style.top = (pixel.y - 155) + 'px';
                }, 100)

            });
        },
        // 打开临时播放列表
        openOffline() {
            this.isofflineVideo = true;
            document.title = document.title + '.';
        },
        // 返回临时列表
        childByOffline(val) {
            this.getSuspicionMessage('state', this.suspicionUuids);
            if (this.suspicionUuids) {
                this.changeSuspicionObj(this.suspicionUuids)
            }

            this.isofflineVideo = val;
            document.title = document.title.split('.')[0];
        },
        // 打开固化功能
        opentemporary() {
            this.istemporary = true;
        },
        // 关闭固化
        childBytemps(val) {
            this.istemporary = val;
            this.ajaxTree();
            this.ajaxCaseInfo();
        },
        // 打开文件上传
        openupload() {

        },
        childbyfile(val) {
            this.isfileupload = val;
        },
        // 打开图片展示
        opentheimg() {
            if (this.showimgrul == '') {
                this.$notify({
                    type: 'warning',
                    message: '暂无数据！',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else {
                if (this.listType == 6 || this.listType == 7) {
                    this.lableImgList = [];
                } else {
                    this.u_imgrul = '';
                }
                this.isopenimg = true;
            }
        },

        // 打开天网
        openSkyNet() {
            this.isskyNet = true;
            document.title = document.title + '....';
        },
        childBySkynet(val) {
            this.isskyNet = val;
            if (this.suspicionUuids) {
                // 如果存在嫌疑uuid
                this.changeSuspicionObj(this.suspicionUuids);
                // 刷新嫌疑下拉框
                this.getSuspicionMessage('state', this.suspicionUuids);
            }
            this.getLableList();
        },
        // 关闭关联嫌疑目标
        childyTargetSus(val, val2) {
            this.polylineObj = null;
            this.trajectoryArr = [];
            this.isTrajectory = false;

            this.istargetsus = val;
            this.is3DEmpty = true;
            this.caseMarkNum = 1;

            // 判断关联嫌疑目标弹层关闭时是否有 suspicionUuids 存在,有就根据suspicionUuids重绘轨迹
            if (this.suspicionUuids) {
                // 如果存在嫌疑uuid
                this.changeSuspicionObj(this.suspicionUuids);
                // 刷新嫌疑下拉框
                this.getSuspicionMessage('state', this.suspicionUuids);
            } else {
                this.ajaxCaseInfo();
                this.getSuspicionMessage();
            }
        },

        // 嫌疑目标点击搜跳转以图搜图并显示图片
        childsearchImgBtn(val) {
            setTimeout(() => {
                this.opensearchImg();
                this.isshowTargetImg = true;
            }, 400);
        },

        // 关闭打开案件修改
        childbycaseInfo(val) {
            this.isCaseInfos = val;
            this.ajaxCaseInfo();
            this.getAllData();
        },

        childbycaseOnright() {
            setTimeout(() => {
                if (this.$commons.isEmpty(this.dataCaseInfo.latitude)) {
                    this.map.removeContextMenu(this.menu);
                    this.onRightMapFun(this.map);
                } else {
                    this.map.removeContextMenu(this.menu);
                    this.onRightMapFun1(this.map);
                }
            }, 200);
        },

        // 查询团队列表
        getAllData() {
            let data = {
                caseUuid: this.caseUuid,
                pageNum: 1,
                pageSize: 500,
                orderBy: 'create_time',
                orderType: 'desc'
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/synergyhandler/selectHandlerList', data).then(res => {
                if (res.data.code == 200) {
                    this.teamData = res.data.data.list;
                    var userId = this.$storage.getSession('userInfo').userId;
                    if (this.teamData.length) {
                        for (let i = 0; i < this.teamData.length; i++) {
                            if (this.teamData[i].distRole == 1 && (userId == this.teamData[i].user.userId)) {
                                this.isEditAnnounce = false;
                                this.isAnnounce = false;
                                return;
                            } else {
                                this.isAnnounce = true;
                                this.isEditAnnounce = true;
                                continue;
                            }
                        }
                        if (this.showtask) {
                            this.OpentaskMan();
                            this.closeSearchImg();
                        }
                    }
                }
            });
        },

        // 给设备校时的文本框赋值
        equipmentComparse() {
            this.DialogVisible15 = true;
            if (this.pTinfo.list.offset < 0) {
                this.fastType = '0';
                this.secondHand = -(this.pTinfo.list.offset);
            } else {
                this.fastType = '1';
                this.secondHand = this.pTinfo.list.offset;
            }
        },

        // 设备校时
        equipmentCalibate() {
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

            let data = {
                cameraUuid: this.pTinfo.list.cameraUuid,
                caseUuid: this.$route.query.caseUuid,
                longitude: this.pTinfo.list.longitude,
                latitude: this.pTinfo.list.latitude,
                offset: this.secondHand
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/temp/device/update', data).then(res => {
                if (res.data.code == 200) {
                    this.getLableList();
                    if (this.suspicionUuids) {
                        this.changeSuspicionObj(this.suspicionUuids);
                    }
                    this.DialogVisible15 = false;
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

        // 监听鼠标离开地图区域
        leave() {
            this.map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'));
            this.map.disableDragging();
            this.map.enableDragging();
            this.pTinfo.disableDragging();
            this.getLableList();
            this.ajaxCaseInfo();
            this.mouseFlag = false;
        },
        //因为会存放多个上传过图片的卡口点，需要用当前的卡口点，和存放在localStorage里面的卡口点位id数组进行比对，如果匹配上了，就代表这个卡口点
        //有上传过图片，拿到当前卡口点的所有端口，杀掉所有进程
        confirmDevice(row) {
            //取出最终存放在session里面的数组，这个数组包含很多对象，每一个对象key是DP，value是deviceUuid+port
            let device = JSON.parse(localStorage.getItem('finalDevice'));
            let id
            for (let i in device) {
                //如果当前删除的点位uuid和取出的数组的value值相等，那么就通过第二个端口号，来执行删除进程的回调
                if (device[i].DP.split("&")[0] == row.list.deviceUuid) {
                    id = device[i].DP.split("&")[1]
                    this.closecaruplod(id)
                }
            }
        },
        //停掉图片上传进程的函数
        closecaruplod(id) {
            $.ajax({
                url: "http://127.0.0.1:" + id + "?req=3",
                type: 'GET',
                success: function (data) {},
                error: function (data) {}
            })
        },

        getAllImg(id) {
            let data = {
                deviceId: id,
                caseUuid: this.$route.query.caseUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/point/device/mark/query', data).then(res => {
                if (res.data.code == 200) {
                    this.lableImgList = res.data.data;
                    if (this.lableImgList.length == 0) {
                        this.showimgrul = '';
                    } else {
                        this.showimgrul = this.lableImgList[0].videoCaptureUrl;
                    }
                }
            });
        },

        // 跳转到以图搜图
        collecPictBtn(val) {
            this.showarrPoisArr = false
            this.isTrajectory = false;
            this.suspicionUuids = '';
            this.changeSuspicionObj(false)
            this.$refs.searchImg.showLinecurrent = false;
            this.showSearchImg = false;
            this.settargetToSearchImg({});
            this.setstrusResult({});
            this.setsearchImgBtn(val);
            this.childsearchImgBtn(); // 调用以图搜图方法
        },

        // 嫌疑目标下载压缩包
        downLoadPictBtn(item) {
            if (this.$commons.isEmpty(item.videoUrl)) {
                this.$myconfirm({
                    type: '提示',
                    msg: '转标注任务未完成，是否继续下载？',
                    icon: 2,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    let downLoadVsas = sessionStorage.getItem('vsasModuleUrl');
                    window.open('http://' + downLoadVsas + '/download/mark?markIds=' + item.markId + '&caseUuid=' + this.$route.query.caseUuid);
                })
            } else {
                let downLoadVsas = sessionStorage.getItem('vsasModuleUrl');
                window.open('http://' + downLoadVsas + '/download/mark?markIds=' + item.markId + '&caseUuid=' + this.$route.query.caseUuid);
            }
            // let downLoadVsas = sessionStorage.getItem('vsasModuleUrl');
            // window.open('http://' + downLoadVsas + '/download/mark?markIds=' + item.markId + '&caseUuid=' + this.$route.query.caseUuid);
            // let data = {
            //   markIds:item.markId,
            //   caseUuid:this.$route.query.caseUuid
            // }
            // // data = this.$qs.stringify(data)
            // this.$http.get('vsas/download/mark',{params:data}).then(res=>{
            //   if(res.data.code == 200){
            //     // console.log(res.data.data,222);
            //   }
            // }
        },

        // 忽略
        ignore() {
            this.$refs.stuJudge.style.display = 'none';
        },

        // 点击任务管理
        OpentaskMan() {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            let userId = userInfo.value.userId;
            if (this.teamData) {
                for (let i = 0; i < this.teamData.length; i++) {
                    if (userId == this.teamData[i].user.userId && this.teamData[i].distRole == 2) { // 侦查与管理人员
                        this.isPersonMan = true;
                        break;
                    } else if (userId == this.teamData[i].user.userId && this.teamData[i].distRole == 1) {
                        this.isTask = true;
                        this.isPersonMan = false;
                        break;
                    } else {
                        this.isPersonMan = true;
                    }
                }
            }
            if (!this.teamData.length) {
                this.isPersonMan = true;
            }
        },

        // 案件由非协同转协同
        castToSynergy() {
            if (this.dataCaseInfo.isSpecial == 1) {
                this.$notify({
                    type: 'warning',
                    message: '该案件已是协同案件!',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            this.$myconfirm({
                type: '提示',
                msg: '是否将案件转成协同案件？',
                icon: 2,
                btn: {
                    ok: '确定',
                    no: '取消'
                }
            }).then(() => {
                let data = {
                    caseUuid: this.caseUuid, // 案件ID
                    caseLinkMark: this.dataCaseInfo.caseLinkMark, // 案件编号
                    caseName: this.dataCaseInfo.caseName, // 案发名称
                    timeUpLimit: this.dataCaseInfo.timeUpLimit, // 案发结束时间
                    timeLowLimit: this.dataCaseInfo.timeLowLimit, // 案发开始时间
                    placeCode: this.dataCaseInfo.placeCode, // 区/县 简码
                    regionFullName: this.dataCaseInfo.regionFullName, // 区县 名称
                    placeFullAddress: this.dataCaseInfo.placeFullAddress, // 案发详址
                    //   longitude: this.caselng, // 案发经度
                    //   latitude: this.caselat, // 案发纬度
                    longitude: this.dataCaseInfo.longitude, // 案发经度
                    latitude: this.dataCaseInfo.latitude, // 案发纬度
                    state: this.dataCaseInfo.state, // 案件状态
                    caseCategoryDesc: this.dataCaseInfo.caseCategoryDesc, // 案件类型
                    caseToolDesc: this.dataCaseInfo.caseToolDesc, // 作案工具
                    caseMethodDesc: this.dataCaseInfo.caseMethodDesc, // 作案手段
                    caseLevelDesc: this.dataCaseInfo.caseLevelDesc, // 危害程度
                    caseTargetDesc: this.dataCaseInfo.caseTargetDesc, // 侵犯目标
                    caseOpportunityDesc: this.dataCaseInfo.caseOpportunityDesc, // 作案时机
                    caseAbstract: this.dataCaseInfo.caseAbstract, // 简要案情
                    isSpecial: 1 // 协同作战状态
                };
                data = this.$qs.stringify(data);
                this.$http.post('pca/casemng/baseinfo/save', data).then(res => {
                    if (res.data.code == 200) {
                        this.ajaxCaseInfo();
                        this.getAllData();
                        this.$notify({
                            type: 'success',
                            message: '转成协同成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else {}
                });
            });
        },
        // 案件编辑
        editCase() {
            //打开编辑案件
            this.isCaseInfos = true;
        },

        // 案事件信息
        ajaxCaseInfo() {
            // console.log('打印是否加载点位');
            // this.suspicionUuids = ''

            let data = {
                caseUuid: this.$route.query.caseUuid
            };
            this.$http.get('pca/casemng/baseinfo/query', {
                    params: data
                })
                .then((res) => {
                    this.isloadTrue = true
                    this.changeSuspicionObj(this.suspicionUuids);
                    if (this.caseInfom) {
                        this.showSubmit = true;
                    } else if (this.caseInfom == undefined) {
                        if (res.data.data.creator == this.$storage.getSession('userInfo').userId) {
                            this.showSubmit = true;
                        }
                    }
                    this.caselng = res.data.data.longitude;
                    this.caselat = res.data.data.latitude;
                    this.dataCaseInfo = res.data.data;
                    if (this.dataCaseInfo.isSpecial == 1) {
                        this.setshowjudged(true);
                        this.getCommunicationList(); // 加载朋友圈消息
                        clearInterval(this.timerFridend)
                        this.timerFridend = setInterval(() => {
                            setTimeout(() => {
                                this.getCommunicationList(); // 加载朋友圈消息
                            }, 0);
                        }, 5000);
                    } else {
                        this.setshowjudged(false);
                    }
                    this.queryContent(); // 查询公告
                    this.getAllData();
                    if (this.$storage.getSession('userInfo').userId == this.dataCaseInfo.establisther.userId) {
                        this.showsyn = true;
                    } else {
                        this.showsyn = false;
                    }
                });
        },

        // 进入页面查询嫌疑目标列
        getSuspicionMessage(state, id) {
            this.$http({
                url: 'pca/casemng/suspicion/list',
                method: 'get',
                params: {
                    caseUuid: this.caseUuid
                }
            }).then(res => {
                if (res.data.code === 200) {
                    this.suspicionList = res.data.data;
                    // 调用异常轨迹获取方法
                    // if (this.suspicionUuids == '') {
                    //     this.warningData(this.suspicionList);
                    // }
                    if (this.suspicionList.length != 0) {
                        if (id) {
                            this.suspicionUuids = id;
                        } else {
                            this.suspicionUuids = '';
                        }
                    } else {
                        this.suspicionUuids = '';
                    }
                    this.getLableList();
                }
            });
        },

        suspicionTypeData(val) {
            if (val == '1') {
                return '（ 人 ）';
            } else if (val == '3') {
                return '（ 骑车人 ）';
            } else if (val == '2') {
                return '（ 车辆 ）';
            }
        },


        // 进入页面查询标注列表
        getLableList() {
            let data = {
                caseUuid: this.caseUuid,
                suspicionUuid: this.suspicionUuids,
                pageNum: this.caseMarkNum,
                pageSize: 10,
                type: 0
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/list/case/mark', data).then(res => {
                if (res.data.code == 200) {
                    this.SuspicionObjSizeList = _.chunk(res.data.data.list, 4);
                    this.SuspicionObjList = res.data.data.list;
                    this.caseMarkTotal = res.data.data.totalCount;
                    if (!this.SuspicionObjList.length) {
                        this.warningDataFlag = false;
                    }
                }
            });
        },
        // 进入页面查询标注列表
        getallLableList() {
            let data = {
                caseUuid: this.caseUuid,
                suspicionUuid: this.suspicionUuids, //嫌疑人ID
                pageNum: this.caseMarkNum,
                pageSize: 1000,
                type: 0 //0是编辑页面1是详情页面
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/casemng/list/case/mark', data).then(res => {
                if (res.data.code == 200) {
                    this.SuspicionObjLists = res.data.data.list;
                }
            });
        },

        // 查询嫌疑人特征信息
        suspicionUuid3D() {
            let data = {
                suspicionUuid: this.suspicionUuids
            };
            this.$http.get('/pca/casemng/suspicion/three/query', {
                    params: data
                })
                .then((res) => {
                    if (res.data.data.length == 0) {
                        this.is3DEmpty = true;
                    } else {
                        this.is3DEmpty = false;
                    }
                });
        },

        // // 点击打开点位对应的图片线索
        // getImgUrls(data, state) {
        //     this.isVideo = false;
        //     this.caseMessageObj = data;
        //     if (state == 'clear') {
        //         this.centerSpaceVideoFlag = false;
        //     } else {
        //         this.centerSpaceVideoFlag = false;
        //         let lastindex = data.traceImgUrl.lastIndexOf('.');
        //         let playvalue = data.traceImgUrl;
        //         playvalue = playvalue.slice(lastindex - 48, playvalue.length);
        //         data.traceImgUrl = window.origin + '/fastDfs' + playvalue;
        //         this.getBase64(data.traceImgUrl, data.device.longitude, data.device.latitude);
        //     }
        // },

        // 使用图片url改变其宽高,转为base64的url
        // getBase64(url, longitude, latitude) {
        //     let centerImgUr = '';
        //     let img = new Image();
        //     let canvas = document.createElement('canvas');
        //     let ctx = canvas.getContext('2d');
        //     img.crossOrigin = 'Anonymous';
        //     img.src = url;
        //     img.onload = () => {
        //         canvas.width = 400;
        //         canvas.height = 250;
        //         ctx.drawImage(img, 0, 0, 400, 250);
        //         centerImgUr = canvas.toDataURL('image/jpeg');
        //         this.addImgSpot(centerImgUr, longitude, latitude);
        //     };
        // },

        // 12.17新增判断当前标注是否转完成的接口，返回值
        // 通过点位查任务ID,通过任务查点位信息
        async getLableIsOK() {
            let result = null;
            let data = {
                caseUuid: this.$route.query.caseUuid,
                taskType: 6
            };
            data = this.$qs.stringify(data);
            await this.$http.post('vsas/task/checkTaskFinish', data).then(res => {
                result = res.data;
            });
            return result;
        },


        // 2020-12-8屏蔽导出卷宗的方法，重写导出卷宗方法
        intervalFor(arr, val) {
            // this.loading.close();
            let str = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][0].dw) {
                    str.push(arr[i])
                } else {
                    if (arr[i][0].length > 1) {
                        str.push(arr[i])
                    }
                }
            }
            //  将去重后的数组赋值给uniqArr
            this.uniqArr = str;
            //  清除之前在隐藏地图上的操作,初始化隐藏地图
            this.hideMap.clearOverlays();
            if (str.length > 0) {
                for (let i = val; i < str.length; i++) {
                    if (str[i][0].gj) {
                        this.hideShowTrajectory(str[i][0].dw, str[i][0].gj); // 执行嫌疑目标方法和执行电围方法
                        setTimeout(() => {
                            // 执行截图函数
                            this.handleGenerator(this.uniqArr[i][0].dw); // 嫌疑目标截图
                        }, 2000)
                    } else {
                        this.hideShowTrajectory(str[i][0])
                        setTimeout(() => {
                            // 执行截图函数
                            this.handleGenerator(this.uniqArr[i][0]);
                        }, 2000)
                    }
                    setTimeout(() => {
                        // 回调
                        this.intervalFor(str, ++i);
                    }, 2000);
                    break;
                }
            } else {
                // arr没有长度，就代表嫌疑人没有轨迹，就不需要执行截图函数，直接下载文档
                this.loading.close();
                // 执行下载文档函数
                this.exportimgUrlid();
            }
        },

        // // 把图片线索衔接到点位上
        // addImgSpot(url, p0, p1) {
        //     this.map.removeOverlay(this.ImgMarker);
        //     let point = new BMap.Point(p0, p1);
        //     var myIcon = new BMap.Icon(url, new BMap.Size(400, 250), {});
        //     this.ImgMarker = new BMap.Marker(point, {
        //         offset: new BMap.Size(195, 135),
        //         icon: myIcon
        //     });
        //     this.map.addOverlay(this.ImgMarker);
        //     this.map.addEventListener('click', () => {
        //         this.map.removeOverlay(this.ImgMarker);
        //     });
        // },

        // 打开中间的视频
        getVideoUrls(data, index) {
            if (this.$commons.isEmpty(data.videoUrl)) {
                this.$notify({
                    type: 'warning',
                    message: '视频正在下载！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            if (this.polylineObj) {
                this.defaultText = '轨迹编辑';
                this.polylineObj.disableEditing();
            }
            this.isTrajectory = false;
            this.showarrPoisArr = false
            // this.suspicionUuids = '';
            this.map.centerAndZoom(new BMap.Point(data.device.longitude, data.device.latitude + 0.018), sessionStorage.getItem('bmapLevel'));
            this.closeSearchImg();
            this.closeSearchCarImg();
            this.isactive = index;
            this.markerId = data.markId;
            // this.map.removeOverlay(this.ImgMarker)
            // if (data.videoProcFlag == 1) {
            //     this.isTranscoding = 1;
            // } else if (data.videoProcFlag == 2) {
            //     this.isTranscoding = 2;
            // } else if (data.videoProcFlag == 4) {
            //     this.isTranscoding = 4;
            // } else if (data.videoProcFlag == 5) {
            //     this.isTranscoding = 5;
            // }
            let url = ''
            if (data.storagePath) {
                url = this.getUrl(data.storagePath)
            } else if (data.videoUrl) {
                url = this.getUrl(data.videoUrl)
            }
            if (data.markTarget == null) {
                this.caseMessageObj = {};
            } else {
                this.caseMessageObj = data.markTarget;
            }
            // 2019-04-23添加案件标注视频
            let point = new BMap.Point(data.device.longitude, data.device.latitude - 0.002);
            this.monitoringPointInfoWin(point, data, url);
        },


        // 设置播放区域的信息
        monitoringPointInfoWin(point, data, url) {
            let html = '';
            html = `<div class="pointBox"> <video  loop  disablePictureInPicture autoplay="autoplay" controls="controls" id="centerVideo_flv"></video> </div>`;
            let infoWindow = new BMap.InfoWindow(html, {
                title: '点位名称：' + data.device.name,
                offset: new BMap.Size(0, -17)
                // width: '500px',
                // height: '270px'
            });
            // 禁止点击地图关闭窗口
            infoWindow.disableCloseOnClick()
            // this.map.openInfoWindow(infoWindow, point);
            setTimeout(() => {
                this.$nextTick(() => {
                    this.map.openInfoWindow(infoWindow, point);
                    setTimeout(() => {
                        this.isVideo = true;
                        this.flv_load_mds('centerVideo_flv', url);
                    }, 150);
                });
                infoWindow.addEventListener('clickclose', (evt) => {
                    this.isTrajectory = true;
                    this.isVideo = false;
                    this.map.centerAndZoom(point, sessionStorage.getItem('bmapLevel'));
                    for (let i = 0; i < this.trajectoryArr.length; i++) {
                        let getLongitude = this.trajectoryArr[i].longitude; // 获取经度
                        let getLatitude = this.trajectoryArr[i].latitude; // 获取纬度
                        this.zuobiao2Pixels(getLongitude, getLatitude, i);
                    }
                    // this.map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')))
                });
            }, 100);
            infoWindow.addEventListener('clickclose', (evt) => {
                this.isTrajectory = true;
                this.showarrPoisArr = true
                this.isVideo = false;
                this.map.centerAndZoom(point, sessionStorage.getItem('bmapLevel'));
                for (let i = 0; i < this.trajectoryArr.length; i++) {
                    let getLongitude = this.trajectoryArr[i].longitude; // 获取经度
                    let getLatitude = this.trajectoryArr[i].latitude; // 获取纬度
                    this.zuobiao2Pixels(getLongitude, getLatitude, i);
                }
                for (let i = 0; i < this.mapInfoList.length; i++) {
                    let getLongitude = this.mapInfoList[i].longitude; // 获取经度
                    let getLatitude = this.mapInfoList[i].latitude; // 获取纬度
                    this.zuobiao2Pixel(getLongitude, getLatitude, i);
                }
            });
        },

        // 打开案件比对
        opCaseContrast() {
            if (this.dataCaseInfo.caseCategoryDesc == '其他' && this.dataCaseInfo.caseName == '未知' && this.dataCaseInfo.stateDesc == '事件' &&
                this.dataCaseInfo.caseLinkMark == '' && this.dataCaseInfo.placeFullAddress == '' && this.dataCaseInfo.caseLevelDesc == '未知' &&
                this.dataCaseInfo.caseOpportunityDesc == '未知' && this.dataCaseInfo.caseMethodDesc == '未知' && this.dataCaseInfo.caseTargetDesc == '未知' &&
                this.dataCaseInfo.caseToolDesc == '未知' && this.dataCaseInfo.caseAbstract == '') {
                this.$notify({
                    type: 'warning',
                    message: '请修改案件属性',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            this.setsendInfo({});
            this.$store.state.caseComSon = true;
            this.$store.state.caseUuid = this.caseUuid;
        },

        // 打开属性比对页面
        opCasePersonContrast(item) {
            this.isTrajectory = false
            if (this.dataCaseInfo.caseCategoryDesc == '其他' && this.dataCaseInfo.caseName == '未知' && this.dataCaseInfo.stateDesc == '事件' &&
                this.dataCaseInfo.caseLinkMark == '' && this.dataCaseInfo.placeFullAddress == '' && this.dataCaseInfo.caseLevelDesc == '未知' &&
                this.dataCaseInfo.caseOpportunityDesc == '未知' && this.dataCaseInfo.caseMethodDesc == '未知' && this.dataCaseInfo.caseTargetDesc == '未知' &&
                this.dataCaseInfo.caseToolDesc == '未知' && this.dataCaseInfo.caseAbstract == '') {
                this.$notify({
                    type: 'warning',
                    message: '请修改案件属性',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            this.checkSearchLable()
            this.setsendInfo(item);
            this.$store.state.caseComSon = true;
            this.$store.state.caseTarget = true;
            this.$store.state.targetProperty = false;
            this.$store.state.caseUuid = this.caseUuid;
        },

        // 打开并案审批
        Openmerger() {
            if (this.dataCaseInfo.caseCategoryDesc == '其他' && this.dataCaseInfo.caseName == '未知' && this.dataCaseInfo.stateDesc == '事件' &&
                this.dataCaseInfo.caseLinkMark == '' && this.dataCaseInfo.placeFullAddress == '' && this.dataCaseInfo.caseLevelDesc == '未知' &&
                this.dataCaseInfo.caseOpportunityDesc == '未知' && this.dataCaseInfo.caseMethodDesc == '未知' && this.dataCaseInfo.caseTargetDesc == '未知' &&
                this.dataCaseInfo.caseToolDesc == '未知' && this.dataCaseInfo.caseAbstract == '') {
                this.$notify({
                    type: 'warning',
                    message: '请修改案件属性',
                    position: 'bottom-right',
                    duration: 3000
                });
            }
        },
        // 设备关联社会面原始数据
        deviceDence(val) {
            this.alldeviceList = val
        },
        // 确定后把图片加载进
        relevance() {
            this.isRightClick = true;
            this.tree1 = this.$refs.Stereotypo.deviceList.concat(this.$refs.Stereotypo.deviceList1);
            if (this.$refs.Stereotypo.deviceSList1[0] == undefined) {
                this.tree4 = this.$refs.Stereotypo.deviceSList;
            } else {
                this.tree4 = this.$refs.Stereotypo.deviceSList.concat(this.$refs.Stereotypo.deviceSList1);
            }
            this.tree1 = _.uniqWith(this.tree1, _.isEqual);
            this.tree4 = _.uniqWith(this.tree4, _.isEqual);
            this.tree5 = this.$refs.Stereotypo.treeList5;
            this.tree6 = this.$refs.Stereotypo.treeList6;
            this.tree8 = this.$refs.Stereotypo.treeList8;
            // 社会面过滤
            let equitList = [];
            equitList = this.tree1.concat(this.tree4)
            // 加入进来的数据
            let set = this.alldeviceList.map(item => item.shebeiId)
            let addList = equitList.filter(item => !set.includes(item.deviceUuid))
            for (let i = 0; i < addList.length; i++) {
                addList[i].caseUuid = this.$route.query.caseUuid
            }

            // 删除原有的
            let set2 = equitList.map(item => item.deviceUuid)
            let removeList = this.alldeviceList.filter(item => !set2.includes(item.shebeiId))
            for (let i = 0; i < removeList.length; i++) {
                removeList[i].deviceUuid = removeList[i].shebeiId
                removeList[i].caseUuid = this.$route.query.caseUuid
            }
            if (removeList.length && !addList.length) {
                this.$myconfirm({
                        type: '提示',
                        msg: '取消后会导致点位关联数据全部丢失,是否继续？',
                        icon: 1,
                        btn: {
                            ok: '确定',
                            no: '取消'
                        }
                    }).then(() => {
                        let a = JSON.stringify({
                            caseUuid: this.caseUuid,
                            add: addList,
                            remove: removeList,
                        })
                        let data = {
                            data: a
                        }
                        data = this.$qs.stringify(data)
                        this.$http.post('pca/casemng/device/rel/increment', data).then((res) => {
                            if (res.data.code == 200) {
                                this.DialogVisible1 = false
                                this.$notify({
                                    type: 'success',
                                    message: '取消关联成功',
                                    position: 'bottom-right',
                                    duration: 2000
                                })
                                this.changeSuspicionObj();
                            }
                        });
                    })
                    .catch(() => {
                        this.$refs.Stereotypo.queryVideoData();
                        // this.isCancle = true
                        // this.loading.close();
                    });
            } else {
                let a = JSON.stringify({
                    caseUuid: this.caseUuid,
                    add: addList,
                    remove: removeList,
                })
                let data = {
                    data: a
                }
                data = this.$qs.stringify(data)
                this.$http.post('pca/casemng/device/rel/increment', data).then((res) => {
                    if (res.data.code == 200) {
                        this.DialogVisible1 = false
                        this.changeSuspicionObj();
                    }
                });
            }
        },

        // 关闭直接关联点位
        canclePoint() {
            this.loading = this.$loading({
                lock: true,
                background: 'rgba(255,255,255,0.4)',
                text: '加载中'
            });
            this.DialogVisible1 = false;
            if (this.DialogVisible1 == false) {
                this.loading.close();
            }
            // this.ajaxCaseInfo();
            this.closeSearchImg();
        },


        // 上传到案件库
        getSubmitTocase() {
            this.checkSearchLable()
            this.getLableIsOK().then(res => {
                if (res.code == 200) {
                    if (res.data) {
                        if (this.dataCaseInfo.caseCategoryDesc == '其他' && this.dataCaseInfo.caseName == '未知' && this.dataCaseInfo.stateDesc == '事件' &&
                            this.dataCaseInfo.caseLinkMark == '' && this.dataCaseInfo.placeFullAddress == '' && this.dataCaseInfo.caseLevelDesc == '未知' &&
                            this.dataCaseInfo.caseOpportunityDesc == '未知' && this.dataCaseInfo.caseMethodDesc == '未知' && this.dataCaseInfo.caseTargetDesc == '未知' &&
                            this.dataCaseInfo.caseToolDesc == '未知' && this.dataCaseInfo.caseAbstract == '') {
                            this.$notify({
                                type: 'warning',
                                message: '请修改案件属性',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            return;
                        }
                        this.$myconfirm({
                            type: '提示',
                            msg: '如果案件数据较多，上传时间会较长，是否提交审批？',
                            icon: 2,
                            btn: {
                                ok: '确定',
                                no: '取消'
                            }
                        }).then(() => {
                            this.loading = this.$loading({
                                lock: true,
                                background: 'rgba(255,255,255,0.4)',
                                text: '提交审批中'
                            });
                            let data = {
                                caseUuid: this.$route.query.caseUuid
                            };
                            data = this.$qs.stringify(data);
                            this.$http.post('vsas/case/audit/submit', data).then(res => {
                                this.loading.close();
                                if (res.data.code == 200) {
                                    this.disableTocase = true;
                                    this.$notify({
                                        type: 'success',
                                        message: '提交成功',
                                        position: 'bottom-right',
                                        duration: 3000
                                    });

                                    this.$router.push('/videoCombat/caseInfomanage?ismyupload=true&synergy=-1&menuCode=120');
                                } else if (res.data.code == 100) {
                                    this.$notify({
                                        type: 'warning',
                                        message: '提交失败',
                                        position: 'bottom-right',
                                        duration: 3000
                                    });
                                } else if (res.data.code == 101) {
                                    this.$notify({
                                        type: 'warning',
                                        message: res.data.message,
                                        position: 'bottom-right',
                                        duration: 3000
                                    });
                                } else if (res.data.code == 50070) {
                                    this.$notify({
                                        type: 'error',
                                        message: '提交审核失败',
                                        position: 'bottom-right',
                                        duration: 3000
                                    });
                                } else {
                                    this.$notify({
                                        type: 'error',
                                        message: '提交审核失败',
                                        position: 'bottom-right',
                                        duration: 3000
                                    });
                                }
                            });
                        });
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: '标注未转完成，请稍等！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '标注未转完成，请稍等！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },

        // 人员/车辆特征比对
        show3D(type) {
            if (this.dataCaseInfo.caseCategoryDesc == '其他' && this.dataCaseInfo.caseName == '未知' && this.dataCaseInfo.stateDesc == '事件' &&
                this.dataCaseInfo.caseLinkMark == '' && this.dataCaseInfo.placeFullAddress == '' && this.dataCaseInfo.caseLevelDesc == '未知' &&
                this.dataCaseInfo.caseOpportunityDesc == '未知' && this.dataCaseInfo.caseMethodDesc == '未知' && this.dataCaseInfo.caseTargetDesc == '未知' &&
                this.dataCaseInfo.caseToolDesc == '未知' && this.dataCaseInfo.caseAbstract == '') {
                this.$notify({
                    type: 'warning',
                    message: '请修改案件属性',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            this.$store.state.caseTarget = false;
            this.$store.state.caseComSon = true;
            this.$store.state.targetProperty = true;
            this.$store.state.caseUuid = this.caseUuid;
            this.$store.state.suspicionUuid = this.suspicionUuids;
        },

        // 车辆属性比对
        showcarNatureDialog(item) {
            this.togglePersonfalse();
            this.$store.state.caseUuid = this.caseUuid;
            if (item.markTarget == null) {
                this.$store.state.carNatureObj = false;
                this.$notify({
                    type: 'warning',
                    message: '暂无数据',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else {
                this.$store.state.carNatureObj = item.markTarget;
                this.$store.state.carNatureDialog = true;
            }
        },

        // 人脸识别
        showpersonFaceDialog(item) {
            this.$store.state.caseUuid = this.caseUuid;
            if (item.markTarget == null) {
                this.$store.state.personFaceDialog = false;
                this.$notify({
                    type: 'warning',
                    message: '暂无数据',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else {
                this.$store.state.personFaceDialog = true;
                this.$store.state.personFaceObj = item.markTarget;
            }
        },

        // 人员属性比对
        showpersonNatureDialog(item) {
            this.togglePersonfalse();
            this.$store.state.caseUuid = this.caseUuid;
            if (item.markTarget == null) {
                this.$store.state.personNatureDialog = false;
                this.$notify({
                    type: 'warning',
                    message: '暂无数据',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else {
                this.$store.state.personNatureObj = item.markTarget;
                this.$store.state.personNatureDialog = true;
            }
        },

        // 骑车人属性比对
        showunCarNatureDialog(item) {
            this.togglePersonfalse();
            this.$store.state.caseUuid = this.caseUuid;
            if (item.markTarget == null) {
                this.$store.state.unCarNatureObj = false;
                this.$notify({
                    type: 'warning',
                    message: '暂无数据',
                    position: 'bottom-right',
                    duration: 3000
                });
            } else {
                this.$store.state.unCarNatureObj = item.markTarget;
                this.$store.state.unCarNatureDialog = true;
            }
        },

        // 底部线索框滚动条懒加载
        spaceVideoScroll() {

        },

        // 点击线索框横向滚动
        scrollLeftRight(type) {
            let count = 0;
            let scrollLeft = document.getElementById('spaceVideo').scrollLeft; // 251
            let scrollWidth = document.getElementById('spaceVideo').scrollWidth; // 0-18
            let clientWidth = document.getElementById('spaceVideo').clientWidth; // 233
            if (type == 'left') {
                document.getElementById('spaceVideo').scrollLeft = document.getElementById('spaceVideo').scrollLeft - 200;
                if (document.getElementById('spaceVideo').scrollLeft == 0) {
                    // this.suspicionList = []
                    this.caseMarkNum--;
                    if (this.caseMarkNum <= 1) {
                        this.$notify({
                            type: 'warning',
                            message: '已经到第一页了',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.caseMarkNum = 1;
                    }
                    this.getLableList();
                }
            }
            if (type == 'right') {
                if (this.caseMarkNum >= Math.ceil(this.caseMarkTotal / 10)) {
                    if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth) {
                        this.$notify({
                            type: 'warning',
                            message: '已经到最后一页了',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        document.getElementById('spaceVideo').scrollLeft = scrollWidth - clientWidth
                        return
                    }
                }
                document.getElementById('spaceVideo').scrollLeft = document.getElementById('spaceVideo').scrollLeft + 200;
                if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth) {
                    count = 1;
                    count++;

                    if (count == 2) {
                        this.caseMarkNum++;
                        if (this.caseMarkNum >= Math.ceil(this.caseMarkTotal / 10)) {
                            this.$notify({
                                type: 'warning',
                                message: '已经到最后一页了',
                                position: 'bottom-right',
                                duration: 3000
                            });
                            this.caseMarkNum = Math.ceil(this.caseMarkTotal / 10);
                            document.getElementById('spaceVideo').scrollLeft = 10;
                        } else {
                            document.getElementById('spaceVideo').scrollLeft = 0;
                        }
                        this.getLableList();
                    }
                }
            }
        },

        // 结构化横向滑动
        scrollRight(type) {
            let count = 0;
            let scrollLeft = document.getElementById('spacePic').scrollLeft; // 251
            let scrollWidth = document.getElementById('spacePic').scrollWidth; // 0-18
            let clientWidth = document.getElementById('spacePic').clientWidth; // 233
            if (type == 'left') {
                document.getElementById('spacePic').scrollLeft = document.getElementById('spacePic').scrollLeft - 200;
                if (document.getElementById('spacePic').scrollLeft == 0) {

                }
            }
            if (type == 'right') {
                document.getElementById('spacePic').scrollLeft = document.getElementById('spacePic').scrollLeft + 200;
                if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth) {
                    count = 1;
                    count++;
                    if (count == 2) {
                        // document.getElementById("spaceVideo").scrollLeft = 10  //删除右侧按钮无限点击
                    }
                }
            }
        },

        // 新的分页
        //  scrollLeftRight(type){
        //   if(type == 'left'){
        //    this.sizeIndex--
        //    if(this.sizeIndex <= 0) {
        //     this.sizeIndex = 0
        //     this.SuspicionObjList = this.SuspicionObjSizeList[this.sizeIndex]
        //     this.$notify({
        //       type: 'warning',
        //       message: '已经到第一页了',
        //       position: 'bottom-right',
        //       duration: 3000
        //     });
        //    } else {
        //     this.SuspicionObjList = this.SuspicionObjSizeList[this.sizeIndex]
        //    }
        //   }
        //   if(type == 'right'){
        //     this.sizeIndex++
        //     if(this.sizeIndex >= this.SuspicionObjSizeList.length-1) {
        //       this.sizeIndex = this.SuspicionObjSizeList.length-1
        //       this.SuspicionObjList = this.SuspicionObjSizeList[this.sizeIndex]
        //       this.$notify({
        //         type: 'warning',
        //         message: '已经到最后一页了',
        //         position: 'bottom-right',
        //         duration: 3000
        //       });
        //     } else {
        //       this.SuspicionObjList = this.SuspicionObjSizeList[this.sizeIndex]
        //     }
        //   }
        // },


        // 发起协同
        opensynergy() {
            this.issyncase = true;
        },

        childbysyn(val) {
            this.issyncase = val;
            this.getAllData();
        },

        // 关闭图片展示模态框
        childByshowImg(val, imgurl) {
            this.isopenimg = val;
            if (this.pTinfo.listType == undefined) {
                if (this.pTinfo.list.type == 6 && this.u_imgrul != imgurl) {
                    this.uploadImg(imgurl);
                }
            } else {
                this.uploadImg(imgurl);
            }
        },

        uploadImg(imgurl) {
            let pointType = '';
            let pointId = '';
            if (this.pTinfo.listType == undefined) {
                pointType = 6;
                pointId = this.pTinfo.list.deviceUuid;
            } else {
                pointType = 7;
                pointId = this.hotspotId;
            }
            let data = {
                id: this.u_id,
                pointId: pointId, // 设备ID
                imgUrl: imgurl,
                pointType: pointType, // 类型  6信息点 7案发点
                operationType: 2,
                caseUuid: this.$route.query.caseUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post('pca/point/img/relevance', data).then(res => {});
        },
        // 点击以图搜图的方法
        openSeekImg() {
            let data = {
                type: 0
            };
            //清空点击快捷以图搜图时设置的值
            this.setsearchImgBtn();
            this.isshowTargetImg = false

            // 清空快速点击的值以及选中的值
            this.settargetToOenStrus(0);
            this.settargetToSearchImg(data);
            this.setstrusResult({});
            setTimeout(() => {
                this.checkSearchLable()
                this.clearDrawing(1);
                this.opensearchImg();
            }, 100);
            this.suspicionUuid3D()
        },
        // 点击以车搜车的方法
        openSeekCarImg() {
            let data = {
                type: 0
            };
            // 清空快速点击的值以及选中的值
            // this.settargetToOenStrus(0);
            this.settargetToSearchImg(data);
            // this.setstrusResult({});
            setTimeout(() => {
                this.checkSearchLable()
                this.opensearchCarImg();
                this.clearDrawing(1);
            }, 100);
        },
        // 打开以图搜图的新功能
        opensearchImg() {
            this.showSearchCarImg = false;
            this.showSearchImg = true;
            this.drag();
        },
        //打开以车搜车的新功能
        opensearchCarImg(res) {
            if (res) {
                this.fast = res
            } else {
                this.fast = {}
            }
            this.tasktype = 8;
            this.showSearchImg = false;
            this.showSearchCarImg = true;
            this.drags();
        },
        //关闭以车搜车的回调
        closeSearchCarImg() {
            if (this.showSearchCarImg) {
                this.showSearchCarImg = false;
                this.clearDrawing();
            }
        },
        childbycolses(val, list) {
            document.getElementById('spacePic').scrollLeft = 0;
            this.showSearchCarImg = val;
            this.searchRunAllList = [];
            this.slidePic = [];
            this.spaceSkyArrow = false
            this.spaceVideoArrowFlag = 1
            this.getSuspicionMessage()
            if (this.targetToSearchImgCar.type == '1') {
                this.isretriev = true;
            }
            this.spacePointArrowFlag = 1;
        },
        drags() {
            document.getElementById('searchImgs').style.left = '20%';
            document.getElementById('searchImgs').style.top = '12%';
        },

        // 拖拽视频窗口
        drag() {
            document.getElementById('searchImg').style.left = '16%';
            document.getElementById('searchImg').style.top = '12%';
            // let allwidth = document.getElementById('main').clientWidth
            // let allheight = document.getElementById('main').clientHeight
            // var dragCircle = document.getElementById("searchImg");
            // let _this = this
            // dragCircle.onmousedown = function(ev) {
            //   let searchwidth = document.getElementById("searchImg").clientWidth
            //   let searchheight = document.getElementById("searchImg").clientHeight
            //   ev = ev || window.event;
            //   var relaX = ev.clientX - this.offsetLeft;
            //   var relaY = ev.clientY - this.offsetTop + 45;
            //   // if(_this.$refs.searchImg != undefined){
            //   if(_this.$refs.searchImg.dialogVisible || _this.$refs.searchImg.showSkynet){
            //     return
            //   }
            //   document.onmousemove = function(ev) {
            //     ev = ev || window.event;
            //     let left = (ev.clientX - relaX)
            //     if(left < 0){
            //       left = 0
            //     }else if(left > (allwidth - searchwidth)){
            //       left = allwidth - searchwidth - 4
            //     }
            //     let top = (ev.clientY - relaY)
            //     if(top < 0){
            //       top = 0
            //     }else if(top > (allheight - searchheight)){
            //       top = allheight - searchheight - 4
            //     }
            //     dragCircle.style.left = left + "px";
            //     dragCircle.style.top = top + "px";
            //   };
            //   document.onmouseup = function(ev) {
            //     ev = ev || window.event;
            //     document.onmousemove = null;
            //     document.onmouseup = null;
            //   };
            // };
        },

        /**
         * @description: this.trackSee存在的时候代表是从轨迹列表查看的轨迹，这时候折叠菜单不清除
         * @param {type}
         * @return:
         * @Author: 李志远
         */
        // 关闭以图搜图功能
        closeSearchImg() {
            if (this.showSearchImg) {
                this.showAllTargetZky = false
                if (this.zkyStructureSwitch == 'true') {
                    if (this.showarrPoisArr) { // 表示开启了以图搜图
                        this.showarrPoisArr = false;
                        this.showSearchImg = false;
                        this.mapInfoList = []
                        this.runSearchList = []
                        this.searchRunAllList = []
                        if (this.trackSee) {
                            return
                        } else {
                            this.clearDrawing();
                        }
                    } else {
                        this.showSearchImg = false;
                        this.mapInfoList = []
                        this.runSearchList = []
                    }
                }
                if (this.spaceVideoArrowFlag == 1) { // 嫌疑目标打开清空碰轨迹绑定的轨迹
                    this.isOpenTrack()
                }
            }
        },
        //Test快速打开检索结果页面
        openlist(type) {
            this.getInfoToDeviceATask('', this.pTinfo.list.deviceUuid, type).then(res => {
                if (res.code == 200) {
                    this.taskUuid = res.data.taskUuid;
                    if (type == 0) {
                        this.isOpenDetail = true;
                    } else if (type == 1) {
                        //是否为glst
                        if (this.showVideoStruct == 'true') {
                            this.settargetToSearchImg({});
                            this.setstrusResult({});
                            this.settargetToOenStrus(2);
                            this.isopenStrus = true;
                            this.setglststrusInfo({});
                        };
                        //是否为zky
                        if (this.zkyStructureSwitch == 'true') {
                            this.settargetToSearchImg({});
                            this.setstrusResult({});
                            this.settargetToOenStrus(2);
                            this.isopenStrus = true;
                            this.setglststrusInfo({});
                        };
                    }
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '当前点位没有任务',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            });
        },

        // 关闭检索结果页面
        childByDetail() {
            this.isOpenDetail = false;
            this.getLableList();
        },

        // 通过点位查任务ID,通过任务查点位信息
        async getInfoToDeviceATask(taskUuid, deviceUuid, type) {
            let result = '';
            let data = {
                caseUuid: this.$route.query.caseUuid,
                taskUuid: taskUuid,
                deviceUuid: deviceUuid,
                type: type
            };
            await this.$http.get('vsas/structure/getTaskInfoOrDeviceInfo', {
                params: data
            }).then(res => {
                result = res.data;
            });
            return result;
        },

        // 打开播放器播放以图搜图列表中的视频
        playCVideo(item, data) {
            this.setDxplayerInfo(item);
            this.setshowDxplayer(true);
            // 给当前时间赋值
            document.title = document.title + '.';
            item.startTime = item.fileStartTime;
            this.setdeviceInfo(item);
        },

        childbyHandwork(val) {
            document.title = document.title + '.';
            this.showhandword = false;
            OnvideoShow();
            if (this.imgshow) {
                OnPause('false'); // 播放
            } else {
                OnPause('true'); // 暂停
            }
        },
        // 关闭播放器
        closePlay() {
            this.showvideoPlay = false;
            OnExit();
            CloseVodPlayer();
            clearInterval(window.g_interval);
            window.g_openplay = false;
            document.title = document.title.split('.')[0];
            clearInterval(this.getVideotime);
            clearInterval(this.timeFrag);
        },

        // 全局结构化搜索
        childbyglobalSearch(val) {
            this.showAllTarget = val;
        },
        // 全局结构化搜索Zky
        childbyglobalSearchzky(val) {
            this.showAllTargetZky = val;
            this.getLableList()
        },
        childImeiDia(val) {
            this.imeiVisibleDialog = val;
        },
        // 隐藏轨迹
        stop() {
            // 禁止删除的点位数据
            this.markersAll.forEach(element => {
                element.disableMassClear();
            });
            // 禁止删除的案件点数据
            this.markerCaseAll.forEach(element => {
                element.disableMassClear();
            });
            this.showarrPoisArr = false;
            // 删除地图覆盖物
            this.map.clearOverlays();
            this.runSearchList = []
            this.mapInfoList = []
        },
        // 显示轨迹
        show() {
            this.showarrPoisArr = true;
            this.handleMarklist()
        },
        // 点击点位切换
        handleNodeClick(data) {
            this.showtrack = false
            this.opentrackpoly = false
            this.isTrajectory = false
            this.map.closeInfoWindow()
            this.$store.state.mapLeftMenuFlag = false
            setTimeout(() => {
                if (data.longitude == undefined && data.latitude == undefined) {
                    if (this.trajectoryArr.length > 0) {
                        for (let i = 0; i < this.trajectoryArr.length; i++) {
                            let getLongitude = this.trajectoryArr[i].longitude // 获取经度
                            let getLatitude = this.trajectoryArr[i].latitude // 获取纬度
                            this.zuobiao2Pixels(getLongitude, getLatitude, i)
                        }
                    }
                    if (this.showarrPoisArr) {
                        this.loadArrPoisArr(this.mapInfoList)
                    }
                } else {
                    this.mapzoom = 16;
                    this.maplng = data.longitude;
                    this.maplat = data.latitude;
                    this.map.centerAndZoom(new BMap.Point(this.maplng, this.maplat), this.mapzoom);
                    let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
                    for (let i = 0; i < allOverlay.length; i++) {
                        if (data.deviceUuid && data.deviceUuid == allOverlay[i].id) {
                            allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
                            setTimeout(function () {
                                allOverlay[i].setAnimation(null);
                            }, 1000);
                        } else if (data.cameraName == '案发点' && data.longitude == allOverlay[i].lng) {
                            allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
                            setTimeout(function () {
                                allOverlay[i].setAnimation(null);
                            }, 1000);
                        }
                    }
                    if (this.trajectoryArr.length > 0) {
                        for (let i = 0; i < this.trajectoryArr.length; i++) {
                            let getLongitude = this.trajectoryArr[i].longitude // 获取经度
                            let getLatitude = this.trajectoryArr[i].latitude // 获取纬度
                            this.zuobiao2Pixels(getLongitude, getLatitude, i)
                        }
                    }
                    if (this.showarrPoisArr) {
                        this.loadArrPoisArr(this.mapInfoList)
                    }
                }
            }, 800)
        },
        // 全局搜索的方法
        searchAll() {
            let data = {
                caseUuid: this.$route.query.caseUuid,
                deviceUuid: '',
                type: 1
            }
            this.$http.get('vsas/task/getTaskCount', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data > 0) {
                        //  如果是格林深瞳的方法，就调用格林深瞳的方法
                        this.settargetToSearchImg({});
                        if (this.showVideoStruct == 'true') {
                            this.showAllTarget = true;
                        }
                        // 如果是中科院的,就执行中科院的方法
                        else if (this.zkyStructureSwitch == 'true') {
                            this.showAllTargetZky = true;
                        }
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: '当前没有结构化任务！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                }
            }).catch(() => {
                this.$notify({
                    type: 'warning',
                    message: '当前没有结构化任务！',
                    position: 'bottom-right',
                    duration: 3000
                });
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.cameraName.indexOf(value) !== -1;
        },
        handleClick() {
            const tree = this.$refs.tree;
            tree.$children.forEach(item => item.expanded = false);
        },
        // 碰撞手机轨迹
        targetTrack(val) {
            if (this.range > 300) {
                this.$notify({
                    type: "warning",
                    message: "电围距离不得大于300",
                    position: "bottom-right",
                    duration: 3000
                })
                return
            }
            if (this.range == '') {
                this.$notify({
                    type: "warning",
                    message: "请输入电围感应距离",
                    position: "bottom-right",
                    duration: 3000
                })
                return
            }
            this.spaceVideoArrowFlag = 2 // 点击时关闭案情交流弹层
            this.showPhoneTrack = true
            let points = []
            for (let i = 0; i < this.trajectoryArr.length; i++) {
                let obj = {}
                obj.latitude = this.trajectoryArr[i].latitude
                obj.longitude = this.trajectoryArr[i].longitude
                obj.time = this.getTrajectory(this.trajectoryArr[i].videoStartTime || this.trajectoryArr[i].absoluteTime, Number(this.trajectoryArr[i].relativeTime), Number(this.trajectoryArr[i].offset))
                points.push(obj)
            }
            let bbb = JSON.stringify(points)
            let data = {
                caseUuid: this.caseUuid,
                suspicionUuids: this.suspicionUuids,
                beginTime: "",
                endTime: "",
                range: this.range,
                points: bbb,
                page: 1,
                pageSize: "",
                imsi: "",
                pointNum: "",
            }
            data = this.$qs.stringify(data);
            this.$http.post("vsas/baseStation/collision", data).then(res => {
                if (res.data.code == 200) {
                    let obj = {}
                    obj.showBound = val // 传过去的标识符
                    obj.sendUuids = this.suspicionUuids // 嫌疑id
                    obj.ranges = Number(this.range)
                    obj.pList = res.data // 传过去的值
                    obj.pointes = bbb
                    this.electricData = obj
                } else if (res.data.code == 400) {
                    this.$notify({
                        type: "warning",
                        message: "没有匹配的点位数据",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: "error",
                        message: "获取数据失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        trajectoryList() {
            this.allTrackData = []
            let data = {
                caseUuid: this.$route.query.caseUuid,
            };
            this.$http.get("pca/casemng/suspicion/mark/allTrajectory", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    for (const key in res.data.data) { // 数据过滤
                        this.allTrackData.push(res.data.data[key]);
                    }
                }
            });
        },
        /**
         * @description: 标注和以图搜图显示的底部页面切换
         * @param {type}
         * @return:
         */
        checkSearchLable() {
            this.skynetFlag = null
            this.openPolyNavigation = false
            this.isTrajectory = false;
            this.showarrPoisArr = false;
            this.showPhoneTrack = false;
            this.suspicionUuids = ''
            this.spaceSkyArrow = false;
            this.spaceVideoArrowFlag = 1;
            this.changeSuspicionObj(false)
            this.closeSearchImg();
            this.closeSearchCarImg();
        },
        //判断当前案件是否有标注
        checkCaseHaveLable() {
            if (this.SuspicionObjLists.length) {
                this.openlable = true;
            } else {
                this.$notify({
                    type: 'warning',
                    message: '当前案件暂无标注！',
                    position: 'bottom-right',
                    duration: 3000
                })
                return
            }
        },
        // 打开标注碰撞页面
        openlableDemo() {
            if (this.checklable == 0) {
                // this.getDeviceLableLists()
            }
            this.openlable = false
            this.labelcollidedeviceList = []
            for (let i = 0; i < this.pointList.length; i++) {
                if (this.pointList[i].cameraType == 1 || this.pointList[i].cameraType == 4 || this.pointList[i].cameraType == 5) {
                    this.labelcollidedeviceList.push(this.pointList[i])
                }
            }
            if (this.labelcollidedeviceList.length) {
                this.openlablecollide = true
            } else {
                this.$notify({
                    type: "warning",
                    message: "暂无数据",
                    position: "bottom-right",
                    duration: 3000
                })
                return
            }
        },
        childbylablecolli() {
            this.openlablecollide = false
        },

        //打开全局案件
        openGlobalCase(){
            this.showGlobalCase = true
        },
        childByGlobalCase(val){
            this.showGlobalCase = val
        },

        //打开全局检索
        openGlobalRetrieve(){
            this.showGlobalRetrieve = true
        },
        childByGlobalRetrieve(val){
            this.showGlobalRetrieve = val
        },
    }
};

export default mixins;
