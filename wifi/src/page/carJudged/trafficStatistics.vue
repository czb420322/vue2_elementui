<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:06
 * @LastEditTime : 2020-11-02 14:47:01
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\carJudged\trafficStatistics.vue
 * @
 -->
<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname"  :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判 > </router-link>
      <p class="sysname">&nbsp;车流量统计</p>
    </div>

    <!--监控区域-->
    <div class="cont">
      <ul class="searchCondition">
        <li class="searchTitle">
          <img src="../../assets/images/carJudged/car-icon.png" alt=""><span style="margin-left: 10px">车流量统计</span>
        </li>

        <li class="carTimeSearch">
          <div
            style="float: left;height:16px;width: 2px;background-color: #3a8ee6;margin-right: 10px;margin-left: 10px"></div>
          过车时段查询
        </li>
        <li class="carTimeSearchInput">
          <div class="beginTime"><span style="color: #FA3535;font-size: 14px;margin-top: 4px">*&nbsp; </span> 开始时间</div>
          <input class="beginTimeInput" readonly id="beginTime"  v-model="beginTime" type="text" placeholder="请输入开始时间">
          <div class="beginTime"><span style="color: #FA3535;font-size: 14px;margin-top: 4px">*&nbsp; </span> 结束时间</div>
          <input class="beginTimeInput" readonly id="endTime"  v-model="endTime" type="text" placeholder="请输入结束时间">

          <!-- <div class="line"></div> -->
          <div class="queryBtn searchBtn" @click="searchList($event);getDataList();">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询
          </div>
        </li>

      </ul>
      <div class="content">
        <div class="contentTitle">
          <img src="../../assets/images/carJudged/count-icon.png" alt="">
          <span style="margin-left: 10px;font-weight: 600;font-size:14px;">车流量统计</span>
          <!-- <div class="back" @click="backUp" >返回上一页</div> -->
        </div>
        <div class="contentDetial">
          <div class="detialTitle">
            <div @click="changeItem($event);yesterDay()" class="detialTitleItem">24小时</div>
            <div @click="changeItem($event);lastWeek()" class="detialTitleItem">最近7天</div>
            <div @click="changeItem($event);lastMonth()" class="detialTitleItem">最近30天</div>
            <div @click="changeItem($event);lastThreeMonth()" class="detialTitleItem">最近90天</div>
            <div @click="changeItem($event);lastSixMonth()" class="detialTitleItem">最近半年</div>
          </div>
          <div class="detialTitleTxt">
            <div style="width: 2px;height: 16px;background-color: #3b9df4;margin-right: 10px"></div>
            <span >统计时间范围:</span>
            <span v-text="beginTime.split(' ')[0]"> </span > <span > --- </span>
            <span v-text="endTime.split(' ')[0]">&nbsp;2018-03-26</span>
          </div>
          <!-- 过车流量统计  -->
          <div class="dataCont">
            <div id="trafficChart" style="width: 100%;height: 100%;display: flex" v-show="dataListToggle"></div>
            <div ref="time" style="color: #999; font-size: 0.14rem; margin: 2%;"></div>
          </div>
        </div>

        <div class="footer">
          <img src="../../assets/logo.png" />
          武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import '../../common/laydate/laydate.js'
  import higgcharCommon from '../../api/casestudy/highcharCommon.js'
  export default {
    data() {
      return {
        beginTime: this.getDateString(new Date().getTime() - 6*24*60*60*1000).split(' ')[0],
        endTime: (this.getCurrentDate().split(' ')[0]),
        dataList: [],
        areaList: [],
        dataListToggle:true,
        loading: null
      }
    },
    mixins: [vehicle,higgcharCommon],
    mounted() {
      let _this = this;
      _this.getDataList();
      _this.trafficChartCount();
      let timeBegin = laydate.render({
        elem: '#beginTime',
        type: 'date',
        btns: ['now','confirm'],
        max:  this.endTime, //0天后
        //value:(this.getWeekDay().split(' ')[0] + " " + "23:59:59"),
        done: function (value, date) {
          _this.beginTime = value;
          timeEnd.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date
          };
        }
      });
      let timeEnd = laydate.render({
        elem: '#endTime',
        type: 'date',
        btns: ['now','confirm'],
        min: this.beginTime,
        max: this.endTime,
        done: function (value, date) {
          _this.endTime = value;
          timeBegin.config.max={
            year:date.year,
            month:date.month-1,//关键
            date: date.date
          }
        }
      });

//日期格式化
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1,                 //月份
          "d+": this.getDate(),                    //日
          "h+": this.getHours(),                   //小时
          "m+": this.getMinutes(),                 //分
          "s+": this.getSeconds(),                 //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }

    },
    methods: {
      getDataList() {
        this.areaList=[];
        this.dataList=[];
        this.loading = this.$loading({
          text: '正在查询...',
          spinner: 'el-icon-loading',
          target: "#imgBox"
        });
        this.$http({
          url: 'tvas/flow/query',
          method: 'post',
          params: {
            category: '0',
            beginDate: this.beginTime,
            endDate: this.endTime
          }
        }).then(res => {
          this.loading.close();
          this.dataList = res.data.data.rows;
          for (let i = 0; i < this.dataList.length; i++) {
            if(this.dataList[i].placeName == null || this.dataList[i].placeName == "" || this.dataList[i].vehicleCount == null || this.dataList[i].vehicleCount == ""){
            }else{
              this.areaList.push({
                name:this.dataList[i].placeName,
                value:this.dataList[i].vehicleCount
              })
              // this.areaList.push(this.dataList[i].placeName);
            }
          }
          if(this.areaList.length == 0){
            this.$refs.time.innerHTML = "暂无数据";
            this.$refs.time.style.display = "block";
            this.dataListToggle = false;
          }else{
            this.$refs.time.style.display = "none";
            this.dataListToggle = true;
            this.$nextTick(()=>{
              let bargraphId = document.getElementById('trafficChart')
              this.trafficChartCount(bargraphId);
            })
            this.trafficChartCount();
          }
            // if(this.dataList.length == 0){
            //   this.dataListToggle = false
            // }else{
            //   this.dataListToggle = true
            // }
        })

      },

      changeItem(event) {
        let Item = document.getElementsByClassName('detialTitleItem');
        for (let i = 0; i < Item.length; i++) {
          if (event.srcElement.isEqualNode(Item[i])) {
            Item[i].style.backgroundColor = 'RGB(34,72,111)';
            Item[i].style.color = '#2e93fb';
            Item[i].style.border = '1px solid RGB(78,117,162)';
            Item[i].style.borderBottom = '2px solid RGB(24,151,240)';
          } else {
            Item[i].style.backgroundColor = 'RGB(12,30,49)';
            Item[i].style.color = '';
            Item[i].style.borderTop = 'none';
            Item[i].style.border = '1px solid RGB(21,48,76)';
          }
        }
      },
      searchList(event) {
        let _this = this;
        _this.uploadloading = _this.$loading({
          text: '正在查询...',
          spinner: 'el-icon-loading',
          target: "#imgBox"
        });
        this.changeItem(event);
        _this.uploadloading.close();
      },

//过车流量统计图
      trafficChartCount(bargraphId) {
        console.log(this.areaList,'enenen');
        let gdata = [];
        for (let i = 0; i < this.areaList.length; i++) {
          let idata = [];
          idata[0] = this.areaList[i].name;
          idata[1] = parseInt(this.areaList[i].value); // 字符串转浮点数
          gdata.push(idata);
        }
        console.log(gdata,'enenen');
        this.getColumnar(bargraphId,gdata,true) //调用封装的柱状图
      },

//最近24小时
      yesterDay() {
        // let date = new Date().getTime() - 3600 * 1000 * 24;//开始时间
        // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
        // let reg = new RegExp('"',"g");
        this.beginTime= this.getDateString(new Date().getTime() - 1*24*60*60*1000).split(' ')[0];
        this.endTime=this.getDateString(new Date().getTime()).split(' ')[0];
        this.getDataList();
      },
//最近7天
      lastWeek() {
        // let date = new Date().getTime() - 3600 * 1000 * 24 * 7;
        // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
        // let reg = new RegExp('"',"g");
        // this.beginTime=newDate.replace(reg, "")
        // this.endTime=new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
        this.beginTime= this.getDateString(new Date().getTime() - 7*24*60*60*1000).split(' ')[0];
        this.endTime=this.getDateString(new Date().getTime()).split(' ')[0];
        this.getDataList();
      },
//最近30天
      lastMonth() {
        // let date = new Date().getTime() - 3600 * 1000 * 24 * 30;
        // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
        // let reg = new RegExp('"',"g");
        // this.beginTime=newDate.replace(reg, "")
        // this.endTime=new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
        this.beginTime= this.getDateString(new Date().getTime() - 30*24*60*60*1000).split(' ')[0];
        this.endTime=this.getDateString(new Date().getTime()).split(' ')[0];
        this.getDataList();
      },

//最近90天
      lastThreeMonth() {
        // let date = new Date().getTime() -3600 * 1000 * 24 * 90
        // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
        // let reg = new RegExp('"',"g");
        // this.beginTime=newDate.replace(reg, "")
        // this.endTime=new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
        this.beginTime= this.getDateString(new Date().getTime() - 90*24*60*60*1000).split(' ')[0];
        this.endTime=this.getDateString(new Date().getTime()).split(' ')[0];
        this.getDataList();
      },
//最近半年
      lastSixMonth() {
        // let date = new Date().getTime() - 3600 * 1000 * 24 * 180
        // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
        // let reg = new RegExp('"',"g");
        // this.beginTime=newDate.replace(reg, "")
        // this.endTime=new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
        this.beginTime= this.getDateString(new Date().getTime() - 180*24*60*60*1000).split(' ')[0];
        this.endTime=this.getDateString(new Date().getTime()).split(' ')[0];
        this.getDataList();
      },
 //返回
     backUp(){
        this.$router.push("/carJudged?menuCode=300")

     }

    }
  }


</script>


<style scoped>
@import url('../../assets/css/commom.css');

  ::-webkit-scrollbar {
    display: none;
  }
  .wrapper {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    top:0.6rem;
    height: calc(100% - 0.6rem);
    user-select: none;
    /* background-color: #F3F3F3; */
    overflow: hidden;
  }
  .cont{
    width: 100%;
    min-width: 1200px;
    height: calc(100% - 0.6rem - 5px);
    padding: 0.15rem 0.2rem 0rem;
  }

  .searchCondition {
    width: 16%;
    min-width: 3.2rem;
    height: calc(100% - 0.1rem);
    float: left;
    overflow:hidden;
    border: 1px solid rgba(15, 44, 79, 0.5);
    background-color: rgba(16, 35, 56, 0.5);
    margin-top: 5px;
  }

  .searchCondition .searchTitle {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    background: rgba(20,57,96,0.33);
    color: #2e93fb;
  }

  .searchCondition li {
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    font-size: 12px;
    color: #99c9fa;
  }

  .itemIcon img {
    width: 100%;
    height: 100%;
  }
  .content {
    height: calc(100% - 0.1rem);
    min-width: 800px;
    position: relative;
    display: flex;
    float: left;
    width: calc(100% - 3.2rem);
    margin-top: 5px;
    flex-direction: column;
  }
  .nav-item-search {
    height: 100%;
    width: 162px;
    background: url(../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
  }
  .carTimeSearch {
    width: 100%;
    padding-left: 10px;
    height: 50px;
    margin-top: 3px;
    /* background-color: #ffffff; */
    font-size: 14px;
    font-weight: 600;
    color: #8B8B8B;
    display: flex;
    align-items: center;
  }
  .carTimeSearchInput {
    width: 100%;
    height: calc(100% - 75px);
    /* background-color: #ffffff; */
  }
  .beginTime {
    width: 0.8rem;
    height: 0.28rem;
    border-radius: 3px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    float: left;
    color: #99c9fa;
  }
  .beginTimeInput {
    height: 0.28rem;
    width: 200px;
    margin-left: -3px;
    margin-bottom: 0.17rem;
    border: 1px solid #E6E8ED;
    padding-left: 0.05rem;
    color: #606266;
  }
  /* .line {
    width: 98.2%;
    height: 1px;
    background-color: 1px solid rgba(15, 64, 152, 0.8);
  } */
  .queryBtn {
    width: 98.2%;
    height: 0.28rem;
    margin-top: 0.17rem;
    border-radius: 2px;
    color: white;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    cursor: pointer;
  }
  .contentTitle {
    height: 0.57rem;
    line-height: 0.57rem;
    margin-left: 20px;
    background: rgba(20,57,96,0.33);
    width: calc(100% - 20px);
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: #2e93fb;
  }
  .contentDetial {
    width: calc(100% - 20px);
    height: calc(100% - 53px);
    margin-top: 3px;
    border: 1px solid rgba(15, 44, 79, 0.5);
    background-color: rgba(16, 35, 56, 0.5);
    margin-left: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .back {
    position: absolute;
    right: 35px;
    width: 80px;
    height: 22px;
    background-color: #3b9df4;
    font-size: 10px;
    text-align: center;
    line-height: 22px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  .detialTitle {
    height: 0.5rem;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .detialTitleItem {
    width: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: RGB(12,30,49);
    border: 1px solid RGB(21,48,76);
    margin-right: 0.1rem;
    font-size: 0.12rem;
    color: #99c9fa;
    cursor: pointer;
  }
  .detialTitleTxt {
    font-size: 0.12rem;
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    padding-left: 0.2rem;
    position: relative;
    color: #99c9fa;
  }
  .dataCont{
    display: flex;
    height: 6rem;
    background:url('../../assets/images/count/echarBig.png') center no-repeat;
    background-size: 100% 100%;
  }
  .footer{
    width:calc(100% - 0.2rem);
    height:0.6rem;
    margin-left: 20px;
    font-size:0.14rem;
    line-height: 0.6rem;
    background-color: rgba(16, 35, 56, 0.5);
    color:rgba(153, 201, 250, 0.4);;
    text-align: center;
  }
  .footer img{margin-right: 0.05rem;}


</style>
