<template>
  <div class="realNamePage">
    <v-header :title="{ name: '实名认证' }"></v-header>
    <div :style="{ 'margin-top': ($iosSystem + 60) + 'px' }">
      <!-- <header>
        <div>1.身份证</div>
        <div>● ● ● ● ● ●</div>
        <div>2.银行卡</div>
      </header> -->
      <!-- 身份证 -->
      <article>
        <div class="content-box">
          <div class="upload">
            <input v-if="isIos" type="file" accept="image/*" @change="afterReadIdCardA($event)" ref="refIdInput" />
            <img v-if="cardAUrl" @click="isIos ? null : showPicChoose('A')" :src="cardAUrl">
            <img v-else @click="isIos ? null : showPicChoose('A')" src="./../../../public/img/account/realName_icon.png">
          </div>
          <p class="txt">身份证正面</p>
        </div>
        <van-form  ref="step1" @submit="onSubmit">
          <van-field v-model="username" name="userName" label="姓名" placeholder="输入姓名" />
          <van-field v-model="idCardNo" name="idCardNo" label="身份证" placeholder="输入证件号码" />
          <van-field v-model="shopName" name="shopName" label="车商4S店名" placeholder="输入车商4S店名" v-if="userInfo.salesmanChannelType == '03'"/>
          <div style="margin: 1.5rem;">
            <van-button block color="#0252FF" native-type="submit" >保存</van-button>
          </div>
        </van-form>
      </article>
      <!-- 选择拍照相册选择 -->
      <van-dialog v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
        <van-cell-group title="请选择图片来源">
          <van-cell @click="goGetPic(cardFaceType)" title="相册" />
          <van-cell @click="goGetCamera(cardFaceType)" title="拍照" />
        </van-cell-group>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import EventBus from '../../assets/js/util/EventBus';
import app from '../../assets/js/util/app';
import compCheck from '../../assets/js/util/comp-check';
import { mapState } from 'vuex'
export default {
  data() {
    return {
      idCardA:[],//身份证正面
      idCardB:[],//身份证反面
      cardAUrl: '',//default
      cardBUrl: '',
      bankCarUrl: '',//银行卡图片 url
      userId:'',
      username: '',
      idCardNo:'',
      accountName:'',
      bankCardNo:'',
      bankName:'',
      bankCardType: '',
      isIos: false,
      cardFaceType: '',
      showDialog: false,
      shopName:''
    };
  },
  computed:{
    ...mapState({
      userInfo: state => state.my.UserInfo,
    })
  },
  created() {
    if(Object.keys(this.$route.query).length !== 0) {
        this.userId=this.$route.query.userId;
    }
    this.isIos = app.isIos();
  },
  mounted () {
    window.openAndroidCameraCallback = this.openAndroidCameraCallback;
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    afterReadIdCardA(src){
      let file
      if(this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
        file = this.btof(src, "upfile")
      }
      // this.cardAUrl=file.content;
      EventBus.$emit('GlobalLoadingTrigger', true);
      let formdata = new FormData();
      formdata.append('type', "01");
      formdata.append('file', file);
      this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        // 信息读取
        if(res.data.code===0){
          if(res.data.content.code===0){
            let data = JSON.parse(res.data.content.content);
            console.info('data:' + JSON.stringify(data));
            if (data.resultCode == 0) {
              this.cardAUrl=data.imageUrl;
              console.info('this.cardAUrl:' + this.cardAUrl);
              this.username=data.name;
              this.idCardNo=data.idCard;
            } else {
              this.$toast(data.resultMsg);
            }
          } else {
            this.$toast('图片上传失败');
          }
        } else {
          this.$toast('图片上传失败');
        }
      });
       // 此时可以自行将文件上传至服务器
       // file.status = 'uploading';
       //file.message = '上传中...';
    },
    afterReadIdCardB(src){
      let file
      if(this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
        file = this.btof(src, "upfile")
      }
      EventBus.$emit('GlobalLoadingTrigger', true);
      let formdata = new FormData();
      formdata.append('type', "01");
      formdata.append('file', file);
      this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        // 信息读取
        if(res.data.code===0){
          if(res.data.content.code===0){
            let data = JSON.parse(res.data.content.content);
            console.info('data:' + JSON.stringify(data));
            if (data.resultCode == 0) {
              this.cardBUrl=data.imageUrl;
              console.info('this.cardBUrl:' + this.cardBUrl);
            } else {
              this.$toast(data.resultMsg);
            }
          } else {
            this.$toast('图片上传失败');
          }
        } else {
          this.$toast('图片上传失败');
        }
      });
       // 此时可以自行将文件上传至服务器
       // file.status = 'uploading';
       //file.message = '上传中...';
    },
    afterReadBankCard(src){
      let file
      if(this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
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
              this.bankCarUrl=data.imageUrl;
              console.info('this.bankCarUrl:' + this.bankCarUrl);
              this.bankCardNo=data.idCard;
              this.bankName=data.bank_name;
              this.bankCardType=data.card_type;
            } else {
              this.$toast(data.resultMsg);
            }
          } else {
            this.$toast('图片上传失败');
          }
        } else {
          this.$toast('图片上传失败');
        }
      });
       // 此时可以自行将文件上传至服务器
       // file.status = 'uploading';
       //file.message = '上传中...';
    },
   //step1
    onSubmit(values) {
      const url="/account/certification";
      var userName=values.userName;
      if(userName===null||userName===''){
          this.$toast('请输入姓名');
          return;
      }
      var idCardNo=values.idCardNo;
      if(idCardNo===null||idCardNo===''){
          this.$toast('请输入身份证号码');
          return;
      }
      if(!compCheck.isIdno(idCardNo)){
        this.$toast('身份证号码不合法');
        return;
      }
      this.accountName=values.userName;

      // if(this.userInfo.salesmanChannelType == '03'){
      //   if(values.shopName===null||values.shopName===''){
      //     this.$toast('请输入车商4S店名');
      //     return;
      //   }
      // }

      var formdata = new FormData();
      formdata.append('userId', this.userId);
      formdata.append('cardName', this.username);
      formdata.append('card', this.idCardNo);
      formdata.append('shopName', this.shopName);
      this.instance.post(url, formdata).then((res) => {
          if (res.data.code === 0) {
            if(res.data.content!=null&&res.data.content.code===0){
              this.$toast('认证成功');
              setTimeout(() => {
                this.goback();
              }, 1000);
            } else {
              if(res.data.content===null){
                this.$toast('认证失败');
              } else {
                this.$toast(res.data.content.message);
              }
            }
          } else {
              this.$toast('认证失败');
          }
      });
      
    },
    showPicChoose(type){
      this.cardFaceType=type;
      this.showDialog=true;
    },
    // 调用安卓系统
    goGetCamera (type) {
      this.cardFaceType=type;
      this.showDialog=false;
      console.log('安卓调用摄像头')
      app.getCamera({'callbackMethod': 'openAndroidCameraCallback'})
    },
    goGetPic (type) {
      console.log('this.cardFaceType：' + this.cardFaceType)
      this.cardFaceType=type;
      this.showDialog=false;
      console.log('安卓调用相册')
      app.getPhoto({'callbackMethod': 'openAndroidCameraCallback'})
    },
    // 摄像头回调函数
    openAndroidCameraCallback(result){
      let code = result.code;
      if(code == 0) {
        if(this.cardFaceType==="A"){
          this.afterReadIdCardA('data:image/jpg;base64,' + result.object.base64Datas)
        }
        if(this.cardFaceType==="B"){
          this.afterReadIdCardB('data:image/jpg;base64,' + result.object.base64Datas)
        }
        if(this.cardFaceType==="C"){
          this.afterReadBankCard('data:image/jpg;base64,' + result.object.base64Datas)
        }
      }
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
    async getBankCardNo(){
      this.bankName = await this.$store.dispatch('common/getCardBin', { cardNo: this.bankCardNo });
    }
  }
};
</script>
<style lang="less" scoped>
.realNamePage {
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
      background-color: white;
    }
    .txt {
      text-align: center;
      padding-bottom: 0.8rem;
    }
  }
}
.upload{
  position: relative;
  height: 10rem;
  input{
    position: absolute;
    left: 50%;
    margin-left: -7rem;
    top: 1rem;
    width: 14rem;
    height: 9rem;
    opacity: 0;
    z-index: 9999;
  }
  img {
    width: 14rem;
    height: 9rem;
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -7rem;
    top: 1rem;
  }
}
</style>