/*
 * @Author: your name
 * @Date: 2020-11-10 10:08:06
 * @LastEditTime : 2020-12-28 14:54:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\VideoStructPlatform\resourceManage.js
 */
//地图操作
import _ from 'lodash';
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
                data: {},
                key: {
                    children: "children",
                    isParent: true,
                    name: "name"
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
        }
    },

    methods: {
        initzTree() {
            this.nodes = []
            this.treeObj = $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
            var nodes = this.treeObj.getNodes()
            this.allNodes = this.queryFun(nodes)
            if (nodes.length && !this.opencheck) {
                this.treeObj.expandNode(nodes[0])
                this.zTreeOnClick(null, null, nodes[0])
            }
            else if(this.opencheck){
                if(this.initTab == 'video'){
                    if(this.checkarr[0].length){
                        nodes.forEach(node => {
                            // 展开全部
                            this.treeObj.expandNode(node, true)
                        })
                    }else{
                        //展开第一个
                        this.treeObj.expandNode(nodes[0])
                    }
                    //赋值当前选中的
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
            var metaChar = '[\\[\\]\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]'
            var rexMeta = new RegExp(metaChar, 'gi')
            var nameKey = this.treeObj.setting.data.key.name
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i] && nodes[i].oldname && nodes[i].oldname.length > 0) {
                    nodes[i][nameKey] = nodes[i].oldname
                }
                this.treeObj.updateNode(nodes[i])
                if (key === '') {
                    this.initzTree()
                    break
                } else {
                    if (nodes[i][nameKey] && nodes[i][nameKey].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                        if (isHighLight) {
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
                if(this.initTab == 'video'){
                    var nodes = this.treeObj.getNodes()
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
                }else if(this.initTab == 'people'){
                    var nodes = this.treeObj.getNodes()
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
        // 获取视频的信息
        queryVideoData() {
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
                    this.initzTree()
                    this.nowclick = 1
                } else {
                    this.loading.close();
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
        querySocietyData() {
            let data = {
                caseUuid:sessionStorage.getItem('exclusiveCaseUuid')
            }
            data = this.$qs.stringify(data)
            this.$http.post("/vsas/structure/selectBySociety",data).then(res => {
                if (res.data.code == 200) {
                    this.videoList = res.data.data;
                    for (let i = 0; i < this.videoList.length; i++) {
                        for (let j = 0; j < this.videoList[i].apes.length; j++) {
                            this.videoList[i].apes[j].newName = this.videoList[i].apes[j].name
                            this.videoList[i].apes[j].name = this.videoList[i].apes[j].name + "("+ this.videoList[i].apes[j].allowVideoCount +")"
                        }
                    }
                    // console.log(this.videoList,11441222);
                    this.videoList.forEach(v => {
                        v.children = v.apes;
                    });
                    this.zNodes = this.videoList;
                    this.initzTree()
                    this.nowclick = 2
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
        zTreeOnClick(e, id, nodes) {
            console.log(nodes.parentTId,"有没有触发");
            if(nodes.parentTId != null){
                this.nodesFatherId = nodes.parentTId
            }
            this.showskylist = true
            this.$nextTick(() => {
                // 如果点击的是根节点
                if (nodes.apes) {
                    if (this.initTab == 'people') {
                        this.showskylist = true
                    }
                    this.skynetlist = nodes.apes
                } else {
                    this.skynetlist = [nodes]
                    if (this.initTab == 'people') {
                        this.showskylist = false
                        this.caseUuid = sessionStorage.getItem('exclusiveCaseUuid');
                        this.deviceUuid = nodes.shebeiId;
                        // console.log(nodes,12133332);
                        let list = []
                        list.push({
                            type:4,
                            caseCameraList:[
                                {"cameraType":4,
                                "deviceUuid":nodes.shebeiId,
                                "longitude":nodes.longitude,
                                "latitude":nodes.latitude,
                                "cameraName":nodes.newName,
                                "offset":0,
                                "caseUuid":sessionStorage.getItem('exclusiveCaseUuid')}
                            ]
                        })
                        this.addDeviceToCase(this.caseUuid,list)
                    }
                }
            })
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
            // console.log(data,4546456);
            data = this.$qs.stringify(data,{arrayFormat:'indices',allowDots:true})
            this.$http.post('vsas/structure/check/device/rel',data).then(res=>{
                // console.log(res,44444);
            })

        },
        //复选框事件
        zTreeOnCheck(e,id,nodes){
            // console.log(nodes,748979);
            let checkarr = []
            for (let i = 0; i < this.treeObj.getNodes().length; i++) {
                if(this.treeObj.getNodes()[i].checked){
                    checkarr.push(this.treeObj.getNodes()[i])
                }
                for (let j = 0; j < this.treeObj.getNodes()[i].children.length; j++) {
                    if(this.treeObj.getNodes()[i].children[j].checked){
                        checkarr.push(this.treeObj.getNodes()[i].children[j])
                    }
                }
            }
            if(this.initTab == 'video'){
                this.$set(this.checkarr,0,checkarr)
            }else if(this.initTab == 'people'){
                this.$set(this.checkarr,1,checkarr)
                // this.checkarr[1] = checkarr
            }
            this.showdevice(this.checkarr)
        },


        // 切换tab栏重新加载地图
        handleClick(tab, event) {
            if(tab.paneName == 'video' && this.nowclick == 1){
                return
            }else if(tab.paneName == 'people' && this.nowclick == 2){
                return
            }
            this.keyValue = ''
            if (tab.paneName == 'video') {
                this.queryVideoData()
            } else if (tab.paneName == 'people') {
                this.querySocietyData()
            }


        }
    }
};
export default mixins
