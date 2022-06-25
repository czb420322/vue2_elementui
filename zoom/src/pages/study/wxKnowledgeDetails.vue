<template>
  <div class="knowledgeDetails">
    <template v-if="isNav">
      <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
      <van-nav-bar title="详情" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
      <div :style="{ 'padding-top': ($iosSystem + 45) + 'px' }"></div>
    </template>
    <div class="outside">
      <!-- 文章 -->
      <div class="knowledgeDetails_content" v-if="type == 1" >
        <h3 class="content_title">{{detailsData.title}}</h3>
        <div class="content_grid">
          <div class="grid_txt">
            <p v-if="!isNav">{{detailsData.readNum}}次学习</p>
          </div>
          <div  class="grid_txt">
            <p>{{detailsData.modifiedDate}}</p>
          </div>
        </div>
        <div class="content_txt content_html" v-html="detailsData.content">
        </div>
      </div>
      <!-- 视频 -->
      <div class="knowledgeDetails_content" v-else>
         <div class="content_grid">
          <div class="grid_name">
            <p>主讲人：{{detailsData.speaker}}</p>
          </div>
          <div  class="grid_txt">
            <p>{{detailsData.modifiedDate}}</p>
          </div>
        </div>
        <div class="content_txt">
          <video style="width:100%;" v-if="detailsData.videoUrl" webkit-playsinline="true" playsinline="true" controls :poster="detailsData.coverImgUrl">
            <source :src="detailsData.videoUrl" type='video/mp4'>
          </video>
        </div>
      </div>

      <div class="review" v-if="!isNav" >
        <p class="review_title">评论</p>
        <div>
          <div class="review_box"  v-for="(item, i) in commentList" :key="i">
            <div class="review_head">
              <img class="head_img" v-if="item.agentProfile" :src="item.agentProfile">
              <img class="head_img" v-else src="./../../../public/img/page/gr_head.png">
            </div>
            <div class="review_txt">
              <p class="name" v-if="item.agentName">{{item.agentName | nameNoConceal}}</p>
              <p class="name" v-else>{{item.agentMobile | phoneConceal}}</p>
              <p class="txt">{{item.content}}</p>
              <p class="time">{{item.createdDate}}</p>
            </div>
            
          </div>
          <p class="hint">没有更多了～</p>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import config from '../../config.js';
import configJs from '../../config.js';
import app from '../../assets/js/util/app';
export default {
  data() {
    return {
      detailsData:'',//详情
      commentList:[],//评论列表
      id:'',
      type:1,//0是视频 1文章
      isNav: this.$route.query.isNav ? true : false
    }
  },
  created() {
    this.id =this.$route.query.id
    this.type =this.$route.query.type || 1
    this.getDetails()
    this.getComment()
  },
  methods: {
    
    //获取文章和视频
   async getDetails() {
      const res = await this.$axios({
        url: this.$API.API_GETSTUDYARTICLEBYID,
        method: "post",
        data: {
          id: this.id 
        }
      });
      if (res.code === 0 && res.content.result == 0) {
        this.detailsData = res.content.data
      }else{
        this.$toast('获取失败！');
      }
    },
    //获取文章或者视频评论
    async getComment(){
       const res = await this.$axios({
        url: this.$API.API_GETSTUDYREVIEWLIST,
        method: "post",
        data: {
          articleId: this.id 
        }
      });
      if (res.code === 0 && res.content.result == '0') {
        this.commentList = res.content.data
      }else{
        this.$toast('获取失败！');
      }
    },
  }
}
</script>
<style lang="less">
#app.iosSystem .knowledgeDetails .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .knowledgeDetails .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.knowledgeDetails{
  .van-nav-bar--fixed {
    z-index: 11111;
  }
  .van-nav-bar__title {
		color      : #3B3B3B;
		font-size  : 17px;
		font-weight: normal;
	}
  .outside{
    margin-top: 10px;
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
    .review{
      background: #fff;
      margin-top: 10px;
      padding: 0 18px;
      font-size: 16px;
      .review_title{
        font-size: 14px;
        margin: 0;
        padding: 16px 0;
      }
      .review_box{
        display: flex;
        overflow-x: hidden;
        padding-bottom: 8px;
        .review_head{
          .head_img{
            border-radius: 50%;
            width: 30px;
            height: 30px;
          }
        }
        .review_txt{
          font-size: 14px;
          padding-left: 6px;  
          .name{
            margin: 0;
            height: 30px;
            line-height: 30px;
            color: #000;
            font-weight: 500;
          }
          .txt{
            margin:0;
          }
          .time{
            margin: 0;
            color: #969696;
            font-size: 12px;
          }
        }
      }
      .hint{
        text-align: center;
        font-size: 12px;
        margin: 0;
        padding-bottom: 10px;
        color: #CBCBCB;
      }
    }
  }
}
</style>