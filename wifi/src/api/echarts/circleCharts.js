/*
 * @Author: your name
 * @Date: 2020-08-24 16:11:36
 * @LastEditTime : 2020-08-31 14:07:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \v1.7\vacp-wfes\src\api\echarts\circleCharts.js
 */
const mixins = {
    data() {
        return {

        }
    },
    methods: {
        getCircle(circleId, daa) {
            let myChart = this.$echarts.init(circleId, "macarons");
            var dataStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowBlur: 10,
                    shadowColor: 'rgba(40, 40, 40, 0.3)',
                }
            };
            var placeHolderStyle = {
                normal: {
                    color: 'rgba(0,0,0,0)',
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                // emphasis: {
                //     color: 'rgba(0,0,0,0)'
                // }
            };
            var item = {
                value: 50,
                name: 'invisible',
                tooltip: {
                    show: false
                },
                itemStyle: placeHolderStyle
            }


            var total = 0
            daa.map(res => {
                total += res.value
            })
            daa.forEach(res => {
                res.percent = ((res.value / total) * 100).toFixed(1);
            })
            console.log(daa)
            var color = ["#857ABA", "#4C3CAE", "#8C0F86", "#CA2C95", "#E1A4C4", "#857ABA"]
            var data1 = []
            var title = '供应商'
            var arrName = getArrayValue(daa, "name");
            var arrValue = getArrayValue(daa, "value");
            var sumValue = eval(arrValue.join('+'));
            var objData = array2obj(daa, "name");

            function getArrayValue(array, key) {
                var key = key || "value";
                var res = [];
                if (array) {
                    array.forEach(function (t) {
                        res.push(t[key]);
                    });
                }
                return res;
            }

            function array2obj(array, key) {
                var resObj = {};
                for (var i = 0; i < array.length; i++) {
                    resObj[array[i][key]] = array[i];
                }
                return resObj;
            }
            for (let i = 0; i < arrValue.length; i++) {
                data1.push({
                    name: title,
                    type: 'pie',
                    center: ["30%", "50%"],
                    clockWise: false,
                    // radius: [180, 200],
                    radius: [80 - i * 10, 90 - i * 10],
                    label: {
                        show: false
                    },
                    // itemStyle: dataStyle,
                    hoverAnimation: false,
                    data: [{
                        value: arrValue[i],
                        name: arrName[i]
                    }, item]
                })
            }
            let option = {
                // backgroundColor: '#1C0D22',
                color: color,
                tooltip: {
                    show: true,
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    itemGap: 7,
                    top: '8%',
                    right: '15%',
                    formatter: function (name) {
                        return "{percent|" + objData[name].percent + "% }{name|" + name + " }{value|" + (objData[name].value) + "项}"
                    },
                    textStyle: {
                        rich: {
                            percent: {
                                fontSize: 15,
                                color: '#fff'
                            },
                            name: {
                                fontSize: 18,
                                color: "rgba(0,0,0,.45)"
                            },
                            value: {
                                fontSize: 14,
                                // lineHeight: 18,
                                color: "rgba(0,0,0,.85)"
                            }
                        }
                    },
                    orient: 'vertical',
                    data: arrName
                },
                series: data1
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
