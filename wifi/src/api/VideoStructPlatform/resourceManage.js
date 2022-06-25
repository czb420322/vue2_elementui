/*
 * @Author: your name
 * @Date: 2020-11-10 10:08:06
 * @LastEditTime : 2021-07-01 15:27:11
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\VideoStructPlatform\resourceManage.js
 */
//地图操作
import _ from 'lodash';
import { mapMutations,  mapGetters } from "vuex";
const mixins = {
    data: function () {
        return {
            textInfo: "",
            initTab: "people", // 左侧菜单切换的name值 与 index值对应
            videoList: [], // 视频
            societyData: [], // 社会面
            defaultProps: {
                children: "apes",
                label: "name"
            },
            deviceUuid: "",
            setting: {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pidKey: "pId",
                        rootPId: ""
                    }
                },
                view: {
                    showLine: false,
                    fontCss: {
                        color: "#99c9fa"
                    },
                    showTitle: true,
                    showIcon: false,
                    nameIsHTML: true, //允许name支持html
                    selectedMulti: false
                },
                callback: {
                    onClick: this.zTreeOnClick
                }
            },
            keyValue: '',
            noData: false,
            treeId: 'treeDemo',
            treeObj: '',
            nodes: [],
            allNodes: [],
            nodesShow: [],
            skynetlist: [],
            showskylist: false,
            caseUuid: '',
            nowclick:1, //当前点击的
            nodesFatherId:"",//当前点击的节点的父元素
            nowclicknodes:{},  //当前点击的书节点
            regionId:'', //设备ID
            ViseinitTab:"video",//默认显示天网
            VisetaskName:"",//布控任务名称
            storeName:"",//底库名
            storeNameList:[],//底库名称列表
            userName:"",//用户名
            userNameList:[],//所有用户列表
            loading:null
        }
    },

    methods: {
        ...mapMutations([
            "setshowplayvideo"
        ]),
        initzTree(isDeom) {
            this.nodes = []
            this.treeObj = $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
            this.fuzzySearch("treeDemo", "#keyValue", null, true); //开启模糊搜索
            // var nodes = this.treeObj.getNodes()
            // this.allNodes = this.queryFun(nodes)
            if(this.initTab == 'video' || (this.changeRadio == 3 && this.ViseinitTab == 'video')){
                this.loading.close()
            }
            if (!this.opencheck && isDeom) {
                var nodes = this.treeObj.getNodes()
                this.treeObj.expandNode(nodes[0])
                $('#treeDemo_1_a').click();
                this.zTreeOnClick(null, null, nodes[0])
            }
            else if(this.opencheck){
                var nodes = this.treeObj.getNodes()
                if(this.initTab == 'video' || (this.changeRadio == 3 && this.ViseinitTab == 'video')){
                    for (let i = 0; i < this.checkarr[0].length; i++) {
                        let nodeobj = this.treeObj.getNodeByParam('id',this.checkarr[0][i].shebeiId)
                        this.treeObj.checkNode(nodeobj,true,true)
                    }
                }else if(this.initTab == 'people'){
                    if(this.checkarr[1].length){
                        nodes.forEach(node => {
                            this.treeObj.expandNode(node, true)
                        })
                    }else{
                        this.treeObj.expandNode(nodes[0])
                    }
                    for(let i = 0; i < nodes.length; i++) {
                        if(!nodes[i].regionFlag !== 1) {
                            for(let j = 0; j < nodes[i].children.length; j++) {
                                for(let m = 0; m < this.checkarr[1].length; m++) {
                                if(nodes[i].children[j].shebeiId == this.checkarr[1][m].shebeiId) {
                                    nodes[i].children[j].checked = true
                                    this.treeObj.updateNode(nodes[i].children[j], true)
                                }
                                }
                            }
                        }
                    }
                }
            }
        },
        // // 过滤节点(zTree源码方法)
        fuzzySearch(zTreeId, searchField, isHighLight, isExpand) {
            var zTreeObj = $.fn.zTree.getZTreeObj(zTreeId);
            if (!zTreeObj) {
                // alert("fail to get ztree object");
            }
            var nameKey = zTreeObj.setting.data.key.name;
            isHighLight = isHighLight === false ? false : true;
            isExpand = isExpand ? true : false;
            zTreeObj.setting.view.nameIsHTML = isHighLight;

            var metaChar = "[\\[\\]\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]";
            var rexMeta = new RegExp(metaChar, "gi");

            function ztreeFilter(zTreeObj, _keywords, callBackFunc) {
                if (!_keywords) {
                    _keywords = "";
                }

                function filterFunc(node) {
                    if (node && node.oldname && node.oldname.length > 0) {
                        node[nameKey] = node.oldname;
                    }
                    zTreeObj.updateNode(node);
                    if (_keywords.length == 0) {
                        zTreeObj.showNode(node);
                        zTreeObj.expandNode(node, isExpand);
                        return true;
                    }
                    if (
                        node[nameKey] &&
                        node[nameKey]
                            .toLowerCase()
                            .indexOf(_keywords.toLowerCase()) != -1
                    ) {
                        if (isHighLight) {
                            var newKeywords = _keywords.replace(
                                rexMeta,
                                function(matchStr) {
                                    return "\\" + matchStr;
                                }
                            );
                            node.oldname = node[nameKey];
                            var rexGlobal = new RegExp(newKeywords, 'gi');
                            node[nameKey] = node.oldname.replace(rexGlobal, function(originalText){
                              var highLightText =
                            	  '<span style="color: whitesmoke;background-color: darkred;">'
                            	  + originalText
                            	  +'</span>';
                              return 	highLightText;
                            });
                            zTreeObj.updateNode(node);
                        }
                        zTreeObj.showNode(node);
                        return true;
                    }

                    zTreeObj.hideNode(node);
                    return false;
                }

                var nodesShow = zTreeObj.getNodesByFilter(filterFunc);
                processShowNodes(nodesShow, _keywords);
            }

            function processShowNodes(nodesShow, _keywords) {
                if (nodesShow && nodesShow.length > 0) {
                    if (_keywords.length > 0) {
                        $.each(nodesShow, function(n, obj) {
                            var pathOfOne = obj.getPath();
                            if (pathOfOne && pathOfOne.length > 0) {
                                for (var i = 0; i < pathOfOne.length - 1; i++) {
                                    zTreeObj.showNode(pathOfOne[i]);
                                    zTreeObj.expandNode(pathOfOne[i], true);
                                }
                            }
                        });
                    } else {
                        var rootNodes = zTreeObj.getNodesByParam("level", "0");
                        $.each(rootNodes, function(n, obj) {
                            zTreeObj.expandNode(obj, true);
                        });
                    }
                }
            }

            $(searchField).bind("input propertychange", function() {
                var _keywords = $(this).val();
                searchNodeLazy(_keywords);
            });

            var timeoutId = null;
            var lastKeyword = "";
            function searchNodeLazy(_keywords) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(function() {
                    if (lastKeyword === _keywords) {
                        return;
                    }
                    ztreeFilter(zTreeObj, _keywords);
                    lastKeyword = _keywords;
                }, 500);
            }
        },


        queryFun(node) {
            for (var i in node) {
                this.nodes.push(node[i])
                if (node[i].children) {
                    this.queryFun(node[i].children)
                }
            }
            return this.nodes
        },
        searchFun(val, isHighLight, isExpand) {
            console.log(val,121111);
            var key = val.replace(/(^\s*)|(\s*$)/g, "")
            this.nodesShow = []
            isHighLight = isHighLight === false ? false : true
            isExpand = isExpand ? true : false
            this.filterzTree(key, this.allNodes, isExpand, isHighLight)
            if (this.keyValue === '') {
                this.noData = false
            } else {
                if (this.nodesShow.length === 0) {
                    this.noData = true
                } else {
                    this.noData = false
                }
            }
            this.showNodesFun(this.nodesShow, key)
        },
        filterzTree(key, nodes, isExpand, isHighLight) {
            console.log(key,44444);
            var metaChar = '[\\[\\]\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]'
            var rexMeta = new RegExp(metaChar, 'gi')
            var nameKey = this.treeObj.setting.data.key.name
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i] && nodes[i].oldname && nodes[i].oldname.length > 0) {
                    nodes[i][nameKey] = nodes[i].oldname
                }
                this.treeObj.updateNode(nodes[i])
                if (key === '') {
                    console.log('zou11111');
                    this.initzTree()
                    break
                } else {
                    console.log('zou2222');
                    if (nodes[i][nameKey] && nodes[i][nameKey].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                        if (isHighLight) {
                            console.log('zou333333');
                            var newKeywords = key.replace(rexMeta, (matchStr) => {
                                return '//' + matchStr
                            })
                            nodes[i].oldname = nodes[i][nameKey]
                            var rexGlobal = new RegExp(newKeywords, 'gi')
                            nodes[i][nameKey] = nodes[i].oldname.replace(rexGlobal, (originalText) => {
                                var highLightText =
                                    '<span style="color: whitesmoke;background-color: darkred;">' +
                                    originalText +
                                    '</span>'
                                return highLightText
                            })
                            this.treeObj.updateNode(nodes[i])
                        }
                        this.treeObj.showNode(nodes[i])
                        this.nodesShow.push(nodes[i])
                    } else {
                        this.treeObj.hideNode(nodes[i])
                    }
                }
            }
        },
        showNodesFun(nodesShow, key) {
            if (key.length > 0) {
                nodesShow.forEach(node => {
                    var pathOfOne = node.getPath()
                    if (pathOfOne && pathOfOne.length > 0) {
                        for (var i = 0; i < pathOfOne.length - 1; i++) {
                            this.treeObj.showNode(pathOfOne[i])
                            this.treeObj.expandNode(pathOfOne[i], true)
                        }
                    }
                })
            } else {
                var rootNodes = this.treeObj.getNodesByParam('level', '0')
                rootNodes.forEach(node => {
                    this.treeObj.expandNode(node, true)
                })
                if(this.initTab == 'video' || (this.ViseinitTab == 'video' && this.changeRadio == 3)){
                    var nodes = this.treeObj.getNodes()
                    if(this.checkarr){
                        for(let i = 0; i < nodes.length; i++) {
                            if(!nodes[i].regionFlag !== 1) {
                                for(let j = 0; j < nodes[i].children.length; j++) {
                                    for(let m = 0; m < this.checkarr[0].length; m++) {
                                    if(nodes[i].children[j].shebeiId == this.checkarr[0][m].shebeiId) {
                                        nodes[i].children[j].checked = true
                                        this.treeObj.updateNode(nodes[i].children[j], true)
                                    }
                                    }
                                }
                            }
                        }
                    }
                }else if(this.initTab == 'people'){
                    var nodes = this.treeObj.getNodes()
                    if(this.checkarr){
                        for(let i = 0; i < nodes.length; i++) {
                            if(!nodes[i].regionFlag !== 1) {
                                for(let j = 0; j < nodes[i].children.length; j++) {
                                    for(let m = 0; m < this.checkarr[1].length; m++) {
                                    if(nodes[i].children[j].shebeiId == this.checkarr[1][m].shebeiId) {
                                        nodes[i].children[j].checked = true
                                        this.treeObj.updateNode(nodes[i].children[j], true)
                                    }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        },
        // 获取视频的信息
        queryVideoData() {
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "查询中"
            });
            setTimeout(()=>{
                console.log(this.onlineDeviceList,'是否执行')
                this.zNodes = this.onlineDeviceList;
                this.initzTree()
                this.nowclick = 1
            },200)
            return
            this.$http.post("/sms/ape/selectByVideo").then(res => {
                if (res.data.code == 200) {
                    this.videoList = res.data.data;
                    for (let i = 0; i < this.videoList.length; i++) {
                        for (let j = 0; j < this.videoList[i].apes.length; j++) {
                            this.videoList[i].apes[j].newName = this.videoList[i].apes[j].name
                        }
                    }
                    this.videoList.forEach(v => {
                        v.children = v.apes;
                    });
                    this.zNodes = this.videoList;
                    console.log(this.zNodes);
                    this.initzTree()
                    this.nowclick = 1
                } else {
                    this.$notify({
                        type: "error",
                        message: "获取视频列表失败",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        // 社会面
        // type 0查询所有 1查当前的, 2是做检索的
        querySocietyData(type,isDeom) {
            let data = {
                caseUuid:sessionStorage.getItem('exclusiveCaseUuid'),
                type:type
            }
            data = this.$qs.stringify(data)
            this.$http.post("/vsas/structure/selectBySociety",data).then(res => {
                if (res.data.code == 200) {
                    if(res.data.data.length == 0){
                        this.skynetlist = []
                    }
                    this.videoList = res.data.data;
                    for (let i = 0; i < this.videoList.length; i++) {
                        for (let j = 0; j < this.videoList[i].apes.length; j++) {
                            this.videoList[i].apes[j].newName = this.videoList[i].apes[j].name
                            this.videoList[i].apes[j].isParent = false
                            //总数
                            if(type == 2){
                                this.videoList[i].apes[j].name = this.videoList[i].apes[j].name
                            }else{
                                if(this.$route.path == '/videoStrucPlat/resourceManage'){
                                    this.videoList[i].apes[j].name = this.videoList[i].apes[j].name + "("+ this.videoList[i].apes[j].totalVideoCount +")"
                                }else{
                                    this.videoList[i].apes[j].name = this.videoList[i].apes[j].name + "("+ this.videoList[i].apes[j].allowVideoCount +")"
                                }
                            }
                        }
                    }
                    this.videoList.forEach(v => {
                        v.children = v.apes;
                    });
                    this.zNodes = this.videoList;
                    this.initzTree(isDeom)
                    this.nowclick = 2
                    if(type == 1 || type == 2){
                        setTimeout(() => {
                            let dom = document.getElementById("treeDemo_2_span");
                            this.$nextTick(() => {
                                dom.click();
                            });
                        }, 300);
                    }
                } else {
                    this.$notify({
                        type: "error",
                        message: "获取社会面失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            });
        },
        //点击事件
        // 判断是任务管理页面还是视频管理页面
        zTreeOnClick(e, id, nodes) {
            console.log(nodes,666)
            if(nodes == undefined){
                this.showskylist = true
                return
            }
            //涉案视频管理页面
            if(this.$route.path == '/videoStrucPlat/resourceManage'){
                if(nodes.parentTId != null){
                    this.nodesFatherId = nodes.parentTId
                }
                this.nowclicknodes = e
                this.showskylist = true
                this.$nextTick(() => {
                    // 如果点击的是根节点
                    if (nodes.children) {
                        if (this.initTab == 'people') {
                            this.showskylist = true
                            this.skynetlist = nodes.children
                            this.regionId = nodes.regionId
                            this.setshowplayvideo(false)
                        }else if(this.initTab == 'video'){
                            this.showskylist = false
                            if(nodes.children.length){
                                if(nodes.children[0].gbsType == 6){
                                    this.showskylist = true
                                    this.skynetlist = nodes.children
                                    this.regionId = ''
                                    this.setshowplayvideo(false)
                                }
                            }
                        }
                        // this.skynetlist = nodes.children
                        // this.regionId = ''
                        // this.setshowplayvideo(false)
                    } else {
                        this.skynetlist = [nodes]
                        if (this.initTab == 'people') {
                            this.showskylist = false
                            this.caseUuid = sessionStorage.getItem('exclusiveCaseUuid');
                            this.deviceUuid = nodes.shebeiId;
                            let list = []
                            list.push({
                                type:4,
                                caseCameraList:[
                                    {"cameraType":4,
                                    "deviceUuid":nodes.shebeiId,
                                    "longitude":nodes.longitude,
                                    "latitude":nodes.latitude,
                                    "cameraName":nodes.newName == undefined ? nodes.name : nodes.newName,
                                    "offset":0,
                                    "caseUuid":sessionStorage.getItem('exclusiveCaseUuid')}
                                ]
                            })
                            this.addDeviceToCase(this.caseUuid,list)
                        }
                    }
                })
            }else{
                //针对任务管理中的检索管理
                if(nodes.children){
                    this.deviceids = ''
                    this.videoImg = ''
                    this.tableData = [];
                    this.multiplist = [];
                    this.imglist = []
                    this.totalCount = 0
                }
                else{
                    this.caseUuid = sessionStorage.getItem('exclusiveCaseUuid');
                    this.deviceids = nodes.shebeiId
                    this.resetReter();
                    let list = []
                    list.push({
                        type:4,
                        caseCameraList:[
                            {"cameraType":4,
                            "deviceUuid":nodes.shebeiId,
                            "longitude":nodes.longitude,
                            "latitude":nodes.latitude,
                            "cameraName":nodes.newName == undefined ? nodes.name : nodes.newName,
                            "offset":0,
                            "caseUuid":sessionStorage.getItem('exclusiveCaseUuid')}
                        ]
                    })
                    this.addDeviceToCase(this.caseUuid,list)
                    //先设置dviceids的值

                    this.setName()
                    this.colroretrivaltitle = '打开颜色检索'
                    this.colorRetrial = false
                    this.colorpoints = "";
                    // let colorcanvas = document.getElementById("colorcanvas");
                    // colorcanvas.setAttribute("width", 0);
                    // colorcanvas.setAttribute("height", 0);

                }
            }
        },
        //添加点位到案件中去
        /**
         * @description:
         * @param {type} 案件ID，点位list[{
                    type:1,
                    caseCamera:tianwangnodes
                },{
                    type:4,
                    caseCamera:shehuimiannodes
                }]
         * @return:
         */
        addDeviceToCase(caseUuid,devices){
            let data = {
                caseUuid:caseUuid,
                relDeviceList:devices
            }
            data = this.$qs.stringify(data,{arrayFormat:'indices',allowDots:true})
            this.$http.post('vsas/structure/check/device/rel',data).then(res=>{
            })
        },
        //复选框事件
        zTreeOnCheck(e,id,nodes){
            let checkarr = []
            let treelist = this.treeObj.getNodes()
            if(this.initTab == 'video' || (this.changeRadio == 3 && this.ViseinitTab == 'video')){
                var copydata = this.deepCopy(treelist)
                var alllist = this.jsonToArray(copydata)
                for (let i = 0; i < alllist.length; i++) {
                    if(alllist[i].gbsType == 6 && alllist[i].checked){
                        checkarr.push(alllist[i])
                    }
                }
                checkarr = _.uniqWith(checkarr, _.isEqual);
                this.$set(this.checkarr,0,checkarr)
            }else if(this.initTab == 'people'){
                for (let i = 0; i < treelist.length; i++) {
                    for (let j = 0; j < treelist[i].children.length; j++) {
                        if(treelist[i].children[j].checked){
                            checkarr.push(treelist[i].children[j])
                        }
                    }
                }
                checkarr = _.uniqWith(checkarr, _.isEqual);
                this.$set(this.checkarr,1,checkarr)
            }
            this.showdevice(this.checkarr)
        },

        jsonToArray(nodes) {
            var r=[];
            if (Array.isArray(nodes)) {
            for (var i=0, l=nodes.length; i<l; i++) {
                r.push(nodes[i]); // 取每项数据放入一个新数组
                if (Array.isArray(nodes[i]["children"])&&nodes[i]["children"].length>0)
                // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
                r = r.concat(this.jsonToArray(nodes[i]["children"]));
                    delete nodes[i]["children"]
            }
            }
            return r;
        },

        deepCopy(obj){
            var object;
            // 深度复制数组
            if(Object.prototype.toString.call(obj)=="[object Array]"){
                object=[];
                for(var i=0;i<obj.length;i++){
                object.push(this.deepCopy(obj[i]))
                }
                return object
            }
            // 深度复制对象
            if(Object.prototype.toString.call(obj)=="[object Object]"){
                object={};
                for(var p in obj){
                object[p]=obj[p]
                }
                return object
            }
		},


        returnlist(list){
            let result = []
            list.forEach((item)=>{
                result.push(item)
                if(item.children){
                    if(item.children instanceof Array){
                        this.returnlist(list)
                    }
                }

            })
            return result
        },

        VisehandleClick(tab, event){
        },
        // 切换tab栏重新加载地图
        handleClick(tab, event) {
            if(tab.paneName == 'video' && this.nowclick == 1){
                return
            }else if(tab.paneName == 'people' && this.nowclick == 2){
                return
            }
            this.showskylist = false
            this.setshowplayvideo(false)
            this.keyValue = ''
            if (tab.paneName == 'video') {
                this.queryVideoData()
                // if(this.$route.path == '/videoStrucPlat/taskManage'){
                //     this.$nextTick(()=>{
                //         this.OpenTheTime3('#createtaskbegin', '#createtaskend');
                //     })
                // }

            } else if (tab.paneName == 'people') {
                if(this.$route.path == '/videoStrucPlat/resourceManage'){
                    this.querySocietyData(0,1)
                }else{
                    this.querySocietyData(1)
                }
            }
        },
        // 切换tab栏重新加载地图检索
        handlereterClick(tab, event) {
            if(tab.paneName == 'video' && this.nowclick == 1){
                return
            }else if(tab.paneName == 'people' && this.nowclick == 2){
                return
            }
            this.keyValue = ''
            if (tab.paneName == 'video') {
                this.isonline = true
                this.queryVideoData()
                // if(this.$route.path == '/videoStrucPlat/taskManage'){
                //     this.$nextTick(()=>{
                //         this.OpenTheTime3('#createtaskbegin', '#createtaskend');
                //     })
                // }

            } else if (tab.paneName == 'people') {
                this.isonline = false
                this.querySocietyData(2);
            }
            setTimeout(() => {
                let dom = document.getElementById("treeDemo_2_span");
                this.$nextTick(()=>{
                     dom.click();
                })
            }, 300);

        }
    },
    destroyed() {
        this.setshowplayvideo(false)
    },
};
export default mixins
