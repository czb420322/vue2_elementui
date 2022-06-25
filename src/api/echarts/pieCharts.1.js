const mixins = {
    data() {
        return {

        }
    },
    methods: {
        // 案件统计饼状进度条
        getpie(pieChartsId, gdata) {
            let myChart = this.$echarts.init(pieChartsId, "macarons");
            let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ["#1a68c3", "#fd1c54"],
                title: {
                    text: "80%",
                    left: "center",
                    top: "50%",
                    textStyle: {
                        color: "#0090fb",
                        fontSize: 16,
                        align: "center"
                    }
                },
                graphic: {
                    type: "text",
                    left: "center",
                    top: "40%",
                    style: {
                        text: "占比值",
                        textAlign: "center",
                        fill: "#fff",
                        fontSize: 14
                    }
                },
                series: [{
                    name: "本月案件统计",
                    type: "pie",
                    radius: ["65%", "70%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: "center"
                        }
                    },
                    data: gdata
                }]
            };

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
