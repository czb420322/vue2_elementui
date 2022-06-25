<template>
  <div class="productDetailPage">
    <div v-if="transcribePhone">
      <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
      <van-nav-bar title="产品详情" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
    </div>

    <div class="page-group">
      <div ref="scrollContent" @scroll="contentScroll" class="content product-detail-content afe-area-inset-bottom" style="bottom: 2.5rem;">
        <div class="product-detail-div">

          <div class="product-banner">
            <video v-if="pageData.saleNameDesc" style="width:100%;" webkit-playsinline="true" playsinline="true" controls :poster="pageData.saleTopPic">
              <source :src="pageData.saleNameDesc" type='video/mp4'>
            </video>

            <div class="banner background-img" v-else :style="{'height': '57.6vw', backgroundImage:'url(' + pageData.saleTopPic + ')'}">
              <div class="banner-overlay" style="background-color: rgba(0, 0, 0, 0); height: 100%; width: 100%; position: absolute; top: 0px; left: 0px;">
                <p class="banner-name" style="padding: 0px; line-height: 1;">{{pageData.saleNameDesc}}</p>
                <p class="banner-desc" style="margin: 1rem 0px; padding: 0px 0.9rem 0px 0px;">
                  <!-- <span>{{pageData.saleTipDesc}}</span> -->
                </p>
              </div>
            </div>
          </div>

          <div v-if="pageData.isCoverageMapper=='Y'">
            <div class="product-desc-title">
              <h4 class="index-content-title" style="margin: 0.2rem 0px 0.5rem;"><span></span>保障范围</h4>
            </div>
            <div class="list-block" style="margin-top: 0px; border-top: 1px solid rgb(231, 231, 231);">
              <ul class="no-gap" style="padding-bottom: 0px; padding-top: 0px; margin-bottom: 0.7rem;">
                <template v-for="(coverage, index) in pageData.coverageList">
                  <div>
                    <div class="lineShow">
                      <li class="item-content h5-item-content showPlan">
                        <div class="item-inner h5-item-inner item-detail all-price" style="border-top: none; border-bottom: 1px solid rgb(231, 231, 231);">
                          <div style="margin: 4px 0px;">{{coverage.coverageName}}</div>
                          <div class="more-list1">
                            <span>{{coverage.coverageDesc}}</span>
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                </template>
              </ul>
            </div>
          </div>

          <!-- 方案 -->
          <div class="schemeTab">
            <van-tabs :class="'schemeTab' + programmeInfoList.length" v-model="schemeActive" @click="programmeInfo" :swipe-threshold="3" animated>
              <van-tab v-for="(item,index) in programmeInfoList" :key="index" title="index">
                <template #title>
                  <div class="item">
                    <p class="price"  v-if="saleCode !='GRMOBILE_MALL_SL032' ">{{item.programmePremium}}<span>元起</span></p>
                    <p :class="saleCode =='GRMOBILE_MALL_SL032' ? 'fosize14 name' : 'name' ">{{item.programmeName}}</p>
                  </div>
                </template>
              </van-tab>
            </van-tabs>
          </div>

          <div v-if="pageData.salePlanInfo!=null && pageData.salePlanInfo!=''">
            <ol class="list-box mainRiskList" v-if="saleCode =='GRMOBILE_MALL_SL032' ">
              <li class="item">
                <div v-for="(mainRisk, index) in pageData.mainRiskList" :key="index">
                  <van-field v-if="mainRisk.selAmount" is-link input-align="right" readonly clickable name="picker" :value="`${mainRisk.amount || 0}万`" :label="mainRisk.riskName" placeholder="点击选择" @click="openPopup(mainRisk,index,1)" />
                  <van-cell v-else :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" />
                </div>

                <div v-for="(addRisk, index) in pageData.addRiskList" :key="index+100">
                  <van-field v-if="addRisk.selAmount" is-link input-align="right" readonly clickable name="picker" :value="`${addRisk.amount || 0}万`" :label="addRisk.riskName" placeholder="点击选择" @click="openPopup(addRisk,index,2)" />
                  <van-cell v-else :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" />
                </div>

              </li>
            </ol>
            <ol class="list-box mainRiskList" v-else-if="saleCode == 'GRMOBILE_MALL_SL064'">
              <li class="item">
                <h1 class="duty_name">家庭意外</h1>
                <van-cell v-for="(mainRisk, index) in pageData.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" v-show="mainRisk.riskTAG == '家庭意外'"/>
                <van-cell v-for="(addRisk, index) in pageData.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" v-show="addRisk.riskTAG == '家庭意外'"/>
                <div v-show="showDuty">
                  <h1 class="duty_name">家庭财产</h1>
                  <van-cell v-for="(mainRisk, index) in pageData.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" v-show="mainRisk.riskTAG == '家庭财产'"/>
                  <van-cell v-for="(addRisk, index) in pageData.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" v-show="addRisk.riskTAG == '家庭财产'"/>

                  <h1 class="duty_name" v-show="schemeActive != 0">新冠保障</h1>
                  <van-cell v-for="(mainRisk, index) in pageData.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" v-show="mainRisk.riskTAG == '新冠保障'"/>
                  <van-cell v-for="(addRisk, index) in pageData.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" v-show="addRisk.riskTAG == '新冠保障'"/>

                  <h1 class="duty_name" v-show="schemeActive != 0">家庭车辆</h1>
                  <van-cell v-for="(mainRisk, index) in pageData.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" v-show="mainRisk.riskTAG == '家庭车辆'"/>
                  <van-cell v-for="(addRisk, index) in pageData.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" v-show="addRisk.riskTAG == '家庭车辆'"/>

                  <h1 class="duty_name" v-show="schemeActive != 0 && schemeActive != 1">成人专属</h1>
                  <van-cell v-for="(mainRisk, index) in pageData.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" v-show="mainRisk.riskTAG == '成人专属'"/>
                  <van-cell v-for="(addRisk, index) in pageData.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" v-show="addRisk.riskTAG == '成人专属'"/>

                  <h1 class="duty_name" v-show="schemeActive != 0 && schemeActive != 1">儿童专属</h1>
                  <van-cell v-for="(mainRisk, index) in pageData.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" v-show="mainRisk.riskTAG == '儿童专属'"/>
                  <van-cell v-for="(addRisk, index) in pageData.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" v-show="addRisk.riskTAG == '儿童专属'"/>
                </div>

                <div class="show_div"  @click="showDuty = (showDuty ? false: true)">
                  <div class="show_txt" v-if="!showDuty" >
                    <van-icon name="arrow-down" size="20" />
                    <span>展开</span>
                  </div>
                  <div class="show_txt" v-else>
                    <van-icon name="arrow-up"  size="20" />
                    <span>收起</span>
                  </div>
                </div>
              </li>
            </ol>
            <ol class="list-box mainRiskList" v-else>
              <li class="item">
                <van-cell v-for="(mainRisk, index) in pageData.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" />
                <van-cell v-for="(addRisk, index) in pageData.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" />
                <van-cell v-if="saleCode == 'GRMOBILE_MALL_SL014'" title="交强险免赔额" value="100万" />
              </li>
            </ol>
            <!-- 投保份数 -->
            <div id="morecolor" style="margin-top: 15px;">
              <ul>
                <li v-for="(item, index) in pageData.salePlanInfo.struct" :key="index" v-show="item.isHidden!='Y' && item.code == 'mult'  || item.code == 'startDate' || item.code == 'cost' || (item.code == 'insuYearUnit' && saleCode == 'GRMOBILE_MALL_SL031') || (item.code == 'insuYearUnit' && saleCode == 'GRMOBILE_MALL_SL042')" :class="{'item-link' :item.type === 'select'}" class="van-hairline--bottom">
                  <template v-if="item.type === 'input'">
                    <div>
                      <template v-if="item.isEdit == '1' || item.isEdit == 'N'">
                        <van-field input-align="right" :label="item.name" readonly :placeholder="item.holder" v-model='pageData.salePlanInfo.data[item.code]' />
                      </template>
                      <template v-else-if="item.code == 'cost'">
                        <van-field type="number" :label="item.name" :placeholder="item.holder" v-on:blur="salePlanEvent(item, $event.target.value)" v-model.trim='pageData.salePlanInfo.data[item.code]' :class="item.isNeed === 'Y' ? 'required' : ''" />
                      </template>
                      <template v-else>
                        <van-field input-align="right" :label="item.name" :placeholder="item.holder" v-model='pageData.salePlanInfo.data[item.code]' @blur="salePlanEvent(item,$event.target.value)" />
                      </template>
                    </div>
                  </template>
                  <template v-else-if="item.type === 'select'">
                    <eg-data-picker right="right" :value="pageData.salePlanInfo.data[item.code]" :placeholder="item.holder" :params="item" :edit="item.isEdit" @input="pageData.salePlanInfo.data[item.code] = $event.value" @change="salePlanEvent(item,$event)">
                    </eg-data-picker>
                  </template>
                  <template v-else-if="item.type === 'date' && item.code != 'startDate'">
                    <eg-date-picker right="right" :type="'date'" :placeholder="item.holder" :value="pageData.salePlanInfo.data[item.code]" :min-date="item.data.minDate" :max-date="item.data.maxDate" :edit="item.edit" @input="pageData.salePlanInfo.data[item.code] = $event.value" @change="beginDateEvent('date', item, $event)">
                    </eg-date-picker>
                  </template>
                  <template v-else-if="item.type === 'date' && item.code == 'startDate'">
                    <van-field :value="pageData.startDate" readonly @click="showDataTimePicker({ minDate: (item.data.minDate|| 1) *1, maxDate: (item.data.maxDate || 90) *1})" label="保险起期" placeholder="请选择保险起期">
                      <template #right-icon>
                        <van-icon name="img/carInsurance/rili@2x.png" size="20px" />
                      </template>
                    </van-field>
                    <van-field v-if="pageData.startDate && saleCode != 'GRMOBILE_MALL_SL028' && saleCode != 'GRMOBILE_MALL_SL0623' && saleCode != 'GRMOBILE_MALL_SL066' && saleCode != 'GRMOBILE_MALL_SL079'" label="保险止期" :value="pageData.startDate | InsurancePeriod(pageData.salePlanInfo.data.insuYearUnit)" readonly />
                  </template>
                </li>
              </ul>
            </div>
          </div>

          <!-- 信息录入 -->
          <appnt-info ref="appntInfo"></appnt-info>
          <multiple-info ref="multipleInfo" @click="trialInner"></multiple-info>
          <single-info ref="singleInfo"></single-info>
          <beneficiary ref="beneficiary"></beneficiary>
          <tagsList v-if="saleCode == 'GRMOBILE_MALL_SL064'" ref="tagsList"></tagsList>
          <car-info v-else ref="carInfo"></car-info>
          <datetimePicker ref="datetimePicker" @click="updataDatetime"></datetimePicker>

          <van-cell class="articleList" :border="false">
            <template #title>
              <div class="custom-title">请阅读<span class="sign" @click="goPage('productDetailClause?title=' + item.notifiName +'&index='+index)" v-for="(item, index) in pageData.notificationList" :key="index">《{{item.notifiName}}》</span></div>
            </template>
          </van-cell>

          <div style="margin-top: 15px;" class="productDetailcontent">
            <van-tabs v-model="active" scrollspy sticky :offset-top="0">
              <van-tab v-for="(tabs, index) in pageData.tabsList" :key="index" :title="tabs.tabsName">
                <div v-html="pageData.tabsList[index].tabsContent"></div>
              </van-tab>
            </van-tabs>
          </div>

          <div v-if="userInfo.agentType == 2 || userInfo.agentType == 3 || userInfo.agentType == 4" style="margin-top: .8rem;">
            <companyTxt />
          </div>

          <template v-if="pageData.agreeButton !== undefined && pageData.agreeButton.length !== ''">
            <div class="product-desc-title agree" v-html="pageData.agreeButton">
            </div>
          </template>

          <!-- <template v-if="pageData.notificationList !== undefined && pageData.notificationList.length > 0">
            <div class="introduct-detail">
              <van-grid clickable :column-num="pageData.notificationList.length">
                <van-grid-item :icon="index == '0' ? 'orders-o' : index == '1' ? 'newspaper-o' : index == '2' ? 'other-pay' : '' " color="#07c160" v-for="(notification, index) in pageData.notificationList" :key="index" :text="notification.notifiName" v-on:click="detailShowModal(notification)" />
              </van-grid>
            </div>
          </template> -->
        </div>
      </div>

      <div class="confirm_bar">
        <span class="name">总保费</span>
        <p class="price">￥{{pageData.sumPrem}}<span class="originalPrice" v-if="pageData.flag == '1' && pageData.discountPrem">￥{{pageData.discountPrem}}</span></p>
        <a class="btn PhoneBtn" :href="`tel:${phone}`" v-show="!medicalOrgName" >
          <div>
            <p style="margin: 0; padding: 0; text-align: center;">专属顾问</p>
            <p style="margin: 0; padding: 0; line-height: 1em; text-align: center; font-size: 13px;">{{wxAccountName}}</p>
          </div>
        </a>
        <a class="btn" @click="immediatelyOrder()">立即投保</a>
      </div>

      <common-open-modal ref="openModal" :params="openModal"></common-open-modal>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>

      <van-action-sheet class="notify_box" v-model="show" title="被保险人健康告知" :lock-scroll="false">
        <div class="notify_content">
          <!-- 百万医疗显示 百万医疗家庭版-->
          <div class="notify" v-if="saleCode == 'GRMOBILE_MALL_SL015' || saleCode == 'GRMOBILE_MALL_SL027'">
            <p>1、被保险人职业是否不属于《国任职业分类表2019版》中的1-4级人员？</p>
            <p>2、被保险人在最近2年内投保寿险、重大疾病保险、健康保险时，是否被保险公司拒保、延期、加费或附加条件承保？</p>
            <p>3、被保险人在最近2年内接受X光、超声波、CT、核磁共振、心电图、内窥镜、病理活检、血液、尿液等检查，检查结果是否提示异常？过去2年内是否曾有住院史（不包括剖腹产、顺产、鼻炎、急性胃肠炎、肺炎、上呼吸道感染住院）？</p>
            <p>4、被保险人在最近1年内是否存在下列症状：</p>
            <p>反复头痛、晕厥、胸痛、气急、紫绀、持续反复发热、抽搐、不明原因皮下出血点、咯血、反复呕吐、进食梗噎感或吞咽困难、呕血、浮肿、腹痛、黄疸、便血、血尿、蛋白尿、肿块、消瘦（非健身原因所致的体重减轻5公斤以上）？</p>
            <p>5、被保险人目前或过往是否患有下列疾病：</p>
            <p>良/恶性肿瘤、2级或以上高血压（收缩压大于等于160mmHg，或舒张压大于等于100mmHg）、冠心病、心肌病、心肌梗死、风湿性心脏病、肺源性心脏病、心功能不全二级（含）以上、主动脉疾病、短暂性脑缺血、脑梗死、脑出血、脑外伤后遗症、癫痫、过去2年内曾发生哮喘持续状态、肺气肿、慢性阻塞性肺病、肺动脉高压、慢性呼吸功能衰竭、支气管扩张症、间质性肺病、肺纤维化、肾髓质囊性病、慢性肾炎、肾功能不全、慢性萎缩性胃炎、肝炎（肝炎病毒携带者）、肝硬化、慢性肝功能衰竭、胆囊息肉、克罗恩病（节段性肠炎）、溃疡性结肠炎、胰腺炎、原发性硬化性胆管炎、再生障碍性贫血、血小板减少性紫癜、血友病、系统性红斑狼疮、类风湿性关节炎、强直性脊柱炎、椎间盘突出症、糖尿病、甲亢、甲状腺结节、阿尔茨海默病、痴呆、帕金森氏病、精神病、慢性酒精中毒、视网膜疾病、角膜疾病、运动神经元病变、严重残疾（包括双目失明、一肢及一肢以上断离、双耳失聪、语言能力丧失）、瘫痪、先天性疾病、遗传性疾病、法定传染病（包含甲类及乙类）、性病、艾滋病及HIV阳性、严重Ⅲ度烧伤、接受重大器官移植或造血干细胞移植术？ </p>
            <p>6、女性被保险人目前或过往存在下列症状或疾病：</p>
            <p>乳腺囊肿、乳腺结节、乳房皮肤及乳头有不明原因的凹陷、脱屑、变形、乳头溢液、卵巢囊肿、子宫内膜异位、子宫肌腺症、子宫肌瘤、宫颈炎、盆腔炎、宫颈上皮内瘤变（CIN）、HPV阳性、不规则的阴道流血或排液、恶性葡萄胎？</p>
            <p>7、被保险人为2周岁以下儿童（含2周岁）：是否早产，且出生体重是否低于2500克？出生时是否有产伤、窒息史、抢救史或被置于保温箱史？是否有畸形、发育迟缓、惊厥、抽搐、脑瘫？</p>
          </div>
          <!-- 少儿学平险显示 -->
          <div class="notify" v-else-if="saleCode == 'GRMOBILE_MALL_SL016'">
            <p>1、被保险人目前或过往是否有疾病未治愈或正接受治疗，或出院后至今未满3个月？</p>
            <p>2、被保险人目前或过往是否患有下列疾病：</p>
            <p>恶性肿瘤、白血病、肾炎、肾功能衰竭、肝炎（不包括乙肝小三阳和乙肝病毒携带）、慢性肠炎、脑膜炎（包括流行性脑脊髓膜炎）、脑炎（包括流行性乙型脑炎、脑损伤、III度烧伤、再生障碍性贫血、川崎病、风湿或类风湿病、人类免疫缺陷病毒（HIV）感染、糖尿病、哮喘、未治愈的肺炎、先天性梅毒、癫痫、智障、儿童多动症、遗传性疾病、畸形、脑瘫、小儿麻痹、脊髓灰质炎、麻疹、百日咳、白喉、新生儿破伤风、猩红热、流行性腮腺炎、风疹等？</p>
            <p>3、被保险人最近一年内是否出现过以下任一症状：</p>
            <p>不明原因的发热、反复头疼、头晕、气喘、腹痛、咯血、黑便、反复腹泻、紫癜、惊厥、反复呕吐、排尿困难、蛋白尿、抽搐、视力或者听力障碍、原因不明的身体包块或肿物、消瘦（半年内体重下降超过5公斤）？</p>
            <p>4、最近2年内，被保险人是否做过以下任一项检查并检查结果存在异常：X光、B超、CT、彩超、核磁共振、病理活检、眼底检查、内窥镜等？</p>
            <p>5、被保险人是否有过下列情况：</p>
            <p>身体、智力发育情况异常，或目前不能正常饮食、活动，或最近一年内因身患疾病而连续3天以上完全不能从事日常学习或活动？</p>
            <p>6、被保险人是否有过被保险公司解除合同或投保、复效时被拒保、延期、附加条件承保，或向保险公司索赔重大疾病保险金？</p>
            <p>7、被保险人是否为体校、警校、武术学校、职业技工类院校在读生？</p>
          </div>
          <!-- i行销—少儿至尊宝保险  乐翻天专属医疗险-->
          <div class="notify" v-else-if="saleCode == 'GRMOBILE_MALL_SL017' || saleCode == 'GRMOBILE_MALL_SL067'">
            <p>1. 被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、脑肿瘤、癫痫、免疫缺陷疾病、肾脏疾病、血液疾病、风湿性疾病、精神疾患、智能障碍？</p>
            <p>2. 被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
            <p>注：</p>
            <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤等，则可以投保本保险产品；</p>
            <p>（2）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
            <p>3. 最近2年内被保险人是否患有以下不适或症状？</p>
            <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、不明原因的肢体疼痛或肿胀/关节活动受限/跛行/病理性骨折、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）？</p>
            <p>被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
            <p>5. 被保险人如为3周岁以下儿童（含3周岁），请同时告知以下事项：</p>
            <p>是否早产，且出生体重是否低于2500克？</p>
            <p>出生时是否有产伤、窒息史、抢救史或被置于保温箱史？</p>
            <p>是否有畸形、发育迟缓、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病？</p>
            <p>6. 被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
          </div>
          <!-- 孕妇险显示 -->
          <div class="notify" v-else-if="saleCode == 'GRMOBILE_MALL_SL018'">
            <p>1.被保险人目前怀孕未超过28周，且孕期检查（血压、尿液、血液、超声检查、产前检查等）未见异常，胎儿未见先天性疾病或异常（如脊柱裂或颅裂、先天性脑积水、先天性室间隔缺损、法氏四联症、完全性大动脉转位、先天性白内障、先天性大脑发育不全、先天性食管闭锁或食管气管瘘）、唇腭裂、先天性肛门闭锁、染色体异常、胎儿畸形或感染）；</p>
            <p>2.被保险人本次怀孕未采用辅助生殖技术（如人工授精、试管婴儿、胚胎移植等）；本次怀孕为自然怀孕且不超过双胎；</p>
            <p>3.被保险人曾经或目前未有过下列疾病或异常症状：癌前病变、恶性肿瘤（包括原位癌）、未明确诊断的包块/肿块/结节、贫血、白血病、血友病、高血压（含妊娠高血压）、糖尿病（含妊娠糖尿病）、心脏病、脑出血、脑梗、精神疾病（含抑郁症、焦虑症）、肝硬化、肾脏疾病、妊娠剧吐、瘫痪、癫痫、阴道异常流血、子宫肌瘤、多囊卵巢综合征、子宫畸形、子宫穿孔、葡萄胎、胎盘早剥、前置胎盘、抗磷脂综合征、遗传性疾病、先天性疾病、自身免疫性疾病、智能障碍、失明、聋哑、脊柱或胸廓畸形、使用毒品或违禁药品等；</p>
            <p>4.被保险人如曾有过剖宫产，本次怀孕距离前一次剖宫产手术间隔时间≥2年；</p>
            <p>被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
            <p>5.被保险人妊娠前体重指数【体重（kg）/身高（m）的平方】≤23，且一级亲属（父母兄弟姐妹）中无糖尿病患者；</p>
            <p>6.被保险人投保其他保险公司人身险或健康险产品时未被拒保、延期或附加条件承保。</p>
          </div>

          <!-- i行销—I康保女性计划 -->
          <div class="notify" v-else-if="saleCode == 'GRMOBILE_MALL_SL019'">
            <p>1.被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、肥胖（体重指数BMI（体重kg/身高2m2）大于32）、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、免疫缺陷疾病、风湿性疾病？</p>
            <p>2.被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
            <p>注：</p>
            <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤、乳腺囊性增生病（即慢性囊性乳腺病、乳腺病）、乳腺纤维腺瘤、乳管内乳头状瘤等，则可以投保本保险产品；</p>
            <p>（2）女性被保险人，如已由妇科医师确诊的子宫肌瘤、子宫腺肌病或子宫腺肌瘤、子宫内膜异位囊肿，则可以投保本保险产品；</p>
            <p>（3）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
            <p>3.最近2年内被保险人是否患有以下不适或症状？</p>
            <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）</p>
            <p>4.（女性适用）被保险人目前及过往是否有以下不适或症状？</p>
            <p>不规则的阴道流血或排液、子宫异常增大、宫颈上皮内瘤变（CIN）、人类乳头瘤病毒（HPV）阳性、恶性畸胎瘤（即未成熟畸胎瘤）、葡萄胎、绒毛膜癌或其他妊娠滋养细胞疾病；乳头异常溢液、糜烂或回缩；乳房表面皮肤凹陷、皱褶或皮肤收缩？</p>
            <p>被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
            <p>5.被保险人目前及过往是否每天吸烟超过40支，是否饮酒过量（饮酒过量指的是：啤酒超过1500ml/天，或者白酒超过150ml/天，或者红酒或黄酒超过350ml/天）？</p>
            <p>6.被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
            <p>7.被保险人所从事的工作及工作环境是否与石棉生产、砷加工、镉、煤焦油、制革、制铝、品红制造、甲醛、异丙醇、石棉粉、芥子气、苯及其有机制品、氯乙烯、放射线等有关？</p>
            <p>8.被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
          </div>
          <!-- i行销—I康保少儿计划 -->
          <div class="notify" v-else-if="saleCode == 'GRMOBILE_MALL_SL020'">
            <p>1.被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、脑肿瘤、癫痫、免疫缺陷疾病、肾脏疾病、血液疾病、风湿性疾病、精神疾患、智能障碍？</p>
            <p>2.被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
            <p>注：</p>
            <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤、乳腺囊性增生病（即慢性囊性乳腺病、乳腺病）、乳腺纤维腺瘤、乳管内乳头状瘤等，则可以投保本保险产品；</p>
            <p>（2）女性被保险人，如已由妇科医师确诊的子宫肌瘤、子宫腺肌病或子宫腺肌瘤、子宫内膜异位囊肿，则可以投保本保险产品；</p>
            <p>（3）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
            <p>3.最近2年内被保险人是否患有以下不适或症状？</p>
            <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）</p>
            <p>4.被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
            <p>5.被保险人如为3周岁以下儿童（含3周岁），请同时告知以下事项：</p>
            <p>（1）是否早产，且出生体重是否低于2500克？</p>
            <p>（2）出生时是否有产伤、窒息史、抢救史或被置于保温箱史？</p>
            <p>（3）是否有畸形、发育迟缓、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病？</p>
            <p>6.被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
          </div>
          <!-- i行销—I康保老年计划 -->
          <div class="notify" v-else-if="saleCode == 'GRMOBILE_MALL_SL021'">
            <p>1.被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、肥胖（体重指数BMI（体重kg/身高2m2）大于32）、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、免疫缺陷疾病、风湿性疾病？</p>
            <p>2.被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
            <p>注：</p>
            <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤、乳腺囊性增生病（即慢性囊性乳腺病、乳腺病）、乳腺纤维腺瘤、乳管内乳头状瘤等，则可以投保本保险产品；</p>
            <p>（2）女性被保险人，如已由妇科医师确诊的子宫肌瘤、子宫腺肌病或子宫腺肌瘤、子宫内膜异位囊肿，则可以投保本保险产品；</p>
            <p>（3）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
            <p>3.最近2年内被保险人是否患有以下不适或症状？</p>
            <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）</p>
            <p>4.（女性适用）被保险人目前及过往是否有以下不适或症状？</p>
            <p>不规则的阴道流血或排液、子宫异常增大、宫颈上皮内瘤变（CIN）、人类乳头瘤病毒（HPV）阳性、恶性畸胎瘤（即未成熟畸胎瘤）、葡萄胎、绒毛膜癌或其他妊娠滋养细胞疾病；乳头异常溢液、糜烂或回缩；乳房表面皮肤凹陷、皱褶或皮肤收缩？</p>
            <p>5.被保险人目前及过往是否每天吸烟超过40支，是否饮酒过量（饮酒过量指的是：啤酒超过1500ml/天，或者白酒超过150ml/天，或者红酒或黄酒超过350ml/天）？</p>
            <p>6.被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
            <p>（3）是否有畸形、发育迟缓、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病？</p>
            <p>7.被保险人所从事的工作及工作环境是否与石棉生产、砷加工、镉、煤焦油、制革、制铝、品红制造、甲醛、异丙醇、石棉粉、芥子气、苯及其有机制品、氯乙烯、放射线等有关？</p>
            <p>8.被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
          </div>
          <!-- i国任-一年期重疾险 -->
          <div class="notify" v-else-if="saleCode == 'GRMOBILE_MALL_SL022'">
            <p>1.被保险人近2年内是否因健康异常住院或手术，或被医师提出过住院或手术建议？或因其它慢性疾病需要长期（一个月以上）服药控制或手术治疗？</p>
            <p>2.被保险人近2年内是否接受过以下检查或检验且结果异常：血常规（白细胞、红细胞、血红蛋白、血小板异常）、空腹血糖、糖化血红蛋白、肝功能、肾功能、甲状腺功能、尿常规、心电图、X线、B超、超声心动图、CT、核磁共振、脑电图、肌电图、内窥镜、肿瘤标记物、病理活检、宫颈TCT检查、眼底检查等？（不包括剖腹产/顺产/鼻炎/急性肠胃炎/肺炎/上呼吸道感染引起住院或检查结果异常）</p>
            <p>3.被保险人发生过下列任意一项？(1)体格指数(体重 kg/身高²m²)≥32;(2)肢体残疾、只能障碍、语言、咀嚼、视力、听力等机能障碍、瘫痪、昏迷或植物人状态；(3)曾因饮酒、吸烟过度接受治疗，曾使用成瘾性药品、毒品；使用镇定剂、服用或接触有毒、有害物质;(4)正计划到有战乱的国家工作或居住。</p>
            <p>4.被保险人近6个月内是否存在以下症状或情况：反复头晕、头痛、眩晕、晕厥、咯血、胸闷、胸痛、心慌、肝区痛疼不适、血尿、蛋白尿、便血、肌肉萎缩、复视、消瘦（非减肥或妊娠原因，3个月内体重下降超过5公斤），原因不明的持续发热/皮下出血/声音嘶哑/听力下降？</p>
            <p>5.被保险人目前或曾经是否患有下列疾病或存在下列情况：</p>
            <p>①.肿瘤相关疾病: 恶性肿瘤、良性肿瘤（不含子宫肌瘤、乳腺纤维瘤、皮肤良性肿瘤、脂肪瘤、血管瘤）、原位癌、癌前病变、类癌、黑痣破溃或明显增大、不明原因淋巴结肿大、性质不明的息肉、赘生物、结节、囊肿、肿块、占位或包块，包括甲状腺结节、乳腺结节、肺结节。</p>
            <p>②.循环系统、呼吸系统疾病：高血压（收缩压＞150mmHg或舒张压＞100mmHg）、冠心病、心绞痛、心肌梗塞、心律失常（房早，偶发室早除外）、心功能不全、心脏瓣膜疾病、肺动脉高压、肺心病、川崎病（未累及冠状动脉异常的除外）、周围血管病、心肌病、心包疾病、室壁瘤、心内膜炎、主动脉疾病、先天性心脏病、冠状动脉搭桥、心脏介入或微创治疗；哮喘（中度及以上）、呼吸衰竭、肺淋巴管肌瘤病、肺泡蛋白沉积、肺栓塞、阻塞性睡眠窒息症、尘肺、慢性支气管炎、慢性阻塞性肺疾病、肺气肿、肺结核（未愈）、胸腔积液。 </p>
            <p>③.神经系统及精神疾病：脑缺血性疾病、蛛网膜下腔出血、脑出血、颅内血管畸形、颅内血管瘤、脑炎、脑膜炎、脑积水、脑损伤、脊髓疾病、脊髓灰质炎、多发性硬化、肌营养不良、肌无力、运动神经元病、瘫痪、脑瘫、癫痫、帕金森症、痴呆、精神分裂症、人格障碍、抑郁症、精神障碍。</p>
            <p>④.内分泌、消化系统疾病：糖尿病、高脂血症、高尿酸血症、痛风、甲亢、甲减、甲状旁腺功能亢进症、甲状旁腺功能减退症、皮质醇增多症、肾上腺皮质功能减退症、醛固酮增多症；乙型肝炎、丙型肝炎、酒精性肝炎、肝豆状核变性、肝硬化、肝功能失代偿、多囊肝、慢性萎缩性胃炎、克隆病（克罗恩病）、溃疡性结肠炎、肠梗阻、胰腺炎。</p>
            <p>⑤.血液泌尿及生殖系统疾病：白血病、血友病、紫癜、脾大、再生障碍性贫血、骨髓异常增长综合症、地中海贫血、骨髓增生性疾病、凝血功能障碍、坏疽、中度以上贫血、象皮病；海绵肾、肾炎、肾小球肾炎、肾动脉狭窄、肾病综合征、肾结石（双侧）、肾积水、肾功能不全、肾衰竭、终末期肾病、多囊肾。</p>
            <p>⑥.皮肤五官及结缔组织疾病：烧伤（I、II度烧伤除外）、类风湿性关节炎、风湿热、干燥综合征、混合性结缔组织病、系统性红斑狼疮、血管炎、系统性硬化病（硬皮病）、强直性脊柱炎、脊柱裂、骨生长不全、坏死性筋膜炎、严重骨质疏松。青光眼、高度近视（800度以上）、视神经或视网膜病变、视力下降或失明、听力下降或失聪、语言障碍</p>
            <p>⑦.其他：器官移植或造血干细胞移植、残疾、昏迷、植物人状态、智能障碍、先天性疾病、遗传性疾病、头部外伤（未手术及无后遗症除外）、内脏损伤、慢性中毒、重症手足口病、性病、艾滋病或艾滋病病毒携带等。</p>
            <p>6.（2周岁以下保险人需告知）出生时是否体重低于2.5公斤，或发生早产、窒息、发育迟缓、脑瘫的情况。</p>
            <p>7.（女性被保险人需告知）是否曾有阴道不规则流血或排液、宫颈上皮肉瘤变(CIN)、人乳头瘤病毒(HPV)阳性、乳房皮肤及乳头不明原因的凹陷、脱屑、变形、乳头溢液？</p>
            <p>8.被保险人是否曾被保险公司解除合同，投保时曾被拒保、延期、附加条件承保？或近2年内是否曾在其他保险公司投保或正在申请以疾病为给付保险金条件的人身保险（不含本次）累计保额超过80万元？</p>
          </div>
          <!-- 国任.学子安康学平险 -->
          <div class="notify"  v-else-if="saleCode == 'GRMOBILE_MALL_SL062'">
              <p>1.被保险人职业是否不属于《国任职业分类表2020版》中的1-4级人员？</p>
              <p>2.被保险人在最近2年内投保寿险、重大疾病保险、健康保险时，是否被保险公司拒保、延期、加费或附加条件承保？</p>
              <p>3.被保险人在最近2年内接受X光、超声波、CT、核磁共振、心电图、内窥镜、病理活检、血液、尿液等检查，检查结果是否提示异常？过去2年内是否曾有住院史（不包括剖腹产、顺产、鼻炎、急性胃肠炎、肺炎、上呼吸道感染住院）？</p>
              <p>4.被保险人在最近1年内是否存在下列症状：反复头痛、晕厥、胸痛、气急、紫绀、持续反复发热、抽搐、不明原因皮下出血点、咯血、反复呕吐、进食梗噎感或吞咽困难、呕血、浮肿、腹痛、黄疸、便血、血尿、蛋白尿、肿块、消瘦（非健身原因所致的体重减轻5公斤以上）？</p>
              <p>5.被保险人目前或过往是否患有下列疾病：</p>
              <p>①.良/恶性肿瘤、2级或以上高血压（收缩压大于等于160mmHg，或舒张压大于等于100mmHg）、冠心病、心肌病、心肌梗死、风湿性心脏病、肺源性心脏病、心功能不全二级（含）以上、主动脉疾病、短暂性脑缺血、脑梗死、脑出血、脑外伤后遗症、癫痫、过去2年内曾发生哮喘持续状态、肺气肿、慢性阻塞性肺病、肺动脉高压、慢性呼吸功能衰竭、支气管扩张症、间质性肺病、肺纤维化、肾髓质囊性病、慢性肾炎、肾功能不全、慢性萎缩性胃炎、肝炎（肝炎病毒携带者）、肝硬化、慢性肝功能衰竭、胆囊息肉、克罗恩病（节段性肠炎）、溃疡性结肠炎、胰腺炎、原发性硬化性胆管炎、再生障碍性贫血、血小板减少性紫癜、血友病、系统性红斑狼疮、类风湿性关节炎、强直性脊柱炎、椎间盘突出症、糖尿病、甲亢、甲状腺结节、阿尔茨海默病、痴呆、帕金森氏病、精神病、慢性酒精中毒、视网膜疾病、角膜疾病、运动神经元病变、严重残疾（包括双目失明、一肢及一肢以上断离、双耳失聪、语言能力丧失）、瘫痪、先天性疾病、遗传性疾病、法定传染病（包含甲类及乙类）、性病、艾滋病及HIV阳性、严重Ⅲ度烧伤、接受重大器官移植或造血干细胞移植术？</p>
              <p>6.女性被保险人目前或过往存在下列症状或疾病：</p>
              <p>①.乳腺囊肿、乳腺结节、乳房皮肤及乳头有不明原因的凹陷、脱屑、变形、乳头溢液、卵巢囊肿、子宫内膜异位、子宫肌腺症、子宫肌瘤、宫颈炎、盆腔炎、宫颈上皮内瘤变（CIN）、HPV阳性、不规则的阴道流血或排液、恶性葡萄胎？</p>
              <p>7.是否从事潜水、滑水、滑雪、驾驶航空器、热气球、滑翔、跳水、跳伞、攀岩、蹦极、空手道、搏击、特技表演、赛车等高风险的行为和爱好。</p>
          </div>
           <!-- 宠物险 -->
          <div class="notify"  v-else-if="saleCode== 'GRMOBILE_MALL_SL073'">
              <p>若被保险人宠物的健康/行为存在以下情况，发生保险事故的，保险公司不承担赔偿责任：</p>
              <p>1.被保险人的宠物患有先天性疾病</p>
              <p>2.被保险人的宠物带病投保的情形；</p>
              <p>3.被保险人的宠物与人共同参与潜水，跳伞，攀岩，探险，滑雪，赛车，赛马，护卫，高危节目拍摄等活动；</p>
              <p>4.被保险人的宠物在最近1个月内有便血，尿血，呕血，发热，腹胀，黄疸，抽搐，精神萎靡，突然消瘦（1个月内体重减少10％）的情况；</p>
              <p>5.被保险人的宠物过去被诊断(包括被怀疑)为有以下列疾病：</p>
              <p>①.肝炎、葡萄膜炎、肝硬化・肝纤维症、内分泌性疾病、胰腺炎・胰脏相关疾病、贫血（介导性溶血性）・IMHA、癫痫、甲状腺疾病、脑积水、副肾皮质疾病、脊髄疾病（椎间盘疝除外）、糖尿病、猫泛白细胞减少症、丝虫病、钩端螺旋体感染、腺病毒感染</p>
          </div>
           <!-- 新i国任·一年期重疾险 -->
          <div class="notify"  v-else-if="saleCode== 'GRMOBILE_MALL_SL081'">
              <p>1.被保险人近2年内是否因健康异常住院或手术，或被医师提出过住院或手术建议？或因其它慢性疾病需要长期（一个月以上）服药控制或手术治疗？</p>
              <p>2.被保险人近2年内是否接受过以下检查或检验且结果异常：血常规（白细胞、红细胞、血红蛋白、血小板异常）、空腹血糖、糖化血红蛋白、肝功能、肾功能、甲状腺功能、尿常规、心电图、X线、B超、超声心动图、CT、核磁共振、脑电图、肌电图、内窥镜、肿瘤标记物、病理活检、宫颈TCT检查、眼底检查等？（不包括剖腹产/顺产/鼻炎/急性肠胃炎/肺炎/上呼吸道感染引起住院或检查结果异常）</p>
              <p>3.被保险人发生过下列任意一项？(1)体格指数(体重 kg/身高²m²)≥32;(2)肢体残疾、只能障碍、语言、咀嚼、视力、听力等机能障碍、瘫痪、昏迷或植物人状态；(3)曾因饮酒、吸烟过度接受治疗，曾使用成瘾性药品、毒品；使用镇定剂、服用或接触有毒、有害物质;(4)正计划到有战乱的国家工作或居住。</p>
              <p>4.被保险人近6个月内是否存在以下症状或情况：反复头晕、头痛、眩晕、晕厥、咯血、胸闷、胸痛、心慌、肝区痛疼不适、血尿、蛋白尿、便血、肌肉萎缩、复视、消瘦（非减肥或妊娠原因，3个月内体重下降超过5公斤），原因不明的持续发热/皮下出血/声音嘶哑/听力下降？</p>
              <p>5.被保险人目前或曾经是否患有下列疾病或存在下列情况：</p>
              <p>①.肿瘤相关疾病: 恶性肿瘤、良性肿瘤（不含子宫肌瘤、乳腺纤维瘤、皮肤良性肿瘤、脂肪瘤、血管瘤）、原位癌、癌前病变、类癌、黑痣破溃或明显增大、不明原因淋巴结肿大、性质不明的息肉、赘生物、结节、囊肿、肿块、占位或包块，包括甲状腺结节、乳腺结节、肺结节。</p>
              <p>②.循环系统、呼吸系统疾病：高血压（收缩压＞150mmHg或舒张压＞100mmHg）、冠心病、心绞痛、心肌梗塞、心律失常（房早，偶发室早除外）、心功能不全、心脏瓣膜疾病、肺动脉高压、肺心病、川崎病（未累及冠状动脉异常的除外）、周围血管病、心肌病、心包疾病、室壁瘤、心内膜炎、主动脉疾病、先天性心脏病、冠状动脉搭桥、心脏介入或微创治疗；哮喘（中度及以上）、呼吸衰竭、肺淋巴管肌瘤病、肺泡蛋白沉积、肺栓塞、阻塞性睡眠窒息症、尘肺、慢性支气管炎、慢性阻塞性肺疾病、肺气肿、肺结核（未愈）、胸腔积液。</p>
              <p>③.神经系统及精神疾病：脑缺血性疾病、蛛网膜下腔出血、脑出血、颅内血管畸形、颅内血管瘤、脑炎、脑膜炎、脑积水、脑损伤、脊髓疾病、脊髓灰质炎、多发性硬化、肌营养不良、肌无力、运动神经元病、瘫痪、脑瘫、癫痫、帕金森症、痴呆、精神分裂症、人格障碍、抑郁症、精神障碍。</p>
              <p>④.内分泌、消化系统疾病：糖尿病、高脂血症、高尿酸血症、痛风、甲亢、甲减、甲状旁腺功能亢进症、甲状旁腺功能减退症、皮质醇增多症、肾上腺皮质功能减退症、醛固酮增多症；乙型肝炎、丙型肝炎、酒精性肝炎、肝豆状核变性、肝硬化、肝功能失代偿、多囊肝、慢性萎缩性胃炎、克隆病（克罗恩病）、溃疡性结肠炎、肠梗阻、胰腺炎。</p>
              <p>⑤.血液泌尿及生殖系统疾病：白血病、血友病、紫癜、脾大、再生障碍性贫血、骨髓异常增长综合症、地中海贫血、骨髓增生性疾病、凝血功能障碍、坏疽、中度以上贫血、象皮病；海绵肾、肾炎、肾小球肾炎、肾动脉狭窄、肾病综合征、肾结石（双侧）、肾积水、肾功能不全、肾衰竭、终末期肾病、多囊肾。</p>
              <p>⑥.皮肤五官及结缔组织疾病：烧伤（I、II度烧伤除外）、类风湿性关节炎、风湿热、干燥综合征、混合性结缔组织病、系统性红斑狼疮、血管炎、系统性硬化病（硬皮病）、强直性脊柱炎、脊柱裂、骨生长不全、坏死性筋膜炎、严重骨质疏松。青光眼、高度近视（800度以上）、视神经或视网膜病变、视力下降或失明、听力下降或失聪、语言障碍。</p>
              <p>⑦.其他：器官移植或造血干细胞移植、残疾、昏迷、植物人状态、智能障碍、先天性疾病、遗传性疾病、头部外伤（未手术及无后遗症除外）、内脏损伤、慢性中毒、重症手足口病、性病、艾滋病或艾滋病病毒携带等。</p>
              <p>6.（2周岁以下保险人需告知）出生时是否体重低于2.5公斤，或发生早产、窒息、发育迟缓、脑瘫的情况。</p>
              <p>7.（女性被保险人需告知）是否曾有阴道不规则流血或排液、宫颈上皮肉瘤变(CIN)、人乳头瘤病毒(HPV)阳性、乳房皮肤及乳头不明原因的凹陷、脱屑、变形、乳头溢液？</p>
              <p>8.被保险人是否曾被保险公司解除合同，投保时曾被拒保、延期、附加条件承保？或近2年内是否曾在其他保险公司投保或正在申请以疾病为给付保险金条件的人身保险（不含本次）累计保额超过80万元？</p>
          </div>
          <!-- 山东学平险 只有c d方案显示 -->
          <div class="notify"  v-else-if="saleCode == 'GRMOBILE_MALL_SL075' ? (scheme == 'C' || scheme == 'D') : false">
              <p>被保险人个人健康告知：</p>
              <p>1.被保险人是否曾被保险公司拒保、延期、加费或附加条件承保？是否正在或曾经向保险公司提出过重疾或恶性肿瘤保险理赔申请？是否最近一年内累计投保重疾险保额超过100万（不含本次）？</p>
              <p>2.被保险人过去两年内是否接受X线、CT、核磁共振、心电图、胃肠镜、病理或组织活检、血常规、尿常规、肿瘤标志物等检查，且结果提示异常？</p>
              <p>3.被保险人过去两年内是否因健康异常住院（不包括已痊愈出院的上呼吸道感染、急性胃肠炎、生理性黄疸、四肢骨折）、手术、连续药物治疗超30天、或被医生建议住院治疗？</p>
              <p>4.被保险人是否目前或曾经患有下列任一疾病：</p>
              <p>①.智力障碍、精神疾病、脑外伤后遗症、脑炎后遗症或脑膜炎后遗症、癫痫、运动神经元疾病、多发性硬化、重症肌无力；</p>
              <p>②.恶性肿瘤、原位癌、癌前病变、颅内肿瘤、脊髓肿瘤、神经系统肿瘤；</p>
              <p>③.心肌病、心脏扩大或肥大、先天性心脏病、心功能不全、心脏瓣膜病、心包炎；</p>
              <p>④.哮喘、肺动脉高压、肺纤维化、慢性呼吸衰竭；</p>
              <p>⑤.肝炎病毒携带、重症肝炎、慢性肝炎、肝衰竭、克罗恩病、溃疡性结肠炎；</p>
              <p>⑥.糖尿病、慢性肾小球肾炎、肾病综合征、肾功能不全、多囊肾；</p>
              <p>⑦.白血病、再生障碍性贫血、血友病；</p>
              <p>⑧.接受器官移植、艾滋病或感染艾滋病病毒；</p>
              <p>⑨.川崎病、类风湿关节炎、红斑狼疮、肌营养不良、成骨不全症；</p>
              <p>⑩.III度烧伤、身体或智力残疾（包括肢体残疾、失聪、失明、失语）、瘫痪。</p>
              <p>5.被保险人最近一年内是否有以下任一症状或疾病：</p>
              <p>①.性质不明的肿瘤、肿块、结节、息肉、肿物、占位、淋巴结肿大</p>
              <p>②.体重不增、不明原因的发热、紫癜、贫血、鼻衄、腹痛、腹泻、黑便、黄疸、呼吸困难、血尿、蛋白尿、不明原因声音嘶哑、抽搐、骨或关节疼痛；</p>
          </div>

        </div>
        <div class="select_box">
          <van-button plain hairline type="primary" size="normal" @click="ascertain('1')">全部为“否”</van-button>
          <van-button plain hairline type="primary" size="normal" @click="ascertain('0')">至少有一项“是”</van-button>
        </div>

      </van-action-sheet>

    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import common from '../../assets/js/util/common';
import util from '../../assets/js/util/util';
import check from '../../assets/js/util/comp-check';
import productDetail from '../../assets/js/util/productDetail';
import appntInfo from './detail/appntInfo.vue';
import multipleInfo from './detail/multipleInfo.vue';
import singleInfo from './detail/singleInfo.vue';
import beneficiary from './detail/beneficiary.vue';
import carInfo from './detail/carInfo.vue';
import tagsList from './detail/tagsList.vue';
import datetimePicker from './../../templates/datetimePicker.vue';
import EventBus from '../../assets/js/util/EventBus';
import glutton from '../../assets/js/util/glutton';
import { mapState } from 'vuex'
import companyTxt from './../../templates/companyTxt.vue';

export default {
  components: {
    appntInfo,
    multipleInfo,
    singleInfo,
    beneficiary,
    carInfo,
    tagsList,
    datetimePicker,
    companyTxt
  },
  computed: {
    ...mapState({
      renewalDetail: state => state.renewedInsurance.noCar.renewalDetail
    })
  },
  data() {
    return {
      showDuty:false,
      healthState: false,
      show: false,
      showPicker: false,
      saleCode: '',
      pageData: {
        startDate: '',//保险起期时间
        saleCode: '',
        setMealCode: '',
        saleTopPic: '',//销售产品图片
        saleNameDesc: '',//销售产品名称
        saleTipDesc: '',//销售产品提示
        isCoverageMapper: '',// 是否显示保障范围
        salePlanInfo: [],//销售方案信息
        relySpec: '',//关联标识
        riskPlanList: [],//计划列表
        dutyList: [],//责任列表
        coverageList: [],//保障列表
        isExemption: '',//豁免险标识
        tabsList: [],
        notificationList: [],
        planCode: '',//计划编码
        mult: '',//份数
        insureNum: '',//被保人人数
        amt: '',//保额
        sumPrem: '0.00',
        discountPrem: 0,
        flag: 0,
        trialToRisk: false,
        appntInfo: [],
        mainRiskList: [], //主险
        addRiskList: [], //附加险
        riskType: '',
        trialAddRiskList: [], //已经添加的试算集合中的附加险
        //已经计算的list
        readyMainRiskList: [],
        readyAddRiskList: [],
        //******在险种信息页面缓存 end******
        dutyListall: [],
        plan: [],
        trialObj: {},
        agreeButton: '',
        isAgree: '',
        disabledPage: false
      },
      openModal: {},
      active: 0,
      bannerH: 0,
      schemeActive: 0,
      phone: '',
      programmeInfoList: [],
      trialLoading: "true",
      userInfo: {},
      productDetailData: '',
      columns: [],
      index: '',
      sign: 2,
      transcribePhone:'',
      transcribeName:'',
      businessType:'',
      agreementNo:'',
      orderArea:'',
      medicalOrgName:'',
      appId:'',
      openId:'',
      wxAccountName: '',
      agencyName:'',
      scheme:'A',
    };
  },
  created() {
    // 授权后传code给后端
    sessionStorage.shareInfo = JSON.stringify({
      agentCode: this.$route.query.agentCode,
      agentId: this.$route.query.agentId,
      activityId: this.$route.query.activityId
    });
    console.log('授权后传code给后端', {
      agentCode: this.$route.query.agentCode,
      agentId: this.$route.query.agentId,
      activityId: this.$route.query.activityId
    });
    sessionStorage.shareCode = this.$route.query.code;
    common.getCode("产品");

    if(common.getUrlParam('code')){
      glutton.startRecording(); // 回溯录制
    }
    this.saleCode = this.$route.query.saleCode;
    this.bannerH = document.documentElement.clientWidth * 0.62;
    this.schemeActive = util.getSessionStorageObj("schemeActive") || 0;
    this.pageData.startDate = util.getSessionStorageObj("startDate") || '';
    this.phone = this.$route.query.phone || '13128824124';

    this.transcribePhone = this.$route.query.transcribePhone || '';
    this.transcribeName = this.$route.query.transcribeName || '';
    this.businessType = this.$route.query.businessType || '';
    this.agreementNo = this.$route.query.agreementNo || '';
    this.agencyName = this.$route.query.agencyName || '';
    //深圳专版使用的字段
    this.orderArea = this.$route.query.orderArea || ''
    this.medicalOrgName = this.$route.query.medicalOrgName || ''
    this.appId = this.$route.query.appId || '';
    this.agentName = this.$route.query.agentName || '';

    // 自助单信息缓存
    util.setSessionStorageObj("showProductDetail_agentCode", this.$route.query.agentCode || '');
    util.setSessionStorageObj("showProductDetail_userId", this.$route.query.agentId || '');
    //分享出单转录需要的参数
    if(this.transcribePhone != ''){
      let dataList ={
        'transcribePhone':this.transcribePhone,
        'transcribeName':this.transcribeName,
        'businessType':this.businessType,
        'agreementNo':this.agreementNo,
        'orderArea':this.orderArea,
        'medicalOrgName':this.medicalOrgName,
        'appId':this.appId,
        'openId':this.openId,
        'agencyName':this.agencyName,
      }
      util.setSessionStorageObj("shiftList", dataList);
    }else{
      util.setSessionStorageObj("shiftList", '');
    }


    // 初始化
    let productDetailData = util.getSessionStorageObj("productDetail");
    if (productDetailData && productDetailData.content.saleCode != this.saleCode) {
      productDetail.clearProductStorage();
    }
    this.getInsureInit();

    setTimeout(()=>{
      this.getDetail();//产品详情
    },800)

    this.index = util.getSessionStorageObj("valueListIndex") || '';
    this.sign = util.getSessionStorageObj("valueListSign") || 2;

    this.getWxAccountDetails();

  },
  methods: {
    //点击立即下单
    immediatelyOrder() {
      //方案
      this.scheme = util.getSessionStorageObj("setMealCode") || 'A'
      //判断少儿学平险；百万医疗险；国任.学子安康学平险,少儿全能保险；孕妇险,乐翻天专属医疗险，i行销—I康保女性计划,i行销—I康保少儿计划,i行销—I康保老年计划,i国任-一年期重疾险；百万医疗家庭版；
      if (this.saleCode == 'GRMOBILE_MALL_SL015' || this.saleCode == 'GRMOBILE_MALL_SL016' || this.saleCode == 'GRMOBILE_MALL_SL017' || this.saleCode == 'GRMOBILE_MALL_SL067' || this.saleCode == 'GRMOBILE_MALL_SL018' || this.saleCode == 'GRMOBILE_MALL_SL019' || this.saleCode == 'GRMOBILE_MALL_SL020' || this.saleCode == 'GRMOBILE_MALL_SL021' || this.saleCode == 'GRMOBILE_MALL_SL022' || this.saleCode == 'GRMOBILE_MALL_SL027' || this.saleCode == 'GRMOBILE_MALL_SL062'|| this.saleCode == 'GRMOBILE_MALL_SL073' || this.saleCode == 'GRMOBILE_MALL_SL081' || (this.saleCode == 'GRMOBILE_MALL_SL075' && (this.scheme == 'C' || this.scheme == 'D'))) {
        if (this.healthState) {//代表健康
          //正常下单
          this.trial(true)
        } else {
          this.show = true
        }
      } else {
        //正常下单
        setTimeout(() => {
          this.trial(true)
        }, 300);
      }

    },
    ascertain(res) {
      if (res == '1') {//健康
        this.healthState = true
        this.show = false
      } else {
        this.healthState = false
        this.show = false
        this.$toast('抱歉，根据您的健康告知，暂不接受本次投保');
      }
    },
    openPopup(res, index, sign) {
      this.columns = []
      this.index = index
      util.setSessionStorageObj("valueListIndex",index)
      this.sign = sign
      util.setSessionStorageObj("valueListSign",sign)
      this.showPicker = true;

      let dataRes = JSON.parse(res.selAmount);
      for (let i in dataRes) {
        this.columns.push(dataRes[i])
      }
    },
    onConfirm(valueList) {
      if (this.sign == 1) {
        this.pageData.mainRiskList[this.index].amount = valueList.value
        let productDetailData = util.getSessionStorageObj("productDetail");
        let setMealCode = util.getSessionStorageObj("setMealCode");
        if (mainRiskList) {
          productDetailData.content.riskInfo[setMealCode].mainRiskList[this.index].amount = valueList.value
          util.setSessionStorageObj("productDetail",productDetailData);
        }
      }
      if (this.sign == 2) {
        this.pageData.addRiskList[this.index].amount = valueList.value
        let productDetailData = util.getSessionStorageObj("productDetail");
        let setMealCode = util.getSessionStorageObj("setMealCode");
        if (productDetailData) {
          productDetailData.content.riskInfo[setMealCode].addRiskList[this.index].amount = valueList.value
          util.setSessionStorageObj("productDetail",productDetailData);
        }
      }

      this.showPicker = false;
      this.trial()//调用试算
    },
    showDataTimePicker(params) {
      this.$refs.datetimePicker.parentMsg(params)
    },
    updataDatetime(params) {
      this.pageData.startDate = params.datetime
      util.setSessionStorageObj("startDate", this.pageData.startDate);
    },
    async getDetail() {
      let productDetail = util.getSessionStorageObj("productDetail");
      let res = ''
      if (productDetail) {
        res = productDetail;
      } else if (this.$route.query.saleCode) {
        res = await this.$axios({
          url: this.$API.API_PRODUCT_DETAIL,
          method: 'post',
          data: {
            saleCode: this.$route.query.saleCode,
            type: sessionStorage.getItem('type'),
            system: sessionStorage.getItem('system')
          }
        });
      }
      this.getDetailData(res);
    },
    async getDetailData(res) {
      // 初始化-处理保险起期
      if( !this.pageData.startDate && res.content.salePlanInfo && res.content.salePlanInfo.data && res.content.salePlanInfo.data.startDate){
        this.updataDatetime({datetime: check.transformDatesTimetamp( '', '', parseInt(res.content.salePlanInfo.data.startDate)).split(' ')[0] })
      }
      let data = res.content;
      util.setSessionStorageObj("productDetail", res);
      if (data.result == '1') {
        this.$toast(data.resultMessage);
        return;
      }

      this.pageData.salePlanInfo = data.salePlanInfo;
      if(this.$route.query.saleCode == 'GRMOBILE_MALL_SL031'){ //深圳专版疫苗险专用
        this.pageData.salePlanInfo.data['setMealCode'] =  util.getSessionStorageObj("setMealCode") || 'A';
      }
      var salePlanInfo = util.getSessionStorageObj('salePlanInfo');//销售方案基本信息
      if (salePlanInfo) {
        this.pageData.salePlanInfo = salePlanInfo;
      } else {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var mon = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var day = nowDate.getDate() < 10 ? "0" + (nowDate.getDate()) : nowDate.getDate();
        if (this.pageData.salePlanInfo) {
          this.pageData.salePlanInfo.data['beginDate'] = year + "-" + mon + "-" + day;
          this.pageData.salePlanInfo.data['endDate'] = check.getNewDate(year + "-" + mon + "-" + day,
            this.pageData.salePlanInfo.data['insuYearUnit']);
        }
      }

      // 根据套餐获取 险种信息
      if (this.pageData.salePlanInfo) {
        var setMealCode = this.pageData.salePlanInfo.data['setMealCode'];
        this.pageData.setMealCode = setMealCode;
        this.pageData.mainRiskList = data.riskInfo[setMealCode].mainRiskList;//主险
        this.pageData.addRiskList = data.riskInfo[setMealCode].addRiskList;//附加险
      } else {
        this.pageData.mainRiskList = data.riskInfo.mainRiskList;//主险
        this.pageData.addRiskList = data.riskInfo.addRiskList;//附加险
      }
      var mainRiskList = util.getSessionStorageObj('mainRiskList');//主险
      if (mainRiskList) {
        this.pageData.mainRiskList = mainRiskList;
      }
      if (this.pageData.mainRiskList) {
        this.pageData.mainRiskList.forEach((index, obj) => {
          var riskPlanList = util.getSessionStorageObj('riskPlanList');
          if (riskPlanList) {
            this.pageData.riskPlanList = riskPlanList;
          } else {
            this.pageData.riskPlanList = obj.riskPlanList;
          }
          //   this.pageData.mainRiskList.forEach((_index, _obj)=>{
          $.each(obj.riskPlanList, function (_index, _obj) {
            if (obj.planCode == _obj.planCode) {
              var planCode = util.getSessionStorageObj('planCode');
              if (planCode) {
                this.pageData.planCode = planCode;
              } else {
                this.pageData.planCode = _obj.planCode;
              }
              var dutyList = util.getSessionStorageObj('dutyList');
              if (dutyList) {
                this.pageData.dutyList = dutyList;
              } else {
                this.pageData.dutyList = _obj.mainRiskDutyList;
              }
              var agreeButton = util.getSessionStorageObj('agreeButton');
              if (agreeButton) {
                this.pageData.agreeButton = agreeButton;
              } else {
                this.pageData.agreeButton = _obj.mainRiskAgreeButton;
              }
              var amt = util.getSessionStorageObj('amt');
              if (amt) {
                this.pageData.amt = amt;
              } else {
                //指定保额
                var sumAmt = 0;
                $.each(_obj.mainRiskDutyList, function (dutyIndex, dutyObj) {
                  if (dutyObj.amt) {
                    sumAmt += this.decimal(dutyObj.amt, 2);
                  }
                });
                if (sumAmt !== 0) {
                  this.pageData.amt = sumAmt;
                }
              }
            }
          });
          var mult = util.getSessionStorageObj('mult');
          if (mult) {
            this.pageData.mult = mult;
          } else {
            if (obj.mult) {
              this.pageData.mult = obj.mult;
            }
          }
        });
      }

      var addRiskList = util.getSessionStorageObj('addRiskList');//附加险
      if (addRiskList) {
        this.pageData.addRiskList = addRiskList;
      }
      var sumPrem = util.getSessionStorageObj('sumPrem');//总保费
      if (sumPrem) {
        this.pageData.sumPrem = sumPrem;
      }
      //   this.$.hideMainPageLoader();

      this.pageData.saleTopPic = data.saleTopPic;
      this.pageData.saleNameDesc = data.saleNameDesc;
      this.pageData.saleTipDesc = data.saleTipDesc;
      this.pageData.proposalCode = data.proposalCode;
      this.pageData.coverageList = data.coverageList;
      this.pageData.tabsList = data.tabsList;
      this.pageData.notificationList = data.notificationList;
      if (!this.pageData.agreeButton) {
        this.pageData.agreeButton = data.agreeButton;
      }
      this.pageData.isCoverageMapper = data.isCoverageMapper;
      var insureNum = util.getSessionStorageObj('insureNum');
      if (insureNum) {
        this.pageData.insureNum = insureNum;
      }
      //进行试算
      this.trial();

      var isAgree = util.getSessionStorageObj('isAgree');//是否同意
      if (isAgree) {
        this.pageData.isAgree = isAgree;
      }
      if (this.pageData.isAgree) {//同意勾选
        $("#color-input-red").attr("checked", true);
      }

      this.setInsureNum(data);
    },

    // 设置投保人数
    setInsureNum(data) {
      let insureNumData = data.salePlanInfo.struct.filter(item => item.code == 'insureNum');
      if (insureNumData.length) {
        util.setSessionStorageObj("insureNumData", insureNumData[0].data[insureNumData[0].data.length - 1].value);
      }
    },

    //核心计算方法  价值 10亿 哈哈
    trial(isSubmit) {
      var _this = this;

      _this.pageData.trialToRisk = false;
      //验证是否试算
      var trialFlag = _this.trialVerif();

      if (trialFlag) { //通过验证
        //开始试算
        _this.trialInner(isSubmit);
      }

    },

    //试算校监
    trialVerif() {
      var _this = this;
      _this.trialObj = {};
      _this.trialObj.saleCode = this.$route.query.saleCode; //销售计划code
      _this.trialObj.salePlanInfo = _this.pageData.salePlanInfo;//整个销售方案节点
      _this.trialObj.amt = _this.pageData.amt;//保额
      _this.trialObj.mult = _this.pageData.mult;//份数
      _this.trialObj.planCode = _this.pageData.planCode;//计划编码
      if (_this.pageData.salePlanInfo) {
        _this.trialObj.setMealCode = _this.pageData.salePlanInfo.data['setMealCode']; //销售套餐code
        _this.trialObj.insuYearUnit = _this.pageData.salePlanInfo.data['insuYearUnit']; //保险期限
        util.setSessionStorageObj('setMealCode', _this.pageData.salePlanInfo.data['setMealCode']);//套餐code
        util.setSessionStorageObj('insuYearUnit', _this.pageData.salePlanInfo.data['insuYearUnit']);//保险期间
      }

      util.setSessionStorageObj('saleCode', this.$route.query.saleCode);//销售计划code
      util.setSessionStorageObj('salePlanInfo', _this.pageData.salePlanInfo);//整个销售方案节点

      //首选验证试算的必要参数有没有数据
      var isPass = false;
      //验证被保人

      _this.trialObj.mainRiskList = [];//主险列表

      //验证主险 列表
      var mainRiskList = _this.pageData.mainRiskList;

      $.each(mainRiskList, function (_index, _obj) { //验证主险列表
        console.log('主险[' + _obj.riskCode + ']参数[:' + JSON.stringify(_obj.data) + ']');
        if (isPass) return false;
        $.each(_obj.data, function (__index, __obj) { //循环验证单个主险值是否为空
          if (null == __obj || '' == __obj) {
            console.log('主险[' + _obj.riskCode + '][' + __index + ']是空!!!');
            isPass = true;
            return false;
          }
        });
        //如果验证通过放入计算对象
        _this.trialObj.mainRiskList.push($.extend({riskCode: _obj.riskCode, code: _obj.code, riskType: _obj.riskType, riskShowOrder: _obj.riskShowOrder }, _obj.data));

      });

      // 主险是否有的值为空
      if (isPass) {
        console.log('主险参数为空停止计算.');
        return false;
      }
      _this.trialObj.addRiskList = [];//附加险列表

      //验证附加 列表
      var addRiskList = _this.pageData.addRiskList;
      $.each(addRiskList, function (_index, _obj) { //验证附加险列表

        console.log('附加激活的[' + _obj.riskCode + ']参数[:' + JSON.stringify(_obj.data) + ']');
        if (isPass) return false;
        $.each(_obj.data, function (__index, __obj) { //循环验证单个附加值是否为空
          if (null == __obj || '' == __obj) {
            console.log('附加[' + _obj.riskCode + '][' + __index + ']是空!!!');
            isPass = true;
            return false;
          }
        });

        _this.trialObj.addRiskList.push($.extend({ riskCode: _obj.riskCode, code: _obj.code, mainRiskCode: _obj.mainRiskCode, riskType: _obj.riskType, riskShowOrder: _obj.riskShowOrder }, _obj.data));

      });

      //附加险是否有的值为空
      if (isPass) {
        console.log('附件险参数为空停止计算.');
        return false;
      }
      return true;
    },

    //四舍五入 num数 v保留几位小数
    decimal(num, v) {
      var vv = Math.pow(10, v);
      return Math.round(num * vv) / vv;
    },

    async trialInner(isSubmit) {
      if (isSubmit) {
        this.trialLoading = "true"
      }
      let trialObj;
      if (util.getSessionStorageObj('trialObj')) {
        trialObj = util.getSessionStorageObj('trialObj');
      } else {
        trialObj = this.trialObj;
        trialObj.type = sessionStorage.getItem('type');
        trialObj.system = sessionStorage.getItem('system');
        util.setSessionStorageObj('trialObj', this.trialObj);
      }
      let insureInfo = util.getSessionStorageObj('insureInfo');
      //特殊处理疫苗险 RMOBILE_MALL_SL032 试算时需要多传amount参数
      if(this.saleCode =='GRMOBILE_MALL_SL032'){
        if (this.sign == 1 && this.index) {
          let productDetailData = util.getSessionStorageObj("productDetail");
          let setMealCode = util.getSessionStorageObj("setMealCode");
          trialObj.mainRiskList[this.index].amount = productDetailData.content.riskInfo[setMealCode].mainRiskList[this.index].amount || this.pageData.mainRiskList[this.index].amount
        }
        if (this.sign == 2 && this.index) {
          let productDetailData = util.getSessionStorageObj("productDetail");
          let setMealCode = util.getSessionStorageObj("setMealCode");
          trialObj.addRiskList[this.index].amount = productDetailData.content.riskInfo[setMealCode].addRiskList[this.index].amount || this.pageData.addRiskList[this.index].amount
        }
      }

      //是否多被保人
      if(insureInfo){
        trialObj.isMultiple = insureInfo.isMultiple || ''
        if(insureInfo.tagsList.length >= 1){
          trialObj.salePlanInfo.data['cost'] = insureInfo.tagsList[0].data.engineer_cost || ''; //工程造价
        }
      }else{
        trialObj.isMultiple = ''
      }
      const res = await this.$axios({
        url: this.$API.API_MAKE_CALCMOBILE,
        loading: this.trialLoading,
        method: 'post',
        data: trialObj
      });
      this.trialLoading = "false";
      if (res.code === 0 && res.content.result != '1') {
        let data = res.content;
        //总保费
        this.pageData.sumPrem = data.sumPrem;
        // 优惠金额
        this.pageData.discountPrem = data.discountPrem || 0;
        this.pageData.flag = data.flag || 0;
        //计算结果
        this.pageData.readyMainRiskList = data.mainRiskList;
        this.pageData.readyAddRiskList = data.addRiskList;
        this.pageData.mainRiskList = data.mainRiskList;
        this.pageData.addRiskList = data.addRiskList;
        // 保存价格
        if (this.pageData.mainRiskList[0].insurePremMap) {
          util.setSessionStorageObj("insurePremMap", this.pageData.mainRiskList[0].insurePremMap);
          this.$refs.multipleInfo.parentPremMap();
        }

        // 提交立即下单
        if (isSubmit) {
          util.setSessionStorageObj("sumPrem", this.pageData.sumPrem);
          util.setSessionStorageObj("readyMainRiskList", this.pageData.readyMainRiskList);
          util.setSessionStorageObj("readyAddRiskList", this.pageData.readyAddRiskList);
          productDetail.goConfirm("showProductDetail", this.$route.query.channelType, this.$route.query.nickName, this.$route.query.msId);
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
      //结束
      //console.log('开始试算....完成');
    },

    //保单生效日期选择后处理方法
    beginDateEvent(type, item, obj) {
      var _this = this;
      console.log(obj)

      if (item.code == 'beginDate') {
        var beginDate = this.pageData.salePlanInfo.data['beginDate'];
        var insuYearUnit = this.pageData.salePlanInfo.data['insuYearUnit']
        _this.pageData.salePlanInfo.data['endDate'] = check.getNewDate(beginDate, insuYearUnit);
      }

    },
    detailShowModal(notification) {
      console.log('notification', notification);
      var _this = this;
      if (notification) {
        this.openModal = {
          title: notification.notifiName,
          text: notification.notifiContent
        }
        this.$refs.openModal.parentMsg();
      }
    },

    mainRiskEvent(e, objData) {
      var _this = this;
      if (_this.pageData.mainRiskList) {
        $.each(_this.pageData.mainRiskList, function (index, obj) {
          if ("mult" == objData) {
            _this.pageData.mult = e.value;
            $.each(obj.data, function (dataIndex, dataObj) {
              dataObj.mult = e.value;
            });
          }
          $.each(obj.riskPlanList, function (_index, _obj) {
            if (e.value == _obj.planCode) {
              $.each(obj.data, function (dataIndex, dataObj) {
                dataObj.mult = e.value;
              });
              _this.pageData.planCode = e.value;
              _this.pageData.dutyList = _obj.mainRiskDutyList;
              _this.pageData.agreeButton = _obj.mainRiskAgreeButton;
              //指定保额
              var sumAmt = 0;
              $.each(_obj.mainRiskDutyList, function (dutyIndex, dutyObj) {
                if (dutyObj.amt) {
                  sumAmt += _this.decimal(dutyObj.amt, 2);
                }
              });
              if (sumAmt !== 0) {
                _this.pageData.amt = sumAmt;
              }
            }
          });
        });
      }

      //移除附加险
      _this.removeTrialAddRiskAll();
      var mainRiskList = _this.pageData.mainRiskList;
      console.log('###########################add mainRiskEvent');
    },
    //移除全部时段中的附加险
    removeTrialAddRiskAll() {
      var _this = this;
      var trialList = _this.pageData.trialAddRiskList;
      if (trialList && trialList.length > 0) {
        var _rmobjArrays = _this.pageData.trialAddRiskList.splice(0, trialList.length);
        $.each(_rmobjArrays, function (_index, _obj) {
          var removeStruct = _obj.struct;
          var removeData = _obj.data;
          $.each(removeStruct, function (__index, __obj) {
            removeData[__obj.code] = __obj.val;
          });
          _this.pageData.addRiskList.push(_obj);
        });
      } else {
        console.log('没有要删除的试算数组的险种');
      }
      //赋值完成才进行试算
      _this.trial();
    },
    //点击移除附加险种 到 可选择列表
    removeTrialRiskToCal(index) {
      var _this = this;
      var _obj = _this.pageData.trialAddRiskList.splice(index, 1);
      console.log('remove 获取点击的对象:');
      if (_obj && _obj.length == 1) {
        //往需要试算的数组添加 这个对象
        var removeStruct = _obj[0].struct;
        var removeData = _obj[0].data;
        $.each(removeStruct, function (__index, __obj) {
          removeData[__obj.code] = __obj.val;
        });
        _this.pageData.addRiskList.push(_obj[0]);
        //赋值完成才进行试算
        _this.trial();
      } else {
        console.log('remove 获取点击的对象为空');
      }
    },
    //修改个附加险
    addTrialRiskEvent(item, e) {
      var _this = this;
      console.log('###########################add risk');
      if (item.code == 'age') {
        if (e.value > 50) {
          _this.removeTrialAddRiskAll();
          this.$toast('投保人年龄大于50周岁不能添加附加险');
        }
      }
      //进行试算
      _this.trial();
    },
    salePlanEvent(item, obj) {
      // 记录选择的分数,到投保录入页面时用于显示多少个被保人信息录入
      if (item.code === 'insureNum') {
        this.pageData.insureNum = obj.value;
      }
      if (item.code === 'insuYearUnit') {
        let trialObj = util.getSessionStorageObj('trialObj');
        //特殊处理insuYearUnit字段，因为有2个产品都使用这个字段，一个是输入框一个是选择框取值不一样
        //GRMOBILE_MALL_SL042
        if(this.saleCode == 'GRMOBILE_MALL_SL042'){
            let unit = obj.indexOf('D') // 判断有没有单位D
            if(unit == '-1'){ //等于-1没有
              trialObj.salePlanInfo.data.insuYearUnit = obj ? obj+'D' : '';
            }else{
              trialObj.salePlanInfo.data.insuYearUnit = obj;
            }
          this.pageData.salePlanInfo.data[item.code] = trialObj.salePlanInfo.data.insuYearUnit
        }else{
          //GRMOBILE_MALL_SL031
          trialObj.salePlanInfo.data.insuYearUnit = obj.value;
        }
        util.setSessionStorageObj('trialObj', trialObj);
      }
      if (item.code === 'mult') {
        let trialObj = util.getSessionStorageObj('trialObj');
        trialObj.salePlanInfo.data.mult = obj.value;
        util.setSessionStorageObj('trialObj', trialObj);
      }
      if (item.code === 'cost') {
        let trialObj = util.getSessionStorageObj('trialObj');
        trialObj.salePlanInfo.data.cost = obj;
        util.setSessionStorageObj('trialObj', trialObj);
      }
      this.trial();

    },

    // 方案选择
    programmeInfo(name, title) {
      this.index = '' //清空主险和附加险选中的下标（GRMOBILE_MALL_SL032专用）
      util.setSessionStorageObj("schemeActive", this.schemeActive);
      let trialObj = util.getSessionStorageObj('trialObj');
       //获取产品详情险别列表
      let productDetail = util.getSessionStorageObj("productDetail");
      if (trialObj.salePlanInfo.struct && trialObj.salePlanInfo.struct.length) {
        for (let item of trialObj.salePlanInfo.struct) {
          if (item.code == 'setMealCode') {
            trialObj.salePlanInfo.data.setMealCode = item.data[name].value
            this.pageData.salePlanInfo.data.setMealCode = item.data[name].value
             //更新险别列表
            trialObj.addRiskList = productDetail.content.riskInfo[item.data[name].value].addRiskList
            trialObj.mainRiskList = productDetail.content.riskInfo[item.data[name].value].mainRiskList
          }
        }
      }
      // trialObj.salePlanInfo.data.plan =  (name + 1);
      util.setSessionStorageObj('trialObj', trialObj);
      this.trial();
      this.setSeatCount();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    contentScroll(e) {
      let scrollTop = this.$refs.scrollContent.scrollTop;
      util.setSessionStorageObj("productDetailScrollTop", scrollTop);
    },
    // 录入信息接口
    async getInsureInit() {
      if (!util.getSessionStorageObj('insureInfo')) {
        let isExemption = util.getSessionStorageObj('isExemption');//豁免险标识
        const res = await this.$axios({
          url: this.$API.API_INSURE_INPUT_INIT,
          method: 'post',
          data: {
            saleCode: this.saleCode,
            isExemption: isExemption || '',
            type: sessionStorage.getItem('type'),
            system: sessionStorage.getItem('system'),
            insureNum: 1
          }
        });
        res.content.tagsListBackups = res.content.tagsList
        util.setSessionStorageObj('insureInfo', res.content);
        if (res.content.programmeInfoList) {
          if(this.orderArea != ''){
            this.programmeInfoList.push(res.content.programmeInfoList[this.schemeActive]);
          }else{
            this.programmeInfoList = res.content.programmeInfoList;
          }
        }
      } else {
        let insureInfo = util.getSessionStorageObj('insureInfo');
        if (insureInfo.programmeInfoList) {
          if(this.orderArea != ''){
            this.programmeInfoList.push(insureInfo.programmeInfoList[this.schemeActive]);
          }else{
            this.programmeInfoList = insureInfo.programmeInfoList;
          }
        }
      }

      this.setSeatCount();
    },

    // 车座设置 saleCode=GRMOBILE_MALL_SL002
    setSeatCount() {
      let insureInfo = util.getSessionStorageObj('insureInfo');
      if (this.saleCode == "GRMOBILE_MALL_SL002" && insureInfo.tagsList && insureInfo.tagsList.length && insureInfo.tagsList[0].struct) {
        for (let item of insureInfo.tagsList[0].struct) {
          if (item.code == 'seatCount') {
            console.log('this.schemeActive', this.schemeActive);
            if (this.schemeActive == '0') {
              item.data = [{ text: "5座", value: "5" }];
              insureInfo.tagsList[0].data.seatCount = "5";
            } else {
              item.data = [{ text: "6座", value: "6" }, { text: "7座", value: "7" }, { text: "8座", value: "8" }, { text: "9座", value: "9" }];
              insureInfo.tagsList[0].data.seatCount = "";
            }
          }
        }
      }
      util.setSessionStorageObj('insureInfo', insureInfo);
      EventBus.$emit('parentMsg');
    },
    async getWxAccountDetails() {
      if(!this.$route.query.agentCode){
        return
      }
      const res = await this.$axios({
        url: this.$API.API_WX_ACCOUNT_DETAILS,
        method: 'get',
        params: {
          agentCode: this.$route.query.agentCode
        }
      });
      this.wxAccountName = res.content && res.content.name ? res.content.name : ''
    }
  },
  mounted() {
    let productDetailScrollTop = util.getSessionStorageObj("productDetailScrollTop");
    if (productDetailScrollTop) {
      this.$refs.scrollContent.scrollTop = productDetailScrollTop;
    }

    EventBus.$on('parentMsg', () => {
      setTimeout(() => {
        if (this.$refs.appntInfo) {
          this.$refs.appntInfo.parentMsg();
        }
        if (this.$refs.multipleInfo) {
          this.$refs.multipleInfo.parentMsg();
        }
        if (this.$refs.singleInfo) {
          this.$refs.singleInfo.parentMsg();
        }
        if (this.$refs.beneficiary) {
          this.$refs.beneficiary.parentMsg();
        }
        if (this.$refs.carInfo) {
          this.$refs.carInfo.parentMsg();
        }
        if (this.$refs.tagsList) {
          this.$refs.tagsList.parentMsg();
        }
      }, 100);
    });

    // 调起试算
    EventBus.$on('parentTrial', () => {
      this.trial();
    });
  },
  beforeDestroy() {
    EventBus.$off('parentTrial');
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/home/productDetail.less';
@import '../../assets/less/app/product/productDetail.less';
#app.iosSystem .productDetailPage .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .productDetailPage .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.productDetailPage {
  .fosize14{
    font-size: 16px!important;
  }
  .notify_box .select_box {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .notify_box .notify_content {
    margin: auto;
    height: 100%;
    overflow: scroll;
    width: 93%;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .notify_box .notify_content .notify {
    padding: 10px;
    position: revert;
    height: 56vh;
    p {
      margin: 6px 0;
      font-size: 14px;
    }
  }
  .show_div{
    display: flex;
    justify-content: center;
    align-items: center;
    .show_txt{
      font-size: 14px;
      height: 28px;
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .duty_name{
    font-size: 16px;
    padding: 0.4rem 16px;
    margin: 0 0 1px 0;
    background: white;
  }
}
.productDetailcontent {
  p {
    margin: 0;
  }
}
</style>
