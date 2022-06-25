<template>
  <div class="casWrapper" ref="parentCo">
    <!--<div class="content">-->
      <transition name="fade">
        <div class="first" v-show="showFirst">
          <!--按关键字查询品牌-->
          <div class="search"><input v-model="searchBrandKey" placeholder="输入关键字查询品牌"  @keyup.enter="getBrandByFuzzy" @blur="getBrandByFuzzy"/> <span class="btn" @click="getBrandByFuzzy"><i class="el-icon-search"></i></span></div>
          <ul>
            <li class='firstItem' v-for="(item,index) in brandList" :key="index" @click="getModelByBrand(item.field);selectBrand(item.value, item.field);">
              <!--<span v-if="item.value != '其他' && item.value == carBrand" class="on">{{item.value}}</span>-->
              <span v-if="item.value != '其他'">{{item.value}}</span>
            </li>
            <!--<li class='firstItem' v-if="brandList.length" @click="getModelByBrand(0);selectBrand('其他',0);">-->
              <!--<span>其他</span>-->
            <!--</li>-->
            <li v-if="!brandList.length"> 暂无数据</li>
          </ul>
        </div>
      </transition>

      <transition name="fade1">
        <div class="second"  v-show="showSecond" >
          <!--按品牌或者关键字查询型号-->
          <div class="search"><input v-model="searchKey" placeholder="请输入品牌下的关键字查询" @keyup.enter="getModelByBrandAndFuzzy" @blur="getModelByBrandAndFuzzy" /> <span class="btn" @click="getModelByBrandAndFuzzy"><i class="el-icon-search"></i></span></div>
          <ul>
            <li class='firstItem' v-for="(item,index) in cModels" :key="index" @click="selectModel(item.value, item.field, item.choice, $event);singleSelectModel(item.value, item.field, $event)">
              <span v-if="item.choice == true" class="on">{{item.value}}</span>
              <span v-else>{{item.value}}</span>
            </li>
            <li v-if="!modelByBrandList.length"> 暂无数据</li>
          </ul>
        </div>
      </transition>
    <!--</div>-->

  </div>
</template>
<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  export default {
    props: ["vehicleKind","showFirst","showSecond","carBrand","carModel",'icoclick'],
    data() {
      return {
        brandList: [],
        modelByBrandList:[],
        searchKey: '',
        searchBrandKey: '',
        vehicleBrand: '不限',
        vehicleBrandCode: null,
        vehicleModelList: [],
        vehicleModelCodeList: [],
        vehicleModel:'',
        vehicleModelCode:'',
        oldVehicleKind: null,
        flag: false
      }
    },
    watch:{
      showFirst(newValue,oldValue){
        if(newValue){
          this.vehicleBrand = '不限';
          this.vehicleBrandCode = null;
          this.getModel();
        }
      },
      carBrand(newValue,oldValue){
        if(newValue=='不限'){
          this.vehicleBrand = '不限';
          this.vehicleBrandCode = null;
        }
      },
      carModel(newValue, oldValue){
        return newValue;
      },
      icoclick(newValue, oldValue){
        if(newValue){
          this.getModel();
          this.$emit('changeicoclick',false)
        }
      },
      vehicleKind(newValue, oldValue){
        console.log(newValue)
      }
    },
    computed:{
      cModels(){
        let arr = this.modelByBrandList;
        let checkedItems = [];
        if(this.carModel != "不限" && this.carModel != null && this.carModel != ""){
          checkedItems = this.carModel.split(",");
        }else{
          this.vehicleModelList = [];
          this.vehicleModelCodeList = [];
          this.vehicleModel = "";
          this.vehicleModelCode = "";
        }
        if(arr.length > 0){
          for(let i=0;i<arr.length;i++){
            if(checkedItems.length > 0){
              for(let j=0;j<checkedItems.length;j++){
                if(arr[i].value === checkedItems[j]){
                  arr[i].choice = true;
                  break;
                }else{
                  arr[i].choice = false;
                }
              }
            }else{
              arr[i].choice = false;
            }
          }
        }
        return arr;
      }
    },
    mixins:[vehicle],
    mounted() {
      this.getBrand();
      this.getModel();
    },
    updated (){
      if(this.showFirst && (this.vehicleKind != this.oldVehicleKind)){
        this.getBrand();
      }

    },
    methods: {
      //选中车辆品牌
      selectBrand(name,code) {
        this.vehicleBrand = name;
        this.vehicleBrandCode = code;
        //this.showSecond = true;
        this.searchKey = '';
        //this.vehicleModelList = [];
        //this.vehicleModelCodeList = [];
        this.vehicleModel = "";
        this.vehicleModelCode = "";
        this.passData();
        this.singlePassData();
      },
      //选中车辆型号
      selectModel(name,code,choice,event) {
        if(!choice){
          this.vehicleModelList.push(name);
          this.vehicleModelCodeList.push(code);
        }else {
          this.removeModel(this.vehicleModelList, name);
          this.removeModel(this.vehicleModelCodeList, code);
        }
        this.passData();
      },
      //选中车辆型号,传单个型号值
      singleSelectModel(name,code,event) {
        this.vehicleModel=name;
        this.vehicleModelCode=code;
        this.singlePassData();
      },
      //向父组件传递数据
      passData() {
        this.$emit('passToParent', this.vehicleBrand,this.vehicleModelList.join(','),this.vehicleModelCodeList.join(','), this.showSecond,this.vehicleBrandCode)
      },
      //向父组件传递单条数据
      singlePassData() {
        this.$emit('singlePassToParent', this.vehicleBrand, this.vehicleModel,this.vehicleModelCode, this.showSecond, this.vehicleBrandCode)
      },


      getBrand(){
        if(this.vehicleKind == 'noKind' || this.vehicleKind == null){
          this.oldVehicleKind = this.vehicleKind;
          this.getVehicleBrand( (res)=>{
            this.brandList = res.data.data;
          });
        }else{
          this.oldVehicleKind = this.vehicleKind;
          this.getVehicleBrandByKind(this.vehicleKind, (res)=>{
            this.brandList = res.data.data;
          });
        }
      },
      getModel(brandCode){
        this.getVehicleModel((res)=>{
          this.modelByBrandList = res.data.data;
        });
      },

      getModelByBrand(brandCode){
        this.getVehicleModelByBrand(brandCode, (res)=>{
          this.modelByBrandList = res.data.data;
        });
      },
      getBrandByFuzzy(){
        this.getVehicleBrandByFuzzy(this.searchBrandKey, (res)=>{
          this.brandList = res.data.data;
        });
      },

      getModelByBrandAndFuzzy (){
        if(!this.vehicleBrandCode){
          this.getVehicleModelByFuzzy(this.searchKey, (res)=>{
            this.modelByBrandList = res.data.data;
          });
        }else{
          this.getVehicleModelByBrandAndFuzzy(this.vehicleBrandCode, this.searchKey, (res)=>{
            this.modelByBrandList = res.data.data;
          })
        }
      },

      removeModel(arr, item){
        let itemIndex = null;
        if(arr.length > 0){
          for(let i=0;i<arr.length;i++){
            if(arr[i] === item){
              itemIndex = i;
            }
          }
        }
        arr.splice(itemIndex, 1);
      }

    }
  }
</script>
<style scoped>

  .casWrapper{
    height: 100%;
    display: flex;
  }

  .list ul li {
    line-height: 0.24rem;
    text-align: center;
  }

  .list ul li:hover {
    background-color: #1163AD;
  }

  .first, .second {
    width: 2.3rem;
    height: 6.48rem;
    background: #ffffff;
    transition: all .3s;
    color: #666;
    position:absolute;
  }

  .firstItem:hover span, .firstItem .on {
    color: #78B5FE;
    font-weight: bold;
  }

  .second {
    left: 2.3rem;
    z-index: 98
  }
  .first {
    left: -1.2rem;
    z-index: 98
  }
  .search{
    position: relative;
    margin:0.1rem;
  }
  input {
    display:block;
    width: 2.1rem;
    padding: 0 0.2rem 0 0.1rem;
    border:1px solid #d4d4d4;
    border-radius:0.06rem;
    line-height: 0.3rem;
    font-size:0.14rem;
  }
  .btn{
    position:absolute;
    right:0.06rem;
    top:0.04rem;
    font-size: 0.16rem;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .fade-enter, .fade-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .fade1-enter-active, .fade1-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .fade1-enter, .fade1-leave-to {
    transform: translate3d(100%, 0, 0);
    /* transition:0s */
  }

  .first ul, .second ul {
    margin: 0.28rem 0 0 0;
    height:5.7rem;
    overflow-y:scroll;
  }

  .first ul li, .second ul li {
    font-size: 0.16rem;
    line-height: 0.32rem;
    text-align: center;
    border-bottom: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
    cursor:pointer;
  }

</style>

