<template>
<div  class="carClause"  >
    <div>
        <v-header :title="{ name: '签约条款' }"></v-header>
        <div>
            <div class="carClause_cut" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
                <!-- <div :class="current == 'a' ? 'active' : ''" @click="changeTab('a')">电子投保单</div> -->
                <div :class="current == 'b' ? 'active' : ''" @click="changeTab('b')" v-if="policyBI">免责事项说明书</div>
                <div :class="current == 'c' ? 'active' : ''" @click="changeTab('c')">车险条款</div>
                <div :class="current == 'd' ? 'active' : ''" @click="changeTab('d')" v-if="manageCode.substring(0,2) =='30'">客户授权声明书</div>
            </div>
            <div class="carClause_box" :style="{ 'top': ($iosSystem + 78) + 'px' }">
                <div class="carClause_cut_1" v-if="current == 'a'">
                    一、为充分保障投保人、被保险人合法权益，确保各机构已通过书面形式向投保人详细介绍投保险种所适用的条款，并对其中免除保险人责任的条款（包括责任免除条款、免赔额、免赔率等免除或者减轻保险人责任的条款）向投保人作了书面明确说明，有效规范使用《机动车保险免责事项说明书》、《特种车保险免责事项说明书》、《拖拉机、摩托车保险免责事项说明书》及《单程提车保险免责事项说明书》，特制定本规范。 
                    二、投保人提出投保意愿后，各机构依照《保险法》及监管部门的有关要求，应出具条款手册及与条款对应的《免责事项说明书》供投保人阅读，要严格按照双方选择确定的保险条款（包括主险和附加险）向投保人说明投保险种的保障范围、赔偿处理、合同变更与终止等内容，特别要对责任免除、条款中容易发生歧义的内容向投保人进行明确说明，并对投保人提出的疑问一一解答，确保投保人已经充分理解并接受《免责事项说明书》所述内容及作为订立保险合同的依据，并自愿投保。 
                    三、投保人明确投保意愿后，各机构应提示投保人在《免责事项说明书》最后一页《投保提示书》上手书“保险人已明确说明免除保险人责任条款的内容及法律后果。”的内容并在投保人签章处签名或盖章，并且与承保材料一并留存归档备查。 
                    四、对于团体客户批量投保，《投保提示书》投保经办人手写一份，复印加盖单位公章有效。 
                    五、投保人通过电话直通模式投保的，各机构通过口头告知方式履行说明义务，并在投保人签订投保单同时，提示投保人在《免责事项说明书》最后一页《投保提示书》上手书“保险人已明确说明免除保险人责任条款的内容及法律后果。”的内容并在投保人签章处签名或盖章。 
                    六、投保人以网络或其它电子形式投保商业车险业务的，应在确认投保人身份后，通过网页向投保人展示商业车险条款及《机动车辆保险责任免除说明书》电子版有关内容，经投保人阅
                </div>
                <div class="carClause_cut_1" v-if="current == 'b'">
                    <div v-html="motorBusinessExemption.motorBusinessExemption">
                    </div>
                    <!-- 名字签署 -->
                    <div class="signature_box">
                        <div>
                            <span>投保人签名</span>
                             <img  @click="showDialog()" v-if="signImgUrl" style="height: 3rem; width: 6rem; margin-left: 1rem;" :src="signImgUrl">
                             <span class="signature_hint" v-else @click="showDialog()">请点击签署</span>
                        </div>
                       <div>
                            <span>日期</span>
                            <span class="signature_time">{{this.presentDate()}}</span>
                        </div>
                    </div>

                </div>
                <div class="carClause_cut_1" v-if="current == 'c'">
                    <div v-show="mandatoryShow" v-html="mandatoryClause.mandatoryClause">
                    </div>

                    <div v-show="businessShow" v-html="engineBusinessClause.engineBusinessClause">
                    </div>

                     <div v-show="driveAccidentShow" v-html="accidentClause.accidentClause">
                    </div>
                    <!-- 名字签署 -->
                    <div class="signature_box">
                        <div>
                            <span>投保人签名</span>
                             <img  @click="showDialog()" v-if="signImgUrl" style="height: 3rem; width: 6rem; margin-left: 1rem;" :src="signImgUrl">
                             <span class="signature_hint" v-else @click="showDialog()">请点击签署</span>
                        </div>
                       <div>
                            <span>日期</span>
                            <span class="signature_time">{{this.presentDate()}}</span>
                        </div>
                    </div>

                </div>
                <div id="carClause_cut_1" class="carClause_cut_1" v-if="current == 'd'">
                    <h3 style="text-align: center;">“投保人缴费实名认证”</h3>
                    <h4 style="text-align: center;">客户授权声明书</h4>
                    因签订车辆保险合同需要，本人同意并授权：保险人可 采集、查询、处理本人缴费账户、姓名、身份证号等相关个 人信息，并可将上述信息传递至经监管部门或保险行业协会 认可的第三方机构，由该第三方机构接收并存储上述信息后， 向已正式接入车险缴费实名认证通道的合法存续的第三方 认证机构传递该个人信息供第三方认证机构用于本人缴费 账户身份信息及缴费信息认证，第三方认证机构认证完成后， 可将认证结果及支付结果（包括但不限于支付单号、交易金 额、交易时间、凭证号、凭证所属银行等信息，以下均简称 “支付结果”）传输至保险人认可的第三方机构，该第三方 机构接收上述信息后，可对支付结果信息进行储存，并将认 证结果信息传递至保险人，以最终实现本人缴费账户身份信 息及缴费信息认证。 本人承诺所提供的个人信息均为本人真实、合法、有效 的信息，保证未提供虚假不实信息、非法信息或非法获取的 他人信息。否则，贵司及上述所有第三方机构、第三方认证 机构均有权随时暂停或终止对本人的全部或部分服务，且本 人将承担由此产生的全部法律责任。
                    <p style="text-align: right;">客户签字：_____ </p>
                    <p style="text-align: right;">年 月 日</p>
                </div>
            </div>

            <div class="carClause_bt">
                <van-button color="linear-gradient(to right, #2E6EF7, #029EFF)" block @click="haveRead()" :disabled="showBT">我已阅读</van-button>
                <!-- <p class="carClause_bt_name" v-show="showBT" >请阅读此说明到最底部点击签名</p> -->
            </div>
           
        </div>
        <!-- 签名 -->
        <v-esign ref="esign" ></v-esign>

    </div>
</div>
</template>
<script>
import util from "../../../assets/js/util/util";
import vEsign from "@/templates/esign.vue";
import EventBus from '../../../assets/js/util/EventBus';
import glutton from '../../../assets/js/util/glutton';

//说明书
import motorOneExemption from '../../../assets/js/carClauseHtml/specification/motorOneExemption.js' //机动车单程提车保险免责事项说明书
import motorBusinessExemption from '../../../assets/js/carClauseHtml/specification/motorBusinessExemption.js' //机动车商业保险免责事项说明书
import motorbikeBusinessExemption from '../../../assets/js/carClauseHtml/specification/motorbikeBusinessExemption.js' //摩托车、拖拉机商业保险免责事项说明书
import specialBusinessExemption from '../../../assets/js/carClauseHtml/specification/specialBusinessExemption.js' //特种车商业保险免责事项说明书
//车险条款
import mandatoryClause from '../../../assets/js/carClauseHtml/carClause/mandatoryClause.js' //机动车交通事故责任强制保险条款
import deliveryClause from '../../../assets/js/carClauseHtml/carClause/deliveryClause.js' //国任财产保险股份有限公司机动车单程提车保险条款（2020版）
import engineBusinessClause from '../../../assets/js/carClauseHtml/carClause/engineBusinessClause.js' //国任财产保险股份有限公司机动车商业保险条款（2020版）
import accidentClause from '../../../assets/js/carClauseHtml/carClause/accidentClause.js' //国任财产保险股份有限公司驾乘人员意外伤害保险条款（2020版）
import motorcycleClause from '../../../assets/js/carClauseHtml/carClause/motorcycleClause.js' //国任财产保险股份有限公司摩托车、拖拉机商业保险条款（2020版）
import specialClause from '../../../assets/js/carClauseHtml/carClause/specialClause.js' //国任财产保险股份有限公司特种车商业保险条款（2020版）
export default {
    components: {
        vEsign
    },
    data() {
        return {
            showBT:true,
            signImgUrl:'',
            current: 'c',
            setHeight:'',
            policyBI:{},//商业险
            orderNo:'',//订单号
            manageCode:'',
            //说明书
            motorOneExemption:motorOneExemption,//机动车单程提车保险免责事项说明书
            motorBusinessExemption:motorBusinessExemption,//机动车商业保险免责事项说明书
            motorbikeBusinessExemption:motorbikeBusinessExemption,//摩托车、拖拉机商业保险免责事项说明书
            specialBusinessExemption:specialBusinessExemption,//特种车商业保险免责事项说明书
            //保险条款
            mandatoryClause:mandatoryClause,//机动车交通事故责任强制保险条款
            engineBusinessClause:engineBusinessClause,//国任财产保险股份有限公司机动车商业保险条款（2020版）
            accidentClause:accidentClause, //国任财产保险股份有限公司驾乘人员意外伤害保险条款（2020版）

            mandatoryShow:false,//机动车交通事故责任强制保险条款显示和隐藏
            businessShow:false,//机动车商业保险条款和显示和隐藏
            driveAccidentShow:false,//驾乘人员意外伤害保险条款显示和隐藏

        }
    },
    created() {
        this.orderNo = this.$route.query.orderNo || ''
        this.manageCode = this.$route.query.manageCode || ''
        if(this.orderNo){
            this.getPhotograph()
            this.getAutoDetails()
        }
        if(this.$iosSystem ){
            this.setHeight = document.body.offsetHeight - 46 -28 - this.$iosSystem - 76
        }else{
            this.setHeight = document.body.offsetHeight - 46 -28 - 76
        }
        this.current = this.$route.query.current || 'c'

       
       //监听滚动条到最底部
        window.addEventListener('scroll',this.handleScroll,true);
   

    },
    mounted(){
        //处理当页面高度不够，不会出现滚动条时
        if(this.current == 'D'){
            var o = document.getElementById("carClause_cut_1");
            if(o.offsetHeight < this.setHeight){
                this.showBT =false
            }
        }
       
    },
    methods: {
        handleScroll(e){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = e.target.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = e.target.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = e.target.scrollHeight;
            //滚动条到底部的条件
            if(scrollTop+windowHeight+200 > scrollHeight){
                this.showBT =false
            }
        },
        //已阅读
        haveRead(){
            if(this.signImgUrl == ''){
                this.showDialog() //调用签名
            }else{//已签署
                util.setSessionStorageObj("signature", true);
                this.$router.go(-1)
            }
        },
        async getAutoDetails(){ 
            const res = await this.$axios({
                url: this.$API.API_GETORDERDETAILS,
                method: "post",
                data: {
                orderNo: this.orderNo,
                },
            });
            if (res.code === 0 && res.content) {
                 glutton.startRecording(res.content.traceNo); // 回溯录制
                var policyCI = res.content.policyCI
                this.policyBI = res.content.policyBI //商业险
                //判断交强险
                if(policyCI && policyCI.policyRiskDTOList){
                    this.mandatoryShow = true;//显示交强险
                }
                //判断买了什么商业险 根据险种显示车险条款
                if( this.policyBI &&  this.policyBI.policyRiskDTOList){
                    this.businessShow= true //显示商业保险条款
                    for(let i in  this.policyBI.policyRiskDTOList){
                        if( this.policyBI.policyRiskDTOList[i].riskCoreCode == '20D3' ||  this.policyBI.policyRiskDTOList[i].riskCoreCode == '20D4' || this.policyBI.policyRiskDTOList[i].riskCoreCode == '21D3' || this.policyBI.policyRiskDTOList[i].riskCoreCode == '21D4'){
                            this.driveAccidentShow= true
                        }

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
        setSignImgUrl(img){
            if(!img){
                this.$toast('请签署姓名！');
                return;
            }
             // 转成文件
            var tofile = this.btof(img, "upfile");
            if(tofile.size < 3500){
                this.$toast('您的签名不合规，请签署正确的签名');
                return
            }
            this.signImgUrl= img;
            EventBus.$emit('GlobalLoadingTrigger', true);
            this.updSignature()
        },
        showDialog () {
            this.$refs.esign.parentMsg();
        },
        changeTab(item) {
            this.current = item
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
        //上传签名
        async updSignature(){
             // 转成文件
            var tofile = this.btof(this.signImgUrl, "upfile");
            setTimeout(async () => {
                var formdata = new FormData();
                formdata.append('file', tofile);
                formdata.append('fileGroup', 'QM'); //类型
                formdata.append('businessNo', this.orderNo); //订单号
                this.commonInstance.post(this.$API.API_CARUPLOADQM, formdata).then((res) => {
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    if (res.data.code == 0 && res.data.content.code == 0) {

                    }else{
                        this.signImgUrl = '';
                        this.$toast('上传失败');
                    }
                })
            })
        },
        //查询已经上传的图片
        async getPhotograph(){
            const res = await this.$axios({
                url: this.$API.API_GETIMAGE,
                method: "get",
                params: {
                businessNo: this.orderNo,//传订单号查询
                fileGroup:'QM'
                },
            });
            if (res.code === 0 && res.content.data) {
                this.signImgUrl = res.content.data[0].fileUrl || ''
                if(this.signImgUrl){
                    this.showBT =false
                }
            }
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

    },

}
</script>
<style lang="less">
.carClause{
    .carClause_cut{
        display: flex;
        background: #0252FF;
        color: #fff;
        text-align: center;
        padding-bottom: 40px;
        
        .active{
            color: #fff;
        }
        div{
            font-size: 14px;
            color: #B2C9FA;
            flex:1;
        }

    }
    .carClause_box{
        background: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        font-size: 14px;
        padding: 10px;
        position: fixed;
        left: 5%;
        right: 0;
        bottom: 80px;
        overflow-y: scroll;
        background: #fff;
        width: 90%;
        border-radius: 8px;
        -webkit-overflow-scrolling: touch;
        .carClause_cut_1{
            font-size: 14px;
        }
        
    }
    .carClause_bt{
        margin: 16px;
            position: absolute;
            bottom: 0;
            width: 90%;
        .carClause_bt_name{
            text-align: center;
            font-size: 14px;
            color: #F4BD00;
        }
    }
    .signature_box{
        font-size: 14px;
        font-weight: 600;
        margin-top: 10px;
        .signature_hint{
            color: #C1C1C1;
            margin-left: 10px;
        }
        .signature_time{
            margin-left: 10px;
        }
    }
}
</style>
    