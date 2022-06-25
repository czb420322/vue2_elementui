const mixins = {
    data() {
        return {}
    },
    methods: {
        // 案件统计饼状进度条
        getgradualpie(gradualId, gdata) {
            let myChart = this.$echarts.init(gradualId, "macarons");
            var tsIcon = '';
            // console.log(tsIcon);
            let option = {
                grid: {
                    left: '200%',
                    top: 50,
                    bottom: 10,
                    right: '200%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    show: false
                },

                polar: {
                    center: ['50%', '50%'],
                    radius: '60%'
                },
                angleAxis: {
                    interval: 1,
                    type: 'category',
                    data: [],
                    z: 10,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B4A6B",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        color: "#0B4A6B",
                        margin: 8,
                        fontSize: 12
                    },
                },
                radiusAxis: {
                    min: 1,
                    max: 5,
                    interval: 1,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B3E5E",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: false,
                        padding: [0, 0, 10, 0],
                        color: "#0B3E5E",
                        fontSize: 12
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#07385e",
                            width: 2,
                            type: "dashed"
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['#2e2813', '#514710', '#2d2913', '#252116']
                        }
                    }
                },
                calculable: true,
                series: [{
                        type: 'graph',
                        layout: 'force',
                        zlevel: 10,
                        force: {
                            repulsion: 3000,
                            edgeLength: [150, 100],
                            // layoutAnimation:false
                        },
                        // 节点标记类型
                        //symbolSize: 70,
                        // 两端标记类型
                        // edgeSymbol: ['circle', 'circle'],
                        //edgeSymbolSize: [12, 20],

                        //focusNodeAdjacency: true, // 鼠标经过节点是否突出显示
                        //roam: false, // 是否开启鼠标平移
                        //draggable: false, // 节点是否可拖拽

                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    fontSize: 12,
                                    color: '#000'
                                },
                            }
                        },

                        lineStyle: {
                            normal: {
                                opacity: 1,
                                color: {
                                    colorStops: [{
                                        offset: 0,
                                        color: '#939294'
                                    }, {
                                        offset: 1,
                                        color: '#939294'
                                    }]
                                },
                                width: 1
                            }
                        },
                        itemStyle: {
                            opacity: 0
                        },
                        // 节点分类
                        categories: [{
                                name: 'root',
                                label: {
                                    formatter: '{b}',
                                    fontSize: 12,
                                    show: false
                                },
                                itemStyle: {
                                    color: '#132486'
                                }
                            },


                        ],
                        // 数据
                        data: [{
                            name: 'haha',
                            // symbol: require('../../assets/badge.png'),
                            value: [100, 100],
                            //fixed:true,
                            x: 0,
                            y: 0,
                            category: 0,
                            symbolSize: 180,
                        }]
                    },
                    {
                        stack: 'a',
                        type: 'pie',
                        radius: '15%',
                        zlevel: 1,
                        startAngle: 83,
                        label: {
                            normal: {
                                show: true,
                                borderColor: '#666666',
                                borderWidth: 1,
                                padding: [10, 7],
                                color: '#666666',
                                fontSize: 12,
                                backgroundColor: '#000000'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 40,
                                length2: 30,
                                lineStyle: {
                                    color: '#0096b1'
                                }
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: [{
                                value: 50,
                                name: '容量小设备老旧',
                                label: {
                                    normal: {
                                        show: true,
                                        color: '#ffd900',
                                        fontSize: 12,
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 40,
                                        // length2: 30,
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#ffd900'

                                        }
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                }

                            },
                            {
                                value: 50,
                                name: '市局侦查一队',
                                itemStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        color: '#99c9fa',
                                        fontSize: 12,
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 40,
                                        length2: 30,
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#a39f8a'

                                        }
                                    },

                                    emphasis: {
                                        show: false
                                    }
                                }

                            },
                            {
                                value: 50,
                                name: '市局侦查三队',
                                itemStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 60,
                                        length2: 30,
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#a39f8a'

                                        }
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                }

                            },
                            {
                                value: 50,
                                name: '嗯嗯嗯嗯',
                                label: {
                                    normal: {
                                        show: true,
                                        // borderColor: '#c15136',
                                        // borderWidth: 1,
                                        //padding: [15, 7],
                                        color: '#c15136',
                                        fontSize: 12,
                                        // backgroundColor: '#000000'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 40,
                                        length2: 30,
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#c15136',
                                        }
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                }

                            },
                            {
                                value: 50,
                                name: '容量小设备老旧1',
                                label: {
                                    normal: {
                                        show: true,
                                        color: '#99c9fa',
                                        fontSize: 12,
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 40,
                                        length2: 30,
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#cccccc'

                                        }
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                }

                            },
                            {
                                value: 50,
                                name: '容量小设备老旧',
                                label: {
                                    normal: {
                                        show: true,
                                        // borderColor: '#ffd900',
                                        // borderWidth: 1,
                                        //padding: [15, 7],
                                        color: '#ffd900',
                                        fontSize: 12,
                                        // backgroundColor: '#000000'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 40,
                                        length2: 30,
                                        lineStyle: {
                                            type: 'solid',
                                            color: '#ffd900'

                                        }
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                }

                            },

                        ]
                    }
                ]
            }

            myChart.setOption(option);
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    myChart.resize();
                }, 100);
            });
        },

    }
}
export default mixins
