<template>
  <!--视频播放页面-->
  <div class="wrapper">
    <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库</router-link>
      <router-link
        class="nav-item nav-item-second"
        tag="div"
        :to="{path:'/casestudy/myCasCade',query:{menuCode:209}}"
      >我的串并案</router-link>
      <div class="nav-item nav-item-search">播放</div>
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
            <div>
              <el-tree
                v-if="videoList.length > 0"
                :data="videoList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                default-expand-all
                check-strictly
                highlight-current
              ></el-tree>
            </div>
          </div>
          <div class="contentRight">
            <div class="videoContainer">
              <div class="videoItemContent">
                <div class="videoItem" @click="changeItem($event)">
                  <video
                    loop
                    disablePictureInPicture
                    @click="changeItem($event)"
                    id="videoElement1"
                    class="videoElement"
                    controls="controls"
                  >Your browser is too old which doesn't support HTML5 video.</video>
                </div>

                <div class="videoItem" @click="changeItem($event)">
                  <video
                    loop
                    disablePictureInPicture
                    id="videoElement2"
                    class="videoElement"
                    controls="controls"
                  >Your browser is too old which doesn't support HTML5 video.</video>
                </div>

                <div class="videoItem" @click="changeItem($event)">
                  <video
                    loop
                    disablePictureInPicture
                    id="videoElement3"
                    class="videoElement"
                    controls="controls"
                  >Your browser is too old which doesn't support HTML5 video.</video>
                </div>

                <div class="videoItem" @click="changeItem($event)">
                  <video
                    loop
                    disablePictureInPicture
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
      loading: null,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mixins: [flvplay],
  methods: {
    handleNodeClick(data, node) {
      let url = this.getUrl(data.obj.originVideoUrl);
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
        console.log(res, "视频列表");
        if (res.statusText === "OK" && res.data.code === 200) {
          let data = res.data.data;
          this.loading.close();
          this.loading = null;
          for (let i = 0; i < data.length; i++) {
            let arr = [];
            for (let j = 0; j < data[i].videoSliceInfoList.length; j++) {
              arr.push({
                label: data[i].videoSliceInfoList[j].title,
                obj: data[i].videoSliceInfoList[j]
              });
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
          itemContainer[i].style.border = "2px solid red";
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
    this.caseCombId = this.$route.query.caseCombinationId;
    this.getVideoList();
  },
  mounted: function() {
    let _this = this;
    _this.changeTreeListStyle();
    // _this.getVideoList()
    document.getElementById("videoElement1").click();
  }
};
</script>

<style scoped>
@import "../../assets/css/case_common.css";
</style>

