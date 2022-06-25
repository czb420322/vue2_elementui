import {
    windowToCanvas,
    imgwh
} from "../../page/videoCombat/canvas";
// import { TimeSelect } from "element-ui";
const mixins = {
    data: function () {
        return {
            checkShow: 1, //人 骑车人 汽车的选项
            carshow: false,
            personshow: true,
            cpshow: false,
            PersonAge: '', //年龄段
            EthicCode: '', // 民族代码
            Gender: '', //  性别
            BagStyle: '', // 包款式
            BagColor: '', // 包颜色
            HandArticle: '', // 携物(指手上拿的東西)
            PantsStyle: '', // 下衣类型
            CulotteColor: '', // 下衣颜色
            HairStyle: '', // 发型
            HairColor: '', // 头发颜色
            posture: '', // 体态
            ShoesStyle: '', //   鞋子款式
            ShoesColor: '', //  鞋子颜色
            CoatStyle: '', //  上衣款式
            Color: '', // 上衣颜色
            CoatTexture: '', //  上衣纹理
            PersonView: '', //  朝向

            BikeBag: '', //包款式
            BikeBagColor: '', //包颜色
            BikeColor: '', // 所骑车颜色
            BikeCarray: '', // 是否携物
            BikeCulotteStyle: '', // 下衣类型
            BikeCulotteColor: '', // 下衣颜色
            EyePart: '', // 眼部特征
            BikeHairStyle: '', // 发型
            MouthPart: '', // 嘴部特征
            ScarfPart: '', //  围脖
            BikeBody: '', //   体态
            BikeUmbrella: '', //   是否打伞
            BikeCoatStyle: '', //  上衣款式
            BikeCoatStyleColor: '', // 上衣颜色
            BikeCoatTexture: '', //  上衣纹理
            BikeTowards: '', //  朝向
            Driver: '', //  驾驶人数
            carPlateColor: '', //车牌颜色
            cartarget: '', //目标类型
            carColor: '', //车辆颜色
            carPlateNum: '', //车牌号码
            PlateClass: '', //车牌类型
            options: [ //目标类型： 写死的数据
                {
                    value: '4',
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
                    value: "8",
                    label: "中巴"
                }
            ],
            radioIndex: '', //切换的索引
            videoimg: '', //展示截图后的img的url
            deviceId: null, //截图文件的点位ID
            videoUrl: '', //视频播放的url
            disableTrue: true, //禁用确定按钮\
            one: '',
            two: '',
            three: '',
            four: '', //四个坐标
            pedestrian: {}, //识别的对象
            lableName: '标注名称',
            lableTime: '', //标注时间
            remark: '', //备注
            checkRadio: 0,

            //人脸
            faceNameList: [],
            refaceList: [], //识别出来的信息
            faceToList: [],
            nextCount: 0, //上一张 下一张
            comparisonlist: [],
            listIndex: [],
            currentPage: 1,
            pageSize: 16,
            comparTotal: 100,
            infolable: {}, //比对出来人脸的信息
            caseUuid: '',
            showcaseContrast: false, //打开案件比对
            isaaa: false,
            showFaceLog: false,
            showFaceLib: false, //显示人脸库信息
            isFacePut: false,
            suspcitionList: [], //嫌疑人目标
            suspicion: {
                suspicionUuid: '',
                suspicionType: '-1',
                suspicionName: '标注池'
            },
            alltype: {
                suspicionUuid: '',
                suspicionType: '-1',
                suspicionName: '标注池'
            },
            getLable: {}, //得到标注的信息
            dialogVisible: false, //展示元素的信息
            facerecolist: [], //识别出来的人脸扣人脸坐标
            videoplaytime: '', //视频放的时间，毫秒数
            istrueCanvas: false, //是否打开canvans
            isrecognition: false, //是否识别成功
            recognition: true,
            loading: null,
            disableClick: true
        }
    },
    filters: {
        score(val) {
            if (val != undefined) {
                return (Number(val.substring(0, 6)) * 100).toFixed(2) + '%'
            }
        }
    },
    watch: {
        refaceList(val) {
            this.faceToList = [];
            let dList = val
            if (dList.length) {
                for (let i = 0; i < dList.length; i++) {
                    let arrItem = [];
                    if (dList[i].faces == undefined || dList[i].faces == null) {
                        return
                    }
                    if (dList[i].faces.length) {
                        let face = dList[i].faces[0]
                        // if (face.length) {
                        // for (let j = 0; j < face.length; j++) {
                        let faceLeft = Number(face.face_left) + Number(dList[i].markPos.PosX); //+ Number(dList[i].window.face_left);
                        let faceTop = Number(face.face_top) + Number(dList[i].markPos.PosY); // + Number(dList[i].window.face_right);
                        let faceWidth = Number(face.face_right) - Number(face.face_left);
                        let faceHeight = Number(face.face_bootom) - Number(face.face_top);
                        let unit = 1;
                        let faceLeftPos = 0;
                        let faceTopPos = 0;
                        if (faceWidth < 100 && faceHeight < 100) {
                            faceTopPos = (100 - faceHeight) / 2;
                            faceLeftPos = (100 - faceWidth) / 2;
                        } else {
                            if (1 < faceWidth / faceHeight) {
                                unit = faceWidth / 100;
                                faceLeftPos = 0;
                                faceTopPos = (100 - faceHeight / unit) / 2;
                            } else {
                                unit = faceHeight / 100;
                                faceTopPos = 0;
                                faceLeftPos = (100 - faceWidth / unit) / 2;
                            }
                        }
                        let temp = {
                            left: faceLeft / unit - faceLeftPos,
                            top: faceTop / unit - faceTopPos,
                            width: dList[i].photo_width / unit,
                            height: dList[i].photo_height / unit
                        };
                        arrItem.push(temp);
                    }
                    // }
                    this.faceToList = arrItem
                    // }

                }
            }
        }
    },
    computed: {
        imgCaleList() {
            let arr = []
            arr = this.comparisonlist.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            for (let i = 0; i < arr.length; i++) {
                this.$nextTick(() => {
                    let imgs = document.getElementById('candidateCase_' + i)
                    if (arr[i].birthday != undefined) {
                        setTimeout(() => {
                            imgs.style.top = "0px";
                            imgs.style.left = "0px";
                            imgs.style.width = "100%";
                            imgs.style.height = "100%";
                        }, 200)
                    }
                    if (arr[i].facePoints != undefined) {
                        setTimeout(() => {
                            let imgs = document.getElementById('candidateCase_' + i)
                            let facePoints = arr[i].facePoints.split(',')
                            let markPoints = arr[i].markPoints.split(',')
                            let faceLeft = Number(facePoints[0]) + Number(markPoints[2]); //+ Number(dList[i].window.face_left);
                            let faceTop = Number(facePoints[1]) + Number(markPoints[3]); // + Number(dList[i].window.face_right);
                            let faceWidth = Number(facePoints[2]) - Number(facePoints[0]);
                            let faceHeight = Number(facePoints[3]) - Number(facePoints[1]);
                            let unit = 1;
                            let faceLeftPos = 0;
                            let faceTopPos = 0;
                            if (faceWidth < 100 && faceHeight < 100) {
                                faceTopPos = (100 - faceHeight) / 2;
                                faceLeftPos = (100 - faceWidth) / 2;
                            } else {
                                if (1 < faceWidth / faceHeight) {
                                    unit = faceWidth / 100;
                                    faceLeftPos = 0;
                                    faceTopPos = (100 - faceHeight / unit) / 2;
                                } else {
                                    unit = faceHeight / 100;
                                    faceTopPos = 0;
                                    faceLeftPos = (100 - faceWidth / unit) / 2;
                                }
                            }
                            imgs.style.top = (-(faceTop / unit - faceTopPos)) + "px";
                            imgs.style.left = (-(faceLeft / unit - faceLeftPos)) + "px";
                            imgs.style.width = (markPoints[0] / unit) + "px";
                            imgs.style.height = (markPoints[1] / unit) + "px";
                        }, 100)

                    } else {
                        let imgs = document.getElementById('candidateCase_' + i)
                        if (imgs) {
                            imgs.style.top = "0px";
                            imgs.style.left = "0px";
                            imgs.style.width = "100%";
                            imgs.style.height = "100%";
                        }
                    }
                })

            };
            return arr
        }
    },
    methods: {
        //切换样式
        radioChange(lable) {
            if (this.one == '') {
                this.$notify({
                    type: 'warning',
                    message: '请框选目标！',
                    position: 'bottom-right',
                    duration: 3000
                });
                this.checkShow = 1
                this.getSuspcition(this.checkShow)
                return
            }
            this.suspicion = {
                suspicionUuid: '',
                suspicionType: '-1',
                suspicionName: '标注池'
            }
            this.getsusInfo = {
                suspicionUuid: '',
                suspicionType: '-1',
                suspicionName: '标注池'
            }

            this.getSuspcition(lable)
            if (this.checkRadio == 1) {
                this.$myconfirm({
                    type: '提示',
                    msg: '切换会清空信息，是否切换？',
                    icon: 4,
                    btn: {
                        ok: '确定',
                        no: '取消'
                    }
                }).then(() => {
                    this.checkRadio = 0
                    this.radioIndex = lable
                    this.clearLable();
                    if (lable == 1) {
                        this.lableName = '嫌疑目标人'
                        this.iscpshow = true
                        this.personshow = true;
                        this.carshow = this.cpshow = this.ismorshow = false;
                        this.pedestrian.type_index = 0
                        this.checkShow = 1

                    } else if (lable == 2) {
                        this.lableName = '嫌疑骑车人'
                        this.iscpshow = false
                        this.cpshow = true;
                        this.carshow = this.personshow = this.ismorshow = false;
                        this.pedestrian.type_index = 1
                        this.checkShow = 2
                    } else if (lable == 3) {
                        this.lableName = '嫌疑目标车'
                        this.iscpshow = true
                        this.carshow = true;
                        this.personshow = this.cpshow = this.ismorshow = false;
                        this.pedestrian.type_index = 4
                        this.checkShow = 3
                    }
                }).catch(() => {
                    if (this.pedestrian.type_index == 0) {
                        this.checkShow = 1
                        this.getSuspcition(this.checkShow)
                    } else if (this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index == 3) {
                        this.checkShow = 2
                        this.getSuspcition(this.checkShow)
                    } else {
                        this.checkShow = 3
                        this.getSuspcition(this.checkShow)
                    }
                })
            } else {
                this.radioIndex = lable
                this.clearLable();
                if (lable == 1) {
                    this.lableName = '嫌疑目标人'
                    this.iscpshow = true
                    this.personshow = true;
                    this.carshow = this.cpshow = this.ismorshow = false;
                    this.pedestrian.type_index = 0
                    this.checkShow = 1
                } else if (lable == 2) {
                    this.lableName = '嫌疑骑车人'
                    this.iscpshow = false
                    this.cpshow = true;
                    this.carshow = this.personshow = this.ismorshow = false;
                    this.pedestrian.type_index = 1
                    this.checkShow = 2
                } else if (lable == 3) {
                    this.lableName = '嫌疑目标车'
                    this.iscpshow = true
                    this.carshow = true;
                    this.personshow = this.cpshow = this.ismorshow = false;
                    this.pedestrian.type_index = 4
                    this.checkShow = 3
                }
            }

        },
        //打开弹框后的回调
        openDialog() {
            this.recognition = sessionStorage.getItem('enabledLabelRecognitionService')

            this.isrecognition = true;
            this.dialogVisible = true;
            this.disableTrue = true;

            //如果是修改手工标注则this.ishandupdate==true
            //如果为false 则是新增标注

            if (this.ishandupdate) {
                this.disableClick = false
                this.getUpdateInfo();
            } else {
                this.getAddInfo();
            }
        },

        //打开弹框后的手工标注修改功能
        getUpdateInfo() {

            this.$nextTick(() => {
                setTimeout(() => {

                    this.disableTrue = false
                    this.isrecognition = false
                    let row = this.gethanlabel

                    this.getLable = {}
                    for (let i = 0; i < row.attrs.length; i++) {
                        let key = row.attrs[i].itemCode
                        let val = row.attrs[i].valueName
                        this.getLable[key] = val
                    }
                    if (row.videoMark.absoluteTime) {
                        // console.log(row.videoMark.absoluteTime, 'row.videoMark.absoluteTimerow.videoMark.absoluteTime')
                        this.lableTime = this.getTrajectory(row.videoMark.absoluteTime, Number(row.videoMark.relativeTime), Number(row.videoMark.offset)) // 相对时间 + 绝对时间 + 设备时间
                    } else {

                        this.lableTime = this.getTrajectory(row.videoMark.videoStartTime, Number(row.videoMark.relativeTime), Number(row.videoMark.offset)) // 相对时间 + 绝对时间 + 设备时间
                    }
                    if (row.videoMark.typeId == 1) {
                        this.checkShow = 1
                        this.lableName = row.videoMark.markName
                        this.remark = row.videoMark.remark
                        this.personshow = true;
                        this.carshow = this.cpshow = false;
                        this.PersonAge = this.getLable.ageType; //年龄段
                        this.EthicCode = this.getLable.ethicCode; // 民族代码
                        this.Gender = this.getLable.genderCode; //  性别
                        this.BagStyle = this.getLable.bagStyle; // 包款式
                        this.BagColor = this.getLable.bagColor; // 包颜色
                        this.HandArticle = this.getLable.appendant; // 携物(指手上拿的東西)
                        this.PantsStyle = this.getLable.trousersStyle; // 下衣类型
                        this.CulotteColor = this.getLable.trousersColor; // 下衣颜色
                        this.HairStyle = this.getLable.hairStyle; // 发型
                        this.HairColor = this.getLable.hairColor; // 头发颜色
                        this.posture = this.getLable.bodyType; //体态
                        this.ShoesStyle = this.getLable.shoesStyle; //   鞋子款式
                        this.ShoesColor = this.getLable.shoesColor; //  鞋子颜色
                        this.CoatStyle = this.getLable.coatStyle; //  上衣款式
                        this.Color = this.getLable.coatColor; // 上衣颜色
                        this.CoatTexture = this.getLable.coatTexture; //  上衣纹理
                        this.PersonView = this.getLable.viewType; //  朝向
                    } else if (row.videoMark.typeId == 2) {
                        this.checkShow = 3
                        this.carshow = true;
                        this.lableName = row.videoMark.markName
                        this.remark = row.videoMark.remark
                        this.cpshow = this.personshow = false;
                        this.carPlateColor = this.getLable.plateColor; //车牌颜色
                        this.cartarget = this.getLable.traceTypeName; //目标类型
                        this.carColor = this.getLable.vehicleColor; //车辆颜色
                        this.carPlateNum = this.getLable.plateNo; //车牌号码
                        this.PlateClass = this.getLable.plateClass;
                    } else if (row.videoMark.typeId == 4) {
                        this.checkShow = 2
                        this.lableName = row.videoMark.markName
                        this.remark = row.videoMark.remark
                        this.cpshow = true;
                        this.carshow = this.personshow = false;
                        this.cptarget = this.getLable.traceTypeName; //目标类型
                        this.BikeBag = this.getLable.bagStyle; //包款式
                        this.BikeBagColor = this.getLable.bagColor; //包颜色
                        this.BikeColor = this.getLable.vehicleColor; // 所骑车颜色
                        this.BikeCarray = (this.getLable.carryingType == 0 || '' || null) ? '否' : '是'; // 是否携物
                        // this.BikeCarray = this.getLable.carryingType;
                        this.BikeCulotteStyle = this.getLable.trousersStyle; // 下衣类型
                        this.BikeCulotteColor = this.getLable.trousersColor; // 下衣颜色
                        this.EyePart = this.getLable.eyePart; // 眼部特征
                        this.BikeHairStyle = this.getLable.hairStyle; // 发型
                        this.MouthPart = this.getLable.mouthPart; // 嘴部特征
                        this.ScarfPart = this.getLable.scarf; //  围脖
                        this.posture = this.getLable.bodyType; //   体态
                        this.BikeUmbrella = (this.getLable.umbrellaFlag == 0 || '' || null) ? '否' : '是'; //   是否打伞
                        // this.BikeUmbrella = this.getLable.umbrellaFlag;
                        this.BikeCoatStyle = this.getLable.coatStyle; //  上衣款式
                        this.BikeCoatStyleColor = this.getLable.coatColor; // 上衣颜色
                        this.BikeCoatTexture = this.getLable.coatTexture; //  上衣纹理
                        this.BikeTowards = this.getLable.viewType; //  朝向
                        this.Driver = this.getLable.driverCount; //  驾驶人数
                        this.PersonAge = this.getLable.ageType; //  年龄段
                        this.EthicCode = this.getLable.ethicCode; // 民族代码
                        this.Gender = this.getLable.genderCode; //  性别
                    }
                    let imgs = document.getElementById("VidoePlayImgUrl");
                    let divs = document.getElementById("VideoPlayImgLeft");
                    var img = new Image()
                    this.videoimg = row.videoMark.videoCaptureUrl

                    img.src = row.videoMark.videoCaptureUrl
                    img.onload = function () {
                        imgwh(imgs, divs);
                        var canvas = document.getElementById("VideoPlayCanvas");
                        canvas.setAttribute("width", imgs.clientWidth);
                        canvas.setAttribute("height", imgs.clientHeight);
                        var context = canvas.getContext("2d");
                        context.beginPath();
                        context.lineWidth = 2;
                        context.strokeStyle = "red";
                        context.strokeRect(
                            row.videoMark.videoMarkPos.split(',')[0],
                            row.videoMark.videoMarkPos.split(',')[1],
                            row.videoMark.videoMarkPos.split(',')[2],
                            row.videoMark.videoMarkPos.split(',')[3]
                        );
                    };

                }, 200)
            })
        },
        ////打开弹框后的手工标注新增功能
        getAddInfo() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.disableTrue = false;
                    this.getSuspcition(1); //获取嫌疑人目标
                    window.g_change = false
                    this.nextCount = 0
                    // this.OpenTime(); //时间
                    this.lableName = '嫌疑目标人'
                    this.caseUuid = this.$route.query.caseUuid
                    let timeID = setInterval(() => {
                        let allUrl = window.imgurl
                        if (allUrl != -1 || allUrl.length > 20) {
                            let info = allUrl.split('?')[1]
                            this.deviceId = info.split('&')[0].split('=')[1].length > 5 ? info.split('&')[0].split('=')[1] : null
                            this.videoplaytime = info.split('&')[1].split('=')[1]
                            if (this.isonline) {
                                this.lableTime = this.getTrajectory(this.$store.state.lableBeginTime, Number(this.videoplaytime), Number(this.deviceInfo.offset == undefined ? 0 : this.deviceInfo.offset))
                            } else {
                                if (typeof (this.videoretriInfo.startTime) == 'number') {
                                    this.lableTime = this.getTrajectory(this.videoretriInfo.videoStartTime, Number(this.videoplaytime), Number(this.deviceInfo.offset == undefined ? 0 : this.deviceInfo.offset))
                                } else {
                                    let time
                                    if (this.videoretriInfo.startTime == null) {
                                        time = this.videoretriInfo.fileStartTime
                                        this.lableTime = this.getTrajectory(time, Number(this.videoplaytime), Number(this.deviceInfo.offset == undefined ? 0 : this.deviceInfo.offset))
                                    } else {
                                        // this.lableTime = this.videoretriInfo.startTime
                                        time = this.videoretriInfo.startTime
                                        this.lableTime = this.getTrajectory(time, Number(this.videoplaytime), Number(this.deviceInfo.offset == undefined ? 0 : this.deviceInfo.offset))
                                    };
                                }
                            }
                            // this.videoimg = 'http://172.24.1.222/group3/M00/0E/43/rBgB311uC6GAWAe1AAoC_FdYJqE881.jpg'
                            this.videoimg = allUrl

                            let imgs
                            let divs
                            let canvas
                            if (this.isonline) {
                                divs = document.getElementById("hisPlayImgLeft");
                                imgs = document.getElementById("hisPlayImgUrl");
                                canvas = document.getElementById("hisPlayCanvas");
                            } else {
                                divs = document.getElementById("VideoPlayImgLeft");
                                imgs = document.getElementById("VidoePlayImgUrl");
                                canvas = document.getElementById("VideoPlayCanvas");
                            }
                            let img = new Image()
                            img.src = this.videoimg
                            img.onload = function () {
                                imgwh(imgs, divs);
                                canvas.setAttribute("width", imgs.clientWidth);
                                canvas.setAttribute("height", imgs.clientHeight);
                            };
                            clearInterval(timeID)
                            this.getcoord()
                        }
                    }, 300);
                }, 200)
                //定义请求获取当前标注10S小视频的服务变量
                let timeVideo
                //每次先清除定时器
                clearInterval(timeVideo)
                //定时向C++发送请求，获取值
                timeVideo = setInterval(() => {
                    if (this.$route.path == '/videoCombat/videoplay') {
                        OngetUrl()
                    } else if (this.$route.path == '/videoCombat/historyvideo') {
                        OngetUrls()
                    } else if (this.$route.path == '/videoCombat/addcasetwo' || this.$route.path == '/casestudy/caseInfomanage/addcasetwo') {
                        if (this.isonline) {
                            OngetUrls()
                        } else {
                            OngetUrl()
                        }
                    }
                    if (!this.$commons.isEmpty(sessionStorage.getItem('Imgseek'))) {
                        if (sessionStorage.getItem('Imgseek').length < 15 && sessionStorage.getItem('Imgseek').indexOf('.flv') == -1) {
                            this.videoUrl = ''
                        } else {
                            this.videoUrl = sessionStorage.getItem('Imgseek').slice(4);
                            clearInterval(timeVideo)
                            this.disableTrue = false
                        }
                    }
                }, 300)

            })
        },
        //开始标注
        getcoord() {
            this.isFacePut = false
            let divs
            if (this.isonline) {
                divs = document.getElementById("hisPlayImgLeft");
            } else {
                divs = document.getElementById("VideoPlayImgLeft");
            }
            //   if(this.isrecognition){
            //     this.$notify({
            //       type: 'warning',
            //       message: '正在识别，等稍等！',
            //       position: 'bottom-right',
            //       duration: 3000
            //     });
            //     return
            //   }
            this.showFaceLog = false
            this.getsusInfo = {
                suspicionUuid: '',
                suspicionType: '-1',
                suspicionName: '标注池'
            }
            this.nextCount = 0
            let canvas
            if (this.isonline) {
                canvas = document.getElementById("hisPlayCanvas");
                canvas.setAttribute("width", document.getElementById("hisPlayImgUrl").clientWidth);
                canvas.setAttribute("height", document.getElementById("hisPlayImgUrl").clientHeight);
            } else {
                canvas = document.getElementById("VideoPlayCanvas");
                canvas.setAttribute("width", document.getElementById("VidoePlayImgUrl").clientWidth);
                canvas.setAttribute("height", document.getElementById("VidoePlayImgUrl").clientHeight);
            }
            var context = canvas.getContext("2d");
            context.beginPath();
            context.lineWidth = 2;
            var hasmove = false
            canvas.onmousedown = e => {
                this.isFacePut = false
                this.showFaceLog = false
                this.clearLable();
                hasmove = false
                setTimeout(() => {
                    let ele = windowToCanvas(canvas, e.clientX, e.clientY);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    this.one = ele.x;
                    this.two = ele.y;
                    canvas.onmousemove = e => {
                        hasmove = true
                        if (hasmove) {
                            let ele = windowToCanvas(canvas, e.clientX, e.clientY);
                            context.clearRect(0, 0, canvas.width, canvas.height);

                            this.three = ele.x;
                            this.four = ele.y;
                            context.strokeStyle = "red";
                            context.strokeRect(
                                this.one,
                                this.two,
                                this.three - this.one,
                                this.four - this.two
                            );
                        }
                        //鼠标移动的时候
                    };
                }, 50)

            };
            // canvas.onmouseup = e => {
            //   iscanvas = true
            //   let whyDialogs = document.getElementsByClassName('whyDialogs')
            //   if(whyDialogs.length){
            //     for (let i = 0; i < whyDialogs.length; i++) {
            //       if(whyDialogs[i].style.left == '-2.5rem'){
            //         this.closefacelist();
            //       }
            //     }
            //   }
            //   this.isrecognition = true
            //   if (hasmove) {
            //     canvas.onmousemove = null;
            //     if (Math.abs(this.three - this.one) < 10 && Math.abs(this.four - this.two) < 10) {
            //       this.$notify({
            //         type: 'warning',
            //         message: '不满足智能标注要求,请重新框选或手工填写！',
            //         position: 'bottom-right',
            //         duration: 3000
            //       });
            //       return
            //     }
            //     this.showFaceLog = false
            //     this.showFaceLib = false

            //     context.stroke();
            //     this.handlable();
            //   } else {
            //     this.$notify({
            //       type: 'warning',
            //       message: '不满足智能标注要求,请重新框选或手工填写！',
            //       position: 'bottom-right',
            //       duration: 3000
            //     });
            //     this.one = ''
            //     context.clearRect(0, 0, canvas.width, canvas.height);
            //     canvas.onmousemove = null;
            //     this.clearLable();
            //   }
            //   hasmove = false
            // };
            //表示点击的时候离开了时
            divs.onmouseup = e => {
                // isdivs = true
                let whyDialogs = document.getElementsByClassName('whyDialogs')
                if (whyDialogs.length) {
                    for (let i = 0; i < whyDialogs.length; i++) {
                        if (whyDialogs[i].style.left == '-2.5rem') {
                            this.closefacelist();
                        }
                    }
                }
                this.isrecognition = true
                if (hasmove) {
                    canvas.onmousemove = null;
                    if (Math.abs(this.three - this.one) < 10 && Math.abs(this.four - this.two) < 10) {
                        this.$notify({
                            type: 'warning',
                            message: '不满足智能标注要求,请重新框选或手工填写！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        return
                    }
                    this.showFaceLog = false
                    this.showFaceLib = false
                    context.stroke();
                    this.handlable();
                } else {
                    this.isrecognition = false
                    this.$notify({
                        type: 'warning',
                        message: '不满足智能标注要求,请重新框选或手工填写！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    this.one = ''
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.onmousemove = null;
                    this.clearLable();
                }
                hasmove = false
            };

            canvas.onmouseout = (e) => {
                hasmove = false
                canvas.onmousemove = null;
            }
        },

        //鼠标画框弹起后的事件 开始做手工标注并识别
        handlable() {
            if (this.one == "") {
                return;
            }
            if (this.recognition == 'true') {
                let imgs
                let divs
                if (this.isonline) {
                    divs = document.getElementById("hisPlayCanvas");
                    imgs = document.getElementById("hisPlayImgUrl");
                } else {
                    divs = document.getElementById("VideoPlayCanvas");
                    imgs = document.getElementById("VidoePlayImgUrl");
                }
                var imgw = imgs.naturalWidth;
                var imgh = imgs.naturalHeight;
                var divw = divs.clientWidth;
                var divh = divs.clientHeight;
                //x 表示点位相对于图片的起点左上角的横坐标点
                //y表示点位相当于图片的起点左上角的综坐标点
                //w h 表示画框相对于图片的宽高
                let x = parseInt(imgw * this.one / divw);
                let y = parseInt(imgh * this.two / divh);
                let w = parseInt(imgw * (this.three - this.one) / divw);
                let h = parseInt(imgh * (this.four - this.two) / divh);
                //如果w h 大于0 表示是从左上角开始从下开始画PosX: 655PosY: 787Width: 185Height: 254  第一种方式不变
                //如果 w>0 h<0 表示是从左下角开始从上开始画   PosX: 549 PosY: 1024 Width: 353 Height: -252
                //如果 w<0 h>0 表示是从右上角开始从下开始画  PosX: 794PosY: 849Width: -225 Height: 192
                //如果 w<0 h<0 表示是从右上角开始从下开始画PosX: 816PosY: 1044Width: -237Height: -229
                if (w > 0 && h < 0) {
                    // 1024 + -252获取高度
                    //把左下角横坐标加上元素的高度(负数)，变成左上角的横坐标，然后高度变成正数
                    y = y + h
                    h = Math.abs(h)
                } else if (w < 0 && h > 0) {
                    // 把右上角的纵坐标减去宽度变成左上角的纵坐标 然后宽度变成正数
                    x = x + w
                    w = Math.abs(w)
                } else if (w < 0 && h < 0) {
                    // 把右上角的纵坐标减去宽度变成左上角的纵坐标 然后宽度变成正数
                    //把左下角横坐标加上元素的高度(负数)，变成左上角的横坐标，然后高度变成正数
                    x = x + w
                    y = y + h
                    w = Math.abs(w)
                    h = Math.abs(h)
                }
                let data = {
                    imgUrl: this.videoimg,
                    PosX: x,
                    PosY: y,
                    Width: w,
                    Height: h,
                    taskSource: 1
                };
                data = this.$qs.stringify(data);
                this.$http.post("vsas/searchImg/img/recognition", data).then(res => {
                    this.isrecognition = false
                    this.disableClick = false
                    if (res == undefined || res.data.code != 200) {
                        this.$notify({
                            type: 'warning',
                            message: '不满足智能标注要求,请重新框选或手工填写！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.suspicion = {
                            suspicionUuid: '',
                            suspicionType: '-1',
                            suspicionName: '标注池'
                        }
                        this.lableName = '嫌疑目标人'
                        this.checkShow = 1;
                        this.personshow = true;
                        this.carshow = this.cpshow = false;
                        this.pedestrian.type_index = 0
                        let imgs
                        let cans
                        if (this.isonline) {
                            imgs = document.getElementById("hisPlayImgUrl")
                            cans = document.getElementById("hisPlayCanvas")
                        } else {
                            imgs = document.getElementById("VidoePlayImgUrl")
                            cans = document.getElementById("VideoPlayCanvas")
                        }
                        this.pedestrian.obj_left = this.one * imgs.naturalWidth / cans.clientWidth //  左上
                        this.pedestrian.obj_top = this.two * imgs.naturalHeight / cans.clientHeight //  左下
                        this.pedestrian.obj_right = this.three * imgs.naturalWidth / cans.clientWidth //  右上
                        this.pedestrian.obj_bootom = this.four * imgs.naturalHeight / cans.clientHeight
                        this.clearLable();
                    } else if (res.data.code == 200) {
                        this.suspicion = {
                            suspicionUuid: '',
                            suspicionType: '-1',
                            suspicionName: '标注池'
                        }
                        this.checkRadio = 1
                        if (res.data.data[0].type_index == 0) {
                            this.lableName = '嫌疑目标人'
                            this.checkShow = 1;
                            this.getSuspcition(this.checkShow)
                            this.pedestrian = res.data.data[0];
                            this.personshow = true;
                            this.carshow = this.cpshow = false;
                            this.PersonAge = this.pedestrian.age_type; //年龄段
                            this.EthicCode = this.pedestrian.nation_type; // 民族代码
                            this.Gender = this.pedestrian.sex_type; //  性别
                            this.BagStyle = this.pedestrian.bag_type; // 包款式
                            this.BagColor = this.pedestrian.bagcolor_type; // 包颜色
                            this.HandArticle = this.pedestrian.carrying_type; // 携物(指手上拿的東西)
                            this.PantsStyle = this.pedestrian.down_type; // 下衣类型
                            this.CulotteColor = this.pedestrian.downcolor_type; // 下衣颜色
                            this.HairStyle = this.pedestrian.head_type; // 发型
                            this.HairColor = this.pedestrian.headcolor_type; // 头发颜色
                            this.posture = this.pedestrian.shape_type; //体态
                            this.ShoesStyle = this.pedestrian.shoe_type; //   鞋子款式
                            this.ShoesColor = this.pedestrian.shoecolor_type; //  鞋子颜色
                            this.CoatStyle = this.pedestrian.up_type; //  上衣款式
                            this.Color = this.pedestrian.upcolor_type; // 上衣颜色
                            this.CoatTexture = this.pedestrian.uptext_type; //  上衣纹理
                            this.PersonView = this.pedestrian.view_type; //  朝向
                        } else if (res.data.data[0].type_index == 1 || res.data.data[0].type_index == 2 || res.data.data[0].type_index == 3) {
                            this.checkShow = 2;
                            this.getSuspcition(this.checkShow)
                            this.lableName = '嫌疑骑车人'
                            this.pedestrian = res.data.data[0];
                            this.cpshow = true;
                            this.carshow = this.personshow = false;
                            this.cptarget = this.pedestrian.traceTypeName; //目标类型
                            this.BikeBag = this.pedestrian.bag_type; //包款式
                            this.BikeBagColor = this.pedestrian.bagcolor_type; //包颜色
                            this.BikeColor = this.pedestrian.carcolor_type; // 所骑车颜色
                            this.BikeCarray = this.pedestrian.carrying_type; // 是否携物
                            this.BikeCulotteStyle = this.pedestrian.down_type; // 下衣类型
                            this.BikeCulotteColor = this.pedestrian.downcolor_type; // 下衣颜色
                            this.EyePart = this.pedestrian.eye_part; // 眼部特征
                            this.BikeHairStyle = this.pedestrian.head_type; // 发型
                            this.MouthPart = this.pedestrian.mouth_part; // 嘴部特征
                            this.ScarfPart = this.pedestrian.scarf; //  围脖
                            this.posture = this.pedestrian.shape_type; //   体态
                            this.BikeUmbrella = this.pedestrian.umbrella_flag; //   是否打伞
                            this.BikeCoatStyle = this.pedestrian.up_type; //  上衣款式
                            this.BikeCoatStyleColor = this.pedestrian.upcolor_type; // 上衣颜色
                            this.BikeCoatTexture = this.pedestrian.uptext_type; //  上衣纹理
                            this.BikeTowards = this.pedestrian.view_type; //  朝向
                            this.Driver = this.pedestrian.driver_count; //  驾驶人数
                            this.PersonAge = this.pedestrian.age_type; //  年龄段
                            this.EthicCode = this.pedestrian.nation_type; // 民族代码
                            this.Gender = this.pedestrian.sex_type; //  性别
                        } else if (res.data.data[0].type_index == 4 || res.data.data[0].type_index == 5 || res.data.data[0].type_index == 6 || res.data.data[0].type_index == 7 || res.data.data[0].type_index == 8) {
                            this.checkShow = 3;
                            this.getSuspcition(this.checkShow)
                            this.carshow = true;
                            this.lableName = '嫌疑目标车'
                            this.cpshow = this.personshow = false;
                            this.pedestrian = res.data.data[0];
                            this.carPlateColor = this.pedestrian.plate_color; //车牌颜色
                            this.cartarget = this.pedestrian.traceTypeName; //目标类型
                            this.carColor = this.pedestrian.vehicle_color_id; //车辆颜色
                            this.carPlateNum = this.pedestrian.plate_number; //车牌号码
                            this.PlateClass = this.pedestrian.plate_class;
                        } else {
                            if (this.$route.path == '/videoCombat/videoplay') {
                                this.$notify({
                                    type: 'warning',
                                    message: '不满足智能标注要求,请重新框选或手工填写！',
                                    position: 'bottom-right',
                                    duration: 3000
                                });
                            }
                            this.lableName = '嫌疑目标人'
                            this.checkShow = 1;
                            this.personshow = true;
                            this.carshow = this.cpshow = false;
                            this.pedestrian = res.data.data[0];
                            this.pedestrian.type_index = 0
                            let imgs
                            let cans
                            if (this.isonline) {
                                imgs = document.getElementById("hisPlayImgUrl")
                                cans = document.getElementById("hisPlayCanvas")
                            } else {
                                imgs = document.getElementById("VidoePlayImgUrl")
                                cans = document.getElementById("VideoPlayCanvas")
                            }
                            this.pedestrian.obj_left = this.one * imgs.naturalWidth / cans.clientWidth //  左上
                            this.pedestrian.obj_top = this.two * imgs.naturalHeight / cans.clientHeight //  左下
                            this.pedestrian.obj_right = this.three * imgs.naturalWidth / cans.clientWidth //  右上
                            this.pedestrian.obj_bootom = this.four * imgs.naturalHeight / cans.clientHeight
                            this.clearLable();
                        }
                        if (this.$route.path == '/videoCombat/videoplay' || this.$route.path == '/videoCombat/historyvideo') {
                            this.refaceList = []
                        } else {
                            this.refaceList = res.data.data
                            // this.refaceList = []
                            if (res.data.data[0].faces != undefined) {
                                this.showFaceLog = true
                            }
                        }
                    }
                });
            } else {
                this.isrecognition = false
                this.disableClick = false
                let video = setInterval(() => {
                    if (this.videoUrl.length > 5) {
                        let imgs
                        let cans
                        this.pedestrian.type_index = 0;
                        this.videoUrl = sessionStorage.getItem("Imgseek").slice(4);
                        this.Canvasclick = false;
                        this.checkShow = 1;
                        this.personshow = true;
                        this.carshow = this.cpshow = false;
                        if (this.isonline) {
                            imgs = document.getElementById("hisPlayImgUrl")
                            cans = document.getElementById("hisPlayCanvas")
                        } else {
                            imgs = document.getElementById("VidoePlayImgUrl")
                            cans = document.getElementById("VideoPlayCanvas")
                        }
                        this.pedestrian.obj_left = this.one * imgs.naturalWidth / cans.clientWidth //  左上
                        this.pedestrian.obj_top = this.two * imgs.naturalHeight / cans.clientHeight //  左下
                        this.pedestrian.obj_right = this.three * imgs.naturalWidth / cans.clientWidth //  右上
                        this.pedestrian.obj_bootom = this.four * imgs.naturalHeight / cans.clientHeight
                        this.isrecognition = false
                        clearInterval(video)
                    }
                }, 200);

            }
        },
        closeVideo() {
            if (this.ishandupdate) {
                this.updateVideo();
            } else {
                this.videoOk();
            }

        },
        //返回人的信息
        getpersonInfo() {
            let AllObj = {}
            AllObj.ageType = this.PersonAge //年龄段
            AllObj.bagStyle = this.BagStyle // 包款式
            AllObj.bagColor = this.BagColor // 包颜色
            AllObj.appendant = this.HandArticle // 携物(指手上拿的東西)
            AllObj.trousersStyle = this.PantsStyle // 下衣类型
            AllObj.trousersColor = this.CulotteColor // 下衣颜色
            AllObj.hairStyle = this.HairStyle // 发型
            AllObj.hairColor = this.HairColor // 头发颜色
            AllObj.ethicCode = this.EthicCode // 民族代码
            AllObj.genderCode = this.Gender //  性别
            AllObj.bodyType = this.posture //体态
            AllObj.shoesStyle = this.ShoesStyle //   鞋子款式
            AllObj.shoesColor = this.ShoesColor //  鞋子颜色
            AllObj.coatStyle = this.CoatStyle //  上衣款式
            AllObj.coatColor = this.Color // 上衣颜色
            AllObj.coatTexture = this.CoatTexture //  上衣纹理
            AllObj.viewType = this.PersonView //  朝向
            AllObj.typeIndex = this.getLable.typeIndex
            AllObj.leftTopX = this.getLable.leftTopX //  左上
            AllObj.leftTopY = this.getLable.leftTopY //  左下
            AllObj.rightBtmX = this.getLable.rightBtmX //  右上
            AllObj.rightBtmY = this.getLable.rightBtmY //  右下
            return AllObj
        },
        //返回骑车人的信息
        getbicInfo() {
            let AllObj = {}
            AllObj.ageType = this.PersonAge //年龄段
            AllObj.bagStyle = this.BikeBag //包款式
            AllObj.bagColor = this.BikeBagColor //包颜色
            AllObj.vehicleColor = this.BikeColor // 所骑车颜色
            AllObj.carryingType = this.BikeCarray == '否' ? 0 : 1 // 是否携物
            AllObj.trousersStyle = this.BikeCulotteStyle // 下衣类型
            AllObj.trousersColor = this.BikeCulotteColor // 下衣颜色
            AllObj.driverCount = parseInt(this.Driver) //  驾驶人数
            AllObj.eyePart = this.EyePart // 眼部特征
            AllObj.hairStyle = this.BikeHairStyle // 发型
            AllObj.mouthPart = this.MouthPart // 嘴部特征
            AllObj.ethicCode = this.EthicCode // 民族代码
            AllObj.scarf = this.ScarfPart //围脖
            AllObj.genderCode = this.Gender //  性别
            AllObj.bodyType = this.posture //   体态
            AllObj.umbrellaFlag = this.BikeUmbrella == '否' ? 0 : 1 //   是否打伞
            AllObj.coatStyle = this.BikeCoatStyle //  上衣款式
            AllObj.coatColor = this.BikeCoatStyleColor // 上衣颜色
            AllObj.coatTexture = this.BikeCoatTexture //  上衣纹理
            AllObj.viewType = this.BikeTowards //  朝向
            AllObj.traceTypeName = this.cptarget //目标类型
            AllObj.typeIndex = this.getLable.typeIndex
            AllObj.leftTopX = this.getLable.leftTopX //  左上
            AllObj.leftTopY = this.getLable.leftTopY //  左下
            AllObj.rightBtmX = this.getLable.rightBtmX //  右上
            AllObj.rightBtmY = this.getLable.rightBtmY //  右下
            return AllObj
        },
        //返回车的信息
        getcarInfo() {
            let AllObj = {}
            AllObj.plateClass = this.PlateClass
            AllObj.plateColor = this.carPlateColor; //车牌颜色
            AllObj.plateNo = this.carPlateNum; //车辆号牌
            AllObj.vehicleColor = this.carColor; //车辆颜色
            AllObj.vehicleUuid = this.getLable.vehicleUuid; //车辆ID
            AllObj.traceTypeName = this.cartarget; //目标类型
            AllObj.vehicleClass = this.cartarget; //目标类型
            AllObj.typeIndex = this.getLable.typeIndex
            AllObj.leftTopX = this.getLable.leftTopX //  左上
            AllObj.leftTopY = this.getLable.leftTopY //  左下
            AllObj.rightBtmX = this.getLable.rightBtmX //  右上
            AllObj.rightBtmY = this.getLable.rightBtmY //  右下
            return AllObj
        },
        //修改标注属性
        updateVideo() {
            let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]*$/
            if (
                this.$commons.regtest(this.lableName) ||
                this.$commons.regtest(this.remark)
            ) {
                this.$notify({
                    type: "warning",
                    message: "禁止输入特殊字符(<,&,&)",
                    position: "bottom-right",
                    duration: 2000
                });
                return;
            }
            if (this.lableName == '') {
                this.$notify({
                    type: 'warning',
                    message: '请输入标注名称！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            this.disableClick = true
            var AllObj = {}
            if (this.gethanlabel.videoMark.typeId == 1) { //行人
                AllObj = this.getpersonInfo()
            }
            if (this.gethanlabel.videoMark.typeId == 4) {
                //骑车人
                AllObj = this.getbicInfo()
            }
            if (this.gethanlabel.videoMark.typeId == 2) { //汽车
                AllObj = this.getcarInfo()
            }
            var arr2 = [];
            for (var key in AllObj) {
                var obj1 = {}
                obj1["itemCode"] = key,
                    obj1["valueName"] = AllObj[key]
                arr2.push(obj1)
            }
            let data1 = {
                mark: {
                    typeId: this.gethanlabel.videoMark.typeId,
                    videoUrl: this.gethanlabel.videoMark.videoUrl,
                    videoCaptureUrl: this.gethanlabel.videoMark.videoCaptureUrl,
                    deviceId: this.gethanlabel.videoMark.deviceId,
                    caseUuid: this.gethanlabel.videoMark.caseUuid,
                    createTime: '',
                    markName: this.lableName,
                    markId: this.gethanlabel.videoMark.markId
                },
                attrs: arr2,
            }
            data1 = JSON.stringify(data1)
            let data2
            data2 = {
                data: data1,
                remark: this.remark,
            }
            data2 = this.$qs.stringify(data2)
            this.$http.post('vsas/video/mark/update', data2).then(res => {
                if (res.data.code == 200) {
                    this.dialogVisible = false
                    this.$notify({
                        type: 'success',
                        message: '修改成功',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.dialogVisible = false
                    this.$notify({
                        type: 'error',
                        message: '修改失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },

        dataURLtoBlob(dataurl) { // Base64转Blob对象
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {
                type: mime
            });
        },
        // 转Blob (url)
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL !== undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL !== undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },

        //确定标注
        videoOk() {
            let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]*$/
            if (
                this.$commons.regtest(this.lableName) ||
                this.$commons.regtest(this.remark)
            ) {
                this.$notify({
                    type: "warning",
                    message: "禁止输入特殊字符(<,&,&)",
                    position: "bottom-right",
                    duration: 2000
                });
                return;
            }
            if (this.lableName == '') {
                this.$notify({
                    type: 'warning',
                    message: '请输入标注名称！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            // this.istrueCanvas = true
            if (this.one == '') {
                this.$notify({
                    type: 'warning',
                    message: '请框选目标！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (this.videoUrl.indexOf('flv') == -1) {
                this.$notify({
                    type: 'warning',
                    message: '正在下载视频！请稍等！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            //   if (this.disableTrue == true) {
            //     this.$notify({
            //       type: 'warning',
            //       message: '正在下载视频！请稍等！',
            //       position: 'bottom-right',
            //       duration: 3000
            //     });
            //     return
            //   }
            this.disableClick = true
            let imgs
            let cans
            let canvas = document.getElementById('imgcanvas')
            if (this.isonline) {
                imgs = document.getElementById("hisPlayImgUrl")
                cans = document.getElementById("hisPlayCanvas")
            } else {
                imgs = document.getElementById("VidoePlayImgUrl")
                cans = document.getElementById("VideoPlayCanvas")
            }
            //动态创建canvas
            let img = new Image
            let _this = this
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = () => {
                //获取点位在图片中的实际坐标
                let one = Math.ceil(_this.one * imgs.naturalWidth / cans.clientWidth) //  左上
                let two = Math.ceil(_this.two * imgs.naturalHeight / cans.clientHeight) //  左下
                let three = Math.ceil(_this.three * imgs.naturalHeight / cans.clientHeight) //  左下
                let four = Math.ceil(_this.four * imgs.naturalHeight / cans.clientHeight) //  左下
                canvas.width = img.width
                canvas.height = img.height
                let context = canvas.getContext('2d')
                context.clearRect(0, 0, img.width, img.height);
                context.beginPath();
                context.lineWidth = 5;
                context.strokeStyle = "red";
                context.drawImage(img, 0, 0, img.width, img.height)
                context.strokeRect(
                    one,
                    two,
                    three - one,
                    four - two
                );
                context.stroke();
                let base64Codes = canvas.toDataURL("image/png")
                let files = this.dataURLtoBlob(base64Codes)
                let formData = new FormData();
                let file = new File([files], new Date().getTime() + '.jpg');
                formData.append('files', file);
                this.$http({
                    url: '/sms/uploadFile/upload',
                    method: 'post',
                    data: formData
                }).then(reponse => {
                    if (reponse.data.code == 200) {
                        this.dialogVisible = false
                        let isFacePut = this.isFacePut
                        let getsus = this.suspicion
                        var AllObj = {}
                        if (this.pedestrian.type_index == 0) { //行人
                            AllObj = this.getpersonInfo()
                        }
                        if (this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index == 3) {
                            //骑车人
                            AllObj = this.getbicInfo()
                        }
                        if (this.pedestrian.type_index == 4 || this.pedestrian.type_index == 5 || this.pedestrian.type_index == 6 ||
                            this.pedestrian.type_index == 7 || this.pedestrian.type_index == 8) { //汽车
                            AllObj = this.getcarInfo()
                        }
                        let one = Math.ceil(this.one * imgs.naturalWidth / cans.clientWidth) //  左上
                        let two = Math.ceil(this.two * imgs.naturalHeight / cans.clientHeight) //  左下
                        var arr2 = [];
                        for (var key in AllObj) {
                            var obj1 = {}
                            obj1["itemCode"] = key,
                                obj1["valueName"] = AllObj[key]
                            arr2.push(obj1)
                        }
                        let caseUuid = ''
                        if (this.$route.path == '/videoCombat/addcasetwo') {
                            caseUuid = this.$route.query.caseUuid
                        } else {
                            caseUuid = ''
                        }


                        //表示是天网的标注 this.isonline //传手工标注的时候传三个字段
                        let relativeTime //相对时间
                        let genType //是哪一种手工标注
                        let absoluteTime //是不是绝对时间
                        let fileUuid
                        //如果是天网，则absoluteTime是当前的播放的时间，否则就给当前视频播放的相对时间relativeTime
                        if (this.isonline) {
                            absoluteTime = this.$store.state.lableBeginTime
                            genType = 3
                            relativeTime = ''
                            fileUuid = ''
                        } else {
                            absoluteTime = ''
                            genType = 1
                            relativeTime = this.videoplaytime
                            fileUuid = this.videoretriInfo.fileUuid
                        }
                        let data1 = {
                            mark: {
                                typeId: this.pedestrian.type_index,
                                videoUrl: this.videoUrl,
                                deviceId: this.deviceId,
                                caseUuid: caseUuid,
                                createTime: '',
                                fileUuid: fileUuid,
                                relativeTime: relativeTime, //返回给后台的毫秒数
                                genType: genType, //1手工标注产生；2研判产生；3天网标注产生',
                                absoluteTime: absoluteTime, //针对天网标注
                                markName: this.lableName,
                                snapshotFile: this.videoimg, //原始图片
                                videoMarkPos: Math.ceil(this.one) + ',' + Math.ceil(this.two) + ',' + Math.ceil((this.three - this.one)) + ',' + Math.ceil((this.four - this.two)),
                                videoCaptureUrl: reponse.data.data[0],
                                markImgBase64Str: '',
                            },
                            attrs: arr2,
                        }
                        data1 = JSON.stringify(data1)
                        let data2
                        if (this.$route.path == '/videoCombat/addcasetwo') {
                            //if标注行人，骑车人有人脸的情况下和没有人脸的情况下传递的data值，人脸没有人脸featureFlag 给0
                            //else 表示车识别成功后传的坐标,车如果识别失败featureFlag给0
                            if (this.pedestrian.type_index == 0 || this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index == 3) {
                                if (this.pedestrian.faces == '' || this.pedestrian.faces == undefined) {
                                    data2 = {
                                        data: data1,
                                        remark: this.remark,
                                        featureFlag: 0,
                                        feature: '',
                                        facePos: ''
                                    }
                                } else {
                                    data2 = {
                                        data: data1,
                                        remark: this.remark,
                                        featureFlag: 1,
                                        feature: this.pedestrian.faces[0].face_feature,
                                        facePos: (Math.ceil(this.pedestrian.faces[0].face_left) + one) + ',' +
                                            (Math.ceil(this.pedestrian.faces[0].face_top) + two) + ',' +
                                            (Math.ceil(this.pedestrian.faces[0].face_right) - Math.ceil(this.pedestrian.faces[0].face_left)) + ',' +
                                            (Math.ceil(this.pedestrian.faces[0].face_bootom) - Math.ceil(this.pedestrian.faces[0].face_top))
                                    }
                                }
                            } else {
                                if (this.pedestrian.obj_feature == '' || this.pedestrian.obj_feature == undefined) {
                                    data2 = {
                                        data: data1,
                                        remark: this.remark,
                                        featureFlag: 0,
                                        feature: this.pedestrian.obj_feature,
                                    };
                                } else {
                                    data2 = {
                                        data: data1,
                                        remark: this.remark,
                                        featureFlag: 1,
                                        feature: this.pedestrian.obj_feature,
                                    };
                                }

                            }
                        } else {
                            data2 = {
                                data: data1,
                                remark: this.remark,
                                featureFlag: 0,
                            };
                        }
                        let imgrul = this.videoimg
                        data2 = this.$qs.stringify(data2)
                        this.$http.post('/pca/video/mark/mark', data2).then(res => {
                            this.dialogVisible = false;
                            this.disableTrue = true
                            if (res.data.code == 200) {
                                if (this.$route.path == '/videoCombat/videoplay') {
                                    this.$notify({
                                        type: 'success',
                                        message: '标注成功！',
                                        position: 'bottom-right',
                                        duration: 3000
                                    });
                                }
                                if (this.$route.path == '/videoCombat/addcasetwo') {

                                    //加入目标嫌疑人标注池
                                    this.appensus(res.data.data, getsus)
                                }
                                //注释人脸的信息
                                if (isFacePut) {
                                    let markPoints = imgs.naturalWidth + ',' + imgs.naturalHeight + ',' + one + ',' + two
                                    this.addFace(res.data.data, imgrul, markPoints)
                                }
                            } else {
                                this.$notify({
                                    type: 'error',
                                    message: '标注失败！',
                                    position: 'bottom-right',
                                    duration: 3000
                                });
                            }
                        })
                        this.carshow = this.personshow = this.cpshow = false;
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: '标注失败！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.dialogVisible = false
                    }
                });

            }
            console.log(this.videoimg);
            console.log(window.origin + '/fastDfs/' + this.videoimg.slice(this.videoimg.indexOf('group'), this.videoimg.length));
            img.src = window.origin + '/fastDfs/' + this.videoimg.slice(this.videoimg.indexOf('group'), this.videoimg.length)

        },
        //加入目标标注池
        appensus(row, getsus) {
            if (getsus.suspicionType == -1) {
                setTimeout(() => {
                    this.$notify({
                        type: 'success',
                        message: '标注成功，加入标注池成功！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }, 500)
            } else {
                let data = {
                    suspicionType: getsus.suspicionType,
                    suspicionUuid: getsus.suspicionUuid,
                    operateionType: 1,
                    targetUuid: row
                }
                data = this.$qs.stringify(data)
                this.$http.post('pca/casemng/suspicion/update/relevance/mark', data).then(res => {
                    if (res.data.code == 200) {
                        this.$notify({
                            type: 'success',
                            message: '关联嫌疑目标成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: '关联失败！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }

                })
            }


        },
        //做手工标注的时候（仅仅在案件里面识别人脸） 人脸入库 入人像库管理
        addFace(markUuid, imgrul, markPoints) {
            let facePoints = this.refaceList[0].faces[0].face_left + ',' + this.refaceList[0].faces[0].face_top +
                ',' + this.refaceList[0].faces[0].face_right + ',' + this.refaceList[0].faces[0].face_bootom
            let data = {
                faceUuid: '',
                createTime: '',
                faceUrl: imgrul,
                updateTime: '',
                markUuid: markUuid,
                // 要修改markPoints坐标
                markPoints: markPoints,
                facePoints: facePoints,
                suspicionUuid: '',
                caseUuid: this.caseUuid,
                feature: this.refaceList[0].faces[0].face_feature,
            }
            data = this.$qs.stringify(data)
            this.$http.post('sms/face/insterCaseMarkFace', data).then(res => {
                if (res.data.code == 200) {
                    this.$notify({
                        type: 'success',
                        message: '加入标注人脸库成功',
                        position: 'bottom-right',
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: 'error',
                        message: '加入标注人脸库失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        /**
         * @Date: 2019-12-27 11:51:23
         * @description: 关闭之前清空变量的方法
         * @param {type}
         * @return:
         * @name: 陈秀峰
         */
        recogbad() {
            sessionStorage.setItem('imgurl', '')
            sessionStorage.setItem('Imgseek', '')
            this.videoimg = ''
            this.disableTrue = true;
            this.checkShow = 1 //让回到第一个
            this.personshow = true;
            this.isrecognition = true
        },

        //清空标注
        clearLable() {
            this.remark = ''
            this.cpshow = this.carshow = false;
            this.personshow = true
            this.checkShow = 1
            this.PersonAge = this.BagStyle = this.BagColor = this.HandArticle = this.PantsStyle = this.CulotteColor = this.HairStyle = ''
            this.HairColor = this.EthicCode = this.Gender = this.posture = this.ShoesStyle = this.ShoesColor = this.CoatStyle = ''
            this.Color = this.CoatTexture = this.PersonView = this.PersonStatus = this.pose = this.Behavior = this.HabitualAction = ''
            this.PersonAge = this.BikeBag = this.BikeBagColor = this.BikeColor = this.BikeCarray = this.BikeCulotteStyle = this.BikeCulotteColor = ''
            this.Driver = this.EyePart = this.BikeHairStyle = this.MouthPart = this.EthicCode = this.ScarfPart = this.Gender = ''
            this.posture = this.cptIndex = this.BikeUmbrella = this.BikeCoatStyle = this.BikeCoatStyleColor = this.BikeCoatTexture = this.BikeTowards = ''
            this.PlateClass = this.carPlateColor = this.carPlateNum = this.carColor = this.carryingType = ''
            this.VehicleBehavior = this.FrontThing = this.RearThing = this.AutoFoilColor = this.cartarget = this.umbrellaFlag = ''
        },

        //研判消息
        judged() {
            let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]*$/
            if (
                this.$commons.regtest(this.lableName) ||
                this.$commons.regtest(this.remark)
            ) {
                this.$notify({
                    type: "warning",
                    message: "禁止输入特殊字符(<,&,&)",
                    position: "bottom-right",
                    duration: 2000
                });
                return;
            }
            if (this.lableName == '') {
                this.$notify({
                    type: 'warning',
                    message: '请输入研判目标名称！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (this.one == '') {
                this.$notify({
                    type: 'warning',
                    message: '请框选目标',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            if (this.videoUrl.indexOf('flv') == -1) {
                this.$notify({
                    type: 'warning',
                    message: '正在下载视频！请稍等！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return
            }
            //   if (this.disableTrue == true) {
            //     this.$notify({
            //       type: 'warning',
            //       message: '正在下载视频！请稍等！',
            //       position: 'bottom-right',
            //       duration: 3000
            //     });
            //     return
            //   }
            //5.18添加的重新获取图片然后添加到新的图片
            //5.18添加的重新获取图片然后添加到新的图片

            let featureFlag //是否有人脸
            let facePos //坐标
            let feature //特征值
            let imgs
            let cans
            let canvas = document.getElementById('imgcanvas')
            if (this.isonline) {
                imgs = document.getElementById("hisPlayImgUrl")
                cans = document.getElementById("hisPlayCanvas")
            } else {
                imgs = document.getElementById("VidoePlayImgUrl")
                cans = document.getElementById("VideoPlayCanvas")
            }
            let img = new Image
            let _this = this
            this.disableClick = true
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = () => {
                //获取点位在图片中的实际坐标
                let one = Math.ceil(_this.one * imgs.naturalWidth / cans.clientWidth) //  左上
                let two = Math.ceil(_this.two * imgs.naturalHeight / cans.clientHeight) //  左下
                let three = Math.ceil(_this.three * imgs.naturalHeight / cans.clientHeight) //  左下
                let four = Math.ceil(_this.four * imgs.naturalHeight / cans.clientHeight) //  左下
                canvas.width = img.width
                canvas.height = img.height
                let context = canvas.getContext('2d')
                context.clearRect(0, 0, img.width, img.height);
                context.beginPath();
                context.lineWidth = 5;
                context.strokeStyle = "red";
                context.drawImage(img, 0, 0, img.width, img.height)
                context.strokeRect(
                    one,
                    two,
                    three - one,
                    four - two
                );
                context.stroke();
                let base64Codes = canvas.toDataURL("image/png")
                let files = this.dataURLtoBlob(base64Codes)
                let formData = new FormData();
                let file = new File([files], new Date().getTime() + '.jpg');
                formData.append('files', file);
                this.$http({
                    url: '/sms/uploadFile/upload',
                    method: 'post',
                    data: formData
                }).then(reponse => {
                    if (reponse.data.code == 200) {
                        let isFacePut = this.isFacePut
                        //判断 是否有人脸，如果有人脸的话
                        if (this.pedestrian.faces != undefined) {
                            if (this.pedestrian.faces.length) {
                                featureFlag = 1
                                feature = this.pedestrian.faces[0].face_feature
                                facePos = (Math.ceil(this.pedestrian.faces[0].face_left) + one) + ',' +
                                    (Math.ceil(this.pedestrian.faces[0].face_top) + two) + ',' +
                                    (Math.ceil(this.pedestrian.faces[0].face_right) - Math.ceil(this.pedestrian.faces[0].face_left)) + ',' +
                                    (Math.ceil(this.pedestrian.faces[0].face_bootom) - Math.ceil(this.pedestrian.faces[0].face_top))
                            }
                        } else {
                            featureFlag = 0;
                            feature = ''
                            facePos = ''
                        }
                        var AllObj = {};
                        AllObj.createTimeStr = document.getElementById("test1").value;
                        AllObj.markName = this.lableName;
                        if (this.pedestrian.type_index == 0 || this.checkShow == 1) { //行人
                            AllObj = this.getpersonInfo()
                        }
                        if (this.pedestrian.type_index == 1 || this.pedestrian.type_index == 2 || this.pedestrian.type_index == 3 || this.checkShow == 2) {
                            //骑车人
                            AllObj = this.getbicInfo()
                        }
                        if (this.pedestrian.type_index == 4 || this.pedestrian.type_index == 5 || this.pedestrian.type_index == 6 ||
                            this.pedestrian.type_index == 7 || this.pedestrian.type_index == 8 || this.checkShow == 3) { //汽车
                            AllObj = this.getcarInfo()
                        }
                        var arr2 = [];
                        for (var key in AllObj) {
                            var obj1 = {}
                            obj1["itemCode"] = key,
                                obj1["valueName"] = AllObj[key]
                            arr2.push(obj1)
                        }
                        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                        let userId = userInfo.value.userId;
                        let userName = userInfo.value.trueName

                        let relativeTime //相对时间
                        let absoluteTime //是不是绝对时间
                        let fileUuid
                        let videoStartTime
                        //如果是天网的标注，则取出当前天网做标注的时间
                        if (this.isonline) {
                            absoluteTime = this.$store.state.lableBeginTime
                            relativeTime = ''
                            fileUuid = ''
                        } else {
                            absoluteTime = ''
                            relativeTime = this.videoplaytime
                            fileUuid = this.videoretriInfo.fileUuid
                            if (this.videoretriInfo.videoStartTime == undefined) {
                                videoStartTime = this.videoretriInfo.startTime
                            } else {
                                videoStartTime = this.videoretriInfo.videoStartTime
                            }
                        }


                        let dataList = {
                            mark: {
                                typeId: this.pedestrian.type_index,
                                videoUrl: this.videoUrl,
                                videoCaptureUrl: reponse.data.data[0],
                                markName: this.lableName,
                                snapshotFile: this.videoimg, //原始图片
                                videoMarkPos: Math.ceil(this.one) + ',' + Math.ceil(this.two) + ',' + Math.ceil((this.three - this.one)) + ',' + Math.ceil((this.four - this.two)),
                                fileUuid: fileUuid,
                                relativeTime: relativeTime, //返回给后台的毫秒数
                                genType: 2, //1手工标注产生；2研判产生；3天网标注产生',
                                absoluteTime: absoluteTime, //针对天网标注
                                videoStartTime: videoStartTime,
                                markImgBase64Str: '',
                                remark: this.remark
                            },
                            attrs: arr2,
                            judgeVote: {
                                caseUuid: this.caseUuid,
                                deviceId: this.deviceId,
                                userId: userId,
                                suspicion: this.lableName, //嫌疑目标
                                beginTime: '', //时间
                                description: '', //描述
                                location: '', //位置
                                vedioUrl: this.videoUrl, //视频地址
                                imgUrl: reponse.data.data[0], //图片地址
                                userName: userName,
                                featureFlag: featureFlag,
                                facePos: facePos,
                                feature: feature,
                            }
                        }
                        dataList = JSON.stringify(dataList);
                        let data1 = {
                            data: dataList
                        };
                        data1 = this.$qs.stringify(data1);
                        this.$http.post('pca/synergyvote/save', data1).then(res => {
                            this.dialogVisible = false;
                            this.disableTrue = true
                            if (res.data.code == 200) {
                                let imgrul = this.videoimg
                                if (isFacePut) {
                                    let markPoints = imgs.naturalWidth + ',' + imgs.naturalHeight + ',' + one + ',' + two
                                    this.addFace(res.data.data, imgrul, markPoints)
                                }
                                // this.clearcoord();
                                this.$notify({
                                    type: 'success',
                                    message: '研判成功',
                                    position: 'bottom-right',
                                    duration: 3000
                                });
                            } else {
                                this.$notify({
                                    type: 'error',
                                    message: res.data.message,
                                    position: 'bottom-right',
                                    duration: 3000
                                });
                            }
                        })
                    }
                })
            }
            img.src = window.origin + '/fastDfs/' + this.videoimg.slice(this.videoimg.indexOf("group"), this.videoimg.length);


        },
        /*
        点击显示人脸库
        增加显示人脸功能
        */
        showfacelist(index, e) {
            if (e.target.disabled) {
                return
            }
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "正在比对"
            });
            let data = {
                // infoSource:'', // 信 来源编号，人脸批量导入          目前约定值为 1
                // infoCode:'',// 信  库名列表  多个之间用，（英文逗号）隔开
                // caseSource:'',//  案 来源编号，手工标注入库          目前值约定为 2
                // caseCode:'', //  案 库名列表                        目前值约定为100
                faceFeature: this.refaceList[0].faces[index].face_feature //人脸特征
            }
            data = this.$qs.stringify(data)
            this.$http.post('vsas/searchImg/search/face', data).then(res => {
                this.loading.close()
                if (res.data.code == 200) {
                    this.comparisonlist = res.data.data;
                    this.comparTotal = res.data.data.length
                    let whyDialogs = document.getElementsByClassName('whyDialogs')
                    for (let i = 0; i < whyDialogs.length; i++) {
                        whyDialogs[i].style.left = '-2.5rem'
                        whyDialogs[i].style.right = '2.5rem';
                        whyDialogs[i].style.overflow = 'unset';
                    }
                    document.getElementById('manface').style.width = '100%'
                    document.getElementById('manface').style.padding = '0.1rem'
                    document.getElementById('manface').style.border = '1px solid rgba(15, 44, 79, 0.5)'
                    // setTimeout(()=>{
                    // document.getElementsByClassName('aaaa')[0].style.left = '-2.5rem'
                    // document.getElementsByClassName('aaaa')[0].style.right = '2.5rem';
                    // document.getElementsByClassName('aaaa')[0].style.overflow = 'unset';
                    // document.getElementsByClassName('aaaa')[1].style.left = '-2.5rem'
                    // document.getElementsByClassName('aaaa')[1].style.right = '2.5rem';
                    // document.getElementsByClassName('aaaa')[1].style.overflow = 'unset';
                    // document.getElementsByClassName('aaaa')[2].style.left = '-2.5rem'
                    // document.getElementsByClassName('aaaa')[2].style.right = '2.5rem';
                    // document.getElementsByClassName('aaaa')[2].style.overflow = 'unset';
                    // document.getElementById('whyDialog').style.left = '-2.5rem'
                    // document.getElementById('whyDialog').style.right = '2.5rem';
                    // document.getElementById('whyDialog').style.overflow = 'unset';

                    // },500)

                } else {
                    this.$notify({
                        type: 'warning',
                        message: '比对无结果！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            }).catch(() => {
                this.loading.close()
                this.$notify({
                    type: 'warning',
                    message: '比对无结果！',
                    position: 'bottom-right',
                    duration: 3000
                });
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 关闭人脸功能页面
        closefacelist() {
            this.comparisonlist = []
            this.currentPage = 1
            this.leavefaceInfo()
            let whyDialogs = document.getElementsByClassName('whyDialogs')
            if (whyDialogs.length) {
                for (let i = 0; i < whyDialogs.length; i++) {
                    if (whyDialogs[i].style.left == '-2.5rem') {
                        whyDialogs[i].style.left = '0rem'
                        whyDialogs[i].style.right = '0rem';
                        whyDialogs[i].style.overflow = 'unset';
                    }
                }
            }
            document.getElementById('manface').style.width = '0'
            document.getElementById('manface').style.padding = '0'
            document.getElementById('manface').style.border = 'none'
        },
        nextTo() {
            if (this.nextCount <= 0) {
                this.nextCount = 0
            }
            this.nextCount++
            if (this.nextCount >= this.faceToList.length) {
                this.nextCount = this.faceToList.length - 1
                document.getElementById('faceId').style.marginLeft = "-" + document.getElementById('faceDiv').clientWidth * this.nextCount / 100 + 'rem'
                return
            } else {
                document.getElementById('faceId').style.marginLeft = "-" + document.getElementById('faceDiv').clientWidth * this.nextCount / 100 + 'rem'
            }
        },
        prveTo() {
            if (this.nextCount >= this.faceToList.length) {
                this.nextCount = this.faceToList.length - 1
            }
            this.nextCount--
            if (this.nextCount <= 0) {
                this.nextCount = 0
                document.getElementById('faceId').style.marginLeft = 0
                return
            } else {
                document.getElementById('faceId').style.marginLeft = "-" + document.getElementById('faceDiv').clientWidth * this.nextCount / 100 + 'rem'
            }
        },
        //展示人脸的详细信息
        lookfaceInfo(row, e) {
            document.getElementById('faceCase').style.left = (e.clientX - 260) + 'px';
            document.getElementById('faceCase').style.top = (e.clientY - 110) + 'px';
            if (row.suspicionUuid == undefined) { //表示的是人脸的信息
                this.$store.state.showFaceCace = true;
                this.$store.state.showInfo = false;
                this.$store.state.faceInfo = row
            } else { //标注的信息
                let data = {
                    markId: row.markUuid
                };
                data = this.$qs.stringify(data);
                this.$http.post('vsas/video/mark/query/mark/by/id', data).then(res => {
                    if (res.data.code == 200) {
                        if (res.data.data == null) {
                            return
                        }
                        this.$store.state.showFaceCace = false;
                        this.$store.state.showInfo = true
                        document.getElementById('showInfo').style.left = (e.clientX - 260) + 'px'
                        document.getElementById('showInfo').style.top = (e.clientY - 150) + 'px'
                        this.$store.state.lableInfo = res.data.data.videoMark;

                        if (res.data.data.videoMark.typeId == 1) {
                            this.$store.state.showInfoMan = 1 //行人
                            for (let i = 0; i < res.data.data.attrs.length; i++) {
                                let key = res.data.data.attrs[i].itemCode
                                let val = res.data.data.attrs[i].valueName
                                this.$store.state.lableInfoMan[key] = val
                            }
                        } else if (res.data.data.videoMark.typeId == 2) {
                            this.$store.state.showInfoMan = 3 //车
                            for (let i = 0; i < res.data.data.attrs.length; i++) {
                                let key = res.data.data.attrs[i].itemCode
                                let val = res.data.data.attrs[i].valueName
                                this.$store.state.lableInfoMan[key] = val
                            }
                        } else if (res.data.data.videoMark.typeId == 4) {
                            this.$store.state.showInfoMan = 2 //骑车人
                            for (let i = 0; i < res.data.data.attrs.length; i++) {
                                let key = res.data.data.attrs[i].itemCode
                                let val = res.data.data.attrs[i].valueName
                                this.$store.state.lableInfoMan[key] = val
                            }
                        }
                    }
                    // this.$store.state.showFaceCace = true;
                    // this.$store.state.showFaceCace = false;
                    // this.$store.state.showlabel = true
                })
            }
        },
        leavefaceInfo() {
            this.$store.state.showFaceCace = false
            this.$store.state.showInfo = false
        },
        //展示显示人脸的详细信息
        getInfotoLable(row) {
            this.showFaceLib = true
            this.infolable = row
        },
        addFacePut(index) {
            this.$myconfirm({
                type: '提示',
                msg: '是否加入人脸案件库',
                icon: 4,
                btn: {
                    ok: '确定',
                    no: '取消'
                }
            }).then(() => {
                let facePoints = this.refaceList[0].faces[index].face_left + ',' + this.refaceList[0].faces[index].face_top +
                    ',' + this.refaceList[0].faces[index].face_right + ',' + this.refaceList[0].faces[index].face_bootom
                let data = {
                    faceUuid: '',
                    createTime: '',
                    faceUrl: this.videoimg,
                    updateTime: '',
                    markUuid: '',
                    markPoints: this.refaceList[0].obj_left + ',' + this.refaceList[0].obj_top + ',' + this.refaceList[0].obj_right + ',' + this.refaceList[0].obj_bootom,
                    facePoints: facePoints,
                    suspicionUuid: '',
                    caseUuid: this.caseUuid,
                    feature: this.refaceList[0].faces[index].face_feature,
                }
                data = this.$qs.stringify(data)
                this.$http.post('sms/face/insterCaseMarkFace', data).then(res => {
                    if (res.data.code == 200) {
                        this.$notify({
                            type: 'success',
                            message: '加入成功！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '加入失败！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                })
            })
        },
        // 打开案件比对
        caseRatio(row) {
            this.$http.get('pca/casemng/baseinfo/query?caseUuid=' + row.caseUuid).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data == null) {
                        this.$notify({
                            type: 'warning',
                            message: '暂无数据',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    } else {
                        this.$store.state.caseComSon = true
                        this.$store.state.caseUuid = row.caseUuid
                    }
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '比对失败',
                        position: 'bottom-right',
                        duration: 3000
                    });
                }
            })
        },
        childByCaseContrast(val) {
            this.isaaa = val
        },
        //获取嫌疑人的目标的个数
        getSuspcition() {
            let data = {
                caseUuid: this.$route.query.caseUuid,
                suspicionType: this.checkShow
            }
            this.$http.get('/pca/casemng/suspicion/list/type', {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data.length == 0) {
                        this.suspcitionList = [];
                    } else {
                        this.suspcitionList = res.data.data
                    }

                }
            })
        },


    }
};
export default mixins
