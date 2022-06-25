<template>
  <!--查看页面-->
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag='div' :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <router-link class="nav-item nav-item-second" tag='div' :to="{path:'/casestudy/myCasCade',query:{menuCode:200}}">我的串并案</router-link>
      <div class="nav-item nav-item-search">查看</div>
    </div> -->
    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" v-show="!videoCombat" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <router-link class="sysname" v-show="videoCombat" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查> </router-link>
        <router-link class="sysname" v-show="!videoCombat" tag='div' :to="{path:'/casestudy/myCaseCade',query:{menuCode:209}}">&nbsp;我的串并案 ></router-link>
        <router-link class="sysname" v-show="videoCombat" tag='div' :to="{path:'/videoCombat/myCasCade',query:{menuCode:124}}">&nbsp;我的串并案 ></router-link>
        <p class="sysname">&nbsp;查看</p>
    </div>

    <div class="contentBody">
      <div class="content">
        <div class="top">
          <div class="topTitle">
            <div class="titleLine"></div>
            <div>并案查看</div>
          </div>
          <div class="topContent">
            <ul class="caseDetial">
              <li>
                <span style="width: 70px">串并案名称:</span> <input readonly="readonly" type="text" style="width: calc(100% - 56px);" :placeholder="lookCaseObj.caseName">
              </li>
              <li style="display: flex">
                <div style="width:40%;"><span>串并案状态:</span>
                  <span v-if="lookCaseObj.comboState==0">&nbsp;并案</span>
                  <span v-else-if="lookCaseObj.comboState==1">&nbsp;串案</span>
                  <span v-else>:&nbsp;</span>
                </div>
                <div style="width:60%;"><span>创建时间:&nbsp;&nbsp;</span><span v-text="lookCaseObj.createTime">&nbsp;&nbsp;2018-02-08  12:00:00</span></div>
              </li>
              <li>
                <div style="width:40%;"><span style="width: 68px;">创&nbsp;建&nbsp;用&nbsp;户:&nbsp;&nbsp;</span><span v-text="lookCaseObj.createUser">&nbsp;&nbsp;</span></div>
                <div style="width:60%;"><span >创建部门:&nbsp;&nbsp;</span><span  v-text="lookCaseObj.creatorOrg">&nbsp;&nbsp;</span></div>
              </li>
              <li>
                <span style="width: 70px;margin-top: -0.5rem;">串并案描述:</span>
                &nbsp;<textarea readonly="readonly" name="" style="width:calc(100% - 56px);height: 0.7rem;;margin-left: -2px" :placeholder="lookCaseObj.description"></textarea>
              </li>

              <li v-show="showCase == 2 || showCase == 1"><span style="width: 56px; padding-left:2px">审&nbsp;批&nbsp;状&nbsp;态:</span>
                <span v-if="lookCaseObj.caseState==0">&nbsp;&nbsp;&nbsp;新建</span>
                <span v-if="lookCaseObj.caseState==1">&nbsp;&nbsp;&nbsp;审批中</span>
                <span v-if="lookCaseObj.caseState==2">&nbsp;&nbsp;&nbsp;审批通过</span>
                <span v-if="lookCaseObj.caseState==3">&nbsp;&nbsp;&nbsp;审批不通过</span>
                <span  v-else></span>
              </li>

              <li style="margin-top: 0">
                <div style=" visibility: hidden">返回上面&nbsp;:</div>
                <div class="backBtn searchBtn" @click="goBack">返回上一页</div>
              </li>
            </ul>

            <div class="content1">
              <div id="mapContent"></div>
                <img class="dingwei" src="../../assets/case/quickPos.png" @click="loadCaseMap();initCasePoint();" />
              </div>
          </div>
        </div>
        <div class="bottom">
          <div class="topTitle">
            <div
              style="width: 2px; height:18px;background-color: #0a83f1; margin-top:2px;margin-left: 20px;margin-right: 10px;"></div>
            <div>子案件列表</div>
          </div>
          <div class="bottomDetail">
            <div  v-for="(item,index) in historyCaseList" class="detailItem" :key="index">
              <div class="detailItemImg"  @click="lookCase(item)">
                <img style="width: 100%;height: 100%" :src="item.caseImgUrl == null ? $store.state.defaultImg : item.caseImgUrl" :onerror="$store.state.defaultImg" alt="">
              </div>
              <div class="detailItemTxt">
                <div class="detailItemTxtTitle" :title="item.caseName">案件名称:
                  <span v-text="item.caseName"></span>
                </div>
                <div class="detailItemTxtsort">
                  <div class="detailItemTxtItemLeft">
                    <div>案件编号: <span v-text="item.caseLinkMark"></span></div>
                    <div>案发时间: <span v-text="item.timeLowLimit"></span></div>
                    <div class="detailItemTxtStatus">案件类型: <span v-text="item.caseCategoryDesc">
                    </span>
                    </div>
                  </div>
                  <div class="detailItemTxtItemRight">
                    <div>案发区域: <span v-text="item.regionFullName"></span></div>
                    <div>案件状态:
                      <span v-if="item.state==0">事件</span>
                      <span v-else-if="item.state==1">已立案</span>
                      <span v-else-if="item.state==2">已侦破</span>
                      <span v-else-if="item.state==3">侦破待复核</span>
                      <span v-else-if="item.state==4">已结案</span>
                      <span v-else-if="item.state==5">结案待复核</span>
                      <span v-else-if="item.state==6">并案待复核</span>
                      <span v-else-if="item.state==7">撤案待复核</span>
                      <span v-else-if="item.state==8">结案归档</span>
                      <span v-else-if="item.state==9">并案归档</span>
                      <span v-else-if="item.state==10">撤案归档</span>
                      <span v-else></span></div>
                      <div class="detailItemTxtStatus">
                        <span v-show="showCase == 2 || showCase == 1">审批状态: {{item.approvalStatus | caseApprove}}</span>
                      </div>
                  </div>
                </div>
                <div class="detailItemTxtDetial detailTxt" :title="item.caseAbstract">
                  <span>案件描述: {{item.caseAbstract}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer_case_look></footer_case_look>
    </div>

  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import mapFun from '../../api/vehicle/caseMapFun.js'
  import Footer_case_look from "../../components/footer_case_look";

  export default {
    components: {Footer_case_look},
    data() {
      return {
        caseCombinationId: '',
        lookCaseObj:'',
        historyCaseList:[],
        getHotspotData:[],
        newpoints: [],
        videoCombat:false,
        showCase:false
      }
    },
    filters:{
      caseApprove(cellValue){
        if (cellValue == 0){
            return '新建';
        }else if (cellValue == 1){
            return '审批中';
        }else if (cellValue == 2){
            return '审批通过';
        }else if (cellValue == 3){
            return '审批不通过';
        }else if(cellValue == null){
          return ''
        }
      }
    },
    mixins: [vehicle, mapFun],
    methods: {
      getCaseObj() {
        this.$http({
          url: 'pca/combo/myCombo/caseCombo',
          method: 'get',
          params: {
            caseCombinationId: this.caseCombinationId
          }
        }).then(res => {
          if(res.statusText=='OK' && res.data.code==200){
            this.lookCaseObj=res.data.data
          }else{
             this.$notify({
              type: 'error',
              message: '获取串并案信息失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }

        })
      },
      //获取历史列表
      getCaseInfo(){
        this.$http({
          url:'pca/combo/myCombo/getCaseInfo',
          method:'get',
          params:{
            caseCombId:this.caseCombinationId
          }
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.historyCaseList = res.data.data;
            this.getHotspotData = res.data.data;
            this.getNewpoints();
          }else{
            this.$notify({
              type: 'error',
              message: '获取历史列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      goBack(){
        if(this.videoCombat){
          this.$router.push('/videoCombat/myCasCade?menuCode=124')
        }else{
          this.$router.push('/casestudy/myCaseCade?menuCode=209')
        }

      },

      getNewpoints() {
        let _this = this
        if (_this.getHotspotData !== null && _this.getHotspotData.length !== 0) {
          for (let j = 0; j < _this.getHotspotData.length; j++) {
            if(this.getHotspotData[j].longitude!= 0 && this.getHotspotData[j].longitude!= null){
               _this.newpoints.push({
                caseName: _this.getHotspotData[j].caseName,
                longitude: _this.getHotspotData[j].longitude,
                latitude: _this.getHotspotData[j].latitude
              });
            }

          }
          this.initCasePoint()
        }
      },
      //地图点位
      initCasePoint() {
        let _this = this;
        let caseObj = _this.lookCaseObj;
        console.log(caseObj);
        let markers = [];
        let carIco = require('@/assets/images/device/duang.png');
        for (let i = 0; i < _this.newpoints.length; i++) {
          let point = _this.newpoints[i];
          let point_marker = new BMap.Point(point['longitude'], point['latitude']);
          var myIcon = new BMap.Icon(carIco, new BMap.Size(35, 36), {});
          var marker = new BMap.Marker(point_marker, {offset: new BMap.Size(0, -20), icon: myIcon});
          //let marker = new BMap.Marker(point_marker);
          marker.disableMassClear();
          markers.push(marker);

          //弹窗对象
          let opts = {
            width: 60,
            height: 80,
            title: "串并案信息",
          };

          //弹窗的内容
          let content =
            `          <div style="display: flex;flex-direction: column">
                        <div title="${point.caseName}" style="height: 20px ;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"><span>案件名称：</span>${point.caseName}</div>
                         <div><span>经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span>${point.longitude}</div>
                         <div><span>纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span>${point.latitude}</div>
                      </div>`;
          let info_Window = new BMap.InfoWindow(content, opts);
          this.map.addOverlay(marker);
          marker.addEventListener("click", function () {
            this.openInfoWindow(info_Window);
          });
         //marker.openInfoWindow(info_Window);
        }

        //点位聚合对象
        // if (this.markerClusterer != null) {//判断markerClusterer对象是否存在
        //   this.markerClusterer.clearMarkers();
        //   this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers});//所有标注创建完以后建立点聚合
        // } else {
        //   this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers});//所有标注创建完以后建立点聚合
        // }
      },
      //跳转查看案件
      lookCase(obj) {
        if(this.videoCombat){
           let {href} = this.$router.resolve({path:'/videoCombat/casePicture_look?menuCode=100', query:{caseUuid:obj.caseUuid,seek:true}})
          window.open(href, '_blank')
          // let routeData = this.$router.resolve({ path: '/videoCombat/casePicture_look', query: { caseUuid: obj.caseUuid ,menuCode: 124}});
          // window.open(routeData.href, '_blank');
        }else{
          let routeData = this.$router.resolve({ path: '/casestudy/casePicture_look', query: { caseUuid: obj.caseUuid ,menuCode: 209}});
          window.open(routeData.href, '_blank');
        }

      }

    },
    created() {
      this.caseCombinationId = this.$route.query.caseCombinationId;
      this.videoCombat = this.$route.query.videoCombat
      this.showCase = sessionStorage.getItem('caseVideoLibraryFlag')
    },
    mounted: function () {
      let _this = this;
      _this.loadCaseMap();
      _this.getCaseObj()
      _this.getCaseInfo()
    }

  }
</script>


<style scoped>
  @import '../../assets/css/case_common.css';
  @import "../../assets/css/commom.css";
  .content1 {
      position: relative;
      width: calc(60% - 0.24rem);
      height: 100%;
      border: 1px solid #DEE1E8;
    }
    .dingwei{
      position: absolute;
      top: 210px;
      right: 38px;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder{
      color:#99c9fa;
    }
  .detailItemTxtDetial{
    height: 0.22rem;
    display: flex;
    justify-content: space-between;
    }
  .detailItemTxtDetial span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
    width: 2.7rem;
    display: inline-block;

  }
  .detailItemTxtStatus{
    width: 100%;
    float: left;
  }
 #mapContent >>> .BMap_bubble_title >>> .infos{
    height: 20px ;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detailItemTxt{
    font-size: 0.12rem;
  }
  .detailItemTxtsort{
    width: 100%;
    display: flex;
  }
  .detailTxt{
    margin: 0
  }
  .detailItemTxtTitle span{
    width: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

