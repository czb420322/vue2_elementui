<template>
  <div>
    <div class="page-group">
        <div class="page page-current" id="customerDetail-page">
            <!-- <header v-if="showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">新增客户</h1>
            </header> -->
            <v-header v-if="showTitle" class="bar bar-nav" :title="{ name: '新增客户' }"></v-header>
			<div class="content customer-detail-page" :style="{ top: ($iosSystem + 46) + 'px' }" style="padding-top: 0.5rem;">
                <!-- <div class="clientInfo-title">
                    <h4 class="index-content-title" style="margin: 0.2rem 0px 0.5rem;"><span></span>基础信息</h4>
                </div> -->
                <div class="clientInfo-div">
                    <div class="list-block">
                        <ul>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label label-required">客户姓名</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入客户姓名"  value="" v-model="clientInfo.customerName">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label label-required">电话</div>
                                        <div class="item-input">
                                        <input type="text" placeholder="请输入手机号" value="" v-model="clientInfo.phone">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label label-required">身份证</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入身份证号码" @blur="handleBirthAndAge" value="" v-model="clientInfo.cardNo">
                                    </div>
                                    <div class="scanid">
                                        <input v-if="isIos" type="file" accept="image/*" @change="afterRead($event)" ref="refIdInput" />
                                        <img @click="isIos ? null : showPicChoose()" class="ic" src="./../../../public/img/client/ic_scanid.png">
                                    </div>
                                </div>
                            </li>

                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">性别</div>
                                        <div class="item-input">
                                            <select v-model="selectedSex">
                                                <option v-for="(item, i) in sexArr" :key="i" :value="item.val">{{item.text}}</option>
                                            </select>
                                    </div>
                                </div>
                            </li>
                            
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">出生日期</div>
                                    <div class="item-input">
                                        <div class="seller">
                                            <van-cell is-link :value-class="'item-title'" :value="clientInfo.birthday" @click="showPopup" />
                                            <van-popup v-model="show" position="bottom">
                                                <van-datetime-picker
                                                    @cancel="cancelPicker"
                                                    @confirm="confirmPicker"
                                                    v-model="selBirthday"
                                                    type="date"
                                                    :formatter="formatter"
                                                    :min-date="minDate"
                                                    :max-date="maxDate"
                                                />
                                            </van-popup>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">邮箱</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入客户邮箱" value="" v-model="clientInfo.email">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">是否重点客户</div>
                                    <div class="item-input item-right">
                                        <!-- <input type="radio" style="margin:auto 12rem;" name="customerType" v-model="clientInfo.customerType" value="1"> -->
                                        <!-- <select v-model="selCustomerType">
                                            <option v-for="(item, i) in socialArr" :key="i" :value="item.val">{{item.text}}</option>
                                        </select> -->
                                        <van-switch v-model="clientInfo.customerType" size="24px" />
                                    </div>
                                </div>
                            </li>
                            
                            <!-- <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">邮政编码</div>
                                        <div class="item-input">
                                        <input type="text" placeholder="请输入邮政编码" style="text-align: right;" value="" v-model="clientInfo.zip">
                                    </div>
                                </div>
                            </li> -->
                            <li class="field-title">备注</li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-input">
                                        <!-- <input type="text" placeholder="请输入备注" style="text-align: right;" value="" v-model="clientInfo.remark"> -->
                                        <van-field
                                            v-model="clientInfo.remark"
                                            rows="2"
                                            autosize
                                            type="textarea"
                                            maxlength="50"
                                            placeholder="请输入备注信息"
                                            show-word-limit
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="btnbox">
                    <div class="button button-big button-fill button-customer-h5 button-down" :class="{'disabled' :isUpdateIng}" @click="saveOrUpdateClient()">{{isUpdateIng ? '保存中...':'保存客户'}}</div>
                </div>
            </div>
            <!-- 选择拍照相册选择 -->
            <van-dialog v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
                <van-cell-group title="请选择图片来源">
                <van-cell @click="goGetPic()" title="相册" />
                <van-cell @click="goGetCamera()" title="拍照" />
                </van-cell-group>
            </van-dialog>
		</div>
    </div>
	<!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
// import vFooter from "@/templates/footer.vue";
// import util from '@/assets/js/util/util';
import validator from '@/assets/js/util/validator';
import { formatDate } from '@/assets/js/util/dateFmt';
import compCheck from '../../assets/js/util/comp-check';
import app from '../../assets/js/util/app';
import { Switch } from 'vant'
export default {
  components: {
    // vFooter: vFooter
  },
  data() {
    return {
      page: {
        autoloader: true,
        showTitle: true,
      },
      showTitle: true,
      isUpdateIng: false,
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(),
      show: false,
      sexArr: [
          {
              "text": "男",
              "val": "0"
          },
          {
              "text": "女",
              "val": "1"
          }
      ],
      socialArr: [
          {
              "text": "是",
              "val": "0"
          },
          {
              "text": "否",
              "val": "1"
          }
      ],
      clientInfo: {
          cardType: 0,
          birthday: "",
          age: 0,
          sex: null,
          customerType: 0,
          customerName:'',
      },
      dataEnum: {},
      selBirthday: null,
      selectedSex: null,
      selCustomerType: 0,
      isIos: false,
      showDialog: false
    }
  },
  created() {
      this.selectedSex=this.clientInfo.sex;
      this.selCustomerType=this.clientInfo.customerType;
      this.isIos = app.isIos();
  },
  mounted () {
    window.openAndroidCameraCallback = this.openAndroidCameraCallback;
  },
  destroyed () {
    this.$toast.loading({duration: 1});
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    showPopup: function() {
        this.show = true;
    },
    cancelPicker: function() {
        this.selBirthday=new Date(this.clientInfo.birthday);
        this.show = false;
    },
    confirmPicker: function() {
        var dateStr=this.changeTimestyle(this.selBirthday);
        this.show = false;
    },
    // 选项格式化函数
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      } else if (type === 'second') {
        return `${value}秒`
      }
      return value
    },
    changeTimestyle(oldtime) {
        // 时间转换
        var datejson = new Date(oldtime).toJSON();        
        var date = new Date( + new Date(datejson) 
                            + 8*3600*1000).toISOString().
                            replace(/T/g,' ').
                            replace(/\.[\d]{3}Z/,'')  
        return date;
    },
    // 图片识别
    async photoIdentification(e){
        var file = e.target.files[0]
        console.info('图片识别');
        this.$toast.loading({duration: 0,message: '图片识别中'});
        var formdata = new FormData();
        //下面是要传递的参数
        formdata.append('type', "01");
        formdata.append('file', file);
        this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
            if (res.data.code === 0) {
                var resStr=res.data.content.content;
                var resJson=JSON.parse(resStr);
                if(resJson.resultCode === 0){
                    this.$toast('识别成功');
                    this.clientInfo.cardNo=resJson.idCard;
                    this.clientInfo.customerName =resJson.name
                    this.handleBirthAndAge();
                } else {
                    this.$toast(resJson.resultMsg);
                }
                // this.$toast.loading({duration: 1});
            } else {
                this.$toast('识别失败');
                // this.$toast.loading({duration: 1});
            }
        });
    },
    // 根据身份证号码获取年龄及生日
    handleBirthAndAge(){
        // var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        // if (reg.test(this.clientInfo.cardNo) === false) {
        //     this.$toast('身份证号码不合法');
        //     return false;
        // }
        if(!compCheck.isIdno(this.clientInfo.cardNo)){
            this.$toast('身份证号码不合法');
            return false;
        }
        var userCardNo=this.clientInfo.cardNo;
        if(userCardNo!=null && userCardNo.trim()!="" && userCardNo.length==18){
            //获取出生日期
            var birth=userCardNo.substring(6, 10) + "-" + userCardNo.substring(10, 12) + "-" + userCardNo.substring(12, 14);
            this.clientInfo.birthday=birth;
            if (parseInt(userCardNo.substr(16, 1)) % 2 == 1) {
                //男
                var sex=0;
            } else {
                //女
                var sex=1;
            }
            this.clientInfo.sex=sex;
            this.selectedSex=sex;
            //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - userCardNo.substring(6, 10) - 1;
            if (userCardNo.substring(10, 12) < month || userCardNo.substring(10, 12) == month && userCardNo.substring(12, 14) <= day) {
                age++;
            }
            this.clientInfo.age=age;
        }
    },
    async saveOrUpdateClient() {
      if (!validator.isEmpty(this.clientInfo.customerName, "客户姓名不能为空")) {
        return;
      }
      if (!validator.isEmpty(this.clientInfo.phone, "手机号不能为空")) {
        return;
      }
      if (!validator.isEmpty(this.clientInfo.cardNo, "身份证号不能为空")) {
        return;
      }
    //   var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    //   if (reg.test(this.clientInfo.cardNo) === false) {
    //     this.$toast('身份证号码不合法');
    //     return false;
    //   }
      if(!compCheck.isIdno(this.clientInfo.cardNo)){
        this.$toast('身份证号码不合法');
        return false;
      }
      var mailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (this.clientInfo.email!=null && mailReg.test(this.clientInfo.email) === false) {
        this.$toast('邮箱不合法');
        return false;
      }
      var param= {
        "customerName": this.clientInfo.customerName,
        "sex": this.clientInfo.sex,
        "phone": this.clientInfo.phone,
        "email": this.clientInfo.email,
        // "level": "VIP",
        "age": this.clientInfo.age,
        "cardType": this.clientInfo.cardType,
        "cardNo": this.clientInfo.cardNo,
        "customerType": this.clientInfo.customerType ? 1 : 0,
        "birthday": this.clientInfo.birthday,
        "avatar": null,
        "remark": this.clientInfo.remark
      };
      const res = await this.$axios({
        url: this.$API.API_CUSTOMER_INFO_SAVE,
        method: 'post',
        params: param
      });
      if (res.code === 0) {
        this.$toast('添加成功');
        setTimeout(() => {
            this.goback();
        }, 1000);
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // 图片识别
    async afterRead(src){
        let file
        if(this.isIos) {
            file = src.target.files[0]
        } else {
            file = this.btof(src, "upfile")
        }
        this.$toast.loading({duration: 0,message: '图片识别中'});
        var formdata = new FormData();
        formdata.append('type', "01");
        formdata.append('file', file);
        this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
            if (res.data.code === 0) {
                var resStr=res.data.content.content;
                var resJson=JSON.parse(resStr);
                if(resJson.resultCode === 0){
                    this.$toast('识别成功');
                    this.clientInfo.cardNo=resJson.idCard;
                    this.clientInfo.customerName =resJson.name
                    this.handleBirthAndAge();
                } else {
                    this.$toast(resJson.resultMsg);
                }
                // this.$toast.loading({duration: 1});
            } else {
                this.$toast('识别失败');
                // this.$toast.loading({duration: 1});
            }
        });
    },
    showPicChoose(){
      this.showDialog=true;
    },
    // 调用安卓系统
    goGetCamera () {
      console.log('安卓调用摄像头')
      this.showDialog=false;
      app.getCamera({'callbackMethod': 'openAndroidCameraCallback'})
    },
    goGetPic () {
      console.log('安卓调用相册')
      this.showDialog=false;
      app.getPhoto({'callbackMethod': 'openAndroidCameraCallback'})
    },
    // 摄像头回调函数
    openAndroidCameraCallback(result){
      let code = result.code;
      if(code == 0) {
        // this.afterRead(result.object.filePath)
        if(code == 0) {
            this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
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
    }
    
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/customerAdd.less';
</style>