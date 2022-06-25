<!--
 * @Author: your name
 * @Date: 2020-05-14 10:44:56
 * @LastEditTime : 2020-09-03 11:07:18
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\components\casecomparison.vue
 -->
<template>
  <div class="taskMange">
     <el-dialog
        title="案件比对"
        :visible.sync="dialogVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :appendToBody="true"
        top="8vh"
        @close="closeDia"
        @open="opendia"
        width="70%">
        <div class="parison">
            <p class="tabcheck">
              <span @click="caseInfo" :class="{active:checkproperty == 1 }">案件属性</span>
              <span @click="targetInfo" :class="{active:checkproperty == 2 }">目标属性</span>
              <span @click="featureInfo" :class="{active:checkproperty == 3 }">特征属性</span>
              <span @click="faceInfo" v-show="showface == 'true'" :class="{active:checkproperty == 4 }">人脸属性</span>
            </p>
            <div v-if="checkproperty == 1">
              <caseproperty :dataCaseInfo="dataCaseInfo" :candidate="candidate" @appendCase="appendCase"></caseproperty>
            </div>
            <div v-if="checkproperty == 2">
              <targetproperty ref="target"  :dataCaseInfo="dataCaseInfo" :susperList='susperList' :pondList="pondList" @appendCase="appendCase"></targetproperty>
            </div>
            <div v-if="checkproperty == 3">
              <featureproperty ref="feature" :dataCaseInfo="dataCaseInfo" :susperList='susperList' :pondList="pondList" @appendCase="appendCase"></featureproperty>
            </div>
            <div v-if="checkproperty == 4">
              <faceproperty ref="face" :dataCaseInfo="dataCaseInfo" :susperList='susperList' :pondList="pondList" @appendCase="appendCase"></faceproperty>
            </div>
            <el-pagination
                :background="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="$store.state.casecurrent"
                :page-size="$store.state.casePage"
                layout="total,prev, pager, next, jumper"
                :total="$store.state.caseTotal">
            </el-pagination>
            <div class="parison_btn">
              <div class="caseListItem caseListItemdel">
                <div class="caseListItemImg cursor" @click="lookCase(dataCaseInfo.caseUuid)">
                  <img style="width: 2.6rem;height: 1.7rem;cursor:pointer" :src="dataCaseInfo.caseImgUrl == null ? $store.state.defaultImg : dataCaseInfo.caseImgUrl" :onerror="$store.state.defaultImg">
                </div>
                <div class="caseListItemTxt">
                  <div class="caseListItemTxtTitle" :title="dataCaseInfo.caseName">案件名称: <span>{{dataCaseInfo.caseName}}</span></div>
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
                    <div class="detailItemTxtDetial" :title="dataCaseInfo.caseAbstract" style="padding-right:5%;width: calc(100% - 0.6rem);word-wrap:break-word; word-break:break-all"> <span>{{ dataCaseInfo.caseAbstract }}</span></div>
                  </div>
                </div>
              </div>
              <div class="caseListItem nobg caseListItemdel" v-for="(item ,index) in caseList" :key="index">
                <div class="caseListItemImg cursor" @click="lookCase(item)">
                  <img style="width: 2.6rem;height: 1.7rem" :src="item.caseImgUrl == null ? $store.state.defaultImg : item.caseImgUrl" :onerror="$store.state.defaultImg">
                </div>
                <div class="caseListItemTxt">
                  <div class="caseListItemTxtTitle" :title="item.caseName">案件名称: <span>{{item.caseName}}</span></div>
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
                    <div class="detailItemTxtDetial" :title="item.caseAbstract" style="padding-right:5%;width: calc(100% - 0.6rem);word-wrap:break-word; word-break:break-all">
                      <span>{{ item.caseAbstract }}</span></div>
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
          </div>
          <el-dialog
            width="30%"
            title="串并案保存"
            :visible.sync="innerVisible"
            append-to-body>
            <div class="totalbox">
                <div style="display: flex;">
                  <div style="width: 0.6rem;color:#99c9fa;">案件名称:</div>
                  <input type="text" style="width: calc(100% - 2rem);height: 0.28rem;border: 0.01rem solid #E8F0F4; margin-left:0.2rem" v-model="mergerName">
                </div>
                <div style="display: flex;width: 100%;height: 60%;margin-top: 0.2rem"  v-if="innerVisible">
                  <div style="width: 0.6rem;color:#99c9fa;">案件描述:</div>
                  <textarea style="width: calc(100% - 1rem);height:1.2rem;border: 0.01rem solid #E8F0F4; margin-left:0.2rem" v-model="description"></textarea>
                </div>
                <p style="padding-left:0.8rem;color:red" v-show="showtext">请输入少于100个字</p>
              </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary cancleBtn" @click="Resets">取 消</el-button>
              <el-button type="primary passBtn"   @click="saveCasCase()">确 定</el-button>
            </span>
          </el-dialog>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary passBtn"  @click="addpondList">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>

import caseproperty from './parproperty/caseproperty'  //案件属性比对
import targetproperty from './parproperty/targetproperty'  //案件标注比对
import featureproperty from './parproperty/featureproperty'  //案件特征比对
import faceproperty from './parproperty/faceproperty'  //案件特征比对


export default {
  data(){
    return{
      currentPage:1,
      pageSize:5,
      totalCount:10,
      checkproperty:1,
      dataCaseInfo:{},
      caseList:[],
      candidate:[], //候选案件的数组
      susperList:[], //嫌疑人目标的数组
      innerVisible:false,
      mergerName:'',//并案名称
      description:'',//描述
      showtext:'',
      pondList:[], //池子中的ID
      loading:null,  //加载
      showface:'',
      isCurrentUser: false
    }
  },
  mounted(){

  },
  components:{
    caseproperty,  //案件属性
    targetproperty, //案件标注比对
    featureproperty, //特征比对
    faceproperty, //人脸比对

  },
  watch:{
    dialogVisible() {
      if (this.dialogVisible) {
        this.$store.state.casecurrent = 1;
        this.$store.state.casePage = 5;
        this.$store.state.caseTotal = 0;
        // this.ajaxAddCase(this.caseUuid,false)
        this.caseList = []
      }
    }
  },
  props:{
    caseUuid:String
  },
  computed:{
    dialogVisible: {
        get: function () {
          return this.$store.state.caseComSon
        },
        set: function (newVal) {
          this.$store.state.caseComSon = newVal
        }
      }
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.checkproperty = 1
      this.caseList = [];
      this.candidate = []
      this.showface = '';
    },
    //打开模态框
    //请求第一个案件属性比对的原始案件信息和比对信息
    opendia(){
      this.showface = sessionStorage.getItem('enabledLabelRecognitionService')
      // 人员属性跳转到目标属性
      if(this.$store.state.caseTarget == true) {
        this.checkproperty = 2
        this.getSuspcition();
        this.getOriginfo();
        this.getCaseList();
      } else if(this.$store.state.targetProperty == true){
        this.checkproperty = 3
        this.getperVi();
        this.getOriginfo();
        this.getCaseList();
      }else{
        this.getOriginfo();
        this.getCaseList();
      }
    },
    getCaseList(){
        let data = {
          originalCaseUuid:this.caseUuid
        }
        data = this.$qs.stringify(data);
        this.$http.post('vsas/merge/case/list/case/by/OriginalCaseUuid',data).then(res=>{
          if(res.data.code == 200){
            this.getCompars();
            if(res.data.data == null){
              this.pondList = []
            }else{
              this.pondList = res.data.data
            }

          }
        })
    },
    //切换第一个tab
    caseInfo(){
      this.checkproperty = 1
      this.checkreset()
      this.getOriginfo();
      this.getCompars();
    },
    //切换第二个tab  目标属性
    targetInfo(){
      this.checkproperty = 2
      this.checkreset()
      this.getSuspcition();
    },
    //切换第三个tab  特征属性
    featureInfo(){
      this.checkproperty = 3
      this.checkreset();
      this.getperVi();
    },
    //切换第四个tab  人脸属性
    faceInfo(){
      this.checkproperty = 4
      this.checkreset();
      this.getSuspcitions();
    },
    //切换tab页重置属性
    checkreset(){
      this.$store.state.casecurrent = 1;
      this.$store.state.casePage = 5;
      this.$store.state.caseTotal = 0;
      // this.caseList = [] //候选案件
      // this.candidate = []  //池子汇总的案件
      this.susperList = []
    },
    //得到案件属性比对的原点信息
    getOriginfo(){
      this.$http.get('pca/casemng/baseinfo/query?caseUuid='+this.caseUuid).then(res=>{
        if(res.data.code == 200){
          this.dataCaseInfo = res.data.data
        }else{
          this.$notify({
            type: 'warning',
            message: '获取原点案件信息失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    //得到通过案件属性比对的比对案件
    getCompars(){
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正在加载！"
      });
      //案件属性对比
      if(this.checkproperty == 1){
        let data = {
          caseId:this.caseUuid,
          pageNum:this.$store.state.casecurrent,
          pageSize:this.$store.state.casePage,
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/search/advanced/caseStudy',data).then(res=>{
          this.loading.close();
          if(res.data.code == 200){
            this.candidate = res.data.data.list;
            if(this.candidate.length && this.pondList.length){
              this.candidate.forEach((item,i) => {
                this.pondList.forEach((itmes,j) => {
                  if(item.caseUuid == itmes.caseUuid){
                    item.iscase = true
                  }
                });
              });
            }
            this.$store.state.caseTotal = res.data.data.totalCount
          }
        })
      }
    },
    //分页
    handleSizeChange(val){
      this.$store.state.casecurrent = 1
      this.$store.state.casePage = val;
    },
    handleCurrentChange(val){
      this.$store.state.casecurrent = val
      if(this.checkproperty == 1){
        this.getCompars()
      }else if(this.checkproperty == 2){
        if(this.$store.state.personUuid != ''){
          this.$refs.target.getPersonlist(this.$store.state.personUuid)
        }else if(this.$store.state.vehicleUuid != ''){
          this.$refs.target.getCarlist(this.$store.state.vehicleUuid)
        }else if(this.$store.state.bicycleUuid != ''){
          this.$refs.target.getBiclist(this.$store.state.bicycleUuid)
        }
      }else if(this.checkproperty == 3){
        if(this.$store.state.suspicionType == 1){
           this.$refs.feature.getAllPer(this.$store.state.suspicionUuid)
        }else if(this.$store.state.suspicionType == 3){
          this.$refs.feature.getAllCar(this.$store.state.suspicionUuid)
        }
      }else if(this.checkproperty == 4){

      }
      // this.getCompars()
    },
    //子组件传过来的值 渲染添加列表
    appendCase(val){
      if(this.caseList.length){
        for (let i = 0; i < this.caseList.length; i++) {
          if(val.caseUuid == this.caseList[i].caseUuid){
            this.$notify({
              type: 'warning',
              message: '案件已存在,请勿重复添加！',
              position: 'bottom-right',
              duration: 3000
            });
            return
          }
        }
      }
      this.caseList.push(val)
      console.log(this.caseList, 'caseListcaseList-------------');
    },
    //删除添加池子的列表
    delCase(index){
      this.caseList.splice(index,1)
    },
    //点击查看案件详细信息
    lookCase(row){
      if(row == this.dataCaseInfo.caseUuid) {
        return
      }
        if(row.creator == this.$storage.getSession('userInfo').userId){
          this.isCurrentUser = true

        }else{
            this.isCurrentUser = false
        }
        let {href} = this.$router.resolve({path:'/videoCombat/casePicture_look?menuCode=100', query:{caseUuid:row.caseUuid,seek:true, isCurrentUser: this.isCurrentUser}})
        window.open(href, '_blank')

    },
    //将原点案件和添加到比对池中的案件添加到池子中去
    addpondList(){
      if(this.caseList.length < 1){
        this.$notify({
          type: 'warning',
          message: '必须添加至少一个案件',
          position: 'bottom-right',
          duration: 3000
       });
        return
      }
      let arr = []
      for (let i = 0; i < this.caseList.length; i++) {
        arr.push(this.caseList[i].caseUuid)
      }
      arr = arr.join(',')
      let data = {
        originalCaseUuid:this.dataCaseInfo.caseUuid,
        targetCaseUuids:arr
      }
      data = this.$qs.stringify(data)
      this.$http.post('vsas/merge/case/add/case/merge/pond',data).then(res=>{
        if(res.data.code == 200){
          this.dialogVisible = false
          this.$notify({
            type: 'success',
            message: '全部案件加入临时并案池成功',
            position: 'bottom-right',
            duration: 3000
          });
        }else{
          this.dialogVisible = false
          this.$notify({
            type: 'error',
            message: '全部案件加入临时并案池失败',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    // addpondList(){
    //   this.innerVisible = true
    // },
    //保存串并
    saveCasCase(){
      let arr = []
      for (let i = 0; i < this.caseList.length; i++) {
        arr.push(this.caseList[i].caseUuid)
      }
      let data = {
        ids: this.dataCaseInfo.caseUuid + ',' + arr.join(','),
        caseName: this.mergerName,
        description: this.description,
      }
      data = this.$qs.stringify(data)
      this.$http.post('pca/combo/myCombo/addCaseComboInfo',data).then(res=>{
        if(res.data.code == 200){
          this.innerVisible = false
          this.dialogVisible = false
          this.$notify({
            type: 'success',
            message: '保存并案成功',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },
    //重置
    Resets(){
      this. mergerName = '',//并案名称
      this.description = '',//描述
      this.innerVisible = false
    },
    //获取嫌疑人的目标
    getSuspcition(){
      let data = {
        caseUuid:this.caseUuid
      }
      this.$http.get('/pca/casemng/suspicion/list',{params:data}).then(res=>{
        if(res.data.code == 200){
          this.susperList = res.data.data
        }
      })
    },
    //获取嫌疑人的目标
    getSuspcitions(){
      let data = {
        caseUuid:this.caseUuid
      }
      this.$http.get('/pca/casemng/suspicion/list',{params:data}).then(res=>{
        if(res.data.code == 200){
          // this.susperList = res.data.data
          this.susperList= []
          for (let i = 0; i < res.data.data.length; i++) {
            if(res.data.data[i].suspicionType != 3){
              this.susperList.push(res.data.data[i])
            }
          }
        }
      })
    },
    getperVi(){
      let data = {
        caseUuid:this.caseUuid
      }
      this.$http.get('/pca/casemng/suspicion/list/include/person/vehicle',{params:data}).then(res=>{
        if(res.data.code == 200){
          this.susperList = res.data.data
        }
      })
    }
  }

}
</script>


<style lang="scss" scoped>
@import '../assets/css/commom.css';
.parison{
  width:100%;
  height: 6.6rem;
  overflow: auto;
}
.parison_btn{
  width: 100%;
  /* border: 1px solid red; */
  overflow: auto;
}
.el-pagination{
  text-align: right;
  margin: 0.1rem 0;
}

.tabcheck span{
  display: inline-block;
  width: 1rem;
  text-align: center;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #112845;
  cursor: pointer;
  font-weight: 700;
}



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
    @include background_depart_1("background_depart_1");
    @include border_depart_1("border_depart_1");
//    background-color: rgba(16, 35, 56, 0.5);
    // border: 1px solid rgba(15, 44, 79, 0.5);
}
  .caseListItemImg {
    width: 21%;
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
  .caseListItemTxtTitle span{
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .caseListItemHandle {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding-right: 0.2rem;
  }
  .deleteBtn {
    padding: 0.02rem 0.08rem;
    border-radius: 0.03rem;
    display: flex;
  }
  .detailItemTxtDetial{
    height: 0.22rem;
    }
  .detailItemTxtDetial span{
    width: 2.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
</style>
