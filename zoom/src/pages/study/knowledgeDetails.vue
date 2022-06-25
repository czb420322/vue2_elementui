<template>
  <div class="knowledgeDetails">
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <van-nav-bar title="详情" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <div class="outside" :style="{ 'padding-top': ($iosSystem + 45) + 'px' }">
      <!-- 文章 -->
      <div class="knowledgeDetails_content" v-if="type == 1" >
        <h3 class="content_title">{{detailsData.title}}</h3>
        <div class="content_grid">
          <div class="grid_txt">
            <p>{{detailsData.readNum}}次学习</p>
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
      <div class="review" ref="pageScroll1">
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
    <div class="bottom_box">
      <div class="bottom_input" @click="show = !show">
        <van-field v-model="value" disabled placeholder="输入您的精彩言论" />
      </div>
      <div class="bottom_icon">
        <van-icon name="chat-o" :badge="detailsData.reviewNum" size="20" @click="rollLocation()"/>
        <van-icon name="good-job-o" @click="updComment(2)" :badge="detailsData.praiseNum" size="20" :color="notLike == 1 ? 'red' : ''" />
        <van-icon name="like-o" size="20" @click="updComment(3)" :color="notCollect == 1 ? 'red' : ''"/>
        <van-icon name="share-o" size="20" @click="share()"/>
      </div>
     
    </div>
    <van-popup class="leave_pop" v-model="show" closeable position="bottom" round>
      <div style="margin: 0 10%;">
         <van-field
          :autofocus="true"
          v-model="message"
          rows="5"
          maxlength="120"
          type="textarea"
          placeholder="输入您的精彩言论"
        />
      </div>
      <div class="leave_bt">
        <van-button class="bt" round type="info" size="small" @click="saveComment()">发布</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import config from '../../config.js';
import configJs from '../../config.js';
import app from '../../assets/js/util/app';
export default {
  data() {
    return {
      show:false,
      value:'',
      message:'',
      detailsData:'',//详情
      commentList:[],//评论列表
      id:'',
      type:1,//0是视频 1文章
      notLike:0,//是否点赞
      notCollect:0,//是否收藏
    }
  },
  created() {
    this.id =this.$route.query.id
    this.type =this.$route.query.type || 1
    this.updComment(1)
    this.getDetails()
    this.getCollect()
    this.getComment()
  },
  methods: {
    rollLocation(){//滚动到评论位置
      document.body.scrollTop = this.$refs.pageScroll1.offsetTop - 90
      document.documentElement.scrollTop = this.$refs.pageScroll1.offsetTop  - 90
    },
    //获取文章和视频有没有 点赞 收藏 
    async getCollect() {
      const res = await this.$axios({
        url: this.$API.API_SGETSTUDYOPERATEUSER,
        method: "post",
        data: {
          articleId: this.id,//文章/视频ID
        }
      });
      if (res.code === 0 && res.content.result == 0 && res.content.data) {
        if(res.content.data.isPraise == 1){//表示已经点过赞
          this.notLike = 1;
        }
        if(res.content.data.isFavorite == 1){//表示已经收藏过
          this.notCollect = 1;
        }
      }
    },
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
    //保存文章或者视频评论
    async saveComment(){
      if(!this.message){
        this.$toast('请输入您的精彩言论');
        return;
      }
       const res = await this.$axios({
        url: this.$API.API_SAVESTUDYREVIEW,
        method: "post",
        data: {
          articleId: this.id,//文章或者视频id
          content:this.message,//评论内容
        }
      });
      this.show = false
      if (res.code === 0 && res.content.result == 0) {
        this.detailsData.reviewNum +=1
        this.getComment()
        this.$toast('提交成功');
        this.message = ''
      }else{
        this.$toast('提交失败！');
      }
    },
    //保存文章或者视频 点赞 收藏 阅读 转发
    async updComment(distinguish){
       const res = await this.$axios({
        url: this.$API.API_SAVESTUDYOPERATECLIENT,
        method: "post",
        data: {
          articleId: this.id,//文章或者视频id
          operateType:distinguish,//1阅读 2点赞 3收藏 4转发
          isFavorite:distinguish == 3 ? (this.notCollect == 0 ? 1 : 0) : '',//0取消收藏 1收藏
          isPraise:distinguish == 2 ? (this.notLike == 0 ? 1 : 0) : '',//0取消点赞 1点赞
        }
      });
      if (res.code === 0 && res.content.result == 0) {
        if(distinguish == 2){
          if(this.notLike == 0){//点赞
            this.detailsData.praiseNum += 1
            this.notLike = 1
          }else if(this.notLike == 1){//取消点赞
            this.detailsData.praiseNum -= 1
            this.notLike = 0
          }
        }else if(distinguish == 3){ //收藏
          if(this.notCollect == 0){
            this.notCollect = 1
          }else if(this.notCollect == 1){//取消收藏
            this.notCollect = 0
          }
        }
        if(distinguish !=1 && distinguish !=4){
          this.$toast('操作成功');
        }
      }else{
        this.$toast('操作失败！');
      }
    },
    share(){
      this.updComment(4);//调用转发计数接口
      var address = config.config.http_base + config.config.ctx_base + '/#wxKnowledgeDetails?id=' + this.id + '&type='+this.type
      let getShareUrl = this.$WxUrlAuthorize(address);
      app.goShare({
        shareTitle: this.detailsData.title,
        shareText:'',
        shareImgUrl: this.detailsData.coverImgUrl,
        shareUrl: getShareUrl
      });
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
  .bottom_box{
    display: flex;
    background: #fff;
    align-items: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
    .bottom_input{
      flex: 2;
      .van-cell{
        padding:10px 6px 10px 16px
      }
      .van-cell__value--alone{
        border: solid 1px #CBCBCB;
        border-radius: 4px;
      }
    }
    .bottom_icon{
      flex: 1;
      display: flex;
      justify-content: space-around;
      .van-info{
        background: #FDC108;
      }
    }
  }
  .leave_pop{
    height: 200px;
    .leave_bt{
      position: fixed;
      bottom: 2%;
      right: 6%;
      .bt{
        width: 50px;
        font-size: 14px;
      }
    }
  }
}
</style>