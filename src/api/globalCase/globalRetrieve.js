/*
 * @Author: your name
 * @Date: 2020-11-10 10:08:06
 * @LastEditTime : 2020-12-29 11:55:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\VideoStructPlatform\resourceManage.js
 */
//地图操作
import _ from 'lodash';
import { draw, coorValue, imgwh, Line } from "../canvas.js";
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
            unit:1,
            isbdclick: false, // 是否双击完成
            retrimodel: 3, //检索方式
            targetsize:2,//目标大小
            targetqxd: 2, // 目标清晰度
            coordinates: [], // 装点击坐标的数组
            tastName:"",//任务名字
            dialogVisible2:false,
            dialogVisible3:false,
            beginData:"",
            endData:"",
            showCanvas: false,
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
            let imgs = document.getElementById("imgsVideoVal");
            let divs = document.getElementById("reterimgVideoVal");
            imgs.onload = () => {
              this.searchImgWh(imgs, divs);
            };
            imgs.src = this.sceneImage
        },

        //图片缩放的方法
    searchImgWh(imgs, divs) {
        //获取图片的原始宽高以及缩放后的宽厚，图片父元素的宽高
        //通过比率来计算图片是否是宽度自适应还是高度自适应
        var imgw = imgs.naturalWidth; //图片的原始宽度
        var imgh = imgs.naturalHeight; //图片的原始高度
        var retw = divs.clientWidth;
        var reth = divs.clientHeight;
        var canvas = document.getElementById("canvasVideoVal");
        var canvas2 = document.getElementById("canvasVideo");

        setTimeout(() => {
          canvas.setAttribute("width", imgs.width);
          canvas.setAttribute("height", imgs.height);
        }, 10);
        setTimeout(() => {
          canvas2.setAttribute("width", imgs.width);
          canvas2.setAttribute("height", imgs.height);
        }, 20);

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

      },
      // 画线
    getcanvas(e) {
        this.isbdclick = false;
        var context = document.getElementById("canvasVideoVal").getContext("2d");
        var x = e.offsetX;
        var y = e.offsetY;
        if (this.retrimodel === 3) {
          // context.clearRect(0, 0, e.target.clientWidth, e.target.clientHeight);
          // drawPolygon(context, this.coordinates);
          // //如果当前坐标小于等于2则使用前面两个点进行坐标绘制
          if (!this.isbdclick) {
            this.coordinates.push([e.offsetX, e.offsetY]);
            this.getdbDeweight();
            if (this.coordinates.length == 2) {
              draw(this.coordinates, context);
            } else if (this.coordinates.length > 2) {
              // 当数组大于2个的时候永远使用最后两项来画图
              draw(
                this.coordinates.slice(
                  this.coordinates.length - 2,
                  this.coordinates.length
                ),
                context
              );
            }
          }
        }
        if (this.retrimodel === 1) {
          this.coordinates.push([e.offsetX, e.offsetY]);
          this.getdbDeweight();
          draw(this.coordinates, context);
        }
        if (this.retrimodel === 2) {
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
          if (
            this.coordinates[0][0] == this.coordinates[1][0] &&
            this.coordinates[0][1] == this.coordinates[1][1]
          ) {
            this.coordinates.splice(1, 1);
          }
        }
        if (this.coordinates.length >= 3) {
          if (
            this.coordinates[1][0] == this.coordinates[2][0] &&
            this.coordinates[1][1] == this.coordinates[2][1]
          ) {
            this.coordinates.splice(2, 1);
          }
        }
      },

      // 3.画框结束前结束画线，并存储
    dbgetcoor(e) {
        if (this.retrimodel == 1 || this.retrimodel == 2) {
          if (this.coordinates.length >= 2) {
            if (
              this.coordinates[0][0] == this.coordinates[1][0] &&
              this.coordinates[0][1] == this.coordinates[1][1]
            ) {
              this.coordinates.shift();
              return;
            }
          }
        }
        // 判断是否双击完成，双击完成不能再次点击
        if (!this.isbdclick) {
          var context = document
            .getElementById("canvasVideoVal")
            .getContext("2d");
          var x = e.offsetX; // 当前点击的位置的横坐标
          var y = e.offsetY; // 当前点击的位置的纵坐标
          // this.coordinates.push([x, y])
          if (this.retrimodel == 3 && this.coordinates.length > 2) {
            let coord = [
              this.coordinates[this.coordinates.length - 1],
              this.coordinates[0]
            ];
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
          "red"
        );
        line.drawWithArrowheads(context);
      },

      clearcanvas() {
        this.coordinates = [];
        this.isbdclick = false;
        this.showCanvas = false;
        var context = document.getElementById("canvasVideoVal").getContext("2d");
        var context1 = document.getElementById("canvasVideo").getContext("2d");
        var reterimg = document.getElementById("reterimgVideoVal");
        context.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight);
        context1.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight);
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
