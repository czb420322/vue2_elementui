<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link tag="div" :to="{path:'/carJudged',query:{menuCode:300}}" class="nav-item">车辆研判</router-link>
      <router-link tag="div" :to="{path:'/carJudged/deployManage',query:{menuCode:318}}" class="nav-item nav-item-second">布控管理</router-link>
      <div class="nav-item nav-item-search">查看布控</div>
    </div> -->
     <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname"  :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判 > </router-link>
      <router-link class="sysname" :to="{path:'/carJudged/deployManage',query:{menuCode:318}}">&nbsp;布控管理 ></router-link>
      <p class="sysname">&nbsp;查看布控</p>
    </div>
    <div class="contentBody lookDeploy">
      <div class="contentLeft">
        <div class="clItem cli1">
          <div class="searchTitle">| 查看布控</div>
          <ul class="searchCondition">
            <li class="conditionInput">当前布控信息</li>
            <li><span>布控类型: </span>
              <span v-if="deployObj.dispositionMode ==10">  按车牌布控</span>
              <span v-else-if="deployObj.dispositionMode ==20">  按类别布控</span>
              <span v-else-if="deployObj.dispositionMode ==30">  按车型布控</span>
              <span v-else-if="deployObj.dispositionMode ==40">  套牌车布控</span>
              <span v-else></span>
            </li>
            <li v-if="deployObj.dispositionMode ==20"><span>车辆类别: </span><span v-text="deployObj.vehicleKine"></span></li>
            <li v-if="deployObj.dispositionMode ==30"><span>车辆品牌: </span><span v-text="deployObj.vehicleBrand"></span></li>
            <li v-if="deployObj.dispositionMode ==30"><span>车辆型号: </span><span v-text="deployObj.vehicleModel"></span></li>
            <li v-if="deployObj.dispositionMode ==10"><span>车牌号码: </span><span v-text="deployObj.plateNo"></span></li>
            <li><span>开始时间: </span><span v-text="deployObj.beginTime"></span></li>
            <li><span>结束时间: </span><span v-text="deployObj.endTime"></span></li>
            <li><span>报警方式: </span>
              <span v-if="deployObj.receiveMode==0">  系统预警</span>
              <span v-else-if="deployObj.receiveMode==1">  短信预警</span>
              <span v-else>{{deployObj.receiveMode}}</span>
            </li>
            <li><span>审&nbsp;&nbsp;批&nbsp;人: </span><span v-text="deployObj.approvalerName"></span></li>
            <li>
              <span class="deployReasonTitle">布控原因: </span>
              <span class="deployReason" v-text="deployObj.reason"></span>
            </li>
            <li v-if="deployObj.approvalStatus != 1">
              <span class="deployReasonTitle">审批意见: </span>
              <span class="deployReason" v-text="deployObj.approvalOpinion"></span>
            </li>
            <li v-if="deployObj.dispositionStatus === 1">
              <span class="deployReasonTitle">关闭原因: </span>
              <span class="" v-text="deployObj.dispositionRemoveReason"></span>
            </li>
          </ul>
        </div>
        <!--<div class="line"></div>-->
        <!--<div class="btnContainer">-->
        <!--<div class="btnReset" @click="chooseDeployApply(deployType);deployApply(deployData)"><img style="width: 12px;height: 12px" src="../../assets/images/carJudged/sub-icon.png" alt=""> 查看目标轨迹</div>-->
        <!--</div>-->
      </div>


      <div class="contentRight content">
        <div id="mapContent"></div>
        <img class="dingwei" src="../../assets/case/quickPos.png" @click="loadMap();initPoint();" />
        <div class="point">
          <span>经度：{{point.lng}}</span><br>
          <span>纬度：{{point.lat}}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'
  import BMap from 'BMap';
  import footerThird from '../../components/footer_third'

  export default {
    components: {
      footerThird
    },
    data() {
      return {
        map: null,//地图对象
        drawingManager: null,
        overlays: [],
        dataList: [],
        newpoints: [],
        filterText: '',
        isBar: false,
        tollgateIdsArr: [],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表
        defaultProps: {
          children: "apeTollgates",
          label: "name"
        },
        i: 0,
        longitude: 116.404,
        latitude: 39.915,
        deployObj: ''
      }
    },
    mixins: [vehicle, mapFun],
    methods: {

      getCaKouData() {
        this.$http({
            url: 'tvas/disposition/info/' + this.deployObj.bukongId,
            method: 'post'
          }
        ).then(res => {
          if (res.data.data.dispositionTollgates.length!== 0) {
            this.dataList = res.data.data.dispositionTollgates
            this.getNewpoints()
          } else {
            //如果当前布控没有点位信息,就显示全部点位信息
            this.warnDialog()
          }

        })
      },
      getNewpoints() {
        let _this = this
        if (_this.dataList !== null && _this.dataList.length !== 0) {
          for (let j = 0; j < _this.dataList.length; j++) {
            console.log(_this.dataList[j])
            _this.newpoints.push({
              kakouId: _this.dataList[j].kakouId,
              longitude: _this.dataList[j].longitude,
              latitude: _this.dataList[j].latitude,
              place: _this.dataList[j].place,//点位区域
              name: _this.dataList[j].name,//街道名称
            });
          }
          this.initPoint()
        }
      },
      //没有卡口信息时弹出提示
      warnDialog() {
        //this.$confirm('当前布控没有卡口信息, 是否展示所有卡口信息?', '提示', {
        //  confirmButtonText: '确定',
        //  cancelButtonText: '取消',
         // type: 'warning'
        //}).then(() => {
          this.$http({
            url: 'sms/apeTollgate/search',
            method: 'post'
          }).then(res => {
            let pointDataList = res.data.data
            if (pointDataList !== '') {
              for (let i = 0; i < pointDataList.length; i++) {
                let apeToll = pointDataList[i].apeTollgates;
                this.dataList=this.dataList.concat(apeToll)
              }
            }
            this.getNewpoints()
          })
        //});
      }
    },
    created() {
      if (sessionStorage.getItem('deployData')) {
        this.deployObj = JSON.parse(sessionStorage.getItem('deployData'));
      }
      this.getCaKouData()
    },
    mounted() {
      this.getLocalCoordinate();
      this.loadMap();
    },

  }
</script>

<style scoped>
 @import "../../assets/css/commom.css";
  @import "../../assets/css/carJudged_third.css";
   .lookDeploy .searchCondition li{
    color: #99c9fa;
  }
  .lookDeploy .searchCondition span:first-child{
    font-weight: bold;
    margin-right:0.1rem;
  }
  .lookDeploy .searchCondition span:last-child{
    width: 2.2rem;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
  }
  .lookDeploy .searchCondition li{
    margin-bottom: 10px;
  }

</style>




