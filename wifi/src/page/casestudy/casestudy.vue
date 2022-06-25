<template>
  <div class="manage">
    <!-- <searchCase_module moduleName=""/> -->
    <keep-alive>
    <div class="manageConten">
      <img class="ceshi" v-show="$store.state.ceshi1" src="../../assets/images/caseStydy/top.png" alt="">
      <div v-for="(item,index) in titleList" :key="index">
        <p class="sysmanage messageNotic">
          <span class="line"></span>
          <span class="text" v-text="item.name"></span>
        </p>
        <ul class="syslist">
          <router-link tag="li" v-for="(child,i) in item.mlist" :key="i" class="item"
                       :to="{path:cssobj[child.menuCode][1],query:{menuCode:child.menuCode}}"
                       :class="cssobj[child.menuCode]">
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
  import searchCase_module from '../../components/searchCase_module'
  export default {
    components: {
      searchCase_module,footerSecond
    },
    data() {
      return {
        titleList: [],
        searchList: [],
        analyzeList: [],
        deployList: [],
        coutList: [],
        cssobj: {
          202: ['caseInfomanage', "/casestudy/caseInfomanage?synergy=-1"],  //案事件信息管理
          203: ['myupload', "/casestudy/myupload"],
          204: ['mycollect', "/casestudy/mycollect"],
          205: ['mybrowse', "/casestudy/mybrowse"],
          222: ['mysynergy', "/casestudy/mysynergy"],
          // 222: ['mysynergy', ""],  //协同作战

          211: ['cascadeApprove', "/casestudy/cascadeApprove"],//串并案审批
          220: ['caseApprove', "/casestudy/caseApprove"],//案件审批
          221: ['caseMark', '/casestudy/caseMark'],//案件评分

          213: ['caseInfostat', 'casestudy/caseInfostat'],  //统计分析页面
          214: ['casetimestat', '/casestudy/casetimestat'],
          215: ['caseareastat', '/casestudy/caseareastat'],
          216: ['casesortstat', '/casestudy/casesortstat'],
          217: ['casetypestat', '/casestudy/casetypestat'],
          218: ['casevideostat', ''],

          207: ['caseRetrieval', '/casestudy/caseRetrieval'],//案事件检索
          208: ['case3DSearch', '/casestudy/case3DSearch'],//特征检索
          210: ['imgSearchCase',"/casestudy/imgSearchCase"],//以图搜案事件
          201: ['casePictureCombat', '/casestudy/casePictureCombat'],//挂图作战


          209: ['myCaseCade', '/casestudy/myCaseCade'],//我的串并案
          219: ['cascadeView', '/casestudy/cascadeView'],//串并案查看
          // 125: ['manFace','/casestudy/personFace'] ,//人脸1V1
        },
        loading: null
      }
    },
    created() {
      this.getMenuList();
      // this.$store._mutations.setToIndex({path:"/casestudy"})
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
            // setTimeout(() => {
            //   this.$store.state.ceshi1 = true
            //   this.$store.state.ceshi2 = true
            // }, 5000);
          }else if(res.data.code == 100){
            this.$router.push("/login");
          }else{
            this.$router.push("/login");
          }
        })
      }

    }
  }
</script>
<style scoped>
  @import "../../assets/css/nav_page_second.css";
  .ceshi{
    position: absolute;
    top: 62px;
    right: 134px;
  }
  .manage{
    height: 9rem;
    overflow: auto;
  }



  /* 案件信息管理 */
  .caseInfomanage {
    background: url("../../assets/case/casestudy/caseInfonormal.png") no-repeat center / 90% 90%;
  }
  .caseInfomanage:hover {
    background: url("../../assets/case/casestudy/caseInfohover.png") no-repeat center /100% 100%;
  }

  /* 我的协同 */
  .mysynergy{
     background: url("../../assets/case/casestudy/synergynormal.png") no-repeat center / 90% 90%;
  }
  .mysynergy:hover{
    background: url("../../assets/case/casestudy/synergyhover.png") no-repeat center /100% 100%;
  }
  /* 我的案事件 */
  .myupload {
    background: url("../../assets/case/casestudy/myuploadnormal.png") no-repeat center / 90% 90%;
  }
  .myupload:hover {
    background: url("../../assets/case/casestudy/myuploadhover.png") no-repeat center / 100% 100%;
  }
  /* 我的收藏
   */
  .mycollect {
    background: url("../../assets/case/casestudy/mycollectnormal.png") no-repeat center / 90% 90%;;
  }
  .mycollect:hover {
    background: url("../../assets/case/casestudy/mycollecthover.png") no-repeat center / 100% 100%;
  }
  /* 最近浏览 */
  .mybrowse {
    background: url("../../assets/case/casestudy/myseeknormal.png") no-repeat center / 90% 90%;
  }
  .mybrowse:hover {
    background: url("../../assets/case/casestudy/myseekhover.png") no-repeat center /100% 100%;
  }

  /* 案事件检索 */
  .caseRetrieval {
    background: url("../../assets/case/casestudy/caseonenormal.png") no-repeat center / 90% 90%;
  }
  .caseRetrieval:hover {
    background: url("../../assets/case/casestudy/caseonehover.png") no-repeat center / 100% 100%;
  }
  /* 特征检索 */
  .case3DSearch {
    background: url("../../assets/case/casestudy/casethreenormal.png") no-repeat center / 90% 90%;
  }
  .case3DSearch:hover {
    background: url("../../assets/case/casestudy/casethreehover.png") no-repeat center /100% 100%;
  }
  /* 以图搜案件 */
  .imgSearchCase {
    background: url("../../assets/case/casestudy/imgSearchCasen.png") no-repeat center / 90% 90%;
  }
  .imgSearchCase:hover {
    background: url("../../assets/case/casestudy/imgSearchCaseh.png") no-repeat center / 100% 100%;
  }
  /* 挂图作战 */
  .casePictureCombat {
    background: url("../../assets/case/casestudy/casefornormal.png") no-repeat center / 90% 90%;
  }
  .casePictureCombat:hover {
    background: url("../../assets/case/casestudy/caseforhover.png") no-repeat center /100% 100%;
  }
  /* 我的串并案 */
  .myCaseCade {
    background: url("../../assets/case/casestudy/myCasCadenormal.png") no-repeat center / 90% 90%;
  }
  .myCaseCade:hover {
    background: url("../../assets/case/casestudy/myCasCadehover.png") no-repeat center / 100% 100%;
  }

  /* 串并案查看 */
  .cascadeView {
    background: url("../../assets/case/casestudy/cascadeViewnormal.png") no-repeat center / 90% 90%;
  }
  .cascadeView:hover {
    background: url("../../assets/case/casestudy/cascadeViewhover.png") no-repeat center / 100% 100%;
  }

  /* 串并案审批 */
  .cascadeApprove {
    background: url("../../assets/case/casestudy/cascadeApproven.png") no-repeat center / 90% 90%;
  }
  .cascadeApprove:hover {
    background: url("../../assets/case/casestudy/cascadeApproveh.png") no-repeat center / 100% 100%;
  }
  /* 案件审批 */
  .caseApprove {
    background: url("../../assets/case/casestudy/caseApprovenormal.png") no-repeat center / 90% 90%;
  }
  .caseApprove:hover {
    background: url("../../assets/case/casestudy/caseApprovehover.png") no-repeat center /100% 100%;
  }
  /* 案件评分 */
  .caseMark {
    background: url("../../assets/case/casestudy/caseMarknormal.png") no-repeat center / 90% 90%;
  }
  .caseMark:hover {
    background: url("../../assets/case/casestudy/caseMarkhover.png") no-repeat center / 100% 100%;
  }

  /* 案件信息统计 */
  .caseInfostat {
    background: url("../../assets/case/casestudy/caseInfostatnormal.png") no-repeat center / 90% 90%;
  }
  .caseInfostat:hover {
    background: url("../../assets/case/casestudy/caseInfostathover.png") no-repeat center / 100% 100%;
  }
  /* 案发时段统计 */
  .casetimestat {
    background: url("../../assets/case/casestudy/casetimestatnormal.png") no-repeat center / 90% 90%;
  }
  .casetimestat:hover {
    background: url("../../assets/case/casestudy/casetimestathover.png") no-repeat center / 100% 100%;
  }
  /* 案发区域统计 */
  .caseareastat {
    background: url("../../assets/case/casestudy/caseareastatnormal.png") no-repeat center / 90% 90%;
  }
  .caseareastat:hover {
    background: url("../../assets/case/casestudy/caseareastathover.png") no-repeat center / 100% 100%;
  }
  /* 案发分类统计 */
  .casesortstat {
    background: url("../../assets/case/casestudy/casesortstatnormal.png") no-repeat center / 90% 90%;
  }
  .casesortstat:hover {
    background: url("../../assets/case/casestudy/casesortstathover.png") no-repeat center / 100% 100%;
  }
  /* 案发类别统计 */
  .casetypestat {
    background: url("../../assets/case/casestudy/casetypestatnormal.png") no-repeat center / 90% 90%;
  }
  .casetypestat:hover {
    background: url("../../assets/case/casestudy/casetypestathover.png") no-repeat center / 100% 100%
  }
  /* 案发部门统计 */
  .casevideostat {
    background: url("../../assets/case/casestudy/casevideostatnormal.png") no-repeat center / 90% 90%;
  }
  .casevideostat:hover {
    background: url("../../assets/case/casestudy/casevideostathover.png") no-repeat center / 100% 100%;
  }

</style>
