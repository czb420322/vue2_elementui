<template>
  <ul class="searchDetail">
    <li style="width: 100%;height: 60px;display: flex;align-items: center">
      <div  style="display:inline-block;width: 2px; height: 18px;float:left;margin-right: 10px;background-color:#78B5FE;"></div>
      <div style="color:#78B5FE;float: left;font-size:18px;font-weight: bold ">多区域碰撞搜索</div>
    </li>
    <li class="detailTop">
      <el-radio v-model="radio" class="topItem" @change="changeTab('tab1')" label="1">按车型分类</el-radio>
      <el-radio v-model="radio" class="topItem"  @change="changeTab('tab2')" label="2">按车牌分类</el-radio>
    </li>

    <li id='tab1' class="detailMid">
      <div style="width: 100%;margin-bottom: 20px;font-size: 14px"> <span>识别车型:</span> <span style="color:#FFB95D" >宝马X6</span> <span>该车型共发现车辆:</span> <span  style="color:#FFB95D">5</span> 辆</div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="pageNation">
        <el-pagination
          :background=true
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(this.FpageNo)"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="Number(this.FpageSize)"
          layout="total, sizes, prev, pager, next, jumper"
          :total=Number(this.FtotalNum)>
        </el-pagination>
      </div>


    </li>
    <li id='tab2' class="detailMid">
      <div style="width: 100%;margin-bottom: 20px;font-size: 14px"> <span>车牌号码:</span> <span style="color:#FFB95D" >鄂 AQ2342</span> <span>该车牌共发现车型:</span> <span  style="color:#FFB95D">5</span> 辆</div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="carsDetail">
        <div class="carsPicture"><img style='width: 100%;height: 100%' src="./img/2.png" alt="loading"></div>
        <div class="carsHandle"></div>
        <div class="carsMessage">
          <div class="carsMessageTxt"><span>车牌: </span> <span>鄂AQ2342</span></div>
          <div class="carsMessageTxt"><span>车型: </span> <span>宝马X6旅行者</span></div>
          <div class="carsMessageTxt"><span>时间: </span> <span>2018-4-23 15:21:33</span></div>
          <div class="carsMessageTxt"><span>位置: </span> <span>高科大厦</span></div>
          <div class="carsMessageTxt"><span>方向: </span> <span>东南</span></div>
        </div>
      </div>
      <div class="pageNation">
        <el-pagination
          :background=true
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(this.FpageNo)"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="Number(this.FpageSize)"
          layout="total, sizes, prev, pager, next, jumper"
          :total=Number(this.FtotalNum)>
        </el-pagination>
      </div>


    </li>
    <li class="detailBot">
      <div class="statement">武汉大千信息技术有限公司版权所有2008-2019
      </div>
    </li>
  </ul>
</template>

<script>

  export default {
    data() {
      return {
        radio: '1',
        tabList: [],
        FpageNo: 1,
        FpageSize: 20,
        FtotalNum: 100,
        SpageNo: 1,
        SpageSize: 20,
        StotalNum: 100,
        TpageNo: 1,
        TpageSize: 20,
        TtotalNum: 100,
        tableData: [],
        totalNum: [],
      }
    },
    methods: {


      //每页val条
      handleSizeChange(val) {

      },
      //当前页
      handleCurrentChange(val) {

      },


      changeTab: function (item) {
        var tabs = ["tab1", "tab2"];
        var topItem = document.getElementsByClassName('topItem');
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i] == item) {
            document.getElementById(tabs[i]).style.display = "block";

          } else {
            document.getElementById(tabs[i]).style.display = "none";

          }
        }
      },

      getData() {
        let len = this.tabList.length
        for (let i = 0; i < len; i++) {
          if (i < 14) {
            this.firstData.push(this.tabList[i])
          } else if (i >= 14 && i < 28) {
            this.secondData.push(this.tabList[i])
          } else {
            this.thirdData.push(this.tabList[i])
          }
        }
      }
    }, mounted() {
      this.getData();
    }
  }

</script>

<style scoped>
  @import '../../assets/css/global.css';

  .searchDetail {
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 100%;
    top: 10px;
    left: 10px;
    background-color: #FFFFFF;
  }

  li {
    padding-left: 20px;
    width: 100%;
    font-size: 12px;
  }
  .detailTop {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    position: relative;
  }

  .topSearch {
    position: absolute;
    right: 35px;
    bottom: 20px;
  }

  .orderWay {
    display: inline-block;
    margin-right: 20px;
  }

  .orderSlt {
    height: 22px;
    border: 1px solid #E6E8ED;
  }

  .detailMid {
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .carsDetail {
    width: 16%;
    float: left;
    margin-right: 30px;
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

  .detailBot {
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 100px;
  }

  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;;
    font-size: 14px;
    color: #606266;
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-color: grey;
    margin-bottom: 10px;
    float: left;
  }

  thead {
    border: 1px solid #ebeef5;
    color: #909399;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
  }

  tr:hover {
    background-color: #ECF5FF;
  }

  td {
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 30px;
  }

  th {
    display: table-cell;
    border-right: 1px solid #ebeef5;
    white-space: nowrap;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 12px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    background-color: #F2F6F9;
    text-align: center;
    font-size: 12px;
    color: black;
  }

  .pageNation {
    position: relative;
    height: 50px;
    overflow: hidden;
    margin-top: 50px;
    float: left;
    margin-left: 37%;
  }
</style>
