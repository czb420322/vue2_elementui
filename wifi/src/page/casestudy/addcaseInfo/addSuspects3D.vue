<template>
  <div class="wrapper">
    <div class="contentBody">
        <div class="contentWrapperbottom">
          <div style="display: flex;width: 100%;height: calc(100% - 0.54rem)">
            <div class="contentLeft" style="width: 100%;height: 100%;">
              <div class="content">
                <div class="contentDetialWrapper">
                  <div class="picModel">
                    <div v-if="switchPcitureFlag" style="width: 100%;height: 100%">
                      <div class="picModelTitle">
                        <div
                          style="width: 2px;height: 14px;background-color:#fff;margin-right: 10px;margin-top: 5px"></div>
                        <div style="color:#fff;font-size: 14px">人员特征模型</div>
                      </div>
                      <div class="picModelPicture">
                        <img :src=personImgSrc usemap="#amap"
                             @load="calculatPicture(percent)" alt="" id="personImg">
                        <map :name="suspicionSee ? '' : 'amap'" id="amap">
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
                                @click="showMessage($event)" value="3" name="脑 " type="1">
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
                    <div v-show="!switchPcitureFlag" style="width: 100%;height: 100%">
                      <div class="picModelTitle">
                        <div
                          style="width: 2px;height: 14px;background-color:#66AFFD;margin-right: 10px;margin-top: 2px"></div>
                        <div style="color:#5BABFF;font-size: 14px">车辆特征模型</div>
                      </div>
                      <div class="picModelPicture">
                        <img :src=carImgSrc alt="" @load="calculatPicture(percent)"
                             usemap="#bmap" id="carImg">
                        <map :name="suspicionSee ? '' : 'bmap'" id="bmap">
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
                        style="width: 2px;height: 14px;background-color:#fff;margin-right: 10px;margin-top: 5px"></div>
                      <div style="color:#fff;font-size: 14px">{{ suspicionSee? '特征部位查看':'特征部位选择' }}</div>
                    </div>
                    <div class="modelPartCondition">
                      <div class="conditionChoose">
                        <div class="chooseItem1" v-show='!suspicionSee'><span>选择部位: &nbsp;</span><input readonly v-model="partName" type="text"></div>
                        <div class="chooseItem2" v-show='!suspicionSee'>
                          <span>描述说明 :&nbsp; </span>
                          <el-select ref="partDescription" @change="getSearchData()" v-model="partDescriptionText" >
                            <el-option v-for="(item,index) in descriptionList" :value="item.threeDataId" :label="item.description" :key="index">
                              <!-- {{item.description}} -->
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="conditionList">
                        <!-- <el-table
                            :data="tableDataList" border  style="width: 100%"
                              class="tables"  height="3rem" >
                            <el-table-column
                              show-overflow-tooltip
                              type="index"
                              width="80"
                              label="序号">
                            </el-table-column>
                            <el-table-column
                              prop="positionName"
                              label="部位">
                            </el-table-column>
                            <el-table-column
                              prop="valueCustom"
                              label="描述">
                            </el-table-column>
                            <el-table-column
                              prop="handlerTime"
                              label="操作">
                               <template slot-scope="scope">
                                    <div class="iconWrapper"  v-show="!suspicionSee">
                                      <div class="el-icon-delete" @click="deletCell( scope.row.suspicionThreeId)"></div>
                                    </div>
                                </template>
                            </el-table-column>
                          </el-table> -->
                        <table>
                          <thead>
                          <tr>
                            <th>序号</th>
                            <th>部位</th>
                            <th>描述</th>
                            <th v-show="!suspicionSee">操作</th>
                          </tr>
                          </thead>
                          <tr v-for="(item,index) in tableDataList" :key="index">
                            <td>{{index+1}}</td>
                            <td v-text="item.positionName"></td>
                            <td v-text="item.valueCustom"></td>
                            <td v-show="!suspicionSee">
                              <div class="iconWrapper">
                                <div class="el-icon-delete" @click="deletCell(item.suspicionThreeId)"></div>
                              </div>
                            </td>
                          </tr>
                        </table>
                         <!-- <p style="text-align: center;width:100%; margin-top:0.1rem;" v-show="!tableDataList.length">暂无数据</p> -->
                         <div slot="empty" v-show="!tableDataList.length">
                          <div class="noImg">
                            <img src="../../../assets/updataImg/NoData.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
  </div>

</template>

<script>
  export default {

    components: {},
    data() {
      return {
        switchPcitureFlag: true,
        tabsValue: 0,
        partName: '',
        percent: 0.8,
        personImgFlag: true,
        carImgFlag: true,
        personImgSrc: "../../../../static/images/case3D/3Dperson.png" + "?" + "t" + "=" + Math.random(),
        carImgSrc: "../../../../static/images/case3D/car.jpg" + "?" + "t" + "=" + Math.random(),
        descriptionList: [],
        oldPositionId: '',
        threeDataId: '',
        tableDataList: [],
        tableListFlag: true,
        positionName:'',//部位名称
        decription:'',//部位描述
        positionId: '', //部位ID
        partDescriptionText:'',

      }
    },
    created() {
      if(this.Suspects3DType == 1){
        this.switchPcitureFlag = true
      }else{
        this.switchPcitureFlag = false
      }
      let deviceWidth = document.documentElement.clientWidth || window.innerWidth
      let percent = deviceWidth / 1920;
      this.percent = percent;
      this.ajaxDataList()
    },
    props:['suspicionUuid','suspicionSee','Suspects3DType'],
    watch:{
      partName(newval,oldval){
        if(newval){
          this.partDescriptionText=''
        }
      }
    },
    methods: {

//自适应时改变图片
      calculatPicture(per) {
        if (this.switchPcitureFlag) {
          let personImg = $("#personImg");
          if (this.personImgFlag) {
            this.personImgWidth = personImg.width()
            this.personImgHeight = personImg.height()
            this.personImgFlag = false
          }
          personImg.css({width: this.personImgWidth * per});
          personImg.css({height: this.personImgHeight * per});
          let area = $('.personArea')
          for (let i = 0; i < area.length; i++) {
            let coordsArr = $(area[i]).attr('coords').split(',')
            let newCoordsArr = [];
            let newCoords = ''
            for (let j = 0; j < coordsArr.length; j++) {
              newCoordsArr.push(coordsArr[j] * per)
            }
            newCoords = newCoordsArr.join(',')
            $(area[i]).attr('coords', newCoords)
          }
        } else {
          let carImg = $("#carImg");
          if (this.carImgFlag) {
            if (carImg.length == 1) {
              this.carImgWidth = carImg.width()
              this.carImgHeight = carImg.height()
              this.carImgFlag = false
            }
          }
          if (carImg.length == 1) {
            carImg.css({width: this.carImgWidth * per});
            carImg.css({height: this.carImgHeight * per});
            let area = $('.carArea')
            for (let i = 0; i < area.length; i++) {
              let coordsArr = $(area[i]).attr('coords').split(',')
              let newCoordsArr = [];
              let newCoords = ''
              for (let j = 0; j < coordsArr.length; j++) {
                newCoordsArr.push(coordsArr[j] * per)
              }
              newCoords = newCoordsArr.join(',')
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
            positionId: positionId,
          }
        }).then(res => {
          if (res.statusText === 'OK' && res.data.code === 200) {
            this.descriptionList = res.data.data
          }
        })
      },

//获取搜索条件列表
      getSearchData() {
        let positionId = this.positionId;
        let partName = this.partName;
        // let selectedIndex = this.$refs.partDescription.selectedIndex
        // console.log(this.$refs.partDescription)
        // console.log(this.$refs.partDescription.options)
        let decription = this.partDescriptionText
        this.descriptionList.map((item,index)=>{
            if(item.threeDataId==decription){
              this.decription=item.description
            }
        })
        // for (let i = 0; i < this.tableDataList.length; i++) {
        //   if (positionId == this.tableDataList[i].positionId) {
        //     if (decription != this.tableDataList[i].decription) {
        //       this.tableDataList[i].decription = decription;
        //       return
        //     } else {
        //       return
        //     }
        //   }

        // }
        let tableData = {partName: partName, decription: decription, positionId: positionId}
        this.positionName = tableData.partName;
        // this.decription = tableData.decription;
        this.positionId = tableData.positionId;
        this.ajaxSuspects3D()


        // this.tableDataList.push(tableData)

      },

    //查询嫌疑人特征信息
    ajaxDataList(){
      let data = {
        suspicionUuid:this.suspicionUuid,
      }
      this.$http.get('/pca/casemng/suspicion/three/query',{params:data})
      .then((res) => {

        this.tableDataList = []
        var obj1 ={}
        var obj2 ={}
        if(this.tabsValue == 0){
          for(let i = 0; i < res.data.data.length; i++){
            if(res.data.data[i].type == 0){
              obj1 = {
                positionName:res.data.data[i].positionName,
                valueCustom:res.data.data[i].valueCustom,
                suspicionThreeId:res.data.data[i].suspicionThreeId,
              }
              this.tableDataList.push(obj1)
            }
          }
        }
        if(this.tabsValue == 1){
           for(let i = 0; i < res.data.data.length; i++){
            if(res.data.data[i].type == 1){
              obj2 = {
                positionName:res.data.data[i].positionName,
                valueCustom:res.data.data[i].valueCustom,
                suspicionThreeId:res.data.data[i].suspicionThreeId,
              }
              this.tableDataList.push(obj2)
            }
          }
        }
      })
    },

    //提交嫌疑人特征信息
    ajaxSuspects3D(){
      let data =  {
        positionName:this.positionName,//部位名称
        suspicionId:this.suspicionUuid,//嫌疑人ID
        threeDataId:this.positionId,//部位ID
        type:this.tabsValue,//特征属性类型
        valueCustom:this.decription,
      }
      data = this.$qs.stringify(data);
      this.$http.post('/pca/casemng/suspicion/three/add',data)
      .then((response) => {
        this.ajaxDataList()
      })
      .catch((error) =>{
      });
    },

    //删除条件
      deletCell(id) {
        let data =  {
          suspicionThreeUuid:id,
        }
        // data = this.$qs.stringify(data);
        this.$http.get('/pca/casemng/suspicion/three/del',{params:data})
        .then((res) => {
          this.partDescriptionText = ''
          this.ajaxDataList();
        })
        .catch((err) =>{
        });
      },
    }
  }
</script>


<style scoped>

  input {
    width: 50%;
    height: 0.28rem;
    border: 1px solid #303338;
    padding-left: 5px;
    background:rgba(0,0,0,0.2);
    color:#99c9fa
  }

  /* input:focus {
    border: 1px solid #409EFF;
  } */

  .wrapper {
    width: 100%;
    height: calc(100% - 0.6rem);
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    /* background-color: #FFFFFF; */
  }

  .topNav {
    height: 0.54rem;
    background-color: #FFFFFF;
    width: 100%;
    border-bottom: 2px solid #E2E3E3;
  }

  .footer {
    width: 100%;
    height: 60px;
    padding-top: 0.1rem;
    font-size: 0.14rem;
    line-height: 1.5;
    color: #909399;
    text-align: center;
  }

  .footer img {
    margin-right: 0.05rem;
  }

  .nav-item {
    display: inline-block;
    height: 0.54rem;
    width: 140px;
    line-height: 0.54rem;
    text-align: center;
    font-size: 18px;
  }

  .nav-item-search {
    height: 100%;
    width: 168px;
    background: url(../../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
  }

  .contentBody {
    width: 100%;
    height: calc(100% - 0.54rem);
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
    border: 1px solid #E9EBEF;
    display: flex;
    flex-direction: column;
  }

  .contentWrapperbottom {
    width: calc(100% - 32px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;
  }

  .contentWrapperTop span {
    font-size: 12px;
    color: white;
    background-color: #FE8A01;
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
    border: 1px solid #2e6bac;
    display: flex;
    flex-direction: column;
    position: relative;
  }


  .tabsItem {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    height: 26px;
    color: #7A7C86;
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
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .picModel {
    width: 65%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(16, 35, 56, 0.5);
  }

  .modelPart {
    width: 35%;
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
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
     background-color: rgba(16, 35, 56, 0.5);
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
    background-color: #FAF9F5;
    border: 1px solid #EDEFF2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .btnBack {
    width: 1rem;
    height: 0.36rem;
    background-color: #E6A23C;
    margin-right: 3.5%;
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
  }

  .btnSearch {
    width: 1rem;
    height: 0.36rem;
    background-color: #409EFF;
    margin-right: 3.5%;
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
  }

  .nav-item {
    display: inline-block;
    height: 0.54rem;
    width: 140px;
    line-height: 0.54rem;
    text-align: center;
    font-size: 18px;
  }

  .nav-item-search {
    height: 100%;
    width: 154px;
    background: url(../../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
    margin-left: -14px;
  }

  .contentTabs /deep/ .el-radio + .el-radio {
    margin-left: 0;
  }

  .textPictureItemTxt div {
    display: flex;

  }

  .tab_select {
    width: 2rem;
    border: 1px solid #ECECEB;
    height: 0.27rem;
    margin-left: 10px;
    color: #7B7D80;
  }

  .conditionList{
      height: 4rem;
      overflow-y: auto;
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
    border-color: #DCDFE3;
    color: #99c9fa;
  }

  thead {
    border: 1px solid #0c2e56;
    color: #909399;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    width: 100%;
  }

  tr:hover {
    background-color: #ECF5FF;
  }

  td {
    border: 1px solid #0c2e56 ;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 30px;
    color: #99c9fa;
  }

  th {
    display: table-cell;
    border-right: 1px solid #0c2e56;
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
    background-color: #0c2644;
    text-align: center;
    font-size: 14px;
    color: #99c9fa ;
  }

  tr:nth-child(odd) {
    /*background-color: #F6F8F9;*/
    background-color: rgba(24, 39, 59, 0.5);
  }

  tr:nth-child(even) {
    background-color:transparent;
  }
  tr:hover {
    background-color: rgba(24, 39, 59, 0.5);
    cursor: pointer;
  }
  .noImg{
    margin: auto;
    margin-top: 0.2rem;
  }

  .conditionChoose {
    width: 100%;
    height: 0.5rem;
    display: flex;
  }

  .chooseItem1 {
    width: 35%;
    display: flex;
    justify-content: flex-start;
  }

  .chooseItem2 {
    width: 65%;
    display: flex;
    justify-content: flex-end;
  }

  .chooseItem1 span {
    color: #99c9fa ;
    margin-top: 3px;
  }

  .chooseItem2 span {
    color: #99c9fa ;
    margin-top: 3px;
  }

  .chooseItem2 select {
    width: calc(100% - 80px);
    height: 28px;
    color: #99c9fa ;
    border: 1px solid #303338;
     background:rgba(0,0,0,0.2)
  }

  .el-icon-delete {
    font-size: 18px;
    padding: 2px 5px;
    color: white;
    border-radius: 3px;
    background-color: #F56C6C;
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
  .el-table,
.el-table>>>tr,
.el-table>>>th {
  text-align: center !important;
  background: transparent !important;
}

.el-table>>>td {
  padding: 0.08rem 0;
}

.el-table>>>th {
  background: rgba(12, 68, 135, 0.4) !important;
}

.el-table>>>tr:nth-child(2n) {
  background: rgba(24, 39, 59, 0.5) !important
}

.el-table>>>th>.cell,
.el-table>>>.cell,
.titleColor {
  color: #99c9fa !important
}

.el-table--border {
  border: 2px solid rgba(12, 68, 135, 0.3) !important;
}

.el-table--border /deep/ td,
.el-table /deep/ th.is-leaf {
  border: 1px solid rgba(12, 68, 135, 0.3) !important;
}

.el-table--border /deep/ th.gutter:last-of-type {
  border: 1px solid rgba(12, 68, 135, 0.3) !important;
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: rgba(12, 68, 135, 0.3) !important;
}
.chooseItem2>>>.el-select{

 width: 70%;

}
.chooseItem2>>>.el-input__inner{

 height:0.28rem;
 border-radius: 0
}
</style>
