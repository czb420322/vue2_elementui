<template>
  <div class="wrapper">
    <ul class="pagination" >
      <li v-show="current != 1" @click="current-- && goto(current)" ><a href="javascript:void(0)">上一页</a></li>
      <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
        <a href="javascript:void(0)" >{{index}}</a>
      </li>
      <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="javascript:void(0)" >下一页</a></li>
    </ul>
    <div class="rightContent">
      <span class="text">跳转到<input v-model='val' type="text" class="textIndex" @keydown="vilNumber">页</span>
      <button class="pageY" @click="strip">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current:1,
      showItem:5,
      val: '',
      allpage:18
    }
  },
  methods: {
    strip () {
      if(Number(this.val) > this.allpage){
        return
      }
      this.current = Number(this.val)
      this.pages = this.getPages()
    },
    vilNumber () {
      this.val = this.val.replace(/\D/gi,'')
    },
    goto (index) {
      if(index == this.current) return;
      this.current = index;
      //这里可以发送ajax请求
      this.queryData()
    },
    queryData () {
    },
    getPages () {
      let pag = [];
      if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        let i = Math.min(this.showItem,this.allpage);
        while(i){
            pag.unshift(i--);
        }
      }else{ //当前页数大于显示页数了
        let middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
            i = this.showItem;
        if( middle >  (this.allpage - this.showItem)  ){
          middle = (this.allpage - this.showItem) + 1
        }
        while(i--){
          pag.push( middle++ );
        }
      }
      return pag
    }
  },
  computed: {
    pages () {
      return this.getPages()
    }
  },
  mounted () {
    console.log(Number)
  }
}
</script>

<style scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  li{
    list-style:none;
  }
  a{
    text-decoration:none;
  }
  .pagination {
    position: relative;
  }
  .pagination li{
    display: inline-block;
    margin:0 5px;
  }
  .pagination li a{
    padding:.3rem 0.7rem;
    display:inline-block;
    border:1px solid #cfcccc;
    background: #fff;
    color: #777575;
    border-radius: 4px;
  }
  .pagination li.active a{
    background:#3b9df4;
    color:#fff;
  }
  .text{
    margin: 0 10px;
    color: #777575;
  }
  .textIndex{
    width: 40px;
    height: 30px;
    margin: 0 6px;
    text-align: center;
    border:1px solid #cfcccc;
    background: #fff;
    color: #777575;
    border-radius: 4px;
  }
  .pageY{
    background: #10c55b;
    width: 46px;
    height: 30px;
    text-align: center;
    border: none;
    line-height: 30px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }

</style>

