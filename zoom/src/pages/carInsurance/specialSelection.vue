<template>
  <div class="carSelectPage">
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <div class="headerPage">
      <van-nav-bar :title="title" left-arrow :border="false" :fixed="true" style="color:blcak">
        <template #left>
          <van-icon name="arrow-left" size="20" @click="onClickLeft" color="black"/>
        </template>
        <template #right>
          <span style="color: black; font-size: .82rem;" @click="onSubmit">提交</span>
        </template>
      </van-nav-bar>
    </div>

    <div :style="{ 'margin-top': ($iosSystem + 48) + 'px' }">
      <!-- <van-cell-group v-show="type == 'b'">
        <van-cell v-for="(item, index) in biPrptenagesDTOList" :key="index" @click="toggle(index)">
          <template #icon>
            <van-checkbox v-model="item.checkbox" style="padding-right: .6rem;">
              <span>{{item.clauses}}</span>
            </van-checkbox>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-show="type == 'c'">
        <van-cell v-for="(item, index) in ciPrptenagesDTOList" :key="index" @click="toggle(index)">
          <template #icon>
            <van-checkbox v-model="item.checkbox" style="padding-right: .6rem;">
              <span>{{item.clauses}}</span>
            </van-checkbox>
          </template>
        </van-cell>
      </van-cell-group> -->
      <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="index" v-show="type == 'c' ? (VehicleInsurance.cImmeValiFlag || item.clauseCode != 'T0076') :(VehicleInsurance.bImmeValiFlag || item.clauseCode != 'T0076')" >
          <template #icon>
            <van-checkbox v-model="item.checkbox" style="padding-right: .6rem;">
              <span>{{item.clauses}}</span>
            </van-checkbox>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- <my-empty v-show="!list.length"></my-empty> -->
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
      type: this.$route.query.type,
      list: []
    };
  },
  computed: {
    ...mapState({
      ciPrptenagesDTOList: state => state.car.ciPrptenagesDTOList,
      biPrptenagesDTOList: state => state.car.biPrptenagesDTOList,
      VehicleInsurance: state => state.car.VehicleInsurance,
    })
  },
  created() {
    if (!this.ciPrptenagesDTOList.length && !this.biPrptenagesDTOList.length) {
      this.getClauses();
    } else {
      this.list = this.type == 'b' ? JSON.parse(JSON.stringify(this.biPrptenagesDTOList)) : JSON.parse(JSON.stringify(this.ciPrptenagesDTOList))
    }
  },
  methods: {
    async getClauses() {
      const res = await this.$store.dispatch('car/getClauses')
      if (res.code == 0 && res.content.result == 0) {
        this.list = this.type == 'b' ? this.biPrptenagesDTOList : this.ciPrptenagesDTOList
      }
    },
    onSubmit() {
      let arr = this.list.map((item,index) => {
        if(item.checkbox){ item.checked = true; }
        return item
      });
      if (this.type == 'b') {
        this.$store.commit('car/updataPrptenagesDTOList', {
          biPrptenagesDTOList: arr,
          ciPrptenagesDTOList: this.ciPrptenagesDTOList
        });
      } else {
        this.$store.commit('car/updataPrptenagesDTOList', {
          biPrptenagesDTOList: this.biPrptenagesDTOList,
          ciPrptenagesDTOList: arr,
        });
      }
      this.onClickLeft();
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/carInsurance/carBaseInfo.less';
#app.iosSystem .carSelectPage .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .carSelectPage .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.carSelectPage{
  .van-nav-bar {
  background: white;   
  }
  .headerPage .van-nav-bar .van-nav-bar__title{
    color:black;
  }
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
