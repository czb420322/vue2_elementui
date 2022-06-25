<template>

<div>
  <el-dialog title="视频检索任务" :visible.sync="DialogVisible13" width="70%">
    <span class="addvideoclue">
      <div class="retrieval">
          <p class="retritask">视频检索任务</p>
          <div class="retrimain">
            <p class="taskNames"><span>任务名称：</span><input type="text" v-model="tastName" placeholder="请输入任务名称"></p>
            <div class="searchtype">
              <span>选择分类：</span>
              <p class="changecolor" @click.capture="changecolor">
                <i v-show="selectPt" @click="load">选择点位</i>
                <i v-show="selectVideo" @click="dialogVisible2 = true">选择视频</i>
                <i @click="dialogVisible3 = true">已选视频列表</i>
              </p>
            </div>
            <div class="setretrieve">
              <p>检索规则设置：</p>
              <div class="rule">
                <div>
                  <p>检索方式：</p>
                  <el-radio-group @change="clearcanvas" v-model="retrimodel">
                    <el-radio :label="1">区域</el-radio>
                    <el-radio :label="2">跨线</el-radio>
                    <el-radio :label="3">方向</el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <p>目标大小：</p>
                  <el-radio-group v-model="targetsize">
                    <el-radio :label="1">大</el-radio>
                    <el-radio :label="2">中</el-radio>
                    <el-radio :label="3">小</el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <p>目标清晰度：</p>
                  <el-radio-group v-model="targetqxd">
                    <el-radio :label="1">清晰</el-radio>
                    <el-radio :label="2">较清晰</el-radio>
                    <el-radio :label="3">模糊</el-radio>
                    <el-radio :label="4">较模糊</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>

            <div class="reterImg" id="reterimg" @dblclick="getyuan" @click="getcanvas" >
              <img id="imgs" :src="videoImg" alt="">
              <canvas id="canvas"></canvas>
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
                                  <!-- <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button> -->
                              </el-input>
                            </div>
                            <el-tree class="filter-tree" :data="treeList" :props="defaultProps"  @node-click="getInfo"   default-expand-all :filter-node-method="filterNode" ref="tree1"> </el-tree>
                            <!-- <el-tree :data="videoList" :filter-node-method="filterNode" :props="defaultProps" @node-click="handleNodeClick" default-expand-all ref="tree2"></el-tree> -->
                        </el-tab-pane>

                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i>社会面</span>
                            <div class="TreeMain">
                            <span>设备：</span>
                            <el-input v-model="filterText1" placeholder="请输入设备">
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
                    <div id="mapContent3"></div>
                  </div>
                </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dianweicanle">取 消</el-button>
                <el-button type="primary" @click="dianwei">确 定</el-button>
              </span>
            </el-dialog>
          <!-- 视频模态框 -->
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
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择开始时间">
                      </el-date-picker>
                    </p>
                    <p>结束时间：
                      <el-date-picker
                        v-model="endtime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择结束时间">
                      </el-date-picker>
                    </p>
                    <input type="text" class="inputs" placeholder="请输入关键字查询" v-model="keyword">
                    <span @click="getvideo"><i class="el-icon-search"></i>查询</span>
                  </div>
                  <div class="main2_btn">
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    height="3.5rem">
                    <el-table-column
                      label="编号"
                      width="180">
                      <template slot-scope="scope">
                        <el-radio :label="scope.$index+1" v-model="radio" @change.native="getCurrentRow(scope.$index)"></el-radio>
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
                  </div>
                </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogvideo">确 定</el-button>
              </span>
            </el-dialog>
          <!-- 已选视频模态框 -->
          <el-dialog
            title="已选视频列表"
            :visible.sync="dialogVisible3"
            width="45%"
            class="dialog3">
              <div class="main2_btn">
                  <el-table
                    :data="tableData2"
                    border
                    style="width: 100%"
                    height="3.3rem">
                    <el-table-column
                      label="编号"
                      width="80">
                      <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="fileName"
                      label="文件名">
                    </el-table-column>
                    <el-table-column
                      prop="uploadTime"
                      show-overflow-tooltip
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
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible3 = false;">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 选择点位下的视频的模态框 -->
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
              <el-button @click="DialogVisible4 = false">取 消</el-button>
              <el-button type="primary" @click="dianweivideo">确 定</el-button>
            </span>
          </el-dialog>

          <hr>
          <div class="button">
            <el-button type="primary" @click="getsubmit">提交任务</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
      </div>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="DialogVisible13=false">保 存</el-button>
      <el-button  @click="DialogVisible13=false">取 消</el-button>
    </span>
</el-dialog>


</div>


</template>

<script>
import {draw, circle, drawPolygon, coorValue, imgwh} from '../../videoCombat/canvas.js'
import realvideo from "../../../api/realvideo/realvideo.js";
import copeMapFun from '../../../api/vehicle/copeMapFun.js'
let videoIco = require("@/assets/images/device/video.png");
let RFIDIco = require("@/assets/images/device/RFID.png");

export default {
  data () {
    return {
      tastName:'',   //任务名称
      filterText: '', // 搜索节点
      filterText1: '', // 搜索节点
      taskname: '', // 任务名称
      retrimodel: 1, // 检索方式
      targetsize: 1, // 目标大小
      targetqxd: 1, // 目标清晰度
      checked: false, // 模态框1中的图片的显示和隐藏
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      DialogVisible4:false,
      DialogVisible13:false,
      begintime: '',
      endtime: '',
      tableData: [], // 视频
      tableData2: [],
      // 下拉列表测试数据
      treeList: [],
      treeList1:[],
      defaultProps: {
        children: 'apes',
        label: 'name'
      },
      index:0,
      coordinates: [], // 装点击坐标的数组
      // record:[], //装删除了的坐标
      circle: [], // 装圆点的坐标
      actualcoord: [], // 实际图片的坐标
      actuacircle: [], // 实际圆点的坐标
      record: [],
      shebeiId:'',     // 设备消息
      videoUrl:'',
      radio:'',
      selectPt:true,   //点位视频
      selectVideo:true,   //选择视频
      multipleSelection:'',//单选视频的对象
      videoImg:'',//视频的图片
      keyword:'',
      tastNameList:[],
    }
  },
  watch: {
    filterText1 (val) {
      this.$refs.tree2.filter(val)
    },
    filterText (val) {
      this.$refs.tree1.filter(val)
    },
    dialogs (val) {
      this.dialogVisible13 = val
    }
  },
  mounted() {
    this.getvideo();
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
  created() {
    this.queryData()
  },
  mixins:[copeMapFun,realvideo],
  props: {
    dialogs:Boolean
  },
  methods: {
    //监听树形结构的搜索
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
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
    //得到rdfs流
    getInfo(data){
      this.shebeiId = data.shebeiId
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
    //点位模态框
    dianwei(){
      this.dialogVisible1 = false
      this.dialogVisible2 = false
      var imgs = document.getElementById('imgs')
      var reterimg = document.getElementById('reterimg')
      imgwh(imgs, reterimg)
      var canvas = document.getElementById('canvas')
      canvas.setAttribute('width',imgs.width)
      canvas.setAttribute('height',imgs.clientHeight)
    },
    dianweicanle(){
      this.dialogVisible1 = false
      this.tableData2= [];
      this.selectVideo = true;
    },
     // 点击模态框的确定按钮  判断图片的宽度和高度
    dialogvideo () {
      if(this.multipleSelection == ''){
         layer.alert('请选择视频',{icon:2,title:"消息提示"});
        return
      }
      var imgs = document.getElementById('imgs')
      var reterimg = document.getElementById('reterimg')
      imgwh(imgs, reterimg)
      var canvas = document.getElementById('canvas')
      canvas.setAttribute('width',imgs.width)
      canvas.setAttribute('height',imgs.clientHeight)
      this.tableData2 = []
      this.dialogVisible1 = false
      this.dialogVisible2 = false
      this.tableData2.push(this.multipleSelection)
      if(this.tableData2.length>0){
        this.selectPt = false;
      }

    },
    //删除已选视频列表
    deletevideo(i){
      this.tableData2.splice(i,1)
      console.log(this.tableData2.length,77777);
      if(this.tableData2.length == 0){
        this.selectPt = true;
        this.videoImg = ''
        this.selectVideo = true;
      }
    },
    //点位视频列表
    dianweivideo(){
      console.log(this.tableData2,9999);
      this.videoImg = this.tableData2[0].snapUrl
      this.DialogVisible4 = false;
      if(this.tableData2.length > 0){
        this.selectVideo = false;
      }
    },


    //获取一个视频
    getCurrentRow(i){
      this.multipleSelection = this.tableData[i]
      this.videoImg = this.multipleSelection.snapUrl
      console.log(this.multipleSelection,9999);
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
          console.log(res,5555);
          this.tableData = res.data.data.list;
        }
      });
      this.keyword = '';

      // this.$http.get('vsas/collection/offline/list?status=4').then(res=>{
      //   if(res.data.code == 200){
      //     this.tableData = res.data.data.list
      //   }
      // })
    },
    // //表格的多选
    handleSelectionChange (val) {
      this.tableData2 = val
    },
    //改变颜色的样式切换
    changecolor () {
      $('.changecolor').on('click', 'i', function () {
        $('.changecolor i').removeClass('active')
        $(this).addClass('active')
      })
    },
    // 画线
    getcanvas (e) {
      var context = document.getElementById('canvas').getContext('2d')
      var x = e.offsetX
      var y = e.offsetY
      this.coordinates.push([e.offsetX, e.offsetY])
      console.log(this.coordinates,2222);
      if (this.retrimodel === 1) {
        context.clearRect(0, 0, e.target.clientWidth, e.target.clientHeight)
        drawPolygon(context, this.coordinates)
      }
      if (this.retrimodel === 2) {
        draw(this.coordinates, context)
      }
      if (this.retrimodel === 3) {
        draw(this.coordinates, context) // 线
      }
    },
    getyuan (e) {
      var context = document.getElementById('canvas').getContext('2d')
      var x = e.offsetX
      var y = e.offsetY
      this.circle.unshift(x)
      this.circle.unshift(y)
      if (this.circle.length === 2 && this.retrimodel == 3) {
          circle(context, x, y)
      }
    },
    // 切换画布  清空画布
    clearcanvas () {
      this.count = 0
      var context = document.getElementById('canvas').getContext('2d')
      var reterimg = document.getElementById('reterimg')
      this.coordinates = []
      context.clearRect(0, 0, reterimg.clientWidth, reterimg.clientHeight)
    },
    load(){
      this.dialogVisible1 = true
      this.$nextTick(() => {
        this.InitSmallMap(mapContent3);
        if(this.index == 1){
          this.getShehui()
        }
        else if(this.index == 0){
          this.getKakou();
        }
      });
    },

    // 提交
    getsubmit () {
      for (let i = 0; i < this.tastNameList.length; i++) {
        if(this.tastName == this.tastNameList[i].taskName){
          layer.alert('已有当前任务名称',{icon:2,title:"消息提示"});
          return
        }
      }
      // 获取盒子的大小
      if(this.tastName == ''){
        layer.alert('请输入任务名称',{icon:2,title:"消息提示"});
        return
      }
      if(this.tableData2.length == 0){
        layer.alert('请选择视频',{icon:2,title:"消息提示"});
        return
      }
      // 放到一个数组中去
      var imgs = document.getElementById('imgs')
      if (this.retrimodel === 1) {
        coorValue(imgs, this.coordinates, this.actualcoord)
      }
      if (this.retrimodel === 2) {
        coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord)
      }
      if (this.retrimodel === 3) {
        coorValue(imgs, this.coordinates.slice(0, 2), this.actualcoord)
        var imgw = imgs.naturalWidth
        var imgh = imgs.naturalHeight
        var retw = imgs.clientWidth
        var reth = imgs.clientHeight
        this.actuacircle[0] = parseInt(imgw * this.circle[1] / retw)
        this.actuacircle[1] = parseInt(imgh * this.circle[0] / reth)
      }
      let point = this.actualcoord.join(',') + this.actuacircle.join(',')
      if(point==''){
        layer.alert('请画检索规则',{icon:2,title:"消息提示"});
        return;
      }

      var index,videoUrl,deviceId,fileUuid
      if(this.selectPt && !this.selectVideo){
        var arr = []
        var arr2 = []
        for (let i = 0; i < this.tableData2.length; i++) {
          arr2.push(this.tableData2[i].fileUuid)
          arr.push(this.tableData2[i].fileDecodePath)
        }
        index = 1
        videoUrl = arr.join(',')
        fileUuid = arr2.join(',')
        deviceId = this.tableData2[0].deviceId
      }else if(!this.selectPt && this.selectVideo){
        index = 2
        videoUrl=this.tableData2[0].fileDecodePath
        fileUuid=this.tableData2[0].fileUuid
        deviceId=this.tableData2[0].submiterId
      }

      let data = {
        task: {
            taskName: this.tastName,
            type: 0
          },
          taskSearch: {
            category:index,
            type: this.retrimodel,
            size: this.targetsize,
            clarity: this.targetqxd,
            points: point,
            videoUrl:videoUrl,
            deviceId:deviceId,
            fileUuid:fileUuid
        }
      }
      data = JSON.stringify(data)

     let data2 = {
       datas:data
     }
      console.log(data2,111);

      data2 = this.$qs.stringify(data2)
      this.$http.post('vsas/task/add',data2).then(res=>{
        if(res.data.code == 200){
          this.$router.push({path:'/videoCombat/taskMan',query:{ menuCode: '108' }});
        }
      })
      this.actualcoord = []
      this.tastName = ''
    },
    //重置
    reset(){
      this.clearcanvas()
      this.tastName = this.videoImg = ''
      this.tableData2 = []
      this.selectPt = this.selectVideo = true;
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

  }
}
</script>

<style scoped>
.inputs{
   border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding-left: 0.1rem;
}
  /* 模态框的样式 */
  .dialog1 >>> .el-dialog__header,
  .dialog2 >>> .el-dialog__header,
  .dialog3 >>> .el-dialog__header{
    background-color: #f3f6f8;
    padding: 0.2rem 0.2rem 0.1rem;
  }
  .dialog1 >>> .el-dialog__title,
  .dialog2 >>> .el-dialog__title,
  .dialog3 >>> .el-dialog__title{
    font-size: 0.2rem;
  }

  .dialog1 >>> .el-dialog__footer,
  .dialog2 >>> .el-dialog__footer,
  .dialog3 >>> .el-dialog__footer{
    padding: 0.2rem;
    text-align: center;
  }
  .dialog1 >>> .el-dialog__body,
  .dialog2 >>> .el-dialog__body,
  .dialog3 >>> .el-dialog__body{
    border-bottom: 1px solid #d5dade;
    padding: 0.3rem 0.2rem;
  }
  .dialog1 .main1,.dialog2 .main2{
    height: 5rem;
    position: relative;
    border: 1px solid #dcdfe6;
  }
  .dialog2 .main2{
    height: 4.1rem;
    border: 0;
  }
  .main1_left{
    width: 3.2rem;
    height: 100%;
    float: left;
  }
  .main1_right{
    overflow: hidden;
    height: 100%;
    border: 1px solid red;
    position: relative;
  }
  .main1_right img{
    position: absolute;
    margin-top: 2.4rem;
  }

  .main1_right div{
    width: 100%;
    height: 100%;
    border: 1px solid #000;
  }
  .main1_left p{
    width: 3.2rem;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.12rem;
    padding: 0.1rem;
    z-index: 2;
    background-color: #f3f6f9;
  }
  .main1_left input{
    width: 1.4rem;
    font-size: 0.12rem;
    height: 0.3rem;
  }
  .el-tree{
    margin-top: 0.2rem;
    width: 100%;
    overflow: auto;
    height: 3.75rem;
  }
  .el-tree >>> .el-tree-node__label{
    font-size: 0.14rem;
  }
  .main1_left .el-icon-search{
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
  .filter-tree >>> .el-tree-node:focus>.el-tree-node__content{
    color: #409eff !important;
  }

  .main2_top{
    display: flex;
    font-size: 0.14rem;
    justify-content: space-between;
  }
  .main2_top >>> .el-input__inner{
    height: 0.3rem;
    font-size: 0.14rem;
  }
  .main2_top >>> .el-input__icon{
    line-height: 0.3rem;
  }
  /* .el-input--prefix .el-input__inner */
  .main2_top span{
    width: 0.7rem;
    line-height: 0.3rem;
    text-align: center;
    background-color: #409eff;
    color: #fff;
    border-radius: 0.04rem;
  }
  .main2_btn{
    margin-top: 0.1rem;
  }
  .main2_btn >>> .el-table td,
  .main2_btn >>> .el-table th{
     text-align: center;
     padding: 0.05rem 0;
   }
  .main2_btn >>> .el-table th{
    background-color: #f3f6f8;
  }
  .main2_btn >>> .el-table .cell{
    font-size: 0.14rem;
  }
  .el-radio >>> .el-radio__label{
    font-size: 0.14rem;
  }

  .retrieval{
    font-size: 0.14rem;
  }
  hr{
    color: #ebedf1;
  }
  .retritask{
    padding-left: 0.4rem;
    font-size: 0.14rem;
    color: #409eff;
  }

  .retrimain{
    position: relative;
    width: 4.5rem;
    font-size: 0.14rem;
    /* border: 1px solid green; */
    margin: 0.2rem 0.45rem;
  }

  .taskNames,.searchtype{
    padding-bottom: 0.1rem;
    line-height: 0.3rem;
  }
  .taskNames input{
    width: 3.7rem;
    height: 0.3rem;
    padding-left: 0.1rem;
    margin-left: 0.8rem;
    border: 1px solid #dcdfe6;
    background-color: #fcfcfd;
  }
   .taskNames span,.searchtype span{
    display: inline-block;
    position: absolute;
    width: 0.9rem;
  }
  .searchtype p{
    width: 100%;
    padding-left: 0.8rem;
    height: 0.3rem;
  }

  .searchtype p{
    display: flex;
    justify-content: space-between;
  }
  .searchtype p i{
    font-style:normal;
    display: inline-block;
    border: 1px solid #409eff;
    background-color: #e7f1fc;
    padding: 0 0.15rem;
    cursor: pointer;
    color: #409eff;
  }
  .searchtype p .active{
    background-color: #409eff;
    color: #fff;
  }
  .setretrieve{
    position: relative;
    margin-top: 0.1rem;
  }
  .setretrieve .rule{
    border: 1px solid #dcdfe6;
    margin: 0.1rem 0;
    padding:0.1rem 0.2rem;
  }
  .rule p{
    font-size: 0.16rem;
    padding-bottom: 0.1rem;
  }

  .retrimain .reterImg{
    width: 6.8rem;
    height: 4rem;
    border: 1px solid #ccc;
    position: absolute;
    bottom: 0;
    left: 5rem;
  }
  .reterImg img{
    display: block;
  }
  .reterImg canvas{
    position: absolute;
    top: 0;
  }
  .el-radio-group{
    padding-left: 0.2rem;
  }
  .el-radio-group >>> .el-radio.el-radio{
    margin-right: 0.3rem;
    margin-left: 0;
    margin-top: 0.1rem;
  }
  .rule div{
    padding-bottom: 0.1rem;
  }
  .button{
    padding-left: 0.45rem;
    margin: 0.2rem 0;
  }

  .el-button{
    width: 1.4rem;
    margin-right: 0.2rem;
    padding: 0.1rem 0.2rem;
  }
  /* .TreeMain{
    border: 1px solid #000;
  } */
  .TreeMain >>> .el-input{
    width: 2rem;
  }
   .TreeMain >>> .el-input__inner{
     height: 0.3rem;
   }

</style>
