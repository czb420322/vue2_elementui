<template>
  <div class="issue afe-area-inset-bottom" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <v-header :title="{ name: '提问' }"></v-header>
      <div>
          <van-field
              readonly
              clickable
              name="picker"
              :value="typeValue"
              label="问题类型"
              placeholder="点击选择问题类型"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>


          <van-field
            v-model="problemContent"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="60"
            placeholder="请输入留言"
            show-word-limit
          />

          <van-field name="uploader" label="文件上传"  @click="uploading($event)">
            <template #input>
              <van-uploader v-model="uploader" :max-count="3" />
            </template>
          </van-field>
      </div>
      
       <div class="bt_box">
          <van-button round :disabled="disabled" type="primary" size="large" color="#0252ff" @click="submit()">提交</van-button>
        </div>
      <click-login v-if="isLogin !== '' && isLogin == false"></click-login>

    </div>
  </div>
</template>

<script>
import app from '../../assets/js/util/app';
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import ioc_ask from '../../../public/img/page/base/w.png';
import ioc_reply from '../../../public/img/page/base/d.png';
export default {
  data() {
    return {
      disabled:false,
      typeValue: '',
      index:'',//选中的下标
      columns: ['保单', '订单', '支付', '产品', '其他'],
      showPicker: false,
      // value:'',
      problemContent:'',
      uploader: [],
      list:[],
      isLogin: '',
      userInfo:{},
      uploadingImg:[],
      prcture:[],
      num:0,
      isIos: app.isIos()
    };
  },
  async created() {
      window.carInfoScanOpenAndroidCameraCallback = this.carInfoScanOpenAndroidCameraCallback;
    // this.userInfo = await common.getUserInfo()
  },
  methods: {
    onConfirm(value,index) {
      this.index = index;
      this.typeValue = value;
      this.showPicker = false;
    },
    async submit(){
          this.disabled =true //防止重复提交
          this.prcture = [];
          if(!this.isIos && this.uploader.length > 0){
            for(let i in this.uploader){
              this.prcture.push(this.uploader[i].url)
            }
            this.datum()
          }else{
            if(this.uploader.length > 0){
              var legth = this.uploader.length
              for(let i in this.uploader){
                  var form = new FormData();
                  form.append("file", this.uploader[i].file);
                  this.instance.post('/CustomerService/upload', form).then((res) => {
                    if(res.data.code == 0 && res.data.content){
                        this.prcture.push(res.data.content[0].fileUrl)
                        legth --
                        if(legth == 0){
                          this.datum()
                        }
                    }
                  
                  })
                
              }
            }else{
              this.datum()
            }
          }
         
      
    },
    async datum() {
      if(!this.typeValue){
        this.$toast('请选择问题类型');
        this.disabled =false
        return;
      }
      if(!this.problemContent){
        this.$toast('请输入留言');
        this.disabled =false
        return;
      }
     
        const res = await this.$axios({
          url: this.$API.API_HOME_REPORTINGSAVE,
            method: 'post',
            data:{
                "problemType":this.index || 0,
                "problemContent":this.problemContent,
                "prcture":this.prcture
              }
          });
        this.$toast(res.content.resultMessage);
         this.disabled =false
         this.$router.go(-1)
         
    },
    //点击上传事件
    uploading(event){
      if(this.uploader.length == 3 || event.target.localName == 'img'){
        return;
      }
      //不是ios
      if(!this.isIos && event.target.localName == 'input'){
        this.num ++;
        this.goGetPic()
      }else{
        console.log('不做处理')
      }
      
    },

     goGetPic() {
      console.log('安卓调用相册')
      app.getPhoto({ 'callbackMethod': 'carInfoScanOpenAndroidCameraCallback' })
    },
    // 摄像头回调函数
    carInfoScanOpenAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
      }
    },
    //安卓上传图片
    afterRead(src){
      let file = util.btof(src, this.num)
       var formdata = new FormData();
      formdata.append('file', file);
      this.instance.post('/CustomerService/upload', formdata).then((res) => {
            if(res.data.code == 0 && res.data.content){
                this.uploader.push({'url':res.data.content[0].fileUrl})
            }
      })
    }
   
  }
};
</script>

<style lang="less" scoped>
.issue{
  	margin-top: 77px;
}
.bt_box{
  position: fixed;
  width: 100%;
  bottom: 0;
  padding:0.75rem;
  background: #eeeeee;
  .van-button--large{
    height: 44px;
  }
}
</style>
