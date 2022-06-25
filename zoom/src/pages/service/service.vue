<template>
  <div class="service afe-area-inset-bottom" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div class="service_botton">
      <v-header :title="{ name: '问答' }"></v-header>
      <div class="service_box" v-for="(item,index) in list" :key="index">
        <li class="service_li">
            <van-cell-group class="service_group" :border="false">
              <van-cell :title="item.problemType" :value="item.reportingDate"  :border="false" />
              <van-cell :title="item.problemContent" :icon="ioc_ask" :border="false"/>
               <div class="img_box">
                <van-row gutter="1">
                  <van-col span="8" @click="lookOver(item)" v-show="item.pictureUrlOne">
                     <van-image width="100%"   :src="item.pictureUrlOne" />
                  </van-col>
                   <van-col span="8"  @click="lookOver(item)" v-show="item.pictureUrlTwo">
                     <van-image width="100%"  :src="item.pictureUrlTwo" />
                  </van-col>
                   <van-col span="8" @click="lookOver(item)" v-show="item.prctureUrlThree">
                     <van-image width="100%"  :src="item.prctureUrlThree" />
                  </van-col>
                 
                </van-row>
              </div>
              <van-cell v-show="item.reply" :title="item.reply" :icon="ioc_reply"  :border="false"/>
              <div class="det_bt">
               <van-button @click="updDelete(item.id,index)" plain type="info" size="mini">删除</van-button>
              </div>
            </van-cell-group>
        </li>
      </div>
       <div class="bt_box" @click="goPage('issue')">
          <van-button round type="primary" size="large" color="#0252ff">提问</van-button>
        </div>
      <div class="hint_box" v-if="list.length <= 0">
        <p class="hint_name">您有以下问题可以点击下方提问按钮</p>
        <div class="hint_grid colour_0252FF">
          <img class="hint_img" src="../../../public/img/page/base/wb.png" alt="">
          <p class="hint_txt">1.保单、订单、支付、产品等问题；</p>
        </div>
        <div  class="hint_grid colour_F6E8DF">
          <img class="hint_img" src="../../../public/img/page/base/bi.png" alt="">
          <p class="hint_txt">2.您的意见和建议；</p>
        </div>
      </div>

      <click-login v-if="isLogin !== '' && isLogin == false"></click-login>
    </div>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import common from '../../assets/js/util/common';
import ioc_ask from '../../../public/img/page/base/w.png';
import ioc_reply from '../../../public/img/page/base/d.png';
import { Lazyload } from 'vant';
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      ImagePreview:ImagePreview,
      ioc_ask:ioc_ask,
      ioc_reply:ioc_reply,
      value:'',
      list:[],
      tabActive: 0,
      isLogin: '',
      userInfo:{},
      imgurl:''
    };
  },
  async created() {
    // this.userInfo = await common.getUserInfo()
    this.informationList()
  },
  methods: {
    lookOver(item){
      let imgList = []
      var pictureUrlOne = item.pictureUrlOne
      if(pictureUrlOne){
        imgList.push(pictureUrlOne)
      }
      var pictureUrlTwo = item.pictureUrlTwo
      if(pictureUrlTwo){
        imgList.push(pictureUrlTwo)
      }
      var prctureUrlThree = item.prctureUrlThree
      if(prctureUrlThree){
        imgList.push(prctureUrlThree)
      }
      ImagePreview({
        images:imgList
      })
    },
    async informationList() {
        this.isLogin = true;
        const res = await this.$axios({
          url: this.$API.API_HOME_REPORTINGLIST,
          method: 'post',
        });
        if (res.code === 0) {
          this.list = res.content || []
        } else {
          this.$toast(res.message);
        }
    },
    updDelete(id,index){
       this.$dialog.confirm({
            title: "操作确认",
            message: "确定要删除吗？",
            confirmButtonText: "确定", //改变确认按钮上显示的文字
            cancelButtonText: "取消" //改变取消按钮上显示的文字
        }).then(()=> {
          this.carryDelete(id,index);
        }).catch(() => {
        })
    },
    async carryDelete(id,index){
        const res = await this.$axios({
            url: this.$API.API_HOME_REPORTINGDELETE, 
            method: 'post',
            data:{
              id:id
            }
        });
          if (res.code === 0 && res.content.result == '0') {
              this.list.splice(index,1)
            this.$toast('删除成功');
          } else {
            this.$toast(res.message);
          }
    }
   
  }
};
</script>

<style lang="less" src="../../assets/less/app/service/service.less" scoped>
</style>
