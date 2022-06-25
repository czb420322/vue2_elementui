<!--
 * @Author: wangst
 * @Date: 2021-04-27 10:58:32
 * @LastEditTime : 2021-08-09 19:44:39
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev-noBigData-sdk\vacp-wfes\src\page\device\deviceDeploy.vue
 -->
<template>
  <div class="parent">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <p class="sysname" @click="gohome">首页 ></p>
      <p class="sysname">&nbsp;对接管理</p>
    </div>

    <div>
      <div
        v-if="lineLoad"
        class="onlinecoll"
        v-loading="loading"
        element-loading-text="重启中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255,255,0.4)"
      ></div>
      <div class="main">
        <div class="menus">
          <el-button @click="ghsFirst" :type="orderFlag">gbs配置</el-button>
          <el-button @click="gbhssFirst" :type="navFlag">gbhss配置</el-button>
          <el-button @click="gbrealtimeFirst" :type="realtimeFlag">gbrealtime配置</el-button>
        </div>
        <div style="padding: 0 0.2rem;">
          <el-tabs v-model="activeName" @tab-click="handleClick" v-if="showGbs">
            <el-tab-pane label="对接设置" name="first">
              <div class="navBar-top">
                <p>
                  <span>
                    <b class="must">*</b>服务IP：
                  </span>
                  <input type="text" v-model="serverIp" placeholder="示例：192.168.102.33">
                  <span class="ml-10" style="color: darkgrey">服务端口：</span>
                  <input type="text" v-model="serverPort">
                  <span class="ml-10" style="color: darkgrey">代理端口：</span>
                  <input type="text" v-model="proxyPort">
                </p>
                <div class="navBar-center allequally">
                  <ul>
                    <li>
                      <span style="color: #99c9fa">
                        <b class="must">*</b>
                        天网服务ID：
                        <i></i>
                      </span>
                      <input type="text" v-model="localId" placeholder="示例：34020000002000000001">（长度为20位）
                    </li>
                    <li>
                      <span style="color: #99c9fa">
                        <b class="must">*</b>
                        天网服务IP：
                        <i></i>
                      </span>
                      <input type="text" v-model="localIp" placeholder="示例：192.168.102.33">
                    </li>
                    <li>
                      <span style="color: #99c9fa" class="span">
                        <b class="must">*</b>
                        天网服务端口：
                        <i></i>
                      </span>
                      <input type="text" v-model="localPort" placeholder="示例：5080">
                    </li>
                    <li>
                      <span>
                        心跳超时：
                        <i></i>
                      </span>
                      <input type="text" v-model="heartOverTime">
                    </li>
                    <li>
                      <span>
                        是否检测鉴权：
                        <i></i>
                      </span>
                      <input type="text" v-model="authentication">
                    </li>
                    <li>
                      <span>
                        设备查询超时：
                        <i></i>
                      </span>
                      <input type="text" v-model="selectOverTime">
                    </li>
                    <li>
                      <span>
                        码流超时：
                        <i></i>
                      </span>
                      <input type="text" v-model="bitOverTime">
                    </li>
                    <li>
                      <span>
                        指令超时：
                        <i></i>
                      </span>
                      <input type="text" v-model="directiverOverTime">
                    </li>
                  </ul>
                </div>
                <div class="navBar-footer allequally">
                  <p class="allequally">
                    <span>
                      对接名称：
                      <i></i>
                    </span>
                    <input type="text" v-model="abutmentName">
                  </p>
                  <p class="allequally">
                    <span style="color: #99c9fa">
                      <b class="must">*</b>
                      下级平台ID：
                      <i></i>
                    </span>
                    <input type="text" v-model="juniorId" placeholder="示例：34030102001110000002">（长度为20位）
                  </p>
                  <ul>
                    <li>
                      <span style="color: #99c9fa">
                        <b class="must">*</b>
                        下级平台IP：
                        <i></i>
                      </span>
                      <input type="text" v-model="juniorIp" placeholder="示例：192.168.102.78">
                    </li>
                    <li>
                      <span style="color: #99c9fa">
                        <b class="must">*</b>
                        下级平台端口：
                        <i></i>
                      </span>
                      <input type="text" v-model="juniorPort" placeholder="示例：5060">
                    </li>
                    <li>
                      <span>
                        用户名：
                        <i></i>
                      </span>
                      <input type="text" v-model="userName">
                    </li>
                    <li>
                      <span style="color: #99c9fa">
                        <b class="must">*</b>
                        密码：
                        <i></i>
                      </span>
                      <input type="text" v-model="password" placeholder="示例：12345678">
                    </li>
                  </ul>
                  <div class="btnOne">
                    <el-button
                      type="primary"
                      class="searchBtn"
                      size="small"
                      @click="gbssearchBtn"
                    >提交</el-button>
                    <el-button type="warning" class="tryBtn" size="small" @click="gbsresetBtn">重置</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="转发设置" name="second">
              <div class="tab2 allequally" style="height: 2.7rem">
                <p>媒体转发服务器（本地平台）配置</p>
                <li>
                  <span style="color: #99c9fa">
                    <b class="must">*</b>
                    转发服务器IP：
                    <i></i>
                  </span>
                  <input type="text" v-model="relayServerIp" placeholder="示例：192.168.102.33">
                </li>
                <li>
                  <span>
                    转发服务器端口：
                    <i></i>
                  </span>
                  <input type="text" v-model="relayServerPort">
                </li>
                <p>媒体转发服务器（下级平台）接收配置</p>
                <li>
                  <span style="color: #99c9fa">
                    <b class="must">*</b>
                    接收IP：
                    <i></i>
                  </span>
                  <input type="text" v-model="recepServerIp" placeholder="示例：192.168.102.33">
                </li>
                <li class="eclectic">
                  <span>
                    接收端口：
                    <i></i>
                  </span>
                  <input type="text" v-model="recepServerPortMin"> -
                  <input type="text" v-model="recepServerPortMax">
                </li>
                <p>媒体转发服务器发送（客户端）配置</p>
                <li>
                  <span style="color: #99c9fa">
                    <b class="must">*</b>
                    发送IP：
                    <i></i>
                  </span>
                  <input type="text" v-model="sendServerIp" placeholder="示例：192.168.102.33">
                </li>
                <li class="eclectic">
                  <span>
                    发送端口：
                    <i></i>
                  </span>
                  <input type="text" v-model="sendServerPortMin"> -
                  <input type="text" v-model="sendServerPortMax">
                </li>
                <div class="keephold">
                  <el-button type="primary" class="searchBtn" size="small" @click="saveDeploy">保存</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="状态检查" name="third">
              <div class="mb-10">
                <span>平台在线状态：</span>
                <span
                  style="margin-right: 0.2rem"
                  :class="online == 'true' ? '' : 'styles'"
                >{{online | onlineStatus}}</span>
                <el-button
                  type="primary"
                  class="searchBtn"
                  size="small"
                  title="查看下级平台列表"
                  @click="thirdData"
                >更新</el-button>
                <!-- <el-button
              type="primary"
              class="searchBtn"
              size="small"
              title="测试天网实时视频"
              @click="testline"
                >测试</el-button>-->
              </div>
              <el-table
                :data="onlineData"
                style="width: 100%"
                v-loading="loading2"
                element-loading-text="加载中"
                element-loading-background="rgba(255,255,255,0.4)"
              >
                <el-table-column show-overflow-tooltip prop="name" label="设备名称" width="400"></el-table-column>
                <el-table-column show-overflow-tooltip prop="id" label="设备ID"></el-table-column>
                <el-table-column show-overflow-tooltip width="180" label="是否在线">
                  <template slot-scope="scope" class="fff200">
                    <span
                      :class="scope.row.on == 'false' ? 'styles' : ''"
                    >{{scope.row.on | onlineStatus}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="日志查看" name="fourth">
              <el-table :data="logData" style="width: 100%" height="450">
                <el-table-column show-overflow-tooltip prop label="日志名称">
                  <template slot-scope="scope">
                    <span>{{scope.row}}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="180" label="下载">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      class="searchBtn"
                      size="small"
                      @click="historyLog(scope.row, 1)"
                    >下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="重启天网服务" name="fiveth">
              <el-button
                type="primary"
                class="searchBtn"
                size="small"
                title="重启天网服务"
                @click="gbsrestart"
              >重启</el-button>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="activeName" @tab-click="handleClick" v-if="showGbhss">
            <el-tab-pane label="基本参数配置" name="sixth">
              <div class="navBar-gbhstop">
                <div class="navBar-center allequally">
                  <ul>
                    <li>
                      <span style="color: #99c9fa">
                        <b class="must">*</b>
                        天网服务IP：
                        <i></i>
                      </span>
                      <input type="text" v-model="ip" placeholder="示例：192.168.102.33">
                    </li>
                    <li>
                      <span>
                        天网服务端口：
                        <i></i>
                      </span>
                      <input type="text" v-model="port" placeholder="示例：192.168.102.33">
                    </li>
                    <li>
                      <span>
                        分段并行路数：
                        <i></i>
                      </span>
                      <input type="text" v-model="taskProcessNum">
                    </li>
                    <li>
                      <span>
                        回放倍数：
                        <i></i>
                      </span>
                      <input type="text" v-model="recordRate">
                    </li>
                    <li>
                      <span>
                        指令超时：
                        <i></i>
                      </span>
                      <input type="text" v-model="gbPullerRecviceDataTimeout">
                    </li>
                    <li>
                      <span>
                        国标服务代理端口：
                        <i></i>
                      </span>
                      <input type="text" v-model="gbSignalServiceHttpPort">
                    </li>
                  </ul>
                </div>
                <div>
                  <span>是否启用下载文件前搜索文件是否存在：</span>
                  <el-radio v-model="isEnableDetectRemoteFileIsExist" label="1">启用</el-radio>
                  <el-radio v-model="isEnableDetectRemoteFileIsExist" label="0">不启用</el-radio>
                </div>
                <div class="btnTwo">
                  <el-button
                    type="primary"
                    class="searchBtn"
                    size="small"
                    @click="gbhsssearchBtn"
                  >保存</el-button>
                  <el-button type="warning" class="tryBtn" size="small" @click="gbhssresetBtn">重置</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="历史日志文件查询" name="seventh">
              <el-table :data="logData" style="width: 100%" height="450">
                <el-table-column show-overflow-tooltip prop label="日志名称">
                  <template slot-scope="scope">
                    <span>{{scope.row}}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="180" label="下载">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      class="searchBtn"
                      size="small"
                      @click="historyLog(scope.row, 2)"
                    >下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="重启天网辅助服务" name="eighth">
              <el-button
                type="primary"
                class="searchBtn"
                size="small"
                title="重启天网辅助服务"
                @click="gbhssrestart"
              >重启</el-button>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="activeName" @tab-click="handleClick" v-if="showGbrealtime">
            <el-tab-pane label="基本参数配置" name="eighth">
              <div class="navBar-gbhstop">
                <div class="navBar-center gbreally">
                  <ul>
                    <!-- <li>
                    <span style="color: #99c9fa">
                      <b class="must">*</b>
                      本地服务ip：
                      <i></i>
                    </span>
                    <input type="text" v-model="ip" placeholder="示例：0.0.0.0">
                    </li>-->
                    <li>
                      <span style="color: #99c9fa">
                        <b class="must">*</b>
                        本地服务端口：
                        <i></i>
                      </span>
                      <input type="text" v-model="port" placeholder="示例：13106">
                    </li>
                    <li>
                      <span>
                        单次请求视频最大通道数：
                        <i></i>
                      </span>
                      <input type="text" v-model="visitVideoMaxChannelNum">
                    </li>
                    <li>
                      <span>
                        分段打包时间：
                        <i></i>
                      </span>
                      <input type="text" v-model="segmentTimeSeconds">
                      <i>秒</i>
                    </li>
                    <li>
                      <span>
                        国标拉流超时时间：
                        <i></i>
                      </span>
                      <input type="text" v-model="gbPullerRealtimeTimeout">
                    </li>
                    <li>
                      <span>
                        拉流视频临时存储路径：
                        <i></i>
                      </span>
                      <input type="text" v-model="gbPullerRealtimeStoreFilePath">
                    </li>
                    <li>
                      <span>
                        代理接口获取设备在线状态：
                        <i></i>
                      </span>
                      <el-select v-model="getDeviceStatusByProxy" placeholder="请选择">
                        <el-option value="0" label="在线模式"></el-option>
                        <el-option value="1" label="启用代理接口获取设备在线状态"></el-option>
                      </el-select>
                    </li>
                    <li>
                      <span>
                        国标服务ip：
                        <i></i>
                      </span>
                      <input type="text" v-model="gbSignalServiceIp">
                    </li>
                    <li>
                      <span>
                        国标服务端口：
                        <i></i>
                      </span>
                      <input type="text" v-model="gbSignalServicePort">
                    </li>
                    <li>
                      <span>
                        国标服务代理端口：
                        <i></i>
                      </span>
                      <input type="text" v-model="gbSignalServiceHttpPort">
                    </li>
                    <li>
                      <span>
                        上传文件最大任务数：
                        <i></i>
                      </span>
                      <input type="text" v-model="uploadFileMaxTaskNum">
                    </li>
                    <li>
                      <span>
                        http代理地址：
                        <i></i>
                      </span>
                      <input type="text" v-model="ftpRedirectUrl">
                    </li>
                    <li>
                      <span>
                        是否保存拉流视频文件：
                        <i></i>
                      </span>
                      <el-radio v-model="gbPullerRealtimeIsSaveFile" :label="1">保存</el-radio>
                      <el-radio v-model="gbPullerRealtimeIsSaveFile" :label="0">不保存</el-radio>
                    </li>
                    <!-- <li>
                    <span>
                      是否ftp命令上传：
                      <i></i>
                    </span>
                    <el-radio v-model="isFtpCmdUpload" :label="1">是</el-radio>
                    <el-radio v-model="isFtpCmdUpload" :label="0">否</el-radio>
                    </li>-->
                  </ul>
                </div>
                <div class="btnTwo">
                  <el-button type="primary" class="searchBtn" size="small" @click="gbrealtimeBtn">保存</el-button>
                  <el-button type="warning" class="tryBtn" size="small" @click="gbhssresetBtn">重置</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="历史日志文件查询" name="nineth">
              <el-table :data="historyData" style="width: 100%" height="450">
                <el-table-column show-overflow-tooltip prop label="日志名称">
                  <template slot-scope="scope">
                    <span>{{scope.row}}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="180" label="下载">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      class="searchBtn"
                      size="small"
                      @click="historyLog(scope.row, 3)"
                    >下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="重启天网实时拉流服务" name="tenth">
              <el-button
                type="primary"
                class="searchBtn"
                size="small"
                title="重启天网实时拉流服务"
                @click="resetNet"
              >重启</el-button>
            </el-tab-pane>
          </el-tabs>
          <span class="remark">备注：*为必填项，灰色的使用默认值。</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      serverIp: "", // 服务IP
      serverPort: "", // 服务端口
      proxyPort: "", // 代理端口
      localId: "", // 本地平台ID
      localIp: "", // 本地平台IP,
      localPort: "", // 本地平台端口
      heartOverTime: "", // 心跳超市
      authentication: "", // 1/0，是否检测鉴权
      selectOverTime: "", // 设备查询超时
      bitOverTime: "", // 码流超时
      directiverOverTime: "", //指令超时
      abutmentName: "", // 对接名称
      juniorId: "", // 下级平台ID
      juniorIp: "", // 下级平台IP
      juniorPort: "", // 下级平台端口
      userName: "", // 用户名
      password: "", // 密码
      relayServerIp: "", // 转发服务器IP
      relayServerPort: "", // 转发服务器端口
      recepServerIp: "", // 接收IP
      recepServerPortMin: "", // 接收端口(最小值，比如51000),
      recepServerPortMax: "", // 接收端口(最大值，比如51900),
      sendServerIp: "", // 发送IP
      sendServerPortMin: "", // 发送端口(最小值，比如52000)
      sendServerPortMax: "", // 发送端口(最大值，比如52900)
      smsModuleUrl: "",
      loading: false,
      onlineData: [],
      online: "",
      loading2: false,
      logData: [],
      showGbs: true,
      showGbhss: false,
      showGbrealtime: false,
      checked: true,
      ip: "", //本地服务ip
      port: "", //本地服务端口
      taskProcessNum: "", //处理大分段并行路数，默认1
      recordRate: "", //回放倍速，默认8
      gbPullerRecviceDataTimeout: "", //国标拉流接收数据超时时间，单位为秒,默认30
      isEnableDetectRemoteFileIsExist: "1", //是否启用下载文件前搜索文件是否存在(1:启用;0:不启用)（遵义熙菱天网平台必现使用0）
      gbSignalServiceHttpPort: "", //国标服务代理端口
      visitVideoMaxChannelNum: "", //单次请求视频最大通道数,
      segmentTimeSeconds: "", //分段打包时间,默认300秒
      gbPullerRealtimeTimeout: "", //国标拉流超时时间,默认60秒
      gbPullerRealtimeStoreFilePath: "", //拉流视频临时存储路径
      gbPullerRealtimeIsSaveFile: "1", //是否保存拉流视频文件,1：保存，0：不保存。
      getDeviceStatusByProxy: "0", //是否启用代理接口获取设备在线状态，默认1。1：代理接口获取设备在线状态，0：为一直在线模式
      gbSignalServiceIp: "", //国标服务ip
      gbSignalServicePort: "", //国标服务端口，默认5000
      gbSignalServiceHttpPort: "", //国标服务代理端口
      isFtpCmdUpload: "1", //是否ftp命令上传,1:是；0：否
      uploadFileMaxTaskNum: "", //上传文件最大任务数
      ftpRedirectUrl: "", //ftp文件http代理地址
      logData: [],
      historyData: [],
      orderFlag: "primary",
      navFlag: "default",
      realtimeFlag: "default",
      lineLoad: false
    };
  },
  watch: {},
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.smsModuleUrl = sessionStorage.getItem("smsModuleUrl");
    this.queryData();
  },
  destroyed() {},
  mixins: [],
  filters: {
    onlineStatus(val) {
      if (val == "true") {
        return "在线";
      } else {
        return "离线";
      }
    }
  },
  methods: {
    ghsFirst() {
      this.showGbs = true;
      this.showGbhss = false;
      this.showGbrealtime = false;
      this.activeName = "first";
      this.queryData();
      this.orderFlag = "primary";
      this.navFlag = "default";
      this.realtimeFlag = "default";
    },
    gbhssFirst() {
      this.showGbs = false;
      this.showGbhss = true;
      this.showGbrealtime = false;
      this.activeName = "sixth";
      this.sixData();
      this.orderFlag = "default";
      this.navFlag = "primary";
      this.realtimeFlag = "default";
    },
    gbrealtimeFirst() {
      this.showGbs = false;
      this.showGbhss = false;
      this.showGbrealtime = true;
      this.activeName = "eighth";
      this.realtimeData();
      this.orderFlag = "default";
      this.navFlag = "default";
      this.realtimeFlag = "primary";
    },
    // tab切换
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.queryData();
      } else if (tab.name == "second") {
        this.secondData();
      } else if (tab.name == "third") {
        this.thirdData();
      } else if (tab.name == "fourth") {
        this.fourData();
      } else if (tab.name == "sixth") {
        this.sixData();
      } else if (tab.name == "seventh") {
        this.sevenData();
      } else if (tab.name == "eighth") {
        this.realtimeData();
      } else if (tab.name == "nineth") {
        this.gethistory();
      }
    },
    // 对接设置数据（gbs）
    queryData() {
      let data = {
        type: 0
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/skynet/list", data).then(res => {
        if (res.data.code == 200) {
          this.serverIp = res.data.data.object.serverIp; // 服务IP
          this.serverPort = res.data.data.object.serverPort; // 服务端口
          this.proxyPort = res.data.data.object.proxyPort; // 代理端口
          this.localId = res.data.data.object.localId; // 本地平台ID
          this.localIp = res.data.data.object.localIp; // 本地平台IP
          this.localPort = res.data.data.object.localPort; // 本地平台端口
          this.heartOverTime = res.data.data.object.heartOverTime; // 心跳超市
          this.authentication = res.data.data.object.authentication; // 1/0，是否检测鉴权
          this.selectOverTime = res.data.data.object.selectOverTime; // 设备查询超时
          this.bitOverTime = res.data.data.object.bitOverTime; // 码流超时
          this.directiverOverTime = res.data.data.object.directiverOverTime; //指令超时
          this.abutmentName = res.data.data.object.abutmentName; // 对接名称
          this.juniorId = res.data.data.object.juniorId; // 下级平台ID
          this.juniorIp = res.data.data.object.juniorIp; // 下级平台IP
          this.juniorPort = res.data.data.object.juniorPort; // 下级平台端口
          this.userName = res.data.data.object.userName; // 用户名
          this.password = window.atob(res.data.data.object.password); // 密码
          this.relayServerIp = res.data.data.object.relayServerIp; // 转发服务器IP
          this.relayServerPort = res.data.data.object.relayServerPort; // 转发服务器端口
          this.recepServerIp = res.data.data.object.recepServerIp; // 接收IP
          this.recepServerPortMin = res.data.data.object.recepServerPortMin; // 接收端口(最小值，比如51000)
          this.recepServerPortMax = res.data.data.object.recepServerPortMax; // 接收端口(最大值，比如51900)
          this.sendServerIp = res.data.data.object.sendServerIp; // 发送IP
          this.sendServerPortMin = res.data.data.object.sendServerPortMin; // 发送端口(最小值，比如52000)
          this.sendServerPortMax = res.data.data.object.sendServerPortMax; // 发送端口(最大值，比如52900)
        }
      });
    },
    // 转发设置
    secondData() {
      let data = {
        type: 1
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/skynet/list", data).then(res => {
        if (res.data.code == 200) {
          this.relayServerIp = res.data.data.object.relayServerIp; // 转发服务器IP,
          this.relayServerPort = res.data.data.object.relayServerPort; // 转发服务器端口,
          this.recepServerIp = res.data.data.object.recepServerIp; // 接收IP”,
          this.recepServerPortMin = res.data.data.object.recepServerPortMin; // 接收端口(最小值，比如51000),
          this.recepServerPortMax = res.data.data.object.recepServerPortMax; // 接收端口(最大值，比如51900),
          this.sendServerIp = res.data.data.object.sendServerIp; // 发送IP，
          this.sendServerPortMin = res.data.data.object.sendServerPortMin; // 发送端口(最小值，比如52000),
          this.sendServerPortMax = res.data.data.object.sendServerPortMax; // 发送端口(最大值，比如52900)
        }
      });
    },
    // 查看下级平台列表
    thirdData() {
      this.loading2 = true;
      this.onlineData = [];
      this.online = "";
      console.log(this.online);
      this.$http.post("sms/skynet/query").then(res => {
        this.loading2 = false;
        if (res.data.code == 200) {
          this.online = res.data.data.object.platform.online;
          this.onlineData = res.data.data.object.platform.devices;
        } else {
          this.onlineData = [];
          this.$notify({
            type: "error",
            message: "获取设备失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // （gbs）
    fourData() {
      this.$http.post("/sms/skynet/getLogQuery").then(res => {
        if (res.data.code == 200) {
          this.logData = res.data.data.logFilePaths.reverse();
        } else {
          this.$notify({
            type: "error",
            message: "获取日志列表失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // 提交（gbs）
    gbssearchBtn() {
      let jsonStr = {
        serverIp: this.serverIp, // 服务IP
        serverPort: this.serverPort, // 服务端口
        proxyPort: this.proxyPort, // 代理端口
        localId: this.localId, // 本地平台ID
        localIp: this.localIp, // 本地平台IP
        localPort: this.localPort, // 本地平台端口
        heartOverTime: this.heartOverTime, // 心跳超市
        authentication: this.authentication, // 1/0，是否检测鉴权
        selectOverTime: this.selectOverTime, // 设备查询超时
        bitOverTime: this.bitOverTime, // 码流超时
        directiverOverTime: this.directiverOverTime, //指令超时
        abutmentName: this.abutmentName, // 对接名称
        juniorId: this.juniorId, // 下级平台ID
        juniorIp: this.juniorIp, // 下级平台IP
        juniorPort: this.juniorPort, // 下级平台端口
        userName: this.userName, // 用户名
        password: window.btoa(this.password), // 密码
        relayServerIp: this.relayServerIp, // 转发服务器IP
        relayServerPort: this.relayServerPort, // 转发服务器端口
        recepServerIp: this.recepServerIp, // 接收IP
        recepServerPortMin: this.recepServerPortMin, // 接收端口(最小值，比如51000)
        recepServerPortMax: this.recepServerPortMax, // 接收端口(最大值，比如51900)
        sendServerIp: this.sendServerIp, // 发送IP
        sendServerPortMin: this.sendServerPortMin, // 发送端口(最小值，比如52000)
        sendServerPortMax: this.sendServerPortMax // 发送端口(最大值，比如52900)
      };
      let data = {
        type: 0,
        jsonStr: JSON.stringify(jsonStr)
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/skynet/update", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "保存成功",
            position: "bottom-right",
            duration: 2000
          });
        } else {
          this.$notify({
            type: "error",
            message: "保存失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // 保存（gbs）
    saveDeploy() {
      let jsonStr = {
        relayServerIp: this.relayServerIp, // 转发服务器IP,
        relayServerPort: this.relayServerPort, // 转发服务器端口,
        recepServerIp: this.recepServerIp, // 接收IP”,
        recepServerPortMin: this.recepServerPortMin, // 接收端口(最小值，比如51000),
        recepServerPortMax: this.recepServerPortMax, // 接收端口(最大值，比如51900),
        sendServerIp: this.sendServerIp, // 发送IP，
        sendServerPortMin: this.sendServerPortMin, // 发送端口(最小值，比如52000),
        sendServerPortMax: this.sendServerPortMax // 发送端口(最大值，比如52900)
      };
      let data = {
        type: 1,
        jsonStr: JSON.stringify(jsonStr)
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/skynet/update", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "保存成功",
            position: "bottom-right",
            duration: 2000
          });
        } else {
          this.$notify({
            type: "error",
            message: "保存失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // 保存（gbhss）
    gbhsssearchBtn() {
      let jsonStr = {
        ip: this.ip, //本地服务ip
        port: this.port, //本地服务端口
        taskProcessNum: this.taskProcessNum, //处理大分段并行路数，默认1
        recordRate: this.recordRate, //回放倍速，默认8
        gbPullerRecviceDataTimeout: this.gbPullerRecviceDataTimeout, //国标拉流接收数据超时时间，单位为秒,默认30
        gbSignalServiceHttpPort: this.gbSignalServiceHttpPort, //国标服务代理端口
        isEnableDetectRemoteFileIsExist: Number(
          this.isEnableDetectRemoteFileIsExist
        )
      };
      let data = {
        jsonStr: JSON.stringify(jsonStr)
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/skynet/gbsConfig", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "保存成功",
            position: "bottom-right",
            duration: 2000
          });
        } else {
          this.$notify({
            type: "error",
            message: "保存失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // 重启 （gbs）
    gbsrestart() {
      this.$myconfirm({
        type: "提示",
        msg: "是否确认重启天网服务？",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          this.lineLoad = true;
          this.loading = true;
          this.$http.post("sms/skynet/restart").then(res => {
            this.lineLoad = false;
            this.loading = false;
            if (res.data.code == 200) {
              this.$notify({
                type: "success",
                message: "重启成功",
                position: "bottom-right",
                duration: 2000
              });
            } else {
              this.$notify({
                type: "error",
                message: "重启失败",
                position: "bottom-right",
                duration: 2000
              });
            }
          });
        })
        .catch(() => {});
    },
    gohome() {
      this.$router.push({
        path: "/videoStrucPlat",
        query: { menuCode: "700" }
      });
    },
    // 重置（gbs）
    gbsresetBtn() {
      this.queryData();
    },
    // 基本参数查询（gbhss）
    sixData() {
      this.$http.post("sms/skynet/gbsQuery").then(res => {
        if (res.data.code == 200) {
          this.ip = res.data.data.ip; //本地服务ip
          this.port = res.data.data.port; //本地服务端口
          this.taskProcessNum = res.data.data.taskProcessNum; //处理大分段并行路数，默认1
          this.recordRate = res.data.data.recordRate; //回放倍速，默认8
          this.gbPullerRecviceDataTimeout =
            res.data.data.gbPullerRecviceDataTimeout; //国标拉流接收数据超时时间，单位为秒,默认30
          this.isEnableDetectRemoteFileIsExist = JSON.stringify(
            res.data.data.isEnableDetectRemoteFileIsExist
          ); //是否启用下载文件前搜索文件是否存在(1=启用;0=不启用)（遵义熙菱天网平台必现使用0）
          this.gbSignalServiceHttpPort = res.data.data.gbSignalServiceHttpPort; //国标服务代理端口
        }
      });
    },
    // 基本参数查询（gbrealtime）
    realtimeData() {
      this.$http.post("sms/skynet/realTimeQuery").then(res => {
        if (res.data.code == 200) {
          this.ip = res.data.data.ip; //本地服务ip
          this.port = res.data.data.port; //本地服务端口
          this.visitVideoMaxChannelNum = res.data.data.visitVideoMaxChannelNum; //单次请求视频最大通道数,
          this.segmentTimeSeconds = res.data.data.segmentTimeSeconds; //分段打包时间; 默认300秒
          this.gbPullerRealtimeTimeout = res.data.data.gbPullerRealtimeTimeout; //国标拉流超时时间; 默认60秒
          this.gbPullerRealtimeStoreFilePath =
            res.data.data.gbPullerRealtimeStoreFilePath; //拉流视频临时存储路径
          this.gbPullerRealtimeIsSaveFile =
            res.data.data.gbPullerRealtimeIsSaveFile; //是否保存拉流视频文件; 1：保存，0：不保存。
          this.getDeviceStatusByProxy = JSON.stringify(
            res.data.data.getDeviceStatusByProxy
          ); //是否启用代理接口获取设备在线状态，默认1。1：代理接口获取设备在线状态，0：为一直在线模式
          this.gbSignalServiceIp = res.data.data.gbSignalServiceIp; //国标服务ip
          this.gbSignalServicePort = res.data.data.gbSignalServicePort; //国标服务端口，默认5000
          this.gbSignalServiceHttpPort = res.data.data.gbSignalServiceHttpPort; //国标服务代理端口
          this.isFtpCmdUpload = res.data.data.isFtpCmdUpload; //是否ftp命令上传; 1:是；0：否
          this.uploadFileMaxTaskNum = res.data.data.uploadFileMaxTaskNum; //上传文件最大任务数
          this.ftpRedirectUrl = res.data.data.ftpRedirectUrl; //ftp文件http代理地址
        }
      });
    },
    // 历史日志文件查询（gbhss）
    sevenData() {
      this.$http.post("sms/skynet/gbsLogQuery").then(res => {
        if (res.data.code == 200) {
          this.logData = res.data.data.logFilePaths.reverse();
        } else {
          this.$notify({
            type: "error",
            message: "获取日志列表失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // 历史日志文件查询（gbrealtime）
    gethistory() {
      this.$http.post("sms/skynet/realTimeLogQuery").then(res => {
        if (res.data.code == 200) {
          this.historyData = res.data.data.logFilePaths.reverse();
        } else {
          this.$notify({
            type: "error",
            message: "获取日志列表失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // 历史日志文件下载
    historyLog(row, urlType) {
      console.log(row);
      // 设置a标签的href属性
      let link = document.createElement("a");
      if (urlType == 1) {
        // gbs
        link.href = `http://${
          this.smsModuleUrl
        }/skynet/logDownload?logFilePath=${row}&urlType=${urlType}`;
      } else if (urlType == 2) {
        // gbhss
        link.href = `http://${
          this.smsModuleUrl
        }/skynet/logDownload?logFilePath=${row}&urlType=${urlType}`;
      } else if (urlType == 3) {
        // gbrealtime
        link.href = `http://${
          this.smsModuleUrl
        }/skynet/logDownload?logFilePath=${row}&urlType=${urlType}`;
      }
      link.click();
    },
    // // 下载日志（gbs）
    // gbsdownloadLog(row) {
    //   console.log(row);
    //   // 设置a标签的href属性
    //   let link = document.createElement("a");
    //   link.href = `http://${
    //     this.smsModuleUrl
    //   }/skynet/logList?logFilePath=${row}`;
    //   link.click();
    // },
    // // 历史日志文件下载（gbhss）
    // gbhssdownloadLog(row) {
    //   console.log(row);
    //   // 设置a标签的href属性
    //   let link = document.createElement("a");
    //   link.href = `http://${
    //     this.smsModuleUrl
    //   }/skynet/gbsLogDownload?logFilePath=${row}`;
    //   link.click();
    // },
    // // 历史日志文件下载（gbrealtime）
    // historyLog(row) {
    //   console.log(row);
    //   // 设置a标签的href属性
    //   let link = document.createElement("a");
    //   link.href = `http://${
    //     this.smsModuleUrl
    //   }/gbrealtime/log/download?logFilePath=${row}&urlType=${urlType}`;
    //   link.click();
    // },
    // 保存（gbrealtime）
    gbrealtimeBtn() {
      let data = {
        ip: this.ip, //本地服务ip
        port: this.port, //本地服务端口
        visitVideoMaxChannelNum: this.visitVideoMaxChannelNum, //单次请求视频最大通道数,
        segmentTimeSeconds: this.segmentTimeSeconds, //分段打包时间,默认300秒
        gbPullerRealtimeTimeout: this.gbPullerRealtimeTimeout, //国标拉流超时时间,默认60秒
        gbPullerRealtimeStoreFilePath: this.gbPullerRealtimeStoreFilePath, //拉流视频临时存储路径
        gbPullerRealtimeIsSaveFile: this.gbPullerRealtimeIsSaveFile, //是否保存拉流视频文件,1：保存，0：不保存。
        getDeviceStatusByProxy: this.getDeviceStatusByProxy, //是否启用代理接口获取设备在线状态，默认1。1：代理接口获取设备在线状态，0：为一直在线模式
        gbSignalServiceIp: this.gbSignalServiceIp, //国标服务ip
        gbSignalServicePort: this.gbSignalServicePort, //国标服务端口，默认5000
        gbSignalServiceHttpPort: this.gbSignalServiceHttpPort, //国标服务代理端口
        isFtpCmdUpload: this.isFtpCmdUpload, //是否ftp命令上传,1:是；0：否
        uploadFileMaxTaskNum: this.uploadFileMaxTaskNum, //上传文件最大任务数
        ftpRedirectUrl: this.ftpRedirectUrl //ftp文件http代理地址
      };
      // let data = {
      //   jsonStr: JSON.stringify(jsonStr)
      // };
      data = this.$qs.stringify(data);
      this.$http.post("sms/skynet/realTimeConfig", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "保存成功",
            position: "bottom-right",
            duration: 2000
          });
        } else {
          this.$notify({
            type: "error",
            message: "保存失败",
            position: "bottom-right",
            duration: 2000
          });
        }
      });
    },
    // 重启天网历史拉流服务（gbhsss）
    gbhssrestart() {
      this.$myconfirm({
        type: "提示",
        msg: "是否确认重启天网辅助服务？",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          this.loading = true;
          this.lineLoad = true;
          this.$http.post("sms/skynet/gbsRestart").then(res => {
            this.loading = false;
            this.lineLoad = false;
            if (res.data.code == 200) {
              this.$notify({
                type: "success",
                message: "重启成功",
                position: "bottom-right",
                duration: 2000
              });
            } else {
              this.$notify({
                type: "error",
                message: "重启失败",
                position: "bottom-right",
                duration: 2000
              });
            }
          });
        })
        .catch(() => {});
    },
    // 重启天网历史拉流服务（gbrealtime）
    resetNet() {
      this.$myconfirm({
        type: "提示",
        msg: "是否重启天网实时拉流服务？",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          this.loading = true;
          this.lineLoad = true;
          this.$http.post("sms/skynet/realTimeRestart").then(res => {
            this.loading = false;
            this.lineLoad = false;
            if (res.data.code == 200) {
              this.$notify({
                type: "success",
                message: "重启成功",
                position: "bottom-right",
                duration: 2000
              });
            } else {
              this.$notify({
                type: "error",
                message: "重启失败",
                position: "bottom-right",
                duration: 2000
              });
            }
          });
        })
        .catch(() => {});
    },
    // 重置
    gbhssresetBtn() {
      this.sixData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/manage_third.css";
@import "../../assets/css/commom.css";
.onlinecoll {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.onlinecoll .el-dialog,
.onlinecoll /deep/ .el-dialog {
  margin-top: 10vh;
}
.onlinecoll .el-dialog__header {
  font-size: 0.16rem;
}
.ml-10 {
  margin-left: 0.1rem;
}
.mb-10 {
  margin-bottom: 0.1rem;
}
.main {
  width: 60%;
  height: 7rem;
  top: 1.3rem;
  margin: 0 auto;
  input {
    width: 2.5rem;
    height: 0.3rem;
    line-height: 0.3rem;
    border-radius: 3px;
    padding-left: 0.1rem;
    margin-bottom: 0.1rem;
  }
}
.main /deep/ .el-tabs__item {
  color: #99c9fa;
  font-size: 0.14rem;
}
.navBar-center {
  margin-top: 0.2rem;
  li {
    width: 49%;
    display: inline-block;
    margin-bottom: 0.1rem;
  }
}
.navBar-footer {
  li {
    width: 49%;
    display: inline-block;
    margin-bottom: 0.1rem;
  }
  .el-checkbox {
    margin-left: 34%;
    color: #99c9fa;
  }
}
.tab2 {
  p {
    margin: 0.1rem 0;
  }
  li {
    display: inline-block;
    width: 49%;
  }
  .eclectic {
    input {
      width: 1.5rem;
    }
  }
}
.btnTwo {
  margin-top: 0.3rem;
  margin-left: 35%;
}
.btnOne {
  margin-left: 35%;
}
.keephold {
  position: absolute;
  bottom: 0;
  left: 40%;
}
.allequally {
  span {
    width: 1.6rem;
    line-height: 0.25rem;
    height: 0.25rem;
    float: left;
    color: darkgrey;
    text-align: justify;
    i {
      width: 100%;
      display: inline-block;
    }
  }
}

.gbreally {
  span {
    width: 2.6rem;
    line-height: 0.25rem;
    height: 0.25rem;
    float: left;
    color: darkgrey;
    text-align: justify;
    i {
      width: 100%;
      display: inline-block;
    }
  }
}
.must {
  color: red;
}
.styles {
  color: red;
}
.remark {
  position: absolute;
  top: 0.95rem;
  left: 55%;
  color: red;
}
.menus .el-button--default {
  color: #99c9fa;
}
.menus .el-button--primary {
  color: #2e93fb;
}
.menus .el-button {
  padding: 0.1rem 0.3rem;
  font-size: 0.14rem;
  border: 0px;
  background: url("../../assets/images/videoNewImg/btnhover.png") no-repeat
    center center / 100% 100%;
}
.menus .el-button:hover {
  background: url("../../assets/images/videoNewImg/btnnormal.png") no-repeat
    center center / 100% 100%;
}
.menus .el-button--default {
  border: 0px !important;
  background-color: transparent !important;
}
.menus .el-button--default:hover {
  border: 0px !important;
  background-color: transparent !important;
}
.theme-blue .el-radio {
  color: #99c9fa;
  margin-top: 6px;
}
.el-select {
  width: 2.5rem;
}
</style>
