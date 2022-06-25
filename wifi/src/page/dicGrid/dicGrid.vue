<template>
  <div class="wrapper">
    <div class="item">
      <div class="btn btnleft" @click="addType">新增数据类型
        <span class="addIcon addIcontype"></span>
      </div>
      <table class="gridtable tableone">
        <thead>
          <tr class="toptr" ref="toptr">
            <th v-for="item in colNames" :width='item.width'>{{item.text}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for ="(user,index) in colModel" class="mark" :class="{'activ':acrivIndex == index}">
            <td>{{++index}}</td>
            <td>{{user.itemName}}</td>
            <td>{{user.itemCode}}</td>
            <td>{{user.remark}}</td>
            <td>
              <div class="operating">
                <span class="reappear look">查看
                  <span class="icon"></span>
                </span>
                <span class="reappear edit">编辑
                  <span class="icon"></span>
                </span>
                <span class="reappear del">删除
                  <span class="icon"></span>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <page class="page"
        :totalPage = "totalPage"
        :currentPage = "currentPage"
        :totalRecord = "totalCount"
        :callback = "getCurrentPage"
      ></page>
    </div>
    <div class="item">
      <div class="btn btnright" @click="addData">新增类型具体值
        <span class="addIcon addIcondata"></span>
      </div>
      <table class="gridtable tabletwo">
        <thead>
          <tr class="toptr" ref="toptr">
            <th v-for="item in colNames" :width='item.width'>{{item.text}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for ="(user,index) in subColModel">
            <td class="index">{{++index}}</td>
            <td>{{user.valueName}}</td>
            <td>{{user.itemCode}}</td>
            <td>{{user.remark}}</td>
            <td>
              <div class="operating">
                <span class="reappear edit reappearRight">编辑
                  <span class="icon"></span>
                </span>
                <span class="reappear del reappearRight">删除
                  <span class="icon"></span>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <page class="subpage"
        :totalPage = "subTotalPage"
        :currentPage = "subCurrentPage"
        :totalRecord = "subTotalCount"
        :callback = "getSubCurrentPage"
      ></page>
    </div>
    <div class="mask" v-show="maskFlag">
      <div class="maskContent">
        <div class="pop">
          <p class="title">{{popTitle}}
            <span @click="closePop" class="closeIcon"></span>
          </p>
          <div class="popContent">
            <div class="poptop">
              <span class="">{{dataText}}</span>
              <input type="text">
            </div>
            <div class="popbottom">
              <span class="">描述：</span>
              <textarea></textarea>
            </div>
            <div class="popline"></div>
            <div class="btns">
              <button class="popbtn btnY" @click="addOk">确认</button>
              <button class="popbtn btnN" @click="addNo">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {hasClass, addClass, removeClass} from '../../common/dom/dom.js'
import {getDictionaryItem, getDictionaryVal} from '../../api/manages/dicGrid'
import Page from '../../page/otherPage/otherPage'
export default {
  data () {
    return {
      acrivIndex: 0,
      currentPage: 1,
      totalPage: 10,
      totalCount:10,
      maskFlag: false,
      dataText: "数据具体名称：",
      popTitle: "新增数据具体值",
      totalPage: 15,
      colNames: [{text : '编号', width : '9%'},{text : '数据类型名称', width : '16%'},{text : '代码', width : '10%'},{text : '描述', width : '29%'},{text : '操作', width : '36%'}],
      colModel: [ ],
      itemCode: "",
      subColModel: [],
      subCurrentPage: 1,
      subTotalCount: 10,
      subTotalPage: 10,
    }
  },
  components: {
    Page
  },
  watch: {
    currentPage () {
      this.queryData(this.currentPage)
    },
    subCurrentPage () {
      this.querySubGridData(this.subCurrentPage, this.itemCode)
    },
    itemCode () {
      console.log(this.itemCode)
      this.subCurrentPage = 1
      this.querySubGridData(this.subCurrentPage, this.itemCode)
    }
  },
  methods: {
    addType () {
      this.maskFlag = true
      this.dataText = "数据类型名称："
      this.popTitle = "新增数据类型"
    },
    addData () {
      this.maskFlag = true
      this.dataText = "数据具体名称："
      this.popTitle = "新增数据具体值"
    },
    closePop () {
      this.maskFlag = false
    },
    addOk () {
      this.maskFlag = false
    },
    addNo () {
      this.maskFlag = false
    },
    getCurrentPage (page) {
      this.currentPage = page
    },
    getSubCurrentPage (page) {
      this.subCurrentPage = page
    },
    queryData (page) {
      let that  = this;
      let data = {
        pageNum: page,
        pageSize: 10
      }
      // getDictionaryItem("107/systemManage/system/dictionary/listDictionaryItem",data,
      //   res =>{
      //    if(res.code == 200){
      //      this.colModel = res.data.list
      //      this.itemCode = res.data.list[0].itemCode
      //      this.totalPage = res.data.pages
      //      this.totalCount = res.data.totalCount
      //    }
      //   },
      //   error =>{
      //     console.log(error)
      //   }
      // )
      //  let data = {"parentId":menuCode};
          data = that.$qs.stringify(data);//post请求分离data
          console.log("cccddd")
          that.$http.post('/sms/system/dictionary/listDictionaryItem',data).then(res=>{
              if(res.data.code==200){
                  // that.navlist = res.data.data;
                  that.system_list=res.data.data[0]
                  that.info_list=res.data.data[1]
              }
          })
    },
    querySubGridData (page,itemCode){
      let data = {
        pageBean: {
          pageSize: 10,
          pageNum: page,
        },
        itemCode: this.itemCode
      }
      // getDictionaryVal("107/systemManage/system/dictionary/listDictionaryValue",data,
      //   res => {
      //     console.log(res)
      //     if(res.code == 200){
      //       this.subColModel = res.data.list
      //       this.subTotalPage = res.data.pages
      //       this.subTotalCount = res.data.totalCount
      //     }
      //   },
      //   error => {
      //     console.log(error)
      //   }
      // )
      data = that.$qs.stringify(data);//post请求分离data
       that.$http.post('/sms/system/dictionary/listDictionaryValue',data).then(res=>{
              if(res.data.code==200){
                  // that.navlist = res.data.data;
                   this.subColModel = res.data.list
            this.subTotalPage = res.data.pages
            this.subTotalCount = res.data.totalCount
              }
          })
    }
  },
  created () {
    let _this = this
    this.queryData(this.currentPage)
    setTimeout(() =>{
      if(_this.itemCode){
        _this.querySubGridData(this.subCurrentPage, this.itemCode)
      }
    },300)
  },
  mounted () {

  }
}
</script>

<style scoped>
.wrapper{
  margin: 78px 116px 0 116px;
  display: flex;
}
.page{
  width: 96%;
}
.item{
  flex: 50%;
}
table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:12px;
    color:#000;
    border-width: 1px;
    border-color: #ddd;
    border-collapse: collapse;
    width: 96%;
}
.tabletwo{
  margin-left: 4%;
}
table.gridtable th,table.gridtable td{
    border-width: 1px;
    border-style: solid;
    border-color: #ddd;
}
th{
  font-size: 14px;
}

tr,th{
  text-align:center;
  height: 42px;
  line-height: 42px;
}
.toptr{
  background: #f9f9f9;
  height: 64px;
}
.index{
  background: #fdfdfd;
}
.activ{
  background: #f0f7ff;
}
.reappear{
  position: relative;
  border-radius: 4px;
  display: inline-block;
  height: 30px;
  width: 74px;
  color: #fff;
  vertical-align: middle;
  line-height: 30px;
  text-indent: 20px;
  font-size: 12px;
  background: #44bbc1;
  cursor: pointer;
}
.look{
  background: #67c23a;
}
.look .icon{
  background-image:  url('../../assets/images/dicGrid/look.png');
}
.icon{
  position: absolute;
  width: 13px;
  height: 12px;
  top: 9px;
  left: 12px;
}
.edit{
  background: #3893f2;
}
.edit .icon{
  background:  url('../../assets/images/dicGrid/edit.png') center no-repeat;
}
.del{
  background: #f56c6c;
}
.del .icon{
  background-image:  url('../../assets/images/dicGrid/del.png');
}
.reappearRight{
  margin-left: 20px;
}
.btn{
  height: 36px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  line-height: 36px;
  text-indent: 36px;
  background: #3e86ee;
  margin-bottom: 12px;
  position: relative;
  cursor: pointer;
}
.btnleft{
  width: 130px;
}
.btnright{
  width: 146px;
  margin-left: 4%;
}
.addIcon{
  display: block;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  left: 10px;
}
.addIcontype{
  background: url(../../assets/images/dicGrid/type.png);
}
.addIcondata{
  width: 16px;
  height: 16px;
  background: url(../../assets/images/dicGrid/data.png);
}
.mask{
  background: rgba(0,0,0,.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.maskContent{
  width: 100%;
  height: 100%;
  position: relative;
}
.pop{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title{
  width: 570px;
  height: 60px;
  background: #f3f6f8;
  color: #333;
  line-height: 60px;
  font-size: 16px;
  text-indent: 20px;
}
.closeIcon{
  display: inline-block;
  width: 60px;
  height: 60px;
  background: url(../../assets/images/dicGrid/close.png) center no-repeat;
  float: right;
  cursor: pointer;
}
.popContent{
  width: 570px;
  height: 336px;
  background: #fdfdfd;
}
.poptop{
  padding: 40px 0 0 40px
}
.poptop span{
  font-size: 14px;
}
.poptop input{
  height: 30px;
  width: 318px;
  font-size: 12px;
  padding-left: 6px;
  border: 1px solid #dcdfe6;
}
.popbottom{
  padding: 20px 0 0 40px
}
.popbottom span{
  font-size: 14px;
  display: inline-block;
  width: 98px;
  text-align: right;
}
.popbottom textarea{
  height: 104px;
  width: 318px;
  font-size: 12px;
  padding-left: 6px;
  vertical-align: text-top;
  border: 1px solid #dcdfe6;
}
.popline{
  width: 100%;
  height: 1px;
  margin: 50px 0 24px 0;
  background: #d5dade;
}
.btns{
  margin: 26px 0 0 122px;
}
.popbtn{
  width: 140px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 10px;
  text-indent: 10px;
}
.btnN{
  border: 1px solid #dcdfe6;
  margin-left: 48px;
  color: #333;
  background: #fff;
}
.btnY{
  background: #409eff;
  color: #fff;
}
</style>

