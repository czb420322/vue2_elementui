<template>
  <div class="informationSet" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <div>
      <van-nav-bar title="消息设置" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
      <div class="informationSet-box">
        <van-cell center title="公告">
          <template #right-icon>
            <van-switch v-model="noticeChecked" size="24" @click="switchAffair(1)" />
          </template>
        </van-cell>
        <van-cell center title="活动">
          <template #right-icon>
            <van-switch v-model="activityChecked" size="24" @click="switchAffair(2)"/>
          </template>
        </van-cell>
        <van-cell center title="资讯">
          <template #right-icon>
            <van-switch v-model="informationChecked" size="24" @click="switchAffair(3)"/>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeChecked:true,
      activityChecked:true,
      informationChecked:true,
      messageType:''
    };
  },
  created() {
    this.getColumn()
  },
  methods: {
    developing() {
      this.$toast('功能开发中，敬请期待！');
    },
     // 获取开关状态接口
    async getColumn() {
      const res = await this.$axios({
        url: this.$API.API_NEWS_GETMESSAGETLIST,
        method: "get",
      });
      if (res.code === 0 && res.content) {
        this.noticeChecked = res.content[1].isDelete == 0 ? true : false
        this.activityChecked = res.content[2].isDelete == 0 ? true : false
        this.informationChecked = res.content[3].isDelete == 0 ? true : false
      } else {
        this.$toast("请求失败");
      }
    },
    switchAffair(number){
      this.messageType = number
      let isDelete
      if(number == 1){
        this.noticeChecked = !this.noticeChecked
        isDelete = this.noticeChecked == true ? 0 : 1
      }else if(number == 2){
        this.activityChecked = !this.activityChecked
        isDelete = this.activityChecked == true ? 0 : 1
      }else if(number == 3){
        this.informationChecked = !this.informationChecked
        isDelete = this.informationChecked == true ? 0 : 1
      }
      this.setInformation(isDelete)
    },
    // 
    async setInformation(isDelete) {
      const res = await this.$axios({
        url: this.$API.API_NEWS_UPDATEMESSAGESET,
        method: 'post',
        params:{
          isDelete:isDelete,
          messageType:this.messageType
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        this.$toast(res.content.resultMessage);
      }else{
        this.$toast(res.content.resultMessage || '请求失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app.iosSystem .informationSet .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .informationSet .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 1;
}
.informationSet{
  .informationSet-box{
    padding-top: 10px;
  } 
}
</style>
