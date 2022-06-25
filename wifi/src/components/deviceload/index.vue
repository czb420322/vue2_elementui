<template>
    <div class="deivceload">
        <p>
            <el-input placeholder="请输入设备名称" id="key" v-model="keyValue">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </p>
        <ul id="treeDemo" class="ztree"></ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
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
                    fontCss: this.getFont,
                    // {
                    //     color: "#99c9fa"
                    // },
                    showTitle: true,
                    showIcon: false,
                    nameIsHTML: true, //允许name支持html
                    selectedMulti: false
                },
                callback: {
                    onClick: this.zTreeOnClick
                }
            },
            zNodes: [],
            treeObj: "",
            keyValue: "",
            noData: false,
            nodes: [],
            allNodes: [],
            nodesShow: []
        };
    },
    components: {},
    mounted() {
        setTimeout(() => {
            this.zNodes = this.onlineDeviceList;
            for (let i = 0; i < this.zNodes.length; i++) {
                if(this.zNodes[i].gbsType == 6 && this.zNodes[i].isOnline == 2){
                    this.zNodes[i].font = {'color':'red'}
                }
            }
            this.initzTree();
        }, 100);
    },
    watch: {
        // keyValue(newV) {
        //     this.searchFun(newV, null, true);
        // },
    },
    computed: {
        ...mapGetters(["onlineDeviceList"])
    },
    methods: {
        initzTree(isDeom) {
            this.nodes = [];
            console.log(this.zNodes,7777444)
            this.treeObj = $.fn.zTree.init(
                $("#treeDemo"),
                this.setting,
                this.zNodes
            );
            // console.log(this.$parent,this.$route.path,4444);
            if(this.$route.path == '/manage/device'){
                this.$parent.$parent.$parent.loading.close();
            }else{
               this.$parent.loading.close();
            }

            this.fuzzySearch("treeDemo", "#key", null, true); //初始化模糊搜索方法
            // var nodes = this.treeObj.getNodes()
            // this.allNodes = this.queryFun(nodes)
        },
        getFont(treeId, node){
            return node.font ? node.font : {color: "#99c9fa"};
        },
        //点击事件
        zTreeOnClick(e, id, nodes){
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.expandNode(nodes);
            if(nodes.gbsType == 6){
                this.$emit('childbyId',nodes)
            }
        },

        fuzzySearch(zTreeId, searchField, isHighLight, isExpand) {
            var zTreeObj = $.fn.zTree.getZTreeObj(zTreeId); //get the ztree object by ztree id
            if (!zTreeObj) {
                alert("fail to get ztree object");
            }
            var nameKey = zTreeObj.setting.data.key.name; //get the key of the node name
            isHighLight = isHighLight === false ? false : true; //default true, only use false to disable highlight
            isExpand = isExpand ? true : false; // not to expand in default
            zTreeObj.setting.view.nameIsHTML = isHighLight; //allow use html in node name for highlight use

            var metaChar = "[\\[\\]\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]"; //js meta characters
            var rexMeta = new RegExp(metaChar, "gi"); //regular expression to match meta characters

            // keywords filter function
            function ztreeFilter(zTreeObj, _keywords, callBackFunc) {
                if (!_keywords) {
                    _keywords = ""; //default blank for _keywords
                }

                // function to find the matching node
                function filterFunc(node) {
                    if (node && node.oldname && node.oldname.length > 0) {
                        node[nameKey] = node.oldname; //recover oldname of the node if exist
                    }
                    zTreeObj.updateNode(node); //update node to for modifications take effect
                    if (_keywords.length == 0) {
                        //return true to show all nodes if the keyword is blank
                        zTreeObj.showNode(node);
                        zTreeObj.expandNode(node, isExpand);
                        return true;
                    }
                    //transform node name and keywords to lowercase
                    if (
                        node[nameKey] &&
                        node[nameKey]
                            .toLowerCase()
                            .indexOf(_keywords.toLowerCase()) != -1
                    ) {
                        if (isHighLight) {
                            //highlight process
                            //a new variable 'newKeywords' created to store the keywords information
                            //keep the parameter '_keywords' as initial and it will be used in next node
                            //process the meta characters in _keywords thus the RegExp can be correctly used in str.replace
                            var newKeywords = _keywords.replace(
                                rexMeta,
                                function(matchStr) {
                                    //add escape character before meta characters
                                    return "\\" + matchStr;
                                }
                            );
                            node.oldname = node[nameKey]; //store the old name
                            var rexGlobal = new RegExp(newKeywords, "gi"); //'g' for global,'i' for ignore case
                            //use replace(RegExp,replacement) since replace(/substr/g,replacement) cannot be used here
                            node[nameKey] = node.oldname.replace(
                                rexGlobal,
                                function(originalText) {
                                    //highlight the matching words in node name
                                    var highLightText =
                                        '<span style="color: whitesmoke;background-color: darkred;">' +
                                        originalText +
                                        "</span>";
                                    return highLightText;
                                }
                            );
                            zTreeObj.updateNode(node); //update node for modifications take effect
                        }
                        zTreeObj.showNode(node); //show node with matching keywords
                        return true; //return true and show this node
                    }

                    zTreeObj.hideNode(node); // hide node that not matched
                    return false; //return false for node not matched
                }

                var nodesShow = zTreeObj.getNodesByFilter(filterFunc); //get all nodes that would be shown
                processShowNodes(nodesShow, _keywords); //nodes should be reprocessed to show correctly
            }

            /**
             * reprocess of nodes before showing
             */
            function processShowNodes(nodesShow, _keywords) {
                if (nodesShow && nodesShow.length > 0) {
                    //process the ancient nodes if _keywords is not blank
                    if (_keywords.length > 0) {
                        $.each(nodesShow, function(n, obj) {
                            var pathOfOne = obj.getPath(); //get all the ancient nodes including current node
                            if (pathOfOne && pathOfOne.length > 0) {
                                //i < pathOfOne.length-1 process every node in path except self
                                for (var i = 0; i < pathOfOne.length - 1; i++) {
                                    zTreeObj.showNode(pathOfOne[i]); //show node
                                    zTreeObj.expandNode(pathOfOne[i], true); //expand node
                                }
                            }
                        });
                    } else {
                        //show all nodes when _keywords is blank and expand the root nodes
                        var rootNodes = zTreeObj.getNodesByParam("level", "0"); //get all root nodes
                        $.each(rootNodes, function(n, obj) {
                            zTreeObj.expandNode(obj, true); //expand all root nodes
                        });
                    }
                }
            }

            //listen to change in input element
            $(searchField).bind("input propertychange", function() {
                var _keywords = $(this).val();
                searchNodeLazy(_keywords); //call lazy load
            });

            var timeoutId = null;
            var lastKeyword = "";
            // excute lazy load once after input change, the last pending task will be cancled
            function searchNodeLazy(_keywords) {
                if (timeoutId) {
                    //clear pending task
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(function() {
                    if (lastKeyword === _keywords) {
                        return;
                    }
                    ztreeFilter(zTreeObj, _keywords); //lazy load ztreeFilter function
                    // $(searchField).focus();//focus input field again after filtering
                    lastKeyword = _keywords;
                }, 500);
            }
        }
        // queryFun(node) {
        //     for (var i in node) {
        //         this.nodes.push(node[i])
        //         if (node[i].children) {
        //             this.queryFun(node[i].children)
        //         }
        //     }
        //     return this.nodes
        // },
        // searchFun(val, isHighLight, isExpand) {
        //     var key = val.replace(/(^\s*)|(\s*$)/g, "")
        //     this.nodesShow = []
        //     isHighLight = isHighLight === false ? false : true
        //     isExpand = isExpand ? true : false
        //     this.filterzTree(key, this.allNodes, isExpand, isHighLight)
        //     if (this.keyValue === '') {
        //         this.noData = false
        //     } else {
        //         if (this.nodesShow.length === 0) {
        //             this.noData = true
        //         } else {
        //             this.noData = false
        //         }
        //     }
        //     this.showNodesFun(this.nodesShow, key)
        // },
        // filterzTree(key, nodes, isExpand, isHighLight) {
        //     var metaChar = '[\\[\\]\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]'
        //     var rexMeta = new RegExp(metaChar, 'gi')
        //     var nameKey = this.treeObj.setting.data.key.name
        //     for (var i = 0; i < nodes.length; i++) {
        //         if (nodes[i] && nodes[i].oldname && nodes[i].oldname.length > 0) {
        //             nodes[i][nameKey] = nodes[i].oldname
        //         }
        //         this.treeObj.updateNode(nodes[i])
        //         if (key === '') {
        //             this.initzTree()
        //             break
        //         } else {
        //             if (nodes[i][nameKey] && nodes[i][nameKey].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        //                 if (isHighLight) {
        //                     var newKeywords = key.replace(rexMeta, (matchStr) => {
        //                         return '//' + matchStr
        //                     })
        //                     nodes[i].oldname = nodes[i][nameKey]
        //                     var rexGlobal = new RegExp(newKeywords, 'gi')
        //                     nodes[i][nameKey] = nodes[i].oldname.replace(rexGlobal, (originalText) => {
        //                         var highLightText =
        //                             '<span style="color: whitesmoke;background-color: darkred;">' +
        //                             originalText +
        //                             '</span>'
        //                         return highLightText
        //                     })
        //                     this.treeObj.updateNode(nodes[i])
        //                 }
        //                 this.treeObj.showNode(nodes[i])
        //                 this.nodesShow.push(nodes[i])
        //             } else {
        //                 this.treeObj.hideNode(nodes[i])
        //             }
        //         }
        //     }
        // },
        // showNodesFun(nodesShow, key) {
        //     if (key.length > 0) {
        //         nodesShow.forEach(node => {
        //             var pathOfOne = node.getPath()
        //             if (pathOfOne && pathOfOne.length > 0) {
        //                 for (var i = 0; i < pathOfOne.length - 1; i++) {
        //                     this.treeObj.showNode(pathOfOne[i])
        //                     this.treeObj.expandNode(pathOfOne[i], true)
        //                 }
        //             }
        //         })
        //     } else {
        //         var rootNodes = this.treeObj.getNodesByParam('level', '0')
        //         rootNodes.forEach(node => {
        //             this.treeObj.expandNode(node, true)
        //         })
        //     }
        // },
        // zTreeOnCheck(){
        //     alert(222)
        // }
    }
};
</script>

<style scoped>
.deivceload {
    width: 100%;
    height: 100%;
}
.deivceload > p {
    height: 0.3rem;
}
.ztree {
    width: 100%;
    height: calc(100% - 0.5rem);
    overflow: auto;
}
</style>
