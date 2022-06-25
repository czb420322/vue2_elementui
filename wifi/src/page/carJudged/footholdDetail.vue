<template>
  <div class="searchResultPop searchDetail">
    <div class="carsList">
      <div class="carsDetail" v-for="(item,index) in searchResultDetail.data.rows" :key="index">
        <div class="carsPicture"><img style='width: 100%;height: 100%' :src="item.imgUrl" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>性质: </span> <span>{{Number(item.type)?"返回":"出行"}}</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>{{item.direction}}</span></div>
          <div class="carsMessageTxt"><span>出现时间: </span> <span>{{item.appearTime}}</span></div>
        </div>
      </div>
      <div v-if="!searchResultDetail.data.rows.length"> 暂无数据</div>
    </div>
    <div class="pageNation">
      <el-pagination
        :background=true
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchResultDetail.data.pageNo"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="searchResultDetail.data.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total=searchResultDetail.data.total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import  vehicle from '../../api/vehicle/vehicle.js'
  export default {
    name: "footholdDetail",
    props: {
      tollgateIds: {
        type: String
      },
      searchType: {
        type: String
      },
      searchParams: {
        type: Object,
        default(){
          return {};
        }
      },
      searchResultDetail: {
        type: Object,
        default(){
          return {
            code: null,
            message: "",
            data: {
              pageNo: 0,
              pageSize: 0,
              total: 0,
              rows:[]
            }
          };
        }
      }
    },
    data () {
      return {

      }
    },
    computed:{
      dataParams (){
        let dParams = this.searchParams;
        dParams.tollgateIds = this.tollgateIds;
        dParams.pageNo = this.searchResultDetail.data.pageNo;
        dParams.pageSize = this.searchResultDetail.data.pageSize;
        return dParams;
      }
    },
    mixins:[vehicle],
    methods: {
      //每页val条
      handleSizeChange(val) {
        this.searchResultDetail.data.pageSize = val;
      },
      //当前页
      handleCurrentChange(val) {
        this.searchResultDetail.data.pageNo = val;
        this.getVD(this.searchType, this.dataParams,(res)=>{
          this.transValue(res.data, this.searchResultDetail);
        });
      },
      //重新获取数据
      refreshData () {
        this.searchResultDetail.data.pageNo = 1;
        this.getVD(this.searchType, this.dataParams, (res) => {
          this.transValue(res.data, this.searchResultDetail);
        });
      }
    }
  }
</script>

<style scoped>
  .searchResultPop{
    position:absolute;
    top:0;
    left:30%;
    width:70%;
    height:100%;
    background:#ddd;
  }
  .carsList{
    overflow:hidden;
  }
  .carsDetail {
    width: 16%;
    margin-left: 20px;
    float: left;
    margin-bottom: 30px;
    position: relative;
    border: 1px solid #E7E7E9;
  }

  .carsPicture {
    width: 100%;
    height: 65%;
  }

  .carsHandle {
    width: 100%;
    height: 15%;
    position: absolute;
    top: 50%;
  }

  .carsMessage {
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    background-color: #F0F2F7;
    font-size: 10px;
  }

  .carsMessageTxt {
    margin-left: 20px;
    margin-top: 2px;
  }
</style>
