<template>
  <div class="container">
    <!--下载报告-->
    <div class="goback1">
      <div class="goBtn" @click="goBack">
        <i class="iconfont icon-fanhui-copy-copy">返回</i>
      </div>
    </div>
    <!--自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了-->
    <div>
      <pdf
        :src="pdfSrc"
        :page="currentPage"
        @num-pages="pageCount=$event"
        @page-loaded="currentPage=$event"
        @loaded="loadPdfHandler" >
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
  import pdf from 'vue-pdf'  // 引入pdf组件
  export default {
    //    metaInfo: {
    //         meta: [
    //             { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes' }
    //         ]
    //     },
    data () {
      return {
        currentPage: 0, // pdf文件页码
        pageCount: 0, // pdf文件总页数
        fileType: 'pdf', // 文件类型
        pdfSrc:'/pdf/jSpdf.pdf'
        // pdfSrc: 'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf' // pdf文件地址 (访问的本地文件，真实报告后续调接口)
      }
    },
    components: {pdf},  // 引入pdf组件 
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
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
        }
      },
      // pdf加载时
      loadPdfHandler (e) {
        this.currentPage = 1 // 加载的时候先加载第一页
      }
    },
    created() {
        console.log('999999999',this.pdfSrc)
      // this.loadPdfHandler();
      // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
      this.pdfSrc = pdf.createLoadingTask(this.pdfSrc)
    }
  }
</script>

<style lang="less" scoped>
 .pdf-box {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    font-size: .28rem;
    span {
      width: 100%;
    }
  }
</style>