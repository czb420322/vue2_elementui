<template>
    <div class="deivceload">
        <p>
            <el-input
                placeholder="请输入设备名称"
                v-model="keyValue">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </p>
        <ul id="treeDemo" class="ztree"></ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            setting : {
                data: {
                    simpleData: {
                        enable: true
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
            zNodes :[
                { id:1, pId:0, name:"父节点1 - 展开", open:true},
                { id:11, pId:1, name:"父节点11 - 折叠"},
                { id:111, pId:11, name:"叶子节点111"},
                { id:112, pId:11, name:"叶子节点112"},
                { id:113, pId:11, name:"叶子节点113"},
                { id:114, pId:11, name:"叶子节点114"},
                { id:12, pId:1, name:"父节点12 - 折叠"},
                { id:121, pId:12, name:"叶子节点121"},
                { id:122, pId:12, name:"叶子节点122"},
                { id:123, pId:12, name:"叶子节点123"},
                { id:124, pId:12, name:"叶子节点124"},
                { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
                { id:2, pId:0, name:"父节点2 - 折叠"},
                { id:21, pId:2, name:"父节点21 - 展开", open:true},
                { id:211, pId:21, name:"叶子节点211"},
                { id:212, pId:21, name:"叶子节点212"},
                { id:213, pId:21, name:"叶子节点213"},
                { id:214, pId:21, name:"叶子节点214"},
                { id:22, pId:2, name:"父节点22 - 折叠"},
                { id:221, pId:22, name:"叶子节点221"},
                { id:222, pId:22, name:"叶子节点222"},
                { id:223, pId:22, name:"叶子节点223"},
                { id:224, pId:22, name:"叶子节点224"},
                { id:23, pId:2, name:"父节点23 - 折叠"},
                { id:231, pId:23, name:"叶子节点231"},
                { id:232, pId:23, name:"叶子节点232"},
                { id:233, pId:23, name:"叶子节点233"},
                { id:234, pId:23, name:"叶子节点234"},
                { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
            ],
            treeObj:'',
            keyValue:'',
            noData: false,
            nodes: [],
            allNodes: [],
            nodesShow: []
        };
    },
    components: {},
    mounted(){
        this.getlist()
    },
    watch:{
        keyValue(newV) {
            this.searchFun(newV, null, true);
        },
    },
    methods: {
        getlist(){
            this.$http.post('/sms/ape/selectByGbsApe').then(res=>{
                this.zNodes = res.data.data
                this.initzTree()
            })
        },
        initzTree(isDeom) {
            this.nodes = []
            this.treeObj = $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
            var nodes = this.treeObj.getNodes()
            this.allNodes = this.queryFun(nodes)
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
            console.log(key,nodes);
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
            }
        },
        zTreeOnClick(){
            alert(111)
        },
        zTreeOnCheck(){
            alert(222)
        }
    }
};
</script>

<style scoped>
.deivceload{
    width: 100%;
    height: 100%;
}
.deivceload > p{
    height: .3rem;
}
.ztree{
    width: 100%;
    height: calc(100% - .5rem);
    overflow: auto;
}
</style>
