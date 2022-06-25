<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:20
 * @LastEditTime : 2020-12-24 14:06:28
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\addcaseInfo\JudgeResult.vue
 * @
 -->

<template>
  <div>
    <!--中间视频-->
    <div class="centerSpaceVideo" v-show="centerSpaceVideoFlag">
      <div>
        <video loop id="centerVideo1" disablePictureInPicture controls autoplay></video>
        <img @click="centerSpaceVideoFlag=false" src="../../../assets/images/videoNewImg/commhand/delete.png" alt="">
        <!-- <div class="centerVideoCloseIcon" @click=" centerSpaceVideoFlag=false">
          <span class="el-icon-close"></span>
        </div> -->
      </div>
    </div>

    <el-dialog
      title="研判结果展示"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="aaa"
      @close="closeDias();onloadinfo = false"
      width="60%">
      <span class="g_main">
        <ul v-if="onloadinfo">
          <li v-for="(item,index) in tableData" :key="index">
            <div class="navPic">
              <i class="el-icon-close" @click="deleteJudge(item)"></i>
              <img
                :src="item.imgUrl"
                class="img_block"
                :onerror="$store.state.defaultImg"
                @click="playvideoUrl1(item,index)"
                @load="imgscale('.img_block')"
                :class="isActive == index ? 'checkVideo' : ''"
              >
              <span class="play"  @click="playvideoUrl1(item,index)"></span>
              <span class="searchPic" @click.stop="downLoadPictBtn(item)">下载</span>
              <!-- <span :id="'juimg_'+i" class="boderShow"></span> -->
            </div>
            <p>
              <span>反对：{{item.opposeProportion?item.opposeProportion * 100 +'%':'0%'}}</span>
              <span>赞同：{{item.approveProportion?item.approveProportion * 100 +'%':'0%' }}</span>
              <span class="personnum" :title="item.totalcount">投票人数：{{item.totalcount}}</span>
              <el-button class="searchBtn firstBtn" @click="updateLable(item)">修改</el-button>
              <el-button class="searchBtn" :disabled="item.isStatus == 1 || isclick"  @click="getclueOk(item,index)">确定嫌疑目标</el-button>
            </p>
          </li>
        </ul>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- <handManual :isHand="isHand" ref="handManual" @childByhand="childByhand"></handManual> -->
    <handword :showhandword="isHand" :isonline='false' @childbyHandwork="childbyHandwork"></handword>

  </div>
</template>

<script>
import flvplay from "../../../api/casestudy/flvPlay.js"; //播放器的flv的js
import scale from "../../../api/common/scale.js"; //播放器的flv的js
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import handword from "../../videoCombat/fastFight/handworkLable";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      centerSpaceVideoFlag: false,
      videoUrl: "",
      isHand: false,
      onloadinfo: false,
      isActive: null,// 选中状态
      isclick:false   //是否点击确定为嫌疑目标
    };
  },
  watch: {
    showJudege(val) {
      this.dialogVisible = val;
    }
  },
  computed: {
    ...mapGetters(["ishandupdate", "gethanlabel"])
  },
  components: {
    handword
  },
  mixins: [flvplay,scale],
  props: {
    showJudege: Boolean
  },
  methods: {
    ...mapActions(["toggleHandLable", "toggleHandfalse"]),
    ...mapMutations(['setisupdatejudged',"updatehanlabel","setshowjudged"]),
    aaa(){
      this.onloadinfo = true;
      this.queryList();
      // this.ceshi()
      // 等比压缩图片
    },

    queryList() {
      let data = {
        caseUuid: this.$route.query.caseUuid,
        userId: "", //发起投票的人
        orderBy: "begin_time",
        orderType: "desc",
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/synergyvote/selectJudgeResultList", data)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
          }
      });
    },
    updateLable(row) {
      this.setisupdatejudged(true)
      this.getLableInfo(row.mark.markId);
    },
    getLableInfo(id) {
      let data = {
        markId: id
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/video/mark/query/mark/by/id", data).then(res => {
        if (res.data.code == 200) {
          this.updatehanlabel(res.data.data);
          this.isHand = true;
          this.toggleHandLable();
        }
      });
    },
    //打开修改标注

    childbyHandwork() {
      this.isHand = false;
      this.toggleHandfalse();
      this.queryList();
    },
    closeDias() {
      this.currentPage = 1
      this.pageSize = 10
      this.$emit("childbyJud", false);
      this.centerSpaceVideoFlag = false;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },

    //  视频播放
    playvideoUrl1(row,index) {
      this.isActive = index
      this.videoUrl = ''
      this.centerSpaceVideoFlag = true;
      let url = this.getUrl(row.vedioUrl)
      this.flv_load_mds("centerVideo1", url);
    },
    //确定为线索
    getclueOk(row, index) {
      this.isclick = true
      let arr = row.mark.attrList;
      let PersonArr = [];
      let cpArr = [];
      let carArr = [];
      let obj = {};
      obj.caseUuid = row.caseUuid;
      obj.deviceId = row.deviceId;
      obj.traceImgUrl = row.imgUrl;
      obj.markName = row.mark.markName
      if (row.mark.typeId == 1) {
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].itemCode] = arr[i].valueName;
        }
        PersonArr.push(obj);
      }
      if (row.mark.typeId == 4) {
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].itemCode] = arr[i].valueName;
        }
        cpArr.push(obj);
      }
      if (row.mark.typeId == 2) {
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].itemCode] = arr[i].valueName;
        }
        carArr.push(obj);
      }
      let data = {
        person: JSON.stringify(PersonArr),
        bicycle: JSON.stringify(cpArr),
        vehicle: JSON.stringify(carArr)
      };
      data = JSON.stringify(data);
      let dataList = {
        datas: data,
        flag: 1,
        judgeId: row.judgeId,
        featureFlag : row.featureFlag,
        feature : row.feature,
      };
      dataList = this.$qs.stringify(dataList);
      this.$http.post("pca/casemng/clue/image/save", dataList).then(res => {
        if (res.data.code == 200) {
          this.isclick = false
          this.$notify({
            type: "success",
            message: "添加成功",
            position: "bottom-right",
            duration: 3000
          });
          this.queryList()
        } else {
          this.$notify({
            type: "error",
            message: "添加失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //删除研判目标
    deleteJudge(item){
      this.$myconfirm({
        type: '提示',
        msg: '是否删除该研判结果？',
        icon: 1,
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(res=>{
        let data = {
          judgeId:item.judgeId,
          caseUuid:item.caseUuid
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/synergyvote/delJudge',data).then(res=>{
          console.log(res,111);
          if(res.data.code == 200){
            this.currentPage = 1
            this.queryList();
            this.$notify({
              type: 'success',
              message: '删除研判结果成功',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.$notify({
              type: 'warning',
              message: '删除研判结果失败',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      })



    },
    // 嫌疑目标下载压缩包
    downLoadPictBtn(item){
      let downLoadVsas = sessionStorage.getItem('vsasModuleUrl')
      window.open('http://'+downLoadVsas+'/download/mark?markIds='+item.markId+'&caseUuid='+this.$route.query.caseUuid)
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.el-dialog__wrapper >>> .el-dialog__header {
  background-color: #f3f6f8;
}
.el-dialog__wrapper >>> .el-dialog__footer {
  border-top: 1px solid #d5dade;
}
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 0.1rem 0.2rem;
}
.el-pagination {
  text-align: right;
  margin-top: 0.1rem;
}
.g_main {
  width: 100%;
  display: inline-block;
  height: 4.7rem;
}
.g_main ul {
  /* border: 1px solid #000; */
  height: 4.4rem;
  overflow: auto;
}
.g_main ul li {
  width: 19.2%;
  margin-bottom: 0.2rem;
  border: 1px solid #102d50;
  height: 2rem;
  float: left;
  position: relative;
  margin-right: 1%;
  overflow: hidden;
}

.g_main ul li:nth-child(5n) {
  margin-right: 0;
}
.g_main ul li div{
  position: relative;
}
.checkVideo{
  border: 1px solid #409EFF;
  box-sizing: border-box;
}
.g_main ul li .play {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  /* margin: -0.3rem 0 0 -0.2rem; */
  background: url('../../../assets/images/videoNewImg/commhand/play_button.png') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  display: none;
}
.g_main ul li i{
  display: none;
}
.g_main ul li:hover .play,
.g_main ul li:hover i {
  display: block;
}
.g_main ul li p {
  position: absolute;
  width: 100%;
  height: 0.6rem;
  /* background-color: rgba(0, 0, 0, 0.5); */
  bottom: 0;
  color: #fff;
  padding: 0 0.04rem;
}
.g_main ul li p span {
  display: inline-block;
  width: 40%;
}
.g_main ul li p .personnum {
  padding-top: 0.04rem;
  width: 50%;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.g_main ul li div {
  width: 100%;
  height: 1.4rem;
  border: 1px solid #235588;
  position: relative;
}
.boderShow {
  position: absolute;
  z-index: 2;
}
.g_main li div img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.g_main ul li p .el-button {
  position: absolute;
  font-size: 0.1rem;
  padding: 0.03rem;
  right: 0.05rem;
  bottom: 0.1rem;
}
.g_main ul li p .firstBtn {
  right: 0.05rem;
  bottom: 0.38rem;
}
.g_main ul li i{
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  z-index: 1;
  right: 0;
  text-align: center;
  line-height: 0.2rem;
  color: #fff;
  background-color: rgb(64, 158, 255, .8);
  cursor: pointer;
}

.centerSpaceVideo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  overflow: hidden;
  z-index: 3000;
  background-color: rgba(0, 0, 0, .4);
}
.centerSpaceVideo > div{
  width: 6rem;
  height: 3.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border: 1px solid rgba(16, 45, 78, 0.8);
  background-color: rgba(4, 18, 36, 0.8);
}
.centerSpaceVideo video{
  width: 100%;
  height: 100%;
}
.centerSpaceVideo > div img{
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}


.centerVideoCloseIcon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  color: white;
  cursor: pointer;
  background-color: #f56c6c;
  font-size: 16px;
  width: 25px;
  height: 20px;
  text-align: center;
  padding-top: 2px;
}
.centerVideoCloseIcon:hover {
  background-color: red;
}
.isTranscoding {
  text-align: center;
  height: 0.5rem;
  font-size: 0.18rem;
  color: white;
  width: 100%;
  height: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
/* .width{
    width: 100%;
    height: auto;
  }
  .height{
    height: 100%;
    width: auto;
  } */
.other {
  width: 100%;
  height: 100%;
}
.searchPic{
    position: absolute;
    bottom: 0.02rem;
    right: 0rem;
    color: #fff;
    cursor: pointer;
    height: 0.2rem;
    line-height: 0.2rem;
    text-align: center;
    border-radius: 3px;
    padding: 0 0.1rem;
    font-size: 0.12rem;
    border: 1px solid rgb(64, 158, 255);
    background-color: #409eff;
    z-index: 999;
    display: none
}
.navPic:hover > .searchPic {
  display: block;
}
</style>
