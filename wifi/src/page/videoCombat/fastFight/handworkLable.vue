<template>
  <div>
    <el-dialog
      title="手工标注"
      :visible="dialogVisible"
      class="whyDialogs"
      id="whyDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="70%"
      @close="closeDia"
      @open="openDialog"
      :append-to-body="true"
      top="8vh"
    >
      <div v-if="dialogVisible" style="height:6.5rem" id="bigHand">
        <div class="comm_left">
          <p class="titles">
            <b>|</b>&nbsp;&nbsp;目标标注
          </p>
          <div class="img_left" v-if="!isonline" id="VideoPlayImgLeft">
            <canvas id="VideoPlayCanvas"></canvas>
            <img id="VidoePlayImgUrl" :src="videoimg" alt>
            <canvas id="imgcanvas" v-show="istrueCanvas"></canvas>
          </div>
          <div class="img_left" v-if="isonline" id="hisPlayImgLeft">
            <canvas id="hisPlayCanvas"></canvas>
            <img id="hisPlayImgUrl" :src="videoimg" alt>
            <canvas id="imgcanvas" v-show="istrueCanvas"></canvas>
            <!-- <canvas id="hisimgcanvas"></canvas> -->
          </div>
        </div>
        <div class="comm_right">
          <p class="titles title_top" id="ffff">
            <b>|</b>&nbsp;&nbsp;标注信息
          </p>
          <!-- 人脸和比对详情 -->
          <div class="humanface" id="manface" ref="manface">
            <span class="closeStyle el-icon-close" @click="closefacelist"></span>
            <div class="humanface_btn">
              <p>比对结果列表</p>
              <ul>
                <li
                  v-for="(item,index) in imgCaleList"
                  @mouseover="lookfaceInfo(item,$event)"
                  @mouseout="leavefaceInfo()"
                  :key="index"
                >
                  <img
                    v-if="!item.caseUuid"
                    class="btnone"
                    :id="'candidateCase_'+index"
                    :src="item.faceUrl"
                    alt
                  >
                  <!-- <img v-show="item.caseUuid" src="http://172.24.1.222/group2/M00/0D/A9/rBgB3lxzprCAEJKgAABvJeAhCa8915.png" alt=""> -->
                  <img
                    v-if="item.caseUuid"
                    class="btntwo"
                    :id="'candidateCase_'+index"
                    :src="item.faceUrl"
                  >
                  <p>
                    相似度
                    <span>{{item.score | score }}</span>
                  </p>
                  <span v-show="!item.caseUuid">信</span>
                  <span v-show="item.caseUuid">案</span>
                  <!-- <el-button v-show="!item.caseUuid" @click="getInfotoLable(item)" class="searchBtn">落</el-button> -->
                  <!-- <el-button v-show="item.caseUuid" @click="caseRatio(item)" class="searchBtn">串</el-button> -->
                </li>
              </ul>
              <el-pagination
                background
                :small="true"
                :pager-count="5"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="comparTotal"
              ></el-pagination>
            </div>
          </div>
          <!-- 展示人脸信息 -->
          <div class="faceInfo" v-show="showFaceLog">
            <p>识别人脸</p>
            <div class="faceDiv" id="faceDiv">
              <ul id="faceId">
                <li v-for="(faceItem,index) in faceToList" :key="index">
                  <!-- <span class="el-icon-arrow-right" @click="nextTo"></span> -->
                  <!-- <span class="el-icon-arrow-left" @click="prveTo"></span> -->
                  <img
                    :style="{'top':-faceItem.top+'px', 'left': -faceItem.left+'px'}"
                    :width="faceItem.width"
                    :height="faceItem.height"
                    :src="videoimg"
                  >
                  <p
                    v-preventReClick="1000"
                    @click="showfacelist(index,$event)"
                    class="compare"
                    title="人脸比对"
                  >比</p>
                  <!-- <el-button class="searchBtn" @click="addFacePut(index)">是否入库</el-button> -->
                  <el-checkbox v-model="isFacePut">人脸入库</el-checkbox>
                </li>
              </ul>
            </div>
            <div class="faceassignInfo" v-show="showFaceLib">
              <div>
                <img :src="infolable.faceUrl" alt>
              </div>
              <div class="facedetail">
                <i class="el-icon-close" @click="infolable = {};showFaceLib = false"></i>
                <p>人员信息</p>
                <ul>
                  <li>
                    <span>姓名&nbsp;:&nbsp;</span>
                    <span :title="infolable.name">{{infolable.name}}</span>
                  </li>
                  <li>
                    <span>出生日期&nbsp;:&nbsp;</span>
                    <span :title="infolable.birthday">{{infolable.birthday}}</span>
                  </li>
                  <li>
                    <span>性别&nbsp;:&nbsp;</span>
                    <span>{{infolable.sex == '0' ? '男' : '女'}}</span>
                  </li>

                  <li class="biglenght">
                    <span>身份证&nbsp;:&nbsp;</span>
                    <span :title="infolable.certNumber">{{infolable.certNumber}}</span>
                  </li>
                  <li>
                    <span>库类型&nbsp;:&nbsp;</span>
                    <span>人脸库</span>
                  </li>
                  <!-- <li class="biglenght">
                    <span>家庭住址&nbsp;:&nbsp;</span>
                    <span>湖北省武汉市高科大厦</span>
                  </li>-->
                  <li>
                    <span>备注信息&nbsp;:&nbsp;</span>
                    <span :title="infolable.remark">{{infolable.remark}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="markSus">
            <p class="main_title">
              <span>
                <b>|</b>&nbsp;目标类型
              </span>
              <span v-show="$route.path == '/videoCombat/addcasetwo'">嫌疑目标对象</span>
            </p>
            <el-radio-group v-model="checkShow" :disabled="ishandupdate" @change="radioChange">
              <el-radio :label="1">人</el-radio>
              <el-radio :label="2">骑车人</el-radio>
              <el-radio :label="3">车辆</el-radio>
            </el-radio-group>
            <el-select
              v-model.trim="suspicion"
              :disabled="ishandupdate"
              v-show="$route.path == '/videoCombat/addcasetwo'"
              value-key="suspicionUuid"
            >
              <el-option
                :value="alltype"
                :key="alltype.suspicionName"
                :label="alltype.suspicionName"
              ></el-option>
              <el-option
                v-for="sus in suspcitionList"
                :key="sus.suspicionUuid"
                :label="sus.suspicionName"
                :value="sus"
              ></el-option>
            </el-select>
          </div>
          <div>
            <p class="main_title">
              <span>
                <b>|</b>&nbsp;标注信息
              </span>
            </p>
            <div class="lableTime">
              <p>
                <span>
                  <b style="color:red">*</b> 标注名称 :&nbsp;
                </span>
                <input type="text" v-model="lableName" maxlength="30" placeholder="请输入标注名称">
              </p>
              <p>
                <span>标注时间 :&nbsp;</span>
                <input
                  type="text"
                  disabled
                  class="cccc"
                  readonly
                  v-model="lableTime"
                  id="test1"
                  placeholder="请输入标注时间"
                >
              </p>
            </div>
          </div>
          <div>
            <p class="main_title">
              <span>
                <b>|</b>&nbsp;目标信息
              </span>
            </p>
            <div class="imgtrait">
              <ul v-show="personshow">
                <li>
                  <span>性别 :&nbsp;</span>
                  <el-select
                    v-model="Gender"
                    @visible-change="getstructurList('GenderType')"
                    placeholder="请选择性别"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>体态 :&nbsp;</span>
                  <el-select
                    v-model="posture"
                    @visible-change="getstructurList('BodyType')"
                    placeholder="请选择体态"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>民族 :&nbsp;</span>
                  <el-select
                    v-model="EthicCode"
                    @visible-change="getstructurList('EthicCodeType')"
                    placeholder="请选择民族"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>年龄段 :&nbsp;</span>
                  <el-select
                    v-model="PersonAge"
                    @visible-change="getstructurList('PersonAgeType')"
                    placeholder="请选择年龄段"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>朝向 :&nbsp;</span>
                  <el-select
                    v-model="PersonView"
                    @visible-change="getstructurList('PersonViewType')"
                    placeholder="请选择朝向"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>发型 :&nbsp;</span>
                  <el-select
                    v-model="HairStyle"
                    @visible-change="getstructurList('HairStyleType')"
                    placeholder="请选择发型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>头发颜色 :&nbsp;</span>
                  <el-select
                    v-model="HairColor"
                    @visible-change="getstructurList('HairColorStyle')"
                    placeholder="请选择头发颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>上衣类型 :&nbsp;</span>
                  <el-select
                    v-model="CoatStyle"
                    @visible-change="getstructurList('CoatStyleType')"
                    placeholder="请选择上衣类型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>上衣颜色 :&nbsp;</span>
                  <el-select
                    v-model="Color"
                    @visible-change="getstructurList('ColorType')"
                    placeholder="请选择上衣颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>上衣纹理 :&nbsp;</span>
                  <el-select
                    v-model="CoatTexture"
                    @visible-change="getstructurList('CoatTextureType')"
                    placeholder="请选择上衣纹理"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>下衣类型 :&nbsp;</span>
                  <el-select
                    v-model="PantsStyle"
                    @visible-change="getstructurList('PantsStyleType')"
                    placeholder="请选择下衣类型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>下衣颜色 :&nbsp;</span>
                  <el-select
                    v-model="CulotteColor"
                    @visible-change="getstructurList('CulotteColorType')"
                    placeholder="请选择下衣颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>鞋子类型 :&nbsp;</span>
                  <el-select
                    v-model="ShoesStyle"
                    @visible-change="getstructurList('ShoesStyleType')"
                    placeholder="请选择鞋子类型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>鞋子颜色 :&nbsp;</span>
                  <el-select
                    v-model="ShoesColor"
                    @visible-change="getstructurList('ShoesColorType')"
                    placeholder="请选择鞋子颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>包类型 :&nbsp;</span>
                  <el-select
                    v-model="BagStyle"
                    @visible-change="getstructurList('BagStyleType')"
                    placeholder="请选择包类型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>包颜色 :&nbsp;</span>
                  <el-select
                    v-model="BagColor"
                    @visible-change="getstructurList('BagColorType')"
                    placeholder="请选择包颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>携物 :&nbsp;</span>
                  <el-select
                    v-model="HandArticle"
                    @visible-change="getstructurList('HandArticleType')"
                    placeholder="请选择携物"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
              </ul>
              <ul v-show="carshow">
                <li>
                  <span>车牌号码 :&nbsp;</span>
                  <input
                    type="text"
                    class="carNum"
                    maxlength="20"
                    v-model="carPlateNum"
                    placeholder="请输入车牌号码"
                  >
                </li>
                <li>
                  <span>车辆类型 :&nbsp;</span>
                  <el-select v-model="cartarget" placeholder="请选择车辆类型">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>车牌种类 :&nbsp;</span>
                  <el-select
                    v-model="PlateClass"
                    @visible-change="getstructurList('PlateClassType')"
                    placeholder="请选择车牌种类"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>车牌颜色 :&nbsp;</span>
                  <el-select
                    v-model="carPlateColor"
                    @visible-change="getstructurList('PlateColorType')"
                    placeholder="请选择车牌颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>车身颜色 :&nbsp;</span>
                  <el-select
                    v-model="carColor"
                    @visible-change="getstructurList('VehicleKindColorType')"
                    placeholder="请选择车身颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
              </ul>
              <ul v-show="cpshow">
                <li>
                  <span>性别 :&nbsp;</span>
                  <el-select
                    v-model="Gender"
                    @visible-change="getstructurList('GenderType')"
                    placeholder="请选择性别"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>体态 :&nbsp;</span>
                  <el-select
                    v-model="posture"
                    @visible-change="getstructurList('BikeBodyType')"
                    placeholder="请选择体态"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>民族 :&nbsp;</span>
                  <el-select
                    v-model="EthicCode"
                    @visible-change="getstructurList('EthicCodeType')"
                    placeholder="请选择民族"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>年龄段 :&nbsp;</span>
                  <el-select
                    v-model="PersonAge"
                    @visible-change="getstructurList('PersonAgeType')"
                    placeholder="请选择年龄段"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>朝向 :&nbsp;</span>
                  <el-select
                    v-model="BikeTowards"
                    @visible-change="getstructurList('BikeTowardsType')"
                    placeholder="请选择朝向"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>发型 :&nbsp;</span>
                  <el-select
                    v-model="BikeHairStyle"
                    @visible-change="getstructurList('BikeHairStyleType')"
                    placeholder="请选择发型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>上衣类型 :&nbsp;</span>
                  <el-select
                    v-model="BikeCoatStyle"
                    @visible-change="getstructurList('BikeCoatStyleType')"
                    placeholder="请选择上衣类型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>上衣颜色 :&nbsp;</span>
                  <el-select
                    v-model="BikeCoatStyleColor"
                    @visible-change="getstructurList('BikeCoatStyleColorType')"
                    placeholder="请选择上衣颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>上衣纹理 :&nbsp;</span>
                  <el-select
                    v-model="BikeCoatTexture"
                    @visible-change="getstructurList('BikeCoatTextureType')"
                    placeholder="请选择上衣纹理"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>下衣类型 :&nbsp;</span>
                  <el-select
                    v-model="BikeCulotteStyle"
                    @visible-change="getstructurList('BikeCulotteStyleType')"
                    placeholder="请选择下衣类型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>下衣颜色 :&nbsp;</span>
                  <el-select
                    v-model="BikeCulotteColor"
                    @visible-change="getstructurList('BikeCulotteColorType')"
                    placeholder="请选择下衣颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>包类型 :&nbsp;</span>
                  <el-select
                    v-model="BikeBag"
                    @visible-change="getstructurList('BikeBagType')"
                    placeholder="请选择包类型"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>包颜色 :&nbsp;</span>
                  <el-select
                    v-model="BikeBagColor"
                    @visible-change="getstructurList('BikeBagColorType')"
                    placeholder="请选择包颜色"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>眼睛 :&nbsp;</span>
                  <el-select
                    v-model="EyePart"
                    @visible-change="getstructurList('EyePartType')"
                    placeholder="请选择眼睛"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>嘴 :&nbsp;</span>
                  <el-select
                    v-model="MouthPart"
                    @visible-change="getstructurList('MouthPartType')"
                    placeholder="请选择嘴"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>围脖 :&nbsp;</span>
                  <el-select
                    v-model="ScarfPart"
                    @visible-change="getstructurList('ScarfPartType')"
                    placeholder="请选择围脖"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>车颜色 :&nbsp;</span>
                  <el-select
                    v-model="BikeColor"
                    @visible-change="getstructurList('BikeColorType')"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>驾驶人数 :&nbsp;</span>
                  <el-select
                    v-model="Driver"
                    @visible-change="getstructurList('DriverCount')"
                    placeholder="请选择驾驶人数"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.field"
                      :value="item.field"
                      :label="item.field"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>是否打伞 :&nbsp;</span>
                  <el-select
                    v-model="BikeUmbrella"
                    @visible-change="getstructurList('BikeUmbrellaFlag')"
                    placeholder="请选择是否打伞"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span class="font">是否携物 :&nbsp;</span>
                  <el-select
                    v-model="BikeCarray"
                    @visible-change="getstructurList('BikeCarraying')"
                    placeholder="请选择是否携物"
                  >
                    <el-option
                      v-for="item in structurList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p class="main_title">
              <span>
                <b>|</b>&nbsp;备注信息
              </span>
            </p>
            <textarea style="resize: none" maxlength="200" v-model="remark"></textarea>
          </div>
        </div>
        <casecomparison
          :isaaa="isaaa"
          :caseUuid="$store.state.caseUuid"
          @incre="childByCaseContrast"
        ></casecomparison>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button
          class="rejectBtn"
          v-no-more-click
          :disabled="disableTrue || isrecognition  || disableClick"
          :title="(disableTrue || isrecognition || disableClick) ? '请框选目标' : ''"
          @click="judged"
          v-show="!isupdatejudged && showjudged && suspicion.suspicionType == -1"
        >研 判</el-button>
        <el-button
          :title="(disableTrue || isrecognition || disableClick) ? '请框选目标' : ''"
          type="primary passBtn"
          v-no-more-click
          :disabled="disableTrue || isrecognition  || disableClick"
          @click="closeVideo"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import handlable from "../../../api/newCaseVideo/handworkLable.js";
import dictionaries from "../../../api/realvideo/dictionaries.js";
import casecomparison from "../../../components/casecomparison";
// import { windowToCanvas, clearRect, imgwh } from "../canvas.js";
import videoDown from "../../../api/casestudy/videoDown.js";
import reviseTime from "../../../api/realvideo/reviseTime.js";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {},
  mixins: [handlable, dictionaries, videoDown, reviseTime],
  watch: {
    showhandword(val) {
      this.dialogVisible = val;
    }
  },
  components: {
    casecomparison
  },
  props: {
    showhandword: Boolean,
    isonline: Boolean
  },
  computed: {
    ...mapGetters([
      "ishandupdate",
      "gethanlabel",
      "deviceInfo",
      "showjudged", //是否开启研判
      "videoretriInfo", //检索片段播放和视频播放时候的信息
      "isupdatejudged"
    ])
  },
  methods: {
    ...mapMutations(["setisupdatejudged"]),
    closeDia() {
      this.setisupdatejudged(false);
      this.istrueCanvas = false;
      this.dialogVisible = false;
      this.disableTrue = true;
      window.g_change = true;
      this.nextCount = 0;
      this.currentPage = 1;
      this.faceToList = [];
      this.pedestrian = {};
      this.showFaceLog = false;
      this.infolable = {};
      this.suspicion = {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "标注池"
      };
      this.getsusInfo = {
        suspicionUuid: "",
        suspicionType: "-1",
        suspicionName: "标注池"
      };
      this.one = 0;
      this.two = 0;
      this.three = 0;
      this.four = 0;
      this.$store.state.showFaceCace = false;
      this.$store.state.showInfo = false;
      OnPlayHide("true");
      let title = "";
      if (this.$route.path == "/videoCombat/videoplay") {
        if (this.isonline) {
          title = document.title + "....";
        } else {
          OnvideoShow(); //显示播放器
          title = document.title + ".";
        }
      } else if (this.$route.path == "/videoCombat/historyvideo") {
        title = document.title + "....";
      } else if (
        this.$route.path == "/videoCombat/addcasetwo" ||
        this.$route.path == "casestudy/caseInfomanage/addcasetwo"
      ) {
        this.closefacelist();
        if (this.isonline) {
          title = document.title + "....";
        } else {
          OnvideoShow(); //显示播放器
          title = document.title + ".";
          setTimeout(() => {
            OnCasePause("false");
          }, 300);
        }
      }
      this.$emit("childbyHandwork", false, title);
      this.clearLable();
      this.recogbad();
      this.showImg = false;
      window.imgurl = "";
      this.videoimg = "";
      this.isFacePut = false;
      sessionStorage.setItem("imgurl", "");
      var canvas;
      if (this.isonline) {
        canvas = document.getElementById("hisPlayCanvas");
      } else {
        canvas = document.getElementById("VideoPlayCanvas");
      }
      canvas.setAttribute("width", 0);
      canvas.setAttribute("height", 0);
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";

.comm_left {
  height: 100%;
  width: 60%;
  float: left;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.comm_left div {
  width: 100%;
  height: calc(100% - 0.4rem);
  /* border: 1px solid yellow; */
}
.comm_right {
  height: 100%;
  width: 39%;
  margin-left: 61%;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  position: relative;
}
.titles {
  line-height: 0.4rem;
  /* background: red; */
  background-color: rgba(20, 57, 96, 0.8);
  font-weight: 700;
  color: #fff;
  padding-left: 0.1rem;
}
.title_top {
  padding-left: 0.1rem;
}
.comm_right > div {
  padding: 0 0.1rem;
}

.imgtrait {
  width: 100%;
  height: 40%;
  /* border: 1px solid red; */
}
textarea {
  width: 100%;
  border: 1px solid #2a2d30 !important;
  padding-left: 0.1rem;
  color: #99c9fa;
  background: transparent;
}
.imgtrait ul {
  max-height: 2.5rem;
  overflow: auto;
}

.imgtrait ul li {
  float: left;
  width: 50%;
  color: #606266;
  margin-top: 0.1rem;
  font-size: 0.14rem;
}
.imgtrait ul li input {
  height: 0.3rem;
  border: 1px solid #dcdfe6;
  padding-left: 0.15rem;
  border-radius: 4px;
  width: 1.5rem;
}
.imgtrait ul li span {
  width: 0.8rem;
  display: inline-block;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #99c9fa;
}
.imgtrait ul li >>> .el-select > .el-input {
  width: 1.5rem;
  font-size: 0.14rem;
}
.imgtrait ul li >>> .el-input__inner {
  height: 0.3rem;
}
.main_title {
  line-height: 0.3rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
textarea {
  background: #0d1f2f;
}
.lableTime {
  display: flex;
}
.lableTime p {
  flex: 1;
}
.lableTime p span {
  width: 0.8rem;
  display: inline-block;
  text-align: right;
  white-space: nowrap;
  font-size: 0.14rem;
  color: #99c9fa;
  text-overflow: ellipsis;
}
.lableTime p input {
  height: 0.3rem;
  border: 1px solid #dcdfe6;
  padding-left: 0.15rem;
  border-radius: 4px;
  width: 1.5rem;
  font-size: 0.14rem;
}

.img_left {
  position: relative;
}
.img_left img,
.img_left canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#imgcanvas {
  opacity: 0;
}
canvas {
  position: absolute;
  z-index: 2;
}
.el-radio-group {
  margin-left: 0.2rem;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #58a9ff;
}
.el-radio {
  /* #58a9ff */
  color: #99c9fa;
}
/*
  人脸样式
 */
.comm_right .humanface {
  padding: 0;
  width: 0;
  height: 100%;
  /* border: 1px solid red; */
  position: absolute;
  top: 0;
  height: 5.5rem;
  left: 100%;
  background-color: rgba(16, 35, 56);
  overflow: hidden;
}
.humanface .closeStyle {
  position: absolute;
  top: 14px;
  right: 15px;
  width: 0.16rem;
  height: 0.16rem;
  color: #909399;
  text-align: center;
  line-height: 0.14rem;
  cursor: pointer;
  font-weight: 600;
}
.humanface .humanface_top {
  height: 2rem;
  width: 100%;
  /* border: 1px solid blue; */
}
.humanface_top p {
  width: 100%;
  text-align: right;
  line-height: 0.25rem;
  color: #99c9fa;
  cursor: pointer;
  padding-right: 0.1rem;
}
.humanface_top .el-table >>> .el-table__empty-block {
  min-height: 0.5rem;
}
.humanface .humanface_btn {
  width: 100%;
  height: calc(100% - 1.3rem);
  /* border: 1px solid yellow; */
}
.humanface_btn p {
  text-align: center;
  line-height: 0.3rem;
  cursor: pointer;
  color: #99c9fa;
}
.humanface_btn ul {
  width: 100%;
  height: 4.6rem;
  overflow: auto;
}
.humanface_btn ul li {
  width: 22%;
  float: left;
  height: 1rem;
  border: 1px solid #102d50;
  background-color: rgba(14, 39, 70, 0.52);
  margin-right: 3%;
  margin-bottom: 0.15rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
.humanface_btn ul li .btnone {
  width: 100%;
  height: 100%;
  position: absolute;
}
.humanface_btn ul li .btntwo {
  position: absolute;
  right: auto;
  bottom: auto;
  margin: 0;
}
.humanface_btn ul li p {
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: left;
  font-size: 0.12rem;
  line-height: 0.2rem;
  background-color: rgba(14, 39, 70, 0.52);
  /* background-color: red; */
}
.el-pagination {
  text-align: right;
}
.humanface_btn ul li .el-button {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
  height: 0.2rem;
  width: 0.2rem;
  font-size: 0.12rem;
}
.humanface_btn li > span {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.2rem;
  height: 0.2rem;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.2rem;
  color: #99c9fa;
  background-color: rgba(14, 39, 70, 0.52);
}
.faceInfoBox {
  position: absolute;
  width: 2rem;
  height: 1.5rem;
  border: 1px solid yellow;
}
.faceInfo {
  width: 100%;
  height: 1rem;
  border: 2px solid rgba(15, 44, 79, 0.5);
  position: relative;
}
.faceInfo > p {
  width: 0.15rem;
  color: #99c9fa;
  float: left;
}
.faceInfo > div {
  width: 0.9rem;
  height: 100%;
  margin-left: 0.2rem;
  overflow: hidden;
}
.faceInfo .faceassignInfo {
  position: absolute;
  width: calc(100% - 1.3rem);
  height: 100%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  top: 0;
  left: 1.1rem;
}
.faceassignInfo div:first-child {
  float: left;
  height: 100%;
  width: 0.9rem;
  /* border:1px solid rgba(15, 44, 79, 0.5) */
}
.faceassignInfo div:first-child img {
  width: 100%;
  height: 100%;
}
.faceassignInfo div:last-child {
  float: left;
  height: 100%;
  width: calc(100% - 0.9rem);
  /* border:1px solid rgba(15, 44, 79, 0.5) */
}
.facedetail {
  overflow: auto;
  position: relative;
}
.facedetail i {
  position: absolute;
  width: 0.12rem;
  height: 0.12rem;
  top: 0;
  right: 0.05rem;
  cursor: pointer;
}
.facedetail > p {
  text-align: center;
  color: #99c9fa;
}
.facedetail li {
  float: left;
  font-size: 0.12rem;
  color: #99c9fa;
  height: 0.25rem;
}
.facedetail ul li:nth-child(2n-1) {
  width: 40%;
}

.facedetail ul li:nth-child(2n) {
  width: 60%;
}
.facedetail ul li:last-child {
  width: 100%;
}
.facedetail ul li:last-child textarea {
  width: 70%;
}

.facedetail ul li span {
  display: inline-block;
}
.facedetail ul li:nth-child(2n-1) span:first-child {
  width: 0.5rem;
  text-align: right;
  overflow: hidden;
}
.facedetail ul li:nth-child(2n-1) span:last-child {
  width: calc(100% - 0.55rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.facedetail .biglenght span {
  display: inline-block;
}
.facedetail .biglenght span:first-child {
  width: 0.6rem;
  text-align: right;
  overflow: hidden;
}
.facedetail .biglenght span:last-child {
  width: calc(100% - 0.65rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.facedetail li:last-child span {
  display: inline-block;
}
.facedetail ul li:last-child span:first-child {
  width: 0.65rem;
}

.faceDiv ul {
  width: 2000px;
  height: 100%;
}

.faceDiv ul li {
  width: 0.9rem;
  height: 100%;
  border: 1px solid blue;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  float: left;
}
.faceDiv ul li:hover span {
  display: block;
}
.faceDiv ul li img {
  position: absolute;
  right: auto;
  bottom: auto;
  margin: 0;
}
.faceDiv ul li span {
  color: red;
  width: 0.15rem;
  height: 0.15rem;
  z-index: 1;
  text-align: center;
  line-height: 0.15rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: none;
}
.faceDiv ul li span:first-child {
  right: 0;
}
.faceDiv ul li span:last-child {
  left: 0;
}

.faceDiv ul li p {
  width: 0.2rem;
  height: 0.2rem;
  text-align: center;
  line-height: 0.2rem;
  font-size: 0.12rem;
  cursor: pointer;
  background-color: #99c9fa;
  position: absolute;
  top: 0;
  right: 0;
}
.faceDiv .compare {
  background-color: #2e93fb;
}
.faceDiv .el-checkbox {
  position: absolute;
  bottom: 0rem;
  width: 100%;
  color: #99c9fa;
  cursor: pointer;
  text-align: center;
}
.el-checkbox >>> .el-checkbox__inner {
  width: 0.12rem;
  height: 0.12rem;
}
.el-checkbox >>> .el-checkbox__label {
  font-size: 0.12rem;
}
.color {
  border: 1px solid red !important;
}
.markSus .el-select {
  width: 1.8rem;
  height: 0.3rem;
  margin-left: 0.5rem;
}
.markSus .el-select >>> .el-input__inner {
  height: 0.3rem;
}
.cccc {
  background: rgba(16, 35, 56, 0.5) !important;
}
#whyDialog {
  z-index: 3500 !important;
}
.rejectBtn {
  color: #fff;
}
</style>
