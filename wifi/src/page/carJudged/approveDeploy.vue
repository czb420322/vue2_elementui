<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link tag="div" :to="{path:'/carJudged',query:{menuCode:300}}" class="nav-item">车辆研判</router-link>
      <router-link tag="div" :to="{path:'/carJudged/deployManage',query:{menuCode:318}}" class="nav-item nav-item-second">布控管理</router-link>
      <div class="nav-item nav-item-search">布控审批</div>
    </div>  -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname"  :to="{path:'/carJudged',query:{menuCode:300}}">视频侦查> </router-link>
      <router-link class="sysname" :to="{path:'/carJudged/deployManage',query:{menuCode:318}}">&nbsp;布控管理 ></router-link>
      <p class="sysname">&nbsp;布控管理</p>
    </div>
    <!--左侧搜索-->
    <div class="contentBody approveDeploy">
      <div class="contentLeft">
        <div class="clItem cli1">
          <div class="searchTitle">| 布控审批</div>
          <ul class="searchCondition">
            <li class="conditionInput">审批信息</li>
            <!-- <div class="searchWrapper"> -->
              <li><span>布控类型: </span>
                <span v-if="deployObj.dispositionMode ==10">  按车牌布控</span>
                <span v-else-if="deployObj.dispositionMode ==20">  按类别布控</span>
                <span v-else-if="deployObj.dispositionMode ==30">  按车型布控</span>
                <span v-else-if="deployObj.dispositionMode ==40">  套牌车布控</span>
                <span v-else></span>
              </li>
              <li v-if="deployObj.dispositionMode ==20"><span>车辆类别: </span> <span v-text="deployObj.vehicleKine"></span></li>
              <li v-if="deployObj.dispositionMode ==30"><span>车辆品牌: </span> <span v-text="deployObj.vehicleBrand"></span></li>
              <li v-if="deployObj.dispositionMode ==30"><span>车辆型号: </span> <span v-text="deployObj.vehicleModel"></span></li>
              <li v-if="deployObj.dispositionMode ==10"><span>车牌号码: </span> <span v-text="deployObj.plateNo"></span></li>
              <li><span>开始时间: </span> <span v-text="deployObj.beginTime"></span></li>
              <li><span>结束时间: </span> <span v-text="deployObj.endTime"></span></li>
              <li><span>报警方式: </span>
                <span v-if="deployObj.receiveMode==0">  系统预警</span>
                <span v-else-if="deployObj.receiveMode==1">  短信预警</span>
                <span v-else>{{deployObj.receiveMode}}</span>
              </li>
              <li><span>布&nbsp;控&nbsp;人:&nbsp; </span><span v-text="deployObj.applicantName"></span></li>
              <li>
                <span class="deployReasonTitle">布控原因:</span>
                <span class="deployReason" v-text="deployObj.reason"></span>
              </li>
              <li>
                <span>审批意见:</span>
                <span>
                  <textarea maxlength="256" v-model="reason" style="border: 1px solid #E6E8ED;color:#99c9fa" cols="30" rows="5"></textarea>
                </span>
              </li>
            <!-- </div> -->
          </ul>
        </div>
        <div class="clItem cli2">
          <div class="btnContainer">
            <button class="btnReset tryBtn" @click="refuseApproveDeploy"><i class="el-icon-refresh"></i> 拒绝</button>
            <button class="btnSearch searchBtn" @click="passApproveDeploy"><img style="width: 12px;height: 12px" src="../../assets/images/carJudged/sub-icon.png" alt=""> 通过</button>
          </div>
        </div>
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
  //日期选择
  import vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/mapFun.js'

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
        deployObj: '',
        reData: 0,
        reData2: 0,
        reason: ''
      }
    },
    mixins: [vehicle, mapFun],
    methods: {

      //通过审批
      passApproveDeploy() {
        this.$http({
          url: 'tvas/disposition/approval',
          method: 'post',
          params: {
            bukongId: this.deployObj.bukongId,
            approvalStatus: 2,
            approvalOpinion: this.reason
          }
        }).then((res) => {
          console.log(res)
          this.reData = res.data.code
          // this.openDialog();
          if (res.statusText == 'OK' && res.data.code === 200) {
            let btnSearch = document.getElementsByClassName("btnSearch")[0]
            let btnReset = document.getElementsByClassName("btnReset")[0]
            btnSearch.disabled = "disabled"
            btnReset.disabled = "disabled"
            btnSearch.style.backgroundColor = "#acacac"
            btnReset.style.backgroundColor = "#acacac"
            let _this = this;
            this.$myconfirm({
              type: '消息提示',
              msg: '审批通过！',
              icon: 3,
              btn: {
                ok: '确定',
                no: '取消'
              }
            }).then(() => {
              _this.$router.push({path:"/carJudged/deployManage",query:{menuCode: '318',typeCode: "tab3" }});  //跳转到布控中

            })
            .catch(() => {
              console.log('no')
            })
            // layer.open({
            //   type: 0,
            //   icon:6,
            //   content: '审批通过！',
            //   title:"消息提示",
            //   yes:function(index){
            //     _this.$router.push({path:"/carJudged/deployManage",query:{menuCode: '318',typeCode: "tab3" }});  //跳转到布控中
            //     layer.close(index);
            //   }
            // });
            // this.$alert('审批通过', '消息提示', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //   this.$router.push({path:"/carJudged/deployManage",query:{menuCode: '318',typeCode: "tab3" }});  //跳转到布控中
            //   }
            // });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //拒绝审批
      refuseApproveDeploy() {
        this.$http({
          url: 'tvas/disposition/approval',
          method: 'post',
          params: {
            bukongId: this.deployObj.bukongId,
            approvalStatus: 3,
            approvalOpinion: this.reason
          }
        }).then((res) => {
          this.reData2 = res.data.code
          // this.openDialog2();
          if (res.statusText == 'OK' && res.data.code === 200) {
            let btnSearch = document.getElementsByClassName("btnSearch")[0]
            let btnReset = document.getElementsByClassName("btnReset")[0]
            btnSearch.disabled = "disabled"
            btnReset.disabled = "disabled"
            btnSearch.style.backgroundColor = "#acacac"
            btnReset.style.backgroundColor = "#acacac"
              this.$notify({
                        type: 'info',
                        message: '拒绝审批！',
                        position: 'bottom-right',
                        duration: 3000
                      });
            // layer.open({
            //   type: 0,
            //   icon:5,
            //   content: '拒绝审批！',
            //   title:"消息提示",
            //   yes:function(index){
            //     layer.close(index);
            //   }
            // });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getCaKouData() {
        this.$http({
            url: 'tvas/disposition/info/' + this.deployObj.bukongId,
            method: 'post'
          }
        ).then(res => {
          if (res.data.data.dispositionTollgates.length !== 0) {
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

      warnDialog() {
        //this.$confirm('当前布控没有卡口信息, 是否展示所有卡口信息?', '提示', {
        //  confirmButtonText: '确定',
        //  cancelButtonText: '取消',
        //  type: 'warning'
        //}).then(() => {
          this.$http({
            url: 'sms/apeTollgate/search',
            method: 'post'
          }).then(res => {
            let pointDataList = res.data.data
            if (pointDataList !== '') {
              for (let i = 0; i < pointDataList.length; i++) {
                let apeToll = pointDataList[i].apeTollgates;
                this.dataList = this.dataList.concat(apeToll)
              }
            }
            this.getNewpoints()
          })
      }
    },

    mounted() {
      this.getLocalCoordinate();
      this.loadMap();
    },
    created() {
      if (sessionStorage.getItem('approvalData')) {
        this.deployObj = JSON.parse(sessionStorage.getItem('approvalData'));
      }
      this.getCaKouData()
    }
  }
</script>


<style scoped>
  @import "../../assets/css/commom.css";
  @import "../../assets/css/carJudged_third.css";
  .approveDeploy .searchCondition li{
    color: #99c9fa;
  }
  .approveDeploy .searchCondition span:first-child{
    font-weight: bold;
    margin-right:0.1rem;
  }
  .approveDeploy .searchCondition span:last-child{
    width: 2.2rem;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
  }
  .approveDeploy .searchCondition li{
    margin-bottom: 10px;
  }
  .approveDeploy .cli2{
    height: auto;
  }
  .btnSearch {
    background-color: #409EFE;
    display: inline-block;
    border: none;
    margin-left: 0.35rem;
    width: 1.5rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 0.05rem;
    font-size: 0.16rem;
    cursor:pointer;
    color: white;
  }

  .btnReset {
    background-color: #E6A23D;
    display: inline-block;
    border: none;

    width: 1.5rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 0.05rem;
    font-size: 0.16rem;
    cursor:pointer;
    color: white;
  }
</style>

