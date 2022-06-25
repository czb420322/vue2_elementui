<template>
  <div class="informationDetails" :style="{ 'padding-top': ($iosSystem + 45) + 'px' }">
    <v-header :title="{ name: '消息详情' }"></v-header>
    <div class="outside" >
      <!-- 文章 -->
      <div class="knowledgeDetails_content">
        <h3 class="content_title">{{detailsData.templateTitle}}</h3>
        <div class="content_grid">
          <div class="grid_txt">
            <p>{{detailsData.templateSendTime}}</p>
          </div>
          <div class="grid_txt skip_txt" v-show="detailsData.templateLinkUrl" @click="goPage(detailsData.templateLinkUrl)">
            <p>前往</p>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="content_txt content_html" v-html="detailsData.templateContent">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from '../../config.js';
import app from '../../assets/js/util/app';
export default {
  data() {
    return {
      detailsData:'',//详情
      id:'',
    }
  },
  created() {
    this.id = this.$route.query.id || '';
    this.getDetails()
  },
  methods: {
   
    //获取详情
   async getDetails() {
      const res = await this.$axios({
        url: this.$API.API_NEWS_QUERYMESSAGEBYID,
        method: "get",
        params: {
          id: this.id 
        }
      });
      if (res.code === 0 && res.content.result == 0) {
        this.detailsData = res.content.data || {}
      }else{
        this.$toast(res.content.resultMessage || '获取失败！');
      }
    },
   
  }
}
</script>
<style lang="less">

.informationDetails{
  .outside{
    margin-top: 10px;
    padding-bottom: 56px;
     .knowledgeDetails_content{
      background: #fff;
      padding: 0 18px;
      .content_title{
        text-align: center;
        margin: 0;
        padding: 18px 0 2px 0;
        font-size: 20px;
      }
      .content_grid{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 12px;
        .label{
          .label_1{
            margin-right: 4px;
          }
        }
        .grid_txt{
          color: #A2A2A2;
          margin: 12px 0;
          p{
            margin: 0;
          }
        }
        .skip_txt{
          display: flex;
          align-items: center;
        }
        .grid_name{
          font-size: 14px;
          margin: 12px 0;
           p{
            margin: 0;
          }
        }
      }
      .content_txt{
        padding-bottom: 16px;
        font-size: 16px;
      }
      .content_html{
        img{
          max-width: 100%;
          height: auto;
        }
      }
    }
  }
  
}
</style>