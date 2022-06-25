<template>
  <div>
    <div class="page-group">
        <div class="page page-current" id="customerDetail-page">
            <!-- <header v-if="showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">添加家庭成员</h1>
            </header> -->
            <v-header v-if="showTitle" class="bar bar-nav" :title="{ name: title }"></v-header>
			<div class="content customer-detail-page" :style="{ top: ($iosSystem + 46) + 'px' }" style="padding-top: 0.5rem;">
                <div class="clientInfo-div">
                    <div class="list-block">
                        <ul>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label label-required">客户姓名</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入客户姓名"  value="" v-model="clientInfo.name">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label label-required">与主客户关系</div>
                                        <div class="item-input">
                                        <!-- <input type="text" placeholder="请输入与主客户关系" value="" v-model="clientInfo.relation"> -->
                                        <select v-model="clientInfo.relation">
                                            <option v-for="(item, i) in relationArr" :key="i" :value="item.val">{{item.text}}</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label label-required">身份证</div>
                                    <!-- <div class="item-input">
                                        <input type="text" placeholder="请输入身份证号码" @blur="handleBirthAndAge" value="" v-model="clientInfo.cardNo">
                                    </div> -->
                                    <!-- <div class="scanid"> -->
                                        <van-field :label="informationItem.name" :placeholder="informationItem.holder"  v-model.trim='clientInfo.cardNo'>
                                            <idNoScan :params="informationItem" slot="button"   @change="idNoInfoEvent('input', informationItem, $event)"></idNoScan>
                                        </van-field>
                                        <!-- <input v-if="isIos" class="js_upFile cover1" @change="afterRead($event)" type="file" name="cover" accept="image/*" capture="camera"/>
                                        <img @click="isIos ? null : showPicChoose()" src="./../../../public/img/client/ic_scanid.png"> -->
                                       
                                    <!-- </div> -->
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
                                    <div class="item-title label">手机号</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入手机号" value="" v-model="clientInfo.phone">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="clientInfo-div">
                    <div class="list-block">
                        
                    </div>
                </div> -->
                <div class="btnbox">
                    <div class="button button-big button-fill button-customer-h5 button-down" :class="{'disabled' :isUpdateIng}" @click="saveOrUpdateClient()">{{isUpdateIng ? '保存中...':'保存'}}</div>
                </div>
                <!-- 选择拍照相册选择 -->
                <!-- <van-dialog v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
                    <van-cell-group title="请选择图片来源">
                    <van-cell @click="goGetPic()" title="相册" />
                    <van-cell @click="goGetCamera()" title="拍照" />
                    </van-cell-group>
                </van-dialog> -->
            </div>
		</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/util/dateFmt';
import validator from '@/assets/js/util/validator';
import compCheck from '../../assets/js/util/comp-check';
import app from '../../assets/js/util/app';
import idNoScan from './../../templates/idNoScan.vue';
export default {
  components: {
    idNoScan
  },
  data() {
    return {
      title:'添加家庭成员',
      page: {
        autoloader: true,
        showTitle: true,
      },
      showTitle: true,
      isUpdateIng: false,
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(),
      show: false,
      relationArr: [
          {
              "text": "父母",
              "val": "父母"
          },
          {
              "text": "夫妻",
              "val": "夫妻"
          },
          {
              "text": "子女",
              "val": "子女"
          },
          {
              "text": "祖孙",
              "val": "祖孙"
          },
          {
              "text": "其他",
              "val": "其他"
          }
      ],
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
        name: '',
        homeId: '',
        relation: '',
        cardNo: '',
        sex: null,
        birthday: "",
        phone: ''
      },
      dataEnum: {},
      selBirthday: null,
      selectedSex: null,
      selCustomerType: 0,
      homeInfo: null,
      pageType: 'add',
      isIos: false,
      showDialog: false,
      informationItem:{
          code:'idNo',
          name:'',
          isNeed:'N'
      }
    }
  },
  created() {
      this.selectedSex=this.clientInfo.sex;
      this.selCustomerType=this.clientInfo.customerType;
      if(this.$route.params.type == 'add') {
        this.pageType = 'add'
        this.homeInfo = this.$route.params.homeInfo;
      } else {
        this.title ='编辑家庭成员'
        document.title = '编辑家庭成员';

        this.pageType = 'edit'
        this.clientInfo = this.$route.params.item
        this.selectedSex = this.$route.params.item.sex
        if(this.clientInfo.birthday == null) {
            this.clientInfo.birthday = ''
        } else {
            this.selBirthday=new Date(this.clientInfo.birthday);
            this.clientInfo.birthday=formatDate(new Date(this.clientInfo.birthday),'yyyy-MM-dd')
        }
        this.homeInfo = this.$route.params.homeInfo;
      }
      this.isIos = app.isIos()
  },
  mounted () {
    // window.openAndroidCameraCallback = this.openAndroidCameraCallback;
  },
  destroyed () {
    this.$toast.loading({duration: 1});
  },
  methods: {
       // 身份信息识别
    idNoInfoEvent(type, item, obj, i) {
      if(obj.name){
        this.clientInfo.name =  obj.name;
      }
      if(obj.idNo){
       this.clientInfo.cardNo =  obj.idNo;
      }
      this.handleBirthAndAge()

    },
    // 返回上个页面
    goback: function () {
        if(this.pageType=="add"){
            this.$router.push({path: '/familyInfo', query:{homeId: this.homeInfo.id}})
        } else {
            history.back();
        }
        // history.back();
    },
    showPopup: function() {
        this.show = true;
    },
    cancelPicker: function() {
        this.selBirthday=new Date(this.clientInfo.birthday);
        this.show = false;
    },
    confirmPicker: function(date) {
        this.clientInfo.birthday=formatDate(date,'yyyy-MM-dd')
        console.log('birthday', this.clientInfo.birthday)
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
    // 根据身份证号码获取年龄及生日
    handleBirthAndAge(){
        if(!compCheck.isIdno(this.clientInfo.cardNo)){
            this.$toast('身份证号码不合法');
            return false;
        }
        var userCardNo=this.clientInfo.cardNo;
        if(userCardNo!=null && userCardNo.trim()!="" && userCardNo.length==18){
            //获取出生日期
            var birth=userCardNo.substring(6, 10) + "-" + userCardNo.substring(10, 12) + "-" + userCardNo.substring(12, 14);
            this.clientInfo.birthday=birth;
            var sex
            if (parseInt(userCardNo.substr(16, 1)) % 2 == 1) {
                //男
                sex=0;
            } else {
                //女
                sex=1;
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
        } else {
            this.$toast('身份证号码不合法');
        }
    },
    async saveOrUpdateClient() {
        if (!validator.isEmpty(this.clientInfo.name, "客户姓名不能为空")) {
            return;
        }
        if (!validator.isEmpty(this.clientInfo.relation, "与主客户关系不能为空")) {
            return;
        }
        // var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        // if (reg.test(this.clientInfo.cardNo) === false) {
        //     this.$toast('身份证号码不合法');
        //     return false;
        // }
        if(!compCheck.isIdno(this.clientInfo.cardNo)){
            this.$toast('身份证号码不合法');
            return false;
        }
        if(this.pageType == 'add') {
            if(!this.homeInfo.detailList) {
                this.homeInfo.detailList = []
            }
            this.homeInfo.detailList.push(
                {
                    "homeId": this.homeInfo.id,
                    "name": this.clientInfo.name,
                    "relation": this.clientInfo.relation,
                    "cardNo": this.clientInfo.cardNo,
                    "sex": this.clientInfo.sex,
                    "birthday": this.clientInfo.birthday,
                    "phone": this.clientInfo.phone,
                    "age": this.clientInfo.age
                }
            )
        } else {
            const data = {
                'id': this.clientInfo.id,
                "homeId": this.homeInfo.id,
                "name": this.clientInfo.name,
                "relation": this.clientInfo.relation,
                "cardNo": this.clientInfo.cardNo,
                "sex": this.clientInfo.sex,
                "birthday": this.clientInfo.birthday,
                "phone": this.clientInfo.phone
            }
            this.homeInfo.detailList.map(item => item.id == this.clientInfo.id ? data : item)
        }
        const res = await this.$axios({
            url: this.$API.API_CLIENT_HOMESAVE,
            method: 'post',
            data: this.homeInfo
        });
        if (res && res.code === 0) {
            this.finished=true
            // this.$router.push({path: '/familyInfo', query:{homeId: this.homeInfo.id}})
            this.goback()
        } else {
            this.$toast(res.message); 
        }
    },
    // 图片识别
    // async afterRead(src){ 
    //     let file
    //     if(this.isIos) {
    //         file = src.target.files[0]
    //     } else {
    //         // let base64 = this.getBase64Image(src)
    //         console.log('bassrce64:', src)
    //         file = this.btof(src, "upfile")
    //     }
    //     this.$toast.loading({duration: 0,message: '图片识别中'});
    //     var formdata = new FormData();
    //     //下面是要传递的参数
    //     formdata.append('type', "01");
    //     formdata.append('file', file);
    //     this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
    //         if (res.data.code === 0) {
    //             var resStr=res.data.content.content;
    //             var resJson=JSON.parse(resStr);
    //             if(resJson.resultCode === 0){
    //                 this.$toast('识别成功');
    //                 this.clientInfo.cardNo=resJson.idCard;
    //                 this.handleBirthAndAge();
    //             } else {
    //                 this.$toast(resJson.resultMsg);
    //             }
    //             // this.$toast.loading({duration: 1});
    //         } else {
    //             this.$toast('识别失败');
    //             // this.$toast.loading({duration: 1});
    //         }
    //     });
    // },
    // showPicChoose(){
    //   this.showDialog=true;
    // },
    // 调用安卓系统
    // goGetCamera () {
    //   console.log('安卓调用摄像头')
    //   this.showDialog=false;
    //   app.getCamera({'callbackMethod': 'openAndroidCameraCallback'})
    // },
    // goGetPic () {
    //   console.log('安卓调用相册')
    //   this.showDialog=false;
    //   app.getPhoto({'callbackMethod': 'openAndroidCameraCallback'})
    // },
    // 摄像头回调函数
    // openAndroidCameraCallback(result){
    //   let code = result.code;
    //   if(code == 0) {
    //     this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
    //   }

    // },
    // 换为base64格式
    // getBase64Image(src) {
    //   var img = new Image();
      
    //   // 加载完成执行
    //   img.onload = function(){
    //     // 打印
    //     console.log('width:'+img.width+',height:'+img.height)
    //   }
    //   img.src= src;
    //   console.log('width:'+img.width+',height:'+img.height)
    //   var c = document.createElement("canvas");
    //   //设置canvas宽高为图片宽高
    //   c.width= 80;
    //   c.height= 80;
    //   //将图片绘制到canvas
    //   var cxt=c.getContext("2d");
    //   cxt.drawImage(img,0,0);
    //   //得到图片的base64编码数据
    //   var base64 = c.toDataURL();
    //   return base64;
    // },
    // // base64 转file
    // btof(data, fileName) {
    //   const dataArr = data.split(",");
    //   const byteString = atob(dataArr[1]);

    //   const options = {
    //     type: "image/jpeg",
    //     endings: "native"
    //   };
    //   const u8Arr = new Uint8Array(byteString.length);
    //   for (let i = 0; i < byteString.length; i++) {
    //     u8Arr[i] = byteString.charCodeAt(i);
    //   }
    //   return new File([u8Arr], fileName + ".jpg", options);
    // }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/customerAdd.less';
.van-field{
    padding: 10px 0;
}
.van-cell{
     padding: 0;
}
.item-inner{
    padding-top: 0;
    padding-bottom: 0;
}
</style>