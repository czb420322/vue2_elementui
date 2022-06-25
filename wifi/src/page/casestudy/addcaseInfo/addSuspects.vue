<template>
  <div class="addSuspects">
    <div class="addleft">
      <p class="tilte_top"><b>|</b>&nbsp;&nbsp;嫌疑人目标信息</p>
      <p style="width:3.5rem;">
        <b class="must">*</b><span> 嫌疑目标名称:</span> <input type="text" v-model="susName" :disabled='suspicionSee'>
        <b class="mustText" v-show='susNameMust'>嫌疑目标名称为必填项<i></i></b>
      </p>
      <p>
        <span>嫌疑目标类型:</span>
        <el-radio-group v-model="person" @change="changeRadio">
          <el-radio label="1" :disabled='personDisabled' ref="person1">人</el-radio>
          <el-radio label="2" :disabled='personDisabled' ref="person2">骑车人</el-radio>
          <el-radio label="3" :disabled='personDisabled' ref="person3">车辆</el-radio>
        </el-radio-group>
      </p>
      <p class="susex" v-show="isShow">
        <span>嫌疑目标性别:</span>
        <el-select v-model="susSex" :disabled='suspicionSee' ref="susSex">
          <el-option v-for="(item,index) in sexlist" :key="index" :label="item.name" :value='item.value'></el-option>
          <!-- <el-option value='0' label='男'></el-option>
            <el-option value='1' label='女'></el-option> -->
        </el-select>
      </p>
      <p v-show="isShow" class="tlephone"><span>嫌疑目标电话:</span> <input type="number" v-model="susNumber" :disabled='suspicionSee' ref="susNumber" placeholder="请输入嫌疑目标电话 "></p>
      <p v-show="isShow" class="idcard"><span>嫌疑人身份证:</span> <input type="text" v-model="susStatus" :disabled='suspicionSee' ref="susStatus" placeholder="请输入嫌疑目标住址"></p>
      <p v-show="isShow"><span>嫌疑目标住址:</span> <input type="text" v-model="susAddress" :disabled='suspicionSee' ref="susAddress"></p>
      <p class="describe">
        <span v-show="isShow">嫌疑目标描述:</span>
        <textarea v-show="isShow" v-model="susDescribe" :disabled='suspicionSee' ref="susDescribe" placeholder="请输入嫌疑目标描述"></textarea>
        <el-button type="primary" class="leftto" @click="DialogVisible1=true" v-if='imgDataListIfy()' :disabled="is3Ddisabled">{{ suspicionSee ? '查看特征':'关联特征'}}</el-button>
      </p>
    </div>
    <div class="addright">
      <p class="tilte_top"><b>|</b>&nbsp;&nbsp;目标图片池</p>
      <div class="mainImg">
        <ul class="mainul">
          <li v-for="(item,index) in imgDataList" :key="index" @click="suspicionSee ? '' : ClickCheckd(index)">
            <img :src="item.traceImgUrl" alt="暂无图片" v-if="!item.videoSliceInfo && !item.videoMark">
            <p v-show="item.videoSliceInfo" style="text-indent: 0.1rem;">视频</p>
            <p v-show="item.videoMark" style="text-indent: 0.1rem;">视频标注</p>
            <img src="@/assets/error_none.png" alt="暂无图片" v-if="item.videoSliceInfo && item.videoSliceInfo.videoProcFlag != 2">
            <img :src="item.videoSliceInfo.thumbnailStoragePath" alt="暂无图片" v-if="item.videoSliceInfo && item.videoSliceInfo.videoProcFlag == 2">
            <img :src="item.videoMark.videoCaptureUrl" alt="暂无图片" v-if="item.videoMark">
            <p v-if="!item.videoMark">
              <span :title="item.markName" v-if="!item.videoSliceInfo">标注名称：{{ item.markName }}</span>
              <span :title="item.videoSliceInfo.title" v-else>视频名称：{{ item.videoSliceInfo.title }}</span>
              <span :title=" item.videoSliceInfo ? item.videoSliceInfo.createTime : item.createTime ">时间：{{ item.videoSliceInfo ? item.videoSliceInfo.createTime : item.createTime }}</span>
              <span :title="item.videoSliceInfo ? item.videoSliceInfo.deviceName : item.deviceName ">位置：{{ item.videoSliceInfo ? item.videoSliceInfo.deviceName : item.deviceName }}</span>
            </p>
            <p v-if="item.videoMark">
              <span :title="item.videoMark.markName ">标注名称：{{ item.videoMark.markName }}</span>
              <span :title="item.videoMark.createTime">时间：{{ item.videoMark.createTime }}</span>
              <span :title="item.videoMark.device ? item.videoMark.device.place : '' ">位置：{{ item.videoMark.device ? item.videoMark.device.place : '' }}</span>
            </p>
            <i v-if="!suspicionSee" class="checkbox" :class="Checkd[index].state ? 'ONimg' : 'OFFimg'"></i>
            <i v-if="suspicionSee" class="cancelRelation" @click="cancelRelation(item,index)">取消关联</i>
          </li>
          <span class="empty" v-show="imgDataList.length == 0">暂无数据</span>
        </ul>
        <el-pagination style="float: right;margin-right: 0.1rem;" :background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  
    <el-dialog :title="suspicionSee ? '查看特征信息' : '添加特征信息'" :modal='false' :visible.sync="DialogVisible1" width="70%">
      <span v-if="DialogVisible1">
            <Suspects3D :suspicionUuid='suspicionUuid' :suspicionSee='suspicionSee' :Suspects3DType='person'></Suspects3D>
          </span>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary passBtn" @click="DialogVisible1 = false">{{ suspicionSee ? '返 回' : '确 定'}}</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import Suspects3D from './addSuspects3D' //嫌疑人特征
  
  
  export default {
    data() {
      return {
        susName: '', //嫌疑目标名称
        person: '1', //嫌疑目标类型
        susSex: '0', //嫌疑目标性别
        susNumber: '', //嫌疑目标电话
        susStatus: '', //嫌疑目标身份证
        susAddress: '', //嫌疑目标地址
        susDescribe: '', //嫌疑目标描述
        totalCount: 0,
        currentPage: 1, // 当前页码
        pageSize: 8, //每页显示的条数
        pageSizes: [8, 16, 24], //下拉框选择的显示条数
        DialogVisible1: false,
        imgDataList: [], //图片池数据
        Checkd: [],
        personUuid: '', //存放人员ID
        bicycleUuid: '', //存放骑车人ID
        vehicleUuid: '', //存放车辆ID
        videoUuid: '', //存放视频ID
        markId: '', //存放视频标注ID
        targetUuid: '', //获取到的ID
        subjectType: '', //类型
        susNameMust: false,
        isShow: true, //是否隐藏
        personDisabled: false, //嫌疑目标类型是否不可编辑
        is3Ddisabled: false,
        loading: '',
        sexlist: [{
            value: '0',
            name: "男"
          },
          {
            value: '1',
            name: "女"
          }
        ]
      };
    },
    components: {
      Suspects3D
    },
    created() {
      // this.reset();
      this.ajaxaa();
    },
    props: {
      //嫌疑人ID
      suspicionUuid: {
        type: String,
        required: true
      },
      //嫌疑人编辑状态
      suspicionUuEditState: {
        type: Boolean,
        required: true
      },
      //嫌疑人查看状态
      suspicionSee: {
        type: Boolean,
        required: true
      },
    },
    methods: {
      mustTips() {
        this.susNameMust = true;
        setTimeout(() => {
          this.susNameMust = false;
        }, 1000);
      },
      //选中图片
      ClickCheckd(index) {
        console.log(this.Checkd[index])
        this.Checkd[index].state = !this.Checkd[index].state
        this.Relation()
      },
      //判断关联目标按钮是否可点击!
      imgDataListIfy() {
        if (this.suspicionSee) {
          return true
        } else if (this.suspicionUuEditState) {
          return true
        } else {
          return false
        }
      },
      Relation() {
        this.personUuid = '';
        this.bicycleUuid = '';
        this.vehicleUuid = '';
        this.videoUuid = '';
        this.markId = '';
        // suspicionUuid:this.suspicionUuid,
        // subjectType:this.imgDataList[i].type,
        for (let i = 0; i < this.Checkd.length; i++) {
          if (this.Checkd[i].state) { //当图片被选中时
            if (this.person == '1') {
              if (this.imgDataList[i].videoSliceInfo != null) {
                this.videoUuid += this.imgDataList[i].videoSliceInfo.videoUuid + ','
              } else if (this.imgDataList[i].videoMark != null) {
                this.markId += this.imgDataList[i].videoMark.markId + ','
              } else {
                this.personUuid += this.imgDataList[i].personUuid + ','
              }
            }
            if (this.person == '2') {
              if (this.imgDataList[i].videoSliceInfo != null) {
                this.videoUuid += this.imgDataList[i].videoSliceInfo.videoUuid + ','
              } else if (this.imgDataList[i].videoMark != null) {
                this.markId += this.imgDataList[i].videoMark.markId + ','
              } else {
                this.bicycleUuid += this.imgDataList[i].bicycleUuid + ','
              }
            }
            if (this.person == '3') {
              if (this.imgDataList[i].videoSliceInfo != null) {
                this.videoUuid += this.imgDataList[i].videoSliceInfo.videoUuid + ','
              } else if (this.imgDataList[i].videoMark != null) {
                this.markId += this.imgDataList[i].videoMark.markId + ','
              } else {
                this.vehicleUuid += this.imgDataList[i].vehicleUuid + ','
              }
            }
  
          }
        }
        console.log(this.videoUuid, 8888);
        this.targetUuid = this.personUuid + this.bicycleUuid + this.vehicleUuid + this.videoUuid + this.markId
        this.targetUuid = this.targetUuid.substr(0, this.targetUuid.length - 1);
      },
      // 表单重置
      reset() {
        this.currentPage = 1, // 当前页码
          this.pageSize = 8, //每页显示的条数
          this.imgDataList = []
        this.susName = '';
        this.person = '1';
        this.susSex = '0';
        this.susNumber = '';
        this.susStatus = '';
        this.susAddress = '';
        this.susDescribe = '';
        this.ajaxImgList()
        this.isShow = true
      },
      //进入编辑后的 嫌疑人信息渲染
      ajaxaa() {
        let data = {
          suspicionUuid: this.suspicionUuid,
        }
        this.$http.get('/pca/casemng/suspicion/details', {
            params: data
          })
          .then((res) => {
            if (this.suspicionUuEditState) {
              this.susName = res.data.data.suspicionName;
              this.susDescribe = res.data.data.description;
              this.susAddress = res.data.data.suspicionAddress;
              this.susStatus = res.data.data.suspicionCard;
              this.susNumber = res.data.data.suspicionPhone;
              this.susSex = res.data.data.suspicionSex;
              this.person = String(res.data.data.suspicionType)
              this.personDisabled = true;
              if (res.data.data.suspicionType == 3) {
                this.isShow = false;
              }
              if (res.data.data.suspicionType == 2) {
                this.is3Ddisabled = true;
              }
            }
            if (this.suspicionSee) {
              this.ajaxImgListRelation()
            } else {
              this.changeRadio()
            }
          })
      },
      //嫌疑人图片池
      ajaxImgList() {
        let data = {
          caseUuid: this.$route.query.caseUuid,
          suspicionType: this.person,
          pageNum: this.currentPage, //当前页
          pageSize: this.pageSize, //当前页结果数量
        }
        this.$http.get('/pca/casemng/suspicion/mark/selectable/list', {
            params: data
          })
          .then((res) => {
            if (res.data.code == 200) {
              if (this.loading != '') {
                this.loading.close();
              }
              console.log('获取图片池信息' + JSON.stringify(res))
              if (res.data.data.list == null || res.data.data.list.length == 0) {
                this.imgDataList = []
              } else {
                console.log('查询线索池' + JSON.stringify(res.data.data.list))
                this.imgDataList = res.data.data.list;
              }
              this.totalCount = res.data.data.totalCount; //页面总数
              this.currentPage = res.data.data.pageNum; //当前页
              this.pageSize = res.data.data.pageSize; //每页条数
              this.Checkd = [];
              var obj = {}
              for (let i = 0; i < this.imgDataList.length; i++) {
                obj = {
                  state: false
                }
                this.Checkd.push(obj)
              }
            }
          })
      },
      //查询已关联的嫌疑人图片池
      ajaxImgListRelation() {
        let data = {
          suspicionUuid: this.suspicionUuid,
          pageNum: this.currentPage, //当前页
          pageSize: this.pageSize, //当前页结果数量
        }
        data = this.$qs.stringify(data);
        this.$http.post('/pca/casemng/suspicion/mark/rel/list', data)
          .then((res) => {
            console.log('查询已关联的嫌疑人图片池' + JSON.stringify(res))
            if (res.data.code == 200) {
              console.log(JSON.stringify(res))
              if (res.data.data.list == null || res.data.data.list.length == 0) {
                this.imgDataList = []
              } else {
                this.imgDataList = res.data.data.list;
              }
              this.totalCount = res.data.data.totalCount; //页面总数
              this.currentPage = res.data.data.pageNum; //当前页
              this.pageSize = res.data.data.pageSize; //每页条数
            }
          })
      },
      //取消嫌疑人关联
      cancelRelation(data, index) {
        this.$emit('incre', this.suspicionUuid)
        console.log('查询取消目标的ID' + JSON.stringify(data))
        if (this.person == '1') {
          if (data.videoSliceInfo != null) {
            this.ajaxCancelRelation(data.videoSliceInfo.videoUuid)
          } else if (data.videoMark != null) {
            this.ajaxCancelRelation(data.videoMark.markId)
          } else {
            this.ajaxCancelRelation(data.personUuid)
          }
        }
        if (this.person == '2') {
          if (data.videoSliceInfo != null) {
            this.ajaxCancelRelation(data.videoSliceInfo.videoUuid)
          } else if (data.videoMark != null) {
            this.ajaxCancelRelation(data.videoMark.markId)
          } else {
            this.ajaxCancelRelation(data.bicycleUuid)
          }
        }
        if (this.person == '3') {
          if (data.videoSliceInfo != null) {
            this.ajaxCancelRelation(data.videoSliceInfo.videoUuid)
          } else if (data.videoMark != null) {
            this.ajaxCancelRelation(data.videoMark.markId)
          } else {
            this.ajaxCancelRelation(data.vehicleUuid)
          }
        }
      },
      ajaxCancelRelation(id) {
        let data = {
          suspicionUuid: this.suspicionUuid,
          targetUuid: id
        }
        data = this.$qs.stringify(data);
        this.$http.post('/pca/casemng/suspicion/mark/rel/cancel', data)
          .then((res) => {
            if (res.data.code == 200) {
              this.ajaxImgListRelation()
            }
          })
      },
  
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.suspicionSee) {
          this.ajaxImgListRelation()
        } else {
          this.ajaxImgList()
        }
      },
      // 监听当前页码
      handleCurrentChange(val) {
        this.currentPage = val;
        if (this.suspicionSee) {
          this.ajaxImgListRelation()
        } else {
          this.ajaxImgList()
        }
      },
      changeRadio() {
        this.currentPage = 1, // 当前页码
          this.imgDataList = [];
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        if (this.person == '1') {
          if (this.suspicionSee) {
            this.ajaxImgListRelation()
          } else {
            this.ajaxImgList()
          }
          this.isShow = true
        }
        if (this.person == '2') {
          if (this.suspicionSee) {
            this.ajaxImgListRelation()
          } else {
            this.ajaxImgList()
          }
          this.isShow = true
        }
        if (this.person == '3') {
          if (this.suspicionSee) {
            this.ajaxImgListRelation()
          } else {
            this.ajaxImgList()
          }
          this.isShow = false
        }
      },
    }
  };
</script>

<style scoped>
  .addSuspects {
    height: 5.5rem;
    background-color: rgba(16, 35, 56, 0.5);
    border: 1px solid rgba(15, 44, 79, 0.5);
  }
  
  .addleft {
    width: 35%;
    height: 100%;
    margin-left: 1%;
    /* border: 1px solid #000; */
    float: left;
    position: relative;
  }
  
  .addright {
    width: 62%;
    margin-left: 37%;
    /* border: 1px solid #000; */
    height: 100%;
  }
  
  .tilte_top {
    padding: 0.1rem 0;
    color: #fff;
  }
  
  .addleft p {
    padding: 0.1rem 0;
    position: relative;
  }
  
  .addleft p span {
    width: 1.06rem;
    font-size: 0.14rem;
    display: inline-block;
    color: #99c9fa
  }
  
  .addleft p input,
  textarea {
    width: calc(100% - 1.3rem);
    height: 0.3rem;
    border-radius: 1px;
    padding-left: 0.1rem;
    border: 1px solid #31353b;
    background-color: rgba(16, 35, 56, 0.5);
    color: #99c9fa
  }
  
  
  /* select {
      width: 0.5rem;
      border: 1px solid #dcdfe6;
      height: 0.3rem;
      color: #606266;
      background: #fff;
      border-radius: 0.05rem;
    } */
  
  .susex>>>.el-select {
    color: #99c9fa;
    position: relative
  }
  
  .susex>>>.el-input--suffix .el-input__inner {
    width: 0.55rem;
    height: 0.3rem;
    border-radius: 1px;
    /* padding-right:0 */
  }
  
  .susex>>>.el-select .el-input__inner {
    padding: 0 0.05rem;
  }
  
  .susex>>>.el-input__suffix i {
    width: 0.25rem;
    line-height: 0.3rem;
    position: absolute;
    right: -0.08rem
  }
  
  .susex {
    display: inline-block;
    width: 41%;
  }
  
  .tlephone {
    width: 57%;
    display: inline-block;
  }
  
  .addleft .idcard input {
    width: 2.2rem;
  }
  
  textarea {
    vertical-align: middle;
    padding: 0 0.1rem;
    height: 1.2rem;
    resize: none;
  }
  
  .describe .el-button {
    margin: 0;
    margin-top: 0.1rem;
    padding: 0.05rem 0.1rem;
  }
  
  .describe .leftto {
    margin-left: 1.1rem;
    margin-right: 0.1rem;
    background: #203b5a;
    border: 1px solid #3d6e91 !important;
  }
  
  .addright .mainImg {
    /* border: 1px solid #000; */
    height: 85%;
    background: #061526
  }
  
  .checkbox {
    display: block;
    height: 0.15rem;
    width: 0.15rem;
    position: absolute;
    bottom: 0.08rem;
    right: 0.08rem;
  }
  
  .cancelRelation {
    display: block;
    height: 0.2rem;
    line-height: 0.2rem;
    width: 0.8rem;
    font-size: 0.1rem;
    background: #ca8826;
    text-align: center;
    color: white;
    font-style: normal;
    position: absolute;
    bottom: 0.05rem;
    right: 0.08rem;
    line-height: 0.2rem;
    border-radius: 0.03rem;
    cursor: pointer;
  }
  
  .ONimg {
    background: url(../../../assets/ImgCheckdON.png) no-repeat center center;
    background-size: 100% 100%;
  }
  
  .OFFimg {
    background: url(../../../assets/ImgCheckdOFF.png) no-repeat center center;
    background-size: 100% 100%;
  }
  
  .mainul {
    overflow-y: auto;
    padding: 0 0.2rem;
    height: calc(100% - 0.5rem);
    /* border: 1px solid #d5dade; */
    position: relative;
  }
  
  .mainul li {
    position: relative;
    margin-top: 0.13rem;
    float: left;
    width: 23.5%;
    height: 1.7rem;
    margin-right: 2%;
    /* box-shadow: 0px 0px 1px ; */
    border: 2px solid #102d50
  }
  
  .mainul li:nth-child(4n) {
    margin-right: 0;
  }
  
  .mainul li img {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .mainul li p {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.58);
    font-size: 0.12rem;
  }
  
  .mainul li p:nth-of-type(1),
  .mainul li p:nth-of-type(2) {
    top: 0;
    height: 0.2rem;
    line-height: 0.2rem;
    color: #99c9fa;
  }
  
  .mainul li p span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    color: #99c9fa;
    margin-left: 0.1rem;
  }
  
  .mainul li p a {
    width: 0.5rem;
    line-height: 0.2rem;
    background-color: #e6a23c;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    position: absolute;
    right: 0.1rem;
    top: 0.15rem;
  }
  
  .el-pagination {
    float: right;
    /* margin-top: 0.2rem; */
    margin-right: 0.2rem;
  }
  
  .el-pagination>>>.el-select .el-input .el-input__inner,
  .el-pagination>>>.el-pagination__editor.el-input .el-input__inner {
    height: 0.25rem;
  }
  
  .el-pagination>>>.el-pagination__sizes .el-input .el-input__inner,
  .el-pagination>>>.el-input {
    font-size: 0.13rem;
  }
  
  .el-pagination>>>.el-pager,
  .el-pagination>>>button:disabled,
  .el-pagination>>>.btn-next {
    margin-top: 0.03rem;
  }
  
  .el-pagination>>>span:not([class*=suffix]) {
    font-size: 0.1rem;
  }
  
  .sanwei {
    display: block;
    height: 4rem;
    background-color: #f9fafa;
  }
  
  .sanweileft {
    width: 50%;
    float: left;
    height: 100%;
    border: 1px solid #000;
  }
  
  .sanweiright {
    width: 50%;
    float: left;
    height: 100%;
    border: 1px solid #000;
  }
  
  .titles {
    color: #409eff;
    margin-left: 0.2rem;
  }
  
  .sanweitarget {
    margin-left: 0.5rem;
    font-size: 0.12rem;
    padding: 0.1rem 0;
  }
  
  .sanweitarget input,
  .sanweitarget select {
    width: 2rem;
    height: 0.25rem;
    padding-left: 0.1rem;
    border: 1px solid #dcdfe6;
    background: white;
  }
  
  .sanweitarget a {
    margin-left: 1rem;
    text-decoration: underline;
    color: red;
  }
  
  .must {
    color: red;
  }
  
  .mustText {
    width: 1.7rem;
    background: red;
    position: absolute;
    top: 0.1rem;
    height: 0.3rem;
    display: block;
    color: white;
    font-size: 0.15rem;
    line-height: 0.3rem;
    text-align: center;
    z-index: 9999;
    font-weight: 500;
    right: -1.7rem;
  }
  
  .mustText i {
    display: block;
    height: 0.1rem;
    width: 0.1rem;
    background: red;
    position: absolute;
    left: -0.05rem;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: rotateZ(45deg);
    -moz-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
  }
  
  .empty {
    display: block;
    height: 10%;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    color: #909399;
  }
  
  .input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  
  .el-radio-group>>>.el-radio__label {
    color: #99c9fa
  }
  
  .el-radio-group>>>.el-radio__inner {
    background-color: transparent;
    border: 1px solid #2160a5;
  }
  
  .el-radio-group>>>.el-radio__inner::after {
    width: 7px;
    height: 7px;
    background-color: #58a9ff;
  }
  
  .el-pagination /deep/ .el-pagination__total,
  .el-pagination /deep/ .el-pagination__jump {
    color: #99c9fa;
  }
  
  .searchBtn {
    border: 0px;
    color: #fff;
    background: transparent;
    background: url('../../../assets/images/videoNewImg/bg/stopnormal.png') no-repeat center center /100% 100%;
  }
  
  .searchBtn:hover {
    background: url('../../../assets/images/videoNewImg/bg/stophover.png') no-repeat center center /100% 100%;
  }
</style>
