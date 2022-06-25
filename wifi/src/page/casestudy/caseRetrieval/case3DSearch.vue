<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案事件研判</router-link>
      <div class="nav-item nav-item-search">特征检索</div>
    </div> -->
     <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
      <p class="sysname">&nbsp;特征检索</p>
    </div>

    <div class="contentBody">
      <div class="contentWrapper">
        <div class="contentWrapperbottom">
          <div style="display: flex;width: 100%;height: calc(100% - 0.54rem)">
            <div class="contentLeft" style="width: 100%;height: 100%;">
              <div class="content">
                <div class="contentTabs">
                  <el-select @change="tabsChange" v-model="tabsValue" placeholder="请选择特征类型">
                    <el-option value="0" label="人员特征"></el-option>
                    <el-option value="1" label="车辆特征"></el-option>
                  </el-select>
                  <!-- <select class="tab_select" @change="tabsChange" v-model="tabsValue">
                    <option value="0">人员特征</option>
                    <option value="1">车辆特征</option>
                  </select> -->
                </div>
                <div class="contentDetialWrapper">
                  <div class="picModel">
                    <div v-if="switchPcitureFlag" style="width: 100%;height: 100%">
                      <div class="picModelTitle">
                        <div
                          style="width: 2px;height: 14px;background-color:#66AFFD;margin-right: 10px;margin-top: 2px"></div>
                        <div style="color:#5BABFF;font-size: 14px">人员特征模型</div>
                      </div>
                      <div class="picModelPicture">
                        <img :src=personImgSrc usemap="#amap" style="width:775px;height:515px"
                             @load="calculatPicture(percent)" alt="" id="personImg">
                        <map name="amap" id="amap">
                          <!-- 额 -->
                          <area class="personArea" shape="poly" coords="184,45,175,51,175,55,205,55,199,46,191,44"
                                href="javascript:void(0)" @click="showMessage($event)" value="4" name="额" type="1">
                          <!-- 眉 -->
                          <area class="personArea" shape="rect" coords="175,62,188,67" href="javascript:void(0)"
                                @click="showMessage($event)" value="5" name="眉" type="1">
                          <area class="personArea" shape="rect" coords="191,62,205,67" href="javascript:void(0)"
                                @click="showMessage($event)" value="5" name="眉" type="1">
                          <!-- 眼 -->
                          <area class="personArea" shape="circle" coords="182,71,4" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="6" name="眼" type="1">
                          <area class="personArea" shape="circle" coords="197,71,4" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="6" name="眼" type="1">
                          <!-- 鼻 -->
                          <area class="personArea" shape="rect" coords="186,62,193,80" href="javascript:void(0)"
                                @click="showMessage($event)" value="7" name="鼻" type="1">
                          <!-- 嘴 -->
                          <area class="personArea" shape="rect" coords="183,84,196,91" href="javascript:void(0)"
                                @click="showMessage($event)" value="8" name="嘴" type="1">
                          <!-- 耳 -->
                          <area class="personArea" shape="rect" coords="167,67,174,83" href="javascript:void(0)"
                                @click="showMessage($event)" value="9" name="耳" type="1">
                          <area class="personArea" shape="rect" coords="207,67,214,83" href="javascript:void(0)"
                                @click="showMessage($event)" value="9" name="耳" type="1">
                          <area class="personArea" shape="rect" coords="545,64,552,80" href="javascript:void(0)"
                                @click="showMessage($event)" value="9" name="耳" type="1">
                          <area class="personArea" shape="rect" coords="587,64,594,80" href="javascript:void(0)"
                                @click="showMessage($event)" value="9" name="耳" type="1">
                          <!-- 脸 -->
                          <area class="personArea" shape="rect" coords="172,40,207,98" href="javascript:void(0)"
                                @click="showMessage($event)" value="2" name="脸" type="1">
                          <!-- 脑 -->
                          <area class="personArea" shape="rect" coords="552,38,588,89" href="javascript:void(0)"
                                @click="showMessage($event)" value="3" name="脑" type="1">
                          <!-- 颈 -->
                          <area class="personArea" shape="rect" coords="171,98,207,110" href="javascript:void(0)"
                                @click="showMessage($event)" value="10" name="颈" type="1">
                          <area class="personArea" shape="rect" coords="551,87,588,101" href="javascript:void(0)"
                                @click="showMessage($event)" value="10" name="颈" type="1">
                          <!-- 肩 -->
                          <area class="personArea" shape="poly" coords="156,119,141,117,127,123,114,140,134,143,139,158"
                                href="javascript:void(0)" @click="showMessage($event)" value="11" name="肩" type="1">
                          <area class="personArea" shape="poly" coords="224,120,241,118,257,129,266,142,247,146,241,160"
                                href="javascript:void(0)" @click="showMessage($event)" value="11" name="肩" type="1">
                          <area class="personArea" shape="poly" coords="541,114,522,115,505,123,495,137,512,143,516,159"
                                href="javascript:void(0)" @click="showMessage($event)" value="11" name="肩" type="1">
                          <area class="personArea" shape="poly" coords="596,114,615,115,629,120,646,138,624,144,621,157"
                                href="javascript:void(0)" @click="showMessage($event)" value="11" name="肩" type="1">
                          <!-- 臂 -->
                          <area class="personArea" shape="poly"
                                coords="114,141,97,155,79,162,63,177,45,189,56,200,78,192,97,180,119,171,141,157,136,143"
                                href="javascript:void(0)" @click="showMessage($event)" value="12" name="臂" type="1">
                          <area class="personArea" shape="poly"
                                coords="244,159,247,146,268,143,284,154,297,159,311,170,336,190,324,201,310,195,295,189,281,180,268,174"
                                href="javascript:void(0)" @click="showMessage($event)" value="12" name="臂" type="1">
                          <area class="personArea" shape="poly"
                                coords="495,137,481,147,470,156,456,161,430,183,439,197,458,191,484,174,503,168,518,156,512,142"
                                href="javascript:void(0)" @click="showMessage($event)" value="12" name="臂" type="1">
                          <area class="personArea" shape="poly"
                                coords="624,143,622,155,634,165,655,175,672,185,686,192,703,199,716,187,700,177,685,165,666,155,645,138"
                                href="javascript:void(0)" @click="showMessage($event)" value="12" name="臂" type="1">
                          <!-- 手 -->
                          <area class="personArea" shape="poly" coords="44,189,56,201,11,243,2,231"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="13" name="手" type="1">
                          <area class="personArea" shape="poly" coords="324,201,336,190,377,232,367,242"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="13" name="手" type="1">
                          <area class="personArea" shape="poly" coords="429,183,380,231,391,244,442,196"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="13" name="手" type="1">
                          <area class="personArea" shape="poly" coords="704,199,716,186,762,230,750,241"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="13" name="手" type="1">
                          <!-- 胸 -->
                          <area class="personArea" shape="poly"
                                coords="155,120,187,124,224,121,242,161,228,187,210,185,204,172,188,168,174,173,165,185,151,189,139,161"
                                href="javascript:void(0)" @click="showMessage($event)" value="14" name="胸" type="1">
                          <!-- 腹 -->
                          <area class="personArea" shape="poly"
                                coords="189,168,204,173,210,185,227,188,227,207,211,225,189,229,167,226,155,207,151,190,165,185,174,172"
                                href="javascript:void(0)" @click="showMessage($event)" value="15" name="腹" type="1">
                          <!-- 腰 -->
                          <area class="personArea" shape="poly"
                                coords="153,204,151,229,168,241,208,242,228,227,225,208,217,219,209,227,190,230,168,228,163,217"
                                href="javascript:void(0)" @click="showMessage($event)" value="16" name="腰" type="1">
                          <area class="personArea" shape="poly"
                                coords="532,215,532,228,549,218,571,228,593,220,608,228,607,208,590,209,569,187,552,208"
                                href="javascript:void(0)" @click="showMessage($event)" value="16" name="腰" type="1">
                          <!-- 胯 -->
                          <area class="personArea" shape="poly"
                                coords="151,228,170,242,207,243,229,229,230,245,204,273,187,283,173,273,148,247"
                                href="javascript:void(0)" @click="showMessage($event)" value="17" name="胯" type="1">
                          <!-- 背 -->
                          <area class="personArea" shape="poly"
                                coords="540,114,569,111,597,116,621,157,616,169,604,195,608,210,587,206,570,187,552,208,531,214,534,195,523,170,519,157"
                                href="javascript:void(0)" @click="showMessage($event)" value="18" name="背" type="1">
                          <!-- 臀 -->
                          <area class="personArea" shape="poly"
                                coords="531,229,549,217,571,230,592,218,610,231,612,244,603,270,590,281,571,283,551,283,539,268,527,247"
                                href="javascript:void(0)" @click="showMessage($event)" value="19" name="臀" type="1">
                          <!-- 腿 -->
                          <area class="personArea" shape="poly" coords="148,249,143,279,141,310,142,346,143,367,136,388,133,406,139,449,153,449,158,434,162,416,
                167,395,166,370,170,349,178,324,186,305,188,282" href="javascript:void(0)" @click="showMessage($event)"
                                value="20" name="腿" type="1">
                          <area class="personArea" shape="poly" coords="190,284,189,285,194,308,204,329,207,347,214,366,212,385,214,406,220,429,227,449,242,449,
                242,433,245,411,245,391,237,362,237,343,239,315,239,291,237,276,231,244" href="javascript:void(0)"
                                @click="showMessage($event)" value="20" name="腿" type="1">
                          <area class="personArea" shape="poly" coords="526,246,538,268,552,283,569,282,563,309,558,321,554,338,550,353,544,367,545,379,547,400,542,416,537,430,533,446,517,447,515,
                432,513,413,513,396,516,382,521,367,522,355,520,330,520,304,520,288,522,266" href="javascript:void(0)"
                                @click="showMessage($event)" value="20" name="腿" type="1">
                          <area class="personArea" shape="poly" coords="611,241,618,275,620,292,619,313,617,340,617,361,621,380,625,399,625,412,623,429,622,445,607,445,601,429,595,416,593,402,592,389,595,
                371,592,358,590,351,586,344,585,331,579,320,574,304,571,283,587,284,603,270" href="javascript:void(0)"
                                @click="showMessage($event)" value="20" name="腿" type="1">
                          <!-- 脚 -->
                          <area class="personArea" shape="poly"
                                coords="138,449,153,449,154,459,154,468,152,480,148,484,128,483,135,472"
                                href="javascript:void(0)" @click="showMessage($event)" value="21" name="脚" type="1">
                          <area class="personArea" shape="poly"
                                coords="226,450,242,449,243,459,243,470,251,482,231,485,225,482,226,466"
                                href="javascript:void(0)" @click="showMessage($event)" value="21" name="脚" type="1">
                          <area class="personArea" shape="poly"
                                coords="516,446,532,447,534,468,534,480,526,485,507,484,512,475,516,465"
                                href="javascript:void(0)" @click="showMessage($event)" value="21" name="脚" type="1">
                          <area class="personArea" shape="poly"
                                coords="605,446,621,446,622,462,624,473,632,483,613,486,605,481,605,465"
                                href="javascript:void(0)" @click="showMessage($event)" value="21" name="脚" type="1">
                          <!-- 人 -->
                          <area class="personArea" shape="rect" coords="3,35,380,488" href="javascript:void(0)"
                                @click="showMessage($event)" value="1" name="人" type="1">
                          <area class="personArea" shape="rect" coords="380,35,766,488" href="javascript:void(0)"
                                @click="showMessage($event)" value="1" name="人" type="1">
                        </map>

                      </div>
                    </div>
                    <div v-if="!switchPcitureFlag" style="width: 100%;height: 100%">
                      <div class="picModelTitle">
                        <div
                          style="width: 2px;height: 14px;background-color:#66AFFD;margin-right: 10px;margin-top: 2px"></div>
                        <div style="color:#5BABFF;font-size: 14px">车辆特征模型</div>
                      </div>
                      <div class="picModelPicture">
                        <img :src=carImgSrc alt="" style="width:641px;height:510px" @load="calculatPicture(percent)"
                             usemap="#bmap" id="carImg">
                        <map name="bmap" id="bmap">
                          <!-- 雨刷器-->
                          <area class="carArea" shape="circle" coords="106,315,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="101" name="雨刷器" type="2">
                          <area class="carArea" shape="circle" coords="447,326,9" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="101" name="雨刷器" type="2">
                          <area class="carArea" shape="rect" coords="413,73,526,89" href="javascript:void(0)"
                                @click="showMessage($event)" value="101" name="雨刷器" type="2">
                          <area class="carArea" shape="rect" coords="108,85,238,102" href="javascript:void(0)"
                                @click="showMessage($event)" value="101" name="雨刷器" type="2">
                          <!-- 车标 -->
                          <area class="carArea" shape="rect" coords="151,148,187,161" href="javascript:void(0)"
                                @click="showMessage($event)" value="102" name="车标" type="2">
                          <area class="carArea" shape="rect" coords="448,88,491,104" href="javascript:void(0)"
                                @click="showMessage($event)" value="102" name="车标" type="2">
                          <!-- 风窗玻璃 -->
                          <area class="carArea" shape="poly" coords="98,52,241,52,263,95,248,97,98,98,79,93"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="103" name="风窗玻璃" type="2">
                          <area class="carArea" shape="poly" coords="396,46,377,82,561,82,545,47"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="103" name="风窗玻璃" type="2">
                          <!-- 前照灯 -->
                          <area class="carArea" shape="circle" coords="72,139,9" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="104" name="前照灯" type="2">
                          <area class="carArea" shape="circle" coords="270,139,9" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="104" name="前照灯" type="2">
                          <!-- 尾灯-->
                          <area class="carArea" shape="rect" coords="365,101,414,119" href="javascript:void(0)"
                                @click="showMessage($event)" value="105" name="尾灯" type="2">
                          <area class="carArea" shape="rect" coords="527,101,576,119" href="javascript:void(0)"
                                @click="showMessage($event)" value="105" name="尾灯" type="2">
                          <area class="carArea" shape="poly" coords="61,329,60,344,100,356,79,332"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="105" name="尾灯" type="2">
                          <!-- 转向灯 -->
                          <!-- 侧车灯 -->
                          <area class="carArea" shape="rect" coords="354,101,365,119" href="javascript:void(0)"
                                @click="showMessage($event)" value="107" name="转向灯" type="2">
                          <area class="carArea" shape="rect" coords="576,101,586,119" href="javascript:void(0)"
                                @click="showMessage($event)" value="107" name="转向灯" type="2">
                          <area class="carArea" shape="circle" coords="569,359,11" href="javascript:void(0)"
                                @click="showMessage($event)" value="107" name="转向灯" type="2">
                          <area class="carArea" shape="rect" coords="51,128,62,145" href="javascript:void(0)"
                                @click="showMessage($event)" value="107" name="转向灯" type="2">
                          <area class="carArea" shape="rect" coords="280,128,293,145" href="javascript:void(0)"
                                @click="showMessage($event)" value="107" name="转向灯" type="2">
                          <!-- 车号牌 -->
                          <area class="carArea" shape="rect" coords="144,169,198,196" href="javascript:void(0)"
                                @click="showMessage($event)" value="108" name="车号牌" type="2">
                          <area class="carArea" shape="rect" coords="442,109,499,137" href="javascript:void(0)"
                                @click="showMessage($event)" value="108" name="车号牌" type="2">
                          <!-- 前雾灯 -->
                          <area class="carArea" shape="circle" coords="277,196,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="109" name="前雾灯" type="2">
                          <area class="carArea" shape="circle" coords="66,196,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="109" name="前雾灯" type="2">
                          <area class="carArea" shape="circle" coords="590,408,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="109" name="前雾灯" type="2">
                          <!-- 后雾灯 -->
                          <area class="carArea" shape="poly" coords="48,386,48,398,70,400" href="javascript:void(0)"
                                @click="showMessage($event)" value="110" name="后雾灯" type="2">
                          <area class="carArea" shape="circle" coords="364,175,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="110" name="后雾灯" type="2">
                          <area class="carArea" shape="circle" coords="577,178,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="110" name="后雾灯" type="2">
                          <!-- 后视镜 -->
                          <area class="carArea" shape="rect" coords="40,75,69,100" href="javascript:void(0)"
                                @click="showMessage($event)" value="111" name="后视镜" type="2">
                          <area class="carArea" shape="rect" coords="274,74,303,100" href="javascript:void(0)"
                                @click="showMessage($event)" value="111" name="后视镜" type="2">
                          <area class="carArea" shape="rect" coords="341,83,370,103" href="javascript:void(0)"
                                @click="showMessage($event)" value="111" name="后视镜" type="2">
                          <area class="carArea" shape="rect" coords="569,83,598,103" href="javascript:void(0)"
                                @click="showMessage($event)" value="111" name="后视镜" type="2">
                          <area class="carArea" shape="rect" coords="382,309,416,335" href="javascript:void(0)"
                                @click="showMessage($event)" value="111" name="后视镜" type="2">
                          <!-- 保险杠 -->
                          <area class="carArea" shape="rect" coords="56,204,290,223" href="javascript:void(0)"
                                @click="showMessage($event)" value="112" name="保险杠" type="2">
                          <area class="carArea" shape="rect" coords="378,170,567,189" href="javascript:void(0)"
                                @click="showMessage($event)" value="112" name="保险杠" type="2">
                          <!-- 发动机舱盖 -->
                          <area class="carArea" shape="poly" coords="86,105,256,104,226,145,220,141,125,142,118,148"
                                href="javascript:void(0)" @click="showMessage($event)" value="113" name="发动机舱盖"
                                type="2">
                          <!-- 前车轮 -->
                          <area class="carArea" shape="poly" coords="42,182,42,235,81,236,82,217,57,217"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="114" name="前车轮" type="2">
                          <area class="carArea" shape="poly" coords="262,239,300,239,300,179,288,221,262,221"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="114" name="前车轮" type="2">
                          <area class="carArea" shape="circle" coords="519,406,38" href="javascript:void(0)"
                                @click="showMessage($event)" value="114" name="前车轮" type="2">
                          <!-- 后车轮 -->
                          <area class="carArea" shape="circle" coords="161,407,37" href="javascript:void(0)"
                                @click="showMessage($event)" value="115" name="后车轮" type="2">
                          <area class="carArea" shape="poly" coords="339,185,342,239,378,239,377,217,356,215"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="115" name="后车轮" type="2">
                          <area class="carArea" shape="poly" coords="564,238,599,237,599,182,586,216,564,217"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="115" name="后车轮" type="2">
                          <!-- 门把手-->
                          <area class="carArea" shape="rect" coords="176,333,214,345" href="javascript:void(0)"
                                @click="showMessage($event)" value="116" name="门把手" type="2">
                          <area class="carArea" shape="rect" coords="311,337,346,351" href="javascript:void(0)"
                                @click="showMessage($event)" value="116" name="门把手" type="2">
                          <!-- 车门 -->
                          <area class="carArea" shape="rect" coords="307,331,446,420" href="javascript:void(0)"
                                @click="showMessage($event)" value="117" name="车门" type="2">
                          <area class="carArea" shape="poly" coords="166,330,299,332,299,420,244,412,210,395,184,362"
                                href="javascript:void(0)" @click="showMessage($event)" value="117" name="车门" type="2">
                          <!-- 车窗 -->
                          <area class="carArea" shape="poly" coords="167,309,213,323,207,289" href="javascript:void(0)"
                                @click="showMessage($event)" value="118" name="车窗" type="2">
                          <area class="carArea" shape="poly" coords="210,288,215,321,300,324,291,279,238,281"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="118" name="车窗" type="2">
                          <area class="carArea" shape="poly" coords="296,280,306,325,421,329,365,287"
                                href="javascript:void(0)"
                                @click="showMessage($event)" value="118" name="车窗" type="2">
                          <!-- 天窗/车顶 -->
                          <area class="carArea" shape="rect" coords="102,38,241,49" href="javascript:void(0)"
                                @click="showMessage($event)" value="119" name="天窗/车顶" type="2">
                          <area class="carArea" shape="rect" coords="404,34,542,46" href="javascript:void(0)"
                                @click="showMessage($event)" value="119" name="天窗/车顶" type="2">
                          <area class="carArea" shape="rect" coords="190,269,366,280" href="javascript:void(0)"
                                @click="showMessage($event)" value="119" name="天窗/车顶" type="2">
                          <!-- 行李盖 -->
                          <area class="carArea" shape="rect" coords="383,87,562,155" href="javascript:void(0)"
                                @click="showMessage($event)" value="120" name="行李盖" type="2">
                          <!-- 油箱盖 -->
                          <area class="carArea" shape="circle" coords="130,351,9" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="121" name="油箱盖" type="2">
                          <!-- 排气孔 -->
                          <area class="carArea" shape="circle" coords="387,204,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="122" name="排气孔" type="2">
                          <area class="carArea" shape="circle" coords="551,204,8" href="javascript:void(0)"
                                @click="showMessage($event)"
                                value="122" name="排气孔" type="2">
                          <!-- 翼子板 -->
                          <area class="carArea" shape="rect" coords="566,376,601,397" href="javascript:void(0)"
                                @click="showMessage($event)" value="123" name="翼子板" type="2">
                          <area class="carArea" shape="rect" coords="44,363,98,379" href="javascript:void(0)"
                                @click="showMessage($event)" value="123" name="翼子板" type="2">
                          <!-- 车身 -->
                          <area class="carArea" shape="rect" coords="37,30,311,249" href="javascript:void(0)"
                                @click="showMessage($event)" value="124" name="车身" type="2">
                          <area class="carArea" shape="rect" coords="336,30,613,249" href="javascript:void(0)"
                                @click="showMessage($event)" value="124" name="车身" type="2">
                          <area class="carArea" shape="rect" coords="38,264,623,470" href="javascript:void(0)"
                                @click="showMessage($event)" value="124" name="车身" type="2">
                        </map>
                      </div>
                    </div>
                  </div>
                  <div class="modelPart">
                    <div class="modelPartTitle">
                      <div
                        style="width: 2px;height: 14px;background-color:#66AFFD;margin-right: 10px;margin-top: 2px"></div>
                      <div style="color:#5BABFF;font-size: 14px">特征部位选择</div>
                    </div>
                    <div class="modelPartCondition">
                      <div class="conditionChoose">
                        <div class="chooseItem1"><span>选择部位: &nbsp;</span><input v-model="partName" type="text"></div>
                        <div class="chooseItem2">
                          <span>描述说明 :&nbsp; </span>
                          <el-select ref="partDescription" v-model="aaaa" @change="getSearchData()" placeholder="请选择描述说明">
                            <el-option v-for="(item,index) in descriptionList" :value="item.threeDataId" :key="index" :label="item.description"></el-option>
                          </el-select>
                          <!-- <select ref="partDescription" @change="getSearchData()" >
                            <option value=''>请选择</option>
                            <option v-for="(item,index) in descriptionList" :value="item.threeDataId" >
                              {{item.description}}
                            </option>
                          </select> -->
                        </div>
                      </div>
                      <div class="conditionList">


                        <el-table :data="tableDataList" height="3rem" border style="width: 100%" class="tables">
                          <!-- <div slot="empty">
                            <div class="noImg">
                              <img src="../../../assets/updataImg/NoData.png" />
                            </div>
                          </div> -->
                          <el-table-column show-overflow-tooltip type="index" label="序号" width="80">
                          </el-table-column>
                          <el-table-column show-overflow-tooltip prop="partName" label="部位" width="180">
                          </el-table-column>
                          <el-table-column prop="decription" label="描述">
                          </el-table-column>
                          <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                              <div class="el-icon-delete delBtn" @click="deletCell(scope.row)"></div>
                            </template>
                          </el-table-column>
                        </el-table>
                        <!-- <table>
                          <thead>
                          <tr>
                            <th>序号</th>
                            <th>部位</th>
                            <th>描述</th>
                            <th>操作</th>
                          </tr>
                          </thead>
                          <tr v-for="(item,index) in tableDataList">
                            <td>{{index+1}}</td>
                            <td v-text="item.partName"></td>
                            <td v-text="item.decription"></td>
                            <td>
                              <div class="iconWrapper">
                                <div class="el-icon-delete" @click="deletCell(index)"></div>
                              </div>
                            </td>
                          </tr>
                        </table> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="contentBottom">
            <div class="btnBack cancleBtn"  @click="goBack()">返 回</div>
            <div class="btnSearch passBtn" @click="searchCase()">搜 索</div>
          </div>
        </div>
      </div>
      <footer_case></footer_case>
    </div>
  </div>
</template>

<script>
  import Footer_case from "../../../components/footer_case";
  export default {
    components: { Footer_case },
    data() {
      return {
        switchPcitureFlag: true,
        tabsValue: '0',
        partName: '',
        percent: 0.8,
        personImgFlag: true,
        carImgFlag: true,
        personImgSrc: "../../../../static/images/case3D/3Dperson.png" + "?" + "t" + "=" + Math.random(),
        carImgSrc: "../../../../static/images/case3D/car.jpg" + "?" + "t" + "=" + Math.random(),
        descriptionList: [],
        positionId: '',
        oldPositionId: '',
        threeDataId: '',
        tableDataList: [],
        tableListFlag: true,
        aaaa:''
      }
    },
    created() {
      let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
      let percent = deviceWidth / 1920;
      this.percent = percent;
    },
    mounted() {

    },
    methods: {
      tabsChange() {
        if (this.tabsValue == 0) {
          this.switchPcitureFlag = true
        } else {
          this.switchPcitureFlag = false
        }
      },

//自适应时改变图片
      calculatPicture(per) {
        if (this.switchPcitureFlag) {
          let personImg = $("#personImg");
          if (this.personImgFlag) {
            this.personImgWidth = personImg.width();
            this.personImgHeight = personImg.height();
            this.personImgFlag = false
          }
          personImg.css({width: this.personImgWidth * per});
          personImg.css({height: this.personImgHeight * per});
          let area = $('.personArea');
          for (let i = 0; i < area.length; i++) {
            let coordsArr = $(area[i]).attr('coords').split(',');
            let newCoordsArr = [];
            let newCoords = '';
            for (let j = 0; j < coordsArr.length; j++) {
              newCoordsArr.push(coordsArr[j] * per)
            }
            newCoords = newCoordsArr.join(',');
            $(area[i]).attr('coords', newCoords)
          }
        } else {
          let carImg = $("#carImg");
          if (this.carImgFlag) {
            if (carImg.length == 1) {
              this.carImgWidth = carImg.width();
              this.carImgHeight = carImg.height();
              this.carImgFlag = false
            }
          }
          if (carImg.length == 1) {
            carImg.css({width: this.carImgWidth * per});
            carImg.css({height: this.carImgHeight * per});
            let area = $('.carArea');
            for (let i = 0; i < area.length; i++) {
              let coordsArr = $(area[i]).attr('coords').split(',');
              let newCoordsArr = [];
              let newCoords = '';
              for (let j = 0; j < coordsArr.length; j++) {
                newCoordsArr.push(coordsArr[j] * per)
              }
              newCoords = newCoordsArr.join(',');
              $(area[i]).attr('coords', newCoords)
            }
          }
        }
      },

      showMessage(event) {
        var positionId = $(event.srcElement).attr('value');
        this.positionId = positionId;
        var name = $(event.srcElement).attr('name');
        this.partName = name;
        this.getPartMessage(positionId)
      },
// 获取特征检索部位信息

      getPartMessage(positionId) {
        this.$http({
          url: 'sms/static/loadThreeByPosition',
          method: 'get',
          params: {
            positionId: positionId
          }
        }).then(res => {
          if (res.statusText === 'OK' && res.data.code === 200) {
            this.descriptionList = res.data.data;
            this.$refs.partDescription.value = "";
          }else{
             this.$notify({
                type: 'error',
                message: '获取特征检索部位列表失败！',
                position: 'bottom-right',
                duration: 3000
              });
            // layer.alert("获取特征检索部位列表失败！",{icon:5,title:"消息提示"});
          }
        })
      },

//获取搜索条件列表
      getSearchData() {
        var obj = {};
        obj = this.descriptionList.find((item)=>{
          return item.threeDataId === this.aaaa
        });
        let positionId = this.positionId;
        let partName = this.partName;
        let decription = obj.description;
        if(decription === "请选择"){
          return false;
        }
        for (let i = 0; i < this.tableDataList.length; i++) {
          if (positionId == this.tableDataList[i].positionId) {
            if (decription != this.tableDataList[i].decription) {
              this.tableDataList[i].decription = decription;
              return
            } else {
              return
            }
          }

        }
        let tableData = {partName: partName, decription: decription, positionId: positionId};
        this.tableDataList.push(tableData)

      },

//删除条件

      deletCell(index) {
        this.tableDataList.splice(index, 1)
      },

//搜索
      searchCase(){
        let tableList =  this.tableDataList;
        let keywordList=[];
        for(let i=0;i<tableList.length;i++){
          keywordList.push({positionName:tableList[i].partName,valueCustom:tableList[i].decription})
        }
        let keywords=JSON.stringify( keywordList );
        sessionStorage.removeItem("3Dkeywords");
        sessionStorage.setItem('3Dkeywords',keywords);
         this.$router.push({
          path: '/casestudy/case3DSearchResult?meunCode=208',
        })
        // this.$router.push('/casestudy/case3DSearchResult?meunCode=208');
      },
//返回
      goBack(){
        this.$router.push("/casestudy?menuCode=200")
      }
    }
  }
</script>


<style scoped>
@import "../../../assets/css/commom.css";
select {
  width: 69%;
  height: 28px;
  border: 1px solid #e6e8ed;
  padding-left: 5px;
}
textarea {
  border: 1px solid #e6e8ed;
  resize: none;
  padding: 4px;
}
input {
  width: 70%;
  height: 28px;
  border: 1px solid #e6e8ed;
  padding-left: 5px;
}

input:focus,
textarea:focus {
  border: 1px solid #409eff;
}

.wrapper {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /*user-select: none;*/
  overflow: hidden;
}
.contentBody {
  width: 100%;
  height: calc(100vh - 1.2rem);
  display: flex;
  flex-direction: column;
}

.contentTitle input {
  width: 35%;
  background-color: white;
  height: 36px;
}

.contentWrapper {
  width: calc(100% - 32px);
  height: calc(100% - 10px - 60px);
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
  border: 1px solid RGB(12, 68, 135);
  display: flex;
  flex-direction: column;
}

.contentWrapperbottom {
  width: calc(100% - 0px);
  height: calc(100% - 0px);
  display: flex;
  flex-direction: column;
}

.contentWrapperTop span {
  font-size: 12px;
  color: white;
  background-color: #fe8a01;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px 4px 10px;
  border-radius: 3px;
}

.contentWrapperTop p {
  margin-left: 5px;
  margin-top: 2px;
  cursor: pointer;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.contentTabs {
  width: 100%;
  height: 0.54rem;
  border: 1px solid rgba(15, 64, 152, 0.8);
  background-color: rgba(16, 35, 56, 0.5);
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 15px;
}
.contentTabs >>> .el-input__inner {
  height: 0.4rem;
  font-size: 0.14rem;
}

.tabsItem {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  height: 26px;
  color: #7a7c86;
  padding: 5px 5px 5px 5px;
}

.searchCondition div {
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #808285;
  cursor: pointer;
}

.contentDetialWrapper {
  height: calc(100% - 0.54rem);
  width: 100%;
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 20px;
}

.picModel {
  width: 50%;
  height: 100%;
  margin-right: 5px;
}

.picModelTitle {
  width: 100%;
  height: 0.35rem;
  display: flex;
}

.picModelPicture {
  width: 100%;
  height: calc(100% - 0.5rem);
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modelPart {
  width: 50%;
  height: 100%;
  margin-left: 5px;
}

.modelPartTitle {
  width: 100%;
  height: 0.35rem;
  display: flex;
}

.modelPartCondition {
  width: 100%;
  height: calc(100% - 0.5rem);
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
}

.detailItem ul {
  padding: 4%;
  width: 100%;
  height: 100%;
}

.detailItem ul li {
  width: 100%;
  margin-bottom: -1%;
}

.contentBottom {
  width: 100%;
  height: 0.54rem;
  border: 1px solid rgba(15, 64, 152, 0.8);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btnBack {
  width: 1rem;
  height: 0.36rem;
  background-color: #e6a23c;
  margin-right: 2.5%;
  border-radius: 3px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.14rem;
}

.btnSearch {
  width: 1rem;
  height: 0.36rem;
  background-color: #409eff;
  margin-right: 2.5%;
  border-radius: 3px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.14rem;
}

.contentTabs /deep/ .el-radio + .el-radio {
  margin-left: 0;
}

.textPictureItemTxt div {
  display: flex;
}

.tab_select {
  width: 2rem;
  border: 1px solid #ececeb;
  height: 0.27rem;
  margin-left: 10px;
  color: #7b7d80;
}

table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  font-size: 14px;
  color: #606266;
  -webkit-border-horizontal-spacing: 0px;
  -webkit-border-vertical-spacing: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-color: #dcdfe3;
}

thead {
  border: 1px solid #dcdfe3;
  color: #909399;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  width: 100%;
}

tr:hover {
  background-color: #ecf5ff;
}

td {
  border: 1px solid #e8eaee;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 30px;
}

th {
  display: table-cell;
  border-right: 1px solid #ebeef5;
  white-space: nowrap;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 8px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  background-color: #eef2f5;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #767778;
}

tr:nth-child(odd) {
  /*background-color: #F6F8F9;*/
  background-color: white;
}

tr:nth-child(even) {
  background-color: white;
}

.conditionChoose {
  width: 100%;
  height: 0.5rem;
  display: flex;
}

.chooseItem1 {
  width: 50%;
  display: flex;
  justify-content: flex-start;
}

.chooseItem2 {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

.chooseItem1 span {
  color: #99c9fa;
  margin-top: 3px;
}

.chooseItem2 span {
  color: #99c9fa;
  margin-top: 3px;
}

.chooseItem2 >>> .el-input__inner {
  height: 28px;
}

.el-icon-delete {
  font-size: 18px;
  background-color: #f56c6c;
  padding: 2px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.picModelPicture area {
  outline: 1px solid #409eff !important;
  z-index: 99;
}
</style>
