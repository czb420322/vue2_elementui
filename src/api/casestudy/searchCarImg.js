/*
 * @Author: your name
 * @Date: 2020-09-24 10:21:57
 * @LastEditTime : 2020-12-15 11:30:26
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev-dongxihu-zhencha\vacp-wfes\src\api\casestudy\searchCarImg.js
 */
import {
    mapActions,
    mapMutations,
    mapState,
    mapGetters
} from "vuex";
const mixins = {
    data() {
        return {
            openSearchImg: false, //
            dialogVisible: false, //
            feacthImg: "", //图片地址
            beginData: "",
            endData: "",
            clickRecodeimg: false, //
            trajectoryName: "", //轨迹名称
            description: "", //备注信息
            showfaceimg: false, //
            includeThreshold: 30,
            bigsearchimg: "", //识别之后的大图
            imgPicInquire: false, // 默认不显示图片
            zkySearchImg: true, //中科院
            recodeResult: {}, //
            unit: 1, //识别图片做自适应的时候的比例
            currentCar: null, //当前选中的识别坐标
            currentper: null, //当前选中的识别坐标
            currentbic: null, //当前选中的识别坐标
            allfeature: '',
            trackList: [], // 轨迹数组
            newpoints: [],
            testobject: {}, //测试用的
            timeBegin1: '',
            timeEnd1: '',
        };
    },
    props: {
        showSearchCarImg: Boolean,
        gosearchtype: Number,
        rangeList: Array,
        fast: Object,
    },
    watch: {
        showSearchCarImg(val) {
            this.openSearchImg = val;
        },
        openSearchImg(val) {
            if (val) {
                if (this.fast.caseUuid) {
                    this.showfaceimg = false
                    this.testobject = this.fast;
                    this.feacthImg = this.fast.sourceImgUrl;
                    this.allfeature = this.fast.feature;
                    //获取图片的DOM以及当前以图搜图展示的DOM元素
                    this.$nextTick(() => {
                        let image = new Image()
                        image.src = this.fast.sourceImgUrl
                        let imgs = document.getElementById("imgUrlShow"); //图片大小
                        // return
                        let imgBox = document.getElementById("searchsmallImg"); //div大小
                        let leftTopX = this.fast.regionLeft; //目标相对图片的横坐标
                        let leftTopY = this.fast.regionTop; //目标相对图片的纵坐标
                        let imgw = this.fast.regionWidth; //目标相对图片的宽度
                        let imgh = this.fast.regionHeight; //目标相对图片高度
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
                        image.onload = function () {
                            imgs.style.width = image.naturalWidth / unit + "px";
                            imgs.style.height = image.naturalHeight / unit + "px";
                            imgs.style.top = -(leftTopY / unit) + posTop + "px";
                            imgs.style.left = -(leftTopX / unit) + posLeft + "px";
                        }

                        //通过比率以及任务在图片中的位置来计算在DOMdiv中的定位

                    })
                }
                this.$nextTick(() => {
                    this.getTimeTobe(this.$route.query.caseUuid);
                    this.getCaseDeviceId();

                })
            } else {
                this.feacthImg = '';
            }
            // 打开之前清空图片

        },
        fast(val) {},
    },
    computed: {
        ...mapGetters([]),
        //图片上所有车辆的位置坐标列表
        zkyCarList() {
            let cList = [];
            if (this.recodeResult.Result) {
                //判断结果返回查看是否存在车辆信息，如果存在，就循环车辆信息，获取所有的车辆坐标
                if (this.recodeResult.Result[0].Vehicles) {
                    for (let i = 0; i < this.recodeResult.Result[0].Vehicles.length; i++) {
                        cList.push({
                            leftTopX: this.$commons.isEmpty(this.recodeResult.Result[0].Vehicles[i].RegionLeft) ? 0 : this.recodeResult.Result[0].Vehicles[i].RegionLeft,
                            leftTopY: this.$commons.isEmpty(this.recodeResult.Result[0].Vehicles[i].RegionTop) ? 0 : this.recodeResult.Result[0].Vehicles[i].RegionTop,
                            rightBtmX: this.recodeResult.Result[0].Vehicles[i].RegionWidth,
                            rightBtmY: this.recodeResult.Result[0].Vehicles[i].RegionHeight
                        });
                    }
                }
            }

            return cList;
        },
    },

    methods: {
        formatTooltip(val) {
            return "图片相似度阈值调整：" + val + "%";
        },
        //清空所有目标和canvas
        clearRect() {
            var searchCanvas = document.getElementById("searchcarcanvas");
            var sCtx = searchCanvas.getContext("2d");
            sCtx.clearRect(0, 0, searchCanvas.clientWidth, searchCanvas.clientWidth);
        },
        // 中科院画框
        zkyDraw(pos, color) {
            var searchcanvas = document.getElementById("searchcarcanvas");
            let sCtx = searchcanvas.getContext("2d");
            let x = (this.$commons.isEmpty(pos.RegionLeft) ? 0 : pos.RegionLeft) / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
            let y = (this.$commons.isEmpty(pos.RegionTop) ? 0 : pos.RegionTop) / this.unit; //判断GLST返回的坐标是否是undefined 如果是undefined就写0
            let w = pos.RegionWidth / this.unit;
            let h = pos.RegionHeight / this.unit;
            sCtx.strokeStyle = color;
            sCtx.strokeRect(x, y, w, h);
        },
        //执行框选的方法
        drawRect(pos, color) {
            var searchcanvas = document.getElementById("searchcarcanvas");
            var sCtx = searchcanvas.getContext("2d");
            this.zkyDraw(pos, color)
        },
        //关闭以车搜车
        closesearimgs() {
            this.showfaceimg = false
            this.imgPicInquire = false;
            this.bigsearchimg = '';
            this.feacthImg = '';
            this.$parent.clearDrawing();
            this.$emit("childbycolses", false, this.trackList);
            this.$emit("isPhoneTrack", false); // 关闭碰撞轨迹
            this.openSearchImg = false;
            this.$emit("closeSearchCarImg");
        },
        opendia() {
            this.$nextTick(() => {
                // 打开模态框的时候判断当前是否有选中目标，如果没有就清空canvas
                if (this.currentCar == null && this.currentper == null && this.currentbic == null) {
                    var searchCanvas = document.getElementById("searchcarcanvas");
                    searchCanvas.setAttribute("width", 0);
                    searchCanvas.setAttribute("height", 0);
                }
            });
        },
        //获取当前案件下的所有卡口点
        getCaseDeviceId() {
            let data = {
                caseUuid: this.$route.query.caseUuid,
            };
            this.$http.get('pca/casemng/device/rel/query', {
                    params: data
                })
                .then((res) => {
                    let data = [];
                    for (let i in res.data.data) {
                        // if (res.data.data[i].cameraType == 8) {
                        //     this.newpoints.push(res.data.data[i])
                        // }
                        this.newpoints.push(res.data.data[i])
                    }

                });
        },
        // 获取当前案件下的所有文件的最小时间和最大时间，并加载时间插件
        getTimeTobe(id) {
            let data = {
                caseUuid: id
            };
            this.$http.get("vsas/vehicle/dxh/getLimitTime", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data.beginTime == null && res.data.data.endTime == null) {
                        this.beginData = "";
                        this.endData = ""
                    } else {
                        this.beginData = this.getDateStrings(Number(res.data.data.beginTime));
                        this.endData = this.getDateStrings(Number(res.data.data.endTime));
                    }
                    setTimeout(() => {
                        this.OpenTheTime4("#beginMark", "#endMark");
                    }, 100);
                }
            });
        },
        getDateStrings(date) {
            //date 为毫秒数
            let d = new Date(date);
            let mm = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
            let dd = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
            let hh = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
            let MM = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
            let ss = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds();
            return d.getFullYear() + "-" + mm + "-" + dd + " " + hh + ":" + MM + ":" + ss

        },
        closeDia() {
            // this.clearRect()
            // this.bigsearchimg = "";
            this.$parent.clearDrawing();
        },
        //切换识别出来的目标
        //点击div 获取当前点击的位置来计算当前点击的是哪一个区域，并自动切换框选目标
        choiceCar(ev) {
            this.currentCar = null;
            let offsetX = ev.offsetX; //当前点击的坐标位置
            let offsetY = ev.offsetY; //当前点击的坐标的位置
            //如果有车辆的信息，则判断当前的坐标
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
                        this.allfeature = this.recodeResult.Result[0].Vehicles[this.currentCar].Feature
                    }
                }
            }
        },
        // 点击范围执行百度地图款选方法
        drawArea() {
            if (this.feacthImg == "" || this.feacthImg == null) {
                this.$notify({
                    type: "warning",
                    message: "请上传车辆图片并选择目标后再执行此功能",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            //执行框选方法
            this.$parent.drawReact(this.newpoints);
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
            this.$parent.clearDrawing();
            this.$parent.arrPoisArr = []
            this.$parent.slidePiclist = []
            // this.feacthImg = "";
            this.trackList = []
            // this.beginTime = this.getEarlierDate();
            // this.endtime = this.getCurrentDate();
        },
        //点击开始按钮开始进行以图搜图功能
        beginSearch() {
            if (this.feacthImg == "" || this.feacthImg == null) {
                this.$notify({
                    type: "warning",
                    message: "请上传图片再点击开始",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            if (this.beginData == "" || this.endData == "") {
                console.log(this.beginData,this.endData,"着两个");
                this.$notify({
                    type: "warning",
                    message: "请选择开始时间和结束时间！",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            if(this.$parent.drawingManager != null && this.rangeList.length == 0){
                this.$parent.clearDrawing()
                this.$notify({
                    type: "warning",
                    message: "暂无轨迹",
                    position: "bottom-right",
                    duration: 3000
                });
                return
            }
            this.trajectoryArr = []
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在加载！"
            });
            let featureFlag = 5; //卡口车辆默认传5
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

            //定义这个flag为5.专门针对以车搜车的，避免和后面的人脸冲突
            let targetType = 5
            data = this.$qs.stringify(data);
            this.$http.post("vsas/structure/search", data).then(res => {
                this.loading.close();
                if (res.data.code == 200) {
                    if (res.data.data == null || res.data.data.length == 0) { // 没有数据清空数组
                        this.$parent.clearDrawing();
                        this.trackList = []
                        this.$parent.trajectoryArr = []
                        this.$notify({
                            type: "warning",
                            message: "无卡口数据！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    } else {
                        this.trackList = res.data.data;
                        this.tagDataList = this.trackList
                        //给每一个加一个typeFlag为5的属性
                        this.tagDataList.forEach(v => {
                            v.typeFlag = targetType
                        })
                        this.$emit("childBySearch", res.data.data, 'car');
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
        includeThresholdHandler() {},
        clickCanvasImg() {
            this.dialogVisible = false;
            //设置传过来的以图搜图的值是空的
            //   this.setglstfeature({}); //设置值为空
            //如果this.currentCar有值就放入车辆的数据，
            this.iszkyImgResult()
        },
        iszkyImgResult() {
            if (this.currentCar == null) {
                return
            } else if (this.currentCar != null) {
                this.searchresult = this.recodeResult.Result[0].Vehicles[this.currentCar];
            }
            // this.showfaceimg = false
            this.feacthImg = this.recodeResult.Result[0].ImageUri;
            this.zkysvaeImg(this.searchresult);
            // this.$emit('childByClick', '')
        },
        //2.中科院把当前选中的结果写入到以图搜图的页面中去
        zkysvaeImg(row) {
            this.zkyFeature = this.searchresult.Feature
            //获取图片的DOM以及当前以图搜图展示的DOM元素
            this.$nextTick(() => {
                let imgs = document.getElementById("imgUrlShow"); //图片大小
                let imgBox = document.getElementById("searchsmallImg"); //div大小
                let leftTopX = this.$commons.isEmpty(row.RegionLeft) ? 0 : row.RegionLeft; //目标相对图片的横坐标
                let leftTopY = this.$commons.isEmpty(row.RegionTop) ? 0 : row.RegionTop; //目标相对图片的纵坐标
                let imgw = row.RegionWidth; //目标相对图片的宽度
                let imgh = row.RegionHeight; //目标相对图片高度
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
                // 通过比率以及任务在图片中的位置来计算在DOMdiv中的定位
                imgs.style.width = row.SrcImageWidth / unit + "px";
                imgs.style.height = row.SrcImageHeight / unit + "px";
                imgs.style.top = -(leftTopY / unit) + posTop + "px";
                imgs.style.left = -(leftTopX / unit) + posLeft + "px";
            })

        },
        //上传图片
        beforeAvatarUpload(file) {
            if (
                file.type != "image/jpg" &&
                file.type != "image/jpeg" &&
                file.type != "image/bmp" &&
                file.type != "image/png"
            ) {
                this.$notify({
                    type: "warning",
                    message: "上传图片只能是 png,jpg,jpeg,bmp格式！",
                    position: "bottom-right",
                    duration: 3000
                });
                return false;
            }
            //先清空车的信息
            //   this.clearInfoMation();
            this.clickRecodeimg = true;
            this.clearRect();
            let formData = new FormData();
            formData.append("files", file);
            this.$http({
                url: "/sms/uploadFile/upload",
                method: "post",
                data: formData
            }).then(res => {
                console.log(res.data.data);
                if (res.data.code == 200) {
                    this.bigsearchimg = res.data.data[0];
                    this.zkyImgPicWh();
                } else if (res.data.code == 300) {
                    this.clearRect();
                    this.$notify({
                        type: "error",
                        message: "图片保存失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                    this.bigsearchimg = "";
                } else {
                    this.clearRect();
                    this.$notify({
                        type: "error",
                        message: "图片上传失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                    this.bigsearchimg = "";
                }
            });
        },
        searchImgWh(imgs, divs) {
            var canvas = document.getElementById("searchcarcanvas");
            //获取图片的原始宽高以及缩放后的宽厚，图片父元素的宽高
            //通过比率来计算图片是否是宽度自适应还是高度自适应
            var imgw = imgs.naturalWidth; //图片的原始宽度
            var imgh = imgs.naturalHeight; //图片的原始高度
            var retw = divs.clientWidth;
            var reth = divs.clientHeight;
            setTimeout(() => {
                canvas.setAttribute("width", imgs.width);
                canvas.setAttribute("height", imgs.height);
            }, 0);
            console.log(canvas,"有没有宽高");
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

        //zky识别
        zkyImgPicWh() {
            var img = new Image();
            img.onload = () => {
                let imgs = document.getElementById("searchBigcarimg");
                let divs = document.getElementById("searchcarmain");
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
                    // this.recodeResult = reponse.data.data.AllResult
                    this.recodeResult = JSON.parse(reponse.data.data).AllResult
                    if (this.recodeResult.Result[0].Vehicles.length == 0) {
                        this.$notify({
                            type: "warning",
                            message: "暂未识别到车辆信息！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return
                    }
                    if (this.recodeResult.Result[0].Vehicles.length == 0 || this.recodeResult == '') {
                        this.$notify({
                            type: "warning",
                            message: "暂未识别到车辆信息！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return
                    } else {
                        this.clickRecodeimg = false
                    }
                    //执行框选方法，并自动框选第一个目标
                    this.zkyinitCanvas();
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
        //执行框选的方法框出第一个目标
        zkyinitCanvas() {
            //第一次进入识别信息的时候，判断数据是否存在，如果存在车辆，就默认选中一个车辆信息
            //如果车辆不存在就执行骑车人的第一个信息，如果骑车人信息不存在就执行人的信息，否则返回null
            if (this.recodeResult.Result[0].Vehicles.length) {
                this.currentCar = 0;
            } else {
                this.currentCar = null;
            }
            //如果有人车骑车人的任意一个信息，则传值到第0个索引，并框选目标
            this.drawCarInfo(0);
        },
        //执行完识别后先清空canvas幕布，然后框选出第一个目标，以及其他所有的目标
        drawCarInfo(pIndex) {
            this.clearRect(); //清除Canvas
            this.zkydrawAlltarget()
            this.zkydrawfirst(pIndex, "red"); //框选第一个目标
            // }
        },
        //中科院框选出所有识别出来的人，车，骑车人
        zkydrawAlltarget() {
            if (this.recodeResult.Result[0].Vehicles) {
                //表示结果有车辆信息，就画出所有的车的信息
                for (let i = 0; i < this.recodeResult.Result[0].Vehicles.length; i++) {
                    //执行画框的方法
                    this.drawRect(this.recodeResult.Result[0].Vehicles[i], "yellow");
                }
            }
        },
        //中科院框选第一个目标
        zkydrawfirst(pIndex, color) {
            if (this.recodeResult.Result[0].Vehicles.length && this.currentCar !== null) {
                //表示结果有车辆信息，就执行车辆的第一个
                this.drawRect(this.recodeResult.Result[0].Vehicles[pIndex], color);
                this.allfeature = this.recodeResult.Result[0].Vehicles[pIndex].Feature;
                return
            }
        },
    },
    destroyed() {
        // this.fast = {}
    }
}
export default mixins
