<template>
  <div>
    <div class="posterPage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
      <v-header :title="{ name: '推广海报' }"></v-header>
      <div class="banner-box">
        <van-swipe :loop="false" :show-indicators="false" :initial-swipe='initialSwipe' class="banner" @change="onChange">
          <van-swipe-item v-for="(item,index) in list" :key="index">
            <van-image fit="cover" class="poster" :src="item.imagePath || item.imgUrl" alt="" :style="{ 'height' : pageWidth*0.644*1.6 + 'px' }" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="btn-box">
        <a class="btn share" @click="search || userInfo.agentType != 1 ? goSharePoster() : goToast()">分享海报</a>
        <a class="btn save" @click="search || userInfo.agentType != 1 ? downloadPhoto() : goToast()">保存相册</a>
      </div>
    </div>
  </div>
</template>

<script>

import common from '../../assets/js/util/common';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
export default {
  data() {
    return {
      initialSwipe: 0,
      list: [],
      pageWidth: 0,
      userInfo: {},
      search: false
    };
  },
  created() {
    this.list = JSON.parse(sessionStorage.promote);
    this.initialSwipe = this.$route.query.index;
    this.pageWidth = document.documentElement.clientWidth;
    this.userInfo = JSON.parse(sessionStorage.userInfo);
    this.onChange(this.initialSwipe);
    this.getSearch();
  },
  methods: {
    async getSearch() {
      const res = await this.$axios({
        url: this.$API.API_MY_SEARCH,
        method: 'get',
        params: {
        }
      });
      if (res.content) {
        this.search = true;
      }
    },
    goToast() {
      this.$toast('请选择业务来源！');
    },
    // 图片生成base64位
    toBase64(imgUrl) {
      // 一定要设置为let，不然图片不显示
      const image = new Image();
      // 解决跨域问题
      image.setAttribute('crossOrigin', 'anonymous');
      const imageUrl = imgUrl;
      image.src = imageUrl
      // image.onload为异步加载
      let _this = this;
      image.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        var quality = 0.8;
        // 这里的dataurl就是base64类型  
        // 使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
        const dataurl = canvas.toDataURL('image/jpeg', quality);
        console.log("dataurl", dataurl);
        this.generateCard(dataurl);
      }
    },
    // 生成二维码图片
    async generateCard(base64) {
      // let base64 = dataurl.split('base64,')[1]
      const res = await this.$axios({
        url: this.$API.API_ACTIVITY_GENERATECARD,
        method: 'post',
        data: {
          base64: base64,
          srcImgUrl: this.getShareUrl(),
          userName: this.userInfo.name,
          phone: this.userInfo.phone,
          activityId: this.list[this.initialSwipe].sid,
          userCode: this.userInfo.userCode
        }
      });
      if (res.code == 0 && res.content) {
        this.list[this.initialSwipe].imagePath = res.content;
      }
    },

    onChange(index) {
      console.log('当前 Swipe 索引：' + index);
      this.initialSwipe = index;
      if (!this.list[index].imagePath && this.list[this.initialSwipe].activityCategory != '4') {
        this.generateCard(this.list[index].imgUrl);
      }
    },
    // 分享海报
    goSharePoster() {
      console.log('======',configJs.config.http_base + configJs.config.ctx_base)
      //如果是增员海报则采用分享纯图片方式进行
      if (this.list[this.initialSwipe].activityCategory == '1') {
        app.goShare({
          shareImgUrl: this.list[this.initialSwipe].imagePath || this.list[this.initialSwipe].imgUrl
        });
      } else if (this.list[this.initialSwipe].activityCategory == '2') {
        app.goShare({
          shareImgUrl: this.list[this.initialSwipe].imagePath || this.list[this.initialSwipe].imgUrl
        });
      } else {
        /**
         * 10.1活动
         */
        if (this.list[this.initialSwipe].aLink.split('?')[0].split('#')[1] == "/showProductDetail") {
          let local = configJs.config.http_base + configJs.config.ctx_base + `${this.list[this.initialSwipe].aLink}&phone=${this.userInfo.phone}&agentCode=${this.userInfo.userCode}&agentId=${localStorage.getItem('agentId')}&activityId=${this.list[this.initialSwipe].sid}`;
          let getShareUrl = this.$WxUrlAuthorize(local);
          app.goShare({
            shareTitle: this.list[this.initialSwipe].activityName,
            shareText: this.list[this.initialSwipe].activityDesc,
            shareImgUrl: this.list[this.initialSwipe].imagePath || this.list[this.initialSwipe].imgUrl,
            shareUrl: getShareUrl
          });
          //6 1儿童节活动海报
        } else if(this.list[this.initialSwipe].activityId =='001'){
          app.goShare({
            shareTitle: this.list[this.initialSwipe].activityName,
            shareText: this.list[this.initialSwipe].activityDesc,
            shareImgUrl: this.list[this.initialSwipe].imagePath || this.list[this.initialSwipe].imgUrl,
            shareUrl: this.list[this.initialSwipe].aLink
          });
        } else {
          app.goShare({
            shareTitle: this.list[this.initialSwipe].activityName,
            shareText: this.list[this.initialSwipe].activityDesc,
            shareImgUrl: this.list[this.initialSwipe].imagePath || this.list[this.initialSwipe].imgUrl,
            shareUrl: this.getShareUrl()
          });
        }
      }
      this.shareRecord();
    },
    getShareUrl() {
      let local = '';
      if (this.list[this.initialSwipe].activityCategory == '1') {
        local = configJs.config.http_base + configJs.config.ctx_base + `${this.list[this.initialSwipe].aLink}&phone=${this.userInfo.phone}&agentCode=${this.userInfo.userCode}&agentId=${localStorage.getItem('agentId')}&activityId=${this.list[this.initialSwipe].sid}`;
      } else {
        //临时解决后台配置了activityId的问题
        if (this.list[this.initialSwipe].sid === 23) {
          local = configJs.config.http_base + configJs.config.ctx_base + `${this.list[this.initialSwipe].aLink}?agentCode=${this.userInfo.userCode}&agentId=${localStorage.getItem('agentId')}&shareTitle=${this.list[this.initialSwipe].activityName}`;
        } else {
          local = configJs.config.http_base + configJs.config.ctx_base + `${this.list[this.initialSwipe].aLink}?agentCode=${this.userInfo.userCode}&agentId=${localStorage.getItem('agentId')}&activityId=${this.list[this.initialSwipe].sid}&shareTitle=${this.list[this.initialSwipe].activityName}`;
        }
      }
      return this.$WxUrlAuthorize(local)
    },
    // 保存相册
    downloadPhoto() {
      app.downloadPhoto({
        PictureUrl: this.list[this.initialSwipe].imagePath || this.list[this.initialSwipe].imgUrl,
        PictureName: this.list[this.initialSwipe].activityName
      });
    },
    // 分享记录
    async shareRecord() {
      const res = await this.$axios({
        url: this.$API.API_QUERY_SHARERECORD,
        method: 'post',
        loading: 'false',
        data: {
          agentCode: this.userInfo.userCode,  // 代理人代码
          shareType: this.list[this.initialSwipe].activityCategory == '1' ? '0' : this.list[this.initialSwipe].activityCategory == '2' ? '1' : '2', // 分享类型(0-产品,1-增员,2-活动)
          sharePosterNumber: this.list[this.initialSwipe].sid, // 分享海报编号
          shareDate: common.getNowFormatDate()  // 分享时间
        }
      });
    }
  }
};
</script>

<style lang="less">
@import './../../assets/less/app/promote/poster.less';
</style>
