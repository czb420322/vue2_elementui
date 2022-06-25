<template>
  <div class="manage">
    <!-- <search-vehicle moduleName="车辆研判页面"/> -->
    <keep-alive>
    <div class="manageConten">
      <div v-for="(item,index) in titleList" :key="index">
        <p class="sysmanage messageNotic">
          <span class="line"></span>
          <span class="text" v-text="item.name"></span>
        </p>
        <ul class="syslist">
          <router-link tag="li" v-for="(child,i) in item.mlist" :key="i" class="item"
            :to="{path:cssobj[child.menuCode][1],query:{menuCode:child.menuCode}}"
            :class="cssobj[child.menuCode][0]"
          >
          </router-link>
        </ul>
      </div>
    </div>
    </keep-alive>
    <footer-second></footer-second>
  </div>
</template>

<script>

  import footerSecond from '../../components/footer_second'
  import searchVehicle from '../../components/search_vehicle'

  export default {
    components: {
      searchVehicle,footerSecond
    },
    data() {
      return {
        titleList: [],
        searchList: [],
        analyzeList: [],
        deployList: [],
        coutList: [],
        cssobj: {
          301: ['carTypeSearch', "/carJudged/carTypeSearch"],
          302: ['categorySearch', "/carJudged/categorySearch"],
          303: ['plateSearch', "/carJudged/carPlateSearch"],
          304: ['synSearch', "/carJudged/synSearchCar"],
          305: ['imgSearch', "/carJudged/imgSearchCar"],
          306: ['moniteSearch', '/carJudged/monitCar'],
          362: ['motorcycle', '/carJudged/Motorcycle'],
          363: ['faceSearch', '/carJudged/faceSearch'],
          307: ['offineSearch', ''],//离线分析暂时不做
          308: ['firstToCity', '/carJudged/firstToCity'],
          309: ['footBold', '/carJudged/foothold'],
          310: ['plateOverMuch', '/carJudged/plateOverMuch'],
          311: ['similarPlate', '/carJudged/similarPlate'],
          312: ['oftenPass', '/carJudged/oftenPass'],
          313: ['trackBack', '/carJudged/trackBack'],
          314: ['drivingTogether', '/carJudged/drivingTogether'],
          315: ['hideByDay', '/carJudged/hideByDay'],
          316: ['areaCrash', '/carJudged/areaCrash'],
          317: ['deployApply', '/carJudged/deployApply'],
          318: ['deployManage', '/carJudged/deployManage'],
          319: ['currentDeploy', '/carJudged/currentDeploy'],
          320: ['trafficStatistics', '/carJudged/trafficStatistics'],
          321: ['carCount', '/carJudged/carCount'],
          322: ['countDeploy', ''],//布控数量统计暂时不做
        },
        loading: null
      }
    },
    created() {
      this.getMenuList();
    },
    methods: {
      getMenuList() {
        let menuCode = this.$route.query['menuCode'];
        let userId = this.$storage.getSession('userInfo').userName
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url: 'sms/menu/secondChildMenu',
          method: "post",
          params: {
            parentId: menuCode,
            currentUser:userId
          }
        }).then(res => {
          this.loading.close();
          if(res.statusText=='OK' && res.data.code==200 ){
            this.titleList = res.data.data;
          }else if(res.data.code == 100){
            this.$router.push("/login");
          }else{
            // layer.alert(res.data.message,{icon:5,title:"消息提示"});
            this.$router.push("/login");
          }
        })
      }

    }
  }
</script>
<style scoped>
  @import "../../assets/css/nav_page_second.css";
  .manage{
    height: 9rem;
    overflow: auto;
  }

  /* 车型搜车 */
  .carTypeSearch {
    background: url("../../assets/images/carJudged/carJudged/typeSearch.png") no-repeat center / 90% 90%;
  }
  .carTypeSearch:hover {
    background: url("../../assets/images/carJudged/carJudged/typeSearchhover.png") no-repeat center /100% 100%;
  }

  /* .categorySearch {
    width: 1.5rem;
    background-image: url("../../assets/images/carJudged/categorySearch.png")
  }
  .plateSearch {
    width: 1.5rem;
    background-image: url("../../assets/images/carJudged/plateSearch.png")
  } */
  /* 按类别搜车 */
  .categorySearch {
    background: url("../../assets/images/carJudged/carJudged/categorySearch.png") no-repeat center / 90% 90%;
  }
  .categorySearch:hover {
    background: url("../../assets/images/carJudged/carJudged/categorySearchhover.png") no-repeat center /100% 100%;
  }
  /* 按车牌搜车 */
  .plateSearch {
    background: url("../../assets/images/carJudged/carJudged/plateSearch.png") no-repeat center / 90% 90%;
  }
  .plateSearch:hover {
    background: url("../../assets/images/carJudged/carJudged/plateSearchhover.png") no-repeat center /100% 100%;
  }


  /* 综合搜车 */
  .synSearch {
    background: url("../../assets/images/carJudged/carJudged/synSearch.png") no-repeat center / 90% 90%;
  }
  .synSearch:hover {
    background: url("../../assets/images/carJudged/carJudged/synSearchhover.png") no-repeat center /100% 100%;
  }
  /* 以图搜车 */
  .imgSearch {
    background: url("../../assets/images/carJudged/carJudged/imgSearch.png") no-repeat center / 90% 90%;
  }
  .imgSearch:hover {
    background: url("../../assets/images/carJudged/carJudged/imgSearchhover.png") no-repeat center /100% 100%;
  }
  /* 人脸搜车 */
  .faceSearch {
    background: url("../../assets/images/carJudged/carJudged/faceSearch.png") no-repeat center / 90% 90%;
  }
  .faceSearch:hover {
    background: url("../../assets/images/carJudged/carJudged/faceSearchhover.png") no-repeat center /100% 100%;
  }
  /* 车辆实时监测 */
  .moniteSearch {
    background: url("../../assets/images/carJudged/carJudged/moniteSearch.png") no-repeat center / 90% 90%;
  }
  .moniteSearch:hover {
    background: url("../../assets/images/carJudged/carJudged/moniteSearchhover.png") no-repeat center /100% 100%;
  }
  /* 非机动车搜车 */
  .motorcycle {
    background: url("../../assets/images/carJudged/carJudged/motorcycle.png") no-repeat center / 90% 90%;
  }
  .motorcycle:hover {
    background: url("../../assets/images/carJudged/carJudged/motorcyclehover.png") no-repeat center /100% 100%;
  }
  /* 离线分析 */
  .offineSearch {
    background: url("../../assets/images/carJudged/carJudged/offineSearch.png") no-repeat center / 90% 90%;
  }
  .offineSearch:hover {
    background: url("../../assets/images/carJudged/carJudged/offineSearchhover.png") no-repeat center /100% 100%;
  }


  /* .offineSearch {
    background-image: url("../../assets/images/carJudged/offlineCar.png")
  } */

  /* 初次入城 */
  .firstToCity {
    background: url("../../assets/images/carJudged/carJudged/firstToCity.png") no-repeat center / 90% 90%;
  }
  .firstToCity:hover {
    background: url("../../assets/images/carJudged/carJudged/firstToCityhover.png") no-repeat center /100% 100%;
  }
  /* 落脚点分析 */
  .footBold {
    background: url("../../assets/images/carJudged/carJudged/footBold.png") no-repeat center / 90% 90%;
  }
  .footBold:hover {
    background: url("../../assets/images/carJudged/carJudged/footBoldhover.png") no-repeat center /100% 100%;
  }
  /* 一排多车  */
  .plateOverMuch {
    background: url("../../assets/images/carJudged/carJudged/plateOverMuch.png") no-repeat center / 90% 90%;
  }
  .plateOverMuch:hover {
    background: url("../../assets/images/carJudged/carJudged/plateOverMuchhover.png") no-repeat center /100% 100%;
  }
  /* 相似车牌 */
  .similarPlate {
    background: url("../../assets/images/carJudged/carJudged/similarPlate.png") no-repeat center / 90% 90%;
  }
  .similarPlate:hover {
    background: url("../../assets/images/carJudged/carJudged/similarPlatehover.png") no-repeat center /100% 100%;
  }

  /* 频繁过车 */
  .oftenPass {
    background: url("../../assets/images/carJudged/carJudged/oftenPass.png") no-repeat center / 90% 90%;
  }
  .oftenPass:hover {
    background: url("../../assets/images/carJudged/carJudged/oftenPasshover.png") no-repeat center /100% 100%;
  }
  /* 轨迹重现 */
  .trackBack {
    background: url("../../assets/images/carJudged/carJudged/trackBack.png") no-repeat center / 90% 90%;
  }
  .trackBack:hover {
    background: url("../../assets/images/carJudged/carJudged/trackBackhover.png") no-repeat center /100% 100%;
  }
  /* 同行车分析 */
  .drivingTogether {
    background: url("../../assets/images/carJudged/carJudged/drivingTogether.png") no-repeat center / 90% 90%;
  }
  .drivingTogether:hover {
    background: url("../../assets/images/carJudged/carJudged/drivingTogetherhover.png") no-repeat center /100% 100%;
  }
  /* 昼夜浮出 */
  .hideByDay {
    background: url("../../assets/images/carJudged/carJudged/hideByDay.png") no-repeat center / 90% 90%;
  }
  .hideByDay:hover {
    background: url("../../assets/images/carJudged/carJudged/typemirninghover.png") no-repeat center /100% 100%;
  }
  /* 多区域碰撞 */
  .areaCrash {
    background: url("../../assets/images/carJudged/carJudged/areaCrash.png") no-repeat center / 90% 90%;
  }
  .areaCrash:hover {
    background: url("../../assets/images/carJudged/carJudged/areaCrashhover.png") no-repeat center /100% 100%;
  }
  /* 布控申请 */
  .deployApply {
    background: url("../../assets/images/carJudged/carJudged/deployApply.png") no-repeat center / 90% 90%;
  }
  .deployApply:hover {
    background: url("../../assets/images/carJudged/carJudged/deployApplyhover.png") no-repeat center /100% 100%;
  }
  /* 布控管理 */
   .deployManage {
    background: url("../../assets/images/carJudged/carJudged/deployManage.png") no-repeat center / 90% 90%;
  }
  .deployManage:hover {
    background: url("../../assets/images/carJudged/carJudged/deployManagehover.png") no-repeat center /100% 100%;
  }
  /* 实时展示 */
   .currentDeploy {
    background: url("../../assets/images/carJudged/carJudged/currentDeploy.png") no-repeat center / 90% 90%;
  }
  .currentDeploy:hover {
    background: url("../../assets/images/carJudged/carJudged/currentDeployhover.png") no-repeat center /100% 100%;
  }
  /* 车流量统计 */
  .trafficStatistics {
    background: url("../../assets/images/carJudged/carJudged/trafficStatistics.png") no-repeat center / 90% 90%;
  }
  .trafficStatistics:hover {
    background: url("../../assets/images/carJudged/carJudged/trafficStatisticshover.png") no-repeat center /100% 100%;
  }
  /* 车辆树形统计 */
  .carCount {
    background: url("../../assets/images/carJudged/carJudged/carCount.png") no-repeat center / 90% 90%;
  }
  .carCount:hover {
    background: url("../../assets/images/carJudged/carJudged/carCounthover.png") no-repeat center /100% 100%;
  }
  .countDeploy {
    width: 1.5rem;
    background-image: url("../../assets/images/carJudged/countDeploy.png")
  }

</style>
