 <template>
  <div>
    <ul class="nav">
      <!-- <router-link tag="li" :to="getToIndex">首页</router-link> -->
      <!-- <router-link
                v-for="(item,index) in getMenuRouter"
                v-if="item.flag && item.menuCode != 600 && (routerlink == 4 ? item.menuCode == 700 : item.menuCode != 700)"
                :key="index"
                tag="li"
                :to="{path:item.url, query:{menuCode:item.menuCode }}"
            >{{item.menuName}}</router-link>
            <li v-for="(item,index) in getMenuRouter"
                v-if="item.flag && item.menuCode == 700 && routerlink != 4"
                :key="'nav_'+index"
                @click="gotorouter(item)">{{item.menuName}}</li>
            <router-link
                v-for="(item,index) in getMenuRouter"
                v-if="item.menuCode == 600 && item.flag"
                :key="'nav_'+index"
                tag="li"
                :to="{path:item.url, query:{menuCode:item.menuCode }}"
      >{{item.menuName}}</router-link>-->
    </ul>
    <div class="log_out">
      <img
        class="fffff"
        id="fffff"
        style="display:none"
        src="../assets/images/caseStydy/ce.png"
        alt
      >
      <a
        href="javascript:void(0);"
        ref="b"
        @mouseover="regrad();$store.state.seekMessage = false;news = false"
        @mouseout="cancleRegrad"
        title="关于"
      >
        <!-- <a href="javascript:void(0);" ref="b" @click="regrad" title="关于"> -->
        <img style="width:0.2rem" src="../assets/navabout.png" alt>
      </a>
      <div
        class="navAbout"
        @mouseover="regrad();$store.state.seekMessage = false;news = false"
        @mouseout="cancleRegrad"
        v-show="isNavAbout"
      >
        <!-- <p>
                    <span>合作伙伴：</span>
                    <img src="../assets/images/caseStydy/zkuniversity.png" alt>
                    <img src="../assets/images/caseStydy/wduniversity.png" alt>
        </p>-->
        <p v-show="$store.state.currentDeploymentType == 1">
          <span>插件下载：</span>
          <a
            style="cursor:pointer;display:inline;color: #80a9d6;background:none"
            href="/static/DxPlayer.exe"
            target="_blank"
          >DxPlayer</a>
        </p>


        <!-- //  <p>

        //   <span style="cursor:pointer;display:inline;color: #80a9d6;background:none" @click="FaceTest()">人脸1V1比对</span>
        // </p>-->
        <!-- <div class="navdq">
                    <span style="display:inline-block;height:0.3rem;border-bottom:none;" class="color">
                        关于大千：
                        <span>武汉大千信息技术有限公司</span>
                    </span>
                    <br>

                    <span style="height:0.3rem;border-bottom:none;" class="color">
                        软件名称：
                        <span v-show="$store.state.currentDeploymentType == 1">昆仑视频侦查系统</span>
                        <span v-show="$store.state.currentDeploymentType != 1">昆仑案件管理系统</span>
                    </span>
                    <span class="official">
                        官方网址：
                        <a href="http://www.videtek.cn" target="_blank">www.videtek.cn</a>
                    </span>
                    <span class="official">
                        企业邮箱：
                        <a href="http://daqian@videtek.cn" target="_blank">daqian@videtek.cn</a>
                    </span>
        </div>-->
      </div>
      <a class="nav_middle" ref="a" v-show="$store.state.showMessageVic" @click="hint" title="消息提示">
        <img v-if="!advices" style="width:0.2rem" src="../assets/msg.png">
        <img v-else style="width:0.2rem" src="../assets/msg1.png">
      </a>
      <div class="news" v-show="news">
        <div class="title">
          <h2>
            消息盒(
            <span v-text="advices?1:0"></span>)
          </h2>
          <!-- <p>清空</p> -->
        </div>
        <!-- <div class="cont" v-for="(item,index) in historyList" v-if="index < 3"> -->
        <div class="cont">
          <a
            href="javascript:;"
            @click="goToCurrentDeploy"
            v-show="advices"
          >{{'预警车牌号：'+deployObj.plateNoInfo+' 查看'}}</a>
        </div>
      </div>

      <a
        id="publicTopNewsCaseBtn"
        :class="['nav_middle', 'messageWarn', $store.state.seekMessage?'on':'']"
        v-show="$store.state.showMessageCase"
        @mouseover="$store.state.seekMessage = true;$store.state.ceshi1 = false"
        ref="a"
        title="消息提示"
      >
        <img style="width:0.2rem" src="../assets/msg.png">
        <el-badge
          v-show="$store.state.ismessage"
          :value="Number($store.state.messageList.length)"
          :max="99"
          class="item"
        ></el-badge>
        <!-- <span v-show="$store.state.ismessage">{{$store.state.messageList.length}}</span> -->
        <!-- <span v-show="$store.state.ceshi2">2</span> -->
      </a>
      <div class="news" id="publicTopNewsCase" v-show="$store.state.seekMessage">
        <div class="title">
          <h2>
            消息盒 (
            <span style="color:#2e93fb">{{$store.state.messageList.length}}</span>)
          </h2>
          <!-- <el-button type="danger" icon="" size="mini" class="el-button delBtn el-button--danger" v-show="isMessages" @click="clearMessage()">一键清空</el-button> -->
          <div class="MessageBox" v-show="isMessages" @click="clearMessage()">一键清空</div>
        </div>
        <div class="cont counts">
          <a v-for="(item,i) in $store.state.messageList" :key="i">
            <template v-if="item.mType == 1">
              <span
                @click="getGande(item.mId,item.judgeId,item.caseUuid,item.mType,item)"
                :title="JSON.parse(item.content).userName+'上传了一条新的研判消息'"
              >{{JSON.parse(item.content).userName}}上传了一条新的研判消息</span>
              <span @click="getGande(item.mId,item.judgeId,item.caseUuid,item.mType,item)">查看</span>
            </template>
            <template v-else-if="item.mType == 2">
              <span
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)"
                :title="item.caseName+'有相似'+item.typeName+'案件'"
              >{{item.caseName}}有相似{{item.typeName}}案件</span>
              <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)">查看</span>
            </template>
            <template v-else-if="item.mType == 3">
              <span
                v-if="JSON.parse(item.content).auditFlag == 1"
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item);"
                :title="item.caseName+'通过审批'"
              >{{item.caseName}}通过审批</span>
              <span
                v-if="JSON.parse(item.content).auditFlag == 0"
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item);"
                :title="item.caseName+'未通过审批'"
              >{{item.caseName}}未通过审批</span>
              <!-- <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item);" :title="item.caseName+'审批通过'">{{item.caseName}}审批通过</span> -->
              <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item);">忽略</span>
            </template>
            <!-- 225接受217发过来的案件审批消息 -->
            <template v-else-if="item.mType == 6">
              <!-- <span :title="JSON.parse(item.content).establisther == null ? '' : JSON.parse(item.content).establisther.trueName + '的案件待审批'"> -->
              <span
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)"
                title="案件待审批"
              >
                <!-- {{JSON.parse(item.content).establisther == null ? '' : JSON.parse(item.content).establisther.trueName}}的 -->
                案件待审批
              </span>
              <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)">查看</span>
            </template>
            <template v-else-if="item.mType == 4">
              <!-- <span :title="JSON.parse(item.content).creatorName + '的串并案待审批'"> -->
              <span
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)"
                title="串并案待审批"
              >
                <!-- {{JSON.parse(item.content).creatorName}}的 -->
                串并案待审批
              </span>
              <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)">查看</span>
            </template>
            <template v-else-if="item.mType == 5">
              <span
                :title="'你的串并案：' + JSON.parse(JSON.parse(item.content).datas).caseCombinationInfo.caseName + '已通过审批'"
                v-if="JSON.parse(item.content).approveFlag == 2"
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item);"
              >你的串并案 ：{{JSON.parse(JSON.parse(item.content).datas).caseCombinationInfo.caseName}} 已通过审批</span>
              <span
                :title="'你的串并案：' + JSON.parse(JSON.parse(item.content).datas).caseCombinationInfo.caseName + '未通过审批'"
                v-if="JSON.parse(item.content).approveFlag == 3"
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item);"
              >你的串并案 ：{{JSON.parse(JSON.parse(item.content).datas).caseCombinationInfo.caseName}} 未通过审批</span>
              <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item);">忽略</span>
            </template>
            <template v-else-if="item.mType == 8">
              <span
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)"
                title="你有新的案件任务"
              >你有新的案件任务</span>
              <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)">查看</span>
            </template>
            <template v-else-if="item.mType == 9">
              <span
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)"
                title="案件任务完成"
              >案件任务完成</span>
              <span @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)">查看</span>
            </template>
            <template v-else-if="item.mType == 10">
              <span
                @click="lookMsg(item.mId,item.judgeId,item.caseUuid,item.mType,item)"
                title="磁盘空间预警"
              >
                <!-- 空间已经超过80%，请联系管理员及时清理 -->
                磁盘空间预警
              </span>
              <span @click="getMchineInfo">查看</span>
            </template>
          </a>
        </div>
      </div>

      <a class="nav_middle" @click="changeToModify" title="修改密码">
        <img style="width:0.2rem" src="../assets/pwd.png">
      </a>

      <a class="nav_right" @click="loginOut" title="退出登录">
        <img style="width:0.2rem" src="../assets/login_out.png">
      </a>
      <!-- <a class="nav_right" @click="changeSkin" title="一键换肤" v-show="isSkin">
                <img style="width:0.2rem" src="../assets/login_out.png">
      </a>-->
      <el-drawer
        title="一键换肤"
        :visible.sync="drawer"
        :direction="direction"
        :append-to-body="true"
        size="20%"
      >
        <el-radio-group v-model="themeStyle" @change="changeTheme">
          <el-radio label="blue" value="blue">默认色系</el-radio>
          <el-radio label="white" value="white">白色系</el-radio>
          <el-radio label="red" value="red">红色系</el-radio>
        </el-radio-group>
      </el-drawer>

      <div class="nav_left">
        <img src="../assets/reg_mg.png" alt>
        <div class="tain">
          <!-- <div class="nav_left_name"><span :title="$storage.getSession('userInfo').trueName">{{$storage.getSession('userInfo').trueName}}</span>，{{afternoon}}</div> -->
          <div
            class="nav_left_name"
            :title="$storage.getSession('userInfo') == undefined ? '' : $storage.getSession('userInfo').trueName"
          >
            <span>{{$storage.getSession('userInfo') == undefined ? '' : $storage.getSession('userInfo').trueName}}</span>
            <span>,{{afternoon}}</span>
          </div>
          <div class="nav_left_time">{{timeStr}}</div>
        </div>
      </div>
    </div>
    <disk :opendiskInfo="opendiskInfo" @childbydisk="childbydisk"></disk>

    <!-- 测试全局弹层 -->
    <test-dialog :visible.sync="testVisible"></test-dialog>

    <!-- 空间预警消息提醒 -->
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import disk from "./disk.vue";
export default {
  data() {
    return {
      //toIndex:{},
      name: "",
      timeStr: "",
      afternoon: "上午好",
      //menurouter:[]
      news: false,
      userinfo: {},
      advices: false,
      //实时布控预警
      deployObj: {},
      deployList: [],
      imgUrl: true,
      isshow: false,
      seekMessage: false,
      userName: "",
      opendiskInfo: false,
      isNavAbout: false,
      selectSkin: "换肤",
      themeStyle: "blue",
      isMessages: false, //是否有消息
      testVisible: false,
      drawer: false,
      direction: "rtl",
      isSkin: true //是否显示一键换肤
    };
  },
  watch: {
    deployWarnMessage: {
      handler(newValue, oldValue) {
        console.log(this.deployObj, 1111);
        this.deployObj = newValue; //新点位对象赋值给卡口对象
        this.advices = true;
        // this.getDeploy();
      },
      deep: true
    },
    opendiskInfo(val) {
      if (val == true) {
        document.title = "昆仑视频侦查系统";
        console.log(document.title, 633333);
      } else if (val == false) {
        if (this.$route.path == "/videoCombat/videoplay") {
          document.title = document.title + ".";
        } else if (this.$route.path == "/videoCombat/realvideo") {
          document.title = document.title + "..";
        } else if (this.$route.path == "/videoCombat/historyvideo") {
          document.title = document.title + "....";
        } else {
          if (this.isopenOffVideo) {
            document.title = document.title + ".";
          } else if (this.isopenOnVideo) {
            document.title = document.title + "....";
          }
        }
      }
    }
  },
  components: {
    disk,
    TestDialog: () => import("./TestDialog")
  },
  // inject:['reload'], //注入reload方法
  computed: {
    ...mapGetters([
      "getCurrentUser",
      "getMenuRouter",
      "getToIndex",
      "getCurrentUserImg",
      "getWarnMessage",
      "isopenOffVideo",
      "trueName",
      "routerlink"
    ]),
    //预警信息
    deployWarnMessage: function() {
      return this.getWarnMessage;
    }
  },
  created() {},
  mounted() {
    this.loopTime();
    this.getMenus();
    this.getUserinfo();
    // 加载的时候根据本地存储的主题样式进行改变
    if (localStorage.getItem("themeId")) {
      this.themeStyle = localStorage.getItem("themeId").split("-")[1];
      window.document.getElementsByTagName(
        "html"
      )[0].className = localStorage.getItem("themeId");
    } else {
      window.document.getElementsByTagName("html")[0].className = `theme-${
        this.themeStyle
      }`;
    }

    // this.isMessage();
  },
  updated() {
    this.getMenus();
    this.isMessage();
  },
  methods: {
    ...mapMutations([
      "setCurrentUser",
      "setMenuRouter",
      "setToIndex",
      "setCurrentUserImg",
      "istuInfo",
      "showhidepushbool",
      "setjudgeDetails", //设置研判值
      "setrouterlink"
    ]),
    //切换路由
    gotorouter(item) {
      if (item.menuCode == 700 && sessionStorage.getItem("pageIndex") == 3) {
        this.gotoother();
        return;
      }
    },
    gotoother() {
      let data = {
        userName: this.$storage.getSession("userInfo").userName,
        password: this.$storage.getSession("userInfo").password,
        prefix: "zzmm_", //侦查免密首字母
        idCard: this.$storage.getSession("userInfo").idCard,
        phone: this.$storage.getSession("userInfo").phone
      };
      data = this.$qs.stringify(data);
      this.$http.post("/struct/addUserForThree", data).then(res => {
        window.open(res.data.data);
      });
    },
    // 改变主题样式
    changeTheme() {
      //如果一键换肤涉及到了图片也要换的话，这段代码就需要打开，如果只是换字体颜色和背景颜色，则不需页面刷新
      // this.$router.go(0);
      window.document.getElementsByTagName("html")[0].className = `theme-${
        this.themeStyle
      }`;
      // console.log(window.document.getElementsByTagName('html')[0],"999999999999999999999");
      localStorage.setItem("themeId", `theme-${this.themeStyle}`);
    },
    openDig() {
      this.testVisible = true;
    },
    showimg() {
      document.getElementById("fffff").style.display = "block";
    },
    getUserinfo() {
      this.userinfo = this.$storage.getSession("userInfo");
      // if(this.getCurrentUserImg == ""){
      //   this.imgUrl = false;
      // }
    },
    getMchineInfo() {
      console.log("执行");
      this.showhidepushbool(false);
      this.opendiskInfo = true;
    },
    childbydisk(val) {
      this.opendiskInfo = false;
    },
    time: function() {
      var today = new Date();
      var hou;
      var time;
      var m = today.getMinutes();
      var s = today.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      hou = today.getHours();
      let timeStr = (this.timeStr =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        hou +
        ":" +
        m +
        ":" +
        s);
      if (hou > 12) {
        this.afternoon = "下午好";
      } else {
        this.afternoon = "上午好";
      }
      return timeStr;
    },
    loopTime: function() {
      setInterval(this.time, 1000);
    },
    // 新增功能

    // 新增功能
    //查看研判结果
    getGande(mId, judgeId, caseUuid, mType, item) {
      let data = {
        judgeId: judgeId
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyvote/getJudgeVoteById", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data == null) {
            res.data.data = {};
            this.$notify({
              type: "warning",
              message: "该研判消息已被删除！",
              position: "bottom-right",
              duration: 3000
            });
            this.lookMsg(mId, judgeId, caseUuid, mType);
          } else {
            let result = Object.assign(res.data.data, {
              caseUuid: caseUuid,
              mType: mType,
              mId: mId,
              caseName: item.caseName
            });
            // this.$store.state.judgeDetails = result;
            this.setjudgeDetails(result);
            this.$store.state.istuInfoShow = true;
            this.$store.state.voteDiabale = false;
            this.$store.state.isprogress = false;
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取研判信息失败",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('获取研判信息失败!', {icon: 5,title: "消息提示"});
        }
      });
    },
    //查看消息并更改消息已读状态
    lookMsg(mId, judgeId, caseUuid, mType, msgItem) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let userId = userInfo.value.userId;
      let datas = {
        mId: mId,
        judgeId: judgeId, //研判投票主键   string  非必填
        caseUuid: caseUuid, //案件主键  string  必填
        mStatus: 2, //消息状态  int 非必填（0或1是未读。2是已读）
        muserId: userId, //当前用户主键  string 必填
        mType: mType
        //establishId:''  //  string 非必填
      };
      datas = this.$qs.stringify(datas);
      this.$http.post("pca/synergyvote/updateWebmessage", datas).then(res => {
        if (res.data.code == 200) {
          this.ignore();
          if (mType == 6) {
            this.$store.state.pushbool = false;
            this.$store.state.messagerank = 0;
            this.$router.push({
              path: "/casestudy/casePicture_look",
              query: {
                caseUuid: JSON.parse(msgItem.content).caseUuid,
                menuCode: 220,
                isTrial: true
              }
            });
          } else if (mType == 2) {
            if (msgItem.caseUuid) {
              this.$store.state.caseUuid = msgItem.caseUuid;
              document.title = document.title.split(".")[0];
              if (msgItem.mType == 2) {
                if (msgItem.judgeId == "0") {
                  this.$store.state.caseNatureDialogFlag = true;
                } else if (msgItem.judgeId == "1") {
                  this.$store.state.person3DDialog = true;
                  this.$store.state.suspicionUuid = JSON.parse(
                    msgItem.content
                  ).baseSuspicion.suspicionUuid;
                } else if (msgItem.judgeId == "2") {
                  this.$store.state.car3DDialog = true;
                  this.$store.state.suspicionUuid = JSON.parse(
                    msgItem.content
                  ).baseSuspicion.suspicionUuid;
                } else if (msgItem.judgeId == "3") {
                  this.$store.state.personNatureDialog = true;
                  //获取比对人的原点信息
                  this.$store.state.personNatureObj = JSON.parse(
                    msgItem.content
                  ).basePerson;
                } else if (msgItem.judgeId == "4") {
                  this.$store.state.carNatureDialog = true;
                  //获取比对车的原点信息
                  this.$store.state.carNatureObj = JSON.parse(
                    msgItem.content
                  ).baseVehicle;
                } else if (msgItem.judgeId == "5") {
                  this.$store.state.unCarNatureDialog = true;
                  //获取比对骑车人的原点信息
                  this.$store.state.unCarNatureObj = JSON.parse(
                    msgItem.content
                  ).baseBicycle;
                }
              }
            }
          } else if (mType == 4) {
            this.$store.state.pushbool = false;
            this.$store.state.messagerank = 0;
            this.$router.push({
              path: "/casestudy/approvePage?menuCode=211",
              query: {
                caseCombinationId: JSON.parse(msgItem.content).caseCombinationId
              }
            });
          } else if (mType == 9) {
            let routeData = this.$router.resolve({
              path: "/videoCombat/addcasetwo?menuCode=100",
              query: {
                caseUuid: msgItem.caseUuid,
                edit: true,
                mycase: true,
                showtask: true,
                scotName: msgItem.taskName
              }
            });
            window.open(routeData.href, "_blank");
            //this.$router.push({path:'/videoCombat/addcasetwo?menuCode=100', query:{caseUuid:msgItem.caseUuid,edit:true,mycase:true,showtask:true}})
          } else if (mType == 8) {
            let routeData = this.$router.resolve({
              path: "/videoCombat/addcasetwo?menuCode=100",
              query: {
                caseUuid: msgItem.caseUuid,
                edit: true,
                mycase: true,
                showtask: true,
                editmycase: true,
                scotName: msgItem.taskName
              }
            });
            window.open(routeData.href, "_blank");
            // this.$router.push({path:'/videoCombat/addcasetwo?menuCode=100', query:{caseUuid:msgItem.caseUuid,edit:true,mycase:true,showtask:true}})
          }
          this.ignore();
        } else if (res.data.code == 100) {
          this.ignore();
          this.$notify({
            type: "error",
            message: res.data.data,
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert(res.data.data,{icon:5,title:"消息提示"});
        } else if (res.data.code == 202) {
          this.ignore();
          this.$notify({
            type: "error",
            message: res.data.message,
            position: "bottom-right",
            duration: 3000
          });
        } else if (res.data.code == 203) {
          this.ignore();
          this.$notify({
            type: "error",
            message: res.data.message,
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.ignore();
          this.$notify({
            type: "error",
            message: "请求失败，服务器异常",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('请求失败，服务器异常',{icon:5,title:"消息提示"});
        }
      });
    },
    //查询消息
    ignore() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let userId = userInfo.value.userId;
      let datas = {
        judgeId: "", //研判投票主键   string  非必填
        caseUuid: "", //案件主键  string  必填
        mStatus: 1, //消息状态  int 非必填（0或1是未读。2是已读）
        muserId: userId, //当前用户主键  string 必填
        establishId: "" //  string 非必填
      };
      datas = this.$qs.stringify(datas);
      this.$http.post("pca/synergyvote/getWebmessagPage", datas).then(res => {
        if (res.data.code == 200) {
          this.$store.state.ismessage = true;
          this.$store.commit("AllTopMsg", res.data.data);
          if (this.$store.state.messageList.length == 0) {
            this.$store.state.ismessage = false;
            this.$store.state.istuJudge = false;
            this.$store.state.approveFlag = false;
            this.$store.state.subapproveFlag = false;
          }
        } else {
          this.$notify({
            type: "error",
            message: "查询未读消息失败",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('查询未读消息失败!', {icon: 5,title: "消息提示"});
        }
      });
    },
    loginOut() {
      document.title = document.title.split(".")[0];
      this.setCurrentUser("");
      //this.setCurrentUserImg("");
      this.setMenuRouter(null);
      let _this = this;
      this.$myconfirm({
        type: "提示",
        msg: "是否退出登录",
        icon: 2,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          this.$http({
            url: "sms/logout",
            method: "post",
            params: {
              currentUser: this.getCurrentUser
            }
          })
            .then(res => {
              this.ws.send(
                '{"msgType":"STOP","msgText":"' +
                  this.$storage.getSession("userInfo").userId +
                  '"}'
              );
              sessionStorage.clear();
              this.$store.state.messageFlag = false;
              this.$store.state.istuJudge = false;
              this.$router.push("/login");
            })
            .catch(err => {
                this.$router.push("/login");
              this.ws.send(
                '{"msgType":"STOP","msgText":"' +
                  this.$storage.getSession("userInfo").userId +
                  '"}'
              );
              sessionStorage.clear();

            });
        })
        .catch(() => {
          if (this.$route.path == "/videoCombat/videoplay") {
            document.title = document.title + ".";
          } else if (this.$route.path == "/videoCombat/realvideo") {
            document.title = document.title + "..";
          } else if (this.$route.path == "/videoCombat/historyvideo") {
            document.title = document.title + "....";
          }
          console.log(this.$route.path);
        });
    },
    changeSkin() {
      this.drawer = true;
    },
    // 跳转修改信息页面
    changeToModify: function() {
      this.$router.push("/modifypass");
    },
    //跳转到审批历史
    goToCaseApprove() {
      this.$router.push({
        path: "/casestudy/caseApprove",
        query: { menuCode: 200, tab: 2 }
      });
    },
    getMenus() {
      let path = this.$route.path;
      let pageIndex = Number(sessionStorage.getItem("pageIndex"));
      if (path === "/login" || path === "/register") {
        return;
      }
      if (!this.getToIndex.path) {
        let currentDeploymentType = sessionStorage.getItem(
          "currentDeploymentType"
        );
        if (pageIndex == 1) {
          this.setToIndex({ path: "/platform" });
        } else if (pageIndex == 2) {
          this.setToIndex({ path: "/vehicle" });
        } else if (pageIndex == 3 && currentDeploymentType == 1) {
          this.setToIndex({ path: "/caseIndex" });
        } else if (
          pageIndex == 3 &&
          (currentDeploymentType == 2 || currentDeploymentType == 3)
        ) {
          this.setToIndex({ path: "/caseIndexcxp" });
        } else if (pageIndex == 4) {
          this.setToIndex({ path: "/caseindexStruct" });
        }
        if (!this.getToIndex.path) {
          this.$router.push("/login");
        }
      }

      if (!this.getCurrentUser) {
        this.setCurrentUser(this.$storage.getSession("name"));
        //this.setCurrentUserImg(this.$storage.getSession('userInfo').photoUrl);
        if (!this.getCurrentUser) {
          this.$router.push("/login");
        }
      }

      if (this.getMenuRouter === null || this.getMenuRouter.length === 0) {
        this.setMenuRouter(this.$storage.getSession("menurouter"));
        if (!this.getMenuRouter) {
          this.$router.push("/login");
        }
      }
    },
    hint() {
      this.news = !this.news;
      if (this.news) {
        this.news = true;
        this.$refs.a.style.background = "#1163ad";
      } else {
        this.news = false;
        this.$refs.a.style.background = "";
      }
    },
    regrad() {
      this.isNavAbout = true;
      this.$refs.b.style.background = "#1163ad";
    },
    cancleRegrad() {
      this.isNavAbout = false;
      this.$refs.b.style.background = "";
    },
    //实时预警刷新
    getDeploy() {
      this.$http({
        url: "tvas/disposition/info/" + this.deployObj.bukongId,
        method: "post"
      }).then(res => {
        if (res.data.data.dispositionTollgates.length !== 0) {
          this.deployList = res.data.data.disposition;
          this.advices = true;
        }
      });
    },
    goToCurrentDeploy() {
      sessionStorage.removeItem("deployData");
      let deployData = JSON.stringify(this.deployObj);
      sessionStorage.setItem("deployData", deployData);
      this.$router.push({
        path: "/carJudged/currentDeploy",
        query: { menuCode: 319 }
      });
      this.advices = false;
    },
    // 测试的
    FaceTest() {
      this.$router.push("/casestudy/personFace?menuCode=150");
    },
    clearMessage() {
      let arr = [];
      for (let i in this.$store.state.messageList) {
        if (this.$store.state.messageList[i].mType != 10) {
          arr.push(this.$store.state.messageList[i].mId);
        }
      }
      let data = {
        mIds: arr.join(",")
      };
      // console.log(data);
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyvote/clear/msg", data).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.code);
          this.ignore();
          this.isMessage();
        }
        // else {
        //   this.$notify({
        //     type:'error',
        //     position:'bottom-right',
        //     duration:3000,
        //     message:'error'
        //   })
        // }
      });
    },

    isMessage() {
      if (this.$store.state.messageList.length) {
        this.isMessages = true;
      } else {
        this.isMessages = false;
      }
    },
    //去案件列表
    goCaseList() {
      this.$router.push("/videoStrucPlat/caseList");
    },
    //去标注池
    goCaseMarkPool() {
      this.$router.push("/videoStrucPlat/MarkPool");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
// @import "../assets/sass/base.scss";
.fffff {
  position: absolute;
  top: 90px;
  left: -1100px;
}
.el-badge /deep/ .el-badge__content {
  margin-left: -0.1rem;
}

::-webkit-scrollbar {
  width: 0.05rem;
  height: 0.05rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 0.05rem;
  background-color: rgba(153, 201, 250, 0.38);
}
.messageWarn {
  position: relative;
}
.messageWarn span {
  position: absolute;
  // padding:0 0.02rem;
  color: #fff;
  // width: 0.15rem;
  // height: 0.15rem;
  // line-height: 0.15rem;
  padding: 0.01rem;
  background-color: red;
  text-align: center;
  border-radius: 50%;
  font-size: 0.1rem;
  right: 25%;
  top: 30%;
  font-size: 0.1rem;
}
.nav {
  // min-width: 8rem;
  display: flex;
  height: 0.6rem;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  // left: 5.5rem;
  overflow: hidden;
  li {
    position: relative;
    display: flex;
    height: 100%;
    padding: 0 0.15rem;
    font-size: 0.18rem;
    color: white;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .router-link-active {
    background: #1163ad;
    &::after {
      content: "";
      position: absolute;
      top: 0.55rem;
      left: 50%;
      height: 0.09rem;
      width: 0.09rem;
      margin-left: -0.03rem;
      // border: 1px solid black;
      transform: rotate(-45deg);
      background: white;
    }
  }
}
.log_out {
  display: flex;
  min-width: 3.84rem;
  height: 0.6rem;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  a {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    cursor: pointer;
    position: relative;
  }
  a.on,
  a:hover {
    background: #1163ad;
  }
  .nav_left {
    display: flex;
    flex: 4;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-left: 0.15rem;
    img {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
    .tain {
      margin-left: 0.08rem;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      font-size: 0.12rem;
      .nav_left_name {
        width: 1.8rem;
        height: 0.18rem;
      }
      span {
        // display:inline-block;
        float: left;
        max-width: 0.55rem;
        min-width: 0.2rem;
        height: 0.18rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
      }
    }
  }
  .news {
    width: 3.18rem;
    max-height: 3.3rem;
    // background: RGB(19, 29, 52);
    @include background_partner("background_partner1");
    position: absolute;
    top: 0.6rem;
    left: 0;
    z-index: 9999;
    .title {
      width: 100%;
      height: 0.5rem;
      // border: 1px solid RGB(24, 46, 79);
      @include border("boder1");
      display: flex;
      h2 {
        width: 90%;
        line-height: 0.5rem;
        display: inline-block;
        font-size: 0.16rem;
        padding-left: 5%;
        // color: #e5e7e8;
        @include font_color_news("font_color_news1");
        @include font_color_gray("font_color_gray1");
        span {
          color: #ff8c00;
        }
      }
      p {
        width: 45%;
        line-height: 0.5rem;
        display: inline-block;
        padding-right: 5%;
        font-size: 0.14rem;
        color: #99c9fa;
        text-align: right;
        cursor: pointer;
      }
    }

    .cont {
      width: 100%;
      max-height: 2.8rem;
      overflow-y: auto;
      a {
        display: block;
        width: 90%;
        padding: 0 5%;
        height: 0.4rem;
        line-height: 0.4rem;
        border-bottom: 1px solid RGB(24, 46, 79);
        color: #99c9fa;
        font-size: 0.14rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span:first-child {
          float: left;
          line-height: 0.4rem;
          width: 82%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span:last-child {
          color: #409eef;
          float: right;
        }

        &:hover {
          background: RGB(23, 55, 86);
          color: #2e93fb;

          span:last-child {
            color: #fff;
          }
        }
      }
    }
  }
  .navAbout {
    width: 3.18rem;
    // padding-top: 0.1rem;
    min-height: 0.5rem;
    // height: 2.7rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    // padding-bottom: .1rem;
    // background: RGB(19, 29, 52);
    // background:red;
    @include background_partner("background_partner1");
    @include border("boder1");
    position: absolute;
    top: 0.6rem;
    left: 0;
    z-index: 9999;
    p {
      width: 100%;
      line-height: 0.5rem;
      padding: 0 0.05rem;
      display: inline-block;
      font-size: 0.16rem;
      color: #cdcfd1;
      // color: #99c9fa;
      @include font_color_subject("font_color_subject1");
      // border-bottom: 1px solid #172a48;
      // border-bottom:red;
      @include border-bottom_word("border-bottom_word1");
      // @include boder_bottom("boder_bottom1");
      span {
        color: #cdcfd1;
        // @include font_color_white("font_color_white1");
      }
    }
    .navdq {
      padding-top: 0.1rem;
      padding-left: 0.05rem;
      .official {
        height: 0.15rem;
        display: block;
        border-bottom: none;
        // color: #fff;
        @include font_color_white("font_color_white1");
        margin-top: 0.1rem;
        padding-left: 0.72rem;
        font-size: 12px;
        a {
          display: inline;
          color: #80a9d6;
          background: none;
        }
      }
    }
    .navdq span.color {
      @include font_color_white("font_color_white1");
    }
    img {
      padding-top: 0.05rem;
    }
  }
}

.green {
  color: #41b883 !important;
}
.my-skin {
  color: #fff;
}
// .delBtn {
//   margin-left: .7rem;
// }
.MessageBox {
  width: 0.8rem;
  margin: auto;
  font-size: 0.14rem;
  color: #409eef;
}
.MessageBox:hover {
  cursor: pointer;
  color: #fcfcfc;
}
</style>
