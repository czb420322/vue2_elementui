<template>
  <div class="carBaseInfo accidentInsurancePage">
    <li class="list">
      <div class="info-box" style="position: relative;">
        <van-cell center class="title_cell">
          <template #title>
            <!-- <van-icon :name="$CTXBASE + '/img/carInsurance/info_car@2x.png'" size="22px" /> -->
              <van-icon name="records" size="22px"/>
            <span class="custom-title">非车险</span>
          </template>
          <template #right-icon>
            <div class="price">
              <p class="presentPrice">￥{{ accidentInsurance.totalPrice || 0}}</p>
            </div>
            <van-switch size="26" v-model="switchChecked" @change="totalPrice" />
          </template>
        </van-cell>
        <div v-show="switchChecked">
          <ul class="table">
            <li class="tr header">
              <span class="project">保障项目</span>
              <span class="cost">保费(元)</span>
            </li>
            <li class="tr" v-for="(item,index) in accidentInsurance.list" :key="index">
              <van-icon name="circle" color="#1989fa" size="16px" v-if="item.price && !item.checkbox" @click="selectInsurance(index)" />
              <van-icon name="checked" color="#1989fa" size="16px" v-if="item.price && item.checkbox" @click="selectInsurance(index)" />
              <span class="productName" @click="item.price ? selectInsurance(index) : ''">{{item.productName}}</span>
              <span class="cost" @click="showPopup(item, index)">
                <span class="color_ff7937">{{item.price ? '￥' + item.price : ''}}</span>
                <van-icon name="arrow" />
              </span>
            </li>
          </ul>
        </div>
        <!-- 南江指定用户不显示车+意遮挡 -->
        <i class="bg" v-if="payOrderNo && agentCode != 'S2100154'"></i>
      </div>
    </li>

    <van-action-sheet v-model="show" :title="accidentInsurance.list[accidentInsurance.index].productName" v-if="accidentInsurance.list.length">
      <van-tabs v-if="show" v-model="active" color="#1989fa">
        <van-tab v-for="(item,index) in salePlanInfoList" :key="index" :title="item.programmeName">
          <van-cell-group>
            <van-cell v-for="(mainRisk, index) in item.mainRiskList" :key="index" :title="mainRisk.riskName" :value="`${mainRisk.amount || 0}万`" />
            <van-cell v-for="(addRisk, index) in item.addRiskList" :key="index" :title="addRisk.riskName" :value="`${addRisk.amount || 0}万`" />           
            <van-cell title="保费" :value="newPrice  + '元'" />           
          </van-cell-group>     
      <van-cell title="保障期限" :value="(accidentInsurance.list[accidentInsurance.index].insuYearUnit) | changeDays" />
      <van-cell-group v-for="(m, i) in item.mult" :key="i">
      <van-cell  title="限购份数" :value="m  + '份'" />
      <van-cell title="选购份数">
        <template #right-icon>
          <van-stepper v-model="accidentInsurance.list[accidentInsurance.index].stepper" integer min="1" :max="m" />
        </template>
      </van-cell>
      <van-cell title="座位数" :value="carTypeDTO.seatCount">
      </van-cell>
      </van-cell-group>
      </van-tab>
       </van-tabs>
      <p style="font-size: .7rem; margin:14px;">确认购买本保险产品前，请您仔细阅读、充分理解并同意接受本
        <a class="sign" @click="goPage('carVehicleInsuranceClause?title=' + item.notifiName )" v-for="(item, index) in accidentInsurance.list[accidentInsurance.index].notificationList" :key="index">《{{item.notifiName}}》</a>
      </p>
      <van-row type="flex" justify="space-around" gutter="12" class="footer_bar">
        <van-col span="12">
          <van-button type="info" block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="show=false">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" @click="onConfirm">确定</van-button>
        </van-col>
      </van-row>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import compCheck from './../../../assets/js/util/comp-check';

export default {
  data() {
    return {
      noChoose:true,
      newPrice:"",
      agentCode: localStorage.getItem("agentCode")
    };
  },
  computed: {
    ...mapState({
      accidentInsurance: state => state.car.accidentInsurance,
      salePlanInfoList: state => state.car.accidentInsurance.list.length ? state.car.accidentInsurance.list[state.car.accidentInsurance.index].salePlanInfoList : [],
      programmePremium: state => state.car.accidentInsurance.list.length ? state.car.accidentInsurance.list[state.car.accidentInsurance.index].programmePremium : '',
      VehicleInsurance: state => state.car.VehicleInsurance,
      commercialInsuranceStartDate: state => state.car.commercialInsuranceStartDate,
      compulsoryInsuranceStartDate: state => state.car.compulsoryInsuranceStartDate,
      carTypeDTO: state => state.car.carTypeDTO,
      payOrderNo: state => state.car.policyNo.payOrderNo,
      resPolicyCaa: state => state.car.resPolicyCaa,
      UserInfo: state => state.my.UserInfo,
    }),
    active: {
      get() {
        return this.$store.state.car.accidentInsurance.active
      },
      set(value) {
        this.$store.commit('car/updateCarState', [{ name: ['accidentInsurance', 'active'], value: value }])
        this.calcmobile(true)
      }
    },
    show: {
      get() {
        return this.$store.state.car.accidentInsurance.show
      },
      set(value) {
        
        this.$store.commit('car/updateCarState', [{ name: ['accidentInsurance', 'show'], value: value }])
        
      }
    },
    switchChecked: {
      get() {
        return this.$store.state.car.accidentInsurance.switchChecked
      },
      set(value) {
        this.$store.commit('car/updateCarState', [{ name: ['accidentInsurance', 'switchChecked'], value: value }])
      }
    }
  },
  filters: {
    changeDays: ((value) => {
      if (!value) { return '' }
      let day = value.replace("D", "")
      if (day == '365') { return '1年' }
      return `${day}天`
    })
  },
  //车险搭售非车接口请求
  async created() {
    if(this.UserInfo.manageCode !== '09000000'){ 
    let status = await this.$store.dispatch('car/getNocarProductList')
    if (status) {    
      this.goBinding()
    }
    }
    if(this.carTypeDTO.seatCount < 3){
      this.$store.state.car.accidentInsurance.switchChecked = false
    }
  },
  methods: {
    async showPopup(item, index) {
      let newList = this.accidentInsurance.list[index]
      await this.$store.dispatch('car/getCaaProductDetail', item.productCode)
      this.$store.commit('car/updateCarState', [
        { name: ['accidentInsurance', 'index'], value: index },
      ])
      newList.salePlanInfoList.forEach((e, i) => {    
        if (e.seatCount > this.carTypeDTO.seatCount ) {
            return this.noChoose = false
        }
      })
      this.active = this.accidentInsurance.list[index].active || 0   
      this.show = true
    },
    async onConfirm() {      
      if(!this.noChoose){
        this.$toast('投保座位数不符合最低投保座位数')
        return
      }
      const res = await this.calcmobile()
      if (!res) { return false }
      this.$store.commit('car/updateCarState', [
        { name: ['accidentInsurance', 'list', this.accidentInsurance.index, 'price'], value: this.accidentInsurance.list[this.accidentInsurance.index].salePlanInfoList[this.active].programmePremium * this.accidentInsurance.list[this.accidentInsurance.index].stepper },
        { name: ['accidentInsurance', 'list', this.accidentInsurance.index, 'active'], value: this.active }
      ])
      this.accidentInsurance.list.forEach((item, index) => {
        // 选中非车险
        this.$store.commit('car/updateCarState', [
          { name: ['accidentInsurance', 'list', index, 'checkbox'], value: this.accidentInsurance.index == index ? true : false },
        ])
        this.$store.commit('car/updateCarState', [
          { name: ['accidentInsurance', 'list', index, 'price'], value: this.newPrice },
        ])
        this.totalPrice();
      })
      this.$store.dispatch('car/goVerifyTrial');
      this.show = false
    },
    // 试算
    async calcmobile(temp) {
      // 当前选中车+意险
      let arr = this.accidentInsurance.list[this.accidentInsurance.index]
      // 起保时间
      let startDate
      if (this.VehicleInsurance.switchChecked1) {  // 商业险
        if (this.VehicleInsurance.bImmeValiFlag) {  // 及时起保
          startDate = compCheck.transformDatesDay(this.VehicleInsurance.bImmeValidEndDate.substring(0, 10), 1)
        } else {
          startDate = this.commercialInsuranceStartDate
        }
      } else {
        if (this.VehicleInsurance.cImmeValiFlag) {  // 及时起保
          startDate = compCheck.transformDatesDay(this.VehicleInsurance.cImmeValidEndDate.substring(0, 10), 1)
        } else {
          startDate = this.compulsoryInsuranceStartDate
        }
      }
      const res = await this.$axios({
        url: this.$API.API_MAKE_CALCMOBILE,
        loading: this.trialLoading,
        method: 'post',
        data: {
          saleCode: arr.productCode,
          salePlanInfo: {
            data: {
              insuYearUnit: arr.insuYearUnit,
              setMealCode: arr.salePlanInfoList[this.active].setMealCode,
              mult:temp? 1:arr.stepper,
              beginDate: startDate,
              insuredInfo: [],
              seatCount: this.carTypeDTO.seatCount
            }
          },
          mult: temp? 1:arr.stepper,
          planCode: "",
          setMealCode: arr.salePlanInfoList[this.active].setMealCode,
          insuYearUnit: arr.insuYearUnit,
          mainRiskList: arr.salePlanInfoList[this.active].mainRiskList,
          addRiskList: arr.salePlanInfoList[this.active].addRiskList,
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system')
        }
      });
      if (res.code === 0 && res.content.result != '1') {
        this.newPrice = res.content.sumPrem      
        if (arr.salePlanInfoList[this.active].addRiskList && arr.salePlanInfoList[this.active].addRiskList.length) {
          arr.salePlanInfoList[this.active].addRiskList.forEach((it, i) => {
            for (let key of res.content.addRiskList) {
              if (it.code == key.code) {
                it.premium = key.prem
                it.rate = key.rate
              }
            }
          })
        }
        arr.salePlanInfoList[this.active].mainRiskList.forEach((it, i) => {
          for (let key of res.content.mainRiskList) {
            if (it.code == key.code) {
              it.premium = key.prem
              it.rate = key.rate
            }
          }
        })
        this.$store.commit('car/updateCarState', [
          { name: ['accidentInsurance', 'list', this.accidentInsurance.index], value: arr },
        ])
        return true
      }
      this.$toast(res.content.resultMessage || '请求失败');
      return false
    },
    selectInsurance(key) {
      this.accidentInsurance.list.forEach((item, index) => {
        // 选中非车险
        this.$store.commit('car/updateCarState', [
          { name: ['accidentInsurance', 'list', index, 'checkbox'], value: index == key ? true : false },
        ])
        //  this.$store.commit('car/updateCarState', [
        //   { name: ['accidentInsurance', 'list', index, 'price'], value: this.newPrice },
        // ])
        this.totalPrice();
      })
      this.$store.dispatch('car/goVerifyTrial');
    },
    totalPrice() {
      if(this.carTypeDTO.seatCount < 3){
        if(this.switchChecked){
          this.$dialog.alert({
            title: '温馨提示  ',
            message:"车辆座位数小于3，没有合适的搭售产品",
          }).then(()=>{
            this.switchChecked = false
          })
        }
      }else{
        if (this.switchChecked) {
          this.accidentInsurance.list.forEach((item, index) => {
            // 总价
            if (item.checkbox) {
              this.$store.commit('car/updateCarState', [
                { name: ['accidentInsurance', 'totalPrice'], value: this.newPrice },
              ])
            }
          })
        } else {
          this.$dialog.confirm({
                  title: '请确认是否取消购买非车险产品',
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  }).then(() => {
                          this.switchChecked = false
                          this.$store.commit('car/updateCarState', [
                          { name: ['accidentInsurance', 'totalPrice'], value: 0 },
                          ])
                  }).catch(() => {
                          this.switchChecked = true
                  });
          
        }
      }
      this.$store.dispatch('car/goVerifyTrial');
    },
    // 捆绑销售
    async goBinding() {
      this.switchChecked = true
      let resPolicyCaa = JSON.parse(JSON.stringify(this.resPolicyCaa))
      // 捆绑销售初始化
      if (!this.resPolicyCaa || !this.resPolicyCaa.suiteCode) {    
        resPolicyCaa = {
          suiteCode: 'GRMOBILE_MALL_SL034',
          quantity: 1
        }
        this.active = this.carTypeDTO.seatCount > 5 ? 1 : 0
      // } else {
      //   // 车+意是否有编辑(编辑进入置灰屏蔽)
      //   this.$store.commit('car/updateCarState', [
      //     { name: ['policyNo', 'payOrderNo'], value: this.resPolicyCaa.orderNo },
      //   ])
      }
      // 车+意轨迹
      let index = 0
      this.accidentInsurance.list.forEach((item, i) => {
        if (item.productCode == resPolicyCaa.suiteCode) {
          index = i
        }
      })
      let item = this.accidentInsurance.list[index]
      await this.$store.dispatch('car/getCaaProductDetail', item.productCode)
      this.$store.commit('car/updateCarState', [
        { name: ['accidentInsurance', 'index'], value: index },
        { name: ['accidentInsurance', 'list', index, 'stepper'], value: resPolicyCaa.quantity || 1 }
      ])
      item.salePlanInfoList.forEach((element, i) => {
        if (element.setMealCode == resPolicyCaa.setMealCode) {
          this.active = i
        }
      })
      this.onConfirm();
    }
  }
};
</script>
<style lang="less">
.accidentInsurancePage {
  .title_bar {
    text-align: center;
  }
  .van-field__label {
    color: #323233;
  }
  .table {
    .tr {
      align-items: center;
      .van-icon-circle,
      .van-icon-checked {
        margin-right: 8px;
      }
    }
  }
  .footer_bar {
    margin: 1.2rem 3.5% 3.5%;
  }
  .color_ff7937 {
    color: #ff7937;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>