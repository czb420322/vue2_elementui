<template>
  <div class="taskMange">
    <el-dialog
      title="结构化全局搜索"
      :visible.sync="dialogVisible"
      @close="closeDia"
      ref="dialogSearch"
      class="globalSearch"
      top="8vh"
      v-dialogFull
      v-dialogDrag
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="60%"
    >
      <div class="taskrelation">
        <div class="searchTop" id="searchTop1">
          <div class="searchkline">
            <el-button
              @click="checkTarget(1)"
              :class="{avtive: isoptfor == 1}"
              class="commBtn addBtn"
            >行人</el-button>
            <el-button
              @click="checkTarget(2)"
              :class="{avtive: isoptfor == 2}"
              class="commBtn addBtn"
            >车辆</el-button>
            <el-button
              @click="checkTarget(3)"
              :class="{avtive: isoptfor == 3}"
              class="commBtn addBtn"
            >骑车人</el-button>
            <el-button class="searchBtn" @click="currentPage = 1;searchResult()">查询</el-button>
            <el-button class="tryBtn" @click="resetResult">重置</el-button>
          </div>
          <div id="searchImgResult" class="showinfo" v-if="isoptfor == 1">
            <p>
              <span>开始时间：
                <i></i>
              </span>
              <input type="text" v-model="beginData" id="globalbegin" placeholder="请输入开始时间">
            </p>
            <p>
              <span>结束时间：
                <i></i>
              </span>
              <input type="text" v-model="endData" id="globalend" placeholder="请输入结束时间">
            </p>
            <p>
              <span>上衣款式：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,22)"
                v-model="coatLength"
                placeholder="请选择上衣款式"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>上衣纹理：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,9)"
                v-model="coatPattern"
                placeholder="请选择上衣纹理"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>上衣颜色：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,54)"
                v-model="coatColor"
                placeholder="请选择上衣颜色"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>下衣款式：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,10)"
                v-model="trousersStyle"
                placeholder="请选择下衣款式"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>下衣颜色：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,56)"
                v-model="trousersColor"
                placeholder="请选择下衣颜色"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>鞋子款式：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,23)"
                v-model="shoesStyle"
                placeholder="请选择鞋子款式"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>鞋子颜色：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,24)"
                v-model="shoesColor"
                placeholder="请选择鞋子颜色"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>性别：
                <i></i>
              </span>
              <el-select @visible-change="getpropers(3,16)" v-model="sex" placeholder="请选择性别">
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <!-- <p>
                <span>民族：<i></i></span>
                <el-select  @visible-change="getpropers(3,19)" v-model="ethnic" placeholder="请选择民族">
                  <el-option label='' value=""></el-option>
                  <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                </el-select>
            </p>-->
            <p>
              <span>头部标志：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,2)"
                v-model="headLandMark"
                placeholder="请选择头部标志"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>附属物品：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,20)"
                v-model="accessoryItem"
                placeholder="请选择附属物品"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>发型：
                <i></i>
              </span>
              <el-select @visible-change="getpropers(3,21)" v-model="hairStyle" placeholder="请选择发型">
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>年龄：
                <i></i>
              </span>
              <el-select @visible-change="getpropers(3,8)" v-model="age" placeholder="请选择年龄">
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>包款式：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(3,52)"
                v-model="packageStyle"
                placeholder="请选择包款式"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
          </div>
          <div id="searchImgResult" class="showinfo" v-if="isoptfor == 2">
            <p>
              <span>开始时间：
                <i></i>
              </span>
              <input type="text" v-model="beginData" id="globalbegin" placeholder="请输入开始时间">
            </p>
            <p>
              <span>结束时间：
                <i></i>
              </span>
              <input type="text" v-model="endData" id="globalend" placeholder="请输入结束时间">
            </p>
            <p>
              <span>车辆角度：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,3)"
                v-model="vehicleAngle"
                placeholder="请选择车辆角度"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车辆型号：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,34)"
                v-model="vehicleClass"
                placeholder="请选择车辆型号"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车辆颜色：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,39)"
                v-model="vehicleColor"
                placeholder="请选择车辆颜色"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车辆标志：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,57)"
                v-model="landMark"
                placeholder="请选择车辆标志"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>面部遮挡：
                <i></i>
              </span>
              <el-select v-model="faceMask" placeholder="请选择面部是否遮挡">
                <el-option label value></el-option>
                <el-option label="面部遮挡" value="0" key="0"></el-option>
                <el-option label="面部未遮挡" value="1" key="1"></el-option>
              </el-select>
            </p>
            <p>
              <span>车牌颜色：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(4,21)"
                v-model="plateColor"
                placeholder="请选择车牌颜色"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车牌类型：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(4,20)"
                v-model="plateClass"
                placeholder="请选择车牌类型"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>

            <p>
              <span>特殊车辆：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,63)"
                v-model="specialVehicles"
                placeholder="请选择特殊车辆"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车后盖：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,64)"
                v-model="vehicleBack"
                placeholder="请选择车后盖"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车身破损：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,65)"
                v-model="bodyBreakage"
                placeholder="请选择车身破损"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车顶物件：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,66)"
                v-model="roofGoods"
                placeholder="请选择车顶物件"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车牌遮挡：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(1,67)"
                v-model="plateOcclusion"
                placeholder="请选择车牌遮挡"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车身红绳：
                <i></i>
              </span>
              <el-select @visible-change="getpropers(1,68)" v-model="bodyRed" placeholder="请选择车身红绳">
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
          </div>
          <div id="searchImgResult" class="showinfo" v-if="isoptfor == 3">
            <p>
              <span>开始时间：
                <i></i>
              </span>
              <input type="text" v-model="beginData" id="globalbegin" placeholder="请输入开始时间">
            </p>
            <p>
              <span>结束时间：
                <i></i>
              </span>
              <input type="text" v-model="endData" id="globalend" placeholder="请输入结束时间">
            </p>
            <p>
              <span>头部标识：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(2,3)"
                v-model="headLandMark"
                placeholder="请选择头部标识"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车型：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(2,4)"
                v-model="vehicleClass"
                placeholder="请选择车型"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车辆角度：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(2,1)"
                v-model="vehicleAngle"
                placeholder="请选择车辆角度"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>骑车人性别：
                <i></i>
              </span>
              <el-select @visible-change="getpropers(2,16)" v-model="sex" placeholder="请选择骑车人性别">
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <!-- <p>
                <span>骑车人民族：<i></i></span>
                <el-select  @visible-change="getpropers(2,19)" v-model="ethnic" placeholder="请选择骑车人民族">
                  <el-option label='' value=""></el-option>
                  <el-option v-for="(item,index) in propertyList" :label="item.valueString" :value="item.valueString" :key="index"></el-option>
                </el-select>
            </p>-->
            <p>
              <span>骑车人包类型：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(2,2)"
                v-model="backpackClass"
                placeholder="请选择骑车人包类型"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>上衣颜色：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(2,5)"
                v-model="coatColor"
                placeholder="请选择上衣颜色"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>上衣图案：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(2,6)"
                v-model="coatPattern"
                placeholder="请选择上衣图案"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>车身颜色：
                <i></i>
              </span>
              <el-select
                @visible-change="getpropers(2,8)"
                v-model="vehicleColor"
                placeholder="请选择车身颜色"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>违法载人：
                <i></i>
              </span>
              <el-select @visible-change="getpropers(2,9)" v-model="manned" placeholder="请选择违法载人">
                <el-option label value></el-option>
                <el-option
                  v-for="(item,index) in propertyList"
                  :label="item.valueString"
                  :value="item.valueString"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
          </div>
        </div>
        <div class="searchbtm" id="searchTop2">
          <ul class="strusResult">
            <li
              v-for="(item,index) in strusResultList"
              :class="isactive == index ? 'markNone' : '' "
              :key="index"
              @mouseover="getInfo(item,$event)"
              @click.stop="ClickCheckd(item, index)"
              @mouseout="leaveProperty"
            >
              <p class="playItem none" title="播放" @click="clickVideo(item,index)"></p>
              <p class="tagconvert bigimg none" title="查看大图" @click="lookBigImg(item, isoptfor)"></p>
              <p class="tagconvert transmitPic none" title="转标注" @click="confimTag(item, isoptfor)"></p>
              <p class="tagconvert searchPic none" title="快捷以图搜图" @click="fastsearchimg(item,2)"></p>
              <img class="imgurl" :src="item.traceImgUrl" alt>
              <!-- <i v-if="searchDownImg == 2" :class="item.state ? 'ONimg' : 'OFFimg'"></i> -->
              <i v-if="searchDownImg == 2" :class="strusResultList[index].state ? 'ONimg' : 'OFFimg'"></i>
            </li>
            <div v-if="!strusResultList.length" class="noImg" style="margin: 1.4rem auto;">
              <img src="../../../assets/updataImg/NoData.png" />
            </div>
          </ul>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <i
          :title="bigfullScreen ? '还原' : '最大化' "
          class="iconfont fullScreen"
          :class="bigfullScreen ? 'icon-zuidahua' : 'icon-huanyuan'"
        ></i>
        <el-button v-show="searchDownImg == 2" class="primary cancleBtn" @click="cancleSearch">取消选择</el-button>
        <el-button v-show="searchDownImg == 2" class="primary cancleBtn" @click="confirmDown">确定选择</el-button>
        <el-button class="primary cancleBtn" v-show="searchDownImg == 1" v-no-more-click  @click="selectImg">选择下载</el-button>
        <el-button type="primary"  class="primary cancleBtn" v-no-more-click @click="batchDownLoad">批量下载</el-button>
        <el-button class="cancleBtn" @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button @click="dialogVisible = false"></el-button>
        <el-button  @click="dialogVisible = false"></el-button>-->
      </span>
    </el-dialog>

      <el-dialog
      title="下载"
      :visible.sync="dialogDownLoad"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="openDownData"
      width="25%">
      <div class="multipleChoice">
        <el-radio-group v-model="radio1"  @change="switchDown">
          <el-radio :label="1">序号</el-radio>
          <el-radio :label="2">时间段</el-radio>
          <el-radio :label="3">全部</el-radio>
        </el-radio-group>
      </div>
      <div class="downImg" v-if="radio1 == '1'">
        <span>序号 :&nbsp;</span>
        <input class="placeDown" type="number" :min="1" :max="this.strusResultList.length"  v-model="minDownImg"/> ------
        <input class="placeDown" type="number" :min="1" :max="10000" v-model="maxDownImg"/>
      </div>
      <div class="downImg" v-if="radio1 == '2'">
        <span>时间 :&nbsp;</span>
        <el-input type="text" class="caseNameSelect caseNameSelectDate" id="beginDelTime" readonly v-model="beginData" placeholder="请选择开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
        </el-input> -
        <el-input type="text" class="caseNameSelect caseNameSelectDate" id="endDelTime" readonly v-model="endData" placeholder="请选择结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
        </el-input>
      </div>
      <div class="downImg">
        <el-checkbox v-model="thumbnail">缩略图</el-checkbox>
        <el-checkbox v-model="HD">高清</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancleBtn" @click="dialogDownLoad = false">取 消</el-button>
        <el-button type="primary" class="passBtn" @click="getProress" v-no-more-click>确 定</el-button>
        <!-- <el-button type="primary" v-show="istwoinves == 1"  class="passBtn" @click="settleDown(2)" v-no-more-click>确 定</el-button> -->
      </span>
    </el-dialog>
     <el-dialog
      title="导出"
      :visible.sync="exportDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="25%">
      <div class="downImg">
        <p>操作提示：（略缩图或高清，至少选择一种导出）</p>
        <el-checkbox v-model="thumbnail">缩略图</el-checkbox>
        <el-checkbox v-model="HD">高清</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancleBtn" @click="exportDialog = false">取 消</el-button>
        <el-button type="primary" class="passBtn" @click="trueDown" v-no-more-click>确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import glstproperty from "../../../api/realvideo/glstproperty.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import scale from "../../../api/common/scale.js"; //图片自适应的方法
import _ from 'lodash'

export default {
  data() {
    return {
      dialogVisible: false,
      isoptfor: 1, //人车骑车人的切换
      beginData: "",
      endData: "",
      currentPage: 1,
      pageSize: 21,
      pageSizes: [21, 42, 63],
      totalCount: 0,
      timesNum: null,
      strusResultList: [],
      isactive: null, //当前选中的索引
      bigfullScreen: false, //当前是否是全屏
      loading: null,
      searchDownImg: 1,
      dialogDownLoad: false,
      strusList: [],
      minDownImg: '1',
      maxDownImg: '1',
      thumbnail: true,
      HD: true,
      Checkd:[], //勾选
      groundIds: [], //存放选中的id数组
      exportDialog:false,
      aaa:[],
      radio1:1, // 默认序号
      searchDownImg: 1,
      userId:'',// 用户id
    };
  },
  mounted() {
    this.userId = this.$storage.getSession('userInfo').userId // 获取用户id
  },
  watch: {
    showAllTarget(val) {
      this.dialogVisible = val;
    }
  },
  mixins: [glstproperty, beginEnd, scale],
  props: {
    showAllTarget: Boolean
  },
  computed: {
    ...mapGetters(["targetToSearchImg"])
  },
  methods: {
    ...mapMutations([
      "setshowDxplayer", //设置播放的打开控制按钮
      "setDxplayerInfo", //设置播放器的值
      "setdeviceInfo",
      "setglstargetinfo", //格林深瞳赋值
      "setshowglstinfo", //是否显示结构化信息
      "setshowlookImgPic", //查看大图的控制
      "setglstfeature", //以图搜图的特征值
      "settargetToSearchImg" //设置以图搜图关闭后打开的值
    ]),
    clickVideo(item, index) {
      this.isactive = index;
      this.setDxplayerInfo(item);
      this.setshowDxplayer(true);
      document.title = document.title + ".";
      // item.startTime = item.fileStartTime;
      this.setdeviceInfo(item);
    },
    //关闭模态框
    closeDia() {
      if(this.bigfullScreen){
        this.$nextTick(()=>{
          this.bigfullScreen = false
          window.isFullScreen = false
          // 设置模态框显示的
          // this.invesdialogVisible = false
          this.$refs.dialogSearch.$el.querySelector('.el-dialog').style.height = '8.25rem'
          this.$refs.dialogSearch.$el.querySelector('.el-dialog').style.width = window.nowWidth + 'px'
          this.$refs.dialogSearch.$el.querySelector('.el-dialog').style.marginTop = window.nowMarginTop
          document.getElementsByClassName('globalSearch')[0].childNodes[0].childNodes[1].style.height = '7.5rem'
        })
      }
      OnExit();
      CloseVodPlayer();
      this.setshowglstinfo(false);
      clearInterval(window.g_interval);
      window.g_openplay = false;
      document.title = document.title.split(".")[0];
      this.$emit("childbyglobalSearch", false);
      if (
        this.targetToSearchImg.type == undefined ||
        this.targetToSearchImg.type == 0
      ) {
        this.strusResultList = [];
        this.totalCount = 0;
        this.currentPage = 1;
      }
      clearInterval(this.timesNum);
      this.clearporpe();
      this.isactive = null;
      this.searchDownImg = 1
    },
    //打开模态框
    opendia() {
      if (this.targetToSearchImg.type == undefined || this.targetToSearchImg.type == 0) {
          console.log(33333);
        this.strusResultList = [];
        this.$nextTick(() => {
          this.getTimeTobe(this.$route.query.caseUuid);
        });
        this.isoptfor = 1;
      } else {
          console.log(555555);
          console.log(this.strusResultList,8777);
        // type = 4 走以图搜图逻辑
        if (this.isoptfor == 2) {
          this.beginData = this.targetToSearchImg.globalList.startTime;
          this.endData = this.targetToSearchImg.globalList.endTime;
          this.coatLength = this.targetToSearchImg.globalList.coatLength; //上衣款式
          this.coatPattern = this.targetToSearchImg.globalList.coatPattern; //上衣纹理
          this.coatColor = this.targetToSearchImg.globalList.coatColor; //上衣颜色        //人骑车人共用
          this.trousersStyle = this.targetToSearchImg.globalList.trousersStyle; //下衣类别
          this.trousersColor = this.targetToSearchImg.globalList.trousersColor; //下衣颜色
          this.shoesStyle = this.targetToSearchImg.globalList.shoesStyle; //鞋子款式
          this.shoesColor = this.targetToSearchImg.globalList.shoesColor; //鞋子颜色
          this.sex = this.targetToSearchImg.globalList.sex; //性别                  //人骑车人共用
          // this.ethnic = this.targetToSearchImg.globalList.ethnic;  //民族               //人骑车人共用
          this.headLandMark = this.targetToSearchImg.globalList.headLandMark; //头部标识物   //人骑车人共用
          this.accessoryItem = this.targetToSearchImg.globalList.accessoryItem; //附属物品
          this.hairStyle = this.targetToSearchImg.globalList.hairStyle; //发型
          this.age = this.targetToSearchImg.globalList.age; //年龄
          this.packageStyle = this.targetToSearchImg.globalList.packageStyle; //包款式
          this.targetToSearchImg.isoptfor = this.isoptfor;
        } else if (this.isoptfor == 3) {
          this.beginData = this.targetToSearchImg.globalList.startTime;
          this.endData = this.targetToSearchImg.globalList.endTime;
          this.vehicleAngle = this.targetToSearchImg.globalList.vehicleAngle; //车辆角度     //车和骑车人共用
          this.vehicleClass = this.targetToSearchImg.globalList.vehicleClass; //车辆型号     //车和骑车人共用
          this.vehicleColor = this.targetToSearchImg.globalList.vehicleColor; //车辆颜色     //车和骑车人共用
          this.landMark = this.targetToSearchImg.globalList.landMark; //车辆标识
          this.faceMask = this.targetToSearchImg.globalList.faceMask; //面部遮挡        0：遮挡，1：为遮挡
          this.plateColor = this.targetToSearchImg.globalList.plateColor; //车牌颜色
          this.plateClass = this.targetToSearchImg.globalList.plateClass; //车牌类型
          this.specialVehicles = this.targetToSearchImg.globalList.specialVehicles; // 特殊车辆
          this.vehicleBack = this.targetToSearchImg.globalList.vehicleBack; // 车后盖
          this.bodyBreakage = this.targetToSearchImg.globalList.bodyBreakage; // 车身破损
          this.roofGoods = this.targetToSearchImg.globalList.roofGoods; // 车顶物件
          this.plateOcclusion = this.targetToSearchImg.globalList.plateOcclusion; // 车牌遮挡
          this.bodyRed = this.targetToSearchImg.globalList.bodyRed; // 车身红绳
        } else {
          this.beginData = this.targetToSearchImg.globalList.startTime;
          this.endData = this.targetToSearchImg.globalList.endTime;
          this.backpackClass = this.targetToSearchImg.globalList.backpackClass; //骑车人包类型
          this.coatPattern = this.targetToSearchImg.globalList.coatPattern; //上衣纹理
          this.manned = this.targetToSearchImg.globalList.manned; //违法载人
          this.vehicleClass = this.targetToSearchImg.globalList.vehicleClass; //车型
          this.headLandMark = this.targetToSearchImg.globalList.headLandMark; //头部标识物
          this.vehicleAngle = this.targetToSearchImg.globalList.vehicleAngle; //车辆角度
          this.sex = this.targetToSearchImg.globalList.sex; //骑车人性别
          // this.ethnic = this.targetToSearchImg.globalList.ethnic;  //骑车人民族
          this.coatColor = this.targetToSearchImg.globalList.coatColor; //上衣颜色
          this.vehicleColor = this.targetToSearchImg.globalList.vehicleColor; //车身颜色
        }
      }
    },
    //重置
    resetResult() {
      this.isactive = null;
      this.clearporpe();
      this.currentPage = 1;
      this.pageSize = 21;
      this.strusResultList = [];
      this.getTimeTobe(this.$route.query.caseUuid);
    },
    //切换类型
    checkTarget(type) {
      console.log(this.targetToSearchImg,'hahaha');
      window.axiosProArr.forEach((e, i) => {
                if(sessionStorage.getItem('isUploadTrue') != 1){
                    e.cancle();
                    delete window.axiosProArr[i]
                }
            });
      this.isactive = null;
      this.isoptfor = type;
      this.clearporpe();
      this.currentPage = 1;
      this.strusResultList = [];
      this.searchDownImg = 1
      this.totalCount = 0;
      this.getTimeTobe(this.$route.query.caseUuid);
      if (this.bigfullScreen) {
        setTimeout(() => {
          Array.from(
            document.getElementById("searchImgResult").children
          ).forEach(item => {
            item.style.width = "24%";
          });
        }, 100);
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.searchResult();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(this.currentPage,'haha');
      this.searchResult();
    },
    //通过当前案件获取所有文件的最小时间和最大时间
    getTimeTobe(id) {
      let data = {
        caseUuid: id
      };
      this.$http.get("vsas/structure/getDate", { params: data }).then(res => {
        if (res.data.code == 200) {
          this.beginData = res.data.data.startTime;
          this.endData = res.data.data.endTime;
          this.searchResult();
          setTimeout(() => {
            this.OpenTheTime4("#globalbegin", "#globalend");
          }, 500);
        }
      });
    },
    //得到当前的结果
    searchResult() {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      let data = {
        startTime: this.beginData,
        endTime: this.endData,
        caseUuid: this.$route.query.caseUuid,
        type: this.isoptfor,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      let strusinfo = this.getstrusinfo(); //得到结构化信息
      let datas = Object.assign(data, strusinfo);
      datas = this.$qs.stringify(datas);
      this.$http
        .post("/vsas/structure/getAllStructure", datas)
        .then(res => {
          this.loading.close();
          if (res.data.code == 200) {
            var obj = {}
            this.strusResultList = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
            if(this.strusResultList.length){
              for (let i = 0; i < this.strusResultList.length; i++) {
               this.strusResultList[i].state = false
               console.log(this.strusResultList[i].state,'33333');
              }
              console.log(this.groundIds,'55555');
              if(this.groundIds.length){
                for (let i = 0; i < this.strusResultList.length; i++) {
                    for (let k = 0; k < this.groundIds.length; k++) {
                      if(this.groundIds[k] == this.strusResultList[i].personUuid) {
                        this.strusResultList[i].state = true
                      } else if(this.groundIds[k] == this.strusResultList[i].vehicleUuid) {
                        this.strusResultList[i].state = true
                      } else if(this.groundIds[k] == this.strusResultList[i].bicycleUuid) {
                        this.strusResultList[i].state = true
                      }
                    }
                }
              }
            }
          }
        })
        .catch(() => {
          this.loading.close();
        });
    },
    //返回结构化信息
    getstrusinfo() {
      //this.isoptfor == 1 表示行人 this.isoptfor == 2 表示车 this.isoptfor == 3表示骑车人
      let data = {};
      //定义一个空对象
      if (this.isoptfor == 1) {
        data = {
          coatLength: this.coatLength, //上衣款式
          coatPattern: this.coatPattern, //上衣纹理
          coatColor: this.coatColor, //上衣颜色        //人骑车人共用
          trousersStyle: this.trousersStyle, //下衣类别
          trousersColor: this.trousersColor, //下衣颜色
          shoesStyle: this.shoesStyle, //鞋子款式
          shoesColor: this.shoesColor, //鞋子颜色
          sex: this.sex, //性别                  //人骑车人共用
          // ethnic:this.ethnic,  //民族               //人骑车人共用
          headLandMark: this.headLandMark, //头部标识物   //人骑车人共用
          accessoryItem: this.accessoryItem, //附属物品
          hairStyle: this.hairStyle, //发型
          age: this.age, //年龄
          packageStyle: this.packageStyle, //包款式
          startTime: this.beginData,
          endTime: this.endData
        };
      } else if (this.isoptfor == 2) {
        data = {
          vehicleAngle: this.vehicleAngle, //车辆角度     //车和骑车人共用
          vehicleClass: this.vehicleClass, //车辆型号     //车和骑车人共用
          vehicleColor: this.vehicleColor, //车辆颜色     //车和骑车人共用
          landMark: this.landMark, //车辆标识
          faceMask: this.faceMask, //面部遮挡        0：遮挡，1：为遮挡
          plateColor: this.plateColor, //车牌颜色
          plateClass: this.plateClass, //车牌类型
          specialVehicles: this.specialVehicles, //特殊车辆
          vehicleBack: this.vehicleBack, // 车后盖
          bodyBreakage: this.bodyBreakage, // 车身破损
          roofGoods: this.roofGoods, //车顶物件
          plateOcclusion: this.plateOcclusion, // 车牌遮挡
          bodyRed: this.bodyRed, // 车辆红绳
          startTime: this.beginData,
          endTime: this.endData
        };
      } else if (this.isoptfor == 3) {
        data = {
          backpackClass: this.backpackClass, //骑车人包类型
          coatPattern: this.coatPattern, //上衣纹理
          manned: this.manned, //违法载人
          vehicleClass: this.vehicleClass, //车型
          headLandMark: this.headLandMark, //头部标识物
          vehicleAngle: this.vehicleAngle, //车辆角度
          sex: this.sex, //骑车人性别
          coatColor: this.coatColor, //上衣颜色
          vehicleColor: this.vehicleColor, //车身颜色
          startTime: this.beginData,
          endTime: this.endData
        };
      }
      return data;
    },

    //查看当前的点位
    //鼠标移动的时候展示zky结构化的详细信息
    getInfo(item, e) {
      //1表示行人2表示车3表示骑车人
      if (this.isoptfor == 1) {
        item.glsttype = 1;
      } else if (this.isoptfor == 2) {
        item.glsttype = 2;
      } else if (this.isoptfor == 3) {
        item.glsttype = 3;
      }
      this.setshowglstinfo(true);
      document.getElementById("glstinfo").style.left = e.clientX + 50 + "px";
      document.getElementById("glstinfo").style.top = e.clientY - 170 + "px";
      this.setglstargetinfo(item);
    },
    //鼠标移开的时候执行的方法,关闭结构化的详细信息
    leaveProperty() {
      this.setshowglstinfo(false);
    },
    //查看大图功能
    lookBigImg(item) {
      this.setshowglstinfo(false);
      this.setshowlookImgPic(true); // 触发大图点击事件
      if (this.isoptfor == 1) {
        item.glsttype = 1;
      } else if (this.isoptfor == 2) {
        item.glsttype = 2;
      } else if (this.isoptfor == 3) {
        item.glsttype = 3;
      }
      this.setglstargetinfo(item);
    },
    // 结构化结果转转标注
    confimTag(item, type) {
      let targetId = "";
      if (item.personUuid != undefined) {
        targetId = item.personUuid;
      } else if (item.bicycleUuid != undefined) {
        targetId = item.bicycleUuid;
      } else if (item.vehicleUuid != undefined) {
        targetId = item.vehicleUuid;
      }
      let newType = ''
      if(type == 1) {
        newType = 1
      } else if(type == 2) {
        newType = 3
      } else if(type == 3) {
        newType = 2
      }
      let data = {
        targetIds: targetId, // 选择 (英文逗号分隔)
        targetType: newType, // 人，车，骑车人
        suspicionUuid: ""
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/convert/target/to/mark", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "创建转标注任务成功！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "warning",
            message: "创建转标注任务失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //点击搜开始搜索图片特征并快速链接到以图搜图页面
    fastsearchimg(row, zkyNum) {
      let uuid;
      if (this.isoptfor == 1) {
        uuid = row.personUuid;
      } else if (this.isoptfor == 2) {
        uuid = row.vehicleUuid;
      } else if (this.isoptfor == 3) {
        uuid = row.bicycleUuid;
      }
      let data = {
        caseUuid: this.$route.query.caseUuid,
        type: this.isoptfor, //表示人。车。骑车人
        uuid: uuid
      };
      this.$http
        .get("vsas/structure/getFeature", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            let feautrue = res.data.data;
            row.Features = res.data.data;
            this.setglstfeature(row);
            this.$emit("childbyopenSearchImg", false);
            OnExit();
            CloseVodPlayer();
            clearInterval(window.g_interval);
            let saveAllList = this.getstrusinfo();
            let data = {
              type: 4,
              isoptfor: this.isoptfor,
              globalList: saveAllList
            };
            console.log(data,66666);
            this.settargetToSearchImg(data);
            this.dialogVisible = false;
          } else if(res.data.code == 100){
            this.$notify({
              type: 'warning',
              message: '获取特征失败',
              position: 'bottom-right',
              duration: 3000
            });
          } else {
            this.$notify({
              type: 'warning',
              message: '获取特征值失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        });
    },
     //得到当前案件下的当前点位的最大时间和最小时间
     getChangeTime(id) {
      let data = {
        caseUuid: id,
      };
      this.$http.get("vsas/structure/getDate", { params: data }).then(res => {
        if (res.data.code == 200) {
          this.beginData = res.data.data.startTime;
          this.endData = res.data.data.endTime;
          this.$nextTick(()=>{
            this.OpenTheTime4("#beginDelTime", "#endDelTime");
          })
        }
      });
    },
    //切换下载
    switchDown(val){
      if(val == '2'){ // 时间段
        this.getChangeTime(this.$route.query.caseUuid)
      } else {
        this.minDownImg = 1
        this.maxDownImg = this.totalCount
      }
    },
    // 选择下载
    selectImg(){
      this.searchDownImg = 2 //确定选择，取消选择
      this.groundIds = []
      for (let i = 0; i < this.strusResultList.length; i++) {
        this.strusResultList[i].state = false
      }
    },
    // 确定选择
    confirmDown() {
      if(!this.groundIds.length) {
          this.$notify({
          type: 'warning',
          message: '请勾选图片！',
          position: 'bottom-right',
          duration: 3000
        })
      } else {
        this.exportDialog = true // 弹层页面
        this.thumbnail = true
        this.HD = true
      }
    },
    // 取消选择
    cancleSearch() {
      this.searchDownImg = 1
      this.groundIds = []
    },
    // 批量下载
    batchDownLoad() {
      this.dialogDownLoad = true
      this.searchDownImg = 1
    },
    // 批量下载
    openDownData() {
      this.radio1 = 1
      this.minDownImg = 1
      this.maxDownImg = this.totalCount
    },
    // 验证最小数量
    verifymin(){
      this.minDownImg = this.minDownImg.replace('/^(0+)|[^\D]+/g','')
      if(this.minDownImg <= 0 || this.minDownImg >= this.videoList.length){
        this.minDownImg = 1
      }
    },
    // 确定批量
    getProress() {
      this.allDown()
    },
    // 下载通用参数提取
    commonList(){
      let strusinfo = {
        caseUuid:this.$route.query.caseUuid,
        curUserId:this.userId,
        type:this.isoptfor,
        thumbnail:this.thumbnail == true ? 1 : 0,
        HD:this.HD == true ? 1 : 0,
      }
      return strusinfo
    },
     // 下载所有
    allDown(){
      let data = {}
      if(this.thumbnail == false && this.HD == false){ // 不勾选缩略图，高清图的判断
        this.$notify({
          type: 'warning',
          message: '请勾选导出项！',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      if(this.radio1 == 1){ // 序号
        let navList = this.commonList()
        data = {
          startNumber:this.minDownImg,
          endNumber:this.maxDownImg,
        }
        data = Object.assign(navList,data)
      } else if(this.radio1 == 2){ // 时间
        let navList = this.commonList()
        data = {
          startTime:this.beginData,
          endTime:this.endData
        }
        data = Object.assign(navList,data)
      } else { // 全部
        let navList = this.commonList()
        data = {
          startTime:'',
          endTime:'',
        }
        data = Object.assign(navList,data)
      }
      data = this.$qs.stringify(data);
      this.$http.post('vsas/structure/download/structure/getAllStructureResult',data).then(res=>{
        if(res.data.code == 200){
          this.$notify({
            type: 'success',
            message: '下载任务创建成功！',
            position: 'bottom-right',
            duration: 3000
          });
          this.dialogDownLoad = false
        } else if(res.data.code == 100) {
          this.$notify({
            type: 'warning',
            message: '查询内容为空！',
            position: 'bottom-right',
            duration: 3000
          });
        } else {
          this.$notify({
            type: 'warning',
            message: '下载任务创建失败！',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
     // 勾选导出图片
    ClickCheckd(item,index){
      // 判断勾选项
      item.state = !item.state
      this.$set(this.strusResultList, index, item)
      if(!item.state) {
        if(this.groundIds.length) {
          for (let i = 0; i < this.groundIds.length; i++) {
            if(item.personUuid == this.groundIds[i]) {
              this.groundIds = _.pull(this.groundIds, item.personUuid) //删除未勾选的某一项
            } else if(item.vehicleUuid == this.groundIds[i]) {
              this.groundIds = _.pull(this.groundIds, item.vehicleUuid) //删除未勾选的某一项
            } else if(item.bicycleUuid == this.groundIds[i]) {
              this.groundIds = _.pull(this.groundIds, item.bicycleUuid) //删除未勾选的某一项
            }
          }
        }
      }
      if(item.state && item.personUuid) {
        this.groundIds.push(item.personUuid)
      } else if(item.state && item.vehicleUuid){
        this.groundIds.push(item.vehicleUuid)
      } else if(item.state && item.bicycleUuid){
        this.groundIds.push(item.bicycleUuid)
      }
      console.log(this.groundIds, 'jjjjjjjjjj--------------');
    },

     // 确定选择
    trueDown(){
      if(this.thumbnail == false && this.HD == false){ // 不勾选缩略图，高清图的判断
        this.$notify({
          type: 'warning',
          message: '请勾选导出项！',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
        // 下载所有
      let data = {
        caseUuid:this.$route.query.caseUuid,
        ids:this.groundIds.join(','), // 选择 (英文逗号分隔)
        thumbnail:this.thumbnail == true ? 1 : 0, // 缩略图
        HD:this.HD == true ? 1 : 0, // 高清
        type:this.isoptfor, // 人，车，骑车人
        curUserId:this.userId, // 用户id
      }
      data = this.$qs.stringify(data);
      this.$http.post('vsas/structure/download/structure/getAllStructureResult',data).then(res=>{
        if(res.data.code == 200){
          this.$notify({
            type: 'success',
            message: '下载任务创建成功！',
            position: 'bottom-right',
            duration: 3000
          });
          this.searchDownImg = 1
          this.exportDialog = false
        }  else if(res.data.code == 100) {
          this.$notify({
            type: 'warning',
            message: '查询内容为空！',
            position: 'bottom-right',
            duration: 3000
          });
          this.searchDownImg = 1
          this.exportDialog = false
        } else {
          this.$notify({
            type: 'error',
            message: '下载任务创建失败！',
            position: 'bottom-right',
            duration: 3000
          });
          this.searchDownImg = 1
          this.exportDialog = false
        }
      })
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.taskrelation {
  height: 100%;
}
.el-dialog__wrapper /deep/ .el-dialog {
  margin: 0 auto;
}
.searchTop {
  height: 2.3rem;
  overflow: hidden;
}
.searchbtm {
  height: calc(100% - 2.3rem);
  overflow: hidden;
}
.strusResult {
  height: calc(100% - 0.4rem);
  overflow: auto;
  margin-bottom: 0.1rem;
}
.strusResult li {
  width: 12.9%;
  height: 30.5%;
  margin-right: 1.3%;
  margin-bottom: 0.8%;
  border: 1px solid #235588;
  float: left;
  position: relative;
  /* padding: 0.02rem; */
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.strusResult p {
  position: absolute;
  display: none;
}
.strusResult .playItem {
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../../assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}
.strusResult li:hover .none {
  display: block;
}
.avtive {
  border-radius: 5px 0 5px 5px;
  background: #3d82a6 url("../../../assets/images/videoNewImg/btnnormal.png")
    no-repeat center center / 100% 100%;
}
.commBtn {
  display: inline-block;
  width: 0.8rem;
  height: 0.3rem;
  line-height: 0.3rem;
  cursor: pointer;
  font-size: 0.12rem;
  margin-right: 0.1rem;
}
.searchkline {
  position: relative;
}
.searchkline .el-button {
  padding: 0 0.1rem;
  border: 1px solid #133045;
  margin-bottom: 0.1rem;
}
.showinfo {
  padding: 0 0.1rem;
}
.showinfo p {
  display: inline-block;
  height: 0.3rem;
  width: 32%;
}
.showinfo p > span {
  width: 1rem;
  line-height: 0.25rem;
  height: 0.25rem;
  float: left;
  color: #99c9fa;
  text-align: justify;
}
.showinfo p /deep/ .el-input__inner {
  height: 0.25rem;
}
.showinfo p .el-select,
.showinfo input {
  width: calc(100% - 1.5rem);
}
.showinfo p i {
  width: 100%;
  display: inline-block;
}

.showinfo input {
  height: 0.25rem;
  padding-left: 0.1rem;
  border-radius: 3px;
}
.fullScreen {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 50px;
  top: 10px;
  cursor: pointer;
  color: #909399;
  font-size: 0.14rem;
}
.fullScreen :hover {
  color: #409eff;
}
.tryBtn,
.searchBtn {
  position: absolute;
  padding: 0;
  width: 0.6rem;
  height: 0.3rem;
}
.tryBtn {
  right: 0.85rem;
}
.searchBtn {
  right: 1.65rem;
}

.imgurl {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.strusResult .markNone {
  border: 1px solid #409eff;
}
.strusResult .tagconvert {
  width: 0.2rem;
  color: #fff;
  cursor: pointer;
  height: 0.2rem;
  line-height: 0.2rem;
  text-align: center;
  padding: 0 0.1rem;
  font-size: 0.12rem;
  bottom: 0.03rem;
  z-index: 2;
}
.strusResult .bigimg {
  right: 0.7rem;
  bottom: 0;
  background: url("../../../assets/images/videoNewImg/lookPic.png") no-repeat;
}
.strusResult .transmitPic {
  right: 0.4rem;
  background: url("../../../assets/images/videoNewImg/transmitPic.png")
    no-repeat;
}
.strusResult .searchPic {
  right: 0.1rem;
  background: url("../../../assets/images/videoNewImg/searchPic.png") no-repeat;
}
.strusResult li i{
  position: absolute;
  width: 0.13rem;
  height: 0.13rem;
  top: 0.03rem;
  right: 0.03rem;
  cursor: pointer;
}
.ONimg{
  background:url(../../../assets/ImgCheckdON.png) no-repeat center center;
  background-size:100% 100%;
}
.OFFimg{
  background:url(../../../assets/ImgCheckdOFF.png) no-repeat center center;
  background-size:100% 100%;
}
.placeDown{
  width: .9rem;
  height: .25rem;
  padding-left: .1rem;
  height: 0.25rem;
}
.downImg{
  margin-bottom:0.1rem;
}
.downImg span{
  color: #99c9fa;
}
.downImg .el-input{
  width: 1.8rem;
}
.downImg p{
  color:#409eff;
  margin-bottom: 0.05rem;
}
.multipleChoice /deep/ .el-radio{
  display: inline-block;
  margin-bottom: 0.1rem;
  margin-right: 0.4rem;
}
</style>

<style>
.globalSearch /deep/ .el-dialog__body {
  height: 7.5rem;
}
</style>

