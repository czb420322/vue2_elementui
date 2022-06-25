// 词云图
import echarts from "echarts";
import "../../../static/js/echarts/echarts-wordcloud.min.js";
const mixins = {
    data() {
        return {

        }
    },
    methods : {
        getCarPlateNumber(data) {
            const wordChart = echarts.init(data);
            // return
            const wordOpt = {
              series: [
                {
                  type: "wordCloud",
                  shape: "circle", //circle cardioid diamond triangle-forward triangle
                  left: 0,
                  right: 0,
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  gridSize: 4, //值越大，word间的距离越大，单位像素
                  sizeRange: [10, 50], //word的字体大小区间，单位像素
                  rotationRange: [0, 0], //word的可旋转角度区间
                  textStyle: {
                    normal: {
                      color: function() {
                        return (
                          "rgb(" +
                          [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 150),
                            Math.round(Math.random() * 140)
                          ].join(",") +
                          ")"
                        );
                      }
                    },
                    emphasis: {
                      shadowBlur: 2,
                      shadowColor: "#000"
                    }
                  },
                  data: [
                    {
                      name: "鄂A99529",
                      value: 3000,
                      textStyle: {
                        normal: { color: "#99c9fa" },
                        emphasis: {
                            shadowBlur:10,
                            shadowColor:'skyblue',

                        },
                      }
                    },
                    {
                      name: "大数据",
                      value: 2181
                    },
                    {
                      name: "云计算",
                      value: 1386
                    },
                    {
                      name: "物联网",
                      value: 2055
                    },
                    {
                      name: "移动互联网",
                      value: 2467
                    },
                    {
                      name: "人工智能",
                      value: 2244
                    },
                    {
                      name: "深度学习",
                      value: 1898
                    },
                    {
                      name: "机器学习",
                      value: 1484
                    },
                    {
                      name: "区块链",
                      value: 3865
                    },
                    {
                      name: "AI",
                      value: 897
                    },
                    {
                      name: "Big Data",
                      value: 847
                    },
                    {
                      name: "Deep Learning",
                      value: 1366
                    },
                    {
                      name: "IoT",
                      value: 555
                    },
                    {
                      name: "Data Visualization",
                      value: 550
                    },
                    {
                      name: "互联网+",
                      value: 2222
                    },
                    {
                      name: "智能合约",
                      value: 366
                    },
                    {
                      name: "比特币",
                      value: 360
                    },
                    {
                      name: "Block Chain",
                      value: 282
                    },
                    {
                      name: "数据挖掘",
                      value: 273
                    },
                    {
                      name: "Hadoop",
                      value: 265
                    }
                  ]
                }
              ],
            //   backgroundColor: "rgba(255, 255, 255, 0.7)"
            };
            wordChart.setOption(wordOpt);
        }
    }
}
export default mixins
