<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        class="sysname"
        :to="{path:'/videoStrucPlat',query:{menuCode:700}}"
        style="z-index:999"
      >首页 ></router-link>
      <p class="sysname" @click="goTasklist">&nbsp;任务管理 ></p>
      <p class="sysname">&nbsp;特征搜索</p>
      <p class="clicklink">
        <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/resourceManage',query:{menuCode:704}}"
        >涉案视频管理</router-link>
        <!-- <router-link tag="span" :to="{path:'/videoStrucPlat/taskManage',query:{menuCode:701}}">任务管理</router-link> -->
        <span @click="goTasklist">任务管理</span>
        <router-link tag="span" :to="{path:'/videoStrucPlat/searchPrint',query:{menuCode:703}}">以图搜图</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/videoRetrieval',query:{menuCode:710}}"
        >检索查询</router-link>

        <router-link tag="span" :to="{path:'/videoStrucPlat/caseList',query:{menuCode:711}}">案件管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/MarkPool',query:{menuCode:712}}">标注池</router-link>
      </p>
    </div>
    <div class="mainContent">
      <div class="content">
        <div class="changButton">
          <el-button
            @click="checkTarget(1)"
            :class="{avtive: isoptfor == 1}"
            class="commBtn addBtn fs14"
          >行人</el-button>
          <el-button
            @click="checkTarget(2)"
            :class="{avtive: isoptfor == 2}"
            class="commBtn addBtn fs14"
          >车辆</el-button>
          <el-button
            @click="checkTarget(3)"
            :class="{avtive: isoptfor == 3}"
            class="commBtn addBtn fs14"
          >骑车人</el-button>
          <el-button
            @click="checkTarget(4)"
            :class="{avtive: isoptfor == 4}"
            class="commBtn addBtn fs14"
          >人脸</el-button>
        </div>

        <!-- 条件筛选区域 -->
        <div class="searchCondition">
          <ul class="searchCondition_ul">
            <li>
              <span class="fs14">
                开始时间：
                <i></i>
              </span>
              <input
                type="text"
                autocomplete="off"
                v-model="beginData"
                id="timeBegin"
                placeholder="请输入开始时间"
              >
            </li>
            <li>
              <span class="fs14">
                结束时间：
                <i></i>
              </span>
              <input
                type="text"
                autocomplete="off"
                v-model="endData"
                id="timeEnd"
                placeholder="请输入结束时间"
              >
            </li>
            <li>
              <div style="float:left">
                <span class="fs14">区域：</span>
              </div>
              <el-select
                v-model="regionArea"
                filterable
                multiple
                collapse-tags
                class="searcharea"
                @change="selectRegionArea"
                :placeholder="posPoint"
              >
                <el-option
                  v-for="item in pointList"
                  :key="item.deviceUuid"
                  :label="item.cameraName"
                  :value="item.deviceUuid"
                >{{item.cameraName}}</el-option>
              </el-select>
            </li>
            <li style="margin-top:-3px">
              <el-button
                type="primary"
                class="searchBtn fs14"
                @click="currentPage = 1;searchAllStructureResult()"
              >查询</el-button>
            </li>
            <li style="margin-top:-3px">
              <el-button type="info" class="tryBtn fs14" @click="clearValue">重置</el-button>
            </li>
          </ul>
        </div>

        <!-- 属性选择折叠区域 -->
        <div class="arrtibuteCollapseArea">
          <el-popover placement="bottom" width="1600" trigger="click">
            <div id="searchImgResult" class="showinfo" v-if="isoptfor == 1">
              <div>
                <span>性别：</span>
                <el-checkbox-group v-model="peopleSexValue" @change="selectPeopleSex">
                  <el-checkbox
                    v-for="(item,index) in peopleSexList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>年龄段：</span>
                <el-checkbox-group v-model="peopleAgeValue" @change="selectPeopleAge">
                  <el-checkbox
                    v-for="(item,index) in peopleAgeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>发型：</span>
                <el-checkbox-group v-model="hairStyleValue" @change="selecthairStyle">
                  <el-checkbox
                    v-for="(item,index) in hairStyleList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>上衣类型：</span>
                <el-checkbox-group v-model="peopleJacketTypeValue" @change="selectpeopleJacketType">
                  <el-checkbox
                    v-for="(item,index) in peopleJacketTypeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>上衣颜色：</span>
                <el-checkbox-group
                  v-model="peopleJacketColorValue"
                  @change="selectpeopleJacketColor"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleJacketColorList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>上衣纹理：</span>
                <el-checkbox-group
                  v-model="peopleJacketGrainValue"
                  @change="selectpeopleJacketGrain"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleJacketGrainList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>下衣类型：</span>
                <el-checkbox-group
                  v-model="peopleUnderwearTypeValue"
                  @change="selectpeopleUnderwearType"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleUnderwearTypeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>下衣颜色：</span>
                <el-checkbox-group
                  v-model="peopleUnderwearColorValue"
                  @change="selectpeopleUnderwearColor"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleUnderwearColorList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>包类型：</span>
                <el-checkbox-group v-model="peopleBagTypeValue" @change="selectpeopleBagType">
                  <el-checkbox
                    v-for="(item,index) in peopleBagTypeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div id="searchImgResult" class="showinfo" v-if="isoptfor == 2">
              <div>
                <span>车牌号码：</span>
                <input type="text" class="plant" v-model="plateNo" placeholder="请输入车牌号码">
              </div>

              <div>
                <span>车牌类型：</span>
                <el-checkbox-group v-model="carPlateTypeValue" @change="selectCarPlate">
                  <el-checkbox
                    v-for="(item,index) in carPlateTypeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>车身颜色：</span>
                <el-checkbox-group v-model="carColorValue" @change="selectCarColor">
                  <el-checkbox
                    v-for="(item,index) in carColorList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div id="searchImgResult" class="showinfo" v-if="isoptfor == 3">
              <div>
                <span>性别：</span>
                <el-checkbox-group v-model="peopleSexValue" @change="selectPeopleSex">
                  <el-checkbox
                    v-for="(item,index) in peopleSexList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>年龄段：</span>
                <el-checkbox-group v-model="peopleAgeValue" @change="selectPeopleAge">
                  <el-checkbox
                    v-for="(item,index) in peopleAgeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>发型：</span>
                <el-checkbox-group v-model="hairStyleValue" @change="selecthairStyle">
                  <el-checkbox
                    v-for="(item,index) in hairStyleList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>上衣类型：</span>
                <el-checkbox-group v-model="peopleJacketTypeValue" @change="selectpeopleJacketType" >
                  <el-checkbox
                    v-for="(item,index) in peopleJacketTypeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>上衣颜色：</span>
                <el-checkbox-group
                  v-model="peopleJacketColorValue"
                  @change="selectpeopleJacketColor"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleJacketColorList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>上衣纹理：</span>
                <el-checkbox-group
                  v-model="peopleJacketGrainValue"
                  @change="selectpeopleJacketGrain"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleJacketGrainList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>下衣类型：</span>
                <el-checkbox-group
                  v-model="peopleUnderwearTypeValue"
                  @change="selectpeopleUnderwearType"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleUnderwearTypeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>下衣颜色：</span>
                <el-checkbox-group
                  v-model="peopleUnderwearColorValue"
                  @change="selectpeopleUnderwearColor"
                >
                  <el-checkbox
                    v-for="(item,index) in peopleUnderwearColorList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>包类型：</span>
                <el-checkbox-group v-model="peopleBagTypeValue" @change="selectpeopleBagType">
                  <el-checkbox
                    v-for="(item,index) in peopleBagTypeList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>

              <div>
                <span>民族：</span>
                <el-checkbox-group v-model="bicycleNationValue" @change="selectBicycleNation">
                  <el-checkbox
                    v-for="(item,index) in bicycleNationList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>是否打伞：</span>
                <el-checkbox-group v-model="bicycleUmbrellaValue" @change="selectBicycleUmbrella">
                  <el-checkbox
                    v-for="(item,index) in bicycleUmbrellaList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>是否携物：</span>
                <el-checkbox-group
                  v-model="bicycleCarryGoodsValue"
                  @change="selectBicycleCarryGoods"
                >
                  <el-checkbox
                    v-for="(item,index) in bicycleCarryGoodsList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>包颜色：</span>
                <el-checkbox-group v-model="bicycleBagColorValue" @change="selectBicycleBagColor">
                  <el-checkbox
                    v-for="(item,index) in bicycleBagColorList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>车颜色：</span>
                <el-checkbox-group v-model="bicycleColorValue" @change="selectBicycleColor">
                  <el-checkbox
                    v-for="(item,index) in bicycleColorList"
                    :key="index"
                    :value="item.valueString"
                    :label="item.valueString"
                  >{{item.valueString}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div id="searchImgResult" class="showinfo" v-if="isoptfor == 4">
              <div>
                <span>年龄：</span>
                <input type="num" class="plant" v-model="faceAge" placeholder="请输入年龄">
              </div>
              <div>
                <span>性别：</span>
                <el-checkbox-group v-model="genderList" @change="selectface(genderList,'gender')">
                  <el-checkbox key value label>未知</el-checkbox>
                  <el-checkbox key="0" value="0" label="0">男</el-checkbox>
                  <el-checkbox key="1" value="1" label="1">女</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>是否戴口罩：</span>
                <el-checkbox-group v-model="maskList" @change="selectface(maskList,'mask')">
                  <el-checkbox value="0" key="0" label="0">不戴口罩</el-checkbox>
                  <el-checkbox value="1" key="1" label="1">戴口罩</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>是否戴墨镜：</span>
                <el-checkbox-group
                  v-model="sunGlassesList"
                  @change="selectface(sunGlassesList,'sunGlasses')"
                >
                  <el-checkbox value="0" key="0" label="0">不戴墨镜</el-checkbox>
                  <el-checkbox value="1" key="1" label="1">戴墨镜</el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>是否戴眼镜：</span>
                <el-checkbox-group
                  v-model="eyeGlassesList"
                  @change="selectface(eyeGlassesList,'eyeGlasses')"
                >
                  <el-checkbox value="0" key="0" label="0">不戴眼镜</el-checkbox>
                  <el-checkbox value="1" key="1" label="1">戴眼镜</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <el-button
              slot="reference"
              id="selectArrtibute"
              class="commBtn addBtn selectArrtibute fs14 span"
            >选择筛选属性</el-button>
          </el-popover>
        </div>
      </div>
      <div class="searchResultArea">
        <ul class="searchResultArea_ul">
          <li class="searchResultArea_ul_li" v-for="(item,index) in retrieveResult" :key="index">
            <div class="contentdiv" :class="{'playactive' : isactive == index}">
              <div class="topImg">
                <div class="imgbox">
                  <img :src="item.traceImgUrl" v-if="isoptfor != 4" style="object-fit:contain">
                  <img :src="item.faceImgUrl" v-if="isoptfor == 4" style="object-fit:none">
                  <p
                    class="play none"
                    title="播放"
                    @click="playvideo(item,index)"
                    v-preventReClick="1500"
                  ></p>
                  <span v-if="isoptfor == 4">{{item.reliable ? '可比对' : '不可比对'}}</span>
                </div>

                <div class="infos peoples" v-if="isoptfor == 1">
                  <div class="peoplesdiv" i="peoplesdiv">
                    <p :title="item.sex">
                      <span>
                        性别：
                        <i></i>
                      </span>
                      {{item.sex}}
                    </p>
                    <p :title="item.age">
                      <span>
                        年龄段：
                        <i></i>
                      </span>
                      {{item.age}}
                    </p>
                    <p :title="item.hairStyle">
                      <span>
                        发型：
                        <i></i>
                      </span>
                      {{item.hairStyle}}
                    </p>
                    <p :title="item.packageStyle">
                      <span>
                        包类型：
                        <i></i>
                      </span>
                      {{item.packageStyle}}
                    </p>
                    <p :title="item.coatLength" class="others">
                      <span>
                        上衣类型：
                        <i></i>
                      </span>
                      {{item.coatLength}}
                    </p>
                    <p :title="item.coatColor" class="others">
                      <span>
                        上衣颜色：
                        <i></i>
                      </span>
                      {{item.coatColor}}
                    </p>
                    <p :title="item.coatPattern" class="others">
                      <span>
                        上衣纹理：
                        <i></i>
                      </span>
                      {{item.coatPattern}}
                    </p>
                    <p :title="item.trousersStyle" class="others">
                      <span>
                        下衣类型：
                        <i></i>
                      </span>
                      {{item.trousersStyle}}
                    </p>
                    <p :title="item.trousersColor" class="others">
                      <span>
                        下衣颜色：
                        <i></i>
                      </span>
                      {{item.trousersColor}}
                    </p>
                    <p class="others timechange lh12">
                      <span>
                        时间：
                        <i></i>
                      </span>
                      <b :title="item | getDatetime">{{item | getDatetime}}</b>
                    </p>
                  </div>
                </div>
                <div class="infos peoples" v-if="isoptfor == 2">
                  <div class="peoplesdiv carinfo_div">
                    <p>
                      <span>
                        车牌号码：
                        <i></i>
                      </span>
                      {{item.plateNo}}
                    </p>
                    <p>
                      <span>
                        车身颜色：
                        <i></i>
                      </span>
                      {{item.vehicleColor}}
                    </p>
                    <p>
                      <span>
                        车牌类型：
                        <i></i>
                      </span>
                      {{item.plateClass}}
                    </p>
                    <p class="timechange lh12">
                      <span>
                        时间：
                        <i></i>
                      </span>
                      <b :title="item | getDatetime">{{item | getDatetime}}</b>
                    </p>
                  </div>
                </div>
                <div class="infos bicyinfo" v-if="isoptfor == 3">
                  <ul class="bicycles">
                    <li :title="item.sex">
                      <span>
                        性别：
                        <i></i>
                      </span>
                      <span>{{item.sex}}</span>
                    </li>
                    <li :title="item.coatLength">
                      <span>
                        上衣类型：
                        <i></i>
                      </span>
                      <span>{{item.coatLength}}</span>
                    </li>
                    <li :title="item.age">
                      <span>
                        年龄段：
                        <i></i>
                      </span>
                      <span>{{item.age}}</span>
                    </li>
                    <li :title="item.coatColor">
                      <span>
                        上衣颜色：
                        <i></i>
                      </span>
                      <span>{{item.coatColor}}</span>
                    </li>
                    <li :title="item.hairStyle">
                      <span>
                        发型：
                        <i></i>
                      </span>
                      <span>{{item.hairStyle}}</span>
                    </li>
                    <li :title="item.coatPattern">
                      <span>
                        上衣纹理：
                        <i></i>
                      </span>
                      <span>{{item.coatPattern}}</span>
                    </li>
                    <li :title="item.ethnic">
                      <span>
                        民族：
                        <i></i>
                      </span>
                      <span>{{item.ethnic}}</span>
                    </li>
                    <li :title="item.trousersStyle">
                      <span>
                        下衣类型：
                        <i></i>
                      </span>
                      <span>{{item.trousersStyle}}</span>
                    </li>
                    <li :title="item.packageColor">
                      <span>
                        包颜色：
                        <i></i>
                      </span>
                      <span>{{item.packageColor}}</span>
                    </li>
                    <li :title="item.trousersColor">
                      <span>
                        下衣颜色：
                        <i></i>
                      </span>
                      <span>{{item.trousersColor}}</span>
                    </li>
                    <li :title="item.packageStyle">
                      <span>
                        包类型：
                        <i></i>
                      </span>
                      <span>{{item.packageStyle}}</span>
                    </li>
                    <li :title="item.umbrella">
                      <span>
                        是否打伞：
                        <i></i>
                      </span>
                      <span>{{item.umbrella}}</span>
                    </li>
                    <li :title="item.vehicleColor">
                      <span>
                        车颜色：
                        <i></i>
                      </span>
                      <span>{{item.vehicleColor}}</span>
                    </li>
                    <li :title="item.accessoryItem">
                      <span>
                        是否携物：
                        <i></i>
                      </span>
                      <span>{{item.accessoryItem}}</span>
                    </li>
                    <li class="timechange">
                      <span>
                        时间：
                        <i></i>
                      </span>
                      <b :title="item | getDatetime" class="b">{{item | getDatetime}}</b>
                    </li>
                  </ul>
                </div>
                <div class="infos peoples" v-if="isoptfor == 4">
                  <div class="peoplesdiv face_div">
                    <p :title="item.age">
                      <span>
                        年龄：
                        <i></i>
                      </span>


                      {{$commons.isEmpty(item.age) ? '未知' : item.age}}
                    </p>
                    <p class="others">
                      <span>
                        性别：
                        <i></i>
                      </span>


                      {{item.gender == '0' ? '男' : (item.gender == '1' ? '女' : '未知')}}
                    </p>
                    <p class="others">
                      <span>
                        是否戴口罩：
                        <i></i>
                      </span>


                      {{item.mask == 0 ? '不戴口罩' : '戴口罩'}}
                    </p>
                    <p class="others">
                      <span>
                        是否戴墨镜：
                        <i></i>
                      </span>


                      {{item.sunGlasses == 0 ? '不戴墨镜' : '戴墨镜'}}
                    </p>
                    <p class="others">
                      <span>
                        是否戴眼镜：
                        <i></i>
                      </span>


                      {{item.eyeGlasses == 0 ? '不戴眼镜' : '戴眼镜'}}
                    </p>
                    <p class="others timechange">
                      <span>
                        时间：
                        <i></i>
                      </span>
                      <b :title="item | getDatetime">{{item | getDatetime}}</b>
                    </p>
                  </div>
                </div>
              </div>
              <div class="btnArea">
                <div class="leftIcon">
                  <i class="el-icon-location"></i>
                  <span :title="item.deviceName">{{item.deviceName}}</span>
                </div>
                <div class="rightIcon">
                  <div
                    title="去重"
                    @click="fastSearchResult(item,1)"
                    class="tagconvert el-icon-bangzhu"
                  ></div>
                  <div title="查看大图" @click="lookBigImage(item)" class="tagconvert el-icon-view"></div>
                  <div
                    title="快捷搜索"
                    @click="fastSearchResult(item,2)"
                    class="tagconvert el-icon-search"
                  ></div>
                  <div title="下载" @click="downloadPic(item)" class="tagconvert el-icon-download"></div>
                  <div
                    v-show="isoptfor != 4"
                    title="转标注"
                    @click="confimTag(item)"
                    class="tagconvert el-icon-money"
                  ></div>
                  <!-- <div class="tagconvert troubleshoot" title="去重" @click="fastSearchResult(item,1)"></div>
                  <div class="tagconvert bigimg" title="查看大图" @click="lookBigImage(item)"></div>
                  <div class="tagconvert searchPic" title="快捷搜索" @click="fastSearchResult(item,2)"></div>
                  <div class="tagconvert downloadZip" title="下载" @click="downloadPic(item)"></div>
                  <div class="tagconvert removeDuplicats" v-show="isoptfor != 4" title="转标注" @click="confimTag(item)"></div>-->
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--分页的插件 -->
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

    <!-- 结构化结果展示区域 -->
    <videoStrus
      :isopenStrus="isopenStrus"
      :caseUuid="caseUuid"
      :deviceId="deviceId"
      :proptaskUuid="proptaskUuid"
      @childByStrus="childByStrus"
      @childbySearchImg="childbySearchImg"
      ref="videoStrus"
      :structType="isoptfor"
      @childByPlay="childByPlay"
    ></videoStrus>
    <structDxplayer @childybynext="childybynext" @childybyprev="childybyprev" ref="structDxplayer"></structDxplayer>
    <form
      action="vsas/structure/download/structure/downloadZip"
      method="post"
      id="downLoadId"
      v-show="false"
    >
      <input type="text" :value="ids" name="ids">
      <input type="text" :value="isoptfor" name="type">
    </form>
  </div>
</template>

<script>
import benginend from "../../api/realvideo/BenEedTime.js";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import videoStrus from "./videoStrust/videoStrus";
import _ from "lodash";
import structDxplayer from "./StructDxPlayer/StructDxplayer";
import merge from "webpack-merge"; //清空路由参数

export default {
  components: {
    videoStrus,
    structDxplayer
  },
  data() {
    return {
      isoptfor: 1,
      beginData: "", //开始时间
      endData: "", //结束时间
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30],
      totalCount: 0,
      regionArea: [], //区域
      pointList: [], //区域集合
      retrieveResult: [], // 检索结果
      peopleSexValue: [], //性别选中得值
      peopleSexList: [], //性别可以选择得值
      peopleAgeValue: [], //年龄段选中的值
      peopleAgeList: [], //年龄段
      hairStyleValue: [], //发型选中的值
      hairStyleList: [],
      peopleJacketTypeValue: [], //上衣类型选中的值
      peopleJacketTypeList: [],
      peopleJacketColorValue: [], //上衣颜色选中的值
      peopleJacketColorList: [],
      peopleJacketGrainValue: [], //上衣纹理
      peopleJacketGrainList: [],
      peopleUnderwearTypeValue: [], //下衣类型选中的值
      peopleUnderwearTypeList: [],
      peopleUnderwearColorValue: [], //下衣颜色选中的值
      peopleUnderwearColorList: [],
      peopleBagTypeValue: [], //包类型
      peopleBagTypeList: [],

      carPlateTypeValue: [], //车牌类型选中的值
      carPlateTypeList: [],
      carColorValue: [], //车辆颜色选中的值
      carColorList: [],
      plateNo: "", //车牌号码

      bicycleNationValue: [], //骑车人民族选中的值
      bicycleNationList: [],
      bicycleUmbrellaValue: [], //骑车人是否打伞选中的值
      bicycleUmbrellaList: [],
      bicycleCarryGoodsValue: [], //骑车人是否携物
      bicycleCarryGoodsList: [],
      bicycleBagColorValue: [], //骑车人包颜色
      bicycleBagColorList: [],
      bicycleColorValue: [], //骑车人车颜色
      bicycleColorList: [],
      caseUuid: "",
      //人脸的属性
      faceAge: null, //人脸的年龄
      genderList: [], //性别
      maskList: [], //是否戴口罩
      sunGlassesList: [], //是否戴墨镜
      eyeGlassesList: [], //是否戴眼睛
      taskUuid: "", //任务id
      posPoint: "请选择", //测试的
      loading: null, //loading
      isopenStrus: false,
      proptaskUuid: "", //排查的任务ID
      deviceId: "", //当前的点位ID
      invesType: "", //是否默认打开排查页面
      ids: "",
      isactive: null, //当前点击的索引
      pagesNum: 0 //当前总页数
    };
  },
  mixins: [benginend],
  watch: {},
  filters: {
    //时间过滤器
    getDatetime(val) {
      // if(val.offset != undefined){
      // 当前改成把标准时间改成时间搓+目标出现时间毫秒+offset秒数*1000
      if (val.offset == "" || val.offset == null || val.offset == undefined) {
        val.offset = 0;
      }
      let nowplaytime;
      if (val.searchFlag != undefined && val.searchFlag == 2) {
        nowplaytime = 0;
      } else {
        nowplaytime = new Date(val.fileStartTime).getTime();
      }
      let alltime =
        Number(nowplaytime) +
        Number(val.appearTime) +
        Number(val.offset * 1000);
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
      // }
    }
  },
  methods: {
    childByStrus(val) {
      this.isopenStrus = false;
      this.invesType = "";
    },
    ...mapMutations([
      "setzkytargetinfo", //zky赋值
      "setshowzkyinfo", //是否显示zky结构化信息
      "setshowlookImgPic", //查看大图的控制
      "setglststrusInfo",
      "setDxplayerInfo", //传入播放的值
      "setshowStructDxplayer" //是否打开播放器
    ]),
    //播放视频
    playvideo(row, index) {
      this.isactive = index;
      row.playtype = 1;
      this.setDxplayerInfo(row); //给播放器赋值
      this.setshowStructDxplayer(true); //打开播放器
    },
    //从播放组件传入的值播放下一个
    //1表示结构化结果页面
    //2表示排查页面
    childybyprev(val) {
      if (val == 1) {
        if (this.isactive > 0) {
          this.isactive--;
          this.$refs.structDxplayer.playvideo(
            this.retrieveResult[this.isactive]
          );
        } else {
          if (this.currentPage == 1) {
            this.$notify({
              type: "warning",
              message: "已经到了第一个！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.currentPage--;
            this.searchAllStructureResult(2);
          }
        }
      } else if (val == 2) {
        if (this.$refs.videoStrus.isactive > 0) {
          this.$refs.videoStrus.isactive--;
          // let arr = this.$refs.videoStrus.strusList.length[this.$refs.videoStrus.isactive]
          this.$refs.structDxplayer.playvideo(
            this.$refs.videoStrus.strusList[this.$refs.videoStrus.isactive]
          );
        } else {
          if (this.$refs.videoStrus.currentPage == 1) {
            this.$notify({
              type: "warning",
              message: "已经到了第一个！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$refs.videoStrus.currentPage--;
            if (this.$refs.videoStrus.searchType == 1) {
              this.$refs.videoStrus.getSearchZkySize(1, 2);
            } else if (this.$refs.videoStrus.searchType == 2) {
              this.$refs.videoStrus.getTwozkySize(1, 2);
            }
          }
        }
      }
    },
    //从播放组件传入的值播放下一个
    //1表示结构化结果页面
    //2表示排查页面
    childybynext(val) {
      if (val == 1) {
        // 1、先判断当前索引是否比当前后台返回的总条数大
        // 例如：this.isactive == 1(索引)  this.retrieveResult.length == 10
        //如果小，则直接播放下一个
        //否则就先翻页
        if (this.isactive < this.retrieveResult.length - 1) {
          this.isactive++;
          let arr = this.retrieveResult[this.isactive];
          this.$refs.structDxplayer.playvideo(
            this.retrieveResult[this.isactive]
          );
        } else {
          //翻页之前先判断是否是最后一页
          // 则是最后一页，给提示，已经到了最后一页，
          if (this.currentPage >= this.pagesNum) {
            this.$notify({
              type: "warning",
              message: "已经到了最后一个！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            //否则分页++执行后台分页请求，接着播放下一个
            this.currentPage++;
            this.searchAllStructureResult(1);
          }
        }
      } else if (val == 2) {
        if (
          this.$refs.videoStrus.isactive <
          this.$refs.videoStrus.strusList.length - 1
        ) {
          this.$refs.videoStrus.isactive++;
          let arr = this.$refs.videoStrus.strusList[
            this.$refs.videoStrus.isactive
          ];
          this.$refs.structDxplayer.playvideo(
            this.$refs.videoStrus.strusList[this.$refs.videoStrus.isactive]
          );
        } else {
          //翻页之前先判断是否是最后一页
          // 则是最后一页，给提示，已经到了最后一页，
          if (
            this.$refs.videoStrus.currentPage >= this.$refs.videoStrus.pagesNum
          ) {
            this.$notify({
              type: "warning",
              message: "已经到了最后一个！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            //否则分页++执行后台分页请求，接着播放下一个
            this.$refs.videoStrus.currentPage++;
            //searchType == 1表示一次排查 searchType == 2表示二次排查
            if (this.$refs.videoStrus.searchType == 1) {
              this.$refs.videoStrus.getSearchZkySize(1, 1);
            } else if (this.$refs.videoStrus.searchType == 2) {
              this.$refs.videoStrus.getTwozkySize(1, 1);
            }
            // this.searchAllStructureResult(1)
          }
        }
      }
    },
    //排查界面传入过来的播放逻辑
    //val==1表示一次排查、二次排查下一个，2是上一个
    childByPlay(val) {
      //一次排查下一个
      //二次排查下一个
      if (val == 1) {
        this.$refs.videoStrus.isactive = 0;
        this.$refs.structDxplayer.playvideo(
          this.$refs.videoStrus.strusList[this.$refs.videoStrus.isactive]
        );
      } else if (val == 2) {
        this.$refs.videoStrus.isactive =
          this.$refs.videoStrus.strusList.length - 1;
        this.$refs.structDxplayer.playvideo(
          this.$refs.videoStrus.strusList[
            this.$refs.videoStrus.strusList.length - 1
          ]
        );
      }
    },
    getpoints(searchList) {
      let rulept;
      if (searchList.spaceFlag == 1 || searchList.spaceFlag == 2) {
        if (searchList.coordinate == "" || searchList.coordinate == null) {
          let firstOne = searchList.originalCoordinate.split(",");
          rulept =
            "2-2-" +
            (firstOne[0] - 4) +
            "-2-" +
            (firstOne[0] - 4) +
            "-" +
            (firstOne[1] - 4) +
            "-2-" +
            (firstOne[1] - 4) +
            "-2-2";
        } else {
          let firstTwo = searchList.coordinate.split(",");
          searchList.coordinate =
            searchList.coordinate + "," + firstTwo[0] + "," + firstTwo[1];
          rulept = searchList.coordinate.replace(/,/g, "-");
        }
      } else if (searchList.spaceFlag == 3) {
        rulept = searchList.coordinate.replace(/,/g, "-");
      } else if (searchList.spaceFlag == 4) {
        let one = searchList.coordinate.split(",");
        let two = searchList.originalCoordinate.split(",");
        let three = searchList.coordinate;
        let lastone = Math.ceil((two[4] * one[0]) / two[0]);
        let lasttwo = Math.ceil((two[5] * one[0]) / two[0]);
        three = three + "," + lastone + "," + lasttwo;
        let firstTwo = three.split(",");

        let a = 0;
        let b = 0;
        if (Number(firstTwo[0]) > Number(firstTwo[2])) {
          a =
            Number(firstTwo[2]) +
            (Number(firstTwo[0]) - Number(firstTwo[2])) / 2;
        } else {
          a =
            Number(firstTwo[0]) +
            (Number(firstTwo[2]) - Number(firstTwo[0])) / 2;
        }

        if (Number(firstTwo[1]) > Number(firstTwo[3])) {
          b =
            Number(firstTwo[3]) +
            (Number(firstTwo[1]) - Number(firstTwo[3])) / 2;
        } else {
          b =
            Number(firstTwo[1]) +
            (Number(firstTwo[3]) - Number(firstTwo[1])) / 2;
        }
        let postPt = getPos(
          Math.ceil(Number(a)),
          Math.ceil(Number(b)),
          Math.ceil(Number(firstTwo[4])),
          Math.ceil(Number(firstTwo[5]))
        );
        rulept =
          Math.ceil(firstTwo[0]) +
          "-" +
          Math.ceil(firstTwo[1]) +
          "-" +
          Math.ceil(firstTwo[2]) +
          "-" +
          Math.ceil(firstTwo[3]) +
          "-" +
          Math.ceil(a) +
          "-" +
          Math.ceil(b) +
          "-" +
          Math.ceil(firstTwo[4]) +
          "-" +
          Math.ceil(firstTwo[5]) +
          "-" +
          Math.ceil(postPt.ex) +
          "-" +
          Math.ceil(postPt.ey) +
          "-" +
          Math.ceil(firstTwo[4]) +
          "-" +
          Math.ceil(firstTwo[5]) +
          "-" +
          Math.ceil(postPt.fx) +
          "-" +
          Math.ceil(postPt.fy);
      }
      return rulept;
    },

    checkTarget(num) {
      this.isactive = null;
      this.retrieveResult = [];
      this.isoptfor = num;
      if (num == "1") {
        this.getAllPeopleArrtibuteList();
      }
      if (num == "2") {
        this.getAllCarArrtibuteList();
      }
      if (num == "3") {
        this.getAllBicycleArrtibuteList();
      }
      this.clearAllSelectArrtibute();
      this.currentPage = 1;
      this.searchAllStructureResult();
    },
    //结构化结果按钮
    //playtype  1表示播放下一个  2表示播放上一个
    searchAllStructureResult(playtype) {
      if (this.taskUuid != "" && this.regionArea.length > 0) {
        this.taskUuid = "";
        this.posPoint = "";
      }
      this.isactive = null;
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "查询中"
      });
      let data = {
        startTime: this.beginData,
        endTime: this.endData,
        caseUuid: this.caseUuid,
        type: this.isoptfor,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        deviceUuids: this.regionArea.join(","),
        taskUuid: this.taskUuid
      };
      let targetInfo = this.getTypeInfo();
      let datas = Object.assign(data, targetInfo);
      datas = this.$qs.stringify(datas);
      this.$http.post("/vsas/structure/getAllZkyStructure", datas).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.list.length != 0) {
            this.retrieveResult = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
            this.pagesNum = res.data.data.pages;
            if (this.invesType == 1) {
              this.openvideoStrut(this.retrieveResult[0]);
            }
            if (playtype == 1) {
              this.isactive = 0;
              this.$refs.structDxplayer.playvideo(this.retrieveResult[0]);
            } else if (playtype == 2) {
              this.isactive = this.retrieveResult.length - 1;
              this.$refs.structDxplayer.playvideo(
                this.retrieveResult[this.retrieveResult.length - 1]
              );
            }
          } else {
            this.currentPage = 1;
            this.retrieveResult = [];
            this.totalCount = 0;
            this.$notify({
              type: "success",
              message: "查询结果为空",
              position: "bottom-right",
              duration: 2000
            });
          }
          setTimeout(() => {
            this.loading.close();
          }, 200);
        } else {
          this.currentPage = 1;
          this.retrieveResult = [];
          this.totalCount = 0;
          this.$notify({
            type: "warning",
            message: "查询结果失败",
            position: "bottom-right",
            duration: 2000
          });
          setTimeout(() => {
            this.loading.close();
          }, 200);
        }
      });
    },

    // 判断当前是人，骑车人还是车
    getTypeInfo() {
      let data = {};
      if (this.isoptfor == 1) {
        data = {
          sex: this.peopleSexValue[0], //性别  //人骑车人共用
          ethnic: this.bicycleNationValue[0], //民族  //人骑车人共用
          age: this.peopleAgeValue[0], //年龄
          hairStyle: this.hairStyleValue[0], //发型
          coatLength: this.peopleJacketTypeValue[0], //上衣款式
          coatColor: this.peopleJacketColorValue[0], //上衣颜色
          coatPattern: this.peopleJacketGrainValue[0], //上衣纹理
          trousersStyle: this.peopleUnderwearTypeValue[0], //下衣类别
          trousersColor: this.peopleUnderwearColorValue[0], //下衣颜色
          packageStyle: this.peopleBagTypeValue[0] //包款式
        };
      } else if (this.isoptfor == 2) {
        data = {
          plateNo: this.plateNo,
          plateClass: this.carPlateTypeValue[0], //车牌类型
          plateColor: "", //车牌颜色
          vehicleColor: this.carColorValue[0] //车辆颜色     //车和骑车人共用
        };
      } else if (this.isoptfor == 3) {
        data = {
          sex: this.peopleSexValue[0], //性别  //人骑车人共用
          ethnic: this.bicycleNationValue[0], //民族  //人骑车人共用
          age: this.peopleAgeValue[0], //年龄
          hairStyle: this.hairStyleValue[0], //发型
          coatLength: this.peopleJacketTypeValue[0], //上衣款式
          coatColor: this.peopleJacketColorValue[0], //上衣颜色
          coatPattern: this.peopleJacketGrainValue[0], //上衣纹理
          trousersStyle: this.peopleUnderwearTypeValue[0], //下衣类别
          trousersColor: this.peopleUnderwearColorValue[0], //下衣颜色
          packageStyle: this.peopleBagTypeValue[0], //包款式
          packageColor: this.bicycleBagColorValue[0], // 包颜色
          vehicleColor: this.bicycleColorValue[0], //车身颜色
          umbrella: this.bicycleUmbrellaValue[0], // 是否打伞
          accessoryItem: this.bicycleCarryGoodsValue[0] // 是否携物
        };
      } else if (this.isoptfor == 4) {
        data = {
          faceAge: this.faceAge, //年龄
          gender: this.genderList[0], //性别
          mask: this.maskList[0], //是否戴口罩
          sunGlasses: this.sunGlassesList[0], //是否戴墨镜
          eyeGlasses: this.eyeGlassesList[0] //是否戴眼镜
        };
      }
      return data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.searchAllStructureResult();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchAllStructureResult();
    },
    //获取所有人的属性
    getAllPeopleArrtibuteList() {
      let list = [];
      let arr = [
        "sex",
        "age",
        "hairStyle",
        "coatLength",
        "coatColor",
        "coatPattern",
        "trousersStyle",
        "trousersColor",
        "packageStyle"
      ];
      for (let i = 0; i < arr.length; i++) {
        let data = {
          attributeType: 1,
          attributeId: arr[i]
        };
        list.push(
          new Promise((resove, rej) => {
            this.$http
              .get("vsas/structure/getDictionaryZkyList", {
                params: data
              })
              .then(res => {
                //console.log(res);
                resove(res.data.data);
              });
          })
        );
      }
      Promise.all(list).then(response => {
        this.peopleSexList = response[0];
        this.peopleAgeList = response[1];
        this.hairStyleList = response[2];
        this.peopleJacketTypeList = response[3];
        this.peopleJacketColorList = response[4];
        this.peopleJacketGrainList = response[5];
        this.peopleUnderwearTypeList = response[6];
        this.peopleUnderwearColorList = response[7];
        this.peopleBagTypeList = response[8];
      });
    },
    // 获取所有车的属性
    getAllCarArrtibuteList() {
      let list = [];
      let arr = ["plateClass", "vehicleColor"];
      for (let i = 0; i < arr.length; i++) {
        let data = {
          attributeType: 2,
          attributeId: arr[i]
        };
        list.push(
          new Promise((resove, rej) => {
            this.$http
              .get("vsas/structure/getDictionaryZkyList", {
                params: data
              })
              .then(res => {
                resove(res.data.data);
              });
          })
        );
      }
      Promise.all(list).then(response => {
        this.carPlateTypeList = response[0];
        this.carColorList = response[1];
      });
    },

    getAllBicycleArrtibuteList() {
      let list = [];
      let arr = [
        "sex",
        "age",
        "hairStyle",
        "coatLength",
        "coatColor",
        "coatPattern",
        "trousersStyle",
        "trousersColor",
        "packageStyle",
        "ethnic",
        "umbrella",
        "accessoryItem",
        "packageColor",
        "vehicleColor"
      ];
      for (let i = 0; i < arr.length; i++) {
        let data = {
          attributeType: 3,
          attributeId: arr[i]
        };
        list.push(
          new Promise((resove, rej) => {
            this.$http
              .get("vsas/structure/getDictionaryZkyList", {
                params: data
              })
              .then(res => {
                resove(res.data.data);
              });
          })
        );
      }
      Promise.all(list).then(response => {
        this.peopleSexList = response[0];
        this.peopleAgeList = response[1];
        this.hairStyleList = response[2];
        this.peopleJacketTypeList = response[3];
        this.peopleJacketColorList = response[4];
        this.peopleJacketGrainList = response[5];
        this.peopleUnderwearTypeList = response[6];
        this.peopleUnderwearColorList = response[7];
        this.peopleBagTypeList = response[8];
        this.bicycleNationList = response[9];
        this.bicycleUmbrellaList = response[10];
        this.bicycleCarryGoodsList = response[11];
        this.bicycleBagColorList = response[12];
        this.bicycleColorList = response[13];
      });
    },
    //得到当前结构化有多少点位
    getRegionArea(caseUuid) {
      let data = {
        caseUuid: caseUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/allDeviceUuidStruct", data).then(res => {
        this.pointList = res.data.data;
        if (this.$route.query.taskinfo != undefined) {
          this.pointList.forEach(item => {
            if (item.deviceUuid == this.$route.query.taskinfo.deviceId) {
              this.regionArea.push(item.deviceUuid);
            }
          });
        }
      });
    },
    selectRegionArea(val) {
      this.regionArea = val;
    },
    // 选择性别
    selectPeopleSex(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleSexValue = val;
    },
    // 选择年龄
    selectPeopleAge(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleAgeValue = val;
    },
    //选择发型
    selecthairStyle(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.hairStyleValue = val;
    },
    //上衣类型
    selectpeopleJacketType(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleJacketTypeValue = val;
    },
    // 上衣颜色
    selectpeopleJacketColor(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleJacketColorValue = val;
    },
    // 上衣纹理
    selectpeopleJacketGrain(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleJacketGrainValue = val;
    },
    // 下衣类型
    selectpeopleUnderwearType(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleUnderwearTypeValue = val;
    },
    // 下衣颜色
    selectpeopleUnderwearColor(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleUnderwearColorValue = val;
    },
    // 包类型
    selectpeopleBagType(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.peopleBagTypeValue = val;
    },

    //选择车辆类型
    selectCarType(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.carTypeValue = val;
    },
    // 选择车辆颜色
    selectCarColor(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.carColorValue = val;
    },
    // 选择车牌类型
    selectCarPlate(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.carPlateTypeValue = val;
    },
    // 选择骑车人民族
    selectBicycleNation(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.bicycleNationValue = val;
    },
    //骑车人是否打伞
    selectBicycleUmbrella(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.bicycleUmbrellaValue = val;
    },
    // 骑车人是否携物
    selectBicycleCarryGoods(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.bicycleCarryGoodsValue = val;
    },
    // 骑车人包颜色
    selectBicycleBagColor(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.bicycleBagColorValue = val;
    },
    // 骑车人车颜色
    selectBicycleColor(val) {
      if (val.length > 1) {
        val.splice(0, 1);
      }
      this.bicycleColorValue = val;
    },
    // 人脸的属性提取
    selectface(list, type) {
      if (list.length > 1) {
        list.splice(0, 1);
      }
      if (type == "gender") {
        this.genderList = list;
      } else if (type == "mask") {
        this.maskList = list;
      } else if (type == "sunGlasses") {
        this.sunGlassesList = list;
      } else if (type == "eyeGlasses") {
        this.eyeGlassesList = list;
      }
    },
    clearAllSelectArrtibute() {
      this.peopleSexValue = []; //性别  //人骑车人共用
      this.bicycleNationValue = []; //民族  //人骑车人共用
      this.peopleAgeValue = []; //年龄
      this.hairStyleValue = []; //发型
      this.peopleJacketTypeValue = []; //上衣款式
      this.peopleJacketColorValue = []; //上衣颜色
      this.peopleJacketGrainValue = []; //上衣纹理
      this.peopleUnderwearTypeValue = []; //下衣类别
      this.peopleUnderwearColorValue = []; //下衣颜色
      this.peopleBagTypeValue = []; //包款式

      this.plateNo = "";
      this.carPlateTypeValue = []; //车牌类型
      this.carColorValue = []; //车辆颜色     //车和骑车人共用
      this.peopleBagTypeValue = []; //包款式
      this.bicycleBagColorValue = []; // 包颜色
      this.bicycleColorValue = []; //车身颜色
      this.bicycleUmbrellaValue = []; // 是否打伞
      this.bicycleCarryGoodsValue = []; // 是否携物

      this.faceAge = null; //人脸的年龄
      this.genderList = []; //性别
      this.maskList = []; //是否戴口罩
      this.sunGlassesList = []; //是否戴墨镜
      this.eyeGlassesList = []; //是否戴眼睛
    },
    childbySearchImg(row) {
      this.fastSearchResult(row);
    },
    //去重
    removeDuplicats(feature, row) {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正常执行中"
      });
      let data = {
        feature: feature, // 特征
        featureFlag: this.isoptfor, // 特征类型，1：行人，2：车辆，3：骑车人，4：人脸
        caseUuid: this.caseUuid,
        searchType: 0,
        includeThreshold: 0.8, // 比对阈值
        // includeThreshold: 0,
        // deviceUuids: this.deviceList.join(","), // 框选范围传过来的值
        // deviceUuids: row.deviceUuid, // 框选范围传过来的值
        startTime: this.beginData,
        endTime: this.endData
      };

      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/removeDup", data).then(res => {
        this.loading.close();
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "操作成功！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "success",
            message: "操作成功！！",
            position: "bottom-right",
            duration: 3000
          });
        }
        this.currentPage = 1;
        this.searchAllStructureResult();
      });
    },

    //快捷以图搜图
    fastSearchResult(row, type) {
      let uuid;
      if (this.isoptfor == 1) {
        uuid = row.personUuid;
      } else if (this.isoptfor == 2) {
        uuid = row.vehicleUuid;
      } else if (this.isoptfor == 3) {
        uuid = row.bicycleUuid;
      } else if (this.isoptfor == 4) {
        uuid = row.uuid;
      }
      let data = {
        caseUuid: this.caseUuid,
        type: this.isoptfor, //表示人。车。骑车人
        uuid: uuid,
        deviceUuid: row.deviceUuid
      };
      this.$http
        .get("vsas/structure/getFeature", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            let feautrue = res.data.data;
            row.Features = res.data.data;
            sessionStorage.setItem("searchImgObj", JSON.stringify(row));
            let routeData = this.$router.resolve({
              path: "/videoStrucPlat/searchPrint",
              query: {
                menuCode: 704,
                // result: JSON.stringify(row),
                typeFlag: this.isoptfor,
                startTime: this.beginData,
                endTime: this.endData
              }
            });
            if (type == 2) {
              window.open(routeData.href, "_blank");
            } else {
              this.removeDuplicats(res.data.data, row);
            }
          } else {
            this.$notify({
              type: "warning",
              message: "获取特征值失败",
              position: "bottom-right",
              duration: 2000
            });
            return;
          }
        });
    },
    // 查看大图
    lookBigImage(item) {
      this.setzkytargetinfo({});
      this.setshowzkyinfo(false);
      if (this.isoptfor == 4) {
        let data = {
          uuid: item.uuid
        };
        data = this.$qs.stringify(data);
        this.$http
          .post("vsas/structure/getZkyStructureFaceAndTarget", data)
          .then(res => {
              console.log(res)
            //如果查看人脸的大图，先获取是否是人车骑的属性，通过faceZky.type确认一下是否是人车骑
            //再赋值人脸的结构化属性，再赋值时间和类型
            let face = res.data.data.relTarget;
            console.log(face)
            face.facetype = res.data.data.faceZky.type; //'类型；1.人 2.骑车人 3.车辆'
            face.faceObj = res.data.data.faceZky;
            face.faceObj.fileStartTime = res.data.data.relTarget.fileStartTime;
            face.faceObj.startTime = res.data.data.relTarget.fileStartTime;
            face.faceObj.offset = res.data.data.relTarget.offset;
            face.zkytype = 4;
            this.setzkytargetinfo(face);
            this.setshowlookImgPic(true); // 触发大图点击事件
          });
      } else {
        if (this.isoptfor == 1) {
          item.zkytype = 1;
        } else if (this.isoptfor == 2) {
          item.zkytype = 2;
        } else if (this.isoptfor == 3) {
          item.zkytype = 3;
        } else if (this.isoptfor == 4) {
          item.zkytype = 4;
        }
        this.setshowlookImgPic(true); // 触发大图点击事件
        this.setzkytargetinfo(item);
      }
    },
    //打开排查
    openvideoStrut(item) {
      //查找对应点位的对象
      let obj = _.find(this.pointList, function(o) {
        return o.deviceUuid == item.deviceUuid;
      });
      obj.type = obj.cameraType;
      sessionStorage.setItem("deviceInfo", JSON.stringify(obj));
      this.setglststrusInfo({});
      this.proptaskUuid = item.taskUuid;
      this.deviceId = item.deviceUuid;
      this.isopenStrus = true;
    },
    // 下载单张图片
    downloadPic(item) {
      if (item.personUuid) {
        this.ids = item.personUuid;
      } else if (item.vehicleUuid) {
        this.ids = item.vehicleUuid;
      } else if (item.bicycleUuid) {
        this.ids = item.bicycleUuid;
      } else if (item.uuid) {
        this.ids = item.uuid;
      }
      setTimeout(() => {
        document.getElementById("downLoadId").submit();
      }, 200);
    },
    // 转标注
    confimTag(item, type) {
      console.log(item, "转标注的item");
      let targetId = "";
      let typeFlag = "";
      if (item.personUuid != undefined) {
        targetId = item.personUuid;
        typeFlag = 1;
      } else if (item.bicycleUuid != undefined) {
        targetId = item.bicycleUuid;
        typeFlag = 2;
      } else if (item.vehicleUuid != undefined) {
        targetId = item.vehicleUuid;
        typeFlag = 3;
      }
      let data = {
        targetIds: targetId, // 选择 (英文逗号分隔)
        targetType: typeFlag, // 人，车，骑车人
        caseUuid: "",
        suspicionUuid: ""
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/convert/target/to/markImg", data).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "创建标注成功！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "warning",
            message: "创建标注失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // //过滤时间的函数
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
    // 获取当前案件下的所有文件的最小时间和最大时间，并加载时间插件
    getTimeTobe(id) {
      let data = {
        caseUuid: id
      };
      this.$http
        // .get("vsas/structure/getDate", {
        .get("vsas/task/Struct/getStartAndEndTime", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            this.beginData = res.data.data.startTime;
            // this.beginData = this.NowTimes(res.data.data.endTime);
            this.endData = res.data.data.endTime;
            // this.isoptfor = 2
            setTimeout(() => {
              this.OpenTheTime4("#globalbegin", "#globalend");
            }, 100);
            this.searchAllStructureResult();
          } else {
            this.beginData = "";
            this.endData = "";
            setTimeout(() => {
              this.OpenTheTime4("#globalbegin", "#globalend");
            }, 100);
          }
        });
    },
    //获取当前日期时间
    getCurrentDate() {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hours +
        seperator2 +
        minutes +
        seperator2 +
        seconds;
      return currentdate;
    },
    //重置
    clearValue() {
      if (this.$route.query.id) {
        this.$router.push({
          query: merge(
            {},
            {
              menuCode: "702"
            }
          )
        });
      }
      this.getTimeTobe(this.caseUuid);
      this.currentPage = 1;
      this.pageSize = 10;
      this.regionArea = [];
      this.retrieveResult = [];
      this.taskUuid = "";
      this.posPoint = "请选择";
      this.clearAllSelectArrtibute();
    },
    //通过ID获取当前任务的开始时间和结束时间
    getfiles(id) {
      let data = {
        taskUuid: id
      };
      this.$http
        .get("vsas/structure/getDate", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            this.beginData = res.data.data.startTime;
            this.endData = res.data.data.endTime;
          }
        });
    },
    //设置路由里面取出来的区域，和任务id
    showTaskResult(res) {
      this.taskUuid = res.taskinfo.taskUuid;
      this.posPoint = res.taskinfo.cameraName;
    },
    //去任务列表
    goTasklist() {
      if (this.$route.query.id) {
          let flagsearch = 1

          if(this.$route.query.ishome){
              flagsearch = 2
          }
        this.$router.push({
          path: "/videoStrucPlat/taskManage",
          query: { menuCode: 701, flagsearch: flagsearch }
        });
      } else {
        this.$router.push({
          path: "/videoStrucPlat/taskManage",
          query: { menuCode: 701 }
        });
      }
    },
    //确认是从结构化结果进来，还是标注池进来的
    confirmWhereIn() {
      let info = this.$route.query;
      if (info.id != undefined && info.typeFlag != 10) {
        this.getfiles(info.id);
        this.taskUuid = info.id;
        this.posPoint = info.name;
        this.regionArea = [info.did]
        this.searchAllStructureResult();
      }
      //   else if (info.id != undefined && info.typeFlag == 10) {}
      else {
        this.clearValue();
      }
    }
  },
  created(){
      OnExit();
      CloseVodPlayer();
  },
  mounted() {
    this.caseUuid = sessionStorage.getItem("exclusiveCaseUuid");
    this.invesType = this.$route.query.type;
    this.getRegionArea(this.caseUuid);
    this.timeBegin = laydate.render({
      elem: "#timeBegin",
      type: "datetime",
      //min: -90, //90天前
      max: this.getCurrentDate(), //0天后
      btns: ["now", "confirm"],
      trigger: "click",
      done: (value, date, endDate) => {
        this.beginData = value;
        this.timeEnd.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    this.timeEnd = laydate.render({
      elem: "#timeEnd",
      type: "datetime",
      // min: this.searchData.beginDateTime,
      max: 1,
      btns: ["now", "confirm"],
      trigger: "click",
      done: (value, date, endDate) => {
        this.endData = value;
        this.timeBegin.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    this.getAllPeopleArrtibuteList(); // 获取人的数据
    //从路由里面取出参数，如果有，就代表是从任务管理过来的，没有就是第一次进来
    this.confirmWhereIn();

    setTimeout(() => {
      document.title = document.title + ".";
      OnInit();
    }, 1000);
  },
  destroyed() {
    OnExit();
    CloseVodPlayer();
    clearInterval(window.g_interval);
  }
};
</script>


<style scoped>
/* @import "../../assets/css/global.css"; */
@import "../../assets/css/commom.css";
.topInfo {
  position: absolute;
  top: 0.6rem;
}
.mainContent {
  width: 100%;
  position: absolute;
  top: 0.9rem;
  bottom: 0px;
  left: 0px;
}

.el-image {
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
  width: 100%;
  margin: 0.1rem 0.2rem;
  display: flex;
  flex-direction: column;
}
.changButton {
  height: 0.3rem;
  line-height: 0.3rem;
}
.changButton .el-button {
  padding: 0 0.1rem;
  border: 1px solid #133045;
}
.avtive {
  border-radius: 5px 0 5px 5px;
  background: #3d82a6 url("../../assets/images/videoNewImg/btnnormal.png")
    no-repeat center center / 100% 100%;
}
.el-checkbox-group {
  display: inline !important;
}
.searchCondition {
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  margin: 0.1rem 0;
}
.searchCondition_ul {
  display: flex;
}
.searchCondition_ul li {
  margin-left: 10px;
  line-height: 0.3rem;
  height: 0.3rem;
  font-size: 0.14rem;
}
.searchCondition_ul li input {
  height: 0.3rem;
  padding-left: 0.2rem;
}
.searchCondition_ul li .el-button {
  padding: 0 0.15rem;
  height: 0.28rem;
  margin-top: 0.05rem;
}
.arrtibuteCollapseArea {
  border: none;
  width: 100%;
  height: 0.3rem;
}
.arrtibuteCollapseArea .el-collapse-item__header,
.arrtibuteCollapseArea /deep/ .el-collapse-item__header {
  color: #99c9fa;
}
.selectArrtibute {
  padding: 0 0.1rem;
  border: 1px solid #133045;
}
.el-checkbox,
.el-checkbox__input {
  white-space: none !important;
  padding-left: 0 !important;
  padding-right: 0.1rem !important;
}
.searchResultArea {
  width: 100%;
  position: absolute;
  top: 1.3rem;
  bottom: 0px;
  left: 0px;
  font-size: 0.16rem;
}
.searchResultArea_ul {
  width: 98%;
  height: calc(100% - 1rem);
  margin: 0 auto;
  overflow-y: auto;
  border: 1px solid #2d659e;
  padding: 5px;
}
.searchResultArea_ul_li {
  float: left;
  width: 20%;
  height: 50%;
  padding: 5px;
  position: relative;
}
.searchResultArea_ul_li .contentdiv {
  width: 100%;
  height: 100%;
  border: 2px solid #073a76;
  border-radius: 5px;
  background-color: #0b294d;
}
.searchResultArea_ul_li .contentdiv.playactive {
  border: 2px solid #409eff;
}

.topImg {
  width: 100%;
  height: calc(100% - 0.36rem);
}
.imgbox {
  width: 40%;
  height: 90%;
  margin-top: 10px;
  float: left;
  border: 1px solid #073a76;
  margin-left: 5px;
  position: relative;
  background: #021636;
}
.imgbox img {
  width: 100%;
  height: 100%;
}
.imgbox span {
  position: absolute;
  bottom: 0;
  right: 0;
  /* background-color: #409eff; */
  background-color: #f03b50;
  color: #fff;
  font-size: 0.12rem;
  padding: 0.01rem 0.03rem;
  border-radius: 3px;
}

.infos {
  width: calc(100% - 40% - 10px);
  height: 90%;
  margin-top: 10px;
  float: right;
  margin-right: 5px;
  color: #fff;
  padding-left: 0.05rem;
  overflow-y: auto;
}

.btnArea {
  width: 100%;
  height: 0.36rem;
  line-height: 0.36rem;
  margin: 0 auto;
  border-top: 2px solid #073a76;
}
.leftIcon {
  width: 55%;
  height: 0.35rem;
  float: left;
  padding-left: 0.15rem;
  line-height: 0.35rem;
  position: relative;
}
.leftIcon span {
  display: inline-block;
  width: 1.8rem;
  margin-left: 0.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.12rem;
  display: inline-block;
  width: 1.6rem;
  margin-left: 0.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.14rem;
}
.rightIcon {
  width: 45%;
  height: 0.35rem;
  float: left;
}
.el-icon-location {
  font-size: 0.2rem;
  color: #56aaf6;
  position: absolute;
  top: 0.08rem;
}
.rightIcon div {
  float: right;
}

.top {
  width: 100%;
  height: calc(100% - 0.4rem);
  border: 1px solid blue;
}
.left {
  width: 100%;
  line-height: 0.4rem;
  height: 0.4rem;
  border: 1px solid red;
}

.containLeft {
  position: relative;
  width: 1.2rem;
  border: 1px solid #074998;
  height: 80%;
  top: 20px;
  left: 5px;
}
.containLeft img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
}
.containLeft span {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #409eff;
  color: #fff;
  font-size: 0.12rem;
  padding: 0.01rem 0.03rem;
  border-radius: 3px;
}
.containLeft div {
  height: 20px;
  position: absolute;
  bottom: -3px;
  right: 0;
  display: flex;
  justify-content: flex-end;
}
/* .containLeft div p {
} */
.showinfo div {
  margin-top: 10px;
}
.showinfo span {
  font-size: 0.14rem;
}
.containRight {
  float: right;
  width: 2.3rem;
  height: 2rem;
  padding-top: 0.27rem;
  padding-left: 0.09rem;
}
.containRights {
  padding-top: 40px;
  padding-left: 25px;
}
.containRight p {
  display: inline-block;
  width: 1rem;
  height: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.containRight .area {
  width: 100%;
}
.containRight p:last-child {
  width: 1.8rem;
}
.containRights p:first-child {
  width: 1.5rem;
}
.faceright {
  padding-left: 0.2rem;
}
.containRight .others {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tagconvert {
  display: inline-block;
  color: #fff;
  cursor: pointer;
  line-height: 0.2rem;
  text-align: center;
  font-size: 0.16rem;
  bottom: 0.03rem;
  z-index: 2;
  margin-right: 0.1rem;
  margin-top: 0.1rem;
  color: #409eff;
}
.searchPic {
  background: url("../../assets/images/videoNewImg/searchPic.png") no-repeat
    center / 100% 100%;
}
.removeDuplicats {
  background: url("../../assets/images/videoNewImg/transmitPic.png") no-repeat
    center / 100% 100%;
}
.downloadZip {
  background: url("../../assets/images/videoNewImg/downloadZip.png") no-repeat
    center / 100% 100%;
}
.el-select .el-input,
.el-select /deep/ .el-input {
  width: 3.5rem;
  height: 0.3rem;
  max-height: 0.3rem !important;
  overflow: hidden;
}
.el-select .el-tag,
.el-select /deep/ .el-tag {
  /* color: #409eff; */
  color: #99c9fa;
  /* background-color: black; */
  background-color: rgba(255, 255, 255, 0);
}

.el-select .el-tag .el-icon-close,
.el-select /deep/ .el-tag .el-icon-close {
  color: #99c9fa !important;
  background: black !important;
}
.el-select .el-tag,
.el-select .el-tag--info,
.el-select .el-tag--small,
.el-select .el-tag--light,
.el-select /deep/ .el-tag,
.el-select /deep/ .el-tag--info,
.el-select /deep/ .el-tag--small,
.el-select /deep/ .el-tag--light {
  background-color: none !important;
  border: 0;
}

.el-input--prefix .el-input__inner {
  padding-left: 0.3rem;
}
.bigimg {
  background: url("../../assets/images/videoNewImg/lookPic.png") no-repeat
    center / 100% 100%;
}
.troubleshoot {
  background: url("../../assets/images/videoNewImg/troubleshoot.png") no-repeat
    center / 100% 100%;
}
.sysname {
  cursor: pointer;
}

.el-pagination {
  margin-top: 0.1rem;
}
.bicycles {
  width: 100%;
  height: 100%;
  margin-top: 0.1rem;
}
.bicycles li {
  height: 0.2rem;
  width: 49%;
  display: inline-block;
  color: #99c9fa;
 /*  margin-top: 0.04rem; */
  overflow: hidden;
  font-size: 0.14rem;
}
.bicycles li:nth-child(odd) {
  width: 100%;
}
.bicycles li:nth-child(even) {
  width:100%;
}

.bicycles li > span:first-child {
  width: 0.7rem;
  height: 0.2rem;
  float: left;
  color: #99c9fa;
  text-align: justify;
}
.bicycles li:nth-child(odd) > span:first-child {
  width: 0.7rem;
}
.bicycles li:nth-child(even) > span:last-child {
  float: left;
  /* width: calc(100% - 0.7rem); */
  /* text-overflow: ellipsis; */
  overflow: hidden;
  white-space: nowrap;
}

.bicycles li i {
  width: 100%;
  display: inline-block;
}
.bicycles li:last-child {
  width: 100%;
}
.el-select .el-select__tags .el-select__input,
.el-select /deep/ .el-select__tags .el-select__input {
  border-left: none !important;
}
.el-select /deep/ .el-select__tags {
    overflow: hidden;
    flex-wrap: inherit !important;
    max-width: 3rem;
}
.infos .carinfo_div {
  margin-top: 0.6rem;
}

.peoplesdiv p {
  display: inline-block;
  height: 0.2rem;
  width: 100%;
}
.peoplesdiv p > span {
  width: 0.7rem;
  line-height: 0.16rem;
  height: 0.2rem;
  float: left;
  color: #99c9fa;
  text-align: justify;
}
.face_div {
  margin-top: 0.6rem;
}
.face_div p {
  line-height: 0.12rem !important;
}
.face_div p > span {
  width: 0.9rem;
}
.peoplesdiv p i {
  width: 100%;
  display: inline-block;
}
.peoples p {
  color: #99c9fa;
  margin-top: 0.04rem;
  font-size: 0.14rem;
  line-height: 0.15rem;
}
/* .bicyinfo p {
    font-size: 0.14rem;
} */
.fs14 {
  font-size: 0.14rem !important;
}
.searcharea .el-select__input,
.searcharea /deep/ .el-select__input {
  height: 0.28rem;
}
.searcharea .el-select__tags-text,
.searcharea /deep/ .el-select__tags-text {
  font-size: 0.14rem;
    position: relative;
    top: 2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 10;
    width: 100px;
}
.searchResultArea_ul_li:hover .none {
  display: block;
}

.searchResultArea_ul_li .play {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  display: none;
  transform: translate(-50%, -50%);
  background: url("../../assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}
.plant {
  padding-left: 0.1rem;
  font-size: 0.14rem;
}
.timechange span {
  width: 0.5rem !important;
}
.timechange b {
  font-weight: 400;
  width: 1.4rem;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* padding-top: 0.03rem; */
}
.lh12 {
  line-height: 0.12rem;
}
.lh12 b {
  margin-top: 0.02rem !important;
}
.lh18 {
  line-height: 0.18rem;
}


@media (max-width:1440px){
    .peoplesdiv p > span{
       width: .8rem;
    }
    .face_div p > span{
        width: 1rem;
    }
  /*   .bicycles{
        overflow: auto;
    } */
    .bicycles li:nth-child(odd) {
        width: 100%;
    }
    .bicycles li:nth-child(even) {
        width: 100%;
    }
    .timechange span{
        width: .5rem !important;
    }
    .timechange b{
        width: 1.4rem;
    }
     .b{
         position: relative;
         top:2px;
         left:-3px;
     }
  .bicycles li > span:first-child {
    width: 0.9rem;
  }
  .bicycles li:nth-child(odd) > span:first-child {
    width: 0.9rem;
  }
  .bicycles li:last-child {
    width: 100%;
  }
  .selectArrtibute {
    width: 1.2rem;
  }
}
</style>
