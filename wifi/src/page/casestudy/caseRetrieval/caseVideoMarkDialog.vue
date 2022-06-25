<template>
  <div class="dialogWrapper">
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      top="5%"
      title="视频标注对比"
    >
      <div class="dialogContainer">
        <!--案件详细属性列表-->
        <div class="dialogDetail">
          <div class="detailItemLeft">
            <div class="natureName naturePicture">案件截图</div>
            <div class="natureName">案件名称</div>
            <div class="natureName">案发时间</div>
            <div class="natureName">危害程度</div>
            <div class="natureName">作案手段</div>
            <div class="natureName">作案时机</div>
            <div class="natureName">案件性质</div>
            <div class="natureName">侵犯目标</div>
            <div class="natureName">作案工具</div>
            <div class="natureName">案件类型</div>
            <div class="natureName">交通工具</div>
            <div class="natureName">交通工具颜色</div>
            <div class="natureName">操作</div>
          </div>
          <div class="detailItemRight">
            <div class="ownNature">
              <div class="natureItem naturePicture">
                <img  style="width: 100%;height: 100%" src="../../../assets/case/searchItem.png" alt="">
              </div>
              <div class="natureItem">案件名称1</div>
              <div class="natureItem">2016-4-26</div>
              <div class="natureItem">严重</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem"><div class="comparePlayBtn">对比播放</div></div>
            </div>
            <div class="othersNature">
              <div class="natureItem naturePicture">
                <img  style="width: 100%;height: 100%" src="../../../assets/case/searchItem.png" alt="">
              </div>
              <div class="natureItem">案件名称1</div>
              <div class="natureItem">2016-4-26</div>
              <div class="natureItem">严重</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem"><div class="addNature">
                <img style="margin-top: 2px;margin-right: 5px"  src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                添加</div>
              </div>
            </div>
            <div class="othersNature">
              <div class="natureItem naturePicture">
                <img  style="width: 100%;height: 100%" src="../../../assets/case/searchItem.png" alt="">
              </div>
              <div class="natureItem">案件名称1</div>
              <div class="natureItem">2016-4-26</div>
              <div class="natureItem">严重</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem"><div class="addNature">
                <img style="margin-top: 2px;margin-right: 5px"  src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                添加</div>
              </div>
            </div>
            <div class="othersNature">
              <div class="natureItem naturePicture">
                <img  style="width: 100%;height: 100%" src="../../../assets/case/searchItem.png" alt="">
              </div>
              <div class="natureItem">案件名称1</div>
              <div class="natureItem">2016-4-26</div>
              <div class="natureItem">严重</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem"><div class="addNature">
                <img style="margin-top: 2px;margin-right: 5px"  src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                添加</div>
              </div>
            </div>
            <div class="othersNature">
              <div class="natureItem naturePicture">
                <img  style="width: 100%;height: 100%" src="../../../assets/case/searchItem.png" alt="">
              </div>
              <div class="natureItem">案件名称1</div>
              <div class="natureItem">2016-4-26</div>
              <div class="natureItem">严重</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem">******</div>
              <div class="natureItem"><div class="addNature">
                <img style="margin-top: 2px;margin-right: 5px"  src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                添加</div>
              </div>
            </div>

          </div>
        </div>
        <div class="pageNation">
          <el-pagination style="float: right;margin-right: 10px;"
                         :background=true
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="Number(this.pageNo)"
                         :page-sizes="[10, 20, 30, 40, 50, 100]"
                         :page-size="Number(this.pageSize)"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total=Number(this.totalNum)>
          </el-pagination>
        </div>

        <!--案件普通列表-->
        <div class="caseList">
          <div class="caseListTitle">案件列表</div>

          <div class="caseListItem">
            <div class="caseListItemImg">
              <img style="width: 100%;height: 100%" src="../../../assets/case/approve-itme.png" alt="">
            </div>
            <div class="caseListItemTxt">
              <div class="caseListItemTxtTitle">原点案件名称</div>
              <div class="caseListItemTxtItem">
                <div class="caseListItemTxtItemLeft">
                  <div><span class="leftWrods">警情号:</span> <span>JSF4596789654614214</span></div>
                  <div><span class="leftWrods">案发时间:</span> <span>2015-10-23 15;22:33</span></div>
                  <div><span class="leftWrods">案件类型:</span> <span>2015-10-23 15;22:33</span></div>
                </div>
                <div class="caseListItemTxtItemRight">
                  <div> <span class="leftWrods">案件类型:</span> <span>抢劫</span></div>
                  <div><span class="leftWrods">案发区域:</span> <span>湖北省武汉市洪山区</span></div>
                  <div><span class="leftWrods">案件状态: </span><span>未破案</span></div>
                </div>
              </div>
              <div  class="caseListItemTxtDetial">
                <div style="width: 60px" class="leftWrods">案件描述: </div> <div style="padding-right:5%;width: calc(100% - 60px);word-wrap:break-word; word-break:break-all"> 2015年10月23日15时22分,增反数量的疯狂就爱上当老师;拉速度快解放拉萨的咖啡机是的发送到发送到分是的发生发生的是的发送到发送到分是的发生发生的</div>
              </div>
            </div>
            <div class="caseListItemHandle">
              <div class="deleteBtn"><div class="el-icon-delete" style="font-size: 20px;margin-top: 2px;margin-right: 2px;"></div><div>删除</div></div>

            </div>
          </div>

        </div>
        <!--<div class="dialogHandle"></div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisible=true">保存串并</el-button>
        <el-button @click="dialogVisible=false ">取 消</el-button>
     </span>

      <!--内层dialog-->
      <el-dialog
        width="30%"
        title="串并案保存"
        :visible.sync="innerVisible"
        append-to-body>
        <div><span style="width: 60px">案件名称:</span><input type="text" style="width: calc(100% - 60px);height: 28px;border: 1px solid #E8F0F4"></div>
        <div style="display: flex;width: 100%;height: 60%;margin-top: 20px"><div style="width: 60px">案件描述:</div> <textarea style="width: calc(100% - 60px);height:120px;border: 1px solid #E8F0F4"></textarea></div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisible=false">确定</el-button>
        <el-button @click="innerVisible=false">取消</el-button>
     </span>
      </el-dialog>


    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        totalNum: 100,
        innerVisible:false
      }
    },
    computed: {
      dialogVisible: {
        get: function () {
          return this.$store.state.caseVideoMarkDialogFlag
        },
        set: function (newVal) {
          this.$store.state.caseVideoMarkDialogFlag = newVal
        }
      }
    },
    watch: {
      /*       dialogVisible:{
             handler(newValue, oldValue) {
               newValue = this.$store.state.caseNatureDialogFlag
             },
             deep: true,
           },*/
    },
    methods: {
      //翻页
      handleSizeChange(val) {
        console.log(val)
      },
      //选条数
      handleCurrentChange(val) {
        console.log(val)
      },
    }
  }
</script>

<style scoped>

  /*  .dialogWrapper /deep/ .el-icon-close:before {
          content: '';
    }*/

  .dialogWrapper /deep/ .el-dialog__header {
    background-color: #F3F6F8 !important;
  }
  .el-dialog__wrapper >>>  .el-dialog__header{
    background-color: #F3F6F8;
    padding:10px 20px 10px;
  }

  .dialogContainer {
    /*    display: flex;
        flex-direction: column;*/
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 500px;
  }

  .dialogDetail {
    border: 1px solid #DFE0E0;
    display: flex;
  }
  .detailItemLeft {
    display: flex;
    flex-direction: column;
    width: 10%;
  }
  .detailItemRight {
    display: flex;
  }

  .natureName {
    background-color: #E6E4E5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    /*margin-bottom: 0.02rem;*/
    border-bottom: 1px solid white;
  }

  .naturePicture {
    height: 1rem;
  }

  .detailItemRight {
    width: 90%;
    height: 100%;
  }
  .ownNature{
    width: 20%;
    border-right:1px solid #CDCFCF;
  }
  .othersNature{
    width: 20%;
    border-right:1px solid #CDCFCF;
  }
  .natureItem{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    /*margin-bottom: 0.02rem;*/
    border-bottom: 1px solid #EEEEEE;
  }
  .comparePlayBtn{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    border-radius: 3px;
    color: white;
    background-color:#8DB904;
    cursor:pointer;
    border:1px solid #F0EFEF;
  }
  .addNature{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.7rem;
    height: 50%;
    border-radius: 3px;
    background-color:#F7F7F7;
    border:1px solid #F0EFEF;
    cursor:pointer;
  }
  .pageNation{
    margin-top: 0.1rem;
    width: 100%;
  }
  .caseList{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .caseListTitle{
    width: 100%;
    font-size: 0.14rem;
    margin-bottom: 0.1rem;
    margin-top: 0.2rem;
  }




  /*列表数据 */
  .caseListItem{
    width: 100%;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    float: left;
    display: flex;
    border:1px solid #E5E4E8;
    background-color:#FBF9FA;
    font-size: 0.14rem;
  }
  .caseListItemImg{
    width: 25%;
  }
  .caseListItemTxt{
    height: 100%;
    width: 65%;
    display: flex;
    flex-direction: column;
    padding-left: 0.2rem;
  }
  .caseListItemTxtTitle{
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    font-size: 0.14rem;
    font-weight: 600;
  }
  .caseListItemTxtItem{
    width: 100%;
    height: 40%;
    display: flex;
    font-size: 0.14rem;
  }
  .caseListItemTxtItemLeft{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .caseListItemTxtItemRight{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .caseListItemTxtDetial{
    width: 100%;
    height: 30%;
    word-wrap:break-word;
    word-break:break-all;
    font-size: 0.14rem;
    display: flex;
  }
  .leftWrods{
    color:black
  }
  .dialogWrapper /deep/ .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .el-dialog__wrapper /deep/ .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .caseListItemHandle{
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding-right: 0.2rem;
  }
  .deleteBtn{
    background-color:#F56C6C;
    padding:2px 3px;
    border-radius: 3px;
    display: flex;

  }
  .dialogWrapper /deep/ .el-dialog__body {
    color: #606266;
    line-height: 24px;
    font-size: 14px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 5px;
  }
</style>
