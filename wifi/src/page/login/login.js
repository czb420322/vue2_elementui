/*
 * @Author: your name
 * @Date: 2020-10-22 08:41:46
 * @LastEditTime : 2021-05-14 14:29:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\login\login.js
 */
import {
    mapActions,
    mapMutations,
    mapState,
    mapGetters
} from 'vuex'
//地图操作
const mixins = {
    data() {
        return {
            menuRouter: [{
                    menuCode: "100",
                    flag: false,
                    url: "/videoCombat",
                    menuName: '视频侦查'
                }, //视频侦查
                {
                    menuCode: "200",
                    flag: false,
                    url: "/casestudy",
                    menuName: '案件库'
                }, //案件库
                {
                    menuCode: "300",
                    flag: false,
                    url: "/carJudged",
                    menuName: '车辆研判'
                }, //车辆研判
                {
                    menuCode: "400",
                    flag: false,
                    url: "/asto",
                    menuName: '人像研判'
                },
                {
                    menuCode: "500",
                    flag: false,
                    url: "/visibility",
                    menuName: '可视化'
                },
                {
                    menuCode: "700",
                    flag: false,
                    url: "/videoStrucPlat",
                    menuName: '智能应用'
                },
                // {menuCode:"700",flag:true,url:"",menuName:'视频结构化'},
                {
                    menuCode: "600",
                    flag: false,
                    url: "/manage",
                    menuName: '系统管理'
                }

            ],
            home: "",
            list: [],
            layerTop: '4.16rem',
            user_login: true, //是否账户登录
            rl_login: false,
            username: '',
            password: '',
            logingin: true,
            userErr: false,
            pwdErr: false,
            islogined: false,
            timedown: null,
            logoTitle: '',
            videoCombat: this.$storage.getSession("100") != null, // 新增设备的按钮权限
            openregister: false,
            opentoggleAdminInfo: false,
            structtype: 2
        }
    },
    mounted() {
        OnExit();
        OnHisExits();
        this.$http.get('/sms/static/getWebConf').then(res => {
            clearInterval(this.$store.state.timeToVideo)
            let dataJson = res.data.data;
            let pageIndex = Number(dataJson.pageIndex);
            this.logoTitle = Number(dataJson.currentDeploymentType)
            let logotile = Number(dataJson.currentDeploymentType)
            this.home = pageIndex;
            if (pageIndex == 1 && logotile == 1) {
                document.body.className = "platform_home";
            } else if (pageIndex == 1 && (logotile == 2 || logotile == 3)) {
                document.body.className = "platform_home";
            } else if (pageIndex == 2) {
                document.body.className = "vehicle_home";
            } else if (pageIndex == 3 && logotile == 1) {
                document.body.className = "caseIndex_home";
            } else if (pageIndex == 1 && (logotile == 2 || logotile == 3)) {
                document.body.className = "caseTop_home";
            } else if (pageIndex == 4) {
                document.body.className = "platformStruct_home";
            }
        })
        window.addEventListener("beforeunload", e => this.beforeunloadhandler(e))
    },
    created() {
        if (this.$route.query.info != undefined) {
            let aaa = encodeURI(this.$route.query.info)
            let bbb = window.atob(aaa)
            let ccc = JSON.parse(bbb)
            let user = ccc.userName
            let pas = ccc.password
            this.username = user
            this.password = pas
            this.indexNum = this.$route.query.indexNum
            this.structtype = 1
            setTimeout(() => {
                this.accoutLogin(0, 1)
            }, 1000)
        } else {
            this.structtype = 2
        }
    },
    computed: {
        ...mapState(['ifAdminInfo', 'token', 'currentUser', 'menurouter']),
        ...mapGetters([
            'getCurrentUser',
            'getMenuRouter'
        ])
    },
    methods: {
        ...mapActions([
            'getonlineDeviceList'
        ]),
        ...mapMutations([
            'setCurrentUser',
            'setMenuRouter',
            "setToIndex",
            "setCurrentUserImg",
            'settrueName',
            'setsdkInfo', //SDK信息
            'setopenSDK', //SDK是否打开
            "setrouterlink"
        ]),

        beforeunloadhandler(e) {
            e = e || window.event
            if (e) {
                // this.watermark('','','');
            } else {

            }
        },
        checkUser() {
            // let userNameExp = /[0-9a-zA-Z]{6,25}/;
            if (this.username == "") {
                this.$refs.userNameTip.innerHTML = "请输入用户名/警队编号";
                this.$refs.userNameTip.style.display = "block";
                // }else if(!userNameExp.test(this.username)){
                //   this.$refs.userNameTip.innerHTML = "用户名6到25位字母数字组合";
                //   this.$refs.userNameTip.style.display = "block";
            } else {
                this.$refs.userNameTip.style.display = "none";
            }
        },
        checkPwd() {
            // let pwdExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
            if (this.password == "") {
                this.$refs.pwdTip.innerHTML = "请输入用户密码";
                this.$refs.pwdTip.style.display = "block";
                // }else if(!pwdExp.test(this.password)){
                //   this.$refs.pwdTip.innerHTML = "密码为6到16位数字、大小写字母、特殊字符组合";
                //   this.$refs.pwdTip.style.display = "block";
            } else {
                this.$refs.pwdTip.style.display = "none";
            }
        },
        childbyregister(val) {
            this.openregister = val
        },
        //跳转到注册页面
        toRegister: function () {
            // this.$router.push({'path':'/register'})
            this.openregister = true
        },
        childadminInformation(val) {
            this.opentoggleAdminInfo = val
        },
        // 跳转到售后页面
        toggleAdminInfo: function () {
            this.opentoggleAdminInfo = true
        },
        //人脸登录方法(暂未做)
        faceLogin: function () {
            this.rl_login = false;
            this.user_login = true;
        },
        faceLoginRight: function () {
            // this.rl_login= true;
            // this.user_login= false;
            //this.$alert("即将上线","消息提示")
            // layer.alert('即将上线!',{icon:7,title:"消息提示"});
            this.$myconfirm({
                type: '提示',
                msg: '即将上线！',
                icon: 3,
                btn: {
                    ok: '确定',
                    //  no: '关闭'
                }
            })
        },
        checkForm() {
            let flag = true;
            // let userNameExp = /[0-9a-zA-Z]{6,25}/;
            if (this.username == "") {
                this.$refs.userNameTip.innerHTML = "请输入用户名/警队编号";
                this.$refs.userNameTip.style.display = "block";
                flag = false;
                // }
                // else if(!userNameExp.test(this.username)){
                //   this.$refs.userNameTip.innerHTML = "用户名6到25位字母数字组合";
                //   this.$refs.userNameTip.style.display = "block";
                //   flag = false;
            } else {
                this.$refs.userNameTip.style.display = "none";
            }

            // let pwdExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
            if (this.password == "") {
                this.$refs.pwdTip.innerHTML = "请输入用户密码";
                this.$refs.pwdTip.style.display = "block";
                flag = false;
                // }else if(!pwdExp.test(this.password)){
                //   this.$refs.pwdTip.innerHTML = "密码为6到16位数字、大小写字母、特殊字符组合";
                //   this.$refs.pwdTip.style.display = "block";
                //   flag = false;
            } else {
                this.$refs.pwdTip.style.display = "none";
            }

            return flag;
        },
        //账户登录
        accoutLogin(flag, type) {
            if (type != 1) {
                if (!this.checkForm()) {
                    return false;
                }
                this.checkUser();
                this.checkPwd();
            }
            let _this = this;
            if (this.username !== "" && this.password !== "") {

                this.setCurrentUser("");
                this.setCurrentUserImg("");
                this.setMenuRouter(null);
                this.getpoint();
                //登录所需要参数
                let data = {
                    userName: this.username,
                    password: this.$md5.hex(this.password),
                    flag: flag,
                    indexNum: this.indexNum
                };
                data = _this.$qs.stringify(data);
                // alert('是否执行')
                this.$http.post('/sms/login', data).then(res => {
                    this.setrouterlink(sessionStorage.getItem("pageIndex"))
                    // alert('是否执行11155555')
                    if (res.statusText == 'OK' && res.data.code == 200) {

                        if (sessionStorage.getItem("pageIndex")) {
                            let pageIndex = Number(sessionStorage.getItem("pageIndex"));
                            let currentDeploymentType = sessionStorage.getItem('currentDeploymentType')
                            if (pageIndex == 1) {
                                InItplayer()
                                OnTestPort(51000, 0)
                                this.$store.state.showMessageVic = true //布控
                                this.$store.state.showMessageCase = false //研判一套包括研判 审批
                                this.setToIndex({
                                    path: "/platform"
                                });
                                this.$router.push({
                                    path: "/platform"
                                });
                            } else if (pageIndex == 2) {
                                this.$store.state.showMessageVic = true
                                this.$store.state.showMessageCase = false
                                this.setToIndex({
                                    path: "/vehicle"
                                });
                                this.$router.push({
                                    path: "/vehicle"
                                });
                            } else if (pageIndex == 3 && currentDeploymentType == 1) {
                                this.$store.state.showMessageVic = false
                                this.$store.state.showMessageCase = true
                                InItplayer()
                                OnTestPort(51000, 0)
                                this.setToIndex({
                                    path: "/caseIndex"
                                });
                                this.$router.push({
                                    path: "/caseIndex"
                                });
                            } else if (pageIndex == 3 && (currentDeploymentType == 2 || currentDeploymentType == 3)) {
                                this.$store.state.showMessageVic = false
                                this.$store.state.showMessageCase = true
                                this.setToIndex({
                                    path: "/caseIndexcxp"
                                });
                                this.$router.push({
                                    path: "/caseIndexcxp"
                                });
                            } else if (pageIndex == 4) {
                                this.$store.state.showMessageVic = false
                                this.$store.state.showMessageCase = true
                                InItplayer()
                                OnTestPort(52000, 1)
                                this.getcaseUuid()

                            }
                        }

                        let g_http = null;
                        g_http = document.createElement("script");
                        g_http.src = 'http://127.0.0.1:60000/DxHandler.js?cbk=OnDefaultCallback&req=00000000-0000-0000-0000-000000000001&iskill=1'; // 离线杀进程
                        document.body.appendChild(g_http);
                        let sky_http = null;
                        sky_http = document.createElement("script");
                        sky_http.src = 'http://127.0.0.1:60000/DxHandler.js?cbk=OnDefaultHisCallback&req=00000000-0000-0000-0000-000000000002&iskill=1'; // 天网杀进程
                        document.body.appendChild(sky_http);
                        _this.settrueName(res.data.data.user.trueName)
                        _this.$storage.setSession("userInfo", res.data.data.user);
                        _this.$storage.setSession("token", res.data.data.token);
                        _this.$storage.setSession("name", this.username);
                        // 登录成功调用c++程序端口检测方法，找到可用的端口

                        let defaultImgList = []; //保存默认自定义工作台的菜单项
                        res.data.data.menus.forEach(k => {
                            if (k.parentMenuCode == '100' || k.parentMenuCode == '200' || k.parentMenuCode == '300' || k.parentMenuCode == '400' || k.parentMenuCode == '500' || k.parentMenuCode == '600') {
                                if (defaultImgList.length < 10) {
                                    defaultImgList.push(k.menuCode);
                                }
                            }
                            _this.menuRouter.forEach(m => {
                                if (m.menuCode == k.menuCode) {
                                    m.flag = true
                                }
                            });
                            _this.$storage.setSession(k.menuCode, "true");
                        });

                        _this.$storage.setSession("defaultImgList", defaultImgList);
                        _this.$storage.setSession("menurouter", this.menuRouter);
                        setTimeout(() => {
                            if (sessionStorage.getItem('banben') == 1) {
                                this.$myconfirm({
                                    type: '提示',
                                    msg: '请更新插件，否则影响功能使用！',
                                    icon: 2,
                                    btn: {
                                        ok: '确定'
                                    }
                                }).then(() => {
                                    var link = $('<a href="/static/DxPlayer.exe" target="_blank"></a>');
                                    link.get(0).click();
                                })
                            }
                        }, 200);

                        this.timedown = setInterval(() => {
                            if (sessionStorage.getItem('down') == 1) {
                                clearInterval(this.timedown)
                                this.$myconfirm({
                                    type: '提示',
                                    msg: '客户端用于系统离线视频数据采集与视频播放，请确认是否先行下载再使用系统对应功能？',
                                    icon: 2,
                                    btn: {
                                        ok: '确定'
                                    }
                                }).then(() => {
                                    var link = $('<a href="/static/DxPlayer.exe" target="_blank"></a>');
                                    link.get(0).click();
                                })

                            }
                        }, 200)
                        this.setMenuRouter(this.menuRouter);
                        this.setCurrentUser(this.$storage.getSession("name"));
                        this.setCurrentUserImg(res.data.data.user.photoUrl);

                        // this.ignore();
                        this.$store.state.istuInfoShow = false
                        this.$store.state.voteDiabale = false
                        this.$store.state.isprogress = false
                        this.$store.state.ismessage = false
                        this.$store.state.istuJudge = false
                        this.$store.state.glstStrus = sessionStorage.getItem('glstStructureSwitch')
                        this.islogined = true;

                        this.getonlineDeviceList()
                        //清空之前请求进度的localStorage
                        for (const key in localStorage) {
                            if (key.length == 33) {
                                localStorage.removeItem(key)
                            }
                        }

                    } else if (res.data.code == 202) {
                        // layer.alert('当前账号已登录！',{icon:5,title:"消息提示"});
                        this.$myconfirm({
                            type: '提示',
                            msg: '当前账号已登录！是否强制登陆',
                            icon: 2,
                            btn: {
                                ok: '确定',
                                no: '取消'
                            }
                        }).then(() => {
                            this.accoutLogin('1')
                        })

                    } else {
                        this.$notify({
                            type: 'warning',
                            message: res.data.message,
                            position: 'bottom-right',
                            duration: 1500
                        });
                    }
                })
            }
        },
        getcaseUuid() {
            this.$http.get('/pca/casemng/my/struct/case').then(res => {
                if (res.data.code == 200) {
                    sessionStorage.setItem('exclusiveCaseUuid', res.data.data.caseUuid)
                    this.setToIndex({
                        path: "/videoStrucPlat?menuCode=700",

                    });
                    this.$router.push({
                        path: "/videoStrucPlat?menuCode=700",
                    });
                }
            })
        },
        watermark(t1, t2, t3) {
            if (t1 == '' && t2 == '' && t3 == '') {
                let list = document.getElementsByClassName('mark_div')
                for (let i = 0; i < list.length; i++) {
                    list[i].parentNode.removeChild(list[i])
                    i--;
                }
                return
            }

            var maxWidth = document.documentElement.clientWidth;
            var maxHeight = document.documentElement.clientHeight;
            var intervalWidth = 340; //间隔宽度
            var intervalheight = 200; //间隔高度
            var rowNumber = (maxWidth - 40 - 50) / intervalWidth; //横向个数
            var coumnNumber = (maxHeight - 40 - 80) / intervalheight; //纵向个数
            //默认设置
            var defaultSettings = {
                watermark_color: '#aaa', //水印字体颜色
                watermark_alpha: 0.4, //水印透明度
                watermark_fontsize: '15px', //水印字体大小
                watermark_font: '微软雅黑', //水印字体
                watermark_width: 200, //水印宽度
                watermark_height: 80, //水印长度
                watermark_angle: 15 //水印倾斜度数
            };
            var _temp = document.createDocumentFragment();
            for (var i = 0; i < rowNumber; i++) {
                for (var j = 0; j < coumnNumber; j++) {
                    var x = intervalWidth * i + 20;
                    var y = intervalheight * j + 30;
                    var mark_div = document.createElement('div');
                    mark_div.id = 'mark_div' + i + j;
                    mark_div.className = 'mark_div';
                    ///三个节点
                    var span0 = document.createElement('div');
                    span0.appendChild(document.createTextNode(t1));
                    var span1 = document.createElement('div');
                    span1.appendChild(document.createTextNode(t2));
                    var span2 = document.createElement('div');
                    span2.appendChild(document.createTextNode(t3));
                    mark_div.appendChild(span0);
                    mark_div.appendChild(span1);
                    mark_div.appendChild(span2);
                    //设置水印div倾斜显示
                    mark_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mark_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mark_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mark_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mark_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mark_div.style.visibility = "";
                    mark_div.style.position = "absolute";
                    mark_div.style.left = x + 'px';
                    mark_div.style.top = y + 'px';
                    mark_div.style.overflow = "hidden";
                    mark_div.style.zIndex = "9999";
                    mark_div.style.pointerEvents = 'none'; //pointer-events:none  让水印不阻止交互事件
                    mark_div.style.opacity = defaultSettings.watermark_alpha;
                    mark_div.style.fontSize = defaultSettings.watermark_fontsize;
                    mark_div.style.fontFamily = defaultSettings.watermark_font;
                    mark_div.style.color = defaultSettings.watermark_color;
                    mark_div.style.textAlign = "center";
                    mark_div.style.width = defaultSettings.watermark_width + 'px';
                    mark_div.style.height = defaultSettings.watermark_height + 'px';
                    mark_div.style.display = "block";

                    _temp.appendChild(mark_div);
                }
            }
            document.body.appendChild(_temp);
        },


        //登录成功之后获取所有SDK的服务
        getSDKtime() {
            this.$http.post('/sms/authorization/list').then(res => {
                if (res.data.code == 200) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].status != 200) {
                            this.setopenSDK(true)
                            this.setsdkInfo(res.data.data)
                            return
                        }
                    }

                }
            })
        },

        //忽略
        ignore() {
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            let userId = userInfo.value.userId;
            let datas = {
                judgeId: '', //研判投票主键   string  非必填
                caseUuid: '', //案件主键  string  必填
                mStatus: 1, //消息状态  int 非必填（0或1是未读。2是已读）
                muserId: userId, //当前用户主键  string 必填
                establishId: '' //  string 非必填
            };
            datas = this.$qs.stringify(datas)
            this.$http.post('pca/synergyvote/getWebmessagPage', datas).then(res => {
                if (res.data.code == 200) {
                    // this.$store.state.messageList = res.data.data.list;
                    this.$store.state.ismessage = true
                    this.$store.commit("AllTopMsg", res.data.data);
                    if (this.$store.state.messageList.length == 0) {
                        this.$store.state.ismessage = false
                    }
                }
            })
        },


        getpoint() {
            this.$http.get('/sms/static/getWebConf').then(res => {
                let dataJson = res.data.data;
                for (let key in dataJson) {
                    sessionStorage.setItem(key, dataJson[key]);
                }
                let currentDeploymentType = sessionStorage.getItem('currentDeploymentType')
                this.$store.state.currentDeploymentType = sessionStorage.getItem('currentDeploymentType')
                if (this.islogined) {
                    let pageIndex = Number(dataJson.pageIndex);
                    if (pageIndex == 1) {
                        this.setToIndex({
                            path: "/platform"
                        });
                        this.$router.push({
                            path: "/platform"
                        });
                    } else if (pageIndex == 2) {
                        this.setToIndex({
                            path: "/vehicle"
                        });
                        this.$router.push({
                            path: "/vehicle"
                        });
                    } else if (pageIndex == 3 && currentDeploymentType == 1) {
                        this.setToIndex({
                            path: "/caseIndex"
                        });
                        this.$router.push({
                            path: "/caseIndex"
                        });
                    } else if (pageIndex == 3 && (currentDeploymentType == 2 || currentDeploymentType == 3)) {
                        this.setToIndex({
                            path: "/caseIndexcxp"
                        });
                        this.$router.push({
                            path: "/caseIndexcxp"
                        });
                    } else if (pageIndex == 4) {
                        this.getcaseUuid()
                        this.setToIndex({
                            path: "/videoStrucPlat?menuCode=700",
                            // path:"/caseindexStruct",
                        });
                        this.$router.push({
                            path: "/videoStrucPlat?menuCode=700",
                            // path:"/caseindexStruct",
                        });
                    }
                }

            })
        },
    }

};
export default mixins
