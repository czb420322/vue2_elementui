<template>
  <div>
    <v-header v-if="page.showTitle"  :title="{ name: '家庭' }"></v-header>
    <div class="page-group" :style="{ top: ($iosSystem + 46) + 'px' }">
		<div class="page page-current" id="familyInfo-page">
      <!-- <header v-if="page.showTitle" class="bar bar-nav" style="background: #0252ff;">
          <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
          <h1 class="title" style="color:white;">家庭</h1>
      </header> -->

      <div class="content content-client-page-family" style="background-color:white;">
        <div class="edit">
          <span @click="changeModel">{{ btnTitle }}</span>
        </div>
        <div class="info">
            <div>
              <div class="head">
                <img v-if="homeInfo.avatar" :src="homeInfo.avatar">
                <img v-else-if="homeInfo.sex===0" src="./../../../public/img/client/header_a_3x.png">
                <img v-else-if="homeInfo.sex===1" src="./../../../public/img/client/header_b_3x.png">
                <img v-else src="./../../../public/img/client/header_a_3x.png">
              </div>
            </div>
            <div class="use">
              <div class="famili-flex">
                <div class="family-lable">主客户:</div>
                <div class="family-flexitem">
                  <input v-if="isEdit" type="text" v-model="homeInfo.customerName" @click="showCustomerPicker">
                  <input v-else readonly type="text" v-model="homeInfo.customerName">
                  <van-popup v-model="customerPickerShow" round position="bottom">
                    <van-picker
                      show-toolbar
                      value-key="customerName"
                      :columns="customerOpitons"
                      @cancel="customerPickerShow = false"
                      @confirm="onCustomerConfirm"
                    />
                  </van-popup>
                </div>
              </div>
               <div class="famili-flex">
                <div class="family-lable">联系方式:</div>
                <div class="family-flexitem">
                  <!-- <a :href="'tel:' + homeInfo.createdUser" v-if="homeInfo.createdUser"> -->
                    <input v-if="isEdit" type="text" v-model="homeInfo.createdUser">
                     <a v-else :href="'tel:' + homeInfo.createdUser">
                       <input  type="text" v-model="homeInfo.createdUser">
                    </a>
                  <!-- </a> -->
                  <!-- <div v-else>
                     <input v-if="isEdit" type="text" v-model="homeInfo.createdUser">
                    <input v-else-if="homeInfo.createdUser == '' " type="text" v-model="homeInfo.createdUser">
                  </div> -->
                 
                   <!-- <a else :href="'tel:' + homeInfo.createdUser">{{homeInfo.createdUser || ''}}</a> -->
                  <!-- <input  readonly type="text" v-model="homeInfo.createdUser"> -->
                </div>
              </div>
              <div class="famili-flex">
                <div class="family-lable">家庭名称:</div>
                <div class="family-flexitem">
                  <input v-if="isEdit" type="text" v-model="homeInfo.homeName">
                  <input v-else readonly type="text" v-model="homeInfo.homeName">
                </div>
              </div>
              <div v-if="isEdit" class="famili-flex" @click="show = true">
                <div class="family-lable">家庭地址:</div>
                <div class="family-flexitem">
                  {{ homeInfo.provinceName }} {{ homeInfo.ciryName }} {{ homeInfo.areaName }}
                </div>
              </div>
              <div v-else class="famili-flex">
                <div class="family-lable">家庭地址:</div>
                <div class="family-flexitem">
                  {{ homeInfo.provinceName }} {{ homeInfo.ciryName }} {{ homeInfo.areaName }}
                </div>
              </div>
              <div class="famili-flex">
                <div class="family-lable">详细地址:</div>
                <div class="family-flexitem">
                  <input v-if="isEdit" type="text" v-model="homeInfo.homeAddressDetail" placeholder="如街道、小区、门牌号等">
                  <input v-else readonly type="text" v-model="homeInfo.homeAddressDetail" placeholder="如街道、小区、门牌号等">
                </div>
              </div>


                <!-- <div>家庭名称：<input type="text" v-model="homeInfo.homeName"></div>
                <div>
                  <div style="font-size: 0.85rem;" @click="show = true">家庭地址：{{ homeInfo.provinceName }} {{ homeInfo.ciryName }} {{ homeInfo.areaName }}</div>
                  <van-popup v-model="show" position="bottom">
                    <van-area
                      :area-list="areaList"
                      :columns-placeholder="['请选择', '请选择', '请选择']"
                      @confirm="confirmArea"
                      @cancel="show = false"
                    />
                  </van-popup>
                </div>
                <div>详细地址：<input type="text" v-model="homeInfo.homeAddressDetail" placeholder="如街道、小区、门牌号等"></div> -->
            </div>
        </div>
        <div class="tabs">
            <div :class="{'curr': isTab===1}" @click="isTab=1">家庭信息</div>
            <div :class="{'curr': isTab===2}" @click="isTab=2">车辆信息</div>
            <div :class="{'curr': isTab===3}" @click="isTab=3">宠物信息</div>
        </div>
        <div class="fialy-info" v-if="isTab===1" style="height: 50%;overflow-y: scroll;">
            <div class="info fly" v-for="(item, index) in homeInfo.detailList" :key="index">
              <div @click="gotoFamilyEdit(item)">
                  <div class="head">
                      <img v-if="item.avatar" :src="item.avatar">
                      <img v-else-if="item.sex===0" src="./../../../public/img/client/header_a_3x.png">
                      <img v-else-if="item.sex===1" src="./../../../public/img/client/header_b_3x.png">
                      <img v-else src="./../../../public/img/client/header_a_3x.png">
                  </div>
              </div>
              <div class="finay">
                  <div class="use" @click="gotoFamilyEdit(item)">
                      <div>{{ item.name }}</div>
                      <div>身份证：{{ item.cardNo }}</div>
                      <div>年龄：{{ item.cardNo | getAgeByCardNo }}</div>
                      <div>性别：
                        <span v-if="item.sex == 0">男</span>
                        <span v-else>女</span>
                      </div>
                      <div>与主客户关系：{{ item.relation }}</div>
                      <div>联系方式： <span class="mb">{{ item.phone }}</span></div>
                  </div>
                  <!-- <div class="lint"></div>
                  <div class="iphone">
                      <a :href="'tel:' + item.phone"><img class="ic" src="./../../../public/img/client/ic_phonecall.png"></a>
                  </div> -->
              </div>
            </div>
            <my-empty v-if="homeInfo.detailList==null||homeInfo.detailList.length===0" description="查询无数据" v-show="true"></my-empty>
        </div>
        <div class="add" v-if="isTab===1"  style="margin-top: 1rem; text-align: center;" @click="gotoFamilyAdd">
          <span>+ 添加家庭成员</span>
        </div>
        <div class="vehicle" v-if="isTab===2">
          <div class="upload">
              <input v-if="isIos" type="file" accept="image/*" @change="afterRead($event)" ref="refIdInput" />
              <img @click="isIos ? null : showPicChoose()" class="ic" src="./../../../public/img/client/img_car.png">
              <!-- <van-uploader :after-read="afterRead" capture="capture" accept="image/*">
                <img class="ic" src="./../../../public/img/client/img_car.png">
              </van-uploader> -->
          </div>
          <div class="tips">
              点击上传<span class="red">行驶证</span>，并输入行驶证上对应信息
          </div>
          <div class="carlist">
            <ul>
              <li v-for="(item,index) in homeInfo.carList" :key="index">
                <van-cell-group class="cargroup">
                  <van-field v-model="item.carNo" label="车牌号" placeholder="请输入车牌号" />
                  <van-field v-model="item.carCjh" label="车架号" placeholder="请输入车架号" />
                  <van-field v-model="item.carFdjh" label="发动机号" placeholder="请输入发动机号" />
                  <van-field readonly v-model="item.carCdrq" label="初登日期" placeholder="请输入初登日期" @click="showDatePicker(item)" />
                  <van-popup v-model="dateShow" round position="bottom">
                      <van-datetime-picker
                          @cancel="cancelPicker"
                          @confirm="confirmPicker"
                          v-model="currentDate"
                          type="date"
                          :formatter="formatter"
                          :min-date="minDate"
                          :max-date="maxDate"
                      />
                  </van-popup>
                  <van-field v-model="item.carBrand" label="品牌" placeholder="请输入品牌" />
                  <van-field v-model="item.carModel" label="型号" placeholder="请输入型号" />
                  <van-field v-model="item.carAge" label="车龄" placeholder="请输入车龄" />
                </van-cell-group>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <van-popup v-model="show" position="bottom">
        <van-area
          :area-list="areaList"
          :columns-placeholder="['请选择', '请选择', '请选择']"
          @confirm="confirmArea"
          @cancel="show = false"
        />
      </van-popup>
      <!-- 选择拍照相册选择 -->
      <van-dialog v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
          <van-cell-group title="请选择图片来源">
          <van-cell @click="goGetPic()" title="相册" />
          <van-cell @click="goGetCamera()" title="拍照" />
          </van-cell-group>
      </van-dialog>
    </div>
	<!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
// import vFooter from "@/templates/footer.vue";
// import util from '@/assets/js/util/util';
import city from '../../assets/js/util/city';
import validator from '../../assets/js/util/validator';
import { formatDate } from '@/assets/js/util/dateFmt';
import app from '../../assets/js/util/app';
export default {
  components: {
    // vFooter: vFooter
  },
  data() {
    return {
      page: {
        autoloader: true,
        showTitle: true,
        type: 2
      },
      homeId: null,
      isTab: 1,
      isEdit: false,
      btnTitle: '修改',
      homeInfo: {
        avatar: null,
        homeName: '',
        customerId: null,
        customerName: '',
        provinceKey: '',
        provinceName: '',
        cityKey: '',
        ciryName: '',
        areaKey: '',
        areaName: '',
        homeAddressDetail: '',
        detailList: [],
        carList: []
      },
      show: false,
      carmodel:'wrqrqewrqewr',
      areaList: city.getAreaList(),
      customerOpitons: [],
      customerPickerShow: false,
      dateShow: false,
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(),
      cuttentCar: null,
      currentDate: null,
      isIos: false,
      showDialog: false,
      state:'',
    }
  },
  filters:{
    // 获取年龄
    getAgeByCardNo (userCardNo){
      if(userCardNo!=null && userCardNo.trim()!="" && userCardNo.length==18){
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - userCardNo.substring(6, 10) - 1;
        if (userCardNo.substring(10, 12) < month || userCardNo.substring(10, 12) == month && userCardNo.substring(12, 14) <= day) {
            age++;
        }
        return age;
      }
    }
  },
  created() {
    this.state = this.$route.query.type || '';
    if(Object.keys(this.$route.query).length !== 0) {
      this.homeId=this.$route.query.homeId;
      // homeId不为空,查询家庭信息
      if(this.homeId!=null&&this.homeId!=""){
        this.queryHomeInfo();
        this.isEdit = false
        this.btnTitle = '修改'
      } else {
        this.isEdit = true
        if(this.$route.query.customerName && this.$route.query.type == 'add') {
          this.homeInfo.customerName = this.$route.query.customerName
          this.homeInfo.customerId = this.$route.query.id
        }
        this.btnTitle = '保存'
      }
    }
    this.queryCustomer()
    this.isIos = app.isIos()
  },
  mounted () {
    window.openAndroidCameraCallback = this.openAndroidCameraCallback;
  },
  methods: {
    // 返回上个页面
    goback: function () {
      // if(this.btnTitle=="修改"){
      //   this.$router.replace({path: '/customerInfo', query: {type: 2}})
      // } else {
      //   history.back();
      // }
      history.back();
    },
    // 变更修改状态
    changeModel: function () {
      if(this.isEdit) {
        if (!validator.isEmpty(this.homeInfo.customerName, "主客户不能为空")) {
          return;
        }
        if (!validator.isEmpty(this.homeInfo.homeName, "家庭名称不能为空")) {
          return;
        }
        if (!validator.isEmpty(this.homeInfo.provinceName, "请选择家庭地址")) {
          return;
        }
        if (!validator.isEmpty(this.homeInfo.ciryName, "家庭地址不完整")) {
          return;
        }
        if (!validator.isEmpty(this.homeInfo.areaName, "家庭地址不完整")) {
          return;
        }
        if(this.homeInfo.carList && this.homeInfo.carList.length > 0) {
          for(let item of this.homeInfo.carList) {
            if (!validator.isRackNo(item.carCjh, "车架号格式不正确")) {
              return;
            }
          }
        }
        this.isEdit = false
        this.btnTitle = '修改'
        this.saveHomeInfo(this.homeInfo)
      } else {
        this.isEdit = true
        this.btnTitle = '保存'
      }
    },
    // 查询未创建家庭客户
    async queryCustomer(){
      const res = await this.$axios({
        url: this.$API.API_CLIENT_LISTNOHOME,
        method: 'get'
      });
      if (res.code === 0) {
        this.customerOpitons = res.content
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // 查询家庭信息
    async queryHomeInfo(){
      const res = await this.$axios({
        url: this.$API.API_CLIENT_DETAIL,
        method: 'get',
        params: {
          id: this.homeId
        }
      });
      if (res.code === 0) {
        if(res.content!=null) {
          this.homeInfo = res.content
          if(this.homeInfo.carList && this.homeInfo.carList.length > 0) {
            this.homeInfo.carList.map(item => {
              if(item.carCdrq){
                item.carAge = new Date().getFullYear() - item.carCdrq.slice(0,4)
                if(item.carAge == 0){//处理没有满一年车龄的情况
                  item.carAge = 1
                }
              }else{
                item.carAge = ''
              }
            })
          }
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // 保存家庭信息
    async saveHomeInfo(param){
      const res = await this.$axios({
        url: this.$API.API_CLIENT_HOMESAVE,
        method: 'post',
        data: param
      });
      if (res.code === 0) {
        this.homeInfo = res.content.content
        this.queryHomeInfo();
        this.homeId=this.homeInfo.id;
        console.info('save res:', res)
        return true;
      } else {
        this.$toast(res.content.resultMessage);
        return false;
      }
    },
    // 省市区选择改变
    confirmArea(e){
      this.show = false
      this.homeInfo.provinceKey = e[0].code
      this.homeInfo.cityKey = e[1].code
      this.homeInfo.areaKey = e[2] ? e[2].code : ''
      this.homeInfo.provinceName = e[0].name
      this.homeInfo.ciryName = e[1].name
      this.homeInfo.areaName = e[2] ? e[2].name : ''
    },
    // 选择客户确认
    onCustomerConfirm (ele) {
      this.customerPickerShow = false
      this.homeInfo.customerName = ele.customerName
      this.homeInfo.customerId = ele.id
    },
    // 新增家庭成员
    gotoFamilyAdd () {
      if(this.homeId) {
        this.$router.push({ name: 'familyAdd', params: { 'homeInfo': this.homeInfo, 'type': 'add'}});
      } else {
        this.$toast('请添加家庭!');
      }
    },
    gotoFamilyEdit (item) {
      this.$router.push({ name: 'familyAdd', params: { 'item': item, 'homeInfo': this.homeInfo, 'type': 'edit'}});
    },
    // 上传行驶证
    async afterRead(src){
      let file
      if(this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
        file = this.btof(src, "upfile")
      }
      this.$toast.loading({duration: 0,message: '图片识别中'});
      var formdata = new FormData();
      formdata.append('file', file);
      this.instance.post('file/upload/driveLicense', formdata).then((res) => {
        if(this.$refs.refIdInput){
          this.$refs.refIdInput.value = "";
        }
        if(res.data.code === 0) {
         
          let resData = JSON.parse(res.data.content.content)
          if(resData.resultCode == 0) {
            this.$toast('识别成功');
            const car = {
              "homeId": this.homeId,
              "imgId": resData.imageUrl,
              'carNo': resData.plate_num,
              'carCjh': resData.vin,
              'carFdjh': resData.engine_num,
              'carCdrq': resData.register_date.slice(0,4) + '-' + resData.register_date.slice(4,6) + '-' + resData.register_date.slice(6,8),
              'carBrand': resData.model.split("牌")[0],
              'carModel': resData.model.split("牌")[1],
              'carAge': resData.register_date.slice(0,4) + '-' + resData.register_date.slice(4,6) + '-' + resData.register_date.slice(6,8)
            };
            if(!this.homeInfo.carList) {
              this.homeInfo.carList = []
            }
            if(this.homeInfo.carList[0].carNo == '' || this.homeInfo.carList[0].carCjh == '' ){
               this.homeInfo.carList[0] = car
            }else{
              this.homeInfo.carList = [...this.homeInfo.carList, car]
            }
            
            this.saveHomeInfo(this.homeInfo)
          } else {
            this.$toast(resData.resultMsg);
          }
          // this.$toast.loading({duration: 1});
        } else {
            this.$toast('识别失败');
            // this.$toast.loading({duration: 1});
        }
      });
    },
    // 显示客户选择
    showCustomerPicker () {
      if(this.customerOpitons && this.customerOpitons.length > 0) {
        this.customerPickerShow = true
      } else {
        this.$toast('暂无无家庭客户');
      }
    },
    cancelPicker: function() {
      this.dateShow = false;
    },
    confirmPicker: function(date) {
      this.currentDate = formatDate(date,'yyyy-MM-dd')
      this.cuttentCar.carCdrq = this.currentDate.toString()
      this.dateShow = false;
    },
    showDatePicker (item) {
      this.dateShow = true;
      this.cuttentCar = item
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
        this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
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
@import '../../assets/less/app/client/familyInfo.less';
</style>