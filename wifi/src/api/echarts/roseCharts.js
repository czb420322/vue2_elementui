/*
 * @Author:王思桐
 * @Date: 2020-08-11 09:32:41
 * @LastEditTime : 2020-12-16 19:46:02
 * @LastEditors  : Please set LastEditors
 * @Description: 玫瑰图通用方法
 * @FilePath: \v1.7\vacp-wfes\src\api\echarts\roseCharts.js
 */
// 玫瑰图
const mixins = {
    data() {
        return {

        }
    },
    methods: {
        getRose(roseId, rosedata, gdata) {
            let myChart = this.$echarts.init(roseId,
                "macarons"
            );

            let option = {
                // backgroundColor: "#0f375f", // 背景色
                legend: { // 自定义图例样式
                    orient: "horizontal",
                    left: "0",
                    bottom: "0",
                    data: rosedata,
                    formatter: ['{a|{name}}'].join('\n'),
                    textStyle: {
                        rich: {
                            a: {
                                width: 38,
                                color: '#FFF',
                                fontSize: 14,
                                lineHeight: 12
                            }
                        }
                    },

                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}:{c}({d}%)"
                },
                series: [{
                    name: "半径模式",
                    type: "pie",
                    radius: ["20%", "40%"], // 外边距，内边距
                    center: ["50%", "40%"],
                    roseType: "radius",
                    label: {
                        show: true,
                        normal: {
                            position: "outside",
                            fontSize: 14
                        }
                    },
                    label: {
                        length: 1,
                        length2: 20,
                        smooth: true
                    },
                    data: gdata // 传过来的数据
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
