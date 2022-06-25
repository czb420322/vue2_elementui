const mixins = {
    data() {
        return {

        }
    },
    methods: {
        getbrokenline(brokenlineId, date, one, two, three, four) {
            let myChart = this.$echarts.init(brokenlineId, "macarons");
            let option = {
                // backgroundColor: '#232d36',
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
                    // containLabel: true
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
                        name: '当日新增结构化人',
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
                                // color: (0, 0, 0, 0, [{
                                //         offset: 0,
                                //         color: 'rgba(255,255,255,0)'

                                //     },
                                //     {
                                //         offset: 1,
                                //         color: 'rgba(255,255,255,0)'
                                //     }
                                // ], false),
                                color: 'rgba(255,255,255,0)'
                            }
                        },
                        data: one //data.values
                    },

                    {
                        name: '当日新增结构化骑车人',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#9C70D1",
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
                            color: "#9C70D1",
                            borderColor: "#9C70D1",
                            borderWidth: 2,
                        },
                        areaStyle: {
                            // normal: {
                            //     color: (0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: 'rgba(81,150,164,0.3)'
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: 'rgba(81,150,164,0)'
                            //         }
                            //     ], false),
                            // }
                            color: 'rgba(255,255,255,0)'
                        },
                        data: two
                    },
                    {
                        name: '当日新增结构化车',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#8E6CE4",
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
                            color: "#8E6CE4",
                            borderColor: "#8E6CE4",
                            borderWidth: 2,
                        },
                        // areaStyle: {
                        //     normal: {
                        //         color: (0, 0, 0, 1, [{
                        //                 offset: 0,
                        //                 color: 'rgba(81,150,164,0.3)'
                        //             },
                        //             {
                        //                 offset: 1,
                        //                 color: 'rgba(81,150,164,0)'
                        //             }
                        //         ], false),
                        //     }
                        // },
                        color: 'rgba(255,255,255,0)',
                        data: three
                    },
                    {
                        name: '当日新增结构化人脸',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#2986E5",
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
                            color: "#2986E5",
                            borderColor: "#2986E5",
                            borderWidth: 2,
                        },
                        // areaStyle: {
                        //     normal: {
                        //         color: (0, 0, 0, 1, [{
                        //                 offset: 0,
                        //                 color: 'rgba(81,150,164,0.3)'
                        //             },
                        //             {
                        //                 offset: 1,
                        //                 color: 'rgba(81,150,164,0)'
                        //             }
                        //         ], false),
                        //     }
                        // },
                        color: 'rgba(255,255,255,0)',
                        data: four
                    },
                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    myChart.resize();
                }, 100);
            });
        },
        getbrokenline2(brokenlineId, date, one, two, three, four) {
            let myChart = this.$echarts.init(brokenlineId, "macarons");
            let option = {
                // backgroundColor: '#080b30',
                title: {
                    textStyle: {
                        align: 'center',
                        color: '#fff',
                        fontSize: 20,
                    },
                    top: '5%',
                    left: 'center',
                },
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
                    left: '5%',
                    right: '5%',
                    bottom: '15%',
                    // containLabel: true
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
                        color: '#fff'
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
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                        margin: 20,
                        textStyle: {
                            color: '#d1e6eb',

                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [{
                        name: 'new add people number',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 16,
                        lineStyle: {
                            normal: {
                                color: "#6c50f3",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#6c50f3',
                            }
                        },
                        itemStyle: {
                            color: "#6c50f3",
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                            offset: 0,
                                            color: 'rgba(108,80,243,0.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(108,80,243,0)'
                                        }
                                    ],
                                    shadowColor: 'rgba(108,80,243, 0.9)',
                                    shadowBlur: 20
                                }
                            }
                        },
                        data: one
                    },
                    {
                        name: 'new add biclcye number',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 16,
                        lineStyle: {
                            normal: {
                                color: "#00ca95",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#00ca95',
                            }
                        },

                        itemStyle: {
                            color: "#00ca95",
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                            offset: 0,
                                            color: 'rgba(0,202,149,0.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ],
                                    shadowColor: 'rgba(0,202,149, 0.9)',
                                    shadowBlur: 20
                                }
                            }
                        },
                        data: two,
                    },
                    {
                        name: 'new add vehicle number',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 16,
                        lineStyle: {
                            normal: {
                                // color: "#00ca95",
                                color: "#99c9fa",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                // color: '#00ca95',
                                color: "#99c9fa",
                            }
                        },

                        itemStyle: {
                            // color: "#00ca95",
                            color: "#99c9fa",
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                            offset: 0,
                                            color: 'rgba(0,202,149,0.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ],
                                    shadowColor: 'rgba(0,202,149, 0.9)',
                                    shadowBlur: 20
                                }
                            }
                        },
                        data: three,
                    },
                    {
                        name: 'new add manface number',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 16,
                        lineStyle: {
                            normal: {
                                // color: "#00ca95",
                                color: "#B269C7",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                // color: '#00ca95',
                                color: "#B269C7",
                            }
                        },

                        itemStyle: {
                            // color: "#00ca95",
                            color: "#B269C7",
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                            offset: 0,
                                            color: 'rgba(0,202,149,0.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ],
                                    shadowColor: 'rgba(0,202,149, 0.9)',
                                    shadowBlur: 20
                                }
                            }
                        },
                        data: four,
                    },

                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    myChart.resize();
                }, 100);
            });
        },
        drawStructBrokeLine(brokenlineId, date, face, bicycle, person, vehicle) {
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
                        name: '当日新增结构化人脸',
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
                                // color: (0, 0, 0, 0, [{
                                //         offset: 0,
                                //         color: 'rgba(255,255,255,0)'

                                //     },
                                //     {
                                //         offset: 1,
                                //         color: 'rgba(255,255,255,0)'
                                //     }
                                // ], false),
                                color: 'rgba(255,255,255,0)'
                            }
                        },
                        data: face //data.values
                    },

                    {
                        name: '当日新增结构化骑车人',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#9C70D1",
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
                            color: "#9C70D1",
                            borderColor: "#9C70D1",
                            borderWidth: 2,
                        },
                        areaStyle: {
                            // normal: {
                            //     color: (0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: 'rgba(81,150,164,0.3)'
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: 'rgba(81,150,164,0)'
                            //         }
                            //     ], false),
                            // }
                            color: 'rgba(255,255,255,0)'
                        },
                        data: bicycle
                    },
                    {
                        name: '当日新增结构化人',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#8E6CE4",
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
                            color: "#8E6CE4",
                            borderColor: "#8E6CE4",
                            borderWidth: 2,
                        },
                        // areaStyle: {
                        //     normal: {
                        //         color: (0, 0, 0, 1, [{
                        //                 offset: 0,
                        //                 color: 'rgba(81,150,164,0.3)'
                        //             },
                        //             {
                        //                 offset: 1,
                        //                 color: 'rgba(81,150,164,0)'
                        //             }
                        //         ], false),
                        //     }
                        // },
                        color: 'rgba(255,255,255,0)',
                        data: person
                    },
                    {
                        name: '当日新增结构化车',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#2986E5",
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
                            color: "#2986E5",
                            borderColor: "#2986E5",
                            borderWidth: 2,
                        },
                        // areaStyle: {
                        //     normal: {
                        //         color: (0, 0, 0, 1, [{
                        //                 offset: 0,
                        //                 color: 'rgba(81,150,164,0.3)'
                        //             },
                        //             {
                        //                 offset: 1,
                        //                 color: 'rgba(81,150,164,0)'
                        //             }
                        //         ], false),
                        //     }
                        // },
                        color: 'rgba(255,255,255,0)',
                        data: vehicle
                    },
                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    myChart.resize();
                }, 100);
            });
        },

        //一个月处理的视频总数量
        getColumnars(bargraphId, arrx, arry) {

            let _this = this
            this.chart = this.$highstock.chart(bargraphId, {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    style: { // 设置内边距
                        spacing: 20
                    },
                    options3d: { // 设置立体效果
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
                    style: {
                        fontSize: 14
                    },
                },
                lang: {
                    noData: '暂无数据'
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
                xAxis: { // x轴
                    // min:0,
                    // max:10,
                    type: "category",
                    // data: ["人脸","骑车人","人","车"],
                    gridLineColor: '#527293', // 设置虚线颜色
                    labels: { // x轴标签下面的说明
                        style: {
                            color: "rgb(153, 201, 250)",
                            fontSize: 14
                        }
                    },
                    data: ['a', 'b', 'c', 'd'],
                },
                yAxis: { // y轴
                    gridLineColor: '#527293', // 设置虚线颜色
                    allowDecimals: false, // 不显示小数
                    title: {
                        text: ''
                    },
                    labels: { // x轴标签下面的说明
                        style: {
                            color: "rgb(153, 201, 250)",
                            fontSize: 14
                        }
                    },
                    // data:arry
                },
                colors: this.$store.state.echarColorList,
                exporting: {
                    enabled: false,
                },
                plotOptions: {
                    series: {
                        depth: 25,
                        colorByPoint: true
                    },
                    column: {
                        cursor: 'pointer',
                        pointWidth: 25 // 设置柱状图宽度
                    }
                },
                credits: {
                    enabled: false, // 去除网站链接
                },
                series: [{
                    barWidth: 30,
                    showInLegend: false,
                    dataLabels: { // 设置字体颜色
                        style: {
                            color: '#fff'
                        }
                    },
                    data: arry
                }],
                navigation: {
                    buttonOptions: { // 自定义按钮位置及颜色设置
                        verticalAlign: 'top',
                        y: -10,
                        x: -10,
                        symbolStroke: '#4e739f'
                    },
                    menuStyle: {
                        background: 'rgba(12,68,135,.4)',
                        color: '#99c9fa'

                    },
                    menuItemStyle: {
                        color: '#99c9fa'
                    },
                    menuItemHoverStyle: {
                        color: '#99c9fa'
                    }
                }
            })
        },
    }
}
export default mixins
