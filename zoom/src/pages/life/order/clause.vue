<template>
  <div class="clausPdf">
    <van-nav-bar
        style="margin-top:0;"
        :title="title"
        left-arrow
        @click-left="goBack()"
        />
    <div>
      <pdf
        :src="pdfSrc"
        :page="currentPage"
        @num-pages="pageCount=$event"
        @page-loaded="currentPage=$event"
        @loaded="loadPdfHandler"  style="display: inline-block; width: 100%; height: 100%;">
         
      </pdf>
    </div>
    <!--页码-->
    <div class="pdf" v-show="fileType === 'pdf'">
      <div class="pagesize">
        <!--上一页-->
        <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上页</span>
        {{currentPage}} / {{pageCount}}
        <!--下一页-->
        <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下页</span>
      </div>
    </div>

  </div>
</template>

<script>
import EventBus from '../../../assets/js/util/EventBus';
  import pdf from 'vue-pdf'  // 引入pdf组件
  export default {
    data () {
      return {
        currentPage: 0, // pdf文件页码
        pageCount: 0, // pdf文件总页数
        fileType: '', // 文件类型
        title:'',
        pdfSrc:''
        // pdfSrc:'/pdf/pdf/tbxz/ywzr.pdf'
      }
    },
    components: {pdf},  // 引入pdf组件 
    created() {
        this.title =  this.$route.query.title || '条款'
        document.title =  this.$route.query.title || '条款'
        EventBus.$emit('GlobalLoadingTrigger', true); //等待加载
        this.pdfSrc = this.$route.query.pdfSrc || '';
      // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
      if(this.pdfSrc == ''){
        this.$toast('地址为空!');
        EventBus.$emit('GlobalLoadingTrigger', false); 
      }else{
        this.pdfSrc = pdf.createLoadingTask(this.pdfSrc)
          setTimeout(function (){
                EventBus.$emit('GlobalLoadingTrigger', false); //如果20秒还没有加载出来自动关闭
          }, 20000)
      }
    },

   
    methods: {
       
      // 返回上级
      goBack(){
        this.$router.go(-1)
      },
      // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
      changePdfPage (val) {
        console.log(val)
        if (val === 0 && this.currentPage > 1) {
          this.currentPage--
          // console.log(this.currentPage)
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
          // console.log(this.currentPage)
        }
      },
      // pdf加载时
      loadPdfHandler (e) {
        this.fileType = 'pdf'
        this.currentPage = 1 // 加载的时候先加载第一页
        EventBus.$emit('GlobalLoadingTrigger', false);
      }
    },
  
  }
</script>
<style lang="less" scoped>
#app.iosSystem .van-nav-bar ::after {
  display: none;
}
 .pdf {
   text-align: center;
    margin-top: 10px;
  }
  .clausPdf{
    height:calc(100vh);
    background: #fff;
    overflow: hidden;
  }
  .pagesize{
    position: absolute;
    z-index: 99999999999999999;
    left: 34%;
    padding-bottom: 1.5rem;
  }
</style>