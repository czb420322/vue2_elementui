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
                        class="tabsItem tabDefault afttabsItem"
                        ref="aaa"
                        @click="changeItem($event,0);checkItme = 'caseInfo'"
                    >基本信息</div>
                    <div
                        class="tabsItem afttabsItem"
                        ref="aaa"
                        @click="changeItem($event,1);checkItme = 'person'"
                    >人员信息</div>
                    <div
                        class="tabsItem afttabsItem"
                        @click="changeItem($event,2);checkItme = 'motorVehicle'"
                    >车辆信息</div>
                    <div class="tabsItem" @click="changeItem($event,3);checkItme = 'bicycle'">骑车人信息</div>
                    <div class="contentTitle">
                        <el-button
                            class="searchBtn"
                            icon="el-icon-search"
                            @click="searchReflex()"
                        >查询</el-button>
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
                                    <span>案件编号：</span>
                                    <input v-model="caseNo" type="text" placeholder="请输入案件编号">
                                </li>
                                <li>
                                    <span>案件名称：</span>
                                    <input type="text" v-model="caseName" placeholder="请输入案件名称">
                                </li>
                                <li>
                                    <span>案件状态：</span>
                                    <el-select
                                        v-model="caseState"
                                        @visible-change="getstructurotherprop()"
                                        placeholder="请选择案件状态"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value_code"
                                            :value="item.value_code"
                                            :label="item.value_name"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>案发详址：</span>
                                    <input
                                        v-model="caseAddress"
                                        type="text"
                                        placeholder="请输入案发详细地址"
                                    >
                                </li>
                                <li>
                                    <span>案发时间：</span>
                                    <el-input
                                        placeholder="请选择开始时间"
                                        suffix-icon="el-icon-date"
                                        id="caseHappenBeginTime"
                                        readonly
                                        v-model="caseHappenBeginTime">
                                    </el-input>
                                </li>
                                <li>
                                    <span>至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：&nbsp;</span>
                                    <el-input
                                        placeholder="请选择结束时间"
                                        suffix-icon="el-icon-date"
                                        id="caseHappenEndTime"
                                        readonly
                                        v-model="caseHappenEndTime">
                                    </el-input>
                                </li>

                                <li>
                                    <span>危害程度：</span>
                                    <el-select
                                        v-model="harmLevel"
                                        @visible-change="getstructurprop('CaseLevel')"
                                        placeholder="请选择危害程度"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>案件类型：</span>

                                    <el-select
                                        v-model="caseCategory"
                                        @visible-change="getstructurprop('CaseType')"
                                        placeholder="请选择案件类型"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>作案手段：</span>

                                    <el-select
                                        v-model="crimeMethod"
                                        @visible-change="getstructurprop('CaseMethod')"
                                        placeholder="请选择作案手段"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上传时间：</span>
                                    <el-input
                                        placeholder="请选择结束时间"
                                        suffix-icon="el-icon-date"
                                        id="uploadBeginTime"
                                        readonly
                                        v-model="uploadBeginTime">
                                    </el-input>
                                </li>
                                <li>
                                    <span>至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：&nbsp;</span>

                                    <el-input
                                        placeholder="请选择结束时间"
                                        suffix-icon="el-icon-date"
                                        id="uploadEndTime"
                                        readonly
                                        v-model="uploadEndTime">
                                    </el-input>
                                </li>
                                <li>
                                    <span>作案工具：</span>
                                    <el-select
                                        v-model="crimeTool"
                                        @visible-change="getstructurprop('CaseTool')"
                                        placeholder="请选择作案工具"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上传用户：</span>
                                    <input type="text" v-model="upLoadPerson" placeholder="请输入上传用户">
                                </li>
                                <li>
                                    <span>侵犯目标：</span>
                                    <el-select
                                        v-model="violateAim"
                                        @visible-change="getstructurprop('CaseTarget')"
                                        placeholder="请选择侵犯目标"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>作案时机：</span>
                                    <el-select
                                        v-model="crimeOpportunity"
                                        @visible-change="getstructurprop('CaseOpportunity')"
                                        placeholder="请选择作案时机"
                                    >
                                        <el-option value label></el-option>
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
                        <p v-if="checkItme == 'person'" class="openupload">
                            <span @click="openSearchCase = true">人脸查询</span>
                        </p>

                        <div class="detailItems">
                            <ul>
                                <li>
                                    <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                                    <el-select
                                        v-model="personSex"
                                        @visible-change="getstructurprop('GenderType')"
                                        placeholder="请选择性别"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>

                                <li>
                                    <span>&nbsp;&nbsp;年龄段：</span>
                                    <el-select
                                        v-model="personAge"
                                        @visible-change="getstructurprop('PersonAgeType')"
                                        placeholder="请选择年龄段"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</span>
                                    <el-select
                                        v-model="ethicCode"
                                        @visible-change="getstructurprop('EthicCodeType')"
                                        placeholder="请选择民族"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                                    <el-select
                                        v-model="bodyType"
                                        @visible-change="getstructurandprop('BodyType')"
                                        placeholder="请选择体态"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向：</span>
                                    <el-select
                                        v-model="viewType"
                                        @visible-change="getstructurprop('PersonViewType')"
                                        placeholder="请选择朝向"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                                    <el-select
                                        v-model="tphairStyle"
                                        @visible-change="getstructurprop('HairStyleType')"
                                        placeholder="请选择发型"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>头发颜色：</span>
                                    <el-select
                                        v-model="HairColorStyle"
                                        @visible-change="getstructurprop('HairColorStyle')"
                                        placeholder="请选择头发颜色"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上衣类型：</span>
                                    <el-select
                                        v-model="CoatStyleType"
                                        @visible-change="getstructurandprop('CoatStyleType')"
                                        placeholder="请选择上衣类型"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上衣颜色：</span>
                                    <el-select
                                        v-model="BikeCoatStyleColorType"
                                        @visible-change="getstructurprop('ColorType')"
                                        placeholder="请选择上衣颜色"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上衣纹理：</span>
                                    <el-select
                                        v-model="tpcoatTexture"
                                        @visible-change="getstructurprop('CoatTextureType')"
                                        placeholder="请选择上衣纹理"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>

                                <li>
                                    <span>下衣类型：</span>
                                    <el-select
                                        v-model="CulotteStyleType"
                                        @visible-change="getstructurprop('PantsStyleType')"
                                        placeholder="请选择下衣类型"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>下衣颜色：</span>
                                    <el-select
                                        v-model="CulotteColorType"
                                        @visible-change="getstructurprop('CulotteColorType')"
                                        placeholder="请选择下衣颜色"
                                    >
                                        <el-option value label></el-option>
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
                        <p v-show="checkItme == 'motorVehicle'" class="openupload">
                            <span @click="openaccess = true">车辆查询</span>
                        </p>
                        <div class="detailItems">
                            <ul>
                                <li>
                                    <span>车牌号码：</span>
                                    <input type="text" v-model="carNo" placeholder="请输入车牌号码">
                                </li>
                                <li>
                                    <span>车牌颜色：</span>
                                    <el-select
                                        v-model="plateColor"
                                        @visible-change="getstructurprop('PlateColorType')"
                                        placeholder="请选择车牌颜色"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>车辆类型：</span>
                                    <el-select v-model="plateClass" placeholder="请选择车辆类型">
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :value="item.label"
                                            :label="item.label"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>车身颜色：</span>
                                    <el-select
                                        v-model="VehicleKindColorType"
                                        @visible-change="getstructurprop('VehicleKindColorType')"
                                        placeholder="请选择车身颜色"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>车辆品牌：</span>
                                    <el-select
                                        v-model="VehicleBrandType"
                                        @visible-change="getstructurprop('VehicleBrandType')"
                                        placeholder="请选择车辆品牌"
                                    >
                                        <el-option value label></el-option>
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
                    <!--非机动车信息-->
                    <div class="contentDetial tab4">
                        <div class="contentDetialTitle">
                            <span>骑车人信息</span>
                        </div>
                        <div class="detailItems">
                            <ul>
                                <li>
                                    <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                                    <el-select
                                        v-model="tbgenderCode"
                                        @visible-change="getstructurprop('GenderType')"
                                        placeholder="请选择性别"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>年&nbsp;&nbsp;龄&nbsp;段：</span>
                                    <el-select
                                        v-model="tbageType"
                                        @visible-change="getstructurprop('PersonAgeType')"
                                        placeholder="请选择上衣纹理"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</span>
                                    <el-select
                                        v-model="tbethicCode"
                                        @visible-change="getstructurprop('EthicCodeType')"
                                        placeholder="请选择民族"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                                    <el-select
                                        v-model="tbbodyType"
                                        @visible-change="getstructurandprop('BikeBodyType')"
                                        placeholder="请选择体态"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>

                                <li>
                                    <span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向：</span>
                                    <el-select
                                        v-model="tbviewType"
                                        @visible-change="getstructurprop('BikeTowardsType')"
                                        placeholder="请选择朝向"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                                    <el-select
                                        v-model="hairStyle"
                                        @visible-change="getstructurprop('BikeHairStyleType')"
                                        placeholder="请选择发型"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上衣类型：</span>
                                    <el-select
                                        v-model="coatStyle"
                                        @visible-change="getstructurandprop('BikeCoatStyleType')"
                                        placeholder="请选择上衣类型"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上衣颜色：</span>
                                    <el-select
                                        v-model="coatColor"
                                        @visible-change="getstructurprop('BikeCoatStyleColorType')"
                                        placeholder="请选择上衣颜色"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>上衣纹理：</span>
                                    <el-select
                                        v-model="coatTexture"
                                        @visible-change="getstructurprop('BikeCoatTextureType')"
                                        placeholder="请选择上衣纹理"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>下衣类型：</span>
                                    <el-select
                                        v-model="trousersStyle"
                                        @visible-change="getstructurprop('BikeCulotteStyleType')"
                                        placeholder="请选择下衣类型"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>下衣颜色：</span>
                                    <el-select
                                        v-model="trousersColor"
                                        @visible-change="getstructurprop('BikeCulotteColorType')"
                                        placeholder="请选择下衣颜色"
                                    >
                                        <el-option value label></el-option>
                                        <el-option
                                            v-for="item in structurList"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.value"
                                        ></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span>包&nbsp;&nbsp;类&nbsp;型：</span>
                                    <el-select
                                        v-model="bagStyle"
                                        @visible-change="getstructurprop('BikeBagType')"
                                        placeholder="请选择包类型"
                                    >
                                        <el-option value label></el-option>
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
import { mapMutations, mapGetters } from "vuex";
import caseRetrieval from "../../../api/casestudy/caseRetrieval.js";
export default {
    components: {
        Footer_case,
        openfacecars,
        searchPersonCase
    },
    data() {
        return {};
    },
    mixins: [caseRetrieval],

    computed: {
        ...mapGetters(["eventsc"])
    },
    methods: {
        ...mapMutations(["seteventsc"])
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
    font-size: 0.12rem;
    color: #99c9fa;
}

/* .detailItems ul span {
    display: inline-block;
    width: 0.8rem;
} */

/* .detailItems ul input {
    width: calc(100% - 0.9rem);
    height: 0.3rem;
    color: #99c9fa;
} */

/* .detailItems ul select {
    width: calc(100% - 74px);
    height: 0.36rem;
    border: 1px solid #e6e8ed;
    color: #6c6e72;
} */

/* .detailItems ul select option {
    height: 0.36rem;
    color: #6c6e72;
} */

.detailItems ul li {
    margin-top: 2%;
    float: left;
    width: 33%;
    position: relative;
}
.detailItems /deep/ .el-input,
.el-select{
    width: 70%;
}
.el-input /deep/ .el-input__icon{
    line-height: .25rem
}
.el-select /deep/ .el-input{
    width: 100%;
}

.contentBottom {
    width: 100%;
    height: 0.6rem;
    background-color: rgba(28, 60, 95, 0.5);
    border-top: 1px solid rgba(38, 85, 134, 0.5);
}


</style>

