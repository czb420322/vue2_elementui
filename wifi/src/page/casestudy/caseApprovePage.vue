<template>
  <div class="wrapper">
    <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库</router-link>
      <router-link class="nav-item nav-item-second" tag="div" :to="{path:'/casestudy/caseApprove',query:{menuCode:200}}">案件审批</router-link>
      <div class="nav-item nav-item-search">审批</div>
    </div>
    <div class="contentBody">
      <div class="contentTitle">
        <div class="contentTitleIcon"></div>
        <div>审批详情</div>
      </div>
      <!--嫌犯目标-->
      <div class="suspectPreson">
        <p @click="suspectFlag=!suspectFlag">嫌疑目标 <i v-show="suspectFlag" class="el-icon-caret-top"></i><i v-show="!suspectFlag" class="el-icon-caret-bottom"></i></p>
        <div v-if="suspectFlag">
          <select v-model="suspicionUuids" @change="changeSuspicionObj()">
            <option value="">全部</option>
            <option v-for="(item,index) in suspicionList" :key="index" :value="item.suspicionUuid">{{item.suspicionName}}</option>
          </select>
          <div class="criminalSuspectDetial">
            <ul v-show="caseMessageObj.type == 1" style="font-size: 12px;overflow-y: auto">
              <li><b>目标年龄段:</b><span>{{ isEmpty(caseMessageObj.ageType) }}</span></li>
              <li><b>目标包款式:</b><span>{{ isEmpty(caseMessageObj.bagStyle) }}</span></li>
              <li><b>目标包颜色:</b><span>{{ isEmpty(caseMessageObj.bagColor) }}</span></li>
              <li><b>目标携物:</b><span>{{ isEmpty(caseMessageObj.appendant) }}</span></li>
              <li><b>目标下衣类型:</b><span>{{ isEmpty(caseMessageObj.trousersStyle) }}</span></li>
              <li><b>目标下衣颜色:</b><span>{{ isEmpty(caseMessageObj.trousersColor) }}</span></li>
              <li><b>目标发型:</b><span>{{ isEmpty(caseMessageObj.hairStyle) }}</span></li>
              <li><b>目标头发颜色:</b><span>{{ isEmpty(caseMessageObj.hairColor) }}</span></li>
              <li><b>目标民族代码:</b><span>{{ isEmpty(caseMessageObj.ethicCode) }}</span></li>
              <li><b>目标性别:</b><span>{{ isEmpty(caseMessageObj.genderCode) }}</span></li>
              <li><b>目标体态:</b><span>{{ isEmpty(caseMessageObj.bodyType) }}</span></li>
              <li><b>目标鞋子款式:</b><span>{{ isEmpty(caseMessageObj.shoesStyle) }}</span></li>
              <li><b>目标鞋子颜色:</b><span>{{ isEmpty(caseMessageObj.shoesColor) }}</span></li>
              <li><b>目标上衣款式:</b><span>{{ isEmpty(caseMessageObj.coatStyle) }}</span></li>
              <li><b>目标上衣颜色:</b><span>{{ isEmpty(caseMessageObj.coatColor) }}</span></li>
              <li><b>目标上衣纹理:</b><span>{{ isEmpty(caseMessageObj.coatTexture) }}</span></li>
              <li><b>目标朝向:</b><span>{{ isEmpty(caseMessageObj.viewType) }}</span></li>
              <li><b>目标状态:</b><span>{{ isEmpty(caseMessageObj.status) }}</span></li>
              <li><b>目标姿态:</b><span>{{ isEmpty(caseMessageObj.gesture) }}</span></li>
              <li><b>目标行为:</b><span>{{ isEmpty(caseMessageObj.behavior) }}</span></li>
              <li><b>目标动作习惯:</b><span>{{ isEmpty(caseMessageObj.habitualMovement) }}</span></li>
            </ul>
            <ul v-show="caseMessageObj.type == 2" style="font-size: 12px;overflow-y: auto">
              <li><b>目标年龄段:</b><span>{{ isEmpty(caseMessageObj.ageType) }}</span></li>
              <li><b>目标包款式:</b><span>{{ isEmpty(caseMessageObj.bagStyle) }}</span></li>
              <li><b>目标包颜色:</b><span>{{ isEmpty(caseMessageObj.bagColor) }}</span></li>
              <!-- <li><b>目标车颜色:</b><span>{{ isEmpty(caseMessageObj.plateColor) }}</span></li> -->
              <li><b>目标车颜色:</b><span>{{ isEmpty(caseMessageObj.vehicleColor) }}</span></li>

              <li><b>目标是否携物:</b><span>{{ isEmpty(caseMessageObj.carryingType) }}</span></li>
              <li><b>目标下衣类型:</b><span>{{ isEmpty(caseMessageObj.trousersStyle) }}</span></li>
              <li><b>目标下衣颜色:</b><span>{{ isEmpty(caseMessageObj.trousersColor) }}</span></li>
              <li><b>目标驾驶人数:</b><span>{{ isEmpty(caseMessageObj.driverCount) }}</span></li>
              <li><b>目标眼部特征:</b><span>{{ isEmpty(caseMessageObj.eyePart) }}</span></li>
              <li><b>目标发型:</b><span>{{ isEmpty(caseMessageObj.hairStyle) }}</span></li>
              <li><b>目标嘴部特征:</b><span>{{ isEmpty(caseMessageObj.mouthPart) }}</span></li>
              <li><b>目标民族代码:</b><span>{{ isEmpty(caseMessageObj.ethicCode) }}</span></li>
              <li><b>目标围脖:</b><span>{{ isEmpty(caseMessageObj.scarf) }}</span></li>
              <li><b>目标性别:</b><span>{{ isEmpty(caseMessageObj.genderCode) }}</span></li>
              <li><b>目标体态:</b><span>{{ isEmpty(caseMessageObj.bodyType) }}</span></li>
              <li><b>目标编号:</b><span>{{ isEmpty(caseMessageObj.typeIndex) }}</span></li>
              <li><b>目标是否打伞:</b><span>{{ isEmpty(caseMessageObj.umbrellaFlag) }}</span></li>
              <li><b>目标上衣款式:</b><span>{{ isEmpty(caseMessageObj.coatStyle) }}</span></li>
              <li><b>目标上衣颜色:</b><span>{{ isEmpty(caseMessageObj.coatColor) }}</span></li>
              <li><b>目标上衣纹理:</b><span>{{ isEmpty(caseMessageObj.coatTexture) }}</span></li>
              <li><b>目标朝向:</b><span>{{ isEmpty(caseMessageObj.viewType) }}</span></li>
            </ul>

            <ul v-show="caseMessageObj.type == 3" style="font-size: 12px;overflow-y: auto">
              <li><b>目标车牌类型:</b><span>{{ isEmpty(caseMessageObj.plateClass) }}</span></li>
              <li><b>目标车牌颜色:</b><span>{{ isEmpty(caseMessageObj.plateColor) }}</span></li>
              <li><b>目标车辆号牌:</b><span>{{ isEmpty(caseMessageObj.plateNo) }}</span></li>
              <li><b>目标车辆颜色:</b><span>{{ isEmpty(caseMessageObj.vehicleColor) }}</span></li>
              <li><b>目标车辆类型:</b><span>{{ isEmpty(caseMessageObj.typeIndex) }}</span></li>
              <li><b>目标可疑行为:</b><span>{{ isEmpty(caseMessageObj.behavior) }}</span></li>
              <li><b>目标车前部物品类型:</b><span>{{ isEmpty(caseMessageObj.vehicleFrontItem) }}</span></li>
              <li><b>目标车后部物品类型:</b><span>{{ isEmpty(caseMessageObj.vehicleRearItem) }}</span></li>
              <li><b>目标车模颜色:</b><span>{{ isEmpty(caseMessageObj.filmColor) }}</span></li>
            </ul>

            <ul v-show="caseMessageObj.type == 4" style="font-size: 12px;overflow-y: auto">
              <li><span>录像名称:</span><span>*****事件</span></li>
              <li><span>特殊时间:</span><span>2018-02-02  15:00:00</span></li>
              <li><span>目标年龄:</span><span></span></li>
            </ul>
            <div class='empty' v-show='caseMessageObj.length == 0'>
              暂无数据
            </div>
          </div>
        </div>
      </div>
      <!--嫌犯目标 end-->

      <!--案件属性-->
      <div class="propretiesOn">
        <p @click="caseNatureFlag=!caseNatureFlag">案事件属性展开
          <i v-show="caseNatureFlag" class="el-icon-caret-top" ></i>
          <i v-show="!caseNatureFlag" class="el-icon-caret-bottom" ></i>
        </p>
        <div v-if="caseNatureFlag" class="criminalSuspectDetial">
          <ul>
            <li>案件编号:{{ caseObj.caseLinkMark }}</li>
            <li>案件名称:{{ caseObj.caseName }}</li>
            <li>案发开始时间:{{ caseObj.timeLowLimit }}</li>
            <li>案发结束时间:{{ caseObj.timeUpLimit }}</li>
            <li>作案时机:{{ caseObj.caseOpportunityDesc }}</li>
            <li>案发区域:{{ caseObj.regionFullName }}</li>
            <li>案发经度:{{ caseObj.longitude }}</li>
            <li>案发纬度:{{ caseObj.latitude }}</li>
            <li>案发地址:{{ caseObj.placeFullAddress }}</li>
            <li>危害程度:{{ caseObj.caseLevelDesc }}</li>
            <li>案件类型:{{ caseObj.caseCategoryDesc }}</li>
            <li>作案手段:{{ caseObj.caseMethodDesc }}</li>
            <li>侵犯目标:{{ caseObj.caseTargetDesc }}</li>
            <li>作案工具:{{ caseObj.caseToolDesc }}</li>
            <li>案件状态:{{ caseObj.stateDesc }}</li>
            <li>简要案情:{{ caseObj.caseAbstract }}</li>
          </ul>
        </div>
      </div>

      <!--顶部按钮-->
      <div class="downloadVideo" @click="videoListFlag=true">
        <img style="margin-right: 7px" src="../../assets/case/videoDownload-btn-icon.png" alt="">
        <span>视频下载</span>
      </div>

      <div class="downloadAccessory" @click="accessoryFlag=true">
        <img style="margin-right: 7px" src="../../assets/case/accessoryDownLoad-icon.png" alt="">
        <span>附件下载</span>
      </div>
      <div class="exportAccessory " @click="exportCase(2)">
        <img style="margin-right: 7px" src="../../assets/case/caseExport-icon.png" alt="">
        <span>导出卷宗</span>
      </div>
      <div class="spaceHide">
        <div class="oneKey" @click="oneKeyFlag=!oneKeyFlag" v-show="oneKeyFlag">
          <span class="el-icon-caret-bottom" style="margin-right: 5px;margin-top: 2px"></span>
          <span style="margin-right: 4px;">一键隐藏</span>
        </div>
        <div class="oneKey" @click="oneKeyFlag=!oneKeyFlag" v-show="!oneKeyFlag">
          <span class="el-icon-caret-top" style="margin-right: 5px;margin-top: 2px"></span>
          <span style="margin-right: 4px;">一键展开</span>
        </div>
      </div>

       <!--中间视频-->
      <div class="centerSpaceVideo" v-show="centerSpaceVideoFlag">
        <div v-if="!isVideo" style="width: 100%;height: 100%; border:1px solid black; background:rgba(0,0,0,0.8)">
          <img id="centerVideo" :src="centerImgUrl" alt="" style="width: 100%;height: 100%;">
          <div class="centerVideoCloseIcon" @click="centerSpaceVideoFlag=false">
            <span class="el-icon-close"></span>
          </div>
        </div>
        <div v-if="isVideo" style="width: 100%;height: 100%; border:1px solid black; background:rgba(0,0,0,0.8)">
          <video loop disablePictureInPicture id="centerVideo_flv" src=""></video>
          <div class="centerVideoCloseIcon" @click="centerSpaceVideoFlag=false">
            <span class="el-icon-close"></span>
          </div>
        </div>
      </div>

      <!--审批-->
      <div class="spaceVideoArrow">
        <div class="spaceVideoArrowIcon" @click="spaceVideoArrowFlag = !spaceVideoArrowFlag">
          <div  v-show="spaceVideoArrowFlag" class="el-icon-arrow-down spaceVideoArrowIcon-Item" style="color: white;font-size: 22px"></div>
          <div  v-show="!spaceVideoArrowFlag" class="el-icon-arrow-up spaceVideoArrowIcon-Item" style="color: white;font-size: 22px"></div>
        </div>
      </div>
      <div  v-show="spaceVideoArrowFlag" class="spaceVideo">
        <div class="spaceVideoLeft">
          <div class="approveResult">
            <span style="width: 60px;margin-right: 7px">审批结果&nbsp;: &nbsp;</span>
            <!--<input style=" width:calc(90% - 60px);background-color:rgb(44, 45, 46);color:white;border: 1px solid #5F5E57;background: rgba(0, 0, 0, 0.5);" type="text">-->

            <select  v-model="approveStatus" style=" width:calc(90% - 60px);background-color:rgb(44, 45, 46);color:white;border: 1px solid #5F5E57;background: rgba(0, 0, 0, 0.5);" placeholder="请选择审批结果">
              <option value="1">通过</option>
              <option value="2">不通过</option>
            </select>
          </div>
          <div class="approveSuggest">
            <span style="width: 60px; margin-right: 7px">审批意见&nbsp;: &nbsp;</span>
            <textarea  style="width: calc(90% - 60px);height: 100%;background-color:rgb(44, 45, 46);color:white;border: 1px solid #5F5E57;font-size: 14px;background: rgba(0, 0, 0, 0.5);resize:none" v-model="approveOpinion" placeholder="请输入审批意见"></textarea>
          </div>
        </div>
        <div class="spaceVideoRight" >
          <div style="width:120px;height: 30px;background-color: #409EFF;display: flex;align-items: center;justify-content: center;color: white;border-radius: 3px;margin-top: 12%;margin-left: 10%;cursor: pointer" @click="caseToApprove()">确 定</div>
          <div @click="spaceVideoArrowFlag=false" style="width:120px;height: 30px;background-color: #67C23A;display: flex;align-items: center;justify-content: center;color: white;border-radius: 3px;margin-top: 12%;margin-left: 10%;cursor: pointer">收 起 审 批</div>
        </div>
      </div>

      <div id="mapContent">
      </div>
      <footer-third></footer-third>
    </div>

    <!-- 下载附件-->
    <el-dialog title="附件列表" :visible.sync="accessoryFlag" width="50%">
          <span v-if="accessoryFlag">
            <downaccessory ref="accessoryList" :caseuuId='$route.query.caseUuid'></downaccessory>
          </span>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="accessoryFlag = false">返 回</el-button>
          </span>
    </el-dialog>

    <!-- 视频下载 -->
    <el-dialog title="视频列表" :visible.sync="videoListFlag" width="50%">
          <span v-if="videoListFlag">
            <dwonvideo ref="videolists" :caseuuId='$route.query.caseUuid'></dwonvideo>
          </span>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="videoListFlag = false">返 回</el-button>
          </span>
    </el-dialog>

    <!--<car3DDialog :car3DObj="car3DObj"></car3DDialog>-->
    <!--<carNatureDialog :carNatureObj="carNatureObj"></carNatureDialog>-->
    <!--<person3DDialog :person3DObj="person3DObj"></person3DDialog>-->
    <!--<personFaceDialog :personFaceObj="personFaceObj"></personFaceDialog>-->
    <!--<personNatureDialog :personNatureObj="personNatureObj"></personNatureDialog>-->
    <!--<unCarNatureDialog :unCarNatureObj="unCarNatureObj"></unCarNatureDialog>-->

  </div>
</template>

<script>
  import maps from '../../api/realvideo/map.js'  //引入地图JS模块
  import downaccessory from './addcaseInfo/downaccessory'//引入附件下载列表组件
  import dwonvideo from './addcaseInfo/downvideo'//引入视频下载列表组件
  import footerThird from '../../components/footer_third'
  import car3DDialog from './caseRetrieval/caseDetailDialogs/car3DDialog'
  import carNatureDialog from './caseRetrieval/caseDetailDialogs/carNatureDialog'
  import person3DDialog from './caseRetrieval/caseDetailDialogs/person3DDialog'
  import personFaceDialog from './caseRetrieval/caseDetailDialogs/personFaceDialog'
  import personNatureDialog from './caseRetrieval/caseDetailDialogs/personNatureDialog'
  import unCarNatureDialog from './caseRetrieval/caseDetailDialogs/unCarNatureDialog'
  let duangIco = require('@/assets/images/device/duang.png');
  let videoIco = require('@/assets/images/device/video.png');
  let carIco = require('@/assets/images/device/car.png');
  let faceIco = require('@/assets/images/device/face.png');
  let RFIDIco = require('@/assets/images/device/RFID.png');
  let linshi = require('@/assets/images/device/temporary.png');
  import flvjs from 'flv.js'
  import flvplay from '../../api/casestudy/flvPlay.js'  //播放器的flv的js

  export default {
    components: {
      footerThird,
      // car3DDialog,
      // carNatureDialog,
      // person3DDialog,
      // personFaceDialog,
      // personNatureDialog,
      // unCarNatureDialog,
      downaccessory,
      dwonvideo
    },
    data() {
      return {
        suspectFlag: true,
        caseNatureFlag:true,
        oneKeyFlag:true,
        accessoryFlag: false,
        spaceVideoArrowFlag:true,
        centerSpaceVideoFlag: false,
        downloadVideoFlag:true,
        DialogVisible: false,
        isVideo: false,
        videoListFlag: false,
        videoUrl: '',
        caseUuid:'',
        caseObj:'',
        suspicionList:[],
        suspicionObj: '',
        evaluate: '',
        evaluateList: [],
        suspicionUuids:'',//select嫌疑人目标ID
        centerImgUrl:'',//中间视频的url
        SuspicionObjList: [],
        car3DObj: '',
        carNatureObj: '',
        person3DObj: '',
        personFaceObj: '',
        personNatureObj:{},//特征比对
        unCarNatureObj: '',
        caseMessageObj:{},
        videoList: [],
        accessoryList: [],

        myUploadTo:false,
        caseManage:false,
        myBrowse:false,
        myCollect:false,

        approveStatus:null,
        approveOpinion:""
      }
    },
    mixins: [maps,flvplay],
    methods: {
      handleNodeClick(data) {
      },
      // 审批
      caseToApprove(){
        if(this.caseUuid =='' || this.caseUuid==null ){
          layer.alert('不符合提交条件！',{icon:5,title:"消息提示"});
          return;
        }
        if(this.approveStatus =='' || this.approveStatus==null ){
          layer.alert('审批结果不能为空！',{icon:5,title:"消息提示"});
          return;
        }
        if(this.approveOpinion =='' || this.approveOpinion==null ){
          layer.alert('审批意见不能为空！',{icon:5,title:"消息提示"});
          return;
        }
        let  params ={
          targetId:this.caseUuid,
          approveStatus:this.approveStatus,
          approveOpinion:this.approveOpinion
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url:' pca/approve/approveCase/toApprove',
          method:'post',
          data:data
        }).then( res =>{
          if(res.statusText==='OK'&& res.data.code===200){
            layer.alert('操作成功！',{icon:6,title:"消息提示"});
            this.$router.push('/casestudy/caseApprove?menuCode=200')
          } else if (res.data.code===100){
            layer.alert(res.data.data,{icon:5,title:"消息提示"});
          }else {
            layer.alert('审批失败！',{icon:5,title:"消息提示"});
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //附件下载 文件名称
      filteName(row, column, cellValue){
        return cellValue.split('/').pop();
      },
      //转码状态
      formatStatus(row, column, cellValue) {
        if (cellValue === 1) {
          return '转码中';
        } else if (cellValue === 2) {
          return '转码完成';
        }
      },
       //点击时获取视频地址
      getImgUrl(data) {
        this.centerImgUrl = data.traceImgUrl;
        this.centerSpaceVideoFlag = true;
        this.isVideo = false;
        this.caseMessageObj = data;
      },
      getVideoUrl(data) {
        this.videoUrl = data.videoUrl;
        this.centerSpaceVideoFlag = true;
        this.isVideo = true;
        this.caseMessageObj = data;
        this.flv_load_mds('centerVideo_flv')
      },
     //判断信息是否为空
      isEmpty(text){
        if(text == ''){
          return '未知'
        }else{
          return text
        }
      },
      //查看案件详细信息
      getCaseMessage() {
        this.$http({
          url: 'pca/casemng/baseinfo/query',
          method: 'get',
          params: {
            caseUuid:this.caseUuid
          }
        }).then( res=>{
          if(res.data.code===200){
            this.caseObj = res.data.data;
          }else{
            layer.alert('获取案件详细信息失败！',{icon:5,title:"消息提示"});
          }
        })
      },
      //嫌疑目标查询
      getSuspicionMessage(){
        this.$http({
          url:'pca/casemng/suspicion/list',
          method:'get',
          params:{
            caseUuid:this.caseUuid
            //caseUuid:"FC5216267BDB4E3492E8DA39D32CDE19"
          }
        }).then( res => {
          if(res.data.code===200){
            this.suspicionList=res.data.data;
            if(this.suspicionList.length != 0){
              this.suspicionUuids = this.suspicionList[0].suspicionUuid;
            }
            this.changeSuspicionObj();
          }else{
            layer.alert("获取嫌疑目标失败！",{icon:5,title:"消息提示"});
          }
        })
      },
      // 切换嫌疑目标信息
      changeSuspicionObj(){
        this.spaceVideoArrowFlag = true;
        this.$http({
          url:'pca/casemng/suspicion/details',
          method:'get',
          params:{
            suspicionUuid:this.suspicionUuids
          }
        }).then( res=>{
          if(res.data.code===200){
             this.SuspicionObjList = [];
             this.caseMessageObj = [];
             this.ajaxVideo()
          }else{
            layer.alert("获取嫌疑目标信息失败！",{icon:5,title:"消息提示"});
          }
        })
      },
      //进入页面查询视频列表
      ajaxVideo(){
        let data = {
          caseUuid:this.caseUuid,
          suspicionUuid:this.suspicionUuids
        };
        this.$http.get('/pca/casemng/suspicion/mark/list',{params:data})
        .then((res) => {
           if (res.data.code === 200) {
              this.SuspicionObjList = res.data.data.list;
              if(this.SuspicionObjList.length != 0){
                if(this.SuspicionObjList[0].type == 4 ){
                  this.getVideoUrl(this.SuspicionObjList[0])
                }else{
                  this.getImgUrl(this.SuspicionObjList[0])
                }
              }else{
                //this.spaceVideoArrowFlag = false;
                this.centerSpaceVideoFlag = false
              }
           }else{
             layer.alert("获取视频列表失败！",{icon:5,title:"消息提示"});
           }
        })
      },
      //查询嫌疑人标注图片及视频列表
      // getSuspicionMarkList(obj){
      //   this.$http({
      //     url:'pca/casemng/suspicion/mark/list',
      //     method:'post',
      //     params:{
      //       caseUuid:obj.caseUuid,
      //       suspicionUuid:obj.suspicionUuid,
      //     }
      //   }).then( res=>{
      //     if(res.data.code===200){
      //
      //     }else{
      //       layer.alert("获取视频列表失败！",{icon:5,title:"消息提示"});
      //     }
      //   })
      // },

      //导出卷宗
      exportCase(){
        let pcaModuleUrl = sessionStorage.getItem('pcaModuleUrl');
        let link = document.createElement('a');
        link.href = `http://${pcaModuleUrl}/casemng/dossier/export?caseUuid=${this.caseUuid}`;
        link.click();
      },
      //查询视频列表
      getVideoList(){
        this.$http({
          url:'/pca/casemng/video/list',
          method:'get',
          params:{
            caseUuid:this.caseUuid
          }
        }).then( res=>{
          if(res.data.code == 200){
            this.videoList = res.data.data
          }else{
            layer.alert("获取视频列表失败！",{icon:5,title:"消息提示"});
          }
        })
      },
       //附件列表
      // caseAccessoryList() {
      //   let data = {
      //     caseUuid: this.caseUuid
      //   };
      //   data = this.$qs.stringify(data);
      //   this.$http.post('pca/casemng/attachment/list', data).then(res => {
      //     if (res.data.code == 200) {
      //       this.accessoryList = res.data.data
      //     }else{
      //       layer.alert("获取附件列表失败！",{icon:5,title:"消息提示"});
      //     }
      //   })
      // },
      //下载视频
      // downloadVideo(obj) {
      //   let fileName = obj.originVideoUrl.split('/').pop();
      //   let params = {
      //     url: obj.storagePath,
      //     filename: fileName
      //   };
      //   let data = this.$qs.stringify(params);
      //   this.$http({
      //     url: 'sms/uploadFile/download',
      //     method: 'post',
      //     data:data
      //   }).then(res => {
      //     if(res.data.code == 200){
      //       layer.alert("下载视频成功！",{icon:6,title:"消息提示"});
      //     } else{
      //       layer.alert("下载视频失败！",{icon:5,title:"消息提示"});
      //     }
      //   });
      // },
      // //下载附件
      // downloadAccessory(obj){
      //   let fileName = obj.attachmentFile.split('/').pop();
      //   let params = {
      //     url: obj.attachmentFile,
      //     filename:obj.localAttachmentFile
      //   };
      //   let data = this.$qs.stringify(params);
      //   this.$http({
      //     url: 'sms/uploadFile/download',
      //     method: 'post',
      //     data:data
      //   }).then(res => {
      //     if(res.data.code == 200){
      //       layer.alert("下载附件成功！",{icon:6,title:"消息提示"});
      //     } else{
      //       layer.alert("下载附件失败！",{icon:5,title:"消息提示"});
      //     }
      //   })
      // }
    },
    mounted: function () {
      // let _this = this;
      // _this.loadMap();
      // this.caseAccessoryList();
      // this.getVideoList();
      this.InitMainMap(mapContent)
    },
    created() {
      this.caseUuid = this.$route.query.caseUuid;
      this.getSuspicionMessage();
      this.getCaseMessage();
    },
    watch:{
      oneKeyFlag:function () {
        if(this.oneKeyFlag) {
          this.suspectFlag= true;
          this.caseNatureFlag=true;
          this.spaceVideoArrowFlag=true;
          this.downloadVideoFlag=true;
        }else {
          this.suspectFlag= false;
          this.caseNatureFlag=false;
          this.spaceVideoArrowFlag=false;
          this.downloadVideoFlag=false
        }
      },
      spaceVideoArrowFlag:function () {
        if(!this.spaceVideoArrowFlag){
          document.getElementsByClassName('spaceVideoArrow')[0].style.bottom = 0;
        }else {
          document.getElementsByClassName('spaceVideoArrow')[0].style.bottom = document.getElementsByClassName('spaceVideo')[0].style.height;
        }
      },
    }
  }
</script>


<style scoped>

  @import '../../assets/css/case_common.css';

  .contentBody {
    position: relative;
  }

  .itemIcon img {
    width: 100%;
    height: 100%;
  }


  .searchConditionContainer input {
    width: 62%;
    height: 28px;
    border: 1px solid #E6E8ED;
    padding-left: 5px;
    margin-left: 20px;
  }

  .contentTitle {
    width: 100%;
    height: 0.5rem;
    background-color: #ECF0F3;
    display: flex;
    align-items: center;
  }

  .contentTitleIcon {
    width: 2px;
    height: 18px;
    margin-left: 20px;
    margin-right: 10px;
    background-color: #3b9df4;
  }

  #mapContent {
    width: 100%;
    height: calc(100% - 0.5rem);
    display: flex;
    flex-direction: column;
  }

  .contentBody /deep/ .footer {
    bottom: 15px;
  }

  .spaceCondition {
    position: absolute;
    top: calc(0.5rem + 10px);
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: space-between;
  }

  .criminalSuspect {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(0.5rem + 10px);
    left:1rem;
    z-index: 99;
  }

  .criminalSuspectTarget {
    width: 200px;
    height: 28px;
    background-color: #FCFCFC;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: flex-end;
  }

  .criminalSuspectDetial {
    width: 200px;
    height: 300px;
    border: 1px solid #D8D8D8;
    background-color: #FFFFFF;
    padding-left: 7px;
    overflow-y: auto;
  }
  .criminalSuspectDetial ul{
    font-size: 12px;overflow-y: auto
  }
  .caseNature{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(0.5rem + 10px);
    right:90px;
    z-index: 99;
  }
  .spaceScore{
    width: 80px;
    height: 28px;
    background-color: #3b9df4;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-right: 15px;
    position: absolute;
    top: calc(0.5rem + 10px);
    right:580px;
    z-index: 99;
  }
  .addCollect{
    width:120px;
    height: 28px;
    background-color: #67C23A;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-right: 15px;
    cursor:pointer ;
    position: absolute;
    top: calc(0.5rem + 10px);
    right:440px;
    z-index: 99;
  }
  .downloadVideo{
    width:150px;
    height: 28px;
    background-color: #409EFF;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-right: 15px;
    cursor:pointer ;
    position: absolute;
    top: calc(0.5rem + 10px);
    right:750px;
    z-index: 99;
  }

  .videoList{
    width:150px;
    height: 200px;
    background-color: #FFFFFF;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-right: 15px;
    cursor:pointer ;
    position: absolute;
    top: calc(0.5rem + 38px);
    right:750px;
    z-index: 99;
    overflow-y: auto;
  }

  .downloadAccessory{
    width:150px;
    height: 28px;
    background-color: #409EFF;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-right: 15px;
    cursor:pointer ;
    position: absolute;
    top: calc(0.5rem + 10px);
    right:580px;
    z-index: 99;
  }

  .exportAccessory{
    width:120px;
    height: 28px;
    background-color: #E6A23C;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-right: 15px;
    cursor:pointer ;
    position: absolute;
    top: calc(0.5rem + 10px);

    right:440px;
    z-index: 99;
  }
  .spaceHide{
    width:120px;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(0.5rem + 10px);
    right:300px;
    z-index: 99;
  }
  .oneKey{
    width: 100%;
    height: 28px;
    background-color: #67C23A;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
  }
  .centerSpaceVideo {
    width: 25%;
    height: 30%;
    position: absolute;
    top: 37%;
    left: 37%;
    z-index: 99;
    overflow: hidden;
  }
  .spaceVideo{
    width: 60%;
    height: 1.5rem;
    background-color: #5A5F65;
    position: absolute;
    z-index: 99;
    bottom: 0;
    right:0;
    left:0;
    margin:auto;
    overflow-y: hidden;
    overflow-x: auto;
    padding:5px;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.55);
    display:flex;
  }
  .spaceVideoArrow{
    width: 60%;
    height: 20px;
    position: absolute;
    z-index: 99;
    display:flex;
    justify-content: center;
    bottom: 1.5rem;
    right:0;
    left:0;
    margin:0 auto;
  }
  .spaceVideoArrowIcon{
    width: 100px;
    height: 100%;
    background-color: #5A5F65 ;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-top-left-radius:3px;
    border-top-right-radius:3px;
  }

  .spaceVideoLeft{
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

  }
  .approveResult{
    height: 40%;
    width: 100%;
    color:white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .approveSuggest{
    height: 60%;
    width: 100%;
    color:white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .spaceVideoRight{
    width:20%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .videoItem{
    height: 100%;
    width: 150px;
    position:relative;
    display: inline-block;
    cursor: pointer;
  }
  .videoCloseIcon{
    position:absolute;
    top: 0;
    right: 0;
    z-index: 100;
    color: white;
    cursor: pointer;
    background-color: black;
    font-size: 14px;
  }
  .centerVideoCloseIcon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    color: white;
    cursor: pointer;
    background-color: black;
    font-size: 16px;
    width: 25px;
    height: 20px;
    text-align: center;
  }
  .centerVideoCloseIcon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    color: white;
    cursor: pointer;
    background-color: black;
    font-size: 16px;
    width: 25px;
    height: 20px;
    text-align: center;
  }
  .videoList /deep/ .el-tree {
    background: #F6F6F6;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }



  .videoList /deep/ .el-tree-node__content:hover {
    background-color: #E0EEFB;
  }

  .videoList /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: rgba(49,86,131,.2);
    border-left: 2px solid #58A9FF;
    /*color:#58A9FF;*/
  }

/*  .videoList /deep/ . el-icon-caret-right:before {
    !*content:url(../../assets/case/tresList-icon2.ico);*!
    content: url(../../assets/case/treeList-icon.png);
    margin-right: 7px;
  }*/

  .videoList /deep/ .el-icon-caret-right:before {
    content: url(../../assets/case/videoDownload-parent-icon.png)
  }
  .videoList /deep/ .el-tree-node__children .el-icon-caret-right:before {
    content: url(../../assets/case/videoDownload-child-icon.png)
  }
  .videoList /deep/ .el-tree-node__children .el-tree-node__label:after{
    content: url(../../assets/case/videoDownload-arrow-icon.png);
    margin-left: 15px;
  }

  *:before, *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
 .wrapper /deep/ .el-dialog__header{
    background-color: #F3F6F8;
   padding: 10px 20px 10px;
  }
  .wrapper /deep/ .el-dialog__footer{
    display: flex;
    justify-content: center;
  }



  .evaluate {
    display: block;
    height: 4.3rem;
  }

  .evaluate_top {
    height: 3rem;
  }

  .evaluate_top > p, .evaluate_btn > p {
    line-height: 0.3rem;
    color: #409eff;
  }

  .evaluate_top ul {
    height: 2.6rem;
    overflow: auto;
  }

  .evaluate_top ul li {
    padding: 0 0.2rem;
    font-size: 0.14rem;
    border-bottom: 1px solid #ccc;
  }

  .evaluate_top ul li .text{
    padding: 0.05rem 0.2rem 0.2rem 0.2rem;
  }

  .evaluate_top ul li p {
    display: flex;
    justify-content: space-between;
    padding-top: 0.2rem;
  }

  .evaluate_top li p span:first-child {
    color: #000;
  }

  .evaluate_top li p span:last-child {
    color: #c5c5c5;
  }

  .evaluate_btn {
    margin-top: 0.1rem;
    height: 1.3rem;
  }

  textarea {
    padding: 0.1rem;
    width: 100%;
    height: 0.9rem;
  }

  .el-dialog__wrapper /deep/ .el-dialog__header {
    background-color: #f3f6f8;
    font-size: 0.18rem;
  }

  .el-dialog__wrapper /deep/ .el-dialog__body {
    padding: 0.2rem;
  }

  .el-dialog__wrapper /deep/ .el-dialog {
    margin-top: 21vh !important;
  }

  .el-dialog__wrapper /deep/ .el-dialog__footer {
    padding: 0.2rem;
    border-top: 1px solid #ccc;
    text-align: center;
  }

  .compare_btn {
    height: 20px;
    background-color: #409EFF;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    padding: 2px 3px;
    display: inline-block;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-left: 2px;
    margin-top: 2px;
    line-height: 20px;
  }

  .videoItem /deep/ .el-popover div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .judgedItem {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-top: 3px;
  }

  .judgedItem:hover {
    color: #409EFF;
  }

  /*.handleTxt:hover {*/
  /*background-color:#51e0ed*/
  /*}*/
  .compare_btn:hover {
    background-color: #76b9ff;
  }

  .el-dialog__wrapper /deep/ .el-dialog__footer {
    padding: 0.2rem;
    border-top: 1px solid #ccc;
    text-align: center;
  }

  .accessorySave {
    width: 80px;
    height: 30px;
  }

  .downvideo {
    /* border: 1px solid #000; */
    height: 5rem;
  }

  .dialog-footer >>> .el-button {
    padding: 0.1rem 0.5rem !important;
    font-size: 0.14rem !important;
  }

  .downvideo /deep/ .el-table th {
    background-color: #f3f6f8;
    text-align: center;
  }

  .downvideo /deep/ .el-table td {
    text-align: center;
    padding: 0.05rem 0;
  }
  .empty{
    text-align: center;
    width: 100%;
    height: 10%;
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    margin: auto;
  }
  .childname{
    color: #000;
  }
  .addcaseinfo{
    margin-left: -0.1rem;
    color: #409EFF;
  }





  .suspectPreson,
  .propretiesOn{
    position: absolute;
    box-shadow: 0 0 1px;
    top: calc(0.5rem + 10px);
    width: 2rem;
    font-size: 0.14rem;
    color: #606266;
    background-color: #fff;
    z-index: 999;
  }
  .suspectPreson{
    left: 0.1rem;
  }
  .propretiesOn{
    right: 0.8rem;
  }
  .suspectPreson p,.propretiesOn p{
    padding: 0rem 0.1rem;
    text-align: center;
    font-size: 0.16rem;
    padding: 0.05rem 0;
    cursor: pointer;
    background:#dcdfe6;
  }
  .suspectPreson ul{
    height: 3.6rem;
    overflow: auto;
  }
  .suspectPreson p i,.propretiesOn p i{
    float: right;
    font-size: 0.24rem;
  }
  .propretiesOn div{
    overflow: auto;
  }

  .suspectPreson select{
    width: 92%;
    color: #909399;
    margin: 0.05rem 0;
    margin-left: 4%;
  }
  .suspectPreson ul li,.propretiesOn ul li{
    margin: 0.05rem 0;
    padding: 0rem 0.1rem;
    color: #606266;
    word-break: break-all;
  }
</style>

