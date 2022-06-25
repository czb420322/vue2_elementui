<template>
  <div class="productDetailClause" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
    <v-header :title="{ name: title }"></v-header>
    <!-- {{notificationList}} -->
    <!-- <div class="content_txt" v-if="title == '投保须知'">
      <iframe class="iframe_tk" :src="'https://devyun.guorenpcic.com/mit-picture/pdf/pdf/tbxz2/'+saleCode+'-tb.html'" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <div class="content_txt" v-else-if="title == '保险条款'">
      <iframe class="iframe_tk" :src="'https://devyun.guorenpcic.com/mit-picture/pdf/pdf/tk2/'+saleCode+'_TK.html'" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <div class="content_txt" v-else-if="title == '职业列表'">
      <iframe class="iframe_tk" :src="'https://devyun.guorenpcic.com/mit-picture/pdf/pdf/zylb2/grywbxzylb-zy.html'" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <div class="content_txt" v-else-if="title == '宠物医院清单'">
      <iframe class="iframe_tk" :src="'https://devyun.guorenpcic.com/mit-picture/pdf/pdf/zylb2/chongwu_73.html'" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <div class="content_txt" @click="magnify()" v-else v-html="notificationList[index].notifiContent"></div> -->
    <div class="content_txt" @click="magnify()" v-html="notificationList[index].notifiContent"></div>
  </div>
</template>

<script>
import util from '../../../assets/js/util/util';
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      title: '',
      notificationList: [],
      ImagePreview: ImagePreview,
      saleCode: '',
      index: '',
    };
  },
  created() {
    this.title = this.$route.query.title;
    this.index = this.$route.query.index;
    let productDetail = util.getSessionStorageObj("productDetail");
    if (productDetail) {
      this.saleCode = productDetail.content.saleCode;
      this.notificationList = productDetail.content.notificationList;
    }
  },
  methods: {
    magnify() {
      if (document.images.length > 0) {
        ImagePreview({
          maxZoom: 22,
          images: [
            document.images[0].src
          ]
        })
      }

    }
  }
};
</script>

<style lang="less">
.productDetailClause {
  .content_txt {
    padding: 0.7rem;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
