<template>
  <div class="structura">
   <p class="retritask">视频结构化任务</p>
   <div class="stramains">
      <p class="taskNames"><span>任务名称：</span><input type="text" v-model="taskSruc" placeholder="请输入检索名称"></p>
      <div class="prosetype">
        <strong>任务类型：</strong>
        <span @click="changeTab('tab1')" class="items"><b><i></i></b>在线视频</span>
        <span @click="changeTab('tab2')" class="items"><b><i></i></b>离线视频</span>
      </div>

      <div id='tab1' class="onlineVideo">
        <div class="onmain">
          <p><i class="el-icon-search"></i><input type="text" placeholder="请输入设备名称" v-model="filterText"></p>
          <el-tree
            class="filterone-tree"
            :data="treeList2"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree2"
            @node-click="getRdfs">
          </el-tree>
        </div>
        <!-- 在线采集 -->

      </div>
      <!-- 离线采集 -->
      <div id='tab2' class="offlineVideo">
         <div class="offmain">
            <p class="searchtype" @click="changecolor">
              <i @click="load" v-show="selectPt">选择点位</i>
              <i @click="selectVideo" v-show="selectvideo">选择视频</i>
            </p>
            <p class="offvideo">已选视频列表：</p>
            <el-table
              :data="tableData2"
              border
              height="2.5rem">
              <el-table-column
                label="编号"
                width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="fileName"
                label="文件名">
              </el-table-column>
              <el-table-column
                prop="uploadTime"
                label="采集时间">
              </el-table-column>
              <el-table-column
                  prop="operation"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button class="btns" type="danger" @click="deletevideo(scope.$index)"><img src="../../../assets/images/videoCombat/cancel.png" alt="">&nbsp;&nbsp;删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
         </div>
      </div>

    <!-- 点位模态框 -->
      <el-dialog
        title="点位选择"
        :visible.sync="dialogVisible1"
        width="60%"
        class="dialog1">
          <div class="main1">
            <div class="main1_left" v-show="!checked">
              <el-tabs type="border-card" @tab-click="handleClick">
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-date"></i> 视频</span>
                        <div class="TreeMain">
                          <span>视频设备：</span>
                          <el-input v-model="filterText" placeholder="请输入视频设备">
                          </el-input>
                        </div>
                         <el-tree class="filter-tree" :data="treeList" :props="defaultProps"  @node-click="getInfo"  default-expand-all :filter-node-method="filterNode" ref="tree2"> </el-tree>
                        <!-- <el-tree :data="videoList" :filter-node-method="filterNode" :props="defaultProps" @node-click="handleNodeClick" default-expand-all ref="tree2"></el-tree> -->
                    </el-tab-pane>

                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-date"></i> 车辆</span>
                        <div class="TreeMain">
                        <span>车辆设备：</span>
                        <el-input v-model="filterText" placeholder="请输入车辆设备">
                            <!-- <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button> -->
                        </el-input>
                        </div>
                        <el-tree class="filter-tree" :data="treeList1" :props="defaultProps"  @node-click="getInfo"   default-expand-all :filter-node-method="filterNode" ref="tree2"> </el-tree>
                    </el-tab-pane>
                  </el-tabs>
            </div>
            <div class="main1_right">
              <img v-if="!checked" src="@/assets/images/videoCombat/left.png"  @click="checked = !checked"  alt="">
              <img v-else src="@/assets/images/videoCombat/right.png"  @click="checked = !checked" alt="">
              <div id="mapContent"></div>
            </div>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false;tableData2=''">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
    <!-- 选择视频模态框 -->
      <el-dialog
        title="选择视频"
        :visible.sync="dialogVisible2"
        width="50%"
        class="dialog2">
          <div class="main2">
            <div class="main2_top">
              <p>开始时间：
                <el-date-picker
                  v-model="begintime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </p>
              <p>结束时间：
                <el-date-picker
                  v-model="endtime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </p>
              <input type="text" class="inputs" placeholder="请输入关键字查询" v-model="keyword">
              <span @click="getvideo"><i class="el-icon-search"></i> 查询</span>
            </div>
            <div class="main2_btn">
              <el-table
                :data="tableData"
                border
                multipleTable
                @selection-change="handleSelection"
                style="width: 100%"
                height="3.5rem">
                 <el-table-column
                  type="selection"
                  width="50">
                </el-table-column>
                <el-table-column
                  label="编号"
                  width="180">
                  <template slot-scope="scope">
                    {{scope.$index+1}}
                    <!-- <el-radio :label="scope.$index+1" v-model="radio" @change.native="getCurrentRow(scope.$index)"></el-radio> -->
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="文件名"
                  show-overflow-tooltip
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="uploadTime"
                  label="采集时间">
                </el-table-column>
              </el-table>
            </div>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false;tableData=''">取 消</el-button>
          <el-button type="primary" @click="dialogviddeo">确 定</el-button>
        </span>
      </el-dialog>


    <!-- 离线视频选择点位下的视频  -->
      <el-dialog
        title="点位视频"
        :visible.sync="DialogVisible4"
        width="50%">
        <span>
          <el-table
            :data="videosUrl"
            border
            style="width: 100%"
            height="3.5rem"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
              <el-table-column
              label="编号"
              width="50">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="fileName"
              label="文件名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="uploadTime"
              label="采集时间">
            </el-table-column>
          </el-table>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible4 = false;tableData2=''">取 消</el-button>
          <el-button type="primary" @click="dianweivideo">确 定</el-button>
        </span>
      </el-dialog>


   </div>
   <hr>
   <div class="button">
      <el-button type="primary" @click="getsubmit">提交任务</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
 </div>
</template>

<script>
import {drawPolygon, clearRect, coorValue, imgwh} from '../canvas.js'
import copeMapFun from '../../../api/vehicle/copeMapFun.js'
import realvideo from "../../../api/realvideo/realvideo.js";
let videoIco = require("@/assets/images/device/video.png");
let RFIDIco = require("@/assets/images/device/RFID.png");

export default {
  data () {
    return {
      taskSruc:'', //任务名称
      radio:'',
      num:1,
      checked: false, // 模态框1中的图片的显示和隐藏
      filterText: '', // 搜索节点
      dialogVisible1: false,
      dialogVisible2: false,
      begintime: '',
      endtime: '',
      tableData: [], // 表格
      tableData2: [],
      treeList: [],  //得到卡口
      treeList1:[],   //得到社会面
      treeList2:[],   //得到卡口
      index:0,
      defaultProps: {
        children: 'apes',
        label: 'name'
      },
      coordinates: [], // 装点击坐标的数组
      actualcoord: [], // 实际图片的坐标
      rstp:'',
      multipleSelection:'',
      selectPt:true,   //点位的隐藏和显示
      selectvideo:true,
      dianwei:[],
      keyword:'',
      tastNameList:[],
    }
  },
  computed: {
    newpoints (){
      let arr = [];
      if(this.treeList !== null && this.treeList.length !==0){
        for(let i=0;i<this.treeList.length;i++){
          let apeToll = this.treeList[i].apes;
          let temp = arr.concat(apeToll);
          arr = temp;
        }
      }
      return arr;
    },
    newpoints2 (){
        let arr = [];
        if(this.treeList1 !== null && this.treeList1.length !==0){
          for(let i=0;i<this.treeList1.length;i++){
            let apeToll = this.treeList1[i].apes;
            let temp = arr.concat(apeToll);
            arr = temp;
          }
        }
      return arr;
    },
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },

  mounted () {
    this.queryData();
    this.changeTab('tab1')
    this.changecolor()
    this.getvideo();
    this.getKakou1()
  },
   mixins:[copeMapFun,realvideo],
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getCurrentRow(i){
      this.multipleSelection = this.tableData[i]
    },
    //选择点位的视频
    handleSelectionChange(val){
      this.tableData2 = val;
    },
    handleSelection(val){
      this.tableData2 = val;
    },
    //选择视频
    selectVideo(){
      this.dialogVisible2 = true
      this.$nextTick(()=>{
        // this.$refs.multipleTable.clearSelection();
      })

    },
    load(){
      this.dialogVisible1 = true
      this.$nextTick(() => {
        this.InitCopeMap('mapContent');
        if(this.index == 1){
          this.getShehui()
        }
        else if(this.index == 0){
          this.getKakou();
        }
      });
    },
    getInfo(){

    },
    getRdfs(data){
      console.log(data,6666);
      this.rstp = data.rtspUrl
    },
    // 获取树形控件的点击事件
    gettree () {
      var imgtwo = document.getElementById('imgstwo')
      var reterimg = document.getElementById('two')
      imgwh(imgtwo, reterimg)
    },
    //切换在线和离线
    changeTab (item) {
      var tabs = ['tab1', 'tab2']
      var items = document.getElementsByClassName('items')
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i] === item) {
          this.num = i+1;
          document.getElementById(tabs[i]).style.display = 'block'
          items[i].classList.add('active')
        } else {
          document.getElementById(tabs[i]).style.display = 'none'
          items[i].classList.remove('active')
        }
      }
    },
    changecolor () {
      $('.searchtype').on('click', 'i', function () {
        $('.searchtype i').removeClass('otheractive')
        $(this).addClass('otheractive')
      })
    },
    getKakou1(){
        this.$http.post('/sms/ape/selectByVideo').then(res => {
          if (res.data.code === 200) {
            this.treeList2 = res.data.data
          }
        })
    },
     // 点击切换tab栏
    handleClick(tab, event){
      this.index = tab.index
      if(tab.index == 0){
        this.getKakou();
      }
      else if(tab.index == 1){
        this.getShehui();
      }
    },
    //得到卡口
    getKakou(){
        this.$http.post('/sms/ape/selectByVideo').then(res => {
          if (res.data.code === 200) {
            this.treeList = res.data.data
            this.initAllPoint(this.newpoints,videoIco);
          }
        })
    },
     //得到社会面
    getShehui(){
      this.$http.post("/sms/ape/selectBySociety").then(res => {
        if (res.data.code === 200) {
          this.treeList1 = res.data.data;
           this.initAllPoint(this.newpoints2,RFIDIco);
        }
      });
    },
    //得到视频
    getvideo(){
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let userId = userInfo.value.userId;
      let data = {
        fileName: this.keyword,
        pageNum: 1,
        pageSize: 500,
        submiterId: userId,
        begin: this.begintime,
        end: this.endtime
      };
      this.getrealvideo(data, res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
        }
      });
      this.keyword = ''
    },
    //选择视频确认
    dialogviddeo() {
      if(this.tableData2 == ''){
        this.$alert('请选择视频');
        return
      }
      // this.tableData2 = [];
      this.dialogVisible1 = false
      this.dialogVisible2 = false
      // this.tableData2.push(this.multipleSelection)
      if(this.tableData2.length>0){
        this.selectPt = false;
      }
    },
    //选择点位确认
    dianweivideo(){
      this.DialogVisible4 = false
      this.dialogVisible1 = false;
      if(this.tableData2.length > 0){
        this.selectvideo = false;
      }
    },
    deletevideo(i){
      this.tableData2.splice(i,1)
      if(this.tableData2.length == 0){
        this.selectPt = true;
        this.selectvideo = true;
      }
    },
    // 提交
    getsubmit () {
       for (let i = 0; i < this.tastNameList.length; i++) {
        if(this.taskSruc == this.tastNameList[i].taskName){
          layer.alert('已有当前任务名称',{icon:2,title:"消息提示"});
          return
        }
      }

      if(this.taskSruc == ''){
        layer.alert('请输入任务名称',{icon:2,title:"消息提示"});
        return
      }
      var index =''
      var videoUrl
      var deviceId
      var rtsp
      var fileUuid
      if(this.num == 1){
        if(this.rtsp == ''){
          layer.alert('请选择设备',{icon:2,title:"消息提示"});
          return
        }
        index = '';
        videoUrl =''
        deviceId = ''
      }else if(this.num == 2){
        if(this.tableData2.length == 0){
           layer.alert('请选择视频',{icon:2,title:"消息提示"});
          return
        }
        if(this.selectPt && !this.selectvideo){
          var arr = []
          var arr2 = []
          for (let i = 0; i < this.tableData2.length; i++) {
            arr2.push(this.tableData2[i].fileUuid)
            arr.push(this.tableData2[i].fileDecodePath)
          }
          index = 1;
          this.rstp = ''
          videoUrl= arr.join(',')
          fileUuid = arr2.join(',')
          deviceId = this.tableData2[0].deviceId
        }else if(this.selectvideo && !this.selectPt){
          var arr = []
          var arr2 = []
          for (let i = 0; i < this.tableData2.length; i++) {
            arr2.push(this.tableData2[i].fileUuid)
            arr.push(this.tableData2[i].fileDecodePath)
          }
          index = 2
          this.rstp =''
          videoUrl=arr.join(',')
          fileUuid = arr2.join(',')
          deviceId=this.tableData2[0].submiterId
        }
      }
      let data = {
        task: {
          taskName: this.taskSruc,
          type: 1
        },
        taskStructural: {
          type: this.num,
          category:index,
          videoUrl: videoUrl,
          rtsp: this.rstp,
          deviceId:deviceId,
          fileUuid:fileUuid
        }
      }
      data = JSON.stringify(data)
      let data2 = {
        datas:data
      }
      data2 = this.$qs.stringify(data2)
      this.$http.post('vsas/task/add',data2).then(res=>{
        console.log(res,8888);
        if(res.data.code == 200){
          this.$router.push({path:'/videoCombat/taskMan',query:{ menuCode: '108' }});
        }
      })
      this.tableData2 = [];
      this.taskSruc = '';

    },
    queryData() {
      let userId = this.$storage.getSession("userInfo").userId
      let data = {
        pageNum: 1,
        pageSize: 500,
        orderBy: '',
        orderType: '',
        commitUser: userId,
        taskName: '',
        type: '', //任务类型
        status: '', //任务状态
        begin: '',
        end: ''
      };
      this.$http.get("vsas/task/list", {params: data}).then(res => {
        if (res.data.code == 200) {
          this.tastNameList = res.data.data.list
        }
      });
    },

    reset(){
      this.taskSruc = ''
      this.tableData2 = []
        this.selectPt = true;
        this.selectvideo = true;
    }
  }
}
</script>

<style scoped>
.inputs{
   border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding-left: 0.1rem;
}
.retritask {
  padding-left: 0.4rem;
  font-size: 0.14rem;
  color: #409eff;
}
.retritask span {
  font-weight: 900;
}
.stramains {
  position: relative;
  font-size: 0.14rem;
  margin: 0.2rem 0.45rem;
}

.taskNames {
  padding-bottom: 0.1rem;
  line-height: 0.3rem;
}
.taskNames input {
  width: 3.7rem;
  height: 0.3rem;
  padding-left: 0.1rem;
  border: 1px solid #dcdfe6;
  background-color: #fcfcfd;
}
.searchtype span {
  display: inline-block;
  position: absolute;
  width: 0.9rem;
}
.prosetype strong {
  font-weight: 400;
}
.prosetype span {
  margin-left: 0.3rem;
  cursor: pointer;
  position: relative;
}
.prosetype span:last-child {
  margin-left: 1rem;
}
.filter-tree >>> .el-tree-node__content:hover,
.filter-tree >>> .el-tree-node:focus > .el-tree-node__content {
  color: #409eff !important;
}
.items b {
  position: absolute;
  top: 0.04rem;
  left: -0.25rem;
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 0.14rem;
  height: 0.14rem;
  background-color: #fff;
  box-sizing: border-box;
}
.items b i {
  position: absolute;
  width: 0.06rem;
  height: 0.06rem;
  border-radius: 100%;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.active b {
  background-color: #409eff;
}

/* 在线视频 */
.onlineVideo {
  width: 4.5rem;
  margin-top: 0.1rem;
  height: 3.5rem;
  /* border: 1px solid red; */
  position: relative;
}
.onmain {
  padding: 0.1rem;
  width: 3.7rem;
  height: 100%;
  overflow: auto;
  margin-left: 0.8rem;
  position: relative;
  /* border: 1px solid #000; */
}
.onmain p {
  position: absolute;
  top: 10;
  left: 10;
  z-index: 1;
}
.onmain p input {
  width: 2.8rem;
  height: 0.3rem;
  font-size: 0.12rem;
  padding-left: 0.3rem;
  border: 1px solid #dcdfe6;
  background-color: #fcfcfd;
}
.onmain p i {
  font-size: 0.16rem;
  position: absolute;
  left: 0.1rem;
  top: 0.06rem;
}
.onmain .el-tree {
  height: 93%;
  width: 100%;
  padding-top: 0.4rem;
  background: #fcfcfd;
}
.el-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
}

.onimg {
  position: absolute;
  width: 6rem;
  height: 100%;
  border: 1px solid #000;
  left: 4.8rem;
  top: 0;
}
.onimg img,
.offimg img {
  display: block;
}
.onimg canvas,
.offimg canvas {
  position: absolute;
  top: 0;
}

.offmain {
  position: relative;
  padding: 0.1rem 0;
  margin-left: 0.8rem;
}
.offmain >>> .el-table {
  display: inline-block;
  width: 5.5rem;
}
.offimg {
  width: 5rem;
  height: 3.3rem;
  border: 1px solid #000;
  position: absolute;
  bottom: 0.12rem;
  left: 5.8rem;
}
.offvideo {
  padding: 0.1rem 0;
}
.button {
  padding-left: 0.45rem;
  margin: 0.2rem 0;
}
.el-button {
  width: 1.4rem;
  margin-right: 0.2rem;
}

.searchtype i {
  font-style: normal;
  display: inline-block;
  border: 1px solid #409eff;
  background-color: #e7f1fc;
  padding: 0 0.15rem;
  cursor: pointer;
  color: #409eff;
}
.searchtype i:first-child {
  margin-right: 0.67rem;
}
.searchtype .otheractive {
  background-color: #409eff;
  color: #fff;
}

.dialog1 >>> .el-dialog__header,
.dialog2 >>> .el-dialog__header,
.dialog3 >>> .el-dialog__header {
  background-color: #f3f6f8;
  padding: 0.2rem 0.2rem 0.1rem;
}
.dialog1 >>> .el-dialog__title,
.dialog2 >>> .el-dialog__title,
.dialog3 >>> .el-dialog__title {
  font-size: 0.2rem;
}
.dialog1 /deep/ .el-dialog,
.dialog2 /deep/ .el-dialog {
  margin-top: 10vh !important;
}

.dialog1 >>> .el-dialog__footer,
.dialog2 >>> .el-dialog__footer,
.dialog3 >>> .el-dialog__footer {
  padding: 0.2rem;
  text-align: center;
}
.dialog1 >>> .el-dialog__body,
.dialog2 >>> .el-dialog__body,
.dialog3 >>> .el-dialog__body {
  border-bottom: 1px solid #d5dade;
  padding: 0.3rem 0.2rem;
}
.dialog1 .main1,
.dialog2 .main2 {
  height: 5rem;
  position: relative;
  /* border: 1px solid #dcdfe6; */
}
/* .dialog2 .main2{
    height: 40.1rem;
    border: 0;
  } */
.main1_left {
  width: 3.2rem;
  height: 100%;
  float: left;
}
.main1_right{
  overflow: hidden;
  height: 100%;
  position: relative;
  border: 1px solid #000;
}
.main1_right div{
  width: 100%;
  height: 100%;
  border: 1px solid red;
}
.main1_right img {
  margin-top: 2.4rem;
  position: absolute;
}
.main1_left p {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.12rem;
  padding: 0.1rem;
  z-index: 2;
}
.main1_left input {
  width: 1.4rem;
  font-size: 0.12rem;
  height: 0.3rem;
}
.el-tree {
  width: 100%;
  overflow: auto;
  margin-top: 0.2rem;
   height: 3.75rem;
}
.el-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
}
.main1_left .el-icon-search {
  display: inline-block;
  width: 0.6rem;
  font-size: 0.12rem;
  line-height: 0.31rem;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
}
.filter-tree >>> .el-tree-node__content:hover,
.filter-tree >>> .el-tree-node:focus > .el-tree-node__content {
  color: #409eff !important;
}

.main2_top {
  display: flex;
  font-size: 0.14rem;
  justify-content: space-between;
}
.main2_top >>> .el-input__inner {
  height: 0.3rem;
  font-size: 0.14rem;
}
.main2_top >>> .el-input__icon {
  line-height: 0.3rem;
}
/* .el-input--prefix .el-input__inner */
.main2_top span {
  width: 0.7rem;
  line-height: 0.3rem;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  border-radius: 0.04rem;
}
.main2_btn {
  margin-top: 0.1rem;
}
.main2_btn >>> .el-table td,
.main2_btn >>> .el-table th {
  text-align: center;
  padding: 0.05rem 0;
}
.main2_btn >>> .el-table th {
  background-color: #f3f6f8;
}
.main2_btn >>> .el-table .cell {
  font-size: 0.14rem;
}

.el-button {
  width: 1.4rem;
  margin-right: 0.2rem;
  padding: 0.1rem 0.2rem;
}
.offmain >>> .el-table td,
.offmain >>> .el-table th {
  text-align: center;
  padding: 0.05rem 0;
}
.offmain >>> .el-table th {
  background-color: #f3f6f8;
}
.offmain >>> .el-table .cell {
  font-size: 0.14rem;
}

.el-table >>> .el-button{
  width: 0.8rem;
  padding: 0.05rem 0.2rem;
}
 .TreeMain >>> .el-input{
  width: 2rem;
  }
  .TreeMain >>> .el-input__inner{
    height: 0.3rem;
  }
</style>
