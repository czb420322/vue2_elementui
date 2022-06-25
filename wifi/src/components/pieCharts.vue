<template>

</template>
<script>
export default{
  data(){
    return{

    }
  },
  methods:{
    getPie(pieChartsId,gdata,isSize,piesize){
      if(isSize){
        piesize = '70%'
      }
      // 去除字体阴影
      $("tspan.highcharts-text-outline").css("fill","none");
      $("tspan.highcharts-text-outline").css("stroke","none");
      var chart = this.$highstock.chart(pieChartsId, {
        chart: {
          type: 'pie',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          options3d: {
            enabled: true,
            alpha: 55,
            beta: 0
          }
        },
        title: {
          text: null // 设置标题不显示
        },
        tooltip: {
          headerFormat: null,
          pointFormat: '{point.name}: <b>{point.y} ({point.percentage:.1f}%)</b>', // 悬停显示案件数量
          style:{
            fontSize: 14
          },
        },
        colors:this.$store.state.echarColorList,
        exporting:{
          enabled: false
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
        legend: {
          itemDistance: 20,//距离
          symbolWidth:12,  //设置为正方形
          symbolHeight:12,
          symbolRadius:0,
          itemHoverStyle: {
            color: '#409eff'
          },
          itemStyle:{   //设置字体颜色和加粗
            color:"rgb(153, 201, 250)",
            fontWeight:"normal"
          },
          itemMarginBottom: 30,
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 40,
            dataLabels: {  // 设置字体颜色
              style:{
                color:'rgb(153, 201, 250)',
                fontSize: 14
              },
              enabled: true,
            },
            showInLegend: true,
            color:'rgb(153, 201, 250)',
          }
        },
        credits:{
          enabled: false,  // 去除网站链接
        },
        series: [{
          type: 'pie',
          data: gdata,
          size: piesize
        }]
      });
      console.log(piesize,'3333');
    }
  }
}
</script>

