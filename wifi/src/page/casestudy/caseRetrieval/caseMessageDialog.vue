<template>
  <div class="dialogWrapper">
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      top="5%"
      title="案件对比"
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
            <div class="natureName">侵犯目标</div>
            <div class="natureName">作案工具</div>
            <div class="natureName">案件类型</div>
            <div class="natureName">操作</div>
          </div>
          <div class="detailItemRight">
            <div class="othersNature" v-for="(item, index) in compareList" :key="index">
              <div class="natureItem naturePicture">
                <img style="width: 100%;height: 100%" :src="item.caseImgUrl" alt="暂无图片">
              </div>
              <div class="natureItem" v-text="item.caseName"></div>
              <div class="natureItem" v-text="item.createTime"></div>
              <div class="natureItem" v-text="item.caseLevelDesc"></div>
              <div class="natureItem" v-text="item.caseMethodDesc"></div>
              <div class="natureItem" v-text="item.caseOpportunityDesc"></div>
              <div class="natureItem" v-text="item.caseTargetDesc"></div>
              <div class="natureItem" v-text="item.caseToolDesc"></div>
              <div class="natureItem" v-text="item.caseCategoryDesc"></div>
              <div class="natureItem">
                <div class="addNature" @click="addCase(item)">
                  <img style="margin-top: 2px;margin-right: 5px"
                       src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                  添加
                </div>
              </div>
            </div>

          </div>
        </div>
        <!--案件普通列表-->
        <div class="caseList">
          <div class="caseListTitle">案件列表</div>
          <div class="caseListItem" v-for="(item ,index) in caseList" :key="index">
            <div class="caseListItemImg">
              <img style="width: 100%;height: 100%" :src="item.caseImgUrl" alt="暂无图片">
            </div>
            <div class="caseListItemTxt">
              <div class="caseListItemTxtTitle" v-text="item.caseName">原点案件名称</div>
              <div class="caseListItemTxtItem">
                <div class="caseListItemTxtItemLeft">
                  <div><span class="leftWrods">警情号:</span> <span v-text="item.alarmLinkMark"></span></div>
                  <div><span class="leftWrods">案发时间:</span> <span v-text="item.createTime"></span></div>
                  <div><span class="leftWrods">案件类型:</span> <span
                    v-text="item.caseCategoryDesc">2015-10-23 15;22:33</span></div>
                </div>
                <div class="caseListItemTxtItemRight">
                  <div><span class="leftWrods">案发区域:</span> <span v-text="item.placeFullAddress"></span></div>
                  <div><span class="leftWrods">案件状态: </span><span v-text="item.state"></span></div>
                </div>
              </div>
              <div class="caseListItemTxtDetial">
                <div style="width: 60px" class="leftWrods">案件描述:</div>
                <div style="padding-right:5%;width: calc(100% - 60px);word-wrap:break-word; word-break:break-all"
                     v-text="item.caseAbstract">
                </div>
              </div>
            </div>
            <div class="caseListItemHandle">
              <div class="deleteBtn" @click="delCase(index)">
                <div class="el-icon-delete" style="font-size: 20px;margin-top: 2px;margin-right: 2px;"></div>
                <div>删除</div>
              </div>

            </div>
          </div>

        </div>
        <!--<div class="dialogHandle"></div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkcaseList()">保存串并</el-button>
        <el-button @click="dialogVisible=false ">取 消</el-button>
     </span>
      <!--内层dialog-->
      <el-dialog
        width="30%"
        title="串并案保存"
        :visible.sync="innerVisible"
        append-to-body>
        <div><span style="width: 60px">案件名称:</span><input type="text" v-model="caseName"
                                                          style="width: calc(100% - 60px);height: 28px;border: 1px solid #E8F0F4" placeholder="请输入案件名称">
        </div>
        <div style="display: flex;width: 100%;height: 60%;margin-top: 20px">
          <div style="width: 60px">案件描述:</div>
          <textarea v-model="description"
                    style="width: calc(100% - 60px);height:120px;border: 1px solid #E8F0F4" placeholder="请输入案件描述"></textarea></div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveCasCase()">确定</el-button>
        <el-button @click="innerVisible=false">取消</el-button>
     </span>
      </el-dialog>


    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ["compareList"],
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        totalNum: 100,
        innerVisible: false,
        caseList: [],
        caseName: '',
        description: '',
      }
    },
    created() {

    },

    methods: {
//添加案件
      addCase(obj) {
        if (this.caseList.length === 0) {
          this.caseList.push(obj)
        } else {
          for (let i = 0; i < this.caseList.length; i++) {
            if (this.caseList[i] === obj) {
              this.$alert("案件已存在,请勿重复添加")
              return;
            }
          }
          this.caseList.push(obj)
        }

      },
      //删除案件
      delCase(index) {
        this.caseList.splice(index, 1)
      },

//保存串并
      checkcaseList() {
        if (this.caseList.length < 2) {
          this.$alert("请至少在添加一个案件")
          return;
        } else {
          this.innerVisible = true
        }
      },
      saveCasCase() {
        let idArr = []
        this.caseList.forEach(item => {
          idArr.push(item.caseUuid)
        })
        this.$http({
          url: ' pca/combo/myCombo/addCaseCombo ',
          method: 'post',
          params: {
            caseName: this.caseName,
            description: this.description,
            ids: idArr.join(',')
          }
        }).then(res=>{
          if(res.data.code===200){
            this.innerVisible=false
            this.$notify({
              type: 'success',
              message: '保存串并案成功！',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.innerVisible=false
            this.$notify({
              type: 'error',
              message: '保存串并案失败',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      }
    },


    computed: {
      dialogVisible: {
        get: function () {
          return this.$store.state.caseMessageDialogFlag
        },
        set: function (newVal) {
          this.$store.state.caseMessageDialogFlag = newVal
        }
      }
    },
    watch: {
      dialogVisible: function () {
        if (this.dialogVisible == true) {
          this.caseList = []
        } else {
        }
      }
    },
  }
</script>

<style scoped>


  .dialogWrapper /deep/ .el-dialog__header {
    background-color: #F3F6F8 !important;
  }

  .el-dialog__wrapper >>> .el-dialog__header {
    background-color: #F3F6F8;
    padding: 10px 20px 10px;
  }

  .dialogContainer {
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
    height: 0.3rem;
  }

  .naturePicture {
    height: 1rem !important;
  }

  .detailItemRight {
    width: 90%;
    height: 100%;
  }

  .ownNature {
    width: 20%;
    border-right: 1px solid #CDCFCF;
  }

  .othersNature {
    width: 20%;
    border-right: 1px solid #CDCFCF;
  }

  .natureItem {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    /*margin-bottom: 0.02rem;*/
    border-bottom: 1px solid #EEEEEE;
    height: 0.3rem;
  }

  .comparePlayBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    border-radius: 3px;
    color: white;
    background-color: #8DB904;
    cursor: pointer;
    border: 1px solid #F0EFEF;
  }

  .addNature {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    border-radius: 3px;
    background-color: #f4f4f4;
    cursor: pointer;
  }

  .pageNation {
    margin-top: 0.1rem;
    width: 100%;
  }

  .caseList {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .caseListTitle {
    width: 100%;
    font-size: 0.14rem;
    margin-bottom: 0.1rem;
    margin-top: 0.2rem;
    font-weight: bold;
  }

  /*列表数据 */
  .caseListItem {
    width: 100%;
    display: flex;
    border: 1px solid #E5E4E8;
    background-color: #FBF9FA;
    font-size: 0.14rem;
  }

  .caseListItemImg {
    width: 25%;
  }

  .caseListItemTxt {
    height: 100%;
    width: 65%;
    display: flex;
    flex-direction: column;
    padding-left: 0.2rem;
  }

  .caseListItemTxtTitle {
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    font-size: 0.14rem;
    font-weight: 600;
  }

  .caseListItemTxtItem {
    width: 100%;
    height: 40%;
    display: flex;
    font-size: 0.14rem;
  }

  .caseListItemTxtItemLeft {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .caseListItemTxtItemRight {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .caseListItemTxtDetial {
    width: 100%;
    height: 30%;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 0.14rem;
    display: flex;
  }

  .leftWrods {
    color: black
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


  .caseListItemHandle {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding-right: 0.2rem;
  }

  .deleteBtn {
    background-color: #F56C6C;
    padding: 2px 3px;
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
