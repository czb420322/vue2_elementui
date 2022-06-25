// 仪表盘
const mixins = {
    data() {
        return {

        }
    },
    methods: {
        getInstrumentChart(getInstrumentId) {
            let myChart = this.$echarts.init(getInstrumentId, "macarons");
            // var value = 64.8;
            // var color = new this.$echarts.graphic.LinearGradient(
            //     0, 0, 1, 0, [{
            //             offset: 0,
            //             color: "#D8FD36",
            //         },
            //         {
            //             offset: 1,
            //             color: "#2AFD85",
            //         }
            //     ]
            // );
            // let option = {
            //     backgroundColor: '#051668',
            //     series: [{
            //             name: '信用分',
            //             type: 'gauge',
            //             startAngle: 200,
            //             endAngle: -20,
            //             min: 0,
            //             max: 100,
            //             radius: '60%',
            //             axisLine: {
            //                 show: true,
            //                 lineStyle: {
            //                     color: [
            //                         [
            //                             100, new this.$echarts.graphic.LinearGradient(
            //                                 0, 0, 1, 0, [{
            //                                         offset: 0,
            //                                         color: "#FB3F52",
            //                                     },
            //                                     {
            //                                         offset: 1,
            //                                         color: "#3BF37A",
            //                                     }
            //                                 ]
            //                             )
            //                         ],
            //                         [
            //                             1, 'rgba(225,225,225,0.4)'
            //                         ]
            //                     ],
            //                     width: 3,
            //                     opacity: 1
            //                 }
            //             },
            //             title: {
            //                 show: false
            //             },
            //             detail: {
            //                 show: true,
            //                 offsetCenter: [0, '80%'],
            //                 color: '#D6F1FF',
            //                 fontSize: 30,
            //                 formatter: function (value) {
            //                     return '{value|' + value.toFixed(0) + '}{unit|%}\n\n月度发电量完成率';
            //                 },
            //                 rich: {
            //                     value: {
            //                         fontSize: 50,
            //                         color: '#FFDE00'
            //                     },
            //                     unit: {
            //                         fontSize: 40,
            //                         color: '#FFDE00',
            //                     },
            //                 }
            //             },
            //             axisTick: {
            //                 length: 0,
            //                 splitNumber: 2,
            //                 lineStyle: {
            //                     color: '#999'
            //                 }
            //             },
            //             splitLine: {
            //                 length: 15,
            //                 lineStyle: {
            //                     color: new this.$echarts.graphic.LinearGradient(
            //                         0, 0, 1, 0, [{
            //                                 offset: 0,
            //                                 color: "#FB3F52",
            //                             },
            //                             {
            //                                 offset: 1,
            //                                 color: "#3BF37A",
            //                             }
            //                         ]
            //                     )
            //                 }
            //             },
            //             axisLabel: {
            //                 color: '#D6F1FF',
            //                 fontSize: 20
            //             },
            //             pointer: {
            //                 // show:false,
            //                 width: 12,
            //                 length: 120
            //             },
            //             itemStyle: {
            //                 color: color,
            //                 shadowColor: 'rgba(0,138,255,0.45)',
            //                 shadowBlur: 10,
            //                 shadowOffsetX: 2,
            //                 shadowOffsetY: 2
            //             },
            //             markPoint: {
            //                 // symbol:'circle',
            //                 // symbolSize:15,
            //                 // itemStyle: {
            //                 //     color: "#fff"
            //                 // },
            //                 data: [{
            //                     x: "50%",
            //                     y: "50%",
            //                     symbol: 'circle',
            //                     symbolSize: 40,
            //                     itemStyle: {
            //                         color: color
            //                     },
            //                 }, {
            //                     x: "50%",
            //                     y: "50%",
            //                     symbol: 'circle',
            //                     symbolSize: 15,
            //                     itemStyle: {
            //                         color: "#fff"
            //                     },
            //                 }]
            //             },
            //             data: [{
            //                 value: value,
            //                 name: '年售电量情况'
            //             }]

            //         },
            //         {
            //             name: "已到人数",
            //             type: 'gauge',
            //             radius: '75%',
            //             startAngle: 200,
            //             endAngle: -20,
            //             min: 0,
            //             max: 100,
            //             title: {
            //                 show: false
            //             },
            //             detail: {
            //                 show: false
            //             },
            //             axisLine: {
            //                 show: true,
            //                 lineStyle: {
            //                     width: 22,
            //                     color: [
            //                         [
            //                             value / 100, color
            //                         ],
            //                         [
            //                             1, '#35375C'
            //                         ]
            //                     ],
            //                     // shadowColor: 'rgba(0,138,255,0.35)',
            //                     // shadowBlur: 5,
            //                 }
            //             },
            //             axisTick: {
            //                 show: true,
            //                 length: 22,
            //                 splitNumber: 2,
            //                 lineStyle: {
            //                     color: '#192568',
            //                     width: 3
            //                 }
            //             },
            //             splitLine: {
            //                 show: false,
            //             },
            //             axisLabel: {
            //                 show: false
            //             },
            //             pointer: {
            //                 show: false,
            //             },
            //             itemStyle: {
            //                 normal: {
            //                     color: '#35375C',
            //                 }
            //             },
            //             data: [{
            //                 value: value,
            //                 name: '年售电量情况'
            //             }]
            //         }
            //     ]
            // }

            // var highlight = '#03b7c9';
            // var demoData = [{
            //         name: '温度',
            //         value: 22,
            //         unit: '℃',
            //         pos: ['25%', '40%'],
            //         range: [-40, 100],
            //         YS: [
            //             [0.4, '#119eff'],
            //             [0.5, '#30da74'],
            //             [1, '#f3390d']
            //         ]
            //     },
            //     {
            //         name: '湿度',
            //         value: 90,
            //         unit: '%',
            //         pos: ['75%', '40%'],
            //         range: [0, 100],
            //         splitNum: 10,
            //         YS: [
            //             [0.3, '#f3390d'],
            //             [0.8, '#30da74'],
            //             [1, '#119eff']
            //         ]
            //     }
            // ];

            // let option = {
            //     backgroundColor: '#00162d',
            //     series: (function () {
            //         var result = [];
            //         demoData.forEach(function (item) {
            //             result.push(
            //                 // 外围刻度
            //                 {
            //                     type: 'gauge',
            //                     center: item.pos,
            //                     radius: '50%', // 1行2个
            //                     splitNumber: item.splitNum || 10,
            //                     min: item.range[0],
            //                     max: item.range[1],
            //                     startAngle: 225,
            //                     endAngle: -45,
            //                     axisLine: {
            //                         show: true,
            //                         lineStyle: {
            //                             width: 2,
            //                             shadowBlur: 0,
            //                             color: [
            //                                 [1, highlight]
            //                             ]
            //                         }
            //                     },
            //                     axisTick: {
            //                         show: true,
            //                         lineStyle: {
            //                             color: highlight,
            //                             width: 1
            //                         },
            //                         length: -5,
            //                         splitNumber: 10
            //                     },
            //                     splitLine: {
            //                         show: true,
            //                         length: -10,
            //                         lineStyle: {
            //                             color: highlight,
            //                         }
            //                     },
            //                     axisLabel: {
            //                         distance: -18,
            //                         textStyle: {
            //                             color: highlight,
            //                             fontSize: '10',

            //                         }
            //                     },
            //                     pointer: {
            //                         show: 0
            //                     },
            //                     detail: {
            //                         show: 0
            //                     }
            //                 }, {
            //                     name: '速度',
            //                     type: 'gauge',
            //                     center: item.pos,
            //                     splitNumber: item.splitNum || 10,
            //                     min: item.range[0],
            //                     max: item.range[1],
            //                     radius: '45%',
            //                     axisLine: { // 坐标轴线
            //                         show: false,
            //                         lineStyle: { // 属性lineStyle控制线条样式
            //                             color: item.YS,
            //                             shadowColor: "#ccc",
            //                             shadowBlur: 25,
            //                             width: 0
            //                         }
            //                     },
            //                     axisLabel: {
            //                         show: false
            //                     },
            //                     axisTick: { // 坐标轴小标记
            //                         // show: false,
            //                         length: 20, // 属性length控制线长
            //                         lineStyle: { // 属性lineStyle控制线条样式
            //                             color: 'auto',
            //                             width: 2
            //                         }
            //                     },
            //                     splitLine: { // 分隔线
            //                         show: false,
            //                         length: 20, // 属性length控制线长
            //                         lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
            //                             color: 'auto'
            //                         }
            //                     },
            //                     title: {
            //                         textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            //                             fontWeight: 'bolder',
            //                             fontSize: 20,
            //                             fontStyle: 'italic'
            //                         }
            //                     },
            //                     detail: {
            //                         show: true,
            //                         offsetCenter: [0, '100%'],
            //                         textStyle: {
            //                             fontSize: 25
            //                         },
            //                         formatter: [
            //                             '{value} ' + (item.unit || ''),
            //                             '{name|' + item.name + '}'
            //                         ].join('\n'),
            //                         rich: {
            //                             name: {
            //                                 fontSize: 16,
            //                                 lineHeight: 30,
            //                                 color: '#4be4de'
            //                             }
            //                         }
            //                     },
            //                     data: [{
            //                         value: item.value
            //                     }],
            //                     pointer: {
            //                         width: 5
            //                     }
            //                 },
            //                 // 内侧指针、数值显示
            //                 {
            //                     name: item.name,
            //                     type: 'gauge',
            //                     center: item.pos,
            //                     radius: '40%',
            //                     startAngle: 225,
            //                     endAngle: -45,
            //                     min: item.range[0],
            //                     max: item.range[1],
            //                     axisLine: {
            //                         show: true,
            //                         lineStyle: {
            //                             width: 16,
            //                             color: [
            //                                 [1, 'rgba(75,228,255,.1)']
            //                             ]
            //                         }
            //                     },
            //                     axisTick: {
            //                         show: 0,
            //                     },
            //                     splitLine: {
            //                         show: 0,
            //                     },
            //                     axisLabel: {
            //                         show: 0
            //                     },
            //                     pointer: {
            //                         show: true,
            //                         length: '90%',
            //                         width: 3,
            //                     },
            //                     itemStyle: { //表盘指针的颜色
            //                         color: 'rgba(255, 153, 0, 0.31)',
            //                         borderColor: '#ff9900',
            //                         borderWidth: 1
            //                     },
            //                     detail: {
            //                         show: false,
            //                         offsetCenter: [0, '100%'],
            //                         textStyle: {
            //                             fontSize: 20,
            //                             color: '#00eff2'
            //                         },
            //                         formatter: [
            //                             '{value} ' + (item.unit || ''),
            //                             '{name|' + item.name + '}'
            //                         ].join('\n'),
            //                         rich: {
            //                             name: {
            //                                 fontSize: 14,
            //                                 lineHeight: 30,
            //                                 color: '#00eff2'
            //                             }
            //                         }
            //                     },

            //                     data: [{
            //                         value: item.value
            //                     }]
            //                 }
            //             );
            //         });
            //         return result;
            //     })()
            // };



            var dataArr = [{
                value: 120,
                name: '噪音检测'
            }];
            var color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#5CF9FE' // 0% 处的颜色
                },
                {
                    offset: 0.17,
                    color: '#468EFD' // 100% 处的颜色
                },
                {
                    offset: 0.9,
                    color: '#468EFD' // 100% 处的颜色
                },
                {
                    offset: 1,
                    color: '#5CF9FE' // 100% 处的颜色
                }
            ]);
            var colorSet = [
                [1, color],
                // [0.91, color],
                // [1, '#FFF']
            ];
            var rich = {
                white: {
                    fontSize: 50,
                    color: '#fff',
                    fontWeight: '500',
                    padding: [-150, 0, 0, 0]
                },
                bule: {
                    fontSize: 70,
                    fontFamily: 'DINBold',
                    color: '#fff',
                    fontWeight: '700',
                    padding: [-120, 0, 0, 0],
                },
                radius: {
                    width: 350,
                    height: 80,
                    // lineHeight:80,
                    borderWidth: 1,
                    borderColor: '#0092F2',
                    fontSize: 50,
                    color: '#fff',
                    backgroundColor: '#1B215B',
                    borderRadius: 20,
                    textAlign: 'center',
                },
                size: {
                    height: 400,
                    padding: [100, 0, 0, 0]
                }
            }
            let option = {
                backgroundColor: '#0E1327',
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },

                series: [{
                        type: 'gauge',
                        name: '外层辅助',
                        radius: '74%',
                        startAngle: '225',
                        endAngle: '-45',
                        splitNumber: '120',
                        pointer: {
                            show: false
                        },
                        detail: {
                            show: false,
                        },
                        data: [{
                            value: 1
                        }],
                        // data: [{value: 1, name: 90}],
                        title: {
                            show: true,
                            offsetCenter: [0, 30],
                            textStyle: {
                                color: '#fff',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 20,
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [
                                    [1, '#00FFFF']
                                ],
                                width: 2,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            length: 20,
                            lineStyle: {
                                color: '#051932',
                                width: 0,
                                type: 'solid',
                            },
                        },
                        axisLabel: {
                            show: false
                        }
                    },
                    {
                        type: 'gauge',
                        radius: '70%',
                        startAngle: '225',
                        endAngle: '-45',
                        pointer: {
                            show: true
                        },
                        detail: {
                            formatter: function (value) {
                                var num = Math.round(value);
                                return '{bule|dB}{white|}' + '{size|' + '}';
                            },
                            rich: rich,
                            "offsetCenter": ['0%', "55%"],
                        },
                        data: dataArr,
                        title: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colorSet,
                                width: 25,
                                // shadowBlur: 15,
                                // shadowColor: '#B0C4DE',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            length: 25,
                            lineStyle: {
                                color: '#00377a',
                                width: 2,
                                type: 'solid',
                            },
                        },
                        axisLabel: {
                            show: false
                        },
                        animationDuration: 4000,
                    },
                    {
                        name: '灰色内圈', //刻度背景
                        type: 'gauge',
                        z: 2,
                        radius: '60%',
                        startAngle: '225',
                        endAngle: '-45',
                        //center: ["50%", "75%"], //整体的位置设置
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [1, '#018DFF']
                                ],
                                fontSize: 20,
                                width: 2,
                                opacity: 1, //刻度背景宽度
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        detail: {
                            show: 0
                        }
                    },
                    {
                        name: "白色圈刻度",
                        type: "gauge",
                        radius: "60%",
                        startAngle: 225, //刻度起始
                        endAngle: -45, //刻度结束
                        min: 0,
                        max: 120,
                        splitNumber: 6,
                        z: 4,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 16, //刻度节点线长度
                            lineStyle: {
                                width: 2,
                                color: '#018DFF'
                            } //刻度节点线
                        },
                        axisLabel: {
                            color: 'rgba(255,255,255,8)',
                            fontSize: 24,
                        }, //刻度节点文字颜色
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0
                            }
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            value: 0,
                            name: ""
                        }]
                    },
                    { //内圆
                        type: 'pie',
                        radius: '40%',
                        center: ['50%', '50%'],
                        z: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.RadialGradient(.5, .5, .8, [{
                                        offset: 0,
                                        color: '#4978EC'
                                    },
                                    {
                                        offset: .5,
                                        color: '#1E2B57'
                                    },
                                    {
                                        offset: 1,
                                        color: '#141F3D'
                                    }
                                ], false),
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                        hoverAnimation: false,
                        label: {
                            show: false,
                        },
                        tooltip: {
                            show: false
                        },
                        data: [100],
                        animationType: "scale"
                    },
                    { //外圆
                        type: 'pie',
                        radius: '85%',
                        center: ['50%', '50%'],
                        z: 0,
                        itemStyle: {
                            color: '#141C33',
                        },
                        hoverAnimation: false,
                        label: {
                            show: false,
                        },
                        tooltip: {
                            show: false
                        },
                        data: [120],
                        animationType: "scale"
                    }
                ]
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
