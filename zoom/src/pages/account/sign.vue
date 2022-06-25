<template>
  <div class="page-group">
		<div class="page page-current" id="sign-page">
      <!-- <header class="bar bar-nav">
        <a class="button button-link button-nav pull-left back"><span class="icon icon-left"></span> &nbsp; </a>
        <h1 class="title">考试</h1>
      </header> -->
      <v-header class="bar bar-nav" :title="{ name: '协议签署' }"></v-header>
      <div class="content sign-page" :style="{ 'margin-top': ($iosSystem + 48) + 'px', top: 0 }" >
        <!-- <van-steps :active="active" class="mystep" active-color="#1989fa">
          <van-step>收集资料</van-step>
          <van-step>在线考试</van-step>
          <van-step>签署合同</van-step>
        </van-steps> -->
        <img width="100%" :src="$CTXBASE + '/img/account/approval_nav.png'" alt="">
        <div class="signbox">
          <div class="sign-title">永创达保险销售有限公司个人保险代理合同书</div>
          <div class="sign-no">合同编号:213123123213</div>
          <div class="sign-con">
            <p><span class="fwb">委托人（甲方）名称：</span>永创达保险销售有限公司</p>
            <p><span class="fwb">地址：</span>深圳市龙华区民治街道新牛社区布龙路1010号智慧谷创新园821 </p>
            <p><span class="fwb">邮政编码：</span> </p>
            <p><span class="fwb">经营许可证号码：</span>210162000000800</p>
            <p><span class="fwb">负责人：</span>杜 皓</p>

            <p><span class="fwb">代理人（乙方）姓名：</span>{{ userName }}</p>                      
            <p><span class="fwb">电话：</span>{{ mobileNo }}</p>                      
            <p><span class="fwb">身份证号码：</span>{{ idCardNo }}</p>
            <p><span class="fwb">《保险代理从业人员资格证书》编号：</span></p>
            <p class="fwb">一、 总则 </p>
 
            <p>第一条 依据《中华人民共和国民法通则》、《中华人民共和国合同法》、《中华人民共和国保险法》、《保险营销员管理规定》、《保险公司中介业务违法行为处罚办法》等法律法规，甲乙双方本着平等自愿、协商一致的原则，签订本保险代理合同。 </p>
            <p>第二条 甲方委托乙方在甲方授权范围内，以甲方的名义代甲方办理保险业务；乙方在本合同有效期内，按照约定范围依法合规从事代理活动所产生的保险责任由甲方承担。 </p>
            <p>第三条 本保险代理合同不是劳动合同，本合同及相关文件内容均不直接或间接构成甲方与乙方之间有雇主与雇员关系；但甲方应按本合同约定向乙方支付代理手续费（简称佣奖，下同）。 </p>
            
            <p class="fwb">二、 授权及代理内容 </p>
            
            <p>第四条 本合同有效期内，乙方在甲方授权范围内，依法合规代为办理保险业务的行为，由甲方承担相应的保险责任。乙方超越本合同甲方书面的授权范围的代理行为以及其他乙方未依法合规所为的代理行为，由乙方承担责任。 </p>
            <p>第五条 代理内容 </p>
            <p>（一）在本合同有效期内乙方可在甲方授权的经营范围内以甲方名义代理甲方办理保险业务，仅包括销售甲方代理的个人人身保险产品、团体保险产品、财产保险产品。 </p>
            <p>（二）甲方根据业务发展需要有权对乙方代理的业务区域、险种及其他授权内容进行调整； </p>
            <p>（三）乙方代理保险业务的行为限于： </p>
            <p>1、向客户宣传、介绍、推荐甲方代理的个人人身保险产品、团体保险产品、财产保险产品；  </p>
            <p>2、指导客户正确填写投保单，并要求客户履行如实告知义务，如如实告知保险标的风险情况的相关事项等；</p> 
            <p>3、及时将投保人填写的投保单、客户资料等相关的投保材料交付甲方，并如实告知甲方有关影响承保和承保费率的情况；</p> 
            <p>4、及时将甲方代理的保险公司签发的保险单、保险费发票等相关单证及时交付给投保人；</p>  
            <p>5、接受客户咨询；</p> 
            <p>6、提供相关售后服务；</p> 
            <p>7、甲方书面委托的其他事项。 </p>
            <p>（四）乙方不得处理下列事项： </p>
            <p>1、签发或批改保险单和保险费收据； </p>
            <p>2、核保，核赔及赔付； </p>
            <p>3、其他未经甲方书面授权的事项； </p>
            <p>4、保险监管机构明令禁止的相关事项。 </p>
            
            <p class="fwb">三、 保费收取和缴付 </p>
            
            <p>第六条 乙方不得为客户垫缴保险费，乙方缴至甲方的保险费一律视为是由投保人缴纳的。 </p>
            <p>第七条 任何情况下，乙方均不得使用自己的姓名和账户收款。乙方应在 3 个工作日内按甲方规定的方式将以甲方代理人身份收取的全部保险费及时缴至甲方，不得挪作他用。 </p>
            <p>第八条 乙方代理的保险合同项下的保险费到达保险公司账户，保险公司同意承保并核对应当到账保费无误后出具保险单。 </p>
            <p>乙方收到保险人签发的保险单正本后3个工作日内，应当将保险单送达投保人。 </p>
            
            
            <p class="fwb">四、 佣奖管理 </p>
            
            <p>第九条 佣奖的支付</p> 
            <p>（一）甲方根据乙方代理的保险费收入支付乙方佣奖，其内容包含但不限于基础佣金、奖金、津贴、福利等项目。具体支付标准由甲方按不同险种、不同缴费期限和不同缴费方式确定，并予公布。甲方根据业务发展需要可以统一对佣奖的标准进行调整，并予公布。</p> 
            <p>（二）财产保险、团体保险的佣奖以人民币现金或转账的方式支付。 </p>
            <p>（三）个人人身保险佣奖的支付按《永创达保险销售基本管理办法》进行，详见甲方的管理办法文件。   （四）同时符合以下五个条件，乙方才有权要求甲方支付代理佣奖： </p>
            <p>1、投保单由乙方签署姓名、代码，并且经过甲方初核，甲方（或甲方所代理保险公司）已据此签出保险单。 </p>
            <p>2、甲方（或甲方所代理保险公司）已收到相应的保险费。 </p>
            <p>3、乙方遵守代理合同的各项规定。</p> 
            <p>4、在本合同有效期内。</p> 
            <p>5、个人人身保险保单在监管规定的犹豫期内未撤单并回访成功,且满足《永创达保险销售基本管理办法》中各项规定的。 </p>
            <p>（四）出现本合同第五条第（四）款情况时，甲方不再支付乙方相关的代理手续费。 </p>
            <p>（五）不论本代理合同是否终止，投保人于签收保险单后十日内要求解除合同或由于乙方的过错致使投保人解除合同时，乙方无权获得与所退还保险费相关的代理手续费，已领取的必须退还甲方。 </p>
            <p>第十条 如客户退保造成甲方代理的保险合同终止或甲方代理的保险合同无效，导致保险人退还客户已缴保费，乙方必须将因该合同所领取的代理佣在保险人退还客户保险费后3个工作日内退还甲方。</p> 
            <p>客户减保造成甲方代理的保险合同项下的保险费减少的，乙方应当在保险人退还客户保险费3个工作日内，将该部分保险费所对应的佣奖退还甲方。 </p>
            <p>乙方未能依据上述约定及时退还佣奖的，甲方有权在与乙方结算佣奖时直接扣减。 </p>
            <p>乙方因本条承担的退还佣奖义务不因本合同终止而免除。 </p>
            
            <p class="fwb">五、 权利及义务</p> 
            
            <p>第十一条 甲方权利 </p>
            <p>（一）有权根据国家有关法律、法规和行政规章制定和修改各项管理办法和规章制度，随时对佣奖计提比例、支付方式等事项的有关规定进行修改与补充，并通知乙方； </p>
            <p>（二）对乙方代理的业务进行风险控制及管理，对乙方在授权范围内招揽的保险业务具有最后决定权，有权决定予以承保或者不予以承保； </p>
            <p>（三）有权对乙方的代理活动进行监督、管理、检查；（四）有权代扣乙方应缴纳的税款； </p>
            <p>（五）当客户向甲方提出要求变更为其服务的代理人时，甲方有权将该客户的保险单变更为其他代理人或由甲方直接提供服务，并书面通知乙方； </p>
            <p>（六）甲方有权制止和纠正乙方越权代理行为和违反保险法律、法规及甲方有关保险业务和管理规定的行为。有此类行为发生的，甲方有权终止其代理权并要求乙方赔偿甲方因此遭受的直接和间接损失； </p>
            <p>（七）如遇监管规定变化或国家政策调整，甲方有权提前终止本代理合同。此种情况不属于甲方违约。 </p>
            <p>第十二条 甲方义务</p> 
            <p>（一）按照本合同约定向乙方支付佣奖； </p>
            <p>（二）向乙方提供开展代理业务所必需的证件、资料、单证及提供必要的帮助； </p>
            <p>（三）为乙方开展代理业务提供必要的培训； </p>
            <p>（四）履行保险监管部门规定的对乙方历史诚信记录及其他有关事项的管理职责。 </p>
            <p>第十三条 乙方权利</p> 
            <p>（一）在甲方授权范围内依法合规从事保险代理活动； </p>
            <p>（二）要求甲方支付佣奖；</p> 
            <p>（三）要求甲方提供有关证件、保险单证和资料；（四）拒绝甲方的违法、违规和非书面委托事项。 </p>
            <p>第十四条 乙方义务</p>
            <p>（一）遵守国家有关法律、法规和行政规章以及甲方制定的与乙方代理业务相关的规章制度，遵守职业操守，维护甲方及投保人、被保险人和受益人的合法利益，塑造甲方良好的社会形象；</p> 
            <p>（二）按时参加甲方组织的有关培训、会议和研讨等活动；</p> 
            <p>（三）为客户提供收费、送单、咨询、协助变更保险单和协助办理理赔申领事宜等服务；</p> 
            <p>（四）按照甲方的要求对活动和业绩情况进行记录；</p>
            <p>（五）承担与开展代理业务有关的一切费用；</p>
            <p>（六）在领取有关单证时，按甲方规定履行签收手续；</p> 
            <p>（七）乙方应妥善保管好从甲方领取的有关证件、保险单证、资料和文件等，如因乙方保管不善或乙方原因给甲方造成损失的，乙方应承担相关赔偿和法律责任； </p>
            <p>（八）保守甲方和所代理客户的商业秘密。商业秘密包括但不限于甲方的技术信息、经营信息、客户资料（客户的个人隐私及财产、业务、家庭情况等）； </p>
            <p>（九）按甲方要求确定展业身份称谓，不向投保人作任何与保险业务有关的虚假宣传、承诺和误导性销售； </p>
            <p>（十）非经甲方书面授权，不为甲方以外保险机构代理保险业务；不以甲方代理人的身份兼职从事其他职业；不得举办招聘推介会、发布招聘信息，不得面试他人；</p> 
            <p>（十一）乙方在代理保险业务时，应遵守反洗钱法律法规的规定，并向甲方提供详细、准确、有效的客户身份信息资料及其他为履行反洗钱义务而需要乙方协助提供的资料； </p>
            <p>（十二）不得伪造、擅自变更保险合同，销售虚假保险单证，或者为保险合同当事人提供虚假证明材料； </p>
            <p>（十三）不得阻碍投保人履行如实告知义务或者诱导其不履行如实告知义务；</p> 
            <p>（十四）不得虚构保险代理业务或者编造退保，套取保险佣奖；</p> 
            <p>（十五）不得虚假理赔；</p> 
            <p>（十六）不得串通投保人、被保险人或者受益人骗取保险金；</p> 
            <p>（十七）不得有其他欺骗投保人、被保险人、受益人或甲方的行为；</p> 
            <p>（十八）不得给予或者承诺给予甲方及其工作人员、投保人、被保险人或者受益人合同约定以外利益；</p> 
            <p>（十九）不得利用业务之便为其他机构或个人牟取不正当利益；</p> 
            <p>（二十）不得代替投保人签署保险合同。</p> 
            
            <p class="fwb">六、 合同变更、解除与终止</p>
            
            <p>第十五条 在本合同有效期内，根据国家有关法律法规和行政规章等，甲乙双方协商一致，可依法对保险代理的地域范围、险种范围、代理佣奖标准、保证人等合同内容进行变更，并订立补充协议予以约定。</p> 
            <p>第十六条 甲乙双方均可以提前30日以书面通知的方式向对方提出解除本合同，30日期限届满，本合同即行解除。</p> 
            <p>乙方有下列情形之一的，甲方可随时提出解除本合同：</p> 
            <p>（一）违反本合同约定的；</p> 
            <p>（二）不符合个人代理人条件，或丧失代理人资格的；</p> 
            <p>（三）达不到甲方培训、业绩考核的合同维持条件要求的；</p> 
            <p>（四）有违法犯罪或损害甲方信誉行为的；</p> 
            <p>（五）对甲方有欺骗行为的；</p> 
            <p>（六）保证人违反或解除《个人代理人保证合同书》且乙方不能提供甲方认可的其他保证人担保的；</p> 
            <p>（七）法律法规或甲方规章制度规定的其他情形。</p>   
            <p>第十七条 有下列情形之一的，本合同的权利义务即行终止：</p> 
            <p>（一）乙方年满70周岁； </p>
            <p>（二）乙方成为无行为能力或限制行为能力人； </p>
            <p>（三）法律规定的其他应当终止的情形。 </p>
            <p>第十八条 合同终止有关事宜 </p>
            <p>本合同终止后，乙方应立即按规定与甲方办理交接手续，乙方应向甲方交回钱款、展业证书、本合同、保险条款、单证、文件、手册、其他印有甲方公司名称的印刷品以及由其保存的表格和文件；提交甲方需要的与甲方业务情况有关的台账和记录(客户记录、资料)的复印件。 </p>
            <p>本合同终止后，乙方不得再以甲方代理人名义从事任何活动。 </p>
            
            <p class="fwb">七、 违约责任 </p>
            
            <p>第十九条 违约责任及追偿</p> 
            <p>（一）甲方超过规定的时间向乙方支付代理佣奖，每日按照应当支付代理佣奖的千分之一向乙方支付滞纳金。若因乙方的原因致使甲方不能及时向乙方支付代理佣奖的，甲方不受本款约束； </p>
            <p>（二）乙方违反本合同中关于乙方的义务、禁止行为、保护甲方资产等规定，给甲方造成损失（包括直接损失和间接损失）的，由乙方承担赔偿责任，构成犯罪的，甲方将依法追究其法律责任；如乙方对客户的民事责任由甲方先行承担的，甲方有权在乙方的佣奖中扣除甲方先行承担的部分；对不足以弥补甲方损失的部分，甲方有权继续向乙方进行追偿，同时甲方有权解除本合同；</p> 
            <p>（三）乙方超出甲方授权范围或者在代理合同终止后仍以甲方名义进行的活动，除经甲方追认的以外由乙方自行承担责任；给甲方造成损失的，还应当赔偿甲方因此遭受的损失，包括直接损失和间接损失； </p>
            <p>（四）甲方不履行合同义务或违反合同规定，乙方有权提前30 日以书面方式通知甲方后提出解除本合同，给乙方造成损失的，乙方有权要求赔偿损失。 </p>
            
            <p class="fwb">八、 其他 </p>
            
            <p>第二十条 本合同未尽事宜，经甲乙双方协商后，做出补充规定。</p>
            <p>第二十一条 执行本合同发生争议的，由甲乙双方协商解决，协商不成的，可选择按以下方式中的第 二 种方式解决：</p> 
            <p>（一）双方同意由_______仲裁委员会仲裁。（二）向    甲方所在地   人民法院起诉。</p>
            <p>第二十二条 如乙方居住地发生变更，乙方应当将变更后居住地的详细地址、邮编以书面形式准确、及时地告知甲方；如乙方未书面告知，则以本合同约定居住地为准。</p> 
            <p>第二十三条 保险监管机构有其他监管要求的从其规定执行。 </p>
            <p>第二十四条 本合同自双方签章之日起生效，有效期为3年，有效期至     年    月    日；期限届满前1个月如双方均无异议，合同将自动延展1年。</p>
            
            <p>本合同一式贰份，甲乙双方各持一份。</p>
            <p>甲方：（盖章）</p>
            <p class="signpic">
            </p>
            <p>{{presentTime}}</p>        
            <p>乙方：（签字） 立即签字<a class="signlink" @click="showDialog">点击签字</a></p>
            <p class="signpic">
              <!-- <img v-if="signImgUrl" style="height: 3rem; width: 6rem; margin-top: 1rem; margin-left: 3rem; transform: rotate(270deg);" :src="signImgUrl"> -->
              <img v-if="signImgUrl" style="height: 3rem; width: 6rem; margin-top: 1rem; margin-left: 3rem;" :src="signImgUrl">
            </p>
            <p>{{presentTime}}</p> 
            <p>负责人(或委托代理人)：（签字）</p>
            <div class="signpic">
              <!-- <img :src="signImgUrl" /> -->
            </div>
            <div class="areabox" @click="pickShow = true">
              <div class="areabox-label">合同签订地点：</div>
              <div v-if="area.provinceName == ''" class="areabox-con areabox-con-tips">请选择合同签订地点</div>
              <div v-else class="areabox-con">{{ area.provinceName }} {{ area.ciryName }} {{ area.areaName }}</div>
            </div>
            <div>
              <van-radio-group v-model="radio">
                <van-radio name="1">我已阅并同意协议全部内容</van-radio>
              </van-radio-group>
            </div>
            <div class="btnbox">
              <van-button @click="goback" type="default" block>上一步</van-button>
              <van-button @click="subAgreement" type="info" block>提交</van-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 签名 -->
      <v-esign ref="esign" ></v-esign>

      <van-popup v-model="pickShow" position="bottom">
        <van-area
          :area-list="areaList"
          :columns-placeholder="['请选择', '请选择', '请选择']"
          @confirm="confirmArea"
          @cancel="pickShow = false"
        />
      </van-popup>
		</div>
	</div> 
</template>

<script>
import area from '../../assets/json/area.js';
import vEsign from "@/templates/esign.vue";

export default {
  components: {
    vEsign
  },
  data() {
    return {
      data: {
        businessNo: ''
      },
      isCrop: true,
      lineWidth: 5,
      lineColor: 'black',
      bgColor: 'white',
      signImgUrl: '',
      radio: '1',
      show: false,
      areaList: area,
      pickShow: false,
      area: {
        provinceName: '',
        ciryName: '',
        areaName: ''
      },
      active: 2,
      userName: '',
      mobileNo: '',
      idCardNo: '',
      presentTime:''
    };
  },
  created() {
    // this.show=false;
    this.getBusinessNo();
    this.presentTime = this.presentDate()
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    async getBusinessNo(){
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if(res.code === 0 && res.content){
        this.idCardNo=res.content.agentIdNo;
        this.mobileNo=res.content.mobile;
        this.userName=res.content.agentName;
        var fileList=res.content.fileUploadInfoList;
        if(fileList){
          for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            this.data.businessNo=file.businessNo;
          }
        }
      }
    },
    async handleReset(){
      console.info('重置签名');
      this.$refs.esign.reset();
    },
    async handleGenerate(){
      console.info('生成签名');
      var _this = this
      _this.$refs.esign.generate().then(res => {
        console.info('签名res:' + JSON.stringify(res));
        _this.signImgUrl=res;
        _this.show=false;
      }).catch(err => {
        _this.show=false;
        _this.$toast(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    },
    async subAgreement(){
      if(this.area.provinceName===null||this.area.provinceName===''
        || this.area.ciryName===null||this.area.ciryName===''
        || this.area.areaName===null||this.area.areaName===''|| this.signImgUrl===''){
          this.$toast('请签署名字和选择完整的合同签订地点');
          return;
      }
      // 转成文件
      var tofile = this.btof(this.signImgUrl, "upfile");
      setTimeout(async () => {
        var formdata = new FormData()
        var uploadFileInfoStr={
          businessNo: this.data.businessNo,
          fileGroup: 'signature',
          agreementSignLocation: this.area.provinceName+this.area.ciryName+this.area.areaName
        }
        formdata.append('uploadFileInfoStr', JSON.stringify(uploadFileInfoStr));
        formdata.append('file', tofile);
        this.instance.post('/applyAgent/uploadFiles', formdata).then((res) => {
          // 信息读取
          if(res.data.code===0){
            var content=res.data.content;
            if(content.code===0){
              var result=JSON.parse(content.content.body);
              if(result.resultCode===0) {
                // var resultArr=result.data;
                // if(resultArr && resultArr.length>0){
                //   this.signImgUrl=resultArr[0].fileUrl;
                // }
                this.$toast('提交成功');
                // setTimeout(() => {
                //   this.goback();
                // }, 1000);
                this.$router.push({path: '/applySuccess'});
              }
            } else {
              this.$toast(content.message);
            }
          } else {
            this.$toast('图片上传失败');
          }
        });
      })
    },
    // 换为base64格式
    getBase64Image(src) {
      var img = new Image();
      // 加载完成执行
      img.onload = function(){
        // 打印
        console.log('width:'+img.width+',height:'+img.height)
      }
      img.src= src;
      console.log('width:'+img.width+',height:'+img.height)
      var c = document.createElement("canvas");
      //设置canvas宽高为图片宽高
      c.width= 80;
      c.height= 80;
      //将图片绘制到canvas
      var cxt=c.getContext("2d");
      cxt.drawImage(img,0,0);
      //得到图片的base64编码数据
      var base64 = c.toDataURL();
      return base64;
    },
    // 将blob转换为file
    blobToFile (theBlob, fileName) {
      theBlob.lastModifiedDate = new Date()
      theBlob.name = fileName
      return theBlob
    },
    showDialog () {
      this.$refs.esign.parentMsg();
    },
    // base64 转file
    btof(data, fileName) {
      const dataArr = data.split(",");
      const byteString = atob(dataArr[1]);

      const options = {
        type: "image/jpeg",
        endings: "native"
      };
      const u8Arr = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
      }
      return new File([u8Arr], fileName + ".jpg", options);
    },
    // 省市区选择改变
    confirmArea(e){
      this.pickShow = false
      this.area.provinceName = e[0] ? e[0].name : ''
      this.area.ciryName = e[1] ? e[1].name : ''
      this.area.areaName = e[2] ? e[2].name : ''
    },

    setSignImgUrl(img){
      if(!img){
        this.$toast('请签署姓名！');
        return
      }
      // 转成文件
      var tofile = this.btof(img, "upfile");
      if(tofile.size < 3500){
        this.$toast('您的签名不合规，请签署正确的签名');
        return
      }
      this.signImgUrl= img;
    },
    presentDate(){
      var today=new Date();
      var y=today.getFullYear();
      var m=today.getMonth();
      var d=today.getDate();
      m=m+1;
      d= this.checkTime(d);
      m= this.checkTime(m);
      return y +'-'+ m +'-'+ d
    },
    checkTime(i){
        if (i<10){
            i="0" + i;
        }
        return i;
    },
  }
};
</script>
<style lang="less" scoped>
.signbox{
  padding: 0.7rem;
  background: #fff;
  margin-top: 0.5rem;
  .sign-title{
    font-size: 0.9rem;
    color: #000;
    font-weight: bold;
    text-align: center;
    padding: 0.7rem 0 0.2rem 0;
  }
  .sign-no{
    font-size: 0.8rem;
    color: #000;
    text-align: center;
  }
  .sign-con{
    padding: 0.5rem 0;
  }
  p{
    margin: 0;
    font-size: 0.8rem;
    &.fwb{
      font-weight: bold;
      padding: 0.5rem 0;
    }
  }
}
.signpic{
  height: 4rem;
}
.btnbox{
  display: flex;
  margin: 1.2rem 0.5rem 0.5rem 0.5rem;
  button{
    flex: 1;
    margin: 0 0.5rem;
  }
}
.signlink{
  color: #0252ff;
  padding: 0.5rem;
}
.signdialog{
  width: 100vw;
  height:100vh;
  top: 50%;
  border-radius: 0;
  .van-button{
    border: 1px solid #ebedf0;
  }
}
.signcom{
  .van-dialog__content{
    width:100%;
    height:calc(100vh - 50px);
    border-bottom: 1px dashed #c2c1c1;
  }
}
.areabox{
  height: 2rem;
  width: 100%;
  line-height: 2rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  display: flex;
  .areabox-con{
    flex: 1;
    border-bottom: 1px #eee solid;
    &.areabox-con-tips{
      color: #aaa;
    }
  }
}
.mystep{
  padding:1rem 2rem 0.6rem 2rem;
  .van-step__icon{
    font-size: 1.2rem;
  }
  .van-step__circle-container{
    padding: 0;
  }
}
</style>