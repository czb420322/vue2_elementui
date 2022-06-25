<!--
 * @Author: your name
 * @Date: 2020-08-28 17:22:08
 * @LastEditTime: 2020-11-02 14:49:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\videoCombat\faceManage.vue
 -->
<template>
  <div class="faceManage">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页 ></router-link>
      <p class="sysname">&nbsp;人像库管理</p>
    </div>
    <div class="main">
      <div class="mian_top">
        <span>库名称：</span>
        <input type="text" v-model="keyword" placeholder="请输入库名称">
        <el-button type="primayr" class="searchBtn" @click="searchFace">查询</el-button>
        <el-button type="primayr" class="searchBtn" @click="openAddlib">新增底库</el-button>
      </div>

      <el-table
          :data="faceData"
          border
          class="tables"
          style="width: 100%"
          height="5.5rem">
          <div slot="empty">
            <div class="noImg">
              <img src="../../assets/updataImg/NoData.png" />
            </div>
          </div>
          <el-table-column
            prop="dbName"
            label="库名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="personNum"
            label="人员个数">
          </el-table-column>
          <el-table-column
            prop="faceNum"
            label="人脸图片个数">
          </el-table-column>
          <el-table-column
            prop="remark"
            show-overflow-tooltip
            label="备注">
          </el-table-column>
          <el-table-column prop="operation" width="400" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" class="searchBtn" @click="seekFace(scope.row)">&nbsp;&nbsp;查看人脸</el-button>
              <el-button type="primary" class="topBtn" @click="updateBtnLib(scope.row)">修改</el-button>
              <!-- <el-button type="primary" class="delBtn">禁用</el-button> -->
              <el-button type="success" v-no-more-click class="tryBtn" @click="derive(scope.row)">导出</el-button>
              <el-button type="primary" class="searchBtn" @click="lookDown(scope.row)">下载</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>


    <!-- 新增以及修改底库 -->
    <el-dialog
      :title="btnlibTitle"
      :visible.sync="showBtnLib"
      @close="closelibBtn"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="25%">
      <span class="btnlib">
        <div>
          <span> <i style="color:red">*</i>&nbsp;底库名称：</span>
          <input type="text"  v-model="btnlibName" maxlength="20" placeholder="请输入库名称">
          <div class="mustText mustText0" v-show="NameMust">请输入库名<i></i></div>
          <div class="mustText mustText0" v-show="tenLength">库名输入少于20字<i></i></div>
        </div>
        <div>
          <span>备注：</span>
          <textarea style="resize: none;background: transparent;" v-model="btnlibText" maxlength="50" placeholder="请输入备注"></textarea>
          <div class="mustText mustText0" v-show="textLength">备注不能超过50字<i></i></div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="showBtnLib = false">取 消</el-button>
        <el-button type="primary passBtn" @click="addUpLib">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 打开查看人脸的模态框 -->
    <seekAllFace :openSeekface = "openSeekface" :btnlibInfo="btnlibInfo" @childByAllface="childByAllface"></seekAllFace>
    <!-- 导出日志模态框 -->
    <deriveMsg :openDerimsg="openDerimsg" :btnlibInfo="btnlibInfo" @childbydemsg="childbydemsg"></deriveMsg>
    <!-- 查看进度的接口 -->
    <derive :openderive="openderive" :keys="keys" @childbyderive="childbyderive"></derive>


    </div>
    <footer v-show="false">
      <p>
        <img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
      </p>
    </footer>
  </div>
</template>

<script>
import verify from '../../api/casestudy/verify.js'
import seekAllFace from './faceMan/seekAllFace'
import deriveMsg from './faceMan/deriveMsg'
import derive from './faceMan/derive'
export default {
  data () {
    return {
      keyword:'',// 模糊搜索低库列表
      faceData:[],//人脸库集合
      showBtnLib:false, //新增修改底库
      btnlibTitle:'新增底库',
      btnlibName:'', //底库名称
      btnlibText:'', //底库备注
      openSeekface:false, //打开查看人脸
      btnlibInfo:{},//单个底库信息
      currentPage:1,
      pageSize:10,
      totalCount:0,
      faceDbPrimaryKey:'',//库名的ID
      openDerimsg:false, //打开下载列表
      keys:'',
      openderive:false, //打开请求进度的接口
    }
  },
  components: {
    seekAllFace,deriveMsg,derive
  },
  mixins:[verify],
  mounted(){
    this.getAllFaceMan();
  },
  methods: {
    //得到人脸底库列表
    getAllFaceMan(){
      if(this.keyword != ''){
        this.currentPage = 1
      }
      let data = {
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        orderBy:'',
        orderType:'',
        dbName:this.keyword
      }
      this.$http.get('sms/threeFaceDb/faceDbList',{params:data}).then(res=>{
        if(res.data.code == 200){
          this.faceData = res.data.data.data.list;
          console.log(this.faceData);
          this.totalCount = res.data.data.data.totalCount
        }else{
          this.$notify({
            type: 'warning',
            message: '系统繁忙请稍后再试',
            position: 'bottom-right',
            duration: 3000
          });
        }
      })
    },

    searchFace(){
      this.getAllFaceMan()
    },
    // 分页
    handleSizeChange(val){
      this.pageSize = val;
      this.getAllFaceMan()
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getAllFaceMan()
    },
    // 打开新增修改底库
    openAddlib(){
      this.btnlibTitle = '新增底库'
      this.showBtnLib = true
    },
    // 打开修改底库的页面
    updateBtnLib(row){
      console.log(row);
      this.btnlibTitle = '修改底库'
      this.showBtnLib = true;
      this.btnlibName = row.dbName
      this.btnlibText = row.remark
      this.faceDbPrimaryKey = row.id
    },
    //新增修改底库
    addUpLib(){
      this.btnlibName=this.btnlibName.replace(/\s+/g, "");
      // console.log(this.btnlibName);
      // return
      if(this.btnlibName == ''){
        this.NameMust = true
        setTimeout(() => {
          this.NameMust = false
        }, 1000);
        return
      }
      if(this.btnlibName.length > 20){
        this.tenLength = true
        setTimeout(() => {
          this.tenLength = false
        }, 1000);
        return
      }
      if(this.btnlibText.length > 50){
        this.textLength = true
        setTimeout(() => {
          this.textLength = false
        },2000);
        return
      }
      if(this.btnlibTitle == '新增底库'){
        this.getverify();
        let data = {
          dbName:this.btnlibName,  //库名称
          remark:this.btnlibText,  //库备注
          createrId:this.$storage.getSession("userInfo").userId //当前上传人的ID
        }
        let btnlibName = this.btnlibName
        data = this.$qs.stringify(data);
        this.showBtnLib = false
        this.$http.post('sms/threeFaceDb/createFaceDb',data).then(res=>{
          if(res.data.code == 200){
            this.currentPage = 1
            this.pageSize = 10
            this.getAllFaceMan();
            this.btnlibInfo = {
              dbName:btnlibName,
              id:res.data.data
            }
            this.seekFace(this.btnlibInfo)
          }else if(res.data.code == 100){
            this.$notify({
              type: 'warning',
              message: '人像库名称已存在，新增人像库失败',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.$notify({
              type: 'warning',
              message: '添加底库失败',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      }else if(this.btnlibTitle == '修改底库'){
        let data = {
          dbName:this.btnlibName,
          remark:this.btnlibText,
          faceDbPrimaryKey:this.faceDbPrimaryKey
        }
        data = this.$qs.stringify(data);

        this.$http.post('sms/threeFaceDb/updateFaceDb',data).then(res=>{
            if(res.data.code == 200){
              this.showBtnLib = false
              this.currentPage = 1
              this.pageSize = 10
              this.getAllFaceMan()
               this.$notify({
                  type: 'success',
                  message: '修改人脸库成功',
                  position: 'bottom-right',
                  duration: 3000
                });
            }else if(res.data.code == 100){
              this.btnlibName = ''
              this.$notify({
                  type: 'warning',
                  message: '人像库名称已存在，修改人像库失败',
                  position: 'bottom-right',
                  duration: 3000
                });
            }else{
              this.showBtnLib = false
              this.$notify({
                  type: 'warning',
                  message: '修改人脸库失败',
                  position: 'bottom-right',
                  duration: 3000
                });
            }

        })
      }
    },
    // 查看人脸
    //打开查看人脸的弹框
    seekFace(row){
      this.openSeekface = true
      this.btnlibInfo = row
    },
    //关闭模态框
    childByAllface(val){
      this.getAllFaceMan();
      this.openSeekface = val
    },
    childbydemsg(val){
      this.openDerimsg = val
    },
    closelibBtn(){
      this.btnlibName = ''
      this.btnlibText = ''
    },
    childbyderive(val){
      this.openderive = val
      setTimeout(()=>{
        this.openDerimsg = true;
      },300)
    },
    //打开查看日志页面
    lookDown(row){
      this.btnlibInfo = row
      this.openDerimsg = true
    },
    //全库导出
    derive(row){
      console.log(row);
      if(row.personNum == 0){
        this.$notify({
          type: 'warning',
          message: '当前库没有人脸',
          position: 'bottom-right',
          duration: 3000
        });
        return
      }
      this.btnlibInfo = row
      let data =  {
        faceDbPrimaryKey:row.id
      }
      data = this.$qs.stringify(data)
      this.$http.post('sms/faceExport/exportDir',data).then(res=>{
        console.log(res,66666);
        this.openderive = true
        this.keys = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/commom.css";
@import "../../assets/css/verify.css";

.faceManage {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.main {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0.6rem;
  left: 0px;
  overflow: auto;
  color: #fff;
  padding: 0.2rem;
  /* background-color: red; */
}
.tables .el-button {
  padding: 0.07rem 0.1rem;
  font-size: 0.12rem !important;
}
.mian_top{
  height: 0.4rem;
}
.mian_top input,
.mian_top .el-button{
  padding-left: 0.1rem;
  margin-top: 0.05rem;
  height: 0.3rem;
}
.mian_top .el-button{
  padding: 0 0.2rem;
}
.tables{
  margin-top: 0.2rem;
}
.el-dialog__wrapper /deep/ .el-dialog{
  min-width: 0rem;
}
.btnlib{
  color: #99c9fa;
}
.btnlib > div{
  position: relative;
  padding-left: 0.3rem;
}
.btnlib > div span{
  width: 1rem;
  text-align: right;
  display: inline-block;
}
.btnlib div:first-child{
  height: 0.4rem;
}
.btnlib div:first-child input{
  width: 2rem;
  height: 0.3rem;
  border-radius: 3px;
  margin-top: 0.05rem;
  padding-left: 0.1rem;
}
.btnlib div textarea{
  width: 2rem;
  height: 0.8rem;
  padding-left: 0.1rem;
}
.mustText0{
  right: -0.45rem
}
.el-pagination{
  text-align: right;
  margin-top: 0.15rem;
}

</style>

