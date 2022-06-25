<template>
  <div class="updBank">
    <v-header :title="{ name: '修改银行卡' }"></v-header>
    <div :style="{ 'margin-top': ($iosSystem + 60) + 'px' }">
      <article>
        <div class="content-box">
         <div class="content_grid">
           <p class="grid_name">请绑定代理人本人的银行卡号</p>
         </div>
        </div>
        <van-cell-group>
          <van-field label="代理人" readonly v-model="list.agentName" />
           <van-field class="required" v-model="bankNo"  center clearable label="卡号" placeholder="请输入卡号">
            <template #button>
              <div class="updBank_carInfoScan">
                <input class="carInfoScan_input" v-if="isIos" type="file" accept="image/*" @change="afterReadBankCard($event)" ref="refIdInput" />
                <img @click="isIos ? null : showPicChoose()" class="icon" src="./../../../public/img/client/ic_scanid.png">
              </div>

            </template>
          </van-field>
          <van-field class="required" readonly clickable name="picker" @click="showPicker = true" :disabled="false" v-model="bankName.text" center label="银行名" placeholder="请选择银行名" />
          <van-field class="required" @input="mbankNo = ''" v-model="openingBank" :disabled="bankName.text ? false : true"  center clearable label="开户行行名" placeholder="支持模糊搜索">
            <template #button>
              <span style="color: #0252ff" @click="onOpeningBank">搜索</span>
            </template>
          </van-field>
          <van-field label="开户行行号"  v-model="mbankNo" placeholder="根据行名自动带出行号"/>
        </van-cell-group>
        <div class="upd_bt" @click="confirm()">确定</div>
      </article>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="BankClass"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 选择拍照相册选择 -->
    <van-dialog v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
      <van-cell-group title="请选择图片来源">
        <van-cell @click="goGetPic(cardFaceType)" title="相册" />
        <van-cell @click="goGetCamera(cardFaceType)" title="拍照" />
      </van-cell-group>
    </van-dialog>
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
    <subsidyRule-rules ref="subsidyRule"></subsidyRule-rules>
  </div>
</template>

<script>
import app from '../../assets/js/util/app';
import BankClass from '../../assets/json/BankClass';
import selectPicker from './../../templates/selectPicker.vue';
import EventBus from '../../assets/js/util/EventBus';
export default {
  components: {
    selectPicker
  },
  data() {
    return {
      bankCarUrl:'',
      isIos: app.isIos(),
      BankClass:BankClass,
      showPicker:false,
      list:{},
      bankNo:'',//卡号
      bankName: {
          text: '',
          value: ''
      }, //银行名
      openingBank:'',//开户行行名
      mbankNo:'',//开户行行号
      bankInfoList: [],
      showDialog: false,
    };
  },
  created() {
    this.getInit()
  },
  mounted () {
    window.openAndroidCameraCallback = this.openAndroidCameraCallback;
  },
  methods: {
    confirm(){
      if(this.bankNo == ''){
        this.$toast('请输入卡号');
        return
      }
      if(this.bankName.text == ''){
        this.$toast('请选择银行名');
        return
      }
      if(this.openingBank == ''){
        this.$toast('请输入开户行行名');
        return
      }

      this.$dialog.confirm({
        title: '修改银行卡',
        message: '您确定要进行修改银行卡？',
      })
      .then(() => {
        this.upd()
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
    },
    // 修改
    async upd(){
      const res = await this.$axios({
        url: this.$API.API_MY_MODIFY,
        method: 'post',
        data:{
          bankNo:this.bankNo, //卡号
          bankType:this.bankName.text, //银行名
          openingBank:this.openingBank, //开户行行名
          bankAccountNumber:this.mbankNo, //开户行行号
        }
      });
      if (res.code === 0 && res.content.result === '0') {
        this.$toast('修改成功');
         setTimeout(()=>{
            this.$router.go(-2);
        },2000);

      } else {
        this.$toast(res.message);
      }
    },
    //选择银行名
    onConfirm(valueList) {
      this.bankName = valueList;
      this.showPicker = false;
    },
    // 搜索开户行
    async onOpeningBank() {
      const res = await this.$axios({
        url: this.$API.API_QUERYBANKLIST,
        method: 'get',
        params: {
          bankType: this.bankName.value,
          bankName: this.openingBank
        }
      });
      if(res && res.content && res.content.bankInfoList && res.content.bankInfoList.length ){
        for( let item of res.content.bankInfoList ){
          item.text = item.bank
          item.value = item.bankNo
        }
        this.bankInfoList = res.content.bankInfoList
        this.$refs.selectPicker.parentMsg({ name: '', struct: {data: this.bankInfoList }});
      }else{
        this.$toast('暂无匹配开户行');
      }
    },
     updataSelectPicker(params){
      this.openingBank = params.struct.value.bank
      this.mbankNo = params.struct.value.bankNo
    },
    async getInit() {
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if (res.code === 0 && res.content) {
        this.list = res.content || {}
      }
    },
    subsidyMsg(){
        this.$refs.subsidyRule.subsidyRuleMsg(true,1);
    },
    showPicChoose(type){
      this.showDialog=true;
    },
    // 调用安卓系统
    goGetCamera (type) {
      this.showDialog=false;
      console.log('安卓调用摄像头')
      app.getCamera({'callbackMethod': 'openAndroidCameraCallback'})
    },
    goGetPic (type) {
      this.showDialog=false;
      console.log('安卓调用相册')
      app.getPhoto({'callbackMethod': 'openAndroidCameraCallback'})
    },
    // 摄像头回调函数
    openAndroidCameraCallback(result){
      let code = result.code;
      if(code == 0) {
        this.afterReadBankCard('data:image/jpg;base64,' + result.object.base64Datas)
      }
    },
    afterReadBankCard(src){
      let file
      if(this.isIos) {
        file = src.target.files[0]
      } else {
        file = this.btof(src, "upfile")
      }
       EventBus.$emit('GlobalLoadingTrigger', true);
      let formdata = new FormData();
      formdata.append('type', "16");
      formdata.append('file', file);
      this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        // 信息读取
        if(res.data.code===0){
          if(res.data.content.code===0){
            let data = JSON.parse(res.data.content.content);
            console.info('data:' + JSON.stringify(data));
            if (data.resultCode == 0) {
              this.bankNo=data.idCard;
              for( let item of this.BankClass ){ //匹配识别后选择银行名
                if(item.text == data.bank_name){
                  this.bankName=item;
                }
              }
            } else {
              this.$toast(data.resultMsg);
            }
          } else {
            this.$toast('图片识别失败');
          }
        } else {
          this.$toast('图片识别失败');
        }
      });
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
  }
};
</script>
<style lang="less" scoped>
.updBank {
  margin-top: 45px;
  header {
    display: flex;
    justify-content: space-evenly;
    padding: 1.3rem;
    font-size: 0.9rem;
    font-weight: 500;
  }
  article {
    .content-box {
      background-color: #fff;
      margin: 16px;
      border-radius: 10px;
      font-size: 16px;
      height: 110px;
      .content_grid{
        display: flex;
        font-size: 16px;
        .grid_name{
          display: flex;
          flex: 1;
          justify-content: center;
          margin: 3em 0;
          font-weight: 600;
        }
      }
    }
    .txt {
      text-align: center;
      padding-bottom: 0.8rem;
    }
  }
  .upd_bt{
    text-align: center;
    background: #0252ff;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    margin: 20%;
    color: #fff;
  }
  .updBank_carInfoScan{
    position: relative;
    width: 2rem;
    height: 1.2rem;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    .carInfoScan_input{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .icon{
      display: block;
      height: 1.2rem;
      padding-left: 0.4rem;
    }
  }
}
</style>