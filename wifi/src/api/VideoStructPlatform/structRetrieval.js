/*
 * @Author: your name
 * @Date: 2020-05-12 19:38:41
 * @LastEditTime : 2021-08-02 09:42:18
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\api\casestudy\videoRetrieval.js
 */
import {
    draw,
    coorValue,
    imgwh,
    Line,
    windowToCanvas
} from "../../page/videoCombat/canvas.js";

const mixins = {
    data: function () {
        return {
            dialogVisible: false,
            tastName: "", // 任务名称
            filterText: "", // 搜索节点
            filterText1: "", // 搜索节点
            retrimodel: 1, // 检索方式
            targetsize: 2, // 目标大小
            targetqxd: 2, // 目标清晰度
            tableData: [],
            coordinates: [], // 装点击坐标的数组
            circle: [], // 装圆点的坐标
            actualcoord: [], // 实际图片的坐标
            actuacircle: [], // 实际圆点的坐标
            videoUrl: "",
            videoImg: "", // 视频的图片
            showimg: false,
            showCanvas: false,
            points: [],
            beginData: this.getEarlierDate(), // 开始时间
            endData: this.getCurrentDate(), // 结束时间
            treeline: [],
            gbDeviceId: "", // 设备ID
            loading: null,
            fileNum: 0,
            isbdclick: false, // 是否双击完成
            dialogVisible3: false, // 已选视频列表
            dialogVisible2: false, // 选择视频列表
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            multiplist: [], // 当前选中的所有的数据
            beginTime: '',
            endTime: '',
            issesionAll: true,
            colorRetrial: false, //颜色检索
            opencolorReval: false, //是否打开颜色检索
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            colorpoints: '',
            caseUuid:'',  //案件ID
            lablemarkList:[],  //数组
            deviceids:'', //点位ID
        };
    },
    methods: {
        getcoord() {
            let divs
            divs = document.getElementById("firstdiv");
            let canvas = document.getElementById("colorcanvas");
            var context = canvas.getContext("2d");
            context.beginPath();
            context.lineWidth = 2;
            var hasmove = false
            canvas.onmousedown = e => {
                hasmove = false
                setTimeout(() => {
                    let ele = windowToCanvas(canvas, e.clientX, e.clientY);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    this.one = Math.ceil(ele.x);
                    this.two = Math.ceil(ele.y);
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
                    };
                }, 50)

            };
            //表示点击的时候离开了时
            divs.onmouseup = e => {
                this.hanld()
                canvas.onmousemove = null;
                if (Math.abs(this.three - this.one) < 10 && Math.abs(this.four - this.two) < 10) {
                    return
                }
                context.stroke();

            };

            canvas.onmouseout = (e) => {
                hasmove = false
                canvas.onmousemove = null;
            }
        },
        hanld() {
            console.log("有没有执行到这里");
            let imgs = document.getElementById('colorimg')
            let canvas = document.getElementById('colorcanvas')
            var imgw = imgs.naturalWidth;
            var imgh = imgs.naturalHeight;
            var divw = canvas.clientWidth;
            var divh = canvas.clientHeight;
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
            this.colorpoints = x + ',' + y + ',' + w + ',' + h
            // console.log(this.colorpoints,"this.colorpoints");
            this.getbaseUrl()
        },
        getbaseUrl() {
            // this.baseCode = '';
            let img = new Image();
            img.setAttribute("crossOrigin", "anonymous");
            let cans = document.getElementById("colorcanvas");
            img.onload = () => {
                //获取点位在图片中的实际坐标
                let ceshicanvas = document.createElement("canvas");
                ceshicanvas.setAttribute("id", "ceshicanvas");
                let one = Math.ceil(
                    (this.one * img.naturalWidth) / cans.clientWidth
                ); //  左上
                let two = Math.ceil(
                    (this.two * img.naturalHeight) / cans.clientHeight
                ); //  左下
                let three = Math.ceil(
                    (this.three * img.naturalHeight) / cans.clientHeight
                ); //  左下
                let four = Math.ceil(
                    (this.four * img.naturalHeight) / cans.clientHeight
                ); //  左下
                ceshicanvas.width = three - one;
                ceshicanvas.height = four - two;
                let ctx = ceshicanvas.getContext("2d");
                ctx.drawImage(
                    img,
                    one,
                    two,
                    three - one,
                    four - two,
                    0,
                    0,
                    three - one,
                    four - two
                );
                // console.log("执行到这里2");
                this.baseCode = ceshicanvas.toDataURL("image/png");
                // console.log(this.baseCode,"this.baseCode");
            };
            img.src =
            window.origin +
            "/fastDfs/" +
            this.imglist[this.firstImgIndex].slice(
            this.imglist[this.firstImgIndex].lastIndexOf("/"),
            this.imglist[this.firstImgIndex].length
            );
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
        // 打开颜色检索
        clickOpenColor(val) {
            if (this.imglist.length || (this.isonline && this.videoImg)) {
                if (val) {
                    this.colroretrivaltitle = '编辑颜色检索'
                    this.opencolorReval = true
                } else {
                    this.colroretrivaltitle = '打开颜色检索'
                    this.colorpoints = ''
                    this.firstname = '255,0,0'
                    this.twoname = '255,0,0'
                    this.threename = '255,0,0'
                    this.colorRange = '1'
                }
            } else {
                this.colorRetrial = false
                this.opencolorReval = false
            }
        },
        setName() {
            this.$nextTick(() => {
                // isonline 表示的是点击的天网点位
                // 打开天网点位的时候请求天网树的列表，获取当前点位的设备ID，通过点位的deviceId来判断
                if (this.isonline) {
                    setTimeout(() => {
                        this.beginData = this.getEarlierDate(), // 开始时间
                            this.endData = this.getCurrentDate(), // 结束时间
                            this.OpenTheTime3("#time1", "#time2");
                        this.getlineTree();
                    }, 200);
                } else {
                    this.getAllvideo(1);

                }
                this.clearcanvas();
            });
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            let Name = userInfo.value.userName;
            let date = new Date();
            let year = date.getFullYear(); // 获取系统的年；
            let mouth =
                date.getMonth() + 1 < 10 ?
                "0" + (date.getMonth() + 1) :
                date.getMonth() + 1; // 获取系统月份，由于月份是从0开始计算，所以要加1
            let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); // 获取系统日，
            let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); // 获取系统时，
            let min =
                date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); // 分
            let seon =
                date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); // 秒
            this.tastName =
                Name + year + mouth + day + hour + min + seon + "视频检索";
        },
        // 打开检索第二步得到所有的视频，获取图片，然后画框
        // 得到视频
        getAllvideo(type) {
            if(this.deviceids == ''){
                return
            }
            let data = {
                pageNum: 1,
                pageSize: 2000,
                statusl: "",
                begin: this.beginTime,
                end: this.endTime,
                deviceId: this.deviceids,
                caseUuid: this.caseUuid,
                orderBy: "start_time",
                orderType: "asc"
            };
            this.$http.get("vsas/collection/offline/list", {
                params: data
            }).then(res => {
                if (res.data.code == 200) {
                    //先请求所有的视频是格式支持，并且非转码失败的视频
                    let result = [];
                    this.tableData = [];
                    result = res.data.data.list; // 当前视频
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].dataType != 0 && (result[i].status == 2 || result[i].status == 3 || result[i].status == 4 || result[i].status == 6)) {
                            this.tableData.push(result[i]);
                        }
                    }
                    this.totalCount = this.tableData.length;

                    //如果之前有选中的视频，则覆盖选中之前的视频，否则不选中其他的视频
                    if (type == 1) {
                        this.multiplist = []
                        this.multiplist = this.tableData;

                        if (this.multiplist.length) {
                            if (this.dialogVisible2) {
                                //重置后先清空选中的数组，要不然会重复显示
                                this.$refs.checkTable.clearSelection();
                                this.tableData.forEach(row => {
                                    this.$refs.checkTable.toggleRowSelection(row, true);
                                });
                            }
                        }

                    } else {
                        // console.log(this.multiplist,'什么鬼')
                        if (this.multiplist.length) {
                            let multiplist = this.multiplist
                            // if (this.issesionAll == false) {
                            this.$refs.checkTable.clearSelection();
                            multiplist.forEach(row => {
                                this.$refs.checkTable.toggleRowSelection(row, true);
                            });
                            this.issesionAll = true;
                            return;
                            // }
                        }
                    }


                }
            });
        },
        // 通过获取快照来 判断图片的宽度和高度
        dialogvideo() {
            this.clearcanvas();
            this.$nextTick(() => {
                setTimeout(() => {
                    var imgs = document.getElementById("imgsVideoVal");
                    var reterimg = document.getElementById("reterimgVideoVal");
                    document.getElementById("imgsVideoVal").style.display = "block";
                    imgwh(imgs, reterimg);
                    this.showimg = true;
                    setTimeout(() => {
                        var canvas = document.getElementById("canvasVideoVal");
                        var canvastwo = document.getElementById("canvasVideo");
                        canvas.setAttribute("width", imgs.clientWidth);
                        canvas.setAttribute("height", imgs.clientHeight);
                        canvastwo.setAttribute("width", imgs.clientWidth);
                        canvastwo.setAttribute("height", imgs.clientHeight);
                    }, 200);
                }, 200);
            });
        },
        // 请求天网设备
        getlineTree() {
            this.$http.post("sms/ape/selectByVideo").then(res => {
                this.treeline = res.data.data;
                let treeline = res.data.data;
                // 通过树列表来获取设备ID
                for (let i = 0; i < treeline.length; i++) {
                    if (treeline[i].apes) {
                        for (let j = 0; j < treeline[i].apes.length; j++) {
                            if (this.deviceids == treeline[i].apes[j].shebeiId) {
                                this.gbDeviceId = treeline[i].apes[j].apeId;
                            }
                        }
                    }
                }
            });
        },
        // 通过时间段来查询天网快照,与C++进行http交互
        searhlineImg() {
            this.videoImg = '';
            // let aaa = '/searchHisImg/TakeGBSnapshot?file='+ sessionStorage.getItem('controlHead') + this.gbDeviceId + '?t=' + this.beginData.replace(' ','_') +"@" +this.endData.replace(' ','_');
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "加载中"
            });
            this.$http.post("/searchHisImg/TakeGBSnapshot?file=" + sessionStorage.getItem("controlHead") +
                    this.gbDeviceId + "&t=" + this.beginData.replace(" ", "_") + "@" + this.endData.replace(" ", "_") + "&deviceId=" + this.deviceids)
                .then(res => {
                    if (res.data.code == 200) {
                        this.loading.close();
                        this.videoImg = res.data.path;
                        let image = new Image();
                        image.onload = () => {
                            this.dialogvideo();
                        };
                        image.src = res.data.path;
                    } else {
                        this.$notify({
                            type: "warning",
                            message: "获取场景图失败，请重试！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        this.loading.close();
                    }
                }).catch(() => {
                    this.$notify({
                        type: "warning",
                        message: "获取场景图失败，请重试！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    this.loading.close();
                });
        },
        resetReter(){
            this.isbdclick = false;
            this.showimg = false;
            this.coordinates = [];
            this.actuacircle = [];
            this.tableData = [];
            this.multiplist = [];
            this.points = [];
            this.circle = [], // 装圆点的坐标
            this.actualcoord = [], // 实际图片的坐标
            this.videoImg = '';
            this.clearcanvas();
            this.retrimodel = 1;
            this.targetsize = 2;
            this.targetqxd = 2;
            this.issesionAll = true
            this.beginTime = ''
            this.endTime = ''
            this.colorRetrial = false
            this.imglist = []
            this.checkradio = '0'
            this.firstImgIndex = 0 //当前颜色检索的图片
            this.lableDeviceList = {}
            this.firstname = '255,0,0'
            this.twoname = '255,0,0'
            this.threename = '255,0,0'
            this.colorRange = '1'
            this.colroretrivaltitle = '打开颜色检索'
            this.colorpoints = ''
            this.one = ''
            this.two = ''
            this.three = ''
            this.four = ''
            this.baseUrl = ''
        },


        cancleOk() {
            window.axiosProArr.forEach((e, i) => {
                if (sessionStorage.getItem('isUploadTrue') != 1) {
                    e.cancle();
                    delete window.axiosProArr[i]
                }
            });
            this.isbdclick = false;
            this.showimg = false;
            this.coordinates = [];
            this.actuacircle = [];
            this.tableData = [];
            this.multiplist = [];
            this.points = [];
            this.circle = [], // 装圆点的坐标
                this.actualcoord = [], // 实际图片的坐标
                this.videoImg = '';
            this.$emit("childByValue", false);
            this.clearcanvas();
            this.retrimodel = 1;
            this.targetsize = 2;
            this.targetqxd = 2;
            this.reset();
            this.issesionAll = true
            this.beginTime = ''
            this.endTime = ''
            this.colorRetrial = false
            this.imglist = []
            this.checkradio = '0'
            this.firstImgIndex = 0 //当前颜色检索的图片
            this.lableDeviceList = {}
            this.firstname = '255,0,0'
            this.twoname = '255,0,0'
            this.threename = '255,0,0'
            this.colorRange = '1'
            this.colroretrivaltitle = '打开颜色检索'
            this.colorpoints = ''
            this.one = ''
            this.two = ''
            this.three = ''
            this.four = ''
            this.baseUrl = ''
        },
        // 画线
        getcanvas(e) {
            // this.isbdclick = false;
            var context = document.getElementById("canvasVideoVal").getContext("2d");
            var x = e.offsetX;
            var y = e.offsetY;
            if (this.retrimodel === 1) {
                // context.clearRect(0, 0, e.target.clientWidth, e.target.clientHeight);
                // drawPolygon(context, this.coordinates);
                // //如果当前坐标小于等于2则使用前面两个点进行坐标绘制
                if (!this.isbdclick) {
                    this.coordinates.push([e.offsetX, e.offsetY]);
                    // if(this.coordinates.length >= 2){
                    //   if(this.coordinates[0][0] == this.coordinates[1][0] && this.coordinates[0][1] == this.coordinates[1][1]){
                    //     this.coordinates.splice(1,1);
                    //   }
                    // }
                    // if(this.coordinates.length >= 3){
                    //   if(this.coordinates[1][0] == this.coordinates[2][0] && this.coordinates[1][1] == this.coordinates[2][1]){
                    //     this.coordinates.splice(2,1);
                    //   }
                    // }
                    this.getdbDeweight();
                    if (this.coordinates.length == 2) {
                        draw(this.coordinates, context);
                    } else if (this.coordinates.length > 2) {
                        // 当数组大于2个的时候永远使用最后两项来画图
                        draw(this.coordinates.slice(this.coordinates.length - 2, this.coordinates.length), context);
                    }
                }
            }
            if (this.retrimodel === 2) {
                this.coordinates.push([e.offsetX, e.offsetY]);
                // if(this.coordinates.length >= 2){
                //     if(this.coordinates[0][0] == this.coordinates[1][0] && this.coordinates[0][1] == this.coordinates[1][1]){
                //       this.coordinates.splice(1,1);
                //     }
                //   }
                //   if(this.coordinates.length >= 3){
                //     if(this.coordinates[1][0] == this.coordinates[2][0] && this.coordinates[1][1] == this.coordinates[2][1]){
                //       this.coordinates.splice(2,1);
                //     }
                //   }
                this.getdbDeweight();

                draw(this.coordinates, context);
            }
            if (this.retrimodel === 3) {
                this.coordinates.push([e.offsetX, e.offsetY]);
                this.getdbDeweight();
                draw(this.coordinates, context); // 线
                if (this.coordinates.length > 2) {
                    this.showCanvas = true;
                    this.getyuan();
                }
            }
        },
        getdbDeweight() {
            if (this.coordinates.length >= 2) {
                if (this.coordinates[0][0] == this.coordinates[1][0] && this.coordinates[0][1] == this.coordinates[1][1]) {
                    this.coordinates.splice(1, 1);
                }
            }
            if (this.coordinates.length >= 3) {
                if (this.coordinates[1][0] == this.coordinates[2][0] && this.coordinates[1][1] == this.coordinates[2][1]) {
                    this.coordinates.splice(2, 1);
                }
            }
        },
        // 3.画框结束前结束画线，并存储
        dbgetcoor(e) {
            if (this.retrimodel == 2 || this.retrimodel == 3) {
                if (this.coordinates.length >= 2) {
                    if (this.coordinates[0][0] == this.coordinates[1][0] && this.coordinates[0][1] == this.coordinates[1][1]) {
                        this.coordinates.shift();
                        return;
                    }
                }
            }

            // 判断是否双击完成，双击完成不能再次点击
            if (!this.isbdclick) {
                var context = document.getElementById('canvasVideoVal').getContext('2d');
                var x = e.offsetX; // 当前点击的位置的横坐标
                var y = e.offsetY; // 当前点击的位置的纵坐标
                // this.coordinates.push([x, y])
                if (this.retrimodel == 1 && this.coordinates.length > 2) {
                    let coord = [this.coordinates[this.coordinates.length - 1], this.coordinates[0]];
                    draw(coord, context);
                    this.isbdclick = true;
                }
            }
        },
        // 画箭头的方法
        getyuan(e) {
            var canvas = document.getElementById("canvasVideo");
            var context = document.getElementById("canvasVideo").getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            let a = 0;
            let b = 0;
            if (this.coordinates[0][0] > this.coordinates[1][0]) {
                a =
                    this.coordinates[1][0] +
                    (this.coordinates[0][0] - this.coordinates[1][0]) / 2;
            } else {
                a =
                    this.coordinates[0][0] +
                    (this.coordinates[1][0] - this.coordinates[0][0]) / 2;
            }

            if (this.coordinates[0][1] > this.coordinates[1][1]) {
                b =
                    this.coordinates[1][1] +
                    (this.coordinates[0][1] - this.coordinates[1][1]) / 2;
            } else {
                b =
                    this.coordinates[0][1] +
                    (this.coordinates[1][1] - this.coordinates[0][1]) / 2;
            }
            var line = new Line(
                a,
                b,
                this.coordinates[this.coordinates.length - 1][0],
                this.coordinates[this.coordinates.length - 1][1],
                'red'
            );
            line.drawWithArrowheads(context);
        },
        // 切换画布  清空画布
        clearcanvas() {
            this.points = [];
            this.coordinates = [];
            this.actuacircle = [];
            this.actualcoord = [];
            this.showCanvas = false;
            this.isbdclick = false;
            this.count = 0;
            var context = document.getElementById("canvasVideoVal").getContext("2d");
            var context1 = document.getElementById("canvasVideo").getContext("2d");
            var reterimg = document.getElementById("reterimgVideoVal");
            context.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight);
            context1.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight);
        },
        // 提交任务
        getAllsubmit() {
            if (!this.showimg) {
                this.$notify({
                    type: "warning",
                    message: "请先获取快照！",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            if (this.isonline) {
                if (this.videoImg == "" || this.videoImg == null) {
                    this.$notify({
                        type: "warning",
                        message: "请先获取快照！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
            } else {
                if (this.multiplist.length == 0) {
                    this.$notify({
                        type: "warning",
                        message: "请先选择视频再创建检索！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
                if (this.videoImg == "" || this.videoImg == null) {
                    this.$notify({
                        type: "warning",
                        message: "请先选择视频再创建检索！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
            }
            if (this.tastName == "") {
                this.$notify({
                    type: "warning",
                    message: "请输入任务名称",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            if (this.tastName.length > 50) {
                this.$notify({
                    type: "warning",
                    message: "任务名称小于50字",
                    position: "bottom-right",
                    duration: 3000
                });
                return;
            }
            if (this.colorRetrial) {
                if (this.colorpoints == '' && this.checkradio == 0) {
                    this.$notify({
                        type: "warning",
                        message: "请框选目标色块！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                }
                if(this.checkradio == 0 && !this.showbaseUrl){
                    this.$notify({
                        type: "warning",
                        message: "正在处理图片！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return
                }
            }
            // 放到一个数组中去
            var imgs = document.getElementById("imgsVideoVal");
            if (this.retrimodel === 1) {
                // if (this.coordinates.length) {
                //   this.coordinates.push(this.coordinates[this.coordinates.length - 1]);
                // }
                // 返回实际点的坐标
                if (this.coordinates.length == 0) {
                    this.actualcoord = [];
                } else if (this.coordinates.length > 0 && this.coordinates.length < 3) {
                    this.$notify({
                        type: "warning",
                        message: "请双击闭合区域",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else if (this.coordinates.length >= 3 && !this.isbdclick) {
                    this.$notify({
                        type: "warning",
                        message: "请双击闭合区域",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    coorValue(imgs, this.coordinates, this.actualcoord);
                }
            } else if (this.retrimodel === 2) {
                if (this.coordinates.length < 2) {
                    this.$notify({
                        type: "warning",
                        message: "请创建检索规则",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord);
                }
            } else if (this.retrimodel === 3) {
                if (this.coordinates.length < 3) {
                    this.$notify({
                        type: "warning",
                        message: "请创建检索规则",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord);
                    var imgw = imgs.naturalWidth;
                    var imgh = imgs.naturalHeight;
                    var retw = imgs.clientWidth;
                    var reth = imgs.clientHeight;
                    this.actuacircle[0] = parseInt(
                        (imgw * this.coordinates[this.coordinates.length - 1][0]) / retw
                    );
                    this.actuacircle[1] = parseInt(
                        (imgh * this.coordinates[this.coordinates.length - 1][1]) / reth
                    );
                }
            }
            // return
            if (this.actuacircle.length == 0) {
                this.points = this.actualcoord.join(",");
            } else {
                this.points =
                    this.actualcoord.join(",") + "," + this.actuacircle.join(",");
            }
            if (this.points.length == 0) {
                this.points =
                    "0,0," +
                    imgs.naturalWidth +
                    ",0," +
                    imgs.naturalWidth +
                    "," +
                    imgs.naturalHeight +
                    ",0," +
                    imgs.naturalHeight;
            }

            // return
            let img = new Image();
            // let ctx = cans.getContext('2d')
            img.setAttribute("crossOrigin", "anonymous");
            // img.src = window.origin + "/fastDfs/" + this.videoImg.slice(this.videoImg.indexOf("group"), this.videoImg.length);
            //非大数据
            img.src = window.origin + '/fastDfs/' + this.videoImg.slice(this.videoImg.lastIndexOf('/'), this.videoImg.length)
            let canvas = document.getElementById("canvasVideoVal");
            let canvas1 = document.getElementById("canvasVideo");
            let context = canvas.getContext("2d");
            let context1 = canvas.getContext("2d");
            img.onload = function () {
                context.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
                context1.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
            };
            setTimeout(() => {
                let canvasimg = canvas.toDataURL();
                let canvasimg1 = canvas1.toDataURL();
                // return
                // this.retrimodel == 1 || this.retrimodel == 2 表示区域或者框线生成图片
                // 其他表示方向，要生成两张图片一个是先，一个是箭头
                this.loading = this.$loading({
                    lock: true,
                    background: "rgba(255,255,255,0.4)",
                    text: "加载中......"
                    // target:'',
                });
                // return
                if (this.retrimodel == 1 || this.retrimodel == 2) {
                    let data = {
                        imgBase64Str: canvasimg.split(",")[1]
                    };
                    data = this.$qs.stringify(data);
                    this.$http.post("sms/uploadFile/upload/base64", data).then(res => {
                        this.loading.close();
                        if (res.data.code == 200) {
                            if (this.isonline && this.videoImg) {
                                let url = this.videoImg + "@" + res.data.data;
                                this.getlinesub(url);
                            } else {
                                let url = this.videoImg + "@" + res.data.data;
                                this.getsubmit(url);
                            }
                        }
                    });
                } else {
                    let data = {
                        imgBase64Str: canvasimg.split(",")[1]
                    };
                    data = this.$qs.stringify(data);
                    let datas = {
                        imgBase64Str: canvasimg1.split(",")[1]
                    };
                    datas = this.$qs.stringify(datas);
                    this.$http.all([
                        this.$http.post('sms/uploadFile/upload/base64', data),
                        this.$http.post('sms/uploadFile/upload/base64', datas)
                    ]).then(this.$http.spread((res, res2) => {
                        this.loading.close();
                        let url = this.videoImg + "@" + res.data.data + "@" + res2.data.data;
                        if (this.isonline && this.videoImg) {
                            this.getlinesub(url);
                        } else {
                            this.getsubmit(url);
                        }
                    })).catch((e) => {
                        this.loading.close();
                    });
                }
            }, 200);
        },
        // 天网检索任务提交
        getlinesub(snapsurl) {
            let enabledColor = 0 // 是否启用色彩（1启用，0不启用）
            let colorSearchType = 0 //色彩检索类型（0色块类型，1语义色彩类型，2多语义色彩类型）
            let colorBlockPoints = this.colorpoints // 色块坐标（左上坐标x，左上坐标y，区域宽度，区域高度）
            let colorBlockUrl = this.imglist[this.firstImgIndex] // 色块对应的图片地址
            let colorTraceUrl = this.baseUrl
            let colorRange = this.colorRange // 色彩范围（0精准，1标准，2宽泛）
            let rgb //颜色值如果是colorSearchType == 2就传两个值
            if (this.colorRetrial) { //如果色彩检索的按钮是开启就变成1
                enabledColor = 1
            }
            if (this.checkradio == 0) {
                colorSearchType = 0
                colorBlockPoints = colorBlockPoints
                colorBlockUrl = colorBlockUrl
                colorRange = ''
                rgb = ''
                colorTraceUrl = colorTraceUrl
            } else if (this.checkradio == 1) {
                colorSearchType = 1
                colorBlockPoints = ''
                colorBlockUrl = ''
                rgb = this.firstname
                colorTraceUrl= ''
            } else if (this.checkradio == 2) {
                colorSearchType = 2
                colorBlockPoints = ''
                colorBlockUrl = ''
                rgb = this.twoname + "#" + this.threename
                colorTraceUrl = ''
            }
            let data = {
                submiterId: this.$storage.getSession("userInfo").userId,
                submiterName: this.$storage.getSession("userInfo").userName,
                infoKind: 1,
                taskName: this.tastName,
                gbDeviceId: this.gbDeviceId,
                taskType: 0,
                category: 2,
                searchType: this.retrimodel,
                size: this.targetsize,
                clarity: this.targetqxd,
                points: this.points,
                // points:'0,0,1280,0,1280,720,0,720',
                gbServer: sessionStorage.getItem("controlHead").substring(8, sessionStorage.getItem("controlHead").lastIndexOf(":")),
                gbPort: 5000,
                deviceId: this.deviceids,
                snapUrl: snapsurl,
                startTime: this.beginData.replace(" ", "_"),
                endTime: this.endData.replace(" ", "_"),
                fileAdd: sessionStorage.getItem("collectAddInterface"),
                fileFini: sessionStorage.getItem("collectFinishInterface"),
                // parseAdd:window.origin + "/vsas/video/search/task/add",
                parseAdd: 'http://' + sessionStorage.getItem("vsasModuleUrl") + "/video/search/task/add",
                // parseAdd:"http://192.168.102.105:8888/vsas/video/search/task/add",
                caseUuid: this.caseUuid,
                hdfs: sessionStorage.getItem("collectHdfsPath"),
                sessionId: this.$md5(new Date().getTime() + (Math.floor(Math.random() * (1000 - 1)) + 1).toString()),
                enabledColor: enabledColor, // 是否启用色彩（1启用，0不启用）
                colorSearchType: colorSearchType, //色彩检索类型（0色块类型，1语义色彩类型，2多语义色彩类型）
                colorBlockPoints: colorBlockPoints, // 色块坐标（左上坐标x，左上坐标y，区域宽度，区域高度）
                colorBlockUrl: colorBlockUrl, // 色块对应的图片地址
                colorRange: colorRange, // 色彩范围（1精准，2标准，3宽泛）
                rgb: rgb,
                colorTraceUrl:colorTraceUrl
            }
            data = this.$qs.stringify(data)
            this.$http.post('/vsas/task/sky/create', data).then(res => {
                this.dialogVisible = false;
                if (res.data.code == 200) {
                    this.$notify({
                        type: "success",
                        message: "任务创建成功",
                        position: "bottom-right",
                        duration: 3000
                    });
                } else {
                    this.$notify({
                        type: "error",
                        message: "任务创建失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            })
        },
        // 临时点，社会面点的检索
        getsubmit(snapUrl) {
            var videoUrl, deviceId, fileUuid;
            this.fileNum = this.multiplist.length;
            fileUuid = this.multiplist.map(item => item.fileUuid).join();

            let enabledColor = 0 // 是否启用色彩（1启用，0不启用）
            let colorSearchType = 0 //色彩检索类型（0色块类型，1语义色彩类型，2多语义色彩类型）
            let colorBlockPoints = this.colorpoints // 色块坐标（左上坐标x，左上坐标y，区域宽度，区域高度）
            let colorBlockUrl = this.imglist[this.firstImgIndex] // 色块对应的图片地址
            let colorTraceUrl = this.baseUrl
            let colorRange = this.colorRange // 色彩范围（0精准，1标准，2宽泛）
            let rgb //颜色值如果是colorSearchType == 2就传两个值
            if (this.colorRetrial) { //如果色彩检索的按钮是开启就变成1
                enabledColor = 1
            }
            if (this.checkradio == 0) {
                colorSearchType = 0
                colorBlockPoints = colorBlockPoints
                colorBlockUrl = colorBlockUrl
                colorTraceUrl = colorTraceUrl
                colorRange = ''
                rgb = ''
            } else if (this.checkradio == 1) {
                colorSearchType = 1
                colorBlockPoints = ''
                colorBlockUrl = ''
                rgb = this.firstname
                colorTraceUrl = ''
            } else if (this.checkradio == 2) {
                colorSearchType = 2
                colorBlockPoints = ''
                colorBlockUrl = ''
                rgb = this.twoname + "#" + this.threename
                colorTraceUrl = ''
            }
            let data = {
                task: {
                    taskName: this.tastName,
                    type: 0,
                    deviceId: this.deviceids,
                    caseUUid: this.caseUuid
                },
                taskSearch: {
                    category: 2,
                    type: this.retrimodel,
                    size: this.targetsize,
                    clarity: this.targetqxd,
                    points: this.points,
                    videoUrl: "",
                    fileUuid: fileUuid,
                    snapUrl: snapUrl,
                    deviceId: this.deviceids,
                    fileNum: this.fileNum,
                    enabledColor: enabledColor, // 是否启用色彩（1启用，0不启用）
                    colorSearchType: colorSearchType, //色彩检索类型（0色块类型，1语义色彩类型，2多语义色彩类型）
                    colorBlockPoints: colorBlockPoints, // 色块坐标（左上坐标x，左上坐标y，区域宽度，区域高度）
                    colorBlockUrl: colorBlockUrl, // 色块对应的图片地址
                    colorRange: colorRange, // 色彩范围（1精准，2标准，3宽泛）
                    rgb: rgb,
                    colorTraceUrl:colorTraceUrl
                }
            };
            console.log(data.taskSearch.colorTraceUrl,"data.taskSearch.colorTraceUrl")
            data = JSON.stringify(data);
            let data2 = {
                datas: data
            };
            data2 = this.$qs.stringify(data2);
            this.$http.post("vsas/task/add", data2).then(res => {
                if (res.data.code == 200) {
                    this.$emit('childByClose','0')
                    this.$notify({
                        type: "success",
                        message: "任务创建成功",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            }).catch((e) => {});
            this.dialogVisible = false;
            this.actualcoord = [];
            this.tastName = "";
            this.radio = "";
            this.clearcanvas();
            this.reset();
        },
        // 重置
        reset() {
            this.retrimodel = 1
            this.targetsize = 2
            this.targetqxd = 2;
            this.dialogVisible = false;
            this.clearcanvas();
            this.tastName = '';
            this.videoImg = "";
            this.tableData = [];
            this.multiplist = [];
        },
        // 删除当前点位下已选视频
        deletevideo(index) {
            this.multiplist.splice(index, 1);
            if (this.multiplist.length) {
                for (let i = 0; i < this.multiplist.length; i++) {
                    if (this.multiplist[i].snapUrl != null) {
                        // 如果是开始的原图
                        if (this.videoImg == this.multiplist[i].snapUrl) {
                            return;
                        } else {
                            this.videoImg = this.multiplist[i].snapUrl;
                            document.getElementById("imgsVideoVal").style.display = "none";
                            let image = new Image();
                            image.onload = () => {
                                this.dialogvideo();
                            };
                            image.src = this.videoImg;
                            return;
                        }
                    } else {
                        this.videoImg = '';
                    }
                }
            } else {
                this.videoImg = '';
                // this.reset()
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 设置勾选
        handleselection(val) {
            this.multiplist = val;
        },
        // 勾选所有数据
        selectAll(selection) {
            if (!this.issesionAll) {
                this.$refs.checkTable.clearSelection();
                this.tableData.forEach(row => {
                    this.$refs.checkTable.toggleRowSelection(row, true);
                });
                this.issesionAll = true;
            } else {
                this.$refs.checkTable.clearSelection();
                this.issesionAll = false;
            }
            // if (
            //   !this.multiplist.length &&
            //   !(this.tableData.length == selection.length)
            // ) {
            //   this.$refs.checkTable.clearSelection();
            //   return;
            // }
            // this.$refs.checkTable.clearSelection();
            // if ((this.tableData.length - selection.length == this.pageSize &&
            //     (this.currentPage != Math.ceil(this.tableData.length / this.pageSize)))  ||
            // ((this.tableData.length - selection.length == this.tableData.length - (this.currentPage - 1) * this.pageSize) &&
            // this.currentPage == Math.ceil(this.tableData.length / this.pageSize))) {
            //   this.$refs.checkTable.clearSelection();
            // } else {
            //   this.$refs.checkTable.clearSelection();
            //   this.tableData.forEach(row => {
            //     this.$refs.checkTable.toggleRowSelection(row, true);
            //   });
            // }
        },
        // 勾选索引id
        handlrowkey(row) {
            return row.fileUuid;
        },
        // 打开选择视频处理页面
        openCheckVideo() {
            //先执行重置
            this.$nextTick(() => {
                this.OpenTheTime('#videoStartTime', '#videoEndTime');
                document.getElementById('videoStartTime').value = '';
                document.getElementById('videoEndTime').value = '';
                this.beginTime = '';
                this.endTime = '';
                if (this.multiplist.length) {
                    this.currentPage = 1;
                    this.multiplist.forEach(row => {
                        this.$refs.checkTable.toggleRowSelection(row);
                    });
                    this.getAllvideo();
                } else {
                    this.getAllvideo();
                    this.issesionAll = false;
                }
            })
        },
        //关闭选择视频处理页面
        closeSelect() {
            this.dialogVisible2 = false
        },
        checkColorArea() {
            if (this.colorRetrial) {
                if (this.colorpoints == '' && this.checkradio == 0) {
                    this.$notify({
                        type: "warning",
                        message: "请框选目标色块！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    return;
                } else {
                    this.opencolorReval = false
                }
            }
        },
        //颜色检索取消按钮，
        cancelColorReval() {
            this.opencolorReval = false;
            this.firstImgIndex = 0;
            this.checkradio = '0';
            this.colorRange = '1';
            this.firstname = '255,0,0'
            this.twoname = '255,0,0'
            this.threename = '255,0,0'
        },


    }

};
export default mixins;
