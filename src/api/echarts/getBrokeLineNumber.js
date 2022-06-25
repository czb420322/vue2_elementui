import echarts from "echarts";
import "../../../static/js/echarts/echarts-wordcloud.min.js";
const mixins = {
    data() {
        return {

        }
    },
    methods: {
        getBrokeLine(brokenlineId, date, one, two, three, four) {
            let myChart = this.$echarts.init(brokenlineId, "macarons");
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0, 255, 233,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,1)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(0, 255, 233,0)'
                                }],
                                global: false
                            }
                        },
                    },
                },
                grid: {
                    top: '15%',
                    left: '10%',
                    right: '5%',
                    bottom: '15%',

                },
                xAxis: [{
                    type: 'category',
                    axisLine: {
                        show: true
                    },
                    splitArea: {
                        // show: true,
                        color: '#f00',
                        lineStyle: {
                            color: '#f00'
                        },
                    },
                    axisLabel: {
                        // color: 'rgba(178,105,199,1)',
                        // backgroundColor:'rgba(255,255,255,0)'
                        color: "#99c9fa",
                        rotate: 45,
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false,
                    data: date,

                }],

                yAxis: [{
                    type: 'value',
                    min: 0,
                    // max: 140,
                    splitNumber: 4,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#00BFF3',
                            opacity: 0.23
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        margin: 20,
                        textStyle: {
                            color: '#99c9fa',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [{
                        name: '当日新增过车数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#B269C7",
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#99c9fa',
                            }
                        },
                        itemStyle: {
                            color: "#B269C7",
                            borderColor: "#B269C7",
                            borderWidth: 2,
                        },
                        areaStyle: {
                            normal: {

                                color: 'rgba(255,255,255,0)'
                            }
                        },
                        data: one //data.values
                    },

                    // {
                    //     name: '当日新增结构化骑车人',
                    //     type: 'line',
                    //     showAllSymbol: true,
                    //     symbol: 'circle',
                    //     symbolSize: 10,
                    //     lineStyle: {
                    //         normal: {
                    //             color: "#9C70D1",
                    //         },
                    //     },
                    //     label: {
                    //         show: true,
                    //         position: 'top',
                    //         textStyle: {
                    //             color: '#99c9fa',
                    //         }
                    //     },
                    //     itemStyle: {
                    //         color: "#9C70D1",
                    //         borderColor: "#9C70D1",
                    //         borderWidth: 2,
                    //     },
                    //     areaStyle: {

                    //         color: 'rgba(255,255,255,0)'
                    //     },
                    //     data: two
                    // },
                    // {
                    //     name: '当日新增结构化车',
                    //     type: 'line',
                    //     showAllSymbol: true,
                    //     symbol: 'circle',
                    //     symbolSize: 10,
                    //     lineStyle: {
                    //         normal: {
                    //             color: "#8E6CE4",
                    //         },
                    //     },
                    //     label: {
                    //         show: true,
                    //         position: 'top',
                    //         textStyle: {
                    //             color: '#99c9fa',
                    //         }
                    //     },
                    //     itemStyle: {
                    //         color: "#8E6CE4",
                    //         borderColor: "#8E6CE4",
                    //         borderWidth: 2,
                    //     },
                    //     color: 'rgba(255,255,255,0)',
                    //     data: three
                    // },
                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    myChart.resize();
                }, 1000);
            });
        },

        getBarList(brokenlineId, date, one) {
            let myChart = this.$echarts.init(brokenlineId, "macarons");
            let option = {
                tooltip: {},
                xAxis: [{
                        type: 'category',
                        gridIndex: 0,
                        data:date
                    },

                ],
                yAxis: [{
                        gridIndex: 0
                    },

                ],
                grid: {
                    top: '55%',
                    bottom: '55%',

                },
                series: [
                    {
                        name: '当日新增过车数',
                        type: 'bar',
                        showAllSymbol: true,
                        data: one
                    },
                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    myChart.resize();
                }, 1000);
            });
        },

    }
}
export default mixins
