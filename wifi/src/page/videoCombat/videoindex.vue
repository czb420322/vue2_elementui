<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:03
 * @LastEditTime : 2020-11-18 15:31:39
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\videoCombat\videoindex.vue
 -->
<template>
  <div class="manage">
    <!-- <search-module moduleName="视频侦查页面" /> -->
    <keep-alive>
      <div class="manageConten">
        <div v-for="(item,index) in titleList" :key="index">
          <p class="sysmanage messageNotic">
            <span class="line"></span>
            <span class="text" v-text="item.name"></span>
          </p>
          <ul class="syslist">
            <!-- <router-link tag="li" @click.native.stop="downexe(child)" v-for="(child,i) in item.mlist" :key="i " class="item"
                        :to="{path:cssobj[child.menuCode][1],query:{menuCode:child.menuCode}}"
                        :class="cssobj[child.menuCode][0]">
            </router-link>-->
            <li
              @click="downexe(child)"
              v-for="(child,i) in item.mlist"
              :key="i "
              class="item"
              :class="cssobj[child.menuCode][0]"
            ></li>
          </ul>
          <!-- <keep-alive/> -->
        </div>
      </div>
    </keep-alive>
    <footerSecond/>
  </div>
</template>

<script>
import footerSecond from "../../components/footer_second";
import searchModule from "../../components/search_module";
export default {
  data() {
    return {
      titleList: [],
      searchList: [],
      analyzeList: [],
      deployList: [],
      coutList: [],
      cssobj: {
        101: ["realvideo", "/videoCombat/realvideo"], //实时视频
        102: ["historyvideo", "/videoCombat/historyvideo"], //历史回放
        // 103: ['videomonitor', "/videoCombat/videomonitor"],  //结构化实时监测
        // 110: ['semantic', '/videoCombat/semantic'],   //语义查询
        // 111: ['searchImg', '/videoCombat/searchImg'],   //以图搜图
        // 120: ['mycase','/casestudy/myupload?isvideoCom=true'],  //我的案事件

        // 120: ['mycase','/casestudy/caseInfomanage?ismyupload=true'],  //我的案事件
        120: [
          "mycase",
          "/videoCombat/caseInfomanage?ismyupload=true&synergy=-1"
        ], //我的案事件
        103: ["videomonitor", ""], //结构化实时监测
        110: ["semantic", ""], //语义查询
        111: ["searchImg", ""], //以图搜图
        112: ["lable", "/videoCombat/commTolable"], //标注池

        105: ["videoplay", "/videoCombat/videoplay"], //视频播放
        106: ["targetarck", ""], //目标轨迹标识
        107: ["opration", ""], //模糊图像处理
        108: ["taskMan", "/videoCombat/taskMan"], //任务管理
        109: ["datacollection", "/videoCombat/datacollection"], //数据采集

        113: ["solo", "/videoCombat/soloscout"], //单人作战
        114: ["two", "/videoCombat/twoscout"], //协同作战
        115: ["vtrack", ""], //视频转码
        121: ["specail", "/videoCombat/special"],
        123: ["myCaseSyn", ""], //我的协同
        124: ["myCasCade", "/videoCombat/myCasCade"], //我的串并案
        122: ["faceManage", "/videoCombat/faceManage"], //人像库管理
        125: ["manFace", "/videoCombat/personFace"], // 人脸1V1
        126: ["Facesapcing", ""] // 人脸1V1
      },
      loading: null
    };
  },

  mounted() {
    this.getMenuList();
  },
  components: {
    searchModule,
    footerSecond
  },
  methods: {
    getMenuList() {
      let menuCode = this.$route.query["menuCode"];
      let userId = this.$storage.getSession("userInfo").userName;
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      this.$http({
        url: "sms/menu/secondChildMenu",
        method: "post",
        params: {
          parentId: menuCode,
          currentUser: userId
        }
      }).then(res => {
        this.loading.close();
        if (res.statusText == "OK" && res.data.code == 200) {
          this.titleList = res.data.data;
        } else if (res.data.code == 100) {
          this.$router.push("/login");
        } else {
          // layer.alert(res.data.message,{icon:5,title:"消息提示"});
          this.$router.push("/login");
        }
      });
    },
    downexe(val) {
      // 杀进程
      if (val.menuCode == 101 || val.menuCode == 102) {
        let g_http = null;
        g_http = document.createElement("script");
        g_http.src =
          " http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindowstrus&req=00000000-0000-0000-0000-000000000002&iskill=1";
        document.body.appendChild(g_http);
      }
      if (val.menuCode == 106) {
        OnInit4();
        setTimeout(() => {
          if (sessionStorage.getItem("lable1") == 2) {
            this.$myconfirm({
              type: "提示",
              msg: "是否下载目标轨迹标识",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            }).then(() => {
              var link = $(
                '<a href="/static/Videtek_ObjectTracker.exe" target="_blank"></a>'
              );
              link.get(0).click();
            });
          }
        }, 1000);
        return;
      }
      if (val.menuCode == 107) {
        OnInit3();
        setTimeout(() => {
          if (sessionStorage.getItem("lable") == 1) {
            this.$myconfirm({
              type: "提示",
              msg: "是否下载视频模糊图像处理",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            })
              .then(() => {
                var link = $(
                  '<a href="/static/dimImg_deisponse.exe" target="_blank"></a>'
                );
                link.get(0).click();
                // window.open = window.origin + '/static/dimImg_deisponse.exe'
              })
              .catch(() => {});
          }
        }, 1000);
        return;
      }
      if (val.menuCode == 115) {
        OnInit5();
        setTimeout(() => {
          if (sessionStorage.getItem("lable2") == 2) {
            this.$myconfirm({
              type: "提示",
              msg: "是否下载视频转码",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            })
              .then(() => {
                var link = $(
                  '<a href="/static/RecordConvertor.exe" target="_blank"></a>'
                );
                link.get(0).click();
                // window.open = window.origin + '/static/dimImg_deisponse.exe'
              })
              .catch(() => {});
          }
        }, 1000);
        return;
      }
      if (val.menuCode == 126) {
        OnInit6();
        setTimeout(() => {
          if (sessionStorage.getItem("lable3") == 2) {
            this.$myconfirm({
              type: "提示",
              msg: "是否下载人脸超分",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            })
              .then(() => {
                var link = $('<a href="/static/FFSS.exe" target="_blank"></a>');
                link.get(0).click();
                // window.open = window.origin + '/static/dimImg_deisponse.exe'
              })
              .catch(() => {
                console.log("no");
              });
          }
        }, 1000);
        return;
      }

      this.$router.push({
        path: this.cssobj[val.menuCode][1],
        query: { menuCode: val.menuCode }
      });
    }
  }
};
</script>


<style  scoped>
@import "../../assets/css/nav_page_second.css";

/* 我的协同 */
.myCaseSyn {
  background: url("../../assets/images/videoNewImg/videoImg/myCaseSynnormal.png")
    no-repeat center / 90% 90%;
}
.myCaseSyn:hover {
  background: url("../../assets/images/videoNewImg/videoImg/myCaseSynhover.png")
    no-repeat center / 100% 100%;
}

/* 人像库管理 */
.faceManage {
  background: url("../../assets/images/videoNewImg/videoImg/faceManage.png")
    no-repeat center / 90% 90%;
}
.faceManage:hover {
  background: url("../../assets/images/videoNewImg/videoImg/faceManageHover.png")
    no-repeat center / 100% 100%;
}

/* 我的串并案 */
.myCasCade {
  background: url("../../assets/case/casestudy/myCasCadenormal.png") no-repeat
    center / 90% 90%;
}
.myCasCade:hover {
  background: url("../../assets/case/casestudy/myCasCadehover.png") no-repeat
    center / 100% 100%;
}

/* 实时回放 */
.realvideo {
  background: url("../../assets/images/videoNewImg/videoImg/nownormal.png")
    no-repeat center / 90% 90%;
}
.realvideo:hover {
  background: url("../../assets/images/videoNewImg/videoImg/nowhover.png")
    no-repeat center / 100% 100%;
}
/* 历史回放 */
.historyvideo {
  background: url("../../assets/images/videoNewImg/videoImg/hisnormal.png")
    no-repeat center / 90% 90%;
}
.historyvideo:hover {
  background: url("../../assets/images/videoNewImg/videoImg/hishover.png")
    no-repeat center / 100% 100%;
}
/* 标注池 */
.lable {
  background: url("../../assets/images/videoNewImg/videoImg/lablenormal.png")
    no-repeat center / 90% 90%;
}
.lable:hover {
  background: url("../../assets/images/videoNewImg/videoImg/lablehover.png")
    no-repeat center / 100% 100%;
}
/* 视频转码 */
.vtrack {
  background: url("../../assets/images/videoNewImg/videoImg/vtrannormal.png")
    no-repeat center / 90% 90%;
}
.vtrack:hover {
  background: url("../../assets/images/videoNewImg/videoImg/vtranhover.png")
    no-repeat center / 100% 100%;
}
/* 急速作战 */
.videoplay {
  background: url("../../assets/images/videoNewImg/videoImg/fastnormal.png")
    no-repeat center / 90% 90%;
}
.videoplay:hover {
  background: url("../../assets/images/videoNewImg/videoImg/fasthover.png")
    no-repeat center / 100% 100%;
}
/* 目标轨迹 */
.targetarck {
  background: url("../../assets/images/videoNewImg/videoImg/tracknormal.png")
    no-repeat center / 90% 90%;
}
.targetarck:hover {
  background: url("../../assets/images/videoNewImg/videoImg/trackhover.png")
    no-repeat center / 100% 100%;
}
/* 模糊图像处理 */
.opration {
  background: url("../../assets/images/videoNewImg/videoImg/vmnormal.png")
    no-repeat center / 90% 90%;
}
.opration:hover {
  background: url("../../assets/images/videoNewImg/videoImg/vmhover.png")
    no-repeat center / 100% 100%;
}
/* 任务管理 */
.taskMan {
  background: url("../../assets/realpaly/taskman.png");
}

/* 我的案事件 */
.mycase {
  background: url("../../assets/case/casestudy/myuploadnormal1.png") no-repeat
    center / 90% 90%;
}
.mycase:hover {
  background: url("../../assets/case/casestudy/myuploadhover1.png") no-repeat
    center / 100% 100%;
}

.specail {
  background: url("../../assets/images/videoNewImg/videoImg/specail.png")
    no-repeat center / 90% 90%;
}
.specail:hover {
  background: url("../../assets/images/videoNewImg/videoImg/specailhover.png")
    no-repeat center / 100% 100%;
}

/* 数据采集 */
.datacollection {
  background: url("../../assets/images/videoNewImg/videoImg/datanormal.png")
    no-repeat center / 90% 90%;
}
.datacollection:hover {
  background: url("../../assets/images/videoNewImg/videoImg/datahover.png")
    no-repeat center / 100% 100%;
}
/* 单人作战 */
.solo {
  background: url("../../assets/images/videoNewImg/videoImg/solonormal.png")
    no-repeat center / 90% 90%;
}
.solo:hover {
  background: url("../../assets/images/videoNewImg/videoImg/solohover.png")
    no-repeat center / 100% 100%;
}
/* 多人协同 */
.two {
  background: url("../../assets/images/videoNewImg/videoImg/twonormal.png")
    no-repeat center / 90% 90%;
}
.two:hover {
  background: url("../../assets/images/videoNewImg/videoImg/twohover.png")
    no-repeat center / 100% 100%;
}

.manFace {
  background: url("../../assets/images/videoNewImg/videoImg/manfacenormal.png")
    no-repeat center / 90% 90%;
}
.manFace:hover {
  background: url("../../assets/images/videoNewImg/videoImg/manfacehover.png")
    no-repeat center / 100% 100%;
}
.Facesapcing {
  background: url("../../assets/images/videoNewImg/videoImg/Facesapcingnormal.png")
    no-repeat center / 90% 90%;
}
.Facesapcing:hover {
  background: url("../../assets/images/videoNewImg/videoImg/Facesapcinghover.png")
    no-repeat center / 100% 100%;
}
</style>
