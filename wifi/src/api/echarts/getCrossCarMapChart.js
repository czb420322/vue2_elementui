// 武汉市地图
import echarts from "echarts";
import wuhan from '../../../static/province/wuhan.json';
const mixins = {
    data() {
        return {

        }
    },
    methods: {
        getCrossCarMapChart(mapChartId) {
            let myChart = this.$echarts.init(mapChartId, "macarons");
            this.$echarts.registerMap('wuhan', wuhan) // 武汉地图
            var uploadedDataURL = "../../../static/province/wuhan.json";
            var nameMap = '武汉市';
            var hbmap = [{
                name: '江岸区',
                value: '98'
            }, {
                name: '江汉区',
                value: '2223'
            }, {
                name: '硚口区',
                value: '437'
            }, {
                name: '汉阳区',
                value: '385'
            }, {
                name: '武昌区',
                value: '768'
            }, {
                name: '青山区',
                value: '1233'
            }, {
                name: '洪山区',
                value: '1633'
            }];
            // var geoCoordMap = {
            //     '江岸区': [114.30304,30.594911],
            //     '江汉区': [114.283109,30.578771],
            //     '硚口区': [114.264568,30.57061],
            //     '汉阳区': [114.265807,30.549326],
            //     '武昌区': [114.307344,30.546536],
            //     '青山区': [114.39707,30.634215],
            //     '洪山区': [114.400718,30.504259],
            //     '东西湖区': [114.142483,30.622467],
            //     '汉南区': [114.08124,30.309637],
            //     '蔡甸区': [114.029341,30.582186],
            //     '江夏区': [114.313961,30.349045],
            //     '黄陂区': [114.374025,30.874155],
            //     '新洲区': [114.802108,30.842149],
            // };

            // var convertData = function (data) {
            //     var res = [];
            //     for (var i = 0; i < data.length; i++) {
            //         var geoCoord = geoCoordMap[data[i].name];
            //         if (geoCoord) {
            //             res.push({
            //                 name: data[i].name,
            //                 value: geoCoord.concat(data[i].value)
            //             });
            //         }
            //     }
            //     return res;
            // };
            var seriesdata = [{
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    // data: convertData(hbmap),
                    symbolSize: 10,

                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F4E925'
                        }
                    }
                },
                {
                    type: 'map',
                    map: nameMap,
                    aspectScale: 0.75, //长宽比
                    left: '2%',
                    // right: '35%',
                    top: 10,
                    width: '70%',
                    height: '90%',
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#0C1564',
                            borderColor: '#00effc',
                            borderWidth: 1.5,
                            label: {
                                show: true,
                                color: '#fff',
                            },

                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        }
                    },
                    data: hbmap
                },

                //右边柱状图
                {
                    name: '',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    barWidth: '45%',
                    itemStyle: {
                        normal: {
                            color: '#00effc',

                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "right",
                            textStyle: {
                                color: "#00effc"
                            }
                        }
                    },
                    data: hbmap
                },

            ];
            var ynameMap = [];
            for (var i = 0; i < 7; i++) {
                ynameMap.push(seriesdata[1].data[i].name);
            }


            //GDP
            var optionMap = {
                // backgroundColor: "#0C1564",
                grid: {
                    // left:'2%',
                    right: '10%',
                    bottom: '3%',
                    width: '20%',
                    height: '50%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (data) {
                        if (!isNaN(data.value)) {
                            return data.name + "：" + data.value;
                        }
                    },
                },
                xAxis: {
                    gridIndex: 0,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    gridIndex: 0,
                    interval: 0,
                    data: ynameMap,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#00effc"
                        }
                    }
                },
                // geo: {
                //     map: hbmap,
                //     roam: 'move',
                //     // scaleLimit:{
                //     //   max:'1.2',
                //     //   min:'0.7'
                //     // },
                //     label: {
                //         normal: {
                //             show: true,
                //             textStyle: {
                //                 color: 'rgba(0,0,0,0.6)'
                //             }
                //         }
                //     },
                //     itemStyle: {
                //         normal: {
                //             borderColor: 'rgba(0, 0, 0, 0.2)'
                //         },
                //         emphasis: {
                //             areaColor: null,
                //             shadowOffsetX: 0,
                //             shadowOffsetY: 0,
                //             shadowBlur: 20,
                //             borderWidth: 0,
                //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                //         }
                //     }
                // },
                series: seriesdata

            };

            $.get(uploadedDataURL, function (gdMap) {
                echarts.registerMap(nameMap, gdMap);
                myChart.setOption(optionMap, true);
            });
        }
    }
}
export default mixins
