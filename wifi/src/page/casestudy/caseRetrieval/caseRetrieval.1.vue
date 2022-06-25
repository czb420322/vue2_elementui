<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <div class="nav-item nav-item-search">案事件检索</div>
    </div>-->
    <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <p class="sysname">&nbsp;案事件检索</p>

      <openfacecars :openaccess="openaccess" @childByaccess="childByaccess"></openfacecars>
      <searchPersonCase :openSearchCase="openSearchCase" @childsearch="childsearch"></searchPersonCase>
    </div>

    <div class="contentBody">
      <div class="content">
        <div class="contentTabs">
          <div
            class="tabsItem tabDefault afttabsItem" ref="aaa"
            @click="changeItem($event,0);checkItme = 'caseInfo'"
          >基本信息</div>
          <div class="tabsItem afttabsItem" ref="aaa" @click="changeItem($event,1);checkItme = 'person'">人员信息</div>
          <div
            class="tabsItem afttabsItem"
            @click="changeItem($event,2);checkItme = 'motorVehicle'"
          >车辆信息</div>
          <div class="tabsItem" @click="changeItem($event,3);checkItme = 'bicycle'">骑车人信息</div>
          <div class="contentTitle">
            <!-- <input type="text" v-model.trim="keyword" /> -->
            <!-- <el-button class="searchBtn " icon="el-icon-search" @click="goToCaseRetrievalSearch">查询</el-button> -->
            <!-- <el-button class="searchBtn " icon="el-icon-search" @click="searchCar">查询</el-button> -->
            <el-button class="searchBtn" icon="el-icon-search" @click="searchReflex()">查询</el-button>
            <el-button class="tryBtn" icon="el-icon-refresh" @click="reset()">重置</el-button>
          </div>
        </div>
        <div class="contentDetialWrapper">
          <div class="contentDetial tab1">
            <div class="contentDetialTitle">
              <span>基本信息</span>
            </div>
            <div class="detailItems">
              <ul>
                <li>
                  <span>案件编号:</span>
                  <input v-model="caseNo" type="text" placeholder="请输入案件编号">
                </li>
                <li>
                  <span>案发详址:</span>
                  <input v-model="caseAddress" type="text" placeholder="请输入案发详细地址">
                </li>

                <li>
                  <span>危害程度:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="harmLevel"
                    placeholder="请选择危害程度"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getHarmLevelList()"></i>
                  <ol v-show="isHarmLevel" class="condition_child" @click="getHarmLevel">
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>上传时间:</span>
                  <input
                    type="text"
                    v-model="uploadBeginTime"
                    autocomplete="off"
                    id="uploadBeginTime"
                    placeholder="请选择开始时间"
                  >
                  <i class="el-icon-time"></i>
                </li>
                <li>
                  <span>上传用户:</span>
                  <input type="text" v-model="upLoadPerson" placeholder="请输入上传用户">
                </li>
              </ul>
              <ul>
                <li>
                  <span>案件名称:</span>
                  <input type="text" v-model="caseName" placeholder="请输入案件名称">
                </li>
                <li>
                  <span>案发时间:</span>
                  <input
                    type="text"
                    autocomplete="off"
                    v-model="caseHappenBeginTime"
                    id="caseHappenBeginTime"
                    placeholder="请选择开始时间"
                    readonly="true"
                  >
                  <i class="el-icon-time"></i>
                </li>
                <li>
                  <span>案件类型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="caseCategory"
                    placeholder="请选择案件类型"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getCaseCategoryList()"></i>
                  <ol v-show="isCaseCategory" class="condition_child" @click="getCaseCategory">
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
                  <input
                    autocomplete="off"
                    type="text"
                    v-model="uploadEndTime"
                    id="uploadEndTime"
                    placeholder="请选择结束时间"
                    readonly="true"
                  >
                  <i class="el-icon-time"></i>
                </li>
                <li>
                  <span>侵犯目标:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="violateAim"
                    placeholder="请选择侵犯目标"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getviolateAimList()"></i>
                  <ol v-show="isviolateAim" class="condition_child" @click="getviolateAim">
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
              </ul>

              <ul>
                <li>
                  <span>案件状态:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="caseStateDes"
                    placeholder="请选择案件状态"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getCaseStateList()"></i>
                  <ol v-show="isCaseState" class="condition_child" @click="getCaseState">
                    <li value=""></li>
                    <li v-for="(item,index) in caseStateList" :key="index">
                      <span>{{item.value_name}}</span>
                    </li>
                  </ol>
                </li>
                <li>
                  <span>至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
                  <input
                    type="text"
                    autocomplete="off"
                    v-model="caseHappenEndTime"
                    id="caseHappenEndTime"
                    placeholder="请选择结束时间"
                  >
                  <i class="el-icon-time"></i>
                </li>

                <li>
                  <span>作案手段:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="crimeMethod"
                    placeholder="请选择作案手段"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getcrimeMethodList()"></i>
                  <ol v-show="iscrimeMethod" class="condition_child" @click="getcrimeMethod">
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>

                <li>
                  <span>作案工具:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="crimeTool"
                    placeholder="请选择作案工具"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getcrimeToolList()"></i>
                  <ol v-show="iscrimeTool" class="condition_child" @click="getcrimeTool">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>作案时机:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="crimeOpportunity"
                    placeholder="请选择作案时机"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getcrimeOpportunityList()"></i>
                  <ol
                    v-show="iscrimeOpportunity"
                    class="condition_child"
                    @click="getcrimeOpportunity"
                  >
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
          <!--人员信息-->
          <div class="contentDetial tab2">
            <div class="contentDetialTitle">
              <span>人员信息</span>
            </div>
            <div
              v-if="checkItme == 'person'"
              class="uploadImg"
              id="searchPerson"
              @click="openSearchCase = true"
            >
              <i class="el-icon-plus" @click="openSearchCase = true"></i>
              <img id="imgPerson" :src="imgUrlShow" alt>
            </div>
            <p v-if="checkItme == 'person'" class="openupload"><span @click="openSearchCase = true">人脸查询</span> </p>

            <div class="detailItems">
              <ul>
                <li>
                  <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="personSex"
                    readonly="readonly"
                    placeholder="请选择性别"
                  >
                  <i class="el-icon-caret-bottom" @click="getpersonSexList()"></i>
                  <ol v-show="ispersonSex" class="condition_child" @click="getpersonSex">
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>

                <li>
                  <span>&nbsp;&nbsp;年龄段:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="personAge"
                    readonly="readonly"
                    placeholder="请选择年龄段"
                  >
                  <i class="el-icon-caret-bottom" @click="getPersonAgeList()"></i>
                  <ol v-show="ispersonAge" class="condition_child" @click="getPersonAge">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <!-- <li><span>特殊标记:</span>
                  <input class="condition" type="text" v-model="SpecialTagType" placeholder="请选择特殊标记">
                  <i class="el-icon-caret-bottom" @click="getSpecialTagTypeList();isSpecialTagType = !isSpecialTagType"></i>
                  <ol v-show="isSpecialTagType" class="condition_child" @click="getSpecialTagType">
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>-->
                <li>
                  <span>头发颜色:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="HairColorStyle"
                    readonly="readonly"
                    placeholder="请选择头发颜色"
                  >
                  <i class="el-icon-caret-bottom" @click="getHairColorStyleList()"></i>
                  <ol v-show="isHairColorStyle" class="condition_child" @click="getHairColorStyle">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>

                <li>
                  <span>上衣纹理:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="tpcoatTexture"
                    readonly="readonly"
                    placeholder="请选择上衣纹理"
                  >
                  <i class="el-icon-caret-bottom" @click="gettpcoatTextureList()"></i>
                  <ol v-show="istpcoatTexture" class="condition_child" @click="gettpcoatTexture">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>

                <li>
                  <span>身高:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="stature"
                    readonly="readonly"
                    placeholder="请选择身高"
                  >
                  <i class="el-icon-caret-bottom" @click="getstature()"></i>
                  <ol v-show="isstature" class="condition_child" @click="getstatureText">
                    <li value=""></li>
                    <li value="超高">超高</li>
                    <li value="标准">标准</li>
                    <li value="偏矮">偏矮</li>
                    <li value="矮小">矮小</li>
                    <!-- <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li> -->
                  </ol>
                </li>
              </ul>
              <ul>
                <li>
                  <span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="bodyType"
                    placeholder="请选择体态"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getIsbodyType()"></i>
                  <ol v-show="isbodyType" class="condition_child" @click="getbodyType">
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="viewType"
                    readonly="readonly"
                    placeholder="请选择朝向"
                  >
                  <i class="el-icon-caret-bottom" @click="getviewTypeList()"></i>
                  <ol v-show="isviewType" class="condition_child" @click="getviewType">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>上衣类型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="CoatStyleType"
                    readonly="readonly"
                    placeholder="请选择上衣类型"
                  >
                  <i class="el-icon-caret-bottom" @click="getCoatStyleTypeList()"></i>
                  <ol v-show="isCoatStyleType" class="condition_child" @click="getCoatStyleType">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>下衣类型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="CulotteStyleType"
                    readonly="readonly"
                    placeholder="请选择下衣类型"
                  >
                  <i class="el-icon-caret-bottom" @click="getCulotteStyleTypeList()"></i>
                  <ol
                    v-show="isCulotteStyleType"
                    class="condition_child"
                    @click="getCulotteStyleType"
                  >
                  <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
              </ul>
              <ul>
                <li>
                  <span>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="ethicCode"
                    readonly="readonly"
                    placeholder="请选择民族"
                  >
                  <i class="el-icon-caret-bottom" @click="getethicCodeList()"></i>
                  <ol v-show="isethicCode" class="condition_child" @click="getethicCode">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="tphairStyle"
                    readonly="readonly"
                    placeholder="请选择发型"
                  >
                  <i class="el-icon-caret-bottom" @click="gettphairStyleList()"></i>
                  <ol v-show="istphairStyle" class="condition_child" @click="gettphairStyle">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>上衣颜色:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="BikeCoatStyleColorType"
                    readonly="readonly"
                    placeholder="请选择上衣颜色"
                  >
                  <i class="el-icon-caret-bottom" @click="getBikeCoatStyleColorTypeList()"></i>
                  <ol
                    v-show="isBikeCoatStyleColorType"
                    class="condition_child"
                    @click="getBikeCoatStyleColorType"
                  >
                  <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>下衣颜色:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="CulotteColorType"
                    readonly="readonly"
                    placeholder="请选择下衣颜色"
                  >
                  <i class="el-icon-caret-bottom" @click="getShoesColorTypeList()"></i>
                  <ol
                    v-show="isCulotteColorType"
                    class="condition_child"
                    @click="getCulotteColorType"
                  >
                  <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
          <!--车辆信息-->
          <div class="contentDetial tab3">
            <div class="contentDetialTitle">
              <span>车辆信息</span>
            </div>
            <div
              v-show="checkItme == 'motorVehicle'"
              class="uploadImg"
              id="searchImg"
              @click="openaccess = true"
            >
              <i class="el-icon-plus" @click="openaccess = true"></i>
              <img id="imgUrlShow" :src="imgUrlShow" alt>
            </div>
            <p
              v-show="checkItme == 'motorVehicle'"
              class="openupload"
            ><span @click="openaccess = true">车辆查询</span> </p>
            <div class="detailItems">
              <ul>
                <li>
                  <span>车牌号码:</span>
                  <input type="text" v-model="carNo" placeholder="请输入车牌号码">
                </li>
                <li>
                  <span>车牌颜色:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="plateColor"
                    placeholder="请选择车牌颜色"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getplateColorList()"></i>
                  <ol v-show="isplateColor" class="condition_child" @click="getplateColor">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
              </ul>
              <ul>
                <li>
                  <span>车辆类型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="plateClass"
                    placeholder="请选择车辆类型"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getplateClassList()"></i>
                  <ol v-show="isplateClass" class="condition_child" @click="getplateClass">
                      <li value=""></li>
                    <li v-for="(item,index) in options" :key="index">{{item.label}}</li>
                  </ol>
                </li>
                <li>
                  <span>车身颜色:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="VehicleKindColorType"
                    readonly="readonly"
                    placeholder="请选择车身颜色"
                  >
                  <i class="el-icon-caret-bottom" @click="getVehicleKindColorTypeList()"></i>
                  <ol
                    v-show="isVehicleKindColorType"
                    class="condition_child"
                    @click="getVehicleKindColorType"
                  >
                    <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>

                </li>
              </ul>
              <ul>
                <li>
                  <span>车辆品牌:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="VehicleBrandType"
                    placeholder="请选择车辆类型"
                    readonly="true"
                  >
                  <i class="el-icon-caret-bottom" @click="getVehicleBrandTypeList()"></i>
                  <ol v-show="isVehicleBrandType" class="condition_child" @click="getVehicleBrandType">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
          <!--非机动车信息-->
          <div class="contentDetial tab4">
            <div class="contentDetialTitle">
              <span>骑车人信息</span>
            </div>
            <div class="detailItems">
              <ul>
                <li>
                  <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                  <input
                    class="condition"
                    type="text"
                    style="margin-left:1px;"
                    v-model="tbgenderCode"
                    readonly="readonly"
                    placeholder="请选择性别"
                  >
                  <i class="el-icon-caret-bottom" @click="gettbgenderCodeList()"></i>
                  <ol v-show="istbgenderCode" class="condition_child" @click="gettbgenderCode">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:</span>
                  <input
                    class="condition"
                    type="text"
                    style="margin-left:1px;"
                    v-model="tbethicCode"
                    readonly="readonly"
                    placeholder="请选择民族"
                  >
                  <i class="el-icon-caret-bottom" @click="gettbethicCodeList()"></i>
                  <ol v-show="istbethicCode " class="condition_child" @click="gettbethicCode">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>

                <li>
                  <span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="tbviewType"
                    style="margin-left: 1px"
                    readonly="readonly"
                    placeholder="请选择朝向"
                  >
                  <i class="el-icon-caret-bottom" @click="gettbviewTypeList()"></i>
                  <ol v-show="istbviewType" class="condition_child" @click="gettbviewType ">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>上衣类型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="coatStyle"
                    readonly="readonly"
                    placeholder="请选择上衣类型"
                  >
                  <i class="el-icon-caret-bottom" @click="getcoatStyleList()"></i>
                  <ol v-show="iscoatStyle" class="condition_child" @click="getcoatStyle">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>上衣纹理:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="coatTexture"
                    readonly="readonly"
                    placeholder="请选择上衣纹理"
                  >
                  <i class="el-icon-caret-bottom" @click="getcoatTextureList()"></i>
                  <ol v-show="iscoatTexture" class="condition_child" @click="getcoatTexture">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>

              </ul>
              <ul>
                <li>
                  <span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="tbbodyType"
                    style="margin-left: 1px"
                    readonly="readonly"
                    placeholder="请选择体态"
                  >
                  <i class="el-icon-caret-bottom" @click="gettbbodyTypeList()"></i>
                  <ol v-show="istbbodyType " class="condition_child" @click="gettbbodyType ">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>年&nbsp;&nbsp;龄&nbsp;段:</span>
                  <input
                    class="condition"
                    type="text"
                    style="margin-left: 3px"
                    v-model="tbageType"
                    readonly="readonly"
                    placeholder="请选择年龄段"
                  >
                  <i class="el-icon-caret-bottom" @click="gettbageTypeList()"></i>
                  <ol v-show="istbageType" class="condition_child" @click="gettbageType">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="hairStyle"
                    style="margin-left: 1px;"
                    readonly="readonly"
                    placeholder="请选择发型"
                  >
                  <i class="el-icon-caret-bottom" @click="gethairStyleList()"></i>
                  <ol v-show="ishairStyle" class="condition_child" @click="gethairStyle">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>

                <li>
                  <span>上衣颜色:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="coatColor"
                    readonly="readonly"
                    placeholder="请选择上衣颜色"
                  >
                  <i class="el-icon-caret-bottom" @click="getcoatColorList()"></i>
                  <ol v-show="iscoatColor" class="condition_child" @click="getcoatColor">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>


                <li>
                  <span>包&nbsp;&nbsp;类&nbsp;型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="bagStyle"
                    style="margin-left: 3px;"
                    readonly="readonly"
                    placeholder="请选择包类型"
                  >
                  <i class="el-icon-caret-bottom" @click="getbagStyleList()"></i>
                  <ol v-show="isbagStyle" class="condition_child" @click="getbagStyle">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
              </ul>
               <ul>
                <li>
                  <span>是否打伞：</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="umbrellaFlag"
                    style="margin-left: 1px"
                    readonly="readonly"
                    placeholder="请选择体态"
                  >
                  <i class="el-icon-caret-bottom" @click="getumbrellaFlagList()"></i>
                  <ol v-show="isumbrellaFlag" class="condition_child" @click="getumbrellaFlag ">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>是否携物：</span>
                  <input
                    class="condition"
                    type="text"
                    style="margin-left: 3px"
                    v-model="carryingType"
                    readonly="readonly"
                    placeholder="请选择年龄段"
                  >
                  <i class="el-icon-caret-bottom" @click="getcarryingTypeList()"></i>
                  <ol v-show="iscarryingType" class="condition_child" @click="getcarryingType">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                <li>
                  <span>下衣类型:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="trousersStyle"
                    readonly="readonly"
                    placeholder="请选择下衣类型"
                  >
                  <i class="el-icon-caret-bottom" @click="gettrousersStyleList()"></i>
                  <ol v-show="istrousersStyle" class="condition_child" @click="gettrousersStyle">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>
                 <li>
                  <span>下衣颜色:</span>
                  <input
                    class="condition"
                    type="text"
                    v-model="trousersColor"
                    readonly="readonly"
                    placeholder="请选择下衣颜色"
                  >
                  <i class="el-icon-caret-bottom" @click="gettrousersColorList()"></i>
                  <ol v-show="istrousersColor" class="condition_child" @click="gettrousersColor">
                      <li value=""></li>
                    <li v-for="(item,index) in selectOptionList" :key="index">{{item.value}}</li>
                  </ol>
                </li>



              </ul>
            </div>
          </div>
        </div>
        <div class="contentBottom"></div>
      </div>
      <footer_case></footer_case>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Footer_case from "../../../components/footer_case";
import openfacecars from "../addcaseInfo/openfacecars";
import searchPersonCase from "../addcaseInfo/searchPersonCase"; //
import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
    Footer_case,
    openfacecars,
    searchPersonCase
  },
  data() {
    return {
      openSearchCase: false,
      openaccess: false,
      imgUrlShow: "", // 图片rul
      /* 基本信息*/
      caseNo: "", // 案件编号
      caseAddress: "", // 案发详址
      upLoadPerson: "", // 上传用户
      uploadBeginTime: "", // 上传开始时间
      uploadEndTime: "", // 上传结束时间
      caseName: "", // 案件名称
      caseHappenBeginTime: "", // 案发开始时间
      caseHappenEndTime: "", // 案发结束时间
      harmLevel: "", // 危害程度
      isHarmLevel: false,
      caseCategory: "", // 案件类型
      isCaseCategory: false,
      violateAim: "", // 侵犯目标
      isviolateAim: false,
      crimeMethod: "", // 作案手段
      iscrimeMethod: false,
      crimeTool: "", // 作案工具
      iscrimeTool: false,
      crimeOpportunity: "", // 作案时机
      iscrimeOpportunity: false,
      caseState: "", // 案件状态
      caseStateDes: "", // 案件状态
      caseStateList: [], // 案件状态列表
      isCaseState: false,

      /*人员信息*/

      personSex: "", //目标性别
      ispersonSex: false,
      HairColorStyle: "", //头发颜色
      isHairColorStyle: false,
      ShoesColorType: "", //鞋子颜色
      isShoesColorType: false,
      EyePartType: "", //眼睛样式
      isEyePartType: false,
      HairLength: "", //头发长度
      isHairLength: false,
      SleeveStyleType: "", //袖子类型
      isSleeveStyleType: false,
      CoatTextureType: "", //衣服图案
      isCoatTextureType: false,
      SockColorType: "", //袜子颜色
      isSockColorType: false,
      SpecialTagType: "", //特殊标记
      isSpecialTagType: false,
      CoatStyleType: "", //上衣类型
      isCoatStyleType: false,
      BehaviorType: "", //行为描述
      isBehaviorType: false,
      bodyType: "", //目标身材
      isbodyType: false,
      BikeCoatStyleColorType: "", //上衣颜色
      isBikeCoatStyleColorType: false,
      CulotteStyleType: "", //裤子类型
      isCulotteStyleType: false,
      CulotteColorType: "", //裤裙颜色
      isCulotteColorType: false,
      personAge: "", //目标年龄
      ispersonAge: false,
      personHeight: "", //目标身高
      ShoesStyleType: "", //鞋子类型
      isShoesStyleType: false,
      tphairStyle: "", //发型
      istphairStyle: false,
      ethicCode: "", //民族
      isethicCode: false,
      tpcoatTexture: "", //上衣纹理
      istpcoatTexture: false,
      viewType: "",
      isviewType: false,
      isstature:false,
      stature:'',

      /*车辆信息*/
      VehicleBrandType: "", //车辆品牌
      isVehicleBrandType: false,
      VehicleBehaviorType: "", //车辆可疑行为
      isVehicleBehaviorType: false,
      AutoFoilColorType: "", //贴膜颜色
      isAutoFoilColorType: "",
      propertySunroof: "", //遮阳板
      VehicleModelList: [], //车辆型号
      VehicleMode: "",
      isVehicleMode: false,
      carNo: "", //车牌号码
      VehicleKindColorType: "", //车身颜色
      isVehicleKindColorType: false,
      tmplateClass: "", //车牌类型
      istmplateClass: false,

      /*非机动车信息*/
      plateClass: "", //号牌种类
      isplateClass: false,
      plateColor: "", //车牌颜色
      isplateColor: false,
      plateNo: "", //车票号码
      plateNoAttach: "", //挂车好牌
      vehicleBrand: "", //车辆品牌
      isvehicleBrand: false,
      vehicleType: "", //车辆款型
      vehicleTypelList: [], //车辆型号
      isvehicleType: false,
      vehicleLength: "", //车辆长度
      vehicleColor: "",
      isvehicleColor: false, //车身颜色
      vehicleHood: "", //车前物品
      isvehicleHood: false,
      vehicleTrunk: "", //车后物品
      isvehicleTrunk: false,
      vehicleWheel: "", //车轮
      wheelPrintedPattern: "", //车轮印花
      vehicleWindow: "", //车窗
      vehicleRoof: "", //车顶
      vehicleDoor: "", //车门
      sideOfVehicle: "", //车侧
      carOfVehicle: "", //车厢
      rearviewMirror: "", //后视镜
      vehicleChassis: "", //底盘
      vehicleShielding: "", //遮挡
      filmColor: "", //贴膜颜色
      isfilmColor: false,
      hairStyle: "",
      ishairStyle: false,
      coatStyle: "", //上衣款式
      iscoatStyle: false,
      coatColor: "", //上衣颜色
      iscoatColor: false,
      coatTexture: "", //上衣纹理
      iscoatTexture: false,
      trousersStyle: "", //裤子款式
      istrousersStyle: false,
      trousersColor: "", //裤子颜色
      istrousersColor: false,
      bagStyle: "", //包款式
      isbagStyle: false,
      bagColor: "", //包颜色
      isbagColor: false,

      carryingType: "",
      iscarryingType: false, // 是否携带物
      tbageType: "", //年龄段
      istbageType: false,
      driverCount: "", // 骑车人数
      isdriverCount: false,
      eyePart: "", // 眼部特征
      iseyePart: false,
      mouthPart: "", // 嘴部特征
      ismouthPart: false,
      scarf: "", //围巾
      isscarf: false,
      tbethicCode: "", // 民族
      istbethicCode: false,
      tbgenderCode: "", // 性别
      istbgenderCode: false,
      tbbodyType: "", // 体态
      istbbodyType: false,
      umbrellaFlag: "", // 是否打伞
      isumbrellaFlag: false,
      tbviewType: "", // 朝向
      istbviewType: false,
      plateDescribe: "", //车辆描述
      keyword: "",
      selectKey: "",
      selectOptionList: [],
      checkItme: "caseInfo", //切换时候的样式
      imgData: {},
      imgFaceData: {},
      options: [
        //目标类型： 写死的数据
        {
          value: "4",
          label: "大型车"
        },
        {
          value: "5",
          label: "小型车"
        },
        {
          value: "6",
          label: "卡车"
        },
        {
          value: "7",
          label: "拖拉机"
        },
        {
          value: "8",
          label: "中巴"
        }
      ],
      uploadTimeOne: "",
      uploadTimeTwo: "",
      caseTimeOne: "",
      caseTimeTwo: "",
      isCurrentItem: "",
      isCurrentItemFlex:"",
    };
  },
  watch: {
    imgData: {
      handler(val, oldValue) {
        if (this.imgData.photo_width == undefined) {
          return;
        }
        let imgs = document.getElementById("imgUrlShow"); //图片大小
        let imgBox = document.getElementById("searchImg"); //div大小
        let leftTopX = val.obj_left;
        let leftTopY = val.obj_top;
        let rightBtmX = val.obj_right;
        let rightBtmY = val.obj_bootom;
        let imgw = rightBtmX - leftTopX;
        let imgh = rightBtmY - leftTopY;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        let unit = 1;
        let posLeft = 0;
        let posTop = 0;
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
          posLeft = 0;
          posTop = (reth - imgh / unit) / 2;
        } else {
          unit = imgh / reth;
          posTop = 0;
          posLeft = (retw - imgw / unit) / 2;
        }
        imgs.style.width = val.photo_width / unit + "px";
        imgs.style.height = val.photo_height / unit + "px";
        imgs.style.top = -(leftTopY / unit) + posTop + "px";
        imgs.style.left = -(leftTopX / unit) + posLeft + "px";
        let simg = document.getElementById("simg");
        if (!simg) {
          simg = document.createElement("img");
        }
        simg.id = "simg";
        simg.style.position = "absolute";
        simg.style.width = imgs.style.width;
        simg.style.height = imgs.style.height;
        simg.style.top = imgs.style.top;
        simg.style.left = imgs.style.left;
        imgBox.appendChild(simg);
      },
      deep: true
    },
    imgFaceData: {
      handler(val, oldValue) {
        if (val.width == undefined) {
          return;
        }
        let imgs = document.getElementById("imgPerson");
        let imgBox = document.getElementById("searchPerson");

        let leftTopX = val.facePos.leftTopX;
        let leftTopY = val.facePos.leftTopY;
        let rightBtmX = val.facePos.rightBtmX;
        let rightBtmY = val.facePos.rightBtmY;
        let imgw = rightBtmX - leftTopX;
        let imgh = rightBtmY - leftTopY;

        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        let unit = 1;
        let posLeft = 0;
        let posTop = 0;
        if (retw / reth < imgw / imgh) {
          unit = imgw / retw;
          posLeft = 0;
          posTop = (reth - imgh / unit) / 2;
        } else {
          unit = imgh / reth;
          posTop = 0;
          posLeft = (retw - imgw / unit) / 2;
        }
        imgs.style.width = val.width / unit + "px";
        imgs.style.height = val.height / unit + "px";
        imgs.style.top = -(leftTopY / unit) + posTop + "px";
        imgs.style.left = -(leftTopX / unit) + posLeft + "px";
        let simg = document.getElementById("simg");
        if (!simg) {
          simg = document.createElement("img");
        }
        simg.id = "simg";
        simg.style.position = "absolute";
        simg.style.width = imgs.style.width;
        simg.style.height = imgs.style.height;
        simg.style.top = imgs.style.top;
        simg.style.left = imgs.style.left;
        imgBox.appendChild(simg);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'eventsc'
    ])
  },
  methods: {
    ...mapMutations ([
      'seteventsc'
    ]),
    // 搜索条件
    searchReflex() {
      if (this.checkItme == "caseInfo" || this.checkItme == "bicycle") {
        //没有人脸
        this.goToCaseRetrievalSearch();
        this.getSearchCondition();
      } else if (this.checkItme == "person") {

        if (this.imgUrlShow == "") {
          this.goToCaseRetrievalSearch();
          this.getSearchCondition();
        } else {
          let data = {
            feature: this.imgFaceData.feature,
            uuid: "",
            type: 1,
            targetJson: JSON.stringify({
              genderCode: this.personSex, //目标性别
              ageType: this.personAge, //目标年龄
              // heightUpLimit: this.personHeight, //目标身高
              // behaviorDescription: this.BehaviorType, //行为描述
              // bodySpeciallMark: this.SpecialTagType, //特殊标记
              bodyType: this.bodyType, //目标身材
              hairColor: this.HairColorStyle, //头发颜色
              pcoatStyle: this.CoatStyleType, //上衣类型
              pcoatColor: this.BikeCoatStyleColorType, //上衣颜色
              ptrousersStyle: this.CulotteStyleType, //裤子类型
              ptrousersColor: this.CulotteColorType, //裤裙颜色
              // shoesStyle: this.ShoesStyleType, //鞋子类型
              // shoesColor: this.ShoesColorType, //鞋子颜色
              // glassStyle: this.EyePartType, //眼睛
              tphairStyle: this.tphairStyle, //发型
              ethicCode: this.ethicCode, // 民族
              tpcoatTexture: this.tpcoatTexture, //上衣纹理
              viewType: this.viewType // 朝向
            })
          };
          sessionStorage.setItem("caseSearchReflex", JSON.stringify(data));
          // this.$router.push("/casestudy/caseSearchReflex?menuCode=207");
          this.goToCaseRetrievalSearchFlex()

        }
      } else if (this.checkItme == "motorVehicle") {
        if (this.imgUrlShow == "") {
          this.goToCaseRetrievalSearch();
          this.getSearchCondition();
        } else {
          let data = {
            feature: this.imgData.obj_feature,
            uuid: "",
            type: 2,
            targetJson: JSON.stringify({
              // behavior: this.VehicleBehaviorType, //车辆可疑行为
              // vehicleModel: this.VehicleMode, // 目标车型
              // mvehicleBrand: this.VehicleBrandType, // 车辆品牌
              mplateNo: this.carNo, // 车牌号码
              mvehicleColor: this.VehicleKindColorType, // 车身颜色
              vehicleClass:this.plateClass,//车辆类型
              plateColor: this.plateColor // 车牌颜色
              // mfilmColor: this.AutoFoilColorType, // 车模颜色
              // propertySunroof: this.propertySunroof, // 遮阳板
              // tmplateClass:this.tmplateClass, // 车牌类型
            })
          };
          sessionStorage.setItem("caseSearchReflex", JSON.stringify(data));
          this.goToCaseRetrievalSearchFlex()

        }
      }
    },
    //打开c车辆模态框
    childByaccess(val, val2, val3) {
      this.carNo = val2.plate_number == '未识别' ? '' : val2.plate_number
      this.plateColor = val2.plate_color
      this.plateClass = val2.traceTypeName
      this.VehicleKindColorType = val2.vehicle_color_id
      this.VehicleBrandType = val2.vehicle_brand

// carNo 车牌号码  plateColor 车牌颜色  plateClass 车辆类型  VehicleKindColorType  车身颜色

      this.openaccess = val;
      if (val2 == undefined) {
        this.imgData = {};
      } else {
        this.imgData = val2;
        this.imgUrlShow = val3;
      }
    },
    //打开人脸模态框
    childsearch(val, val2, val3) {
      if (val3 == "" && this.imgUrlShow != null) {
        this.openSearchCase = val;
      } else {
        this.openSearchCase = val;
        this.imgFaceData = val2;
        this.imgUrlShow = val3;
      }
    },

    /*基本信息*/
    //危害程度
    getHarmLevelList() {
      setTimeout(() => {
        this.isHarmLevel = !this.isHarmLevel;
      }, 0);
      this.selectKey = "CaseLevel";
      this.getCaseBaseData();
    },
    getHarmLevel(e) {
      this.harmLevel = e.target.innerText;
      this.isHarmLevel = false;
    },
    //案件类型
    getCaseCategory(e) {
      this.caseCategory = e.target.innerText;
      this.isCaseCategory = false;
    },
    getCaseCategoryList() {
      setTimeout(() => {
        this.isCaseCategory = !this.isCaseCategory;
      }, 0);
      this.selectKey = "CaseType";
      this.getCaseBaseData();
    },
    //侵犯目标
    getviolateAim(e) {
      this.violateAim = e.target.innerText;
      this.isviolateAim = false;
    },
    getviolateAimList() {
      setTimeout(() => {
        this.isviolateAim = !this.isviolateAim;
      }, 0);
      this.selectKey = "CaseTarget";
      this.getCaseBaseData();
    },
    //作案手段
    getcrimeMethod(e) {
      this.crimeMethod = e.target.innerText;
      this.iscrimeMethod = false;
    },
    getcrimeMethodList() {
      setTimeout(() => {
        this.iscrimeMethod = !this.iscrimeMethod;
      }, 0);
      this.selectKey = "CaseMethod";
      this.getCaseBaseData();
    },
    //作案工具
    getcrimeTool(e) {
      this.crimeTool = e.target.innerText;
      this.iscrimeTool = false;
    },
    getcrimeToolList() {
      setTimeout(() => {
        this.iscrimeTool = !this.iscrimeTool;
      }, 0);
      this.selectKey = "CaseTool";
      this.getCaseBaseData();
    },
    //作案时机
    getcrimeOpportunity(e) {
      this.crimeOpportunity = e.target.innerText;
      this.iscrimeOpportunity = false;
    },
    getcrimeOpportunityList() {
      setTimeout(() => {
        this.iscrimeOpportunity = !this.iscrimeOpportunity;
      }, 0);
      this.selectKey = "CaseOpportunity";
      this.getCaseBaseData();
    },
    //案件状态
    getCaseStateList() {
      setTimeout(() => {
        this.isCaseState = !this.isCaseState;
      }, 0);
      this.$http({
        url: "sms/static/getCaseState",
        method: "get"
      })
        .then(res => {
          if (res.statusText === "OK" && res.data.code === 200) {
            this.caseStateList = res.data.data;
          } else {
          }
        })
        .catch(err => {});
    },
    // 案件状态
    getCaseState(e) {
      this.caseStateDes = e.target.innerText;
      this.isCaseState = false;
      if (this.caseStateDes == "事件") {
        this.caseState = 0;
      } else if (this.caseStateDes == "已立案") {
        this.caseState = 1;
      } else if (this.caseStateDes == "已侦破") {
        this.caseState = 2;
      } else if (this.caseStateDes == "侦破待复核") {
        this.caseState = 3;
      } else if (this.caseStateDes == "已结案") {
        this.caseState = 4;
      } else if (this.caseStateDes == "结案待复核") {
        this.caseState = 5;
      } else if (this.caseStateDes == "并案待复核") {
        this.caseState = 6;
      } else if (this.caseStateDes == "撤案待复核") {
        this.caseState = 7;
      } else if (this.caseStateDes == "结案归档") {
        this.caseState = 8;
      } else if (this.caseStateDes == "并案归档") {
        this.caseState = 9;
      } else if (this.caseStateDes == "并案归档") {
        this.caseState = 9;
      } else if (this.caseStateDes == "撤案归档") {
        this.caseState = 10;
      } else {
        this.caseState = "";
      }
    },

    /*人员信息*/
    getpersonSex(e) {
      this.personSex = e.target.innerText;
      this.ispersonSex = false;
    },
    getpersonSexList() {
      setTimeout(() => {
        this.ispersonSex = !this.ispersonSex;
      }, 0);
      this.selectKey = "GenderType";
      this.getCaseBaseData();
    },
    //头发颜色
    getHairColorStyle(e) {
      this.HairColorStyle = e.target.innerText;
      this.isHairColorStyle = false;
    },
    getHairColorStyleList() {
      setTimeout(() => {
        this.isHairColorStyle = !this.isHairColorStyle;
      }, 0);
      this.selectKey = "HairColorStyle";
      this.getCaseBaseData();
    },
    //鞋子颜色
    getShoesColorType(e) {
      this.ShoesColorType = e.target.innerText;
      this.isShoesColorType = false;
    },
    getShoesColorTypeList() {
      setTimeout(() => {
        this.isCulotteColorType = !this.isCulotteColorType;
      }, 0);
      this.selectKey = "CulotteColorType";
      this.getCaseBaseData();
    },
    //眼睛样式
    getEyePartType(e) {
      this.EyePartType = e.target.innerText;
      this.isEyePartType = false;
    },
    getEyePartTypeList() {
      this.selectKey = "EyePartType";
      this.getCaseBaseData();
    },
    //头发长度
    getHairLength(e) {
      this.HairLength = e.target.innerText;
      this.isHairLength = false;
    },
    getHairLengthList() {
      this.selectKey = "HairLength";
      this.getCaseBaseData();
    },
    //袖子类型
    getSleeveStyleType(e) {
      this.SleeveStyleType = e.target.innerText;
      this.isSleeveStyleType = false;
    },
    getSleeveStyleTypeList() {
      this.selectKey = "SleeveStyleType";
      this.getCaseBaseData();
    },
    //衣服图案
    getCoatTextureType(e) {
      this.CoatTextureType = e.target.innerText;
      this.isCoatTextureType = false;
    },
    getCoatTextureTypeList() {
      this.selectKey = "CoatTextureType";
      this.getCaseBaseData();
    },
    //袜子颜色
    getSockColorType(e) {
      this.SockColorType = e.target.innerText;
      this.isSockColorType = false;
    },
    getSockColorTypeList() {
      this.selectKey = "SockColorType";
      this.getCaseBaseData();
    },

    //特殊标记
    getSpecialTagType(e) {
      this.SpecialTagType = e.target.innerText;
      this.isSpecialTagType = false;
    },
    getSpecialTagTypeList() {
      this.selectKey = "SpecialTagType";
      this.getCaseBaseData();
    },

    //上衣样式  CoatStyleType
    getCoatStyleType(e) {
      this.CoatStyleType = e.target.innerText;
      this.isCoatStyleType = false;
    },
    getCoatStyleTypeList() {
      setTimeout(() => {
        this.isCoatStyleType = !this.isCoatStyleType;
      }, 0);
      this.getCaseCoatData();
    },
    //上衣颜色 BikeCoatStyleColorType
    getBikeCoatStyleColorType(e) {
      this.BikeCoatStyleColorType = e.target.innerText;
      this.isBikeCoatStyleColorType = false;
    },
    getBikeCoatStyleColorTypeList() {
      setTimeout(() => {
        this.isBikeCoatStyleColorType = !this.isBikeCoatStyleColorType;
      }, 0);
      this.selectKey = "ColorType";
      this.getCaseBaseData();
    },
    //裤裙类型
    getCulotteStyleType(e) {
      this.CulotteStyleType = e.target.innerText;
      this.isCulotteStyleType = false;
    },
    getCulotteStyleTypeList() {
      setTimeout(() => {
        this.isCulotteStyleType = !this.isCulotteStyleType;
      }, 0);
      this.selectKey = "PantsStyleType";
      this.getCaseBaseData();
    },

    // 裤裙颜色
    getCulotteColorType(e) {
      this.CulotteColorType = e.target.innerText;
      this.isCulotteColorType = false;
    },
    getCulotteColorTypeList() {
      this.selectKey = "CulotteColorType";
      this.getCaseBaseData();
    },
    //鞋子类型
    getShoesStyleType(e) {
      this.ShoesStyleType = e.target.innerText;
      this.isShoesStyleType = false;
    },
    getShoesStyleTypeList() {
      this.selectKey = "ShoesStyleType";
      this.getCaseBaseData();
    },
    //行为描述
    getBehaviorType(e) {
      this.BehaviorType = e.target.innerText;
      this.isBehaviorType = false;
    },
    getBehaviorTypeList() {
      this.selectKey = "BehaviorType";
      this.getCaseBaseData();
    },
    //目标身材
    getbodyType(e) {
      this.bodyType = e.target.innerText;
      this.isbodyType = false;
    },
    getIsbodyType() {
      setTimeout(() => {
        this.isbodyType = !this.isbodyType;
      }, 0);
      this.getCaseBodyData();
    },
    //目标年龄
    getPersonAge(e) {
      this.personAge = e.target.innerText;
      this.ispersonAge = false;
    },
    getPersonAgeList() {
      setTimeout(() => {
        this.ispersonAge = !this.ispersonAge;
      }, 0);
      this.selectKey = "PersonAgeType";
      this.getCaseBaseData();
    },
    //发型
    gettphairStyle(e) {
      this.tphairStyle = e.target.innerText;
      this.istphairStyle = false;
    },
    gettphairStyleList() {
      setTimeout(() => {
        this.istphairStyle = !this.istphairStyle;
      }, 0);
      this.selectKey = "HairStyleType";
      this.getCaseBaseData();
    },

    //民族
    getethicCode(e) {
      this.ethicCode = e.target.innerText;
      this.isethicCode = false;
    },
    getethicCodeList() {
      setTimeout(() => {
        this.isethicCode = !this.isethicCode;
      }, 0);
      this.selectKey = "EthicCodeType";
      this.getCaseBaseData();
    },

    //上衣纹理
    gettpcoatTexture(e) {
      this.tpcoatTexture = e.target.innerText;
      this.istpcoatTexture = false;
    },
    gettpcoatTextureList() {
      setTimeout(() => {
        this.istpcoatTexture = !this.istpcoatTexture;
      }, 0);
      this.selectKey = "CoatTextureType";
      this.getCaseBaseData();
    },

    //身高
    getstatureText(e) {
      this.stature = e.target.innerText;
      this.isstature = false;
    },
    getstature() {
      setTimeout(() => {
        this.isstature = !this.isstature;
      }, 0);
    },
    //朝向
    getviewType(e) {
      this.viewType = e.target.innerText;
      this.isviewType = false;
    },
    getviewTypeList() {
      setTimeout(() => {
        this.isviewType = !this.isviewType;
      }, 0);
      this.selectKey = "PersonViewType";
      this.getCaseBaseData();
    },

    /*车辆信息*/
    //车辆品牌
    getVehicleBrandType(e) {
      this.VehicleBrandType = e.target.innerText;
      this.isVehicleBrandType = false;
    },
    getVehicleBrandTypeList() {
       setTimeout(() => {
        this.isVehicleBrandType = !this.isVehicleBrandType;
      }, 0);
      this.selectKey = "VehicleBrandType";
      this.getCaseBaseData();
    },
    //目标车型
    getVehicleModel(e) {
      this.VehicleMode = e.target.innerText;
      this.isVehicleMode = false;
    },
    getVehicleModelList() {
      this.getCarModel();
    },
    // 车辆可疑行为
    getVehicleBehaviorType(e) {
      this.VehicleBehaviorType = e.target.innerText;
      this.isVehicleBehaviorType = false;
    },
    getVehicleBehaviorTypeList() {
      this.selectKey = "VehicleBehaviorType";
      this.getCaseBaseData();
    },
    // 车膜颜色
    getAutoFoilColorType(e) {
      this.AutoFoilColorType = e.target.innerText;
      this.isAutoFoilColorType = false;
    },
    getAutoFoilColorTypeList() {
      this.selectKey = "AutoFoilColorType";
      this.getCaseBaseData();
    },
    //车身颜色
    getVehicleKindColorType(e) {
      this.VehicleKindColorType = e.target.innerText;
      this.isVehicleKindColorType = false;
    },
    getVehicleKindColorTypeList() {
      setTimeout(() => {
        this.isVehicleKindColorType = !this.isVehicleKindColorType;
      }, 0);
      this.selectKey = "VehicleKindColorType";
      this.getCaseBaseData();
    },
    //号牌种类
    gettmplateClass(e) {
      this.tmplateClass = e.target.innerText;
      this.istmplateClass = false;
    },

    /*非机动车信息*/
    //号牌种类
    getplateClass(e) {
      this.plateClass = e.target.innerText;
      this.isplateClass = false;
    },
    getplateClassList() {
      setTimeout(() => {
        this.isplateClass = !this.isplateClass;
      }, 0);
      this.getCaseClassData();
    },
    //车牌颜色
    getplateColor(e) {
      this.plateColor = e.target.innerText;
      this.isplateColor = false;
    },
    getplateColorList() {
      setTimeout(() => {
        this.isplateColor = !this.isplateColor;
      }, 0);
      this.selectKey = "PlateColorType";
      this.getCaseBaseData();
    },
    //车辆品牌
    getvehicleBrand(e) {
      this.vehicleBrand = e.target.innerText;
      this.isvehicleBrand = false;
    },
    getvehicleBrandList() {
      this.selectKey = "VehicleBrandType";
      this.getCaseBaseData();
    },
    //车辆款型
    getvehicleType(e) {
      this.vehicleType = e.target.innerText;
      this.isvehicleType = false;
    },
    getvehicleTypeList() {
      this.getCarModel2();
    },
    //车身颜色
    getvehicleColor(e) {
      this.vehicleColor = e.target.innerText;
      this.isvehicleColor = false;
    },
    getvehicleColorList() {
      this.selectKey = "VehicleKindColorType";
      this.getCaseBaseData();
    },

    //车前物品
    getvehicleHood(e) {
      this.vehicleHood = e.target.innerText;
      this.isvehicleHood = false;
    },
    getvehicleHoodList() {
      this.selectKey = "FrontThingType";
      this.getCaseBaseData();
    },
    //车后物品
    getvehicleTrunk(e) {
      this.vehicleTrunk = e.target.innerText;
      this.isvehicleTrunk = false;
    },
    getvehicleTrunkList() {
      this.selectKey = "RearThingType";
      this.getCaseBaseData();
    },
    //贴膜颜色
    getfilmColor(e) {
      this.filmColor = e.target.innerText;
      this.isfilmColor = false;
    },
    getfilmColorList() {
      this.selectKey = "AutoFoilColorType";
      this.getCaseBaseData();
    },
    // 发型
    gethairStyle(e) {
      this.hairStyle = e.target.innerText;
      this.ishairStyle = false;
    },
    gethairStyleList() {
      setTimeout(() => {
        this.ishairStyle = !this.ishairStyle;
      }, 0);
      this.selectKey = "BikeHairStyleType";
      this.getCaseBaseData();
    },
    //上衣款式
    getcoatStyle(e) {
      this.coatStyle = e.target.innerText;
      this.iscoatStyle = false;
    },
    getcoatStyleList() {
      setTimeout(() => {
        this.iscoatStyle = !this.iscoatStyle;
      }, 0);
      this.getCasecycleData();
    },
    //上衣颜色
    getcoatColor(e) {
      this.coatColor = e.target.innerText;
      this.iscoatColor = false;
    },
    getcoatColorList() {
      setTimeout(() => {
        this.iscoatColor = !this.iscoatColor;
      }, 0);
      this.selectKey = "BikeCoatStyleColorType";
      this.getCaseBaseData();
    },
    //上衣纹理
    getcoatTexture(e) {
      this.coatTexture = e.target.innerText;
      this.iscoatTexture = false;
    },
    getcoatTextureList() {
      setTimeout(() => {
        this.iscoatTexture = !this.iscoatTexture;
      }, 0);
      this.selectKey = "BikeCoatTextureType";
      this.getCaseBaseData();
    },
    // 裤子样式
    gettrousersStyle(e) {
      this.trousersStyle = e.target.innerText;
      this.istrousersStyle = false;
    },
    gettrousersStyleList() {
      setTimeout(() => {
        this.istrousersStyle = !this.istrousersStyle;
      }, 0);
      this.selectKey = "BikeCulotteStyleType";
      this.getCaseBaseData();
    },
    //裤子颜色
    gettrousersColor(e) {
      this.trousersColor = e.target.innerText;
      this.istrousersColor = false;
    },
    gettrousersColorList() {
      setTimeout(() => {
        this.istrousersColor = !this.istrousersColor;
      }, 0);
      this.selectKey = "BikeCulotteColorType";
      this.getCaseBaseData();
    },
    //包款式
    getbagStyle(e) {
      this.bagStyle = e.target.innerText;
      this.isbagStyle = false;
    },
    getbagStyleList() {
      setTimeout(() => {
        this.isbagStyle = !this.isbagStyle;
      }, 0);
      this.selectKey = "BikeBagType";
      this.getCaseBaseData();
    },
    //包颜色
    getbagColor(e) {
      this.bagColor = e.target.innerText;
      this.isbagColor = false;
    },
    getbagColorList() {
      this.selectKey = "BikeBagColorType";
      this.getCaseBaseData();
    },
    //是否携带物
    getcarryingType(e) {
      this.carryingType = e.target.innerText;
      this.iscarryingType = false;
    },
    getcarryingTypeList() {
      setTimeout(() => {
        this.iscarryingType = !this.iscarryingType;
      }, 0);
      this.selectKey = "Carraying";
      this.getCaseBaseData();
    },
    //年龄段
    gettbageType(e) {
      this.tbageType = e.target.innerText;
      this.istbageType = false;
    },
    gettbageTypeList() {
      setTimeout(() => {
        this.istbageType = !this.istbageType;
      }, 0);
      this.selectKey = "PersonAgeType";
      this.getCaseBaseData();
    },
    //骑车人数
    getdriverCount(e) {
      this.driverCount = e.target.innerText;
      this.isdriverCount = false;
    },
    getdriverCountList() {
      this.selectKey = "DriverCount";
      this.getCaseBaseData();
    },

    //眼部特征
    geteyePart(e) {
      this.eyePart = e.target.innerText;
      this.iseyePart = false;
    },
    geteyePartList() {
      this.selectKey = "EyePartType";
      this.getCaseBaseData();
    },

    //嘴部特征
    getmouthPart(e) {
      this.mouthPart = e.target.innerText;
      this.ismouthPart = false;
    },
    getmouthPartList() {
      this.selectKey = "MouthPartType";
      this.getCaseBaseData();
    },
    //围巾
    getscarf(e) {
      this.scarf = e.target.innerText;
      this.isbagColor = false;
    },
    getscarfList() {
      this.selectKey = "ScarfPartType";
      this.getCaseBaseData();
    },

    //民族
    gettbethicCode(e) {
      this.tbethicCode = e.target.innerText;
      this.istbethicCode = false;
    },
    gettbethicCodeList() {
      setTimeout(() => {
        this.istbethicCode = !this.istbethicCode;
      }, 0);
      this.selectKey = "EthicCodeType";
      this.getCaseBaseData();
    },
    //性别
    gettbgenderCode(e) {
      this.tbgenderCode = e.target.innerText;
      this.istbgenderCode = false;
    },
    gettbgenderCodeList() {
      setTimeout(() => {
        this.istbgenderCode = !this.istbgenderCode;
      }, 0);
      this.selectKey = "GenderType";
      this.getCaseBaseData();
    },

    //体态
    gettbbodyType(e) {
      this.tbbodyType = e.target.innerText;
      this.istbbodyType = false;
    },
    gettbbodyTypeList() {
      setTimeout(() => {
        this.istbbodyType = !this.istbbodyType;
      }, 0);
      this.getCaseTBodyData();
    },
    //是否打伞
    getumbrellaFlag(e) {
      this.umbrellaFlag = e.target.innerText;
      this.isumbrellaFlag = false;
    },
    getumbrellaFlagList() {
      setTimeout(() => {
        this.isumbrellaFlag = !this.isumbrellaFlag;
      }, 0);
      this.selectKey = "BikeUmbrellaFlag";
      this.getCaseBaseData();
    },
    //朝向
    gettbviewType(e) {
      this.tbviewType = e.target.innerText;
      this.istbviewType = false;
    },
    gettbviewTypeList() {
      setTimeout(() => {
        this.istbviewType = !this.istbviewType;
      }, 0);
      this.selectKey = "BikeTowardsType";
      this.getCaseBaseData();
    },

    //切换信息
    changeItem(event, type) {
      this.isCurrentItem = type;
      this.isCurrentItemFlex = type;
      this.imgData = {};
      this.imgUrlShow = "";
      let tabs = ["tab1", "tab2", "tab3", "tab4"];
      let Item = document.getElementsByClassName("tabsItem");
      for (let i = 0; i < Item.length; i++) {
        if (i < Item.length - 1) {
          Item[i].className = "tabsItem afttabsItem";
        } else {
          Item[i].className = "tabsItem ";
        }
        if (event.target.isEqualNode(Item[i])) {
          document.getElementsByClassName(tabs[i])[0].style.display = "block";
        } else {
          document.getElementsByClassName(tabs[i])[0].style.display = "none";
        }
      }
      event.target.className = "tabsItem tabDefault afttabsItem";

    },
    //跳转到结果展示页面
    goToCaseRetrievalSearch() {
      //获取从哪个Item过去的
      let isCurrent = this.isCurrentItem;
      this.$router.push({
        path: "/casestudy/caseRetrievalSearch",
        query: {
          menuCode: 207,
          current: isCurrent,//传入这个参数
        }
      });
    },

    //上传了人脸或车辆图片跳转的页面
    goToCaseRetrievalSearchFlex(){
      let isCurrent = this.isCurrentItemFlex;
      this.$router.push({
        path:'/casestudy/caseSearchReflex',
        query: {
          menuCode:207,
          current:isCurrent,
        }
      })
    },

    //获取下拉信息
    getCaseBaseData() {
      this.$http({
        url: "sms/static/getCaseBaseData",
        method: "get",
        params: {
          casekey: this.selectKey
        }
      }).then(res => {
        if (res.statusText === "OK" && res.data.code === 200) {
          this.selectOptionList = res.data.data;
        } else {
          this.$notify({
            type: "error",
            message: "获取下拉列表失败！",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('获取下拉列表失败！',{icon:5,title:"消息提示"});
        }
      });
    },
    // 车牌类型接口
    getCaseClassData() {
      this.$http
        .get("sms/static/getTypeByCode?code=PlateClassType")
        .then(res => {
          if (res.data.code == 200) {
            this.selectOptionList = res.data.data;
          }
        });
    },
    // 骑车人体态接口
    getCaseTBodyData() {
      this.$http.get("sms/static/getTypeByCode?code=BikeBodyType").then(res => {
        if (res.data.code == 200) {
          this.selectOptionList = res.data.data;
        }
      });
    },
    // 人的上衣类型
    getCaseCoatData() {
      this.$http
        .get("sms/static/getTypeByCode?code=CoatStyleType")
        .then(res => {
          if (res.data.code == 200) {
            this.selectOptionList = res.data.data;
          }
        });
    },
    // 骑车人的上衣类型
    getCasecycleData() {
      this.$http
        .get("sms/static/getTypeByCode?code=BikeCoatStyleType")
        .then(res => {
          if (res.data.code == 200) {
            this.selectOptionList = res.data.data;
          }
        });
    },
    // 目标身材接口
    getCaseBodyData() {
      this.$http.get("sms/static/getTypeByCode?code=BodyType").then(res => {
        if (res.data.code == 200) {
          this.selectOptionList = res.data.data;
        }
      });
    },

    //获取车辆型号
    getCarModel() {
      this.$http({
        url: "sms/static/getVehicleModel",
        method: "get"
      })
        .then(res => {
          if (res.statusText === "OK" && res.data.code === 200) {
            this.VehicleModelList = res.data.data;
          } else {
            this.$notify({
              type: "error",
              message: "获取车辆型号列表失败！",
              position: "bottom-right",
              duration: 3000
            });
            // layer.alert('获取车辆型号列表失败！',{icon:5,title:"消息提示"});
          }
        })
        .catch(res => {});
    },
    //获取车辆型号--非机动车
    getCarModel2() {
      this.$http({
        url: "sms/static/getVehicleModel",
        method: "get"
      })
        .then(res => {
          if (res.statusText === "OK" && res.data.code === 200) {
            this.vehicleTypelList = res.data.data;
          } else {
            this.$notify({
              type: "error",
              message: "获取车辆型号列表失败！",
              position: "bottom-right",
              duration: 3000
            });
            // layer.alert('获取车辆型号列表失败！',{icon:5,title:"消息提示"});
          }
        })
        .catch(res => {});
    },
    // 搜索
    getSearchCondition() {
      sessionStorage.removeItem("caseSearchCondition");
      let SearchCondition = {
        /*基本信息*/
        opeType: this.checkItme,
        searchType: 0,
        // keyword: this.keyword,
        caseLinkMark: this.caseNo,
        caseName: this.caseName,
        state: this.caseState,
        placeFullAddress: this.caseAddress,
        startTime: this.caseHappenBeginTime,
        endTime: this.caseHappenEndTime,
        caseCategoryDesc: this.caseCategory,
        caseMethodDesc: this.crimeMethod,
        caseLevelDesc: this.harmLevel,
        caseTargetDesc: this.violateAim,
        caseToolDesc: this.crimeTool,
        caseOpportunityDesc: this.crimeOpportunity,
        creatorName: this.upLoadPerson,
        startTime2: this.uploadBeginTime,
        endTime2: this.uploadEndTime,
        /*人员信息*/
        genderCode: this.personSex,
        ageUpLimit: this.personAge,
        // heightUpLimit: this.personHeight,
        // behaviorDescription: this.BehaviorType,
        // bodySpeciallMark: this.SpecialTagType,
        bodyType: this.bodyType,
        hairColor: this.HairColorStyle,
        pcoatStyle: this.CoatStyleType,
        pcoatColor: this.BikeCoatStyleColorType,
        ptrousersStyle: this.CulotteStyleType,
        ptrousersColor: this.CulotteColorType,
        stature:this.stature,
        // shoesStyle: this.ShoesStyleType,
        // shoesColor: this.ShoesColorType,
        // glassStyle: this.EyePartType,
        tphairStyle: this.tphairStyle,
        ethicCode: this.ethicCode,
        tpcoatTexture: this.tpcoatTexture,
        viewType: this.viewType,

        /**机动车**/
        behavior: this.VehicleBehaviorType,
        vehicleModel: this.VehicleMode,
        mvehicleBrand: this.VehicleBrandType,
        mplateNo: this.carNo,
        mvehicleColor: this.VehicleKindColorType,
        mfilmColor: this.AutoFoilColorType,
        propertySunroof: this.propertySunroof,
        tmplateClass: this.tmplateClass,

        /**非机动车**/
        plateClass: this.plateClass,
        plateColor: this.plateColor,
        plateNo: this.plateNo,
        plateNoAttach: this.plateNoAttach,
        plateDescribe: this.plateDescribe,
        vehicleBrand: this.vehicleBrand,
        vehicleType: this.vehicleType,
        vehicleLength: this.vehicleType,
        vehicleColor: this.vehicleColor,
        vehicleHood: this.vehicleHood,
        vehicleTrunk: this.vehicleTrunk,
        vehicleWheel: this.vehicleWheel,
        wheelPrintedPattern: this.wheelPrintedPattern,
        vehicleWindow: this.vehicleWindow,
        vehicleRoof: this.vehicleRoof,
        vehicleDoor: this.vehicleDoor,
        sideOfVehicle: this.sideOfVehicle,
        carOfVehicle: this.carOfVehicle,
        rearviewMirror: this.rearviewMirror,
        vehicleChassis: this.vehicleChassis,
        vehicleShielding: this.vehicleShielding,
        filmColor: this.filmColor,
        hairStyle: this.hairStyle,
        coatStyle: this.coatStyle,
        coatColor: this.coatColor,
        coatTexture: this.coatTexture,
        trousersStyle: this.trousersStyle,
        trousersColor: this.trousersColor,
        bagStyle: this.bagStyle,
        bagColor: this.bagColor,
        carryingType: this.carryingType,
        tbageType: this.tbageType,
        driverCount: this.driverCount,
        eyePart: this.eyePart,
        mouthPart: this.mouthPart,
        scarf: this.scarf,
        tbethicCode: this.tbethicCode,
        tbgenderCode: this.tbgenderCode,
        tbbodyType: this.tbbodyType,
        umbrellaFlag: this.umbrellaFlag,
        tbviewType: this.tbviewType
      };
      // console.log(SearchCondition.state,"这是输入的案件类型");
      sessionStorage.setItem(
        "caseSearchCondition",
        JSON.stringify(SearchCondition)
      );
    },

    reset() {
      if (this.imgUrlShow) {
        document.getElementById("imgUrlShow").style = "none";
      }
      this.imgUrlShow = "";
      (this.stature = ""),
      (this.caseNo = ""),
        (this.caseAddress = ""),
        (this.harmLevel = ""),
        (this.uploadBeginTime = ""),
        (this.upLoadPerson = ""),
        (this.caseName = ""),
        (this.caseHappenBeginTime = ""),
        (this.caseCategory = ""),
        (this.violateAim = ""),
        (this.caseStateDes = ""),
        (this.crimeMethod = ""),
        (this.crimeTool = ""),
        (this.crimeOpportunity = ""),
        (this.caseHappenEndTime = ""),
        (this.uploadEndTime = ""),
        (this.personSex = ""),
        (this.personAge = ""),
        (this.HairColorStyle = ""),
        (this.tpcoatTexture = ""),
        (this.bodyType = ""),
        (this.viewType = ""),
        (this.CoatStyleType = ""),
        (this.CulotteStyleType = ""),
        (this.ethicCode = ""),
        (this.tphairStyle = ""),
        (this.BikeCoatStyleColorType = ""),
        (this.CulotteColorType = ""),
        (this.plateColor = ""),
        (this.plateClass = ""),
        (this.VehicleKindColorType = ""),
        (this.tbgenderCode = ""),
        (this.tbethicCode = ""),
        (this.tbviewType = ""),
        (this.coatStyle = ""),
        (this.coatTexture = "");
      (this.trousersStyle = ""),
        (this.tbbodyType = ""),
        (this.tbageType = ""),
        (this.hairStyle = ""),
        (this.coatColor = ""),
        (this.trousersColor = ""),
        (this.bagStyle = ""),
        (this.carNo = "");
      let maxDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), //关键
        date: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
      };
      this.uploadTimeOne.config.max = maxDate;
      this.uploadTimeTwo.config.min = "1900-01-01 00:00:00";
      this.caseTimeOne.config.max = maxDate;
      this.caseTimeTwo.config.min = "1900-01-01 00:00:00";
    },

  },
  beforeCreate() {
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
  },

  mounted() {
    // this.getCaseStateList();
    this.$nextTick(() => {
     //获取从结果页面返回的值
      let current = this.$route.query.current;
      //判断这个值有没有
      if (current !== undefined) {
        current = Number(current);
        //如果有，就默认选中之前Item的
        document.getElementsByClassName("tabsItem")[current].click();
      }else{
        //否则就让第一个Item被点击
        document.getElementsByClassName("tabDefault")[0].click();
      }
      document.addEventListener("click", function(e) {
        var ev = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
          if (elem.className == "condition") {
            return;
          }
          elem = elem.parentNode;
        }
        var lists = document.getElementsByClassName("condition_child");
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.display = "none";
        }
      });
    });
    //上传时间
    let _this = this;
    this.uploadTimeOne = laydate.render({
      elem: "#uploadBeginTime",
      type: "datetime",
      max: new Date(new Date().getTime()).Format("yyyy-MM-dd hh:mm:ss"),
      btns: ["now", "confirm"],
      done: (value, date, endDate) => {
        this.uploadBeginTime = value;
        this.uploadEndTime = value.split(" ")[0] + " 23:59:59";
        this.uploadTimeTwo.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    this.uploadTimeTwo = laydate.render({
      elem: "#uploadEndTime",
      type: "datetime",
      btns: ["now", "confirm"],
      max: 1,
      done: (value, date, endDate) => {
        this.uploadEndTime = value;
        this.uploadTimeOne.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    // 案发时间
    this.caseTimeOne = laydate.render({
      elem: "#caseHappenBeginTime",
      type: "datetime",
      max: new Date(new Date().getTime()).Format("yyyy-MM-dd hh:mm:ss"),
      btns: ["now", "confirm"],
      done: (value, date, endDate) => {
        this.caseHappenBeginTime = value;
        // _this.caseHappenEndTime = new Date(new Date(value).getTime()).Format('yyyy-MM-dd hh:mm:ss');// + 7 * 24 * 60 * 60 * 1000
        this.caseHappenEndTime = value.split(" ")[0] + " 23:59:59";
        this.caseTimeTwo.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    this.caseTimeTwo = laydate.render({
      elem: "#caseHappenEndTime",
      type: "datetime",
      btns: ["now", "confirm"],
      max: 1,
      done: (value, date, endDate) => {
        this.caseHappenEndTime = value;
        this.caseTimeOne.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });


  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
@import "../../../assets/css/case_common.css";

.uploadImg {
  width: 1.77rem;
  height: 1.77rem;
  border: 1px solid #1c3f67;
  position: relative;
  overflow: hidden;
  margin-left: 1rem;
  cursor: pointer;
  /* margin-left: 0.2rem; */
  cursor: pointer;
}
.uploadImg img {
  position: absolute;
}
.openupload {
  color: #99c9fa;
  cursor: pointer;
  margin-left: 1rem;
}

.contentBody .contentTitle {
  /* width: 100%; */
  height: 100%;
  line-height: 0.45rem;
  /* background-color: #FAF9F5; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.14rem;
  position: absolute;
  right: 0.2rem;
  /* border-bottom:1px solid #E2E3E3; */
}

.contentTitle input {
  width: 5rem;
  background-color: white;
  height: 0.3rem;
  font-size: 0.14rem;
}
.contentTitle .el-button {
  width: 0.8rem;
  height: 0.32rem;
  font-size: 0.14rem;
  padding: 0;
}
.searchBtn {
  width: 0.8rem;
  height: 0.3rem;
  /* background-color: #2D90F7; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.1rem;
  border-radius: 3px;
  color: white;
  cursor: pointer;
}
.el-icon-plus {
  width: 0.5rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.3rem;
  color: #99c9fa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tryBtn {
  width: 0.8rem;
  height: 0.3rem;
  /* background-color: #E6A23C; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.1rem;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

.content {
  flex: 1;
  width: calc(100% - 0.4rem);
  /*height: calc(100% - 0.6rem - 0.82rem);*/
  margin: 0.1rem 0.2rem 0;
  border: 1px solid #0c4487;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0 1px 1px #cdcdcd; */
}

.contentTabs {
  width: 100%;
  height: 0.45rem;
  background-color: rgba(12, 29, 49, 0.7);
  border-bottom: 1px solid rgba(35, 84, 136, 0.5);
  display: flex;
  align-items: center;
  color: #99c9fa;
  position: relative;
}

.tabsItem {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.14rem;
  width: 1.24rem;
  height: 0.45rem;
  cursor: pointer;
  position: relative;
}
.afttabsItem::after {
  content: "";
  width: 1px;
  height: 0.12rem;
  background-color: #409eff;
  position: absolute;
  right: 0;
}
.contentTabs .tabDefault {
  /* background-color: #F9FAF8; */
  color: #4ea5ff;
  border-bottom: 2px solid #4ea5ff;
  /* border-left: 1px solid #E2E6EC;
    border-right: 1px solid #E2E6EC;
    border-bottom: none; */
}
.contentDetialWrapper {
  /*max-height:5.92rem;*/
  overflow-y: auto;
  flex: 1;
  /*height: calc(100% - 0.54rem - 0.6rem);*/
  /*width: 100%;*/
}

.contentDetial {
  /*width: 100%;*/
  /*height: 100%;*/
  display: flex;
  flex-direction: column;
}

.contentDetialTitle {
  width: 100%;
  height: 0.7rem;
  display: flex;
  align-items: center;
}
.contentDetialTitle span {
  margin-left: 20px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.detailItems {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.25rem;
  height: calc(100% - 0.7rem);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /*overflow-y: auto;*/
}

.detailItems ul {
  width: 33.33%;
  font-size: 0.12rem;
  color: #99c9fa;
}

.detailItems ul span {
  display: inline-block;
  width: 0.8rem;
}

.detailItems ul input {
  width: calc(100% - 0.9rem);
  height: 0.3rem;
  color: #99c9fa;
}

.detailItems ul select {
  width: calc(100% - 74px);
  height: 0.36rem;
  border: 1px solid #e6e8ed;
  color: #6c6e72;
}

.detailItems ul select option {
  height: 0.36rem;
  color: #6c6e72;
}

.detailItems ul li {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  position: relative;
}

.contentBottom {
  width: 100%;
  height: 0.6rem;
  background-color: rgba(28, 60, 95, 0.5);
  border-top: 1px solid rgba(38, 85, 134, 0.5);
}

/*可选可输入框样式*/
.detailItems ul li i {
  position: absolute;
  width: 0.2rem;
  left: calc(100% - 33px);
  cursor: pointer;
  top: 50%;
  /* background-color: #fff; */
  z-index: 2;
  transform: translateY(-50%);
}

.detailItems ul li ol {
  position: absolute;
  width: calc(100% - 0.9rem);
  max-height: 1.2rem;
  overflow: auto;
  top: 0.35rem;
  right: 0.06rem;
  background-color: #030810;
  border: 1px solid #ccc;
  z-index: 5;
}

.detailItems > ul li ol li {
  /* border-bottom: 1px solid #ccc; */
  height: .3rem;
  line-height: 0.3rem;
  padding-left: 0.1rem;
  cursor: pointer;
  margin: 0;
}
.detailItems > ul li ol li:hover {
  background: rgba(12, 68, 135, 0.4);
}
</style>

