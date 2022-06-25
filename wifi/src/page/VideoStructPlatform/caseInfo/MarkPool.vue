<!--
 * @Author: your name
 * @Date: 2021-06-08 16:48:02
 * @LastEditTime : 2021-08-04 15:27:56
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev-changshu-noBigData\vacp-wfes\src\page\VideoStructPlatform\caseInfo\MarkPool.vue
 -->
<template>
  <div class="onlinecoll">
    <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页 ></router-link>
      <p class="sysname">&nbsp;标注池</p>
      <p class="clicklink">
        <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/resourceManage',query:{menuCode:704}}"
        >涉案视频管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/taskManage',query:{menuCode:701}}">任务管理</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/semanticSearch',query:{menuCode:702}}"
        >特征搜索</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/searchPrint',query:{menuCode:703}}">以图搜图</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/videoRetrieval',query:{menuCode:710}}"
        >检索查询</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/caseList',query:{menuCode:711}}">案件管理</router-link>
        <!-- <router-link tag="span" :to="{path:'/videoStrucPlat/MarkPool',query:{menuCode:712}}">标注池</router-link> -->
      </p>
    </div>
    <div class="LabelMarkList">
      <div class="searchCondition">
        <div
          style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
          class="titleColor"
        >创建人:&nbsp;&nbsp;</div>
        <el-select
          v-model="createdPerson"
          class="caseNameSelect"
          placeholder="请选择创建人"
          @change="createChange"
        >
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="(item,index) in createdPersonList"
            :key="index"
            :label="item.userName"
            :value="item.creatorId"
          ></el-option>
        </el-select>

        <div
          style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
          class="titleColor"
        >点位名称:&nbsp;&nbsp;</div>
        <el-select
          v-model="pointName"
          class="caseNameSelect"
          placeholder="请选择点位名称"
          @change="pointChange"
        >
          <el-option value label="全部"></el-option>
          <el-option
            v-for="(item,index) in pointNameList"
            :key="index"
            :label="item.cameraName"
            :value="item.deviceUuid"
          ></el-option>
        </el-select>

        <div
          style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
          class="titleColor"
        >标注类型:&nbsp;&nbsp;</div>
        <el-select
          v-model="markType"
          class="caseNameSelect"
          placeholder="请选择标注类型"
          @change="MarkChange"
        >
          <!-- <el-option value="" label=""></el-option> -->
          <el-option
            v-for="(item,index) in markTypeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <div style="margin-left: 0.3rem;">
          <el-button type="primary" class="searchBtn" size="small" @click="getAlllMarker">查询</el-button>

          <el-button type="info" class="searchBtn tryBtn" size="small" @click="reset">重置</el-button>
        </div>
      </div>

      <div class="allMark">
        <div slot="empty">
          <div class="noImg" v-if="!labelImglist.length">
            <img src="../../../assets/updataImg/NoData.png">
          </div>
        </div>

        <ul class="mainul" v-if="labelImglist.length">
          <li
            v-for="(item,index) in labelImglist"
            :key="index"
            @mouseover="getInfo(item,$event)"
            @mouseout="goout"
          >
            <div :id="'markLi'+index">
              <b title="删除标注" @click.stop="dellable(item,index)" class="deleteLable">
                <img src="../../../assets/images/videoNewImg/commhand/delete.png" alt>
              </b>

              <p class="searchPic none" @click.stop="lookBigPicture(item)">查看大图</p>
              <p class="search none" title="快捷以图搜图" @click.stop="searchPictures(item)">搜</p>

              <img
                class="width"
                src="@/assets/error_none.png"
                alt="暂无图片"
                v-if="!item.videoCaptureUrl"
              >
              <img
                class="imgwidth"
                :id="'marker_'+index"
                :src="item.videoCaptureUrl"
                alt="暂无图片"
                @click.stop.self="playsFlvVideo(item,index)"
                :class="{markNoBorder:index == nowIndex}"
              >
            </div>
            <p>
              <span :title="item.markName">标注名称：{{ item.markName }}</span>
              <!-- <span :title="item | lableTime">时间：{{ item | lableTime}}</span> -->
              <span :title="item.startTime">时间：{{ item.startTime}}</span>
              <span :title="item.deviceName">位置：{{item.deviceName}}</span>
              <!-- <span >位置：{{item.device | positionIsNull}}</span> -->
            </p>
          </li>
        </ul>
      </div>

      <el-pagination
        style="float: right;margin-right: 0.1rem;"
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <lookBigImg :isShowBig="isShowBig" :bigImgUrl="bigImgUrl" @childBigClose="childBigClose"></lookBigImg>
  </div>
</template>

<script>
import lookBigImg from "./lookBigImg.vue";
export default {
  data() {
    return {
      createdPerson: "", //创建人
      createdPersonList: [], //创建人列表
      pointName: "", //点位名称
      pointNameList: [], //点位名称列表
      labelImglist: [], //标注列表
      nowIndex: null,
      pageSizes: [8, 12, 16],
      pageSize: 8,
      totalCount: 0,
      currentPage: 1,
      imgListWH: [], //图片自适应的宽高比
      isShowBig: false, //查看大图
      bigImgUrl: "", //大图url地址
      orderBy: "creatorTime",
      orderType: "desc",
      markType:"-1",//标注类型-1代表全部，1人，2骑车，3车
      markTypeList:[
        {
          value: '-1',
          label: '全部'
        },{
          value: '1',
          label: '行人'
        }, {
          value: '2',
          label: '骑车人'
        }, {
          value: '3',
          label: '车'
        },
      ],
    };
  },
  watch: {
    labelImglist: {
      handler(newValue, oldValue) {
        if (newValue.length) {
          for (let i = 0; i < newValue.length; i++) {
            var img = new Image();
            img.onload = () => {
              let imgw = document.getElementById("marker_" + i).naturalWidth;
              let imgh = document.getElementById("marker_" + i).naturalHeight;
              let rate = this.$store.state.screenWidth / 1920;
              let retw =
                document.getElementById("markLi" + i).clientWidth * rate;
              let reth =
                document.getElementById("markLi" + i).clientHeight * rate;
              let unit = 1;
              let unitTop = 0;
              let unitLeft = 0;
              if (retw / reth < imgw / imgh) {
                this.imgListWH.push("width");
                unit = imgw / retw;
                unitTop = (reth - imgh / unit) / 2;
                this.showfalse = true;
              } else {
                this.imgListWH.push("height");
                unit = imgh / reth;
                unitLeft = (retw - imgw / unit) / 2;
                this.showfalse = true;
              }
            };
            img.src = newValue[i].videoCaptureUrl;
            img.onerror = () => {
              this.imgListWH.push("width");
            };
          }
        }
      },
      deep: true
    }
  },
  filters: {
      //根据李浩的要求，修改这个时间。以前是videoStarttime,现在直接用starttime，如果当前标注的视频被删掉了，videostarttime就没有，
      //标注时间就会显示1970的时间
    lableTime(val) {
      let nowplaytime;
      let alltime;
      if (val.absoluteTime) {
        nowplaytime = new Date(val.absoluteTime).getTime();
        alltime = Number(nowplaytime) + Number(val.offset * 1000);
      } else {
        nowplaytime = new Date(val.startTime).getTime();
        alltime = Number(nowplaytime) + Number(val.relativeTime);
      }
      let date = new Date(alltime);
      let YY = date.getFullYear();
      let MM =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
    },
    //  lableTime(val) {
    //   let nowplaytime;
    //   let alltime;
    //   if (val.absoluteTime) {
    //     nowplaytime = new Date(val.absoluteTime).getTime();
    //     alltime = Number(nowplaytime) + Number(val.offset * 1000);
    //   } else {
    //     nowplaytime = new Date(val.videoStartTime).getTime();
    //     alltime = Number(nowplaytime) + Number(val.relativeTime);
    //     //   Number(val.offset * 1000); // 开始时间+相对时间+设备时间
    //   }
    //   let date = new Date(alltime);
    //   let YY = date.getFullYear();
    //   let MM =
    //     date.getMonth() + 1 < 10
    //       ? "0" + (date.getMonth() + 1)
    //       : date.getMonth() + 1;
    //   let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    //   let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    //   let mi =
    //     date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    //   let ss =
    //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    //   return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
    // },
    positionIsNull(val) {
      if (val != null) {
        return val.name;
      } else {
        return "";
      }
    }
  },
  components: { lookBigImg },
  methods: {
    NowTimes(val) {
      let date = new Date(val).getTime() - 3600 * 24 * 1000;
      let YY = new Date(date).getFullYear();
      let MM =
        new Date(date).getMonth() + 1 < 10
          ? "0" + (new Date(date).getMonth() + 1)
          : new Date(date).getMonth() + 1;
      let DD =
        new Date(date).getDate() < 10
          ? "0" + new Date(date).getDate()
          : new Date(date).getDate();
      let hh =
        new Date(date).getHours() < 10
          ? "0" + new Date(date).getHours()
          : new Date(date).getHours();
      let mi =
        new Date(date).getMinutes() < 10
          ? "0" + new Date(date).getMinutes()
          : new Date(date).getMinutes();
      let ss =
        new Date(date).getSeconds() < 10
          ? "0" + new Date(date).getSeconds()
          : new Date(date).getSeconds();
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
    },
    // 关闭查看大图
    childBigClose(val) {
      this.isShowBig = val;
    },

    //查看大图
    lookBigPicture(row) {
      this.isShowBig = true;
      this.bigImgUrl = row.videoCaptureUrl;
    },
    //以图搜图
    searchPictures(row) {
      //typeFlag传10，就是前端自己规定的数字，用于判断从标注列表点击快捷以图搜图的
      var dates = Date.parse(row.startTime);
      let oneday = 24 * 60 * 60 * 1000;
      //AB用来过渡的
      let A = dates - oneday;
      let B = dates + oneday;
      let beginTime = this.NowTimes(A);
      let endTime = this.NowTimes(B);
      let routeData = this.$router.resolve({
        path: "/videoStrucPlat/searchPrint",
        query: {
          menuCode: 704,
          typeFlag: 10,
          startTime: beginTime,
          endTime: endTime,
          snapUrl: row.videoCaptureUrl
        }
      });
      window.open(routeData.href, "_blank");
    },
    //删除标注
    dellable(row, index) {
      this.$myconfirm({
        type: "提示",
        msg: "是否删除该标注！",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          markId: row.markId
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/video/markPoll/mark/delete", data).then(res => {
          if (res.data.code == 200) {
            this.$notify({
              type: "success",
              message: "标注删除成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.getAlllMarker();
          } else {
            this.$notify({
              type: "error",
              message: "标注删除失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      });
    },
    //鼠标移入
    getInfo() {},
    //鼠标移除
    goout() {},
    //播放
    playsFlvVideo() {},
    //获取点位列表
    getRegionArea(caseUuid) {
      let data = {
        caseUuid: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/allDeviceUuidStruct", data).then(res => {
        this.pointNameList = res.data.data;
      });
    },
    //获取所有的标注
    getAlllMarker() {
      let data = {
        caseUuid: "",
        suspicionType:this.markType,//标注类型  1人，2骑车人，3车  -1默认是全部
        suspicionUuid: "", //嫌疑目标id
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        createUser: this.createdPerson, //创建人
        deviceUuid: this.pointName //点位
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/video/markPoll/new/list", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.length == 0) {
            this.labelImglist = [];
            this.totalCount = 0;
            this.goout();
          } else {
            this.labelImglist = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
          }
        }
      });
      this.getCreatedList()
    },
    //重置
    reset() {
      this.createdPerson = "";
      this.pointName = "";
      this.currentPage = 1;
      this.pageSize = 8;
      this.markType = "-1"
      this.getAlllMarker();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAlllMarker();
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAlllMarker();
    },
    //切换点位
    pointChange(val) {
      this.pointName = val;
      this.getAlllMarker();
    },
    //切换标注类型
    MarkChange(val){
        this.markType = val
        this.getAlllMarker();
    },
    //获取创建人列表
    getCreatedList() {
    //   data = this.$qs.stringify(data); //post请求分离data
      this.$http.post("vsas/video/markPoll/mark/creatorName").then(res => {
        if (res.data.code == 200) {
            this.createdPersonList = res.data.data;
        }
      });
    },
    //创建人切换
    createChange(val) {
      this.createdPerson = val;
      this.getAlllMarker();
    }
  },
  mounted() {
    //获取所有标注
    this.getAlllMarker();
    //获取所有点位
    this.getRegionArea();
    //获取创建用户
    this.getCreatedList();
  }
};
</script>
<style scoped>
@import "../../../assets/css/commom.css";
.onlinecoll {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.LabelMarkList {
  width: 100%;
  height: calc(100% - 0.6rem);
  /* border: 1px solid red; */
}
.searchCondition {
  padding-bottom: 0.2rem;
  width: 80%;
  display: flex;
  font-size: 0.14rem;
  padding-left: 0.2rem;
  /* margin: 0 auto; */
  margin-top: 0.2rem;
}
.searchCondition /deep/ .el-date-editor,
.searchCondition /deep/ input {
  height: 0.28rem;
}
.caseNameSelect {
  width: 1.5rem;
  color: #c5c5c5;
}
.allMark {
  width: 98%;
  height: calc(100% - 1.2rem);
  /* border: 1px solid blue; */
  margin: 0 auto;
}
.mainul {
  overflow-y: auto;
  padding: 0 0.1rem;
  height: calc(100% - 0.5rem);
  position: relative;
}
.mainul li {
  position: relative;
  margin-top: 0.13rem;
  float: left;
  width: 23%;
  height: 3rem;
  /* margin-right: 2%; */
  border: 2px solid #102d50;
  margin-left: 1.5%;
}
.mainul li .searchPic {
  width: 0.6rem;
  height: 0.2rem;
  position: absolute;
  left: calc(100% - 1.1rem);
  bottom: 0.04rem;
  z-index: 2;
  color: #fff;
  cursor: pointer;
  display: none;
  line-height: 0.2rem;
  text-align: center;
  font-size: 0.12rem;
  border: 1px solid rgb(64, 158, 255);
  background-color: rgb(64, 158, 255, 0.8);
}
.mainul li .search {
  width: 0.3rem;
  height: 0.2rem;
  position: absolute;
  left: calc(100% - 0.32rem);
  bottom: 0.04rem;
  z-index: 2;
  color: #fff;
  cursor: pointer;
  display: none;
  line-height: 0.2rem;
  text-align: center;
  font-size: 0.12rem;
  border: 1px solid rgb(64, 158, 255);
  background-color: rgb(64, 158, 255, 0.8);
}
.mainul li:hover .none {
  display: block;
}
.markNoBorder {
  border: 1px solid #409eff !important;
}
.imgwidth {
  width: 100%;
  height: 95%;
}
.mainul li div {
  width: 100%;
  height: calc(100% - 0.6rem);
  position: relative;
  z-index: 999;
}

.mainul li div > img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.mainul li p {
  width: 3.5rem;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  left: 0;
  bottom: 0px;
  /* background-color: rgba(0, 0, 0, 0.6); */
  font-size: 0.12rem;
}
.mainul li p span {
  width: 1.45rem;
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
  display: block;
  line-height: 0.2rem;
  color: #99c9fa;
  margin-left: 0.1rem;
}
.deleteLable {
  display: none;
  z-index: 999;
}
.mainul li:hover div .deleteLable {
  display: block;
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  top: 0;
  right: -0.1rem;
  z-index: 3;
  cursor: pointer;
}
.noImg {
  margin: 0 auto;
}

@media (max-width:1440px){
    .mainul li .searchPic{
        width: .8rem;
        left: calc(100% - 1.3rem);
    }
    .el-button{
        padding: 0.06rem 0.1rem;
    }
}
</style>
