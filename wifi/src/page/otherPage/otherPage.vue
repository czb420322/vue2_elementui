<template>
  <div class="pageList">
	<p>为您搜索到{{totalRecord}}条记录</p>
	<p class="totalPage">共{{totalPage}}页</p>
	<p class="middle">当前{{currentPage}}/{{totalPage}}</p>
	<span class="firtPage btn disabled" :disabled="flag" ref="first" @click="first">首页</span>
	<span class="prevPage btn disabled" :disabled="flag" ref="prev" @click="prev">上一页</span>
	<span class="nextPage btn" ref="next" @click="next" :disabled="otherFlag">下一页</span>
	<span class="lasePage btn" ref="last" @click="last" :disabled="otherFlag">尾页</span>
	<p class="strip">转到<input type="text" v-model="stripPage" ref="input" />页</p>
	<p class="btnGo" @click="strip">GO</p>
  </div>
</template>

<script>
import {addClass, removeClass} from '../../common/dom/dom.js'
export default {
  data () {
    return {
    	flag: true,
    	otherFlag: false,
    	stripPage: '',
    }
  },
  props: {
	  totalRecord: {
		default: 10,
		type: Number
	  },
	  currentPage: {
		default: 1,
		type: Number
	  },
	  totalPage: {
		default: 10,
		type: Number
	  },
	  callback: {
		  type: Function,
		  default: function(currentPage) {

		  }
	  }
  },
  mounted () {
  },
  watch: {
  	stripPage () {
  		this.stripPage = this.stripPage.replace(/\D/gi, '')
  		this.stripPage = this.stripPage.replace(/^[0]+/,'')
	},
	totalPage () {
		if(this.totalPage == 1){
  			this.otherFlag = true
  			addClass(this.$refs.next, 'disabled')
  			addClass(this.$refs.last, 'disabled')
  			this.$refs.input.setAttribute("readonly","readonly")
  		}
	}
  },
  methods: {
  	first () {
  		if(!this.flag){
  			this.currentPage = 1
  			this.flag = true
  			this.otherFlag = false
  			addClass(this.$refs.first, 'disabled')
  			addClass(this.$refs.prev, 'disabled')
  			removeClass(this.$refs.next, 'disabled')
  			removeClass(this.$refs.last, 'disabled')
			this.callback(this.currentPage)
  		}
  	},
  	prev () {
  		if(!this.flag){
			this.currentPage--
  			this.otherFlag = false
  			removeClass(this.$refs.next, 'disabled')
  			removeClass(this.$refs.last, 'disabled')
			this.callback(this.currentPage)
  			if(this.currentPage == 1){
  				this.flag = true
  				addClass(this.$refs.first, 'disabled')
  				addClass(this.$refs.prev, 'disabled')
  				return
  			}
  		}
  	},
  	next () {
  		if(!this.otherFlag){
			this.currentPage++
			this.flag = false
			removeClass(this.$refs.prev, 'disabled')
  			removeClass(this.$refs.first, 'disabled')
			this.callback(this.currentPage)
  			if(this.currentPage == this.totalPage){
  				this.otherFlag = true
  				addClass(this.$refs.last, 'disabled')
  				addClass(this.$refs.next, 'disabled')
  				return
  			}
  		}
  	},
  	last () {
  		if(!this.otherFlag){
  			this.currentPage = this.totalPage
  			this.flag = false
  			this.otherFlag = true
  			addClass(this.$refs.last, 'disabled')
  			addClass(this.$refs.next, 'disabled')
  			removeClass(this.$refs.prev, 'disabled')
  			removeClass(this.$refs.first, 'disabled')
			this.callback(this.currentPage)
  		}
  	},
  	strip () {
  		if(Number(this.stripPage)> this.totalPage){
  			return
  		}
  		if(!this.stripPage){
  			return
  		}
  		this.currentPage = Number(this.stripPage)
  		if(this.currentPage == 1){
  			this.flag = true
  			this.otherFlag = false
  			addClass(this.$refs.first, 'disabled')
  			addClass(this.$refs.prev, 'disabled')
  			removeClass(this.$refs.next, 'disabled')
  			removeClass(this.$refs.last, 'disabled')
  		}else if(this.currentPage == this.totalPage){
  			this.flag = false
  			this.otherFlag = true
  			removeClass(this.$refs.first, 'disabled')
  			removeClass(this.$refs.prev, 'disabled')
  			addClass(this.$refs.next, 'disabled')
  			addClass(this.$refs.last, 'disabled')
  		}else{
  			this.flag = false
  			this.otherFlag = false
  			removeClass(this.$refs.first, 'disabled')
  			removeClass(this.$refs.prev, 'disabled')
  			removeClass(this.$refs.next, 'disabled')
  			removeClass(this.$refs.last, 'disabled')
  		}
		this.callback(this.currentPage)
  	}
  }
}
</script>

<style scoped>
.pageList{
	margin-top: 20px;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	font-size: 12px;
	color: #333;
}
.totalPage{
	margin: 0 12px;
}
.btn{
	cursor: pointer;
}
.firtPage{
	margin: 0 16px ;
}
.nextPage{
	margin: 0 16px;
}
.btn {
	color: #ff6600;
}
.disabled{
	color: #999;
	cursor: not-allowed;
}
.strip{
	margin-left: 16px;
}
.strip input{
	width: 30px;
	height: 20px;
	border: 1px solid #dcdfdc;
	margin: 0 6px;
	text-align: center;
}
.btnGo{
	width: 40px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	background: #e6a23c;
	border-radius: 2px;
	margin-left: 10px;
	color: #fff;
	cursor: pointer;
}
</style>



