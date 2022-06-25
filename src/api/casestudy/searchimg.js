import {
    mapActions,
    mapMutations,
    mapState,
    mapGetters
} from "vuex";
import _ from 'lodash'
const mixins = {
    data() {
        return {
            dialogVisible: false, //打开模态框
            showSkynet: false,
            openSearchImg: false, //显示以图搜图的模块
            feacthImg: "", //以图搜图识别后的图片
            bigsearchimg: "", //识别之后的大图
            unit: 1, //识别图片做自适应的时候的比例
            currentCar: null, //当前选中的识别坐标
            currentper: null, //当前选中的识别坐标
            currentbic: null, //当前选中的识别坐标
            searchresult: {}, //要搜索的结果，就是在以图搜图小窗口展示的信息
            recodeResult: {},
            // beginData: this.getEarlierDate(), // 开始时间
            // endData: this.getCurrentDate(), // 结束时间
            beginData: "", // 开始时间
            endData: "", // 结束时间
            color: [
                "red",
                "blue",
                "orange",
                "pink",
                "black",
                "green",
                "yellow",
                "gray",
                "purple"
            ],
            trackList: [], // 轨迹数组
            trajectoryName: "", // 轨迹名称
            description: "", // 轨迹描述
            showfaceimg: false,
            clickRecodeimg: true,
            imgPicInquire: false, // 默认不显示图片
            glstSearchImg: '', // glst开关
            zkySearchImg: '', // zky开关
            allfeature: '',
            dialogDownLoad: false,
            approveProportion: 0,
            zipProportion: 0,
            timeId: null, // 定时器
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            trackDownImg: [],
            isShowRunLine: true,
            isShowRunLineFlag: false,
            tagDialog: false,
            tagDataList: [],
            tagConvertIds: [],
            loading: null, //加载
            radio1: 1, // 默认序号
            HD: true, // 高清
            thumbnail: true, // 缩略图
            userId: '',
            showLinecurrent: false,
            fromPage: '1',
            includeThreshold: 70,
            ifOneData: true,
            isSave: false,
            trackDialogVisible: false,
            range: 300, // 电围感应距离
            showflag: false // 是否能点击下载的标识
        };
    },
    watch: {
        //监听模态框是否打开
        dialogVisible() {
            this.$parent.drag();
        },
        //监听保存窗口是否打开
        showSkynet() {
            this.$parent.drag();
        },
        //监听以图搜图的创建是否打开
        showSearchImg(val) {
            this.openSearchImg = val;
        },
        /*
          8月10号
          陈秀峰
         //监听打开以图搜图的页面并执行方法
        */
        openSearchImg(val) {
            this.$nextTick(() => {
                // 打开之前先清空图片
                // let imgs = document.getElementById("imgUrlShow"); //图片大小
                this.feacthImg = ''
                // imgs.style.width = '';
                // imgs.style.height = '';
                //获取当前案件的中的视频的最小开始时间以及最大结束时间
                setTimeout(() => {
                    //如果以图搜图的页面打开了就执行以下方法
                    if (val) {
                        //执行获取当前案件下的最小文件开始时间和结束时间
                        this.getTimeTobe(this.$route.query.caseUuid);
                        this.glstSearchImg = sessionStorage.getItem('glstStructureSwitch') // 格林森瞳结构化
                        this.zkySearchImg = sessionStorage.getItem('zkyStructureSwitch') // 中科院结构化
                        //判断是否有以图搜图款速连接过来的值
                        //表示是传过来的值
                        //如果传过来的值有案件ID则表示是结构化结果过来的结果，直接进行以图搜图
                        //否则是标注过来先进行识别，然后再选择目标
                        if (this.glstfeature.caseUuid) {
                            this.feacthImg = this.glstfeature.traceImgUrl;
                            this.searchresult = this.glstfeature;
                            this.zkyFeature = this.searchresult.Features
                            setTimeout(() => {
                                this.showfaceimg = true;
                            }, 50)
                            this.isShowRunLineFlag = false
                        } else if (this.isshowTargetImg) {
                            console.log('有没有进这个');
                            this.dialogVisible = true
                            this.showfaceimg = false
                            this.isShowRunLineFlag = false
                            if (this.searchImgBtn.snapshotFile == null) {
                                this.bigsearchimg = this.searchImgBtn.videoCaptureUrl
                            } else {
                                this.bigsearchimg = this.searchImgBtn.snapshotFile
                            }
                            if (this.glstSearchImg == 'true') { // 格林深瞳方法
                                this.ImgPicWh()
                            } else if (this.zkySearchImg == 'true') { // 中科院方法
                                this.zkyImgPicWh()
                            }

                        } else {
                            this.showfaceimg = false;
                            this.dialogVisible = false;
                        }
                        this.getCaseDeviceId()
                    } else {
                        this.dialogVisible = false
                        this.recodeResult = {}
                        this.trajectoryName = ''
                        this.description = ''
                        this.feacthImg = "";
                        this.showSkynet = false;
                        this.searchresult = "";
                        this.bigsearchimg = "";
                        this.imgPicInquire = false;
                        this.showfaceimg = false;
                        this.setglstfeature({}); //设置值为空
                        this.trackList = [];
                        this.currentCar = null //当前选中的识别坐标
                        this.currentper = null //当前选中的识别坐标
                        this.currentbic = null //当前选中的识别坐标
                    }
                }, 100);
            })
        }
    },
    mounted() {
        this.isShowRunLineFlag = false
        this.userId = this.$storage.getSession('userInfo').userId
    },
    computed: {
        ...mapGetters([
            "glstfeature", //结构化一次排查返回的筛选条件信息
            'searchImgBtn', // 以图搜图图片
            'zkyNum', // 中科院结构化点击
        ]),
        //图片上所有车辆的位置坐标列表
        carList() {
            let cList = [];
            if (this.recodeResult.Result) {
                //判断结果返回查看是否存在车辆信息，如果存在，就循环车辆信息，获取所有的车辆坐标
                if (this.recodeResult.Result.Vehicles) {
                    for (let i = 0; i < this.recodeResult.Result.Vehicles.length; i++) {
                        cList.push({
                            leftTopX: this.$commons.isEmpty(this.recodeResult.Result.Vehicles[i].Img.Cutboard.X) ? 0 : this.recodeResult.Result.Vehicles[i].Img.Cutboard.X,
                            leftTopY: this.$commons.isEmpty(this.recodeResult.Result.Vehicles[i].Img.Cutboard.Y) ? 0 : this.recodeResult.Result.Vehicles[i].Img.Cutboard.Y,
                            rightBtmX: this.recodeResult.Result.Vehicles[i].Img.Cutboard.Width,
                            rightBtmY: this.recodeResult.Result.Vehicles[i].Img.Cutboard.Height
                        });
                    }
                }
            }
            return cList;
        },
        //图片上所有人的位置坐标列表
        //判断结果返回查看是否存在人的信息，如果存在，就循环人的信息，获取所有的人的坐标
        perList() {
            let cList = [];
            if (this.recodeResult.Result) {
                if (this.recodeResult.Result.Pedestrian) {
                    for (let i = 0; i < this.recodeResult.Result.Pedestrian.length; i++) {
                        cList.push({
                            leftTopX: this.$commons.isEmpty(this.recodeResult.Result.Pedestrian[i].Img.Cutboard.X) ? 0 : this.recodeResult.Result.Pedestrian[i].Img.Cutboard.X,
                            leftTopY: this.$commons.isEmpty(this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Y) ? 0 : this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Y,
                            rightBtmX: this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Width,
                            rightBtmY: this.recodeResult.Result.Pedestrian[i].Img.Cutboard.Height
                        });
                    }
                }
            }
            return cList;
        },

        //判断结果返回查看是否存在骑车人信息，如果存在，就循环骑车人信息，获取所有的骑车人坐标
        bicList() {
            let cList = [];
            if (this.recodeResult.Result) {
                if (this.recodeResult.Result.NonMotorVehicles) {
                    for (let i = 0; i < this.recodeResult.Result.NonMotorVehicles.length; i++) {
                        cList.push({
                            leftTopX: this.$commons.isEmpty(this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.X) ? 0 : this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.X,
                            leftTopY: this.$commons.isEmpty(this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Y) ? 0 : this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Y,
                            rightBtmX: this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Width,
                            rightBtmY: this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard.Height
                        });
                    }
                }
            }
            return cList;
        }
    },
    //父组件传过来的值
    props: {
        showSearchImg: Boolean,
        rangeList: Array,
        gosearchtype: Number,
        isshowTargetImg: Boolean,
        runSearchList: Array,
        getTargetType: String
    },
    methods: {
        ...mapMutations([
            "setglstfeature" //获取单个的结构化信息，然后添加特征值
        ]),
        //关闭模态框
        closeDia() {
            this.dialogVisible = false
            this.$parent.clearDrawing();
        },
        formatTooltip(val) {
            return '图片相似度阈值调整：' + val + '%'
        },
        includeThresholdHandler(val) {
            this.includeThreshold = val
        },
        glstaaa() {

        },
        // 点击下载验证
        drawLoadPic() {
            if (!this.isShowRunLineFlag || this.feacthImg == "" || this.feacthImg == null) {
                this.$notify({
                    type: "warning",
                    message: "请上传图片再点击开始",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            if (this.showflag) {
                this.$notify({
                    type: "warning",
                    message: "请点击开始搜索出轨迹后再执行此功能",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            this.dialogDownLoad = true
        },
        // 以图搜图下载图片
        downLoadPic() {
            let featureFlag = 1;
            if (this.glstfeature.vehicleUuid) {
                featureFlag = 2;
            } else if (this.glstfeature.personUuid) {
                featureFlag = 1;
            } else if (this.glstfeature.bicycleUuid) {
                featureFlag = 3;
            } else {
                if (this.currentCar != null) {
                    //表示车辆
                    featureFlag = 2;
                } else if (this.currentper != null) {
                    //表示行人
                    featureFlag = 1;
                } else if (this.currentbic != null) {
                    //表示骑车人
                    featureFlag = 3;
                }
            };
            if (this.glstSearchImg == 'true') {
                this.allfeature = this.searchresult.Features //格林深瞳特征
            } else if (this.zkySearchImg == 'true') {
                if (this.zkyNum == 2) { // 等于二表示直接进行结构化特征
                    this.allfeature = this.glstfeature.Features // 中科院特征
                } else {
                    this.allfeature = this.zkyFeature // 中科院传过来的特征
                }
            }
            let data = {
                curUserId: this.userId,
                thumbnail: this.thumbnail == true ? 1 : 0, // 缩略图
                includeThreshold: this.includeThreshold / 100, // 比对阈值
                HD: this.HD == true ? 1 : 0, // 高清图
                caseUuid: this.$route.query.caseUuid,
                searchType: this.gosearchtype, // 查询类型：0：正常以图搜图，1：框选区域以图搜图
                feature: this.allfeature, // 特征
                deviceUuids: this.rangeList.join(","), // 框选范围传过来的值
                featureFlag: featureFlag,
                startTime: this.beginData,
                endTime: this.endData,
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/structure/download/structure/search', data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '下载任务创建成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.dialogDownLoad = false
                } else if (res.data.code == 100) {
                    this.$notify({
                        type: 'warning',
                        message: '查询内容为空！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '下载任务创建失败！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1;
            // this.getMsg();
        },
        handleCurrentChange(val) {
            this.currentPage = val
            // this.getMsg();
        },
        // 以图搜图关闭图片
        closeloadia() {

        },
        // 获取当前案件下的所有文件的最小时间和最大时间，并加载时间插件
        getTimeTobe(id) {
            let data = {
                caseUuid: id
            };
            this.$http.get("vsas/structure/getDate", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.beginData = res.data.data.startTime;
                    this.endData = res.data.data.endTime;
                    setTimeout(() => {
                        this.OpenTheTime4("#beginMark1", "#endMark1");
                    }, 100);
                }
            });
        },
        //打开模态框
        opendia() {
            this.$nextTick(() => {
                //打开模态框的时候判断当前是否有选中目标，如果没有就清空canvas
                if (this.currentCar == null && this.currentper == null && this.currentbic == null) {
                    let searchCanvas = document.getElementById("searchcanvas");
                    searchCanvas.setAttribute("width", 0);
                    searchCanvas.setAttribute("height", 0);
                }
                this.glstSearchImg = sessionStorage.getItem('glstStructureSwitch') // 格林森瞳结构化
                this.zkySearchImg = sessionStorage.getItem('zkyStructureSwitch') // 中科院结构化
            });;
        },
        //获取当前案件下的所有卡口点
        getCaseDeviceId() {
            this.newpoint = [];
            let data = {
                caseUuid: this.$route.query.caseUuid,
            };
            this.$http.get('pca/casemng/device/rel/query', {
                    params: data
                })
                .then((res) => {
                    let data = [];
                    for (let i in res.data.data) {
                        if (res.data.data[i].cameraType != 8 && res.data.data[i].cameraType != null) {
                            this.newpoint.push(res.data.data[i])
                        }
                    };
                });
        },
        // 关闭以图搜图
        closeShowImg() {
            this.showflag = false;
            this.openSearchImg = false;
            this.isShowRunLineFlag = false;
            // this.changeSuspicionObj(this.suspicionUuids)
            this.InitMainMap(mapContent)

        },

        /**
         * 打开保存轨迹窗口
         * 如果以图搜图能搜出来结果，则能保存轨迹
         */
        saveSkynet() {
            if (this.trackList.length) {
                this.showSkynet = true;
                this.trajectoryName = ''
                this.description = ''
            } else {
                this.$notify({
                    type: "warning",
                    message: "请上传图片并搜索轨迹",
                    position: "bottom-right",
                    duration: 3000
                });
            }
        },

        // 点击范围执行百度地图框选方法
        drawArea() {
            if (this.feacthImg == "" || this.feacthImg == null) {
                this.$notify({
                    type: "warning",
                    message: "请点击开始搜索出轨迹后再执行此功能",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            //执行父元素的框选方法
            this.$parent.drawReact(this.newpoint);
        },
        /**
         *以图搜图开始功能第一步
         *通用上传接口，返回图片的url
         */
        beforeAvatarUpload(file) {
            if (file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png") {
                this.$notify({
                    type: 'warning',
                    message: '上传图片只能是 png,jpg,jpeg,bmp格式！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return false;
            }
            this.clickRecodeimg = true
            this.clearRect();
            let formData = new FormData();
            formData.append("files", file);
            console.log(file, "查看文件")
            this.$http({
                url: "/sms/uploadFile/upload",
                method: "post",
                data: formData
            }).then(res => {
                if (res.data.code == 200) {
                    this.bigsearchimg = res.data.data[0];
                    if (this.glstSearchImg == 'true') { //执行格灵深瞳的识别方法
                        // this.bigsearchimg = res.data.data[0];
                        this.ImgPicWh()
                    } else if (this.zkySearchImg == 'true') { //执行中科院的识别方法
                        this.zkyImgPicWh()
                    }
                } else if (res.data.code == 300) {
                    this.$notify({
                        type: "error",
                        message: "图片保存失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: "error",
                        message: "图片上传失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        //以图搜图开始功能第二步
        //执行格林深瞳以图搜图的识别方法
        ImgPicWh() {
            // debugger
            var img = new Image();
            img.onload = () => {
                let imgs = document.getElementById("searchBigimg");
                let divs = document.getElementById("searchmain");
                //图片加载完成之后执行图片自适应的方法 传入图片的dom和图片父元素的dom
                this.searchImgWh(imgs, divs);
            };
            img.src = this.bigsearchimg;
            let data = {
                imageUrl: this.bigsearchimg, //图片的url地址
                recFlag: 1, //1:识别人，非机动车，车辆，2：识别人脸
                detectMode: 0 //0：大图（默认用这个），1：小图，2：大图小图都识别（性能差）
            };
            data = this.$qs.stringify(data);
            this.$http.post("/vsas/structure/recImage", data).then(reponse => {
                if (reponse.data.code == 200) {
                    //如果识别的图片中没有人，车，骑车人的数据则提示图片识别失败
                    this.recodeResult = JSON.parse(reponse.data.data);
                    if (this.recodeResult.Result.Vehicles == undefined && this.recodeResult.Result.Pedestrian == undefined &&
                        this.recodeResult.Result.NonMotorVehicles == undefined) {
                        this.$notify({
                            type: "warning",
                            message: "图片识别失败",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return
                    } else {
                        this.clickRecodeimg = false
                    }
                    //执行框选方法，并自动框选第一个目标
                    this.initCanvas();
                } else if (reponse.data.code == 100) {
                    this.$notify({
                        type: "warning",
                        message: "图片识别失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },

        //2. 图片上传完了以后执行图片自适应的方法
        //执行图片的自适应
        searchImgWh(imgs, divs) {
            //获取图片的原始宽高以及缩放后的宽厚，图片父元素的宽高
            //通过比率来计算图片是否是宽度自适应还是高度自适应
            var imgw = imgs.naturalWidth; //图片的原始宽度
            var imgh = imgs.naturalHeight; //图片的原始高度
            var retw = divs.clientWidth;
            var reth = divs.clientHeight;
            var canvas = document.getElementById("searchcanvas");
            setTimeout(() => {
                canvas.setAttribute("width", imgs.width);
                canvas.setAttribute("height", imgs.height);
            }, 0);
            /// div宽高 除以图片的实际宽高
            //如果小于比率则是图片的宽度100% 高度自适应，反之高度100% 宽度自适应
            if (retw / reth < imgw / imgh) {
                imgs.style.width = "100%";
                imgs.style.height = "auto";
                this.unit = imgw / retw;
            } else {
                imgs.style.height = "100%";
                imgs.style.width = "auto";
                this.unit = imgh / reth;
            }
            this.imgPicInquire = true
        },
        //执行框选的方法框出第一个目标
        initCanvas() {
            //第一次进入识别信息的时候，判断数据是否存在，如果存在车辆，就默认选中一个车辆信息
            //如果车辆不存在就执行骑车人的第一个信息，如果骑车人信息不存在就执行人的信息，否则返回null
            if (this.recodeResult.Result.Vehicles) {
                this.currentCar = 0;
            } else if (this.recodeResult.Result.Pedestrian) {
                this.currentper = 0;
            } else if (this.recodeResult.Result.NonMotorVehicles) {
                this.currentbic = 0;
            } else {
                this.currentCar = null;
                this.currentper = null;
                this.currentbic = null;
            }
            //如果有人车骑车人的任意一个信息，则传值到第0个索引，并框选目标
            this.drawCarInfo(0);
        },
        //执行完识别后先清空canvas幕布，然后框选出第一个目标，以及其他所有的目标
        drawCarInfo(pIndex) {
            this.clearRect(); //清除Canvas
            // 格林森瞳
            if (this.glstSearchImg == 'true') {
                this.drawAlltarget(); //框选所有的目标
                this.drawfirst(pIndex, "red"); //框选第一个目标
            } else if (this.zkySearchImg == 'true') { // 中科院
                this.zkydrawAlltarget()
                this.zkydrawfirst(pIndex, "red"); //框选第一个目标
            }
        },
        //框选出所有识别出来的人，车，骑车人
        drawAlltarget() {
            if (this.recodeResult.Result.Vehicles) {
                //表示结果有车辆信息，就画出所有的车的信息
                for (let i = 0; i < this.recodeResult.Result.Vehicles.length; i++) {
                    //执行画框的方法
                    this.drawRect(this.recodeResult.Result.Vehicles[i].Img.Cutboard, "yellow");
                }
            }
            if (this.recodeResult.Result.Pedestrian) {
                //表示结果有人的信息，就画出所有的人的信息
                for (let i = 0; i < this.recodeResult.Result.Pedestrian.length; i++) {
                    //执行画框的方法
                    this.drawRect(this.recodeResult.Result.Pedestrian[i].Img.Cutboard, "yellow");
                }

            }
            if (this.recodeResult.Result.NonMotorVehicles) {
                //表示结果有骑车人的信息，就画出所有的骑车人的信息
                for (let i = 0; i < this.recodeResult.Result.NonMotorVehicles.length; i++) {
                    //执行画框的方法
                    this.drawRect(this.recodeResult.Result.NonMotorVehicles[i].Img.Cutboard, "yellow");
                }
            }
        },
        //框选第一个目标
        drawfirst(pIndex, color) {
            if (this.recodeResult.Result.Vehicles && this.currentCar != null) {
                //表示结果有车辆信息，就执行车辆的第一个
                this.drawRect(this.recodeResult.Result.Vehicles[pIndex].Img.Cutboard, color);
                return
            } else if (this.recodeResult.Result.Pedestrian && this.currentper != null) {
                //表示结果有人的信息，就执行车辆的第一个
                this.drawRect(this.recodeResult.Result.Pedestrian[pIndex].Img.Cutboard, color);
                return
            } else if (this.recodeResult.Result.NonMotorVehicles && this.currentbic != null) {
                //表示结果有骑车人的信息，就执行车辆的第一个
                this.drawRect(this.recodeResult.Result.NonMotorVehicles[pIndex].Img.Cutboard, color);
                return
            }
        },
        //清空所有目标和canvas
        clearRect() {
            let searchCanvas = document.getElementById("searchcanvas");
            let sCtx = searchCanvas.getContext("2d");
            sCtx.clearRect(0, 0, searchCanvas.clientWidth, searchCanvas.clientWidth);
        },
        //执行框选的方法
        drawRect(pos, color) {
            let searchcanvas = document.getElementById("searchcanvas");
            let sCtx = searchcanvas.getContext("2d");
            if (this.glstSearchImg == 'true') {
                let x = (this.$commons.isEmpty(pos.X) ? 0 : pos.X) / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
                let y = (this.$commons.isEmpty(pos.Y) ? 0 : pos.Y) / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
                let w = pos.Width / this.unit;
                let h = pos.Height / this.unit;
                sCtx.strokeStyle = color;
                sCtx.strokeRect(x, y, w, h);
            } else if (this.zkySearchImg == 'true') {
                this.zkyDraw(pos, color)
            }
        },
        //点击div 获取当前点击的位置来计算当前点击的是哪一个区域，并自动切换框选目标
        choiceCar(ev) {
            this.currentCar = null;
            this.currentper = null;
            this.currentbic = null;
            let offsetX = ev.offsetX; //当前点击的坐标位置
            let offsetY = ev.offsetY; //当前点击的坐标的位置
            //如果有车辆的信息，则判断当前的坐标
            // 格林深瞳方法
            if (this.glstSearchImg == 'true') {
                if (this.carList.length > 0) {
                    for (let i = 0; i < this.carList.length; i++) {
                        //如果当前点击的坐标位置刚好在格林深瞳返回的坐标之中，给当前索引赋值，并框选目标
                        if (
                            this.carList[i].leftTopX / this.unit < offsetX &&
                            (this.carList[i].leftTopX + this.carList[i].rightBtmX) / this.unit > offsetX &&
                            this.carList[i].leftTopY / this.unit < offsetY &&
                            (this.carList[i].leftTopY + this.carList[i].rightBtmY) / this.unit > offsetY) {
                            this.currentCar = i;
                            this.drawCarInfo(this.currentCar);
                        }
                    }
                }
                if (this.perList.length > 0) {
                    console.log(this.perList, '人的数量');
                    for (let i = 0; i < this.perList.length; i++) {
                        if (
                            this.perList[i].leftTopX / this.unit < offsetX &&
                            (this.perList[i].leftTopX + this.perList[i].rightBtmX) / this.unit > offsetX &&
                            this.perList[i].leftTopY / this.unit < offsetY &&
                            (this.perList[i].leftTopY + this.perList[i].rightBtmY) / this.unit > offsetY) {
                            this.currentper = i;
                            this.drawCarInfo(this.currentper);
                        }
                    }
                }
                if (this.bicList.length > 0) {
                    for (let i = 0; i < this.bicList.length; i++) {
                        if (
                            this.bicList[i].leftTopX / this.unit < offsetX &&
                            (this.bicList[i].leftTopX + this.bicList[i].rightBtmX) / this.unit >
                            offsetX &&
                            this.bicList[i].leftTopY / this.unit < offsetY &&
                            (this.bicList[i].leftTopY + this.bicList[i].rightBtmY) / this.unit >
                            offsetY
                        ) {
                            this.currentbic = i;
                            this.drawCarInfo(this.currentbic);
                        }
                    }
                }
            } else if (this.zkySearchImg == 'true') {
                if (this.zkyCarList.length > 0) {
                    for (let i = 0; i < this.zkyCarList.length; i++) {
                        //如果当前点击的坐标位置刚好在格林深瞳返回的坐标之中，给当前索引赋值，并框选目标
                        if (
                            this.zkyCarList[i].leftTopX / this.unit < offsetX &&
                            (this.zkyCarList[i].leftTopX + this.zkyCarList[i].rightBtmX) / this.unit > offsetX &&
                            this.zkyCarList[i].leftTopY / this.unit < offsetY &&
                            (this.zkyCarList[i].leftTopY + this.zkyCarList[i].rightBtmY) / this.unit > offsetY) {
                            this.currentCar = i;
                            this.drawCarInfo(this.currentCar);
                            return
                        }
                    }

                }
                if (this.zkyPerList.length > 0) {
                    if (this.currentbic == 0 || this.currentbic) {
                        return
                    }
                    for (let i = 0; i < this.zkyPerList.length; i++) {
                        if (
                            this.zkyPerList[i].leftTopX / this.unit < offsetX &&
                            (this.zkyPerList[i].leftTopX + this.zkyPerList[i].rightBtmX) / this.unit > offsetX &&
                            this.zkyPerList[i].leftTopY / this.unit < offsetY &&
                            (this.zkyPerList[i].leftTopY + this.zkyPerList[i].rightBtmY) / this.unit > offsetY) {
                            this.currentper = i;
                            this.drawCarInfo(this.currentper);
                            return
                        }
                    }

                }
                if (this.zkyBicList.length > 0) {
                    if (this.currentper == 0 || this.currentper) {
                        return
                    }
                    for (let i = 0; i < this.zkyBicList.length; i++) {
                        if (
                            this.zkyBicList[i].leftTopX / this.unit < offsetX &&
                            (this.zkyBicList[i].leftTopX + this.zkyBicList[i].rightBtmX) / this.unit >
                            offsetX &&
                            this.zkyBicList[i].leftTopY / this.unit < offsetY &&
                            (this.zkyBicList[i].leftTopY + this.zkyBicList[i].rightBtmY) / this.unit >
                            offsetY
                        ) {
                            this.currentbic = i;
                            this.drawCarInfo(this.currentbic);
                            return
                        }
                    }

                }
            }
        },
        //1.把当前选中的图片结果得到
        clickCanvasImg() {
            this.dialogVisible = false;
            //设置传过来的以图搜图的值是空的
            this.setglstfeature({}); //设置值为空
            //如果识别出来的结果没有人车骑车人就不把图片放入以图搜图的页面中
            //如果都是null的话则表示没有识别出来目标
            //如果this.currentCar有值就放入车辆的数据，
            //如果this.currentper有值就放入人的数据，
            //如果this.currentbic有值就放入骑车人的数据，
            if (this.glstSearchImg == 'true') {
                if (this.currentCar == null && this.currentper == null && this.currentbic == null) {
                    return
                } else if (this.currentCar != null) {
                    this.searchresult = this.recodeResult.Result.Vehicles[this.currentCar];
                } else if (this.currentper != null) {
                    this.searchresult = this.recodeResult.Result.Pedestrian[this.currentper];
                } else if (this.currentbic != null) {
                    this.searchresult = this.recodeResult.Result.NonMotorVehicles[this.currentbic];
                }
                this.feacthImg = this.recodeResult.Result.Image.Data.URI;
                this.svaeImg(this.searchresult);
                this.$emit('childByClick', '')
            } else if (this.zkySearchImg == 'true') {
                this.iszkyImgResult()
            }
        },
        //2.把当前选中的结果写入到以图搜图的页面中去
        svaeImg(row) {
            //获取图片的DOM以及当前以图搜图展示的DOM元素
            let imgs = document.getElementById("imgUrlShow"); //图片大小
            // console.log(imgs, "这个图片的原始大小");
            // return
            let imgBox = document.getElementById("searchsmallImg"); //div大小
            let leftTopX = this.$commons.isEmpty(row.Img.Cutboard.X) ? 0 : row.Img.Cutboard.X; //目标相对图片的横坐标
            let leftTopY = this.$commons.isEmpty(row.Img.Cutboard.Y) ? 0 : row.Img.Cutboard.Y; //目标相对图片的纵坐标
            let imgw = row.Img.Cutboard.Width; //目标相对图片的宽度
            let imgh = row.Img.Cutboard.Height; //目标相对图片高度
            let retw = imgBox.clientWidth; //div的实际宽度
            let reth = imgBox.clientHeight; //div的实际高度
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
            imgs.style.width = this.recodeResult.Result.Image.Data.Width / unit + "px";
            imgs.style.height = this.recodeResult.Result.Image.Data.Height / unit + "px";
            imgs.style.top = -(leftTopY / unit) + posTop + "px";
            imgs.style.left = -(leftTopX / unit) + posLeft + "px";
        },
        //点击开始按钮开始进行以图搜图功能
        beginSearch() {
            if (this.$parent.drawingManager != null && this.rangeList.length == 0) {
                this.$parent.clearDrawing()
                this.$notify({
                    type: "warning",
                    message: "暂无轨迹",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            this.isSave = false
            this.showLinecurrent = false
            this.isShowRunLineFlag = true
            this.$emit("isShowTrajectoryArr", false);
            this.trajectoryArr = []
            if (this.feacthImg == "" || this.feacthImg == null) {
                this.$notify({
                    type: "warning",
                    message: "请上传图片再点击开始",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在加载！"
            });
            let featureFlag = 1;
            this.showflag = false
            //1：行人，2：车辆，3：骑车人，4：人脸
            //this.glstfeature表示是结构化目标快捷以图搜图传过来的图片
            //来判断当前对象是人还是车还是骑车人
            if (this.glstfeature.vehicleUuid) {
                featureFlag = 2;
            } else if (this.glstfeature.personUuid) {
                featureFlag = 1;
            } else if (this.glstfeature.bicycleUuid) {
                featureFlag = 3;
            } else {
                if (this.currentCar != null) {
                    //表示车辆
                    featureFlag = 2;
                } else if (this.currentper != null) {
                    //表示行人
                    featureFlag = 1;
                } else if (this.currentbic != null) {
                    //表示骑车人
                    featureFlag = 3;
                }
            };
            if (this.glstSearchImg == 'true') {
                this.allfeature = this.searchresult.Features //格林深瞳特征
            } else if (this.zkySearchImg == 'true') {
                if (this.zkyNum == 2) { // 等于二表示直接进行结构化特征
                    this.allfeature = this.glstfeature.Features // 中科院特征
                } else {
                    this.allfeature = this.zkyFeature // 中科院传过来的特征
                }
            }
            let data = {
                feature: this.allfeature, // 特征
                featureFlag: featureFlag, // 特征类型，1：行人，2：车辆，3：骑车人，4：人脸
                caseUuid: this.$route.query.caseUuid,
                searchType: this.gosearchtype, // 查询类型：0：正常以图搜图，1：框选区域以图搜图
                includeThreshold: this.includeThreshold / 100, // 比对阈值
                deviceUuids: this.rangeList.join(","), // 框选范围传过来的值
                startTime: this.beginData,
                endTime: this.endData
            };
            let targetType = ''
            if (featureFlag == 1) {
                targetType = 1
            } else if (featureFlag == 2) {
                targetType = 3
            } else if (featureFlag == 3) {
                targetType = 2
            }
            data = this.$qs.stringify(data);
            this.$http.post("vsas/structure/search", data).then(res => {
                this.loading.close();
                if (res.data.code == 200) {
                    if (res.data.data == null || res.data.data.length == 0) { // 没有数据清空数组
                        this.$parent.clearDrawing();
                        this.trackList = []
                        this.$parent.trajectoryArr = []
                        this.ifOneData = false
                        this.$notify({
                            type: "warning",
                            message: "暂无数据！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    } else {
                        this.trackList = res.data.data;
                        this.tagDataList = this.trackList
                        this.tagDataList.forEach(v => {
                            v.typeFlag = targetType
                        })
                        this.tagDataList[0].typeFlag = targetType
                        let aaa
                        for (let i = 0; i < this.trackList.length; i++) {
                            aaa = this.trackList[i]
                            for (let j = 0; j < aaa.list.length; j++) {
                                this.trackDownImg = aaa.list[j].traceImgUrl
                            }
                        }
                        if (res.data.data.length == 1) {
                            this.ifOneData = false
                        } else {
                            this.ifOneData = true
                        }
                        if (res.data.data < 2) {
                            this.isSave = true
                        }
                        this.$emit("childBySearch", res.data.data, 'img');
                    }
                } else if (res.data.code == 100) {
                    this.$parent.clearDrawing();
                    this.$parent.trajectoryArr = []
                    this.trackList = []
                    this.$notify({
                        type: "warning",
                        message: "暂无数据！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.$parent.clearDrawing();
                    this.trackList = []
                    this.$notify({
                        type: "warning",
                        message: "获取失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        // 转标注
        convertHandler() {
            if (!this.trackList.length) {
                this.$notify({
                    type: "warning",
                    message: "暂无数据！",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            if (this.isShowRunLineFlag && this.feacthImg) {
                this.tagDialog = true
                this.tagConvertIds = []
                for (let i = 0; i < this.runSearchList.length; i++) {
                    if (this.runSearchList[i].vehicleUuid != undefined) {
                        this.tagConvertIds.push(this.runSearchList[i].vehicleUuid)
                    } else if (this.runSearchList[i].personUuid != undefined) {
                        this.tagConvertIds.push(this.runSearchList[i].personUuid)
                    } else if (this.runSearchList[i].bicycleUuid != undefined) {
                        this.tagConvertIds.push(this.runSearchList[i].bicycleUuid)
                    }
                }
                this.tagDataList.targetIds = this.tagConvertIds.join(',')
            } else {
                this.$notify({
                    type: "warning",
                    message: "请点击开始搜索出轨迹后再执行此功能",
                    position: "bottom-right",
                    duration: 3000
                });
            }
        },
        // 碰撞手机轨迹
        phoneTrack(val) {
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
            if (!this.isShowRunLineFlag || !this.feacthImg) {
                this.$notify({
                    type: "warning",
                    message: "请点击开始搜索出轨迹后再执行此功能",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            if (this.trackList.length == 0) {
                this.$notify({
                    type: "warning",
                    message: "暂无数据进行碰撞",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            this.$emit('childByClick', '') // 点击识别出来的图片之后的操作
            let points = []
            for (let i = 0; i < this.runSearchList.length; i++) { //获取经纬度，时间
                let obj = {}
                obj.latitude = this.runSearchList[i].latitude
                obj.longitude = this.runSearchList[i].longitude
                obj.time = this.getTrajectory(this.runSearchList[i].startTime, Number(this.runSearchList[i].appearTime), Number(this.runSearchList[i].offset))
                points.push(obj)
            }
            let bbb = JSON.stringify(points)
            let data = {
                caseUuid: this.$route.query.caseUuid,
                pageSize: 10,
                imsi: '',
                beginTime: this.beginData, // 开始时间
                endTime: this.endData, // 结束时间
                range: this.range,
                points: bbb,
                // pointNum: 0,
                page: 1,
            }
            data = this.$qs.stringify(data);
            this.$http.post("vsas/baseStation/collision", data).then(res => {
                if (res.data.code == 200) {
                    let Obj = {}
                    Obj.trackDate = res.data
                    Obj.pointCount = bbb
                    Obj.ranges = this.range
                    Obj.showBound = val
                    Obj.beginTime = this.beginData
                    Obj.endTime = this.endData
                    this.$emit('isPhoneTrack', true, Obj) // 向子组件传递数据
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
        //重置功能点位信息，时间问题以及地图的搜索轨迹
        resetSearch() {
            if (this.feacthImg == "" || this.feacthImg == null) {
                this.$notify({
                    type: "warning",
                    message: "请先搜索轨迹后再执行此功能！",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            this.$parent.drawingManager = null
            this.showflag = true;
            this.showLinecurrent = false
            this.$parent.clearDrawing();
            this.$parent.runSearchList = []
            this.$parent.mapInfoList = []
            this.$parent.searchRunAllList = []
            this.$parent.slidePiclist = []
            this.range = 300
            // this.feacthImg = "";
            this.trackList = []
            this.beginTime = this.getEarlierDate();
            this.endtime = this.getCurrentDate();
            this.$emit('resetCount', false)
        },
        //关闭以图搜图的页面功能
        closesearimg() {
            this.showfaceimg = false
            this.imgPicInquire = false;
            this.bigsearchimg = '';
            this.feacthImg = '';
            this.drawingManager = null
            this.showflag = false;
            // this.isshowTargetImg = false
            this.spacePointArrowFlag = 1;
            if (this.isShowRunLineFlag) {
                this.$parent.clearDrawing();
                this.isShowRunLineFlag = false
            }
            this.setglstfeature({});
            this.openSearchImg = false;
            this.$emit("childbycolse", false);
            this.$emit("isPhoneTrack", false); // 关闭碰撞轨迹
            //   let imgs = document.getElementById("imgUrlShow"); //图片大小
            //   imgs.style.width = '100%'
            //   imgs.style.height = '100%'
            //   imgs.style.top = 0
            //   imgs.style.left = 0
            // this.changeSuspicionObj(this.suspicionUuids)
            // this.InitMainMap(mapContent)
        },
        //保存轨迹之前验证名称
        gettrajectoryName() {
            if (this.trajectoryName == '' || this.trajectoryName == null) {
                this.$notify({
                    type: "warning",
                    message: "轨迹名称不能为空",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            let data = {
                trajectoryName: this.trajectoryName,
                caseUuid: this.$route.query.caseUuid
            }
            this.$http.get('vsas/structure/checkTrajectoryName', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    this.savetrack();
                } else {
                    this.$notify({
                        type: "warning",
                        message: "轨迹名称重复",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            })
        },
        //保存轨迹到后台
        savetrack() {
            let trajectoryData = [];
            for (let i = 0; i < this.runSearchList.length; i++) {
                if (this.runSearchList[i].vehicleUuid != undefined) {
                    let data = {
                        targetUuid: this.runSearchList[i].vehicleUuid, //目标的对象
                        typeFlag: 3, //类型  1表示的是行人 2表示的是车  3表示骑车人
                        pointUuid: this.runSearchList[i].deviceUuid, //所有的点位ID
                        sortId: i + 1, //排序
                        distance: 0, // 默认为0
                        similarity: this.runSearchList[i].similarity //相似度
                    };
                    trajectoryData.push(data);
                } else if (this.runSearchList[i].personUuid != undefined) {
                    let data = {
                        targetUuid: this.runSearchList[i].personUuid, //目标的对象
                        typeFlag: 1, //类型  1表示的是行人 2表示的是车  3表示骑车人
                        pointUuid: this.runSearchList[i].deviceUuid,
                        sortId: i + 1, //排序
                        distance: 0, // 默认为0
                        similarity: this.runSearchList[i].similarity //相似度
                    };
                    trajectoryData.push(data);
                } else if (this.runSearchList[i].bicycleUuid != undefined) {
                    let data = {
                        targetUuid: this.runSearchList[i].bicycleUuid, //目标的对象
                        typeFlag: 2, //类型  1表示的是行人 2表示的是车  3表示骑车人
                        pointUuid: this.runSearchList[i].deviceUuid,
                        sortId: i + 1, //排序
                        distance: 0, // 默认为0
                        similarity: this.runSearchList[i].similarity //相似度
                    };
                    trajectoryData.push(data);
                }
            }
            trajectoryData = _.uniq(trajectoryData)
            let trajectory = JSON.stringify(trajectoryData);
            let data = {
                trajectoryName: this.trajectoryName, //轨迹名称
                suspicionName: "",
                caseUuid: this.$route.query.caseUuid, //案件ID
                description: this.description, //案件描述
                trajectoryData: trajectory //轨迹列表
            };
            data = this.$qs.stringify(data);
            this.$http.post("vsas/structure/saveTrajectory", data).then(res => {
                if (res.data.code == 200) {
                    this.showSkynet = false;
                    this.$notify({
                        type: "success",
                        message: "轨迹保存成功！",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.showSkynet = false;
                    this.$notify({
                        type: "error",
                        message: "轨迹保存失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });

        },
        // 显示隐藏轨迹
        showRunLine() {
            if (this.isShowRunLineFlag && this.feacthImg) {
                this.showLinecurrent = !this.showLinecurrent
                if (this.showLinecurrent) {
                    this.isShowRunLine = false
                    this.$parent.stop();
                } else {
                    this.isShowRunLine = true
                    this.$parent.show();
                }
            } else {
                this.$notify({
                    type: "warning",
                    message: "请点击开始搜索出轨迹后再执行此功能",
                    position: "bottom-right",
                    duration: 3000
                });
            }
        },
        // 显示隐藏轨迹
        markShowRunLine() {
            if (this.isShowRunLineFlag && this.feacthImg) {
                this.showLinecurrent = false
                this.isShowRunLine = true
                this.$parent.show();
            }
        }
    }
}
export default mixins
