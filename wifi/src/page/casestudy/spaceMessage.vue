<template>
  <div class="wrapper">
    <div class="topNav">
      <div class="nav-item">
        <router-link :to="{path:'/casestudy',query:{menuCode:200}}">案件库</router-link>
      </div>
      <div class="nav-item nav-item-search">时空信息</div>
    </div>
    <div class="contentBody">
      <div class="contentTitle">
        <div class="contentTitleIcon"></div>
        <div>信息详情</div>
      </div>
      <!--嫌犯目标-->
      <div class="criminalSuspect ">
        <div class="criminalSuspectTarget" @click="suspectFlag=!suspectFlag">
          <div style="margin-right: 47px">嫌犯目标</div>
          <div style="margin-right: 5px" class="el-icon-arrow-right" v-show="!suspectFlag"></div>
          <div style="margin-right: 5px" class="el-icon-arrow-down" v-show="suspectFlag"></div>
        </div>
        <div v-show="suspectFlag">
          <select style="width: 200px" placeholder="请选择嫌烦目标">
            <option value="">嫌疑人目标</option>
            <option value="">车辆目标</option>
          </select>
          <div class="criminalSuspectDetial">
            <ul style="font-size: 12px;overflow-y: auto">
              <li><span>录像名称:</span><span>*****事件</span></li>
              <li><span>特殊时间:</span><span>2018-02-02  15:00:00</span></li>
              <li><span>目标年龄:</span><span></span></li>
              <li><span>目标性别:</span><span></span></li>
              <li><span>目标身高:</span><span></span></li>
              <li><span>目标身材:</span><span></span></li>
              <li><span>头发颜色:</span><span></span></li>
              <li><span>头发长度:</span><span></span></li>
              <li><span>上衣样式:</span><span></span></li>
              <li><span>上衣颜色:</span><span></span></li>
              <li><span>袖子类型:</span><span></span></li>
              <li><span>裤裙类型:</span><span></span></li>
              <li><span>裤裙颜色:</span><span></span></li>
              <li><span>衣服图案:</span><span></span></li>
              <li><span>鞋子类型:</span><span></span></li>
              <li><span>鞋子颜色:</span><span></span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="spaceScore"><span>分数&nbsp;:&nbsp;</span><span v-text="compositeScore"> &nbsp;</span></div>
      <div  v-show="collectFlag" class="addCollect" @click="collectCase()"><span class="el-icon-star-off" style="margin-right: 5px"></span><span>添加收藏</span></div>
      <div  v-show="!collectFlag" class="addCollect" @click="unCollectCase()"><span class="el-icon-star-off" style="margin-right: 5px"></span><span>取消收藏</span></div>
      <div class="spaceHide">
        <div class="oneKey" @click="oneKeyFlag=!oneKeyFlag" v-show="oneKeyFlag"><span class="el-icon-caret-bottom" style="margin-right: 5px;margin-top: 2px"></span><span  style="margin-right: 4px;">一键展开</span></div>
        <div class="oneKey" @click="oneKeyFlag=!oneKeyFlag" v-show="!oneKeyFlag"><span class="el-icon-caret-top" style="margin-right: 5px;margin-top: 2px"></span><span  style="margin-right: 4px;">一键隐藏</span></div>
      </div>
      <!--案件属性-->
      <div class="caseNature">
        <div class="criminalSuspectTarget" @click="caseNatureFlag=!caseNatureFlag">
          <div style="margin-right: 47px">案件属性</div>
          <div style="margin-right: 5px" class="el-icon-arrow-right" v-show="!caseNatureFlag"></div>
          <div style="margin-right: 5px" class="el-icon-arrow-down" v-show="caseNatureFlag"></div>
        </div>
        <div v-show="caseNatureFlag">
          <div class="criminalSuspectDetial">
             <ul style="font-size: 12px;overflow-y: auto">
                            <li><span>案件编号:</span><span  v-text="caseObj.caseLinkMark"></span></li>
                            <li><span>案件名称:</span><span  v-text="caseObj.caseName"></span></li>
                            <li><span>开始时间:</span><span  v-text="caseObj.timeLowLimit"></span></li>
                            <li><span>结束时间:</span><span  v-text="caseObj.timeUpLimit"></span></li>
                            <li><span>作案时机:</span><span v-text="caseObj.caseOpportunityDesc"></span></li>
                            <li><span>案发区域:</span><span v-text="caseObj.placeFullAddress"></span></li>
                            <li><span>案发经度:</span><span v-text="caseObj.longitude"></span></li>
                            <li><span>案发纬度:</span><span v-text="caseObj.latitude"></span></li>
                            <li><span>案发地址:</span><span v-text="caseObj.placeFullAddress"></span></li>
                            <li><span>危害程度:</span><span v-text="caseObj.caseLevelDesc"></span></li>
                            <li><span>案件类型:</span><span v-text="caseObj.caseCategoryDesc"></span></li>
                            <li><span>作案手段:</span><span v-text="caseObj.caseMethodDesc"></span></li>
                            <li><span>侵犯目标:</span><span v-text="caseObj.caseTargetDesc"></span></li>
                            <li><span>作案工具:</span><span v-text="caseObj.caseToolDesc"></span></li>
                            <li><span>案件状态:</span>
                                  <span v-if="caseObj.state==0">新建</span>
                                  <span v-else-if="caseObj.state==1">已立案</span>
                                  <span v-else-if="caseObj.state==2">已侦破</span>
                                  <span v-else-if="caseObj.state==3">侦破待复核</span>
                                  <span v-else-if="caseObj.state==4">已结案</span>
                                  <span v-else-if="caseObj.state==5">结案待复核</span>
                                  <span v-else-if="caseObj.state==6">并案待复核</span>
                                  <span v-else-if="caseObj.state==7">撤案待复核</span>
                                  <span v-else-if="caseObj.state==8">结案归档</span>
                                  <span v-else-if="caseObj.state==9">并案归档</span>
                                  <span v-else-if="caseObj.state==10">撤案归档</span>
                                  <span v-else></span>
                            </li>
                            <li><span>案件描述:</span><span v-text="caseObj.caseAbstract"></span></li>
                          </ul>
          </div>
        </div>
      </div>

      <!--中间视频-->
      <div class="centerSpaceVideo" v-show="centerSpaceVideoFlag">
        <img id="centerVideo"  src="" alt="" style="width: 100%;height: 100%">
        <div class="centerVideoCloseIcon" @click=" centerSpaceVideoFlag=false" ><span class="el-icon-close"></span></div>
      </div>
      <!--视频列表-->
      <div class="spaceVideoArrow">
        <div class="spaceVideoArrowIcon" @click="spaceVideoArrowFlag=!spaceVideoArrowFlag">
          <div   v-show="spaceVideoArrowFlag" class="el-icon-arrow-down spaceVideoArrowIcon-Item" style="color: white;font-size: 22px"></div>
          <div  v-show="!spaceVideoArrowFlag" class="el-icon-arrow-up spaceVideoArrowIcon-Item" style="color: white;font-size: 22px"></div>
        </div>
      </div>
      <div   v-show="spaceVideoArrowFlag" class="spaceVideo">
        <div class="videoItem" v-for="(item,index) in  videoItemList" :key="index">
          <img style="width: 100%;height: 100%" :src="item.videoUrl"  alt="无图" @click="getVideoUrl(item.videoUrl)" >
          <div class="videoCloseIcon" @click="deleteVideo(index)" ><span class="el-icon-close"></span></div>
        </div>
      </div>

      <div id="mapContent">
      </div>
      <footer-third></footer-third>
    </div>


  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  import footerThird from '../../components/footer_third'

  export default {
    components: {
      footerThird
    },
    data() {
      return {
        suspectFlag: true,
        caseNatureFlag:true,
        oneKeyFlag:true,
        spaceVideoArrowFlag:true,
        centerSpaceVideoFlag:false,
        collectFlag:true,
        videoItemList:[
          { videoId: 1,
            videoUrl:require("../../assets/case/videoItem.png")
          },
          { videoId: 2,
            videoUrl:require("../../assets/case/videoItem.png")
          },
          { videoId: 3,
            videoUrl:require("../../assets/case/videoItem.png")
          },
          { videoId: 4,
            videoUrl:require("../../assets/case/videoItem.png")
          },
          { videoId: 5,
            videoUrl:require("../../assets/case/videoItem.png")
          },
          { videoId: 6,
            videoUrl:require("../../assets/case/videoItem.png")
          },
          { videoId: 7,
            videoUrl:require("../../assets/case/videoItem.png")
          }
        ],
        caseUuid:'',
        compositeScore:0,//分数
        caseObj:''
      }
    },
    mixins: [vehicle, mapFun],
    methods: {
     //点击时获取视频地址
      getVideoUrl(data){
        let centerVideo=document.getElementById('centerVideo')
        centerVideo.src=data
        this.centerSpaceVideoFlag=true
      },
    //删除列表中的视频
    deleteVideo(index){
        console.log(index,'888888888888')
      this.videoItemList.splice(index,1)
    },
      //收藏
      collectCase(){
        this.$http({
          url:'pca/case/related/collect/save',
          method:'post',
          params:{
            caseUuid:this.caseUuid
          }
        }).then( res=>{
          if(res.statusText==='OK'&& res.data.code===200){
            this.$alert("收藏成功")
            this.collectFlag=false
          }else{
            this.$alert("收藏失败")
          }
        })
      },
      unCollectCase(){
        this.$http({
          url:'pca/case/related/collect/cancel',
          method:'post',
          params:{
            caseUuid:this.caseUuid
          }
        }).then( res=>{
          if(res.statusText==='OK'&& res.data.code===200){
            this.$alert("取消成功")
            this.collectFlag=true
          }else{
            this.$alert("取消失败")
          }
        })
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
            this.caseObj=res.data.data;
          }else{
            this.$alert("服务异常")
          }
        })
      }
    },
    mounted: function () {
      let _this = this
      _this.loadMap();
      _this.compositeScore=_this.$route.query.compositeScore;
      let code=_this.$route.query.menuCode;
    },
    created() {
      this.caseUuid = this.$route.query.caseUuid
      this.getCaseMessage();
    },
    watch:{
      oneKeyFlag:function () {
        if(this.oneKeyFlag) {
          this.suspectFlag= true
          this.caseNatureFlag=true
          this.spaceVideoArrowFlag=true
        }else {
          this.suspectFlag= false
          this.caseNatureFlag=false
          this.spaceVideoArrowFlag=false
        }
      },
      spaceVideoArrowFlag:function () {
        if(!this.spaceVideoArrowFlag){
          document.getElementsByClassName('spaceVideoArrow')[0].style.bottom=0
        }else {
          document.getElementsByClassName('spaceVideoArrow')[0].style.bottom=document.getElementsByClassName('spaceVideo')[0].style.height

        }
      }
    }


  }
</script>


<style scoped>
  @import '../../assets/css/global.css';

  select {
    width: 69%;
    height: 28px;
    border: 1px solid #E6E8ED;
    padding-left: 5px;
  }

  input {
    width: 70%;
    height: 28px;
    border: 1px solid #E6E8ED;
    padding-left: 5px;
  }

  input:focus {
    border: 1px solid #409EFF;
  }

  .wrapper {
    position: absolute;
    width: 100%;
    top: 0.6rem;
    height: calc(100% - 0.6rem);
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    background-color: #FFFFFF;
  }

  .contentBody {
    width: 100%;
    height: calc(100% - 0.54rem);
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .topNav {
    height: 0.54rem;
    background-color: #FFFFFF;
    width: 100%;
    border-bottom: 2px solid #E2E3E3;
  }

  .nav-item {
    display: inline-block;
    height: 0.54rem;
    width: 100px;
    line-height: 0.54rem;
    text-align: center;
    font-size: 18px;
  }

  .itemIcon img {
    width: 100%;
    height: 100%;
  }

  .footer img {
    margin-right: 0.05rem;
  }

  .nav-item {
    display: inline-block;
    height: 0.54rem;
    width: 140px;
    line-height: 0.54rem;
    text-align: center;
    font-size: 18px;
  }

  .nav-item-search {
    height: 100%;
    width: 168px;
    background: url(../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
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

  .centerSpaceVideo{
    width: 25%;
    height: 30%;
    position: absolute;
    top:37%;
    left: 37%;
    z-index: 99;
  }


  .spaceVideo{
    width: 60%;
    height: 1.6rem;
    background-color: #5A5F65;
    position: absolute;
    z-index: 99;
    bottom: 0;
    overflow-y: hidden;
    overflow-x: auto;
    padding:7px;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.55);
  }
  .spaceVideoArrow{
    width: 60%;
    height: 20px;
    position: absolute;
    z-index: 99;
    bottom: 1.6rem;
    display:flex;
    justify-content: center;
    margin-bottom: 0
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
  .videoItem{
    height: 100%;
    width: 170px;
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

  .centerVideoCloseIcon{
    position:absolute;
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

/*  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #F1F1F1;
  }

  !*定义滚动条轨道 内阴影+圆角*!
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  !*定义滑块 内阴影+圆角*!
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #C1C1C1;
  }*/
</style>

