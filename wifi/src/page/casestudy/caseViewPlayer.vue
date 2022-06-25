<template>
  <!--视频播放页面-->
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        class="sysname"
        tag="div"
        v-if="showInfo"
        :to="{path:'/videoCombat',query:{menuCode:100}}"
      >视频侦查></router-link>
      <router-link
        class="sysname"
        tag="div"
        v-if="!showInfo"
        :to="{path:'/casestudy',query:{menuCode:200}}"
      >案件库 ></router-link>
      <router-link
        class="sysname"
        tag="div"
        :to="{path:'/videoCombat/myCasCade',query:{menuCode:124}}"
        v-if="myCombCase"
      >&nbsp;我的串并案 ></router-link>
      <router-link
        class="sysname"
        tag="div"
        :to="{path:'/casestudy/cascadeView',query:{menuCode:219}}"
        v-if="allCombCase"
      >&nbsp;并案查看 ></router-link>
      <router-link
        class="sysname"
        tag="div"
        :to="{path:'/casestudy/myCaseCade',query:{menuCode:209}}"
        v-if="myCaseCade"
      >&nbsp;我的串并案 ></router-link>
      <p class="sysname">&nbsp;播放</p>
    </div>

    <div class="contentBody">
      <div class="content">
        <div class="topTitle">
          <div class="titleLine"></div>
          <div>比对播放</div>
        </div>
        <div class="contentMain">
          <div class="contentLeft">
            <div style="margin-top: 20px; padding-left: 30px;">
              <img style="margin-right: 10px" src="../../assets/case/playeList-icon.png" alt>
              <span style="font-size: 14px;color: #429FFF">视频列表</span>
            </div>
            <div class="vedio">
              <el-tree
                v-if="videoList.length > 0"
                :data="videoList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                default-expand-all
                check-strictly
                highlight-current
              >
                <span class="span-ellipsis" slot-scope="{ node, data }">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
            </div>
          </div>
          <div class="contentRight">
            <div class="videoContainer">
              <div class="videoItemContent">
                <div class="videoItem" @click="changeItem($event)">
                  <video
                    disablePictureInPicture
                    loop
                    id="videoElement1"
                    class="videoElement"
                    controls="controls"
                  >Your browser is too old which doesn't support HTML5 video.</video>
                </div>
                <div class="videoItem" @click="changeItem($event)">
                  <video
                    disablePictureInPicture
                    loop
                    id="videoElement2"
                    class="videoElement"
                    controls="controls"
                  >Your browser is too old which doesn't support HTML5 video.</video>
                </div>
                <div class="videoItem" @click="changeItem($event)">
                  <video
                    disablePictureInPicture
                    loop
                    id="videoElement3"
                    class="videoElement"
                    controls="controls"
                  >Your browser is too old which doesn't support HTML5 video.</video>
                </div>
                <div class="videoItem" @click="changeItem($event)">
                  <video
                    disablePictureInPicture
                    loop
                    id="videoElement4"
                    class="videoElement"
                    controls="controls"
                  >Your browser is too old which doesn't support HTML5 video.</video>
                </div>
              </div>
            </div>
            <footer_case_look></footer_case_look>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flvjs from "flv.js";
import Footer_case_look from "../../components/footer_case_look";
import flvplay from "../../api/casestudy/flvPlay.js"; //播放器的flv的js
export default {
  components: { Footer_case_look },
  data() {
    return {
      caseCombId: "",
      videoList: [],
      videoUrl: "",
      videoElement: "",
      playFlag: true,
      defaultProps: {
        children: "children",
        label: "label"
      },
      myCombCase: false,
      allCombCase: false,
      showInfo: false,
      myCaseCade: false,
      loading: null
    };
  },
  mixins: [flvplay],
  methods: {
    handleNodeClick(data, node) {
      console.log(data, 8888);
      if (data.obj == undefined) {
        return;
      }
      let url = this.getUrl(data.obj.videoUrl);
      this.flv_load_mds(this.videoElement, url);
    },
    changeTreeListStyle() {
      let node = document.getElementsByClassName("el-tree-node__content");
      for (let i = 0; i < node.length; i++) {
        node[i].style.paddingLeft = "30px";
      }
    },

    //获取视频列表
    getVideoList() {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      this.$http({
        url: "pca/combo/myCombo/getAllVideo",
        method: "get",
        params: {
          caseCombId: this.caseCombId
        }
      }).then(res => {
        if (res.statusText === "OK" && res.data.code === 200) {
          this.loading.close();
          this.loading = null;
          let data = res.data.data;
          console.log(data, 99999999999);
          for (let i = 0; i < data.length; i++) {
            let arr = [];
            if (data[i].suspicionVideoList != null) {
              for (let j = 0; j < data[i].suspicionVideoList.length; j++) {
                let allarr = [];
                if (data[i].suspicionVideoList[j].videoMarkList != null) {
                  for (
                    let k = 0;
                    k < data[i].suspicionVideoList[j].videoMarkList.length;
                    k++
                  ) {
                    let markName =
                      data[i].suspicionVideoList[j].videoMarkList[k].markName;
                    allarr.push({
                      label: markName,
                      obj: data[i].suspicionVideoList[j].videoMarkList[k]
                    });
                  }
                }
                let susName = data[i].suspicionVideoList[j].suspicionName;
                arr.push({ label: susName, children: allarr });
              }
            }
            this.videoList.push({ label: data[i].caseName, children: arr });
          }
        }
      });
    },
    //选中播放器
    changeItem(event) {
      let Item = document.getElementsByClassName("videoElement");
      let itemContainer = document.getElementsByClassName("videoItem");
      let tabs = [
        "videoElement1",
        "videoElement2",
        "videoElement3",
        "videoElement4"
      ];
      for (let i = 0; i < Item.length; i++) {
        if (event.srcElement.isEqualNode(Item[i])) {
          itemContainer[i].style.border = "2px solid #0087fd";
          this.videoElement = tabs[i];
          /*            if(this.playFlag){
                          Item[i].play()
                          this.playFlag=false
                        }else{
                          Item[i].pause()
                          this.playFlag=true
                        }*/
        } else {
          itemContainer[i].style.border = "1px solid #c5b3b3";
        }
      }
    },
    goBack() {
      this.$router.push("/casestudy/myCasCade?menuCode=200");
    },
    filterNode(value, data, node) {}
  },
  created() {
    if (this.$route.path == "/videoCombat/caseViewPlayer") {
      this.showInfo = true;
    } else {
      false;
    }
    this.caseCombId = this.$route.query.caseCombinationId;
    this.myCombCase = this.$route.query.myCombCase;
    this.allCombCase = this.$route.query.allCombCase;
    this.myCaseCade = this.$route.query.myCaseCade; //我的串并案
    this.getVideoList();
  },
  mounted() {
    this.changeTreeListStyle();
    document.getElementById("videoElement1").click();
  }
};
</script>

<style scoped>
@import "../../assets/css/case_common.css";
@import "../../assets/css/commom.css";
.el-tree >>> .el-tree-node__label::before {
  display: block;
  content: "";
}
.el-tree
  >>> .el-tree-node__children
  > .el-tree-node
  > .el-tree-node__content
  > .el-tree-node__label::before {
  display: inline-block;
  /* margin-right: 7px; */
  /* content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAA+UlEQVQokbWPPU4CURSFv/czkAyBiQ0ORGNiZ4wLcA0WFgY6p7SksHMLLIDQQiXTmNhauQO3YCExYyCDZIA4LzwbxkJfMY0nucU9OV/uuaIzSl+AY/7qA7gCgjgKngtTdEapnb4nF7/T7bA5Ac631j5KISZxFNwBaOAT4CvPV0W45vv7wAxIBOzlxpx0x4sh0JOOKli7NYAXR0EihOh7WqfAEXCoXcB6vZkDre54cQs87aYCnDkBC3Y2T68b9dqlUupmZxsp5akTAFhm2dsyywbFrrWqHrTCB+cPLkkhFWBKAz/gvwMaaABUPM8vka9r4LUdNu9LHph+A9q2Q0DSk+vlAAAAAElFTkSuQmCC); */
}
.el-tree >>> .el-tree-node__content > .expanded::before {
  display: inline-block;
  /* content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADKSURBVDhPY/z//z8DCPw9lecGpIKA+CMQ/wOJ4QB8QHwPWWPXmXv/RUBsRjDCDn79ZfhrqcooyATlw8HrTww/Xn1i+I4Lf/3B8AekDkMjsYAqGkEBgtNv6ABZI9u//3hDEwWANQJD1PPZewaZt58ZfoJFiQBMQE19QE2JD9/8/wQVIwqAbJS68ez/uw9fGX5BhIgDMD8SHSgwgBw4JAHGPydzlx+//f8rOwsDM1QML/j1h+GvBTDJgTQGA/mOQPwBLEMY8DMwMNwEAO+nV0EjCPpFAAAAAElFTkSuQmCC); */
}
.el-tree >>> .el-tree-node__content:hover,
.el-tree >>> .el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(49, 86, 131, 0.2);
}
.el-tree--highlight-current
  /deep/
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: rgba(49, 86, 131, 0.2);
}
.vedio {
  padding-bottom: 0.2rem;
  overflow: auto;
  height: calc(100% - 0.8rem);
  padding-right: 0.1rem;
}
.contentLeft /deep/ .el-tree-node__content {
  padding-left: 10px !important;
}
.el-tree >>> .el-tree-node__children {
  padding-left: 0.1rem;
}
.span-ellipsis {
  color: #99c9fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

