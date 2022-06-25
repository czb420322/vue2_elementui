<template>

</template>

<script>
export default{
  data(){
    return{
        chart: null
    }
  },
  methods: {
    getColumnar(bargraphId,gdata,isclick){
      this.chart = this.$highstock.chart(bargraphId, {
        chart: {
          type: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          style:{ // 设置内边距
            spacing: 20
          },
          options3d: {  // 设置立体效果
            enabled: true,
            alpha: 0,
            beta: 0,
            depth: 30,
            viewDistance: 25
          }
        },
        title: {
          text: null // 不显示标题
        },
        tooltip: {
          headerFormat: null,
          pointFormat: '{point.name}: <b>{point.y}</b>', // 悬停显示案件数量
          style:{
            fontSize: 14
          },
        },
        lang:{
          noData:'暂无数据'
        },
        noData: { //自定义样式
          position: { //相对于绘图区定位无数据标签的位置。 默认值：[object Object].
          },
          attr: { //无数据标签中额外的SVG属性
          //'stroke-width': 1,
          //stroke: '#cccccc'
          },
          style: { //对无数据标签的CSS样式。 默认值：[object Object].
            fontSize: '14px',
            color: 'rgb(153, 201, 250)'
          }
        },
        // scrollbar:{ // 显示滚动条
        //   enabled:true,
        // },
        xAxis: {   // x轴
          // min:0,
          // max:10,
          type: "category",
          data: ["案件数量", "已破案件", "未破案件"],
          gridLineColor:'#527293', // 设置虚线颜色
          labels: { // x轴标签下面的说明
            style: {
              color:"rgb(153, 201, 250)",
              fontSize: 14
            }
          }
        },
        yAxis: { // y轴
          gridLineColor: '#527293', // 设置虚线颜色
          allowDecimals: false, // 不显示小数
          title:{
            text:''
          },
          labels: { // x轴标签下面的说明
            style: {
              color:"rgb(153, 201, 250)",
              fontSize: 14
            }
          }
        },
        colors:this.$store.state.echarColorList,
        exporting:{
          enabled: false,
        },
        plotOptions: {
          series: {
            depth: 25,
            colorByPoint: true
          },
          column: {
            cursor: 'pointer',
            pointWidth:25 // 设置柱状图宽度
          }
        },
        credits:{
          enabled: false,  // 去除网站链接
        },
        series: [{
          barWidth: 30,
          data: gdata,
          showInLegend: false,
          dataLabels: {  // 设置字体颜色
            style:{
              color:'#fff'
            }
          }
        }],
        navigation: {
          buttonOptions: { // 自定义按钮位置及颜色设置
            verticalAlign: 'top',
            y: -10,
            x: -10,
            symbolStroke:'#4e739f'
          },
          menuStyle: {
            background: 'rgba(12,68,135,.4)',
            color:'##99c9fa'

          },
          menuItemStyle: {
            color: '#99c9fa'
          },
          menuItemHoverStyle: {
            color: '#99c9fa'
          }
        }
      })
      let _this = this
      // 切换折线图
      $('#clear-button').on('click', function (e) {
          console.log(_this.chart,2211333);
        _this.chart.series[0].update({
          type: 'line'
        })
      });
      // 切换柱状图
      $('#pie-button').on('click', function (e) {
          _this.chart.series[0].update({
          type: 'column'
        })
      });
      // 还原
      $('#refresh-button').on('click', function (e) {
          _this.chart.series[0].update({
          type: 'column'
        })
      });
      if(isclick){
        var btn=document.getElementById('btn');
        btn.onclick=function(){
          _this.chart.exportChartLocal({ // 自定义按钮下载图表功能
            exportFormat: 'PNG'
          })
        }
      }

    }
  }
}
</script>
