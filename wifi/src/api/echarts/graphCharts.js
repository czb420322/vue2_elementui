const mixins = {
    data() {
        return {

        }
    },
    methods: {
        graphCharts(graphId, data2, data3) {
            let myChart = this.$echarts.init(graphId, "macarons");
            let option = {
                color: ['#1C86F1'],
                legend: {
                    textStyle: {
                        color: '#9B9B9B'
                    },
                    right: 37,
                    top: 22,
                },
                tooltip: {},
                grid: {
                    height: 110,
                    top: '8%',
                    left: '15%',
                },
                xAxis: {
                    type: 'category',
                    data: data2,
                    axisLine: {
                        lineStyle: {
                            color: '#657CA8'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#eeeeee',
                        rotate: 45,
                    },
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#657CA8'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#eee',
                    },
                },
                series: [{
                    type: 'bar',
                    barWidth: 20,
                    data: data3,
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = [
                                    ['#f56868', 'transparent'],
                                    ['#41ccba', 'transparent'],
                                    ['#a582ea', 'transparent'],
                                    ['#f5c379', 'transparent'],
                                    ['#b4c6cc', 'transparent'],
                                    ['#74d28c', 'transparent'],
                                    ['#f4966e', 'transparent'],
                                    ['#64b2ef', 'transparent'],
                                ];
                                var index = params.dataIndex;
                                if (params.dataIndex >= colorList.length) {
                                    index = params.dataIndex - colorList.length;
                                }
                                return {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                            offset: 0,
                                            color: colorList[index][0]
                                        },
                                        {
                                            offset: 0.5,
                                            color: colorList[index][0]
                                        },
                                        {
                                            offset: 1,
                                            color: colorList[index][1]
                                        },
                                    ]
                                }
                            }
                        }
                    }
                }]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    myChart.resize();
                }, 100);
            });

        }
    }
}
export default mixins
