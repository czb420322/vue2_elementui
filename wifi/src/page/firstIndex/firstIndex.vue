<template>
  <div class="mainBody">
    <!--<Searchall />-->
    <!--<Uploadpicture v-show="status"/>-->
    <div class="contentwrap">
      <div class="contentleft">
        <div class="custom">
          <div class="mytable">
            <span>| 我的工作台</span>
            <span @click="add">自定义</span>
          </div>
          <div class="table_info">
            <div class="table_info_">
              <!-- <router-link v-show="true" tag="div" :to="{path:cssobj['301'][1],query:{menuCode:'301'}}" :class="cssobj['301'][0]"></router-link> -->
              <div class="cc_" v-for="(item, index) in anotherImgList" :key="index">
                <router-link tag="div" :to="{path:cssobj[item][1],query:{menuCode:item}}" :class="cssobj[item][0]">
                <img :src="bigSrc['mm_'+item]" :alt="'mm_'+item">
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="statistic_info_list">
          <div class="statistic_info_item">
            <div class="statistic_info_title">| 近一个月过车流量统计</div>
            <p v-show="trafficChart">服务异常</p>
            <div class="statistic_info_content" id="trafficChart"></div>
          </div>
          <div class="statistic_info_item m_sii">
            <div class="statistic_info_title">| 近一个月车辆类别百分比</div>
            <p v-show="carTypeChartLeft">服务异常</p>
            <div class="statistic_info_content" id="carTypeChartLeft"></div>
          </div>
          <div class="statistic_info_item">
            <div class="statistic_info_title">| 近一个月车牌类别统计</div>
            <p v-show="carPlateChart">服务异常</p>
            <div class="statistic_info_content" id="carPlateChart"></div>
          </div>
        </div>
      </div>
      <div class="contentright">
        <div class="current_user">| 当前用户</div>
        <div class="my_info">
          <div class="my_info_title">我的信息</div>
          <div class="my_info_cont">
            <div class="my_info_cont_l">
              <div class="user_info">
                <span class="user_des">用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                <span class="user_name">{{this.userinfo.trueName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                <span class="user_name">{{this.userinfo.userName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">所&nbsp;&nbsp;属&nbsp;&nbsp;部&nbsp;&nbsp;门&nbsp;:</span>
                <span class="user_name">{{userinfo.orgName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">登&nbsp;&nbsp;录&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;:</span>
                <span class="user_name">{{this.userinfo.lastLoginTime}}</span>
              </div>
            </div>
            <div class="my_info_cont_r">
              <img src="../../assets/rl.png"  onerror="../../assets/rl.png" />
            </div>
          </div>
        </div>
        <div class="glaj">
          <div class="task_title">
            <span class="task_des">我的布控</span>
            <span class="more" @click="gotoMyDeploy">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="aj_info">
            <div class="aj_title">
              <span>序号</span>
              <span>车牌号</span>
              <span>布控原因</span>
            </div>
            <p v-show="control">服务异常</p>
            <div class="aj_cont" v-for="(item,index) in secondTableList" :key="index" v-if="index < 5">
              <span>{{index+1}}</span>
              <span>{{item.plateNo}}</span>
              <span>{{item.reason}}</span>
            </div>
          </div>
        </div>
        <div class="my_task">
          <div class="task_title">
            <span class="task_des">历史布控预警</span>
            <span class="more" @click="goToHistory">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <p v-show="historia">服务异常</p>
          <div class="task_cont">
            <p v-for="(item,index) in historyList" :key="index" v-if="index < 4">{{index+1}},车牌号：{{item.plateNo}}</p>
          </div>
        </div>
        <div class="my_task my_msg">
          <div class="task_title">
            <span class="task_des">实时预警刷新</span>
            <span class="more" @click="goToCurrentDeploy">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="task_cont">
            <p>{{deployList.bukongId}}</p>
          </div>
        </div>

      </div>
    </div>
    <Footer />
    <!-- 弹出框 -->
    <div class="pop_up" v-show="pop">
      <div class="cont">
        <div class="title">
          <p>自定义添加内容</p>
          <span @click="hidden()"><img src="../../assets/close_imgsearch.png" /></span>
        </div>
        <div class="content">
          <div class="left">
            <div class="l_title">
              <h2>我的工作台</h2>
            </div>
            <div class="l_cont" >
              <ul>
                  <li :class="{lactive:iconRedact}" v-for="(item,index) in leftImgList" :key="index"  @click="ltoggle(item,index)">
                    <img :src="src['m_'+item]" alt="">
                  </li>
                  <li>
                    <img class="img" src="../../assets/images/module/redact.png" alt="">
                  </li>
                </ul>
            </div>
            <div class="l_btn">
              <span @click="redact">编辑</span>
            </div>
          </div>
          <div class="right">
            <div class="r_title">
              <h2>全部功能</h2>
            </div>
            <div class="r_cont">
              <div class="combat" v-for="(item,index) in currentImgList" :key="index" v-if='item.mlist.length!=0'>
                <p>{{item.name}}</p>
                <div class="combat_cont">
                  <ul>
                      <li :class="{ractive:iconRedact}" v-for="(menu, mindex) in item.mlist" :key="mindex" v-show="menu.rightToggle"  @click="rtoggle(menu.menuCode)">
                        <img :src="src['m_'+menu.menuCode]" alt="">
                      </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn">
          <span @click="append">确认</span>
          <span @click="hidden">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Uploadpicture from '../../components/upload_picture'
  import Searchall from '../../components/search_all'
  import Footer from '../../components/footer'
  import { mapState } from 'vuex';
  import { cssobj } from '../../common/js/workTableRouter.js'
  import echarts from 'echarts'

  export default {
    data(){
      return {
        name:this.$storage.getSession("name")?this.$storage.getSession("name"):"",
        cssobj: cssobj,

        //自定义菜单
        pop:false,
        imgList:[],
        leftImgList:[],
        defaultImgList: ['101','102','103','105','106','107'],
        anotherImgList:[],
        src:{},
        bigSrc:{},
        getImgUrl: 'sys/menu/getUserMenus',    //存数据接口
        leftUrl: 'sys/usercore/workBench/getMyWork',
        okUrl: 'sys/usercore/workBench/save',
        iconRedact: false,

        //过车流量统计
        areaList:[],
        countList:[],
        dataList:[],

        //车辆类别百分比
        dataList1: [],
        vehicleClassList: [],
        vehicleKeyValueList: [],

        //车牌类别统计
        dataList3: [],
        vehiclePlateClassList: [],
        vehiclePlateClassCountList: [],

        //历史布控预警
        historyList:[],
        historia:false,

        //我的布控
        secondTableList: [],
        control:false,

        //实时布控预警
        deployObj:{},
        deployList:[],

        worklist:[],
        userinfo:{
          approvalStatus: 1,
          approvalerId: "3ec55f91741c4e49955aef9f45331067",
          approvalerTime: "2018-06-08 17:11:50",
          creatorTime: "2018-06-02 09:32:22",
          idCard: "154542457845658755",
          lastLoginTime: "2018-06-13 15:13:56",
          orgCode: "440115320000",
          orgId: "085db86cb30f4074a7d743a3e15e2899",
          orgName: "广州市公安局南沙区分局网络警察大队",
          password: "97632b109c8d15b35eba68876504c4aa",
          phone: "16548795846",
          photoUrl: "",
          status: 0,
          trueName: "真名",
          updateId: "3ec55f91741c4e49955aef9f45331067",
          updateTime: "2018-06-08 17:11:50",
          userId: "3ec55f91741c4e49955aef9f45331067",
          userName: "chenchen",
          userSource: 1
        },
        trafficChart:false,
        carTypeChartLeft:false,
        carPlateChart:false
      }
    },
    computed: {
      ...mapState([
        'status'
      ]),
      currentImgList: function () {
        let arr = [];
        for(let i=0;i<this.imgList.length;i++){
          let temp = {
            mcs: this.imgList[i].mcs,
            mlist: [],
            name: this.imgList[i].name
          };
          for(let j=0;j<this.imgList[i].mlist.length;j++){
            if(this.leftImgList.length > 0){
              for(let k=0;k<this.leftImgList.length;k++){
                if(temp.mcs[j] == this.leftImgList[k]){
                  temp.mlist[j] = {
                    menuCode: this.imgList[i].mlist[j].menuCode,
                    menuName: this.imgList[i].mlist[j].menuName,
                    rightToggle: false
                  };
                  break;
                }else{
                  temp.mlist[j] = {
                    menuCode: this.imgList[i].mlist[j].menuCode,
                    menuName: this.imgList[i].mlist[j].menuName,
                    rightToggle: true
                  };
                }
              }
            }else{
              temp.mlist[j] = {
                menuCode: this.imgList[i].mlist[j].menuCode,
                menuName: this.imgList[i].mlist[j].menuName,
                rightToggle: true
              };
            }

          }
          arr.push(temp);
        }

        return arr;
      },
      //预警信息
      deployWarnMessage: function () {
        return this.$parent.warnMessage
      }
    },
    watch: {
      deployWarnMessage: {
        handler(newValue, oldValue) {
          this.deployObj = newValue;//新点位对象赋值给卡口对象
          this.getDeploy();
        },
        deep: true,
      }
    },
    created () {
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
    mounted(){

      this.getImgList();
      this.getLeftImgList();

      this.getUserinfo();

      this.getDataList();
      //this.trafficChartCount();

      this.getVehicleClassList();
      //this.typeChartPercent();

      this.getVehiclePlateClassList();
      //this.carPlateCount();

      this.getHistoryList();
    },
    components:{
      Searchall,Uploadpicture,Footer
    },
    methods:{
      //获取用户信息
      getUserinfo (){
        this.userinfo = this.$storage.getSession("userInfo");
        // console.log(this.userinfo);
      },

      //自定义工作台
      getImgList(imgList){
        this.$http({           //调用接口
          method:'POST',
          url:this.getImgUrl  //this指data
        }).then(response => {  //接口返回数据

          if(response.data.code == 200){
            this.imgList=response.data.data;
            for(let i=0;i<this.imgList.length;i++){
              this.requreImg(this.imgList[i].mcs);
              // console.log(this.imgList[i].mcs,11)
            }
          }else{
            // this.$alert("服务异常","消息提示");
          }
        });
      },
      getLeftImgList(leftImgList){
        // 左边
        this.$http({           //调用接口
          method:'POST',
          url:this.leftUrl  //this指data
        }).then(response => {  //接口返回数据
          // alert(1)
          if(response.data.code == 200){
            let dd = response.data.data;//['101','102']
            if( dd.length == 0){
              this.anotherImgList = [];
              this.defaultImgList.forEach(element => {
                this.leftImgList.push(element);
                this.anotherImgList.push(element);
              });
            }else{
              this.anotherImgList = [];
              for(let i=0;i<dd.length;i++){
                this.leftImgList.push(dd[i].menuCode);
                this.anotherImgList.push(dd[i].menuCode);
              }
            }
          }else{
            // this.$alert("服务异常","消息提示");
          }
        });
      },
      requreImg(arr){
        console.log(arr,2);
        arr.forEach(element => {
            this.src["m_"+element] = require('../../assets/images/module/m_'+element+'.png');
            this.bigSrc["mm_"+element] = require('../../assets/images/index/mm_'+element+'.png');
        })
      },
      // 添加图标弹出框
      add:function(){
        // alert(1)
        this.pop = true;
        this.iconRedact = false;
      },
      // 关闭弹出框
      hidden:function(){
        this.pop = false;
      },
      // 添加/删除选项
      ltoggle:function(item,index){
        if(this.iconRedact == true){
        if(this.leftImgList.length > 1){
          this.leftImgList.splice(index,1);
        }else{
          this.$alert("最少不能小于1个菜单","消息提示");
        }
        }
      },
      rtoggle:function(menuCode){
        if(this.iconRedact == true){
        if(this.leftImgList.length < 10){
          this.leftImgList.push(menuCode);
        }else{
          this.$alert("最多不能超过10个菜单","消息提示");
          this.iconRedact = false;
        }
        }
      },
      append:function(){
        let param = {menusIds:this.leftImgList.join(',')};
        let data = this.$qs.stringify(param);
        this.$http({           //调用接口
          method:'POST',
          url:this.okUrl,
          data:data
        }).then(response => {  //接口返回数据
          // alert(1)
          if(response.data.code == 200){
            // alert(response.data)
            // this.leftImgList = response.data;
            // this.anotherImgList = this.leftImgList;
            // if(this.anotherImgList){}
            this.anotherImgList = [];
            this.leftImgList.forEach(element => {
              this.anotherImgList.push(element);
            })
          }else{
            // this.$alert("服务异常","消息提示");
          }
        });
        this.pop = false;
      },
      redact:function(){
        this.iconRedact = true;
      },

      //过车流量数据
      getDataList() {
        this.areaList=[];
        this.countList=[];
        this.dataList=[];
        let beginDate = new Date((new Date()).getTime() - 30*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
        let endDate = new Date((new Date()).getTime()).Format('yyyy-MM-dd hh:mm:ss');
        this.$http({
          url: 'vehicle/flow/query',
          method: 'post',
          params: {
            category: '0',
            beginDate: beginDate.split(" ")[0],
            endDate: endDate.split(" ")[0]
          }
        }).then(res => {
          if(res.data.code != 200){
            // this.$alert("服务异常","消息提示");
            this.trafficChart = true;
            return;
          }else{
            this.dataList = res.data.data.rows;
            for (let i = 0; i < this.dataList.length; i++) {
              this.areaList.push(this.dataList[i].placeName);
              this.countList.push(this.dataList[i].vehicleCount)
            }
            this.trafficChartCount();
          }

        })

      },
      //过车流量统计图
      trafficChartCount() {
        let myChart = this.$echarts.init(document.getElementById('trafficChart'));
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none',
            },
            showContent: true
          },
          toolbox: {
            show: true,
            right:"10%",
            feature: {
              mark: {show: true}
              // restore: {show: true},
              //saveAsImage: {show: true},
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: this.areaList
            }
          ],
          yAxis: [
            {
              type: 'value'
              //axisLabel:{formatter:'{value} 辆'}
            }
          ],
          grid: {
            bottom: '5%',
            left: '5%',
            containLabel: true
          },
          series: [
            {
              name: '过车流量',
              type: 'bar',
              barWidth: 30,
              itemStyle: {
                normal: {
                  color: "#ff6863"
                },
                emphasis: {
                  color: "#ff6863"
                }
              },
              textStyle:{
                fontSize:12
              },
              data: this.countList
            },
          ]
        };
        myChart.setOption(option);
        //图表自适应
        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart.resize();
          }, 500)
        });

      },

      //获取车辆类别数据
      getVehicleClassList() {
        this.dataList1= [];
        this.vehicleClassList = [];
        this.vehicleKeyValueList = [];
        let beginDate = new Date((new Date()).getTime() - 30*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
        let endDate = new Date((new Date()).getTime()).Format('yyyy-MM-dd hh:mm:ss');
        this.$http({
          url: 'vehicle/attribute/kind/statistics',
          method: 'post',
          params: {
            category: '0',
            beginDate: beginDate.split(' ')[0],
            endDate: endDate.split(' ')[0]
          }
        }).then(res => {
          if(res.statusText=="OK" && res.data.code==200){
            this.dataList1 = res.data.data.rows;
            let flag = true;
            this.vehicleKeyValueList = this.dataList1.map(a => {
              if(!a.vehicleKind){
                flag = false;
              }
              return {value: a.vehicleCount, name: a.vehicleKind}
            });
            if(!flag){
              this.vehicleKeyValueList = [];
              this.vehicleClassList = [];
              this.carTypeChartLeft = true;
              return false;
            }
            //给vehicleKeyValueList排序
            this.vehicleKeyValueList.sort(function(a,b){
              if(a.value > b.value){
                return -1;
              }else{
                return 1;
              }
            });

            for (let i = 0; i < this.vehicleKeyValueList.length; i++) {
              this.vehicleClassList.push(this.vehicleKeyValueList[i].name);
            }

            this.typeChartPercent();
          }else{
            this.carTypeChartLeft = true;
          }
        })
      },
      //车辆类别百分比统计图
      typeChartPercent() {
        let longList = {
          keyValueList: this.vehicleKeyValueList,
          classList: this.vehicleClassList
        };
        //从第6个开始合并成一个“其他”类
        let shortList = {
          keyValueList: this.vehicleKeyValueList.slice(0,5),
          classList: this.vehicleClassList.slice(0,5)
        };
        shortList.keyValueList[shortList.keyValueList.length] = {
          value: 0,
          name: "其他"
        };
        shortList.classList[shortList.classList.length] = "其他";
        let otherValue = 0;
        for(let i=0;i<this.vehicleKeyValueList.length;i++){
          if(i>4){
            otherValue += this.vehicleKeyValueList[i].value;
          }
        }
        shortList.keyValueList[5].value = otherValue;

        let currentList = shortList;

        let myChart = this.$echarts.init(document.getElementById('carTypeChartLeft'));
        myChart.setOption(
          {
            title: {},
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)",
              position: function (p) {
                return [p[0] + 30, p[1] - 30];
              },
            },
            toolbox: {
              show: true,
              right:"10%",
              feature: {
                // mark: {show: true},
                // restore: {show: true},
                // saveAsImage: {show: true},
              }
            },
            legend: {
              type: 'plain',
              itemGap: 2,
              itemWidth: 20,
              height: "90%",
              orient: 'vertical',
              y: "center",
              x: "75%",
              data: currentList.classList
            },
            series: [
              {
                name: '车辆类别百分比统计',
                type: 'pie',
                clockwise: true,
                startAngle: -120,
                radius: '50%',
                center: ['40%', '45%'],
                seriesLayoutBy: 'row',
                avoidLabelOverlap: true,
                label: {
                  show: true,
                  position:'outer'
                },
                labelLine: {
                  show: true,
                  length: 5
                },
                data: currentList.keyValueList
              }
            ]
          }
        );
        myChart.on("click",function(params){
          if(params.dataIndex >= 5){
            if(currentList.keyValueList.length == 6){
              currentList = longList;
            }else{
              currentList = shortList;
            }
            myChart.setOption(
              {
                title: {},
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)",
                  position: function (p) {
                    return [p[0] + 30, p[1] - 30];
                  },
                },
                toolbox: {
                  show: true,
                  right:"10%",
                  feature: {
                    mark: {show: true}
                    // restore: {show: true},
                    //saveAsImage: {show: true},
                  }
                },
                legend: {
                  type: 'plain',
                  itemGap: 2,
                  itemWidth: 20,
                  height: "90%",
                  orient: 'vertical',
                  y: "center",
                  x: "75%",
                  data: currentList.classList
                },
                series: [
                  {
                    name: '车辆类别百分比统计',
                    type: 'pie',
                    clockwise: true,
                    startAngle: -120,
                    radius: '55%',
                    center: ['40%', '45%'],
                    seriesLayoutBy: 'row',
                    avoidLabelOverlap: true,
                    data: currentList.keyValueList
                  }
                ]
              }
            );
          }
        });

        //图表自适应
        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart.resize();
          }, 500)
        });
      },

      //获取车牌类型数据
      getVehiclePlateClassList() {
        this.dataList3= [];
        this.vehiclePlateClassList = [];
        this.vehiclePlateClassCountList = [];
        let beginDate = new Date((new Date()).getTime() - 30*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
        let endDate = new Date((new Date()).getTime()).Format('yyyy-MM-dd hh:mm:ss');
        this.$http({
          url: 'vehicle/attribute/plateclass/statistics',
          method: 'post',
          params: {
            category: '0',
            beginDate: beginDate.split(' ')[0],
            endDate: endDate.split(' ')[0]
          }
        }).then(res => {
          if(res.statusText=="OK" && res.data.code==200){
            this.dataList3 = res.data.data.rows;
            for (let i = 0; i < this.dataList3.length; i++) {
              this.vehiclePlateClassList.push(this.dataList3[i].plateClass)
              this.vehiclePlateClassCountList.push(this.dataList3[i].vehicleCount)
            }
            this.carPlateCount();
          }else{
            this.carPlateChart = true;
            // this.$alert("服务异常","消息提示");
          }
        })
      },
      //车牌类型统计
      carPlateCount() {
        let myChart = this.$echarts.init(document.getElementById('carPlateChart'));
        var dataAxis = this.vehiclePlateClassList;
        var data = this.vehiclePlateClassCountList
        var yMax = Math.ceil(Math.max.apply(null, data) / 10000) * 10000;
        var dataShadow = [];
        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none',
            },
            showContent: true
          },
          toolbox: {
            right:"10%",
            show: true,
            feature: {
              mark: {show: true}
              // restore: {show: true},
              //saveAsImage: {show: true}
            }
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              rotate: 270,
              //interval: 0,
              inside: true,
              textStyle: {
                color: '#606266',
                fontSize: '12px'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom : {
            show : true,
            start : 0,
            end : 20,
            bottom: "10%"
          },
          grid: {
            bottom: '20%',
            left: '5%',
            containLabel: true
          },
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: "#dbe7ee"
                },
                emphasis: {
                  color: "#dbe7ee"
                }
              },
              data: data
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart.resize();
          }, 100)
        });
        var zoomSize = 6;
        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
        });
      },

      getHistoryList() {
        this.$http({
          url: 'vehicle/notification/list',
          method: 'post',
          params: {
            pageNum: 1,
            pageSize: 10,
            orderType:'desc'
          }
        }).then(res => {
          if(res.data.code != 200){
            // this.$alert("服务异常","消息提示");
            this.historia = true;
            return;
          }else{
            this.historyList = res.data.data.list;
          }
        })
      },
      goToHistory(){
        this.$router.push({path:'/carJudged/currentDeploy/historyWarn',query:{menuCode:300}});
      },

      //我的布控
      getOwnDeployList() {
        this.$http({
          url: 'vehicle/disposition/myDisposition',
          method: 'post',
          params: {
            pageNum: this.SpageNo,
            pageSize: this.SpageSize,
            orderType: 'desc',
            orderBy: 'createTime'
          }
        }).then((res) => {
          if(res.data.code != 200){
            // this.$alert("服务异常","消息提示");
            this.control = true;
            return;
          }else{
            this.secondTableList = res.data.data.list;
          }

        })
      },
      gotoMyDeploy(){
        this.$router.push({path:'/carJudged/deployManage',query:{menuCode:318,tab:"tab2"}});
      },

      //实时预警刷新
      getDeploy(){
        this.$http({
            url: 'vehicle/disposition/info/' + this.deployObj.bukongId,
            method: 'post'
          }
        ).then(res => {
          if (res.data.data.dispositionTollgates.length !== 0) {
            this.deployList = res.data.data.disposition
          }
        })
      },
      goToCurrentDeploy(){
        this.$router.push({path:'/carJudged/currentDeploy',query:{menuCode:319}});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.mainBody{
  display: flex;
  flex-direction: column;
  margin-top:0.6rem;
  height: calc(100vh - 0.6rem);
}
  .contentwrap{
    display: flex;
    width: 100%;
    flex:1;
    background:#f4f4f4;
    padding-top:0.1rem;
    overflow: hidden;
    .contentleft{
      display: flex;
      width: 78%;
      margin: 0 1%;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .custom{
        display: flex;
        width: 100%;
        height:3.5rem;
        flex-direction: column;
        background:#fff;
        border: 1px solid #dcdfe6;
        box-shadow:0 1px 1px #d8d8d8;
        .mytable{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 0.36rem;
          padding-left: 0.2rem;
          color: white;
          line-height:0.36rem;
          font-size: 0.18rem;
          background:#409eff;
          span{
            margin-right: 0.1rem;
          }
          & span:last-child{
            cursor: pointer;
            font-size:0.14rem;
          }
        }
        .table_info{
          display: flex;
          flex:1;
          /*align-items: center;*/
          .table_info_{
            display: flex;
            flex-wrap:wrap;
            flex:1;
            padding:0.18rem 0;
            /*justify-content: space-around;*/
            .cc_{
              // display: flex;
              // flex-direction: column;
              // justify-content: center;
              // align-items: center;
              width: 18%;
              margin: 0 1%;
              cursor: pointer;
              img{
                width:100%;
                height:100%;
              }
            }
          }
        }
      }
      .statistic_info_list{
        display: flex;
        flex: 1;
        /*height: 450px;*/
        width: 100%;
        justify-content: space-between;
        margin-top:0.2rem;
        // margin-bottom: 10px;
        .statistic_info_item{
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 100%;
          background:#fff;
          border: 1px solid #dcdfe6;
          box-shadow:0 1px 1px #d8d8d8;
          .statistic_info_title{
            display: flex;
            align-items: center;
            height: 0.36rem;
            width: 100%;
            padding-left: 0.2rem;
            line-height:0.36rem;
            font-size:0.18rem;
            color: white;
            /*background: url('../assets/mytable.png') no-repeat;*/
            /*background-size: cover;*/
            background:#409eff;
          }
          .statistic_info_content{
            display: flex;
            flex: 1;
            // background: yellow;
          }
        }
        .m_sii{
          margin: 0 0.2rem;
        }
      }
    }
    .contentright{
      display: flex;
      flex-direction: column;
      width:19%;
      margin-right:1%;
      background:#fff;
      border: 1px solid #dcdfe6;
      box-shadow:0 1px 1px #d8d8d8;
      .current_user{
        display: flex;
        height: 0.36rem;
        color: white;
        padding-left: 0.2rem;
        align-items: center;
        /*background: url('../assets/mytable.png') no-repeat;*/
        /*background-size: cover;*/
        font-size: 0.18rem;
        line-height:0.36rem;
        background: #409eff;
      }
      .my_info{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #f6f7fb;
        margin-bottom: 0.1rem;
        .my_info_title{
          display: flex;
          align-items: center;
          height: 0.35rem;
          padding:0 0.1rem;
          font-size: 0.16rem;
          line-height:0.35rem;
          color: #ff8c00;
        }
        .my_info_cont{
          display: flex;
          height: 1.6rem;
          padding-left: 0.2rem;
          margin-bottom: 0.1rem;
          align-items: center;
          justify-content:space-around;
          .my_info_cont_l{
            display: flex;
            width: 68%;
            flex-direction: column;
            justify-content: space-around;
            height: 1.18rem;
            .user_info{
              font-size: 0.14rem;
              line-height:1.5;
              color:#606266;
            }
          }
          .my_info_cont_r{
            flex: 1;
            margin: 0.1rem;
            img{
              width: 100%;
              min-width: 0.7rem;
              border:1px solid #b1cde1;
            }
          }
        }
      }
      .glaj{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #f6f7fb;
        margin-bottom: 0.1rem;
        .task_title{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 0.35rem;
          padding:0 0.1rem;
          font-size: 0.16rem;
          line-height:0.35rem;
          color: #ff8c00;
          // background: url('../assets/mytable.png') no-repeat;
          // background-size: cover;
          .more{
            font-size:0.12rem;
            cursor: pointer;
          }
        }
        .aj_info{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
          font-size: 0.14rem;
          line-height:2.2;
          color: #606266;
          margin-bottom:0.15rem;
          padding:0 0.1rem;
          p{
            margin-left: 3%;
          }
          .aj_title{
            display: flex;
            justify-content: center;
            span{
              display: flex;
              justify-content: center;
            }
            span:first-child{
              flex: 1;
            }
            span:nth-child(2){
              flex: 3;
            }
            span:last-child{
              flex: 2;
            }
          }
          .aj_cont{
            display: flex;
            justify-content: center;
            span{
              display: flex;
              justify-content: center;
            }
            span:first-child{
              flex: 1;
            }
            span:nth-child(2){
              flex: 3;

            }
            span:last-child{
              flex: 2;
            }
          }
        }
      }
      .my_task{
        display: flex;
        flex-direction: column;
        margin-top: 1px;
        border-bottom: 1px solid #f6f7fb;
        margin-bottom: 0.1rem;
        p{
          margin-left: 3%;
        }
        .task_title{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 0.35rem;
          padding:0 0.1rem;
          font-size: 0.16rem;
          line-height:0.35rem;
          color: #ff8c00;
          // background: url('../assets/mytable.png') no-repeat;
          // background-size: cover;
          .more{
            font-size:0.12rem;
            cursor: pointer;
          }
        }
        .task_cont{
          padding: 0 0.2rem;
          margin-bottom:0.15rem;
          p{
            font-size: 0.14rem;
            line-height:2.2;
            color: #606266;
          }
        }
      }
      .my_msg {
        border:none;
      }
    }
  }

  .menuList{
    .checkedList{
      border-bottom:1px solid red;
    }
    .checkedList, .allList{
      display: flex;
      flex-wrap: wrap;
      .menuItem{
        width: 1.78rem;
        height:0.8rem;
        margin: 0.1rem;
        cursor: pointer;
        background-color: #f0f5f9;
        background-size : 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }

// 弹出框
.pop_up{
  // display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // margin-top: 1.5rem;
  // margin-left: 2.5rem;
  background: rgba(122, 117, 117, 0.8);
  z-index: 9;
  .cont{
    width: 12.8rem;
    height: 7.3rem;
    background: #fff;
    border-radius: 0.1rem;
    // padding: 0.2rem;
    margin: 5% auto;
  }
  .title{
    width: 100%;
    line-height: 0.6rem;
    font-size: 0.2rem;
    border-bottom: 1px solid #ccc;
    padding: 0 2%;
    p{
      float: left;
    }
    span{
      float: right;
      margin-right: 1%;
      color: #64affa;
      cursor: pointer;
      img{
        width: 0.14rem;
      }
    }
  }
  .title::after{
    display: block;
    content: "";
    clear: both;
  }
  .content{
    width: 100%;
    height: 5.85rem;
    display: flex;
    h2{
      width: 1.5rem;
      height: 0.2rem;
      line-height: 0.2rem;
      // background: #409eff;
      // line-height: 0.4rem;
      margin-top: 0.1rem;
      font-size: 0.16rem;
      margin-left: 0.3rem;
      padding-left: 0.1rem;
      border-left: 0.03rem solid #58a9ff;
    }
    .left{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 25%;
      height: 5.85rem;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      .l_title{
        width: 100%;
        height: 0.4rem;
        background: #ebf1f5;
        border-bottom: 1px solid #ccc;
      }
      .l_cont{
        width: 100%;
        height: 5rem;
        overflow: hidden;
        // display: flex;
        // justify-content: center;
        // align-items:center;
        // flex-wrap: wrap;
        // margin-top: 2%;
        padding: 6%;
        ul{
          width: 100%;
          height: 4.3rem;
          padding: 2%;
          overflow: hidden;
          li{
              display: inline-block;
              width: 1.15rem;
              height: 0.78rem;
              margin-bottom: 3%;
              cursor: pointer;
              margin-left: 5%;
              position: relative;
              img{
                width: 100%;
                height: 100%;
              }
          }
          .lactive::after{
              content: " ";
              position: absolute;
              top: -0.05rem;
              right: -0.05rem;
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              background: url(../../assets/sm_minus.png) no-repeat center center;
          }
        }
      }
      .l_btn{
        width: 100%;
        height: 0.45rem;
        background: #ecf2f5;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        span{
          display: block;
          width: 0.8rem;
          line-height: 0.25rem;
          background: #67c23a;
          margin: 0.08rem auto;
          text-align: center;
          border-radius: 0.02rem;
          border: 1px solid #55b227;
          cursor: pointer;
        }
      }
    }
    .right{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 75%;
      height: 5.85rem;
      box-sizing: border-box;
      .r_title{
        width: 100%;
        height: 0.4rem;
        background: #ebf1f5;
        border-bottom: 1px solid #ccc;
      }
      .r_cont{
        width: 100%;
        height: 5.45rem;
        overflow-y: auto;
        // background: #ccc;
        border-bottom: 1px solid #ccc;
        p{
          width: 100%;
          line-height: 0.4rem;
          font-size: 0.14rem;
          color: #409eff;
          padding-left: 0.3rem;
        }
        .combat{
          width: 100%;
          margin-bottom: 2%;
          .combat_cont{
            width: 100%;
            padding-left: 0.3rem;
            cursor: pointer;
            ul{
                li{
                  display: inline-block;
                  width: 1.15rem;
                  height: 0.78rem;
                  cursor: pointer;
                  margin-right: 2%;
                  position: relative;
                  img{
                    width: 100%;
                    height: 100%;
                    }
                }
              }
            .ractive::after{
              content: " ";
              position: absolute;
              top: -0.05rem;
              right: -0.05rem;
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              background: url(../../assets/sm_add.png) no-repeat center center;
            }
          }
        }
      }
    }
  }
  .btn{
    display: flex;
    justify-content: center;
    // background: #ccc;
    margin-top: 1.5%;
    span{
      width: 1rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
      background: #409eff;
      text-align: center;
      border-radius: 0.05rem;
      color: #fff;
      cursor: pointer;
      &:last-child{
        margin-left: 10%;
        color: #606266;
        border: 1px solid #dcdfe6;
        background: #fff;
      }
      &:first-child:hover{
        color: #fff;
        border-color: #66b1ff;
        background: #66b1ff;
      }
      &:last-child:hover{
        color: #409eff;
        border-color: #c6e2ff;
        background: #ecf5ff;
      }
    }
  }
}
</style>
