<template>
  <div class="dialogWrapper">
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      top="5%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      title="人员属性比对"
      @close="closeDia"
    >
      <div class="dialogContainer">
        <!--案件详细属性列表-->
        <div class="dialogDetail">
          <div class="detailItemLeft">
            <div class="natureName">人员属性</div>
            <!-- <div class="natureName naturePicture">线索图片</div> -->
            <div class="natureName">案件名称</div>
            <div class="natureName">案发时间</div>
            <div class="natureName">目标年龄段</div>
            <div class="natureName">目标包类型</div>
            <div class="natureName">目标包颜色</div>
            <div class="natureName">目标携物</div>
            <div class="natureName">目标下衣类型</div>
            <div class="natureName">目标下衣颜色</div>
            <div class="natureName">目标发型</div>
            <div class="natureName">目标头发颜色</div>
            <div class="natureName">目标民族</div>
            <div class="natureName">目标性别</div>
            <div class="natureName">目标体态</div>
            <div class="natureName">目标鞋子类型</div>
            <div class="natureName">目标鞋子颜色</div>
            <div class="natureName">目标上衣类型</div>
            <div class="natureName">目标上衣颜色</div>
            <div class="natureName">目标上衣纹理</div>
            <div class="natureName">目标朝向</div>
            <!-- <div class="natureName">目标状态</div>
            <div class="natureName">目标姿态</div>
            <div class="natureName">目标行为</div>
            <div class="natureName">目标动作习惯</div> -->
            <div class="natureName operation">操作</div>
          </div>
          <div class="detailItemRight">
            <div class="ownNature">
              <div class="natureName natureNamefirst">原点案件</div>
              <!-- <div class="natureItem naturePicture cursor" @click="lookCase(dataCaseInfo.caseUuid)">
                <img style="width: 100%;height: 100%" :src="personNatureObj.traceImgUrl" alt="暂无图片" v-show="personNatureObj.traceImgUrl">
                <img style="width: 100%;height: 100%" src="@/assets/error_none.png" alt="暂无图片" v-show="!personNatureObj.traceImgUrl">
              </div> -->
              <div class="natureItem">
                <span :title="dataCaseInfo.caseName">{{ dataCaseInfo.caseName }}</span>
              </div>
              <div class="natureItem">{{ dataCaseInfo.timeLowLimit }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.ageType) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.bagStyle) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.bagColor) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.appendant) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.trousersStyle) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.trousersColor) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.hairStyle) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.hairColor) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.ethicCode) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.genderCode) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.bodyType) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.shoesStyle) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.shoesColor) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.coatStyle) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.coatColor) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.coatTexture) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.viewType) }}</div>
              <!-- <div class="natureItem">{{ isEmpty(personNatureObj.status) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.gesture) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.behavior) }}</div>
              <div class="natureItem">{{ isEmpty(personNatureObj.habitualMovement) }}</div> -->
              <div class="natureItem operation"></div>
            </div>

            <div class="othersNature" v-for="(item, index) in compareList"  :key="index">
              <div class="natureName natureNamefirst">候选案件</div>
              <!-- <div class="natureItem naturePicture cursor" @click="lookCase(item.caseUuid)">
                <img style="width: 100%;height: 100%" :src="item.person.traceImgUrl" alt="暂无图片" v-show="item.person.traceImgUrl">
                <img style="width: 100%;height: 100%" src="@/assets/error_none.png" alt="暂无图片" v-show="!item.person.traceImgUrl">
              </div> -->
              <div class="natureItem">
                <span :title="item.caseName">{{ item.caseName }}</span>
              </div>
              <div class="natureItem">{{ item.timeLowLimit }}</div>
              <div class="natureItem">{{ isEmpty(item.person.ageType) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.bagStyle) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.bagColor) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.appendant) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.trousersStyle) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.trousersColor) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.hairStyle) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.hairColor) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.ethicCode) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.genderCode) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.bodyType) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.shoesStyle) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.shoesColor) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.coatStyle) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.coatColor) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.coatTexture) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.viewType) }}</div>
              <!-- <div class="natureItem">{{ isEmpty(item.person.status) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.gesture) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.behavior) }}</div>
              <div class="natureItem">{{ isEmpty(item.person.habitualMovement) }}</div> -->
              <div class="natureItem operation">
                <div class="addNature searchBtn"  v-show="getshowPersonCase" @click="ajaxAddCase(item.caseUuid,true)"><img style="margin-top: 0.02rem;margin-right: 0.05rem" src="../../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">添加</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pageNation">
          <el-pagination style="float: right;margin-right: 0.1rem;margin-top: 0.1rem;"
              :background="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="totalCount">
          </el-pagination>
        </div>





        <!--案件普通列表-->
        <div class="caseListTitle">案件列表</div>
          <div class="caseListItem caseListItemdel">
            <div class="caseListItemImg cursor" >
              <img style="width: 2.6rem;height: 1.7rem" :src="dataCaseInfo.caseImgUrl" alt="暂无图片" v-show="dataCaseInfo.caseImgUrl">
              <img style="width: 2.6rem;height: 1.7rem" src="@/assets/error_none.png" alt="暂无图片" v-show="!dataCaseInfo.caseImgUrl">
            </div>
            <div class="caseListItemTxt">
              <div class="caseListItemTxtTitle"><span class="leftWrods">案件名称:</span> <span class="caseNavBar" :title="dataCaseInfo.caseName" style="width: 1.3rem;">{{ dataCaseInfo.caseName }}</span></div>
              <div class="caseListItemTxtItem">
                <div class="caseListItemTxtItemLeft">
                  <div><span class="leftWrods">案件编号:</span> <span>{{ dataCaseInfo.caseLinkMark }}</span></div>
                  <div><span class="leftWrods">案发时间:</span> <span>{{ dataCaseInfo.timeLowLimit }}</span></div>
                  <div><span class="leftWrods">案件类型:</span> <span>{{ dataCaseInfo.caseCategoryDesc }}</span></div>
                </div>
                <div class="caseListItemTxtItemRight">
                  <div><span class="leftWrods">案发区域:</span> <span>{{ dataCaseInfo.regionFullName }}</span></div>
                  <div><span class="leftWrods">案件状态: </span><span>{{ dataCaseInfo.stateDesc }}</span></div>
                </div>
              </div>
              <div class="caseListItemTxtDetial">
                <div style="width: 0.6rem" class="leftWrods">案件描述:</div>
                <div style="padding-right:5%;width: calc(100% - 0.6rem);word-wrap:break-word; word-break:break-all">{{ dataCaseInfo.caseAbstract }}</div>
              </div>
            </div>
          </div>


        <div class="caseListItem nobg caseListItemdel" v-for="(item ,index) in caseList"  :key="index">
            <div class="caseListItemImg cursor" >
              <img style="width: 2.6rem;height: 1.7rem" :src="item.caseImgUrl" alt="暂无图片" v-show="item.caseImgUrl">
              <img style="width: 2.6rem;height: 1.7rem" src="@/assets/error_none.png" alt="暂无图片" v-show="!item.caseImgUrl">
            </div>
            <div class="caseListItemTxt">
              <div class="caseListItemTxtTitle" v-text="item.caseName"></div>
              <div class="caseListItemTxtItem">
                <div class="caseListItemTxtItemLeft">
                  <div><span class="leftWrods">案件编号:</span> <span>{{ item.caseLinkMark }}</span></div>
                  <div><span class="leftWrods">案发时间:</span> <span>{{ item.timeLowLimit }}</span></div>
                  <div><span class="leftWrods">案件类型:</span> <span>{{ item.caseCategoryDesc }}</span></div>
                </div>
                <div class="caseListItemTxtItemRight">
                  <div><span class="leftWrods">案发区域:</span> <span>{{ item.regionFullName }}</span></div>
                  <div><span class="leftWrods">案件状态: </span><span>{{ item.stateDesc }}</span></div>
                </div>
              </div>
              <div class="caseListItemTxtDetial">
                <div style="width: 0.6rem" class="leftWrods">案件描述:</div>
                <div style="padding-right:5%;width: calc(100% - 0.6rem);word-wrap:break-word; word-break:break-all">{{ item.caseAbstract }}</div>
              </div>
            </div>
            <div class="caseListItemHandle">
              <div class="deleteBtn delBtn" @click="delCase(index)">
                <div class="el-icon-delete" style="font-size: 0.2rem;margin-top: 0.02rem;margin-right: 0.02rem;"></div>
                <div>删除</div>
              </div>

            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="cancleBtn" @click="dialogVisible=false">取 消</el-button>
          <el-button class="passBtn" v-show="getshowPersonCase" @click="checkcaseList()">保存串并</el-button>
      </span>
          <el-dialog
            width="30%"
            title="串并案保存"
            :visible.sync="innerVisible"
            append-to-body>
            <div class="totalbox">
                  <div style="display: flex;">
                    <div style="width: 0.6rem">案件名称:</div>
                    <input type="text" style="width: calc(100% - 2rem);height: 0.28rem;border: 0.01rem solid #E8F0F4; margin-left:0.2rem" v-model="caseName" placeholder="请输入案件名称">
                  </div>
                  <div style="display: flex;width: 100%;height: 60%;margin-top: 0.2rem"  v-if="innerVisible">
                    <div style="width: 0.6rem">案件描述:</div>
                    <textarea style="width: calc(100% - 1rem);height:1.2rem;border: 0.01rem solid #E8F0F4; margin-left:0.2rem" v-model="description" placeholder="请输入案件描述"></textarea></div>
                    <p style="padding-left:0.8rem;color:red" v-show="showtext">请输入少于100个字</p>
              </div>
            <span slot="footer" class="dialog-footer">
            <el-button class="cancleBtn" @click="Resets">取消</el-button>
            <el-button class="passBtn" @click="saveCasCase()">确定</el-button>
            </span>
          </el-dialog>

      </el-dialog>
    </div>
</template>

<script>
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'
  export default {
    props: ["caseUuid","personNatureObj"],
    data() {
      return {
        currentPage: 1,
        pageSize: 4,
        totalCount: 0,
        innerVisible: false,
        caseList: [],
        compareList: [],
        caseName: '',
        description: '',
        dataCaseInfo:{},
        showtext:false
      }
    },
    methods: {
       closeDia(){
        if(this.$route.path == '/videoCombat/videoplay'){
          document.title = document.title + '.'
        }else if(this.$route.path == '/videoCombat/realvideo'){
          document.title = document.title + '..'
        }else if(this.$route.path == '/videoCombat/historyvideo'){
          document.title = document.title + '....'
        }
      },

      // 过滤字段
      isEmpty(text){
        if(String(text) == '' || text == null || text == undefined){
          return '-'
        }else{
          return text
        }
      },

      //获取案件信息
      ajaxAddCase(caseId,state) {
          this.$http({
          url: 'pca/casemng/baseinfo/query',
          method: 'get',
          params: {
            caseUuid: caseId
          }
        }).then(res => {
          if(state){
            this.addCase(res.data.data)
          }else{
            this.dataCaseInfo = res.data.data
          }
        })
      },
      //添加案件
      addCase(obj) {
        if (this.caseList.length != 0) {
          for (let i = 0; i < this.caseList.length; i++) {
            if (this.caseList[i].caseUuid === obj.caseUuid) {
                this.$notify({
                type: 'warning',
                message: '案件已存在,请勿重复添加！',
                position: 'bottom-right',
                duration: 3000
              });
              // layer.alert('案件已存在,请勿重复添加！',{icon:5,title:"消息提示"});
              return ;
            }
          }
        }
          this.caseList.push(obj);
      },

     //删除案件
      delCase(index) {
        this.caseList.splice(index, 1)
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getCompareList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getCompareList()
      },

      //获取比对列表
      getCompareList() {
        let data = {
          caseId:this.caseUuid,  //this.$route.query.caseUuid,
          targetId:this.personNatureObj.personUuid,
          pageNum:this.currentPage,//当前页
          pageSize:this.pageSize,//当前页结果数量
        };
        data = this.$qs.stringify(data);
        this.$http.post('pca/target/comparison/peopleAttr',data)
        .then(res => {
           if(res.data.code == 200){
            // console.log('获取案件属性比对列表信息',JSON.stringify(res.data.data.list))
            this.compareList = res.data.data.list;
            this.totalCount = res.data.data.totalCount;//页面总数
            this.currentPage = res.data.data.pageNum;//当前页
            this.pageSize = res.data.data.pageSize;//每页条数
          }else{
              this.$notify({
                type: 'error',
                message: '获取案件信息失败！',
                position: 'bottom-right',
                duration: 3000
              });
            //  layer.alert('获取案件信息失败！',{icon:5,title:"消息提示"});
          }
        })
      },

       //打开保存串并窗口
      checkcaseList() {
        if (this.caseList.length < 1) {
            this.$notify({
                type: 'warning',
                message: '至少要添加一个案件才能进行串并！',
                position: 'bottom-right',
                duration: 3000
              });
          // layer.alert('至少要添加一个案件才能进行串并！',{icon:5,title:"消息提示"});
          return;
        } else {
          this.innerVisible = true;
        }
      },

       //确认保存串并
      saveCasCase() {
        if(this.description.length > 100){
          this.showtext = true
          setTimeout(()=>{
            this.showtext =false
          },2000)
          return
        }
      let idArr = [];
        idArr.push(this.dataCaseInfo.caseUuid);
        this.caseList.forEach(item => {
          idArr.push(item.caseUuid);
        });
        let data = {
          ids:idArr.join(','),
          caseName:this.caseName,//当前页
          description:this.description,//当前页结果数量
        };
        data = this.$qs.stringify(data);
        this.$http.post('pca/combo/myCombo/addCaseComboInfo',data)
        .then(res => {
          if(res.data.code == 200){
              this.$notify({
                type: 'success',
                message: '保存串并案成功！',
                position: 'bottom-right',
                duration: 3000
              });
            this.Resets()
            this.dialogVisible = false;
          }else if(res.data.code == 100){
              this.$notify({
                type: 'info',
                message: res.data.message,
                position: 'bottom-right',
                duration: 3000
              });
          }
          else{
             this.$notify({
                type: 'error',
                message: '请求失败，服务器异常！',
                position: 'bottom-right',
                duration: 3000
              });
            //  layer.alert('请求失败，服务器异常！',{icon:5,title:"消息提示"});
          }
        })
      },

      // 重置内层弹窗输入框
      Resets(){
        this.description = ''
        this.caseName = ''
        this.innerVisible = false
      },

      //打开新窗口进入详情页
    lookCase(id){
        let {href} = this.$router.resolve({path:'/casestudy/casePicture_look?menuCode=200', query:{caseUuid:id}})
        window.open(href, '_blank')
    },
    },

    computed: {
       ...mapGetters([
        'getshowPersonCase',
      ]),
      dialogVisible: {
        get: function () {
          return this.$store.state.personNatureDialog
        },
        set: function (newVal) {
          this.$store.state.personNatureDialog = newVal
        }
      }
    },
    watch: {
      dialogVisible: function () {
        // console.log('案件人员信息'+JSON.stringify(this.personNatureObj))
        if (this.dialogVisible) {
          this.currentPage = 1;
          this.pageSize = 4;
          //this.ajaxAddCase(this.$route.query.caseUuid,false)
          this.ajaxAddCase(this.caseUuid,false)
          this.compareList = []
          this.getCompareList();
          this.caseList = []
        }
      }
    },


  }
</script>

<style scoped>
/* .dialogWrapper /deep/ .el-dialog__header {
    background-color: #F3F6F8 !important;
  }

  .el-dialog__wrapper >>> .el-dialog__header {
    background-color: #F3F6F8;
  }

  .dialogContainer {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 5rem;
  }

  .dialogDetail {
    border: 0.01rem solid #DFE0E0;
    border-bottom:0;
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

  .caseAbstract{
    height: 1rem !important;
    align-items:baseline !important;
    white-space:inherit !important;
    word-break: break-all;
  }

  .operation{
    height: 0.5rem !important;
  }
  .natureName,.natureItem{
    border-bottom: 0.01rem solid #EEEEEE;
    border-right: 0.01rem solid #EEEEEE;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    height: 0.3rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .natureName{
    background-color: #E6E4E5;
    border-color:white;
  }

  .naturePicture {
    height: 1rem !important;

  }
  .cursor{
     cursor: pointer;
  }

  .detailItemRight {
    width: 90%;
    height: 100%;
  }

  .ownNature {
    width: 20%;
  }

  .othersNature {
    width: 20%;

  }

  .addNature {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    border-radius: 0.03rem;
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
    font-size: 0.15rem;
    margin-bottom: 0.1rem;
    margin-top: 1rem;
    font-weight: bold;
  }


  .caseListItem {
    width: 100%;
    display: flex;
    border: 0.01rem solid #E5E4E8;
    background-color: #FBF9FA;
    font-size: 0.14rem;
    padding: 0.2rem;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
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
    padding: 0.1rem 0.2rem 0.2rem;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .el-dialog__wrapper /deep/ .el-dialog__footer {
    padding: 0.1rem 0.2rem 0.2rem;
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
    padding: 0.02rem 0.08rem;
    border-radius: 0.03rem;
    display: flex;

  }

  .dialogWrapper /deep/ .el-dialog__body {
    color: #606266;
    line-height: 0.24rem;
    font-size: 0.14rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.2rem;
    padding-right: 0.05rem;
  } */
         @import '../../../../assets/css/commom.css' ;
 .dialogWrapper /deep/ .el-dialog__header {
    background-color: #F3F6F8 !important;
  }

  .el-dialog__wrapper >>> .el-dialog__header {
    background-color: #F3F6F8;
  }

  .dialogContainer {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 6.3rem;
  }

  .dialogDetail {
    /* border: 0.01rem solid #DFE0E0; */
    border-bottom:0;
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

  .caseAbstract{
    height: 1rem !important;
    align-items:baseline !important;
    white-space:inherit !important;
    word-break: break-all;
  }

  .operation{
    height: 0.5rem !important;
  }
  .natureName,.natureItem{
    border-bottom: 0.01rem solid #112845;
    border-right: 0.01rem solid #112845;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.14rem;
    height: 0.3rem;
    max-height: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .natureName{
    background-color: #102338;
    /* border-color:white; */
    color:#99c9fa
  }

  .natureNamefirst,.natureItem{
   background-color: rgba(16, 35, 56, 0.5);
    color:#99c9fa
  }

  .natureItem span{
    padding: 0 0.05rem;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
.detailItemLeft .natureName:first-child{
  border-top: 0.01rem solid #112845;
}

  .naturePicture {
    height: 1rem !important;
  }
.detailItemRight .natureName:first-child{
  border-top: 0.01rem solid #112845;
}

  .detailItemRight {
    width: 90%;
    height: 100%;
  }

  .ownNature {
    width: 20%;
  }

  .othersNature {
    width: 20%;
    /* border-right: 0.01rem solid #CDCFCF; */
  }

  .addNature {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    border-radius: 0.03rem;
    /* background-color: #f4f4f4; */
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
    font-size: 0.15rem;
    margin-bottom: 0.1rem;
    margin-top: 0.25rem;
    font-weight: bold;
    color:#fff
  }

  /*列表数据 */
  .caseListItem {
    width: 100%;
    display: flex;
    border: 0.01rem solid #E5E4E8;
    background-color: #FBF9FA;
    font-size: 0.14rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
  }
.caseListItemdel{
   margin-bottom: 0.04rem;
   background-color: rgba(16, 35, 56, 0.5);
    border: 1px solid rgba(15, 44, 79, 0.5);
    color:#99c9fa
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
    color: #99c9fa
  }

  .dialogWrapper /deep/ .el-dialog__footer {
    padding: 0.1rem 0.2rem 0.2rem;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .el-dialog__wrapper /deep/ .el-dialog__footer {
    padding: 0.1rem 0.2rem 0.2rem;
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
    /* background-color: #F56C6C; */
    padding: 0.02rem 0.08rem;
    border-radius: 0.03rem;
    display: flex;

  }

  .dialogWrapper /deep/ .el-dialog__body {
    color: #606266;
    line-height: 0.24rem;
    font-size: 0.14rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.2rem;
    padding-right: 0.05rem;
  }
 .el-dialog__wrapper /deep/ .el-dialog .dialog-footer .el-button--default:last-child {
    width: 1rem;
 }
 .totalbox{
   color:#99c9fa ;
 }
 .caseNavBar{
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
 }
</style>
