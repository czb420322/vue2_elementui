<template>
  <div class="casWrapper" ref="parentCo">
    <transition name="fade">
      <div class="first" v-show="showFirst">
        <!--按关键字查询品牌-->
        <div class="search"><input v-model="searchBrandKey" placeholder="输入关键字查询品牌"  @keyup.enter="getBrandByFuzzy" @blur="getBrandByFuzzy"/> <span class="btn" @click="getBrandByFuzzy"><i class="el-icon-search"></i></span></div>
        <ul>
          <li class='firstItem' v-for="item in brandList" @click="selectBrand(item.value, item.field);">
            <span>{{item.value}}</span>
          </li>
          <li v-if="!brandList.length"> 暂无数据</li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  export default {
    props: ["vehicleKind","showFirst"],
    data() {
      return {
        brandList: [],
        modelByBrandList:[],
        searchKey: '',
        searchBrandKey: '',
        vehicleBrand: '不限',
        vehicleBrandCode: null,
        oldVehicleKind: null,
        flag: false
      }
    },
    mixins:[vehicle],
    mounted() {
      this.getBrand();
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
        this.passData();
      },
      //向父组件传递数据
      passData() {
        this.$emit('passToParent',this.vehicleBrandCode, this.vehicleBrand);
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

      getBrandByFuzzy(){
        this.getVehicleBrandByFuzzy(this.searchBrandKey, (res)=>{
          this.brandList = res.data.data;
        });
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
  }

  .firstItem:hover span, .firstItem .on {
    color: #78B5FE;
    font-weight: bold;
  }

  .second {
    left: 2.3rem;
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
