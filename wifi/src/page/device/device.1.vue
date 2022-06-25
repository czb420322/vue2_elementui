<template>
  <div class="onlinecoll">
    <!-- <headers/> -->
    <!-- <div class="topInfo">
        <router-link class="sysname" :to="{path:'/manage',query:{menuCode:600}}">系统管理</router-link>
        <p class="childname">设备管理</p>
    </div> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/manage',query:{menuCode:600}}">系统管理首页 > </router-link>
      <p class="sysname">&nbsp;设备管理</p>
    </div>
    <div class="main">
      <div class="mainleft" v-show="flag">
        <el-tabs v-model="initTab" type="border-card" @tab-click="handleClick">
          <el-tab-pane v-if="pageIndex == 1 || pageIndex == 3" name="video">
            <span slot="label"><i class="el-icon-date"></i> 天网</span>
            <div class="ss">
              <el-input v-model.trim="filterText" placeholder="请输入查找内容">
              </el-input>
              <i class="searchBtn el-icon-search"></i>
            </div>
            <el-tree :data="videoList" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" default-expand-all ref="tree2" highlight-current>
              <span  :class="{spanellipsis : data.isOnline == 1 || data.isOnline === undefined,spancolor : data.isOnline == 2 || data.isOnline == 9 || data.isOnline === null}" slot-scope="{ node, data }">
                <span :title="node.label">{{ node.label }}</span>
              </span>
            </el-tree>
          </el-tab-pane>
          <el-tab-pane v-if="pageIndex == 1 || pageIndex == 3" name="people">
            <span slot="label"><i class="el-icon-date"></i>社会面</span>
            <div class="ss">
              <el-input v-model.trim="filterText" placeholder="请输入查找内容">
              </el-input>
              <i class="searchBtn el-icon-search"></i>
            </div>
            <el-tree :data="societyData" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" default-expand-all ref="tree4" highlight-current></el-tree>
          </el-tab-pane>
          <el-tab-pane v-if="pageIndex == 1 || pageIndex == 3" label="人像" name="social">
            <span slot="label"><i class="el-icon-date"></i>人像</span>
            <div class="ss">
              <el-input v-model.trim="filterText" placeholder="请输入查找内容">
              </el-input>
              <el-button class="searchBtn el-icon-search"></el-button>
            </div>
            <el-tree :data="faceList" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" default-expand-all ref="tree5" highlight-current></el-tree>
          </el-tab-pane>
          <el-tab-pane v-if="pageIndex == 1 || pageIndex == 2" name="vehicle">
            <span slot="label"><i class="el-icon-date"></i> 车辆</span>
            <div class="ss">
              <el-input v-model.trim="filterText" placeholder="请输入查找内容">
              </el-input>
              <el-button class="searchBtn el-icon-search"></el-button>
            </div>
            <el-tree :data="mountList" :props="defaultProps_1" :filter-node-method="filterNode" @node-click="handleNodesClick" default-expand-all ref="tree3" highlight-current></el-tree>
          </el-tab-pane>

        </el-tabs>
      </div>
      <div class="mainright">
        <div class="mapContent" id="allmap"></div>
        <p @click="changemleft">收起设备</p>
        <img class="dingwei" src="../../assets/case/quickPos.png" @click="getinit" />
        <div class="point">
          <span>经度：{{point.lng}}</span><br>
          <span>纬度：{{point.lat}}</span>
        </div>
      </div>
    </div>

    <!-- 设备信息 -->
    <el-dialog class="dialog2" width="10rem" title="修改设备信息"
    :close-on-click-modal="false"
    :close-on-press-escape="false" @close="addFacility" :visible.sync="updatevideo">
      <span v-if="updatevideo">
        <ul class="addvideo">
          <li>
            <span><b class="mustwrite">*</b>设备名称：</span>
            <input type="text" maxlength="50" v-model.trim='deviceName' @blur="changename" placeholder="请输入设备名称"/>
            <p v-show="dnerr">请输入设备名称</p>
          </li>
          <li>
            <span>设备端口：</span>
            <input type="text" maxlength="30" v-model.trim="devicePort" @blur="changeport" placeholder="请输入设备端口"/>
            <p v-show="dperr">端口格式：0-65535</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>设备经度：</span>
            <input type="text" v-model.trim="point.lng" placeholder="请输入设备经度" @blur="changelng" readonly="readonly">
            <p v-show="dplngerr">请输入设备经度</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>设备纬度：</span>
            <input type="text" v-model.trim="point.lat" placeholder="请输入设备纬度" @blur="changelat" readonly="readonly">
            <p v-show="dplaterr">请输入设备纬度</p>
          </li>
          <li>
            <span>设备账号：</span>
            <input type="text" maxlength="60" v-model.trim="userId" placeholder="请输入设备账号"/>
          </li>
          <li>
            <span>设备密码：</span>
            <input type="password" maxlength="30" v-model.trim="password" placeholder="请输入设备密码"/>
          </li>
          <li>
            <span>Ip地址：</span>
            <input type="text" maxlength="30" v-model.trim="deviceIP" @blur="changeip" placeholder="请输入Ip地址"/>
            <p v-show="dpIderr">IP格式：XXX.XXX.XXX.XXX</p>
          </li>
          <li>
            <span>设备型号：</span>
            <input type="text"  v-model.trim="deviceModel" maxlength="100" placeholder="请输入设备型号"/>
            <!-- <p v-show="dpmoerr">请输入设备型号</p> -->
          </li>
          <li>
            <span>Rtsp地址：</span>
            <input type="text" maxlength="512" v-model.trim="deviceRtsp" @blur="changertsp" placeholder="请输入Rtsp地址"/>
          </li>
          <li>
            <span>设备编号：</span>
            <input type="text" maxlength="20" v-model.trim="deviceApe" @blur="changeape" placeholder="请输入设备编号"/>
            <p v-show="carape">请输入设备编号</p>
          </li>
          <li class="lastaddvideo">
            <span><b class="mustwrite">*</b>详细位置：</span>
            <province ref='province'></province>
            <p v-show="dchange">请输入详细位置</p>
          </li>

        </ul>
      </span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFacility"></el-button>
        <el-button @click="updateshebei"></el-button>
      </div>
    </el-dialog>

    <!-- 新增设备 -->
    <el-dialog class="dialog2" title="新增设备信息" :visible.sync="addVideoData"
    :close-on-click-modal="false"
    :close-on-press-escape="false" @close="addFacility" width="10rem">
      <span v-if="addVideoData">
        <ul class="addvideo" ref="addvideo">
          <li>
            <span><b class="mustwrite">*</b>设备名称：</span>
            <input type="text" maxlength="50" v-model.trim='deviceName' @blur="changename" placeholder="请输入设备名称"/>
            <p v-show="dnerr">请输入设备名称</p>
          </li>
          <li>
            <span>设备端口：</span>
            <input type="text" maxlength="30" v-model.trim="devicePort" @blur="changeport" placeholder="请输入设备端口"/>
            <p v-show="dperr">端口格式：0-65535</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>设备经度：</span>
            <input type="text" v-model.trim="point.lng" @blur="changelng" placeholder="请输入设备经度" readonly="readonly">
            <p v-show="dplngerr">请输入设备经度</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>设备纬度：</span>
            <input type="text" v-model.trim="point.lat" @blur="changelat" placeholder="请输入设备纬度" readonly="readonly">
            <p v-show="dplaterr">请输入设备纬度</p>
          </li>
          <li>
            <span>设备账号：</span>
            <input type="text" maxlength="60" v-model.trim="userId" placeholder="请输入设备账号"/>
          </li>
          <li>
            <span>设备密码：</span>
            <input type="password" maxlength="30" v-model.trim.trim="password" placeholder="请输入设备密码"/>
          </li>
          <li>
            <span>Ip地址：</span>
            <input type="text" maxlength="30" v-model.trim="deviceIP" @blur="changeip" placeholder="请输入Ip地址"/>
            <p v-show="dpIderr">IP格式：XXX.XXX.XXX.XXX</p>
          </li>
          <li>
            <span>设备型号：</span>
            <input type="text" v-model.trim="deviceModel" maxlength="100" placeholder="请输入设备型号"/>
            <!-- <p v-show="dpmoerr">请输入设备型号</p> -->
          </li>
          <li>
            <span>Rtsp地址：</span>
            <input type="text" maxlength="512" v-model.trim="deviceRtsp" @blur="changertsp" placeholder="请输入Rtsp地址"/>
          </li>
          <li>
            <span><b class="mustwrite">*</b>设备编号：</span>
            <input type="text" maxlength="20" v-model.trim="deviceApe" @blur="changeape" placeholder="请输入设备编号"/>
            <p v-show="carape">请输入设备编号</p>
          </li>
          <li class="lastaddvideo">
            <span><b class="mustwrite">*</b>详细位置：</span>
            <province ref='province'></province>
            <!-- <p v-show="dchange">请输入详细位置</p> -->
          </li>

        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFacility"></el-button>
        <el-button @click="addEquiment"></el-button>
      </span>
    </el-dialog>

    <!-- 添加卡口管理 -->
    <el-dialog class="dialog2" title="添加卡口管理" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="addMountData" width="10rem">
      <span v-if="addMountData">
        <ul class="addvideo">
          <li>
            <span><b class="mustwrite">*</b>卡口名称：</span>
            <input type="text" v-model.trim='mountName' @blur="changekname" placeholder="请输入卡口名称"/>
            <p v-show="mtname">请输入卡口名称</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>卡口经度：</span>
            <input type="text" v-model.trim="point.lng" @blur="changelng" placeholder="请输入卡口经度" readonly="readonly">
            <p v-show="dplngerr">请输入卡口经度</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>卡口纬度：</span>
            <input type="text" v-model.trim="point.lat" @blur="changelat" placeholder="请输入卡口纬度" readonly="readonly">
            <p v-show="dplaterr">请输入卡口纬度</p>
          </li>
          <li>
            <span>车道数：</span>
            <input type="text" v-model.trim="mountNum" @blur="changeknum" placeholder="请输入车道数"/>
            <p v-show="mtnum">请输入车道数量</p>
          </li>
          <li>
            <span>卡口状态：</span>
            <el-select v-model.trim='mountstatus'>
              <el-option key="1" label="正常" value="1"></el-option>
              <el-option key="2" label="停用" value="2"></el-option>
              <el-option key="3" label="其他" value="3"></el-option>
            </el-select>
            <!-- <select v-model.trim="mountstatus">
              <option value="1">正常</option>
              <option value="2">停用</option>
              <option value="9">其他</option>
            </select> -->
          </li>
          <li class="lastaddvideo">
            <span><b class="mustwrite">*</b>详细位置：</span>
            <province ref='province'></province>
            <p v-show="dchange">请输入详细位置</p>
          </li>

        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMountData = false"></el-button>
        <el-button @click="addmount"></el-button>
      </span>
    </el-dialog>

    <!-- 修改卡口信息 -->
    <el-dialog class="dialog2" title="修改卡口" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="updateMountData" width="10rem">
      <span v-if="updateMountData">
        <ul class="addvideo">
          <li>
            <span><b class="mustwrite">*</b>卡口名称：</span>
            <input type="text" v-model.trim='mountName' @blur="changekname" placeholder="请输入卡口名称"/>
            <p v-show="mtname">请输入卡口名称</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>卡口经度：</span>
            <input type="text" v-model.trim="point.lng" @blur="changelng" placeholder="请输入卡口经度" readonly="readonly">
            <p v-show="dplngerr">请输入卡口经度</p>
          </li>
          <li>
            <span><b class="mustwrite">*</b>卡口纬度：</span>
            <input type="text" v-model.trim="point.lat" @blur="changelat" placeholder="请输入卡口纬度" readonly="readonly">
            <p v-show="dplaterr">请输入卡口纬度</p>
          </li>
          <li>
            <span>车道数：</span>
            <input type="text" v-model.trim="mountNum" @blur="changeknum" placeholder="请输入车道数"/>
            <p v-show="mtnum">请输入车道数量</p>
          </li>
          <li>
            <span>卡口状态：</span>
            <el-select v-model.trim='mountstatus' placeholder="请选择卡口状态">
              <el-option key="1" label="正常" value="1"></el-option>
              <el-option key="2" label="停用" value="2"></el-option>
              <el-option key="3" label="其他" value="3"></el-option>
            </el-select>
            <!-- <select v-model.trim="mountstatus">
              <option value="1" selected>正常</option>
              <option value="2">停用</option>
              <option value="9">其他</option>
            </select> -->
          </li>
          <li class="lastaddvideo">
            <span><b class="mustwrite">*</b>详细位置：</span>
             <province ref='province'></province>
            <p v-show="dchange">请输入详细位置</p>
          </li>

        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateMountData = false"></el-button>
        <el-button @click="updatemount"></el-button>
      </span>
    </el-dialog>

    <!-- 卡口详情页 -->
    <el-dialog class="dialog3" width="13rem" title="卡口信息" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="outerVisible">
      <div class="kakoumain">
        <p @click='inerVisible=true' class="kakoutitle">卡口信息</p>
        <ul class="kakouinfo">
          <li><span>卡口名称：</span><span>{{this.MountDetails.name}}</span></li>
          <li><span>创建时间：</span><span>{{this.MountDetails.activeTime}}</span></li>
          <li><span>卡口经度：</span><span>{{this.MountDetails.longitude}}</span></li>
          <li><span>卡口纬度：</span><span>{{this.MountDetails.latitude}}</span></li>
          <li><span>卡口地区：</span><span>{{this.MountDetails.place}}</span></li>
          <li><span>卡口数量：</span><span>{{this.cartableData.length}}</span></li>
        </ul>
        <p class="carinfo">卡口信息：</p>
        <el-button id="btn" class="searchBtn" @click="getaddcar">新增设备信息</el-button>
        <el-table ref="outerTable" :data="cartableData" border style="width: 100%" class="tables" height="3rem">
          <div slot="empty">
            <div class="noImg">
              <img src="../../assets/updataImg/NoData.png" />
            </div>
          </div>
          <el-table-column show-overflow-tooltip prop="name" label="设备名称">
          </el-table-column>
          <el-table-column prop="model" show-overflow-tooltip label="设备型号">
          </el-table-column>
          <el-table-column prop="place" label="地区">
          </el-table-column>
          <el-table-column prop="maxSpeed" label="最大速度">
          </el-table-column>
          <el-table-column prop="monitorAreaDesc" show-overflow-tooltip label="抓拍方向">
          </el-table-column>
          <el-table-column prop="laneName" label="车道名称">
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="230">
            <template slot-scope="scope">
              <!-- <el-button type="primary" id="btn" @click="getaddcar(scope.$index,scope.row)">新增</el-button> -->
              <el-button type="warning" id="btn" class="tryBtn" @click="getupdatacar(scope.$index,scope.row)">修改</el-button>
              <el-button type="danger" id="btn" class="delBtn" @click="getdeletecar(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 添加设备 -->
        <el-dialog title="添加设备信息" :visible.sync="addVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :modal-append-to-body='false' width="10rem" class="dialog">
          <div>
            <ul class="addcar">
              <li>
                <span>设备名称：</span>
                <input type="text" v-model.trim='carName' @blur="changecarname" placeholder="请输入设备名称"/>
                <!-- <p v-show="carnerr">请输入设备名称</p> -->
              </li>
              <li>
                <span>设备型号：</span>
                <input type="text" v-model.trim='carmodel' @blur="changecarmodel" placeholder="请输入设备型号"/>
                <!-- <p v-show="carmoerr">请输入设备型号</p> -->
              </li>
              <li>
                <span>设备编号：</span>
                <input type="text" v-model.trim="deviceApe" @blur="changeape" placeholder="请输入设备编号"/>
                <p v-show="carape">请输入设备编号</p>
              </li>
              <li>
                <span>设备经度：</span>
                <input type="text" v-model.trim='carlng' @blur="changelng" readonly placeholder="请输入设备经度"/>
                <p v-show="dplngerr">请输入设备经度</p>
              </li>
              <li>
                <span>设备纬度：</span>
                <input type="text" v-model.trim='carlat' @blur="changelat" readonly placeholder="请输入设备纬度"/>
                <p v-show="dplaterr">请输入设备纬度</p>
              </li>
              <li>
                <span>抓拍方向：</span>
                <el-select v-model.trim='carDirection' placeholder="请选择抓拍方向">
                  <el-option key="1" label="车头" value="1"></el-option>
                  <el-option key="2" label="车尾" value="2"></el-option>
                </el-select>
              </li>
              <li>
                <span>车道方向：</span>
                <el-select v-model.trim='monitorDirection' placeholder="请选择车道方向">
                  <el-option v-for="(item,i) in monitors" :key="i" :label="item.value" :value="item.field"></el-option>
                </el-select>
              </li>
              <li>
                <span>道路名称：</span>
                <input type="text" v-model.trim='laneName' @blur="changecarway" placeholder="请输入车道名称"/>
                <!-- <p v-show="carwayerr">请输入道路名称</p> -->
              </li>
              <li>
                <span>在线离线：</span>
                <el-select v-model.trim='isOnline' placeholder="请选择在线状态">
                  <el-option key="1" label="在线" value="1"></el-option>
                  <el-option key="2" label="离线" value="2"></el-option>
                </el-select>
              </li>
              <li>
                <span>最大限速：</span>
                <input type="num" v-model.trim='maxSpeed' @blur="changecarmax" placeholder="请输入最大限速"/>
              </li>
              <li>
                <span>车道出入城：</span>
                <el-select v-model.trim='cityPass' placeholder="请选择车道出入城状态">
                  <el-option key="1" label="进城" value="1"></el-option>
                  <el-option key="2" label="出城" value="2"></el-option>
                  <el-option key="3" label="非进出城" value="3"></el-option>
                  <el-option key="4" label="进出城混合" value="4"></el-option>
                </el-select>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false"></el-button>
            <el-button @click="addcar"></el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改设备信息" :visible.sync="updateVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :modal-append-to-body='false' class="dialog">
          <div>
            <ul class="addcar">
              <li>
                <span>设备名称：</span>
                <input type="text" v-model.trim='carName' @blur="changecarname" placeholder="请输入设备名称"/>
                <!-- <p v-show="carnerr">请输入设备名称</p> -->
              </li>
              <li>
                <span>设备型号：</span>
                <input type="text" v-model.trim='carmodel' @blur="changecarmodel" placeholder="请输入设备型号"/>
                <!-- <p v-show="carmoerr">请输入设备型号</p> -->
              </li>
              <li>
                <span>设备编号：</span>
                <input type="text" v-model.trim="deviceApe" @blur="changeape" placeholder="请输入设备编号"/>
                <!-- <p v-show="carape">请输入设备编号</p> -->
              </li>
              <li>
                <span>设备经度：</span>
                <input type="text" v-model.trim='carlng' @blur="changelng" readonly placeholder="请输入设备经度"/>
                <!-- <p v-show="dplngerr">请输入设备经度</p> -->
              </li>
              <li>
                <span>设备纬度：</span>
                <input type="text" v-model.trim='carlat' @blur="changelat" readonly placeholder="请输入设备纬度"/>
                <!-- <p v-show="dplaterr">请输入设备纬度</p> -->
              </li>
              <li>
                <span>抓拍方向：</span>
                <el-select v-model.trim='carDirection' placeholder="请选择抓拍方向">
                  <el-option key="1" label="车头" value="1"></el-option>
                  <el-option key="2" label="车尾" value="2"></el-option>
                </el-select>
              </li>
              <li>
                <span>车道方向：</span>
                <el-select v-model.trim='monitorDirection' placeholder="请选择车道方向">
                  <el-option v-for="(item,i) in monitors" :key="i" :label="item.value" :value="item.field"></el-option>
                </el-select>
              </li>
              <li>
                <span>道路名称：</span>
                <input type="text" v-model.trim='laneName' @blur="changecarway" placeholder="请输入道路名称"/>
                <!-- <p v-show="carwayerr">请输入道路名称</p> -->
              </li>
              <li>
                <span>在线离线：</span>
                <el-select v-model.trim='isOnline' placeholder="请选择在线离线">
                  <el-option key="1" label="在线" value="1"></el-option>
                  <el-option key="2" label="离线" value="2"></el-option>
                </el-select>
              </li>
              <li>
                <span>最大限速：</span>
                <input type="num" v-model.trim='maxSpeed' @blur="changecarmax" />
                <!-- <p v-show="carmaxerr">请输入最大速度</p> -->
              </li>
              <li>
                <span>车道出入城：</span>
                <el-select v-model.trim='cityPass' placeholder="请选择车道出入城状态">
                  <el-option key="1" label="进城" value="1"></el-option>
                  <el-option key="2" label="出城" value="2"></el-option>
                  <el-option key="3" label="非进出城" value="3"></el-option>
                  <el-option key="4" label="进出城混合" value="4"></el-option>
                </el-select>
              </li>
            </ul>

          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updateclear"></el-button>
            <el-button @click="updatecar"></el-button>
          </div>
        </el-dialog>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false"></el-button>
        <el-button @click="outerVisible = false"></el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import headers from "../../components/header";
import province from "@/components/province";
import { mapState, mapActions } from "vuex";
let videoIco = require("@/assets/images/device/video.png");
let carIco = require("@/assets/images/device/car.png");
let faceIco = require("@/assets/images/device/face.png");
let RFIDIco = require("@/assets/images/device/RFID.png");
import maps from "../../api/realvideo/map.js";
import realvideo from '../../api/realvideo/realvideo.js'

export default {
  data() {
    return {
      //验证
      dnerr: false,
      dperr: false,
      dplngerr: false,
      dplaterr: false,
      dpusererr: false,
      dppaserr: false,
      dpIderr: false,
      dpmoerr: false,
      dchange: false,
      mtname: false,
      mtnum: false,
      carnerr: false,
      carmoerr: false,
      carape: false,
      carwayerr: false,
      carlneerr: false,
      carmaxerr: false,

      addshebei: this.$storage.getSession("642") != null, // 新增设备的按钮权限
      updateshebeibtn: this.$storage.getSession("643") != null, // 修改设备的按钮权限
      addkakou: this.$storage.getSession("645") != null, // 新增设备的按钮权限
      updatekakoubtn: this.$storage.getSession("647") != null, // 新增设备的按钮权限
      searchkakou: this.$storage.getSession("646") != null, // 新增设备的按钮权限

      outerVisible: false,
      addVisible: false,
      updateVisible: false,
      cartableData: [], // 车辆信息
      updatevideo: false, // 修改视频的模态框
      MountDetails: {}, // 设备的详细信息
      initTab: "video", // 左侧菜单切换的name值 与 index值对应
      index: 1, // 左侧菜单切换的索引
      flag: true, // 设备的收起和显示
      videoList: [], // 视频
      mountList: [], // 车辆
      faceList: [], // 人像
      societyData: [], // 社会面
      defaultProps: {
        children: "apes",
        label: "name"
      },
      defaultProps_1: {
        children: "apeTollgates",
        label: "name"
      },
      filterText: "", // 输入关键字
      styleOptions: {
        // 画框的颜色
        strokeColor: "red", // 边线颜色。
        fillColor: "red", // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, // 填充的透明度，取值范围0 - 1。
        strokeStyle: "solid" // 边线的样式，solid或dashed。
      },
      markerId: "", // 编辑标注时所需要的id
      markerPoint: null, // 右键编辑标注时的标注位置
      markerClusterer: null, // 点位聚合的对象
      point: {},
      righttext: "新增设备",
      rightkakou: "新增卡口",
      addVideoData: false,
      deviceName: "",
      deviceModel: "",
      password: "",
      deviceIP: "",
      devicePort: "",
      deviceRtsp: "",
      deviceApe: "",
      userId: "",
      addMountData: false,
      mountName: "",
      mountNum: "",
      mountstatus: "1",
      updateMountData: false,
      kakouId: "",
      // selectdist: sessionStorage.getItem('defaultRegion'), //  区域ID

      carkakouID: "",
      carName: "",
      carmodel: "",
      carlng: "",
      carlat: "",
      carDirection: "1",
      monitorDirection: "1",
      laneName: "",
      isOnline: "1",
      laneDesc: "",
      maxSpeed: "",
      cityPass: "1",
      monitors: [],
      chedaoId: "",
      shebeiId: "",
      maplng: 0, //地图的经度
      maplat: 0, //地图的纬度
      mapzoom: 0, //地图的级别
      pageIndex: "" //是否是车综  案件库
    };
  },
  watch: {
    filterText(val) {
      if (this.initTab == "video") {
         this.$refs.tree2.filter(val);
      } else if (this.initTab == "vehicle") {
       this.$refs.tree3.filter(val);
      } else if (this.initTab == "people") {
        this.$refs.tree4.filter(val);
      } else if (this.initTab == "social") {
       this.$refs.tree5.filter(val);
      }
    }
  },
  components: {
    headers,
    province
  },
  computed: {
    ...mapState([
      "map",
      "videolist",
      "ok",
      "markerData"
    ])
  },
  created() {
    this.pageIndex = sessionStorage.getItem("pageIndex");
    this.maplng = sessionStorage.getItem("longitude");
    this.maplat = sessionStorage.getItem("latitude");
    this.mapzoom = sessionStorage.getItem("bmapLevel");
  },
  mounted() {
    if(this.pageIndex == 1 || this.pageIndex == 3){
      if (this.initTab == "video") {
        this.index = 0;
        this.queryVideoData();
      } else if (this.initTab == "vehicle") {
        this.index = 3;
        this.queryMoutDevice();
      } else if (this.initTab == "people") {
        this.index = 1;
        this.querySocietyData();
      } else if (this.initTab == "social") {
        this.index = 2;
        this.queryFaceData();
      }
    }else{
      this.index = 0;
      this.queryMoutDevice();
      this.initTab = "vehicle"
    }

    this._initMap(); //地图对象要在页面加载完了后再渲染  不能写在created里面4
  },
  mixins: [maps,realvideo],
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //重置地图
    getinit() {
      this.maplng = sessionStorage.getItem("longitude");
      this.maplat = sessionStorage.getItem("latitude");
      this.mapzoom = sessionStorage.getItem("bmapLevel");
      this._initMap();
      if(this.pageIndex == 1 || this.pageIndex == 3){
        if (this.index == 0) {
          this.createMarkerAll(this.videoList, videoIco);
        } else if (this.index == 3) {
          this.createMount(this.mountList);
        } else if (this.index == 1) {
          this.createMarkerAll(this.societyData, RFIDIco);
        } else if (this.index == 2) {
           this.createMarkerAll(this.faceList, faceIco);
        }
      }else{
        this.index == 0
        this.createMount(this.mountList);
      }

    },
    getinits() {
      this._initMap();
      if(this.pageIndex == 1 || this.pageIndex == 3){
        if (this.index == 0) {
          this.createMarkerAll(this.videoList, videoIco);
        } else if (this.index == 3) {
          this.createMount(this.mountList);
        } else if (this.index == 1) {
          this.createMarkerAll(this.societyData, RFIDIco);
        } else if (this.index == 2) {
          this.createMarkerAll(this.faceList, faceIco);
        }
      }
      else{
        this.index == 0
        this.createMount(this.mountList);
      }

    },
    // change(msg) {
    //   this.selectdist = msg;
    //   if (!this.selectdist == "") {
    //     this.dchange = false;
    //   }
    // },
    changename() {
      this.dnerr = this.deviceName == "" ? true : false;
    },
    changeport() {
      if (this.devicePort !== "" && this.devicePort !== null) {
        let dessg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
        if (!dessg.test(this.devicePort)) {
          this.dperr = true;
        } else {
          this.dperr = false;
        }
      } else {
        this.dperr = false;
      }
    },
    changelng() {
      this.dplngerr = this.point.lng == "" ? true : false;
    },
    changelat() {
      this.dplaterr = this.point.lat == "" ? true : false;
    },
    changeip() {
      if (this.deviceIP !== "" && this.deviceIP !== null) {
        // let devixxr = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/;
        let devixxr = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
        if (!devixxr.test(this.deviceIP)) {
          this.dpIderr = true;
        } else {
          this.dpIderr = false;
        }
      } else {
        this.dpIderr = false;
      }
    },
    changemodel(){this.dpmoerr = this.deviceModel =='' ? true : false },
    changertsp() {},

    changekname() {
      this.mtname = this.mountName == "" ? true : false;
    },
    changeknum() {
      this.mtnum = this.mountNum == "" ? true : false;
    },

    changecarname() {
      this.carnerr = this.carName == "" ? true : false;
    },
    changecarmodel() {
      this.carmoerr = this.carmodel == "" ? true : false;
    },
    changeape() {
      this.carape = this.deviceApe == "" ? true : false;
    },

    changecarway() {
      this.carwayerr = this.laneName == "" ? true : false;
    },
    changecarline() {
      this.carlneerr = this.laneDesc == "" ? true : false;
    },
    changecarmax() {
      this.carmaxerr = this.maxSpeed == "" ? true : false;
    },
    addFacility() {
      this.updatevideo = false;
      this.addVideoData = false;
      this.dnerr = false;
      this.dperr = false;
      this.dplngerr = false;
      this.dplaterr = false;
      this.dpIderr = false;
      this.dpmoerr = false;
      this.dchange = false;
      this.deviceApe = ''
      // this.$refs.province.getSelectData();
    },
    // 1 . 创建地图对象 加载地图
    _initMap() {
      let map = new BMap.Map("allmap", { enableMapClick: false });
      this.$store.dispatch("mapInit", map); //设置地图对象到vuex
      map.centerAndZoom(new BMap.Point(this.maplng, this.maplat), this.mapzoom);
      map.enableScrollWheelZoom(); //设置滚轮
      map.disableContinuousZoom(); //禁止连续缩放
      map.addControl(
        new BMap.ScaleControl({
          // 地图比例尺控件
          offset: new BMap.Size(10, 50)
        })
      );
      map.addControl(
        new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT
        })
      );
      //地图的缩略图
      this.map.addControl(
        new BMap.OverviewMapControl({
          isOpen: true,
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          size: new BMap.Size(250, 180)
        })
      );
      // 给当前地点添加经纬度
      map.addEventListener("mousemove", e => {
        this.point = e.point;
      });
    },
    // 3。 创建坐标之前先清空地图上的所有坐标
    removeMarker() {
      this.map.clearOverlays();
    },
    // 4. 点击左侧菜单触发的时间 让坐标动起来
    handleNodeClick(data) {
      if (data.longitude == undefined && data.latitude == undefined) {
        this.getinit();
      } else {
        this.mapzoom = 16;
        this.maplng = data.longitude;
        this.maplat = data.latitude;
        this.getinits();
        let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
        var point = new BMap.Point(data.longitude, data.latitude);
        let opts = {
          width: 200, // 信息窗口宽度
          height: 100, // 信息窗口高度
          title: "视频设备详情" // 信息窗口标题
        };
        //信息内容
        let content = `设备名称：${data.name}<br>
              设备经度：${data.longitude}<br>
              设备纬度：${data.latitude}`;
        let info_Window = new BMap.InfoWindow(content, opts);
        this.map.openInfoWindow(info_Window, point);

        for (let i = 0; i < allOverlay.length; i++) {
          if (data.shebeiId == allOverlay[i].id) {
            allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
            setTimeout(function() {
              allOverlay[i].setAnimation(null);
            }, 1000);
          }
        }
      }
    },
    // 5 右击地图添加设备信息  新增设备
    onRightsMapFun(map) {
      let menu = new BMap.ContextMenu();
      let txtMenuItem = [
        {
          text: this.righttext,
          callback: e => {
            this.addVideoData = true;
            this.point = e;
            this.deviceName = this.deviceModel = this.deviceIP = this.userId ="";
            this.devicePort = this.password = "";
            this.deviceRtsp = ''
            this.$nextTick(()=>{
              this.$refs.province.selected =sessionStorage.getItem('defaultRegion').substring(0,2) + '0000'
              this.$refs.province.selectcity =sessionStorage.getItem('defaultRegion').substring(0,4) + '00'
              this.$refs.province.selectdist =sessionStorage.getItem('defaultRegion')
              this.$refs.province.getSelectData();
            })
            let point = new BMap.Point(e["lng"], e["lat"]);
            let marker = new BMap.Marker(point);
          }
        }
      ];
      for (let i = 0; i < txtMenuItem.length; i++) {
        menu.addItem(
          new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {
            width: 200,
            id: "dom_" + i
          })
        );
      }
      if (this.addshebei == true) {
        map.addContextMenu(menu);

      }
    },
    // 6 给标注点添加右击事件
    onRightMarkerFun(marker) {
      let markerMenu = new BMap.ContextMenu();
      let txtMenuItem = [
        {
          text: "编辑视频设备",
          callback: (e, ee, marker) => {
            console.log(marker);
            this.updatevideo = true;
            let id = (this.markerId = marker.id); //获取标注id
            this.markerPoint = e;
            this.deviceApe = marker.data.apeId
            this.deviceName = marker.data.name; // 名称
            this.deviceModel = marker.data.model; // 型号
            this.deviceIP = marker.data.ipAddr; // IP地址
            this.devicePort = marker.data.port; // 端口号
            this.userId = marker.data.userId;
            this.password = marker.data.password;
            this.point.lng = marker.data.longitude; // 经度
            this.point.lat = marker.data.latitude; // 纬度
            this.deviceRtsp = marker.data.rtspUrl // reps
            // this.selectdist = marker.data.placeCode;
            console.log(marker.data.placeCode,10000);
            this.$nextTick(()=>{
              this.$refs.province.selected = marker.data.placeCode.substring(0,2) + '0000'
              this.$refs.province.selectcity = marker.data.placeCode.substring(0,4) + '00'
              this.$refs.province.selectdist = marker.data.placeCode

            })
          }
        },
        {
          text: "移动视频设备",
          callback: (e, ee, marker) => {
            marker.enableDragging();
            marker.addEventListener("dragend", e => {
              this.deviceName = marker.data.name; // 名称
              this.deviceModel = marker.data.model; // 型号
              this.deviceIP = marker.data.ipAddr; // IP地址
              this.deviceApe = marker.data.apeId
              this.devicePort = marker.data.port; // 端口号
              this.userId = marker.data.userId;
              this.password = marker.data.password;
              this.point.lng = marker.data.longitude; // 经度
              this.point.lat = marker.data.latitude; // 纬度
              // this.selectdist = marker.data.placeCode;
              this.updates(marker, e);
              // console.log("拖到的地点的经纬度：" + x + "，" + y);
            });
          }
        },
        {
          text: "删除视频设备",
          callback: (e, ee, marker) => {
            let id = marker.id;
            this.$myconfirm({
              type: "提示",
              msg: "此操作将永久删除视频设备, 是否继续?",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            }).then(() => {
              this.deleteMarker(id);
            });
          }
        }
      ];
      for (let i = 0; i < txtMenuItem.length; i++) {
        markerMenu.addItem(
          new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback)
        );
      }
      if (this.updateshebeibtn == true) {
        marker.addContextMenu(markerMenu);
      }
    },
    // 验证信息
    verify() {
      let device = true;
      // 设备名称
      if (this.deviceName == "") {
        this.dnerr = true;
        device = false;
      }
      console.log(555);
      if(this.deviceApe == '' || this.deviceApe == null){
        this.carape = true;
        device = false;
      }
      console.log(666);
      // 端口
      if (this.devicePort !== "" && this.devicePort !== null) {
        let devreg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
        if (!devreg.test(this.devicePort)) {
          this.dperr = true;
          device = false;
        }
      }
      console.log(777);
      // // 经度
      // if(this.point.lng == ''){
      //   this.dplngerr = true;
      //   device = false;
      // }
      // // 纬度
      // if(this.point.lat == ''){
      //   this.dplaterr = true;
      //   device = false;
      // }
      // IP地址
      if (this.deviceIP !== "" && this.deviceIP !== null) {
        // let xxreg = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/;
        let xxreg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
        if (!xxreg.test(this.deviceIP)) {
          this.dpIderr = true;
          device = false;
        }
      }
      console.log(888);
      // 设备型号
      // if(!this.deviceModel == ''){
      //   this.dpmoerr = true;
      //   device = false;
      // }
      // 详细位置
      // if (this.selectdist == "") {
      //   this.dchange = true;
      //   device = false;
      // } else {
      //   this.dchange = false;
      // }
      console.log(999);
      return device;
    },
    // 7 新增设备
    addEquiment() {
      if (!this.verify()) {
        return false;
      }
      if (
        this.deviceName == "" ||
        this.point.lng == "" ||
        this.point.lat == "" ||
        this.deviceApe == ""
      ) {
        return;
      }
      this.addVideoData = false;
      let isSociety = 0;
      let type = 0;
      if (this.index == 0) {
        type = 0;
      } else if (this.index == 3) {
      } else if (this.index == 1) {
        isSociety = 1;
      } else if (this.index == 2) {
        type = 1;
      }
      console.log(444);
      let data = {
        name: this.deviceName, // 名称
        model: this.deviceModel, // 型号
        ipAddr: this.deviceIP, // IP地址
        port: this.devicePort, // 端口号
        rtspUrl: this.deviceRtsp, //rtsp地址
        apeId: this.deviceApe, //设备编号
        userId: this.userId,
        password: this.password,
        longitude: this.point.lng, // 经度
        latitude: this.point.lat, // 纬度
        placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
        apeType: type, // 设备类型 0.视频 ,1.人像
        isSociety: isSociety // 是否社会类0.否,1是
      };
      data = this.$qs.stringify(data);
      this.$http.post("/sms/ape/add", data).then(res => {
        if (res.data.code == 200) {
          // 更新videoList
          if (this.index == 0) {
            // 视频类型
            this.$notify({
              type: "success",
              message: "添加成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.queryVideoData();
          } else if (this.index == 1) {
            this.$notify({
              type: "success",
              message: "添加成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.querySocietyData();

          } else if (this.index == 2) {
            this.$notify({
              type: "success",
              message: "添加成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.queryFaceData();
          }
        } else {
          this.$notify({
            type: "error",
            message: "添加失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // 8 删除设备
    deleteMarker(id) {
      this.$http.post("/sms/ape/delete/" + id).then(res => {
        if (this.index == 0) {
          // 视频
          this.queryVideoData();
        } else if (this.index == 1) {
          // 人脸
           this.querySocietyData();
        }else if(this.index == 2){
          //社会面
          this.queryFaceData();
        }
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "删除成功",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "error",
            message: "删除失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // 9 修改设备
    updateshebei() {
      if (!this.verify()) {
        return false;
      }
      if (
        this.deviceName == "" ||
        this.point.lng == "" ||
        this.point.lat == "" ||
        this.deviceApe == "" ||
        this.deviceApe == null
      ) {
        return;
      }

      this.updatevideo = false;
      let isSociety = 0;
      let type = 0;
      if (this.index == 0) {
        type = 0;
      } else if (this.index == 3) {
      } else if (this.index == 1) {
        isSociety = 1;
      } else if (this.index == 2) {
         type = 1;
      }
      let data = {
        name: this.deviceName, // 名称
        model: this.deviceModel, // 型号
        ipAddr: this.deviceIP, // IP地址
        port: this.devicePort, // 端口号
        longitude: this.point.lng, // 经度
        latitude: this.point.lat, // 纬度
        placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
        rtspUrl: this.deviceRtsp, //rtsp地址
        apeId: this.deviceApe, //设备编号
        userId: this.userId,
        password: this.password,
        apeType: type, // 设备类型 0.视频 ,1.人像
        isSociety: isSociety // 是否社会类0.否,1是
      };
      data = this.$qs.stringify(data);
      let url = "/sms/ape/update/" + this.markerId;
      this.$http.post(url, data).then(res => {
        if (res.data.code == 200) {
          // 更新videoList
          if (this.index == 0) {
            // 视频类型
            this.$notify({
              type: "success",
              message: "修改成功！",
              position: "bottom-right",
              duration: 3000
            });

            this.queryVideoData();
          } else if (this.index == 1) {
            this.$notify({
              type: "success",
              message: "修改成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.querySocietyData();
          } else if (this.index == 2) {
            this.$notify({
              type: "success",
              message: "修改成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.queryFaceData();
          }
        }else{
          this.$notify({
              type: "error",
              message: "修改失败！",
              position: "bottom-right",
              duration: 3000
            });
        }
      });
    },
    // 移动的时候修改地图
    updates(marker, e) {
      console.log(marker,10000);
      marker.disableDragging();
      let x = e.point.lng;
      let y = e.point.lat;
      let isSociety = 0;
      let type = 0;
      if (this.index == 0) {
        type = 0;
      } else if (this.index == 3) {
      } else if (this.index == 1) {
        type = 1;
        isSociety = 1;
      } else if (this.index == 2) {
        type = 1;
      }
      // this.$refs.province.selectdist,
      let data = {
        name: this.deviceName, // 名称
        model: this.deviceModel, // 型号
        ipAddr: this.deviceIP, // IP地址
        port: this.devicePort, // 端口号
        longitude: x, // 经度
        latitude: y, // 纬度
        apeId:this.deviceApe,
        placeCode:marker.data.placeCode,  // 安装地点行政区划代码
        userId: this.userId,
        password: this.password,
        apeType: type, // 设备类型 0.视频 ,1.人像
        isSociety: isSociety // 是否社会类0.否,1是
      };
      data = this.$qs.stringify(data);
      let url = "/sms/ape/update/" + marker.id;
      this.$http.post(url, data).then(res => {
        if (res.data.code == 200) {
          // 更新videoList
          if (this.index == 0) {
            // 视频类型
             this.$notify({
                type: "success",
                message: "移动成功",
                position: "bottom-right",
                duration: 3000
              });
            this.queryVideoData();
          } else if (this.index == 1) {
             this.$notify({
                type: "success",
                message: "移动成功",
                position: "bottom-right",
                duration: 3000
              });
              this.querySocietyData();
          } else if (this.index == 2) {
             this.$notify({
                type: "success",
                message: "移动成功",
                position: "bottom-right",
                duration: 3000
              });
            this.queryFaceData();
          }
        }else{
           this.$notify({
              type: "error",
              message: "移动失败",
              position: "bottom-right",
              duration: 3000
            });
        }
      });
    },
    // 2 创建坐标点

    addAllMarkerClick(marker, point) {
      let opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: "卡口信息" // 信息窗口标题
      };
      let _this = this;
      marker.addEventListener("click", function() {
        _this.queryMountDetails(marker.data.kakouId);
        _this.querycarMout(marker.data.kakouId);
      });

      marker.addEventListener("click", function() {
        let content = `<div>
                          <p>卡口名称：${marker.data.name}</p>
                          <p>卡口地区：${marker.data.place}</p>
                          <p id='details'>详情</p>
                          </div>`;
        let infoWindow = new BMap.InfoWindow(content, opts);
        _this.map.openInfoWindow(infoWindow, point); //开启信息窗口
        var details = document.getElementById("details");
        if (_this.searchkakou == false) {
          details.style.display = "none";
        }
        _this.$nextTick(() => {
          details.onclick = function() {
            _this.outerVisible = true;
            _this.$nextTick(function() {
              if (_this.$refs["outerTable"]) {
                _this.$refs["outerTable"].doLayout();
              }
            });
          };
        });
      });
    },
    // 3右击注册新增设备信息
    onRightMount(map) {
      let menu = new BMap.ContextMenu();
      let txtMenuItem = [
        {
          text: this.rightkakou,
          callback: e => {
            this.addMountData = true;
            this.point = e;
            this.mountName = this.mountNum = "";
            let point = new BMap.Point(e["lng"], e["lat"]);
            let myIcon = new BMap.Icon(videoIco, new BMap.Size(33, 36), {});
            let marker = new BMap.Marker(point);
          }
        }
      ];
      for (let i = 0; i < txtMenuItem.length; i++) {
        menu.addItem(
          new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {
            width: 200,
            id: "dom_" + i
          })
        );
      }
      if (this.addkakou == true) {
        map.addContextMenu(menu);
      }
    },
    // 4右击标注点注册增删改查
    onRightMountFun(marker) {
      let markerMenu = new BMap.ContextMenu();
      let txtMenuItem = [
        {
          text: "编辑设备信息",
          callback: (e, ee, marker) => {
            let id = (this.kakouId = marker.id); //获取标注id
            this.markerPoint = e;
            this.updateMountData = true;
            this.mountName = marker.data.name; // 名称
            this.mountNum = marker.data.laneNum; // 型号
            this.mountstatus = marker.data.status; // IP地址
            this.point.lng = marker.data.longitude; // 经度
            this.point.lat = marker.data.latitude; // 纬度
            this.$nextTick(()=>{
              this.$refs.province.selected = marker.data.placeCode.substring(0,2) + '0000'
              this.$refs.province.selectcity = marker.data.placeCode.substring(0,4) + '00'
              this.$refs.province.selectdist = marker.data.placeCode
            })
            // this.selectdist = marker.data.placeCode; //地点
          }
        },
        {
          text: "移动设备信息",
          callback: (e, ee, marker) => {
            marker.enableDragging();
            marker.addEventListener("dragend", e => {
              this.mountName = marker.data.name; // 名称
              this.mountNum = marker.data.laneNum; // 型号
              this.mountstatus = marker.data.status; // IP地址
              this.point.lng = marker.data.longitude; // 经度
              this.point.lat = marker.data.latitude; // 纬度
              // this.selectdist = marker.data.placeCode;
              this.updatekakou(marker, e);
            });
          }
        },
        {
          text: "删除设备设备",
          callback: (e, ee, marker) => {
            if (this.cartableData.length > 0) {
              this.$notify({
                type: 'warning',
                message: '删除失败，有车辆信息',
                position: 'bottom-right',
                duration: 3000
              });
              // this.$myconfirm({
              //   type: "提示",
              //   msg: "删除失败，有车辆信息",
              //   icon: 1,
              //   btn: {
              //     ok: "yes",
              //     no: "no"
              //   }
              // });
              // layer.open({
              //   type: 0,
              //   icon:5,
              //   content: '删除失败，有车辆信息',
              //   title:"消息提示",
              //   yes:function(index){
              //     layer.close(index);
              //   }
              // });
            } else {
              this.deletemount(marker.data.kakouId);
            }
          }
        }
      ];
      for (let i = 0; i < txtMenuItem.length; i++) {
        markerMenu.addItem(
          new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback)
        );
      }
      if (this.updatekakoubtn == true) {
        marker.addContextMenu(markerMenu);
      }
    },
    // 5点击设备ID进行跳跃
    handleNodesClick(data) {
      if (data.longitude == undefined && data.latitude == undefined) {
        this.getinit();
      } else {
        this.maplng = data.longitude;
        this.maplat = data.latitude;
        this.mapzoom = 18;
        this.getinits();
        let _this = this;
        let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
        for (let i = 0; i < allOverlay.length; i++) {
          if (data.kakouId == allOverlay[i].data.kakouId) {
            // 给点击的当前点设置一个跳跃的点
            allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
            //1s后停止跳跃
            setTimeout(function() {
              allOverlay[i].setAnimation(null);
            }, 1000);
          }
        }
        this.queryMountDetails(data.kakouId);
        this.querycarMout(data.kakouId);
        var point = new BMap.Point(data.longitude, data.latitude);
        let opts = {
          width: 200, // 信息窗口宽度
          height: 100, // 信息窗口高度
          title: "卡口信息" // 信息窗口标题
        };
        let content = `<div>
                          <p>卡口名称：${data.name}</p>
                          <p>卡口地区：${data.place}</p>
                          <p id='details'>详情</p>
                          </div>`;
        let info_Window = new BMap.InfoWindow(content, opts);
        this.map.openInfoWindow(info_Window, point);

        setTimeout(() => {
          var details = document.getElementById("details");
          if (_this.searchkakou == false) {
            details.style.display = "none";
          }
          details.onclick = function() {
            _this.outerVisible = true;

            _this.$nextTick(function() {
              if (_this.$refs["outerTable"]) {
                _this.$refs["outerTable"].doLayout();
              }
            });
          };
        }, 200);
      }
    },
    // 6添加设备
    addmount() {
      if (this.mountName == "") {
        this.mtname = true;
        return;
      }
      // if (this.selectdist == "") {
      //   this.dchange = true;
      //   return;
      // } else {
      //   this.dchange = false;
      // }
      if (
        this.mountName == "" ||
        this.point.lng == "" ||
        this.point.lat == ""
      ) {
        return;
      }
      this.addMountData = false;
      // console.log(this.selectdist)
      let data = {
        name: this.mountName, // 设备名称
        longitude: this.point.lng, // 经度
        latitude: this.point.lat, // 纬度
        placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
        status: this.mountstatus, // 设备状态;1.正常;2.停用;9.其他
        laneNum: this.mountNum // 车道数
      };
      data = this.$qs.stringify(data);
      this.$http.post("/sms/apeTollgate/insert", data).then(res => {
        if (res.data.code == 200) {
          // layer.alert('添加成功！',{icon:6,title:"消息提示"});
          this.$notify({
            type: 'success',
            message: '添加成功！',
            position: 'bottom-right',
            duration: 3000
          });
          // this.$myconfirm({
          //   type: "提示",
          //   msg: "添加成功！",
          //   icon: 3,
          //   btn: {
          //     ok: "yes",
          //     no: "no"
          //   }
          // });
          this.queryMoutDevice();
        }else{
           this.$notify({
            type: 'error',
            message: '添加失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 7修改设备信息
    updatemount() {
      if (this.mountName == "") {
        this.mtname = true;
        return;
      }
      // if (this.selectdist == "") {
      //   this.dchange = true;
      //   return;
      // } else {
      //   this.dchange = false;
      // }
      if (
        this.mountName == "" ||
        this.point.lng == "" ||
        this.point.lat == ""
      ) {
        return;
      }
      this.updateMountData = false;
      let data = {
        name: this.mountName, // 设备名称
        name: this.mountName, // 设备名称
        longitude: this.point.lng, // 经度
        latitude: this.point.lat, // 纬度
        placeCode: this.$refs.province.selectdist, // 安装地点行政区划代码
        status: this.mountstatus, // 设备状态;1.正常;2.停用;9.其他
        laneNum: this.mountNum // 车道数
      };
      data = this.$qs.stringify(data);
      let url = "/sms/apeTollgate/update/" + this.kakouId;
      this.$http.post(url, data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: 'success',
            message: '修改成功！',
            position: 'bottom-right',
            duration: 3000
          });
          this.queryMoutDevice();
        }else{
          this.$notify({
            type: 'error',
            message: '修改失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    updatekakou(marker, e) {
      marker.disableDragging();
      let x = e.point.lng;
      let y = e.point.lat;
      let data = {
        name: this.mountName, // 设备名称
        longitude: x, // 经度
        latitude: y, // 纬度
        placeCode:marker.data.placeCode, // 安装地点行政区划代码
        status: this.mountstatus, // 设备状态;1.正常;2.停用;9.其他
        laneNum: this.mountNum // 车道数
      };
      data = this.$qs.stringify(data);
      let url = "/sms/apeTollgate/update/" + marker.id;
      this.$http.post(url, data).then(res => {
        if (res.data.code == 200) {
          this.queryMoutDevice();
        }
      });
    },
    //删除卡扣
    deletemount(id) {
      this.$http.post("sms/apeTollgate/delete/" + id).then(res => {
        if (res.data.code == 200) {
          this.queryMoutDevice();
          this.$notify({
            type: 'success',
            message: '删除成功！',
            position: 'bottom-right',
            duration: 3000
          });
        }else{
           this.$notify({
            type: 'error',
            message: '删除失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },

    // 8设备的收起和显示
    changemleft(e) {
      this.flag = !this.flag;
      if (this.flag == true) {
        e.target.textContent = "收起设备";
        if(this.pageIndex == 1 || this.pageIndex == 3){
          if (this.index == 0) {
            this._initMap();
            this.queryVideoData();
          } else if (this.index == 3) {
            this._initMap();
            this.queryMoutDevice();
          } else if (this.index == 1) {
            this._initMap();
            this.querySocietyData();
          } else if (this.index == 2) {
            this._initMap();
            this.queryFaceData();
          }
        }else{
          this._initMap();
          this.queryMoutDevice();
        }

      } else {
        this._initMap();
        if(this.pageIndex == 1 || this.pageIndex == 3){
          if (this.index == 0) {
            this._initMap();
            this.queryVideoData();
          } else if (this.index == 3) {
            this._initMap();
            this.queryMoutDevice();
          } else if (this.index == 1) {
            this._initMap();
            this.querySocietyData();
          } else if (this.index == 2) {
            this._initMap();
            this.queryFaceData();
          }
        }else{
          this._initMap();
          this.queryMoutDevice();
        }
        e.target.textContent = "显示设备";
      }
    },
    // 获取视频的信息
    queryVideoData() {
      this.loading = this.$loading({
        target:'.filter-tree',
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正在加载.."
      });
      this.$http.post("/sms/ape/selectByVideo").then(res => {
        if (res.data.code == 200) {
          this.loading.close()
          this.videoList = this.getOffline(res.data.data)
          this.createMarkerAll(this.videoList, videoIco);
        }else{
          this.loading.close()
          this.$notify({
            type: 'error',
            message: '获取视频列表失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 设备信息
    queryMoutDevice() {
      this.$http.post("/sms/apeTollgate/search").then(res => {
        if (res.data.code == 200) {
          console.log(888888);
          this.mountList = res.data.data;
          this.createMount(this.mountList); //加载标注
        }else{
           this.$notify({
            type: 'error',
            message: '获取设备列表失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 设备的详细信息
    queryMountDetails(id) {
      this.$http.get("/sms/apeTollgate/findById/" + id).then(res => {
        if (res.data.code == 200) {
          this.MountDetails = res.data.data;
        }
        else{
           this.$notify({
            type: 'error',
            message: '获取设备详情失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 设备下面的车辆信息
    querycarMout(id) {
      this.$http.get("/sms/apeTollgate/selectApeByKakouId/" + id).then(res => {
        if (res.data.code == 200) {
          this.cartableData = res.data.data;
        }
        else{
           this.$notify({
            type: 'error',
            message: '获取车辆信息失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    getHDirectionType() {
      this.$http.get("/sms/static/getHDirectionType").then(res => {
        if (res.data.code == 200) {
          this.monitors = res.data.data;
        }
      });
    },
    // 添加车辆
    getaddcar() {
      this.addVisible = true;
      this.getHDirectionType();
      this.carkakouID = this.MountDetails.kakouId;
      this.carlng = this.MountDetails.longitude;
      this.carlat = this.MountDetails.latitude;
    },
    addcar() {
      // if(this.carName =='' || this.carmodel=='' || this.laneName =='' || this.laneDesc == '' || this.maxSpeed ==''){
      //   return
      // }
      this.addVisible = false;
      let data = {
        kakouId: this.carkakouID,
        name: this.carName,
        model: this.carmodel,
        apeId: this.deviceApe,
        longitude: this.carlng,
        latitude: this.carlat,
        capDirection: this.carDirection,
        monitorDirection: this.monitorDirection,
        laneName: this.laneName,
        isOnline: this.isOnline,
        apeType: 2,
        laneDesc: this.laneDesc,
        maxSpeed: this.maxSpeed,
        cityPass: this.cityPass
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("/sms/apeTollgate/insetApeLoneBykaKou", data)
        .then(res => {
          if (res.data.code == 200) {
             this.$notify({
              type: 'success',
              message: '添加成功！',
              position: 'bottom-right',
              duration: 3000
            });
            // layer.alert("添加成功！", { icon: 6, title: "消息提示" });
            this.querycarMout(this.carkakouID);
          }else{
            this.$notify({
              type: 'error',
              message: '添加失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        });
      this.carName = this.carmodel = this.carlng = this.carlat = this.laneName = this.laneDesc = this.maxSpeed =
        "";
    },
    // 修改设备
    getupdatacar(index, row) {
      this.updateVisible = true;
      this.getHDirectionType();
      this.carkakouID = row.kakouId;
      this.carName = row.name;
      this.carmodel = row.model;
      (this.deviceApe = row.deviceApe), (this.carlng = row.longitude);
      this.carlat = row.latitude;
      this.carDirection = row.capDirection;
      this.monitorDirection = row.monitorDirection;
      this.laneName = row.laneName;
      this.isOnline = row.isOnline;
      this.laneDesc = row.laneDesc;
      this.maxSpeed = row.maxSpeed;
      this.cityPass = row.cityPass;
      this.shebeiId = row.shebeiId;
      this.chedaoId = row.chedaoId;
    },
    updateclear() {
      this.updateVisible = false;
      this.carName = this.carmodel = this.carlng = this.carlat = this.laneName = this.laneDesc = this.maxSpeed =
        "";
    },
    updatecar() {
      // if(this.carName =='' || this.carmodel=='' || this.laneName =='' || this.laneDesc == '' || this.maxSpeed ==''){
      //   return
      // }
      this.updateVisible = false;
      let data = {
        shebeiId: this.shebeiId,
        chedaoId: this.chedaoId,
        apeId: this.deviceApe,
        name: this.carName,
        model: this.carmodel,
        longitude: this.carlng,
        latitude: this.carlat,
        capDirection: this.carDirection,
        monitorDirection: this.monitorDirection,
        laneName: this.laneName,
        isOnline: this.isOnline,
        apeType: 2,
        laneDesc: this.laneDesc,
        maxSpeed: this.maxSpeed,
        cityPass: this.cityPass
      };
      data = this.$qs.stringify(data);
      this.$http.post("/sms/apeTollgate/updateApeLane", data).then(res => {
        if (res.data.code == 200) {
           this.$notify({
              type: 'success',
              message: '修改成功！',
              position: 'bottom-right',
              duration: 3000
            });
          // this.querycarMout(this.carkakouID);
        }else{
           this.$notify({
            type: 'error',
            message: '修改失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
      this.carName = this.carmodel = this.carlng = this.carlat = this.laneName = this.laneDesc = this.maxSpeed =
        "";
    },
    // 删除设备
    getdeletecar(index, row) {
      this.carkakouID = row.kakouId;
      this.$myconfirm({
        type: "提示",
        msg: "此操作将永久删除该文件, 是否继续?",
        icon: 2,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        this.deletecar(row.chedaoId);

      });
    },
    deletecar(id) {
      this.$http.post("/sms/apeTollgate/deleteApeLane/" + id).then(res => {
        if (res.data.code == 200) {
          this.querycarMout(this.carkakouID);
          this.$notify({
            type: 'success',
            message: '删除成功',
            position: 'bottom-right',
            duration: 3000
          });
        }else{
           this.$notify({
            type: 'error',
            message: '删除失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 人像
    queryFaceData() {
      this.$http.post("/sms/ape/selectByPortrait").then(res => {
        if (res.data.code == 200) {
          this.faceList = res.data.data;
          // 页面加载的时候加载坐标点
          this.createMarkerAll(this.faceList, faceIco);
        }else{
          this.$notify({
            type: 'error',
            message: '获取人像失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 社会面
    querySocietyData() {
      this.$http.post("/sms/ape/selectBySociety").then(res => {
        if (res.data.code == 200) {
          this.societyData = res.data.data;
          // 页面加载的时候加载坐标点
          this.createMarkerAll(this.societyData, RFIDIco);
        }
        else{
          this.$notify({
            type: 'error',
            message: '获取社会面失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      });
    },
    // 切换tab栏重新加载地图
    handleClick(tab, event) {
      this.maplng = sessionStorage.getItem("longitude");
      this.maplat = sessionStorage.getItem("latitude");
      this.mapzoom = sessionStorage.getItem("bmapLevel");
      this.filterText = "";
      if(this.pageIndex == 1 || this.pageIndex == 3){
        this.index = tab.index;
        this.$store.dispatch("changeDeviceType", tab["index"]); //设置地图对象到vueX 中
        if (tab.index == 0) {
          this.queryVideoData();
          this._initMap(); //重新加载地图
        } else if (tab.index == 3) {
          this.queryMoutDevice();
          this._initMap();
        } else if (tab.index == 1) {
          this.querySocietyData();
          this._initMap(); //重新加载地图
        } else if (tab.index == 2) {
          this.queryFaceData();
          this._initMap(); //重新加载地图
        }
      }else{
        this.index = tab.index;
        console.log(this.index,555);
        this.queryMoutDevice();
        this._initMap();
      }

    }
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
.onlinecoll {
  width: 100%;
  min-width: 1200px;
}
.main {
  padding: 0;
}

.onlinecoll >>> .el-dialog {
  margin-top: 10vh;
}
.onlinecoll .el-dialog__header {
  background-color: #f3f6f9;
  font-size: 0.16rem;
}

.kakoumain > ul {
  padding: 0 0.1rem;
}
.kakoumain >>> .el-table {
  margin-top: 0.1rem;
}
.kakoumain >>> .el-table__header-wrapper {
  width: 100%;
}
.kakoumain >>> .el-table__header {
  width: 100%;
}
.kakoumain >>> .el-table__empty-block {
  width: 100%;
}
.kakoumain > ul li {
  float: left;
  width: 50%;
  padding: 0.1rem;
}
.kakoumain .carinfo {
  color: #e5e7e8;
  padding: 0.1rem;
  text-indent: 0.1rem;
}
.kakoumain >>> .el-table td,
.kakoumain >>> .el-table th {
  text-align: center;
}
.kakoumain >>> .el-table th {
  background-color: #f3f6f9;
  padding: 0.1rem;
}
.kakoumain >>> .el-table td {
  padding: 0.1rem 0;
}
.kakoumain >>> .el-button {
  padding: 0.05rem 0.2rem;
  font-size: 0.14rem;
  margin-left: 0.18rem;
}

.onlinecoll {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}

.kakoutitle {
  font-size: 0.16rem;
  color: #e5e7e8;
}
.kakouinfo li span {
  color: #99c9fa;
}
.main {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0;
  left: 0;
  overflow: auto;
}

.mainleft {
  width: 22%;
  height: 100%;
  float: left;
  box-shadow: 2px 2px 1px #ccc;
}
.mainleft > div {
  height: 100%;
}
.ss {
  position: relative;
  height: 0.4rem;
}

.ss >>> .el-input__inner {
  height: 0.4rem;
  line-height: 0.4rem;
}
/*
.ss >>> .el-button{
  padding: 0.14rem 0.2rem;
} */

.ss >>> .el-input {
  height: 0.4rem;
  font-size: 0.14rem;
}
.ss .el-icon-search {
  padding: 0;
  width: 0.5rem;
  text-align: center;
  line-height: 0.4rem;
  position: absolute;
  top: 0rem;
  right: 0;
  z-index: 8;
  font-size: 0.16rem;
}
.mainleft >>> .el-tabs__item {
  padding: 0 0.16rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.mainleft >>> .el-tabs__item:nth-child(2) {
  padding-left: 0.16rem;
  margin: 0 0.05rem;
}
.mainleft >>> .el-tabs__item:last-child {
  padding-right: 0.16rem;
  margin-left: 0.05rem;
}
.mainleft >>> .el-tabs__item span {
  font-size: 0.14rem;
}
.mainleft >>> .el-tabs__nav-prev,
.mainleft >>> .el-tabs__nav-next {
  line-height: 0.44rem;
}

.mainright {
  overflow: hidden;
  height: 100%;
  border-bottom: 1px solid #d7dce0;
  position: relative;
}
.mainright > p {
  width: 1rem;
  line-height: 0.4rem;
  font-size: 0.16rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(16, 35, 56, 0.5);
}
.mainright > div {
  width: 100%;
  height: 100%;
}
.mainright .point {
  position: absolute;
  left: 0.1rem;
  bottom: 0.15rem;
  width: 2rem;
  height: 0.3rem;
  border: 0;
  font-size: 0.14rem;
}
.el-tabs--border-card {
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.el-tabs--border-card >>> .el-tabs__header {
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.el-tabs--border-card >>> .el-tabs__header .el-tabs__item {
  color: #99c9fa;
  border-top: 3px solid rgba(20, 57, 96, 0.8);
  background-color: rgba(20, 57, 96, 0.8);
}
.el-tabs--border-card >>> .el-tabs__header .el-tabs__item.is-active {
  color: #409eff;
  border: 0px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  border-top: 3px solid #409eff;
}

.el-tree {
  height: 6.3rem;
  margin-top: 0.2rem;
  overflow: auto;
  /* border: 1px solid #000; */
}
.el-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
}
.el-tree >>> .el-tree-node__content:hover,
.el-tree >>> .el-tree-node:focus>.el-tree-node__content{
    background-color: rgba(49, 86, 131, 0.2);
}
.el-tree--highlight-current /deep/ .el-tree-node.is-current>.el-tree-node__content{
    background-color: rgba(49,86,131,.2);
}

.addvideo,
.addcar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* border: 1px solid #000; */
}
.addvideo span {
  width: 1.5rem;
  text-align: right;
  display: inline-block;
  color: #99c9fa;
}
.addcar li span {
  width: 1.5rem;
  text-align: right;
  display: inline-block;
  color: #99c9fa;
}
.addvideo li,
.addcar li {
  float: left;
  width: 46%;
  height: 0.5rem;
  margin: 0.1rem 0;
}
/* .addvideo .lastaddvideo{
  width: 50%;
} */
.addvideo li input {
  width: 2.5rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-indent: 0.05rem;
  color: #999;
}
.addcar li input {
  width: 2.5rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-indent: 0.05rem;
  color: #999;
}
.addvideo li p {
  font-size: 0.1rem;
  color: red;
  margin-left: 1.55rem;
}
.addcar li p {
  font-size: 0.1rem;
  color: red;
  margin-left: 1.55rem;
}
.addvideo .lastaddvideo {
  width: 100%;
}
.addvideo .lastaddvideo div {
  display: inline-block;
}

.addvideo li select {
  width: 2.5rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-indent: 0.05rem;
  color: #999;
}
.addcar li select {
  width: 2.5rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-indent: 0.05rem;
  color: #999;
}
#allmap >>> .BMap_bubble_content #details {
  color: #409eff;
}
.mustwrite {
  color: red;
  margin-right: 0.1rem;
  text-align: left;
  vertical-align: middle;
}
.dingwei {
  position: absolute;
  top: 210px;
  right: 38px;
}
.kakoumain >>> .v-modal {
  display: none;
}
.el-select {
  width: 2.5rem;
}
.el-select >>> .el-input__inner {
  height: 0.3rem;
  font-size: 0.14rem;
}
.spanellipsis{
  color: #99c9fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spancolor{
  color: red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
