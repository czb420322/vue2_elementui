<template>
  <div class="carSelectPage">
    <div class="header_bar" :style="{ 'padding-top': $iosSystem + 'px' }">
      <van-icon class="left_icon" name="arrow-left" size="20" color="white" @click="onClickLeft" />
      <van-search v-model.trim="value" show-action :placeholder="title + '（CAF7200）'" shape="round" background="#0252ff" >
        <template #action>
          <div @click="onSearch">&nbsp;搜索&nbsp;</div>
        </template>
      </van-search>
    </div>
    <div :style="{ 'margin-top': ($iosSystem + 66) + 'px' }">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell v-for="(item,index) in list" :key="index" :title="item.codeName+' 价格¥'+(item.purchasePrice ? item.purchasePrice : 0)+ ' 座位数:'+item.seatCountLb"  clickable @click="onSelect(index)">
            <template #right-icon>
              <van-radio :name="index" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <my-empty v-show="!list.length"></my-empty>
    </div>
    <br>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
import idNoScan from './../../templates/idNoScan.vue';
import { mapState } from 'vuex'
export default {
  components: {
    idNoScan
  },
  data() {
    return {
      title: this.$route.meta.title,
      value: '',
      list: [],
      radio: ''
    };
  },
  computed: {
    ...mapState({
      carTypeDTO: state => state.car.carTypeDTO,
      vehicleDTO: state => state.car.vehicleDTO,
    })
  },
  created(){
    // if(this.vehicleDTO.frameNo !=''){
    //   this.getImportMemory()
    // }else {
    //   this.Import()
    // }
    //此标记分享车险出单会用到
     util.setSessionStorageObj('wxCar',1);

     this.Import()
    
  },
  methods: {
    Import(){
      if(this.carTypeDTO.codeName || this.carTypeDTO.name){
        //去除中文（牌这个字）
        var reg =/[\u724c]/g;
        var str= this.carTypeDTO.codeName || this.carTypeDTO.name
        str= str.replace(/[ ]/g, "");//去空格
        str= str.replace(reg, "");//去除中文 牌字
        this.value = str
      }
    },
    //获取输入框记录值
    async getImportMemory() {
      const res = await this.$axios({
        url: this.$API.API_GETRECENTLYCARTYPE,
        method: 'get',
        params: {
          frameNo: this.vehicleDTO.frameNo,
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        if(res.content.searchInfo){
          this.value = res.content.searchInfo || ''
        }else{
          this.Import()
        }
        
      }
    },
    onSearch(){
      if(!this.value){
        this.$toast('请输入车辆品牌型号！');
        return;
      }
      this.value = this.value.toUpperCase()
      this.getCarType();
    },
    async getCarType() {
      const res = await this.$store.dispatch('car/getCarType', { codeValue: this.value }); 
      if (res.code == 0 && res.content.result == 0) {
        this.list = res.content.data;
      }else{
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    onSelect(index){
      this.radio = index; 
      this.$store.commit('car/updataCarTypeDTO', this.list[index] );
      setTimeout(()=>{
        this.onClickLeft();
      },300);
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
.carSelectPage{
  .title_bar {
    font-size: 0.7rem;
    margin: 0;
    padding: 0;
    height: 32px;
    line-height: 32px;
    padding-left: 1rem;
  }
  .van-index-anchor--sticky {
    background-color: #eeeeee;
  }
}
</style>
