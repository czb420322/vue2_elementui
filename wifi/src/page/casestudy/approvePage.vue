<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:07
 * @LastEditTime : 2020-07-08 11:40:59
 * @LastEditors  : chenxf
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\approvePage.vue
 * @
 -->
<template>
  <!--查看页面-->
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <router-link class="nav-item nav-item-second" tag="div" :to="{path:'/casestudy/cascadeApprove',query:{menuCode:200}}">串并案审批</router-link>
      <div class="nav-item nav-item-search">审批</div>
    </div> -->

    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <router-link class="sysname" tag="div" :to="{path:'/casestudy/cascadeApprove',query:{menuCode:211}}">&nbsp;串并案审批 ></router-link>
        <p class="sysname">&nbsp;审批</p>
    </div>
    <div class="contentBody">
      <div class="content">
        <div class="top">
          <div class="topTitle">
            <div class="titleLine"></div>
            <div>串并案审批</div>
          </div>
          <div class="topContent">
            <ul class="caseDetial">
              <li>
                <span style="width: 70px">串并案名称:</span> <input readonly="readonly" type="text" style="width: calc(100% - 70px);" :placeholder="lookCaseObj.caseName">
              </li>
              <li style="display: flex">
                <div style="width:40%;"><span>串并案状态:</span>
                  <span v-if="lookCaseObj.comboState==0">&nbsp;并案</span>
                  <span v-else-if="lookCaseObj.comboState==1">&nbsp;串案</span>
                  <span v-else></span>
                </div>
                <div style="width:60%;"><span>创建时间:&nbsp;&nbsp;</span><span v-text="lookCaseObj.createTime">&nbsp;&nbsp;2018-02-08  12:00:00</span></div>
              </li>
              <li>
                <div style="width:40%;"><span style="width: 55px">创&nbsp;建&nbsp;用&nbsp;户:&nbsp;&nbsp;</span><span v-text="lookCaseObj.creatorName">&nbsp;&nbsp;</span></div>
                <div style="width:60%;"><span >创建部门:&nbsp;&nbsp;</span><span  v-text="lookCaseObj.creatorOrgName">&nbsp;&nbsp;</span></div>
              </li>
              <li>
                <span style="width: 70px;margin-top: -0.3rem;">串并案描述:</span>
                &nbsp;<textarea readonly="readonly" name="" style="width:calc(100% - 70px);height: 0.5rem;;margin-left: -2px" :placeholder="lookCaseObj.description"></textarea>
              </li>

              <li class="Bigselect"><span style="width: 70px;">审&nbsp;批&nbsp;结&nbsp;果:</span>
                <!-- <select  style="width:calc(100% - 56px)"  v-model="approveStatus">
                  <option value="1" selected="selected">通过</option>
                  <option value="2">不通过</option>
                </select> -->
                <el-select v-model="approveStatus" placeholder="请选择审批结果">
                  <el-option value="1" label="通过"></el-option>
                  <el-option value="2" label="不通过"></el-option>
                </el-select>
              </li>
              <li>
                <span style="width: 70px;margin-top: -0.28rem;">审&nbsp;批&nbsp;意&nbsp;见:</span>
                <textarea style="width:calc(100% - 56px);height: 0.5rem;" maxlength="150" cols="30" rows="3" v-model="approveOpinion" placeholder="请输入审批意见"></textarea>
              </li>
              <li style="margin-top: 0">
                <div style=" visibility: hidden">返回上面:</div>
                <div class="saveEdit topBtn" @click="approveCase()" >确认审批</div>
                <div class="backBtn searchBtn" @click="goBack()">返回上一页</div>
              </li>
            </ul>
            <div id="mapContent"></div>
          </div>
        </div>
        <div class="bottom">
          <div class="topTitle">
            <div
              style="width: 2px; height:18px;background-color: #0a83f1; margin-top:2px;margin-left: 20px;margin-right: 10px"></div>
            <div>子案件列表</div>
          </div>
          <div class="bottomDetail">
            <div  v-for="(item,index) in historyCaseList" :key="index" class="detailItem">
              <div class="detailItemImg" @click="lookCase(item)">
                <img style="width: 100%;height: 100%" :src="item.caseImgUrl == null ? $store.state.defaultImg : item.caseImgUrl" :onerror="$store.state.defaultImg" alt="">
                <!-- <img style="width: 100%;height: 100%" :src="item.caseImgUrl" alt=""> -->
              </div>
              <div class="detailItemTxt">
                <div class="detailItemTxtTitle">案件名称: <span :title="item.caseName" v-text="item.caseName"></span></div>
                <div class="detailItemTxtItem">
                  <div class="detailItemTxtItemLeft">
                    <div>案件编号: <span v-text="item.caseLinkMark"></span></div>
                    <div>案发时间: <span v-text="item.timeLowLimit"></span></div>
                    <div class="detailItemTxtStatus">案件类型: <span v-text="item.caseCategoryDesc"></span></div>
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
                    <div class="detailItemTxtStatus"><span v-show="showCase == 2 || showCase == 1">审批状态: {{item.approvalStatus | caseApprove}}</span></div>
                  </div>
                </div>
                <div class="detailItemTxtDetial">
                  <span :title="item.caseAbstract">案件描述: {{item.caseAbstract}}</span>

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
    components: { Footer_case_look },
    data() {
      return {
        caseCombinationId: '',
        lookCaseObj:'',
        historyCaseList:[],
        getHotspotData:[],
        newpoints: [],
        approveStatus:'1',
        approveOpinion:"",
        loading: null,
        showCase:false
      }
    },
    mixins: [vehicle, mapFun],
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
    methods: {
      //获取串并案对象
      getCaseObj() {
        this.$http({
          url: 'pca/combo/myCombo/caseCombo',
          method: 'get',
          params: {
            caseCombinationId: this.caseCombinationId
          }
        }).then(res => {
          if(res.statusText=='OK' && res.data.code==200){
            this.lookCaseObj = res.data.data;
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
            this.historyCaseList=res.data.data;
            this.getNewpoints(res.data.data)
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
      //获取案件点位信息
      getHotspot(){
        this.$http({
          url:'pca/combo/myCombo/getHotspot',
          method:'get',
          params:{
            caseCombId:this.caseCombinationId
          }
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.getHotspotData=res.data.data;

          }else{
            this.$notify({
              type: 'error',
              message: '获取案件点位信息失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      goBack(){
        this.$router.push('/casestudy/cascadeApprove?menuCode=211')
      },
      getNewpoints(val) {
        if (val != null && val != 0) {
          for (let j = 0; j < val.length; j++) {
            if(val[j].longitude != null && val[j].longitude != 0){
              this.newpoints.push({longitude: val[j].longitude,latitude: val[j].latitude,caseName:val[j].caseName});
            }
          }
          this.initCasePoint()
        }
      },
      //地图点位
      initCasePoint() {
        let _this = this;
        let markers = [];
        let caseObj=_this.lookCaseObj;
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
          };//弹窗的内容
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
        }
        // //点位聚合对象
        // if (this.markerClusterer != null) {//判断markerClusterer对象是否存在
        //   this.markerClusterer.clearMarkers();
        //   this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers});//所有标注创建完以后建立点聚合
        // } else {
        //   this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: markers});//所有标注创建完以后建立点聚合
        //   console.log(this.markerClusterer)
        // }
      },
       approveCase(row,index){
         this.$myconfirm({
          type: '提示',
          msg: '如果串并的案件数据较多，上传时间会较长，是否提交审批？',
          icon: 2,
          btn: {
            ok: '确定',
            no: '取消'
          }
        }).then(() => {
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "正在审批中"
          });
          this.$http({
            url:'/pca/approve/approveComboCase/saveApprove',
            method:'get',
            params:{
              targetId:this.caseCombinationId,//目标编号 案事件uuid
              approveStatus:this.approveStatus, //审批状态  1通过 2不通过
              approveOpinion:this.approveOpinion,  //审批意见
            }
        }).then(res=>{
          this.loading.close();
          if(res.statusText==='OK'&& res.data.code===200){
             this.$notify({
                type: 'success',
                message: '审批成功！',
                position: 'bottom-right',
                duration: 3000
              });
              this.$router.push('/casestudy/cascadeApprove?menuCode=211')
          }else if(res.data.code == 100){
             this.$notify({
                type: 'warning',
                message: '审批失败！',
                position: 'bottom-right',
                duration: 3000
              });
            }else{
            this.$notify({
              type: 'error',
              message: '审批失败！',
              position: 'bottom-right',
              duration: 3000
            });

          }
        })
        })
        .catch(() => {

        })
      },
      // //确认审批
      // approveCase(row,index){
      //   this.$http({
      //     url:'pca/approve/approveComboCase/saveApprove',
      //     method:'get',
      //     params:{
      //       targetId:this.caseCombinationId,//目标编号 案事件uuid
      //       approveStatus:this.approveStatus, //审批状态  1通过 2不通过
      //       approveOpinion:this.approveOpinion,  //审批意见
      //     }
      //   }).then(res=>{
      //     if(res.statusText==='OK'&& res.data.code===200){
      //        this.$notify({
      //           type: 'success',
      //           message: '审批成功！',
      //           position: 'bottom-right',
      //           duration: 3000
      //         });
      //         this.$router.push('/casestudy/cascadeApprove?menuCode=211')
      //       // this.$myconfirm({
      //       //   type: '提示',
      //       //   msg: '审批成功！',
      //       //   icon: 1,
      //       //   btn: {
      //       //     ok: '确定',
      //       //     no: '取消'
      //       //   }
      //       // }).then(()=>{
      //       //   this.$router.push('/casestudy/cascadeApprove?menuCode=211')
      //       // })
      //     }else{
      //       this.$notify({
      //         type: 'error',
      //         message: '审批失败！',
      //         position: 'bottom-right',
      //         duration: 3000
      //       });
      //       // this.$myconfirm({
      //       //   type: '提示',
      //       //   msg: '审批失败！',
      //       //   icon: 1,
      //       //   btn: {
      //       //     ok: '确定',
      //       //     no: '取消'
      //       //   }
      //       // })
      //       // layer.alert('审批失败！',{icon:6,title:"消息提示"});
      //     }
      //   }).catch( res=>{
      //     // console.log(res)
      //   })
      // },
      //跳转查看案件
      lookCase(obj) {
        let routeData = this.$router.resolve({ path: '/casestudy/casePicture_look', query: { caseUuid: obj.caseUuid ,menuCode: 200}});
        window.open(routeData.href, '_blank');
      }
    },
    created() {
      this.caseCombinationId = this.$route.query.caseCombinationId;
      this.showCase = sessionStorage.getItem('caseVideoLibraryFlag')
    },
    mounted: function () {
      let _this = this;
      _this.loadCaseMap();
      _this.getCaseObj();
      _this.getCaseInfo();
      // _this.getHotspot();
    }

  }
</script>

<style scoped>

  @import '../../assets/css/case_common.css';
  @import "../../assets/css/commom.css";
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder{
      color:#99c9fa;
    }
    .el-select >>> .el-input__inner{
      height: 0.3rem;
      font-size: 0.12rem;
    }
    .detailItemTxtDetial{
      height: 0.22rem;
    }
    .detailItemTxtDetial span{
      width: 2.7rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  .detailItemTxtStatus{
    width: 100%;
    float: left;
  }
  .detailItemTxtTitle span{
    width: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

