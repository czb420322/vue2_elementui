<template>
  <div class="">
    <div class="selectList">
        <el-select class="province" ref="selected" v-model='selected' @change='changeProvince'>
            <!-- <el-option v-for='(item,index) in provinceData' :value='item.regionId' :key="index">{{item.regionName}}</el-option> -->
            <el-option v-for='(item,index) in provinceData' :key="index"  :label="item.regionName"  :value="item.regionId"></el-option>
        </el-select>
        <el-select class="province" ref="selectcity" v-model='selectcity' @change="changeCity">
            <!-- <el-option v-for='(item,index) in cityData' :value='item.regionId' :key="index"></el-option> -->
            <el-option v-for='(item,index) in cityData' :key="index"  :label="item.regionName"  :value="item.regionId"></el-option>
        </el-select>
        <el-select class="province"  ref="selectdist" v-model='selectdist' @change="changeDistrict">
            <!-- <el-option v-for='(item,index) in districtData' :value='item.regionName' :key="index">{{item.regionName}}</el-option> -->
            <el-option v-for='(item,index) in districtData' :key="index"  :label="item.regionName"  :value="item.regionId"></el-option>
        </el-select>
    </div>
  </div>
</template>
<script>
// import {datalist} from '@/common/js/province.js'
import { mapState,mapActions } from 'vuex'

  export default {
    data(){
      return {
        datalist:[],
        provinceData:[],
        cityData:[],
        districtData:[],
        // selected: sessionStorage.getItem("defaultRegion").substring(0,2)+'0000', //'420000',
        // selectcity:sessionStorage.getItem("defaultRegion").substring(0,4)+'00', //'420100',
        // selectdist: sessionStorage.getItem("defaultRegion"),
        selected: '', //'420000',
        selectcity:'', //'420100',
        selectdist: '',
      }
    },
    created () {

    },
    mounted(){
      this.ajaxSelec();
      this.getProvince();
    },
    methods:{
      //服务器获取省简码
      getSelectData(){
          this.$http.get('sms/static/getRegions')
          .then((res) => {
            this.datalist = res.data.data;
            this.getProvince();
          })
      },
      //获取编辑后选中的省简码
      ajaxSelec(){
        this.edit = this.$route.query.edit;
        if(this.edit){
          let data = {
            caseUuid:this.$route.query.caseUuid,
          };
          this.$http.get('pca/casemng/baseinfo/query',{params:data})
          .then((res) => {
            if(res.data.code){
              this.selected = res.data.data.placeCode.substr(0,2)+'0000';
              this.selectcity = res.data.data.placeCode.substr(0,4)+'00';
                console.log(res,222);
              this.selectdist = res.data.data.placeCode;
              this.getSelectData();
            }
          })
        }else{
          this.getSelectData();
        }
      },
      changeProvince(){
        this.getCity(true);
        this.$emit('select',this.selectdist);
      },
      changeCity(){
        this.getDistrict(true);
        this.$emit('select',this.selectdist);
      },
      changeDistrict(){
        this.$emit('select',this.selectdist);
      },

      //获取省数据
      getProvince(){
         this.provinceData = this.datalist.filter((i)=>{
            return /.*0000$/.test(i.regionId);
        });
        this.getCity(false);
      },
      //获取城市数据
      getCity(state){
        let a = this.selected.slice(0,2);
        let rs =eval("/"+a+"\\d\\d00/");
        let rs2 =eval("/"+a+"0000/");
        this.cityData = this.datalist.filter((i)=>{
            return rs.test(i.regionId)//i.regionId.macth(rs)
        }).filter((i2)=>{
            return !rs2.test(i2.regionId)
        });
        if(state){
          this.selectcity = this.cityData[0]['regionId']
          this.cityName = this.cityData[0]['regionName']
        }
          this.getDistrict(state)
      },

      //获取区域数据
      getDistrict(state){
          let b = this.selectcity.slice(0,4);
          let rs =eval("/"+b+"\\d\\d/");
          let rs2 =eval("/"+b+"00/");
          this.districtData = this.datalist.filter((i)=>{
              return rs.test(i.regionId)//i.regionId.macth(rs)
          }).filter((i2)=>{
              return !rs2.test(i2.regionId)
          });
            if(state){
              this.selectdist = this.districtData[0]['regionId']
              this.distName = this.districtData[0]['regionName']
            }
          }

    },
    props: ['selectDist']

  }
</script>

<style scope>
.selectList{
  position: relative;
  width: 100%;
}
  .province{
    width: 1.663rem !important;
    height: 0.3rem;
    display: inline-block;
    border: 1px solid #31363b;
    border-radius: 3px;
    font-size: 0.14rem;
    color: black;
    margin-right: 0.1rem;
    /* overflow : hidden; */
    text-overflow : ellipsis;
    white-space : nowrap;
  }
  .province /deep/ .el-input__inner{
    height: 0.3rem;
    font-size: 0.14rem;
  }
</style>
