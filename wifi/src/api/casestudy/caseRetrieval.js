/*
 * @Author: your name
 * @Date: 2020-11-16 10:58:14
 * @LastEditTime : 2020-11-26 16:09:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\casestudy\caseRetrieval.js
 */
const mixins = {
    data: function () {
        return {
            openSearchCase: false,
            openaccess: false,
            imgUrlShow: "", // 图片rul
            /* 基本信息*/
            caseNo: "", // 案件编号
            caseAddress: "", // 案发详址
            upLoadPerson: "", // 上传用户
            uploadBeginTime: "", // 上传开始时间
            uploadEndTime: "", // 上传结束时间
            caseName: "", // 案件名称
            caseHappenBeginTime: "", // 案发开始时间
            caseHappenEndTime: "", // 案发结束时间
            harmLevel: "", // 危害程度
            caseCategory: "", // 案件类型
            violateAim: "", // 侵犯目标
            crimeMethod: "", // 作案手段
            crimeTool: "", // 作案工具
            crimeOpportunity: "", // 作案时机
            caseState: "", // 案件状态
            caseStateDes: "", // 案件状态
            caseStateList: [], // 案件状态列表

            /*人员信息*/

            personSex: "", //目标性别
            HairColorStyle: "", //头发颜色
            ShoesColorType: "", //鞋子颜色
            EyePartType: "", //眼睛样式
            HairLength: "", //头发长度
            SleeveStyleType: "", //袖子类型
            CoatTextureType: "", //衣服图案
            SockColorType: "", //袜子颜色
            SpecialTagType: "", //特殊标记
            CoatStyleType: "", //上衣类型
            BehaviorType: "", //行为描述
            bodyType: "", //目标身材
            BikeCoatStyleColorType: "", //上衣颜色
            CulotteStyleType: "", //裤子类型
            CulotteColorType: "", //裤裙颜色
            personAge: "", //目标年龄
            personHeight: "", //目标身高
            ShoesStyleType: "", //鞋子类型
            tphairStyle: "", //发型
            ethicCode: "", //民族
            tpcoatTexture: "", //上衣纹理
            viewType: "",
            stature: '',
            /*车辆信息*/
            VehicleBrandType: "", //车辆品牌
            VehicleBehaviorType: "", //车辆可疑行为
            AutoFoilColorType: "", //贴膜颜色
            isAutoFoilColorType: "",
            propertySunroof: "", //遮阳板
            VehicleModelList: [], //车辆型号
            VehicleMode: "",
            carNo: "", //车牌号码
            VehicleKindColorType: "", //车身颜色
            tmplateClass: "", //车牌类型

            /*非机动车信息*/
            plateClass: "", //号牌种类
            plateColor: "", //车牌颜色
            plateNo: "", //车票号码
            plateNoAttach: "", //挂车好牌
            vehicleBrand: "", //车辆品牌
            vehicleType: "", //车辆款型
            vehicleTypelList: [], //车辆型号
            vehicleLength: "", //车辆长度
            vehicleColor: "",
            vehicleHood: "", //车前物品
            vehicleTrunk: "", //车后物品
            vehicleWheel: "", //车轮
            wheelPrintedPattern: "", //车轮印花
            vehicleWindow: "", //车窗
            vehicleRoof: "", //车顶
            vehicleDoor: "", //车门
            sideOfVehicle: "", //车侧
            carOfVehicle: "", //车厢
            rearviewMirror: "", //后视镜
            vehicleChassis: "", //底盘
            vehicleShielding: "", //遮挡
            filmColor: "", //贴膜颜色
            hairStyle: "",
            coatStyle: "", //上衣款式
            coatColor: "", //上衣颜色
            coatTexture: "", //上衣纹理
            trousersStyle: "", //裤子款式
            trousersColor: "", //裤子颜色
            bagStyle: "", //包款式
            bagColor: "", //包颜色

            carryingType: "",
            tbageType: "", //年龄段
            driverCount: "", // 骑车人数
            eyePart: "", // 眼部特征
            mouthPart: "", // 嘴部特征
            scarf: "", //围巾
            tbethicCode: "", // 民族
            tbgenderCode: "", // 性别
            tbbodyType: "", // 体态
            umbrellaFlag: "", // 是否打伞
            tbviewType: "", // 朝向
            plateDescribe: "", //车辆描述
            keyword: "",
            selectKey: "",
            selectOptionList: [],
            checkItme: "caseInfo", //切换时候的样式
            imgData: {},
            imgFaceData: {},
            options: [
                //目标类型： 写死的数据
                {
                    value: "4",
                    label: "大型车"
                },
                {
                    value: "5",
                    label: "小型车"
                },
                {
                    value: "6",
                    label: "卡车"
                },
                {
                    value: "7",
                    label: "拖拉机"
                },
                {
                    value: "8",
                    label: "中巴"
                }
            ],
            uploadTimeOne: "",
            uploadTimeTwo: "",
            caseTimeOne: "",
            caseTimeTwo: "",
            isCurrentItem: "",
            isCurrentItemFlex: "",
            structurList: [],
        }
    },
    watch: {
        imgData: {
            handler(val, oldValue) {
                if (this.imgData.photo_width == undefined) {
                    return;
                }
                let imgs = document.getElementById("imgUrlShow"); //图片大小
                let imgBox = document.getElementById("searchImg"); //div大小
                let leftTopX = val.obj_left;
                let leftTopY = val.obj_top;
                let rightBtmX = val.obj_right;
                let rightBtmY = val.obj_bootom;
                let imgw = rightBtmX - leftTopX;
                let imgh = rightBtmY - leftTopY;
                let retw = imgBox.clientWidth;
                let reth = imgBox.clientHeight;
                let unit = 1;
                let posLeft = 0;
                let posTop = 0;
                if (retw / reth < imgw / imgh) {
                    unit = imgw / retw;
                    posLeft = 0;
                    posTop = (reth - imgh / unit) / 2;
                } else {
                    unit = imgh / reth;
                    posTop = 0;
                    posLeft = (retw - imgw / unit) / 2;
                }
                imgs.style.width = val.photo_width / unit + "px";
                imgs.style.height = val.photo_height / unit + "px";
                imgs.style.top = -(leftTopY / unit) + posTop + "px";
                imgs.style.left = -(leftTopX / unit) + posLeft + "px";
                let simg = document.getElementById("simg");
                if (!simg) {
                    simg = document.createElement("img");
                }
                simg.id = "simg";
                simg.style.position = "absolute";
                simg.style.width = imgs.style.width;
                simg.style.height = imgs.style.height;
                simg.style.top = imgs.style.top;
                simg.style.left = imgs.style.left;
                imgBox.appendChild(simg);
            },
            deep: true
        },
        imgFaceData: {
            handler(val, oldValue) {
                if (val.width == undefined) {
                    return;
                }
                let imgs = document.getElementById("imgPerson");
                let imgBox = document.getElementById("searchPerson");

                let leftTopX = val.facePos.leftTopX;
                let leftTopY = val.facePos.leftTopY;
                let rightBtmX = val.facePos.rightBtmX;
                let rightBtmY = val.facePos.rightBtmY;
                let imgw = rightBtmX - leftTopX;
                let imgh = rightBtmY - leftTopY;

                let retw = imgBox.clientWidth;
                let reth = imgBox.clientHeight;
                let unit = 1;
                let posLeft = 0;
                let posTop = 0;
                if (retw / reth < imgw / imgh) {
                    unit = imgw / retw;
                    posLeft = 0;
                    posTop = (reth - imgh / unit) / 2;
                } else {
                    unit = imgh / reth;
                    posTop = 0;
                    posLeft = (retw - imgw / unit) / 2;
                }
                imgs.style.width = val.width / unit + "px";
                imgs.style.height = val.height / unit + "px";
                imgs.style.top = -(leftTopY / unit) + posTop + "px";
                imgs.style.left = -(leftTopX / unit) + posLeft + "px";
                let simg = document.getElementById("simg");
                if (!simg) {
                    simg = document.createElement("img");
                }
                simg.id = "simg";
                simg.style.position = "absolute";
                simg.style.width = imgs.style.width;
                simg.style.height = imgs.style.height;
                simg.style.top = imgs.style.top;
                simg.style.left = imgs.style.left;
                imgBox.appendChild(simg);
            },
            deep: true
        }
    },
    methods: {
        //危害程度 案件类型 侵犯目标
        getstructurprop(type) {
            this.structurList = []
            this.$http({
                url: "sms/static/getCaseBaseData",
                method: "get",
                params: {
                    casekey: type
                }
            }).then(res => {
                if (res.statusText === "OK" && res.data.code === 200) {
                    this.structurList = res.data.data;
                } else {
                    this.$notify({
                        type: "error",
                        message: "获取下拉列表失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        //案件状态
        getstructurotherprop() {
            this.$http({
                    url: "sms/static/getCaseState",
                    method: "get"
                })
                .then(res => {
                    if (res.statusText === "OK" && res.data.code === 200) {
                        this.structurList = res.data.data;
                    }
                })
        },
        // 体态
        getstructurandprop(type) {
            this.$http.get("sms/static/getTypeByCode?code=" + type).then(res => {
                if (res.data.code == 200) {
                    this.structurList = res.data.data;
                }
            });
        },
        // 搜索条件
        searchReflex() {
            if (this.checkItme == "caseInfo" || this.checkItme == "bicycle") {
                //没有人脸
                this.goToCaseRetrievalSearch();
                this.getSearchCondition();
            } else if (this.checkItme == "person") {

                if (this.imgUrlShow == "") {
                    this.goToCaseRetrievalSearch();
                    this.getSearchCondition();
                } else {
                    let data = {
                        feature: this.imgFaceData.feature,
                        uuid: "",
                        type: 1,
                        targetJson: JSON.stringify({
                            genderCode: this.personSex, //目标性别
                            ageType: this.personAge, //目标年龄
                            // heightUpLimit: this.personHeight, //目标身高
                            // behaviorDescription: this.BehaviorType, //行为描述
                            // bodySpeciallMark: this.SpecialTagType, //特殊标记
                            bodyType: this.bodyType, //目标身材
                            hairColor: this.HairColorStyle, //头发颜色
                            pcoatStyle: this.CoatStyleType, //上衣类型
                            pcoatColor: this.BikeCoatStyleColorType, //上衣颜色
                            ptrousersStyle: this.CulotteStyleType, //裤子类型
                            ptrousersColor: this.CulotteColorType, //裤裙颜色
                            // shoesStyle: this.ShoesStyleType, //鞋子类型
                            // shoesColor: this.ShoesColorType, //鞋子颜色
                            // glassStyle: this.EyePartType, //眼睛
                            tphairStyle: this.tphairStyle, //发型
                            ethicCode: this.ethicCode, // 民族
                            tpcoatTexture: this.tpcoatTexture, //上衣纹理
                            viewType: this.viewType // 朝向
                        })
                    };
                    sessionStorage.setItem("caseSearchReflex", JSON.stringify(data));
                    // this.$router.push("/casestudy/caseSearchReflex?menuCode=207");
                    this.goToCaseRetrievalSearchFlex()

                }
            } else if (this.checkItme == "motorVehicle") {
                if (this.imgUrlShow == "") {
                    this.goToCaseRetrievalSearch();
                    this.getSearchCondition();
                } else {
                    let data = {
                        feature: this.imgData.obj_feature,
                        uuid: "",
                        type: 2,
                        targetJson: JSON.stringify({
                            // behavior: this.VehicleBehaviorType, //车辆可疑行为
                            // vehicleModel: this.VehicleMode, // 目标车型
                            // mvehicleBrand: this.VehicleBrandType, // 车辆品牌
                            mplateNo: this.carNo, // 车牌号码
                            mvehicleColor: this.VehicleKindColorType, // 车身颜色
                            vehicleClass: this.plateClass, //车辆类型
                            plateColor: this.plateColor // 车牌颜色
                            // mfilmColor: this.AutoFoilColorType, // 车模颜色
                            // propertySunroof: this.propertySunroof, // 遮阳板
                            // tmplateClass:this.tmplateClass, // 车牌类型
                        })
                    };
                    sessionStorage.setItem("caseSearchReflex", JSON.stringify(data));
                    this.goToCaseRetrievalSearchFlex()

                }
            }
        },
        //打开c车辆模态框
        childByaccess(val, val2, val3) {

            this.carNo = val2.plate_number == '未识别' ? '' : val2.plate_number
            this.plateColor = val2.plate_color == '无' ? '' : val2.plate_color
            this.plateClass = val2.traceTypeName
            this.VehicleKindColorType = val2.vehicle_color_id
            this.VehicleBrandType = val2.vehicle_brand
            // carNo 车牌号码  plateColor 车牌颜色  plateClass 车辆类型  VehicleKindColorType  车身颜色
            this.openaccess = val;
            if (val2 == undefined) {
                this.imgData = {};
            } else {
                this.imgData = val2;
                this.imgUrlShow = val3;
            }
        },
        //打开人脸模态框
        childsearch(val, val2, val3) {
            if (val3 == "" && this.imgUrlShow != null) {
                this.openSearchCase = val;
            } else {
                this.openSearchCase = val;
                this.imgFaceData = val2;
                this.imgUrlShow = val3;
            }
        },
        //切换信息
        changeItem(event, type) {
            this.isCurrentItem = type;
            this.isCurrentItemFlex = type;
            this.imgData = {};
            this.imgUrlShow = "";
            let tabs = ["tab1", "tab2", "tab3", "tab4"];
            let Item = document.getElementsByClassName("tabsItem");
            for (let i = 0; i < Item.length; i++) {
                if (i < Item.length - 1) {
                    Item[i].className = "tabsItem afttabsItem";
                } else {
                    Item[i].className = "tabsItem ";
                }
                if (event.target.isEqualNode(Item[i])) {
                    document.getElementsByClassName(tabs[i])[0].style.display = "block";
                } else {
                    document.getElementsByClassName(tabs[i])[0].style.display = "none";
                }
            }
            event.target.className = "tabsItem tabDefault afttabsItem";

        },
        //跳转到结果展示页面
        goToCaseRetrievalSearch() {
            //获取从哪个Item过去的
            let isCurrent = this.isCurrentItem;
            this.$router.push({
                path: "/casestudy/caseRetrievalSearch",
                query: {
                    menuCode: 207,
                    current: isCurrent, //传入这个参数
                }
            });
        },

        //上传了人脸或车辆图片跳转的页面
        goToCaseRetrievalSearchFlex() {
            let isCurrent = this.isCurrentItemFlex;
            this.$router.push({
                path: '/casestudy/caseSearchReflex',
                query: {
                    menuCode: 207,
                    current: isCurrent,
                }
            })
        },

        // 搜索
        getSearchCondition() {
            sessionStorage.removeItem("caseSearchCondition");
            let SearchCondition = {
                /*基本信息*/
                opeType: this.checkItme,
                searchType: 0,
                // keyword: this.keyword,
                caseLinkMark: this.caseNo,
                caseName: this.caseName,
                state: this.caseState,
                placeFullAddress: this.caseAddress,
                startTime: this.caseHappenBeginTime,
                endTime: this.caseHappenEndTime,
                caseCategoryDesc: this.caseCategory,
                caseMethodDesc: this.crimeMethod,
                caseLevelDesc: this.harmLevel,
                caseTargetDesc: this.violateAim,
                caseToolDesc: this.crimeTool,
                caseOpportunityDesc: this.crimeOpportunity,
                creatorName: this.upLoadPerson,
                startTime2: this.uploadBeginTime,
                endTime2: this.uploadEndTime,
                /*人员信息*/
                genderCode: this.personSex,
                ageUpLimit: this.personAge,
                // heightUpLimit: this.personHeight,
                // behaviorDescription: this.BehaviorType,
                // bodySpeciallMark: this.SpecialTagType,
                bodyType: this.bodyType,
                hairColor: this.HairColorStyle,
                pcoatStyle: this.CoatStyleType,
                pcoatColor: this.BikeCoatStyleColorType,
                ptrousersStyle: this.CulotteStyleType,
                ptrousersColor: this.CulotteColorType,
                stature: this.stature,
                // shoesStyle: this.ShoesStyleType,
                // shoesColor: this.ShoesColorType,
                // glassStyle: this.EyePartType,
                tphairStyle: this.tphairStyle,
                ethicCode: this.ethicCode,
                tpcoatTexture: this.tpcoatTexture,
                viewType: this.viewType,

                /**机动车**/
                behavior: this.VehicleBehaviorType,
                vehicleModel: this.VehicleMode,
                mvehicleBrand: this.VehicleBrandType,
                mplateNo: this.carNo,
                mvehicleColor: this.VehicleKindColorType,
                mfilmColor: this.AutoFoilColorType,
                propertySunroof: this.propertySunroof,
                tmplateClass: this.tmplateClass,
                vehicleClass: this.plateClass,

                /**非机动车**/
                plateClass: this.plateClass,
                plateColor: this.plateColor,
                plateNo: this.plateNo,
                plateNoAttach: this.plateNoAttach,
                plateDescribe: this.plateDescribe,
                vehicleBrand: this.vehicleBrand,
                vehicleType: this.vehicleType,
                vehicleLength: this.vehicleType,
                vehicleColor: this.vehicleColor,
                vehicleHood: this.vehicleHood,
                vehicleTrunk: this.vehicleTrunk,
                vehicleWheel: this.vehicleWheel,
                wheelPrintedPattern: this.wheelPrintedPattern,
                vehicleWindow: this.vehicleWindow,
                vehicleRoof: this.vehicleRoof,
                vehicleDoor: this.vehicleDoor,
                sideOfVehicle: this.sideOfVehicle,
                carOfVehicle: this.carOfVehicle,
                rearviewMirror: this.rearviewMirror,
                vehicleChassis: this.vehicleChassis,
                vehicleShielding: this.vehicleShielding,
                filmColor: this.filmColor,
                hairStyle: this.hairStyle,
                coatStyle: this.coatStyle,
                coatColor: this.coatColor,
                coatTexture: this.coatTexture,
                trousersStyle: this.trousersStyle,
                trousersColor: this.trousersColor,
                bagStyle: this.bagStyle,
                bagColor: this.bagColor,
                carryingType: this.carryingType,
                tbageType: this.tbageType,
                driverCount: this.driverCount,
                eyePart: this.eyePart,
                mouthPart: this.mouthPart,
                scarf: this.scarf,
                tbethicCode: this.tbethicCode,
                tbgenderCode: this.tbgenderCode,
                tbbodyType: this.tbbodyType,
                umbrellaFlag: this.umbrellaFlag,
                tbviewType: this.tbviewType
            };
            // console.log(SearchCondition.state,"这是输入的案件类型");
            sessionStorage.setItem(
                "caseSearchCondition",
                JSON.stringify(SearchCondition)
            );
        },

        reset() {
            if (this.imgUrlShow) {
                document.getElementById("imgUrlShow").style = "none";
            }
            this.imgUrlShow = "";
            (this.stature = ""),
            (this.caseNo = ""),
            (this.caseAddress = ""),
            (this.harmLevel = ""),
            (this.uploadBeginTime = ""),
            (this.upLoadPerson = ""),
            (this.caseName = ""),
            (this.caseHappenBeginTime = ""),
            (this.caseCategory = ""),
            (this.violateAim = ""),
            (this.caseStateDes = ""),
            (this.crimeMethod = ""),
            (this.crimeTool = ""),
            (this.crimeOpportunity = ""),
            (this.caseHappenEndTime = ""),
            (this.uploadEndTime = ""),
            (this.personSex = ""),
            (this.personAge = ""),
            (this.HairColorStyle = ""),
            (this.tpcoatTexture = ""),
            (this.bodyType = ""),
            (this.viewType = ""),
            (this.CoatStyleType = ""),
            (this.CulotteStyleType = ""),
            (this.ethicCode = ""),
            (this.tphairStyle = ""),
            (this.BikeCoatStyleColorType = ""),
            (this.CulotteColorType = ""),
            (this.plateColor = ""),
            (this.plateClass = ""),
            (this.VehicleKindColorType = ""),
            (this.tbgenderCode = ""),
            (this.tbethicCode = ""),
            (this.tbviewType = ""),
            (this.coatStyle = ""),
            (this.coatTexture = "");
            (this.trousersStyle = ""),
            (this.tbbodyType = ""),
            (this.tbageType = ""),
            (this.hairStyle = ""),
            (this.coatColor = ""),
            (this.trousersColor = ""),
            (this.bagStyle = ""),
            (this.carNo = "");
            let maxDate = {
                year: new Date().getFullYear(),
                month: new Date().getMonth(), //关键
                date: new Date().getDate(),
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            };
            this.uploadTimeOne.config.max = maxDate;
            this.uploadTimeTwo.config.min = "1900-01-01 00:00:00";
            this.caseTimeOne.config.max = maxDate;
            this.caseTimeTwo.config.min = "1900-01-01 00:00:00";
        },

    },
    beforeCreate() {
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                S: this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    (this.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1 ?
                        o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length)
                    );
            return fmt;
        };
    },

    mounted() {
        // this.getCaseStateList();
        this.$nextTick(() => {
            //获取从结果页面返回的值
            let current = this.$route.query.current;
            //判断这个值有没有
            if (current !== undefined) {
                current = Number(current);
                //如果有，就默认选中之前Item的
                document.getElementsByClassName("tabsItem")[current].click();
            } else {
                //否则就让第一个Item被点击
                document.getElementsByClassName("tabDefault")[0].click();
            }
            document.addEventListener("click", function (e) {
                var ev = e || window.event;
                var elem = e.target || e.srcElement;
                while (elem) {
                    if (elem.className == "condition") {
                        return;
                    }
                    elem = elem.parentNode;
                }
                var lists = document.getElementsByClassName("condition_child");
                for (let i = 0; i < lists.length; i++) {
                    lists[i].style.display = "none";
                }
            });
        });
        //上传时间
        let _this = this;
        this.uploadTimeOne = laydate.render({
            elem: "#uploadBeginTime",
            type: "datetime",
            max: new Date(new Date().getTime()).Format("yyyy-MM-dd hh:mm:ss"),
            btns: ["now", "confirm"],
            done: (value, date, endDate) => {
                this.uploadBeginTime = value;
                this.uploadEndTime = value.split(" ")[0] + " 23:59:59";
                this.uploadTimeTwo.config.min = {
                    year: date.year,
                    month: date.month - 1, //关键
                    date: date.date,
                    hours: date.hours,
                    minutes: date.minutes,
                    seconds: date.seconds
                };
            }
        });
        this.uploadTimeTwo = laydate.render({
            elem: "#uploadEndTime",
            type: "datetime",
            btns: ["now", "confirm"],
            max: 1,
            done: (value, date, endDate) => {
                this.uploadEndTime = value;
                this.uploadTimeOne.config.max = {
                    year: date.year,
                    month: date.month - 1, //关键
                    date: date.date,
                    hours: date.hours,
                    minutes: date.minutes,
                    seconds: date.seconds
                };
            }
        });
        // 案发时间
        this.caseTimeOne = laydate.render({
            elem: "#caseHappenBeginTime",
            type: "datetime",
            max: new Date(new Date().getTime()).Format("yyyy-MM-dd hh:mm:ss"),
            btns: ["now", "confirm"],
            done: (value, date, endDate) => {
                this.caseHappenBeginTime = value;
                // _this.caseHappenEndTime = new Date(new Date(value).getTime()).Format('yyyy-MM-dd hh:mm:ss');// + 7 * 24 * 60 * 60 * 1000
                this.caseHappenEndTime = value.split(" ")[0] + " 23:59:59";
                this.caseTimeTwo.config.min = {
                    year: date.year,
                    month: date.month - 1, //关键
                    date: date.date,
                    hours: date.hours,
                    minutes: date.minutes,
                    seconds: date.seconds
                };
            }
        });
        this.caseTimeTwo = laydate.render({
            elem: "#caseHappenEndTime",
            type: "datetime",
            btns: ["now", "confirm"],
            max: 1,
            done: (value, date, endDate) => {
                this.caseHappenEndTime = value;
                this.caseTimeOne.config.max = {
                    year: date.year,
                    month: date.month - 1, //关键
                    date: date.date,
                    hours: date.hours,
                    minutes: date.minutes,
                    seconds: date.seconds
                };
            }
        });
    }

};
export default mixins
